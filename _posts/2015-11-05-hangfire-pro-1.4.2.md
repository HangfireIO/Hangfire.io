---
title: Hangfire.Pro.Redis 1.4.2
author: odinserj
category: [release, security]
---

This release fixes a security issue that caused Redis password leaks to log targets during the Hangfire Server startup. The password was also shown in dashboard. **If you are using password-protected Redis**, it is highly recommended to update to this release, and change Redis password.

* **Fixed** - Redis password is logged on startup and exposed in dashboard (https://github.com/HangfireIO/Hangfire/issues/474).
