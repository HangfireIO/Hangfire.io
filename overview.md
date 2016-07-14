---
layout: products
title: Hangfire Overview
product_name: Hangfire
active: overview
sub_active: overview
redirect_from: /core/
---

<p>
    Hangfire is an <strong>open-source</strong> framework that helps you to create, process and manage your background jobs, i.e. operations you don't want to put in your request processing pipeline:
</p>

<div class="row">
    <div class="col-md-6">
        <ul>
            <li>mass notifications/newsletter;</li>
            <li>batch import from xml, csv, json;</li>
            <li>creation of archives;</li>
            <li>firing off web hooks;</li>
            <li>deleting users;</li>
        </ul>
    </div>
    <div class="col-md-6">
        <ul>
            <li>building different graphs;</li>
            <li>image/video processing;</li>
            <li>purge temporary files;</li>
            <li>recurring automated reports;</li>
            <li>database maintenance.</li>
        </ul>
    </div>
</div>

### All Types of Background Jobs

Hangfire supports all kind of background tasks – short-running and long-running, CPU intensive and I/O intensive, one shot and recurrent. You don't need to reinvent the wheel – it is ready to use.

---

<div class="row">
    <div class="col-md-6">
        <h4>Fire-and-forget</h4>
        <p>
            These jobs are being executed <strong>only once</strong> and almost <strong>immediately</strong> after they fired.
        </p>
<pre><span class="keywd">var</span> jobId = <span class="type">BackgroundJob</span>.Enqueue(
    () => <span class="type">Console</span>.WriteLine(<span class="string">"Fire-and-forget!"</span>));</pre>
    </div>
    <div class="col-md-6">
        <h4>Delayed</h4>
        <p>
            Delayed jobs are being executed <strong>only once</strong> too, but not immediately – only after the <strong>specified time interval</strong>.
        </p>
<pre><span class="keywd">var</span> jobId = <span class="type">BackgroundJob</span>.Schedule(
    () => <span class="type">Console</span>.WriteLine(<span class="string">"Delayed!"</span>),
    <span class="type">TimeSpan</span>.FromDays(7));</pre>
    </div>
</div>

---

<div class="row">
    <div class="col-md-6">
        <h4>Recurring</h4>
        <p>
            Recurring jobs fired <strong>many times</strong> on the specified <strong>CRON schedule</strong>.
        </p>
<pre><span class="type">RecurringJob</span>.AddOrUpdate(
    () => <span class="type">Console</span>.WriteLine(<span class="string">"Recurring!"</span>),
    <span class="type">Cron</span>.Daily);</pre>
    </div>
    <div class="col-md-6">
        <h4>Continuations</h4>
        <p>
            Continuations are executed when parent job <strong>has been finished</strong>.
        </p>
<pre><span class="type">BackgroundJob</span>.ContinueWith(
    jobId,
    () => <span class="type">Console</span>.WriteLine(<span class="string">"Continuation!"</span>));</pre>
    </div>
</div>

---

<div class="row">
    <div class="col-md-6">
        <h4>Batches</h4>
        <p>
            Batch is a group of background jobs <strong>created atomically</strong>.
            <pre><code><span class="keywd">var</span> batchId = <span class="type">Batch</span>.StartNew(x =>
{
    x.Enqueue(() => <span class="type">Console</span>.WriteLine(<span class="string">"Job 1"</span>));
    x.Enqueue(() => <span class="type">Console</span>.WriteLine(<span class="string">"Job 2"</span>));
});</code></pre>
        </p>
    </div>
    <div class="col-md-6">
        <h4>Batch Continuations</h4>
        <p>
            Batch continuation is fired <strong>when all</strong> background jobs in a parent batch <strong>finished</strong>.
        </p>
        <pre><code><span class="type">Batch</span>.ContinueWith(batchId, x =>
{
    x.Enqueue(() => <span class="type">Console</span>.WriteLine(<span class="string">"Last Job"</span>));
});</code></pre>
    </div>
</div>

---

<div class="row">
    <div class="col-md-12">
        <h4>Background Process</h4>
        <p>
            Use them when you need to run background processes <strong>continuously</strong> throught the <strong>lifetime</strong> of your application.
        </p>
<pre><code><span class="keywd">public</span> <span class="keywd">class</span> <span class="type">CleanTempDirectoryProcess</span> : <span class="type">IBackgroundProcess</span>
{
    <span class="keywd">public</span> <span class="keywd">void</span> Execute(<span class="type">BackgroundProcessContext</span> context)
    {
        <span class="type">Directory</span>.CleanUp(<span class="type">Directory</span>.GetTempDirectory());
        context.Wait(<span class="type">TimeSpan</span>.FromHours(1));
    }
}</code></pre>
    </div>
</div>

---

### Backed by Persistent Storage

Background jobs are very important part of an application and Hangfire ensures that any job is being performed **at least once**. To persist background job information between application restarts, all the information is being saved in your favorite persistent storage. Currently the following storages are supported:

<table class="text-center supported-storages">
    <tr>
        <td width="33%">
            <img src="/img/sqlserver.png" alt="SQL Server" width="150">
        </td>
        <td width="33%">
            <a href="/pro/">
                <img src="/img/redis.png" alt="Redis" width="180">
            </a>
        </td>
        <td width="33%">
            <a href="https://github.com/frankhommers/Hangfire.PostgreSql" target="_blank">
                <img src="/img/postgresql.png" alt="PostgreSQL" width="250">
            </a>
        </td>
    </tr>
</table>
<table class="text-center supported-storages">
    <tr>
        <td width="16%">&nbsp;</td>
        <td width="33%">
            <a href="https://github.com/sergun/Hangfire.Mongo" target="_blank">
                <img src="/img/mongodb.png" alt="MongoDB" width="250">
            </a>
        </td>
        <td width="33%">
            <a href="https://www.nuget.org/packages/Hangfire.CompositeC1" target="_blank">
                <img src="/img/composite-c1.png" alt="Composite C1 CMS" width="250" style="margin-top:23px;">
            </a>
        </td>
        <td width="16%">&nbsp;</td>
    </tr>
</table>

<em>All product names, logos, and brands are property of their respective owners, and are in no way associated or affiliated with Hangfire.</em>

Storage subsystem is abstracted enough to support RDBMS and NoSQL solutions. If your favorite database system is not supported yet, you can implement it. It is cheaper than implementing a background job system from scratch.

### Automatic Retries

If your background job encounters a problem during its execution, it will be retried automatically after some delay. Hangfire successfully deals with the following problems:

* Exceptions
* Application shutdowns
* Unexpected process terminations

You are also able to retry any background job manually through the programming code or the Dashboard UI:

<div class="row">
    <div class="col-md-6">
<pre><span class="keywd">var</span> jobId = <span class="type">BackgroundJob</span>.Enqueue(
    () => <span class="type">Console</span>.WriteLine(<span class="string">"Hello"</span>));

<span class="keywd">var</span> succeeded = <span class="type">BackgroundJob</span>.Requeue(jobId);</pre>
    </div>
    <div class="col-md-6">
        <a href="/img/retry.png" data-lightbox="Screenshots" data-title="Succeeded Job">
            <img src="/img/retry.png" alt="Dashboard Retry" width="379" class="img-thumbnail">
        </a>
    </div>
</div>

### Scale as You Grow

You are not required to make any architecture decisions to start using Hangfire. You can begin with simple setup, where background processing is being implemented on the web application side.

Later, when you face with performance problems, you can separate the processing among different processes or servers – Hangfire uses distributed locks to handle synchronization issues.

<div class="tabbable tabs-left">
    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active">
            <a href="#process" role="tab" data-toggle="tab">Single Process</a>
        </li>
        <li role="presentation">
            <a href="#garden" role="tab" data-toggle="tab">Web Garden</a>
        </li>
        <li role="presentation">
            <a href="#farm" role="tab" data-toggle="tab">Web Farm</a>
        </li>
        <li role="presentation">
            <a href="#service" role="tab" data-toggle="tab">Separate Service</a>
        </li>
        <li role="presentation">
            <a href="#server" role="tab" data-toggle="tab">Separate Server</a>
        </li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content tab-content-center text-center">
        <div role="tabpanel" class="tab-pane active" id="process">
            <img src="/img/process.png" alt="Single Process">
        </div>
        <div role="tabpanel" class="tab-pane" id="garden">
            <img src="/img/garden.png" alt="Web Garden">
        </div>
        <div role="tabpanel" class="tab-pane" id="farm">
            <img src="/img/farm.png" alt="Web Farm">
        </div>
        <div role="tabpanel" class="tab-pane" id="service">
            <img src="/img/service.png" alt="Separate Service">
        </div>
        <div role="tabpanel" class="tab-pane" id="server">
          <img src="/img/server.png" alt="Separate Server">
        </div>
    </div>
</div>

### Integrated Monitoring UI

Hangfire is shipped with an awesome tool – Web Monitoring UI. It is implemented as an OWIN extensions and though can be hosted inside any application – ASP.NET, Console or Windows Service. Monitoring UI allows you to see and control any aspect of background job processing, including statistics, exceptions and background job history.

Just look at the screenshots below, and you'll love it!

<div class="row screenshots">
    <div class="col-md-4">
        <a href="//cdn.hangfire.io/img/ui/dashboard.png" data-lightbox="Screenshots" data-title="Dashboard">
            <img src="//cdn.hangfire.io/img/ui/dashboard-sm.png" alt="Dashboard">
        </a>
    </div>
    <div class="col-md-4">
        <a href="//cdn.hangfire.io/img/ui/queues.png" data-lightbox="Screenshots" data-title="Queue List">
            <img src="//cdn.hangfire.io/img/ui/queues-sm.png" alt="Queue List">
        </a>
    </div>
    <div class="col-md-4">
        <a href="//cdn.hangfire.io/img/ui/job-details.png" data-lightbox="Screenshots" data-title="Job Details">
            <img src="//cdn.hangfire.io/img/ui/job-details-sm.png" alt="Job Details">
        </a>
    </div>
</div>

<div class="row screenshots">
    <div class="col-md-4">
        <a href="//cdn.hangfire.io/img/ui/retries.png" data-lightbox="Screenshots" data-title="Retry List">
            <img src="//cdn.hangfire.io/img/ui/retries-sm.png" alt="Retry List">
        </a>
    </div>
    <div class="col-md-4">
        <a href="//cdn.hangfire.io/img/ui/failed-jobs.png" data-lightbox="Screenshots" data-title="Failed Job List">
            <img src="//cdn.hangfire.io/img/ui/failed-jobs-sm.png" alt="Failed Job List">
        </a>
    </div>
    <div class="col-md-4">
        <a href="//cdn.hangfire.io/img/ui/recurring-jobs.png" data-lightbox="Screenshots" data-title="Recurring Jobs">
            <img src="//cdn.hangfire.io/img/ui/recurring-jobs-sm.png" alt="Recurring Jobs">
        </a>
    </div>
</div>

<div class="row screenshots">
    <div class="col-md-4">
        <a href="//cdn.hangfire.io/img/ui/batches.png" data-lightbox="Screenshots" title="Batch List">
            <img src="//cdn.hangfire.io/img/ui/batches-sm.png" alt="Batch List">
        </a>
    </div>
    <div class="col-md-4">
        <a href="//cdn.hangfire.io/img/ui/batch-details.png" data-lightbox="Screenshots" title="Batch Details">
            <img src="//cdn.hangfire.io/img/ui/batch-details-sm.png" alt="Batch Details">
        </a>
    </div>
    <div class="col-md-4">
        <a href="//cdn.hangfire.io/img/ui/batch-jobs.png" data-lightbox="Screenshots" title="Batch Jobs">
            <img src="//cdn.hangfire.io/img/ui/batch-jobs-sm.png" alt="Batch Jobs">
        </a>
    </div>
</div>

<hr>
<div class="text-center">
    <a class="btn btn-primary btn-lg" href="http://docs.hangfire.io/en/latest/quick-start.html">Quick Start</a>
    <span class="btn btn-lg">or</span>
    <a class="btn btn-default btn-lg" href="/pro/">Hangfire Pro</a>
</div>
<hr>
