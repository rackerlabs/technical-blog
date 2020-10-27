---
layout: post
title: "Stretch Database&mdash;Get an understanding"
date: 2020-10-28
comments: true
author: Vashali Misra
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-U7D5AHGAU-bbe8d4bb28c6-512'
bio: "I am a SQL Server DBA at Rackspace Technology APJ Region. My area of expertise is
SQL Server, and I'm slowly and steadily gaining experience into the cloud technologies. I
have 9 Years of experience with major projects like Dowjones, MarketWatch, Regeneron, etc."
published: true
authorIsRacker: true
categories:
    - Database
    - Azure
metaTitle: "Stretch Database&mdash;Get an understanding"
metaDescription: "Hello, everyone. I am here with a very simple but great topic that helps
improve our database (DB) in a few ways&mdash;Stretch Database!"
ogTitle: "Stretch Database&mdash;Get an understanding"
ogDescription: "Hello, everyone. I am here with a very simple but great topic that helps
improve our database (DB) in a few ways&mdash;Stretch Database!"
slug: "stretch-database-get-an-understanding"

---

Hello, everyone. I am here with a very simple but great topic that helps improve our database
(DB) in a few ways&mdash;Stretch Database!! 

<!--more-->

So, let's get started.

### What is Stretch Database?

SQL 2016 introduced a feature that could help us stretch the data from on-premises to Azure
cloud.  This functionality, Stretch Database (or StretchDB), helps archive cold (infrequently
accessed) data from a local SQL Server&reg; to Azure&reg; while keeping warm (frequently
accessed) data on the local SQL Server. StretchDB is helpful in scenarios when we have lots
of historical data that is accessed rarely.


### Stretch DB is a boon

- Easy and hassle-free migration of cold data from on-premises to Azure SQL DB helps
  improve the performance of local queries, as they make use of warm data or local data most of the time
- No code needed for data migration, hence no extra overhead on local SQL Server 
- No need to change the application code to query the archived data
- Store archived data at a lower cost in Azure than locally
- Local DB backup, restore, and maintenance activities take much less time with archiving
  cold data because they now must play with only hot data

### Let's see how to use StretchDB

To demo StretchDB, we need:

- A local SQL Server
- An Azure subscription

I downloaded the **AdventureWorks2016_EXT.bak** DB backup and restored it on my local SQL
server for this demo. Download the file 
[here](https://docs.microsoft.com/en-us/sql/samples/adventureworks-install-configure?view=sql-server-ver15&tabs=ssms).

### Configure tables in StretchDB

1. Connect to your local SQL Server, right-click on
   **AdventureWorks2016_EXT**->**Tasks**->**Stretch**->**Enable**.

{{<img src="Picture1.png" title="" alt="">}}

<br>

2. Select the tables that are needed to be archived. The ones not supporting StretchDB
   display greyed out.

{{<img src="Picture2.png" title="" alt="">}}

<br>

3. When prompted, sign in to your Azure environment.

{{<img src="Picture3.png" title="" alt="">}}

<br>

4. After you sign in to your Azure account, select the subscription and region where you
   want to archive your data.

{{<img src="Picture4.png" title="" alt="">}}

<br>

5. Provide the password for DMK.

{{<img src="Picture5.png" title="" alt="">}}

<br>

6. Create an Azure firewall rule for communication.

{{<img src="Picture6.png" title="" alt="">}}

<br>

7. Review the summary and click **Finish**.

{{<img src="Picture7.png" title="" alt="">}}

<br>

8. On successful completion, the following screen displays. We can also check the generated
   logs for details.

{{<img src="Picture8.png" title="" alt="">}}

<br>
 
9. Now, let's verify the data migrated to Azure SQL DBs. Connect to Azure SQL DB from your
   local SSMS like any other SQL Server. Be sure to save the credentials you created for
   the Azure SQL DB in Step 4 because you'll use them for the connection.

{{<img src="Picture9.png" title="" alt="">}}

<br>

The following image shows the table we created:

{{<img src="Picture10.png" title="" alt="">}}

<br>
 
### Conclusion 
 
By following these very simple steps, we can gain performance improvement as well as cost
efficiency.

Let me know in the comments how you liked this post and if you want to see a second part
with more details.

<a class="cta teal" id="cta" href="https://www.rackspace.com/professional-services/data">Learn more about Rackspace Data Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
