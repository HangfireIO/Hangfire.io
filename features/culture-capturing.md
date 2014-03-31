---
layout: feature
title: Culture capturing
prev_slug: retry-logic
prev_text: Retry logic
---

Поскольку задача выполняется в другом контексте, а значит и потоки, нежели том, в котором была создана, то некоторые параметры среды могут различаться. В качестве основного примера можно рассмотреть такие параметры как `Thread.CurrentCulture` и `Thread.CurrentUICulture`, которые очень часто переопределяются при обработке запроса.

Для того, чтобы выполнение метода происходило в той же культуре, в которой он и был создан, примените атрибут `PreserveCultureAttribute` к методу задачи:

```csharp
public class SomeClass
{
    [PreserveCulture]
    public void SomeMethod() { }
}

BackgroundJob.Enqueue<SomeClass>(x => x.SomeMethod());
```

<div class="callout callout-info">
    <h4>Включено по-умолчанию</h4>
    <p>Атрибут <code>PreserveCultureAttribute</code> применяется по-умолчанию ко всем задачам</p>
</div>

<div class="callout callout-info">
    <h4>Пример расширения</h4>
    <p>Атрибут <code>PreserveCultureAttribute</code> является примером расширения процесса создания/выполнения задачи.</p>
</div>