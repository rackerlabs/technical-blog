---
layout: post
title: "Snowflake Observability"
date: 2023-04-05
comments: true
author: Pooja Kelgaonkar
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - Snow Flake
    - Data
metaTitle: "Snowflake Observability"
metaDescription: "Snowflake has transformed the way we store, process, and analyze data in the cloud. Like any other technology, it's not resistant to issues."
ogTitle: "Snowflake Observability"
ogDescription: "Snowflake has transformed the way we store, process, and analyze data in the cloud. Like any other technology, it's not resistant to issues."
slug: "snow-flake-observability"

---

Snowflake has transformed the way we store, process, and analyze data in the cloud. Like any other technology, it's not resistant to issues.

<!--more-->

#### Overview
Whenever something goes wrong in the Snowflake environment, it can be challenging and time-consuming to diagnose and fix the problem. 
That's where observability comes in. You can get insights of your Snowflake environment by implementing effective observability practices. These practices make it easier to identify and resolve issues quickly.  

It is more than just monitoring the health of your clusters or tracking query performance.  This blog will help you to explore the world of Snowflake observability and give you the tools and techniques needed to gain complete visibility into your Snowflake environment.
You can include everything from monitoring query performance to analyzing usage patterns and show you how to leverage Snowflake's built-in observability features to optimize the performance and reliability of your Snowflake environment



**What does Snowflake offer to implement Observability implementation?**

Snowflake provides a system-defined, read-only shared database named SNOWFLAKE that contains metadata, historical usage data, about the objects in your organization, and accounts. These databases consist of views that capture usage details like – User logs, storage utilization, CPU/Compute or Warehouse utilization, Queries run on the platform, Data loads, Billing details, snowflake object management logs, etc. We can use this set of objects offered by Snowflake to implement Observability.

**How to set up an Observability model with Snowflake metadata views**
To implement observability – let’s consider a use case where you want to monitor long-running queries and perform analysis followed by Query Optimization.   

Views used to implement this use case –  

```

"SNOWFLAKE"."ACCOUNT_USAGE"."QUERY_HISTORY" 
```

**Identifying long running queries**
You can run simple SQL to identify the queries which have run for a long duration and identify warehouses used to run these queries.  

<img src=Picture1.png title="" alt="">

This query will help to sort the queries per warehouse and rank them based on their total elapsed time. there are many columns present in the view however we can consider the columns based on the stats and requirements to generate them.  

Based on overall queries and pipelines running, you can have a threshold setup to add a cut-off to bucket the queries and identify top queries from them. e.g. based on application, an average time to run queries can be 5-10 mins or more depending on the data processed. In the real-time implementation, we might have valid queries run for more than 20 mins or 45 mins depending on the use cases.   


Let's consider a scenario where you want to analyze all those queries which are being run for more than 5-6 mins and generate an alert for any queries which are run for more than 20 mins.
You can use below SQL to capture long running queries - 

<img src=Picture2.png title="" alt="">

You can get the query_ids and warehouse for a long time. Let's gather more details on the same for optimization. You can use below query -

```

select  
* 
FROM snowflake.account_usage.query_history  
WHERE  
query_id ='01a6f799-0501-da0c-0046-be83002021de'; 

```

You can use SQL to identify queries to analyze them for performance tuning or optimization. You can also use ranking to rank the top queries and use them as reporting, dashboard to report to Ops or Engineering teams.   

```
select * from 
( 
select  
query_id,  
start_time, 
total_elapsed_time, 
warehouse_name, 
ROW_NUMBER() OVER (partition by warehouse_name order by total_elapsed_time desc) as rank 
FROM snowflake.account_usage.query_history  
WHERE  
QUERY_TYPE NOT IN ('DESCRIBE', 'SHOW') 
)long_queries 
where rank is between 1 and 10; 
```

**Logging these details on dashboard for monitoring**

You can use Snowsight (Snowflake Native) – Snowflake’s new WEB UI to create monitoring dashboards. go to Dashboards -> create dashboard -> provide name to the dashboard 
<img src=Picture3.png title="" alt="">
Click on new tile and add SQL to be executed to generate data for dashboard tile -> 

<img src=Picture4.png title="" alt="">

Run the query and review result data shown -  

<img src=Picture5.png title="" alt="">

Click on charts tab to generate chart, an automated chart is generated. You can change the chart type, metrics and aggregate generated –  

<img src=Picture6.png title="" alt="">

This will be added as one of the tiles to the dashboard. You can rename this dashboard tile to Long running Queries. The same dashboard can be used to add other tiles to capture metrics and share.  

<img src=Picture7.png title="" alt="">

You can also share dashboard with team members using link to share dashboard and choose appropriate permissions.  

<img src=Picture8.png title="" alt="">

<img src=Picture9.png title="" alt="">

Once this dashboard is ready, the same queries to build other monitoring dashboards that can be developed and shared across accounts and environments. 

#### Conclusion

This is one of the sample metrics used to share details on generating metrics to build dashboard. You can use Snowflake metadata views, usage schema views to generate metrics as per our requirements to monitor and implement Observability for Snowflake platform. There are third party tools and services available to capture similar metrics as part of Observability. This is one of the simplest and effective way to capture metrics and share with Ops & Engineering teams.


<a class="cta purple" id="cta" href="https://www.rackspace.com/data/snowflake-data"> Learn about Rackspace Snowflake Data Services.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
