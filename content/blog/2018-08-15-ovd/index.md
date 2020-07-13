---
layout: post
title: "Oracle Virtual Directory: A view of LDAP solutions"
date: 2018-08-29
comments: true
author: Amit Raghuvanshi
published: true
authorIsRacker: true
categories:
    - General
---

Originally published by TriCore: May 11, 2017

There are many Lightweight Directory Access Protocol (LDAP) solutions
available for organizational single sign-on (SSO) and user management,
including Oracle&reg; Internet Directory (OID), Microsoft&reg; Active Directory
(AD), and many other systems. When you have multiple implementations, it can
be difficult to manage and use them all. In this blog post, you'll learn how
to create a view that you can use to manage all of your enterprise's LDAP
implementations.

<!--more-->


### Introduction

This blog post shares a cost-effective way to access and
manage all of your existing LDAP solutions through a view-like object. The
following image illustrates how to use Oracle Virtual Directory (OVD) to
create a view of all of the LDAP applications that an organization uses.

![A diagram showing how OVD fits into enterprise
architecture](picture1.png)

**Image Source**: [Oracle Fusion Middleware Administrator's Guide for Oracle
Virtual Directory, 11g Release 1
(11.1.1)](https://docs.oracle.com/cd/E25178_01/oid.1111/e10046/und_ovd.htm)

OVD simplifies management of multiple LDAP systems by creating a single
virtual view for accessing all enterprise sources. The main advantage of using
OVD is that it doesn’t require any changes to an existing structure on a
source. It also supports a diverse set of clients such as web applications and
portals. In addition, OVD can connect to directories, databases, and web
services, as shown in the following image.

![A diagram illustrating how OVD connects to many data
sources](picture2.png)

**Image Source**: [Oracle Fusion Middleware Administrator's Guide for Oracle
Virtual Directory, 11g Release 1
(11.1.1)](https://docs.oracle.com/cd/E25178_01/oid.1111/e10046/und_ovd.htm)

OVD provides Internet and industry-standard LDAP and Extensible Markup
Language (XML) views of existing enterprise identity information. It generates
these views without synchronizing or moving data from its native locations.
This capability accelerates application deployment and reduces costs by
eliminating the need to continually adapt those applications to a changing
identity landscape as user populations are added, changed, or removed.

OVD is a virtual directory that provides a view of several OIDs or ADs. All of
the data used through OVD is transparent to users. It appears as though the
data is coming from a single OID, which simplifies the management of multiple
OIDs and ADs in programs or other software such as Oracle Access Manager (OAM).

OVD generates views by creating adapters and using them to access the
underlying information from various original locations. OVD needs the
following information to create an adapter:

- The target distinguished name (DN), which must be kept in OVD
- The source host name
- The source OID or AD port
- The source DN, which must be mapped to the target DN

**Note**: You can define as many adapters as you want and connect them to
multiple OIDs and ADs simultaneously.

The following image provides an example of a common name (CN) definition for
the different organization units (OUs) that originate from different
LDAP sources.

![A flowchart showing how OVD's view behavior is
achieved](picture3.png)

### Define an adapter

To define an adapter, use the following steps:

1. Launch the Oracle Directory Services Manager (ODSM) console by navigating
   to  `https://<Hostname>:7005/odsm` in your browser.
2. Connect to OVD on `<Hostname>:8899`. (The default port for OVD is `8899`.)
3. Select the **Adapter** tab.
4. Press the **New Adapter** button.
5. Create a new adapter named **OIDUsers**. For **Adapter Type**, select
   **LDAP**. Leave the default values in the other fields.
6. Provide the connection details for the source LDAP (in this case OID), such
   as the host, port, user name (server proxy Bind DN), and the password for
   accessing the source. In the following example, `127.0.0.1` is provided
   because both OID and OVD reside on the same host.
7. On the next screen, test the connection.
8. Provide the base OU for the source that needs to be synched. This is the
   *remote base*. Also provide the base OU for OVD. Leave the default values
   in the other fields.
9. Review all of the details on the summary page and click **Finish**.

![Screenshot of the New LDAP Adapter Summary
page](picture4.png)

When you use the adapter `ou=OIDUsers,dc=***,dc=ovd`, it automatically makes a
call to `cn=Users, dc=***,dc=oid` from the screen shown in the following image.

![A screenshot of the Connection Details for the
Adapter](picture5.png)

You can define these adapters for different versions of OIDs and ADs in a
similar way. This capability enables you to use the OVD as a single source of
data for different web services. As a result, OVD gives you a "virtual view"
without you having to program differently for each source of underlying data.

### Conclusion

OVD can help you use all of your existing LDAP solutions in a cost-effective
way. It creates a view-like structure that doesn't require any changes to the
existing layout of technologies that your organization uses. It easily connects
to diverse applications and databases.

Have you used OVD? Use the Feedback tab to make any comments or ask questions.
