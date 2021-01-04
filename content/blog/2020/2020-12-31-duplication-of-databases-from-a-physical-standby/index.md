---
layout: post
title: "Duplication of databases from a physical standby"
date: 2020-12-31
comments: true
author: Venkata Gogineni
authorAvatar: 'https://secure.gravatar.com/avatar/9e51ecbb063f9454b1de2217cc5b0dff'
bio: "I'm working as Oracle DBA and Apps DBA for 14 yrs. I've been involved in Handling Database, Applications, and Middleware operations. I've completed Oracle OCA, OCP, and cloud certifications."
published: true
authorIsRacker: true
categories:
    - Database
    - Oracle
metaTitle: "Duplication of databases from a physical standby"
metaDescription: "Database duplication copies the target database over the network to the auxiliary destination and then creates the duplicate database. "
ogTitle: "Duplication of databases from a physical standby"
ogDescription: "Database duplication copies the target database over the network to the auxiliary destination and then creates the duplicate database. "
slug: "duplication-of-databases-from-a-physical-standby"

---

This blog describes how to duplicate a database from a physical standby
database.

<!--more-->

Database duplication copies the target database over the network to the
auxiliary destination and then creates the duplicate database. You do not
need pre-existing RMAN backups and copies.

Duplicate database from a physical standby is supported from Oracle&reg; 11g
release 2 and onwards.

To perform RMAN active duplication from physical standby you need the
following:

  - Databases: Oracle 11g to latest version
  - Platform: Linux&reg; 7
  - Standby DB name: `PROD_DR`
  - Target DB name: `TEST`

### Open the standby database in read-only mode

Stop the recovery at the physical standby database and then open the
database in read-only mode to allow duplication.

Use the following command to check the status of the standby database:

    PROD_DR> select name, open_mode, log_mode from v$database;

You should see output similar to the following:

    NAME      	OPEN_MODE             LOG_MODE
    --------- 	--------------------  ------------
    PROD_DR    	 MOUNTED              ARCHIVELOG


Use the following command to stop the recovery of the standby database:

    SQL> alter database recover managed standby database cancel;
    Database altered.

Then, open the database in read-only mode:

    SQL> alter database open read only;
    Database altered.

Check the status of the database again to see that it is in read-only instead
of mounted:

    PROD_DR> select name, open_mode,log_mode from v$database;

    NAME   	      OPEN_MODE           	 LOG_MODE
    --------- 	  -------------------- 	 ------------
    PROD_DR   	  READ ONLY         	   ARCHIVELOG


### Prepare the target server

In this section, we'll copy the entire standby Oracle home binaries to the
target instance server, prepare the **pfile** from the source database, and
make changes according to the new database name.

**Note:** If you're duplicating the database to the same server, you must use
the proper values for `DB_NAME`, `DB_UNIQUE_NAME`, `DB_FILE_NAME_CONVERT`, and
`LOG_FILE_NAME_CONVERT`.

First, prepare the **pfile** by using the following commands:

    cd $ORACLE_HOME/dbs
    initTEST.ora

    *.control_files='+DATA/cntrl01.dbf', '+DATA/cntrl02.dbf'
    *.db_create_file_dest='+DATA'
    *.db_file_name_convert='+PROD_DR_DATA','+DATA'
    *.db_name='TEST'
    *.db_unique_name='TEST'
    *.diagnostic_dest='/u01/app/diag'
    *.log_file_name_convert='+PROD_DR_DATA','+DATA'

Copy the existing standby password file and rename it to match the SID used
for the TEST database, or you can create a new password file on the target
server with the same source password.

    cd $ORACLE_HOME/dbs
    cp orapwPROD_DR orapwTEST

### Configure static listener

Use the following steps to configure the static listener for the test
database:

    cd $ORACLE_HOME/network/admin
    cat listener.ora

    ADR_BASE_LISTENER_LOCAL = /u01/app/oracle

    LISTENER_LOCAL =
      (DESCRIPTION_LIST =
        (DESCRIPTION =
          (ADDRESS = (PROTOCOL = TCP)(HOST = TEST.ras.com)(PORT = 1521))
          (ADDRESS = (PROTOCOL = IPC)(KEY = EXTPROC1521))
        )
      )
    SID_LIST_LISTENER_LOCAL = (SID_LIST = (SID_DESC = (GLOBAL_DBNAME = DGNEER) (ORACLE_HOME = /u01/app/oracle/product/12.1.0.2/dbhome_1) (SID_NAME = TEST)))


Start the listener by using the following command:

    lsnrctl status listener_local

You should see output similar to the following example:

    LSNRCTL for Linux: Version 12.1.0.2.0 - Production on 09-JUN-2020 02:57:35

    Copyright (c) 1991, 2014, Oracle.  All rights reserved.

    Connecting to (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST= TEST.ras.com)(PORT=1521)))
    STATUS of the LISTENER
    ------------------------
    Alias                     listener_local
    Version                   TNSLSNR for Linux: Version 12.1.0.2.0 - Production
    Start Date                04-JAN-2020 04:53:15
    Uptime                    156 days 21 hr. 4 min. 19 sec
    Trace Level               off
    Security                  ON: Local OS Authentication
    SNMP                      OFF
    Listener Parameter File   /u01/app/oracle/product/12.1.0.2/dbhome_1/network/admin/listener.ora
    Listener Log File         /u01/app/oracle/product/12.1.0.2/dbhome_1/admin/diag/tnslsnr/alert/log.xml
    Listening Endpoints Summary...
      (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST= TEST.ras.com)(PORT=1521)))
    Services Summary...
    Service "+ASM" has 1 instance(s).
      Instance "+ASM", status READY, has 1 handler(s) for this service...
    Service "TEST" has 2 instance(s).
      Instance "TEST", status UNKNOWN, has 1 handler(s) for this service...
      Instance "TEST", status READY, has 1 handler(s) for this service...
    The command completed successfully


### Create an Oracle Net alias

Next, you need to create an Oracle Net alias to reach the standby database:

    PROD_DR=
            (DESCRIPTION=
                    (ADDRESS=(PROTOCOL=tcp)(HOST= standbydb.ras.com)(PORT=1523))
                (CONNECT_DATA=
                    (SID=PROD_DR)
                )
            )


### Start the target database

Then you need to start the target database in a `nomount` state by using the
following commands:

    sqlplus "/ as sysdba"

    startup nomount

    SQL> show parameter db_name
    NAME                                 TYPE        VALUE
    ------------------------------------ ----------- -------------
    db_name                              string      TEST

    SQL> show parameter uniq
    NAME                                 TYPE        VALUE
    ------------------------------------ ----------- -------------
    db_unique_name                       string      TEST


### Use RMAN to test the connection

After the target database is running in `nomount` state, use RMAN to test
the connection:

    [oracle@TEST.ras.com dbs]$ rman target sys@PROD_DR  auxiliary sys@TEST

    Recovery Manager: Release 12.1.0.2.0 - Production on Thu Jun 09 03:25:22 2020

    Copyright (c) 1982, 2011, Oracle and/or its affiliates.  All rights reserved.

    target database Password:
    connected to target database: PROD_DR (DBID=4252464621)
    auxiliary database Password:
    connected to auxiliary database: TEST (not mounted)

### Restore and duplicate the database

Use the following commands to restore and duplicate the standby databse to the
target database:

    RMAN> target sys@PROD_DR  auxiliary sys@TEST
    RMAN> duplicate target database to TEST from active database nofilenamecheck;

After the duplicate command has completed, you need to restart the standby
database and re-enable recovery by using the following commands:

    PROD_DR> shut immediate
    PROD_DR> startup mount;
    PROD_DR> alter database recover managed standby database disconnect from session;


### Check the target database status

Use the following commands to check the status of the target database:

    [oracle@TEST.ras.com dbs]$ sqlplus "/ as sysdba"

    SQL*Plus: Release 12.1.0.2.0 Production on Tue Jun 9 05:15:53 2020

    Copyright (c) 1982, 2014, Oracle.  All rights reserved.


    Connected to:
    Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production
    With the Partitioning, Automatic Storage Management, OLAP, Advanced Analytics
    and Real Application Testing options

    SQL>  select name, open_mode, log_mode , database_role from v$database;

    NAME      OPEN_MODE            LOG_MODE     DATABASE_ROLE
    --------- -------------------- ------------ ----------------
    TEST      READ WRITE           ARCHIVELOG   PRIMARY



### Conclusion

In this blog, we duplicated a database from a physical standby without taking
any physical backups and we restored the target database to the latest archive
supplied in the standby database.


### Reference

- Performing RMAN duplicate from standby to create a new clone (Doc ID 1665784.1)


<a class="cta teal" id="cta" href="https://www.rackspace.com/dba-services">Learn more about Databases.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
