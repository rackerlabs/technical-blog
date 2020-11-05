---
layout: post
title: "Are you prepared for disaster recovery? A comparison of public cloud options&mdash;Part Two"
date: 2020-10-29
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
    - DevOps
metaTitle: "Are you prepared for disaster recovery? A comparison of public cloud options&mdash;Part Two"
metaDescription: "This is part two of a three-part series explores disaster-recovery options, from models to
environments to public cloud offerings. Are you ready?"
ogTitle: "Are you prepared for disaster recovery? A comparison of public cloud option&mdash;Part Two"
ogDescription: "This is part two of a three-part series explores disaster-recovery options, from models to
environments to public cloud offerings. Are you ready?"
slug: "are-you-prepared-for-disaster-recovery-a-comparison-of-public-cloud-options-part-two"

---

This is part two of a three-part series explores disaster-recovery options, from models to
environments to public cloud offerings. Are you ready?

<!--more-->

This three-part series explores disaster-recovery options, from models to environments to
public cloud offerings. Are you ready?  If you haven't read it, check out
[Part One](https://docs.rackspace.com/blog/are-you-prepared-for-disaster-recovery-a-comparison-of-public-cloud-options-part-one/).

### Disaster recovery on-premises versus cloud

Traditional, on-premises DR involves significant costs and administrative work, including: 

- Investing resources in deploying, patching, monitoring, and maintaining on-premises DR infrastructure
- Supplying data center facilities, including staff, space, equipment, and power 
- Supplying services to provide capacity and scalability 
- Supplying services to ensure security and compliance

By moving your DR to the cloud, you can offload these responsibilities to your service
provider. Businesses use the public cloud to meet their DR requirements in the following
ways:

- Primary production sites on-premises, and secondary sites on public cloud 
- Both primary production and secondary DR sites hosted on public cloud 

### Public cloud disaster recovery benefits

Hosting your DR system on a major public cloud addresses many of the preceding requirements
through features already provided by Amazon Web Services® (AWS), Microsoft® Azure®, and
Google Cloud Platform™ (GCP). These services offer the following features: 

#### Global networks

AWS, Azure, and GCP offer some of the largest and most advanced networks in the world.
They use advanced software-defined networking and edge-caching services to deliver consistent
and scalable performance.

#### Redundancy

Public cloud providers deliver robust redundancy through multiple global points of presence.
With many cloud-native services, your data replicates automatically across storage devices
in multiple locations and regions.

#### Scalability

Public cloud is designed to scale, even when your systems experience a huge traffic spike.
Managed services like Amazon Simple Storage Service (S3), Amazon Elastic Compute Cloud (EC2),
VM autoscaling, and Database-as-a-Service (DBaaS) enable automatic scaling so your application
can scale up and down as needed.

#### Security

The major cloud solution provider (CSP) security models are based on many years of
experience in keeping customers safe on applications like Amazon&reg;, Windows®, Microsoft
Office&reg;, Hotmail, Gmail&reg;, and G Suite. CSPs specialize in keeping data safe, thanks
to the best data centers and most skilled IT security staff. Their data centers have
multi-layered security, with exceptional defenses, including high fences, concrete barriers,
barbed wire, security systems, and cameras. 

#### Compliance

CSPs are subject to regular independent audits to verify that cloud platforms align with
compliance, security, and privacy regulations. Also, they follow best practices and comply
with numerous certifications, such as ISO 27001, SOC 2/3, and PCI DSS 3.0.

### Azure disaster recovery features and services

Azure provides [comprehensive guidance and services](https://azure.microsoft.com/en-us/solutions/backup-and-disaster-recovery/)
to customers, along with reference architectures, which map to the DR models described
previously. Offering  a wide range of products and a mature native Disaster-Recovery-as-a-Service
(DRaaS) solution, called [Azure Site Recovery](https://azure.microsoft.com/en-us/services/site-recovery/),
which is widely used, Azure was recognized as a leader in DRaaS services by Gartner in the
2019 Magic Quadrant for DRaaS.

Following are features and services available from Azure that support DR solutions:

#### Azure backup capabilities

The Azure native backup solution is simple and easy to use through the Azure portal.
Backup services include the following:

- Support for SQL Server&reg; databases and virtual machines (VMs) 
- Data restoration with application consistency using VSS snapshot for Windows and fsfreeze for Linux 
- Encrypted backups by default
- Cold DR model backup and restore

#### Azure site recovery capabilities 

Azure site recovery capabilities to support DR include the following:

- Continuous replication for Azure and VMware&reg; VMs with replication frequency as low as
  30 seconds. (This is dependent on the latency and network speed between your primary source
  environment and your secondary DR environment.)
- Easy setup through the Azure portal to replicate VMs from on-premises to Azure or from
  one Azure region to another.
- DR testing without impacting production environments and users.
- Application availability with automatic recovery between Azure regions and from
  on-premises data centers to Azure.
- Automatic Azure Site Recovery (ASR).
- Reduced cost and effort for maintaining a secondary data center because you only pay for
  the compute resources you need to support your applications.  
- Rapid restoration of your most recent data resulting in low Recovery Time Objective (RTO)
  and Recovery Point Objective (RPO).
- Scales up and down to handle DR for as many business-critical applications as you need.
- Blob storage for image replication of all machines that are protected.
- Low-cost recovery to Azure.
- Low-cost recovery to customer-owned sites.
- Works with cloud migration.

#### Azure geo and zone redundant storage options

Azure geo and zone redundant storage capabilities to support DR include the following:

- **Locally redundant storage (LRS)**: The lowest cost option. Data is replicated three
  times within a single physical location in the primary region. It provides 99.999999999%
  durability over a year. This option is suitable if you want to restrict data to one
  region or country due to governance constraints.

- **Zone redundant storage (ZRS)**: ZRS replicates data synchronously across three
  availability zones within a region. Each zone is in a separate physical location with
  dedicated networking, power, and cooling. It provides 99.9999999999% durability over a
  year. This option is suitable if you want to restrict data to one region or country due
  to governance constraints. 

- **Geo-redundant storage (GRS)**: GRS replicates data synchronously three times within
  one physical location in the primary region using LRS. Data is also replicated
  asynchronously to one physical location in a secondary region that is at least 300 miles
  away from the primary region. It delivers 99.9999999999% durability over a year. This
  option protects your data against region failure.

- **Geo-zone-redundant storage (GZRS)**: GZRS combines high availability through redundancy
  across multiple availability zones with geo-replication, protecting against both zone and
  regional failures. This option provides 99.99999999999999% durability over one year.

- **Read-access geo-redundant storage (RA-GZRS)**: RA-GZRS provides read access to the
  secondary region.  

#### Azure archive storage

Azure archive storage capabilities to support DR include the following:

- Cost-effective solutions for retaining and retrieving cold data, which is rarely accessed but which you must keep for many years
- Easy management of archiving, and hot, cool, and archive objects
- Delivers data encryption at rest

#### Azure Traffic Manager 

Azure Traffic Manager capabilities to support DR include the following:

- Automatic DNS routing of user traffic based on policies you define
- Routes traffic to a secondary site in the event of a disaster

#### Azure SQL Database (DBaaS)

Azure SQL Database capabilities to support DR include the following:

- Azure DBaaS includes active geo-replication, which protects against region failure
- Supports up to four secondary databases in the same or different regions
- Leverages the always-on availability feature of the database to asynchronously replicate transactions on the primary database to the secondary database

#### VM and native database replication

Azure supports DR by providing VM and native database replication capabilities. All major
CSPs allow the use of native database replication features to replicate data running in the
infrastructure-as-a-service (IaaS) model, from primary to secondary zones and regions.
Common examples include Data Guard replication for Oracle® databases or always-on availability
groups for SQL Server. 

### What's next?

Check out [Part Three](https://docs.rackspace.com/blog/are-you-prepared-for-disaster-recovery-a-comparison-of-public-cloud-options-part-three/)
of this series on disaster preparation to learn more about AWS and GCP DR offerings.

<a class="cta blue" id="cta" href="https://www.rackspace.com/professional-services">Learn more about our Professional Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
