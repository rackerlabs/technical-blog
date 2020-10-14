---
layout: post
title: "Elastic search aliases"
date: 2020-10-13
comments: true
author: "Steve Croce"
authorAvatar: ''
bio: "Product Leader of ObjectRocket Database as a Service at Rackspace"
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "Elastic search aliases"
metaDescription: "Review Elasticsearch Aliases."
ogTitle: "Elastic search aliases"
ogDescription: "."
slug: "elastic-search-aliases"

---


<!--more-->

###  INTRO TO USING ALIASES IN ELASTICSEARCH

By Steve Croce August 24, 2017

{{<img src="picture1.jpg" title="" alt="">}}



To celebrate our launching early access to our alias action in ObjectRocket’s hosted Curator implementation, let’s review what Elasticsearch aliases are, how they’re used, and their advantages. Get more detail on the hosted Curator implementation and how to get early access, see the bottom of this article, here.
An important part of good Elasticsearch hygiene is a good indexing strategy to avoid massive indices that hold too much of your data. However, once you have your data spread across multiple indices, you’ll probably want a good way to search across them. That’s where aliases come in.
Aliases in Elasticsearch are exactly what they sound like: a secondary name that can be used to refer to an index, or multiple indices, that can even include some filtering on what you want from those indices. In this article, I want to walk you through a quick primer and some cool ways you can use aliases and then I will show you how to use our feature, which enables you to quickly and easily set up an Alias Curator task for your Elasticsearch clusters managed by ObjectRocket.
CRUD with aliases
As a quick primer on aliases, let’s walk through a simple examples of how they work.
First, you can list aliases using either the _cat API, which returns a line for each alias-index association and whether filtering/routing is applied:

>GET _cat/aliases?v
alias index filter routing.index routing.search
atest test1 – – –
atest test2 – – –
atest2 test2 * – –


Alternatively, you can use the `/_alias` endpoint to see all aliases, or the `/index/_alias` endpoint to just see the aliases for that index.
Aliases can also be added to an index during creation via an index template or using a PUT:

>PUT /test2
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


and added/modified later with the /_aliases endpoint by specifying the index(es) and alias to add/remove.

>POST /_aliases
{
“actions” : [
{ “add” : { “index” : “test1”, “alias” : “atest” } },
{ “remove” : { “index” : “test3”, “alias” : “atest” } }
] }


From there, using an alias is as simple as using the alias name instead of the index name in a query. Keep in mind that you can only index documents to an alias that points to a single index. There is obviously a whole lot more depth to aliases that you can get from the official docs, but this should give you a feel for how to work with aliases.

####What’s the big deal?

That all seems pretty simple and you may be already sold, but in case you’re not, here are a couple of places where aliases really help.

####Reindexing with no downtime

One of the most useful features in the last few versions of Elasticsearch is the Reindex API. However, after reindexing, you still have to manage the cutover from the old index to the new index. Aliases allow you to make this cutover without downtime. Here’s how.
Let’s assume I have an index called oldIndex and I want to reindex it into newIndex.
The first thing I want to do is create an alias (myalias) and add it to oldIndex.
Next, make sure that your application is pointing to myalias rather than oldIndex.
Now create your new index, newIndex, and begin reindexing the data from oldIndex into it.
Add newIndex to ‘myalias’ and remove oldIndex. You can do this in a single command and the change is atomic, so there will be no issues during the transition.
Verify that you’re getting the results you expect with the alias and then you can remove oldIndex when you’re ready.
It’s good practice to use an alias for reads/queries from your application anyway, so if you did that from the get-go, you’d have been able to skip the first three steps in that reindexing process.
Grabbing ranges of time-based indices
If you’re using Logstash or Beats, you’re probably familiar with indices named something-yyyy.MM.dd . This makes curation and management of the data really easy, but when you want to search across a range of dates, wildcards and index lists are not always as flexible as you’d like. An easy way to manage this is with aliases.
Let’s assume you have daily logstash indices and you retain your logs for 30 days. However, you may only need to look at the last 7 days for certain types of queries. By using aliases and curator, you can do this pretty easily.
First you’ll need to create an alias like lastSevenDays
Set up your index template to add the index to the new alias by default
Using the Elasticsearch Curator with the alias action and age/pattern filters, or a basic script, set up a recurring task to remove indices older than 7 days.
From there all searches to lastSevenDays will only hit the indices that were created in the last 7 days
Customer example
I want to close out on a small example from one of our customers. A customer of ours was recently having issues with slowness and after some review we noticed that one of their common queries was actually searching across their entire date range of the cluster. This query was very similar to the scenario listed above and only needed the last 7 days of data, so was a perfect candidate for managing with with an alias that was regularly updated to point to the indices from the last 7 days. In the graphs below, you can see that the impact on the performance of their cluster is astounding:


Since this alias was frequently queried, we can see how significant of an impact this change made. From these graphs we can see that CPU usage dropped by over 50% on all nodes, the number of query cache evections dropped by ~75%. While the results you see may not be this drastic, depending on the query frequency and index size, it illustrates how important it is to manage the scope of your searches and index appropriately.
Recap
Aliases are yet another tool in the Elasticsearch toolbox that should make it easier to manage and work with your cluster day to day. This post isn’t exhaustive, but should have given you an idea of where and how you can use aliases in your Elasticsearch implementation.
How can you set up an Alias Curator task through ObjectRocket?
While aliases are already supported by the Elasticsearch clusters we’re managing, our new Alias Curator task feature is intended to make it simple to set up regular maintenance of your alias(es) by allowing you to specify filters for adding and/or removing indices from an alias at a regular interval based on your criteria.
To illustrate this, let’s take an example mentioned above which already references using Elasticsearch Curator: the lastSevenDays alias. To keep this simple, we won’t create the Alias before-hand, but let the first run of the Curator task set it up for us. This means you can reference existing aliases in the Curator task, allowing you to set up the alias separately if you wish to have more custom settings.
In order to manage this alias, you’ll likely want to keep this alias up-to-date by having only indices that fit the age criteria of being created within the last 7 days.
First, let’s start at the instance details page for the cluster we want to add an Alias Curator task for:

Once here, let’s select the “Curator” tab to see our current Curator tasks:

As you can see, I already have a couple of Curator tasks. Let’s create another and this time it’ll be an “alias” Curator task. To do this, select “Add Task”:

Now, you can select the “Alias” task type:

After naming our task (I went with “lastSevenDays Alias”, we need to specify the alias name. We’ll go with lastSevenDays for this example. You can also see that we have a couple of options: “Add” and “Remove”. These are to allow you to specify filters for the indices that you wish to add or remove from the alias. for lastSevenDays we’re going to want to add some indices and remove others. So, let’s select both:

The desired filters will be to add all the indices that are newer than 7 days and remove those that are older than 7 days, which, once filled in, would look like the following:

We can leave it at the default interval (every 5 minutes) to specify that we want this task to run pretty regularly to keep our alias up-to-date. We can go ahead and select “Save Task” and that’s it! Now the task will run every 5 minutes to keep the Elasticsearch Alias updated.
Getting early access
Contact us to request access to use Alias Elasticsearch Curator task types.




The following line shows how to add an image.  If you have no image, remove it.
If you have an image, add it to the post directory and replace the image name in the following line.

{{<img src="picture1.jpg" title="" alt="">}}

### Conclusion

<a class="cta purple" id="cta" href="https://www.rackspace.com/sap">Learn more about our SAP services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
