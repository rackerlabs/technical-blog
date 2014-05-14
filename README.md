developer.rackspace.com
=======================

Gen 3 of the developer.rackspace.com Portal

Setup:

* The site uses vanilla jekyll as much as possible, see: http://jekyllrb.com/

```
  gem install jekyll
```

Should handle all dependencies for you (you will need a functioning ruby install
to do this.).

Once jekyll is installed; running

```
  jekyll serve
```

Should show:

```
pug:developer.rackspace.com$ jekyll serve
Configuration file: /rackspace/developer.rackspace.com/_config.yml
            Source: /rackspace/developer.rackspace.com
       Destination: /rackspace/developer.rackspace.com/_site
      Generating... done.
    Server address: http://0.0.0.0:4000
  Server running... press ctrl-c to stop.
```

Browsing to http://127.0.0.1:4000/ should show you the site preview!


## Plugins included in the _plugins directory:

* https://github.com/kinnetica/jekyll-plugins/ (sitemap generator)
* https://github.com/agelber/jekyll-rss/ (rss feeds)
* https://github.com/olov/jekyll-references (global references)
* https://github.com/recurser/jekyll-plugins (generate_categories.rb, octopress_filters.rb)
* image_tag.rb (backwards compatibility: deprecated)
* vimeo.rb
* zoomable_image_tag.rb
* tweet_tag.rb
* youtube.rb
* raw.rb
* pygments_code.rb
* code_block.rb

## To Do:

* Integrate [grunt](http://gruntjs.com/getting-started) or
  [gulp](http://gulpjs.com/) for css/js/less file
  management, do not make it part of the watch command (different rake task)
  so that end-users don't have additional dependencies on node.
  See this: https://github.com/dannygarcia/grunt-jekyll

