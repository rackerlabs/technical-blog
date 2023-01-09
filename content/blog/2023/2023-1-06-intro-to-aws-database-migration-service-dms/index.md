---
layout: post
title: "Intro to AWS Database Migration Service (DMS)"
date: 2023-01-06
comments: true
author: Rajnish Awasthi
authorAvatar: 'https://secure.gravatar.com/avatar/ee6efed2d9e7647eaaed5ed4eac7585c'
bio: ""
published: true
authorIsRacker: true
categories:
    - Data
    - AWS
metaTitle: "Intro to AWS Database Migration Service (DMS)"
metaDescription: "This blog introduces the AWS database migration service, a cloud-based tool, used extensively for migrating databases to the cloud."
ogTitle: "Intro to AWS Database Migration Service (DMS)"
ogDescription: "This blog introduces the AWS database migration service, a cloud-based tool, used extensively for migrating databases to the cloud."
slug: "intro-to-aws-database-migration-service-dms"

---

This blog introduces the AWS database migration  service, a cloud-based tool, used extensively for migrating databases to the cloud.
<!--more-->

#### Introduction
DMS can be used to migrate the legacy database to the cloud. However, its usage is not only limited to migration, but also provides other features like replicating databases across the regions and archiving data to S3


#### Migraion Scenarios 

There are a couple of migration scenarios that are generally used:

-	On-premises to AWS cloud.
-	Relational database to non-relational database.
-	DBs hosted on EC2 to managed AWS services.

#### Migration Tools
When migrating the database as per the scenario, DMS is not alone which is being used. As the DMS tool is widely used to support both homogeneous and heterogeneous migrations, other migration tools can be used as a combination to fulfill the migration requirements.

The following tools can be used as per the requirements:
-	AWS DMS (Database migration service)
-	Schema conversion tool (SCT)
-	Migration playbooks (best practices & migration templates)


**Type of migration and tools**

#### Homogeneous migration

If homogeneous (source and destination databases are the same) migration is planned, only DMS service can be used to migrate the database. However, still DMS does move the basic schema which is essential to move the data.  


#### Heterogeneous migration

It is a must to first convert the schema in case of heterogeneous migration. The SCT tool will first create the target database and then process and analyze the source database schema. Then it will start the conversion with some actions requiring manual intervention as well.

The benefit of SCT tool is to make the migration easy by analysis and recommendations, it also making the migration compatible with other databases i.e. MySQL, SQL Server, Oracle, PostgreSQL. 

When the schema is ready after resolving the conflicts, DMS can be used to migrate the data into a target database.

#### Data Warehouse migration

DMS also supports the DW migration, we can use the SCT extender to store the data in S3 storage. SCT tools can convert the data source i.e., Oracle, SQL Server, Teradata, Vertica, Snowflake, and many more.
The following image explains the SCT data extractor functionality.

<img src=Picture1.png title="" alt="">

[Image Source](https://aws.amazon.com/blogs/database/introducing-data-extractors-in-aws-schema-conversion-tool-version-1-0-602/)


#### DMS- Database Migration Service

As we have seen that DMS can be used to migrate any database supported by AWS, it is a secure and safe tool widely used by database experts. There are the benefits of migrating a database through DMS:

-	Source database is available during the migration activity so it can be used by the applications parallelly.
-	It supports minimal to zero downtime.
-	Cost of data migration is $3 per TB.
-	DMS also supports continuous replication (CDC).

#### DMS Architecture 

While migrating a database, DMS creates a few objects to support the migration:
1.	Configuration of the source and target endpoints hold the information about the DB connection and credentials.
2.	While moving data from the source to a target server, DMS creates a replication instance to perform the data movement between the source and target endpoints.
3.	At a granular level, replication task(s) can be defined to perform actual data migration which includes data transformation rules.

Replication tasks start the data migration through the rules defined and use the CDC to sync the target database, application can be switched to a new instance once data is in sync state.

<img src=Picture2.png title="" alt="">

[Image Source](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Introduction.Components.html)

**NOTE:** Important points:
1.	DMS instances will appear only in the DMS console.
2.	DMS will create all necessary objects on target i.e. tables and primary key but it does not create other objects like FK or secondary indexes.
3.	SCT tool can be used to create other objects on the target instance.

#### Creating Replication Instance/Endpoints/Database Migration Task

Complete the following steps to migrate MSSQL Database created on the RDS 
- Step-1
Two MSSQL instances have been created on RDS as below:
<img src=Picture3.png title="" alt="">

- Step-2

Once we have the source and destination available, create a DMS agent.

<img src=Picture4.png title="" alt="">
<img src=Picture5.png title="" alt="">

- Step-3
Create the source and target endpoint which holds the information about credentials, here we have created the source endpoint.

<img src=Picture6.png title="" alt="">

**Note:** Target endpoint can be created by same by changing the end point type target.

- Step-4
Finally once source and target endpoints are ready, just jump on the database migration task and create it as shown in the following steps:

<img src=Picture7.png title="" alt="">
<img src=Picture8.png title="" alt="">

*Selection rules can be defined as below, at least one rule is required*
<img src=Picture9.png title="" alt="">

**DB Migration task is now ready to execute, just click on Action->Restart/Resume to start it manually.**

<img src=Picture10.png title="" alt="">


#### Conclusion

DMS is a crucial service when planning to migrate databases to the AWS cloud. Good thing is that DMS supports almost every database as a source and target, so it is easy to move our business to the cloud. We must learn more about the other tools which can be used in combination with DMS service. 



























































<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
