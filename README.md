# Carthage Courier

English-language classic broadsheet for the Tunisia News Platform — "the 140-year-old paper of record." Next.js 16 (App Router) + Tailwind CSS v4, served on **port 3001**. Reads published articles from the shared backend (`http://localhost:4000`) via the public per-site API (`/api/public/carthage-courier/...`).

## Environment variables (`.env.local`)

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000` |
| `NEXT_PUBLIC_SITE_SLUG` | `carthage-courier` |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3001` |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense client id (empty = dashed placeholders) |
| `NEXT_PUBLIC_ADSENSE_SLOT_TOP` | Leaderboard slot under the masthead (home) |
| `NEXT_PUBLIC_ADSENSE_SLOT_INARTICLE` | In-article slot (after article content) |
| `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` | Reserved (unused on this site) |

## Run

```bash
npm install
npm run dev   # http://localhost:3001
```

Includes home front-page grid, `/article/[slug]` (full SEO metadata + JSON-LD NewsArticle), `/category/[name]` with pagination, `sitemap.xml`, `robots.txt`, and `/feed.xml` RSS.
