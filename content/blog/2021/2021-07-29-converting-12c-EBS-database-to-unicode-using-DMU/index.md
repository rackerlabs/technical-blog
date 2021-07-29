---
layout: post
title: "Converting a 12c EBS database to Unicode using DMU"
date: 2021-07-29
comments: true
author: Manoj Singh
authorAvatar: 'https://en.gravatar.com/mksingh0178618'
bio: "Senior Oracle Application DBA at Rackspace Technology, with 11+ years of IT experience in Apps DBA/Cloud DBA/Database Architect/Middleware/Exadata as a IT Consultant."
published: true
authorIsRacker: true
categories:
    - General
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


<!--more-->

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

You will get the above message once the repositry gets installed successfully.

### 3. Scan the full Database

xxx

### 4. Cleansing Sys Schemas and Application schemas

xxx

### 5. Converting the database

xxx

### 6. EBS related Post steps

xxx

### 7. Validation of Unicode

xxx


### Conclusion

<a class="cta teal" id="cta" href="https://www.rackspace.com/data/databases">Learn more about our Database services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
