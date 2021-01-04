---
layout: post
title: "Implement Azure Bastion with VNET peering"
date: 2020-12-11
comments: true
author: Hitesh Vadgama
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-UD9LTRKFX-ddadc26195d0-192'
bio: "Hitesh is an Azure Solutions Architect at Rackspace, with broad experience working
with various customers across a multitude of industry verticals to help solve technical
problems and deliver fit-for-purpose solutions."
published: true
authorIsRacker: true
categories:
    - Azure
metaTitle: "Implement Azure Bastion with VNET peering"
metaDescription: "Microsoft has finally provided VNET peering support for Azure Bastion.
This offering has been a much-anticipated feature release, which I'm sure many folks are
happy to see available."
ogTitle: "Implement Azure Bastion with VNET peering"
ogDescription: "Microsoft has finally provided VNET peering support for Azure Bastion. This
offering has been a much-anticipated feature release, which I'm sure many folks are happy
to see available."
slug: "implement-azure-bastion-with-vnet-peering"

---

Microsoft&reg; has finally provided
[VNET peering support for Azure Bastion](https://docs.microsoft.com/en-us/azure/bastion/vnet-peering).
This offering has been a much-anticipated feature release, which I'm sure many folks are
happy to see available.

<!--more-->

### Introduction 

Before this release, Azure&reg; Bastion had an annoying limitation&mdash;it was not
transitive, so its scope did not extend beyond a single VNET. This meant if you had multiple
VNETs (which most environments typically do), then you'd need to deploy a Bastion in every
VNET that had VMs that you wanted to manage remotely. Fortunately, that's a thing of the past,
and this new capability makes the service more useful, cheaper, and less complicated. 
 
Microsoft has made both regional and global VNET peering available for Azure Bastion, so
you can deploy the service in a single VNET and peer with VNETs in any public region around
the world regardless of whether they are in the same subscription or not. This ability
unlocks the possibility of deploying the Bastion in a common hub-and-spoke topology like
the following design:
 
{{<img src="Picture1.png" title="" alt="">}}

*Source: [https://docs.microsoft.com/en-us/azure/bastion/vnet-peering#architecture](https://docs.microsoft.com/en-us/azure/bastion/vnet-peering#architecture)*

#### Wait, what's Azure Bastion?

For those of you who are new to the Azure Bastion service, I refer you to this
[Microsoft documentation](https://docs.microsoft.com/en-us/azure/bastion/bastion-overview),
which does a great job of providing an overview of the product and its purpose.

### Implementation walkthrough 

In this example walkthrough, I use the Azure portal to deploy a Bastion in a hub VNET and
show you the steps to successfully establish a connection through peering to target virtual
machines (VMs) that reside in spoke VNETs. We will have one target VM in the same region
as the Bastion and another Target VM in a different region.

#### Creation of target VMs in each spoke VNET

Because this walkthrough focuses on deploying the Bastion and making the relevant connections,
I won't bore you with VM creation instructions. Therefore, I have already deployed the
following in my subscription: 
 
Windows&reg; VM:

- **Name**: WindowsVM01
- **Region**: UK South
- **Public IP**: none
- **NSG**: WindowsVM01-nsg 
- **VNET**: UKS-VNET01-SPOKE01 (192.168.1.0/24)
- **Subnet**: UKS-VNET01-SPOKE01-SN01 (192.168.1.0/27)
  
Linux&reg; (Ubuntu operating system) VM:

- **Name**: LinuxVM01
- **Region**: East US
- **Public IP**: none
- **NSG**: LinuxVM01-nsg
- **VNET**: EUS-VNET01-SPOKE01 (192.169.1.0/24)
- **Subnet**: EUS-VNET01-SPOKE01-SN01 (192.169.1.0/27)
 
#### About the Network Security Groups (NSGs)

By default, Microsoft associates the NSG to the VM NIC. For ease of management, I prefer to
assign the NSGs to the subnet level instead. Therefore, I associated each respective NSG to
the corresponding subnet and disassociated it from the VM's NIC. The result is:
 
    WindowsVM01-nsg <-> UKS-VNET01-SPOKE01-SN01
    LinuxVM01-nsg <-> EUS-VNET01-SPOKE01-SN01

### Create the Bastion host

Use the following steps to go through this demo with me:

1. From the Azure home page, select **+ Create a resource**.
2. Type `Bastion`. On the **Results** page, you should see the Bastion icon (verify the
   publisher is Microsoft) and click **Create**.
3. On the **Create a Bastion** page, create or choose an existing resource group, give the
   Bastion a name (I called mine `AzBastion01`), and select a region (I selected `UK South`
   so it deploys in the same region as WindowsVM01).
4. For the VNET, I created a new one called **UKS-VNET02-HUB01**. The Azure Bastion subnet
   must be **/27** or larger, so I made the VNET big enough to accommodate this by choosing
   **192.168.2.0/24**.
5. For the Bastion subnet, Microsoft requires you to call it **AzureBastionSubnet** and
   make it at least /27, as mentioned already. I gave mine the following address:
   `192.168.2.0/27`. This subnet is a dedicated subnet for the Bastion only, meaning you
   deploy no other resources into it. 
 
{{<img src="Picture2.png" title="" alt="">}}
 
6. Azure automatically assigns a Standard Public IP to the Bastion and generates a name
   based on the VNET. I decided to change mine, so it's clearly assigned to the Azure Bastion. 
 
{{<img src="Picture3.png" title="" alt="">}}
 
7. Apply tags if required and then select **Review + create** and then **Create**.  
8. That's it for the Bastion resource creation part. Grab yourself a quick beverage while
   the resources deploy, which usually takes no more than five minutes. 
 
### Configure Network Security Group (NSG) rules

Because the Bastion is a managed service, Microsoft hardens it by default. However, NSGs
need to be applied to secure the subnet in which the Bastion host resides and apply the
correct level of network access to the Bastion subnet as well as the subnets in which the
target VMs reside so that the Bastion can connect to them successfully.
 
### Create and configure NSG rules on AzureBastionSubnet
 
9. First, create the NSG that associates to AzureBastionSubnet. From the Azure home page,
   click on **+ Create a resource**.
10. Type `network security group`, and on the results page, you should see the Network
    security group icon (verify the publisher is Microsoft). Go ahead and click **Create**.
11. On the **Create network security group** page, create or choose an existing resource
    group, give the NSG a name (I called mine `AzureBastionSubnet-nsg`), and select a region
    (I selected `UK South` so it deploys in the same region as the subnet I'm going to
    associate it to).
12. Apply tags if required, select **Review + create**, and then click **Create**.
 
{{<img src="Picture4.png" title="" alt="">}}
 
13. After you create the NSG, navigate to it and create the appropriate **inbound** rules.
    Click **Inbound security rules** under **Settings**. Notice three default rules from
    priority 65000-65500. You cannot delete these, but you can override them with rules
    that have a higher priority. Click **+Add** and create the following rules paying
    attention to the priority numbers:

    - **AllowHttpsInbound**: The Bastion public IP needs port 443 enabled for inbound
      traffic when you connect to it.
    - **AllowGatewayManagerInbound**: For control plane connectivity, you enable port 443
      inbound from GatewayManager. This enables the control plane (which essentially is
      Gateway Manager) to communicate to the Azure Bastion.
    - **AllowAzureLoadBalancerInbound**: For health probes to work, you enable port 443
      inbound from the AzureLoadBalancer to allow Azure Load Balancer to detect connectivity.
 
{{<img src="Picture5.png" title="" alt="">}}
 
14. Next, add the appropriate **outbound** rules. Click **Outbound security rules** under **Settings**. Notice three default rules from priority 65000-65500, and just like the Inbound default rules, you can't delete these, but you can override them. Click **+Add** and create the following rules paying attention to the priority numbers:

    - **AllowSshRdpOutbound**: The Bastion reaches the target VMs (WindowsVM01 and LinuxVM01)
      over private IP, so this rule is in place to allow outbound traffic to the VM's subnets
      on port 3389 and 22.
    - **AllowAzureCloudOutbound**: The Bastion needs to connect out to various public
      endpoints within Azure for things like writing data to Azure diagnostic logs, so this
      rule allows that access.  
 
{{<img src="Picture6.png" title="" alt="">}}
 
### Configure NSG rules on the target VM subnets 
 
15. As a reminder, the target VMs' subnets are **UKS-VNET01-SPOKE01-SN01** (where WindowsVM01
    resides) and **EUS-VNET01-SPOKE01-SN01** (where LinuxVM01 resides). When I created the
    VMs, default NSGs already existed, and I reassigned them to the corresponding subnets.
    I now need to go to each subnet's NSG and add the appropriate rule to each. I need to
    add only one **inbound** rule to each NSG as per the following:

    - **AllowAzBastionSshRdpInbound**: The Bastion reaches the target VMs over private IP
      using RDP/SSH, so I need to open ports 3389 and 22 on the subnets in which the target
      VMs reside. As a best practice, I added the Bastion Subnet IP address range as the
      **Source** in this rule to allow only the Bastion to be able to open these ports on
      the target VM in each subnet.
 
{{<img src="Picture7.png" title="" alt="">}}
 
### Configure peering between the Hub VNET and Spoke VNETs

Now, we need to configure peering between the Hub VNET where the Azure Bastion resides to
each of the Spoke VNETs where the target VMs reside so that traffic can flow. 
 
16. I start with peering the UKS-VNET02-HUB01 Hub VNET with UKS-VNET01-SPOKE01, where
    WindowsVM01 resides. Navigate to the **UKS-VNET02-HUB01** VNET, select **Peerings**
    under **Settings**, and click **+Add**. 
17. On the **Add Peering** page, start with the **This virtual network** section, meaning
    UKS-VNET02-HUB01 in this case, and make the following changes:

    - **Name**: `UKS-VNET02-HUB01-to-UKS-VNET01-SPOKE01`
    - Allow Traffic to the remote virtual network.
    - Block traffic that originates from outside this virtual network (I don't need to allow traffic forwarding).
    - Choose **None** for VNET Gateway.

18. For the **Remote virtual network** section, meaning UKS-VNET01-SPOKE01 in this case,
    make the following changes:

    - **Name**: `UKS-VNET01-SPOKE01-to-UKS-VNET02-HUB01`
    - Select **UKS-VNET01-SPOKE01** from the Virtual network dropdown.
    - Allow Traffic to the remote virtual network.
    - Block traffic that originates from outside this virtual network (I don't need to allow traffic forwarding).
    - Choose **None** for VNET Gateway.

19. After you click **Add**, Azure begins configuring peering connections on both of the
    VNETs, and you see a status like the following:

{{<img src="Picture8.png" title="" alt="">}}
 
20. After it completes, you can verify that the peering connection exists by checking that
    the **Peering** status is *Connected* for the peerings on both the VNETs.
 
{{<img src="Picture9.png" title="" alt="">}}
 
{{<img src="Picture10.png" title="" alt="">}}
 
21. I followed the same process used in steps 16-20 to configure peering between
    UKS-VNET02-HUB01 and the second spoke VNET EUS-VNET01-SPOKE01 where LinuxVM01 resides,
    but simply change the peering names accordingly. 
 
### Connect to the target VMs
 
If you set up everything correctly, then you should now be able to connect to each VM by
using the Bastion successfully. Let's give it a go!
 
22. I start with WindowsVM01, which resides in a spoke VNET in the same region (UK South)
    as the Hub VNET. I navigate to the VM resource and click on Connect and choose **Bastion**
    from the dropdown menu.
 
{{<img src="Picture11.png" title="" alt="">}}
 
23. Select **Use Bastion** and enter the username and password. Click **Connect**.
 
{{<img src="Picture12.png" title="" alt="">}}
 
24. The RDP connection to WindowsVM01 through the Bastion opens in a separate browser tab
    using port 443.
 
{{<img src="Picture13.png" title="" alt="">}}

25. Now, connect to LinuxVM01, which resides in a spoke VNET in a different region
    (East US) to the Hub VNET. I navigate to the VM and select **Bastion** as the connection
    method, just like I did for WindowsVM01. 
26. I enter my admin login credentials and click **Connect**. I used a username/password
    combination for this demo, but for a production setup, it's wise to use SSH keys.
 
{{<img src="Picture14.png" title="" alt="">}}
 
27. The SSH connection to LinuxVM01 via the Bastion opens in a separate browser tab using
    port 443.
 
{{<img src="Picture15.png" title="" alt="">}}

 ### Conclusion
 
This post provides steps on implementing Azure Bastion in a hub-and-spoke topology model
by using VNET peering and connecting to target VMs. This setup type allows you to centralize
the Bastion host and simplify your remote management solution for server administration
activities.

<a class="cta purple" id="cta" href="https://www.rackspace.com/cloud/azure">Learn more about our Azure services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
