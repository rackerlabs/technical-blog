---
layout: post
title: "How data lakes and data warehouses support modern data architectures"
date: 2020-12-1-
comments: true
author: Adnan Ahmad
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "How data lakes and data warehouses support modern data architectures"
metaDescription: "."
ogTitle: "How data lakes and data warehouses support modern data architectures"
ogDescription: "."
slug: "how-data-lakes-and-data-warehouses-support-modern-data-architectures"

---
*Originally published on April 4, 2019 on Onica.com/blog*

Now more than ever, businesses need to leverage data, not only to stay relevant
in a highly competitive landscape but also to find new competitive edges.
In order to solve data problems, businesses need to collect both application
data from multiple systems within their operation and data that is made available
to them by their business partners.

<!--more-->

Managing such data becomes increasingly challenging as the volume of information grows,
which is occurring at an ever-increasing pace. This is where data lakes and data warehouses
come into play. To leverage these data-storage structures effectively, it’s important to
understand the difference between them. However, it’s also important to be aware that the
discussion is not about choosing between “data lakes vs. data warehouses,” but rather
about when and how these two important types of data-storage systems can be used together.

### The Basics of Data Warehouses

Data warehouses are well-understood data-storage structures and have been around for a
long time. They excel when data is well-structured and has been pre-processed before
being stored. This pre-processing, more commonly known as ETL, is critical in making
a data warehouse useful since data warehouses are schema-on-write data-storage systems.

Data in a data warehouse are generally well understood — we know the content,
and why and how we want to use it. The typical user population of data warehouses
is made up of business analysts, who prepare reports and dashboards for decision makers.

#### What are the three layers of data warehouse architecture?

Generally a data warehouses adopts a three-tier architecture.

- **Bottom Tier** – The data warehouse database server, the relational database system. Back-end tools and utilities Extract, Clean, Load, and refresh data.
- **Middle Tier** – The OLAP Server, which is implemented using either the Relational OLAP (ROLAP) or Multidimensional OLAP (MOLAP) model. MOLAP directly implements the data and operations, where as ROLAP maps the operations on data to standard relational operations.
- **Top-Tier** – The front-end client layer, which holds the tools and API (i.e. query tools, reporting tools, analysis tools, and data mining tools) to connect and move data in and out.

#### What factors should you consider in choosing the architecture of your data warehousing?

The most important factors in choosing your data warehouses architecture are:

- The strategic view of the warehouse prior to implementation
- Information interdependence between organizational units
- The information needs of leadership

### The Basics of Data Lakes

Whereas data warehouses thrive on structure and processed data, data lakes are almost the opposite.
The imperative with a data lake is to ingest and store data as quickly as possible. This is achieved
by storing the data with little to no processing. Data in a data lake can come from any business system,
in any format, and the usefulness of the data may not yet be understood well, if at all.

If the data in a data lake is unstructured and the use of the data is not fully understood,
who is the intended user of this data and what purpose do the users have for it? The intended
users are data scientists, and one of their primary objectives is to find insights and uses
for the data that have not been considered previously. For this reason, data lakes are primarily
schema-on-read systems, since it is unknown how the data will be queried.

### Data Warehouses and Data Lakes in Broader Business Architecture

In the broader view of a business’s data architecture, we find that a data lake occupies a
central position. A data lake may very well serve as a source of data for a data warehouse
(as well as many other data processing systems), whereas in most cases a data warehouse will
not serve as a source for a data lake.

With a data lake as a central repository of the data generated and collected by a
business, workflows can be modified. Data scientists can explore the data for useful
and interesting new insights. Once the data is understood, it can be pre-processed and
prepared for consumption by a data warehouse, which in turn will drive reporting and
dashboarding. This can ultimately facilitate better decision making by business leaders.

For more information on Onica’s Big Data Practice, visit our Big Data & Analytics page.

<a class="cta purple" id="cta" href="https://www.rackspace.com/sap">Learn more about our SAP services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
