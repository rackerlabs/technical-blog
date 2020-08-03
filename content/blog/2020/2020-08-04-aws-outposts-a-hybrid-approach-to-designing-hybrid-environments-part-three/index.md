---
layout: post
title: "Aws Outposts: A hybrid approach to designing hybrid environments&dash;Part Three"
date: 2020-08-04
comments: true
author: Wayne Zettler
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-U010VPCKG3D-ebaa348e7951-512'
bio: "I like to consider myself a hybrid technologist with over 20 years of
combined experience in leadership roles, engineering deployment roles, pre-sales
solutions architect roles, and quota-carrying B2B sales consulting roles. I am
happiest when I'm working directly with clients to transform their organizations
using AWS as the catalyst for change. My passion lies in driving cloud-based
project design through business-drivers analysis, resulting in well-architected
AWS information technology solutions. I pride myself on being capable of having
extremely granular technical conversations with an organization's top engineers,
while still being able to relate the information to non-technical C-suite executive
team members. My diverse work experience allows me to view client transformation
engagements through multiple different lenses. I've been the person to sell the
solutions, I've been the person to design the solutions, and once upon a time,
I was even the person to deliver the solutions. Like all solutions architects
worth their weight in salt, my focus is on extracting the foundational business
requirements at the core of all cloud migration initiatives and translating those
needs into an architectural design, leveraging AWS cloud infrastructure."
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "Aws Outposts: A hybrid approach to designing hybrid environments&dash;Part Three"
metaDescription: "."
ogTitle: "Aws Outposts:A hybrid approach to designing hybrid environments&dash;Part Three"
ogDescription: "."
slug: "aws-outposts-a-hybrid-approach-to-designing-hybrid-environments-part-three"

---

Amazon Web Services&reg; (AWS) Outposts is ideal for workloads that require low
latency access to on-premises systems, local data processing, or local data
storage. In Part three, we wrap up with ordering an AWS Outposts unit.

<!--more-->

This three-part series examines the following topics:

- Why AWS Outposts is relevant in today’s technology ecosystems
- How you can leverage Outposts to create hybrid environments
- What makes up an Outposts' data rack
- What does it cost to incorporate this technology into your environment
- How to begin your Outposts journey by setting up a site

If you haven't already seen them, read
[Part one of this series](https://docs.rackspace.com/blog/aws-outposts-a-hybrid-approach-to-designing-hybrid-environments-part-one/),
and
[Part two of this series](https://docs.rackspace.com/blog/aws-outposts-a-hybrid-approach-to-designing-hybrid-environments-part-two/),
before reading this installment.

### Ordering an Outpost Unit&mdash;What goes into creating a new Site

There is quite a bit of information required before you ever see the AWS truck
backing up to your loading ramp with an Outpost&reg; rack, and the first step is
to create a **New Site** through the AWS&reg; console. After you log into Amazon,
select the Outpost service, which lives under the **Compute** service submenu.

On the creation page, enter an Outpost name, an optional description, a Site ID,
and an Availability zone. If this is your first time creating an Outpost, you
can't go any further because your **Site ID** drop-down slot is empty. As luck
would have it, a **Create Site** button is right beneath the Site ID drop-down,
so you do not have to look too hard to find it. The site ID brings you to a new
page, which starts you along the path of defining the Outpost site. As you might
expect, the list of questions is quite extensive.

#### First set of questions

The first series of questions concerns the shipping address where you plan to
install the Outposts unit. This might go without saying, but Amazon will not
deliver an Outpost rack to a PO box. After you have cleared the relatively
straight-forward question about the delivery address, the questions increase in
complexity.

#### Second set of questions

The second question requires a simple **yes** or **no** response, focusing on
the facility's air conditioning, humidity, and airflow conditions. No amount of
AWS magic can keep a server rack from overheating in a space with inadequate
cooling.

I still have a burn scar on my left forearm from where my server racks ran over
the weekend aboard a navy ship with no AC, back in the early 2000s. By the time
I arrived on Monday morning, the walls were literally sweating, and the server
rack was so hot it scorched my arm.

Obviously, AWS would like to ensure that you don't put their equipment in that
sort of peril, before agreeing to drop one off at your facility.

**Key questions**

- Temperature range of 41° to 104° F (5° to 40° C)
- Humidity Range 10° F (-12° C) 8% Relative Humidity to 70°F (21° C) and 80%
  Relative Humidity
- Airflow - Front to Rear, 162 Cubic Feet Per minute times the kVA draw of the
  Outpost Rack

#### Third set of questions

The third grouping of questions requires a simple **yes** or **no** response and focuses on the facility's clearance requirements.

**Key questions**

- Loading dock can accommodate rack crate (94" high by 54" wide by 48" deep)
- Access path from Loading Dock to Rack install location
- 48" or more clearance in front of rack & 24" of clearance behind the rack, at
  the install location

#### Fourth set of questions

The fourth series of questions concerns rack position requirements. This
information ranges from the weight restrictions to basic physical security
constraints, such as bringing an AWS laptop into the facility.

**Key questions**

- Max Weight Supported at Install Site
- Bracing Requirements
- Use of AWS owned equipment while onsite

#### Fifth set of questions

The fifth grouping of questions focuses on power. This section requires you to
consult a power specialist or datacenter facility manager to answer. Even the
savviest data center engineers are typically tripped up by the power aspects of
data center racks. Failing fast may be a great option in cloud design, but
failing fast when dealing with power can have explosive results … literally.
These power-related questions provide AWS with the data they need to select the
appropriate UPS and PDUs to power the device correctly and allow for a graceful
shutdown in the event of an emergency.

**Key questions**

- Power Draw
- Breaker Location
- Single Phase AC (200v - 277v, 50-60Hz) vs Three Phase AC (346v - 480v, 50-60Hz

#### Sixth set of questions

The last set of questions pertains to the networking capabilities that you have
and expect to use for your Outpost rack. Unlike the data center's power and
cooling properties, you can likely determine this information by speaking to a
network engineer. The networking questions are relatively simple, and you need
these details to ensure AWS incorporates the correct network interface cards
into the build.

**Key questions**

- Uplink Speed (1Gbps, 10Gbps, 40Gbps, 100Gbps)
- Fiber Type (Single-mode or Multi-Mode)
- Optical Standard

After you complete the questionnaire, you are ready to finalize your site creation.
Enter a name for your site, enter an optional description, and select **Create Site**
to complete the process successfully. If you recall, earlier, you could not move
forward with site creation without a pre-populated site. However, at this
juncture, your drop-down box should display the site you just finished creating,
and you can move on to choosing your instance bundle. The bundle is simply the
many build options available based on your compute and storage needs. You can
find a full list of the available bundles at
[https://console.aws.amazon.com/outposts/home?region=us-east-1#Catalog](https://console.aws.amazon.com/outposts/home?region=us-east-1#Catalog).

After you complete these steps, AWS will send an Outpost unit loading rack to
your data center along with a team of AWS engineers. There are additional steps
to configuring the unit to interoperate with your AWS cloud infrastructure, but
that falls outside of this blog's scope. For clients interested in learning more
about acquiring an AWS Outposts unit, I recommend reaching out to your preferred
AWS partner for more details.

### Conclusion

AWS Outposts is a truly unique offering from our partners at Amazon. While it
might not be a perfect fit for every situation, Outposts has a lot to offer for
clients trying to up their hybrid game. When combined with the ever-growing
arsenal of AWS cloud-native tools, Outposts can leverage cloud technology from
the confines of a customer-owned data center.

Here are my TOP TEN takeaways from my review of this new AWS Service:

1. AWS Outposts extends access to cloud-native services from within your local datacenter.
2. Outposts seamlessly bridges on-premises networks with AWS VPCs and availability zones.
3. Outposts is a fully managed service, and the ownership and operation of the delivered hardware fall to AWS.
4. AWS Outposts costs you a minimum of $6,965 per month, not counting associated charges for other AWS services. You might find discounting programs or special pricing to adjust the price.
5. AWS leverages numerous Hardware Technology partners and independent software vendors (ISVs) to create a cohesive Outpost unit.
6. Creating an AWS Outpost site via the AWS console requires knowledge of the physical space housing the rack, power, cooling, airflow, and networking.
7. AWS Outposts is proof that Amazon innovation focuses on providing a solution for every outcome and need, not just ones that address the vast majority of user requirements.
8. Outposts offers a wide range of instance bundles, including General Purpose, Compute Optimized, Memory Optimized, Graphics Optimized, and I/O Optimized instance types.
9. Outposts offers a wide range of local services,  including EC2, ECS, EKS, EBS, RDS, EMR, and S3.
10. Outposts addresses many of the inherent issues often associated with hybrid cloud infrastructures.

We hope you enjoyed this series on AWS Outposts!

<a class="cta teal" id="cta" href="https://www.rackspace.com/sap">Learn more about our SAP services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
