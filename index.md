---
layout: default
title: Home
---

<div class="index-intro">
  <h1>Better travel rewards decisions.<br>Less noise. More travel.</h1>
  <p class="lead">We scan credit card offers, run the numbers, and tell you which ones are worth your time. No enthusiasm for mediocre bonuses. No filler. Just math.</p>
  {% include newsletter-signup.html %}
</div>

<div class="posts-section">
  <h2 class="posts-section-title">Latest briefings</h2>
  
  {% for post in site.posts limit:10 %}
    <article class="post-preview">
      <div class="post-meta">{{ post.date | date: "%B %d, %Y" }}</div>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 160 }}</p>
      <a href="{{ post.url | relative_url }}" class="read-more">Read briefing →</a>
    </article>
  {% endfor %}
</div>

<div style="margin-top: 64px; padding-top: 48px; border-top: 1px solid var(--border);">
  <h2 class="posts-section-title">Popular topics</h2>
  <div class="topics-list">
    <span class="tag">credit cards</span>
    <span class="tag">points and miles</span>
    <span class="tag">transfer partners</span>
    <span class="tag">beginner</span>
    <span class="tag">canadian card</span>
    <span class="tag">us card</span>
    <span class="tag">offer alerts</span>
  </div>
</div>