---
layout: post
title: "How to achieve PCI compliance in the public cloud"
date: 2020-10-27
comments: true
author: Zahid Mustafa 
published: true
authorIsRacker: true
categories:
    - Security
metaTitle: "How to achieve PCI compliance in the public cloud"
metaDescription: "Learn the basics about PCI DSS and explore how you can achieve PCI
certification on the public cloud with Rackspace Technology cloud security."
ogTitle: "How to achieve PCI compliance in the public cloud"
ogDescription: "Learn the basics about PCI DSS and explore how you can achieve PCI
certification on the public cloud with Rackspace Technology cloud security."
slug: "how-to-achieve-pci-compliance-in-the-public-cloud"

---

The Payment Card Industry Data Security Standard (PCI DSS) is a globally recognized
regulation that protects consumer credit card information from theft and disclosure. It
applies to all organizations that store, process, or transmit credit card
information&mdash;even if it’s just a few transactions each year. 

<!--more-->

### PCI compliance levels

Although PCI DSS applies to all businesses that accept or process payment cards, the
requirements vary. For example, if your organization processes more than six million
transactions a year, it must adhere to PCI Level 1 compliance modules. If it processes
fewer than 20,000, the requirements are less stringent. 

A merchant’s PCI level depends on how many card transactions they handle each year:

- **PCI Level 4**: Fewer than 20,000 annual transactions
- **PCI Level 3**: 20,000 – 1,000,000 annual transactions
- **PCI Level 2**: 1,000,000 – 6,000,000 annual transactions
- **PCI Level 1**: 6,000,000+ annual transactions

#### PCI Level 1 compliance requirements

For PCI Level 1 compliance, you need to meet [12 distinct modules](https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security) and address 200+ individual items within those modules. 

1. Building and maintaining a secure network and systems, including firewalls and server hardening
2. Changing vendor-supplied default passwords and security parameters 
3. Network segmentation or segregation of PCI data from the rest of your environment
4. Protecting cardholder data using encryption-at-rest
5. Encrypting data during transmission across public networks 
6. Quarterly or annual vulnerability scans and regular monitoring and testing of networks
7. Restricting user access to sensitive data and applications (using principle of least privilege) 
8. Maintaining an Information Security Policy
9. Controlling access through authentication and identity management
10. Monitoring and tracking all network access to PCI data
11. Regularly testing processes and security system 
12. Restricting physical access to PCI data

### PCI assessors and solutions

Besides having internal staff certified to conduct PCI audits and network testing, you
might need to reach out to a Qualified Security Assessor (QSA) or Approved Scanning Vendor
(ASV) for additional assistance.

#### What is a QSA?

A QSA is a PCI-certified organization that can help you identify and meet compliance
conditions. Your QSA performs the following tasks: 

- Determine which modules you need to address
- Determine how stringent you need to be to meet the requirements
- Conduct audits and assess compliance over time 
 
#### What is an ASV?

An ASV is an organization certified by the PCI council, through stringent testing of its
own, to scan your perimeter and any cardholder assets. These include any internet-facing
assets used to store, process, or transmit credit card information. Your ASV typically
runs a quarterly or annual scan, but you can request more scans over time&mdash;such as
when you’re implementing remediation efforts or trying to correct compliance issues. 

### Consequences for PCI noncompliance

Achieving compliance is not just about ticking a box. The steps you take along the way can
make your business more secure and less vulnerable to attackers. Noncompliance, on the
other hand, can result in steep consequences, including the following:

- **Financial penalties**: Credit card companies can charge merchants penalties ranging
  from $5,000 to $100,000 per month.
- **Costly breaches**: The average cost of a data breach is
  [$150 per record](https://www.ibm.com/security/data-breach).
- **Lost revenue**: Breaches can bring your business to a standstill, leading to customer
  churn and lost revenue. 
- **Damaged reputation**: When customers lose trust in your abilities to
  [protect their personal data](https://www.rackspace.com/solutions/protect-my-data) or
  financial information, they often won’t return. 
- **Legal action**: Data breach lawsuits are becoming an increasingly
  [active and costly threat](https://www.cyberinsecuritynews.com/data-breach-litigation). 

### PCI DSS compliance in the public cloud

Simply choosing a PCI-compliant public cloud platform doesn’t automatically make your
organization PCI compliant. While your public cloud service provider (CSP) is responsible
for the infrastructure and how the environment is used, you’re responsible for your
applications that store, process, or transmit payment card data. PCI compliance is a shared
responsibility between you and your CSP. 

By working closely with your CSP, you can achieve
[PCI compliant hosting](https://www.rackspace.com/compliance/pci) on the public cloud by
doing the following tasks:

- Create and maintain a cybersecurity strategy, including a
  [cloud security policy](https://www.rackspace.com/security/cloud-security-policy) and
  control documents.
- Conduct penetration testing.
- Institute proactive threat detection and rapid remediation measures, including
  intelligence, monitoring, intrusion detection, and response.
- Design, build, manage, and secure solutions across your environments and platforms.
- Ensure all public cloud architecture components are PCI compliant across all your
  environments, including production, disaster recovery, development, and test.
- Implement multi-layered security across global public cloud data centers.
- Use cloud-native services for networking, identity management, databases, and applications
  to protect sensitive data.
- Implement management and access controls, encryption, monitoring, firewalls, and
  environment and network segregation.

#### Maintain PCI compliance 

It can be challenging to maintain PCI compliance as your organization, network, and
infrastructure change&mdash;and as your business needs evolve and grow. You must have a
CSP that works with you and provides the [cloud security expertise ](https://www.rackspace.com/security)
you need to answer your questions and solve problems. 

#### Get started with PCI compliance on public cloud

Let our [multicloud security and compliance specialists](https://www.rackspace.com/managed-security-services/compliance-assistance)
work with you to understand your challenges and goals and build a path to your desired
outcomes. Our expertise across public clouds means you can address your PCI compliance
needs more efficiently across [AWS&reg;](https://www.rackspace.com/managed-aws),
[Google Cloud Platform&reg;](https://www.rackspace.com/managed-google-cloud), and
[Microsoft&reg; Azure&reg;](https://www.rackspace.com/microsoft/managed-azure-cloud)
public clouds. Get started today.

<a class="cta purple" id="cta" href="https://www.rackspace.com/managed-security-services/compliance-assistance">Learn more about how to achieve PCI compliance in the public cloud.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
