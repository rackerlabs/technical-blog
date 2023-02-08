---
layout: post
title: "MSSQL Server Performance Touchstone"
date: 2023-02-03
comments: true
author: Sachin Dehran
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - MS SQL
    - Dtabases
metaTitle: "MSSQL Server Performance Touchstone"
metaDescription: "This blog covers detailed information about the solution we have developed using a variety of software to assist the DBA team members to create quick graphical presentations of performance data collected from the performance monitor using following tasks:"
ogTitle: "MSSQL Server Performance Touchstone"
ogDescription: "This blog covers detailed information about the solution we have developed using a variety of software to assist DBA team members to create quick graphical presentations of performance data collected from the performance monitor using following tasks"
slug: "MSSQL Server Performance Touchstone"

---

This blog covers detailed information about the solution we have developed using a variety of software to assist DBA team members to create quick graphical presentations of performance data collected from the performance monitor using following tasks
<!--more-->

#### Introduction
-	Raw data collected in the form of a .blg file can be applied to an Excel sheet to process it in an automated way, and it will return detailed informational graphs for customer presentations.
- One of the most important tasks it performs, is returning the metric comparison in a detailed graphical format when we have data from two servers.


#### Why did we create this solution?

While handling multiple big projects in the past, during the migration and hardware planning of servers, there were frequent requests as listed below:

-	Resource Usage of MSSQL Servers
-	Comparison of performance and resource utilization of Two Servers
-	performance benchmarking while planning for migration, and many more. 
-	Present the data pattern in an easily understandable graphical format to the non-DBA and the management team, as well.


A Restful API is the architectural style for application programming interface (API) that uses HTTP requests to access  and user data. REST is not a programming language.

While working on such requests, we observed that it was a time-consuming process because each time we were creating a data collector set and processing it manually to get easily understandable graphs, and these challenges motivated us to work on a time-saving and smart solution.

#### WORKFLOW
<img src=PICTURE1.PNG title="" alt="">

**IMPORTANT FILES**

*Please refer attached zip folder for solution files at the end of this blog*
<img src=PICTURE2.PNG title="" alt="">

#### HIGH LEVEL STEPS

- **Step 1**: Create and Run Data Collector Set using standard Template.
- **Step 2**: Extract raw data from the a .blg file in CSV format.
- **Step 3**: Process the raw data from the csv file to the final xlsx sheet to return detailed graphs.

#### DETAILED STEPS

**Step 1: Create and run the data collector set using standard Template**
-	Login to the target server from which we want to collect performance data.
-	Open "Performance Monitor."
-	Create a new data collector set using the following flow (Ref.: Figure 1).
Expand "Data Collector Set" → Right-click on "User Defined" → From "New," click on "Data Collector Set."
-	On the "Create New Data Collector Set" window, enter the name of your data collector set, select "Create from a Templet (Recommended)," and click on "Next" (Figures 2 and 3).
-	From the browse option, select the data collector set templet and click on "Next." (Figures 1)

<img src=PICTURE3.PNG title="" alt="">
            Figure 1

**Important Points:** 

1. Please do not change the sample interval of data collection as it is already set to 5 minutes. Reducing it may increase the collected data volume, resulting in a more distorted graph if data collection lasts more than 4-5 days or a week.

2. Please do not change the sequence or edit list of performance counters from the standard templet or Excel sheet, as changing the sequence or count of existing counters may cause Excel to fail to process data correctly.

3. Currently, "stop at parameter" of data collector set in the templet is set to 1 week. which means data will be collected for 1 week, and the data collector set will be stopped automatically after 1 week. If you want to reduce it in days or hours, please change it as per your requirements.

**Step2: Convert Raw Data into csv format from .blg file.**
Once you've collected the performance data, you can use the .blg file to convert it to CSV format. Please use the following steps to convert .blg format data to CSV:
- Start by opening the.blg file.
- Right-click on the graph and select "Save Data As"
- Provide the desired name to the file and change "save as type" to "csv" and save the date in CSV format.

**Step 3: How to convert raw data from a .csv file to a final xlsx sheet to generate detailed graphs.**
- The following is information about Excel sheets where we must copy raw data for further processing. 

<img src=PICTURE4.PNG title="" alt="">
        Figure 2

**We need to perform the following action.**
1.	Copy data from the CSV sheet to the raw sheet (reference: figure a)
2.	On the MASTER_DATA sheet, reapply the Filter by clicking on "reapply" (Reference: figure b).

<img src=PICTURE5.PNG title="" alt="">

        Figure 3

-	We will get data in the following formats: "Quick View" and "Detailed Graph."


**RESULT FOR SINGLE SERVER**
-**“Sheet: Per_TouchStone_Single_Server.xlsx**

-**QUICK VIEW**

<img src=PICTURE6.PNG title="" alt="">


**DETAILED GRAPHS**

<img src=PICTURE6.PNG title="" alt="">

**For 2 Servers Comparison**
- **“Per_TouchStone_Comparison_2_Servers.xlsx”**

**QUICK VIEW**
<img src=PICTURE7.PNG title="" alt="">

**DETAILED_GRAPHS**

<img src=PICTURE8.PNG title="" alt="">

**DETAILED_GRAPHS**

<img src=PICTURE9.PNG title="" alt="">

**Solution Files Attached** 

#### Conclusion

This article covers detailed information about the solution we have created to help DBA Team members create quick graphical presentations of performance data collected from the performance monitor. These graphs can be used for multiple purposes, like resource utilization report creation for SQL Server, performance benchmarking for SQL Server, and resource utilization comparison between two servers. 










 
<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed SQL Services.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).