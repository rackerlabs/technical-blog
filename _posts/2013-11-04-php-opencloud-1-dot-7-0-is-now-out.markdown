---
layout: post
title: "PHP OpenCloud 1.7.0 is now out"
date: 2013-11-04 10:00
comments: true
author: Jamie Hannaford
published: true
categories:
- phpopencloud
- php
- sdk
- developers
---

We've just let PHP OpenCloud v1.7.0 into the wild, so it would be great to give some details of the SDK's new abilities. I've written a [changelog](https://github.com/rackspace/php-opencloud/blob/master/docs/changelog/1.7.0.md) of features, plus an [upgrade guide](https://github.com/rackspace/php-opencloud/blob/master/docs/changelog/Upgrading%20to%201.7.0.md) for any folks who are daunted with the prospect of updating their codebase.

<!-- more -->

## Semantic changes

We've changed a few core method names for greater consistency and clarity. For example, the factory method for initializing a Compute/Nova service is:

```php
use OpenCloud\Rackspace;

$client = new Rackspace(RACKSPACE_US, array(
	'username' => 'foo',
	'apiKey'   => 'bar'
));

$service = $client->computeService('cloudServersOpenStack');
```

Rather than `$client->compute()`. I think there's a need for clarity because there are lots of objects in the SDK that are associated with "Compute".

Also, where possible, resource models will enforce better encapsulation and a more consistent public API. Gradually we're rolling out changes so that object properties are mutated through setter methods and accessed through getter methods, rather than direct interaction with object properties. It also works better for awkward names (especially API extensions). If I want to do something to server OS Disk config for example:

```php
// messy
$server->{'OS-DCF:diskConfig'} = 'MANUAL';

// better
use OpenCloud\Compute\Constants\DiskState;

$server->setDiskConfig(DiskState::MANUAL);
```

The above will be part of an upcoming release - but I just wanted to indicate the direction of the SDK.

## Faster uploads

Where possible, all requests are batched and executed concurrently using PHP's multi_curl functionality. One feature which incorporates this concurrency is uploading objects to CloudFiles:

```php
$files = array(
    array(
        'name' => 'apache.log',
        'path' => '/etc/httpd/logs/error_log'
    ),
    array(
        'name' => 'mysql.log',
        'body' => fopen('/tmp/mysql.log', 'r+')
    ),
    array(
        'name' => 'to_do_list.txt',
        'body' => 'PHONE HOME'
    )
);

$container->uploadObjects($files);
```

As you can see, the `name` key is required for every file. You must also specify _either_ a path key (to an existing file), or a `body`. The `body` can either be a PHP resource or a string representation of the content you want to upload.

Another cool breakthrough is our support for large files, or DLOs (dynamic large object), as they're known in OpenStack terminology. Uploading these types of file are super easy now and, most importantly, very quick:

```php
use OpenCloud\Common\Constants\Size;
use OpenCloud\ObjectStore\Exception\UploadException;

$transfer = $container->setupObjectTransfer(array(
    'name' => 'video.mov',
    'path' => '/home/jamie/video.mov',
    'metadata' => array(
        'Author' => 'Jamie'
    ),
    'concurrency' => 4,
    'partSize'    => 1.5 * Size::GB
));
try {
	$transfer->upload();
} catch (UploadException $e) {
	echo 'The world imploded :(';
}
```

So what we're doing here is breaking up the mega file into 1.5GB chunks, and assigning 4 cURL handles to upload chunks concurrently. So if you're uploading a 15GB file, you will  see 10 "segment files" in your Container. The naming convention will be `video.mov/segment/1`, `video.mov/segment/2`, etc. After all these segments are uploaded, a "manifest file" will be uploaded (under the name `video.mov`). When `video.mov` is accessed, the manifest file is requested which will concatenate all the smaller segments into one.

There's a bunch of cool stuff you can do now using CloudFiles - for the full list (including two other ways to upload files), I'd recommend reading our new [user docs](https://github.com/rackspace/php-opencloud/tree/master/docs/userguide/ObjectStore) for this feature.

## Guzzle

Perhaps the most noticeable change is that the `Guzzle\Http` component now powers the majority of HTTP functionality. Instead of maintaining this common utility code, we're allowing a dedicated open-source project to take care of it, allowing us to concentrate on rolling out more API features. For more information, you can view the [official website](http://docs.guzzlephp.org/en/latest/) and the [source code](https://github.com/guzzle/guzzle/tree/master/src/Guzzle/Http).

### Better URL handling

URLs are now treated as `Guzzle\Http\Url` objects throughout the library rather than basic strings. Another thing to realize is that although the `url()` method still works for most resource objects, it is now deprecated - you should use `getUrl()` instead. Let's give it a spin:

```php
$url = $loadBalancer->getUrl();

echo $url->getScheme(); // => https
echo $url->getHost();   // => ord.loadbalancers.api.rackspacecloud.com
echo $url->getPath();   // => /v1.0/1234/loadbalancers

echo (string) $url;     // https://ord.loadbalancers.api.rackspacecloud.com/v1.0/1234/loadbalancers
```

You can also use this class for your own use:
```php
use Guzzle\Http\Url;

$string = 'http://something.com/hello/world?foo=bar';

$url = Url::factory($string);

$url->setPath('/changed/my/mind////baz');
$url->normalizePath();

/** @var Guzzle\Http\QueryString */
$query = $url->getQuery();
echo (string) $query;
```

Similarly, you can take advantage of the consistently named new HTTP requests methods, and construct your own:

```php
use Guzzle\Http\Exception\ClientErrorResponseException;

$headers = array('If-Modified-Since' => 'Tue, 15 Nov 1994 08:12:31 GMT');
$request = $client->get('http://my-website.com/resource/12345', $headers);

try {
	$response = $request->send();
} catch (ClientErrorResponseException $e) {
	// we got a 4** error :(
}

echo $response->getStatusCode();

/** @var Guzzle\Http\EntityBody */
$payload = $response->getBody();

// You can interact with this variable as if it's a stream...

echo $payload->getContentLength();
echo $payload->getContentType();

// or cast it as a string...
echo (string) $payload;
```

So, all in all, a whole ton of awesome new stuff. We're constantly working on new features - one thing I want to work on next is uploading/synchronizing entire directories with CloudFiles. If you have any cool ideas for upcoming releases, or would like to contribute code, you are more than welcome to do so.
