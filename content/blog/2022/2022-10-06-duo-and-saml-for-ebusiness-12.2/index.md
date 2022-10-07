---
layout: post
title: "Implementation of DUO and SAML in E-business suite 12.2"
date: 2022-10-06
comments: true
author: D.V. Prakash
authorAvatar: 'https://secure.gravatar.com/avatar/3cb78e30887e6a815af277a1bab3a584'
bio: "I have been working as Oracle apps DBA for last 15yrs and well versed with oracle Technologies."
published: true
authorIsRacker: true
categories:
    - Oracle
    - Databases
    - Security
metaTitle: "Implementation of DUO and SAML in E-business suite 12.2"
metaDescription: "This blog covers steps on how to implement Multi Factor Authentication (MFA) for E-business suite, and Security Assertion Markup Language (SAML)."
ogTitle: "Implementation of DUO and SAML in E-business suite 12.2"
ogDescription: "This blog covers steps on how to implement Multi Factor Authentication (MFA) for E-business suite, and Security Assertion Markup Language (SAML)."
slug: "implementation-of-duo-and-saml-in-e-business-suite-12.2"

---
### Introduction: 
This blog covers steps on how to implement Multi Factor Authentication (MFA) for E-business suite, and Security Assertion Markup Language (SAML).


<!--more-->

MFA is used for authenticating the identity of a user requiring a user to present two or more pieces of evidence, or factors, for authentication.
Security Assertion Markup Language consists of two parties including:
Identity Provider — > Performs authentication and passes the user's identity and authorization level to the service provider.
Service Provider — > Trusts the identity provider and authorizes the given user to access the requested resource.
SAML works through exchange of information between the two above trusted entities.


### Requirement
To begin with, users need to login to Duo portal or duo dashboard once. Once on the portal. the user can directly click on the E-business icon, without requiring any user-id or password authentication. Client might have a different portal, but in this example, I am working on the Duo central portal. All applications as highlighted in the following snapshot, do not require the user login.

<img src=Picture1.png title="" alt="">

 After you click on Oracle EBS icon, a page will be displayed with responsibilities.

We can implement above requirement with Security Assertion Markup Language (SAML) 

#### Pre-requisites for Implementing Duo: 

We have one working E-business suite integrated with Access Manager. Oracle unified Directory used as back-end user directory.  OAM managed server should be running in SSL mode.

#### Steps for implementing Multi Factor Authentication for EBS 12.2 using Duo setup:

You need to first download DuoUniversalPlugin.jar from the following URL to a local desktop.
 [Download Link](https://github.com/duosecurity/duo_universal_oam/releases/latest/download/DuoUniversalPlugin.jar)

Log in to OAM Console (URL is just an example)

[Localhost Link](http://localhost.domain.com:8001/oamconsole)

under Authentication Plugins, once the page is loaded click on 'Import Plug-in'....

<img src=Picture2.png title="" alt="">

<img src=Picture3.png title="" alt="">

Browse the file DuoUniversalPlugin.jar which is downloaded and click on 'import'.

Once uploaded, select DuoUniversalPlugin which should be in the uploaded status.

Client ID, Client Secret, Client Secret values are provided by duo admin team.

- Redirect URL   : OAM instance ( https://<<oam-server-host>>:<<port>>/oam/server/auth_cred_submit)
- Fail Mode         : Open 
- User Store        : OIDIdentityStore

Save after entering the values.

<img src=Picture4.png title="" alt="">

At the top of plugin, it will show as "Distribute Selected", you need to click on it and refresh to change the "Activation Status" to Distributed.

Then click on activate to change "Activation Status" to Activated

Once the plugin  is activated, you need to create a custom authentication module.

In the next step, you need to Modify Plugins, the *UserIdentificationPlugIn* and *UserAuthenticationPlugIn* 
for parameter -  KEY_IDENTITY_STORE_REF to OIDIdentityStore 

<img src=Picture5.png title="" alt="">
In Oracle Access manager Console, click on “Authentication Modules”, under "Plug-ins"

Select Custom Authentication module, give name as LDAP_DUO (u can name any)

<img src=Picture6.png title="" alt="">

Click on the tab steps to add the following lines with step name and plugin name.

<img src=Picture7.png title="" alt="">

In the steps Orchestration tab, you need to add three steps with Duonuiversal, uid and uid2. Ideally, we are specifying what needs to be done by OAM in case of a successful and failed login.

<img src=Picture8.png title="" alt="">

- Once the Authentication Moule is created, you need to change EBsauthscehme to LDAP_DUO from LDAP_EBS by navigating to Launchpad >Authentication scheme >
- EBsauthscehme is the scheme which gets created while registration with OAM and is used by default for authentication which needs to be changed.
- By completing the above steps, we have successfully implemented the multifactor Duo authentication, and once you login, the following window pops up.

<img src=Picture9.png title="" alt="">
<img src=Picture10.png title="" alt="">

**Implementing SAML to enable single click  Authentication from Duo Central**
======================================================================================

In duo portal, icons created by duo admin team and in Access manager we perform the following steps: 

#### Step 1: Enable the Federation Services 

In OAM console click on Federation.
-Click on the "Available Services" button	
-Click the "Enable Service" button in the Identity Federation row
-Complete the following steps using wlst.sh

```
$ export ORACLE_HOME=/<PATH>/<Oracle_IDM_Directory>
$ cd $ORACLE_HOME/common/bin
$ ./wlst.sh
```
- Connect to the AdminServer as the weblogic administrator user using the connect() command.
- Switch to the runtime context using the domainRuntime() command.
- Enable the Federation SP service using the command configureFederationService("sp","true")
- Optionally, enable the Federation IdP service using the command configureFederationService("idp","true") (**)
- Enable the Federation SP Test Engine (Web Page that allows testing with IdP partners without use of protected resources) using the command configureTestSPEngine("true") 

**Following are examples of the commands**
```
wls:/offline> connect(username='weblogic', password='***', url='t3://example.domain.com:port')
wls:/OAM_Domain/serverConfig/> domainRuntime()
wls:/OAM_Domain/domainRuntime/> configureFederationService("sp","true")
```
Command was successful.

`wls:/OAM_Domain/domainRuntime/> configureFederationService("idp","true")`

Command was successful.
```
wls:/OAM_Domain/domainRuntime/>
wls:/OAM_Domain/domainRuntime/> configureTestSPEngine("true")
```
Command was successful.

`wls:/OAM_Domain/domainRuntime/>`


#### Step 2 : Create Identity Provider

You need to request metadata of Duo portal as xml file from Duo admin team that can be imported by completing the following steps.

Once received, create Identity Provider Partner by completing the following steps.

- A.	In the OAM console, navigate to the "Federation" section of the console using the buttons at the upper right corner of the page (*)

- B.  or click the Service Provider Management link (*)

- C.  Click Create Identity Provider Partner

- D.  Provide a Name for your partner.  

- E.  Optionally, provide a description

- F.  Provide the Service Information by uploading the metadata file provided by Duo admin team.

- G.   Specify a User Identity Store to map the federated user ,in OAM we need to select as OIDidentity store.

- H.   Specify a User Search Base to search for user entries 

- I.   Map assertion Name Id to User ID Store attribute to use the value of the Name ID field of the assertion to search the user store for user with a matching value in the specified attribute, here we are using mail.

- J.  Select an Attribute Mapping profile as an IDP attribute profile.

- K.  Click Save

- M.  After saving, a new screen will be displayed.  Click the "Create Authentication Scheme and Module" as shown in the following snapshot

*Refer to the following screenshots*

<img src=Picture11.png title="" alt="">
<img src=Picture12.png title="" alt="">

#### Step 3: Send OAM federation metadata to Duo Admin Team

- In the OAM Console > Click on Configuration >Settings>click on Federation

- Click on Export SAML 2.0 Metadata and send the xml to duo admin team. The duo team will import in DUO central portal.

<img src=Picture13.png title="" alt="">

Following are the important values which will be in the xml file.
1.  entityID 
2. Assertion Consumer Service (ACS) URL 
3. Single Logout URL

#### Step 4:  Testing of federation configuration

You can test the federation using URL

https://<OAM_HOST_NAME>:<OAM_MANAGED_SERVER_PORT>/oamfed/user/testspsso

<img src=Picture14.png title="" alt="">

In partner drop down list (screen above), you will have the custom authentication scheme value that we created in the previous steps.

Select the value and click to Start SSO.

You will get the Duo login prompt indicating that the federation is successful, and you will be able to login with credentials of IDP.

#### Step 5:  Configure OAM to protect resources using your federated IDP partner

- In the OAM console, navigate to *Application Security >Application Domains >search for the Application Domain* 
- Application domain will be generally with *SID+hostname+port*
- *select Domain >Click on Authentication Policies >Protected Resource Policy >Change Authentication Scheme to*

<partner name>FederationScheme which is <partner name>FederationScheme .

<img src=Picture15.png title="" alt="">

Once all above steps are done, the E-business suite will be launched from duo central without passwords.


#### Conclusion: 

SAML improves user experience in login process for several applications as a user need to sign in only once. SAML leads to increased security because authentication process ensures that credentials are only sent to identity provider directly.


<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/oracle">Learn about Rackspace Managed Oracle Applications.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
