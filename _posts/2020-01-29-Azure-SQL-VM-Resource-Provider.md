---
layout: post
title: "Azure SQL VM Resource Provider"
date: 2020-01-29 00:00
comments: true
author: Jimmy Rudley
published: true
authorIsRacker: true
authorAvatar: 'https://en.gravatar.com/userimage/151177997/5bed7e07ee47533cbd34b951d463bcb7.jpg'
bio: "Jimmy Rudley is an Azure Architect at Rackspace and an active member of the Azure community. He focuses on solving large and complex architecture and automation problems within Azure."
categories:
    - Azure
metaTitle: "Azure SQL VM Resource Provider"
metaDescription: "Configure Azure SQL Server VMs during deployment."
ogTitle: "Azure SQL VM Resource Provider"
ogDescription: "Configure Azure SQL Server VMs during deployment."
---

Most release pipelines have some kind of automation to do post configuration to a virtual machine to prepare it for use. Taking a look at SQL Server, there are a lot of options that can be configured to make it production ready. What most people do not know is there is a resource provider within Azure that will configure basic SQL Server settings without the need of any post configuration scripts.

<!-- more -->

When using the Azure portal, a SQL Server virtual machine is already registered with the SQL Server resource provider, but with using an ARM template, Azure PowerShell or the AZ CLI requires additional work. Some benefits of using the resource provider are:

-  Automated patching and backups
-  Configure SQL Authentication modes
-  Configure Data, Log and Temp file paths
-  Set the storage workload types

The biggest issue of figuring out which method to configure this is determining how flexible you want to be for configuration options. With Azure PowerShell, there are not many meaningful settings exposed for post configuration except for setting the SQL management type, which we will cover in a bit [AZ PowerShell](https://docs.microsoft.com/en-us/powershell/module/az.sqlvirtualmachine/new-azsqlvm?view=azps-3.3.0). Next in line is the Azure CLI. The CLI gives the option of setting backups, SQL authentication types and patching schedules [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/sql/vm?view=azure-cli-latest). The most powerful option is configuring within an ARM template. The ARM template includes all the settings from the CLI as well as configuring SQL Storaging settings [Template JSON](https://docs.microsoft.com/en-us/azure/templates/microsoft.sqlvirtualmachine/2017-03-01-preview/sqlvirtualmachines#)

Let's take the example of creating a new SQL Virtual machine running SQL Server 2017 on Windows 2016. There are 2 requirements of using mixed mode authentication and having the data and log files on seperate drives. Previously, a post configuration method such as a DSC or custom script extension would be required to format the drive and configure the sql server settings. Looking at the 3 options to provision, let's evaluate what can be accomplished.

-  Azure PowerShell can only create the SQL VM resource provider object. There is no configuration options to meet the requirements given.
-  Azure CLI would give the option to configure mixed mode authentication and create a SQL Server login with sysadmin privileges.
-  Azure ARM Template would give complete control and provide not only configuring the mixed mode requirement, but handles the creation of data drives along with formatting and configure sql server to use them.

![resources]({% asset_path 2020-01-15-Azure-PaaS-Vnet-Integration-Routes/resources.azure.com.png %})

If you find yourself stuck figuring out why the routing doesn't work, and you have verified that the virtual 
network peering settings are correct, try adding a route for the spoke VNet in the **App Service Plan**.
