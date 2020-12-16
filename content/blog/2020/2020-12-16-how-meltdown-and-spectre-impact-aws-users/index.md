---
layout: post
title: "Meltdown and Spectre impact AWS users"
date: 2020-12-16
comments: true
author: Tolga Tarhan
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-UTA9EJ5T8-ece2a1ba3f39-512'
bio: "Combining deep hands-on knowledge of technology with creative solutions 
to business problems, Tolga has built and led organizations that deliver 
world-class software products. A software engineer and entrepreneur by trade, 
He has 16 years of successive experience in executive roles (CTO, CEO) 
leading organizations that build great products and deliver exceptional services."
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "Meltdown and Spectre impact AWS users"
metaDescription: "These are two vulnerabilities in modern processors: Meltdown impacts Intel CPUs and Spectre impacts Intel chips, plus AMD and ARM chips. The bugs enable an attacker to bypass memory protection, allowing access to memory that shouldn’t be accessible to the attacker."
ogTitle: "Meltdown and Spectre impact AWS users"
ogDescription: "These are two vulnerabilities in modern processors: Meltdown impacts Intel CPUs and Spectre impacts Intel chips, plus AMD and ARM chips. The bugs enable an attacker to bypass memory protection, allowing access to memory that shouldn’t be accessible to the attacker."
slug: "Meltdown-and-spectre-impact-AWS-users"
canonical: https://onica.com/blog/security/hMeltdown-spectre-impacts-aws-users/

---

*Originally published in Jan 2018, at Onica.com/blog*

This article is a brief overview of Meltdown, and Spectre, two bugs that represent security risks in the cloud as we understand them, and the next steps.

<!--more-->

As you have undoubtedly heard, Google&reg; Project Zero released information about two vulnerabilities in modern processors: Meltdown and Spectre. This article is a brief overview of these two bugs that represent security risks in the cloud as we understand them and the next steps.

**Note:** This is a simplified take on these very complex bugs, and isn’t intended to be a complete analysis. The academic papers on the bugs are available [here](httpsMeltdownattack.com/).


### What are Meltdown and Spectre?

These are two vulnerabilities in modern processor Meltdown impacts Intel&reg; CPUs since the Pentium II&reg;, and Spectre impacts those Intel chips, plus AMD&reg; and ARM&reg; chips. The bugs enable an attacker to bypass memory protection, allowing access to memory that shouldn’t be accessible to the attacker. In both cases, CPU optimizations that have unintended side-effects cause the bugs.

#### What’s the difference betwen Meltdown and Spectre?

Meltdown uses a flaw in out-of-order execution optimizations in Intel CPUs to enable access to all kernel-mapped memory from a user-space process. In most cases, physical memory is mapped into kernel space, and as such, Meltdown effectively allows any user-space process to access all of the physical memory on the machine.

Spectre uses a side-channel and timing attacks in predictive branching and speculative execution that allow an attacker to trick a process into accessing arbitrary memory locations and revealing such data to an attacker.

#### How does this impact AWS&reg; users?

While we know from the various announcements that Meltdown can escape virtual machine sandboxes in certain circumstances &mdash; particularly, in Xen paravirtual environments, AWS immediately patched their entire EC2 fleet against the hypervisor vulnerabilities.

Given this, the virtual machine sandbox is secure. Regardless of any OS-patches, other instances on the same physical hardware as your instances cannot access any data inside your instances, and the isolation between virtual machines remains completely intact.

The remaining exposure for Meltdown is primarily in the form of local exploits inside the virtual machine. While this is important, it isn't as significant as the virtual machine sandbox escape, or as a remote exploit. Assuming that all of the applications running on the instance are trusted, then there’s a less immediate concern. That said, Meltdown is fixed with a recent kernel update which enables KAISER &mdash; Kernel Address Isolation to have Side-channels Efficiently Removed, which patches even the local exploit path.

Spectre is an entirely new class of vulnerability. We expect to see more patches as more is learned about the attack vectors enabled by Spectre. For now, the primary focus is on software that executes untrusted code and sandboxed code &mdash; notably web browsers.

#### AWS Meltdown and Spectre patches

Rackspace Onica’s team of security experts can help you apply emergency patches for Meltdown. We’ve worked with [numerous companies](https://onica.com/case-studies/) in highly regulated markets, including [medical](https://onica.com/case-study/healthrise-solutions/) and [financial](https://onica.com/case-study/kasasa/) industries. We’ll identify security risks and take steps to ensure compliance across multiple mandates.

[Contact us](https://onica.com/contact/) for a comprehensive security assessment to uncover vulnerabilities and security threats in your AWS environment.

<a class="cta teal" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
