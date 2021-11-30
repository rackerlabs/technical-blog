---
layout: post
title: "MSSQL SERVER – MIGRATE DATABASE WITH CLE (Cell Level Encryption)"
date: 2021-11-30
comments: true
author: Varun Jha
authorAvatar: 'https://secure.gravatar.com/avatar/210083a2b4a260c742fdb84dde196630'
bio: ""
published: true
authorIsRacker: true
categories:
    - SQL Server
    - Database
metaTitle: "MSSQL SERVER – MIGRATE DATABASE WITH CLE (Cell Level Encryption)"
metaDescription: "While managing SQL Server database, restoring is one among the first task which a DBA needs to do. However, this becomes challenging once data encryption is involved."
ogTitle: "MSSQL SERVER – MIGRATE DATABASE WITH CLE (Cell Level Encryption)"
ogDescription: "While managing SQL Server database, restoring is one among the first task which a DBA needs to do. However, this becomes challenging once data encryption is involved."
slug: "mssql-server-migrate-database-with-cell-level-encryption"

---
 In this blog, I have discussed the necessary steps for restoring database and retrieving encrypted data when CLE (Cell Level Encryption) is implemented . 

<!--more-->

Data security is one of the critical aspect in database management. When we are encrypting sensitive data, there are many ways to achieve this in MS SQL Server like CLE, TDE, and Always Encrypted. When you are encrypting data within the cell using certificate or keys, this is known as CLE (Cell Level Encryption).

### Problem: 

1.	ERROR: - One of the issues you may see is application or some of the TSQL code which is decrypting the data starts giving the following error. 

<img src=Picture1.png title="" alt="">

2.	DecryptByKey function is not able to decrypt the data. This will not give you any error however functionality will be impacted due to missing encryption keys. 

<img src=Picture2.png title="" alt="">

### Solutions

As we did not open the database master key hence decryption of data is not possible, also DMK is not encrypted by current instance service master key hence you see such issue, we have many solutions to resolve this, so let’s talk about them one by one. 

#### Case 1 - When database master key encryption password is known.

Step 1: - Open database master key using password and decrypt the data.

<img src=Picture3.png title="" alt="">

Step 2: - One of the questions that come to mind is the  possibility of  opening the key with password in every session or you can hardcode this? Answers is no, in such cases, you will re-encrypt the database master key with current instance service master key and run the following commands as shown in the snapshot.

<img src=Picture4.png title="" alt="">

Step 3: - Check if you can decrypt the data without opening the key with password and answer is yes because key is now also encrypted by current service master key.

<img src=Picture5.png title="" alt="">

Step 4: - if you want to change database master key encryption password the you need to complete the following step

<img src=Picture6.png title="" alt="">

#### Case 2: When database master key encryption password is unknown.

In case if you are not aware about the password and source is accessible. Just use step4 from case1 to change the password and follow the procedure in step 1. Else use the following steps as an alternate.     
This is only possible when instance where database is getting restored is not using any other key as steps involved here is restoring the instance service master key.

#### Example: - How to take backup of instance service master key.  

-- Take the backup of service master key 
`BACKUP SERVICE MASTER KEY TO FILE = 'C:\Shared\service_master_key.key'`
`ENCRYPTION BY PASSWORD = 'key_P@ssw0rdGqw0956565’`

Note: - Key backup files are very sensitive from security perspective hence add an SQL service account in security tab to ensure SQL server have access to file, else you may get the following error during the restoring process.

`Msg 15317, Level 16, State 2, Line 53`
`The master key file does not exist or has invalid format`

Step 1: - Restore service master key before restoring database.

<img src=Picture7.png title="" alt="">

Step 2: - Restore database.

<img src=Picture8.png title="" alt="">

Step 3: - Check if you can decrypt the data without opening the key with password and answer is yes because key is using the same service master key as we restore both instance service key and database encrypted by it.

<img src=Picture9.png title="" alt="">


### Conclusion

Each objects in MS SQL Server which is used for encryption are secure by Instance level Service 	master keys. For managing encryption it is important to understand that objects involved in 	encryption are further encrypted by passwords, Keys or certificates.  
 Every time we are migrating database with cell level data encryption, we need to either decrypt the key and re-encrypt them with destination instance service master key or restore source instance master key.



<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
