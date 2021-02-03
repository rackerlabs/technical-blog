---
layout: post
title: "How to achieve HIPAA compliance in AWS"
date: 2021-01-06
comments: true
author: Rackspace Onica Team
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "How to achieve HIPAA compliance in AWS"
metaDescription: "When trying to achieve HIPAA compliance in any environment, there are some basics that an organization
should implement to comply with regulations. This article offers some suggestions and best practices on how to achieve and
maintain HIPAA compliance in AWS (Amazon Web Services)."
ogTitle: "How to achieve HIPAA compliance in AWS"
ogDescription: "When trying to achieve HIPAA compliance in any environment, there are some basics that an organization
should implement to comply with regulations. This article offers some suggestions and best practices on how to achieve and
maintain HIPAA compliance in AWS (Amazon Web Services)."
slug: "how-to-achieve-hipaa-compliance-in-aws"
canonical: https://onica.com/blog/security/how-to-achieve-hipaa-compliance-in-aws/

---

*Originally published in Nov 2016, at Onica.com/blog*

When trying to achieve HIPAA compliance in any environment, there are some basics that an organization should implement
to comply with regulations. This article offers some suggestions and best practices on how to achieve and maintain HIPAA
compliance in Amazon Web Services (AWS&reg;).

<!--more-->

### Key points on HIPAA compliance in AWS

Achieving [HIPAA compliance](https://onica.com/amazon-web-services/hipaa-compliant-aws-solutions/) in any environment
requires some basic organizational implementations to comply with regulations. The following suggestions and best
practices help you achieve and maintain HIPAA compliance in Amazon Web Services (AWS&reg;).

- Encrypt whenever possible
- Log everything
- Audit everything
- Understand your data
- Enforce general security policies


#### Encrypt whenever possible

AWS services such as Elastic Block Storage (EBS), Simple Storage Service (S3), Relational Database Service (RDS),
and many others allow you to encrypt the data-at-rest. It is important to encrypt whenever possible, whether you
expect a system to have Protected Health Information (PHI) or not. At times, developers create duplicate databases
or data sets to test with, and these could contain PHI. For the low cost of Key Management System (KMS), it is worth
the peace of mind to encrypt anything and everything&mdash;learn more [here](https://aws.amazon.com/kms/).

Attach a secondary volume to the EC2 instance, mark the new volume as *encrypted*, and attach it to your EC2 instance.
After you create the volume, attach it to your EC2 instance. Draft and enforce a policy that requires developers to use
only the secondary drive because it is encrypted. If you're wondering about the back end, you should know Elastic Compute
Cloud (EC2) uses EBS on the back end.

S3 allows you to encrypt the data-in-transit and at-rest. To do so, modify the S3 bucket policy with the appropriate
policy&mdash;find an example [here](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html). By doing
so, S3 encrypts any data pushed. If the pushed data isn't encrypted, S3 denies the transfer. You can see how to force encryption
while pushing data to S3 [here](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html).

KMS is the system used to encrypt the data-at-rest for EBS, S3, and many other services within AWS. This service charges a
very minimal fee per `GET` request. You can see the pricing page [here](https://aws.amazon.com/kms/pricing/).

#### Log everything

Your systems should record any user changes to the system within the logs. If you haven't enabled logging, many changes can
go by unnoticed and untracked. When an audit for [HIPAA compliance](https://onica.com/amazon-web-services/hipaa-compliant-aws-solutions/)
takes place, the auditors will request samples of the logging that your organization has in place. If the logs don’t exist,
it can be a huge mistake that could cost your organization its compliance status. To achieve logging within the AWS infrastructure,
take a look at AWS Config [here](https://aws.amazon.com/config/). AWS also offers a service to store your logs in a centralized place
through Cloudwatch&reg;. Check out Cloudwatch Logs for this feature
[here](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html).

Treat logs like an ancient museum artifact. No one should be able to modify or touch them, and only certain people should be able
to view them. You can achieve this through IAM policies if you store logs within Cloudwatch Logs.

#### Audit everything

Auditing is one of the most important pieces of [HIPAA](https://onica.com/amazon-web-services/hipaa-compliant-aws-solutions/)
compliance in AWS. If a user modifies your system and there is no auditing in place, the changes can go unnoticed but recorded.
A user could open up sensitive ports to the internet allowing external attacks, and the security department would never know.
Having logging in place is a good start, but auditing those logs and alerting on sensitive actions is just as important as the
logging itself. If the logs are there, but no audits happen, then what use are the logs?

For changes to your AWS environment, you can use AWS Config&reg; with Lambda to notify you of events that interest your security
department. AWS Config has a pre-built rule that notifies an SNS topic (if configured) of any security group changes.

#### Understand your data

Having your log data is useful. Understanding your log data is just as important, if not more important. If your
logs are there, but no one knows what’s in the logs or what log records what actions, how can auditing take place?
How will your security department know what logs to monitor for specific actions? Log everything, but carefully. Carefully identify what you want and need to log. For example, you might not need to know every time a file an application writes a file to `/tmp/`, but you would want to know when someone installs a new package.

#### Enforce general security policies

In the number of audits we've done, we noticed that many customers were not using password policies or enforcing IAM access
key rotation. AWS IAM has a built-in feature that requires all user passwords to have a certain number of characters, a digit,
a special character, and an upper-case character when created. Configure the AWS IAM password policies to keep your passwords
in compliance with [HIPAA regulations](https://onica.com/amazon-web-services/hipaa-compliant-aws-solutions/).

It is also good practice to enforce a policy to rotate AWS IAM access keys every 365 days. There is no automated AWS way to do
this, but writing your own Lambda script to scan your IAM access keys nightly and alert you on expired ones is a good start.

### Related AWS posts

Learn more about our security and [HIPAA compliance](https://onica.com/amazon-web-services/hipaa-compliant-aws-solutions/)
in AWS services, and read a few of our related case studies for
[HealthRise Solutions](https://onica.com/amazon-web-services/hipaa-compliant-aws-solutions/) and Health Advocates.

<a class="cta teal" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
