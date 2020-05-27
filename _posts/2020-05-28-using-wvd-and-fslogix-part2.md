---
layout: post
title: "Using Windows Virtual Desktop and FSLogix to accelerate working from home: Part 2"
date: 2020-05-28 00:01
comments: true
author: RAX Productivity Team
published: true
authorIsRacker: true
bio: "Rackspace's Microsoft® Productivity Solutions team provides best practice
solutions and expertise for complex problems spanning the Microsoft Windows
ecosystem to include Identity, Remote Work, Productivity and Collaboration. Our
team of Microsoft®-certified experts with over 20+ years of experience helps
customers choose, deploy and manage the best option to meet their unique business
needs."
categories:
    - General
metaTitle: "Using Windows Virtual Desktop and FSLogix to accelerate working from home: Part 2"
metaDescription: "The events unfolding in 2020 accelerated the adoption of remote work in ways no
one could have predicted. Consider WVD."
ogTitle: "Using Windows Virtual Desktop and FSLogix to accelerate working from home: Part 2"
ogDescription: "The events unfolding in 2020 accelerated the adoption of remote work in ways no
one could have predicted. Consider WVD."
---

This is part two of a two-part blog series on the ways Windows® Virtual Desktop
(WVD)  solves for work anywhere scenarios and provides some important
considerations for deploying the new service.

See [Part one](https://developer.rackspace.com/blog/2020-05-28-using-wvd-and-fslogix-part2)
to see how the story begins.

<!-- more -->

### Typical WVD architecture with FSLogix Profile Containers

Microsoft&reg; acquired FSLogix to provide, for any WVD-Licensed customer, the
optimum Windows 10 multi-session experience. The following diagram and
accompanying descriptions depict the flow of user logon in an environment by using
FSLogix with the Profile Container feature, redirecting the profile to an Server
Message Block (SMB) share on Azure&reg; NetApp&reg; files. By placing the contents
of the user's profile in a remote virtual hard disk (VHD), user profiles can be
mounted instantly regardless of their size, and the user doesn’t notice changes
to their profile if they move between hosts when they log off and back on.

![]({% asset_path 2020-05-28-using-wvd-and-fslogix-part1-and-2/Picture4.png %})

1.	**Client connection**: The client connects to a Remote Desktop Gateway service
   at [https://rdweb.wvd.microsoft.com](https://rdweb.wvd.microsoft.com).

2.	**WVD control plane**: The WVD control plane uses Microsoft Identity Provider
   in Azure Active Directory (AAD), allowing it to make use of advanced
   conditional access configurations. The access token granted at this level
   allows access only through the WVD gateway and does not yet authenticate to
   the local domain.

3.	**WVD session host**: The WVD agents running on the session hosts maintain a
   reverse-connect connection to the control plane. Using reverse-connect means
   that there are no special port requirements from either the client or session
   host, and the result is a much more reliable connection. One downside to this
   approach is some added network latency required for the HTTPS encapsulation.

4.	**Authentication**: After connecting through the Remote Desktop gateway, the
   client must authenticate with the local AD domain resulting in a second prompt
   for credentials. The credentials can be saved in the client to provide convenience.

5.	**FSLogix user profile storage**: After the Remote Desktop session connects,
   the FSLogix service on the session host mounts a VHD on a remote SMB share
   and uses Filter Driver technology to redirect IO operations for the user's
   profile to the VHD. FSLogix creates the VHD by using the user's local domain
   credentials, utilizing built-in NTFS permissions.

6.	**Azure AD Connect**: The diagram shows Azure AD Connect as an Azure virtual
   machine (VM) in this diagram, but it can live anywhere that has network access
   to both AD Domain Controllers and Azure cloud APIs. If you’re adding AD Connect
   for the purposes of WVD, and you’re already using other Office 365 services,
   be aware that this makes your hybrid cloud objects read-only for many
   management tasks. More on that later.

#### FSLogix Profile Containers

FSLogix Profile Containers utilize an SMB endpoint to create and mount VHDs for
each user profile. You must select a storage backend in Azure for this purpose.
The Microsoft documentation site has an
[excellent article](https://docs.microsoft.com/en-us/azure/virtual-desktop/fslogix-containers-azure-files)
on the different options available for storing FSLogix Profile Containers.
Rackspace has had great success in implementing Azure NetApp files for this
purpose, and it has become our preferred deployment.

Even though FSLogix Profile Containers solves a lot of the complexities with a
VDI deployment, there are still many customizations and operational
considerations to account for.

#### VHD sizing

One of the biggest considerations when deploying FSLogix is how large do the
Profile Containers need to be. By default, FSLogix virtual disks are dynamic
and have a maximum size of 30 GB. This means that when your user first logs in,
their VHD takes up roughly 500 MB, and you can expect to have their profile grow
over time. If you set your maximum dynamic size too low, users can fill up the
VHD and see errors in applications. In order to recover from a full VHD, you
must disconnect the user, remotely mount the VHD, and use disk utilities to
extend the dynamic disk and partition.

#### NTFS permissions

FSLogix creates the folder and VHD, or mount one if it exists, by using the
user’s credentials when they connect. When you create the file share for FSLogix,
make sure to modify the default
[NTFS permissions](https://docs.microsoft.com/en-us/fslogix/fslogix-storage-config-ht)
so that the **Everyone** group doesn’t have access to all contents by default.
The permission model Microsoft provides allows users to create these items, and
then have the permissions to read or modify the items they create.

#### Bypassing FSLogix Containers

When FSLogix is installed, some local groups are created that direct which users
are included or excluded from the Office and Profile Containers. We recommend
adding the imaging user to the exclude group so that if there is an issue with
the FSLogix configuration, you can still log in.

The built-in groups are FSLogix ODFC Exclude List, FSLogix ODFC Include List,
FSLogix Profile Exclude List, and FSLogix Profile Include List. All users are
added to the FSLogix Profile Include List by default. If a user is both in the
Include and Exclude lists, the exclude permissions takes precedence.

#### Cleaning up unused disk space

FSLogix takes care of provisioning the VHDs for you, but there is no system that
is responsible for the following operational tasks. We recommend that you
carefully plan your profile management strategy and  remove VHDs of separated
employees.

#### Other FSLogix features

Per Microsoft, FSLogix is a set of solutions that enhance, enable, and simplify
non-persistent Windows computing environments. This article is focused heavily
on the Profile Container functionality of FSLogix, but that’s far from the only
useful feature provided by the tool. FSLogix solutions include:

- **Profile Containers**: Redirect user profile contents to a remotely attached
  VHD, providing portability for user sessions.

- **Office Containers**: The Profile Container normally contains the portion of
  the user profile that contains Microsoft Office data. If you have a requirement
  to redirect Office file operations to a separate VHD, then this feature helps.

- **ikuytApplication containers**: Redirect an application’s folder contents to
  a remotely attached VHD. FSLogix dynamically attaches the VHD when the folder
  is accessed.

- **File and directory redirection**: You can configure redirection rules to
  automatically redirect IO operations for one path to another path.

- **Application masking**: Install more applications on a single image, and hide
  the applications from all but a specific allowed group.

- **Java version masking**: If you have applications that require varying versions
  of Java&ref;, you can create rules to only provide the old version of Java to
  that application.

### Common misconceptions, potential pitfalls, and good things to know

Now that you have a good idea of the user experience that you can provide users
with WVD, let’s talk about some of the finer details of a WVD implementation that
can drive up complexity and cost of ownership over time.

#### Backups and disaster recovery

Every organization has different compliance, high availability, and disaster
recovery requirements. It isn't a question of whether you should back up your
VDI solution, but which components require backing up.

- Depending on your implementation of FSLogix and other advanced features, you
  can eliminate the need to back up the session hosts, and they can be treated
  as disposable.

- Consider backing up Personal Desktop session hosts. One solution available in Azure is to configure backups for the VMs and configure cross-region copies for redundancy.

- Depending on your FSLogix Profile Container storage solution, you can back up the SMB share content and VHDs to a different location.

#### No autoscaling by default

One of WVD's appeals is the ability to quickly scale your virtual machines in
the cloud when the need arises, but this isn't a feature that is automatically
enabled or configured with Microsoft's tools. The Spring Update doesn't address
this. To solve this gap, Microsoft does offer a scaling tool as a low-cost
automation option for customers to optimize their utilization and costs.

As mentioned in the Microsoft documentation, you can use the scaling tool to:

- Schedule VMs to start and stop based on peak and off-peak business hours.

- Scale out VMs based on the number of sessions per CPU core.

- Scale in VMs during off-peak hours, leaving the minimum number of session host VMs running.

The scaling tool uses a combination of Azure Automation PowerShell&reg; runbooks,
webhooks, and Azure Logic Apps to function. When the tool runs, Azure Logic Apps
calls a webhook to start the Azure Automation runbook. The runbook then creates
a job. For more details, check out the
[Scale session hosts using Azure Automation](https://docs.microsoft.com/en-us/azure/virtual-desktop/virtual-desktop-fall-2019/set-up-scaling-script)
Microsoft article.

#### Implementing both Remote Desktop and app virtualization

As mentioned in the app virtualization section, by default, a user is assigned
to the default Desktop Application group. One obscure limitation is that users
can only have one app group assigned per host pool. For example, if the user is
assigned the Desktop Application group in host pool A, that same user cannot be
assigned a remote app group in host pool A. You need to remove the Desktop
Application group and then assign the remote app group.

However, if the user needs to have both the Desktop Application group and a
remote app group assigned, you need to create another host pool B and assign the
remote app group to the user, so the user has the Desktop Application group
assigned in host pool A and the remote app group assigned in host pool B.

#### Anti-virus and malware

Some anti-virus and malware can cause issues with images and VMs. We have seen
issues where including the AV agent into the image causes problems with launching
the image post-sysprep. We recommend checking with your vendor for instructions
to install their agent on the WVD image before Sysprep runs. One other option
is deploying the agent with a script or management tool post bootup of each WVD
instance to avoid issues with imaging.

Microsoft has recently released a preview version of Microsoft Defender for
Windows 10 Enterprise multi-session. More details can be found at
[Microsoft Defender ATP now in preview on Windows 10 Enterprise multi-session](https://techcommunity.microsoft.com/t5/windows-virtual-desktop/microsoft-defender-atp-now-in-preview-on-windows-10-enterprise/m-p/1372007).

#### Networking

We suggest placing a domain controller in the same virtual network (VNET) or
resource group as the WVD deployment to facilitate faster and more responsive
logon times. This is especially important for the Azure NetApp files that use a
delegated subnet and need a domain controller with which to authenticate.

#### Image management

Most organizations already have a patch-management solution, and you may be wondering why you need to make modifications to your image and relaunch the host pool when you could use existing tools. Outside of Windows patches, you need to make sure that the FSLogix agent and the RDS agent and bootloader are kept up-to-date. We recommend updating your image once per month after patches are released by Microsoft in order to provide the best and most secure WVD experience. If you can address these items using existing tools, then you might avoid the need for re-deploying your host pool regularly.

For each image revision, we recommend that you create a snapshot of the disk
(essentially a backup) before running sysprep, because the imaging process renders
the VM unusable. You can take a snapshot of a disk by locating the disk for the
VM and clicking on snapshot. The snapshot is required in addition to an image
because too many sysprep operations (three) on the same image can cause Windows
to no longer activate through the out-of-box experience and you have to reset
the count and rearm the image.

After taking the snapshot, you start the imaging VM and run the **sysprep.exe**
command to generalize and shut down the VM. Creating an image of the VM in Azure
makes the instance unusable, and the VM is deleted after you complete this operation.

#### Exclusion tags during image creation

Rackspace customers that have Aviator monitoring agent extensions can run into
issues during image creation. Use exclusion tags below when creating your imaging
host to avoid this issue.

**Name**: RaxAutomation|Exclude
**Value**: Monitoring,Passport,Antimalware

![]({% asset_path 2020-05-28-using-wvd-and-fslogix-part1-and-2/Picture5.png %})

#### Exchange attribute synchronization considerations

If you are looking to implement WVD but don't have an AD synchronized using
ADConnect, you want to ensure you have an Exchange management server set up as
well. ADConnect becomes the source of authority for managing your users. This
includes the attributes associated with it after ADConnect is configured. An
Exchange management server is needed to extend the schema and allow these Exchange
attributes to be managed.

### Azure Active Directory

Currently WVD requires an on-premises AD installation with AAD Connect to manage
your user’s identities. WVD session hosts must be joined a traditional AD domain
in which the user objects exist.

Microsoft has stated they plan to have an AAD (cloud only) option available. They
hope to have it available by the end of 2020.

### Conclusion

WVD, built on industry leading cloud technologies and powered by Azure
infrastructure, provides rapid deployment, low upfront costs, and a scalable
solution that can expand to meet sudden demand. WVD isn't just a one-size-fits-all
solution and offers options, such as multi-session desktop, personal desktop,
and app virtualization, to meet your user's needs. WVD provides secure
authentications with AAD and can take advantage of a rich set of security
features such as multi-factor authentication and conditional access policies.
To get the best users experience, WVD utilizes FSLogix to provide customizable
options for giving your users a secure and familiar Windows 10 desktop experience
with "like-local" performance. This product is a game changer.

Rackspace’s Professional Services team works with your organization to assess,
design, transform, manage, and optimize, leveraging cloud architecture best
practices, to help you get the most out of your Work Anywhere Solution. Rackspace
identifies areas of opportunity and makes recommendations for the best path to
help you get your remote workforce up and running quickly. Certified Azure
architects design, build, and deploy your Azure cloud infrastructure to meet
your specific requirements for governance, operational processes, and security.
Microsoft Certified engineers build and deploy the WVD solution and guide you
through piloting and adopting these new technologies.

Microsoft is continuously working to improve this product and Rackspace will
continue sharing tips and tricks on how to effectively use Windows Virtual
Desktop in your organization.

Use the Feedback tab to make any comments or ask questions. You can also
[chat now](https://www.rackspace.com/#chat) to start the conversation.

<a class="cta teal" id="cta" href="https://www.rackspace.com/lp/work-anywhere-solution-microsoft-offer">Learn more about the Microsoft Work Anywhere solution.</a>
