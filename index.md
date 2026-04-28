---
layout: default
title: Home
---

# RewardsBrief

## Your Weekly Briefing on Travel Rewards

Get the best points hacks, credit card deals, and luxury travel for less — delivered fast.

---

## Latest Briefings

<div class="posts-list">
{% for post in site.posts limit:10 %}
  <article class="post-preview">
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <p class="post-meta">{{ post.date | date: "%B %d, %Y" }} • {{ post.reading_time }} min read</p>
    <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 160 }}</p>
    <a href="{{ post.url | relative_url }}" class="read-more">Read briefing →</a>
  </article>
{% endfor %}
</div>

---

## Never Miss a Deal

Join 1,000+ travelers getting our weekly rewards briefing.

[Subscribe to Newsletter →](#){: .btn .btn-primary}

---

## Popular Topics

- [Credit Card Points](/tags/credit-cards)
- [Airline Miles](/tags/airlines)
- [Hotel Status](/tags/hotels)
- [Sweet Spots](/tags/sweet-spots)
- [Beginner Guides](/tags/beginners)