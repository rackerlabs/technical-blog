---
layout: post
title: "How to use the Appdeploy Filesystem hook"
date: 2021-01-08
comments: true
author: Matt Charoenrath 
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-U0118EALE77-fa48a7c11b02-72'
bio: "Marketing leader experienced in growing brands while scaling, and 
modernizing marketing organizations through a balance of creativity, 
process, and technology to captivate audiences and achieve results."
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "How to use the Appdeploy Filesystem hook"
metaDescription: "It seems as if the appdeploy filesystem hooks go largely unnoticed with Amazon Elastic Beanstalk, so we set to find out more about this system and how it can be used more effectively."
ogTitle: "How to use the Appdeploy Filesystem hook"
ogDescription: "It seems as if the appdeploy filesystem hooks go largely unnoticed with Amazon Elastic Beanstalk, so we set to find out more about this system and how it can be used more effectively."
slug: "how-to-use-the-appdeploy-filesystem-hook"
canonical: https://onica.com/blog/how-to/appdeploy-filesystem-hook/

---

*Originally published in Apr 2017, at Onica.com/blog*

It seems as if the Appdeploy Filesystem hooks go largely unnoticed with Amazon Elastic Beanstalk&reg;, so we set to find out more about this system and how to use it more effectively.

<!--more-->

### Working with Filesystem hooks in Amazon Elastic Beanstalk&reg;

It seems as if the Appdeploy Filesystem hooks go largely unnoticed with [Amazon Elastic Beanstalk](https://onica.com/blog/how-to-call-and-export-variables-in-elastic-beanstalk), so we set to find out more about this system and how to use it more effectively.

Here is an example of a tree output from a base PHP AMI. Many of these directories and file names are well-named so we can make educated guesses as to what they do:

    $ tree /opt/elasticbeanstalk/hooks/
    /opt/elasticbeanstalk/hooks/
    ├── appdeploy
    │   ├── enact
    │   │   ├── 01_flip.sh
    │   │   └── 99_reload_app_server.sh
    │   ├── post
    │   │   └── 01_monitor_httpd_pid.sh
    │   └── pre
    │       ├── 01_unzip.sh
    │       ├── 02_setup_envvars.sh
    │       ├── 05_configure_php.sh
    │       ├── 10_composer_install.sh
    │       └── 12_update_permissions.sh
    ├── configdeploy
    │   ├── enact
    │   │   └── 99_reload_app_server.sh
    │   ├── post
    │   └── pre
    │       ├── 10_setup_envvars.sh
    │       └── 20_configure_php.sh
    ├── postinit
    ├── preinit
    │   ├── 01_setup_envvars.sh
    │   ├── 02_web_user.sh
    │   ├── 03_packages.sh
    │   ├── 04_configure_php.sh
    │   ├── 05_composer.sh
    │   ├── 10_layout.sh
    │   ├── 11_logging.sh
    │   ├── 22_pear.sh
    │   ├── 23_apache.sh
    │   └── 30_permissions.sh
    └── restartappserver
       ├── enact
       │   └── 01_restart.sh
       ├── post
       └── pre
           └── 10_configure_php.sh

`appdeploy/post`

In this blog post, we will focus on the `appdeploy` directory. We use Appdeploy Filesystem hook, especially the `post` directory when we want to fire off a script that takes place after the application has been deployed.

For example, we want to install a custom varnish daemon into our Beanstalk server with a custom `.ebextensions/xxx.config` file:

   $commands: 
    create_post_dir: 
     command: "mkdir -p /opt/elasticbeanstalk/hooks/
   appdeploy/post" 
     ignoreErrors: true 
   files: 
     "/opt/elasticbeanstalk/hooks/appdeploy/post/
   varnish_script.sh": 
      mode: "000770" 
      owner: root 
      group: root 
      content: | #!/bin/bash echo 
   "--------Starting Varnish Script------------" 
    #### change this to "restart" to flush cache 

      on every deploy 
      start_cmd="reload" 
      if ! which varnishd >/dev/null 
   2 1 ; then 
        echo "Installing Varnish" 
        rpm --nosignature -i  
   https://repo.varnish-cache.org/redhat/
   varnish-4.1.el6.rpm 
      yum install -y varnish  
           --disablerepo=amzn-updates  
           --disablerepo=amzn-main  
           --enablerepo=epel 
         start_cmd="start" 
       fi 
       echo "Starting Varnish" 
       service varnish ${start_cmd} 
       service varnishncsa ${start_cmd} 
       rm -- "$0"

Notice how we use commands to make sure the directory is there? We have found on some older EB AMIs the directory may not exist, so we create it while ignoring errors &mdash;the `-p` should ignore the error, but we add the extra `ignoreErrors` just to be complete.

When you unzip the application, the `/opt/elasticbeanstalk/hooks/appdeploy/post/varnish_script.sh` file drops into place but doesn't execute when a command would be. The script is set to be executable and Elastic Beanstalk handles the rest, the HTTPS server restarts, executes the script, and runs `post/01_monitor_httpd_pid.sh`.

Also, notice the `rm -- "$0"` at the end of this script. That tells the script to delete itself. If you don't remove the script it will be left over in subsequent installations &mdash;especially if you remove it from your `.ebextensions/xxx.config` file. If you do not remove the script on every run, or at least manage your system appropriately, you will have inconsistent systems and unintended consequences.

`appdeploy/pre`

Notice that the `01_unzip.sh` is as early as you can get into the hooks. For example, this will run after unzipping:

   files:
     "/opt/elasticbeanstalk/hooks/appdeploy/pre/02-aa.sh":
       mode: "000770"
       owner: root
       group: root
       content: |
         #!/bin/bash
         echo "ran 02-aa" > /tmp/02-aa.txt

You will end up with a `/tmp/02-aa.txt` file because of the last line where we echo `ran 02-aa` into the temp file. Notice how our script ran immediately after the `01_unzip.sh` script:

    $ tree /opt/elasticbeanstalk/hooks/ | head -10 
    /opt/elasticbeanstalk/hooks/
     ├── appdeploy │
     ├── enact
     │ │ ├── 01_flip.sh
     │ │ └── 99_reload_app_server.sh
     │ ├── post
     │ │ └── 01_monitor_httpd_pid.sh
     │ └── pre
     │ ├── 01_unzip.sh
     │ ├── 02-aa.sh
     $ cat /tmp/02-aa.txt 
     ran 02-aa 

`appdeploy/enact`

If you want to do something with the system after swapping around the `/var/app/current` directory but before restarting the webserver, drop in a file between the numbers `01 and 99` (non-inclusive). For example, you might need to have a shell script that works with `/var/app/current` before Apache reloads.

#### All done using the Appdeploy Filesystem hook

Feel free to dive in and create your scripts to figure out exactly when they run. It is easiest to watch `/var/log/eb-activity.log` for when things are complete as it contains some very good logging about what scripts are triggering and in which order.

<a class="cta blue" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click **Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.






{{<img src="Picture1.png" title="" alt="">}}

### Conclusion

<a class="cta purple" id="cta" href="https://www.rackspace.com/sap">Learn more about our SAP services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
