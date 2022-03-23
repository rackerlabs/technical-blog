---
layout: post
title: "IBM DB2 Database Administration"
date: 2022-03-23
comments: true
author: Tejash Kumar Patel
authorAvatar: 'https://secure.gravatar.com/avatar/93f8a2afa4b179946cc23ac18a0ff8a5'
bio: ""
published: true
authorIsRacker: true
categories:
    - Database
    - General
metaTitle: "IBM DB2 Database Administration"
metaDescription: "IBM DB2 is a Relational Database developed and owned by IBM. DB2 database is available for multiple platforms including Linux, UNIX, and Windows (LUW). DB2 is available as database software with multiple models or editions."
ogTitle: "IBM DB2 Database Administration"
ogDescription: "IBM DB2 is a Relational Database developed and owned by IBM. DB2 database is available for multiple platforms including Linux, UNIX, and Windows (LUW). DB2 is available as database software with multiple models or editions."
slug: "ibm-db2-database-administration"

---

IBM DB2 is a Relational Database developed and owned by IBM. DB2 database is available for multiple platforms including Linux, UNIX, and Windows (LUW). DB2 is available as database software with multiple models or editions. 
<!--more-->

One of DB2 edition known as Community Edition is available for free for Developers for lifetime, other editions are  Standard and Enterprise Edition with license requirements. In this blog I am sharing some of the tasks related to IBM DB2 Database administrations. Hope you can find it useful for regular activities to maintain the database.


1)	Find License Details
2)	DB2 Server, instance, database relations
3)	DB2 Operating System Groups
4)	Database Parameter Configurations
i)	Global Level
ii)	Instance Level
iii)	Database Level
5)	Create, change, modify, drop with DB2 Installations, clients , instance, database
6)	Default Tablespaces, Create Tablespace , List Tablespaces
7)	 Listener Configurations
8)	Archive configuration

---------------------------------------------------------------------------------------------------

### 1)	Find License Details: To check your product licence details please use below commands.

`$>db2licm -l`

Product name:                     "DB2 Community Edition"

License type:                     "Community"

Expiry date:                      "Permanent"

Product identifier:               "db2dec"

Version information:              "11.5"

Max amount of memory (GB):        "16"

Max number of cores:              "4"

Features:
IBM DB2 Performance Management Offering:              "Not licensed"

### 2) DB2 Server, instance, database relations (Non-partitioned)

Please check figure 1 below, As depicted in figure 1, a Db2 Server is a database binary installation directory, which can be defined by names like DB2COPYn. This server can be used for upgrade, migrate and can uniquely separate environment for multiple databases and instances on server. You can create multiple DB server installations on a single server. DB2 Server can be installed also on multiple nodes of cluster as partitions with same locations. DB2 server can be maintained using parameters in configuration file (depicted as Global CFG). DBA can create policy to tune/automate multiple DB2 instances by creating an environment responsible for managing system resources and the databases that can be managed with same set of parameters across all databases and instances. 
DB2 instance can be divided into parts that includes set of processes, threads, and memory areas, for maintaining and connecting to multiple database in it. An instance can be configured using a configuration file known as (depicted DBM CFG), and policy can be created for resource allocation. Ports can be defined for connection as per application requirements. 
DB2 database is set of multiple logical storage groups, tablespaces, objects in tablespaces, transaction logs (depicted TX LOGS), and buffer pools. The following diagram illustrates the relationship between a Db2 server, its instances, and its associated databases.

<img src=Picture1.png title="" alt="">

Figure1: Diagram depicting DB2 Server, instance, Database relationships and contents


### 3) DB2 Operating System Groups

On Windows, the default instance name is DB2, and in Linux its DB2INST1. Each instance can be configured with a unique port for connection to it. Multiple instances can exist on same server.
DB2 installation can be configured with 4 type of OS Groups for safety and security of data from usage related roles, with SYSADM as Database Administrators with all privileges, SYSMON group to administer multiple databases of database manager instance, and DBADM being top level grant for specific to Database.

•	SYSADM 

•	SYSCTRL  

•	SYSMAINT

•	SYSMON

•	DBADM



### 4) Database Parameter Configurations

As per figure 1, you can configure IBM DB2 at 3 levels, the top level being called DB2 server configuration, 2nd level called as Database Manager configuration, and 3rd level at database level configuration.

i)	For Global parameter:

To view settings: `db2set -all`

To list all changeable parameters:` db2set -lr`

To update settings: `db2set parameter=newvalue`

Eg: `db2set db2comm=tcpip`

**Once changed you would need to restart all instances by db2stop an db2start.**

<img src=Picture2.png title="" alt="">

ii)	Instance Level :

To view settings: db2 get dbm cfg

To update settings: db2 update dbm cfg using parameter_name new-value
Eg: `db2 update dbm cfg using NUM_DB 5`

<img src=Picture3.png title="" alt="">

iii)	 Database Level:

To view settings: db2 get db cfg for database-name

To update settings: `db2 update db cfg for database-name using parameter new-value`

Eg: `db2 update db cfg for sample using AUTO_REORG ON`

<img src=Picture4.png title="" alt="">


### 5) Create, change, modify, drop with DB2 Installations, instance, database

A DB2 server comprises of mainly a Db2 copy refers to one or more installations of Db2 database products in a particular location on the same server. Each Db2 Version copy can be at the same or different code levels. With DB2 Version 9 and later, you can install and run multiple Db2 copies on the same server like DB2COPY1 of DB2 version 9, DB2COPY2 of version 10 … DB2COPY3 of version 11,etc.

**Advantages of multiple DB2 Copies:**

i)	Applications with different Db2 database versions on same server.

ii)	The ability to test on the same computer before moving the production database to the latter version of the Db2 database product.

iii)	Ability to divide your activities on separate DB2 versions.

**How to switch to DB2 installation copy incase multiple DB2COPY available:**

$>db2swtch -l

DB2COPY1    C: \ IBM\ SQLLIB    (Default DB2 and IBM Database Client Interface Copy)

` $>db2swtch -db2 -d DB2COPY1 `

Switching is successful. The current default DB2 copy is DB2COPY1.

`$>dasupdt (Change DB admin Server to current copy. `

SQL22266N  The DB2 Administration Server is already installed under the current DB2 Copy.

**How to maintain DB2 Instance:**

To create/list/drop instance and set/view current instance name in current installation of DB2CPOPY1, you can run below commands:

<img src=Picture5.png title="" alt="">

<img src=Picture6.png title="" alt="">

To stop and start current instance use below commands, please note, parameter _start_stop_time_ affects database start stop behaviour :

`$>Db2stop [ force ]`

`$>Db2start`

Other ways are available on Windows machines, so that you can use services for start/stop/automatic start behaviour for instances.

<img src=Picture7.png title="" alt="">

To Start database instance for Database administration’s purpose only, you can use below commands:
`$>db2start admin mode [ user <username> | group <groupname> ]`

OR

`$>QUIESCE DATABASE`
By above command Database is accessible only to users with privileges of SYSADM, SYSMAINT, DBADM, or SYSCTRL. 
`$>QUIESCE INSTANCE instance-name  `

Using above command, all databases under given instance will be accessible Only to users with privileges of SYSADM, SYSMAINT or SYSCTRL. 

Full Syntax of QUIESCE command:

<img src=Picture8.png title="" alt="">

Once Database administration activities is completed, you can convert the database from DBA only mode to available to all mode by using below commands:

`UNQUIESCE DATABASE – Remove database from Quisece mode`

`UNQUIESCE INSTANCE instance-name – Remove instance and all databases of instance from Quisece mode`

**How to Create Database:** 
DB2 Database can be created for multiple types of applications, 3 work load categories are :

- Simple (Online Transaction Processing), 
- Complex (Online Analytical Processing)
- Mixed ( Mix type of OLTP and OLAP)

Syntax: 
`CREATE database testdb1` ( options eg: encrypt, please check ibm db2 specific guide for full syntax.) ;

Eg:  `db2 create db emp_utf autoconfigure using workload_type simple apply db only		  `

`db2 create db emp_utf using codeset utf-8 territory lets us collate using system`

` db2 drop db emp_utf`

### 6)	Default Tablespaces, Create Tablespace , List Tablespaces

Default Tablespace and bufferpools on DB2 Database:

DB2 database comes with 3 default tablespaces, you can create multiple tablespaces as per your application requirements other then default tablespaces.:

•	SYSCATSPACE – This tablespace contains system catalogue related details.

•	TEMPSPACE1 – This temporary tablespace is used for memory oriented operations like SORTING.

•	USERSPACE1 – This tablespace is default for non-default database objects.

DB2 Database also contains one default buffer pool , with the name IBMDEFAULTBP.

**Create Tablespace on DB2 database:**

Sample tablespace creation:

<img src=Picture9.png title="" alt="">

You can Create objects like Tables, index, views etc on newly created tablespace , for example, lets create one table named B on MYTBLS1 tablespace.:

<img src=Picture10.png title="" alt="">

**List Tablespaces:** 

You can use below command , and use options to find detailed information.

`db2 list tablespaces [show details]`

### 7) Listener Configurations

You can setup database connectivity details by setting DB2COMM parameter at instance level. Let’s change current listener settings to use port 60000 for connection, Once ports are changed you will need to restart database services for new connections start listen on changed port. Commands are as below:

`$>db2set -i db2inst1 DB2COMM=tcpip`

`$>db2 update dbm cfg using SVCENAME 60000`

`$>db2stop`

`$>db2start`

### 9) Archive configuration
To configure database logging options by using the UPDATE DATABASE CONFIGURATION command on the command line processor:

Specify whether you want to use circular logging or archive logging. If you want to use circular logging, the **logarchmeth1** and ****logarchmeth2** database configuration parameters must be set to OFF. This setting is the default. To use archive logging, you must set at least one of these database configuration parameters to a value other than OFF. For example, if you want to use archive logging and you want to save the archived logs to disk, issue the following command:

`db2 update db configuration for mydb using logarchmeth1  disk:/u/dbuser/archived_logs`

OR 

You can also configure database logging options by using IBM® Data Studio, **UPDATE DATABASE CONFIGURATION**  command

OR

`db2CfgSet API`

To avoid redo log generation, you can use the option NOT LOGGED INITIALLY with CREATE TABLE/INDEX commands. 

### Conclusion

Since the Database Administration tasks involves multiple activities, and a few of the process I have attempted to explore in this blog, I am sure you might like to have hands-on over IBM DB2 Database for its multiple features that are offered by the database. Most of the SQL operations are as per SQL Standards defined by American National Standards Institute (ANSI). Extra features like clustered database, high availability, partitioning, replication, materialized views  while maintaining all safety protocols similar to other popular RDBMS like Oracle , PostgreSQL, and pricing of product , and connectivity to almost all technologies makes DB2 a distinctive choice of developers in global database market. 





<a class="cta red" id="cta" href="https://www.rackspace.com/data/databases">Let our experts guide you on your database journey.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
