---
layout: post
title: Hangfire Pro 1.3.0
category: release
version: Hangfire Pro 1.3.0
author: odinserj
hide_subscribe: true
---

This release makes some hard-coded values (like maximum succeeded job list length) configurable through the `RedisStorageOptions` class. It also helps to re-queue aborted background jobs earlier – instead of waiting for invisibility timeout after non-graceful shutdown, we are re-queueing aborted background jobs right after its server becomes inactive.

All the changes belong only to the **Hangfire.Pro.Redis** package.

### Release Notes	

* **Added** – Allow to configure maximum length of succeeded and deleted jobs list.
* **Added** – Allow to configure the timeout for `BRPOPLPUSH` command.
* **Changed** – Re-queue aborted job earlier when processing server is inactive.

Please see the [corresponding release](https://github.com/HangfireIO/Hangfire.Pro/releases/tag/v1.3.0) on GitHub for the linked issues.

### Upgrading

There are no breaking changes, just update the package from the [Hangfire Pro feed](/pro/downloads.html).

<pre class="nuget-install">PM> Update-Package Hangfire.Pro.Redis</pre>