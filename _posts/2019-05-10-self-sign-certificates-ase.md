---
layout: post
title: "Self Sign Certificates In Azure App Service Environments"
date: 2019-05-10 00:00
comments: true
author: Jimmy Rudley
published: true
authorIsRacker: true
categories:
    - Azure
---

When deploying Sitecore into an Azure App Service, you have two options of how to setup your search method. The first is method is using Azure search which is integrated into the PaaS Deploy. The other method and my personal favorite is to deploy Solr Cloud. Using the latter requires deploying virtual machines into a virtual network, setting up an internal load balancer with your Solr nodes in a backend pool and virtual net integration to connect the Azure Web Apps to the vnet over a point-to-site vpn. Since it is best practice to run Solr Cloud with SSL, we must purchase a publicly signed certificate to have all the nodes and the load balancer name in the SAN list. The reason why we need a publicly signed certificate is that Azure App Service will not let you add a public key into the trusted root store. The connection would be untrusted and fail within an App Service web app. With the introduction of Sitecore 9.1.1, we can now deploy into a dedicated Azure App Service Environment or also known as an ASE. 

I will not go into how to deploy an ASE, but some key points to know. There are two types of ASE’s: Public and Internal. This article will focus on an internal ASE. An Internal ASE has an internal load balancer that routes requests to the correct web app. The VNET should have a DNS server set with the forward lookup zones you plan to route into. In my example, I have an Internal ASE with a domain name of azuretestingsite.com. All web apps provisioned into this ASE will inherit this domain name. If I provision a web app called Jimmy, the URL would be jimmy.azuretestingsite.com. You can assign custom domains to this web app as well, it just cannot overlap with the domain we used for the ASE.

Since an ASE is provisioned into a subnet, we can create another subnet in the same vnet to hold our solr cloud nodes. Within our DNS server, we can create an A record called solrlb.azuretestingsite.com which will route the Solr requests to the backend nodes. Assuming Solr Cloud was configured with a self signed certificate for https, we need to extract the public key and upload it into each webapp that would make Solr Cloud calls. Navigate to the **SSL Settings** of the web app and upload a public certificate while selecting local machine.

![UploadCert]({% asset_path 2019-05-10-self-sign-certificates-ase/uploadPublicCer.png %})

In the web app App Settings, add a new setting called **WEBSITE_LOAD_ROOT_CERTIFICATES** and add the thumbprint of the certificate you uploaded. Restart the web app to load it into the trusted root store.

![appSetting]({% asset_path 2019-05-10-self-sign-certificates-ase/appsettingsLoadRoot.png %})

To verify the certificate is loaded into the trusted root store, log into KUDU using the publishing credentials of the Azure Web App. Start a powershell prompt within KUDU and type ``dir cert:\localmachine\root``.

![KUDU]({% asset_path 2019-05-10-self-sign-certificates-ase/appServiceScmCert.png %})

Repeat the above steps on all the required web apps that need to access Solr Cloud. Log into the Sitecore management portal and populate the index schema.

![Schema]({% asset_path 2019-05-10-self-sign-certificates-ase/solrPopulate.png %})

We are now successfully using a self signed certificate to make https connectivity into solr cloud from an Azure Web App.
