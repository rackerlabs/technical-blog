---
layout: post
title: "How is the use of Data Observability dimensions adding value to Rackspace Technology?"
date: 2023-02-03
comments: true
author: Udayan Guha
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - Data
    - DevOps
metaTitle: ""How is the use of Data Observability dimensions adding value to Rackspace? Technology"?
metaDescription: "This blog shares a slew of accelerators and value-adds as part of the Data Observability initiative undertaken by the Site Reliability Engineering team of the Rackspace ITS departmen.t "
ogTitle: ""
ogDescription: "This blog shares a slew of accelerators and value-adds as part of the Data Observability initiative undertaken by the Site Reliability Engineering team of the Rackspace ITS department "
slug: ""How-is-the-use-ofdata-observability-dimensions-adding-value to-rackspace-Technology"
---

How is the use of Data Observability dimensions adding value to Rackspace? Technology?"
<!--more-->

#### Introduction

. This blog intends to share this knowledge with a larger audience within Rackspace where the solutions can be implemented for similar use cases in other Public and Private cloud programs.features faster while maintaining application reliability.


**Target Audience: Data Engineers, Cloud Engineers, Data Analysts, Data Scientists, ITIL members, Data Enthusiasts, and leadership roles such as CDO, and CIO.**


Have you encountered a data issue in the live production system on a Friday afternoon or worse while you were on vacation due to which you had to extend hours? I’m sure you have if you are a Data guy in the IT industry. Do you know that bad data costs over $3 Trillion? ( Refer Source - shorturl.at/lBT26) With so much at stake in data quality and robustness on data platforms, there is a big opportunity for the engineers supporting these production systems to make such platforms achieve close to 100% uptime with optimal data output. The engineering team supporting such live platforms and getting both development and DevOps closer to each other is named the Site Reliability Engineering team. On any live system, in case any error occurs, there are 3 namely methods to work –

<img src=Picture1.png title="" alt="">


What makes an SRE team more reliable to meet their production system SLA are such systems that cannot just “react” to a failure, but rather prevent those situations that lead to any failures, errors, or poor data conditions.

*Here is where Data Observability comes into play.*

Data Observability is a combination of application observability and the underline infrastructure observability running those applications. 
So, what initiatives the SRE team within the internal department that manages Rackspace data warehouse is undertaking can be understood with these dimensions of Data Observability that we are implementing – 


<img src=Picture2.png title="" alt="">

The strategy and ideation were started by Jayanta Das (Senior Manager, Data Management – US). 
Let us go through each of them along with the solution implemented for each dimension one by one -

1. **1.Reliability**

Production systems are intended to have 99% or above uptime but not 100% as the latter is a very expensive nor required target. To ensure, the data pipeline is operational an accelerator has been created to check whether all the source connections are functional and reliably providing data or not. 

**Implemented Solution**

This is how the dashboard created on the Looker service of GCP looks currently –

<img src=Picture3.png title="" alt="">

The first left section of this dashboard gives the percent success and failed connection duration for each of the 3 listed source systems. The next visual of the pie chart shows that in the last month for 9% of the time, the source system of Postgres was not responding. The bottom two tabular sections provide the exact data points and percent-wise information of each of the hosts on each of the three source systems.

**Credits – Vijay Kumar Kummari, Reshma Animireddy**

2.	**Throughput** 
Understanding the workload under typical working conditions is important for determining what “normal” performance looks like and establishing a baseline to serve as an alert threshold.

<img src=Picture4.png title="" alt="">

**Credits – Joydeep Roy Choudhury**


This alert has also been integrated with a Microsoft Teams group. The Tier 1 team gets this additional alert –

<img src=Picture5.png title="" alt="">

The mail and the MS Teams alert have each DAG name, and hyperlink to the DAG in the production environment along with the Run Times. Cool, isn’t it?!

4.	**Security** 

Security KPIs include the identification of intrusion attempts, policy violations, and the number of vulnerabilities, among others. Another security and audit issue is any manual work done that can impact the production environment or stored data. 


A.	**Tracking manual activity in the production environment-**


Any SQL query that performs any operation by any user which can change the data is tracked. That implies, a NEW, UPDATE, or DROP process in all the projects in scope is tracked on the GCP’s Big Query service. This data is captured in a CSV format file and shared with that user for further clarification and remediation steps. Here is a mail generated by this accelerator where the queries are attached for the course of day –

<img src=Picture6.png title="" alt="">

**Credits – Lakshmi Reddy Eturi**

B.	**Security Command Center –**

The free tier solution provided by GCP of SCC ( Security Command Center) was used by the team to identify vulnerabilities present in various projects within the organization of the GCP platform hosted within Rackspace –


<img src=Picture7.png img="" img="">

This was done by the use of Cloud Functions and captured in the Cloud Storage in CSV format. This function execution was automated by Pub/Sub from a Cloud Scheduler. The remediation steps upon finding each vulnerability were to identify the owner of the resource and check if the resource is still required

 **Credits:Jorge Barajas**

5.	**Resource Consumption**
GCP tracks each and every operation. The key is the locate such data points to our advantage. The resource used by each BQ at the user level and at the project level fetches opportunities to further conserve valuable resources.


*Implemented solution:*
Two dashboards have been created to identify Big Query usage –

<img src=Picture8.png title="" alt= "">


This is a comprehensive view of how each project or user is using BQ. This provides an opportunity to optimize those scripts which are more expensive based on the data volume processed.  The bottom table also provides the cost of each process in that billing cycle for such processes. One can see, this dashboard captures data for different projects in the left pie chart. While the right pie chart shows the slots used for the projects. If required, the dashboard provides an opportunity to drill down to the user by entering the mail id.

**Credits – Vijay Kumar Kummari, Pavlo Miroshnyk**

6.	**Effective Cost Monitoring**

Cloud Cost monitoring is the most critical dimension. The OpEx cost is the factor that bogs each customer who rents resources from Cloud-based platforms. Based on the above KPI of “Resource Consumption”, opportunities are identified to reduce cost. Active cost monitoring for those unused resources is to be created that will identify rarely used resources. These can be tables rarely refreshed or storage that can be archived. Any old PAAS such as Composer upon migration to a new version also needs to be decommissioned to save costs.


7.	**Latency** 
Latency is a counterpart to throughput, tracking the lag between an operation and its completion, or a request for data and its receipt. So, how to identify those products that are not working as per the expected timing SLA? Is there any table that is not getting refreshed as per the usual time? Is there any task within a Data Pipeline that is delayed in a regular manner? Is there a process that can be preponed given that source is able to provide the inputs earlier?  


8.	**Availability** 
Is the infrastructure up and running 24 * 7? What are the risks? What steps are taken to ensure next to negligible downtime? This targets the Service Level Indicators. Are the jobs as per the expected timelines?

The last three solutions are currently in the stage of being built, so watch out for more wonderful accelerators from the team!





<a class="cta red" id="cta" href="https://www.rackspace.com/hub/modern-cloud-applications">Let our experts guide you on your cloud-native journey.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
