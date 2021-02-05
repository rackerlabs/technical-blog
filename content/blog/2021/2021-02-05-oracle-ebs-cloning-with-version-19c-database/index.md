---
layout: post
title: "Oracle EBS cloning with version 19c Database"
date: 2021-02-05
comments: true
author: Dushyant Chauhan
authorAvatar: 'https://gravatar.com/avatar/1817fa128828e2dbdd87e8e713a0cac0'
bio: "As a Racker, I have lots of experience as Oracle APPS DBA and exploring new technology."
published: true
authorIsRacker: true
categories:
    - database
    - Oracle
metaTitle: "Oracle EBS cloning with version 19c Database"
metaDescription: "This post discusses the process of step-by-step cloning with on-premise Oracle&reg;
E-Business Suite&reg; (EBS) R12.2 with version 19c Database using Recovery Manager (RMAN)
Hot backup on Red Hat&reg; Enterprise Linux&reg; servers. These steps also apply to
different operating systems."
ogTitle: "Oracle EBS cloning with version 19c Database"
ogDescription: "This post discusses the process of step-by-step cloning with on-premise Oracle&reg;
E-Business Suite&reg; (EBS) R12.2 with version 19c Database using Recovery Manager (RMAN)
Hot backup on Red Hat&reg; Enterprise Linux&reg; servers. These steps also apply to
different operating systems."
slug: "oracle-ebs-cloning-with-version-19c-database"

---

This post discusses the process of step-by-step cloning with on-premise Oracle&reg;
E-Business Suite&reg; (EBS) R12.2 on a version 19c Database by using Recovery Manager (RMAN)
Hot backup on Red Hat&reg; Enterprise Linux&reg; servers. These steps also apply to
different operating systems.

<!--more-->

### EBS Cloning

To perform EBS cloning, you need to complete the following high-level steps:

1. Run a pre-clone utility on the source database and application nodes.
2. Back up the full Container Database (CDB) database with archives by using RMAN Hot backup and copy it to the target node.
3. Clean up the target database and application node.
4. Copy the source application binaries and database binaries to the target node.
5. Configure $Oracle_Home on the target database node.
6. Restore and recover the databases.
7. Perform post-restore steps on the Target database node.
8. Configure the application on the target application node.
9. Perform post-clone steps on the application node.
10. Start the target application services.


Here are the steps in detail:

#### 1. Run pre-clone utility 

Run the pre-clone utility on the source database node and application node to create drivers and configuration files. This utility configures the database and application binaries on the target nodes before copying the database and application binaries to the target node.

a. Run the following commands to source the pluggable database (PDB) environment file on
   the database node at $ORACLE_HOME:

    cd $ORACLE_HOME
    . <PDB_NAME>_hostname.env
    cd $ORACLE_HOME/appsutil/scripts/$CONTEXT_NAME
    perl adpreclone.pl dbTier

b. Run the following commands on the application node:

    . EBSApps run (Source RUN FS)
    cd $ADMIN_SCRIPTS_HOME
    perl adpreclone.pl appsTier


#### 2. Back up the CDB

Back up the full CDB database with archives by using RMAN Hot backup and copy it to the
target node:

a. Run the following commands to source the CDB environment file at $ORACLE_HOME:

    cd $ORACLE_HOME
    . <CDB_NAME>_hostname.env
    connect target /

b. Run the following commands to complete this step:

    run {
     allocate channel d1 type disk;
     allocate channel d2 type disk;
     allocate channel d3 type disk;
     allocate channel d4 type disk;

     BACKUP as compressed backupset FULL FILESPERSET 10 FORMAT '<Backup location>/<SID>_bk_%s_%p_%t.bak' DATABASE;
     BACKUP as compressed backupset filesperset 10 FORMAT '<Backup location>/<SID>_arch_%s_%p_%t.bak' ARCHIVELOG ALL skip inaccessible;
     BACKUP FORMAT '<Backup location>/<SID>_cntrl_%s_%p_%t.bak' CURRENT CONTROLFILE;
     
     RELEASE CHANNEL d1;
     RELEASE CHANNEL d2;
     RELEASE CHANNEL d3;
     RELEASE CHANNEL d4;
    }

After completing the backup, either move to the target location or Network File System (NFS)
share the backup mount point to the target node to save time.

#### 3. Clean up

Clean up the target database and application node.

Run the following steps on the database node:

a. Take a backup of the following important configuration files and directories before
   you clean them up:

- $CONTEXT\_FILE
- environment files
- dbs
- $TNS\_ADMIN directories.

b. Remove target OH and drop the database.

c. Remove contents of **oraInventory**.

Note that the **UTL** directories should not have symbolic links. If symbolic links exist,
remove them and create a physical directory structure.

Run the following steps on the application node:

a. Take the backups of **RUN** and **PATCH $CONTEXT\_FILE** and the **$TNS\_ADMIN**
   directory of **RUN FS**.
b. Take a note of the target node **RUN FS** before cleaning up the application node.
c. Clean the **FS1**, **FS2**, **FS_NE**, and **oraInventory** directories.

#### 4. Copy the binaries

Perform the following steps to copy the source application binaries and database binaries
to the target node.

a. On the database node, copy and transfer version 19.0.0(19c) binaries to the target
   database server.

b. On the application node, transfer only the **EBSapps** directory of **RUN FS** from the
   source to the target node under the target **RUN FS**.
 
####  5. Configure $Oracle_Home

Configure $Oracle_Home on the target database node.

Before running `adcfgclone.pl` to configure $Oracle_Home, clean up the **oraInventory**
directory. If you are doing cloning for the first time on a new server, then run only the
following steps and provide values for all inputs. Perform the following steps:

a. Create the context file:

    cd $ORACLE_HOME/appsutil/clone/bin
    perl adclonectx.pl contextfile=<Source database context file> template=$ORACLE_HOME/appsutil/template/adxdbctx.tmp [pairsfile=<Pairs file Path>]

    perl adcfgclone.pl dbTechStack <Full Path of CONTEXT_FILE>

b. Create **listener.ora** and **tnsnames.ora**:

    cd $ORACLE_HOME/appsutil
    ./txkSetCfgCDB.env -dboraclehome=<ORACLE_HOME>

    cd $ORACLE_HOME/appsutil/bin
    perl txkGenCDBTnsAdmin.pl -dboraclehome=$ORACLE_HOME -cdbname=<target CDB NAME> \
    -cdbsid=<SID> -dbport=<Target DB port> -outdir=$ORACLE_HOME/appsutil/log \
    -israc=<yes/no> [-virtualhostname=<virtual hostname>]

c. If this is a repeated cloned instance, use the **CONTEXT_FILE** backup to configure the
   target database binaries:

    cd <RDBMS ORACLE_HOME>/appsutil/clone/bin
    perl adcfgclone.pl dbTechStack <Full Path of CONTEXT_FILE backup location>

d. If this is a repeated cloned instance, revert the **dbs** and **TNS** files so that all
   configuration files and init parameters are intact after configuration.

e. Start the listener.

#### 6. Restore and recover the database.

After you configure $Oracle_Home, start the target database restore by using that backup
that you took earlier:

a. Before restoring, check that the following parameters are correct in the target node.

   - db\_file\_name\_convert
   - log\_file\_name\_convert

b. Start the target database in a `nomount` state and run the following RMAN command to restore the database:

    Rman auxiliary /
    run
    {
       allocate auxiliary channel d1 device type disk;
       allocate auxiliary channel d2 device type disk;
       allocate auxiliary channel d3 device type disk;
       duplicate database to '<CDB NAME>' backup location '<RMAN backup     location>' nofilenamecheck;
       release channel d1;
       release channel d2;
       release channel d3;
    }
 
#### 7. Target post-restore steps

Perform the post -restore steps on the target database node.

After the CDB database restore finishes and you open the CDB instance, complete the
following steps:

a. Source the CDB env file and change the PDB name because you restored it as a source PDB
   name. Use the following commands to change the target PDB name:

    sqlplus / as sysdba
     SQL> alter pluggable database "<Source PDB Name>" close;
     SQL> alter pluggable database "<Source PDB Name>" unplug into '<ORACLE_HOME>/dbs/<Source PDB Name>_PDBDesc.xml';
     SQL> drop pluggable database "<Source PDB Name>";
     SQL> create pluggable database "<Target PDB Name>" using '<ORACLE_HOME>/dbs/<PDB Name>_PDBDesc.xml' NOCOPY SERVICE_NAME_CONVERT=('ebs_<Source PDB Name>','ebs_<Target PDB Name>','<Source PDB Name>_ebs_patch','<Target PDB Name>_ebs_patch');
     SQL> alter pluggable database "<Target PDB Name>" open read write;
     SQL> alter pluggable database all save state instances=all;
     SQL> sho pdbs

    CON_ID CON_NAME                       OPEN MODE  RESTRICTED
    ------ ------------------------------ ---------- ----------
         2 PDB$SEED                       READ ONLY  NO
         4 <PDB Name>                     READ WRITE NO

b. Source the PDB env file and perform the following command to set the target
   **UTL\_FILE\_DIR** values in Oracle Database:

    perl $ORACLE_HOME/appsutil/bin/txkCfgUtlfileDir.pl -contextfile=$CONTEXT_FILE -oraclehome=$ORACLE_HOME -outdir=$ORACLE_HOME/appsutil/log -mode=getUtlFileDir

c. Run the following command to edit the **\<PDB Name\>\_utlfiledir.txt** file under
   **Oracle_Home/dbs** and change the UTL Path accordingly:

    perl $ORACLE_HOME/appsutil/bin/txkCfgUtlfileDir.pl -contextfile=$CONTEXT_FILE -oraclehome=$ORACLE_HOME -outdir=$ORACLE_HOME/appsutil/log -mode=setUtlFileDir

d. Run the following script for each path in **\<PDB Name\>\_utlfiledir.txt**:

    perl $ORACLE_HOME/appsutil/bin/txkCfgUtlfileDir.pl -contextfile=$CONTEXT_FILE -oraclehome=$ORACLE_HOME -outdir=$ORACLE_HOME/appsutil/log -mode=createDirObject

    perl $ORACLE_HOME/appsutil/bin/txkCfgUtlfileDir.pl -contextfile=$CONTEXT_FILE -oraclehome=$ORACLE_HOME -outdir=$ORACLE_HOME/appsutil/log -mode=syncUtlFileDir -skipautoconfig=yes
 
    cd $ORACLE_HOME/appsutil/install/$CONTEXT_NAME
    sqlplus / as sysdba @adupdlib.sql <libext>

    clean FND_NODE table

    sqlplus apps/<Source Apps password>

    EXEC FND_CONC_CLONE.SETUP_CLEAN;

    Commit;

e. Use the following command to run **adautocfg.sh**:

    cd <$ORACLE_HOME/appsutil/scripts/$CONTEXT_NAME>
    sh adautocfg.sh
 
#### 8. Configure the target application

Configure the application on the target application node:

a. Before starting **adcfgclone.pl**, clean up the **PATCH FS**, **FS_NE**, and **oraInventory** directories.

b. Run the following commands to configure the application:

    cd <COMMON_TOP>/clone/bin
    export TIMEDPROCESS_TIMEOUT=-1
    export T2P_JAVA_OPTIONS="-Djava.io.tmpdir=<Temp directory location>"
    perl ./adcfgclone.pl appsTier dualfs

c. Provide all the inputs here.

d. If this is a repeated cloning instance, you can also use the backup of a CONTEXT_FILE. Run the following command:

    perl ./adcfgclone.pl appsTier <location of CONTEXT_FILE backup> dualfs

#### 9. Application post-clone steps

Perform the post-clone steps on the Application node:

a. After you configure the application, change the apps, sysadmin, and custom schema password, if any, by using the `FNDCPASS` command.

b. After changing the apps password, run `Autoconfig` on the database node and the application node.

c. Perform other custom steps, if any, for cloned instances.

#### 10. Start the target application services

You can now start all application services of the target clone instance and perform all
sanity checks for the cloned instances.

### Conclusion

Using the preceding steps, you can clone or refresh the PROD instance to non-prod servers
with version 19c databases with a multitenant architecture.


 
 
 





<a class="cta purple" id="cta" href="https://www.rackspace.com/sap">Learn more about our SAP services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Let's Talk** to [start the conversation](https://www.rackspace.com/).

