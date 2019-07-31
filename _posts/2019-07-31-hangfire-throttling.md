---
title: Introducing Hangfire.Throttling
author: odinserj
---

The new [Hangfire.Throttling](https://www.hangfire.io/ace/#hangfirethrottling) package released today. It contains different concurrency and rate limiters that will help you to reduce the load on external resources like databases or third-party services. All of these limiters work without forcing workers to wait until a throttling condition is satisfied, by delaying or deleting a job, so your workers are free to process other jobs.

The package is distributed as a part of the new Hangfire.Ace feature set that's available for Business and Enterprise subscribers, including existing ones. You can download it from the new private NuGet feed and the [Downloads Page](/ace/downloads.html) contains instructions on how to configure your working environment to use the feed. 

Please see the [Concurrency & Rate Limiting](https://docs.hangfire.io/en/latest/background-processing/throttling.html) documentation article for more details.
