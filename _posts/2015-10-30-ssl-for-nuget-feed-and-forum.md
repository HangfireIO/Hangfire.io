---
title: Securing NuGet feed and discussion forum
author: odinserj
---

I finally bought an SSL certificate to keep your passwords away from others, and ensure you are receiving NuGet packages from the original site. Please meet [https://nuget.hangfire.io](https://nuget.hangfire.io) (*A* grade on [SSL Labs](https://www.ssllabs.com/ssltest/analyze.html?d=nuget.hangfire.io)) and [https://discuss.hangfire.io](https://discuss.hangfire.io) (*A+* grade on [SSL Labs](https://www.ssllabs.com/ssltest/analyze.html?d=discuss.hangfire.io)).

You can still access private NuGet feed via regular HTTP – I haven't added any redirects yet, because they may theoretically lead to different issues. However it is better to use HTTPS if possible, and for browsers I've turned on the [Strict Transport Security](https://ru.wikipedia.org/wiki/HSTS) feature.

Discussion forum is fully operating in HTTPS, with all the required redirects.