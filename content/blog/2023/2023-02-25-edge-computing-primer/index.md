---
layout: post
title: "Edge Computing Primer"
date: 2023-04-05
comments: true
author: Anshuman Nath
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - Edge Computing
    - Private Cloud
metaTitle: "Edge Computing Primer"
metaDescription: "Since the invention of computers, the architecture paradigm has been swinging like a pendulum, between centralized & distributed systems. "
ogTitle: "Edge Computing Primer"
ogDescription: "Since the invention of computers, the architecture paradigm has been swinging like a pendulum, between centralized & distributed systems."
slug: "edge-computing-primer"

---

Since the invention of computers, the architecture paradigm has been swinging like a pendulum, between centralized & distributed systems. 


<!--more-->

#### Introduction

. Interestingly, none of these architectures got completely phased out since they were introduced. They co-exist and interact with each other in our widely interconnected world. We are in the middle of a growing number IP-addressable devices, in our homes, out on the streets & shops, and in our work environments. New architectural considerations are needed, for availability of cloud capability at remote locations, to support today’s requirements as well as tomorrow’s innovations.


This has given birth to the latest paradigm in distributed systems, Edge Computing, which simply put, is about delivering compute & storage resources as well as bandwidth capacities, much closer to the end users. The paradigm of Edge Computing is to connect billions of edge devices to millions of edge locations, that are in turn connected to thousands of cloud regions across the world. With this, the aim is to reduce application latency, deliver an improved end-user experience, and to comply with data locality.

<img src=Picture1.png title=edge computing alt= edge computing>
                           
                            *Edge Computing - Key Drivers*
-	Applications that require low latency, cannot be achieved by using centralized cloud every time & everywhere
-	Huge number of network-aware devices are generating massive amount of data over a wide area. If we manage to reduce the need for movement of that data to central location for processing, this can save cost and enable efficient use of resource
-	Need to comply with data privacy & sovereignty

 - 	Need to match the context awareness of different kinds of workloads. Not all edge deployments will require the same application at the same point in time, because of location variance and the changes in demand. For example, self-driving cars, IoT, online gaming need <= 5 milliseconds round-trip communication, while for other workloads like Augmented Reality, Smart Grids, it would be in the region of 10-40 milliseconds

 -  <= 5 milliseconds milliseconds round-trip communication, while for other workloads like Augmented Reality, Smart Grids, it would be in the region of 10-40 milliseconds
-	In the remote areas, we are faced with applications that need to run with limited or constrained connectivity 
-	Many scenarios like high-frequency trading, gaming, driverless cars etc. need faster transactions for a better experience

**Edge computing Characteristics**

-	Real-time, low-latency access to cloud-like processing performance and storage capacity
-	“Local” compute and storage near the infrastructure edge to address data security and privacy requirements 
-	Resilient equipment that can be operated in facilities (“micro datacentres”) that may not have the stable, redundant, or reliable electrical power and environmental controls of traditional datacentres
-	By offloading data processing and transfer from public cloud to the edge resources, edge applications can make more efficient and cost-effective use of network bandwidth
                            

**Edge Computing: Ecosystem**

1.	Application Developers: - The edge will enable a new “edge-native” application architecture for developers to build microservices in containers and Kubernetes clusters that leverage on-demand edge infrastructure to deliver real-time performance closer to their end users and devices.

2.	Device Makers/OEMs: - Internet of Things (IoT) device manufacturers can leverage the edge cloud to augment the compute resources available on their devices such as sensors, actuators, gateways, with additional resources available closer to those devices, as an intermediate tier between the devices and the public cloud.

3.	Cloud providers and content delivery networks (CDNs): - CDNs, which typically provide web content caching for static content, such as streaming video, are evolving as part of the edge cloud as well.

4.	Mobile and Telecom operators: - By deploying edge infrastructure in their last-mile facilities, mobile and telecom operators can provide compute and storage resources for their customers.

5.	Technology partners: - Companies such as Intel, Microsoft, and others are developing new capabilities in their various solutions to support the edge ecosystem. Additionally, new technology services will be needed to integrate and optimize device edge, infrastructure edge, and public cloud environments



**Conclusion**
   
   Centralized cloud computing is still one of the least expensive and most effective ways to store or archive large data sets or process non-time-sensitive information. However, for operations that require low latency or near real-time data processing, such as device control and orchestration, edge compute in a distributed cloud is the way to go. When used together, centralized cloud and edge cloud architectures can provide more efficient workflows, allowing businesses to process and store actionable data in the network tier that makes the most sense for any given application, workload, or use case. Rackspace Technology has worked with clients from prototype to production, applying our collection of hardware, cloud platforms, application, and analytics accelerators to fast track the development of their IoT & Edge solutions

<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/iot-edge"> Learn more about our Edge capabilities 
