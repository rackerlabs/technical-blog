---
layout: post
title: "Are you prepared for disaster recovery a comparison of public cloud options"
date: 2020-10-22
comments: true
author: Zahid Mustafa
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "Are you prepared for disaster recovery a comparison of public cloud options"
metaDescription: "."
ogTitle: "Are you prepared for disaster recovery a comparison of public cloud options"
ogDescription: "."
slug: "are-you-prepared-for-disaster-recovery-a-comparison-of-public-cloud-options"

---

This is part one of a three-part series explores disaster-recovery options, from models to
environments to public cloud offerings. Are you ready?

<!--more-->

This three-part series explores disaster-recovery options, from models to environments to
public cloud offerings. Are you ready?

### What is a disaster?

In technological terms, you can define
[a disaster](https://www.fema.gov/media-library-data/1527613746699-fa31d9ade55988da1293192f1b18f4e3/CPG201Final20180525_508c.pdf)
as any unplanned event that impacts your business's continuity and stability. People often
think of natural disasters such as earthquakes, floods, and storms. But a disaster could
also take any of the following forms: 

- Software or hardware failure
- Network or power outage
- Physical damage to a building from flooding or fire
- Human error

### Why is disaster recovery important?

Building a solid disaster recovery (DR) solution is not just about meeting your customer
or compliance requirements. The steps you take to plan and build a suitable DR solution
help ensure your business's stability and safeguard your reputation as a business as well. 

Extended outages to critical systems can result in the following consequences: 
- **Data loss and financial penalties**: If your business processes or stores financial or
  sensitive customer data, any loss of data can lead to non-compliance violations and financial
  penalties. 
- **Revenue loss**: Lost revenue due to loss of customers following DR-related outages.
- **Impact on reputation**: After an outage in your customer-facing critical systems, it
  can be difficult to regain trust with your existing customers or attract new customers.
- **Legal action**: Failure to deal with a disaster and extended outages in your critical
  systems can result in legal actions against your company. 

### Disaster recovery plan checklist

You should build an [effective DR plan](https://www.ready.gov/business/implementation/IT)
on an effective set of policies, processes, tools, and documentation. The plan should also
focus on restoring your critical data and applications in the event of a disaster. Critical
steps in your plan should include: 

- Evaluate the impact of application failures on your business
- Maintain an inventory of your business-critical applications and DR requirements,
  including all metrics and service level agreements (SLA) 
- Maintain policies regarding SLAs, service level objectives (SLO), DR, and business
  continuity to ensure all new systems have DR capability built-in wherever necessary and
  appropriate 
- Regularly test DR failover and failback processes, DR documentation, and DR runbooks
- Regularly validate backups through testing restores and checking the data integrity of
  restored data
- Ensure your DR system meets your compliance and security requirements

### Analysis metrics for a disaster recovery plan

Recovery time objective and recovery point objective are two key metrics to consider when
planning and designing your DR solution. 

- **Recovery time objective (RTO)**: RTO is the time it takes to bring your system back
online. It is the maximum amount of time your business can tolerate an outage of your
critical applications and business processes. 
- **Recovery point objective (RPO)**: RPO is a quantitative measure of the amount of data
loss your business can tolerate based on time. 

Typically, lower RTO and RPO requirements result in higher costs. In other words, the
quicker you need to bring your systems back online, the higher the cost for the required
components and services. For example,  your online customer-facing applications typically
need to be recovered very quickly, and so would have a lower RTO and RPO. 

### Four common disaster recovery planning models

The DR model you select should be based on your recovery goals. For example, a system that
stores compliance-related historical data would probably not need quick access to data. In
that case, a high RTO and a cold DR model, based on backup and restore, might be appropriate. 

Following are common models used in successful DR strategies:

#### Cold backup and restore model

This DR approach is simple, inexpensive, and suitable for non-critical systems with high
RTO and RPO requirements. For example, if your system is non-critical and can tolerate an
outage of up to 24 hours, a daily backup to tape or disk may be sufficient to meet your
recovery needs. 

#### Pilot light model

In this approach, a scaled-down copy of your infrastructure is running simultaneously.
Database data is replicated from your primary to secondary sites in real-time, while your
web and application tiers are switched off and used only during DR failover or testing. 

Unlike a cold approach, the core elements, such as the database, are already configured and
running in your secondary site. The application and web servers are not running, but
templates and machine images are replicated to the DR site. In a DR situation, you can
quickly provision an environment, which includes the required core components. These can
then be scaled up to handle production load through automation and auto-scaling. 

#### Warm active-passive model

Both your database and application tier data are continuously replicated to a secondary
site and can be designed to failover automatically. It builds on the pilot light model by
ensuring that the secondary site has a fully functional set of components. All components
are running and ready to go, but at a reduced scale compared to the primary production site. 
In a DR situation, you can set up the secondary site to automatically scale up to handle
production load. You can route user traffic automatically by using suitable load balancer
solutions, such as Route 53 in AWS&reg; or Azure&reg; Traffic Manager. 

The warm model usually costs less than the hot model described next, but your site might
experience some downtime while the secondary site comes online. The warm or active-passive
model is a good compromise between cost and DR capabilities as aggressive RTO and RPO
requirements can still be met at a reduced cost. 

#### Hot active-active model

This model is the most expensive and consists of a fully redundant copy of your production
environment at a secondary site. Both sites are active and share the day-to-day production
load. In a disaster situation, the secondary site takes over and is sized sufficiently to
handle normal production loads. 

### Coming Soon

Part two of this series on disaster preparation continues is coming next week, so be sure
to come back and learn more.

<a class="cta red" id="cta" href="https://www.rackspace.com/professional-services">Learn more about our Professional Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
