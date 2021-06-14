---
layout: post
title: "Recover a physical standby database by using an incremental backup"
date: 2021-06-15
comments: true
author: Dishant Singh
authorAvatar: 'https://s.gravatar.com/avatar/63d8415cb98789eeca859cb4823bc966'
bio: "I specialize in the following areas: Oracle APPS DBA 11i+R12, DBA,
PMEC™, and LSSWB™. I also have Oracle cloud certifications (Infrastructure
Architect Associate, Autonomous Database Cloud, Infrastructure Operations
Associate, and Infrastructure Foundations)."
published: true
authorIsRacker: true
categories:
    - Database
    - Oracle
metaTitle: "Recover a physical standby database by using an incremental backup"
metaDescription: "A standby database is basically the consistent copy of the
production database, which helps in production disasters, data loss, or corruption."
ogTitle: "Recover a physical standby database by using an incremental backup"
ogDescription: "A standby database is basically the consistent copy of the
production database, which helps in production disasters, data loss, or corruption."
slug: "recover-a-physical-standby-database-by-using-an-incremental-backup"

---

A standby database is basically the consistent copy of the production database,
which helps in production disasters, data loss, or corruption.

<!--more-->

### Introduction

The following reasons might account for a lag between a primary and a standby site:

1. Network bandwidth issues between primary and standby databases.
2. Unavailability of the standby database.
3. Accidental deletion of archive redo data on the primary database.

You can sync primary and standby environments by copying and applying archive
logs from the primary site, but this process is very time-consuming.

Another option is to recover the standby site using incremental RMAN backup of
the primary site. You can also use this method when you have missing archived
logs on the primary that the system never applied to the standby database.

### Steps to recover a physical standby database by using an incremental RMAN backup

To set up this scenario, I manually removed some of the archive logs from the
primary site to simulate corrupt logs or missing logs.

##### Step 1: Check the sync status of primary and standby site

You need to take a quick look at the sync status between the primary (prod) and
standby (stby).

Primary site:

{{<img src="Picture1.png" title="" alt="">}}

</br>

Standby site:

{{<img src="Picture2.png" title="" alt="">}}

</br>

##### Step 2: Simulate a gap between the primary and standby

You need to log on to the primary database and alter **LOG_ARCHIVE_DEST_STATE_2**
to `DEFER`. Then do the same manual log switches to generate some archive logs,
thus creating a gap between primary and standby:

{{<img src="Picture3.png" title="" alt="">}}

</br>

Now, if you take a look at the **CURRENT_SCN** between primary and standby,
obviously, the standby isn't catching up because you have manually disabled the
sync.

Primary site:

{{<img src="Picture4.png" title="" alt="">}}

</br>

Standby site:

{{<img src="Picture5.png" title="" alt="">}}

</br>

If you now re-enable **LOG_ARCHIVE_DEST_STATE_2**, the standby automatically
catches up. But you should not go for that option right away. To create a gap
simulation, you need to delete the archive logs manually from the primary site.

Ensure that in both the sites, you do not have archive logs later than 232 and
218 for threads 1 and 2, respectively.

Now, you need to re-enable **LOG_ARCHIVE_DEST_STATE_2** (set to `ENABLE`):

{{<img src="Picture6.png" title="" alt="">}}

</br>

As expected, the standby cannot continue applying the logs because some of the
logs are missing from the primary site.

Finally, cancel the recovery and shut down the standby instance:

{{<img src="Picture7.png" title="" alt="">}}

</br>

##### Step 3: Incremental backup

Log on to the primary and take an incremental backup from the last SCN applied
at the standby:

{{<img src="Picture8a.png" title="" alt="">}}

{{<img src="Picture8b.png" title="" alt="">}}

{{<img src="Picture8c.png" title="" alt="">}}

</br>

##### Step 4: Back up the standby control file

Now, back up the control file on the standby site:

{{<img src="Picture9.png" title="" alt="">}}

</br>

##### Step 5: Ship the backups across to the standby site

Transfer the incremental backup that you just took to the standby site:

{{<img src="Picture10.png" title="" alt="">}}

</br>

##### Step 6: Restore the standby control file

Restore the control file on the standby site:

{{<img src="Picture11.png" title="" alt="">}}

</br>

**Note**: Ensure that you manually remove the old control files before executing
the preceding commands to confirm that you are using the control files.

Log on as a grid user and remove the old control files:

{{<img src="Picture12a.png" title="" alt="">}}

{{<img src="Picture12b.png" title="" alt="">}}

{{<img src="Picture12c.png" title="" alt="">}}

</br>

##### Step 7: Catalog the backup pieces

Now, catalog the backup process:

{{<img src="Picture13a.png" title="" alt="">}}

{{<img src="Picture13b.png" title="" alt="">}}

{{<img src="Picture13c.png" title="" alt="">}}

{{<img src="Picture13d.png" title="" alt="">}}

</br>

##### Step 8: Catalog existing data files

Also, catalog your existing data files:

{{<img src="Picture14.png" title="" alt="">}}

</br>

##### Step 9: Switch the existing data files

Switch all existing data files to their image copies:

{{<img src="Picture15.png" title="" alt="">}}

</br>

##### Step 10: Recover the database

Now, recover your database:

{{<img src="Picture16a.png" title="" alt="">}}

{{<img src="Picture16b.png" title="" alt="">}}

</br>

This step concludes the standby refresh. Just a few more steps to go!

##### Step 11: Check the sync status

Take a quick look at the sequences across both sites. Notice that the standby 
caught up with the primary:

Primary site:

{{<img src="Picture17.png" title="" alt="">}}

</br>

Standby site:

{{<img src="Picture18.png" title="" alt="">}}

</br>

##### Step-12: Start Media Recovery

Start media recovery on the standby site:

{{<img src="Picture19.png" title="" alt="">}}

</br>

### Conclusion

With the help of the preceding steps, you can recover the standby site. Using an
incremental backup of your production environment saves a considerable amount of
time.

<a class="cta teal" id="cta" href="https://www.rackspace.com/data/databases">Learn more about our Database services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
