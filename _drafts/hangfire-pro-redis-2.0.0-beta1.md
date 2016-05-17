---
title: Hangfire.Pro.Redis 2.0.0-beta1
author: odinserj
category: release
---

New major version of Hangfire.Pro.Redis – the official package to bring Hangfire to Redis – is almost here. Now it is based on popular StackExchange.Redis package, and allows to focus on Hangfire development rather than dealing with Redis-related issues.

The goal of the initial release is to provide the same capabilities and the same performance as in the previous release, plus SSL support to handle Azure environment without sending unsecured password to the Internet. This beta comes with all of these features.

Support for Sentinel and Redis cluster will be available in the next versions – it's not enough to pass Sentinel (or cluster) endpoint to the client. No wonders, no magic – cluster requires hash slot usage for performing multi-key operations, sentinel requires additional separate master instances for acquiring distributed locks for the RedLock algorithm to be safe.

The new version is already available on the private NuGet feed – http://nuget.hangfire.io/feeds/hangfire-pro/Hangfire.Pro.Redis/2.0.0-beta1. I've decided to use separate repository for Redis support to have different versioning aside from other Hangfire.Pro packages – https://github.com/HangfireIO/Hangfire.Pro.Redis/tree/dev. You can find there all the instructions on how to install and consume the package. Later I'll add the documentation article for this.

Key differences from the previous versions:

* New connection string format. It is much configurable than the previous one. You can look at StackExchange.Redis documentation for the details.
* There is no connection pool, just single connection for interacting with data, and single connection for pub/sub that is used by workers.