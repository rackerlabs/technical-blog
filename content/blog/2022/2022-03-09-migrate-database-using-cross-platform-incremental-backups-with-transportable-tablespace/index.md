---
layout: post
title: "Migrate database using cross-platform incremental backups with transportable tablespace"
date: 2022-03-09
comments: true
author: Anil Kumar Kampiri
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
    - Databases
metaTitle: "Migrate database using cross-platform incremental backups with transportable tablespace"
metaDescription: "The transportable tablespace feature enables to move a set of applications from one Oracle database to another desired Oracle database."
ogTitle: "Migrate database using cross-platform incremental backups with transportable tablespace"
ogDescription: "The transportable tablespace feature enables to move a set of applications from one Oracle database to another desired Oracle database.  "
slug: "migrate-database-using-cross-platform-incremental-backups-with-transportable-tablespace"

---

The transportable tablespace feature enables to move a set of applications from one Oracle database to another desired Oracle database. 

<!--more-->

By using Transportable tablespace with cross-platform incremental backup, the downtime required for the migration significantly reduces; It also provides the benefits of transportable tablespace by supporting cross-platform migrations.

### Overview
The Transportable tablespace (XTTS) with Cross-Platform Incremental Backups procedure can be implemented by completing the following stages:

#### Stage 1- Target Database installation and setup
#### Stage 2- Initiate Level 0 Backup
#### Stage 3- Roll Forward using incremental backup
#### Stage 4- Final incremental backup
#### Stage 5- Import Metadata Objects into Destination Database
#### Stage 6- Validate the Transported Tablespace
#### Stage 7- Remove Backup Files

#### Stage 1- Target Database installation and setup
*Step 1.1*  **Install the desired Oracle Database software 19c on the destination system with the database and default tablespace e.g.: SYS, SYSTEM, USERS **(Database versions can be our desired version based on requirement starting from 12c or later)**

*Step1.2)* **Create the schemas required for the desired transportable tablespace in the destination database without objects.**   
**(If using multitenant architecture, ensure desired Pluggable database is created, and schema is created under this database.)**    
Note: Initially Schemas need to be created on default tablespace USERS as the desired tablespace need to be transported should not be present at the target during metadata import at stage 5.

*Step1.3)* **Identify application-specific tablespace to be transported in the source system (i.e tablespace required for migration).**

*Step1.4)*  **Download scripts required for backup database on the source system.**
(i.e. rman_xttconvert scripts are oracle provided automated scripts to proceed with this operation)

On the source database server, from the operating system owner Oracle, download and extract the Oracle provided scripts rman_xttconvert_VER4.zip this can be downloaded from oracle **Doc ID (Doc ID 2471245.1)**

<img src=Picture1.png title="" alt="">

*Step 1.5)* **Create necessary backup locations**

**a)On source:**
-	Location of the source database backups created from xttdriver.pl script during stage 2 as defined by in the xtt.properties file refer step 1.6.

_Note: xttconvert scripts won’t support compressed backup so kindly ensure the directory we create has enough space to hold space equal to source database size._

**b) On destination:**
-	Location of backups moved from a source as defined in the xtt.properties file.  
-	Location for restored transportable tablespace data files on the target database, as mentioned in the xtt.properties file. (If target destination is ASM ensure the desired diskgroup is mounted)

*Step 1.6)* **Configure xtt.properties. This file can be found under path xtt on the source system as shown in the following snapshot and ensure platformid is same on both source and target else this operation will fail.**

<img src=Picture2.png title="" alt="">
<img src=Picture3.png title="" alt="">

*Step 1.7)* **Copy xttconvert scripts including  xtt.properties to the target database server.**

<img src=Picture4.png title="" alt="">

*Step 1.8)* **Set `TMPDIR` environment variable**

<img src=Picture5.png title="" alt="">


#### STAGE 2 - Initiate Level 0 Backup

During this stage, Level 0 Backup initiated for the source tablespaces mentioned in xtt. Properties config file, and Level 0 backup files are copied to the destination database server and restored using Oracle provided scripts refer step 2.1.

*Step 2.1)* **Initiate Level 0 Backup using xttdriver**

At the source database server, from the database Operating System Owner Oracle set the environment referring to the source database. Execute the following statement to backup the database to the src_scratch_location.

 (If it is a Multitenant database ensure xtt.properties is updated with desired Container connection string refer step 1.6) 

<img src=Picture6.png title="" alt="">

*Step 2.2* - **Transfer the Level 0 Backup files and Configuration files (xtt.properties,res.txt)to the destination system:**

-	Copy Backups created from Level 0 backup (location defined in src_scratch_location) to destination database server (location defined in **dest_scratch_location*)
-	Copy res.txt file from source system $TMPDIR to destination system $TMPDIR:
Note: res.txt need to be transferred to target whenever backup is taken using xttdriver.pl

<img src=Picture7.png title="" alt="">

*Step 2.3* - **Restore data files using copied Level 0 Backup on the target database.**

On the destination server, from the database Operating System Owner Oracle, set the environment referring to the destination database, run the roll forward datafiles step as follows:

<img src=Picture8.png title="" alt="">

#### STAGE 3 - Roll Forward using incremental backup

During this stage an incremental backup based on SCN from the last backup is created on the source 12c database, are copied to the target database server 19c, and data files are converted to the destination endian format, then incremental backups are applied to the restored datafile copies to roll forward on the destination database server. This operation will repeat to make data sync with the source database until the date of the actual migration. 

*Step 3.1* - **Create an incremental backup at the source database for the planned tablespace.**

<img src=Picture9.png title="" alt="">

*Step 3.2* - **Transfer incremental backups and res.txt to the destination system**

<img src=Picture10.png title="" alt="">

**Note: We can ignore backups coping to the target system if both source and target backup locations are mounted on the same NFS.**

*Step 3.3* - **Apply the backup created on step 3.1 to the restored data files on the target server.**

On the target database server, from the operating system owner Oracle has set the environment referring to the destination database, complete the following step:

<img src=Picture11.png title="" alt="">

*Step 3.4* - **Repeat the roll forward phase 3 (3.1 - 3.3) until the date of migration, and then proceed to stage 4, for the final incremental backup**

#### STAGE 4 - Final Incremental Backup

During this stage, the desired source database tablespaces are changed to READ ONLY for making destination data files to consistent with the source database incremental backups by applying a final incremental backup.

*Step 4.1* - **Modify source tablespace(s) to READ ONLY:**

<img src=Picture12.png title="" alt="">

*Step 4.2* - **Create the one last incremental backup of the desired tablespaces being transported on the source system:**

<img src=Picture13png.png title="" alt="">

**Note: As tablespace is in read-only mode, you will receive warnings in the backup logs. You can ignore the same.**

*Step 4.3*- **Transfer the final backups and res.txt to the destination system**

<img src=Picture14.png title="" alt="">

*Step 4.4* - **Apply final incremental backup to the target transported tablespace data files.**

<img src=Picture15.png title="" alt="">

#### STAGE 5 - Import Metadata Objects into Destination Database

**Import across sqlnet.**

*Step 5.1* **Create the datapump directory on the target database and grant privilege on the Source system.**

<img src=Picture16.png title="" alt="">

*Step 5.2*  **Generate new xttplugin.txt for network import**
On the source database server, log in as the database Operating system owner to set the environment referring to the source database. Execute the following statement.

<img src=Picture17.png title="" alt="">

This will generate xttplugin.txt with sample import script including datafiles of all transportable tablespace transfer this to the target database.

*Step 5.3*  **Create a network link on the target database for the metadata import.**

<img src=Picture18.png title="" alt="">

*Step:5.4* **Modify xttplugin.txt for the import script with the directories and database links we created at step 5.3 and step 5.1.**

(This step restores metadata and tablespace won’t take much longer)

<img src=Picture19.png title="" alt="">


*Step 5.5* **import metadata using impdp utility script generated from modified xttplugin.txt for the final data restore.**

#### Stage 6: Validate the Transported Tablespace

*Step 6.1* **Check tablespace for corruption:**

At this stage, the migrated tablespace is READ ONLY in the destination database.  Perform validation specific to the application by comparing objects to verify the transported data.

Also, run RMAN for physical and logical block corruption of transported tablespace of a specific pluggable database by running VALIDATE TABLESPACE as follows:

<img src=Picture20.png title="" alt="">

*Step 6.2* **Modify the tablespace(s) to READ WRITE mode in the destination database**

<img src=Picture21.png title="" alt="">

*Step 6.3* **Compare source and target objects and recreate manually if any missing objects to validate the application, if everything works, the migration process is complete.**

#### Stage 7  Remove Backup files

Files created by this process are huge and can be deleted post migration. These files are available in the following path Source (src_scratch_location) location files on the source system
-	dest_scratch_location location files on the destination system
-	$TMPDIR location files in both source and destination systems

### Conclusion

By using cross platform incremental backups with transportable tablespace migration can be done with reduced downtime across platforms. However, datatype restriction and limitation apply to transportable tablespace please refer to oracle article (Doc ID 1454872.1) for the complete supported platform and datatype.


<a class="cta red" id="cta" href="https://www.rackspace.com/applications/oracle">Let our experts guide you on your Oracle Applications journey.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
