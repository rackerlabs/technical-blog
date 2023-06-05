---
layout: post
title: "How to Modernize a Legacy Hbase/Solr Architecture into Amazon using Kinesis, Lambda, and Opensearch"
date: 2023-05-25
comments: true
author: Daniel Quach and Anil Kumar
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: "Daniel Quach is a Rackspace Professional Services Data Practice Manager and Anil Kumar is a Rackspace Professional Services Big Data Engineer"
published: true
authorIsRacker: true
categories:
    - Data
    - DevOps
metaTitle: ""How to Modernize a Legacy Hbase/Solr Architecture into Amazon using Kinesis, Lambda, and Opensearch"
metaDescription: "As technology advances and business requirements change, organizations may find themselves needing to migrate away from legacy data processing systems like HBase, Solr, and HBase Indexer."
ogTitle: "How to Modernize a Legacy Hbase/Solr Architecture into Amazon using Kinesis, Lambda, and Opensearch"
ogDescription: "As technology advances and business requirements change, organizations may find themselves needing to migrate away from legacy data processing systems like HBase, Solr, and HBase Indexer."
slug: "how-to-modernize-a-legacy-hbase-solr-architecture-into-amazon-using-kinesis-lambda-and-opensearch "
---

As technology advances and business requirements change, organizations may find themselves needing to migrate away from legacy data processing systems like HBase, Solr, and HBase Indexer. While these systems may have served their purpose in the past, they may no longer be sufficient for the needs of modern data platforms because of the challenges of scalability and maintenance.  
<!--more-->

#### Overview

To help modernize legacy systems, organizations can turn to newer technologies like Amazon Kinesis, Amazon Lambda, and Amazon OpenSearch Service. These tools offer a range of benefits from improved security, scalability, and a path of regular maintenance updates without being worried about how to do them.

In this blog post, we'll explore the advantages of migrating from HBase, Solr, and HBase indexer to a modern data ecosystem based on Amazon services.  We will discuss architecture, design, and a pathway for implementation.


**Legacy State**

Legacy data platforms like Horton Data Works (Cloudera) often have a workflow like below

<img src=Picture1.png title="" alt="">

1.	ETL process are defined in the Hadoop platform
2.	ETL processes perform either a create, update, or delete on HBase
3.	The HBase Indexer captures all of the changes
4.	The changes are sent to a Solr index using HBase indexer

Since HBase is a NoSQL store, data is replicated to a Solr for easier querying capabilities.

**Pathways Forward**
Moving forward if you want to move off your legacy data from your on-prem system, there are a couple options that you can follow:

**Option 1: Migration to Amazon Opensearch Service (Recommended)**

In this approach major legacy components would be modernized 

-	Upgrade Apache Hbase to version 2.x on top of Amazon  EMR 6.x  
-	Hbase Indexer would move to
-	Streaming Hbase endpoint on Amazon EMR
-	AWS Lambda & Amazon Kinesis pushing changes to Amazon Opensearch Service
-	Solr 5.5 would be migrated to Amazon Opensearch Service
-	Any applications connecting to Solr would need to be refactored to be compatible with Opensearch

**Option 2: Migration to Elasticsearch (Not Recommended)**

This approach is similar to Option 1, but the challenge is that on Amazon Web Services, Elasticsearch is frozen on version 6.8/7.10 so eventually you would need to migrate to Amazon Opensearch Service.

**Option 3: Lift & Shift Solr 5.x (Not Recommend)**
In this approach, Solr would be lifted and shifted.  However there are a several immediate problems with this approach

-	Lift & Shifting a legacy platform (like Solr 5.5) still exposes you to security vulnerabilities not yet patched
- Legacy Hbase Indexers support only up to Hbase version 1.1.12 and moving to Amazon EMR 6.x uses Hbase 2.x

Given the 3 options, we are going to focus on Option 1 that gives you the most modern data stack that will be supported with future maintenance updates and dropping any technical debt. 

#### High Level Steps

When pursuing a migration like this great care should be taken to address business continuity and identifying all dependent interfaces.  The bottom describes the project plan

1.	Provision new architecture in an Amazon Web Services Account
2.	Handle replication workflow previous handled by Hbase Indexer
3.	Perform a full load migration Solr to Opensearch
4.	Refactor any old applications connecting to legacy Solr

#### Replication High Level Design

This work builds upon the great work from Amir Shenavandeh, Maryam Tavakoli, and Angel Conde Manjon from AWS.  Before reading the rest of the post, please reference https://aws.amazon.com/blogs/big-data/stream-apache-hbase-edits-for-real-time-analytics/

<img src=Picture2.png title="" alt="">

In this architecture, we are building a system to ensure changes performed against Hbase (#3) are replicated to an Amazon Opensearch Domain (#6).  To define a bit of nomenclature, Slowly Changing Dimensions (SCD Type 1) refers to current state data.  In regards to a data integrity standpoint, whatever queried in Hbase should always exist in Opensearch.


1.	Upstream applications post changes to EMR
2.	EMR 6.x contains HBase 2.x provisioned
3.	HBase changes are committed to the data store
4.	A special replication endpoint deployed on EMR to listen to inserts, updates, and deletes.  This is also known as Change Data Capture (CDC)
5.	These changes are streamed to a Kinesis endpoint
6.	A Lambda runs to apply any applicable transformations
7.	Changes are applied to OpenSearch

#### Full Load Design

As part of the deployment, a one time full snapshot deployment will need to be run.

<img src=Picture3.png title="" alt="">

Depending on your source system, scripts will have to be created to perform a full load, and here are some references

-	Solr --> Firehose --> Opensearch
-	https://github.com/vasveena/opensearch-workshop/blob/main/commands.md
-	Solr --> Opensearch

-	Use the **elasticsearch** and **requests** Python library
-	Create an instance of the Elasticsearch object pointing at the Opensearch cluster
-	Create a custom class to iterate through the Solr collection via the https interface
-	Iterate through a batch a time and then write it to Opensearch
-	Compare record counts for data quality checking

#### Replication Detailed Design

The bottom workflow describes what it takes to replace the Hbase indexer

<img src=Picture4.png title="" alt="">

1.	Upstream applications perform either an Insert, Update, or Delete on Hbase inside EMR
2.	EMR is bootstrapped with a special HBase streaming endpoint JAR which listens to the changes and pushes it to Kinesis.  See https://github.com/awslabs/streaming-endpoint-for-apache-hbase for details of deployment

-a.	The class StreamingReplicationEndpoint will listen to Hbase WALEdits (Write Ahead Log Edit changes)

-b.	WALEdit (CDC) changes are replicated
2.	Changes are pushed to a Kinesis Data Sink Class implementation which pushes the new changes
3.	A Kinesis stream is provisioned with the applicable number of shards

-a.	Firehose is connected to the analytics stream for back-up

-b.	A raw landing zone records all the changes in the need any data needs to be reprocessed

4.	Lambda is attached to the Kinesis stream

- a  The payload in the lambda will have WALEdit information, with the payloads base64 encoded

```
{"key":{"writeTime":1682464672527,"sequenceId":32151290,"tablename":"SALES_SLIP_HISTORY","nonce":0,"nonceGroup":0,"origLogSeqNum":0,"encodedRegionName":"ODZkMGU0NTY3ZWVjMzRjYWUyMGYzOGYxOThlMmViNDM=","writeEntry":null},"edit":{"cells":[{"qualifier":"VEVTVDE=","value":"WFl6MQ==","type":"Put","family":"SQ==","timeStamp":1682464672527,"row":"MDAwMDAwMDkzNTRCNTdDMjgwODkzMTNFNDY2QUVEM0N8Mjg1MzV8MTgzNXwzNTI5NTQ0MjlfMDAwMDAwMDAwS2F5Xzc1"}],"families":["SQ=="],"replay":false,"metafamily":"TUVUQUZBTUlMWQ=="}}
```
-	Keys of the WalEdit will have **qualifier**, **value**, **type**, **family**, **timestamp**, **row**
-   ii.	The only keys we need to examine are:
1. 1.	type – which contains the values of [put, delete, deleteall, deleteColumn, deleteFamily
```
“type":"Put"
```
2.	row -  which is the reference key to HBase Base 64 encoded
```
"row":"MDAwMDAwMDkzNTRCNTdDMjgwODkzMTNFNDY2QUVEM0N8Mjg1MzV8MTgzNXwzNTI5NTQ0MjlfMDAwMDAwMDAwS2F5Xzc1"
```
- b.	If you Type == “Put” (it means it is an insert or update)
- c.	Look up the Hbase Document by row key
- i.	Example reference of retrieving a record is here - <img src=Picture6.png title="" alt=""> streaming-endpoint-for-apache-hbase/KinesisHandler.java at main · awslabs/streaming-endpoint-for-apache-hbase 
- d.	With the Opensearch API update the entire record (or only the selected fields depending on your business case)
e.	If Type == “Delete”
f.	Look up the HBase Document by row key
g.	Delete document via OpenSearch API

d.	With the Opensearch API update the entire record (or only the selected fields depending on your business case)
e.	If Type == “Delete”
f.	Look up the HBase Document by row key
g.	Delete document via OpenSearch API


#### Set-up EMR 

When EMR is provisioned, these are steps that need to be taken during set-up
1.	Update the HBASE_CLASSPATH to reference this jar https://github.com/awslabs/streaming-endpoint-for-apache-hbase/releases/download/alpha-0.1/kinesis-sink-alpha-0.1.jar
"HBASE_CLASSPATH":${HBASE_CLASSPATH}${HBASE_CLASSPATH:+:}$(ls -1 /usr/lib/phoenix/phoenix-server*.jar):/usr/lib/hbase-extra/kinesis-sink-alpha-0.1.jar"
2.	Set-up the HBase configuration files
```
	Set-up hbase-site.xml
"hbase.replication.kinesis.aggregation-enabled": "false",
"hbase.replication.bulkload.enabled": "false",
"hbase.replication.cluster.id": "hbase1",
"hbase.replication.sink-factory-class": "com.amazonaws.hbase.datasink.KinesisDataSinkImpl",
"hbase.replication.kinesis.stream-table-map": "tablename1:kinesis-stream1”
"hbase.replication.compression-enabled": "false"
```
3.	Run below command at HBase Shell prompt to add replication peer into HBase
- a.	 add_peer 'Kinesis_endpoint', ENDPOINT_CLASSNAME => 'com.amazonaws.hbase.StreamingReplicationEndpoint'
4.	Run below command at HBase Shell prompt to enable table replication    

- a.	*enable_table_replication "YOUR_BASE_TABLE”*

During final deployment, these steps can be bootstrapped in Amazon EMR for further automation.

#### Refactoring Legacy Code

https://github.com/aws-samples/opensearch-bootful

#### Summary

In conclusion, modernizing legacy data processing systems like HBase, Solr, and HBase Indexer using newer and managed technologies like Kinesis, Lambda and OpenSearch, these can offer a range of benefits including improved security, scalability, and regular maintenance updates. Moving away from legacy systems may seem daunting, but with careful planning and implementation, organizations can successfully migrate to a more modern data ecosystem. The recommended option is to migrate to OpenSearch, as it provides the most modern data stack that will be supported with future maintenance updates. However, regardless of the chosen option, it's important to address business continuity and identify all dependent interfaces to ensure a smooth and successful migration.




<a class="cta purple" id="cta" href="https://www.rackspace.com/cloud/aws">Learn about Rackspace Managed AWS Services.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).