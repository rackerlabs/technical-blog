---
layout: post
title: "Replication in PostgresSQL"
date: 2021-04-23
comments: true
author: Shailesh Kumar
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - Database
metaTitle: "Replication in PostgresSQL"
metaDescription: "This post helps you understand the different types of replication in
PostgreSQL&reg; and the necessary steps to implement streaming replication of a PostgreSQL
database."
ogTitle: "Replication in PostgresSQL"
ogDescription: "This post helps you understand the different types of replication in
PostgreSQL&reg; and the necessary steps to implement streaming replication of a PostgreSQL
database."
slug: "replication-in-postgresql"

---

With replication, you copy data from one database server, the *source*, to another server,
the *replica*. Replication is a powerful database feature, providing high availability and
supporting disaster recovery. 

<!--more-->

### Introduction

You can also create replica servers to use for testing and reporting purposes, reducing the
load on production Online Transactional Processing (OLTP) databases. This post helps you
understand the different types of replication in PostgreSQL&reg; and the necessary steps to
implement streaming replication of a PostgreSQL database.

### Replication details

Now, it's time to understand the replication modes, models, and types of replication in
PostgreSQL and learn about write-ahead logging.

#### Asynchronous and synchronous modes

The following diagram shows the modes of PostgreSQL replication:

{{<img src="Picture1.png" title="" alt="">}}

In **asynchronous** replication, the source server does not need to wait for
transaction-completion acknowledgment from the replica server. The replication transactions
queue up on the replica server, and the two servers can remain out-of-sync for a specified
time until the processing completes. 

In **synchronous** mode replication, the source server waits for acknowledgment from the
replica server, or servers, that each replication transaction is complete before proceeding.
Both source and replica servers must be available at all times. If it receives a
transaction-failed message from the replica, then the source server rolls back that
transaction. In this mode of replication,  source and replica servers are always in sync.
The drawback is that if a replica server goes down or can't complete a transaction, the
source server goes into a hung state.  

#### Single- and Multi-source replication models

With **Single-source** replication, you have only one source server and one or more
replica servers. The source sends the replication transactions to all replicas. 

The replica servers can accept changes only from the source server. If they do receive
changes from a non-source server, the replicas do not replicate those transactions back
to the source. 

In **Multi-source** replication, you have more than one source server. If a table row
changes on one source database, that source server replicates the changes to the counterpart
table rows on the other source servers. For this model to succeed, you need to employ
conflict resolution schemes to prevent duplicate primary keys and other issues.
 
#### Types of Replication

There are three types of replication:

- **Streaming Replication**: PostgreSQL made this type of replication available in version
  9 and later. Replicas are available for run-only select queries. The primary requirement
  for this type is the source and replica databases must be the same major version.
- **Cascading replication**: Introduced in PostgreSQL 9.2, his type of replication allows
  you to replicate from a standby server instead of directly from the source server. This
  can reduce the load on the source server. 
- **Logical replication**: You can use this type to replicate a selected data set or
  database object or to replicate between different major versions of PostgreSQL. In
  logical replication, you can use the standby server for writes, but it has some
  limitations. It cannot replicate Truncate, large objects like (lob, blob, clob ),
  sequences, schemas, and DDL.
 
#### Write-ahead logging

Before you start using streaming replication, you should understand write-ahead logging
(WAL) and how it works.

In PostgreSQL, the system first saves any changes made to a database in a log file before
saving them in a data file, and these changes are called WAL records. Every WAL record has
a unique number called a log sequence number (LSN).

With streaming replication in PostgreSQL, the replica database server uses the WAL file to
replicate changes on the source database server.

Three mandatory processes play a significant role in streaming replication on a PostgreSQL
database:

-  **WAL sender**
-  **WAL receiver**
-  **Startup**

A WAL sender process runs on the source server, whereas the WAL receiver and startup
processes run on the replica server. When you start the replication, the following events
occur:

1. A WAL receiver process sends the LSN until the replica replays the WAL data to the master.
2. The WAL sender process on the source then sends the WAL data to the replica until it
   reaches the latest LSN sent by the WAL receiver.
3. Next, the WAL receiver writes the WAL data sent by the WAL sender to WAL segments.
4. The startup process on the replica replays the data written to a WAL segment.
5. Finally, the streaming replication begins.

### Test case

Here are the steps to set up streaming replication in PostgreSQL between a source and one
replica:

#### Step one 

First, we need to ensure that both source and replica servers have passwordless SSH
authentication configured. If not, we need to configure it by using `ssh-keygen`.
 
To learn about passwordless SSH configuration, see
[https://linuxize.com/post/how-to-setup-passwordless-ssh-login/](https://linuxize.com/post/how-to-setup-passwordless-ssh-login/).

    Source node 192.168.24.28 
    Replica node 192.168.24.29
    Username `postgres` on both source and replica.
 
#### Step two

Run the following commands on both servers to stop the firewall:

    $ sudo systemctl stop firewalld
    $ sudo systemctl disable firewalld

#### Step three
 
1. On the source server, go to the data directory:

        cd /var/lib/pgsql/11/data
 
2. Edit the **postgresql.conf** file and make the following changes:

        archive_mode = on
        archive_command = ‘cp %p /var/lib/pgsql/archive/%f’
        max_wall_senders = 5
        wal_keep_segment =32
        wal_level = replica
        listen_addresses = ‘*’
 
3. Add the replica server IP address entry in **pg_hba.conf**:

        host    postgres         postgres         (ip_address)192.168.24.29/32 trust
        host    replication      postgres         (ip_address)192.168.24.29/32 trust

4. For every change in **pg_hba.conf**,  reload the service:

        $ /usr/local/pgsql_11/bin/pg_ctl -D /var/lib/pgsql/11/ reload

5. Create the **/var/lib/pgsql/archive/** archive directory if it doesn't exist.

6. Restart the server to reflect the changes.

#### Step four

On the replica server:

1. Go to the data directory and stop the service:

        $ /usr/pgsql-11/bin/pg_ctl -D /var/lib/pgsql/11/data/ stop

2. Remove everything from the data directory on the replica and try to connect to the source by using the following command:

        $ /usr/pgsql-11/bin/psql -h 192.168.24.28

3. If it works, start the base backup from the replica:

        $ cd /var/lib/pgsql/11/data
        $ /usr/pgsql-11/bin/pg_basebackup -D /var/lib/pgsql/11/data/ -X fetch -h 192.168.24.28 -R -P
 
These commands copy all data from the data directory of the source database to the replica
data directory and create the **recovery.conf** file.

#### Step five

After the base backup completes, you need to check for **recovery.conf** files. Any server
with a **recovery.conf** file in the data directory is a replica server and contains the
information of the source server. Make the following modifications:

    Standby_mode = ‘on’
    Primary_conninfo = ‘user=postgres host=192.168.24.28 port=5432’

The file should appear as follows:
 
    $ Vi recovery.conf
    Standby_mode = ‘on’
    Primary_conninfo = ‘user=postgres passfile=’’/home/postgres/.pgpass’’ host=192.168.24.28 port=5432 sslmode=disable sslcompression=0 target_session_attrs=any’
 
 <br/>
 
#### Step six

Now start the server and validate the changes:

1. Log in to the source:

        /usr/local/pgsql_11/bin/psql
        Postgres=# 
 
        Postgres=# Select * from pg_stat_replication;
 
        -[ RECORD 1 ]----+------------------------------
        pid              | 1934
        usesysid         | 26712
        usename          | postgres
        application_name | walreceiver
        client_addr      | 192.168.24.29
        client_hostname  |
        client_port      | 52143
        backend_start    | 2020-11-07 11:30:31.035614-05
        backend_xmin     |
        state            | streaming
        sent_lsn         | 0/50000E34
        write_lsn        | 0/50000E34
        flush_lsn        | 0/50000E34
        replay_lsn       | 0/50000E34
        write_lag        |
        flush_lag        |
        replay_lag       |
        sync_priority    | 0
        sync_state       | async
 
 
2. Log in to the replica:

        /usr/local/pgsql_11/bin/psql
        Postgres=# 
 
        Postgres=# Select * from pg_is_in_recovery();
        Pg_is_in_recovery
        ----------------------------------
        t
 
3. Check with an OS-level command from the source:

        $ ps -ef|grep sender 
 
        postgres  1934 
        1718  0 11:31 ?        00:00:00 postgres: wal sender process replicator 192.168.24.29(52143) streaming 0/50000E34
 

4. Check with an OS-level command from the replica:

        $ ps -ef|grep receiver
 
        postgres  1358 
        1748  0 11:31 ?        00:00:04 postgres: wal receiver process   streaming 0/50000E34
 
   The sender and receiver transactions should be the same, and the replica is always in
   read-only mode.
 
5. (optional) By default, replication is in asynchronous mode. To change to synchronous
   replication, go to the source server and make the following change to **postgresql.conf**:
 
        synchronous_standby_names=’*’ in 
        
   Then, restart the services:

        $ /usr/local/pgsql-11/bin/pg_ctl -D /var/lib/pgsql/11/ restart
 
### Conclusion

This post explains the types of replication and steps to set up streaming replication. You
commonly use this (especially in analytics) to provide a read-only replica to take the load
off the primary server.

It's also helpful if you need a high availability environment or to failover to a hot
standby server if the primary goes down.


<a class="cta teal" id="cta" href="https://www.rackspace.com/data/databases">Learn more about our Data services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Let's Talk** to [start the conversation](https://www.rackspace.com/).

