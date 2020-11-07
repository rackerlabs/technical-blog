---
layout: post
title: "Single sign on and role based access control are coming to objectrocket"
date: 2020-11-09
comments: true
author: Steve Croce 
authorAvatar:  'https://gravatar.com/avatar/56d03e2d0f853cff39c129cab3761d49'
bio: "As Senior Product Manager for the ObjectRocket Database-as-a-Service
offering and Head of User Experience for ObjectRocket, Steve oversees the
day-to-day planning, development, and optimization of ObjectRocket-supported
database technologies, clouds, and features. A product manager by day, he still
likes to embrace his engineer roots by night and develop with Elasticsearch,
SQL, Kubernetes, and web application stacks. He's spoken at
KubeCon + CloudNativeCon, OpenStack summit, Percona Live, and various Rackspace
events."
published: true
authorIsRacker: true
categories:
    - Database
    - ObjectRocket
metaTitle: "Single sign on and role based access control are coming to objectrocket"
metaDescription: "."
ogTitle: "Single sign on and role based access control are coming to objectrocket"
ogDescription: "."
slug: "single-sign-on-and-role-based-access-control-are-coming-to-objectrocket"
canonical: https://www.objectrocket.com/blog/features/single-sign-on-and-role-based-access-control-are-coming-to-objectrocket/
---

*Originally published in Sep, 2019 at ObjectRocket.com/blog*

If you read the ObjectRocket blog, you’re likely aware that we have a brand new hosting platform launching this year. There are a number of big new features that we’ve already added and today I’d like to talk about our transition to a new authentication system for the new platform and some related changes.

<!--more-->

{{<img src="picture1.jpg" title="" alt="">}}

### The Path to Role-Based Access Control

When we started building this new platform, one of the features that we immediately set out to provide was Role-Based Access Control (RBAC). We’ve always allowed multiple users, with varying roles and permissions on our databases, but a common request is the same ability in our UI. Our customers told us they want to allow multiple people to log into the UI to manage databases, billing, and other aspects of the platform.
To close that gap and others, we decided to build the new platform on an all new authentication and authorization system. This new system allows us to support RBAC, Single Sign-On, Multi-factor Authentication, and even more in the future. We’re happy to roll out RBAC and SSO now, and additional features over the next few weeks and months.

#### What You Need to Know Today

With our new authentication flow, we now direct all sign-ins on the ObjectRocket website to our new [login](https://auth.objectrocket.cloud/login?state=g6Fo2SBjQzl4MFV1U0tobkhhbEJpc01sbnJfeXNvcGlid28ya6N0aWTZIHdKWlhHTUhqUVh3VU55NGJfM1liUXZ5dXY0NDNmWEZio2NpZNkgVFpENzVQcm55b1pBSUNtSjNSYjJHMEw4VkM0bzBib2M&client=TZD75PrnyoZAICmJ3Rb2G0L8VC4o0boc&protocol=oauth2&response_type=token%20id_token&nonce=5ae21d11-f7b4-4abd-aef1-bea93e238528&scope=openid%20email%20name&redirect_uri=https%3A%2F%2Fapp.objectrocket.cloud%2Fsession-callback&audience=https%3A%2F%2Fapi.objectrocket.cloud&_ga=2.20037051.223325436.1604418088-1358969005.1602515327&__hsfp=3796701661&__hstc=227540674.6c2da1a33c3f4e98dc8ac794308ed907.1602515328573.1604683041632.1604700167607.96&__hssc=227540674.1.1604700167607) (notice the .cloud). Our current login screen at [objectrocket.com](https://app.objectrocket.com) (notice the .com) still works as it always has, but it is just not linked from the home page. We made this change to ultimately simplify the login experience and standardize on a single login screen.

#### If You’re an Existing ObjectRocket Customer

You have a few options. The first, is to just bookmark https://app.objectrocket.com and continue to use that to log in as you always have. That experience will not change immediately, other than some added messaging about the new platform/login system. Your other option is to take advantage of **account linking** with the new login system. We provide **Single Sign-On** (SSO) between the new platform and the existing platform, so you can still get to your instances, while taking advantage of the features of the new platform.

Here’s how to kick off migration of your login to our new system (don’t worry, your databases remain exactly where they are):

+ Go to our new app at https://app.objectrocket.cloud
+ Log in with the email address associated with your existing ObjectRocket account and your usual password*
+ Create an organization on the new platform (this will just be used for RBAC later)

You’re Done! Your account has been migrated and you can now try out the new platform, and use SSO to manage your existing instances.

**NOTE:**  Our new login system requires email and password to log in (migration credentials), so we link your new login to our existing system based on the email address on your account. You can verify the email address on your account, in the UI.

#### The Service That Made it Happen

We’re pretty excited about our own new services, but there was a service behind the scenes that makes this all possible, and that’s **Auth0**. Like many customers, we went through the build vs. buy process for a number of the components in our new platform, and **Auth0** was the clear winner to build our new identity platform on. In addition to their massive number of customer references, and “Visionary” status on *Gartner’s Magic Quadrant*, they simply offered a secure platform that did everything we need.

One of those key capabilities that we’re using here is an automated migration process that allows us to migrate users from our existing auth system to our new Auth0-based system when they log in. Here’s a quick breakdown of how this works:

+ You enter your credentials at our new Auth0 powered login site.
+ The service checks if your login exists in our Auth0-based system, authenticate and log you in.
+ The service then checks if your login exists in our existing auth system. If so, we use the credentials you just provided to authenticate with the existing system, create an account on the new system and link it to the account in the existing system.
+ We log you in and enable SSO between the two user interfaces.

It’s that simple. It’s all a secure, streamlined, and ultimately supported process by our partner, **Auth0**.

### Greater Integration Coming

Soon we will be enabling even more integration between our two platforms. For now, you’ll need to use SSO to switch between our two user interfaces. However, within the next few months we will display all of your instances in the new interface and allow you to jump between interfaces, depending on which instance you’d like to manage. Beyond that, we will integrate the products even further to provide a seamless experience.
We’re excited to be rolling out so much new functionality, and look forward to getting you all on board and using our new technology. For more information about the changes coming to our login system, please see our documentation or reach out to our support team.

<a class="cta blue" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>

Click here to view [The Rackspace Cloud Terms of Service](https://www.rackspace.com/cloud/legal/).

View the [Rackspace Cloud Terms of Service](https://www.rackspace.com/cloud/legal/).







The following line shows how to add an image.  If you have no image, remove it.
If you have an image, add it to the post directory and replace the image name in the following line.



### Conclusion

<a class="cta purple" id="cta" href="https://www.rackspace.com/sap">Learn more about our SAP services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
