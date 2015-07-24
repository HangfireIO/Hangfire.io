---
title: Hangfire Pro 1.2.2
category: release
author: odinserj
---

This is a correcting release that fixes job prioritization via queue ordering in an instance of the `BackgroundJobServerOptions` class and adds support for symbol packages.

If you are using multiple queues for prioritization, **please read the [bug details](https://github.com/HangfireIO/Hangfire/issues/370) as you may need to change the queue order**.

### Release Notes

* **Added** – Source symbol packages available at http://nuget.hangfire.io/symbols/hangfire-pro.
* **Fixed** – Jobs fetched in a wrong order from multiple queues.