---
layout: post
title: "Timestamp column and SQL server replication"
date: 2023-05-15
comments: true
author: Ravi Agarwal
authorAvatar: 'https://secure.gravatar.com/avatar/67808fd0fb7fb16112fdb8e9c6e93e67'
bio: "I am a SQL server database administrator having ~13 years of experience with multiple organizations. Currently I am working with Rackspace Technologies as SQL Server Database Administrator."
published: true
authorIsRacker: true
categories:
    - MSSQL
    - SQL Server
    
metaTitle: "Timestamp column and SQL server replication"
metaDescription: "Recently I encountered an issue while trying to reinitialize transactional replication subscription through backup and restore method due to timestamp column in a published table."
ogTitle: "Timestamp column and SQL server replication"
ogDescription: "Recently I encountered an issue while trying to reinitialize transactional replication subscription through backup and restore method due to timestamp column in a published table."
slug: "timestamp-column-and-sql-server-replication"

---
Recently I encountered an issue while trying to reinitialize transactional replication subscription through backup and restore method due to timestamp column in a published table. In this article, we will discuss about the relation and the impact of timestamp column with SQL server replication.

<!--more-->

**What is timestamp data type?**

Timestamp data type is also known as 'rowversion' . It is a synonym for datatype 'rowversion' however  timestamp syntax is deprecated while rowversion can be used.  Timestamp datatype is used by developers mainly to maintain optimistic concurrency control during the DML operations. Timestamp data type should not be confused with date or time data types.
Further timestamp or rowversion is automatically generated during row update.

**SQL server Peer to peer transactional replication and Timestamp column**

Timestamp column is not supported by Peer to peer transactional replication. Hence if a table is having timestamp type column , it cannot be published.


<img src=Picture1.png title="" alt= "">

**Timestamp column in snapshot, transactional replication and merge replication**
There is no restriction on table having timestamp data type column to be published in snapshot, transactional replication and merge replication.

**Issues while reinitializing transactional replication subscription through backup and restore method having timestamp column**

SQL server support publishing table having timestamp datatype column in transactional replication. Timestamp stamp column values are regenerated on subscriber table and both publisher and subscriber table tables have different values in timestamp column.
This is evident from sp_MSins_< TableName > stored procedure which is automatically get created for every table on subscriber. 

As per below snapshot, it is clear that explicit values are not being inserted on subscriber table for timestamp column and getting generated automatically.

<img src=Picture2.png title="" alt= "">

It also supports initialization from both snapshot and backup/restore method. Although recently my team faced issue while reinitializing a subscription through backup and restore having timestamp column and faced below error:

*Cannot insert explicit value into a timestamp column. Use INSERT with  column list to exclude timestamp column, or insert a DEFAULT into timestamp column. (Source: MSSQL Server, Error number: 273)*

Get help: [help](http://help/273)

In my test environment, I tried to reproduce the issue by reinitializing subscription through backup and restore but it was all working fine. Different values are generated for timestamp column for the new rows inserted. After the backup/restore subscriber table was having same value initially for timestamp column but newly inserted rows contains different values for timestamp column. Please refer TimeStmp column value against EmpId 20 in below screenshot.

<img src=Picture3.png title="" alt="">

When I changed the default article property  'Convert TIMESTAMP to BINARY' option to TRUE and deleted the subscription and subscriber database and initialized it from fresh backup, distributer agent started failing with error 273.

<img src=Picture4.png title="" alt="">

As per MS, when initializing transactional replication with backup and restore method,  timestamp columns at the subscriber database must be converted to binary(8) columns followed by copying the content of the tables containing timestamp columns to new tables with matching schemas except having binary(8) columns in place of the timestamp columns, drop the original tables, and rename the new tables with the same names as the original tables.

So we need to be careful if any of table is having set property  'Convert TIMESTAMP to BINARY'  to TRUE. In such case , we should reinitialize with snapshot method to avoid any issues.

 
Hope this article will help to avoid replication related issues due to timestamp column in your environment.


<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).


