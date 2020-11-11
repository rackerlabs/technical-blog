---
layout: post
title: "Scaling distributed sql with objectrocket for cockroachdb"
date: 2020-11-12
comments: true
author: Tana Berry
bio: "At ObjectRocket (a Rackspace company), I moved over to 
the marketing side of the house, learned new magic on how to get out the word 
about our great DBaaS offerings, and leveraged my previous content 
and community experience. I focused on creating technical marketing content 
(mostly blogs) and social media (yay Twitter!), plus doing a bit of work with 
the dev teams on tech docs. This role took me back full circle to databases, 
where I started out 20+ years ago. ;-) Rackspace ObjectRocket provides database expertise
and management of several popular databases in the Cloud&mdash;they do the database work, 
and enable developers to focus on their application's product design and coding, 
not the underlying DB."
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "Scaling distributed sql with objectrocket for cockroachdb"
metaDescription: "."
ogTitle: "Scaling distributed sql with objectrocket for cockroachdb"
ogDescription: "."
slug: "scaling-distributed-sql-with-objectrocket-for-cockroachdb"
canonical: https://www.objectrocket.com/blog/cockroachdb/scaling-distributed-sql-with-objectrocket-for-cockroachdb/ 

---

*Originally published in Aug, 2019 at ObjectRocket.com/blog* 

Recently we introduced CockroachDB as part of the ObjectRocket family of database technologies. The scaling abilities of CockroachDB are exciting, with data replication and distribution (maximizing high availability), automatic database rebalancing, and multi-geo data centers supporting data domiciling compliance, to name a few. And all of this with high data integrity and distributed ACID transactions, because CockroachDB was designed with data resiliency as a must-have.
We want to share some of the highlights of scaling with CockroachDB, and cover how ObjectRocket’s DBaaS solution makes it easy to implement all of the scaling advantages that this database offers. As a developer, using CockroachDB on our managed services platform means that you can focus on building your applications, and not on the intricacies of running a database.   

<!--more-->

{{<img src="Picture1.png" title="" alt="">}}

### These days, scaling is paramount

Twenty years ago storage was an expensive concern, and the term Big Data made it clear that we faced big challenges. We had massive amounts of data, and no good way to analyze or use that data. But now, technology can handle Big Data and the constant barrage of queries and transactions inherent in our modern world of e-commerce, financial software, research, business administration, and data mining. Another technology frontier, the Internet of Things, increases the number of devices generating data and running transactions online; you can now add cameras, light switches, and refrigerators to the long list of devices that are creating useful data online.
In this landscape, it’s critical to implement a scaling strategy that meets the current demands on your data stores, but also allows for the inevitable growth in data and new, not-yet-imagined, sources of even more data and transactions. 
Scaling simply means ramping up (or down) the database resources needed to appropriately handle the current workload. There are two main ways to scale:
vertical scaling: adding (or removing) RAM, storage space, and CPU to the underlying nodes within a cluster
horizontal scaling: adding more nodes as needed to handle the workload (instead of adding more resources to a single node)
Typically, most relational databases use vertical scaling. However, most distributed databases (often non-relational) use horizontal scaling; this model is better for heavy  transactional loads, frequent queries, reads/writes, and resiliency requirements.
One can only scale vertically so far, due to the technical (computational) limits of a single piece of hardware. 
However, scaling horizontally is not constrained computationally, and is really only limited to the amount of hardware available and what the software supports. What makes Cockroach unique is that it provides a great solution to being able to scale a relational database horizontally (traditionally not possible) in response to rapid, real-time reads/writes inherent in distributed online transaction processing (OLTP) systems. You can also scale CockroachDB vertically, but scaling out by adding more nodes is the preferred method.

#### What makes CockroachDB scaling special?

According to Derek Johnson, Product Manager at ObjectRocket, the most exciting aspect of CockroachDB’s scaling is how smart it is. Once the first node is created and configured, adding subsequent nodes is simplified. In multi-node environments, the powerful CockroachDB features of auto-scale, balance data, and self-managed geo-specific compliance requirements are leveraged to keep your data stores reliable, compliant, and performant. With optimized configurations, you can take advantage of the real powers of CockroachDB. For example, by using the —locality  flag to describe the node’s region and availability zone, CockroachDB implements geo-partitioning and automatically keeps data within the specified region.
Here’s a breakdown of some scaling highlights.

#### Data integrity as your data stores scale

+ All transactions are ACID-compliant, and you can use them in the usual way, via SQL commands like BEGIN
or COMMIT
+ CockroachDB differs from the traditional relational model database, in that during scaling, both reads and writes are distributed across all relevant nodes instead of all writes going to a single node. This “multi-active availability” is CockroachDB’s version of high availability (and it allows for easier geo-spanning).
+ CockroachDB uses consensus replication, by sending replication requests to at least three different nodes, and then waiting to commit until a majority of the nodes report back that they have successfully replicated the data.
+ Mediated transactions, with intents and records for each write, prevents transaction conflicts. CockroachDB uses two objects to “mediate” all transactions, a transaction record and a write intent, which check in with each other and if needed, restart the transaction to make sure that the latest values are committed.
+ Because of how data is replicated and balanced, CockroachDB provides a good balance of performance and data integrity

#### Geo-partitioning to the rescue


Instead of creating shards that are then geographically siloed ( improving latency but preventing cross-geo queries), CockroachDB uses configuration settings (not more application code) at the range level to replicate data within defined regions.
CockroachDB delivers double-purpose value with its unique geo-partitioning capabilities; by configuring the specific region that data can be stored in, you achieve both application performance (data closer to users’ apps!) and data domiciling compliance (think GDPR).
The CockroachDB Admin UI has a fantastic geographic display called the Node Map, which shows a map of the world with icons for all nodes and the details for each node. This graphical display helps with for planning ahead as well as for troubleshooting latency issues between data stores. When accessing your CockroachDB through the ObjectRocket Mission Control UI, users can easily link to the CockroachDB Admin UI to view the Node Map.

#### Adding new nodes manually, with appropriate configurations, allows for smart and rapid subsequent scale-outs

+ If you want to proactively spin up new nodes, you can either use a command via CLI or the Admin UI to create the node and set the needed flags and other configurations.
+ Many databases need to be stopped and restarted to scale, but with CockroachDB, adding more nodes while the system is under load is very simple.

#### Using orchestration, scaling is handled automatically, with no downtime 

+ Scaling CockroachDB when you are using an orchestration platform makes it even easier and allows for powerful automation. For example, when using Kubernetes (as ObjectRocket does) one single command can scale out CockroachDB, provisioning new resources and spinning up additional pods as needed.
+ Automatic rebalancing of data across the nodes, even between data centers and/or different cloud providers
+ Distributed transactions mean that there’s no impact to workload, there’s no downtime, no increase in latency.
+ Optimizing server utilization evenly across all nodes is a natural result of CockroachDB’s auto-scaling

#### Bringing it All Together in a Managed Service

ObjectRocket offers complete managed services for your CockroachDB data stores, using a Kubernetes container-based architecture. Included in the service is design and deployment consulting, full technical support, and all of the benefits of the enterprise licensed version of CockroachDB.
The key features of the managed CockroachDB solution are:






The following line shows how to add an image.  If you have no image, remove it.
If you have an image, add it to the post directory and replace the image name in the following line.

{{<img src="Picture1.png" title="" alt="">}}

### Conclusion

<a class="cta purple" id="cta" href="https://www.rackspace.com/sap">Learn more about our SAP services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
