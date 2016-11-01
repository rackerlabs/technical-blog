---
layout: post
title: "Install Jenkins on a Rackspace Server"
date: 2016-11-02 10:22
comments: false
author: Chris Hultin
published: true
categories:
    - DevOps
    - Jenkins
    - Orchestration
---

You can use the MyCloud Control Panel and the Orchestration service to create a new Rackspace server and install Jenkins in one step.

<!-- more -->

The following steps show you how to choose the correct Orchestration template to design and build a new server with Jenkins pre-installed.

# Log into MyCloud.rackspace.com.
# In the Quick Build panel on the home page, click on the 'From Template' option.
# Choose Jenkins from the selection list of available templates.
# Click the 'Actions' button and then choose 'Create Stack from Template'.
# Make sure 'Production' is selected in the Flavor box, and click the Create Stack button.
# Modify the default Stack Name and Region, as needed.
# Expand the Advanced Options section and make any changes to the Jenkins Admin E-mail, Worker(s) Flavor, Master Flavor, and Image.
# Update the Number of Secondary Servers to the starting number of work nodes that you need.
# Click on 'Create Stack'.  The stack creation process typically takes around 15 minutes to complete.

The following steps show how to update the number of workers after server creation.

# Install 'python-openstackclient' or 'python-heatclient', as well as any dependencies.
# Set the appropriate environment variables (for more information, see https://developer.rackspace.com/docs/cloud-orchestration/v1/getting-started/send-request-ovw/#using-the-heat-client)
# Run the following command, substituting your Stack Name for 'Jenkins-Stack' and the number of workers you want in the server_count parameter:
```
openstack stack update --existing --parameter server_count=3 Jenkins-Stack
```
# Wait for the stack to finish updating. You can view the status of the stack by using the MyCloud Control Panel and listing your servers or by running the command: `openstack stack list`.
