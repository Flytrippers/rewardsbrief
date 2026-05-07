---
layout: default
title: Home
---

<div class="index-intro">
  <h1>Travel rewards without the noise</h1>
  <p class="lead">We scan credit card offers, run the numbers, and tell you which ones are worth your time. No enthusiasm for mediocre bonuses or filler. Just math.</p>
  {% include newsletter-signup.html %}
</div>

<section class="home-panel">
  <h2>How RewardsBrief evaluates offers</h2>
  <div class="criteria-grid">
    <div>
      <h3>Current offer</h3>
      <p>Welcome bonus, annual fee, spending requirement, eligibility rules, and deadline if there is one.</p>
    </div>
    <div>
      <h3>Realistic value</h3>
      <p>Estimated point value after fees, using travel redemptions a normal reader can actually book.</p>
    </div>
    <div>
      <h3>Reasons to skip</h3>
      <p>Every strong recommendation needs a catch. If the math is weak, the answer is wait or skip.</p>
    </div>
  </div>
</section>

<section class="home-panel">
  <h2>Start here</h2>
  <p>New to travel rewards, or just cleaning up the basics? Start with the 101 guide, then use the briefings to compare current offers.</p>
  <a href="{{ '/travel-rewards-101' | relative_url }}" class="read-more">Read Travel Rewards 101 →</a>
</section>

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