---
layout: post
title: "How data lakes and data warehouses support modern data architectures"
date: 2020-12-1
comments: true
author: Adnan Ahmad
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "How data lakes and data warehouses support modern data architectures"
metaDescription: "Now more than ever, businesses need to leverage data, not only to stay relevant
in a highly competitive landscape but also to find new competitive edges."
ogTitle: "How data lakes and data warehouses support modern data architectures"
ogDescription: "Now more than ever, businesses need to leverage data, not only to stay relevant
in a highly competitive landscape but also to find new competitive edges."
slug: "how-data-lakes-and-data-warehouses-support-modern-data-architectures"

---
*Originally published on April 4, 2019 on Onica.com/blog*

Now more than ever, businesses need to leverage data, not only to stay relevant
in a highly competitive landscape but also to find new competitive edges.
To solve data problems, businesses need to collect both application
data from many systems within their operation and the data made available
to them by their business partners.

<!--more-->

Managing such data becomes increasingly challenging as the volume of information continues to grow
This is where data lakes and data warehouses
come into play. To leverage these data-storage structures effectively, it’s important to
understand the difference between them. It’s also important to know that the
discussion is not about choosing between data lakes and data warehouses, but
about when and how we can use these two important types of data-storage systems together.

### The basics of data warehouses

Data warehouses are well-understood data-storage structures that have been around for a
long time. They excel when data is well-structured and has been pre-processed before
storage. This pre-processing, more commonly known as ETL, is critical in making
a data warehouse useful because data warehouses are schema-on-write data-storage systems.

Data in a data warehouse are generally well understood&mdash;we know the content,
as well as why and how we want to use it. The typical users of data warehouses
are business analysts, who prepare reports and dashboards for decision makers.

#### What are the three layers of data warehouse architecture?

Generally, a data warehouses adopts a three-tier architecture.

- **Bottom Tier** – The data warehouse database server, the relational database system. Back-end tools and utilities Extract, Clean, Load, and refresh data.
- **Middle Tier** – The OLAP Server, which is implemented using either the Relational OLAP (ROLAP) or Multidimensional OLAP (MOLAP) model. MOLAP directly implements the data and operations, while ROLAP maps the operations on data to standard relational operations.
- **Top-Tier** – The front-end client layer, which holds the tools and API (i.e. query tools, reporting tools, analysis tools, and data mining tools) to connect and move data in and out.

#### What factors should you consider in choosing the architecture of your data warehousing?

The most important factors for choosing your data warehouse architecture are:

- The strategic view of the warehouse before implementation
- Information interdependence between organizational units
- The information needs of leadership

### The basics of data lakes

While data warehouses thrive on structure and processed data, data lakes are almost the opposite.
The goal of a data lake is to ingest and store data as quickly as possible. Data lakes achieve this
by storing the data with little to no processing. Data in a data lake can come from any business system,
in any format, and the usefulness of the data might not yet be well understood, if at all.

If the data in a data lake is unstructured and the use of the data isn't fully understood,
who is the intended user of this data and what purpose does it serve? The intended
users are data scientists, and one of their primary objectives is to find insights and use
for the data that have not been previously considered. For this reason, data lakes are primarily
schema-on-read systems, because it is unknown how the data will be queried.

### Data warehouses and data lakes in broader business architecture

Data lake occupy a central position in a business' data architecture. A data lake might serve
as a source of data for a data warehouse
(as well as many other data processing systems), whereas usually a data warehouse will
not serve as a source for a data lake.

With a data lake as a central repository of the data generated and collected by a
business, workflows can be modified. Data scientists can explore the data for useful
and interesting new insights. Once they understood the data, it can be pre-processed and
prepared for consumption by a data warehouse, which in turn will drive reporting and
dash-boarding. This can facilitate better decision making by business leaders.

<a class="cta purple" id="cta" href="https://www.rackspace.com/onica">Learn more about our Data services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
