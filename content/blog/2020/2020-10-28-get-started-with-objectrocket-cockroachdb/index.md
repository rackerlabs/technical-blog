---
layout: post
title: "Get started with objectrocket cockroachdb"
date: 2020-10-28
comments: true
author: Sam Hagin
bio: "Seasoned Data Engineer, System Administrator, and Web Development professional with over 7 years of combined experience working with Linux, Apache, MySQL, MongoDB, ElasticSearch, PHP, Python, Perl, HTML, CSS, JavaScript"
published: true
authorIsRacker: true
categories:
    - Database
    - ObjectRocket
metaTitle: "Get started with objectrocket cockroachdb"
metaDescription: "."
ogTitle: "Get started with objectrocket cockroachdb"
ogDescription: "."
slug: "get-started-with-objectrocket-cockroachdb"
canonical: https://www.objectrocket.com/blog/cockroachdb/getting-started-with-objectrockets-cockroachdb/

---

*Originally published on Jan 13, 2020, at ObjectRocket.com/blog*

Traditionally, NoSQL&reg; databases have been known to scale better than SQL&reg; databases due to their non-relational nature. CockroachDB bridges the gap between NoSQL and SQL databases by providing scalability.

<!--more-->

{{<img src="picture1.jpg" title="" alt="">}}

The system architecture of NoSQL databases, document, or key and value stores, makes it easier to scale horizontally by adding more servers. On the other hand, SQL databases have important features like ACID compliance, advanced transactional capabilities, and also strong data integrity by enforcing schemas for database tables.

CockroachDB, a distributed SQL (or NewSQL) database, bridges the gap between NoSQL databases and SQL databases by providing most features of NoSQL databases, while still maintaining ACID compliance and providing support for complex transactions. CockroachDB is highly-resilient, distributed, and provides SQL at scale. 

### Try it out now!

You can create new instances at no charge, and try this NewSQL database out for yourself. Follow these steps to get started with CockroachDB on the ObjectRocket platform:

1. Log in to [Mission Control](https://app.objectrocket.cloud/). If you don't have an ObjectRocket account, you can sign up by clicking on the **Sign Up** link.

{{<img src="picture2.png" title="" alt="">}}

2. Click on **Create Instance.** Give the instance a name, and choose **CockroachDB** as the type of service. You can then select the version and the region.

{{<img src="picture3.png" title="" alt="">}}

3. On the next step, you can use the – and + buttons to increase the capacity (storage/memory). You can also choose between Basic or Standard for the instance size.

{{<img src="picture4.png" title="" alt="">}}

4. Next you will need to define which IP addresses are allowed to connect to the instance. You can allow all IP addresses to connect by choosing the **allow any IP** option, or allow your own computer’s IP address to connect by selecting the **use my IP** button. Alternatively, you can type in the IP of the computer/server that you wish to connect from. Select the role that you wish to grant to the IP (access to the CockroachDB instance using CLI or to the CockroachDB Admin UI), and then click **ADD**. Note that the CockroachDB Admin UI role grants access to the admin UI only, while the CockroachDB role grants access to both (CLI and Admin UI).

{{<img src="picture5.png" title="" alt="">}}

5. Click **create instance** at the bottom of the page. The instance will be ready to use within a couple of minutes. The instances page (https://app.objectrocket.cloud/mission-ctrl/instances) on **Mission Control** will show the newly created CockroachDB instance. You can click on the arrow button in the upper right to expand the view, and then click **view more details.**

{{<img src="picture6.png" title="" alt="">}}

6. Create a database by clicking **databases**, name your database, and click the **check** icon. 

{{<img src="picture7.png" title="" alt="">}}

7. Click **users** to add a new user. Type the _username_, define a _password_, choose the role (currently only admin), then click **check**.

{{<img src="picture8.png" title="" alt="">}}

8. Connect to the instance by using these steps:
    1. Install the CockroachDB command-line client (CLI) following the instructions.
    2. In your ObjectRocket UI **Mission Control** click the **connect** tab and copy the connection string provided. It will be similar to this: `postgres://DBUSER:DBPASS@ingress.w89sujpz.launchpad.objectrocket.cloud:2166/DBNAME?sslmode=require`
    3. In your terminal use the CockroachDB command line client to run the command:
`cockroach sql --url "postgres://DBUSER:DBPASS@ingress.w89sujpz.launchpad.objectrocket.cloud:2166/demo?sslmode=require"`

If you’re connecting via a programming language such as Python, PHP, Java, Ruby, or Node.js, you can find information on client drivers at https://www.cockroachlabs.com/docs/stable/install-client-drivers.html

On the **Connect** tab, you can also find the URL for the CockroachDB admin UI. To access the admin UI, ensure the IP that you’re connecting from is whitelisted (using the Whitelist IPs button), and you can connect using the same username and password you created earlier.

{{<img src="picture9.png" title="" alt="">}}

{{<img src="picture10.png" title="" alt="">}}

Within the UI, you can view the cluster health, view node, replica status, SQL performance, and more. 

### Benefits of deploying CockroachDB on ObjectRocket!

+ **Scale CockroachDB on-demand** by adding more nodes. This can be done via our API.
+ **Security.** Our CockroachDB instances are protected by RBAC, ACLs, TLS encryption at rest/transit/in use, and all users have to authenticate to connect. 
+ **Backups.** We provide daily backups for each instance (14-day backup retention)and Point-in-Time recovery. 
+ **Access to our world-class support and 24/7 monitoring** of your instance. 
+ Our fully-managed CockroachDB service supports applications hosted on **AWS** and **GCP.**
Now that you know how to get started using CockroachDB on ObjectRocket and the awesome benefits of deploying a cluster with us, go forth and build one. Check it out and let us know what you think, and if you have any questions getting started, email us at support@objectrocket.com!

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>

Click here to view [The Rackspace Cloud Terms of Service](https://www.rackspace.com/cloud/legal/).
