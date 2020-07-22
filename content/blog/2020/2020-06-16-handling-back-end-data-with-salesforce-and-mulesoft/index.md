---
layout: post
title: "Handling back-end data with Salesforce and MuleSoft"
date: 2020-06-16
comments: true
author: Charlie Ballard
published: true
authorIsRacker: true
authorAvatar: 'https://s.gravatar.com/avatar/9ded7b3f5e28bcd3d61292b06475a631'
bio: "Charlie is a *Certified Mulesoft Integration Architect* and an 18-times
*Certified Salesforce Architect*. He has worked as a Salesforce and Mulesoft end
user, administrator, developer, consultant, and architect since 2011 and has
worked with organizations in a variety of industries across the globe."
categories:
    - Salesforce
metaTitle: "Handling back-end data with Salesforce and MuleSoft"
metaDescription: "Here at Rackspace Technology, we always look for creative ways
to solve technical challenges, such as how to make data available across applications."
ogTitle: "Handling back-end data with Salesforce and MuleSoft"
ogDescription: "Here at Rackspace Technology, we always look for creative ways
to solve technical challenges, such as how to make data available across applications."
slug: 'handling-back-end-data-with-salesforce-and-mulesoft'
---

Here at Rackspace Technology, we always look for creative ways to solve technical
challenges, such as how to make data available across applications.

<!--more-->

For example, how can we make data from back-end systems visible to sales or
customer-service users in Salesforce&reg;? The simplest way to do this is to sync the
data between the systems by using a scheduled batch process to extract, transform,
and then load the data from the external systems into Salesforce.

However, this approach often proves troublesome, particularly if you need to sync
large volumes of reference data in Salesforce, which is inefficient. Similarly,
if the data in question contains sensitive information, this might bring up
compliance issues. So, what alternatives are there to that simple approach?

For scenarios like these, we recommend that you use Salesforce Connect and
MuleSoft&reg;.

Salesforce Connect takes data residing in external applications and makes that
data available to users in Salesforce similar to normal objects, like
opportunities or cases. That way, the data visibility is seamless for users,
and Connect handles field visibility and page layouts in the same way that
Salesforce does.

The advantage is that data from these external data sources does not reside on
the Salesforce platform. Instead, Connect retrieves the data in real-time when
a user needs it, such as invoice records for a given account. Connect uses an
application programmer interface (API) for the external system that uses the
Open Data Protocol (OData) standard. If the external system already provides an
API endpoint, setting up the rest is easy.

But what happens if you have multiple back-end applications you want to expose
in Salesforce, or if your applications don't provide OData endpoints? That's
where a tool like MuleSoft comes in.

MuleSoft is a leading API and integration platform that allows organizations to
build, deploy, publish, and share APIs and data integrations by using various
integration patterns. In this scenario, we recommend using MuleSoft to build an
OData-compliant API layer on top of the back-end systems so that you can easily
access data in Salesforce. For example, Salesforce Connect makes an API call to
the OData endpoint built on MuleSoft. Then you configure MuleSoft to query the
back-end systems and format the response to send back to Salesforce. MuleSoft
has a variety of pre-built application and technology connectors for Oracle&reg;,
SAP&reg;, Amazon S3, and databases using a Java&reg; Database Connectivity (JDBC)
connection, as shown in the following image:

{{<image src="Picture1.png" alt="" title="">}}

The solution, then, is to perform the following tasks:

1. Use Salesforce Connect to surface external data.

2. Use Salesforce Connect to connect to an OData-compliant API endpoint
   provided by MuleSoft.

3. Configure MuleSoft to handle the integration with the back-end systems and
   return the data to the MuleSoft API. This step makes the data available to
   users in Salesforce.

### Rackspace and Salesforce

If your organization uses back-end data with Salesforce similar to the preceding
scenario, we can help. Get in touch with the Rackspace experts.

<a class="cta teal" id="cta" href="https://www.rackspace.com/salesforce">Learn more about Salesforce Customer Relationship Management (CRM).</a>


### Rackspace as your integration partner

Rackspace Integration and API Management Services, based on MuleSoft, offer
you a route to easy and significant improvement in your enterprise application
processes by using the adoption of APIs. We provide an established framework to
manage APIs easily, speeding up workflows, and reducing human intervention and
errors. The Rackspace team does this through a combination of expert professional
services with MuleSoft software solutions. Rackspace is a MuleSoft Select Partner.

Our long history of hosting, integrating, and managing legacy enterprise resource
planning (ERP) and customer relationship management (CRM) systems for thousands
of customers worldwide makes us a leader in application integration. Our
partnership with MuleSoft, the world's leading vendor of iPaaS and API management
tools, further strengthens our ability to serve you.

<a class="cta purple" id="cta" href="https://www.rackspace.com/mulesoft">Learn more about Rackspace Integration and API Management Services.</a>

Visit [www.rackspace.com](https://www.rackspace.com) and click **Sales Chat**
to get started.

Use the Feedback tab to make any comments or ask questions.
