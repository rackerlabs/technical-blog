---
layout: post
title: "How to set Budgets in Oracle cloud infrastructure (OCI)"
date: 2022-05-12
comments: true
author: Santosh Kumar
authorAvatar: 'https://secure.gravatar.com/avatar/c995a09e236f55b82451a9f8a6add9ad'
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
    - General
metaTitle: "How to set Budgets in Oracle cloud infrastructure (OCI)"
metaDescription: "A budget is an option provided in OCI console by which you can track Oracle Cloud Infrastructure (OCI) spending."
ogTitle: "How to set Budgets in Oracle cloud infrastructure (OCI)"
ogDescription: "A budget is an option provided in OCI console by which you can track Oracle Cloud Infrastructure (OCI) spending."
slug: "how-to-set-budgets-in-oracle-cloud-infrastructure-oci"

---
What are OCI budgets?

A budget is an option provided in OCI console by which you can track Oracle Cloud Infrastructure (OCI) spending. 

<!--more-->

The feature enables the user to set alerts to keep a check on the budget spend. For instance, if the expenditure crosses the set threshold, then you will be notified about the additional spend. You can also monitor in OCI console what and where resource has spending in your budget. 
For example, suppose you might have added more OCI resources for testing and missed removing them. This would keep adding to your costs. With budgets option on, alerts are enabled to send email notifications to given email id/Ids.

### I will be discussing the topic in the following three phases:

- Phase 1: Create budget and set alerting by selecting compartment
- Phase 2: Create budget and set alerting by selecting cost-tracking tag
- Phase 3: Update budget and add more threshold for alert 


### Phase 1: Create budgets and set alerting by selecting compartment.


- a)	You need to first Login to OCI console.

<img src=Picture1.png title="" alt="">

Once you are logged in, complete the following steps to create budgets and set alerts by selecting compartment in OCI:

- b)	 Open the navigation menu and click Billing & Cost Management. Under the sub menu Cost Management, click on Budgets as shown in below picture.

<img src=Picture2.png title="" alt="">


- c)	Click on Create Budget at the top of the budgets list. Create Budget dialog is displayed as below picture.


<img src=Picture3.png title="" alt="">


- d)	Select either compartment or cost-tracking tag to select the type of target for your budget. Here I have selected Compartment. And filled the details. I will describe Cost-Tracking tag in phase-2.

<img src= Picture4.png title="" alt="">
<img src=Picture5.png title="" alt="">
<img src=Picture6.png title="" alt="">
<img src=Picture7.png title="" alt="">
<img src=Picture8.png title="" alt="">
<img src=Picture9.png title="" alt="">

Click on Create.

- **Compartment:** If you want to track spending for all resources in a specific compartment
- **Cost-tracking tag:** Tracks spending for all resources with a specific tag. These might be spread across multiple compartments.
- **Name:** Name of the Budget as per your standard
- **Target compartment:** The compartment that you want to create the budget for.
- **Monthly Budget Amount (in US$):** Monthly budget amount based on your business use case or as per your requirement.
- **Day of the month to begin budget processing:** The specific day you want the budget processing to begin

- **Budget Alert Rule is (optional):** You can enable for alerting. You can set up a budget alert rule now or add it later. You can set up multiple alerts for the same budget.
- **Threshold Metric:** The value that you want the alert rule to calculate. You can calculate the actual amount spent during the budget period or the amount forecast to be spent.
- **Threshold Type:** Select whether the alert is activated when the budget reaches either a given percentage of the total budget or a given amount.
- **Email Recipients Optional:** Provide one or more email addresses to receive the alerts. Multiple addresses can be separated using a comma, semicolon, space, tab, or a new line.
- **Email Message Optional:** Enter the body of the email message as per your requirement.

### Phase 2: Create budget and set alerting by selecting cost-tracking tag

*Following are the steps to create budgets and set alerting by selecting cost-tracking tag in OCI: -*

You can also create budget on ‘cost tracking track’ option. To keep an eye on spending for all resources with a specific tag. These might expand across multiple compartments. Cost-tracking tags provide the flexibility to monitor usage and cost for specific resources across compartments. Budgets and alerts can also be set based on cost-tracking tags to get email notifications when the usage reaches.

- *a)	Select either Compartment or Cost-Tracking Tag to select the type of target for your budget. Here I selected Cost-Tracking Tag and filled the details.*


- b)	*For budgets targeting a cost-tracking tag:*

Here you have the following three fields that you need to fill. And other details remain the same as filled in the Phase1.

-	Select a tag namespace.
-	Select a target cost-tracking tag key.
-	Enter a value for the cost-tracking tag.
         
<img src=Picture10.png title="" alt="">
<img src=Picture11.png title="" alt="">
<img src=Picture12.png title="" alt="">
<img src=Picture13.png title="" alt="">

Then click on create. Once the above steps are complete, you will see that budgets have been succesfully created. The following snapshot indicates the same. 

<img src=Picture14.png title="" alt="">

### Phase 3: Update budget and add more threshold for alert.

If you want to get critical alert on 90% threshold you can add new alert rule or update existing alert rules.

- a)	Click on budget which you have created in above

<img src=Picture15.png title="" alt="">

- b)	Either create new budget alert rules and edit existing rules.

- c)	To create new alert click on Create Budget Alert rule

<img src=Picture16.png title="" alt="">
<img src=Picture18.png title="" alt="">

Click on create.

A buget notification email exmaple is shared in the following snapshot. 

In my example, I had set the alert for 50% and then 80%. I received the first notification at 50% and the second at 80%. 

<img src=Picture19.png title="" alt="">
<img src=Picture20.png title="" alt="">


### Conclusion

Cost plays a vital role in any of the cloud services. OCI provides the feature to maintain control of your costs from time to time through Budget. The single most important part of budgeting is to get a forecast for spending. Budgets exist to help you maintain awareness and control of your spending. Follow the above steps to easily create events for your budget to trigger a function in Oracle or to receive the notification alerts.






<a class="cta red" id="cta" href="https://www.rackspace.com/hub/modern-cloud-applications">Let our experts guide you on your cloud-native journey.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
