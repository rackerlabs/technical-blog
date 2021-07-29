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

This blog post describes how you can convert your client database running with a 
single-byte character set database, *WE8ISO8859P1*, to a Unicode Character Database (UCD),
 *AL32UTF8*, by using the Oracle Data Migration Assistant for Unicode (DMU) tool. 


<!--more-->

To migrate Oracle&reg; Database 12.1.0.2 and R12.1.3 E-Business Suite&reg; (EBS) application file system character set databases from WE8ISO8859P1 to AL32UTF8, complete the following steps:
 
1. Prerequisites Task
2. Install DMU, create the repository, and connect the DB into DMU
3. Scan the full Database
4. Cleanse Sys schemas and application schemas
5. Convert the database
6. EBS-related post-migration steps
7. Validate the UCD
 
### 1. Prerequisite tasks
 
Perform the following tasks before starting the migration:
 
1. Take a complete backup of the DB and applications. Count the invalid details and disable DB force logging.
2. Run `Purge RECYCLEBIN` and use the `GATHER AUTO` option to gather statistics on e-Business schemas. Check the `optimizer_features_enable` setting and correct it as needed.
3. Apply patch **28956851:R12.TXK.B (R12.1.3)**. Refer to Oracle Doc ID 393861.1.
4. Run AutoConfig on the Application node
5. Create the **/admin/out/appsutil.zip** file on the application node by running the following command:
 
         $perl $AD_TOP/bin/admkappsutil.pl
 
6. Copy **appsutil.zip** to **RDBMS ORACLE_HOME** and run the following command:
 
          $unzip -o appsutil.zip
 
7. Run **adautocfg.sh** on the DB node.
8. Run **adautocfg.sh** on the application node.
 
 ### 2. Install DMU, create the repository, and connect the DB into DMU
 
Perform the following steps to prepare to use the DMU:
 
1. Execute the following commands as a SYS user:
 
        SQL> spool prvtdumi.log
        SQL> @?/rdbms/admin/prvtdumi.plb
 
2. Run the following command to create a password file:
 
        NONPROD [oradi@nordlrbbnebsd01 dbs]$ orapwd file=$ORACLE_HOME/dbs/orapw$ORACLE_SID password=*****
 
3. Download and install JDK if required.
4. To launch DMU on a VNC session and create a database connection to the DMU tool, run the following command:
 
        $ sh dmu.sh
 
5. Save the connection.
 
{{<img src="Picture1.png" title="" alt="">}}
 
6. Select the `Install the DMU repository` checkbox.
 
{{<img src="Picture2.png" title="" alt="">}}
 
7. Click **Next**.
 
{{<img src="Picture3.png" title="" alt="">}}
 
Click **Next** and then **Finish**.
 
{{<img src="Picture4.png" title="" alt="">}}
 
The preceding message displays after the repository installs successfully.
 
### 3. Scan the full Database
 
Now scan the data dictionary and the application schemas:
 
1. When you right-click on the DB connection name, you see the following navigation list to select and scan the database:
 
{{<img src="Picture5.png" title="" alt="">}}
 
2. Click **Next**:
 
{{<img src="Picture6.png" title="" alt="">}}
 
3. Click **Next** to change the number of scanning processes and the scan size to speed up the DMU scan.
 
{{<img src="Picture7.png" title="" alt="">}}
 
4. Click **Finish**.
 
{{<img src="Picture8.png" title="" alt="">}}
 
{{<img src="Picture9.png" title="" alt="">}}
 
The following screenshot shows the scan in progress:
 
{{<img src="Picture10.png" title="" alt="">}}
 
The following screenshot confirms the complete database scan:
 
{{<img src="Picture11.png" title="" alt="">}}
 
### 4. Cleanse sys schemas and application schemas
 
After scanning, you need to look at the data using the **Database Scan Report** as illustrated in the following image:
 
{{<img src="Picture12.png" title="" alt="">}}
 
Notice that your actual data shown in the DMU is in the following columns:
 
- **Need no change**: The data in this column does not require conversion.
- **Need conversion**: The DMU converts the data in this column.
- **Invalid representation**: You need to fix this before converting the database. Manually fix this data issue by using the **Cleansing Editor** to edit the data.
- **Over column limit**: Use the **Bulk Cleansing** wizard. You can fix this by changing the **VARCHAR2** columns to use **CHAR** instead of **BYTE** semantics.
- **Over type limit**: Use SQL Developer or the **Cleansing Editor** wizard to fix this problem.
 
To perform bulk cleansing, perform the following steps:
 
1. Right-click on the database connection and select the **Bulk Cleansing** option from the pop-up menu.
 
2. Run the **Migrate to character length semantics** option and check the results of the bulk cleansing. You also have the option to select a different parameter to clean the dirty data.
 
3. You can also refer to some tips for the issues and fixes related to DMU Doc ID 2018250.1.
 
4. You need to clear all the warnings before proceeding to the conversion steps. Sometimes you need to open a service request (SR) to confirm some issue or data purge during cleansing.
 
{{<img src="Picture13.png" title="" alt="">}}
 
### 5. Convert the database
 
 After fixing all the issues, right-click on the Database connection, select the **Convert Database** option, and click **Convert**. 
 
{{<img src="Picture14.png" title="" alt="">}}
 
Accept all the defaults by clicking the **Next**. The **Migration Status** tab also shows the conversion status when it completes.
 
Migration in progress:   
 
{{<img src="Picture15.png" title="" alt="">}}
 
Migration is complete as indicated by the **Status** panel:
 
{{<img src="Picture16.png" title="" alt="">}}
 
### 6. EBS-related post-migration steps
 
This section includes steps 3.1.4 through 3.3 from Doc ID 393861.1 Update Database Tier AutoConfig Context Files, Appendix A:
 
1. On the DB node, execute the following command and verify **NLS_LANG** is in the DB env file:
 
        $ perl txkSetUnicodeCharSet.pl 
 
2. On the Apps tier, execute the following commands:
 
        $ ls $ORACLE_CONFIG_HOME/reports/Tk2Motif_AL32UTF8.rgb
/u01/app/appdi/DEV/inst/apps/MKS_mksdbcs/ora/10.1.2/reports/Tk2Motif_AL32UTF8.rgb
        $ ls $ORACLE_HOME/guicommon/tk/admin/Tk2Motif_UTF8.rgb /u01/app/appdi/DEV/apps/tech_st/10.1.2/guicommon/tk/admin/Tk2Motif_UTF8.rgb
        $ cd $ORACLE_CONFIG_HOME/reports/
        $ cp Tk2Motif_AL32UTF8.rgb $ORACLE_CONFIG_HOME/reports/Tk2Motif_AL32UTF8_backup.rgb
        $ grep -i fontMapCs Tk2Motif_AL32UTF8.rgb
   !Tk2Motif*fontMapCs: iso8859-2=EE8ISO8859P2
   Tk2Motif*fontMapCs: iso8859-1=UTF8
         $ vi Tk2Motif_AL32UTF8.rgb
         $ grep -i fontMapCs Tk2Motif_AL32UTF8.rgb
   !Tk2Motif*fontMapCs: iso8859-2=EE8ISO8859P2
   Tk2Motif*fontMapCs: iso8859-1=AL32UTF8
 
3. Execute the following command and verify **NLS_LANG** is in the Application env file:
 
         $ perl txkSetUnicodeCharSet.pl
 
4. Regenerate Forms and Reports through **adadmin**.
5. Regenerate Messages through **adadmin**.
6. Update the **ICX:Client IANA** profile option to `UTF-8`.
 
### 7. Validate the UCD  
 
Start services and validate the application. It should work fine for you.
 
### Conclusion 
 
The Oracle DMU tool provides a streamlined solution for migrating a legacy single-byte character set database to a UCD. The DMU tool helps ensure all character data migrates correctly quicker and easier. It also ensures that the migration completes without any data loss and validates the data integrity of the databases. 
 
If the Oracle EBS application has more than one language group, UCD is the only choice. Oracle recommends using Unicode as the database character set for maximum compatibility and extensibility. 
The UCD character set supports all frequently used languages. It also supports symbols like the Euro sign, smart quotes, and scientific and musical notations. The IT industry is using UCDs more and more every day.


<a class="cta teal" id="cta" href="https://www.rackspace.com/data/databases">Learn more about our Database services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
