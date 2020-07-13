---
layout: post
title: "Introduction to virtual private databases"
date: 2018-10-01
comments: true
author: Harish Chandra Durgapal
published: true
authorIsRacker: true
categories:
    - Oracle
---

Originally published by TriCore: December 14, 2017

Introduced in Oracle8i&trade;, Oracle&reg; Virtual Private Database (VPD) is
the most popular security feature of [Oracle
Database](https://www.rackspace.com/managed-hosting/database-services/oracle)
Enterprise Edition. You can use this feature when the standard object
privileges and associated database roles are insufficient to meet
your application security requirements.

<!--more-->

Oracle VPD enables you to create security policies or group policies to
control database access at the row and column levels. It enables multiple
users to access a single schema while preventing them from accessing
data that isn't relevant to them. VPD uses fine-grained access control (FGAC)
to limit data visibility to specific users. This functionality is also called
row-level security (RLS).

Database administrators generally leverage data access control in the
application that's accessing the data. However, Oracle VPD security policies
provide a mechanism for securing data at the database level itself. The
ability to secure data at a granular, database object level is a very powerful
feature of VPD.

You attach security policies directly to the database tables, views, or
synonyms. VPD enforces security to a fine level of granularity directly
on these objects. It automatically adds a dynamic `WHERE` clause to SQL
statements that are issued against a table or view, or that are synonyms of an
applied VPD security policy.

As a result, VPD automatically applies the policies whenever a user attempts
to access data from these objects. The policy function of the object that the
user is accessing returns a `WHERE` clause condition, and Oracle Engine
modifies the statement dynamically based on the VPD predicate function.
There's no way for a user to bypass a VPD security policy that has been added
to an object. You can apply Oracle VPD policies to `SELECT`, `INSERT`,
`UPDATE`, `INDEX`, and `DELETE` statements.

Oracle VPD policies use the `DBMS_RLS` package for VPD enforcement. The
`DBMS_RLS` package contains the FGAC administrative interface, which enables
you to implement VPD. The `DBMS_RLS` package is available only with the
Enterprise Edition.

The following table describes the `DBMS_RLS` package:

| **Procedure**        	| **Description**                                                                	|
|----------------------	|--------------------------------------------------------------------------------	|
| ADD_POLICY           	| Adds an FGAC policy to a table, view, or synonym                               	|
| ENABLE_POLICY        	|   Enables or disables an FGAC policy                                           	|
| REFRESH_POLICY       	| Causes all of the cached statements associated with the policy to be re-parsed 	|
| DROP_POLICY          	| Drops an FGAC policy from a table, view, or synonym                            	|
| CREATE\_POLICY\_GROUP    	| Creates a policy group                                                         	|
| DELETE\_POLICY\_GROUP    	| Deletes a policy group                                                         	|
| ADD\_GROUPED\_POLICY     	| Adds a policy associated with a policy group                                   	|
| ENABLE\_GROUPED\_POLICY  	| Enables or disables a row-level group security policy                          	|
| REFRESH\_GROUPED\_POLICY&nbsp; &nbsp;	| Re-parses the SQL statements associated with a refreshed policy                	|
| DROP\_GROUPED\_POLICY    	| Drops a policy associated with a policy group                                  	|
| DISABLE\_GROUPED\_POLICY 	| Disables a row-level group security policy                                     	|
| ADD\_POLICY\_CONTEXT 	| Adds the context for the active application                                     	|
| DROP\_POLICY\_CONTEXT  	| Drops a driving context from the object so that it has one less driving context 	|

<br />

### Example 1: Row-level VPD

Imagine that the `PER_PHONES` table that's used in this example
belongs to your company's Human Resources department. It contains the personal
phone numbers of your company's employees. You want to secure this table by
adding a VPD policy to this object so that only the `APPS` user may view the
data.

Use the following steps to accomplish this task:

1. Create the VPD policy function in the database where you want to implement
   VPD, as shown in the following image:

    ![A screenshot showing the command used to create the VPD policy
    function](picture1.png)

2. Link the new function to the policy, as shown in the following image:

    ![A screenshot showing the command that links the policy to the
    function](picture2.png)

3. Query the table `PER_PHONES` as the `APPS` user, as shown in the following
   image:

    ![A screenshot of the query and the
    results](picture3.png)

4. Query the table `PER_PHONES` as a user other than the `APPS` user, as shown
   in the following image:

    ![A screenshot of the query and the
    results](picture4.png)

    This example applies VPD to the table `PER_PHONES` for both the `APPS`
    user and other users when they run a `SELECT` statement on the table. The
    dynamic predicate that the policy function returns causes the data to
    display differently.

### Example 2: Column-level VPD

In this example, you want to conceal the data in some of the columns in the
table `PER_ALL_PEOPLE_F`. You need a VPD policy that allows only the `APPS`
user to see the data in the following columns:

- `DATE_OF_BIRTH`
- `NATIONAL_IDENTIFIER`
- `MARITAL_STATUS`

The data in the other columns should be available to all users.

1. Create the VPD policy function, as shown in the following image:

    ![A screenshot of the query and the
    results](picture5.png)

2. Create the VPD policy.

3. Link the new function to the VPD policy, as shown in the following image:

    ![A screenshot of the command that adds the policy function to the VPD
    policy](picture6.png)

    The **sec\_relevant\_cols** parameter enables column-level VPD, which
    enforces security policies when a query references a column that
    contains sensitive information. VPD applies to tables and views, but not
    to the synonyms. Specify a list of comma or space-separated valid column
    names of the policy-protected object. This parameter defaults to all of
    the user-defined columns for the object.

    Use the **sec\_relevant\_cols\_opt** parameter with the `sec_relevant_cols`
    parameter to display all rows for column-level VPD, filtered queries
    (`SELECT` only), where sensitive columns appear as
    `NULL`. The default value for this parameter is `NULL`, which enables
    the filtering defined with `sec_relevant_cols` to take effect. Set the
    value for this parameter to `dbms_rls`. Use `ALL_ROWS` to display all
    rows, but with sensitive column values that are filtered by the
    `sec_relevant_cols` parameter as `NULL`.

4. Query the table `PER_ALL_PEOPLE_F` as the `APPS` user, as shown in the
   following image:

    ![A screenshot of the query and the
    results](picture7.png)

    The `APPS` user can see all of the column data in the table.

5. Query the table `PER_ALL_PEOPLE_F` as a user other than the `APPS` user, as
   shown in the following image:

    ![A screenshot that shows the query and the lack of
    results](picture8.png)

    Other database users can't see the data in these columns because the
    policy function masks those fields.

### Conclusion

The examples in this post were tested on Oracle Database 12c Enterprise
Edition Release 12.1.0.2.0 (64 bit). They demonstrate how VPD enables you to
control access to table columns and rows by both database users and
non-database users, such as application users. VPD policy groups enable you to
selectively hide application table columns from different types of application
users.

While this functionality is powerful, keep in mind that you shouldn't add
complex logic to your policy functions because it might impact performance.

Use the Feedback tab to make any comments or ask questions.

[Learn more about Rackspace database
services](https://www.rackspace.com/managed-hosting/database-services).
