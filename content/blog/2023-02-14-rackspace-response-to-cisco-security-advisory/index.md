---
layout: post
title: "Rackspace Response to Cisco Security Advisory"
date: 2023-02-14
comments: true
author: Marc Nourani
bio: ""
published: true
authorIsRacker: truew
categories:
    - Cisco
    - Security
metaTitle: "Rackspace Response to Cisco Security Advisory"
metaDescription: "Rackspace Technology is aware of a published security vulnerability (CVE-2023-20076) impacting Cisco IOx. Our partner Cisco published an article, available here: https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-iox-8whGn5dL."
ogTitle: "Rackspace Response to Cisco Security Advisory"
ogDescription: "Rackspace Technology is aware of a published security vulnerability (CVE-2023-20076) impacting Cisco IOx. Our partner Cisco published an article, available here: https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-iox-8whGn5dL."
slug: "rackspace-response-to-cisco-security-advisory"

---

Rackspace Technology is aware of a published security vulnerability (CVE-2023-20076) impacting Cisco IOx. Our partner Cisco published an article, available here: https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-iox-8whGn5dL. In the article, Cisco confirmed that this issue exists, but no platforms support the affected compression algorithm because the code was put there for future application packaging support. This means that there is no immediate way to exploit this issue. Cisco has resolved this issue in the event that a future platform does support the compression algorithm. 

Rackspace engineers have confirmed that no devices within the Rackspace network are affected. Additionally, engineers have confirmed no devices that are currently running IOS-XE operating system are enabled with the IOx feature. 

Cisco has confirmed that this vulnerability does not affect the following Cisco products: 
* Catalyst 9100 Family of Access Points (COS-AP) 
* IOS XR Software 
* Meraki products 
* NX-OS Software (native docker is supported in all releases) 

For a Cisco network device to be affected by the vulnerability, it must meet all following requirements: 
Affected platforms: 
* 800 Series Industrial ISRs
* CGR1000 Compute Modules
* IC3000 Industrial Compute Gateways (releases 1.2.1 and later run native docker)
* IR510 WPAN Industrial Routers 
Operation System: IOS-XE 
Affected Feature: IOx feature enabled/running (disabled by default) 
Dockerd not in present as a part of the IOx feature. 

Our security teams are actively monitoring the situation and, to date, have not identified any associated impacted systems. 

If you have any questions, please contact a member of your support team via https://www.rackspace.com/login. 
