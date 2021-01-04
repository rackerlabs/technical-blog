---
layout: post
title: "Getting started with the AWS HIPAA QuickStart"
date: 2021-01-04
comments: true
author: Matt Charoenrath
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-U0118EALE77-fa48a7c11b02-72'
bio: "Marketing leader experienced in growing brands while scaling and 
modernizing marketing organizations through a balance of creativity, 
process and technology to captivate audiences and achieve results."
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "Getting started with the AWS HIPAA QuickStart"
metaDescription: "The AWS HIPAA (Health Insurance Portability and Accountability Act) QuickStart release features a turn-key solution for companies who are wanting to put HIPAA data into the cloud, securely."
ogTitle: "Getting started with the AWS HIPAA QuickStart"
ogDescription: "The AWS HIPAA (Health Insurance Portability and Accountability Act) QuickStart release features a turn-key solution for companies who are wanting to put HIPAA data into the cloud, securely."
slug: "getting-started-with-the-aws-hipaa-quick-start"
canonical: https://onica.com/blog/security/getting-started-with-the-aws-hipaa-quick-start/
---

*Originally published in Feb 2017, at Onica.com/blog*

The AWS HIPAA (Health Insurance Portability and Accountability Act) QuickStart release 
features a turn-key solution for companies who are wanting to put HIPAA data into the cloud. 

<!--more-->

The AWS&reg; HIPAA (Health Insurance Portability and Accountability Act) QuickStart release 
features a turn-key solution for companies who want to put HIPAA data into the cloud securely. 
While providing the CloudFormation used to deploy the environment, the AWS HIPAA QuickStart 
release covers everything from dedicated tenancy to setting up Config Rules and notifying users 
if port 22 (SSH) is open to the world. This release can help any company that lacks AWS 
expertise to get started quickly.

However, there are certain aspects that AWS cannot do for you, such as draft policies. 
In the post, we will review some of the key [HIPAA](https://onica.com/amazon-web-services/hipaa-compliant-aws-solutions/) security requirements that will help with meeting compliance 
controls. You can apply what you learn here to your environment in conjunction with the 
AWS HIPAA QuickStart template.

### AWS Identity and Access Management (IAM)

The first aspect we want to cover is IAM (Identity and Access Management). HIPAA doesn’t 
mandate it, but highly suggests that a centralized authentication system be utilized. 
Let’s say your company has an on-premises solution and is spinning up a new or existing 
AWS&reg; cloud solution. You would want to link the [AWS console](https://onica.com/amazon-web-services/) into your on-premises authentication methods rather than creating individual users within IAM. 
There are many examples out there on how to achieve this, but there’s an AWS document 
located [here](https://docs.aws.amazon.com/directoryservice/latest/admin-guide/cloud_prereq.html) that you can use to help with configuring.

Following basic security principles, users should only have access to achieve their day-to-day tasks. 
For example, your accounting department doesn’t need access to modify security groups, they should only have rights to the billing of AWS. Another example would be that you wouldn’t want your development team 
changing the instance types of applications in production, so your developers shouldn’t have access 
to production instances. This concept is known as least-privilege; users only get access to what is 
absolutely required for them to perform their duties.

Why would [HIPAA](https://onica.com/amazon-web-services/hipaa-compliant-aws-solutions/) auditors 
want to see centralized authentication when they’re auditing the environment? Having a managed 
central authentication platform allows for easy removal, or disable of an employee that no longer 
requires access. Without centralized authentication management, there could potentially be a dozen, 
or more areas to disable a specific user. Often times, many users have access to applications or 
platforms that security isn’t aware of. Therefore, implementing centralized authentication allows you 
to ensure your users are disabled throughout the environment.

#### Security groups open to the world

The AWS HIPAA Quick Start already includes the security groups that you need built into it. However, 
it does not prevent users from modifying the CloudFormation templates or the security groups, 
potentially making a hazardous mistake. Hence the creation of the Config rule for port 22. 
This Config rule notifies users of your choice via SNS (Simple Notification Service) when port 22 
has been opened to the world and it’s crucial that information gathered from the Config rule is acted upon. 
The AWS HIPAA Quick Start Config rule only notifies your users, not remove the offending rule. 
Therefore, your security department would have to log in and remove the ingress rule for port 22 
that has been opened to the world. Quickly taking action on these alerts is a security best practice.

Utilizing Config rule and Lambda together enables a whole different suite of tools that you can 
customize to your organization’s needs. You can build a Lambda script to automatically remove 
ingress rules that violate your organization’s standards. For example, if you’re running a [Windows environment](https://onica.com/blog/whitepaper-automating-windows-workloads-aws/) you could write a Lambda function to remove the ingress rules that allow 3389 (RDP) from the world. Or, you could use the Config managed rule `restricted-common-ports` and specify your ports through there.

#### Logging

An important security aspect that many organizations often forget about is logging. Logging is vitally important, especially for [HIPAA compliance](https://onica.com/amazon-web-services/hipaa-compliant-aws-solutions/). Proving to your auditors that there are controls in place to mitigate risk is crucial. If an unauthorized login is successful on an application or instance, how will your security team be notified? 
What is the process around reacting to logs that have been identified as critical?

The AWS HIPAA Quick Start automatically enables access logs for both S3 and ELB. It’s important to forward SSH authentication attempts and successes to CloudWatch Events for logging (or another SIEM). If your application is architected in a way that it can log API or website logins, it would be worthwhile to forward those to a SIEM (Security information and event management) application for monitoring.

Monitoring login success and failure is a significant implementation and there are intrusions that don’t include actual SSH or RDP access. For example, malware or a trojan could send data to an unauthorized party. 
Monitoring network traffic in/out and identifying malicious countries or traffic patterns that don’t make sense to your application could help identify an intrusion as well. Even monitoring system resources could help identify an attack or intrusion. If an FTP server that is rarely used has suddenly spiked up to 100% CPU utilization, that would cause an alarm for potential intrusion or a script running gathering data.

When logging application data, logging sensitive information such as secret and access keys or passwords 
can allow unauthorized users to gather your most crucial information with little effort. When implementing application logging, ensure that the information you logged does not contain any credentials, PII, PHI, or any additional information considered classified.

Logs should be as secure as your most sacred application. You don’t want users modifying logs, this would invalidate your log files. Protect your logs against user modification and configure your logs so you can only modify them via applications utilizing an EC2 role. Store your log files in a manner where only certain users can read them. When a user has access to modify your log files, these logs can no longer be trusted. It would be easy for an unauthorized party or employee to cover their tracks.

When someone who has access to remove log files wants to do so, enforce MFA (multifactor authentication) for the special administrative function. In the event their account is compromised; an unauthorized party will not be able to remove their tracks unless they can also obtain the MFA code for the action. However, if lifecycle policies are managed correctly, no user should need to remove log files as any action performed by a human is prone to error. Leveraging automation is a great way to ensure the stability of your environment and AWS gives us the tools to easily make automation a reality with S3 Bucket lifecycle policies.

#### VPC

A simple concept that many organizations lose track of is the segmentation of the network, segmenting the EC2 instances from the databases, specifically. Controlling the access to the database to a specific security group so only certain instances can communicate to the database is vital. By doing this, you’re denying access to any resource if it wishes to establish a connection to the RDS instance if it is not part of the security group. Also, another setting to be conscious of is opening the RDS instance to be internet-accessible. By making sure the RDS instance is not internet-accessible, no external resource will find the database to try and attack.

Utilizing security groups is a great way to segment your VPC. But there is another aspect that many forget about; NACLs (Network Access Control List). Properly implementing ACCEPT/DENY rules within the NACLs will block traffic incoming or outgoing from any resource within the VPC. For example, blocking 3306 to the internet would be useful even if you specify it in your security group. This implements another step to protect your environment from someone making a change that could expose your database to the internet. If someone unknowingly opened 3306 on a security group to the internet, the NACL would still block access.

#### AWS HIPAA Quick Start next steps

As mentioned before, the [AWS HIPAA Quick Start](https://onica.com/amazon-web-services/hipaa-compliant-aws-solutions/) solves most of the technological requirements you need, but it cannot develop policies and procedures for your organization. We help partner with organizations to develop new AWS cloud architectures and help draft and implement policies. Please [contact us](https://onica.com/contact/) to learn more or check out our past [HIPAA posts](https://onica.com/?s=hipaa).

<a class="cta blue" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
