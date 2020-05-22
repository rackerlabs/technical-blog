---
layout: post
title: "OCI for disaster recovery and non-production instances"
date: 2020-05-26 00:01
comments: true
author: Shyamal Shah
published: true
authorIsRacker: true
categories:
    - Oracle
    - database
metaTitle: "OCI for disaster recovery and non-production instances"
metaDescription: "Undoubtedly, you're looking for ways to reduce capital expenses
while still doing everything you can to keep your data secure. If so, consider
the Rackspace public cloud offerings and Oracle Cloud Infrastructure&reg; (OCI)
as the perfect fit to host your Oracle&reg; workload."
ogTitle: "OCI for disaster recovery and non-production instances"
ogDescription:  "Undoubtedly, you're looking for ways to reduce capital expenses
while still doing everything you can to keep your data secure. If so, consider
the Rackspace public cloud offerings and Oracle Cloud Infrastructure&reg; (OCI)
as the perfect fit to host your Oracle&reg; workload."
---

Undoubtedly, you're looking for ways to reduce capital expenses while still
doing everything you can to keep your data secure. If so, consider the Rackspace
public cloud offerings and Oracle Cloud Infrastructure&reg; (OCI) as the perfect
fit to host your Oracle&reg; workload.

<!-- more -->

You might still be hesitant to rely 100% on the public cloud, but you can migrate
your disaster recovery (DR) and non-production workload to OCI easily. This
migration reduces on-premises (on-prem) capital costs. Choose from various OCI
plans like *Pay As You Go* or *Monthly Flex* where you can accomplish the
following tasks:

- Control spend
- Shutdown non-production environments after hours
- Use a DR instance in OCI to refresh or clone non-production instances for
  faster performance

### OCI benefits

OCI offers the following benefits:

**Environment**:

- Keep Oracle E-Business Suite environment production on-prem.

- Set up your OCI environment, including a virtual cloud network (VCN), subnet,
  route tables, and various gateways.

- Create IP Security (IPSec) connections or FastConnect to connect with your
  on-prem network by using your customer-premises equipment.

- Create compute instances and use Database-as-a-Service (DBaaS) in OCI

**Backups and cloning**:

- Run `adpreclone` on database and application tiers on-prem.

- Take Recovery Manager (RMAN) backups of your database tier and use `tar` to
  save application tier backups.

- Provision file storage on a compute instance and share that storage with
  on-prem resources.

- Copy on-prem backups to file storage visible to the OCI environment.

- Extract the OCI application tier and use the Linux&reg; remote sync (`rsynch`)
  utility to keep it synchronized.

- Extract the database tier and set up an *Oracle Home Target*.

- Use RMAN to restore or recover backed-up databases and place the database in
  **recovery mode**.

- Send changes from on-prem production instances to the OCI DR site.

**Monitoring and testing**:

- Enable force logging on on-prem production environments.

- Set up and monitor changes applied to the OCI DR.

- Schedule and perform annual DR tests.

- Use the OCI DR site to perform routine clones of non-production environments.

### Smooth operations

Day-to-day smooth, efficient, and cost-effective operations have a lot of moving
parts. The Rackspace Application Services team has more than 20 Years of
experience serving customers, from a variety of industries, who use Oracle
E-Business Suite. We offer a 24x7x365 support model and can set up, run, and
maintain your OCI environment. We also set up your OCI DR site and migrate Oracle
E-Business Suite production or non-production instances from on-prem to OCI.

### Conclusion

When you let Rackspace take the many critical but routine DR tasks off your hands,
your team can focus exclusively on your unique business opportunities.

Take a look at the Oracle self-server
[OCI Cost Estimator](https://www.oracle.com/cloud/cost-estimator.html ) to see
the options.  Keep in mind that we can help you to set up budget notifications
to keep spending in check.  We generate daily cost and usage reports, which you
can access from the **OCI Console** under **Account Management**.

Use the Feedback tab to make any comments or ask questions. You can also
[chat now](https://www.rackspace.com/#chat) to start the conversation.

<a class="cta purple" id="cta" href="https://www.rackspace.com/dba-services">Learn more about Databases.</a>
