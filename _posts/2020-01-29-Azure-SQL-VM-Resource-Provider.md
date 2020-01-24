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

The biggest issue of figuring out which method to configure this is determining how flexible you want to be for configuration options. With Azure PowerShell, there are not many meaningful settings exposed for post configuration except for setting the SQL management type. More information about the management mode can be found [here](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sql/virtual-machines-windows-sql-register-with-resource-provider?tabs=azure-cli%2Cbash#management-modes) [AZ PowerShell](https://docs.microsoft.com/en-us/powershell/module/az.sqlvirtualmachine/new-azsqlvm?view=azps-3.3.0). Next in line is the Azure CLI. The CLI gives the option of setting backups, SQL authentication types and patching schedules [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/sql/vm?view=azure-cli-latest). The most powerful option is configuring within an ARM template. The ARM template includes all the settings from the CLI as well as configuring SQL Storaging settings [Template JSON](https://docs.microsoft.com/en-us/azure/templates/microsoft.sqlvirtualmachine/2017-03-01-preview/sqlvirtualmachines#)

Let's take the example of creating a new SQL Server virtual machine running SQL Server 2019 on Windows 2019. Our example project has 2 requirements of using mixed mode authentication and having the data and log files on seperate drives. Previously, a post configuration method such as a DSC or custom script extension would be required to format the drives and configure the sql server settings. Looking at the 3 options to provision, let's evaluate what can be accomplished.

-  Azure PowerShell can only create the SQL VM resource provider object. There is no configuration options to meet the requirements given.
-  Azure CLI would give the option to configure mixed mode authentication and create a SQL Server login with sysadmin privileges.
-  Azure ARM Template would give complete control and provide not only configuring the mixed mode requirement, but handles the creation of data drives along with formatting and configure sql server to use them.


One of the great features of using the SQL Server resource provider is that the drives that were configured during deployment can now be extended within the Azure portal without deallocating the virtual machine! I can extend a disk easily in the Azure portal by doing the following:

-  In the resource group where the SQL Server is provisioned, select the SQL virtual machine resource type object. It should be the same name as the Virtual Machine.
![resources]({% asset_path 2020-01-29-Azure-SQL-VM-Resource-Provider/1.png %})

-  Select **Configure** from the blade, scroll down on the right hand side and select the **Extend drive** button of the drive to exend.
![resources]({% asset_path 2020-01-29-Azure-SQL-VM-Resource-Provider/2.png %})

-- Select the disk size from the dropdown for how much to expend the current drive. Select **Apply** 
![resources]({% asset_path 2020-01-29-Azure-SQL-VM-Resource-Provider/3.png %})

I hope this quick glimpse into using the SQL Server resource provider showed how easy configuring SQL Server can be. The example ARM template that I used for this article can be located [here](https://github.com/jrudley/azureSqlResourceProvider)