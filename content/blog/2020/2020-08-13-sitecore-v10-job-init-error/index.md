---
layout: post
title: "Sitecore v10 Kubernetes Job Error"
date: 2020-08-13
comments: true
author: Jimmy Rudley
published: true
authorIsRacker: true
authorAvatar: 'https://www.gravatar.com/avatar/fb085c1ba865548f330e7d4995c0bf7e'
bio: "Jimmy Rudley is an Azure&reg; Architect at Rackspace and an active member of the Azure community. He focuses on solving large and complex architecture and automation problems within Azure."
categories:
    - Azure
metaTitle: "Sitecore v10 Kubernetes Job Error"
metaDescription: "Sitecore v10 Kubernetes Job Error"
ogTitle: "Sitecore v10 Kubernetes Job Error"
ogDescription: "Sitecore v10 Kubernetes Job Error"
slug: 'Sitecore-v10-Kubernetes-Job-Error'
---

With the release of Sitecore&reg; Version 10, Kubernetes&reg; is now a supported option. This opens up such great benefits such as better resource utilization, version controlled images and overall ease of operations. While building out an automated pipeline, I came across an error during the Kubernetes job step. Let's dive in and show the fix I used in order to have successful deployments.

<!--more-->

### Configuration

Following the install document, you deploy the ingress controller, secrets then the external dependencies. These dependencies include Redis, MSSQL and Solr. Looking at the helm install command below, you notice a nodeSelector is being used to target a linux node for the nginx ingress. While Sitecore runs on Windows containers, this informs us that we need to have Linux and Windows nodes for a full Sitecore deployment.

```
helm repo add stable https://kubernetes-charts.storage.googleapis.com/
helm install nginx-ingress stable/nginx-ingress --set controller.replicaCount=1 --set controller.nodeSelector."beta\.kubernetes\.io/os"=linux --set defaultBackend.nodeSelector."beta\.kubernetes\.io/os"=linux --set-string controller.config.proxy-body-size=10m --set controller.service.externalTrafficPolicy=Local

kubectl apply -k ./secrets/

kubectl apply -f ./external/

kubectl apply -f ./init/
```

Each step of my deploy was going smooth until I hit the init yaml's which run jobs within Kubernetes. While monitoring my pods, I noticed **ErrImagePull** for the solr initilization job. I ran a **kubectl describe pod solr-init-m5dgj** to view more information. The output is below:

```
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type     Reason     Age                    From                                        Message
  ----     ------     ----                   ----                                        -------
  Normal   Scheduled  <unknown>              default-scheduler                           Successfully assigned default/solr-init-m6dgj to aks-nodepool1-19665653-vmss000001
  Normal   Pulling    3m5s (x4 over 4m33s)   kubelet, aks-nodepool1-19665653-vmss000001  Pulling image "scr.sitecore.com/sxp/sitecore-xm1-solr-init:10.0.0-ltsc2019"
  Warning  Failed     3m5s (x4 over 4m32s)   kubelet, aks-nodepool1-19665653-vmss000001  Failed to pull image "scr.sitecore.com/sxp/sitecore-xm1-solr-init:10.0.0-ltsc2019": rpc error: code = Unknown desc = Error response from daemon: Get https://scr.sitecore.com/v2/: x509: certificate signed by unknown authority
  Warning  Failed     3m5s (x4 over 4m32s)   kubelet, aks-nodepool1-19665653-vmss000001  Error: ErrImagePull
  Warning  Failed     2m53s (x6 over 4m32s)  kubelet, aks-nodepool1-19665653-vmss000001  Error: ImagePullBackOff
  Normal   BackOff    2m41s (x7 over 4m32s)  kubelet, aks-nodepool1-19665653-vmss000001  Back-off pulling image "scr.sitecore.com/sxp/sitecore-xm1-solr-init:10.0.0-ltsc2019"
  ```

  Having worked with kubernetes for a while, I instantly spotted the error. While the message is giving a x509 certificate error, look at the node the job was assigned on. **aks-nodepool1-19665653-vmss000001** is a linux node and the image being pulled has ltsc2019 which is an indicator for windows. Since I am using AKS, the Windows VMSS nodes are named with a structure of aksnpwin000000,aksnpwin000001, etc. A windows image cannot run off a linux node. The question comes up on why was this randomly working in previous deploys? Well, the kubernetes scheduler handles placement of where to run the job, but we can target specific nodes based on operating system. Auditing the Sitecore deployment yaml files, I noticed they were indeed targeting windows nodes, but the init job's were missing this entry. I verified this by looking at the describe pod output above which has **Node-Selectors:  <none>** set to none.

  In order to fix this, open up each init job yaml file and add a nodeSelector entry targeting the operating system windows. 
  ```
  spec:
  template:
    spec:
      nodeSelector:
        kubernetes.io/os: windows 
      imagePullSecrets:
        - name: sitecore-docker-registry
```

Once this step is done, if the job has errored out like above, delete the job and apply the new init yaml files. Describing the pod should show a status of **ContainerCreating** and a **Node-Selectors** set to windows {{<img src="solr.png" alt="" title="">}}

### Parting thought

I have informed Sitecore of the issing node selector for the Kubernetes jobs, but in the mean time, it is an easy fix just to edit the yaml files. For more information about windows containers, please reference the [kubernetes documentation](https://kubernetes.io/docs/setup/production-environment/windows/user-guide-windows-containers/)

