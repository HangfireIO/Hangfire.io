---
title: Unaffected by Codecov Breach
author: odinserj
category: security
---

On Apr 15, 2021 Codecov (code coverage tool) team reported [Bash Uploader Security Update](https://about.codecov.io/security-update/) post where they describe their recent security breach, a yet another attack on supply chain. Since we have used this software for Hangfire in the past, and since it's still used by one of our projects, [Cronos](https://github.com/HangfireIO/Cronos), we began to understand what's happened. And in short – we've used Codecov tool [from PyPI](https://pypi.org/project/codecov/) (Python Package Index) that's different from the Bash Uploader one and [is unaffected](https://github.com/codecov/codecov-python/issues/316) by the recent breach, according to Codecov team.

Codecov project was used only by [HangfireIO/Hangfire](https://github.com/HangfireIO/Hangfire) (removed in 2018 by [this commit](https://github.com/HangfireIO/Hangfire/commit/8ee437420d5de985f00bb0ca19aab48154b0df95#diff-92ab9a36df5d8e9f7076f2fdec59492d1ac2d9cf27ea046767a7fc4d542ef3dc) after migration to the new project format) and [HangfireIO/Cronos](https://github.com/HangfireIO/Cronos) repositories in the following way, where `codecov` tool was installed via PIP tool from the Python Package Index gallery that's completely different than the [Bash Uploader](https://docs.codecov.io/docs/about-the-codecov-bash-uploader) script and uses another code base.

```yml
after_build:
  - "SET PATH=C:\\Python34;C:\\Python34\\Scripts;%PATH%"
  - pip install codecov
  - codecov -f coverage.xml
```

As a part of the investigation, we've revoked one of our GitHub Personal Access Token that was used to automatically [publish artifacts](https://www.appveyor.com/docs/deployment/github/) to GitHub Releases by AppVeyor and will remove this build step from our repositories entirely to avoid problems in future. The point is that this feature requires full access to the underlying repository just to publish a new ZIP file with binaries, and compromised software that's able to access such a token (like Bash Uploader above) will be able to do a lot of bad things with affected repositories in this case.

We've also removed Codecov tool from our build pipeline entirely since it wasn't working anyway, and will consider this breach if decide to add it again.
