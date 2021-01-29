---
layout: post
title: "How to use the AWS CLI to find untagged instances"
date: 2021-01-29
comments: true
author: Onica team
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "How to use the AWS CLI to find untagged instances"
metaDescription: "I often need to find AWS EC2  instances without a particular tag.
Therefore, I made it my mission to figure out how to get instances missing a tag through
AWS CLI instead of using external tools like jq or Python&reg;."
ogTitle: "How to use the AWS CLI to find untagged instances"
ogDescription: "I often need to find AWS EC2  instances without a particular tag. Therefore,
I made it my mission to figure out how to get instances missing a tag through AWS CLI
instead of using external tools like jq or Python&reg;."
canonical: https://onica.com/blog/devops/using-aws-cli-to-find-untagged-instances/
slug: "how-to-use-the-aws-cli-to-find-untagged-instances"

---

*Originally published in Feb 2017, at Onica.com/blog*

I often need to find AWS&reg; EC2&reg; instances without a particular tag. Usually, it's
the **Name** tag, but other tags come up from time to time (we use a tag of `Owner` quite
a bit). 

<!--more-->

### Use the AWS CLI to find instances without a *Name* tag

After coming across [this Reddit post](https://www.reddit.com/r/aws/comments/5unh0g/finding_ec2_instances_which_lack_a_certain_tag/)
and [this Stack Overflow question](https://stackoverflow.com/questions/18858120/finding-all-amazon-aws-instances-that-do-not-have-a-certain-tag),
we made it our mission to figure out how to get instances that were missing a tag through
the AWS command line interface (CLI) instead of using external tools like jq or python.

### The `--Query` Parameter, JMESPath, and filtering

[JMESPath](https://jmespath.org/) is the engine behind the **--query** parameter in AWS
CLI. In its most basic form, it helps you filter out or traverse JSON. AWS has
[some nice documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-output.html)
describing how to use it at a basic level. In this post, we focus on the filtering ability
of JMESPath.

Using the bracket and a question mark triggers the JMESPath filter: `[? ... ]`

#### Find an instance with a specific tag

For example, many people want to get the instance **Name** tag and the **InstanceId**. You
can do this by using the filter for the `Tags → Key=='Name'`, as shown in the following
example:

    aws ec2 describe-instances \
     --output text \
     --query 'Reservations[].Instances[].[Tags[?Key==`Name`].Value|[0],InstanceId]'

#### Find an instance without a tag

While this is useful, we actually want to do the opposite. So, we start by diving down into
each instance:

    aws ec2 describe-instances \
     --query 'Reservations[].Instances[]'

This operation spits out each of the instances. Then, we create a filter on each of these
where the **Name** tag doesn't exist. A tag that exists would look similar to the following
example:

    aws ec2 describe-instances \
     --query 'Reservations[].Instances[?Tags[?Key != `Name`]]'

The problem with this filter is that as we loop through the **Tags** array, we'll most
likely hit an instance with more than one tag. That instance registers `true` because the
first tag may have `"Key:" "SomeTag"` (but the second could be `"Key:" "Name"`). So we want
to look for the object with the **Name** key but with no value (aka `null`).

#### Solution

First, lets get the value from the **Name** tag:

    aws ec2 describe-instances \
     --query 'Reservations[].Instances[].Tags[?Key == `Name`].Value'

Now we can use the JMESPath **not_null()** function to filter for ones that exist:

    aws ec2 describe-instances \
     --query 'Reservations[].Instances[?not_null(Tags[?Key == `Name`].Value)]'

The problem is that this still captures anything *with* a **Name** tag. So we negate it.
That is, we want anything that *isn't* `not_null` [aka not not null]!

    aws ec2 describe-instances \
     --query 'Reservations[].Instances[?!not_null(Tags[?Key == `Name`].Value)]'

This operation returns something similar to the following:

    [
      [
        {
            "Monitoring": {
                "State": "disabled"
            }, 
            "PublicDnsName": "", 
            "RootDeviceType": "ebs"
            ...
        }
      ], 
      [], 
      [], 
      [], 
      [], 
      [], 
      [], 
      [
        {
            "Monitoring": {
                "State": "disabled"
            }, 
            "PublicDnsName": "", 
            "RootDeviceType": "ebs"
            ...
        }
      ], 
      []
    ]

We don't want to have these empty arrays, so we flatten the instance object with a pipe:

    aws ec2 describe-instances \
      --query 'Reservations[].Instances[?!not_null(Tags[?Key == `Name`].Value)] | []'

And that's it! 

#### Other examples

If you want a few more examples of some common uses, here you go:

- Display InstanceId of instances that have no Name tag:

        aws ec2 describe-instances \
          --output text \
          --query 'Reservations[].Instances[?!not_null(Tags[?Key == `Name`].Value)] | [].[InstanceId]'
 
- Display InstanceId of running instances that have no Owner tag:

        aws ec2 describe-instances \
          --output text \
          --filters Name=instance-state-name,Values=running \
          --query 'Reservations[].Instances[?!not_null(Tags[?Key == `Owner`].Value)] | [].[InstanceId]'
 
- Display VolumeId and Size of volumes that have no Name tag:

        aws ec2 describe-volumes \
          --output text \
          --query 'Volumes[?!not_null(Tags[?Key == `Name`].Value)] | [].[VolumeId,Size]'
 
- Display SnapshotId and StartTime of my snapshots that have no CreatedBy tag:

        aws ec2 describe-snapshots \
          --output text \
          --owner-ids self \
          --query 'Snapshots[?!not_null(Tags[?Key == `CreatedBy`].Value)] | [].[SnapshotId,StartTime]'

### Why search for untagged instances with AWS CLI?

There are many reasons to tag instances, including
[automation and console organization](https://d1.awsstatic.com/whitepapers/aws-tagging-best-practices.pdf),
but at Rackspace Technology Onica, our biggest driver is *cost*. Employing a tagging policy to
help track your instances' cost allocation is an important step in optimizing your AWS cost!
 
For more tips and tricks to lower your monthly AWS cost by up to 50%,
[download our eBook](https://insights.onica.com/cost-optimization-2020)!

(<a class="cta purple" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>) for assistance.

Use the Feedback tab to make any comments or ask questions. You can also click
**Let's Talk** to [start the conversation](https://www.rackspace.com/).

