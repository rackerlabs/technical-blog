---
layout: post
title: "Adobe Experience Manager in the Cloud"
date: 2020-12-04
comments: true
author: John Jubela
published: true
authorIsRacker: true
categories:
    - General
    - AWS
metaTitle: "Adobe Experience Manager in the Cloud"
metaDescription: "Organizations around the world are rapidly adopting public clouds. Either
by moving legacy applications, building their own cloud-native applications, purchasing off
the shelf software, or consuming Software-as-a-Service (SaaS) applications that leverage
underlying public cloud infrastructure."
ogTitle: "Adobe Experience Manager in the Cloud"
ogDescription: "Organizations around the world are rapidly adopting public clouds. Either
by moving legacy applications, building their own cloud-native applications, purchasing off
the shelf software, or consuming Software-as-a-Service (SaaS) applications that leverage
underlying public cloud infrastructure."
slug: "adobe-experience-manager-in-the-cloud"

---

Organizations around the world are rapidly adopting public clouds. Either by moving legacy
applications, building their own cloud-native applications, purchasing off-the-shelf
software, or consuming Software-as-a-Service (SaaS) applications that leverage underlying
public cloud infrastructure.

<!--more-->

### Cloud Adoption

There are many reasons for moving to the public cloud: Scalability, elasticity, op-ex
versus cap-ex, infrastructure discounts based on prepaying or large spend, enterprise
agreements, cutting-edge technology like Kubernetes, and many others. Some organizations
have strategic initiatives to move to the public cloud driven by an incoming CEO or CTO.
Others no longer want the burden or the capital-intensive costs of managing their own data
centers.

With the speed that AWS&reg;, Microsoft&reg;, and Google&reg; are putting out new features
and products, it just makes sense for many organizations.

### Adobe Experience Manager Licensing

So, we know public cloud adoption is extremely popular these days. Now let's talk about
Adobe&reg; Experience Manager (AEM). AEM is an industry-leading Enterprise Content Management
System (CMS) or Digital Experience Platform (DXP) that has been sold as an on-premise license
for many years, going back to the Day Software *Communiqué* and later CQ5 days. Adobe
purchased Day Software in 2010 and quickly renamed the CMS software to CQ5 and later Adobe
Experience Manager.

Many Adobe customers, who have been savvy enough to keep their legacy licensing models,
still retain on-premise licensing. These customers are typically not comfortable with Adobe
hosting the software for them on AWS or Azure&reg; via their Adobe Managed Services (AMS)
offering. They typically have very complex configurations that require full control of the
infrastructure, operating systems, and AEM software.

I've recently seen customers on Adobe Managed Services make the move back to an on-premise
licensing model and move their AEM deployments over to a public cloud managed by Rackspace.

There is currently a strong push from Adobe to move AEM customers from an on-premise
licensing model to their AMS hosting platform or ever their new AEM as a Cloud Service product.
Some customers give in and make the move from on-premise, and others choose to keep their
on-premise licensing.  

By keeping their on-premise licensing, they can deploy and manage AEM on their own cloud
platform on their own terms. The Adobe hosting models do make sense for a certain customer
profile, but for others, it's just not an option due to things like access, security, data
privacy, and code deployments.

Adobe said that there won't be an on-premise version of AEM past 6.5, but I really think
it will be hard to push all of their large Enterprise customers to their cloud offerings
given their bespoke requirements.

### AEM in the Cloud

I often get asked by our Public Cloud Architects on opportunities: Is AEM even cloudy? Well,
not really, but it's getting there with the introduction of things like the Oak Composite
NodeStore. You can also do things like auto-scale AEM Dispatchers and AEM Publishers with
some custom automation, but AEM isn't really a *cloudy* or cloud-native application by
nature.

So AEM isn't that cloudy, but this is okay. You can still deploy AEM on the public cloud
and see many great benefits. Public clouds like AWS, Azure, and GCP have proven to be stable
and highly performant deployment options for AEM if architected properly with performance
and security top of mind. The key is knowing how to architect AEM properly and how to
architect each public cloud for the highest level of availability and redundancy.

Rackspace designs each AEM customer's deployment in the pre-sales process, leveraging our
best practices from both an AEM and public cloud perspective. We currently have best
practice AEM solutions for AWS, Azure, and, more recently, GCP.

### How we can help

So how can Rackspace help you with AEM? Rackspace has been deploying, managing, upgrading,
migrating, monitoring, and hosting AEM environments for customers since 2012. We did have
many AEM(CQ5) deployments before then, but there was no official application-level support
offering around it.

On-premise AEM deployments naturally found their way to Rackspace around 2010 due to our
industry-leading hosting services that included support for Java&reg;, Linux&reg;,
networking, storage, and private cloud infrastructure. We started to see a heavy demand for
AEM application-level support on top of our already solid hosting model. So, we decided to
create a product offering around it, which launched in 2012 and is still going strong today.

Rackspace takes the burden of deploying and managing infrastructure off the customer while
also managing and monitoring their AEM application from an operations perspective. This
service enables our AEM customers to focus on creating content, pushing new code, and
creating overall great end-user experiences for their customers. Currently, we manage around
500 AEM servers for our install base. Our AEM customer profile is typically a long-term
customer with higher than average NPS scores. We've assisted these customers with upgrades
from 5.x all the way to the current version of 6.5. We've also helped our customers with
their own transitions from dedicated hosting to the public cloud.

### AEM on AWS

We have seen great success in deploying the AEM application on AWS and Azure. For example,
leveraging AWS S3 storage for very large datastores has proved critical. We are currently
managing AEM datastores from the 10 TB range to the 200 TB range. Rackspace manages one of
the largest, if not the largest, AEM content repository globally, and we leverage AWS S3
storage to do it. While we could leverage a dedicated storage array for these use cases,
it is much more cost-effective to leverage AWS S3 storage.

AWS also has many other technical benefits, including EBS Snapshots for durable backups,
multi-region AWS deployments for Active/Active scenarios and Disaster Recovery capabilities,
and highly performant EC2 instances and Elastic Block Storage.

Lastly, AWS allows for customers to consume cloud computing in a very cost-effective way.
By leveraging upfront or partial upfront Reserved EC2 instances, customers can see huge cost
savings on their compute infrastructure required to run the AEM application.

### AEM on Azure and GCP

We have seen great success on the Azure cloud leveraging Azure Site Recovery (ASR) for AEM
Disaster Recovery environments. Azure has also proven instrumental for some of our customers
who have Enterprise Agreements with Microsoft and must use the Azure cloud. AEM runs great
on Azure Infrastructure-as-a-Service (IaaS) compute instances using either Red Hat Enterprise
Linux&reg; or CentOS&reg;.

Lastly, although we are very early in using GCP for AEM, we expect to see great results
from these deployments based on our early testing. GCP has proven to be a very high
performant public cloud with very cost-effective pricing.

### AEM on VMware

And let's not forget the private cloud. Rackspace has a long history of deploying and
managing VMware&reg; private cloud solutions for our AEM customers and customer base in
general. For some of our customers, such as financial institutions, private cloud is a hard
requirement due to their shared-nothing requirements. Rackspace can provide dedicated
physical networking, compute, and storage solutions to meet each customer's performance and
security requirements.

### Rackspace AEM Roadmap

Looking towards 2021, we have a premium support offering for the AEM application, advanced
monitoring tools from industry-leading application performance monitoring vendors, and
support for the major public clouds. This offering, paired with our optional advanced
security offerings, gives our customers highly performant, highly secure best-practice AEM
application and infrastructure deployments.

But we don't stop there. We also continue providing ongoing day-to-day AEM and public cloud
operations support for our AEM customers. Multi-region, Active/Active, and Disaster Recovery
solutions are also commonplace with our Enterprise AEM customer base.

Looking into 2021, Rackspace plans to support AEM deployments that are not hosted on
Rackspace managed public or private cloud solutions. We are currently investigating
supporting Adobe Managed Services (AMS) deployments, AEM-as-a-Cloud-Service deployments,
and AEM deployments running in customer-owned and or self-supported clouds.

You can [download our whitepaper on RAS for AEM](https://www.rackspace.com/resources/rackspace-application-services-adobe-experience-manager).
You can also check out our [RAS Digital Experience Application Operations Customer Handbook](https://developer.rackspace.com/docs/dxp-customer-handbook/).

<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/adobe-experience-manager">Learn more about our Adobe Experience Manager services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
