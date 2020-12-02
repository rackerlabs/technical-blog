---
layout: post
title: "Capital One Data Breach: Two Security Controls You Should Review"
date: 2020-12-02
comments: true
author: Greg Peterson
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "Capital One Data Breach: Two Security Controls You Should Review"
metaDescription: "."
ogTitle: "Capital One Data Breach: Two Security Controls You Should Review"
ogDescription: "."
slug: "capital-one-data-breach-two-security-controls-you-should-review"
canonical: https://onica.com/blog/security/capital-one-data-breach-two-security-controls-you-should-review/

---

*Originally published on August 7, 2019 at Onica.com/blog*

On July 19, Capital One announced that an attacker gained access to over 100 million American and Canadian customer records, containing sensitive data such as social security numbers, names and dates of birth.

<!--more-->

A lot of attention is being paid to the fact that the stolen data was stored
in a Capital One AWS S3 bucket. This attack was not specific to the AWS
infrastructure and could have occurred in an on-premise deployment.

The US court
complaint](https://www.justice.gov/usao-wdwa/press-release/file/1188626/downloadcapital)
states that the breach began with a misconfiguration on a Capital One Web
Application Firewall (WAF), allowing the attacker to use the WAF to attempt
to access data in over 700 of the company’s S3 buckets. At least one of these
S3 buckets allowed the WAF to list and extract the stolen sensitive data. This
is known as a Server-Side Request Forgery (SSRF) attack. The diagram below
offers a high-level overview of the attack process.

{{<img src="capital-one-1.png" title="" alt="">}}

Capital One has a well-regarded security program in place, which was displayed
during their incident response. Their security team maintains an email address
for responsible disclosure of vulnerabilities and incidents, which is how the
breach was identified. A key lesson from this incident is that even
organizations with well-run security programs are susceptible to breaches
and they must be planned for in advance.

Onica believes that solid security fundamentals should be applied on all
information technology, regardless of its physical location. After any
breach announcement, we recommend that companies examine their current
security practices to ensure that they are not vulnerable to the exploits.
While examining this incident we would like to focus on two security
controls: misconfigurations and access rights.

### Misconfigurations

Using a WAF to protect web traffic is considered a best practice. Having
misconfigurations of these devices is a predictable scenario. Configuration
error risks can be mitigated in multiple ways. Having a solid change
management program in place will help minimize errors, while having a
continual compliance monitoring solution in place will allow
misconfigurations to be identified and corrected quickly. Regularly scheduled
vulnerability scans and penetration tests will help identify issues that
occur due to misconfigurations.

### Access Rights

Creating an IAM role intended for a WAF with access rights to one or more
S3 buckets containing sensitive customer data is a major concern.  While a
WAF may have a legitimate reason for accessing S3 buckets (e.g. logging), it
is unlikely that a WAF role would require specific access to this S3 bucket
considering the data it contained. This may have been an oversight in the
access review process or an overall architectural issue. Onica recommends
that companies should examine their existing IAM roles to ensure that the
principle of least privilege is being followed. This should be followed
by an ongoing review process periodically. Finally, having behavioral
detection technologies in place will alert you to abnormal access
activities, such as a WAF role attempting to access 700 S3 buckets.


<a class="cta purple" id="cta" href="https://www.rackspace.com/onica">Learn more about our AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
