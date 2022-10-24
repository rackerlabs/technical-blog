---
layout: post
title: "Security on PostgreSQL and RDS"
date: 2022-10-22
comments: true
author: Amit Singh
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - Postgresql
    - Security
metaTitle: "Security on PostgreSQL and RDS"
metaDescription: "This Document describes how to set up the security in PostgreSQL and AWS Aurora and best practices."
ogTitle: "Security on PostgreSQL and RDS"
ogDescription: "This Document describes how to set up the security in PostgreSQL and AWS Aurora and best practices."
slug: "security-on-postgresql-and-rds"

---
#### Introduction 

This Document describes how to set up the security in PostgreSQL and AWS Aurora and best practices. The Database security referrers to a set of procedures and policies that safeguard data. It becomes crucial to understand its significance.

<!--more-->

#### Important Components
 Let us look at of the important components around the same. 
 
-	Host-based authentication (HBA) Authentication, privilege of a role/group/user (Authorization)
-	Different Levels of Security
-	pg_hba.conf file supports multiple method of authentication
-	Password authentication
-	Ident authentication
-	Trust authentication, 
-	PAM authentication
-	LDAP authentication
-	SSPI authentication
-	GSSAPI authentication
-	Certificate authentication
-	Peer authentication
-	RADIUS authentication
-	BSD authentication
-	Row Level Security (RLS)
-	Security Logging for RDS /Aurora PostgreSQL
    
    I.	Default Logging
    
    II.	DB Parameter Group
    
    III.	Object based Query Logging with the pgaudit extension

    IV.	Publishing PostgreSQL Logs to CloudWatch Logs
-	Object Ownership
-	Application Access Parameters
-	Protecting Against Injection Attacks with SQL/Protect
-	Source Code Protection for Functions

#### Authentication and Authorization

Secure access is a two stage (AA) process, and it ensures that only authorized users are logging to Database with the assigned privileges.

**Authentication**
- It ensures that a user is who he or she claims to
 
 **Authorization**
 - It allows the user access to DB resources based on the user’s identity and user has been granted the appropriate privileges.

**Different Levels of Security**

**The Postgres level of security is based on Network-level, Transport Level and Database level**

-	Server and Application
               Check Client IP/Authentication mode
               Pg_hba.conf

-	Database 
Role/User/Password
Connect Privilege
Schema Permission (usage, CRUD)
       
-	Object 
Table Level Privilege/execute privilege on function 
Grant/Revoke

**pg_hba.conf – Access Control**

-	Host based access control file (pg_hba.conf)
-	Pg_hba.conf file is located in Cluster data directory
-	Read at startup, any change requires reload(using pg_reload_conf())
-	Each record specify connection type, database name, user name , client IP and method of authentication(LDAP,TRUST,PAM)
-	Top to bottom reading of a pg_hba file
-	Hostnames, IPv6 and IPv4 supported with CIDR
-	Authentication methods – password, trust, reject, md5, sspi , gss, , krb5,ident, peer, pam, ldap, radius or cert etc..

#### Row Level Security (RLS)

**RLS enables you to use group membership or execution context for controlling access to the rows in a database Table.**

-	GRANT and REVOKE can be used at table level
-	PostgreSQL >9.5 supports security policies for limiting access at row level
-	RLS offers stronger security as it is enforced by the database
-	Security policies are controlled by DBA not by application team
-	All rows of a table are visible by default
-	Once RLS is enabled on a table, all the queries must go through the security policy

Example:

To enable row level security for the table:
-	Create the table first and enable RLS on table
   
      `ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;`

-	To create a policy on the table to allow the role to view the rows of their table, the CREATE POLICY command can be used.

  `CREATE POLICY policy_name ON table_name TO role_name USING(role = Current_user);`
      
	To allow all users to view their own row in a user table, a simple policy can be used:

`CREATE POLICY usr_policy ON users USING (user = current_user);`

**Security Logging for RDS /Aurora PostgreSQL**

PostgreSQL generates event logs that contain useful information for DBAs like SQL query issues, failed login, and dead locks are captured in the database by default. However, from a security perspective compliance and security groups are also interested in capturing addition database activity. For instance, successful logins and user queries for security monitoring and audit purposes. 

**Default Logging**

<img src=Picture1.png title="" alt="">

#### DB Parameter Group

Each RDS and Aurora PostgreSQL instances are associated with a parameter group that contains engine specific settings. The engine configurations also include several parameters that control the PostgreSQL logging behavior. AWS provides the parameter groups default configuration settings to use for your instance. To enable additional options the default settings for the parameters given in the following table must be changed to the recommended value.

<img src=Picture3.png title="" alt="">
<img src=Picture4.png title="" alt="">

**Object based query Logging with pgaudit extension**

The following summaries show how to enable with pgaudit and provides, and example of configuring object level query auditing and table mytable.

**Create specific database role called rds_pgaudit**

CREATE ROLE rds_pgaudit;

Modify the parameter group that is associated with your DB instance to use the shared preload libraries that contain pgaudit.role. (it needs to restart the DB instance)

`Pgaudit.role=rds_pgaudit`
`Shared_preload_libraries=pgaudit`

**Run the following command to create the pgaudit extension**

`CREATE EXTENSION pgaudit;`

**To test the audit logging,run several commands that you have chosen to audit**

`CREATE TABLE mytable(id int);`
`GRANT SELECT ON mytable to rds_pgaudit;`

#### Publishing PostgreSQL Logs to CloudWatch Logs.

By default, PostgreSQL log records are stored in a DB instance for three days and a maximum of seven days. With CloudWatch logs, you can store PostgreSQL log records for much longer, and also perform real-time analysis of log data and use CloudWatch to view metrics and create alarms.

To work with the CloudWatch logs, configure RDS for PostgreSQL instance to publish log data to a log group. You can Publish the following log types to CloudWatch logs for PostgreSQL
PostgreSQL log
Upgrade log (not available for Aurora PostgeSQL)


**To publish PostgreSQL logs to CloudWatch logs using the console:**
-	Open the RDS console
-	Choose the DB instance and select modify
-	In the log exports section, choose the logs to start publishing to CloudWatch logs.
-	Choose continue, and then choose modify DB instance on the summary page.
-	Select the log types to publish to Amazon Cloudwath Logs, PostgreSQL and Upgrade log

**We can publish PostgreSQL logs with the AWS CLI. The following command will modify an existing DB instance:**

AWS rds modify-db-instance –db-instance-identifier mydbinstance  --cloudwatch-logs-export-configuration ‘{“EnableLogTypes”:[“postgresql”,”upgrade”]}’


Similar AWS CLI commands are available for publishing the logs to CloudWatch Logs when creating an instance or restoring an instance from a snapshot.

**Application Access**

- **Application/user access is controlled by settings in both (postgresql.conf ,pg_hba.conf)**
-**Set the following parameters in postgresql.conf:**
- unix_socket_directory
- unix_socket_group
- unix_socket_permissions
- listen_addresses
- max_connections
- superuser_reserved_connections
- port

**SQL Level Protect**
- To Protects Postgres databases from SQL injection attacks
- SQL Protect add a security layer managed by DBA
- We can add-on module delivered through Stack Builder

**EDB*Wrap**

EDB*Wrap utility converts the source code of database functions
- Everything is wrapped in obfuscated form like Oracle wrap capability
<img src=Picture5.png title="" alt="">


#### Conclusion:

-In this document, we have looked at the security of PostgreSQL/RDS/Auroa Postgres implementation and the factors related to server access, database access, database object access and row level access.
We have seen the best practices for securing access and adding entry and select authentication methods.

Hopefully this overview is helpful for reviewing the security on PostgreSQL



<a class="cta purple" id="cta" href="https://www.rackspace.com/cloud/azure">Learn about Rackspace Managed Azure Cloud Services.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).