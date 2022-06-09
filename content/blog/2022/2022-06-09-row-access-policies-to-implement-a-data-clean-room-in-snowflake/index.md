---
layout: post
title: "Row Access Policies to Implement a Data Clean Room in Snowflake"
date: 2022-06-029
comments: true
author: Cristian Scutaru 
authorAvatar: 'https://secure.gravatar.com/avatar/a3d4c57f7fe0ebfa4bd2aba864618eaf'
bio: "Cristian is a Lead Data Architect at Rackspace Technology, specializing in Snowflake delivery projects and promoting their Snowflake practice overall. Selected by Snowflake as their only “Data Superhero” in Canada in 2022. Certified Solutions Architect in each of the top three cloud hypescalers: AWS, Azure and GCP, with over a dozen certification exams in total on these platforms. Over 25 certification exams passed in the last two years alone. Instructor on Udemy, with practice tests for certification exams on Cassandra, Neo4j, Redis, or Couchbase, replicated as Kindle or paperback books on Amazon. Over three decades of practical experience in software development, architecture, and project management. Former Microsoft employee, in the SQL Server and Windows groups."
published: true
authorIsRacker: true
categories:
    - Database
    - Data
metaTitle: "Row Access Policies to Implement a Data Clean Room in Snowflake"
metaDescription: "It’s common for advertisers to ask for more analytics from their publishers. They want to know if their ads performed well, along with a series of other factors. But the publishers cannot traditionally share their sensitive or proprietary data."
ogTitle: "Row Access Policies to Implement a Data Clean Room in Snowflake"
ogDescription: "It’s common for advertisers to ask for more analytics from their publishers. They want to know if their ads performed well, along with a series of other factors. But the publishers cannot traditionally share their sensitive or proprietary data."
slug: "row-access-policies-to-implement-a-data-clean-room-in-snowflake"

---

It’s common for advertisers to ask for more analytics from their publishers. They want to know if their ads performed well, along with a series of other factors. But the publishers cannot traditionally share their sensitive or proprietary data.

Two such partners may have their own private lists of users, customers, and products, that they cannot share with each other. Because of PII and other privacy concerns, or simply because this is valuable proprietary data. 


<!--more-->

However, they could eventually try to derive some information with real business value. For instance, they could try to internally match their customers and see how many they have in common. But how and where to combine those lists, when both parties do not want to share the details?

### Yao’s Millionaires’ Problem revisited
I wrote several times in the past about [this famous puzzle](https://medium.com/infostrux-solutions/snowflake-data-clean-rooms-the-problem-with-yaos-millionaires-problem-442ac1c22653), that goes like this: 

*How can two millionaires (Alice and Bob) determine whose net worth is higher without telling each other how much money they each have?*



You see how similar the problem is with the scenario described before. And we used to implement this in Snowflake with a secure view and a secure function, but not without challenges: 

<img src=Picture1.png title="" alt="">


A while ago, I challenged my coworkers (and my fellow Snowflake “Data Superheroes”) with a variation of the problem, to avoid looking for a solution by simply googling. And let’s implement this simple variation here, in Snowflake: 

*Two different users have exclusive access each to a different table, in which they each store some text. Let's say Jack stores "I am great" in his table, and Mary stores "Friday it is" in her table. None of them knows what the other stored. Jack needs to know if they both stored the same text, but without telling Mary what he stored. How can they do this in Snowflake?*

### Yao’s Millionaires’ Problem implemented

Let’s start by implementing the infrastructure, which is straightforward. We create both tables in a separate test database, but each owned and accessed by two different roles: Jack and Mary.

<img src=Picture2.png title="" alt="">

Let’s create the “secret” tables now. Jack creates his table, Mary creates hers.

<img src=Picture3.png title="" alt="">

Test that Jack cannot see indeed Mary’s table, and Mary cannot access Jack’s:

<img src=Picture4.png title="" alt="">

And now the big hack, this is how we do it! Mary will be allowed to create a row access policy, which will be attached to her table and the column with her secret. The policy says that when the current role is Jack, the current statement (e.g. the SQL query he tries to execute) can be only the text defined there. Which simply joins the tables and returns True if the secrets are the same. Without giving up what is actually stored.

<img src=Picture5.png title="" alt="">

And yes, now Mary can safely grant Jack access to her table. But remember that Jack cannot see raw table data. In fact, he can see nothing else! The only thing Jack can do is to run the exact query that Mary allowed him to execute. That will return only True or False. 

<img src=Picture6.png title="" alt="">

With the Jack role, let’s check if it works indeed. It works and this will return False:

<img src=Picture7.png title="" alt="">

Allow Mary to set her secret the same as Jack’s, just to test the functionality here: 

<img src=Picture8.png title="" alt="">

Now this will return True:

<img src=Picture9.png title="" alt="">

It is important to remember that the query should be called exactly as it has been defined in the policy. You may not add, change, or remove any blank space, new line, or alias, because this will make it a different new query.

The following query, that changed the m alias to mm, will always return False:

<img src=Picture10.png title="" alt="">

### Data Clean Rooms in real life

I wrote a while ago [another article with a concrete example.](https://medium.com/snowflake/snowflake-data-clean-rooms-with-row-access-policies-4892ea266bab) 

Here below the Consumer – which can be a separate Snowflake partner account – has its own list of associates he doesn’t want to share. The Producer – which can be your Snowflake account – has a list of customers you don’t want to share. The names of the associates and the customers are PII (Personally Identifiable Information), which by law you cannot share with any third-party. 

<img src=Picture11.png title="" alt="">

You saved the total sales value for each of your customers. And this is your very valuable proprietary information, you may never want to share this with anyone. However, you may extract some business value by allowing your partner account to eventually derive some information. Only for those customers and associates with the same names, assuming they are the same persons, you may allow a query that groups by their profession and returns the sales as an average value. [Properly matching records by name it’s another story](https://medium.com/infostrux-solutions/how-to-properly-match-records-in-a-snowflake-data-clean-room-4bdfdcbcb56c), for another time.


Your row access policy may define even more than one single query a third-party can run. It’s recommended to store all these allowed statements into a separate table that you own. 

Remark also that you cannot run any of these queries because your partner granted you no access to their tables. But you are also safe, because the partner can execute only what you allow them to execute.

While we deal with separate Snowflake account, you must also create a read-only secure data share, that your partner will discover as an inbound share in their account.

### Conclusions

-	Data Clean Rooms is a booming niche market today. Most companies collected and continue to collect huge amounts of data, and they are looking for better commercial value for every gigabyte they have.

-	Many companies partner together on a lot of issues. They each have their proprietary data and sensitive data they cannot share because of legal issues. But it is still possible to derive some valuable information without exposing the rest.

-	Snowflake made it very easy lately, when most other ways to implement a Data Clean Room are rather unsafe and complicated. Row access policies allow you to grant access to only a few statements that you know for sure will return predictable data. For the rest, both you and your partner are totally protected.



<a class="cta purple" id="cta" href="https://www.rackspace.com/data/data-warehouses">Let our experts guide you on your Data Warehousing journey.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
