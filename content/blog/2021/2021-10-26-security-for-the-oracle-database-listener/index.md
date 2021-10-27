---
layout: post
title: "Security for Oracle Database Listener"
date: 2021-10-26
comments: true
author: Ganesh Chikkala
authorAvatar: 'https://secure.gravatar.com/avatar/c995a09e236f55b82451a9f8a6add9ad'
bio: "I am an Oracle Application DBA, Oracle DBA and Cloud DBA. I’ve completed Oracle OCA, OCP, and cloud certifications."
published: true
authorIsRacker: true
categories:
    - Oracle
    - Security
metaTitle: "Security for Oracle Database Listener"
metaDescription: "The Oracle Database listener is a module that connects an instance of the Oracle Database and its client. It is, therefore, important to ensure that this component is kept secure from cyber threats and attacks"
ogTitle: "Security for Oracle Database Listener"
ogDescription: "The Oracle Database listener is a module that connects an instance of the Oracle Database and its client. It is, therefore, important to ensure that this component is kept secure from cyber threats and attacks "
slug: "security-for-oracle-database-listener"

---

The Oracle Database listener is a module that connects an instance of the Oracle Database and its client. It is, therefore, important to ensure that this component is kept secure from cyber threats and attacks

<!--more-->

The Oracle Database listener is a module that connects an instance of the Oracle Database and its client. The listener accepts the connection through the default port (1521) or other ports, allowing the client to login into the database. 

### Why protect the database listener?

The Oracle Database Listener module is vital for database operations. Security of the Database Listener is a critical issue. The security of the entire database is dependent on the security of the listener because the Database Listener allows a user to login into the database and is configured in a different manner than the Oracle database. This, therefore, centers the security of the database on the Listener and is dependent on it.

Previous versions of the Oracle database (prior to version 10g) had reported security vulnerabilities with the database listener. However, the settings in the newer versions (11g and 12c) have been changed to ensure that the listener is more secure.

### Security Attacks

-	The listener is vulnerable to denial-of-service(DoS) attacks. 
-	The listener is also vulnerable to any activation of a malicious Operating System command 
-	Sensitive data leak is also possible from the listener


#### Oracle Security Alert for CVE-2012-1675
Reference:  https://www.oracle.com/security-alerts/alert-cve-2012-1675.html

Affected products and versions are:
Oracle Database 11g Release 2, Oracle Database 11g Release 1, Oracle Database 10g Release 2

These vulnerabilities of the listener also extend to other Oracle products using the Oracle database, including OFM, OEM and Oracle EBS. Oracle recommends that customers apply the solutions to these issues on all database components.

#### Solutions

- Oracle’s issued notes for these vulnerability in the following:
- My Oracle Support Note 1340831.1 for RAC Databases

- My Oracle Support Note 1453883.1 for Non-RAC databases

#### Listener Overview

The _lsnrctl_ is the tool for starting and stopping the listener process (tnslsnr). _tnslnsr_ starts and verifies the _listener.ora_ and _sqlnet.ora_ files for port numbers and database service names. The _tnslnsr_ processes starts with a binary owner, usually the "ORACLE" account on UNIX or Linux. 

#### Steps to secure Oracle Listener-

•	DISABLING DEFAULT LISTENER

•	ENABLING LISTENER LOGGING

•	CONFIGURE ADMIN_RESTRICTIONS IN LISTENER.ORA

•	SET LOCAL_OS_AUTHENTICATION IN LISTENER.ORA

•	ENABLE SECURITY AGAINST NETWORK ON DATABASE LEVEL IN 11G.

•	SET  LISTENER PASSWORD

•	APPLY LATEST SECURITY PATCHES FOR LISTENER

•	FIX $TNS_ADMIN DIRECTORY

•	FIX TNSLSNR AND LSNRCTL EXECUTABLES

•	CHANGE TNS DEFAULT PORT NUMBER

•	CONFIGURE VALID NODE CHECKING

•	CLOSE SQL*NET ON FIREWALLS AND ISOLATE ON NETWORK

•	REMOVE UNUSED SERVICES

•	VERIFY THE LOGFILE

### Disable Default Listener

: You should give a unique name to the Database instance and avoid using the default name “Listener” as the name.

An additional step is to create a dope Listener named ‘listener’ by following the steps explained. This configuration will give errors and not allow a Listener named ‘listener’ from starting. 

`LISTENER=(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST=)(PORT = 0)))

$ lsnrctl start
 
  …

 ` Connecting to (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=)(PORT=0)))`

  `TNS-01103: Protocol specific component of the address is incorrectly specified`

  `TNS-12533: TNS:illegal ADDRESS parameters`

  `TNS-12560: TNS:protocol adapter error`

  `TNS-00503: Illegal ADDRESS parameters`


### Enable Listener Logging 

Enable logging for all listeners to capture Listener commands.

`LSNRCTL> set current_listener <PROD>` 

`LSNRCTL> set log_directory $ORACLE_HOME/network/admin` 

`LSNRCTL> set log_file <PROD>.log` 

`LSNRCTL> set log_status on `

`LSNRCTL> save_config`

#### Set ADMIN_RESTRICTIONS

When you set ADMIN_RESTRICTIONS_, <PROD> rejects SET command issued at runtime or from remote systems to change the Listener’s configurations. When you enable ADMIN_RESTRICTIONS it allows changes to the Listener’s configuration through a `lsnrctl`. Reload command used by user who has write privilege on the listener.ora file.  The reload command can read the setups from the listener.ora file. The default is OFF, set it to ON. 
`ADMIN_RESTRICTIONS_<listener name> = ON`

#### Set LOCAL_OS_AUTHENTICATION

The Listener cannot be managed from the outside and can only be managed by the owner of the `tnslsnr` process (usually oracle) since Oracle 10G - this is the default. Do not turn local administration off.

`LOCAL_OS_AUTHENTICATION_<listener name> = ON`


#### Set Protection against crafted network packets on database level in 11g.

SEC_PROTOCOL_ERROR_TRACE_ACTION:

SEC_PROTOCOL_ERROR_TRACE_ACTION define the action for database , when bad connection is received from a malicious client.

SEC_PROTOCOL_ERROR_TRACE_ACTION = { NONE | TRACE | LOG | ALERT }

#### Set Listener Password

The Listener password will keep end to attacks and security issues. Configuring the listener password manually in listener.ora using the PASSWORDS_ parameter will be saved in cleartext.

`LSNRCTL> set current_listener`  
`LSNRCTL> change_password Old password:`  
  `New password:`  
 ` Reenter new password:`  
`LSNRCTL> set password:`  
`LSNRCTL> save_config`

Check the `listener.ora`


### Apply Latest Security Patches 

Apply the latest Critical Patch Update to listener and database. Critical Patch Updates are cumulative, the new patch will have all previous security patches for the RDBMS, inclusive of the Listener.

### Secure the $TNS_ADMIN Directory 
The file permissions of the listener configuration files in the $ORACLE_HOME/network/admin directory should be read/write/execute for only the oracle OS user and no permissions for any other OS user. The tnsnames.ora file authorization should be set to 0644 on UNIX and Linux.

### Secure `tnslsnr` and `lsnrctl` 

The tnslsnr and lsnrctl binaries in the $ORACLE_HOME/bin directory should be safeguarded, and file permissions must be set to 0751 on UNIX and Linux as suggested by Oracle. It is possible to change the file permissions to 0700 which would be safer, even then this should be rigorously tested in your _env_

### Change the TNS Port Number from Default (1521) 

The port number can be modified by Oracle Net Manager (netmgr) or updating the listener.ora file directly. All tnsnames.ora files on the database server and clients should be modified to reflect the changed port number. The database init parameter _LOCAL_LISTENER_ must be set so that the database can dynamically connect with the Listener.

### Configure Valid Node Checking Registration (VNCR)
VNCR should not be unbalanced with Valid Node Checking and is the replacement of Class of Secure Transport (COST). From 11.2.0.4 onwards, VNCR needs to be enabled to prevent TNS and make sure that instance registration only performed from known and trusted servers. When VNCR set to LOCAL (recommended), then setup should be done from the local server.

### Block SQL*Net on Firewalls and Isolate on Network
The important recommendation for database security is to reduce physical access to the database. SQL*Net traffic also should not go through firewalls unless it is really required. Firewall filters must be made to only pass SQL*Net traffic from known application and web servers. SQL*Net connections from application servers in the Load balancer should be permitted only to access mentioned database servers.

Few applications require direct access to the database through SQLNet connections. For such applications, setup firewall filters based on a host and port number.

### Remove Unused Services
If _listener.ora_ files are copied between instances, then the copied files may have old and useful entries. Validate all services in the listener.ora to conform if they are used. Remove services not actively used.

### Verify the Logfile

The Listener's logfile may have TNS-01169, TNS-01189, TNS-01190, or TNS-12508 errors, which may attack or indecorous activity. Using a scheduled shell script or other tools, you can verify the logfile and generate an alert for listener log file. 
By default, logging is not enabled (LOG_STATUS=OFF). When logging is enabled, the default directory is $TNS_ADMIN and the log file default is <PROD>.log. 

### Conclusion

The Oracle Database Listener is a crucial component in the entire Oracle Database ecosystem and is one of its more vulnerable elements. Ensuring that the listener is well protected from threats and attacks ensures that the entire Oracle Database instance remains secure and protected from security vulnerabilities and threats, both internal and external.

Citation Credits: www.integrigy.com, joordsblog.vandernoord.eu, www.stigviewer.com
