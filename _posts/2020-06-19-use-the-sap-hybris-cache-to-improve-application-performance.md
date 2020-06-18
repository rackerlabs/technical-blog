---
layout: post
title: "Use the SAP Hybris cache to improve application performance"
date: 2020-06-19 00:01
comments: true
author: Sanjiv Kumar
bio: “Sanjiv is an Application Support Architect who is responsible for
onboarding  clients with regard to implementation and operations of the eCommerce
platform.”
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "Use the SAP Hybris cache to improve application performance"
metaDescription: "You can use the SAP&reg; Hybris Region cache to improve
application performance by reducing the load on underlying resources."
ogTitle: "Use the SAP Hybris cache to improve application performance"
ogDescription: "You can use the SAP&reg; Hybris Region cache to improve
application performance by reducing the load on underlying resources."
---

You can use the SAP&reg; Hybris Region cache to improve application performance
by reducing the load on underlying resources.

<!-- more -->

### Overview

A cache is a store of things that you might require in the future and that you
can rapidly retrieve. In this case, it is a collection of temporary data that
either duplicates data located elsewhere or is the result of a computation.

How well an application performs depends on whether it is a CPU, I/O, or
memory-bound application. Each type of application works differently, but they
all benefit from caching the underling resources that applications need.

Most business applications are I/O bound. In these applications, response time
mostly depends on how quickly they retrieve data from the database. In
applications that use the data only once, caching provides no benefits. However,
when the application reuses the same data, caching can significantly improve
performance.

In eCommerce applications, a small number of items can make up the bulk of sales.
Based on the Pareto principle, or  80/20 rule, caching offers significant
advantages because these frequently used items comprise most of the sales.

### Cache Regions

Hybris introduces the possibility of splitting the entire cache into different
regions. You can configure each region and specify which objects to cache in
these regions. This approach makes tuning a running system easy and ensures that
some objects are cached for a long time while removing other objects quickly.
Because SAP based Hybris on type systems, you can configure each cache region to
hold its own types.

Hybris supports the following configuration for regions:

- The type cached

- The maximum size of the cache

- The eviction policy

By default, Hybris provides the following cache regions:

- An ehCacheEntityCacheRegion.

- An unlimited cache for the type system region to keep all type system objects in
  memory. This cache does not use an eviction policy.

- A queryCacheRegion for search results.

#### Eviction policies

An effective cache needs to remove or evict data elements that it no longer needs
to make room for new ones. Eviction policies often depend on cache hits or misses
to make decisions. The term *cache hit* refers to the successful retrieval of
data elements from a cache. A *cache miss* occurs when the requested element is
not in the cache.

Hybris uses the following eviction policies:

- **Least Recently Used (LRU)**: When the application puts an element into the
  cache or retrieves an element from the cache with a GET call, it updates the
  time stamp. This algorithm evicts the element used least often when the cache
  gets full.

- **Least Frequently Used (LFU)**: For each GET call on the element, the
  application updates the number of hits. If a PUT call for a new element
  exceeds the memory-store maximum limit, the application evicts the element
  with fewest hits.

- **First In, First Out (FIFO)**: The application evicts elements in the same
   order as they come in. If a PUT call for a new element exceeds the memory-store
   maximum limit, the application evicts the first element added to the cache.

### Configuration

Hybris comes with a default setup, but you should tune it based on your system
performance requirements.

The following images show some configuration options:

![Standard Configuration]({% asset_path 2020-06-19-use-the-sap-hybris-cache-to-improve-application-performance/Picture1.png %})

![Extended Configuration]({% asset_path 2020-06-19-use-the-sap-hybris-cache-to-improve-application-performance/Picture2.png %})

### Tuning

Call the Rackspace Digital team so we can do a deep dive into your caching
system to ensure that it is performing well. We can make recommendations to improve
your application.

<a class="cta red" id="cta" href="https://www.rackspace.com/sap">Learn more about our SAP services.</a>

Use the Feedback tab to make any comments or ask questions.
