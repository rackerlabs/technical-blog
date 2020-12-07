---
layout: post
title: "Accelerating your IoT journey on AWS"
date: 2020-11-30
comments: true
author: Matt Charoenrath
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-U0118EALE77-fa48a7c11b02-72'
bio: "Marketing leader experienced in growing brands while scaling and 
modernizing marketing organizations through a balance of creativity, 
process & technology to captivate audiences and achieve results."
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "Accelerating your IoT journey on AWS"
metaDescription: "This post shares tips on how to approach IoT projects 
holistically and get them off the ground in weeks, not months or years."
ogTitle: "Accelerating your IoT journey on AWS"
ogDescription: "This post shares tips on how to approach IoT projects 
holistically and get them off the ground in weeks, not months or years."
slug: "accelerating-your-iot-journey-on-aws"
canonical: https://onica.com/blog/iot/accelerating-your-iot-journey-on-aws/

---

*Originally published in June 2019 at Onica.com/blog*

If you have been thinking about launching your *Internet of Things* (IoT) project 
but haven’t got it off the ground yet, this post shares tips on how to approach IoT projects 
holistically and get them off the ground in weeks, not months or years. 

<!--more-->

In this post, AWS&reg; Solutions Architect, Jonathan Shapiro-Ward, and Rackspace Onica’s Vice President of 
Solutions Development, Eric Miller, explore how to design, deploy, and manage your 
IoT solution at scale and share how AWS IoT services can help accelerate your IoT success.

### How to accelerate your IoT journey 

IoT stirs up a lot of conversations around technology in terms of 
its use cases and how to create new revenue streams. Both households and the workplace 
are adopting IoT as a common resource, and we can see elements of this in the Amazon ecosystem 
with services like Amazon Alexa&reg;. IoT allows us to obtain information to make better decisions 
and improve overall efficiency with resource usage. 

#### Solving your customers’ problems with IoT 

A critical thing to note is that nobody just buys IoT technology. Most of the time, 
the [device](https://onica.com/services/iot-devices/) a business needs might not exist since 
there are too many permutations when seeking a specific business outcome. Some ideas to start 
thinking about are how to optimize the decision-making process. 

It is important to identify your customers and stakeholders to determine how to 
potentially use IoT to solve their problems. IoT solutions can be complex since they 
include a physical element, which is typically not present in the current landscape of 
virtual technology. There is an element of hybrid connectivity with the physical aspects 
of IoT that connects devices and sensors through a pipeline to the decision-making process 
that facilitates the [data](https://onica.com/innovate-data/). In this respect, there are 
several moving parts that enable customers to see strong outcomes, which allows them 
to build, improve, and innovate. 

So, how can we make this process faster for our customers? At Onica, a Rackspace company, 
the solution is a prototyping board that helps customers get to their desired state faster. 
Accelerating development while reducing costs, our IoT accelerators offer hardware, 
software, and customized services for your business. All of our IoT accelerators use 
AWS IoT services to help businesses leverage the cloud in the most efficient way possible. 

### AWS IoT services

AWS IoT provides device software and services that enable you to gather extensive data 
so that you can build IoT solutions for virtually any use case. With the following services, 
you can control and manage your devices, helping you extract the most value from your IoT data. 

+ **AWS IoT Core** is a managed service that lets connected devices easily and securely interact 
with cloud applications and other devices. It handles all of the IoT data and makes it effective 
and usable. It acts as the message broker, connecting devices to HTTP, websocket, 
or MQTT, a myriad of protocols, and routing messages from them to other AWS services. 
With AWS IoT Core, you can have a device registry and understand exactly where all your devices are, 
how they are being used, and leverage it as the basis for a security model to secure these devices. 
Rackspace Onica uses AWS IoT Core as a cloud-based IoT gateway solution.

+ **AWS IoT Analytics** is a service that processes, enriches, stores, analyzes, and visualizes IoT data 
for manufacturers and enterprises. While AWS IoT Core can handle billions of devices and messages, 
AWS IoT Analytics operates at that scale to process the repository of data. In addition, 
it allows you to obtain insight and make meaningful business decisions rapidly within a bounded timeframe. 

+ **AWS IoT Greengrass** is a low-powered, low-cost service built to allow you to deploy 
on your local edge devices. You can send messages from [AWS IoT Greengrass](https://onica.com/videos/what-is-aws-greengrass/)
devices to AWS for processing. [AWS IoT Greengrass](https://onica.com/videos/what-is-aws-greengrass/) 
devices can act locally on the data they generate so they can respond quickly to local events, 
while still using the cloud for management, analytics, and durable storage. It lets connected devices 
operate even with intermittent connectivity to the cloud. AWS IoT Greengrass authenticates and encrypts 
device data for both local and cloud communications so that data is never exchanged between devices and 
the cloud without a proven identity. 

+ **Amazon FreeRTOS** is an open-source microcontroller operating system that makes small low-power edge devices 
easy to program and manage. Its software libraries make it easy to securely connect small low-power devices 
to AWS cloud services like AWS IoT Core or AWS IoT Greengrass so you can easily collect data for IoT applications.

+ **AWS IoT Events** enables you to monitor devices and equipment for any changes in operations and tracks 
IoT sensor data from devices and AWS services. [AWS IoT Events](https://onica.com/blog/bringing-iot-to-life-faster-with-aws-iot-events/) notifies you from multiple sensors on remote devices and 
can diagnose the exact problem, helping lower your overall maintenance costs. 

With these services in mind, it’s important to note that [data](https://onica.com/innovate-data/) is 
the currency of successful IoT solutions. It’s what comes in, what goes out, and what monetizes and 
creates new revenue streams. So, what do AWS IoT solutions look like for customers?

### IoT solutions

While nobody buys IoT, the underlying reason why they get into IoT is [data](https://onica.com/innovate-data/). 
It’s a bit more of a journey than most companies realize to take a device or an idea or a product or a service 
and get it to a point where it is fully connected end-to-end. Here are five subject matter domains that customers 
need to be successful in to really knock their IoT projects out of the park. 

1. **Devices and sensors** 

Devices and sensors are critical firmware supported that connect securely to the cloud using technologies 
such as MQ Telemetry Transport (MQTT) and certification authentication with IoT Core on AWS.  Most product and services companies 
don’t have an IoT competency inside their business, so they are rarely going to find the perfect device 
off-the-shelf to solve their problems. For that reason, a business needs to commit itself to developing a 
custom solution on the sensor side. At Onica, we’re able to take what we have learned in the development environment
and put together a first-class purpose-built [circuit board](https://onica.com/services/iot-devices/) 
that has the components a customer needs to deliver the functionality they’re trying to achieve.

2. **Connectivity and infrastructure** 

Connectivity and infrastructure are also essential because every connected device needs some type of 
connectivity, whether that’s **BTLE** or **Wi-Fi**, and so on. Therefore, you should consider what to do with 
the [data](https://onica.com/innovate-data/) after you transfer it to the cloud. That could include the need 
to train a machine learning model to produce analytics and insights from that data. Here at Onica, we write 
custom firmware that can intelligently switch between the different connectivity types that are available, 
depending on the use case, signal strength, and favoring lower cost over higher cost when available.

3. **Applications** 

Applications are handy when the data is in the cloud and needs a third party API integration, 
web applications, portals, dashboards, or mobile applications to sit on top of that data and expose it 
in a useful way to the customers and users. You should put the web application or dashboard on top of 
the API gateway to provide visualization and ways to use the data for the user’s mobile applications. 
These things can greatly increase the complexity and the amount of effort necessary to build
an [end-to-end IoT solution](https://onica.com/services/iot-devices/).

4. **Analytics and insights**

[Data analytics](https://onica.com/innovate-data/) are useful since IoT applications generate a lot of 
data–otherwise known as *data currency*. It’s important to store as much data as you can using inexpensive, 
object-based storage similar to Amazon S3, data lakes for IoT, and so on if you want to automate your ETL process 
and your analysis pipelines. This is functionality that’s baked first-class into the AWS analytics pipeline and 
AWS IoT Core. By doing so, you can avoid schema lock-in and use machine learning to gain new insights. 

5. **Change management**

The human element of an IoT project plays a critical role in change management. An example of an interesting 
problem is one Onica solved for a chemical dispensing company. This company has hundreds of different customers 
all over a metropolitan area and delivers dozens of different types of chemicals to each one. In this case, 
machine learning helped map the shortest possible delivery routes for optimization. By filling its sensors 
with the IoT Cloud platform, it could monitor the fill level of the tanks and report them to the cloud. After building 
a human-readable application or a map on a mobile application, a driver could then log in and see their route for 
the day to efficiently fill the empty tanks.

### Leveraging IoT partners for success

An IoT partner can take all five of these components that customers need and wrap them up with professional services. 
In many cases, a partner supports businesses as needed and applies its services more heavily in areas that 
need more expertise. When it comes to IoT and the infrastructure behind IoT in the [big data space](https://onica.com/innovate-data/),
serverless space, and in other areas, you can depend on IoT partners who have handled 
a vast magnitude of customers, ranging from different scenarios and challenges. At Rackspace Onica, we leverage 
our years of experience, breadth of customer solutions, and AWS expertise to help solve our customer’s toughest business challenges.

For more information on how to accelerate your IoT journey on AWS [get in touch with us today](https://onica.com/contact/!

<a class="cta blue" id="cta" href="https://www.rackspace.com/onica">Learn more about our AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
