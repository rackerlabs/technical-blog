---
layout: post
title: "Configure Oracle E-Business Suite Integrated SOA Gateway for REST Services"
date: 2023-01-13
comments: true
author: Suryakanta Sahu
authorAvatar: 'https://secure.gravatar.com/avatar/bfb0463042a656ef9602cc40ffe9993c'
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
    - Security
metaTitle: "Configure Oracle E-Business Suite Integrated SOA Gateway for REST Services"
metaDescription: "If we are planning to use Rest Services provided by Integrated SOA Gateway (ISG), the first step is to ensure that our EBS instance is configured to use it. The prerequisite is that we should know the E-Business Suite concepts, Patching and backend components"
ogTitle: "Configure Oracle E-Business Suite Integrated SOA Gateway for REST Services"
ogDescription: "If we are planning to use Rest Services provided by Integrated SOA Gateway (ISG), the first step is to ensure that our EBS instance is configured to use it. The prerequisite is that we should know the E-Business Suite concepts, Patching and backend components"
slug: "configure-oracle-e-business-suite-integrated-soa-gateway-for-rests-services"

---

If we are planning to use Rest Services provided by Integrated SOA Gateway (ISG), the first step is to ensure that our EBS instance is configured to use it. The prerequisite is that we should know the E-Business Suite concepts, Patching and backend components
<!--more-->

#### Introduction
For Oracle E-Business Suite 12.2, follow "Configuring Oracle E Business Suite rest Services" from Document “Oracle support 1311068.1”

Steps to follow to apply AD TXK Patches along with ISG Patch: Run ISG Setup Script and verify the result.

Before we discuss details about the EBS Steps, let’s go through the REST API and RESTFUL API Concepts.

#### REST API

REST represent “Representational State Transfer” and API represent  “Application Programming Interface”. So, REST API is a software that  two applications use to communicate happens with each other over the internet and various devices. This means with the help of API, two applications can communicate, and information can be shared over the internet. Whenever we access any app or check weather on a smartphone, an API is used.

<img src=Picture1.png title="" alt="">

[image source](https://www.youtube.com/watch?v=ALrOcDPimWE)

#### RESTFUL   API

A Restful API is the architectural style for application programming interface (API) that uses HTTP requests to access  and user data. REST is not a programming language.

Before RESTFUL, how Client Server Communicate happens is shown in the picture below. If we are accessing anything like www.example.com, the client requests the server and finally server sends response to the client.

<img src=Picture2.png title="" alt="">

[image source](https://www.youtube.com/watch?v=ALrOcDPimWE)

Now with the help of **RESTFUL API**, the client will not send request directly to the server, it will first send to RESTFUL API in the form of GET, POST, PUT,DELETE , then the RESTFUL API will send a request to the server, and finally server will send the response in the form of JSON/XML format.

<img src=Picture3.png title="" alt="">

[image source](https://www.youtube.com/watch?v=ALrOcDPimWE)

We can perform *CRUD* operations through Restful API.

- C means -> Create -> POST
- R  means-> Read    -> GET
- U  means->Update -> PUT
- D  means-> Delete -> DELETE

RESTFUL API is stateless, meaning that the server doesn’t store any state for the the client session on the server side. All HTTP requests happen in complete isolation. When the client makes an HTTP request, it includes all the information necessary for server to fulfill the request.

**Oracle E-Business Suite Integrated SOA Gateway REST Services in a Multi-node Environment:**

To provide high availability of Oracle E-Business Suite REST Services, Oracle E-Business Suite ISG recommends multiple nodes of an EBS environment. The below diagram represents a high-level architecture for Oracle EBS REST Services in a multimode environment.

Here, web or Rest clients are accessing applications through a load balancer running on Oracle EBS application Server 1 and 2.

<img src=Picture4.png title="" alt="">

[image source](https://support.oracle.com/epmos/faces/DocumentDisplay?_afrLoop=391081515996825&id=1311068.1&_adf.ctrl-state=11dkq7u8kk_56)

#### Configuring Oracle E-Business Suite REST Services:

- For Oracle E-Business Suite 12.2, refer "Configuring E Business Suite RESTServices" section, refer Document “Oracle  1311068.1”

- The configuration tasks required for setting up Oracle E-Business Suite web services is available through Oracle E-Business Suite ISG.

- We should have E Business Suite instance that is the latest AD TXK Delta level and recommended technology patches in place

- As per Oracle Document 1617461.1, Apply Latest AD and TXK Release Update Packs to Business Suite Release 12.2

- Refer Document 1594274.1, Oracle E-Business Suite Release 12.2: Consolidated List of Patches and Technology for applying CPU Patches and FMW.

- We should apply consolidated Patch 33168402  Patch for Release 12.2 (21_4_3)  , to your instance if it has not already been applied.

**Steps to configure Integrated SOA Gateway for Rest Services:**

Run   $FND_TOP/patch/115/bin/ISGRestSetup.pl for configure Business Suite SOA Gateway for REST Service 

This script will ask for apps and WebLogic password

Output will be as below

*Successfully updated ISG Admin in database*
*Running script for configuring Oracle E-Business Suite Integrated SOA Gateway for REST Services. This may take few minutes, please wait...*

*Successfully executed techstack script for REST setup*
*Configuration script completed successfully. For more information check the logs.*

 The above script creates  the data source and deploys the data source "ISGDatasource" on the Oracle Business Suite webLogic Admin server and oafm_cluster1 server 

**Script output**
```
-bash-4.1$ perl $FND_TOP/patch/115/bin/ISGRestSetup.pl
Enter the password for APPS user: 
Enter Oracle E  Business Suite's weblogic Server Admin User Name : [weblogic] 

Enter the password for WebLogic user: 
Configuring Oracle E  Business Suite Integrated SOA Gateway  rest services. 
```
Please wait as this will take a few minutes
 Log file for each step is located at /home/test 

*Successfully verified database connection*

Successfully updated ISG Admin in database
Running script for configuring Oracle E-Business Suite Integrated SOA Gateway for REST Services. This may take few minutes, please wait...

Successfully executed techstack script for REST setup
Configuration script completed successfully. For more information check the logs located at /home/test 

```
-bash-4.1$ pwd
/home/test
-bash-4.1$ ls -ltr|tail -n 2
-rw-r--r--  1 test oinstall    246 Oct  9 01:08 ISGAdmin.log
-rw-r--r--  1 test oinstall  13792 Oct  9 01:15 txkScript.log
-bash-4.1$ tail -f txkScript.log
     [exec]
     [exec] adstrtal.sh: check the logfile /u01/app01/fs1/inst/apps/TEST_TEST/app/logs/appl/admin/log/adstrtal.log for more information ...
     [exec]

executeadstrtalWindows:

ebsSetup:

BUILD SUCCESSFUL
Total time: 7 minutes 38 seconds
```

**Weblogic Console Output**
<img src=Picture5.png title="" alt="">
<img src=Picture6.png title="" alt="">

**Validate the Oracle E-Business Suite Integrated SOA Gateway setup using an Ant script:**

After completing the setup tasks for REST services, We can perform the validation using backend ant script

```
-bash-4.1$ cd $JAVA_TOP/oracle/apps/fnd/isg/ant
-bash-4.1$ ant -f $JAVA_TOP/oracle/apps/fnd/isg/ant/isgDesigner.xml -Dfile=$JAVA_TOP/oracle/apps/fnd/isg/ant/isg_service.xml -Dverbose=OFF
```
```
 [java] Operation status : Success
     [java] CREATE on grant successful for JAVA:oracle.apps.fnd.wf.bes.EventManager:deleteSubscription:1

design-isg:

BUILD SUCCESSFUL
Total time: 17 seconds
-bash-4.1$
```

**Access URL in a web browser:**
Check URL -  http(s)://application host name:port/webservices/rest/provider/isActive/

Provide sysadmin username and password

<img src=Picture7.png title="" alt="">


#### Conclusion

EBusiness Suite integrated SOA Gateway provides the functionality to expose integration interfaces published in the integration repository as a rest-based web service.
Oracle E Business Suite integrated SOA Gateway is supplied as part of Oracle E Business Suite. We need configure it to use the rest Service.
 
<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/oracle"> Learn about Rackspace Managed Oracle Services.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).