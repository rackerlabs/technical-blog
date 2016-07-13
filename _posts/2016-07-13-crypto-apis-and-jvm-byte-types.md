---
layout: post
title: "Crypto APIs and JVM byte types"
date: 2016-07-13 23:59
comments: false
author: lvh
authorIsRacker: true
authorAvatar: "https://s.gravatar.com/avatar/1846c8040fcf70e9b55bb7bfcdb78bc4"
published: true
categories:
    - security
---

In a previous post, I talked about [crypto API tradeoffs][tradeoffs]. In this
post, I'll go into a specific API design case in [`caesium`][caesium], my
cryptographic library for Clojure, a language that runs on the Java Virtual
Machine.

<!-- more -->

## JVM byte types

The JVM has several standard byte types. For one-shot cryptographic APIs, the
two most relevant ones are byte arrays (also known as `byte[]`) and
`java.nio.ByteBuffer`.  Unfortunately, they have different pros and cons, so
there is no unambiguously superior choice.

`ByteBuffer` can produce slices of byte arrays and other byte buffers
with zero-copy semantics. This makes a useful tool when want to place
an encrypted message in a pre-allocated binary format. One example of
this is my [experimental NMR suite][magicnonce]. Another use case is
generating more than one key out of a single call to a key derivation
function. The call produces one (long) output, and `ByteBuffer` lets
you slice it into different keys.

Byte arrays are easily serializable, but `ByteBuffer` is not. Even if you
teach your serialization library about `ByteBuffer`, this usually results in
extra copying during serialization.

Byte arrays are constant length, and that length is stored with the array, so
it's cheap to access. Figuring out how much to read from a `ByteBuffer`
requires a (trivial) amount of math by calling `remaining`. This is because
the `ByteBuffer` is a view, and it can be looking at a different part of the
underlying memory at different times. For a byte array, this is all fixed: a
byte array's starting and stopping points remain constant. Computing the
remaining length of a `ByteBuffer` may not always be constant time (although
it probably is). Even if that computation isn't constant time, that probably
does not have significant security consequences: in `caesium`, only
cryptographic hashes, detached signatures and detached MACs don't publicly
specify the message length.

`ByteBuffer` has a public API for allocating *direct* buffers. This means they
are not managed by the JVM. Therefore they won't be copied around by the
garbage collector, and memory pinning is free. "Memory pinning" means that you
notify the JVM that some external C code is using this object, so it should
not be moved around or garbage collected until that code is done using that
buffer. You can't pass "regular" (non-direct) buffers to C code. When you do
that, the buffer is first copied under the hood. Directly allocated buffers
let you securely manage the entire lifecycle of the buffer. For example, they
can be securely zeroed out after use. Directly allocated `ByteBuffer`
instances might have underlying arrays; this is explicitly unspecified.
Therefore, going back to an array _might_ be zero-copy. In my experiments,
these byte buffers never have underlying arrays, so copying is always
required. I have not yet done further research to determine if this generally
the case. In addition to `ByteBuffer`, the`sun.misc.Unsafe` class does have
options for allocating memory directly, but it's pretty clear that use of that
class is strongly discouraged. Outside of the JDK, the `Pointer` API in
`jnr-ffi` works identically to `ByteBuffer`.

## Design decisions

As a brief recap from my previous post, it's important that we design an API
that makes common things easy and hard things possible while remaining secure
and performant. For the cryptographic APIs in `caesium`, there are a number of
variables to consider:

 * Are the return types and arguments `ByteBuffer` instances, byte arrays
   (`[B`), `Pointer` instances, or something else?
 * Is the return type fixed per exposed function, or is the return
   type based on the input types, like Clojure's [`empty`][clj-empty]?
 * Are the APIs "C style" (which passes the output buffer as an argument) or
   "functional style" (which allocates the output buffer for you)?
 * Does the implementation convert to the appropriate type (which might
   involve copying), does it use reflection to find the appropriate type, does
   it explicitly dispatch on argument types, or does it assume you give
   it some specific types?

Many of these choices are orthogonal, meaning we can choose them
independently. With dozens of exposed functions, half a dozen or so arguments
per function with 2-4 argument types each, two function styles, four argument
conversion styles, and two ways of picking the return type, this easily turns
into a combinatorial explosion of many thousands of exposed functions.

All of these choices pose trade-offs. We've already discussed the differences
between the different byte types, so I won't repeat them here. Having the
function manage the output buffer for you is the most convenient option, but
it also precludes using direct byte buffers effectively. Type conversion is
most convenient, but type dispatch is faster, and statically resolvable
dispatching to the right implementation is faster still. The correct return
value depends on context. Trying to divine what the user really wanted is
tricky, and, as we discussed before, the differences between those types are
significant.

The functions exposed in caesium live on the inside of a bigger system, in the
same sense that IO libraries like [Twisted][twisted] and [manifold][manifold]
live on the edges. Something gives you some bytes, you perform some
cryptographic operations on them, and then the resulting bytes go somewhere
else. This is important, because it reduces the number of contexts in which
people end up with particular types.

## Implementing the API

One easy decision is that the underlying binding should support every
permutation, regardless of what the API exposes. This would most likely
involve annoying code generation in a regular Java/jnr-ffi project, but
caesium is written in Clojure. The information on how to bind libsodium is a
Clojure data structure that gets compiled into an interface, which is what
jnr-ffi consumes. This makes it easy to expose every permutation, since it's
just some code that operates on a value. You can see this at work in the
[`caesium.binding` namespace][binding]. As a consequence, an expert
implementer (who knows exactly which underlying function they want to call
with no "smart" APIs or performance overhead) can always just drop down to the
binding layer.

Another easy call is that all APIs should raise exceptions, instead of
returning success codes. Success codes make sense for a C API, because there's
no reasonable exception mechanism available. However, problems like failed
decryption should definitely just raise exceptions.

It gets tricky when we compare APIs that take an output buffer versus APIs
that build the output buffer for you. The latter are clearly the easiest to
use, but the former are necessary for explicit buffer life cycle
management. You can also easily build the managed version from the unmanaged
version, but you can't do the converse. As a consequence, we should expose
both.

Having to expose both has the downside that we haven't put a dent in that
combinatorial explosion of APIs yet. Let's consider the cases in which someone
might have a byte buffer:

 - They're using them as a slice of memory, where the underlying memory could
   be another byte buffer (direct or indirect) or a byte array -- usually a
   byte array wrapping a byte buffer.
 - They're managing their own (presumably direct) output buffers.

In the former case, the byte buffers primarily act as inputs. In the latter,
they exclusively act as outputs. Because both byte buffers and byte arrays can
act as inputs, any API should be flexible in what it accepts. However, this
asymmetry in how the types are used, and how they can be converted, has
consequences for APIs where the caller manages the output buffer versus APIs
that manage it for you.

When the API that manages the output buffer for you, the most reasonable
return type is a byte array. There is no difference between byte arrays
created by the API and those created by the caller, and there's no reasonable
way to reuse them. If you do really need a byte buffer for some reason,
wrapping that output array is simple and cheap. Conversely, APIs where the
caller manages the output buffer should use output byte buffers. Callers who
are managing their own byte buffer need to call an API that supports that, and
there's nothing to be gained from managing your own byte arrays (only direct
byte buffers). This is fine for internal use within `caesium` — the byte array
producing API can just wrap it in a byte buffer view.

This means we've reduced the surface significantly: APIs with caller-managed
buffers output to `ByteBuffer`, and APIs that manage it themselves return byte
arrays. This takes care of the output types, but not the input types.

Keys, salts, nonces, messages et cetera will usually be byte arrays, since
they're typically just read directly from a file or made on the spot. However
rare, there can be good reasons for having any of these as byte buffers. For
example, a key might have been generated from a different key using a key
derivation function; a nonce might be synthetically generated (as with
deterministic or nonce-misuse resistant schemes); either might be randomly
generated but just into a pre-existing buffer.

The easiest way for this to work by default is reflection. That mostly works,
until it doesn't. Firstly, reflecting can be brittle. For example, if all of
your byte sequence types are known but a buffer length isn't, Clojure's
reflection will fail to find the appropriate method, even if it is
unambiguous. Secondly, unannotated Clojure fns always take boxed objects, not
primitives, which is what we want for calling into C. Annotating is imperfect,
too, because it moves the onus of producing a primitive to the caller. These
aren't really criticisms of Clojure. At this point we're well into weird edge
case territory which this system wasn't designed for.

We can't do static dispatch for the public API, because we've established that
we should be flexible in our input types. We can work around the unknown type
problems with reflection using explicitly annotated call sites. That means
we're dispatching on types, which comes with its own set of issues. In the
next blog post, I'll go into more detail on how that works, with a bunch of
benchmarks. Stay tuned!

[tradeoffs]: https://developer.rackspace.com/blog/tradeoffs-in-cryptographic-api-design/
[caesium]: https://github.com/lvh/caesium
[twisted]: https://twistedmatrix.com/
[manifold]: https://github.com/ztellman/manifold
[magicnonce]: https://github.com/lvh/caesium/blob/master/src/caesium/magicnonce/secretbox.clj
[libsodium]: https://github.com/jedisct1/libsodium
[byte-streams]: https://github.com/ztellman/byte-streams
[clj-empty]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/empty
[binding]: https://github.com/lvh/caesium/blob/master/src/caesium/binding.clj#L13
