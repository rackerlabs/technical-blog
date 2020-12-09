---
layout: post
title: "AWS container services how does it work"
date: 2020-12-09
comments: true
author: Fernando Battistella
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-U0117GP9MSR-52a71a10bcbf-512'
bio: "Senior Solutions Architect at Onica, a Rackspace Technology Company"
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "AWS container services how does it work"
metaDescription: "AWS&reg; Containers offer a lightweight way to consistently port software environments for applications. This makes them a great resource for developers looking to improve infrastructure efficiency, becoming the new normal over virtual machines (VMs)."
ogTitle: "AWS container services how does it work"
ogDescription: "AWS&reg; Containers offer a lightweight way to consistently port software environments for applications. This makes them a great resource for developers looking to improve infrastructure efficiency, becoming the new normal over virtual machines (VMs)."
slug: "aws-container-services-how-does-it-work"
canonical: https://onica.com/blog/containers/aws-container-services/
---

*Originally published in Feb 2019, at Onica.com/blog*

AWS&reg; Containers offers a lightweight way to consistently port software environments for applications. This makes them a great resource for developers looking to improve infrastructure efficiency, becoming the new normal over virtual machines (VMs).

<!--more-->

Containers are still a relatively new technology, and integrating containers into your AWS usage can be difficult without knowing your options. Thankfully, AWS offers two container services to cover the breadth of your container needs.
### Amazon Elastic Container Service (ECS) – the Amazon native option

AWS’ own answer to containers is the Amazon Elastic Container Service (ECS). Launched around the same time as the open-source Kubernetes&reg; containers option, Amazon ECS is tightly integrated into the AWS system, and is often referred to as AWS’ Docker&reg; service for its docker compose support in Amazon ECS Command Line Interface (CLI).

#### Tasks & Task Definition

At its most basic, Amazon ECS utilizes tasks. You can customized tasks through a series of parameters, which in turn are dependent on the underlying resource executing in, either Amazon EC2 or AWS Fargate. Tasks require task definitions, which are kept in a **JSON document**. Without a task definition, a container cannot run in Amazon ECS.

#### Services

Services allow you to run, maintain, and scale tasks in an Amazon ECS cluster. You can also front Services via a load balancer to expose to external traffic. You can use a **JSON document** to define Services, much like a task.

#### Container Agents

The container agent allows Amazon EC2 instances to connect to a cluster. In addition to being available on Amazon ECS optimized AMIs, you can install a container agent on Amazon EC2 instances that support the Amazon ECS specification.

#### Schedulers

Scheduling is the process of deciding where to launch a container. You might launch tasks with either Amazon EC2 Instances or AWS Fargate. The Amazon EC2 launch type Amazon ECS allows you to manage a cluster of servers and schedule placement, allowing for more server-level control of clusters and a broader range of customization.  The AWS Fargate launch type requires packaging of the application in containers with a few specifications and definitions before launch.

#### Cron jobs

Another thing Amazon ECS supports is scheduling tasks to run in a certain schedule like a cron job.

#### Scaling and monitoring in Amazon ECS

Amazon CloudWatch drives scaling in Amazon ECS. Amazon ECS exports a series of metrics into AWS CloudWatch, including metrics such as **CPUReservation** and **MemoryReservation**. From these metrics, you can create alarms to trigger both scaling out and in operations for **node count** in the cluster and **task count** in the services. In addition to Amazon ECS provided metrics, you can create custom alarms in AWS CloudWatch, and set triggers that depend on these alarms as well. You can also use AWS CloudWatch as a monitor in Amazon ECS. You can query AWS CloudWatch logs, because of their system integration. AWS CloudWatch logs can serve as a source of metrics as well. With AWS CloudWatch Events, you can track changes to resources in real-time, and set up a AWS Lambda function to match and route events to target functions and steams, making it easy to make corrective actions and changes.

### Amazon Elastic container service for Kubernetes (EKS) – Bringing Kubernetes to AWS

Kubernetes is a popular open-source container orchestration system, and with Amazon EKS, it you can host Kubernetes on AWS. Amazon EKS runs the upstream version of Kubernetes, meaning you can use existing plugins and tooling from the Kubernetes community. Amazon EKS also runs Kubernetes with highly available and autoscalable masters across multiple AZs to protect from a single failure point and improve resiliency.

#### Pods

Instead of tasks, Kubernetes deals with pods as the lowest level object of a cluster. Pods might contain more than one container.

#### Deployments

Pod management falls to deployments, which determines whether pods are alive and replicas are necessary. They also measure pod health, operating scaling, and roll out pod updates.

#### Services

Services in Amazon EKS are similar to those of Amazon ECS in that they handle distribution to pods ready to receive traffic. However in Amazon ECS, you must create the **load balancer** and **dns records**. In Kubernetes, this is automatic.

#### Jobs and cron jobs

In Amazon EKS, jobs are one-off tasks run to completion, and not a long running container. Cron jobs run jobs on a specified schedule.

#### Cluster lifecycle

With Amazon EKS, AWS handles the control plane, but you still maintain node management. Standard rules of Kubernetes apply.

#### Scaling

In Amazon EKS, an autoscaler add-on handles node scaling. This add-on tracks what’s happening in your cluster and manages your auto scaling group. If resources are missing the add-on brings in new instances so long as they satisfy the requirements. If there are too many nodes or if resource utilization goes down, the add-on resizes loads and  redistributes them for you. The Horizontal pod autoscaler also offers workload scaling. This scales based on workload resource utilization through CPU and memory metrics, and can use custom scaling metrics as well.

#### Monitoring and logging

Monitoring is very different in Amazon EKS as well. Prometheus is the golden standard for monitoring on Kubernetes. Prometheus monitors by using service discovery to find and scrape data from endpoints exposed by components and applications in the cluster, and creates new Prometheus configurations when it detects a change based on the pods changes.

Since there’s no built-in integration, Amazon EKS doesn’t use CloudWatch logs natively. Instead it’s up to you as the administrator to determine logging features and needs in your cluster. Some people also choose to use AWS CloudWatch logs agent and use that to transfer all data to AWS CloudWatch Logs.

### The pros and cons of Amazon ECS and Amazon EKS

When choosing between Amazon ECS and Amazon EKS for your container management it boils down to approach, depth of knowledge, and flexibility.

For those knowledgeable of Docker, tightly integrated with AWS, and looking for simplified management through AWS Fargate support, Amazon ECS might be the best choice for its ease of use. Amazon ECS doesn’t have the community popularity the Kubernetes does, and the tooling available around it is limited.

By contrast, those comfortable with Kubernetes and looking for the flexibility it offers might find Amazon EKS a better source for their projects. Because of its open-source nature, Kubernetes not only offers a large range of tools, but also a great depth of knowledge. The flexibility of upstream Kubernetes makes these easy to use in Amazon EKS. It also features greater ability to handle complex scheduling needs. However, Kubernetes on AWS  is still somewhat limited in integration, with no support from AWS Fargate, and no support for Windows&reg; containers. There’s also an issue of cost. While Amazon ECS is free aside from the costs of Amazon EC2, AWS Fargate, or AWS resources, Amazon EKS does have a monthly cost per cluster, which can add up quite quickly.

In reality, the choice of which container management system to use comes down to you, your team, and your project. If you’re already an AWS user, Amazon ECS is a simple, low barrier to entry option for smaller teams looking to remove the heavy lifting. If you need to run container workloads across different public clouds or on-premise, Amazon EKS is a more prudent choice. Although it has a steep ramp up and knowledge acquisition needs, Amazon EKS can be a powerful platform addition to your existing AWS network for the flexibility it offers in managing your containers.

To learn more about containers, see our whitepaper, [Understanding Containers on AWS](https://insights.onica.com/understanding-containers-on-aws).

<a class="cta blue" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
