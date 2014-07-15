Moderating the DevBlog
========================

"Moderating" might be too strong a word to describe this task. Basically, this task encompasses the review and merging of DevBlog user-submitted content to the `devblog` branch. Before we merge any submission to the `devblog` branch, we should follow these steps:

###DevBlog workflow for reviewers:
 
- pull PR and check rendering locally
   - check/fix markdown as needed
   - unless the author **expressly** consented for content to be edited (see DevBlog contribution guidelines), *DO NOT* change or edit the content in any way -- period. If you see issues with phrasing, grammar or structure, please suggest changes/communicate them to author via their PR.
 - Make sure required data is included in the PR (Name, Bio, Social Media Contact, etc.)
 - Make sure date on file name matches the date in the front matter
 - Make sure data in the front matter matches data provided in the PR
 - Check categories in the front matter match our guidelines (see below)
 - merge PR to `devblog` branch (please note that `devblog` branch is for blog content *only*, all non-content PRs for the blog should go against `dev`)
- create a branch merge PR against `master` and ping devblog admin(s)
- If bouncing back a blog entry PR, please be kind and respectful, we want to enourage authors to submit content and make it a pleasant experience.

######Devlog admins: @rdodev if unavalable @ycombinator if unavailable @kenperkins

###DevBlog Categories

While up to this point categories have been all over the place in terms of consistency, we can change that going forward. So, to this end we're enforcing the following guidelines:

1. If it's a proper noun or trademark make lower case i.e. OpenStack -> openstack
2. If it contains more than one word, make it slug-lower-case i.e. Cloud Files -> cloud-files