---
layout: post
title: "New performance-tuning features of Oracle Database 12c Release 12.1.0.0: Part 1"
date: 2018-10-05
comments: true
author: Virat Choudhary
published: true
authorIsRacker: true
categories:
  - Oracle
  - database
---

Originally published by TriCore: April 11, 2017

This two-part blog post series covers new performance-tuning features of
Oracle&reg; Database versions 12.1.0.1 and 12.1.0.2. Part 1 discusses the
earlier version.

<!--more-->

### New features in Oracle Database 12.1.01

The following features are new in Oracle Database version 12.1.0.1:

- Real-Time Automatic Database Diagnostic Monitor (ADDM)
- Support for limiting the size of the Program Global Area (PGA)
- Active Session History (ASH) enhancements

#### Real-Time ADDM

Real-Time ADDM helps you analyze and resolve problems in a hung database
without having to restart the database. This section describes Real-Time ADDM
in detail.

##### Real-Time ADDM connection modes

Real-Time ADDM uses one of two connection modes to connect to a database
through Oracle Enterprise Manager (OEM). The mode it uses depends on the
database state:

- **Normal connection**: In this mode, Real-Time ADDM uses Java Database
  Connectivity (JDBC) to connect to the database. This mode conducts an
  extensive performance analysis of the database when connectivity is
  available.

- **Diagnostic connection**: In this mode, Real-Time ADDM performs a
  latch-less connection to the database. This mode is useful for extreme hang
  situations when a normal JDBC connection isn't possible.

##### Real-Time ADDM Triggers

Real-Time ADDM runs automatically every three seconds and uses in-memory data
to diagnose database performance issues. It automatically triggers
an analysis when it detects a performance problem. This functionality involves
the following steps:

1. Every three seconds, the manageability monitor (MMON) process performs an
   action to obtain performance statistics without lock or latch.

2. The MMON process checks these statistics and triggers a Real-Time ADDM
   analysis if it finds any of the issues that appear in Table 1.

3. The MMON slave process creates the report and stores it in the Automatic
   Workload Repository (AWR). For more information, you can check the
   `DBA_HIST_REPORTS` view and the `DBA_HIST_REPORTS_DETAILS` view.

You can also use the following command to generate a report manually:

    SQL> select dbms_addm.real_time_addm_report() from dual;

**Table 1: Performance issues and conditions that trigger a Real-Time ADDM
analysis**

| **Issue** | **Condition** |
|-----------------------|--------------------------------------------------------------------------------------------|
| High load | Average active sessions are greater than 3x the number of CPU cores |
| I/O bound | I/O impact on active sessions is based on single block read performance |
| CPU bound | Active sessions are greater than 10% of total load and CPU utilization is greater than 50% |
| Over-allocated memory | Memory allocations are over 95% of physical memory |
| Interconnect bound | Based on single block interconnect transfer time |
| Session limit | Session limit is close to 100% |
| Process limit | Process limit is close to 100% |
| Hung session | Hung sessions are greater than 10% of total sessions |
| Deadlock detected | Any deadlock is detected |

<br />

**Source**: [Database Performance Tuning Guide, Chapter 7: Automatic
Performance Diagnostics: Real-Time ADDM Connection
Modes](https://docs.oracle.com/database/121/TGDBA/pfgrf_diag.htm#GUID-C8ACD778-60CF-4E9E-A644-45533E93C34A)

##### Real-Time ADDM trigger controls

To ensure that the automatic triggers don't consume too many system
resources, Real-Time ADDM uses the following controls:

- **Duration between reports**: If an automatic trigger created a Real-Time
  ADDM report in the past five minutes, then no new reports are
  generated.

- **Oracle Real Application Clusters (RAC) control**: Automatic triggers are
  local to the database instance. For Oracle RAC, only one database instance
  can create a Real-Time ADDM report at a time.

- **Repeated triggers**: An automatic trigger for any issue must have an
  impact of 100% or higher than the previous report that had the same triggering issue within the previous 45 minutes.

- **Newly identified issues**: If a new issue is detected that wasn't
  already detected within the past 45 minutes, then a new report is
  generated.

##### Limiting the size of the PGA

Excessive PGA usage can lead to high rates of swapping. When this occurs, the
system might become unresponsive and unstable. If this happens, consider using
the `PGA_AGGREGATE_LIMIT` initialization parameter to limit overall PGA usage.

The following section describes how to limit the size of the PGA by using the
`PGA_AGGREGATE_LIMIT` initialization parameter in Oracle Database 12c R1
(12.1.0.1) and higher.

**About the PGA\_AGGREGATE\_LIMIT parameter**

If the value defined in the `PGA_AGGREGATE_LIMIT` parameter is exceeded,
Oracle Database aborts or terminates the sessions or processes that are
consuming the most untunable PGA memory. Oracle Database performs the
termination in the following order:

- Calls for sessions that are consuming the most untunable PGA memory and
  aborts them.
- If PGA memory usage is still over the `PGA_AGGREGATE_LIMIT`, then Oracle
  Database terminates the sessions and processes that are consuming the most
  untunable PGA memory.

Oracle Database treats parallel queries as a single unit. By default, the
`PGA_AGGREGATE_LIMIT` parameter is set to the greater of 2 GB, 200% of the
`PGA_AGGREGATE_TARGET` value, or 3 MB times the value of the `PROCESSES`
parameter. However, it does not exceed 120% of the physical memory size minus
the total System Global Area (SGA) size.

**Setting the PGA\_AGGREGATE\_LIMIT parameter**

The `PGA_AGGREGATE_LIMIT` initialization parameter can be set dynamically. The database doesn't need to restart. You can set the value of `PGA_AGGREGATE_LIMIT` regardless of whether Oracle Database is using automatic memory management.

**Changing the PGA\_AGGREGATE\_LIMIT parameter**

Set the `PGA_AGGREGATE_LIMIT` initialization parameter to a new value in
number of bytes. Setting the value to `0` disables the hard limit on PGA
memory.

When the `PGA_AGGREGATE_LIMIT` is exceeded, Oracle Database performs the
following actions:

- Aborts the calls that are associated with the sessions that are using the
  most untunable memory.
- If the total PGA memory usage is still over the limit, terminates the
  sessions that are using the most untunable memory.

`sys.processes` and background processes other than job queue processes aren't
affected. Instead, if they're using the most untunable memory, they
periodically write a brief summary of their PGA usage to a trace file.

#### ASH enhancements

As of Oracle 12c, you can access ASH data visualization through a new OEM page
named _ASH Analytics_. This page enables you to drill down into logical
dimensions. You can also send the reports to other users who can view them
offline.

![A flow chart of the logical dimensions to which ASH provides
access](picture1.png)

**Image source**: [OCP 12C – Emergency Monitoring, Real-Time
ADDM](https://www.dba-scripts.com/articles/ocp-flashcards/ocp-12c-emergency-monitoring-real-time-addm/)

### Conclusion

These new features collectively help you troubleshoot and enhance database
performance for Oracle Database 12c Release 1. [Part
2](https://developer.rackspace.com/blog/odb-tuning2/) of this series covers
more new features and changes to performance tuning in Oracle Database
12.1.0.2.

Use the Feedback tab to make any comments or ask questions.

### References

The following sources were used as references for this blog post:

- [Database Performance Tuning Guide, Chapter 7: Automatic
Performance Diagnostics: Real-Time ADDM Connection
Modes](https://docs.oracle.com/database/121/TGDBA/pfgrf_diag.htm#TGDBA026)

- [Database Performance Tuning Guide, Chapter 7: Automatic
Performance Diagnostics: ADDM Analysis
Results](https://docs.oracle.com/database/121/TGDBA/pfgrf_diag.htm#TGDBA026)
