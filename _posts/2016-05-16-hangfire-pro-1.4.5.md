---
title: Hangfire Pro 1.4.5
category: [release, hangfire-pro]
author: odinserj
---

This release fixes distributed locks in `Hangfire.Pro.Redis` that didn't take the *Prefix* option into account. This may result in problems and different timeout when a single Redis instance is used for a bunch of applications with separate code base.

**Hangfire.Pro.Redis**

* **Fixed** – Distributed locks didn't take the *Prefix* option into account.