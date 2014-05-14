# include the MD5 gem, this should be part of a standard ruby install
require 'digest/md5'

module Jekyll

    class Gravatar < Liquid::Tag

        def initialize(tag_name, size, token)
            super
            @size = size.strip
        end

        def gravatar_url(email_address)
            # change the email address to all lowercase
            email_address = email_address.downcase

            # create an md5 hash from the email address
            gravatar_hash = Digest::MD5.hexdigest(email_address)

            # compile the full Gravatar URL
            "http://www.gravatar.com/avatar/#{gravatar_hash}" + (@size.empty? ? "" : "?s=#{@size}")
        end

        def render(context)
            # get the site config variables
            site_config = context.registers[:site].config

            # get the email address from the site config
            email_addresses = site_config['gravatar_emails']
            email_images_tags = email_addresses.collect { |a| "   <img src='#{gravatar_url(a)}'/>" }

            <<-HTML
            <div class='row-contributor-grid'>
            #{email_images_tags.join("\n")}
            </div>
            HTML
        end
    end
end

# register the "gravatar_images" tag
Liquid::Template.register_tag('gravatar_images', Jekyll::Gravatar)