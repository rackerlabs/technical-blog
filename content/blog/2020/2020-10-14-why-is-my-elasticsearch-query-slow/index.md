---
layout: post
title: "Why is my Elasticsearch query slow?"
date: 2020-10-14
comments: true
author: Paul Rossmeier
authorAvatar: ''
bio: "Paul began his Rackspace career in 2013 as a member of the Cloud Office team.
He then worked on RAX GTS Linux before transitioning to a Data management role. He is currently a Database administrator with certifications as an Elasticsearch engineer
and Red Hat Certified administrator'. Paul has been happily married for 17 years with 2 children. He enjoys learning new technologies, collecting video game memorabilia and moonlighting as a turntable DJ."
published: true
authorIsRacker: true
categories:
    - Database
metaTitle: "Why is my Elasticsearch query slow?"
metaDescription: "One frequent Elasticsearch support request that Rackspace Technology
receives is 'Can you help with my response time?' or
'My queries are taking a long time, what can I do?'"
ogTitle: "Why is my Elasticsearch query slow?"
ogDescription: "One frequent Elasticsearch support request that Rackspace Technology
receives is 'Can you help with my response time?' or
'My queries are taking a long time, what can I do?'"
slug: "why-is-my-elasticsearch-query-slow"

---

One frequent Elasticsearch support request that Rackspace Technology
receives is “Can you help with my response time?” or
“My queries are taking a long time, what can I do?”

<!--more-->

{{<img src="picture1.jpg" title="" alt="hands on keyboard">}}

### Two approaches

Whenever we get these types of questions, we begin by taking a look at two main areas:

- **Operations Side** – Look at the current system resources and default Elasticsearch options.
- **Development Side** - Look at the the queries, their structure, and the mapping of the data you
are searching for.

In this first in a series of blog posts on Elasticsearch optimization,
we focus on the latter of these two areas.
We obtain the slow queries, discuss the Domain Specific Language (DSL) query language,
and go over options that can help improve your Elasticsearch queries.

### Just how slow are your queries?

The first step is to look at how long it takes for you to send a query to the cluster.
The Elasticsearch docs are not clear about how to turn on the slow logs,
so I show some examples below.

First, there are two versions of slow logs in Elasticsearch: index slow logs and search slow logs.
Since the issue we’re trying to resolve involves slow queries,
we focus on search slow logs. However, if this was about performance issues
while indexing or adding documents, we would look at the index slow logs.

All versions of Elasticsearch turn off slow logs by default, so
you have to make a few updates to both the cluster settings and the index settings.
The following examples deal with with Elasticsearch 6.2, but you
can find information about [previous versions here](https://www.elastic.co/guide/en/elasticsearch/reference/index.html). Replace the $ES_version with the
version that you are working on,for [example, 5.5 here](https://www.elastic.co/guide/en/elasticsearch/reference/5.5/index-modules-slowlog.html).

- Send a put request to the **_cluster API** to define the level of slow log
that you want to turn on: warn, info, debug, and trace.
([More info on logging levels.](https://stackoverflow.com/questions/2031163/when-to-use-the-different-log-levels))

    curl -XPUT http://localhost:$ES_PORT/_cluster/settings -H ‘Content-Type: application/json’ -d’

        {
    "transient" : {
    "logger.index.search.slowlog" : "DEBUG",
    "logger.index.indexing.slowlog" : "DEBUG"
    }
    }'

Because Elasticsearch enables all slow logging on the index level, you can send a request to the
index _settings API to turn it on. You also have to add to your index template
if you are rotating your indexes monthly, quarterly, etc.

- Adjust the API call to the index settings to match the slow log time threshold
  you want to hit. (You can set to 0's to profile the instance and collect all queries
  being sent, and a &ndash;1 to turn off the slow log.)
- Use the same log level setting you used in the _clustersettings.
  In this example, “DEBUG”. ES_PORT is a persistent environmental variable.

    curl -XPUT http://localhost:$ES_PORT/*/_settings?pretty -H 'Content-Type: application/json' -d '{"index.search.slowlog.threshold.query.debug": "-1","index.search.slowlog.threshold.fetch.debug": "-1",}'

Now, need to collect the logs. The slow logs are generated per shard
and gathered per data node. If you only have one data node that holds
five primary shards (the default value), you will see five entries
for one query in the slow logs. As searches in Elasticsearch happen inside
each shard, you’ll see one for each shard. Slow Logs are stored per data node
in the following default
location: **/var/log/elasticsearch/$ClusterID_index_slowlog_query and /var/log/elasticsearch/$ClusterID_index_slowlog_fetch**.
As you can see, the search slow logs are again broken down into separate log files based on
the phase of search: fetch and query.

Now that we have results in the logs,
we can pull an entry and take it apart.

    [2018-05-21T12:35:53,352][DEBUG ][index.search.slowlog.query] [DwOfjJF] [blogpost-slowlogs][4] took[1s],    took_millis[0], types[], stats[], search_type[QUERY_THEN_FETCH], total_shards[5], source[{"query":{"match":{"name":    {"query":"hello world", "operator":"OR","prefix_length":0,"max_expansions":50,"fuzzy_transpositions" :true, "lenient":false,"zero_terms_query": "NONE","boost":1.0}}},"sort":[{"price": {"order":"desc"}}]}],

Here, you see:

- Date timestamp
- Log level
- Slowlog type
- Node name
- Index
- Shard number
- Time took
- The body of the query (_source>)

Once we obtain the query that we identify as taking too long, there are some tools at
our disposal to break it down:

#### Profile API
The profile API provides pages of information about your search and breaks down what happened
in each shard, right down to the individual timing of each search component.
The more detailed the search, the more verbose the _profile output.

#### The Kibana profiling tool
This goes hand in hand with the _profileAPI. It gives a nice visual waterfall
representation of the individual search components and the time that they take
to complete. Again, this allows you to pick out the problem area of the query.

### Two phases of Elasticsearch: query then fetch

Now we’ve identified a query that is slow and we’ve run it through a profiler.
Looking at the individual component time results has not made your search faster,
though. Now what? Understanding how queries work, going through the following two phases,
allows you to redesign your query in a way that gets the best results
from Elasticsearch&mdash;both in terms of speed and relevancy.

### Query phase

- The coordinator node accepts the query.
- The coordinator identifies the index (or indices) that are being searched.
- The coordinator produces a list of nodes that contain the shards for the index (in a mix of both primary and replica).
- The coordinator sends the query to the nodes.
- The shards on the nodes process the query.
- Queries are scored (by default) to the top 10 documents.
- The list is sent back to the coordinator node.

### Fetch phase

- The fetch phase begins with the coordinator node, which determines the top 10 documents out of
   the 50 (5 shards x 10 results) results sent by each shard.
- The coordinator sends out a request for the top 10 documents to the shards.
   (This could be one shard that contains the top scoring docs,
   or they could be scattered across several shards.)

Once a list is returned, the master presents the documents in the _hits section of the query response.

### Result scores

The result scores are key in Elasticsearch. Typically, when you use a
search engine, you want the most accurate results. For example, if you’re
searching for kiwi, the fruit, you don’t want the results to include Kiwi shoe polish.
Elasticsearch scores query results based on the parameters you’ve supplied.
While query relevance is covered in a completely different blog post,
it's important to mention here because if you have a fast search but the
results aren't what you are looking for, the entire search was a waste of time.
So, how do you speed up your searches?

### Filters

One way to improve the performance of your searches is with filters.
The filtered query can be your best friend. It’s important to filter
first because filter in a search does not affect the outcome of the
document score, so you use very little resources to reduce
the search field.

With a filtered query, working with boolean matches, you can search
for all documents that contain X before scoring on whether
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

Have questions about managing Elasticsearch? Access to our Database administrators with deep Elasticsearch
expertise is always included with every instance, even with free trials. Start focusing
on development and let us handle the Elasticsearch management.

Want to play around with a free trial of Elasticsearch 6 with Kibana?
Get started and let us know if you have any questions.

<a class="cta purple" id="cta" href="https://www.rackspace.com/data">Learn more about our database services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
