---
title: Hangfire 1.8.0
author: odinserj
category: [release, news]
summary: First-class queue support for jobs, enhanced "Deleted" state and a lot of Dashboard UI improvements like full-width and optional dark mode support.
---

After three years of development, a brand new version of Hangfire is finally here. It offers a set of great new features like first-class queue support for background jobs, the enhanced role of the Deleted state that now supports exceptions, more options for continuations to implement even try/catch/finally semantics, better defaults to simplify the initial configuration and various Dashboard UI improvements like full-width and optional dark mode support.

### Contents
{:.no_toc}

* This will become a table of contents (this text will be scrapped).
{:toc}

### Breaking Changes

<table>
    <thead>
        <tr>
            <th>Package</th>
            <th>Changes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Hangfire.Core</td>
            <td>
                <ul>
                    <li>Dropped support of <code>net45</code> platform in favor of <code>net451</code> one.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Hangfire.SqlServer</td>
            <td>
                <ul>
                    <li>Prioritise Microsoft.Data.SqlClient package over System.Data.SqlClient one.</li>
                    <li>Don't reference System.Data.SqlClient package.</li>
                    <li>Dropped support of <code>net45</code> platform in favor of <code>net451</code> one.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Hangfire.AspNetCore</td>
            <td>
                <ul>
                    <li>Package is now based on <code>Hangfire.NetCore</code> to avoid duplicating types.</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

### First-class Queue Support

From the first versions of Hangfire, the "Queue" property was related only to a specific instance of the "Enqueued" state but not to a background job itself. This factor often leads to confusion in different scenarios with dynamic queueing, despite there being solutions like static or dynamic `QueueAttribute` or other extension filters that offer help in persisting a target queue.

Now it is possible to explicitly assign a queue manually for a background job when creating it using the new method overloads. In this case, the given queue will be used every time the background job is enqueued unless overridden by state filters like the `QueueAttribute`.

<pre><code><span class="keywd">var</span> id = <span class="type">BackgroundJob</span>.Enqueue&lt;<span class="type">IOrdersServices</span>&gt;(<span class="string">"critical"</span>, x => x.ProcessOrder(orderId));
<span class="type">BackgroundJob</span>.ContinueJobWith&lt;<span class="type">IEmailServices</span>&gt;(id, <span class="string">"email"</span>,  x => x.SendNotification(orderId));</code></pre>

These changes can be beneficial for a microservice-based approach or when manual load-balancing is required.

Perhaps it's also worth noting that new changes allow delayed background jobs with an explicit queue specified to be placed to a job queue and processed by a worker without a "Scheduled &rarr; Enqueued" state transition, making such jobs be processed with much better throughput.

<div class="alert alert-warning">
    <h4>Storage Support Required</h4>
    <p>
    The new feature requires job storage to persist a new field, which may not be supported by a storage out-of-the-box. That's why additional storage support is required. Otherwise, the <code>NotSupportedException</code> will be thrown. So upgrade of the job storage package is likely needed.
    </p>
</div>

Specifying an explicit queue name for recurring-based background jobs is also possible, as shown in the snippet below. However, please note that recurring jobs will not be filtered based on such queue, and queue name will be used only when creating a background job on its schedule. So unfortunately, it's still impossible to use the same storage for recurring jobs from different code bases, but the new release also contains changes that will make this possible.

<pre><code><span class="type">RecurringJob</span>.AddOrUpdate(<span class="string">"my-id"</span>, <span class="string">"critical"</span>, () => Console.WriteLine(<span class="string">"Hello, world"</span>), <span class="string">"* * * * *"</span>);</code></pre>

### Dashboard UI Improvements

#### Full-width Support

Dashboard UI page is now fully responsive and will fit the whole screen size to display more information. Long background or recurring job names, large list of arguments or tables with many columns don't lead to problems now. The new layout is enabled by default.

<img alt="Full Width for Dashboard UI" src="/img/full-width-dashboard.png">

#### Optional Dark Mode Support

Dark mode support comes for the Dashboard UI with this release. However since different Dashboard UI extensions aren't currently prepared for that, it's enabled only when `UseDarkModeSupportForDashboard` method is called during the configuration.

```csharp
configuration
    .UseDarkModeSupportForDashboard()
```

After making the call above, dark mode will be triggered automatically based on system settings, allowing automatic transitions to it.

<img alt="Dark Mode for Dashboard UI" src="/img/dark-mode.png">

#### Custom CSS and JavaScript Resources

Adding custom CSS and JavaScript files to avoid possible Content Security Policy-related issues in extensions for the Dashboard UI is now possible. These files can be added as embedded resources to an extension assembly, and <code>GetManifestResourceNames</code> method can be used to determine the path names.

```csharp
var assembly = typeof(MyCustomType).GetTypeInfo().Assembly;
// Call the `assembly.GetManifestResourceNames` method to learn more about paths.

configuration
    .UseDashboardStylesheet(assembly, "MyNamespace.Content.css.styles.css")
    .UseDashboardJavaScript(assembly, "MyNamespace.Content.js.scripts.js")
```

#### Custom Renderers on the Job Details Page

The "Job Details" page became extensible, and custom sections can now be added by calling the `UseJobDetailsRenderer` method that takes an integer-based ordering parameter and a callback function with `JobDetailsRendererDto` parameter that contains all the necessary details about page itself and a job being displayed.

```csharp
configuration
    .UseJobDetailsRenderer(10, dto => new NonEscapedString("<h4>Hello, world!</h4><p>I'm a custom renderer.</p>"))
```

After calling a method above, new section appears on the "Job Details" page under the "Parameters" and above the "States" sections, please find an example below.

<img alt="Custom Dashboard Renderer" src="/img/custom-renderer.png">

### Enhanced "Deleted" State

Now we can pass exception information to the "Deleted" state, making it implement the "fault" semantics as a *final state*. Background jobs in the "Deleted" state will automatically expire, unlike jobs in the "Failed" state, which is not considered a *final* one.

Exception is passed by the `AutomaticRetry` filter when all retry attempts exhausted, it is also possible to pass exception manually when creating an instance of the `DeletedState` class. Stack trace isn't persisted to avoid data duplication since it's already preserved in a "Faulted" state, only type, message and inner exceptions if any.

<img alt="Deleted state renderer" src="/img/deleted-state.png">

Continuation options enumeration was also extended. It is now possible to create continuations explicitly for the "Deleted" state with the `JobContinuationOptions.OnlyOnDeletedState` option or even use it multiple values in the future since `JobContinuationOptions` now implement the flags semantics.

#### Try/Catch/Finally Implementation

We now have everything to build try/catch/finally background jobs and even pass results or exceptions to ancedent background jobs as their arguments. We should use the `UseResultsInContinuations` method to enable this feature and apply `FromResult` or `FromException` attributes to corresponding parameters.

```csharp
configuration
    .UseResultsInContinuations()
```

We can create the following methods as an example, where `ExceptionInfo` class (from the `Hangfire` namespace) implements the minimal exception information, and `bool` type as a result of the `Try` job and corresponding parameter of the successful continuation.

<pre><code><span class="keywd">public</span> <span class="keywd">static</span> <span class="keywd">bool</span> Try() { <span class="comm">/* ... */</span> }
<span class="keywd">public</span> <span class="keywd">static</span> <span class="keywd">void</span> Catch([<span class="type">FromException</span>] <span class="type">ExceptionInfo</span> exception) { <span class="comm">/* ... */</span> }
<span class="keywd">public</span> <span class="keywd">static</span> <span class="keywd">void</span> Finally() { <span class="comm">/* ... */</span> }

<span class="keywd">public</span> <span class="keywd">static</span> <span class="keywd">void</span> Continuation([<span class="type">FromResult</span>] <span class="keywd">bool</span> result) { <span class="comm">/* ... */</span> }</code></pre>

After introducing all the methods, let's create background jobs for them. Please note in this case they are created non atomically, since they are not a part of a batch. We pass `default` keywords as arguments for continuations, and actual values will be used at run-time.

<pre><code><span class="keywd">var</span> id = <span class="type">BackgroundJob</span>.Enqueue(() => Try());

<span class="comm">// "Catch" background job</span>
<span class="type">BackgroundJob</span>.ContinueJobWith(id, () => Catch(<span class="keywd">default</span>),
    <span class="type">JobContinuationOptions</span>.OnlyOnDeletedState);

<span class="comm">// "Finally" background job</span>
<span class="type">BackgroundJob</span>.ContinueJobWith(id, () => Finally(),
    <span class="type">JobContinuationOptions</span>.OnAnyFinishedState);

<span class="comm">// Continuation on success</span>
<span class="type">BackgroundJob</span>.ContinueJobWith(id, () => Continuation(<span class="keywd">default</span>),
    <span class="type">JobContinuationOptions</span>.OnlyOnSucceededState);</code></pre>

<a href="/pro/#atomic-background-job-creation">Batches feature</a> from Hangfire Pro allows to create the whole block atomically, so either all background jobs or none of them will be created on failure.

<pre><code><span class="type">BatchJob</span>.StartNew(batch =>
{
    <span class="keywd">var</span> id = batch.Enqueue(() => Try());

    batch.ContinueJobWith(id, () => Catch(<span class="keywd">default</span>), <span class="type">JobContinuationOptions</span>.OnlyOnDeletedState);
    batch.ContinueJobWith(id, () => Finally(), <span class="type">JobContinuationOptions</span>.OnAnyFinishedState);
    batch.ContinueJobWith(id, () => Continuation(<span class="keywd">default</span>), <span class="type">JobContinuationOptions</span>.OnlyOnSucceededState);
});</code></pre>

### Storage API Improvements

**Time authority**. Storage as a time authority for delayed and recurring job schedulers.

**More transactional methods**. To make possible new great features.

**Less roundtrips** when processing background jobs.

**Feature-based flags** to make transition smooth.

* More transactional methods 
* Use less round-trips when processing background jobs.

* Feature-based flags
* More transactional methods to improve behavior on faults, allow more features and improve batching
* Use less roundtrips when processing jobs (worker changes and new features in storage)
• Added – Optional `ParametersSnapshot` property for `BackgroundJob` and `JobData` classes to minimize roundtrips in future.

### SQL Server Storage

#### Breaking Changes

Since `Microsoft.Data.SqlClient` package is the "flagship data access driver for SQL Server going forward", it will be used by the `Hangfire.SqlServer` package by default when referenced in the target project. Automatic detection is performed in run-time.

<div class="alert alert-warning">
    <h4>Encryption is enabled by default</h4>
    <p>
    <code>Microsoft.Data.SqlClient</code> package has <a href="https://github.com/dotnet/SqlClient/blob/main/release-notes/4.0/4.0.0.md#breaking-changes" target="_blank" rel="nofollow">breaking changes</a> and encryption is enabled by default. You might need to add <code>TrustServerCertificate=true</code> option to a connection string or stay with <code>System.Data.SqlClient</code> package. More details can be found in this <a href="https://github.com/dotnet/SqlClient/issues/1402" target="_blank" rel="nofollow">issue on GitHub</a>.
    </p>
</div>

In this version neither `Microsoft.Data.SqlClient` nor `System.Data.SqlClient` package is referenced as a dependency. by the `Hangfire.SqlServer` package anymore so needs to be referenced manually if you prefer to stay with it or postpone the transition to a newer package. You can use the following snippet with the `*` as a version version to use always the latest one.

```xml
<ItemGroup>
    <PackageReference Include="Microsoft.Data.SqlClient" Version="*" />
    <!-- OR -->
    <PackageReference Include="System.Data.SqlClient" Version="*" />
</ItemGroup>
```

#### Better Defaults

* Default isolation level is finally set to READ COMMITTED.
* Command batching is enabled by default.
* Transactionless fetching based on sliding invisibility timeout is used by default.
* TryAutoDetectSchemaDependentOptions

#### `Schema 8` Migration

* Schema 8 migration to fix `JobQueue.Id` column to `bigint` and add support for backups on Azure.
* `SqlServerStorageOptions.PreferMicrosoftDataSqlClient`
* New defaults `TryAutoDetectSchemaDependentOptions` enabled by default to reduce the configuration burden.
* New features implemented to improve clock, produce less roundtrips

EnableHeavyMigrations should be enabled

### Default Culture & Compatibility Level

When application deals mostly with a single culture, we can save some storage space by setting a default culture with the new <code>UseDefaultCulture</code> configuration method. It will use the configured default culture when `CurrentCulture` or `CurrentUICulture` background job parameters aren't created for the job and an older compatibility level is used.

<pre><code>configuration
    .UseDefaultCulture(<span class="type">CultureInfo</span>.GetCultureInfo(<span class="string">"en-US"</span>))</code></pre>

After we instructed what to do when the referenced parameters are missing, we can apply the new `CompatibilityLevel.Version_180` compatibility level to tell Hangfire that 

And when the new `CompatibilityLevel.Version_180` compatibility level is configured, Hangfire will not create those background job parameters when current culture matches the configured default values

`CompatibilityLevel.Version_180` compatibility switch was added that can save some storage space by avoiding to preserve `CurrentCulture` and `CurrentUICulture` parameters if your application depends on a single culture.

<pre><code>configuration
    .UseDefaultCulture(<span class="type">CultureInfo</span>.GetCultureInfo(<span class="string">"en-US"</span>))
    .SetDataCompatibilityLevel(<span class="type">CompatibilityLevel</span>.Version_180)</code></pre>

<div class="alert alert-info">
    <h4>Two-step deployment required</h4>

</div>

Support for default culture and UI culture via the `UseDefaultCulture` configuration method.
`CompatibilityLevel.Version_180` flag to avoid storing culture parameters when they are the same as default.
• Added – Allow to filter exception types in `AutomaticRetryAttribute` by using the new `OnlyOn` property.

### Deprecations in Recurring Jobs

Deprecations mostly relate to recurring background jobs and made to avoid confusion when explicit queue names are used.

#### Implicit Identifiers Deprecated

```csharp
RecurringJob.AddOrUpdate(() => Console.WriteLine("Hi"), Cron.Daily);
```

For non-generic methods it is `{TypeName}.{MethodName}`, for generic methods it's much better to open Recurring Jobs page in the Dashboard UI and check actual recurring job identifier there to avoid any mistakes.

```csharp
RecurringJob.AddOrUpdate("Console.WriteLine", () => Console.WriteLine("Hi"), Cron.Daily);
```

#### Optional Parameters Deprecated

```csharp
RecurringJob.AddOrUpdate("my-id", () => Console.WriteLine("Hi"), Cron.Daily, timeZone: TimeZoneInfo.Local);
```

```csharp
RecurringJob.AddOrUpdate("my-id", () => Console.WriteLine("Hi"), Cron.Daily, new RecurringJobOptions
{
    TimeZone = TimeZoneInfo.Local
});
```


* Deprecated – `AddOrUpdate` overloads with optional params defined in the `RecurringJobManagerExtensions` class.
* Deprecated – `AddOrUpdate` overloads with optional parameters defined in the `RecurringJob` class.
* Deprecated – `AddOrUpdate` method overloads with no `recurringJobId` parameter.
* Deprecated – `RecurringJobOptions.QueueName` property, new methods should be used instead.
* Deprecated – `SqlServerStorageOptions.UsePageLocksOnDequeue` property is now obsolete and doesn't affect anything.
