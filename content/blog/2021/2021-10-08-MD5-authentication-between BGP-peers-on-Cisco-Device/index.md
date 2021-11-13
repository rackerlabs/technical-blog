---
layout: post
title: "MD5 Authentication Between BGP Peers on Cisco Device"
date: 2021-10-07
comments: true
author: Mayukh Mandal
authorAvatar: https://www.gravatar.com/avatar/35e95902333a1613f6bc516a411d8ee3
bio: ""
published: true
authorisRacker: true
categories: 
- Security

metaTitle: "MD5 Authentication Between BGP Peers on Cisco Device"
metaDescription: "This blog explains the Border Gateway Protocol which is a standardized exterior protocol designed to exchange routing information across autonomous systems (AS) on the Internet."
ogTitle: "MD5 Authentication Between BGP Peers on Cisco Device"
ogDescription: "This blog explains the Border Gateway Protocol which is a standardized exterior protocol designed to exchange routing information across autonomous systems (AS) on the Internet"
slug: "md5-authentication-between-bgp-peers-on-cisco-device" 

---

The Border Gateway Protocol (BGP) is a standardized exterior gateway protocol designed to exchange routing information across autonomous systems (AS) on the Internet. As BGP is mostly used over internet, it is essential to keep the network secure. 

<!--more-->

### Introduction 
BGP peers can be configured with an MD5 algorithm (introduced in RFC 2385) which support routing authentication. When MD5 authentication is enabled, it computes an MD5 cryptographic hash over the TCP “pseudo header”, which includes the IP addresses used, the BGP packet carried in the TCP segment and a secret password. The resulting MD5 hash is then put in a TCP option in the TCP header and the packet is sent on its way. (The password isn’t transmitted.) The other side performs the same MD5 calculation and checks the result against the MD5 hash in the TCP header. If the two MD5 hashes are same, then we can be reasonably sure of two things:

1.	The sender of the packet also knows the secret password
2.	The TCP segment and its contents weren’t modified during transit
If any attacker sends spoofed TCP reset packets, the MD5 hash will be missing, or it will be incorrect. The router simply ignores those packets and the BGP session is unaffected.

### Overview
There are a few steps that need to be performed to complete this activity. Such as, creating network topology, configure hostname, configure interface IP, Configure External Border Gateway Protocol (EBGP)between Site A & site B, configure MD5 authentication, verification, and troubleshooting.
### Topology
<img src=Picture1.jpg title="" alt="">

### Configuration
### Site A: 
`Router#conf t`

`Router(config-if)#hostname siteA`

`siteA(config)#interface gig0/0`

`siteA(config-if)#ip address 192.168.1.100 255.255.255.0`

`siteA(config)# no shut`

`siteA(config)#interface loopback 1`

`siteA(config-if)#ip address10.10.10.1 255.255.255.0`

`%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up`

`%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up`

`siteA(config-if)#router bgp 100`

`siteA(config-router)#neighbor 192.168.1.101 remote-as 200` 

`siteA(config-router)#%BGP-5-ADJCHANGE: neighbor 192.168.1.101 Up`

`siteA(config-router)#neighbor 192.168.1.101 password cisco123`

`siteA(config-router)#network 10.10.10.1 mask 255.255.255.0`

### Site B: 
`Router#conf t`

`Router(config)#hostname siteB`

`siteB(config-if)#ip address 192.168.1.101 255.255.255.0`

`siteB(config-if)#no shut`

`siteB(config)#interface loopback 1`

`siteB(config-if)#ip address 20.20.20.1 255.255.255.0`

`%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up`

`%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0,` 

`changed state to up`

`siteB(config)#router bgp 200`

`siteB(config-router)#neighbor 192.168.1.100 remote-as 100`

`siteB(config-router)#%BGP-5-ADJCHANGE: neighbor 192.168.1.100 Up`

`siteB(config-router)#neighbor 192.168.1.101 password cisco123`

`siteB(config-router)#network 20.20.20.1 mask 255.255.255.0`


### Verification:-

When BGP is configured with MD5 & neighborship is formed, then it implies that authentication is working perfectly, otherwise neighborship won’t be formed & you will be able to ping another end network.
`$ sqlplus system/[system password] \`
`@$AU_TOP/patch/115/sql/auclondb.sql 12`

### `siteA#sh ip bgp summary` 
`BGP router identifier 10.10.10.1, local AS number 100`

`BGP table version is 5, main routing table version 6`

`2 network entries using 264 bytes of memory`

`2 path entries using 104 bytes of memory`

`1/1 BGP path/bestpath attribute entries using 184 bytes of memory`

`2 BGP AS-PATH entries using 48 bytes of memory`


`0 BGP route-map cache entries using 0 bytes of memory`

`0 BGP filter-list cache entries using 0 bytes of memory`

`Bitfield cache entries: current 1 (at peak 1) using 32 bytes of memory`

`BGP using 632 total bytes of memory`

`BGP activity 2/0 prefixes, 2/0 paths, scan interval 60 secs`

`Neighbor V AS MsgRcvd MsgSent TblVer InQ OutQ Up/Down State/PfxRcd`
`192.168.1.101 4 200 73 72 5 0 0 00:48:41 4`

### siteA#ping 192.168.1.101

Type escape sequence to abort.
`Sending 5, 100-byte ICMP Echos to 192.168.1.101, timeout is 2 seconds:`
`!!!!!`
`Success rate is 100 percent (5/5), round-trip min/avg/max = 0/0/1 ms`

   ### siteA#ping 20.20.20.1
   Type escape sequence to abort.
`Sending 5, 100-byte ICMP Echos to 20.20.20.1, timeout is 2 seconds:`
`!!!!!`
`Success rate is 100 percent (5/5), round-trip min/avg/max = 0/0/1 ms`

   ### siteB#sh ip bgp summary 
`BGP router identifier 20.20.20.1, local AS number 200`

`BGP table version is 6, main routing table version 6`

`2 network entries using 264 bytes of memory`

`2 path entries using 104 bytes of memory`

`1/1 BGP path/bestpath attribute entries using 184 bytes of memory`

`2 BGP AS-PATH entries using 48 bytes of memory`

`0 BGP route-map cache entries using 0 bytes of memory`

`0 BGP filter-list cache entries using 0 bytes of memory`

`Bitfield cache entries: current 1 (at peak 1) using 32 bytes of memory`

`BGP using 632 total bytes of memory`

`BGP activity 2/0 prefixes, 2/0 paths, scan interval 60 secs`

`Neighbor V AS MsgRcvd MsgSent TblVer InQ OutQ Up/Down State/PfxRcd`

`192.168.1.100 4 100 79 75 6 0 0 00:51:10 4`

### siteB#ping 192.168.1.100
Type escape sequence to abort.
`Sending 5, 100-byte ICMP Echos to 192.168.1.100, timeout is 2 seconds:`
`!!!!!`
`Success rate is 100 percent (5/5), round-trip min/avg/max = 0/0/1 ms`

### siteB#ping 10.10.10.1

Type escape sequence to abort.
`Sending 5, 100-byte ICMP Echos to 10.10.10.1, timeout is 2 seconds:`
`!!!!!`
`Success rate is 100 percent (5/5), round-trip min/avg/max = 0/0/1 ms`

### Troubleshooting:-

Peering succeeds only if both routers are configured for authentication and have the same password.
If a router has a password configured for a neighbor, but the neighbor router does not, then the following message is  displayed on the console while the routers attempt to establish a BGP session between them:

### `%TCP-6-BADAUTH: No MD5 digest from [peer's IP address]:11003 to`
` [local router's IP address]:179`

Similarly, if the two routers have different passwords configured, the following message will pop on the screen:

`%TCP-6-BADAUTH: Invalid MD5 digest from [peer's IP`
 `address]:11004 to [local router's IP address]`

### _Conclusion_ 
By following the above steps, you can easily configure BGP with the MD5 authentication. 
However, you should always implement other security & compliance mechanisms as a layered structure to strengthen the overall network security.



<a class="cta purple" id="cta" href="https://www.rackspace.com/security/network-security">Learn about Rackspace Network Security.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/security/cloud-native-security"> Learn about Rackspace Cloud Native Security.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
