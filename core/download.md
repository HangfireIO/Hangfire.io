---
layout: core
title: Download – Hangfire Core
display_brand: true
sub_active: download
---

Hangfire Core is published as a NuGet package, as are nearly all of the extensions. If you have NuGet installed, you can right-click on your project and choose `Add Library Package Reference`. Search for <a href="https://www.nuget.org/packages?q=Hangfire">Hangfire</a>, and you should see a list of packages. Click *Install*, and you're done. Here is the list of Hangfire Core packages:

* [Hangfire](https://www.nuget.org/packages/HangFire/)
* [Hangfire.Core](https://www.nuget.org/packages/HangFire.Core/)
* [Hangfire.SqlServer](https://www.nuget.org/packages/HangFire.SqlServer/)
* [Hangfire.SqlServer.Msmq](https://www.nuget.org/packages/HangFire.SqlServer.MSMQ/)
* [Hangfire.SqlServer.RabbitMq](https://www.nuget.org/packages/Hangfire.SqlServer.RabbitMQ/)

### Package Manager Console

The Package Manage Console can be opened in Visual Studio through `Tools` &rarr; `Library Package Manager` &rarr; `Package Manager Console`. 

<pre class="nuget-install">PM> Install-Package Hangfire</pre>

[More details about Package Manager Console](http://docs.nuget.org/docs/start-here/Using-the-Package-Manager-Console)

### Package Manager Dialog (Visual Studio)

1. Right-click on your project and click "Manage NuGet Packages".
2. Select "NuGet Offical Package Source"
3. Search for "Hangfire", using the search bar at the top right
4. Select "Hangfire" and choose Install

[More details on how to use Package Manager Dialog](http://docs.nuget.org/docs/start-here/managing-nuget-packages-using-the-dialog)