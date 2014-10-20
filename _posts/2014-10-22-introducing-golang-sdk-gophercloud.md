---
layout: post  
title: "Introducing gophercloud: a golang OpenStack SDK"  
date: 2014-10-22 11:45  
comments: true  
author: Developer Experience Team  
published: true  
categories:
  - golang
  - sdk
  - gophercloud
---

In our constant strive to serve developers, we are proud to announce the initial public release of [gophercloud](https://github.com/rackspace/gophercloud/). gophercloud is a [Go](http://golang.org) OpenStack&trade;-first SDK with Rackspace specific support. What that means to you as a user is that you'll be able to use it with the Rackspace cloud out of the box; and as developer, it means that's readily extensible for other OpenStack cloud providers.

<!-- more -->

Initially gophercloud supports the following services:

 - Compute
 - Object Storage
 - Networking
 - Block Storage
 - Identity

and more [on the way](https://github.com/rackspace/gophercloud/pulls). 

Installing gophercloud is fairly straight forward. First, setup your `$GOPATH` environment variable to where you want to install gopher cloud:

```
 mkdir $HOME/go
 export GOPATH=$HOME/go
```
after that, you can install it with the following command:

```
 go get github.com/rackspace/gophercloud
```

from there on, you can follow the [getting started guides](https://gophercloud.io/docs/) to help you get up and running.

As with any of our other SDK's you can always email us, should you encounter any issues, have questions or suggestions at sdk-support@rackspace.com or at #rackspace channel on Freenode IRC.