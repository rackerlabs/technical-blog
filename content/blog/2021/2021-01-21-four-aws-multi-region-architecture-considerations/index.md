---
layout: post
title: "Four AWS multi-region architecture considerations"
date: 2021-01-21
comments: true
author: Rackspace Onica Team
published: true
authorIsRacker: true
categories:
    - General
    - AWS
metaTitle: "Four AWS multi-region architecture considerations"
metaDescription: "One of the questions we commonly hear from customers and prospects who are considering moving their web applications to Amazon EC2 is, “Do I need to build a multi-region architecture in AWS?"
ogTitle: "Four AWS multi-region architecture considerations"
ogDescription: "One of the questions we commonly hear from customers and prospects who are considering moving their web applications to Amazon EC2 is, “Do I need to build a multi-region architecture in AWS?"
canonical: https://onica.com/blog/security/aws-multi-region-architecture/
---

*Originally published in Apr 2016, at Onica.com/blog*

One of the questions we commonly hear from customers and prospects who are considering moving their web applications to Amazon&reg; EC2 is, “Do I need to build a multi-region architecture in AWS?”

<!--more-->

Amazon&reg; Elastic Compute Cloud&reg; or EC2&reg; helps make web-scale cloud computing easy for developers, providing them with complete control over the computing resources they run in AWS&reg;. With Amazon EC2, developers can quickly spin up new server instances and scale up or down capacity as their requirements change. One of the questions we commonly hear from customers and prospects who are considering moving their web applications to Amazon EC2 is, “Do I need to build a multi-region architecture in AWS?”

### Four AWS multi-region Architecture considerations 

AWS provides developers with a global infrastructure to run their applications in the Cloud. How many regions does AWS have? There are 77 Availability Zones in 24 geographic Regions around the world. Regions are defined as a physical location and Availability Zones or AZs contain one or more data centers in separate facilities. Since AWS has multiple availability zones, customers enjoy benefits such as high availability and improved continuity with replication between Regions. AWS plans to add 18 more Availability Zones and 6 more Regions this year.

While we think it can be wise to build an AWS multi-region architecture for global applications, it’s not always as simple as you think. And it’s certainly not as easy as designing a Multi-AZ architecture within a single Region.

Before building an AWS multi-region architecture, you should ask yourself &mdash; *Why do I really need a multi-region architecture?* Here are four reasons you should consider before building a multi-regional AWS presence:

#### Reason # 1.  I have web viewers around the world who are experiencing suboptimal performance.

If you are looking to improve performance for a globally distributed user base, I suggest looking at Amazon CloudFront CDN, Amazon’s low latency global content delivery network. In CloudFront CDN, you can run your web architecture within a single Region while having static web files, content, etc. cached at the edge locations closest to your end users all over the world with decreased latency.

#### Reason # 2. I have stringent availability demands and concerns that AWS multi-region architecture could fix.

You should consider that many large organizations are leveraging multiple AZ’s within one Region to achieve 99.999% up-times. This level of uptime and availability meets most demands.

#### Reason # 3. I have disaster recovery and business continuity requirements.

Multi-regional architectures are the norm for organizations with disaster recovery and business continuity requirements. It is however, important to also evaluate your recovery point and recovery time objectives (RPO and RTO) to determine which disaster recovery pattern is most suitable for your organization. In most cases, a *pilot-light* pattern is sufficient.

#### Reason # 4: There are laws governing my data that mandate regional PII data must remain within that region.

This is another scenario in which multi-regional architectures are the norm. Investigate an **active/active** architecture, but realize that there might be many challenges ahead. You can see a map of AWS's global infrastucture [here](https://aws.amazon.com/es/about-aws/global-infrastructure/)

#### Conclusion

Always remember to *keep it simple* and thoroughly assess your organization’s requirements before going down the **active/active** multi-region route. There are many challenges, including **master/master** database configurations, routing, throughput, cost, and more to consider prior to building your multi-region architecture in AWS.

#### Want to learn more about AWS multi-region architecture?

[Contact us](https://onica.com/contact/) for a free [AWS Cloud](https://onica.com/amazon-web-services/) consultation to learn more about how your organization can take advantage of the Cloud.

<a class="cta blue" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
