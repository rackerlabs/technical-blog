---
layout: post
title: "Overview of IAM in Oracle Cloud Infrastructure"
date: 2020-02-25 00:01
comments: true
author: Dushyant Chauhan
published: true
authorIsRacker: true
categories:
    - Oracle
    - Database
metaTitle: "Overview of IAM in Oracle Cloud Infrastructure"
metaDescription: "This blog post introduces the Oracle&reg; Cloud Infrastructure (OCI) Identity and Access Management (IAM) components and shows some features that help you to manage Oracle cloud resources."
ogTitle: "Overview of IAM in Oracle Cloud Infrastructure"
ogDescription: "This blog post introduces the Oracle&reg; Cloud Infrastructure (OCI) Identity and Access Management (IAM) components and shows some features that help you to manage Oracle cloud resources."
---

This blog post introduces the Oracle&reg; Cloud Infrastructure (OCI) Identity
and Access Management (IAM) components and shows some features that help you to
manage Oracle cloud resources.

<!-- more -->

It identifies the types of access for specific resources that you can assign to
a group of users and how you can federate OCI with Oracle Identity Cloud Service
(IDCS).

### Components of IAM

IAM includes the following components:

- **RESOURCE**: A resource is an object created in OCI, such as Compute
  instances, blocks, virtual cloud networks (VCNs), and subnets.

- **USER**: Assign users to a group that provides limited privileges and access
  to OCI resources according to the tenancy and compartment policies for the
  group.

- **GROUP**: A group is a collection of users that have access to the same OCI
  resources. A user can be a member of one or more groups.

- **DYNAMIC GROUP**: Dynamic groups provide security and enable you to manage
  keys on the client-side rather than the server-side.  A dynamic group can link
  specific instances in the compartment. You can assign a policy to a dynamic
  group to provide access to a specific instance to access through an application
  programmer interface (API).

- **COMPARTMENT**: A compartment is a global logical container where you can
  enforce the policies and provide control access to Compute, Storage, Network,
  Load Balancer, and other resources. For example, you can use a policy to
  restrict users, other than administrators, from using the resources created
  in that compartment.

- **TENANCY**: A tenancy is the default root compartment and contains all OCI
  resources. Within the tenancy, administrators can create one or more
  compartments, users, and groups.  The administrators can then assign policies
  that allow groups to use resources within a compartment.

- **POLICY**:  Policies define who can access resources at group and compartment
  levels with the following access levels:

    - Inspect

    - Read

    - Use

    - Manage

- **REGION**: A region is a geographical location in which IAM resources reside.
  IAM service resources are global and can have a single tenancy across multiple
  regions. Oracle propagates changes made in the home region to all the regions.

- **FEDERATION**: Federation is a mechanism between two or more parties acting
  as an Identity Provider and Service Provider. It manages users and groups in
  the identity provider. IDCS provides federation for OCI by default.

### IAM resources

This section describes the source of resources, resource identifiers, and
resource limits.

#### Scope of resources

Because IAM defines resources as global, they are available across all the
regions and availability domain components.

#### Resource identifiers

An OCI resource uses a unique name (OCID) with the following syntax:

    ocid1.<RESOURCE TYPE>.<REALM>.[REGION][.FUTURE USE].<UNIQUE ID>

The placeholders of the OCID include the following elements:

- **ocid1**: OCID version.

- **Resource type**: The type of resources, such as instance, volume, VCN, subnet, user, or group.

- **realm**: The realm contains a set of regions and shares entities with
  availability domains. A realm can have the following values:

     - **oc1**: commercial realm
     - **oc2**: Government Cloud realm
     - **oc3**: Federal Government Cloud realm.

#### Resource limits

An IAM limit is the quota on IAM resources that controls the maximum number of
Compute instances in the availability domain.

To view the tenancy's limits and usage by region, perform the following steps:

1. Open the Console.
2. Open the User menu ( ) and click on Tenancy.
3. Click on Service Limits.

When an instance reaches the service limit for a specific resource, you can
submit a request to increase the service limit and create new resources as
needed.

To request a service limit increase, perform the following steps:

1. Open the **Help** menu, go to **Support**, and click
   **Request service limit increase**.

2. Enter the following details:

   - Primary contact details

   - Service category

   - Resource

   - Reason for the request

3. Click **Submit Request**.

### Federate with Identity Providers

OCI supports federation for the following components and Identity Providers:

-  IDCS

-  Microsoft Active Directory

-  Microsoft Azure Active Directory

-  Okta

-  Identity Providers that support Security Assertion Markup Language (SAML) 2.0 protocol

In the examples in this blog post, I use IDCS as the Identity Provider.

Perform the following steps to federate with IDCS:

#### Step 1: Get the required information from IDCS

1. Log in to the OCI IDCS console with admin privileges.

2. In the IDCS console, click **Applications**.

3. Click **COMPUTEBAREMETAL**.

4. Click **Configuration**.

5. Expand **General Information** to display the Client ID.

6. To see the Client Secret, click **Show Secret**.

7. Save the Client ID and the Client Secret.

#### Step 2: Add the identity provider in OCI

1. Sign in to the console with your OCI login credentials.

2. Open the **Governance and Administration** navigation menu and click
   **Identity -> Federation**.

3. Click **Add identity provider**.

4. Enter the following details:

   a. **Name**:  The name must be unique across all identity providers. Oracle
   adds the name to the tenancy, and you cannot modify it.

   b. Description: A clear description.

   c. IDCS Base URL: The resource URL.

   d. Client ID: The client identifier that you previously collected.

   e. Client secret: The client secret that you previously collected.

5. Click **Show Advanced Options** and enter the following details:

   a. **Encrypt Assertion**: Select the checkbox to enable encryption from the
   IDP. If you do not select this checkbox, you must set up encryption of the
   assertion in IDCS.

   b. **Tags**: You can also apply tags if you have permission to create a
   resource. To apply a defined tag, you must have permission to use the tag
   namespace.

6. Click **Continue**.

7. Define the mappings between IDCS groups and IAM groups in OCI. You can map
   IDCS groups to zero, one, or multiple IAM groups, and vice versa.

The Federation page now shows the identity provider in the tenancy list. Oracle
assigns the OCID to each group mapping.

#### Step 3: Set up the IAM policies for the groups

Follow your standard procedure to set up the IAM policies for the groups.

#### Step 4: Give the federated users the tenant and URL

Provide the federated users with the name of the tenant and the sign-in URL.
The URL should be similar to the following example:

    https://console.us-cshburn-1.oraclecloud.com

### Manage Identity Providers in the console

To delete an Identity Provider, perform the following steps:

1. Delete the Identity Provider from the tenancy.

   a. Open the **Governance and Administration** navigation menu and click
   **Identity -> Federation** to see the list of Identity Providers in the
   tenancy.

   b. Click on the Identity Provider that you want to delete to view its details.

   c. Click **Delete** and confirm.

2. Delete the tenancy from the IDCS account.

   a. Open the IDCS console and sign in to the federated account.

   b.  Click **Applications** to display the list of applications.

   c. Find the tenancy and click on its name to view the details page.

   d. Click **Deactivate** and confirm.

   e. Click **Remove** and confirm.

To add group mappings for IDCS, perform the following steps:

1. Open the **Governance and Administration** navigation menu and click
   **Identity** to display a list of the identity providers in the tenancy.

2. Click **Federation** and click on the IDCS federation name to view its details.

3. Click **Edit Provider Details**.

4. Add at least one mapping.

   a. Click on **+ Add Mapping**.

   b. Select an IDCS group from the **Identity Provider Group** list.

   c. Select the **IAM group** to get the list of OCI Groups.

   d. Select **New OCI Group** to create a new OCI group in IAM, rather than a
   new IAM group, and map the new OCI group to the IDP group.

5. Repeat Step 4 for each mapping and click **Submit** after you have added all
   the mappings.

To update or delete a group mapping, perform the following steps:

1. Open the **Governance and Administration** navigation menu and click
   **Identity -> Federation** to display the list of Identity Providers in
   the tenancy.

2. Click on an Identity Provider to see the details.

3. Click **Edit Mapping**.

4. Update the mappings or click on **X** to delete the mapping.

5. Click **Submit**.

### Conclusion

This blog post describes how different IAM components work together and how you
can federate multiple IDCS accounts with OCI.

Use the Feedback tab to make any comments or ask questions. You can also
[chat now](https://www.rackspace.com/#chat) to start the conversation.

<a class="cta red" id="cta" href="https://www.rackspace.com/dba-services">Learn more about our Database services</a>
