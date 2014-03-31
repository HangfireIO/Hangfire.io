---
layout: feature
title: Delayed jobs
prev_slug: instance-methods
prev_text: Instance methods
next_slug: dedicated-thread-pool
next_text: Dedicated Thread Pool
---

Вы можете отложить вызов метода на определенное время или до определенной даты, для этого нужно вызвать метод:

```csharp
BackgroundJob.Schedule(() => Console.WriteLine("Hello, world!"), TimeSpan.FromMinutes(5));
```

Или

```csharp
BackgroundJob.Schedule(() => Console.WriteLine("Hello, world!"), DateTime.UtcNow.AddDays(3));
```

<div class="callout callout-info">
    <h4>UTC dates is needed</h4>
    <p>Указывайте только даты в формате UTC, поскольку проверка идет именно в нем. В противном случае время обработки может сильно отличаться от задуманного.</p>
</div>

В этом случае задача будет сначала в расписание. Специальный компонент в HangFire Server следит за записями из расписания и, при наступлении нужного времени, он запишет задачу в соответствующую очередь.

Опрос на наличие заданий производится с периодичными интервалами, по умолчанию 15 секунд. Для того, чтобы изменить этот интервал, нужно проинициализировать следующее свойство:

```csharp
JobStorage.Current = new SqlServerStorage("<ConnectionString>", new SqlServerOptions
{
    PollInterval = TimeSpan.FromSeconds(5)
});
```