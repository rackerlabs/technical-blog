---
layout: post
title: "Get started with ObjectRocket CockroachDB"
date: 2020-11-03
comments: true
author: Sam Hagin
bio: "Seasoned Data Engineer, System Administrator, and Web Development professional with over 7 years of
combined experience working with Linux, Apache, MySQL, MongoDB, ElasticSearch, PHP, Python, Perl, HTML, CSS, JavaScript"
published: true
authorIsRacker: true
categories:
    - Database
    - ObjectRocket
metaTitle: title: "Get started with ObjectRocket CockroachDB"
metaDescription: "Traditionally, NoSQL&reg; databases scale better than SQL&reg; databases
because of their non-relational nature. CockroachDB bridges the gap between NoSQL and SQL
databases by providing scalability."
ogTitle: title: "Get started with ObjectRocket CockroachDB"
ogDescription: "Traditionally, NoSQL&reg; databases scale better than SQL&reg; databases
because of their non-relational nature. CockroachDB bridges the gap between NoSQL and SQL
databases by providing scalability."
slug: "get-started-with-objectrocket-cockroachdb"
canonical: https://www.objectrocket.com/blog/cockroachdb/getting-started-with-objectrockets-cockroachdb/

---

*Originally published on Jan 13, 2020, at ObjectRocket.com/blog*

Traditionally, NoSQL databases scale better than SQL databases because of their non-relational nature.
CockroachDB&reg; bridges the gap between NoSQL and SQL databases by providing scalability.

<!--more-->

{{<img src="picture1.jpg" title="" alt="">}}

The system architecture of NoSQL databases, which are document key/value stores, makes it easier to scale horizontally
by adding more servers. On the other hand, SQL databases have important features like atomicity, consistency, isolation
and durability (ACID) compliance, advanced transactional capabilities, and strong data integrity by enforcing schemas
for database tables.

CockroachDB, a distributed SQL (or NewSQL) database, bridges the gap between NoSQL databases and SQL databases by providing
most features of NoSQL databases while still maintaining ACID compliance and providing support for complex transactions.
CockroachDB is highly-resilient, distributed, and provides SQL at scale. 

### Try it out now

You can create new instances at no charge and try this NewSQL database out for yourself. Follow these steps to get
started with CockroachDB on the ObjectRocket platform:

1. Log in to [Mission Control](https://app.objectrocket.cloud/). If you don't have an ObjectRocket account, you can sign
   up by clicking **Sign Up**.

   {{<img src="picture2.png" title="" alt="">}}

2. Click **Create Instance**. Give the instance a name and choose **CockroachDB** as the type of service. You can then
   select the version and the region.

   {{<img src="picture3.png" title="" alt="">}}

3. Next, use the `–` and `+` buttons to modify the capacity (storage/memory), if needed. You can also choose
   between **Basic** or **Standard** for the instance size.

   {{<img src="picture4.png" title="" alt="">}}

4. Define which IP addresses are allowed to connect to the instance. You can allow all IP addresses to connect by choosing
   the **ALLOW ANY IP** option or allow your own computer’s IP address to connect by selecting the **USE MY IP** button.
   Alternatively, you can type in the computer or server IP address from which you want to connect. Select the role to grant
   to the IP address (either access to the CockroachDB instance using CLI or to the CockroachDB Admin UI). Then click **ADD**.
   Note that the CockroachDB Admin UI role grants access to the admin UI only, while the CockroachDB role grants access to
   both (CLI and Admin UI).

   {{<img src="picture5.png" title="" alt="">}}

5. Click **CREATE INSTANCE** at the bottom of the page. The instance will be ready to use within a couple of minutes. The
   [instances page](https://app.objectrocket.cloud/mission-ctrl/instances) on **Mission Control** shows the newly created
   CockroachDB instance. Click the arrow button in the upper right to expand the view and then click **VIEW MORE DETAILS.**

   {{<img src="picture6.png" title="" alt="">}}

6. Create a database by clicking **DATABASES**, name your database, and click the **checkmark** icon. 

   {{<img src="picture7.png" title="" alt="">}}

7. Click **USERS** to add a new user. Enter a username and password, choose the role (currently only `admin`),
   and click the **checkmark** icon.

{{<img src="picture8.png" title="" alt="">}}

8. Connect to the instance by using these steps:
    1. Install the CockroachDB command-line client (CLI) following the instructions.
    2. In your ObjectRocket UI **Mission Control**, click the **Connect** tab and copy the connection string
       provided, simlar to the following example: `postgres://DBUSER:DBPASS@ingress.w89sujpz.launchpad.objectrocket.cloud:2166/DBNAME?sslmode=require`
    3. In your terminal, use the CockroachDB command line client to run the command: `cockroach sql --url "postgres://DBUSER:DBPASS@ingress.w89sujpz.launchpad.objectrocket.cloud:2166/demo?sslmode=require"`

If you’re connecting through a programming language such as Python&reg;, PHP&trade;, Java&reg;, Ruby, or
Node.js&reg;, you can find information on client drivers at [https://www.cockroachlabs.com/docs/stable/install-client-drivers.html](https://www.cockroachlabs.com/docs/stable/install-client-drivers.html).

On the **Connect** tab, you can find the URL for the CockroachDB admin UI. To access the admin UI, ensure the IP that you’re connecting from is whitelisted (using the **Whitelist IPs** button). You can connect by using the same username and password you created earlier.

{{<img src="picture9.png" title="" alt="">}}

{{<img src="picture10.png" title="" alt="">}}

Within the UI, you can view the cluster health, view node, replica status, SQL performance, and more. 

### Benefits of deploying CockroachDB on ObjectRocket

+ **Scale CockroachDB on-demand:** Add more nodes by using our API.
+ **Security:** We protect CockroachDB instances through RBAC, access control lists (ACL), and TLS encryption at
  rest/transit/in use. Also, all users must authenticate to connect. 
+ **Backups:** We provide daily backups for each instance (14-day backup retention)and Point-in-Time recovery. 
+ **Access to our world-class support and 24/7 monitoring:** We support all of your instances. 
+ **Multiple Cloud providers:** Our fully-managed CockroachDB service supports applications hosted on **AWS** and **GCP**.

Now that you know how to get started using CockroachDB on ObjectRocket and understand the awesome benefits of deploying a
cluster with us, go forth and build one. Check it out and let us know what you think. If you have any questions getting
started, email us at support@objectrocket.com.

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.

Click here to view [The Rackspace Cloud Terms of Service](https://www.rackspace.com/cloud/legal/).
