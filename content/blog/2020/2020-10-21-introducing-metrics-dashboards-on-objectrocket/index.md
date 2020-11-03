---
layout: post
title: "Introducing metrics dashboards on ObjectRocket"
date: 2020-10-21
comments: true
author: Steve Croce
authorAvatar: 'https://gravatar.com/avatar/56d03e2d0f853cff39c129cab3761d49'
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
metaTitle: "Introducing metrics dashboards on ObjectRocket"
metaDescription: "Maintaining an accurate picture of what’s going on with your data store and what impact your latest
application changes are having on the performance of your database is incredibly important."
ogTitle: "Introducing metrics dashboards on ObjectRocket"
ogDescription: "Maintaining an accurate picture of what’s going on with your data store and what impact your latest
application changes are having on the performance of your database is incredibly important."
slug: "introducing-metrics-dashboards-on-objectrocket"
canonical: https://www.objectrocket.com/blog/features/introducing-metrics-dashboards-on-objectrocket/

---

*Originally published on September 9, 2019, at ObjectRocket.com/blog*

Our mission at Rackspace ObjectRocket is to put our customers’ databases on autopilot, so you don’t have to worry
about your data and focus on building great apps. However, even if your database is on autopilot, maintaining system
[observability](https://en.wikipedia.org/wiki/Observability) is still an important goal.

<!--more-->

{{<img src="picture1.jpg" title="" alt="">}}

Maintaining an accurate picture of what’s going on with your data store and what impact your latest application changes
are having on the performance of your database is incredibly important.

That’s why we launched our brand new metrics dashboards on our CockroachDB&reg;, PostgreSQL&reg;, and Elasticsearch&reg;
products on our new platform!

#### What you get

The first thing you’ll notice when you log into [ObjectRocket’s Mission Control](https://auth.objectrocket.cloud/login?state=g6Fo2SBadl9zaERaU1k4MUlySDRIaGlzYWZOX3o2ckhqQU1lN6N0aWTZIEMzbFBlRzJYemFTOW5GRUJlb3N0aVpFZl9FaDluczRpo2NpZNkgVFpENzVQcm55b1pBSUNtSjNSYjJHMEw4VkM0bzBib2M&client=TZD75PrnyoZAICmJ3Rb2G0L8VC4o0boc&protocol=oauth2&response_type=token%20id_token&nonce=1a22dfa6-b4c5-4cd3-a163-4f73c636eec8&scope=openid%20email%20name&redirect_uri=https%3A%2F%2Fapp.objectrocket.cloud%2Fsession-callback&audience=https%3A%2F%2Fapi.objectrocket.cloud&_ga=2.196728172.1797400172.1603119104-1358969005.1602515327&__hsfp=176983327&__hstc=227540674.6c2da1a33c3f4e98dc8ac794308ed907.1602515328573.1603223520983.1603224339200.24&__hssc=227540674.1.1603224339200) is that we have a Grafana&reg; Metrics option in the main menu.

{{<img src="picture2.png" title="" alt="">}}

Click the Grafana Metrics icon to open a new browser window and log into a hosted [Grafana](https://github.com/grafana/grafana)
server by using single-sign-on, where you can see metrics dashboards for all of your instances on our new ObjectRocket platform.

{{<img src="picture3.gif" title="" alt="">}}

With Grafana, as part of your Rackspace ObjectRocket subscription, you get:

* Single-sign-on between Mission Control and Grafana
* Dashboards with key metrics for all of your ObjectRocket instances
* All your metrics in one place
* Unlimited metrics retention

What better way to appreciate the value of these metrics than to see it for yourself! So, go sign up at 
[ObjectRocket](https://app.objectrocket.cloud), create an instance, and check it out today! To learn  a little
more about how we did it and what we’re looking at next, read on.

#### How we did it

At ObjectRocket, we’ve always leaned on comprehensive metrics to help us manage and maintain our customers’ data
stores. For those metrics, we’ve been heavy users of [Prometheus](https://prometheus.io). Every instance that we
manage exports metrics to local Prometheus servers that our support teams use to monitor and diagnose datastore issues. 

Though we have a wealth of data internally, our customers commonly request access to the same metrics we use. When we
started building our new platform, we set out to deliver on that request. To get there, we solved a few problems that
Prometheus doesn’t: retention, global queries, and multi-tenancy.

To solve _retention_ and _global queries_, we turned to the open-source project, [Thanos](https://thanos.io). Thanos enables
you to query across our global fleet of Prometheus servers by using a single endpoint, compact our older data to manage
storage, and provide unlimited retention. It was the ideal solution, and it’s worked perfectly.

Multi-tenancy posed a different challenge. Grafana, our preferred front-end for dashboards, supports multi-tenancy out of
the box, but Prometheus doesn’t. We developed a solution to fill that gap. We call it **prometheus-filter-proxy**, and it
allows us to filter only the data that belongs to the user performing the query.

Along with our platform, we have all the pieces we need to provide metrics to our customers. Though we just touched on the
overall architecture described in this post, we're planning follow-up content that goes into a little more depth on the
architecture, challenges we faced, and decisions we made along the way. Stay tuned.

#### What's next

This metrics feature addresses a huge request from our customers, but there’s still more on the way! Another feature is a
subset of these metrics displayed in our new control panel, [Mission Control](https://auth.objectrocket.cloud/login?state=g6Fo2SAwLS1RaW1nazNPQXlMMEJxTkYtd2R1Z1kyS0lrSkNlcKN0aWTZIGdQaWN0SFVYdEwxZTEwLVZHY0FwVHVVb0xGUmdTTjVYo2NpZNkgVFpENzVQcm55b1pBSUNtSjNSYjJHMEw4VkM0bzBib2M&client=TZD75PrnyoZAICmJ3Rb2G0L8VC4o0boc&protocol=oauth2&response_type=token%20id_token&nonce=e25ea0e9-7b40-4bca-89f0-85c766d88d5f&scope=openid%20email%20name&redirect_uri=https%3A%2F%2Fapp.objectrocket.cloud%2Fsession-callback&audience=https%3A%2F%2Fapi.objectrocket.cloud&_ga=2.173054691.1797400172.1603119104-1358969005.1602515327&__hsfp=176983327&__hstc=227540674.6c2da1a33c3f4e98dc8ac794308ed907.1602515328573.1603223520983.1603224339200.24&__hssc=227540674.1.1603224339200). Though you’ll go to Grafana to do deeper metrics analysis, we’re putting the top metrics in Mission Control
so you can get a quick overview of your instances. We're also adding additional configurability and dashboard controls in
Grafana. So, once again, sign up and check it out today!

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
