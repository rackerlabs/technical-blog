---
layout: post
title: "Unlimited Jenkins Slaves in 5 Quick Steps"
date: 2014-01-17 11:20
comments: true
author: Max Lincoln
published: true
categories:
- Jenkins
- jclouds
- Deployments
---

Have you ever noticed long build queuing times in Jenkins?  If you have long builds and few executors, you can spend more time waiting for resources than actually testing.  If you have an existing Jenkins setup, take a look at the [ClusterStats Plugin](https://wiki.jenkins-ci.org/display/JENKINS/ClusterStats+Plugin) to keep an eye on this problem.

Fortunately Rackspace makes it easy to quickly get more resources when you need them, and decommission them when you don't.  This guide will show you how to quickly setup a new Jenkins instance and configure it to quickly provision unlimited slaves with the [Jenkins jclouds plugin](https://wiki.jenkins-ci.org/display/JENKINS/JClouds+Plugin).

<!-- more -->

## Step 1 - Create a Jenkins Deployment

We showed you how to install Jenkins in [Continuous Integration and Rackspace, Part 1](http://developer.rackspace.com/blog/continuous-integration-part-1.html), but now it's even easier.  Just go to your Cloud Control Panel and choose to "Create Deployment":

{% zoomable_img 2013-11-27-unlimited-jenkins-slaves-in-5-quick-steps/create_deployment.png Click Create Deployment %}
{% zoomable_img 2013-11-27-unlimited-jenkins-slaves-in-5-quick-steps/choose_jenkins.png Choose the Jenkins blueprint %}
{% zoomable_img 2013-11-27-unlimited-jenkins-slaves-in-5-quick-steps/no_slaves.png Set Additional Nodes to 0 %}
{% zoomable_img 2013-11-27-unlimited-jenkins-slaves-in-5-quick-steps/save_passwords.png When the deployment completes, save the generated passwords. %}
{% zoomable_img 2013-11-27-unlimited-jenkins-slaves-in-5-quick-steps/grab_ip.png And copy the IP address of the new Jenkins server. %}

Step 1 done!  You should find your Jenkins server at the IP you grabbed in the last step.

<div class="alert alert-info">
  <span class="label label-info">Pro tip:</span> While you're in the Cloud Control Panel, now might be a good time to setup a DNS entry and a load-balancer for SSL termination.
</div>

## Step 2 - Configure Apache jclouds

Now that you've got a Jenkins server, we just need to configure it to provision slaves via jclouds.

{% zoomable_img 2013-11-27-unlimited-jenkins-slaves-in-5-quick-steps/manage_jenkins.png Navigate to Manage Jenkins then Configure System. %}

<div class="alert alert-info">
  <span class="label label-info">Pro-tip:</span> See that note that Jenkins is not secured?  This is probably a good time to <a href="http://developer.rackspace.com/blog/continuous-integration-part-2.html">secure Jenkins</a>.
</div>
{% zoomable_img 2013-11-27-unlimited-jenkins-slaves-in-5-quick-steps/add_cloud.png Hit Add a new Cloud and add jclouds. %}
{% zoomable_img 2013-11-27-unlimited-jenkins-slaves-in-5-quick-steps/complete_config.png Finish configuring jclouds. %}

<div class="alert alert-danger">
  <span class="label label-danger">Warning:</span> Make sure you use rackspace-cloudservers-us or rackspace-cloudservers-uk, <strong>not</strong> cloudserver-us or cloudservers-uk.
</div>

<div class="alert alert-danger">
  <span class="label label-danger">Warning:</span> The "Generate Key Pair" button wasn't working when we wrote this article, so we opened <a href="https://issues.jenkins-ci.org/browse/JENKINS-20996">JENKINS-20996</a>.  We recommend you manually generate a keypair with the instructions below.
</div>

You can generate a key on OSX or Linux with `ssh-keygen -t rsa -f jclouds_slaves`.  Then just copy the contents of jclouds_slaves to the RSA Private Key in Jenkins, and jclouds_slaves.pub to the Public Key.  If you need to connect to a running slave later, you'll be able to use this key.

Your jclouds connection should work now.  Hit "Test Connection" to make sure.

## Step 3 - Create a instance template

Next, we need to create an instance template that lets jclouds know what kind of hardware we want for our Jenkins Slaves.  I have been selecting an exact Hardware ID and Image ID to make sure I get exactly what I expected.

{% zoomable_img 2013-11-27-unlimited-jenkins-slaves-in-5-quick-steps/template.png Define the templates Image and Hardware. %}

Don't forget to hit Check Hardware ID and Check Image ID, just to be sure!

## Step 4 - Launch as many instances as you want

You can now quickly provision (and decomission) Jenkins slaves using jclouds!

It is possible to configure builds to create an instance just-in-time, but for this guide we're going to pre-provision the instances.

You'll find this by going back to Manage Jenkins, and then Manage Nodes.

{% zoomable_img 2013-11-27-unlimited-jenkins-slaves-in-5-quick-steps/provision.png Click Provision via jclouds - Rackspace, then the name of your template. %}

You will be able to see the instance building in the Rackspace Control Panel, but it won't show up in Jenkins until it is finished.

## Step 5 - Test!

Now, you just need to tell your build to use one of these instances, and you're done!

{% zoomable_img 2013-11-27-unlimited-jenkins-slaves-in-5-quick-steps/restrict_label.png In your build, set "Restrict where this project can be run" to the name of your template. %}

That's it for now.  You can can learn how to use the jclouds plugin for unlimited artifact storage in the [README](https://github.com/jenkinsci/jclouds-plugin/blob/master/README.md), or learn more about jclouds in the [Getting Started](http://jclouds.apache.org/documentation/quickstart/rackspace/) guide.
