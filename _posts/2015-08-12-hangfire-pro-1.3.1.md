---
title: Hangfire Pro 1.3.1
category: release
author: odinserj
---

This is a correcting release that fixes a race condition related to batch continuations and slightly improves performance of a batch job processing, especially when using SQL Server. It is strongly recommended to upgrade.

* **Changed** – Optimized BatchJobSupport attribute to use less commands in a transaction.
* **Fixed** – Race condition when background jobs disappear from batch continuations.
* **Fixed** – Parent batch URL for a continuation in the Batch Details page now works correctly.