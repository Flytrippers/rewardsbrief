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
4. Commit and push — site auto-deploys

## Local Development

```bash
bundle install
bundle exec jekyll serve
```

## Deployment

Pushes to `main` branch automatically deploy to GitHub Pages via GitHub Actions.