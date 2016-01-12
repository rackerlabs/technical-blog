---
layout: post
title: 'Create an indestructible blog with Jekyll, CloudFiles and the PHP SDK'
date: '2014-01-09 13:00'
comments: true
author: Jamie Hannaford
published: true
categories:
  - cloud-files
---

Everyone wants a blog these days, but no-one really wants all the collateral that comes with it: servers, databases, language runtimes, firewalls and load balancers, DNS management, deployment and automation. I've heard about all these mystical characters on the scene, like Vagrant, Docker and Capistrano, but what do they actually do? Sure I can spend hours reading docs but I have more important things to do -- like stare aimlessly at Reddit threads and check out new doge memes.

Blogging needs to be **simple to manage**, **simple to deploy**, and it needs to be **affordable**.

<!-- more -->

In this post, I'll proffer what I hope to be a cool alternative to DIY solutions like Wordpress and Rails, and hosted solutions like Svbtle and Medium. By the end, you'll have a static blog generated from markdown, backed by a powerful CDN that ensures uptime without any of the hassle that usually comes with maintaining cloud infrastructure.

## 1. Install Jekyll

First thing's first: what the hell is Jekyll? To quote the contributors who wrote it:

> Jekyll is a simple, blog aware, static site generator. It takes a template directory (representing the raw form of a website), runs it through Textile or Markdown and Liquid converters, and spits out a complete, static website suitable for serving with Apache or your favorite web server.

Installing Jekyll is really easy and [well documented](http://jekyllrb.com/docs/quickstart/) on their official website. You install the gem:

`gem install jekyll`

Then create a new Jekyll project:

```bash
jekyll new name_of_project
cd name_of_project
```

As you can see, Jekyll will nest this project in its own directory. To test everything's fine and dandy, you can launch Jekyll's in-built server for a quick preview:

`jekyll serve`

Now check out http://localhost:4000 and Hey Presto.

## 2. Install the SDK

So you have your blog ready and waiting -- all you need now is somewhere to host it and a means of deploying it.

This is where Cloud Files and our SDK enter the picture. Using our SDK, you can easily synchronize your local Jekyll directory with a container (a place where assets are stored). Placing a CDN in front of it pretty much makes your blog indestructible - you never have to worry about unnecessarily complex and expensive systems again!

**2a.** Create a place to hold all your deployment scripts:

```bash
mkdir _scripts
cd _scripts
```

**2b.** Install the SDK into this `_scripts` folder:

```bash
curl -sS https://getcomposer.org/installer | php
php composer.phar require rackspace/php-opencloud:dev-master
```

The first line installs Composer, a dependency management system for PHP, and the second line tells Composer to install the SDK. Simples.

You can roll your own deployment scripts using [the SDK's official docs](http://docs.rackspace.com/sdks/guide/content/php.html), or you can use the ones I coded in advance. Here are the files you will need:

- [`options.php`](https://cdfbb6a8434b6b1025a6-cd48ce34bf144dd47f3b21571e953281.ssl.cf5.rackcdn.com/options.php) holds all your config options (Rackspace username, Rackspace API key, etc.)
- [`install.php`](https://cdfbb6a8434b6b1025a6-cd48ce34bf144dd47f3b21571e953281.ssl.cf5.rackcdn.com/install.php) sets up your Cloud Files container, enables the CDN, and if necessary, adds a CNAME record to your main domain. You only need to run this script once as an initial setup.
- [`deploy.php`](https://cdfbb6a8434b6b1025a6-cd48ce34bf144dd47f3b21571e953281.ssl.cf5.rackcdn.com/deploy.php) is the main script you'll use to deploy changes to CloudFiles. You will re-use this every time you want to deploy changes.

You can either download a [zip archive](https://a95b6fcf466121d56e06-db7cec48e060b4467264ed9ced92e83e.ssl.cf5.rackcdn.com/rackspace-jekyll-deploy.zip) of all three, or download each file individually by clicking on their names. Let's be lazy:

```bash
curl -O https://cdfbb6a8434b6b1025a6-cd48ce34bf144dd47f3b21571e953281.ssl.cf5.rackcdn.com/rackspace-jekyll-deploy.zip
unzip rackspace-jekyll-deploy.zip
```

**2c.** Once you have these PHP files in your `_scripts` directory, you need to tell Jekyll to **exclude** this directory from the build process. Otherwise it will treat it as a publically visible section of your site, which isn't great considering it holds your API key and username... In your `_config.yml`, add this:

```yaml
exclude: scripts
```

It's probably a good idea to add this to your `.gitignore` file too if you're using git.

## 3. Write some blog posts

Do your thing and write some blog posts. All your files will need to sit inside the `_posts` directory and be valid markup. You will also need to make sure each post file starts with a [YAML front matter block](http://jekyllrb.com/docs/frontmatter/). For more information about writing posts, see their [official guide](http://jekyllrb.com/docs/posts/).

So, just to get the ball rolling, grab a sample post:

```bash
cd _posts
curl -O https://raw.github.com/maciakl/Sample-Jekyll-Site/master/_posts/2012-02-10-code-snippets.markdown
```

Or you can write your own. Once you're happy, you need to convert all that markdown to static HTML. Make sure you're in the main/base directory of your blog and run:

`jekyll build`

There are a [few more flags](http://jekyllrb.com/docs/configuration/) you can use, but the above does a pretty good job.

## 4. Boom!

Now you're ready to deploy all your work! Fill in your details to `options.php`, and launch the one-off installation script: `php install.php`.

And sync your content:

```bash
php deploy.php

>> Sync complete. Your blog is sitting here: http://24dea2fbbc0c816face6-cb063e688647fc0c12641c9dce8e160d.r25.cf5.rackcdn.com
```

This is all you need to run to make your local `_site` directory sychronize with the remote container.

And that's it. Happy blogging!
