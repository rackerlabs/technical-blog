---
layout: post
title: "Introduction to Always Free Autonomous Database"
date: 2020-12-09
comments: true
author: Chirag Dang
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
    - Database
metaTitle: "Introduction to Always Free Autonomous Database"
metaDescription: "This post introduces *autonomous database* and describes how to create
and use the Always Free Autonomous Database option on the Oracle Cloud Infrastructure."
ogTitle: "Introduction to Always Free Autonomous Database"
ogDescription: "This post introduces *autonomous database* and describes how to create and
use the Always Free Autonomous Database option on the Oracle Cloud Infrastructure."
slug: "introduction-to-always-free-autonomous-database"

---

This post introduces *autonomous database* and describes how to create and use the Always
Free Autonomous Database option on the Oracle&eg; Cloud Infrastructure.

<!--more-->

### What is autonomous database? 

An autonomous database is a modern cloud database from Oracle, which runs on the EXADATA
infrastructure with fully automatic database and data center operations. It uses machine
learning and other AI techniques to automate all the work traditionally done by a database
administrator. It is the world's first fully automated database defined on the principle
of *3S*:

- **Self-driving**: Automates database and infrastructure management like provisioning,
  scaling, patching, backup, and so on. It also includes performance tuning and monitoring
  tasks. 
- **Self-securing**: Protects itself from all internal and external threats and has
  automatic encryption of all the data in rest or transit. It applies security updates with
  no downtime. 
- **Self-repairing**: Automatically recovers any failure and minimizes downtime with an
  SLA of 99.95%.

{{<img src="Picture1.png" title="" alt="">}}

*Image source: [https://learn.oracle.com/ols/course/working-with-oracle-autonomous-database/35573/55727/73116]( https://learn.oracle.com/ols/course/working-with-oracle-autonomous-database/35573/55727/73116)*

### Autonomous database types 

There are two types of autonomous databases based on the workloads:

- **Autonomous data warehouse (ADW)**: Optimized for analytic workloads such as data
  warehouse, reporting databases, large data scan operations, data marts, and so on, this
  performs various BI activities and manages all database life cycle operations.
- **Autonomous Transaction Processing (ATP)**: Optimized for transaction processing or
  mixed workload environments, this enables you to use real-time analytics, a high volume
  of random data access, and application development, and so on.

{{<img src="Picture2.png" title="" alt="">}}

*Image source: [https://learn.oracle.com/ols/course/working-with-oracle-autonomous-database/35573/55727/73116](https://learn.oracle.com/ols/course/working-with-oracle-autonomous-database/35573/55727/73116)*

The following image shows the difference based on the optimization of a specific workload:

{{<img src="Picture3.png" title="" alt="">}}

*Table source: [https://learn.oracle.com/ols/course/working-with-oracle-autonomous-database/35573/55727/73116](https://learn.oracle.com/ols/course/working-with-oracle-autonomous-database/35573/55727/73116)*

### Deployment options for autonomous databases

The following deployment options are available for autonomous databases:

- **Serverless deployment**:  Uses a shared cloud infrastructure resources model.
- **Dedicated deployment** Allows the user to deploy an autonomous database within a
  dedicated cloud infrastructure.

{{<img src="Picture4.png" title="" alt="">}}

*Image Source: [https://blogs.oracle.com/database/autonomous-database-dedicated-exadata-cloud-infrastructure-v2](https://blogs.oracle.com/database/autonomous-database-dedicated-exadata-cloud-infrastructure-v2)*

### Always Free Autonomous Database details

You can provision up to two Always Free Autonomous Databases in the
[home region](https://docs.cloud.oracle.com/en-us/iaas/Content/Identity/Tasks/managingregions.htm#The)
of our tenancy. Oracle provides these databases free of charge, and they're available for
both paid and non-paid accounts.

#### Always Free Autonomous Database Specifications

- Processor: 1 Oracle CPU processor.
- Memory: 8 GB RAM
- Storage: 20 GB.
- Workload Type: Transaction processing or data warehouse 
- Database Version: Oracle Database 19c
- Infrastructure Type: Shared Exadata infrastructure
- Maximum Database Sessions: 20
- No scaling option for CPU and storage.
- If your Always Free Autonomous Database has no activity for seven consecutive days, the
  Database service stops automatically. You can restart the database to start using it again.
  If Free Database remains in a stopped state for three consecutive months, the database
  automatically terminates.
- You can configure events and notifications to stay Informed about Inactive Always Free
  Autonomous Databases.

For details, see [Overview of the Always Free Autonomous Database](https://docs.cloud.oracle.com/en-us/iaas/Content/Database/Concepts/adbfreeoverview.htm).

### Set up an Always Free Autonomous Database

Use the following steps to set up an Always Free Autonomous Database:

1. Log in to the Oracle Cloud Infrastructure [free tier service and create an account](https://www.oracle.com/cloud/free/ ).
2. Log in to the Oracle Cloud Infrastructure (OCI) console.

{{<img src="Picture5.png" title="" alt="">}}

3. Select database type **ATP** or **ADW**.
4. Enter the compartment name, display name, and database name.
 
{{<img src="Picture6.png" title="" alt="">}}

5. Select **Shared Infrastructure**.
 
{{<img src="Picture7.png" title="" alt="">}}

6. Make sure you select the **Always Free** option to enable it.
 
{{<img src="Picture8.png" title="" alt="">}}

7. Create an administrator password.

{{<img src="Picture9.png" title="" alt="">}}

8. Select the license included, and you can also configure access control rules.

{{<img src="Picture10.png" title="" alt="">}}

9. Click **Create** to start provisioning the database.
 
{{<img src="Picture11.png" title="" alt="">}}

10. After three to four minutes, the green box displays, and the database is provisioned
    and available for use.
 
{{<img src="Picture12.png" title="" alt="">}}

11. You have multiple options available to connect the database. Click the service console
    and log in with the administrator password.

12. Select **SQL developer web**, a browser-based tool, to connect to the database.

{{<img src="Picture13.png" title="" alt="">}}
 
{{<img src="Picture14.png" title="" alt="">}}


### Conclusion

Autonomous Database is a giant step in cloud database with excellent hardware and fully
automated operations. You can use the Always Free service to learn, develop, and explore
the Oracle Cloud Infrastructure.

<a class="cta teal" id="cta" href="https://www.rackspace.com/professional-services/data">Learn more about Rackspace Data Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
