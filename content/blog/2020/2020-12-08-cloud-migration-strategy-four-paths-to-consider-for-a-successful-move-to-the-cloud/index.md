---
layout: post
title: "Cloud migration strategy four paths to consider for a successful move to the cloud"
date: 2020-12-08
comments: true
author: Matt Charoenrath 
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-U0118EALE77-fa48a7c11b02-72'
bio: "Marketing leader experienced in growing brands while scaling and 
modernizing marketing organizations through a balance of creativity, 
process & technology to captivate audiences and achieve results."
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "Cloud migration strategy four paths to consider for a successful move to the cloud"
metaDescription: "."
ogTitle: "Cloud migration strategy four paths to consider for a successful move to the cloud"
ogDescription: "."
slug: "cloud-migration-strategy-four-paths-to-consider-for-a-successful-move-to-the-cloud"
canonical: https://onica.com/blog/migration/cloud-migration-strategy/

---

*Originally published in May 2019, at Onica.com/blog*

There are many paths to move a company to the public cloud. Deciding [how to migrate](https://insights.onica.com/optimizing-aws-cloud-migration-4-paths-to-consider-whitepaper) to AWS&reg; should be a process that focuses on each workload, rather than trying to find a single solution to be used across the board.

<!--more-->

### What is Cloud migration?

Cloud migration is the process of moving data, applications, or other business elements to a cloud computing environment such as AWS. One common model of cloud migration is the transfer of data and applications from a local, on-premises data center to the public cloud via lift and shift or [Migration as Code](https://onica.com/blog/migration-as-code-the-end-of-the-lift-and-shift-era/).

There’s no one **right way** to migrate, however, once you’ve assessed your workload, there are several paths you can take. The path that you choose depends on time constraints, level of engineering effort, and resource requirements.

### The four cloud migration strategies

1. #### Refactoring for cloud native design
Refactoring for [cloud native design](https://onica.com/aws-cloud-migration/) is the path that requires the most forethought, planning, engineering effort, and overall time to implement, but benefits from being the most stable solution wherever possible.

2. #### Repurchasing
A solution that pairs automated pipelines and processes with ready-to-use infrastructure templates.

3. #### Replatforming
A partially automated process that uses **Infrastructure as code** methods but also relies on manual intervention from system administrators.

4. #### Rehosting
The traditional **lift and shift** method of migration offers a **block-for-block** match to the on-premises infrastructure.

Ready to learn more about these four paths and find the right path for your workloads? [Download our whitepaper](https://insights.onica.com/optimizing-aws-cloud-migration-4-paths-to-consider-whitepaper) today!

Here’s a teaser:

Deciding how to migrate to AWS&reg; should be a process that focuses on each workload, rather than trying to find a single solution. 

Key to these decisions are factors around:

+ Level of engineering effort
+ Time constraints
+ Licensing restrictions
+ In-house vs. Commercial-Off-The-Shelf (COTS) software
+ Resource requirements

With each of these limitations in mind, there are a few paths that you should consider assessing for viability as you decide to make your migration plans. Onica, a Rackspace Technology company, always recommends assessing these paths in this order, from **most-to-least** ideal. 

If a path is not possible, scrap it and move onto the next. It’s important to remember that these paths are not interchangeable. Rather you should carefully consider everything before eliminating a path from your process.

#### Refactor for cloud native design 

Refactoring for cloud-native design is the path that requires the most forethought, planning, engineering effort, and time overall to implement, but benefits from being the most stable solution wherever possible. 

Refactoring existing applications allows for the option to fully automate the **build/test/release** cycle processes &mdash;leveraging more modern **CI/CD** pipelines, and ensures that old workloads get updated to modern processes and architectures. 

The opportunity to take an old, problematic application and re-write it to be cloud-native may include serverless options, the opportunity to incorporate native backup and restore solutions, disaster recovery or highly-distributed design and architecture, and anything else that would allow you to benefit from the services provided by the public cloud. 

Often this even includes moving away from existing data structures toward a more modern database engine, providing an opportunity to escape expensive licensing by choosing open-source standards, etc. 

Planning around this requires extensive research to identify and resolve automated processes around every aspect of the workflow. Concepts common to this model would require DNS automation, service discovery, blue-green or canary deployment, centralized logging, version control workflows, artifact creation, and storage, etc. 
&mdash;the list goes on, and there are a lot of things to think about. 

A high level of maturity is necessary for making these decisions, whether that’s internally or through the use of a trusted partner. This is the essence of **Migration as code** and is the primary way Onica, a Rackspace Technology company,  operates its [migrations](https://onica.com/aws-cloud-migration/).

This is not necessarily always an option, however. The major factors that play into this option are the obvious ones: time and money. An organization may not have the engineering resources or maturity to implement a custom, cloud-native solution to an off-the-shelf application currently in use today. 

Even in-house applications may not be worth refactoring within the given time, or other business priorities may make it an impossibility. Without available engineering resources, the company is left in a position to hire new talent with those skills, train their existing workforce and expect a slower delivery of the solution, or simply choose an alternative path.

#### Automate with cloud-native architecture

Ideally this solution is also paired with **CI/CD** deployment processes to solidify process and automate concepts inherently throughout the organization, allowing for simpler onboarding processes for other applications that can follow this model. 

Most often this process will include several phases of pipelines, will perhaps make use of baseline machine images for ready-use in infrastructure templates, and will leverage a deployment mechanism for applications onto these machines post-creation. 

Straying a little further away from a full refactor is the idea of taking the same applications and mindsets, but migrating them with more cloud-native architecture. This means using automation from start to finish, codifying all infrastructure, and designing with the benefits of the public cloud in mind for availability and disaster recovery. 

An example of this would be to take a workload in your data center today and write functional code to deploy its infrastructure and application installation into the cloud in such a way that it’s highly available, self-healing with autoscaling groups, and effective health-checks.

Want more information about your best cloud migration strategy? Download our Whitepaper, [Optimizing Your Cloud Migration: 4 Paths to consider for a successful move to the cloud](https://insights.onica.com/optimizing-aws-cloud-migration-4-paths-to-consider-whitepaper) today!

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.

<a class="cta red" id="cta" href="https://www.rackspace.com/professional-services/data">Learn more about Rackspace Data Services.</a>
