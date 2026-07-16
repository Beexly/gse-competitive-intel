# FantasyPros — passive tech fingerprint + programmatic-SEO scale

## Tech stack (passive: public headers + homepage HTML)
- Server: **Apache/2.4.52 (Ubuntu)** — classic **PHP monolith** (22 php refs; .php URLs everywhere)
- CDN/edge: **AWS CloudFront** (X-Cache: cloudfront, X-Amz-Cf-Pop MCI50) — NOT Cloudflare like FantasyGuru
- Analytics/instrumentation: **Mixpanel + Google Analytics + Google Tag Manager (gtag 24x)** — mature product-analytics + experimentation stack (contrast FG's GTM-only)
- Consent: **OneTrust (42x)** — enterprise privacy/consent management (regulated-scale operation)
- Integrations in page: **Sleeper (16x)**, Shopify (merch), Vue + some Next fragments
- Cookies: homepage_loggedout, fp_prefs — server-rendered auth state

## Programmatic-SEO scale (the thing that explains "38M annual visits")
- ONE child sitemap (NFL QB "start") = **21,063 URLs**. NFL QB draft = 21,063. QB trade = 21,063.
- MLB "OF start" alone paginated into **10 parts** (~206k URLs for one position/type).
- Sitemap index = **231 child sitemaps**: 120 MLB + 87 NFL + 12 NBA + 4 NHL + rankings/articles/news/nav.
- Editorial "articles" sitemap = **42 URLs**.
- => Estimated **~3-4 MILLION auto-generated doorway pages** ("Should I start [player] Week N", draft/trade/start per player) vs ~42 hand-written articles.
- **This IS the company**: a programmatic-SEO engine (player x week x action x format templated pages) with a thin editorial layer + the ECR/tools product. Their traffic is manufactured at template scale, not earned per-article like FantasyGuru.

## Strategic read for GSE
- FantasyPros = aggregation + SEO scale + tooling; NOT proprietary modeling. Their "edge" is consensus (borrowed from 100+ experts) + distribution (millions of long-tail SEO pages) + league-sync lock-in.
- GSE's proprietary-model + glass-box + accuracy-proof thesis attacks the one thing consensus can't: an actual differentiated prediction with receipts. FantasyPros literally averages other people; it has no first-party signal.
- Their moat is distribution & integrations (Sleeper/ESPN/Yahoo sync), not data science. That's a moat GSE routes around (proprietary signal) rather than out-SEOs.
