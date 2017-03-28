---
layout: post
title: 'Corekube: Running Kubernetes on CoreOS via OpenStack'
date: '2014-09-10 12:26'
comments: true
author: Mike Metral
published: true
categories:
  - cloud-servers
  - OpenStack
  - Docker
bio: >-
  Mike Metral is a Solution Architect at Rackspace in the Private Cloud R&D
  organization. Mike joined Rackspace in 2012 to help establish OpenStack become
  the open standard for cloud management. You can follow Mike on Twitter
  @mikemetral and Github as metral.
---

Docker, CoreOS and Kubernetes are new, emerging technologies that are
shifting the way cloud infrastructure & applications are designed,
consumed and managed. Their influence in the community is
equatable to the movement started by virtual machines & management
offerings like VMWare (vSphere, vCenter etc.) & OpenStack.

In this post, we will be reviewing how to deploy Kubernetes onto a cluster of CoreOS VM's
via OpenStack to enable a management system for Docker containers.
Specifically, we do so using the ease of OpenStack Heat, Rackspace Cloud Servers & Cloud Networks,
CoreOS, its cloud-config model, as well as its etcd and fleet API's to not only
lay down the infrastructure, but provision it accordingly.

<!-- more -->

## Quick Links
* [Corekube Source](https://github.com/metral/corekube)
* [Background](#background)
* [What is Corekube?](#corekube)
* [Objective](#objective)
* [Setup & Installation](#setup)
* [Kubernetes Usage](#usage)

## TL;DR

#### Corekube Deployment

Pull down the source: [Corekube Source](https://github.com/metral/corekube)

Create the stack via Heat:

```
heat stack-create corekube --template-file corekube-heat.yaml -P key-name=<RAX_SSH_KEYNAME>
```

#### Using Kubernetes on the Corekube Deployment
[How to run examples on Kubernetes](#usage)

<a name="background"></a>
## Background

**Docker**

<p align="center">{% img running-coreos-and-kubernetes/docker.png %}</p>

[Docker](http://www.docker.com) is an open-source project that automates the deployment of
applications inside software containers, providing an additional layer of
abstraction and automation of operating system–level virtualization on
Linux.

Specifically, Docker is a tool that can package an application and
its dependencies in a virtual container that can run on any Linux
server. This helps enable flexibility and portability on where the
application can run, whether on premise, public cloud,
private cloud, bare metal, etc.

**CoreOS**

<p align="center">{% img running-coreos-and-kubernetes/coreos.png %}</p>

[CoreOS](http://www.coreos.com) is a new Linux distribution that has been rearchitected to provide features needed to run modern infrastructure stacks. The strategies and architectures that influence CoreOS allow companies like Google, Facebook and Twitter to run their services at scale with high resilience.

Most importantly, as an operating system, CoreOS provides only the minimal functionality required to deploy applications. This evolves the operating model users are accustomed to by moving away from deploying applications at the application layer to deploying applications inside software containers operated by Docker. More simply put, applications can be thought of as self-contained binaries that can be moved around environments accordingly based on your requirements of QOS, policy, affinity, replication etc. and a system that allows for such characteristics of state to be configured & managed.

In addendum to the [self-updating nature](https://coreos.com/using-coreos/updates/) of CoreOS, the real value lies in its flagship products:

* [etcd](https://github.com/coreos/etcd)
    * A highly-available key value store for shared configuration and service discovery
* [fleet](https://github.com/coreos/fleet)
    * Fleet ties together systemd and etcd into a distributed init system
        * Think of it as an extension of systemd that operates at the cluster level instead of the machine level
            * i.e. its orchestration for systemd units across your cluster

**Kubernetes**

<p align="center">{% img running-coreos-and-kubernetes/kubernetes.png %}</p>

[Kubernetes](https://github.com/GoogleCloudPlatform/kubernetes) is a system for managing containerized clusters applications across multiple hosts, providing basic mechanisms for deployment, maintenance, and scaling of applications.

Specifically, Kubernetes:

* Uses Docker to package, instantiate, and run containerized applications
* Establishes robust declarative primitives for maintaining the desired state requested by the user. Self-healing mechanisms, such as auto-restarting, re-scheduling, and replicating containers require active controllers, not just imperative orchestration
* Is primarily targeted at applications comprised of multiple containers, such as elastic, distributed micro-services
* Enables users to ask a cluster to run a set of containers
    * The system automatically chooses hosts to run those containers on using a scheduler that is policy-rich, topology-aware & workload-specific

<a name="corekube"></a>
## What is Corekube?

Corekube is a project whose intent is facilitating the deployment of Kubernetes onto a cluster of CoreOS VM's
via OpenStack, where we can enable a management system for Docker containers.

Corekube's source can be found [here](https://github.com/metral/corekube).

<a name="objective"></a>
## Objective

Corekube's objective is an adapation of CoreOS's [Running Kubernetes Example on CoreOS](https://coreos.com/blog/running-kubernetes-example-on-CoreOS-part-2/) blog post.

"Running Kubernetes Example on CoreOS" describes the installation of Kubernetes with VMWare, some manual network configuration & the deployment of the Kubernetes master & minion stacks via cloud-config.

In this post, we utilize CoreOS's example as a **very** valuable foundation, but perform a couple of modifications:

* We will use Openstack (Rackspace Orchestration/Heat, Cloud Networks and Cloud Servers) & CoreOS's cloud-config to allow for:
    * Deployment of virtual resources required by both CoreOS and Kubernetes via OpenStack on the Rackspace Public Cloud
    * Creation of a repeatable template to instantiate, setup & bootstrap a proof-of-concept of a Kubernetes cluster running atop of CoreOS
* Use etcd & fleet API's to instantiate a Kubernetes role on a CoreOS machine
    * Utilizing the API's not only allows for the dynamic bootstrapping of CoreOS machines to assume a Kubernetes role, but creates the opportunity for expansion of the cluster in the future - abilities that are out of the scope of an all cloud-config based setup such as the one demonstrated in the CoreOS post
        * This would only require to point new machines to the etcd discovery node and then use our same mechanisms to provision it - more on this below

<a name="setup"></a>
## Setup & Installation

**Heat Template**

<p align="center">{% img running-coreos-and-kubernetes/openstack.png %}</p>

At the helm of CoreKube is an OpenStack Heat template that lays down the
following infastructure in an ordered fashion, with discovery & priv_network
being built first, and then kubernetes-master-x, kubernetnes-minion-y and overlord
afterwords.

* "discovery" - CoreOS Cloud Server - Private etcd used for cluster discovery
* "priv_network" - Cloud Network - Isolated layer 2 network used in an overlay
  network to supply Kubernetes with its own subnet
* "kubernetes-master-x" - CoreOS Cloud Server - Assumes the Kubernetes Master role
* "kubernetes-minion-y" - CoreOS Cloud Server - Assumes the Kubernetes Minion role
* "overlord" - CoreOS Cloud Server - Gathers cluster information & provisions Kubernetes roles onto the Kuberenetes-\* host machines

**Cloud-Config**

Once each of the cloud server's are booted, CoreOS has the ability to customize
various OS-level items such as network configuration, user accounts & [systemd
units](https://coreos.com/using-coreos/systemd/).

The file used by this system initialization program for the OS customization is called a
["cloud-config"](https://coreos.com/docs/cluster-management/setup/cloudinit-cloud-config/) file. It is inspired & adapted from the cloud-init project's cloud-config
file which is "the defacto multi-distribution package that handles early
initialization of a cloud instance".

Each Cloud Server in the infrastructure has a cloud-config file passed into it via Heat, that sets up the requirements for the respective machine's role.

**Discovery**

The first step in Corekube's process, after server creation, is to instantiate a private discovery node using etcd, which is required for
the cluster of overlord, kubernetes-master-x, and kubernetes-minion-y nodes.

The discovery service is provided by the [coreos/etcd](https://registry.hub.docker.com/u/coreos/etcd/)
Docker repo with a unique cluster UUID generated at creation via Heat.

This discovery node's IP, combined with the cluster UUID, are used to assemble the complete discovery path needed by the etcd services (as well as the fleet service since it depends on etcd) for
the rest of the infrastructure.

Therefore, by the cluster nodes directly connecting to the discovery node, they have the information necessary to communicate with each other via fleetctl - the mechanism with which we deploy the Kubernetes role onto the designated machine.
<p align="center">{% img running-coreos-and-kubernetes/discovery.png %}</p>

**Networking**

Once each machine has booted & connected their etcd service to the private discovery node (and fleet/fleetctl is ready to make use of this connection), a network architecture must be established to allow the containers that the Kubernetes nodes operate to communicate with one-another on their own subnet.

In order to understand the proposed networking architecture described below, we must first understand at a high-level how networking works with regards to Docker:

* By default, Docker creates a virtual interface, specically a virtual Ethernet bridge (aka a linux bridge), named docker0 on the host machine
* If docker0 does not have an address and subnet, which by default it does not, Docker randomly chooses an address and subnet from the private range defined by RFC 1918 that are not in use on the host machine, and assigns it to docker0.
* Because docker0 is a linux bridge, it automatically forwards packets between any other network interfaces that are attached to it
* So, every time Docker creates a container, it creates a pair of “peer” interfaces, specifically a virtual ethernet device (aka an veth device), that are like opposite ends of a pipe - this lets containers communicate both with the host machine and with each other

Now that we know how containers on Docker talk to other containers on the same host, we need to figure out how to allow containers on *different* hosts to have the same capability; specifically, when using a Rackspace Cloud Network, as it provides the servers an additional & isolated Layer 2 network.

To allow the containers to communicate with each other via its Kubernetes host machine (which has an interface on the isolated layer 2 network), their must be some sort of networking mechanism to allow for it.

However, its worth noting that on a Rackspace Cloud Network, MAC filtering is performed; therefore, any traffic that originates on the docker0 linux bridge by the container will *not* be able to inherently communicate with the rest of the docker0 linux bridges in the rest of the cluster.

Fortunately, there is a solution that helps us in various ways: establish a multicast [vxlan overlay](http://en.wikipedia.org/wiki/Virtual_Extensible_LAN) on top of the Cloud Network.

Since vxlan's function by encapsulating the MAC-based layer 2 ethernet frames within layer 4 UDP packets, and because we can create one to operate on multicast mode, we can accomplish a couple of goals:

* We get around the MAC filtering that the Cloud Network imposes, as vxlan traffic will still originate from the Cloud Network MAC address, and not the linux bridge used by Docker when a container creates the traffic
* Communication paths for the entire group of all Kubernetes host machines & containers becomes automatically established because multicast allows all machines (hosts & containers) to not only send packets, but also, receive all packets sent on the overlay network; therefore, both Kubernetes host machines and containers can communicate with one another on their own subnet.

Below is the proposed network architecture that is configured on the Kubernetes machines via cloud-config & systemd units:

* Each Kubernetes machine will have an interface, named "eth2", on the 192.168.3.0/24 Cloud Network
* We will then create a new bridge, named "cbr0" to differ from the default "docker0", with a network CIDR 10.244.0.0/15 where:
    * Master nodes will have an address of 10.244.{master\_machine\_index}.1/24
    * Minion nodes will have an address of 10.245.{minion\_machine\_index}.1/24
* A vxlan network device is then created named "vxlan0" on multicast mode which operates on the eth2 device, hence, creating an overlay on top of eth2
* We then add the new vxlan device, vxlan0, to the bridge, cbr0
* Finally, we swap out the default Docker bridge, docker0, with cbr0 in the Docker daemon so that it all container networking is based off of this new bridge

<p align="center">{% img running-coreos-and-kubernetes/networking.png %}</p>

**Note**: Some aspects of the networking such as the subnet assignment being based
off of the Heat machine index in the resource group are known hacks and are *not* meant to be used in production. Better subnet management, and potentially
creating the appropriate network for the Docker containers that Kubernetes
manages may be better suited with recently-released projects such as [Rudder](https://github.com/coreos/rudder) & [Weave](https://github.com/zettio/weave/). However, it is not in the near-term scope of Corekube to adopt one technology over the other.

**Overlord**

As you may have noticed in the "Cluster Discovery" figure above, there is an additional CoreOS server in addendum to the Kubernetes machines: the Overlord.

The Overlord is a custom [Go](http://golang.org/) package that operates in a Docker container.
After it's etcd service discovers the rest of the cluster via the private discovery service, it is tasked with the following responsibilities:

* Using the local etcd API, wait for all expected machines in the cluster to show up in etcd & collect their relevant data
* Using the local etcd API, wait for all expected machines in the cluster to have their fleet metadata be available & collect it
* Create systemd unit files for the Kubernetes master & minion machines from pre-existing templates
    * These templates are populated with relevant information collected locally, such as the dependent machines & criteria a Kubernetes node needs to operate
* Using the local fleet API, start the batch of templates that deal with downloading the Kubernetes master & minion binaries to the respective CoreOS host
* Using the local fleet API, start the batch of templates that deal with instantiating & running the Kubernetes master & minion binaries on the respective CoreOS host

The Overlord's tasks are best described in the following figure:

<p align="center">{% img running-coreos-and-kubernetes/flow.png %}</p>

<a name="overlord-tasks"></a>
To view the Overlord's progress and status, log into the the "overlord" server and examine the Docker container, it operates: "setup\_kubernetes"

**Note** Building the setup\_kubernetes container and running it can take
several minutes, so refresh the following commands below until its output
resembles yours.

Review the Docker image pulled:

```
$ docker images

REPOSITORY          TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
setup_kubernetes    master              a3a95c2e3b1c        6 hours ago         604.9 MB
google/golang       stable              e0d9d5bb3d3d        5 days ago          559.6 MB
```

Review all Docker processes:

```
$ docker ps -a

CONTAINER ID        IMAGE                     COMMAND                CREATED
14678dc12d55        setup_kubernetes:master   /gopath/bin/setup_ku   6 hours ago
```

Review the logs of the overlord's container:

```
$ docker logs 14678dc12d55

2014/09/09 03:36:45
Fleet Machine:
-- ID: 7ec17e1f7e9d40e0ba247e1cde257cfd
-- PublicIP: 10.208.196.197
-- Metadata: (kubernetes_role => overlord)

2014/09/09 03:36:45
Fleet Machine:
-- ID: ca2ebc1eec234e6da36a2cb059517e89
-- PublicIP: 10.208.198.136
-- Metadata: (kubernetes_role => master)

2014/09/09 03:36:45
Fleet Machine:
-- ID: a2b84acbad074566ae21874d5e7fa58e
-- PublicIP: 10.208.200.28
-- Metadata: (kubernetes_role => minion)

2014/09/09 03:36:45
Fleet Machine:
-- ID: 78e09cc2d73549f982701658bacab491
-- PublicIP: 10.208.198.205
-- Metadata: (kubernetes_role => minion)

2014/09/09 03:36:45
Fleet Machine:
-- ID: 5cd010084c8b48158a4c579650080405
-- PublicIP: 10.208.199.254
-- Metadata: (kubernetes_role => minion)

2014/09/09 03:36:45 Created systemd unit files for kubernetes deployment
2014/09/09 03:36:45 Waiting for (4) services to be complete in fleet. Currently at: (0)
2014/09/09 03:36:48 Waiting for (4) services to be complete in fleet. Currently at: (0)
2014/09/09 03:36:49 Waiting for (4) services to be complete in fleet. Currently at: (2)
2014/09/09 03:36:50 Waiting for (4) services to be complete in fleet. Currently at: (3)
2014/09/09 03:36:57 Unit files in '/units/kubernetes_units/download' have completed
2014/09/09 03:36:59 Waiting for (8) services to be complete in fleet. Currently at: (0)
2014/09/09 03:37:02 Waiting for (8) services to be complete in fleet. Currently at: (4)
2014/09/09 03:37:03 Unit files in '/units/kubernetes_units/roles' have completed
```

<a name="usage"></a>
## Kubernetes Usage

Once the Heat template finishes instantiating the Heat template, the resources are booted & initiated, and we've [verified that the Overlord's setup\_kubernetes container ran & exited successfully](#overlord-tasks), we can begin using the [examples](https://github.com/GoogleCloudPlatform/kubernetes#where-to-go-next) available that showcase Kubernetes capabilities.

A great first set of steps is to:

* Log into the Kubernetes Master node as root using your RAX SSH keypair
* Change to the core user: ```$ su -l core```
* Run the commands listed in the [Guestbook example](https://github.com/GoogleCloudPlatform/kubernetes/blob/master/examples/guestbook/README.md)

**Note:**

* For the commands listed, instead of using `$ cluster/kubecfg.sh`, use `$ /opt/bin/kubecfg`
* After you complete the deployment of the guestbook, it could take a couple of minutes before the frontend nodes are accessible, so be patient.

