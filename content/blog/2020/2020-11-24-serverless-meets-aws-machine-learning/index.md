---
layout: post
title: "Serverless meets AWS machine learning: Improving business outcomes with Amazon Comprehend and Amazon Rekognition"
date: 2020-11-24
comments: true
author: Irina Geiman
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "Serverless meets AWS machine learning: Improving business outcomes with Amazon Comprehend and Amazon Rekognition"
metaDescription: "In this post, I take a closer look at the business requirements of the
owner of my imaginary nail polish salon. As the business owner, I want to drive
value to my business from the data that was previously unavailable or not
fully processed and analyzed."
ogTitle: "Serverless meets AWS machine learning: Improving business outcomes with Amazon Comprehend and Amazon Rekognition"
ogDescription: "In this post, I take a closer look at the business requirements of the
owner of my imaginary nail polish salon. As the business owner, I want to drive
value to my business from the data that was previously unavailable or not
fully processed and analyzed."
slug: "serverless-meets-aws-machine-learning"
canonical: https://onica.com/blog/serverless/serverless-meets-aws-machine-learning-improving-business-outcomes-with-amazon-comprehend-and-amazon-rekognition/

---

In the [first blog post](https://docs.rackspace.com/blog/lamp-stack-evolution-from-virtual-machines-to-serverless/)
in this series, I presented several architectural patterns that I considered to implement a simple website
for showcasing images of nail polish designs for my imaginary nail polish salon. Among the approaches
presented, the two serverless architectures with static website hosting were close runners that both allowed me
to build a high performing and highly scalable solution that is quick to provision and easy to manage.

<!--more-->

Ultimately, I decided in favour of AWS&reg; Amplify&reg; with AWS
AppSync due to the built-in support for web and mobile applications and
the speed of full-stack development provided by the AWS Amplify ecosystem.

In this post, I take a closer look at the business requirements of the
owner of my imaginary nail polish salon. As the business owner, I want to drive
value to my business from the data that was previously unavailable or not
fully processed and analyzed. Moreover, I want my employees (designers) to
spend their time in a creative and efficient way, working on new designs, and
serving the customers without distractions. Therefore, I would like to
automate the mundane tasks of site moderation and processing customer
feedback. I need a reliable and objective way to evaluate the designs, the
satisfaction level of my customers, and the performance of my employees and
my business as a whole. As a business owner, I am looking for help in
answering the following questions:

- Is my customer base growing?
- Are there any customer concerns that require immediate escalation and my involvement?
- What designs are *hot* this season?
- Which designers are doing an exceptional job?
- What is the customer satisfaction trend? Do we improve over time?

We can answer all these questions through the AWS machine learning and data
analytics services featured in the following design diagram:

{{<img src="aws-serverless-1.png" title="" alt="">}}

### Adding a new image&mdash;auto-moderation flow

I want to automate the site moderation task as much as possible. Hiring
moderators or having my current employees do the routine task of reviewing
uploaded images and filtering out inappropriate ones might have a negative
impact on the designers’ productivity and my budget. On the other hand,
inappropriate content, uploaded either by mistake or deliberately, can cause
irreparable damage to the reputation of my business. Thus, every picture
should go through filters, and the system should notify me in case of attempted abuse.

The following flow below uses an AWS machine learning service, Amazon&reg;
Rekognition&reg;, which uses a pre-trained image identification model to identify
objects featured in images. The outcome of an image upload depends on the
objects that are auto-identified in the image. If one of the labels returned
by Amazon Rekognition is `manicure`, the image processes successfully.
In case there is no `manicure` label, the system doesn't send the image metadata
to Amazon DynamoDB&reg;, and thus the image is not visible to the customers.

If someone tries to upload moderated content, the business owners gets a notification
(by email or SMS) with the offender's identity. Because all users must be authenticated to
upload images, INcan easily obtain the origin of the upload attempt.

Here is an example of an Amazon ElasticSearch&reg; entry with the labels that Amazon
Rekognition assigned to a legitimate image featuring a nail polish design.

{{<img src="aws-serverless-2.png" title="" alt="">}}

{{<img src="aws-serverless-3.png" title="" alt="">}}

Following is the full auto-moderation flow:

1. The client uses an AWS AppSync subscription to subscribe to notifications for
   an album the user is browsing.
2. The image uploads to the bucket corresponding to the designer’s album.
3. AWS Lambda triggers when an image uploads through an object-upload event.
4. AWS Lambda sends the image to Amazon Rekognition for processing, including automatic
   labeling and moderated content identification.
5. The administrators receive a moderated content notification from Amazon Simple
   Notification Services (SNS) if an image contains moderated content.
6. If no moderated content exists and labels contain the `manicure` label,
   AWS Lambda sends a mutation to AWS AppSync endpoint, which results in the system
   updating the Amazon DynamoDB Photos table with the image’s metadata.
7. The addition of the image's metadata to the Amazon DynamoDB Photos table causes DynamoDB Streams
   to trigger AWS Lambda.
8. AWS Lambda sends photo metadata along with labels added by Amazon
   Rekognition to Amazon ElasticSearch.
9. The system sends a notification to the client application through WebSocket, and the image
   is visible in the album. You don't need to refresh the page.

As a result, you don't need to manually review the images. If we consider the
business's potential growth, different time zones, and possibly hundreds
of designs generated daily, the business value of automatic moderation of
image uploads becomes obvious.

### Comments processing&mdash;sentiments analysis

With auto-moderation out of the way, I can now focus on the business
value that I can derive from the customer comments.
After all, a manicure is an emotionally-loaded business, and if I
can't react to issues raised by customers in a timely manner, I might
suffer substantial financial losses.

On the other hand, having a moderator reading through all user comments in
different languages and different time zones looks like a very inefficient
approach. Also, for a bird’s-eye view of the business, I might not be
interested in the actual wording of the comments, but rather in the customers'
sentiment in response to the service they got or the designs that they see.

Amazon Comprehend provides me with a perfect solution. It can report the
predominant sentiment expressed in the comment, the probability of the
determined sentiment, and it can do so for six different
languages. Because only registered users can comment on the designs, I can
reach out to a very dissatisfied customer and ask how we can make things
better. The escalation can happen automatically in a matter of seconds
following a negative comment post.

{{<img src="aws-serverless-4.png" title="" alt="">}}

Following is the detailed description of the comment processing flow:

1. The client application subscribes to a mutation.
2. The user authenticates with Amazon Cognito&reg;.
3. The user submits a comment through AWS AppSync endpoint.
4. AWS AppSync stores the comment in an Amazon DynamoDB table.
5. Amazon DynamoDB Streams triggers AWS Lambda.
6. AWS Lambda sends the comment to Amazon Comprehend for sentiment analysis.
7. AWS Lambda notifies AWS AppSync endpoint.
8. AWS Lambda stores the comment along with the determined sentiment in Amazon ElasticSearch.
9. The system triggers the client subscription and updates the design’s HappinessMeter.

Here is a video of the comment processing flow in action:

<p><a href="https://onica.com?wvideo=0d7iciahno"><img src="https://embed-fastly.wistia.com/deliveries/4db079254166449ba179068128505158dfa16a1d.jpg?image_play_button_size=2x&amp;image_crop_resized=960x600&amp;image_play_button=1&amp;image_play_button_color=54bbffe0" width="400" height="250" style="width: 400px; height: 250px;"></a></p><p><a href="https://onica.com?wvideo=0d7iciahno">Onica blog_Comments processing and sentiments analysis with Amazon Comprehend</a></p>

THe following Amazon Rekognition example shows the analysis of comments *I like it*
and *I do not like it*.

{{<img src="aws-serverless-5.png" title="" alt="">}}

### Data analytics - Actionable insights

The data collected in Amazon ElasticSearch as a result of the comments and
image processing provides me with inputs I needed to answer the questions
asked at the beginning of this post. I can follow the trend of the
comments’ average *positivity* level over time to see how my customer base
feels about the services provided.

{{<img src="aws-serverless-6.png" title="" alt="">}}

Sentiment distribution is an important indicator. The percentage of our
customer base that is satisfied with the service is a barometer of the
business's general health. We can easily find ourselves in a situation
where the customer satisfaction trend is positive, yet the overall
satisfaction is still dangerously low.

{{<img src="aws-serverless-7.png" title="" alt="">}}

The designer's average positivity level provides an easy and objective way to
evaluate my employees' performance and identify outstanding designers and
those needing improvement.

Looking at the designs with the highest number of positive reviews tells
me what is in demand and how I should restock my nail polish materials. In
addition, I can set alerts and send notifications in case there is a certain
amount of negative reviews posted over a short period of time, indicating a
problem with the business performance that requires my urgent attention.

### Conclusion

Small businesses can derive substantial advantages from using AWS high-level machine learning
services to help save money by automating routine manual tasks and improving
business outcomes by processing and quantifying textual feedback provided by
customers and turning it into actionable items.

<a class="cta red" id="cta" href="https://www.rackspace.com/onica">Learn more about our cloud migration services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
