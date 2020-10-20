---
layout: post
title: "Code injection in mongodb"
date: 2020-10-26
comments: true
author: Joe Marshall
authorAvatar: 'Joe is a web application developer, independent security researcher, and writer.'
bio: "Developer and Author from Austin TX "
published: true
authorIsRacker: true
categories:
    - Database
    - ObjectRocket
metaTitle: "Code injection in mongodb"
metaDescription: "."
ogTitle: "Code injection in mongodb"
ogDescription: "."
slug: "code-injection-in-mongodb"

---

Replace with short intro sentence or two.

<!--more-->

### Code Injection in MongoDB&reg;

{{<img src="picture1.jpg" title="" alt="">}}

If you’re an application developer, DBA, or any flavor of technologist, really, code injection should be on your radar.
You have a secure cloud environment. You have database access locked down. But what about your application code? Although it’s considered more secure, the “No” in NoSQLi does not mean un-injectable! NoSQL can be just as susceptible to code injection as any other database code. Not guarding against code injection is like having a security system in place for your doors and leaving a back window open.

#### What is code injection?

Code injection is simply unvalidated data being added (“injected”) into a vulnerable program where it’s executed as application code, often to disastrous results.
SQLi is one of the most common types of injection and, at over a decade old, is still going strong. Injection issues aren’t limited to just database languages: Beyond SQL and NoSQL, injection can occur in XPath, XML Parsers, SMTP headers, and a wide variety of other contexts. And as far as severity goes, code injection is a cousin to RCE (remote code execution) — the “Game Over” screen of penetration testing.
That’s why it’s important to detect and prevent NoSQLi in your own applications. Allowing an unmitigated injection vector can threaten the safety of your user base, representing a possible business-ending loss of trust. Fortunately, once you understand the mechanics, there are simple, concrete steps you can take to both detect and prevent NoSQLi vulnerabilities in your own services.

#### Simple NoSQLi Examples

Typically, MongoDB ingests BSON data (Binary JSON) constructed using a secure BSON query construction tool. But in certain cases, MongoDB can also accept unserialized JSON and Javascript expressions — like in the case of the $where operator.
As with SQL, the $where operator is ripe for abuse and potential injection in NoSQL. However, unlike in SQL, the NoSQL $where expresses its conditional in Javascript. This means it can use the full expressive power of JS to craft possible injection queries instead of being limited to what SQL provides.
Going through lists of MongoDB injection strings in public repos like this one illustrates some of the common injection strategies, which parallel similar vulnerabilities in SQL and other languages.
For example, some use the classic 1 == 1 expression to force a query to return a truthy value in an attempt to read hidden (or admin-level) resources and privileges:

    $Where: '1 == 1'

Other snippets emulate a blind injection strategy by using the sleep() function to slow the DB down and create a side-effect that — when used in conjunction with craftily-designed filters — can enumerate oftentimes sensitive information:

    ';sleep(5000); ';it=new%20Date();do{pt=new%20Date();}while(pt-it<5000);

And then of course there’s plain old data exfiltration, where the injected query is trying to match and retrieve critical information directly (and not through a programmatic game of “Guess Who”).

    ' && this.password.match(/.*/)//+%00

After the first example, the remaining two don’t use the $where operator, proving that you don’t need a handy Javascript-flavored expression as a foothold to attack a NoSQL DB.

### Preventing NoSQLi

There are several general strategies to pursue when trying to build a NoSQLi-resistant application architecture. It’s no surprise that they conform with general anti-injection advice.

#### MongoDB / NoSQLi is not special

There’s a weird school of thought where people see injection as being SQL-specific and don’t understand the validity of injection principles applied to other contexts. Hopefully this post convinces you that NoSQLi is real. There’s a reason people write posts with titles like “MongoDB will not prevent NoSQL injections in your Node.js app”

#### Do not trust unvalidated user data

Don’t trust users! Ever! Even a bit!
This is a truism to the point of being a cliche in security, but expect every input to be probed with malicious intent. To borrow from our $where example earlier, it illustrates pretty clearly why we can’t do something along the lines of $where: unvalidated_input — even if we only think we’re exposing the filter to the user at this point (bad enough!) the fact that users are introducing unvalidated data into the larger query is a total no-no.

#### Be wary of language/integration specifics

Even though NoSQLi isn’t special when it comes to being immune to injection (and in fact suffers from many of the same types of attacks), that doesn’t mean there aren’t also strategies unique to NoSQLi — or even to the languages / components built on top of a NoSQL DB. A prominent example is that since $where is formatted in a way that passes as a PHP variable, a NoSQL DB built on top of a PHP application has to account for this and the possible scenario of a malicious string injection stored in $where.

### Conclusion

Again, the “No” in NoSQLi does not mean un-injectable! NoSQL — similar to SQL, SMTP headers, XML, and a million other contexts — is just as susceptible to code injection and the general treating-things-as-application-code-that-aren’t-application-code pitfalls that plague so many other technologies.
Hopefully though, with this post, you’ve gained a greater understanding of NoSQLi, what it means to your business. Now, you can steer your code to processes that make it less prevalent, less widespread, and less impactful. If you need some MongoDB management advice to make sure your app and hosting environment is secure, ObjectRocket has experienced DBAs who can help.  
If you’d like to read more of Joe’s writing on security, code injection, or penetration testing, check out his new guide, Hands-On Bug Hunting for Penetration Testers. You can follow him at joecmarshall.com


<a class="cta purple" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
