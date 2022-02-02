---
layout: post
title: "PeopleSoft Test Framework"
date: 2022-02-02
comments: true
author: Ankit Kumar
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
    - General 
metaTitle: "PeopleSoft Test Framework"
metaDescription: "The PeopleSoft Test Framework (PTF) is an automation tool delivered as a part of PeopleSoft application that can help in developing test scripts for critical business processes that reduces overall testing efforts and ensures that the work gets done quickly. Moreover, human errors can also be avoided for all the transactions done by system administrators, business analysts and developers during the testing phase. "
ogTitle: "PeopleSoft Test Framework"
ogDescription: "The PeopleSoft Test Framework (PTF) is an automation tool delivered as a part of PeopleSoft application that can help in developing test scripts for critical business processes that reduces overall testing efforts and ensures that the work gets done quickly. Moreover, human errors can also be avoided for all the transactions done by system administrators, business analysts and developers during the testing phase.  "
slug: "peoplesoft-test-framework"

---

The PeopleSoft Test Framework (PTF) is an automation tool delivered as a part of PeopleSoft application that can help in developing test scripts for critical business processes that reduces overall testing efforts and ensures that the work gets done quickly. Moreover, human errors can also be avoided for all the transactions done by system administrators, business analysts and developers during the testing phase. 

<!--more-->

### Document Overview
Rackspace is always on the lookout for new advanced features when released by Oracle. This is normally done by going through the new features training posted on Oracle universities, reading documentation, and getting hands dirty in a lab environment before proposing this to customers. This helps customers in leveraging new features and improves efficiency.

PTF was first introduced in PeopleTools 8.51 but with new advancements in technology, new features are have been added to the PTF framework that makes it a more powerful tool. Rackspace has been working with customers in installing/administering the PTF framework so that customers can develop/record the test cases for critical business transactions. Recorded test cases can be  executed a multiple times to test new code enhancements and features. It makes the SDLC process simpler and removes dependency on manual testing.

In this blog, I have covered about PeopleSoft Test Framework, benefits, and steps to configure/administer.

### UNDERSTANDING PEOPLESOFT TEST FRAMEWORK

With the introduction of PTF, all the critical business processes can be tested within a few clicks. The PTF tests cases are recorded by recording the transactions done through PIA in an environment and then replaying it multiple times during major/minor Go-lives to ensure that the functionality is working as expected. PeopleSoft administrators can also prepare the PTF jobs and schedule to run it daily to perform sanity checks of their environment to email reports for any abnormal behavior. This is helpful not only during patching but to perform daily health checks for your Production environment. Other than recording the transaction, PTF developer can provide the success and fail scenarios for every test case and perform many functions like taking screenshots, creating reports etc.

The PTF stores your test scripts into a repository database which should basically be a PeopleTools only database. One can use their development environment for holding the test cases or can create a standalone database that will store your test cases. As all the test scripts are stored in the PeopleSoft database as application designer objects. The following are two different ways of maintaining it:

_1.	Migrate the test scripts using application designer from DEV > TST > UAT > PROD and execute the reports._

_2.	Use a repository database and use it to connect to all the different environments and execute the test from that repository database only._

Test scripts once developed can be migrated to any environment and used for automating the testing efforts. Even during major upgrades, these test assets require minor modifications and helps in streamlining your testing efforts.

#### Features of PTF

-	Recording test scripts for the business transactions
-	Running test  scripts to reduce the testing effort and improve user productivity
-	Capture all the possible combinations for testing and avoiding human errors.
-	Use addExists and GetProperty actions for testing Fluid pages.
-	Reduction in overall testing time for below activities:
-	Daily health checks for Production environment to ensure 100% availability of critical components and sending out emails.
-	Pre/post health checks during any code migrations and Oracle provided fixes.
-	Testing new features, tax updates and legislative changes.
-	Testing enhancements delivered as part of PeopleSoft Update manager images.
-	Debuging and testing 3rd party integrations with PeopleSoft


#### PTF Benefits

-	Add to the business value and develop customer trust.
-	Bug free application releases and Go-Lives
-	Better resource utilization (man hours). 
-	Reduction in testing timelines.
-	Saves reports for comparison across environments
-	Structured format for all reports making it more presentable.
-	Automation of Health check scripts for PeopleSoft Administrators for environments sanity testing.

### INSTALLING AND CONFIGURING PTF
In this section, I have explained different components of PTF and how to install/configure it. 

#### Components of PTF

-	PTF Client
-	Internet Browser
-	Connectivity using Integration Broker Web services to PeopleSoft Application.

The diagram below explains the same

<img src=Picture1.png title="" alt="">


#### Configuring an Environment for PTF

One needs to complete the following tasks to configure an environment to run the PTF tests:

-	Make sure Integration Broker is setup and working properly. 
-	Make sure necessary roles and permissions are granted for recording and running test cases. 
-	Web Profile configuration as per PTF requirement. 
-	Define PTF Configuration Options. 
-	Dependency on SSL certificates


#### Verify Integration Broker Setup

-   Make sure the PeopleSoft Gateway is pinging to Success
- 	Default local node details are entered into Integration Broker configuration file and is pinging to Success.
-  Default User ID for the ANONYMOUS node should have atleast  one PTF User role

#### Setting Up Security

The users that need to run and record the test cases should have one of the following roles as per their job role: 

•	PTF User 

•	PTF Editor

•	PTF Administrator 



#### Configuring the Web Profile

-   Navigate to PeopleTools >Web Profile >Web Profile Configuration.
- 	Look for the web profile which is defined in configuration.properties file of your web server.
- 	Go to the Debugging tab.
-   Make sure that Show Connection & Sys Info  is checked as this enables PTF to record menu, component, and page metadata correctly.
-  Make sure that Generate HTML for Testing is checked as this enables  PTF to record HTML objects correctly

#### Define PTF Configuration Options

PTF configuration option can be defined from application by navigating to PeopleTools > Lifecycle Tools >Test Framework >Define Configuration Options. This page enables to: 

•	Specify execution options. 

•	Configure external command processing

#### Dependency on SSL certificates
 PTF requires SSL certificates to be installed on your Load balancer and web server for connecting with the target application.  If PeopleSoft environment does not have SSL certificates installed, login to PTF console will throw an error message that PTF does not allow unsecured connections. However, like any other config option, this can be overridden by PeopleSoft administrators by activating `PTTST_CONFIG_NO_SSL` web service to enable HTTP URLs to establish connection using PTF. You will still be displayed with a warning message, but this won’t stop you to login to PTF console.

_Following are the steps required to activate `PTTST_CONFIG_NO_SSL` web service:_

-	Navigate to PeopleTools >Integration Broker >Integration Setup >Service Operations.
-	Search for the Service operaiton `PTTST_CONFIG_NO_SSL.`
-	Create the routings by selecting `Regenerate Any-to-Local check box.`
-	Make sure to check “Active” check box and save the service operation.


### Different ways to install PTF Client
PTF can be installed using: 

•	PeopleTools DPK.

•	Silent mode using batch file.


#### Connection to PTF environment

•	When you click on PTF client, you can see below signon dialog.

•	Create a new environment using the New button and specify values for all the Fields.

<img src=Picture2.png title="" alt="">

### WORKING WITH PTF

#### Specify Execution Options using PTF Client

Execution options lets you define the default settings that the developed cases will use on execution against a target environment. These options can be defined for each environment and generally includes environment specific details like URL, Login credentials, browser details etc. PeopleSoft administrators can define the default execution option in PTF client, or this can be defined in the target database PIA under “Define Configuration Options”.

The following screenshot shows the settings that can be defined using a PTF client: 

<img src=Picture3.png title="" alt="">

#### Understanding PTF Explorer

PTF Explorer lets you access the test cases developed by you to enable you to manage and run against the target environment. You can establish the success and failure criteria for all your test cases.

<img src=Picture4.png title="" alt="">

#### PTF explorer can be used to perform below actions:

•	Create scripts for test scenarios

•	Segregate test scripts inside different folders.

•	Allows to Edit/Delete exisiting tests and folders.

•	Execute test against a target database.

#### Using the Test Editor

Test editor allows you to record a new test case or modify an existing one. You can add/delete/update your test scenarios using test editor, and can also run it to see if desired results are being achieved or not. 

#### Using the PTF Test Recorder

PTF recorder opens a browser window for the URL defined in the execution options and records all the user actions including the manual inputs as well on any search pages. Once the recording is done, developer can review the steps and modify those inputs. They can also add steps to Verify, Log, and Conditional to determine the Success/failure criteria for the test scenario.

Below image is for Test Recorder toolbar:

<img src=Picture5.png title="" alt="">

### ADMINISTERING PTF

This section discusses on the steps needed to administer the PTF environment.

#### Managing PTF Logs

PTF administrators needs to perform regular housekeeping for the log files generated as a part of test cases execution by development/testing team. 

To configure Log manager, Navigate to Tools > Log Manager 

<img src=Picture6.png title="" alt="">

#### Upgrading Tests

As mentioned earlier, PTF allows you to make minor modifications to existing test cases in case of PeopleTools upgrade. The PTF client stores the version of the PeopleTools which is used to record the test scripts. In case, you have opened the existing test cases on new tools version it prompts you to migrate this to a newer tools version by performing automated upgrade to the test cases.

#### Securing Test Folders Using Permissions

In order, to perform actions like add, update or delete, PeopleSoft Test Framework (PTF) users’ needs to have either of the following permission list assigned by the security specialist:

Permission | List |	 Role
______________________________
PTPT3400   |	PTF | Administrator
______________________________
PTPT3700   |	PTF  |Editor
______________________________
PTPT3600   |	PTF | User
______________________________


### Permissions on a Test folder

Above specified roles can be granted Read/Execute, Modify and Full Control on the different folders and specified actions can be performed by responsible individuals.

<img src=Picture7.png title="" alt="">

#### Migrating PTF Tests

From the above discussion, it is evident that all the test scripts created using PTF are Application designer managed object. Hence, this can undergo Object development lifecycle and can be easily migrated from one database to another using Application designer of any other supported migration tools like Phire, STAT etc.

Alternatively, the PTF test cases are stored in a repository database and executed against a target environment using the repository database. Only limitation with this approach is that `PSQUERY` will not run if those are part of your test cases. It means that `PSQUERY` needs to be migrated to all the environments wherever test cases making use of `PSQUERY` needs to be executed.

### Conclusion
As you can see PTF offers lot of options to carry out functional tests and tests once created in DEV can be used for unit testing, integration testing, SIT/UAT. Moreover, test cases once developed can be used in the future versions and application enhancements as well with minor modifications making the overall efforts for testing the application functionality as minimal. 





<a class="cta red" id="cta" href="https://www.rackspace.com/applications/oracle">Let our experts guide you on your Oracle Applications.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
