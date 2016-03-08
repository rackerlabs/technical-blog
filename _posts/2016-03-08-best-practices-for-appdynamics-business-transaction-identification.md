---
layout: post
title: "Best Practices for AppDynamics Business Transaction Identification"
date: 2016-03-08 23:59
comments: false
author: Josh Mattson
published: true
authorIsRacker: true
authorAvatar: 'http://www.gravatar.com/avatar/791617263c70278859e1b26c15d13eab'
categories:
    - DevOps
---

[AppDynamics](https://www.appdynamics.com/) is a powerful Application Performance Management tool that, properly configured, can provide tremendous insight in to application and infrastructure performance bottlenecks and enable operations and development teams to rapidly identify and resolve issues.  Though AppDynamics will begin working to collect and measure application performance data out of the box, some configuration and customization is necessary in order to reach its full capabilities.  This guide will explain and clarify best practices around how to identify your application's critical Business Transactions in order to get the most out of AppDynamics and ultimately, the most out of your application and infrastructure.

<!-- more -->

### Best Practices Derived from Years of Experience

Through years of experience utilizing AppDynamics to support hundreds of varying  customer applications, the Rackspace [Critical Application Services](https://www.rackspace.com/en-us/enterprise-cloud-solutions/critical-applications) team of Application Support Engineers have developed a streamlined way to quickly identify, configure and start measuring the most important business transactions in any given application.

### Business Transactions Conceptualized

AppDynamics introduces several concepts that are important to grasp in order to ensure that you're getting the most relevant and actionable data including Business Applications, Tiers, Nodes and Business Transactions.  For this guide, we'll be focusing solely on Business Transactions.

In simple terms, a Business Transaction is the end to end process that is taken through your application to serve any given request.  When conceptualizing these transactions, it's best to think of them from a business or end-user perspective (e.g. What is the end-user doing when they execute this transaction?).  

### Identifying Critical Business Transactions

With the above information in mind, we can now start to identify our critical business transactions.  For example, in an eCommerce application, some critical transactions we'd want to measure might include:

* Home Page
* Browse
* Search
* Category Page
* Product Details
* Add to Cart
* Checkout

Depending on the scope of the application, it may be necessary to involve other teams and stakeholders within your business to ensure that all critical paths through the application have a Business Transaction defined within AppDynamics.

![Sample Business Transactions in AppDynamics]({% asset_path 2016-03-08-best-practices-for-appdynamics-business-transaction-identification/appdynamics_business_transactions.png %})

As you can see in the image and examples provided above, when naming Business Transactions in AppDynamics, it's important to name them in a conversational way.  For example, we may be defining a business transaction based on the servlet's entry URI (e.g. /store/browse/cat), but this would typically be a poor name for a transaction.  Instead, think if you noticed an issue in the application at 2:00 AM and needed to call a teammate to look in to the issue.  Would you say 'We're having an issue with category pages not serving properly' or would you say 'We're having an issue with _slash store slash browse slash cat_'?  

As a final word of caution, we need to be cognizant of the fact that AppDynamics's primary purpose is to further development efforts and/or troubleshoot performance issues during load tests or P1 production issues.  Often, when implementing AppDynamics in a new application, we may see what appears to be 60-100+ transactions identified as critical.  It may be counter-intuitive at first, but it's important to try to limit the number of Business Transactions as having too many can cause confusion for users, excessive overhead on your application, can potentially cause AppDynamics to miss out on correlating information and generally muddy the waters if transactions are *too* granular.  Ideally, we should aim for no more than 10-20 critical business transactions per tier.  Of course, there are always exceptions to rules, but this is a good one to keep in the back of your mind as you go through this process.

Once this process is complete, we should have a solid list of the most important Business Transactions that need to be configured and profiled in order to provide us with the most appropriate and actionable data.
