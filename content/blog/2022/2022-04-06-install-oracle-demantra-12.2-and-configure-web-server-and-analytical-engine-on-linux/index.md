---
layout: post
title: "Install Oracle Demantra 12.2 & Configure Web Server and Analytical Engine on Linux"
date: 2022-04-07
comments: true
author: Narendra Dixit
authorAvatar: 'https://secure.gravatar.com/avatar/2ea19c113ac5dd7ab4879607f1468950'
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
    - Database
metaTitle: "Install Oracle Demantra 12.2 & Configure Web Server and Analytical Engine on Linux"
metaDescription: "Oracle Demantra is a demand management and supply chain management tool provided by Oracle."
ogTitle: "Install Oracle Demantra 12.2 & Configure Web Server and Analytical Engine on Linux"
ogDescription: "Oracle Demantra is a demand management and supply chain management tool provided by Oracle. "
slug: "install-oracle-demantra-12.2-and-configure-web-server-and-analytical-engine-on-linux"

---

Oracle Demantra is a demand management and supply chain management tool provided by Oracle.

<!--more-->

It is a best-in-class provider of demand management, sales & operations planning, and trade promotions management solutions. It is integrated with Oracle E-Business Suite / Oracle Advanced Planning (APS) Suite (Oracle Advanced Supply Chain Planning (ASCP)) to leverage Demantra demand management and supply chain management functionality to maximum level. For understanding more architecture related details, refer to my earlier [blog](https://docs.rackspace.com/blog/understand-and-install-oracle-demantra-and-spwa/).


In this one, I have discussed step by step instructions to Install Oracle Demantra 12.2 with Oracle Advanced Planning (APS) 12.2 Suite and configure of Demantra web server and Analytical engine on Linux server for better performance and stability. 

**Note** 

-	Installation steps are based on Oracle Demantra 12.2.6.2 with Oracle Advanced Planning (APS) 12.2.6 Suite

-	Functional Integration steps of Oracle Demantra and Oracle APS/ASCP is out of scope of this document. 

### Installation Steps for Demantra 12.2 with APS/ASCP 12.2

The process to install the Demantra application is a multi-step process. 
 	
Steps to Install Oracle Demantra 12.2 with Oracle Advanced Planning (APS) 12.2 Suite and configure of Demantra web server and Analytical engine on Linux server for better performance has been divided into the following four phases:

-	Phase 1: Prepare APS/ASCP database for Demantra
-	Phase 2: Install Oracle Demantra on Windows Machine
-	Phase 3: Configure Oracle Demantra Web Server and Deploy Demantra Application (ear) on Linux
-	Phase 4: Configure and Deploy Oracle Demantra Analytical Engine on Linux

I am focusing on Phase 1 and Phase 2 this time and in my follow up blog, I will be covering Phase 3 and 4.

<img src=Picture1.png title="" alt="">

**Following are the details related to Phase 1 and 2:**

This document assumes, ASCP Suite is already provisioned, also build of Window and Linux servers for Demantra is completed along with users/group/networking/security/storage already in place.

#### Prepare APS/ASCP database for Demantra

The Demantra application must be installed in the same database as ASCP /APS (target Planning instance) for the integration of ASCP and Demantra to work. The EBS source instance can be in a separate database.

Please complete the following steps in the ASCP Database 


1.	Add below into init ora file

`db_16K_cache_size=1024M`

`db_securefile=NEVER` 
 

SQL> `show parameter db_16k_cache_size`

NAME                                 TYPE        VALUE
------------------------------------ ----------- ------------------------------
db_16k_cache_size                    big integer    1G
SQL> show parameter db_securefile

NAME                                 TYPE        VALUE
------------------------------------ ----------- ------------------------------
db_securefile                        string         NEVER
SQL>

2.	Create the password file using orapwd ignore if password file already exists.

`orapwd file=orapw<ORACLE_SID> password=XXXXX entries=10 ignorecase=y`

3.	Create the Tablespace TS_DMT_DATA and TS_DMT_IDX with blocksize 16k in database by completing the following step. 

`SQL> CREATE TABLESPACE TS_DMT_DATA DATAFILE`

`'/u01/oradata/DTTIC/d_dmt_data01.dbf' SIZE 2G AUTOEXTEND ON  MAXSIZE 20G,`

`/u01/oradata/DTTIC/d_dmt_data02.dbf' SIZE 2G AUTOEXTEND ON  MAXSIZE 20G`

`LOGGING ONLINE PERMANENT BLOCKSIZE 16K`

`EXTENT MANAGEMENT LOCAL UNIFORM SIZE 128K`

`SEGMENT SPACE MANAGEMENT AUTO;  2    3    4    5    6`

Tablespace created.

`SQL> CREATE TABLESPACE TS_DMT_IDX DATAFILE`

`'/u01/oradata/DTTIC/d_dmt_idx01.dbf' SIZE 2G AUTOEXTEND ON  MAXSIZE 20G,`

`/u01/oradata/DTTIC/d_dmt_idx02.dbf' SIZE 2G AUTOEXTEND ON  MAXSIZE 20G`

`LOGGING ONLINE PERMANENT BLOCKSIZE 16K`

`EXTENT MANAGEMENT LOCAL UNIFORM SIZE 128K`

`SEGMENT SPACE MANAGEMENT AUTO;  2    3    4    5    6`

Tablespace created.

#### Phase 2: Install Oracle Demantra on Windows Machine

The Demantra application is installed on a Windows server because Oracle Demantra Installer and Oracle Demantra Administrative Utilities (Installer, Business Modeler and Demand Management Tools etc.) are supported only on Windows platforms.

The Demantra Installer on window server creates the database schema (in APS Database) and the administrator tools required to configure the application. 

**Pre steps to Installing 12.2.6.2 Demantra in Window 64-bit 2012 Server Machine are**

1.	Install 64-bit Oracle Database 12c (12.1.0.2) client on Window Server.
2.	Add the Oracle home and Oracle base in you env variables

Step1: Right click on My Computer Properties
Click on Advanced system settings Environment Variables

Step2: Setup TNS for Planning Database 

Add below into tnsnames.ora

`DTTIC=`
        `(DESCRIPTION=`
                `(ADDRESS=(PROTOCOL=tcp)(HOST=ndemdb01 .xx.xxx..net)(PORT=1543))`
           ` (CONNECT_DATA=`
                `(SERVICE_NAME=DTTIC)`
                `(INSTANCE_NAME=DTTIC)`
           ` )`
      `  )`

3.	Test SQLPLUS connection from the Oracle client (system/syssbx@dbSid)

**Steps to Install 12.2.6.2 Demantra in Window 64-bit 2012 Server Machine are**

1.	Download Patch 25820351: DEMANTRA 12.2.6.2 Release from My Oracle Support and extract p25820351_122620_MSWIN-x86-64.zip at temp location on window server 
2.	Double click on setup.exe  

<img src=Picture2.png title="" alt="">

1.	Click on Install Demantra Spectrum.
2.	Installer window is showing up. 
3.	Click Next
4.	Choose the options to deploy *Demantra and/ or engine on Linux*
*Note: Please select these options to implement demantra Web and Analytical engine on Linux servers for better performance and stability.*

<img src=Picture3.png title="" alt="">

5.	Choose the installation folder for Demantra application.
6.	Choose the location of the shortcuts/icons for your Demantra application.
7.	Fill in the DBA user / password.  

<img src=Picture4.png title="" alt="">

8.	Then click Next on Demantra installer screen.
9.	Fill in your Demantra schema name and the password.

<img src=Picture5.png title="" alt="">

(Here Demantra schema : DEM)

10.	Fill in your connection details

<img src=Picture6.png title="" alt="">

11.	Depending on if your DBA (in this case system user) has SYSDBA privileges, a warning message can popup. Click Next


<img src=Picture7.png title="" alt="">

12.	Option to choose the standard or custom application shows up. 

13.	Choose tablespaces where Demantra objects will reside. Make sure you have enough free tablespace. 

<img src=Picture8.png title="" alt="">

14.	Choose languages. A default language must be selected. 
15.	Set up the Demantra URL. 
16.	You can set up the email account or it can be set up later. 
17.	Check the summary of the choices and click Install.

<img src=Picture9.png title="" alt="">


18.	Wait for installation to run. 

<img src=Picture10.png title="" alt="">

19.	It will ask for java 8 update 51 installation, if not already installed. 

<img src=Picture11.png title="" alt="">

20.	Install Java 8 update 51.

21.	Choose Next. 
22.	Choose the folder for java installation. 
23.	*Close java setup when the installation is complete.* 

Acrobat reader installer will be launched

<img src=Picture12.png title="" alt="">

<img src=Picture13.png title="" alt="">

Click ok

24.	Demantra installation will continue. 

<img src=Picture14.png title="" alt="">

25.	Fill in Demantra user passwords.

<img src=Picture15.png title="" alt="">

*All passwords are set to same passwords.*   (Note: It is case sensitive)

26.	Click Done to complete the installation. 

<img src=Picture16.png title="" alt="">

27.	If the DBA user has no SYSDBA privileges, a warning pops up. 

<img src=Picture17.png title="" alt="">


28.	Make note of the SQL that must be run after completing the installation.

29.	**Click OK. The installation has completed.**

30.**Manually execute sys_grants.sql**

30.	Manually execute sys_grants.sql 
*Copy D:\demantra\Demand Planner\Database Objects\Oracle Server\admin to Database server into a temp location e.g. /u01/app/oradc/DTTIC/patches/Demantra*

[oradc@ndemdb01  admin]$ pwd

/u01/app/oradc/DTTIC/patches/demantra/admin

[oradc@ndemdb01  admin]$ ls -lrt

total 68

`-rw-rw-r-- 1 oradc oradc   234 Mar 30 14:17 UPDATE_PASSWORDS.sql`

`-rw-rw-r-- 1 oradc oradc  2265 Mar 30 14:17 system_revokes.sql`

`-rw-rw-r-- 1 oradc oradc 14568 Mar 30 14:17 sys_grants.sql`

`-rw-rw-r-- 1 oradc oradc  5216 Mar 30 14:17 run_table_reorg.sql`

`-rw-rw-r-- 1 oradc oradc  1298 Mar 30 14:17 revoke_table_reorg.sql`

`-rw-rw-r-- 1 oradc oradc  1000 Mar 30 14:17 grant_table_reorg.sql`

`-rw-rw-r-- 1 oradc oradc 26221 Mar 30 14:17 GRANT_HTTP_TO_DEMANTRA.sql`

[oradc@ndemdb01  admin]$ sqlplus / as sysdba

`SQL> @sys_grants.sql DEM ACL_DEFAULT ACL_DEFAULT false`

false
USER is "SYS"

`spool grant_dbms_crypto.log`

-------------------------

-- grant_dbms_crypto

…………………………………

-- update_passwords

-------------------------------

EXECUTE "DEM".UPDATE_PASSWORDS;

`spool off`

Disconnected from Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production
With the Partitioning, OLAP, Advanced Analytics and Real Application Testing options
[oradc@ndemdb01  admin]$

31.	Check the log file for any errors.

<img src=Picture18.png title="" alt="">

32.	Keep the log files generated during the installation for further review: D:\temp\reInstall

33.	Check the versions. 

<img src=Picture19.png title="" alt="">

34.	Check if you can log into Business Modeler. Start Business Modeler from modeler.bat 

<img src=Picture20.png title="" alt="">


35.	Fill in the user and password.

*Use dm / <dm password>*  (It is case sensitive) 


36.	See the Business Modeler Version from Help > About Business Modeler. 

<img src=Picture21.png title="" alt="">

37.	Check if Tomcat is starting up successfully. Double click on startup.bat

38.	Make sure you can log into demantra anyware.
http://localhost:8080/demantra/portal/anywhereLogin.jsp from demantra local server
http://nchwdat01.xxx.net:8080/demantra/portal/anywhereLogin.jsp from any machine on internal network  

<img src=Picture22.png title="" alt="">

39.	Review List of High Priority Patches see My Oracle Support Note 470574.1 and **apply the applicable latest patches**

40.	Take the backup of and Demantra file system on window machine and Demantra schema.

### Phase 3: Configure Oracle Demantra Web Server and Deploy Demantra Application (ear) on Linux

Detailed steps will be covered in the follow up blog, however high-level steps are 
1.	*Install Java JDK 8 64-bit on Linux server (Demenatra Web Server)*
2.	*Install Weblogic 12c (12.1.3.0.0 ) on Linux server (Demenatra Web Server)* 
3.	*Configure domain for Demantra Deployment*
4.	*Configure JDBC Data Source*  
5.	*Enable Archived Real Path*
6.	*Create Demantra WAR file on Window Machine*
7.	*Deploy Demantra ear* 
8.	*Activate Demantra application*


### Phase 4: Configure and Deploy Oracle Demantra Analytical Engine on Linux

Detailed steps will be covered in the follow up blog, however high-level steps include-

1.	*Install Java JDK 8 64-bit and Oracle Client on Linux Server (Demantra Analytical Engine)*
2.	*Copy the engine tar from windows server to Linux Server*
3.	*Create the Engine Data Source File*
4.	 *Configure Demantra Analytical Engine on Analytical Server with a New Oracle Wallet Repository*
5.	*Start the Analytical Engine Starter*


### Conclusion:

The process to install the Demantra application is a multi-step process which span on multi-instances and uses multi component. 
However, by following the above instructions you can easily implement all the steps involving different instances and components to significantly reduce implementation time and achieve best out of Demantra.
Demantra enables planners to sense demand real time, improve forecast accuracy, and shape demand for profitability. 

The result of Integration of these products is a 
-	Enhanced productivity of planners, as it enables them to see an aggregate analytical view with guided analysis. 
-	Informed and faster decisions, as it enables planners to share unified supply chain planning information across the enterprise.
-	Improves supply chain performance by analyzing all aspects of a supply chain and developing optimal plans across the virtual supply chain. 



<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>




Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).