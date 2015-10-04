---
layout: post
date: 2015-10-05
title: "Cloud Orchestration now available in rack"
comments: true
author: Pratik Mallya
authorIsRacker: true
authorAvatar: https://avatars2.githubusercontent.com/u/904679?v=3&s=460
published: true
categories:
    - Rackspace
    - tools
    - command-line
    - Orchestration
bio:
  Pratik Mallya is a Software Developer at Rackspace. He works within the Cloud Orchestration team. He holds an MS from UIUC and BS from BITS Pilani, India.
---

We're excited to announce that Cloud Orchestration is now accessible via [`rack`](https://developer.rackspace.com/docs/rack-cli)!

<!-- more -->

Earlier this quarter, we had [announced](https://developer.rackspace.com/blog/introducing-rack-global-cli/) `rack`, a new global command-line interface purpose-built for interacting with the Rackspace cloud. We're pleased to announce that you can now access our [Cloud Orchestration](http://www.rackspace.com/en-us/cloud/orchestration) service via `rack`!

[Rackspace Cloud Orchestration]((http://docs.rackspace.com/orchestration/api/v1/orchestration-templates-devguide/content/overview.html)) is a RESTful API Service that can be used to create and manage cloud resources (for example: servers + software installation, databases, load balancers, and so forth) by declaring what you want deployed using a simple template language. Therefore, a template is used to describe resources, which, when deployed, are collectively termed a _stack_. e.g. a template can be used to deploy a [LAMP](https://github.com/rackspace-orchestration-templates/lamp/blob/master/lamp.yaml) stack, whose resources include a linux server with Apache, PHP and MySQL database.

Once we have the latest version of `rack` set up, creating a stack is as easy as:

```
$ rack orchestration stack create --name RackTest --template-file my_nova.yaml

ID	f385a0f3-0458-4f63-b2b9-0983b36051f4
Links	[{
	  "Href": "https://iad.orchestration.api.rackspacecloud.com/v1/897686/stacks/RackTest/f385a0f3-0458-4f63-b2b9-0983b36051f4",
	  "Rel": "self"
	}]
```

Here, we are instructing the cloud orchestration service to create a stack with name `RackTest` using the template file `my_nova.yaml`. The contents of `my_nova.yaml` look like:

```
heat_template_version: 2014-10-16
resources:
  test_server:
    type: "OS::Nova::Server"
    properties:
      name: test-server
      flavor: 2 GB General Purpose v1
      image: Debian 7 (Wheezy) (PVHVM)
      networks:
      - {uuid: 11111111-1111-1111-1111-111111111111}
```
As we can see, the template has 2 sections: the template version and resources. We see that the type of the resource is a cloud server named `test-server` using the `2 GB General Purpose v1` flavor, `Debian 7 (Wheezy) (PVHVM)` image and attached to a network with uuid `11111111-1111-1111-1111-111111111111`. The output of the command shows details about the created stack: its `id` and a url to access the stack.

The cool thing about using `rack` with cloud orchestration is that we can easily access details of all the options that we may want to use in your template. e.g. we might be more interested in deploying a server using RHEL; to get a list of available images we can use `rack`:

```
$ rack servers image list

ID					Name								Status	MinDisk	MinRAM
5176fde9-e9d6-4611-9069-1eecd55df440	Red Hat Enterprise Linux 6 (PVHVM)				ACTIVE	20	512
92f8a8b8-6019-4c27-949b-cf9910b84ffb	Red Hat Enterprise Linux 7 (PVHVM)				ACTIVE	20	512
783f71f4-d2d8-4d38-b2e1-8c916de79a38	Red Hat Enterprise Linux 6 (PV)					ACTIVE	20	512
05dd965d-84ce-451b-9ca1-83a134e523c3	Red Hat Enterprise Linux 5 (PV)					ACTIVE	20	512
...

```
(for convenience, we have only shown RHEL images). Similarly, we can use `rack` to get the different flavors and even networks to use.

To get a list of all deployed stacks:
```
ID					Name							Status		CreationTime
f385a0f3-0458-4f63-b2b9-0983b36051f4	RackTest						CREATE_COMPLETE	2015-10-04 01:45:50 +0000 UTC
```

We see that our stack has completed creation. To get more information on the deployed stack, we can use `get`:

```
$ rack orchestration stack get --name RackTest

Capabilities		[]
CreationTime		2015-10-04 01:45:50 +0000 UTC
Description		No description
DisableRollback		true
ID			f385a0f3-0458-4f63-b2b9-0983b36051f4
Links			[{
			  "Href": "https://iad.orchestration.api.rackspacecloud.com/v1/897686/stacks/RackTest/f385a0f3-0458-4f63-b2b9-0983b36051f4",
			  "Rel": "self"
			}]
NotificiationTopics	<nil>
Outputs			[]
Parameters		{
			  "OS::project_id": "897686",
			  "OS::stack_id": "f385a0f3-0458-4f63-b2b9-0983b36051f4",
			  "OS::stack_name": "RackTest",
			  "flavor": "******"
			}
Name			RackTest
Status			CREATE_COMPLETE
StatusReason		Stack CREATE completed successfully
TemplateDescription	No description
Timeout			None
Tags			[]
UpdatedTime		None
```

If we're curios about the details of the resources deployed, we can use `resource list`:

```
$ rack orchestration resource list --stack-name RackTest

Name		PhysicalID				Type			Status		UpdatedTime
test_server	e4ff779c-076a-4ab3-b1b5-d8c3fba133e9	OS::Nova::Server	CREATE_COMPLETE	2015-10-04 01:45:50 +0000 UTC
```

In the above command, we used the `resource` sub-service. Once our stack is no longer required, it can be deleted:

```
$ rack orchestration stack delete --name RackTest
Stack RackTest is being deleted.
```

If we now do a `list`:

```
rack orchestration stack list
ID					Name							Status		CreationTime
```

we see that the stack no longer exists.

We have enabled complete support for cloud orchestration in `rack`! Details and examples of all orchestration commands can be viewed here.

We hope that you enjoy using Rackspace Cloud Orchestration via `rack`!

- [Download `rack`](https://developer.rackspace.com/docs/rack-cli/#quickstart)
