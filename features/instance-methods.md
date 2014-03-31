---
layout: feature
title: Instance methods
next_slug: delayed-jobs
next_text: Delayed jobs
---

В предыдущих примерах в качестве метода использовались статические методы. Однако в качестве методов, на основе которых создаются фоновые задачи также можно использовать и методы экземпляров.

```csharp
public class EmailService
{
    public void Send(string address, string body) { }
}

BackgroundJob.Enqueue<EmailService>(x => x.Send("me@exapmle.com", "Hello!"));
```

В этом случае при выполнении задачи сначала будет проведена процедура активации, которая создаст экземпляр класса `EmailService`, а потом будет вызван его метод `Send`. Активация по-умолчанию производится посредством вызова метода `Activator.CreateInstance`, то есть по-умолчанию поддерживаются только классы, в которых есть конструктор по-умолчанию (без параметров).

## IoC Containers

Instance method invocation is great, because it simplifies the testability of your methods – no static method invocation, no factories, etc. If you are using an IoC container ([Ninject](http://www.ninject.org), [Autofac](http://autofac.org), etc.), you can inject it to the job activation process to use custom constructors for your classes.

<div class="callout callout-warning">
    <h4>Http context is not available</h4>
    <p><code>HttpContext.Current</code> недоступен при активации задачи. Все сервисы, зарегистрированные на активацию внутри контекста или зависящие от него приведут к ошибке при активации.</p>
</div>

```csharp
public class AutofacActivator : JobActivator
{
    private readonly ILifetimeScope _scope;

    public AutofacActivator(ILifetimeScope scope)
    {
        _scope = scope;
    }

    public object ActivateJob(Type type)
    {
        return _scope.Resolve(type);
    }
}

/* Global.asax.cs */
JobActivator.Current = new AutofacActivator(scope);
```

After that, you could use any constructors.

```csharp
public class NotificationService : IDisposable
{
    private readonly DbContext _context;
    private readonly IEmailService _email;    

    public NotificationService(DbContext context, IEmailService email)
    {
        _context = context;
        _email = email;
    }

    public void SendNotification(int userId, string template)
    {
        var user = _context.Users.Get(1);
        _email.Send(user.Email, template);
    }

    // Instances of classes that implement the IDisposable
    // interface, will be disposed.
    public void Dispose()
    {
        _context.Dispose();
    }
}
```