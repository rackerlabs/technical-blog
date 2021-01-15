---
layout: post
title: "AWS WAF pillar one: Operational excellence tools and best practices"
date: 2021-01-15
comments: true
author: Rackspace Onica Team
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "AWS WAF pillar one: Operational excellence tools and best practices"
metaDescription: "Operational Excellence is one of the five *pillars*, or areas of
focus in the AWS WAF. The AWS WAF Operational Excellence Pillar covers best practices around
developing robust, repeatable processes for all aspects of managing your cloud infrastructure."
ogTitle: "AWS WAF pillar one: Operational excellence tools and best practices"
ogDescription: "Operational Excellence is one of the five *pillars*, or areas of
focus in the AWS WAF. The AWS WAF Operational Excellence Pillar covers best practices around
developing robust, repeatable processes for all aspects of managing your cloud infrastructure."
slug: "aws-waf-pillar-one-operational-excellence-tools-and-best-practises"
canonical: https://onica.com/blog/managed-services/aws-waf-operational-excellence/

---

Harnessing the full power of the [AWS&reg; cloud](https://onica.com/amazon-web-services/)
involves far more than building a solid technical infrastructure. Amazon developed the
[Well-Architected Framework (WAF)](https://aws.amazon.com/architecture/well-architected/)
to enable companies to build the most operationally excellent, secure, reliable, efficiently
high-performing, and cost-optimized infrastructure possible for their businesses. This post
addresses the first pillar, *operational excellence*.

<!--more-->

Business operations play an increasing role in how companies can truly transform business
through cloud computing. Operational excellence is one of the five *pillars*, or areas of
focus in the AWS WAF. The AWS WAF operational excellence pillar covers best practices around
developing robust, repeatable processes for all aspects of managing your cloud infrastructure.

### Operational Excellence in the AWS cloud starts with preparation

Like a pilot runs through a pre-flight checklist before takeoff, AWS recommends you use
operational checklists to ensure that your workloads are ready for production operation and
prevent migrating untested workloads to production.

### Operational excellence checklists

Create and use these checklists for operational excellence in AWS:

- **Operational checklist**: Create an operational checklist that you use to evaluate if
  you are ready to operate the workload.
- **Planning checklist**: This may seem redundant, but it is important to have a plan that
  syncs with company events, milestones, and roadmaps to stay in front of events that might
  cause sudden increases in traffic and requests for specific resources, where network
  performance could impact a company’s revenue or reputation.
- **Security checklist**: Security is among the most misunderstood features of the cloud.
  You should develop and use a detailed security checklist to ensure that you are ready to
  securely operate the workload and respond to any security event or attack.

### AWS configuration management best practices

You should document how you monitor, measure, and manage your architecture, environments,
and the configuration parameters for resources within them to easily identify components
for tracking and troubleshooting.

Changes to configurations should also be trackable and automated. Within a Configuration
Management Database (CMDB), you should record a detailed resource tracking program by using
tags and metadata and thorough, accessible documentation of your entire architecture and
infrastructure configuration.

### Automate cloud deployment for operational excellence

Automation can take human error out of the operational excellence equation. You should
include regular quality assurance testing and defined mechanisms that can continually track,
audit, rollback, and review changes as warranted.

#### Best practices for AWS deployment automation include:

- Develop a deployment pipeline (such as a source code repository, build systems, deployment,
  and testing automation) with standard automated procedures for continuous integration and
  continuous development (CI/CD).
- Have an automated release management process.
- Design a process to revert changes if they produce operational issues.
- Create risk management strategies ( such as blue/green, canary, A/B testing) to assess
  risks continually.
- Use system monitoring with CloudWatch&reg; to monitor system performance.
- Set alarms and notifications based on key performance thresholds that indicate problems
  or opportunities for improvement.
- Automate actions based on performance, such as using Auto Scaling to add capacity based
  on current conditions automatically.
- Track and save logs, including application logs, AWS service-specific logs, and VPC flow
  logs by using CloudTrail&reg; to troubleshoot and review performance.

### Respond efficiently in AWS

Responding to network problems is as important as preventing them in the first place. You
should be prepared to automate responses as much as possible, including alerts and
notifications as well as actions and recovery. It is also important to have escalation
procedures in place to get the right issue to the right resources as quickly as possible.

#### Best practices for responding to unplanned events include:

- Create an event response playbook that everyone follows. The playbook defines escalation
  guidelines and procedures and identifies the circumstances for when you should activate it.
- Automate responses as much as possible, such as using Auto Scaling to instantly add
  capacity when the system passes critical load thresholds.
- Develop a Root Cause Analysis (RCA) to ensure that you can resolve, document, and fix
  issues so that they do not happen in the future. Make sure you’re not just fixing symptoms
  of a deeper problem.
- Develop an escalation process that puts the necessary stakeholders and systems in place
  for receiving alerts when escalations occur.
- Automate escalation as much as possible based on demand or time thresholds, sending the
  issue to the right resources.
- Create an automated escalation queue between appropriate functional teams based on
  priority, impact, and intake mechanisms.
- Use a demand- or time-based approach to escalate higher in the organization as impact,
  scale, or time to resolution and recovery of an incident increases.
- Define when external escalation to AWS or an AWS partner would be engaged.

### Conclusion

The AWS Operational  Excellence pillar focuses on running and monitoring systems to deliver
business value and continually improving processes and procedures. It helps organizations
spread the benefits of cloud adoption beyond the IT department. It also ensures that the
cloud infrastructure can efficiently manage changes, respond to events, and automate
standards-based tasks and processes to successfully manage daily operations.

Learn more about the other Well-Architected Framework pillars in this series:

- Security
- Reliability
- Performance Efficiency
- Cost Optimization

<a class="cta red" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
