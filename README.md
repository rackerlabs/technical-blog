# Developer Blog

[![Build Status](https://travis-ci.org/rackerlabs/docs-developer-blog.svg?branch=master)](https://travis-ci.org/rackerlabs/docs-developer-blog)

This is the Rackspace Developer blog hosted at [https://developer.rackspace.com/blog/](https://developer.rackspace.com/blog/).

## Updating from Upstream

This repository has been split from [the monolithic developer.rackspace.com repository](https://github.com/rackerlabs/developer.rackspace.com) during the transition to hosting on [deconst](http://deconst.devsupport.me/). Until the transition is complete, new work not related to working on deconst should be done on the parent repository.

To bring this repository up to date, fork and clone the [the original repository](https://github.com/rackerlabs/developer.rackspace.com), then:

```bash
# Add your fork of this repository as a remote.
git remote add docs-developer-blog git@github.com:${GITHUB_USERNAME}/docs-developer-blog.git

# Split or re-split the quickstart directory onto its own branch.
git checkout master
git subtree split --prefix=src/site_source --branch=blog-only

# Push the newly updated branch to your fork.
git checkout blog-only
git push -u docs-developer-blog blog-only:upstream-update
```

Finally, open a [pull request](https://github.com/rackerlabs/docs-developer-blog/compare) between the branch you just pushed and the `master` branch on this repository and merge it to complete the update.
