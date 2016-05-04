---
layout: products
title: Hangfire Pro
product_name: Hangfire Pro
sub_active: pro-overview
---

Hangfire Pro is a set of extensions packages that boost the performance and simplify the maintenance of background job processing in large applications. Hangfire Pro packages are available under paid [subscriptions](/subscriptions/). After purchase, you receive binaries and access to the private repository on GitHub.

## Packages

### Hangfire.Pro

#### Atomic Background Job Creation

Batches allow you to create a bunch of background jobs atomically. This means that if there was an exception during the creation of background jobs, none of them will be processed. Consider you want to send 1000 emails to your clients, and they really want to receive these emails. Here is the old way:

<pre><span class="keywd">for</span> (<span class="keywd">var</span> i = 0; i &lt; 1000; i++)
{
    <span class="type">BackgroundJob</span>.Enqueue(() => SendEmail(i));
    <span class="comm">// What to do on exception?</span>
}</pre>

But what if storage become unavailable on `i == 500`? 500 emails may be already sent, because worker threads will pick up and process jobs once they created. If you re-execute this code, some of your clients may receive annoying duplicates. So if you want to handle this correctly, you should write more code to track what emails were sent. 

But here is a much simpler method:

<div class="alert alert-warning">
    <h4>Configuration required</h4>
    <p>Before using batches, please call the <code>GlobalConfiguration.Configuration.UseBatches</code> method as written in <a href="http://docs.hangfire.io/en/latest/background-methods/using-batches.html#installation">the docs</a>.</p>
</div>

<pre><span class="type">BatchJob</span>.StartNew(x =>
{
    <span class="keywd">for</span> (<span class="keywd">var</span> i = 0; i &lt; 1000; i++)
    {
        x.Enqueue(() => SendEmail(i));
    }
});</pre>

In case of exception, you may show an error to a user, and simply ask to retry her action after some minutes. No other code required!

#### Chaining Batches

Continuations allow you to chain multiple batches together. They will be executed once *all background jobs* of a parent batch finished. Consider the previous example where you have 1000 emails to send. If you want to make final action after sending, just add a continuation:

<pre><span class="keywd">var</span> id1 = <span class="type">BatchJob</span>.StartNew(<span class="comm">/* for (var i = 0; i &lt; 1000... */</span>);
<span class="keywd">var</span> id2 = <span class="type">BatchJob</span>.ContinueWith(id1, x => 
{
    x.Enqueue(() => MarkCampaignFinished());
    x.Enqueue(() => NotifyAdministrator());
});</pre>

So batches and batch continuations allow you to define workflows and configure what actions will be executed in parallel. This is very useful for heavy computational methods as they can be distributed to a diffirent machines.

#### Complex Workflows

Create action does not restrict you to create jobs only in *Enqueued* state. You can schedule jobs to execute later, add continuations, add continuations to continuations, etc..

<pre><span class="keywd">var</span> batchId = <span class="type">BatchJob</span>.StartNew(x =>
{
    x.Enqueue(() => <span class="type">Console</span>.Write(<span class="string">"1a... "</span>));
    <span class="keywd">var</span> id1 = x.Schedule(() => <span class="type">Console</span>.Write(<span class="string">"1b... "</span>), <span class="type">TimeSpan</span>.FromSeconds(1));
    <span class="keywd">var</span> id2 = x.ContinueWith(id1, () => <span class="type">Console</span>.Write(<span class="string">"2... "</span>));
    x.ContinueWith(id2, () => <span class="type">Console</span>.Write(<span class="string">"3... "</span>));
});

<span class="type">BatchJob</span>.ContinueWith(batchId, x =>
{
    x.Enqueue(() => <span class="type">Console</span>.WriteLine(<span class="string">"4..."</span>));
});</pre>

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

### Async methods support

You don't need to guess the correct number of worker to handle I/O intensive jobs efficiently. Hangfire will be able to do other job while async operations pending to complete.

<pre><span class="keywd">public</span> <span class="keywd">static</span> <span class="keywd">async</span> <span class="type">Task</span> HighlightAsync(<span class="keywd">int</span> snippetId)
{
    <span class="keywd">var</span> snippet = <span class="keywd">await</span> <span class="type">Context</span>.Snippets.SingleOrDefaultAsync(snippetId);
    snippet.Code = <span class="keywd">await</span> <span class="type">RemoteService</span>.HighlightAsync(snippet.Code);

    <span class="keywd">await</span> Context.SaveChangesAsync();
}</pre>
