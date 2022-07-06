---
layout: post
title: "Adding new articles & reinitializing the existing SQL Server transactional replication "
date: 2022-06-08
comments: true
author: Rachamallu Jayaprakash Reddy
authorAvatar: 'https://secure.gravatar.com/avatar/6af0bef05e6a7e43b108c62b13127952'
bio: "Experienced DBA with a demonstrated history of working in the information technology and services industry. Skilled in MSSQL Server, Migration Projects, Database Administration, High Availability Techniques and Performance Tuning. Strong engineering professional with a Masters of Technology. M. Tech focused in Computer Science from JNTUH College of Engineering, Hyderabad."
published: true
authorIsRacker: true
categories:
    - SQL
    - Database
metaTitle: "Adding new articles and reinitializing the subscriber for already initialized SQL transactional replication with backup"
metaDescription: "In my earlier  blog, I had discussed how to Initialize replication for a large database using the database backup. 
I will now be discussing how to add new articles and reinitialize the existing SQL Server transactional replication configured through backup."
ogTitle: "Adding new articles and reinitializing the subscriber for already initialized SQL transactional replication with backup"
ogDescription: "In my earlier  blog, I had discussed how to Initialize replication for a large database using the database backup. 
I will now be discussing how to add new articles and reinitialize the existing SQL Server transactional replication configured through backup."
slug: "adding-new-articles-and-reinitializing-the-subscriber-for-already-initialized-sql-transactional-replication-with-backup"

---

In my earlier  blog, I had discussed how to [Initialize replication for a large database](https://docs.rackspace.com/blog/initiating-replication-for-a-large-database) using the database backup. 
I will now be discussing how to add new articles and reinitialize the existing SQL Server transactional replication configured through backup.

<!--more-->

### Introduction

Generally, a user tends to use a snapshot agent to add any new articles to the publication or reinitializing the subscriber, however, in this scenario, I have already configured the transactional replication using the database backup.
The following are the detailed steps: 
1.	Add new articles to the existing publication that was initialized with the backup.
2.	Reinitialize the subscriber that was already initialized with the backup.


### Scenario 1: How to Add new articles to the existing publication which was initialized with the backup:

In our scenario, transactional replication has already been configured using the backup file as follows:

-**Publisher + Distributor**: Node1
-**Subscriber**: Node2
-**Publisher Database**: ABC_Pub
-**Subscriber Database**: ABC_Sub
-**Publication**: ABC_Pub_Bkp
-**Subscription**: ABC_Sub_Bkp
-**Articles**: Cars, bikes

Adding new articles to the existing publication can be done by manually synchronizing the data (which we will discuss with the detailed steps) between the publisher and the subscriber. 

#### Process Steps Overview: 

1.	Synchronize the data for new articles from publisher to subscriber using any popular import/export method.
   - Add new tables to the publisher database and insert a few rows. 
   - 	Script the create definition for new tables and execute on subscriber database.
   - 	Use export\import method to sync the data between the publisher and subscriber. 
2.	Stop the Log reader and Distributor agent jobs.
3.	Add the new articles to the publication using GUI to complete the configuration.
4.	Enable and start Log reader and distributor agent jobs.
5.	Insert new data on publisher.
6.	Validate the data on subscriber. 


#### Step 1: Synchronize the data for new articles from publisher to subscriber using import/export method.

In the existing replication, there are two articles, and I will be creating two more tables for the publisher database and later add them to the replication. 

**Articles on the existing replication:** 

<img src=Picture1.png title="" alt="">

I have created two new tables in the publisher database and added a few rows to each table. Now script the create definition for both tables and execute on subscriber database. 

**Two new tables were created on the publisher database:**

<img src=Picture2.png title="" alt="">

**Created tables on subscriber using the definition from publisher:**  

<img src=Picture3.png title="" alt="">

Now let sync the data between the publisher and subscriber using the import\export method: 

*Right click on the publisher database -> Select Export data -> Follow the wizard to pass the required information.* 

**Select the source server (Publisher) and Database Name:** 

<img src=Picture4.png title="" alt="">

In the next step, Select Destination server (Subscriber) and database name: 

<img src=Picture5.png title="" alt="">

**Select the table names to transfer the data and click next:** 

<img src=Picture6.png title="" alt="">

**In the next step, Export was successful:**

<img src=Picture7.png title="" alt="">

**Validating the data:**
As you can see, the data has synced between the publisher and subscriber.

<img src=Picture8.png title="" alt="">

#### 2.	Stop the Log reader and the distributor agent jobs–

Stalling the replication agents is the best recommended practice before doing any operations with the articles. 

<img src=Picture9.png title="" alt="">

#### 3.	Add the new articles to the publication using GUI to complete the configuration

Right click on the publication under the replication folder and choose properties - > Navigate to Articles page -> uncheck **Show only checked articles in the list** -> Select the two new articles under the **objects to publish** i.e. Country and Customer in our case and click OK to finish the configuration. 

<img src=Picture10.png title="" alt="">

#### 4.	Enable and start Log reader and distributor agent jobs – 

Once the agent has been enabled and started, the newly added records should be captured by log reader and then replicate to the subscriber by distributor agent. In the next step, data will be validated. 

<img src=Picture11.png title="" alt="">

#### 5.	Insert new data on publisher.

Now I will add data on both the publisher tables to add 5 more records on each table. 

<img src=Picture12.png title="" alt="">

#### 6.	Validate the data on subscriber:

Post validating the data, you will now see that 5 new records have been added (with total 10 rows) on both the tables. The same have been replicated to the subscriber. 

<img src=Picture13.png title="" alt="">

**Replication health status:**

<img src=Picture14.png title="" alt="">

### Scenario 2: How to Reinitialize the subscriber that was already initialized with backup.

Moving to the second scenario where sometimes we are left with the last option to fix any synchronization issues with the replication by Reinitializing the subscriber. 

In our case, we have initialized the replication through backup and the following is the process steps to reinitialize the subscriber.

1.	Stop the Log reader, distributor agent and distributor cleanup jobs. 
2.	Take the full backup for the publisher database and disable the T-Log backup job. 
3.	Restore the database on subscriber database with replace. 
4.	Validate the data. 
5.	Run sp_addsubscription
6.	Enable Log reader and distributor jobs, insert new records on the publisher database and validate the data on subscriber.

#### 1.	Stop the Log reader and distributor agent jobs. 

Stopping the replication agents is the best recommended practice before doing any operations with the articles. 

<img src=Picture15.png title="" alt="">

#### 2.	Take full backup for the publisher database and disable the T-Log backup job.

Trigger full backup for the database ABC_Pub on publisher server and disable the T-Log backup job if any. 

<img src=Picture16.png title="" alt="">

#### 3.	Restore the database on subscriber database with replace and norecovery

**Restore subscriber database ABC_Sub with Replace:**

<img src=Picture17.png title="" alt="">

#### 4.	Validate the data between publisher and subscriber database.

Data has been validated and as shown in the following snapshot, both Cars and Bikes table have 5 records each and Country and customer table has 10 records each.

<img src=Picture18.png title="" alt="">

#### 5.	Run sp_addsubscription :

Now run the following stored procedure with the required parameters to reinitialize the subscriber. 

<img src=Picture19.png title="" alt="">

#### 6.	Enable Log reader, distributor agent and cleanup jobs. Insert new records on publisher database and validate the data on subscriber. 

**Enable replication agent jobs and start:** 

<img src=Picture20.png title="" alt="">

**Insert additional 5 records on the following two replicated tables:**

<img src=Picture21.png title="" alt="">

**Validate the data now on subscriber database:**

Validation is now complete and 5 newly added records have been replaced to subscriber and all the tables now have 10 records each. 

<img src=Picture22.png title="" alt="">

**Health check for replication:**

<img src=Picture23.png title="" alt="">

### Conclusion

I hope you find the above discussed two scenarios useful for adding new articles and reinitializing the subscriber which was already initialized through backup. 


<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/oracle">Learn about Rackspace Managed Oracle Applications.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
