---
layout: post
title: "Add TDE enabled database to an Always on Availability group using AutoSeeding"
date: 2023-02-27
comments: true
author: Santosh Kumar
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - Databases
    - SQL Server
metaTitle: "Add TDE enabled database to an Always on Availability group using AutoSeeding."
metaDescription: "This blog explains the steps needed to set up Transparent Data Encryption (TDE) and database in Always on AG group using AutoSeeding method. (Applies to 2016 and above)."
ogTitle: "Add TDE enabled database to an Always on Availability group using AutoSeeding"
ogDescription: "This blog explains the steps needed to set up Transparent Data Encryption (TDE) and database in Always on AG group using AutoSeeding method. (Applies to 2016 and above)."
slug: "add-tde-enabled-database-to-an-always-on-availability-group-using-autoseeding"

---

This blog explains the steps needed to set up Transparent Data Encryption (TDE) and database in Always on AG group using AutoSeeding method. (Applies to 2016 and above).


<!--more-->

#### Introduction

- **Always on -** 
Beginning with SQL Server 2012, A new high availability and DR solution was introduced, Always On. By offering a failover environment for availability databases that failover jointly and are a part of an availability group, it improves  availability.

- **TDE -**
The "data at rest" encryption technology known as SQL Server Transparent Data Encryption, or TDE, is made available as an Enterprise Edition feature in SQL Server 2008. Instead of encrypting the data directly using the Advanced Encryption Standard (AES) or Triple DES (3DES), The physical files utilised by the SQL Server database's data, logs, backups, and snapshots are encrypted in real time by TDE.
TDE encrypts database data files with a Database Encryption Key secured by a Certificate and a Master Key kept in the master database.
<img src=Picture1.png title="" alt="">

- **Auto Seeding –** 
With SQL Server 2016, a new technique known as Automatic Seeding was added to add databases to availability groups. With this technique, full database backups are performed using Microsoft SQL Server Virtual Device Interface (VDI), which are then streamed over the network to all accessible secondary replicas where they are restored and added to the availability group.

- **Availability
TDE was included in Microsoft SQL Server 2008, 2008 R2, 2012, 2014, 2016, and 2017 in Evaluation, Developer, Enterprise, and Datacentre versions. In SQL Server 2019, Microsoft made it available in the Standard edition as well.

*In this blog, will demonstrate how to (Presuming database is already TDE enabled) -* 
1.	Add Database in Always on AG using AutoSeeding mode.
2.	Failover Testing

**For demonstration, we are going to use two node AG –**
*Primary replica – SQLNODE1*
*Secondary replica – SQLNODE2*
*AG Name – AGTEST*
*Database – TDEDemo*

**Step 1 - Validate transparent data encryption in SQL Server by running query**

<img src=Picture2.png title="" alt="">

-- Validate transparent data encryption in SQL Server.

[Script1.txt](https://github.com/rackerlabs/technical-blog/files/10933152/Script1.txt)


State 3 in encryption state means database is encrypted.
*Run following query to get further details about TDE -* 

<img src=Picture3.png title="" alt="">

**Step 2 - Backup the certificate and private key on the primary replica to restore on Secondary replica using query**
[Script2.txt](https://github.com/rackerlabs/technical-blog/files/10933175/Script2.txt)

<img src=Picture4.png title="" alt="">

- Validate if both files are created (Certificate and its private key) -
    <img src=Picture5.png title="" alt="">

**Step 3 - Create certificate on the secondary replica from the primary replica certificate (Step 2) using query**
[Script3.txt](https://github.com/rackerlabs/technical-blog/files/10933182/Script3.txt)
    
<img src=Picture6.png title="" alt="">
[Script4.txt](https://github.com/rackerlabs/technical-blog/files/10933260/Script4.txt)

-	**Add Database in Always on AG using AutoSeeding mode.**
Distributing encryption certificates among all the participating replicas is necessary before adding a database to AG.

- Step 1. **Enabling Automatic Seeding**
We must permit the AG to create databases on every replica where automatic seeding is necessary.
In our case, we have executed on both SQLNode1 and SQLNode2.

<img src=Picture7.png title="" alt="">

Once done, enable automatic seeding mode by running below code on Primary replica for each replica in the AG - 

[Script5.txt](https://github.com/rackerlabs/technical-blog/files/10933298/Script5.txt)


<img src=Picture8.png title="" alt="">

- Step 2. **Enable Trace Flag for compression in Automatic Seeding for Always on Availability Groups on Primary**

By default, compression is not enabled for the automatic seeding streaming. We can add trace flag 9657 to enable the compression either in start-up parameter or using DBCC TRACEON command. 
Below command will enable the trace flag at a global level.

DBCC TRACEON (9567,-1)

<img src=Picture9.png title="" alt="">

Step 3.  **Add database in AG**

Step 3.  **Add database in AG**

Databases that are already encrypted using TDE encryption cannot be added to an Availability Group by the Add Database Wizard for AlwaysOn Availability Groups. If you attempt to use the Add Database Wizard to add the TDE-encrypted TDEDemo database, the wizard will inform you that this is not applicable because the database contains the following encryption key:

<img src=Picture10.png title="" alt="">

This means that we need to add the database to the Availability group using TSQL using query -
[Script6.txt](https://github.com/rackerlabs/technical-blog/files/10933311/Script6.txt)


<img src=Picture11.png title="" alt="">


<img src=Picture12.png title="" alt="">

Step 4. **Validate the progress using DMV using query -**

[Script7.txt](https://github.com/rackerlabs/technical-blog/files/10933318/Script7.txt)



Step 5. **Validate AG Status in Dashboard**

<img src=Picture13.png title="" alt="">


-	**Failover Testing**

Launch failover availability group wizard and select the new primary replica.
In my case, we have the following configurations.
- a. Current primary replica: SQLNODE1
- b.	New Primary replica: SQLNODE2
- c.	Failover mode: Manual failover with no data loss (database in the Synchronized state)
- d.	AG database: TDEDemo


AG failover is successful. 

<img src=Picture14.png title="" alt="">

*Launch AG Dashboard on new primary (SQLNODE2) and validate status* : 

<img src=Picture15.png title="" alt="">



#### Conclusion

We can combine multiple features like TDE, Always-on, Automatic seeding of SQL Server 2019 (SQL server 2016 and above) to add database single or multiple databases in availability group. Even though it cannot be achieved using Graphical interface (GUI) as a limitation till date but hoping Microsoft adds this feature in future release.    





<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
