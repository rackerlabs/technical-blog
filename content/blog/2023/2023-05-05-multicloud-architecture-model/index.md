---
layout: post
title: “Multi-Cloud Architecture Models”
date: 2023-05-05
comments: true
author: Scott Beckford
authorAvatar: 'https://s.gravatar.com/avatar/e7c2a4f3904d251ef363c37ee9b69fd4?s=80'
bio: ""
published: true
authorIsRacker: true
categories:
    - Architecture
    - AWS
    - Azure
    - GCP
metaTitle: "Multi-Cloud Architecture Models"
metaDescription: “Demystifying Multi-Cloud Models - Choosing the Right Approach for Your Organization”
ogTitle: “Multi-Cloud Architecture Models”
ogDescription: “Demystifying Multi-Cloud Models - Choosing the Right Approach for Your Organization”

---

Selecting the right multi-cloud model for your organisation can be tricky, in this blog post, we'll discuss the different types of multi-cloud models and help you determine which one is right for your organisation.

<!--more-->

### Introduction

As cloud computing becomes increasingly popular, more and more businesses are migrating to the cloud, and for many companies, operating a single cloud efficiently and cost effectively is difficult enough, and often this provides them all that they need to run their business.
But for those who find something missing, or that operating in a single cloud doesn’t fulfil all of their requirements, it is common to then move on to adopting a multi-cloud strategy.
Multi-cloud is simply a model that involves using multiple Cloud Service Providers to deliver IT services for your organisation.
                           
Multi-cloud offers many benefits:
- Avoid vendor lock-in
- High Availability/DR capability
- Best of Breed - CSP specific niche best of … (GCP - K8’s, Azure - Windows, AWS - machine learning)

But also comes with many challenges:
- Vulnerability - a larger attack surface means implementing controls across multiple clouds is a much bigger challenge.
- FinOps - cloud native tooling doesn’t provide a cross platform view.
- Connectivity - private networking across multiple clouds is a real challenge for even the most seasoned network engineers.
- Compliance - managing compliance across multiple clouds can double or triple the existing whack-a-mole challenge for DevSecOps teams.
- Cost - cloud costs don’t scale linearly (less discount on savings plans) + internal costs (multiple CCoEs)
- Training - experienced Multi-cloud engineers come at a price, if you can find them at all!
- Standardised Account provisioning/Identity and Access Management needs to be carefully thought out to keep good hygiene.
- Standardised Observability - support teams and business management need a clear and concise view of whats happening at any one time.
- IAM - Managing user identities, roles, and access privileges across multiple cloud environments requires a centralized IAM strategy.
- Data Protection - encryption, access controls, and data classification mechanisms must be consistently applied and managed across all clouds to prevent unauthorized access or data leakage.
- Network Security - secure multicloud connectivity to protect data in transit and prevent unauthorized access requires a well thought design.
- Architecture Consistency - Organizations must ensure consistent  practices and policies across all cloud providers to maintain a unified and effective security posture.

### Multi-cloud Operating Models

Lets explore the Cloud Operating Model options:
1. Single Cloud
2. Hybrid Multi-cloud (Public/Private Cloud + On Premise)
3. Preferred Cloud + Secondary Cloud
4. Distributed Workloads (Best of Breed)
5. Active-Active Multi-cloud
 
### Single Cloud

After choosing a hyperscaler and migrating your business to the cloud, there are many opportunities to rearchitect and refactor applications to really make the most of the cloud native services offered.  Tight integrations to CSP specific tooling really bring great benefits, and for many customers, the high availability and multi-region offerings from each of the CSPs is enough.  On top of that, it is much easier to manage a smaller CCoE when there is only skills and certifications of one cloud provider to factor in.

Pros: Easiest to get started, a specialised team dealing with Cloud Native tooling can maximise the business benefit moving to cloud.
Cons: Vendor Lock-in.
 
### Hybrid Multi-cloud (Public/Private Cloud + On Premise)

While not strictly Multi-cloud in the Hyperscaler sense, the hybrid multi-cloud model involves using a combination of public cloud, private cloud, and on-premises infrastructure to meet business requirements. This approach allows organisations to leverage the scalability and agility of public clouds while retaining control over sensitive data and critical applications in private or on-premises environments. For example, an organisation may use a public cloud provider for non-sensitive data and applications, a private cloud for sensitive data and regulatory compliance, and on-premises infrastructure for mission-critical workloads.

Pros: Low latency to data and tight controls over sovereignty.
Cons: Double overheads - this approach still requires an on-premise team and all the associated costs of running a datacentre.
 
### Preferred Cloud + Secondary Cloud

There are often business grounds where a business case can be made to use a secondary cloud for specific workloads.  This may be because a certain feature is not available, or a 3rd party partner operates within a specific cloud. Workloads running on the secondary cloud are often managed on a "business case exception" basis.

Pros: Maintain vendor support for specific products and reduce data transfer costs between clouds.
Cons: Double overheads - Maintaining Two Landing Zones means the Cloud team needs to be proficient in operating two clouds.
 
### Distributed Workloads (Best of Breed)

The distributed workload or best-of-breed multi-cloud model involves selecting the best cloud services from different providers for different applications or workloads. This approach allows organizations to leverage the unique strengths of different cloud platforms, such as AWS, Azure, Google Cloud, or other providers, to meet specific business requirements. For example, an organisation may choose AWS for hosting ec2 linux workloads, Azure for cost efficient Microsoft Windows hosting, and Google Cloud for its data analytics and machine learning capabilities.

Pros: Most flexibility.  Customise the workload placement strategy to suit your business requirements.  
Cons: Triple overheads - Cloud team needs to be proficient in operating three clouds.
 
### Active-Active Multi-cloud

The Active Active model is the hardest of all to successfully achieve, it involves running the same cloud agnostic workload across multiple clouds, this model is well suited to running K8s containerised workloads.

Pros: near realtime redistribution of workloads possible according to your criteria.  (think, follow the sun around the world using solar green energy, or snap instance pricing)
Cons: replace Vendor lock-in with framework/platform/tools lock-in instead.

### Illustration
An example situation is illustrated in the diagram below, where a fictitious company has chosen AWS as their preferred Single cloud, and is looking to expand out into a multicloud solution using the hyperscaler models (1,3,4,5) above.

<img src=multicloud-All-in-One.drawio.png title=multi-cloud alt= multi-cloud>

not discussed is the worst option of running everything in every cloud, as of course this is not a good use of money, time or resources.

### Conclusion
However you choose to run your Cloud it must be backed by a solid strategy which understands how utilising the cloud supports your business.  From the cloud strategy, a workload placement strategy can be derived, helping you to choose which workloads should go in which cloud.  Selection criteria might be based on Security and Compliance, Functional Requirements (eg: Windows SQL on Azure), Operational Requirements (Licensing), Infrastructure (linux compute on AWS EC2), Cost, or even sustainability (C02 emissions).

Ultimately, a multi-cloud model can provide companies with greater agility, scalability, and resilience, enabling them to quickly adapt to changing market conditions and drive growth, but it comes at a cost.
If you want to talk multi-cloud, please send me a private message, or better yet, come and talk to our team here at Rackspace, we are always happy to help!

