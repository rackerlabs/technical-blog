---
layout: post
title: "CloudFormation nested stacks&mdash;the easy way"
date: 2020-12-17
comments: true
author: Ethan Schumann
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-U0117UYBDUG-fd2a49c05890-512'
bio: "Ethan is a Sr. Manager, Architecture and Engineering for Rackspace Technologies.
He loves working in and around the cloud, with a penchant for Kubernetes, Automation,
and generally making customer's lives easier. Based in Austin, Texas, he spend his free time
running, spending time with family, and being outside for every possible moment."
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "CloudFormation nested stacks&mdash;the easy way""
metaDescription: "."
ogTitle: "Name of post"
ogDescription: "."
slug: "cloudFormation-nested-stacks-the-easy-way"

---

Nested Stacks are a great way to deploy your infrastructure in a modular fashion.
Isolating resources into logical groups keeps CloudFormation scripts small,
limits blast radius of changes, and provides an easy way to manage various resources in more
specific templates. There are a few inherit challenges to using this great
technology, and the one we are focusing on today is version control of our child templates.

<!--more-->

### What is CloudFormation stack?

A stack is a collection of Amazon Web Service&reg;(AWS) resources (defined by the AWS CloudFormation template),
that you can manage as a single unit. By creating templates for service or application
architectures, AWS CloudFormation uses those templates for quick and reliable
provisioning. CloudFormation lets you use a simple text file as the single
source of truth, to model and provision (in an automated and secure manner) all the
resources you need for your applications across all regions and accounts.

### Version control of child templates&mdash;sync your git repo to S3

As the address requirement for nested stacks requires a S3 URL, making changes can become
a hassle when there are several child templates to maintain. Enter a great
quick-start by AWS that gets you 80% of the way there. This quick-start will create Lambda
functions that take the contents of your git repo and upload a ZIP of them to S3. This
is a great solution, but a ZIP file might not fit your organization’s needs, especially
if you want to use the files directly via URL.

Rackspace Technology has faced this challenge many times, as a result we modified the AWS
provided scripts to actually deposit the contents of your repo while maintaining the original
directory structure. This method involves taking the code from the AWS
provided scripts and hosting them within your own S3 bucket, letting us modify the Lambda
functions as we like. Use the following steps to create a stack that makes the necessary
modifications.

**Note:** Follow these steps to complete the process. You can also simply create
the S3 bucket and use the CloudFormation template at the end of this blog.

### Step 1:configure the initial stack for use

Using the quick-start guide, follow the steps for configuration. Be sure to
configure for the **Git pull endpoint strategy**, not the **Zip download endpoint** strategy.
This initial configuration consists of setting up the webhook in your repo,
configuring an SSH keypair, and deploying the Lambda functions. After this,
test to verify everything is working.

We won’t discuss the details of these steps because they are outlined in the quick start guide.
The basics are: creating a bucket for your repo objects to live, providing the IP ranges for
your preferred repo, and designating the buckets to pull the quick-start files from. This process
takes 15 to 20 minutes.

**IMPORTANT:** Do not modify the AWS Quick Start Configuration parameters at this time.
We will do this later.

### Step 2:copy scripts to your own S3 bucket

When you run the template for the first time, all the necessary scripts
are copied to a bucket in your account. We want to create our own bucket
with a friendlier name so we can house and modify the code. Our new bucket should
have a simple name, something like “[companyname]-quickstarts”.

    `aws s3api create-bucket --bucket [BucketName --region [Region] --create-bucket-configuration LocationConstraint=[Region]`

The initial setup will have created a bucket in your account with the following
pattern: [stackname]-lambdazipsbucket-[randomhash]. Take the contents of this
bucket(including folder structure) and copy them to the custom bucket that was just created.

The following command can be used to quickly move the files:

    `aws s3 cp s3://[SourceBucketName]/ s3://[TargetBucket]/ --recursive`

You should now have all of the lambda scripts in your bucket.

### Step 3: modify the lambda function

There is only one Lambda function that needs to be modified. It can be found at
s3://[BucketName]/git2s3/latest/lambdas/GitPullS3.zip. Pull down a copy of this
zip file, unzip it, and replace the file lambda_function.py with the following script:

    from pygit2 import Keypair,credentials,discover_repository,Repository,clone_repository,RemoteCallbacks
    from boto3 import client,resource
    import os,stat
    import shutil
    from zipfile import ZipFile
    from ipaddress import ip_network, ip_address
    import json
    import logging
    import hmac
    import hashlib

    ### If true the function will not include .git folder in the zip
    exclude_git=True

    ### If true the function will delete all files at the end of each invocation, useful if you run into storage space constraints, but will slow down invocations as each invoke will need to checkout the entire repo
    cleanup=False

    key='enc_key'

    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    logger.handlers[0].setFormatter(logging.Formatter('[%(asctime)s][%(levelname)s] %(message)s'))
    logging.getLogger('boto3').setLevel(logging.ERROR)
    logging.getLogger('botocore').setLevel(logging.ERROR)

    s3 = client('s3')
    kms = client('kms')
    s3r = resource('s3')

    def write_key(filename,contents):
        logger.info('Writing keys to /tmp/...')
        mode = stat.S_IRUSR | stat.S_IWUSR
        umask_original = os.umask(0)
        try:
            handle = os.fdopen(os.open(filename, os.O_WRONLY | os.O_CREAT, mode), 'w')
        finally:
            os.umask(umask_original)
        handle.write(contents+'\n')
        handle.close()

    def get_keys(keybucket,pubkey,update=False):
        if not os.path.isfile('/tmp/id_rsa') or not os.path.isfile('/tmp/id_rsa.pub') or update:
            logger.info('Keys not found on Lambda container, fetching from S3...')
            enckey = s3.get_object(Bucket=keybucket,Key=key)['Body'].read()
            privkey = kms.decrypt(CiphertextBlob=enckey)['Plaintext']
            write_key('/tmp/id_rsa',privkey)
            write_key('/tmp/id_rsa.pub',pubkey)
        return Keypair('git','/tmp/id_rsa.pub','/tmp/id_rsa','')

    def init_remote(repo, name, url):
        remote = repo.remotes.create(name, url, '+refs/*:refs/*')
        return remote

    def create_repo(repo_path, remote_url, creds):
        if os.path.exists(repo_path):
                logger.info('Cleaning up repo path...')
                shutil.rmtree(repo_path)
        repo = clone_repository(remote_url, repo_path, callbacks=creds )

        return repo

    def pull_repo(repo, remote_url, creds):
        remote_exists = False
        for r in repo.remotes:
            if r.url == remote_url:
                remote_exists = True
                remote = r
        if not remote_exists:
            remote = repo.create_remote('origin',remote_url)
        logger.info('Fetching and merging changes...')
        remote.fetch(callbacks=creds)
        remote_master_id = repo.lookup_reference('refs/remotes/origin/master').target
        repo.checkout_tree(repo.get(remote_master_id))
        master_ref = repo.lookup_reference('refs/heads/master')
        master_ref.set_target(remote_master_id)
        repo.head.set_target(remote_master_id)
        return repo

    def zip_repo(repo_path,repo_name):
        logger.info('Creating zipfile...')
        zf = ZipFile('/tmp/'+repo_name.replace('/','_')+'.zip','w')
        for dirname, subdirs, files in os.walk(repo_path):
            if exclude_git:
                try:
                    subdirs.remove('.git')
                except ValueError:
                    pass
            zdirname = dirname[len(repo_path)+1:]
            zf.write(dirname,zdirname)
            for filename in files:
                zf.write(os.path.join(dirname, filename),os.path.join(zdirname, filename))
        zf.close()
        return '/tmp/'+repo_name.replace('/','_')+'.zip'

    def push_s3(filename,repo_name,outputbucket):
        s3key='%s/%s' % (repo_name,filename.replace('/tmp/',''))
        logger.info('pushing zip to s3://%s/%s' % (outputbucket,s3key))
        data=open(filename,'rb')
        s3.put_object(Bucket=outputbucket,Body=data,Key=s3key)
        logger.info('Completed S3 upload...')

    def sync_to_s3(path, repo_name, bucketname):
        for root,dirs,files in os.walk(path):
            for filename in files:
                path_and_file = os.path.join(root,filename).replace('/tmp/','')
                logger.info("processing %s", path_and_file)
                s3.upload_file(os.path.join(root,filename),bucketname, path_and_file)
                logger.info('File uploaded to https://s3.%s.amazonaws.com/%s/%s' % (
                    os.environ['AWS_REGION'], bucketname, path_and_file))
    def empty_bucket(bucketname):
        bucket = s3r.Bucket(bucketname)
        bucket.objects.all().delete()

    def lambda_handler(event,context):
        print(json.dumps(event))
        keybucket=event['context']['key-bucket']
        outputbucket=event['context']['output-bucket']
        pubkey=event['context']['public-key']
        ### Source IP ranges to allow requests from, if the IP is in one of these the request will not be chacked for an api key
        ipranges=[]
        for i in event['context']['allowed-ips'].split(','):
            ipranges.append(ip_network(u'%s' % i))
        ### APIKeys, it is recommended to use a different API key for each repo that uses this function
        apikeys=event['context']['api-secrets'].split(',')
        ip = ip_address(event['context']['source-ip'])
        secure=False
        for net in ipranges:
            if ip in net:
                secure=True
        if 'X-Gitlab-Token' in event['params']['header'].keys():
            if event['params']['header']['X-Gitlab-Token'] in apikeys:
                secure=True
        if 'X-Git-Token' in event['params']['header'].keys():
            if event['params']['header']['X-Git-Token'] in apikeys:
                secure=True
        if 'X-Gitlab-Token' in event['params']['header'].keys():
            if event['params']['header']['X-Gitlab-Token'] in apikeys:
                secure=True
        if 'X-Hub-Signature' in event['params']['header'].keys():
            for k in apikeys:
                if hmac.new(str(k),str(event['context']['raw-body']),hashlib.sha1).hexdigest() == str(event['params']['header']['X-Hub-Signature'].replace('sha1=','')):
                    secure=True
        if not secure:
            logger.error('Source IP %s is not allowed' % event['context']['source-ip'])
            raise Exception('Source IP %s is not allowed' % event['context']['source-ip'])
        try:
            repo_name = event['body-json']['project']['path_with_namespace']
        except:
            repo_name = event['body-json']['repository']['full_name']
        try:
            remote_url = event['body-json']['project']['git_ssh_url']
        except:
            try:
                remote_url = 'git@'+event['body-json']['repository']['links']['html']['href'].replace('https://','').replace('/',':',1)+'.git'
            except:
                remote_url = event['body-json']['repository']['ssh_url']
        repo_path = '/tmp/%s' % repo_name
        creds = RemoteCallbacks( credentials=get_keys(keybucket,pubkey), )
        try:
            repository_path = discover_repository(repo_path)
            repo = Repository(repository_path)
            logger.info('found existing repo, using that...')
        except:
            logger.info('creating new repo for %s in %s' % (remote_url, repo_path))
            repo = create_repo(repo_path, remote_url, creds)
        pull_repo(repo,remote_url,creds)
        empty_bucket(outputbucket)
        sync_to_s3(repo_path,repo_name=repo_name, bucketname=outputbucket)
        if cleanup:
            logger.info('Cleanup Lambda container...')
            shutil.rmtree(repo_path)
            shutil.rm(zipfile)
            shutil.rm('/tmp/id_rsa')
            shutil.rm('/tmp/id_rsa.pub')
        return 'Successfully updated %s' % repo_nam

Once replaced, repack the zip file with the same name and upload to your S3 bucket, replacing the existing GitPullS3.zip file.

### Step 4: modify the cloudformation template to use custom code

Now we need to redeploy our Cloudformation Template to source the code from our S3 bucket as opposed to the AWS Quick Start bucket. The reason for the redeploy as opposed to Stack Update is that the existing IAM roles will cause a CopyObject error as we are switching to a new S3 bucket as the source for the configuration files.

1. Go to Cloudformation and delete the existing stack.
2. Create a new stack with our now modified template.
3. Update the fields to now reflect our new bucket for sourcing the code.
4. Now continue through to creation of your stack with the new values.
5. Configure your repo of choice with the webhook and access key generated by the new stack.
6. Finally, make a commit to your repo to test. You should see your repo cloned into S3.

### Bonus

While the steps above will get you there, it would be even easier to use a pre-created template with
all modifications in place. Please find the Cloudformation JSON file and python script on our public github.#

Happy coding!

<a class="cta purple" id="cta" href="https://www.rackspace.com/sap">Learn more about our SAP services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Sales Chat** to [chat now](https://www.rackspace.com/) and start the conversation.
