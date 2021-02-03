---
layout: post
title: "Cloud migration strategy: Four paths to consider for a successful move to the Cloud"
date: 2020-12-08
comments: true
author: Rackspace Onica Team
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "Cloud migration strategy: Four paths to consider for a successful move to the Cloud"
metaDescription: "There are many paths to move a company to the public cloud. Deciding how to migrate
to AWS&reg; should be a process that focuses on each workload, rather than trying to find a single
solution to be used across the board."
ogTitle: "Cloud migration strategy: Four paths to consider for a successful move to the Cloud"
ogDescription: "There are many paths to move a company to the public cloud. Deciding how to migrate
to AWS&reg; should be a process that focuses on each workload, rather than trying to find a single
solution to be used across the board."
slug: "cloud-migration-strategy-four-paths-to-consider-for-a-successful-move-to-the-cloud"
canonical: https://onica.com/blog/migration/cloud-migration-strategy/

---

*Originally published in May 2019, at Onica.com/blog*

There are many paths to move a company to the public cloud. Deciding
[how to migrate](https://insights.onica.com/optimizing-aws-cloud-migration-4-paths-to-consider-whitepaper) to AWS&reg;
should be a process that focuses on each workload, rather than trying to find a single solution to be used across the board.

<!--more-->

### What is Cloud migration?

Cloud migration is the process of moving data, applications, or other business elements to a cloud computing environment such
as AWS. One common model of cloud migration is the transfer of data and applications from a local, on-premises data center to
the public cloud via lift and shift or [Migration as Code](https://onica.com/blog/migration-as-code-the-end-of-the-lift-and-shift-era/).

There’s no one *right way* to migrate. However, after you’ve assessed your workload, you can take several paths. The path that you
choose depends on time constraints, level of engineering effort, and resource requirements.

### The four cloud migration strategies

Following are the main cloud strategies:

#### 1. Refactoring for cloud native design

Refactoring for [cloud-native design](https://onica.com/aws-cloud-migration/) is the path that requires the most forethought, planning,
engineering effort, and overall time to implement, but it benefits from being the most stable solution wherever possible.

#### 2. Repurchasing

This solution pairs automated pipelines and processes with ready-to-use infrastructure templates.

#### 3. Replatforming

A partially automated process that uses Infrastructure-as-code methods, replatforming also relies on manual intervention from system administrators.

#### 4. Rehosting

The traditional **lift and shift** method of migration, rehosting offers a block-for-block match to the on-premises infrastructure.

### Decision factors

Ready to learn more about these four paths and find the right path for your workloads?
[Download our whitepaper](https://insights.onica.com/optimizing-aws-cloud-migration-4-paths-to-consider-whitepaper) today.

Here’s a teaser:

Deciding how to migrate to AWS should be a process that focuses on each workload, rather than trying to find a single solution. 

The following factors are key to these decisions:

+ Level of engineering effort
+ Time constraints
+ Licensing restrictions
+ In-house compared with Commercial-Off-The-Shelf (COTS) software
+ Resource requirements

With each of these limitations in mind, you should consider a few paths to assess viability as you decide to make your migration plans.
Onica, a Rackspace Technology company, always recommends assessing these paths in the *most-to-least* order. 

If a path is not possible, scrap it and move onto the next. It’s important to remember that these paths are not interchangeable. Rather,
you should carefully consider everything before eliminating a path from your process.

#### Refactor for cloud-native design 

Refactoring for cloud-native design is the path that requires the most forethought, planning, engineering effort, and time overall to
implement, but it benefits from being the most stable solution wherever possible. 

Refactoring existing applications enables you to fully automate the *build/test/release* cycle processes&mdash;leveraging more modern
CI/CD pipelines and ensuring that old workloads get updated to modern processes and architectures. 

The opportunity to take an old, problematic application and re-write it to be cloud-native might include the following choices:

- serverless options 
- the opportunity to incorporate native backup and restore solutions
- disaster recovery or highly-distributed design and architecture
- anything else that enables you to benefit from public cloud services 

Often this even includes moving away from existing data structures toward a more modern database engine, providing an opportunity
to escape expensive licensing by choosing open-source standards, and so on. 

Planning around this requires extensive research to identify and resolve automated processes around every aspect of the workflow.
Concepts common to this model require DNS automation, service discovery, blue-green or canary deployment, centralized logging,
version control workflows, artifact creation, storage, and so on. The list goes on, and there are a lot of things to think about. 

A high level of maturity is necessary for making these decisions, whether that’s internally or through the use of a trusted partner.
This is the essence of Migration-as-Code and is the primary way Onica, operates its [migrations](https://onica.com/aws-cloud-migration/).

This is not necessarily always an option, however. The major factors that play into this option are the obvious ones: time and money.
An organization might not have the engineering resources or maturity to implement a custom, cloud-native solution to an off-the-shelf
application currently in use today. 

Even in-house applications might not be worth refactoring within the given time, or other business priorities make it an impossibility.
Without available engineering resources, the company ends up in a position to hire new talent with those skills, train their existing
workforce, and expect a slower delivery of the solution, or simply choose an alternative path.

#### Automate with cloud-native architecture

Ideally, this solution is also paired with CI/CD deployment processes to solidify process and automate concepts inherently throughout the
organization, allowing for simpler onboarding processes for other applications that can follow this model. 

Most often this process includes several phases of pipelines, perhaps makes use of baseline machine images for ready-use in infrastructure
templates, and leverages a deployment mechanism for applications onto these machines post-creation. 

Straying a little further away from a full refactor is the idea of taking the same applications and mindsets but migrating them with
more cloud-native architecture. This means using automation from start to finish, codifying all infrastructure, and designing the
solution with the benefits of the public cloud in mind for availability and disaster recovery. 

For example, take a workload in your data center today and write functional code to deploy its infrastructure and application installation
into the cloud in such a way that it’s highly available, is self-healing with autoscaling groups, and has effective health-checks.

Want more information about your best cloud migration strategy? Take a look at our Whitepaper,
[Optimizing Your Cloud Migration: 4 Paths to consider for a successful move to the cloud](https://insights.onica.com/optimizing-aws-cloud-migration-4-paths-to-consider-whitepaper).

<a class="cta purple" id="cta" href="https://www.rackspace.com/onica">Learn more about our Cloud services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.

