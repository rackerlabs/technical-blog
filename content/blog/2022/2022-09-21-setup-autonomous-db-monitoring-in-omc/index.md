---
layout: post
title: "Setup Autonomous DB Monitoring in OMC"
date: 2022-09-22
comments: true
author: Venkata Gogineni
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - Databases
    - Oracle
metaTitle:"Setup Autonomous DB Monitoring in OMC"
metaDescription:"This Blog will show you, how to setup a Autonomous Database Monitoring in Oracle Management Cloud."
ogTitle:"Setup Autonomous DB Monitoring in OMC"
ogDescription:"This Blog will show you, how to setup a Autonomous Database Monitoring in Oracle Management Cloud."
slug:"setup-autonomous-db-monitoring-in-omc"

---

This Blog will show you, how to setup a Autonomous Database Monitoring in Oracle Management Cloud.

<!--more-->

### Introduction

First, From OCI console, You will need to seek OCI User Information which is associated with your Autonomous Database instance.
-	Login to OCI console and navigate On Right top corner and click on the user icon.
-	Now select user settings.
-	On the User Details page, make a copy of the User OCID and API Key Fingerprint and OCI Tenant Information.

<img src=Picture1.png title="" alt="">

You will need to seek OCI User Information which is associated with your Autonomous Database instance.

-	Navigate to Administration > Tenancy Details
-	On the Tenancy Information page, make a Copy of the Tenancy OCID

<img src=Picture2.png title="" alt="">

Launch the OMC Console.

<img src=Picture3.png title="" alt="">

-	Select Administration
-	Select Discovery
-	Select Cloud Discovery Profile

<img src=Picture4.png title="" alt="">

Click on "Add Profile"

<img src=Picture5.png title="" alt="">

<img src=Picture6.png title="" alt="">

<img src=Picture7.png title="" alt="">

`C:\Users\kond1394>docker pull ismaleiva90/weblogic12`

 - 2. **To start the docker machine with 7001, 7002 and 5556 ports opened:**

`docker run -d -p 49163:7001 -p 49164:7002 -p 49165:5556 ismaleiva90/weblogic12:latest`

<img src=Picture8.png title="" alt="">


### Conclusion:
Please wait for discovery to complete. 
We have completed the setup and now we are ready to monitor and manage Autonomous DB in OMC.
This blog post described how you can setup Autonomous DB Monitoring in Oracle Management Cloud (OMC).



<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).