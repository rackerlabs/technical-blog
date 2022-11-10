---
layout: post
title: "Database Auditing"
date: 2022-11-10
comments: true
author: Santosh Kumar Vempalli
authorAvatar: 'https://secure.gravatar.com/avatar/d6b119ffe9b65f3c674e7c7f1570a397'
bio: ""
published: true
authorIsRacker: true
categories:
    - Databases
    
metaTitle: "Database Auditing"
metaDescription: "Database auditing monitors the activities occurring in a database. Oracle has functions that allow us to audit actions in the database and against the database."
ogTitle: "Database Audting"
ogDescription: "Database auditing monitors the activities occurring in a database. Oracle has functions that allow us to audit actions in the database and against the database."
slug: "database-auditing"

---
Database auditing monitors the activities occurring in a database. Oracle has functions that allow us to audit actions in the database and against the database. 
<!--more-->

#### Introduction
The Database auditing facility is an action-based process that runs SQL statements that meet a specific requirement.

**Types of Auditing:**

1.	Schema object auditing
2.	SQL statement auditing
3.	SQL privilege auditing
`

- **Schema object auditing:** It allows us to specify schema objects to be audited.
 - **SQL statement auditing:** It allows us to specify SQL statements to be audited.
 - **SQL privilege auditing:** It allows us to specify system privileges to be audited.


**Scope of Audit:**

<img src=Picture1.png title="database-auditing" alt="database auditing" >

The audit facility allows you to specify the scope of audit actions as follows:

- **By user:** This allows us to audit a certain user, by default it is all users.
- **Whenever Successful/Whenever unsuccessful**: This allows us to specify whether we want auditing to always occur or only whether the specific action was successful or unsuccessful. By default, it is BOTH.
- **By Session/ By Access:** This allows us to assign how frequently audit files are to be created. By default, it is by access.
*A stream pool* is utilized to build a buffer for the data pump.

**Limits of Auditing:**
Database auditing service works on the statement level only. It will record a scenario in case a specific user has run a select query against a particular table, but it is incapable of telling you which rows have been retrieved.  This enables auditing to the database.

**Implementing Auditing:** 
Auditing can be activated by following steps:

-	Enable auditing at the database level with the init.ora parameter (AUDIT_TRAIL).
-	Enable the level of auditing through the audit SQL statement.

The audit_trail parameter must be enabled for auditing to work. Available values are DB, NONE, and OS. Parameters can be as below:

```
Audit_trail=true[audit_trail=db] or audit_trail=false[audit_trail=none] or audit_trail=os
Audit_trail=db: 
```

This enables auditing to the internal data dictionary

```Audit_trail=os:``` This enables auditing of the OS audit trail. When set to OS another parameter AUDIT_FILE_DEST must be set in the ```init.ora``` for dumping audit_trail files in the OS.
```AUDIT_TRAIL=none```: This disables all auditing.

**Note:** DB bounce is not needed if you change the objects auditing. DB bounce is needed only if you switch off or on all auditing.

**Audit trail views**:
```
Dba_audit_object, dba_audit_session, dba_audit_statement, dba_audit_trail, dba_object_audit_opts, dba_stmt_audit_opts, dba_priv_audit_opts, dba_audit_exists, audit_actions
```

**Scenarios:**

1. Statement Level Auditing:

```
SYS > audit create session whenever not successful.
SYS > select user_name, audit_option, success,failure from dba_stmt_audit_opts;
SYS > save dba_stmt_audit_opts
SYS > select os_username, username, terminal, action_name, to_char(timestamp, ‘dd/mm/yyyy:hh24:mi:ss’) time_stamp from dba_audit_session;
SYS > save dba_audit_sessions;
SYS > audit table by U_SCOTT;
SYS > @dba_stmt_audit_opts
SYS > conn U_SCOTT/U_SCOTT
U_SCOTT > create table test (tno number);
SYS > select os_username, username,owner,action_name,obj_name,to_char(timestamp, ‘dd/mm/yyyy:hh24:mi:ss’) as time_stamp from dba_audit_trail;
SYS > save dba_audit_trail;
```

2. Object Level Auditing:
```
SYS > audit select on u_scott.dept whenever successful;
SYS > select owner,object_name,object_type,sel,upd,del from dba_obj_audit_opts where owner=’U_SCOTT’;
SYS > save dba_obj_audit_opts
U_SCOTT > select * from dept;
SYS > @dba_audit_trail
SYS > audit update on u_scott.emp by access whenever at unsuccessful;
SYS > @dba_obj_audit_opts
U_SCOTT > update emp set sal=6000 where empno=’U_SCOTT’;
U_SCOTT > update emp set sal=7000 where empno=’U_SCOTT’;
U_SCOTT > update emp set sal=8000 where empno=’U_SCOTT’;
SYS > @dba_audit_trail
```

3.	Privilege Level Auditing:

```
SYS > audit create view by u_scott whenever successful;
SYS > select user_name, privilege, success, failure from dba_priv_audit_opts;
SYS > save dba_priv_audit_opts
u_scott > create view v_test as select * from emp; 
SYS > @dba_audit_trail
```

4. **Disabling Audit:**

```
SYS > @dba_stmt_audit_opts
SYS > noaudit table by u_scott;
SYS > @dba_stmt_audit_opts
SYS > noaudit create session;
SYS > noaudit create view by u_scott;
SYS > @dba_stmt_audit_opts
SYS > @dba_priv_audit_opts
In DB level init.ora file remove parameter audit_trail=true
```
**Fine-Grained Auditing:**
It is used for monitoring and accessing the data in the database based on the rules or SQL statements. There is an in-built process in the database that obstructs users from skipping the audit.

It provides an expandable view in creating different policies to audit DML statements on objects like views and tables.

Policies combined with the objects may also define appropriate columns so that any given statement type touching an applicable column is audited.

**Note:** AUDIT_TRAIL parameter is not needed to enable sys auditing or FGA.


#### Conclusion

  I hope the above helps in a clear understanding of “Database Auditing,” and also how to capture the database activities through auditing. 



<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).