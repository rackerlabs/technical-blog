---
layout: post
title: "Install PeopleSoft by using DPK"
date: 2021-02-10
comments: true
author: Ankit Kumar
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "Install PeopleSoft by using DPK"
metaDescription: "This post explains the PeopleSoft DPK installation steps and the available options."
ogTitle: "Install PeopleSoft by using DPK"
ogDescription: "This post explains the PeopleSoft DPK installation steps and the available options."
slug: "install-peoplesoft-by-using-dpk"

---

Before the release of PeopleTools 8.56 (in the year 2017), you had to download all
PeopleSoft&reg; components (web server, application server, Java, and creation of domains)
and install them individually on the server. However, with automation and innovation picking
up pace, Oracle&reg; now provides a deployment package (DPK) that you can use to
install everything at once. 

<!--more-->

### Overview

To ensure that our customers leverage new features and improve their business efficiency,
Rackspace Technology keeps pace with Oracle's new advanced features. We also prioritize
attending Oracle webinars to gain knowledge and try to implement innovation across our
customer base. 

Rackspace has used the DPK option for more than two years and has provided trouble-free
deployments to customers, garnering customer confidence and satisfaction.

This post explains the PeopleSoft DPK installation steps and the available options.

### Installation steps

The PeopleSoft PeopleTools DPK setup script automates most manual installation tasks on a
virtual or bare-metal host with a supported operating system. In PeopleTools 8.56 to 8.58,
the DPK setup zip file includes two scripts, a Microsoft&reg; Windows&reg; script
(**psft-dpk-setup.bat**) and a shell script for Linux&reg;, AIX&reg;, HP-UX&reg;, or
Solaris&reg; (**psft-dpk-setup.sh**). Use the script for your host operating system to set
up a PeopleSoft environment.

When you call the scripts, you can choose which components to install and select from
various options, depending on your architecture and requirements.

The following sections, drawn from
[User manual: PeopleSoft PeopleTools 8.56](https://manualzz.com/doc/48544992/peoplesoft-peopletools-8.56),
provide installation options:

#### Option 1

{{<img src="Picture1.png" title="" alt="">}}

#### Option 2

{{<img src="Picture2.png" title="" alt="">}}

#### Option3

{{<img src="Picture3.png" title="" alt="">}}

#### Option 4

{{<img src="Picture4.png" title="" alt="">}}

#### Option 5

{{<img src="Picture5.png" title="" alt="">}}

#### Option 6

{{<img src="Picture6.png" title="" alt="">}}

#### Option 7

{{<img src="Picture7.png" title="" alt="">}}

#### Option 8

{{<img src="Picture8.png" title="" alt="">}}

#### Option 9

{{<img src="Picture9.png" title="" alt="">}}

### Sample DPK installation

You can use DPK installations in the following modes:

- Default mode 
- Custom mode

Default mode installation extracts and installs the PeopleSoft-provided software in the
base installation directory. However, there are scenarios wherein we need to install the
different software components on other disk drives depending on customer architecture. In
such cases, we can choose a custom mode to install in the base and custom locations by
creating custom deployment scripts at runtime. 

Rackspace makes use of both the methods depending on environment type and customer
architecture requirements.

To perform a DPK installation, perform the following steps:

1. Download the DPK package from My Oracle Support.
2. This DPK package can contain multiple zip files. Extract the **01** zip file, which
   contains the setup folder.
3. Open up a command prompt and navigate to the setup folder.
4. Run the OS-specific option with the deployment options described previously. See the
   following section for details.
5. After you create the custom file, you can start the installation, which performs the
   auto-installation of all the software.

#### Deep dive into Step 4

Run the OS-specific option with the deployment options specified in the preceding tables.

{{<img src="Picture10.png" title="" alt="">}}

This command installs Puppet, if it is not already installed, and proceeds with the
installation options:

{{<img src="Picture11.png" title="" alt="">}}

{{<img src="Picture12.png" title="" alt="">}}

After the DPK extraction completes, the DPK process prompts you to choose whether to
continue with default or custom mode.

I chose to use the custom mode, which stopped the installation. Then, I resumed it
by creating the custom file as specified by the installer:

{{<img src="Picture13.png" title="" alt="">}}

The location of the custom file varies and depends on the base location specified during
installation.

### Summary

As you can see, there are many options and possible customizations with DPK. At Rackspace,
we use all tools available to assist our clients in staying up-to-date and agile. We can
tailor the PeopleSoft update and installation to reduce your downtime while also speeding
up the creation of any new instances. Our process automates deployments, which saves time
and reduces manual errors allowing for a defect-free deployment. 

<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/erp">Learn more about our ERP services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Let's Talk** to [start the conversation](https://www.rackspace.com/).

