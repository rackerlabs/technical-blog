---
layout: post
title: "Using AWS CLI to find untagged instances"
date: 2021-01-18
comments: true
author: Rackspace Onica Team
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "Using AWS CLI to find untagged instances"
metaDescription: "."
ogTitle: "Using AWS CLI to find untagged instances"
ogDescription: "."
slug: "using-aws-cli-to-find-untagged-instances"

---

Replace with short intro sentence or two.

<!--more-->

### Creating an AWS Route 53 Dynamic DNS (with API Gateway in place of Lambda)

A few of the CorpInfo cloud engineers were chatting about making a Dynamic DNS
on Amazon Web Services (AWS) for some personal projects. As we got to talking I
realized that although Lambda was the go-to technology, it’s not needed. One of
the least used capabilities of API Gateway is the ability to call the AWS API
directly, effectively turning an API Gateway HTTP request into an AWS API
request.

You certainly wouldn’t want to give the world access to your AWS account so
we’ll make sure to keep the system locked down – but as you’ll see in this
walkthrough, you do not need Lambda to create a simple Dynamic DNS in
Route 53.

We’re going to assume you already have a domain hosted in Route 53. For our
example, we’ll use acme.local as the domain name.

### Step 1 – Create your API Gateway and resource

Create your API Gateway and give it a description. I’ve called mine DynamicDNS.
Create the resource: `{zone_id}`. For this exercise, I’m using a little bit of
security through obscurity by requiring the Route 53 Zone Id in the url path.
We’ll use the `https://api_gw_url/route53_zone_id` as the URL for updating.

### Step 2 – Create the Method

For my uses, I want the simplest HTTP request possible as I want to be able to use this anywhere. We’ll create a GET request and map the request to the AWS Service: Route 53. This is where all of the magic happens.

Steps to take:

1. Create a GET request for the `/{zone_id}` resource.
2. Set it to AWS Service.
3. Set the Region to whatever you want (we’ll use us-west-2 but it doesn’t matter with Route53).
4. Set the service to Route 53.
5. Leave the AWS Subdomain blank.
6. Set the HTTP Method to POST. This is the method that the AWS service API is expecting. You can read more about it here: Change Resource Record Rates.
7. We’ll need to use a custom path to use the `{zone_id}` variable, so set Action Type to - Use path override.
8. Reading the API docs linked in step 6, you’ll notice we need to ultimately use the path `/2013-04-01/hostedzone/<Id>/rrset/`, so we’ll set the Path Override to: `/2013-04-01/hostedzone/{hosted_zone_id}/rrset/`. I’ll explain why we used `{hosted_zone_id}` instead of `{zone_id}` a bit further down in this article.
9. Give it an IAM role. I’ve blocked out my IAM role in the screenshot as I don’t want to show our account number, but the IAM role will need the following trust relationship and role:

#### Trust Relationship:
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

#### Role:

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

**Note**: make sure to change the actual Zone ID above. You’ll want to replace `Z1BZA5RDXLSXJ1` with your Zone ID!

### Step 3 – Configure Body Mapping Templates

We still have more work to do with the method as it will not send the Route 53 API any actual data.

1. Click on the GET Method on the left panel under Resources.
2. Click on the Integration Request header.
3. Scroll down to Body Mapping Templates and expand it.
4. Change the Request body passthrough to Never – this will prevent any data from passing into the AWS API. I feel this is the single most important thing you can do to secure your AWS account for this exercise! We’ll discuss this further.
5. Create a template for application/json. The reason we create this is application/json is the default Content Type for API Gateway. If we do not specify this, a standard curl request will not have a content type and therefore will fail.
6. In the text box near the bottom, we’ll insert our XML payload for the Route 53
  API POST call:

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

**Note**: you’ll need to change the name of the record you want to update. As
stated above, we’re using `acme.local` for this article. I selected **myddns**
as the record to create or update.

The magic of the dynamic DNS system happens on the value line:
`$context.identity.sourceIp` when it's mapped to the client’s IP address to
update the DNS record with whatever client or external IP address API Gateway
sees.

Setting the `Request body passthrough` and security to **Never** is the best
thing you can do for securing your AWS Service proxy. It’s not as big of a
requirement with a `GET method` like we’ve created because GET's do not allow for
payloads. But say you create a `POST` or `PUT` method (both allow body data to be
passed in) and selected the top option When no template matches the request
`Content-Type` header. If someone were to POST to your API Gateway URL with a
`Content-Type` you had not specified, eg: application, scriptkiddie, their
entire payload would be passed on to the AWS Service so the XML can override
yours. Setting it to **Never** forces the payload to be the only one delivered to the AWS API.

### Step 4 – Use the right Content-Type for the API Call

When you make a request to API Gateway, the content type you specify gets passed
through to the Integration (in this case, our Integration is the Route 53 API).
If you do not specify a Content Type, API Gateway sets your `Content-Type`
header to application/json. This is a problem as we need to post to the Route 53
API as application/xml! So we’ll hardcode that in the HTTP Headers:

1. Expand the **HTTP Headers** section above **Body Mapping Templates**.
2. Create a new HTTP Header
3. Set **Name** to: **Content-Type**.
4. Set **Mapped from** to: **application/xml**

    Note: Single apostrophe’s are required!

Creating the HTTP Header with the apostrophes

HTTP Header created with the apostrophes

### Step 5 – Configure {zone_id}

Remember in step 1 we created the `/{zone_id}` resource? Well now we’ll
configure it. Since I don’t like to use the same variable name for two different
services, we’ll convert `{zone_id}` to `{hosted_zone_id}`:

1. Expand URL Path Parameters section.
2. Create a new path with the name `hosted_zone_id`.
3. Set the Mapped from to: `method.request.path.zone_id.` This is where we utilize `zone_id` from the original resource path and map it to `{hosted_zone_id}` in the Path override setting.

### Step 6 – Deploy

At this point, you can deploy your newly configured API Gateway. I used a stage called ddns but you can call it whatever you like.

You might think “hey, shouldn’t we test this first?” and while API Gateway has a great test feature, the test is not great for us as it’ll set our caller IP to a string – which will not work with DNS as we’re setting a record. So we’ll have to rely on curl to tell us if we’re working or not. Remember you’ll need your Zone ID from Route 53 to update DNS. The url format is:

**https://your_api_gw_url/stage_name/zone_id**

For my system, it ended up being:

**https://c3y150djkh.execute-api.us-west-2.amazonaws.com/ddns/ZICXXN1DR8UXO**

On a successful GET request, you’ll get a 200 response code as well as the ChangeInfo response. At this point, your system is working. You can verify it by waiting (up to) 60 seconds and then checking your Route 53 console:

### (Optional) Step 7 – Secure output

If you do not want to see the output of your Route 53 API call, you can adjust
the data to just be empty:

1. Go to the **GET Method** > **Integration Response**.
2. Expand the **200 Method Response** status line.
3. Expand **Body Mapping Templates**.
4. Click on **application/json**.
5. Select **Empty** from the **Generate template** pulldown.
6. Click **Save**.
7. Redeploy your API.

### (Optional) Step 8 – Additional Security

While we won’t go into detail, you can optionally add additional security by adding an API Key to your method. There’s plenty of documentation on how to do this. Just remember that you’ll need to add the `x-api-key header`. So you’d end up with a curl request like this:

    curl \
    -H "x-api-key: hzYAVO9Sg98nsNh81M84O2kyXVy6K1xwHD8" \
    'https://c3y150djkh.execute-api.us-west-2.amazonaws.com/ddns/ZICXXN1DR8UXO'
    We’ll leave this step as an exercise for you! And in as few as six steps, you’re finished creating an AWS Route 53 Dynamic DNS.

### Conclusion

Learn more about the other Well-Architected Framework pillars in this series:

- [Operational Excellence](https://docs.rackspace.com/blog/aws-waf-pillar-one-operational-excellence-tools-and-best-practises/)
- Reliability
- Performance Efficiency
- Cost Optimization

<a class="cta blue" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
