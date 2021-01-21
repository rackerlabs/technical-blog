---
layout: post
title: "AWS WAF pillar five: Cost optimization tools and best practices"
date: 2021-01-21
comments: true
author:
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "AWS WAF pillar five: Cost optimization tools and best practices"
metaDescription: "AWS cost optimization is at the heart of the Amazon cloud experience.
After all, the ability to do more with less&mdash;accelerate business with lower
infrastructure costs&mdash;is the promise of the cloud."
ogTitle: "AWS WAF pillar five: Cost optimization tools and best practices"
ogDescription: "AWS cost optimization is at the heart of the Amazon cloud experience.
After all, the ability to do more with less&mdash;accelerate business with lower
infrastructure costs&mdash;is the promise of the cloud."
slug: "aws-waf-pillar-five-cost-optimization-tools-and-best-practices"

---

AWS cost optimization is at the heart of the Amazon cloud experience. After all, the
ability to do more with less&mdash;accelerate business with lower infrastructure
costs&mdash;is the promise of the cloud.

<!--more-->

{{<img src="Picture1.png" title="" alt="">}}

The cost optimization pillar of the AWS&reg;
[Well-Architected Framework (WAF)](https://aws.amazon.com/architecture/well-architected/?wa-lens-whitepapers.sort-by=item.additionalFields.sortDate&wa-lens-whitepapers.sort-order=desc)
provides guidance on designing, monitoring, and responding to technology and business
conditions to optimize your AWS infrastructure so that you pay for only the resources you
need and use.

This post summarizes a more detailed
[AWS document on the Cost Optimization Pillar](https://wa.aws.amazon.com/wat.pillar.costOptimization.en.html)
and examones the following WAF cost optimization pillar areas of concern, reviewing the AWS
tools and best practices that you can use to address each one:

- Cost-effective resources
- Matching supply and demand
- Expenditure awareness
- Optimizing over time

#### Cost-effective resources

So, how do you optimize your cloud costs? Ensuring your AWS resources are cost-effective
is a matter of matching the right resource, at the right size, with the right payment
structure. AWS recommends the following approaches to achieving a cost-effective architecture:

- Appropriately provisioned
- Rightsizing
- Instance purchasing options
- Geographic selection
- Managed services

##### Appropriately provisioned

Ensuring you have enough capacity, but not too much, is critical for building a
cost-effective AWS architecture. You can use many controls to modify your AWS implementation
using the AWS Management Console or APIs and SDKs to ensure that you can adjust to shifting
demands. You can change the number of nodes on AWS Elastic Map Reduce&reg; (EMR) to adapt
to increases or decreases in data processing, or you can group multiple instances of AWS
resources to enable higher density usage. Provisioning systems can be time-consuming. Amazon
recommends integrating APIs and SDKs with AWS CloudWatch&reg; monitoring to automate
adjustments to resource utilization.

##### Rightsizing

On AWS, right-sizing means using the lowest-cost resource to execute workloads. AWS provides
APIs, SDKs, and control features that allow you to modify resources as demands change. For
example, you can take snapshots of Elastic Block Store (EBS) volumes and restore them to
different volume types with higher IOPS or throughput. As a best practice, use CloudWatch
and create custom CloudWatch logs to set alarms for resource thresholds and trigger
resource changes. It is important to select the right time period for monitoring to include
the highest resource usage. For example, a weekly report might not consider end-of-month
activities that require higher utilization, causing you to risk under-provisioning your
system.

##### Purchasing options 

There are three types of instances on AWS&mdash;on-demand, spot, and reserved&mdash;and
each has a different pricing model. You pay for your AWS instances by the hour, and on-demand
instances are the most expensive. Think of it as buying an airline ticket on the day you
want to travel. You pay a higher price than if you had reserved a seat in advance. That
said, sometimes flexibility is more important than the price, or unexpected events require
an on-demand change in configuration. Spot instances are usually the least expensive. You
can bid on unused AWS instances for short-term use and purchase blocks of time to reduce
changes in bid-pricing over the course of several hours. Reserved Instances require an
advanced purchase or reservations. You prepay at a much lower rate than on-demand instance
pricing. You can purchase reserved instances in one- to three-year increments, with the
price lower for longer-term commitments. Prices differ depending on the number of
Availability Zones you need and whether you want the flexibility to convert instances to
different instance sizes or platforms during the reservation term.

##### Geographic selection

AWS offers tools to use geographic location to reduce latency and increase reliability.
AWS operates in multiple regions worldwide, and you can select the region or regions that
offer your end-users the best (fastest) experience. You can use a monthly calculator to
model how a solution performs and compare the costs for different regions. You can also use
CloudFront&reg; or AWS CodeDeploy&reg; to provision a proof-of-concept environment in
different regions, run workloads through the environments, and analyze the system costs in
each region. The AWS Route 53&reg; DNS service lets you use domain names to route user
requests to the AWS region that give your users the fastest response (latency-based routing).

##### Managed services

AWS managed services allow you to outsource the operational work of managing a service.
AWS provides managed services for databases, such as Amazon RDS and Amazon DynamoDB. Managed
AWS database services can reduce the cost of database capabilities and free up time for
your developers and database administrators. Also, AWS Lambda&reg; is a serverless compute
service that allows you to execute code without base-level infrastructure costs. Charges
are based on the compute time that you consume. Amazon SQS, Amazon SNS, and Amazon SES are
application-level services you can also use without paying for base-level infrastructure
costs.

#### Matching Supply and Demand for AWS Cost Optimization

When your infrastructure supply is optimized to meet user demand, you have the opportunity
to deliver services at the lowest possible cost. AWS supports several approaches to match
supply with demand:

- Demand-based approach
- Buffer-based approach
- Time-based approach

##### Demand-based approach

A demand-based approach to matching supply and demand leverages the *elasticity* of the AWS
cloud. Elasticity refers to the ability to scale up and down, in and out, managing capacity
and provisioning resources as demand needs change. AWS recommends using APIs or service
features to allocate the number of cloud resources in your architecture dynamically. You
can scale specific components in your architecture and automatically increase the number
of resources during demand spikes to maintain performance and decrease capacity during
slow periods to reduce costs. The AWS best practice for demand-based resource allocation is
Auto Scaling, which enables you to add and remove EC2 instances automatically according to
rules you define using CloudWatch. You can also group instances to automate scaling for
larger configurations. Auto Scaling is usually used with Elastic Load Balancing (ELB) to
distribute incoming application traffic across multiple Amazon EC2 instances.

##### Buffer-based approach

A buffer is an AWS mechanism that allows applications to communicate with each other when
they are running at different rates over time. Buffer-based matching of supply and demand
involves decoupling components of a cloud application and establishing a queue to accept
workloads (called messages). The host that processes the workload can read the messages to
process the request at the correct rate. For example, if a workload that generates a
significant write load doesn’t need to be processed immediately, you can use a buffer to
smooth out demands on resources. Key AWS services that enable buffer-based capacity
management are Amazon SQS and Amazon Kinesis, which simplify the separation of cloud
application components. You can also use Spot instances to process heavy workloads on the
fly and Lambda to run serverless code for workloads without the cost of an instance.

##### Time-based approach

Time-based matching of supply and demand involves aligning resource capacity to predictable
demand over specified time periods. If you know when resources are going to be required,
you can time your system to make the right resources available at the right time. With AWS,
you can implement time-based resource allocation by timing your Auto Scaling. For example,
for businesses that use 90 percent of a system’s capacity during business hours, you can
time your resources to scale up at the beginning of the day and down at the end, ensuring
that resources are available when needed and removed when demand drops. You can also use
Cloud Formation to build templates that allow you to create and provision AWS resources
when required quickly.

#### Expenditure Awareness

You can’t manage what you can’t measure, and managing AWS costs requires visibility into
what you’re spending across the entire organization. With different teams running different
AWS resources, expenditure awareness can be a challenge. Expenditure awareness best
practices on AWS involves several considerations, including:

- Stakeholders
- Visibility and controls
- Cost attribution
- Tagging
- Lifecycle tracking

##### Stakeholders

In the cloud, infrastructure is not just an IT responsibility. The AWS cloud touches and
can transform everything from research and development to customer service. AWS recommends
that all relevant stakeholders within your organization be involved in expenditure discussions
at every phase of your architecture development. These include financial, operational,
product development, IT, and third-party organizations.

##### Visibility and controls

You need to be able to view your AWS costs at a level that is granular enough so that you
know what you’re spending and can break down your costs, predict future costs, and adjust
as technology and market conditions indicate. AWS offers a free Cost Explorer tool that
gives you a graphical view of a year and allows you to predict your spend for the coming
months with more than eighty percent confidence. AWS also offers some billing and cost
reports to help you identify savings opportunities and prevent under-provisioning. You can
use the AWS Billing and Cost Management service to create monthly budgets. You can create
high-level reports or fine-grained reports that track the costs of every component of your
system. To get even more granular, the Detailed Billing Report with resources and tags and
Cost and Usage Reports allow you to view hourly expenses. You can use CloudWatch to set
cost-based alarms to notify you of red flag expense increases.

##### Cost attribution

Cost attribution allows you to assign specific AWS costs to specific organizations to
provide great accountability and to distribute cost optimization responsibilities. You can
also link accounts and billing to specific groups defined by you. For example, you can
create separate linked accounts by:

- business unit (such as finance, marketing, and sales)
- environment-lifecycle (such as development, test, and production)
- project 

Then, you can use consolidated billing to aggregate these linked accounts.

##### Tagging

Tagging allows you to organize usage and billing information around virtually any category.
You assign a tag to AWS resources and then collect data and information about all resources
with that tag. Suppose you want to see how much a specific application is costing your
organization. In that case, you can tag the assets used by that application and run a report
to discover the overall application cost. You can also use tags to perform resource management
tasks at scale by listing resources with specific tags, then executing the appropriate actions.
For example, if you are running a test and tag all assets used with a *test* tag, you can
automate the removal of these resources when the test is complete.

##### Lifecycle tracking

One of the challenges of running a large AWS implementation is identifying resources that
you no longer use. AWS recommends using AWS Config, which continuously records configuration
changes, to create a detailed inventory of your AWS resources. You can also use AWS CloudTrail&reg;
and Amazon CloudWatch to automate the generation of records for resource lifecycle events.

#### Optimizing Over Time

AWS offers tools to help you continue to optimize your cloud architecture to ensure that
you are never overspending. The pillar focuses on two approaches:

Measure, monitor, and improve
Staying evergreen

##### Measure, monitor and improve

For larger AWS installations with multiple stakeholders, measuring, monitoring, and
improving cost optimization can be challenging. AWS recommends forming a cost optimization
team that meets regularly to “coordinate and manage all aspects of cost optimization, from
your technical systems to your people and processes.” Another best practice is to define
goals and metrics. For example, AWS recommends that you should turn on and off all on-demand
EC2 instances each day, with 80-100 percent being an acceptable range. Resources that run
24/7 should probably use Reserved Instances. Analysis and reporting are critical for
continuous improvement. The AWS Billing and Cost Management Dashboard (including Cost
Explorer and Budgets), Amazon CloudWatch, and AWS Trusted Advisor are recommended to monitor
and analyze usage and validate any implemented cost measures, such as savings from reserved
capacity.

##### Staying evergreen

Staying evergreen means ensuring that you are always using the most up-to-date,
cost-effective AWS resources. AWS is constantly improving efficiency, driving down costs,
and adding productivity tools. You can use AWS Trusted Advisor, a free tool that analyzes
your AWS environment and reports opportunities to save money by eliminating unused or idle
resources or committing to Reserved Instance capacity.

 **What is Trusted Advisor in AWS?**

AWS Trusted Advisor is an application that inspects your AWS environment and makes
recommendations for saving money, improving system performance, or closing security gaps.
Trusted Advisor draws upon best practices learned from the AWS aggregated operational
history of serving hundreds of thousands of AWS customers to automate your performance
improvement and reduce your spend.

### The Cost Optimization Journey

AWS Cost optimization is a journey, not a destination. The cloud and AWS are constantly
evolving. Using the tools and best practices of the Cost Optimization Pillar helps you
develop processes that keep your cloud implementation as lean and effective a possible.

Learn more about the other Well-Architected Framework pillars in this series:

- [Operational Excellence](https://docs.rackspace.com/blog/aws-waf-pillar-one-operational-excellence-tools-and-best-practices/)
- [Security](https://docs.rackspace.com/blog/aws-waf-pillar-two-security-tools-and-best-practices/)
- [Reliability](https://docs.rackspace.com/blog/aws-waf-pillar-three-reliability-tools-and-best-practices/)
- [Performance Efficiency](https://docs.rackspace.com/blog/aws-waf-pillar-four-performance-efficiency-tools-and-best-practices/)

<a class="cta red" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Let's Talk** to [start the conversation](https://www.rackspace.com/).

