---
layout: post
title: "Simplifying Standby Data Guard Setup using broker configuration"
date: 2022-07-21
comments: true
author: Soumya Guha Roy
authorAvatar: 'https://secure.gravatar.com/avatar/6fd61565cefe1868d26bb30c97832409'
bio: ""
published: true
authorIsRacker: true
categories:
    - Security
    - Oracle
metaTitle: "Simplifying Standby Data Guard Setup using broker configuration"
metaDescription: "With Growing business demands and volume, grows the necessity of having a fault tolerant system."
ogTitle: "Simplifying Standby Data Guard Setup using broker configuration   "
ogDescription: "With Growing business demands and volume, grows the necessity of having a fault tolerant system. ."
slug: "simplifying-standby-data-guard-setup-using-broker-configuration"

---
With Growing business demands and volume, grows the necessity of having a fault tolerant system. A system that will still be available in case of any natural disaster. There are scenarios when systems need to be taken down for scheduled maintenance. But what if the business demands do not allow the system to be taken down? The answer is to have a Disaster Recovery site (DR). 

<!--more-->

The DR will act as primary site in all cases mentioned above. Oracle provides its own disaster recovery solution called Standby Data guard. Building and maintaining a data guard manually is a complex process. Oracle provides a tool called, ‘broker’, which enables one to setup and maintain the data guard with ease. I have, in this article, discussed about how to setup a Standby data guard and perform switch over and failover using the
 broker.


Assuming one needs to build the standby data guard from scratch, I will not be delving deep into prerequisites like server RPM, kernel settings for the server to host an Oracle Database. I will jump straight into technical steps that involves building and syncing a data guard with *primary* and will discuss a couple of scenarios where we make the data guard as primary to simulate natural disaster situation.


First thing first, take a backup of primary database and restore it at the DR site.
While restoring the database at the DR site, one needs to make sure that one keeps a different *db_unique_name* parameter for the standby database.

In our example, let’s say the primary database name is *PROD*.
I am setting the db_unique_name for primary database as PRODP. ‘P’ at the end stands for primary.
Similarly, the standby database name will be PROD too, and I am setting the db_uniqueue_name for the standby database as PRODS.

Once the standby database has been restored from backup of primary, you need to complete the following steps.

1.	Create standby redolog file at primary
First, find out how many redolog group are already there at primary PRODP using the following command.


```
SQL> select l.group#,l.status,lf.member,l.bytes/1024/1024 size_Mb from v$log l, v$logfile lf where l.group#=lf.group#;
```

<img src=Picture1.png title="" alt="">

In the above example there are a total of three log groups, 1,2 and 3. We need to create standby redolog groups from group number 4 and need to have one extra standby redolog group. In total, I will create 4 standby redolog groups. Also make sure, that you keep the standby redolog size same as normal redologs. (1024m in our case)

<img src=Picture2.png title="" alt="">

2.	Configure TNS
Make sure that you can _tnsping_ the standby database from primary and primary database from standby. 

<img src=Picture3.png title="" alt="">
<img src=Picture4.png title="" alt="">

3.	Create password file for standby
Copy the *orapwPROD* file from *$ORACLE_HOME/dbs* location at primary site to standby site at the same location.

4.	A few database parameters

Set the database parameters as shown in the following table:

<img src=Picture5.png title="" alt="">

5.	Create broker configuration

I have used the *dgmgrl* tool to create a configuration at primary. Use sys user and password to login to dgmgrl tool.

<img src=Picture6.png title="" alt="">

Now create the configuration. It’ll add the primary database in the configuration

<img src=Picture7.png title="" alt="">

Add the standby database to the configuration

<img src=Picture8.png title="" alt="">

Activate the configuration

<img src=Picture9.png title="" alt="">

6.	Put the Standby database in managed recovery mode

<img src=Picture10.png title="" alt="">

7.	Validate the setup

<img src=Picture11.png title="" alt="">

With the above, the standby database is built and is operational.
One can check if it is getting in sync with the primary database using the following queries. Both will return the same number of log sequence.

**On primary:**

``` 
select thread#, max(sequence#) "Last Primary Seq Generated"
from v$archived_log val, v$database vdb
where val.resetlogs_change# = vdb.resetlogs_change#
group by thread# order by 1;  
```

**On Standby:**

```
select thread#, max(sequence#) "Last Standby Seq Applied"
from v$archived_log val, v$database vdb
where val.resetlogs_change# = vdb.resetlogs_change#
and val.applied in ('YES','IN-MEMORY')
group by thread# order by 1;
```

Now that we have a fully functional standby data guard, I will discuss the following two terms:

**Switchover:** This is the case when we switch the role of primary and standby databases. That means, we will make the primary database as standby, and the standby database as primary. When will we be
 required to do such activity? The answer is when we need to bring down the primary database for maintenance activities, but the business must be operational. In that case, we will switch the role of the databases, carry out the maintenance activity in the new standby database (which was the actual primary database before switchover), then we will again do a switchover to revert the roles of databases to original.

**Failover:**  Failover is performed when, the primary site is completely inaccessible due to any natural calamity or other reasons. In this scenario, we will make the standby database as primary, and let the business run on top of it. When the primary site is restored, one may configure it as a standby database site, and do a switch over to go back to the original state of the databases.

Let’s discuss switchover first. The ‘dgmgrl’ tool makes it way simpler to bring up the standby database than doing it manually. At the same time, it will configure the primary database as standby, and setup redolog sync operation. All you need is to execute a single SQL statement shown in the snapshot.

<img src=Picture12.png title="" alt="">

One may now connect to both current primary and current standby to check if redolog sync is happening. 

**On Primary**

```
select thread#, max(sequence#) "Last Primary Seq Generated"
from v$archived_log val, v$database vdb
where val.resetlogs_change# = vdb.resetlogs_change#
group by thread# order by 1;  
```

**On Standby**: 

```
select thread#, max(sequence#) "Last Standby Seq Applied"
from v$archived_log val, v$database vdb
where val.resetlogs_change# = vdb.resetlogs_change#
and val.applied in ('YES','IN-MEMORY')
group by thread# order by 1;
```


DBA now performs the intended maintenance activity in current standby (which is actual primary site) keeping the production database up & running all the while. Once the maintenance is over, DBA needs to switchover again to switch back to a primary site.

Failover too, has been made simplified by using the dgmgrl tool with just one additional step as compared to switchover i.e. to reinstate the new standby database. We will see how it is done.

Logon to the Standby site and connect to dgmgrl and issue the failover command.

<img src=Picture13.png title="" alt="">

The production application now needs to be reconfigured to use the production database at standby site. 
When the primary site becomes accessible again, one needs to reinstate the database to configure it as standby. One major prerequisite for reinstating the database is to have flashback enabled all the time.
Most of the cases, we won’t see customers preferring to enable flashback for the entire database to save significantly on storage.  In those cases, where flashback is not enabled, one needs to rebuild the standby database again at primary site using the same method we’ve discussed at the beginning of this article.

For databases having flashback enabled, we reinstate the standby using the following statement.

<img src=Picture14.png title="" alt="">

Now that, primary database is running at the standby site, and standby database is running at the primary site, one may choose a convenient time to do a switchover to revert to original database roles post failover.

### Conclusion

In summary, Data Guard provides an efficient and comprehensive disaster recovery and high availability solution, 
easy-to-manage switchover and failover capabilities allow role reversals between primary and standby databases, minimizing the downtime of the primary database for planned and unplanned outages.
The Data Guard broker provides a simple command-line interface to automate management and operational tasks across multiple databases in a Data Guard configuration. 
The broker also monitors all the systems within a single Data Guard configuration.

That’s not all, if we enable the fast-start failover, the broker automatically fails over to standby site, minimizing time, effort, and downtime.


<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/oracle">Learn about Rackspace Managed Oracle Applications.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
