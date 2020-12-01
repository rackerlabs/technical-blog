---
layout: post
title: "Multi-tenant data and application management through a DevOps pipeline"
date: 2020-11-30
comments: true
author: Matt Sollie
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-U010UUJU2D8-41b9d5577634-72'
published: true
authorIsRacker: true
categories:
    - DevOps
    - Developers
metaTitle: "Multi-tenant data and application management through a DevOps pipeline"
metaDescription: "As the world of DevOps has grown, the ability to pipeline a web deployment or use infrastructure 
as code to recreate the same stack over and over has become a standard practice."
ogTitle: "Multi-tenant data and application management through a DevOps pipeline"
ogDescription: "As the world of DevOps has grown, the ability to pipeline a web deployment or use infrastructure 
as code to recreate the same stack over and over has become a standard practice."
slug: "multi-tenant-data-and-application-management-through-a-devops-pipeline"
canonical: https://onica.com/blog/devops/multi-tenant-data-and-application-management-through-a-devops-pipeline/

---

*Originally posted in Jan 2020 at Onica.com/blog*

As the world of DevOps has grown, the ability to pipeline a web deployment or use infrastructure as code to 
recreate the same stack over and over has become a standard practice.

<!--more-->

### Promote your data through various environments

Through the many patterns that power this type of pipeline deployment, one of 
the most common traits is that the database and its data remain in place, with each tier having 
a similar configuration to be sure the deployment and pipelines work as intended. 

What if you need to promote your data through the environments and be as flexible and deployable as any 
other artifact? That was the story behind our design and implementation&mdash;to pipeline and deploy a multi-tenant 
application for one customer. 

Let’s take a look at the steps we took to plan and implement this solution and how we dealt with the complexities 
of designing the common web stack for multi-tenancy, configuration, and being able to change out the database flexibly
with every deployment.

#### Planning

The components of the stack were a PHP application server, fronted by an Nginx&reg; host and 
backed by a MySQL&reg; database. We had to make several key decisions regarding the framework for building 
the rest of the project to make sure it would be flexible, scalable, and reliable.

#### Namespace

With multiple customers, and multiple environments for each customer and possibly multiple tenants for 
a single customer, we needed a larger naming strategy. Affecting everything from AWS&reg; CloudFormation&reg;, 
configuration, AWS Identity and Access Management (IAM)  policies, AWS Systems Manager (SSM) Parameter Store
access, and cost controls, we decided on the following namespace: `<ShortCustomerName>-<ProjectNum>-Environment>`

A customer gets a shortened name. Each project for that customer gets a unique global 
project number, such as **xy-0146**, that is used as a component of each stack with an **Amazon S3** prefix, 
such as **AWS SSM path**. For example:

**xy-0146-dev**
**xy-0146-qa**
**xy-0146-prod**

In addition to a customer namespace, we use a common namespace for shared infrastructure 
such as the **VPC**, or non-production and production Amazon ECS clusters.

#### Compute

For each stack, the data source and application build might change, making the ability to deploy quickly
and roll back critical, and the number of customers and environments made density and sprawl a 
concern as well.

Containers were a natural fit, providing density and flexibility. By using Amazon ECS, the pipeline could 
create immutable container images and task definitions for each build and each managed database.

#### Database

For maximum flexibility in creating and destroying databases and managing the lifecycle and 
promotion of the data through snapshots, we used Amazon Relational Database Service (RDS). With this tool,
you can do all work against a database in development and snapshot it. The snapshot is then the source
of truth for each higher tier deployment.

#### Timestamp

Finally, to integrate the data lifecycle with the deployment cycle, we use a timestamp 
to version the database at any given time and to be part of the naming component. You can make the
Amazon RDS databases with AWS CloudFormation within the customer namespace, but name them with the timestamp of 
the initial snapshot, allowing multiple side-by-side launches within a given environment at the time 
of deployment.

The most important part is tracking which database is active and what databases exist as part of the 
deployment to ensure no databases are made and orphaned. To do this, use the active timestamp with
an AWS SSM parameter store, and with other relevant database connection secrets that the pipeline 
pulls to determine the correct database to connect to and how to connect.

### Operations

Now, let's look at our operations.

#### Infrastructure

By combining these components, AWS CloudFormation deployed the common underlying infrastructure, 
and then the customer and project-specific deployments on top of that. For the necessary flexibility,
we used Stacker, a python module for programmatically creating AWS CloudFormation.

The rolling nature of Amazon ECS and immutable task definitions and containers means that, despite 
the change in data sources behind the deployment, we could deploy the Amazon ECS services as long as 
we made the database. This created an interesting challenge as both databases must be running 
until the new container versions stabilized. Normally, you could use the outputs of the singular DB stack 
to get running information for it. However, because we needed two, the timestamp became a critical part of 
the stack names, and we tracked it in the Parameter Store as the source of truth.

#### Pipeline

We divided the stacks logically to keep the database separate, to allow the deployment and flow as needed, 
with two parallel databases running during the deployment. The following rough steps describe the process, 
and the diagram depicts the logical flow of the artifacts as we deploy the new task definitions and databases:

1. **Database snapshot** holds latest development database.
2. **Parameter store** stacks current active database stack information for later.
3. **Parameter store** creates a *DB stack* from the snapshot with a timestamp of the snapshot and activates it. 
4. **Parameter store** obtains the latest build and configuration and creates an Amazon ECS service for the active DB name.
5. **The deployment pipeline** waits for the Amazon ECS service to stabilize with the new task definition.
6. **Parameter store** deletes the original timestamped database.

In the case of a failure, this means the existing Amazon ECS service continues to run even if 
the new DB and new task versions fail to stabilize. Thus, we get a clean rollback and uninterrupted access.

{{<img src="picture1.png" title="" alt="">}}

### Conclusion

A lot of considerations went into the creation of a pipeline that would support a multi-tenant application 
and a specific use case for the database’s lifecycle. Many of the practices we put into use are just as 
valuable to add to any architecture. Strong namespacing on stacks, tags, and instances can add clarity 
and flexibility to deployments and a clear way to separate configuration data. Database stacks based 
on Amazon RDS and snapshots allow a data flow you can use for anything from standing up duplicate 
data environments dynamically or immutable deployments of data across environments.

Interested in learning what your business can gain by leveraging DevOps? Check out [Rackspace Onica’s 
Managed Cloud Operations service](https://onica.com/services/managed-cloud-operations/). If you’re 
ready to get started, [get in touch with our team today](https://onica.com/contact/) 
to learn how Onica, a Rackspace Technology company, can help you leverage DevOps to accelerate innovation 
and lead the market.

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.

<a class="cta red" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>
