---
layout: post
title: "Azure PaaS Vnet Integration With a Hub and Spoke Topology"
date: 2020-01-15 00:00
comments: true
author: Jimmy Rudley
published: true
authorIsRacker: true
authorAvatar: 'https://en.gravatar.com/userimage/151177997/5bed7e07ee47533cbd34b951d463bcb7.jpg'
bio: “Jimmy Rudley is an Azure Architect at Rackspace and an active member of the Azure community. He focuses on solving large and complex architecture and automation problems within Azure."
categories:
    - Azure
metaTitle: "Azure PaaS Vnet Integration With a Hub and Spoke Topology"
metaDescription: "Troubleshooting PaaS Vnet Integration with a Hub and Spoke Topology"
ogTitle: "Azure PaaS Vnet Integration With a Hub and Spoke Topology"
ogDescription: "Azure PaaS Vnet Integration With a Hub and Spoke Topology."
---

A colleague of mine sent me a message asking if I ever had an issue deploying an Azure Web App that routed through a hub and spoke topology. Trying to remember through the hundreds of deploys I have done, nothing was coming to me of any difficulties. Digging more into the problem with him, the web app could hit the hub VM, but nothing in the spokes. This sounds like a route issue and it was with some oddities sprinkled on top.

<!-- more -->

Without going into details of setting up vnet integration v1, the basic requirements are a standard app service plan and a VPN gateway provisioned with point-to-site configured with an address range to hand out to the web app(s). Once you configure the vnet configuration within the Azure Web App, it will say connected. At this point, one would imagine everything is finished, but nothing is ever that easy. After initially setting up the vnet integration, I always access the KUDU console and use TCPPING to verify connectivity to the resource within the virtual network. Almost everytime, I must sync the network to let initial connectivity happen. To sync the network again:

1) Click on the App Service Plan of the web app you configured vnet integration on and select Networking from the blade. Select Click here to manage under VNet Integration
2) Click on the vnet that is acting as the hub virtual network.
3) Click on Sync Network

Back at the KUDU console, TCPPing should now work when pointing it to an IP address of a HUB VM. Trying to ping a VM in the spoke Vnet did not work. Within the App Service Plan where the Sync network operation is, scroll to the bottom and there is a table labeled IP ADDRESSES ROUTED TO VNet. I saw all 3 private RFC 1918 address ranges listed and was confused why the routing was not working. I tried to explicitly add the address range for the spoke Virtual Network and tried TCPPing again, which it now succeeds. I exited out of the networking blade and went back in to see my address range gone! Even though it was gone, my TCPPing requests were still working. To verify what routes are in the app service plan, I browsed to https://resources.azure.com/ then drilled down to the app service plan then into the virtualNetworkConnections. As the picture shows, my route type of static is still there. This must be a bug with the UI if I had to guess.

![bePool]({% asset_path 2019-07-17-Azure-Front-Door-Storage-Static-Website/afdBePool.png %})

If you find yourself stuck on why routing will not work and verified that the virtual network peering settings are correct, try adding a route for the spoke vnet in the App Service Plan.
