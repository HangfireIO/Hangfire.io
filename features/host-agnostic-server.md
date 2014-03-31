---
layout: feature
title: Host-agnostic server
prev_slug: multiple-servers
prev_text: Multiple servers
next_slug: retry-logic
next_text: Retry logic
---

HangFire Server может выполняться в любой среде – внутри ASP.NET приложения (благодаря Reliable fetching), внтри консольного приложения или Windows Service – базовая сборка `HangFire.Core.dll` ни от чего не зависит.

## ASP.NET Host

Для хостинга внутри ASP.NET был создан отдельный класс, который регистрирует сервер внутри ASP.NET с помощью метода `HostingEnvironment.RegisterObject`, что дает немного больше времени при остановке приложения на завершение задач и уменьшает вероятность прерывания рабочих потоков.

```csharp
var server = new AspNetBackgroundJobServer();
server.Start();
```

## Console application Host

Для того, чтобы запустить HangFire Server внутри консольного приложения, в него надо добавить пакет:

<pre class="nuget-install">PM> Install-Package HangFire.Core</pre>

И пакет, который используется в качестве хранилища, например,

<pre class="nuget-install">PM> Install-Package HangFire.SqlServer</pre>

После этого нужно инициализировать экземпляр класса `BackgroundJobServer` и запустить его.

```csharp
using HangFire;

static void Main()
{
    using (var server = new BackgroundJobServer())
    {
        server.Start();
        Console.WriteLine("HangFire Server started. Press Enter to stop it.");
        Console.ReadLine();
    }
}
```

## Windows Service host

Установите те же базовые библиотеки, которые указаны в консольном приложении.

```csharp
using HangFire;

public partial class HangFireService : ServiceBase
{
    private readonly BackgroundJobServer _server;

    public HangFireService()
    {
        InitializeComponent();
        _server = new BackgroundJobServer();
    }

    protected override void OnStart(string[] args)
    {
        _server.Start();
    }

    protected override void OnStop()
    {
        _server.Stop();
    }
}
```

## Topshelf Service Host

Topshelf упрощает разработку Windows служб, предоставляя разработчикам возможность простого запуска как консольного приложения наряду с облегченными средствами отладки.

```csharp
using Topshelf;
using HangFire;

static void Main()
{
    HostFactory.Run(x =>
        x.Service<BackgroundJobServer>(s =>
        {
            s.ConstructUsing(name => new BackgroundJobServer());
            s.WhenStarted(tc => tc.Start());
            s.WhenStopped(tc => tc.Stop());
        }));
}
```