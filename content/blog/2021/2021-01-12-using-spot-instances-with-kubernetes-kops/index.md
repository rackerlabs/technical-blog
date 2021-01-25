---
layout: post
title: "Using spot instances with Kubernetes kops"
date: 2021-01-12
comments: true
author: Nate Fox
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-U010X7DPYTV-64948ceb6a70-512'
bio: "Over 20 years of progressive experience in the field of Information Technology 
with in-depth knowledge and experience in systems planning, design, configuration, 
and management. Reliable self-starter with the ability to plan, design, implement, 
and manage small, medium, and large systems."
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "Using spot instances with Kubernetes kops"
metaDescription: "Running containerized applications with Amazon EKS is a popular choice, but one that still requires a certain amount of manual configuration. There are several ways to get cheaper instances for your kops cluster, and we go through them in this article."
ogTitle: "Using spot instances with Kubernetes kops"
ogDescription: "Running containerized applications with Amazon EKS is a popular choice, but one that still requires a certain amount of manual configuration. There are several ways to get cheaper instances for your kops cluster, and we go through them in this article."
slug: "using-spot-instances-with-kubernetes-kops"
canonical: https://onica.com/blog/devops/aws-spot-instances-with-kubernetes-kops/
---

*Originally published in May 2018, at Onica.com/blog*

Running containerized applications with [Amazon EKS](https://onica.com/blog/aws-announcements/product-announcements-aws/) is a
popular choice, but it still requires a certain amount of manual configuration. There are several ways to get cheaper instances
for your [Kubernetes&reg; Operations (kops)](https://github.com/kubernetes/kops) cluster, and we go through them in this article.

<!--more-->

### How do AWS Spot Instances work?

A Spot Instance is an unused EC2&reg; instance that’s available for use at up to ninety percent less than On-Demand pricing.
If you are flexible about when your applications run and if your applications can be interrupted, you can lower your costs
significantly. AWS Spot Instances&reg; are well-suited for data analysis, containerized workloads, batch jobs, background
processing, optional tasks, and other test and development workloads.

The hourly Spot price is determined by supply and demand trends for EC2 spare capacity. You can see the current and historical
Spot prices through the AWS Management Console&reg;. If the Spot price exceeds your maximum price for a given instance, or
if capacity is no longer available, your instance automatically stops.

Let's consider how you can optimize spot instance costs for your kops clusters: 

### Edit a running cluster

All methods revolve around kops’ cluster management YAML file. For the first example, lets update a running
Kubernetes&reg; cluster.

#### 1. Kops edit instancegroups nodes

Adjust the `maxPrice` for running nodes.

See the next example if you’d like to run a master as a spot instance. Running the command `kops edit instancegroups nodes`
opens your editor with a YAML file. Add a line of `maxPrice: "x.xx"` just above `maxSize` similar to the following file:

        apiVersion: kops/v1alpha2
        kind: InstanceGroup
        metadata:
            creationTimestamp: 2018-05-14T00:32:55Z
            labels:
                kops.k8s.io/cluster: nfox.k8s.local
            name: nodes

        spec:
            image: kope.io/k8s-1.8-debian-jessie-amd64-hvm-ebs-2018-02-08
            machineType: t2.medium
            maxPrice: "0.20"
            maxSize: 2
            minSize: 2
            nodeLabels:
                kops.k8s.io/instancegroup: nodes
            role: Node
            subnets:
                - us-west-2a
                - us-west-2b
                - us-west-2c

Now, save your edit.

**Note:** If you’d like to run your masters as spot instances, you need first to run `kops get instancegroups`.

That produces an output similar to the following example:

        Using cluster from kubectl context: nfox.k8s.local

        NAME                ROLE    MACHINETYPE     MIN     MAX     ZONES
        master-us-west-2a   Master  m3.medium       1       1       us-west-2a
        master-us-west-2b   Master  m3.medium       1       1       us-west-2b
        master-us-west-2c   Master  m3.medium       1       1       us-west-2c
        nodes               Node    t2.medium       2       2       us-west-2a,us-west-2b,us-west-2c

From there, use `kops edit instancegroup master-us-west-2a` or substitute your other master names. 
Then follow the preceding directions for adding `maxPrice`.

#### 2. Kops update cluster –yes

Running the `kops update cluster` command makes sure the edit is saved in S3. This does not affect running instances:

        Using cluster from kubectl context: nfox.k8s.local
        I0513 17:48:36.097401    4290 apply_cluster.go:456] Gossip DNS: skipping DNS validation
        I0513 17:48:36.117391    4290 executor.go:91] Tasks: 0 done / 81 total; 30 can run
        I0513 17:48:43.244976    4290 executor.go:91] Tasks: 30 done / 81 total; 26 can run
        I0513 17:48:47.490211    4290 executor.go:91] Tasks: 56 done / 81 total; 21 can run
        I0513 17:48:52.851132    4290 executor.go:91] Tasks: 77 done / 81 total; 3 can run
        I0513 17:49:00.360321    4290 executor.go:91] Tasks: 80 done / 81 total; 1 can run
        I0513 17:49:03.881453    4290 executor.go:91] Tasks: 81 done / 81 total; 0 can run

        Will modify resources:
            EBSVolume/a.etcd-events.nfox.k8s.local
                Tags        {Name: a.etcd-events.nfox.k8s.local, k8s.io/etcd/events: a/a, CreatedAt:            2018-05-14T00:33:41Z, PrincipalId: AIDAJRBCBENPOERCO7U2C, kubernetes.io/cluster/nfox.k8s.local: owned, k8s.io/role/master: 1, Owner: nfox, KubernetesCluster: nfox.k8s.local} -> {k8s.io/etcd/events: a/a, k8s.io/role/master: 1, kubernetes.io/cluster/nfox.k8s.local: owned, Name: a.etcd-events.nfox.k8s.local, KubernetesCluster: nfox.k8s.local}

            EBSVolume/a.etcd-main.nfox.k8s.local
                Tags        {Name: a.etcd-main.nfox.k8s.local, kubernetes.io/cluster/nfox.k8s.local: owned, k8s.io/etcd/main: a/a, Owner: nfox, KubernetesCluster: nfox.k8s.local, k8s.io/role/master: 1, PrincipalId: AIDAJRBCBENPOERCO7U2C, CreatedAt: 2018-05-14T00:33:41Z} -> {KubernetesCluster: nfox.k8s.local, k8s.io/etcd/main: a/a, k8s.io/role/master: 1, kubernetes.io/cluster/nfox.k8s.local: owned, Name: a.etcd-main.nfox.k8s.local}

            LaunchConfiguration/nodes.nfox.k8s.local
                SpotPrice           	  -> 0.20

            Must specify --yes to apply changes

Notice the `SpotPrice -> 0.20` under `LaunchConfiguration/nodes.nfox.k8s.local`.

Now, add the `--yes` flag to your command, and you should see an output like this:

        $ kops update cluster --yes
        Using cluster from kubectl context: nfox.k8s.local

            I0513 17:52:42.256531    4319 apply_cluster.go:456] Gossip DNS: skipping DNS validation
            I0513 17:52:48.555758    4319 executor.go:91] Tasks: 0 done / 81 total; 30 can run
            I0513 17:52:53.729854    4319 executor.go:91] Tasks: 30 done / 81 total; 26 can run
            I0513 17:52:59.025025    4319 executor.go:91] Tasks: 56 done / 81 total; 21 can run
            I0513 17:53:09.758565    4319 executor.go:91] Tasks: 77 done / 81 total; 3 can run
            I0513 17:53:17.065805    4319 executor.go:91] Tasks: 80 done / 81 total; 1 can run
            I0513 17:53:17.868182    4319 executor.go:91] Tasks: 81 done / 81 total; 0 can run
            I0513 17:53:18.945159    4319 update_cluster.go:291] Exporting kubecfg for cluster
            kops has set your kubectl context to nfox.k8s.local

        Cluster changes have been applied to the cloud.

        Changes may require instances to restart: kops rolling-update cluster

#### 3. Kops rolling-update cluster [–yes]

You probably want to run `kops rolling-update cluster` first. This gives a report of what kops will do. Usually,
your report looks similar to the following:

            Using cluster from kubectl context: nfox.k8s.local

            NAME			    STATUS		NEEDUPDATE	READY	MIN
            master-us-west-2a   Ready       0           1       1
            nodes               NeedsUpdate 2           0       2

            Must specify --yes to rolling-update.

After you’re happy, run `kops rolling-update cluster --yes`.

At this point, kops starts a rolling update of all of your instances. It first empties an instance, terminates
it, and replaces it with a spot price instance.

The output is similar to:

            Using cluster from kubectl context: nfox.k8s.local
            NAME			    STATUS		NEEDUPDATE	READY	MIN	MAX	NODES
            master-us-west-2a	Ready		0		    1	    1	1	1
            nodes			    NeedsUpdate	2		    0	    2	2	2
            I0513 17:55:46.522672    4373 instancegroups.go:157] Draining the node: "ip-172-20-121-136.us-west-2.compute.internal".
            node "ip-172-20-121-136.us-west-2.compute.internal" cordoned
            node "ip-172-20-121-136.us-west-2.compute.internal" cordoned
            WARNING: Deleting pods not managed by ReplicationController, ReplicaSet, Job, DaemonSet or StatefulSet: kube-proxy-ip-172-20-121-136.us-west-2.compute.internal
            pod "kube-dns-7785f4d7dc-8bp8k" evicted
            node "ip-172-20-121-136.us-west-2.compute.internal" drained
            I0513 17:57:48.606634    4373 instancegroups.go:273] Stopping instance "i-011e95b109a3cb8b7", node "ip-172-20-121-136.us-west-2.compute.internal", in group "nodes.nfox.k8s.local".
            I0513 18:01:52.214334    4373 instancegroups.go:188] Validating the cluster.
            I0513 18:02:10.677302    4373 instancegroups.go:249] Cluster validated.
            I0513 18:02:10.677326    4373 instancegroups.go:157] Draining the node: "ip-172-20-71-212.us-west-2.compute.internal".
            node "ip-172-20-71-212.us-west-2.compute.internal" cordoned
            node "ip-172-20-71-212.us-west-2.compute.internal" cordoned
            WARNING: Deleting pods not managed by ReplicationController, ReplicaSet, Job, DaemonSet or StatefulSet: kube-proxy-ip-172-20-71-212.us-west-2.compute.internal
            pod "kube-dns-autoscaler-787d59df8f-ntwpj" evicted
            pod "kube-dns-7785f4d7dc-g5wqp" evicted
            pod "kube-dns-7785f4d7dc-gk25c" evicted
            node "ip-172-20-71-212.us-west-2.compute.internal" drained
            I0513 18:03:54.413330    4373 instancegroups.go:273] Stopping instance "i-0a5b2c028f081f1f1", node "ip-172-20-71-212.us-west-2.compute.internal", in group "nodes.nfox.k8s.local".
            I0513 18:07:58.058755    4373 instancegroups.go:188] Validating the cluster.
            I0513 18:08:14.287260    4373 instancegroups.go:249] Cluster validated.
            I0513 18:08:14.287333    4373 rollingupdate.go:193] Rolling update completed for cluster "nfox.k8s.local"!

Now, validate that your nodes are running with spot instances by using the following command:

            aws ec2 describe-instances \
                --filters \
                    Name=tag-key,Values=k8s.io/role/node \
                    Name=instance-state-name,Values=running \
                --query 'Reservations[].Instances[].{
                    SpotReq: SpotInstanceRequestId, 
                    Id: InstanceId, 
                    Name: Tags[?Key==`Name`].Value|[0]}' \
                --output table

And the output should show something similar in your environment:

            -----------------------------------------------------------------
            |                       DescribeInstances                       |
            +---------------------+------------------------+----------------+
            |         Id          |         Name           |    SpotReq     |
            +---------------------+------------------------+----------------+
            |  i-0b6cb27b8409fbd86|  nodes.nfox.k8s.local  |  sir-3e2r8gbn  |
            |  i-0d62dcc142dbd7cb8|  nodes.nfox.k8s.local  |  sir-e87gbhpn  |
            +---------------------+------------------------+----------------+

### Create a cluster with spot pricing

In a perfect world, you create a cluster from the ground up with spot pricing instead of on-demand. However,
there is no way to use spot pricing from the kops command line. The only way to do it is to use a YAML file:

#### 1. Create a YAML file from your existing kops create cluster command

Modify your existing `kops create cluster` command to create a YAML file. For example, if our original cluster command is:

            kops create cluster \
                --name nfox.k8s.local \
                --zones=us-west-2a,us-west-2b,us-west-2c \
                --state=s3://my-kops-bucket

**Note:** You need an S3 bucket created beforehand to hold the kops state. In this case, it’s `my-kops-bucket`.

Simply add the following to your command `--dry-run --output yaml`.  If you want to capture it to a file, pipe it through `tee`.

#### 2. Edit the YAML file

Now, edit the `nfox.k8s.local.yaml` file as shown previously:

1. Scroll to the bottom.
2. Edit the InstanceGroup by adding the `maxPrice: "x.xx"` line just above `maxSize`
3. Save the file.

#### 3. Create the cluster with these three commands:

            kops create -f nfox.k8s.local.yaml
            kops create secret sshpublickey admin -i ~/.ssh/id_rsa
            kops update cluster --yes

Because the `kops create cluster command` line handles the SSH key for you, you need to create the admin user with your
own ssh private key before actually applying everything to the cluster in the third command, `kops update`.

### Conclusion

While Amazon EKS simplifies running Kubernetes workflows, we hope this quick guide helps optimize instance costs for your
kops clusters.

Want to read more AWS How-To guides from Onica, a Rackspace Technology company? Check out our [resources](https://onica.com/resources/)

<a class="cta teal" id="cta" href="https://www.rackspace.com/cloud/aws">Learn more about Rackspace AWS services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click **Sales Chat** to [chat now](https://www.rackspace.com/)
and start the conversation.
