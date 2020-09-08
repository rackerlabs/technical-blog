---
layout: post
title: "Snowflake Security Foundations - Overview"
date: 2020-08-01
comments: true
author: Traey Hatch and Wei Wang
published: true
authorIsRacker: true
authorAvatar: 'https://secure.gravatar.com/avatar/9dfc94655d2c7e6d819bc064141f8d60'
bio: "I build things, large and small, digital and tangible. Find me writing about tech, building
new things, and experimenting with my 3d printer."
categories:
    - General
metaTitle: "An overview of our approach to setting up a solid security architecture for Snowflake."
metaDescription: "Snowflake has been enormously popular with data teams, large and small.
Snowflake offers flexibilty, operational efficiency, and an impressive pace of adding new,
time-saving features. Our article discusses how we build a Snowflake architecture for our
customers, giving them a CICD first approach to source control for security and schema definitions."
ogTitle: "Setup Snowflake Security Foundations"
ogDescription: "Snowflake has been enormously popular with data teams, large and small.
Snowflake offers flexibilty, operational efficiency, and an impressive pace of adding new,
time-saving features. Our article discusses how we build a Snowflake architecture for our
customers, giving them a CICD first approach to source control for security and schema definitions."
---

Snowflake has been enormously popular with data teams, large and small.
Snowflake offers flexibility, operational efficiency, and an impressive pace of adding new,
time-saving features. Our article discusses how we build a Snowflake architecture for our
customers, giving them a CICD first approach to source control for security and schema definitions.

<!--more-->

### A CICD approach to Snowflake security

Database migration is one of those subjects that is somewhat of a dark art. Often companies set up the
database foundation in a hurry and without giving much thought to repeatability. This process makes sense
because developers are usually in a hurry to get back to solving their business problems and just want to
get data into the backend as quickly as possible.

This practice exposes many problems when dealing with a data warehouse, especially one with as much storage
capacity as Snowflake®. The entire history of your organization can reside in one store, so access considerations
are paramount.

Recently, a customer engaged us to set up their Snowflake account and warehouse. This blog post covers how we set
up the security and operational data store objects for a multi-environment (NONPROD/TEST/PROD) deployment. By
combining Snowflake best practices, AWS® Developer Tools, and traditional data warehouse design, we achieved a system
that allows their team to expand its warehouse inventory without having to labor over security decisions. The system
also allows the customer’s security team to determine how to grant important access privileges to a Git repository
managed separately from the one used by the Extract, Transform, Load (ETL) developer team.

### Two repos to rule them all

The foundation of the security model we created for our client consists of two Git repos. These two repos, called
Security and DataOps, contain all of the SQL database migration scripts required to set up our security model and
all database objects (tables, schema, tasks, and streams, and so on.)

By using a SQL script for database modification, our customer had a continuous integration continuous delivery (CICD)
approach to promoting changes from NONPROD through to PROD and a version-controlled record of any actions taken in their
database. By relying on the scripted execution of migration files, we knew exactly what changes were executed in PROD and
that those changes were reviewed as part of the PR process in either repo.

The Security repo, accessible to only the DBA team, was the source of truth for any universal database security objects,
as shown in the Role Design diagram in the Multiple environments section.

The DBA team and the ETL development team had access to the DataOps repo. This repo was the source of truth for any
smaller-scale database objects, ultimately governed by the roles created in the Security repo.

### Multiple environments

{{<image src="snowflake-architecture-snowflake-setup.png" alt="Snowflake Architecture Environment Design" title="Snowflake Architecture Environment Design">}}

Best practices dictate the use of multiple environments when developing software. We often see this practice abandoned
in databases and data warehouses, either due to the cost of running multiple database instances or the extra administrative
work of maintaining numerous environments.  A combination of CICD, design, and Snowflake magic helps us overcome these challenges.

By using Snowflake, you pay for only the compute time used to access your data so that we can develop and test across multiple
environments without the extra cost of an always-on DB engine.  Additionally, novel Snowflake features, such as Zero-Copy cloning
and Snowpipe, let you create multiple environments and test new features that need to interact with production data easily and
cost-effectively.

Our design has three environments: NONPROD, TEST, and PROD. After we promote a dataset to PROD, we can use the Zero-Copy clone
to make the full dataset available in TEST and NONPROD.

### Layered security design

{{<image src="snowflake-architecture-snowflake-security-framework.png" alt="Snowflake Security Framework Concepts" title="Snowflake Security Framework Concepts">}}

The Snowflake strategy for security is to create a layered set of roles and privileges, by combining two common approaches:

* Discretionary Access Control (DAC): Each object has an owner, who can grant access to that object.

* Role-based Access Control (RBAC): You create access privileges and assign them to users.

To implement your security model in Snowflake, you create roles that group privileges. These roles are then, in turn, assigned
to parent roles all the way up to a final owner of the database object. We discuss a typical role design later in this blog post.
The owner of the database object is responsible for assigning privilege grants to the objects they own.

By delegating the right to assign privileges to the object owner, a security administrator can set general guardrails and
overarching security permissions while allowing database developers and users to create objects and set permissions on
anything they create.

### Role design

{{<image src="snowflake-architecture-role-design.png" alt="Snowflake Security Role Design" title="Snowflake Security Role Design">}}

The preceding diagram represents a security design similar to one we implemented recently for a retail customer. We created
all of the system-level permissions (above the dotted line in the diagram) by using migration scripts in a dedicated Security
repo. The Security repo was accessible to only the DBA team and contained the blanket security privileges that set up the
environments and developer permissions within those environments.

We defined all of the business unit roles (those below the dotted line) in the database migration scripts that create the
database objects governed by the roles. For example, the following SQL script creates an EDW table and grants permissions to
that table in the same migration script. This kind of interaction allows the developer to maintain responsibility for data
access without requiring effort from the DBA team. Thus, the developer, working from business requirements, does not need to
engage another team and communicate a design to set up permissions. They can directly create the role hierarchy required and
submit it for review when creating a PR on the DataOps repo.

### CICD

{{<image src="snowflake-architecture-cicd-pipeline.png" alt="Snowflake Security CICD Design" title="Snowflake Security CICD Design">}}

To create a consistent business process for deploying changes to the Snowflake blog, we build a CICD pipeline. The business
process to deploy a new schema or update to a Data Warehouse often involves several teams. For many of our customers, a new
data warehouse object includes a review from a security team, a code review from a senior dev, and a QA review in a dedicated
environment.

In the preceding example, we made use of all AWS tools to create the pipeline. We defined the pipeline by using Cloud Formation
(CF) and a **buildspec.yml** file in the repo. This process enables the DevOps team to define the business process for releasing
a code update but allows the dev team to control what code gets run as part of the build and release process.

### SQL, snowchange, and Jinja

Keeping the schema under version control allows us to know the state of our database and facilitate a review of all structural
changes in the warehouse. If DBAs create security objects, tables, and ETL objects (tasks, streams, and pipes) in the worksheet
view, then they must run queries to understand the state of the database. If we create all our database objects through a CICD
pipeline by executing SQL scripts stored in version control, we have an auditable database history.

Several tools are available to handle database migrations from source control: Flyway®, Alembic, and upstart snowchange. While
architecting a solution for a recent customer, we ran into snowchange, an open-source, Python®-based tool. snowchange has a
similar design to Flyway, using filenames to denote the script order and folder structure used to create database and schema
objects. We chose snowchange over Flyway due to its simple design, its focus on Snowflake, and its Python code.

snowchange expects files named according to the following example:

{{<image src="flyway-naming-convention.png" alt="Snowchange file naming convention" title="Snowchange file naming convention">}}

snowchange executes all the files in a folder in order, and a change table in your Snowflake database tracks the execution of any files.

One piece of functionality was missing when we first encountered snowchange, Jinja templating. Jinja templating is the secret
sauce that allows us to use the scripts in CICD pipelines and deploy to multiple development environments (NONPROD, UAT, PROD).

## Related topics

There are some topics related to security that we have chosen not to cover here for brevity. In addition to the layered security
framework described previously, Snowflake also has an extensive system for managing encryption keys for accounts, tables, or
ingested files. Snowflake also treats assumed-role integrations with cloud storage systems as first-class objects.

## References

· [Snowflake Security Overview](https://www.snowflake.com/wp-content/uploads/2015/06/Snowflake_Security_Overview_WP.pdf)


