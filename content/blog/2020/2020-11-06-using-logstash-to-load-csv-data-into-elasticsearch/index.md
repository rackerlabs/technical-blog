---
layout: post
title: "Using Logstash to load CSV data into Elasticsearch"
date: 2020-11-06
comments: true
author: Erik Beebe
bio: "Build and manage effective teams. Design, build and manage reliable infrastructure, networks, processes. Datacenter, infrastructure planning. Databases (MongoDB, MySQL, etc.). Containers and virtualization (OpenVZ, LXC, Proxmox, Docker, KVM, etc). Storage engineering."
published: true
authorIsRacker: true
categories:
    - Database
    - ObjectRocket
metaTitle: "Using logstash to load csv data into elasticsearch"
metaDescription: "Do you have a brand new Elasticsearch&reg; instance, but all your useful data you’d like to search lives in a **CSV** file? No problem. Logstash&reg; makes turning almost any data into something easily searchable in an Elasticsearch index."
ogTitle: "Using logstash to load csv data into elasticsearch"
ogDescription: "Do you have a brand new Elasticsearch&reg; instance, but all your useful data you’d like to search lives in a **CSV** file? No problem. Logstash&reg; makes turning almost any data into something easily searchable in an Elasticsearch index."
slug: "using-logstash-to-load-csv-data-into-elasticsearch"
canonical: https://www.objectrocket.com/blog/elasticsearch/using-logstash-for-csv-data-elasticsearch/
---

*Originally published on Sep 10, 2015, at ObjectRocket.com/blog*

Do you have a brand new Elasticsearch&reg; instance, but all your useful data you’d like to search lives in a **CSV** file?
No problem. Logstash&reg; makes turning almost any data into something easily searchable in an Elasticsearch index.

<!--more-->

{{<img src="picture1.png" title="" alt="">}}

To start with, you need some data and an environment similar to Unix&reg; to use these examples. Windows&reg; works fine with
some minor adjustments. In this case, we wanted to take an export of the data from our **Davis Vantage Pro2&reg;** weather
station, in `.CSV` format, and create a new index with it.

We started with a few million lines similar to these, stored in a local file:

    $ head -3 /home/erik/weather.csv
    HumOut,TempIn,DewPoint,HumIn,WindDir,RainMonth,WindSpeed,RainDay,BatteryVolts,WindChill,Pressure,time,TempOut,WindSpeed10Min,RainRate
    76,78.0,78.227017302825,44,109,2.0,2,0.0,1.236328125,90.87261657090625,29.543,2015-06-18T17:49:29Z,86.5,1,0.0
    76,78.0,78.227017302825,44,107,2.0,2,0.0,1.236328125,90.87261657090625,29.543,2015-06-18T17:49:45Z,86.5,1,0.0
    76,78.0,78.32406784157725,44,107,2.0,0,0.0,1.236328125,90.83340000000001,29.543,2015-06-18T17:50:00Z,86.59999999999999,1,0.0

**Note:** For this experiment to work, you need to have at least one data source.

After you have data, you can get started. First, make sure you have a version of Java installed:

    $ java -version
    openjdk version "1.8.0_51"

Any **Java Virtual Machine** (JVM) is fine for this&mdash;OpenJDK&reg;, Oracle&reg;, and so on.

    $ curl -O https://download.elastic.co/logstash/logstash/logstash-1.5.4.tar.gz
    $ tar xfz logstash-1.5.4.tar.gz
    $ cd logstash-1.5.4
    $ mkdir conf

Now, it’s time to build a configuration file.

First, define an `input` section where you tell **Logstash** where to find the data:

    input {
        file {
            path => "/home/erik/weather.csv"
            start_position => beginning

        }
    }

This just tells **Logstash** where to look and that we want to load from the beginning of the file. Next, we need a filter&mdash;[Logstash](https://www.elastic.co/guide/en/logstash/current/filter-plugins.html) has loads of filter plugins available by default. This example uses
a couple to parse the data. So far, Logstash doesn’t know anything about the data in the file&mdash;you need to specify the format and any
other specifics on how to handle various fields:

    filter {
        csv {
            columns => [
              "HumOut",
              "TempIn",
              "DewPoint",
              "HumIn",
              "WindDir",
              "RainMonth",
              "WindSpeed",
              "RainDay",
              "BatteryVolts",
              "WindChill",
              "Pressure",
              "time",
              "TempOut",
              "WindSpeed10Min",
              "RainRate"
            ]
            separator => ","
            remove_field => ["message"]
            }
        date {
            match => ["time", "ISO8601"]
        }
        mutate {
            convert => ["TempOut", "float"]
        }
    }

The columns are self-explanatory, but here's more detail. First, the example removes the `message` field, which is an entry containing
the entire row. You won’t need it because you're searching for specific attributes. Second, it specifies that the `time` field contains
an `ISO8601-formatted date` so that **Elasticsearch** knows it's not a plain string. Finally, it uses the mutate function to convert the
`TempOut` value into a floating-point number.

Now, use the following code to ingest the data and parse it after storing it in Elasticsearch:

    output {
        elasticsearch {
            protocol => "https"
            host => ["iad1-20999-0.es.objectrocket.com:20999"]
            user => "erik"
            password => "mysupersecretpassword"
            action => "index"
            index => "eriks_weather_index"
        }
        stdout { }
    }

Finally, configure your host and port, authentication data, and the name of the index to store it in. 

Ok, let’s fire it up. If it’s working, it should look similar to this:

    $ bin/logstash -f conf/logstash.conf -v
    Logstash startup completed

Did it work? Ask Elasticsearch:

    $ curl -u erik:mysupersecretpassword 'https://iad1-20999-0.es.objectrocket.com:20999/_cat/indices?v'
    health status index               pri rep docs.count store.size pri.store.size
    green  open   eriks_weather_index 5   1   294854     95.8mb     48.5mb

The documents are there, so query for one:

    $ curl -u erik:mysupersecretpassword 'https://iad1-20999-0.es.objectrocket.com:20999/eriks_weather_index/_search?q=TempOut:>75&pretty&terminate_after=1'

This tells Elasticsearch to find documents with `TempOut` greater than 75 (`Tempout:>75`), to format it for human consumption (pretty),
and to return no more than one result per shard (`terminate_after=1`). It should return something like this:

    {
      "took" : 4,
      "timed_out" : false,
      "terminated_early" : true,
      "_shards" : {
        "total" : 5,
        "successful" : 5,
        "failed" : 0
      },
      "hits" : {
         "total" : 5,
         "max_score" : 1.0,
           "hits" : [ {
        "_index" : "eriks_weather_index",
          "_type" : "logs",
          "_id" : "AU-yXZJIJb3HnhKvpdNC",
          "_score" : 1.0,
          "_source":{"@version":"1","@timestamp":"2015-06-22T10:24:23.000Z","host":"kibana","path":"/home/erik/weather.csv","HumOut":"86","TempIn":"79.7","DewPoint":"70.65179649787358","HumIn":"46","WindDir":"161","RainMonth":"2.7","WindSpeed":"0","RainDay":"0.36","BatteryVolts":"1.125","WindChill":"82.41464999999999","Pressure":"29.611","time":"2015-06-22T10:24:23Z","TempOut":75.1,"WindSpeed10Min":"0","RainRate":"0.0"}
        } ]
       } 
    }

Success. Logstash is a great Swiss Army Knife for turning any data you have laying around into something you can easily play within Elasticsearch, so have fun!

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/dba-services">Learn more about Rackspace DBA Services.</a>

Visit [www.rackspace.com](https://www.rackspace.com) and click **Sales Chat**
to start the cinversation. Use the **Feedback** tab to make any comments or ask questions.

Click here to view [The Rackspace Cloud Terms of Service](https://www.rackspace.com/cloud/legal/).
