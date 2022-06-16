---
layout: post
title: "Oracle Cloud Guard Service Overview"
date: 2021-06-16
comments: true
author: Ashish Malik
authorAvatar: 'https://secure.gravatar.com/avatar/34310b153b29c26b510303ac8a4f6cec'
bio: ""
published: true
authorisRacker: true
categories: 
- Oracle
- Security
metaTitle: "Oracle Cloud Guard Service Overview"
metaDescription: "I have been working on Oracle Cloud technologies since 2018 and based on my experience, the goal of the cloud vendor is to educate customers about the potential benefits of the cloud and their IT teams of its implementation and migrations."
ogTitle: "Oracle Cloud Guard Service Overview"
ogDescription: "I have been working on Oracle Cloud technologies since 2018 and based on my experience, the goal of the cloud vendor is to educate customers about the potential benefits of the cloud and their IT teams of its implementation and migrations."
slug: "oracle-cloud-guard-service-overview" 

---

I have been working on Oracle Cloud technologies since 2018 and based on my experience, the goal of the cloud vendor is to educate customers about the potential benefits of the cloud and their IT teams of its implementation and migrations. 

<!--more-->

Post knowledge transfer from cloud vendors to customers in 20-21, we saw a sudden surge in vulnerabilities in 2022, and the software vendors came up with fixes for these new vulnerabilities. It would not be wrong to declare, “Security” as the theme for 2022, considering the number of vulnerabilities and their patches/fixes being announced.
As many of these software’s are running on cloud, it becomes the duty of cloud vendor to provide the required security tools to their customers to safeguard their data. 
It might be possible that a user may miss out on the new security releases, or the customer has a small IT team or there is no dedicated cyber security specialist. In such scenarios, the customer stands to lose out.
Keeping these gaps in security arsenal and many more factors in mind, Oracle came up with their latest offering named called Cloud Guard.


<img src=Picture1.png title="" alt="">

[Image Source](https://www.oracle.com/in/cloud/?source=:ad:pas:go:dg:a_apac:71700000084253396-58700007130462866-p64167916173:RC_WWMK160606P00040C0007:&gclid=EAIaIQobChMIjd_R3I2h9wIVDLrICh3vuQBoEAAYASAAEgJhVPD_BwE&gclsrc=aw.ds)

Oracle Cloud guard has been created with a view to protect the entire Infrastructure portfolio of the customer. With the help of Oracle Cloud Guard, customers can see the potential security problems in their whole tenancy in a summary to get a quick Security overview of their tenancy.

Oracle Cloud Guard also provides detailed navigation of problems categorized as Critical, High, Medium, Low etc. It also provides the risk scores and actionable items as per the threat priority to resolve security issues in the tenancy.

Oracle has enriched Cloud guard with security expertise through Inbuilt recipes (Detector & Responder recipes) that it can, not only detect Cloud Security Issues but can also automate their remediation.

There are two kind of detector recipes available in Cloud Guard: -
- 1. 	*Configuration Detector*: This can detect changes in Cloud Configuration.
- 2.	*Activity Detector*: This can detect changes in user activity.


With the help of these Detector Recipes, Cloud Guard detects & reports insecure configurations as problems such as a compute having a public IP address.

Cloud Guard scans the tenancy for the potential security threats, which are detected with the help of Detector Recipes, by turning them into actionable items and then responding them with the help of pre-defined Responder recipes. 

<img src=Picture2.png title="" alt="">
<img src=Picture3.png title="" alt="">

The entire Detector & Responder recipe structure has been designed to automate the response to security threats and minimize any kind of delay. With the help of these Detector and Responder recipes, we can clone them and further finetune them as per our requirements.

Oracle has recently Integrated Cloud guard with its two other security products i.e. OCI Vulnerability Scanning Service & Data Safe. With Oracle Cloud Guard’s tight integration with OCI Vulnerability Scanning Service, it’s now able to easily detect misconfigurations and identify possible vulnerabilities across various resources throughout the tenancy.

And with its integration with Data Safe, Cloud Guard can monitor database’s and with its pre-tailored Detector Recipe’s it can easily identify the potential security problems. DBA’s can then investigate those issues and resolve them at the earliest to further strengthen the Database security posture.

### Conclusion

With Oracle Cloud Guard Security Administrators, one can automate identification and remediation of the issues before it gets out of hand.


<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/oracle">Learn about Rackspace Managed Oracle Applications.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).