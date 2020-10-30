---
layout: post
title: "On the second day of christmas objectrocket gave to me two high availability postgresql replicas"
date: 2020-11-02
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
    - ObjectRocket
    - Database
metaTitle: "On the second day of christmas objectrocket gave to me two high availability postgresql replicas"
metaDescription: "PostgreSQL now offers High Availability to optimize production workloads."
ogTitle: "On the second day of christmas objectrocket gave to me two high availability postgresql replicas"
ogDescription: "PostgreSQL now offers High Availability to optimize production workloads."
slug: "on-the-second-day-of-christmas-objectrocket-gave-to-me-two-high-availability-postgresql-replicas"
canonical: https://www.objectrocket.com/blog/uncategorized/on-the-second-day-of-christmas-objectrocket-gave-to-me-two-ha-postgres-replicas/
---

*Originally published on Dec 12, 2019, at ObjectRocket.com/blog*

The holidays are coming, and this season marks a one-year anniversary of an important milestone in the Rackspace ObjectRocket history. Just in time for the 2019 holiday season, we introduced **High Availability** (HA) on the ObjectRocket PostgreSQL&reg; service. Every datastore we offer on ObjectRocket is built for production workloads and that requires HA for all our clients.

<!--more-->

{{<img src="picture1.jpg" title="" alt="">}}

### Why is High Availability (HA) important? 

If the terms **High Availability** or **HA** are unfamiliar to you, let’s do a quick review of why HA is important. First and foremost, the three main benefits of HA are:

+ Zero or greatly reduced downtime
+ Protection against data loss
+ Increased database performance

There are several methods for implementing HA across datastores and several technologies available. However, a key component to almost any HA solution is a data replica. This means you only see one dataset or database, but behind the scenes, there are one or more exact replicas (copies) of that data. In the event that the main database, the **master**, in most replication schemes, encounters an issue like hardware failure, software failure, or corruption, a replica can replace the master. That last point touches on the second main component of most HA systems, and that is an automated failover mechanism ( promotion, or election in other schemes). Replication, as described precedingly, ensures multiple available healthy copies of the data, however, you should also be ready to:

1. Detect unexpected problems on the master
2. Select an appropriate replica to promote to master
3. Repair the failed master and create a new replica (to replace the one that has been promoted)

The final component, sometimes combined with the second, is a device to handle the routing of requests to the right node. If you point your application to the master for writing data (best practice), but that master fails, your application won't point to the newly promoted master. Once again, there are various ways to solve this, but the most popular is using proxies or load balancers. Point your application to the proxy or load balancer and it determines the right place to send your traffic without pointing your application directly to the database server.

To tie it all together, the automated failover system and proxy/load balancer work together when a failover occurs. When a new master is promoted, the proxy/load balancer is informed to direct traffic to the new master. Nothing changes in your application, and besides a potential blip in responses during promotion, the application doesn’t even need to know a promotion has occurred. This is a high-level overview of the process, it covers the fundamental components. Now let’s dive into the technologies that we used for each of those components on our solution.

### The technologies we use

Now that we’ve reviewed the key components, let’s dive into how we’re providing each of the preceding components.

#### Replication

Postgres supports a number of replication schemes natively. We support a configurable number of replicas; either 1 or 2, but we’ll be expanding the options in the future. One other finer point of replication is the concept of synchronous and asynchronous replication. Synchronous replication entails that the master waits for each replica to confirm that a write has completed before the master considers the write complete. In asynchronous, the master fires writes to replicas but doesn’t confirm their completion before confirming the application/client write. The solution that we use enables us to support both asynchronous and synchronous replication. By default, we enable synchronous replication, but we configure the replication in our environment to confirm that a write has been written to the Write-ahead Log (WAL) on master and to at least one replica. You can alter the settings per transaction or per session.

#### Failover and promotion

There are several open-source and third-party tools out there to provide failover and promotion functionality, but the tool we chose is **Patroni** because of its superior characteristics:

+ **Native Kubernetes&reg; support:** Our new platform is based on **Kubernetes&reg;**, so the ability to adopt a tool that just plugs into Kubernetes, instead of requiring another state or consensus mechanism, is key.
+ **Active development and community:** The community around Patroni is extremely active and gives us the opportunity to collaborate and contribute our own additions as functionality grows. In addition, there are plenty of resources, from conference talks and documentation to an operator example from **Zalando**, to help us learn the technology.
+ **Simple Architecture:** Many of the other available tools require dedicated resources outside of the Postgres instances themselves to handle load balancing and master promotion. Patroni wraps around Postgres itself and uses native Kubernetes components to handle the other functions, so we didn't allocate additional resources to HA.

Though your mileage may vary, we’ve found Patroni to be an excellent easy to configure and maintain fit in our environment. You basically tell Patroni which HA group a node is part of and it does the rest. It handles configuring replication, detection of failed masters, promotion of replicas, creation of new replicas, and even works with Kubernetes on the last part of the process.

#### Request routing

Finally, Patroni and a native Kubernetes construct called a “service” represent the final piece of the puzzle. A service in Kubernetes operates like a proxy that routes traffic based on labels on a group of containers (a pod). Patroni handles labeling the active master with a master label, and Kubernetes takes care of routing database traffic only to the pods with the master label. Please remember this a high-level description, in practice that’s how it works. This process can also be extended to provide a secondary port that routes database read requests to the replicas (to reduce the load on the master).
That’s a quick rundown of the technologies in place, but let us know if you’d like to hear more. We love to talk shop with our customers.

##### Try it out now!

The **Create an Instance** screen in **Mission Control** has a section under Step 2 called **Customize Your Instance**.  There you can click the box to turn the arrow green, which will add HA replicas of your PostgreSQL instance. You can also select the number of replicas (1 or 2) by clicking the ellipses (…) in the upper-right. 

{{<img src="picture2.png" title="" alt="">}}

By default, we recommend 2 replicas, so that even during an outage you have redundancy, but you can select 1 if you wish.

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click **Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
