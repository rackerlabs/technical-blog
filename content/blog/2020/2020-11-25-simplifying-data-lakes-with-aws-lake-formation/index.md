---
layout: post
title: "Simplifying data lakes with aws lake formation"
date: 2020-11-25
comments: true
author: Mark McQuade
authorAvatar: ‘https://ca.slack-edge.com/T07TWTBTP-U0119UAG3PH-16653531535c-512'
bio: "Mark is an AWS and Cloud-Based Solution Specialist, Knowledge Addict, 
Relationship Builder, and Practice Manager of Data Science & Engineering at Onica. 
His passion is in the data, artificial intelligence, and machine learning areas. 
He also loves promoting AWS data and ML services through webinars and events and 
passing his knowledge onto others."
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "Simplifying data lakes with aws lake formation"
metaDescription: "AWS Lake Formation is a service by Amazon that makes it easy to set up secure data lakes, accelerating the process from months to mere weeks. Data lakes are centralized, curated, and secured repositories of data that can be stored and analyzed to guide business decisions and procure insights."
ogTitle: "Simplifying data lakes with aws lake formation"
ogDescription: "AWS Lake Formation is a service by Amazon that makes it easy to set up secure data lakes, accelerating the process from months to mere weeks. Data lakes are centralized, curated, and secured repositories of data that can be stored and analyzed to guide business decisions and procure insights."
slug: "simplifying-data-lakes-with-aws-lake-formation"

---

*Originally pubished in JAn, 2020 at Onica.com/blog*

AWS Lake Formation&reg; is a service by Amazon that makes it easy to set up secure data lakes, accelerating the process from months to mere weeks. Data lakes are centralized, curated, and secured repositories of data that can be stored and analyzed to guide business decisions and procure insights. 


<!--more-->

Usually the set up of these data lakes involve a large amount of manual work that can be complicated and time-intensive. AWS Lake Formation simplifies this process down to just defining data sources and the data access and security policies that you want to apply.

### The state of data today

The amount of data that is generated and utilized by businesses has been growing at a tremendous scale. The growth in the amount of data has catalyzed the research and development of new purposes and use cases, further driving up the sheer amount of data that is generated. In fact, data grows by 10x every 5 years and hence data platforms need to scale 1000x to be sufficient for 15 years of storage and processing requirements.

Data varieties and volumes are increasing quickly with a plethora of use cases ranging from feeding machine learning (ML) algorithms developed by Data Scientists to building statistical visualizations and using the generated insights to guide business decisions. Data can be used to anticipate customer behaviour, make a variety of predictions or forecasts, automate processes to improve efficiency and enhance product offerings with speed and availability in addition to automating customer service. These use cases require that the data is secure and available in real-time, and with growing numbers of people accessing data, it is important that data platforms are flexible and scalable.

#### Enter data lakes

Current solutions to on-prem data storage and analytics involve Hadoop Clusters, Data Warehouse Appliances and SQL Databases. These are siloed however and have minimal communication amongst each other in addition to having scalability limitations. Data Lakes offered on cloud platforms are a superior solution to meet the demands of data today and in the future, as it grows at a rapid pace.

As centralized repositories of data, data lakes allow the storage of structured and unstructured data at any scale. Amazon S3, an object storage service offered by AWS, is an industry-leading scalable, available, secure and high-performance platform upon which you can build data lakes. A large number of Fortune 500 companies and enterprise companies utilize Amazon S3 for their data lakes including Pfizer, Vanguard, Electronic Arts, Adobe, HBO, Expedia and many more. These companies choose to take advantage of data lakes for their flexibility to support relational and non-relational data, the ability to scale to any size, diverse set of analytics and ML tools, high availability and low cost.

{{<img src="picture1.png" title="" alt="">}}

The process of building data lakes involves a series of steps. First, you need to find data sources such as DB instances on Amazon RDS. Next, a storage must be set up such as an Amazon S3 bucket for the data lake back-end, followed by the configuration of access policies for this bucket. Then tables need to be mapped to Amazon S3 locations where you will use AWS Glue to build out your schema and tables based on data present in your source. The next step involves making your data more usable and organized by cleaning, prepping and cataloging. Once the data is ingested and cleaned, metadata access policies must be set in place. Finally, access for analytics services must be configured to make the data available appropriately.

This entire process can be quite cumbersome, lasting up to months at end due to the complexities that lie with some of these steps such as data cleansing and prep as well as security configurations. Furthermore, the steps mentioned above must be “rinsed and repeated” for different data sets, users and end-services. Adding to the complexity of the process, over the life of the data lake, further manual steps are involved such as managing and monitoring ETL jobs, updating metadata based on data changes, maintaining cleansing scripts and more! Not only is all this manual work time consuming, it makes the process quite error-prone which is undesirable for enterprise uses.

#### AWS Lake Formation&mdash;simplifying data lakes

AWS Lake Formation takes a lot of the legwork out of building data lakes, allowing you to bring down creation time from months to weeks. The service provides a central point of control from where you can identify, ingest, clean and transform data from thousands of sources, enforce security policies across multiple services and acquire and manage new insights. AWS Lake Formation operates from one dashboard where you have access to configure and set up all the lifecycle stages and activities involved with data lakes.

{{<img src="picture2.png" title="" alt="">}}

You can register existing Amazon S3 buckets that contain your data or import new data by creating Amazon S3 buckets through AWS Lake Formation and importing into them. The data is stored in your account with no lock-in and direct access.

#### Blueprints

[Blueprints](https://docs.aws.amazon.com/lake-formation/latest/dg/tut-create-workflow.html) offer a way to define the locations of your data that you are looking to import into your new data lakes built using AWS Lake Formation. Data can be sourced from databases such as Amazon RDS or logs such as AWS CLoudTrail Logs, Amazon CLoudFront logs and others. Support for more types of sources of data will be added in the future. Once a blueprint has a defined source, you can decide if the data is imported all at once or incrementally over time, into the data lake storage on Amazon S3.

Hence the steps to using Blueprints are quite simple – defining a source, defining a location to load the data and configuring how often the data must be loaded. Blueprints automatically discover source table schema, convert the data to the target format, partition the data based on the partitioning schema and keep track of processed data. You may also customize any of these parameters to your liking.

Under the hood, Blueprints structurally sit on top of AWS Glue, using its service to fulfill tasks. AWS Lake Formation is very tightly integrated with AWS Glue and the benefits of this integration are observed across features such as Blueprints as well as others like data deduplication with [Machine Learning transforms](https://docs.aws.amazon.com/glue/latest/dg/machine-learning.html). ML transforms allows you to merge related datasets, finding relationships between multiple datasets even if they don’t share identifiers (Data Integration), and removing duplicate rows that refer to similar things from datasets (Deduplication).

#### Security

{{<img src="picture3.png" title="" alt="">}}

Security in AWS Lake Formation involves setting up user access permissions. When a user tries to access the data using one of AWS’ appropriate services, their credentials are sent to AWS Lake Formation which returns temporary credentials to permit data access. Hence, access is simply controlled by grant and revoke permissions which can be specified on tables and columns instead of buckets and objects. Policies granted to particular users can be viewed and altered easily and all the data access is available to audit in one easy location with AWS Lake Formation.

#### Search and Collaboration Across Multiple Users

AWS Lake Formation offers text based, faceted search across all metadata, allowing the addition of attributes like data owners, stewards and others as table properties. Furthermore, data sensitivity levels, column definitions and other column properties can be added as well.

**Real time auditing & monitoring**



### Conclusion

<a class="cta purple" id="cta" href="https://www.rackspace.com/sap">Learn more about our SAP services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
