---
layout: post
title: "Creating and connecting to a database in MongoDB Atlas"
date: 2021-10-18
comments: true
author: D.V. Prakash
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - Database
metaTitle: "Creating and connecting to a database in MongoDB Atlas"
metaDescription: "MongoDB is one of NOSQL databases in market which are used for general purpose, and it is open-source document database and build on C++."
ogTitle: "Creating and connecting to a database in MongoDB Atlas"
ogDescription: "MongoDB is one of NOSQL databases in market which are used for general purpose, and it is open-source document database and build on C++."
slug: "creating-and-connecting-to-a-database-in-mongodb-atlas"

---

MongoDB is one of the NOSQL databases in the market which are used for general purposes, and it is an open-source document database and built on C++.

<!--more-->
This blog demonstrates the below  items
1.	Creating a Cluster in the cloud

2.	Installing Mongodb Compass to connect

3.	Connecting to MongoDB cluster using Compass 

4.	Creating a Database

### Terminology used in MongoDB:

Database: It is a Physical Container  for collections.

Collection: It is a group of MongoDB documents. It is equal to a table in sql databases such as oracle.

To compare oracle sql and nosql MongoDB objects we can compare as below.

<img src=Picture1.png title="" alt="">

### Cloud Options

MongoDB Atlas is a global cloud database service built on AWS, Azure, and Google cloud.
We can deploy ,operate and scale a MongoDB database in just a few clicks. 
Here  we will discuss on creating MongoDB  in Cloud.
Login to 
https://cloud.mongodb.com/  using google account.
We can create a database using the below steps after logging to https://cloud.mongodb.com

<img src=Picture2.png title="" alt="">

Click on Build a Database.Choose the free option “Shared” for now 

<img src=Picture3.png title="" alt="">

<img src=Picture4.png title="" alt="">

Select any of Cloud service provider, here I chose Azure.

<img src=Picture5.png title="" alt="">

<img src=Picture6.png title="" alt="">

Click on "Create Cluster"

<img src=Picture6-1.png title="" alt="">

<img src=Picture7.png title="" alt="">

Once the cluster is created ,in network access,  add the IP entry to get access from your local desktop.

<img src=Picture8.png title="" alt="">

We also create database user for cluster to access cluster.

<img src=Picture9.png title="" alt="">

We then use MongoDB Compass to connect to the cluster.

<img src=Picture10.png title="" alt="">




### Installing MongoDB Compass:

Download software using URL ,for windows File (mongodb-windows-x86_64-5.0.3-signed.msi)
{https://www.mongodb.com/try/download/community}

<img src=Picture11.png title="" alt="">

<img src=Picture12.png title="" alt="">


<img src=Picture13.png title="" alt="">


<img src=Picture14.png title="" alt="">

<img src=Picture15.png title="" alt="">

<img src=Picture16.png title="" alt="">

<img src=Picture17.png title="" alt="">


### Once Installed open Mongodb Compass


<img src=Picture18.png title="" alt="">


In the connection string paste the URL  saved above.

Here we can see all the databases in the cluster

<img src=Picture19.png title="" alt="">

I have created a “Training” Database in below screenshot with single click as create database.

<img src=Picture20.png title="" alt="">

<img src=Picture21.png title="" alt="">

### Conclusion

This process describes how we can create a cluster in ATLAS and MongoDB database in the cluster. 