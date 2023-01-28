---
layout: post
title: "Microsoft SQL Server - Add Articles to Existing Replication Without Reinitializing Snapshot"
date: 2023-01-25
comments: true
author: Varun Jha
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - SQL Server
    - Database
metaTitle: "Microsoft SQL Server - Add Articles to Existing Replication Without Reinitializing Snapshot"
metaDescription: "Data and database objects are copied and distributed between databases, and then synchronized to ensure consistency.
Transactional replication is typically used in scenarios requiring high server throughput, Reporting and data warehouses; improving scalability and availability; integrating data from disparate sources. Batch processing can be offloaded, heterogeneous data can be integrated, and multiple sites can be integrated."

ogTitle: "Microsoft SQL Server - Add Articles to Existing Replication Without Reinitializing Snapshot"
ogDescription: "Data and database objects are copied and distributed between databases, and then synchronized to ensure consistency. Transactional replication is typically used in scenarios requiring high server throughput, Reporting and data warehouses; improving scalability and availability; integrating data from disparate sources. Batch processing can be offloaded, heterogeneous data can be integrated, and multiple sites can be integrated."
slug: "microsoft-sql-server-add-articles-to-existing-replication-without-reinitializing-snapshot"

---

Replication can be defined as the process via which Data and database objects are copied and distributed between databases, and then synchronized to ensure consistency.
Transactional replication is typically used in scenarios requiring high server throughput, Reporting and data warehouses; improving scalability and availability; integrating data from disparate sources. Batch processing can be offloaded, heterogeneous data can be integrated, and multiple sites can be integrated.


<!--more-->

 Now a days, a major issue for every client is related to database performance. This blog explains how to tune memory in database which result in high performance in databases.
The following are the various kinds of memory tuning methods that are available: OS level process tuning, CPU tuning, RAM tuning, database tuning etc. In this blog I will be discussing about the memory tuning in databases.

**What we are trying to achieve:** 

Adding a fresh article to a replication is always a tedious task and specially when publisher is big in size or we have customizations in the subscription level. We don’t want to spend hours on reinitializing entire subscription or lose all customization happening on the subscriber for business needs.
For such cases we have a option to add article in exiting publication without generating the whole snapshot. Let's see how we can accomplish this.  


**Existing Replication details:-**

-	Publisher Instance:- LG4WX8Y2
-	Publisher Database:- [AdventureWorks2019]
-	Publisher Name :- AdvWorks-Publication
-	Article Count :- 13

<img src=Picture1.png title="" alt="">

-	Subscriber Instance:- LG4WX8Y2
-	Subscriber Database:- [AdventureWorksReporting]
-	Article Count :- 13

****************** **Steps to add articles in to existing replication ** **************************

1. Ensure exiting replication is healthy.
<img src=Picture2.png title="" alt="">

2. First, change the allow_anonymous property of the publication to FALSE

**Note:-** Note :- Anonymous subscriptions can be created for the given publication, and immediate_sync must also be true. This cannot be changed for peer-to-peer publications.

<img src=Picture3.png title="" alt="">

3. Next, disable change immediate_sync

**Note :-** Immediate_sync feature instructs replication to maintain Snapshot BCP files and distributed transactions in the Distribution database.  New Subscribers (or reinitialize) would not need to have a “fresh” snapshot generated. 

<img src=Picture4.png title="" alt="">

4.	Add article and invalidate the snapshot (New articles :- [Production].[Product] and [Person].[Person])

<img src=Picture5.png title="" alt="">

5. Refresh Subscription so that we can generate new snapshot 
<img src=Picture6.png title="" alt="">

**Note :-** /*When using pull subscription use below command  
*/--EXEC sp_refreshsubscriptions @publication = N'Adventureworks2016-Pub'

6. Now, start Snapshot Agent using Replication monitor for publisher "AdvWorks-Publication"
<img src=Picture7.png title="" alt="">

**NOTE:-** You should notice that bulk-insert statements are created only for 2 article instead of all articles.

7. Check if log reader agent is running and replicating transactions.
<img src=Picture8.png title="" alt="">

8. Ensure articles are added to publisher – Now you can see 15 articles in the list. 
<img src=Picture9.png title="" alt="">

9. First, change the immediate_sync property of the publication to true
<img src=Picture10.png title="" alt="">

10. Next, enable change allow_anonymous
<img src=Picture11.png title="" alt="">

11. Monitor the replication for some time.. 
<img src=Picture12.png title="" alt="">


Scripts Used for Demo:

{{< highlight sql>}}

/********************Steps to add articles in to exiting replication ********************/

--1.	Ensure exiting replication is healthy.  
--2.	First, change the allow_anonymous property of the publication to FALSE
/*       Note :- Anonymous subscriptions can be created for the given publication, and immediate_sync must also be true. 
Cannot be changed for peer-to-peer publications. */
 
USE AdventureWorks2019 -- <Replace Your DB Name>
GO
EXEC sp_changepublication
@publication = N'AdvWorks-Publication',
@property = N'allow_anonymous',
@value = 'FALSE'
GO

--3.	Next, disable change immediate_sync
/*Note :- Immediate_sync feature instructs Replication to maintain Snapshot BCP files and distributed transactions 
in the Distribution database should a new subscriber be created (or reinit) within the Retention period.  By default, 
this information is purged as soon as existing subscribers receive the transactions.  By keeping the Snapshot and transactions for hours or days, 
new subscribers can 1) Use old snapshot files, and 2) apply all pending changes since the snapshot.  New Subscribers (or reinit) 
would not need to have a �fresh� snapshot generated.*/

USE AdventureWorks2019 -- <Replace Your DB Name>
GO
EXEC sp_changepublication
@publication = N'AdvWorks-Publication',
@property = N'immediate_sync',
@value = 'FALSE'
GO

 --4.	Add article and invalidate the snapshot (New articles :- [Production].[Product] and [Person].[Person])

USE AdventureWorks2019 -- <Replace Your DB Name>
GO
EXEC sp_addarticle
@publication = N'AdvWorks-Publication',
@article =N'Product',
@source_owner = N'Production',
@source_object =N'Product',
@force_invalidate_snapshot=1
GO
EXEC sp_addarticle
@publication = N'AdvWorks-Publication',
@article =N'Person',
@source_owner = N'Person',
@source_object =N'Person',
@force_invalidate_snapshot=1

--5.Refresh Subscription so that we can generate new snapshot 

USE AdventureWorks2019 -- <Replace Your DB Name>
Go
Exec sp_addsubscription
@publication = N'AdvWorks-Publication',
@article = N'All',
@subscriber = N'LG4WX8Y2',
@destination_db = N'AdventureWorksReporting',
@sync_type = N'automatic',
@update_mode = N'read only'
GO 

--Note --
/*When using pull subscription use below command  */
--EXEC sp_refreshsubscriptions @publication = N'Adventureworks2016-Pub'

--6.Now, start Snapshot Agent using Replication monitor for publisher "AdvWorks-Publication"
	 
--Note :- You should notice that bulk-insert statements are created only for 2 article instead of all articles.
--7.	Check if log reader agent is running and replicating transactions.

--8.Ensure articles are added to publisher � Now you can see 15 articles in the list. 

use AdventureWorks2019
go
SELECT
DB_NAME() PublisherDB,
sp.name as PublicationName,
sp.immediate_sync,
sp.allow_anonymous,
OBJECT_SCHEMA_NAME(sa.objid, db_id()) as ArticleSchema,
sa.name as ArticleName,
s.status [subscription status],
CASE s.status
       WHEN 0  THEN 'Inactive'
       WHEN 1  THEN  'Subscribed (Not Published)'
       ELSE 'Active (Published)'
END AS [subscription status desc],
sa.pre_creation_cmd,
CASE sa.pre_creation_cmd
       WHEN 0  THEN 'none'
       WHEN 1  THEN 'drop'
       WHEN 2  THEN 'delete'
       ELSE 'truncate'
END AS pre_creation_cmd_desc,
UPPER (srv.srvname) AS SubscriberServername,
case s.sync_type
             when 2 then
                           case s.nosync_type
                                  WHEN 3 THEN 5
                                  WHEN 2 THEN 4
                                  WHEN 1 THEN 3
                                  else 2
                END
                     ELSE s.sync_type
END as sync_type,
 
case s.sync_type
              when 2 then
                 case s.nosync_type
                    WHEN 3 THEN 'initialize with lsn' 
                    WHEN 2 THEN 'initialize with backup'
                    WHEN 1 THEN 'replication support only'
                    else CAST (2 AS VARCHAR (2)) +'none'
                 END
                       when 1 THEN 'automatic'
              ELSE CAST (s.sync_type AS VARCHAR)
END as sync_type_desc
FROM dbo.syspublications sp
JOIN dbo.sysarticles sa ON sp.pubid = sa.pubid
JOIN dbo.syssubscriptions s ON sa.artid = s.artid
JOIN master.dbo.sysservers srv ON s.srvid = srv.srvid



--9.First, change the immediate_sync property of the publication to true

USE AdventureWorks2019 -- <Replace Your DB Name>
Go
EXEC sp_changepublication
@publication = N'AdvWorks-Publication',
@property = N'immediate_sync',
@value = 'TRUE'

--10.Next, enable change allow_anonymous
USE AdventureWorks2019 -- <Replace Your DB Name>
Go
EXEC sp_changepublication
@publication = N'AdvWorks-Publication',
@property = N'allow_anonymous',
@value = 'TRUE'
GO

--11.Monitor the replication for sometime. 

{{ < /highlight > }}


<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).