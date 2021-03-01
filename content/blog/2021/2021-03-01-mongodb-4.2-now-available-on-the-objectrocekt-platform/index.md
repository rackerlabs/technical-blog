---
layout: post
title: "MongoDB 4.2 now available on the ObjectRocket platform"
date: 2021-02-05
comments: true
author: Antonios Giannopoulos
published: true
authorIsRacker: true
categories:
    - Database
    - ObjectRocket
canonical: https://www.objectrocket.com/blog/mongodb/mongodb-4-2-is-now-available-on-the-objectrocket-platform/
metaTitle: "MongoDB 4.2 now available on the ObjectRocket platform"
metaDescription: "."
ogTitle: "MongoDB 4.2 now available on the ObjectRocket platform"
ogDescription: "."
slug: "expanding-objectrocket-for-mongodb-to-aws-and-gcp"

---

*Originally published in November 2020, at ObjectRocket.com/blog*

Did you know that MongoDB 4.2 passed our tests and is generally available on the
ObjectRocket platform?

<!--more-->

### What MongoDB 4.2 provides

You can get the full list of features in the
[MongoDB 4.2 release notes](https://docs.mongodb.com/manual/release-notes/4.2). Following
are some of the updates and changes we wanted to highlight:

##### Sharding

**Distributed multi-document transactions**: In version 4.0, MongoDB introduced transactions
on Replica-Sets only. MongoDB 4.2 expands multi-document transactions support to sharded
clusters.

**Mutable shard keys**: Before MongoDB 4.2, the value of the shard key was immutable. With
the enhancement of distributed transactions, shard keys value can now change. Just remember
that you can only change the shard key value, not the shard key field(s).

You can read more about the changes related to sharded clusters
[here](https://www.slideshare.net/antgiann/sharding-in-mongodb-42-whatisnew).

##### Increased security

**Adds TLS options**: MongoDB 4.2 adds TLS options intended to replace SSL options (SSL is
deprecated to 4.2). Additionally, it introduces client-side field-level encryption that
helps you to protect sensitive data. Read more on security improvements
[here](https://docs.mongodb.com/manual/release-notes/4.2/#security-improvements).

**Removes MMAPv1 storage engine**: MongoDB 4.2 only supports WiredTiger storage engine. If
you are still using MMAPv1, our support team can help you complete the transition to
WiredTiger without service disruption. Open a ticket [here](https://objectrocket.zendesk.com/hc/en-us),
so we can work together.

##### Bug fixes

As with every major version, 4.2 fixes bugs that aren’t backported. Put simply, this means
that some bugs affecting older versions are fixed in 4.2 but never backported for different
reasons in previous versions, like 4.0 and 3.6.

##### General enhancements

**Aggregation improvements**: MongoDB 4.2 supports on-demand materialized views. Using the
`$merge` operator allows users to save the aggregation output to a collection. The `$merge`
operator provides more flexibility than the `$out` operator and can help you enhance your
security model.

**Hybrid index builds**: MongoDB removes the foreground and background index builds by
introducing the hybrid index builds. Hybrid index builds don’t block database operations,
and at the same time, the build time is faster than a background index.

**Wildcard indexes**: Wildcard indexes supporting queries against fields whose names are
unknown or arbitrary. You can now index entire subdocuments without knowing their structure.

You can read more about the changes related to indexing and aggregation
[here](https://www.slideshare.net/antgiann/new-indexing-and-aggregation-pipeline-capabilities-in-mongodb-42).

### What happens next?

Call our support team so we can put an upgrade plan in place that fits your needs. We can
help you get ahead of potential problems, avoid unplanned maintenance, and help you figure
out development updates, configure driver settings, and schedule maintenance windows.

### New to MongoDB? 

[Learn more about ObjectRocket for MongoDB](https://www.objectrocket.com/managed-mongodb/).

<a class="cta teal" id="cta" href="https://www.rackspace.com/data/databases">Learn more about our Database services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Let's Talk** to [start the conversation](https://www.rackspace.com/).


