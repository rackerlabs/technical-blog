---
layout: post
title: "VMware Cloud Director Logical Constructs"
date: 2022-03-14
comments: true
author: Amine Badaoui
authorAvatar: 'https://secure.gravatar.com/avatar/4773f2881d905eb157bc8ad84c69f6f7'
bio: ""
published: true
authorIsRacker: true
categories:
    - VMware
    - Cloud Servers
metaTitle: "VMware Cloud Director Logical Constructs"
ogTitle: "VMware Cloud Director Logical Constructs"
ogDescription: "To facilitate multi tenancy consumption of resources, VMware Cloud Director introduces various logical constructs that are critical to understand. In this article we will go through these constructs and how they all fit together."
slug: "VMware-cloud-director-logical-constructs"

---

**At Rackspace, we’ve enjoyed the many benefits VMware Cloud Director brings as it has allowed us to engineer a VMware-based cloud solution that delivers some amazing customer benefits once thought not possible on VMware. In this series over the next few weeks, I’ll provide an overview of some of the key features of VMware Cloud Director and our learnings. The series will cover the following topics so be sure to check back for new posts.**
<!--more-->
• VCD Overview

• VCD Autoscaling

• VCD Terraform interaction

• VCD Tanzu integration

• VCD 3.0 New Features

• VCD Storage Policies

• VCD VCF Integration

### Introduction
To facilitate multi tenancy consumption of resources, VMware Cloud Director introduces various logical constructs that are critical to understand. In this article we will go through these constructs and how they all fit together.

### Provider Virtual Data Center
A Provider Virtual Data center is a partition of the vSphere capacity and services that are made available to tenants. A PVDC provides compute, memory, storage and network connectivity for the VMs and vAPPs running within a VCD organization.
Resources are configured and allocated via various mechanisms such as storage policies for storage, resource pools for memory and CPU. These resources are allocated to tenant organizations from the Provider Virtual Data center. 


### Organizations

An Organization is a unit of administration and a security boundary that represents a collection of users, groups, and resources. Each Organization has a dedicated portal called the tenant portal. Example below: 

<img src=Picture2.png title="" alt="">


### Organization Virtual Data Center

An Organization Virtual Data Center (OVDC) is a subset of the resources that are provided by the Provider Virtual Data Center. These resources are securely shared through predefined allocation models. We will go through the available allocation models in an upcoming article.  

***Putting it all together, we end up with the below:*** 

-	PVCDs are created from vSphere resources
-	Organizations are security boundaries to which resources are provided.
-	Organization VDCs consume their resources from PVDCs

<img src=Picture3.png title="" alt="">





### Conclusion

I hope this was helpful. In the next article we will look at allocation models which determines how and when resources are committed. 


<a class="cta red" id="cta" href="https://docs.rackspace.com/blog/vmware-cloud-director-an-introduction/">Follow our VMware CLoud Directory Blog Series.</a>

<a class="cta red" id="cta" href="https://www.rackspace.com/cloud/vmware"> Let our experts guide you on your VMware Journey.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
