---
layout: post
title: Integrate your Zend Framework 2 app with Rackspace Cloud
date: '2014-01-29 10:30'
comments: true
author: Jamie Hannaford
published: true
categories: []
---
[Zend Framework 2](http://zendframework.com/) is an incredibly popular PHP framework that allows you to create web applications in an efficient, quick and robust manner. I could have chosen other web frameworks like [Symfony](http://symfony.com/), [Laravel](http://laravel.com/), [Yii](http://www.yiiframework.com/) or [CodeIgniter](http://ellislab.com/codeigniter); or even frameworks in different languages like Django or Rails, but I'll stick to personal preference for this blog post.

Since the release of v2.0, there has been a wave of exciting features introduced into the codebase - like the service locator, event management, modularization, among many others. In this tutorial, I'll introduce a module I wrote that makes integrating your web app with Rackspace Cloud a piece of cake. After reading, you'll be able to access all the functionality of the API in a manner consistent with the ZF2 framework - saving you time and hassle.

<!-- more -->

## Installation

If you already have your ZF2 web app up and running, you can skip to Step 2.

### Step 1: Install sample app

To save time, I've gone ahead and created [a skeleton app](https://github.com/jamiehannaford/zf2-opencloud-skeleton-app) for you. The app acts as a basic cloud control panel, providing access to your Cloud Servers, Cloud Files containers and your Cloud Databases. To install, you must have the Composer archive file installed. If you haven't, [follow these steps](https://github.com/jamiehannaford/php-opencloud-zf2#step-1-install-composer-if-you-havent-already); otherwise:

```bash
php composer.phar create-project -sdev jamiehannaford/zf2-opencloud-skeleton-app
cd zf2-opencloud-skeleton-app
```

You will need to set up a virtual host for your web server (e.g. Apache or nginx) and [enable short tags](http://stackoverflow.com/a/2185336/427992). Once setup, you'll have something like [this](http://23.253.63.225/).

### Step 2: Install the ZF2 Module

Once you're located in your project directory, make sure your `composer.json` file contains the required dependency:

```json
"require": {
   "jamiehannaford/php-opencloud-zf2": "~1.0"
}
```

Then you can go ahead and install the module:

```bash
php composer.phar install
```

### Step 3: Configuration

If you're not using the skeleton app, you will need to update your existing `application.config.php` file so that it includes our module:

```php
return array(
    'modules' => array(
        'OpenCloud'
    )
);
```

You also need to copy the empty dist file into your config directory like so:

```bash
cp ./vendor/jamiehannaford/php-opencloud-zf2/config/opencloud.local.php.dist ./config/autoload/opencloud.local.php
```

All that remains is to edit `./config/autoload/opencloud.local.php` with your credentials and local settings.

## Play time

For the sake of this tutorial, we'll be playing around with the [skeleton app](https://github.com/jamiehannaford/zf2-opencloud-skeleton-app) in order to see the full benefits of the ZF2 module.

### Accessing the SDK from your controller

The controllers should be the glue of your application, bonding your models and database layer to your front-end markup. With ZF2, you have a convenient and powerful [registry system](http://zf2.readthedocs.org/en/latest/modules/zend.service-manager.intro.html) that stores every service your app might possibly need to instantiate. What this means is that object creation becomes centralized - decoupling your application from extraneous modules and classes. So if you ever change a class namespace, you change it in _one place_ rather than having to recursively grep the fudge out of your workspace.

To access the client:

```php
$client = $this->getServiceLocator()->get('OpenCloud');
```

This will return an instance of [`OpenCloud\Rackspace`](https://github.com/rackspace/php-opencloud/blob/master/lib/OpenCloud/Rackspace.php) and will allow you to access all the functionality of the SDK base class. For more context, see how the [`ServersController`](https://github.com/jamiehannaford/zf2-opencloud-skeleton-app/blob/master/module/Application/src/Application/Controller/ServersController.php) instantiates it in the skeleton app.

Using the skeleton app codebase above, I booted up a test VM for you to check out: [click here to view the test control panel](http://23.253.63.225). One thing you will notice is that certain pages are quite slow - only because they're having to make an API call on each request. Obviously you would use a database or caching solution for your production website, but this is enough to illustrate the point for testing.

The module offers great flexibility, as well as the full power of the underlying SDK. The [`CloudFilesController`](https://github.com/jamiehannaford/zf2-opencloud-skeleton-app/blob/master/module/Application/src/Application/Controller/CloudFilesController.php), for example, is able to:

- iterate over a collection of containers (`indexAction`)
- display the details of a container, based on a GET parameter (`containerAction`)
- display the details of an object based on a GET parameter (`fileAction`)

in a few action methods.

### Accessing CloudFiles functionality from your HTML views

Sometimes, having to inject all your dependencies from controller to view can get arduous and bloated. To get around this, the ZF2 module offers you a cool helper class to access the API, straight from your view file:

```php
<? $container = $this->cloudFilesHelper('my_container'); ?>
```

The above will retrieve the contents of your container, allowing full access to its contents.

#### Rendering files

You can then take advantage of the `renderFile` method:

```php
<?= $container->renderFile('sample.mp3'); ?>
```

which will **convert the URI into valid HTML tags**. This is awesome and can save you a lot of time when all your want is standard vanilla markup. Providing `sample.mp3`, therefore, will output something like this:

```html
<audio controls>
  <source src="http://<cdn-domain>.com/sample.mp3" type="audio/mp3">
</audio>
```

#### Specifying tag attributes

In fact, any **audio**, **video**, **image** or **flash/object** content will be automatically converted for you. You can also provide your own tag attributes:

```php
<?= $container->renderFile('rembrandt.png', array('class' => 'large')); ?>
```

which will render:

```html
<img src="http://<cdn-domain>.com/rembrandt.png" class="large" alt="rembrandt.png" />
```

#### Specifying URI types

Every asset can be represented in multiple forms - it has one URL for non-SSL connections, another for SSL connections, one for streaming, and another for iOS streaming. To leverage this functionality, provide your choice as a third option:

```php
<?= $container->renderFile('logs.txt', array(), 'SSL'); ?>
```

will render:

```html
<a href="https://<cdn-domain>.com/logs.txt">logs.txt</a>
```

As you will have noticed, any file which does not have a `image/*`, `audio/*`, `video/*` or `application/x-shockwave-flash` MIME type will default to a standard hyperlink.

### Other cool features

We've already seen what the CloudFilesHelper can do in your views (and how much time it can save), but there are a few other features.

#### Retrieve the URI

If your requirements are more complex, you can retrieve the URI of a resource and use it in your own bespoke HTML:

```html
<div style="background-image:<?= $helper->renderFileUrl('header.png'); ?>"></div>
```

#### Render the full contents of a container

If you need to quickly output the full contents of a Swift container, this is easy to do:

```php
<?= $helper->renderAllFiles(3, 'SSL', '<div>', '</div>'); ?>
```

The first argument is the number of files you want to retrieve (i.e. the limit); if set to `false` all resources are retrieved. The second is the URL type. The third and fourth allow you to wrap HTML tags around each item in the collection. The above will be rendered like this:

```html
<div>
   <img src="https://<cdn-domain>.com/my_container/asset_1.png" />
</div>
<div>
   <img src="https://<cdn-domain>.com/my_container/asset_2.png" />
</div>
<div>
   <img src="https://<cdn-domain>.com/my_container/asset_3.png" />
</div>
```

## Conclusion

So there you have it. Feel free to install [the module](https://github.com/jamiehannaford/php-opencloud-zf2) and try all this out yourself. We welcome contributions and feedback. If you run into any problems, feel free to submit an issue on Github or tweet me: [@jamiehannaford](https://twitter.com/jamiehannaford).

Happy hacking!
