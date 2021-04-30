---
layout: post
title: "Fix performance issues with Workflow Notification Mailer"
date: 2021-04-30
comments: true
author: Dilip Singh
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
metaTitle: "Fix performance issues with Workflow Notification Mailer"
metaDescription: "This post helps you improve the performance and make
notifications appear in real-time."
ogTitle: "Fix performance issues with Workflow Notification Mailer"
ogDescription: "This post helps you improve the performance and make
notifications appear in real-time."
slug: "fix-performance-issues-with-workflow-notification-mailer"

---

When you introduce new business processes to your Oracle&reg; Enterprise Resource
Planning (ERP) systems, you might experience a serious notification bottleneck
at the application server level rather than the mailer level.

<!--more-->

### Introduction

This notification congestion is due to the sudden influx of notifications that
business users don't receive in time or that arrive two to three hours late.

This post helps you improve the performance and make notifications appear in
real-time. The post-process completion of the ERP business notifications should
reach the approver's inbox instantaneously, and the email approval should also
reflect in the system immediately.

### Steps to improve performance

This post offers four possible solutions for your notification performance
problem. After you complete a solution's steps, test the performance and see if
it improved.

#### Solution 1: Manually rebuild the Notification Mailer queue (WF\_NOTIFICATION\_OUT)

1. Stop the Workflow Agent listeners and mailers.
2. Find the tablespace that creates **CORRID** indexes for queue tables:

        sqlplus apps/<apps_pwd>
 
        select distinct tablespace_name
         from dba_indexes,dba_queues
         where index_name='WF_NOTIFICATION_OUT_N1'
         and table_name=queue_table
         and name like 'WF%';

3. Rebuild the mailer's queue:

        sqlplus apps/<apps_pwd> @$FND_TOP/patch/115/sql/wfntfqup APPS <apps_pwd> APPLSYS

4. If the queue rebuild takes more than four or five hours (or never completes),
   run the following query:

       select c.item_type child, decode(c.end_date,null,'OPEN','CLOSED') child_status, c.parent_item_type parent,                       decode(c.parent_item_type,null,'NOPARENT',decode(p.end_date,null,'OPEN','CLOSED')) parent_status, count(*)
        from
        wf_items p,
        wf_items c
        where
        p.item_type(+) = c.parent_item_type
        and p.item_key(+) = c.parent_item_key
        and c.item_type='WFERROR'
        group by c.item_type, decode(c.end_date,null,'OPEN','CLOSED'), c.parent_item_type , decode(c.parent_item_type,null,'NOPARENT',decode(p.end_date,null,'OPEN','CLOSED'))
        order by c.item_type , c.parent_item_type;

   If that query returns one or more items, those items in **WFERROR** status are
   still open, or their parent Workflow item is still open. The program
   *Purge Obsolete Workflow Runtime Data* concurrent request, **FNDWFPR**, purges
   only closed items. You can raise an Oracle Service Request (SR) or see
   [How to Purge WFERROR (System: Error) Workflow Items? (Doc ID 804622.1)](https://support.oracle.com/knowledge/Oracle%20E-Business%20Suite/804622_1.html)
   for help.

5. Recreate the index on the **CORRID** column:

       sqlplus applsys/<applsys_pwd>
 
        CREATE INDEX WF_NOTIFICATION_OUT_N1
        ON WF_NOTIFICATION_OUT(CORRID)
        STORAGE (INITIAL 1M NEXT 1M MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0)
        TABLESPACE &tbs; 

6. When prompted for the tablespace, enter the tablespace name from Step 2.

7. Start the Workflow Agent listeners and mailers.

#### Solution 2: Increase the outbound thread count to two

1. Log in to the Oracle Application Manager and click **Notification Mailer**.
2. If the Notification Mailer service is running, select **Stop** in the right-hand
   corner of the row, and click **Go**.
3. Wait until it stops and the *user deactivated* indication displays.
4. Click **Edit** and **Advanced**.
5. Click **Next**. If the Outbound thread count is `1`, change it to `2`.
6. Click **Next** on the remaining screens.

#### Solution 3: Check that all indexes are present for the WF\_NOTIFICATION\_OUT queue

If an index is missing, add it.

#### Solution 4: Create a new mailer service

The solution has three parts:

##### Part A: Create a new mailer service

 1. Select **Workflow administrator Web Applications Responsibility**.
 2. Select the **Workflow Manager** menu option.
 3. Click on the **Service Components** icon
 4. Click on the **Workflow Mailer Service** link in the **Container** column.
 5. Click **Create New**.
 6. Enter the following parameters:
     - **Enabled**: check this flag.
     - **Manager**: Enter the Mailer service name (such as Mailer Service HR).
     - **Short Name**: HR_MLR.
     - **Application**: Application Object Library.
 7. Click **Add** from **Available Shifts**.
 8. Move the **Standard: Active 24 hours** everyday shift from left to right.
 9. Click **OK**.
 10. Click **Save**.

##### Part B: Create a new mailer and link it to the new mailer service from Part A

 1. Select **Workflow Administrator Web Applications Responsibility**.
 2. Select the **Workflow Manager** menu option.
 3. Click the **Notification Mailers** icon.
 4. Click  **Create** on the right-hand side.
 5. Select **Workflow Mailer**.
 6. Click **Continue**.
 7. Enter the **Name**, such as `HR_MLR`, and enter the rest of the values on that page.
 8. Click **Advanced**.
 9. Enter the **Correlation id**: `HXCEMP:%`.
 10. Enter the rest of the parameters with the same values as in the seeded WF
     Mailer except the Container, which you should set to the Workflow Service
     created in step# A. This is a crucial step. If you don't select this service,
     the solution won't work.
 11. Click **Finish**.

##### Part C: Make sure the mailer service linked properly

After completing the previous parts, run the following query to find out if the
**HR_MLR New Mailer** service is linked to the new **HR_MLRMailer**:

        select fcq.USER_CONCURRENT_QUEUE_NAME Mailer_Service,
          fcq.ENABLED_FLAG ENABLED, fsc.COMPONENT_NAME Mailer_Name,
          fsc.STARTUP_MODE, fsc.COMPONENT_STATUS
        from APPS.FND_CP_SERVICES fcs,fnd_svc_components fsc, APPS.FND_CONCURRENT_QUEUES_VL fcq
         where fcs.SERVICE_HANDLE = 'FNDCPGSC'
         and fsc.component_type = 'WF_MAILER'
         and fsc.concurrent_queue_id = fcq.concurrent_queue_id(+)
         order by fsc.STARTUP_MODE;

**Note**:  If, after creating a new workflow mailer service, you find genuine
emails going into the DISCARD folder, see
[Workflow Mailer Randomly Moves Response E-mail Notifications to the Discard Folder (Doc ID 333444.1)](https://support.oracle.com/knowledge/Oracle%20E-Business%20Suite/333444_1.html).
You probably have not created separate IMAP accounts for each mailer.

### Conclusion

This post presented four solutions to Oracle ERP notification performance issues,
from rebuilding the queue to creating a new queue.  Hopefully, these options
solve your problems.

<a class="cta purple" id="cta" href="https://www.rackspace.com/sap">Learn more about our ERP services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Let's Talk** to [start the conversation](https://www.rackspace.com/).
