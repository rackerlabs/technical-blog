---
layout: post
title: "Leveraging AWS to prepare your eCommerce platform for the unexpected"
date: 2020-12-01
comments: true
author: Matt van Zanten
authorAvatar: 'https://www.gravatar.com/avatar/a35f27a2675b998fcbcc393c7380848f?s=200'
bio: "Matt is a Cloud Architect at Rackspace Onica with over 7 years of experience in AWS supporting small to large scale customers in fields such as, technology, healthcare and finance. His experience includes developing and implementing automations, pipelines, containerized workloads, highly available infrastructure as well as system and application performance monitoring."
published: true
authorIsRacker: true
categories:
    - AWS
    - DevOps
metaTitle: "Leveraging AWS to prepare your eCommerce platform for the unexpected"
metaDescription: "Building a successful eCommerce platform on AWS begins with the planning."
ogTitle: "Leveraging AWS to prepare your eCommerce platform for the unexpected"
ogDescription: "Building a successful eCommerce platform on AWS begins with the planning."
slug: "leveraging-aws-to-prepare-your-ecommerce-platform-for-the-unexpected"
canonical: https://onica.com/industries/retail/leveraging-aws-to-prepare-your-ecommerce-platform-for-the-unexpected/

---

*Originally published on October 1, 2019 at Onica.com/blog*

If you run or support an online retail platform, you are well aware of the
perils of dealing with high volume traffic during major sales or
the holiday season, which can, unfortunately, lead to website crashes,
frustrated customers, and abandoned shopping carts.

<!--more-->

Every year, stories surface of some major brand that has fallen victim to this
cycle. Whether you have experienced this or not, there are ways to
future-proof your eCommerce infrastructure to avoid this scenario. This
blog post covers the many aspects of planning, building, testing, and leveraging
AWS to build a scalable and highly available eCommerce platform successfully.

### Planning

Building a successful eCommerce platform on AWS&reg; begins with the planning.
Selecting the technologies to use to implement, run, and
continuously deploy the infrastructure are the first steps because some technologies
might be more difficult to replace than others after systems are customer
facing. Discuss the pros and cons of native infrastructure management tools,
such as AWS CloudFormation versus a third-party tool.

Building a pipeline is crucial because it provides you with a process to
rapidly test and deploy hotfixes and improvements. You might be using bitbucket
as your repository. If so, perhaps consider using bitbucket pipeline because it is
very quick to get running. You might also want to consider a native solution
such as AWS CodePipeline because it also eliminates the need to roll out
additional infrastructure. After you have answered these questions, you can
begin to plan out the infrastructure.

### Infrastructure

Typically, there are three major layers to an eCommerce platform, all of
which are imperative for a successful implementation.

#### First layer

The first layer is the frontend, where you need to identify the content and
how to generate it. Usually, software manages and dynamically generates the content
of an eCommerce platform, and a web service serves it on
the fly. To ensure that the dynamically generated content is highly
available, an autoscaling group shojuld manage the front end systems
in multiple availability zones (AZs) with a load balancer to
distribute traffic evenly.

Through personal experience, you can intially put more attention into
availability than scalability with a front end system when implementing
a content delivery system (CDN). Using a CDN significantly reduces the
load on a front-end server because it takes your dynamically generated
content and serves it statically from data centers across the globe, ensuring
that all customers have a swift browsing experience.

#### Second layer

The second major layer is the middleware, this is where all the data
processing, such as API calls, take place. Through my experience
managing eCommerce middleware, I can attest that this requires the greatest
effort to implement correctly. You need to put much thought into the
scalability and availability of these systems. For example, the frontend and
middleware applications must be autoscaled, highly available, and load
balanced to ensure they handle unexpected load without causing
application latency.

I have successfully managed middleware systems by running
container workloads on auto-scaling groups. This
improves performance because containers scale much more quickly
than an auto-scaling group. As a result, when a container becomes
unresponsive, the system can terminate it and replace it in a matter of seconds
versus auto-scaling groups, which can take minutes. Every second counts
when handling customer traffic. A customer might decide to drop off if
they are having a poor shopping experience. A container-based approach
also helps accelerate your ability to push hotfixes and improvements.

#### Third Layer

The third and final layer of an eCommerce platform is the backend data
layer, which can often be a bottleneck. A relational database always
requires some downtime to scale and, therefore, you must provision it with the
correct amount of resources so that it can handle unexpected traffic
spikes. The major metrics to monitor are CPU, Memory, IOPS, and Queue Depth.

For example, if Queue Depth has increased but the CPU Utilization remains
stable, you often need to inspect the Read/Write IOPS and consider
increasing provisioned IOPS. Why? Because the read and
write speed of the disk is not keeping up with the volume of queries to
the database system. Also consider identifying
the slowest queries and tweaking them to improve performance. When tables are
accessed, they become locked to protect the validity of data. Ensuring that
a query does not run for long reduces queue depth and latency.

### Pipeline

A successful eCommerce platform requires a reliable CI/CD pipeline so
that you can deploy urgent hotfixes and improvements quickly with zero
downtime. Something to consider for the front end is the invalidation of
static files on the CDN so that when dynamic content changes, it reflects
immediately on the live site. Middleware containers require
a pipeline that is responsible for building and storing container
images for effective versioning of application changes.

You can then implement rolling updates to perform zero-downtime deployments
that most container management systems such as Kubernetes and Amazon ECS
support. You can often deploy the backend layer alongside the middleware
to ensure database changes occur simultaneously with code changes.
Finally, one of the most critical components of the pipeline that happens
at the end of the deployment is the testing.

### Testing

An often overlooked component of an eCommerce platform, but arguably one of
the most critical ones, is load testing. This step is absolutely crucial
simply because the platform sees changes many times a week, up to many
times a day, and each of these changes can affect the system performance.

A best practice recommendation is to build and routinely run load tests on
the front and back end infrastructure in pre-production before releasing a
build to production. The load tests should automatically take place after a
deployment to pre-production, and you should store the results and compared them to
previous tests so that you observe the effect of code and query changes
before making the decision to release to production.

You can effectively use the tests to identify the most susceptible
components of the system and determine the max
throughput.You can translate this throughput to the number of concurrent
users on the system. Even the smallest changes can and should be tested when
load tests are fully automated.

### Conclusion

While there’s a lot more on the line during peak seasons like major
holidays, online retail sales are not just a one-off occurrence
tied to a specific day or time. With the right kind of planning and the
proper infrastructure in place, your eCommerce platform can meet
the expectations of both your IT team and your end users, all year long.
We work closely with our retail customers to provide an overall
better experience for the consumer. If you are looking for assistance with
your retail infrastructure, contact us.

<a class="cta teal" id="cta" href="https://www.rackspace.com/onica">Learn more about our AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
