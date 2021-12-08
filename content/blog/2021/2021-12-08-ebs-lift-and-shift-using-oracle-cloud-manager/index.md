---
layout: post
title: "EBS Lift and Shift Using Cloud Manager"
date: 2021-12-08
comments: true
author: Shyam Addagudi
authorAvatar: 'https://secure.gravatar.com/avatar/1680a2aebbce8c7b3c54c1d857fcf4ba'
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
    - General
metaTitle: "EBS Lift and Shift Using Cloud Manager"
metaDescription: "The Oracle E-Business Suite Cloud Manager UI was specifically designed to create and manage EBS environments on OCI and associated database services."
ogTitle: "EBS Lift and Shift Using Cloud Manager"
ogDescription: "The Oracle E-Business Suite Cloud Manager UI was specifically designed to create and manage EBS environments on OCI and associated database services."
slug: "ebs-lift-and-shift-using-cloud-manager"

---

The Oracle E-Business Suite Cloud Manager UI was specifically designed to create and manage EBS environments on OCI and associated database services.

<!--more-->

Lift and Shift EBS to OCI is an approach, one among many for migrating the on-Premises Oracle EBS to Oracle Cloud Infrastructure.

### Pre Requisites

Source database should be in the archive log mode

Check if NTP service is configured

In the apps tier, AD/TXK should have minimum level of 11. It should have the following patches applied in application tier and database tier respectively.

`Patch 28371446:R12.TXK.C`

`Patch 29965377:R12.TXK.C`

`Patch 30601878:R12.TXK.C`

`Patch 30713114:R12.TXK.C`

`Patch 31314595:R12.TXK.C`

`database patches-31113249`


### Key Generation

The following is the code for generating API Signing Key

`mkdir ~/.oci`

Generate private key

Command: `openssl genrsa -out ~/.oci/oci_api_key.pem 2048`


Generate public key

Command: `openssl rsa -pubout -in ~/.oci/oci_api_key.pem -out ~/.oci/oci_api_key_public.pem`

writing RSA key

_get the fingerprint_: -

Command: `openssl rsa -pubout -outform DER -in ~/.oci/oci_api_key.pem | openssl md5 -c`

Upload the public key to the user's API signing key in OCI console.

`Created an id_rsa and id_rsa.pub keys. Copied .pub keys to` `>>authorized_keys. And then using puttygen created a new ppk file` `from id_rsa file and copied it to server`

Also, both users of apps and db servers SSH configuration files `(~/.ssh/config)` must have the entry "ServerAliveInterval 100".

#### Note: 
The user who you select should have the privileges to create resources in the compartments.

1.	Before provisioning an Instance, you should move on-premise EBS backup to object storage using Cloud Backup Module.

2.	You must have the WGET library installed on the on-premises server where you plan to run the Oracle E-Business Suite cloud backup module.

3.	The source database (on-premises) must be in ARCHIVELOG mode to perform a hot backup.


{{<img src="pull-model.png" title="" alt="">}}

</br>

{{<img src="push-model.png" title="" alt="">}}

</br>

### Provisioning Steps

-	Using the backup(step1), you will now provision a new EBS instance in OCI.
-	You will use the advance provisioning.

In this section, password validation will be done. If there are any validation issues, errors will be displayed. Correct the passwords and click _Next_ to proceed. 

Select the Cloud Database Service option for your environment, either Compute, Virtual Machine DB System, or Exadata DB System. I had chosen Compute.


#### Click Next to enter the application details: -

A new feature called Zone has been added. You can now segregate the instance as internal and external zones. We can have a load balancer shared between multiple zones of the same type. 

This configuration allows for two separate URLs to resolve to the same IP address and the shared load balancer will target one backend set or another.

#### Define the internal zone

In the Web Entry Point region, choose one of the following: New Load Balancer (LB), Manually Configured Load Balancer to select a manually deployed existing load balancer, or Application Tier Node to choose the primary application tier as the entry point.

If you choose new load balancer or manually configured load balancer option and file system as shared, then going forward, using Cloud manager you can add a secondary node using the _"ADD Node"_.  
You can click on add here and add a secondary node if you want. Click on save zone then click next.

In this section, you want CM to perform any additional tasks, you can specify in this session. Click next and add the SSH keys and click next.


### Post steps

After a successful provisioning of EBS Cloud Manager, you must create a new network profile to provision EBS Instance using One-Click option or Advance Provisioning option.
Now, you can create EBS Instance and later with the created EBS Instance, you can take a backup and migrate the same.
Connect to the EBS Cloud Manager VM and Login into database and application using Oracle user.

### Validation
Once the provisioning is complete you can validate.
_Access the EBS Environment Login page now and validate._

<img src="Picture1.png" title="" alt="">

You can see the details under Environment section of the Cloud Manager.
There is a new feature added in this new version of Cloud manager for assigning backup policies

### Conclusion

Oracle E-Business Suite has served an admirable purpose on-premises but running it on Oracle Cloud Infrastructure has several merits, and the Lift and Shift migration methodology is ideal to achieve the same.




<a class="cta red" id="cta" href="https://www.rackspace.com/applications/oracle">Let our experts guide you on your Oracle Application Implementations</a>

<a class="cta red" id="cta" href="https://www.rackspace.com/cloud/oracle">Let our experts guide you on your Oracle Cloud Infrastructure</a>



Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
