---
layout: post
title: "Shrinking of SQL Databases using Notruncate Command "
date: 2022-11-28
comments: true
author: Srikanth Police
authorAvatar: 'https://secure.gravatar.com/avatar/f8bda83297eebe0c5eb77be00c862e5b'
bio: ""
published: true
authorIsRacker: true
categories:
    - Databases
    - SQL Server
metaTitle: "Shrinking of SQL Databases using Notruncate Command"
metaDescription: "This blog discusses the process of shrinking the data file of a SQL server database by using the option DBCC shrink file using the Notruncate option."
ogTitle: "Shrinking of SQL Databases using Notruncate Command "
ogDescription: "This blog discusses the process of shrinking the data file of a SQL server database by using the option DBCC shrink file using the Notruncate option."
slug: "shrinking-of-sql-databases-using-notruncate-command "

---

This blog discusses the process of shrinking the data file of a SQL server database by using the option DBCC shrink file using the Notruncate option. 

<!--more-->

### Introduction

We received a request from a customer to review the SQL server database disk utilization. During the investigation, it was identified that some tables were utilizing a considerable amount of space in the database. After working with the customer on data purging, we made 60% of the space in a one TB data file. The next step was to release the freed-up space to the drive for the customer.

#### DBCC Shrinkfile with TruncateOnly: 

Though the recommendation was not to shrink the data file, yet the customer insisted that we shrink the data file. Hence, we started by shrinking the data file into smaller chunks by using the following command.

```
USE [Test]
GO
DBCC SHRINKFILE (N'Test_data' , 1024, TRUNCATEONLY)
GO
```

***TRUNCATE ONLY***

The command helps free the space at the end of the file for the operating system. This option doesn't move pages inside the data file, and it shrinks only to the last assigned extent.
By using the above method, we almost claimed 250 GB successfully. After that shrinking is not getting processed even running for several days. After understanding the data file architecture, it was identified that DBCC SHRINKFILE (N'Test_data' , 1024, TRUNCATEONLY) **releases the free space at the end of the data file and it doesn’t release the remaining space in the middle of the data file.** 

***DBCC Shrinkfile with Notruncate***

Finally, we executed the dbcc shrink file command with the notruncate option to rearrange the data and create free space at end of the data file.

```

USE [Test]
GO
DBCC SHRINKFILE (N'Test_data' , Notruncate)
GO
```


#### Data before Notruncate:

<img src=Picture1.png title="" alt="">

#### Data after Notruncate: 
<img src=Picture2.png title="" alt="">

**NOTRUNCATE**

It moves all the assigned pages from the data file end to unassigned pages in the front of the data file which creates empty space at the end of the datafile. 
The data file appears not to shrink when you specify NOTRUNCATE option, and this option works only for data files.

We have executed DBCC Shrinkfile with truncateonly option and this time it released the free space to the disk.  

**CONSIDERATIONS**

-	A shrink operation generally increases fragmentation level, and it is another reason to avoid the database shrinking repeatedly. 
-	Shrinking a database file frequently and noticing that the database file size increase grows again, indicates free space is required for day-to-day operations. In such cases shrinking is not recommended. 
-	A shrink operation can be triggered after purging huge data/tables.
-	It is always a good practice to perform index maintenance on the database after the data file shrink operation.

#### Conclusion:

However, shrinking a database with no truncate option will result in higher fragmentation and this is resource expensive. Hope this article helps when you are stuck at database shrinking that doesn’t release the free space. 



<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
