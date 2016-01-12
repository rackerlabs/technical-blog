---
layout: post
title: From Bare Metal to Rackspace Private Cloud POC
date: '2014-06-23 12:00'
comments: true
author: James Thorne
published: true
categories:
  - RPC
  - openstack
  - Private Cloud
---

There are all sorts of tools available to setup virtual OpenStack environments on your workstation. 

In Rackspace Private Cloud's case, the following three options are available:

* [The Official Rackspace Private Cloud Sandbox](http://www.rackspace.com/knowledge_center/article/rackspace-private-cloud-sandbox)
* [Multi-node Vagrantfiles](http://thornelabs.net/2013/12/17/deploy-rackspace-private-cloud-entirely-within-a-vagrantfile-on-virtualbox-or-vmware-fusion.html)
* [All-in-one shell script](https://github.com/cloudnull/rcbops_allinone_inone)

These tools are great to give you a very quick and easy way to setup a demo Rackspace Private Cloud environment to begin learning how the services, APIs, CLI tools, and Horizon Dashboard work. However, these demo environments do not give you a realistic expectation of what you can expect Rackspace Private Cloud to do for you on bare metal servers or how to actually set it all up.

<!-- more -->

In the following post, the first of several in the [RPC Insights series](http://www.rackspace.com/blog/welcome-to-rpc-insights/), I am going to detail how to deploy a proof of concept Rackspace Private Cloud environment powered by OpenStack Havana on top of Ubuntu Server 12.04.4 LTS on bare metal servers.

The Necessary Gear
------------------

At the very minimum, you will need the following gear:

1. One Layer 3 network device (such as a firewall) capable of creating VLANs
2. One network switch capable of configuring access and trunk ports
3. One physical or virtual server to act as the Chef Server
4. One physical server to act as the OpenStack Controller node
5. Two physical servers to act as the OpenStack Compute nodes
6. One physical server to act as the OpenStack Cinder node

Server and Network Diagram
--------------------------

{% img matte full 2014-06-23-from-bare-metal/rpc-poc-diagram.png rpc-poc-diagram %}

Configure VLANs
---------------

How to configure the routing network device (router, firewall, or load balancer) you are using in the environment is out of the scope of this article, but I can detail what VLANs need to be setup.

The VLAN numbers and network subnets are arbitrary and may need to be modified to fit in your environment.

### VLAN 50

This network should have connectivity out to the internet.

__Description__: SSH Access, Chef Server Access, OpenStack Services and APIs

__Network Subnet__: 10.0.50.0/24

__Network Gateway__: 10.0.50.1

### VLAN 100

This network does not need to have connectivity out to the internet.

__Description__: Neutron GRE Tunnels

__Network Subnet__: 10.0.100.0/24

__Network Gateway__: 10.0.100.1

### VLAN 150

This network does not need to have connectivity out to the internet.

__Description__: Cinder

__Network Subnet__: 10.0.150.0/24

__Network Gateway__: 10.0.150.1

### VLAN 200

This is one of the networks OpenStack Instances will connect to. If you want your OpenStack Instances to have connectivity to the internet from this network, then allow this network have to connectivity to the internet.

__Description__: Neutron Provider Network

__Network Subnet__: 10.0.200.0/24

__Network Gateway__: 10.0.200.1

### VLAN 210

This is one of the networks OpenStack Instances will connect to. If you want your OpenStack Instances to have connectivity to the internet from this network, then allow this network have to connectivity to the internet.

__Description__: Neutron Provider Network

__Network Subnet__: 10.0.210.0/24

__Network Gateway__: 10.0.210.1

Download Ubuntu Server 12.04.4 LTS
----------------------------------

Each physical server in the environment will need a minimal install of [Ubuntu Server 12.04.4 LTS](http://releases.ubuntu.com/12.04/ubuntu-12.04.4-server-amd64.iso).

Ideally, you have an existing PXE boot environment in place to kick all of the physical servers with a minimal install of Ubuntu Server 12.04.4 LTS. How to setup one of these environments is out of the scope of this article, but there are plenty of guides available online.

Chef Server OS Install and Network Configuration
------------------------------------------------

During installation, the following partition table can be used:

    /dev/sda1 - Linux - /boot - 256 MB
    /dev/sda2 - Linux LVM - LVM Physical Volume (root and swap) - Remaining space

Once you have a minimal install of Ubuntu Server 12.04.4 LTS on the Chef Server node, the networking interfaces will need to be configured in the following manner:

__NIC:__ eth0

__Network Subnet:__ 10.0.50.9/24

__Network Gateway:__ 10.0.50.1

The network switch port that __eth0__ is plugged into should be an __access__ port on __VLAN 50__.

controller1 OS Install and Network Configuration
------------------------------------------------

During installation, the following partition table can be used:

    /dev/sda1 - Linux - /boot - 256 MB
    /dev/sda2 - Linux LVM - LVM Physical Volume (root and swap) - Remaining space

Once you have a minimal install of Ubuntu Server 12.04.4 LTS on the controller1 node, the networking interfaces will need to be configured in the following manner:

__NIC:__ eth0

__Network Subnet:__ 10.0.50.10/24

__Network Gateway:__ 10.0.50.1

The network switch port that __eth0__ is plugged into should be an __access__ port on __VLAN 50__.

__NIC:__ eth1

__Network Subnet:__ 10.0.100.10/24

The network switch port that __eth1__ is plugged into should be an __access__ port on __VLAN 100__.

__NIC:__ eth2

__Network Subnet:__ 10.0.150.10/24

The network switch port that __eth2__ is plugged into should be an __access__ port on __VLAN 150__.

__NIC:__ eth3

__Network Subnet:__ Active but unconfigured

The network switch port that __eth3__ is plugged into should be an __trunk__ port with __VLANs 200 and 210__.

compute1 OS Install and Network Configuration
---------------------------------------------

During installation, the following partition table can be used:

    /dev/sda1 - Linux - /boot - 256 MB
    /dev/sda2 - Linux LVM - LVM Physical Volume (root and swap) - Remaining space

Once you have a minimal install of Ubuntu Server 12.04.4 LTS on the compute1 node, the networking interfaces will need to be configured in the following manner:

__NIC:__ eth0

__Network Subnet:__ 10.0.50.20/24

__Network Gateway:__ 10.0.50.1

The network switch port that __eth0__ is plugged into should be an __access__ port on __VLAN 50__.

__NIC:__ eth1

__Network Subnet:__ 10.0.100.20/24

The network switch port that __eth1__ is plugged into should be an __access__ port on __VLAN 100__.

__NIC:__ eth2

__Network Subnet:__ 10.0.150.20/24

The network switch port that __eth2__ is plugged into should be an __access__ port on __VLAN 150__.

__NIC:__ eth3

__Network Subnet:__ Active but unconfigured

The network switch port that __eth3__ is plugged into should be an __trunk__ port with __VLANs 200 and 210__.

compute2 OS Install and Network Configuration
---------------------------------------------

During installation, the following partition table can be used:

    /dev/sda1 - Linux - /boot - 256 MB
    /dev/sda2 - Linux LVM - LVM Physical Volume (root and swap) - Remaining space

Once you have a minimal install of Ubuntu Server 12.04.4 LTS on the compute2 node, the networking interfaces will need to be configured in the following manner:

__NIC:__ eth0

__Network Subnet:__ 10.0.50.21/24

__Network Gateway:__ 10.0.50.1

The network switch port that __eth0__ is plugged into should be an __access__ port on __VLAN 50__.

__NIC:__ eth1

__Network Subnet:__ 10.0.100.21/24

The network switch port that __eth1__ is plugged into should be an __access__ port on __VLAN 100__.

__NIC:__ eth2

__Network Subnet:__ 10.0.150.21/24

The network switch port that __eth2__ is plugged into should be an __access__ port on __VLAN 150__.

__NIC:__ eth3

__Network Subnet:__ Active but unconfigured

The network switch port that __eth3__ is plugged into should be an __trunk__ port with __VLANs 200 and 210__.

cinder1 OS Install and Network Configuration
--------------------------------------------

During installation, the following partition table can be used:

    /dev/sda1 - Linux - /boot - 256 MB
    /dev/sda2 - Linux LVM - LVM Physical Volume (root and swap) - 50 GB
    /dev/sda3 - Linux LVM - LVM Physical Volume (Cinder) - Remaining Space

Once you have a minimal install of Ubuntu Server 12.04.4 LTS on the cinder1 node, the networking interfaces will need to be configured in the following manner:

__eth1__ and __eth3__ are not connected.

__NIC:__ eth0

__Network Subnet:__ 10.0.50.30/24

__Network Gateway:__ 10.0.50.1

The network switch port that __eth0__ is plugged into should be an __access__ port on __VLAN 50__.

__NIC:__ eth2

__Network Subnet:__ 10.0.150.30/24

The network switch port that __eth2__ is plugged into should be an __access__ port on __VLAN 150__.

Setup the Chef Server
---------------------

At this point the Chef Server should be able to ping the controller1, compute1, compute2, and cinder1 nodes on network __10.0.50.0/24__.

Log in via SSH as the root user to the __Chef Server__:

    ssh root@10.0.50.9

Run the following commands to install and configure the open source Chef Server:

    wget https://raw.github.com/rcbops/support-tools/master/chef-install/install-chef-server.sh

    chmod +x install-chef-server.sh

    ./install-chef-server.sh

Download and upload the Rackspace Private Cloud Havana Chef Cookbooks:

    git clone https://github.com/rcbops/chef-cookbooks.git

    cd chef-cookbooks

    git checkout havana
    git submodule init
    git submodule sync
    git submodule update

    knife cookbook upload -a -o cookbooks

    knife role from file roles/*rb

Create the Rackspace Private Cloud Havana Chef Environment:

    knife environment create rpc-havana -d "Rackspace Private Cloud"

Edit the Rackspace Private Cloud Havana Chef Environment. In the export command below, feel free to replace __vim__ with __nano__ or any other command line based text editor you are comfortable with.

    export EDITOR=$(which vim)

    knife environment edit rpc-havana

Once the command line text editor opens with the default Chef Environment, delete the contents, and paste in the following Chef Environment (an explanation of each part of the Chef Environment file can be found [here](http://developer.rackspace.com/blog/understanding-the-chef-environment-file-in-rackspace-private-cloud-v4-dot-2-x-powered-by-openstack-havana.html)):

    {
        "name": "rpc-havana",
        "description": "Rackspace Private Cloud",
        "cookbook_versions": {},
        "json_class": "Chef::Environment",
        "chef_type": "environment",
        "default_attributes": {},
        "override_attributes": {
            "nova": {
                "libvirt": {
                    "virt_type": "kvm",
                    "vncserver_listen": "0.0.0.0"
                },
                "network": {
                    "provider": "neutron"
                }
            },
            "neutron": {
                "ovs": {
                    "provider_networks": [
                        {
                            "label": "ph-eth3",
                            "bridge": "br-eth3"
                        }
                    ],
                    "network_type": "gre",
                    "network": "neutron"
                }
            },
            "cinder": {
                "services": {
                    "volume": {
                        "network": "cinder"
                    }
                }
            },
            "mysql": {
                "allow_remote_root": true,
                "root_network_acl": "%"
            },
            "osops_networks": {
                "nova": "10.0.50.0/24",
                "public": "10.0.50.0/24",
                "management": "10.0.50.0/24",
                "neutron": "10.0.100.0/24",
                "cinder": "10.0.150.0/24"
            }
        }
    }

Save the file and quit the command line text editor. The new Chef Environment is now in place.

The Chef Server will need passwordless SSH access to each physical server in the environment, so create a new, passwordless SSH Public/Private Key (use the defaults for anything prompted):

    ssh-keygen

Copy the SSH Public Key to the controller node:

    ssh-copy-id root@10.0.50.10

Copy the SSH Public Key to the compute nodes:

    ssh-copy-id root@10.0.50.20

    ssh-copy-id root@10.0.50.21

Copy the SSH Public Key to the cinder node:

    ssh-copy-id root@10.0.50.30

Chef Bootstrap each physical server in the environment and set the Chef Environment:

    knife bootstrap controller1 --environment rpc-havana

    knife bootstrap compute1 --environment rpc-havana

    knife bootstrap compute2 --environment rpc-havana

    knife bootstrap cinder1 --environment rpc-havana

Add the __single-controller__ and __single-network-node__ roles to __controller1__:

    knife node run_list add controller1 'role[single-controller],role[single-network-node]'

Add the __single-compute__ role to __compute1__ and __compute2__:

    knife node run_list add compute1 'role[single-compute]'

    knife node run_list add compute2 'role[single-compute]'

Add the __cinder-volume__ role to __cinder1__:

    knife node run_list add cinder1 'role[cinder-volume]'

Configuration of the __Chef Server__ is now complete and all of the OpenStack nodes have been bootstrapped to the Chef Server. 

Setup controller1
-----------------

Log in via SSH as the root user to __controller1__:

    ssh root@10.0.50.10

Run `chef-client` to begin setting up __controller1__ (installation time will partly depend on your internet connection).

Once `chef-client` completes successfully, you should have a working OpenStack controller node.

Next, because __eth3__ has been designated as the network interface to trunk VLANs into the OpenStack environment, you need to reconfigure it to work with Open vSwitch.

Down __eth3__:

    ip link set eth3 down

Open __/etc/network/interfaces__ with your favorite command line text editor and reconfigure __eth3__ to look like the following:

    auto eth3
    iface eth3 inet manual
        up ip link set eth3 up
        down ip link set eth3 down

    iface br-eth3 inet manual

__br-eth3__ is an Open vSwitch Bridge created during the `chef-client` run.

Have __br-eth3__ come up on boot by adding the following to __/etc/rc.local__:

    ifup br-eth3

Up __eth3__ and __br-eth3__:

    ip link set eth3 up

    ip link set br-eth3 up

Add __eth3__ to the __br-eth3__ Open vSwitch Bridge:

    ovs-vsctl add-port br-eth3 eth3

Configuration of __controller1__ is now complete.

Setup compute1
--------------

Log in via SSH as the root user to __compute1__:

    ssh root@10.0.50.20

Run `chef-client` to begin setting up __compute1__ (installation time will partly depend on your internet connection).

Once `chef-client` completes successfully, you should have a working OpenStack compute node.

Next, because __eth3__ has been designated as the network interface to trunk VLANs into the OpenStack environment, you need to reconfigure it to work with Open vSwitch.

Down __eth3__:

    ip link set eth3 down

Open __/etc/network/interfaces__ with your favorite command line text editor and reconfigure __eth3__ to look like the following:

    auto eth3
    iface eth3 inet manual
        up ip link set eth3 up
        down ip link set eth3 down

    iface br-eth3 inet manual

__br-eth3__ is an Open vSwitch Bridge created during the `chef-client` run.

Have __br-eth3__ come up on boot by adding the following to __/etc/rc.local__:

    ifup br-eth3

Up __eth3__ and __br-eth3__:

    ip link set eth3 up

    ip link set br-eth3 up

Add __eth3__ to the __br-eth3__ Open vSwitch Bridge:

    ovs-vsctl add-port br-eth3 eth3

Configuration of __compute1__ is now complete.

Setup compute2
--------------

Log in via SSH as the root user to __compute2__:

    ssh root@10.0.50.21

Perform all of the same steps you did in the __Setup compute1__ section.

Configuration of __compute2__ is now complete.

Setup cinder1
-------------

Log in via SSH as the root user to __cinder1__:

    ssh root@10.0.50.30

Currently, __cinder1__ has a root partition of roughly 50 GB. Some of that space will be used for swap. The remaining space on the server has been set aside for Cinder storage. The remaining space should be on partition __/dev/sda3__. This partition needs to be configured for LVM.

Create the LVM Physical Volume:

    pvcreate /dev/sda3

Create the LVM Volume Group on top of the LVM Physical Volume:

    vgcreate cinder-volumes /dev/sda3

Run `chef-client` to begin setting up __cinder1__ (installation time will partly depend on your internet connection).

Once `chef-client` completes successfully, you should have a working OpenStack Cinder node.

OpenStack Configuration
-----------------------

At this point, all of the necessary network and operating system configuration is done, and OpenStack is installed and ready to be used.

Before you can begin creating OpenStack Instances, at the very minimum you need to upload images to Glance and create Neutron Networks.

Log in via SSH as the root user to __controller1__:

    ssh root@10.0.50.10

Source in the OpenStack credentials so you can use the OpenStack command line tools:

    source /root/openrc

### Upload Images to Glance

You can upload and use the following three images from CirrOS, Ubuntu, and CentOS.

Upload the __cirros-0.3.2-x86_64__ cloud image:

    glance image-create --name cirros-0.3.2-x86_64 --is-public true --container-format bare --disk-format qcow2 --copy-from http://download.cirros-cloud.net/0.3.2/cirros-0.3.2-x86_64-disk.img

Upload the __ubuntu-server-12.04__ cloud image:

    glance image-create --name ubuntu-server-12.04 --is-public true --container-format bare --disk-format qcow2 --copy-from http://cloud-images.ubuntu.com/precise/current/precise-server-cloudimg-amd64-disk1.img

Upload the __centos-6.5__ cloud image:

    glance image-create --name centos-6.5-x86_64 --is-public true --container-format bare --disk-format qcow2 --copy-from http://repos.fedorapeople.org/repos/openstack/guest-images/centos-6.5-20140117.0.x86_64.qcow2

### Create Two Neutron Provider Networks

The steps in this post have setup two VLANs to use as Neutron Provider Networks. They can be setup with the following commands.

Create Neutron Provider Network __provider-network-200__:

    neutron net-create provider-network-200 --provider:physical_network=ph-eth3 --provider:network_type=vlan --provider:segmentation_id=200 --router:external=True --shared

    neutron subnet-create provider-network-200 10.0.200.0/24 --name provider-subnet-200 --no-gateway --host-route destination=0.0.0.0/0,nexthop=10.0.200.1 --allocation-pool start=10.0.200.100,end=10.0.200.254 --dns-nameservers list=true 8.8.8.8 8.8.4.4

Create Neutron Provider Network __provider-network-201__:

    neutron net-create provider-network-210 --provider:physical_network=ph-eth3 --provider:network_type=vlan --provider:segmentation_id=210 --router:external=True --shared

    neutron subnet-create provider-network-210 10.0.210.0/24 --name provider-subnet-210 --no-gateway --host-route destination=0.0.0.0/0,nexthop=10.0.210.1 --allocation-pool start=10.0.210.100,end=10.0.210.254 --dns-nameservers list=true 8.8.8.8 8.8.4.4

What's Next
-----------

At this point, Rackspace Private Cloud powered by OpenStack Havana should be running on your bare metal servers. You have uploaded several Glance images and created two Neutron Provider Networks to attach OpenStack Instances to.

This concludes the first of several posts in the [RPC Insights series](http://www.rackspace.com/blog/welcome-to-rpc-insights/).

Join us on June 24, 2014 at 10:00 AM CDT for a live webinar on [Spinning Up Your First Instance on RPC](https://cc.readytalk.com/cc/s/registrations/new?cid=ebv9dzujw4cg).
