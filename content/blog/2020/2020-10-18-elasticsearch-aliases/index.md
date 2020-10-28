---
layout: post
title: "Elasticsearch aliases"
date: 2020-10-18
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
metaTitle: "Elasticsearch aliases"
metaDescription: "In this post, I go over Elasticsearch&reg; aliases to celebrate  access to our alias action in the ObjectRocket hosted Curator implementation. I also review the advantages of Elasticsearch aliases and how you can use them."
ogTitle: "Elasticsearch aliases"
ogDescription: "In this post, I go over Elasticsearch&reg; aliases to celebrate  access to our alias action in the ObjectRocket hosted Curator implementation. I also review the advantages of Elasticsearch aliases and how you can use them."
slug: "elastic-search-aliases"
canonical: https://www.objectrocket.com/blog/elasticsearch/elasticsearch-aliases/
---

In this post, I go over Elasticsearch&reg; aliases to celebrate  access to our Alias action in the ObjectRocket-hosted Curator
implementation. I also review the advantages of Elasticsearch aliases and how you can use them.

<!--more-->

### Intro to using aliases in Elasticsearch

*Originally published on August 24, 2017 at ObjectRocket.com/blog*

{{<img src="picture1.jpg" title="" alt="">}}

A good strategy for excellent Elasticsearch hygiene is avoiding massive indices that hold an excessive amount of data. However,
after your data has spread across multiple indices, you probably want the best way to search across them. That’s where
aliases come in handy.

Aliases in Elasticsearch are exactly what they sound like: A secondary name that can be used to refer to an index, or
multiple indices, that can even include some filtering to accommodate your needs. In this post, I want to walk you
through some cool ways to use aliases and the procedure to use our feature, enabling you to quickly and easily set up
an Alias Curator task for your Object Rocket Elasticsearch clusters.

### CRUD (Create, Read, Update and Delete) with aliases

Let’s walk through a simple example of how aliases work. You can list aliases using either the `_cat` API, which returns
a line for each alias-index association and whether filtering or routing is applied:

```
    GET _cat/aliases?v
    alias index filter routing.index routing.search
    atest test1 – – –
    atest test2 – – –
    atest2 test2 * – –
```

Alternatively, you can use the `/_alias` endpoint to see all aliases or the `/index/_alias` endpoint to just see the
aliases for that index. You can also add aliases to an index during creation by using an index template or using the
`PUT` command:

```
    PUT /test2
    {
    “aliases” : {
    “atest” : {},
    “atest2” : {
    “filter” : {
    “term” : {“user” : “objectrocket” }
    }
    }
    }
    }
```

Then, add or modify it later with the `/_aliases` endpoint by specifying the index and alias to add or remove.

```
    POST /_aliases
    {
    “actions” : [
    { “add” : { “index” : “test1”, “alias” : “atest” } },
    { “remove” : { “index” : “test3”, “alias” : “atest” } }
    ] }
```

From there, you can use the alias name instead of the index name in a query. Keep in mind that you can only index
documents to an alias that points to a single index. There is obviously a lot more depth to aliases that you can
get from the official docs, but this should give you a feel for working with aliases.

### What’s the big deal?

That all seems pretty simple, and you might be already sold, but in case you aren't, here are a couple of places
where aliases really help.

#### Reindex with no downtime

One of the most useful features in Elasticsearch is the **Reindex** API. However, after reindexing, you still have to
manage the cutover from the old index to the new index. Aliases allow you to make this cutover without downtime. Here’s how:

1. Assume you have an index called `oldIndex` and want to reindex it into `newIndex`.

2. Create an alias `myalias` and add it to `oldIndex`.

3. Make sure that your application is pointing to `myalias` rather than `oldIndex`.

4. Create your `newIndex` and begin reindexing the data from `oldIndex` into it.

5. Add `newIndex` to `myalias` and remove `oldIndex`. Do this in a single command. The change is atomic (very small and individual),
   so there will be no issues during the transition.

6. Verify that you’re getting the results you expect with the alias, and then you can remove `oldIndex` when you’re ready.

It’s good practice to use an alias for reads or queries from your application to avoid unnecessary steps.

#### Grabbing ranges of time-based indices

If you’re using Logstash&reg; or Beats&reg;, you’re probably familiar with indices named `something-yyyy.mm.dd`. This makes
curation and management of the data really easy. Wildcards and index lists are not always as flexible as you’d like, especially
when you want to search across a range of dates. Aliases provide you with an easy solution for such cases. Let’s assume that
you have daily logstash indices and that you retain your logs for 30 days. However, you might need to look at only the last seven
days for certain types of queries. By using aliases and curator, you can do this rather easily.

1. Create an alias similar to this example: `lastSevenDays`.

2. Set up your index template to add the index to the new alias by default.

3. Using the **Elasticsearch Curator** with the alias action and age/pattern filters, or a basic script, set up a recurring
   task to remove indices older than seven days.

4. From there, all searches to `lastSevenDays` hit only the indices that were created in the last seven days.

### Customer example

I want to close out on a small example from one of our customers. This customer had some issues with slowness.
After some review, we noticed that one of their common queries was actually searching across their entire date range of the
cluster. This query was very similar to the scenario listed previously and only needed the last seven days of data, so it was a
perfect candidate for managing with an alias that was regularly updated to point to the indices from the last seven days. In
the following graphs, you can see that the impact on the performance of their cluster is astounding:

{{<img src="picture2.png" title="" alt="">}}

{{<img src="picture3.png" title="" alt="">}}


Because this alias was frequently queried, we can see the impact this change had. These graphs show us that CPU usage dropped
by over 50% on all nodes, the number of query cache evictions dropped by ~75%. While the results you see might not be this
drastic, depending on the query frequency and index size, it illustrates how important it is to manage the scope of your
searches and index appropriately.

### Recap

Aliases are yet another tool in the Elasticsearch toolbox that should make it easier to manage and work with your cluster
day-to-day. This post isn’t exhaustive but should give you an idea of where and how you can use aliases in your Elasticsearch
implementation.

### How can you set up an Alias Curator task through ObjectRocket?

While our Elasticsearch clusters already support aliases, the new Alias Curator task feature makes it simple to set
up regular maintenance of aliases by enabling you to specify filters to add or remove indices from an alias at a regular
interval based on your criteria.

To illustrate this, let’s take the `lastSevenDays` alias example, which already has references using Elasticsearch Curator. To keep
this simple, we let the first run of the Curator task set the Alias for us. You can reference existing aliases in the Curator
task, allowing you to set up the alias separately if you want to have more custom settings.

To manage this alias, you should keep it up-to-date by having only indices that fit the age criteria of being created within
the last seven days. Start at the instance details page for the cluster we want to add an Alias Curator task for:

{{<img src="picture4.png" title="" alt="">}}

Now, select the **Curator** tab to see the current curator tasks:

{{<img src="picture5.png" title="" alt="">}}

As you can see, we already have a couple of curator tasks. Let’s create another&mdash;this time with an Alias Curator task. To do
this, select **Add Task**:

{{<img src="picture6.png" title="" alt="">}}

Now, you can select the **Alias** task type:

{{<img src="picture7.png" title="" alt="">}}

After naming our task, we need to specify the alias name. Let's use `lastSevenDays` for this example. You can also see a
couple of options: **Add** and **Remove**. These enable you to specify filters for the indices you want to add
or remove from the alias. For `lastSevenDays`, we’re going to add some indices and remove others. So, let’s select both:

{{<img src="picture8.png" title="" alt="">}}

The desired filters add all the indices more recent than seven days and remove those older than seven days. After
you fill them in, the indices look similar to the following example:

{{<img src="picture9.png" title="" alt="">}}

We can leave it at the default interval (every five minutes) to specify that we want this task to run regularly to keep
our alias up-to-date. Select **Save Task**, and that’s it! Now the task runs every five minutes to keep the Elasticsearch
Alias updated.

<a class="cta teal" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
