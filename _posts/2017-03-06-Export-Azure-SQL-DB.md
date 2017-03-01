---
layout: post
title: Exporting an Azure SQL DB via PowerShell  
date: 2017-03-06 10:22
comments: false
author: Jimmy Rudley
published: true
authorIsRacker: true
categories:
    - DevOps
---

Azure SQL is Microsoft's answer to Platform as a Service for SQL Server. It extracts a lot of the day to day administrative tasks of managing an installation. Let’s take a look how a consumer of Azure SQL can export data out to restore to a local on premise installation.

<!-- more -->

Most SQL Server users are familiar with the concept of doing a backup using SQL Server Management Studio resulting in a backup (.bak) file. With Azure SQL, backup files are not supported, but instead BACPAC files are generated. A BACPAC file contains the database schema and data. If a user wants to generate a bacpac file, they can use the Azure portal, but that becomes tedious when you are doing a lot of exports each day on random databases. After doing a few exports using the portal, I decided to write up a PowerShell script with prompts to choose a DB and export to a storage container.

![backup blade]({% asset_path 2016-12-08-Filtering-backups-in-Azure-App-Service/blade.png %})

Assuming you have Azure PowerShell installed, run .\Export-AzureSqlDB.ps1. It will prompt to select an Azure subscription, resource group the Azure SQL Server is in, the Azure SQL Server, the DB to export, the Azure Sql Admin password, storage account and container. Optionally, you can use the switch statusBar to give the progress of the export.

Feel free to fork the repo and modify as you wish. 

