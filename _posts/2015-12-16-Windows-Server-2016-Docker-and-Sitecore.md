---
layout: post
title: "Windows Server 2016, Docker and Sitecore"
date: 2015-12-16 10:45
comments: false
author: Jimmy Rudley
published: true
categories:
    - Windows Server 2016 Technical Preview 4
    - Docker
    - Sitecore
---

At SUGCON 2015, Rackspace and Hedgehog presented about using Docker will shape how we work with Sitecore in the near future. With the release of Windows Server 2016 Technical Preview 4, it is becoming a reality.

<!-- more -->

To start running Docker containers, we will need a Docker host. Microsoft wrote a PowerShell script that can configure the VM host for you if you are running Windows 10 or Windows Server 2016 TP2+. You can grab the detailed instructions here

My main objective is to take an existing sitecore 8.0 installation on my laptop and move it into a container image. I used the sitecore web application installer to do a quick local installation. I am using SQL Azure for my sql server, but as long as you can hit your sql server from your container, however you choose to host the DB's will work just fine.

Once you setup your Docker host, we need to create our IIS image. If you type the following command 
```sh
docker images
```
You will see a list of available images on your Docker host. Let's now search the Microsoft repo for what images are available by typing
```sh
docker search microsoft
```
You will see a list of images available to pull down. There is a good spread of images from ruby, redis, asp.net 5, iis, etc. We could build our own image by launching a new container and installing IIS and asp.net, but let's pull an image down instead. On your docker host, let's create a new directory called c:\iisdemo. We will use this directory to hold our dockerfile we will create. A dockerfile is just a set of instructions to build a docker image. Let's launch notepad.exe and type in the following docker instructions
```sh
FROM microsoft/iis
RUN dism /online /enable-feature /all /featurename:IIS-ASPNET45 /NoRestart
```
Alternatively, we could use powershell to install asp.net 4.5. That dockerfile would look like
```sh
FROM microsoft/iis
RUN powershell -executionpolicy bypass -command "add-windowsfeature Web-Asp-Net45"
```
Please save your dockerfile to c:\iisdemo and called it "dockerfile". Let's breakdown the dockerfile so you understand what we are trying to accomplish.
The FROM keyword sets the base image for subsequent instructions. We are telling docker to use the microsoft/iis image. We do not have this locally, but Docker is smart enough to pull it down locally for us. The RUN keyword will execute any commands in a new layer on top of the current image and commit the results. I am telling it to run dism to install the asp.net 4.5 features for IIS.

Let's build our image by running
```sh
docker build -t iisdemo c:\iisdemo\
```
We will tag our new image and read our dockerfile from the directory c:\iisdemo\. Here is snippet of the build process
```sh
c:\>docker build -t iisdemo c:\iisdemo\
Sending build context to Docker daemon 2.048 kB
Step 1 : FROM microsoft/iis
latest: Pulling from microsoft/iis
6a182c7eba7e: Pull complete
39b8f98ccaf1: Pull complete
Digest: sha256:a067c38b623c411e2cdcb8425860c894730cb27c021dd1f1cb479cd21a031cd7
Status: Downloaded newer image for microsoft/iis:latest
 ---> 39b8f98ccaf1
Step 2 : RUN dism /online /enable-feature /all /featurename:IIS-ASPNET45 /NoRestart
 ---> Running in c9f7059858d3
 ```

If you now type
```sh
docker images
```
You will see your new image in our local repo called iisdemo.
Let's start our iis web server container up and test to make sure we can connect. We will need to do a couple of things first. Let's grab the IP address of the container host. Also, we need to allow port 80 in on our firewall. On the Docker host, open up a powershell prompt then type
```sh
c:\>powershell
Windows PowerShell
Copyright (C) 2015 Microsoft Corporation. All rights reserved.

PS C:\> New-NetFirewallRule -Name "TCP80" -DisplayName "HTTP on TCP/80" -Protocol tcp -LocalPort 80 -Action Allow -Enabled True
```
Exit out of your powershell prompt and let's now build our iisdemo container by typing
```sh
docker run --rm -it -p 80:80 iisdemo cmd
```
This will launch a container, listening on port 80, with an interactive cmd prompt and remove the container once we exit out of it. 
If I now browse from my laptop to the Docker vm host IP, I am presented with the IIS10 splash page. Success! Now, let's create another dockerfile to deploy my sitecore zip.

I have my zip called raxcont.zip which contains my sitecore install. There are a few ways we could get this zip file to our container image. I am going to just copy it to my container host then use the ADD keyword in my dockerfile to copy it into my new container image. We can run a simple net use to grab our files and copy them to our Docker host
```sh
mkdir c:\sitecore
net use * \\ip\share
copy z:\raxcont.zip c:\sitecore\
```
Let's open up notepad to create a new dockerfile and paste the following into it
```sh
FROM iisdemo
RUN mkdir c:\sitecoreDocker
WORKDIR /sitecoreDocker
ADD raxcont.zip /sitecoreDocker/raxcont.zip
RUN powershell -executionpolicy bypass -Command "expand-archive -Path 'c:\sitecoreDocker\raxcont.zip' -DestinationPath 'c:\inetpub\wwwroot\'"
RUN /windows/system32/inetsrv/appcmd.exe set vdir "Default Web Site/" -physicalPath:"c:\inetpub\wwwroot\raxcont\website"
```
When we build from this dockerfile, it will use our iisdemo image, make a directory called c:\sitecoreDocker, add the file raxcont.zip to c:\sitecoreDocker\, unzip the file to c:\inetpub\wwwroot and finally set the default web site physical path to our unzipped location.

Let's build our image by typing
```sh
docker build -t sc c:\sitecore
```
We can now launch a container with our sitecore deployment.
```sh
docker run --rm -it -p 80:80 sitecore cmd
```

Browse to your docker host IP and the default sitecore page shows up.


I hope this gives you a good intro to Docker on Windows Server 2016 with Sitecore. Windows Server 2016 is still in technical preview and there still are a lot of limitations and bugs, but seeing sitecore run out of a container is a good step in the right direction. I did run into issues of mvc not being able to load in the container. This will break content editing, among other things, but as Microsoft matures the container offering, we will be ready to use Docker with Sitecore. In my next post, I will show us how to install a fresh sitecore instance using a dockerfile.


   [here]:<https://msdn.microsoft.com/virtualization/windowscontainers/quick_start/container_setup>


