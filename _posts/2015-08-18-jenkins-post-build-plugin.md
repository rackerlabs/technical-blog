---
layout: post
title: "Jenkins Post-build Plugin"
date: 2015-08-18 14:00
comments: true
author: Priti Changlani
published: true
categories:
    - jenkins
    - plugin
    - api
    - coverage
---
This is the first part of a two part tutorial series to develop and Jenkins plugin
(specifically, Jenkins post-build plugin). Jenkins is a very popular continuous
integration tool and with the small amount of (scattered!) information present
 out there, it is really hard for a beginner to dive in this amazing area of extending
 it - Plugins!

<!-- more -->

This part of the tutorial talks about Jenkins plugins as a whole - what projects are
they, how they are created, what do they depend on, how do you run them, et al. So
let's get started!

1. [Setting Up](#setting-up)
1. [Creating the Plugin](#creating-the-plugin)
1. [Understanding the Project Structure](#understanding-the-project-structure)
1. [Debugging the plugin](#debugging)
1. [Introduction to Part 2](#intro-to-part-2)

## <a name="setting-up"></a>Setting Up

Jenkins plugins are basically [Maven](https://maven.apache.org/) projects
with Java modules and therefore the first and foremost requirement is to
have compatible JDK and Maven versions.

For the plugin here:

JDK: [jdk1.7.0_79.jdk](http://www.oracle.com/technetwork/java/javase/downloads/jre7-downloads-1880261.html)

Maven: [apache-maven-3.3.3](https://maven.apache.org/download.cgi)

Jenkins: [Installation](https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins)

IDE: [IntelliJ IDEA 14.1.4](https://www.jetbrains.com/idea/download/)

The next thing would be to configure maven for the user. Navigate to your
`${user.home}/.m2/settings.xml` and add the following <localRepository> tag to
 the `<settings>` block

    <localRepository>/path/to/local/repo/</localRepository>

 This path is the directory where all the maven dependencies would be
 downloaded and a good practice is to have the default value `${user.home}/.m2/repository/`

For developing a Jenkins plugin, developers need to have a `<pluginGroup>` and a
jenkins `<profile>` in the `${user.home}/.m2/settings.xml`. Post these
additions, the `settings.xml` should look like:

    <settings>
      <localRepository>/path/to/local/repo/</localRepository>
      <pluginGroups>
        <pluginGroup>org.jenkins-ci.tools</pluginGroup>
      </pluginGroups>

      <profiles>
        <!-- Give access to Jenkins plugins -->
        <profile>
          <id>jenkins</id>
          <activation>
            <activeByDefault>true</activeByDefault> <!-- change this to false, if you don't like to have it on per default -->
          </activation>
          <repositories>
            <repository>
              <id>repo.jenkins-ci.org</id>
              <url>http://repo.jenkins-ci.org/public/</url>
            </repository>
          </repositories>
          <pluginRepositories>
            <pluginRepository>
              <id>repo.jenkins-ci.org</id>
              <url>http://repo.jenkins-ci.org/public/</url>
            </pluginRepository>
          </pluginRepositories>
        </profile>
      </profiles>
    </settings>


## <a name="creating-the-plugin"></a>Creating the Plugin

To start with the plugin source code creation, in the terminal type

    mvn hpi:create -Pjenkins

You would be prompted to enter a groupId. We would select the default:

    Enter the groupId of your plugin [org.jenkins-ci.plugins]: org.jenkinsci.plugins

You then need to provide an artifactId for the plugin. This id becomes the
package name for the project and it is a good practice to keep the package
name same as the plugin name (that the end users would see). The suffix
'-plugin' is unnecessary since it is implied that this is a Jenkins plugin.
For the example here, we would name the plugin 'testExample'.

    Enter the artifactId of your plugin (normally without '-plugin' suffix): testExample

You should now have a directory 'testExample' at the path the above command
was executed.

## <a name="understanding-the-project-structure"></a>Understanding the Project Structure

<img class="blog-post right" src="{% asset_path 2015-08-18-jenkins-post-build-plugin/project_structure.png %}"/>
Opening the project in IntelliJ IDEA should display the project structure in the left
pane.

Notice how the `groupId` is appended with the `artifactId` and forms a directory under the
`java` directory. This is the location where the java code resides. Creating a project,
 by default, generates a `HelloWorldBuilder.java` file. The resources for this class,
 if any, should be included under the same directory structure under `resources`
 folder, that
 is, `resources/<groupId>/<artifactId>/<class name>`. This would hold true for all the
 future classes you may write for the plugin.

 In the pom.xml, we will change the following two tag values from 'TODO Plugin' to our
 plugin name and
 description.

    <name>Test Example</name>
    <description>testExample</description>

Tip: Go through the files under
`resources/org/jenkinsci/plugins/testExample/HelloWorldBuilder`
to see which part of the UI they render.
`resources/index.jelly` renders the view on the 'Installed Plugins' page under 'Manage
Plugins'.

## <a name="debugging"></a>Debugging the Plugin

In IntelliJ IDEA, navigate to Run>Edit Configurations>Remote and set the Port to 8000,
which is the default mvnDebug port. Hit 'Apply'
![Debugger Configuration]({% asset_path 2015-08-18-jenkins-post-build-plugin/debug_config.png %})

In the terminal, type the following command:

    user@localhost:~/testExample$ mvnDebug hpi:run
    Preparing to Execute Maven in Debug Mode
    Listening for transport dt_socket at address: 8000

This starts the listener on port 8000. As the message states, maven is ready in
Debug mode. This makes debugging pretty easy. How? We'll see this when we run the plugin.

The next step is to install the plugin, enter the following command in a different
terminal window, in the project directory:

    user@localhost:~/testExample$ mvn install
    .
    . <wait for the processing>
    .
    [INFO] ------------------------------------------------------------------------
    [INFO] BUILD SUCCESS
    [INFO] ------------------------------------------------------------------------

The install command installs all the maven dependencies (if not installed already)
specified in the `pom.xml` and generated the `target` and the `work` directories. It also
generates the `target/testExample.hpi` file which is a complete package for the plugin
code. To debug, you can just import this file in Jenkins (Manage Jenkins>Manage
Plugins>Advanced), however there is a much simpler way shown below to do this without the
import.

Use the following command to run the plugin:

    user@localhost:~/testExample$ mvn hpi:run
    .
    .<wait for the processing>
    .
    INFO: Jenkins is fully up and running

When you see the above info message, type
http://localhost:8080/jenkins/pluginManager/installed in your browser and notice that
the plugin is now present in the installed plugin list. This is where the debugger,
running in the background,
performed its magic!

## <a name="intro-to-part-2"></a>Introduction to Part 2

The auto-generated testExample project is an example of a Jenkins build plugin and you may
 see
that the class `HelloWorldBuilder.java` extends the class `hudson.tasks.Builder`, however,
in the upcoming part 2 of this tutorial, we will create a post-build plugin and therefore
extend the class `hudson.tasks.Recorder` and make the `Extension` class
`DescriptorImpl` extend the class `BuildStepDescriptor<Publisher>` instead of
`BuildStepDescriptor<Builder>`

