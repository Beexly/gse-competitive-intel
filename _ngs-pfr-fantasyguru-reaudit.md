# Re-audit: Next Gen Stats · Pro-Football-Reference · FantasyGuru (2026-07-15)

Passive-public only. No probing of gated/staging/auth infra; no bypassing paywalls or Cloudflare challenges; no scraping PFR (their ToS forbids it — respected). Data-source assessment framed around GSE's "find legal data → use it → prove it" mandate. Firecrawl re-enabled.

---
## 1) NFL Next Gen Stats (nextgenstats.nfl.com) — DATA SOURCE
**Infra:** Fastly CDN (151.101.x.x; h3.nfl.map.fastly.net); alias **ngs.nfl.com**. Adobe analytics stack (Alloy/Target/Analytics — seen in Wayback path history: /adobe-alloy, /adobe-target-v2, /adobe-analytics). robots.txt = **fully open** (`Disallow:` empty) — the NFL WANTS NGS indexed.
**Data pipeline (verified):** runs **entirely on AWS**, tracking via **Zebra Technologies** (RFID in shoulder pads) + **Wilson** (ball sensors); captures location/speed/distance/acceleration **10×/sec**, to inches.
**Public API topology (from Wayback URL history — NOT probed):** front-end renders from `/api`, **`/api-ngs`**, **`/feeds-rs`**, `/charts`, `/stats`, `/leaders`, `/heatmap`, `/player`, `/defense`, `/plays`, `/summary`, `/tracking`. Public site sitemap has only 10 top-level pages (passing/rushing/receiving/top-plays/charts/glossary/news) — deep stats are API/JS-driven.
**Official API** (`docs.ngs.nfl.com`): League Data, Tracking Data, Player/Team Participation & Performance, Leaders, Heatmaps, Charts, Game Schematics, Splits, Alerts + a **Streaming API** — but this is a **gated club/partner API**, not open public.
**GSE legal path (KEY):** the clean, licensed route to NGS-derived tracking metrics is **nflverse** (`nflreadpy`/`nflreadr`), broadly **CC-BY 4.0** (FTN = CC-BY-SA 4.0). Do NOT scrape NGS directly. This validates GSE's existing nflverse spine and is a compliance edge over competitors who scrape.
**GSE metric unlocks (already legal via nflverse):** air yards, separation, CROE (completion % over expected), expected completion %, time-to-throw, ball speed/MPH, route/coverage data — the raw material for a proprietary, calibrated GSE Rating that most tip-sites (scores24) lack entirely.

## 2) Pro-Football-Reference (pro-football-reference.com) — REFERENCE SOURCE, LOCKED
**Owner:** **Sports Reference LLC** (founder **Sean Forman**; © 2000–2026). Network: PFR, Baseball/Basketball/Hockey-Reference, **FBref** (soccer), CFB/CBB. Paid tool = **Stathead**; viral games = Immaculate Grid/Footy.
**Infra:** Cloudflare (104.18.x.x); Google Workspace mail (+ legacy Postini psmtp.com); HubSpot marketing (SPF). **Aggressively anti-bot** — robots.txt itself returns a Cloudflare JS challenge / **403 even via stealth proxy**. Dedicated bot-traffic.html policy; will IP-block spidering.
**Data-use terms (their own words — the "what they don't want" made explicit):**
- ToS clause 5: may NOT use their data to "**create any database... that competes with or constitutes a material substitute**" for their services/data, nor "**provide any service that competes**"; may NOT scrape to "**train generative artificial intelligence models**" without permission.
- Custom data requests: **$5,000 minimum**.
- Concession: "**copyright law is clear that facts cannot be copyrighted**, so you are free to reuse facts... in accordance with copyright laws." → raw facts reusable; the *compilation/database* and *scraping act* are contractually barred.
**Upstream data providers they name:** **Sports Info Solutions (SIS)**, **Sports Direct Inc (a Gracenote subsidiary)**, **Spotrac** (contracts). Some datasets license-locked (no redistribution).
**GSE takeaway:** treat PFR as a **human verify/reference** surface only. Never scrape it (ToS + AI-training ban + Cloudflare wall). For licensed depth, SIS/Gracenote are the upstream vendors. GSE's nflverse path avoids the whole trap.

## 3) FantasyGuru (fantasyguru.com) — COMPETITOR RE-AUDIT (net-new vs 2026-07-10)
**Infra:** Cloudflare; **Microsoft 365** mail (outlook.com protection); **Freshdesk** support; **Autopilot** (marketing automation) + Zoho Campaigns (zcsend) + SMTP.com; MS domain verification. Backend/shop on **WordPress** (`shop.fantasyguru.com/wp-content`). robots hides `/account`, `/api/`, `/join-today`.
**Ownership (REFINED — correction to prior "PE-owned" note):** founder **John Hansen sold it in 2015**; became a subsidiary of **Gaming Nation Inc.**; operated by **Jeff Mans** (the exact personality GSE's founder-voice doctrine targets to beat — see [[feedback-gse-founder-voice]]). Verify current cap-table in the deep pass; ~24k subs/$2.5M rev figure is from the prior teardown, unconfirmed here.
**Pricing (NEW, clear track×tier matrix, annual):**
- Football track: **$59.99/yr** starting · Baseball track: **$59.99/yr** starting
- **All-Access: $109.99/yr** (Seasonal + Daily + Betting)
- **MVP: $219.99/yr** (top tier) · plus an **Elite+** tier
- Monthly + annual offered; cancel-anytime.
- (vs FantasyPros $3.99–8.99/mo ≈ $48–108/yr — FantasyGuru is a **premium-priced, content-first** play, pricier at the top.)
**Product (NEW since teardown):**
- **MyGuru** (fantasyguru.com/myguru) — personalized draft tool = their answer to FantasyPros' My Playbook / Draft Wizard. NEW.
- **Coaching Breakdowns** content series — coaching-system breakdowns for all 32 NFL teams (fresh 2026 content engine).
- Flagship **2026 NFL Draft Guide**; mid-season rankings; "2026 PPR Running Back Myth" thesis content.
- **RaceGuru** (NASCAR) + golf (Open Championship) → multi-sport content expansion beyond NFL/MLB/NBA.
- **DFS Optimizer**, projections, rankings, betting tools, **premium podcasts/livestreams**.
- **Discord** community (24/7 access as a paid perk) — community/retention moat.
- Data/scores product (fantasyguru.com/data, /scores) across sports.
**Positioning:** premium subscription **content brand** (personality-led: Jeff Mans et al.) + tools + community, not a free-SEO or aggregation play. Smaller footprint than FantasyPros; content/draft-guide-centric.

## Deep-pass additions (2026-07-16, one-by-one re-run of failed/skipped fetches)

### NGS — full tracking-metric catalog (from /glossary)
Passing: **Time To Throw (TT)**, **Completed Air Yards (CAY)**, **Intended Air Yards (IAY)**, **Air Yards Differential (AYD)**, **Longest Completed Air Distance (LCAD)**, **Aggressiveness (AGG%)** (throws into ≤1yd coverage), **Air Yards to the Sticks (AYTS)**, **Completion Probability**, **Expected Completion % (xCOMP)**, **CPOE (Completion % Above Expectation)**. Rushing: **Efficiency (EFF)**, **8+ Defenders in Box (8+D%)**, **Time Behind LOS (TLOS)**. Receiving: **Cushion (CUSH)**, **Separation (SEP)**, **Targeted Air Yards (TAY)**, **% team air-yards share (TAY%)**, **YAC**, **Expected YAC (xYAC)**, **YAC over expected**. Speed: Fastest Ball Carriers (MPH), Longest Plays, Fastest Sacks, Longest Tackles. Data = real-time location/speed/accel for every player, 10×/sec. → all obtainable legally via nflverse (CC-BY 4.0); these are GSE's proprietary-rating raw material.

### PFR robots.txt (retrieved via Nimble after Firecrawl 403'd 3× on the Cloudflare challenge)
- **Bans GPTBot entirely** (`Disallow: /`) — opposite of FantasyPros courting OpenAI; consistent with their anti-AI-training ToS.
- Bans **AhrefsBot, SlySearch** (`Disallow: /`).
- Walls off the DEEPEST per-player data from all crawlers: `/players/*/*/splits`, `/gamelog`, `/passing-plays`, `/rushing-plays`, `/receiving-plays`, `/red-zone-*-plays`, `/fantasy`, `/touchdowns`, `/big-games`, plus `/my/`, search CGIs, `/req/`, `/short/`, `/nocdn/`. No `Sitemap:` declared (no public sitemap).
- Confirms: they protect the granular play-level/splits data a competitor would want, and block AI crawlers — while conceding facts aren't copyrightable.

### FantasyGuru — buried subdomain topology (crt.sh CT logs; existence noted, NOT probed)
admin · **projectx** + **staging.projectx** + **api.staging.projectx** (an unreleased codenamed platform/rebuild "ProjectX") · beta · ci (CI/CD) · **data** (data-platform backend) · db-dev · dev · nocache.dev · fg-test · test-temp · **mag** (FF Magazine) · **myguru** (MyGuru app) · new · old · shop (WordPress) · **staff** (internal portal) · staging · support (Freshdesk). → **ProjectX = FantasyGuru is building a new platform/rebuild** (own API+staging) — a strategic tell they haven't announced.

### FantasyGuru — product surface (core sitemap, 300 URLs) + roster
- Brand umbrella: **"Elite Sports Network" (ESN)**; personality-led. Roster: **Jeff Mans** (headliner/operator), **Ray Flowers**, **Armando Marsal** (since 2010), **Rob Povia** (Managing Editor, baseball), + ~20 sport analysts (NFL/MLB/NHL/NASCAR/PGA/MMA/soccer/UFL/horse-racing); one analyst tied to **SiriusXM**.
- Products: MyGuru (personalization), MLB DFS Optimizer, **data-nfl / data-mlb** (data platform), ADP reports, Best Ball / Dynasty / CFB guides, coaching breakdowns, FF Magazine, annual training-camp guides, /free tier, betting + DFS + seasonal "All-Access" tracks, named columns/podcasts (Clay's Corner, Mind of Marsal, RaceGuru). Multi-sport incl. **esports/esports-dfs, CFL, horse-racing, March Madness**.
- Content scale: 8 post-sitemaps (posts-0..7) — content-heavy.

### FantasyGuru — OWNERSHIP CHAIN + HARD FINANCIALS (sourced from public filings/deal disclosures)
- Entity: **Guru Fantasy Reports Inc. / Guru Fantasy Sports Inc.** Founded ~1995 (John Hansen). Brand umbrella now **"Elite Sports Network" (ESN)**, operated by **Jeff Mans**.
- Ownership lineage: was a **wholly-owned subsidiary of Gaming Nation Inc. (TSX-V: FAN)** (public Canadian co.); later associated with **Ascend Fundraising Solutions** lineage.
- **June 2023: LiveOne's PodcastOne signed a BINDING LOI to acquire 100% of Guru Fantasy Sports for $3.5M all-stock** ($8.00/sh PodcastOne). **Deal did NOT close** (uncompleted as of Aug 14, 2023). Current independent/ESN operation.
- **Hard numbers (from the PodcastOne deal disclosure):** **~24,000 paying subscribers**, **monthly ARPU > $8** (~$96/yr/sub), **~$2.5M annual revenue**, **>$600K EBITDA**, **~$3.5M implied valuation**.
- Corrects prior memory ("PE-owned"): it's a Gaming Nation → attempted-PodcastOne → ESN lineage — a small public-rollup-adjacent niche business, NOT classic PE. The 24k/$2.5M figures are now SOURCED.
- GSE read: FantasyGuru is a **~$3.5M, 24k-sub, personality-content** business with modest EBITDA — beatable head-on by a proven-accuracy product; not a resourced giant. The ProjectX rebuild suggests they know the current platform is aging.

## GSE implications (all three)
1. **Data spine validated + compliance edge:** nflverse (CC-BY 4.0) is the legal way to the NGS/PFR-derived advanced metrics GSE needs to prove accuracy; scores24 has none of this, and competitors scraping PFR are exposed. GSE should attribute nflverse and lean into "licensed, verifiable data" as trust signal.
2. **Beat Jeff Mans / FantasyGuru on proof, not content volume:** FantasyGuru sells personality-led premium content + a new MyGuru personalizer; GSE's edge is a proprietary, calibrated, *proven-win-rate* number — not another draft guide. Match MyGuru's personalization only where it serves accountability.
3. **Pricing intel:** premium fantasy content clears $60–220/yr; FantasyPros $48–108/yr. GSE's monetization can anchor against these with a trust/accuracy premium.
4. **Do NOT copy:** PFR-style scraping of locked sources; paywalled-content lock-in without proof; personality-hype without a track record.
