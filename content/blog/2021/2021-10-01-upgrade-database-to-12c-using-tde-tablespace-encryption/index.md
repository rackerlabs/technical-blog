---
layout: post
title: "Upgrade Database to 12C using TDE Tablespace Encryption"
date: 2021-10-01
comments: true
author: Naveen Kumar
authorAvatar: 
bio: ""
published: true
authorisRacker: true
categories: 
- Oracle
- Database
metaTitle: "Upgrade Database to 12C using TDE Tablespace Encryption"
metaDescription: "This blog explains the TDE tablespace encryption functionality which can be used to encrypt the tablespace where all the data is stored from an EBS application."
ogTitle: "Upgrade Database to 12C using TDE Tablespace Encryption"
ogDescription: "This blog explains the TDE tablespace encryption functionality which can be used to encrypt the tablespace where all the data is stored from an EBS application."
slug: "upgrade-database-to-12C-using-TDE-tablespace-encryption" 

---

The TDE tablespace encryption functionality can be used to encrypt the tablespace where all the data is stored from an EBS application. As TDE is transparent to application, rewriting the code is not required. Any authorized user can access the encrypted data without any issue.

<!--more-->

### Introduction 
Any authorized user can access the encrypted data without any issue. The TDE applies to the data-at-rest like datafiles and backup files.

### Objective
The TDE tablespace encryption option enables you to secure all the sensitive data stored in the EBS database. Only authorized users can access the encrypted data.
### Limitation
The SYSTEM and SYSAUX cannot be encrypted as these are created at the time of creating a DB and not during the time of tablespace creation. Encryption option is appended during the tablespace creation. Undo and TEMP tablespace also can not be encrypted but data stored from encrypted tablespace in TEMP/UNDO is encrypted.

### Implementation Steps
### 1. Verify software versions
•	[Patch 16207672](https://support.oracle.com/epmos/faces/ui/patch/PatchDetail.jspx?parent=DOCUMENT&sourceId=1926201.1&patchId=16207672) - 12.2.2

•	[Patch 20745242](https://support.oracle.com/epmos/faces/ui/patch/PatchDetail.jspx?parent=DOCUMENT&sourceId=1926201.1&patchId=20745242) - R12.AD.C.Delta.7

•	[Patch 20784380](https://support.oracle.com/epmos/faces/ui/patch/PatchDetail.jspx?parent=DOCUMENT&sourceId=1926201.1&patchId=20784380) - R12.TXK.C.Delta.7

•	[Patch 19597008](https://support.oracle.com/epmos/faces/ui/patch/PatchDetail.jspx?parent=DOCUMENT&sourceId=1926201.1&patchId=19597008) 

•	[Patch 20251314](https://support.oracle.com/epmos/faces/ui/patch/PatchDetail.jspx?parent=DOCUMENT&sourceId=1926201.1&patchId=20251314) (included in 12.2.5)

•	[Patch 8796558](https://support.oracle.com/epmos/faces/ui/patch/PatchDetail.jspx?parent=DOCUMENT&sourceId=1926201.1&patchId=8796558)

•	[Patch 19343134](https://support.oracle.com/epmos/faces/ui/patch/PatchDetail.jspx?parent=DOCUMENT&sourceId=1926201.1&patchId=19343134)

### 2.	Prepare 12.1.0 DB Home
•	Install the 12.1.0 software

•	Install Oracle Database 12c Products from the 12c Examples CD (mandatory)

•	Apply additional 12.1.0.2 RDBMS patches
### 3. Apply all the latest required DB ETCC/PSU patches

### 4. 4.	Create nls/data/9idata directory
`perl $ORACLE_HOME/nls/data/old/cr9idata.pl`

### 5 5.	Apply [Patch 16541956](https://support.oracle.com/epmos/faces/ui/patch/PatchDetail.jspx?parent=DOCUMENT&sourceId=1926686.1&patchId=16541956) on the Applications consolidated using the export/import utility patch on source administration server node.

Create a working directory

`mkdir /u01/expimp << /u01/oracle/patches/12c_db/backup/expimp/3rditeration`

### 7.	Generate target database instance creation script aucrdb.sql
The export/import patch provides the auclondb.sql script which generates the aucrdb.sql script. Copy `$AU_TOP/patch/115/sql/auclondb.sql` script from app node to DB node source and execute as below.

`$ sqlplus system/[system password] \
@$AU_TOP/patch/115/sql/auclondb.sql 12`

### 8.	Record advanced queue settings
Copy the `auque1.sql` script from the `$AU_TOP/patch/115/sql` from the app node to DB node and execute. The following command generates auque2.sql.

`$ sqlplus /nolog`

`SQL> connect / as sysdba;`

`SQL> @auque1.sql`

### 9.	Remove rebuild index parameter in spatial indexes
select * from dba_indexes where index_type='DOMAIN' and
  upper(parameters) like '%REBUILD%';

### 10.	Synchronize Text indexes
`$ sqlplus '/ as sysdba'`
`SQL> select pnd_index_owner,pnd_index_name,count(*)`
       `from ctxsys.ctx_pending`
   `group by pnd_index_owner,pnd_index_name;`

   ### Use below command if any row returned from above query
   `exec ctx_ddl.sync_index('[index owner].[index name]');`

   ### 11. Create the export parameter file
Copy $AU_TOP/patch/115/import/auexpdp.dat from the App node and edit as per the requirement.
`==> diff auexpdp.dat auexpdp.dat.orig <<  /u01/oracle/patches/12c_db/backup/expimp
8c8`
`< filesize=5368709120`
---
> filesize=1048576000
12,13d11
< PARALLEL=5
< EXCLUDE=STATISTICS

Create directory as required.

SQL> `create` or replace directory `dmpdir as '/u01/oracle/patches/12c_db/backup/expimp/2nditeration';`

Directory created.
### 12. Ensure no patching cycle is active.

>Node Name       Node Type  Phase           Status          Started              Finished             Elapsed
--------------- ---------- --------------- --------------- -------------------- -------------------- ------------
>Appnode     master     PREPARE         COMPLETED       2017/05/20 23:01:31  2017/05/20 23:24:45  0:23:14
                           APPLY           COMPLETED       2017/05/20 23:53:09  2017/05/20 23:53:39  0:00:30
                           FINALIZE        COMPLETED       2017/05/20 23:55:55  2017/05/20 23:56:14  0:00:19
                           CUTOVER         COMPLETED       2017/05/20 23:58:57  2017/05/21 00:09:50  0:10:53
                           CLEANUP         COMPLETED       2017/05/21 01:59:13  2017/05/21 01:59:44  0:00:31

### 13.	Shut down the application server processes

### 14.	Grant privilege to the source system schema using the following command
`SQL> grant EXEMPT ACCESS POLICY to system;`

`Grant succeeded.`

### 15.	Remove the MGDSYS schema (conditional) using the following command
`$ sqlplus "/ as sysdba" @?/md/admin/catnomgdidcode.sql`

### 16.	Export OLAP analytical workspaces (optional) by running the following commands

1. `SQL> col owner format a15`

`SQL> col aw_name format a15`

`SQL> select OWNER, AW_NAME ,PAGESPACES from dba_aws where owner != 'SYS' order by 1,2;`

>OWNER           AW_NAME         PAGESPACES
--------------- --------------- ----------
>APPS            ODPCODE               1123
APPS            XWDEVKIT              1106
APPS            XWDEVKIT_BACKUP       1106
FPA             FPAPJP                 505

2. SQL> create or replace directory AW_DIR as `'/u01/oracle/patches/12c_db/backup/MGR_DIR';`

Directory Created

2a. `SQL> exec dbms_aw.execute('aw attach APPS.ODPCODE rw');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('allstat');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('export all to eif file ''AW_DIR/ODPCODE.eif''');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('aw detach APPS.ODPCODE');`

PL/SQL procedure successfully completed.

2b. `SQL> exec dbms_aw.execute('aw attach APPS.XWDEVKIT rw');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('allstat');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('export all to eif file ''AW_DIR/XWDEVKIT.eif''');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('aw detach APPS.XWDEVKIT');`

PL/SQL procedure successfully completed.

2c. `SQL> exec dbms_aw.execute('aw attach APPS.XWDEVKIT_BACKUP rw');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('allstat');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('export all to eif file ''AW_DIR/XWDEVKIT_BACKUP.eif''');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('aw detach APPS.XWDEVKIT_BACKUP');`

PL/SQL procedure successfully completed.

2d. `SQL> exec dbms_aw.execute('aw attach FPA.FPAPJP rw');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('allstat');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('export all to eif file ''AW_DIR/FPAPJP.eif''');`

PL/SQL procedure successfully completed.

`SQL>  exec dbms_aw.execute('aw detach FPA.FPAPJP');`

PL/SQL procedure successfully completed.

3. Delete each AW that has been exported in step #2, using the SQL command:

`SQL> exec dbms_aw.execute('aw delete APPS.ODPCODE');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('aw delete APPS.XWDEVKIT');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('aw delete APPS.XWDEVKIT_BACKUP');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('aw delete FPA.FPAPJP');`

PL/SQL procedure successfully completed.

4. Remove OLAP from the 32bit database and cleanup any INVALID OLAP related objects by executing the following commands:

`cd $ORACLE_HOME/olap/admin  --->>> required to locate all embedded calls to other scripts`
`conn / as sysdba`

`@?/olap/admin/catnoamd.sql`

`@?/olap/admin/olapidrp.plb`

`@?/olap/admin/catnoaps.sql`

`@?/olap/admin/catnoxoq.sql`

`@?/rdbms/admin/utlrp.sql`

select owner, object_name, object_type from dba_objects where status <> 'VALID';


SQL> select owner, object_name, object_type,status from dba_objects where status <> 'VALID' and object_name like '%OLAP%';
SYS             OLAPIBOOTSTRAP                 FUNCTION            INVALID
SYS             OLAPIHANDSHAKE                 FUNCTION            INVALID
PUBLIC          OLAPIBOOTSTRAP                 SYNONYM             INVALID
PUBLIC          OLAPIHANDSHAKE                 SYNONYM             INVALID
APPS            PA_OLAP_PVT                    PACKAGE BODY        INVALID

`SQL> drop FUNCTION sys.OLAPIBOOTSTRAP;`

Function dropped.

`SQL> drop FUNCTION sys.OLAPIHANDSHAKE;`

Function dropped.

`SQL> drop PUBLIC SYNONYM OLAPIBOOTSTRAP;`

Synonym dropped.

`SQL> drop PUBLIC SYNONYM OLAPIHANDSHAKE;`

Synonym dropped.

`SQL> drop package body apps.PA_OLAP_PVT;`

Package body dropped.

SQL> select owner, object_name, object_type,status from dba_objects where status <> 'VALID' and object_name like '%OLAP%';

no rows selected

>> Execute the following steps on target 12c 64 bit database where are you are performing the upgrade.

### _Install the 64bit version of Oracle, include the Oracle OLAP option, and migrate the database to 64 bits._

>> Add OLAP back into the database by connecting to the database '/ as sysdba' and executing:

     SQL> spool olap_install.log
     SQL> set echo on
     SQL> show user
     SQL> @?/olap/admin/olap.sql SYSAUX TEMP;
     SQL> spool off

Use the following SQL commands to import each of the exported AWs.  

NOTE: All quotes are single quotes and make sure that you use the right combination of EIF file and OWNER.AW_NAME

`SQL> create or replace directory AW_DIR as '/u01/oracle/patches/12c_db/backup/MGR_DIR';`

Directory created.

1. `SQL> exec dbms_aw.execute('aw create APPS.ODPCODE');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('import all from eif file ''AW_DIR/ODPCODE.eif'' data dfns');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('update');`

PL/SQL procedure successfully completed.

`SQL> commit;`

Commit complete.

`SQL> exec dbms_aw.execute('aw detach APPS.ODPCODE');`

PL/SQL procedure successfully completed.

2. `SQL> exec dbms_aw.execute('aw create APPS.XWDEVKIT');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('import all from eif file ''AW_DIR/XWDEVKIT.eif'' data dfns');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('update');`

PL/SQL procedure successfully completed.

`SQL> commit;`

Commit complete.

`SQL> exec dbms_aw.execute('aw detach APPS.XWDEVKIT');`

PL/SQL procedure successfully completed.

3. `SQL> exec dbms_aw.execute('aw create APPS.XWDEVKIT_BACKUP');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('import all from eif file ''AW_DIR/XWDEVKIT_BACKUP.eif'' data dfns');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('update');`

PL/SQL procedure successfully completed.

`SQL> commit;`

Commit complete.

`SQL> exec dbms_aw.execute('aw detach APPS.XWDEVKIT_BACKUP');`

PL/SQL procedure successfully completed.

4. `SQL> exec dbms_aw.execute('aw create FPA.FPAPJP');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('import all from eif file ''AW_DIR/FPAPJP.eif'' data dfns');`

PL/SQL procedure successfully completed.

`SQL> exec dbms_aw.execute('update');`

PL/SQL procedure successfully completed.

`SQL> commit;`

Commit complete.

`SQL> exec dbms_aw.execute('aw detach FPA.FPAPJP');`

PL/SQL procedure successfully completed.

### 17.	Drop XLA packages (optional)
`$ sqlplus apps/[APPS password]`
`SQL> select distinct('drop package '||db.owner||'.'|| db.object_name || ';')` `from dba_objects db, xla_subledgers xl where db.object_type='PACKAGE BODY' and db.` `object_name like 'XLA%AAD%PKG' and substr(db.object_name,1,9) = 'XLA_'|| LPAD`  `(SUBSTR(TO_CHAR(ABS(xl.application_id)), 1, 5), 5, '0') and db.object_name` `NOT IN ('XLA_AAD_HDR_ACCT_ATTRS_F_PKG','XLA_AMB_AAD_PKG') order by 1;`
`SQL> @drop_xla_package.sql`

### 18. Export the applications database instance

`$ expdp "'/ as sysdba'" parfile=[export parameter file name]`

### 19.	Revoke privilege from source system schema
`SQL> revoke EXEMPT ACCESS POLICY from system;`

### 20.	Enable Oracle Advanced Security TDE Tablespace Encryption _(Using Oracle wallet method)_

Add this entry to the sqlnet_ifile.ora in $ORACLE_HOME/network/admin/<SID>_<HOST>: 
>>Keep it in single line to avoid format issue

`ENCRYPTION_WALLET_LOCATION=(SOURCE=(METHOD = FILE)(METHOD_DATA=(DIRECTORY= /u01/oracle/dbhome1/12.1.0.2/wallet)))`

### 21.	Create the target initialization parameter file / working directory

### 22. Modify the aucrdb.sql script as per actual location of target database datafiles
Append the following to each 'CREATE TABLESPACE' command in aucrdb.sql:

`ENCRYPTION [USING '<enc. algorithm>;'] DEFAULT STORAGE (ENCRYPT)`
possible choices are: 3DES168, AES128 (default if none specified), AES192, and   AES256).

### 23. Finally split the edited copy of aucrdb.sql into two separate .sql files, the first will contain the CREATE DATABASE statement and the second will contain the CREATE TABLESPACE statements.

### 24. Create the target database instance
`$ sqlplus /nolog`
`SQL> connect / as sysdba;`
`SQL> spool aucrdb1.log;`
`For UNIX or Linux:`
`SQL> startup nomount;`
`SQL> @aucrdb1.sql`
`SQL> spool off`

### 25.	After DB is created, you first need to create the encryption key before creating the tablespace.

For encrypted tablespaces and encryption key management based on Oracle Wallet:

`SQL alter system set encryption key identified by "<Strong_Password > >";`

### 26. Create encrypted tablespace using the following script
`SQL> spool aucrdb2.log`
`SQL> @aucrdb2.sql << Make sure this include encryption syntex`
`SQL> exit;`

### 27.	When the target database instance has been created, restart the database instance

`Shutdown immediate`
`cp -pR wallet wallet.orig.date`
`orapki wallet create -wallet /u01/oracle/dbhome1/12.1.0.2/wallet -auto_login` 
>Make wallet autologin

`startup mount`
If an Oracle Wallet is used: 
>> Below is required in case of manual wallet
SQL> alter system set encryption wallet open identified by "<strong_password>";
alter database open;

select * from v$encryption_wallet;
<img src=Picture2.png title="" alt="">

### 28. Copy all the database preparation scripts to target Oracle home to setup sys/system schemas.

### 29. Set up the SYS schema
`$ sqlplus "/ as sysdba" @audb1210.sql`

### 30. Set up the SYSTEM schema
`$ sqlplus system/[system password] @ausy1210.sql`

### 31.	Install Java Virtual Machine
`$ sqlplus system/[system password] @aujv1210.sql`

### 32. Install other required components
`sqlplus system/**** @aumsc1210.sql SYSAUX TEMP`

### 33.	Perform patch post-install instructions
`SQL> conn /as sysdba`
`Connected to an idle instance.`
`SQL> startup upgrade`
`cd $ORACLE_HOME/OPatch`
`[oracle@dbnode OPatch]$ ./datapatch –verbose`
`SQL> shut immediate`
`SQL> startup`
`SQL> @?/rdbms/admin/utlrp.sql`

### 34. Set CTXSYS parameter (conditional)
`$ sqlplus "/ as sysdba"`
`SQL> exec ctxsys.ctx_adm.set_parameter('file_access_role', 'public');`

### 35.	Disable automatic gathering of statistics

`$ sqlplus "/ as sysdba"` 
`SQL> alter system enable restricted session;` 
`SQL> @adstats.sql`
`$ sqlplus "/ as sysdba"`
`SQL> alter system disable restricted session;`
`SQL> exit;`

### 36.	Back up the target database instance (Optional)

### 37.	Create the import parameter files
`SQL> show user`
`USER is "SYSTEM"`
`SQL> create or replace directory dmpdir as '/u01/oracle/patches/12c_db/backup/expimp';`

Directory created.

Copy dump files from source to target server if servers are different

### 38. Import the Applications database instance
`$ impdp "'/ as sysdba'" parfile=auimpdp.dat`

### 39.	Import OLAP analytical workspaces (conditional)
Steps related to target (12c) needs to be performed here

### 40.	Revoke privilege from target system schema
`SQL> revoke EXEMPT ACCESS POLICY from system;`

### 41.	Reset Advanced Queues
`$ sqlplus /nolog`
`SQL> connect / as sysdba;`
`SQL> @auque2.sql`

### 42. Run adgrants.sql
`$ sqlplus "/ as sysdba" @adgrants.sql APPS`

### 43.	Grant create procedure privilege on CTXSYS
`$ sqlplus apps/[APPS password] @adctxprv.sql \`
`[SYSTEM password] CTXSYS`

### 44.	Start the new database listener (conditional)

### 45. Deregister the current database server
`$ sqlplus apps/[APPS password]`
`SQL> exec fnd_conc_clone.setup_clean;`

### 46.	Implement and run AutoConfig
`perl $AD_TOP/bin/admkappsutil.pl`

`Copy appsutil.zip to $ORACLE_HOME/ on DB node.`

`unzip -o appsutil.zip`

`Build $CONTEXT_FILE`

`perl adbldxml.pl`

`./adconfig.sh`

`Restart DB/Listener - Source new env file`

`Run autoconfig on App node run fs`

`./adconfig.sh`

`Run autoconfig on App node patch fs`

`./adconfig.pl contextfile=$CONTEXT_FILE run=INSTE8`

### 47.	Gather statistics for SYS schema
`$ sqlplus "/ as sysdba"`
`SQL> alter system enable restricted session;`
`SQL> @adstats.sql`
`$ sqlplus "/ as sysdba"`
`SQL> alter system disable restricted session;`
`SQL> exit;`

### 48. Recreate custom database links (conditional)
### 49. Create ConText objects
You need to call the scripts by using the driver file to create these objects. Run the following command:

`$ perl $AU_TOP/patch/115/bin/dpost_imp.pl [driver file] [source database version]`
`adop phase=apply hotpatch=yes`

### 50.	Populate CTXSYS.DR$SQE Table
`$ sqlplus apps/[apps password]`
`SQL> exec icx_cat_sqe_pvt.sync_sqes_for_all_zones;`

### 51. Compile Invalid Objects 

### 52. Recreate XLA packages (conditional)
If you dropped the XLA packages in the source environment, copy  $XLA_TOP/patch/115/sql/xla6128278.sql from source to target and run as below.

`$ sqlplus apps/[APPS password]`
`SQL> @xla6128278.sql [spool log file]`

### 53.	Run AutoConfig on the Run APPL_TOP
`==>echo $FILE_EDITION`
`run`
`==>./adconfig.sh`

### 54.	Apply post-upgrade WMS patches (conditional)
If you upgraded from an RDBMS version prior to 12c, apply [Patch 19007053](https://support.oracle.com/epmos/faces/ui/patch/PatchDetail.jspx?parent=DOCUMENT&sourceId=1926686.1&patchId=19007053)
adop phase=apply patches=19007053 patchtop=/home/applmgr/exp_patch apply_mode=downtime workers=12

## 55. Maintain application database objects
a.	Compile flexfield data in AOL tables
b.	Recreate grants and synonyms for APPS schema

### 56. Start Applications Server Processes

### 57. Create DQM Indexes

a.	Log on to Oracle Applications with the "Trading Community Manager" responsibility

b.	Click Control > Request > Run

c.	Select "Single Request" option

d.	Enter "DQM Staging Program" name

e.	Enter the following parameters:

  i.	Number of Parallel Staging Workers: 4
  ii.	Staging Command: CREATE_INDEXES
  iii.	Continue Previous Execution: NO
  iv.	Index Creation: SERIAL
f.	Click "Submit"

### _Conclusion_
By following all above steps we are performing 12C database upgrade along with enabling Tablespace level Encryption.
