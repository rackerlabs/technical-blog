---
layout: post
title: "Migrate data from mdf file to ndf file in same file group"
date: 2022-06-28
comments: true
author: Shubham Sharma
authorAvatar: 'https://s.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - SQL
    - Database
metaTitle: "Migrate data from mdf file to ndf file in same file group"
metaDescription: "Migrate data from mdf file to ndf file in same file group"
ogTitle: "Migrate data from mdf file to ndf file in same file group"
ogDescription: "Migrate data from mdf file to ndf file in same file group"
slug: "migrate-data-from-mdf-file-to-ndf-file-in-same-file-group"
---


**Problem:** Database integrity job was failing due to IOPS issue for TestDB database which is more than 2 TB in size. Due to large file size, it is becoming difficult to manage the database.

<!--more-->

**Approach:** To troubleshoot this, we decided to split the data between 2 data files. So current state of the drive space and data file is as below:


<img src=Picture1.png title="" alt="">
<img src=Picture2.png title="" alt=""

Our data file is hosted in N:\ drive and we will be creating another file in the same location. Our approach is to start the data transfer by using emptyfile command and the manually stop the query in between in order to forcefully stop the data movement. Please note that manually stopping the query in between will not have any impact on the database (integrity/consistency). Then we will shrink the mdf file to reclaim the free space.

**Solution**: Follow below steps to split the data between multiple SQL Server data files. 
First, we need to add a secondary data file in which we will be inserting out data. It will be added as ndf (next data file). Run below script to add additional data file on TestDB database

{{< highlight >}} 
USE [master]
GO
ALTER DATABASE [TestDB] ADD FILE ( NAME = N'TestDB_1', FILENAME = 
N'N:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\TestDB_1.ndf' , 
SIZE = 209715200KB , FILEGROWTH = 5242880KB ) TO FILEGROUP [PRIMARY]GO 
{{< /highlight >}}


Once you execute this script, it will add a new data file named TestDB_1 in N:\ drive and the size will be 200 GB (We took this with context to our database). We have set the file growth of 5 GB and the datafile will be added to primary file group.
 
Now, after adding the data file start DBCC emptyfile operation on TestDB database. The syntax will be:

```
use YOURDATABASE
go
dbcc shrinkfile(‘mdfFileName’,emptyfile)
```

So in our case it will be:

{{< highlight >}}

USE [TestDB]

go

DBCC shrinkfile ('TestDB’,emptyfile)
{{< /highlight >}}

Here TestDB is the logical name of the file from which we want to remove the data i.e our mdf file.
Now once we started this operation, we need to keep track, how much the data is moved from mdf to ndf. You can use below query to keep the track of the same:


{{< highlight >}}

USE [TestDB]
GO
SELECT
[TYPE] = A.TYPE_DESC
,[FILE_Name] = A.name
,[FILEGROUP_NAME] = fg.name
,[File_Location] = A.PHYSICAL_NAME
,[FILESIZE_MB] = CONVERT(DECIMAL(10,2),A.SIZE/128.0)
,[USEDSPACE_MB] = CONVERT(DECIMAL(10,2),A.SIZE/128.0 - ((SIZE/128.0) - CAST(FILEPROPERTY(A.NAME, 'SPACEUSED') AS INT)/128.0))
,[USEDSPACE_%] = CAST((CAST(FILEPROPERTY(A.name, 'SpaceUsed')/128.0 AS DECIMAL(10,2))/CAST(A.size/128.0 AS DECIMAL(10,2)))*100 AS DECIMAL(10,2))
,[FREESPACE_MB] = CONVERT(DECIMAL(10,2),A.SIZE/128.0 - CAST(FILEPROPERTY(A.NAME, 'SPACEUSED') AS INT)/128.0)
,[FREESPACE_%] = CONVERT(DECIMAL(10,2),((A.SIZE/128.0 - CAST(FILEPROPERTY(A.NAME, 'SPACEUSED') AS INT)/128.0)/(A.SIZE/128.0))*100)
,[AutoGrow] = 'By ' + CASE is_percent_growth WHEN 0 THEN CAST(growth/128 AS VARCHAR(10)) + ' MB -'
WHEN 1 THEN CAST(growth AS VARCHAR(10)) + '% -' ELSE '' END
+ CASE max_size WHEN 0 THEN 'DISABLED' WHEN -1 THEN ' Unrestricted'
ELSE ' Restricted to ' + CAST(max_size/(128*1024) AS VARCHAR(10)) + ' GB' END
+ CASE is_percent_growth WHEN 1 THEN ' [autogrowth by percent, BAD setting!]' ELSE '' END
FROM sys.database_files A LEFT JOIN sys.filegroups fg ON A.data_space_id = fg.data_space_id
order by A.TYPE desc, A.NAME;

{{< /highlight >}}

For our approach, we wanted the ndf to be at around 500 GB, so once the ndf reach this size, we can stop the emptyfile operation.
Once emptyfile operation is stopped, we need to manually reclaim the free space in mdf by using below query:

`DBCC Shrinkfile('TestDB', 1500000)` --  We need to change the size in smaller chunks


Now our mdf was 2 TB, we moved 500 GB to ndf, hence 500 GB is reclaimable from mdf, which we just reclaimed using above query.

We can repeat this step multiple time to move the data between datafiles, manually stopping the operation in between according to our storage and then reclaim the space again.

One thing to note while using emptyfile on mdf that you won’t be able to fully empty the contents of the primary data file with file ID 1. In order to get the file ID number, run this script.

`select file_id, name,physical_name from sys.database_files`

<img src=Picture3.png title="" alt="">

Here, in this example, the filename is “mo” and file_id is 1. When you try emptying the file mo which has file_id  1, you will encounter this error message.

<img src=Picture4.png title="" alt="">

This is because there is system information within the original file, which cannot be emptied. But, if you try the same command on the other data file “mo2data”, the empty file command will succeed.

<img src=Picture5.png title="" alt="">



### Conclusion

Once this data movement activity is complete, please run database maintenance jobs:
-- Index optimize job
-- Integrity check job
-- Full database backup job.



<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
