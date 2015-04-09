---
layout: post
title: Hangfire 1.4.0
category: release
version: 1.4.0
author: odinserj
---

About 4 months passed since last major release of Hangfire 1.3, and I'm pleased to introduce a pre-release version of Hangfire 1.4 with a lot of new features added, and a lot of stability improvements made. This is the most important upgrade since 1.0 version released.

### Global Configuration

OWIN bootstrapper, `JobStorage.Current`-like properties and simple instances like `var storage = new SqlServerStorage` bring a lot of confusion, especially when trying to make Always Running mode working. With the latest release, only global and non-global settings are used through the `GlobalConfiguration` class:

{% highlight csharp %}
GlobalConfiguration.Configuration
    .UseNLog()
    .UseAutofac()
    .UseRedis();
{% endhighlight %}

Moreover, this is a single plugging point for extensions that may add new filters, new dashboard pages, etc:

{% highlight csharp %}
GlobalConfiguration.Configuration
    .UseRedis()
    .UseBatches(); // Adds a menu item, a couple of pages as well as different filters
{% endhighlight %}

### Time Zone Support

Recurring job received some love and it is now possible to specify time zone:

{% highlight csharp %}
RecurringJob.AddOrUpdate(() => Console.Write(), "15 18 * * *", TimeZoneInfo.Utc);
// Or
RecurringJob.AddOrUpdate(() => Console.Write(), "15 21 * * *", TimeZoneInfo.Local);
// Or
RecurringJob.AddOrUpdate(
    () => Console.Write(), 
    "15 08 * * *", 
    TimeZoneInfo.FindSystemTimeZoneById("Hawaiian Standard Time"));
{% endhighlight %}

### Continuations

Continuations allow you to chain multiple jobs together and run one jobs only after another's completion. This may drastically improve job composition and make your jobs re-usable.

{% highlight csharp %}
var jobId = BackgroundJob.Enqueue(() => Console.Write("Hello, "));
BackgroundJob.ContinueWith(jobId, () => Console.WriteLine("world!"));
{% endhighlight %}

By default, a continuation will be enqueued after parent job completion. However, you can schedule it as well:

{% highlight csharp %}
var jobId = BackgroundJob.Enqueue(() => Console.Write("Hello, "));

BackgroundJob.ContinueWith(
    jobId, 
    () => Console.WriteLine("world!"), 
    new ScheduledState(TimeSpan.Minutes(1)));
{% endhighlight %}

### Redesigned Dashboard

Dashboard was redesigned, new navigation, less colors, more accents. It also become extensible, so you can add new pages and modify navigation menus. Even if you slightly look at the picture below, you'll get all the problems you have – 1573 items in queues, no active servers and one failed jobs you have to re-queue or delete.

[![New Dashboard](/img/new-dashboard.png)](/img/new-dashboard.png)

### And much more!

Full release notes are here: https://github.com/HangfireIO/Hangfire/releases/tag/v1.4.0-beta1