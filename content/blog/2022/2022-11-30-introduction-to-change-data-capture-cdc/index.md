---
layout: post
title: "Introduction to Change Data Capture (CDC)"
date: 2022-11-30
comments: true
author: Ravi Agarwal
authorAvatar: 'https://secure.gravatar.com/avatar/67808fd0fb7fb16112fdb8e9c6e93e67'
bio: ""
published: true
authorIsRacker: true
categories:
    - Databases
    - SQL Server
metaTitle: "Introduction to Change Data Capture (CDC)"
metaDescription: "Change data capture (CDC) uses SQL Server agent to capture DML activities like deleting, updating, and inserting on a table."
ogTitle: "Introduction to Change Data Capture (CDC)"
ogDescription: "Change data capture (CDC) uses SQL Server agent to capture DML activities like deleting, updating, and inserting on a table."
slug: "introduction-to-change-data-capture-cdc"

---

What is Change Data Capture (CDC)?
 
Change data capture (CDC) uses SQL Server agent to capture DML activities like deleting, updating, and inserting on a table.


<!--more-->

 These DML activities are captured in a table format in a relational database. In SQL server, CDC works similarly to SQL server transactional replication. It is commonly used for replicating data from databases to a data warehouse by syncing the database change logs rather than fetching data from tables.

If a CDC is enabled for a table, any DML operation on that table is written to a transaction log. These changes are now captured by the CDC capture job from a transaction log file and written to different change data capture tables. Now different CDC functions access these tables to get change data.

To learn more, you can [click here](https://learn.microsoft.com/en-us/sql/relational-databases/track-changes/about-change-data-capture-sql-server?view=sql-server-ver16)


**Why re-configure CDC?**

For a customer, CDC failed and gave the following error:

*The specified LSN {XXXXXXXX:XXXXXXXX:XXXX} for repldone log scan occurs before the current start of replication in the log {YYYYYYYY:YYYYYYYY:YYYY}. [SQLSTATE 42000] (Error 18768) The call to sp_MScdc_capture_job by the Capture Job for database '<DBName>' failed. [SQLSTATE 42000] (Error 22864)*


While troubleshooting this error, it was discovered that though working of CDC and replication is similar, yet replication stored procedures 'sp_repldone' and 'sp_replflush' cannot be used to fix this issue with CDC.
 
In view of the above, decided to go with the re-configuration of the CDC. Following are the steps to re-configure CDC.

1. **Capture details of an existing configuration:**

Execute the following T-SQL query on the database with CDC enabled to capture the details of an existing CDC configuration.
 
{{< highlight sql >}}
Use <DBName>
Exec sp_cdc_help_change_data_capture  
GO
SELECT *  FROM [msdb].[dbo].[cdc_jobs]
{{< /highlight >}}

2. **Disable CDC for a database:**

Use the following query to disable change data capture for all the tables in the database currently enabled.

{{< highlight sql >}}
USE <DBName>
GO  
EXEC sys.sp_cdc_disable_db  
GO
{{< /highlight >}}

*Execution of sys.sp_cdc_disable_db may fail due to long running transactions in case the database have multiple capture instances. In this case, we need to disable CDC for the capture instances first by disabling it using sys.sp_cdc_disable_table. Once all the tables (capture instances) are disabled for the CDC, a database can be disabled for CDC using sys.sp_cdc_disable_db stored procedure.*

3. **Enable CDC for the database:**  

Use the following T-SQL query to enable change data capture for the database.

{{< highlight sql >}}

USE <DBName>
GO  
EXEC sys.sp_cdc_enable_db  
GO
{{< /highlight >}}

4. **Enable CDC for tables based on an existing configuration:**

Use the following T-SQL query on every table to enable change data capture for the tables which were originally configured for change data capture.  Please note that the following are mandatory parameters only.

{{< highlight sql >}}
EXEC sys.sp_cdc_enable_table  @source_schema = N'dbo',  @source_name   = N'<TableName>' , @role_name=null
GO
{{< /highlight >}}

It is important to note that in the above TSQL, only mandatory parameters are included. There are several other parameters that can be passed while calling this stored procedure. Parameters need to be mentioned as per configuration values captured in the first step. You can [click here](https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sys-sp-cdc-enable-table-transact-sql?view=sql-server-ver16) to read more about the default values of various parameters.

5. **5.	Create capture and cleanup jobs:**

Capture and cleanup jobs will get created once a table will be enabled for the CDC. Use the following T-SQL query to modify the retention period of CDC data.

{{< highlight sql >}}
USE <DBName>
GO  
EXEC sys.sp_cdc_change_job  
     @job_type = N'cleanup'  
    ,@retention = 180;   
{{< /highlight >}}

**NOTE:** Put value based on existing value in [msdb].[dbo].[cdc_jobs] table
 
Now CDC has been reconfigured successfully. You need to validate it by checking the status of the capture and cleanup job. These would be present with the name <DBNAME>_capture and <DBName>_cleanup.

The following query can also be used to view the net and all changes on table dbo.tablename. However, query will return any data once there are some changes in the table after the capture job starts.

{{< highlight sql >}}

DECLARE @from_lsn binary(10), @to_lsn binary(10)
SET @from_lsn = sys.fn_cdc_get_min_lsn('dbo_<tablename>')
SET @to_lsn = sys.fn_cdc_get_max_lsn()
 
-- Get net changes
SELECT * FROM cdc.fn_cdc_get_net_changes_dbo_<tablename>(@from_lsn, @to_lsn, 'all')
-- Get all changes
SELECT * FROM cdc.fn_cdc_get_all_changes_dbo_<tablename>(@from_lsn, @to_lsn, 'all')
 
SELECT * from cdc.[fn_cdc_get_all_changes_...] (@from_lsn, @to_lsn, 'all')
{{< /highlight >}}

**Conclusion**

By following the above steps, one can reconfigure change data capture with same settings with which it was configured. This article is useful in cases where one is not able to fix the errors in CDC jobs and wants to reconfigure change data capture from scratch. It is also useful in migration cases where one need to configure change data capture on new servers with same set of tables and settings as on existing one.


<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).