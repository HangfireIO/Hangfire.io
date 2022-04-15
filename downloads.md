---
layout: products
title: Downloads — Hangfire Core
active: overview
sub_active: downloads
redirect_from: /core/download.html
---

<h1 class="page-header">Downloads</h1>

Hangfire is published as NuGet packages, as are nearly all of the extensions. If you have NuGet installed, you can right-click on your project and choose `Add Library Package Reference`. Search for <a href="https://www.nuget.org/packages?q=Hangfire">Hangfire</a>, and you should see a list of packages. Click *Install*, and you're done. Here are the example packages:

* [Hangfire.Core](https://www.nuget.org/packages/Hangfire.Core/)
* [Hangfire.AspNet](https://www.nuget.org/packages/Hangfire.AspNet/)
* [Hangfire.AspNetCore](https://www.nuget.org/packages/Hangfire.AspNetCore/)
* [Hangfire.InMemory](https://www.nuget.org/packages/Hangfire.InMemory/)
* [Hangfire.NetCore](https://www.nuget.org/packages/Hangfire.NetCore/)
* [Hangfire.SqlServer](https://www.nuget.org/packages/Hangfire.SqlServer/)

### Package Manager Console

The Package Manage Console can be opened in Visual Studio through `Tools` &rarr; `Library Package Manager` &rarr; `Package Manager Console`. 

<pre class="nuget-install">PM> Install-Package Hangfire</pre>

<a href="https://docs.nuget.org/docs/start-here/Using-the-Package-Manager-Console" target="_blank">More details about Package Manager Console</a> <span class="glyphicon glyphicon-small glyphicon-new-window"></span>

### Package Manager Dialog (Visual Studio)

1. Right-click on your project and click "Manage NuGet Packages".
2. Select "NuGet Official Package Source"
3. Search for "Hangfire", using the search bar at the top right
4. Select "Hangfire" and choose Install

<a href="https://docs.nuget.org/docs/start-here/managing-nuget-packages-using-the-dialog" target="_blank">More details on how to use Package Manager Dialog</a> <span class="glyphicon glyphicon-small glyphicon-new-window"></span>

<a id="ci-feed"></a>

## Continuous Integration Feed

Can't wait for a new release? Not a problem as there is a continuous integration feed for Hangfire packages hosted in [AppVeyor](https://www.appveyor.com/). After each successful commit to the `master` or `dev` branches or any open pull request based on these branches, pre-release packages are pushed to the feed automatically. Here is its url:

    https://ci.appveyor.com/nuget/hangfire

### Adding the feed

To configure a CI feed in Visual Studio open **Tools &rarr; NuGet Package Manager &rarr; Package Manager Settings** and add a new feed.

![Package Sources Window](/img/pkg-source.png)

To configure a project NuGet feed on your development machine run this command:

    nuget sources add -Name hangfire-ci -Source https://ci.appveyor.com/nuget/hangfire-6d3854sflnyb

### Updating packages

After adding the feed, use the NuGet Package Manager to obtain new versions of packages. In Visual Studio Solution Explorer, right-click the **References** node and click **Manage NuGet Packages...** and ensure that **Include Prerelease** option is turned on.

<img src="/img/pkg-manager-ci.png" alt="Package Manager Window" style="max-width: 100%;">
