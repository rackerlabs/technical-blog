---
layout: post
title: "Using the Azure secrets store CSI driver in AKS"
date: 2020-05-13 00:00
comments: true
author: Jimmy Rudley
published: true
authorIsRacker: true
authorAvatar: 'https://www.gravatar.com/avatar/fb085c1ba865548f330e7d4995c0bf7e'
bio: "Jimmy Rudley is an Azure&reg; Architect at Rackspace and an active member of the Azure community. He focuses on solving large and complex architecture and automation problems within Azure."
categories:
    - Azure
metaTitle: "Using the Azure secrets store CSI driver in AKS"
metaDescription: "Using the Azure&reg secrets store CSI driver in AKS."
ogTitle: "Using the Azure secrets store CSI driver in AKS"
ogDescription: "Using the Azure&reg secrets store CSI driver in AKS."
---

If you have been using Azure Key Vault Flex Volume for Azure Kubernetes Service, it is time to switch over to the new provider. The Flex Volume solution has now been deprecated in favor of the [Azure Key Vault Provider for Secret Store CSI Driver](https://github.com/Azure/secrets-store-csi-driver-provider-azure). The Azure provider for the [secrets store CSI driver](https://github.com/kubernetes-sigs/secrets-store-csi-driver) has a very simplistic configuration that makes deploying and governance around keys, secrets and certificates feel like any other Azure resources talking to keyvault. Let's take a look at a complete example from provisioning an AKS cluster to reading in a secret as an enviornmental variable.

<!-- more -->

### Provision infrastructure for demo

Before secrets can be passed into an AKS cluster, provision a key vault and add a secret into the vault.
```
az group create --location $location --name $kvRg 
az keyvault create --location $location --name $kvName --resource-group $kvRg --enable-soft-delete $false

#add secret to key vault
$pw = [System.Web.Security.Membership]::GeneratePassword(12, 2)
az keyvault secret set --vault-name $kvName --name mssql-secret --value $pw
az keyvault secret show --name mssql-secret --vault-name $kvName
```

An AKS cluster with a Kubernetes version of 1.16.0 or greater is recommended.
```
az group create --name $aksRg --location $location
az aks create `
    --resource-group $aksRg `
    --name $aksName `
    --node-count 1 `
    --kubernetes-version 1.16.7 `
    --generate-ssh-keys `
    --enable-vmss `
    --vm-set-type VirtualMachineScaleSets `
    --load-balancer-sku standard `
    --network-plugin azure `
    --enable-managed-identity 
```

Since the **--enable-managed-identity*** switch was passed, we need to pull out the managed identity ID. This ID will used to assign the **Managed Identity Operator** and **Virtual Machine Contributor** role to the AKS MC_ resource group
```
#get access creds for cluster
az aks get-credentials --resource-group $aksRg --name $aksName

#get our managed identity id
$subscriptionId = az account show --query id --output tsv
$identity = az aks show -g $aksRg -n $aksName --query identityProfile.kubeletidentity.clientId -o tsv
  
az role assignment create --role "Managed Identity Operator" --assignee $identity --scope "/subscriptions/$subscriptionId/resourcegroups/MC_$($aksName)_$($aksName)_southcentralus"
az role assignment create --role "Virtual Machine Contributor" --assignee $identity --scope "/subscriptions/$subscriptionId/resourcegroups/MC_$($aksName)_$($aksName)_southcentralus"
```

Set the access policy to allow our identity from above to allow **GET** operations for keys, secrets and certificates.
```
# set policy to access keys in your Key Vault
az keyvault set-policy -n $kvName --key-permissions get --spn $identity
# set policy to access secrets in your Key Vault
az keyvault set-policy -n $kvName --secret-permissions get --spn $identity
# set policy to access certs in your Key Vault
az keyvault set-policy -n $kvName --certificate-permissions get --spn $identity
```

We can use HELM to install the driver.
```
helm repo add csi-secrets-store-provider-azure https://raw.githubusercontent.com/Azure/secrets-store-csi-driver-provider-azure/master/charts
helm install csi-secrets-store-provider-azure/csi-secrets-store-provider-azure --generate-name

#Verify pods being created and on which specific node (linux and windows node)
kubectl get pods -o wide
```


### Create a secretproviderclasses resource 

Create a yml file called **kv-sqldemo.yml**  and paste the following below. The following values need configured in the yml file: useVMManagedIdentity,userAssignedIdentityID,keyvaultName,secretName,key, objectName in secretObjects and objects and the objectType. A couple of things to note is that since the AKS cluster was provisioned with the enabled managed identity, the 2 parameters need set: **useVMManagedIdentity** and **userAssignedIdentityID**. The userAssignedIdentityID is stored in the $identity variable. If you do not specify secretObjects, only a volume can be mounted. The secretObjects is used to sync and create a kubernetes secret. This is useful for setting env variables in your deployment yml file. The secretObject name will match what is specified in the keyvault. The key is used in the deployment file to match and bring the secret in. The secretName is what will be created and named in kubernetes for the secret name.
```
apiVersion: secrets-store.csi.x-k8s.io/v1alpha1
kind: SecretProviderClass
metadata:
  name: azure-sync
spec:
  provider: azure
  secretObjects:                          # [OPTIONAL] SecretObject defines the desired state of synced K8s secret objects
  - secretName: mssql                     # name of the Kubernetes Secret object
    type: Opaque
    data: 
    - objectName: "mssql-secret"           # name of the mounted content to sync. This could be the object name or object alias 
      key: mssql                           # data field to populate. This must match in deployment yaml for key
  parameters:
    useVMManagedIdentity: "true"
    userAssignedIdentityID: "7a1374c4-e517-4cdd-a655-85da17056c95"
    keyvaultName: "jrakskv"               # the name of the KeyVault
    objects: |
      array:
        - |
          objectName: mssql-secret #key vault secret name
          objectType: secret       # object types: secret, key or cert
    tenantId: "bfd38366-aeb3-42ed-8d7c-e23d8591c7bb" # the tenant ID of the KeyVault
```
Run ***kubectl apply -f .\kv-sqldemo.yml*** to apply our configuration

Let's create a MSSQL instance that pulls the mssql-secret generated during the key vault deployment as the SA password.
```
---
apiVersion: "v1"
kind: "ConfigMap"
metadata:
  name: "mssql-config-map"
  namespace: default
  labels:
    app: mssql
data:
  MSSQL_PID: "Developer"
  ACCEPT_EULA: "Y"
---
apiVersion: "v1"
kind: "Service"
metadata:
  name: "mssql" #$(service name).$(namespace).svc.cluster.local
  labels:
    app: mssql
spec:
  clusterIP: "None"
  ports:
  - port: 1433
    name: "mssql"
  selector:
    app: "mssql"
    release: "mssql"
---
apiVersion: v1
kind: Service
metadata:
  name: mssql-lb
  labels:
    app: mssql  
spec:
  selector:
    app: mssql
  ports:
    - protocol: TCP
      port: 1433
      targetPort: 1433
  type: LoadBalancer
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mssql 
  labels:
    app: mssql
    release: mssql
spec:
  serviceName: "mssql"
  selector:
    matchLabels:
      app: "mssql"
      release: "mssql"
  replicas: 1
  updateStrategy:
        type: OnDelete
  template:
    metadata:
      labels:
        app: "mssql"
        release: "mssql"
    spec:
      nodeSelector:
        "beta.kubernetes.io/os": linux  
      terminationGracePeriodSeconds: 180
      volumes:
        - name: secrets-store-inline
          csi:
            driver: secrets-store.csi.k8s.io
            readOnly: true
            volumeAttributes:
              secretProviderClass: "azure-sync" 
      containers:
        - name: mssql
          image: mcr.microsoft.com/mssql/server:2017-latest          
          resources:
            {}
          ports:
          - containerPort: 1433
            name: mssql
          envFrom:
            - configMapRef:
                name: mssql-config-map
          env:
            - name: MSSQL_PID
              valueFrom:
                configMapKeyRef:
                  name: mssql-config-map
                  key: MSSQL_PID
            - name: ACCEPT_EULA
              valueFrom:
                configMapKeyRef:
                  name: mssql-config-map
                  key: ACCEPT_EULA
            - name: SA_PASSWORD #env variable to create
              valueFrom:
                secretKeyRef:
                  name: mssql #k8s secret name. (kubectl get secret). this is auto synced during creation and deletion of the POD
                  key: mssql #this must match the kv configuration in the yaml under secretObjects
          volumeMounts:
            - name: mssql-pvc
              mountPath: /var/opt/mssql
            - name: secrets-store-inline 
              mountPath: "/mnt/secrets-store"
              readOnly: true
  volumeClaimTemplates: #default is standard storage. managed-premium is ssd
    - metadata:
        name: mssql-pvc      
      spec:
        storageClassName: default
        accessModes:
          - ReadWriteOnce
        resources:
          requests:
            storage: 4Gi
```
The thing to note here is that you must create a volume with a secretProviderClass that matches the name specified in the secretproviderclasses resource created above. Finally, we mounted a volume with access to our secrets. This will expose secrets that a script can cat out the value as well.
```
        - name: secrets-store-inline
          csi:
            driver: secrets-store.csi.k8s.io
            readOnly: true
            volumeAttributes:
              secretProviderClass: "azure-sync" 
```
```
            - name: secrets-store-inline 
              mountPath: "/mnt/secrets-store"
              readOnly: true
```
Finally, apply our mssql yml file ***k apply -f .\mssqlStateful.yml***

I took a typical three-node D4s_v3 Apache&reg; SolrCloud cluster with accelerated networking enabled and provisioned it two times. In the first instance, I configured the availability set to tie it to a proximity placement group, and the other had no such setting. For my benchmarking tool of choice, I use [PsPing](https://docs.microsoft.com/en-us/sysinternals/downloads/psping). Microsoft&reg; also recommends [Latte](https://gallery.technet.microsoft.com/Latte-The-Windows-tool-for-ac33093b).

To set up a PsPing test, I choose one node with and without a proximity placement group as my server by specifying the `-s` switch with a source IP address and the port it binds with. Specifically, I used the following command: `psping -s 192.168.0.:5000`. On the node that had a proximity placement group tied to it and the node with no proximity placement group, I ran PsPing with the `-l` parameter to request a size of 8k and the `-n` parameter to set 10000 as the number of sends and receives. I also passed the `-h` parameter with 100 to set the bucket count for my histogram to print out.

Without a proximity placement group, the following image shows that the count column had a lowest latency of **.20** with a count of 3829, **.27** had 3740, and so forth. The lowest latency with the highest count is important. This shows our overall sends and the latency with which it correlates. We want a majority of the counts to be with the lowest latency.

![]({% asset_path 2020-04-29-azure-ppg/withoutPPG.png %})

With a proximity placement group, the lowest latency was **.19** and had a count of 6800. 

![]({% asset_path 2020-04-29-azure-ppg/withPPG.png %})

You can see the nodes with a proximity placement group had the lowest latency with a majority of packets. If you are not designing specifically for resiliency within a region, think about using a proximity placement group with your design patterns. For examples of adding a proximity placement group in your deployment, refer to the Microsoft [Azure Resource Manager (ARM) template example](https://azure.microsoft.com/en-us/blog/introducing-proximity-placement-groups/) or [PowerShell&reg; example](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/proximity-placement-groups).
