---
layout: post
title: "AWS Migration Using DMS Series Part-1"
date: 2022-08-06
comments: true
author: Ankita Garg
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - AWS
    - Database
metaTitle: "AWS Migration Using DMS Series Part-1"
metaDescription: "In this fast moving Tech world, everyone wants to use best technology with max performance and minimum cost. AWS Cloud was introduced with the same notion."
ogTitle: "AWS Migration Using DMS Series Part-1"
ogDescription: "In this fast moving Tech world, everyone wants to use best technology with max performance and minimum cost. AWS Cloud was introduced with the same notion."
slug: "aws-migration-using-dms-series-part-1"

---

In this fast moving Tech world, everyone wants to use best technology with max performance and minimum cost. AWS Cloud was introduced with the same notion. 
In 2016, AWS introduced its tool DMS (Database Migration Service) to help customers migrate their Databases to AWS. 


<!--more-->

### Section 1 - Overview of AWS Native Migration Options

Through this blog, we would try to understand AWS provided different methods to migrate data from On-Prem/Non AWS Cloud to AWS(Amazon Web Service). Our Primary focus is DMS which is almost free.
For more details on pricing, Ref: https://aws.amazon.com/free/migration/ 
I shall walk you through below topics:
a.	What is DMS?
b.	List of Pre-requisites to use DMS.


Lets start: 
There are two native migration options provided by Amazon:
1.	Schema Conversion Tool (SCT)
This is basically a tool which one can use if want to convert database schemas from one engine to another.
If you want to know more about SCT, refer below:
https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html

2.	Database Migration Service (DMS)
DMS is a database migration service provided by AWS to help customers move their databases to AWS cloud.

**NOTE:** Before migration, AWS DMS checks for below on the target: 

1.	Tables
2.	Primary keys associated

If above do not exist then AWS DMS creates them and then actual data transfer is initiated.

### Alternatives

1.	We can pre-create the target tables ourself.
2.	We can use AWS Schema Conversion Tool (AWS SCT) to create below objects:
- Target Tables
- Views
- Indexes
- Triggers and many other objects

### What does DMS not do?

It does not create schemas on Target table. Schema should already exist if data has to be moved in a specific schema.
It does not do conversions neither Schema nor code . If that is needed, we need to use tools like: SQLDev, MySQL Workbench, SCT.


### Section 2: Database Migration Service

DMS is generally an EC2 server in the cloud VPC(Virtual Private Cloud) which runs software called Replication. It can be used for migration of below databases:
-	Oracle DBs version 10.x to 19c 
-	Data warehouse 
-	NoSQL like PostGre, MongoDB
-	MySQL dbs like MariaDB
-	Azure SQL DB
-	GCP(Google Cloud Platform) MySql
-	And many more

For extensive list, Refer: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Introduction.Sources.html

<img src=Picture1.png title="" alt="">

### Pre-req resources to replicate data using DMS:

1.	A Replication Instance :
Below are the Pre-req resources for creating EC2
-	VPC 
-	Security group( with outbound rule set to let all traffic on all ports leave (egress) the VPC )
-	Below different Network configuration can be used but need to be chosen prior which one you want to go with: Refer: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_ReplicationInstance.VPC.html


- a: Network configuration to a VPC using AWS VPN or Direct Connect 

<img src=Picture2.png title="" alt="">

- b: Network configuration to a VPC using internet 

<img src=Picture3.png title="" alt="">

- c: c.	Network configuration using Classic Connect where
RDS DB is not in VPC and Source is not in VPC 

<img src=Picture4.png title="" alt="">

2.	Configure endpoints for Source(From where to copy) and Target(to which to copy)
- Allowed Source details:
https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Introduction.Sources.html

- Allowed Target details:
https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Introduction.Targets.html

*Below is the generic information required:*

-	Endpoint type –One has to choose Source if configuring Source else target.
-	Engine type – DB engine type, this will be the DB information as per Source or target
-	Server name – IP address that AWS DMS can reach. This will be as per source/target whichever is getting configured.
-	Port –  DB Port for making DB connections.
-	Encryption – if you choose then SSL is used to encrypt the connection.
-	Credentials – DB User/password for the account with required accesses.


3. Replication task --- To transfer data from Source to Target.
This is the actual task which will perform replication. Need below details:

-	Replication instance – an EC2 instance in which replication related caching calculations happen
-	Endpoints both Source and Target
-	Migration Type--- We have below types to choose from:
- Full Load---This is generally used for first time
- CDC only ie Changes only—This is used to catch up data once first full load is complete.
- Full load+CDC


### Various Phases of Replication task:

- a. a.	Full load :
AWS DMS checks for existence of tables, unique indexes, primary keys on target, if they don’t exist it creates them before starting load. Data is moved in parallel.

**NOTE:** DMS does not creates any unnecessary objects on target which are not required for migration 
for eg non primary key constraints, secondary index, data defaults are not created.

**Case:** Homogeneous migration:
- This is when both source and target are of same engine type
Here schema can be exported and imported using Native tool of your engine also
 
- b. Cached changes:

When you are doing a full load in AWS and your source is still active then there could be data change at source end. These changes are not applied by DMS till full load is complete. 

Once full load is complete cache changes are applied.

- c.	Ongoing replication

**NOTE:** If we want to migrate to different database engine then SCT service need to be used in conjunction with DMS.


### Conclusion

Through this blog we tried to understand DMS, its architecture and pre-requisites.
In next Part we shall see how we can *Configure Ongoing Replication from RDS to Redshift.*
Stay tuned.

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).