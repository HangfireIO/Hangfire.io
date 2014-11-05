---
layout: core
title: Overview – Hangfire Core
display_brand: true
sub_active: overview
---

<p class="lead">
    Hangfire Core is a set of <strong>open-source</strong> libraries that help you to create, process and manage your background jobs, i.e. operations you don't want to put in your request processing pipeline:
</p>

<div class="row">
    <div class="col-md-6">
        <ul class="lead">
            <li>mass notifications/newsletter;</li>
            <li>batch import from xml, csv, json;</li>
            <li>creation of archives;</li>
            <li>firing off web hooks;</li>
            <li>deleting users;</li>
        </ul>
    </div>
    <div class="col-md-6">
        <ul class="lead">
            <li>building different graphs;</li>
            <li>image/video processing;</li>
            <li>purge temporary files;</li>
            <li>recurring automated reports;</li>
            <li>database maintenance.</li>
        </ul>
    </div>
</div>

### Supports all types of background jobs

<div class="row">
    <div class="col-md-6">
        <h4>Fire-and-forget</h4>
        <p>
            These jobs are being executed <strong>only once</strong> and almost <strong>immediately</strong> after they fired.
        </p>
{% highlight csharp %}
BackgroundJob.Enqueue(
    () => Console.WriteLine("Fire-and-forget!"));
{% endhighlight %}
    </div>
    <div class="col-md-6">
        <h4>Delayed</h4>
        <p>
            Delayed jobs are being executed <strong>only once</strong> too, but not immediately – only after the <strong>specified time interval</strong>.
        </p>
{% highlight csharp %}
BackgroundJob.Schedule(
    () => Console.WriteLine("Delayed!"),
    TimeSpan.FromDays(7));
{% endhighlight %}
    </div>
</div>

<div class="row">
    <div class="col-md-6">
        <h4>Recurring</h4>
        <p>
            Recurring jobs fired <strong>many times</strong> on the specified <strong>CRON schedule</strong>.
        </p>
{% highlight csharp %}
RecurringJob.AddOrUpdate(
    () => Console.WriteLine("Recurring!"),
    Cron.Daily);
{% endhighlight %}
    </div>
    <div class="col-md-6">
        <h4>Constantly running</h4>
        <p>
            asdkjgha
        </p>
{% highlight csharp %}
// Coming soon
var server = new BackgroundJobServer();
server.AddComponent<CustomQueueHandler>();
{% endhighlight %}
    </div>
</div>

### Integrated web monitoring UI

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde alias, animi nisi necessitatibus eaque sed repudiandae ex, laborum tempore officia! Recusandae ab error amet temporibus officiis, fugiat quod tempora impedit.

<div class="row">
    <div class="col-md-4">
        <img src="http://placehold.it/350x150" width="100%">
    </div>
    <div class="col-md-4">
        <img src="http://placehold.it/350x150" width="100%">
    </div>
    <div class="col-md-4">
        <img src="http://placehold.it/350x150" width="100%">
    </div>
</div>

### Process them in any kind application

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores vero fuga, illo quaerat voluptas dolore modi fugiat ipsum iure amet, officia, enim facere aspernatur sed deleniti soluta ducimus aliquid corporis! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus in, omnis qui inventore, excepturi minima. Ipsa ipsum fugit sed dolorum asperiores aspernatur at, aliquid alias tenetur suscipit doloribus optio labore!

### Backed by persistent storage you like

Lorem ipsum dolor sit amet, consectetur adipisicing elit. In enim tempora omnis, delectus magnam minima, quasi amet ipsum soluta earum facilis quae voluptatibus iste non. Repudiandae ratione, distinctio alias explicabo.

* SQL Server (with optional MSMQ or RabbitMQ support)
* Postgresql
* Redis

Want more? Implement it!

### Automatic retries on unexpected exceptions and shutdown

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, voluptatibus at, sed voluptate dolorum, nam laboriosam quis qui quas aspernatur ducimus! Repellat tempore quia optio odio officia dolorum quisquam facere.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse fugit, vero sunt totam commodi tenetur quibusdam quasi doloribus culpa possimus officia earum nostrum quisquam beatae perferendis delectus assumenda, nulla dolorum.