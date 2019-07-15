---
layout: post
title: "Static storage website with Azure Front Door"
date: 2019-07-17 00:00
comments: true
author: Jimmy Rudley
published: true
authorIsRacker: true
authorAvatar: 'https://en.gravatar.com/userimage/151177997/5bed7e07ee47533cbd34b951d463bcb7.jpg'
categories:
    - Azure
metaTitle: "Static storage website with Azure Front Door"
metaDescription: "How to configure an Azure storage static website in Azure Front Door"
ogTitle: "Static storage website with Azure Front Door"
ogDescription: "How to configure an Azure storage static website in Azure Front Door."
---

One of the Azure multi-region topologies I have seen included an Azure Traffic Manager with Azure App Service Web Apps in each region. Some customers are cost conconcious and would rather have a static web page display after a region failure with some generic message that there is a problem and it is being looked into. With the introduction of Azure Front Door, there are a many capabilities that would not only enhance our live site but also serve as a cost effective failover to a static web site in a storage account.

<!-- more -->

At a high level, the following steps are needed to configure a static website within Azure storage account:

1) Create a **general purpose v2** storage account.
2) Click on **Static website** in the portal blade, enable it, and specify the **Index document name**.
3) Upload the static HTML page to the **$web** container.

The primary endpoint for the static website then returns the uploaded HTML page.

### Detailed configuration steps

Following are more detailed instructions:

#### 1. Provision resource

Within the Azure portal, provision a new **Azure Front Door** resource. Then, set the front-end host fully qualified domain name (FQDN), assign a unique name, and add it. 


#### 3. Add back-end pool

Add a back-end pool with a custom host name and back-end host header set to the URL of the static storage account website.

![bePool]({% asset_path 2019-07-17-Azure-Front-Door-Storage-Static-Website/afdBePool.png %})

#### 3. Create a routing rule

Create a routing rule and save it with all the defaults. Within a few minutes, the FQDN of the front-end resolves to the storage account. Add another back-end to your existing back-end pool of your primary web app and then set the priorities to route how you wish.

Normally, Azure Front Door is used for customer facing enviornments. It enables you to set apex domain-based routing. At a high level, it lets you do the following:

1) Provision an Azure DNS zone.
2) Set your nameservers for the custom domain to point to the Azure nameservers for the DNS zone.
3) Create an `A` record with a name of **@**.
4) Select `Yes` for the Alias record set and choose an Alias type of **Azure Resource**.
5) Select the Azure Resource Name for Azure Front Door in the Azure resource dropdown.

![DNSRecord]({% asset_path 2019-07-17-Azure-Front-Door-Storage-Static-Website/dns.png %})

#### 4. Add new Front-end host

Back in the Azure Front Door designer, add a new front-end host for the custom apex domain. Select both the existing routing rule and the custom apex domain. Then, update the setting.

![routingRule]({% asset_path 2019-07-17-Azure-Front-Door-Storage-Static-Website/routingRule.png %})

Enabling HTTPS protocol for a custom domain within Azure Front Door has 2 options. Front Door can generate a certificate can be generate and manage it, or you can use your own certificate. Since I have my own pfx for my domains, I chose the 2nd option, which involves Azure Key Vault. Please see [Instructions for Azure Front Door HTTPS](https://docs.microsoft.com/en-us/azure/frontdoor/front-door-custom-domain-https#ssl-certificates) and follow the instructions on how to configure it.
