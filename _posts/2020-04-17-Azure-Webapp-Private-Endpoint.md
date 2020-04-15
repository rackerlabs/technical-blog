---
layout: post
title: "Utilizing Azure Private Endpoints with Web Apps"
date: 2020-04-17 00:00
comments: true
author: Jimmy Rudley
published: true
authorIsRacker: true
authorAvatar: 'https://en.gravatar.com/userimage/151177997/5bed7e07ee47533cbd34b951d463bcb7.jpg'
bio: "Jimmy Rudley is an Azure Architect at Rackspace and an active member of the Azure community. He focuses on solving large and complex architecture and automation problems within Azure."
categories:
    - Azure
metaTitle: "Utilizing Azure Private Endpoints with Web Apps"
metaDescription: "Configure Azure&reg; Private Endpoings with Azure Web Apps."
ogTitle: "Utilizing Azure Private Endpoints with Web Apps"
ogDescription: "Configure Azure&reg; Private Endpoings with Azure Web Apps."
---

An Azure Private Endpoint provides a private IP into the virtual network, allowing access from onpremise from VPN or Express route. Implementing an endpoint effectively blocks the public inbound access. This technology is very similiar to an internal App Service Environment, but much cheaper! 

<!-- more -->

Azure Private Endpoint for Web Apps has a few things to be called out:
- It is only available in preview in two regions: EastUS and WestUS2
- The App Service Plan requires a PremiumV2 SKU
- A DNS server is required. This can be an Azure DNS zone or an VM acting as a DNS server. 

For a real world test, I provisioned a Sitecore 9.3 XM scaled development environment within Azure PaaS. I deployed Solr Cloud into a virtual network with the correct subnets for regional vnet integration. Vnet integration allows App Service webapps to make outbound calls into a virtual network, but not inbound. While Azure has a neat Azure private dns offering, it does not work with VNET inetgration. A DNS Server is required for name resolution into the VNET. Not to jump ahead, but creating a private endpoint will give you the option to use an Azure Private DNS Zone, but I skipped it since I am already using a DNS server. Putting everything together, a private endpoint allows private inbound into the Web App and vnet integration allows private outbound to my virtual network. Sounds like a cheaper App Service Environment!

With a Sitecore environment provisioned, I want the CM webapp to be accessed only by users within my onpremise corporate network. Out of the box, the CM webapp has a public endpoint which anyone can access. To meet this requirement, a private endpoint should be provisioned for the webapp. Follow these steps to create an endpoint:

1. Make sure the App Service plan hosting the CM web app is using a PremiumV2 sku.
2. Click on the CM Web App, select **Networking** from the blade, then select **Configure your private endpoint connections** ![resources]({% asset_path 2020-04-17-Azure-Webapp-Private-Endpoint/1.png %})
3. Click the **Add** button in the header to add a Private Endpoint 
[resources]({% asset_path 2020-04-17-Azure-Webapp-Private-Endpoint/2.png %})
4. Give the endpoint a name, select the subscription, virtual network to provision into and the subnet for the endpoint to consume. Do note, VNET integration requires a subnet as well, so the private endpoint and integration subnet cannot overlap!
[resources]({% asset_path 2020-04-17-Azure-Webapp-Private-Endpoint/3.png %})

After the endpoint is provisioned, the web app will lose all inbound public connectivity as a private IP has been associated with the FQDN and KUDU URL. <pic endpointIp.png>. Thinking about DNS, if you are using the azurewebsites.net domain, a DNS zone will need to be added to route to the private IP associated with the webapp. With Sitecore, this would effectively break the application since I only added one webapp with a private endpoint. Think about the CM login where it talks to the SI webapp for auth. If I had one zone for azurewebsites.net, I would also need to add private endpoints to all my webapps, then add A records into that zone for communication. Gets pricey making everything a PremiumV2 sku. It would also break any other webapp you wanted to browse on the azurewebsites.net domain. There are two ways to approach this. Use a custom domain name on the webapp that matches a zone in your DNS server or create a dns zone with the azurewebsites.net fqdn of the webapp. Since this is a test, I oppted to use the latter and just created an A record pointing to the private ip of the endpoint for that specific webapp. 
![resources]({% asset_path 2020-04-17-Azure-Webapp-Private-Endpoint/endpointIp.png %})
![resources]({% asset_path 2020-04-17-Azure-Webapp-Private-Endpoint/dnsNew.png %})
    
Just like an internal App Service Env, you need to take into account the KUDU scm url. As the picture shows, I have 2 zones per webapp. Each with an A record pointing to the private IP of the endpoint. 

Now that onpremise users can access the CM webapp for secure content authoring, I wanted to figure out what would I need to do if I had the CD web app behind a private endpoint, but needed public users to access it. Previously using an Internal ASE, an application gateway could be provisioned and plug a hole into the VNET. I didn't see how this would be any different, so below is how I approached it.

1. Provision an Application Gateway
2. For the backend pool, I targeted the FQDN of my CD role web app
![resources]({% asset_path 2020-04-17-Azure-Webapp-Private-Endpoint/backendpool.png %})
3. Configure the health probe to use my FQDN of my CD role web app
![resources]({% asset_path 2020-04-17-Azure-Webapp-Private-Endpoint/appgwprobe.png %})
4. Override the backend pool host name by Picking the host name from the backend target.
![resources]({% asset_path 2020-04-17-Azure-Webapp-Private-Endpoint/overrideBackendPool.png %})
5. I configured my public dns for my custom domain to cname to the application gateway public frontendIP
6. Configured SSL offloading for my custom domain


Creating a secure routable secure solution from onpremise to an Azure web can can easily be achieved with a combination of private endpoints and regional vnet integration. Instead of using an internal App Service Environment, try testing out the above to see if it meets your needs. More information can be found at the [private endpoint documentation](https://docs.microsoft.com/en-us/azure/private-link/create-private-endpoint-webapp-portal)
   
