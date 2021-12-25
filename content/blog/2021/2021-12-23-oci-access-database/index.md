---
layout: post
title: "Create/Connect Database in OCI on Public Subnet"
date: 2021-12-23
comments: true
author: Ravishekhar Yelemane
authorAvatar: 'https://secure.gravatar.com/avatar/1d5246c5ac05e979d88dc05ae240a30b'
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
    - Database
metaTitle: "Create/Connect Database in OCI on Public Subnet"
metaDescription: "This blog covers the steps involved in Configuring a Database in Oracle Cloud Interface."
ogTitle: "Create/Connect Database in OCI on Public Subnet"
ogDescription: "This blog covers the steps involved in Configuring a Database in Oracle Cloud Interface. "
slug: "create-connect-database-in-oci-on-public-subnet"

---

By following the steps outlined in this blog, you will be able to configure a Database in Oracle Cloud Interface.

<!--more-->

### Introduction 

The steps in the entire process can comprise the following: 
1.	Generating SSH Keys Pairs In OCI
2.	Create Database in Public Subnet
3.	Connect to VM DB system.

### Pre-Requisites
Considering that the following pre-requisites are already in place: 
-	Oracle Cloud Account (Free Trial/Paid Version)
-	The Network Configuration for Virtual Machine (VM)/ Bare Metal (BM) should be configured
-	Public Subnet
-	Security List & Open Port 22 & 1521
-	Internet Gateway
-   Route Table

#### Let us begin by generating SSH key pairs in OCI:

### Section 1: Generating SSH Key Pairs in OCI

<img src=Picture1.png title="" alt="">

_https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/creatingkeys.htm_


Open WinSCP & Click on Tools -> Run PuTTYgen

<img src=Picture2.png title="" alt="">

<img src=Picture3.png title="" alt="">


1. To generate the private & public keys, Click on Generate and move over the mouse around the blank area in the box as shown above: 

2. Key gets generated, as shown in following screenshot

3. Click on Save private key to in your local system. 
Add the key passphrase (Password) and re-enter it again to confirm passphrase. 

4. For public key, copy the Key content in a file on your local system which is shown in the following snippet. Sometimes it is required in case of any issue in accepting public key file. 

5. Copied key content of public key can be used in such cases. 
Then click on Save Public Key to save the file in the same location where private key was stored in step 3.

_Note: Public key format starts with ssh-rsa & end with rsa-key-20211015_ 

<img src=Picture4.png title="" alt="">


6. Save public key with .pub & private key with.ppk extension

7. After generating and saving both the keys, you can go back to the Cloud Portal.

### Section 2: Create Database in Public Subnet

This section involves steps in creating an Oracle Database in Public Subnet on OCI. 
Login to OCI console with your tenant.  Here ohravi is the Tenant I already created.  
So below is the URL
   _https://cloud.oracle.com/?tenant=ohravi_

Select the links which are highlighted in Box as per below snippet

<img src=Picture5.png title="" alt="">

Select the AD & shape as VM with standard shape as per below snippet on the options available

<img src=Picture6.png title="" alt="">

Select the highlighted/indicated in Box as per below snippet on the options available while configuring the DB system

<img src=Picture7.png title="" alt="">

#### SSH PUBLIC KEY: 
Paste your Public key created earlier in Section 1 point 5 as shown in the following screenshot

<img src=Picture8.png title="" alt="">

Select a name for the VCN, I have used as POC_VCN & the subnet.

<img src=Picture9.png title="" alt="">

Provide a database name here. I am using POC & 19c in my example.

<img src=Picture10.png title="" alt="">

Select create DB system option as indicated in the following snippet

<img src=Picture11.png title="" alt="">

It takes 50-60 minutes to keep the instance Up & Running.

When the DB creation is done, the status changes from Provisioning to Available as shown in the following snapshot. 

<img src=Picture12.png title="" alt="">

### Section 3: Connect to VM DB System which was created in previous steps

Login to the OCI Console, & navigate to Database Section select database POC_Ravi

<img src=Picture13.png title="" alt="">


When you click on pocDB above, next page will show the Public IP address as per the following snippet.
Use that IP address in connection as the Host Name in the next step

<img src=Picture14.png title="" alt="">


Open _putty_ 
1. Enter the following 

- Host Name (or IP Address): Enter opc@Public IP of your instance 

- Port: Enter 22 

- Connection type: Select SSH

<img src=Picture15.png title="" alt="">


Now, expand _SSH_ and select _Auth_ and browse your _private key_ and click _open_. 


<img src=Picture16.png title="" alt="">

Click on _Open_

<img src=Picture17.png title="" alt="">

Switch to Oracle user to connect with the _SQLPLUS_ 

<img src=Picture18.png title="" alt="">





<img src=Picture19.png title="" alt="">

### Conclusion
The blog explains the basic steps on configuring a Database on the Public subnet along with SSH Keys generation. Also, the above explained steps help connecting to the Database using the SSH keys which are essential for an Oracle Cloud DBA’s routine activity.


<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/oracle">Learn about Rackspace Managed Oracle Applications.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
