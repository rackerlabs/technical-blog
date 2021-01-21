---
layout: post
title: "The importance of implementing CI/CD Pipelines on the Cloud"
date: 2021-01-22
comments: true
author: Mency Woo
bio: "Seven-time AWS-certified and twice GCP-certified Cloud solutions architect.
Diverse experience in DevOps, CI/CD, and infrastructure as code. Passionate about
the intersection of business interests and technological innovations,
design/implementation of scalable tools and processes that align
business requirements, R&D endeavors, and IT initiatives."
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "The importance of implementing CI/CD pipelines on the cloud."
metaDescription: "Cloud promotes economy of scale, removes wild guessing of capacity, and converts operational costs from capital costs."
ogTitle: "The importance of implementing CI/CD pipelines on the cloud."
ogDescription: "Cloud promotes economy of scale, removes wild guessing of capacity, and converts operational costs from capital costs."
slug: "the-importance-of-implementing-ci-cd-pipelines-on-the-cloud"
canonical: https://onica.com/blog/cloud-native-development/the-importance-of-implementing-ci-cd-pipelines-on-the-cloud/
---

*Originally published in Aug 2018, at Onica.com/blog*

I started my career in the field of release management and subsequently CI/CD (Continuous Integration/Continuous Deployment). When I joined TriNimbus%reg; roughly four years ago to focus on AWS&reg; solutions, several people asked me: “Why the drastic transition?” My answer was: “It makes sense because Cloud without CI/CD is like buying a fancy car without a key.” 

<!--more-->

### Cloud and infrastructure codification

The past few years working with a diverse set of projects and clients have convinced me more that Cloud without Continuous Integration and Continuous Deployment are paramount to the operations of any bog Organization, and I will argue with more conviction than ever that proper cloud operations need CI/CD.

The longer version of the answer is heavily related to the advantages and benefits of the cloud. As AWS&reg; has eloquently put it, the cloud promotes economy of scale, removes wild guessing of capacity, and converts operational costs from capital costs. However, all this is predicated on some methodical—and timely—way to trigger/map changes to the actual user demand. If the resources are provisioned with step-by-step manual entry and clicks, it is very difficult to provision the resources based on needs in a timely fashion, not to mention how error-prone and soul-crushingly tedious the manual provisioning is.

AWS's operations rely heavily on their APIs. Every operation possible on the console can be made by calling the AWS API &mdash;in fact, the options of the individual AWS resources used to be exposed more extensively through the API than through the AWS console. That being said, the AWS console is catching up fast. Armed with the different flavors of SDKs, deployment of AWS infrastructure largely becomes a coding exercise that doesn't require spending time, and exerting risk to deploy an environment every time.

Especially after separating environment-specific configuration and environment-agnostic code, the same code base can deploy multiple stacks of infrastructure into different accounts and different regions. While AWS CloudFormation&reg; is the native service that manages the provisioning of AWS resources, other third-party tools &mdash;like Terraform can manage AWS resources in a repeatable and idempotent manner.

But as the infrastructure becomes increasingly codified, the same discipline to validate and test the infrastructure source code is well applicable too. More often than not, AWS infrastructure is not just a bunch of compute resources that are provisioned independently like several VMs on which applications run, but they are a list of concise resources that serve specific needs of an ideally highly available and scalable stack. As an example: a load balancer is often placed in front of a group of EC2&reg; instances that host the services.  While the resource can be provisioned independently, the security groups &mdash;firewalls, need to be configured in a way such that only the ports required by the specific applications are opened to make the stack functional while following the security best practice of minimizing the attack surface. It is practically impossible to provision a few static load balancers and instances and expect them to not evolve along with the needs and growth of the applications. 

All in all, when running on the cloud, the infrastructure is a first-class component of the product that grows hand-in-hand with the other services and applications that form the full product. Meanwhile, the infrastructure is the foundational layer on which all the services and applications of the product depend.

### Infrastructure CI/CD

To produce high-quality infrastructure, the CI/CD concept should also be applied to infrastructure source code. The infrastructure code is stored in a source code repository. Every change into the version control triggers a pipeline that validates the code before it gets packages in the artifact storage. During deployment &mdash;in this case, the creation of the infrastructure—corresponding checks takes place before and after the infrastructure update to ensure the integrity of the infrastructure and the validity of the source code. 

{{<img src="picture1.png" title="" alt="">}}

*Image 1: the basic workflow of an infrastructure CI/CD pipeline*

Traditional CI/CD tools &mdash;Jenkins&reg;, TeamCity&reg;, Bamboo&reg; can run the infrastructure CI/CD, to raise the infrastructure either from scratch or update from a specific baseline snapshot. However, AWS comes up with its own tools that allow the support of infrastructure CI/CD cost-effectively and efficiently.

#### Infrastructure CI/CD with the AWS Developer Tools

The [AWS Developer Tools](https://aws.amazon.com/es/products/developer-tools/) set consists of:

- AWS CodeBuild
- AWS CodePipeline
- AWS CodeDeploy
- AWS CodeCommit
- AWS CodeStar
- AWS Cloud9
- AWS X-Ray

Together they form an end-to-end &mdash;from source code to deployment, experience that is extensible to different environments. That being said, AWS CodeCommit, AWS CodeBuild, AWS CodeDeploy, and AWS CodePipeline all use the infrastructure CI/CO pipeline. 

{{<img src="picture2.png" title="" alt="">}}

*Figure 2: How AWS Developer Tools can be used to implement Infrastructure CI/CD pipeline*

**Figure 2 shows:**

- AWS CodeCommit acts as the version control. Given that AWS CodeCommit supports the Git protocol, anyone with Git experience can adopt the service easily.

- AWS CodeBuild acts as the managed build system. AWS CodeBuild is like a Jenkins server fully managed by AWS &mdash;it is flexible enough to also act as a slave to a Jenkins master. Using YAML syntax, it is easy to configure the exact build steps in a build workflow. Users can choose to run their builds with either AWS-provided or customized/user-created docker images, therefore supporting a wide range of technologies. Because of its versatility, in the pattern AWS CodeBuild is used in multiple steps: in the initial syntax check, packaging step, configuration of the environment, and pre-/post &mdash;deployment validations.

- AWS CodePipeline is the backbone scheduling mechanism that coordinates the steps within the pipeline. It has direct support for AWS CodeBuild, AWS CodeDeploy, AWS Elastic Beanstalk, AWS CloudFormation, AWS OpsWorks, Amazon ECS, and AWS Lambda, while triggers for AWS CodePipeline can be either CodeCommit or AWS S3.

While the individual tools can be implemented by non-AWS tools—for example, AWS CodeCommit can be easily replaced by GitHub—the AWS developer tools have the advantage of being easily scalable.

One other advantage is security, as IAM users, roles and policies are supported by all the preceding tools. This allows granular security permissions control to ensure the tools can only do what is expected. All the calls are logged in CloudTrail, hence the usual auditing and logging capability within AWS is uniformly supported by the infrastructure CI/CD pipeline.

### Summary
 
The above is only a high-level introduction to running CI/CD pipelines to provision cloud infrastructure, and how AWS development tools can implement such CI/CD workflows in a highly scalable, secure and cost-effective manner.

If you are looking for more architectural strategies that can generate significant financial and service quality dividends for your organization on AWS, please download our free eBook “5 Post Migration Strategies to Increase Your Cloud ROI” below 

If you're interested in finding out more about CI/CO pipelines click here. Related: Implementing CI/CD pipelines is an important strategy for post-migration success. Learn about the other 4 strategies in the “5 Post Migration Strategies to Increase Your Cloud ROI” eBook. [Download Now](https://insights.onica.com/five-post-cloud-migration-strategies-to-increase-roi?utm_source=website&utm_medium=blog).

**Let's Talk** to [start the conversation](https://www.rackspace.com/).

<a class="cta red" id="cta" href="https://www.rackspace.com/professional-services/data">Learn more about Rackspace Data Services.</a>