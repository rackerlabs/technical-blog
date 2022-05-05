---
layout: post
title: "Reducing deployment process execution time in GCP"
date: 2022-05-05
comments: true
author: Anka Rao Ambepalli
authorAvatar: 'https://secure.gravatar.com/avatar/0b7d874d1ea3632a745e612bcb4eca3a'
bio: "[19:41] Anka Rao Ambepalli
I have total of 8 years experience in IT industry. I have good exposure to Bigdata and cloud technologies. Extensively worked on creating data pipelines in airflow and have good data analytics skills."
published: true
authorIsRacker: true
categories:
    - Google Cloud Platform
    - DevOps
metaTitle: "Reducing deployment process execution time in GCP"
metaDescription: "Google Cloud gives a developer the platform to DIY. That is a key differentiator when we compare GCP with the current Public Cloud provider market leader AWS."
ogTitle: "Reducing deployment process execution time in GCP"
ogDescription: "Google Cloud gives a developer the platform to DIY. That is a key differentiator when we compare GCP with the current Public Cloud provider market leader AWS."
slug: "reducing-deployment-process-execution-time-in-gcp"

---

*“Perfect software doesn’t exist. No one in the brief history of computing has ever written a piece of perfect software”*
-	Andrew Hunt, The Pragmatic Programmer


<!--more-->

Google Cloud gives a developer the platform to DIY. That is a key differentiator when we compare GCP with the current Public Cloud provider market leader AWS. The hands-on developers crave to work on GCP to work their way ahead with value additions and innovations. It is rewarding for a developer if they do innovations in code that significantly increase value for the end customer.
Talking about the code, its life cycle reaches the ultimate test when it is to be deployed in the live environment. On the GCP, we can use the Cloud Build process for the movement of code from lower to higher environment to finally reach the production environment. In this blog, I have discussed how to bring down the deployment computation and improve the overall process in Cloud Build. I hope it appeals to developers and architects alike. The steps are elementary, yet effective.


### Introduction to Cloud Build:

Cloud Build is a serverless CI/CD platform provided on GCP on the pay what you use pricing model. It provides a fast automated movement of code using in-built integration to GKE, App Engine, Cloud Functions, and Firebase. I recommend using the following [link](https://cloud.google.com/build/docs/quickstarts) for those who want to get started quickly.

### Pre-existing configuration:

Like many of its services, GCP gives developers the option to use configuration files to do things in Cloud Build. When I joined the Site Reliability team, I studied the existing process designed in Cloud Build for deploying code to production:

<img src=Picture1.png title="" alt="">

The configuration file in use, a YAML file, has steps to move different pieces of code to production as shown in the following snapshot–

<img src=Picture2.png title="" alt="">

If we dig deep in the above YAML file, it is copying code objects from Google Storage buckets such as dags, plugins, bigquery, etc. Later, it calls a shell script that compiles the code based on the resolved value of the environment variable. The entire process is timebound else the process fades out after a defined time.

### Pragmatic issues:

There are a few issues that I found in the code- 

#### 1.	Lines to compute will rise with time

The first issue can be seen as each time we were moving ALL pieces of code from the lower environment and processing it. That implies that already executing code has been built again. With the passage of time, the codebase will naturally increase thereby increasing the build time.


#### 2.	Cumbersome debugging

Secondly, effective debugging will be a challenge in log files of code whose size keeps on increasing. 


#### 3.	Error Logging

This is necessary for each code but was missing above.

To solidify my thought process, I went through the Cloud Build process logs and duration. Here are the statistics that the process had then –

<img src=Picture3.png title="" alt="">

One can see that on an average, each process ran for almost an hour. As stated above, time was getting wasted so much so that the timeout value of code had to be increased from 3600 to 5000 seconds. Thirdly, developers and testers alike had to wait endlessly for the deployment to be complete to move the next piece of code to production. Lastly, if a build process failed, then our team had a tough time in debugging the code.

### Remediation Steps:

*“Everything can be improved”*

I implemented a new process, wherein:

1.	A new text file is used for capturing “only those files” that need to be moved from lower to higher environment. Refer to line 5 which mentions .seq file. This .seq file has the repo path of the code to be moved. The developer needs to update this file each time with only the paths of the required objects to be moved to the next environment.

2.	In the deployment shell script that was present in the above build process, now points to this text file.

3.	In case of the Cloud Build process failure, a new section has been added to capture the error and show them on the screen for the developer’s reference for further debugging. Refer to lines 12 -14 to understand if the process failed. And refer to lines 17 -24 for capture and display of error logs.


_Here is the modified shell script for reference –_

<img src=Picture4.png title="" alt="">

### Affirmative Consequences:

1. Deployment time has drastically reduced from what was touching **almost an hour** to a **couple of minutes** now.

2. Deployment Script has enabled to show only the error messages for the list of failed objects at the end of the log. This has eased debugging in the case of deployment failures. 

Here is the screenshot of recent deployments which happened within 2 minutes mostly –

<img src=Picture5.png title="" alt="">

### Conclusion

On a concluding note, you can reduce your deployment time from hours to minutes just by enabling the feature of adding a sequence file to read all your deployment objects and set debugging options to show only error messages of failed objects. All this makes the life of both the developer and tester easier. A very simple technique, yet effective when implemented.


<a class="cta red" id="cta" href="https://www.rackspace.com/hub/modern-cloud-applications">Let our experts guide you on your cloud-native journey.</a>

<a class="cta red" id="cta" href="https://www.rackspace.com/cloud/google-cloud">Let our experts guide you on your Google Cloud journey.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
