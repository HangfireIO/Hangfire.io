---
title: Hangfire Pro 1.4.4
category: release
author: odinserj
---

This release fixes an issue with **batch continuations**, and is recommended for anyone who use them. The issue takes place, when a parent batch unable to complete within 1 hour, after which batch continuation may start with no jobs, because all of them were expired.

* **Fixed** – Background jobs of a batch continuation may expire before the continuation fires.