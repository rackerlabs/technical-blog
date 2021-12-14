---
layout: post
title: "Introduction to Oracle Times Ten "
date: 2021-12-14
comments: true
author: Suryakanta Sahu
authorAvatar: 'https://secure.gravatar.com/avatar/bfb0463042a656ef9602cc40ffe9993c'
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
    - Database
metaTitle: "Introduction to Oracle Times Ten"
metaDescription: "Times Ten is an Oracle product with the potential to drastically enhance performance of the Oracle database."
ogTitle: "Introduction to Oracle Times Ten"
ogDescription: "Times Ten is an Oracle product with the potential to drastically enhance performance of the Oracle database."
slug: "introduction-to-oracle-times-ten "

---

Times Ten is an Oracle product with the potential to drastically enhance performance of the Oracle database.

<!--more-->

Besides being memory optimized, Times Ten also provides high throughput, ensures durability and provides the ability to scale. All the while providing minimal response times, especially for applications with critical reliance on performance. Unlike conventional databases, Times Ten provides for high efficiency, residing entirely in the RAM.

### TimesTen History

•	Invented at HP Labs in 1994

•	Embedded into HP’s Open Call solution

•	Spun off in 1996 as VC funded startup

•	Thousands of production customers

•	Acquired by Oracle Corporation in 2005

•	3 major releases since 2005: 6.0, 7.0, 11gR2,18c Release 1


### Overview of Oracle Timesten 

Oracle TimesTen In-Memory Database is an in-memory, relational database management system with persistence and high availability. Originally designed and implemented at Hewlett-Packard labs in Palo Alto, California, TimesTen spun out into a separate startup in 1996 and was acquired by Oracle Corporation in 2005.

Times Ten databases have high persistence and availability. It provides for very low latency and high throughput, being an in-memory database. Other features include standard relational database APIs like JDBC and ODBC. 
Times Ten can not only be used as a standalone in-memory database, but also provides the utility of being used as a cache in other relational databases, including the Oracle Database itself. It is often used in extremely high volume OLTP applications including financial trading and telecom billing.


### How TimesTen Stores Data on Disk

<img src=Picture1.png title="" alt="">

_Image source: http://luna-ext.di.fc.ul.pt/oracle11g/timesten.112/e14261/overview.htm_

Each TimesTen data store has exactly two checkpoint files. A checkpoint is called every 10 minutes by default; this writes the dirty memory pages to the first checkpoint file, and then the next checkpoint uses the other checkpoint file. Write transactions are placed in an in-memory buffer first, then flushed to the log files.  

### Two Types of Transactional Logging:

#### 1. Buffered Logging: 
_(SPEED: FAST, DURABILITY: GOOD)_ Transactions are saved to an in-memory log buffer first.  When the buffer fills, it is flushed to disk in the background.  The process is very fast (5000 TPS or more).  There is a small chance that transactions could be lost of a crash occurs before the buffer is flushed. The customer can configure the size of the log buffer.

#### 2.Durable Commit
_(SPEED: SLOW, DURABILITY: EXCELLENT)_ Every transaction is flushed to disk immediately. The speed of this depends on the speed of the disk device. Since every transaction is saved to disk, this is very durable.

The customer may switch from BUFFERED LOGGING to DURABLE COMMIT at any time by calling a SQL function called `ttDurableCommit().`  The customer can flexibly control the durability vs. performance at run-time, something that is not possible with a conventional RDBMS.

### Significant Response Time Improvement: In-Memory Database Cache + Oracle Database

<img src=Picture2.png title="" alt="">

_Image Source: https://www.oracle.com/technetwork/database/windows/ds-imdb-cache-1-129794.pdf_

The above graph shows the average transaction response time measured for each of the 7 transaction types. 

The red bars are the response time obtained when the data is cached in the TimesTen IMDB. It’s a huge improvement for the application database operation. Remember a good part of the response time on the Oracle database is due to the client-server connection and the network roundtrip, neither exists when the application links directly to the TimesTen database in memory.  Applications can also connect to TimesTen via TCP/IP client/server.

### Creating a TimesTen Database

#### Define a DSN

•	DataStore attribute: Specifies the directory name of the database’s checkpoint files		
	ex: `DataStore=/data/TTDEMO/TTDEMO-DSN1/TTDEMO-DSN1`


•	LogDir attribute: Specifies the directory name for transaction log files. The transaction log contains log records for each database update, commit, and rollback.

•	DatabaseCharacterSet attribute: Characterset in which data is stored Logically divided into two separate memory regions

•	Database Memory Regions
	
    - Permanent region 
    -   PermSize DSN attribute configures its allocated size.
     -  Region stores persistent database elements (ex: tables, indexes)
      - Region is written to disk during a checkpoint operation.
      - Temporary region 
      -TempSize DSN attribute configures its allocated size
      -Region stores transient data and information generated when executing statements.( temp tables, stored result sets..)
•	Database will be automatically created when the instance administrator connects to the database
      
                           $ttisql <DSN name>

•Ttisql utility connects to server DSN directly and ttIsqlCS utility connects to TimesTen client DSNs. 

                   $ttisql connStr "DSN=TTDEMO-DSN1;UID=timesten;pwd=timesten"

•	RAM Policy: Determines when the database is loaded into and unloaded from memory.

                 inUse: The database is in memory if it is in use (default policy). 
                always: The database is always kept resident in memory. 
                manual: The database is manually loaded into and unloaded from memory.



GitOps can enable an effective foundation for building Cloud Native applications.
The key principles of GitOps highlight the following benefits for organizations:

### In-Memory Database Cache

<img src=picture3.png title="" alt="">

_Image Source: https://www.oracle.com/database/technologies/timesten-cache.html_



#### •	Cache Oracle database tables in the application-tier
1.	Cache individual tables and related tables
2.	Cache all or subset of rows and columns
#### •	Read-only and updatable cache database
1.	Access cached tables like regular SQL database tables
2.	Joins/search, insert/update/delete
#### •	Automatic data synchronization
1.	TimesTen to Oracle
2.	Oracle to TimesTen

### Oracle IMDB Cache

•	_What is a Cache group?_
    
    A set of cached tables created in TimesTen database that correspond to tables in Oracle Database

•	_Read-Only Cache Group_

Read Operations are performed in TimesTen

Write Operations are passed through to Oracle and automatically refreshed to TimesTen

<img src=picture4.png title="" alt="">

_Image Source: https://docs.oracle.com/cd/E18283_01/timesten.112/e14261/cache.htm_


Cache Connect in Oracle enables the user to cache a subset of their Oracle database into TimesTen to provide better response time and throughput to the frequently accessed data. 

You can cache select full tables, subset of the rows, or subset of the columns. 
The cache can be read-only or updatable.
If the data is updated inside the TimesTen database, the updates are propagated to the Oracle database via synchronous write-through or asynchronous write-through.
You can have multiple cache instances caching from the same Oracle DB; each cache instance can have its own different set of cached content.


### IMDB Cache Administration & Best Practices

•	One time Cache Setup in both Oracle and TimesTen databases (per implementation doc)

•	Set Cache Agent Restart Policy: Manual, always, norestart

•	Specify AUTOREFRESH interval
- Creates INSERT, UPDATE, and DELETE triggers on the Oracle table(s) in the cache group
- The trigger inserts a small row into a logging table that TimesTen keeps in Oracle
- The TimesTen agent queries this table and refreshes the data in the interval you specify
•	Data Definition changes in Oracle will require LOAD, UNLOAD, FLUSH, REFRESH CACHE GROUPS

### Conclusion

TimesTen is an In-Memory Relational Database offering very low latency and extremely high throughput for SQL
operations while providing standard relational database functionality through standard APIs. It can be deployed as a
standalone database or as a high-performance relational cache for the Oracle Database.


<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/oracle">Learn about Rackspace Managed Oracle Applications.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).