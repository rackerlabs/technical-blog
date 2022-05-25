---
layout: post
title: "Creating a Kubernetes cluster on AWS EKS"
date: 2022-05-24
comments: true
author: Bachu Paul
authorAvatar: 'https://secure.gravatar.com/avatar/65c3fbe49be4b7c3bc5269c45460a22a'
bio: ""
published: true
authorisRacker: true
categories: 
- AWS
- Jenkins
metaTitle: "Creating a Kubernetes cluster on AWS EKS"
metaDescription: "In this blog we will create a Kubernetes cluster in AWS with minimal steps. No to little knowledge of AWS is required to follow this blog."
ogTitle: "Creating a Kubernetes cluster on AWS EKS"
ogDescription: "In this blog we will create a Kubernetes cluster in AWS with minimal steps. No to little knowledge of AWS is required to follow this blog."
slug: "creating-a-kubernetes-cluster-on-aws-eks" 

---

**Jenkins X : An opinionated cloud native CI/CD tool (series blog-1)**

In this blog we will create a Kubernetes cluster in AWS with minimal steps. No to little knowledge of AWS is required to follow this blog.
<!--more-->

### Prerequisites:-
1.	You should have one AWS account. An AWS Free-Tier account is also good to follow this blog.
2.	Configure your aws cli with `aws configure` command by passing *AWS Secret Key ID* & *AWS Secret Access Key*. Enter your desired *AWS region* and *default output format.*

Create an AWS VPC with public and private subnets. Replace the *region-code* with any AWS region that is supported by AWS EKS(Elastic Kubernetes Service). Replace the name *my-eks-vpc-stack* with any name you like. 

`aws cloudformation create-stack \`

`  --region region-code \`

`  --stack-name my-eks-vpc-stack \`

--[template-url](https://amazon-eks.s3.us-west-2.amazonaws.com/cloudformation/2020-10-29/amazon-eks-vpc-private-subnets.yaml) 

Create an AWS IAM role to be assumed by your K8S cluster and add policies to that role. K8S cluster will make calls to other AWS services (like S3,ELB etc) on your behalf via this role.
To create a role, copy the below code to a file and name it as *eks_role.json*

`  "Version": "2012-10-17",`  
 
`  "Statement": [`
 
  `{`
 
  `    "Effect": "Allow",`
 
`      "Principal": {`
 
`        "Service": "eks.amazonaws.com"`
 
`      },`
`      "Action": "sts:AssumeRole"`
`    }`
`  ]`

`}`

Run below command to actually create the role in AWS account

`aws iam create-role \`

`  --role-name myAmazonEKSRole \`

`  --assume-role-policy-document file://"eks_role.json"`

Attach the required EKS managed policy to this role

`aws iam attach-role-policy \`

` --policy-arn arn:aws:iam::aws:policy/AmazonEKSClusterPolicy \`
 
 ` --role-name myAmazonEKSRole`

Open the AWS console at : https://console.aws.amazon.com/eks/home#/clusters  to create a  minimal EKS cluster

**NOTE:** Ensure you have chosen the desired region to create the EKS cluster.

You will see a similar webpage as below. 

<img src=Picture1.png title="" alt="">


Click on **Create Cluster**  and fill the form as below:
- **Name**: my-eks-cluster
- **Kubernetes Version**: 1.21 (give version as per your requirement by clicking on the drop down menu)
- **Cluster Service Role**: myAmazonEKSRole
- Click on **Next**
- **VPC**: my-eks-vpc-stack
- *Click on Next*
- Under **Configure Logging**, click on **Next**
- On the **Review and Create** page click on **Create**.
- It will take some time for the above EKS cluster to have status as Active.

Proceed ahead only after the EKS cluster is in active state.

Configure your workstation/laptop to send request to the newly created AWS EKS cluster
Give the _region-code_ same as where EKS cluster is provisioned above.

`aws eks update-kubeconfig --region region-code --name my-eks-cluster`

To verify you are able to communicate to EKS cluster from your workstation, run below command

`kubectl get svc`

You will see similar output.

<img src=Picture2.png title="" alt="" >

Create an IAM role that will be assumed by the EC2 nodes that will act as worker nodes in EKS cluster and attach the EKS managed policies to it.

Copy the below content in a file and name it *eks-node-group-role.json*

`{`

`  "Version": "2012-10-17",`

`  "Statement": [`

`    {`

`      "Effect": "Allow",`

`      "Principal": {`

`        "Service": "ec2.amazonaws.com"`

`      },`

`      "Action": "sts:AssumeRole"`

`    }`

`  ]`

`}`

Create the node IAM role

`aws iam create-role \`

`  --role-name myEKSNodeRole \`

`  --assume-role-policy-document file://"eks-node-group-role.json"`

Add required EKS  managed policies to above role

`aws iam attach-role-policy \`

`--policy-arn arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy \`

`  --role-name myEKSNodeRole`

`aws iam attach-role-policy \`

`  --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess \`

`  --role-name myEKSNodeRole`


`aws iam attach-role-policy \`

`  --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly \`

`  --role-name myEKSNodeRole`

`aws iam attach-role-policy \`

`  --policy-arn arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy \`

`  --role-name myEKSNodeRole`
**
In AWS Console go inside your EKS cluster *(my-eks-cluster),* then **Configuration**, then **Compute**, click on **Add Node group** (follow below snapshot)

<img src=Picture3.png title="" alt="">

Fill out the form with following details:
- **Name**: my-eks-node-groups (can give any name here)
- **Node IAM Role**: myEKSNodeRole
- click on **Next**
- On **Set compute and scaling configuration**, click on **Next**
- On **Specifying networking**, click on **Next**
- On **Review and Create** page, click on **Create**.
- It will take some time to come online these node groups.

To verify if your EKS cluster is running fine, run below command

`kubect get nodes`

You should see similar output.
<img src=Picture4.png title="" alt="">



<a class="cta purple" id="cta" href="https://www.rackspace.com/cloud/aws">Learn about Rackspace Managed AWS Services.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/cloud-native"> Learn about Rackspace Cloud Native Technologies.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).




