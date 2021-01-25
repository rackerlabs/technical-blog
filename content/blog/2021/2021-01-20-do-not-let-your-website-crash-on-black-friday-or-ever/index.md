---
layout: post
title: "Do not let your website crash on Black Friday or ever"
date: 2021-01-20
comments: true
author: Rackspace Onica Team
published: true
authorIsRacker: true
categories:
    - General
    - AWS 
    - Cloud Monitoring
metaTitle: "Do not let your website crash on Black Friday or ever"
metaDescription: "E-commerce companies need to assess their readiness for the onslaught of online shoppers, especially during
high-demand seasons. IT infrastructures that currently run smoothly supporting normal day-to-day traffic might not be prepared
to handle the surge of holiday shoppers. Can your applications and website support this increase in activity?"
ogTitle: "Do not let your website crash on Black Friday or ever"
ogDescription: "E-commerce companies need to assess their readiness for the onslaught of online shoppers, especially during
high-demand seasons. IT infrastructures that currently run smoothly supporting normal day-to-day traffic might not be prepared
to handle the surge of holiday shoppers. Can your applications and website support this increase in activity?"
slug: "dont-let-your-website-crash-on-black-friday-or-ever"
canonical: https://onica.com/blog/migration/e-commerce-sites-ready-for-black-friday/
---

*Originally published in Nov 2017, at Onica.com/blog*

In 2017, Macy’s&reg; wasn’t the only retail website that was overwhelmed on the biggest shopping day of the year.
Old Navy&reg;, GAME&reg;, and Quidco&reg; were also caught unprepared for the high traffic surges and lost sales
opportunities in the short and long run.

<!--more-->

In 2015, it was Neiman Marcus and Target&reg; that collapsed under the weight of online demand, and the year before,
Best Buy&reg;.

E-commerce companies need to assess their readiness for the onslaught of online shoppers, especially during high-demand
seasons. IT infrastructures that currently run smoothly supporting normal day-to-day traffic might not be prepared to
handle the surge of holiday shoppers. Can your applications and website support this increase in activity?

### Lessons from Amazon

Let’s look at how Amazon&reg; itself prepared for its own Black Friday&mdash;Amazon Prime Day&reg; when the web giant
gives special deals to its most loyal customers. According to the company, Amazon accounted for 74 percent of all U.S.
consumer e-commerce on Prime Day 2016 and saw record-high levels of traffic, including double the number of orders on
the Amazon Mobile App compared to Prime Day 2015.

#### Scaling EC2

Amazon prepared for the traffic spike by employing a small army of EC2&reg; instances to handle web traffic, using resources
from its availability zones around the world. It then prepared for surges from time zones throughout the world as people
started their shopping from Asia to Europe to the United States.

Amazon also meticulously prepared and planned for the event. The retail IT team looked at historical performance to predict
traffic, and staged failure exercises by intentionally&mdash;and unexpectedly&mdash;breaking parts of the infrastructure to
run drills. It also automated as much scalability as possible, using Route 53 to scale DNS automatically, Auto Scaling to
scale EC2 capacity on-demand, and Elastic Load Balancing to automate failover and automatically balance traffic in every
region. Finally, a dedicated team monitored CloudWatch&reg; with religious fervor to track usage and ensure customer satisfaction.

#### Expecting the unexpected

Unfortunately, Black Friday-like experiences can happen to a company unexpectedly. For example, preceding the release of
*Star Wars: The Force Awakens*, we helped [MovieTickets.com](https://onica.com/case-study/movietickets-com/) migrate its
entire customer-facing infrastructure to Amazon Web Services and tested it repeatedly. Fandango&reg;, another online
ticketing company, was not so well-prepared. Its site crashed when tickets went on sale, and shoppers ended-up in a
purgatory-type waiting room, where they had to wait all night if they wanted to secure tickets.

#### Learning from mistakes

Learning from the mistakes and successes of other companies when demand for web resources exceeds expectations can help
you prepare for planned and unplanned events. Black Friday, Cyber Monday, elections, global media releases, product launches,
and other events can wreak havoc on you and your customers. They can also allow you to delight them with a positive experience
while others are frustrated on competing e-commerce sites.

Rackspace Onica is a top AWS Premier Consulting and audited [Managed Service Partner](https://onica.com/services/managed-cloud-operations/).
We’ve migrated 85,000+ servers to AWS, performing everything from basic *lift and shift* to helping to re-architect and manage
services on clients’ infrastructures so that they can take full advantage of cloud resources. If you’d like to learn how working
with an AWS Premier Consulting Partner can improve your business, [contact us](https://onica.com/contact/) for a quick assessment.

<a class="cta blue" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click **Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
