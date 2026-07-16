# FantasyGuru.com — Competitive-Intelligence Dossier (NFL + MLB focus)

**Compiled:** 2026-07-10 · **For:** Galaxy Sports Edge (Garrett) · **Scope:** public surface only

> **Method & boundary.** Everything here was gathered from FantasyGuru's *public* surface — pages a non-subscriber can see: the sitemap (46,844 article URLs), section/listing pages, tool descriptions + legends, pricing, the analyst roster, public methodology explainers, and the free preview/intro text shown before each paywall. Their site is © Guru Fantasy Reports, Inc.; ranking/projection/DFS/data bodies sit behind a paid login. **Paywalled article and data-grid content was NOT extracted or reproduced** — that would be copyright/paywall circumvention and is the exact "gated, non-public" line to stay behind. What follows is a structural + strategic map, not a copy of their paid product. Their `robots.txt` explicitly allows crawling everything except `/account`, `/api/`, `/join-today`.

---

## 1. What FantasyGuru is (positioning)

- **Brand:** "Fantasy Sports Advice! Providing Expert Analysis, Strategy, and Fantasy Tools to more than **100k members for more than 20 years**." Legal entity **Guru Fantasy Reports, Inc.**, ©1995–2026. Self-describes as "home to the largest community of fantasy sports enthusiasts in the world."
- **Parent ecosystem:** **Elite Sports Network / EliteFantasy**, distributed via **SiriusXM Fantasy Sports Radio — "Elite Sports with Jeff Mans," Channel 87, Mon–Fri 2–5 PM ET.** This radio pipeline is a core distribution moat GSE does not have.
- **The moat is people + community, not just data.** Two named personalities anchor everything: **Jeff Mans (NFL)** and **Ray Flowers (MLB)**. A members-only **24/7 Discord** with "Daily Office Hours with experts" is pushed on every tier. GSE's memory already names "beat Jeff Mans" as a benchmark — this is his home base.
- **Ownership:** Rob Brink = **Owner/CEO**; Jeff Mans = **Owner/Chief Content Officer**; Armando Marsal = Site Manager; Rob Povia = Managing Editor.
- **Sports covered:** NFL, MLB, NBA, NHL, NCAAB, PGA, MMA, Soccer, NASCAR, Horse Racing, CFB, CFL, UFL, WNBA, eSports. (NFL + MLB are the two flagship paid tracks.)

---

## 2. Subscription & pricing architecture (public)

FantasyGuru runs **two overlapping plan systems**:

### A) Per-sport tracks (modular à-la-carte)
**Football** (priced as the flagship — notably expensive):
| Tier | Price | Scope |
|---|---|---|
| Seasonal | $59.99/yr | Draft guide, season rankings, best ball, league sync + waiver, office hours, Discord |
| Daily | $269.99/yr | DFS plays, cheat sheets, optimizer + projections, cash+GPP breakdowns, podcasts |
| Betting | $269.99/yr | Sharp picks, prop research, parlay/alt-line tools, podcasts |
| **All-In** | **$499.99/yr** | Everything above + Elite Data + office hours |
| *Add-on* NFL Training Camp | $39.99/yr | Daily camp reports, risers, depth-chart shifts |
| *Add-on* NFL Franchise Mode | $49.99/yr | Dynasty/keeper: contract values, rookie scouting, trade analysis |

**Baseball** (priced ~40–60% cheaper than football):
| Tier | Price | Scope |
|---|---|---|
| Elite Seasonal | $59.99/yr | Draft guide, rankings, best ball, league sync, office hours, Discord |
| Elite DFS | $119.99/yr | DFS plays, cheat sheets, optimizer, cash+GPP, podcasts |
| Elite Gaming (betting) | $119.99/yr | Sharp picks, prop research, parlay tools, podcasts |
| **All-In (Most Popular)** | **$199.99/yr** | Everything + Elite Data |

### B) Cross-sport "VIP" system
- **VIP Seasonal** $109.99/yr · **VIP DFS** $59.99/mo · **VIP Gaming** $59.99/mo · **VIP Platinum (Most Popular)** $99.99/mo (all three combined + Elite Data)
- **MVP** $219.99/yr — daily + betting for NBA, NCAABB, NHL, MMA, PGA, Soccer, Horse Racing, NASCAR
- **All-Access** $109.99/yr (landing "starting") — everything, all sports, "Unlocked Elite Data," all training camps

### Universal add-ons
- **Elite+** $69.99/yr — members-only podcasts, livestreams, bonus editorial
- **Elite Data** $19.99/mo — **premium props data, ownership projections, live-edge alerts** (this is the standalone that gates SMASH/BURR/props/ownership)

**Pricing takeaways for GSE:**
1. **Football is the profit center** — All-In is $499.99 vs baseball's $199.99 (2.5×). Fantasy football carries the business; baseball is priced to convert/retain.
2. **Data is monetized separately.** "Elite Data" ($19.99/mo) is deliberately unbundled — the props/ownership/edge feed is treated as a premium product, not table stakes. GSE's data-first thesis competes directly with this layer.
3. **Modular upsell ladder.** Splitting Seasonal / DFS / Betting lets them sell single-vertical users cheaply, then upsell. Two naming systems (per-sport + VIP) is actually messy — a clarity opportunity for a competitor.
4. Everything is annual-first with monthly options; "cancel anytime, keep access to period end."

---

## 3. The data/tools layer (their "Elite Data" product)

All data grids are **subscriber-gated**; what's public is the tool name, a suite blurb, and (for SMASH) a color legend. The tool *catalog* itself is the intel:

### MLB Tools suite (`/data/mlb/*`)
Player Statistics · Team Statistics · Schedule · Standings · Injuries · **SMASH Report (Pitchers)** · **SMASH Report (Hitters)** · **Bullpen Usage Chart** · **BURR Report** · **Projected Strikeouts** ("Rob's") · **Projected Total Bases** ("Rob's") · **Projected Odds** ("Rob's") · **MLB Weather** ("Rob's") · **Batter vs Pitcher** · **DFS Projections & Ownership** (DraftKings + FanDuel) · **Prop Finder** · **Odds Comparison** · **Elite MLB Staff Bets**

### NFL Tools suite (`/data/nfl/*`)
Schedule & Results · Standings · **Player Props** · **Odds Comparison** · **Futures Comparison** · **Weekly Matchups** · **Prop Finder** · **SMASH Report (Ratings)** · **SMASH Report (Matchups = O-LINE/D-LINE)** · **SMASH Report (WR Coverage)** · Player/Team Statistics

*(Also live: NBA Delta Force, NBA Totals, NBA Props, NBA Prop Finder; full NHL data suite.)*

### Signature tool methodology (from public explainers — the parts they reveal to sell it)

**SMASH — "The Ultimate Fantasy Tool" / pitched as "the WAR of fantasy baseball"**
- Public definition: *"a proprietary combination of batted-ball data, pitch mix, zone data etc., that shows how a player is performing compared to the league average."*
- **Core philosophy:** *"SMASH focuses on the skills of the player directly, versus the results."* (skills > results — process over outcomes)
- Color scale: **Green = target, White = average, Red = avoid.** Legends per view: "RED – Bad for Hitters/Pitchers, GREEN – Good."
- Two windows: **(S) full season** and **(30) last 30 days.**
- **"Advantage Score":** hitters graded vs the *entire* opposing pitching staff (SP + bullpen); pitchers vs the full opposing lineup.
- Separate proprietary formulas for hitters vs pitchers. NFL SMASH = "From the mind of Jeff Mans," in Ratings / O-line-D-line Matchups / WR Coverage variants. Exact calc gated behind Elite Data.

**BURR — Bullpen Usage & Reliever Ratings** (tracked since 2017)
- Rolls up **14 bullpen categories** (workload/usage, save success, strike/walk rates, batted-ball data) into **one number vs league average.**
- Scale: **< 1.00 (green)** = below-average pen = good for hitters; 1.00 = average; **> 1.00 (red)** = tough for hitters.

**"Solds" (Saves + Holds)** — Ray Flowers' proprietary reliever-value metric, publicly pitched as a replacement for "the standard outdated saves category." Drives the "Closer Grid" and "Solds Rankings."

**Ray Flowers "How to Analyze a Pitcher / a Hitter"** (9th annual) — intros public ("skills > results," ~5,000-word "blueprint"; pitcher edition weighs workload: IP jump, pitch counts, age, late-season shutdowns), framework paywalled.

---

## 4. NFL content franchises (recurring series)

Ranked by volume in the sitemap. All bodies paywalled unless noted; cadence/author are public.

| Franchise | Cadence | Author(s) | What it is | Volume |
|---|---|---|---|---|
| **Practice Reports** | Weekly (Wk 1–18) | Justin Fensterman | In-season practice participation → fantasy read | **1,568** |
| **NFL DFS Breakdowns** | Weekly/slate | Armando, Buecher, Hogan, Pucks | Slate breakdowns, cash+GPP | **1,236** |
| **QB Types / "By the Numbers"** | Annual + updates | Mike Horn, Ray Flowers | QB-mobility scoring thesis; positional statistical retrospectives | 216 |
| **Rookie Profiles / Expectations** | Pre-draft, multi/wk | Clay, Buecher, Marsal | Draft-class prospect profiles + rookie projections | 178 |
| **Dynasty (Ratings Updates)** | Weekly–biweekly | Russell Clay | Rolling dynasty player ratings | 104 |
| **Player Profiles (NFL)** | Pre-draft window | Buecher, Clay, Marsal | Deep player breakdowns | 80 |
| **Coach Breakdowns** | Annual, all 32 | Rob Povia (since 2005) + Mike Horn charts | HC/coordinator system → player-production impact | 66 |
| **Best Ball / Drafters** | Seasonal (summer) | Buecher, Marsal, Clay | Best-ball rankings, ADP risers/fallers, stacking | 38 |
| **Targets & Touches** | Weekly | Russell Clay | Opportunity/usage tracking | 34 |
| **Waiver Wire** | Weekly | Tyler Buecher | Pickup recommendations | 33 |
| **Training Camp Reports** | Weekly (Jul–Sep) | Clay, Buecher, Fensterman, Marsal, Maletto | Camp risers, depth-chart shifts ($39.99 add-on) | 31 |
| **Offensive Line Breakdown** | Annual | Armando Marsal + Ted Schuster | Every NFL O-line graded (has audio) | 10 |
| **ADP Reports** | Weekly (summer) | Tyler Buecher | ADP market reports by platform (FFPC/NFFC/DRAFT/Underdog) | — |
| **Mock Drafts** | Annual (June) | Clay, Ray Flowers, Maletto | Staff 12-team PPR mocks w/ Q&A | 5 |
| **Franchise Mode** | Weekly | Clay, Buecher, Mans, Backert | Dynasty/keeper: contracts, rookie scouting, trades ($49.99 add-on) | — |
| **NFL Roster Coach** (live) | Weekly, 7 PM ET | Marsal, Clay, Buecher, Maletto | Livestream seasonal help | — |
| Clay's Corner / Tyler's Thoughts | Irregular columns | Clay / Buecher | Analyst opinion columns | — |

**2026 NFL Draft Guide** (built Jun 1–Aug 5, incrementally): Rankings (PPR, Non-PPR, IDP, Superflex, Top 200, Dynasty) · Player Outlooks (QB/RB/WR/TE) · QB Bye-Week Cheat Sheet · Early Mock · Scoring Dependency · NFL Optimizer · Auction/Betting Guides. Authors: Mans, Backert, Clay, Buecher, Marsal, Maletto, Flowers.

**"By the Numbers" method (public):** *"You can't look forward until you look backwards"* — reviews prior-season stats, then factors coaching changes, free agency, and draft impact. **QB-types thesis (public):** classifies projected starters as "Very Mobile / Running," on the premise that running QBs score more — a stated **+2–4 fantasy points/game edge.**

---

## 5. MLB content franchises (recurring series)

| Franchise | Cadence | Author(s) | What it is | Volume |
|---|---|---|---|---|
| **MLB DFS Breakdowns** (DK + FD) | Daily | Chris Rose, Jorge Pucks, staff | Slate breakdowns, bats/pitchers to target, cash+GPP | **290** |
| **MLB Umpire Report — "[Day]'s Strike Zone"** | Daily (game-day) | "Patio" Joe Baldino (patiojoeref) | Best plays via home-plate ump tendencies | **167** |
| **Ray's Plays** | Daily | Ray Flowers | DFS "plays of the day," all positions/pitchers/matchups | 131 |
| **Ray's Ramblings** | Multi/week | Ray Flowers | Analysis column (workload, expected performance, trends) | 94 |
| **MLB Bullpens / Closer Grid / Solds** | Closer Grid ~biweekly; Solds monthly | Ray Flowers | Reliever/closer value via "Solds" (Saves+Holds) | 14+ |
| **FAAB Values** | Weekly (by week #) | Ray Flowers | Free-agent auction bid values | 51 |
| **MLB Planner** | Weekly (by week #) | Ray Flowers | Week-ahead pitching-schedule planner | 49 |
| **MLB Cheat Sheet** | Per slate/daily | Jorge Pucks | Consolidated DFS cheat sheet | — |
| **MLB Rankings / ADP** | Monthly (~1st) | Ray Flowers | Season-long rankings + ADP | — |
| **MLB Player Profiles** | Preseason, multi/wk | staff | Player deep-dives | — |
| **MLB Weekly Preview** | Weekly | staff | Week-ahead lineup configuration | — |
| **MLB Battle of the Experts** | Daily | Elfrink, Povia, Clifford, Bondar, Rose, Marsal, Buecher | Competitive picks show | — |
| **MLB Draft/Roster Management** | Preseason (Feb–Mar) | staff | Draft Book (annual), roster strategy | — |
| **MLB Podcasts** (Fantasy Sports Daily) | Mon–Fri 12 PM ET | Ray Flowers, Fensterman | Daily ~1hr show | — |

**Umpire Report method (public, unusually transparent):** *"I identify the best plays of the day for DFS, seasonal, and now strikeout props based on who is working home plate that day… focusing on home-plate umpire tendencies, current strikeout props, and team strikeout rates against right-handed and left-handed pitching."* **Data-source note:** they **dropped Swish Analytics** in 2026 ("no longer provides the stats I once used") and rebuilt around ump tendencies + K props + team K-rates by handedness. *(This is a live example of a competitor scrambling after losing a data vendor — a wedge if GSE has a durable ump/strike-zone source.)*

**MLB DFS strategy (public):** bankroll 5–15% per slate (5% early season until trends settle); contest split — Cash (Double-Up/Triple-Up/H2H) vs GPP (Single-Entry/3-Max). Highest-total, fastest-pace games favored for stacks (e.g., implied totals ≥ 57.5 referenced in an NFL preview).

---

## 6. Analyst roster (26 — the human moat)

**Owners/leads:** Jeff Mans (Owner/CCO, "Fantasy Legend," SiriusXM host) · Ray Flowers (Owner-adjacent "Lead/Senior Analyst," EVP EliteFantasy, full-time since 2001, multi-FSWA, MLB face) · Rob Brink (Owner/CEO, "MLB Guru").
**Editors/managers:** Armando Marsal (Site Mgr, 2020 FSWA Football Writer of Year) · Rob Povia (Managing Editor, baseball; writes Coach Breakdowns) · Ted Schuster (Senior).
**Core analysts:** Tyler Buecher (analytics; ADP/best ball/waivers) · Russell Clay (dynasty since 2012; rookies/profiles) · Mike Horn (NFL; coach-breakdown charts + QB-types; kicker specialist) · Phil Backert (IDP) · Rich "Bo" Maletto (NFL/NASCAR) · "Patio" Joe Baldino (MLB umpire reports) · Justin Fensterman (NBA "Fensty's Basketball Diaries"; NFL practice reports) · Chris Rose, Scott Bondar (MLB/NFL) · Ryan Clifford, Jorge Pucks, Nick Rodriguez (NHL) · Bill Reinhard, Mark Hogan, Surge Singh, Mike "The Beard" Cillo (NFL) · Tyler Rodrigue (PGA/MMA) · Ani Sridhar (Soccer) · Sean Engel (NASCAR) · Slappy White (Horse Racing).

---

## 7. Content volume & inventory (full public sitemap)

- **46,844 total article URLs** (1995–2026) across 8 post-sitemaps.
- Keyword-classified: **NFL ≈ 4,081**, **MLB ≈ 1,128**, MMA 1,479, NBA 589, NHL 424, NASCAR 186, CFB 172; ~38,700 legacy/news/player-name posts unclassified by keyword (mostly the "NewsGuru" daily wire — e.g., hundreds of single-player injury/status blurbs).
- Full inventory saved: `inventory-master.csv` (all 46,844 w/ slug, lastmod, sport, franchise), `inventory-nfl.csv`, `inventory-mlb.csv`.
- **Publishing engine is high-cadence:** near-daily MLB (DFS breakdown, Ray's Plays, umpire report) + weekly NFL machine (practice reports, targets, waivers, dynasty) + a continuous news wire. This volume is a staffing moat as much as a data one.

---

## 8. Strategic read for Galaxy Sports Edge

**Where they're strong (respect, don't ignore):**
- Personality + radio distribution (Jeff Mans/Ray Flowers on SiriusXM) and a 24/7 Discord community — a relationship moat, not a data moat.
- A named, "sticky" tool vocabulary (SMASH, BURR, Solds, QB-types) that members learn and trust. Branding the *number* matters — mirrors GSE's own "proprietary GSE Rating" mandate.
- Enormous, high-cadence human content engine (46k+ articles, near-daily coverage).

**Where they're beatable (GSE wedges):**
1. **"Skills > results" is their stated edge — but it's opaque.** SMASH/BURR are sold as black boxes ("proprietary," calc gated). GSE's glass-box / cited-Tier-A vs internal-Tier-B thesis and calibration/receipts approach is a direct counter-positioning: *show* the reasoning they hide.
2. **Data is unbundled and pricey** ($19.99/mo Elite Data on top of a $199–500 plan). A trust-first product that includes transparent, calibrated data undercuts the "pay again for the numbers" model.
3. **They just lost a data vendor** (Swish Analytics for umpire/strike-zone). If GSE has durable ump/strike-zone/pitch-data sourcing, the umpire-edge product is contestable right now.
4. **Two overlapping plan systems (per-sport + VIP) are confusing.** A clean, single-ladder pricing story is a differentiator.
5. **Football priced at $499 All-In** leaves room for a credible, cheaper, provably-accurate alternative — *if* GSE proves win-rate (their ≥70% north-star), which FG never publishes.
6. **Accountability gap:** FG publishes picks but not a public, audited hit-rate. GSE's "prove-it, don't-fake-it" calibration + Decision Autopsy/Airwave accountability angle attacks exactly the trust vacuum FG leaves open.

**Franchises worth studying as product templates (all legal to emulate as *formats*, not copy):** Coach Breakdowns (system→player impact), Offensive Line Breakdown, Umpire/Strike-Zone report, SMASH-style matchup heatmap, BURR bullpen index, Solds reliever metric, QB-types mobility model, Targets & Touches usage tracker, Practice Reports, Closer Grid, FAAB Values, MLB Planner.

---

## 9. Files in this dossier package
- `FANTASYGURU-DOSSIER.md` — this report
- `inventory-master.csv` — all 46,844 public URLs (slug, lastmod, sport, franchise)
- `inventory-nfl.csv` / `inventory-mlb.csv` — sport-filtered, newest first
- `inventory-summary.json` — counts by sport & franchise
- `browser-captures.md` — full-fidelity roster + pricing captures
- `content-previews-and-tools.md` — tool menus + public methodology + franchise preview intros
- `workflow-digest.md` — structured per-page harvest of 81 public pages
- `sitemap-*.xml` — raw public sitemaps (source data)

*All content herein derived from FantasyGuru's public surface. Paywalled bodies were not accessed or reproduced.*
