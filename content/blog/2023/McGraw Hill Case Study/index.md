---
layout: post
title: "McGraw Hill supports the education journeys of millions around the world."
date: 2023-03-31
comments: true
author: Michael Bordash
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: "Michael is a Principal Cloud Practice Architect at Rackspace Technology"
published: true
authorIsRacker: true
categories:
    - Customer Case Study
    - Technical Use Case
metaTitle: "McGraw Hill supports the education journeys of millions around the world."
metaDescription: "This leader in education delivers world-class services via secure cloud native applications designed to aid its future expansion."
ogTitle: "McGraw Hill supports the education journeys of millions around the world."
ogDescription: "This leader in education delivers world-class services via secure cloud native applications designed to aid its future expansion."
slug: "mcgraw-hill-supports-the-education-journeys-of-millions-around-the-world"

---

This leader in education delivers world-class services via secure cloud native applications designed to aid its future expansion.


<!--more-->

                              <iframe width="560" height="315" src="https://www.youtube.com/embed/O1n9egUuP48" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**Customer Overview**

Since its founding in 1888, McGraw Hill has been a leader in education. Today, with operations throughout the world, millions of students and instructors rely on McGraw Hill to support their educational journey. 

Rackspace Technology® has worked in partnership with McGraw Hill for many years. Most recently, McGraw Hill has engaged the Rackspace Elastic Engineering team to transform existing processes within its Amazon Web Services (AWS) environment. One notable transformation project involves a core component of many enterprise customers’ cloud environments: building, distributing and managing the lifecycle of customized **Amazon Machine Images (AMIs).**


#### Problem Statement

Creating, maintaining, and governing customized images to meet organizational policies can be both labor-intensive and unsustainable at scale.  An optimal solution must be highly automated, resilient, and integrated into pre-existing workflows to empower business growth and innovation.

**Background**

Security and compliance are paramount for McGraw Hill. While their current workflow already incorporated many industry-standard security best practices, they knew adopting a cloud-native solution would improve operational excellence and developer experience. The solution Rackspace Elastic Engineering delivered reduced the complexity of securing and managing multiple third-party components by introducing workflow orchestration between internal teams and third-party tools and eliminated unnecessary or redundant handoffs.


McGraw Hill's legacy AMI process supported multiple base operating systems, including various Linux distributions and Microsoft Windows versions. Development teams would build application-specific requirements on top of these base AMIs, contributing to the undifferentiated administrative burden and introduced multiple standards that made governance more complex. Rackspace Elastic Engineering began managing many application-specific AMIs and recommended a solution to automate and standardize the build process. The component-based model of AWS EC2 Image Builder was a perfect opportunity to minimize duplication while supporting the development of an automated pipeline for all AMI builds.



*Figure 1 describes the legacy build process. Note the multiple actors involved and entry points.*

<img src=Picture1.png  Title= "" alt="">

       *Figure 1*

**Solution Overview**

The Rackspace Elastic Engineering team determined that replacing the core AMI build processes with EC2 Image Builder would be the ideal platform to standardize building custom AMIs for McGraw Hill. Once the AMI is built by Image Builder, AWS Step Functions help orchestrate the remaining steps of the end-to-end process. By leveraging Image Builder’s integration with AWS Organizations, the distribution and governance of AMIs is easily managed. 

*Figure 2 provides an overview of the EC2 Image Builder based solution.*

<img src=Picture2.png title="" alt="">

       *Figure 2*

#### The Rackspace Elastic Engineering solution has some key improvements, specifically:

-	Decoupled architecture supporting asynchronous steps and retry mechanisms.
-	Robust governance and security controls, including encryption enforcement.
-	Automated security scanning integration and codified approvals workflow following principles of least privilege.
-	Reusable components to support various architectures and versions of operating systems.
-	Automated ChatOps notifications with a custom Slack app supporting user interactions.





**Technical Deep Dive**

#### Process Deep Dive
The AWS EC2 Image Builder pipelines are triggered via CloudWatch Events. Each AMI build uses a dedicated pipeline allowing for complete control over the frequency of builds. All build artifacts are sourced from AWS S3 and JFrog Artifactory. Package repository mirrors are configured in Artifactory improve visibility, governance, and reduce network latency of project dependencies. JFrog Xray is used to scan all artifacts stored within Artifactory. The AWS EC2 Image Builder pipelines and components are all managed via Terraform and stored within GitHub.


Once a build is completed, AWS Step Functions are leveraged to facilitate the remainder of the build process. AWS Simple Queue Service (SQS) is used to decouple workflow activities to ensure the build process does not fail due to timeout from a long-running or asynchronous step. This was necessary due to a 24-hour execution limitation on AWS EC2 Image Builder pipelines. For example, AMI approval incorporates a manual and a third-party service response. When a candidate AMI is ready for scanning, an EC2 instance is launched, and a custom lambda interacts with the Rapid7 REST API to initiate a review of the resource. This design minimizes the burden on the security team and provides an audit trail of approval activity within Slack. 

*Figure 3 demonstrates an example of a Slack notification with interactive links.*

<img src=Picture3.png title="" alt="">

       *Figure 3*

The custom Slack application relies upon an AWS Lambda function, fronted by an AWS Application Load Balancer (ALB). The ALB uses OpenID Connector (OIDC) integration with McGraw Hill's enterprise Identity Provider to ensure authentication and authorization controls are met.

*Figure 4 shows the mechanisms involved when a security engineer interacts with the Slack message.*

<img src= Picture4.png title="" alt="">

       *Figure 4*

Once approved, the distribution process is executed via AWS Organizations integration. All AMIs are recorded via AWS DynamoDB, providing a centralized mechanism to govern images throughout their lifecycle. After an AMI is approved and distributed, there needs to be a mechanism to revoke AMIs that are no longer safe and prevent obsolete AMIs from being launched.

A custom AWS Lambda function compares the list of currently shared AMIs with the DynamoDB tracking table, and if an AMI is no longer approved for use it is automatically unshared from the AWS organization, preventing future EC2 launches from using the AMI. 

The last step of the process is distribution notification. The step function that handles this component publishes an event to an AWS EventBridge event bus for child accounts, which will listen for an AMI distribution event. This enables and empowers each application team to create event rules that can trigger automatic AMI rotation for their infrastructure.

*Figure 5 shows an example build notification triggering an application deployment pipeline to rotate an AMI.*

<img src=Picture5.png title="" alt="">

        *Figure 5*

#### Additional security measures

McGraw Hill has a security mandate to encrypt all volumes at rest. The solution supports full end-to-end encryption of all Elastic Block Store (EBS) volumes. All AMIs are encrypted using a dedicated Key Management Service (KMS) customer-managed key that is trusted by the AWS Organization. This allows each account to decrypt the AMI and re-encrypt with account-specific keys that are managed by the application teams. When using service-linked roles, such as AWS EC2 Auto Scaling, an additional step is required to complete the permissions grant. A CloudFormation custom resource was developed to fulfill this requirement, enabling AWS Auto Scaling’s service role to launch an encrypted AMI. This was critical since McGraw Hill relies heavily on auto-scaling to provide a scalable and resilient platform.

*Figure 6 shows the end-to-end encryption support for service-linked roles.*

<img src=Picture6.png title="" alt="">

         *Figure 6*


*Figure 7 provides an overview of the KMS Grant mechanism.*

<img src=Picture7.png title="" alt="">

           *Figure 7*


A dedicated account was provisioned for all EC2 Image Builder operations following AWS Organizations best practices, and simplified implementation of identity and network controls. Network access control lists (NACLs) were developed to filter ingress and egress network traffic not necessary for building an AMI. AWS Service Control Policies (SCPs) were implemented to enforce use of sanctioned AMIs throughout the environment. Finally, a custom Lambda function detects and remediates EC2 instances that are no longer in use, thereby reducing potential risk of unmanaged devices on network as well as increasing overall efficiency of resource utilization.


**Outcome**

Rackspace Technology transformed and modernized McGraw Hill's custom AMI build process by creating a cloud-native solution that supports end-to-end automation, robust security controls and reusable components to support future expansion. Enabling McGraw Hill to focus on delivering world class applications and educational services rather than manage their custom AMI build process is just one of the ways that the Rackspace Elastic Engineering team supports and creates value for our clients.  





<a class="cta purple" id="cta" href="https://www.rackspace.com/cloud/elastic-engineering"> How can Rackspace Elastic Engineering help transform your business processes? Reach out to us and find out.</a>



Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).