---
layout: products
title: Hangfire Pro
beta: true
display_brand: true
product_name: Hangfire Pro
sub_active: pro-overview
---

<p>
    Hangfire Pro is an extension which adds a few nice features to Hangfire.  Hangfire is open source and free for all to use but unfortunately it takes a lot of my time to maintain and support.  Hangfire Pro is a way for you to purchase really useful functionality while also ensuring Hangfire will be supported for years to come.
</p>

## Features

<div class="row">
    <div class="col-md-6">
        <h3>High throughput with Redis</h3>

        <p>
            Hangfire Pro comes with <code>Hangfire.Redis</code> package that uses <a href="http://redis.io/">Redis</a> server to persist background jobs and other data. 
        </p>

        <div class="alert alert-info">
            This package is <strong>merged</strong> with ServiceStack.Redis package, so your <strong>application can use any version</strong> of <a href="https://servicestack.net/" target="_blank">ServiceStack</a> packages.
        </div>

        <p>
            Redis is famous for its outstanding <a href="http://redis.io/topics/benchmarks">performance</a> nd here are the results of relative comparison between Hangfire.SqlServer and Hangfire.Redis storages:
        </p>
        
        <p>
            <img src="/img/storage-compare.png" alt="Background Jobs Throughput" width="100%">
        </p>
        
        <p>
            This is a dirty benchmark that was made on developer machine with non-SSD drive.     
        </p>
    </div>
    <div class="col-md-6">
        <h3>Proactive monitoring</h3>

        <p>
            <code>Hangfire.PerformanceCounters</code> package allows Hangfire to publish its internal metrics to Windows Performance Counters – the standard way to monitor Windows applications and services.
        </p>

        <p>
            So, you can use existing tools like <a href="http://www.nagios.org/" target="_blank">Nagios</a>, <a href="http://newrelic.com/" target="_blank">New Relic</a>, <a href="https://www.serverdensity.com/" target="_blank">Server Density</a> and others to proactively monitor the health of your services.
        </p>
        <img src="/img/perfmon.png" alt="Performance Monitor" width="444">
    </div>
</div>

<div class="text-center">
    <hr>
    <a class="btn btn-lg btn-success" href="/subscriptions.html">Get a subscription</a>
    <hr>
</div>

## Coming soon

### Continuations

Continuations allow you to perform one jobs after others.

{% highlight csharp %}
BatchJob
    .Create(() => Console.Write("Hello, "))
    .ContinueWith(() => Console.WriteLine("world!"));
{% endhighlight %}

*This API is for preview purposes only, it is subject to change after the final implementation.*

### Parallel processing

With parallel processing you can split your work into a couple of small sub-jobs that will be processed in parallel. This feature together with continuations allows you to build more complex, but still reliable workflows with Hangfire.

{% highlight csharp %}
BatchJob
    .Create(x =>
    {
        x.Enqueue(() => Console.Write("Messy"));
        x.Enqueue(() => Console.Write("Output"));
        x.Enqueue(() => Console.Write("With"));
    })
    .ContinueWith(() => Console.WriteLine("Predictable continuation!"));
{% endhighlight %}

*This API is for preview purposes only, it is subject to change after the final implementation.*

### Async methods support

You don't need to guess the correct number of worker to handle I/O intensive jobs efficiently. Hangfire will be able to do other job while async operations pending to complete.

{% highlight csharp %}
public static async Task HighlightAsync(int snippetId)
{
    var snippet = await Context.Snippets.SingleOrDefaultAsync(snippetId);
    snippet.Code = await RemoveService.HighlightAsync(snippet.Code);

    await Context.SaveChangesAsync();
}
{% endhighlight %}

## Feature comparison

<table class="table">
    <colgroup>
        <col>
        <col>
        <col style="background-color: #f5f5f5;">
    </colgroup>
    <thead>
        <tr>
            <th>Feature</th>
            <th>Hangfire</th>
            <th>Hangfire Pro</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Background job processing</th>
            <td><i class="glyphicon glyphicon-ok"></i></td>
            <td><i class="glyphicon glyphicon-ok"></i></td>
        </tr>
        <tr>
            <th>Management UI</th>
            <td><i class="glyphicon glyphicon-ok"></i></td>
            <td><i class="glyphicon glyphicon-ok"></i></td>
        </tr>
        <tr>
            <th>Low latency &amp; high throughput processing</th>
            <td></td>
            <td><i class="glyphicon glyphicon-ok"></i></td>
        </tr>
        <tr>
            <th>Proactive monitoring</th>
            <td></td>
            <td><i class="glyphicon glyphicon-ok"></i></td>
        </tr>
        <tr>
            <th>Continuations <span class="label label-default">Not ready</span></th>
            <td></td>
            <td><i class="glyphicon glyphicon-cog" title="Under construction"></i></td>
        </tr>
        <tr>
            <th>Parallel Processing <span class="label label-default">Not ready</span></th>
            <td></td>
            <td><i class="glyphicon glyphicon-cog" title="Under construction"></i></td>
        </tr>
        <tr>
            <th>Async methods support <span class="label label-default">Not ready</span></th>
            <td></td>
            <td><i class="glyphicon glyphicon-cog" title="Under construction"></i></td>
        </tr>
    </tbody>
</table>