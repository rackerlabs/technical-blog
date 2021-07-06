---
layout: post
title: "Upgrade Oracle 11 to 19c for Windows&mdash;Part Two"
date: 2021-07-07
comments: true
author: Pradeep Rai
authorAvatar: 'https://s.gravatar.com/avatar/3bb999276b2817f44c8be712ff7f36ab'
bio: "I am currently an Oracle DBA with 18 years of experience and am well
versed with the Oracle technologies. I am also looking into cloud database
infrastructure. I also have experience with other than Oracle databases
such as Mongo dB and Cassandra."
published: true
authorIsRacker: true
categories:
    - Database
    - Oracle
metaTitle: "Upgrade Oracle 11 to 19c for Windows&mdash;Part Two"
metaDescription: "In this two-part blog post series, I cover installing and upgrading version 19c."
ogTitle: "Upgrade Oracle 11 to 19c for Windows&mdash;Part Two"
ogDescription: "In this two-part blog post series, I cover installing and upgrading version 19c."
slug: "upgrade-oracle-11-to-19c-for-windows-part-two"

---

Oracle&reg; 19c Database is the latest release of a widely adopted automation
database in the market and enterprises. Stability is an important element of the
Oracle Database 19c component of the Oracle Database 12c (Release 12.2) family of
products. In this two-part blog post series, I cover installing and upgrading version 19c.

<!--more-->

### Introduction

This part of the two-part series focuses on upgrading Oracle Database from
11.2.0.4 to 19c in Windows&reg;. This manual method does not use the
Database Upgrade Assistant (DBUA).

For installation steps, refer to
[Part One of this series](https://docs.rackspace.com/blog/install-oracle-19c-for-windows-part-one/).
I installed binaries on my 19c Oracle home directory,
**ORACLE_HOME=d:\app\product\19.0.0\dbhome_1**.

Use the following steps to upgrade Oracle Database to 19c:

**Note**: You should have a valid backup before upgrading in case something goes
wrong during the upgrade process.

### Step 1: Stage the installation file

Stage the 19.3 Relational Database Management System (RDBMS) install file so you
can proceed with the upgrade.

### Step 2: Pre-upgrade steps

Run the following steps to complete the pre-upgrade process:

##### Step 2.0: Preparation

1. Download the Oracle Database Pre-Upgrade Utility by using
   [metalink note 884522.1](https://support.oracle.com/knowledge/Oracle%20Database%20Products/884522_1.html).
   To run the pre-upgrade tool, run the following code:

    set ORACLE_HOME=d:\app\product\11.2.0.4\dbhome_1
    set ORACLE_BASE=d:\app
    set ORACLE_SID=ABC
    set PATH=%ORACLE_HOME%\bin;%PATH%
    %ORACLE_HOME%\jdk\bin\java -jar <top_dir>\preupgrade.jar TERMINAL TEXT -u sys -p <sys_password>

2. Check the output in **d:\app\cfgtoollogs\ABC\preupgrade\preupgrade.txt**,
   review the pre-upgrade log file and fix any errors.

3. You can run the pre-upgrade fixups script for all the parts with *AUTOFIXUP*
   in the logs.  For example, to run
   **d:\app\cfgtoologs\ABC\preupgrade\preupgrade_fixups.sql**, execute the
   following code:

    cd d:\
    cd d:\app\cfgtoollogs\ABC\preupgrade
    sqlplus sys/<password> as sysdba @preupgrade_fixups.sql

4. Review the output from the **preupgrade_fixups.sql** and perform any remaining
   manual steps.

##### Step 2.1: Back up  pfile

Run the following command to take backup of **pfile**:

    SQL> create pfile='d:\app\init_ABC.ora' from spfile;

##### Step 2.2: Remove invalid objects

Run the **utlrp.sql** script from SQL Plus to compile invalid objects. Make sure
no invalid objects remain in **sys/system schema**. Save all other invalid
objects in a separate table to match during the post-upgrade steps later on.

    SQL>@?/rdbms/admin/utlrp.sql
    SQL> create table system.invalids_before_upgrade as select * From dba_invalid_objects;

##### Step 2.3: Remove the EM repository

Remove the EM repository by using the following steps:

Copy the **emremove.sql** script from 19c home to 11 g home:

    copy d:\app\product\19.0.0\dbhome_1\rdbms\admin\emremove.sql  d:\app\product\11.2.0.4\dbhome_1\rdbms\admin
    cd d:\app\product\11.2.0.4\dbhome_1\rdbms\admin
    sqlplus sys/<password> as sysdba
    SET ECHO ON;
    SET SERVEROUTPUT ON;
    @emremove.sql  

##### Step 2.4: Remove the OLAP catalog

Remove OLAP catalog by using the following steps:

    cd d:\app\product\11.2.0.4\dbhome_1\olap\admin\
    sqlplus sys/<password> as sysdba @catnoamd.sql

##### Step 2.5: Remove APEX

If you are not using Application Express (APEX), you can remove it by running
the following commands:

    cd d:\app\product\11.2.0.4\dbhome_1\apex
    sqlplus sys/<password> as sysdba @apxremov.sql
    drop package htmldb_system;
    drop public synonym htmldb_system;

##### Step 2.6: Purge the RECYCLEBIN

Purge the DBA RECYCLEBIN by using the following command:

    PURGE DBA_RECYCLEBIN;

##### Step 2.7: Collect Dictionary statistics

Gather Dictionary stats by using the following command:

    EXEC DBMS_STATS.GATHER_DICTIONARY_STATS;

Re-run the pre-upgrade tool to confirm that everything is ready.

### Step 3.0:  Upgrade Steps

Run the following upgrade steps to perform the upgrade:

##### Step 3.1: Perform the upgrade

Run the following steps to upgrade:

1. Shut down the Oracle 11g Database.

2. After shutting down the Oracle Database,  open CMD with the admin option and
   remove all Oracle 11g Windows services by running the following steps from
   the command prompt:

    set ORACLE_HOME=d:\app\product\19.0.0\dbhome_1
    set PATH=%ORACLE_HOME%\bin;%PATH%
    set ORACLE_SID=ABC
    sc delete OracleJobSchedulerABC
    sc delete OracleMTSRecoveryService
    sc delete OracleServiceABC
    sc delete OracleVssWriterABC

3. Create the Oracle 19c Windows service by running the following commands:

    d:\app\product\19.0.0\dbhome_1\bin\ORADIM -NEW -SID ABC -SYSPWD ********* -STARTMODE AUTO -PFILE D:\app\product\19.0.0\dbhome_1\database\INITABC.ORA

4. After the process creates the Oracle 19c windows services, start the services.

##### Step 3.2: Start Oracles Database

Start Oracle Database from 19C environment in upgrade mode.

After Oracle Database starts in the upgrade mode, perform the following steps:

1. Run the following command:

    cd d:\app\product\19.0.0\dbhome_1\bin

2. Execute the **dbupgrade** utility from the Windows command prompt.

3. After the upgrade completes, start the database and run the following command:

    SQL> @?\rdbms\admin\utlrp.sql

### Step 4.0: Post-upgrade steps

If the upgrade succeeds, run the post-upgrade fixup script:

    d:\ cd d:\app\cfgtoollogs\ABC\preupgrade
    sqlplus sys/<password> as sysdba @postupgrade_fixups.sql

##### Step 4.1: Upgrade the time zone

After you run the post-upgrade fixup scripts, run the following commands to
upgrade the time zone:

    sqlplus / as sysdba <<EOF
    -- Check current settings.
    SELECT * FROM v$timezone_file;
    SHUTDOWN IMMEDIATE;
    STARTUP UPGRADE;
    -- Begin upgrade to the latest version.
    SET SERVEROUTPUT ON
    DECLARE
      l_tz_version PLS_INTEGER;
    BEGIN
      l_tz_version := DBMS_DST.get_latest_timezone_version;
      DBMS_OUTPUT.put_line('l_tz_version=' || l_tz_version);
      DBMS_DST.begin_upgrade(l_tz_version);
    END;
    /
    SHUTDOWN IMMEDIATE;
    STARTUP;
    -- Do the upgrade.
    SET SERVEROUTPUT ON
    DECLARE
      l_failures  
      PLS_INTEGER;
    BEGIN
      DBMS_DST.upgrade_database(l_failures);
      DBMS_OUTPUT.put_line('DBMS_DST.upgrade_database : l_failures=' || l_failures);
      DBMS_DST.end_upgrade(l_failures);
      DBMS_OUTPUT.put_line('DBMS_DST.end_upgrade : l_failures=' || l_failures);
    END;
    /
    -- Validate time zone.
    SELECT * FROM v$timezone_file;

    COLUMN property_name FORMAT A30
    COLUMN property_value FORMAT A20

    SELECT property_name, property_value
    FROM   database_properties
    WHERE  property_name LIKE 'DST_%'
    ORDER BY property_name;
    exit;
    SQL> select TZ_VERSION from registry$database; 

If the **TZ_VERSION** shows the old version, run the following commands:

    SQL>update registry$database set TZ_VERSION = (select version FROM v$timezone_file);
    SQL>commit;
    SQL>select TZ_VERSION from registry$database;
    TZ_VERSION
    ----------
    32

##### Step 4.2: Collect object statistics

Gather the fixed object stats by running the following commands:

    sqlplus / as sysdba <<EOF
    EXECUTE DBMS_STATS.GATHER_FIXED_OBJECTS_STATS;
    exit;

##### Step 4.3 : Collect dictionary statistics

Gather dictionary statistics after the upgrade by running the following statement:

    EXECUTE DBMS_STATS.GATHER_DICTIONARY_STATS;

##### Step 4.4: Validate fixed issues

Run **utlusts.sql** to verify that no issues remain:

    d:\app\product\19.0.0\dbhome_1\rdbms\admin\utlusts.sql TEXT  

##### Step 4.5: Compare invalid objects

Match all invalid objects to the list you saved in Step 2.2.

### Step 4.6: Clean up

To complete the upgrade, perform the following steps:

1. Copy **listener.ora**, **tnsnames.ora**, and **sqlnet.ora** from the Oracle
   11g Oracle home directory to the Oracle 19c  Oracle home directory and change
   the **oracle_home** parameters accordingly.

2. Place all these files in **d:\app\product\19.0.0\dbhome_1\network\admin**.

**Note**: Keep `compatible=11.2.0.4` in case you need to downgrade the Oracle
Database to 11g.

### Conclusion

The preceding steps help you easily upgrade Oracle Database in Windows
version 11.2.0.4 to 19c.

<a class="cta teal" id="cta" href="https://www.rackspace.com/data/databases">Learn more about our Database services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
