---
layout: post
title: "Clustered Elasticsearch indexing shard and replica best practices"
date: 2020-10-19
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
metaTitle: "Clustered Elasticsearch indexing shard and replica best practices"
metaDescription: "Elasticsearch is awesome at spreading data across your cluster, but you should learn to adjust your default settings when your clusters begin to grow."
ogTitle: "Clustered Elasticsearch indexing shard and replica best practices"
ogDescription: "Elasticsearch is awesome at spreading data across your cluster, but you should learn to adjust your default settings when your clusters begin to grow."
slug: "clustered-elasticsearch-indexing-shard-and-replica-best-practices"
canonical: https://www.objectrocket.com/blog/elasticsearch/clustered-elasticsearch-best-practices/
---

*Originally published on Nov 27, 2020, at ObjectRocket.com/blog.*

Elasticsearch&reg; is awesome at spreading data across your cluster with the default settings, but after your cluster begins
to grow, you should adjust your default settings to enhance effectiveness. Let’s go over some of the basics of sharding and
provide some indexing and shard best practices.

<!--more-->

### An introduction to Elasticsearch sharding

{{<img src="picture1.jpg" title="" alt="">}}

There are many documents out there about how Elasticsearch shards work, but the basic concept of sharding is breaking your
data into several smaller pieces so that searches can operate on multiple parts in parallel. To facilitate clustering and
parallelization of index functions, slice up each index in your Elasticsearch instance into numbered slices. These slices
are called shards. Let’s look at some of their key behaviors:

* Each shard replicates depending on the **number of replicas** setting for the index. So, for a **number of replicas**
  setting of one, there are two copies of each shard: one *primary* shard and one *replica* shard. The primary shard is the main
  shard and used for `indexing/write` and `search/read` operations, while the replica shards are used only for `search/read`
  operations and for recovery if a primary fails.
* Replica shards must reside on a different host than their *parent* primary shard.
* Shards automatically spread across the number of hosts in the cluster by default, but the same physical host might contain
  multiple primary shards. You can use the Elasticsearch settings to modify this behavior (rebalancing, shards allocation,
  and so one), but that procedure is beyond the scope of this post.
* Each shard must reside in only one host because shards are indivisible.
* You can set the number of shards that an index creates during index creation, or you can use a global default. After you
  create the index, you cannot change the number of shards without reindexing.
* You can set the number of replicas that an index has during index creation, or you can use a global default. You can
  change this number after you create the index.

{{<img src="picture2.png" title="" alt="">}}

Let’s look at a small example. I created an index with a shard count of three and a replica setting of one. As you can see
in the preceding diagram, Elasticsearch creates six shards for you: Three primary shards (Ap, Bp, and Cp) and three
replica shards (Ar, Br, and Cr).

Elasticsearch ensures that the replicas and primaries are on different hosts, but you can allocate multiple primary shards
to the same host. On the subject of hosts, let’s dive into how you allocate shards to your hosts.

### Shard allocation and clustered Elasticsearch

Elasticsearch attempts to allocate shards across all available hosts by default. At Rackspace ObjectRocket, each cluster
consists of master nodes, client nodes, and data nodes. The data nodes in our architecture form the *buckets* to which
you can assign the shards.

Using the preceding example, let’s take those six shards and assign them to an ObjectRocket for Elasticsearch cluster with
two data nodes (the minimum). In the following diagram, you can see that for each shard, the primary lands on one data node,
while the replica is guaranteed to be on the other node. Keep in mind that the examples here show just one possible allocation.
No matter the allocation, the only definite thing is that a replica is always be placed on a different data node than its primary.

{{<img src="picture3.jpg" title="" alt="">}}

Now, let’s extend this example and add a third data node. Notice that two shards are moved to the new data node, so you have
two shards on each node.

{{<img src="picture4.jpg" title="" alt="">}}

Finally, let’s add a new index to this cluster with a shard count of two and the number of replicas set to two. This gives you
two new primaries (Xp and Yp) and four replicas (Xr0, Xr1, Yr0, Yr1) that you can spread across the cluster as seen in the
following image:

{{<img src="picture5.jpg" title="" alt="">}}

That’s it. 

### Pitfalls

Elasticsearch does all of the hard work for you, but there are some pitfalls to avoid.

#### Pitfall #1&mdash;massive indexes and massive shards

Troubleshooting a massive index with massive shards is one of the easiest issues to mitigate in Elasticsearch. A user starts
with a very manageable single index. However, as their application grows, so does their index. This leads to huge shards because
shard size is directly related to the amount of cluster data.

The first issue this causes is poor efficiency in cluster utilization. As the shards grow, it gets harder to place them on a
data node. It takes a large block of data node free space to store a shard there. This condition leads to nodes with a lot of
unused, wasted space. For example, if I have 8 GB data nodes, but each shard is 6 GB, I’ll be stranding 2 GB on each of my data
nodes. The second issue is *hot spotting*. If you consolidate your data into few shards, then complex queries cannot be split
across a larger number of nodes and executed in parallel.

##### Don’t be stingy with indexes

Use multiple indexes to solve stalled space issues. Spread your data across multiple indexes to increase the number of shards in
the cluster and spread the data evenly. In addition, like the game Tetris, when Elasticsearch places shards, multiple indexes
are easier to curate. The alias capabilities in Elasticsearch can still make multiple instances appear as a single index to your app.
Most of the Elastic Stack creates daily indexes by default, which is a good practice. You can then use aliases to limit the scope
of searches to specific date ranges, use curator to remove old indexes as they age, and modify index settings as your data grows
without having to reindex the old data.

##### Increase shard count as your index size increases

Add indexes more frequently and increase the shard count as your index grows. After you see shard sizes starting to exceed your
desired space, you can update your index template (or whatever you use to create new indexes) to use more shards for each index.
However, this only helps if you create new indexes often, so this recommendation is listed second. Otherwise, you have to reindex
to modify the shard count, which represents more work than managing multiple indexes.

Our rule of thumb: If a shard is larger than 40% of the size of a data node, that shard is probably too big. In this case, we
recommend reindexing to an index with more shards or moving up to a larger plan size (more capacity per data node).

#### Pitfall #2&mdash;too many indexes or shards

The inverse is far too many indexes or shards. After reading the previous section, you might just say, “Fine. I’ll just put
every doc in its index and create a million shards”. The problem there is that indexes and shards have overhead. That overhead
manifests itself in storage, memory resources, and processing performance.

Because the cluster must maintain the state of all shards and where they’re located, a massive number of shards becomes a larger
bookkeeping operation, which impacts memory usage. Also, because you need to split queries more ways, you spend much more time in
scatter or gather for queries. This pitfall is highly dependent on the size of the cluster, use case, and other factors, but in
general, we can mitigate this with a few recommendations.

##### Shards should be no larger than 50 GB

In general, 25 GB is an ideal size for large shards, and 50 GB requires reindexing. This consideration relates to the performance
of the shard and the process of moving that shard when necessary. When rebalancing, move shards to a different node in the cluster.
A 50 GB data transfer can take too long and tie up two nodes during the entire process.

##### Keep shard size less than 40% of data node size

As mentioned previously, the second shard size metric that interests us is the percentage of data node capacity a shard takes up.
On the Rackspace ObjectRocket service, we offer different plan sizes that relate to the amount of storage on the data nodes. We
try to size the cluster and the shards to ensure that the largest shards don’t take up more than 40% of a data node’s capacity.
In a cluster with several indexes of various sizes, this is fairly effective. However, in a cluster with very few large indexes, we
are even more aggressive and try to keep the data node's capacity below 30%.

Ideally, make sure you aren't stranding capacity on a data node. If your shards are about 45% the size of the data node, you need
a data node at roughly half utilization to place that shard. That’s a lot of unused spare capacity!

### Conclusion

Selecting the right shard and indexing settings can be difficult, but by planning, making some good decisions up front, and
tuning as you go, you can keep your cluster healthy and running optimally. We help businesses refine their Elasticsearch
instances all the time.

<a class="cta red" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
