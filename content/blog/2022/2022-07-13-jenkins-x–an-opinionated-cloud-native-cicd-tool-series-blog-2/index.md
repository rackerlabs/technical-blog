---
layout: post
title: "Jenkins X – An opinionated cloud native CI/CD tool (series blog-2)"
date: 2022-07-13
comments: true
author: Bachu Paul
authorAvatar: 'https://www.gravatar.com/avatar/65c3fbe49be4b7c3bc5269c45460a22a'
bio: ""
published: true
authorisRacker: true
categories: 
- Automation
- Jenkins-X

metaTitle: "Jenkins X – An opinionated cloud native CI/CD tool (series blog-2)"
metaDescription: "As per GitHub official documentation, Organizations are shared accounts where businesses and open-source projects can collaborate across many projects at once."
ogTitle: "Jenkins X – An opinionated cloud native CI/CD tool (series blog-2)"
ogDescription: "As per GitHub official documentation, Organizations are shared accounts where businesses and open-source projects can collaborate across many projects at once."
slug: "jenkins-x-an-opinionated-cloud-native-ci-cd-tool-series-blog-2" 

---

### Introduction

_Note_: *This blog is part 2 of a series of blog on Jenkins-X. For the First Article:* [Refer Here](https://docs.rackspace.com/blog/creating-a-kubernetes-cluster-on-aws-eks/)


As per [GitHub official documentation](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/about-organizations), Organizations are shared accounts where businesses and open-source projects can collaborate across many projects at once. Owners and administrators can manage member access to the organization's data and projects with sophisticated security and administrative features. 

<!--more-->

### Steps to create a Github Organization and bot user accounts

#### Create a Github Organization 

Log-in to your existing GitHub account with your credentials.

[Creating a Kubernetes Cluster on AWS EKS](https://docs.rackspace.com/blog/creating-a-kubernetes-cluster-on-aws-eks/)


On the top right corner click on your avatar and then go to **Your organizations**. Click on **New Organization**

<img src=Picture1.png title="" alt="">

Select to **Create a free organization** plan then give organization account a name and your contact email. Organization name should be unique.

Solve the generated puzzle to verify yourself as human, accept the terms & conditions and click on **Next**.

<img src=Picture2.png title="" alt="">

In next step you need to add your existing GitHub account and then click on **Complete Setup**, or you can click on **Skip this step**.

<img src=Picture3.png title="" alt="">

### Create a GitHub Bot account

Now create a new GitHub user that will act as a bot account.

<img src=Picture4.png title="" alt="">

Ensure you give unique username to the above webpage. Choose default in all the upcoming webpages and one new GitHub user will be created.

### Create personal access token for your new bot user

Make sure you are signed in with your new bot account and then click on this [link](https://github.com/settings/tokens/new?scopes=repo,read:user,read:org,user:email,admin:repo_hook,write:packages,read:packages,write:discussion,workflow).
It will ask for the following scopes. Give a suitable **Note** and **Expiration**. Finally click on **Generate token**. *Save this token carefully, it may be used during other git operations*.

<img src=Picture5.png title="" alt="">

### Add bot user to your GitHub organization

Go to your GitHub organization account and click on **Invite someone**

<img src=Picture6.png title="" alt="">

Enter your bot account name and click on **Invite**

Add your bot account as owner in your git organization account and click on send invitation.

You will get an invitation link in your bot account's registered email. Accept the invitation and your bot account is added to your GitHub organization account.











### Conclusion
This bot account can be used by any program such as Jenkins X to manage your repositories in your GitHub organization on your behalf. To create an Elastic Kubernetes Cluster (EKS), [click here](https:/docs.rackspace.com/blog/creating-a-kubernetes-cluster-on-aws-eks/) to read my previous blog.  


<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
