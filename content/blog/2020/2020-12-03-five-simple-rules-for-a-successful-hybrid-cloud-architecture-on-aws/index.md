---
layout: post
title: "Five simple rules for a successful hybrid cloud architecture on AWS"
date: 2020-12-03
comments: true
author: William Kray
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-U010UP312N6-c808f57c3cd8-512'
bio: ""
published: true
authorIsRacker: true
categories:
    - Cloud Servers
    - AWS
metaTitle: "Five simple rules for a successful hybrid cloud architecture on AWS"
metaDescription: "When discussing cloud strategies, hybrid cloud often comes up as a possible solution."
ogTitle: "Five simple rules for a successful hybrid cloud architecture on AWS"
ogDescription: "When discussing cloud strategies, hybrid cloud often comes up as a possible solution."
slug: "five-simple-rules-for-a-successful-hybrid-cloud-architecture-on-aws"

---
*Originally published in March 2019, at Onica.com/blog*

The information in this blog was pulled from the Amazon Web Services&reg; (AWS) Vancouver Meetup Group Presentation.

When discussing cloud strategies, hybrid cloud often comes up as a possible solution.
It’s not a solution Onica promotes, sometimes however, it’s
necessary for clients who are facing certain limitations in their workloads. If that’s
your situation, we want to ensure that you’re enacting your hybrid cloud architecture correctly.

<!--more-->

### What is a hybrid cloud architecture?

Hybrid cloud is a cloud computing environment that uses a mix of on-premise and
off-premise cloud services and IT resources with some type of orchestration between
the platforms. The goal of the hybrid model is to combine services and data from these
platforms to create a automated, unified computing environment.

Although there are many interpretations of what it means to enact a hybrid cloud architecture,
defining what it means to use hybrid cloud is hard. In reality, hybrid cloud
is any sort of interaction where you have resources deployed in multiple places.
This might include using any combination of on-premise deployment, public cloud provider, or even
multiple public cloud providers. While there are some reasons a business might pursue hybrid cloud
over other cloud options, as with any other cloud strategy, the key to hybrid cloud success lies
in the ability to create a strong architecture. If hybrid cloud is your only option, here are some
tips for ensuring that your architecture is successful, and that you’re using the right tools for the job.

### Avoid lowest common denominator solutions

When it's time to enact deployment in hybrid cloud, people often mistake “the cloud” as
an equivalent of servers and therefore think of their problems in relation to how they would
treat those problems when using on-premise solutions. In reality, the comparison isn’t apples
to apples, and thinking of it that way can limit the future of your solutions by keeping you away from the big picture.

The reality is that cloud solutions like AWS can offer much more than just things like scaling servers.
Minimizing the use of AWS to “just servers” eliminates the use of other great solutions like server-less technology
and other AWS native tools that offer durability and innovation in your architecture. Doing so also restricts what
you can accomplish with your architecture. When operating in a cloud paradigm, your approach becomes different.
Using lowest common denominator tools in these situations means you’re often not using the right tools for the job,
and can create unhealthy dependencies on the tool vendors, when in reality approaching the problem from a cloud
paradigm might offer a more natural solution suited to both the cloud and the issue at hand.

### Think apps, not infrastructure

Similar to the troubles with lowest common denominator solutions, looking at infrastructure over your application
stack can lead to promoting solutions that might operate differently or inefficiently on the cloud. Returning to the
idea of using the right tool for the job, it’s important to assess how your app stack runs, what it runs on, and whether
this approach would still be the right one if you move to AWS.

By shifting to the mindset of “How would this work on the cloud?” you can consider how the app operates and what
it needs to run, then decide what tools would help make this application function in the cloud.

As an example, we once had a client who had an application they used for file movement. It was important to help
migrate this application since it was considered a dependency of about 300 other applications in their environment.
The question initially was, “how do we migrate this application we’re dependent on? All these other applications are
going to break so we have to do this very carefully.” But stepping back, we then began to ask “Why are we dependent on
this one application to move files back and forth when it’s probably one of the easiest things to do in a network architecture?
Why can’t it be a solution we solve for each application?” The odds were that each application probably needed to move files in
a different way anyway. So we ended up breaking things up to use the right tool for each job rather than moving everything
into that single app that was a dependency for the environment.

### Align concepts, not tools

Returning to the idea of “the right tool for the job”, sometimes the right tool is “tools.” Rather than try to create
solutions that get run through a single tool, it’s important to assess how your solutions align conceptually.
This means standardizing things around a concept rather than a single tool. This is an important part of hybrid
architecture because as previously noted, different infrastructures might operate in different ways to accomplish the same
goal. Say, for example, you have an immutable infrastructure with virtual machine images where all information lives.
You might build those machine images in a different way on-premise versus in AWS. But by maintaining the concept of immutable
infrastructure, you can make parallel design decisions in each environment, using different tools to make each effective,
but ultimately united by a common thread. This idea not only helps you pick the best tool for each environment,
but also helps you play to each platform’s strength.

### Empower application teams

Giving development teams power over development environments enables your team and allows for greater success.
This might be a challenging concept, especially since organizations typically have strictly delineated
teams and processes around development, security, networking, etc. However, this approach can spur quicker
change and innovation while creating less of a bottleneck through processes.

What this requires for success is the use of Infrastructure as Code. In AWS, you can do this through
tools like CloudFormation, which offers a safe duplicate area of production. So say, for example, there are firewall
changes that need to be made when deploying a new application. Process might say that a developer should fill out a spreadsheet
that includes things like source IP, destination, IP protocol, and all the other changes for this firewall to change in Development.
But if we give developers access to the Development version of the firewall and allow them to play with the API calls they
need to make changes automatically roll out for the firewall configuration, then they can create a script that only works in
Development allowing them to run tests to see if the changes work as they expect. This then gets passed on to network and security
teams for checks. Those teams can confirm if the changes make sense or reject changes that compromise security rules and
protocols. By doing things this way in a safe environment, network and security teams save time in the process, allowing
them to work on other things while development teams are able operate more quickly.

### Ask yourself “is this even a problem?”

It’s a common misconception in hybrid environments that everything should work the exact same way across on-premise and
cloud environments. When they don’t, it can be perceived as a problem. What happens then
is you end up looking for a solution that falls to the lowest common denominator again, often creating more harm than benefit.

Trying to fix non-existent problems because you expect hybrid to run like on-premise not only damages outcomes, but
can create barriers in processes, limit the abilities of your team, and create unnecessary spend in the long run. Instead,
trying to understand the situation and the “why” behind it can prevent the creation of problems that aren’t truly problems.

There’s no single way to create a successful Hybrid Architecture on AWS, but following these rules and using the right
tools can help when you’re limited by your architecture needs. Breaking down these rules for hybrid architectures comes
down to a case of “Dos & Don’ts.” Not getting stuck in the definition of hybrid and not treating the cloud like a data center
is key to enacting a successful hybrid architecture. Similarly, taking advantage of the strengths of each platform, and
leveraging cloud services from on-premise is also important to maintaining the best of each side. Finally, having a
single point of reference for monitoring health, and looking for single points of failure between environments is
key to ensuring your architecture works together well.

<a class="cta purple" id="cta" href="https://www.rackspace.com/onica">Learn more about our Cloud services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
