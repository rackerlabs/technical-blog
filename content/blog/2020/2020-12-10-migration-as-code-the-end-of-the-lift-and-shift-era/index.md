---
layout: post
title: "Migration-as-Code: The end of the lift-and-shift era"
date: 2020-12-10
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
    - DevOps
metaTitle: "Migration-as-Code: The end of the lift-and-shift era"
metaDescription: "The discussion around migration methods has led many businesses to consider important migration decisions.
For most companies, this means choosing the right cloud provider and the actual migration method."
ogTitle: "Migration-as-Code: The end of the lift-and-shift era"
ogDescription: "The discussion around migration methods has led many businesses to consider important migration decisions.
For most companies, this means choosing the right cloud provider and the actual migration method."
slug: "migration-as-code-the-end-of-the-lift-and-shift-era"
canonical: https://onica.com/blog/cloud-native-development/lift-and-shift-migration/

---

*Originally published in Feb 2019, at Onica.com/blog*

The discussion around migration has evolved from *if* to *when*, leading many businesses to consider important migration decisions.
For most companies, this means choosing the right cloud provider and the right migration method.

<!--more-->

Equally important is focusing on the actual migration method. Although the lift and shift migration model has long been
the *tried and true* way of doing migrations, there several challenges and problems inherent to this type of migration.
What many people don’t know is there’s an alternative in the Migration-as-Code approach. This post discusses Migration-as-Code
and other types of migration in more detail.

#### What is workload migration?

A workload is the amount of processing that a computer does at any given time. A workload migration is the process of transitioning
and processing these workloads. For example, the process of moving data, applications, or other business elements to a cloud-computing
environment is a workload migration called a *cloud migration*.

#### What is lift-and-shift in AWS&reg;?

Lift-and-shift is a type of workload migration. You remove workloads and tasks from one storage location, usually
on-premise, and place them in another, usually cloud-based, location, namely AWS, with minimal modification.
Lift-and-shift is a popular migration method because it allows you to move applications quickly and easily without
needing to re-architect them.

#### What is Migration-as-Code?

Migration-as-Code takes some of the core tenets of DevOps and applies them to workload migration, allowing for
real-time movement without human involvement. This opens up opportunities for automation and improvement throughout
the migration process. Although Migration-as-Code is still a relatively new practice, it offers a lot of distinct
advantages that should have companies considering it over the lift-and-shift approach.

### How migration as code addresses the challenges of lift-and-shift 

Lift-and-shift migrations can seem a quick means of moving from the data center to a cloud platform. However, there are
many drawbacks to taking this approach, even if it initially seems quicker. Lift-and-shift is a literal transfer of data,
meaning that the systems stay largely the same. This sameness includes any existing problems or challenges from the data
center. Unfortunately, this also means that the cloud is treated as a data center, defeating the purpose of a cloud migration.
Treating the cloud as a data center is one of the biggest mistakes that you can make in a migration.

Infrastructure operates differently in the cloud, and the cloud has many advantages over an on-premise system. A failure to
account for this means that customers don't take full advantage of the cloud. In turn, this means they make large investments
in a migration without optimizing ROI. Thus, they don't take advantage of benefits such as scalability, disaster recovery, or
other cloud-native features that make a cloud architecture advantageous.

With Migration-as-Code, there’s a greater focus on delivering applications. Through automation of application migration, infrastructure
components work as infrastructure-as-code and move in and out of environments in an iterable fashion. This may be a slower process
upfront, but with the build-out of continuous integration and deployment pipelines (CI/CD), you can reuse these pipelines and create
greater value in the long run while also addressing infrastructure issues often left in place by lift-and-shift.

#### Understanding the Migration-as-Code method

To understand the Migration-as-Code method, you need to understand the agile and incremental approach that is continuous delivery.
The Migration-as-Code method builds CI/CD pipelines that promote automation and create sustainability. Applications are the unit of
work, and everything takes place on the application level, with delivery focused on applications moved in and out of environments
one piece at a time. Applications identify deployment patterns and reuse them for simplification of future migration needs. This
also simplifies quality assurance and applicatiopn security because code reviews them easily. The pipeline format also allows for
greater adaptability down the road because you can test and try new things in the environment at a quicker speed.

The ultimate result is a migration that takes place in less time and with less wasted investment. Instead of being one and done,
the pipelines are reusable for future initiatives such as DevOps transformation.

Knowing your options when it comes to migration can set you up for cloud success in the future. By choosing *Migration-as-Code* over
the more common *Lift-and-Shift* approach, you can elevate your migration for better opportunities at cloud innovation and match the
level of cloud maturity needed to accomplish your business goals.

For more on Onica’s Migration-as-Code offering and how you can elevate your AWS workloads, [check out our page](https://onica.com/aws-pipeline-driven-migration/).

<a class="cta blue" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
