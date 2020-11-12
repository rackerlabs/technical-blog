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
    - ObjectRocket
    - Database
metaTitle: "Scaling distributed sql with objectrocket for cockroachdb"
metaDescription: "ObjectRocket’s DBaaS solution makes it easy to implement all of the scaling advantages that CockroachDB offers."
ogTitle: "Scaling distributed sql with objectrocket for cockroachdb"
ogDescription: "ObjectRocket’s DBaaS solution makes it easy to implement all of the scaling advantages that CockroachDB offers."
slug: "scaling-distributed-sql-with-objectrocket-for-cockroachdb"
canonical: https://www.objectrocket.com/blog/cockroachdb/scaling-distributed-sql-with-objectrocket-for-cockroachdb/ 

---

*Originally published in Aug 2019, at ObjectRocket.com/blog* 

CockroachDB&reg; is part of the Rackspace ObjectRocket family of database technologies. The scaling abilities of [CockroachDB](https://www.objectrocket.com/blog/cockroachdb/introducing_cockroach/) are exciting, with data replication and distribution (maximizing high availability), automatic database rebalancing, and multi-geo data centers supporting data domiciling compliance, to name a few. And all of this with high data integrity and distributed ACID transactions, because CockroachDB's data resiliency is a must-have.
 

<!--more-->

We want to share some of the highlights of scaling with CockroachDB and go over what [Rackspace ObjectRocket's DBaaS](https://www.objectrocket.com) offers. As a developer, using CockroachDB on our managed services platform means that you can focus on building your applications, and not on the intricacies of running a database. 

{{<img src="Picture1.png" title="" alt="">}}

### These days, scaling is paramount

Twenty years ago storage was an expensive concern, and the term **Big Data** made it clear that we faced big challenges. We had massive amounts of data, and no good way to analyze or use that data. But now, technology can handle **Big Data** and the constant barrage of queries and transactions inherent in our modern world of e-commerce, financial software, research, business administration, and data mining. Another technology frontier, the **Internet of Things**, increases the number of devices generating data and running transactions online; you can now add cameras, light switches, and refrigerators to the long list of devices that are creating useful data online.

In this landscape, it’s critical to implement a scaling strategy that meets the current demands on your data stores, but also allows for the inevitable growth in data and new, not-yet-imagined, sources of even more data and transactions. 

Scaling simply means ramping up (or down) the database necessary resources to appropriately handle the current workload. There are two main ways to scale:

+ **Vertical scaling:** adding (or removing) RAM, storage space, and CPU to the underlying nodes within a cluster.
+ **Horizontal scaling:** adding more nodes when necessary to handle the workload (instead of adding more resources to a single node).

Most relational databases use vertical scaling. However, most distributed databases (often non-relational) use horizontal scaling; this model is better for heavy  transactional loads, frequent queries, reads/writes, and resiliency requirements. One can only scale vertically so far, due to the technical (computational) limits of a single piece of hardware. 

However, scaling horizontally is not constrained computationally, and is only limited to the amount of hardware available and what the software supports. What makes CockroachDB unique is that it provides a great solution to being able to scale a relational database horizontally (traditionally not possible) in response to rapid, real-time reads/writes inherent in distributed online transaction processing (OLTP) systems. You can also scale CockroachDB vertically, but scaling out by adding more nodes is the preferred method.

#### What makes CockroachDB scaling special?

According to Derek Johnson, Product Manager at ObjectRocket, the most exciting aspect of CockroachDB’s scaling is how smart it is. Once the first node is created and configured, adding subsequent nodes is simplified. In multi-node environments, the powerful CockroachDB features of auto-scale, balance data, and self-managed geo-specific compliance requirements are leveraged to keep your data stores reliable, compliant, and performant. With optimized configurations, you can take advantage of the real powers of CockroachDB. For example, by using the `—locality`  flag to describe the node’s region and availability zone, CockroachDB implements geo-partitioning and automatically keeps data within the specified region.

Here’s a breakdown of some scaling highlights.

#### Data integrity as your data stores scale

+ Transactions are ACID-compliant, and you can use them in the usual way, via SQL commands like `BEGIN`
or `COMMIT`.
+ CockroachDB differs from the relational model database, during scaling, it distributes both reads and writes across all relevant nodes instead of all writes going to a single node. This [multi-active availability](https://www.cockroachlabs.com/docs/stable/multi-active-availability.html) is CockroachDB’s version of high availability and allows geo-spanning.
+ CockroachDB uses consensus replication, by sending replication requests to at least three different nodes, and then waiting to commit until a majority of the nodes report back that they have successfully replicated the data.
+ Mediated transactions, with intents and records for each write, prevents transaction conflicts. 
+ CockroachDB uses two objects to “mediate” all transactions, a transaction record, and a write intent, which check-in with each other and if needed, restart the transaction to make sure it commits the latest values.
+ CockroachDB provides a good balance of performance and data integrity due to its data balance and replication. 

#### Geo-partitioning to the rescue!


Instead of creating shards that are then geographically siloed, improving latency but preventing cross-geo queries, CockroachDB uses configuration settings at the range level to replicate data within defined regions. CockroachDB delivers double-purpose value with its unique geo-partitioning capabilities; by configuring the specific region that data can be stored in, you achieve both application performance (data closer to users’ apps!) and [GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) data domiciling compliance.
The CockroachDB Admin UI has a fantastic geographic display called the Node Map, which shows a map of the world with icons for all nodes and the details for each node. This graphical display helps with planning as well as for troubleshooting latency issues between data stores. When accessing your CockroachDB through the ObjectRocket Mission Control UI, users can easily link to the CockroachDB Admin UI to view the Node Map.

#### Adding new nodes manually, with appropriate configurations, allows for smart and rapid subsequent scale-outs

+ If you want to proactively spin up new nodes, you can either use a command via CLI or the Admin UI to create the node and set the needed flags and other configurations.
+ Many databases need to be stopped and restarted to scale, but with CockroachDB, adding more nodes while the system is under load is very simple.

#### Using orchestration, scaling is handled automatically, with no downtime 

+ Scaling CockroachDB, when you are using an orchestration platform makes it even easier and allows for powerful automation. For example, when using Kubernetes (as ObjectRocket does) one single command can scale-out CockroachDB, provisioning new resources and spinning up additional pods as needed.
+ Automatic rebalancing of data across the nodes, even between data centers and/or different cloud providers
+ Distributed transactions mean that there’s no impact to workload, there’s no downtime, no increase in latency.
+ Optimizing server utilization evenly across all nodes is a natural result of CockroachDB’s auto-scaling

#### Bringing it All Together in a Managed Service

ObjectRocket offers complete managed services for your CockroachDB data stores, using a Kubernetes container-based architecture. The service includes design and deployment consulting, full technical support, and all of the benefits of the enterprise licensed version of CockroachDB.

The key features of the managed CockroachDB solution are:

+ Three-node HA clusters
+ Access to the CockroachDB Admin UI via the ObjectRocket UI
+ IP whitelisting
+ User authentication
+ Transport Layer Security (TLS)

What this means to you is that you get a relational, ACID-compliant data store with a comfortable SQL interface and PostgreSQL wire compatibility, but with automatic HA, easy scalability, and geographic scaling. 

ObjectRocket’s managed CockroachDB offering allows you to select the best option for your data needs from pre-defined node types, and then horizontally scale by adding as many more of that type as needed. Failed or problematic nodes are automatically replaced by our Kubernetes-based platform, so we can ensure that your cluster is always up and available.

This is a great time to check out CockroachDB itself and what Rackspace ObjectRocket provides with our managed services. For some insight into how a managed offering of CockroachDB might solve your data store requirements, read our [Top 5 Use Cases blog](https://www.objectrocket.com/blog/cockroachdb/top-5-cockroachdb-use-cases/). Cockroach&reg; has excellent [documentation](https://www.cockroachlabs.com/docs/stable/), and if you are interested in having a conversation about CockroachDB or want to learn more, contact us here at ObjectRocket.

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>

Click here to view [The Rackspace Cloud Terms of Service](https://www.rackspace.com/cloud/legal/).

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
