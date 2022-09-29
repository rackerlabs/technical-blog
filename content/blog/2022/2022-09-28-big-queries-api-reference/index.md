---
layout: post
title: "BigQuery APIs Reference"
date: 2022-09-28
comments: true
author: Rahul Chatterjee
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - Data
    - BigQuery
metaTitle: "BigQuery APIs Reference"
metaDescription: "BigQuery is an application that enables fully managed data warehouse that operates without any serverless architecture."
ogTitle: "BigQuery APIs Reference"
ogDescription: "BigQuery is an application that enables fully managed data warehouse that operates without any serverless architecture."
slug: "bigquery-apis-reference"

---
Let us start with the definition first :

BigQuery is an application that enables fully managed data warehouse that operates without any serverless architecture.In fact,the BigQuery enables analysis of petabytes of data at once and makes the aspect of data analysis easier. BigQuery has features, which helps in maintaining impeccable stance on the analysis of data with the help of geospacial analysis, business intelligence and machine learning features.


<!--more-->

If anyone wants to know about it in details, here is the [link](https://cloud.google.com/bigquery/docs) 

But during my time in Rackspace, where I encountered some of the use cases in my project by which maybe I have forgotten the official “definition”, but I will remember the actual use of this.

### So where we can use BigQuery –
-	If in the legacy system any query running for long and as the data grow over time so the execution time of the query. So definitely it will enhance the performance.
-	When you need to scale up your legacy server(SQL Server, Postgres, Oracle, etc.). so you can use BigQuery to reduce the load of your relational databases.
Those two things I learned in terms of our project perspective and this list will continue.

**Let's see what are options we can explore in terms of querying the data outside the GCP environment.**

There are three methods to do that.
1.	REST API
2.	Python BigQuery Library
3.	ODBC and JDBC Driver for BigQuery

**“Intelligence is the ability to adapt to change.” – Stephen Hawking**

### REST API Method
This is a very popular method and the main advantage of this method is, you don’t need to give admin/owner level access.

Let's see it’s implementation and testing. We need only postman application for the testing.

**Create OAuth Credentials**

We will use Google uses OAuth 2.0 protocol for authentication and authorization. You will need a valid or approved key to access to the system and send requests to the BigQuery streaming endpoints. We need to avail the OAuth authorization framework 2.0 and retrieve the credentials of the client from the Google Cloud API.

Login to GCP console and after that navigate to APIs & Services. Then enable the BigQuery API.
<img src=Picture1.png title="" alt="">

Then go to “Credential” option and Create an OAuth 2.0 Client IDs

<img src=Picture2.png title="" alt="">

Please see the below configuration.

<img src=Picture3.png title="" alt="">

[Source URL](https://bigquery.googleapis.com)

This will create OAuth ID. Save these credentials (JSON) in your machine. We will use these credentials in Postman to generate a token for every request to the BigQuery streaming API.

Now our task is done in GCP Console. Let's open the Postman application

**Generating Token in Postman**

In the authorization section, click on “type” and select OAuth 2.0

<img src=Picture4.png title="" alt="">

Now Configure the following parameters: 

- Token Name: Any
- Grant Type: Authorization Code
- Callback URL: https://bigquery.googleapis.com
- Auth URL: https://accounts.google.com/o/oauth2/auth
- Access Token URL: https://oauth2.googleapis.com/token
- Client ID: Copy Google cloud OAuth credentials from GCP console or from the json file downloaded from the OAuth console.
- Client Secret: Copy from Google cloud OAuth credentials console or from the json file downloaded from the OAuth console.
- Scope: https://www.googleapis.com/auth/bigquery
- Client Authentication: Send client credentials in body

<img src=Picture5.png title="" alt="">

Then click the “Get New Access Token”

This will take you to Google cloud console page for login and authentication. Enter your credentials. An access token will be generated and you will be redirected to the Postman. Click on “use token”
<img src=Picture6.png title="" alt="">

Navigate to “Headers” section and enter “Content-Type” in Key and “application/json” in Value.

<img src=Picture7.png title="" alt="">

Navigate to “Body” section and enter the JSON request body. You will construct the body with the data to be sent to BigQuery.

<img src=Picture8.png title="" alt="">

Result in BigQuery

<img src=Picture9.png title="" alt="">

Now Let’s talk about method 2:

### Python BigQuery Library:

**Prerequisite – Before setting the environment you need to install the following package in the python environment.**

`pip install --upgrade google-cloud-bigquery`

First step is set up authentication to run client library.One way to do that is to create a service account and set an environment variable.
1.	In the cloud console, navigate to the “Create service account” page In the GCP Console option , go to the Create service account page.
2.	Select the project on which you are working.
3.	Enter a logical name in the Service account name field. Basically the Service account ID field is populated by Google Cloud Console.
4.	There will a field named “service account description”, enter your required description there. 
5.	For example, “Service account”.
6.	Then click Create and continue.
7.	We need to provide access to the project. So, you need to grant the following role(s) to the mentioned “service account” such as Project > Owner.
8.	There will be a field named “select a role”, you can carry out your selection of roles from there. 
9.	For adding roles to the list, click on “Add another role”.
10.	Click “Done” button to finish creating the service account.
11.	Do not hit the close button of your Browser’s window, we will be needing this in the next step. Now create a “Service account key”

**Create a service account key:**

1.	Now go to the GCP console and select email address that you registered for service account you created. 
2.	Click on “keys”, then “add key” and then select the “Create new key” option.
3.	Now select the “create” option and this will lead to the download of JSON key file in your computer or local machine. 
4.	Click Close.

You can store this key in GCS Bucket or Passwordsafe Project. It will be needed for authentication.

For Example :
<img src=Picture10.png title="" alt="">

I created one table in BigQuery for testing

<img src=Picture11.png title="" alt="">

Now please find the below python code for reference.

<img src=Picture12.png title="" alt="">

Result :

<img src=Picture13.png title="" alt="">

### Pros and Cons of Three Methods

**REST API –** 
- Pros : For this method ,no service account is needed,only need to create bigquery client no need to share the JSON Key
- Cons – Dynamically created token only last for 1 hour.

**Python Client –** 
- Pros - For any any application which will running for long and done CRUD Operation it can be used  
- Cons – For this service account is needed and “Owner Access” need to give there.

### Conclusion: 

Those methods have their pros and cons, and it is perfectly synchronized with their use cases.

### JDBC and ODBC Driver

This discussion out of this scope, as this method mainly using to connect any application like Tableau,QlikSense etc to BigQuery.

For more information on writing and citing sources, explore the following resources: 


<a class="cta purple" id="cta" href="https://www.rackspace.com/cloud/google-cloud">Learn about Rackspace Managed Google Cloud Applications.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).