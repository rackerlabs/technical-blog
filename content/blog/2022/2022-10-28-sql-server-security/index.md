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

Security has always been a pressing concern even for the most seasoned DBA. Regardless of versions and editions,  SQL databases are majorly  under constant threat as they hold sensitive data, and that is what the malicious hackers want access to.

<!--more-->

#### Components
There are mainly 3 levels which require security 

- Server 
-	Database 
-	Object 

**Server Level**: Server is the topmost level in connecting to the SQL Instances / databases.


**Database Level**: Once connected to the Server, the user needs to access the database.


**Object Level**: Once connected to the database, the user needs to access objects like tables, stored procedures, functions etc.

#### For providing security we have 3 processes:
1.	Verification
2.	Clearance
3.	Encode


- **Verification / Authentication**: Validates the identity / credentials on the server of a user.
- **Clearance / Authorization**: Makes sure the identified user has enough permissions to perform their operation.
- **Encode / Encryption**: Encrypts the data which can be accessed only by the specific key / certificate.


#### SQL Servers allows 2 Types of Logins
1.	Windows Login 
2.	SQL Server Login
- **Windows Login**: It is a domain user / AD user / local ddmin / Windows admin
- **SQL Login**: This will be created inside the SQL Server with a user ID and a password.

#### SQL Server Authentication and Authorization:

Verification and clearance are achieved in SQL Server through a combination of different security policies.

SQL Server supports 2 Types of authentication
1.	Windows level authentication
2.	SQL Server level authentication

Every user who wants to connect to a server / database must exist with a username / login name and a strong password.

#### Windows Authentication:
	Windows authentication is integrated with an Active Directory where the username / login name must exist under the same. When a Windows user tries to access the SQL Instance, the SQL Server Database Engine validates the credentials of the user against the Windows Principal Token. Once a user is validated against the Windows Principal Token, they will not be needed to provide separate SQL credentials until and unless the user is from an untrusted domain.

#### SQL Server Authentication:
	Logins which are created inside the SQL Server are required to be validated at the SQL Server level whereas Windows users aren’t required to do the same, as they will be validated at the Windows level. Users those who connect from an untrusted domain might be required to provide an SQL Login to access the data. In some cases, the servers hosts are not part of the domain which requires an SQL Login to be accessed. The SQL Login doesn’t link with Active Directory as it owns a different mechanism to authenticate the user.

During the installation, in SQL Server, we must choose the authentication of both as shown in the image below. If the same is not chosen during the installation, it can also be changed post installation in the Server properties.

<img src=Picture1.png title="" alt="">

        During the installation

<img src=Picture2.png title="" alt="">

        Post Installation

Below is the image that shows us the features / options available in MS SQL Server in terms of security. The same can be viewed from the SQL Server Management Studio (SSMS).

  <img src=Picturex.png title="" alt="">

#### Authorization: 

	Once the user is authenticated, they must have enough permissions / authorizations to perform any activity. All the users must be restricted with respect to their roles, like Developer / Tester / DBA.  So SQL Server has set of defined roles at the server level as well as database level.

	If a user is granted with a set of roles at the database level only, the user will not have access to perform anything on the server. For example, if the user wants to change any server configuration, it is not allowed. 
	
  If a user is granted a set of specific server roles, the user may not be having any access to perform everything at the database level. Few server level permissions are a must to perform some activities at the database level (i.e., bulk insert). 


The roles which are defined at the server level are called Server Roles and at the database level are named Database Roles.

<img src=Picturey.png title="" alt="">


#### Object Level:

We usually suggest this when a user is not required / should not have access to all the objects in the database. This can be achieved by granting the public role as default and granting the object level read / write permissions using T-SQL or using Securables Option from the database user properties. This can be observed from the image below.

<img src=Picture5.png title="" alt="">

#### Conclusion

This article concludes the basics of SQL Server Security. I hope the information provided will help the ones in need. Majorly, it’s to guide on how to protect the data and on how to manage the SQL Server users who access or who need access on the database. This will also help in protecting the data in an SQL Server Database Environment. It is always good to have the lower permissions to the regular database users who access the database.






































<a class="cta purple" id="cta" href="https://www.rackspace.com/cloud/azure">Learn about Rackspace Managed Azure Cloud Services.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
