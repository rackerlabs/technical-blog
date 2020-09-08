---
layout: post
title: "DoH—toward more privacy"
date: 2020-09-02
comments: true
author: Mustapha Benmbarek
authorAvatar: 'https://s.gravatar.com/avatar/0299204313e4fc8d8c722748fa21a6b2?s=80'
bio: "Mustapha works with startups and companies of any size to support their
innovation. In his role as Solutions Architect at Rackspace, he leverages his
experience to help people bring their ideas to life, providing guidance and
technical assistance on cloud based and AWS architectures."
published: true
authorIsRacker: true
categories:
    - Security
metaTitle: "DoH&mdash;toward more privacy"
metaDescription: "The Domain Name System ( DNS) serves as the address book for
the internet. Because they built DNS with scalability and consistency in mind,
the developers did not consider how it could be exploited, manipulated, misused,
or even harnessed for good."
ogTitle: "DoH&mdash;toward more privacy"
ogDescription: "The Domain Name System ( DNS) serves as the address book for
the internet. Because they built DNS with scalability and consistency in mind,
the developers did not consider how it could be exploited, manipulated, misused,
or even harnessed for good."
slug: "doh-toward-more-privacy"

---

The Domain Name System (DNS) serves as the address book for the internet.
Because they built DNS with scalability and consistency in mind, the developers
did not consider how it could be exploited, manipulated, misused, or even
harnessed for good.

<!--more-->

However, we can no longer overlook the need for DNS protection as an integral
component of the internet. Bad actors often target DNS, so most IT professionals
increasingly see the protection of DNS layers as a necessary security element.
In terms of making networks more resilient to cyberattacks, DNS is the perfect
control point because all Internet resource lookups, both network and user-based,
are routed via external DNS servers. Unfortunately, organizations are often
content to let their ISP handle the DNS requests. Thus, they have no insight
into which requests are being made and responded to.

### DNS over HTTPS (DoH)

Since its inception in 1983, the DNS has scaled to hold over 335 million domains,
acting as gateways to billions of URLs. A far-sighted and brilliant solution,
the DNS was built around performance and scalability. As a result, by merely
looking at organizations' or individuals' DNS requests, you can easily determine
how people use the internet, where and when they browse websites, access
applications, and even what devices and tools they use on your network. Because
each of these requests is not encrypted (and the DNS resolver isn't verified),
clear text DNS reveals this information and exposes the integrity of the responses
to compromise. Privacy and security were not a consideration. DoH seeks to address
that.

### DoH: Improving privacy and security

DoH specifically addresses the fundamental privacy and security limitations
of DNS. Much like how a browser connects to a secure website through HTTPS,
DoH allows DNS requests to be secured. The system first verifies the resolving
server through a certificate, and then it establishes an SSL connection.
All DNS requests are then communicated over this connection, encrypted, and
protected courtesy of HTTPS. Thus, DoH improves privacy because encrypted DoH
requests are not easily monitored or intercepted. DoH also adds the assurance
that only the DNS provider of choice is aware of these DNS requests. Likewise,
DoH improves security by encrypting DNS requests. Not only does this verify that
the DoH DNS resolver specified is the one providing resolution, but it also
ensures that the requests themselves are protected and have not been altered or
compromised.

### DoH: How encryption causes security problems

Because DoH can manage DNS requests for applications directly, it has the
potential to circumvent the configured DNS resolver provided on your network.
This ability can cause new security and technical problems for organizations.
For example, if a device makes DNS requests for a domain that hosts known botnet
or malware sites, it would be essential to have visibility into these actions
and make corresponding security decisions. But, when these DNS requests are
managed directly by an application through DoH, network logs no longer provide
visibility into whether those DNS requests are occurring. Unmanaged DoH, in
effect, blindsides existing security controls.

Furthermore, DoH can circumvent most commercial DNS filtering solutions. When
an application makes a DNS request directly through DoH and not through the OS's
DNS resolver, you cannot apply filtering. Not only is the system exposed to the
threat, but the system won't log the actual event. This lost ability to filter
and report on DNS requests considerably weakens overall network security.

### Conclusion

DoH is an important new protection for DNS requests. It improves the overall
privacy and security of the DNS requests that every organization makes when using
the internet. But it's also essential that organizations adopt this technology
without losing the significant security benefits they get by managing and
controlling DNS request traffic today. Be sure to consider all the angles.

<a class="cta red" id="cta" href="https://www.rackspace.com/security">Learn more about our security services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
