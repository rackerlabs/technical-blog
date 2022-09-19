---
layout: post
title: "How to Install PeopleSoft Cloud Manager in Oracle Cloud Infrastructure (OCI)"
date: 2022-09-16
comments: true
author: Saikiran Munigela
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - Docker
    - Weblogic
    - Containers
metaTitle: "How to Install PeopleSoft Cloud Manager in Oracle Cloud Infrastructure (OCI)"
metaDescription: "What is PeopleSoft Cloud Manager?
PeopleSoft Cloud Manager is a framework to provision and manage PeopleSoft environments on Oracle Cloud Infrastructure (OCI). PeopleSoft Cloud Manager is delivered through Oracle Cloud Marketplace.  This tool gives customers the ability to automate the process of the installation and deployment of PeopleSoft applications on OCI.
"
ogTitle: "How to Install PeopleSoft Cloud Manager in Oracle Cloud Infrastructure (OCI)"
ogDescription: "What is PeopleSoft Cloud Manager?
PeopleSoft Cloud Manager is a framework to provision and manage PeopleSoft environments on Oracle Cloud Infrastructure (OCI). PeopleSoft Cloud Manager is delivered through Oracle Cloud Marketplace.  This tool gives customers the ability to automate the process of the installation and deployment of PeopleSoft applications on OCI.
"
slug: "how-to-install-peoplesoft-cloud-manager-in-oracle-cloud-infrastructure-oci"

---

**What is PeopleSoft Cloud Manager?**

PeopleSoft Cloud Manager is a framework to provision and manage PeopleSoft environments on Oracle Cloud Infrastructure (OCI). PeopleSoft Cloud Manager is delivered through Oracle Cloud Marketplace.  This tool gives customers the ability to automate the process of the installation and deployment of PeopleSoft applications on OCI.

<!--more-->

### Prerequisites:
-	One should have subscription to Oracle Cloud Infrastructure
-	Create a Virtual Cloud Network (VCN) with related resources like Subnets, Internet Gateway, Route Table and Default Security list
-	Edit the security lists to allow access to ports to be used in PeopleSoft Cloud Manager instance

### Minimum Requirements to manage PeopleSoft Applications using PeopleSoft Cloud Manager:

-	Application version 9.2
-	PeopleTools Version 8.55.13
-	File Server Capacity is 250 GB

### OCI Resources:

**Virtual Cloud Network (VCN):**
A customizable network you define and configure in OCI in a particular region.

**Subnet:**

A Subnet is a sub-network with in a VCN.

**Internet Gateway:**

An Internet Gateway is a virtual router which enables communication between VCN and Internet.

**Route Table:**

Set of rules used to route traffic to a destination IP Address that is outside of the subnet.

**Security Lists:**

Security Lists is a virtual firewall for an instance with ingress and egress rules that specify the types of traffic allowed in and out.

**Compartment:**

A Compartment enables user to logically organize and isolate OCI resources. Compartments are across regions. When you create a compartment, it is available in every region that your tenancy is subscribed to

**Resource Manager:**

An OCI service that allows users to automate the process of provisioning your Oracle Cloud Infrastructure resources. It uses “Terraform” to install, configure, and manage resources through the "infrastructure-as-code" model. 


### Installation of PeopleSoft Cloud Manager:

1.	Login to OCI console. OCI homepage looks like below

<img src=Picture1.png title="" alt="">

2.	PeopleSoft Cloud Manager image is placed on Oracle Cloud Marketplace. Select “Marketplace” from the list of menus.

<img src=Picture2.png title="" alt="">

3.	Select “PeopleSoft Cloud Manager Image for OCI” from the list of images available in Marketplace.

<img src=Picture3.png title="" alt="">

4.	Select the compartment in which you want to deploy Cloud Manager instance and click on Launch Instance.

<img src=Picture4.png title="" alt="">

5.	Resource Manager will now launch “Create stack” wizard where a user needs to provide all the related OCI resources details required to install Cloud Manager instance.

<img src=Picture5.png title="" alt="">

6.	Provide Availability domain in which instance should be deployed and the shape of instance

<img src=Picture6.png title="" alt="">


7.	API signing Key pair needs to be generated to be able to communicate with Cloud Manager and its related resources. If a user is on a Windows workstation, need to install Git bash software to run openssl commands and generate the keys.

- *For Private Key:*

`openssl genrsa -out <Path>/oci_api_key.pem -aes128 -passout stdin 2048`

*For Public Key:*

`openssl rsa -pubout -in <Path>/oci_api_key.pem -out <Path>/oci_api_key_public.pem -passin stdin`

<img src=Picture7.png title="" alt="">

8.	Both Public and private API signing keys will be generated under the path provided. 

<img src=Picture8.png title="" alt="">

9.	Every OCI object will have a unique ID called OCID. A user’s OCID can be seen under User Profile from OCI console – Identity > Users > User Details

<img src=Picture9.png title="" alt="">

10.	Navigate back to Resource Manager stack wizard and update the necessary details.

<img src=Picture10.png title="" alt="">

11.	Next, the user needs to provide the Cloud Manager instance specific details like Database name, Connect Password, Access ID, Access Password etc. These are all the same details a user provides while installing a PeopleSoft Update Manager (PUM) instance using the DPKs on On-premises servers.

<img src=Picture11.png title="" alt="">

12.	Cloud Manager has a default Super User (OPRID), CLADM, like other Peoplesoft Apps, for example, Finance, HCM etc. 

<img src=Picture12.png title="" alt="">

13.	Provide the networking related resource details like VCN and subnet in which Cloud Manager instance needs to be deployed.

<img src=Picture13.png title="" alt="">

14.	A user can create a Jump Host server which will be required to access the instances that are on a private subnet.

<img src=Picture14.png title="" alt="">

15.	Once all the necessary details are provided, review them once and click on “Create”. 

<img src=Picture15.png title="" alt="">
<img src=Picturea.png title="" alt="">
<img src=Picture17.png title="" alt="">
<img src=Picture18.png title="" alt="">
<img src=Pictureb.png title="" alt="">

16.	Resource Manager will now start executing the terraform Job which will create OCI instance and initiate the bootstrap script to deploy Cloud Manager instance.

<img src=Picture19.png title="" alt="">

<img src=Picture20.png title="" alt="">




17.	Verify the logs and the Cloud Manager PIA URLs generated 

<img src=Picture21.png title="" alt="">


18.	Resource Manager job will create an OCI instance and initiate the Peoplesoft Cloud Manager deployment bootstrap script. Deployment of Cloud manager process can be verified by logging onto the OCI instance created by Resource Manager job. This deployment is same as PeopleSoft Update Manager (PUM) deployment.


19.	Login to PIA URL provided in the logs, using CLADM user.

<img src=Picture22.png title="" alt="">

### Cloud Manager Settings 

- **User OCID** – Owner of that Peoplesoft Application/instance to be deployed
- **Tenancy** – Tenancy of Cloud Manager instance
- **API Signing keys** – To connect to Linux instance from Cloud Manager OCI instance.
- **Image OCID** – Linux and Windows Image OCID to be used while Cloud Manager deploys other PeopleSoft Applications.
- **My Oracle Support Credentials** – A valid OCI subscription login details so that Cloud Manager will automatically download the required binaries/software/patches. 

<img src=Picture23.png title="" alt="">

**File Storage Service** – Create a File server mount target to store all the downloaded binaries which serves as a Cloud Manager Repository.

<img src=Picture24.png title="" alt="">

Once the PeopleSoft Applications are deployed using Cloud Manager, they will be visible under Environments tile as below:

<img src=Picture25.png title="" alt="">

As discussed earlier, Cloud Manager automates the complex PeopleSoft admin activities like PeopleTools Patching, Infra CPU Patching, Upgrading PeopleTools to new release, Configure PUM connections with Target databases etc.

<img src=Picture26.png title="" alt="">


### Conclusion

Cloud Manager enables the following time and cost saving options:
- 	Provision PeopleSoft environments on Oracle Compute Cloud and Oracle Database Cloud Services
- 	Orchestrated deployment of PeopleSoft 9.2 Applications on Oracle Cloud
- 	Automated migration of on-premises environment to Oracle Cloud
- 	Manage multiple environments from a single page
- 	Access to log files through UI for easy troubleshooting



<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
