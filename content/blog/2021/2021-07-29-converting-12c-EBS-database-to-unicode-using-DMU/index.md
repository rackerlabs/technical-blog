---
layout: post
title: "Converting a 12c EBS database to Unicode using DMU"
date: 2021-07-29
comments: true
author: Manoj Singh
authorAvatar: 'https://secure.gravatar.com/avatar/678fd97665a11d4cadf6fdfa042e12ed'
bio: "Senior Oracle Application DBA at Rackspace Technology, with 11+ years of IT 
experience in Apps DBA/Cloud DBA/Database Architect/Middleware/Exadata as a IT Consultant."
published: true
authorIsRacker: true
categories:
    - Oracle
metaTitle: "Converting a 12c EBS database to Unicode using DMU"
metaDescription: "Convert your client database running with single-byte character set to 
a Unicode character set database using Oracle Data Migration Assistant for Unicode (DMU) tool."
ogTitle: "Converting a 12c EBS database to Unicode using DMU"
ogDescription: "Convert your client database running with single-byte character set to a 
Unicode character set database using Oracle Data Migration Assistant for Unicode (DMU) tool."
slug: "converting-12c-ebs-database-to-unicode-using-dmu"

---

This blog describes about how you can convert your client database running with 
single-byte character set to a Unicode character set database using Oracle Data Migration 
Assistant for Unicode (DMU) tool. You will learn how to convert a database character Set 
Migration to Unicode AL32UTF8 from WE8ISO8859P1. 


<!--more-->

This blog describes about how you can convert your client database running with 
single-byte character set to a Unicode character set database using Oracle Data Migration 
Assistant for Unicode (DMU) tool. You will learn how to convert a database character Set 
Migration to Unicode AL32UTF8 from WE8ISO8859P1. I have listed all the necessary steps for 
migrating Oracle Database 12.1.0.2 and R12.1.3 E-Business suit Application file system 
character set from WE8ISO8859P1 to AL32UTF8. 

To convert a database into Unicode, we will complete the following steps:

1. Prerequisites Task
2. DMU Installation/Repository Creation/DB connection into DMU
3. Scan the full Database
4. Cleansing Sys Schemas and Application schemas
5. Converting the database
6. EBS related Post steps
7. Validation of Unicode



### 1. Prerequisites Task

1. Take complete backup of DB and Apps. Take count of invalid details & disable DB force logging.

2. Purge RECYCLEBIN and submit "Gather Schema Statistics" using GATHER AUTO option to gather statistics on e-Business schemas.  Check optimizer_features_enable setting and correct it.

3. Apply Patch 28956851:R12.TXK.B (R12.1.3) -Refer Doc ID 393861.1

4. Run AutoConfig on Application node

5. Create the appsutil.zip file on app node by running the following command:

<code> $perl $AD_TOP/bin/admkappsutil.pl </code>

This will create appsutil.zip in /admin/out.

6. Copy or FTP the appsutil.zip file to the RDBMS ORACLE_HOME, then run the following

<code> $unzip -o appsutil.zip <code>

7. Run adautocfg.sh on DB node

8. Run adautocfg.sh on app node




### 2. DMU Installation/Repository Creation/DB connection into DMU

1. Execute the following as a SYS user

<code> SQL> spool prvtdumi.log </code>

<code> SQL> @?/rdbms/admin/prvtdumi.plb </code>

2. Create Password File 

<code> NONPROD [oradi@nordlrbbnebsd01 dbs]$ orapwd file=$ORACLE_HOME/dbs/orapw$ORACLE_SID password=***** </code>

3. Download and install JDK if required

4. Launch DMU on VNC session as $sh dmu.sh and create database connection into DMU tool.

{{<img src="Picture1.png" title="" alt="">}}

5. Save connection.

{{<img src="Picture2.png" title="" alt="">}}

6. Now install the DMU repository.

{{<img src="Picture3.png" title="" alt="">}}

7. Click on Next.

{{<img src="Picture4.png" title="" alt="">}}

8. Click on Next.

{{<img src="Picture5.png" title="" alt="">}}

9. Click on Finish.

{{<img src="Picture6.png" title="" alt="">}}

You will get the above message once the repository gets installed successfully.


### 3. Scan the full Database

Now scan Data Dictionary and the Application Schemas: - Right click on DB connection name and you will get the following navigation list to select and scan the database.

{{<img src="Picture7.png" title="" alt="">}}

{{<img src="Picture8.png" title="" alt="">}}

Click on Next

{{<img src="Picture9.png" title="" alt="">}}

Click on next to change the number of scaning process/scan size here to speedup the DMU scan

{{<img src="Picture10.png" title="" alt="">}}

{{<img src="Picture11.png" title="" alt="">}}

Click on Finish.

{{<img src="Picture12.png" title="" alt="">}}

Scanning in progress.

{{<img src="Picture13.png" title="" alt="">}}

The above screenshot confirms the complete scanning of the database. 

### 4. Cleansing Sys Schemas and Application schemas

Post scanning, you need to look at the data using the ""Database Scan Report"" as illustrated in the following image:

{{<img src="Picture14.png" title="" alt="">}}

Here you will notice that your actual data looking into the DMU is in a different column.
•	Need no change - The data into this column does not requires conversion.
•	Need conversion - The data into this column will be converted by DMU itself.
•	Invalid representation -This needs to be fixed before converting the database. Manually fix this data issue by Cleansing Editor to edit the data.
•	Over column limit - Use Bulk Cleansing Wizard. You can fix this by changing the VARCHAR2 columns to use CHAR instead of BYTE semantics.
•	Over type limit - Use SQL Developer or Cleansing Editor Wizard to fix this problem.

Bulk Cleansing: - Now Right-click on the database connection and select the "Bulk Cleansing" option from the popup menu. First run the "Migrate to character length semantics" option and check the results of the bulk cleansing. You have an option to select a different parameter as well to clean the dirty data. 

Also refer to some know how tips for the Issues and fixes related to DMU Doc ID 2018250.1.

You need to clear all the warnings before proceeding to the conversion steps. Sometimes you need to open a SR to confirm some issue or data purge during cleansing.

{{<img src="Picture15.png" title="" alt="">}}

### 5. Converting the database

After fixing all the issues, right click on the Database connection and select the "Convert Database" option and click on the "Convert" button. Accept all the defaults by clicking the "Next". After some time the Migration Status tab also shows the conversion status as completed.

{{<img src="Picture16.png" title="" alt="">}}

Migration in progress.

{{<img src="Picture17.png" title="" alt="">}}

Migration is complete as indicated by the status panel.

{{<img src="Picture18.png" title="" alt="">}}

### 6. EBS related Post steps

Now complete all the post steps from Steps no. 3.1.4 Update Database Tier AutoConfig Context Files from (Doc ID 393861.1) Appendix A upto step no Step no. 3.3 as below.
On DB node:-
•	Execute $ perl txkSetUnicodeCharSet.pl and verify NLS_LANG into the DB env file
On the Apps tier:-

<code> $ ls $ORACLE_CONFIG_HOME/reports/Tk2Motif_AL32UTF8.rgb
   /u01/app/appdi/DEV/inst/apps/MKS_mksdbcs/ora/10.1.2/reports/Tk2Motif_AL32UTF8.rgb
$ ls $ORACLE_HOME/guicommon/tk/admin/Tk2Motif_UTF8.rgb
   /u01/app/appdi/DEV/apps/tech_st/10.1.2/guicommon/tk/admin/Tk2Motif_UTF8.rgb
$ cd $ORACLE_CONFIG_HOME/reports/
$ cp Tk2Motif_AL32UTF8.rgb $ORACLE_CONFIG_HOME/reports/Tk2Motif_AL32UTF8_backup.rgb
$ grep -i fontMapCs Tk2Motif_AL32UTF8.rgb
   !Tk2Motif*fontMapCs: iso8859-2=EE8ISO8859P2
   Tk2Motif*fontMapCs: iso8859-1=UTF8
$ vi Tk2Motif_AL32UTF8.rgb
$ grep -i fontMapCs Tk2Motif_AL32UTF8.rgb
   !Tk2Motif*fontMapCs: iso8859-2=EE8ISO8859P2
   Tk2Motif*fontMapCs: iso8859-1=AL32UTF8 </code>
   
•	Execute $ perl txkSetUnicodeCharSet.pl and verify NLS_LANG into the Application env file.
•	Regenerate Forms and Reports through adadmin
•	Regenerate Messages through adadmin
•	Update ICX:Client IANA Profile Option  to UTF-8



### 7. Validation of Unicode

Start services, validate application and it has worked fine for us.


### Conclusion

Here Oracle Database Migration Assistant for Unicode tool DMU provides us a streamlined solution for migrating a legacy single byte character set databases to Unicode Character set Database. DMU toll helps ensure all character data is migrated correctly with reduced time and complexity. It also ensures that migration is both simple and completed without any data loss. It also validates the data integrity of the databases. 

If more than one language group is used into the Oracle EBS application then Unicode Database is the only choice. Oracle recommends using Unicode as the database character set for maximum compatibility and extensibility. 

The Unicode database character supports all the languages with significant usage. It also supports maximum symbols like Euro sign and smart quotes, scientific, and musical notations. Use of Unicode Database is rapidly increasing day by day within the IT industry.

Ref Doc:-
Globalization Guide for Oracle Applications Release 12 (Doc ID 393861.1)
The Database Migration Assistant for Unicode (DMU) Tool (Doc ID 1272374.1)
Tips For and Known Issues With The Database Migration Assistant for Unicode (DMU) Tool version (Doc ID 2018250.1)


<a class="cta teal" id="cta" href="https://www.rackspace.com/data/databases">Learn more about our Database services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
