---
layout: post
title: "Introduction to redis sentinel"
date: 2020-11-06
comments: true
author: Joe Engel

published: true
authorIsRacker: true
categories:
    - Databases
    - ObjectRocket
metaTitle: "Introduction to redis sentinel"
metaDescription: "."
ogTitle: "Introduction to redis sentinel"
ogDescription: "."
slug: "introduction-to-redis-sentinel"
canonical: https://www.objectrocket.com/blog/how-to/introduction-to-redis-sentinel/
---

*Originally published on Apr 28, 2015, at ObjectRocket.com/blog*

[Redis Sentinel](https://redis.io/topics/sentinel) provides a simple and automatic **HA** (high availability) solution for Redis. If you’re familiar with how MongoDB&reg; elections work, this isn’t too far off. To start, you have a given **master** replicating to **N number** of **slaves**. From there, you have Sentinel daemons running, be it on your application servers or the servers Redis is running on. These keep track of the master’s health.

<!--more-->

{{<img src="picture1.png" title="" alt="">}}

### How it works

If a **Sentinel** detects that a master is non-responsive, it will broadcast an **SDOWN** (Subjectively down) message to the other sentinels. Then, once it reaches a quorum that a master is down, it broadcasts an **ODOWN** (Objectively down), and elects the new master. Since you need a quorum, or majority, of sentinels to agree to reach the ODOWN state, it’s always best practice to have an odd number of sentinels running to avoid ties.

**Note:** We recommend using a version of Redis from the 2.8 branch or higher for best performance with **Sentinel**.

Sentinels handle the failover by re-writing config files of the Redis instances that are running. Let’s go through a scenario:

Say we have a master “A” replicating to slaves “B” and “C”. We have three sentinels (s1, s2, s3) running on our application servers, which write to Redis. At this point, “A” (our current master), goes offline. Our sentinels all see “A” as offline and send SDOWN messages to each other. Then they all agree that “A” is down, so “A” is set to be in ODOWN status. From here, an election happens to see who is most ahead, and in this case, “B” is chosen as the new master.

The config file for “B” is set so that it is no longer dependent on any instances. Meanwhile, the config file for “C” rewrites so that it is no longer the slave of “A” but rather “B.” From here, everything continues as normal. Should “A” come back online, the sentinels will recognize this and rewrite the configuration file for “A” to be the slave of “B,” since “B” is the current master.

#### Configuration

Sentinels' configuration is straightforward, however, one of the most complex things is to choose where to place your Sentinel processes. We recommend running them on your app servers if possible. Presumably, if you’re setting this up, you’re concerned about write availability to your master. As such, sentinels provide insight into whether or not your application server can talk to the master. You are of course welcome to run sentinels on your Redis instance servers as well. 

This is an example sentinel found with Redis 2.8.4 on Ubuntu&reg; 14.04, but should work with any 2.8.x version of Redis. We’ve taken the liberty of adding two lines to the top to give you practical examples:

    $ daemonize yes
    $ logfile /var/log/redis/redis-sentinel.log

This puts the sentinel process in daemonize mode and logs all messages to a log file instead of `stdout`. There are a lot of configurable options in here, and most are commented on very well. However, for this post, we’ll focus on just two. The most important part is telling the Sentinels where your current master resides. This is referenced in this line:

    $ sentinel monitor mymaster 127.0.0.1 6379 2

This tells the Sentinel to monitor <mymaster> (this is an arbitrary name, feel free to name it as you see fit) and a given IP on a given port. Feel free to allocate how many sentinels it requires to meet a quorum for failover (the minimum being 2). The parts you will likely want to change here are the IP address of your master and its port if it’s not running on the standard `port 6379`. 

Next, you may want to change the following line:

    $ sentinel down-after-milliseconds mymaster 30000

This is the amount of time you would like a sentinel to wait before it declares a master in SDOWN. The default is 30 seconds. Feel free to take a look at some of the other options. One that may interest a lot of users is the notification script if you like to keep track of failovers when they happen.

Once you have your `sentinel.conf` configured as you see fit, start the daemon with the following command:

    $ redis-server /path/to/sentinel.conf --sentinel

#### Testing Failover

Once you have all your sentinels online, it’s possible to do a dry-run for failover to make sure it’s all configured correctly.

First thing’s first. Connect to your Sentinel via the redis command line:

    $ redis-cli -p 26379

If you’d like to receive some information about sentinel, simply run this command:

    $ 127.0.0.1:26379> INFO

This will give you information, such as who is the current master, how many slaves it has, and how many sentinels are monitoring it.
To test failover, simply execute:

    $ 127.0.0.1:26379> SENTINEL failover mymaster

This will force an ODOWN on the current master and cause a failover to happen. Shortly after, if you run the **INFO** command again, you should now see a new master listed.

### Conclusion

Hopefully, this has been helpful to demystify Redis and Sentinel. Should you have any questions at all, feel free to post below!

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>

Click here to view [The Rackspace Cloud Terms of Service](https://www.rackspace.com/cloud/legal/).






