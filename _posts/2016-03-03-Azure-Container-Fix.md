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

On the Docker host, I created a folder on the root of the C drive called install. I will use this folder to put our required files including the dockerfile that we will create. Since I am using a virtual machine as my Docker host, I ran a simple net use command to map a drive from my Docker host to my laptop. I can now copy over our Sitecore web installer and Sitecore license file to our install folder. We now can extract the Sitecore MSI files we need to proceed. The following command will extract the files to the install folder

```sh
Sitecore 8.1 rev. 151207.exe /q /extractcab
```

We can now delete the Sitecore executable we copied over, since we now have extracted the MSI. When the delete completes, open up **notepad.exe** to create our dockerfile. After notepad opens, please paste the following Docker instructions and save the file as dockerfile.

```sh
#We need IIS, but also ASP.Net 4.5. I could create another container image with ASP.NET 4.5 installed
#but for this example, let's keep it simple and have the Sitecore installer add ASP.NET 4.5 for us
#
FROM microsoft/iis 

#Environmental variables holding configuration information for our Sitecore install
ENV sqllogin jrudley
ENV sqlpassword MySup3rp@55w0rd
ENV sqlserver raxsqlserver.database.windows.net
ENV sclicensename license.xml
ENV scinstallloc C:\\Inetpub\\wwwroot\\raxsc
ENV sitename raxsc
ENV sclogname SCInstaller.log

#Copy over the extracted files from the Sitecore executable 
COPY . /install

#Set our working directory to the install folder
WORKDIR /install

#Remove the existing default website
RUN powershell -executionpolicy bypass -Command "Remove-Website 'Default Web Site'"

#Install sitecore
RUN msiexec.exe  /i "C:\install\SupportFiles\exe\Sitecore.msi" TRANSFORMS=":InstanceId1;:ComponentGUIDTransform1.mst" MSINEWINSTANCE=1 LOGVERBOSE=1 SC_LANG="en-US" SC_CLIENTONLY="1" SKIPINSTALLSQLDATA="1" SKIPUNINSTALLSQLDATA="1" SC_INSTANCENAME="%sitename%" SC_LICENSE_PATH="c:\install\%sclicensename%" SC_SQL_SERVER="%sqlserver%" SC_DBTYPE="MSSQL" INSTALLLOCATION="%scinstallloc%" SC_DATA_FOLDER="%scinstallloc%\Data" SC_NET_VERSION="4" SC_IISSITE_NAME="%sitename%" SC_INTEGRATED_PIPELINE_MODE="1" SC_IISAPPPOOL_NAME="%sitename%AppPool" SC_IISSITE_HEADER="%sitename%" SC_IISSITE_PORT="80" SC_SQL_SERVER_CONFIG_USER="%sqllogin%" SC_SQL_SERVER_CONFIG_PASSWORD="%sqlpassword%" /l*+v "c:\install\%sclogname%"

#Add a binding to the Sitecore website 
RUN powershell -executionpolicy bypass -Command "New-WebBinding -Name "%sitename%" -IPAddress "*" -Port 80"

#Clean up files to reduce image size
RUN rmdir SupportFiles /s /q
```

Save the dockerfile, and make sure it is in c:\install. Build our docker image by typing the following:

```sh
docker build -t sitecoredev .
```
A firewall rule needs to be open for port 80 on the Docker host.

```sh
New-NetFirewallRule -Name "TCP80" -DisplayName "HTTP on TCP/80" -Protocol tcp -LocalPort 80 -Action Allow -Enabled True
```

To launch a new Sitecore container using the Docker image we built, type the following:

```sh
docker run --name dev1 --rm -it -p 80:80 sitecoredev cmd
```

At this point, a Docker container is running with our Sitecore image. I am able to browse to the admin page, edit content, save, and publish. 

You may have noticed that I am launching a Docker container by running an interactive sessions each time. You would expect to launch it with the **--detach** or **-d** option. If you ran it with that option, the container would start and then exit. I did some research and found a [thread](https://social.msdn.microsoft.com/Forums/en-US/7e47e19b-3d03-4791-bdac-55d3a54cf094/is-it-possible-to-run-in-daemonized-mode?forum=windowscontainers#2cea28a7-4515-4d26-8982-35b156fa120b) discussing this same issue. Long story short, Docker is expecting a process to stay alive to run in daemon mode. A solution to this is to write a powershell script with a switch parameter. The following is a powershell script with a switch parameter. 

```sh
param(
[switch]$detach
)

if ($detach) 
{
    while ($true) 
    {
       [DateTime]::Now.ToShortTimeString()
       Start-Sleep -Seconds 1
    }
}
else 
{
cmd
}
```
Save this snippet of code in our Docker context folder, and call it **detach.ps1**. In our dockerfile, add a CMD instruction to run this PowerShell script. 

```sh
#We need IIS, but also ASP.Net 4.5. I could create another container image with ASP.NET 4.5 installed
#but for this example, let's keep it simple and have the Sitecore installer add ASP.NET 4.5 for us
#
FROM microsoft/iis 

#Environmental variables holding configuration information for our Sitecore install
ENV sqllogin jrudley
ENV sqlpassword MySup3rp@55w0rd
ENV sqlserver raxsqlserver.database.windows.net
ENV sclicensename license.xml
ENV scinstallloc C:\\Inetpub\\wwwroot\\raxsc
ENV sitename raxsc
ENV sclogname SCInstaller.log

#Run a sleep command to keep a process open
CMD powershell ./detach -detach

#Copy over the extracted files from the Sitecore executable 
COPY . /install

#Set our working directory to the install folder
WORKDIR /install

#Remove the existing default website
RUN powershell -executionpolicy bypass -Command "Remove-Website 'Default Web Site'"

#Install sitecore
RUN msiexec.exe  /i "C:\install\SupportFiles\exe\Sitecore.msi" TRANSFORMS=":InstanceId1;:ComponentGUIDTransform1.mst" MSINEWINSTANCE=1 LOGVERBOSE=1 SC_LANG="en-US" SC_CLIENTONLY="1" SKIPINSTALLSQLDATA="1" SKIPUNINSTALLSQLDATA="1" SC_INSTANCENAME="%sitename%" SC_LICENSE_PATH="c:\install\%sclicensename%" SC_SQL_SERVER="%sqlserver%" SC_DBTYPE="MSSQL" INSTALLLOCATION="%scinstallloc%" SC_DATA_FOLDER="%scinstallloc%\Data" SC_NET_VERSION="4" SC_IISSITE_NAME="%sitename%" SC_INTEGRATED_PIPELINE_MODE="1" SC_IISAPPPOOL_NAME="%sitename%AppPool" SC_IISSITE_HEADER="%sitename%" SC_IISSITE_PORT="80" SC_SQL_SERVER_CONFIG_USER="%sqllogin%" SC_SQL_SERVER_CONFIG_PASSWORD="%sqlpassword%" /l*+v "c:\install\%sclogname%"

#Add a binding to the Sitecore website 
RUN powershell -executionpolicy bypass -Command "New-WebBinding -Name "%sitename%" -IPAddress "*" -Port 80"

#Clean up files to reduce image size
RUN rmdir SupportFiles /s /q
```

Build our new Docker image and launch our container with the detach option

```sh
docker run -d -p 80:80 sitecoredev
```

To launch our container in an interactive session

```sh
docker run --rm -it -p 80:80 sitecoredev "powershell ./detach" 
```

I am running my Docker host virtual machine on a SSD and see disk I/O issues during the application pool initialization. Hopefully, the next technical preview from Microsoft will address this performance issue. I hope this gives a better understanding how Docker can quickly let us launch new instances of Sitecore. In my next post, I will show how to build Docker images, based on Sitecore roles, to have a multiple content delivery node enviornment that literally takes seconds to start the Docker container.

