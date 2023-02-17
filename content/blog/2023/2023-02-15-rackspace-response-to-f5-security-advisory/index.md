---
layout: post
title: "Rackspace Response to F5 Security Advisory"
date: 2023-02-15
comments: true
author: Marc Nourani
bio: ""
published: true
authorIsRacker: true
categories:
    - F5
    - Security
metaTitle: "Rackspace Response to F5 Security Advisory"
metaDescription: "Rackspace Technology is aware of recently published security vulnerabilities impacting F5 BIG-IP devices on code versions 13+. Our partner F5 published an article on February 2023, available here: https://my.f5.com/manage/s/article/K000130496."
ogTitle: "Rackspace Response to F5 Security Advisory"
ogDescription: "Rackspace Technology is aware of recently published security vulnerabilities impacting F5 BIG-IP devices on code versions 13+. Our partner F5 published an article on February 2023, available here: https://my.f5.com/manage/s/article/K000130496."
slug: "rackspace-response-to-f5-security-advisory"

---

Rackspace Technology is  aware of recently published security vulnerabilities impacting F5 BIG-IP devices on code versions 13+. Our partner F5 published an article on February 2023, available here: https://my.f5.com/manage/s/article/K000130496.

Rackspace standard F5 deployments are designed with an architecture that prevents public access to management network segments, management IPs, and management APIs. Our best practices do not expose the iControl SOAP API to the public internet. 

**Rackspace engineers have performed an initial assessment and are advising affected customers to upgrade to the latest software from F5.** Rackspace is updating our recommended safe harbor code version from 14.1.5.1 to 14.1.5.3.

To perform the F5 software code update, customers can request that the maintenance be performed by a Racker. Additionally, Rackspace is preparing a self-scheduling process for customers and will notify eligible customers once the process is available. More information on the process is available here: https://docs.rackspace.com/support/how-to/network-device-reboot-faq/. 

It’s important to note that an integrated software patch for [K000130415: iControl SOAP vulnerability CVE-2023-22374](https://my.f5.com/manage/s/article/K000130415) is not yet available. However, mitigation options are available:
- An [engineering hotfix](https://my.f5.com/manage/s/article/K55025573) is available for the latest supported versions of BIG-IP F5. F5 provides no warranty or guarantee of usability for engineering hotfixes and Rackspace does not advise using untested software from a vendor. Rackspace can assist with the installation of this hotfix. However, customers who elect this option will be required to acknowledge and accept the associated risk.
- Upon request, Rackspace can disable customer administrative access to affected F5 devices until a stable fix has been released.

Our security teams are continuing active monitoring of the situation with no associated impacted systems identified thus far.

Should you have any questions or require assistance in responding to these vulnerabilities, please contact a support Racker via https://www.rackspace.com/login.
