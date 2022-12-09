---
layout: post
title: "Backup SQL database to blob container and restore it to another Server"
date: 2022-12-08
comments: true
author: Anil Kumar
authorAvatar: 'https://secure.gravatar.com/avatar/3f1352f21438061d35ff20470433f3da'
bio: ""
published: true
authorIsRacker: true
categories:
    - Databases
    - SQL Server
metaTitle: "Backup SQL database to blob container and restore it to another Server"
metaDescription: "This blog demonstrates the detailed steps needed to create an SQL Database backup in a blob container. To begin, with you need to list down the available backups, and restore them from a blob container to a Prem SQL Database."
ogTitle: "Backup SQL database to blob container and restore it to another Server"
ogDescription: "This blog demonstrates the detailed steps needed to create an SQL Database backup in a blob container. To begin, with you need to list down the available backups, and restore them from a blob container to a Prem SQL Database."
slug: "backup-sql-database-to-blob-container-and-restore-it-to-another-server"

---

This blog demonstrates the detailed steps needed to create an SQL Database backup in a blob container. To begin, with you need to list down the available backups, and restore them from a blob container to a Prem SQL Database.


<!--more-->

#### Introduction

Unlike SQL database backup to local drives. The backup to the Azure blob container requires an Azure storage account to be created. The blob container is created under the storage account. Post that you need to create the SQL credential using an Azure account secret key. Once the above steps are complete, you can take a backup to the blob container and restore it back from the blob container. 

Refer to the following list


Backup SQL DB to Blob container:
1.	Create an Azure Storage account
2.	Create a Blob container where backup files need to be placed.
3.	Get the secret key for the Azure Storage account 
4.	Create credentials in SQL server with Azure Storage account identity and Secret Key.
5.	Backup DB on the Source server using the SQL credential for the blob container. 


Restore SQL DB from Blob container:
1.	Create credentials in the SQL server with the same Azure Storage account identity and Secret Key.
2.	Restore DB from the container on the Destination Server


**Steps to Create SQL database Backup on prem SQL Server:**

1.	Create an Azure Storage account:

Here storage account name should be in lowercase. Geo redundancy is not required, and you can uncheck it. Select the storage type as standard vs premium based on your requirement. Review and create an account. 

<img src=Picture1.png title="" alt="">

2.	Create a Blob container: 

Once the storage account gets created, you need to a create blob container with Private access from the Data storage section. By default, a blob container is created with public access.

<img src=Picture2.png title="" alt="">

*Note down the Blob container URL*

Once the blob container gets created go to its properties and copy the blob URL.

<img src=Picture3.png title="" alt="">

3.	Get the secret key for the Azure Storage account 

*Copy the Secret key used for the storage account*

Now go to the security + networking section under storage account open Access keys and click on show Keys. You will see the storage account name 2 keys Key1 and Key2 are associated with the storage account. Copy the key from here and note it down as it will be needed for SQL credential creation. 

<img src=Picture4.png title="" alt="">

4.	Create SQL Credential using storage account secret

Open query analyzer from SSMS. Give the credential name, Storage account name and paste the secret key that you copied earlier from the storage account access keys. Now execute the following statement to create a credential for the blob container. 

```
CREATE CREDENTIAL [DBBackupCred] 
WITH IDENTITY = 'sqlrestore123'  -- Storage Account Name
,SECRET = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX==' -- Access key
GO
```

<img src=Picture5.png title="" alt="">

If Blob URL does not exists or URL is not correct you will get below error while taking backup of DB.

<img src=Picture6.png title="" alt="">

5.	Backup database on source server using credentials:

Paste the blob URL that was copied earlier from blob container properties. Also, give a credential name in the backup command and execute the following statement on the source server. This will take the backup on the blob container.  

<img src=Picture7.png title="" alt="">

Restore SQL DB from Blob container:


1.	Create credentials in the SQL server with the same Azure Storage account identity and Secret Key.


Open query analyzer from SSMS. Give the credential name, Storage account name and paste the secret key that you copied earlier from the storage account access keys. Now execute the following statement and create the credential for the blob container. 

```

CREATE CREDENTIAL [DBBackupCred] 
WITH IDENTITY = 'sqlrestore123'  -- Storage Account Name
,SECRET = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX==' -- Access key
GO
```

**NOTE:** *The same query/statement is executed on both servers with the same secret key.*

<img src=Picture8.png title="" alt="">

2.	Restore DB from the container on the Destination Server.

Go to the blob container, and list down the available backups in the container. Right-click on the available backup on the container. click on view/edit and copy the backup URL.

<img src=Picture9.png title="" alt="">

Open query analyzer from SSMS. Give the credential name, Storage account name and paste the secret key that you copied earlier from the storage account access keys. Now execute the following statement to restore the backup from the blob container. 

```

CREATE CREDENTIAL [DBBackupCred] 
WITH IDENTITY = 'sqlrestore123'  -- Storage Account Name
,SECRET = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX==' -- Access key
GO
```


<img src=Picture10.png title="" alt="">


### Conclusion

By following the above steps, you will be able to back up the SQL database to an Azure Blob container. DBAs sometimes do not use the same secret key to create credentials in the SQL server. This results in the backup file not getting located. By following the steps covered above, you will be able to get the secret key from the Azure portal, create the SQL credential, and easily restore the same backup file to another SQL server. 

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
