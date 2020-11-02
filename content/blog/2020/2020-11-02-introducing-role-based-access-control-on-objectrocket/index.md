---
layout: post
title: "Introducing role-based access control on ObjectRocket"
date: 2020-11-02
comments: true
author: Steve Croce
authorAvatar: 'https://gravatar.com/avatar/56d03e2d0f853cff39c129cab3761d49'
bio: "As Senior Product Manager for the ObjectRocket Database-as-a-Service
offering and Head of User Experience for ObjectRocket, Steve oversees the
day-to-day planning, development, and optimization of ObjectRocket-supported
database technologies, clouds, and features. A product manager by day, he still
likes to embrace his engineer roots by night and develop with Elasticsearch,
SQL, Kubernetes, and web application stacks. He's spoken at
KubeCon + CloudNativeCon, OpenStack summit, Percona Live, and various Rackspace
events."
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "Introducing role-based access control on ObjectRocket"
metaDescription: "When it comes to SaaS offerings, it can be a real challenge as teams get larger and you don’t want to
give everyone full control. The clear solution is Role-Based Access Control (RBAC) and we’ve
enabled RBAC features on our brand new hosting platform."
ogTitle: "Introducing role-based access control on ObjectRocket"
ogDescription: "When it comes to SaaS offerings, it can be a real challenge as teams get larger and you don’t want to
give everyone full control. The clear solution is Role-Based Access Control (RBAC) and we’ve
enabled RBAC features on our brand new hosting platform."
slug: "introducing-role-based-access-control-on-objectrocket"

---
*Originally published on September 25, 2019, at ObjectRocket.com/blog*

Sharing logins is lame. It’s a necessary evil, however, and there are some scenarios where you just have to.
When it comes to Software-as-a-service (SaaS) offerings, it can be a real challenge as teams get larger and you don’t want to
give everyone full control. The clear solution is Role-Based Access Control (RBAC), and we’ve
enabled RBAC features on our hosting platform.

<!--more-->

### What is RBAC?

There are lots of definitions for RBAC, but the National Institute of Standards and Technology (NIST) offers a pretty succinct definition:

“A model for controlling access to resources where permitted actions on resources are identified
with roles rather than with individual subject identities.”

Pretty simple. Your access to a piece of information or action is based on an assigned role.
Let’s look at how this applies to something like Database-as-a-Service. There are a number of
obvious things you can do:

- Create a database
- Delete a database
- Control access to a database

There are also some other actions to think about:

- View and update payment information
- View metrics
- Invite other users to the account

Without RBAC, everyone has access to everything. If you can log in, you can do all the things.
For example, you might want someone from accounting to be able to view billing and payment
information. However, you definitely don’t want to give that person the ability to mistakenly
delete a database. That’s where RBAC comes in. You create a role like *Billing”*, which grants assigned
users the ability to view billing information only and do nothing else.

### How this works on ObjectRocket

When you first signed up for our service (if you haven’t yet, go check it out at https://app.objectrocket.cloud),
the first thing you did was create an organization. An organization is just our way of grouping all of your users together.
When you create an account an organization, you become an *owner*. Congratulations!

Now, by using the RBAC controls in our dashboard UI, you can invite other people to your organization
and give them different roles. For now, those roles and privileges are:

<table>
  <tr>
    <th>Role</th>
    <th>Manage UI Users</th>
    <th>Create / Update / Delete Instances</th>
    <th>List and view Instances</th>
    <th>Manage ACL and DB users</th>
    <th>View ACL and DB Users</th>
    <th>View Metrics</th>
    <th>Manage Billing</th>
  </tr>
  <tr>
    <td>Owner</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
  </tr>
  <tr>
    <td>Admin</td>
    <td>x</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
    <td>✓</td>
  </tr>
  <tr>
    <td>Read Only</td>
    <td>x</td>
    <td>x</td>
    <td>✓</td>
    <td>x</td>
    <td>✓</td>
    <td>✓</td>
    <td>x</td>
  </tr>
    <tr>
    <td>Metrics</td>
    <td>x</td>
    <td>x</td>
    <td>x</td>
    <td>x</td>
    <td>x</td>
    <td>✓</td>
    <td>x</td>
  </tr>
    <tr>
    <td>Billing</td>
    <td>x</td>
    <td>x</td>
    <td>x</td>
    <td>x</td>
    <td>x</td>
    <td>x</td>
    <td>✓</td>
  </tr>
</table>

RBAC gives you the ability to specify an owner (or multiple owners) that can do everything,
and limit access for the other members of your team. You can have a select few that manage the databases
themselves, and give read-only access to the developers that just need to connect to the database
from their application. You can give just metrics access to an analyst who only needs to see stats on
your databases. Finally, you can limit the access of the book-keepers to only billing information.

This is just a starting point, and we continue to add greater customization.

### Getting started

If you’ve already signed up, or plan to create a new account, you automatically become the owner of
your organization. From there, adding new users is as simple as performing the followong steps:

{{<img src="RBAC-Users-Permissions.png" title="" alt="user premissions">}}

1. Click **Users** on the main menu in **Mission Control**.
2. Click **Invite New User**.
3. Enter an email address and role.

That’s it!

From there, your invited user gets an email. After they click that link in the email and
sign up, they show up in your **User** list.

There are a few cases where you might need to get Support involved, such as trying to invite a user who is
already part of another organization, and our Support team is always here to help you.

Check out our RBAC feature!

<a class="cta purple" id="cta" href="https://www.objectrocket.com">Learn more about ObjectRocket.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
