---
layout: post
title: Software Defined Networks in the Havana release of Openstack – Part 3
date: '2014-05-08 09:30'
comments: true
author: Phil Hopkins
published: true
categories:
  - openstack
---

In [part 1](http://developer.rackspace.com/blog/software-defined-networks-in-the-havana-release-of-openstack.html) of this series we looked at creation of software defined networks (SDN) in OpenStack and started considering at how OpenStack accomplishes this function. Continuing on to [part 2](http://developer.rackspace.com/blog/software-defined-networks-in-the-havana-release-of-openstack-part-2.html), we started looking at the network path of VM1 for the tenant test and how it filters traffic to secure traffic flow into and out of the virtual machine (VM). In this section we will continue examining the filtering process by looking at sample packets as they proceed through these filters and may then either enter the Open vSwitch (OVS) process or proceed on to the VM depending on the packet flow direction.

<!-- more -->

Since the last article was written the OpenStack Icehouse release is out. With this release there are changes in the iptables rules used to implement the security group rules. Most notably is the elimination of all chains that used the word nova in them. These rules were still around from the old nova security groups and are no longer needed when using the more powerful neutron security groups.

As was pointed out in the previous discussion packets going through the FORWARD chain are going through the Linux bridge if not dropped first will pass through the chain `neutron-openvswi-sg-chain` which has an ACCEPT target at the end or through the chain `neutron-openvswi-s67c49753-b` which ends with a DROP target.

First, we will consider a DCHP request packet exiting VM1 and then a TCP packet on port 22 that is directed to this VM from outside the subnet. The reader may want to refer to the previous article in this series to see the various iptables rules that will be used in the following discussion.

DHCP request from VM1 (this is a layer 2 broadcast packet) packet header:

```
Source MAC: FA:16:3E:DC:BE:EB
Destination MAC: FF:FF:FF:FF:FF:FF
Protocol: UDP
Source Port: 68
Destination Port: 67
```

This packet will be exiting the tap interface going into the Linux bridge. This packet will enter into the `FORWARD` table and match the rule `neutron-filter-top`. This rule will not affect the packet so it will continue to the rule `neutron-openvswi-FORWARD`. Since this packet is going out of the tap interface it will match the second rule in this chain (the packet is going into the bridge),

```
PHYSDEV match --physdev-in tap67c49753-bf --physdev-is-bridged
```
and be directed to the chain `neutron-openvswi-sg-chain`. In this chain it will match the second rule which is identical to the previously matched rule and go to the chain `neutron-openvswi-i67c49753-b`. Be careful understanding the physdev-out term, as this is in perspective of the packet movement through the bridge not the device connected to the bridge.

Looking at this chain we can see that the packet will match the 1st rule in this chain:

```
udp  --  *    *    0.0.0.0/0         0.0.0.0/0          udp spt:68 dpt:67
```
 which has a target of return, meaning it will be returned to processing through the `neutron-openvswi-sg-chain`. The packet will then match the last rule (rule 3) of this chain:

```
ACCEPT     all  --  *      *       0.0.0.0/0            0.0.0.0/0
```
Since the target of this rule is accept the packet will then be sent on to the Linux bridge and on to the Open vSwitch process.

Now lets look at a SSH packet coming from the outside world going to the virtual machine: First the key packet information:

SSH packet from outside going to VM1, packet header:
Source MAC: EC:F4:BB:0C:F5:8E
Destination MAC: FA:16:3E:DC:BE:EB
Source IP address: 58.59.122.238 (10.0.0.1)
Destination IP address: 10.0.0.2
Protocol: TCP
Source Port: 30248
Destination Port: 22

This packet will travel from OVS into the Linux bridge through the iptables rules and if allowed on into the tap interface connected to the VM. One note about the source IP address, by default outside traffic is SNAT'ed at the router, this means that any outside traffic on this network will have its source address be that of the router (10.0.0.1), not the actual outside IP address.

This packet will flow through the `FORWARD` table's the iptables rules. It will be entering the tap interface coming from the Linux bridge. This packet will enter into the `FORWARD` table and match the rule neutron-filter-top. This rule will not affect the packet so it will continue to the rule `neutron-openvswi-FORWARD`. Since this packet is going into the tap interface (out of the bridge) it will match the first rule in this chain:

```
PHYSDEV match --physdev-out tap67c49753-bf --physdev-is-bridged
```
and be directed to the chain neutron-openvswi-sg-chain. In this chain it will match the first rule which is identical to the previously matched rule and go to the chain `neutron-openvswi-i67c49753-b`.

Looking at chain `neutron-openvswi-i67c49753-b`, the 5th rule:

```
RETURN  tcp  --  *   *       0.0.0.0/0     0.0.0.0/0      tcp dpt:22
```
will match this packet and return it back to the previous chain (`neutron-openvswi-sg-chain`) since the target is return. the last rule in this chain, which is:

```
Chain neutron-openvswi-sg-chain (2 references)
num  target     prot opt source               destination
3    ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0  
```
The target is ACCEPT, so the packet is accepted and will continue on to the tap interface and into the VM.

As we continue in this series we will next look the Open vSwitch process and how the network traffic is moved through to its proper destination.

The first article in this series - [Software Defined Networks in the Havana Release of OpenStack](http://developer.rackspace.com/blog/software-defined-networks-in-the-havana-release-of-openstack.html)

The second article in this series - [Software Defined Networks in the Havana Release of Openstack – Part 2]  (http://developer.rackspace.com/blog/software-defined-networks-in-the-havana-release-of-openstack-part-2.html)
