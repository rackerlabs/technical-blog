---
layout: post
title: "Introduction to Redis Sentinel"
date: 2020-11-06
comments: true
author: Joe Engel
published: true
authorIsRacker: true
categories:
    - Databases
    - ObjectRocket
metaTitle: "Introduction to Redis Sentinel"
metaDescription: "[Redis&trade; Sentinel](https://redis.io/topics/sentinel) provides a simple and automatic **HA** (high availability) solution for Redis. "
ogTitle: "Introduction to Redis Sentinel"
ogDescription: "[Redis&trade; Sentinel](https://redis.io/topics/sentinel) provides a simple and automatic **HA** (high availability) solution for Redis. "
slug: "introduction-to-redis-sentinel"
canonical: https://www.objectrocket.com/blog/how-to/introduction-to-redis-sentinel/
---

*Originally published on Apr 28, 2015, at ObjectRocket.com/blog*

[Redis&trade; Sentinel](https://redis.io/topics/sentinel) provides a simple and automatic high availability (HA) solution for Redis.
If you’re familiar with how MongoDB&reg; elections work, this isn’t too far off. To start, you have a given *primary* replicating
to a certain number of *replicas*. From there, you have Sentinel daemons running, either on your application servers or the servers
on which Redis is running. These keep track of the primary’s health.

<!--more-->

{{<img src="picture1.png" title="" alt="">}}

### How it works

If a Sentinel detects a non-responsive primary, it broadcasts an `SDOWN` (subjectively down) message to the other sentinels. Then,
after it reaches a quorum that a primary is down, it broadcasts an `ODOWN` (objectively down) message and elects a new primary.
Because you need a quorum, or majority, of sentinels to agree to reach the `ODOWN` state, it’s always best practice to have an odd
number of sentinels running to avoid ties.

**Note:** We recommend using a version of Redis from the 2.8 branch or later for best performance with Sentinel.

Sentinels handle the failover by rewriting the configuration files on the running Redis instances. Let’s go through the following scenario:

Say we have a primary **A** replicating to replicas **B** and **C**. We have three sentinels (**s1**, **s2**, **s3**) running on our
application servers, which write to Redis. At this point, **A** (our current primary) goes offline. Our sentinels all see **A** as
offline and send `SDOWN` messages to each other. Then they all agree that **A** is down, so they set **A** to `ODOWN` status. From
here, an election happens to see who is most ahead, and in this case, they choose **B** to be the new master.

They modify the config file for **B** so that server no longer depends on any instances. Meanwhile, they modify the config file for
**C** rewrites so that it becomes a replica of **B** instead of **A**. From here, everything continues as normal. If **A** comes
back online, the sentinels will recognize this and rewrite the config file for **A** to be a replica of **B**, the current primary.

### Configuration

Sentinel configuration is straightforward, but choosingh where to place your Sentinel processes can be a complex decision. We
recommend running them on your app servers, if possible. Presumably, if you’re setting this up, you’re concerned about write
availability to your primary. As such, sentinels provide insight into whether your application server can talk to the primary.
You are, of course, welcome to run sentinels on your Redis instance servers, as well. 

The following example sentinel is from Redis 2.8.4 on Ubuntu&reg; 14.04, but it should work with any 2.8.x version of Redis.
We’ve taken the liberty of adding two lines to the top to give you practical examples:

    $ daemonize yes
    $ logfile /var/log/redis/redis-sentinel.log

These commands put the sentinel process in `daemonize` mode and log all messages to a log file instead of `stdout`. There are many
configurable options in here, and most are well documented. In this post, we focus on just two. The most important part is to tell
the Sentinels where your current primary resides. This is referenced in the following line:

    $ sentinel monitor mymaster 127.0.0.1 6379 2

This line tells the Sentinel to monitor `<myprimary>` (replace `<myprimary>` with a name of your choice) and a given IP on a given port.
Feel free to allocate as many sentinels as you need to meet a quorum for failover (the minimum is two). Be sure to use your primary IP
address and its port if it’s not running on the standard `port 6379`. 

Next, you might want to change the following line:

    $ sentinel down-after-milliseconds mymaster 30000

This is the amount of time you would like a sentinel to wait before it declares a primary in `SDOWN`. The default is 30 seconds. Feel free
to explore some of the other options. One that might interest you is the notification script if you like to keep track of failovers when
they happen.

After you have your `sentinel.conf` configured, start the daemon with the following command:

    $ redis-server /path/to/sentinel.conf --sentinel

#### Testing Failover

After you have all your sentinels online, you can do a dry-run for failover to make sure it’s all configured correctly.

First thing’s first. Connect to your Sentinel by using the `redis` command line:

    $ redis-cli -p 26379

If you want to receive some information about Sentinel, run the following command:

    $ 127.0.0.1:26379> INFO

This provides information such as who is the current primiary, how many replicas it has, and how many sentinels are monitoring it.
To test failover, run the following command:

    $ 127.0.0.1:26379> SENTINEL failover mymaster

This forces an `ODOWN` on the current primary and causes it to failover. Shortly after, if you rerun the `INFO` command, you
should see a new primary listed.

### Conclusion

Hopefully, this post has helped demystify Redis Sentinel and the failover process.

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>

Visit [www.rackspace.com](https://www.rackspace.com) and click **Sales Chat**
to help achieve adoption within your business.

Use the Feedback tab to make any comments or ask questions.

Click here to view [The Rackspace Cloud Terms of Service](https://www.rackspace.com/cloud/legal/).
