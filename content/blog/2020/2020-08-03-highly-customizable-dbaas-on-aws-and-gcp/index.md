---
layout: post
title: "Highly customizable DBaaS on AWS and GCP"
date: 2020-08-03
comments: true
author: James Hong
authorAvatar: ''
bio: "James has always been interested in anything and everything technology
since he was 5 years old. Started out with just exploring the internet and
tinkering with computers during the dial-up era to learning programming in junior
high and eventually graduating from University of Illinois Urbana-Champaign with
a bachelor's in Computer Science. James is currently a Product Manager at
ObjectRocket creating exciting new features for Redis and Elasticsearch."
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "Highly customizable DBaaS on AWS and GCP"
metaDescription: "As with any other cloud service, there's no one size fits all
design that works with every business's unique challenges. This is why we've
launched Private DBaaS, the same great databases we offer on our regular platform
except in a dedicated environment."
ogTitle: "Highly customizable DBaaS on AWS and GCP"
ogDescription: "As with any other cloud service, there's no one size fits all
design that works with every business's unique challenges. This is why we've
launched Private DBaaS, the same great databases we offer on our regular platform
except in a dedicated environment."
slug: "highly-customizable-dbaas-on-aws-and-gcp"
canonical: https://www.objectrocket.com/blog/private-dbaas/highly-customizable-dbaas-on-aws-and-gcp/

---

*Originally published on July 24, 2020 at ObjectRocket.com/blog.*

Moving to cloud solutions, whether for basic storage and compute resources or
managed solutions like ObjectRocket Databases, are becoming increasingly common
as businesses look to cut costs and simplify their operations. ObjectRocket at
Rackspace Technology serves as a simple one-stop solution for people wanting to
run databases.

<!--more-->

### Overview

{{<img src="Picture1.png" title="" alt="">}}

Moving to cloud solutions, whether for basic storage and compute resources or
managed solutions like ObjectRocket Databases, are becoming increasingly common
as businesses look to cut costs and simplify their operations. ObjectRocket serves
as a simple one-stop solution for people wanting to run databases. Customers get
all the features and performance of their favorite database without having to
worry about maintaining it. ObjectRocket offers those cost-effective and simple
solutions where anyone can sign up and spin up databases within minutes, which
people love to this day.

### Private DBaaS

As with any other cloud service, there's no one size fits all design that works
with every business's unique challenges. This is why we've launched Private DBaaS,
the same great databases we offer on our regular platform except in a dedicated
environment.

While our shared platform ensures that all our different customers are on separate
and secure containers where the data is only accessible by the respective customers,
the containers still share resources. With Private DBaaS, each customer gets
their own dedicated resources.

{{<img src="Picture2.png" title="" alt="">}}

**Private DBaaS Configuration**

### VPC peering

We have VPC peering support. What is this? Cloud platforms such as AWS&reg; and
GCP&reg; offer Virtual Private Clouds (VPC), where you can spin up resources in
a private virtual network, away from prying eyes. In this secure environment,
only resources within the network can talk to each other. Let's say you have a
VPC in which you run all your applications, and you don't want to leave the
safety of the VPC to talk to your database. The only choice is to run the database
within your VPC, meaning you need to maintain that. However, with VPC peering,
you can connect two VPCs together to act as one unified virtual private cloud.
This way, you can have your applications talk to ObjectRocket's databases with
the safety benefits of VPCs.

### Customized Resources

On ObjectRocket's shared platform, we needed resources that would cater to the
majority of our customers' needs. But like I mentioned before, not every business
has the same challenges or needs. We offer customized resources to suit your
databases' needs, such as different CPU and RAM ratios.

### Any Region

We can offer Private DBaaS in almost every AWS or GCP region as long as there
are three or more availability zones. Our shared platform is currently available
in a few select regions, but with Private DBaaS, we can go to virtually anywhere
your business requires.

### Mix and Match

Let's say you want to go into a region we currently do not support on our shared
cluster, no problem, a Private DBaaS can be spun up in that region in no time.
But let's also say that you want a couple of datastores that we support on our
shared clusters, perfect we can do that as well! Mixing and matching private and
shared clusters prevents you from spending a fortune on Private DbaaS in each
and every region you want to go into.

### More to Come

There are more exciting things to come with Private DBaaS in the future,
including Azure&reg; support, multiple VPC peering connections per cluster, and
more. At ObjectRocket, we're always coming up with new and better ways to run
datastores. If you have any ideas, feel free to reach out to us!

### Interested?

Learn more about our [Private DBaaS offering](https://www.objectrocket.com/private-dbaas/),
and if you are ready to get started, click to fill out a
[custom pricing quote](https://www.objectrocket.com/private-dbaas-quote/). If
you have any additional questions, contact us. We look forward to managing your
data and finding the best solution for your use case.

<a class="cta red" id="cta" href="https://www.objectrocket.com/">Learn more about our ObjectRocket.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
