---
layout: post
title: "AWS Systems Manager run command simplifies hybrid cloud management"
date: 2020-11-30
comments: true
author: Rackspace Onica Team
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "AWS Systems Manager run command simplifies hybrid cloud management"
metaDescription: "Although a hybrid cloud environment is not always ideal, clients who are 
facing certain limitations in their workloads might need it. If that’s your situation, we want to make sure 
you’re setting up your hybrid cloud architecture correctly."
ogTitle: "AWS Systems Manager run command simplifies hybrid cloud management"
ogDescription: "Although a hybrid cloud environment is not always ideal, clients who are 
facing certain limitations in their workloads might need it. If that’s your situation, we want to make sure 
you’re setting up your hybrid cloud architecture correctly."
slug: "aws-systems-manager-run-command-simplify-hybrid-cloud-management"
canonical: https://onica.com/blog/containers/aws-system-manager/

---

*Originally pubished in May 2019, at Onica.com/blog*

Although a hybrid cloud environment is not always ideal, clients who are 
facing certain limitations in their workloads might need it. If that’s your situation, we want to make sure 
you’re setting up your hybrid cloud architecture correctly.

<!--more-->

### What is AWS Systems Manager?

AWS&reg; Systems Manager&reg; is a valuable resource for quickly assessing operational insights and 
taking action in both AWS and on-premises environments. **AWS Systems Manager** gives you visibility 
and control of your AWS infrastructure and allows you to automate operational tasks 
across your AWS resources. It provides a unified user interface so you can view operational data 
from multiple AWS services, thereby shortening the time it takes to find and fix operational problems 
and making it simple to manage your infrastructure securely at scale.

In this post, Onica’s Brandon Pierce and Roy Kalamaro share use cases and demonstrate how organizations 
can use AWS Systems Manager to simplify hybrid environment operations, enabling you 
to significantly reduce operational overhead and manual procedures.

### Managing hybrid workloads with AWS Systems Manager

On-premises servers are a limiting factor in hybrid infrastructures and are often unable to integrate 
with the capabilities of cloud services or communicate seamlessly with cloud counterparts.

[AWS Systems Manager](https://aws.amazon.com/systems-manager/) offers unprecedented insights and access 
with a unified **user interface** (UI) that includes information from a multitude of AWS services and on-premises 
servers. **AWS Systems Manager** uses a lightweight agent installed on servers to provide visibility, eliminating 
communications challenges faced in most hybrid environments.

At Onica, a Rackspace Technology company, we use AWS Systems Manager to simplify resource grouping 
while leveraging access to automated command execution. This previously would have been documented in a manual 
Standard Operating Procedure (SOP) and runbooks to execute manual actions.

Through [AWS Systems Manager](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html), 
we can provide contextual information to Amazon&reg; CloudWatch&reg; alarm notifications.

Following, you can see some ways our team has found value in the automation provided by AWS Systems Manager.

### Remote Management of Hybrid Environments at Scale

When we need to manage systems on-premises for clients, the [AWS Systems Manager Agent](https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent.html (SSM Agent) allows for seamless management using the same console, API, automation, and tooling that we would utilize within AWS.

One of the main challenges we have faced when working in a hybrid environment has been using a 
single management tool for control and orchestration of Windows&reg; and Linux&reg; across multiple hosting platforms.
SSM Agent can monitor the heartbeat of [Amazon Elastic Compute Cloud](https://aws.amazon.com/ec2/) 
(Amazon EC2) instances, as well as that of remote on-premises servers. Additionally, it allows our team to run commands 
and verify output regardless of the OS, hypervisor, or platform.

In Figure 1, you can see orchestration on Windows and Linux servers across multiple hosting platforms and AWS Regions by
using AWS Systems Manager.

At Onica, we capture instance-level metrics using [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/), 
whose agent collects the custom and standard metrics from these instances and sends them to 
[CloudWatch logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html). 
We configured CloudWatch alarms in response to specific metrics (CPU Utilization, RAM, DiskWriteOps, and so on) 
that are deemed critical for customer workloads to function effectively.

### Alarm enrichment solution

One challenge we faced was meeting customer requirements for real-time notification to stakeholders with 
relevant Windows/Linux OS and application-level health data when these CloudWatch Alarms are triggered. 
In response, our team at Onica developed an Alarm Enrichment solution that uses Amazon CloudWatch and 
AWS Systems Manager services in a hybrid environment.

This solution uses AWS Systems Manager to collect additional information about the impacted system 
and includes that information in the ticket to an engineer.

### Automated runbook execution

A typical operational challenge is the timely and proper execution of runbooks during an incident or 
maintenance exercise. Depending on the number of impacted systems, there may be a large number of 
engineers involved in remediation. More critically, there’s the risk of human error due to
improper compliance with SOPs.

Traditional solutions to these problems involve custom scripts or third-party orchestration software. 
These solutions often have large price tags or require separate efforts to maintain complex systems in 
and of themselves. They don’t scale into the cloud very well, because they're not appropriate for 
such dynamic environments.

The goal for automated runbook execution is to reduce the engineering effort and any downtime 
associated with customer application failures. You can achieve this in a cloud-native manner by using 
AWS Systems Manager and Amazon CloudWatch. We monitor the CloudWatch logs for specific values or 
patterns using CloudWatch alarms to detect abnormal application or process-level errors and use 
AWS Systems Manager to perform the remediation activities.

To view the use cases and more details, click [here](https://aws.amazon.com/blogs/apn/simplifying-hybrid-cloud-management-using-aws-systems-manager-run-command/).

### Conclusion

[AWS Systems Manager](https://aws.amazon.com/systems-manager/) simplifies hybrid cloud management. 
It makes the oversight of thousands of instances and virtual machines running over eight different 
operating systems no more challenging than managing a few instances running in a single 
availability zone. For our team at Onica, this has resulted in deprecating previous hybrid management 
solutions from third parties that are costly to implement and maintain.

With AWS Systems Manager, we also reduced weekly helpdesk tickets and automated alerts 
by five percent, translating to roughly ten percent reduction in the human effort required to support the 
same amount of resources. We foresee additional savings over time as operational efficiency continues 
to increase, and we launch new workloads with these strategies.

<a class="cta purple" id="cta" href="https://www.rackspace.com/onica">Learn more about our AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
