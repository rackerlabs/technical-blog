---
layout: post
title: "AWS scaling best practices for Black Friday"
date: 2021-01-04
comments: true
author: Rackspace Onica Team
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "AWS scaling best practices for Black Friday"
metaDescription: "High-traffic events like Black Friday and Cyber Monday highlight the importance of
Amazon Web Services&reg;(AWS) auto-scaling best practices."
ogTitle: "AWS scaling best practices for Black Friday"
ogDescription: "High-traffic events like Black Friday and Cyber Monday highlight the importance of
Amazon Web Services&reg;(AWS) auto-scaling best practices."
slug: "aws-scaling-best-practices-for-black-friday"

---

High-traffic events like Black Friday and Cyber Monday highlight the importance of
Amazon Web Services&reg; (AWS) auto-scaling best practices. Online shopping during the four-day window
has become an international phenomenon, with traffic increasing by 20 to 25 percent each year.
Ensure your e-commerce site is ready for this surge and any unexpected spikes in demand.

<!--more-->

The ability to scale based on demand is one of the chief reasons businesses move their infrastructures to
the cloud. AWS offers many best practices for building scalability into your infrastructure: vertical
scalability (moving to higher-capacity instances) and horizontal scalability (adding more instances) to
respond to traffic surges.

### Seven AWS auto-scaling best practices to ensure your site is ready for anything

Best practices for preparing for events like Black Friday start with as much automating and
scaling as possible. But they don’t stop there. Preparing for mega surges
in traffic is about more than turning on a few switches.

Use the following AWS auto-scaling best practices and tools to prepare for high traffic events:

1. **Measure everything with [CloudWatch](https://aws.amazon.com/cloudwatch/)**. Monitor performance of all critical
   assets during high traffic events. Set alarms and notifications for key performance metrics conservatively
   to alert the right person or automate the right action.
2. **Use [Auto Scaling](https://aws.amazon.com/autoscaling/)**. Put the necessary resources into an auto-scaling group. Groups allow you
   to treat multiple instances as a single object to scale specific instance types with specific resources together.
   Auto scaling performs regular health checks on EC2 instances and automatically replaces instances
   that fail the health check. Auto scaling also supports the PCI-compliant processing, storage, and transmission of credit card data.
3. **Leverage [Elastic Load Balancing](https://aws.amazon.com/elasticloadbalancing)**.
   This can automatically distribute incoming application traffic across multiple instances in your auto-scaling group. Elastic Load
   Balancing can also balance traffic across multiple regions and Availability Zones.
4. **Use [Route 53](https://aws.amazon.com/route53/) to scale your DNS**. If you use Amazon Route 53 to route DNS queries to your load balancer,
   you can also use Route 53 to configure DNS failover for your load balancer. In this configuration,
   Amazon Route 53 checks the health of the registered EC2 instances for the load balancer to determine
   whether they are available and routes them to the most available resource.
5. **Improve performance with [AWS ElastiCache](https://aws.amazon.com/elasticache/)**. This improves the performance of your applications by
   allowing you to retrieve information from fast, managed, in-memory data stores instead of relying
   entirely on slower disk-based databases. ElastiCache automatically detects and replaces failed nodes
   and reduces the risk of overloaded databases, which includes slow website and application load times.
6. **Test, test, and test some more**. Use historical metrics to help forecast and model future traffic
   and to estimate your resource needs. Create scripts that mimic forecasted behavior and
   test against them. Hold surprise drills that force the team to react to problems.
   AWS also offers vulnerability and penetration testing for qualifying businesses.
7. **Think like a customer**. Remember, scaling for huge shopping events isn’t just about keeping your network
   up and running. It’s about delivering a great shopping experience for your customers. If your network
   is too slow or unavailable, you might lose more than a shopping cart.

Black Friday is one of many events that can cause spikes in traffic. It’s important to prepare for
these events year-round, not just when they’re expected. You can train your teams to deploy
these tools and best practices on short notice in the event of some unplanned surge.

### Need help preparing for Black Friday with auto scaling?

Rackspace Technology is a top AWS Premier Consulting and audited Managed Service Partner. We’ve migrated 85,000+ servers
to AWS, performing everything from basic *lift and shift* to helping to re-architect and manage services
on clients’ infrastructures so that they can take full advantage of cloud resources. If you’d like to
learn how working with an AWS Premier Consulting Partner can improve your business, contact us for
a quick assessment.

<a class="cta red" id="cta" href="https://www.rackspace.com/onica">Learn more about our AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
