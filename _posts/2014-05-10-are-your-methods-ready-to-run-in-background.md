---
layout: post
title: Are your methods ready to run in background?
---

HangFire takes regular classes and regular methods to perform them in the background, because it is simple to use them:

```csharp
BackgroundJob.Enqueue(() => Console.WriteLine("Hi!"));
```

This snippet says that the `Console.WriteLine` method will be *called* in background. But notice that the name of the method is `Enqueue`, and not the `Call`, `Invoke` and so on. 

The name of the method was choosed to highlight that invocation of a given method is only being *queued* in the current execution context and returns the control to a calling thread immediately after enqueueing. It will be invoked in a *different* execution context. 

What does this mean? Several things, that may break your usual expectations about method invocation process. You should be aware of them.

### Differences between local and background method invocation

#### Method invocation is being serialized

Before creating a background job, the information about the given method (its type, method name and parameter types) is being serialized to strings. MethodInfo serialization process is absolutely invisible to a user, unlike arguments serialization. 

Arguments are also serialized to string, but arguments serialization process uses the `TypeConverter` class. All standard classes like numbers, strings, dates and so on already have the corresponding `TypeConverter` implementation, but if you want to pass an instance of a custom class as an argument, you should write the custom converter first.

```csharp
// Does not work until you implement the custom TypeConverter.
BackgroundJob.Enqueue(() => CheckArticle(new Article()));
```

Furthermore, serialized arguments can take more space, and it often is more efficient to pass database identifiers or file names instead of their contents.

#### Execution context is being changed

In the simplest case, such as using `ThreadPool.QueueUserWorkItem` or `Task.Factory.StartNew` methods, only thread is being changed. But in HangFire, you can use different process, or different server to process background jobs.

So, the *execution context* term includes not only thread context, request context and so on, but also static data, including local locks, local filesystem, etc.

That is why if you are querying data inside a background job that corresponds to the execution context where the job was enqueued, it may fail. If you need to pass the current state to a job, use arguments or shared storage.

```csharp
public void Method()
{
    // Does not work, use distributed locks.
    lock (_object) { /* ... */ } 

    // Does not work either, pass data as an argument.
    if (HttpContext.Current.Request.IsLocal)
    {
        // Processing
    }
}
```

#### Delayed invocation

Background job method is not being invoked immediately. It is placed on a queue and waits until any worker pick it up. This leads to undefined start time and end time.

##### Undefined start-up time

Your method can be invoked tomorrow, after two weeks or six monthes (always true for scheduled jobs, but works with "fail-deploy-retry" practice as well). If it is true even for regular method calls, that application data can be changed or arguments can become stale during the method invocation, especially in a highly concurrent web applications, the probability of these situations in background job processing is very high.

Always double-check the data that you pass as arguments and think about its changing nature. Here are some examples:

* You want to publish an article tomorrow, think, what do you need to do: publish its current state, or publish the article itself. In the most cases you'd choose to publish the article itself, changed or unchanged. That is why in this case you need to pass an *article identifier* as an argument.
* You want to check comments for spam and it is possible to change them. You are creating a new background job on each edit attempt. In this case, you need to check *exactly the given text* for each edit, so pass the whole text as an argument. And after the check is completed, you can compare this text with the current one. If it was changed, then just don't do anything.

##### Undefined end time

We are thinking about the end time, when we want to tell our users about the job was completed. If you do something inside the request processing synchronously, you can rely on that fact, that this information will be available for a user immediately. That is why you can redirect her to a just created article page.

But when, for example, you are creating the same article in a background job, you can redirect user to a non-existing page yet, because you can not guarantee that the enqueued job will be processed in time.

Of course, you always can tune your system to perform background jobs as soon as possible, but you can not eliminate the delay between enqueue time and a real invocation completely.

So you need to think how to show yet unprocessed entities (with loaders, progress bars and so on), and how to report the job completion. For a latter task, you can always use polling, server push (for example, using [SignalR](http://signalr.net)), or force users to reload the page manually.

#### Delayed failure

If you pass user input as an argument of your job, you should validate them first. Otherwise the job will always fail, retry, fail again, retry again and so on. It will never be completed without manual intervention. 

You can disable automatic retry on failure, but there is another problem – since the immediate invocation is not guaranteed (see the section *Delayed invocation*), your user may leave the site and she will not be able to correct the data.

So, validate your arguments early, and instead of doing this:

```csharp
public ActionResult CreateComment(string message)
{
    BackgroundJob.Enqueue(() => CheckComment(message));
    ...
}

public void CheckComment(string message)
{
    if (message == null) 
    {
        throw new ArgumentNullException("message");
    }

    // Processing
}
```

Do this:

```csharp
public ActionResult CreateComment(string message)
{
    if (message == null)
    {
        return ValidationError(message); // Pseudo-code
    }
    BackgroundJob.Enqueue(() => CheckComment(message));
    ...
}

public void CheckComment(string message)
{
    // But you can leave the guard condition here.
    // Processing
}
```

#### Method can be called multiple times

Your method can be retried manually (through the Monitor interface) or automatically on failure (i.e on unexpected exception that is unhandler by the method itself).

So, be prepared for this situation. Try to do all your background job methods [idempotent](http://en.wikipedia.org/wiki/Idempotence). If it is impossible, be prepared that in very rare cases it can fire multiple times.

You can always disable the automatic retry feature by applying the `[Retry(0)]` filter to the exact method or globally. But to successfully fight with ASP.NET unexpected application domain unload in the middle of a job processing, HangFire retries them automatically despite of the given attribute. But don't worry too much, these cases happen very rarely.

But as a general rule remember, that your job will be performed **at least once**. You can test your job for idempotence by calling it multiple times and compare the result:

```csharp
public void TestIdempotence()
{
   // Arrange
   // ...

   // Act
   YourMethod();
   YourMethod();

   // Assert
   // For example, check that records were not duplicated.
}
```

#### Method may become unavailable

Your application can be redeployed with a different code base after a background job was enqueued. That is why you should change the signature of your background job methods carefully.

You can safely change parameter names, but the following things will lead to a broken job (however you are able to fix it and re-deploy the application):

* Addition and removal of method parameters.
* Parameter type changes.
* Parameters reordering.
* Method name changes.
* Method's type name changes.
* Method removal.
* Method's type removal.
* Type's namespace changes.
* Type's assembly changes.

Of course you can do all the above things, if there are no jobs in a storage. But instead of doing this, add a new method without touching the old one and call the new method from the old one until all old jobs become processed:

```csharp
public void OldMethod(string arg1, int arg2) 
{ 
    // Redirect
    NewMethod(arg1, arg2, DefaultValueForArg3);
}

public void NewMethod(stirng arg1, int arg2, double arg3)
{
    // Real processing
}
```

### Summary

There are a lot of differences between local and background method invocation, but you likely know the most of them, because they relate to asynchronous and concurrent programming as well.

If you have any questions, ask them in the comments form below the post or start a new topic on http://discuss.hangfire.io if you want to share code snippets.