---
layout: post
title: "Configure Elasticsearch to use S3 for snapshots"
date: 2020-10-23
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
metaTitle: "Configure Elasticsearch to use S3 for snapshots"
metaDescription: "Data platforms continue to expand and transform. There’s one aspect that never seems to change&mdash;everyone still wants a backup copy of their data! This walkthrough shows you how to leverage the S3 repository plugin with your Rackspace ObjectRocket for Elasticsearch instance."
ogTitle: "Configure Elasticsearch to use S3 for snapshots"
ogDescription: "Data platforms continue to expand and transform. There’s one aspect that never seems to change&mdash;everyone still wants a backup copy of their data! This walkthrough shows you how to leverage the S3 repository plugin with your Rackspace ObjectRocket for Elasticsearch instance."
slug: "configure-elasticsearch-to-use-s3-for-snapshots"
canonical: https://www.objectrocket.com/blog/elasticsearch/elasticsearch-s3/
---

*Originally published on March 2, 2017, at ObjectRocket.com/blog*

Data platforms continue to expand and transform, but one aspect never seems to change&mdash;everyone still wants a backup copy of their data! This walkthrough shows you how to leverage the S3 repository plugin with your Rackspace ObjectRocket for Elasticsearch&reg; instance.

<!--more-->

{{<img src="picture1.jpg" title="" alt="">}}

As data platforms continue to expand and transform one aspect remains the same&mdassh;everyone still wants a backup copy of their data!
The evolution of technology still demands access to backups to restore to a local development environment, a copy for safekeeping or
compliance, and other cases. This post describes how to leverage the S3 repository plugin with your Rackspace&reg; ObjectRocket&reg;
for Elasticsearch instance.

### Snapshot components

Elasticsearch snapshots consist of three main components: a repository, snapshot(s), and a unique snapshot name. A repository contains
specific details about where and how you store the snapshot. Your default nightly ObjectRocket backups are type: `fs`, and S3 backups
are type: `S3`. Both of these have a slightly different settings structure. Here’s an example snippet of a repository:

    GET /_snapshot?pretty
    ...
    {
      "s3_repository" : {
        "type" : "s3",
        "settings" : {
          "bucket" : "MYBUCKETNAME",
          "server_side_encryption" : "false",
          "region" : "us-east-1",
          "compress" : "false"
        }
      }
    }
    ...

Each repository displayed consists of one or more snapshots listed in an array:

    GET /_snapshot/s3_repository/_all?pretty
    [... 
      {
        "snapshot" : "20170208225601",
        "uuid" : "t6R6jxLJTIueQizv9clJYg",
        "version_id" : 5010499,
        "version" : "5.1.1",
        "indices" : [ ".triggered_watches", ".watch_history-2016.10.26", "elastalert_status", "coffee-2016.10.301", ".kibana", "coffee-2016.10.305", "coffee-2016.10.304", "coffee-2016.10.303", "coffee-2016.10.302", ".watches" 
        ],
        "state" : "SUCCESS",
        "start_time" : "2017-02-09T06:56:01.191Z",
        "start_time_in_millis" : 1486623361191,
        "end_time" : "2017-02-09T06:56:12.179Z",
        "end_time_in_millis" : 1486623372179,
        "duration_in_millis" : 10988,
        "failures" : [ ],
        "shards" : {
          "total" : 57,
          "failed" : 0,
          "successful" : 57
        }
      }]

For all `_snapshot` operations, you need to reference the correct repository, snapshot, and snapshot identifier. From the
preceding example, use `snapshot : 20170208225601` as the unique identifier.

#### Sending backups to S3

Setting up your S3 repository with Elasticsearch is a relatively easy process. There are only a few prerequisites to sending
your backups to your S3 bucket: 

1. Install the `repository-s3` plugin.
2. Ensure your cluster can externally reach S3.
3. Have proper credentials (bucket, secret, and key) for S3. 

If you have an ObjectRocket Elasticsearch instance, the first two steps should be in place by default, and you need to have
your S3 credentials for the third component. If you want to restrict the Elasticsearch snapshot process, create a **Custom Policy**
with the AWS&reg; IAM console. The Policy Document should look similar to the following example (replacing MYBUCKETNAME):

    {
      "Statement": [
        {
          "Action": [
            "s3:ListBucket",
            "s3:GetBucketLocation",
            "s3:ListBucketMultipartUploads",
            "s3:ListBucketVersions"
          ],
          "Effect": "Allow",
          "Resource": [
            "arn:aws:s3:::MYBUCKETNAME"
          ]
        },
        {
          "Action": [
            "s3:GetObject",
            "s3:PutObject",
            "s3:DeleteObject",
            "s3:AbortMultipartUpload",
            "s3:ListMultipartUploadParts"
          ],
          "Effect": "Allow",
          "Resource": [
            "arn:aws:s3:::MYBUCKETNAME/*"
          ]
        }
      ],
      "Version": "2012-10-17"
}

With the prerequisites out of the way, the first step is to create your S3 repository:

    PUT /_snapshot/s3_repository
    {
      "type": "s3",
      "settings": {
        "bucket": "MYBUCKETNAME",
        "region": "us-east-1",
        "access_key": "KEY",
        "secret_key": "SECRET"
      }
    }'

After you create the repository, you can perform all of the standard \_snapshot operations. If you want to take a new snapshot,
access the following endpoint and define your **SNAPSHOT_NAME**:

    PUT /_snapshot/s3_repository/SNAPSHOT_NAME?wait_for_completion=false

Snapshots sometimes take a while to run, so you might want to check on the status of an *in-flight* snapshot. Using this endpoint
shows you more details about any currently running snapshot or restore operations:

    GET /_snapshot/_status

Now let’s say we deleted all of our indexes right after our last snapshot completed and quickly regretted our decision. To restore
all indexes from a S3 snapshot, run the following command:

    POST /_snapshot/s3_repository/SNAPSHOT_NAME/_restore

If you need to restore indexes selectively, modify the format a bit. For example:

    POST /_snapshot/s3_repository/SNAPSHOT_NAME/_restore
    {
      "indices": "myindex_1,myindex_2",
      "ignore_unavailable": true
    }

It is worth pointing out that only one snapshot or restore operation can be running on a cluster at a time. Additionally,
snapshots have a slight performance impact on your cluster, so ensure your backup policy is not too aggressive! 

As always, feel free to contact us should you run into trouble with these steps at [support@objectrocket.com](https://auth.objectrocket.cloud/login?state=g6Fo2SBCaWxfYUdPSnhCd3hGWnMxNk5obUp0cFlXT1VIRmJSZaN0aWTZIGlFdHhNME5Lb205WTg1WEJVU2ZXQTNESEZFa1F4cExQo2NpZNkgVFpENzVQcm55b1pBSUNtSjNSYjJHMEw4VkM0bzBib2M&client=TZD75PrnyoZAICmJ3Rb2G0L8VC4o0boc&protocol=oauth2&response_type=token%20id_token&nonce=068852a9-8562-4b36-bf25-a79a5d728f64&scope=openid%20email%20name&redirect_uri=https%3A%2F%2Fapp.objectrocket.cloud%2Fsession-callback&audience=https%3A%2F%2Fapi.objectrocket.cloud&_ga=2.236108097.1797400172.1603119104-1358969005.1602515327&__hsfp=176983327&__hstc=227540674.6c2da1a33c3f4e98dc8ac794308ed907.1602515328573.1603391545358.1603396476758.44&__hssc=227540674.1.1603396476758)

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
