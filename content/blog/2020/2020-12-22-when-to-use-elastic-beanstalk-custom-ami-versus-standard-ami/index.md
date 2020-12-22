---
layout: post
title: "When to use Elastic Beanstalk Custom AMI versus Standard AMI"
date: 2020-12-22
comments: true
author: Matt Charoenrath 
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-U0118EALE77-fa48a7c11b02-72'
bio: "Marketing leader experienced in growing brands while scaling and 
modernizing marketing organizations through a balance of creativity, 
process & technology to captivate audiences and achieve results."
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "When to use elastic Beanstalk Custom AMI versus standard AMI"
metaDescription: "Understanding the difference between a standard AMI and a custom AMI is important so you can choose the best possible service for your particular needs."
ogTitle: "When to use elastic beanstalk custom ami versus standard ami"
ogDescription: "Understanding the difference between a standard AMI and a custom AMI is important so you can choose the best possible service for your particular needs."
slug: "when-to-use-elastic-beanstalk-custom-ami-versus-standard-ami"
canonical: https://onica.com/blog/devops/elastic-beanstalk-custom-ami-vs-standard-ami/
---

*Originally published in Apr 2017, at Onica.com/blog*

Recently. we had a meeting with a client in regards to custom
Amazon&reg; Machine Images (AMIs) vs. standard AMIs. They indicated that an
article they had read about this topic told them never to use custom AMI. I
hope to provide some insight as to when a custom AMI is appropriate.

<!--more-->

First, we need to understand the difference between a standard AMI and
a custom AMI. It’s important to note that no matter what method you
choose, it won't automatically get patched for you. You’re still responsible
for the patch levels and any maintenance. If you’re not familiar, update yourself with the
[AWS Shared Responsibility model](https://aws.amazon.com/compliance/shared-responsibility-model/)
before reading onward.

### What is a standard AMI?

A standard AMI is provided to you by the vendor&mdash;Amazon&reg; for
Amazon Linux, Canonical for Ubuntu&reg;, CentOS for CentOS&reg;, Microsoft
for Windows&reg;, and so forth.

### What is a custom AMI?

A custom Amazon Machine Image is one that you create and
manage yourself.

### Using standard AMI

Standard AMIs are useful if you have a small codebase and are not too worried
about patch levels. Standard AMIs give you the ability to forget about maintaining
an updated AMI yourself with the latest patches. You can rebuild your
environment with the new AMI that was released that quarter with the most
recent security patches and you’re all set up. The only thing you’re responsible
for is having your environment rebuild with the newest AMIs. One suggestion, when
rebuilding your environment, start with only a small percentage of the environment
to avoid bringing your application offline or create a new cluster and point your
DNS to the new load balancer.

#### Pros of using a standard AMI

- Recent AMIs contain the latest patches, so you don't need to worry about
  applying patches to your AMIs.
- Application code self-updates, so you don't need to worry about updating
  the AMIs. Your process for deployment should include fetching the latest
  code from your repository.
- Automation time for this process is shorter than automating a custom AMI.
- New instances going forward with user data update easily&mdash;bootstrapping.

#### Cons of using a standard AMI

- Longer boot to application-ready. Your instance has to fetch all of
  your third-party tools, your application, deploy them, and configure them
  before you can utilize the instance to serve content.
- Patches aren’t likely to be vetted by you or your team. Therefore you can’t
  accurately fend off compliance problems or check those boxes.

### Using AWS Elastic Beanstalk custom AMIs

Custom AMIs are useful if you have a rather large codebase and are worried
about the patches that get applied for either code reliability or
compliance. Custom AMIs require more work, but you know exactly what
happens to the AMI and what patches get applied.

#### What is AWS Elastic Beanstalk?

AWS Elastic Beanstalk is a service for deploying and scaling web applications
and services on common web platforms. To use it, create an application, upload
it, and then provide information about it. Elastic Beanstalk launches an
environment automatically and then creates and configures the resources needed.

#### Benefits of using a custom AMI

- Understand what patch levels you are using&mdash;this can help with both
  code reliability and compliance problems.
- Pre-stage your codebase on your servers if your code doesn’t change often
- Pre-stage other applications such as NewRelic, Splunk, or other customer
  monitoring agents on the systems and not have to worry about configuration later.
- Decreased time from boot to application-ready. Your code is already on
  the instance and doesn’t have to be fetched, so when the new instance
  boots up, it should be ready to serve application requests.
- Copy your AMI from one region to another for backups easily.

#### Cons of using a custom AMI

- Create and maintain your own AMI deployment process. If the creation process
  for the AMI isn’t automated, time has to be dedicated to an individual to
  update the AMI for each application.
- Update your AMI to reflect the new code, when the new code is released. 
- Process development can be costly and timely to establish at first, especially
  in its initial phases.

If you decide to go the custom AMI route, there are many ways you can automate
the process. One method we like to use is Jenkins and Packer.
[Jenkins](https://www.jenkins.io/) allows us to create custom AMIs with
[Packer](https://www.packer.io/) at scheduled intervals, or ad-hoc. With
proper Jenkins configuration, plugins, and scripts, you can have Jenkins
and Packer working in tandem with each other to create a newly updated
AMI. You would use Jenkins to assume a role via STS, start up Packer, and
start deploying the new EC2 instance that will later become your new AMI.
Within Packer, you would designate how to fetch your codebase from your
code repository and to update the OS packages.

### Need help with DevOps?

We are an [AWS Premier Consulting Partner](https://onica.com/amazon-web-services/).
We specialize in guiding our customers with
[DevOps challenges](https://onica.com/amazon-web-services/devops/) on their
journey into the cloud. Our goal is to increase automation and decrease the
20th-century approach to technology thinking. We strive to give you continual
measurements for achievement, on-demand demonstrations, and milestones for
approvals and rejections. We want to help your teams’ talent breakthrough by
automating your workloads because we know that downtime and repetition cost
organizations money.
[Contact us](https://onica.com/contact/) to learn more and speak with one of our DevOps consultants.

<a class="cta blue" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
