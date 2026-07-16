# FantasyGuru — Deep-Intel Addendum

Second-pass intelligence beyond the main dossier. Same boundary: public surface + passive OSINT only (public response headers, public HTML/JS, public search, public archives). No paywalled bodies, no `/api/` probing, no login.

---

## A. Publishing velocity & content footprint (from 46,844 timestamps)

**The engine is almost entirely NFL, and it's a news-wire operation.**

| Signal | Finding |
|---|---|
| News-wire posts (automated player-status pattern) | **~10,097 (21.6% of all URLs)** — verb patterns like "-ruled-out / -activated / -signs / -optioned / -fully-practices" |
| News-wire sport mix | **Overwhelmingly NFL** — top team prefixes: bills (91), buccaneers (84), dolphins (83), texans (81), commanders (81), raiders, patriots, browns… |
| NFL peak cadence | **3,000–3,700 posts/month (~100–125/day) Sep–Jan** (football season) |
| MLB peak cadence | **~80 posts/month** at its April–July peak |
| **NFL : MLB volume ratio** | **~10–15× in-season** — MLB is a comparatively thin, lightly-staffed operation |
| Seasonal shape | NFL ramps hard Aug→Dec, collapses Feb–Jun; MLB inverts (Apr–Jul), but at a fraction of the volume |

**Caveat (important):** sitemap `lastmod` dates cluster in 2024–2025 with nothing older, despite the site claiming © since 1995. That's the signature of a **bulk site migration re-stamp** (headless-WordPress → Next.js, see §B). So the *yearly totals* (2024: 17k, 2025: 24k) reflect migration/rebuild dates, **not** original publish dates — do not read them as "they published 24k articles in 2025." The **seasonal month-to-month shape and the NFL≫MLB ratio are reliable** (they track content type, not migration).

**Strategic read:** MLB is the soft flank. It rides almost entirely on Ray Flowers + a handful of daily contributors, at ~1/15th the NFL cadence. A focused, provably-accurate MLB product (umpire/strike-zone, bullpen, DFS) faces far thinner competition here than in football — and their own vendor churn (Swish Analytics) hit exactly this vertical.

---

## B. Infrastructure & vendor stack (100% passive fingerprint)

All from public response headers + public homepage HTML — nothing gated was touched.

| Layer | Finding | How known |
|---|---|---|
| CDN / edge | **Cloudflare** | `Server: cloudflare`, `CF-RAY`, `__cf_bm` cookie |
| Hosting | **DigitalOcean App Platform** | `x-do-app-origin`, `x-do-orig-status` headers |
| Frontend | **Next.js** (SSR/RSC) | `x-powered-by: Next.js`, `_next/` (127×) |
| CMS / content store | **Headless WordPress** | `wp-content` assets (83×) served from shop subdomain |
| Media host | **shop.fantasyguru.com** serves the site's images | all `wp-content` src → shop.fantasyguru.com |
| E-commerce / merch | **WooCommerce** store at `shop.fantasyguru.com` | `WooCommerce` (16×) + `woocommerce` (82×) in shop HTML |
| Analytics | **Google Tag Manager / gtag** | `googletagmanager`, `gtag` in HTML |
| Player imagery | **ESPN CDN** (`a.espncdn.com`, 46×) | script/img hosts |
| DFS integration | **DraftKings** referenced (4×) | homepage HTML |
| Community | **Discord** (6×) + SiriusXM references | homepage HTML |
| Billing | Not exposed on public pages (lives on gated /join-today / account) | not probed |

**Architecture in one line:** one **WooCommerce/WordPress** install (`shop.*`) acts as CMS + media library + merch store, feeding a **Next.js** subscription frontend on **DigitalOcean** behind **Cloudflare**. This explains the 46k-URL legacy corpus (WordPress history) migrated under a new Next.js skin with re-stamped dates.

**Strategic reads for GSE:**
- They run a **second revenue line (merch/WooCommerce)** beyond subscriptions — worth noting for monetization ideas, but also a sign the subscription business alone may need supplementing.
- The stack is **conventional and content-heavy, not data-engineering-heavy** (WordPress + GTM + ESPN images). GSE's data-first, calibrated-model architecture is a genuinely different (and defensible) technical posture — they are a media company with tools bolted on, not a modeling company.
- No modern product-analytics/experimentation stack visible (just GTM) — they likely optimize by editorial instinct, not experimentation.

---

## C. Corporate history & ownership (this rewrites the "positioning" picture)

The current bios oversell "ownership." The real lineage (high confidence, multiple sources):

- **Founded 1995 by John Hansen** as the *Guru Report Newsletter* (mailed/faxed) → website 1998 → print magazine until 2009. Hansen is an FSWA Hall of Famer and the original "Fantasy Guru"; he hosted SiriusXM's morning fantasy show until stepping back in 2024. **He is not part of the site today.**
- Legal entity: **Guru Fantasy Reports, Inc.** (New York).
- **2015:** Hansen sold; the company was rolled into **Gaming Nation Inc.** (TSX-V: FAN, reverse takeover). 2016: launched "Fantasy Guru Elite" / DFS.
- **2017:** **Orange Capital Ventures acquired Gaming Nation in a ~$44M all-stock take-private.** FantasyGuru has since been a **private-equity portfolio company of Orange Capital Ventures GP, LP** — so the "Owner" labels on the Mans/Brink bios are nuanced by PE ownership.
- **~2019:** Hansen departed (to Fantasy Points). **Jeff Mans took over as operator** (part-owner / Chief Content Officer); **Rob Brink** has been **CEO since 2018** (ex-COO of Guru Elite).
- **June 2023:** **LiveOne's PodcastOne signed a binding LOI to acquire FantasyGuru** (all-stock, ~$4–6.4M). **Completion unconfirmed** in public sources — appears to have stayed pending; a PodcastOne podcast relationship did form.
- Umbrella brand: **EliteFantasy.com**; SiriusXM Fantasy Sports Radio Ch. 86/87 ("Elite Sports with Jeff Mans," now 3–6 PM ET).
- **Not related** to RotoExperts / FNTSY / Baseball Guys (separate SportsGrid/Anthem lineage) — a common conflation; Mans's pre-FG home was **Fantasy Alarm**, not RotoExperts.

## D. Business scale (the numbers that matter for GSE)

From the June 2023 PodcastOne/LiveOne acquisition disclosure (their own reported figures at the time):
- **~24,000 paying subscribers**
- **ARPU > $8/month**
- **~$2.5M+ added revenue**, **~$600K+ EBITDA**

Independent public signals (2024–2026, low-confidence/volatile):
- **Website traffic ~11K–38K visits/month** (Similarweb; small and swingy; ~76% direct — a loyal-base, not a search-acquisition, business).
- **Social:** ~40K X followers (@FantasyGuruSite), ~9.6K Facebook, ~5.4K Instagram.
- **iOS app:** "FantasyGuru" (free, content gated), **4.7★ / ~2.2K ratings**, last updated Mar 2025 — but **a WebView wrapper** (reviews complain it signs users out / forces re-login; "MobiLoud builder" unconfirmed).
- **Android app: pulled from Google Play (April 2025)** — they let the Android app lapse.

**Reads for GSE:** This is a **~$2.5M-revenue, ~24k-subscriber, PE-owned lifestyle-media business** running on a loyal direct-traffic base and a radio personality — *not* a venture-scale data company. That's a beatable size. The traffic is small and direct (brand/loyalty-driven, weak SEO), the Android app was abandoned, and the iOS app is a wrapper — product/engineering is clearly not where they invest. A genuinely better data product with real SEO and a native experience is a credible flank.

## E. Author output & single points of failure

Author archive pages (public) show each analyst's recent output. Signal:
- **Ray Flowers is the load-bearing MLB pillar** — DFS plays, FAAB, workload/closer analysis, active daily (most recent July 10). If he's the SiriusXM + EVP + lead writer, MLB depends heavily on one person.
- **Jeff Mans writes sparingly** (most recent June 1) — he's the on-air/owner face, not the daily writer. The brand leans on his *voice*, not his volume.
- **Rob Povia's byline is stale** (most recent Mar 2024) — now editing, not writing.
- **Newly surfaced names** beyond the 26-person roster: **Brett Wojo** (MLB DFS/FAAB), and app copy names a "Sandro" — the masthead is larger and messier than the public roster page suggests.
- Most analysts show only ~11–16 recent items on their author page (display cap), NFL bylines active into July, MLB carried by Flowers/Rose/Wojo/Baldino.

**Read:** MLB is not just low-volume (§A) — it's **concentrated in Ray Flowers**. Key-person risk on the exact vertical where they just lost a data vendor (Swish Analytics).
