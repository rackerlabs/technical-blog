---
layout: post
title: "Azure Storage Partition Names"
date: 2016-10-26 10:22
comments: false
author: Jimmy Rudley
published: true
categories:
    - DevOps
---

Microsoft has built a load balanced, geo replicated and
durable storage system that powers a lot of the Azure infrastructure as we know
of today. If you have a heavy write workload, there is one thing you can do to
improve performance that the majority of people are not doing. That one thing
is the name you use in Azure storage.

<!-- more -->

A whitepaper back released in 2011 describes the
internals of how Azure Storage works under the hood. It describes how the
partitioning layer uses a range based partitioning scheme to scale and load
balance the storage system. Using the range based makes sense in a multi-tenant
world. Objects are now stored within a set of ranges and can help isolate bad
neighbor effect. A hash based system would help spread out the load, but then
you lose the performance gain of ranges and bad neighbor is now more profound
across a set of nodes, instead of potentially a smaller group.

If we are creating multiple storage accounts in an Azure
Resource Manager template, you will normally see some kind of storage account
prefix parameter that is consumed during the storage account creation process.
An example of the output of this would look something like ``` "name":
"[concat(parameters('storageAccount'), copyindex())]" ``` which would
output myStorage0, myStorage1, myStorage2. Another example is straight from the
Azure github repo which has ``` "storageAccountName":
"[concat(uniquestring(resourceGroup().id), 'standardsa')]". ``` This
would generate a hash based on the resourceGroup id and concat standardsa to
it, but it would be the same prefix hash, not randomly generate names in that
loop. This would cause it to potentially be put on the same partition server.
The performance hit happens when the storage location service decides to
rebalance the partition ranges. This rebalancing operation causes latency of
storage calls. If we were to create a way to distribute writes across multiple
partition servers, we can scale our performance linearly with load. 

How can we generate unique names that are not following some
kind of prefix pattern? This is a good question. Researching what ARM template
functions exist, I was surprised there was nothing on generating a random name.
There was a [feedback post](

https://feedback.azure.com/forums/281804-azure-resource-manager/suggestions/8499160-provide-a-template-function-to-generate-a-name


, but Microsoft declined the request.


Talking with a peer, Alex Campos from our Rackspace Azure
team wrote a generic storage template that solves on how to generate a unique
name. There is a function available in an ARM template called uniqueString
which will generate a hash based on the objects passed in. In my ARM template,
I am creating 2 storage accounts for each VM in my copy loop. A Premium_LRS and
Standard_LRS storage account type. 

     
"name":
"[concat(substring(uniqueString(subscription().id, resourceGroup().id,
'cd', string(copyindex())) ,0,10), 'cd', copyIndex())]",

     
"name":
"[concat(substring(uniqueString(subscription().id, resourceGroup().id,
deployment().name, string(copyIndex())) ,0,10), 'cd',
copyIndex(),'ssd')]",

 

The first storage account, I am generating a hash based on
the subscription id, resourcegroup id, a string called 'cd' and the current
integer of my index loop. I then concatenate the hash, 'cd' and the current
integer of my index loop. With the second storage account, I am now adding the
deployment name to my hash function. I want my hash to be unique, so it must
differ from the uniqueString call I did previously. I also now add 'ssd' to the
end of my storage account name since this is being used to generate my
premium_lrs storage and will help me identify it.

 

The output will generate the following

15:20:57 - [VERBOSE] 3:20:57 PM - Resource
Microsoft.Storage/storageAccounts 'tnisayz3qdcd0' provisioning status is
running

15:20:57 - [VERBOSE] 3:20:57 PM - Resource
Microsoft.Storage/storageAccounts 'hi4fn4pgjccd1' provisioning status is
running

15:21:22 - [VERBOSE] 3:21:22 PM - Resource
Microsoft.Storage/storageAccounts 'v4pfo5nwdkcd0ssd' provisioning status is
succeeded

15:21:28 - [VERBOSE] 3:21:28 PM - Resource
Microsoft.Storage/storageAccounts 'a725b73hpkcd1ssd' provisioning status is
succeeded

 

I encourage you to read the whitepaper and understand how
the Azure storage system works. http://sigops.org/sosp/sosp11/current/2011-Cascais/printable/11-calder.pdf

 

