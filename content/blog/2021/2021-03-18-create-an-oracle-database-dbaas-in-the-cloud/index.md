---
layout: post
title: "Create an Oracle Database (DBaaS) in the cloud"
date: 2021-03-18
comments: true
author: Santosh Kumar
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
    - Database
metaTitle: "Create an Oracle Database (DBaaS) in the cloud"
metaDescription: "This post provides all the necessary steps to create a Database-as-a-Service
(DBaaS) database in the Oracle&reg; Cloud."
ogTitle: "Create an Oracle Database (DBaaS) in the cloud"
ogDescription: "This post provides all the necessary steps to create a Database-as-a-Service
(DBaaS) database in the Oracle&reg; Cloud."
slug: "create-an-oracle-database-dbaas-in-the-cloud"

---

This post provides all the necessary steps to create a Database-as-a-Service (DBaaS) database
in the Oracle&reg; Cloud.

<!--more-->

### Introduction

This service enables users to create a database without setting up any physical hardware,
installing an operating system, and dealing with the Oracle Database installation prerequisites.
It doesn't take long to create the database, and you need minimal system administrator privileges.

In this post, you learn the following steps to set up DBaaS in the Oracle Cloud:

1. Create a compartment.
2. Create a Virtual Cloud Network (VCN). 
3. Set up DBaaS.

### First: Create a compartment

A compartment is a logical container that stores the Oracle Cloud Infrastructure (OCI)
resources, including the instance, storage, network, load balancer, and so on. Compartments
are a fundamental process. You can move most resources between compartments. If you want to
do anything in the OCI console, first, you need to choose a compartment.

Perform the following steps to create a compartment:

##### 1. Log in to the cloud URL

Log in to the Oracle cloud URL ([https://www.oracle.com/cloud/sign-in.html](https://www.oracle.com/cloud/sign-in.html)).

{{<img src="Picture1.png" title="" alt="">}}

<br>
<br/>

Enter your account details and press **Next**. 

{{<img src="Picture2.png" title="" alt="">}}

<br>
<br/>

Finally, enter your username and password and click **Sign in**.

{{<img src="Picture3.png" title="" alt="">}}

<br>
<br/>

Now, you can see the Oracle Cloud Console.

##### 2. Create a compartment

After you log into the Oracle cloud, create compartments by using the following steps:

1. Click the menu on the upper left-hand side) and select **Identity -> Compartments**.

{{<img src="Picture4.png" title="" alt="">}}

<br>
<br/>
  
2. Click **Create compartment** and fill in the following details:
 
**NAME**: Compartment Name.
**DESCRIPTION**: Short description about the compartment, such as *Compartment for Test environment*.
**PARENT COMPARTMENT**:  It defaults to `Root`.

{{<img src="Picture5.png" title="" alt="">}}

<br>
<br/>

3. Click **Create Compartment**.

### Second: Create a VCN

Now you have to create VCN. You set up a private network in Oracle data centers, with your
chosen firewall rules and specific types of communication gateways. You can create subnets,
route tables, and gateways for your compute instance in the VCN. 

Perform the following steps to create the VCN:

1. Click the menu on the upper left-hand side) and select **Networking ->Virtual Cloud Networks**. 

{{<img src="Picture6.png" title="" alt="">}}

<br>
<br/>

{{<img src="Picture7.png" title="" alt="">}}

<br>
<br/>

2. Select the compartment you created previously.

3. Click **Create Virtual Cloud Network** and fill in the details:
  
**NAME**: Enter the new VCN name.
**CREATE IN COMPARTMENT**: Select your compartment.
**CIDER BLOCK**: Enter the Cider block (for example: `10.0.0.0/16`).
Then click **Create virtual cloud Network**.

{{<img src="Picture8.png" title="" alt="">}}

<br>
<br/>

### Third: Create the DBaaS database

1. Click the menu on the upper left-hand side) and select **Identity -> Bare Metal,VM,Exadat**.

{{<img src="Picture9.png" title="" alt="">}}

<br>
<br/>

2. Select your compartment and click **Create DB System**.

{{<img src="Picture10.png" title="" alt="">}}

<br>
<br/>

3. Enter the required details:

**Select a compartment**: Enter the compartment that you created.
**Name your DB system**: Enter the database name.
**Select an availability domain**: Select the default domain.

{{<img src="Picture11.png" title="" alt="">}}

<br>
<br/>

**Select a shape type**: Choose a shape type. I selected `Virtual machine`.
**Select a shape**: Choose a shape, click **change shape**, and select it.
**Total node count**: Enter the number of nodes. If you want to configure for Oracle Real
Application Clusters (RAC), then choose two nodes. Otherwise, select one node.  

{{<img src="Picture12.png" title="" alt="">}}

<br>
<br/>

**Oracle Database software edition**: Select the edition. 
**Choose Storage Management Software**: Select the management software.

{{<img src="Picture13.png" title="" alt="">}}

<br>
<br/>

**Available storage (GB)**: Select the available storage size.
**Total storage (GB)**: select the total storage size.
**Add public SSH keys**: Create and upload a public ssh key. 

{{<img src="Picture14.png" title="" alt="">}}

<br>
<br/>

{{<img src="Picture15.png" title="" alt="">}}

<br>
<br/>

**Choose a license type**: Choose `Bring your Own License(BYOL)`.
**Virtual cloud network**: Choose the VCN you created.

{{<img src="Picture16.png" title="" alt="">}}

<br>
<br/>

**Hostname prefix**: Enter the hostname prefix.

{{<img src="Picture17.png" title="" alt="">}}

<br>
<br/>

Click **Next**. 

{{<img src="Picture18.png" title="" alt="">}}

<br>
<br/>

**Database name**: Enter the database name.
**Database version**: Select a database versión to install.
**PDB name Optional**: Put a PDB name.

{{<img src="Picture19.png" title="" alt="">}}

<br>
<br/>

**Create administrator credentials**: Create new credentials.

{{<img src="Picture20.png" title="" alt="">}}

<br>
<br/>

**Select workload type**: Enter the workload type.

{{<img src="Picture21.png" title="" alt="">}}

<br>
<br/>

**Configure database backups**: If you want to configure the database, select the checkbox.

{{<img src="Picture22.png" title="" alt="">}}

<br>
<br/>

And finally, click **Create DB System**.

### Conclusion

The database service enables you to create autonomous and user-managed Oracle Database
cloud solutions. You can create a database in a short time. If you don't want the headache
of managing the hardware or datacenter, OCI provides this type of facility.  DBaaS offers
full access to the available database features and operations, where Oracle owns and manages
the infrastructure.

<a class="cta teal" id="cta" href="https://www.rackspace.com/data">Learn more about our Data services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Let's Talk** to [start the conversation](https://www.rackspace.com/).

