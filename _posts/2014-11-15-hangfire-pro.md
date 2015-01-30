---
layout: post
title: Introducing Hangfire Pro
---

As an ASP.NET developer, I always wanted to have something simple to handle scenarios where you need to build a long-running async task and show a loader to a user:

<p style="text-align: center">
    <img src="/img/ajax-loader.gif" alt="Loader" style="width:54px;display:inline;margin-bottom:0;">
    <br>
    Loading…  
    <br>
    <em>Nothing is being loaded here, don't let hypnotize yourself!</em>
</p>

But every time I faced Windows Services, message queues and other difficult-to-understand problems and hard-to-maintain solutions, my head exploded into a billion pieces. At the same time I looked at Rails' [Sidekiq](http://sidekiq.org) and wished to have a simple .NET alternative for background job processing. That is why I began to develop [Hangfire](http://hangfire.io) (yep, just for the loader).

Slightly more than a year passed from the [first commit](https://github.com/HangfireIO/Hangfire/tree/d58a619ebc487ef28bef8c6e7f4df8e1d51ee8c5) and [first version](https://www.nuget.org/packages/Hangfire/0.1.0) of Hangfire. This was my first open-source project that is being used more than in one organization, and it was an amazing experience for me to grow a project from scratch. I'm glad to see more and more people coming to the project and giving positive ratings and unvaluable feedback.

I want to keep Hangfire project as free as possible, but eliminate the most dangerous risk – the absence of time. There are many things to be done, including problems, new features, documentation, and I want to do them in a reasonable time.

Today, I'm introducing a new stage of Hangfire development – [Hangfire Pro](http://hangfire.io/pro/). It is a set of paid libraries that extend Hangfire functionality by providing features to improve performance and simplifying maintenance of background job processing in larger applications.

### The Destiny of Hangfire.Redis

#### Bad News

First, I'll start with bad news – Hangfire.Redis package is moved to Hangfire Pro. This means that it became available only for Pro users and will be removed from public NuGet Gallery soon. 

I understand that this step breaks your expectations, and I'm sorry for this. The source code will be available at [Hangfire.Redis](https://github.com/HangfireIO/Hangfire.Redis) repository, but there will be no updates and official support.

**Other existing parts of Hangfire will not be moved to the Pro version ever**. Moreover, I'll try to do the vice versa, by open-sourcing paid extensions in the future, when the project will be more stable.

#### Good News

[Most](https://github.com/HangfireIO/Hangfire/issues/122) [wanted](https://github.com/HangfireIO/Hangfire/issues/195) features were implemented in the next version of Hangfire.Redis package. It now includes:

* **Compatibility with ServiceStack 4.0** libraries. It still uses ServiceStack v3 libraries, but `ILMerge /internalize` utility is being used to merge them into Hangfire.Redis assembly. So, you can use either Service v3 or v4 in your projects.
* **Configurable prefix for keys**. You can use now the same database for different environments by setting corresponding prefix for keys in the `RedisStorageOptions.Prefix` property.

### Hangfire Pro Today

Hangfire Pro already includes previously mentioned new version of **Hangfire Redis** package and a completely new **Hangfire.PerformanceCounters** package. The latter pushes internal metrics to Windows Performance Counters to proactively monitor issues with background job processing:

![Performance Monitor with Hangfire counters](http://hangfire.io/img/perfmon.png)

Hangfire Pro is available through the subscriptions you can buy at the [official site](http://hangfire.io/subscriptions/). After purchasing a subscription, you will be able to do the following things:

* Access to Hangfire Pro package **binaries** and **sources** on the private GitHub repository.
* Access to **priority and private support** by dedicated e-mail (public forum discussions will be always free).
* Use Hangfire under **EULA** for organizations that don't want to use open-source licenses.

### Hangfire Pro Roadmap

As I already said, Hangfire Pro will solve performance/usability/monitoring issues for larger web applications. Further work will be made in the following directions.

#### Batch Jobs

Batch jobs will help to build more complex workflows with Hangfire. They will give you the power of **parallel processing** and **continuations**, you can look at this code snippet:

```csharp
BatchJob
    .Create(x =>
    {
        x.Enqueue(() => Console.Write("Messy"));
        x.Enqueue(() => Console.Write("Output"));
        x.Enqueue(() => Console.Write("With"));
    })
    .ContinueWith(() => Console.WriteLine("Predictable continuation"));
```

Three first tasks will be executed in parallel, end the continuation will be invoked only after successful run of the first tasks.

#### Async Methods Support

As with [async controllers](http://msdn.microsoft.com/en-us/library/ee728598(v=vs.100).aspx) in ASP.NET MVC, this feature enables you to improve overall throughput keeping the lowest number of workers in the pool. Instead of waiting for an outstanding I/O operation, they will be able to process other background jobs as well.

```csharp
public static async Task HighlightAsync(int snippetId)
{
    var snippet = await Context.Snippets.SingleOrDefaultAsync(snippetId);
    snippet.Code = await RemoteService.HighlightAsync(snippet.Code);

    await Context.SaveChangesAsync();
}
```

### What are you waiting for?

Smart people say that content like this should contain a call to action. I have no enough experience to break the rules, so here it is:

<div style="text-align: center;">
    <a class="btn btn-lg btn-success" href="http://hangfire.io/subscriptions/">Get a Subscription</a>
</div>