---
title: Hangfire.Pro.Redis 2.0.0-beta1
author: odinserj
category: [release, hangfire-pro]
---

New major version of Hangfire.Pro.Redis package (a part of [Hangfire Pro](/pro/)) is almost here. Now it uses popular open-source library [StackExchange.Redis](https://github.com/StackExchange/StackExchange.Redis) to interact with [Redis](http://redis.io/) – a blazing fast data structure store.

The earlier version of Hangfire.Pro.Redis used ServiceStack.Redis package, and its authors changed the licensing model in the 4.0 release, requiring to buy a license for production usage. To not to introduce licensing burden for Hangfire Pro customers, I've decided to stay with unmaintained version 3.7 with custom patches, but it lacks of some features.

### Features

The goal of the initial 2.0 release is to offer the same capabilities and the same performance as in the previous release, plus the **SSL support** to handle Azure environment without sending unsecured password over the Internet.

### Limitations

Support for Sentinel and Cluster will be available later. StackExchange.Redis allows to properly interact with them by handling `MOVED` errors and reconnecting to masters automatically. But there is a problem related with subscribing to a slave, and it needs some more investigation. 

Additionally, proper high-availability mode requires separate master instances for acquiring distributed locks, and a robust [RedLock](http://redis.io/topics/distlock) algorithm implementation should be used to handle failover scenario.

### Upgrading

The new version is already available on the private NuGet feed under the [Hangfire.Pro.Redis 2.0.0-beta1](http://nuget.hangfire.io/feeds/hangfire-pro/Hangfire.Pro.Redis/2.0.0-beta1) version. You can upgrade to it by using the Package Manager Console window, but don't forget to add the `-Pre` switch:

{% highlight powershell %}
Update-Package Hangfire.Pro.Redis -Pre
{% endhighlight %}

Key differences:

* **Connection string format**. It is much more flexible than the previous one. You can look at [StackExchange.Redis documentation](https://github.com/StackExchange/StackExchange.Redis/blob/master/Docs/Configuration.md) for  details.
* **No connection pool**, just single connection for interacting with data, and single connection for pub/sub that is used by workers.

### Source Code

Hangfire.Pro.Redis source code now have dedicated [Hangfire.Pro.Redis](https://github.com/HangfireIO/Hangfire.Pro.Redis/tree/dev) repository, that is available for all the customers. If you still don't have an access, please send me your GitHub username to support AT hangfire.io. If you don't see any files – just switch to the `dev` branch.
