---
layout: post
title: "How to deploy Docker on AWS"
date: 2020-12-21
comments: true
author: Rackspace Onica Team
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "How to deploy Docker on AWS"
metaDescription: "Container technologies, such as Docker, make it easier to develop and deploy applications."
ogTitle: "How to deploy Docker on AWS"
ogDescription: "Container technologies, such as Docker, make it easier to develop and deploy applications."
slug: "how-to-deploy-docker-on-aws"
canonical: https://onica.com/blog/devops/how-to-deploy-docker-on-aws-whitepaper-2/

---

*Originally published in Apr 2017, at Onica.com/blog*

Container technology is slowly moving into the [DevOps](https://onica.com/amazon-web-services/devops/)
realm, creating a new methodology for designing, managing, deploying, and scaling services.
Container technologies, such as Docker&reg;, were developed with that goal
in mind&mdash;to make it easier to develop and deploy applications. 

<!--more-->

In this blog, we’ll talk about containers, what they are, and why you should
consider using such technology.

### What is a container?

The high-level concept behind containerization should not be thought of as
a virtual machine (VM). Instead, you should think of it as putting a single
application process inside its very own sandbox. The sandbox, or
container, can have access to its host’s resources. You can specify how
much compute and memory the sandbox should have access to as well as the
kind of networking that should take place. Containers can also have their
very own environment variables and shared volumes with the host or other
containers. You can have as many of these containers as your host's
resources permit. You can isolate them from one another or build
them to work together as a single cohesive application. One important
note to remember about containers is that the container lives as long as
the application process inside of it is running. As soon as the process
stops, the container also stops.

Containers are like building blocks and all start with a base. A base
container is a simplified and smaller version of an operating system or
application. These base containers have been stripped of all unnecessary
programs to make them extremely lightweight and portable. When you
take these pre-compiled base containers and then layer your application
or processes on top of them, you create your own unique container to
meet your needs. You can upload and download these containers as many
times as needed and they can run on many different environments.

### Container pros & cons

Containers are designed to be small and mobile, a major pro. Small
containers typically mean fast builds and quick deploys. This allows a
development team to go from a code commit to a running, testable
environment incredibly fast. Small containers also mean that deploying
and scaling events can be incredibly fast. Instead of waiting for an
entire server to boot and your code to install, you simply copy the
container and run it on the same server or inside of a cluster of servers.

The concept behind container deployment is a *build once and deploy many*
strategy. That means your developers can build and commit an image, and
that image will be deployed and tested in a development environment. After
you test the image, it can be copied and tested in a staging
environment, and then finally deployed into production. All environments
can use the same build a developer compiles on a local machine. The container can run
identically in all environments. While it is possible to run Linux&reg; containers
on a non-Linux environment, Docker does require a Linux kernel
to operate. In non-Linux environments, Docker installs and manages a small
Linux VM where your containers will run.

The pros of containers can also become the cons, depending on how you
are using them. The fact that containers are tiny applications that scale
horizontally can be bad if you are running a large application or an
application that takes a long time to initialize. Containers are also
not a good place to maintain a state. 

You should not have an application save anything locally inside of a
container because a single scaling event can cause you to lose any
local data. The final con is **debugging**. Until you start
implementing more peripherals around your container environment, trying
to debug a rogue container can be difficult, especially if they
have scaled up. Logs, by default, handle storage on a per-container basis.

### When to build a container

You now understand what containers are and how powerful and useful
they can be, but you should also know that containers are not ideal
for every situation. Just because you **can** containerize it doesn’t
mean that you should. 

We mentioned that one of the large pros to having a container is the
size and mobility of the container. If you decide to package up a
multi-site WordPress&reg; container with all its PHP code,
plugins, themes, and so on, you are going to lose some of the benefits
that Docker inherently has. The larger the containers become, the more
difficult it is to move around and to deploy. That being said, you can
still do it, but it doesn't utilize some of the inherent benefits of containerization.

Containerization doesn’t provide all of its benefits when you have a
container that takes a long time to initialize. If your containers have
to pull down many configuration files and install several packages
based on those configuration files, this could slow down any scaling
events and consume a lot of resources on your host.

Docker shines when you are building and deploying small and lightweight
services, often called *microservices*. Microservices are great because they usually
contain a small code base, have very short development cycles, and can often
benefit from scaling horizontally, instead of vertically&mdash;adding more
power to a service. 

Docker makes it extremely easy to deploy, update, scale, and destroy
microservices. Docker is also great for applications that can
scale horizontally. If your application can survive scaled up and down
horizontally and doesn’t require a large server footprint, Docker
is a great way to scale.

### Deploying Docker containers on AWS

Amazon Web Services&reg; (AWS) enables the deployment of containerized
application clusters. We are an AWS Premier Consulting Partner. We
specialize in guiding our customers with DevOps challenges on
their journey into the cloud. Our goal is to increase automation
and decrease the 20th-century approach to technology thinking. We strive
to give you continual measurements for achievement, on-demand
demonstrations, and milestones for approvals and rejections. We want
to help your teams’ talent break through by automating your workloads
because we know that downtime and repetition cost organizations money.
[Contact us](https://onica.com/contact/) to learn more.

<a class="cta teal" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.

