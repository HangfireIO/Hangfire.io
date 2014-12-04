---
layout: products
title: Hangfire Downloads
product_name: Hangfire
sub_active: downloads
---

Hangfire is published as NuGet packages, as are nearly all of the extensions. If you have NuGet installed, you can right-click on your project and choose `Add Library Package Reference`. Search for <a href="https://www.nuget.org/packages?q=Hangfire">Hangfire</a>, and you should see a list of packages. Click *Install*, and you're done. Here is the list of Hangfire packages:

* [Hangfire](https://www.nuget.org/packages/Hangfire/)
* [Hangfire.Core](https://www.nuget.org/packages/Hangfire.Core/)
* [Hangfire.SqlServer](https://www.nuget.org/packages/Hangfire.SqlServer/)
* [Hangfire.SqlServer.Msmq](https://www.nuget.org/packages/Hangfire.SqlServer.MSMQ/)
* [Hangfire.SqlServer.RabbitMq](https://www.nuget.org/packages/Hangfire.SqlServer.RabbitMQ/)

### Package Manager Console

The Package Manage Console can be opened in Visual Studio through `Tools` &rarr; `Library Package Manager` &rarr; `Package Manager Console`. 

<pre class="nuget-install">PM> Install-Package Hangfire</pre>

<a href="http://docs.nuget.org/docs/start-here/Using-the-Package-Manager-Console" target="_blank">More details about Package Manager Console</a> <span class="glyphicon glyphicon-small glyphicon-new-window"></span>

### Package Manager Dialog (Visual Studio)

1. Right-click on your project and click "Manage NuGet Packages".
2. Select "NuGet Offical Package Source"
3. Search for "Hangfire", using the search bar at the top right
4. Select "Hangfire" and choose Install

<a href="http://docs.nuget.org/docs/start-here/managing-nuget-packages-using-the-dialog" target="_blank">More details on how to use Package Manager Dialog</a> <span class="glyphicon glyphicon-small glyphicon-new-window"></span>

## Continuous Integration Feed

Can't wait for a new release? Not a problem as there is a continuous integration feed for Hangfire packages hosted in [AppVeyor](http://www.appveyor.com/). After each successful commit to the `master` or `dev` branches or any open pull request based on these branches, pre-release packages are being pushed to the feed automatically. Here is its url:

```
https://ci.appveyor.com/nuget/hangfire-6d3854sflnyb
```

### Adding the feed

To configure a CI feed in Visual Studio open **Tools &rarr; NuGet Package Manager &rarr; Package Manager Settings** and add a new feed.

![Package Sources Window](/img/pkg-source.png)

To configure a project NuGet feed on your development machine run this command:

```
nuget sources add -Name hangfire-ci -Source https://ci.appveyor.com/nuget/hangfire-6d3854sflnyb
```

### Updating packages

After adding the feed, use the NuGet Package Manager to obtain new versions of packages. In Visual Studio Solution Explorer, right-click the **References** node and click **Manage NuGet Packages...** and ensure that **Include Prerelease** option is turned on.

<div class="alert alert-warning">
	<h4>Read release notes carefully</h4>
	<p>
		Please read the release notes before updating a package. Since a package can be built after a commit to a pull request based on an outdated code, you may receive a <strong>downgraded version</strong> of a package.
	</p>
</div>

<img src="/img/pkg-manager-ci.png" alt="Package Manager Window" style="max-width: 100%;">