---
layout: post
title: "Initiliazing replication for a large database"
date: 2022-01-19
comments: true
author: Rachamallu Jayaprakash Reddy 
authorAvatar: 'https://secure.gravatar.com/avatar/6af0bef05e6a7e43b108c62b13127952'
bio: "Experienced DBA with a demonstrated history of working in the information technology and services industry, Skilled in MS SQL Server, Migration Projects, Database Administration, High Availability Techniques and Performance Tuning. Strong engineering professional with a Master's of Technology - M. Tech focused in Computer Sciences from JNTUH College of Engineering, Hyderabad."
published: true
authorIsRacker: true
categories:
    - Database
    - SQL Server
metaTitle: "Initiating replication for a large database"
metaDescription: "This blog demonstrates the detailed steps needed to set up transactional replication using a backup to initialize the subscriptions without taking the snapshot for all the articles, as we know the snapshot option is time-consuming for large databases. "
ogTitle: "Initiating replication for a large database"
ogDescription: "This blog demonstrates the detailed steps needed to set up transactional replication using a backup to initialize the subscriptions without taking the snapshot for all the articles, as we know the snapshot option is time-consuming for large databases."
slug: "initiating-replication-for-a-large-database"

---

This blog demonstrates the detailed steps needed to set up transactional replication using a backup to initialize the subscriptions without taking the snapshot for all the articles, as we know the snapshot option is time-consuming for large databases. 

<!--more-->


### Introduction

It’s a huge task to set up a transactional replication for a very large SQL Server database. Generally, you will set up transactional replication on any database by generating the snapshot without considering how long a snapshot will take and the amount of disk for the snapshot folder.
To avoid a very long time on creating an initial snapshot and reinitializing the Subscribers, in this blog, you will explore an easy way to initialize the subscriber from an SQL database backup.


### Let’s get into the detailed steps of the setup:
To set up a transactional replication - First, you need to configure the Distributor. 
In this lab, I have already configured the Distributor, and following is the reference link on how to configure the Distributor. 

https://docs.microsoft.com/en-us/sql/relational-databases/replication/configure-publishing-and-distribution?view=sql-server-ver15


#### Process Steps Overview:
•	Create Publication. 

•	Modify Publication Properties.  

•	Backup the Publisher database.

•	Restore the backup on the subscriber database.  

•	Create Subscription through T-SQL as the GUI doesn’t support initializing from a database backup.


#### In this scenario, Transactional Replication is going to configure with the following details. 

- Publisher + Distributor: Node1
- Subscriber: Node2
- Publisher Database: ABC_Pub
- Subscriber Database: ABC_Sub
- Publication: ABC_Pub_Bkp
- Subscription: ABC_Sub_Bkp


#### Step 1: Create the publication by choosing the database for replication. 
Publisher Database: ABC_Pub

<img src=Picture1.png title="" alt="">


#### Step 2: Select the type of publication and the tables to participate in replication.

<img src=Picture2.png title="" alt="">

Select Articles to replicate: 

<img src=Picture3.png title="" alt="">


#### Step 3: In our case, we are using a database backup file instead of a snapshot so we will leave them blank and click on next, as shown in the following snapshot.


<img src=Picture4.png title="" alt="">

Created publication- ABC_Pub_Bkp 

<img src=Picture5.png title="" alt="">


#### Step 4: Set ‘Allow initialization from backup files’ to true. 

Form T-SQL :

<img src=Picture6.png title="" alt="">

From GUI : 
On Publication Properties, select the Subscription Options and set “Allow initialization from backup files“ to “true” and Click Ok to save the change.

<img src=Picture7.png title="" alt="">

#### Step 5: Disable the Distribution cleanup SQL Server job (right-click on the job name and click Disable):

<img src=Picture8.png title="" alt="">

_It is a must to disable the job before taking the backup as a next step. If not, you may experience the following error._

<img src=Picturex.png title="" alt="">


#### Step 6: Perform database backup from Publisher.

<img src=Picture9.png title="" alt="">

#### Step 7: Restore the backup on the subscriber server.

<img src=Picture10.png title="" alt="">

#### Step 8: Execute sp_addsubscription on Publication database by passing the mentioned parameters in the following snapshot. 

<img src=Picture11.png title="" alt="">

#### Step 9: After all the other steps are completed, enable the Distribution cleanup job.

#### Step 10: Now check the replication status using SSMS under replication → Replication Monitor.

We can see that the performance shows excellent state and there is no Snapshot agent created in the entire process as we have used the backup file to initialize. 

<img src=Picture12.png title="" alt="">

<img src=Picture13.png title="" alt="">


### Conclusion

Initialization from database backup files resolves numerous problems when we try to synchronize large databases but creates a few of its own. These problems can be solved with some planning and hopefully, this article helps to simplify the process.




<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
