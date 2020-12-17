---
layout: post
title: "How-To: Kibana default index pattern"
date: 2020-12-17
comments: true
author: Shaun Ediger
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "How-To: Kibana default index pattern"
metaDescription: "For Amazon Elasticsearch&reg; Service users, Kibana&reg; is an invaluable plugin for exploring their
cluster’s indices and mapped documents within."
ogTitle: "How-To: Kibana default index pattern"
ogDescription: "For Amazon Elasticsearch&reg; Service users, Kibana&reg; is an invaluable plugin for exploring their
cluster’s indices and mapped documents within."
slug: "how-to-kibana-default-index-pattern"
canonical: https://onica.com/blog/how-to/how-to-kibana-default-index-pattern/

---

*Originally published in Sept 2019 on Onica.com/blog*

For Amazon Elasticsearch&reg; Service users, Kibana&reg; is an invaluable plugin for
exploring their cluster’s indices and mapped documents within.

<!--more-->

### Who should read this?

- Do you need to create an index pattern in Kibana and mark it as the default
  programmatically (so that your users don’t face an extraneous choice)?
- Have you been tasked with provisioning canned queries in Kibana?
- Did an Amazon Elasticsearch Service version upgrade cause your default index
  patterns to stop defaulting?  In other words, did an unofficial method of
  defaulting an index pattern stop functioning correctly?
- Are you using Amazon Elasticsearch Service version 6.3 or newer?
- Are you scouring the web in vain, copying-and-pasting questionable curl
  commands with nothing to show for it?

We’ve got you.

Before we proceed, let’s review the nature of the problem.

[tl;dr Just make it default, please](#just-make-it-default-please)

### Kibana and index patterns

A prerequisite for any searching within Kibana is the index pattern. This
entity gives shape to Kibana queries, forming the target index
(or indices), against which Kibana will perform its searches. The results
from queries against the target(s) are made available for viewing in the web
console.

#### Fresh clusters don’t have any index patterns defined

Because there aren’t any index patterns out-of-the-box, the user gets
prompted to create one. We plan to automate the creation of this index pattern.

#### Index patterns don’t mark themselves as default

Even after you create an index, manually or otherwise, the pattern isn’t
marked as default. Kibana prompts the user to select a default index
pattern. Ideally, we’ll automate this step as well. Herein lies the secret
sauce of this how-to.

### What we're going to do

1. Set up a request path to an Amazon Elasticsearch Service cluster
   with `aws-es-kibana`.
2. Create an index pattern.
3. Retrieve the newly created index pattern.
4. Use the index pattern as a template for newly provisioned clusters.
5. Set the index pattern as the default programmatically.

### Prerequisities

For this how-to, you need to install curl or
[`awscurl`](https://github.com/okigan/awscurl). Go ahead and do this now.

[`aws-es-kibana`](https://github.com/santthosh/aws-es-kibana) provides a
convenient way to access your cluster on AWS. If you don’t have it
already, you need to install [`nodejs`](https://nodejs.org/) before you can
install `aws-es-kibana`.

Last but not least, create an Amazon Elasticsearch Service domain if you
don’t already have one on hand.

1. Log in to the AWS Console.
2. Select **Elasticsearch Service**.
3. Select **Create a new domain**.
4. Follow the wizard steps and wait a few minutes for the cluster to
   become available.

### Start aws-es-kibana

`aws-es-kibana` is a super handy proxy for interacting with Amazon
Elasticsearch Service. You don’t have to worry about V4 signing your
requests&mdash;this happens when you use your configured AWS
credentials. You might also notice that in our examples we use `http` and
not `https`. Not to worry&mdash;the cluster is still secure. `aws-es-kibana`
provides SSL termination so that when we request something in `http`, the
request completes on our behalf using `https`.  Additionally, the
paths of the URIs are structured specifically for Amazon Elasticsearch
Service. Adapt as necessary for your specifics.

1. Follow the
   [installation instructions](https://github.com/santthosh/aws-es-kibana)
   for `aws-es-kibana`.

2. [Be sure your AWS credentials are configured](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html).

3. Log in to the AWS Console and retrieve the hostname of your Amazon Elasticsearch Service cluster.

   1. Select **Elasticsearch Service**.
   2. Select your Amazon Elasticsearch Service domain, such as
      `dev-cluster`.
   3. Take note of the hostname embedded within the Endpoint field, such as
      `dev-cluster-4c5si47uztlr5p4liw3xh63tia.us-east-1.es.amazonaws.com`.

4. `aws-es-kibana HOST_NAME`
5. Confirm you can access your cluster by using curl or pointing with your browser.

       curl http://localhost:9200/

   You should see something similar to the following:

       {
         "name" : "I6Fnsqt",
         "cluster_name" : "XXXXXXXXXXXX:dev-cluster",
         "cluster_uuid" : "fbxnTSk9Q_-Y80jUWWYkdA",
         "version" : {
           "number" : "6.3.1",
           "build_flavor" : "oss",
           "build_type" : "zip",
           "build_hash" : "eb782d0",
           "build_date" : "2019-04-01T14:21:38.700602Z",
           "build_snapshot" : false,
           "lucene_version" : "7.3.1",
           "minimum_wire_compatibility_version" : "5.6.0",
           "minimum_index_compatibility_version" : "5.0.0"
         },
         "tagline" : "You Know, for Search"
       }

All set?  Let’s move on.

### Bring your own index pattern

Or skip to the next section&mdash;we can provide one for you to use.

#### Generate the index pattern

You can create your own index pattern by hand, but we’re going to rely on
Kibana to generate one for us. Use the Kibana web console to create the
index pattern first. You can use the wizard when you first log in, or you can
do it later by using the following steps:

1. Log in to the Kibana console.

       http://YOUR_ENDPOINT/_plugin/kibana/app/kibana

2. Select **Management**.
3. Select **Index Patterns**.
4. Select **Create Index Pattern**.
5. Type something into the Index Pattern text box.  I’m using `logging-*`.
6. Select **Next step**.
7. Select a Time Filter field name.
8. Select **Show advanced options**.
9. In Custom index pattern ID, enter something that makes sense to you. I’m
   using `logging-all`. If you don’t choose an id, one is generated for
   you, which you have to identify on your own later.
10. Finally, select **Create index pattern**.

Now, we get a hold of the JSON we need with curl. To do that, we
need to discover the ID of the object we’ve created.

#### Search for the index pattern

    awscurl –service es -H ‘Content-Type: application/json; charset=utf-8’ -H ‘kbn-xsrf: true’ -XGET ‘http://YOUR_ENDPOINT/_plugin/kibana/api/saved_objects/_find’

The object you’re looking for has a key named **type** with a value
of `index-pattern`.  After you know the ID, you can fetch its content
directly. In this example, the ID is `logging-all`.

#### Get a specific index pattern by ID

    awscurl –service es -H ‘Content-Type: application/json; charset=utf-8’ -H ‘kbn-xsrf: true’ -XGET ‘http://YOUR_ENDPOINT/_plugin/kibana/api/saved_objects/index-pattern/logging-all’

Before re-using the result by sending it up to Kibana, you need to remove
some attributes: `id`, `type`, `updated_at`, and `version`. Thankfully,
Kibana lets you know which properties it doesn’t like when you attempt
to POST your index pattern if you forget to alter it beforehand.

#### Transmit index patter to Amazon Elasticsearech Service

After you have your index pattern in hand, use the officially supported
[Saved Objects API](https://www.elastic.co/guide/en/kibana/master/saved-objects-api.html)
to install it in Kibana.

In case you don’t already have an index pattern cooked up, here’s an example
for creating an index pattern targeting all indices with names beginning
with `logging-`:

    awscurl --service es -H 'Content-Type: application/json; charset=utf-8' -H 'kbn-xsrf: true' -XPOST 'http://YOUR_ENDPOINT/_plugin/kibana/api/saved_objects/index-pattern/logging-all?overwrite=true' -d '{
     "attributes": {
       "title": "logging-*",
       "notExpandable": true,
       "fields":
    "[{\"name\":\"_id\",\"type\":\"string\",\"count\":0,\"scripted\":false,\"searchable\":true,\"aggregatable\":false,\"readFromDocValues\":false},{\"name\":\"_index\",\"type\":\"string\",\"count\":0,\"scripted\":false,\"searchable\":true,\"aggregatable\":true,\"readFromDocValues\":false},{\"name\":\"_score\",\"type\":\"number\",\"count\":0,\"scripted\":false,\"searchable\":false,\"aggregatable\":false,\"readFromDocValues\":false},{\"name\":\"_source\",\"type\":\"_source\",\"count\":0,\"scripted\":false,\"searchable\":false,\"aggregatable\":false,\"readFromDocValues\":false},{\"name\":\"_type\",\"type\":\"string\",\"count\":2,\"scripted\":false,\"searchable\":true,\"aggregatable\":true,\"readFromDocValues\":false},{\"name\":\"logEvents.id\",\"type\":\"string\",\"count\":0,\"scripted\":false,\"searchable\":true,\"aggregatable\":false,\"readFromDocValues\":false},{\"name\":\"logEvents.id.keyword\",\"type\":\"string\",\"count\":0,\"scripted\":false,\"searchable\":true,\"aggregatable\":true,\"readFromDocValues\":true},{\"name\":\"logEvents.message\",\"type\":\"string\",\"count\":0,\"scripted\":false,\"searchable\":true,\"aggregatable\":false,\"readFromDocValues\":false},{\"name\":\"logEvents.message.keyword\",\"type\":\"string\",\"count\":0,\"scripted\":false,\"searchable\":true,\"aggregatable\":true,\"readFromDocValues\":true},{\"name\":\"logEvents.timestamp\",\"type\":\"number\",\"count\":0,\"scripted\":false,\"searchable\":true,\"aggregatable\":true,\"readFromDocValues\":true},{\"name\":\"logGroup\",\"type\":\"string\",\"count\":2,\"scripted\":false,\"searchable\":true,\"aggregatable\":false,\"readFromDocValues\":false},{\"name\":\"logGroup.keyword\",\"type\":\"string\",\"count\":0,\"scripted\":false,\"searchable\":true,\"aggregatable\":true,\"readFromDocValues\":true},{\"name\":\"logStream\",\"type\":\"string\",\"count\":2,\"scripted\":false,\"searchable\":true,\"aggregatable\":false,\"readFromDocValues\":false},{\"name\":\"logStream.keyword\",\"type\":\"string\",\"count\":0,\"scripted\":false,\"searchable\":true,\"aggregatable\":true,\"readFromDocValues\":true},{\"name\":\"messageType\",\"type\":\"string\",\"count\":0,\"scripted\":false,\"searchable\":true,\"aggregatable\":false,\"readFromDocValues\":false},{\"name\":\"messageType.keyword\",\"type\":\"string\",\"count\":0,\"scripted\":false,\"searchable\":true,\"aggregatable\":true,\"readFromDocValues\":true},{\"name\":\"owner\",\"type\":\"string\",\"count\":2,\"scripted\":false,\"searchable\":true,\"aggregatable\":false,\"readFromDocValues\":false},{\"name\":\"owner.keyword\",\"type\":\"string\",\"count\":0,\"scripted\":false,\"searchable\":true,\"aggregatable\":true,\"readFromDocValues\":true}]"
     }
    }
    '

If you inspect the path, you can see we gave the index pattern an ID
of `logging-all`.

### Where’s my default index pattern?

Unfortunately, the index pattern we created hasn’t been set as the
default. This won’t happen automatically, even if it’s the only one
present. If we were to use the Kibana web console at this moment, we’d be
prompted to select a default.

We can use the
[web console](https://www.elastic.co/guide/en/kibana/current/index-patterns.html#set-default-pattern)
to manually select this index pattern as our default. But that’s not going to
fly anymore. This needs to be automated.

Let’s just quickly browse through some documentation.

Or maybe Google.

Maybe Google just a little while longer.

`POST` to `.kibana/config/5.6.4`? How old is this forum post?

`POST` to `api/kibana/settings/defaultIndex`? Well, which path is it?

Why are none of these commands working?!

### Just make it default, please

Sure thing!

    awscurl --service es -H 'Content-Type: application/json;
    charset=utf-8' -H 'kbn-xsrf: true' -XPOST
    'http://YOUR_ENDPOINT/_plugin/kibana/api/saved_objects/index-pattern/logging-all?overwrite=true' -d '{
    "changes": {
    "defaultIndex": "logging-all"
    }
    }'

That’s it.

What is that, you ask?  It’s the same request that the Kibana web console uses
to mark an index pattern as default. Remember to change the **logging-all** value
to match the ID of your index pattern. Though undocumented, it has been
tested on Amazon Elasticsearch Service and Kibana 6.3. If it’s good enough for
the Kibana web console, it’s good enough for me.

Armed with this technique, you can provision and configure your Amazon
Elasticsearch Service clusters with reliability and confidence! Thanks for
reading!

<a class="cta teal" id="cta" href="https://www.rackspace.com/aws">Learn more about our AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
