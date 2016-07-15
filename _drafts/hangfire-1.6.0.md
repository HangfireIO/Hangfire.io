---
title: Hangfire 1.6.0
category: release
author: odinserj
---

Hangfire 1.6 released with async methods support, experimental multiplatform support via .NET Core, deep integration with ASP.NET Core, etc, etc. It's worth checking, I promise! Works even on Ubuntu 14.04 and OS X El Capitan!

## What's New

### Async Methods Support

Async programming became very popular in .NET a long time ago. With the `await` keyword it won an even greater success. Some libraries even don't provide synchronous API (like [Microsoft.Net.Http](https://www.nuget.org/packages/Microsoft.Net.Http/)), so we can't ignore this movement.

#### Support for `await` Keyword

In previous versions you had to use `Task.Wait` method, or misuse it by `async void` [anti-pattern](https://msdn.microsoft.com/en-us/magazine/jj991977.aspx). Now you can take full advantage of using the `await` keyword.

{% highlight csharp %}
public static async Task HighlightAsync(int snippetId)
{
    var snippet = await _dbContext.CodeSnippets.SingleOrDefaultAsync(x => x.Id == snippetId);
    if (snippet == null) return;

    snippet.HighlightedCode = await HighlightSourceAsync(snippet.SourceCode);
    snippet.HighlightedAt = DateTime.UtcNow;

    await _dbContext.SaveChangesAsync();
}
{% endhighlight %}

The enqueueing logic is the same for sync and async methods. In early betas there was a warning [CS4014](https://msdn.microsoft.com/en-us/library/hh873131.aspx), but now you can remove all the `#pragma warning disable` statements.

{% highlight csharp %}
BackgroundJob.Enqueue(() => HighlightAsync(snippet.Id));
{% endhighlight %}

#### Cancellation Tokens

It is very common for async methods to pass a cancellation token. 

{% highlight csharp %}
public static async Task HighlightAsync(int snippetId, CancellationToken token) // ...

// Pass the CancellationToken.None
BackgroundJob.Enqueue(() => HighlightAsync(snippetId, CancellationToken.None));
{% endhighlight %}

### Experimental .NET Core Support

[.NET Standard](https://docs.microsoft.com/en-us/dotnet/articles/standard/library) 1.3, 
Linux, OS X,
Runs everywhere,
Surprise
http://coredemo.hangfire.io/
Still experimental, no unit tests

### ASP.NET Core Integration

Supports .NET Core and .NET Framework &ge; 4.5.1

* Logging
* Dependency Injection
* Dashboard

Install-Package Hangfire.AspNetCore

services.AddHangfire(x => x.UseSqlServer("connection string"));
app.UseHangfireServer();
app.UseHangfireDashboard();

### A lot of other changes

See GitHub release.

## Upgrading

IAuthorizationFilter is deprecated

## Acknowledgments

Derek @tuespetre async
@Excommunicated latency
Geir Sagberg @geirsagberg cron regular intervals
Tris @tristal stats polling
Jordi Martínez @Elph multilanguage and spanish
@teodimache backtracking recurring
@arnoldasgudas IRJM interface
@patrykpiotrmarek ToGenericTypeString
Beñat Gurmendi @bgurmendi zero latency
Tyson @tystol DBConnection
Julien Roncaglia @vbfox SSOI public
Roeland Nieuwenhuis @ranieuwe migration (sorry for not including to NuGet)