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

## Feature comparison

<table class="table">
    <colgroup>
        <col>
        <col>
        <col style="background-color: #f5f5f5;">
    </colgroup>
    <thead>
        <tr>
            <th>Feature</th>
            <th>Hangfire</th>
            <th>Hangfire Pro</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Background job processing</th>
            <td><i class="glyphicon glyphicon-ok"></i></td>
            <td><i class="glyphicon glyphicon-ok"></i></td>
        </tr>
        <tr>
            <th>Management UI</th>
            <td><i class="glyphicon glyphicon-ok"></i></td>
            <td><i class="glyphicon glyphicon-ok"></i></td>
        </tr>
        <tr>
            <th>Low latency &amp; high throughput processing</th>
            <td></td>
            <td><i class="glyphicon glyphicon-ok"></i></td>
        </tr>
        <tr>
            <th>Proactive monitoring</th>
            <td></td>
            <td><i class="glyphicon glyphicon-ok"></i></td>
        </tr>
        <tr>
            <th>Continuations <span class="label label-default">Not ready</span></th>
            <td></td>
            <td><i class="glyphicon glyphicon-cog" title="Under construction"></i></td>
        </tr>
        <tr>
            <th>Parallel Processing <span class="label label-default">Not ready</span></th>
            <td></td>
            <td><i class="glyphicon glyphicon-cog" title="Under construction"></i></td>
        </tr>
        <tr>
            <th>Async methods support <span class="label label-default">Not ready</span></th>
            <td></td>
            <td><i class="glyphicon glyphicon-cog" title="Under construction"></i></td>
        </tr>
    </tbody>
</table>