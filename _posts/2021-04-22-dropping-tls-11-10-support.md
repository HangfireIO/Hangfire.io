---
title: Dropping TLS 1.0 and 1.1 support
author: odinserj
---

**In June 2021 we will remove support for TLS 1.0 and 1.1 from our [private NuGet feed](https://nuget.hangfire.io)** that serves Hangfire Pro and Ace packages. The same steps happened with the official [NuGet Gallery](https://nuget.org) (where the most packages for .NET are stored) in April, 2020 so it's highly likely your NuGet client already supports TLS 1.2 or higher and you don't need to change anything. To support all the latest features and have the fastest install/update experience, please ensure you are using the following NuGet V3 API endpoints (V2 will still be supported):

**NuGet V3 feed for Hangfire Pro:**

```
https://nuget.hangfire.io/nuget/hangfire-pro/v3/index.json
```

**NuGet V3 feed for Hangfire Ace:**

```
https://nuget.hangfire.io/nuget/hangfire-ace/v3/index.json
```

More information regarding the transition can be found in this article: [Deprecating TLS 1.0 and 1.1 on NuGet.org](https://devblogs.microsoft.com/nuget/deprecating-tls-1-0-and-1-1-on-nuget-org/).
