---
layout: post
title: "Using PowerShell to manage Rackspace Cloud Security Groups"
date: 2016-04-30 23:59
comments: true
author: Jose Da Silva
published: true
authorIsRacker: true
authorAvatar: 'http://www.gravatar.com/avatar/e447889c7bb6912e05aa82248c9cf964'

categories:
    - Security Groups
    - Automation
    - PowerShell
---

One day I was testing this neat new feature and was really struggling with those curl examples. 
"I'm not a browser", I thought, "can I have this in a proper scripting or dev language?"
Since I couldn't find it anywhere, I decided to write this myself.

Everybody talks about Security and, in the Cloud, sometimes the tools and options available seem confusing or inefficient. Most companies just need a simple tool to filter traffic to their Cloud Servers and Rackspace has, for some time now, launched in limited availability our own implementation of a very useful feature called 'Security Groups'.

<!-- more -->

If you're already familiar with similar concepts like AWS Security Groups and Azure Network Security Group features, then this is Rackspace equivalent.

Due to its launch status, it's not yet very well known by customers but it a very powerful tool to secure your servers and manage its access filters with some consistency and ease.

So, you need to filter traffic on all your hundreds of Cloud Servers but you don't really want to do it one at a time. Ideally your deployment cycle is all automated (or close enough) and each time a new network requirement calls for rules changed, you cringe. Your process is still manual.

No more, we're going to explain in this post what you can do, and help you automate using a simple tool like PowerShell. The concepts and basics should be simple enough for you to tweak at will, but if you need help, reach out with questions via Rackspace support channels or post a comment here. 


### What is it?



From the man page (https://community.rackspace.com/products/f/25/t/6733)

_Security groups are named collections of network access rules that enable Rackspace Public Cloud users to specify the types of traffic that are allowed to pass through PublicNet and ServiceNet ports on a Cloud Servers instance._

Servers can be secured with Rules that work similar to Access Control Lists that filter traffic based on TCP/IP ports, on TCP, UDP or ICMP protocols, at IPv4 and IPv6. Optionally, you can filter by source IP address or range.

Really, it's just your typical ACLs, a list of what ports and IPs are allowed into your collection of Cloud Server.

Currently supported are Inbound rules only but Outbound rules are expected to be available at unlimited availability launch.

It's also important to clarify the distinction that security groups are applied to a network, not directly to an instance. 

Remember:

A security group is a container for security group rules and can only be applied to resources in the region where it was created.

Now with the caveats and explanations out of the way, you want to start using this right now.

First, since it's not general availability yet, please contact our Support or Service Delivery team to request being added to the beta testing group of customers.

And then you can start using via the portal or the API.

(https://developer.rackspace.com/docs/user-guides/infrastructure/cloud-config/network/cloud-networks-product-concepts/security-groups/)

However, the purpose of my blogpost is to simplify ease and automate using PowerShell. Also, I'm not a browser.

You came here for the code so let's jump into it.

### Code 

 * Let's start with some assumptions that are resolved with your preference of SDK
 * Let's confirm you have access properly configured:
 * Tokens and tidbits
 * List Security Groups
 * Show Security Group per Group ID
 * Delete your Security Group per Group ID
 * Create Security Group Rules 
 * List Security Group Rules 
 * Show Security Group Rules 


Since the API used is an HTTP endpoint, we will be using Invoke-RestMethod. The PowerShell SDK should soon be expanded to support this, but in the meantime, here's how you can use it.

 * Let's start with some assumptions that are resolved with your preference of SDK.

    Since we don't want to tattoo the code (hardcoding is bad) with API keys and sensitive information, I'm assuming you have configured user variables in your environment that include:
    {% codeblock lang:powershell %}
    $apiuser = [Environment]::GetEnvironmentVariable("apiuser","User") 

    $apikey = [Environment]::GetEnvironmentVariable("apikey","User") 
    {% endcodeblock %}

    Your control panel will show this information but a guide is here too:
    https://developer.rackspace.com/docs/cloud-networks/v2/developer-guide/#getting-started

    Since Security Groups are bound to the region where they were created, we're also configuring:

    {% codeblock lang:powershell %}
    $region = [Environment]::GetEnvironmentVariable("region","User") 
    {% endcodeblock %}


    Remember, that if you need, you can create and save these environment variables using PowerShell too. For example:

    {% codeblock lang:powershell %}
    [Environment]::SetEnvironmentVariable("region",”LON”,"User") 

    [Environment]::SetEnvironmentVariable("apiuser",”your_RS_username_here”,"User")  

    [Environment]::SetEnvironmentVariable("apikey",”your_API_key_here”,"User")  
    {% endcodeblock %}


 * Let's confirm you have access properly configured:

    {% codeblock lang:powershell %}
    try 
    {
        #Set URL
        $URL = "https://identity.api.rackspacecloud.com/v2.0/tokens"

        #Build JSON object with variables
        $auth = New-Object -TypeName psobject -Property @{
            "auth" = @{
                "RAX-KSKEY:apiKeyCredentials"=@{
                    "username" = "$apiuser";
                    "apiKey" = "$apikey"
                }
            }
        }
    
        #Convert object to JSON
        $authJSON = $auth | ConvertTo-Json

        # call API
        $request = Invoke-RestMethod  -Uri $URL  -Method Post -Body $authJSON -ContentType "application/json"
    }
    catch 
    {
        # error handling
        $ErrorMessage = $_.Exception.Message
        Write-Host "Problem found! Hope this helps:"
        Write-Host $ErrorMessage -ForegroundColor Red

    }
    {% endcodeblock %} 
    
    So, if you got an error, it was most likely 401 Unauthorized, which means go above and fix your user or apikey.

 * Tokens and tidbits

    Otherwise your request has a wealth of information including your important authentication token to continue with the rest of this operations:

    {% codeblock lang:powershell %}
    # token handling 
    $token = $request.access.token.id
    $authToken = @{"X-Auth-Token" = $token} 
    {% endcodeblock %}

    We also get the service catalogue which has the full range of available products available to use

    {% codeblock lang:powershell %}
    # service catalog here - range of available products to use and associated IDs
    $fullcatalog = $request.access.serviceCatalog 
    {% endcodeblock %} 

    And therefore, let's browse the catalog in a lazy (non elegant way).
    I'm sure you're already thinking on how to improve the below! Good on you!

    {% codeblock lang:powershell %}
    # browing the catalog
    foreach ($catalog in $fullcatalog) {

        if ($catalog.name -eq "cloudNetworks")
        {
            $catalogNetwork = $catalog
        }
    }
    {% endcodeblock %}
    
    Here I get also my tenantID and URI for CloudNetwork operations so I don't need to hardcode it
    Hardcoding is bad, have I said that ?

    {% codeblock lang:powershell %}
    # useful details here
    $tenantId = $catalogNetwork.endpoints.tenantID 
    $CloudNetworkURI = $catalogNetwork.endpoints.publicURL  
    {% endcodeblock %}

 * List Security Groups

    I can finally list my existing Security Groups (if I created any via the GUI/portal). If you're just following this demo, then go ahead and create something on the portal just to confirm that the below works. Go on, I'll wait…

    {% codeblock lang:powershell %}
    # list current security groups and its rules
    $lstSecGroups = Invoke-RestMethod -Uri "$CloudNetworkURI/security-groups" -Method GET -Headers $authToken  -ContentType application/json 
    
    # View them in a pretty way
    $lstSecGroups.security_groups | ConvertTo-Json -Depth 6 
    {% endcodeblock %} 

    But now comes now the fun part. 
    Let's create one new:
    First, define it, then POST it!

    {% codeblock lang:powershell %}
    # we're ready to create a NEW security group
    try{
        #Set URLsc
        $URLsc = "$CloudNetworkURI/security-groups"

        #Build JSON object with variables
        $rbody = New-Object -TypeName psobject -Property @{
                "security_group"=@{
                "name" = "1-new-tcp";
                "description" = "security group for webservers"}
                } 
        
        #Convert object to JSON
        $bJSON = $rbody | ConvertTo-Json

        # call API
        $ newsgrequest = Invoke-RestMethod  -Uri $URLsc  -Method Post -Headers $authToken -Body $bJSON -ContentType "application/json"

        # view results
        $newsgrequest | ConvertTo-Json -Depth 6 
        Write-Host "Created Security Group",$newsgrequest.security_group.id 

    }
    catch 
    {
        # error handling
        $ErrorMessage = $_.Exception.Message
        Write-Host "Problem found! Hope this helps:"
        Write-Host $ErrorMessage -ForegroundColor Red

    }
    {% endcodeblock %}

    Since Security Group identifier is a Group ID, and not the name, you could create multiple security groups with the same name, but let's NOT do that, ok! 
    Could be confusing…
    If you get error (409) Conflict, then you've reached the current limit of 10 Security Groups.

 * Show Security Group per Group ID

    If you ever need to show details on a specific Security Group, you will need its ID.
    So store it or parse it based on your application requirements.

    {% codeblock lang:powershell %}
    # if you want to show a specific security group
    $URLscId = "$URLsc"+"/"+$newsgrequest.security_group.id #re-using this var because I know it exists in this demo

    # call API and display in human readable format
    $showSecGroupId = Invoke-RestMethod -Uri $URLscId -Method GET -Headers $authToken  -ContentType application/json
    $showSecGroupId | ConvertTo-Json -Depth 6 
    {% endcodeblock %}

    Neat!

    * Delete your Security Group per Group ID

    So I hear you now want to delete it? Make sure nobody is using it…
    But it's easy, just change method to DELETE and point to the previous URLscId

    {% codeblock lang:powershell %}
    #	Delete your Security Group per Group ID
    try{
        Invoke-RestMethod -Uri $URLscId -Method DELETE -Headers $authToken  -ContentType application/json
    }
    catch 
    {
        # error handling
        $ErrorMessage = $_.Exception.Message
        Write-Host "Problem found! Hope this helps:"
        Write-Host $ErrorMessage -ForegroundColor Red

    } 
    {% endcodeblock %}

    If there's errors, it's likely already deleted! Oops, no undelete available…

 * Create Security Group Rules 

    Let's look at the Security Group Rules since you can't do much with those groups you've created thus far. Each Security Group Rule is associated with a specific Security Group ID but you have this code so you can easily deploy the same to any other Security Groups you have.
    Since we deleted the last group created we can't use it but if you're following the demo, I'll just select a random security group ID that exists in the account (assuming you have at least one, otherwise please create one). You know what they say about assumptions, right ?

    {% codeblock lang:powershell %}
    # security group lottery draw
    $lstSecGroups = Invoke-RestMethod -Uri "$CloudNetworkURI/security-groups" -Method GET -Headers $authToken  -ContentType application/json
    $random = get-random -Maximum $lstSecGroups.security_groups.Count
    $randomgroupid = $lstSecGroups.security_groups | Select-Object -Index $random | Select-Object ID
    write-host "Random select Security Group ID: ",$randomgroupid.id

    # create a security-group-rule
    try{
        #Set URLscRl
        $URLscRl = "$CloudNetworkURI/security-group-rules"

        #Build JSON object with variables
        $rbody = New-Object -TypeName psobject -Property @{
                "security_group_rule"=@{
                    "direction" = "ingress";
                    "port_range_min" = "80";
                    "ethertype" = "IPv4";
                    "port_range_max" = "80";
                    "protocol" = "TCP";
                    "security_group_id" = $randomgroupid.id}
                }
        
        #Convert object to JSON
        $bJSON = $rbody | ConvertTo-Json

        # call API
        $newsgrrequest = Invoke-RestMethod  -Uri $URLscRl  -Method Post -Headers $authToken -Body $bJSON -ContentType "application/json"
        
        # view results
        $newsgrrequest | ConvertTo-Json -Depth 6
        Write-Host "Created Security Group Rule",$newsgrrequest.security_group_rule.id

    }
    catch 
    {
        # error handling
        $ErrorMessage = $_.Exception.Message
        Write-Host "Problem found! Hope this helps:"
        Write-Host $ErrorMessage -ForegroundColor Red

    } 
    {% endcodeblock %}

    If you got errors, it's likely an invalid Security Group ID.
    Feel free to run the above code multiple times as it will randomly create rules in any existing Security Groups you have.  Yes, they will be the same since it's unique by ID.
    Let's see the mess you've done…
    
 * List Security Group Rules 

    {% codeblock lang:powershell %}
    # List security-group-rules
    $lstSecGroupRules = Invoke-RestMethod -Uri $URLscRl -Method GET -Headers $authToken  -ContentType application/json
    $lstSecGroupRules.security_group_rules | ConvertTo-Json -Depth 6
    {% endcodeblock %}
    
    A bit untidy, so you probably just want to see 

    * Show Security Group Rules 

    A specific Security Group Rule ID

    {% codeblock lang:powershell %}
    # show security-group-rules per Security Group Rule Id
    $URLscRlId = "$URLscRl"+"/"+$newsgrrequest.security_group_rule.id #re-using this var because I know it exists in this demo
    $showSecGroupRuleId = Invoke-RestMethod -Uri $URLscRlId -Method GET -Headers $authToken  -ContentType application/json
    $showSecGroupRuleId | ConvertTo-Json -Depth 6 
    {% endcodeblock %}

    Or all the Security Group Rules on a specific Security Group ID

    {% codeblock lang:powershell %}
    # use random again to make sure it exists
    $URLscIdrnd = $URLsc + "/" + $randomgroupid.id
    # show security-group-rules per Security Group Id
    $showSecGroupIdRules = Invoke-RestMethod -Uri $URLscIdrnd -Method GET -Headers $authToken  -ContentType application/json
    $showSecGroupIdRules.security_group | ConvertTo-Json -Depth 6 
    {% endcodeblock %}

    Now, we're getting to the stage of deleting rules.

 * Delete Security Group Rules 

    You can't change existing rules, so you might as well delete and recreate, if needed.

    {% codeblock lang:powershell %}
    #	Delete your Security Group Rule per Rule ID
    try{
        Invoke-RestMethod -Uri $URLscRlId -Method DELETE -Headers $authToken  -ContentType application/json
    }
    catch 
    {
        # error handling
        $ErrorMessage = $_.Exception.Message
        Write-Host "Problem found! Hope this helps:"
        Write-Host $ErrorMessage -ForegroundColor Red

    } 
    {% endcodeblock %}

    If there's errors, it's likely because it's already been deleted.
    A final exercise is if you want to remove all the Security Group Rules in a specific Security Group, but not delete it.
    And sure you can but, remember to not do this in Production (!!! )since your Cloud Servers would lose all the protection you've spent so many hours (minutes/ seconds) creating:

    {% codeblock lang:powershell %}
    # Delete all rules within a specific Security Group
    $showSecGroupIdRules = Invoke-RestMethod -Uri $URLscIdrnd -Method GET -Headers $authToken  -ContentType application/json
    $noRules=0  # I like to count 
    foreach ($ruleID in $showSecGroupIdRules.security_group.security_group_rules){
        $noRules++
        $URLscRlIdTodelete = $URLscRl+"/"+$ruleID.ID
        Invoke-RestMethod -Uri $URLscRlIdTodelete -Method DELETE -Headers $authToken  -ContentType application/json
    write-host "Deleted Rule ID",$ruleID.ID 

    }
    write-host "Deleted $noRules rules" 
    {% endcodeblock %}

And now, farewell. (Already?)
Thank you for reading and demoing this feature with me.

For clean-up, run:

{% codeblock lang:powershell %}
# delete all Security Groups created in this demo (actually ALL of them) 
# So be careful!
$lstSecGroups = Invoke-RestMethod -Uri "$CloudNetworkURI/security-groups" -Method GET -Headers $authToken  -ContentType application/json
foreach ($groupID in $lstSecGroups.security_groups){
    $URLscIdTodelete = $URLsc+"/"+$groupID.ID
    Invoke-RestMethod -Uri $URLscIdTodelete -Method DELETE -Headers $authToken  -ContentType application/json
    write-host "Deleted Security Group Name",$groupID.Name
} 
{% endcodeblock %}


_You don't have any security groups yet.
Create one now._


You should now be equipped to script and dev your own version of the above features on the Rackspace Cloud Security Groups feature. This will make your Cloud Servers much more secure while making you feel good about your scripting skills. 
No more curl for you! After all, you're not a browser, right?

Eager to try more?
Think you can code better? Hope so! 
Check out our API dev guide with all the details:
(https://developer.rackspace.com/docs/cloud-networks/v2/developer-guide/#document-api-operations/sec-group-operations)
 
Thanks,
Jose Da Silva
