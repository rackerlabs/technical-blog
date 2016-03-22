---
layout: post
title: "How to use Azure Files with Sitecore logging"
date: 2016-03-23 10:00
comments: false
author: Jimmy Rudley
authorIsRacker: true
published: true
categories:
- Devops
---

Azure file storage is a great smb storage offering that I often see go unused for a simple centralized file share. A great feature is mounting the share as a mapped network drive on your local machine.

<!-- more -->

When issues happen in Sitecore, if it be a crash dump, logs need archived or you want to do a deployment, using an Azure file share is a great option. I will show you how to easily setup an Azure file share and archive the sitecore log files automatically. While writing this, I came up with a great idea on using DSC for package deployments, but that will be another article. 

```sh
docker version
```

Run the following PowerShell command on your Azure Docker host to download and update your Docker installation:

```sh
wget -Uri https://raw.githubusercontent.com/Microsoft/Virtualization-Documentation/live/windows-server-container-tools/Update-ContainerHost/Update-ContainerHost.ps1 -OutFile Update-ContainerHost.ps1; .\Update-ContainerHost.ps1
```

If you check your Docker version now, it displays November 23rd, and **Docker Pull** commands work successfully.

I have created an Azure ARM template that uses the custom script extension. This lets you provision a Docker host without having to run the above PowerShell command, because it is done during provisioning. I have the Visual Studio solution which includes the ARM template and PowerShell script [here](https://github.com/jrudley/AzureDockerFix)

I imagine that the next release of Windows Server 2016 will have this patched, but until then, please run the preceding command to update your Docker installation and prevent the Azure issue from happening.

