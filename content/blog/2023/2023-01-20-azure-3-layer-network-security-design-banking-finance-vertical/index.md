---
layout: post
title: "Azure 3 Layer Network Security Design for Banking & Finance Vertical"
date: 2023-01-20
comments: true
author: Ankush Chouhan
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - Microsoft Azure
    - Security
metaTitle: "Azure 3 Layer Network Security Design for Banking & Finance Vertical"
metaDescription: "Any Company/Organization planning to move to cloud or looking to deploy a greenfield workload, will require a well architected landing zone with the right security posture."
ogTitle: "Azure 3 Layer Network Security Design for Banking & Finance Vertical"
ogDescription: "Any Company/Organization planning to move to cloud or looking to deploy a greenfield workload, will require a well architected landing zone with the right security posture."
slug: "azure-3-layer-network-security-design-banking-finance-vertical"

---

Any Company/Organization planning to move to cloud or looking to deploy a greenfield workload, will require a well architected landing zone with the right security posture.

<!--more-->

#### Introduction

*According to Microsoft, the landing zone is the result of an Azure environment with multiple subscriptions that consider scale, security governance, networking, and identity. Azure Landing Zones enable organizations to perform enterprise-scale application migration, modernization, and innovation in Azure. Regardless of Infrastructure as a Service or Platform as a Service, this approach considers all the platform resources needed to support the customer's portfolio of applications.*

We could also understand landing zone as the environment in the cloud for hosting applications which is created by cloud thinking with the proper planning of network, security, governance and management. Landing zone could be extended as per need later in the future or reduced without impacting workloads. Landing zone is deployed via code so that it would be repeatable with consistent configuration and controls.
In this document, we will look at a typical network security architecture, which could be used as a reference design for any banking and finance customer.


### Overview

*Banks, brokerage firms and insurance companies have always aimed to secure the trust of their customers by protecting private and sensitive information. Well-planned information availability and security is essential for customer loyalty and compliance with all federal regulations.*

When we talk about cloud there is a difference as compare to the on-premises for example cloud has opex model and on-prem has capex similarly if we talk about security it’s not perimeter focused like old days but a diverse approach, and current good practice is Zero trust.
The Zero Trust approach implies breach and acknowledges that bad actors exist everywhere. It advises that rather than constructing a barrier between trustworthy and untrustworthy areas, we should validate all access attempts, restrict user access to JIT (Just in Time) and JEA (Just Enough Administration), and harden the resources themselves. 

*However, this does not prevent us from maintaining safe zones. In fact, by dividing the network into smaller areas and regulating the traffic that is allowed to flow between them, a network firewall acts as a check and balancer for network communications.*

This security-in-depth practise compels us to assess whether a specific connection should cross a sensitive barrier.

The 3-layer network security architecture covered in this blog consists of perimeter, hub and core which are the guardrails for network traffic. These 3 zones are protected by the network virtual appliance that belongs to 3 different providers to enhance security.

#### Architecture Overview-

<img src=Picture1.png title="" alt="">

Above landing zone has network segregation on virtual networks as perimeter, hub and core which is further segregated by spoke virtual networks to achieve the 3-layer architecture. 
 
-	Hub network is connected to both core and perimeter.
-	Core network is only connected to hub network. 
-	Perimeter network is only connected with hub network


On a high level, the above network topology is more or less like hub and spoke. Where each virtual network is protected by network virtual appliances and connected to the hub network. The core network is a well-protected virtual network for internal business-critical applications which are running on their spoke virtual networks. North to south traffic is protected by FortiGate virtual appliance and east to west traffic is by Palo Alto in hub and Cisco ASA in core.


The above diagram represents all the 3 layers - perimeter, hub and core. The entry point for all the traffic is the perimeter virtual network, which is protected by an HA pair of FortiGate network virtual appliance in active-passive mode. After all the rules are applied, the filtered traffic would be allowed to enter hub virtual network, which is protected by the HA pair of Palo Alto network virtual appliance and then comes core virtual network which is protected by HA pair of Cisco ASA network virtual appliance.


The reason behind using three different network virtual appliance is to filter traffic at all layers until it reachs the destination. The idea behind the use of three different brands of network virtual appliances is to utilize all the different capabilities provided by these brands. In addition, if one network virtual appliance misses on any threat vector for any reason, another virtual appliance will capture it. This will enhance the overall security. 

#### Let us check how these 3 security gates allow various communications - 

-	Azure to Azure – Spoke connected with hub network will communicate via hub firewall.
     – Spoke connected with core network will communicate via core firewall.
-	Azure to On-prem – All the traffic will flow via hub and perimeter firewall however in case of core spoke’s core firewall will also get involved.
-	On-prem to Azure – All the traffic will flow via perimeter firewall to hub firewall however in case of access the core workload then core firewall will also get involved.
-	Internet to Azure – Incoming traffic for the public website will get additional checks with web application firewall in hub virtual network.
-	Azure to Internet – All traffic will go out via hub virtual network.

Internet traffic flow (diagram below) 

<img src=Picture2.png title="" alt="">

Hub, core and on-premises traffic flow (diagram below)
<img src=Picture3.png title="" alt="">


#### Perimeter Virtual Network

<img src=Picture4.png title="" alt="">

A perimeter network (also referred to as a DMZ (demilitarized zone)) is a logical network segment that adds an extra layer of security between workloads and the internet. On the edge of a perimeter network, specialized network access control devices allow only desired traffic into your virtual network.
In the 3-layer network security architecture, Perimeter network is connected to on-premises via express route or site-to-site. Network is guarded by FortiGate firewall which is a network virtual appliance and deployed through Azure marketplace. 

**FortiGate Features** –  
-	AI Powered Security - Protect your branch, campus, co-location, data center & cloud with features that scale to any environment
-	Deep Visibility - See applications, users & devices, even when encrypted, to detect and prevent threats
-	Machine Learning - Build operational efficiencies into your environment and support overburdened IT teams
-	Security Processor Units - FortiGate ties key functions, such as TLS 1.3 decryption, IPSec, and IDS/IPS, to specialized ASICs so that you deliver optimal, secure experiences to stakeholders
-	Network Coverage - Connect and protect any edge at any scale with fully integrated networking capabilities, such as SD-Branch, SD-WAN & 5G

#### Hub Virtual Network

<img src=Picture5.png title="" alt="">

A hub is a central network zone that controls and inspects ingress or egress traffic between zones: internet, on-premises, and spokes. IT department can effectively implement security regulations from a central location using the hub-and-spoke topology. It also reduces the possibility of misconfiguration and exposure. It is a place to host services that can be consumed by the different workloads hosted in the spoke virtual networks.

In the 3-layer network security architecture, the hub network is connected to perimeter and core network via virtual network peering. In the hub network, traffic is guarded by Palo Alto firewall which is a network virtual appliance and deployed through Azure marketplace

**Palo Alto Features** – 
-	Application-based policy enforcement
-	Threat prevention
-	User identification
-	Malware analysis and reporting
-	Management and panorama
-	Fail-safe operation
-	Networking versatility and speed
-	Global protect

#### Core Virtual Network

<img src=Picture6.png title="" alt="">

The core virtual network in the above design is a completely locked virtual network. All the workloads residing in the core spoke virtual network do not have access to the internet and all the applications are internal.

In the 3-layer network security architecture, core network is connected to hub network via virtual network peering. In the core network, traffic is guarded by Cisco FTDv (ASA) which is a network virtual appliance and deployed through Azure marketplace

**Cisco FTDv (ASA) Features –**

-	Stateful firewall capabilities
-	Static and dynamic routing. Supports routing information protocol, open shortest path first, and border gateway protocol static routing
-	Next-generation intrusion prevention systems
-	URL filtering
-	Application visibility and control
-	Advance malware protection
-	Cisco identity service engine (Cisco ISE) integration
-	SSL decryption
-	Captive portal (guest web portal)
-	Multi-domain management
-	Rate limiting
-	Tunneled traffic policies
-	Site-to-site virtual private networks (VPN). Only supports site-to-site VPN between FTD appliances and FTD to ASA.
-	Multicast routing shared NAT
-	Limited configuration migration (ASA to firepower TD)

#### Network Security Best Practices (Azure)

Below are some recommendations from Microsoft as best practices.

-	Use strong network controls
-	Logically segmentation of virtual network
-	Adopt a zero-trust approach
-	Control routing behavior
-	Firewall / network virtual appliance
-	Deploy perimeter networks for security zones
-	Avoid exposure to the internet
-	Optimize uptime and performance
-	Disable RDP/SSH access to virtual machines
-	Secure your critical Azure service resources to only your virtual networks

####	Azure Resources

**NOTE:** The following Azure network services are used to create the 3-layer network security. 

- Azure Virtual Network - *Azure Virtual Network is the foundation of your private network in Azure. Virtual networking enables a variety of Azure resources, including Azure Virtual Machines, to communicate securely with each other, with the internet, and with the on-premises network. Virtual networking provides additional benefits to Azure infrastructure, such as size, availability, and isolation, and is comparable to the traditional network you would run in the data center.*

-	Network Virtual Appliance – *A network virtual appliance is a virtual machine that handles routing to control the flow of network traffic. Most of the time, we use them to control traffic flowing from the perimeter network environment to other networks or subnets.*

- User Defined Route Table – *User defined route tables allow you to construct network routes so that your network virtual appliance firewall VM can manage traffic both across subnets and to the Internet.*

-	Azure Load Balancer – *Azure Load Balancer operates at Layer 4 of the OSI model. It is the single point of contact for the customer. The load balancer distributes incoming flows at the load balancer's user interface to the back-end pool instances. These flows comply with the configured health probe and load balancing rules. The backend instances can be an Azure VM or an instance in a VM scaler.*

- Network Security Group – *The network security group contains security rules that allow or deny inbound network traffic to certain types of Azure resources and inbound network traffic to those types of resources. You can set the source and destination as well as the port and protocol for each rule.*

- Virtual Network Peering – *Virtual network peering allows you to seamlessly connect two or more virtual networks in Azure. Virtual networks appear as one for connectivity purposes. Traffic between virtual machines in the peered virtual network uses Microsoft's backbone infrastructure. Like traffic between virtual machines on the same network, traffic is routed only through Microsoft's private network.*