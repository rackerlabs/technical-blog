# Moderating the Blog

"Moderating" might be too strong a word to describe this task. Basically, this task encompasses the review and merging of user-submitted content to the `master` branch. Before merging any submission to the `master` branch, follow these steps:

### Blog workflow for reviewers:

When the pull request is first submitted:

* Follow the @rackerlabs preview link to ensure that the post renders correctly. Unless the author **expressly** consented for content to be edited (see Blog contribution guidelines), *DO NOT* change or edit the content in any way -- period. If you see issues with phrasing, grammar or structure, please suggest changes and communicate them to the author via comments on their PR.
* Make sure that required data is included in the pull request: Name, Bio, Social Media Contact, etc.

Before publishing:

* Make sure that the date in a blog post's filename matches the date in its frontmatter and today's date.
* Make sure that the data in the front matter matches the data provided in the frontmatter.
* Verify that the categories in the frontmatter satisfy [our category guidelines](#blog-categories).
* Verify that the `<!-- more -->` comment is present and correctly formatting. It needs to have a single blank line immediately before and after it to work correctly.

To publish:

* Merge the pull request to `master` branch by the merge button or on the command line.
* If you're bouncing back a blog entry pull request, please be kind and respectful. We want to encourage authors to submit content and make it a pleasant experience.

### Blog admins

* @ktbartholomew
* @catlook
* if unavailable: @kenperkins

### Blog Categories

We enforce the following guidelines:

1. If it's a proper noun or trademark, make it lower case. Example: OpenStack -> openstack
2. If it contains more than one word, make it slug-lower-case. Example: Cloud Files -> cloud-files
3. To create a new category, at least 2% of existing blog posts must belong to it. If a category contains fewer than 2% of current total number of posts, the "build" will fail and the pull request will be marked with a red X.
