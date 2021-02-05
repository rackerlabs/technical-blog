---
layout: post
title: "Expanding ObjectRocket for MongoDB to AWS and GCP"
date: 2021-02-05
comments: true
author: James Hong
published: true
authorIsRacker: true
bio: "James has always been interested in anything and everything technology
since he was 5 years old. Started out with just exploring the internet and
tinkering with computers during the dial-up era to learning programming in junior
high and eventually graduating from University of Illinois Urbana-Champaign with
a bachelor’s in Computer Science. James is currently a Product Manager at
ObjectRocket creating exciting new features for Redis and Elasticsearch."
categories:
    - Database
    - ObjectRocket
    - AWS
canonical: https://www.objectrocket.com/blog/mongodb/expanding-objectrocket-for-mongodb-to-aws-and-gcp/
metaTitle: "Expanding ObjectRocket for MongoDB to AWS and GCP"
metaDescription: "This post announces the expansion of our managed MongoDB service into AWS and GCP public clouds."
ogTitle: "Expanding ObjectRocket for MongoDB to AWS and GCP"
ogDescription: "This post announces the expansion of our managed MongoDB service into AWS and GCP public clouds."
slug: "expanding-objectrocket-for-mongodb-to-aws-and-gcp"

---

*Originally published in October 2020, at ObjectRocket.com/blog*

The ObjectRocket Database-as-a-Service team proudly announced in 2020 Q4 that we've expanded
support for our hosted MongoDB&reg; offering into AWS&reg; and GCP&reg; clouds. This launch
is extra special to us because when ObjectRocket Database-as-a-Service launched in 2012, it
launched with MongoDB. MongoDB will always have a special place in our hearts and minds, so
bringing this service to AWS, GCP, and soon Azure is a notable and significant expansion of
the ObjectRocket platform.

<!--more-->
​​
### What's new?
​
The simple answer is everything! Roughly a year ago, we began our transition to an all-new
Kubernetes&reg;-based hosting platform, and with our MongoDB service, we started from scratch
as well. We fully rebuilt the product on a Kubernetes operator of our own design, enabling
several new features and paving the way for our next wave of enhancements.
​
#### Standard features
​
As with our existing MongoDB service, each cluster is available with:
​
- **Dedicated containers and MongoDB instances**: The MongoDB instance is dedicated to you
  and never shared with other users.
- **Three-node replica sets**: You always get three identical nodes in a replica set
  configuration, with automated failover for high-availability.
- **Automated compactions**: Our platform automates the compaction of your data to ensure
  you're optimally using your provisioned space.
- **Robust security**: With every instance, you get TLS encryption, Access Control Lists,
  user authentication, isolated network namespaces, and encryption at rest.
- **Metrics dashboards**: Access to instance metrics dashboards is available on all instances.
- **Automated backups with two-week retention**: Backups are always included with your
  instance and operate automatically.
- **ObjectRocket support**: It wouldn't be ObjectRocket without access to 24x7 monitoring
  and support, backed by our team of engineers.
​
#### ... With some new twists
​
You get all of the preceding features, but there are a few new capabilities if you look
another layer down:
​
- **Client certificate authentication**: Though password authentication is still available,
  we've added the ability to authenticate with client certificates to provide an extra layer
  of security for accessing your instance.
- **New DNS seed list connection strings**: Our new instances use the `mongodb+srv`
  connection string format, which points to a DNS seed list. This new format provides
  additional resiliency, flexibility if the underlying instances change, and enables some
  new capabilities in the future.
- **More flexibility in compactions**: Rather than a weekly window for compactions with a
  separate stepdown window, we now allow you to set cron-style compaction schedules.
​
### Next stop: Sharding
​
An extremely important part of our existing product is our sharded clusters, and we want
to bring that same feature to our new platform. Though we launched with replica sets only,
we've already laid the groundwork and hope to release sharded clusters as an extension of
that product very soon.
​
When we do launch sharded clusters, you can expect the same ease of use, flexibility, and
support that we've always offered.
​
### Availability
​
We're now offering MongoDB versions 3.6, 4.0, and 4.2 clusters in AWS and GCP through our
Private DBaaS offering. Rather than using shared infrastructure, Private DBaaS allows you
to get a completely dedicated DBaaS cluster in almost any AWS or GCP region that you can
use to host any and all of our hosted database services. Stay tuned for future updates on
availability. If you have any questions about MongoDB product, our
[experts](https://www.objectrocket.com/contact/) would be happy to help you.
​
You can find additional information on our [web site](https://www.objectrocket.com/managed-mongodb/),
[public documentation](https://docs.objectrocket.com/mongodb.html), or
[API docs](https://docs.api.objectrocket.cloud/#mongodb-instances).

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases">Learn more about our Database services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Let's Talk** to [start the conversation](https://www.rackspace.com/).

