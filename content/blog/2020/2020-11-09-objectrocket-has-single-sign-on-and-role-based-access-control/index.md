---
layout: post
title: "ObjectRocket has single sign-on and role-based access control"
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
metaTitle: "title: "ObjectRocket has single sign-on and role-based access control"
metaDescription: "If you read the ObjectRocket blog, you’re likely aware that we have several new features in our platform, and today we'll talk about our new authentication system for the new platform and some related changes."
ogTitle: "title: "ObjectRocket has single sign-on and role-based access control"
ogDescription: "If you read the ObjectRocket blog, you’re likely aware that we have several new features in our platform, and today we'll talk about our new authentication system for the new platform and some related changes."
slug: "single-sign-on-and-role-based-access-control-are-coming-to-objectrocket"
canonical: https://www.objectrocket.com/blog/features/single-sign-on-and-role-based-access-control-are-coming-to-objectrocket/
---

*Originally published in Sep 2019 at ObjectRocket.com/blog*

If you read the ObjectRocket blog, you’re likely aware that we have several new features in our platform, and today we'll talk
about our new authentication system and some related changes.

<!--more-->

{{<img src="picture1.jpg" title="" alt="">}}

### The path to role-based access control

When we started building this new platform, one of the features we immediately set out to provide was Role-Based Access Control
(RBAC). We’ve always allowed multiple users with varying roles and permissions on our databases, but a common request is the same
ability in our UI. Our customers need to allow multiple people to log into the UI to manage databases, billing, and other aspects
of the platform. To close that gap and others, we decided to build the new platform on an all new authentication and authorization
system. This system allows us to support RBAC, single sign-on, multifactor authentication, and even more features. We’re happy to
have RBAC and SSO. We'll keep adding new features when we can.

#### What you need to know today

With our authentication flow, we direct all sign-ins on the ObjectRocket website to our new [login](https://auth.objectrocket.cloud/login?state=g6Fo2SBjQzl4MFV1U0tobkhhbEJpc01sbnJfeXNvcGlid28ya6N0aWTZIHdKWlhHTUhqUVh3VU55NGJfM1liUXZ5dXY0NDNmWEZio2NpZNkgVFpENzVQcm55b1pBSUNtSjNSYjJHMEw4VkM0bzBib2M&client=TZD75PrnyoZAICmJ3Rb2G0L8VC4o0boc&protocol=oauth2&response_type=token%20id_token&nonce=5ae21d11-f7b4-4abd-aef1-bea93e238528&scope=openid%20email%20name&redirect_uri=https%3A%2F%2Fapp.objectrocket.cloud%2Fsession-callback&audience=https%3A%2F%2Fapi.objectrocket.cloud&_ga=2.20037051.223325436.1604418088-1358969005.1602515327&__hsfp=3796701661&__hstc=227540674.6c2da1a33c3f4e98dc8ac794308ed907.1602515328573.1604683041632.1604700167607.96&__hssc=227540674.1.1604700167607). Our current login screen at [objectrocket.com](https://app.objectrocket.com) still works as it always has, but we didn't
link it to the home page. We changed this to simplify the login experience and standardize on a single login screen.

#### If you’re an existing ObjectRocket customer

You have a few options. The first is to bookmark https://app.objectrocket.com and continue to use that to log in as you always
have. That experience will not change, except for some messaging about the new platform and login system. Your other option is
to take advantage of **account linking** with the new login system. We provide **Single Sign-On** (SSO) between the new platform
and the existing platform, so you can get to your instances while taking advantage of the features of the new platform.

Here’s how to kick off the migration of your login to our new system (don’t worry, your databases remain exactly where they are):

+ Go to our new app at https://app.objectrocket.cloud.
+ Log in with the email address associated with your existing ObjectRocket account and your usual **password**.
+ Create an organization on the new platform (this is for use with RBAC later).

You’re done! Your account was migrated. You can now try out the new platform and use SSO to manage your existing instances.

**NOTE:**  Our new login system requires **email** and **password** to log in (migration credentials), so we link your new
login to our existing system based on the email address on your account. You can verify the email address on your account in the UI.

#### The service that made it happen

We’re pretty excited about our new services, but a service behind the scenes makes this all possible&mdash;**Auth0&reg;**. Like many
customers, we went through the build vs. buy process for a number of the components in our new platform, and **Auth0** was the clear
winner to build our new identity platform on. In addition to their massive number of customer references and “Visionary” status on
*Gartner’s Magic Quadrant*, they simply offered a secure platform that did everything we need.

One of the key capabilities we use is an automated migration process that allows us to migrate users from our existing auth system to
our new **Auth0-based system** when they log in. Here’s a quick breakdown of how this works:

+ Enter your credentials at our new **Auth0** powered login site.
+ Authenticate your user information and log in to our **Auth0-based system**.
+ Create an account on the new system and link it to the account in the existing system. The service then verifies that your login
exists in our existing auth system. If it does, we use the credentials you just provided to authenticate with the existing system.
+ Log in and enable **SSO** between the two user interfaces.

The process is simple, secure, streamlined, and ultimately supported by our partner, **Auth0**.

### Greater integration coming

We continue enabling even more integration between our two platforms. For now, use SSO to switch between our two user interfaces.
However, we're planning to display all of your instances in the new interface and allow you to jump between interfaces, depending
on which instance you’d like to manage. We'll integrate the products even further to provide a seamless experience.

We look forward to getting you all on board and using our technology. For more information about the changes coming to our login
system, see our documentation or reach out to our support team.

<a class="cta blue" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>

Visit [www.rackspace.com](https://www.rackspace.com) and click **Sales Chat**
to help achieve adoption within your business.

Use the Feedback tab to make any comments or ask questions.

Click here to view [The Rackspace Cloud Terms of Service](https://www.rackspace.com/cloud/legal/).

View the [Rackspace Cloud Terms of Service](https://www.rackspace.com/cloud/legal/).
