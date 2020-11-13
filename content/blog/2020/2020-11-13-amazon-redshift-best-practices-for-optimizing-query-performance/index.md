---
layout: post
title: "Amazon Redshift: Best practices for optimizing query performance"
date: 2020-11-13
comments: true
author: Scott Peters
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "Amazon Redshift: Best practices for optimizing query performance"
metaDescription: "."
ogTitle: "Amazon redshift best practices for optimizing query performance"
ogDescription: "."
slug: "amazon-redshift-best-practices-for-optimizing-query-performance"

---

*Originally published on June 17, 2020 at Onica.com/blog*


Across a plethora of industries, organizations look to utilize data analytics
for operations and other functions that are critical to success. However, as
data volumes grow, the management and value-extraction from data can get increasingly complex.
<!--more-->

### Amazon Redshift

Amazon Redshift is a powerful data warehouse service from Amazon Web Services (AWS)
that simplifies data management and analytics. Let’s take a look at Amazon Redshift
and best practices you can implement to optimize data querying performance.

### Data lakes vs. Data warehouse

Before digging into Amazon Redshift, it is important to know the differences
between data lakes and warehouses. A data lake, such as Amazon S3, is a
centralized data repository that stores structured and unstructured data,
at any scale and from multiple sources, without altering the data.
Data warehouses on the other hand, store data in a reconciled state
that is optimized to perform ongoing analytics and only the data needed
for analytics is loaded into them from data lakes.

Amazon Redshift takes storage for data analytics one level further,
amalgamating the qualities of data lakes and warehouses into a
“lake house” approach. It allows the querying of large exabyte-scale
data lakes while being cost-effective and minimizing data redundancy,
as well as minimizing maintenance overhead and operational costs.

### Amazon Redshift Architecture

In order to process complex queries on big data sets rapidly,
Amazon Redshift architecture supports massively parallel processing (MPP)
that distributes the job across multiple compute nodes for concurrent processing.

These nodes are grouped into clusters and each cluster consists of three types of nodes:

**Leader Node** manages connections, acts as the SQL endpoint, and coordinates parallel SQL processing.

**Compute Nodes** composed of “slices”, execute queries in parallel on data that is stored in a
columnar format, in 1MB immutable blocks. An Amazon Redshift cluster may contain between 1-128
compute nodes, portioned into slides that contain the table data and act as a local processing zone.

**Amazon Redshift Spectrum Nodes** execute queries against an Amazon S3 data lake.

{{<img src="Redshift_Architecture_Fig1.jpg" title="" alt="">}}

### Optimizing Query Performance

Extracting optimal querying performance mainly can be attributed to bringing the
physical layout of data in the cluster in congruence with your query patterns.
If Amazon Redshift is not performing to its potential, leverage the following change

### Reconfiguring Workload Management (WLM)

Often left in its default setting, performance can be improved by tuning WLM,
which can be automated or done manually. When going the automatic route,
Amazon Redshift manages memory usage and concurrency based on cluster resource usage,
and it allows you to set up eight priority-designated queues. When
going the manual route, you can adjust the number of concurrent queries,
memory allocation and targets.

Querying performance can also be optimized through some WLM configuration parameters such as:

**Query monitoring** rules that can help you manage expensive or runaway queries.

**Short query** acceleration which helps you prioritize short-running queries over longer-running queries,
using machine learning algorithms to predict querying execution time.

**Concurrency scaling,** which helps you add multiple transient clusters ion seconds,
to accelerate concurrent read queries.

### WLM best practices

Some WLM tuning best practices include:

- Creating different WLM queries for different types of workloads.
- Limiting maximum total concurrency for the main cluster to 15 or less, to maximize throughput.
- Enabling concurrency scaling.
- Keeping the number of resources in a queue to a minimum.

### Refining Data Distribution

The rows of a table are automatically distributed by Amazon
Redshift across node slices, based on the following distribution styles:

- `AUTO` – Starts with ALL and switches to EVEN as the table grows.
- `ALL` – Consists of small, frequently joined and infrequently modified tables that
-  are placed on the first slice of each compute node.
- `EVEN` – Consists of large, standalone fact tables that are not
-  frequently joined or aggregated in a round-robin distribution across the slices.
- `KEY` – Consists of frequently joined, fact tables or large dimension tables.
   In this style, a column value is hashed and the same hash value is placed on the same slice.

Using the right distribution patterns can maximize the performance
of `JOIN`, `GROUP BY` and `INSERT INTO SELECT` operation

### Refining Data Sorting

The physical order of data on a disk is defined by sort keys.
Table Columns used in WHERE clause predicates are a good choice
for sort keys and date or time-related columns are used commonly.
Zone maps, that are stored in memory and generated automatically,
are used to define the value extremes for each block of data.
Effectively using sort keys and zone maps together can help
you restrict scans to the minimum required number of blocks.

The diagram below illustrates how table sorting focuses
scanning targets for time-based queries, thereby
improving query performance.

{{<img src="Column_Sortkeys_Fig3_new.jpg" title="" alt="">}}

### Optimal Query Performance Best Practices

Utilizing the aforementioned Amazon Redshift changes can
help improve querying performance and improve cost and resource
efficiency. Here are some more best practices you can implement
for further performance improvement:

- Using `SORT` keys on columns often used in `WHERE` clause filters
- Using `DISTKEY` on columns that are often used in `JOIN` predicates
- Compressing all columns except the first sort key column
- Partitioning data in the data lake based upon query filters such as access pattern

To explore some more best practices, take a deeper dive into the
Amazon Redshift changes and see an example of an in-depth query
analysis, read the
[AWS Partner Network (APN) Blog](https://aws.amazon.com/blogs/apn/best-practices-from-onica-for-optimizing-query-performance-on-amazon-redshift/?utm_content=131837700&utm_medium=social&utm_source=linkedin&hss_channel=lcp-25057969).

If you are embarking on a data journey and are looking to leverage
AWS services to quickly, reliably and cost effectively develop your
data platform, get in touch with our [Data Engineering & Analytics](https://onica.com/services/data-engineering-analytics/)
team today.

<a class="cta purple" id="cta" href="https://www.rackspace.com/sap">Learn more about our SAP services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
