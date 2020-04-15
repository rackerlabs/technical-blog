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
2. Click on the CM Web App, select **Networking** from the blade, then select **Configure your private endpoint connections** <insert pic 1.png>
3. Click the **Add** button in the header to add a Private Endpoint <insert pic 2.png>
4. Give the endpoint a name, select the subscription, virtual network to provision into and the subnet for the endpoint to consume. Do note, VNET integration requires a subnet as well, so the private endpoint and integration subnet cannot overlap!

After the endpoint is provisioned, the web app will lose all inbound public connectivity as a private IP has been associated with the FQDN and KUDU URL. <pic endpointIp.png>. Thinking about DNS, if you are using the azurewebsites.net domain, a DNS zone will need to be added to route to the private IP associated with the webapp. With Sitecore, this would effectively break the application since I only added one webapp with a private endpoint. Think about the CM login where it talks to the SI webapp for auth. If I had one zone for azurewebsites.net, I would also need to add private endpoints to all my webapps, then add A records into that zone for communication. Gets pricey making everything a PremiumV2 sku. It would also break any other webapp you wanted to browse on the azurewebsites.net domain. There are two ways to approach this. Use a custom domain name on the webapp that matches a zone in your DNS server or create a dns zone with the azurewebsites.net fqdn of the webapp. Since this is a test, I oppted to use the latter and just created an A record pointing to the private ip of the endpoint for that specific webapp. <insert dnsNew.png>
    
   
Just like an internal App Service Env, you need to take into account the KUDU scm url. As the picture shows, I have 2 zones per webapp. Each with an A record pointing to the private IP of the endpoint. 


Now that onpremise users can access the CM webapp for secure content authoring and can publish, 



The biggest issue about figuring out which method to use for configuration is determining
how flexible you want to be for configuration options. With Azure PowerShell&reg;,
there are not many meaningful settings exposed for post configuration except
for setting the SQL management type. You can find more information about the
management mode [here](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sql/virtual-machines-windows-sql-register-with-resource-provider?tabs=azure-cli%2Cbash#management-modes) [Azure PowerShell](https://docs.microsoft.com/en-us/powershell/module/az.sqlvirtualmachine/new-azsqlvm?view=azps-3.3.0). Next
in line is the Azure Command Line Interface (CLI). This CLI enables you to set backups, SQL authentication
types, and patching schedules as described [here](https://docs.microsoft.com/en-us/cli/azure/sql/vm?view=azure-cli-latest). The most powerful option is configuring within an Azure Resource Manager (ARM) template. The ARM template
includes all the settings from the CLI as well as configuring SQL storage settings as shown in [Template JSON](https://docs.microsoft.com/en-us/azure/templates/microsoft.sqlvirtualmachine/2017-03-01-preview/sqlvirtualmachines#).

Let's take the example of creating a new SQL Server VM running SQL Server 2019 on
Windows&reg; 2019. Our example project has the following requirements:

- Use mixed-mode authentication 
- Store data and log files on separate drives 

Previously, you needed to use a post-configuration method, such as a Desired State
Configuration (DSC) or custom script extension, to format the drives and configure
the SQL Server settings. Looking at the following three options to provision, let's
evaluate what you can accomplish:

-  Azure PowerShell can create only the SQL VM resource provider object. No configuration
   options exist to meet the requirements given.
-  Azure CLI provides the options to configure mixed-mode authentication and to create a
   SQL Server login with sysadmin privileges.
-  Azure ARM template offers complete control and provides the ability to configure the
   mixed-mode requirement and create data drives along with formatting and to configure SQL
   Server to use them.

One of the great features of using the SQL Server resource provider is that you can now
extend, within the Azure portal, the drives that you configured during deployment&mdash;without
deallocating the virtual machine. You can extend a disk easily in the Azure portal by doing the
following tasks: 

-  In the resource group where you provisioned the SQL Server, select the SQL VM
   resource-type object. It should have the same name as the VM.
![resources]({% asset_path 2020-01-29-Azure-SQL-VM-Resource-Provider/1.png %})

-  Select **Configure** from the blade, scroll down on the right-hand side, and
   select the **Extend drive** button of the drive to extend.
![resources]({% asset_path 2020-01-29-Azure-SQL-VM-Resource-Provider/2.png %})

-  Select the disk size from the drop-down menu to determine by how much to extend
   the current drive. Select **Apply** 
![resources]({% asset_path 2020-01-29-Azure-SQL-VM-Resource-Provider/3.png %})

I hope this quick glimpse into using the SQL Server resource provider shows how
easy configuring SQL Server is. You can find the example ARM template that I used
for this article [here](https://github.com/jrudley/azureSqlResourceProvider).
