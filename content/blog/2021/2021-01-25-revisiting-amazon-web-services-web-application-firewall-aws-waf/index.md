---
layout: post
title: "Revisiting Amazon Web Services Web Application Firewall (AWS WAF)"
date: 2021-01-25
comments: true
author: Rackspace Onica Team
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "Revisiting Amazon Web Services Web Application Firewall (AWS WAF)"
metaDescription: "Amazon Web Services (AWS) first announced their managed Web Application Firewall(WAF) during re:Invent 2015.
As with many AWS services, it was considered a minimal viable product (MVP) at launch time, but it had several obvious limitations
at the time. AWS has resolved most of these since its release."
ogTitle: "Revisiting Amazon Web Services Web Application Firewall (AWS WAF)"
ogDescription: "Amazon Web Services (AWS) first announced their managed Web Application Firewall(WAF) during re:Invent 2015.
As with many AWS services, it was considered a minimal viable product (MVP) at launch time, but it had several obvious limitations
at the time. AWS has resolved most of these since its release."
slug: "revisiting-amazon-web-services-web-application-firewall-aws-waf"
canonical: https://onica.com/blog/aws-announcements/revisiting-amazon-web-services-web-application-firewall-aws-waf/

---

*Originally published in Dec 2017, at Onica.com/blog*

Amazon Web Services&reg; (AWS) first announced their managed Web Application Firewall (WAF) during re:Invent 2015.
As with many AWS services, it was considered a minimal viable product (MVP) at launch time, but it had several obvious
limitations at the time.

<!--more-->

AWS provided the building blocks to create an effective WAF&mdash;especially when integrated with third-party or custom
products through the powerful AWS application programming interface (API). However, it had several obvious limitations
at the time. AWS has resolved most of these have been resolved since it’s been released, and launched the latest and perhaps
most important improvement,
[managed rule groups](https://aws.amazon.com/es/about-aws/whats-new/2017/11/ready-to-use-managed-rules-now-available-on-aws-waf/),
during re:Invent 2017.


### MVP: From minimal viable product to most valuable player

Since its first release, AWS has been slowly rolling out the majority of the missing features you would expect in a robust
WAF solution.

AWS fixed one big omission not long after the initial launch of the product, adding the ability to inspect HTTP request
bodies&mdash;or at least the first 8192 bytes. This feature was critical in completing the WAF ability to protect against
attack vectors such as SQL injection, where the payloads are part of the body of an HTTP POST request. To help mitigate the
8 KB body size limitation, AWS introduced a size constraint match condition at the same time. This lets you at least write
rules that simply block requests that are too large to inspect (in situations where doing so would have no adverse effects
on your application).

Additional match conditions have since been added, with [cross-site scripting (XSS), geographic, and regular expression](https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html) match conditions rounding out the total number
of conditions to seven, including the original IP address, SQL injection, and string matching conditions. For example, by
using some of these match conditions, you can create a rule that would block traffic coming from a specific country, if the
User-Agent HTTP header matches a certain RegEx pattern and the size of the HTTP query string exceeds a certain number of bytes.
AWS rolled out Internet Protocol Version 6 (IPv6) support to AWS WAF and AWS CloudFront® at the same time, including additional
support for the WAF IP address match condition. Another area where
[AWS CloudFront](https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html) continually gets improvements that
inherently benefit AWS WAF is the continual addition of edge locations, which total 96 around the world (plus an additional 11
regional edge caches) at the time of writing, an increase of more than 40 since the first WAF version launched.

For those interested in AWS WAF who are not so keen on using CloudFront yet, AWS added direct support for Application Load Balancers
(ALBs) early in 2017. And although you can now also directly deploy AWS Shield&reg;&mdash;a sister product used for defending against
distributed denial of service (DDoS) attacks&mdash;in front of Elastic IP addresses, it is unlikely that AWS WAF will ever get this
functionality. There would be little reason to run a production web application that is not behind either CloudFront or an ALB, or even
both, so those hoping to bring the WAF even closer to their EC2&reg; instances are probably out of luck.

Another big addition is that of a second rule type: a rate-based rule that blocks requests from a single IP address if it exceeds the
specified rate over five minutes&mdash;with the minimum rate being 2000. Blocked IP addresses are automatically unblocked after their
access patterns fall below the specified limit. Rate-based rules can include any condition type, but if no condition is specified,
all requests are counted towards the rate limit.

### Who writes the rules?

The AWS WAF has added plenty of features over its lifetime, making it a very powerful framework for defending against
web application attacks, but one thing has always remained the same: the actual writing of the rules has always been
left up to the product users, even though you need a lot of domain knowledge to write effective rules.

AWS has helped alleviate this problem by providing [Preconfigured Rules & Tutorials](https://aws.amazon.com/waf/preconfiguredrules/).
This guidance provides a combination of documentation, CloudFormation templates, and sample AWS Lambda&reg; functions that users use
to defend against some common types of attacks. These attacks include SQL injection, XSS, various types of IP blacklists and whitelists,
and HTTP flood protection. AWS also released a detailed [whitepaper](https://d0.awsstatic.com/whitepapers/Security/aws-waf-owasp.pdf)
on using the AWS WAF to mitigate [OWASP’s top ten web application vulnerabilities](https://owasp.org/www-project-top-ten/).

While these efforts help educate users about a large number of AWS WAF use cases, it still ultimately leaves the implementation of
these rules to the user.  This all changed with the biggest WAF-related announcement to come out of re:Invent 2017, something users
of this service have been asking for since the beginning: the availability of managed rule groups, written and kept up-to-date on
an ongoing basis by trusted security experts.

### Managed-rule groups

Managed-rule groups for the AWS WAF are available today through the AWS Marketplace. Though currently organized in the
*Software as a Service (SaaS) Subscriptions* category, they might get their own *rule* category in the future.  AWS has
partnered with five trusted security vendors for the initial offering of managed-rule groups.  It is unlikely that they
will open this category up to unvetted or community submissions in the future because they want to ensure the high quality
of such critical security rules. As such, you shouldn’t expect to see the vendor list grow too quickly, although there are
at least two more big names in the security space that will provide their own managed-rule groups soon.

Managed-rule groups are reasonably priced, with a small monthly subscription fee (that is prorated hourly, so feel free to
experiment and cancel any time) and a per-request fee, similar to how custom rules are currently priced.  Notice that these
subscription fees are in addition to the standard AWS WAF fees.

The following 11 managed-rule groups are available from the five providers at launch time:

- **Alert Logic**:
   - Virtual Patches for WordPress ($14.00/month, $0.60/million requests)
- **Fortinet**:
   - Complete OWASP Top 10 ($30.00/month, $1.80/million requests)
   - General and Known Exploits ($20.00/month, $1.50/million requests)
   - Malicious Bots ($5.00/month, $0.50/million requests)
   - SQLi/XSS ($15.00/month, $1.00/million requests)
- **Imperva**:
   - WordPress Protection ($30.00/month, $0.60/million requests)
   - IP Reputation ($40.00/month, $0.40/million requests)
- **Trend Micro**:
   - WebServer (Apache, Nginx) ($5.00/month, $0.20/million requests)
   - Content Management System (CMS) ($5.00/month, $0.20/million requests)
- **Trustwave.**
   - ModSecurity Virtual Patching ($10.00/month, $0.80/million requests)
   - CMS Virtual Patches ($15.00/month, $0.90/million requests)

When you add a managed-rule group to an AWS WAF Web ACL, you can't inspect the actual rules it contains. This is
in part to protect the *secret sauce* that vendors have built into the rule groups. You won’t even know the number
of rules, although it might be in the tens-to-around-one-hundred rules per group and will likely fluctuate as vendors
tweak the rules throughout the life of your subscription. WAF applies these tweaks without any actions required on
your part.

This also means that you can't pick and choose which rules from a group you want to have active&mdash;it’s an all or
nothing decision. However, you can theoretically write custom rules that specifically allow certain requests before
they even make it through to the managed-rule group because you can still use a combination of custom and managed
rules in a Web ACL. The one option you do have with managed-rule groups is to override actions for the entire group
to be a count instead of a block, allowing you to test how a rule group may behave in front of your application before
final deployment.

The rules themselves have been specifically written to have very low false positives and minimal impact on request
latency, with the most complex rule groups still executing in ten minutes or less.

With the addition of managed-rule groups, AWS WAF might finally become the single, self-contained solution you need
to protect your web application from malicious requests.  

(<a class="cta blue" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>) for assistance.

Use the Feedback tab to make any comments or ask questions. You can also click
**Let's Talk** to [start the conversation](https://www.rackspace.com/).
