---
layout: post
title: "How to setup a heterogeneous database link using dg4odbc"
date: 2022-12-23
comments: true
author: Jay Pathak
authorAvatar: 'https://secure.gravatar.com/avatar/fe760f04d55e5c342a5c0150d92085eb'
bio: ""
published: true
authorIsRacker: true
categories:
    - SQL Server
    - ODBC
    - Databases
metaTitle: "How to setup a heterogeneous database link using dg4odbc"
metaDescription: "Nowadays companies use different database technologies for keeping their data and often they need to access data from one data source to another data source."
ogTitle: "How to setup a heterogeneous database link using dg4odbc"
ogDescription: "Nowadays companies use different database technologies for keeping their data and often they need to access data from one data source to another data source."
slug: "how-to-setup-a-heterogeneous-database-link-using-dg4odbc"

---

#### Introduction

Nowadays companies use different database technologies for keeping their data and often they need to access data from one data source to another data source. However, as the data is on different database products, it does not work, and this takes up lots of effort on part of the developer to intermix data between different databases.
<!--more-->

This blog discusses how one can access data with cross-platform/cross-technology databases using the Database Link object. Through the following example, I will explain how to access data between ORACLE and an MS-SQL database using DBLINK. 
____________________________________________________________________________________________

1. You need to first install the ODBC Driver for SQL Server/MySQL server on the server where you want to create the DB link.

2. Create the init file in $ORACLE_HOME/hs/admin as follows:

 {{< highlight sql >}}
[oracle@ip_machine admin]$ cat initORADB.ora
HS_FDS_CONNECT_INFO = ORADB
HS_FDS_SHAREABLE_NAME = /usr/lib64/libodbc.so
HS_FDS_TRACE_LEVEL = 0
HS_LANGUAGE = AMERICAN_AMERICA.WE8MSWIN1252
HS_KEEP_REMOTE_COLUMN_SIZE = LOCAL
HS_NLS_LENGTH_SEMANTICS = CHAR
HS_NLS_NCHAR = UCS2
HS_FDS_PROC_IS_FUNC = TRUE
HS_FDS_RESULTSET_SUPPORT = TRUE
{< /highlight>}

```
set LD_LIBRARY_PATH=/opt/microsoft/msodbcsql17/lib64:/usr/lib64:/apps/oracle/product/12.2.0/dbhome_1/lib
set ODBCINI=/apps/oracle/product/12.2.0/dbhome_1/hs/admin/odbc.ini
```

3) Create the odbc.ini and add the value of driver location /source server name/ DB name/username & password.
[oracle@ip_machine admin]$ cat odbc.ini
[ODBC Data Sources]
ORADB=MS SQL Server
[ORADB]
```
Driver=/opt/microsoft/msodbcsql17/lib64/libmsodbcsql-17.5.so.2.1
Description=Microsoft ODBC Driver 17 for SQL Server
Server= tcp:MSSQLSERVER_HOSTNAME.,1433
Database=IOPS_DATA_Warehouse
User=ORADB
Password=xxxxx
QuotedId=YES
AnsiNPW=YES
Threading=1
UsageCount=1
AutoTranslate=No
```

4. Create the listener or add it to the existing listener. In this case, I am creating a new listener and initializing the same. 

{{< highlight sql >}}
MSSQL =
 (DESCRIPTION_LIST =
  (DESCRIPTION =
   (ADDRESS = (PROTOCOL = TCP)(HOST = ip_machine)(PORT = 1523))
  )
 )
SID_LIST_MSSQL =
(SID_LIST =
 (SID_DESC =
  (SID_NAME = ORADB)
  (ORACLE_HOME = /apps/oracle/product/12.2.0/dbhome_1)
  (PROGRAM = /apps/oracle/product/12.2.0/dbhome_1/bin/dg4odbc)
  (ENVS = "LD_LIBRARY_PATH=/opt/microsoft/msodbcsql17/lib64/libmsodbcsql-17.5.so.2.1:/opt/microsoft/msodbcsql17/lib64:/usr/lib64:/apps/oracle/product/12.2.0/dbhome_1/lib")
 )
)
{{< highlight >}}

5.  Add the TNS Entry in $ORACLE_HOME/network/admin
```
ORADB =
 (DESCRIPTION =
  (ADDRESS = (PROTOCOL = tcp)(HOST = ip_machine)(PORT = 1523))
  (CONNECT_DATA =
   (SID = ORADB)
  )
  (HS = OK)
 )
```

6. Log in to the database and create the public database link.
```
create public database link IOPS_DATA_WAREHOUSE connect to ORADB identified by "xxxx" using 'ORADB';
Database link created.
SQL> select * from dual@IOPS_DATA_WAREHOUSE;
D
X
```
 With the above, the database link between cross-database technology is created and tested successfully. 

 #### Conclusion

 Though it takes a bit of an effort to create a Database link between platforms, it makes it very convenient while accessing data between cross-platforms. 



























<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).