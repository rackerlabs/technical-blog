---
layout: post
title: "Intro to MSSQL Server Audit Feature"
date: 2022-12-16
comments: true
author: Varun Jha
authorAvatar: 'https://secure.gravatar.com/avatar/000f2b0d724501b27116cd5f3007e171'
bio: ""
published: true
authorIsRacker: true
categories:
    - Databases
    - SQL Server
metaTitle: "Intro to MSSQL Server Audit Feature"
metaDescription: "It is always a challenge to configure audits and capture schema changes for a longer duration in the SQL Server. These details are captured by default traces; however, their retention is limited. Also, it is quite a task to set up SQL audits in every user database."
ogTitle: "Intro to MSSQL Server Audit Feature"
ogDescription: "It is always a challenge to configure audits and capture schema changes for a longer duration in the SQL Server. These details are captured by default traces; however, their retention is limited. Also, it is quite a task to set up SQL audits in every user database."
slug: "intro-to-mssql-server-audit-feature"

---

It is always a challenge to configure audits and capture schema changes for a longer duration in the SQL Server. These details are captured by default traces; however, their retention is limited. Also, it is quite a task to set up SQL audits in every user database.
<!--more-->

It is not complicated anymore and does not require enterprise edition to determine who made the changes to your SQL Server.


#### SQL Server Audits: 

Auditing an SQL Server or a SQL Server database involves tracking and logging events that occur. SQL Server Audit collects both server and database-level actions as well as groups of actions. Audits are performed at the instance level of the SQL Server. There can be multiple audits per SQL Server instance. Audits also include Database-Level Audit Specifications.

-*SQL Server Audits and its components:*


**SQL Server Audits**
-         It defines how event information will be kept by an audit at an instance level of the SQL server. An SQL Server audit also specifies the output locations, retentions, and other properties. At an instance level, one or more SQL Server audits are disabled by default.

-       	Some of the options configured at SQL Server Audit Level- 

- Audit Destination - You can store audits to File, Event Viewer Security Logs or Event Viewer Application Logs 


	*When Selecting File as your destination you can specify*
-	FILEPATH = Location of audit file
-	MAXSIZE = Max file size
-	MAX_FILES = numbers of file allocated for audits
-	RESERVE_DISK_SPACE = If you want to pre reserve file space for audits files
-	QUEUE_DELAY = As soon as the specified amount of time has passed, SQL Server will queue up the writes from the captured data and write them to the logs.
-	ON_FAILURE = It is possible to specify whether to continue to run or to stop the SQL server instance in case audits fail. An option to continue or to stop is available.
-	WHERE – we can use this option to filter specific events from audits.


-	**Server Audit Specification**
-	One of the components of an audit is the Server Audit Specification, and it is part of the audit process. The Server Audit specifications are created at the instance level of the SQL Server. All actions from an SQL server instance and many actions from user databases can be captured by a server audit specification.
-	In this blog, I’ll be targeting the following server-level actions 

```
-	DATABASE_ROLE_MEMBER_CHANGE_GROUP
-	SERVER_ROLE_MEMBER_CHANGE_GROUP		
-	AUDIT_CHANGE_GROUP
-	SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP
-	SERVER_OBJECT_PERMISSION_CHANGE_GROUP
-	SERVER_PERMISSION_CHANGE_GROUP
-	DATABASE_CHANGE_GROUP
-	DATABASE_OBJECT_CHANGE_GROUP
-	DATABASE_PRINCIPAL_CHANGE_GROUP
-	SCHEMA_OBJECT_CHANGE_GROUP
-	SERVER_OBJECT_CHANGE_GROUP
-	SERVER_PRINCIPAL_CHANGE_GROUP
-	LOGIN_CHANGE_PASSWORD_GROUP
-	SERVER_STATE_CHANGE_GROUP
-	DATABASE_OWNERSHIP_CHANGE_GROUP
-	SERVER_OBJECT_OWNERSHIP_CHANGE_GROUP
-	USER_CHANGE_PASSWORD_GROUP
```
**-	Database Audit Specifications**
o	A database audit specification only includes actions at the database level to create or modify it in a user database. In the example shared, I’ll be discussing the databases audits and try capturing schema changes in the databases using server audit specifications.

The objective of these Audits :
1.	Capture login server-level role modification
2.	Capture user role assignment/modification in all user databases
3.	Any changes in audits itself
4.	Capture Server, Database, Schema, Object level permissions changes 
5.	Capture Schema changes from instance to database object level
6.	Capture Login password changes
7.	Capture in server state changes 

#### Following are the steps to deploy and capture the above details using SQL Server Audits. 

1.	Execute attached scripts to deploy audits and server audit specifications.

<img src=Picture1.png title="" alt="">

2.	This action will create SQL Server Audits with properties described in the following snip. The destination for this audit is a File with default error log location as a path.

<img src=Picture2.png title="" alt="">

3.	Next thing to watch is SQL Server audit specifications and you will see audit specification is created with all actions to capture as discussed.

<img src=Picture3.png title="" alt="">

4.	Testing audits to see if details are being captured 

        - a.	Create a user database and a table within the User DB

<img src=Picture4.png title="" alt="">

        - b.	Run one more test to change the login password-

<img src=Picture5.png title="" alt="">

        - c.	Let’s see if records are available or not. The following snip indicates changes that are recorded in the audits.

<img src=Picture6.png title="" alt="">

*TSQL Server Script Used For Audit: -*

{{< highlight sql>}}

USE [master] 

Declare @SmoRoot nvarchar(2000)
Declare @String Nvarchar(max)
Exec master.dbo.xp_instance_regread N'HKEY_LOCAL_MACHINE', N'SOFTWARE\Microsoft\Microsoft SQL Server\MSSQLServer\Parameters', N'SQLArg1', @SmoRoot OUTPUT
Select @SmoRoot = SUBSTRING(@SmoRoot,3,len(@SmoRoot)-10)
Set @String = 'CREATE SERVER AUDIT [MSSQL_NativeSQLAudit]
TO FILE 
(	FILEPATH = N'''+@SmoRoot+'''
	,MAXSIZE = 100 MB
	,MAX_FILES = 50
	,RESERVE_DISK_SPACE = OFF
)
WITH
(	QUEUE_DELAY = 1000
	,ON_FAILURE = CONTINUE
)
WHERE (NOT [statement] like ''%ALTER%INDEX%'' 
AND NOT [statement] like ''%UPDATE%STATISTICS%'' 
AND NOT [STATEMENT] like ''%EVENT%NOTIFICATION%'' 
AND NOT [STATEMENT] like ''%ENABLE%TRIGGER%'' 
AND NOT [STATEMENT] like ''%DISABLE%TRIGGER%'' 
AND NOT [STATEMENT] like ''%OPEN%SYMMETRIC%KEY%'' 		
AND NOT [STATEMENT] like ''%SET%IDENTITY_INSERT%'' 		
AND NOT [STATEMENT] like ''%TRUNCATE%TABLE%'' 	
AND NOT [Object_name] like ''SqlQueryNotification%'' 
AND NOT [server_principal_name] LIKE ''%\patrol%''
AND NOT [STATEMENT] like ''%DBCC DBINFO WITH TABLERESULTS%'' 
AND NOT [STATEMENT] like ''%RESTORE%VERIFYONLY%'' 
AND NOT [STATEMENT] like ''%EXEC %%Object(%''
AND [database_name]<>''tempdb'' 
AND object_id <> 1
AND (Object_name <> ''BlockingInfo'' AND object_name <> ''MSSQL_AlwaysOn_Monitor'' AND [Object_name]<>''telemetry_xevents'' )
AND [STATEMENT] <>'''')'
--print @String

IF EXISTS (SELECT name FROM sys.server_audits WHERE NAME = 'MSSQL_NativeSQLAudit')
BEGIN
ALTER SERVER AUDIT [MSSQL_NativeSQLAudit] WITH (STATE = OFF)
DROP SERVER AUDIT [MSSQL_NativeSQLAudit]
END

EXECUTE sp_executesql  @String

IF EXISTS (SELECT name FROM sys.server_audit_specifications WHERE NAME = 'MSSQL_ServerAuditSpecification')
BEGIN
ALTER SERVER AUDIT SPECIFICATION [MSSQL_ServerAuditSpecification] WITH (STATE = OFF)
DROP SERVER AUDIT SPECIFICATION [MSSQL_ServerAuditSpecification]
END

CREATE SERVER AUDIT SPECIFICATION [MSSQL_ServerAuditSpecification]
FOR SERVER AUDIT [MSSQL_NativeSQLAudit]
ADD (DATABASE_ROLE_MEMBER_CHANGE_GROUP),
ADD (SERVER_ROLE_MEMBER_CHANGE_GROUP),
ADD (AUDIT_CHANGE_GROUP),
ADD (SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP),
ADD (SERVER_OBJECT_PERMISSION_CHANGE_GROUP),
ADD (SERVER_PERMISSION_CHANGE_GROUP),
ADD (DATABASE_CHANGE_GROUP),
ADD (DATABASE_OBJECT_CHANGE_GROUP),
ADD (DATABASE_PRINCIPAL_CHANGE_GROUP),
ADD (SCHEMA_OBJECT_CHANGE_GROUP),
ADD (SERVER_OBJECT_CHANGE_GROUP),
ADD (SERVER_PRINCIPAL_CHANGE_GROUP),
ADD (LOGIN_CHANGE_PASSWORD_GROUP),
ADD (SERVER_STATE_CHANGE_GROUP),
ADD (DATABASE_OWNERSHIP_CHANGE_GROUP),
ADD (SERVER_OBJECT_OWNERSHIP_CHANGE_GROUP),
ADD (USER_CHANGE_PASSWORD_GROUP)
WITH (STATE = ON)

ALTER SERVER AUDIT [MSSQL_NativeSQLAudit] WITH (STATE = ON)

{{< /highlight >}}

### Conclusion :-

The SQL Server audits feature can be used in any edition to capture action not just at the instance level, but also at the database level. This is easy to configure and fulfills multiple compliance requirements. **It is always important to audit a database system, and the blog will help you in doing the audit correctly.**
The above steps are applicable to the SQL 2012 Server version and above. 


<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).