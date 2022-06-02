---
layout: post
title: "Configuration of Oracle E-Business Suite Enterprise Command Centers (ECC)"
date: 2022-06-02
comments: true
author: Love Uniyal
authorAvatar: 'https://secure.gravatar.com/avatar/64a33d5b02cde157016d8e2e63e1241a'
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
    - General
metaTitle: "Configuration of Oracle E-Business Suite Enterprise Command Centers (ECC)"
metaDescription: "ECC is a set of tightly-integrated, information-rich dashboards which helps users to identify and act on priority transactions without custom operational reporting."
ogTitle: "Configuration of Oracle E-Business Suite Enterprise Command Centers (ECC)"
ogDescription: "ECC is a set of tightly-integrated, information-rich dashboards which helps users to identify and act on priority transactions without custom operational reporting."
slug: "configuration-of-oracle-e-business-suite-enterprise-command-centers-ecc"

---

ECC is a set of tightly-integrated, information-rich dashboards which helps users to identify and act on priority transactions without custom operational reporting.

<!--more-->

Also, Its  middleware technology made up of an interactive JavaScript front end and a Java back end engine.

### ECC setup consist of 5 major component
1. Database Setup for ECC
2.	Install WebLogic Server for ECC
3.	ECC domain Setup
4.	Setup of  EBS JNDI
5.	Integration of  ECC with EBS

### Pre - requisites

- Download & Install the quick Install package.
- Apply relevant product command center patches on EBS Instance.
- Create a separate user for ECC components Installation (optional)

### Configuration Setup Steps of ECC

#### 1.  Set Up the Database

    (a) Navigate to the $ECC_BASE/Oracle/quickInstall/ directory and open the EccConfig.properties file with a text editor.

    (b) cd $ECC_BASE/Oracle/quickInstall
    ./createEnvFile.sh
    
    (c) ./envSetup.sh -> Select option 1

<img src=Picture1.png title="" alt="">
<img src=Picture2.png title="" alt="">
<img src=Picture3.png title="" alt="">

### Validation of DB setup
- (a) `cd $ECC_BASE/Oracle/quickInstall/env
    source ecc.env`
- (b) `sqlplus <ECC_DB_USER>@<EBS DB Connect String>`
    
`sqlplus $ECC_DB_USER@\"$ECC_DB_CONNECTION\"`
`sqlplus ECC@\"testebs04.testecc.com:1522/ebs_TESTEDEV\"`

`SQL> select name,open_mode,user from v$database;`

NAME      OPEN_MODE            USER
--------- -------------------- -----------------
DEVCDB    READ WRITE           ECC

#### 2. Install WebLogic Server

`sh $ECC_BASE/Oracle/quickInstall/envSetup.sh`
`   select Install WebLogic Server - Select 2    `

<img src=Picture4.png title="" alt="">
<img src=Picture5.png title="" alt="">
<img src=Picture6.png title="" alt="">

#### 3. Create ECC domain

-  (a) prompts ECC db password
-  (b) prompts domain admin password and configures that password for the current installation. (It must contain a special character)

<img src=Picture7.png title="" alt="">
<img src=Picture8.png title="" alt="">
<img src=Picture9.png title="" alt="">
<img src=Picture10.png title="" alt="">

#### 4. Create EBS JNDI
-  (a) On EBS server go to $FND_SECURE/SID.dbc 
-  (b) Make a note fully qualified domain name of the target Oracle Enterprise Command Center Framework host system & dbc file from source

-    (c) `java oracle.apps.fnd.security.AdminDesktop apps/<apps_password> CREATE NODE_NAME=<fully_qualified_domain_name_of_target_ECC_host_system> DBC=<full_local_DBC_file_path`

<img src=Picture11.png title="" alt="">

`[appldev@testebs04 ~]$ java oracle.apps.fnd.security.AdminDesktop apps/apps CREATE NODE_NAME=testebs04.testecc.com DBC=/u01/ebs/R122/TESTEDEV/fs1/inst/apps/TESTEDEV_testebs04/appl/fnd/12.0.0/secure/TESTEDEV.dbc`
Committing changes
`CREATE executed successfully - TESTEDEV_TESTEBS04.TESTECC.COM.dbc`

- (d) Rename copied dbc file as  connection.dbc on server
    copy this file to the $ECC_BASE/Oracle/quickInstall & rename as connection.dbc
- (e)Run the envSetup.sh script from the $ECC_BASE/Oracle/quickInstall directory.Choose Option 4 - Create EBS JNDI

<img src=Picture12.png title="" alt="">

**NOTE:** Find user (ECC_discovery) password should be 9 non repeated characters long .

<img src=Picture13.png title="" alt="">
<img src=Picture14.png title="" alt="">

-    (f) Perform JNDI validation from the ECC domain admin console.

     -  URL: http://<ECC_HOST_NAME>:<ECC_ADMIN_PORT>/console
     -  Navigate to Services > Data Sources.
     -  Choose the ebsdb JNDI config. the right pane.
     -  Navigate to the Monitoring tab and select the Testing subtab.
     -  Click on the managed server and Select Test Data Source button. The following message should appear: *Success Test of ebsdb on   server <Server Name> was successful.*
<img src=Picture15.png title="" alt="">

#### 5. Integrate ECC with EBS

-    (a) Run the envSetup.sh script. select option 5, Integrate ECC With EBS.

<img src=Picture16.png title="" alt="">
<img src=Picture17.png title="" alt="">
<img src=Picture18.png title="" alt="">
<img src=Picture19.png title="" alt="">
<img src=Picture20.png title="" alt="">

- (b)  Go to DOMAIN_HOME/servers/<SERVERNAME>/data/ldap/ldapfils and remove the EmbeddedLDAP.lok lock file
- (c)  Delete the *.dat file under  DOMAIN_HOME/servers/<SERVERNAME>/data /store/default and DOMAIN_HOME/servers/<SERVERNAME>/data /store/diagnostics/
- (d)Remove the contents under  DOMAIN_HOME/servers/<SERVERNAME>/ tmp and DOMAIN_HOME/servers/<SERVERNAME>/ cache
  -     Now start the server
  
####  (6) Log in to Oracle E-Business Suite as a system administrator.

- (a)Navigate to System Administration: Oracle Applications Manager > AutoConfig.
- b)  Select the application tier context file, and choose Edit Parameters.
- (c) Search for the s_ecc_conf_comment variable by selecting OA_VAR in the search list of values and entering s_ecc_conf_comment in the search text box. Then choose the Go button.
- (d)  Remove the number sign (#) from the Value field for the s_ecc_conf_comment variable to ensure that this variable is not commented. Then choose the Save button.
-  (e)  Enter a reason for the update, such as Enabling Oracle Enterprise Command Center Framework. Then choose the OK button.
-  (f)  Similarly, search for the following variables and set their values as appropriate for your installation:
- (g)s_ecc_protocol,s_ecc_web_host,s_ecc_managed_server_port, s_ecc_conf_update:

[appldev@testebs04 scripts]$ grep s_ecc $CONTEXT_FILE

       grep -i s_ohs_instance_loc $CONTEXT_FILE
       grep -i s_ohs_component $CONTEXT_FILE
       grep -i s_ohs_instance_loc $CONTEXT_FILE
       grep -i s_ohs_component $CONTEXT_FILE


#### (7) Import Enterprise Command Center Applications

- (a) `source EBSapps.env run (On EBS node)`
- (b) `cd $FND_TOP/bin`
       `Perl patchEccFiles.pl`
`[appldev@testebs04 bin]$ perl patchEccFiles.pl `

<img src=Picture21.png title="" alt="">

### Conclusion

ECC provides information discovery along with visualization and exploration capabilities embedded within Oracle E-Business Suite user interfaces also it’s dashboard users identify and act on top priorities without the need for custom operational reporting, and use information-driven navigation.


<a class="cta red" id="cta" href="https://www.rackspace.com/applications/oracle">Let our experts guide you on your Oracle Applications journey.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
