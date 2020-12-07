---
layout: post
title: "The convergence of serverless and containers on aws"
date: 2020-12-08
comments: true
author: Mency Woo
bio: "7X AWS-certified, 2X GCP-certified Cloud solutions architect. 
Diverse experience in DevOps, CI/CD and infrastructure as code. Passionate about 
the intersection of business interests and technological innovations, 
design/implementation of scalable tools and processes that align 
business requirements, R&D endeavours and IT initiatives."
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "The convergence of serverless and containers on aws"
metaDescription: "Although people think about Serverless and Containers as distinct, the reality is they’re not too different from each other."
ogTitle: "The convergence of serverless and containers on aws"
ogDescription: "Although people think about Serverless and Containers as distinct, the reality is they’re not too different from each other."
slug: "the-convergence-of-serverless-and-containers-on-aws"
canonical: https://onica.com/blog/cloud-native-development/aws-serverless-containers/
---

*Originally published in Mar 2019, at Onica.com/blog*

Although people think about serverless and containers as distinct, the reality is they’re not too different from each other. When looking at the workloads, the microservice requirements, things get clearer. 

<!--more-->

It’s important, though, that we break down the definitions of Containers and Serverless before getting into the commonalities and how the two are merging.

### What are containers?

The earliest mention of containerization technology can be traced back to 1979 and the use of Chroot on UnixV7. Over a decade or so later, more container-based technologies emerged, but none of these became mainstream. Containers as we know them today came around with Warden in 2011 and the game-changing Docker version in 2013. For most people, Docker and containers are analogous, but this is no longer the case, especially with the release of Kubernetes.

When it comes to container management, things can be broken down into container orchestration and container runtime. Container orchestration serves to schedule and scale workloads while the runtime implements components necessary to run the container. The runtime includes a container engine, which accepts the user requests that manage the lifecycle of the containerized process. There are many services that can enact and implement these components and this [technology is constantly changing](https://insights.onica.com/understanding-containers-on-aws).

#### What is serverless computing?

Serverless computing is tricky to define because it’s often easier to describe what it is not. Sometimes people think of serverless in terms of Lambda functions, which would be Functions as a Service (FaaS). There are also products that build FaaS which would be Backend as a Service (BaaS). There’s also an alternative definition by Martin Fowler of Thoughtworks which labels serverless as “Apps where server-side logic is still written by AppDev but run in stateless compute containers that are event triggered, ephemeral and fully managed by third party.”  This definition ties serverless and containers together well.

If you stay focused on serverless in AWS, you notice that all these services function under more of a BaaS definition with much of the value lying in the significant reduction of overhead.  This is the key value of AWS as evidenced by its pay-per-use nature, autoscaling, and minimizing of operation decisions. A number of AWS services offered are serverless including Amazon S3, Amazon DynamoDB, and AWS Lambda, just to name a few.

#### How Serverless and Containers Connect: AWS serverless containers
What is a serverless container? Both Serverless and Containers deploy code inside isolated, discrete environments. Serverless computing refers to an architecture in which code is executed on-demand, typically in the cloud. Containers provide portable environments for hosting an application or its parts.

It is well known by now that the best way to leverage the cloud is to build a distributed system. When looking at a distributed system, whether it’s through a container service or serverless service, there’s always a schedule and workers as well as some sort of reverse proxy for assigning tasks or retrieving information. You’ll find this same model applies no matter whether you’re using Amazon ECS, Amazon EKS, or AWS Lambda.

Both technologies are part of a move to become increasingly cloud native, with containers serving as a starting point for refactored applications and with refactoring eventually leading to the use of services like AWS Lambda. There’s even AWS Fargate, which is in essence an AWS “serverless container service” that removes a lot of the complexities around management of clusters.

Perhaps the most exciting connection of containers and serverless at this time, is Firecracker. Announced around re:Invent 2018, Firecracker is a new AWS service that “implements a virtual machine monitor (VMM) that uses a Linux Kernel-based virtual machine (KVM) to create and manage microvms.” This is basically the underlying technology behind AWS Fargate and AWS Lambda.  What’s significant is that even though the code isn’t open source yet it seems inevitable that this technology will be usable on your Kubernetes cluster.

Currently, you have to define your containers and employ a containerd-shim, with runc at the end of the applications. What Firecracker containerd proposes to do is the same, but instead of runc and runhcs you have the Firecracker microVM serving as the runtime ticket via the containerd-shim. While this hasn’t reached fruition yet, it’s interesting to see how AWS is helping to merge the container and serverless worlds into something that would allow for running lightweight, fast workloads.

If this past re:Invent is any indication, Containers and Serverless are key areas to watch as cloud computing continues to evolve. With AWS continuing to innovate, we look forward to seeing what new services will come to help improve workloads and bring greater value to users.

For more on Onica’s serverless offerings, [visit our Cloud Native Development page](https://onica.com/aws-cloud-native-developers/).





### Overview

The following line shows how to add an image.  If you have no image, remove it.
If you have an image, add it to the post directory and replace the image name in the following line.

{{<img src="Picture1.png" title="" alt="">}}

### Conclusion

<a class="cta purple" id="cta" href="https://www.rackspace.com/sap">Learn more about our SAP services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
