---
layout: post
title: "Einstein Analytics snapshotting: Find trends and patterns in your data"
date: 2020-06-29
comments: true
author: Mitchell McLaughlin
published: true
authorIsRacker: true
authorAvatar: 'https://media-exp1.licdn.com/dms/image/C5603AQH5r2hzui051w/profile-displayphoto-shrink_100_100/0?e=1596672000&v=beta&t=ar809F1WbFhkJXAvxbf12x6Dh0PmTaGgyeQqgKrATWA'
bio: "Mitchell is proficient in Salesforce CRM development, administration, and
analysis with 5+ years of experience implementing and developing complex solutions
for enterprise clients. Mitchell is an 8x Salesforce certified developer and
Analytics Champions group member specifically focused on Sales Cloud and Einstein
Analytics. His background in Full Stack and .NET development also makes him an
ideal candidate to help with Salesforce Integrations."
categories:
    - Salesforce
metaTitle: "Einstein Analytics snapshotting: Find trends and patterns in your data"
metaDescription: "Snapshotting data can be a potent tool in Salesforce Einstein
Analytics (EA). In this post, we look at standard and custom methods to set up
snapshotting and create the datasets required for reporting."
ogTitle: "Einstein Analytics snapshotting: Find trends and patterns in your data"
ogDescription: "Snapshotting data can be a potent tool in Salesforce Einstein
Analytics (EA). In this post, we look at standard and custom methods to set up
snapshotting and create the datasets required for reporting."
slug: 'einstein-analytics-snapshotting-find-trends-and-patterns-in-your-data'
---

Snapshotting data can be a potent tool in Salesforce Einstein Analytics (EA). In
this post, we look at standard and custom methods to set up snapshotting and
create the datasets required for reporting.

<!--more-->

But first, what is snapshotting? A snapshot, a full-volume copy of data at a
particular point in time, allows users to capture periodic point-in-time
summaries across various data types.

Snapshots deliver trend and point-in-time comparative analysis to every role of
the Salesforce organization. For example, if you want to capture opportunities,
there might be 100 records for a month. If you choose to snapshot every month,
you will have 1200 records after a year. You can then filter the snapshot data
to compare "now versus then" or look at growth calculations.

Setting up snapshotting is a one-time process, and it's even quicker if you have
existing datasets in EA.

### Option One: The standard method

Salesforce EA provides a solution for us out of the box&mdash;the Snapshot
Analytics application. To install this tool from EA, perform the following steps:

1. Choose **Create** on the top right of the window.

{{<image src="Picture1.png" alt="" title="">}}


<ol start=2>
    <li>Choose <b>Start From Template</b>.</li>
</ol>

{{<image src="Picture2.png" alt="" title="">}}


<ol start=3>
    <li>Search for <b>Snapshot Analytics</b>.</li>
</ol>

{{<image src="Picture3.png" alt="" title="">}}


<ol start=4>
    <li>Select <b>personalize using Salesforce objects</b> and choose the object you
   want to capture in your snapshotting dataset.</li>
</ol>

{{<image src="Picture4.png" alt="" title="">}}


<ol start=5>
    <li>The next page prompts you to choose the fields to include in the snapshotting
   dataset. For <em>Opportunity</em> capturing, you could select:
     <ul>
      <li>Opportunity name</li>
      <li>Stage</li>
      <li>Forecast Category</li>
      <li>Close Date</li>
      <li>Amount</li>
    </ul>
   </li>
</ol>

<ol start=6>
    <li>The next prompt asks how often to run the snapshot. Thirty days is usually an
   excellent window to avoid storage limits.</li>
</ol>

Congratulations! At this point, the app should have created a new dataflow,
dataset, and dashboard. The dataset is extremely powerful because you can create
custom dashboards to compare the previous and current state of many data metrics
and trends in your data. The app comes with a dashboard, **Snapshot Trend**, as
shown in the following image:

{{<image src="Picture5.png" alt="" title="">}}

This dashboard is dynamic, depending on which fields you opt to capture. For
example, if you captured the **Opportunity Stage**, you can choose **Stage** as
the grouping instead of **Opportunity Type**, as shown in the previous image.

### Option Two: The custom method

Another option is to create snapshotting manually by using EA Dataflow. This
option is more complex and requires some background experience with customizing
EA dataflows, but it provides more customization options. Customizations include
snapshotting compute expressions, augmented datasets, union datasets, and more.

The following image shows a mockup of how to build snapshotting in Dataflow:

{{<image src="Picture6.png" alt="" title="">}}

**Source 1** can be any node or source of data that you can bring into a dataflow.
This source could be a direct digest from standard or custom objects, an augmented
or union dataset, a CSV file created by using an Edgemart node, and so on.

The existing snapshot dataset holds historical snapshots or an empty container
at creation. The idea is to join (union) or append these datasets together and
register the result back to the container. You can think of that logic as taking
something, adding to it, and then putting it back.

The following image shows this in the dataflow. You can replace **Source 1**
with anything, including another Edgemart or digest.

{{<image src="Picture7.png" alt="" title="">}}


The only extra node required in **Source 1**, is the compute expression, which
generates the current date, **Compute_Snapshot_Date**.

{{<image src="Picture8.png" alt="" title="">}}


{{<image src="Picture9.png" alt="" title="">}}


Commonly, you create another compute expression, which creates a text version
of this same snapshot date used for a dropdown filter.

{{<image src="Picture10.png" alt="" title="">}}

After you complete the dataflow work, you can hit save and schedule the dataflow
to run as often as you'd like to snapshot the data, as shown in the following
images:

{{<image src="Picture11.png" alt="" title="">}}

### Conclusion

Snapshotting data is a powerful tool in EA. With a one-time setup, you can see
data in its historical state, which lets you find data trends.

Here are a few use cases:

1. Track *red* opportunities or high-risk revenue weekly.

2. Monitor forecast accuracy.

3. Identify the number of cases opened period-over-period.

4. Monitor active Salesforce users.

You can set up snapshotting quickly in EA. You can then use its vast functionality
to create many useful dashboards, which can be a great help to all types of
businesses in the Salesforce clouds and platforms.

<a class="cta red" id="cta" href="https://www.rackspace.com/salesforce">Learn more about Salesforce Customer Relationship Management (CRM).</a>

Visit [www.rackspace.com](https://www.rackspace.com) and click **Sales Chat**
to get started.

Use the Feedback tab to make any comments or ask questions.
