---
layout: post
title: "Are you leakproof?"
date: 2020-06-01 00:01
comments: true
author: Raj Arora
published: true
authorIsRacker: true
categories:
    - Security
metaTitle: "Are you leakproof?"
metaDescription: "We live in a world where data and digital information are more expensive than a
Ferrari, and thieves can steal billions without even getting off the couch. They
can get away with megabucks just by cracking a system."
ogTitle: "Are you leakproof?"
ogDescription: "We live in a world where data and digital information are more expensive than a
Ferrari, and thieves can steal billions without even getting off the couch. They
can get away with megabucks just by cracking a system."
---

We live in a world where data and digital information are more expensive than a
Ferrari, and thieves can steal billions without even getting off the couch. They
can get away with megabucks just by cracking a system.

<!-- more -->

Everything comes with pros and cons, and the modern era of digitalization has
its fair share of risks and threats. But are you leakproof, or do you run the
risk of getting wet when the hackers break through your roof?

In the 21st century, when the world is moving fast towards artificial intelligence
and machine learning, the cloud is an essential aspect of the information
technology industry. Businesses are gradually moving from on-premises data centers
to the cloud because it provides highly scalable, flexible, and reliable resources
for the dynamic needs of modern customers. Models like function-as-a-service and
per-second billing are changing the way we think about the infrastructure.

Despite its many advantages, the cloud does have a few shortcomings, and
cybersecurity is one of them. You need very proficient and experienced network
specialists to create a secure infrastructure on the cloud.

At Rackspace, we help customers to have a tightly packed, secure cloud platform
with the knowledge of experienced and highly skilled engineers and **Fanatical Support**&reg;.
We create the concrete, leakproof infrastructure that our customers value.

### Worried about security risks?

You can perform the security checks in this section to ensure that your
infrastructure is airtight and that you limit the significant security risks.

All major cloud providers have tools and processes to address the concepts in
the following sections.

#### Subnets and routing

Make sure that you name subnets appropriately and that no naming conflicts exist.
You should attach the private subnets to a private routing policy and the public
subnets to a public routing policy. You can also create multiple routing policies
for large infrastructures where you need further separation between the different
private subnets. Sometimes, engineers associate multiple subnets to one routing
table to filter at the security-groups level and add restrictions. However,
that strategy is often risky. We recommend that you have a different routing
policy for different types of subnets.

For example, suppose your organization has three departments: HR, Finance, and
Manufacturing. They all need IT infrastructure to meet their specific needs.
Generally, you should have two private and two public subnets for each department
and deploy particular resources in the respective subnets. Also, different routing
tables help you to organize and secure the infrastructure.

#### Security groups

Cloud engineers should standardize and segregate the security policies into
security groups that serve as the last level of the firewall on a resource. Ideally,
you should create individual security groups for each instance and a security
group for every team.

For example, suppose you have three instances, A1, A2, and A3, on a specific
infrastructure. Three teams, B1, B2, and B3, need to access all those
instances. In this case, create nine different policies, such as the following
ones:

- SG-A1-B1
- SG-A1-B2
- SG-A1-B3
- SG-A2-B1
- ...
- SG-A3-B3

You might get a request from a specific user in team B1 to open a port in B2.
If you create the recommended security groups, you can reduce the risk for
the other two instances. A single security group opens a port on one
instance instead of all three instances.

You should standardize and describe every security policy that is part of a
security group and define an owner for security policies. The creation process
flow should be similar to the following example:

Segregate > Standardize > Ownership > Description

#### Penetration testing

Most cloud providers offer a vulnerabilities and penetration testing service for
customer-specific infrastructure. You can schedule a test every quarter or
semiannually, depending on how much your infrastructure changes. It is a great
way to check if the system has vulnerabilities that you need to address.

### Conclusion

Security is a significant concern for organizations operating in or moving to
the cloud. Rackspace accepts the responsibility of securing your data and gaining
your trust as you continue your journey in the cloud.

Visit [www.rackspace.com](https://www.rackspace.com) and click **Sales Chat**
to get started.

Use the Feedback tab to make any comments or ask questions.
