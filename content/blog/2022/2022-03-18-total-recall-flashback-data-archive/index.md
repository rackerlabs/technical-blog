---
layout: post
title: "TOTAL RECALL (FLASHBACK DATA ARCHIVE)"
date: 2022-03-18
comments: true
author: Amit Srivastava
authorAvatar: 'https://secure.gravatar.com/avatar/84fe90752eabb62b20e99d95e5a77142'
bio: ""
published: true
authorIsRacker: true
categories:
    - Database
    - General
metaTitle: "TOTAL RECALL (FLASHBACK DATA ARCHIVE)"
metaDescription: "Flashback data archive provides the ability to automatically track and archive transactional data changes to specified database objects."
ogTitle: "TOTAL RECALL (FLASHBACK DATA ARCHIVE)"
ogDescription: "Flashback data archive provides the ability to automatically track and archive transactional data changes to specified database objects. "
slug: "total-recall-flashback-data-archive"

---

Flashback data archive provides the ability to automatically track and archive transactional data changes to specified database objects. 
<!--more-->

### Description

A flashback data archive consists of multiple tablespaces and stores historic data from all transactions against tracked tables. The data is stored on the internal history tables.
It provides long term storage of undo data, allowing undo-based flashback operations to be performed over an extended period.
To maintain the strict protection on the internal historical table and maintain the historical data for short and long period, Flash Data Archive is an option which helps recalling without restoring the historical backup. 

<img src=Picture1.png title="" alt="">

### Required Privileges to execute 

-	Schema with FLASHBACK ARCHIVE ADMINISTER system privilege can execute the disassociation and reassociation of the PL/SQL procedures. 
-	Once a table is disassociated, normal users can perform DDL and DML statements if they have the necessary privileges on the tables.
-	FLASHBACK ARCHIVE ADMINISTER system privilege requirea creating a flashback data archive. 
-	One must have CREATE TABLESPACE system privilege to create a flashback data archive
-	Ensure you sufficient quota on the tablespace in which the historical information will reside. 

Context information is stored with the transaction data, you need to use the DBMS_FLASHBACK_ARCHIVE.SET_CONTEXT_LEVEL procedure, passing one of the following parameter values.
-	TYPICAL: Only basic auditing attributes from the USERENV context are stored.
-	ALL: All contexts available to the user via the SYS_CONTEXT function is stored.
-	NONE: No context information is stored.

In this case use ALL, to capture the USERENV and custom context values.

`CONN sys@surya AS SYSDBA`

`EXEC DBMS_FLASHBACK_ARCHIVE.set_context_level('ALL');`


### Testing And Implementation

In the following example, I am enabling the FDA at tablespace level, and setting the retention for specific period for multiple tablespaces. Also retrieving data from flashback data archive which has been deleted between the retention period. The intent is to get the historical data easily with FAD. Without enabling this feature, we have to restore the entire database to get the historical data. Something that adds to complexity is case of a large database system.

#### Example:
•	Command for creating a tablespace  

`SQL> CREATE TABLESPACE FBA DATAFILE size 500m autoextend on next 100m  ;`

Tablespace created.

•	Run the following command for creating a default flashback data archive (FDA)

`SQL> CREATE FLASHBACK ARCHIVE DEFAULT FLA1 TABLESPACE FBA QUOTA 500M RETENTION 1 YEAR;`

*Flashback archive created.*

•	Complete the following step for Creating Non-Default FDA

`SQL> CREATE FLASHBACK ARCHIVE FLA2 TABLESPACE users QUOTA 400M RETENTION 6 MONTH;`

*Flashback archive created.*

•	Get the list of FDAs created 

SELECT owner_name,
       flashback_archive_name,
       
       flashback_archive#,
       
       retention_in_days,
       
       TO_CHAR(create_time, 'DD-MON-YYYY HH24:MI:SS') AS create_time,
       
       TO_CHAR(last_purge_time, 'DD-MON-YYYY HH24:MI:SS') AS last_purge_time,
       status

FROM   dba_flashback_archive

ORDER BY owner_name, flashback_archive_name;

OWNER_NAME FLASHBACK_ARCHIVE_NAME FLASHBACK_ARCHIVE# RETENTION_IN_DAYS CREATE_TIME          LAST_PURGE_TIME      STATUS
---------- ---------------------- ------------------ ----------------- -------------------- -------------------- -------
SYS        FLA1                                    1               365 16-DEC-2021 19:28:53 16-DEC-2021 19:28:53 DEFAULT
SYS        FLA2                                    2               180 16-DEC-2021 19:29:14 16-DEC-2021 19:29:14


•	Setting Default FDA and get the details 

`SQL> ALTER FLASHBACK ARCHIVE FLA1 SET DEFAULT ;`

Flashback archive altered.


`SELECT flashback_archive_name,`
       `flashback_archive#,`
       `tablespace_name,`
       `quota_in_mb`
FROM   `dba_flashback_archive_ts`
ORDER BY `flashback_archive_name; ` 

FLASHBACK_ARCHIVE_NAME FLASHBACK_ARCHIVE# TABLESPACE_NAME QUOTA_IN_MB
---------------------- ------------------ --------------- -----------
FLA1                                    1 FBA             500

FLA2                                    2 USERS           400


SQL> `SELECT *`
` FROM DBA_FLASHBACK_ARCHIVE_TABLEs`
` WHERE TABLE_NAME='EMPLOYEES'`
 `AND OWNER_NAME='HR' ;`


TABLE_NAME     OWNER_NAME FLASHBACK_ARCHIVE_NAME ARCHIVE_TABLE_NAME      STATUS
-------------- ---------- ---------------------- ----------------------- -------------
EMPLOYEES      HR         FLA1                   SYS_FBA_HIST_92593      ENABLED



###	Perform the following test and to see how it works 
SQL> ALTER SESSION SET NLS_DATE_FORMAT='YYYY/MM/DD HH24:MI:SS';

Session altered.

SQL>
SQL> SELECT SYSDATE FROM DUA;

SYSDATE
-------------------
2021/12/16 19:39:31

SQL> SELECT DBMS_FLASHBACK.GET_SYSTEM_CHANGE_NUMBER FROM DUAL;


GET_SYSTEM_CHANGE_NUMBER
------------------------
                 1964623



#### Let us try to delete record and update on employees table.


SQL> `DELETE FROM HR.EMPLOYEES WHERE EMPLOYEE_ID=192;`

1 row deleted.

SQL> commit;

Commit complete.

SQL>
SQL>
SQL>
SQL> `UPDATE HR.EMPLOYEES SET SALARY=12000 WHERE EMPLOYEE_ID=168;`

COMMIT;

`UPDATE HR.EMPLOYEES SET SALARY=12500 WHERE EMPLOYEE_ID=168;`

COMMIT;

`UPDATE HR.EMPLOYEES SET SALARY=12550 WHERE EMPLOYEE_ID=168;`

COMMIT;
1 row updated.

SQL> SQL>
Commit complete.

SQL> SQL>
1 row updated.

SQL> SQL>
Commit complete.

SQL> SQL>
1 row updated.

SQL> SQL>

Commit complete.

-	Follow the steps for comparing  data using FDA 

SQL> `SELECT EMPLOYEE_ID, FIRST_NAME, LAST_NAME`
  `FROM HR.EMPLOYEES`
  `AS OF TIMESTAMP TO_TIMESTAMP('2021/12/16 19:39:31','YYYY/MM/DD HH24:MI:SS')`
`MINUS`
`SELECT EMPLOYEE_ID, FIRST_NAME, LAST_NAME`
  `FROM HR.EMPLOYEES;  `

EMPLOYEE_ID FIRST_NAME           LAST_NAME
----------- -------------------- -------------------------
        192 Sarah                Bell

Here you can see the deleted row from FDA. You can also get the data with VERSION_STARTSCN pseudcoumns.

#### •	Data with given SCN

SQL>   `COL VERSIONS_STARTTIME FORMAT A40`
`SELECT     VERSIONS_STARTTIME,`
 `          VERSIONS_STARTSCN,`
           `FIRST_NAME,`
           `LAST_NAME,`
           `SALARY`
  `FROM HR.EMPLOYEES VERSIONS BETWEEN TIMESTAMP`
`  TO_TIMESTAMP('2021/12/16 19:39:31','YYYY/MM/DD HH24:MI:SS') AND`
  `SYSTIMESTAMP`

`WHERE`

`  EMPLOYEE_ID=168;   `

VERSIONS_STARTTIME               VERSIONS_STARTSCN FIRST_NAME LAST_NAME SALARY
-------------------------------- ----------------- ---------- --------- ------
16-DEC-21 07.40.08.000000000 PM            1964648 Lisa       Ozer       12500
16-DEC-21 07.40.08.000000000 PM            1964646 Lisa       Ozer       12000
                                                   Lisa       Ozer       11500
16-DEC-21 07.40.08.000000000 PM            1964650 Lisa       Ozer       12550

You can see the row with different version for same data in salary column as we have done update statement on salary column with 500 value difference.


### Restriction and Workaround for DDL statement (capture the evolution of a recording)

**Disassociate / Associate**

For more complex DDL – upgrades, split table, etc. – the Disassociate and Associate PL/SQL procedures can be used to temporarily disable Flashback Data Archive on specified tables. The Associate procedure enforces schema integrity after association: the base table and history table schemas must be the same. The Disassociate and Associate procedures require the FLASHBACK ARCHIVE ADMINISTER privilege.

o	Add, Delete, Rename or Edit a column
o
	Delete or truncate a partition

o	Rename or truncate a table (a table with FBA Delete fails with error ORA- 55610)

o	Some changes (e.g.:  MOVE / SPLIT / CHANGE PARTITIONS) methods require DBMS_FLASHBACK_ARCHIVE package to do it. 


#### In the following example you can see how we can perform a DDL activity on FDA tables for historical data. Creating a demo table EMPLOYEES_FBA adding constraints.

SQL> `CREATE TABLE HR.EMPLOYEES_FBA AS SELECT * FROM HR.EMPLOYEES;`

Table created.

SQL> `ALTER TABLE HR.EMPLOYEES_FBA ADD CONSTRAINT employee_pk PRIMARY KEY (employee_id);`

Table altered.
 
#### Enable FDA on demo tables and updating some records.

SQL> `ALTER TABLE HR.EMPLOYEES_FBA FLASHBACK ARCHIVE;`

Table altered.

SQL> `UPDATE HR.EMPLOYEES_FBA SET SALARY=10000 WHERE EMPLOYEE_ID=203;`

1 row updated.

`COMMIT;`

Commit complete.

#### When disabling and enabling the table constraints, the ORA-55610 prompt  prevents the historical track data table

SQL> `ALTER TABLE HR.EMPLOYEES_FBA DISABLE CONSTRAINT EMPLOYEE_PK;`


Table altered.

SQL> SQL> `ALTER TABLE HR.EMPLOYEES_FBA ENABLE CONSTRAINT EMPLOYEE_PK;`
`ALTER TABLE HR.EMPLOYEES_FBA ENABLE CONSTRAINT EMPLOYEE_PK`
*
ERROR at line 1:
ORA-55610: Invalid DDL statement on history-tracked table


#### Now how to proceed when we are getting these restrictions

*Note: Addition of any constraint on a table (Primary Key, Unique Key, Foreign Key or Check Constraint) will cause you to be unable to automatically read the historical data, without directly accessing the underlining SYS_FBA_ archive tables.*
*You need to be very careful with constraint management and the historical tracking of tables*

SQL> `SELECT * FROM DBA_FLASHBACK_ARCHIVE_TABLES WHERE TABLE_NAME='EMPLOYEES_FBA';`


TABLE_NAME     OWNER_NAME FLASHBACK_ARCHIVE_NAME ARCHIVE_TABLE_NAME      STATUS
-------------- ---------- ---------------------- ----------------------- -------------
EMPLOYEES_FBA    HR         FLA1                   SYS_FBA_HIST_93946      ENABLED


#### With the help of DBMS_FLASHBACK_ARCHIVE.DISASSOCIATE_FBA we can achieve this.

`SQL> EXEC DBMS_FLASHBACK_ARCHIVE.DISASSOCIATE_FBA('HR','EMPLOYEES_FBA');`

PL/SQL procedure successfully completed.

#### Now again try to enable the constraints

SQL> `ALTER TABLE HR.EMPLOYEES_FBA ENABLE CONSTRAINT EMPLOYEE_PK;`

Table altered.

#### Now reenable the restriction with the help of DBMS_FLASHBACK_ARCHIVE.REASSOCIATE_FBA

SQL> `EXEC DBMS_FLASHBACK_ARCHIVE.REASSOCIATE_FBA('HR','EMPLOYEES_FBA');`

PL/SQL procedure successfully completed.

**Purging the historical data for a specific time.**
SQL> `ALTER FLASHBACK ARCHIVE FLA1 PURGE BEFORE TIMESTAMP (SYSTIMESTAMP - INTERVAL '1' DAY);`

Flashback archive altered.

#### Disable FDA
SQL> `ALTER TABLE HR.EMPLOYEES NO FLASHBACK ARCHIVE;`

SQL> `ALTER TABLE HR.EMPLOYEES_FBA NO FLASHBACK ARCHIVE;`

#### Dropping FDA

SQL> `DROP FLASHBACK ARCHIVE FLA1;`


### Conclusion 

The Flashback Data Archive feature provides a centralized and integrated interface to manage and retain data history, and automated, policy based management that provides the dramatic solution for database administration where tracking of this historical data to comply with new regulations or adapt to changing business needs.



<a class="cta red" id="cta" href="https://www.rackspace.com/data/databases">Let our experts guide you on your database journey.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
