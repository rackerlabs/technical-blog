---
comments: true
date: 2012-10-15 14:18:51
layout: post
title: Rackspace announces Open Cloud SDKs
author: Wayne Walls
categories:
- Cloud Files
- Cloud Servers
- OpenStack
---

Since Rackspace's cloud is based, in large part, on the [OpenStack](http://openstack.org) suite of open-source cloud services, each service provides an [application programming interface](http://en.wikipedia.org/wiki/Application_programming_interface) (API) so that these services can be controlled programmatically. To assist developers, Rackspace is providing a set of [software development kits](http://en.wikipedia.org/wiki/Software_development_kit) (SDKs) for working with these APIs in specific programming languages. These SDKs each provide a set of API bindings so that programmers do not have to use the REST API directly. In addition, the SDK's behavior is familiar to the users of that language. Each SDK also provides documentation to help users get started with it, along with tested, working sample code that developers can use for their applications today!

<!-- more -->

The first two SDKs available are for Java and PHP. The Rackspace Cloud SDK for Java leverages the popular [jclouds](http://www.jclouds.org/) open-source library. It has full support for OpenStack Nova ([Rackspace Cloud Servers](http://www.rackspace.com/cloud/public/servers/)) and OpenStack Swift ([Rackspace Cloud Files](http://www.rackspace.com/cloud/public/files/)). The Rackspace Cloud SDK for PHP uses the Rackspace-developed [php-opencloud](https://github.com/rackspace/php-opencloud) library, which supports Nova, Swift, Rackspace Cloud Networks (preview access), and [Rackspace Cloud Databases](http://www.rackspace.com/cloud/public/databases/).

You can get more details on these SDKs, as well as download links for the release packages, at [http://docs.rackspace.com/sdks/guide/content/intro.html](http://docs.rackspace.com/sdks/guide/content/intro.html).

Both of these SDKs are open-source and open to public contributions; if you're a developer and interested in adding support for other providers or services, feel free to contribute. Rackspace is working on extending the SDK support to the remainder of our cloud products as well as producing SDKs supporting other languages such as Python and Ruby.

Rackspace is excited to be involved in these open SDK communities, and is dedicated to improving the developer experience for everyone who wishes to build on open clouds.  We look forward to collaborating with you and
continuing to deliver world class SDKs that allow you to do more, faster; build applications that change the world; and put you in the driver's seat to do great things personally or for your business(es).
