---
layout: post
title: "Kubertetris"
date: 2019-10-29 00:01
comments: true
author: Michiel Brinkman
authorIsRacker: true
authorAvatar: 'https://www.gravatar.com/avatar/e360e0501d74b0de5be9250474951354'
published: true
bio: "Michiel Brinkman is a Solutions Architect working for Rackspace from Amsterdam, The Netherlands. Multi-cloud certified with a strong engineering background."
categories:
    - General
    - Developers
    - NodeJS
metaTitle: "Kubertetris"
metaDescription: "Rackspace sponsored the 2019 GCP Summits in Stockholm and Amsterdam and challenged the attendees to a game of Kubertetris!"
ogTitle: "Kubertetris"
ogDescription: "Rackspace sponsored the 2019 GCP Summits in Stockholm and Amsterdam and challenged the attendees to a game of Kubertetris!"
ogImage: "https://657cea1304d5d92ee105-33ee89321dddef28209b83f19f06774f.ssl.cf1.rackcdn.com/kubertetris.png-238d55c85d0b4c6d5060c42556dc378da26e317afd13b7eb50c9f29c65027f39.jpg"
---

Rackspace sponsored the 2019 GCP Summits in Stockholm and Amsterdam and challenged the attendees to a game of Kubertetris

<!-- more -->

## Rust

On the 28th of May **1987**, during the **Cold War**, a German teenager named **Mathias Rust** flew a rented **Cesna F172P** (on side note - the most successful and most produced airplane ever)  from **Helsinki, Finland** into Soviet airspace. Soviet air defenses failed to act appropriately and he managed to land his plane on a bridge near **the Kremlin** in **Moscow**. He later stated that his aim was to reduce the tensions between the **NATO** and the **Warsaw-Pact** - while in hindsight he should consider himself lucky that he wasn't shot down and killed. 

However, as an example of the [Butterfly Effect](https://en.wikipedia.org/wiki/Butterfly_effect) the Soviet military's failure allowed [Michael Gorbachov](https://en.wikipedia.org/wiki/Mikhail_Gorbachev) to remove many of the strongest opponents to his reforms which eventually led to the dismantlement of the **Soviet Union** and the end of the **Cold War**. 

![MS-DOs welcome screen ]({% asset_path 2019-10-29-Kubertetris/welcome_screen.jpg %})

**Rust** and his tiny plane were immortalized in what could be called a "meme avant la lettre" in the **1987** IBM-PC release of **Tetris** by [Spectrum Holobyte](https://en.wikipedia.org/wiki/Spectrum_HoloByte) which featured **the Kremlin** and **Rust's** plane in the game's welcome screen. 

![Tetris]({% asset_path 2019-10-29-Kubertetris/tetris.jpg %})

**Tetris** itself, created in **1984** - yes **1984**..- by [Alexey Pajitnov](https://en.wikipedia.org/wiki/Alexey_Pajitnov), which has a whole movie plot worthy history of its own, managed to permeate the **Iron Curtain** not long after **Rust** did to become the most popular computer game of all time by being - to quote Computing Gaming World (in 1987) - "deceptively simple and insidiously addictive". 

But that's not what this blog post is about..or is it?

## GCP Summit

**Rackspace** - as a provider of managed and professional services - has been a **Google** partner for years and we were recognized as their **2018 Global Migration partner of the year**. So obviously we attended and sponsored the **Google Cloud Platform Summit** in **Stockholm** and **Amsterdam** this year. Both events were very well organized and featured talks by some of our customers and led to very interesting conversations - but in all honesty our services- especially managed services can be a hard sell. 

Of course, our name doesn't help. But while we are perfectly able to explain where we came from, where we are heading and why we uniquely positioned to help companies reach their goals and complete their objectives - compared to **Machine Learning**, **Artificial Intelligence** or even **Kubernetes** - our managed services and transformation strategies just aren't that sexy. 

How does one exhibit (I have always loved the fact that a collection of sponsor booths is dubbed a **"Partner Exhibition"** like we are some modern day **Gustav Eiffel**..) or demo managed services? Show a customer environment with all servers patched? Put some of our great support people on display to channel Fanatical Experience? 

Our local marketing team and myself quickly decided that to really tell people how we add value for our customers we should first find a way to break the ice. And what better way to break the ice than playing a game? 

### Blocks => Tetris + Kubernetes == KuberTetris

When we launched our managed services for what we call "Third Party Cloud" (AWS/Azure/GCP) we only had two service offerings:

- **Navigator** - where we would tell you where to go but you had to find how to get there by yourself
- **Aviator** - where we would commandeer the steering wheel and take you wherever we thought you wanted to go

In time this proved to be a less than ideal - some customers needed some more help managing their infrastructure for a short period of time while others only needed help designing their environment and were perfectly able to run it themselves. 

So we introduced the concept of **Service Blocks** - specific blocks of services that our customers can use to compose their own service offering that is a it for them and fit for purpose. 

But don't worry this is not some stale sales pitch - however, the concept of blocks (and quite possibly the difficulty that some of us had when transitioning to the new model) was what inspired me to pick Tetris as our promotional vehicle. And since a lot of the work we do on **GCP** is around **Kubernetes** and since - let's be honest here - **Kubernetes** is pretty difficult to navigate as well - the *portmanteau* **KuberTetris** was born. 

![KuberTetris]({% asset_path 2019-10-29-Kubertetris/kubertetris.jpg %})

### The Tech behind the Talk

Personally, I hardly qualify as a proper developer. Let alone a game-developer. But I knew I wanted to build something that could be run just about anywhere on non-specific hardware and that would be easy to maintain and support - which lead me to exploring the possibility of creating Tetris based on **HTML5** and client-side only code. 

Luckily some kind souls already did all the hard work and developed an open source Tetris HTML5 clone with theme support. I can not praise them enough - and I've tried to reach out to see if we can somehow compensate them for their hard work - kudos to the people at **Aerolab** and their project [Blockrain.js](http://aerolab.github.io/blockrain.js/) ! 

I created a custom there around **GCP** and **Kubernetes** and later also included our **Service Blocks**, adjusted some of the game files for additional customization and hosted the game on blob storage the result of which can be found [here](https://public.thirdpartytools.net/kubertetris/index.html). 

Pictures of Winners 

Future development

- HLP, DD 
- CI/CD 


### Meet us at the 2019 InfoSecurity Expo in Utrecht!

Link to the game, invite 