---
layout: default
title: Archive
---

<div class="page-hero">
  <h1>All briefings</h1>
  <p class="subtitle">Every article we've published, organized by year.</p>
</div>

{% for post in site.posts %}
  {% assign currentdate = post.date | date: "%Y" %}
  {% if currentdate != date %}
    {% unless forloop.first %}</ul>{% endunless %}
    <h2 class="archive-year">{{ currentdate }}</h2>
    <ul class="archive-list">
    {% assign date = currentdate %}
  {% endif %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <span class="date">{{ post.date | date: "%B %d" }}</span>
  </li>
  {% if forloop.last %}</ul>{% endif %}
{% endfor %}