---
layout: post
title: "How to create a dynamic DNS with the AWS API and Route 53"
date: 2021-01-21
comments: true
author: Rackspace Onica Team
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "How to create a dynamic DNS with the AWS API and Route 53"
metaDescription: "One of the least used capabilities of API Gateway is the ability to call the AWS API
directly, effectively turning an API Gateway HTTP request into an AWS API request."
ogTitle: "How to create a dynamic DNS with the AWS API and Route 53"
ogDescription: "One of the least used capabilities of API Gateway is the ability to call the AWS API
directly, effectively turning an API Gateway HTTP request into an AWS API request."
slug: "how-to-create-a-dynamic-dns-with-the-aws-api-and-route-53"

---

*Originally published in February 2017, at Onica.com/blog*

A few of our cloud engineers were chatting about making a Dynamic DNS
on Amazon Web Services&reg; (AWS) for some personal projects. As we got to talking, I
realized that although Lambda&reg; was the go-to technology, it’s not needed. 

<!--more-->

### Creating an AWS Route 53 Dynamic DNS (with API Gateway in place of Lambda)

One of the least used capabilities of API Gateway is the ability to call the AWS API
directly, effectively turning an API Gateway HTTP request into an AWS API request.

You certainly wouldn’t want to give the world access to your AWS account, so
we're making sure to keep the system locked down. However, as this walkthrough shows,
you do not need Lambda to create a simple Dynamic DNS in Route 53&reg;.

Our example assumes you already have a domain hosted in Route 53 and uses
**acme.local** as the domain name.

### Step 1: Create your API Gateway and resource

Create your API Gateway and give it a description. I called mine, **DynamicDNS**.
Create the resource: `{zone_id}`. For this exercise, I’m using a little bit of
*security through obscurity* by requiring the Route 53 Zone Id in the URL path.
I use the `https://api_gw_url/route53_zone_id` as the URL for updating.

### Step 2: Create the method

I want the simplest HTTP request possible because I want to be able to use this anywhere. So, I create a `GET`
request and map the request to the AWS Service, Route 53. This is where all of the magic happens.

Perform the following steps:

1. Create a GET request for the `/{zone_id}` resource.
2. Set it to `AWS Service`.
3. Set the **Region** to whatever you want. I used `us-west-2`, but it doesn’t matter with Route53.
4. Set the **service** to `Route 53`.
5. Leave the **AWS Subdomain** blank.
6. Set the **HTTP Method** to `POST`. This is the method that the AWS service API expects. You can read
   more about it here: [Change Resource Record Rates](https://docs.aws.amazon.com/Route53/latest/APIReference/API_ChangeResourceRecordSets.html).
7. You need to use a custom path to use the `{zone_id}` variable, so set **Action Type** to `Use path override`.
8. Reading the API docs linked in step 6, you can see you need to ultimately use the path `/2013-04-01/hostedzone/<Id>/rrset/`,
   so set the Path Override to: `/2013-04-01/hostedzone/{hosted_zone_id}/rrset/`. I explain why I used
   `{hosted_zone_id}` instead of `{zone_id}` a bit further down in this post.
9. Give it an IAM role. The IAM role needs the following trust relationship and role:

#### Trust relationship

    {
     "Version": "2012-10-17",
     "Statement": [
        {
         "Sid": "",
         "Effect": "Allow",
         "Principal": {
            "Service": "apigateway.amazonaws.com"
         },
         "Action": "sts:AssumeRole"
        }
     ]
    }

#### Role

    {
     "Version": "2012-10-17",
     "Statement": [
        {
         "Sid": "Stmt1487876360000",
         "Effect": "Allow",
         "Action": [
            "route53:ChangeResourceRecordSets"
         ],
         "Resource": [
            "arn:aws:route53:::hostedzone/Z1BZA5RDXLSXJ1"
         ]
        }
     ]
    }

**Note**: Make sure to change the actual Zone ID above, replacing `Z1BZA5RDXLSXJ1` with your Zone ID.

### Step 3: Configure body mapping templates

You still have more work to do with the method because it does not send the Route 53 API any actual data.

1. Click on the `GET` Method on the left panel under **Resources**.
2. Click on the **Integration Request** header.
3. Scroll down to **Body Mapping Templates** and expand it.
4. Change the **Request body passthrough** to `Never`. This prevents any data from passing into the
   AWS API. This is the single most important thing you can do to secure your AWS account for this
   exercise, as I discuss later.
5. Create a template for **application/json**. I created this because **application/json** is the default
   **Content Type** for API Gateway. If you do not specify this, a standard cURL request does not have a
   content type and fails.
6. In the text box near the bottom, insert your XML payload for the Route 53 API `POST` call:

        <ChangeResourceRecordSetsRequest xmlns="https://route53.amazonaws.com/doc/2013-04-01/">
            <ChangeBatch>
                <Changes>
                    <Change>
                        <Action>UPSERT</Action>
                        <ResourceRecordSet>
                            <Name>myddns.acme.local</Name>
                            <Type>A</Type>
                            <TTL>60</TTL>
                            <ResourceRecords>
                                <ResourceRecord>
                                    <Value>$context.identity.sourceIp</Value>
                                </ResourceRecord>
                            </ResourceRecords>
                        </ResourceRecordSet>
                    </Change>
                </Changes>
            </ChangeBatch>
        </ChangeResourceRecordSetsRequest>

**Note**: You need to change the name of the record you want to update. As
stated previously, I used **acme.local** for this article. I selected **myddns**
as the record to create or update.

The magic of the dynamic DNS system happens on the \<Value\> line, where
`$context.identity.sourceIp` is mapped to the client’s IP address,
updating the DNS record with whatever client or external IP address API Gateway
sees.

Setting the **Request body passthrough** and security to `Never` is the best
thing you can do for securing your AWS Service proxy. It’s not as big of a
requirement with a `GET` method like we’ve created because the `GET` operation does not
allow for payloads. But suppose you create a `POST` or `PUT` method (both allow body
data to be passed in) and select the top option **When no template matches the request
Content-Type header**. If someone were to `POST` to your API Gateway URL with a
`Content-Type` you did not specify, such as **application/scriptkiddie**, their
entire payload would be passed on to the AWS Service so that the XML can override
yours. Setting it to **Never** forces the payload to be the only one delivered to
the AWS API.

### Step 4: Use the right content-type for the API call

When you make a request to API Gateway, the Content Type you specify gets passed
through to the Integration (in this case, our Integration is the Route 53 API).
If you do not specify a Content Type, API Gateway sets your **Content-Type**
header to `application/json`. This is a problem because we need to post to the Route 53
API as `application/xml`. So, hardcode that in the HTTP Headers in the following steps:

1. Expand the **HTTP Headers** section above **Body Mapping Templates**.
2. Create a new HTTP Header.
3. Set **Name** to: `Content-Type`.
4. Set **Mapped from** to: `'application/xml'`. **Note:** Single apostrophees are required.

*Creating the HTTP Header with the apostrophes*

*HTTP Header created with the apostrophes*

### Step 5: Configure {zone_id}

Remember how you created the `/{zone_id}` resource in step 1? Well, now you can
configure it. Because I don’t like to use the same variable name for two different
services, I converted `{zone_id}` to `{hosted_zone_id}`:

1. Expand the **URL Path Parameters** section.
2. Create a new path with the **Name** of `hosted_zone_id`.
3. Set **Mapped from** to: `method.request.path.zone_id.` This is where we use `zone_id` from the original
   resource path and map it to `{hosted_zone_id}` in the **Path override** setting.

### Step 6: Deploy

At this point, you can deploy your newly configured API Gateway. I used a stage called **ddns**, but you can
call it whatever you like.

You might think, “Hey, shouldn’t we test this first?” While API Gateway has a great test feature, the test is
not great for us because it sets our caller IP address to a string. That string won't work with DNS because
we’re setting a record. So, we have to rely on cURL to tell us if it works or not. Remember, you need your
Zone ID from Route 53 to update DNS. The URL format is similar to the following example:

    **https://your_api_gw_url/stage_name/zone_id**

For my system, it ended up being:

    **https://c3y150djkh.execute-api.us-west-2.amazonaws.com/ddns/ZICXXN1DR8UXO**

On a successful `GET` request, you get a `200` response code with the ChangeInfo response. At this point, your
system is working. You can verify it by waiting up to 60 seconds and then checking your Route 53 console.

### (Optional) Step 7: Secure output

If you do not want to see the output of your Route 53 API call, you can adjust
the data to just be empty:

1. Go to the **GET Method** > **Integration Response**.
2. Expand the **200 Method Response status** line.
3. Expand **Body Mapping Templates**.
4. Click on **application/json**.
5. Select **Empty** from the **Generate template** drop-down menu.
6. Click **Save**.
7. Redeploy your API.

### (Optional) Step 8: Additional security

I won’t go into detail, but you can optionally add additional security by adding an API Key to your method. There’s
[plenty](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) of
[documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-setup-api-key-with-console.html)
on [how to do this](https://www.google.com/search?q=add+api+key+to+api+gateway+method&cad=h). Just remember that you
need to add the `x-api-key header`. Thus, you might end up with a cURL request like the following example:

    curl \
    -H "x-api-key: hzYAVO9Sg98nsNh81M84O2kyXVy6K1xwHD8" \
    'https://c3y150djkh.execute-api.us-west-2.amazonaws.com/ddns/ZICXXN1DR8UXO'

We leave this step as an exercise for you. And in as few as six steps, you’re finished creating an AWS Route 53 Dynamic DNS.

<a class="cta teal" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
