---
layout: post
title: "Upgradation of Vertex 9 for EBS R12.2 Part 2"
date: 2021-12-08
comments: true
author: N.S. Ganesh Chikkala
authorAvatar: 'https://secure.gravatar.com/avatar/834ffcd8c692ca9fd16ac51740f97020'
bio: "I am an Oracle Application DBA and an Oracle DBA, primarily concentrating on Oracle E-Business Suite (EBS) and its native technology stacks , such as Oracle Database, Application Server, and Fusion Middleware components. I’ve completed Oracle OCA, OCP, and cloud certifications."
published: true
authorIsRacker: true
categories:
    - Oracle
    - General
metaTitle: "Upgradation of Vertex 9 for EBS R12.2 Part 2"
metaDescription: "Instance used for vertex9 installation is DTRXI R12 instance. Following is the server details used for vertex."
ogTitle: "Upgradation of Vertex 9 for EBS R12.2 Part 2"
ogDescription: "Instance used for vertex9 installation is DTRXI R12 instance. Following is the server details used for vertex. "
slug: "upgradation-of-vertex-9-for-ebs-r12.2-part 2"

---

These steps are in continuation from Part 1:

<!--more-->

_Database Node_:	nchltrxddb01.tcs.terex.com

_Vertex9 Application Nodes_	nchltrxdvrtx01.tcs.terex.com

### 8. Run the Upgrade from Vertex servers:

#### 1)	Shut down the vertex 9 services.
`Cd /u01/app/appdv/vertex9/oseries/tomcat/bin`
`./shutdown.sh`

#### 2) Copy the upgrade patch vertex-oseries-upgrade-90-9.0.1.4.3.zip to upgrade directory.

`cd /u01/app/appdv/vertex9/oseries`
`mkdir upgrade`
`cd upgrade`
`cp /patch/stage/shared/vertex_9/vertex-oseries-upgrade-90-9.0.1.4.3.zip `
`unzip vertex-oseries-upgrade-90-9.0.1.4.3.zip`

#### 3) Run the upgrade utility
which java
`/u01/app/appdv/jdk1.8.0_144/bin/java`
`java -version`
`java version "1.8.0_144"`
`cd /u01/app/appdv/vertex9/oseries/upgrade`

##### Step 1: Run the upgrade
`java -Xmx6144m -cp ./vertex-oseries-upgrade-90-9.0.1.4.3.jar:”../lib’*”com`
`vertexinc.upgrade90.app.UpgradeApp`
	
##### Step 2: provide o-series both old version and new version locations.

##### Step 3:
`jdbc:oracle:thin:@//nchltrxddb01.tcs.terex.com: 1561/TTRXI`
`Vertex8/xxxxx`
`oracle.jdbc.driver.OracleDriver`

##### Step 4 : Select all -- PRD-TAM,USAPRT,USAGENIEPRT,admin

##### Step 5 : Do not check box in the below screen 

##### Step 6: You will get the updgrade comformation.

##### Step 7: You will get the end of report. 

### STEP 9: Verify the data update

##### 1)	Start vertex services.

`Cd /u01/app/appdv/vertex9/oseries/tomcat/bin`
`./startup.sh`

##### 2)	Login to the vertex URL.
http://nchltrxdvrtx01.tcs.terex.com:9095/oseries-ui/
	admin/xxxxx
	You will see below screen in update history.

<img src=Picture1.png title="" alt="">

### STEP 10: Update the files and run the upgrade in EBS application server.

#### 10.a. Creating the staging on EBS for Vertex

##### 1)	Source the EBS environment file
##### 2)	Create vertex directory

`Cd $XBOL_TOP/install`
`mkdir vertex`
`cd vertex`
`cd $XBOL_TOP/install/vertex`

##### 3) Copy all the zip files residing under software location on vertex server ( Software can be downloaded from vertex support site)

`cd $XBOL_TOP/install/vertex`
`cp /patch/stage/shared/vertex_9/*.gz .`
`ls -lrt`
`ntl-ap_12.9.0.1_2992.tar.gz ntl-o2c_12.9.0_2992.tar.gz ntl-po_12.9.0_2970.tar.gz` 
`ohook_12.9.0.1_2997.tar.gz`

Unzip all the above *.gz files

##### 4)	Check the XXTREX_VERTEX default tablespace.
`alter user XXTREX_VERTEX default tablespace XXTREX_VRTX;`
`alter user XXTREX_VERTEX quota unlimited on XXTREX_VRTX;`

#### 10.b Run the Upgrade script from ohook 

Ensure that data update is complete before proceeding
_1) Go to below location and run upgrade.sql_

`Cd $XBOL_TOP/install/vertex/ohook/upgrade`
`sqlplus /nolog`
`@upgrade.sql`
_Enter the prior OIC schema_

_Enter the custom table schema_

_Enter the custom package schema_

_Enter the Vertex base schema_

_Enter the Vertex journal schema_

_Enter the Vertex reporting schema_

#### 10.c Update the NTL View in EBS DB and execute it

`Cd $XBOL_TOP/install/vertex/ohook/code/views`

Update the ntlvo_request_configuration_v.sql with below value.

`'DTRXI'` THEN 'http://nchltrxdvrtx01.tcs.terex.com:9095/vertex-ws/services/'

Connect with apps and run below:
`SQL> @ntlvo_request_configuration_v.sql`

View created.

`SQL> select * from ntlvo_request_configuration_v;`

CONT SERVICE_URL                                                  USER_ PASSWORD
---- ------------------------------------------------------------ ----- --------
T P WALL WALLET_P HTTP_TIMEOUT D DEBUG_DAYS DATE_FORMAT LAST_REQUEST_ID
- - ---- -------- ------------ - ---------- ----------- ---------------
Main http://nchltrxdvrtx01.tcs.terex.com:9095/vertex-ws/services/ admin password
/tmp password          600 N          3 DD-MON-YYYY              -1

#### 10.d Update ACL for Vertex from EBS DB

`cd $XBOL_TOP/install/vertex/ohook/code/scripts`

Run below as system user.

`SQL> @ntl_setup_acl.sql APPS`

- Check the ACL setup.

- Run below as apps user
`SQL> select utl_http.request(service_url||'EchoDoc?wsdl')` from `ntlvo_request_configuration_v;`

#### 10.e Run the Upgrade script from po 

`Cd $XBOL_TOP/install/vertex/po/upgrade`

`sqlplus /nolog`

`SQL> @upgrade12.sql`

`SQL> @upgrade12.sql`

Enter the custom table owner

Enter the apps user (apps)

#### 10.f Copy lct file from fnd top:

`cd $XBOL_TOP/install/vertex/po/code/loaders`

_Back up the existing lct files._

Copy the files from FND_TOP
 `cp $FND_TOP/patch/115/import/aflvmlu.lct . $XBOL_TOP/install/vertex/po/code/loaders `

` cp $FND_TOP/patch/115/import/affrmcus.lct . $XBOL_TOP/install/vertex/po/code/loaders`

` cp $FND_TOP/patch/115/import/afcpreqg.lct . $XBOL_TOP/install/vertex/po/code/loaders`

` cp $FND_TOP/patch/115/import/afcpprog.lct . $XBOL_TOP/install/vertex/po/code/loaders`

#### 10.g Run the fixloader for po:

`Cd  $XBOL_TOP/install/vertex/po/fndload`

`perl fixloaders.pl ANONYMOUS XBOL`

#### 10.h Run the fndload for po: 

`sh fnd_upload.sh trxappsdtrxi12 12.7`

- Verify the fndload logs.

#### 10.I Copy reports from po to Custom top(XBOL_TOP)

- Backup existing files and copy files from po directory and copy files from po directory

`Cp $XBOL_TOP/install/vertex/po/code/reports/*.rdf  . $XBOL_TOP/reports/US`

#### 10.J Run the Upgrade script from o2c 

`cd $XBOL_TOP/install/vertex/o2c/upgrade`
`sqlplus /nolog`
`SQL> @upgrade12.sql`

Enter the custom table owner

Enter the apps user (apps)

#### 10.k Copy rdf files from o2c to Custom top(XBOL_TOP)

- Backup the existing files here and copy files from o2c

`cp $XBOL_TOP/install/vertex/o2c/code/reports/* . $XBOL_TOP/reports/US`

#### 10.l Run Upgrade of ap

`cd $XBOL_TOP/install/vertex/ap`

`sqlplus /nolog`

`SQL> @upgrade127.sql`

- Enter the custom table schema
- Enter the apps user (apps)

#### 10.m Copy lct files from fnd top for ap

_copy existing rdf files and copy rdf files form ap top_

`cp $XBOL_TOP/vertex/ap/code/reports/*.rdf . $XBOL_TOP/reports/US`


#### 10.n Run fndload for ap:

`cp $XBOL_TOP/install/vertex/ap/code/forms/* .  $XBOL_TOP/forms/US`

- Compile forms using frmcmp_batch 

### Conclusion
In this blog , we have upgraded the installed vertex9 version and same is integrated with Oracle Applications release R12.2. 



<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/oracle">Learn about Rackspace Managed Oracle Applications.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/application-modernization"> Learn about Rackspace Aplication Modernization Services.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).