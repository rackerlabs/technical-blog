---
layout: post
title: "Do you have an operation readiness checklist?"
date: 2020-06-04 00:01
comments: true
author: Keiran Holloway
authorAvatar: 'https://s.gravatar.com/avatar/02d9e9c7b2e66ab7f451198e22374be1'
bio: "Keiran Holloway is a Senior Lead Infrastructure Engineer focusing on Amazon
Web Services and has been with Rackspace for 6 years. His primary focus is
ensuring that all AWS solutions are designed and implemented in a way which are
both fit for purpose but also closely aligned with key business outcomes. Keiran
is responsible for working with some of the largest enterprise clients within
the EMEA region and brings almost 20 years of hosting and infrastructure experience.
Throughout this extensive past, Keiran built out a strong understanding of
best-of-breed cloud practices, thought leadership, and in-depth domain knowledge
across various technology platforms. Find out more at LinkedIn:
[https://www.linkedin.com/in/keiran-holloway](https://www.linkedin.com/in/keiran-holloway)."
published: true
authorIsRacker: true
categories:
    - DevOps
metaTitle: "Do you have an operation readiness checklist?"
metaDescription: "This post outlines the operational readiness checks for the
go-live phase after you build the solution."
ogTitle: "Do you have an operation readiness checklist?"
ogDescription: "This post outlines the operational readiness checks for the
go-live phase after you build the solution."
---

As we mentioned in
[a previous post](https://www.rackspace.com/blog/focusing-just-cost-optimization-youve-already-wasted-money),
you should consider operational readiness when you prepare to move business-critical
applications and production workloads to the public cloud. You should run
operational readiness checks with your Operations Team in both the solution
design phase and go-live phase.

<!-- more -->

This post outlines the operational readiness checks for the go-live phase after
you build the solution. These checks ensure that you manage all key risk areas
and confirm the services are in the best possible state before it goes live with
production-level traffic.

### Operational readiness checklist: go-live phase

Your operational readiness checklist consists of the following elements:

#### Best practice reviews

Various cloud providers have services that review cloud workloads and provide
recommendations on best practices. Amazon&reg; Web Services (AWS) and Microsoft&reg;
Azure&reg; both have a trusted advisor while Google&reg; has its security command
center. We recommend that you review these recommendations in detail before you
go live to ensure that you are following the cloud vendors' best practices.

While considering your environment, you can also review resources such as
architecture frameworks and associated whitepapers to ensure that you follow
deployment best-practices. There are also third-party cloud management platforms
that can provide enhanced checks. For example, at Rackspace, we use CloudHealth
by VMware&reg;. Reviewing all the advice and selecting cloud management platforms
is time-consuming but certainly worthwhile when looking at highly critical
business systems.

#### Infrastructure deployment practices

We recommend that you deploy all infrastructure by using Infrastructure as Code
(IaC).  Ahead of going live, ensure that you synchronize the code-base for IaC
and the cloud environment.

You should define and test your continuous integration and continuous deployment
(CI/CD) pipelines to make sure they work as designed. This step ensures that the
environments remain in a consistent state because deviations can cause entropy,
which almost certainly introduces service impacting events.

#### Create operational runbooks

You should create an operational runbook and confirm that it's valid.  The
runbook considers traditional IT Service Management factors such as:

- Event Management
- Incident Management
- Problem Management
- Change Management
- Configuration Management (and appropriate use of a CMDB)
- Escalation procedures

#### Resource tagging

Ensure that all your resources meet your companies tagging strategy. This
practice helps you to manage these environments in the future.

#### Resource allocations and autoscaling policies

 When you transition a service into production, ensure that all the resources
 you allocated meet the demands of operating under a real-world traffic load.
 This check includes sizing instances and allocating resources for Platform as
 a Service (PaaS) technologies. Doing performance testing or stress testing buys
 you even more confidence as your traffic ramps up.

#### Define key stakeholders

Ensure that you identify and document all internal and external stakeholders'
names for a workload with relevant contact details. Stakeholders might include
the following individuals:

- application owner
- front-end web and backend developers
- escalation contacts
- operational teams
- individuals responsible for architecture and infrastructure deployment within
  the solution.

#### Service monitoring

You should configure, enable, and test end-to-end service monitoring to ensure
that monitoring notifications work as expected. Ensure that the teams who need
to use the playbooks help to define them and understand them.

#### Backups

You should back up or configure replication for all business-critical data. Make
sure you test these processes and confirm that they are consistent with the
solution RPO and RTO goals.

#### Logging

Configure and enable an appropriate level of logging for all services. Validate
that you enabled a suitable level of verbosity and that you capture adequate
data. Also, consider the log retention periods.

#### Patching

Document your approach to all solutions so you can apply system updates per the
organization's vulnerability assessment program. Don't forget to consider
potential penetration testing or other security and vulnerability scans of the
infrastructure.

#### Disaster recovery

If you defined disaster recovery and business continuity plans during the solution
design phase, test and validate them. Consider the recovery point and time
objectives.

#### Cost approval

Now that you have built the solution and it's ready to go live, validate that
the costs are consistent with the forecasted costs to ensure that these services
remain commercially viable.

### Use the checklist

Review this checklist with your Operations Team to ensure that everything that
you decided during the earlier solution architecture phase was correct and that
the cloud environment is production-ready. This review is primarily about reducing
risk and making sure you cover the most common areas which need more consideration
during the go-live phase.

It's worth noting this is a non-exhaustive list, and additional considerations
will depend on your organization. If you need any support with getting cloud-ready,
Rackspace is here to help.

Visit [www.rackspace.com](https://www.rackspace.com) and click **Sales Chat**
to get started.

Use the Feedback tab to make any comments or ask questions.
