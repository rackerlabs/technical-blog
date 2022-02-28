---
layout: post
title: "DNS v2.0"
date: 2022-02-28
comments: true
author: Daniel Drown
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - Architecture
    - Configuration Management
metaTitle: "DNS v2.0"
metaDescription: "We’ve been working hard on our DNS systems and now we have some results to share."
ogTitle: "DNS v2.0"
ogDescription: "We’ve been working hard on our DNS systems and now we have some results to share."
slug: "dns-v2"

---
At Rackspace Technology, we’re constantly upgrading and updating our systems to meet the security and convenience of our customers.

<!--more-->

To this end, we have worked on creating a new Cloud DNS API. This evolved version will help our customers manage their DNS in a more convenient and easy to manage set of processes. The key differentiators of the DNS v2 against the previous versions are outlined below:
We’ve created a new Cloud DNS API which we’re calling v2. The Cloud DNS v1 API will continue to be supported and work as before, but v2 brings with it several enhancements:


-	Instead of endpoints returning an asynchronous job, almost all work is done synchronously, and the status reported immediately. This API was originally designed for jobs that took minutes, and now our API does its work in a fraction of a second. This will make the API easier to use and faster to complete a task.

-	We’ve documented the new v2 API using an OpenAPI document, and there’s an API exploration UI available at https://dns.api.rackspacecloud.com/

-	We’ve added support for CAA records

-	We’ve made our internal architecture more efficient, which resulted in faster change-to-publish times as well as the ability to handle more volume.

-	We’ve made our record validation consistent through all our external and internal APIs, and we now catch many common bugs and mistakes in the creation of DNS records.

-	We’ve made the code base easier to understand and maintain, so we can deliver new features quicker than ever before

With the new DNS v2, customers can easily maintain their DNS with the added advantage of up-to-date documentation, simpler operations and a more robust and efficient DNS architecture. It also adds the added benefits of handling more volume and faster turnaround times with synchronous endpoints and faster feature delivery.


<a class="cta red" id="cta" href="https://www.rackspace.com/cloud/bare-metal">Let our experts guide you on your Managed Hosting Journey.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
