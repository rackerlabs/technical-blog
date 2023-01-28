
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
would not need to have a “fresh” snapshot generated.*/

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

--8.Ensure articles are added to publisher – Now you can see 15 articles in the list. 

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

