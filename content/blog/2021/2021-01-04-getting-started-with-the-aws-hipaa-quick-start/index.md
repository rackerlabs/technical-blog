---
layout: post
title: "Getting started with the AWS HIPAA QuickStart"
date: 2021-01-04
comments: true
author: Matt Charoenrath
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-U0118EALE77-fa48a7c11b02-72'
bio: "Marketing leader experienced in growing brands while scaling and 
modernizing marketing organizations through a balance of creativity, 
process, and technology to captivate audiences and achieve results."
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "Getting started with the AWS HIPAA QuickStart"
metaDescription: "The AWS HIPAA (Health Insurance Portability and Accountability Act) QuickStart release features a turn-key
solution for companies who want to put HIPAA data into the cloud securely."
ogTitle: "Getting started with the AWS HIPAA QuickStart"
ogDescription: "The AWS HIPAA (Health Insurance Portability and Accountability Act) QuickStart release features a turn-key
solution for companies who want to put HIPAA data into the cloud securely."
slug: "getting-started-with-the-aws-hipaa-quick-start"
canonical: https://onica.com/blog/security/getting-started-with-the-aws-hipaa-quick-start/
---

*Originally published in Feb 2017, at Onica.com/blog*

The AWS&reg; Health Insurance Portability and Accountability Act (HIPAA) QuickStart release 
features a turn-key solution for companies who want to put HIPAA data into the cloud securely. 

<!--more-->

While providing the CloudFormation&reg; used to deploy the environment, the AWS HIPAA QuickStart 
release covers everything from dedicated tenancy to setting up AWS Config rules and notifying users 
if port 22 (SSH) is open to the world. This release can help any company that lacks AWS 
expertise to get started quickly.

However, there are certain aspects that AWS cannot do for you, such as draft policies. 
This post reviews some of the key [HIPAA](https://onica.com/amazon-web-services/hipaa-compliant-aws-solutions/) security
requirements that help you meet compliance controls. You can apply what you learn here to your environment in conjunction
with the AWS HIPAA QuickStart template.

### AWS Identity and Access Management (IAM)

The first aspect we want to cover is IAM (Identity and Access Management). HIPAA doesn’t 
mandate it but highly suggests that you use a centralized authentication system. 
Let’s say your company has an on-premises solution and is spinning up a new or existing 
AWS cloud solution. You would want to link the [AWS console](https://onica.com/amazon-web-services/) into your on-premises
authentication methods rather than creating individual users within IAM. There are many examples out there on how to achieve this,
but [here’s](https://docs.aws.amazon.com/directoryservice/latest/admin-guide/cloud_prereq.html) an AWS document you can use to help
with configuration.

Following basic security principles, users should only have access to achieve their day-to-day tasks. 
For example, your accounting department doesn’t need access to modify security groups. They should only
have rights to AWS billing. Another example: You don’t want your development team 
changing the instance types of applications in production, so your developers shouldn’t have access 
to production instances. This concept is known as *least-privilege*. Users get access to only what is 
absolutely required for them to perform their duties.

Why would [HIPAA](https://onica.com/amazon-web-services/hipaa-compliant-aws-solutions/) auditors 
want to see centralized authentication when they’re auditing the environment? Having a managed
central authentication platform allows you to easily remove or disable an employee that no longer
requires access. Without centralized authentication management, there could a dozen or more areas
could potentially disable a specific user. Often, many users have access to applications or 
platforms that security isn’t aware of. Therefore, implementing centralized authentication allows you 
to ensure your users are disabled throughout the environment.

### Security groups open to the world

The AWS HIPAA Quick Start already includes the security groups that you need built into it. However, 
it does not prevent users from modifying the CloudFormation templates or the security groups, 
potentially making a hazardous mistake. Hence, you need the Config rule for port 22. 
This Config rule notifies users of your choice via SNS (Simple Notification Service) when you open port 22 
to the world and recipients must act on that information gathered from the Config rule. 
The AWS HIPAA Quick Start Config rule only notifies your users and does not remove the offending rule. 
Therefore, your security department needs to log in and remove the ingress rule for port 22 
that has been opened to the world. Quickly taking action on these alerts is a security best practice.

Using Config rules and Lambda together enables a whole different suite of tools that you can 
customize to your organization’s needs. You can build a Lambda script to remove ingress rules
that violate your organization’s standards automatically. For example, if you’re running a
[Windows&reg; environment](https://onica.com/blog/whitepaper-automating-windows-workloads-aws/), you could write
a Lambda function to remove the ingress rules that allow 3389 (RDP) access from the world. Or, you could use the Config-managed
rule `restricted-common-ports` and specify your ports through there.

### Logging

An important security aspect that many organizations often forget about is logging. Logging is vitally important, especially
for [HIPAA compliance](https://onica.com/amazon-web-services/hipaa-compliant-aws-solutions/). Proving to your auditors that
you have controls in place to mitigate risk is crucial. If an unauthorized login is successful on an application or instance,
how does the system notify your security team? What process around reacting to logs have you identified as critical?

The AWS HIPAA Quick Start automatically enables access logs for both S3 and ELB. It’s important to forward SSH authentication
attempts and successes to CloudWatch&reg; Events for logging (or another Security Information and Event Management (SIEM) tool).
If your application is architected to log API or website logins, forward those to a SIEM application for monitoring.

Monitoring login success and failure is a significant implementation, and some intrusions don’t include actual SSH or RDP access.
For example, malware or a trojan could send data to an unauthorized party. Monitoring network traffic in or out and identifying
malicious countries or traffic patterns that don’t make sense to your application could help identify an intrusion as well. Even
monitoring system resources could help identify an attack or intrusion. If an FTP server that you rarely used suddenly spikes
up to 100% CPU utilization, that should cause an alarm for potential intrusion or a script running gathering data.

When logging application data, logging sensitive information such as secret and access keys or passwords 
can allow unauthorized users to gather your most crucial information with little effort. When implementing application logging,
ensure that the information you logged does not contain any credentials, PII, PHI, or any additional information considered classified.

Logs should be as secure as your most sacred application. You don’t want users modifying logs, which would invalidate your log files.
Protect your logs against user modification and configure your logs so you can only modify them via applications utilizing an EC2 role.
Store your log files in a manner where only certain users can read them. When a user has access to modify your log files, you can no
longer trust those logs. An unauthorized party or employee could cover their tracks easily.

When someone who has access to remove log files wants to do so, enforce MFA (multifactor authentication) for the special administrative
function. If their account is compromised, an unauthorized party cannot remove their tracks unless they can also obtain the MFA code for
the action. However, if you manage lifecycle policies correctly, no user should need to remove log files because any action performed by
a human is prone to error. Leveraging automation ensures the stability of your environment, and AWS gives us the tools to make
automation a reality with S3 Bucket lifecycle policies easily.

### Virtual Private Cloud (VPC)

A simple concept that many organizations lose track of is the segmentation of the network&mdash;segmenting the EC2 instances from the databases,
specifically. Controlling the access to the database to a specific security group so only certain instances can communicate to the database
is vital. By doing this, you deny access to any resource trying to establish a connection to the RDS instance if it is not part of the
security group. Also, another setting to be conscious of is opening the RDS instance to be internet-accessible. By making sure the RDS
instance is not internet-accessible, no external resource can find the database and attack it.

Using security groups is a great way to segment your VPC. But there is another aspect that many forget about: Network Access Control
Lists (NACLs). Properly implementing *ACCEPT* and *DENY* rules within the NACLs block incoming or outgoing traffic from any resource
within the VPC. For example, blocking port 3306 to the internet would be useful even if you specify it in your security group. This
implements another step to protect your environment from someone making a change that could expose your database to the internet.
If someone unknowingly opened port 3306 on a security group to the internet, the NACL would still block access.

### AWS HIPAA Quick Start next steps

As mentioned before, the [AWS HIPAA Quick Start](https://onica.com/amazon-web-services/hipaa-compliant-aws-solutions/) solves most
of the technological requirements you need, but it cannot develop policies and procedures for your organization. We partner with
organizations to develop new AWS cloud architectures and help draft and implement policies. Contact us to learn more or check out
our past [HIPAA posts](https://onica.com/?s=hipaa).

<a class="cta blue" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
