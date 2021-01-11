---
layout: post
title: "How to call and export environment variables in AWS Elastic Beanstalk"
date: 2021-01-12
comments: true
author: Rackspace Team
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "How to call and export environment variables in AWS Elastic Beanstalk"
metaDescription: "The AWS Elastic Beanstalk documentation doesn't tell you how to export environment variables or set
top-level shell commands. We use variables for all kinds of things so we decided to create a how-to guide for calling and
viewing environment variables in ebextension config files."
ogTitle: "How to call and export environment variables in AWS Elastic Beanstalk"
ogDescription: "The AWS Elastic Beanstalk documentation doesn't tell you how to export environment variables or set
top-level shell commands. We use variables for all kinds of things so we decided to create a how-to guide for calling and
viewing environment variables in ebextension config files."
slug: "how-to-call-and-export-environment-variables-in-aws-elastic-beanstalk"
canonical: https://onica.com/blog/how-to/aws-elastic-beanstalk-environment-variables/
---

*Originally published in Apr 2017, at Onica.com/blog*

The AWS&reg; Elastic Beanstalk&reg; documentation doesn't tell you how to export environment variables or set
top-level shell commands. We use variables for all kinds of things, so we decided to create a how-to guide for
calling and viewing environment variables in *ebextension* config files.

<!--more-->

In this post, we dive into several ways to export environment variables, set top-level shell commands, and see
how they show up under different circumstances.

### Environment variables in ebextension config files: How to call and export in Elastic Beanstalk

Lets take the following as our `.ebextensions/00-variables.config` file. This is the basis for all of our tests:

    option_settings:
    "aws: elasticbeanstalk:application:environent":
    envvar1: value1

#### `commands` and `container_commands`

`echo`output

The first test is to see how we can use these two in the **commands** and **container_commands**
sections of an ebextensions configuration file:

    commands:
    a00_command_line_test:
    command: "echo $envvar1> /tmp/a00_command_line_test"

    container commands:
    c00_command_line_test:
    command: "echo $envvar1> /tmp/c00_command_line_test"

Here are the results:

    $ cat /tmp/a00_command_line_test

    $ cat /tmp/c00_command_line_test
    value1

The **/tmp/a00_command_line_test** file ends up being empty while 
the latter **/tmp/c00_command_line_test** file has the `value1` value
in it as expected.

You can't see the **envvar1** variable when you use it in **commands**.

To force this you can use the **env:** option along with the **command:** option:

    commands:
        a00_command_line_test:
        command: "echo $envvar1 > /tmp/a00_command_line_test"

    env:

    envvar1: 
        "Fn::GetOptionSetting":
        Namespace: "aws:elasticbeanstalk:application:environment"
        OptionName: envvar1

`get-config` output

The next test we conducted was simply to use the `get-config` command included in 
all Elastic Beanstalk AMIs:

    commands:
      a01_command_line_test:
        command: "/opt/elasticbeanstalk/bin/get-config environment 
    -k envvar1 > /tmp/a01_command_line_test"

    container_commands:
      c01_command_line_test:
        command: "/opt/elasticbeanstalk/bin/get-config environment 
    -k envvar1 > /tmp/c01_command_line_test"

    $ cat /tmp/a01_command_line_test
    value1$

    $ cat /tmp/c01_command_line_test
    value1$

Both files have the variable in it, but there’s no newline. This is due to the `echo`
command above natively adding a newline. We use this command in shell scripts as shown
in the following example:

    somevar=$(/opt/elasticbeanstalk/bin/get-config environment -k envvar1)

`files`

The next tests we did were around the files directive. We created two files&mdash;a bash script and a python script.
Each one tests the ability to do the following actions:

1. Simply just call an environment variable when run.
2. Use the `backtick + curly brace + Fn::GetOptionSetting` command embedded in the file.
3. Use the `get-config` command.

       files:

        "/tmp/00_file_test.sh":
          content: |
            #!/bin/sh
            env_method_1=$envvar1
            echo $env_method_1

       env_method_2=`{"Fn::GetOptionSetting": {"Namespace": 
       "aws:elasticbeanstalk:application:environment", "OptionName": 
          "envvar1", "DefaultValue": "my_default_value"}}`
          echo $env_method_2

       env_method_3=$(/opt/elasticbeanstalk/bin/get-config 
       environment -k envvar1)
          echo $env_method_3

       group: root
       mode: "000755"
       owner: root

       "/tmp/00_file_test.py":
          content: |
          #!/usr/bin/env python
          import os, subprocess

       try: 
       env_method_1 = os.environ['envvar1']
          print(env_method_1)
    
       except:
       print("Failed to get env_method_1")

       try:
       env_method_2 = "`{"Fn::GetOptionSetting": {"Namespace": 
       "aws:elasticbeanstalk:application:environment", "OptionName": 
       "envvar1", "DefaultValue": "my_default_value"}}`"
           print(env_method_2)

       except:
       print("Failed to get env_method_2")

       try:
       env_method_3 = subprocess.check_output
       (['/opt/elasticbeanstalk/bin/get-config', 
       'environment', '-k', 'envvar1'])
            print(env_method_3)

       except:
       print("Failed to get env_method_3")

       group: root
       mode: "000755"
       owner: root

    The result of the `files` directive are these files:

       $ cat /tmp/00_file_test.sh
       #!/bin/sh
       env_method_1=$envvar1
       echo $env_method_1

       env_method_2=value1
       echo $env_method_2

       env_method_3=$
       (/opt/elasticbeanstalk/bin/get-config environment 
       -k envvar1)
       echo $env_method_3

       $ cat /tmp/00_file_test.py
       #!/usr/bin/env python
       import os, subprocess

       try:
       env_method_1 = os.environ['envvar1']
       print(env_method_1)

       except:
       print("Failed to get env_method_1")

       try:
       env_method_2 = "value1"
       print(env_method_2)
    
       except:
       print("Failed to get env_method_2")

       try:
       env_method_3 = subprocess.check_output
       (['/opt/elasticbeanstalk/bin/get-config', 'environment',
        '-k', 'envvar1'])
         print(env_method_3)

       except:
       print("Failed to get env_method_3")

#### It is very important to notice how this affects scripts

In the second test on both the shell script and the python script, the variable is already embedded into the script.
You can run either script at any time under any user, and it always has the right variable there. The variable is 
set when you create the file at deploy time, rather than evaluating the variable when it runs.

If the environment variable changes and this file is not updated&mdash;say you remove it from the **ebextentions**
configuration file, but another script or program can call it&mdash;it will then have the wrong variable in it.

The other two tests: `env_method_1` and `env_method_3` still gather the environment variable when they’re run. Lets
run them under **commands** and **container_commands** and check out the results:

    commands:
        a20_files_test:
            command: /tmp/00_file_test.sh > /tmp/a20_files_test
        a21_files_test:
            command: python /tmp/00_file_test.py > /tmp/a21_files_test

    container_commands:
        c20_files_test:
            command: /tmp/00_file_test.sh > /tmp/c20_files_test

        c21_files_test:
            command: python /tmp/00_file_test.py > /tmp/c21_files_test

    $ cat /tmp/a20_files_test

    value1
    value1

    $ cat /tmp/a21_files_test
    Failed to get env_method_1
    value1
    value1

    $ cat /tmp/c20_files_test
    value1
    value1
    value1

    $ cat /tmp/c21_files_test
    value1
    value1
    value1

As we can see from these results, the **commands** doesn't seem to see the `$envvar1` variable in `env_method_1` of
either script. Otherwise, all scripts pick up all other variables.

Next, we run these as the standard `ec2-user` by using SecureShell&reg; (ssh):

    $ /tmp/00_file_test.sh
    value1
    value1
    Permission denied @ rb_sysopen - 
    /opt/elasticbeanstalk/deploy/configuration/containerconfiguration

    $ python /tmp/00_file_test.py
    value1
    value1
    Permission denied @ rb_sysopen - 
    /opt/elasticbeanstalk/deploy/configuration/containerconfiguration

As you can see, you need to use `sudo` for the `get-config` command. Lets try that:

    $ sudo /tmp/00_file_test.sh

    value1
    value1

    $ sudo python /tmp/00_file_test.py
    Failed to get env_method_1
    value1
    value1

Running them as `root` with `sudo` yields effectively the same results as running under **commands**. However,
if we run them under the webserver user via the actual webserver, we get the following result:

    $ cat /var/app/current/index.php
    <?php
    echo `/tmp/00_file_test.sh`;
    ?>
    $ curl localhost
    value1
    value1

    $ cat /var/app/current/index.php
    <?php
    echo `/usr/bin/python /tmp/00_file_test.py`;
    ?>
    $ curl localhost
    value1
    value1
    Failed to get env_method_3
    $

As you can see, the webserver has the environment variables set, but the `get-config` command is still limited to
the `root` user. Therefore, it fails. 

### All done

Hopefully, these experiments shed some light on how Elastic Beanstalk uses environment variables. We see all tools
as having their place and believe each of the preceding methods has appropriate use cases. It's up to you to determine
which method you want to use in which specific situation.

<a class="cta blue" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click **Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
