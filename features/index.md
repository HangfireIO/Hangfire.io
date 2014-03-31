---
layout: feature
title: Queue-based processing
next_slug: instance-methods
next_text: Instance methods
---

Для того, чтобы выполнить метод вне пределов запроса, вместо его вызова создается *фоновая задача*, которая содержит информацию о методе (тип метода и его имя) и его аргументах, и записывается в 
*очередь задач*:

```csharp
BackgroundJob.Enqueue(() => Console.WriteLine("Hello, world!"));
```

Очередь задач прослушивается рабочими потоками, которые и выполняют указанный метод в своем контексте. Для того, чтобы создать рабочие потоки и запустить их, нужно запустить HangFire Server:

```csharp
// Or BackgroundJobServer for non-ASP.NET applications
var server = new AspNetBackgroundJobServer(); 
server.Start();
```

### Multiple queues

HangFire поддерживает работу с несколькими очередями, очередь по-умолчанию называется `default`. Кроме того, в HangFire Server можно указывать приоритет очередей, в этом случае при выборке из нескольких очередей будет отдаваться предпочтение наиболее приоритетной. В этом случае задания будут обрабатываться вначале из одной, потом из другой, и так далее. Это бывает полезно, когда одни задания имеют больший приоритет, нежели другие.

#### Specifying a queue

Для того, чтобы указать очередь, в которую будет добавлено задание, можно воспользоваться низкоуровневым методом создания задания и указать очередь напрямую.

```csharp
var state = new EnqueuedState { Queue = "critical" }
BackgroundJob.Create(() => Console.WriteLine(), state);
```

Или вы можете просто применить атрибут `QueueAttribute` с именем очереди к классу, либо методу.

```csharp
[Queue("high")]
public class Sample
{
    public static void HighExample() { }

    [Queue("critical")]
    public static void CriticalExample() { }
}

// Will add a job into the "high" queue
BackgroundJob.Enqueue(() => Sample.HighExample());

// Will add a job into the "critical" queue
BackgroundJob.Enqueue(() => Sample.CriticalExample());
```

#### Listening multiple queues

Для того, чтобы сервер знал о том, что существуют другие очереди, их нужно указать в конструкторе. Их порядок важен, поскольку он задает приоритет для каждой очереди.

```csharp
var server = new BackgroundJobServer("critical", "default");

// Or for ASP.NET server
var server = new AspNetBackgroundJobServer("critical", "default");
```