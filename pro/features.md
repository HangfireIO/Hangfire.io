---
layout: pro
title: Features – Hangfire Pro
display_brand: true
sub_active: features
---

### Low latency & high throughput processing

With `Hangfire.Redis` package your job processing throughput will be much faster than SQL Server based.

### Proactive monitoring

Proactive monitoring allows you to use usual tools for application monitoring.

### Continuations

Continuations allow you to perform one jobs after others.

{% highlight csharp %}
BatchJob
    .Create(() => Console.Write("Hello, "))
    .ContinueWith(() => Console.WriteLine("world!"));
{% endhighlight %}

*This API is for preview purposes only, it is subject to change after the final implementation.*

### Parallel processing

With parallel processing you can split your work into a couple of small sub-jobs that will be processed in parallel. This feature together with continuations allows you to build more complex, but still reliable workflows with Hangfire.

{% highlight csharp %}
BatchJob
    .Create(x =>
    {
        x.Enqueue(() => Console.Write("Messy"));
        x.Enqueue(() => Console.Write("Output"));
        x.Enqueue(() => Console.Write("With"));
    })
    .ContinueWith(() => Console.WriteLine("Predictable continuation!"));
{% endhighlight %}

*This API is for preview purposes only, it is subject to change after the final implementation.*

### Async methods support

You don't need to guess the correct number of worker to handle I/O intensive jobs efficiently. Hangfire will be able to do other job while async operations pending to complete.

{% highlight csharp %}
public static async Task HighlightAsync(int snippetId)
{
    var snippet = await Context.Snippets.SingleOrDefaultAsync(snippetId);
    snippet.Code = await RemoveService.HighlightAsync(snippet.Code);

    await Context.SaveChangesAsync();
}
{% endhighlight %}