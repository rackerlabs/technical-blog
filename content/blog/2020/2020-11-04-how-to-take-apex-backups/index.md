---
layout: post
title: "How to take APEX backups"
date: 2020-11-04
comments: true
author: K Sandeep
published: true
authorIsRacker: true
categories:
    - Oracle
    - Databases
metaTitle: "How to take APEX backups"
metaDescription: "This post describes the Oracle&reg; Application Express (APEX) backup process."
ogTitle: "How to take APEX backups"
ogDescription: "This post describes the Oracle&reg; Application Express (APEX) backup process."
slug: "how-to-take-apex-backups"

---

This post describes how to back up Oracle&reg; Application Express (APEX). 

<!--more-->

### APEX organization

Oracle organizes the APEX working area into workspaces that are associated with one or more
Oracle database schemas. You should install APEX on the database that the applications use
to access data and then create applications in workspaces. Following are more APEX
organization facts:

- All workspaces and applications have a unique id assigned to them and are easy to track. 
- Both workspaces and applications can have external files attached to them, such as CSS,
  JavaScript, images, and so on. 
- Any application in the same workspace can access files attached to a workspace, but only
  an application can access files attached to that application. 
- Metadata tables store information about workspaces, applications, and files.
- Your exported backup should include all the metadata on workspaces and applications.

### What is APEX?

APEX is an enterprise low-code development platform where developers develop and deploy
their applications to solve problems and provide immediate value. It is a free feature of
Oracle Database.

APEX has two components: a metadata repository and the APEX engine. The metadata repository
stores all the application definitions, and the engine renders and processes all the
application pages. APEX is stored within the Oracle database in the form of data tables and
PL/SQL scripts.
 
### Backups
 
According to [one source](https://www.netapp.com/data-protection/backup-recovery/what-is-backup-recovery/),
"the purpose of the backup is to create a copy of data that can be recovered in the event
of a primary data failure. Primary data failures can be the result of hardware or software
failure, data corruption, or a human-caused event, such as a malicious attack (virus or
malware), or accidental deletion of data. Backup copies allow data to be restored from an
earlier point in time to help the business recover from an unplanned event."
 
### The APEX backup process
 
The Application Express installation files, in **$ORACLE_HOME/apex/utilities/oracle/apex**,
include two utilities, **APEXExport.class** and **APEXEportSplitter.class**, which you can
use to export your APEX applications.
 
#### 1. Preparation

To prepare for the backup, perform the following steps:

1. To use APEXExport, install JDK version 1.5 or later. 
2. Make sure the Oracle JDBC class libraries are in your CLASSPATH.
3. Download Oracle Database 11g Release 2 (11.2.0.4) JDBC Drivers (**ojdbc5.jar**)
   from [here](https://www.oracle.com/database/technologies/jdbcdriver-ucp-downloads.html)
   and place the file in **$ORACLE_HOME/jdbc/lib**.
 
#### 2. Set the environment source file
 
1. Create or update **apex.env** with the following content:
 
        export ORACLE_HOME=/u02/app/oradi/db/tech_st/12.1.0
        export ORACLE_SID=TIGER
        export PATH=$PATH:$ORACLE_HOME/bin
        export CLASSPATH=.:${ORACLE_HOME}/jdbc/lib/ojdbc5.jar
        export JAVA_HOME=$ORACLE_HOME/jdk/
        export PATH=$ORACLE_HOME/jdk/bin:$PATH
 
2. Source the environment file, **apex.env**.
 
#### 3. Find your workspace ID

Use the workspace ID to take the export. Use the following database queries to retrieve
the workspace ID information:
 
SQL> select workspace_id,workspace,schemas from apex_workspaces;
 
    WORKSPACE_ID     WORKSPACE                        SCHEMAS
    ------------     ------------------------------   ----------
          10         INTERNAL                             2
          11         COM.ORACLE.APEX.REPOSITORY           1
          12         COM.ORACLE.CUST.REPOSITORY           1
 
    SQL> set lines 200
    SQL>col WORKSPACE for a30
    SQL>col APPLICATION_NAME for a60
    SQL>col OWNER for a15
    SQL>select workspace,workspace_id,application_id,application_name,owner from apex_applications;
 
{{<img src="Picture1.png" title="" alt="">}}
 
*Source:* [https://docs.oracle.com/cd/E14373_01/apirefs.32/e13369/apex_app.htm#AEAPI214](https://docs.oracle.com/cd/E14373_01/apirefs.32/e13369/apex_app.htm#AEAPI214)

 
#### 4. Take the backup

Perform the following steps to take the backup:

1. From the **apex/utility** directory, issue the command for the export backup.
 
2. Run the following command to go to the APEXExport class directory:
 
        cd /u02/app/oradi/db/tech_st/12.1.0/apex/utilities/oracle/apex
 
3. Run the following command to export all workspaces backups:
 
        /u02/app/oradi/db/tech_st/12.1.0/jdk/bin/java oracle.apex.APEXExport -db nchphysicdb01.earth.com:1521:TIGER -user APEX_190200 -password $Apex_password -expWorkspace > apex_workspace.log
 
4. The log file should look similar to the following example:
 
        Exporting Workspace 12:'COM.ORACLE.CUST.REPOSITORY'
          Completed at Tue May 26 06:08:06 EST 2020
        Exporting Workspace 1502512746446669:'GJE TEST'
          Completed at Tue May 26 06:08:07 EST 2020
        Exporting Workspace 1509724465613146:'NS-TEST'
          Completed at Tue May 26 06:08:07 EST 2020
        -rw-rw-r-- 1 oradi oradi 4.3K May 26 06:08 w12.sql  ----- exported backup apex workspace file
        -rw-rw-r-- 1 oradi oradi 7.0K May 26 06:08 w1502512746446669.sql - exported backup apex workspace file
        -rw-rw-r-- 1 oradi oradi 11K May 26 06:08 w1509724465613146.sql - exported backup apex workspace file
 
##### APEX Export utility options
 
Following are the export options for APEX Export utility:
  
- **db**: Database connect URL in JDBC format
- **user**: Database username
- **password**: Database password
- **applicationid**: ID for the exported application
- **workspaceid**: Workspace ID for all  exported applications or the exported workspace
- **expFiles**: Export all workspace files identified by -workspaceid
- **instance**: Export all applications
- **expWorkspace**: Export workspace identified by -workspaceid or all workspaces if -workspaceid not specified
- **skipExportDate**: Exclude export date fr0om application export files
- **expPubReport**: Export all user saved public interactive reports
- **expSavedReports**: Export all user saved interactive reports
- **expIRNotif**: Export all interactive report notifications
- **expTranslations**: Export the translation mappings and all text from the translation repository
- **expFeedback**: Export team development feedback for all workspaces or identified by -workspaceid to development or deployment
- **expTeamdevdata**: Export team development data for all workspaces or identified by -workspaceid
- **deploymentSystem**: Deployment system for exported feedback
- **expFeedbackSince**: Export team development feedback since the specified date in the format `YYYYMMDD`
 
##### Example commands

Following are some export examples:

**Single application example**:

       APEXExport -db localhost:1521:ORCL -user scott -password scotts_password -applicationid 31500
 
**All applications in a workspace example**:

       APEXExport -db localhost:1521:ORCL -user scott -password scotts_password -workspaceid 9999
 
**All applications in an instance example**:

       APEXExport -db localhost:1521:ORCL -user system -password systems_password -instance
 
**All workspaces example**:

       APEXExport -db localhost:1521:ORCL -user system -password systems_password -expWorkspace
 
**Export feedback to development environment example**:

       APEXExport -db localhost:1521:ORCL -user scott -password scotts_password -workspaceid 9999 -expFeedback
 
**Export feedback to deployment environment EA2 since 20100308 example**:

       APEXExport -db localhost:1521:ORCL -user scott -password scotts_password -workspaceid 9999 -expFeedback -deploymentSystem EA2 -expFeedbackSince 20100308

### Conclusion
 
Oracle APEX is a rapid web application development tool for the Oracle database. It helps
you to quickly develop and deploy professional applications that are secure by using a web
browser. You don't need strong programming skills and can use different export options to
take backup as needed.  


<a class="cta red" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about our Database services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
