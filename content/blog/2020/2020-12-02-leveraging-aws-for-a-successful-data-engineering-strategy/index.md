---
layout: post
title: "Leveraging AWS for a successful data engineering strategy"
date: 2020-12-02
comments: true
author: Adnan Ahmad 
bio: "Leading Big Data and DevOps architecture for transformation projects by using the AWS cloud."
published: true
authorIsRacker: true
categories:
    - General
    - Database
metaTitle: "Leveraging AWS for a successful data engineering strategy"
metaDescription: "The transformation of data engineering over the past years has been so profound that 
organizations not using new methods and technologies are missing out on major business benefits."
ogTitle: "Leveraging AWS for a successful data engineering strategy"
ogDescription: "The transformation of data engineering over the past years has been so profound that 
organizations not using new methods and technologies are missing out on major business benefits."
slug: "leveraging-aws-for-a-successful-data-engineering-strategy"
canonical: https://onica.com/blog/data-analytics/aws-data-engineering-strategy/

---

*Originally published in May 2019, at Onica.com/blog*

Everyone knows the potential of [big data](https://onica.com/innovate-data/), but for some businesses, 
data and analytics still exist in a legacy world. This is a world of structured data that is stored within 
on-premises servers and analyzed with proprietary software. 


<!--more-->

For organizations who want to move towards more big-data-friendly methods, this old world makes that move challenging.
However, the transformation of [data engineering](https://onica.com/innovate-data/) over the past years 
has been so profound that organizations not using new methods and technologies are missing out on 
major business benefits. With that in mind, it’s important to take another look at data engineering and 
how you can use it for business success.

### What is Data Engineering?

The definition of [data engineering](https://onica.com/innovate-data/) hasn’t changed too much over 
the years. However, the foundations and tools have significantly transformed. At its core, 
data engineering is the foundation that supports data science and analytics through extensive 
knowledge of data technology, proper data governance and security, and a strong understanding of 
data processing.

While traditional technologies like relational and transactional databases still have a place in Big Data 
architecture, new arrivals to the scene have created innovation in the space. When it comes to 
data engineering, AWS&reg; has changed the game. Some major products include:

**Amazon&reg; DynamoDB&reg;**: [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) is a NoSQL&reg; database that offers 
an alternative to relational databases by allowing you to use a variety of data models, including 
document, graph, key-value, memory, and search. This creates scalable, flexible, high performance, 
and highly functional databases for modern workloads.

**Apache&reg; Hadoop&reg;**: Apache Hadoop is an open-source service you can use to process large data sets 
by taking advantage of clustering. Hadoop has a full ecosystem of tools that can match workload needs. 
Hadoop can be run on AWS using Amazon Elastic MapReduce (EMR), which simplifies cluster management 
when running Hadoop and other related applications in the Hadoop Ecosystem.

**Amazon EMR**: A tool for managing the Hadoop ecosystem on AWS, EMR makes it easy to cost-effectively 
process data across Amazon Elastic Compute Cloud&reg; (Amazon EC2) instances. Amazon EMR also enables the running 
of other distributed frameworks such as Apache Spark&reg; and HBase&reg;, and enables the interaction of AWS data stores 
like Amazon Simple Storage Service Amazon S3 and Amazon DynamoDB.

**Amazon Redshift**: A fast, scalable data warehouse, Amazon Redshift makes it simple to extend queries 
to your data lake. By using machine learning, parallel query execution, and columnar storage, Amazon Redshift 
delivers ten times faster performance than other data warehouses.

**AWS Glue**: AWS Glue is a fully managed extract, transform, and load (ETL) service that makes it easy for 
customers to prepare and load their data for analytics. After it's cataloged, your data is immediately searchable, 
queryable, and available for ETL.

**Amazon Athena**: Amazon Athena is an interactive query service that makes it easy to analyze data in Amazon S3 
using standard SQL&reg;. It is also integrated with AWS Glue Data Catalog, allowing you to create a unified 
metadata repository across various services, crawl data sources to discover schemas, populate your 
Catalog with new and modified table and partition definitions, and maintain schema versioning.

AAs with everything else, the key is finding the right component for the job, in format and model, which
meets your organization's data security needs.  

### Data Engineering with AWS: A client example

A strong example of this comes from a client of ours who was pushing data through a monthly report system. 
While the report did give the client-specific things they needed, they weren’t getting any further value 
from the wealth of data they had collected. As part of our engagement, we were able to build a 
[data lake](https://onica.com/blog/how-data-lakes-and-data-warehouses-support-modern-data-architectures/) 
with automated pipelines and built-in data checks for processing, where the data went before being sent to 
the reporting system.

By adding this component to the data architecture, the client not only preserved their reporting system 
but also added greater capabilities and access to the original data set, enabling them to answer ad hoc 
questions around [cost management](https://onica.com/services/cloud-cost-optimization/) and profitability. 
This proves that while many companies do use data and analytics in their day-to-day business, 
integrating the right tools, especially newer tools and technologies, can allow you to leverage data for 
bigger results.

### Implementing data processing

It is not enough to have the right data architecture components if you’re looking to leverage 
[data engineering](https://onica.com/innovate-data/)&mdash;you must also have a strong foundation in 
data processing. Data processing not only includes the movement of data through its data lifecycle 
but also the optimization of data through quality checks and techniques in cleaning up bad data.

Perhaps the most important part of data processing is data ingestion. Although at its heart, 
data ingestion is just the movement of data from its point of origination to a storage system, 
there are a several ways to accomplish this. Data ingestion works best when automated because it can allow 
for low maintenance updates of data for optimal freshness. It can also be continuous and real-time through 
streaming data pipelines, or asynchronous via batch processing, or even both. The decision around which 
ingestion method to use relies on the type of data being ingested, the source, and the destination. 
AWS offers its own data ingestion methods, including services such as Amazon Kinesis Firehose (which offers 
fully managed real-time streaming) to Amazon S3 and AWS Snowball (which allow bulk migration of on-premises 
storage and Hadoop clusters) to Amazon S3 and AWS Storage Gateway (which integrate on-premises data processing 
platforms with Amazon S3-based data lakes).

If you are working with relational databases, another part of this ingestion is extraction, transformation, 
and loading (ETL). ETL processing cleanses data by deduplicating, as well as cleaning up and flagging *bad data* 
and transforming it so that it aligns with the format of the database. This can be done through languages 
such as Python, Java, or Scala while using frameworks like Spark or Flink and is key to improving data quality.

No matter what database type you use, a strong data quality program is important to ensure that the resulting data 
is accurate and reliable. This means identifying and setting roles for data access through tools like 
AWS Identity and Access Management (IAM), enacting processes for standardization and 
reconciliation, and instituting quality checks to maintain data integrity. Although data quality is not 
a new concept, the resources available to promote quality data are. Through modern data tooling, our team 
has created automated data quality reporting for a client. This involves scheduled, periodic comparison of
data from the source system with downstream systems that go to a reporting dashboard, enabling unprecedented 
insights into the quality of data leaving the system and identifying errors or quality loss proactively, 
allowing for correction of the issue ahead of complaints from data consumers.

#### Leveraging Big Data for Present and Future Success

Perhaps what’s most clear in analyzing these changes in data engineering is not just that the process 
has changed but that it continues to do so. As it does, it’s important to consider the implications of 
these changes on your business data policies and how to use these changes to improve business success. 
Changes in data and analytics have not just affected architecture and tooling but have also created 
new systems and mindsets around data usage.

Although data and analytics efforts used to occur at the completion of projects or as a follow-up to 
business efforts, it is now the norm to work with data automatically and continuously. 
This is possible through tools that improve data architecture, such as Amazon S3, Amazon DynamoDB, 
and data ingestion pipelines, as well as through methodologies and processes that change the way 
we monitor and consume data, such as machine learning and automated data dashboards. Businesses can 
now hold on to data for longer without wasting storage space or money, easily automating data cleansing to 
ensure data is well-curated and easily explored and can be accessed in real-time, offering a 
competitive advantage to those who implement these services in their data architecture.

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
