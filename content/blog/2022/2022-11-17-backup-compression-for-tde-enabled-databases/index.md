---
layout: post
title:"Backup Compression for TDE-enabled Databases"
date:2022-11-17
comments:true
author:LKD Naidu
authorAvatar:'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - Database

metaTitle: "Backup Compression for TDE enabled Databases"
metaDescription: "The SQL Server 2008 and later versions provide many powerful features, and among those, Backup Compression and Transparent Data Encryption (TDE) are very useful to compress your backups and Enable the encryption at database level. However, if  we use both these options on the same database then we have the limitation of leveraging both these features up to SQL 2016 version."
ogTitle: "Backup Compression for TDE enabled Databases"
ogDescription: "The SQL Server 2008 and later versions provide many powerful features, and among those, Backup Compression and Transparent Data Encryption (TDE) are very useful to compress your backups and Enable the encryption at database level. However, if  we use both these options on the same database then we have the limitation of leveraging both these features up to SQL 2016 version."
slug: "backup-compression-for-tde-enabled-databases"

---
The SQL Server 2008 and later versions provide many powerful features, and among those, Backup Compression and Transparent Data Encryption 

<!--more-->

### Introduction

I will discuss these very limitations and the solution for this blog. 

Recently, we faced issues on TDE- enabled databases related to enabled backup compression. Log shipping was configured and working fine on TDE enabled database initially but due to some reasons, Log shipping was broken. We have tried to fix the issue by restoring the Full/Diff/Log backups from prod to DR server, yet the issue was not fixed, and different errors kept popping up in each phase. 
- Environment: SQL Server 2016 
While restoring log backup files on the DR server we got the following error. 

<img src=Picture1.png title="" alt="">

As the database size was huge, we took a split full backup because compression feature in the backup command failed. While restoring the  full-back on DR we encountered the following error 

<img src=Picture2.png title="" alt="">

In order to resolve these issues verified many MS public documents and identified some key Points for TDE & backup compression-enabled databases in SQL 2016 versions.

-	Don’t take split or Stripped backups on TDE and backup compression Enabled databases. 
-	If more than 4 GB virtual log files are available then do not use backup compression in log backups too. 
-	Please avoid using WITH INIT option while taking compression backups on  TDE enabled database. Instead use WITH FORMAT option in the backup command.
-	If you want to take compression backup on TDE-enabled database then we should use MAXTRANSFERSIZE parameter in the BACKUP command and the value of should be greater than 65536 (64 KB).

After considering the above points, take Full backup with MAXTRANSFERSIZE and Format options in a single backup file using the following syntax. 


`Backup database LKD to disk=’Path’ with Format, MAXTRANSFERSIZE= 65537  , stats=1`


<img src=Picture3.png title="" alt="">

After restoring the above backup file on DR successfully, take a few log backups using the format option and restore ON DR successfully. 

 By implementing the above steps, Log shipping starts working!

#### Improvement

Starting from SQL Server 2019 Cumulative Update 5 (CU5), the MAXTRANSFERSIZE option is not required to enable backup compression on TDE-enabled databases. Because If go with the COMPRESSION option in the backup command or enable backup compression at the server level, MAXTRANSFERSIZE will automatically take the 128K value in the backup. If greater than 64K, then the provided value will be considered. It means SQL Server will never automatically decrease the value, it will only increase it. 

### Conclusion

We should use Format and MAXTRANSFERSIZE options while taking compression backup on TDE enabled database and backup files should be in a single file to restore on other servers. Hope you will find this blog helpful and are able to reconfigure  log shipping on TDE enabled database hassle free. 


<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
