---
layout: products
title: Hangfire Ace
active: overview
sub_active: ace-overview
---

<h1 class="page-header">Hangfire Ace</h1>

Hangfire Ace is a set of extension packages that bring advanced features for background job processing in business applications. Hangfire Ace packages are available under paid [subscriptions](/subscriptions/). After purchase, you receive binaries, access to the private NuGet feed and private repository on GitHub.

## Packages

### Hangfire.Throttling

<div class="alert alert-warning">
    <h4>Limited storage support</h4>
    <p>Please note, Hangfire.Throttling package is officially supported only when using <a href="https://docs.hangfire.io/en/latest/configuration/using-sql-server.html">Hangfire.SqlServer</a>, <a href="https://docs.hangfire.io/en/latest/configuration/using-redis.html">Hangfire.Pro.Redis</a> or <a href="https://github.com/HangfireIO/Hangfire.InMemory">Hangfire.InMemory</a> package as a job storage. We can not guarantee that throttlers will work properly with other storages, since processing guarantees heavily depend on a concrete storage implementation.</p>
</div>

[Hangfire.Throttling](/ace/downloads.html) package contains advanced types and methods to apply concurrency and rate limits directly to our background jobs without touching any logic related to queues, workers, servers or using additional services. So you can control how many particular background jobs are running at the same point of time or within a specific time window.

Throttling is performed asynchronously by rescheduling jobs to a later time or deleting them when throttling condition is met, depending on the configured behavior. And while throttled jobs are waiting for their turn, your workers are free to process other enqueued background jobs.

See [Concurrency and Rate Limiting](https://docs.hangfire.io/en/latest/background-processing/throttling.html) documentation article to learn more about throttling in Hangfire. Please note that this package is about throttling and not about consistency as highlighted in the documentation. Hangfire.SqlServer and Hangfire.Pro.Redis are currently the only officially supported storages for this package.

#### Concurrency Limiters

[Mutexes](https://docs.hangfire.io/en/latest/background-processing/throttling.html#mutexes) and [semaphores](https://docs.hangfire.io/en/latest/background-processing/throttling.html#semaphores) provide a way to limit how many background jobs are allowed to run concurrently. They can be applied to a particular background jobs by using attributes, and their state changing pipeline will be altered with the throttling logic. 

Here's an example of how to use mutex to allow only a single background job to be running concurrently.

<pre>[<span class="type">Mutex</span>(<span class="string">"daily-report"</span>)]
<span class="keywd">public</span> <span class="keywd">void</span> ProcessDailyReport() { <span class="comm">/* ... */</span> }</pre>

In the following example mutexes are created dynamically, depending on a concrete `orderId`. So there will be many of them with identifiers like `order:1234`, `order:4567`, etc., but we'll not have multiple background jobs running at the same time for a single `orderId` value.

<pre>[<span class="type">Mutex</span>(<span class="string">"order:{0}"</span>)]
<span class="keywd">public</span> <span class="keywd">void</span> ProcessOrder(<span class="keywd">long</span> orderId) { <span class="comm">/* ... */</span> }</pre>

In the yet another example we are creating a semaphore with the limit of 20 concurrent executions...

<pre>throttlingManager.AddOrUpdateSemaphore(<span class="string">"newsletter"</span>, <span class="keywd">new</span> <span class="type">SemaphoreOptions</span>(20));</pre>

... and applying the newly created semaphore to a background job method so we have maximum 20 background jobs that send a newsletter. 

<pre>[<span class="type">Semaphore</span>(<span class="string">"newsletter"</span>)]
<span class="keywd">public</span> <span class="keywd">void</span> SendNewsletter(<span class="keywd">int</span> newsletterId) { <span class="comm">/* ... */</span> }</pre>

#### Rate Limiters

[Fixed window counters](https://docs.hangfire.io/en/latest/background-processing/throttling.html#fixed-window-counters), [sliding window counters](https://docs.hangfire.io/en/latest/background-processing/throttling.html#sliding-window-counters) and [dynamic window counters](https://docs.hangfire.io/en/latest/background-processing/throttling.html#dynamic-window-counters) provide a way to limit how many background job executions are allowed to run within some time interval. Background job executions that exceed the configured threshold will be re-scheduled to the next window interval or deleted, depending on the configured behavior.

Different window types use different interval types, please see their documentation for details. And in the following example we are using a sliding window counter to limit how many requests issue to GitHub per hour. First we are creating a sliding window and setting its options...

<pre>throttlingManager.AddOrUpdateSlidingWindow(<span class="string">"github"</span>, <span class="keywd">new</span> <span class="type">SlidingWindowOptions</span>(
    <span class="comm">limit:</span> 5000,
    <span class="comm">interval:</span> <span class="type">TimeSpan</span>.FromHours(1),
    <span class="comm">buckets:</span> 60));</pre>

... and then applying an attribute to a background job method to make throttling work.

<pre>[<span class="type">SlidingWindow</span>(<span class="string">"github"</span>)]
<span class="keywd">public</span> <span class="keywd">void</span> ProcessCommits(<span class="keywd">string</span> repository) { <span class="comm">/* ... */</span> }</pre>

<div class="text-center">
    <hr>
    <a class="btn btn-lg btn-success" href="/subscriptions/">Get a subscription</a>
    <hr>
</div>

