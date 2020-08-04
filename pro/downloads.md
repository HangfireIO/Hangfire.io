---
layout: products
title: Downloads
active: overview
sub_active: pro-downloads
---

<h1 class="page-header">Hangfire Pro Downloads</h1>

Hangfire Pro packages are hosted on a [private ProGet Server](https://nuget.hangfire.io). Package downloads are available only for [Hangfire Pro subscribers](https://www.hangfire.io/pricing/). After paying, you'll instantly receive a link to download the Hangfire Pro binaries (non-NuGet based). Please give us 24 hours to generate your credentials for private NuGet server.

Available Packages
-------------------

* [Hangfire.Pro](https://nuget.hangfire.io/feeds/hangfire-pro/Hangfire.Pro/) – batches and batch continuations to create a bunch of background jobs atomically as well as add continuation after all batch jobs executed.
* [Hangfire.Pro.Redis](https://nuget.hangfire.io/feeds/hangfire-pro/Hangfire.Pro.Redis/) – ultra-fast job storage for Hangfire based on key-value store [Redis](https://redis.io).
* [Hangfire.Pro.Redis.StrongName](https://nuget.hangfire.io/feeds/hangfire-pro/Hangfire.Pro.Redis.StrongName/) – version that linked with StackExchange.Redis.StrongName.
* [Hangfire.Pro.PerformanceCounters](https://nuget.hangfire.io/feeds/hangfire-pro/Hangfire.Pro.PerformanceCounters/) – allows Hangfire to publish its metrics to Windows Performance Counters – the standard way to monitor Windows applications and services.

Configuring Feed
-----------------

There are several ways to add a NuGet feed, but the main difficulty is authentication. In modern environments with NuGet 3.5+ it is possible to [use environment variables](https://docs.microsoft.com/en-us/nuget/schema/nuget-config-file) to provide credentials, and it is the best way, since you'll have the same configuration for both development machines and build servers, and for all environments, including .NET Core projects.

### Simple Setup in Visual Studio

This is the simplest way to start using Hangfire Pro feed, but it will not work with Continuous Integration. To configure a private feed in Visual Studio, open **Tools &rarr; NuGet Package Manager &rarr; Package Manager Settings** and add a new feed with the following URL:

    https://nuget.hangfire.io/nuget/hangfire-pro

![Package Manager Settings Window](/img/pkg-source-pro.png)

### Modern environments

Applies to: **Visual Studio 2017, .NET Core CLI, NuGet.exe 3.5+**. This will also work in **Visual Studio 2015**, but you'll be prompted for credentials each time you install a package, when *HangfirePro* feed is selected.

Create a new file called `NuGet.config` in the root directory of your solution, and add the following contents.

```xml
<!-- YourSolution\NuGet.config -->
<configuration>
    <packageSources>
        <add key="HangfirePro" value="https://nuget.hangfire.io/nuget/hangfire-pro/" />
    </packageSources>
    <packageSourceCredentials>
        <HangfirePro>
            <add key="Username" value="%HANGFIRE_LOGIN%" />
            <add key="ClearTextPassword" value="%HANGFIRE_PASSWORD%" />
        </HangfirePro>
    </packageSourceCredentials>
</configuration>
```

The changes will take an effect only when you **close the solution and re-open it**. You can safely **add this file to the solution control**, since it does not contain any sensitive data. It's better to set environment variables for credentials then, to not to specify them each time.

#### Setting environment variables

On Windows, use the `setx` command to add the corresponding environment variables as shown below. Please note that these commands will add environment variables for all users and may require additional privileges, but you can remove the `/M` switch to set them for current user only. 

```bash
setx /M HANGFIRE_LOGIN your_login
setx /M HANGFIRE_PASSWORD your_password
```

Alternatively you can set environment variables using the *System properties* window, but don't forget to re-open the command prompt to use the new values.

On *nix systems it depends on your shell program. You can use the following commands to set environment variables when using Bash.

```bash
export HANGFIRE_LOGIN=your_login
export HANGFIRE_PASSWORD=your_password
```

In TeamCity, use [Build Parameters](https://confluence.jetbrains.com/display/TCD9/Predefined+Build+Parameters), in AppVeyor use [secure variables](https://www.appveyor.com/docs/build-configuration/#secure-variables) in your `appveyor.yml` file, in Travis CI it's possible to use [encrypted variables](https://docs.travis-ci.com/user/environment-variables/) too. I believe other continuous integration servers also have an encryption feature.

#### Troubleshooting

**Package not found**: close the solution and open it again. **401 unauthorized** status returned: ensure your environment variables are set and use correct credentials. If package restore **prompts for credentials**, ensure environment variables are set, and you have the latest version of the NuGet client:

```bash
> NuGet.exe help
...
NuGet Version: 3.5.0.1996
```

If your version less than the specified one, just update the NuGet client:

```bash
NuGet.exe update -self
```

If you have any problems with the setup, send an email to <a href="mailto:support@hangfire.io">support@hangfire.io</a>, I'll be happy to help.

### Build servers with NuGet < 3.5

Alternatively, you can run the following command to add a new package source using command line:

    nuget sources add -Name "HangfirePro" -Source https://nuget.hangfire.io/nuget/hangfire-pro -UserName user -Password secret

Installing Packages
--------------------

After configuring private NuGet feed, use your favourite method to install Hangfire Pro NuGet packages.

### Package Manager Console

The Package Manage Console can be opened in Visual Studio through `Tools` &rarr; `Library Package Manager` &rarr; `Package Manager Console`. 

<pre class="nuget-install">PM> Install-Package Hangfire.Pro</pre>

<a href="https://docs.microsoft.com/en-us/nuget/tools/package-manager-console" target="_blank">More details about Package Manager Console</a> <span class="glyphicon glyphicon-small glyphicon-new-window"></span>

### Package Manager Dialog (Visual Studio)

1. Right-click on your project and click "Manage NuGet Packages".
2. Select "NuGet Official Package Source"
3. Search for "Hangfire", using the search bar at the top right
4. Select "Hangfire" and choose Install

![Package Manager Window](/img/pkg-manager.png)

<a href="https://docs.microsoft.com/en-us/nuget/tools/package-manager-ui" target="_blank">More details on how to use Package Manager Dialog</a> <span class="glyphicon glyphicon-small glyphicon-new-window"></span>
