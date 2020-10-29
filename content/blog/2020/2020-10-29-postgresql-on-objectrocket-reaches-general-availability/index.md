---
layout: post
title: "Postgresql on Rackspace Object Rocket reaches general availability"
date: 2020-10-29
comments: true
author: Steve Croce
authorAvatar: 'https://gravatar.com/avatar/56d03e2d0f853cff39c129cab3761d49'
bio: "As Senior Product Manager for the ObjectRocket Database-as-a-Service
offering and Head of User Experience for ObjectRocket, Steve oversees the
day-to-day planning, development, and optimization of ObjectRocket-supported
database technologies, clouds, and features. A product manager by day, he still
likes to embrace his engineer roots by night and develop with Elasticsearch,
SQL, Kubernetes, and web application stacks. He's spoken at
KubeCon + CloudNativeCon, OpenStack summit, Percona Live, and various Rackspace
events."
published: true
authorIsRacker: true
categories:
    - Database
    - ObjectRocket
metaTitle: "Postgresql on Rackspace Object Rocket reaches general availability"
metaDescription: "Postgresql on Rackspace Object Rocket reaches general availability"
ogTitle: "Postgres backups and how to restore them on object rocket"
ogDescription: "Postgresql on Rackspace Object Rocket reaches general availability"
slug: "postgres-on-rackspace-objectrocket-reaches-general-availability"
canonical: https://www.objectrocket.com/blog/postgresql/pachyderm-on-the-loose-postgresql-on-objectrocket-has-reached-general-availability/

---

*Originally published on January 30, 2020, at ObjectRocket.com/blog*

{{<img src="picture1.png" title="" alt="">}}


<!--more-->

We first made our PostgreSQL service available in 2019 and we're pleased to announce that PostgreSQL is Generally Available (GA). We’ve provided updates along the way and just like our other recent GA products (CockroachDB and Elasticsearch), we wanted to ensure its success. We’re excited to reach this milestone and to share it with you all.

### How do you eat an elephant? 

PostgreSQL is used in so many different environments that the number of capabilities we needed to include in a hosted service is daunting. We’ve been working at it for the past few months and here’s how the new service stacks up:

| Service | PostgreSQL |
| ------- | ---------- |
| Versions Supported| 11 - 12.3|
| Cloud Availability | AWS, GCP, and Azure| 
| High Availability| Optional with 1-2 replicas|
| Backups| 2-week retention with Point-in-Time-Recovery included|
| Extensions| Standard list available (activate with **create extension**) |
| Monitoring and Metrics| Grafana dashboards included |
|Support | 24x7 support, with free migrations, tuning, query analysis, and more|

### Available now for your production workloads

Create a PostgreSQL instance, it's simple and you can do it by logging into [Mission Control](https://app.objectrocket.cloud/?__hstc=227540674.6c2da1a33c3f4e98dc8ac794308ed907.1602515328573.1603988241226.1603990372194.73&__hssc=227540674.1.1603990372194&__hsfp=3796701661&_ga=2.19141296.921919633.1603746187-1358969005.1602515327) configuring an instance, and building. We rovide a 200 USD introductory credit for new accounts, which will cover various sizes and types of PostgreSQL, so you can try out the service risk-free.

{{<img src="picture2.gif" title="" alt="">}}

We’re always open to feedback, so if there’s a region, feature, or size that you don’t see in the UI, please contact Rackspace ObjectRocket [sales](https://www.rackspace.com/). We’re constantly updating the product and what you need is right around the corner.

<a class="cta blue" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a> 

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
