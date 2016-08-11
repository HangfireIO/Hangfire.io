---
layout: products
title: Hangfire Features
active: overview
sub_active: features
redirect_from: /core/features.html
---

<h1 class="page-header">Features</h1>

### Queue-based processing

Instead of invoking a method synchronously, place it on a persistent queue, and Hangfire worker thread will take it and perform within its own execution context:

{% highlight csharp %}
BackgroundJob.Enqueue(() => Console.WriteLine("Hello, world!"));
{% endhighlight %}

This method creates a job in the storage and immediately returns control to the caller. Hangfire guarantees that the specified method will be called even after the abnormal termination of the host process.

### Delayed method invocation

Instead of invoking a method right now, you can postpone its execution for a specified time:

{% highlight csharp %}
BackgroundJob.Schedule(() => Console.WriteLine("Hello, world!"), TimeSpan.FromMinutes(5));
{% endhighlight %}

This call also saves a job, but instead of placing it to a queue, it adds the job to a persistent schedule. When the given time has elapsed, the job will be added to its queue. Meanwhile, you can restart your application – it will be executed anyway.

### Recurring tasks

Recurring job processing has never been easier. All you need is a single line of code:

{% highlight csharp %}
RecurringJob.AddOrUpdate(() => Console.Write("Easy!"), Cron.Daily);
{% endhighlight %}

Hangfire uses NCrontab library to perform scheduling tasks, so you can use more complex CRON expressions:

{% highlight csharp %}
RecurringJob.AddOrUpdate(() => Console.Write("Powerful!"), "0 12 * */2");
{% endhighlight %}

### SQL Server and Redis support

Hangfire uses persistent storage to store jobs, queues and statistics and let them survive application restarts. The storage subsystem is abstracted enough to support both classic SQL Server and fast Redis.

* SQL Server provides simplified installation together with usual maintenance plans.
* Redis provides awesome speed, especially comparing to SQL Server, but requires additional knowledge.

### Automatic retries

If your method encounters a transient exception, don’t worry – it will be retried automatically in a few seconds. If all retry attempts are exhausted, you are able to restart it manually from integrated web interface.

You can also control the retry behavior with the AutomaticRetryAttribute class. Just apply it to your method to tell Hangfire the number of retry attempts:

{% highlight csharp %}
[AutomaticRetry(Attempts = 100)]
public static void GenerateStatistics() { }

BackgroundJob.Enqueue(() => GenerateStatistics());
{% endhighlight %}

### Guaranteed processing

Hangfire was made with the knowledge that the hosting environment can kill all the threads on each line. So, it does not remove the job until it is successfully completed and contains different implicit retry logic to do the job when its processing was aborted.

### Instance method calls

All the examples above uses static method invocation, but instance methods are supported as well:

{% highlight csharp %}
public class EmailService
{
    public void Send() { }
}

BackgroundJob.Enqueue<EmailService>(x => x.Send());
{% endhighlight %}

When a worker sees that the given method is an instance-method, it will activate its class first. By default, the `Activator.CreateInstace` method is used, so only classes with default constructors are supported by default. But you can plug in your IoC container and pass the dependencies through the constructor.

### Culture capturing

When you marshal your method invocation into another execution context, you should be able to preserve some environment settings. Some of them – `Thread.CurrentCulture` and `Thread.CurrentUICulture` are automatically captured for you.

It is done by the `PreserveCultureAttribute` class that is applied to all of your methods by default.

### Cancellation tokens

Hangfire can tell your methods were aborted or canceled due to shutdown event, so you can stop them gracefully using job cancellation tokens that are similar to the regular `CancellationToken` class.

{% highlight csharp %}
public void Method(IJobCancellationToken token)
{
    for (var i = 0; i < Int32.MaxValue; i++)
    {
        token.ThrowIfCancellationRequested();
        Thread.Sleep(1000);
    }
}
{% endhighlight %}

### IoC Containers

In case you want to improve the testability of your job classes or simply don’t want to use a huge amount of different factories, you should use instance methods instead of static ones. But you either need to somehow pass the dependencies into these methods and the default job activator does not support parameterful constructors.

Don’t worry, you can use your favourite IoC container that will instantiate your classes. There are two packages, Hangfire.Ninject and Hangfire.Autofac for their respective containers. If you are using another container, please, write it yourself (on a basis of the given packages) and contribute to Hangfire project.

### Logging

Hangfire uses the Common.Logging library to log all its events. It is a generic library and you can plug it to your logging framework using adapters. Please, see the list of available adapters on NuGet Gallery.

### Web Garden and Web Farm friendly

You can run multiple Hangfire instances, either on the same or different machines. It uses distributed locking to prevent race conditions. Each Hangfire instance is redundant, and you can add or remove instances seamlessly (but control the queues they listen).

### Multiple queues processing

Hangfire can process multiple queues. If you want to prioritize your jobs or split the processing across your servers (some processes the archive queue, others – the images queue, etc), you can tell Hangfire about your decisions.

To place a job into a different queue, use the QueueAttribute class on your method:

{% highlight csharp %}
[Queue("critical")]
public void SomeMethod() { }

BackgroundJob.Enqueue(() => SomeMethod());
{% endhighlight %}

To start to process multiple queues, you need to update your OWIN bootstrapper’s configuration action:

{% highlight csharp %}
app.UseHangfire(config =>
{
    config.UseServer("critical", "default");
});
{% endhighlight %}

The order is important, workers will fetch jobs from the critical queue first, and then from the default queue.

### Concurrency level control

Hangfire uses its own fixed worker thread pool to consume queued jobs. Default worker count is set to Environment.ProcessorCount * 5. This number is optimized both for CPU-intensive and I/O intensive tasks. If you experience excessive waits or context switches, you can configure the amount of workers manually:

{% highlight csharp %}
app.UseHangfire(config =>
{
    config.UseServer(100);
});

// or
var server = new BackgroundJobServer(100);
{% endhighlight %}

### Process jobs anywhere

By default, the job processing is made within an ASP.NET application. But you can process jobs either in a console application, Windows Service, or anywhere else.

### Extensibility

Hangfire is built to be as generic as possible. You can extend the following parts:

* storage implementation;
* states subsystem (including the creation of new states);
* job creation process;
* job performance process;
* state changing process;
* job activation process.

Some of core components are made as extensions: QueueAttribute, PreserveCultureAttribute, AutomaticRetryAttribute, SqlServerStorage, RedisStorage, NinjectJobActivator, AutofacJobActivator, ScheduledState.
