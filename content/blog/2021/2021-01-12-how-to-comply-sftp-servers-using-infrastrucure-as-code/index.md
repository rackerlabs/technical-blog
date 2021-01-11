---
layout: post
title: "How to comply SFTP servers using Infrastrucure as Code"
date: 2021-01-12
comments: true
author: Roy Kalamaro
authorAvatar: 'https://ca.slack-edge.com/T092PUK16-U2TEASPJ9-g256bc697d78-512'
bio: "Extensive experience in Cloud Computing technologies, security, containerized solutions, 
Linux OS administration (Debian and RPM based), Windows servers, and networking.
Highly passionate about automation, immutable infrastructure through code, and cloud native 
services to follow best practices."
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "How to comply SFTP servers using Infrastrucure as Code"
metaDescription: "AWS Transfer for SFTP is a managed AWS service. It allows for the transfer of files and other data over a connection using the Secure Shell (SSH) protocol into and out of Amazon S3 buckets."
ogTitle: "How to comply SFTP servers using Infrastrucure as Code"
ogDescription: "AWS Transfer for SFTP is a managed AWS service. It allows for the transfer of files and other data over a connection using the Secure Shell (SSH) protocol into and out of Amazon S3 buckets."
slug: "how-to-comply-sftp-servers-using-infrastrucure-as-code"
canonical: https://onica.com/blog/managed-services/cloudformation-comply-aws-sftp-servers/

---

*Originally published in Feb 2018, at Onica.com/blog*

AWS&reg; Transfer&reg; for SFTP is a managed AWS service. It allows for the transfer of files and other data over a connection using the Secure Shell (SSH) protocol into and out of Amazon S3&reg; buckets. 

<!--more-->

### What is an AWS SFTP?

AWS&reg; Transfer&reg; for SFTP&reg; (AWS Secure File Transfer Protocol) is a managed AWS service that allows for the transfer of files and other data over a connection using the Secure Shell (SSH) protocol into and out of Amazon S3&reg; buckets. As opposed to FTP, traffic to the SFTP remains encrypted, since it uses asymmetric cryptology with SSH public key to encrypt the data at transit. Many organizations benefit from this protocol to upload and download files to servers using SFTP to follow security policies and required compliances.

The service default configuration enables the use of Amazon Linux AMIs. This is a great standard set by AWS to reduce implementation overhead. Nevertheless, there are many use-cases where the SFTP server needs to be accessible from the internet, which could potentially leave your instance exposed to attack vectors such as malicious bots or brute force attempts to obtain access to the instance shell.

#### CloudFormation Template – Comply AWS SFTP servers using Infrastructure as Code

Having an externally facing tunnel used for both SSH and SFTP might create a breach in compliance. This happens because if you allow traffic to port 22 from the internet `0.0.0.0/0` on the instance `Security Group`, and do not create any additional layers to filter this traffic, the instance becomes vulnerable and creates a breach in compliance.

With our [CloudFormation template](https://onica.com/blog/cloudformation-nested-stacks-the-easy-way/), you’ll be able to address this issue through Infrastructure as Code and launch a publicly accessible SFTP while keeping the shell tunnel private for specified IPs.

For Amazon Linux version 1 or 2 distribution our CloudFormation template will do the following:

- Allow you to choose the designated SFTP port `1-65535` &mdash;Not 22.
- Allow you to provide the IP CIDR source for strict shell access &mdash;must be in the following format `x.x.x.x/x`
- Provision an Elastic IP that auto attaches it to the instance.
- Create an additional sshd PID `sshd-second` and configurations.
- Disable SFTP in the original `sshd_config`.
- Disable Shell access in `sshd_config-second` for ec2-user

**Note:** It is recommended to add new users to the `DenyUsers` in `/etc/ssh/sshd_config-second` and restrict shell access on the SFTP port.

#### Quickstart instructions:

1. Upload the template to CloudFormation.
2. Choose the desired value for the parameters mentioned before. **Note:** Use `4777` as SFTP port.
3. Click **Next** twice and then **Create**. After this process finishes, resources should be visible.
4. Use your preferred SFTP client and connect.

<a class="cta red" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click **Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
