---
title: Hangfire.Throttling 1.1.0
category: release
author: odinserj
---

This is a small feature release to add human-readable descriptions for throttlers. So we can specify descriptions when creating a throttler instead of having really long identifiers, and see them in Dashboard UI. Also some minor problems fixed in this release.

```csharp
[Mutex("orders:{0}", description: "Avoid concurrent processing for order {0}")]
public void MyMethod(string id)
```

```csharp
manager.AddOrUpdateSemaphore(
    "github-issues",
    new SemaphoreOptions(10, description: "Don't stress GitHub when fetching issues"));
```

* **Added** – Ability to set human-readable descriptions for throttlers and display them in Dashboard UI.
* **Fixed** – Don't let long identifiers to break the whole dashboard page.
* **Fixed** – Determine MutexId correctly in Dashboard UI even if it contains `/` characters.
* **Fixed** – Minimum delay from `UseThrottling` method isn't respected when also using `ThrottlingAttribute` on a method.
