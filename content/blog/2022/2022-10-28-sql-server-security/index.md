---
layout: post
title: "SQL Server Security"
date: 2022-10-28
comments: true
author: Sandesh Kumar Jonnala
authorAvatar: 'https://secure.gravatar.com/avatar/cc79ecfa755daad6484a2763ca44890b'
bio: ""
published: true
authorIsRacker: true
categories:
    - SQL Server
    - Security
metaTitle: "SQL Server Security"
metaDescription: "Security has always been a pressing concern even for the most seasoned DBA. Regardless of versions and Editions, Majorly the SQL databases are constantly under threat as they hold sensitive data and that is where the malicious hackers want access to."
ogTitle: "SQL Server Security"
ogDescription: "Security has always been a pressing concern even for the most seasoned DBA. Regardless of versions and Editions, Majorly the SQL databases are constantly under threat as they hold sensitive data and that is where the malicious hackers want access to."
slug: "sql-server-security"

---
#### Introduction 

Security has always been a pressing concern even for the most seasoned DBA. Regardless of versions and Editions, Majorly the SQL databases are constantly under threat as they hold sensitive data and that is where the malicious hackers want access to.

<!--more-->

#### Components
There are mainly 3 levels which requires security 

- Server 
-	Database 
-	Object 

**Server Level**: Server is the topmost level in connecting to the SQL Instances / Databases.


**Database Level**: Once connected to the Server, User need to access the Database.


**Object Level**: Once connected to the database User need to access objects like tables stored procedures functions etc.

For providing security we have 3 processes:
1.	Verification
2.	Clearance
3.	Encode


- **Verification / Authentication**: Validates the identity / Credentials on the server of a user.
- **Clearance / Authorization**: Makes sure the identified user is having enough permissions to perform their operation.
- **Encode / Encryption**: Encrypts the Data which can be accessed only by the specific Key / Certificate.


#### SQL Servers allows 2 Types of Logins
1.	Windows Login 
2.	SQL Server Login
- **Windows Login**: its nothing but a Domain User / AD User / Local Admin / Windows Admin
- **SQL Login**: This will be created inside the SQL Server with a User ID and a Password.

#### SQL Server Authentication and Authorization:

Verification and Clearance are achieved in SQL Server through a combination of different security policies.

SQL Server will Support 2 Types of Authentication
1.	Windows level Authentication
2.	SQL Server level Authentication

Every User who wants to connect to a Server / Database they must exist with a Username / Login Name and a strong Password.

#### Windows Authentication:
	Windows authentication is Integrated with an Active Directory where the Username / Login Name must exist under the same. When a Windows User tries to access the SQL Instance, the SQL Server Database Engine validates the Credentials of the user against the windows Principal token. Once a User is validated against the Windows Principal Token will not be needed a separate SQL Credentials until and unless the user is from an Untrusted Domain.

#### SQL Server Authentication:
	Logins which are created inside the SQL Server are required to be validated at the SQL Server level whereas windows users aren’t required the same as they will be validated at windows level. Users those who connect from an Untrusted Domain might required a SQL Login to access the Data. In Some cases, the Servers where hosted are not part of the Domain where requires SQL Login to access. The SQL Login doesn’t link with Active Directory as it owns a different mechanism to authenticate the User.

During the Installation, in SQL Server we must choose the authentication of both as shown in below Image. If the same is not chosen during the installation can also be changed post installation on the Server properties.

<img src=Picture1.png title="" alt="">

        During the installation

<img src=Picture2.png title="" alt="">

        Post Installation

Below is the Image that shows us the features / Options available in MS SQL Server in Terms of Security. The same can be viewed from SQL Server Management Studio (SSMS).

  <img src=Picturex.png title="" alt="">

#### Authorization: 

	Once user is authenticated, they must have enough permissions / authorizations to perform any activity. All the users must be restricted the with respect to their roles like Developer / Tester / DBA.  So SQL Server has set of defined roles at the Server Level as well as Database Level.

	If a user is granted with set of Roles at the Database level Only, the user will not have access to perform anything on the Server. Like if the user wants to change any server Configuration which is not allowed. 
	
  If a User is granted with set of specific Server roles the user may not be having any access to perform everything any the Database Level. Few Server Level permissions are must to perform some activities at the Database level (i.e., Bulk Insert). 


The Roles which are defined at Server Level are called as Server Roles and Database Level are named as Database Roles.

<img src=Picturey.png title="" alt="">


#### Object Level:

We usually suggest this when a user is not required / should not have access to all the Objects in the Database. This can be achieved by granting the public role as default and granting the Object level Read / write permissions using T-SQL or using Securables Option from the Database User Properties. Can be observed same from the image below.

<img src=Picture5.png title="" alt="">

#### Conclusion

This article concludes about the basics of SQL Server Security. I hope the information provided will help a needy, majorly it’s to guide on how to protect the Data and on how to manage the SQL Server Users that who access or who need the access on the Database. This will also help in protecting the Data in SQL Server Database Environment. It is always good to have the lower Permissions to the regular Database Users who access the Database.






































<a class="cta purple" id="cta" href="https://www.rackspace.com/cloud/azure">Learn about Rackspace Managed Azure Cloud Services.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).