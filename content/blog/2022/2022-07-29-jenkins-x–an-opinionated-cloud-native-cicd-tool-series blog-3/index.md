---
layout: post
title: "Install Jenkins X on AWS EKS cluster"
date: 2022-07-29
comments: true
author: Bachu Paul
authorAvatar: 'https://secure.gravatar.com/avatar/65c3fbe49be4b7c3bc5269c45460a22a'
bio: ""
published: true
authorIsRacker: true
categories:
    - Automation
    - DevOps
metaTitle: "Jenkins X – An opinionated cloud native CICD tool (series blog-3)"
metaDescription: "Install Jenkins X on AWS EKS cluster"
ogTitle: "Install Jenkins X on AWS EKS cluster"
ogDescription: "Install Jenkins X on AWS EKS cluster"
slug: "jenkins-x–an-opinionated-cloud-native-cicd-tool-series-blog-3"

---

This blog describes how to Install Jenkins X on AWS EKS cluster

<!--more-->

### Introduction

Jenkins X is an open-source tool that automates CI/CD workflow for cloud native apps on Kubernetes. It harnesses the power of Kubernetes and let its users use it without knowing internal working of Kubernetes. Jenkins X is a collection of some of the best of breed tools and microservices like [Kubernetes](https://kubernetes.io/), [Tekton](https://tekton.dev/), [Helm](https://helm.sh/), [Lighthouse](https://github.com/jenkins-x/lighthouse), [Terraform](https://www.terraform.io/), [Octant(UI)](https://octant.dev/), [Hashicorp Vault](https://www.vaultproject.io/), [Kaniko](https://github.com/GoogleContainerTools/kaniko), [Grafana](https://grafana.com/), [Prometheus](https://prometheus.io/), [kuberhealthy](https://github.com/kuberhealthy/kuberhealthy),  etc.

Before we proceed, please follow the prerequisites blogs which I wrote earlier [AWS-EKS-Cluster](https://docs.rackspace.com/blog/creating-a-kubernetes-cluster-on-aws-eks/) and [How to create Github organization and bot user accounts.](https://docs.rackspace.com/blog/jenkins-x-an-opinionated-cloud-native-ci-cd-tool-series-blog-2/)


### Create Jenkins X cluster git repo

Jenkins X provides a cluster git repository template for managing Jenkins X configuration. To change anything in your Jenkins X cluster, open a pull request to this repository. Fork this repository to your GitHub organization account by clicking on this [link](https://github.com/jx3-gitops-repositories/jx3-eks-vault/generate). 

<img src=Picture1.png title="" alt="">

The recommended approach to install Jenkins X is via terraform script that is provided by another git repository. Fork this repository into your GitHub organization account via this [link](https://github.com/jenkins-x/terraform-aws-eks-jx).

Now clone this repository into your local and open the project via your favorite IDE.

`cd terraform-aws-eks-jx/`

Open **outputs.tf** file and modify below parameter
*vault_user_id:*

*sensitive: true*

<img src=Picture2.png title="" alt="">

Also, open the **variables.tf** file and modify the following parameters:

cluster_name: 

  _default: “my-eks-cluster”_

profile:

  _default: “default”_

node_group_disk_size:

  _default: “20”_

vpc_name:

  _default: “my-eks-vpc-stack-VPC”_

public_subnets:

  _default: ["192.168.64.0/18", "192.168.0.0/18"]_

private_subnets:

  _default: ["192.168.128.0/18", "192.168.192.0/18"]_

vpc_cidr_block:

  _default: "192.168.0.0/16"_

is_jx2:

  _default: false_

jx_git_url:

  _default: (your-cluster-git-repo(jx3-eks-vault)_

jx_bot_username:

  _default: (your-new-bot-user)_

create_eks:

  _default: false_

create_vpc:

  _default: false_

vpc_id:
  _default: (vpc-id-of-eks-cluster)_

nginx_chart_version:
  _default: “3.12.0”_


<img src=Picture3.png title="" alt="">
<img src=Picture4.png title="" alt="">

Save GitHub bot user token as an environment variable

`export TF_VAR_jx_bot_token=<git-bot-user-token>`

To initialize terraform

`terraform init`

To see potential changes made by Terraform

`terraform plan`

To execute the install

`terraform apply`

When prompted for **provider.aws.region**, enter the AWS region where your EKS cluster is provisioned.
If the **terraform apply** command ran successfully then you will see similar output as below 

<img src=Picture5.png title="" alt="">

**Note: It can take up to 10 minutes to install Jenkins X.**

Verify Jenkins X installation

```
jx ns jx
kubectl get es -A
```

Expected output:

<img src=Picture6.png title="" alt="">

Check all pods are running in jx namespace
`kubectl get pods -n jx`

Expected output:

<img src=Picture7.png title="" alt="">

Another command to verify successful Jenkins X installation

`jx verify install`

Expected output:

<img src=Picture8.png title="" alt="">

To visualize Jenkins X installation and pipelines on UI, run this command. It will automatically open UI in a browser
`jx ui`

Expected output:

<img src=Picture9.png title="" alt="">

Verify ingress is working. Replace <hook-jx…> below with the value of hook’s HOSTS.

```
kubectl get ing -A
curl -v http://<hook-jx…>/hook 
```

Expected output:

<img src=Picture10.png title="" alt="">

### Troubleshooting Tips:

**TIP #1**
If _kubectl get es -A_ gives _404 status error_, it most likely means that the secret generation step in the boot log did not work. One way to re-generate secrets is by making a direct push to the main branch of the cluster git repo (not by creating a pull request).

<img src=Picture11.png title="" alt="">

<img src=Picture12.png title="" alt="">

To verify successful secret generation, check admin logs using the following command and select the latest log
`jx admin log`

Expected output:

<img src=Picture13.png title="" alt="">

**TIP #2**

If ingress controller is not working 
`curl -v http://<hook-jx…>/hook `
does not give a 200 status code then check your ingress controller pod (nexus-nexus-…) is running via kubectl get pods -n jx

<img src=Picture14.png title="" alt="">

Verify this ingress IP is same as Elastic Network Interface (ENI) public IPv4 of the Network Load Balancer (NLB) created during Jenkins X installation. 

### Conclusion

As you can see how easily we can tweak input variables as per our need in terraform script and run only one command *(terraform apply)* to create the entire Jenkins X cluster.
Now we can import our application git repository to this Jenkins X cluster and can create multiple pipelines.



<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql">Learn about Rackspace Managed SQL Databases.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).