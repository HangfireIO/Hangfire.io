---
layout: core
title: Overview – Hangfire Core
display_brand: true
sub_active: overview
---

<p class="lead">
    Hangfire Core is a set of <strong>open-source</strong> libraries that help you to create, process and manage your background jobs.
</p>

### 1. Create

{% highlight csharp %}
BackgroundJob.Enqueue(() => Console.Write("Hello!"));
{% endhighlight %}

### 2. Process

{% highlight csharp %}
var s = new BackgroundJobServer();
s.Start();
{% endhighlight %}

### 3. Manage

<img src="/img/dashboard.png" alt="Hangfire Dashboard" width="865">