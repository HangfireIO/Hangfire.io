---
layout: blog
title: Deploying Hangfire while a job is running
category: feature
author: odinserj
---

Let's consider the following method as a long-running background job, where `Thread.Sleep` emulates a real task. `IJobCancellationToken` is briefly described in the [documentation](http://docs.hangfire.io/en/latest/background-methods/using-cancellation-tokens.html).

{% highlight csharp %}

public void LongRunning()
{
    for (var i = 0; i < 100000; i++) 
    { 
        Thread.Sleep(1000);
    }
}
{% endhighlight %}

Let's also start a Hangfire Server instance in a console application as follows. Please note that it is better to wrap the instance initialization into the `using` block, but we'll wrap it into the try-catch block instead for better clarity.

{% highlight csharp %}
public static void Main()
{
    using (new BackgroundJobServer())
    {
        Console.ReadLine();
    } // server.Dispose method is called here
}
{% endhighlight %}

What we can do to stop calls to the `Thread.Sleep` method? We can wait till the end of the loop, we can press <kbd>Enter</kbd> to and we can kill the process. Hangfire guarantees *at least once* processing, but what does this mean? Let's start with the worst case. 

**What happens when I kill Hangfire Server process?**

I.e. ungraceful shutdown

We are expecting that Hangfire will start processing again after ungraceful termination of our Hangfire Server, so we want a job to be re-queued. But let's be honest – Hangfire is unable to re-queue a job on a process termination, we can't call any additional code in this case.

The only thing we can do is to properly design or use our message queues to handle this case. The exact behavior differ from queue implementation, here are what happens with queues I've implemented.

* **Hangfire.SqlServer (pre 1.5)** – background job id is removed from table only on suc
* **Hangfire.SqlServer.Msmq** – uses transactional queues and transactional receive that have guaranteed instant re-queue on client failures.
* **Hangfire.Pro.Redis** – [`BRPOPLPUSH`](http://redis.io/commands/brpoplpush) command is used to fetch list

So a worker will fetch an aborted background job anyway, but sometimes **not immediately**, when a process was killed, a worker thread was aborted, or any exception was thrown during re-queue in the second section, or succeeded state setting in the third section.

Out of memory, thread abort, ...

**What happens when I call BackgroundJobServer.Dispose?**

I.e. graceful shutdown

In our example, this method is called when you press <kbd>Enter</kbd>. In web applications it is called automatically on application shutdown, but **only if you are using** `IAppBuilder.UseHangfireServer` or `HangfireBootstrapper` class from the [documentation](http://docs.hangfire.io/en/latest/deployment-to-production/making-aspnet-app-always-running.html) (it implements the `IRegisteredObject` interface to listen the shutdown event). If you don't call the `Dispose method`, the ungraceful shutdown scenario happens.

When you call the `Dispose` method, Hangfire cancels the shutdown cancellation token and waits some time (15 seconds by default), the option is configurable here. If your job does not finish in time, ungraceful shutdown is applied. If it uses cancellation token, graceful shutdown is applied, so it is better to use cancellation tokens where possible.

{% highlight csharp %}
public void LongRunning(CancellationToken cancellationToken)
{
    for (var i = 0; i < 100000; i++) 
    { 
        Thread.Sleep(1000);
        cancellationToken.ThrowIfCancellationRequested();
    }
}
{% endhighlight %}

When a worker receives the `OperationCancelledException`, it re-queues a background job back to the queue. On any exception during the re-queueing process, ungraceful shutdown scenario is applied.

When a cancellation token throws due to state change (other worker began to do the job), etc, 

**What happens when a method finishes its execution?**

When execution is finished, the background job is moved to the *succeeded* state, and its identifier is removed from the queue. In case of an exception, ungraceful shutdown is applied.

