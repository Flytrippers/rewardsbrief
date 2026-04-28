---
layout: default
title: Archive
---

# All Briefings

{% for post in site.posts %}
  {% assign currentdate = post.date | date: "%Y" %}
  {% if currentdate != date %}
    {% unless forloop.first %}</ul>{% endunless %}
    <h2 id="year-{{ currentdate }}">{{ currentdate }}</h2>
    <ul>
    {% assign date = currentdate %}
  {% endif %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <small>— {{ post.date | date: "%B %d" }}</small>
  </li>
  {% if forloop.last %}</ul>{% endif %}
{% endfor %}