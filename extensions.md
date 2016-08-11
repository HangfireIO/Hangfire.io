---
layout: products
title: Hangfire Extensions
active: overview
sub_active: extensions
redirect_from:
- /extensions/
- /extensions/third-party.html
---

<h1 class="page-header">Extensions</h1>

<div class="alert alert-warning">
    If you author an extension, please don't hesitate to post it here by editing
    the <a href="{{ site.github_repo }}/edit/{{ site.github_branch }}/_data/extensions.yml" target="_blank">_data/extensions.yml</a>
    file and creating a pull-request. Just click the link and follow the instructions.
</div>

{% for category in site.data.extensions %}

## {{ category.name }}

{% if category.description %}
<p>{{ category.description }}</p>
{% endif %}

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
                    <img alt="Latest version" src="https://img.shields.io/nuget/v/{{ project.name }}.svg">
                </a>
                {% endif %}
            </td>
        </tr>
    {% endfor %}
    </tbody>
</table>

{% endfor %}
