---
layout: post
title: "Patching APPS and DR instances in EBS 12.2"
date: 2021-05-07
comments: true
author: Ajay Sharma
published: true
authorIsRacker: true
categories:
    - Oracle
    - Database
metaTitle: "Patching APPS and DR instances in EBS 12.2"
metaDescription: "This post covers the maintenance and patching of disaster
recovery (DR) systems for Oracle&reg; E-business Suite&reg; (EBS) R12.2.9."
ogTitle: "Patching APPS and DR instances in EBS 12.2"
ogDescription: "This post covers the maintenance and patching of disaster
recovery (DR) systems for Oracle&reg; E-business Suite&reg; (EBS) R12.2.9."
slug: "patching-apps-and-dr-instances-in-ebs-12.2"

---

This post covers the maintenance and patching of disaster recovery (DR) systems
for Oracle&reg; E-business Suite&reg; (EBS) R12.2.9. It describes a generic
process to apply database DB and application (APPS) patches to Oracle version
12.2 Applications DR systems.

<!--more-->

### Introduction

The steps to create a DR application site are almost the same as creating a
clone system, which we covered in a
[previous blog post](https://docs.rackspace.com/blog/oracle-ebs-cloning-with-version-19c-database/).

In times of disaster, you need to make only a few changes to the XML files for
hostnames, and your backup systems are ready and running. To keep the system in
sync, you need to regularly apply the patches to the database and application
server environments.

Ensure that you configured a physical standby database with the primary database
server and both databases are in sync. Then, you need to apply all the patches
to the DR applications systems.

 High-level steps for this process include:

1. Disable archiving and convert the DR to a snapshot standby from the physical
   standby.
2. Shut down the DR database to apply database patches.
3. Start the DR databases in standby snapshot mode and run node cleanup scripts.
4. Flip the file systems for the DR applications if they don't match the PROD
   system.
5. When the system is in downtime mode, apply the patches.
6. Convert the DR back to a physical standby after you finish patching the
   application DR servers.

### Create a DR application site

The process involves designing a simple system and putting it in place for
application switchover. If you experience a disaster on the application side,
this system must remain in sync with the primary site at all patch levels.

#### 1. Convert DR to Snapshot Standby from Physical standby

First, disable archive log shipping and convert the primary DR database to
standby snapshot mode:

1. Log onto the primary production database node1 as `oracle`.
2. Run the following commands:

       $. prodinstance.env
       $  sqlplus / as sysdba
       show parameter log_archive_dest_state_2;

       NAME                                 TYPE        VALUE
       ------------------------------------ ----------- --------------------
       log_archive_dest_state_2             string      enable
       alter system set log_archive_dest_state_2='Defer' scope=both sid='*';
       show parameter log_archive_dest_state_2;

       NAME                                 TYPE        VALUE
       ------------------------------------ ----------- --------------------
       log_archive_dest_state_2             string      Defer

Then, cancel the redo-log application on the DR database and convert it to
snapshot standby mode:

1. Log onto DR database node1 as `oracle`.
2. Run the following commands:

       $. drinstance.env
       $ sqlplus / as sysdba
       alter database recover managed standby database cancel;
       select FLASHBACK_ON, DATABASE_ROLE from v$database;

       FLASHBACK_ON       DATABASE_ROLE
       ------------       ----------------
       YES                PHYSICAL STANDBY

#### 2. Shutdown the DR database to apply database patches

Shut down the database on both the nodes and apply the database patches. Run the
following commands to apply database patches:

       $. prodinstance.env
       $ sqlplus / as sysdba
       shut immediate;
       $ cd $PATCH_DIR
       $ opatch apply

Use the preceding steps to apply the database patches on all Real Application
Cluster (RAC) system nodes.

#### 3. Convert the database to snapshot mode

Convert the DR database to snapshot standby mode and run auto-config after the
nodes cleanup:

       $. prodinstance.env
       $ sqlplus / as sysdba
       SYS@PRODINSTANCE> startup mount;
       SYS@PRODINSTANCE>alter database convert to snapshot standby;
       SYS@PRODINSTANCE>alter database open;
       SYS@PRODINSTANCE>select DB_UNIQUE_NAME, OPEN_MODE, DATABASE_ROLE from v$database;

       DB_UNIQUE_NAME        OPEN_MODE          DATABASE_ROLE
       --------------        ----------         ----------------
       PRODINSTANCE          READ WRITE         SNAPSHOT STANDBY

Now,  prepare the application DR system for patching. After a patching cycle
completes on a production system, the file system flips after cutover. As a
result, the production and DR file systems might not remain the same. The
following steps address this concern. These steps, which your run on the DB and
APPS nodes, remove any production references in the DR database.

##### Cleanup the nodes

Run the following steps to prepare to clean up the nodes:

1. Log onto DR database node1 as `oracle`.
2. Run the following commands:

       $. drinstance.env
       $ sqlplus apps/apps-passwd
       exec fnd_conc_clone.setup_clean;
       truncate table applsys.adop_valid_nodes;

##### Execute Autoconfig on all application and database tiers

Run `adautoconfig` on database and application nodes.

**DB nodes**

1. Log onto DR database node1 as `oracle` and run the following commands:

       $. drinstance.env
       $ cd $ORACLE_HOME/appsutil/scripts/<CONTEXT_NAME>/
       $ sh adautocfg.sh

2. Log on to DR DB node2 as `oracle` and run the following commands:

       $. drinstance.env
       $ cd $ORACLE_HOME/appsutil/scripts/<CONTEXT_NAME>/
       $ sh adautocfg.sh

**Application nodes: Run FS**

1. Log onto the DR application node1 as `applmgr` and run the following commands:

       $. drinstance.env
       $ cd $ADMIN_SCRIPTS_HOME
       $ sh adautocfg.sh

2. Log onto the DR application node2 as `applmgr` and run the following commands:

       $. drinstance.env
       $ cd $ADMIN_SCRIPTS_HOME
       $ sh adautocfg.sh

3. Log onto the DR external application node1 as `applmgr` and run the following
   commands:

       $. drinstance.env
       $ cd $ADMIN_SCRIPTS_HOME
       $ sh adautocfg.sh
  
4. Log onto the DR external application node2 as `applmgr` and run the following
   commands:

       $. drinstance.env
       $ cd $ADMIN_SCRIPTS_HOME
       $ sh adautocfg.sh

 **Application nodes: Patch FS**

1. Log onto the DR application node1 as `applmgr` and run the following commands:

       $. drinstance_patch.env
       $ cd $ADMIN_SCRIPTS_HOME
       $ sh adautocfg.sh

2. Log onto the DR application node2 as `applmgr` and run the following commands:

       $. drinstance_patch.env
       $ cd $ADMIN_SCRIPTS_HOME
       $ sh adautocfg.sh

3. Log onto DR external application node1 as `applmgr` and run the following
   commands:

       $. drinstance_patch.env
       $ cd $ADMIN_SCRIPTS_HOME
       $ sh adautocfg.sh

4. Log onto the DR external application node2 as `applmgr` and run the following
   commands:

       $. drinstance_patch.env
       $ cd $ADMIN_SCRIPTS_HOME
       $ sh adautocfg.sh

#### 4. Flip the file systems for DR apps if they do not match the PROD system

You need to execute the following steps only if there is a difference between the
RUN and PATCH file systems for PROD and DR servers. If they are the same, you
can directly proceed with applying patches.

Execute the following steps on all DR APPS tier nodes:

1. Log onto every DR application node (external and internal) and execute the
   following commands:

       $. ./drinstance.env
       $ perl $AD_TOP/patch/115/bin/txkADOPCutOverPhaseCtrlScript.pl -action=ctxupdate -contextfile=<full path of current run Context File on standby> -patchcontextfile=<full path of current patch file system Context File on standby> -outdir=<full path to out directory>

2. Source the environment again on all nodes to check whether the file system
   switched.

The DR is now ready for application patching.

#### 5. Apply application patches to DR application nodes in downtime mode

First, because you keep the application services at the DR down, you apply
patches to the RUN file system in downtime mode by performing the following steps:

1. Log onto the DR application node1.
2. Run the following comands:

       $. drinstance.env
       $ adop phase=apply patches=<patch1, patch2> patchtop=/apps_stage/patch \ apply_mode=downtime options=nodbportion

You might receive the following warning message. If so, proceed by answering
with `Y`:

       [WARNING]    adop has detected a configured disaster recovery site.
       [WARNING]    Follow the instructions in the section "Oracle E-Business Suite
       [WARNING]   
       Maintenance with Standby Database" of Business Continuity for
       [WARNING]    Oracle E-Business Suite Release 12.2 depending on the database version used.
       Do you want to continue with the apply phase [Y/N]? Y

Next, apply all FMW Tier patches by using the standard procedure.

To synchronize the Run and Patch file systems, run the following commands so that
the changes made to the RUN file system clone over to the Patch file system:

$. drinstance.env
$adop phase=fs_clone

#### 6. Convert the DR back to physical standby after the application DR patching finishes

Finally, you need to convert the DR database back to physical standby mode,
enable `redo apply` to the DR database, and resume archive-log shipping from the
PROD to the DR database.

First, convert the DR database back to physical standby:

1. Log onto DR database node1 and run the following commands:

       $. drinstance.env
       $ sqlplus / as sysdba;
       shutdown immediate;
       startup  mount;
       alter database convert to physical standby;
       SELECT open_mode, database_role FROM v$database;

       OPEN_MODE            DATABASE_ROLE
       -------------------- ----------------
       MOUNTED              PHYSICAL STANDBY

       ALTER DATABASE RECOVER MANAGED STANDBY DATABASE USING CURRENT LOGFILE DISCONNECT FROM SESSION;

2. Log onto the DR database node2 and startup the instance by running the
   following commands:

       $. drinstance.env
       $ sqlplus / as sysdba;
       startup;

Next, enable archive log shipping on the primary database by running the following
commands:

       1. Log onto the production database node1.
       2. Run the following commands:

       $. prodinstance.env
       $ sqlplus / as sysdba;
       show parameter log_archive_dest_state_2;
       alter system set log_archive_dest_state_2='enable' scope=both sid='*';
       alter system set log_archive_dest_state_2='defer' scope=both sid='*';
       alter system set log_archive_dest_state_2='enable' scope=both sid='*';

### Conclusion

This post describes how to manage a disaster EBS application system with updates
and patches applied to the PROD EBS 12.2 site. You do not need to maintain a
backup of all the application systems and then restore the systems from the
backup. You might want to set up `rsync` processes between the PROD and DR sites
and apply database and AD Online Patching (ADOP) patches to the DR site when you
apply them to the PROD site.

<a class="cta blue" id="cta" href="https://www.rackspace.com/data">Learn more about our Data services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Let's Talk** to [start the conversation](https://www.rackspace.com/).
