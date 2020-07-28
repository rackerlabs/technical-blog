---
layout: post
title: "Designate and the Rackspace Technology OpenStack Private Cloud"
date: 2020-07-27
comments: true
author: David Krawczynski
authorAvatar: 'https://s.gravatar.com/avatar/99399c9f2a456f6f1be216d6ddde8b11'
bio: "Finding a balance for family, old cars, and IT while living by my mantra
that 'luck is equal parts strength and spirit!'"
published: true
authorIsRacker: true
categories:
    - OpenStack
metaTitle: "Designate and the Rackspace Technology OpenStack Private Cloud"
metaDescription: "."
ogTitle: "Designate and the Rackspace Technology OpenStack Private Cloud"
ogDescription: "."
slug: 'Designate and the Rackspace Technology OpenStack Private Cloud'

---



<!--more-->

### Overview



{{<image src="Picture1.png" title="" alt="">}}

OpenStack&reg; Designate allows Rackspace Technology’s Openstack Private Cloud users to use DNS services in their environment. This Rest API provides a simple, scalable, and flexible way to program and manage DNS.

Openstack Designate provides a fully manage cloud-native solution for DNSaaS. This multi-tenant Rest API provides DNS services to end users while integrating fully with other OpenStack services. Some of the benefits of DNS are list below.


Standardization of DNS services in OpenStack
Designate is an open-source project that avoids vendor lock
REST API management of records and zones
Is multi-tenant to allow hosting of multiple projects and keep corresponding resources secure
Simplifies DNS backend to a single point whereby users can avoid conflict within their projects and tenants
Enable self-service through sub- and super-DNS names
Reduces deployment times for resources
Integral to dynamic workloads and deployments such as K8’s




Bjoern’s version below:


Rackspace offers OpenStack Private Cloud with two products, RPC-O based on OpenStack source code and RPC-R based on RedHat OSP (currently 13).
With the Stein OpenStack release and continuing with Train, Rackspace Private Cloud (RPC-O), along with RPC-R (Queens), Rackspace is executing several important architecture changes to bring both products architecturally and capabilities closer together while improving the service with the addition of

Operating System Upgrade
Shared Storage Requirement
Bare metal provisioning (Ironic)
Octavia (Software Load Balancing)
DNS as Service (Designate)
Neutron open vSwitch plugin
HAProxy API Load Balancing

Some of these capabilities have already been used in earlier releases in limited availability (LA) capacity with the Rackspace managed Kubernetes service. We now extend these for general availability.

The architecture of a Rackspace managed cloud retained largely the same with minor changes,
which ensures that you can migrate existing environments over time into the new design.



Operating System Upgrade (RPC-O)

The operating system requirement has been updated to the Ubuntu 18.04 LTS Server release to accommodate the latest Dell and HP server platforms and OpenStack requirements.

Rackspace fully manages this layer transparently for customers, including providing first-time automated operating system package updates.


Shared Storage Requirement

Since the discovery of the CPU vulnerabilities Spectre and Meltdown, the frequency of firmware and other hardware-related changes leads to an increase in host maintenances requiring downtime. To eliminate workload impact during hardware maintenance, we require all new RPC-O environments use shared storage for image and guest block storage.
With shared storage, you can move virtual machines (guests) to other hosts almost instantly
and eliminate any impact to compute hosts during maintenance.
Consequently, the compute hosts are largely diskless. They use only local storage for the operating system and, if required, ephemeral storage. The concentration of disk space also reduces over provisioning.


Bare metal provisioning (Ironic)

Ironic, the OpenStack native, bare metal service, is now packaged into every new deployment, allowing you to install the operating system image in an OpenStack-native way, with the compute (nova) API. Using the nova API enables you to reuse automation and features, such as automated IP provisioning or user-data for scripting, during host initialization.  You can also retain project-based resource control (quotas).


Octavia (Software Load Balancing)

Octavia is the reference implementation for Load Balancing. Load Balancing distributes TCP/UDP protocol-based requests among multiple servers and makes the service scalable by allowing multiple servers to be behind one IP or web address. It also makes it fault-tolerant by removing faulty servers from rotation until they are healthy again.
Octavia achieves high availability load balancing through active-passive VM pairs.

-Built-in active/passive high availability
-Support for multiple listeners and pools
-Support for L7 load balancing
-Session persistence
-Support for HTTP/TCP based health monitoring
-Granular quota management
-Support for HTTP header insertion


DNS as Service (Designate)

Designate provides a fully managed cloud-native solution for DNSaaS. This multi-tenant Rest API provides DNS services to end users while integrating fully with other OpenStack services.
The API enables the standardization of DNS services with bind as pre-configured DNS backend system to manage DNS records and zones.

Designate also supports multiple record types per entry. Integration with other orchestration platforms like Terraform exists and further enables you to achieve your automation requirements.


Neutron open vSwitch plugin (RPC-O)

The software-defined networking has up to this point been implemented with the Neutron API and Linux Bridge Agent plugin. The OpenStack community has been shifting to open vSwitch as a plugin for a long time and provided many new features not available at the Linux Bridge plugin such as the following:

-Redundant Routers
-Flow-based and optional hardware-accelerated routing
-Additional support for tunnel protocols (beyond VXLAN)
-Future integration into another SDN controller

HAProxy API load balancing

We no longer use an F5 load balancer to balance the OpenStack API. Instead, we replaced the load balancer with fully managed and automated provisioning around HAProxy. This replacement reduces the overall cost and administration effort to keep the API endpoints up to date across OpenStack and other version upgrades.

These new services follow a common goal to ensure that customers of Rackspace Private Cloud OpenStack can further automate their processes while allowing other Rackspace products and teams to benefit from additional automation.

Also, Rackspace managed Kubernetes (k8s) uses the listed services to automate the Kubernetes node management and installation. We integrate Designate and Octavia to expose cluster names and load-balanced services

### Conclusion

<a class="cta purple" id="cta" href="https://www.rackspace.com/openstack/private">Learn more about the Rackspace OpenStack Private Cloud.</a>

Use the Feedback tab to make any comments or ask questions. You can also click **Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
