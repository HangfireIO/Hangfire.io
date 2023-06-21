---
layout: products
title: Extensions — Hangfire Core
active: overview
sub_active: extensions
redirect_from:
- /extensions/
- /extensions/third-party.html
---

<h1 class="page-header">Extensions</h1>

<div class="alert alert-info">
    If you author an extension, please don't hesitate to post it here by editing
    the <a href="{{ site.github_repo }}/edit/{{ site.github_branch }}/_data/extensions.yml" target="_blank">_data/extensions.yml</a>
    file and creating a pull-request. Just click the link and follow the instructions.
</div>

<div class="alert alert-warning">
    <h4>Disclaimer</h4>
    Please note that the extensions below developed and maintained by the community. Extensions in Hangfire might significantly affect the execution pipeline, especially job storage implementation. We don't provide official support for community-based packages.
</div>

{% for category in site.data.extensions %}

## {{ category.name }}

{% if category.description %}
<p>{{ category.description }}</p>
{% endif %}

<div class="table-responsive">
<table class="table table-condensed table-extensions">
    <thead>
        <tr>
            <th>Project</th>
            <th style="width: 25%">Author</th>
            <th style="width: 20%">Latest Version</th>
        </tr>
    </thead>
    <tbody>
    {% for project in category.projects %}
        <tr>
            <td>
               <a href="{{ project.url }}" target="_blank">{{ project.name }}</a>
               {% if project.description %}
               <br>
               <small>{{ project.description }}</small>
               {% endif %}
            </td>
            <td>
            {% if project.author %}
                <img src="https://github.com/{{ project.author }}.png?size=60" alt="{{ author }}" style="width: 30px;height:30px;">
                <a href="https://github.com/{{ project.author }}" target="_blank">{{ project.author }}</a>
            {% endif %}
            </td>
            <td>
                {% if project.nuget != "n/a" %}
                <a href="https://www.nuget.org/packages/{{ project.name }}/" target="_blank">
                    <img alt="Latest version" src="https://badges.hangfire.io/nuget/v/{{ project.name }}.svg">
                </a>
                {% endif %}
            </td>
        </tr>
    {% endfor %}
    </tbody>
</table>
</div>

{% endfor %}
