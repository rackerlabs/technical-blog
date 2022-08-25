---
layout: post
title: "DR Drill with Log shipping"
date: 2022-08-25
comments: true
author: Rachamallu Jayaprakash Reddy
authorAvatar: 'https://secure.gravatar.com/avatar/6af0bef05e6a7e43b108c62b13127952'
bio: "Experienced DBA with a demonstrated history of working in the information technology and services industry. Skilled in MSSQL Server, Migration Projects, Database Administration, High Availability Techniques and Performance Tuning. Strong engineering professional with a Masters of Technology. M. Tech focused in Computer Science from JNTUH College of Engineering, Hyderabad."
published: true
authorIsRacker: true
categories:
    - Databases
metaTitle: "DR Drill with Log shipping"
metaDescription: "This blog demonstrates the detailed steps needed during the DR testing with reverse Log shipping method."
ogTitle: "DR Drill with Log shipping"
ogDescription: "This blog demonstrates the detailed steps needed during the DR testing with reverse Log shipping method."
slug: "dr-drill-with-log-shipping"

---

This blog demonstrates the detailed steps needed during the DR testing with reverse Log shipping method. 
 
<!--more-->

### Describing Version Control

### Introduction
One common task for every DBA is to make sure that all mission-critical SQL Server instances and the databases within them are available around the clock to keep the business up and running by minimizing or no business disruptions.
When your primary location experiences a geographical disaster like an earthquake, flood, or fire the business must be prepared by recovering or resuming the services from a geographically different location. 
In SQL Server databases, Log shipping is one of the oldest methods of providing disaster recovery which is implemented in many organizations where other options may be challenging due to environment, administrative skills, or budget.
Why do we need a DR Drill? - In order to avoid business downtime we always have to maintain a proper DR mechanism and it's mandatory to conduct a DR test to verify the application connectivity and the data synchronization state once we restore or recover the database on the DR site. It is a best practice to conduct a DR drill every six months,  although it entirely depends on the client's requirement. 

### Let’s get into the detailed steps of the DR drill setup:

I have already configured the Log shipping and below are the configuration details : 

- Primary Database Name : **LS_P**
- LS Primary Server : **Node1**
- LS Secondary/DR Server : **Node2**
- Secondary Database : **LS_DR**

**Please follow the checklist for a smooth DR exercise and get the steps prepared for the failover and failback.**


### Checklist
1.	Coordinate with the client for the maintenance window to perform the DR drill.
2.	Engage the application team for the connectivity and the data validation during the DR test. 
3.	Confirm with customer if they want to copy any application-related SQL agent jobs on DR server.
4.	Copy all the Logins using `revlogin` script.


###  Steps for Failover

1.	Take the confirmation from customer to stop their applications from connecting to the LS primary server. 
2.	Once the customer confirms for go-head, Run Manually LS Backup job on Primary Server and LS Copy, LS Restore on DR server.
<img src=Picture1.png title="" alt="">
<img src=Picture2.png title="" alt="">

3.	Upon completion of the above jobs, Check the LS report and make sure  Last backup, Last copy, and last restore are having the same backup file name. 

<img src=Picture3.png title="" alt="">
<img src=Picture4.png title="" alt="">

4.	On confirming the backup files are same on step#3, Disable all the LS Jobs mentioned on the Primary and DR server.
<img src=Picture5.png title="" alt="">
<img src=Picture6.png title="" alt="">

5.	Take the Tail log backup on the primary server and this will leave the databases into Restoring state on the primary server.
<img src=Picture7.png title="" alt="">

6.	Copy the Tail log backups from primary to DR and Restore with recovery on the DR server, this will bring the database online state.

<img src=Picture8.png title="" alt="">

7.	Configure Reverse Log shipping from DR to Primary server.

-          From DR server, now configure the Log shipping and during the configuration on secondary database settings, select ‘No. The secondary database is initialized’ Instead of creating the secondary database from scratch and choose the secondary database from the drop-down.

<img src=Picture9.png title="" alt="">

8.	Validate the Reverse Log shipping health by manually running the newly created LS backup jobs on the DR server and LS copy and restore jobs on the Primary server.

<img src=Picture10.png title="" alt="">
<img src=Picture11.png title="" alt="">

9.	Check the LS report and make sure  Last backup, Last copy, and last restore are having the same backup file name. 

<img src=Picture12.png title="" alt="">

10.	Copy any application related Jobs, logins from the primary server to DR and fix any orphan users.

11.	Confirm to the customer that Failover has been completed and they are good for application testing.

### Steps for Failback

1.	Once the customer confirmed that DR test has been completed, proceed with the below steps to failback. 
2.	Run Manually LS Backup job on DR and LS Copy, LS Restore on Primary server and Check the LS report to make sure Last backup, Last copy, and last restore are having the same backup file name.

<img src=Picture13.png title="" alt="">

3.	On confirming the backup files are the same on step#2, Disable the LS backup Job on DR and LS copy and restore Jobs on the Primary server.

<img src=Picture14.png title="" alt="">
<img src=Picture15.png title="" alt="">

4.	Take the Tail log backup on the DR server and this will leave the databases in Restoring state on the DR server.

<img src=Picture16.png title="" alt="">

**NOTE:** - Clear the tail log backups on the folder which were copied during the failover. 

5.	Copy the Tail log backups from DR to Primary and Restore the tail log with recovery on the Primary server.

<img src=Picture17.png title="" alt="">

**NOTE:** Before copying clear all the tail log backups on the local path of the Primary server which were taken during the failover.

6.	Enable and run manually the old LS Backup job on the Primary server and old LS copy and restore jobs on the DR server.

<img src=Picture18.png title="" alt="">
<img src=Picture19.png title="" alt="">

7.	Validate the health check to make sure Log shipping is working fine.

Well, we can see the status of the Log shipping is Good on both Primary and secondary. 

<img src=Picture20.png title="" alt="">
<img src=Picture21.png title="" alt="">

8.	Confirm to the customer that Failback has been completed and do a final test with the application connectivity to the primary server. 

### Conclusion:

 I hope you find this discussion useful when you are planning the DR drill with Log shipping. 






<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).