---
layout: post
title: "Performance Issue with Concurrent Managers in E-Business Suite"
date: 2022-01-27
comments: true
author: Dilip Singh 
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - General
    - Oracle
metaTitle: "IPerformance Issue with Concurrent Managers in E-Business Suite"
metaDescription: "With the introduction of a new business process in ERP system, we may have a serious performance bottleneck not at the application server level but at the Concurrent Managers level. This is due to sudden influx of concurrent requests , there can be several complaints from the business users on concurrent requests have issue of slowness not complete in time with delay more than 2-3 hrs as well.  "
ogTitle: "Performance Issue with Concurrent Managers in E-Business Suite"
ogDescription: "With the introduction of a new business process in ERP system, we may have a serious performance bottleneck not at the application server level but at the Concurrent Managers level. This is due to sudden influx of concurrent requests , there can be several complaints from the business users on concurrent requests have issue of slowness not complete in time with delay more than 2-3 hrs as well. "
slug: "performance-issue-with-concurrent-managers-in-e-business-suite"

---
### Objective

Improve the performance and make it appear real time. Post process completion on the ERP system business concurrent requests have no issue and complete on time also concurrent output reflect in the system immediately.

<!--more-->

### Approach/Steps:
We can approach this performance issue in multiple ways.


#### Solution 1:  Run E-Business Suite Concurrent Processing Analyzer ( CP Analyzer ) manually.


a.	Download ( CP Analyzer ) (Doc ID 1411723.1).

b.	 Install the EBS Concurrent Processing Analyzer by running cp_analyzer.sql as APPS to create the package definition.
This is required for the first time the analyzer is installed, and each time you download a new version of the analyzer.
sqlplus apps/<apps_password>
SQL> @cp_analyzer.sql

c. Review the output file to determine if any issues requiring action have been found.

d. If issues are identified, the output file will provide the action to be taken, note and bug numbers to resolve the issues for the affected transactions when they are available.


#### Solution 2: A high degree of CPU and memory are being consumed by Concurrent Managers 

Manually terminate scheduled requests submitted by end dated users. You can use the following SQL commands to find out the end-dated user’s scheduled request submission.
`select fcr.REQUEST_ID,fu.USER_NAME`
`from fnd_concurrent_requests fcr,`


`     fnd_user fu`

`where fcr.REQUESTED_BY = fu.USER_ID`

`and fcr.PHASE_CODE <> 'C'`

`and fcr.REQUESTED_BY in`

`      (select fui.user_id`

`         from fnd_user fui`

`        where nvl(fui.END_DATE, sysdate) < sysdate ) ;`

#### Solution 3: Waiting for “enq: tx row contention” caused Performance issues, being help by ICM
a. Please download and review the readme of Patch 14532468 - `HIGH ENQ: TX - ROW LOCK` 
`CONTENTION ON FND_CONCURRENT_PROCESSES`

b. Make sure that a backup of your system has been taken before the recommended patch 
is applied.

c. In a test environment, apply the patch

d. Confirm the following file versions:

`afpgmg.o     120.3.12010000.7`

   You can use the commands like the following:
`$strings -a $FND_TOP/bin/FNDLIBR|grep 'Header'|egrep 'afpgmg'`

e. Retest the issue.

f. If this step resolves the issue, migrate the solution as applicable to other environments


#### Solution 4: Performance: Concurrent Requests Hang in Pending Standby Status For Long Time

<img src=Picture3.png title="" alt="">

a. Please download and review the readme of Patch 16559469 (for 12.1.3 )

b. Ensure that a backup of the system has been properly taken prior to the application of the recommended patch. 

c. Apply the patch in a non-production environment.
d. Confirm the following file versions: 

`AFCPCRMB.pls 120.1.12010000.2`

`AFCPCRMS.pls 120.1.12010000.1`

`afpbwv.lpc 120.2.12010000.4`

`afpcrm.oc 120.7.12010000.8`

You can use the commands like the following:
`strings -a $FND_TOP/bin/FNDLIBR|grep 'Header'|egrep 'afpbwv'`

`strings -a $FND_TOP/bin/FNDCRM |grep 'Header'|egrep 'afpcrm'`

`strings -a $FND_TOP/patch/115/sql/AFCPCRMB.pls | grep Header`

`strings -a $FND_TOP/patch/115/sql/AFCPCRMS.pls | grep Header`

e. Retest the issue.

f. If the issue is resolved, Migrate the solution as appropriate to other environment

#### Step 3: In our case, we are using a database backup file instead of a snapshot so we will leave them blank and click on next, as shown in the following snapshot.


You can increase the acceleration of new features and products to market by using
GitOps practices, processes, and tools. This enables engineering teams to automate
deployments, enabling faster release rates to help gain quick customer feedback
and improve customer satisfaction.

#### Solution 5: Generic Tips

a) Sleep Seconds -  A manager is in sleep mode when there is no running jobs in the queue and comprises the number of seconds your Concurrent manager pauses between checking the list of pending concurrent requests (concurrent requests which are waiting to be started). 

_Tip: At peak performance times, when the request volume is expected to be high, the sleep time requires to be set to a reasonable wait time, e.g. 30 seconds, relies on the average run time. This helps create reduced backlog. Else, the sleep time needs be set to a higher number, e.g. 2 minutes. Constant polls to check new requests can be avoided this way_

b) Increase the cache size (number of requests cached). This value must be at least double the number of processes that are targeted.
If a manager's work shift has 1 target process, for example, and the value of its cache is 3, three requests will be read, and you need to run those  requests prior to reading any new requests that are new.
_Tip:1 is the preferred value when defining a manager that runs long, time-consuming jobs, while 3 or 4 is the preferred value for managers that run small, quick jobs._

Consider this only a guidance. Tuning the cache requires balance. Therefore, with jobs that are fast, enough cache is required for a job that’s around a few minutes. With regards to jobs that are slow, a small queue is helpful in the event that reprioritizing requests is required_

c) For maximizing throughput, its is recommended to decrease the Conflict Resolution Manager’s sleep time. While the default value is 60 seconds, 5 or 10 seconds are suggested values

d) Avoid enabling an excessive number of standard or specialized managers. It can degrade the performance. This is usually because of polling on queue tables (FND_CONCURRENT_REQUESTS...). 
Specialized managers must be created only if there is a real need

e) The system’s profile option named “Concurrent: Force Local Output File Mode” must be set to “Yes” as per the requirement. Patch 7530490 for R12 /Patch 7834670 for 11i are required to get this profile.

Refer to Note 822368.1 - 'Purge Concurrent Request `FNDCPPUR` Does Not Delete Files From File System or Slow performance'.

_Note:- The profile "Concurrent: Force Local Output File Mode" option is , by default, set to "No"._ 
Post the application of this patch, its required to set the profile option to YES. This will cause `FNDCPPUR` to remove local files faster. 

This enabling of this feature is possible with all Concurrent Manager Nodes to be able to access the local file output within the use of the local filesystem
Post application of this the patch, set the profile option to YES. In this way, `FNDCPPUR` will always be able to access the files on the local file system. Therefore, with `FNDCPPUR`, the OS files will be removed quicker. The activation of this feature is possible by ensuring that all Concurrent Manager nodes are able to access the locations of the output files via the local file system.

f) In the next step. The reports.log file in the log directory need to  be truncated. Refer to Note 844976.1 for more details.

Truncating the “reports.log” is a part of the regular maintenance jobs performed by an Application Database Administrator. It should be ensured that the size of the reports log no exceed its maximum 2 GB limit. 

There is no limit to purging the program to ensure that the file “reports.log” is truncated. This maintenance is to be manually completed and also on a regular basis, and depends on the number of concurrent programs which uses “reports.log”. “reports.log” can be safely truncated.

The location of the "reports.log" file is under `$APPLCSF/$APPLLOG.`

g) Run ‘Purge Concurrent Requests and/or Manager Data, `FNDCPPUR` is run at intervals regularly with “Entity” parameters as “ALL”. If the number of records in FND_CONCURRENT is high, performance may be degraded. 
In addition to the above, the below mentioned practices are good methods for process optimization:

Ensure that the job is run in hours when the workload is low. Working on this post hours will reduce the contention on the tables from running against your daily processing.

Run the `FNDCPPUR` with Age=20 or Age=18 for good results from the process. This means the purging of all all requests older than 18 or 20 days being purged.
Upon gaining control over the requests, the `FNDCPPUR` aged=7 is to be run. This ensures that the process remains efficient. However, this is dependent on the processing level at your site. 
h) It must be ensured that the log/out files are deleted from the locations as mentioned below in the event that you run “Purge Concurrent Requests and/or Manager Data Program”

`$APPLCSF/$APPLLOG`
` $APPLCSF/$APPLOUT`

If log/out files are not removed, performance will become slow and sluggish over a period of time, which will slow down the performance. Refer to the below mentioned note which recommends that the patch which fixes it. 

_Note 822368.1 - 'Purge Concurrent Request `FNDCPPUR` Does Not Delete Files From File System or Slow performance'._

_Note 1616827.1  Managing Concurrent Manager Log and Out Directories_ 

10) Defragment the tables periodically to reclaim unused space / improve performance.  
`FND_CONCURRENT_REQUESTS`

`FND_CONCURRENT_PROCESSES`

`FND_CRM_HISTORY`

`FND_ENV_CONTEXT`

`FND_TEMP_FILES`

`FND_CONFLICTS_DOMAIN`

#### Test whether performance is improved

#### Reference Metalink note ids:-

_Note 1075684.1 - 'Concurrent Managers are consuming high CPU and memory ‘Concurrent Processing - Best Practices for Performance for Concurrent Managers in E-Business Suite (Doc ID 1057802.1)_

_Note 1541526.1 - 'Performance: Concurrent Requests Hang in Pending Standby Status For Long Time_




<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/oracle"> Learn about Rackspace Managed Oracle Applications.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
