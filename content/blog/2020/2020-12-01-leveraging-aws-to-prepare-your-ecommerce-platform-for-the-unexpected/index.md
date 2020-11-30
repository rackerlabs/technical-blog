---
layout: post
title: "Leveraging AWS to prepare your eCommerce platform for the unexpected"
date: 2020-12-01
comments: true
author: Matt van Zanten
authorAvatar: ''
bio: ""
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

If you run or support an online retail platform, you are well aware of the
perils of having to deal with high volume traffic during major sales or
the holiday season, which can unfortunately lead to website crashes,
frustrated customers and abandoned shopping carts.

<!--more-->

Every year, there are
stories that surface of some major brand that has fallen victim to this
cycle. Whether you have experienced this or not, there are ways to
future-proof your eCommerce infrastructure to avoid this scenario. This
blog covers the many aspects of planning, building, testing, and leveraging
AWS to successfully build a scalable and highly available eCommerce platform.

### Planning

Building a successful eCommerce platform on AWS begins with the planning.
Selecting the technologies that will be used to implement, run and
continuously deploy the infrastructure are the first steps as some technologies
might be more difficult to replace than others after systems are customer
facing. Discuss the pros and cons of native infrastructure management tools
for example AWS CloudFormation versus a third party tool.

Building a pipeline will be crucial as it will provide you with a process to
rapidly test and deploy hotfixes and improvements. You may be using bitbucket
as your repository, if so perhaps consider bitbucket pipeline as it will be
very quick to get running. You may also want to consider a native solution
such as AWS CodePipeline as it will also eliminate the need to roll out
additional infrastructure. Once you have answered these questions, you can
begin to plan out the infrastructure.

### Infrastructure

Typically, there are three major layers to an eCommerce platform, all of
which are imperative for a successful implementation.

#### First layer

The first layer is the frontend, where you need to identify the content and
how it is generated. Usually the content of an eCommerce platform is managed
by software and is dynamically generated, then served by a web service on
the fly. To ensure that the dynamically generated content is highly
available, the front end systems should be managed by an autoscaling group
in multiple availability zones (AZs) with a load balancer to evenly
distribute traffic.

Through personal experience, more attention can initially be put into
availability than scalability with a front end system when implementing
a content delivery system (CDN). Using a CDN will significantly reduce the
load on a front end server because it will take your dynamically generated
content, and serve it statically from data centers across the globe ensuring
that all customers will have a swift browsing experience.

#### Second layer

The second major layer is the middleware, this is where all the data
processing such as API calls will take place. Through my experience
managing eCommerce middleware, I can attest that this requires the greatest
effort to implement correctly. Much thought will have to go into the
scalability and availability of these systems. Much like the frontend,
middleware applications must be autoscaling, highly available and load
balanced to ensure they will handle unexpected load without causing
application latency.

A very successful way that I have managed middleware systems is by running
container workloads on auto-scaling groups. A major factor why this
improves performance is because containers will scale much more quickly
than an auto-scaling group. As a result when a container becomes
unresponsive, it can be terminated and replaced in a matter of seconds
versus auto-scaling groups which can take minutes. Every second counts
when handling customer traffic. A customer may decide to drop off if
they are having a poor shopping experience. A container based approach
will also aid to accelerate your ability to push hotfixes and improvements.

#### Third Layer

The third and final layer of an eCommerce platform is the backend data
layer which can often be a bottleneck. A relational database will always
require some downtime to scale and therefore must be provisioned with the
correct amount of resources so that they can handle unexpected traffic
spikes. The major metrics to monitor are CPU, Memory, IOPS and Queue Depth.

For example, if Queue Depth has increased but the CPU Utilization remains
stable, you will often need to inspect the Read/Write IOPS and consider
increasing provisioned IOPS. The reason for this is that the read and
write speed of the disk is not keeping up with the volume of queries to
the database system. Another important thing to consider is identifying
the slowest queries and tweaking them to improve performance, as tables are
accessed, they will become locked to protect validity of data, ensuring that
a query does not run for long will reduce queue depth and latency.

### Pipeline

A successful eCommerce platform will require a reliable CI/CD pipeline so
that urgent hotfixes and improvements can be deployed quickly and with zero
downtime. Something to consider for the front end is the invalidation of
static files on the CDN so that when dynamic content changes, it will be
immediately reflected on the live site. Middleware containers will require
a pipeline that will be responsible for building and storing container
images for effective versioning of application changes.

Rolling updates can then be implemented to perform zero downtime deployments
and are supported by most container management systems such as Kubernetes and
Amazon ECS. The backend layer will often be deployed alongside the middleware
to ensure database changes are made simultaneously with code changes.
Finally, one of the most critical components of the pipeline that will happen
at the end of the deployment is the testing.

### Testing

An often overlooked component of an eCommerce platform, but arguably one of
the most critical ones is load testing. This step is absolutely crucial
simply because the platform will see changes many times a week, up to many
times a day, and each of these changes can have an effect on the
performance of the system.

A best practice recommendation is to build and routinely run load tests on
the front and back end infrastructure in pre-production before releasing a
build to production. The load tests should automatically take place after a
deployment to pre-production, the results should be stored and compared to
previous tests so that the effect of code and query changes are observed
before making the decision to release to production.

These tests can be effectively used to identify the most susceptible
components of the system and as well can be used to determine the max
throughput. This throughput could be translated to the number of concurrent
users on the system. Even the smallest changes can and should be tested when
load tests are fully automated.

### Conclusion

While there’s a lot more on the line during peak seasons like major
holidays, online retail sales are not just a one-off occurrence that are
tied to a specific day or time. With the right kind of planning and the
proper infrastructure in place, your eCommerce platform will be able to meet
the expectations of not just your IT team, but your end users as well,
year round. We work closely with our retail customers to provide an overall
better experience for the consumer. If you are looking for assistance with
your retail infrastructure, please contact us.

<a class="cta teal" id="cta" href="https://www.rackspace.com/onica">Learn more about our AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
