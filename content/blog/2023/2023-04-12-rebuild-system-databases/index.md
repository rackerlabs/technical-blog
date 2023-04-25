---
layout: post
title: "Rebuid System Databases"
date: 2023-04-25
comments: true
author: LKD Naidu
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - Databases
    - MSSQL
metaTitle: "Rebuild System Databases."
metaDescription: "Sometimes it so happens that we cannot start a SQL Server instance because a system database corruption"
ogTitle: "rebuild-system-databases"
ogDescription: "Sometimes it so happens that we cannot start a SQL Server instance because a system database corruption."
slug: "rebuild-system-databases"
---

    Sometimes it so happens that we cannot start a SQL Server instance because a system database corruption.

<!--more-->

#### Introduction

**Rebuilding the MSDB database process:**

1.  First we need to verify the reason of failure in the SQL Error logs or windows logs and troubleshoot accordingly. If database is corrupt then please restore MSDB  database same as a normal user database if backup is available

<img src=Picture1.png title= "" alt="">

2.) If We don’t have the  latest backup  or any other backups, then  please stop the instance and start the instance in Single(maintenance mode)  and trace 3608 in startup parameters.

<img src=Picture2.png title= "" alt="">

If it is Default instance Please use server name as "SQL Server (MSSQLSERVER)"  

If it is Named instance Please use server name as "SQL Server (Instance_Name)"  
Trace 3608 (/t3608) :  This parameter starts only master database recovery process by skipping all other databases recovery process. It means only master db comes only. 

/m : This parameter starts SQL server instance in maintenance mode or single-user mode which means only a single user can connect, and it does not start CHECKPOINT process. 

3.  Now Connect to instance and take new query window  run below command to detach the MSDB database post that please delete data and log files of MSDB from drive. 

<img src=Picture3.png title= "" alt="">

5. Now please stop and start instance without any parameters.

<img src=Picture4.png title= "" alt="">

**ISSUE-:AFTER MSDB REBUILD, SQL SERVER AGENT IS NOT ABLE TO START?: HOW TO RESOLVE**

#### Solution

<img src=Picture5.png title= "" alt="">

**NOTE:-** If MSDB is corrupted still we can start the Instance but we cannot start SQL agent .

#### Rebuild the TEMPDB database process :

1. If tempdb corrupt instance wouldn't respond and it would be in hung state equal to crash.
2. Confirm from SQL server/windows log files whether that really if tempdb has got corrupted or not.
3. To resolve ,restart SQL server instance so that tempdb files will be recreated.

### Rebuild the MODEL Database Process

Model database is the one of critical database  which are useful to new database creations and also for Tempdb database recreation on every SQL server restart. Hence If model database is corrupt  we cannot access/use  the instance . 

#### Steps

1. Verify if Model is corrupt or not in Event viewer and SQL Server Error Logs.

2. Confirm if a valid database backup exists or not using restore verifyonly/headeronly.

3. Start instance with Master database Only by enabling the trace 3608.

<<img src=Picture6.png title= "" alt="">>

4. Restore the Model database from backup.

<<img src=Picture7.png title= "" alt="">>

5. If backup is not available: Copy and paste model .mdf, .ldf files from other instance where we have same version instance [Required to take destination instance offline]


**Rebuild the system databases | Rebuild the Master database process:**

-  Step 1: Step 1: Please check the SQL error logs  or Windows Event logs where We can confirm whether master database is corrupt or not . If master database is corrupted follow step 2 and step3 . 

-  Step 2:  If we have latest master database backup then please restore master database.

- Step 3: If we don’t have latest full backup of master database or unbale to restore Master database backup then please perform “Rebuild system databases” 

*Go to run and open command window  Go to the following path (based on version) and run the below setup syntax:*

<<img src=Picture9.png title= "" alt="">>

- Step 4:  If above command has been completed successfully, then please check summary.txt file for the confirmation.

- Step 5:  Now go to services or SQL configuration manager , restart SQL Server service.

- Step 6: Now we are able to connect to SQL instance but we can’t  see any user databases user instance and previous Server configuration  settings since the rebuilding process has created a fresh copy of master database. 

- 7: To get backup our databases and server settings we need to restore the master database . For this please open Command prompt with run as administrator  and Start SQL service  in single user mode.

- 8. Now please restore master database with replace option. Once restore completes successfully , then we can see all the previous configuration values including user defined databases.

- Step 9:  Please stop SQL services and start again in multi user mode .

**If MASTER  is corrupt we cannot start the DB engine:**

In this scenario  we have to rebuild all system databases to fix corruption problems. When databases are rebuilt,  then dropped and re-created the all system databases  in their original location.  


#### Conclusion

:  I hope this article Explained the process how to rebuild the system databases for the Windows SQL Server 



a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed SQL Services.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
