---
layout: post
title: "Scaling AWS for Black Friday: Best practices"
date: 2020-11-30
comments: true
author: Rackspace Onica Team
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "Scaling AWS for Black Friday: Best practices"
metaDescription: "Events like Black Friday and Cyber Monday can pose a challenging endeavor for eCommerce sites and online businesses, who need to ensure that their online infrastructures can scale and maintain strength under abnormally high traffic loads."
ogTitle: "Scaling AWS for Black Friday: Best practices"
ogDescription: "Events like Black Friday and Cyber Monday can pose a challenging endeavor for eCommerce sites and online businesses, who need to ensure that their online infrastructures can scale and maintain strength under abnormally high traffic loads."
slug: "scaling-aws-for-black-friday-best-practices"
canonical: https://onica.com/industries/retail/scaling-aws-for-black-friday-best-practices/

---

*Originally published on October 21, 2019 on Onica.com/blog*


With the holiday season approaching, your online shopping site is likely to experience high
volume traffic because events such as Black Friday and Cyber Monday sales are on
schedule for their annual return. Black Friday raked up
[$6.22 billion in online sales in 2018](https://www.cnbc.com/2018/11/24/black-friday-pulled-in-a-record-6point22-billion-in-online-sales-adobe.html),
and with a sustained annual growth rate of between
20-25%, the 2020 holiday season is shaping up to be one of the biggest
online shopping events yet.

<!--more-->

While this may be an exciting time for shoppers, events like Black Friday and
Cyber Monday can be challenging for eCommerce sites and online
businesses, who need to ensure that their online infrastructures can scale and
maintain strength under abnormally high traffic loads. Following problematic
instances from earlier years, 2018 saw many large retailers face website
crashes, including
[high-profile retail brands](https://www.businessinsider.com/lululemons-website-crashes-with-black-friday-sales-2018-11),
with some having
[lost over $700,000 in sales](https://www.businessinsider.com/jcrew-website-crashes-on-black-friday-2018-11)
per estimates by experts.

On the entertainment front, *Avengers: Endgame* broke box office records in
ticket sales,
[crashing the websites](https://www.bloomberg.com/news/articles/2019-04-02/-endgame-crashes-ticket-sites-as-theaters-brace-for-new-record)
of AMC Entertainment&reg;, the largest U.S. theatre chain, as well as Fandango&reg;, a
popular ticket sales website. Despite the recurrence of such crashes,
substantial growth in online sales makes it hard for companies and eCommerce
platforms to accurately project and adequately prepare for these high traffic
events. Furthermore, customer frustration that grows out of these crashes can
have a drastic impact on long term sentiment, resulting in reduced sales and
a potentially tarnished company image.

In light of these implications, it is important to start thinking about
addressing your website or applications’ scalability and stability. In fact,
scalability is one of the primary reasons businesses
[migrate their infrastructure to the cloud](https://onica.com/amazon-web-services/migration/).
AWS&reg; offers a highly supportive environment for such high traffic events, with
a variety of tools and features that can ease efforts in this regard.

Rackspace Onica has helped a broad set of customers move their infrastructures onto AWS
for exactly these considerations.
[MovieTickets.com](https://onica.com/case-study/movietickets-com/), a ticket
supplier, moved their entire infrastructure on AWS to support the high
scalability that they expected to need during the release of
*Star Wars: The Force Awakens*. This move allowed them to avoid crashes similar to the
ones that Fandango and AMC Entertainment faced when they released *Avengers: Endgame*.
[The Orange County Registrar of Voters](https://onica.com/case-study/orange-county-registrar-of-voters/)
also sought Onica’s help to migrate their website to AWS so that they could
support high traffic during election times.

### Five AWS auto-scaling best practices to build resiliency against high-volume traffic

Migrating to the cloud, although a great first step, is not the only measure
required to ensure that a company’s website or application can survive
unprecedented traffic surges. In addition to automating and scaling as much
as possible, the following set of AWS auto scaling best-practices can help
companies maximize the robustness and preparedness of their infrastructures.

1. Place checks and measures with
   [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/). Monitoring the
   performance of critical assets during high traffic events such as Black
   Friday sales is very important. A workflow where the right people are
   alerted or appropriate actions triggered as soon as possible, through
   alarms and notifications set up for key performance metrics, can help you
   stay on top of issues if they arise.

2. Use [AWS Auto Scaling](https://aws.amazon.com/autoscaling/). It is good
   practice to place the most needed resources into auto-scaling groups. These
   groups can help you treat multiple instances as a single object and scale
   specific instance types with specific resources together. AWS Auto
   Scaling also performs regular health checks on Amazon EC2 instances,
   replacing those that fail the check. In addition to supporting PCI-compliant
   processing, storage, and transmission of credit card data, these features
   make AWS Auto Scaling an effective tool to combat high-traffic load.

3. Leverage [Elastic Load Balancing](https://aws.amazon.com/elasticloadbalancing/).
   Distributing incoming application traffic across multiple instances in your
   AWS Auto Scaling group can ease traffic load. Elastic Load Balancing can
   help you achieve this automatically, in addition to balancing traffic
   across multiple Availability Zones.

4. [Amazon Route 53&reg;](https://aws.amazon.com/route53/) is typically used to
   route DNS queries to your load balancer, and you can also configure it for
   DNS failover. Amazon Route 53 then checks the health of registered
   Elastic Load Balancing endpoints to determine your application’s
   availability and routes requests to the most available resource.

5. Using [Amazon ElastiCache](https://aws.amazon.com/elasticache/) can
   help improve performance by storing information on fast, managed, in-memory
   stores to accelerate data retrieval compared to slower disk-based
   databases. Additionally, it detects and replaces failed nodes and reduces
   the risk of overloaded databases to keep website and application load
   times speedy.

Ensuring all the preceding measures are in place is only one of the early stages
in preparing for high-traffic events. Forecasting and building future-traffic
models based on historical metrics to estimate your future resource
requirements is a very important consideration in being prepared. This data
can inform test scripts that test the robustness and scalability of your
infrastructure. Coupling these tests with surprise drills for the team can help
build preparedness and reveal potential areas of concern. AWS also allows
[vulnerability and penetration testing](https://aws.amazon.com/security/penetration-testing/)
as long as it falls within the AWS Security Testing Terms and Conditions.

In the end, the goal of scaling for such high traffic events is to ensure that
your customers have a great experience as they interact with your application
or website. A slow or unavailable network can cost more than an immediate
sale, as customer sentiment is affected in the long term. Hence, thinking
about your customers' needs and wants while fortifying your
infrastructure can go a long way in ensuring you spend your effort in the best places.

While these tools and best practices serve the scalability
and stability needs of high traffic periods, you should be prepared all
year long. Being aware of current environmental and economic factors,
shopping traffic trends, and buyer behavior throughout the year can help
build a clearer picture of what you can expect when the shopping season
commences.

<a class="cta red" id="cta" href="https://www.rackspace.com/onica">Learn more about our AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
