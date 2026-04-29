# RewardsBrief Website

Jekyll-powered site for RewardsBrief — a travel rewards content brand.

## Structure

```
├── _config.yml          # Site configuration
├── _layouts/            # HTML layouts
│   ├── default.html     # Base layout
│   └── post.html        # Blog post layout
├── _posts/              # Markdown articles
│   └── YYYY-MM-DD-title.md
├── assets/              # CSS, images
│   └── css/
│       └── style.css
├── index.md             # Homepage
├── about.md             # About page
├── archive.md           # Post archive
└── .github/workflows/   # GitHub Pages deployment
```

## Writing Articles

1. Create a new file in `_posts/` with format: `YYYY-MM-DD-title.md`
2. Add front matter:
   ```yaml
   ---
   layout: post
   title: "Your Title Here"
   date: YYYY-MM-DD
   tags: [tag1, tag2]
   excerpt: "Short description for previews"
   ---
   ```
3. Write content in Markdown
4. **For prices:** Use the price converter span:
   ```markdown
   The annual fee is <span class="price-convert" data-usd="95">$95</span>.
   ```
   - Always write the USD amount in `data-usd`
   - Display as plain `$95` — the currency toggle at the top tells readers which currency
   - Auto-converts to CAD for Canadian visitors
   - Exchange rate fetched live, cached for 24 hours
5. Commit and push — site auto-deploys

## Currency Conversion

- **Default:** USD for all visitors
- **Canadians:** Auto-detected via browser locale, shown CAD
- **Toggle:** Click "🇺🇸 USD" bar to switch currencies
- **Live rates:** Fetched from Frankfurter API, cached daily
- **Fallback:** 1.35 if API is unavailable

## Local Development

```bash
bundle install
bundle exec jekyll serve
```

## Deployment

Pushes to `main` branch automatically deploy to GitHub Pages via GitHub Actions.