---
layout: post
title: "Alternate archive destinations in Oracle"
date: 2021-05-14
comments: true
author: Jay Vardhan
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
    - Database
metaTitle: "Alternate archive destinations in Oracle"
metaDescription: "Archiving Oracle&reg; databases lets you retain and store data
for the long term, but what happens if you run out of space?"
ogTitle: "Alternate archive destinations in Oracle"
ogDescription: "Archiving Oracle&reg; databases lets you retain and store data
for the long term, but what happens if you run out of space?"
slug: "alternate-archive-destniations-in-oracle"

---

Archiving Oracle&reg; databases lets you retain and store data for the long term,
but what happens if you run out of space?

<!--more-->

### Introduction

If the archive destination fills up, your Oracle Database can hang or become
stuck, and you might see one of the following errors:

- **0RA-00257**: Archiver error, connect internal only until freed
- **ORA-16014**: Log 2 sequence# 1934 not archived, no available destinations

In this case, you need to have an alternate archiving destination to use when
the original archive destination fails. You can leverage the alternate archive
destination in the event of any failure (space, hardware, and so on) in the
primary archive destination.

Let's go through a quick demonstration to understand how it works.

### Demo part one

First, I set the primary archive destination to **/u03/primary_dest location**,
which is currently 99% utilized. You can do the same thing as a test.

Then, run the following commands:

    SQL> select version from v$instance;

    VERSION
    -----------------
    12.1.0.2.0

    SQL> select DEST_NAME,TARGET,DESTINATION,VALID_ROLE,STATUS 
    from v$archive_dest where status!='INACTIVE';

    DEST_NAME             TARGET     DESTINATION          VALID_ROLE   STATUS
    --------------------- ---------- -------------------- ------------ ---------
    LOG_ARCHIVE_DEST_1    PRIMARY    /u03/primary_dest     ALL_ROLES    VALID

### Demo part two

Let's add an alternate archive destination **/u04/alternate_dest**, which the
system can use if the primary destination is unavailable.

    SQL> !df -h /u04/alternate_dest
    Filesystem            Size  Used Avail Use% Mounted on
    /dev/ddg2            1004M   18M 
    936M   2% /u04

    SQL> alter system set log_archive_dest_2='LOCATION=/u04/alternate_dest' scope=both;

    System altered.

    SQL> alter system set log_archive_dest_state_2=ALTERNATE scope=both;

    System altered.

    SQL> select DEST_NAME,TARGET,DESTINATION,VALID_ROLE,STATUS,ALTERNATE from v$archive_dest where status!='INACTIVE';

    DEST_NAME           TARGET      DESTINATION         VALID_ROLE   STATUS      ALTERNATE
    ------------------- ----------- ------------------- ------------ ----------- ---------
    LOG_ARCHIVE_DEST_1   PRIMARY    /u03/primary_dest    ALL_ROLES    VALID      NONE
    LOG_ARCHIVE_DEST_2   PRIMARY    /u04/alternate_dest  ALL_ROLES    ALTERNATE  NONE

### Demo part three

You can link the primary and alternate archive destination, and Oracle can fail
over to an alternate archive location when the primary location reaches 100% usage.
However, Oracle cannot execute a failback to the primary destination after it is
available again. For that to work, you need to set the primary archive destination,
**LOG_ARCHIVE_DEST_1**, as the **ALTERNATE** for the alternate archive destination,
**LOG_ARCHIVE_DEST_2**, as shown in the following example:

    SQL> alter system set log_archive_dest_2='LOCATION=/u04/alternate_dest 
    NOREOPEN ALTERNATE=LOG_ARCHIVE_DEST_1' scope=both;

    System altered.

    SQL> alter system set log_archive_dest_1='LOCATION=/u03/primary_dest
    NOREOPEN ALTERNATE=LOG_ARCHIVE_DEST_2' scope=both;

    System altered.

    SQL> select DEST_NAME,TARGET,DESTINATION,VALID_ROLE,STATUS,ALTERNATE
    from v$archive_dest where status!='INACTIVE';

    DEST_NAME            TARGET      DESTINATION          VALID_ROLE   STATUS     ALTERNATE
    -------------------- ----------- -------------------- ------------ ---------- ------------------
    LOG_ARCHIVE_DEST_1   PRIMARY     /u03/primary_dest     ALL_ROLES    VALID     LOG_ARCHIVE_DEST_2
    LOG_ARCHIVE_DEST_2   PRIMARY     /u04/alternate_dest   ALL_ROLES    ALTERNATE LOG_ARCHIVE_DEST_1

You can check to confirm that you linked the archive destinations one and two.
Oracle should now be able to fail back to the primary after the primary has free
space.

### Demo part four

Next, I executed some DML's so that the archive destination hit 100% usage, as
shown in the following output:

    Thread 1 is advanced to log sequence 20 (LGWR switch)
      Current log# 2 seq# 20 mem# 0: /u01/app/oracle/oradata/MODI/redo02.log
    2020-12-05T04:44:29.216275+05:30
    ARC0: Encountered disk I/O error 19502
    2020-12-05T04:44:29.216575+05:30
    ARC0: Closing local archive destination LOG_ARCHIVE_DEST_1 '/u03/primary_dest/1_19_1058325294.dbf' (error 19502) (MODI)
    2020-12-05T04:44:29.217417+05:30
    Errors in file /u01/app/oracle/diag/rdbms/modi/MODI/trace/MODI_arc0_23015.trc:
    ORA-27072: File I/O error
    Additional information: 4
    Additional information: 350208
    Additional information: 446464
    ORA-19502: write error on file "/u03/primary_dest/1_19_1058325294.dbf", block number 350208 (block size=512)
    2020-12-05T04:44:32.583182+05:30
    MODIP(3):Resize operation completed for file# 11, old size 1172480K, new size 1182720K
    2020-12-05T04:44:33.183355+05:30
    Errors in file /u01/app/oracle/diag/rdbms/modi/MODI/trace/MODI_arc0_23015.trc:
    ORA-19502: write error on file "/u03/primary_dest/1_19_1058325294.dbf", block number 350208 (block size=512)
    ORA-27072: File I/O error
    Additional information: 4
    Additional information: 350208
    Additional information: 446464
    ORA-19502: write error on file "/u03/primary_dest/1_19_1058325294.dbf", block number 350208 (block size=512)

### Step five

Oracle always tries to archive to the primary destination, and the automatic
failback to the primary destination works in version 12c. After you clean up the
primary destination and make it available for archiving, Oracle continues to
rchiving the redo logs to the primary destination without reporting any errors
or failback message in the alert log file, as shown in the following example
where I queried **v$archived_log**:

SQL>  select thread#,sequence#,name from v$archive_log;

    THREAD#  SEQUENCE#  NAME
    -------- ---------- -----------------------------------------------
         1          2 /u03/primary_dest/1_2_1058325294.dbf
         1          3 /u03/primary_dest/1_3_1058325294.dbf
         1          4 /u03/primary_dest/1_4_1058325294.dbf
         1          5 /u03/primary_dest/1_5_1058325294.dbf
         1          6 /u04/alternate_dest/1_6_1058325294.dbf
         1          7 /u04/alternate_dest/1_7_1058325294.dbf
         1          8 /u04/alternate_dest/1_8_1058325294.dbf
         1          9 /u04/alternate_dest/1_9_1058325294.dbf
         1         10 /u04/alternate_dest/1_10_1058325294.dbf
         1         11 /u04/alternate_dest/1_11_1058325294.dbf
         1         12 /u04/alternate_dest/1_12_1058325294.dbf
         1         13 /u04/alternate_dest/1_13_1058325294.dbf
         1         14 /u04/alternate_dest/1_14_1058325294.dbf
         1         15 /u04/alternate_dest/1_15_1058325294.dbf
         1         16 /u04/alternate_dest/1_16_1058325294.dbf
         1         17 /u04/alternate_dest/1_17_1058325294.dbf
         1         18 /u04/alternate_dest/1_18_1058325294.dbf
         1         19 /u04/alternate_dest/1_19_1058325294.dbf
         1         20 /u04/alternate_dest/1_20_1058325294.dbf
         1         21 /u04/alternate_dest/1_21_1058325294.dbf
         1         22 /u04/alternate_dest/1_22_1058325294.dbf
         1         23 /u04/alternate_dest/1_23_1058325294.dbf
         1         24 /u04/alternate_dest/1_24_1058325294.dbf
         1         25 /u04/alternate_dest/1_25_1058325294.dbf
         1         26 /u04/alternate_dest/1_26_1058325294.dbf
         1         27 /u04/alternate_dest/1_27_1058325294.dbf
         1         28 /u04/alternate_dest/1_28_1058325294.dbf
         1         29 /u03/primary_dest/1_29_1058325294.dbf
         1         30 /u03/primary_dest/1_30_1058325294.dbf
         1         31 /u03/primary_dest/1_31_1058325294.dbf
         1         32 /u03/primary_dest/1_32_1058325294.dbf

31 rows selected.

### Conclusion

Oracle has made a significant improvement in the automatic management of archive
destination switching between the primary and alternate destination.  Hopefully,
you can use my demonstration to take advantage of this functionality.

Having an alternate archive serves you well, but remember that Oracle
intermittently logs error messages in the alert log file about the primary
destination failure until the primary archive destination is ready again.

<a class="cta blue" id="cta" href="https://www.rackspace.com/data/databases">Learn more about our data services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Let's Talk** to [start the conversation](https://www.rackspace.com/).
