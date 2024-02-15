---
title: Hangfire Pro 1.4.3
author: odinserj
category: [release, hangfire-pro]
---

This release fixes `Could not find type Hangfire.Batches.States.BatchAwaitingState` exception appeared after upgrading from Hangfire Pro 1.4.0 or 1.4.1 when using batch continuations. Previous release solved the issue partly, and didn't cover those who just updated from versions listed above.