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

If you have landed on this blog post then I am sure you are pretty frustrated
with the small amount of documentation available for developing a Jenkins
plugin. I went through the same when I first decided to create one. With this
post, I aim
to provide a consolidated and clean explanation for developing a post-build
plugin which hopefully would serve as an asset for all you future plugin
developers.

<!-- more -->

## Principles for a Successful Developer Workshop

1. [Setting Up](#setting-up)
1. [Creating the Plugin](#creating-the-plugin)
1. [Understanding the Project Structure](#understanding-the-project-structure)
1. [Debugging the plugin](#debugging)
1. [Be Explicit](#be-explicit)
1. [Make It Accessible](#make-it-accessible)
1. [Get Help](#get-help)
1. [Get Feedback](#get-feedback)
1. [Do Less](#do-less)
1. [Empathy](#conclusion)

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

For developing a Jenkins plugin, users need to have a `<pluginGroup>` and a
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

You would be prompted to enter a groupId, we would select the default:

    Enter the groupId of your plugin [org.jenkins-ci.plugins]: org.jenkinsci.plugins

You then need to provide an artifactId for the plugin. This id becomes the
package name for the project and it is a good practice to keep the package
name same as the plugin name (that the end users would see). The suffix
'-plugin' is unnecessary since it is implied that this is a Jenkins plugin.
For the example here we would name the plugin 'testExample'

    Enter the artifactId of your plugin (normally without '-plugin' suffix): testExample

You should now have a directory 'testExample' at the path the above command
was executed.

## <a name="understanding-the-project-structure"></a>Understanding the Project Structure

<img class="blog-post right" src="{% asset_path 2015-08-18-jenkins-post-build-plugin/project_structure.png %}"/>Opening the project in IntelliJ IDEA should display the project structure:

Notice how the `groupId` is appended with the `artifactId` and forms a directory under the
`java` directory. This is the location where the java code resides. Creating a project,
 by default, generates a `HelloWorldBuilder.java` file. The resources for this class
 should be included under the same directory structure under `resources` folder, that
 is, `resources/<groupId>/<artifactId>/<class name>`.

 In the pom.xml, we will change the following two tag values from 'TODO Plugin' to our
 plugin name and
 description

    <name>Test Example</name>
    <description>testExample</description>

Tip: Go through the files under `org/jenkinsci/plugins/testExample/HelloWorldBuilder`
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

This starts the listener on port 8000.

The next step is to install the plugin, enter the following command in a different
terminal window:

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
code.

After successful installation, we are now ready to run the plugin on our local Jenkins
instance. Use the following command to run the plugin:

    user@localhost:~/testExample$ mvn hpi:run
    .
    .<wait for the processing>
    .
    INFO: Jenkins is fully up and running

When you see the info message type
http://localhost:8080/jenkins/pluginManager/installed in your browser and notice that
the plugin is now present in the installed plugin list.

## <a name="walk-through-sign-ups"></a>Walk-Through Sign Ups

Speaking of sign ups, walk-through sign ups. The technology you're teaching may involve asking the developers to sign up for some account. It's usually free within some limits or has some credits associated with it. Asking them to sign up for something free is okay and is becoming pretty commonplace.

What isn't okay is not completely walking them through the sign up. Of course you already have an account on the service. You probably haven't had to sign up in ages. You might not be aware of the current sign up process or any steps that might trip up your audience. So walk-through the entire sign up process in front of your audience. Every. Single. Step. Enter your credit card, where you went to high school, and your first pet's name. Then just delete that account after the workshop is over.

## <a name="be-explicit"></a>Be Explicit

Be explicit in all things. If you catch yourself saying "As you probably already know" or any like that, you're doing it wrong. People are there because they don't already know. Here are just a few things you can be explicit about:

* Don't use short parameters on the command line interface. e.g. Prefer 1 over 2.
 1. `docker run --volume=$(pwd):/srv/jekyll --tty=true --publish 4000:4000 jekyll/pages jekyll serve`
 2. `docker run -v=$(pwd):/srv/jekyll -t -p 4000:4000 jekyll/pages jekyll s`
* Use diagrams. Diagrams are very explicit to visual thinkers. I find [Google Drawings](https://support.google.com/docs/topic/1360903?hl=en&ref_topic=1397170) pretty usable and it's easy to collaborate with others.
* Be a bit verbose when it comes to naming things like files, variables, classes, etc.

Always be asking yourself how you can be more explicit. You already know all of the shortcuts but your audience doesn't even know the fundamentals yet.

## <a name="make-it-accessible"></a>Make It Accessible

If your audience can't read/see your presentation, it's very frustrating. Make your content accessible by making sure it's readable and clearly presented without distraction.

1. Contact the conference organizers and find out the projector resolution and aspect ratio, and adjust your presentation accordingly.
1. Know how to zoom text in and out with your browser.
1. Know how to maximize (not full-screen) a window quickly. _Mac Tip_: I use [SizeUp](http://www.irradiatedsoftware.com/sizeup/) to easily maximize and put windows side-by-side.
1. If you're working in a terminal that's displayed by the projector, people at the back of the room won't be able to see what's happening at the bottom of the screen, which is where everything happens. Move the prompt to the top of the screen often. _Mac Tip_: I use [iTerm2](https://www.iterm2.com/) and command+R to do this.
1. Hide browser toolbars and extensions unnecessary for the workshop.
1. Turn off anything that can distract the audience like chat notifications, calendar notifications, etc.
1. Turn off your screen saver. _Mac Tip_: I use [Caffeine](http://lightheadsw.com/caffeine/) for this.

## <a name="get-help"></a>Get Help

<img class="blog-post right" src="{% asset_path 2015-07-28-principles-for-a-successful-developer-workshop/qcon2.jpg %}"/>It's dangerous to go alone! Get help if at all possible. You can't possibly be at the front teaching and be giving hands on help in the audience at the same time. And people will need hands on help.

Have colleagues act as teaching assistants. Depending on the audience, you may want to make an effort to have at least one teaching assistant familiar with Windows. If your colleagues can't make it to the conference, seriously consider reaching out to others you know (or may not know so well) who are attending the conference. Those Developer Advocate/Evangelist/Relations types tend to be a helpful bunch. :) Also, you can always encourage attendees to help each other.

## <a name="get-feedback"></a>Get Feedback

It's usually pretty obvious when a workshop teacher hasn't practiced. The timing is off, the presentation doesn't flow very well, there are bugs in the code, the presentation doesn't match the code, etc.

Get feedback from yourself. Practice alone, practice in front of a rubber duck, practice in front of your cat, whatever it takes. Just get some practice.

Get feedback from others. Practice in front of other people and get their hands on the keyboard. Work on the timing, work on the flow, and hammer out bugs.

## <a name="do-less"></a>Do Less

The temptation is to fit as much as possible into the workshop. You only have a half/full day and you want to cram as much in there as possible. I've definitely been guilty of this one.

Try to do a bit less. If you find yourself running very close to the maximum amount of time during practice, you should seriously consider taking something out. It always takes longer to do it during the workshop. That also gives you more time to pace yourself, to go off on the occasional tangent that particular audience might find interesting, and to take breaks.

If there's more material you want people to get into, give them a "What's Next" section at the end of the presentation. Point them in the direction you want them to go after the workshop. Something they can do to take the material you've given them one step further than what you've taught them.

## <a name="conclusion"></a>Conclusion

It all boils down to empathy. Can you understand and feel what your audience is going through as they take your workshop? Can you feel their frustration when they don't understand something that has been poorly presented? Can you share their aha moment when the material finally clicks?

Put yourself in your audience's shoes. Literally envision yourself taking your own workshop. You already know the material so well that it's particularly hard to do this, which is why it is all the more necessary. Ask yourself if you really understand what these people are going through.
