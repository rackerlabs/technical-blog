---
layout: post
title: "Believing the Hype Behind Oracle 19c Transparent Application Continuity"
date: 2022-11-09
comments: true
author: Gary Sadler
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: "Gary Sadler has been an Oracle database administrator with Rackspace Technology for 15 years, working directly with customers and on infrastructure projects as well as performing technology research and development.  For more information about this blog post including java source code and other details of the research, he can be reached at Gary.Sadler@rackspace.com."
published: true
authorIsRacker: true
categories:
    - Database
    - Oracle
    
metaTitle: "Believing the Hype Behind Oracle 19c Transparent Application Continuity"
metaDescription: "The hope of this blog post is to help Oracle DBAs perform routine maintenance on RAC clusters with little impact on the running applications actively performing work."
ogTitle: "Believing the Hype Behind Oracle 19c Transparent Application Continuity"
ogDescription: "The hope of this blog post is to help Oracle DBAs perform routine maintenance on RAC clusters with little impact on the running applications actively performing work."
slug: "believing-the-hype-behind-oracle-19c-transparent-application-continuity"

---
The hope of this blog post is to help Oracle DBAs perform routine maintenance on RAC clusters with little impact on the running applications actively performing work. 
<!--more-->

1.	**Finally Doing it the Right Way**

- 1.1	*One guy’s experience*

 That seems like the way it should have always been but RAC users have grown accustomed to the traditional method of just failing over idle sessions and SELECT statements only.  With Oracle 19c the goal of preserving most if not all activity of any kind becomes more attainable.  So here we’ll talk about how to make that happen and what was my experience.

- *1.2	Explained:  *TAF*, *AC*, *TG*, and *TAC*

Almost since the inception of Oracle RAC the company has been attempting to build in more and more resilience and availability to consumers of the database, i.e. applications.  The evolution of this feature set began on the client-side with Transparent Application Failover (TAF), a SQL*Net configuration that allowed session fail-over between different nodes of a RAC database cluster and progressed to server-side capability through database services.  It worked so well that it is the only database session failover in place at many shops that bother with it at all.  It only works for idle sessions and SELECT statements.  PL/SQL programs, DML and DDL operations will cause an error if in progress when an instance becomes unavailable.

The next major step forward came with the 12c family of databases and became known as Application Continuity (AC) with a sister feature called Transaction Guard (TG).  Adoption of AC has been slow, possibly because configuration is complex and documentation is spotty resulting in inconsistent outcomes.  Such a complicate feature can be difficult to master so DBAs and developers perhaps tend to give up after a while and fall back on traditional TAF.  TG, on the other hand, is easily configured via a database service and can be independently enabled apart from AC by setting -commit_outcome to true but is best used in conjunction with AC and TAC.

With 18c came a new session state tracking infrastructure that became known as Transparent Application Continuity (TAC).  Several database service configuration points introduced a new “AUTO” option for failover type, failover restore, and session state consistency.  As a more mature product with the advent of Oracle 19c, the database was now attempting to make intelligent decisions about the best way to handle interrupted work, no matter what is was. 

- *1.3	Spoiler Alert*

For the most part I was able to confirm the behavior of TAC as advertised in capturing session state and replaying transactions in flight on a surviving RAC instance.  That’s not to suggest that there aren’t important caveats, however.


**Connecting to a properly configured, user-defined database service is a must.**  

Two configuration points in particular that one must pay attention to are drain_timeout and replay_init_time.  If those two are not right, especially replay_init_time, then you won’t be getting as much from TAC.  No two environments are alike but in general, I’d recommend starting with a drain_timeout of 10 minutes and replay_init_time of one to two hours.

**TAC works best when database connection pooling is utilized.**

  For this study I used JDBC and Oracle Universal Connection Pool (UCP) with Apache Tomcat 9.  The documentation states that TAC works well with other third-party products as well as with ODP.NET connection pool and OCI session pool.  For this test I also tried sqlplus (19c) without connection pooling and it held up relatively well although functionality was not as robust as with UCP.


  **With planned maintenance in mind, relocating the service was superior to stopping the instance with the -failover flag.**  I think most DBAs would prefer the serviced relocation method anyway for maximum control.  If you’re serious about TAC, **don’t bother with any Oracle database and client less than 19c.**  Finally, good coding practice and connection management is essential in a connection pooling environment – don’t forget about connection housekeeping in your java code.  Oracle is unforgiving in that regard.

**2	At the Heart of the Matter**

*2.1	Database services vs the default service*

A requirement for TAC is for the application to connect to user-defined database services, not the default services that come “out of the box”.  You can get basic TAF functionality by connecting to the default service but that’s all.  The session state context used by TAC is triggered by the following service settings:

```
-failovertype auto
-failover_restore auto
-session_state auto (not set)
```

There are plenty of other advantages to using defined services but that’s outside the scope of this article.  **From this point forward in the article we will assume that the application is connecting to a user defined database service unless otherwise stated.**

*2.2	Importance of draining sessions*

Key to an orderly session state failover is the step of draining sessions.  Oracle will use Fast Application Notification (FAN) to notify the application if possible and then wait a configured amount of time before attempting session state failover.  The service configuration point is `-drain_timeout`. For maximum flexibility you can also specify the drain timeout on the srvctl command line when relocating a service.   When using JDBC and the Oracle Universal Connection Pool (UCP) the idle sessions will immediately begin failing over to the new instance following a service relocation.  Only the sessions with work in progress will wait for the drain timeout to expire to attempt failover so that the work can complete in place if possible. 

*2.3	Database service configuration*

Our goal as stated is to give the DBA some control over failing over session state during planned maintenance.  The timing of session draining is key as we said so setting this timeout period matters.  Give the application some time to finish their work before attempting to failover.  Whether that is 60 seconds or 60 minutes would be specific to the application environment.

Another important service configuration point is the *replay initiation time*, configured with the srvctl parameter `-replay_init_time`.  This is the number of seconds that Oracle will preserve session state following the last call.  For a JDBC session with UCP that translates to transaction duration.  For a sqlplus session that would be idle time.  In any case, you want to provide a large enough window for the failover to play out.  This should be longer than the drain timeout, obviously.  The default is five minutes which seems way too brief.  I think making `replay_init_time` at least three times longer than `drain_timeout` would be a good place to start.

Below is the service configuration I used for this trial.  In the real world you wouldn’t want to use the below values for drain_timeout or replay_init_time which were very short to make for efficient testing.  
```
Service name: srv1
Service role: PRIMARY
Management policy: AUTOMATIC
AQ HA notifications: true
Global: false
Commit Outcome: true
Failover type: AUTO
Failover method: 
Failover retries: 30
Failover delay: 10
Failover restore: AUTO
Connection Load Balancing Goal: LONG
Runtime Load Balancing Goal: NONE
TAF policy specification: NONE
Pluggable database name: pdb1
Retention: 86400 seconds
Replay Initiation Time: 180 seconds
Drain timeout: 60 seconds
Stop option: immediate
Session State Consistency: AUTO
Service is enabled
Preferred instances: test191
Available instances: test192
```

**3	The Rest of the Setup**

*3.1	Technical Environment*

<u> Servers</u>:  Oracle Linux 7.9

<u>Database environment</u>:  Oracle 19c RAC EE, release update 16 (19.16)

<u>Client Side</u>:  MS Windows 10, Oracle Client 19, sqlplus, Apache Tomcat 9.0.65, Oracle Universal Connection Pool (UCP), Apache ant 1.10.12

*3.2	Other Configuration Points*

-	The JDK in use was that provided by the Oracle Client home, JDK version 1.8.0_201-b09.
-	UCP configuration file, context.xml
```
<Context>
<Resource
name="jdbc/UCPPool"
auth="Container"
factory="oracle.ucp.jdbc.PoolDataSourceImpl"
type="oracle.ucp.jdbc.PoolDataSource"
description="UCP JNDI Connection Pool"
connectionFactoryClassName="oracle.jdbc.replay.OracleDataSourceImpl"
initialPoolSize="10"
minPoolSize="10"
maxPoolSize="500"
inactiveConnectionTimeout="90"
user="gsadler"
password="P@ssw0rd"
url="jdbc:oracle:thin:@(DESCRIPTION=(TRANSPORT_CONNECT_TIMEOUT=3)(ADDRESS=(PROTOCOL=TCP)(HOST=dev19-scan.sadler.local)(PORT=1521))
(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=dev19.sadler.local)))"
connectionPoolName="UCPPool"
validateConnectionOnBorrow="true"
fastConnectionFailoverEnabled="true"
sqlForValidateConnection="select 1 from DUAL" />
</Context>
```
-	Java source code provided on request (gary.sadler@rackspace.com).
-	Client side tnsnames.ora entry

```
test19_srv1 =
  (DESCRIPTION= 
   (ADDRESS_LIST=
      (LOAD_BALANCE=ON)
      (ADDRESS=(PROTOCOL=TCP)(HOST=test19-scan.sadler.local)(PORT=1521)))
   (CONNECT_DATA=(SERVICE_NAME=srv1.sadler.local))
  )
```

-	Grant permission on the Application Continuity package, DBMS_APP_CONT, to the application users:  

`GRANT EXECUTE ON SYS.DBMS_APP_CONT TO <user_name>;`

*3.3	Tests performed*

Similar test scenarios were used for two types of client interface, sqlplus native connectivity from a remote Windows client, and JDBC thin driver via Oracle Universal Connection Pool (UCP) and java source code.  In both cases the client connection was through a user-defined database service to a PDB.  I tried to run the same tests as close as possible for the two types of clients but due to the nature of a connection pool the tests varied slightly.  As a control, similar tests were performed to a non-container database through the default database service in order to compare TAC with legacy TAF functionality.

Each TAC test was conducted multiple times with various values for drain_timeout and replay_init_time.   I wanted to show changes in behavior based on different values for those service parameters.  For the UCP tests involving DML, auto-commit was disabled so that I could explicitly perform the COMMIT at the right time in order to straddle the service relocation.  See Section 4.2 below for complete detail of tests and results.    


**4. The Fine Print**

*4.1	Summary*

One reason I focused on the values used for the service parameters drain_timeout and replay_init_time is that the timing of transaction events in relation to those values greatly impacts TAC outcomes.  Generally speaking, you want drain_timeout to be a reasonable amount of time allowed for running queries to finish, if possible, say 5-10 minutes.  Replay_init_time, on the other hand, should be considerably longer since transaction events that occur after this time has expired will likely fail during replay on the new instance.  I could not find any disadvantage to setting this parameter to a very high value, say 120 minutes, but probably something like 30 minutes would be acceptable.


Oracle documentation claims that full TAC feature functionality is present in the 18c client, but I found that test results were far more consistent with the 19c client.  In general I found that the UCP client performed failover more transparently (automatically) than did sqlplus mostly due to the nature of the connection pool and the implementation of connection testing which occurred every 20 seconds.  The sqlplus session could remain idle beyond the replay_init_time and therefore be terminated rather than failed over.


While it is certainly possible to relocate the database service as part of instance shutdown, I found that unless you do it explicitly that Oracle won’t do the shutdown as requested.  So instead of stopping instances in order to enact failover, I generally just relocated the service from one node to another.  Stopping the instance with the -failover flag does something similar (with some exceptions noted below) but for those that prefer a bit more control I’d recommend relocating the service first, waiting for sessions to drain and relocate, and then perform the instance shutdown.


*4.2	Test Results Detail*

             4.2.1	sqlplus

- **Test 1**:  Session is idle, service is relocated and another SELECT statement is executed.
- **Result**:  Session state is saved to the surviving instance provided the session idle time does not exceed replay_init_time.
- **Test 2**:  Session is idle, replay_init_time has not expired by the time the service is relocated but has expired by the time another SELECT statement is executed.
- **Result**:  Session is terminated with error “ORA-25415: Application Continuity replay initiation timeout exceeded”.
- **Test 3**:  Session is idle for less than replay_init_time, service is relocated to new instance and then relocated back to the original instance.
- **Result**:  Same as Test 1.
- **Test 4**:  Session is running SELECT statement and returning rows when service is relocated.
- **Result**:  If the SQL statement runs for more than a few seconds, then session is terminated with error “ORA-25420 (too many calls) for an OCI session”.  
- **Test 5**:  Session running SELECT statement, not yet returning rows when service is relocated.
- **Result**:  If the SELECT statement is running for longer than the replay_init_time when the drain timeout expires then the session will get killed with ORA-25415 error.  Otherwise the SELECT will be restarted on the new instance.
- **Test 6**:  Session has an uncommitted transaction when the service is relocated.
- **Result**:  After the service is relocated, it will keep the session in its original instance until the drain timeout expires, then it will kill the session but save the session state and as long as the replay_init_time hasn't expired.  When a commit is issued  it will move the session to the new instance and commit the transaction.
- **Test 7**:  Session has an update or delete in progress when the service is relocated.
- **Result**:  Session state is saved and the transaction replayed on the new instance.  Generally takes about as long as the original update, plus rollback, plus original update again.

      *4.2.2 UCP*

- **Test 1**:  Sessions in the connection pool are idle, service is relocated.
- **Result**:  Sessions are automatically (gradually) moved to new instance within a few seconds.
- **Test 2**:  Session in the pool are idle, replay_init_time has not expired by the time the service is relocated but has expired by the time another SELECT statement is executed.
- **Result**:  Since the inactive connection timeout on the pool was 20 seconds and the replay_init_time was 60, it does not affect TAC because connection testing keeps them from being idle for too long.  So unlike with sqlplus, UCP protects sessions from replay_init_time.
- **Test 3**:  Sessions in the pool are idle for less than replay_init_time, service is relocated to new instance and then relocated back to the original instance.
- **Result**:  Same as Test 1.
- **Test 4**:  A session in the pool is running a SELECT statement and returning rows when the service is relocated.
- **Result**:  I was not able to duplicate this test with UCP in the same way as with sqlplus but it seemed to have the same results as for Test 5 below.
- **Test 5**:  A session in the pool is running a SELECT statement but not yet returning rows when the service is relocated.
- **Result**:  Query is allowed to finish in place unless it runs for longer than the drain timeout after the service is relocated, then the session is moved to the new instance and the query restarted.  But if the query runs past the replay_init_time and then hasn't finished by the end of the drain timeout, the session is killed, session state not saved.  If the query runs past the replay_init_time prior to the service relocation but finishes before the drain timeout expires, the query will finish on its original instance.  Same behavior is exhibited if the instance is stopped with the -failover flag.  Note that Oracle will start the other (down) instance if necessary to do the failover.
- **Test 6**:  A session in the pool has an uncommitted transaction when the service is relocated.
- **Result**:  After the service is relocated, it will keep the session in its original instance until the drain timeout expires, then it will kill the session but save the session state and as long as the replay_init_time hasn't expired.  When a commit is issued it will move the session to the new instance and commit the transaction.

- **Test 7**:  A session in the pool has an update or delete in progress when service is relocated.
- **Result**:  Session state is saved and the transaction replayed on the new instance.  It takes about as long as the original update, plus rollback, plus original update again.  With UCP it didn't seem to matter whether the drain timeout had expired or not when "relocate service" is used, but when "stop instance -failover" is used it moved the update session over but the update failed once the replay_init_time expired.
- **Test 8**:  Session in the pool opens a connection, runs a query, service is relocated, then tries to run another query using the same connection.
- **Result**:  Connections left open that are idle are terminated and not failed over to the new instance.  Connection housekeeping is essential with connection pools because Oracle doesn’t accommodate bad coding.












<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).