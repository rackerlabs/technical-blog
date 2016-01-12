---
layout: post
title: "Provision an Azure SQL server for Sitecore with PowerShell"
date: 2016-01-12 10:45
comments: false
author: Jimmy Rudley
published: true
categories:
    - Azure
    - Sitecore
    - PowerShell
---


In my previous blog post on running Sitecore in a Docker container, I used Azure SQL to host my Sitecore databases. Wanting a clean enviornment each time I develop, I needed a quick way to provision to Azure. With that requirement, I wrote a PowerShell script that makes this task repeatable for development and testing. 

<!-- more -->

Investigating the Azure PowerShell cmdlets, Microsoft is in a state of removing Switch-AzureMode cmdlet. Reading the [Azure github wiki](https://github.com/Azure/azure-powershell/wiki/Deprecation-of-Switch-AzureMode-in-Azure-PowerShell), Microsoft announced they are renaming cmdlet's from verb-Azure[noun] to verb-AzureRM[noun]. This seems to be an ongoing effort, so you will see a mix of cmdlet's in my script. 

You can download my PowerShell script from my repo located [here](https://github.com/jrudley/azureSitecoreBlobSqlUploader). Open the PowerShell script and you need to edit the following variables:


```sh
$bacpacLocation = 'C:\Users\jrudley\Downloads\sitecore8.1bacpacs\'

#Resource group to create. Must be unique
$Location = 'East US'
$resourceGroupName = 'raxsitecore9' 

#storage account information
$storageAccountName = 'sitecoredockerfiles9' #Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only
$Type = 'Standard_GRS'
$containerName = 'sitecoreblobcontainer9'

#azure sql server information
$credential = Get-Credential
$sqlServerName = 'raxcontsqlsvr9' #It can only be made up of lowercase letters 'a'-'z', the numbers 0-9 and the hyphen. The hyphen may not lead or trail in the name.
```

The **$bacpacLocation** variable is the location of your exported Sitecore databases with the .bacpac extension. Microsoft has provided instructions how to do a bacpac export [here](https://azure.microsoft.com/en-us/documentation/articles/sql-database-cloud-migrate-compatible-export-bacpac-ssms/)

The **$Location** and **$resourceGroupName** variable specifies where we will create and name our resource group to contain and manage the lifecycle of all our Azure resources.
