---
layout: post
title: "Using an Exchange Management Server with Office 365"
date: 2020-11-09
comments: true
author: Aaron Medrano
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "Using an Exchange Management Server with Office 365"
metaDescription: "You can manage users in Office 365 through many methods, but this brings
up the question: what is the best solution based on your current configuration and what you
need to manage."
ogTitle: "Using an Exchange Management Server with Office 365"
ogDescription: "You can manage users in Office 365 through many methods, but this brings
up the question: what is the best solution based on your current configuration and what you
need to manage."
slug: "using-an-exchange-management-server-with-office-365"

---

Microsoft Office 365&reg; offers a wide assortment of great features to improve productivity,
collaboration, improved security, device management, and so much more. For IT people, this
adds another layer of management, including how to manage those users. 

<!--more-->

**Note**: This post is specifically for companies using Exchange solely as a Management
server. It does not pertain to companies using a full Hybrid Exchange configuration with
on-premises Exchange and Office 365.

You can manage users in Office 365 through many methods, but this brings up the question:
what is the best solution based on your current configuration and what you need to manage?
Microsoft Azure&reg; Active Directory Connect (AAD Connect) is a great solution when you
need to use your on-premises Microsoft Active Directory with your Office 365 tenant.

When you enable AAD Connect for a tenant and synchronize a user from on-premises Microsoft
Active Directory, you must manage most of the attributes from on-premises because you can't
manage them from Exchange Online. There are third-party methods or ADSI Edit to manage these
attributes on-premises. Still, Microsoft states the supported hybrid method is to use an
Exchange Management server in addition to your Active Directory. You primarily use the
Exchange Management Server (EMS) to synchronize the Exchange attributes of your Active
Directory users by extending the schema in Active Directory and provide an interface to
manage these attributes easier (Exchange Admin Center). 

### What are some of the Exchange attributes syncing from On-Premise? 

Some Exchange attributes include the following:

- Alternate email addresses (proxy address)
- Primary SMTP address
- Hidden From Global Address List
- Custom Attributes
- Legacy Exchange DN
 
It's best practice to stand up an additional server (physical or virtual) to run EMS.
Luckily, this doesn't require the same amount of resources compared to Exchange servers
hosting actual production mailboxes. Using a lightweight VM and the Hybrid Configuration
with Office365 drastically reduces operational costs. EMS still requires Windows licensing
costs but does not require Exchange licensing as long as you are running Exchange Server
2013, 2016, and mailboxes are solely on your Office365 tenant. If you have any questions
on licensing, consult Microsoft or your licensing specialist for correct guidance.

### If you need another server for my Exchange Management Server, what are the server specifications?

The specification depend on the Exchange version, but we suggest using Exchange 2016
(Exchange 2019 isn't currently free) with the following specs:

- VM Minimum Specs
     - OS: Windows Server 2012 R2 or Server 2016. Server 2019 does not support Exchange 2016.
     - Processor cores: 4 recommended.
     - Memory: Between 12GB and 16GB.
     - Disk space: 100 GB recommended.
- Active Directory domain and forest functional level is 2008R2 or later
- Network
     - Server must be on the same network as the Active Directory Domain and a member of the
       domain.
     - Must be able to contact all of the domains in the forest on TCP port 389.

### Technical tidbits

Keep the following tech tidbits in mind:

- You need the Exchange Management server to extend the Active Directory Schema for the
  Exchange Attributes.
- Exchange users are displayed as 365 Mailbox/Remote Mailbox on-premises and will show up
  as Mailboxes in Office365.
- You can use the on-premises Exchange Server as a mail relay for your on-premises
  applications and devices, such as fax machines and printers, which send e-mails.

### Conclusion

Using an Exchange Management server in addition to your Microsoft Azure Active Directory
Connect is currently the best option for managing your Exchange Online users in Office 365.
You can manage your users much easier outside of ADSI Edit or other third-party tools with
the Exchange Admin Center GUI and Exchange Management Shell. While an on-premises Exchange
Management server has other benefits, such as mail relaying, this configuration does have
its flaws. Admins must pay the additional overhead infrastructure and Windows Server
licensing costs, and it requires additional knowledge of the on-premises Exchange, which
will become obsolete in the near future. Microsoft is looking to remove this requirement
in the future, but in the meantime, EMS is your best hybrid solution option for ease of use
and minimized costs. Looking further ahead, consider ditching on-premises identity management
and switching to Cloud-Only Identity and Access Management.

There are many advantages to cloud computing and cloud-based identity management. Check out
our article [Cloud Computing Advantages](https://www.rackspace.com/library/cloud-computing-advantages)
for more details.

Looking for a Hybrid Solution or switching to Cloud Only? Rackspace Technology's Office 365
Transformation Services are here to take the hard work off your plate in your transition to
Office 365. 

<a class="cta teal" id="cta" href="https://www.rackspace.com/resources/transformation-services-o365">Learn more about our Transformation Services for O365.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
