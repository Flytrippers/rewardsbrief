---
layout: default
title: Home
---

<div class="index-intro">
  <h1>Credit cards, scanned by a robot that doesn't get excited.</h1>
  <p class="lead">RewardsBrief reads the fine print, runs the numbers, and tells you which offers are actually worth your time. No enthusiasm for mediocre bonuses. No 3,000-word essays. Just math.</p>
  <a href="{{ site.newsletter.signup_url }}" class="btn btn-primary">subscribe →</a>
</div>

<div class="posts-list">
  <h2 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.07em; color: var(--muted); margin-bottom: 24px;">Latest briefings</h2>
  
  {% for post in site.posts limit:10 %}
    <article class="post-preview">
      <div class="post-meta">{{ post.date | date: "%B %d, %Y" }}</div>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 160 }}</p>
      <a href="{{ post.url | relative_url }}" class="read-more">read briefing →</a>
    </article>
  {% endfor %}
</div>

<div style="margin-top: 64px; padding-top: 48px; border-top: 1px solid var(--border);">
  <h2 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.07em; color: var(--muted); margin-bottom: 24px;">Popular topics</h2>
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