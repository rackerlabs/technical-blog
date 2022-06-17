---
layout: post
title: "Basics of HashiCorp Vagrant"
date: 2022-05-17
comments: true
author: Bachu Paul
authorAvatar: 'https://secure.gravatar.com/avatar/65c3fbe49be4b7c3bc5269c45460a22a'
bio: ""
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "Basics of HashiCorp Vagrant"
metaDescription: "Vagrant is a tool for building and managing virtual machine environments in a single workflow."
ogTitle: "Basics of HashiCorp Vagrant"
ogDescription: "Vagrant is a tool for building and managing virtual machine environments in a single workflow."
slug: "basics-of-hashicorp-vagrant"

---
As per the [Vagrant official website](https://www.vagrantup.com/intro), “Vagrant is a tool for building and managing virtual machine environments in a single workflow. With an easy-to-use workflow and focus on automation, Vagrant lowers development environment setup time, increases production parity, and makes the works on my machine excuse a relic of the past.”

<!--more-->

### Introduction

In this blog, you will see how easily and quickly you can spin up multiple virtual machines. This allows configuring environment with desired tools without affecting the host machine. Vagrant supports multiple virtualization providers such as **VirtualBox**, **VMware Fusion** and **Hyper-V.**


### Prerequisites:

1.	Install latest version of [Vagrant](https://www.vagrantup.com/docs/installation)
2.	Install any virtualization provider tool – [VirtualBox](https://www.virtualbox.org/), [VMware Fusion](https://customerconnect.vmware.com/downloads/get-download?downloadGroup=FUS-PUBTP-2021H1), [Hyper-V](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v). 

Reference [Link](https://learn.hashicorp.com/tutorials/vagrant/getting-started-index?in=vagrant/getting-started)

In my example, I am using a VirtualBox tool.

### Initialize your vagrant project
Create a directory and change into that directory. This directory will act as the root directory for your project. Many of the vagrant configurations will be relative to this directory.

{{< highlight bash >}}
mkdir vagrant_dir/
cd vagrant_dir/
{{< /highlight >}}

### Create your first virtual machine

The following command will create a *Vagrantfile* and download Ubuntu 18.04 LTS 64-bit base image on your host. For this version of Ubuntu image, you need to run it once.

{{< highlight bash >}}
vagrant init generic/centos7
{{< /highlight >}}

Check the file named *Vagrantfile* created in the current directory

{{< highlight bash >}}
ls -al
{{< /highlight >}}

<img src=Picture1.png title="" alt="">

The Vagrantfile consists of default configurations required to launch a virtual machine. In this file, you can define the type of machine and resources you want to run and can pass scripts to install tools and OS configurations before the virtual machine is ready to use.

Run the following command to start the virtual machine

{{< highlight bash >}}
vagrant up
{{< /highlight >}}

With just two commands, you got your virtual machines started, and ready for use.

Run the following command to check the status of your virtual machine:

{{< highlight bash >}}
vagrant status
{{< /highlight >}}

<img src=Picture2.png title="" alt="">

### Connecting to a new virtual machine

To login/ssh into your virtual machine, run

{{< highlight bash >}}
vagrant ssh
{{< /highlight >}}

### Terminate SSH session

To terminate the SSH session press *COMMAND+D* in mac (in other OS *CTRL+D*) or type `logout` or `exit`

### Suspend the virtual machine

{{< highlight bash >}}
vagrant suspend
{{< /highlight >}}

### Forcefully shut down the virtual machine

{{< highlight bash >}}
vagrant halt
{{< /highlight >}}

### Destroy your virtual machine
To destroy your virtual machine run the following command. This will terminate your virtual machine. To run your virtual machine again just run vagrant up.

{{< highlight bash >}}
vagrant destroy
{{< /highlight >}}

<img src=Picture3.png title="" alt="">

### Vagrant Box

To start a virtual machine, you need one base image. In vagrant, these base images are called **boxes**. You need to download a desired box only once, then vagrant uses this box to quickly clone a virtual machine. Any changes to this box will apply only to the copy of the box and the original box is left unchanged.
To quickly add a box without creating a Vagrantfile, you can run the following command:

{{< highlight bash >}}
vagrant box add generic/centos7
{{< /highlight >}}

To get a catalog of boxes go to [HashiCorp’s Vagrant cloud](https://app.vagrantup.com/boxes/search). You can also host your custom box here.

If you want to manually create a script file and add a box in it, write the following code in a file named *Vagrantfile*.

{{< highlight bash >}}
vim Vagrantfile
Vagrant.configure("2") do |config|
  config.vm.box = "generic/centos7"
  #### To add a specific version
  config.vm.box_version = "3.6.12"
  #### Below line will sync your host directory
  #### to a VM directory.
  #### First argument is a host path
  #### Second argument is a VM path
  config.vm.synced_folder "./", "/vagrant_data"
end
{{< /highlight >}}

### Start the virtual machine

{{< highlight bash >}}
vagrant up
vagrant status
vagrant ssh
{{< /highlight >}}

<img src=Picture4.png title="" alt="">

### Synchronize host and guest files

There are times when you want to copy some files to and from your host to the virtual machine. It can be some scripts or your entire project directory. This functionality is quite handy when you want to edit your program files in your host machine on your favourite IDE and run them inside your virtual machine.
By default, vagrant syncs the Vagrantfile with the virtual machine at *path /vagrant*. This path is different from the one you will be after SSH into the virtual machine *(/home/vagrant).*
To test this feature, create a file/folder inside the virtual machine at location /vagrant and check the same in your host machine.

{{< highlight bash >}}
ls -l /vagrant_data/
touch /vagrant_data/myfile
exit
ls
{{< /highlight >}}

<img src=Picture5.png title="" alt="">

If syncing is not working, then follow *the troubleshooting tip #1* at the end of the blog.

### Provision a custom virtual machine
With the following Vagrantfile, you need to pre-install apache web server and configure it before you login in to the VM. This is useful when you want to automatically install desired tools every time you start your virtual machine.

*Configure Vagrantfile*:

{{< highlight bash >}}
vim Vagrantfile
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"
  config.vm.provision "shell", path: "scripts/bootstrap.sh"
  config.vm.synced_folder "./", "/vagrant"
end
{{< /highlight >}}

Create a directory in your host machine and add an index file

{{< highlight bash >}}
mkdir html/
vim html/index.html
<html>
  <body>
    <h3>Welcome to vagrant tutorial !!!</h3>
 </body>
</html>
{{< /highlight >}}

**Create a script to configure and start the apache web server**

{{< highlight bash >}}
mkdir scripts/
vim scripts/bootstrap.sh

#!/usr/bin/env bash
apt-get update
apt-get install -y apache2 w3m
if ! [ -L /var/www ]; then
  rm -rf /var/www
  ln -fs /vagrant /var/www
fi
{{< /highlight >}}

If you are provisioning this virtual machine for the first time, then run

{{< highlight bash >}}
vagrant up
{{< /highlight >}}

Else if you have already run the above command, and your virtual machines are in a running state, then instead of destroying and recreating virtual machines you can just reload the changes with

{{< highlight bash >}}
vagrant reload --provision
{{< /highlight >}}

In case you get the following error then follow *troubleshooting tip #1*

<img src=Picture6.png title="" alt="">

You need to run the following commands for accessing the apache webserver

{{< highlight bash >}}
vagrant ssh
curl http://localhost:80
w3m http://localhost:80
{{< /highlight >}}

### Port forwarding configuration

Vagrant port forwarding allows you to access a port on the virtual machine by linking it to a port on the host machine. Now let’s see how it works. You will access a port on the host machine, and all the network traffics are internally routed to the configured port on a virtual machine.

Modified Vagrantfile with port forwarded looks like following (highlighted port forwarded code)

{{< highlight bash >}}
exit
vim Vagrantfile
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"
  config.vm.provision "shell", path: "scripts/bootstrap.sh"
  config.vm.synced_folder "./", "/vagrant"
  config.vm.network "forwarded_port", guest: 80, host: 1234
end
{{< /highlight >}}

Reload your virtual machines to let your changes take effect 

{{< highlight bash >}}
vagrant reload --provision
{{< /highlight >}}

Now try to access your webserver from a browser in your host machine

[http://localhost:1234](http://localhost:1234)

### List Box files

To list out all the available boxes in your workstation run

{{< highlight bash >}}
vagrant box list
{{< /highlight >}}

To remove a particular box file

{{< highlight bash >}}
vagrant box remove hashicorp/bionic64
vagrant box remove generic/centos7
{{< /highlight >}}

**Troubleshooting Tips:**

1.	If syncing between host and guest is not working, then install vagrant-vbguest plugin.
_Note: This is not a vagrant official plugin_

{{< highlight bash >}}
vagrant plugin install vagrant-vbguest
vagrant reload --provision
{{< /highlight >}}

### Conclusion

By using HashiCorp’s vagrant tool, you can easily create and manage virtual machines and can automate the process of configuring virtual machines.
For more functionalities of Vagrant visit the official website of HashiCorp’s vagrant at https://www.vagrantup.com/docs



<a class="cta purple" id="cta" href="https://www.rackspace.com/hub/modern-cloud-applications">Let our experts guide you on your cloud-native journey.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
