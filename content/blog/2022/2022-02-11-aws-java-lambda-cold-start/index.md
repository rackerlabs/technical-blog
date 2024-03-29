---
layout: post
title: "AWS Java Lambda Cold Start"
date: 2022-02-11
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
metaDescription: "In 2020 Q4, we at Rackspace decided to move the one of our applications from on-premises to AWS Cloud using its serverless service, Lambda."
ogTitle: "AWS Java Lambda Cold Start"
ogDescription: "In 2020 Q4, we at Rackspace decided to move the one of our applications from on-premises to AWS Cloud using its serverless service, Lambda."
slug: "aws-java-lambda-cold-start"

---

In 2020 Q4, we at Rackspace decided to move the one of our applications from on-premises to AWS Cloud using its serverless service, Lambda.
<!--more-->

We did successful POCs with basic Lambdas. However, when we built JAVA Lambda functions for our application, our struggle with the infamous Lambda Cold Start started. We gathered statistics on different Lambda response times and implemented solutions to optimize them. This blog is restricted to the steps we took to optimize lambda performance after analysing the data on Lambda execution and the outcomes of it.

#### Lambda & Lambda Response Time
<img src=Picture1.png title="" alt="">

Ref : https://aws.amazon.com/lambda/

Lambdas are serverless. After a brief period of inactivity, servers shut down (gets cold). When requested, they are restarted/re-initialized (warmed) with the required configurations. Lambda cold start is bearable with 1-2 seconds of delay, but for our JAVA-based application (with heavy frameworks) a single Lambda service call took 30-40 seconds to execute.

<img src=Picture2.png title="" alt="">

Ref: https://docs.aws.amazon.com/lambda/latest/dg/runtimes-context.html

After carefully analyzing the response time, we noticed that Lambda has a billed duration for execution and INIT duration for loading required dependencies for frameworks and establishing database connections. During a given initialization time of 10 seconds, we get CPU burst (fast processors) for loading configurations. If the initialization does not happen within the given time (likely for heavy dependencies), the handler instance gets killed and then re-initialized, causing the delay we witnessed. The initialization should happen in less than 10 seconds for the optimal performance of the Lambda function.

### Optimizing JAVA Lambdas

Recommended optimization techniques like Increasing the allocated memory to Lambda and removing duplicate maven dependencies for the Lambda java code were helpful but insufficient to resolve the issue. After going through best practices on AWS resources and discussions on Github, we experimented with the following changes that reduced Lambda initialization time:

_Initialized Lambda handler in the static block_

<img src=Picture3.png title="" alt="">
@ Import annotation for loading configurations than @ComponentScan


<img src=Picture4.png title="" alt="">

We used @Import annotation for loading configurations rather than @ComponentScan to avoid the heavy task of scanning the entire package and importing specific classes already loaded by JVM.

_Included below database configuration._ 

<img src=Picture5.png title="" alt="">

_This setting is used to control whether we should consult the JDBC metadata to determine certain Settings default values when the database may not be available (mainly in tools usage)._

Establishing a new database connection with Aurora Service took around 2-3 seconds and this was happening during initialization. Changing configuration  helped in establishing the db connection during Lambda execution rather than Lambda initialization and reduced INIT time for Lambda. We didn’t notice any other changes as for db calls but decided to not go ahead with this change for any unnoticeable effects it might have on database configuration.

After these changes, INIT duration came down to 6-7 seconds and a single Lambda’s total execution time significantly reduced to ~10 secs. 

_Lastly, we decoupled the database module_ (most expensive call) from individual Lambdas and created a standalone Lambda for all database calls. This step had multiple benefits: 
there was no need to establish database connections for each Lambda and the standalone Lambda remained warm since all the requests for database queries were processed by it. 

### Outcome
Following these techniques, the cold start time finally came down from 30-40 seconds (for one Lambda) to under 10-12 seconds (for single API call including 4-5 lambdas). 

On a concluding note, though serverless is the future, it can be challenging to migrate JAVA based legacy applications with heavy frameworks to serverless. 
There are other methods to improve Lambda performance like lambda warmers, CloudWatch alarms, provisioned concurrency etc. Also, thorough analysis of other migration options like lift and shift migration, hybrid migration model etc. can help decide the best approach for migration.



<a class="cta red" id="cta" href="https://www.rackspace.com/cloud/aws">Let our experts guide you on your AWS journey.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
