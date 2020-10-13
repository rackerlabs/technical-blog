---
layout: post
title: "Why is my Elasticsearch query slow?"
date: 2020-10-13
comments: true
author: Paul Rossmeier
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - Database
metaTitle: "Why is my Elasticsearch query slow?"
metaDescription: "."
ogTitle: "Why is my Elasticsearch query slow?"
ogDescription: "."
slug: "why-is-my-elasticsearch-query-slow"

---

One frequent Elasticsearch support request that Rackspace Technology
receives is “Can you help with my response time?” or
“My queries are taking a long time, what can I do?”.

<!--more-->

{{<img src="picture1.jpg" title="" alt="hands on keyboard">}}

### Two approaches

Whenever we get these types of questions, we begin by taking a deeper look at two main areas:
- **Operations Side** –Look at the current system resources and default Elasticsearch options.
- **Development Side** - Look at the the queries, their structure, and the mapping of the data you
are searching for.

In this first in a series of blog posts on Elasticsearch optimization,
we focus on the latter of these two areas.
We obtain the slow queries, discuss the Domain Specific Language (DSL) query language,
and go over options that can help improve your Elasticsearch queries.

### Just how slow are your queries?

The first step is to take a look at how long it takes for you to send a query to the cluster.
The Elasticsearch docs can be a little unclear on how to turn on the slow logs,
so I show some examples below.

First, there are two versions of slow logs in Elasticsearch: index slow
logs and search slow logs. Since the issue we’re trying to resolve involves slow queries,
we focus on search slow logs. However, if the issue resolved around performance issues
while indexing/adding documents, then we would look at the index slow logs.

Slow logs are turned off by default on all versions of Elasticsearch, so
you’ll have to make a few updates to both the cluster settings and the
index settings. These examples are for working with elasticsearch 6.2, but you
can find all previous version here. Simply replace the $ES_version with the
version that you are working on,for example 5.5 here.
Send a put request to the _cluster API to define the level of slow log
that you want to turn on: warn, info, debug, and trace.
(More info on logging levels.)
curl -XPUT http://localhost:$ES_PORT/_cluster/settings -H ‘Content-Type: application/json’ -d’

{{<img src="Picture1.png" title="" alt="">}}

All slow logging is enabled on the index level, so you can again send a request to the
index _settings API to turn on, but will also have to add to your index template
if you are rotating your indexes monthly, quarterly, etc.
Adjust the API call to the index settings to match the slow log time threshold
you want to hit. (You can set to 0s to profile the instance and collect all queries
being sent, and a -1 to turn off the slow log.)
Use the log level setting you chose to use in the _clustersettings.
In this example, “DEBUG”.
ES_PORT is a persistent environmental variable.

{{<img src="Picture1.png" title="" alt="">}}

Now, you will need to collect the logs. The slow logs are generated per shard
and gathered per data node . If you only have one data node that holds
five primary shards (this is the default value), you will see five entries
for one query in the slow logs. As searches in Elasticsearch happen inside
each shard, you’ll see one for each shard. Slow Logs are stored per data node
 in the following default
 location: /var/log/elasticsearch/$ClusterID_index_slowlog_query and /var/log/elasticsearch/$ClusterID_index_slowlog_fetch.
As you can see, the search slow logs are again broken down into separate log files based on
the phase of search: fetch and query. Now that we have results in the logs,
we can pull an entry and take it apart.

{{<img src="Picture1.png" title="" alt="">}}

Here, you see:

- Date timestamp
- Log level
- Slowlog type
- Node name
- Index
- Shard number
- Time took
- The body of the query (_source>)

Once we obtain the query that we identify as taking too long, we have some tools at
our disposal to break down the query:

- Profile API
The profile API provides pages of information on your search and breaks down what happened
in each shard, right down to the individual timing of each search component.
The more detailed the search, the more verbose the _profile output.

- The Kibana profiling tool
This goes hand in hand with the _profileAPI. It gives a nice visual waterfall
representation of the individual search components and the time that they take
to complete. Again, this allows you to easily pick out the problem area of the query.

### Two Phases of Elasticsearch: Query then Fetch

Now we’ve identified a query that is slow and we’ve run it through a profiler.
Looking at the individual component time results has not made your search faster,
though. Now what? Understanding how queries work, going through two phases
(below), allows you to redesign your query in a way that gets the best results
from Elasticsearch – both in terms of speed and in relevancy.

### Query Phase

- The query is accepted by the coordinator node.
- The coordinator identifies the index (or indices) that are being searched.
- The coordinator produces a list of nodes that contain the shards for the index (in a mix of both primary and replica).
- The coordinator sends the query to the nodes. >
- The shards on the nodes process the query.
- Queries are scored (by default) to the top 10 documents.
- The list is sent back to the coordinator node.

### Fetch phase

- The fetch phase begins by the coordinator node, which determines the top 10 documents out of
the 50 (5 shards x 10 results) results sent by each shard.
- The coordinator sends out a request for the top 10 documents to the shards.
(This could be one shard that contains the top scoring docs,
or they could be scattered across several shards.)

Once a list is returned, the master presents the documents in the _hits section of the query response.

### Result Scores

The result scores are key in Elasticsearch. Typically, when you are using a
search engine, you want the most accurate results. For example, if you’re
searching for kiwi, the fruit, you don’t want the results to include Kiwi shoe polish.
Elasticsearch scores query results based on the parameters you’ve supplied.
While query relevance will be covered in a completely different blog post,
it is important to mention here because if you have a fast search but the
results are not what you are looking for, the entire search was a waste of time.
So, how do you speed up your searches?

### Filters

One way to improve the performance of your searches is with filters.
The filtered query can be your best friend. It’s important to filter
first because filter in a search does not affect the outcome of the
document score, so you use very little in terms of resources to cut
the search field down to size.

With a filtered query, working with boolean matches, you can search
for all documents that contain X before scoring on weather or not
they contain Y. Also, filters can be cached.

Filters aren’t the only way to speed up Elasticsearch queries.
We’ll cover more methods you can use to improve query performance
in a future blog.

### Summary

You can optimize your queries in a few simple steps:

- Enable slow logging so you can Identify long running queries
- Run identified searches through the _profiling API to look
  at timing of individual components
- Filter, filter, filter

Have questions about managing Elasticsearch? Access to our DBAs with deep Elasticsearch
expertise is always included with every instance, even with free trials. Start focusing
on development and let us handle the Elasticsearch management.

Want to play around with a free trial of Elasticsearch 6 with Kibana?
Get started and let us know if you have any questions.

<a class="cta purple" id="cta" href="https://www.rackspace.com/sap">Learn more about our SAP services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
