---
layout: post
title: "AWS Migration Using DMS Series Part-1"
date: 2022-08-12
comments: true
author: Ankita Garg
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - AWS
    - Database
metaTitle: "AWS Migration Using DMS Series Part-2"
metaDescription: "In this fast moving Tech world, everyone wants to use best technology with max performance and minimum cost. AWS Cloud was introduced with the same notion."
ogTitle: "AWS Migration Using DMS Series Part-2"
ogDescription: "In this fast moving Tech world, everyone wants to use best technology with max performance and minimum cost. AWS Cloud was introduced with the same notion."
slug: "aws-migration-using-dms-series-part-2"

---

This is in continuation of earlier blog on AWS DMS where we shall Configure Ongoing Replication from RDS to Redshift.
Later we shall see some wonderful DMS features.

Lets start:
 
<!--more-->

### Using DMS to Configure Ongoing Replication from RDS to Redshift

Refer to Sample screen shots showing how to configure DMS service:
Login to your AWS account. 
- **Click on ServicesMigration & TransferDatabase Migration Service**

On the landing page various options are available like creating Replication Instance, End points, migration tasks etc. We need to start with Replication Instance.

- ### Step-1: Creating Replication Instance:
Navigate to *Replication Instance* => *Create Replication Instance*

Choose the values as per your requirement. Below is a sample screenshot:

<img src=Picture1.png title="" alt="">

- **Section: Advanced Security and Networking settings:**
Choose the VPC/Subnet/Availability zones in which you would like your Replication Instance to be launched.
- **Section: Maintenance:** 
Choose a Day/Time when you want your Replication Instance to have a regular maintenance window.
- **Section: Tags:**
Choose a Tag if you want to take benefit of Tagging for Budgeting/Cost Analysis/Resource analysis later.


### Step-2: Next we shall Create the End-points

GoTo => AWS DMS Home Page => Create Endpoint

Landing page is a common page, it is used to create both Source/Target Endpoint, one at a time.
First create Source Endpoint using Source details. Then create Target Endpoint using Target details.

<img src=Picture2.png title="" alt="">

In below fields use Source/Target information as per your system:

<img src=Picture3.png title="" alt="">

### Section: Key Management: 

Choose as per your organization standards. Default : aws keys

### Section: Tags: Optional

Once Endpoint is created, we can Click *Run test* to check for any issues in connectivity from Replication Instance to created Endpoint.

<img src=Picture4.png title="" alt="">

**NOTE:** We need to create both Source and Target endpoints before proceeding further.

Single Endpoint can be used by More than one replication tasks. 

For example, if you have two different applications running on same Source database and you want to migrate them separately then do below:

Create two replication tasks one for each application
Use same DMS endpoints in both tasks and Voila!!!! Run the replication.


### Step 3: Next we shall Create Replication Task:

GoTo: Database Migration Tasks => Create Task 

On Landing page, you need to use below details configured as per Step-1 and 2 previously:
- Name of Replication Instance
- Name of Source and Target Endpoints

<img src=Picture5.png title="" alt="">

**NOTE:** Decide on which kind of Migration you would like to do and choose Migration Type accordingly.

**Section: Task Settings:**
In this section you need to decide on :
- a.	How data load will happen from Source to target.
- b.	If you want to use CDC or not.
- c.	What to do when full load completes.
- d.	If LOB columns need to be replicated
- e.	And some other details related to Table mapping for data movement.

Choose the settings carefully as per your requirement.

**Section: Premigration Assessment**

Before running actual migration we have option to generate assessment report. It checks for any issues/errors we might get during actual migration. It creates a report and save it to our defined S3 location to refer to. Enable Checkbox to use this report.

<img src=Picture6.png title="" alt="">

**Section: Migration Task startup:**

If you want to just create the task but run it later, choose “Manually later” option.

Below screen shows you a quick summary of your replication task and its last runtime information.
<img src=Picture7.png title="" alt="">

To check detailed summary with the status of our Migration task, get stats on timings, check whether mapping rules were followed, errors encountered during task migration and other details.

**Migration Task Summary:**

GoTo: DMS => Database migration tasks=> Your replication task name

<img src=Picture8.png title="" alt="">

Once started, we can check different metrics under various available tabs to see the status of our replication task. Below sample shows stats for Table migration done.

<img src=Picture9.png title="" alt="">

### Section 1 DMS Features:

1. **Supports Multi-AZ deployment if Multi-AZ option is selected:**

 
*If Multi-AZ is selected for AWS DMS, it itself provisions and maintains a standby replica of the  replication instance(RI).*

*Replica is kept in different Availability Zone. The primary RI is replicated synchronously across availability Zones to a standby replica*

**Using Multi-AZ provides below benefits:**

- Data redundancy, 
- I/O freeze Elimination
- Minimizing latency spikes.

2. **2.	Support for Generic and Govt AWS regions:**

AWS DMS supports both normal regions and AWS GovCloud (US) 

AWS GovCLoud(US) is designed to allow US government agencies and customers to move sensitive workloads into the cloud. It addresses the specific Compliance and Regulatory requirements. 

3. **DMS can be used for Heterogeneous Migration ie when source and target use different database engines.**

4. **4.	Available migration options:**

- a. On-premise to Cloud(AWS) and Vice-versa.
- b. Cloud to Cloud where one of the endpoint is AWS service.

**NOTE:** Exception: Can not be used to migrate from On-Prem to On-Prem

5. **Licenses for Microsoft software on EC2:**

On Amazon EC2, you can choose to run instances with License included (which means you already have  purchased from Microsoft). Second option is to pay cost for Windows server and Sql Server License together with EC2 cost.

For rest, as per Microsoft terms, customers have option of BYOL ie Bring Your Own License

### Conclusion

Through part 1 and 2 of this blog, we tried to understand DMS, its architecture, features and how to use DMS .
Hope this will help you to kickstart your adventure with DMS and gain good understanding of it.
Best of Luck!!!


<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).