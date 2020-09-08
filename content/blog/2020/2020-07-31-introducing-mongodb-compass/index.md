---
layout: post
title: "Introducing MongoDB Compass"
date: 2020-07-31
comments: true
author: Sandeep Malik
authorAvatar: 'https://gravatar.com/avatar/76d7fd8c7c9571af83722bff445e0ebd'
bio: "I am a senior Database Administrator, who works on Oracle Database (9i,10g,11g,12c,19c), Oracle Apps (E-Business Suite - 11i, R12.1), SQL Server (2012,14,16,17), Cassandra, MongoDB and Hadoop administration."
published: true
authorIsRacker: true
categories:
    - Database
metaTitle: "Introducing MongoDB Compass"
metaDescription: "This post introduces the GUI for MongoDB&reg;, known as the MongoDB Compass."
ogTitle: "Introducing MongoDB Compass"
ogDescription: This post introduces the GUI for MongoDB&reg;, known as the MongoDB Compass."
slug: "introducing-mongodb-compass"

---

This post introduces the GUI for MongoDB&reg;, known as the MongoDB Compass.

<!--more-->

### Overview

Compass allows you to analyze and understand your MongoDB data without any formal
knowledge of MongoDB query syntax. You can use Compass to optimize query
performance, manage indexes, and implement document validation in addition to
exploring the data in a visual environment.

### Compass editions

Compass has three main editions:

- **Compass**: The full version with all the features and capabilities.

- **Compass Readonly**: Limited strictly to read operations, with all write and
  delete capabilities removed.

- **Compass Isolated**: Designed for highly secure environments and does not
  initiate any network requests except to the MongoDB server to which Compass
  connects.

**Note:** The Compass Community edition is now deprecated.

### Set up Compass

Software requirements for a Linux&reg; platform include the following components:

- 64-bit version of RHEL 7+ or later.
- MongoDB Version 3.6 or later.

Use the following instructions to download and install Compass:

1. Download the .rpm package for the latest version of Compass for Red Hat&reg;
   Enterprise Linux from [MongoDB](https://www.mongodb.com/download-center/compass?tck=docs_compass)
   as shown in the following image:

      {{<image src="Picture1.png" title="" alt="">}}

2. Run the following command to install Compass by using `yum`:

        sudo yum install mongodb-compass-1.20.4.x86_64.rpm

3. Run the following command to start Compass:

        mongodb-compass

### Connect to MongoDB from Compass

Use the following instructions to begin administering MongoDB from Compass:

1. To open the MongoDB Compass GUI and connect to MongoDB, either use a
   connection string or fill in the connection details, as shown in the following
   image:

      {{<image src="Picture2.png" title="" alt="">}}

2. Connect to MongoDB from localhost on the default MongoDB port, `27017`, as
   shown in the following image:

      {{<image src="Picture3.png" title="" alt="">}}

### Create a new database

**Note**: The default  MongoDB databases include **Admin**, **config**, and **local**.

Use the following instructions to create a new database in Compass:

1. Click **CREATE DATABASE** as shown in the following image:

      {{<image src="Picture4.png" title="" alt="">}}

2. Provide the database name, `test`, and collection name, `mongo_docs`, as
   shown in the following image:

      {{<image src="Picture5.png" title="" alt="">}}

The preceding steps create a new database, **test**.

{{<image src="Picture6.png" title="" alt="">}}

### Conclusion

Compass is a great, user-friendly tool with different editions that enable you
to choose the best option for your needs. In fact, leading IT firms like
Google&reg;, Cisco&reg, , SAP&reg;, Facebook&reg;, Adobe&reg;, and others rely
on Compass. The MongoDB community delivers timely releases providing new versions
of the editions with improved features to help you easily manage MongoDB databases
by using the Compass GUI.

<a class="cta teal" id="cta" href="https://www.rackspace.com/dba-services">Learn more about Databases.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
