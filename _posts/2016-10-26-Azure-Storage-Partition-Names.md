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

If you are using Azure Blob Storage and have a heavy write workload, there is one thing you can do to improve performance that the majority of people are not doing. That one thing is the name you use for an Azure storage account.

<!-- more -->

A whitepaper released in 2011 describes the
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
output myStorage0, myStorage1, myStorage2, etc. Another example that shows hashing the resource group name using the function **uniqueString** ``` "storageAccountName":
"[concat(uniquestring(resourceGroup().id), 'standardsa')]". ``` This
would generate a hash based on the resourceGroup id and concatenate standardsa to
it, but it would be the same prefix hash, not randomly generate names. The prefixes generated could potentially put the partitions on the same partition server due to the sequential naming.
This potentially could have a performance impact when the storage location service decides to
rebalance the partition ranges to different partition servers. This rebalancing operation causes latency of
storage calls. If we were to create a way to distribute writes across multiple
partition servers using a non sequential naming pattern, we can scale our performance linearly with load. 

How can we generate unique names that are not following a prefix pattern? This is a good question. Researching what ARM template
functions exist, I was surprised there was nothing on generating a random name. There have been requests to Microsoft for providing this functionality, but these suggestions were [turned down](https://feedback.azure.com/forums/281804-azure-resource-manager/suggestions/8499160-provide-a-template-function-to-generate-a-name).

Talking with a peer, Alex Campos, from our Rackspace Azure
team, wrote a generic storage template that solves on how to generate a unique
name. There is a function available in an ARM template called uniqueString
which will generate a hash based on the objects passed in. In my ARM template,
I am creating 2 storage accounts for each VM in my copy loop. A Premium_LRS and
Standard_LRS storage account type. 

 ```    
"name":
"[concat(substring(uniqueString(subscription().id, resourceGroup().id,
'cd', string(copyindex())) ,0,10), 'cd', copyIndex())]",
 ```
 ```
"name":
"[concat(substring(uniqueString(subscription().id, resourceGroup().id,
deployment().name, string(copyIndex())) ,0,10), 'cd',
copyIndex(),'ssd')]",
```
 
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

Using our examples above, our partition map which tracks the index range partitions, intially may have had mystorage0, mystorage1, mystorage2 on partition server 1. With our modified code to generate a unique prefix hash, our partitions now should be spread out on multiple partition servers since we are not following a sequential naming pattern.

I encourage you to read [the whitepaper](http://sigops.org/sosp/sosp11/current/2011-Cascais/printable/11-calder.pdf) for more insight into the Azure Storage system.

 

