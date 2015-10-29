---
title: Hangfire Pro 1.2.0
category: release
author: odinserj
---

After a long development, batches and batch continuations are completed, and I'm glad to introduce these features. It was a real challenge for me and for Hangfire to implement these features as a regular extension. If you don't share my joy (*Batches? Why I need them?*), I'll show you why they are so important.

### Atomic Background Job Creation

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

### Chaining Batches

Continuations allow you to chain multiple batches together. They will be executed once *all background jobs* of a parent batch finished. Consider the previous example where you have 1000 emails to send. If you want to make final action after sending, just add a continuation:

<pre><span class="keywd">var</span> id1 = <span class="type">BatchJob</span>.StartNew(<span class="comm">/* for (var i = 0; i &lt; 1000... */</span>);
<span class="keywd">var</span> id2 = <span class="type">BatchJob</span>.ContinueWith(id, x => 
{
    x.Enqueue(() => MarkCampaignFinished());
    x.Enqueue(() => NotifyAdministrator());
});</pre>

So batches and batch continuations allow you to define workflows and configure what actions will be executed in parallel. This is very useful for heavy computational methods as they can be distributed to a diffirent machines.

### Complex Workflows

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

### Transparent

As other parts of Hangfire, batches are fully transparent, so you can observe them in the Dashboard. Here is a list of started batches, for example:

![Batch List]({{ site.cdn }}/img/batch-list.png)

And this is a batch details page, that is like job details, but for batches. You can see all the data related to a batch as well as all related background jobs.

![Batch Details]({{ site.cdn }}/img/batch-details.png)

### Installation

Batches are available in the [`Hangfire.Pro`](http://nuget.hangfire.io/feeds/hangfire-pro/Hangfire.Pro/) package, and you can install it using NuGet Package Manager Console window as usually:

<pre class="nuget-install">PM> Install-Package Hangfire.Pro</pre>

Batches require to add some additional job filters, some new pages to the Dashboard, and some new navigation menu items. But thanks to the new `GlobalConfiguration` class, it is now as simple as a one method call:

<pre><span class="type">GlobalConfiguration</span>.Configuration.UseBatches();</pre>

<div class="alert alert-info">
	Only <strong>Hangfire.SqlServer</strong> and <strong>Hangfire.Pro.Redis</strong> job storage implementations are currently supported. There is nothing special for batches, but some new storage methods should be implemented. I'll contact job storage authors, but don't know any estimates.
</div>

### Only in Pro

Batches are a part of Hangfire Pro package set and available onдн for Hangfire Pro subscribers.

<div class="text-center">
    <hr>
    <a class="btn btn-lg btn-success" href="/subscriptions/">Get a subscription</a>
    <hr>
</div>
