---
layout: post
title: "AWS Java Lambda Cold Start"
date: 2022-02-10
comments: true
author: Shreya Shukla
authorAvatar: 'https://secure.gravatar.com/avatar/60a6875ce66eda6bac3fc477a60aca7d'
bio: ""
published: true
authorIsRacker: true
categories:
    - AWS
    - Cloud Servers
metaTitle: "AWS Java Lambda Cold Start"
metaDescription: "Migration to AWS "
ogTitle: "AWS Java Lambda Cold start"
ogDescription: "Migration to AWS "
slug: "aws-java-lambda-cold-start"

---

The SignupService team at Rackspace decided to move the Signup application from on-premises to AWS Cloud using its serverless service, Lambda. 

<!--more-->

We did successful POCs with basic lambdas. However, when started building JAVA Lambda functions for our applications, our struggle with the infamous Lambda Cold Start too started. We gathered statistics on different lambda response times and implemented solutions to optimize them. This blog covers the steps taken to optimize lambda performance and its outcomes.

### Lambda and Lambda Response Times

<img src=Picture1.png title="" alt="">

_Ref:https://aws.amazon.com/lambda_

Lambdas are serverless. After a brief period of inactivity, servers shut down (gets cold). When requested, they are restarted/re-initialized (warmed) with the required configurations. Lambda cold start is bearable with 1-2 seconds of delay, but for our JAVA-based application (with heavy frameworks) a single Lambda service call can take up to 30-40 seconds to execute.

<img src=Picture2.png title="" alt="">

_Ref: https://docs.aws.amazon.com/lambda/latest/dg/runtimes-context.html_

After carefully analysing the response time, we noticed that Lambda has a Billed duration for execution and Init duration for initializing servers with dependencies. During a given initialization time of 10 seconds, we get CPU burst (fast processors) for loading configurations. If the initialization does not happen within the given time (likely for heavy dependencies), the handler instance gets killed and then re-initialized, causing the delay we witnessed. The initialization should happen in less than 10 seconds to solve this issue. 


### Optimizing JAVA Lambdas

Recommended optimization techniques like _Increasing the allocated memory to Lambda and removing duplicate maven dependencies for the lambda java code_ were helpful but insufficient to resolve the issue. After going through best practices on AWS resources and discussions on Github, we experimented with the following changes that reduced lambda initialization time:
Initialized lambda handler in the static block


<img src=Picture3.png title="" alt="">

_Used @ComponentScan annotation for loading configurations than @Import_


<img src=Picture4.png title="" alt="">

_Included below database configuration._

<img src=Picture5.png title="" alt="">

_This setting is used to control whether we should consult the JDBC metadata to determine certain Settings default values when the database may not be available (mainly in tools usage)._


This helped in establishing the DB connection during lambda execution rather than lambda initialization and reduced INIT time for lambda. We didn’t notice any other changes as for the DB calls but decided not to go ahead with this change for any unnoticeable effects it might have on database configuration.

After these changes, INIT duration came down to 6-7 seconds and a single Lambda’s total execution time significantly reduced to ~10 secs. 

#### Lastly, we decoupled the database module #### 
(most expensive call) from individual lambdas and created a standalone lambda for all database calls. This step had multiple benefits: there was no need to establish database connections for each lambda and standalone lambda remained warm since all the requests for database queries were processed by it. 


### Outcome
Following these techniques, the cold start time finally came down from 30-40 seconds (for one Lambda) to under 10-12 seconds (for single API call including 4-5 lambdas). There are other methods to improve lambda performance like lambda warmers, CloudWatch alarms, provisioned concurrency etc. 

Though serverless is the future, it can be challenging to migrate JAVA based legacy applications with heavy frameworks to serverless. Analysis of other migration options like lift and shift migration, hybrid migration model etc. should be done to decide on the best approach.


<a class="cta red" id="cta" href="https://www.rackspace.com/cloud/aws">Let our experts guide you on your AWS journey.</a>

You can also use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
