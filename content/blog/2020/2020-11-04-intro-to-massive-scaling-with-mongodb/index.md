---
layout: post
title: "Intro to massive scaling with MongoDB"
date: 2020-11-04
comments: true
author: Kimberly Wilkins
bio: "Principal Engineer, Solutions Architect, Database Team Manager, trusted advisor, and technical evangelist in the NoSQL arena. 
Kimberly now works mainly with NoSQL technologies such as MongoDB, supporting pre-sale and post-sale efforts and client on-boarding and support. 
She is passionate about emerging technology and trends (including AR/VR/MR, AI, ML, DL as well IoT/EoT/IIoT and blockchain topics), 
while also investigating new data store offerings such as DocumentDB, QLDB, Snowflake, and more as they come along."
published: true
authorIsRacker: true
categories:
    - Database 
    - ObjectRocket
    
metaTitle: "Intro to massive scaling with MongoDB"
metaDescription: "Scaling refers to the ability to meet additional needs around storage/disk, RAM/memory, CPUs/comnpute cycles, 
networking, and other resources"
ogTitle: "Intro to massive scaling with MongoDB"
ogDescription: "Scaling refers to the ability to meet additional needs around storage/disk, RAM/memory, CPUs/comnpute cycles, 
networking, and other resources"
slug: "intro-to-massive-scaling-with-mongodb"
canonical: https://www.objectrocket.com/blog/mongodb/intro-to-massive-scaling-with-mongodb/
---

*Originally published on June 4, 2018, at ObjectRocket.com/blog*

We could define **scaling** as removing the scales from a fish. However, with databases, **scaling** refers to the ability to
expand to meet additional needs around storage, disk, RAM, CPUs, compute cycles, networking, or other resources.

<!--more-->

{{<img src="picture1.jpg" title="" alt="">}}

### How do you know when it’s time to scale?

Today, it’s common to see the rapid growth of data and rapid adoption rates for applications, such as when apps start to go
viral and usage takes off. When this happens, you’ll outgrow your initial environment rapidly. That growth can happen due to
physical data storage needs, performance hits, and degradation that would require more resources. Think CPU, RAM, networking,
or a combination of all of those areas. You can either proactively plan for growth, or you can choose to scale when you start
seeing small performance hits.

#### Scaling proactively

At least two general patterns may take place when you proactively plan to scale:

+ You have a big marketing push coming up, and you'll grow significantly in the number of customers or amount of data.
+ Your application or business tends to be cyclical (such as Christmas buying, New Years’ resolutions, and so on), and you see
  an activity increase that leads to capturing and keeping a high volume of data.

Read our post: [How to determine when it’s the right time to scale your MongoDB instances](https://www.objectrocket.com/blog/how-to/when-to-scale-mongodb-instances/).

#### Scaling reactively

If you hit bottlenecks and you expect to continue to grow, you need to think about scaling.

Trouble signs include things such as the following concerns:

+ Increased query times for end-users
+ Increased login times
+ Requests and servers freezing up
+ Database complaints from developers
+ Slower server response times
+ Increased load on hosts
+ Out-of-memory errors
+ Unintended elections
+ Errors in the logs

When you start seeing these signs, it’s time to start scaling to keep up with demand and make sure you aren’t losing customers. 

You can scale *vertically* (up) or *horizontally* (out)

{{<img src="picture2.jpg" title="" alt="">}}

#### Scaling vertically

This is the proverbial *Big Iron* method: One big machine with lots of resources (CPU cores, higher CPU speeds, lots of RAM, storage).
The main benefits of vertical scaling include reduced architectural complexity and fewer hosts to maintain. This is helpful if you
don’t have anyone to handle maintenance for you.

Several ways to scale vertically are available today. Some of those options include better commodity hardware, cheaper disks and
storage, better storage options, cheaper memory, better software, and networking so you can more gracefully handle failovers and
interruptions.

Scaling up is ideal for many applications and needs, and we recommend the *Replica Sets* we discuss in the following section. One
thing to keep in mind when you use larger replica sets is that there might be hidden costs to scaling vertically. If your environment
continues to grow rapidly, you might have to constantly move to larger machines or have additional resources until you reach a point
where that is no longer an option. You should also consider that upgrade cycles are less efficient on a single larger host versus a
horizontally scaled environment. With continued growth, you have to decide if you should continue to scale up or if you might benefit
from scaling horizontally.

#### Scaling horizontally

Sharding is horizontal scaling. Sharding stores data across multiple nodes, distributing the load and the processes across the
hosts. Replication is handled by using the  Primary-Replica model with the ability to add additional nodes as needed.

The load balancer ditributes chunks of data across the disks on the nodes.

This increases read and write capacity by distributing read and write operations across a group of machines, instead of hammering
one machine with writes or reads. Luckily, there have been great improvements in balancer function over the last few releases.
Scaling horizontally takes advantage of the MongoDB&reg; built-in sharding ability and benefits from using cheaper commodity hardware.

When you scale horizontally, you add resources with physical or virtual hosts.

+ Physical – lots of lower-cost commodity hardware
+ Virtual – add additional CPU cores or nodes by using VMs or cloud
+ Networking – add load balancers, additional mongoS&reg; processes, and so on

Using improved load balancing technologies (hardware and software) to shuttle traffic to where it needs to go by using load balancers.

#### How do you implement scaling with replica sets in MongoDB?

MongoDB can scale out horizontally by using single large replica sets with one **Primary** and two **Secondaries** that have heartbeat
communication for the up or down state. Replication happens on the secondaries through the operational logistics.

#### Horizontal scaling: Replica set or sharding?

The trade-off with sharding is increased overall complexity. But sharding also provides a benefit by simplifying maintenance. It allows
for rolling upgrades and lets you perform certain operations such as index builds in parallel simultaneously across your shard and nodes.
Following are some comparisons between larger replica sets versus sharded clusters:

| **Replica Set** | **Sharding** |
| --------------- | ------------ |  
| Simple | Expertise needed |
| Lots of reads across a wide data set (Don’t want to scatter gathers) | Lots of writes and updates (Want to go directly to exact shards for results) |
| Lots of data, lower activity rates | Lots of data, lots of activity |
| Need more *normal* resources, such as disks | Need more of all resources, including disks, RAM, CPU, write scopes |

### Why choose managed MongoDB from ObjectRocket?

Rackspace ObjectRocket means **expertise**. We have managed [MongoDB](https://www.objectrocket.com/managed-mongodb/) at scale from the
get-go. We offer support for larger replica sets, and we were one of the first providers to offer support for larger sharded MongoDB
clusters. Our engineers and DBAs have experience and have overcome very complex obstacles&mdash;obstacles that are commonly unheard of
for other providers.

Some of our largest customers in the marketing technology vertical (mobile analytics, media, email campaigns, mobile advertising fraud
detection, and digital media) often hit bugs that no one else sees or knows how to fix. Billions of messages and documents from a variety
of customers, thousands of large and small campaigns&mdash;our platform hosts them all. 

The service we provide includes: 

+ Infrastructure
+ Storage
+ IOPS
+ Network
+ The best hands-on support, hands-down. The right response 24×7.

[View plans and pricing](https://www.objectrocket.com/pricing/).

We aim to provide cloud solutions that offer fully robust setups and not provision your **secondaries** on virtual volumes. Thus we avoid
performance issues that might arise if an election occurs and your **primary** ends up on the less robust hosts provisioned only for
secondaries. That’s it for scaling. Don't forget to learn more about when to [scale your MongoDB instances](https://www.objectrocket.com/blog/how-to/when-to-scale-mongodb-instances/), sharding tips, selecting the best shard keys, and more.


<a class="cta blue" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
