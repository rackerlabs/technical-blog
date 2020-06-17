---
layout: post
title: "Back up and restore a Vertica database"
date: 2020-06-18 00:01
comments: true
author: Hemant Sharma
published: true
authorIsRacker: true
authorAvatar: 'https://s.gravatar.com/avatar/62a512ada4789514ddecc061e501be64'
bio: "I am a Sr. Database Administrator with many years of experience as a DBA in
the IT industry. I share my knowledge about the latest database technologies via my
blog in a simple and effective way."
categories:
    - Database
metaTitle: "Back up and restore a Vertica database"
metaDescription: "To ensure that you can recover data in the event of data
corruption or accidental deletion, make database backups a routine maintenance
activity. This post explores Vertica&reg; database backup and restoration."
ogTitle: "Back up and restore a Vertica database"
ogDescription: "To ensure that you can recover data in the event of data
corruption or accidental deletion, make database backups a routine maintenance
activity. This post explores Vertica&reg; database backup and restoration."
---

To ensure that you can recover data in the event of data corruption or accidental
deletion, make database backups a routine maintenance activity. This post explores
Vertica&reg; database backup and restoration.

<!-- more -->

### Introduction

Vertica, an analytic database management system, is a columnar-storage platform
designed to handle large volumes of data, enabling fast query performance in
traditionally resource-intensive scenarios.

Vertica offers the following advantages:

- Improves query performance over traditional database relational database management systems.
- Provides high availability.
- Provides petabyte scalability on commodity enterprise servers.

The database backup and recovery mechanism reduces the downtime during maintenance and disaster recovery.

### Back up and restore a database

With Vertica, you can create hot backups, incremental copies with an indefinite
number of restore points, and backups of an entire database or a subset (schemas,
tables, and so on) of the database. The following backup levels are available:

-  **Full level**: This level ensures that you can back up and restore the full Vertica database.
-  **Incremental level**: This level is a subsequent backup that consists of only new or changed data.
-  **Object-level**: This level is the backup of an object for restoration.

Vertica offers the flexibility and levels of granularity to restore specific
objects (such as schemas and tables) from a full backup.

#### Snapshots

Database snapshots capture a consistent image of all the objects and data in the
database. You can select a subset of database objects to include in an
object-level snapshot, which contains associated data in the database at the
time of the snapshot and other objects in the dependency graph. You can name
your snapshot as you like (for example: snap, objectsnap1, fullsnap, and so on).

#### Backup location

The backup location is the directory on a backup host where you save snapshots
and their associated archives. Because the snapshots are compatible, you can use
any object snapshot from the same backup location after you restore a database
from a full database snapshot. All snapshots in the same backup location share
data files through hard links.

#### Hard-link backups

Vertica provides low cost and space-efficient copies (*hard-link local backups*)
of the database backups in the local cluster infrastructure. You can retrieve
these backups faster because the system does not copy the user data to an external
backup environment. Vertica copies only the catalog data and initiates
Linux&reg;-based hard links within the file system.

![]({% asset_path 2020-06-18-back-up-and-restore-a-vertica-database/Picture1.png %})

*Image source*: https://www.vertica.com/wp-content/uploads/2016/04/sidestep1.png

These backups share the same set of storage blocks, and each backup tracks their
point-in-time copy. The system doesn't store the same content in multiple
locations.

### Backup and restoration process flow

The backup and restoration flow consists of the following steps:

1. Select the snapshot type, such as full, incremental, or object-level backup.
2. Create a configuration file by using the Vertica Backup and Recovery tool.
3. Initialize a backup location to store the backup files.
4. Take a backup by using the configuration file.
5. Verify the backups in the backup location.
6. Restore the full database or database objects on similar or different Vertica clusters.

![]({% asset_path 2020-06-18-back-up-and-restore-a-vertica-database/Picture2.png %})

*Image source*: https://www.vertica.com/kb/Copy-and-Restore-Data-from-a-Vertica-Cluster-to-a-Backup/Content/BestPractices/Copy-and-Restore-Data-from-a-Vertica-Cluster-to-a-Backup.htm


#### Generate a configuration file

The **vbr.py** utility creates a configuration file with the information Vertica
requires to back up and restore full, incremental, or object-level snapshots.
You cannot back up or restore databases or objects without a configuration file,
and no default file exists.

You can create as many backup configuration files as you need (such as full or
incremental, object or schema-specific, or location-specific files).

##### Full backup configuration file

The following steps help in creating a configuration file to take the full
database backup.

    $ vbr.py --setupconfig
    Snapshot name (backup_snapshot): full_bkp_snap
    Backup vertica configurations? (n) [y/n]: y
    Number of restore points (1):
    Specify objects (no default):
    Vertica user name (dbadmin): dbadmin
    Save password to avoid runtime prompt? (n) [y/n]: n
    Node v_testdb_node0001
    Backup host name (no default): v_testdb_node0001
    Backup directory (no default): /vert_backup/backup
    Node v_testdb_node0002
    Backup host name (no default): v_testdb_node0002
    Backup directory (no default): /vert_backup/backup
    Node v_testdb_node0003
    Backup host name (no default): v_testdb_node0003
    Backup directory (no default): /vert_backup/backup
    Config file name (full_bkp_snap.ini): /vert_backup/backup_conf/full_bkp_snap.ini
    Change advanced settings? (n) [y/n]: n
    Saved vbr configuration to /vert_backup/backup_conf/full_bkp_snap.ini.

##### Object-specific backup configuration file

Perform the following steps to create an object-specific configuration file:

1. List the objects in the database and choose which ones to use. The following
   objects are present in our Vertica database:
 
                 List of tables
         Schema | Name  | Kind  |  Owner  | Comment
        --------+-------+-------+---------+---------
         public | tab1  | table | dbadmin |
         public | tab2  | table | dbadmin |
         public | tab3  | table | dbadmin |
         (3 rows)

2. Run the following command to create a configuration file to take a backup of the **public.tab1** table:

        $ vbr.py --setupconfig
        Snapshot name (backup_snapshot): tab1_bkp_snap
        Backup vertica configurations? (n) [y/n]: n
        Number of restore points (1):
        Specify objects (no default): public.tab1
        Vertica user name (dbadmin): dbadmin
        Save password to avoid runtime prompt? (n) [y/n]: n
        Node v_testdb_node0001
        Backup host name (no default): v_testdb_node0001
        Backup directory (no default): /vert_backup/backup
        Node v_testdb_node0002
        Backup host name (no default): v_testdb_node0002
        Backup directory (no default): /vert_backup/backup
        Node v_testdb_node0003
        Backup host name (no default): v_testdb_node0003
        Backup directory (no default): /vert_backup/backup
        Config file name (tab1_bkp_snap.ini): /vert_backup/backup_conf/tab1_bkp_snap.ini
        Change advanced settings? (n) [y/n]: n
        Saved vbr configuration to /vert_backup/backup_conf/tab1_bkp_snap.ini.

3. Run the following commands to list the created backup configuration files:

        $ cd /vert_backup/backup_conf/
        $ ls -la
        total 20
        drwxr-xr-x. 2 dbadmin dbadmin 4096 Jan 20 14:21 .
        -rw-rw-r--. 1 dbadmin dbadmin  488 Jan 20 14:21 tab1_bkp_snap.ini
        -rw-rw-r--. 1 dbadmin dbadmin  475 Jan 20 14:04 full_bkp_snap.ini

#### Initialize the backup location

To initialize the backup locations for full and object-level backups on the
source cluster, run the following `init` statements:

    $ /opt/vertica/bin/vbr.py -t init --config-file full_bkp_snap.ini
    $ /opt/vertica/bin/vbr.py -t init --config-file tab1_bkp_snap.ini

#### Take a backup

Take either a full database or an object-level backup.

##### Full database backup

Take full database backup by using the previously created configuration file,
**full_bkp_snap.ini**:

    $ vbr.py --task backup --config-file full_bkp_snap.ini
    Please input vertica password:
    pparing...
    Found Database port:  5433
    Copying...
    348900 out of 348900, 100%
    All child processes terminated successfully.
    Committing changes on all backup sites...
    backup done!

##### Single object backup

Use the configuration file, **tab1_bkp_snap.ini**, to take an object-level backup:

    $ vbr.py --task backup --config-file tab1_bkp_snap.ini
    Please input vertica password:
    pparing...
    Found Database port:  5433
    Copying...
    78920 out of 78920, 100%
    All child processes terminated successfully.
    Committing changes on all backup sites...
    backup done!

#### Verify the backup location

Run the following commands to verify the backup location:

    $ cd vert_backup/
    $ ls -la
    total 16
    drwxr-xr-x.  4 dbadmin dbadmin 4096 Jan 20 13:40 .
    dr-xr-xr-x. 28 root    root    4096 Jan 20 13:53 ..
    drwxr-xr-x.  5 dbadmin dbadmin 4096 Jan 20 15:22 backup
    drwxr-xr-x.  2 dbadmin dbadmin 4096 Jan 20 15:29 backup_conf
    $ cd backup/
    $ ll
    total 12
    drwxrwxr-x. 8 dbadmin dbadmin 4096 Jan 20 15:29 v_testdb_node0001
    drwxrwxr-x. 8 dbadmin dbadmin 4096 Jan 20 15:29 v_testdb_node0002
    drwxrwxr-x. 8 dbadmin dbadmin 4096 Jan 20 15:29 v_testdb_node0003
    $ cd v_testdb_node0001/
    $ ll
    total 12
    drwx------. 3 dbadmin dbadmin 4096 Jan 20 15:29 tab1_bkp_snap
    drwx------. 3 dbadmin dbadmin 4096 Jan 20 15:22 full_bkp_snap

#### Restore the backup

Restore either the full or object-level backup.

##### Restore from a full-database backup

**Note**:  The database must be down to restore the full backup.

Use the following steps to perform a full-database restore:

1. Drop all the objects in your database and restore them with the recently created backup:

        cluster=&gt; dt
                       List of tables
         Schema | Name  | Kind  |  Owner  | Comment
        --------+-------+-------+---------+---------
         public | tab1  | table | dbadmin |
         public | tab2  | table | dbadmin |
         public | tab3  | table | dbadmin |
        (3 rows)

        cluster=&gt; drop table tab1,tab2,tab3;
        DROP TABLE
        cluster=&gt; dt
        No relations found.

2. With the database down, restore the database by using the full backup:

        $ vbr.py --task restore --config-file full_bkp_snap.ini
        Please input vertica password:
        Preparing...
        Found Database port:  5433
        Copying...
        248556 out of 248556, 100%
        All child processes terminated successfully.
        restore done!

3. Start the database and check whether the object restoration succeeded. The
   following example shows that the restore succeeded:

        cluster=&gt; dt
                       List of tables
         Schema | Name  | Kind  |  Owner  | Comment
        --------+-------+-------+---------+---------
         public | tab1  | table | dbadmin |
         public | tab2  | table | dbadmin |
         public | tab3  | table | dbadmin |
        (3 rows)

##### Restore an object-level backup

**Note**: The database must be up and running for an object-level restore.

To restore an object, you need to use an existing object-level backup. The
following code drops **tab1** in preparation for restoration:

    cluster=&gt; drop table tab1;
    DROP TABLE
    cluster=&gt; dt
             List of tables
    Schema | Name  | Kind  |  Owner  | Comment
    -------+-------+-------+---------+---------
    public | tab2  | table | dbadmin |
    public | tab3  | table | dbadmin |
    (2 rows)


Perform the following steps to restore an object from an object-level backup:

1. Restore the object:

        $ vbr.py --task restore --config-file tab1_bkp_snap.ini
        Please input vertica password:xxxxxxxx
        Preparing...
        Found Database port:  5433
        Copying...
         out of , 100%
        All child processes terminated successfully.
        Copying...
        2970 out of 2970, 100%
        All child processes terminated successfully.
        restore done!

2. Check whether the object restoration succeeded. The following example shows
   a successful restoration of **public.tab1** from the object-level backup:

        $ vsql
        Password:xxxxxxx

        dbadmin=&gt; dt
               List of tables
         Schema | Name  | Kind  |  Owner  | Comment
        --------+-------+-------+---------+---------
         public | tab1  | table | dbadmin |
         public | tab2  | table | dbadmin |
         public | tab3  | table | dbadmin |
        (3 rows)

        dbadmin=&gt; d tab1 ;
                                    List of Fields by Tables
         Schema | Table | Column |     Type     | Size | Default | Not Null | Primary Key | Foreign Key
        --------+-------+--------+--------------+------+---------+----------+-------------+-------------
         public | tab1  | col1   | numeric(3,)  |    8 |         | f        | f           |

### Conclusion

This post highlights the logic behind the Vertica database backup and recovery
process. It also provides the steps to back up and restore a Vertica database at
various levels, such as full, incremental, and object-level.

<a class="cta blue" id="cta" href="https://www.rackspace.com/dba-services">Learn more about Databases.</a>

Visit [www.rackspace.com](https://www.rackspace.com) and click **Sales Chat**
to start a conversation.

Use the Feedback tab to make any comments or ask questions.
