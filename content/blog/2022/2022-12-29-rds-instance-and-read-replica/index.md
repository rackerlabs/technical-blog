---
layout: post
title: "RDS Instance and Read replica"
date: 2022-12-29
comments: true
author: Vinay Kumar
authorAvatar: 'https://secure.gravatar.com/avatar/c49d4c48e0b6672a4e74e5ddc72af910'
bio: ""
published: true
authorIsRacker: true
categories:
    - SQL 
    - Databases
metaTitle: "RDS Instance and Read replica"
metaDescription: "The blog discusses how to configure Relational Database Service (RDS) instances and their read replica. It also explains how to promote read replicas to a new standalone instance."
ogTitle: "RDS Instance and Read replica"
ogDescription: "The blog discusses how to configure Relational Database Service (RDS) instances and their read replica. It also explains how to promote read replicas to a new standalone instance."
slug: "rds-instance-and-read-replica"

---

The blog discusses how to configure Relational Database Service (RDS) instances and their read replica. It also explains how to promote read replicas to a new standalone instance. 
<!--more-->

Read replica is useful when we have reporting applications that are only using the select command on the database. Read replicas cannot be used for the update or delete operation and these are just used for reporting purposes. However, before getting into the configuration steps, let’s understand RDS a little better. 

**Amazon RDS: What is RDS?**

-	As mentioned above, RDS is an acronym for relational database service.
-	It uses SQL
-	Supported Engines: PostgresSQL, MySQL, MariaDB, Oracle, Microsoft SQL Server, Aurora
-	Launched within a VPC and usually in a private subnet.
-	Storage by EBS
-	Backup: Automated with point-in-time recovery.
-	Can monitor through cloud watch and Configure RDS events. 
-	Can take snapshots across regions.

**Now, let’s proceed with the RDS configuration.**

Assuming we already have an amazon account. The next step is to create an RDS instance from the RDS console.

<img src=Picture1.png title="" alt="">

Once we click on create database button, a user gets redirected to the next screen as shown in the following snapshot. 
<img src=Picture2.png title="" alt="">

We will go with the Standard create and thereafter select the engine type. For this scenario, I have chosen MYSQL engine and version 5.7.40 Also depending on the requirements you can choose template type. In this example, I have opted for the Free tier option as we are illustrating it for learning purpose only.
<img src=Picture3.png title="" alt="">

<img src=Picture4.png title="" alt="">

<img src=Picture5.png title="" alt="">

Once the above steps are completed, you need to provide database and admin credentials.

<img src=Picture6.png title="" alt="">

Now fill in the instance configuration, storage, and connectivity information.

<img src=Picture7.png title="" alt="">
<img src=Picture8.png title="" alt="">
<img src=Picture9.png title="" alt="">
<img src=Picture10.png title="" alt="">
<img src=Picture11.png title="" alt="">


You need to fill in the VPC, subnet group, and security group or you can choose the default values as well. In the authentication field, password authentication is used. Also, as we are using the free tier not all options are available for use.

Now click on create database and it will take a while to complete the configuration. One can keep refreshing the page to see the progress 
<img src=Picture12.png title="" alt="">
Once the database is successfully created, select only that database for which a read replica needs to be created. It can be created from the action drop-down menu and by selecting “Create read Replica”.

<img src=Picture13.png title="" alt="">

Now you will see the following screen pop-up to fill out the required information. In my example, I am choosing the default values to keep things simple. The DB identifier field cannot be left blank.

<img src=Picture14.png title="" alt="">

After clicking on the read replica button, you will see the following screen. you can track the progress of the read replica of our RDS instance. Once it is complete, move to the next step and promote the read replica to a standalone database.

<img src=Picture15.png title="" alt="">

This creates the read replica and can be promoted as a standalone DB as you can see in the following snippet. It will take you to the next screen and just click on the button to create a standalone DB.

<img src=Picture16.png title="" alt="">

As your read replica is promoted to a standalone DB it is now available for all the operations like Select/insert/update as it is a complete database. Also you will notice that  database-1 link and dbreplica are no longer available (as you can see in the previous image), dbreplica is now a separate entity. 

<img src=Picture17.png title="" alt="">

#### Conclusion

 I hope you will find the above steps useful in creating read replica and promote it to read write standalone instance. In the next part, I will discuss backup/recovery and failover on RDS.





























<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
