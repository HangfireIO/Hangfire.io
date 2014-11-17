---
layout: products
title: Hangfire Pro
display_brand: true
product_name: Hangfire Pro
sub_active: pro-overview
---

Hangfire Pro is a set of extensions packages that boost the performance and simplify the maintenance of background job processing in large applications. Hangfire Pro packages are available under paid [subscriptions](/subscriptions/). After purchase, you receive binaries and access to the private repository on GitHub.

## Packages

### Hangfire.Pro.Redis

<a class="pull-right" style="margin-left: 10px;" href="/img/storage-compare.png" data-lightbox="Screenshots">
    <img src="/img/storage-compare.png" alt="Background Jobs Throughput" width="222">
</a>

Hangfire Pro comes with `Hangfire.Redis` package that uses [Redis](http://redis.io/) server to persist background jobs and other data. 

Redis is famous for its outstanding [performance](http://redis.io/topics/benchmarks) and here are the results of relative comparison between Hangfire.SqlServer and Hangfire.Redis storages.

#### What's new in Pro

* [ServiceStack](https://servicestack.net/) packages are merged and internalized, so you can use either v3 or v4 versions of ServiceStack framework in your project.
* Prefix for Redis keys is now configurable, you can now use the same database for different environments, e.g. staging and production.

<div class="clearfix"></div>

### Hangfire.Pro.PerformanceCounters

<a class="pull-right" style="margin-left: 10px;" href="/img/perfmon.png" data-lightbox="Screenshots">
    <img src="/img/perfmon.png" alt="Performance Monitor" width="222">
</a>

`Hangfire.PerformanceCounters` package allows Hangfire to publish its internal metrics to Windows Performance Counters – the standard way to monitor Windows applications and services.

So, you can use existing tools like <a href="http://www.nagios.org/" target="_blank">Nagios</a>, <a href="http://newrelic.com/" target="_blank">New Relic</a>, <a href="https://www.serverdensity.com/" target="_blank">Server Density</a> and others to proactively monitor the health of your services.

<div class="clearfix"></div>

<div class="text-center">
    <hr>
    <a class="btn btn-lg btn-success" href="/subscriptions/">Get a subscription</a>
    <hr>
</div>

## Coming Soon

### Continuations

Continuations allow you to perform one jobs after others.

<pre><span class="type">BatchJob</span>.Create(() =&gt; <span class="type">Console</span>.Write(<span class="string">&quot;Hello, &quot;</span>))
        .ContinueWith(() =&gt; <span class="type">Console</span>.WriteLine(<span class="string">&quot;world!&quot;</span>));</pre>

*This API is for preview purposes only, it is subject to change after the final implementation.*

### Parallel processing

With parallel processing you can split your work into a couple of small sub-jobs that will be processed in parallel. This feature together with continuations allows you to build more complex, but still reliable workflows with Hangfire.

<pre><span class="type">BatchJob</span>
    .Create(x =&gt;
    {
        x.Enqueue(() =&gt; <span class="type">Console</span>.Write(<span class="string">&quot;Messy&quot;</span>));
        x.Enqueue(() =&gt; <span class="type">Console</span>.Write(<span class="string">&quot;Output&quot;</span>));
        x.Enqueue(() =&gt; <span class="type">Console</span>.Write(<span class="string">&quot;With&quot;</span>));
    })
    .ContinueWith(() =&gt; <span class="type">Console</span>.WriteLine(<span class="string">&quot;Predictable continuation&quot;</span>));</pre>

*This API is for preview purposes only, it is subject to change after the final implementation.*

### Async methods support

You don't need to guess the correct number of worker to handle I/O intensive jobs efficiently. Hangfire will be able to do other job while async operations pending to complete.

<pre><span class="keywd">public</span> <span class="keywd">static</span> <span class="keywd">async</span> <span class="type">Task</span> HighlightAsync(<span class="keywd">int</span> snippetId)
{
    <span class="keywd">var</span> snippet = <span class="keywd">await</span> <span class="type">Context</span>.Snippets.SingleOrDefaultAsync(snippetId);
    snippet.Code = <span class="keywd">await</span> <span class="type">RemoteService</span>.HighlightAsync(snippet.Code);

    <span class="keywd">await</span> Context.SaveChangesAsync();
}</pre>

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

<div class="text-center">
    <hr>
    <a class="btn btn-lg btn-success" href="/subscriptions/">Get a subscription</a>
    <hr>
</div>