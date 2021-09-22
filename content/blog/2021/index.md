---
layout: post
title: "Cloning a database using the DBCA command in Oracle 19c"
date: 2021-09-23
comments: true
author: Santosh Kumar
authorAvatar: 'https://www.gravatar.com/ask2santosh/0d3c022f6dc5245d2602222d67cf86fa'
bio: ""
published: true
authorisRacker: true
categories: 
- Oracle
- Database
metaTitle: "Cloning a database using the DBCA command in Oracle 19c"
metaDescription: "This blog introduces the methods on how to use Database Configuration Assistant (DBCA), a new feature in Oracle 19c to clone a remote pluggable database (PDB) into a container database (CDB) without taking backup of the source database."
ogTitle: "Cloning a database using the DBCA command in Oracle 19c"
ogDescription: "This blog introduces the methods on how to use Database Configuration Assistant (DBCA), a new feature in Oracle 19c to clone a remote pluggable database (PDB) into a container database (CDB) without taking backup of the source database."
slug: " cloning-a-database-using-the-DBCA-command-in-Oracle-19c" 

---

This blog introduces the methods on how to use Database Configuration Assistant (DBCA), a new feature in Oracle 19c to clone a remote pluggable database (PDB) into a container database (CDB) without taking backup of the source database.

<!--more-->

It takes minimal time to clone from source to target.

### Source DB details
CDB: LCONCDB
PDB: LCON
<img src="Picture1.png" title="" alt="">
The following are the total no. of DBF files under each container (CDB and PDB) in source, that need to be validated after clone is in the target.
<img src=Picture2.png title="" alt="">
From the above source DB, you will create CDB and PDB in the target host.
### Target DB Details
CDB: - KCONCDB
PDB: - KCON

Pre-steps to be completed include:-
1.	Install Oracle Database 19c in the target host, or you can create RDBMS19c tar from source and untar in the target node. Or you can use rsync command from source to target to make the RDBMS same as the source.
2.	Create xml file to run perl adclonectx.pl and provide details. After 19c RDBMS install/create, you need to create context file for target DB node. Following is the command to create the context file in the target DB node. 

`[oraki@nglusnj bin]$ perl adclonectx.pl \`
`> contextfile=/u02/oracle/KCON/product/19.3/appsutil/NYAPP_nglusnj.xml`
                     `Copyright (c) 2011, 2015 Oracle Corporation`
                        `Redwood Shores, California, USA`

                        Oracle E-Business Suite Rapid Clone

                                 Version 12.2

                      adclonectx Version 120.30.12020000.22`

``Running:
/u02/oracle/KCON/product/19.3/appsutil/clone/bin/../jre/bin/java -Xmx600M -Doracle.jdbc.autoCommitSpecCompliant=false -classpath /u02/oracle/KCON/product/19.3/appsutil/clone/bin/../jlib/ojdbc8.jar:/u02/oracle/KCON/product/19.3/appsutil/clone/bin/../jlib/xmlparserv2.jar:/u02/oracle/KCON/product/19.3/appsutil/clone/bin/../jlib/java: oracle.apps.ad.context.CloneContext  -e /u02/oracle/KCON/product/19.3/appsutil/NYAPP_nglusnj.xml -tmpl /u02/oracle/KCON/product/19.3/appsutil/clone/bin/../context/db/adxdbctx.tmp``

Enter the APPS password :

``Log file located at /u02/oracle/KCON/product/19.3/appsutil/clone/bin/CloneContext_0227034250.log``

Provide the values required for creation of the new Database Context file.

``Target System Hostname (virtual or normal) [nglusnj] : nglusnj ``

It is recommended that your inputs are validated by the program.
However you might choose not to validate them under following circumstances:

        -If cloning a context on source system for a remote system.
        -If cloning a context on a machine where the ports are taken and
         you do not want to shutdown the services at this point.
        -If cloning a context but the database it needs to connect is not available.

``Do you want the inputs to be validated (y/n) [n] ? : n``

``Target System Base Directory : /u02/oracle/KCON``

``Target Instance is RAC (y/n) [n] :``

``Target System CDB Name : KCONCDB``

``Target System PDB Name : KCON``

``Oracle OS User [oraki] :``

``Oracle OS Group [dba] :``

``Role separation is supported y/n [n] ? : n``

``Number of DATA_TOP's on the Target System [2] :``

``Target System DATA_TOP Directory 1 [/u02/oracle/KCON/NYAPPCDB] : /u02/oracle/KCON/KCONCDB``

``Target System DATA_TOP Directory 2 [/u02/oracle/KCON/data] :``

``Specify value for OSBACKUPDBA group [dba] :``

`Specify value for OSDGDBA group [dba] :`

`Specify value for OSKMDBA group [dba] :`

`Specify value for OSRACDBA group [dba] :`

`Target System RDBMS ORACLE_HOME Directory [/u02/oracle/KCON/19.0.0] : /u02/oracle/KCON/product/19.3`

`Do you want to preserve the Display [nglusnj:0.0] (y/n)  : y`

`Target System Port Pool [0-99] : 20
Report file located at /u02/oracle/KCON/product/19.3/appsutil/temp/portpool.lst`

`New context path and file name [/u02/oracle/KCON/product/19.3/appsutil/KCON_nglusnj.xml] :
/u02/oracle/KCON/product/19.3/appsutil/KCON_nglusnj.xml file already exists.`

`Do you want to overwrite it (y/n) [n] ? : y`
`Replacing /u02/oracle/KCON/product/19.3/appsutil/KCON_nglusnj.xml file.
The new database context file has been created :
  /u02/oracle/KCON/product/19.3/appsutil/KCON_nglusnj.xml
contextfile=/u02/oracle/KCON/product/19.3/appsutil/KCON_nglusnj.xml
Check Clone Context logfile /u02/oracle/KCON/product/19.3/appsutil/clone/bin/CloneContext_0227034250.log for details.
[oraki@nglusnj bin]$ perl`

3.	Once you have created the context file in the target DB node, you need to configure 19C RDBMS to run adcfgclone in the target DB node and pass the context file, which you have created above. Following example covers the steps to run the command. 


`[oraki@nglusnj bin]$ perl adcfgclone.pl dbTechStack /u02/oracle/KCON/product/19.3/appsutil/KCON_nglusnj.xml`

                     Copyright (c) 2002, 2015 Oracle Corporation
                        Redwood Shores, California, USA

                        Oracle E-Business Suite Rapid Clone

                                 Version 12.2

                      adcfgclone Version 120.63.12020000.65

Enter the APPS password :


`Running Rapid Clone with command:`

`Running:`
`perl /u02/oracle/KCON/product/19.3/appsutil/clone/bin/adclone.pl java=/u02/oracle/KCON/product/19.3/appsutil/clone/bin/../jre mode=apply stage=/u02/oracle/KCON/product/19.3/appsutil/clone component=dbTechStack method=CUSTOM dbctxtg=/u02/oracle/KCON/product/19.3/appsutil/KCON_nglusnj.xml showProgress contextValidated=false`


`Beginning rdbms home Apply - Sat Feb 27 04:25:16 2021`

`/u02/oracle/KCON/product/19.3/appsutil/clone/bin/../jre/bin/java -Xmx600M -Doracle.jdbc.autoCommitSpecCompliant=false -DCONTEXT_VALIDATED=false -Doracle.installer.oui_loc=/u02/oracle/KCON/product/19.3/oui -classpath /u02/oracle/KCON/product/19.3/appsutil/clone/jlib/xmlparserv2.jar:/u02/oracle/KCON/product/19.3/appsutil/clone/jlib/ojdbc8.jar:/u02/oracle/KCON/product/19.3/appsutil/clone/jlib/java:/u02/oracle/KCON/product/19.3/appsutil/clone/jlib/oui/OraInstaller.jar:/u02/oracle/KCON/product/19.3/appsutil/clone/jlib/oui/ewt3.jar:/u02/oracle/KCON/product/19.3/appsutil/clone/jlib/oui/share.jar:/u02/oracle/KCON/product/19.3/appsutil/clone/jlib/oui/srvm.jar:/u02/oracle/KCON/product/19.3/appsutil/clone/jlib/ojmisc.jar   oracle.apps.ad.clone.ApplyDBTechStack -e /u02/oracle/KCON/product/19.3/appsutil/KCON_nglusnj.xml -stage /u02/oracle/KCON/product/19.3/appsutil/clone   -showProgress
APPS Password : Log file located at /u02/oracle/KCON/product/19.3/appsutil/log/KCON_nglusnj/ApplyDBTechStack_02270425.log`
`  |      0% completed`

`Log file located at /u02/oracle/KCON/product/19.3/appsutil/log/KCON_nglusnj/ApplyDBTechStack_02270425.log`
  -  `0% completed`

`Completed Apply...`

4.	Source CDB with PDB should be in the archive log mode.

You need to make sure that the source DB is in an archive log mode.

5.	Run DBCA command on the target node to clone CDB and PDB in VNC.


SYNTAX:

`./dbca -silent -createDuplicateDB -gdbName {CLONE_DB_NAME} -primaryDBConnectionString <hostname:port/service> -sid  {CLONE_DB_SID} -databaseConfigType SINGLE -initParams db_unique_name={CLONE_DB_NAME}  -sysPassword {PRIMARY_DB_SYS_PWD} -datafileDestination {CLONE_DATAFILE_LOC}`

`[oraki@nglusnj ~]$ dbca -silent -createDuplicateDB -gdbName KCONCDB -sid KCONCDB -primaryDBConnectionString nglusnj:1551/LCONCDB -databaseConfigType SI -initParams db_unique_name=KCONCDB -sysPassword LCON5yspwd! -datafileDestination /u02/oracle/KCON/product/oradata/KCONCDB`

*-gdbName = Target Global Database Name.
*-sid= Target sid Name
*-primaryDBConnectionString = Source connection String..
*-databaseConfigType = SI means Single Instance
*-initParams db_unique_name = Target db unique name
*-sysPassword = sys user password.
*-datafileDestination =  dbf file location in target.

<img src=Picture3.png title="" alt="">
Now both CDB and PDB have been created.

<img src=Picture4.png title="" alt="">
6.	Rename the PDB as the PDB has the same name as the source DB name. The following steps will help you to rename the PDB.

``SQL> alter session set container=LCON;``

Session altered.

`SQL> shutdown immediate;`
`Pluggable Database closed.`
`SQL> startup open restrict;`
`Pluggable Database opened.`
`SQL> alter pluggable database LCON rename global_name to KCON;`

`Pluggable database altered.`

`SQL> shutdown immediate;
Pluggable Database closed.
SQL> alter database open;`

Database altered.

With this the cloning is complete. You need to validate and match the DBF file from the source. The DBF file count should be same.
<img src=Picture5.png title="" alt="">

### Conclusion

Cloning PDBs Using DBCA, a new feature in Oracle 19c in silent mode is the simplest way to clone the database in a minimal time. You are not required to take backup of the source database and copy that backup pieces to the target host for cloning which also helps save time. 



