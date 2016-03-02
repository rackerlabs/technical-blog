---
layout: post
title: "How to fix docker pulls on Azure provisioned Windows Docker Hosts"
date: 2016-03-03 10:00
comments: false
author: Jimmy Rudley
authorIsRacker: true
published: true
categories:
- Devops
---

In a previous [blog post](https://developer.rackspace.com/blog/run-sitecore-in-a-docker-container-on-windows-server-2016/) I described how to setup Sitecore in a Docker container.  There was a question asked about pulling Docker images on an Azure docker host and why it wasn't working. I was doing some testing today in Azure and still noticed you cannot do a Docker pull while your host is running in Azure, so let's look at the workaround in Azure.

<!-- more -->

I am not sure why Microsoft has not fixed this yet and there isn't a lot of information out on the internet, but I found an open issue at Docker's github [page](https://github.com/docker/docker/issues/19685). It looks like an outdated Docker.exe build is getting deployed with the TP4 Azure image. The fix is to replace it with a newer Docker.exe build.  If you run the following command, you can see the built date of November 13th when it should be November 23rd.

```sh
docker version
```

Run the following PowerShell command on your Azure Docker host to download and update your Docker installation

```sh
wget -Uri https://raw.githubusercontent.com/Microsoft/Virtualization-Documentation/live/windows-server-container-tools/Update-ContainerHost/Update-ContainerHost.ps1 -OutFile Update-ContainerHost.ps1; .\Update-ContainerHost.ps1
```

If you check your Docker version now, it will display Nov 23rd. **Docker Pull** commands will successfully work now.

I have created an Azure ARM template that uses the custom script extension. This will let you provision a Docker host without having to run the command as it is done during provisioning. I have the Visual Studio solution which includes the ARM template and PowerShell script [here](https://github.com/jrudley/AzureDockerFix)

I would imagine that the next release of Windows Server 2016 will have this patched, but until then, please run the following command above.
