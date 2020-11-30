---
layout: post
title: "Key management and HSMs for AWS workloads"
date: 2020-11-30
comments: true
author: Ilya Ayzenshtok
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - AWS
    - Security
metaTitle: "Key management and HSMs for AWS workloads"
metaDescription: "Managing the cryptography infrastructure required for a project or a
company has traditionally been a challenging task, to put it mildly. It requires a
highly-specialized and rare skillset and poses a substantial technological and legal risk
in perhaps the most sensitive areas of your applications."
ogTitle: "Key management and HSMs for AWS workloads"
ogDescription: "Managing the cryptography infrastructure required for a project or a
company has traditionally been a challenging task, to put it mildly. It requires a
highly-specialized and rare skillset and poses a substantial technological and legal risk
in perhaps the most sensitive areas of your applications."
slug: "key-management-and-hsms-for-aws-workloads"

---

Managing the cryptography infrastructure required for a project or a company has
traditionally been a challenging task, to put it mildly. It requires a highly-specialized
and rare skillset and poses a substantial technological and legal risk in perhaps the most
sensitive areas of your applications

<!--more-->

Therefore, it is a huge relief that with all the complexities that come with cloud migration,
all public cloud providers are doing their best to simplif&mdash;or outright take
over&mdash;your crypto infrastructure needs.

AWS&reg;, in particular, seems to recognize that there are different scenarios their
customers face in this regard. These scenarios depend, for example, on things like the
complexity of the project, relevant regulatory environment, organizational policies, and
so on.

Of course, there's rarely a one-size-fits-all solution in IT, and this is especially true
for such a complex topic as data security. Therefore, this post provides a quick overview
of the following options available on AWS for cryptography tasks, including how and when
to use them:

- Key Management Service (KMS)
- CloudHSM (managed Hardware Security Modules on AWS)
- On-Premise HSMs

### Overview

When we talk about cryptography infrastructure, we refer to the services required to
support the following business needs:

- Centralized key management
- Data encryption in your applications
- Data encryption at-rest in various forms of storage
- Data integrity validation via digital signatures

Any solution also needs to be secure, compliant, auditable. Finally, the solution should
provide all of the preceding elements at the lowest cost possible.

Note that protecting your data in transit (that is, securing your transmission channels
with things such as SSL/TLS certificates) is a separate subject altogether. With that said,
you can use HSMs for SSL/TLS offloading, which can come in handy in scenarios that require
custom SSL/TLS traffic termination.

### AWS Key Management Service (KMS)

[AWS Key Management Service (KMS)](https://aws.amazon.com/kms/) is essentially a central
hub for key management and data encryption in AWS:

- KMS is a fully-managed, secure, resilient, and compliant AWS service that provides
  centralized key management for your managed resources and applications in the cloud.
- KMS is integrated with other AWS services, making it easy to encrypt your data at-rest.
- AWS Encryption SDK allows you to use KMS-backed data encryption and digital signatures
  in your applications.
- KMS provides fine-grained access control to the keys used for encryption.
- KMS integrates with AWS CloudTrail to provide you the detailed audit trails of every key
  operation.

As we'll see later, integration with other services is still a key feature
available&mdash;and perhaps required&mdash;even with external HSM devices used for key
storage. In fact, KMS is the only way to enable encryption on the AWS services that provide
this option without handling the encryption manually in your app.

Now might be a good time to mention that the security of AWS&mdash;meaning of their
platform and the managed service built on top of that platform&mdash;is at least among the
best in the world and definitely far ahead of anything that even large corporations can
afford. This fact makes sense if you consider that security is often the main factor that
makes or breaks a product in today's world. In other words, AWS has simply no other choice
than to have an army of the best security engineers it can find scrutinizing every aspect
of the cloud platform. 

The concept of the AWS
[Shared Security Responsibility Model](https://docs.aws.amazon.com/whitepapers/latest/aws-overview-security-processes/shared-security-responsibility-model.html)
delineates clearly what AWS and its customers are responsible for (and AWS documentation
always has a huge section on the best security practices for each of their products). To
show how serious they are about security and regulations, AWS includes a
[Compliance section](https://aws.amazon.com/compliance/) on their site, where you can find
more about both compliance of the AWS cloud platform and the tools it provides for its
customers to deal with their compliance requirements.

Indeed, compliance is often a critical point in an enterprise context, especially in
regulated industries. Coming back to KMS, according to the
[product's Features page](https://aws.amazon.com/kms/features/):

"The AWS KMS cryptographic module is validated, or in the process of being validated, at
[FIPS 140-2](https://en.wikipedia.org/wiki/FIPS_140-2) Level 2 overall with Level 3 for
several other categories, including physical security."

While KMS is more than adequate for the vast majority of use cases, there are times where
*storing* the keys in KMS is not an option, usually due to compliance requirements. According
to the [KMS FAQ page](https://aws.amazon.com/kms/faqs/), there are four reasons you might
need to configure a [custom key store](https://docs.aws.amazon.com/kms/latest/developerguide/key-store-concepts.html#concept-custom-key-store)
backed by an AWS CloudHSM cluster:

- An explicit requirement to store your keys in a single-tenant HSM or an HSM over which
  you have direct control
- A requirement to store your keys in an HSM that has been validated to FIPS 140-2 level
  3 overall
- A need to have the ability to remove key material from AWS KMS immediately and to prove
  you have done so by independent means
- A requirement to be able to audit all use of your keys independently of AWS KMS or AWS
  CloudTrail

Let's look at AWS CloudHSM service next.

### CloudHSM

[AWS CloudHSM](https://aws.amazon.com/cloudhsm/) is a cloud-based, fully-managed hardware
security module (HSM) service that allows you to build secure and standards-compliant
workloads in AWS without sacrificing the high availability and low latency benefits of the
cloud.

The fully-managed nature of the service means that you are relieved of the time-consuming
administrative tasks needed to support this infrastructure: hardware provisioning, software
patching, high-availability, and backups. Moreover, you can scale your HSM cluster on
demand, while AWS takes care of load balancing and cluster consistency for you. Your HSMs
are in your own VPC and are completely isolated from other AWS networks. Finally, while
AWS manages the cluster for you, you have complete control of your encryption keys&mdash;AWS
has no visibility or access to the actual content of the HSMs.

The HSMs provided by AWS CloudHSM comply with FIPS 140-2 level 3 (see
[FIPS Validation](https://docs.aws.amazon.com/cloudhsm/latest/userguide/fips-validation.html)
for details), allowing you to demonstrate compliance with regulations such as HIPAA or PCI.

Having the HSMs in AWS improves application performance because of the close proximity of
the HSM to the resources that leverage it. CloudHSMs support custom applications built with
industry-standard APIs, such as PKCS#11, JCE, and CNG. And as mentioned earlier, it
integrates with KMS as a custom key store, allowing you to keep all the benefits of the
AWS service integrations without violating the regulations that govern your industry.

Beyond FIPS 140-2 Level 3 and dedicated tenancy guarantees, the AWS CloudHSM
[Use Cases](https://docs.aws.amazon.com/cloudhsm/latest/userguide/use-cases.html) page
offers three potential scenarios for the service:

- Offload the SSL/TLS Processing for Web Servers
- Protect the Private Keys for an Issuing Certificate Authority (CA)
- Enable Transparent Data Encryption (TDE) for Oracle Databases

In summary, the CloudHSM service provides the necessary level of compliance for workloads
serving highly-regulated industries (such as financial or medical). Our customers have
successfully implemented CloudHSM clusters in green-field projects and complex lift-and-shift
scenarios, allowing them to ease the transition of critical workloads to the cloud.

### On-Premise HSMs 

For the architectures that require the highest degree of control over all security aspects
of the infrastructure, an AWS CloudHSM cluster can work with on-premise HSM modules.
Implementing this scenario results in the lowest possible level of trust towards the external
service provider but adds corresponding costs and complexities.

As stated, this use case's main benefit is that HSMs that are managed and hosted by the
customer allow the highest degree of control over those devices. The customer still needs
to provision, maintain, and pay for a CloudHSM cluster in AWS that links to the on-premise
infrastructure. In this architecture, customers directly need to handle all of the following
aspects on their side of the implementation:

- Physical security of the HSM devices
- Patching and maintenance of the software
- Backups
- Load balancing and availability
- Network connectivity between devices and the AWS cloud

It is important to focus on the last point in particular. Maintaining a reliable connection
between the cloud resources in AWS and the local HSM modules is critical to ensure that the
cloud workloads can function at all. Therefore, it's important to design highly-available
and reliable links between your AWS VPCs and the local HSM infrastructure. Depending on how
critical the workload is, multiple degrees of redundancy &mdash;multiple DirectConnect lines
with VPN backup connectivity&mdash;might be necessary.

With all that said, in our experience, clients that need to maintain on-premise resources
often don't have much choice in this matter. If your organization is in that situation,
we'd like to point out that we've worked with our clients before on similar scenarios, and
our engineers and solution architects can provide you with guidance and best practices for
the entire journey. Finally, you can place your HSM devices with the
[Rackspace Managed Hosting](https://www.rackspace.com/managed-hosting) team to allow our
team of experts to manage security, performance, and connectivity for you.

### Conclusion

Moving workloads to the cloud often requires a deep conceptual rethinking of key IT concepts
and approaches. It's usually a challenging transition from ownership of resources to their
ongoing on-demand consumption. One of the more challenging aspects of that transition is
giving up control and putting your trust in an external provider, no matter how good the
technical argument for that might be.

In a very broad sense, we recommend delegating as much of your architectural *plumbing* to
AWS as possible. As discussed above, AWS has most likely put more resources into those
topics that we can imagine. Or to look at it in another way, those fundamental infrastructure
concerns are, in fact, AWS's core business, but they are not yours. So as a general rule
of thumb, you reap the most benefit by focusing on what your business is, not on the myriad
things required to support it on every level.

But regardless of whether or not you can afford such a fundamental change in your project
or organization, all the major cloud providers&mdash;and AWS in particular&mdash;have
excellent services to reduce your operational expenses and risk factors in your cloud
workloads.

<a class="cta purple" id="cta" href="https://www.rackspace.com/managed-hosting">Learn more about Rackspace Managed Hosting.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
