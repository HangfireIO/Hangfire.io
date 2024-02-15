---
title: Hangfire Pro 1.4.0
category: [release, hangfire-pro]
author: odinserj
---

New versions of Hangfire Pro packages released to be compatible with Hangfire 1.5.0 version. Background jobs in batches now performing slightly faster, and Redis transaction scope was reduced to the `Commit` method, allowing to query for data from apply state filters. 

### Release Notes

#### Hangfire.Pro

Batches now use new low-level types of Hangfire.Core package introduced in 1.5.0 version.  I removed unnecessary acquisition of distributed locks during background job processing, so batched jobs now performing slightly faster.

It is also possible now to use custom `IJobFilterProvider` in batched jobs by passing it to the `IGlobalConfiguration.UseBatches` method:

<pre><code><span class="type">GlobalConfiguration</span>.Configuration.UseBatches(<span class="type">JobFilterProviders</span>.Providers);
</code></pre>

Batches now throw an exception when you forgot to call the `UseBatches` method, an easy mistake that raised a lot of questions.

#### Hangfire.Pro.Redis

Nothing new, except you can query for data in apply state filters and use the job storage transaction at the same time, this may prevent race conditions in hardcore filters. Redis job storage also now throws `DistributedLockTimeoutException` (new in 1.5.0), in the same manner as SQL Server storage, allowing to make job filters storage-agnostic.

### Roadmap

* SSL support for Redis Storage
* Redis Sentinel support for High Availability needs
* Increased throughput when using multiple queues, by using "wakeup" queues
* Redis Cluster support for load-balancing (if possible)
* Full API documentation together with Hangfire packages