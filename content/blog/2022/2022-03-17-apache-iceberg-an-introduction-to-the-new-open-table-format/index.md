---
layout: post
title: "Apache Iceberg: An Introduction to the New Open Table Format"
date: 2022-03-18
comments: true
author: Chaitanya Varma Mudundi
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - General
    - Data
metaTitle: "apache-iceberg-an-introduction-to-the-new-open-table-format"
metaDescription: "Data-driven decision making is accelerating and defining the way organizations work. With this transformation, there has been a rapid adoption of data lakes across the industry "
ogTitle: "Apache Iceberg: An Introduction to the New Open Table Format"
ogDescription: "Data-driven decision making is accelerating and defining the way organizations work. With this transformation, there has been a rapid adoption of data lakes across the industry  "
slug: "Apache Iceberg: An Introduction to the New Open Table Format"

---

Data-driven decision making is accelerating and defining the way organizations work. With this transformation, there has been a rapid adoption of data lakes across the industry.

To fuel this transformation, data lakes have evolved over the last decade making Apache Hive as the de-facto standard for data lakes. However,  while Apache Hive can solve some of the issues with processing of data, it falls short at a few other objectives for next generation data processing.

<!--more-->

In this blog, we will discuss the drawbacks of current existing data lake architecture (Apache Hive),  see what Apache Iceberg is and how it overcomes the shortcomings of the current state of data lakes. Additionally, we will review design differences between Apache Hive and Iceberg.



### Introduction

[Apache Icebeg](https://iceberg.apache.org/) is an open table format, originally designed at Netflix in order to overcome the challenges faced  when using already existing data lake formats like Apache Hive. 

The key problems Iceberg tries to address are: 
-	using data lakes at scale (petabyte-scalable tables) 
-	data & schema evolution and
-	consistent concurrent writes in parallel

Iceberg was open sourced in 2018 as an Apache Incubator project and graduated from the incubator on the 19th of May 2020.


### Why use Apache Iceberg?

Apache Iceberg is a new table format design, which addresses the issues faced by Apache Hive. When used at scale with large datasets, there are many issues due to its design. Some of the key challenges faced by Apache Hive are:


-	Data changes for large datasets are inefficient. When changes to the existing data,  like updates or deletes are performed, the changes cannot be handled at a file level in Apache Hive. 
-	This is inefficient for large partitions  since the complete partitions need to be rewritten to a new location frequently, for each update or delete.
-	Concurrent writes on the same dataset are not a safe operation in Apache Hive.  There is a possibility of data loss as the last write operation wins and querying during these concurrent writes provides different results.
-	Fetching the entire directory list from a partition level takes a long time for large tables. In Apache Hive the files in a partition are scanned at runtime, while in Apache Iceberg, there is a manifest file which improves performance.
-	Querying of data from Apache Hive takes a longer time as the datasets grow over a period due to its directory structure to store partitions. If multiple partitions are present, this adds an additional layer of overheads to querying datasets. Users even need to keep track of the physical layout of tables while writing queries.
-	Updates to existing partitions in Apache Hive needs a recreation of existing table mapping to a new location, as partitions are defined at the creation of table and cannot be modified as the tables grow.
-	For example: if your raw zone was \raw\year\month\day and you wanted to change it to \raw\year\month\day\hour - you would need to rebuild your entire raw zone partition structure

### Design Benefits of Apache Iceberg

[Apache Iceberg](https://www.dremio.com/resources/guides/apache-iceberg-an-architectural-look-under-the-covers/), on the other hand, is a new open table format which is designed to overcome the drawbacks faced when using Apache Hive. The key difference lies  in how Apache Iceberg stores records in object storage.

<img src=Picture1.png title="" alt="">


-	The [design structure](https://iceberg.apache.org/spec/) of Apache Iceberg is different from Apache Hive, where the metadata layer and data layer are managed and maintained on object storage like Hadoop, s3, etc.
-	It uses a file structure (metadata and manifest files) that is managed in the metadata layer. Each commit at any timeline is stored as an event on the data layer when data is added.  The metadata layer manages the snapshot list. Additionally, it supports integration with multiple query engines,
-	Concurrent commits on same datasets ensure atomicity of transaction with optimistic concurrency control.
-	Any update or delete to the data layer, creates a new snapshot in the metadata layer from the previous latest snapshot and parallelly chains up the snapshot, enabling faster query processing as the query provided by users pulls data at the  file level rather than at the partition level.
-	Schema and partition changes on an existing table can be performed with ease, as these changes are tracked as separate components in snapshots on the metadata layer. When a partition is changed, Apache Iceberg stores the previous and latest partitions as separate plans.  When a query is performed on old data, Apache Iceberg does a split plan and pulls data with different partitions from multiple snapshots.
-	Iceberg uses a snapshot based querying model, where data files are mapped using manifest and metadata files. Even when data grows at scale, querying on these table gives high performance, as data is accessible at the file level. These mappings are stored in an Iceberg catalog.

### Key features of Apache Iceberg:

**Expressive SQL:** Iceberg supports flexible SQL commands to merge new data, update existing rows and perform targeted deletes on tables. Due to its architecture under the hood, Iceberg supports execution of analytical queries on data lakes.

**Schema Evolution:** Adding, renaming and reordering the column names works well and [schema changes](https://iceberg.apache.org/docs/latest/evolution/) never require rewriting of the complete table, as the column names are uniquely identified in the metadata layer with id’s rather than the name of the column itself.

**Hidden Partitions:** [Partitioning](https://iceberg.apache.org/docs/latest/partitioning/#icebergs-hidden-partitioning) in Iceberg is dynamic.  For example if an event time (timestamp) column is present in the table, the table can be partitioned by date from the timestamp column.  Apache Iceberg manages the relationship between the event timestamp column and the date. The partitioning is managed by Apache Iceberg. Additional levels of partitioning can be performed, and these are tacked on snapshot via metadata files.

**Time Travel and Rollback:** Apache Iceberg supports 2 types of read options for snapshots, which support [time travel](https://iceberg.apache.org/docs/latest/spark-queries/#time-travel) and incremental reads. These are the options supported:

_•	snapshot-id – selects a specific table snapshot_

_•	as-of-timestamp – selects the current snapshot at a timestamp, in milliseconds._

### AWS Integrations

Apache Iceberg integration  has multiple AWS service integrations with query engines, catalogues and infrastructure to run.

AWS supports integrations with the following engines and setting up custom catalogs.
-	Spark – Spark 3.0 and AWS client version 2.15.40 supports integration with Apache Iceberg
-	Flink – AWS Flink module supports creation of iceberg tables for Flink SQL client
-	Apache Hive – AWS module with Hive included with dependencies enables to create iceberg tables

### Catalogs:

There are multiple options that users can choose from. to build an Iceberg catalog with AWS

#### Glue Catalog:

Apache Iceberg supports integration with [Glue Catalog](https://iceberg.apache.org/docs/latest/aws/#glue-catalog), where Apache Iceberg namespace is stored as a Glue database and an Apache Iceberg table is stored as a Glue table and every Apache Iceberg table version is stored as a Glue table version. The following is an example for configuring Spark SQL and Glue catalog.

<img src=Picture2.png title="" alt="">

For commit locking, Glue catalog uses DynamoDB for concurrent commits and for file IO and storage, glue utilizes S3.

#### DynamoDB Catalog:

The [DynamoDB catalog](https://iceberg.apache.org/docs/latest/aws/#dynamodb-catalog) capability is still in the preview stage. DynamoDB catalog avoids hot partition issues during heavy write traffic to the tables. DynamoDB provides the best performance through optimistic locking when high rates of read and write throughputs are required.

#### RDS JDBC Catalog:

The [JDBC catalog](https://iceberg.apache.org/docs/latest/aws/#rds-jdbc-catalog) uses a table in a relational database to manage the Apache Iceberg tables, The tables can serve AWS RDS as the catalog. RDS catalog is recommended when the organization already has an existing serverless managed table. This provides easy integration. Here is an example to configure Iceberg with RDS as a catalog for the spark engine.

<img src=Picture3.png title="" alt="">

### How to Run Iceberg on AWS:

#### AWS Athena
[Athena provides integration with Iceberg](https://docs.aws.amazon.com/athena/latest/ug/querying-iceberg.html), currently it is in preview. To run Iceberg queries with Athena, create a workload with the name “AmazonAthenaIcebergPreview” and run the iceberg related queries using this workload, Currently Athena engine supports read, write and update to Iceberg tables.

#### AWS EMR:

[AWS EMR 6.5.0 and later](https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-iceberg-create-cluster.html) has Apache Iceberg dependencies pre-installed without requiring any additional bootstrap-actions. However, for versions before 6.5.0, These dependencies need to be added to bootstrap-actions to use iceberg tables. EMR provided Spark, Hive, Flink and Trino that can run Iceberg. 

#### AWS EKS & Kinesis:

AWS EKS can run any Spark, Hive, Flink, Trino and Presto clusters which can be integrated  with Iceberg. Similarly, AWS Kinesis can be integrated with Flink, which has  connectivity to use Apache Iceberg.

#### Integrations:

Apache Iceberg has integrations with various query and execution engines, where the Apache Iceberg tables can be created and managed by these connectors. The engines that support Iceberg are [Spark](https://iceberg.apache.org/docs/latest/getting-started/), [Flink](https://iceberg.apache.org/docs/latest/flink-connector/), [Hive](https://iceberg.apache.org/docs/latest/hive/), [Presto](https://prestodb.io/docs/current/connector/iceberg.html) ,[Trino](https://trino.io/docs/current/connector/iceberg.html), [Dremio](https://docs.dremio.com/software/data-formats/apache-iceberg/) and [Snowflake](https://www.snowflake.com/blog/expanding-the-data-cloud-with-apache-iceberg/)


### Summary

As organizations move towards data-driven decision making, the importance of lake house style architectures are increasing rapidly.  Apache Iceberg being a new open table format which can scale and evolve seamlessly, provides key benefits over its predecessor Apache Hive. 

Apache Iceberg is best suited for batch and micro batch processing of datasets. The growing open source community and integrations from multiple cloud providers makes it easier to integrate Apache Iceberg on to existing architecture effectively.

### Community

- Slack - [Apache Iceberg workspace](https://apache-iceberg.slack.com/)
- GitHub - [Apache Iceberg git repo](https://github.com/apache/iceberg)
- Blogs - [Apache Iceberg Blogs](https://iceberg.apache.org/blogs/)


<a class="cta red" id="cta" href="mailto:onica@rackspace.com">For any questions about modernizing your data strategy, feel free to contact</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
