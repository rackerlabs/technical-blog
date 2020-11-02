---
layout: post
title: "Introducing role based access control on objectrocket"
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
metaTitle: "Introducing role based access control on objectrocket"
metaDescription: "."
ogTitle: "Introducing role based access control on objectrocket"
ogDescription: "."
slug: "introducing-role-based-access-control-on-objectrocket"

---

Sharing logins is lame. It’s a necessary evil, though; there are some scenarios where you just have to.
When it comes to SaaS offerings, it can be a real challenge as teams get larger and you don’t want to
give everyone full control. The clear solution is Role-Based Access Control (RBAC) and today we’re
enabling RBAC features on our brand new hosting platform.

<!--more-->

### What is Role-Based Access Control

The following line shows how to add an image.  If you have no image, remove it.
If you have an image, add it to the post directory and replace the image name in the following line.

There are lots of definitions out there for RBAC, but NIST offers a pretty succinct definition:

“A model for controlling access to resources where permitted actions on resources are identified
with roles rather than with individual subject identities.”

Pretty simple. Your access to a piece of information or action is based on an assigned role.
Let’s look at how this applies to something like Database as a Service. There are a number of
obvious things you’d want to do, like:

- Create a database
- Delete a database
- Control access to a database

There are also some other actions to think about:

- Viewing and updating payment information
- Viewing metrics
- Inviting other users to the account

Without RBAC, everyone has access to everything. If you can log in, you can do all the things.
For example, you may want someone from accounting to be able to view billing and payment
information. However, you definitely don’t want to give that person the ability to mistakenly
delete a database. That’s where RBAC comes in; you would create a role like “Billing”
which only grants users with that assigned role the ability to view billing information
and nothing else.

### How this Works on ObjectRocket

Back when you first signed up for our service (if you haven’t yet, go check it out at https://app.objectrocket.cloud),
the first thing you did was create an organization. An organization is just our way of grouping all of your users together.
By creating an account and an organization, you just became an “owner”. Congratulations!

Now, with our launch of RBAC controls in our dashboard’s UI, you can invite other people to your organization
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
E

This gives you the ability to specify an owner (you can also have multiple owners) that do everything,
then limit access to the other members of your team. You can have a select few that manage the databases
themselves, but just give read-only access to the developers that just need to connect to the database
from their application. You can give just metrics access to an analyst who only needs to see stats on
your databases. Finally, you can limit access of the people keeping the books to only the billing information.

This is just a starting point and we’ll be adding greater customization down the road.

### Getting Started

If you’ve already signed up, or going create a new account now, you are automatically the owner of
your organization. From there, adding new users is as simple as:

{{<img src="RBAC-Users-Permissions.png" title="" alt="">}}

#. Click Users on the main menu in Mission Control.
#. Click Invite New User
#. Enter an email address and role

That’s it!

From there, your invited user gets an invitation email. Once they click that link in the email and
sign up, they’ll show up in your users list.

There are a few rules where we need to get Support involved, like trying to invite a user who is
already part of another organization. However, our Support team is always there to help you resolve any.

We hope you’re as excited about this feature as we are, so go check it out now!

<a class="cta purple" id="cta" href="https://www.rackspace.com/sap">Learn more about our SAP services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
