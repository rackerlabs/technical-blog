---
layout: post
title: "Introducing Oracle Application Express"
date: 2020-07-23
comments: true
author: Rohit Dogra
published: true
authorIsRacker: true
categories:
    - Oracle
    - database
metaTitle: "Introducing Oracle Application Express"
metaDescription: "Could your organization be more agile, developing applications faster, cheaper,
and more efficiently?  Consider using Oracle&reg; Application Express (APEX) and
low-code development&mdash;a visual development method using drag-and-drop elements."
ogTitle: "Introducing Oracle Application Express"
ogDescription: "Could your organization be more agile, developing applications faster, cheaper,
and more efficiently?  Consider using Oracle&reg; Application Express (APEX) and
low-code development&mdash;a visual development method using drag-and-drop elements."
slug: 'Introducing Oracle Application Express'
---

Could your organization be more agile, developing applications faster, cheaper,
and more efficiently?  Consider using Oracle&reg; Application Express (APEX) and
low-code development&mdash;a visual development method using drag-and-drop elements.

<!-- more -->

### Introduction

Apex enables you to adapt to changing requirements and empowers developers and
your entire organization to be a part of the solution quickly.

{{<image src="Picture1.png" title="" alt="">}}

*Image source:* [https://apex.oracle.com/en/](https://apex.oracle.com/en/)

### Why APEX?

APEX is the easiest way for developers to build visually appealing apps for their
data. APEX has the following features:

- **Simple**: The Application Builder's intuitive, browser-based GUI interface
  takes you step-by-step through creating your applications. You can easily learn
  to use APEX, and the robust components let you add high-level functionality
  with limited code. Your customers can become productive in less than a week.

- **Powerful**: Use APEX to create simple web versions of spreadsheets to
  complex, mission-critical applications used to tens of thousands of users daily.

- **Proven**: APEX successfully has powered thousands of applications globally
  for many years.

- **Secure**: By design, APEX builds highly secure, out-of-the-box web applications.
  As standards for security and the web evolve and hackers get more resourceful,
  the APEX focus on security ensures that your applications have state-of-the-art
  protection.

- **Portable**: APEX runs wherever you have Oracle Database, whether on-premises
  or in the cloud. You can easily deploy APEX to any environment.

### Architecture

The [Oracle APEX Architecture document](https://apex.oracle.com/en/platform/architecture/)
describes the APEX architecture clearly and succinctly.  This section contains
the first part of that document:

#### Overview

Oracle APEX uses a simple three-tier architecture where requests are sent from
the browser, through a web server and then finally to the database. APEX executes
all processing, data manipulation, and business logic in the database. This
architecture guarantees zero-latency data access, top performance, and scalability.
The following diagram highlights the process flow when a user requests or submits
a page in Oracle APEX.

{{<image src="Picture2.png" title="" alt="">}}

*Image source*: [https://apex.oracle.com/en/platform/architecture/](https://apex.oracle.com/en/platform/architecture/)

APEX sends a web request from the web browser to Oracle REST Data Services (ORDS),
where it is sent to Oracle Database to be actioned. Within the database, APEX
processes the request. After the processing completes, the result is sent back
through ORDS to the browser.

#### The Oracle RAD stack

The Oracle RAD stack is an inclusive technology stack based on three core
components: Oracle REST Data Services (ORDS), Oracle APEX, and Oracle Database.

This stack provides all the necessary components to develop and deploy world-class,
powerful, beautiful, and scalable apps. There are no other moving parts of the
additional components required. In addition, both Oracle APEX and ORDS are free
of cost features of Oracle Database, meaning if you have Oracle Database, you
already have this Oracle RAD stack.

##### REST data services (ORDS)

{{<image src="PictureR.png" title="" alt="" class="image-left">}} ORDS is a
Java application that enables developers with SQL and database skills to develop
REST APIs for Oracle Database, Oracle Database 12c JSON Document store, and the
Oracle NoSQL Database.

##### APEX

{{<image src="PictureA.png" title="" alt="" class="image-left">}}The Oracle
Database's native low-code development platform enables you to build stunning,
scalable, secure apps, with world-class features, that can be deployed anywhere.

##### Database

{{<image src="PictureD.png" title="" alt="" class="image-left">}}Oracle
Database&mdash;the most complete, integrated, and secure database solution for
any scale deployment. This solid foundation enables apps built using Oracle APEX
to be enterprise ready from day one.

### Install APEX 18.1

The following section comes from
[https://oracledbwr.com/install-oracle-apex-18-1-on-premises-windows-18-3-0-database-using-oracle-http-server-12-1-3-0-0/](https://oracledbwr.com/install-oracle-apex-18-1-on-premises-windows-18-3-0-database-using-oracle-http-server-12-1-3-0-0/).

#### Installation prerequisites

Oracle Application Express release 18.1 requires an Oracle Database release
11.2.0.4 or later, including Enterprise Edition and Express Edition (Oracle Database XE).

Download APEX 18.1 software [here](https://www.oracle.com/tools/downloads/apex-v191-downloads.html)
and click **Accept**.

{{<image src="Picture3.png" title="" alt="">}}

#### Step 1: Unzip the APEX 18.1.0.00.45 software

    unzip apex_18.1.zip -d /oradb/

#### Step 2: Create a new APEX tablespace

    CREATE TABLESPACE APEX DATAFILE ‘/oradb/app/oracle/oradata/clone/apex01.dbf’ SIZE 1G;

#### Step 3: Check the APEX  installation

    SELECT comp_name, version, status FROM dba_registry WHERE comp_id=’APEX';
    no rows selected

#### Step 4: Start the APEX 18.1 installation

    SQL> @apexins APEX APEX TEMP /i/
    Where:
     apex_tbs – name of the tablespace for the APEX user.
     apex_files_tbs – name of the tablespace for APEX files user.
     temp_tbs – name of the temporary tablespace.
     images – virtual directory for APEX images. Define the virtual image directory as /i/ for future updates. */

The preceding script creates a few schemas on the database.

Use the following command to test by querying the **ALL\_USERS** view:

    SQL> select username,created from all_users where USERNAME like ‘%APEX%’;

    USERNAME                      CREATED
    ———————                       ——————-
    APEX_PUBLIC_USER             29-MAY-18
    APEX_180100                  29-MAY-18
    APEX_INSTANCE_ADMIN_USER     29-MAY-18

#### Step 5: Check the version and status of the installation

    SELECT comp_name, version, status FROM dba_registry WHERE comp_id=’APEX';

    COMP_NAME                       VERSION          STATUS
    —————                           ——————           ———-
    Oracle Application Express     18.1.0.00.45       VALID

#### Step 6: Check the APEX RELEASE VERSION

    select * from apex_release;

    VERSION_NO            API_COMPAT      PATCH_APPL
    ———-                  ———-            ———————
    18.1.0.00.45          2018.04.04      APPLIED

#### Step 7: Run the Embedded PL/SQL Gateway configuration (EPG)

This step begins the APEX configuration.

The following script loads the APEX images into **XDB**:

     @apex_epg_config.sql <parent of apex directory>

     SQL> @apex_epg_config.sql /oradb

#### Step 8: Make sure that specific accounts are unlocked

The step continues the APEX configuration.

    ALTER USER anonymous ACCOUNT UNLOCK;
    ALTER USER xdb ACCOUNT UNLOCK;
    ALTER USER apex_public_user ACCOUNT UNLOCK;
    ALTER USER flows_files ACCOUNT UNLOCK;

#### Step 9: Configure database parameters for APEX

The step continues the APEX configuration.

    SHOW PARAMETER job_queue_processes

    NAME                        TYPE           VALUE
    ———                         —————          ———–
    job_queue_processes         integer        4000

    SHOW PARAMETER shared_servers

    NAME                        TYPE           VALUE
    ————                        ————           ———–
    max_shared_servers          integer
    shared_servers              integer        1

Change the `shared_servers` parameter:

    ALTER system SET shared_servers=5 scope=both;

#### Step 10: Set the XDB HTTP listener port and APEX ADMIN password.

The step completes the APEX configuration.

For users, you can use ADMIN by default, and skip the email. Also, you can change
the HTTP port. However, the default port is `8080`.

    SQL>@/oradb/apex/apxconf.sql

    PORT
    ———-
    8080

Enter the values for the XDB HTTP listener port and the password for the APEX
ADMIN user. The default values are in brackets [ ]. Press **Enter** to accept
the default value.

Use this script to change an APEX instance administrator's password. If the user
does not yet exist, the script creates one.

    Enter the administrator's username [ADMIN]
    User "ADMIN" does not yet exist and will be created.
    Enter the ADMIN's email [ADMIN]
    Enter the ADMIN's password []
    Created instance administrator ADMIN.
    Enter a port for the XDB HTTP listener [ 8080]
    …changing HTTP Port
    APEX configuration finishes.

#### Step 11: Check the HTTP port

    SQL> select dbms_xdb.gethttpport from dual;

    GETHTTPPORT
    ———–
    8080

#### Step 12: Check the listener status and HTTP port is enabled

    [oracle@clone:apex clone] lsnrctl status

    LSNRCTL for Linux: Version 12.2.0.1.0 – Production on 29-MAY-2018 19:20:08
    Copyright (c) 1991, 2016, Oracle. All rights reserved.
    Connecting to (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=clone.localdomain.com)(PORT=1521)))

    STATUS of the LISTENER
    ————————
    Alias LISTENER
    Version TNSLSNR for Linux: Version 12.2.0.1.0 – Production
    Start Date 25-MAY-2018 21:52:41
    Uptime 3 days 21 hr. 27 min. 26 sec
    Trace Level off
    Security ON: Local OS Authentication
    SNMP OFF
    Listener Parameter File /oradb/app/oracle/product/12.2.0.1/db_1/network/admin/listener.ora
    Listener Log File /oradb/app/oracle/diag/tnslsnr/clone/listener/alert/log.xml
    Listening Endpoints Summary…
    (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=clone.localdomain.com)(PORT=1521)))
    (DESCRIPTION=(ADDRESS=(PROTOCOL=tcps)(HOST=clone.localdomain.com)(PORT=5500))(Security=(my_wallet_directory=/oradb/app/oracle/admin/CLONE/xdb_wallet))(Presentation=HTTP)(Session=RAW))
    (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=clone.localdomain.com)(PORT=8080))(Presentation=HTTP)(Session=RAW))
    Services Summary…
    Service “CLONE.localdomain.com” has one instance.
    Instance "clone", status READY, has one handler for this service…
    Service "cloneXDB.localdomain.com" has one instance.
    Instance "clone", status READY, has one handler for this service…
    The command completed successfully

#### Step 13: Log in to the Administration Services login page

In the browser, log in as an ADMIN user to the  Administration Services login page:
[http://clone.localdomain.com:8080/apex/apex_admin](http://clone.localdomain.com:8080/apex/apex_admin).

{{<image src="Picture4.png" title="" alt="">}}

### header 3

{{<image src="Picture1.png" title="" alt="">}}

#### header 4

{{<image src="Picture1.png" title="" alt="">}}

##### header 5

{{<image src="Picture1.png" title="" alt="">}}

#### header 4

{{<image src="Picture1.png" title="" alt="">}}

### header 3&mdash;last one

{{<image src="Picture1.png" title="" alt="">}}

### Conclusion

Oracle APEX is the right tool if you want to build applications that function
better, perform, better, and deliver a better end-user experience. It dramatically
simplifies enterprise application development and deployment. Based on the
information in this post, choosing Oracle APEX probably makes sense for your next
development project.

Use the Feedback tab to make any comments or ask questions. You can also
[chat now](https://www.rackspace.com/#chat) to start the conversation.

<a class="cta red" id="cta" href="https://www.rackspace.com/dba-services">Learn more about Databases.</a>
