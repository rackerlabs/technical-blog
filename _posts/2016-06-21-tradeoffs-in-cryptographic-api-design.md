---
layout: post
title: "Tradeoffs in cryptographic API design"
date: 2016-06-21 23:59
comments: false
author: lvh
published: true
categories:
    - security
---

Producing cryptographic software is a difficult and specialized endeavor. One
of the pitfalls is that getting it wrong looks exactly like getting it
right. Much like a latent memory corruption bug or a broken distributed
consensus algorithm, a piece of cryptographic software can appear to be
functioning perfectly, while being subtly broken in a way that only comes to
light years later. As the adage goes, attacks never get worse; they only get
better. Implementation concerns like timing attacks can be fiendishly
complicated to solve, involving problems like division instructions on modern
Intel CPUs taking a variable number of cycles depending on the size of the
input. Implementation concerns aren't the only problem; just designing the
APIs themselves is a complex task as well.

Like all API design, cryptographic API design is a user experience
exercise. It doesn't matter how strong or fast your cryptographic software is
if no one uses it. The people who end up with ECB mode didn't end up with it
because they understood what that meant. They got stuck with it because it was
the default and it didn't require thinking about scary parameters like IVs,
nonces, salts and tweaks. Even if someone ended up with CTR or CBC, these APIs
are still precarious; they'll still be vulnerable to issues like nonce
reuse, fixed IV, key-as-IV, unauthenticated encryption...

User experience design always means deep consideration for who your users
are. A particular API might be necessary for a cryptographic engineer to build
new protocols, but that API is probably not a reasonable default encryption
API. An explicit-nonce encryption scheme is great for a record layer protocol
between two peers like TLS, but it's awful for someone trying to encrypt a
session cookie. We can't keep complaining about people getting it wrong when
we keep giving them no chances at getting it right. This is why I'm building
educational material like [Crypto 101][crypto101] and care about cryptography
like [nonce-misuse resistance][nmr] that's easier to use correctly.  (The blog
post on my new nonce-misuse resistant schemes for libsodium is coming soon, I
promise!)

Before you can make your API easy to use, first you have to worry about
getting it to work at all.

An underlying cryptographic library might expose an unfortunate API. It might
be unwieldy because of historical reasons, backwards compatibility, language
limitations, or even simple oversight. Regardless of why the API is the way it
is, even minute changes to it—a nicer type, an implied parameter—might have
subtle but catastrophic consequences for the security of the final
product. Figuring out if an arbitrary-length integer in your programming
language is interchangeable with other representations, like the
implementation in your crypto library or a `char *`, has many complex
facets. It doesn't just have to be true under some conditions; ideally it's
true for every platform your users will run your software on, in perpetuity.

There might be an easy workaround to an annoying API. C APIs often take a
`char *` together with a length parameter, because C doesn't have a standard
way of passing a byte sequence together with its length. Most higher level
languages, including Java and Python, have byte sequence types that know their
own length, so you can specify the `char *` and its associated length in a
single parameter on the high-level side; that's just the moral equivalent of
building a small C struct that holds both. (Whether or not you can trust C
compilers to get anything right at all is a point of contention.)

These problems compound when you are binding libraries in languages with
wildly different semantics. One example is relocating garbage collectors;
pointers stay put in C, but objects move around all the time in environments
like the JVM (HotSpot) or PyPy. That implies copying to or from a buffer
whenever you call C code, unless the underlying virtual machine supports
"memory pinning": forcing the object to stay put for the duration of the call.

Programmers normally operate in a drastically simplified model of the
world. We praise programming designs for their ability to separate concerns,
so that programmers can deal with one problem at a time. The modern CPU your
code runs on is always an intricate beast, but you don't worry about cache
lines when you're writing a Python program. Only a fraction of programmers
ever has to worry about them at all. Those that do typically only do so after
the program already works, so they can still focus on one part of the problem.

When designing cryptographic software, these simplified models we normally
program in don't generally work.  A cryptographic engineer often needs to
worry about concerns all the way up and down the stack simultaneously: from
application layer concerns, to runtime semantics like the
[Java Language Specification][jls], to FFI sementics and the C ABI on all
relevant platforms, to the underlying CPU, to the mathematical underpinnings
themselves. All of which often while being hamstrung by flawed designs like
TLS' MAC-then-pad-then-encrypt mess.

In future blog posts, I'll go into more detail about particular cryptographic
API design concerns, starting with JVM byte types. If you're interested, you
should [follow me on Twitter][twitter].

*Footnote:*
I'm happy to note that [cffi][cffi-pinning] now also has support for memory
pinning since PyPy will support it in the upcoming 5.2 release, although that
means I'll no longer be able to make [Paul of PyCA fame][paul] jealous with
the pinning support in [caesium][caesium].

[nmr]: /posts/nonce-misuse-resistance-101.html
[crypto101]: https://www.crypto101.io/
[jls]: https://docs.oracle.com/javase/specs/jls/se8/html/index.html
[twitter]: https://twitter.com/lvh
[rss]: /rss.xml
[cffi-pinning]: https://bitbucket.org/cffi/cffi/commits/61e03368485cb78471f701adbfd1bde69a6eaa31
[paul]: https://github.com/reaperhulk
[caesium]: https://github.com/lvh/caesium
