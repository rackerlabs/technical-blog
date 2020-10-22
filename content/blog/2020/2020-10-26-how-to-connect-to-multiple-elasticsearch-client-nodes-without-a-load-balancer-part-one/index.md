---
layout: post
title: "How to connect to multiple Elasticsearch client nodes without a load balancer&mdash;Part One"
date: 2020-10-26
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
metaTitle: "How to connect to multiple Elasticsearch client nodes without a load balancer&mdash;Part One"
metaDescription: "Learn how to set up a load balancer with Elasticsearch."
ogTitle: "How to connect to multiple Elasticsearch client nodes without a load balancer&mdash;Part One"
ogDescription: "Learn how to set up a load balancer with Elasticsearch."
slug: "how-to-connect-to-multiple-elasticsearch-client-nodes-without-a-load-balancer-part-one"
canonical: https://www.objectrocket.com/blog/elasticsearch/elasticsearch-and-load-balancers/

---

*Originally published on Nov 10, 2017, at ObjectRocket.com/blog.*

{{<img src="picture2.jpg" title="" alt="" class="image-right">}}Since all Rackspace ObjectRocket for Elasticsearch&reg;
clusters come with multiple client nodes, a common question we get from our customers is why we don’t provide a load balancer
to connect to all of them.

<!--more-->

Depending on your preferences, you might see a single connection to a single node as a point of cluster failure. A load
balancer *can* prove effective to manage a pool of connections. However, Elasticsearch is designed to work without a load
balancer. In this blog post, we go over how to use all of the clients we provide in Elasticsearch.

{{<img src="picture1.jpg" title="" alt="">}}

### The Python setup

Let’s look at the Python&reg; setup:

    from elasticsearch import Elasticsearch
    Import certifi

    es = Elasticsearch(['dc-port-0.es.objectrocket.com', 'dc-port-1.es.objectrocket.com', 'dc-port-2.es.objectrocket.com', 'dc-port-3.es.objectrocket.com'],
        http_auth=('YOUR_USERNAME', 'YOUR_PASSWORD'),
        port=12345,
        use_ssl=True,
        verify_certs=True,
        ca_certs=certifi.where(),
    )

The first argument shows you that Elasticsearch accepts a list of hosts. That means the client can continue with the
setup on their own. The setup is similar to other tools, like [Beats](https://www.objectrocket.com/resource/what-are-elasticsearch-beats/).
The setup script would be similar to the following example:

    output:
    elasticsearch:
    hosts: ["https://dc-port-0.es.objectrocket.com:port", "https://dfw-port-1.es.objectrocket.com:port", "https://dfw-port-2.es.objectrocket.com:port", "https://dfw-port-3.es.objectrocket.com:port"]

    # HTTP basic auth
    username: "YOUR_USERNAME"
    password: "YOUR_PASSWORD"

Most tools and clients available support multiple hosts. To make it easy for you, we include connection snippets in the
ObjectRocket UI for Python&reg;, Ruby, C#, Java&reg;, Javascript&reg;, Go, Logstash, and Beats. Just pick the technology
you’re using and then copy the snippet with your hostnames pre-populated.

{{<img src="picture3.png" title="" alt="">}}

### Alternatives for applications that won’t take multiple hosts

A few applications don’t make a list of hosts. The most notable is [Kibana&reg;](https://www.objectrocket.com/resource/why-use-kibana-for-data-visualization/), which accepts a single host. To work around this, you can use a couple of alternatives.

#### Point each part of your app at a different client

For non-mission-critical uses and applications, you can point at a single client node. Unless the application has a
super-high request rate, a single client should be able to manage the load. If you have a number of these types of
applications, just point each one at a different client to balance the load.

#### Load balance locally

In the few cases where the client or application doesn’t support it, and you need redundancy in client connections, you
can set up local load-balancing. You can do this with nginx&reg;, HAProxy&reg;, and others, or just set up a local hostname
in Domain Name System (DNS) that uses round-robin between the Elasticsearch clients. Once again, we see very few cases where
this is necessary, but there are solutions available when it does come up.

### Conclusion

Almost every scenario you come across allows you to supply a list of hosts that handle the balancing for you, but, in a pinch,
there are examples out there to help you load balance locally.

<a class="cta red" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
