---
layout: post
title: "Calculating the growth of Sitecores collection database"
date: 2016-09-09 00:00
comments: false
author: Juan Daniel Garza
authorIsRacker: true
published: true
categories:
- Devops
---


One of the great mysteries in life is predicting the future needs of your collection database as it stores interactions over the entire life of your application. It’s a tricky thing to predict accurately because user behavior and site content change over time but we can make some estimations to provide some guidance on our database requirements.

<!-- more -->

The collection database stores two types of data, contacts and interactions. There are some community references to an estimate of 5/kb per interaction and 2.5/kb per contact attributed to Sitecore but several members of our team performed testing and found that estimate to be a bit high. We’ve seen between 3kb and 4kb per interaction and .2 kb per contact. Additionally we observe nearly a 1:1 relationship between the number of contacts and interactions stored. These figures are only estimates and will vary quite a bit and these two metrics do not reflect all of the data collected either, just the majority of it.

Armed with these estimates we can use any traffic data we have access to for some predictive planning. 
Interactions = total page views, Contacts = total page views (new contacts will be 1:1 ratio)
(Interactions * 4kb) + (contacts * .2kb) = Total Database growth 

1000 page views per month = (1000*4kb) + (1000 * .2kb) = 4200kb or 4.2 MB per month
10,000 page views per month = (10000*4kb + 10000 * .2kb) = 42,000kb or 42 MB per month
100,000 page views per month = (100000 * 4kb +100000 *.2kb = 420,000kb or 420 MB per month
500,000 page views per month = (500000 * 4kb + 500000 * .2kb = 2,100,000kb or 2.1 GB per month
1,000,000 page views per month = 4,200,000kb or 4.2 GB per month

As I’ve stated the actual database growth will vary based on user habits and any data capture customizations but with this estimation you can provision enough storage to accommodate initial growth while measuring more accurate site traffic and database growth for future estimation. 
