---
layout: post
title: "Tips for using Oracle Business Intelligence Enterprise Edition: Part 1"
date: 2018-08-27
comments: true
author: Vignesh Kumar
published: true
authorIsRacker: false
categories:
    - General
---

Originally published by TriCore: August 2, 2016

In Part 1 of this two-part blog post series, we cover two issues that you
might run into while working with Oracle&reg; Business Intelligence Enterprise
Edition (OBIEE) and how to resolve them.

<!--more-->

### Introduction

The first topic we discuss in this post is how to increase the row limit in
OBIEE 12c. The second topic explains how to overcome a stuck thread issue in
OBIEE.

### Tip 1: Work around the row limit when exporting data

You may have gotten the message `OBIEE Maximum total number of cells
exceeded` while trying to export reports in Excel format. The error is
generated when you try to download more than 65,000 rows in comma-separated
value (CSV) format.

This is a known issue in OBIEE versions 12c and 11.1.1.9. While earlier
versions of OBIEE didn't limit the number of rows that you could
download when exporting to CSV format, newer versions have a default limit of
65,000 rows. However, you can get around this limit by adding a parameter named
`DefaultRowsDisplayedInDownloadCSV` to the `instanceconfig.xml` file.

The `instanceconfig.xml` file is the parameter file for the Oracle BI
Presentation Server. This file stores the configuration settings that affect
Oracle BI Presentation Services.

Use the following steps to add the parameter to the `instanceconfig.xml`
file:

1. Take a backup copy of the `instanceconfig.xml` file.

    In OBIEE 12c, this file is found at the following location:
    `\<obiee\_home\>/user_projects/domains/bi/config/fmwconfig/biconfig/OBIPS`

    In OBIEE 11g, this file is found at the following location:
    `\<obiee\_home\>/instances/instance1/config/OracleBIPresentationServicesComponent/coreapplication_obips1`

2. Open the `instanceconfig.xml` file for editing.

    The following image shows what the contents of the file look like before
    the parameter is added.

    ![A screenshot of the file before the parameter is
    added](picture1.png)

    Under `<Table>…</Table>`, add the parameter
    `DefaultRowsDisplayedInDownloadCSV`.

    The following image shows what the file looks like after the parameter is
    added.

    ![A screenshot of the file before the parameter is
    added](picture2.png)

3. Increase the value of the `DefaultRowsDisplayedInDownloadCSV` parameter to
   a number that will enable you to download the rows you need.
4. Save your changes.
5. Restart OBIEE services.

After you've completed these steps, you'll be able to export all of the data
you need.

### Tip 2: Addressing a stuck thread in OBIEE

You might also have encountered the warning message `ThreadPool has stuck
threads` while working with Oracle WebLogic.

Stuck threads are Java Virtual Machine (JVM) threads that have been running
for more than a certain configurable time. The default value is 600 seconds.
WebLogic Server automatically detects when a thread in an execute queue gets
stuck. Because a stuck thread cannot complete its current work or accept new
work, the server logs a message each time it diagnoses a stuck thread.
If all of the threads in an execute queue become stuck, the server changes its
health status to either Warning or Critical. As a result, when the number
of stuck threads increase your server might eventually crash.

You can work around a stuck thread by adjusting the values for **Stuck Thread
Max Time** and **Stuck Thread Timer Interval**.

The **Stuck Thread Max Time** is the number of seconds that a thread must
continuously work before it exceeds the configured limit, causing the
server to generate a stuck thread warning. For example, if you set the
value for this parameter to 600 seconds, WebLogic Server considers a thread
to be stuck after 600 seconds of continuous use.

The **Stuck Thread Timer Interval** is the number of seconds after which
WebLogic Server periodically scans threads to check if they've been
continually working for the configured maximum length of time.

Use the following steps to adjust these settings:

1. Navigate to the WebLogic Administration Console URL.
2. Select Environment [Symbol] Server.
3. Check the `bi_server1` where the **State** is **RUNNING** and the
   **Health** field has the value **Warning**.

    ![A screenshot of the list of servers with their states and health
    displayed](picture3.png)

4. In the **Reason** column, check the reason for the warning.

    ![A screenshot of the server list where the Reason column for bi_server1
    says "ThreadPool has stuck threads"](picture4.png)

    If the warning is because the thread pool has stuck threads,
    proceed to step 5.

5. Click `bi_server1`.

6. Select the **Configuration > Tuning** tab.
7. Scroll to the information on **Stuck Thread Max Time** and **Stuck Thread
   Timer Interval**.

    You should see the default values `600` and `60`, respectively.

    ![A screenshot of the Stuck Thread Max Time and Stuck Thread
    Timer Interval fields](picture5.png)

8. Under **Change Center**, click the **Lock & Edit** button.
9. Set the values for the **Stuck Thread Max Time** and **Stuck Thread
   Timer Interval** parameters to `2400`, as recommended by Oracle.

    ![A screenshot of the list of servers with their states and health
    displayed](picture6.png)

    The changes take effect after you redeploy the module or restart the
    server.

    **Note**: If this attribute configures a module that you deploy (such as an
    application or a Java Database Connectivity data source that is part of an
    application) or a system resource whose configuration is saved in a
    descriptor file instead of in the domain's **config.xml** file (such as a
    Java Database Connectivity data source that
    is scoped at the system level), the module or resource cannot process
    the change until you redeploy it or restart its host server. If the module
    is a component in an application, Oracle recommends that you redeploy the
    entire application to avoid complications due to intra-application
    dependencies.

    If this attribute configures some other part of the domain such as a
    server, cluster, or Enterprise JavaBeans (EJB) container, the system can't
    process the change until you restart the server or cluster.

### Conclusion

Following the steps outlined in this blog post helps you fix stuck thread
issues and avoid server crashes. You can also configure a Simple Network
Management Protocol (SNMP) alert that immediately sends you an email alert
when a thread becomes stuck in WebLogic.

In [Part 2](https://developer.rackspace.com/blog/obiee2/) of this series,
we'll show you how to customize the logo and banner text in the user interface.

Use the Feedback tab to make any comments or ask questions.

