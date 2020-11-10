---
layout: post
title: "Code injection in MongoDB"
date: 2020-10-21
comments: true
author: Joe Marshall
bio: "Joe is a web application developer, independent security researcher, and writer. He is also a developer and author from Austin, TX."
published: true
authorIsRacker: true
categories:
    - Database
    - ObjectRocket
metaTitle: "Code injection in MongoDB"
metaDescription: "If you’re an application developer, Database administrator (DBA), or any flavor of technologist, code injection should
be on your radar."
ogTitle: "Code injection in MongoDB"
ogDescription: "If you’re an application developer, Database administrator (DBA), or any flavor of technologist, code injection should
be on your radar."
slug: "code-injection-in-mongodb"
canonical: https://www.objectrocket.com/blog/mongodb/code-injection-in-mongodb/
---

*Originally published on March 5, 2019*

If you’re an application developer, Database administrator (DBA), or any flavor of technologist, code injection should
be on your radar.

<!--more-->

{{<img src="picture1.jpg" title="" alt="">}}

You have a secure cloud environment. You have database access locked down. But what about your application code?
Although it’s considered more secure, the *No* in NoSQLi does not mean it's un-injectable! NoSQL can be as susceptible
to code injection as any other database code. Not guarding against code injection is like having a security system in
place for your doors and leaving a back window open.

#### What is code injection?

Code injection is simply unvalidated data being *injected* (or added) into a vulnerable program where it executes in
the form of application code, often to disastrous results.

SQLi is one of the most common types of injection and, at over a decade old, is still going strong. Injection issues
aren’t particular only to database languages. Beyond SQL and NoSQL, an injection can occur in XPath&reg;, XML Parsers,
SMTP headers, and other contexts. As far as severity goes, code injection is akin to remote code execution (RCE)&mdash;the
*Game Over* screen of penetration testing.

It's vital to detect and prevent NoSQLi in your applications. Allowing an unmitigated injection vector can threaten the
safety of your user base, representing a possible business-ending loss of trust. Fortunately, after you understand the
mechanics, you can take concrete steps to detect and prevent NoSQLi vulnerabilities in your services.

#### Simple NoSQLi examples

Typically, MongoDB&reg; ingests Binary JSON (BSON) data constructed by using a secure BSON query construction tool. But
in certain cases, MongoDB can also accept unserialized JSON and Javascript (JS) expressions, such as the `$where` operator.
As with SQL, the `$where` operator is prone to a potential injection in NoSQL. However, unlike in SQL, the NoSQL `$where`
expresses its conditional in JS. This means it can use the full expressive power of JS to craft possible
injection queries instead of being limited to what SQL provides.

Going through lists of MongoDB injection strings in public repositories such as [this one](https://github.com/cr0hn/nosqlinjection_wordlists) illustrates some of the common injection strategies, which parallel similar vulnerabilities in SQL and other languages.
For example, some use the classic `1 == 1` expression to force a query to return a true value in an attempt to read
hidden (or admin-level) resources and privileges:

    $Where: '1 == 1'

Other snippets emulate a [blind injection strategy](https://owasp.org/www-community/attacks/Blind_SQL_Injection) by using the
`sleep()` function to slow the DB down and create a side-effect that&mdash;in conjunction with craftily-designed filters&mdash;can
enumerate sensitive information:

    ';sleep(5000); ';it=new%20Date();do{pt=new%20Date();}while(pt-it<5000);

And then of course there’s plain old data exfiltration, where the injected query is trying to match and retrieve critical information directly.

    ' && this.password.match(/.*/)//+%00

After the first example, the remaining two don’t use the `$where` operator. You don’t need a handy JS-flavored
expression as a foothold to attack a NoSQL DB.

### Preventing NoSQLi

There are several general strategies to pursue when trying to build a NoSQLi-resistant application architecture. It’s no
surprise that they conform with general anti-injection advice.

#### MongoDB / NoSQLi is no exception

Some people see code injection as being SQL-specific and underestimate the validity of injection principles applied to other
contexts. Hopefully, this post convinces you that NoSQLi **is** real. This is well-documented in posts similar to
[MongoDB will not prevent NoSQL injections in your Node.js app](https://blog.sqreen.com/mongodb-will-not-prevent-nosql-injections-in-your-node-js-app/)

#### Do not trust unvalidated user data

For security reasons, you shouldn't trust users!

This might come across as being cliche in security, but expect every input to be probed with malicious intent. Our `$where`
example earlier clearly illustrates why we can’t do something along the lines of `$where: unvalidated_input`&mdash;we might
think we’re exposing the filter to the user at this point (bad enough!). The fact that users are introducing unvalidated data
into the larger query is far from being a best practice.

#### Be wary of language or integration specifics

Even though NoSQLi isn’t special when it comes to being immune to injection (and suffers from many of the same types of attacks),
that doesn’t mean there aren’t also strategies unique to NoSQLi&mdash;or even to the languages or components built on top of a
NoSQL DB. A prominent example is that since `$where` is formatted in a way that passes as a PHP variable, a NoSQL DB built on
top of a PHP application has to account for this and the possible scenario of a malicious string injection stored in `$where`.

### Conclusion

Again, the *No* in NoSQLi does not mean un-injectable! NoSQL, similar to SQL, SMTP headers, XML, and other contexts, is just as
susceptible to code injection and the general treating-things-as-application-code-that-aren’t-application-code pitfalls that
plague so many other technologies.

Hopefully, this post has provided you with a greater understanding of NoSQLi and what it means to your business. Now, you can steer
your code to processes that make it less prevalent, less widespread, and less impactful. If you need some MongoDB management advice
to make sure your app and hosting environment is secure, [Rackspace ObjectRocket](https://auth.objectrocket.cloud/login?state=g6Fo2SBKSjkyejBmUm0wcWcxaGpjWlNFaW5HRHpmWllrV1pkaaN0aWTZIDNsSEJGVVM3U0p6Q3JaRDl1eHByWTVoWVJmd1NRRHUwo2NpZNkgVFpENzVQcm55b1pBSUNtSjNSYjJHMEw4VkM0bzBib2M&client=TZD75PrnyoZAICmJ3Rb2G0L8VC4o0boc&protocol=oauth2&response_type=token%20id_token&nonce=ab844998-0b4b-42c6-81d3-08cfff20ff9a&scope=openid%20email%20name&redirect_uri=https%3A%2F%2Fapp.objectrocket.cloud%2Fsession-callback&audience=https%3A%2F%2Fapi.objectrocket.cloud&_ga=2.175832546.1797400172.1603119104-1358969005.1602515327&__hsfp=176983327&__hstc=227540674.6c2da1a33c3f4e98dc8ac794308ed907.1602515328573.1603289225583.1603294455639.27&__hssc=227540674.3.1603294455639) has experienced DBAs who can help.  

<a class="cta blue" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
