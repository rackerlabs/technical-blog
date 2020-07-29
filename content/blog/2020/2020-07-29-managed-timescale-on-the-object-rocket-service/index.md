---
layout: post
title: "Managed Timescale on the Object Rocket service"
date: 2020-07-29
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
metaTitle: "Managed Timescale on the Object Rocket service"
metaDescription: "Rackspace Technology is excited to add yet another data store
to the ObjectRocket platform in both AWS and GCP."
ogTitle: "Managed Timescale on the Object Rocket service"
ogDescription: "Rackspace Technology is excited to add yet another data store
to the ObjectRocket platform in both AWS and GCP."
slug: "managed-timescale-on-the-object-rocket-service"
canonical: https://www.objectrocket.com/blog/timescaledb/general-availability-of-managed-timescaledb-on-the-objectrocket-service/
---

*Originally published on May 4, 2020 at ObjectRocket.com/blog.*

Rackspace Technology is excited to add yet another general availability data
store to the ObjectRocket platform in both AWS&reg; and GCP&reg;.

<!--more-->

### Overview

{{<image src="Picture1.png" title="" alt="">}}

Whether or not you took advantage of our beta release earlier this year, as a
quick reminder, your hosted TimescaleDB&reg; instance comes with:

- Open-source TimescaleDB 1.6 with PostgreSQL&reg; 11 or TimescaleDB 1.7 with
  PostgreSQL 11 or 12
- Availability in multiple current and future AWS and GCP regions
- Managed backups with two-week retention and point-in-time recovery included
- Single node and high availability (master/replica) configurations
- Library of additional extensions available
- Configuration setting customization
- 24×7 support from Database engineers and DBAs included

[Go check it out now](https://app.objectrocket.cloud/?__hstc=227540674.237493f06c8469bbdd744e2136c94f41.1594921759572.1594921759572.1596024297433.2&__hssc=227540674.1.1596024297433&__hsfp=1923580540&_ga=2.165368445.317187064.1596024297-2061469802.1594921759)
with a free trial, or read on if you’d like to learn more about the best use
cases for TimescaleDB.

### Use cases

TimescaleDB is a time-series database. Quite simply, what that means is that it’s
optimized for and includes additional functions for data that has a time component.
When you’re dealing with data across the time dimension, TimescaleDB is faster
and easier to use than a standard SQL or NoSQL database.

To get more specific, here are a few common use cases where we see the most
interest in and advantage of using TimescaleDB.

#### Metrics and Prometheus data storage

The first and most common use case is storage and analysis of system and
application metrics. In any IT environment, it’s important to be able to quickly
and easily analyze the status and metrics for the infrastructure and services
in that environment. TimescaleDB can act as a key part of your monitoring
solution by providing the storage of metrics, a query language (SQL) that makes
it easy to analyze data, and an ecosystem of supported tools that help you
collect and visualize data.

When it comes to data collection, any tool that stores data in PostgreSQL or SQL
can work with TimescaleDB, but the TimescaleDB team has built support for
[Prometheus&reg;](https://prometheus.io/) and
[Telegraf&reg;](https://www.influxdata.com/time-series-platform/telegraf/)&mdashtwo
very popular options.

Prometheus is an extremely powerful metrics collection, query, alerting, and
analysis stack with tons of integrations with other tools. However, one of the
biggest gaps in Prometheus out of the box is the long term storage of metrics.
That’s where TimescaleDB steps in. TimescaleDB provides a
[PostgreSQL extension](https://github.com/timescale/pg_prometheus)
and [adapter](https://github.com/timescale/prometheus-postgresql-adapter) (soon
moving to [here](https://github.com/timescale/timescale-prometheus)) that allow
you to store and query your Prometheus data in TimescaleDB. From there, you’re
free to use any tools that plug into Prometheus for analysis, visualization, and
alerting. Or, you can use tools that directly interface with TimescaleDB instead.

Telegraf offers similar benefits by providing an agent with several integrations
and plugins that allow you to collect metrics from [various sources](https://www.influxdata.com/products/integrations/).
The TimescaleDB team currently has an open [pull request](https://github.com/influxdata/telegraf/pull/3428)
to add PostgreSQL as a standard output plugin for Telegraf, but until that is
approved, TimescaleDB offers a [build of Telegraf](https://docs.timescale.com/latest/tutorials/telegraf-output-plugin#telegraf-installation)
with the Postgresql output included.

Beyond the data collection side of things, you can use a number of visualization
and alerting tools that support TimescaleDB today. The most popular option
open-source option is [Grafana&reg;](https://grafana.com/)&mdash;we even use it
at ObjectRocket. However, Timescale offers built-in support for Tableau&reg;,
PowerBI&reg;, Looker&reg;, Periscope&reg;, Mode&reg;, Chartio&reg;, and more.

#### IoT data

Similar to other time series applications, Internet of Things (IoT) devices
generate constant streams of data, and once again, they have a strong time
component. TimescaleDB provides a distinct advantage because it’s optimized to
keep up with high rates of data ingest as your number of devices scales, and
it provides a standard SQL interface that makes it easier to plug into whatever
you’re using to collect and process that data.

If you’re building a service to collect time-series data, basing it on a standard
technology like SQL helps you to lower risk and time-to-market because you’re
working with a proven, pervasive, and easy to use technology.

To get you started, Timescale provides a nice tutorial that shows how you could use
TimescaleDB in an IoT scenario. As we look to the future and TimescaleDB’s ability
to partition data within a node as well as their clustering solution (currently
in private beta release), it’s becoming a candidate for larger and larger
applications.

#### Web application event tracking and analytics

An additional use case where TimescaleDB can provide unique benefits is in web
application event tracking. To provide better service, detect issues, and learn
more from their customers, companies increasingly commonly need to keep a record of
how users are consuming web services. As with the previous use cases, this results
in data based on time and lots of it. As more and more users interact with the
app and click through, the volume of data becomes harder to collect and analyze.

Because web analytics can involve many different types of data, the flexibility
of having PostgreSQL under the hood with its massive list of
[supported data types](https://www.postgresql.org/docs/current/datatype.html)
is a huge advantage. Though you won’t be able to take advantage of every
TimescaleDB function with every data type, you can still make the most of many
of the speed and storage optimizations that TimescaleDB provides.

Finally, TimescaleDB’s ability to plug into common frameworks and BI tools
enables you to gain better visibility into how customers are using your application.
Plus, it provides a better experience by using tools and query languages you’re
already familiar with.

### Try now

Whether your use case fits into one of the preceding buckets, or is completely
unique, you can
[try TimescaleDB on ObjectRocket](https://app.objectrocket.cloud/?__hstc=227540674.237493f06c8469bbdd744e2136c94f41.1594921759572.1594921759572.1596024297433.2&__hssc=227540674.1.1596024297433&__hsfp=1923580540&_ga=2.157507320.317187064.1596024297-2061469802.1594921759)
for free. We back up all of our instances with 24×7 monitoring and support.

<a class="cta purple" id="cta" href="https://www.objectrocket.com/">Learn more about ObjectRocket.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
