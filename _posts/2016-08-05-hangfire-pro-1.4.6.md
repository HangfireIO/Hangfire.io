---
title: Hangfire Pro 1.4.6
category: release
author: odinserj
---

This version fixes different problems, that caused batches and batch continuations appear with no background jobs under rare circumstances. Also, background jobs now have the same expiration time with the batch itself. It is **highly recommended to upgrade**, if you are using batches.

**Hangfire.Pro**

* **Changed** – Remove redundant distributed lock acquisition, when executing continuations.
* **Fixed** – Increase batch lock timeout value when adding a batch continuation.
* **Fixed** – Batches are now controlling expiration time of their background jobs.
* **Fixed** – Increase batch filter's order value to disallow custom job filters to override job expiration time.

**Hangfire.Pro.Redis**

* **Fixed** – Monitoring API now resilient to job history record's key casing.