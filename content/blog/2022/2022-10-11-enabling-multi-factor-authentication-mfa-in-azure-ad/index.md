---
layout: post
title: "Enabling Multi-Factor Authentication (MFA) in Azure AD"
date: 2022-10-12
comments: true
author: Dilip Singh
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - Database
    - Security
metaTitle: "Enabling Multi-Factor Authentication (MFA) in Azure AD"
metaDescription: "MFA is where users are prompted /required to authenticate with additional verification using additional form of identity verification. "
ogTitle: "Enabling Multi-Factor Authentication (MFA) in Azure AD"
ogDescription: "MFA is where users are prompted /required to authenticate with additional verification using additional form of identity verification."
slug: "enabling-multi-factor-authentication-mfa-in-azure-ad"

---


MFA is where users are prompted /required to authenticate with additional verification using additional form of identity verification. 

 MFA is a way to secure your apps and data by requiring users to use another form of verification. Also, MFA gives additional security by introducing an additional form for verification and provide strong authentication by a range of simple-to-use validation methods.



<!--more-->

#### Approach/Steps

We can enable MFA using Conditional Access Polices in Azure-AD.

Following is the given screenshot Navigation to Enable MFA in Azure-AD. 

**Step 1**: First click on Active user directories as shown in the following screenshots.

<img src=Picture1.png title="" alt="">
<img src=Picture2.png title="" alt="">

**Step 2**: Then Click on Security as given in the following screenshot.
<img src=Picture3.png title="" alt="">

**Step 3**: The next step is to click on "Conditional Access".

<img src=Picture4.png title="" alt="">

**Step 4** :  Then under Polices select + New Policy  ---->Select  Create New Policy .

<img src=Picture5.png title="" alt="">

**Step 5**: Then Provide Policy Name. Here given Policy name is *MFADemoPolicy*.

<img src=Picture6.png title="" alt="">

**Step 6**:  This step involves clicking on the “ User or Workload Identities” as given in following  screenshots ------> Then Select policy applies to User and groups  ------->Then tick mark the checkbox with User and groups as given in the following  screenshot.Once you tick mark the  checkbox with User and groups then users will appear in right pane of window to select the user. Here we click on the User Dilip Singh (I have given my name as an example) 

<img src=Picture7.png title="" alt="">
<img src=Picture8   .png title="" alt="">

**Step 8**: Navigate on grant and click on same controls as given in the following screenshot.

<img src=Picture9.png title="" alt="">

**Step 9** : Navigate to right pane of window -----> select grant access then tick mark checkbox “**Required Multi-factor authentication**”.

- Also, as shown in the following screenshot, for multiple control select “Required the selected controls” then click on select.

<img src=Picture10.png title="" alt="">

**Step 10** : In this step, you need to *select Grant 1 control*. Under Enable Policy select report only and click on Create

<img src=Picture11.png title="" alt="">

**Step 11**: Now MFADemoPolicy has been Created .
<img src=Picture12.png title="" alt="">

#### Test Multi-Factor Authentication (MFA):

**Step 12**:   Open a fresh browser window in an Incognito mode and browse go to https://portal.azure.com.

**Step 13**: Sign in with your username to user account.

**Step 14**: Now prompted here required to register for and use Azure AD Multi-Factor Authentication
<img src=Picture13.png title="" alt="">

**Step 15**:  Select 'Next' to begin the process.

You can do authentication by using a phone or mobile app . Authenticate from phone supports text msg also phone calls, and where mobile app supports using only a mobile app to receive notifications to get authentication or to get authentication codes.

**Step 16** : Validate/complete all the instructions on the phone/mobile app screen to configure the multi-factor authentication you have selected.

**Step 17**: Close browser and log in back to the browser again at https://portal.azure.com to verify the authentication method that was configured. In the following example, if we configure a mobile app for  authentication, you will see a prompt like the following one.

<img src=Picture14.png title="" alt="">


#### Conclusion:

- MFA providing access based on Multiple factors and reduce risk to compromise password also MFA provides extra layer of security from outside attack that cost company millions .
- MFA reduces risk of account hacking and  granting an extra security layer .


<a class="cta purple" id="cta" href="https://www.rackspace.com/cloud/azure">Learn about Rackspace Managed Azure Cloud Services.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
