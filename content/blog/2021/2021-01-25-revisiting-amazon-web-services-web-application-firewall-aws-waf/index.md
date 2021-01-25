---
layout: post
title: "Revisiting Amazon Web Services Web Application Firewall AWS WAF"
date: 2021-01-25
comments: true
author: Rackspace Onica Team
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "Revisiting Amazon Web Services Web Application Firewall AWS WAF"
metaDescription: "Amazon Web Services (AWS) first announced their managed Web Application Firewall(WAF) during re:Invent 2015.  As with many AWS services, at launch time it was considered a Minimal Viable Product (MVP), but it had several obvious limitations at the time. Most of these have been resolved since its release"
ogTitle: "Revisiting Amazon Web Services Web Application Firewall AWS WAF"
ogDescription: "Amazon Web Services (AWS) first announced their managed Web Application Firewall(WAF) during re:Invent 2015.  As with many AWS services, at launch time it was considered a Minimal Viable Product (MVP), but it had several obvious limitations at the time. Most of these have been resolved since its release"
slug: "revisiting-amazon-web-services-web-application-firewall-aws-waf"
canonical: https://onica.com/blog/aws-announcements/revisiting-amazon-web-services-web-application-firewall-aws-waf/

---

*Originally published in Dec 2017, at Onica.com/blog*

Amazon Web Services&reg; (AWS) first announced their managed Web Application Firewall(WAF) during re:Invent 2015.  As with many AWS services, at launch time it was considered a Minimal Viable Product (MVP), but it had several obvious limitations at the time. Most of these have been resolved since its release.

<!--more-->

Amazon Web Services (AWS) first announced their managed [Web Application Firewall](https://aws.amazon.com/es/waf/) (WAF) in 2015.  As with many AWS services, at launch time it could have been considered a Minimal Viable Product (MVP). It provided the building blocks to create an effective Web Application Firewall&reg;&mdash;especially when integrated with third-party or custom products through AWS’ powerful application programming interface (API)—but it had several obvious limitations at the time. Most of these have been resolved since it’s been released, with the latest and perhaps most important improvement, [managed rule groups](https://aws.amazon.com/es/about-aws/whats-new/2017/11/ready-to-use-managed-rules-now-available-on-aws-waf/), being launched during re:Invent 2017.


### MVP: From Minimal Viable Product to Most Valuable Player

Since its first release—which you can read about in our original blog post [Get The Last “WAF” with AWS Web Application Firewall—AWS](https://www.trinimbus.com/blog/amazon-web-services-web-application-firewall/) has been slowly rolling out the majority of the missing features you would expect in a robust WAF solution.

AWS fixed one big omission not long after the initial launch of the product, adding the ability to inspect HTTP request bodies &mdash;or at least the first 8192 bytes.  This feature was critical in completing the WAF’s ability to protect against attack vectors such as SQL injection, where the payloads are part of the body of an HTTP POST request. To help mitigate the 8 kb body size limitation, AWS introduced a size constraint match condition at the same time, so you can at least write rules that simply block requests that are too large to inspect (in situations where doing so would have no adverse effects on your application).

Additional match conditions have since been added, with [cross-site scripting (XSS), geographic, and regular expression](https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html) match conditions rounding out the total number of conditions to seven, including the original IP address, SQL injection, and string matching conditions. Using some of these new match conditions, you could create a rule that would, for example, block traffic coming from a specific country, if the User-Agent HTTP header matches a certain RegEx pattern, and the size of the HTTP query string exceeds a certain number of bytes.

Internet Protocol Version 6 (IPv6) support was also rolled out to AWS WAF at the same time it was added AWS CloudFront&reg;, including adding support to the WAF’s IP address match condition as well. Another area where [AWS CloudFront](https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html) continually gets improvements that inherently benefit AWS WAF is the continued addition of edge locations, which total 96 around the world (plus an additional 11 regional edge caches) at the time of writing, an increase of more than 40 since the WAF was first launched.

For those interested in AWS WAF who are not so keen on using CloudFront yet, direct support for Application Load Balancers (ALBs) was a welcome addition early in 2017. And although AWS Shield&reg;&m,dash;a sister product used for defending against distributed denial of service (DDoS) attacks—can now also be deployed directly in front of Elastic IP addresses, it is unlikely that AWS WAF will ever get this functionality. There would be little reason to run a production web application that is not behind either CloudFront or an ALB, and often likely both, so those hoping to bring the WAF even closer to their EC2&reg; instances are probably out of luck.

Another big addition is that of a second rule type: a rate-based rule which blocks requests from a single IP address if it exceeds the specified rate over five minutes &mdash;with the minimum rate being 2000. Blocked IP addresses are automatically unblocked once their access patterns fall below the specified limit. Rate-based rules can include any condition type, but if no condition is specified then all requests are counted towards the rate limit.

#### Who writes the rules?

The AWS WAF has added plenty of features over its lifetime, making it a very powerful framework for defending against web application attacks, but one thing has always remained the same: the actual writing of the rules has always been left up to the users of the product, even though a lot of domain knowledge is necessary to write effective rules.

AWS has helped alleviate this problem by providing [Preconfigured Rules & Tutorials](https://aws.amazon.com/waf/preconfiguredrules/), a combination of documentation, CloudFormation templates and sample AWS Lambda&reg; functions users can employ to defend against some common types of attacks, including SQL injection, XSS, various types of IP blacklists and whitelists, and HTTP flood protection. AWS also released a detailed [whitepaper](https://d0.awsstatic.com/whitepapers/Security/aws-waf-owasp.pdf) (PDF) on using the AWS WAF to mitigate [OWASP’s top 10 web application vulnerabilities](https://owasp.org/www-project-top-ten/).

While these efforts help educate users about a large number of AWS WAF use cases, it still ultimately leaves the implementation of these rules to the user.  This all changed with the biggest WAF&mdash;related announcement to come out of re:Invent 2017, something users of this service have been asking for since the beginning: the availability of managed rule groups, written and kept up-to-date on an ongoing basis by trusted security experts.

#### Managed rule groups

Managed rule groups for the AWS WAF are available today through the AWS Marketplace. They’re currently organized in the *Software as a Service (SaaS) Subscriptions* category, but may get their own *rule* category in the future.  AWS has partnered with five trusted security vendors for the initial offering of managed rule groups.  It is unlikely that they will open this category up to unvetted or community submissions in the future as they want to ensure the high quality of such critical security rules. As such, you shouldn’t expect to see the vendor list grow too quickly, although there are at least two more big names in the security space who will be providing their own managed rule groups soon.

Managed rule groups are reasonably priced, with a small monthly subscription fee (which is prorated hourly, so feel free to experiment and cancel any time) and a per-request fee, similar to how custom rules are currently priced.  Note, that these subscription fees are in addition to the standard AWS WAF fees.

The following are the 11 managed rule groups available from the five providers at launch time and their prices:

- **Alert Logic.** 
1. Virtual Patches for WordPress ($14.00/month, $0.60/million requests)
- **Fortinet.**
1. Complete OWASP Top 10 ($30.00/month, $1.80/million requests)
2. General and Known Exploits ($20.00/month, $1.50/million requests)
3. Malicious Bots ($5.00/month, $0.50/million requests)
4. SQLi/XSS ($15.00/month, $1.00/million requests)
- **Imperva.**
1. WordPress Protection ($30.00/month, $0.60/million requests)
2. IP Reputation ($40.00/month, $0.40/million requests)
- **Trend Micro.**
1. WebServer (Apache, Nginx) ($5.00/month, $0.20/million requests)
2. Content Management System (CMS) ($5.00/month, $0.20/million requests)
- **Trustwave.**
1. ModSecurity Virtual Patching ($10.00/month, $0.80/million requests)
2. CMS Virtual Patches ($15.00/month, $0.90/million requests)

When you add a managed rule group to an AWS WAF Web ACL, you’ll notice you won’t be able to inspect the actual rules it contains. This is in part to protect the *secret sauce* that vendors have built into the rule groups.  You won’t even know the number of rules, although their assumed to be in the tens-to-around-one-hundred rules per group, and will likely fluctuate as vendors tweak the rules throughout the life of your subscription. WAF applies these tweaks without any actions required on your part.

This also means that you can't pick and choose which rules from a group you want to have active&mdash;it’s an all or nothing decision, although you could theoretically write custom rules that specifically allow certain requests before they even make it through to the managed rule group, as you can still use a combination of custom and managed rules in a Web ACL. The one option you do have with managed rule groups is to override actions for the entire group to be a count instead of a block, allowing you to test how a rule group may behave in front of your application before final deployment.

The rules themselves have been specifically written to have very low false positives, as well as have minimal impact on the latency of a request, with the most complex rule groups still executing in ten ms or less.

With the addition of managed rule groups, AWS WAF may finally become the single, self-contained solution you need to protect your web application from malicious requests.  

(<a class="cta blue" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>) for assistance.

Use the Feedback tab to make any comments or ask questions. You can also click **Let's Talk** to [start the conversation](https://www.rackspace.com/).
