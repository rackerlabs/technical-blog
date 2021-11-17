---
layout: post
title: "Memory Tuning in Oracle Database"
date: 2021-11-17
comments: true
author: Santosh Vempalli
authorAvatar: 'https://secure.gravatar.com/avatar/36b2f3cb34f32eb2f0d9069391b9d6c9'
bio: "I have been working as DBA from 9+ years. I am a senior consultant in our project and will act as trainee for new joiner. I will mainly focus on critical topics particularly basics which is related to new technologies so that we can gain 100% issue solving techniques. Basically i will deal with most of the APPS DBA concepts but according to the situation I will deal with core concepts as well."
published: true
authorIsRacker: true
categories:
    - Oracle
    - Database
metaTitle: "Memory Tuning in Oracle Database"
metaDescription: "As your organization adopts Cloud Native architectures, a
shift in mindset must take place. "
ogTitle: "Memory Tuning in Oracle Database"
ogDescription: "As your organization adopts Cloud Native architectures, a shift
in mindset must take place. "
slug: "memory-tuning-in-oracle-database"

---

Memory tuning distributes or reallocates the free memory to Oracle memory components. It is mainly used for performance tuning on Oracle queries.

<!--more-->

 Now a days, a major issue for every client is related to database performance. This blog explains how to tune memory in database which result in high performance in databases.
The following are the various kinds of memory tuning methods that are available: OS level process tuning, CPU tuning, RAM tuning, database tuning etc. In this blog I will be discussing about the memory tuning in databases.

### Database Memory Tuning: 

Memory Tuning for database is nothing but tuning System Global Area (SGA). Following are the major components list w.r.t SGA tuning. Let’s look at each of these components in detail: 
1)	Keep Pool
2)	Default Pool, Recycle Pool, Stream Pool
3)	DB Buffer Cache: Free buffers, modified buffers, pinned buffers
4)	Shared pool

<img src=Picture1.png title="" alt="">


### Keep Pool:

There are certain packages that are used daily. To increase the performance, you need to keep those packages in SGA. With the help of the procedure, you can keep that package in the keep pool.
If the space allocated to SGA is shutdown, then SGA has to reallocated to RAM, at that time even after keeping the package in the keep pool, it will be flushed off. Next time when you restart and execute that package, the package will remain in the keep pool until you shut down the database. By doing so we reduce the I/O's.

With the help of the hit rations, you can ensure that the parse code execution plans are flushing from library cache. The hit ratio for library cache should be > 85%.

_Stream Pool_ is used to create a buffer for data pump.
Daily, certain tables (small tables) are used to increase the performance. It is better to keep those tables in the SGA (Keep pool).
This will increase performance where you are not fetching the data from the disk, but from the memory itself. For large tables we have _recycle pool_


By default, whenever we select those tables (small tables) in form of blocks is fetched in data buffer cache and it will keep in _default pool_. This default pool gets flushed off once you select other tables. If you have space in the buffer then its fine, if not, then it will flush the previous tables to accommodate new tables.
To increase the performance, keep small tables in keep pool instead of _default pool_. The hit ratio for data buffer cache should be > 95%.
If it is less than 95% then we need to resize the database buffer cache.


The major part in memory tuning is Database buffer cache and shared pool, which is useful for maintaining the sufficient data in memory. Everyone needs to know the basic operations in Database buffer cache for SGA tuning. At the end of the blog, I will share some sample SQL queries examples to calculate hit ratio to tune the memory.
### Free Buffers

Modified data use fetched blocks and copies to data buffer cache before changing the image(data).    These buffers are called Free Buffers.
From the below image, the disk having value 1000 or the memory having value 1000 are the same. 
Below image shows Free buffer:   

<img src=Picture2.png title="" alt="">


### Modified Buffers

Modified buffers are also referred to as Dirty Buffers. The image in the disk and the image in data buffer cache of the data has been changed, but these buffers or data have not yet written to the disk. These buffers are called as Dirty Buffers.

The following image shows modified buffer:

<img src=Picture3.png title="" alt="">

### Pinned Buffers

The data in DB buffer cache will be changing every time. Server process will select these modified data for further transactions. These selected data is nothing but pinned data or buffer.

_Physical reads_: Oracle data blocks that oracle reads from the disk by performing I/O.

_Logical reads_: If Oracle can satisfy a request by reading the data from database buffer cache itself then it comes under logical reads.

_DB block Gets_: when the Oracle find the required data in the database buffer cache, then Oracle checks whether the data is committed or not, if committed then fetches from buffers. These buffers are also known as DB buffer gets.

_Consistent Reads_: In the database buffer cache, the blocks which are present, modified but not committed. Therefore, the data should be fetched from undo datafile.

<img src=Picture4.png title="" alt="">

The goal of db_buffer_cache is increasing the logical reads.

_Soft Parsing_: If we have execution plan already available in Library Cache, it won’t go to the disk, it will create a parse plan (parse code) from existing execution plan. This is called Soft Parse.

_Hard Parsing_: To create a parse code, it will check any execution plan is available, if execution plan is available then it goes with soft parse. If execution plan is not available, then it performs hard parse which means it goes to disk.

_Shared Pool_: Shared Pool is a combination of Library Cache and Data Dictionary Cache.

_Library Cache:_ The goal of Library Cache is to increase the soft parsing

### Methods to achieve goal:

1) Using bind variables

2) By writing stored procedures

3) Hit ratio (Should be > 85% if not increase the shared pool size)

4) DBMS_Shared_pool (package)
Hit ratio plays major role in tuning memory using SQL queries.

_Data Dictionary Cache_:
It is also called row cache. Data Dictionary Cache hit ratio must be >85%, if not increase the shared pool size.

#### Following are the Sample queries to calculate hit ratio.
`select (sum(pinhits)/sum(pins))*100 as lchitratio from v$librarycache;`

`select namespace, pins, pinhits, reloads from v$librarycache order by namespace;`

To get the package of dbms_Shared_pool please run `@$ORACLE_HOME/rdbms/admin/dbmspool.sql` 

`select namespace, kept, locks, executions from v$db_object_cache where type like '%PROC%';`

#### Data Dictionary Cache hit ratio:

`select (sum(gets-getmisses-fixed))/sun(gets) as "ddchitratio" from v$rowcache;`

#### Redo log Buffer Cache:

select name, value from `v$sysstat` where name like `'redo%';`

I hope you find the above discussed points useful and can now easily tune memory in database. 



<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).