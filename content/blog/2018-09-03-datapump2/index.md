---
layout: post
title: "Working with Data Pump enhancements in Oracle Database 12c: Part 2"
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
database objects in and across databases. [Part
1](https://developer.rackspace.com/blog/datapump1/) of this two-part blog post
series discussed the introduction of multitenant architecture in Oracle
Database 12c and how to use Data Pump to export and import data. Part 2 covers
how to take an export of only pluggable databases (PDBs) and the restrictions
that Data Pump places on PDBs.

<!--more-->

### Taking an export of a PDB

In the case of a container database (CDB), the actual data belongs to the
underlying PDB, and each PDB appears as a non-CDB (standard Oracle database)
to the client. Therefore, it makes sense to take an export of the objects
from a PDB.

![An architectural diagram of the Data Pump
service](picture1.png)

Image source: [Data Pump
architecture](https://www.packtpub.com/mapt/book/big_data_and_business_intelligence/9781847196286/1/ch01lvl1sec02/data-pump-architecture)

Using a Data Pump export for PDBs is identical to using a Data Pump export for
a non-CDB database. The only difference in using the Data Pump export utility
for a PDB is that you must use a connect identifier, or Transparent Network
Substrate (TNS) alias, in the export command prompt when you initiate the
export. This step ensures that you're initiating the Data Pump export for a
specific PDB.

For example, you can take an export of the user `ABBAS` belonging to the
PDB named `PRODPDB1` with the following command:

      [oracle@labserver ~]$ expdp directory=DP_PDB1 dumpfile=pdb1_abbas.dmp logfile=pdb1_abbas.log schemas=abbas

The following code block shows the output for this command:

```
Export: Release 12.1.0.1.0 - Production on Fri Mar 27 00:08:09 2015

Copyright (c) 1982, 2013, Oracle and/or its affiliates.  All rights reserved.

Username: sys@prodpdb1 as sysdba
Password:

Connected to: Oracle Database 12c Enterprise Edition Release 12.1.0.1.0 - 64bit Production
With the Partitioning, Automatic Storage Management, OLAP, Advanced Analytics
and Real Application Testing options
Starting "SYS"."SYS_EXPORT_SCHEMA_01":  sys/********@prodpdb1 AS SYSDBA directory=DP_PDB1 dumpfile=pdb1_abbas.dmp logfile=pdb1_abbas.log schemas=abbas
Estimate in progress using BLOCKS method...
Processing object type SCHEMA_EXPORT/TABLE/TABLE_DATA
Total estimation using BLOCKS method: 64 KB
Processing object type SCHEMA_EXPORT/USER
Processing object type SCHEMA_EXPORT/SYSTEM_GRANT
Processing object type SCHEMA_EXPORT/ROLE_GRANT
Processing object type SCHEMA_EXPORT/DEFAULT_ROLE
Processing object type SCHEMA_EXPORT/PRE_SCHEMA/PROCACT_SCHEMA
Processing object type SCHEMA_EXPORT/TABLE/TABLE
Processing object type SCHEMA_EXPORT/TABLE/STATISTICS/TABLE_STATISTICS
Processing object type SCHEMA_EXPORT/STATISTICS/MARKER
. . exported "ABBAS"."TAB1"                              67.85 KB      41 rows
Master table "SYS"."SYS_EXPORT_SCHEMA_01" successfully loaded/unloaded
******************************************************************************
Dump file set for SYS.SYS_EXPORT_SCHEMA_01 is:
  /backup/exp/prodpdb1/pdb1_abbas.dmp
Job "SYS"."SYS_EXPORT_SCHEMA_01" successfully completed at Thu Mar 26 14:39:44 2015 elapsed 0 00:01:08
```

Note that the command that passed in the user name also specified the connect identifier for the PDB named `PRODPDB1`.

```
[oracle@labserver ~]$ expdp directory=DP_PDB1 dumpfile=pdb1_abbas.dmp logfile=pdb1_abbas.log schemas=abbas

Export: Release 12.1.0.1.0 - Production on Fri Mar 27 00:08:09 2015

Copyright (c) 1982, 2013, Oracle and/or its affiliates.  All rights reserved.

Username: sys@prodpdb1 as sysdba
Password:
```

The following code blocks shows that the connect identifier (`prodpdb1`) is
resolving to the PDB named `PRODPDB1`.

      [oracle@labserver ~]$ tnsping prodpdb1

      TNS Ping Utility for Linux: Version 12.1.0.1.0 - Production on 27-MAR-2015 00:11:54

      Copyright (c) 1997, 2013, Oracle.  All rights reserved.

      Used parameter files:
      /app/oracle/db/12.1.0.1/network/admin/sqlnet.ora


      Used TNSNAMES adapter to resolve the alias
      Attempting to contact (DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = labserver.home.com)(PORT = 1525)) (CONNECT_DATA = (SERVER = DEDICATED) (SERVICE_NAME = prodpdb1)))
      OK (10 msec)

### Data Pump restrictions on PDBs

It's important to note that Data Pump doesn't allow you to use a directory
that's owned by the root container or CDB for imports and exports. You also
can't use one that's owned by a different PDB.

Instead, you need to create a directory under the PDB. The PDB must own the
directory for you to use Data Pump export and import functionality.

If you try to use a directory that belongs to another PDB or the root
container, the command returns the following errors:

      [oracle@labserver ~]$ expdp directory=DP_PDB2 dumpfile=pdb1_abbas.dmp logfile=pdb1_abbas.log schemas=abbas

      Export: Release 12.1.0.1.0 - Production on Fri Mar 27 00:21:08 2015

      Copyright (c) 1982, 2013, Oracle and/or its affiliates.  All rights reserved.

      Username: sys@prodpdb1 as sysdba
      Password:

      Connected to: Oracle Database 12c Enterprise Edition Release 12.1.0.1.0 - 64bit Production
      With the Partitioning, Automatic Storage Management, OLAP, Advanced Analytics
      and Real Application Testing options
      ORA-39002: invalid operation
      ORA-39070: Unable to open the log file.
      ORA-39087: directory name DP_PDB2 is invalid

Also, you can't use the default directory `DATA_PUMP_DIR` to export or import a
PDB with Data Pump. This limitation exists because `DATA_PUMP_DIR` is
always owned by the root container and its ownership cannot be altered.

If you try to create the default `DATA_PUMP_DIR` inside of a PDB, the command
returns the following errors:

      sys@PRODPDB1> show con_name

      CON_NAME
      ------------------------------
      PRODPDB1
      sys@PRODPDB1> create or replace directory DATA_PUMP_DIR as '/backup/exp/prodpdb1';
      create or replace directory DATA_PUMP_DIR as '/backup/exp/prodpdb1'
      *
      ERROR at line 1:
      ORA-65040: operation not allowed from within a pluggable database

As a result, you must always create a directory explicitly for a PDB in order
to perform a Data Pump export or import.

### Conclusion

The Data Pump utility is an enhanced export and import tool that Oracle
introduced with Oracle 10g. Leveraging the expdp enhancements in Oracle
Database 12c that are covered in Parts 1 and 2 of this blog post series
helps you maximize this utility.

Use the Feedback tab to make any comments or ask questions.

### References

The following document was used as a reference for this blog post:

- [Changes in This Release for Oracle Database
  Utilities](https://docs.oracle.com/database/121/SUTIL/GUID-F4EE2A42-3986-4597-9088-A506173ABABF.htm#SUTIL4298)
