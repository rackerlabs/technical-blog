---
layout: post
title: "Configuring TDE with AlwaysOn Availability Group"
date: 2021-11-09
comments: true
author: Rachamallu Jayaprakash Reddy
authorAvatar:'' 
bio: ""
published: true
authorisRacker: true
categories: 
- SQL Server
metaTitle: "Configuring TDE with AlwaysOn Availability Group"
metaDescription: "This blog demonstrates the detailed steps needed to set up Transparent Data Encryption with AlwaysOn Availability Group."
ogTitle: "Configuring TDE with AlwaysOn Availability Group"
ogDescription: "This blog demonstrates the detailed steps needed to set up Transparent Data Encryption with AlwaysOn Availability Group."
slug: "configuring-tde-with-always-on-availability-group" 

---

"This blog demonstrates the detailed steps needed to set up Transparent Data Encryption with AlwaysOn Availability Group."

<!--more-->

### Introduction

The SQL Server provides Transparent Data Encryption (TDE) for encrypting the physical files to protect customer sensitive data. It was introduced with SQL Server 2008 as an Enterprise Edition feature.

### TDE is available with the following SQL Server Editions:

•	SQL Server 2008, 2008 R2, 2012, 2014, 2016, 2017 (Evaluation, Developer, Enterprise)

      From SQL version 2019, TDE is available on most of the editions available. 

•	SQL Server 2019 - Standard, Evaluation, Developer, Enterprise

### Let’s explore on how to Configure TDE with AlwaysOn Availability Group in the following scenarios.
1.	Adding TDE encrypted database to AG group.
2.	Configuring TDE to the database which is already existing in the AG group.
3.	Rotating Expired Certificate

### Scenario: Adding TDE encrypted database to AG group.
We are using a two-node AG to set up the TDE and the following process explains the steps in detail. Follow the secondary steps on each of your secondary replicas (if you have more than 1 secondary)

•	Primary Replica: node1

•	Secondary Replica: node2

•	AG Group: TDE_AG

_Tip:_ It is always recommended to run DBCC CHECKDB to ensure that the database is error-free and taking the latest full backup of the database before implementing TDE.

### Step 1: Primary Instance - Create a Master Key

If you are encrypting the TDE for the first time, then there should be no master key and you can use the following SQL that will give no result set. 

<img src=Picture1.png title="" alt="">

Now create a master key in the master database using strong passwords.

<img src=Picture2.png title="" alt="">

Validate the master key:

<img src=Picture3.png title="" alt="">

Back up the Master Key to a secure location as a best practice. The password for the backup can be different from the Master Key password.

<img src=Picture4.png title="" alt="">

### Step 2: Primary Instance - Create a Certificate

Create a certificate to secure the database encryption keys. The default expiry date of the certificate is 1 Year.
_Tip_: It’s a best practice to set the expiry date for 5 years as it is not good to get this expires in one year.

<img src=Picture5.png title="" alt="">

Validate using the below TSQL to confirm that the certificate has been created.  

<img src=Picture6.png title="" alt="">

### Step 3: Primary Instance - Creation of Database Encryption Key (DEK)

Create the DEK which is a symmetric key to encrypt the actual database content and you can create using available AES algorithms.

<img src=Picture7.png title="" alt="">

### Step 4: Primary Instance - Backup the Certificate

Back up the certificate and the private key as a good practice. With this, you can restore the database backup files or attach the database data files to another SQL Server instance.

<img src=Picture8.png title="" alt="">

### Step 5: Secondary Instance - Create a Master Key

You should create a database master key on all secondary replicas if it does not exist, this is like step 1 in the primary instance. The master key was already created on both the instances in step 1. 

<img src=Picture9.png title="" alt="">

### Step 6: Secondary Instance - Create Secondary Certificate

Copy the certificate from the primary replica to all secondary replicas and create a certificate on the secondary replica using the primary replica certificate.

<img src=Picture10.png title="" alt="">

You need to specify the decryption password that was used earlier to encrypt the backup on the primary replica. 

### Step 7: Primary Instance - Enabling TDE Encryption

Query the following command as a final step to enable the TDE in the required database.

<img src=Picture11.png title="" alt="">

Now, let's monitor the progress of the encryption process and make sure the state is 3 which describes the encryption is completed. 

<img src=Picture12.png title="" alt="">

The following query lists the databases with TDE enabled on the databases.

<img src=Picture13.png title="" alt="">

The above result shows that the TDE is enabled on the TDE_DB database, and the encryption state 3 means that the database is completely Encrypted. By default, the tempdb will be encrypted automatically when we encrypt using TDE on any user database. 

### Step 8: Adding Database to the Availability Group
Let’s add the encrypted database to the AG group.

_Note_: Adding TDE encrypted database to an Availability Group does not support GUI options in SSMS.

<img src=Picture14.png title="" alt="">

You need to use TSQL to add the database to the AG group. On the Primary Replica, take a full backup, transaction log backup for the database TDE_Test database, and copy it. You need to then restore it with `NORECOVERY` on secondary.

<img src=Picture15.png title="" alt="">

Once the backup and restore is complete, run the following commands to add the database to the Availability Group.

<img src=Picture16.png title="" alt="">

### Step 9: AG health Validation 
Now validate the AG health check status through the dashboard and a manual failover test to perform to make sure that our database, with TDE enabled on it is working fine.

<img src=Picture17.png title="" alt="">

### Scenario: Configure TDE to the database which is already existing in the AG group.

Follow the steps (which I had had discussed in our first scenario) to enable TDE when the database is already added to the AG group. 

Step 1: Primary Instance - Create a Master Key

Step 2: Primary Instance - Create a Certificate

Step 3: Primary Instance - Creation of Database Encryption Key (DEK)

Step 4: Primary Instance - Backup the Certificate

Step 5: Secondary Instance - Create a Master Key

Step 6: Secondary Instance - Create Secondary Certificate

Step 7: Primary Instance - Enabling TDE Encryption

Step 9: AG health Validation

As I had already created the master key and certificate on both replicas in our previous scenarios, we can skip steps 1,2,4,5,6,7. You just need to create DEK and enable the TDE from steps 3 and 7.

•	Primary replica: node1

•	Secondary replica: node2

•	AG Group:TDE_AG

•	AG database : Test_tde

•	TDE Certificate : TDE_AG2021

### Step 3 and 7 – On Primary Instance

<img src=Picture18.png title="" alt="">

Monitor the progress of the encryption process and make sure the state is 3 which describes the encryption is completed. 

<img src=Picture19.png title="" alt="">

Check TDE enabled database with the following query. 

<img src=Picture20.png title="" alt="">

Validate the AG health check and do a failover test to make sure everything is working fine. 

<img src=Picture21.png title="" alt="">

### Scenario: Rotating Expired Certificate

When you notice that the TDE certificate is expiring soon, you need to rotate the certificate as a best practice even though the expired certificate will not cause any issues on Database regular operations. 

You can check the expiring date for our TDE certificates and follow the steps described to rotate the SQL TDE certificates

<img src=Picture22.png title="" alt="">

_Step 1: Primary Instance - Create a New Certificate_

<img src=Picture23.png title="" alt="">

_Step 2: Primary Instance - Backup the Certificate_

<img src=Picture24.png title="" alt="">

_Step 3: Secondary Instance - Create Secondary Certificate_

<img src=Picture25.png title="" alt="">

_Step 4: Primary Instance - Rotate the SQL TDE certificate_

<img src=Picture26.png title="" alt="">

Validate the Expiry date for the Test_tde database:

<img src=Picture27.png title="" alt="">

_Step 5: AG health Validation:_

<img src=Picture28.png title="" alt="">

Save the expired TDE certificates for a while to restore any older backup. The new certificate will only be used when you are restoring the databases which were backed up since the key rotation.

### Conclusion
The SQL Server provides Transparent Data Encryption (TDE) for encrypting the physical files to protect customer’s confidential information. In this blog, I have described various scenarios to configure TDE for the AlwaysOn availability group databases. 
