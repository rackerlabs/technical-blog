---
layout: post
title: "From datacenters to kubernetes on aws"
date: 2020-12-07
comments: true
author: Mark Charoenrath 
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-U0118EALE77-fa48a7c11b02-72'
bio: "Marketing leader experienced in growing brands while scaling and 
modernizing marketing organizations through a balance of creativity, 
process & technology to captivate audiences and achieve results."
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "From datacenters to kubernetes on aws"
metaDescription: "How migrating to the Cloud using Kubernetes on AWS improved agility and 
cost for a large stock media company."
ogTitle: "From datacenters to kubernetes on aws"
ogDescription: "How migrating to the Cloud using Kubernetes on AWS improved agility and 
cost for a large stock media company."
slug: "from-datacenters-to-kubernetes-on-aws"
canonical: https://onica.com/blog/containers/kubernetes-on-aws/

---

*Originally published in March 2019, at Onica.com/blog*

How migrating to the Cloud using Kubernetes on AWS&reg; improved agility and cost for a 
large stock media company.

<!--more-->

### Migrating to Kubernetes on AWS
Our client, a large stock media company, was originally known for their stock photography, 
but has expanded its business over the years to include music and video assets as well. 

#### Bringing content delivery to the cloud
The client was maintaining and operating approximately 300 distinct services across multiple teams
on a bespoke virtualization platform. While this had served them well in the past, rapid growth coupled 
with the absence of set deployment processes, maintenance or monitoring created notable issues including 
long release cycles and a difficulty to adapt to market pressures.

As many of the original developers of that system had moved onto newer roles, organizational knowledge 
of how the system worked was limited, and the continued reliance on custom tools meant it took new SDEs 
three to six months before they were familiar enough with the tooling to be net productive. This became 
an increasing concern for the team, as new demand from international customers began to rival 
North American traffic. Since their application was effectively hosted out of a single data center on the 
US east coast, these customers in the Asia Pacific region would often see request latencies of over 
ten seconds when using the application. The business recognized an urgent need to better serve these customers, 
however engineering efforts were stilted by the system.

In addition to market pressures, the primary lease on their data centers was about to roll over and 
the client identified a need to terminate the contract with their current data center provider 
as soon as possible. With these concerns in mind, the Client chose to move services to a cloud provider.

#### Creating an integrated platform experience
Looking at the data, the client knew they wanted to engage with AWS, due to their position as a leader in the cloud.

    “If you do the research, if you look at the data, AWS is ahead of the competition for a 
    SaaS provider and for the project we were doing.” said, one of the Cloud Architects on the project.

The number of workloads they needed to run was of concern, and AWS had the clear advantage in this regard. 
The client had also identified a desire to use Kubernetes&reg;, wanting to choose a provider agnostic system with a 
sizable community for support.

#### Can Kubernetes run on AWS?
Kubernetes is an open-source container management system. AWS has more customers running Kubernetes 
in the cloud than any other provider. They make it easy to run Kubernetes in the cloud with 
[Amazon Elastic Kubernetes Service](https://onica.com/videos/amazon-ecs-vs-eks/) (EKS). **EKS** is an 
AWS managed service that makes it easy for you to run Kubernetes without needing to manage or maintain 
your Kubernetes control plane.

### Onica’s solution: Kubernetes on AWS
Rackspace Onica was engaged for a two month proof of concept (POC) to prove that the workloads the client needed 
could run on Kubernetes on AWS. This was a challenge, as the teams were learning Kubernetes from scratch in order to 
facilitate this effort. In addition, due to the open-source nature of Kubernetes, there was no established 
*right way* to create the kind of infrastructure needed. This required a collaborative effort in order to 
ensure that community recommendations would align properly with the goals of the end solution. Once Kubernetes 
on AWS was proven to be a viable solution for workload needs, we out together a team of Onica and internal client 
engineers to facilitate the migration.

### A multi-faceted migration approach
To conduct mass migrations, the integrated team developed tools to assist the different development teams 
in using Kubernetes easily without having to learn the deep intricacies of the Kubernetes platform. This resulted 
in a three-prong approach to develop the tooling for application refactoring.

#### Step 1: Adapt applications to Kubernetes
The first step was to create automated infrastructure provisioning through **CI/CD** pipelines in order to allow 
developers to adapt their applications to Kubernetes. The new infrastructure contains four **Virtual Private Clouds** 
for each engineering environment: development, QA, production, and operations, each environment contains its own 
Kubernetes cluster. 

A Jenkins cluster running in the operations environment executes the build pipelines, which 
progressively deploy the applications to development, QA, and production environments, assuming tests in 
the previous environment passed. Additionally, each of these environments' configuration includes a common set of 
logging, monitoring, and alerting services that detect and integrate with new applications as they’re deployed. 
For individual teams to utilize this platform they must containerize their services and write a short manifest 
describing any customization required to the deployment pipeline for their app.

#### Step 2: Create scalability
The second step was using a packaging mechanism to set up dependencies and maximize the usability of packages. 
For this, the team used Helm&reg;. Through Helm, the team was able to simplify the consistent configuration and deployment of applications on to Kubernetes clusters, allowing for scalability.

#### Step 3: Kubernetes Kops for simplicity
Finally, Terraform&reg; codified and provisioned all components of the new platform. This **infrastructure-as-code** 
approach allowed for quick iteration on the platform design through code reuse and refactoring. Through use of 
Kubernetes Kops&reg;, the team was able to provision, upload and maintain clusters in a cross-platform way. In the early 
implementation stages, this was a great benefit, as it gave the team the ability to quickly tear-down and rebuild an
entire region’s worth of infrastructure in less than twenty minutes.

Going forward, as development teams prepare for multi-region deployments, that same ability will enable them 
to extend the platform globally. The immediate benefit of this approach was the relative simplicity with which 
developers could create their own **sandbox** environment that mirror production, simply by executing the appropriate 
Terraform module with a new set of parameters. Furthermore, the team was able to leverage the ability of module reuse 
to deploy Kubernetes clusters in a blue/green fashion to simplify maintenance and future-proof against 
incompatibilities in version upgrades. When cluster upgrades are necessary, they can simply provision a new 
Kubernetes cluster, run the CI/CD pipelines against it, and then cut over **DNS CNAMEs**.

#### Improved agility at a fraction of the cost
The migration to Cloud has been a transformational experience for the client, the benefits have been described 
as *constant.* In addition to a marked improvement in performance to end users, the client has also experienced 
performance gains, as well as improvements in down time. With every application now migrated over, considerable 
cost savings were noted, particularly around the shutdown of the data centers.   

Perhaps most importantly, the client team felt the impact of migrating “the right way.” In leveraging the experts, 
they saw scalability, as well as increased availability and resiliency through AWS’ multi-AZ platform, at a fraction 
of previous cost. While there’s still room to optimize, the client noted that Onica, a Rackspace TEchnology company, 
has been vital to the experience and process.

    *We tried multiple vendors, but Onica came out ahead of the others Often when you sign contract, you talk to the A-team, 
    but have the C-team working with you. With Rackspace Onica, we got the A-team. Everyone did outstanding work. It was good to have cloud experts to help advance and educate our team internally.*&mdash;a Cloud architect on the project.

Click here to view [The Rackspace Cloud Terms of Service](https://www.rackspace.com/cloud/legal/).

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
