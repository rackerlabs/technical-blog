module Jekyll

  class MonthlyPage < Page
    def initialize(site, base, dir, posts, period)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'monthly_index.html')
      self.data['month'] = period.month
      self.data['year'] = period.year
      self.data['monthly_posts'] = posts
      self.data['title'] = period.strftime("%B %Y")
    end
  end

  class MonthlyPageGenerator < Generator
    safe true
    
    ONE_YEAR = (60*60*24*365)
    
    def posts_with_last_year_by_month(site)
      year_ago = Time.now - ONE_YEAR
      posts_with_past_year = site.posts.select {|post| post.date > year_ago  }
      posts_with_past_year.group_by {|post| Date.new(post.date.year, post.date.month) }
    end

    def generate(site)
      if site.layouts.key? 'monthly_index'
        dir = site.config['monthly_dir'] || 'monthly'
        
        posts_with_last_year_by_month(site).each_pair do |period, posts|
          site.pages << MonthlyPage.new(site, site.source, File.join(dir, period.year.to_s, period.month.to_s), posts, period)
        end
      end
    end
  end

end