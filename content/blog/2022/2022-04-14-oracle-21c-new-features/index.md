---
layout: post
title: "Oracle 21c New Features"
date: 2022-04-14
comments: true
author: Ruhi Sharma
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
    - Database
metaTitle: "Oracle 21c New Features"
metaDescription: "Oracle 21c database powers the Oracle database services in on-premises and cloud infrastructure including Autonomous database (ADB), Oracle Exadata service@customer and Oracle Exadata machine."
ogTitle: "Oracle 21c New Features"
ogDescription: "Oracle 21c database powers the Oracle database services in on-premises and cloud infrastructure including Autonomous database (ADB), Oracle Exadata service@customer and Oracle Exadata machine."
slug: "oracle-21c-new-features"

---

Oracle 21c database powers the Oracle database services in on-premises and cloud infrastructure including Autonomous database (ADB), Oracle Exadata service@customer and Oracle Exadata machine.
<!--more-->

 The latest Oracle version includes new cases, automating optimizer performance, support for JSON data and graph models. It’s automation features makes life easier for both users and developers.
It supports a large range of data models, workloads, includes in-build machine learning capabilities, among others, to eliminate the need of separate services. 
Oracle 21c enables SQL, REST and API transactions across all types of data models.

### 21c Architecture

An Oracle database architecture is like the older version. It consists of Oracle database instances, and Oracle database as shown in the following diagram. 

<img src=Picture1.png title="" alt="">

[Image Source](https://docs.oracle.com/en/database/oracle/oracle-database/21/dbiad/index.html)

### Oracle database 21c Technical architecture: 

Multitenant architecture consists of physical files called datafiles & the database instance consists of memory structures (SGA known as Shared Global Area & PGA) and background processes to perform tasks like executing queries on the behalf of users with the help of server process, fetching data from disk, writing data on datafiles or redo log files, storing execution plans and so on. 

The single database architecture contains one to one relationship between the instance and database. Multiple single instances can be installed in the same server, but it will have separate database for each instance.

Oracle RAC architecture consists of multiple instances running on separate servers, but all will be using the same database. This configuration is designed to provide high availability, high end performance and scalability to customers.
The listener in database accepts the client application requests and establishes a connection to database, and then hands over it to server process. Server process will work on behalf of a user and perform its request.


### Oracle 21c features

21c generation supports all types of data types eg. Relational, JSON, XML, spatial graph, OLAP, etc. and provides higher performance, scalability, availability, and security to all types of workloads like analytical, operational, and mixed workloads as depicted in the following image.

<img src=Picture2.png title="" alt="">

[Image Source](https://blogs.oracle.com/content/published/api/v1.1/assets/CONTD73D784F6D9F46EB87BA0EE74C084DFE/native?cb=_cache_39ee&channelToken=af5d837e3d34400dbe9ae6cec73ee9b7)

#### 1)	Blockchain Tables: 

It has resolved various problems related to verified transactions. It supports the complex nature of building applications that can support a distributed ledger. These tables work like any normal heap table but with several important differences. The most notable of these being that rows are cryptographically hashed as they are inserted into the table, ensuring that the row can no longer be changed later.

<img src=Picture3.png title="" alt="">

[Image Source](https://blogs.oracle.com/content/published/api/v1.1/assets/CONT2286AD71C2764996BA900596C09F8768/native?cb=_cache_39ee&channelToken=af5d837e3d34400dbe9ae6cec73ee9b7)

This creates an insert only table and user can’t update or delete block chain table rows. Also, users are prevented from truncating data, dropping blockchains and partitioning tables within a certain time limit. These important capabilities mean that other users can trust that the data held in a Blockchain Table is an accurate record of events.

#### 2)	Native JSON Data type:

it stores a JSON data as ARCHAR2 or a LOB (CLOB or BLOB) which helps developer to build applications with flexibility of a schemaless design model. For instance, a user can query JSON documents with SQL and take advantage of advanced analytics, index individual attributes or whole documents, and process billions of JSON documents in parallel. In Oracle Database 21c, JSON support is further enhanced by offering a native data type, "JSON". 

This means that instead of having to parse JSON on read or update operations, the parse only happens on an insert and the JSON is then held in an internal binary format which makes access much faster. This can result in read and update operations being 4 or 5 times faster and updates to very large JSON documents being 20 to 30 times faster.

`CREATE TABLE j_order`

`(`

`   id     INTEGER PRIMARY KEY,`

`   po_doc JSON`

`);`


The new data type wasn't the only change that got introduced for JSON in Oracle Database 21c, Oracle also added a new JSON function JSON_TRANSFORM which makes it much simpler to update and remove multiple attributes in a document in a single operation.




                                          
                                            UPDATE j_order SET po_doc = JSON_TRANSFORM( po_doc,
                                            SET '$.address.city' = 'Santa Cruz',
                                            REMOVE'$.phones[*]?(@.type == "office")
                                          )
                                          WHERE id = 555;



#### 3)	Executing JavaScript inside Oracle Database:

It uses Multi Language Engine (MLE) to run the java script code inside the database with new PL/SQL package called: DBMS_MLE. MLE. Java script enables the richer user interaction in web application and mobile apps. It is one of the few languages that runs in web browser and can be used to develop both server and client-side code.

There is a large collection of existing JavaScript libraries for implementing complex programs, and JavaScript works in conjunction with popular development technologies such as JSON and REST.
In Oracle 21c developer can run their java script code inside the database where the data resides. It allows them to execute their short computational tasks written in java script without moving their data to mid-tier of browser. MLE automatically maps the Java script data types to Oracle Database data types and vice versa & developers don’t have to take care of data type conversion. 

Also, Java script can execute the PL/SQL and SQL through in-built Java script module. All this enables APEX developers to use java script as a first-class language within their APEX apps, without sacrificing the power of PL/SQL and SQL. in JavaScript, you can access the database – tables and views – through regular SQL. Following illustrates how a code is written in Java script

                                       
declare
  
  ctx dbms_mle.context_handle_t;

begin

  ctx := dbms_mle.create_context(); -- Create execution context for MLE execution

  dbms_mle.eval(ctx, 'JAVASCRIPT', 'console.log(`Hello from JavaScript`)'); -- Evaluate the source code 
  
  snippet in the execution context
  
  dbms_mle.drop_context(ctx); -- 
                                       

Drop the execution context once no longer required;

---
**Note**: as long as the context is retained, it holds values of global objects including functions
end;

---

#### 4)	SQL Macros: 

It is normal for SQL queries to get complex as the no. of joins increases or the retrieving of data becomes more involved & developers solve this problem by using stored procedures and functions to simplify these operations. But it can reduce the performance as the SQL engine switches context with the PL/SQL Engine. In Oracle 21c, SQL Macros solve this problem by allowing SQL expressions and table functions to be replaced by calls to stored procedures which return a string literal to be inserted in the SQL you want to execute.


#### 5)	In-Memory Enhancements: 

Analyzing data using columnar format can increase the performance compared to a row-based format. Though updating data is faster in row model, and Oracle database in-memory features helps us to use both the models depending upon the requirement. With the help of this users can run their application without change and in-memory will maintain a columnar store supporting blazingly fast real-time analytical queries. It has three major improvements to enhance the performance and ease the use in Oracle database in-memory.

*A.	Database In-Memory Vector Joins:*

This helps to accelerate the operations like hash joins on columns inside the in-memory column store. In case of hash joins, joins are broken down into smaller operations and passed to vector process. The key value table used is SIMD optimized and used to match rows on the right- and left-hand joins & this improves performance ten times.


*B.	Self-Managing In-Memory Column Store:*

When Oracle database in-memory was released, users had to explicitly declare the columns which were populated into memory column store, this gives users high control if memory is tight. 

In 18c database, it introduced the functionality that would automatically place objects in the Column Store if these were actively used and removed objects that are not in use. However, users still had to indicate the objects to be considered. 

In Oracle Database 21c setting INMEMORY_AUTOMATIC_LEVEL to HIGH, ensures that all objects are considered - thereby simplifying the job of managing the in-memory column store.

*C.	In-Memory Hybrid Columnar Scans:*

It is not possible to have every column of every table populated in the Column Store as memory is limited. In many instances, this isn't an issue but occasionally, users may encounter a query which needs data (columns) from the Column Store and data that's only available in the row store. 

In previous releases of Oracle Database In-Memory, such queries would simply run against the row store. In Oracle Database 21c, users can now use both! The optimizer can now elect to scan the In-Memory Column Store and fetch projected column values from the row store if needed. This can result in a significant performance improvement.

<img src=Picture4.png title="" alt="">

[Image Source](https://blogs.oracle.com/content/published/api/v1.1/assets/CONT0F353A327B614F10803892D8BB80D379/native?cb=_cache_39ee&channelToken=af5d837e3d34400dbe9ae6cec73ee9b7)


### Conclusion

**The overall benefits can be summarized as under-:**


*1)	There is a significant improvement in the query performance of the database* 

*2)	21’c generation supports all data types like JSON, XML, and OLAP.*

*3)	It’s massively scalable, highly available and gives security to all workloads i.e., OLTP, ad-hoc queries and data warehouse*

*4)	It supports both operational and mixed workloads.*

*5)	In 21C many things are automated like parallel scans, online backups, etc. thus freeing developers from worrying about data persistence.*

*6)	Performance features has been automated to large extend with features like automatic indexing.*


<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/oracle">Learn about Rackspace Managed Oracle Applications.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
