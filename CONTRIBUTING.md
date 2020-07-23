# Contribute to the Rackspace Technical Blog

Authors who are informed and passionate about technology and IT write technical
blogs that range from high-level, conceptual overviews to deep dives with
code snippets. They all offer insight into solving problems and getting the most
out of applications and platforms. Many also add a personal perspective to the
conversation. These authors share their journeys, trials, and triumphs.

First, thanks for your interest in contributing and helping us craft quality
content for our official Technical Blog. Second, to make contributing
a pleasant experience while maintaining a visual and consistent content standard,
complete these steps before writing and submitting a blog entry for publishing.


## Prepare to contribute

We encourage a triangular workflow in GitHub as a best practice.

1. Fork this repo (https://github.com/rackerlabs/technical-blog), then
   clone your fork.

   ```bash
   git clone git@github.com:<YOUR_GITHUB_ID>/technical-blog.git
   cd technical-blog

1. Add the original repo as the `upstream` remote.

   ```bash
   git remote add upstream git@github.com:rackerlabs/technical-blog.git
   git remote update
   ```

1. Configure Git to always push to origin (your forked copy) using the current branch name.

   ```bash
   git config remote.pushdefault origin
   git config push.default current
   ```

1. Prevent accidental commits directly to the master branch by using a pre-commit hook.
   Note: These instructions work in the Bash shell and will overwrite the existing file if present.

   ```bash
   mkdir -p ~/.git/hooks
   cat << 'EOF' > ~/.git/hooks/pre-commit
   #!/usr/bin/env bash

   current_branch=$(git symbolic-ref -q HEAD | sed -e 's|^refs/heads/||')

   if [[ $current_branch = 'master' ]]; then
      echo 'Direct commits to the master branch are not allowed.'
      exit 1
   fi
   EOF
   ```

1. Set your local master branch to track `upstream/master`.

   ```bash
   git branch master -u upstream/master
   ```
1. Install Hugo on your local machine by using the following command:
   
   ```make install hugo```
  
## Create your blog post

1. Always keep your fork up to date (rebase) before starting work.

      ```bash
      git checkout master
      git fetch --all
      git rebase upstream/master
      git push origin master

1. Create a new branch for your blog.

      ```bash
      git checkout -b name-of-your-branch
      ```
1. Navigate to the root directory of your local copy of this repo using the command line.

1. Create a new directory within ```/content/blog/YYYY/``` that contains the inital ```.index.md``` 
   by using the following command:
  
  ```hugo new --kind blog-bundle blog/YYYY/YYYY-MM-DD-title-of-post```

**Note:** If your post has images,  place the image files within the newly created post folder.

### Format your post

The post should contain front-matter, an excerpt, and the actual content.

<!--- update this section when front matter is complete
##### Front-matter

Add Jekyll front-matter (or metadata) to the top of the file you created in
the previous step. for example:

```
---
layout: post
title: "Blog entry title"
date: YYYY-MM-DD 23:59
comments: true
author: Author(s) name(s)
published: true
authorIsRacker: true
#
# The *authorAvatar* and *bio* entires are optional, but include them if you can!
# The avatar must be a hosted image, such as a gravatar.
#
authorAvatar: 'https://www.gravatar.com/avatar/<insert hash for your headshot>'
bio: "<insert a sentence or two about yourself in first or third person>"
categories:
    - This Category
    - That Category
    - Other Category
#
# Use canonical entry if you are republishing a blog from another site, such as
# your personal blog.  Do  NOT republish without the author's explicit permission.
#
canonical: https://original-url.link.com/post-name/
metaTitle:
metaDescription:
ogTitle:
ogDescription:
#
# The following properties are OPTIONAL and affect the text and image that
# appear by default in link previews when sharing blog posts.
#
ogImage:
twitterCreator: "@your_twitter_handle" # NOTE: The quotes are required!
twitterDescription:
twitterTitle:
---
```


Make sure that the dates in the file name and front-matter match.

Available categories include the following:

- Ansible
- Architecture
- Automation
- AWS
- Azure
- Chef
- Cloud Files
- Cloud Monitoring
- Cloud-networks
- Cloud Servers
- Configuration Management
- Database
- Developers
- DevOps
- Docker
- Events
- General
- Java
- Jclouds
- Jenkins
- Mailgun
- Neutron
- NodeJS
- OpenStack
- Oracle
- Orchestration
- OSAD
- Private Cloud
- Python
- Salesforce
- SDK
- Security
- SQL Server

If no category fits, use *General*.

If you'd like to use a category that is not in the list, please send an email
to infodev@rackspace.com. To avoid being flooded with categories, which might apply
to only one or two blogs, we have automated throttling. However, notify us so
that we can discuss your ideas for a new category.
--->

### Create an excerpt

Include an excerpt marker after your first paragraph or so to separate the
preview text that appears on the blog index page from the full article. To do
so, use the following HTML comment:

```html
   The excerpt paragraph, which should give the reader a taste of what's to come.

   <!--more-->

   The rest of your article.
```

The marker comment ``<!--more-->`` must be on its own line, starting at
column 1, and separated from content on either side by a single blank line.

### Include images

To include images in your blog, place them within their respective blog
directory. Within your blog, use the following markup:

```go
{{- $image := resources.Get "YYYY-MM-DD-title-of-your-post/filename.png"-}}
```

### Follow guidelines

We recommend that you follow the [Style Guide](https://developer.rackspace.com/docs/style-guide/).

## Submit your blog entry as a pull request

Follow these steps to submit your entry for publication.

1. Submit a PR (pull request) against the `master` branch.
2. Do everything in the PR template checklist.
3. After the PR successfully builds, you can preview your post by clicking on the preview link in
   the PR.
4. When you're satisfied, ask the InfoDev team to do an editorial review and suggest changes, if
   necessary.
5. After the content is ready to go, the InfoDev team will publish the blog.

Thanks again for your interest in contributing!
