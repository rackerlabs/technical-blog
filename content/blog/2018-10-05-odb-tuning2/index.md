---
layout: post
title: "New performance-tuning features of Oracle Database 12c Release 12.1.0.0: Part 2"
date: 2018-10-05
comments: true
author: Virat Choudhary
published: true
authorIsRacker: true
categories:
  - Oracle
  - database
---

Originally published by TriCore: April 12, 2017

This two-part blog post series covers new performance-tuning features in
Oracle&reg; Database. [Part
1](https://developer.rackspace.com/blog/odb-tuning1/) discussed Oracle
Database version 12.1.0.1. This
follow-up post covers version 12.1.0.2.

<!--more-->

### Introduction to In-Memory column store

In-Memory column store (IM column store) is an optional area of the System
Global Area (SGA) that stores copies of tables, partitions, and other database
objects in a columnar format that's optimized for rapid scans. IM column store
accelerates database performance of analytics, data warehousing, and online
transaction processing (OLTP) applications.

### How IM column store works

IM column store stores copies of database objects in the SGA. It doesn't
replace the database buffer cache. Both memory areas can store the same data
in different formats. Rows stored in the IM column store are divided into
large memory regions in a columnar format. A column resides separately in a
contiguous area of memory within each region.

You can enable the IM column store for any of the following database objects:

- Tables
- Materialized views
- Partitions
- Tablespaces

You can either store all of a table's columns in the IM column store, or just a
subset of them. Similarly, for a partitioned table, you can either store all
of the table's partitions, or only a subset of them. If you enable the IM
column store at the tablespace level, Oracle Database automatically enables
all of the tables and materialized views in the tablespaces for the IM column
store.

### Performance benefits of using IM column store

Storing database objects in memory instead of on disk enables Oracle
Database to perform scans, queries, joins, and aggregates much faster. The IM
column store can boost performance when performing the following tasks:

- Scanning a large number of rows and using filters
- Querying a small subset of a large set of columns
- Joining a small table to a large table, particularly when the join conditions
  filter most of the rows
- Aggregating data in a query

IM column store also enhances the performance of data manipulation language
(DML) statements. OLTP systems typically require many indexes to be created on
commonly-accessed columns. These indexes might have a negative impact on the
performance of DML statements. Storing a database object in the IM column
store makes these indexes unnecessary because scans run much faster.
Eliminating the unnecessary indexes improves the performance of DML statements
because fewer indexes have to be updated.

![A diagram of In-Memory column store and
RAC](picture1.png)

**Image source**: [Oracle Learning Library YouTube videos: Oracle Database 12c
demos: In-Memory Column Store Architecture
Overview](https://www.youtube.com/watch?v=fMW2-TDheec)

**Estimating the required size of the IM column store**

The IM column store supports the following compression methods:

| **Compression method** | **Order of compression of in-memory data** | **Comparison of compression of In-Memory data** |
|-------------------------------|----------------------------------------|---------------------------------------------|
| NO MEMCOMPRESS | 1 | NIL |
| MEMCOMPRESS FOR DML | 2 (least compression) | B<all |
| MEMCOMPRESS FOR QUERY LOW | 3 |  B<C<D |
| MEMCOMPRESS FOR QUERY HIGH | 4 | C<D<E |
| MEMCOMPRESS FOR CAPACITY LOW | 5 | D<E<F |
| MEMCOMPRESS FOR CAPACITY HIGH | 6 (high compression) | all<F |

<br />
The following example shows how to enable the `oe.product_information` table
for the IM column store and specifies the compression method `MEMCOMPRESS FOR
CAPACITY HIGH`:

    SQL>ALTER TABLE oe.product_information INMEMORY MEMCOMPRESS FOR CAPACITY HIGH;

### Sizing the IM column store

After you determine the memory required to store database objects in the IM
column store, you can set its size by using the `INMEMORY_SIZE` initialization
parameter.

Use the following steps to set the size of the IM column store:

1. Set the `INMEMORY_SIZE` initialization parameter to the required size.

    The default value for this parameter is `0`, which means that the IM column
    store is not used. To enable the IM column store, set this parameter to a
    nonzero value.

    In a multitenant environment, you can specify the size of the IM column
    store for each pluggable database (PDB) by setting this parameter per PDB.
    The sum of the values for the PDBs does not have to equal the value for the
    container database (CDB), and may be greater than it.

2. After you set the size of the IM column store, you have to restart your
   database instance to enable it to store the database objects.

    The following example shows how to set the size of the IM column store to
    100 GB:

        ALTER SYSTEM SET INMEMORY_SIZE = 100G;

### Manageability support for IM column store

The SQL Monitor Report, Active Session History (ASH) Report, and
Automatic Workload Repository (AWR) Report now show statistics for various
in-memory operations.

### Database caching modes

There are two database caching modes:

- The default database caching mode that previous versions of Oracle Database
  use
- The force full database caching mode that's new to Oracle Database 12c
  Release 1 (12.1.0.2)

#### Default database caching mode

By default, Oracle Database uses the default database caching mode when it
performs full table scans.

If the Oracle Database instance determines that there's enough space to cache
the full database in the buffer cache and that it's beneficial to do
so, then the instance automatically caches the full database in the buffer
cache.

If the instance determines that there isn't enough space to
cache the full database in the buffer cache, it takes the following actions:

- **Smaller tables that are less than two percent of the buffer cache size**:
  Loads these tables into memory.
- **Medium-sized tables**: Analyzes the interval between the last table scan
  and the aging timestamp of the buffer cache. If the size of the table that was reused in the last table scan is greater than the remaining buffer cache size, caches the table.
- **Large tables**: Does not load these into memory unless you explicitly
  declare the table for the `KEEP` buffer pool.

#### Force full database caching mode

Force full database caching mode enables you to cache the entire database in
memory, which might provide substantial performance improvements when
performing full table scans or accessing large objects (LOBs).

In default caching mode, Oracle Database doesn't always cache the underlying
data when a user queries a large table. In force full database caching mode,
Oracle Database assumes that the buffer cache is large enough to cache the
full database and tries to cache all of the blocks that queries access. It
succeeds when the size of the database is smaller than the database buffer
cache size.

Oracle Database loads all data files into the buffer cache as they're
accessed, including NOCACHE LOBs and LOBs that use Oracle Database SecureFiles.

![A simple flow chart illustration that shows how FULL database caching and
Force FULL database caching are
used](picture2.png)

**Image source**: [Full DB In-Memory
Caching.](https://www.youtube.com/watch?v=jLtdDPmb1Ws)

##### When to use force full database caching mode

Consider using force full database caching mode in the following situations:

- The logical database size (or actual used space) is smaller than the
  individual buffer cache of each database instance in an Oracle Real
  Application Clusters (RAC) environment. This recommendation also applies to
  non-Oracle RAC databases.
- The logical database size is smaller than 80% of the combined buffer cache
  sizes of all of the database instances for well-partitioned workloads (by
  instance access) in an Oracle RAC environment.
- The database uses `SGA_TARGET` or `MEMORY_TARGET`.
- The `NOCACHE` LOBs need to be cached. The `NOCACHE` LOBs are never cached
  unless force full database caching is used.

In the first three situations, you should monitor system performance
periodically to verify that the performance indicators meet your expectations.

**Note**:  When one Oracle RAC database instance uses force full database
caching mode, then all of the other database instances in the Oracle RAC
environment also use this mode. In a multitenant environment, force full
database caching mode applies to the entire CDB, including all of its PDBs.

#### Set up and verify the database caching mode

First, check the database and memory size. You can exclude `SYSAUX` tablespace,
as shown in the following example:

```
SQL> col size_mb format 9999
SQL> SELECT sum(bytes)/1024/1024 seg_size_mb FROM dba_segments where tablespace_name != 'SYSAUX';
SEG_SIZE_MB
-----------
4971
```

Use the following command to check the size of the buffer cache:

```
SQL> SELECT round(sum(cnum_set * blk_size)/1024/1024) size_mb FROM X$KCBWDS;
SIZE_MB
-------
5283
```

Use the following steps to configure your database for force full database
caching:

```
SQL> startup mount;
Database mounted.

SQL> ALTER DATABASE FORCE FULL DATABASE CACHING;
Database altered.

SQL> SELECT force_full_db_caching FROM v$database;
FOR
---
YES

SQL> alter database open;
Database altered.
```

Use the following steps to verify that force full database caching mode is
enabled:

1. Use the following command to query the `V$DATABASE` view:

        SQL>SELECT FORCE_FULL_DB_CACHING FROM V$DATABASE;

    The output is either `YES` or `NO`.

2. To enable force full database caching mode, use the following `ALTER
   DATABASE` command:

        ALTER DATABASE FORCE FULL DATABASE CACHING;

    The command returns the following confirmation:

        Database altered.

3. To disable force full database caching, use the following command:

        SQL> ALTER DATABASE NO FORCE FULL DATABASE CACHING;

    The command returns the following confirmation:

        Database altered.

### Conclusion

In summary, IM column store reduces the execution time for DML statements, and
force full database caching mode offers significant performance improvements.
For more information on Oracle Database's new performance-tuning features,
check out the reports that Oracle Enterprise Manager (OEM) provides.

Use the Feedback tab to make any comments or ask questions.

### References

The following sources were used as references for this blog post:

- [Database Performance Tuning Guide: Performance Benefits of Using the In-Memory Column Store](https://docs.oracle.com/database/121/TGDBA/tune_sga.htm#TGDBA95380)

- [Full DB In-Memory Caching](https://www.youtube.com/watch?v=jLtdDPmb1Ws)

- [Oracle Database 12c demos: In-Memory Column Store Architecture Overview](https://www.youtube.com/watch?v=fMW2-TDheec)
