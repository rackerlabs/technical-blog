---
layout: post
title: "Truncate and delete operation auditing in MSSQL Server"
date: 2022-04-28
comments: true
author: Tarun Kumar
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - MSSQL
    - Database
metaTitle: "Truncate and delete operation auditing in MSSQL Server"
metaDescription: "This blog discusses the steps to determine the user responsible for truncating and removing data from tables on MSSQL server, and identify the entity responsible."
ogTitle: "Truncate and delete operation auditing in MSSQL Server"
ogDescription: "This blog discusses the steps to determine the user responsible for truncating and removing data from tables on MSSQL server, and identify the entity responsible."
slug: "truncate-and-delete-operation-auditing-in-mssql-server"

---

This blog discusses the steps to determine the user responsible for truncating and removing data from tables on MSSQL server, and identify the entity responsible. 

<!--more-->

For example: 
When was the table truncated, and when was the data removed from the table?
Who truncated the table and removed data from table? 


### Reason to collect this information

This is to see if someone deleted the data on purpose or by accident, so we can track down the individual and take preventative action. We receive few requests from customers looking for this information.
When we know the exact time of data purge operation then we can easily recover the data with stop at clause during log backup operation.


### Summary of the problem

The following sections describe four key principles for GitOps:

Between 5 p.m. and 7 p.m. on January 5, 2020, the "dump truncate" table was truncated and the data from the "dump delete" table was removed from the "truncate test" DB. The probable questions that need to be addressed include:
- You need to figure out what the problem is.
- Who removed the data from the “dump_delete” table?
- How many rows from the "dump delete" table were deleted?
- Who truncated the “dump_truncate” table?
- When were these tables truncated and deleted?
- On the server, the current backup schedule is as follows:
- Every week on Sunday, full backups are taken.
- Every day at 1 p.m., diff backup
- Backups of logs are generated every 15 minutes.

### Prerequisites: 


-	DB should be in full recovery mode.
-	Full, diff and log backups should be available.


### Approach at a high level:

1)	Identify which log backup holds delete and truncate operations.
2)	Identify details of truncate and delete operations using log backup.

### Determine which log backup holds the delete and truncate operations:

**NOTE**: We performed these steps by creating a new copy of the DB.

1)	Restore 2nd Jan Sunday full backup with standby mode.


2)	Restore 5th Jan diff backup with standby mode

3)	Restore log backup with standby mode. Check the table count after each log restore to see which log backup holds the truncate and delete operation logs.

When we restored the log backup from 6 PM, the "dump truncate" table was empty, and entries from the "dump delete" table were missing. As a result, it denotes:

Between 5:45 PM and 6 PM, the "dump truncate" table was truncated, and data from the "dump delete" table was wiped at the same time.

You need to run the following restore commands:

<img src=Picture1.png title="" alt="">

**Identify details of truncate and delete operations using log backup:**

*Step 1: Collect transaction IDs for all truncate and delete operations that occurred between 5:45 and 6 p.m.*

Query: 

<img src=Picture2.png title="" alt="">


<img src=Picture3.png title="" alt="">

We discovered that two operations, delete and truncate, were executed at 5:50 PM, and that these operations were performed by login RP Dev.

*Step 2:Find the table names that are associated to the transaction id.*

_To get information on the delete operation, follow the steps below:_

I)	Determine the delete operation's object ID and partition ID.

<img src=Picture4.png title="" alt="">


<img src=Picture5.png title="" alt="">

From this output, we can deduce the following information:
*Description and Transaction Name columns: Delete operation was performed*
- Begin Time: Delete operation was started at 2022/01/05 17:50:22:493
- Login_Name: RP_DEV had run the delete operation.
- Lock Information: Each row beginning with the prefix "HoBt" represents one row deletion, for a total of 7 rows.
- Object ID associated with the table from which data was removed.
- Partition Id: Partition id of the object from where data was deleted 

*II) Locate a table that contains the object ID and partition ID.*

Query: 

<img src=Picture6.png title="" alt="">


<img src=Picture7.png>

Now we can deduce that data from "dump delete" was removed by RP DEV user at 5:50 PM under the transaction ID '0000:00016a96' and that a total of 7 rows were deleted.	

**To get information on the truncate operation, follow the steps below:**

I) Determine the Truncate operation's object ID and partition ID.

<img src=Picture8.png>

Output:

<img src=Picture9.png>


Now we can deduce that data from "dump delete" was removed by RP DEV user at 5:50 PM under the transaction ID '0000:00016a96' and that a total of 7 rows were deleted.

**To get information on the truncate operation, follow the steps below:**

I) Determine the Truncate operation's object ID and partition ID.

Query:

<img src=Picture10.png>

Output

<img src=Picture11.png>

The output of the truncate operation differs slightly from that of the delete operation.

Partition ID column: It is not displaying the correct partition ID. You can find this information in the description column. Partition ID is highlighted. Partition IDs are 72057594043564032 and 72057594043629568

*Lock Description:* Always **SCH_M_OBJECT row** in Lock Description shows the correct Object ID. Object ID is: 885578193

Locate a table that contains the object ID and partition ID 

Query: 


<img src=Picture12.png>

Output

<img src=Picture13.png>


We can now establish that data from "dump truncate" was truncated at 5:50 PM by RP_DEV user under the transaction ID'0000:00016a95'.

### Conclusion

It is useful to know who performed truncate and delete operation on data to avoid this from happening again when auditing is not already enabled. 
In case of delete operation, business will have idea how many rows are removed. 
To have exact time of recovery will be very helpful to recover the data.
Further third-party tools like ApexSQL Log and ApexSQL Recover can also be used to recover the data. 
[Refer this link to have knowledge about these tools:](https://knowledgebase.apexsql.com/recovery-features-comparison-apexsqllog-vs-apexsqlrecover/)




<a class="cta red" id="cta" href="https://www.rackspace.com/data/nextgen-data-platforms">Let our experts guide you on your next gen data platform journey.</a>





Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
