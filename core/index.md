---
layout: products
title: Hangfire Core
display_brand: true
product_name: Hangfire Core
sub_active: core-overview
---

<p>
    Hangfire Core is a set of <strong>open-source</strong> libraries that help you to create, process and manage your background jobs, i.e. operations you don't want to put in your request processing pipeline:
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

Hangfire supports all kind of background tasks – short-running and long-running, CPU intensive and I/O intensive, constantly running and task-based, one shot and recurrent. You don't need to reinvent the wheel – it is ready to use.

---

<div class="row">
    <div class="col-md-6">
        <h4>Fire-and-forget</h4>
        <p>
            These jobs are being executed <strong>only once</strong> and almost <strong>immediately</strong> after they fired.
        </p>
<pre><span class="type">BackgroundJob</span>.Enqueue(
    () => <span class="type">Console</span>.WriteLine(<span class="string">"Fire-and-forget!"</span>));</pre>
    </div>
    <div class="col-md-6">
        <h4>Delayed</h4>
        <p>
            Delayed jobs are being executed <strong>only once</strong> too, but not immediately – only after the <strong>specified time interval</strong>.
        </p>
<pre><span class="type">BackgroundJob</span>.Schedule(
    () => <span class="type">Console</span>.WriteLine(<span class="string">"Delayed!"</span>),
    <span class="type">TimeSpan</span>.FromDays(7));</pre>
    </div>
</div>

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
        <h4>Background Process</h4>
        <p>
            Use it if you need to run background processes <strong>continously</strong> throught the <strong>lifetime</strong> of your application.
        </p>
<pre><span class="comm">// Coming soon</span>
<span class="keywd">var</span> server = <span class="keywd">new</span> <span class="type">BackgroundJobServer</span>();
server.AddProcess&lt;<span class="type">CustomQueueHandler</span>&gt;();</pre>
    </div>
</div>

---

### Backed by Persistent Storage

Lorem ipsum dolor sit amet, consectetur adipisicing elit. In enim tempora omnis, delectus magnam minima, quasi amet ipsum soluta earum facilis quae voluptatibus iste non. Repudiandae ratione, distinctio alias explicabo.

<table style="width: 100%; margin: 20px 0;" class="text-center">
    <tr>
        <td width="33%"><img src="/img/sqlserver.png" alt="SQL Server" width="150"></td>
        <td width="33%"><img src="/img/redis.png" alt="Redis" width="180"></td>
        <td width="33%"><img src="/img/postgresql.png" alt="PostgreSQL" width="250"></td>
    </tr>
</table>

Want more? Implement it!

### Automatic retries after Exceptions and Unexpected Shutdowns

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, voluptatibus at, sed voluptate dolorum, nam laboriosam quis qui quas aspernatur ducimus! Repellat tempore quia optio odio officia dolorum quisquam facere.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse fugit, vero sunt totam commodi tenetur quibusdam quasi doloribus culpa possimus officia earum nostrum quisquam beatae perferendis delectus assumenda, nulla dolorum.

### Optional Distributed Processing

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae magni sapiente enim soluta! Numquam natus fuga accusantium, delectus necessitatibus fugit totam iure rerum mollitia aliquam quae! Dolores, harum, quae? Expedita!

<div class="text-center">
    <img src="/img/workflow.png" alt="Hangfire Workflow" style="padding: 40px;">
</div>

You can host any part of Hangfire in any application – Web application, Console application, Windows Service, Azure Worker Role, etc.

### Integrated web monitoring UI

<div class="row screenshots">
    <div class="col-md-4">
        <a href="/img/dashboard.png" data-lightbox="Screenshots" data-title="Dashboard">
            <img src="/img/dashboard-sm.png" alt="Hangfire Dashboard">
        </a>
    </div>
    <div class="col-md-4">
        <a href="/img/succeeded-job.png" data-lightbox="Screenshots" data-title="Succeeded Job">
            <img src="/img/succeeded-job-sm.png" alt="Hangfire Succeeded Job">
        </a>
    </div>
    <div class="col-md-4">
        <a href="/img/failed-job.png" data-lightbox="Screenshots" data-title="Failed Job">
            <img src="/img/failed-job-sm.png" alt="Hangfire Failed Job">
        </a>
    </div>
</div>

<div class="row screenshots">
    <div class="col-md-4">
        <a href="/img/succeeded-jobs.png" data-lightbox="Screenshots" data-title="Succeeded Job List">
            <img src="/img/succeeded-jobs-sm.png" alt="Hangfire Succeeded Job List">
        </a>
    </div>
    <div class="col-md-4">
        <a href="/img/failed-jobs.png" data-lightbox="Screenshots" data-title="Failed Job List">
            <img src="/img/failed-jobs-sm.png" alt="Hangfire Failed Job List">
        </a>
    </div>
    <div class="col-md-4">
        <a href="/img/recurring-jobs.png" data-lightbox="Screenshots" data-title="Recurring Jobs">
            <img src="/img/recurring-jobs-sm.png" alt="Hangfire Recurring Jobs">
        </a>
    </div>
</div>

<div class="row screenshots">
    <div class="col-md-4">
        <a href="/img/queues.png" data-lightbox="Screenshots" title="Queues">
            <img src="/img/queues-sm.png" alt="Hangfire Queue List">
        </a>
    </div>
    <div class="col-md-4"></div>
    <div class="col-md-4"></div>
</div>