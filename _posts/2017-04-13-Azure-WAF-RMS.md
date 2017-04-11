---
layout: post
title: Understanding an Azure Application Gateway with WAF enabled 
date: 2017-04-13 10:22
comments: false
author: Jimmy Rudley
published: true
authorIsRacker: true
categories:
    - DevOps
---

As more web application workloads move to the cloud, organizations need to be concerned about attacks from the internet. External threats are scanning public IP ranges to find known vulnerabilities and exploit businesses. Let's take a look at the Azure Application Gateway (WAF) and how it can be a part of our toolset for protecting our web applications.

<!-- more -->

The Azure Application Gateway is a layer 7 load balancer with two SKUs to distinguish between Standard and Web Application Firewall. For this article, we will focus on the latter. The WAF SKU is a Standard SKU, providing all the rich features of a layer 7 load balancer, but now also serves as a web application firewall. The WAF protects from your common web based exploits. The OWASP rule set is based on OWASP 3.0 or 2.2.9 and the rule list can be viewed [here](https://docs.microsoft.com/en-us/azure/application-gateway/application-gateway-crs-rulegroups-rules). You can also enable or disable specific rules by following the instructions [here](https://docs.microsoft.com/en-us/azure/application-gateway/application-gateway-customize-waf-rules-portal)

The minimum requirement to deploy a WAF into Azure is to select the WAF tier and either medium or large for the instance size. For production workloads, it is strongly recommended to have 2 instances selected to be covered by the SLA.


