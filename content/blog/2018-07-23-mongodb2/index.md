---
layout: post
title: "MongoDB tips: Part 2"
date: 2018-07-23
comments: true
author: Pavan Paramathmuni
published: true
authorIsRacker: true
categories:
  - database
---

Originally published by Tricore: Aug 24, 2017

In [Part 1](https://developer.rackspace.com/blog/mongodb1/)
of this series, we shared some tips for using MongoDB. In Part 2,
we cover several more MongoDB topics, including optimization, performance,
speed, indexing, schema design, and data safety.

<!--more-->

### Tip 1: Learn to use the ``--notablescan`` option in development (but not in production)

![Icon of looking for files](picture1.png)

**Source: [www.percona.com](https://www.percona.com)**

MongoDB has a ``--notablescan`` option that returns an error when a query
needs to perform a full table scan. This option can be handy in development
environments if you want to make sure that all of your queries are hitting
indexes. However, we don't recommend using it in a production environment
because it might cause performance issues. The problem is that many simple
administrative tasks require table scans. This option enables you to see a
list of the collections in your database that require a full table scan.

### Tip 2: Manage all servers and databases from a single shell

By default, MongoDB connects to ``localhost: 27017``. You can connect to any
server on startup by running ``mongo host: port/database``. You can also
connect to multiple servers or databases within the shell.

For example, suppose that we have an application that uses both a dealer's
database and a distributor's database. With MongoDB, we could switch back and
forth between the two databases within the same shell.

### Tip 3: Know JavaScript

When you're using a language that has its own great shell, you should
be familiar with JavaScript&reg;. The JavaScript language is common among
MongoDB users because it's the quickest and best way to access information.
JavaScript is a very flexible and powerful language with excellent features
that will help you get as much as possible out of the shell.

### Tip 4: Take instant-in-time backups of servers

To take a backup of a database with journaling enabled, you can either
take a file system snapshot or do a normal ``fsync+lock`` and then a dump.
Note that you can't just copy all of the files without ``fsync`` and
locking, because copying is not an instantaneous operation. If the copy of
the journal files and the backups reside on different volumes, then the
backups might become useless at a later point in time.

### Tip 5: Try to fetch data from a single query

The term *application unit* is used for some types of application work. An
application unit is essentially a discrete unit of work that your application
does that might involve accessing a database. You should design MongoDB
schemas to do one query per application unit.

If you have a web or mobile application, you can think of an application unit
as a request to the back end.

Here are a some other examples:

- For a desktop application, an application unit might refer to a user-client
  interaction.

- For an analytics system, an application unit might refer to a dashboard load.

### Conclusion

MongoDB is a fast, robust, and highly scalable database. It works on many
platforms and has many language drivers for optimal usage.

MongoDB is becoming more popular every day. Understanding the basics of
MongoDB and how to use it well is a great move for any developer.

Are you learning to use MongoDB? Tell us about your experience by using the
Feedback Tab.
