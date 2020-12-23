---
layout: post
title: "Restore Oracle database by using RMAN duplicate in Oracle 12c"
date: 2020-12-23
comments: true
author: Pradeep Rai
authorAvatar: 'https://s.gravatar.com/avatar/3bb999276b2817f44c8be712ff7f36ab'
bio: "I am currently an Oracle DBA with 18 years of experience and am well versed with the Oracle technologies. I am also looking into cloud database infrastructure. I also have experience with other than Oracle databases such as Mongo dB and Cassandra."
published: true
authorIsRacker: true
categories:
    - Oracle
metaTitle: "Restore Oracle database by using RMAN duplicate in Oracle 12c"
metaDescription: "."
ogTitle: "Restore Oracle database by using RMAN duplicate in Oracle 12c"
ogDescription: "."
slug: "restore-oracle-database-by-using-rman-duplicate-in-oracle-12c"

---

Oracle&reg; Recovery Manager (RMAN) is a tool that can duplicate or clone a
database from a backup or from an active database. RMAN can create a duplicate
database on a remote server with the same file structure, on a remote
server with a different file structure, or on the local server with a
different file structure.

<!--more-->

When you receive any request to refresh the Oracle target database from any
source available:

- First, ask the application team for the backup location of the
  source database, if they had previously asked to preserve any backup of the
  source database. If an existing backup is not available, then confirm with
  the application team if you need to back up the source database now when
  the request came in. After you've confirmed when to take a backup, you can
  use the following script to back up the source database.

- Ask the application team to provide any specific post-refresh tasks.

- Transfer the source backup to the target server in your specific location.

If the source database must continue to run while being backed up, use the
script for a *hot backup*. If the source database is able to stop running
for the backup, use the script for a *cold backup*.

**Note**: You can modify the following scripts as needed.

**Hot backup:**

Create a new file called **rman_full_HOT_DATABASENAME.sh** and paste the
following script into it:

    export ORACLE_HOME=Correct_ORACLE_HOME
    export ORACLE_SID=Correct_ ORACLE SID
    export PATH=$PATH:$ORACLE_HOME/bin
    export LOG=Correct_ Log_Loaction/rman_HOT_DATABASENAME_backup.log
    rman target / <<EOF>>$LOG
    run
    {
      allocate channel ch1 type disk maxpiecesize 4048M format '/backup/RMAN/DATABASENAME/DATABASENAME_HOT_backup_%U.bak';
      allocate channel ch2 type disk maxpiecesize 4048M format '/backup/RMAN/DATABASENAME/DATABASENAME_HOT_backup_%U.bak';
      allocate channel ch3 type disk maxpiecesize 4048M format '/backup/RMAN/DATABASENAME/DATABASENAME_HOT_backup_%U.bak';
      backup as compressed backupset database TAG 'DONOTDELETE_ITKnumber';
      backup AS COMPRESSED BACKUPSET archivelog all format '/backup/RMAN/DATABASENAME/DATABASENAME_ARC_BACKUP_%d_%u_%p_%s.bak';
      backup current controlfile format '/backup/RMAN/DATABASENAME/DATABASENAME_HOT_backup_CTL_%d%s%t_%U.bak';
      release channel ch1;
      release channel ch2;
      release channel ch3;
    }
    exit
    EOF

Use the following command to run the script:

    $ nohup sh rman_full_HOT_DATABASENAME.sh &

**Cold backup**

**Note**: For a cold backup, there is no need to take a backup of the archive
log and the application should be down before starting the backup process.

Create a new file called **rman_full_COLD_DATABASENAME.sh** and paste the
following script into it:

    export ORACLE_HOME=Correct_ORACLE_HOME
    export ORACLE_SID=Correct_ORACLE_SID
    export PATH=$PATH:$ORACLE_HOME/bin
    export LOG=Correct Log Loaction/rman_COLD_DATABASENAME_backup.log
    rman target / <<EOF>>$LOG
    run
    {
      allocate channel ch1 type disk maxpiecesize 4048M format '/backup/RMAN/DATABASENAME/DATABASENAME_COLD_backup_%U.bak';
      allocate channel ch2 type disk maxpiecesize 4048M format '/backup/RMAN/DATABASENAME/DATABASENAME_COLD_backup_%U.bak';
      allocate channel ch3 type disk maxpiecesize 4048M format '/backup/RMAN/DATABASENAME/DATABASENAME_COLD_backup_%U.bak';
      backup as compressed backupset database TAG 'ticketnumber';
      backup current controlfile format '/backup/RMAN/DATABASENAME/DATABASENAME_COLD_backup_CTL_%d%s%t_%U.bak';
      release channel ch1;
      release channel ch2;
      release channel ch3;
    }
    exit
    EOF

  Use the following command to run the script:

        $ nohup sh rman_full_COLD_DATABASENAME.sh &

### Pre-refresh tasks

Now you can perform the following re-refresh tasks on the target database:

- Preserve all SQL profiles
- Preserve all DB links
- Preserve all synonyms
- Preserve all user passwords
- Preserve all grant/object, Grant/system, and Grant/roles
- Preserve all general information
- Copy pfile and spfile in the specific directory per your requirement
- Edit the correct value for the `logfile_name_convert` parameter and the
  `db_file_name_convert` parameter. Also check the value of `undo_tablespace`
  and make sure that it is defined the same in the target as the source
  database.
- Prepare the script to clone the database

#### Preserve all SQL profiles

First, check whether any SQL profiles are present on the target database by
using the following command:

    SQL> select count(*) from dba_sql_profiles;

If the **count** is zero, then you don't need to perform the following steps
to preserve SQL profiles. If the **count** is more than zero, then SQL
profiles are present and you need to preserve them by using the following
steps:

**Step 1**

    grant dba to TEST identified by password;


**Step 2**

    CONN TEST/password


**Step 3**

    BEGIN
    DBMS_SQLTUNE.CREATE_STGTAB_SQLPROF (table_name => 'SQL_PROFILES3',schema_name=>'SYSTEM');
    END;
    /


**Step 4**

    BEGIN
    DBMS_SQLTUNE.PACK_STGTAB_SQLPROF
    (profile_category => '%',
    staging_table_name => 'SQL_PROFILES3',
    staging_schema_owner=>'SYSTEM');
    END;
    /


**Step 5**

    select count(*) from SYSTEM.sql_profiles3;


**Step 6**

    expdp TEST/password directory=expdp  dumpfile=expdp_sql_profiles.dmp TABLES=SYSTEM.SQL_PROFILES3 logfile=expdp_sql_profiles.log


#### Import and unpack SQL profiles

Use the following steps to import and then unpack the SQL profiles:

**Note:** After the target database is restored, you must perform the following
steps in the target database.

**Step 1**

    grant dba to TEST identified by password;


**Step 2**

    impdp TEST/password dumpfile=expdp_sql_profiles.dmp TABLES=SYSTEM.SQL_PROFILES3 DIRECTORY=expdp TABLE_EXISTS_ACTION=REPLACE logfile=impdp_sql_profiles.log


**Step 3**

    BEGIN
    DBMS_SQLTUNE.UNPACK_STGTAB_SQLPROF
    (staging_table_name => 'SQL_PROFILES3',
    staging_schema_owner=>'SYSTEM', replace=>TRUE);
    END;
    /

#### Preserve all DB links

Create a file called **dblink.sh** and paste the following script into it:

    export ORACLE_HOME=Correct _ORACLE_HOME
    export ORACLE_SID=Correct_ ORACLE_SID
    expdp  \'/ as sysdba\' directory=expdp  dumpfile=dblink.dmp full=y content=metadata_only include=db_link  logfile=expdp_dblink.log


Then run the following command to execute the script:

    $ nohup sh dblink.sh &


#### Preserve all synonyms

**SQL script**

Create a file called **Synonyms_query.sql** and paste the following SQL script
into it:

    Spool synonyms.sql
    set pages 10000
    set long 999999
    set linesize 450
    SELECT DBMS_METADATA.GET_DDL('SYNONYM', SYNONYM_NAME, OWNER) || ';'  "output" FROM dba_synonyms where table_owner not in('SYS','SYSTEM','DBSNMP','ORACLE_OCM','MDSYS','OLAPSYS','ORDSYS','WMSYS','ANONYMOUS','CTXSYS','OUTLN','SI_INFORMTN_SCHEMA','SYSMAN','EXFSYS','XDB','DMSYS');

    Spool off

Then run the following command to execute the script:

    $ nohup sqlplus / as sysdba @Synonyms_query.sql > Synonyms_query.log &

**Export method**

Create a file called **synonyms.sh** and paste the following script into it:

    export ORACLE_HOME=Correct ORACLE HOME
    export ORACLE_SID=Correct_ORACLE SID
    expdp \'/ as sysdba\' directory=expdp dumpfile=SYNONYMS.dmp logfile=expdp_SYNONYMS.log FULL=y CONTENT=METADATA_ONLY INCLUDE=PUBLIC_SYNONYM/SYNONYM

Then run the following command to execute the script:

    $ nohup sh synonyms.sh &


#### Preserve all user passwords

Create a file called **usders_password.sql** and paste the following script
into it:

    Spool password.sql

    COL ColumnName FORMAT A32000
    set pagesize 2000
    set pages 0
    column output format a300
    set line 300
    set long 100000
    select
    'alter user '||u.username||' identified by values '''||s.spare4||''';' cmd
           from dba_users u
           join sys.user$ s
      on u.user_id = s.user#
      where u.username in (select username from dba_users where ORACLE_MAINTAINED='N')
    /

    Spool off


Then run the following command to execute the script:

    $ nohup sqlplus / as sysdba @usders_password.sql > usders_password.log &

#### Preserve all grant/object, Grant/system, and Grant/roles

Create a file called **grant.sh** and paste the following script into it:

    export ORACLE_HOME=Correct_ORACLE HOME
    export ORACLE_SID=Correct_ORACLE SID
    expdp \'/ as sysdba\' directory= expdp  dumpfile=URG.dmp logfile=expdp_URG.log FULL=y CONTENT=METADATA_ONLY INCLUDE=USER,ROLE,ROLE_GRANT,PROFILE

Then run the following command to execute the script:

    $ nohup sh grant.sh &


#### Preserve all general information

Create a file called **prerefresh.sql** and paste the following script into it:

**Note**: Change `correct_location` as per your requirement.

    spool pre_clone_info_$ORACLE_SID.log

    alter database backup controlfile to trace as 'correct_loactionlocation/ctrl$ORACLE_SID.sql';

    SELECT name,database_role, open_mode FROM v$database;

    -- select name,open_mode from v$pdbs;

    archive log list

    show parameter pfile

    show parameter control_files

    set pages 10000
    set serveroutput on size 1000000 long 1000000
    SELECT DBMS_METADATA.GET_DDL('DB_LINK',a.db_link,a.owner) || ';' "output" FROM dba_db_links a;

    col OWNER for a20
    col DB_LINK for a25
    col USERNAME for a20
    col HOST for a35
    select * from dba_db_links;

    set lines 200
    col DIRECTORY_NAME for a40
    col DIRECTORY_PATH for a110
    select * from dba_directories;

    select 'create or replace directory '||DIRECTORY_NAME||' as '''||DIRECTORY_PATH||''';' from dba_directories;

    set long 20000 longchunksize 20000 pagesize 0 linesize 1000 feedback off verify off trimspool on

    set lines 300 pages 200
    col FILE_NAME for a60;
    select file_name,tablespace_name,bytes/1024/1024,status from dba_data_files;
    select file_name,tablespace_name,bytes/1024/1024,status from dba_temp_files;
    select tablespace_name from dba_tablespaces;

    set lines 300
    select username from dba_users;

    select name from v$controlfile;

    set lines 200 pages 200
    select * from v$logfile;
    select * from v$log;

    select substr(name,1,instr(name,'/',-1)) from v$datafile
    union
    select substr(name,1,instr(name,'/',-1)) from v$tempfile
    union
    select substr(member,1,instr(member,'/',-1)) from v$logfile
    union
    select substr(name,1,instr(name,'/',-1)) from v$controlfile;

    show parameter utl

    spool off


Then run the following command to execute the script:

    $ nohup sqlplus / as sysdba @prerefresh.sql > prerefresh.log &


#### Copy pfile and spfile

Copy the **pfile** and **spfile** from the source database. You need to
edit the correct value for the `logfile_name_convert` and
`db_file_name_convert` parameters then also check the value of
`undo_tablespace`.

Use the following query on the source database and the target database:

    set lines 200 pages 200
    select distinct substr(name,1,instr(name,'/',-1)) from v$datafile;
    select distinct substr(member,1,instr(member,'/',-1)) from v$logfile;

According to the output you receive, edit the following parameters in the
**pfile** that you copied with your specific requirements:

**Note:** Be sure to take a backup of the original **pfile** before making
any changes.

    *.db_file_name_convert='path1_of_source_datafile',’path1_of_trget_datafile’, 'path2_of_source_datafile',’path2_of_trget_datafile’,
    *.log_file_name_convert='path1_of_source_logile',’path1_of_trget_logfile, 'path2_of_source_logfile',’path2_of_trget_logfile’,


Next, check the parameter `undo_tablespace` in both the source and target
databases by using the following command:

    SQL> show parameters undo_tablespace

If the output is different in the target database, you must update the
`undo_tablespace` parameter to match the value in the source database.

#### Prepare script to clone the database

**If you used a hot backup**

Create a file called **rman_dup.sh** and paste the following script into it:

    export ORACLE_HOME=Correct_ORACLE_HOME
    export ORACLE_SID=Correct_ORACLE SID
    export PATH=$ORACLE_HOME/bin:$PATH
    rman AUXILIARY / cmdfile=rman_duplicate_script.scr msglog=rman_duplicate_script.log


Next, create another new file called **rman_duplicate_script.scr** and paste
the following script into it:

    run {
      allocate auxiliary channel aux1 device type disk;
      allocate auxiliary channel aux2 device type disk;
      allocate auxiliary channel aux3 device type disk;
      DUPLICATE DATABASE TO Target_db_name BACKUP LOCATION 'Loaction_of_backup_of_source database' nofilenamecheck;
      release channel aux1;
      release channel aux2;
      release channel aux3;
    }


**If you used a cold backup**

Create a file called **rman_dup.sh** and paste the following script into it:

    export ORACLE_HOME=Correct_ORACLE_HOME
    export ORACLE_SID=Correct_ORACLE SID
    export PATH=$ORACLE_HOME/bin:$PATH
    rman AUXILIARY / cmdfile=rman_duplicate_script.scr msglog=rman_duplicate_script.log



Next, create another new file called **rman_duplicate_script.scr** and paste
the following script into it:

    run {
      allocate auxiliary channel aux1 device type disk;
      allocate auxiliary channel aux2 device type disk;
      allocate auxiliary channel aux3 device type disk;
      allocate auxiliary channel aux9 device type disk;
      DUPLICATE DATABASE TO Target_db_name BACKUP BACKUP LOCATION 'Loaction_of_backup_of_source database' nofilenamecheck noredo;
      release channel aux1;
      release channel aux2;
      release channel aux3;
    }


### Start the target database

Start the target database by using the following steps:

1. Use the following command to start the target database in the mount mode by
   using restrict:

       SQL> startup mount restrict;

2. Next, drop the target database by using the following command:

       SQL> DROP DATABASE

   **Note:** Before dropping the target database, be sure the application is
   down or you have proper go-ahead from the application. Reach out to the
   application team if you aren't sure.

3. Start the target database in nomount mode using the **pfile** that you edited
   with the correct `do_file_name_convert`, `log_file_name_convert`, and
   `undo_tablespace` parameters.

4. Verify the parameters in the target database by using the following commands:

       show parameter db_file
       show parameter log_file
       show parameter db_name
       show parameter undo

5. Use the script that you created in the previous section to clone the database
   and check the log:

       $ nohup sh rman_dup.sh &


6. After the cloning process is complete, open the database in read/write mode.
   Shut down the target database and copy the original **pfile** and **spfile**
   at the default location (**$ORACLE_HOME/dbs**).

7. Start the target database again and check the parameters showing parameter
   `spfile`. It should point to the default location.

8. Start the post-refresh tasks.

### Post-refresh tasks

Use the following steps after you refresh the database:

1. Import SQL profiles by using the steps in the
   [Import and unpack SQL profiles](#import-and-unpack-SQL-profiles) section.

2. Import DB links.

   Before you import the DB links, besure to remove all private and public
   DB links from the target database. Use the dump file that you preserved in
   the [Preserve all DB links](#preserve-all-DB-links) section.

   For example:

       impdp  \'/ as sysdba\' directory=expdp  dumpfile=dblink.dmp logfile=impdp_dblink.log


3. Reset the passwords of all users to the passwords that you preserved from
   the source database.

4. Hand over the database to the application team.

### Conclusion

With the help of this blog you can easily clone your Oracle database by using
RMAN duplicate. RMAN duplicate not only makes your work very easy but
faster as well. The steps explained above can duplicate your database
using any backup. However, it is important to note that the above
steps do not explain about duplicating databases by using ACTIVE database method.


### Reference

https://oracle-base.com/articles/11g/duplicate-database-using-rman-11gr2


<a class="cta red" id="cta" href="https://www.rackspace.com/dba-services">Learn more about Databases.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
