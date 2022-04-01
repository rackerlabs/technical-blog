---
layout: post
title: "Oracle 19c New Feature : Hybrid Partitioning"
date: 2022-03-29
comments: true
author: Nitin Sharma
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
    - Database
metaTitle: "Oracle 19c New Feature : Hybrid Partitioning"
metaDescription: "In the Oracle 19c version, Oracle introduced a new feature called Hybrid Partitioning which allows us to create some partitions external to database i.e. flat files and some partitions in the tablespace i.e internal to database"
ogTitle: "Oracle 19c New Feature : Hybrid Partitioning"
ogDescription: "In the Oracle 19c version, Oracle introduced a new feature called Hybrid Partitioning which allows us to create some partitions external to database i.e. flat files and some partitions in the tablespace i.e internal to database"
slug: "oracle-19c-new-feature-hybrid-partitioning"
---
In Oracle 12c Release 2 version, Oracle introduced a feature which provided us ability to create partitions on External Tables. In the Oracle 19c version, Oracle introduced a new feature called Hybrid Partitioning which allows us to create some partitions external to database i.e. flat files and some partitions in the tablespace i.e internal to database. 

<!--more-->

With the help of this feature, we can move less used old partitions to external source i.e. Linux file system and most active partitions in the database. 
In this demo, we will create a Hybrid Partitioned Table called DATA with 4 partitions DATA_2019, DATA_2020, DATA_2021 & DATA_2022. Data for year 2019, 2020 & 2021 are stored in flat files in OS directory `/home/oracle/data_dir. `

<img src=Picture1.png title="" alt="">

These 3 flat files contains data for year 2019, 2020 and 2022 separated by whitespace. 

<img src=Picture2.png title="" alt="">

#### Step 1: Login to database and set the target PDB in which table needs to be created. 

<img src=Picture3.png title="" alt="">

#### Step 2: Create a directory DATA_FILES_DIR in the database pointing to OS directory data_dir. Create user APP_USER and give READ, WRITE permissions on directory.

<img src=Picture4.png title="" alt="">

#### Step 3: Create Hybrid Partitioned table DATA in APP_USER. Partitions DATA_2019, DATA_2020 & DATA_2021 are external to database and contains data in flat files. But partition DATA_2022 is internal to database.

<img src=Picture5.png title="" alt="">

#### Step 4: We are able to run query data from each partition. 
**DATA_2019 -**
<img src=Picture6.png title="" alt="">

**DATA_2020 -**

<img src=Picture7.png title="" alt="">

**DATA_2021 -**

<img src=Picture8.png title="" alt="">

**DATA_2022 -**

<img src=Picture9.png title="" alt="">

**Step 5: Check if the created table DATA is Hybrid partitioned table?**

<img src=Picture10.png title="" alt="">

#### Step 6: When trying to insert data in partition DATA_2022, it fails with error  ORA-01950: no privileges on tablespace 'USERS'. This confirms that data in partition DATA_2022 will be stored in USERS tablespace i.e. internal to database. When giving quota on tablespace USERS, we are able to insert data in partition DATA_2022. 

<img src=Picture11.png title="" alt="">

#### Step 7: Below query shows that only partition DATA_2022 is stored in the database. Other partitions data is external to database.

<img src=Picture12.png title="" alt="">


### Conclusion

Using this new feature we can move older partitions of a table which are not active  to  some other cheaper storage outside the database – whereas the active table data remains inside the Oracle database.




<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Let us help you on your Oracle Database journey.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).