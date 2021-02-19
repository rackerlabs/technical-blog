---
layout: post
title: "Understanding Cache Fusion in RAC"
date: 2021-02-16
comments: true
author: Santosh Kumar Vempalli
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
    - database
metaTitle: "Understanding Cache Fusion in RAC"
metaDescription: "Cache Fusion, nothing but the transfer of blocks between two instances
in Oracle &reg; Real Application Clusters (RAC), is the main and most important feature in
RAC."
ogTitle: "Understanding Cache Fusion in RAC"
ogDescription: "Cache Fusion, nothing but the transfer of blocks between two instances in
Oracle &reg; Real Application Clusters (RAC), is the main and most important feature in RAC."
slug: "understanding-cache-fusion-in-rac"

---

Cache Fusion, nothing but the transfer of blocks between two instances in Oracle &reg; Real
Application Clusters (RAC), is the main and most important feature in RAC.

<!--more-->

### Introduction

According to Oracle in [Oracle RAC Cache Fusion](http://oracle-help.com/category/oracle-rac/page/5/),
each "instance [in a] RAC cluster [has] its own local buffer cache where it does cache
functionality. But when multiple users are connected to different nodes, [users often] need
to access or lock a data block owned by [another] instance.

"In such cases, [the] requesting instance requests a holding instance for that data block
and accesses it through [an] interconnect mechanism. This concept is known as *Cache Fusion*."

### Single instance 

Before exploring Cache Fusion, let's see how non-RAC databases behave when a data block
request happens.

Following is the four-step transaction process in a single instance (drawn from
[Gopi's Cache Fusion blog post](https://mgrvinod.wordpress.com/2011/03/22/cache-fusion/):

1) When a user reads a recently modified block, it might find an active transaction in the
   block.
2) The user will need to read the undo segment header to decide whether the transaction has
   been committed or not.
3) If the transaction is not committed, the process creates a consistent read (CR) version
   of the block in the buffer cache using the data in the block and the data stored in the
   undo segment.
4) If the undo segment shows the transaction is committed, the process has to revisit the
   block and clean out the block and generate the redo for the changes.

Now, let's see the same scenario in RAC with a two-instance cluster, known as Cache Fusion.

### Cache Fusion

[Gopi continues](https://mgrvinod.wordpress.com/2011/03/22/cache-fusion/), "In RAC, there
are  [two] or more instances accessing same database files [that are in same storage (such
as, ASM)]. Each instance has its own SGA, background processes, which means each instance
has its own buffer cache (local to each instance). These buffer [sic] cache's act
individually at [the] instance level and fuse together at [the] database level to form a
single entity (Global Cache) [to] share the data blocks between them. This is what we
called *Cache Fusion*. Cache Fusion uses a high-speed IPC interconnect to provide
cache-to-cache transfers of data blocks between instances in a cluster. This data-block
shipping eliminates the disk I/O and optimizes read/write concurrency."

This understanding brings us to the Global Cache Service (GCS), which is responsible for
block transfers between instances.

Following are the GCS background processes mentioned in
[Gopi's post](https://mgrvinod.wordpress.com/2011/03/22/cache-fusion/):

- Global Cache Service Processes (LMSn)
- Global Enqueue Service Daemon (LMD)

[Gopi goes on to say](https://mgrvinod.wordpress.com/2011/03/22/cache-fusion/), "Before
going into these background processes, [sic] lets see how Oracle treats the data blocks
and how it manages them.

"Oracle treats the data blocks as resources. Each of these resources can be held in
different modes, which is [an] important mechanism to maintain data integrity. These modes
are classified into [three] types depending on whether resource holder intends to modify
the data or read the data."

[Gopi lists the modes as follows](https://mgrvinod.wordpress.com/2011/03/22/cache-fusion/): 

- **Null (N) mode**: Null mode is usually held as a placeholder.
- **Shared (S) mode**: In this mode, a data block is not modified by another session but
  will allow concurrent shared access.
- **Exclusive (X) mode**: This level grants the holding process exclusive access. Other
  processes cannot write to the resource. It may have consistent read blocks.

#### Global Cache Service Daemon (LMSn)

When there is a request from an instance,
[Gopi tells us](https://mgrvinod.wordpress.com/2011/03/22/cache-fusion/), "GCS organizes
the block shipping to other instances by retaining block copies in memory. Each such copy
is called a past image (PI). [...] It is also possible to have more than [one] PI of the
data block depending on how many times the block was requested in [the] dirty stage."

**Note:** [Gopi adds](https://mgrvinod.wordpress.com/2011/03/22/cache-fusion/), "If you
want to read a data block, it must be read in [a] consistent state. You are not allowed to
read the changes made by others."

#### Global Enqueue Service Daemon (LMD)

[Gopi explains](https://mgrvinod.wordpress.com/2011/03/22/cache-fusion/), "The global
enqueue service (GES) tracks the status of all Oracle enqueuing mechanisms. The GES performs
concurrency control on dictionary cache locks, library cache locks, and transactions. It
performs this operation for resources that are accessed by more than one instance. The GES
controls access to data files and control files but not for the data blocks. "

Following are the GES managed resources that
[Gopi shares](https://mgrvinod.wordpress.com/2011/03/22/cache-fusion/):

- **Transaction locks**: It is acquired in the exclusive mode when a transaction initiates
  its change (insert, update, etc.) The lock is held until the transaction is committed or
  rolled back.
- **Library Cache locks**: When a database object (such as a table, view, package, package
  body, [...] and so on) is referenced during parsing or compiling of a SQL, DML or DDL,
  PL/SQL, or Java statement, the process parsing or compiling the statement acquires the
  library cache lock in the correct mode.
- **Dictionary Cache Locks**: Global enqueues are used in the cluster database mode. The
  data dictionary structure is the same for all Oracle instances in a cluster database.
- **Table locks**: These are the GES locks that protect the entire table(s). A transaction
  acquires a table lock when a table is modified. A table lock can be held in any of
  several modes: null (N), row share (RS), row exclusive (RX), share lock (S), share row
  exclusive (SRX), or exclusive (X).

### Past and consistent read images

Before going to the main scenario, we need to understand past images (PI) and consistent
read (CR) images.

#### Past image

Rohit Gupta, in his article, [Oracle RAC Cache Fusion
](http://www.dba-oracle.com/t_gupta_oracle_rac_cache_fusion.htm) shares, "The concept of
Past Image is very specific to RAC setup. Consider an instance holding [an] exclusive lock
on a data block for updates. If some other instance in the RAC needs the block, the holding
instance can send the block to the requesting instance (instead of writing it to disk) by
keeping a PI (Past Image) of the block in its buffer cache. Basically, PI is the copy of
the data block before the block is written to the disk."

#### Consistent read image:

[Gupta](http://www.dba-oracle.com/t_gupta_oracle_rac_cache_fusion.htm) continues, "A
consistent read is needed when a particular block is being accessed/modified by transaction
[A1], and at the same time another transaction [A2] tries to access/read the block. If
[A1] has not been committed, [A2] needs a consistent read [(non-modified block)] copy of
the block to move ahead. A CR copy is created using the UNDO data for that block."

### Cache Fusion scenarios

Cache Fusion has three different scenarios:

- Read-Read scenario
- Read-Write scenario
- Write-Write scenario

#### Read-Read scenario:

This is a non-critical scenario because the instance that requests a block and the instance
that blocks the request are both requesting read transactions. Here, no exclusive lock
occurs. Instance B requests a read block to GCS. GCS checks the availability of the block,
which is owned by instance A, and acquires a shared lock. Now GCS requests that Instance A
ship the requested block to Instance B.

#### Read-Write scenario:

This is a critical scenario.

Instance A is updating a data block, so it needs to acquire an exclusive lock. After some
time, Instance B sends a read request to GCS for the same data block.

GCS checks and finds that Instance has acquired an exclusive lock on the same block. So,
GCS asks Instance A to release the block. Now, Instance A creates a CR Image in its own
buffer cache and notifies GCS accordingly to ship it to Instance B.

GCS is involved in the CR image creation, and shipping it to the requested instance is
where Cache Fusion comes into play.

#### Write-Write scenario

Instance A and Instance B are both trying to acquire an exclusive lock on a data block.

Instance B sends a block request to GCS. GCS checks the availability and finds Instance A
has acquired a lock. Thus, GCS asks Instance A to release the block for Instance B. Now,
Instance A creates a PI of its own current block in its buffer, makes the redo entries,
and notifies GCS to ship the block to Instance B.

Instance B now uses the block and makes changes as usual.

### The main difference between CR and PI

[Gupta adds the following final thought about PI versus CR images](http://www.dba-oracle.com/t_gupta_oracle_rac_cache_fusion.htm):
"[The] CR image was shipped to avoid [a] Read-Write type of contention because the requesting
instance doesn't want to perform a write operation and hence won't need an exclusive lock
on the block. Thus for a read operation, the CR image of the block would suffice. Whereas
for Write-Write contention, the requesting instance also needs to acquire an exclusive lock
on the data block. [To] acquire the lock for write operations, it would need the actual
block and not the CR image. The holding instance hence sends the actual block but is
liable to keep the PI of the block until the block has been written to the disk. So, if
there is any instance failure or crash, Oracle is able to build the block using the PI
from across the RAC instances. Once the block is written to the disk, it won't need a
recovery in case of a crash, and hence associated PIs can be discarded."

<a class="cta teal" id="cta" href="https://www.rackspace.com/data">Learn more about our Data services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Let's Talk** to [start the conversation](https://www.rackspace.com/).

