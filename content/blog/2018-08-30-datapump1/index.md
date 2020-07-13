---
layout: post
title: "Working with Data Pump enhancements in Oracle Database 12c: Part 1"
date: 2018-09-10
comments: true
author: Sanchit Middha
published: true
authorIsRacker: true
categories:
  - Oracle
  - database
  - architecture
---

Originally published by TriCore: June 6, 2017

Oracle&reg; Data Pump (expdp, impdp) is a utility for exporting and importing
database objects in and across databases. While most database administrators
are aware of Data Pump, support for multitenant architecture in Oracle
Database 12c introduced changes to how Data Pump exports and imports data.

<!--more-->

### Introduction

This two-part blog series covers the changes to Oracle Data Pump
Export (expdp) technology and how to use it to take exports of components of
your database architecture.

![An architectural diagram of Oracle
Data Pump](picture1.png)

The examples in this post focus on exports in the context of a
_container database_ (CDB), which holds the Oracle metadata, and one or more
_pluggable databases_ (PDBs), which hold your actual data.

For more information on PDBs and CDBs, see [Introduction to the Multitenant
Architecture](https://docs.oracle.com/database/121/CNCPT/cdbovrvw.htm#CNCPT89234).

### Taking a full database export

A full database export doesn't necessarily include all of the data that you
might want. For example, you might think that when you connect to
the root container or CDB and take a full export of the database, the
export includes all of the PDBs that belong to it. However, that’s not the
case. The full export from the root container only exports the objects
that belong to the root container, and not the PDBs.

For example, consider a CDB named `PRODCDB` that's associated with four PDBs.
The following command pulls up detailed information about these databases:

      sys@PRODCDB> select name,open_mode,con_id from v$pdbs;

The following code block shows the table that this command generates:

      NAME                           OPEN_MODE      CON_ID
      ------------------------------ ---------- ----------
      PDB$SEED                       READ ONLY           2
      PRODPDB1                       READ WRITE          3
      PRODPDB2                       READ WRITE          4
      PRODPDB3                       READ WRITE          5
      PRODPDB4                       READ WRITE          6

When you try to take a full export, EXPDP only takes an export of the objects
that belong to the root container, and not the objects from all of the
pluggable databases.

The following command takes the export:

      [oracle@labserver ~]$ expdp directory=DPUMP dumpfile=exp_cdb_full_%U.dmp logfile=exp_cdb_full.log full=Y parallel=4

The following code block shows the output from this operation:

      Export: Release 12.1.0.1.0 - Production on Thu Mar 26 23:10:41 2015

      Copyright (c) 1982, 2013, Oracle and/or its affiliates.  All rights reserved.

      Username: / as sysdba

      Connected to: Oracle Database 12c Enterprise Edition Release 12.1.0.1.0 - 64bit Production
      With the Partitioning, Automatic Storage Management, OLAP, Advanced Analytics
      and Real Application Testing options

      WARNING: Oracle Data Pump operations are not typically needed when connected to the root or seed of a container database. Below are the steps for exporting of full database.

      Starting "SYS"."SYS_EXPORT_FULL_01":  /******** AS SYSDBA directory=DPUMP dumpfile=exp_cdb_full_%U.dmp logfile=exp_cdb_full.log full=Y parallel=4
      Estimate in progress using BLOCKS method...
      Processing object type DATABASE_EXPORT/EARLY_OPTIONS/VIEWS_AS_TABLES/TABLE_DATA
      Processing object type DATABASE_EXPORT/NORMAL_OPTIONS/TABLE_DATA
      Processing object type DATABASE_EXPORT/NORMAL_OPTIONS/VIEWS_AS_TABLES/TABLE_DATA
      Processing object type DATABASE_EXPORT/SCHEMA/TABLE/TABLE_DATA
      Total estimation using BLOCKS method: 90.70 MB
      Processing object type DATABASE_EXPORT/PRE_SYSTEM_IMPCALLOUT/MARKER
      Processing object type DATABASE_EXPORT/PRE_INSTANCE_IMPCALLOUT/MARKER
      Processing object type DATABASE_EXPORT/TABLESPACE
      Processing object type DATABASE_EXPORT/PROFILE
      Processing object type DATABASE_EXPORT/SYS_USER/USER
      Processing object type DATABASE_EXPORT/SCHEMA/USER
      . . exported "LBACSYS"."OLS$AUDIT_ACTIONS"               5.734 KB       8 rows
      Processing object type DATABASE_EXPORT/ROLE
      . . exported "LBACSYS"."OLS$DIP_EVENTS"                  5.515 KB       2 rows
      . . exported "LBACSYS"."OLS$INSTALLATIONS"               6.937 KB       2 rows
      Processing object type DATABASE_EXPORT/RADM_FPTM
      . . exported "LBACSYS"."OLS$PROPS"                       6.210 KB       5 rows
      . . exported "SYS"."DAM_CONFIG_PARAM$"                   6.507 KB      14 rows
      . . exported "SYS"."TSDP_PARAMETER$"                     5.929 KB       1 rows
      . . exported "SYS"."TSDP_POLICY$"                        5.898 KB       1 rows
      . . exported "SYS"."TSDP_SUBPOL$"                        6.304 KB       1 rows
      . . exported "SYSTEM"."REDO_DB"                          23.42 KB       1 rows
      . . exported "WMSYS"."WM$ENV_VARS$"                      6.054 KB       5 rows
      . . exported "WMSYS"."WM$EVENTS_INFO$"                   5.789 KB      12 rows
      . . exported "WMSYS"."WM$HINT_TABLE$"                    9.429 KB      75 rows
      . . exported "WMSYS"."WM$NEXTVER_TABLE$"                 6.351 KB       1 rows
      Processing object type DATABASE_EXPORT/GRANT/SYSTEM_GRANT/PROC_SYSTEM_GRANT
      . . exported "WMSYS"."WM$VERSION_HIERARCHY_TABLE$"       5.960 KB       1 rows
      Processing object type DATABASE_EXPORT/SCHEMA/GRANT/SYSTEM_GRANT
      Processing object type DATABASE_EXPORT/SCHEMA/ROLE_GRANT
      Processing object type DATABASE_EXPORT/SCHEMA/DEFAULT_ROLE
      . . exported "WMSYS"."WM$WORKSPACES_TABLE$"              12.08 KB       1 rows
      . . exported "WMSYS"."WM$WORKSPACE_PRIV_TABLE$"          6.539 KB       8 rows
      . . exported "LBACSYS"."OLS$AUDIT"                           0 KB       0 rows
      . . exported "LBACSYS"."OLS$COMPARTMENTS"                    0 KB       0 rows
      . . exported "LBACSYS"."OLS$DIP_DEBUG"                       0 KB       0 rows
      . . exported "LBACSYS"."OLS$GROUPS"                          0 KB       0 rows
      . . exported "LBACSYS"."OLS$LAB"                             0 KB       0 rows
      . . exported "LBACSYS"."OLS$LEVELS"                          0 KB       0 rows
      . . exported "LBACSYS"."OLS$POL"                             0 KB       0 rows
      Processing object type DATABASE_EXPORT/SCHEMA/ON_USER_GRANT
      . . exported "LBACSYS"."OLS$POLICY_ADMIN"                    0 KB       0 rows
      . . exported "LBACSYS"."OLS$POLS"                            0 KB       0 rows
      . . exported "LBACSYS"."OLS$POLT"                            0 KB       0 rows
      . . exported "LBACSYS"."OLS$PROFILE"                         0 KB       0 rows
      . . exported "LBACSYS"."OLS$PROFILES"                        0 KB       0 rows
      . . exported "LBACSYS"."OLS$PROG"                            0 KB       0 rows
      . . exported "LBACSYS"."OLS$SESSINFO"                        0 KB       0 rows
      . . exported "LBACSYS"."OLS$USER"                            0 KB       0 rows
      . . exported "LBACSYS"."OLS$USER_COMPARTMENTS"               0 KB       0 rows
      . . exported "LBACSYS"."OLS$USER_GROUPS"                     0 KB       0 rows
      . . exported "LBACSYS"."OLS$USER_LEVELS"                     0 KB       0 rows
      . . exported "SYS"."AUD$"                                    0 KB       0 rows
      . . exported "SYS"."DAM_CLEANUP_EVENTS$"                     0 KB       0 rows
      . . exported "SYS"."DAM_CLEANUP_JOBS$"                       0 KB       0 rows
      . . exported "SYS"."TSDP_ASSOCIATION$"                       0 KB       0 rows
      . . exported "SYS"."TSDP_CONDITION$"                         0 KB       0 rows
      . . exported "SYS"."TSDP_FEATURE_POLICY$"                    0 KB       0 rows
      . . exported "SYS"."TSDP_PROTECTION$"                        0 KB       0 rows
      . . exported "SYS"."TSDP_SENSITIVE_DATA$"                    0 KB       0 rows
      . . exported "SYS"."TSDP_SENSITIVE_TYPE$"                    0 KB       0 rows
      . . exported "SYS"."TSDP_SOURCE$"                            0 KB       0 rows
      . . exported "SYSTEM"."REDO_LOG"                             0 KB       0 rows
      . . exported "WMSYS"."WM$BATCH_COMPRESSIBLE_TABLES$"         0 KB       0 rows
      . . exported "WMSYS"."WM$CONSTRAINTS_TABLE$"                 0 KB       0 rows
      . . exported "WMSYS"."WM$CONS_COLUMNS$"                      0 KB       0 rows
      . . exported "WMSYS"."WM$LOCKROWS_INFO$"                     0 KB       0 rows
      . . exported "WMSYS"."WM$MODIFIED_TABLES$"                   0 KB       0 rows
      . . exported "WMSYS"."WM$MP_GRAPH_WORKSPACES_TABLE$"         0 KB       0 rows
      . . exported "WMSYS"."WM$MP_PARENT_WORKSPACES_TABLE$"        0 KB       0 rows
      . . exported "WMSYS"."WM$NESTED_COLUMNS_TABLE$"              0 KB       0 rows
      . . exported "WMSYS"."WM$REMOVED_WORKSPACES_TABLE$"          0 KB       0 rows
      . . exported "WMSYS"."WM$RESOLVE_WORKSPACES_TABLE$"          0 KB       0 rows
      . . exported "WMSYS"."WM$RIC_LOCKING_TABLE$"                 0 KB       0 rows
      . . exported "WMSYS"."WM$RIC_TABLE$"                         0 KB       0 rows
      . . exported "WMSYS"."WM$RIC_TRIGGERS_TABLE$"                0 KB       0 rows
      . . exported "WMSYS"."WM$UDTRIG_DISPATCH_PROCS$"             0 KB       0 rows
      . . exported "WMSYS"."WM$UDTRIG_INFO$"                       0 KB       0 rows
      . . exported "WMSYS"."WM$VERSION_TABLE$"                     0 KB       0 rows
      . . exported "WMSYS"."WM$VT_ERRORS_TABLE$"                   0 KB       0 rows
      . . exported "WMSYS"."WM$WORKSPACE_SAVEPOINTS_TABLE$"        0 KB       0 rows
      Processing object type DATABASE_EXPORT/SCHEMA/TABLESPACE_QUOTA
      Processing object type DATABASE_EXPORT/RESOURCE_COST
      Processing object type DATABASE_EXPORT/TRUSTED_DB_LINK
      Processing object type DATABASE_EXPORT/DIRECTORY/DIRECTORY
      . . exported "SYS"."KU$\_USER_MAPPING_VIEW"               6.054 KB      36 rows
      Processing object type DATABASE_EXPORT/SYSTEM_PROCOBJACT/PRE_SYSTEM_ACTIONS/PROCACT_SYSTEM
      Processing object type DATABASE_EXPORT/SYSTEM_PROCOBJACT/PROCOBJ
      Processing object type DATABASE_EXPORT/SYSTEM_PROCOBJACT/POST_SYSTEM_ACTIONS/PROCACT_SYSTEM
      Processing object type DATABASE_EXPORT/SCHEMA/PROCACT_SCHEMA
      . . exported "SYSTEM"."SCHEDULER_JOB_ARGS"               8.640 KB       4 rows
      Processing object type DATABASE_EXPORT/EARLY_OPTIONS/VIEWS_AS_TABLES/TABLE
      Processing object type DATABASE_EXPORT/EARLY_POST_INSTANCE_IMPCALLOUT/MARKER
      . . exported "ORDDATA"."ORDDCM_DOCS"                     252.9 KB       9 rows
      Processing object type DATABASE_EXPORT/NORMAL_OPTIONS/TABLE
      . . exported "SYSTEM"."SCHEDULER_PROGRAM_ARGS"           10.18 KB      22 rows
      . . exported "SYS"."AUDTAB$TBS$FOR_EXPORT"               5.929 KB       2 rows
      . . exported "SYS"."NACL$\_ACE_EXP"                       9.906 KB       1 rows
      . . exported "SYS"."NACL$\_HOST_EXP"                      6.890 KB      1 rows
      . . exported "WMSYS"."WM$EXP_MAP"                        7.695 KB       3 rows
      . . exported "SYS"."DBA_SENSITIVE_DATA"                      0 KB       0 rows
      . . exported "SYS"."DBA_TSDP_POLICY_PROTECTION"              0 KB       0 rows
      . . exported "SYS"."FGA_LOG$FOR_EXPORT"                      0 KB       0 rows
      . . exported "SYS"."NACL$\_WALLET_EXP"                        0 KB       0 rows
      . . exported "C##ABBAS"."T"                              72.67 MB  667728 rows
      Processing object type DATABASE_EXPORT/NORMAL_OPTIONS/VIEWS_AS_TABLES/TABLE
      Processing object type DATABASE_EXPORT/NORMAL_POST_INSTANCE_IMPCALLOU/MARKER
      Processing object type DATABASE_EXPORT/SCHEMA/TABLE/TABLE
      Processing object type DATABASE_EXPORT/SCHEMA/TABLE/STATISTICS/TABLE_STATISTICS
      Processing object type DATABASE_EXPORT/STATISTICS/MARKER
      Processing object type DATABASE_EXPORT/FINAL_POST_INSTANCE_IMPCALLOUT/MARKER
      Processing object type DATABASE_EXPORT/SCHEMA/POST_SCHEMA/PROCOBJ
      Processing object type DATABASE_EXPORT/SCHEMA/POST_SCHEMA/PROCACT_SCHEMA
      Processing object type DATABASE_EXPORT/AUDIT_UNIFIED/AUDIT_POLICY_ENABLE
      Processing object type DATABASE_EXPORT/AUDIT
      Processing object type DATABASE_EXPORT/POST_SYSTEM_IMPCALLOUT/MARKER
      Master table "SYS"."SYS_EXPORT_FULL_01" successfully loaded/unloaded
      ******************************************************************************
      Dump file set for SYS.SYS_EXPORT_FULL_01 is:
        /backup/exp/prodcdb/exp_cdb_full_01.dmp
        /backup/exp/prodcdb/exp_cdb_full_02.dmp
        /backup/exp/prodcdb/exp_cdb_full_03.dmp
      Job "SYS"."SYS_EXPORT_FULL_01" successfully completed at Thu Mar 26 13:49:26 2015 elapsed 0 00:08:34

The output shows that only the objects that belong to the root container are
exported with the `full` option. Unfortunately, there's no way to take an
export of all of the PDBs and the root container together.

### Taking an export of a CDB

Taking an export of the CDB or root database isn't typically
required because it primarily hosts PDBs. However, if it becomes
necessary to perform this task, you can create a new CDB and plug the existing
PDBs. In these cases, administrators are usually most interested in taking an
export of the common users and roles.

For example, imagine that you have the following common user in a CDB:

```
sys@PRODCDB> select USERNAME, COMMON from dba_users where common='YES' and oracle_maintained='N';

USERNAME        COM
--------------- ---
C##ABBAS        YES
```

You can take an export of the common users and roles that belong to a CDB by
using the following command to initiate EXPDP for the CDB:

      [oracle@labserver ~]$ expdp directory=DATA_PUMP_DIR dumpfile=common_usr_cdb.dmp logfile=common_usr_cdb.log schemas=C##ABBAS

The following code block shows the output for this command:

```
Export: Release 12.1.0.1.0 - Production on Thu Mar 26 23:45:26 2015

Copyright (c) 1982, 2013, Oracle and/or its affiliates.  All rights reserved.

Username: / as sysdba

Connected to: Oracle Database 12c Enterprise Edition Release 12.1.0.1.0 - 64bit Production
With the Partitioning, Automatic Storage Management, OLAP, Advanced Analytics
and Real Application Testing options

WARNING: Oracle Data Pump operations are not typically needed when connected to the root or seed of a container database.

Starting "SYS"."SYS_EXPORT_SCHEMA_01":  /******** AS SYSDBA directory=DATA_PUMP_DIR dumpfile=common_usr_cdb.dmp logfile=common_usr_cdb.log schemas=C##ABBAS
Estimate in progress using BLOCKS method...
Processing object type SCHEMA_EXPORT/TABLE/TABLE_DATA
Total estimation using BLOCKS method: 88 MB
Processing object type SCHEMA_EXPORT/USER
Processing object type SCHEMA_EXPORT/SYSTEM_GRANT
Processing object type SCHEMA_EXPORT/ROLE_GRANT
Processing object type SCHEMA_EXPORT/DEFAULT_ROLE
Processing object type SCHEMA_EXPORT/PRE_SCHEMA/PROCACT_SCHEMA
Processing object type SCHEMA_EXPORT/TABLE/TABLE
Processing object type SCHEMA_EXPORT/TABLE/STATISTICS/TABLE_STATISTICS
Processing object type SCHEMA_EXPORT/STATISTICS/MARKER
. . exported "C##ABBAS"."T"                              72.67 MB  667728 rows
Master table "SYS"."SYS_EXPORT_SCHEMA_01" successfully loaded/unloaded
******************************************************************************
Dump file set for SYS.SYS_EXPORT_SCHEMA_01 is:
  /backup/exp/prodcdb/common_usr_cdb.dmp
Job "SYS"."SYS_EXPORT_SCHEMA_01" successfully completed at Thu Mar 26 14:16:53 2015 elapsed 0 00:01:16
```

Ideally, you wouldn't need to take an export of the root container
objects unless you had data that belongs to the common users in that
container.

### Conclusion

Following the steps outlined in this blog post will help you use Data
Pump 12c's new features to export data more easily. [Part
2](https://developer.rackspace.com/blog/datapump2/) covers
Data Pump's restrictions on PDBs and how to export these databases.

### References

The following document was used as a reference for this blog post:

- [Changes in This Release for Oracle Database
  Utilities](https://docs.oracle.com/database/121/SUTIL/GUID-F4EE2A42-3986-4597-9088-A506173ABABF.htm#SUTIL4298)

Use the Feedback tab to make any comments or ask questions.
