---
layout: post
title: "Kubertetris"
date: 2019-09-16 00:01
comments: true
author: Michiel Brinkman
authorIsRacker: true
authorAvatar: 'https://www.gravatar.com/avatar/e360e0501d74b0de5be9250474951354'
published: true
bio: "Michiel Brinkman is a Solutions Architect working for Rackspace from Amsterdam, The Netherlands. Multi-cloud certified with a strong engineering background."
categories:
    - General
    - 
    - Azure
metaTitle: "GCP Summit Stockholm and Rackspace Kubertetris"
metaDescription: "Rackspace sponsored the 2019 GCP Summit in Stockholm and challenged the attendees to a game of Kubertetris!"
ogTitle: "CI with Hugo and Azure DevOps"
ogDescription: "Rackspace sponsored the 2019 GCP Summit in Stockholm and challenged the attendees to a game of Kubertetris!"
ogImage: "https://657cea1304d5d92ee105-33ee89321dddef28209b83f19f06774f.ssl.cf1.rackcdn.com/kubertetris.png-238d55c85d0b4c6d5060c42556dc378da26e317afd13b7eb50c9f29c65027f39.jpg"
---

Rackspace sponsored the 2019 GCP Summit in Stockholm and challenged the attendees to a game of Kubertetris!

<!-- more -->

## Tetris

![MS-DOs welcome screen ]({% asset_path 2019-09-12-Kubertetris/welcome_screen.jpg %})

On the 28th of May **1987**, during the **Cold War**, a German teenager named Mathias Rust flew a rented Cesna sportplane from Helsinki, Finland into Soviet airspace. Soviet air defences failed to act appropiatly and he managed to land his plane on a bridge near the Kremlin in Moscow. He later stated that his aim was to reduce tension 


[Alexey Pajitnov](https://en.wikipedia.org/wiki/Alexey_Pajitnov)



## 2019 GCP Summit Stockholm

My personal blog is based on static HTML, generated with Hugo, and hosted on **Azure Blog Storage**, which is a very convenient and easy way to host a blog that is both performant and secure. However, even though I use **Typora** to write my mark down and have **Visual Studio Code** to do the "coding" (and use **OneDrive** to keep my source files), this is still a very manual and error prone process. So I built me a good ole continuous integration (CI) pipeline. Well not quite - I am the only developer - and though I do branch and use pull requests, my pipeline would work just as well if I committed straight to master ...

Semantics aside - I solved my issues by creating a pipeline (or workflow) that picks up my code from a source control repository after a successful merge\commit, builds an artifact, and deploys the artifacts to a system. The following schematic provides an overview of my blog writing process:

![CI Diagram]({% asset_path 2019-06-19-Hugo-the-Great-CI-with-Hugo-and-Azure-DevOps/ci_diagram.png %})


What follows is a brief description of the steps I took to set it all up.

### Kuberteris

Just a really short note on tool an technology choices - most of this can also be done using your own favorite Editor/SSG/Hosted Repo/CI-tool/Object Storage and CDN provider but I chose:

- **[Typora](https://typora.io/)** just because I think its the nicest mark down editor - hardly even tried another. Integration with Hugo would be nice though - stuff like img paths and the like.
- **[Visual Studio Code](https://code.visualstudio.com/)** because it is the most versatile free IDE on Windows with all the extensions I require.
- **Hugo** over **[Jekyll](https://jekyllrb.com/docs/)** quite simply because after years of working with **Opscode Chef** on Windows, I didn't really look forward to using Ruby on Windows ever again. Little more on that later. 
- **Azure** to set up my infrastructure because I have a **MSDN** subscription with the associated free credit monthly. Also, back when I decided to ditch **Wordpress**, **AWS S3** didn't support default/index documents. I chose to use only **Azure** services (except for DNS hosting which was not possible at that time - will most likely migrate soon).
- **[Azure DevOps Repos and Pipelines](https://dev.azure.com)** because they are free, have out-of-the-box integrations with Azure infrastructure, and because it has a pretty decent web based GUI and supports defining everything in YAML as well.
- **[Htmltest](https://github.com/wjdp/htmltest)** over **[html-proofer](https://github.com/gjtorikian/html-proofer)** because I am clearly not smart enough to run a ruby based application inside the default managed agent pool in Azure Devops...even though they include system wide **Ruby** by default. I gave up when I found out I would have to install libcurl compiled for Windows. Manually downloading the .dll and renaming it still gave me errors.

And finally - credit where credit is due - I used [this article](https://adwise.ch/blog/ci-for-this-blog-with-azure-devops/) as my starting point for setting all of this up.


### Meet us at the 2019 GCP Summit in Amsterdam!

There are still many areas for improvement - version tagging, automated spell check and mark down check, pure yaml pipelines, and even extending my **CI** environment to cover my hosting infrastructure and checking my pipelines in to source control. But though any other production workload will most likely require more tasks and more extended deployment strategies, for me, this illustrates how easy it is to automate a publishing workflow and set up your own **CI** - especially when using **Azure DevOps** in combination with **Azure** infrastructure resources. 

For those interested, here is a larger version of my [diagram]({% asset_path 2019-06-19-Hugo-the-Great-CI-with-Hugo-and-Azure-DevOps/ci_diagram.png %}).

This post was previously published at my private [blog](https://blog.thirdpartytools.net).
