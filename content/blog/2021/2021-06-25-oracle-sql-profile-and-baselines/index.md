---
layout: post
title: "Oracle SQL profile and baselines"
date: 2021-06-25
comments: true
author: Mannu Tanwar
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - Database
    - Oracle
metaTitle: "Oracle SQL profile and baselines"
metaDescription: "This post highlights the differences between SQL profile and baselines in Oracle&reg; and explains how it works when tuning a query."
ogTitle: "Oracle SQL profile and baselines"
ogDescription: "This post highlights the differences between SQL profile and baselines in Oracle&reg; and explains how it works when tuning a query."
slug: "oracle-sql-profile-and-baselines"

---

This post highlights the differences between SQL profile and baselines in
Oracle&reg; and explains how it works when tuning a query.

<!--more-->

### Optimizer, profile, and baseline

At a high level, these three elements work together as follows:

- The query optimizer uses information like system statistics, bind variables,
and compilations to get the best plan for query execution. However, sometimes
input defects lead to a sub-optimal plan.

- SQL profiles contain auxiliary information that mitigates this issue.
They minimize these mistakes and help the optimizer select the best plan.

- SQL plan baselines for SQL statements consist of a set of accepted plans. After
parsing the statement, the optimizer selects the best plan from the set of
accepted plans. If the cost optimizer finds another good plan, it adds the new
plan to the plan history. However, the optimizer doesn't use the new plan until
it verifies that it will perform better than the currently accepted plan.

Think of it this way: SQL profiles give information to the optimizer to help
select the best plan but don't force the optimizer to select any specific plan.
SQL plan baselines limit the optimizer plan selection to a set of accepted plans.
If you want to consider cost-based plans, include them in the accepted baseline
set of plans.

Use SQL profiles if you want the optimizer to use a least-cost plan and need to
use the latest statistics. Use baselines when you want to use one of a specific
set of plans. If SQL plan baselines can't get the best plan from the accepted
set, use the SQL profile instead.

### SQL Plan Management

SQL Plan Management (SPM) has the following components:

- Plan capture
- Plan selection
- Plan evolution

##### SPM plan capture

When you execute any statement, the system hard parses it and generates a cost
plan according to the available SQL profile. After it selects a cost-based plan,
it compares the plans available in the SQL plan baselines. If a cost-based
generated plan matches one of the accepted plans, then you can use that plan. If
the plan does not match, the system adds it to the plan baselines as an
unaccepted plan.

##### SPM plan selection

When you execute the SQL statement with a baseline plan, it opts for the best
plan for that SQL. The optimizer uses the same process. The available SQL
profile also affects the estimated cost for each plan and selects a plan
accordingly.

##### SPM plan evolution

The last component of SPM is the evolution of unaccepted plans, which tests the
unaccepted plans against the accepted plans. This process assesses the best plan
considering time taken by a query and the CPU resources required. It accepts the
best plan according to the cost of the query. If an SQL profile is available,
then it affects the estimated cost.

### Profile versus baseline comparison

The following table, from
[https://www.cnblogs.com/princessd8251/articles/3637461.html](https://www.cnblogs.com/princessd8251/articles/3637461.html),
compares SQL profiles and SQL plan baselines:

{{<img src="Table1.png" title="" alt="">}}

</br>

### Architecture

The following image shows SQL plan baseline architecture:

{{<img src="Picture1.png" title="" alt="">}}

*Image Source: [https://ittutorial.org/sql-plan-management-using-sql-plan-baselines-in-oracle-oracle-database-performance-tuning-tutorial-14/)](https://ittutorial.org/sql-plan-management-using-sql-plan-baselines-in-oracle-oracle-database-performance-tuning-tutorial-14/)*

</br>

### Load SQL plan baselines

The following image shows two ways to load SQL plan baselines:

{{<img src="Picture2.png" title="" alt="">}}

*Image Source: [https://ittutorial.org/sql-plan-management-using-sql-plan-baselines-in-oracle-oracle-database-performance-tuning-tutorial-14/](https://ittutorial.org/sql-plan-management-using-sql-plan-baselines-in-oracle-oracle-database-performance-tuning-tutorial-14/)*

</br>

With the first method, you can set the **OPTIMIZER\_CAPTURE\_SQL\_PLAN\_BASELINES**
initialization parameter to `TRUE` to use automatic plan capture. This
initialization parameter is `FALSE` by default, so set it to `TRUE` as shown in
the following example:

{{<img src="Code1.png" title="" alt="">}}

</br>

With the second method, you can use the **DBMS\_SPM** package to enable manually
manage SQL plan baselines. Load the plans from an SQL tuning set as shown in the
following example:

{{<img src="Code2.png" title="" alt="">}}

</br>

##### Load the SQL plan baseline manually

Use the following command to load the plan baseline manually:

{{<img src="Code3.png" title="" alt="">}}

</br>

### Check the SQL plan baseline usage

After loading the SQL plan baseline, you need to execute SQL to see if the
optimizer is using the SQL plan baseline. You can query the SQL plan baselines
by using SQL_TEXT and the plan name as follows:

{{<img src="Code4.png" title="" alt="">}}

</br>

### Display SQL plan baselines

Run the following query to display SQL plan baselines:

{{<img src="Code5.png" title="" alt="">}}

</br>

### Drop the SQL plan baseline

To drop the SQL plan baseline, run the following query to check which SQL plan
the optimizer is using:

{{<img src="Code6.png" title="" alt="">}}

</br>

Then, after you get the plan in use, run the following command to drop the
baseline:

{{<img src="Code7.png" title="" alt="">}}

</br>

### Oracle SQL profile

The SQL tunning advisor, which you trigger through Oracle Enterprise Manager
(OEM) or by using a command-line query, can generate the SQL profile for an SQL
statement. This profile includes additional information about the statement.

##### Example

In this example, you first run SQL tuning advisor against the sql_id and then
perform operations on the SQL profile:

#### 1.  Run SQL tuning advisor

Run the following SQL tuning advisor code for sql_id, `6dkrnbx1zdwy38`:

{{<img src="Code8a.png" title="" alt="">}}

{{<img src="Code8b.png" title="" alt="">}}

 </br>

Run the following **DBMS\_SQLTUNE.report\_tuning\_task** for recommendations:

{{<img src="Code9.png" title="" alt="">}}

</br>

#### 2. Accept the sql_profile

Run the following code to accept the sql_profile:

{{<img src="Code10.png" title="" alt="">}}

</br>

#### 3. Check the name of the sql_profile

Use the following query to check the sql_profile name:

{{<img src="Code11.png" title="" alt="">}}

</br>

#### 4.  Disable the sql_profile

Run the following code to disable the sql_profile:

{{<img src="Code12.png" title="" alt="">}}

</br>

To enable it, change the value from `DISABLED` to `ENABLED`.

#### 5. Drop the sql_profile

Run the following code to drop the sql_profile:

{{<img src="Code13.png" title="" alt="">}}

</br>

### Conclusion

When you execute any SQL statement, the optimizer creates an execution plan to
parse the query, retrieve the data from the hard disk, and place it in memory.
The SQL profile and baselines guide the optimizer to choose the least costly plan
in terms of time and CPU cost.  A good SQL plan efficiently runs a query and
provides the desired results faster.

<a class="cta teal" id="cta" href="https://www.rackspace.com/data/databases">Learn more about our Database services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
