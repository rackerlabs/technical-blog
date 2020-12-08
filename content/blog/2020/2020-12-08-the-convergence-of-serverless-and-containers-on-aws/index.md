---
layout: post
title: "The convergence of serverless and containers on AWS"
date: 2020-12-08
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
metaTitle: "The convergence of serverless and containers on AWS"
metaDescription: "Although people think about serverless and containers as distinct, the reality is they’re not too different from each other."
ogTitle: "The convergence of serverless and containers on AWS"
ogDescription: "Although people think about serverless and containers as distinct, the reality is they’re not too different from each other."
slug: "the-convergence-of-serverless-and-containers-on-aws"
canonical: https://onica.com/blog/cloud-native-development/aws-serverless-containers/
---

*Originally published in Mar 2019, at Onica.com/blog*

Although people think about serverless and containers as distinct, the reality is they’re not too different from each other. When
looking at the workloads, the microservice requirements, things get clearer. 

<!--more-->

It’s important, though, that we break down the definitions of Containers and Serverless before getting into the commonalities and
how the two are merging.

### What are containers?

The earliest mention of containerization technology traces back to 1979 and the use of Chroot&reg; on UnixV7&reg;. Over a decade or so
later, more container-based technologies emerged, but none of these became mainstream. Containers, as we know them today, came around
with Warden in 2011 and the game-changing Docker&reg; version in 2013. For most people, Docker and containers are analogous, but this
is no longer the case, especially with the release of Kubernetes&reg;.

When it comes to container management, you can break down things into container orchestration and container runtime. Container
orchestration serves to schedule and scale workloads, while the runtime implements components necessary to run the container.
The runtime includes a container engine, which accepts the user requests that manage the lifecycle of the containerized process.
Many services can enact and implement these components and this
[technology is constantly changing](https://insights.onica.com/understanding-containers-on-aws).

### What is serverless computing?

Serverless computing is tricky to define because it’s often easier to describe what it is not. Sometimes people think of
serverless in terms of Lambda functions, which would be Functions-as-a-Service (FaaS). Some products build FaaS, which
would be Backend-as-a-Service (BaaS). There’s also an alternative definition by Martin Fowler of Thoughtworks which labels
the term *serverless* as: *Apps where server-side logic is still written by AppDev but runs in stateless compute containers
that are event-triggered, ephemeral, and fully managed by a third party.* This definition ties serverless and containers 
together well.

If you stay focused on serverless in AWS&reg;, you notice that all these services function under more of a BaaS definition,
with much of the value lying in the significant reduction of overhead. This is the key value of AWS as evidenced by its
pay-per-use nature, autoscaling, and minimizing of operational decisions. A number of AWS services offered are serverless,
including Amazon&reg; S3, Amazon DynamoDB&reg;, and AWS Lambda&reg;, just to name a few.

### How serverless and containers connect: AWS serverless containers

What is a serverless container? Both serverless and containers deploy code inside isolated, discrete environments. Serverless
computing refers to an architecture in which code executes on-demand, typically in the cloud. Containers provide portable
environments for hosting an application or its parts.

Most people know by now that the best way to leverage the cloud is to build a distributed system. When looking at a distributed
system, whether through a container service or serverless service, there’s always a schedule and workers as well as some sort of
reverse proxy for assigning tasks or retrieving information. This same model applies no matter whether you’re using Amazon ECS,
Amazon EKS, or AWS Lambda.

Both technologies are part of a move to become increasingly cloud native, with containers serving as a starting point for refactored
applications and with refactoring eventually leading to the use of services like AWS Lambda. There’s even AWS Fargate, which is, in
essence, an AWS *serverless container service* that removes a lot of the complexities around cluster management.

Perhaps the most exciting connection of containers and serverless at this time is *Firecracker*. Announced around re:Invent 2018,
Firecracker is a new AWS service that *implements a virtual machine monitor (VMM) that uses a Linux Kernel-based virtual machine
(KVM) to create and manage microvms.* This is basically the underlying technology behind AWS Fargate and AWS Lambda. What’s
significant is that even though the code isn’t open source yet, it seems inevitable that this technology will be usable on your
Kubernetes cluster.

Currently, you have to define your containers and employ a *containerd-shim*, with *runc* at the end of the applications. Firecracker
containerd proposes to do the same, but instead of *runc* and *runhcs* you have the Firecracker microVM serving as the runtime ticket
through the containerd-shim. While this hasn’t reached fruition yet, it’s interesting to see how AWS helps to merge the container
and serverless worlds into something that enables you to run lightweight, fast workloads.

If this past re:Invent is any indication, containers and serverless are key areas to watch as cloud computing continues to evolve. With
AWS continuing to innovate, we look forward to seeing what new services will come to help improve workloads and bring greater value to users.

<a class="cta teal" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
