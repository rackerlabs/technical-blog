---
layout: post
title: "Create and monitor elastic agent job for Azure SQL database."
date: 2023-02-27
comments: true
author: Anil Kumar
authorAvatar: 'https://secure.gravatar.com/avatar/3f1352f21438061d35ff20470433f3da'
bio: ""
published: true
authorIsRacker: true
categories:
    - Databases
    - SQL Server
metaTitle: "Create and monitor elastic agent job for Azure SQL database."
metaDescription: "This blog demonstrates the detailed steps needed to create an SQL Database backup in a blob container. To begin, with you need to list down the available backups, and restore them from a blob container to a Prem SQL Database."
ogTitle: "Create and monitor elastic agent job for Azure SQL database."
ogDescription: "This blog demonstrates the detailed steps needed to create an SQL Database backup in a blob container. To begin, with you need to list down the available backups, and restore them from a blob container to a Prem SQL Database."
slug: "create-and-monitor-elastic-agent-job-for-Azure-SQL-database."

---

This blog demonstrates the detailed steps needed to create an SQL Database backup in a blob container. To begin, with you need to list down the available backups, and restore them from a blob container to a Prem SQL Database.


<!--more-->

#### Introduction

Azure SQL databases do not have an inbuilt SQL server agent like an on-prem SQL server. Azure has introduced an elastic job agent to enhance this capability to execute serverless code using a scheduler called elastic job agent. 


Let us have a look at the creation and configuration of the elastic job using the below steps

1.	Create an Azure SQL Job agent server and job database
2.	Create Azure SQL Target server and databases 
3.	Create Elastic Job Agent and configure job database
4.	Create Master key and database scope credential 
5.	Create Target Group, Elastic Job, configure and monitor job.

**Create Azure SQL Job agent server and job database**
Go to the azure portal and Create an Azure SQL job server and database a DB with pricing tier standard S0 or higher in it. You will see DB like below after its creation. 

<img src=picture1.png title="" alt="">


**Create Azure SQL Target server and databases**

Go to the Azure portal again and Create an Azure SQL Target server and 2 databases in it. One with standard S0 and one with basic tier. Target Databases do not need to standard S0 tier here. 

<img src=Picture2.png title="" alt="">

**Create Elastic Job Agent and configure job database**

Go to Azure marketplace and type “elastic agent.” create an elastic agent and chose a database where job agent metadata will be created.  It will create default tables and sp’s in configured elastic agent database. 

<img src=Picture3.png title="" alt="">
<img src=Picture4.png title="" alt="">

Default tables created for the Job agent database are below

<img src=Picturex.png title="" alt="">

**Create Master key and database scope credential**
Use the below commands to create a master key in the job database and create a database scope credential. This credential is required to execute queries on Target databases.

Also, create a master key and scoped credential using the same command on Target databases

<img src=Picture7.png title="" alt="">

- a) Create Target Group

Use the below commands to create a Target group and add a server where the job needs to be executed. Also, validate if it got added successfully using internal job tables.

<img src=Picture8.png title="" alt="">

- b) Create table and statistics on destination DBs using the below command. 
<img src=Picture9.png title="" alt="">

- c) c)	Create an elastic job on the Job server

*Use sp_add_job stored procedure on the job server DB to create a job and add a step to it.*

- d) d)	Job execution: Start the job using sp_start_job stored procedure also monitor the execution using job_executions table. 

<img src=Picturey.png title="" alt="">

- e) Job monitoring: You will get success logs using the job_executions table or from the elastic job agent like below. 

<img src= Picture13.png title="" alt="">


#### Conclusion: 

This blog tells us we can create an elastic job on the on-Job server. We can create a target group where we can add target servers for which we can create elastic jobs.  We can also exclude the database on a target server where we do not want to configure and execute the job. We can monitor the elastic job through the elastic job agent or through the system catalog tables. 








<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
