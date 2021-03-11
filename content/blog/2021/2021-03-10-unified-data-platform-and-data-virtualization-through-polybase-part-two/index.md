---
layout: post
title: "Unified data platform and data virtualization through PolyBase: Part One"
date: 2021-03-10
comments: true

published: true
authorIsRacker: true
categories:
    - database
    - SQL Server
    - Azure
metaTitle: "Unified data platform and data virtualization through PolyBase: Part One"
metaDescription: "In this series, I dig deep into how to achieve data virtualization through PolyBase&reg;.
This post covers the introduction and demo prerequisites."
ogTitle: "Unified data platform and data virtualization through PolyBase: Part One"
ogDescription: "In this series, I dig deep into how to achieve data virtualization through PolyBase&reg;.
This post covers the introduction and demo prerequisites."
slug: "unified-data-platform-and-data-virtualization-through-polybase-part-one"

---

I am excited to finally build on my earlier blog post 
[Unified Data Platform - SQL 2019](https://docs.rackspace.com/blog/unified-data-platform-sql-server-2019/).

In this series, I dig deep into how to achieve data virtualization through PolyBase&reg;.
This post covers the introduction and demo prerequisites, and 
[Part Two](https://docs.rackspace.com/blog/unified-data-platform-and-data-virtualization-through-polybase-part-two/)
gets to the demo itself.

<!--more-->

### Recap

To refresh your memory, recall that the previous post covered the following items:

1. Evolution of SQL Server&reg; from DB Engine to the Unified Data Platform
2. SQL 2019 presents Unified Data Platform using:  
   - SQL DB Engine for OLTP
   - Data Virtualization through Polybase
   - Data Mart through Columnar store
   - Data Lake through HDFS
   - Big Data, ML, Streaming through Apache Spark
3. Management and Monitoring using Azure&reg; Data Studio (ADS)

### Introduction

With data being omnipresent, we continuously face challenges to move or copy it to another
location to process it further. With a small data set, this is easy enough, but it can be
a problem with ever-increasing data sizes. Also, with the progressive augmentation of data
mining by organizations, data leaders do not advocate keeping data in one place. Likewise,
it can be tedious to fetch or use data from different data stores of structured and
unstructured data and Big Data.

*Data virtualization* is the solution to this problem. 

### What is data virtualization?

Data virtualization is an approach to data management that enables an application to
retrieve and manipulate data without requiring technical details about the data, such as
how it is formatted at the source or physically located. It can provide a single customer
view of the overall data.

There are a lot of Data Virtualization tools present in the market, such as the following
tools:

- Microsoft&reg; Polybase&reg;
- Actifio&reg; Virtual Data Pipe (VDP)
- Informatica&reg; Powercenter
- IBM&reg; Cloud Pak for Data
- RedHat&reg; JBoss Data Virtualization

For this series, I focus on PolyBase, which Microsoft introduced in SQL 2016 and has
improved with each subsequent SQL version.

Polybase enables SQL Server to run Transact-SQL queries on external data sources like
Azure&reg; Blob, Hadoop&reg;, Oracle&reg;, MongoDB&reg;, and so on.  The same Transact-SQL
used to process external data can also run on relational databases. This ability helps to
integrate data from external sources with relational data in your database. The following
image shows a simple illustration of SQL Polybase:

{{<img src="Picture1.png" title="" alt="">}}

*Figure 1*
 
<br/>

Now that you know the basics of Polybase, I want to share a demo that fetches data from an
Azure blob external source by using SQL PolyBase. This post covers the prerequisites for
the demo.

### Demo prerequisites

Before you can run the demo, you need to perform the following prerequisite tasks:

1. Install SQL 2016 or later with the PolyBase feature.
2. Enable PolyBase on SQL Server.
3. Create an Azure Storage account.
4. Create an Azure blob container.
5. Place a data file in the blob container.

##### 1. Install SQL Polybase 
  
You can install Polybase with only one SQL instance on a machine.

Currently, I have one default SQL 2019 instance running on my local machine. However, I
did not select Polybase during installation.  The following image shows the SQL Server
configuration manager:

{{<img src="Picture2.png" title="" alt="">}}  

*Figure 2*
 
<br/>

I had to re-run the SQL setup and select the following elements during the feature selection
window to install Polybase:

- PolyBase Query Service for external data
- Java Connector for HDFS data sources

Go ahead and run the SQL Setup and perform the following steps to install the PolyBase
feature. Keep clicking **Next** till you reach the very last screen.  Then, click the
**Finish Installation** tab, selecting the tabs highlighted in dark red.

1. Click **Installation** in the sidebar and select
   **New SQL Server Stand-alone installation or add features to an existing installation**.

{{<img src="Picture3.png" title="" alt="">}}
  
*Figure 3*
 
<br/>

2. After you reach the **Installation Type** window, select **Add features to an existing instance**,
   and select the required instance from the drop-down menu.

{{<img src="Picture4.png" title="" alt="">}}

*Figure 4*
 
<br/>

3. After you reach the **Feature Selection** window, select the PolyBase features.

{{<img src="Picture5.png" title="" alt="">}}
  
*Figure 5*
 
<br/>

4. In the **Polybase Configuration** window, select
   **Use this SQL Server as standalone Polybase-enabled instance**.

{{<img src="Picture6.png" title="" alt="">}}

*Figure 6*
 
<br/>

5. For the rest of the sidebar options, select the defaults and click **Install**. After
   the insyallation completes, the folloiwng window displays:

{{<img src="Picture7.png" title="" alt="">}}
  
*Figure 7*
 
<br/>

At this point, you can see in the SQL configuration manager that we have two more features
installed. However, you might still get the error message *Polybase not installed in SSMS*
while trying to enable Polybase. To fix this, restart the server after installing Polybase. 

{{<img src="Picture8.png" title="" alt="">}}
  
*Figure 8*
 
<br/>

##### 2. Enable SQL Polybase 

To enable PolyBase, run the following steps:

1. Connect to SQL Server in SSMS and run the following query to confirm that Polybase
   installed successfully. 

        SELECT SERVERPROPERTY ('IsPolyBaseInstalled') AS IsSuccessfullyInstalled;

   The following image shows the output for a successful installation:

{{<img src="Picture9.png" title="" alt="">}}
 
<br/>

*Figure 9*

2. Enable Polybase by running the following queries:

        EXEC sp_configure 'polybase enabled', 1;
        Go

3. Run the following query:

        Reconfigure

   This query is important. Without this step, errors can appear during external file
   format creation in the steps covered in Part Three of this series.

{{<img src="Picture10.png" title="" alt="">}}

*Figure 10*
 
<br/>

##### 3. Create an Azure Storage account

Perform the following steps to create an Azure Storage account:

1. Log in to the Azure Portal by using your credentials.

2. Search for the Azure Storage account service and perform the following steps to create
   the storage account. Keep clicking **Next** till you reach the very last screen. Then,
   click the **Review and Create** option. Select the tabs highlighted in dark red.

3. On the **Azure Portal search bar**, select **Azure Storage account** and click **+ Add**
   to create a new storage account.

 {{<img src="Picture11.png" title="" alt="">}}

 *Figure 11*
 
<br/>

4. On the **Basics** tab, enter the required details and click **Next: Networking**.

 {{<img src="Picture12.png" title="" alt="">}}
  
*Figure 12*
 
<br/>

5. Keep the default settings for the **Networking**, **Data Protection**, **Advanced**, and
   **Tags** screens.

6. Next, click **Review+Create** and, after the validation succeeds, click **Create Tab**
   to create the storage account, as shown in the following image:

 {{<img src="Picture13.png" title="" alt="">}}
   
<br/>

*Figure 13*

7. On successful deployment, click **Go To Resource**, which takes you to the created
   storage account.
 
 {{<img src="Picture14.png" title="" alt="">}}

*Figure 14*
 
<br/>


##### 4. Create an Azure container

To create an Azure container, go to the created Azure storage account, click on **Containers**
in the left pane, and then click on **+Container**.

 {{<img src="Picture15.png" title="" alt="">}}
  
*Figure 15*
 
<br/>


##### 5. Place a data file in the container

At this stage, create a text data file and upload it to the container.

1. Create a text file similar to the following file:

{{<img src="Picture16.png" title="" alt="">}}

*Figure 16*
  
<br/>

**Note**: You can also use CSV, Excel&reg;, or other external data sources. However,
depending on the external data source, you need to take a few additional steps. For example,
for CSV or Excel data sources, you should install proper drivers on the SQL Server and add
the connection properties to an ODBC data source name (DSN). You can use the Microsoft ODBC
Data Source Administrator to create and configure ODBC DSNs.


2. Go to the container you created, **polybasedemocontainer**,  click **Upload**, click the
   folder icon on the right,-hand side, and select the file to upload.

 {{<img src="Picture17.png" title="" alt="">}} 

*Figure 17*
 
<br/>

### Next step

You have successfully completed the prerequisites for the PolyBase demo.
[Part Two](https://docs.rackspace.com/blog/unified-data-platform-and-data-virtualization-through-polybase-part-two/)
presents the demo.

<a class="cta purple" id="cta" href="https://www.rackspace.com/data">Learn more about our Data services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Let's Talk** to [start the conversation](https://www.rackspace.com/).

