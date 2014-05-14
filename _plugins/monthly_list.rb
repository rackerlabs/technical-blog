module Jekyll
  class MonthlyList < Liquid::Tag

    def render(context)
      config = context.registers[:site].config
      @monthly_dir = config['monthly_dir']
      @destination_dir = File.join(config["destination"], config['monthly_dir'])
      
      html = "<ul>"
      periods.each do |period|
        html += "\t<li><a href='#{period_url(period)}'>#{period_text(period)}</a></li>"
      end
      html += "</ul>"
    end
    
    private
    
    attr_reader :monthly_dir, :destination_dir
    
    def period_text(period)
      period.strftime("%B %Y")
    end
    
    def period_url(period)
      "/#{monthly_dir}/#{period.year}/#{period.month}/index.html"
    end
    
    def periods
      begin
        file_glob = File.join(destination_dir, "**", "*", "index.html")
        dirs = Dir.glob(file_glob)

        periods = dirs.collect do |dir|
          m = dir.match(/#{File::SEPARATOR}(\d{4})#{File::SEPARATOR}(\d{1,2})#{File::SEPARATOR}index.html?$/i)
          year = m[1].to_i
          month = m[2].to_i

          Time.new(year, month, 1)
        end
        periods.sort.reverse
      rescue => e
        puts "Unable to generate archive list for sidebar - #{e.message}"
        []
      end
    end
    
  end
end

Liquid::Template.register_tag('monthly_list', Jekyll::MonthlyList)
