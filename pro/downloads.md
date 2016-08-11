---
layout: products
title: Downloads
active: overview
sub_active: pro-downloads
---

<h1 class="page-header">Hangfire Pro Downloads</h1>

Hangfire Pro packages are hosted on a [private ProGet Server](https://nuget.hangfire.io/feeds/hangfire-pro). Package downloads are available only for [Hangfire Pro subscribers](http://hangfire.io/pricing/). After paying, you'll instantly receive a link to download the Hangfire Pro binaries (non-NuGet based). Please give me 24 hours to generate your credentials for private NuGet server.

Avaliable Packages
-------------------

* [Hangfire.Pro](https://nuget.hangfire.io/feeds/hangfire-pro/Hangfire.Pro/) – batches and batch continuations to create a bunch of background jobs atomically as well as add continuation after all batch jobs executed.
* [Hangfire.Pro.Redis](https://nuget.hangfire.io/feeds/hangfire-pro/Hangfire.Pro.Redis/) – ultra-fast job storage for Hangfire based on key-value store [Redis](http://redis.io).
* [Hangfire.Pro.PerformanceCounters](https://nuget.hangfire.io/feeds/hangfire-pro/Hangfire.Pro.PerformanceCounters/) – allows Hangfire to publish its metrics to Windows Performance Counters – the standard way to monitor Windows applications and services.

Configuring Feed
-----------------

To configure a private feed in Visual Studio open **Tools &rarr; NuGet Package Manager &rarr; Package Manager Settings** and add a new feed with the following URL:

    https://nuget.hangfire.io/nuget/hangfire-pro

![Package Manager Settings Window](/img/pkg-source-pro.png)

Alternatively, you can run the following command to add a new package source using command line:

    nuget sources add -Name "Hangfire Pro" -Source https://nuget.hangfire.io/nuget/hangfire-pro -UserName user -Password secret

Installing Packages
--------------------

After configuring private NuGet feed, use your favourite method to install Hangfire Pro NuGet packages.

### Package Manager Console

The Package Manage Console can be opened in Visual Studio through `Tools` &rarr; `Library Package Manager` &rarr; `Package Manager Console`. 

<pre class="nuget-install">PM> Install-Package Hangfire.Pro</pre>

<a href="http://docs.nuget.org/docs/start-here/Using-the-Package-Manager-Console" target="_blank">More details about Package Manager Console</a> <span class="glyphicon glyphicon-small glyphicon-new-window"></span>

### Package Manager Dialog (Visual Studio)

1. Right-click on your project and click "Manage NuGet Packages".
2. Select "NuGet Offical Package Source"
3. Search for "Hangfire", using the search bar at the top right
4. Select "Hangfire" and choose Install

<a href="http://docs.nuget.org/docs/start-here/managing-nuget-packages-using-the-dialog" target="_blank">More details on how to use Package Manager Dialog</a> <span class="glyphicon glyphicon-small glyphicon-new-window"></span>
