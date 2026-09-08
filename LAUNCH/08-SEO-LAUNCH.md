# 08 — SEO + LAUNCH MECHANICS (paste-ready)
## JSON-LD Organization + WebSite (add to app/page.tsx or layout — pattern already exists via lib/seo/json-ld)
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Galaxy Sports Edge",
      "url": "https://galaxysportsedge.com",
      "slogan": "Find the signal before the market moves.",
      "email": "hq@galaxysportsedge.com",
      "parentOrganization": { "@type": "Organization", "name": "Galaxy Sports Network" }
    },
    {
      "@type": "WebSite",
      "name": "Galaxy Sports Edge",
      "url": "https://galaxysportsedge.com",
      "inLanguage": "en-US"
    }
  ]
}
</script>

## SITEMAP / INDEX PINGS (run after deploy tonight)
- Google Search Console: submit https://galaxysportsedge.com/sitemap.xml
- Bing IndexNow: POST to api.indexnow.org with key (generate a key file at /{key}.txt route or reuse robots verification)
- robots.ts already exists — confirm it references Sitemap: https://galaxysportsedge.com/sitemap.xml

## META TITLES (key routes — keep under 60c)
/          : Galaxy Sports Edge — Find the Signal Before the Market Moves
/methodology: Methodology: Deterministic Scoring, Open Framework | Galaxy Sports Edge  (exists)
/pricing   : Founding Pricing — Locked for Life | Galaxy Sports Edge
/launch    : Founding Launch: Galaxy Fantasy (exists)
/integrity : The Integrity Contract | Galaxy Sports Edge
/how-to-verify-a-record : Verify Any Pick Record | Galaxy Sports Edge

## LAUNCH-DAY CADENCE GUARD
The Odds API free tier = 500 req/mo. Do NOT set board refresh aggressive on launch night.
Cockpit already has api-costs tiles — check them after deploy. Recommended: 6 refreshes/day until revenue.

## SOCIAL PUBLISH ORDER (X first, then IG/FB/Threads copy from 01 §2/§6)
1. X thread (01 §5) + pin post 3 (the honesty mechanics) as the evergreen.
2. IG/Threads: carousel from Honesty Contract items (01 §4) — one slide per mechanism.
3. Newsletter (journal route): launch note (01 §7).
4. GSN podcast: record a 10-min "why No-Bet is the product" episode — the methodology page is the show notes.
