---
layout: post
title: "Static Storage Website with Azure Front Door"
date: 2019-07-17 00:00
comments: true
author: Jimmy Rudley
published: true
authorIsRacker: true
authorAvatar: 'https://en.gravatar.com/userimage/151177997/5bed7e07ee47533cbd34b951d463bcb7.jpg'
categories:
    - Azure
metaTitle: "Static Storage Website with Azure Front Door"
metaDescription: "How to configure an Azure storage static website in Azure Front Door"
ogTitle: "Static Storage Website with Azure Front Door"
ogDescription: "How to configure an Azure storage static website in Azure Front Door."
---

One of the Azure multi region topologies I have seen included an Azure Traffic Manager and Azure App Service Web Apps in each region. Some customers are cost conconcious and would rather have a static web page after a region failure with some generic message that there is a problem and it is being looked into. With the introduction of Azure Front door, there are a lot of capabilities that would not only enhance our live site, but cost effective failover to a static web site in a storage account.

<!-- more -->

At a high level, the following steps are needed to configure a static website within Azure storage account:
1) Create a **general purpose v2** storage account
2) Click on **Static website** in the portal blade, enable it and specify the **Index document name**
3) Upload the static html page to the **$web** container

The primary endpoint for the static website will now return the html page uploaded.

Within the Azure portal, provision a new **Azure Front Door** resource. The first step is setting the frontend host fqdn. Give a unique name and add it. Second, add a backend pool with a custom host name and backend host header set to the URL of the static storage account website.
![bePool]({% asset_path 2019-07-17-Azure-Front-Door-Storage-Static-Website/afdBePool.png %})
 Third, create a routing rule and save it with all the defaults. Within a few minutes, the FQDN of the frontend will resolve to the storage account. Add another backend to your existing backend pool of your primary web app and then set the priorities to route how you wish.

Normally, this will be used for customer facing enviornments. Azure Front Door allows apex domain based routing to be set. At a high level, it involves the following:
1) Provision an Azure DNS Zone
2) Set your nameservers for the custom domain to point to the Azure nameservers for the DNS zone
3) Create an A record with a name of **@**
4) Select Yes to Alias record set and choose an Alias type of Azure Resource
5) Select the Azure Front Door Azure Resource Name in the Azure resource dropdown

![DNSRecord]({% asset_path 2019-07-17-Azure-Front-Door-Storage-Static-Website/dns.png %})

Back in the Azure Front Door designer, add a new Frontend host for the custom apex domain. Select the existing routing rule and select the custom apex domain and update the setting.
![routingRule]({% asset_path 2019-07-17-Azure-Front-Door-Storage-Static-Website/routingRule.png %})

Enabling HTTPS protocol for a custom domain within Azure Front Door has 2 options. A certificate can be managed by Front Door or use your own certificate. Since I have my own pfx for my domains, I went for the 2nd option which involves Azure Key Vault. Please reference [Instructions for Azure Front Door HTTPS](https://docs.microsoft.com/en-us/azure/frontdoor/front-door-custom-domain-https#ssl-certificates) and follow the instructions on how to configure.