---
layout: post
title: "How Rackspace uses CloudEndure to accelerate workload migration to AWS: Part Two"
date: 2021-01-11
comments: true
author: Alan Day
authorAvatar: 'https://secure.gravatar.com/avatar/0dc361f321c2930e25867da99636b17a'
bio: "As an experienced and results-driven IT Professional with 19 years' experience within
both the public and private sectors, I draw on competencies and expertise spanning multiple
platforms and configurations related to pre-sales, consultancy, architecture & design,
implementation, and configuration. I love being outdoors and walking the dog each day to
rack up the miles and keep fit. I'm passionate about cooking and spend much of my free time
researching recipes from around the world. Some dishes are more successful than others after
translation to the plate, but it's always a good night!"
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "How Rackspace uses CloudEndure to accelerate workload migration to AWS: Part Two"
metaDescription: "If you haven't read
[Part One](https://docs.rackspace.com/blog/how-rackspace-uses-cloudendure-to-accelerate-workload-migration-to-aws-part-one/),
of this series, take a look before reading this post. In this concluding
installment, I describe the AWS Transit Gateway and AWS Client VPN configuration."
ogTitle: "How Rackspace uses CloudEndure to accelerate workload migration to AWS: Part Two"
ogDescription: "If you haven't read
[Part One](https://docs.rackspace.com/blog/how-rackspace-uses-cloudendure-to-accelerate-workload-migration-to-aws-part-one/),
of this series, take a look before reading this post. In this concluding
installment, I describe the AWS Transit Gateway and AWS Client VPN configuration."
slug: "how-rackspace-uses-cloudendure-to-accelerate-workload-migration-to-aws-part-two"

---

If you haven't read [Part One](https://docs.rackspace.com/blog/how-rackspace-uses-cloudendure-to-accelerate-workload-migration-to-aws-part-one/),
of this series, take a look before reading this post. In this concluding
installment, I describe the AWS Transit Gateway and AWS Client VPN configuration.

<!--more-->

### AWS Transit Gateway configuration 

Rackspace automates much of the infrastructure creation, but the following sections describe
the main AWS services’ configuration included in this post. Refer to
[AWS documentation]( https://docs.aws.amazon.com/) for detailed instructions.

Within the Transit Gateway console,
[create a new Transit Gateway]( https://docs.aws.amazon.com/vpc/latest/tgw/tgw-getting-started.html).
Make sure to allow the **Auto accept shared attachments** option to enable cross-account
attachments. 

{{<img src="Picture1.png" title="" alt="">}}

In this example, I use AWS Direct Connect, so I created a Direct Connect Gateway
[associated with Transit Gateway]( https://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-transit-gateways.html).
This allows IP connectivity between AWS and the on-premises data center.

{{<img src="Picture2.png" title="" alt="">}}

To allow VPCs from external AWS accounts to attach to Transit Gateway, I created a Transit
Gateway Resource share by using Resource Access Manager (RAM).

#### Steps to configure Transit Gateway

You need to take three steps to allow Transit Gateway Attachments from external accounts
to complete successfully:

1. Create a [resource share]( https://docs.aws.amazon.com/vpc/latest/tgw/tgw-transit-gateways.html#tgw-sharing)
   for Transit Gateway within RAM. Add external account IDs to allow successful cross-account
   attachment to the Transit Gateway.

{{<img src="Picture3.png" title="" alt="">}}

2. Accept the Transit Gateway Share in all external accounts by navigating to the RAM
   console and accepting the resource share. 

{{<img src="Picture4.png" title="" alt="">}}

3. Create a Transit Gateway attachment for each VPC that you need to connect to Transit
   Gateway. Make sure to select the newly available shared transit gateway.

{{<img src="Picture5.png" title="" alt="">}}
 
After the Transit Gateway configuration completes, you see all VPC attachments in the Transit
Gateway console along with the attachment to Direct Connect Gateway. 

{{<img src="Picture6.png" title="" alt="">}}

With route propagation enabled for Transit Gateway, you also see routes to each connected
network. 

{{<img src="Picture7.png" title="" alt="">}}

Finally, you must add routes to the route tables for each VPC attached to the Transit
Gateway. This action ensures that each VPC knows to send traffic designed for other
attached VPCs to the Transit Gateway. 

Traffic arriving at a VPC that does not have the relevant return routes configured tries
to return via the default route and ultimately gets dropped. In the following example,
this is the NAT Gateway.

{{<img src="Picture8.png" title="" alt="">}}

### AWS Client VPN configuration

AWS VPN users can traverse different networks connected through AWS Transit Gateway if
authorized to do so. If you add users to groups within AWS Directory Services, you
authorize them to access specific networks through the configuration of AWS Client VPN.
You can configure authentication through Active Directory, mutual (certificate-based), and
SSO through SAML-Based federated authentication. The remainder of this post focuses on
providing authorization via Active Directory group membership.

#### Prepare for the Client VPN

I have detailed the main steps to set up AWS Client VPN in this section. Refer to
[AWS documentation]( https://docs.aws.amazon.com/) for detailed instructions.

1. To start, create a new AWS Simple AD. You can use an existing AWS AD or an on-premises
   Active Directory by configuring an AD Connector. I like to use AWS Simple AD to keep
   identities separate and secure. After you do this, create a new Client VPN Endpoint.

{{<img src="Picture9.png" title="" alt="">}}

2. AWS Client VPN needs at least one target network association to enable clients to
   connect to it and establish a VPN connection. All subnet associations must be from the
   VPC you selected during setup. If you did not select a VPC during setup, you can select
   any VPC in your account, but all subsequent subnet associations must then come from that
   VPC. 

{{<img src="Picture10.png" title="" alt="">}}

3. Grant VPN users access to remote networks by creating authorizations. As a best practice,
   have an authorization rule for each network to which you want to grant access. The
   following example shows access granted to different networks based on Active Directory
   group membership. Rackspace migration engineers can access only the VPC housing the
   CloudEndure project and the source migration data center. In contrast, Internal IT staff
   can access only the source data center and the migration target VPC. Allowing VPN users
   access to all networks has been denied in favor of more granular AD group membership
   control.

{{<img src="Picture11.png" title="" alt="">}}

##### About Group ID and the route table

Group ID is the security identifier (SID) of the Active Directory groups authorized to
access a given network. It’s important when using Active Directory groups to add the security
identifier (SID) of the Active Directory group to make sure
[authorization ](https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-working-rules.html)
is operational.
 
The AWS Client VPN route table provides routes to each of the destination networks available
in the solution. In this example, we can see the following routes.

- **Default Route**: Created automatically by AWS when we associate subnets from the VPC
  that Client VPC is associated with.

- **Route to Datacentre**: Added manually to provide access to the source data center. The
  route goes via AWS Transit Gateway.

- **Migration Target VPC**: Added manually to provide access to the migration target network.
  This route goes via AWS Transit Gateway if it is external to the VPC associated with AWS
  Client VPC.

{{<img src="Picture12.png" title="" alt="">}}

When adding a new route, we use the subnets associated with the VPC selected during the
Client VPN endpoint creation (Step3) as the next hop. Network packets are then routed via
the VPC router to the Transit Gateway.

#### Configure the Client VPN

For redundancy, I have created two routes for each destination by using subnets from both
zones of the associated VPC attached to Client VPN endpoint 

The AWS VPN client is free to download. To connect to the AWS Client VPN service, use the
following steps to get up and running:

1.	Download and install AWS VPN client software from AWS.

{{<img src="Picture13.png" title="" alt="">}}

2.	Download the AWS Client VPN configuration from the Client VPN endpoint console.

{{<img src="Picture14.png" title="" alt="">}}

3.	Import AWS Client VPN configuration into the Client software

{{<img src="Picture15.png" title="" alt="">}}

4.	Log in to AWS Client VPN with a user who belongs to an authorised AD Group.

{{<img src="Picture16.png" title="" alt="">}}

Administrative access to compute resources becomes much more flexible, allowing you to work
from the office or home. After you connect, you have IP connectivity from your local
workstation to any network connected to Transit Gateway. You can transfer files between
connected networks and log on to the console of any compute instances for which you are
authorized.  

### Summary

At Rackspace, our Professional Services teams wrap governance and process around a migration
into AWS. Through clear project management, we make sure to migrate applications into AWS
in the right order according to business goals and objectives. 

Rackspace migration engineers will set up and configure AWS CloudEndure Migration on your
behalf, setting up replication from the source data center into the relevant CloudEndure
project within AWS. Rackspace architects design target VPCs to include complimentary AWS
services, such as load balancing, caching, or managed database services. Then, Rackspace
engineers deploy the target VPCs, and they are ready to receive replicated workloads. 

To learn more about how
[Rackspace Professional services](https://www.rackspace.com/en-gb/professional-services/migrations)
can assist with your business challenges related to digital transformation, migration, and
application modernization, visit our website.

<a class="cta teal" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.

#### Related documentation

- [AWS Transit Gateway]( https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html)
- [AWS Client VPN]( https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html)
- [AWS Directory Services]( https://docs.aws.amazon.com/directoryservice/latest/admin-guide/what_is.html)
- [AWS Direct Connect](https://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-gateways-intro.html)
