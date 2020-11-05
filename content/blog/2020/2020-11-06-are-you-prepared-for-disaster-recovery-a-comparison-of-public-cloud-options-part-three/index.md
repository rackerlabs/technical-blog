---
layout: post
title: "Are you prepared for disaster recovery? A comparison of public cloud options&mdash;Part Three"
date: 2020-11-06
comments: true
author: Zahid Mustafa
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-UEX7ARXEH-c06eeae9a67c-192'
bio: "I'm a Cloud Solutions Architect with a proven track record of successful delivery.
With over 23 years industry experience, my client base has ranged from FTSE 100 companies
to large public sector bodies. This breadth of experience has enabled me to gain a skill
set covering the full life cycle from initial strategy, requirements planning, architecture
and system design through to post-production support. My experience includes Disaster
Recovery planning, design, and testing over many years, both on-premises and on public cloud."
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "Are you prepared for disaster recovery? A comparison of public cloud options&mdash;Part Three"
metaDescription: "This is part two of a three-part series explores disaster-recovery options, from models to
environments to public cloud offerings. Are you ready?"
ogTitle: "Are you prepared for disaster recovery? A comparison of public cloud options&mdash;Part Three"
ogDescription: "This is part two of a three-part series explores disaster-recovery options, from models to
environments to public cloud offerings. Are you ready?"
slug: "are-you-prepared-for-disaster-recovery-a-comparison-of-public-cloud-options-part-three"

---

This is part three of a three-part series explores disaster-recovery options, from models to
environments to public cloud offerings. Are you ready?

<!--more-->

This three-part series explores disaster-recovery options, from models to environments to
public cloud offerings. Are you ready?  If you haven't read them, check out
[Part One](https://docs.rackspace.com/blog/are-you-prepared-for-disaster-recovery-a-comparison-of-public-cloud-options-part-one/)
and
[Part Two](https://docs.rackspace.com/blog/are-you-prepared-for-disaster-recovery-a-comparison-of-public-cloud-options-part-two/).


### Amazon Web Services (AWS) disaster recovery features and services

AWS&reg; provides a [wide range of building blocks](https://aws.amazon.com/local/hongkong/solutions/backup-disaster-recovery/)
for creating advanced DR programs. Among them are the following products:

#### CloudEndure Disaster Recovery (DRaaS) 

AWS acquired [CloudEndure Disaster Recovery](https://aws.amazon.com/cloudendure-disaster-recovery/)
in January 2019 as its DRaaS solution. In January 2020, AWS announced an 80% price reduction
for CloudEndure and moved from contract-based to usage-based billing. This adjustment makes
CloudEndure comparable in price to Azure Site Recovery. 

CloudEdure DR capabilities include the following:

- Replicates workloads in a low-cost staging area in your secondary AWS region (this
  reduces compute costs and eliminates the need to pay for duplicate OS and third-party
  application licenses because you only pay for a fully provisioned workload in the event
  of a DR failover or test).
- Provides asynchronous, continuous replication.
- Replicates entire machines, including OS, system configuration, disks, applications,
  databases, and files.
- Protects most critical enterprise workloads, such as Oracle, SAP, SQL Server, and MySQL.
- Enables RPO of seconds and RTO of minutes within AWS (dependent on the latency and
  network speed between your source primary environment and your secondary DR environment).
- Enables automated machine orchestration and conversion.
- Offers a low-cost recovery solution.
- Supports usage for cloud migration.

#### Amazon Relational Database Service 

[Amazon Relational Database Service](https://aws.amazon.com/rds/) (RDS) is a managed
relational database service that provides familiar database engines, including MySQL&reg;,
Oracle&reg;, Microsoft&reg; SQL Server&reg;, AWS Aurora, and PostgreSQL&reg;. Its
capabilities in support of DR include the following:

- Handles database administration, such as backup, recovery, provisioning, patching, and
  monitoring for failures and repair.
- Easy and quick scaling for compute and storage.
- Automated, low-cost backups (single region only).
- Manual medium-cost, cross-region snapshots.
- Higher-cost, cross-regional read replicas, creating up to five read replicas per source
  DB instance in a separate physical region to protect against region failure (not available
  for SQL servers).
- Replicas might cause your primary instance to lag and impact your recovery, depending on
  the amount of traffic being replicated and the network latency between the source and
  destination regions.

#### Amazon S3 Glacier and S3 Glacier Deep Dive

[Amazon S3 Glacier and S3 Glacier Deep Dive](https://aws.amazon.com/glacier/) capabilities
in support of DR include the following:

- Designed for 99.999999999% durability, they offer reliable cloud storage locations for
  backup data.
- Unlimited capacity and no volume or media management required.
- Glacier offers a low-cost solution for storing archive data.

#### Amazon Route 53 

[Amazon Route 53 ](https://aws.amazon.com/route53/)capabilities in support of DR include
the following:

- A highly available and scalable Domain Name System (DNS).
- Health checks of resources created in specific regions, such as EC2 instances and EC2.
- Route 53 Traffic Flow provides routing of global traffic between zones and regions.

#### VM and native database replication

VM and native database replication capabilities with AWS in support of DR include the following:

- All major CSPs allow the use of native database replication features to replicate databases
  running an IaaS model from primary to secondary zones and regions.
- Common examples include Data Guard replication for Oracle&reg; databases or always-on
  availability groups for SQL Servers.

### Google Cloud Platform (GCP) disaster recovery features and services

GCP&reg; does not come with an official native DRaaS solution, but
[some third-party solutions](https://cloud.google.com/solutions/dr-scenarios-for-data) are
available. In May 2018, Google acquired Velostrata, which is used for VM cloud migrations
from on-premises to GCP. It works similarly to CloudEndure for AWS, but Google does not
officially tout it as a DR solution at this time. That position may change with time as it
did with CloudEndure. 

GCP provides a wide range of services for creating advanced DR programs, including the
following services:

#### Netapp Cloud Volumes ONTAP

Netapp&reg; [Cloud Volume ONTAP](https://docs.netapp.com/us-en/occm/task_getting_started_gcp.html)
is a third-party solution that can be used for DR with GCP by replicating storage between
on-premises data centers, public cloud zones, and global regions. Its capabilities in
support of DR include the following:

- Used for storage replication between on-premises, GCP, AWS, and Azure.
- Block-level data replication keeps the destination up-to-date through incremental updates.
- You can set synchronization schedules, such as every minute or every hour, to meet
  stringent RTOs and RPOs.
- Cost optimization possible through storage deduplication and compression features.

#### Cloud SQL

GCP [Cloud SQL](https://cloud.google.com/sql) capabilities support DR through:

- Fully managed DBaaS with a focus on administrative simplicity
- Cross-region replication allows you to create a secondary instance in a different region
  from the primary instance, with low RTO and RPO is achievable in minutes or seconds

#### Persistent disks and snapshot

GCP [persistent disks and snapshot ](https://cloud.google.com/persistent-disk) capabilities
support DR through:

- Taking snapshots or incremental backups of compute instances, which you can copy to other
  regions.
- Persistent disks can be zonal or regional, where regional disks replicate changes between
  two zones in a region.

#### Cloud storage 

GCP cloud storage capabilities support DR through:

- Storing backups.
- Infrequent access with Nearline, Coldline, and archive.
- Offering lower-cost storage compared to standard storage options.

#### Traffic Director

GCP [Traffic Director](https://cloud.google.com/traffic-director) capabilities support DR
by routing traffic to services deployed in multiple regions.

#### Cloud DNS 

GCP [Cloud DNS](https://cloud.google.com/dns) capabilities support DR through:

- Managing DNS entries as part of an automated recovery process.
- Providing DNS zones in redundant locations around the globe.

### Expert guidance for your disaster recovery journey

Maintaining suitable DR capabilities over time can be complicated and costly as your
business needs evolve. Your organization, applications, networks, and infrastructure are
going to change over time. Rackspace Technology can help you
[meet your DR requirements](https://www.rackspace.com/solutions/disaster-recovery) across
all the major public clouds&mdash; including [AWS](https://www.rackspace.com/en-gb/managed-aws),
[Azure](https://www.rackspace.com/en-gb/microsoft/managed-azure-cloud), and
[GCP](https://www.rackspace.com/en-gb/managed-google-cloud). 

Rackspace Technology DR professionals can deliver services and expertise in the following
critical areas:

- Design cost-effective DR solutions mapped to your recovery requirements and budget.
- Help secure your environments and protect your business.
- Share advice on DR solutions, planning, automation, auto-scaling, failover, and failback
  testing.
- Execute DR builds, configuration, testing, automation processing, documentation, runbooks,
  and policies.
- Provide backup and recovery planning and testing.
- Deploy information lifecycle management, data retention, and archiving.

Keep your business-critical systems up and running. Talk with our experts to get started.

<a class="cta purple" id="cta" href="https://www.rackspace.com/professional-services">Learn more about our Professional Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
