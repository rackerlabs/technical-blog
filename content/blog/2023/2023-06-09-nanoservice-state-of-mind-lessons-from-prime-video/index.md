---
layout: post
title: "Nanoservice State of Mind - Lessons from Prime Video"
date: 2023-06-09
comments: true
author: Adam Fanello
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: "Adam Fanello is a Consulting Software Engineer and AWS Solutions Architect with over 34 years of experience. He Specializes in AWS serverless application development and IoT. He currently works at Rackspace Technology"
published: true
authorIsRacker: true
categories:
    - Nanoservices
    - AWS
metaTitle: "Nanoservice State of Mind - Lessons from Prime Video"
metaDescription: "Write code as nanoservices - deploy however you want!"
ogTitle: "Nanoservice State of Mind - Lessons from Prime Video"
ogDescription: "Write code as nanoservices - deploy however you want!"
slug: "nanoservice-state-of-mind-lessons-from-prime-video"
---

Recently there's a bit of controversy that microservice may be a mistake, and monolith are (once again) the way to go. This from a [blog post](https://www.primevideotech.com/video-streaming/scaling-up-the-prime-video-audio-video-monitoring-service-and-reducing-costs-by-90) from the Amazon Prime Video team indicating the great cost reduction they realized by switching from various AWS serverless services into a containerized “monolith”. Fireworks lit up the AWS community! Is the Amazon Prime Video team *really* telling us to dump serverless and microservices?

<!--more-->

# Introduction

<img src=Picture1.png>

A key line from the blog post comes at the beginning of the second paragraph:

```
> Our Video Quality Analysis (VQA) team at Prime Video…

```
They did not turn all of Prime Video into a monolith and throw it all into a single ECS container! Rather, this is *one* team responsible for a relatively small functionality of the overall application. Isn’t that the exact target of a microservice?

```
 Microservices are an architectural and organizational approach to software development where software is composed of small independent services that communicate over well-defined APIs.*These services are owned by small, self-contained teams.*
- https://aws.amazon.com/microservices/
``` 

What we have here is a classic growing pain of greenfield application development. The team broke their functionality down *too far* into deployed [nanoservices](https://techbeacon.com/app-dev-testing/nanoservices-where-they-fit-where-they-dont). When they ran into trouble, they reorganized the way they deploy and brought their functionality back together into a single Video Quality Analysis *microservice*.

  Finding the right balance between deploying a monolith, microservices, and nanoservices is almost impossible to predict upfront when developing new applications. If you are writing a new application, how do you mitigate this unknown?

**How to find balance**
They first key, is to separate your *software* architecture from your *solution* architecture.

**Software** architecture is how developers organize code.

**Solution** architecture is how developers (or DevOps) *deploys* code.

Far too commonly, a stringent solution architecture is defined first. The solution is broken down into microservices from the beginning. Walls are put up between teams, and each team goes to their separate corners and write their software. This is a proven technique and comes from a need to manage large applications and groups of developers. Go ahead and do this for really obviously separate parts of your applications.

But when in doubt, *don’t.*

Putting up walls too early is like premature optimization. Just as you don’t know early on where the most bang-for-your-buck can be found in optimizations, you don’t know yet the best way to deploy your application.
The way to find balance is to **separate the concerns** **of organizing code** and communication, **from deploying code** and communication channels. This is where the *software* architecture comes in:

```
Write everything as nanoservices, but deploy them as a monolith
``` 

<img src=Picture2.png title="" alt="" >

Now that I have your attention, here’s the more nuanced version:

```
 Write everything *you can* as nanoservices, but deploy them *initially* as a monolith *unless you have a clear reason not to.* *As needed, refactor what code is deployed where.*

```

## How to write software independent of deployment

The **software** architecture field is highly mature and based on principles that have evolved for roughly fifty years. In the euphoria of cloud solution architectures, containers, and serverless, the architecture of the software within these solutions have sometimes been overlooked. This approach outline below tries to encapsulate a smorgasbord of software architecture principles:

- [Information Hiding](https://en.wikipedia.org/wiki/Information_hiding), [least knowledge](https://en.wikipedia.org/wiki/Law_of_Demeter), [single responsibility](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html), [high-cohesion and low-coupling](https://medium.com/clarityhub/low-coupling-high-cohesion-3610e35ac4a6), [dependency inversion](https://deviq.com/principles/dependency-inversion-principle), [interface segregation](https://deviq.com/principles/interface-segregation), [Liskov substitution](https://deviq.com/principles/liskov-substitution-principle), [open-closed](https://deviq.com/principles/open-closed-principle), [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns).

This list may be long, and some may recognize all five [SOLID](https://en.wikipedia.org/wiki/SOLID) principles, but they all relate together such that every decision plays a part is satisfying multiple principles.

## Everything Quietly Does One Thing Well

**Hiding Implementation Detail**

Right down to the class level (source file or module), write that class as though it were a nanoservice itself. The public API on that class is always written from the *client’s* point of view. (The client being any other class that uses it.)

For example, take the classic layered architecture [repository classes](https://deviq.com/design-patterns/repository-pattern/). A repository manages a collection of data. The actual source of the data could be anything: a relational database, a NoSQL database, another microservice, or even hardcoded mock data. In true microservice thinking though, the details are hidden away from the clients of this class. As part of this information hiding, the class is named “**Widget** Repository”, not “MySqlWidgetRepository” or “OtherServiceProxyService”. From the perspective of anything using this repository, it’s just the repository for a collection of data and the class and function names reflect that perspective.

### Each Feature Is Independent

Every feature is a use case, and its own independent code module. It's triggered by an event or request, executes one cohesive piece of business logic, and responds if to a request. It can use repositories to manipulate data, without a care to where that data lives. If it does something noteworthy enough that something else might need to happen as a result, it published an event about it. Done. You might have all of these extend a base class, which will help for tying it all together later:

```
abstract class UseCase<generics Message, Response> 
  abstract process(message: Message) return Response;
  ```

This means “AddWidget” is a separate use case class module from “DeleteWidget”, etc.. A classic layered architecture would have these put together into a single all-knowing “WidgetService”. That approach though usually results in a huge “do everything” class that violates multiple design principles.

Once every feature is its own little module, these little use cases can be deployed in any way without them knowing or caring. Group them in folders by domains (i.e.: src/use-cases/widgets/), but initially KISS and deploy as a monolith. When you have reason, deploy some separately, but don't move the code!

Use **dependency injection** to provide the external interfaces, such as “WidgetRepository”. (This also sets up easy unit testing on the all-important business logic in these use cases.) Depending on the capabilities of the programming language, it is best if the domain use cases define these dependencies as interfaces or abstract classes. Binding the interface to the actual implementation is a *deployment* consideration and key to making your use case nanoservice portable. You may initially inject a “WidgetRepository” implementation that accesses a database directly. Later, after deciding to break this use case out to another microservice, that deployment can bind a proxy implementation of “WidgetRepository” while other use cases that remain in the monolith continue to use the database implementation.

How you organize your domain code is independent of how you deploy the code! It's easiest to group related *source* code near each other, but that is not always the best way to *run* code. These are two different concerns, so don't let one force unnatural structure on the other.


# Tying it Together

**Message Brokers and Buses.**

Use cases register themselves, or are registered, as handing a single specific message (event or request). In a monolith, this might be to an in-process bus. Events are published to the bus, and the bus routes to the use case. For a more distributed (microservice or serverless) system, the bus is replaced with a message broker. (Examples: ApacheMQ, RabbitMQ, Kafka, Amazon EventBridge, Amazon SNS, …)

What if you have a distributed system, but an event is published in the same process as the subscriber? Should optimize that? Probably not. If ultra low latency is critical, then yes let the in-process bus recognize and optimize this. In most cases though, go ahead and send the event to the broker and let it came back. This lets the system work as intended, with queuing, failure and retry, archiving, process lifecycle, etc. all provided by your solution architecture. Also, this allows for other external subscription to *also* receive the event, and maintained the option to split out that in-process subscriber without any other changes.

That brings us back where we started:

````
 Each use case can be it's own nanoservice. Always code as if it is.
````

**What is a Microservice?**

Under this approach, a microservice is a deployment of a group of nanoservices (use cases). Along those lines, a monolith is a deployment of all of your nanoservices. By coding in nanoservices, you maintain full agility in how you deploy.

### It Works For Us, And Can for You Too

I’ve used this approach on a couple of projects now. In one unusual case, the application was originally written to deploy as a serverless application on AWS (Lambdas, DynamoDB, SNS, API Gateway). Upon business request, it was *also* deployed as a pair of monoliths in a cloud virtual machine and a laptop. This was done without changing any of the use case code! That’s the power of separating software architecture from solution architecture.

This approach is built in to an accelerator platform created and used by the Rackspace Professional Services Cloud Native Development team. Let us accelerate your next application.




<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/cloud-native">Learn about Rackspace Native Development.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
