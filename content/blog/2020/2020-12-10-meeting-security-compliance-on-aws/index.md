---
layout: post
title: "Meeting security compliance on AWS"
date: 2020-12-10
comments: true
author: Rackspace Onica Team
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "Meeting security compliance on AWS"
metaDescription: "Making infrastructure changes can be a daunting task for any company, particularly when a misstep could mean violating the compliance required to serve its customers."
ogTitle: "Meeting security compliance on AWS"
ogDescription: "Making infrastructure changes can be a daunting task for any company, particularly when a misstep could mean violating the compliance required to serve its customers."
slug: "meeting-security-compliance-on-aws"
canonical: https://onica.com/blog/security/aws-soc-compliance/

---

*Originally published in Feb 2019, at Onica.com/blog*

Making changes to infrastructure can be a daunting task, particularly when a misstep could mean violating the compliance
required to serve its customers. This post discusses how a FinTech business providing SaaS solutions to an outdated industry
turned to Onica, a Rackspace Technology company, to update their platform-supplied browser and mobile-based apps for
the Real Estate industry. 
  

<!--more-->

### Infrastructure with a security and compliance focus

The Fintech company sought to develop and maintain client documents and particulars, while maintaining *SOC 2 compliance* and
improving posture for its infrastructure and applications in AWS&reg;. Onica's insight in terms of best practices, security,
performance, and cost optimization proved to be the best choice.

### What is SOC compliance?

Service Organization Control 2 (SOC 2) compliance, developed by the American Institute of Certified Public
Accountants (AICPA), is a regulation that ensures the systems of service providers that store customer data
in the cloud include standardized levels of security, availability, and confidentiality. AWS Cloud Compliance
enables users to maintain security and data protection in the cloud.

Because it handles important financial data, the company is SOC 2 compliant, which means it maintains various
organizational controls related to security, availability, processing integrity, confidentiality, and privacy.
As such, the company must routinely go through SOC 2 compliance audits and is therefore hyper-vigilant when it
comes to data security.

This focus on security and compliance is why the company knew that it needed a partner to develop solutions for
AWS services and infrastructure. While the company had some of the right skills internally, it lacked the depth
of knowledge that an AWS partner could offer. The company already had a footprint in an AWS staging account and
had developed CloudFormation code to deploy its infrastructure using services, such as EC2&reg;, ECS, Elasticsearch,
ElastiCache&reg;, RDS, Route 53&reg;, S3, SNS, SQS, and VPC&reg;.

### A partner with the right expertise

The company had already been experimenting with the AWS platform and had had some early successes, so the team didn’t
consider any other cloud provider. When it came to finding a partner to help with the solution and bring a high-level
of AWS expertise to the project, it looked for an organization that not only had a great reputation for its high-quality
work but provided a strong approach right out of the gate. After first encountering Rackspace Onica at a conference and
recognizing its premier partnership status within the AWS partner network, the company invited them to a meeting.

### What is compliance in AWS?

Compliance is taken seriously in AWS and built to be compatible with a variety of compliance programs from around the globe.
Across the regulated industry, organizations with some of the most highly sensitive data, such as the US Department of Defense,
Nasdaq&reg;, and Philips&reg;, trust AWS compliance measures.

After that meeting, the company engaged with Onica for several services, including cloud enablement, disaster recovery, secure
your AWS tenancy, DevOps enablement, and DevSecOps. The company wanted to have updates developed for backups, infrastructure
automation, encryption, and Docker&reg; image deployments. Updating each area would provide faster and more consistent infrastructure
and image deployments, as well as greater security for infrastructure, data, and data backups.

### From audit to escrow

The first phase of the project was to audit and report on the security, reliability, performance, and cost optimization of the
current infrastructure. Onica performed an audit against the AWS well-architected framework, as well as security scans using
automation tools backed by CIS benchmarks for AWS. Reporting and integrating the results into the overall solution that was
implemented thereafter.

Onica used an agile approach for initiating, tracking, and delivering story-and-task-based solutions. Known work and work discovered
from the audits were broken into epics, stories, and tasks, then assigned to users for development, and tracked and managed using
Atlassian Jira. This provided an efficient and reliable way to manage work and move it forward quickly.

The third challenge was to develop a backup solution for S3 objects and RDS databases. To complete this, we created a new and secured
AWS account called *escrow* to host data backups for S3 objects and RDS snapshots. We developed an event-driven backup solution that
copied all S3 objects and RDS snapshots from the environment accounts to their correlating escrow account. This ensured that in the
event of a compromised environment account, the backups remained secured in the escrow account.

### Infrastructure orchestration

Next, Onica reviewed all of the existing CloudFormation code. Then we updated and integrated it into a new framework and Git repository
so that we could use an orchestration tool with the code. This solution improved development times, deployment speed for AWS resources,
and execution order.

The Onica team also developed an encryption strategy for both data and data backups. Encryption was a requirement for S3, RDS, and
Elasticsearch data, as well as Lambda variables and SSM parameters. We created separate customer-managed customer master keys (CMK)
for each of the resource types to ensure encryption security was unique. Also, during the event-driven backup process of S3 and RDS
data to the escrow account, we unencrypted the data by using the initial CMK and encrypted it again by using the correlating CMK in
the escrow account.

Finally, Onica developed a proof-of-concept solution for a blue-green Docker image delivery by using AWS developer tools including
CodePipeline and CodeBuild. As we updated Dockerfile and application components to GitHub&reg;, CodePipeline cloned the source upon
triggering, built the Docker image, then authenticated and pushed the image to Amazon ECR. Docker then deployed the new image to a
new Amazon ECS task revision for a correlating *green-labeled* service and sent out an SNS-based approval for testing. After the
*green* service testing was complete and approved, a Lambda function updated the correlating Application Load Balancer listeners
and target groups and updated the CodePipeline deployment stage from `green` to `blue` for subsequent deployments.

### Different companies, one team

While the engagement did include some formal training, most of the knowledge transfer happened informally, in real-time.

Since the implementation, the company now possesses an improved posture for security, reliability, performance, cost
optimization, deployments, and infrastructure orchestration. Additionally, the company has enjoyed increased employee
efficiency, workflow, and delivery processes through the use of orchestration tooling. They also experience event-driven
infrastructure processes and improved manageability and flexibility by using orchestration tooling and enhanced security
with the implementation of customer-managed CMKs and data backups stored in a separate and secured account.

The company now relies upon the Rackspace Onica managed services team to deliver monitoring and alerting solutions for the
infrastructure. This relationship is very proactive, with the Onica team always providing ideas about what they should spend
their time on.

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.

<a class="cta teal" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>
