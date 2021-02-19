---
layout: post
title: "Basic AWS security principles"
date: 2021-01-05
comments: true
author: Rackspace Onica Team
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "Basic AWS security principles"
metaDescription: "We have done numerous security audits for companies and have run into some of the same issues on each audit, so we felt it would be beneficial for the community to write a blog post detailing some basic AWS security principles."
ogTitle: "Basic AWS security principles"
ogDescription: "We have done numerous security audits for companies and have run into some of the same issues on each audit, so we felt it would be beneficial for the community to write a blog post detailing some basic AWS security principles."
slug: "basic-AWS-security-principles"
canonical: https://onica.com/blog/security/basic-aws-security-principles/

---

*Originally published in Jan 2017, at Onica.com/blog*

We have done numerous security audits for companies and have run into some of the same issues on each audit, so we felt
it would be beneficial for the community to write a blog post detailing some basic AWS&reg; security principles.

<!--more-->

### Basic AWS security principles

A few basic AWS security principles are:

- Secure it when possible
- Evaluate risk vs. complexity
- Encrypt whenever possible
- Treat IAM as you would treat Active Directory permissions

#### Secure it when possible

Amazon built almost every service within AWS with security in mind. Let’s take Simple Storage Service (S3( for a quick
example: S3 enables you to write bucket policies to allow certain users from certain roles or groups to access a specific
bucket. You can also force encryption in transit and at rest by using bucket policies. Understanding bucket policies for
S3 helps ensure your data is as secure as possible while stored in S3 and is a basic AWS security principle.

Another example is Relational Database Service (RDS): RDS has several options for securing the data, specifically,
enforcing the data to be encrypted at rest and not exposing the RDS instance to the internet. Exposing a database to the
internet is a huge risk, and you should avoid it at all costs. This gives attackers an attack vector directly into your
customer data, whereas leaving it locked down and only accessible via the intranet forces attackers to make it through
one layer of security and then the next. Securing RDS could be an entire blog post, so we won’t dig too much into that here.

#### Evaluate risk versus complexity

It's no secret that implementing security measures often increases complexity in the environment for developers. Understanding
the security features and the complexity they add to your environment helps improve your relationship with your operational
staff and ensure that developers don’t dwindle. Before you implement a new security feature, ask yourself the following questions to ensure it’s best for your environment:

- What impact will this have on my operational staff?
- What impact will this have on my developers?
- What risk does this mitigate, and is there a hypothetical risk that will likely never occur?
- Can we implement log auditing to notify us if this ever occurs instead of complicating the environment?

Implementing new security measures just because they exist isn't necessarily the best thing to do. Remember that
your staff and colleagues still have to be able to work in a timely fashion.

#### Encrypt whenever needed

Many AWS services allow you to encrypt the data at rest. Some even allow you to encrypt the data in transit.
Encrypting all of your data is a smart move. However, you could incur costs that you don’t necessarily need
to incur. AWS Key Management Service (KMS) is an inexpensive service, but if you have a larger application
with millions of hits, it can add to your bill. Encrypt the data whenever needed, by which I mean encrypt
anything with user information, customer information, proprietary software, architecture designs, and so on.
You might not need to encrypt a page that’s displaying stock ticker symbols or road conditions to your office.
However, if it’s needed, encrypt it.

#### Treat IAM as you would treat active directory permissions

Not every user needs administrative rights on your AWS account. Only a few people should have such permissions. With
full administrator privileges, authorized or unauthorized users can modify logs and cover their malicious activity
tracks. These users can create additional users within IAM to spoof their activity. They can even change another user’s
password and use their account for malicious activity.

Within **Active Directory**, not all users should have `Domain Admin`. Very few users should retain the `Domain Admin`
privilege, and the others should have well-thought-out permissions for the environment. If some jobs don’t require you
to modify the firewall ports on your servers, these jobs shouldn’t have access to modify the Windows&reg; firewall. The
same goes for IAM in AWS. If your user doesn’t need to open up ports in a security group, don’t give them permission to do
so. Understanding what your users need to do within AWS and building IAM policies for their roles is vital. Associate the
policy to a group, and associate the users to the group. This is crucial to maintain the security and integrity of your data.

### Next steps

[Contact us](https://onica.com/contact/) to learn more about how we can help your organization with the basic principles of
AWS security. You can also read more of our latest [security blog posts](https://onica.com/blog/category/security/) for tips
and tricks from our subject matter experts.

<a class="cta red" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
