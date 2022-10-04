---
layout: post
title: "Install WebLogic as a container in Docker Windows Platform"
date: 2022-09-02
comments: true
author: Kondapalli Sreeharsha
authorAvatar: 'https://secure.gravatar.com/avatar/fcc90ae2c7d8cb9bd7c789ffe89539af'
bio: ""
published: true
authorIsRacker: true
categories:
    - Docker
    - Weblogic
    - Containers
metaTitle: "Install WebLogic as a container in Docker Windows Platform"
metaDescription: "Docker is a containerized platform that is easier to create, deploy and run the application as containers. Container is just something that I can put everything into."
ogTitle: "Install WebLogic as a container in Docker Windows Platform"
ogDescription: "Docker is a containerized platform that is easier to create, deploy and run the application as containers. Container is just something that I can put everything into."
slug: "install-weblogic-as-a-container-in-docker-windows-platform"

---

Docker is a containerized platform that is easier to create, deploy and run the application as containers. Container is just something that I can put everything into. What we can do is, we can bundle up code,application,packages,dependencies, and configuration files into a container then we can pick this container up and we can move wherever we want. That means we can run in Dev and same can in PROD. So that we can get exact environment every single time.

<!--more-->

### Introduction
Docker has made up for separate purpose and an alternative to VM because you don’t have to allocate RAM and it uses host OS. No hypervisor. It simply cut off installing multiple Operating systems in VM there by it is a light weighted.  
Difference between Virtual Machines and Containers.

<img src=Picture1.png title="" alt="">

Virtual machine an underlying system includes hardware/infrastructure which includes physical machine and it’s OS. The hypervisor is a software which sits in between hardware and infrastructure. I've got my hardware, we’ve got hypervisor, we can install Linux on Windows and application, the configurations and ready to go. 
But why do we need to containerize everything?  why we need to consider containers really comes down to that guest operating system that duplication of resources between every single VM. Because with the container, We don’t have to duplicate everything. So instead of having to create multiple operating systems over and over and over, and duplicating all of the stuff, we only uses host Operating system for every single deployment.  So With this container, I can cut off using multiple OS. We only including that application and the needed libraries, packages, configuration files. Effectively, it's like we are  creating our own little micro environment.

### Container Terminology

- **Docker File**: It is kind of like our set of instructions to build one of these quote containers, using a Docker file we're going to use a Linux like commands to define what does our container includes and where do the files go, what applications need to run, all that good stuff. Now technically the Docker file builds what is called an image.
- **Docker Image** :: Docker  image is  immutable and it contains everything. It contains code, libraries, dependencies and configuration files needed to run an application that can run it inside of our EC2 instances ( AWS) or on my laptop or on-premise in our  data center then we actually have the container.
- **Registry**: It stores docker images for distribution. They can have public and private. Think it is a GitHub or docker hub
- **Container**:  A running copy of an image that has been created.
- **Finally Flow**: We write a Docker file and from that Docker file we  build an image and image we upload to registry and then from registry we download that image and run as a container.

### Docker Architecture

<img src=Picture2.png title="" alt="">

- We can create a image by issuing a build command which led by docker demon. This demon will act depends upon our code which write in a text file called docker file.
- After image build, we can save it to registry and from there we can pull off this image and run as container.
- Registry can be docker hub or GitHub


###  Step by step approach to install WebLogic12 as a container in docker.

1.	Download Docker for Windows [here](https://hub.docker.com/) and download Docker for Windows 

<img src=Picture3.png title="" alt="">

<img src=Picture4.png title="" alt="">

And below msi file. Above docker version might be changed. We can download latest Docker software. After that, restart the system to take effect.

<img src=Picture5.png title="" alt="">

2. Create docker  hub account and download weblogic12 image.
3. Pull off the image.
4. Connect using command prompt and install.

            	Once you have downloaded the container for windows, run the executable, Once done, you will see docker container open

<img src=Picture6.png title="" alt="">

We need to have the container running. Hence copy above command and paste on command prompt

```
C:\Users\****>docker run -d -p 80:80 docker/getting-started
769c5cbc827acc1f9896cd4fd8511ec6b9eb9822bd9e56f2d161bcf1c9a7b82c
C:\Users\*****>docker login
```

Login with your Docker ID to docker hub and pull below image.
- Username: **Docker hub username**
- Password: **Docker hub pwd**

Login Succeeded

- 1. 	**Now login into docker hub and pull  the weblogic12 image**

https://hub.docker.com/r/ismaleiva90/weblogic12

<img src=Picture7.png title="" alt="">

`C:\Users\kond1394>docker pull ismaleiva90/weblogic12`

 - 2. **To start the docker machine with 7001, 7002 and 5556 ports opened:**

`docker run -d -p 49163:7001 -p 49164:7002 -p 49165:5556 ismaleiva90/weblogic12:latest`

```
:\Users\kond1394>docker run -d -p 49163:7001 -p 49164:7002 -p 49165:5556 ismaleiva90/weblogic12:latest
```

3.	**Access weblogic using following port.**


        http://localhost:49163/console
        User: weblogic
        Pass: welcome1

<img src=Picture8.png title="" alt="">


### Conclusion:

Container image is platform independent. We can test in Dev which run on different platform and later can move same image to PROD which can be run on any other platform.



<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
