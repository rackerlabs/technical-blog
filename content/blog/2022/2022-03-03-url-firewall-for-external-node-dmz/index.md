---
layout: post
title: "URL FIREWALL for External Node/DMZ"
date: 2022-03-03
comments: true
author: Abhishek Shukla
authorAvatar: 'https://secure.gravatar.com/avatar/4c6a0fc4429bdc391832b6af39ab8058'
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
    - Security
metaTitle: "URL FIREWALL for External Node/DMZ"
metaDescription: "When configuring Oracle E-Business Suite in a DMZ configuration, you can deploy firewalls at different levels to restrict access to only the web pages required for the business."
ogTitle: "URL FIREWALL for External Node/DMZ"
ogDescription: "When configuring Oracle E-Business Suite in a DMZ configuration, you can deploy firewalls at different levels to restrict access to only the web pages required for the business. "
slug: "url-firewall-for-external-node-dmz"

---

When configuring Oracle E-Business Suite in a DMZ configuration, you can deploy firewalls at different levels to restrict access to only the web pages required for the business.

<!--more-->

The URL Firewall blocks access to unnecessary web pages in modules that are not installed, configured, or licensed. 

### Business Impact
The external DMZ environment within the Oracle EBS architecture allows access to over 15,000 web pages when very less web pages are required. An attacker may be able to exploit security vulnerabilities present in any of these 15,000 web pages to access the core EBS application and the modules that support the business.

Following steps help enable firewall in a DMZ setup.

#### 1) Enable firewall in the $CONTEXT_FILE

grep urlfirewall $CONTEXT_FILE
    ` <urlfirewall oa_var="s_enable_urlfirewall"/>`

`Sample url_fw.conf value and its meaning`

`RewriteRule ^/$ /OA_HTML/AppsLocalLogin.jsp [R,L] `
`RewriteRule ^/OA_HTML/jsp/fnd/AOLDataStreaming\.jsp$ - [L]`

*Rule 1* says when the user type / after the hostname, domain name and port number and then /;
this will redirect user to the /OA_HTML/ AppsLocalLogin.jsp and will stop applying any rewrite rule.

*Rule 2* Display same url as mentioned on the left, /OA_HTML/jsp/fnd/AOLDataStreaming.jsp

[R,L] at the end
R- Means Rewrite
L- Last rewrite rule (No more rule to apply after this)

**For more understanding of the concept.**

. (dot) means matches any characters

[] specifies a class

[a-z] matches any lowercase characters from a to z

[a-zA-Z0-9] matches any character upper or lower case from a to z and numeric 0 to 9

[abc$] matches a or b or c or $

[^0-9] matches anything except digit 0 to 9. Here ^ is negation

Meta Characters in Regular Expressions

^ -- Matches Start of a line

$ -- Matches End of line

*Quantifiers for Characters*

? matches zero or one instance of character

`+` matches one or more instance of character

`*` matches zero or more instance of character

#### 2) Modify file $ORA_CONFIG_HOME/10.1.3/Apache/Apache/conf/url_fw.conf comment/disable the required jsps in the firewall

Allowing the following jsp pages by UN-comment them from the url_fw.conf file:

Under section -- #Include URLS for login method: LOCAL


Before:
RewriteRule ^/$ https://<ISTORE_URL>:<PORT>/OA_HTML/AppsLogin [R,L]

#RewriteRule ^/OA_HTML/OA\.jsp$ - [L]

#RewriteRule ^/OA_HTML/RF\.jsp$ - [L]

#RewriteRule ^/OA_HTML/AppsLocalLogin\.jsp$ - [L]

#RewriteRule ^/OA_HTML/AppsLocalLogout\.jsp$ - [L]

RewriteRule ^/OA_HTML/OALogout\.jsp$ - [L]

RewriteRule ^/OA_HTML/OAErrorPage\.jsp$ - [L]

RewriteRule ^/OA_HTML/OAErrorDetailPage\.jsp$ - [L]

#RewriteRule ^/OA_HTML/OAExport\.jsp$ - [L]

#RewriteRule ^/OA_HTML/OADownload\.jsp$ - [L]

#RewriteRule ^/OA_HTML/fndvald\.jsp$ - [L]

#RewriteRule ^/OA_HTML/AppsLogin$ - [L]

RewriteRule ^/OA_HTML/AppsLogout$ - [L]

After:

RewriteRule ^/$ https://<ISTORE_URL>:<PORT>/OA_HTML/AppsLogin [R,L]

RewriteRule ^/OA_HTML/OA\.jsp$ - [L]

RewriteRule ^/OA_HTML/RF\.jsp$ - [L]

RewriteRule ^/OA_HTML/AppsLocalLogin\.jsp$ - [L]

RewriteRule ^/OA_HTML/AppsLocalLogout\.jsp$ - [L]

RewriteRule ^/OA_HTML/OALogout\.jsp$ - [L]

RewriteRule ^/OA_HTML/OAErrorPage\.jsp$ - [L]

RewriteRule ^/OA_HTML/OAErrorDetailPage\.jsp$ - [L]

RewriteRule ^/OA_HTML/OAExport\.jsp$ - [L]

RewriteRule ^/OA_HTML/OADownload\.jsp$ - [L]

#RewriteRule ^/OA_HTML/fndvald\.jsp$ - [L]

RewriteRule ^/OA_HTML/AppsLogin$ - [L]

RewriteRule ^/OA_HTML/AppsLogout$ - [L]


**We can keep everything enabled inside the following mentioned sections**

Please note, since we are using product IBE, we have enabled all the pages.

In this section, and along with the same we have enabled common pages (not related to product) as well.

    1)	    #Include all static files (wildcarded) – except the following in our case
            #RewriteRule  ^/OA_HTML/.*\.(HTM|HTML)$ - [L]   # Only if needed

    2)   #Include all common files
         In case you need to disable the firewall for the IBE product complete the following steps:

#Include URLs for product IBE (iStore) with CZ

Enabled all the pages mentioned inside the IBE product section.

**Enabled this entry to get pass the HTTP 400 Bad Request error and add to cart started working fine.**

RewriteRule  ^/OA_HTML/JavaScriptServlet*  - [L] 

RewriteRule ^/OA_HTML/ibe*\.js$ - [L] 

#### In case you need to disable the firewall for the CZ product, complete the following steps 
#Include URLs for product IBE (iStore) with CZ

Enable all the pages mentioned inside.

#### 3) Network team to change the heartbeat for the Load balancer so they do it using the index.html

After the firewall was enabled on the <SID> iStore backend server, the LB marked the service as "Down". It seems the firewall change produced a redirect and changed the response code from a 200 to a 302. The index.html page was permitted and the <URL> monitor was successfully reconfigured to check "/index.html".

 *Before index.html was used*

    # curl -Ik https://<IP_ADDRESS>:<PORT>/ 

 HTTP/1.1 302 Found

 Date: Mon, 20 Jul 2020 20:55:50 GMT
 
 Location : https://<URL.HOSTNAME>:<PORT>/OA_HTML/AppsLogin
 
 Content-Type: text/html; charset=iso-8859-1

 _After index.html was used_

curl -Ik https://<IP_ADDRESS>:<PORT>/index.html

 HTTP/1.1 200 OK

 Date: Mon, 20 Jul 2020 21:10:27 GMT

 X-Content-Type-Options: nosniff

 Last-Modified: Mon, 20 Jul 2020 20:40:39 GMT

 ETag: "hd4503-7wd-5f98747"

 Accept-Ranges: bytes

 Content-Length: 1275

 Content-Type: text/html

#### 4) Troubleshooting tips in case any specific page is not working, custom page or the seed page.

Open IE and navigate to the page having issue in the istore.

Press F12 -> Navigate to the Network tab to find out the exact page in question this can be any page like JavaScriptServlet* , ibe* or *.jsp

Once the exact page with issues is identified, you need to add the page as  shown in the following snapshot.

$ORA_CONFIG_HOME/10.1.3/Apache/Apache/conf/url_fw.conf file, bounce the services to make sure now the page is working fine.

<img src=Picture1.png title="" alt="">
Example of entries include.

RewriteRule  ^/OA_HTML/JavaScriptServlet*  - [L] 

RewriteRule ^/OA_HTML/ibe*\.js$ - [L] 

RewriteRule  ^/OA_HTML/<custom_pagename>.*\.jsp$  - [L]

**Please note** - These entries need to be added in the appropriate place in the url_fw.conf file.
**Once all the settings are complete and verified and the pages are working fine, you can make the changes in the template file url_fw_conf_1013.tmp** ($FND_TOP/admin/template/url_fw_conf_1013.tmp
) and copy the file to custom folder ($FND_TOP/admin/template/custom/url_fw_conf_1013.tmp
) and run **autoconfig.**


### Conclusion
Firewall controls access between the internet and internal network or intranet (within the organization). Firewall dictates which external communications will be permitted into the organization network, and which will be blocked. A well-designed firewall can prevent numerous common internet-based security attacks.

By following and completing the above mentioned steps, one can systematically enable the firewall in a DMZ setup and debug the issue. 


<a class="cta red" id="cta" href="https://www.rackspace.com/applications/oracle">Let our experts guide you on your Oracle Applications journey.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
