---
layout: post
title: "ORDS Relation with SQL Developer"
date: 2022-06-23
comments: true
author: Himanshu Bansal
authorAvatar: 'https://secure.gravatar.com/avatar/3655e3e37c8bd6ce52a39e531cd6fbba'
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
    - SQL


metaTitle: "ORDS Relation with SQL Developer"
metaDescription: "Oracle REST Data Services are based on Java Enterprise Edition and provide security, RESTful Web Services, and flexibility through support for deployment in different type of configurations like standalone mode, Apache Tomcat and Oracle WebLogic Server."
ogTitle: "ORDS Relation with SQL Developer"
ogDescription: "Oracle REST Data Services are based on Java Enterprise Edition and provide security, RESTful Web Services, and flexibility through support for deployment in different type of configurations like standalone mode, Apache Tomcat and Oracle WebLogic Server."
slug: "ords-relation-with-sql-developer"

---
### DEFINITION
Oracle REST Data Services are based on Java Enterprise Edition and provide security, RESTful Web Services, and flexibility through support for deployment in different type of configurations like standalone mode, Apache Tomcat and Oracle WebLogic Server.

<!--more-->

### MECHANISM
ORDS provides JAVA application platform to develop REST APIs for the Oracle Database, NoSQL Databases and JSON Document store. 
One of the biggest advantages of the ORDS is that it eliminates the need for installing client drivers. The other advantage being that developers need not to maintain the drivers, thus the accessibility of these APIs is akin to external services that are extended globally via API technology.
The following snapshot depicts how this technology bridges HTTPS and the Oracle Database.

<img src=Picture1.png title="" alt="" >

[Image Source](https://www.oracle.com/database/technologies/appdev/rest.html)


### ARCHITECTURE

Coming to the functionality of the architecture, between the Oracle Application Express engine and a web browser, 
Web server is the basic requirement for proxy requests, and ORDS is the solution to this need.
Added feature by ORDS is an embedded JDBC driver, which is used for providing connectivity,
and thus, nullifies the need of Oracle Home requirement in the deployment process.

<img src=Picture2.png title="" alt="">

[Image Source](https://docs.oracle.com/en/solutions/deploy-ords-ha-oci/index.html#GUID-A6EBA585-B388-46E1-84E4-AE99BCA5CFB4)

### DEPLOYMENT OPTIONS INCLUDE


1.	Standalone Mode.
2.	Oracle WebLogic Server.
3.	Apache Tomcat.

### YOU CAN DOWNLOAD ORACLE ORDS [HERE](http://www.oracle.com/technetwork/developer-tools/rest-data-services/downloads/index.html)

<img src=Picture3.png title="" alt="">

### ORDS OFFERS THE FOLLOWING FEATURES:

1.   PL/SQL Gateway
2.  Database management REST API
3.  Web Services (HTTPS)
4.  SQL Developer Web


### GENERAL INFO FOR INSTALLATION

*A command line interface (CLI) is the primary tool for installation and configuration before final deployment of ORDS.*
*ORDS gets started in standalone mode via database configured from stored configuration files.*
*The list of commands available for deployment can be identified by, validating the directory/folder which has 'ords.war' file.*
*The following command needs to be executed to do the same.*

`Copyjava -jar ords.war help configdir						`

### INSTALL ORACLE REST DATA SERVICES w/SQL DEVELOPER

Some of the tasks that SQL developers do make the following tasks convenient for the users. 
1.  Installing ORDS
2.  Running ORDS
3.  REST enable TABLES
4.  Develop RESTful Services

Now, to understand more logically and in a brief manner, the following screenshots have two components for ORDS installation:
1. Windows 7 Machine 
2. Virtual-Box Oracle Linux appliance having Database 12c running on it.

Windows 7 Machine from the above two is needed in accomplishing the Installation part, and it is designed/configured in a manner that the Virtual-Box database handles the REST requests over it.

The following snapshot is taken from the SQL Developer ‘Version 4.1’.

<img src=Picture4.png title="" alt="">

Now, there are two options for deployment of ORDS to database.
1.	ORDS to a particular PDB serves ONLY that PDB. 
2.	For serving multiple PDBs, install on CDB.

*The following screenshot will show, which version of ORDS you are about to deploy.*

<img src=Picture5.png title="" alt="">


### THE DATABASE USERS USED BY ORACLE REST DATA SERVICES ARE AS FOLLOWS:

**APEX_PUBLIC_USER** - This is the Least privileged account, and it is used for Oracle Application Express configuration and mod_plsql. These accounts are created once all the steps required to configure RESTful Web services are completed.

**APEX_REST_PUBLIC_USER** – This Revokes RESTful services which are stored under Oracle Application Express.

**APEX_LISTENER** – This Queries different aspects of RESTful services which are stored under Oracle Application Express.

<img src=Picture6.png title="" alt="">

**Note:-**	Oracle REST Data Services (ORDS) provides many options for authenticating users, which can be classified as: 

 	- OAuth client
 	- APEX User
 	- Database Schema User
 	- OS User

- **Authentication confirms your identity and allows you into the system, whereas Authorization decides what you can do once you gain access.**

- **There is a big difference in both terms and their respective conditions.**

-	**To create users, you will need a high privileged account (SYS).**


<img src=Picture7.png title="" alt="">

- *Going forward, Installer sets up default tablespaces for the new users and prompts the APEX_PUBLIC_USER to test its connectivity to the database.*

-	*The mode of installation chosen here is the standalone mode.*

-	*Advanced Mode is for production and Standalone Mode is for Development and Testing (these are recommendations from MOS).*

<img src=Picture8.png title="" alt="">

-	In the final stages of the wizard, few users are created with admin access to log into ORDS.

-	Embedded Jetty user accounts are the name given to these schemas.

-	Two types of roles are assigned to these users.  

 1. 	SQL developer
 2. 	Administrative 

- *Admin role is the one which gives the user right to login via HTTP and then authenticate to deploy a REST Service.*

- *Admin role is also needed to make any modifications/changes to your ORDS configuration as well.*

<img src=Picture9.png title="" alt="">


- The **‘FINISH' button** page is termed as the last window on GUI which is to confirm all the parameters entered during the installation, before moving ahead.

After clicking on this button, SQL Developer completes the database part installation and later initiates ORDS.

<img src=Picture10.png title="" alt="">


- **ORDS URL** is composed of the following parameters:
     `https://example.com/<warfile>/<schemaname>/<module>/<service>`

- If you want to remove ords from the above-mentioned URL., then this can be achieved by two following ways.

 - 	By renaming ORDS.war, to something Like, API.war, or
 - Modifying the Web Server to have a routing rule.


**NOTE:-**	If schema needs to be ORDS enabled, it needs to be verified as to how it will appear in the web service URL.

<img src=Picture11.png title="" alt="">


	Also, if newer versions for the APIs are introduced and thus some changes are required in ORDS URL with the same, then it is better to use the ORDS module as the version number e.g., modules v1, v2 etc. 
This ensures that the details regarding the old one can be used around for a while until the new one goes-live. To make it clearer you can consider the following example.
 http://example.com:8080/api/erp/v1/customer/1234

Algorithm of the ORDS URL and how it is processed.
-	*Request is sent to ORDS.*
-	*It is forwarded to the database.*
-	*Schema is determined which matches the request content.*
-	*Proxy is connected as that USER*
-	*RESTful Services gets mapped to the related template.*
-	*Authorization is performed to validate the proper role/privilege.*
-	*SQL or PL/SQL code is searched and verified, behind the Service Module Handler*
-	*Code gets executed.*
-	*Results are derived and then they are transformed to JSON format.*
-	*Connection is transferred back to the connection pool (Basically, User connection as PROXY is no longer valid and is dropped).*

### CONCLUSION

The question arises that when should one use ORDS"? 

Well, usually "it depends" and in this case it really does. The best way it can be described, is its ability to Expose data RESTfully.
Mobile applications for EBS users simplify connectivity to other middleware, expediting Master Data Management (MDM), which in turn builds a bridge between Business and IT.

It is a fast and light weight method of allowing you to capture data.
ORDS is a prime example of having a data capturing machine for very little cost along with its peers such as AWS EC2 instance and Oracle NoSQL database.
Large numbers of small to medium sized business need the Oracle database, APEX and ORDS which all combined provide the right sized solution to be able to consolidate data from Salesforce and e-Business Suite to put together some consolidated reporting.

Even if these organizations grow in the future, they will already have REST services which are much easier to plug into middleware solutions such as Fusion Middleware and Mule.




<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/oracle">Learn about Rackspace Managed Oracle Applications.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).