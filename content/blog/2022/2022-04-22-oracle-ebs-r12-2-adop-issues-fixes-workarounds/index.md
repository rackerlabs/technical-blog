---
layout: post
title: "Oracle EBS R12.2 ADOP Issues Fixes/Workarounds"
date: 2022-04-22
comments: true
author:Vijaya Kumar Dosapati 
authorAvatar: 'https://www.gravatar.com/avatar/7e15e65271e4e139033afaf7dbe8a3ed'
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
    - Database
metaTitle: "Oracle EBS R12.2 ADOP Issues Fixes/Workarounds"
metaDescription: "In this blog I have discussed fixes/workaround issues faced by our customers on ADOP."
ogTitle: "Oracle EBS R12.2 ADOP Issues Fixes/Workarounds"
ogDescription: "In this blog I have discussed fixes/workaround issues faced by our customers on ADOP."
slug: "oracle-ebs-r12-2-adop-issues-fixes-workarounds"

---

In this blog I have discussed fixes/workaround issues faced by our customers on ADOP.
<!--more-->

Following is the list of occurred issues: 
1.	FS_CLONE/Prepare issues due to missed Patch Context File on DB 
2.	FS_CLONE/Prepare due to less /usr/tmp Space 
3.	FS_CLONE while wlst2apply apply 
4.	Node Abandon 
5.	Invalid Cross References 


### FS_CLONE/Prepare issue due to missed Patch Context File on DB 
As part of cloning process, sometime, we ignore running autoconfig on Patch File system to gain time of delivering clone instance, and this leads to patch context files missing on the database. While running ADOP database context files get validated. However, due to unavailability of patch file system context files in database we get the following error. 

Screenshot of the error: 
<img src=Picture1.png title="" alt="">

Logfile Error details: 

Validating configuration on node: [Appl_Host].

    Log: /u01-DEV/app/appti/DEV/fs_ne/EBSapps/log/adop/98/20220131_021858/fs_clone/validate/Appl_Host
    [UNEXPECTED]Error occurred running "perl /u01-DEV/app/appti/DEV/fs1/EBSapps/appl/ad/12.0.0/patch/115/bin/txkADOPValidations.pl  -contextfile=/u01-DEV/app/appti/DEV/fs1/inst/apps/DEV_Appl_Host/appl/admin/DEV_Appl_Host.xml -patchctxfile=/u01-DEV/app/appti/DEV/fs2/inst/apps/DEV_Appl_Host/appl/admin/DEV_Appl_Host.xml -phase=fs_clone -logloc=/u01-DEV/app/appti/DEV/fs_ne/EBSapps/log/adop/98/20220131_021858/fs_clone/validate/Appl_Host -promptmsg=hide"
    [UNEXPECTED]Error 1 occurred while Executing txkADOPValidation script on Appl_Host


Check Validation log:

<img src=Picture2.png title="" alt="">


Screenshot of Error: 

<img src=Picture3.png title="" alt="">


`NONPROD [appti@Appl_Host Appl_Host]$ cat txkADOPValidations.error
Use of uninitialized value $result in split at /u01-DEV/app/appti/DEV/fs1/EBSapps/appl/au/12.0.0/perl/TXK/ADOPValidationUtils.pm line 1294.
No such file or directory at /u01-DEV/app/appti/DEV/fs1/EBSapps/appl/au/12.0.0/perl/TXK/ADOPValidationUtils.pm line 230.`

**Issue:** Issue occurred due to no Contextfile of Patch context file in fnd_oam_context_files . Use the following query to check Patch context file: 

<img src=Picture4.png title="" alt="">

SQL> select * from FND_OAM_CONTEXT_FILES

where NAME not in ('TEMPLATE','METADATA','config.txt')

and CTX_TYPE='A'

and (status is null or upper(status) in ('S','F'))

and EXTRACTVALUE(XMLType(TEXT),'//file_edition_type') = 'patch';  2    3    4    5

no rows selected

**Fix**:

Upload Patch Context to DB using the following command:

`Source Run file environment 
$ADJVAPRG oracle.apps.ad.autoconfig.oam.CtxSynchronizer action=upload contextfile=<fulle patch of Patch Contex_file> logfile=<fulle path of logfile> 
$ADJVAPRG oracle.apps.ad.autoconfig.oam.CtxSynchronizer action=upload contextfile=/u01-DEV/app/appti/DEV/fs2/inst/apps/DEV_Appl_Host/appl/admin/DEV_Appl_Host.xml logfile=/tmp/patch_context_upload.log`

<img src=Picture5.png title="" alt="">

SQL> select path from FND_OAM_CONTEXT_FILES

where NAME not in ('TEMPLATE','METADATA','config.txt')

and CTX_TYPE='A'

and (status is null or upper(status) in ('S','F'))

and EXTRACTVALUE(XMLType(TEXT),'//file_edition_type') = 'patch';  2    3    4    5

PATH
--------------------------------------------------------------------------------
/u01-DEV/app/appti/DEV/fs2/inst/apps/DEV_Appl_Host/appl/admin/DEV_Appl_Host.xml
 Query with Output : 

<img src=Picture6.png title="" alt="">

Now FS_CLONE should complete fine 

### FS_CLONE/Prepare errors due to less /usr/tmp Space 

Due to less /usr/tmp space on the host, you may encounter the following error while running adop fs_clone or in the prepare stage


Error details:
START: Creating FMW archive.

`Running /u01-DEV/app/appti/DEV/fs1/FMW_Home/oracle_common/bin/copyBinary.sh -javaHome /u01-DEV/app/appti/DEV/fs1/EBSapps/comn/adopclone_Appl_Host/FMW/t2pjdk -al /u01-DEV/app/appti/DEV/fs1/EBSapps/comn/adopclone_Appl_Host/FMW/FMW_Home.jar -smw /u01-DEV/app/appti/DEV/fs1/FMW_Home -ldl /u01-DEV/app/appti/DEV/fs1/inst/apps/DEV_Appl_Host/admin/log/clone/fmwT2PStage -invPtrLoc /etc/oraInst.loc -silent true -debug true
Script Executed in 27558 milliseconds, returning status 255
ERROR: Script failed, exit code 255`

Screenshot of the error:

<img src=Picture7.png title="" alt="">

Issue: Insufficient space in /usr/tmp  . Require Min 15G free space . 

**Fix**:

Create a directory with 16G available space 

`mkdir -p /u02-DEV/app/appti/DEV/temp

T2P_JAVA_OPTIONS="-Djava.io.tmpdir=/u02-DEV/app/appti/DEV/temp"

TMP=/u02-DEV/app/appti/DEV/temp

TEMP=/u02-DEV/app/appti/DEV/temp

TMPDIR=/u02-DEV/app/appti/DEV/temp

export T2P_JAVA_OPTIONS

export TMP

export TEMP

export TMPDIR`

Now rerun FS_CLONE 

### FS_CLONE while  wlst2apply  apply 


ADOP FS_CLONE/Prepare running creating wlst2apply errors out due to less JVM memory. 

Error details: 
 .jar -server_start_mode=prod -log=/u01-DEV/app/appti/DEV/fs1/inst/apps/DEV_Appl_Host/logs/appl/rgf/TXK/CLONINGCLIENT7100708042842072347/unpack.log -log_priority=debug
<< read template from "/u01-DEV/app/appti/DEV/fs1/inst/apps/DEV_Appl_Host/logs/appl/rgf/TXK/CLONINGCLIENT7100708042842072347/packed_template.jar"
>>  succeed: read template from "/u01-DEV/app/appti/DEV/fs1/inst/apps/DEV_Appl_Host/logs/appl/rgf/TXK/CLONINGCLIENT7100708042842072347/packed_template.jar"
<< set config option ServerStartMode to "prod"
>>  succeed: set config option ServerStartMode to "prod"
<< write Domain to "/u01-DEV/app/appti/DEV/fs2/FMW_Home/user_projects/domains/EBS_domain"
Exception in thread "Thread-1" java.lang.OutOfMemoryError: Java heap space
        at java.util.Arrays.copyOfRange(Arrays.java:2694)
        at java.lang.String.<init>(String.java:203)
        at java.io.BufferedReader.readLine(BufferedReader.java:349)
        at java.io.BufferedReader.readLine(BufferedReader.java:382)
        at com.oracle.cie.common.util.CRLF.readData(CRLF.java:129)
        at com.oracle.cie.common.util.CRLF.processFile(CRLF.java:67)
        at com.oracle.cie.common.util.CRLF.process(CRLF.java:57)
        at com.oracle.cie.domain.util.stringsub.SubsScriptHelper.processCRLF(SubsScriptHelper.java:167)
        at com.oracle.cie.domain.DomainGenerator.generate(DomainGenerator.java:478)
        at com.oracle.cie.domain.script.ScriptExecutor$2.run(ScriptExecutor.java:2991)

**Issue**:

Insufficient JVM heap size  to complete fs_clone

**Fix**:

`export CONFIG_JVM_ARGS="-Xmx2048m 
-Xms1024m -XX:MaxPermSize=512m -XX:-UseGCOverheadLimit"`

Run FS_CLONE 

### Node Abandoned 

When the node gets abandoned during adop in FS_CLONE/PREPARE, you can fix the abandoned node by:

**Note**: Try this workaround only with issues in the FS_CLONE, PREPARE phase. If the issue occurs in Cutover phase in multi node environment try Standard process of Deleting and Adding Abandoned Node 

**Error:**

Checking for existing adop sessions.

No pending session exists.

Starting new adop session.

[ERROR] Nodes Appl_Host_Admin,Appl_Host_EXternal were abandoned in previous patching cycle

[ERROR] To recover these nodes, follow the instructions in My Oracle Support Knowledge Document 1677498.1

[UNEXPECTED]Unrecoverable error occurred. Exiting current adop session.

**Fix**:

a)	Get current adop_session_id  from ad_adop_sessions table . 
select * from ad_adop_sessions order by adop_session_id desc;

b)	Take backup of ad_adop_sessions
Create table applsys.ad_adop_sessions_bkp21jan22 as select * from ad_adop_sessions;

c)update ad_adop_sessions set abandon_flag=null where adop_session_id=156;
Then run **adop -validate*** to check all nodes are validated successfully                                                 


### Invalid Cross References 

--------------------------------------------
ValidateOHSConfigFilesForCrossRef ...
-------------------------------------------

        WARNING: File - /u01-DEV/app/appti/DEV/fs2/FMW_Home/webtier/instances/EBS_web_OHS1/bin/opmnctl contains cross reference in it.
        WARNING: File - /u01-DEV/app/appti/DEV/fs2/FMW_Home/webtier/instances/EBS_web_OHS1/bin/opmnctl contains cross reference in it.
        WARNING: File - /u01-DEV/app/appti/DEV/fs2/FMW_Home/webtier/instances/EBS_web_OHS1/bin/opmnctl contains cross reference in it.
        Corrective Action: Contact Oracle Support to identify the best course of action.

<img src=Picture8.png title="" alt="">

Check ADOP Validation Log in $ADOP_LOG_HOME/ 98/20220205_063351/validate/<Appl_Host>
**Fix:**

Correct opmnctl file in $FMW_HOME/ webtier/instances/EBS_web_OHS1/bin  with file system 

Take backup before making changes 

### Conclusion

 The issues listed above are among the most common ones faced by Oracle Apps DBAs during their operations. With these fixes and workarounds, they will be able to run their regular operations more smoothly and effectively. ADOP is one of the most common operations in Oracle Apps. This collection of adop issues and fixes will help Application DBAs when they encounter similar problems


 
<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/oracle">Learn about Rackspace Managed Oracle Applications.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
