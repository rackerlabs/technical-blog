---
layout: post
title: "Procedure of taking backup of MS SQL Database"
date: 2022-02-23
comments: true
author: 
authorAvatar: 'https://secure.gravatar.com/avatar/c7776b42759c729500163fc6588221ac'
bio: ""
published: true
authorIsRacker: true
categories:
    - SQL Server
    - Database
metaTitle: "Procedure of taking backup of MS SQL Database"
metaDescription: "In this blog, I have discussed the process of taking backup of MS SQL Database, the types of backups, and steps to take up the backup."
ogTitle: "Procedure of taking backup of MS SQL Database"
ogDescription: "In this blog, I have discussed the process of taking backup of MS SQL Database, the types of backups, and steps to take up the backup."
slug: "procedure-of-taking-backup-of-ms-sql-database"

---
In this blog, I have discussed the process of taking backup of MS SQL Database, the types of backups, and steps to take up the backup.

<!--more-->

### Introduction
MSSQL is a relational database management system (RDBMS) built for the basic function of storing retrieving data as required by other applications. It can be run either on the same computer or on another across a network.  It is a highly scalable product that can be run on anything from a single laptop to a network of high-powered cloud servers, and anything in between.



### Backup Process Basics


SQL Server allows three basic types of Microsoft SQL Server backup:
1.	Full backup
2.	Differential backup
3.	Transaction log backup
Now let’s look at different types of backups type.

#### 1.Full Backup
A backup containing all the data from the database in question is known as full backup. Such as file sets and file groups, as well as logs to ensure data recovery.  **These backups create a complete backup of your database as well as part of the transaction log, so the database can be recovered.**

#### 2.Differential Backup

A differential database backup is based on the most recent, previous full backup. **A differential database backup only captures the data that has changed since the last full backup. A previous full backup is needed if you want to restore a differential backup.**

#### 3.	Transaction log backup.
Backup taken of transaction logs is known as transaction log backup.
It includes all log entries that were absent in the previous transaction log backup (available in the full restore model only).

### Here we will see the steps of taking Full Backup of MS SQL.

**DB Backup Process: -**

#### Step 1: Select database which you want to take the backup of and click on the right, you will see a screen pop as shown in the following snapshot. Then Go to the task and select 'backup.'

<img src=Picture1.png title="" alt="">

#### Step 2. Select backup type (Full\diff\log) and make sure to check destination path which is where the backup file will be created. 

<img src=Picture2.png title="" alt="">

#### Step 3. Go to Backup option & and select the compress backup if required.

<img src=Picture3.png title="" alt="">

#### Step 4. Go to add button and select the path where you want to keep the backup file. Make sure the backup location is accessible.

<img src=Picture4.png title="" alt="">

#### Step 5. Select the path and type of the backup file name with .BAK and click ok.

Extension of Backup: 
1. For Full backup (.BAK) 
2. For Transaction Log (.trn) 
3. For Differential (.dif) 
4.	For File & File group (.fil)

<img src=Picture5.png title="" alt="">

#### Step 6. Go to Ok button.

<img src=Picture6.png title="" alt="">

#### Step 7. Go to OK button then again OK

<img src=Picture7.png title="" alt="">


#### Step 8. Backup has been completed and click ok again.

<img src=Picture8.png title="" alt="">

#### Step 9. Check the Backup file where you keep the backup.

<img src=Picture9.png title="" alt="">



_If your database size is big, you will need to combine full, differential and transaction log backups. If your database is big and it does not change too much, a differential backup will take less space than a full backup and you will save a lot of space._
_Do not store your backup on the same drive than the database. If possible, try to store your backup on another server or even better on another physical place._

### Conclusion
Database backups are vital for recovery in any disaster scenario. 
You should plan proper backup policy, validate the restoration plan as per the criticality.




<a class="cta red" id="cta" href="https://www.rackspace.com/data/managed-sql">Let our experts guide you on your SQL Journey.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
