# GSE Competitive Intelligence — Master Brief

**Owner:** Garrett (Galaxy Sports Edge / GSE) · **Compiled:** 2026-07-10/11 · **Status:** living handoff doc

> **Purpose.** This is the single source of truth for the FantasyGuru + FantasyPros competitive teardowns and the GSE analytics engines built from them. It is written to be **picked up cold by a new Claude Code session** (or read on GitHub). Everything needed to continue is here; the `fantasyguru/` and `fantasypros/` subfolders hold the supporting dossiers, notes, code, and data.

---

## 0. How a fresh session should use this doc
1. Read §1 (context) + §2 (operating doctrine) first — the doctrine is non-negotiable.
2. Read §3 (environment/data access) before running or re-pulling anything — there are real gotchas (TLS, python path).
3. §4–5 are the two competitor teardowns; §6 is the engines built (with run instructions + validation); §7 is methodology; §8 is the next builds; §9 is the file manifest; §10 the memory pointers.
4. GSE product context lives in the user's Claude memory (`project-gse-*`, `feedback-gse-*`). This brief is competitor-facing; the memory is product-facing.

---

## 1. Context — who and why
- **Garrett** is the solo founder of **Galaxy Sports Edge (GSE)** — a *trust-first sports-prediction* product (live at galaxysportsedge.com). Core theses: **a proprietary, glass-box "GSE Rating"**; **prove accuracy, don't fake it** (≥70% win-rate north star, publicly back-tested); **human-built process, AI-as-honest-tool**; explicitly **"beat Jeff Mans"** (FantasyGuru's face).
- This work is **competitive intelligence + capability building**: understand the two biggest incumbents in fantasy-sports advice, then **build GSE's own superior, transparent versions** of their signature products from free public data.
- **Two targets:** **FantasyGuru** (personality/subscription, Jeff Mans/Ray Flowers) and **FantasyPros** (aggregation/SEO scale, ECR).

## 2. Operating doctrine (the legal boundary — HOLD THIS)
Garrett's directive is *aggressive but legal* — "find the back doors we can legally drive through," never "no."
**What we DO:** public surface only; the sites' own `llms.txt` + `robots.txt` + sitemaps; public response headers/HTML/JS; public search; Wayback Machine; free public sports-data APIs. Reverse-engineer **methods** (uncopyrightable — 17 U.S.C. §102(b)) and rebuild them ourselves from free data (output = GSE-owned IP).
**What we NEVER do (protects GSE from real liability):** breach auth/paywalls; hit robots-disallowed endpoints (`/api/ /json/ /ajax/ /ranker/`); reproduce their copyrighted *compilations* (ranking/consensus/projection data tables); actively probe gated/staging infra (this drew a real security flag in a prior session — passive-only). Methods & facts are fair game; their compiled output is not.
This isn't timidity — copying paywalled data into GSE would poison the product legally. The aggression goes into **legal depth** (Wayback, third-party wrappers, free-data engines), not illegal breach.

## 3. Environment & data access (gotchas that will bite a fresh session)
- **OS:** Windows; working dir was `C:\Users\Garrett\.claude\GHuman`. Scratch outputs were under the session scratchpad; **the durable copy is this folder** `C:\Users\Garrett\GSE-competitive-intel\`.
- **TLS-intercepted network:** `curl` must use **`--ssl-no-revoke`** or it fails with a schannel revocation error. (Node needs `--use-system-ca`; that's in memory `infra-windows-node-system-ca`.)
- **Python:** use the full path **`/c/Users/Garrett/AppData/Local/Programs/Python/Python311/python`** (the `python3` alias is a broken Windows Store shim). pandas 3.0.3 + numpy 2.4.6 are installed. **pybaseball is NOT installed** — and Python `requests` hits the TLS-intercept SSL wall, so **pull data with `curl --ssl-no-revoke` to disk, then read with pandas** (this pattern works reliably).
- **Free data sources used (all public, no auth):**
  - **MLB Stats API** — `https://statsapi.mlb.com/api/v1/...` (e.g. `/stats?stats=season&group=pitching&season=2026&gameType=R&playerPool=All&limit=2000&hydrate=team`; `/people/{id}/stats?stats=statSplits&group=hitting&sitCodes=vl,vr&season=2026`). Free, no Cloudflare.
  - **Baseball Savant (Statcast)** — `https://baseballsavant.mlb.com/leaderboard/expected_statistics?type=batter&year=2026&min=50&csv=true` and `/leaderboard/custom?...&selections=xwoba,barrel_batted_rate,hard_hit_percent,k_percent,bb_percent,whiff_percent&csv=true`. NOTE: the `split=vl/vr` param **silently returns identical data** (broken) — use MLB Stats API `statSplits` for platoon; the park-factor `csv=true` endpoint **returns HTML** — use its JSON leaderboard.
  - **nflverse** — `https://github.com/nflverse/nflverse-data/releases/download/<tag>/<file>`: `stats_player/stats_player_reg_2025.csv`, `pfr_advstats/advstats_season_{pass,rush,rec,def}.csv` (all-seasons; filter `season==2025`), `pbp/play_by_play_2025.csv` (~98MB; use `--max-time 180` + `usecols`), `rosters/roster_2025.csv`, `snap_counts/snap_counts_2025.csv`. Exact tag names matter (they 404 otherwise).
- **Tools present:** Firecrawl CLI (no credits). tvly/nimble not installed. Workflow tool exists but **the deep-net background workflows stalled/died twice** here — prefer direct curl/WebFetch for reliability in this environment.
- **Current season context at capture:** MLB 2026 mid-season (opened 2026-03-25); NFL uses 2025 (complete) since 2026 season starts Sep 2026.

---

## 4. TARGET 1 — FantasyGuru.com (full teardown)
*Full dossier: `fantasyguru/FANTASYGURU-DOSSIER.md` + `DEEP-INTEL-ADDENDUM.md`. Visual: `fantasyguru/dossier.html`.*

**What it is:** a personality-and-community subscription business. Signature = expert *voice* (Jeff Mans NFL, Ray Flowers MLB) + a 24/7 Discord + SiriusXM distribution. "100k+ members, 20+ years." © Guru Fantasy Reports, Inc. 1995–2026.

**Corporate lineage (high confidence):** Founded **1995 by John Hansen** (Guru Report Newsletter). **2015** Hansen sold → rolled into **Gaming Nation Inc.** (TSX-V: FAN). **2017 Orange Capital Ventures took Gaming Nation private (~$44M all-stock)** → FantasyGuru is a **PE portfolio company**. **~2019** Hansen left; **Jeff Mans** became operator/part-owner/Chief Content Officer; **Rob Brink CEO since 2018**. **June 2023** LiveOne/PodcastOne signed a binding LOI (~$4–6.4M, all-stock) — completion unconfirmed. Umbrella brand **EliteFantasy.com**; SiriusXM "Elite Sports with Jeff Mans," Ch. 87.

**Business scale (2023 PodcastOne disclosure + public signals):** **~24,000 paying subs, ARPU >$8/mo, ~$2.5M revenue, ~$600K EBITDA.** Traffic ~11–38K visits/mo (Similarweb, ~76% direct = loyalty not SEO). iOS app 4.7★/~2.2K (a WebView wrapper); **Android app pulled Apr 2025**. → **A ~$2.5M, ~24k-sub, PE-owned media business. Beatable size; product/engineering is not where they invest.**

**Tech (passive fingerprint):** headless **WordPress + WooCommerce merch** (at `shop.fantasyguru.com`, which also serves media) → **Next.js** frontend → **DigitalOcean App Platform** → **Cloudflare**. GTM analytics; ESPN CDN for player images. A media company with tools bolted on, not a modeling company.

**Content footprint:** **46,844 public URLs** (sitemap). **~10,097 (21.6%) are an automated player-news wire**, overwhelmingly NFL. **NFL out-publishes MLB ~10–15×** (NFL 3,000–3,700 posts/mo Sep–Jan; MLB ~80/mo peak). **MLB is the soft flank** — nearly all on Ray Flowers. (Caveat: sitemap `lastmod` clusters 2024–25 from a WP→Next migration re-stamp; trust the seasonal *shape*, not yearly totals.)

**Pricing (à-la-carte, football = profit center):** Football **Seasonal $59.99 / Daily $269.99 / Betting $269.99 / All-In $499.99**; Baseball **Elite Seasonal $59.99 / DFS $119.99 / Gaming $119.99 / All-In $199.99**; add-ons **Training Camp $39.99, Franchise Mode $49.99, Elite+ $69.99/yr, Elite Data $19.99/mo**; cross-sport **MVP $219.99, All-Access $109.99, VIP Platinum $99.99/mo**. Football All-In ($499) is 2.5× baseball. **"Elite Data" is unbundled** — members pay again for the numbers.

**Roster (26):** Jeff Mans (owner/CCO), Ray Flowers (MLB lead, EVP EliteFantasy, since 2001), Rob Brink (CEO), Armando Marsal (Site Mgr), Rob Povia (Managing Ed, coach breakdowns), Mike Horn (coach-breakdown charts + QB-types), Russell Clay (dynasty), Tyler Buecher (analytics), "Patio" Joe Baldino (umpire reports), + others.

**Signature tools & public methodology (rebuilt in §6):**
- **SMASH** — "proprietary combination of batted-ball data, pitch mix, zone data vs league average," **"skills over results."** Green=target/White=avg/Red=avoid; (S)eason + last-(30) windows; "Advantage Score" = hitter vs the *entire* opposing staff. NFL SMASH = Ratings / O-line-D-line Matchups / WR-Coverage ("from the mind of Jeff Mans").
- **BURR** — Bullpen Usage & Reliever Ratings: **14 bullpen categories → one number vs league average** (<1.00 green = weak pen/good for hitters). Since 2017.
- **Solds** — Ray Flowers' **Saves + Holds** reliever metric ("replace outdated saves").
- **Umpire Report** — daily; method stated publicly: **home-plate ump tendencies + current K props + team K-rates vs RHP/LHP**. NOTE: they **dropped Swish Analytics** as a vendor in 2026 (rebuilt around ump tendencies) — a live vendor-churn opening in the exact MLB vertical that is their soft flank.
- **QB Types** — Mike Horn: mobile QBs score more, claimed **+2–4 fantasy PPG** (we verified +5.0, see §6).
- **Coach Breakdowns** — annual, all 32 teams, since 2005 (Povia + Horn charts). 2026 edition **not published yet** as of 2026-07-10 (2025 set posted July 11, 2025).

**Strategic read for GSE:** attack the black box (glass-box counter), publish an **audited win-rate** (they never do), exploit the **Swish vendor gap** in MLB, undercut the pay-again data tax. Respect their radio/Discord relationship moat.

---

## 5. TARGET 2 — FantasyPros.com (full teardown)
*Full dossier: `fantasypros/FANTASYPROS-DOSSIER.md`. Deep notes: `fp-zscore-deepdive.md`, `fp-accuracy-loopholes.md`, `fp-methodology-extras.md`, `fingerprint-and-scale.md`. Visual: `fantasypros/dossier.html`.*

**What it is — an aggregator + SEO machine, NOT a modeler.** Signature = **ECR (Expert Consensus Rankings)**, a blend of ~90–100+ experts from 100+ outlets. **Zero first-party predictive signal** (see the smoking gun below). Everything else is tooling around the consensus + league-sync.

**Corporate:** **Marzen Media LLC** (Las Vegas), also owns **BettingPros.com**. **Founded 2010 by David Kim (CEO) + Tom Nguyen** — both ex-**Hotwire** (marketing/analytics; not sports scientists → SEO DNA). **Bootstrapped, no VC/PE.** ~**$5–10M revenue, 10–19 employees**. Tuck-ins: **Pickemfirst (2013), Sports Injury Alert (2015)**. Claims **38M annual visitors**.

**The programmatic-SEO engine (explains 38M visits):** sitemap index = **231 child sitemaps (120 MLB, 87 NFL)**; **one** child sitemap (NFL QB "start") = **21,063 URLs**; est. **~3–4 MILLION auto-generated doorway pages** ("should I start [player] wk N," per player × action × format) vs **~42 editorial articles**. Traffic is manufactured at template scale by <20 people.

**Tech:** Apache/**PHP monolith** on **AWS CloudFront**; **Mixpanel + GA + GTM** (instrumented/experiment-driven — more mature than FG); OneTrust consent; deep **Sleeper** league-sync.

**Pricing (cheap freemium):** **PRO $3.99–11.99/mo, MVP $5.99–16.99/mo, HOF $8.99–22.99/mo**, all sports bundled. Consensus rankings + accuracy leaderboards are **free**; personalization, live draft sync, and DFS (HOF: Optimizer/Projections/ROI + Coach AI) are the wall.

**ECR method:** a **Borda-count "Rank Points"** system (each rank → points, summed per player) — deliberately *not* a simple average (avoids arbitrary unranked-player ranks). Exposes Best/Worst/AVG/StdDev + ADP + "vs. ADP." A "Pick Experts" control recomputes from a subset.

**Expert Accuracy — the credibility engine (fully reverse-engineered, verified live + Wayback-2018):** Three tracks: **Draft (preseason)**, **In-Season (weekly)**, **Rest-of-Season**.
- **In-Season:** rank slot → expected pts (historical avg for slot) → **|expected − actual| = Accuracy Gap** (error). Player pool = **union** of top-N by ECR and top-N by actual. Weekly gaps → **z-scores vs the field** → **drop each expert's worst-z week** (after Wk 8) → sum Wks 1–17. Half-PPR. 150+ experts.
- **Draft/preseason:** a **WEIGHTED** Accuracy Gap — multiplier **1.0→0.5 keyed to preseason ECR** (premium range ~top 18 QB / 72 RB / 84 WR = 1.0; deep = 0.5; linear between). **Circular:** grades experts using the experts' own consensus as the yardstick.
- **MLB:** 5×5 roto; inputs ECR, VBR rank, VORP.

**Six exploitable loopholes (full detail in `fp-accuracy-loopholes.md`):** (1) rank→generic-curve ignores conviction; (2) **drop-worst-z launders each expert's biggest blowup** while z caps upside → rewards chalk-huggers, biasing ECR; (3) omission penalty capped at ~ECR+1 not actual finish (deep-sleeper omission underpunished); (4) snapshot timing = free accuracy; (5) chalk-week z-noise; **(6, deepest) z is RELATIVE not absolute — consensus-wide error is undetectable/unpenalized** (being wrong with everyone is free — exactly what a differentiated model catches). Skeleton unchanged since ≥2018.

**THE SMOKING GUN — aggregation all the way down:** even their *own* projections are averages of others. **Zeile** (their consensus projection) is **a straight-up average of the other projection systems** — and it **won their own 2025 baseball projection-accuracy study** (crowd mean beat every individual modeler). **ATC** = an accuracy-*weighted* average of others (ATC beating Zeile validates GSE's accuracy-weighted-consensus thesis with their own data). The real predictive models they blend (Derek Carty's THE BAT, etc.) are **third parties'**. → **FantasyPros manufactures zero first-party prediction.**

**Tools:** Draft Wizard (mock sim, live lobby vs real opponents, draft assistant, analyzer, cheat-sheet creator, salary-cap sim/calc), My Playbook (Start/Sit, Who-Should-I-Start, Trade Analyzer/Finder, Waiver Assistant, League Analyzer), Strength of Schedule, Depth Charts, **MLB Closer Depth Chart**, Gameday Live, DFS optimizer/ROI, Coach AI.

**Strategic read for GSE:** beat consensus where it's blind (seam 6); publish an **honest, calibrated accuracy leaderboard** (proper scoring rule, absolute + relative, no dropped week, coverage-adjusted) — directly undercuts their core credibility asset; **own the number** (they sell the field's opinion, GSE sells its own with receipts). They're bootstrapped/thin and won't out-R&D a funded modeling effort.

---

## 6. THE GSE ENGINES BUILT (clean-room, from free public data)
All validated on live/recent data, face-valid, **IP GSE owns**. Full methodology: `fantasyguru/METHODOLOGY-SMASH-BURR-SOLDS.md`. Run: `python <engine>.py` (use the full python path from §3; data pulls via `curl --ssl-no-revoke`).

### MLB — `fantasyguru/gse_engine.py` (MLB Stats API + Baseball Savant, 2026)
- **GSE-Solds → Reliever Value Score** (`solds_table.csv`, 311 relievers): Saves+Holds baseline, improved with leverage-weighting + blown-save penalty + role. *Improves on FG's flat Solds.*
- **GSE-BURR** (`burr_table.csv`, 30 bullpens): 14 categories (ERA, FIP, K%, BB%, K-BB%, HR/9, WHIP, LOB%, save conv, inherited-stranded, etc.) each normalized to league avg → one index (<1.00 = weak pen, good for hitters), **with the 14 components exposed** (glass-box vs FG's sealed number).
- **GSE-SMASH** (`smash_hitters.csv` 463 / `smash_pitchers.csv` 337): expected-stats skill index (xwOBA, barrel%, hard-hit%, K/BB, whiff) z-scored, green/red tiers, **Log5 Advantage Score** (hitter vs opposing staff). *Rebuilds SMASH's "skills over results."*
- Validation: elite closers top RVS; ATL/NYY-type pens top BURR; Alvarez/Soto-tier top SMASH.

### NFL — `fantasyguru/nfl_engine.py` (nflverse 2025 stats + PFR advanced)
- **QB-Types** (`qb_types.csv`, 45 QBs): classify by rush rate → **VERIFIED +5.0 FP/G mobility premium** (Very Mobile 18.2 vs Pocket 13.2; FG claims +2–4). Allen/Hurts/Maye top; Stafford/Goff elite-pocket exceptions.
- **Trench SMASH** (`trench_smash.csv`, 32 teams): O-line (pressure%/sack/pocket-time/run-block) vs D-line pass-rush indices. Rams/Broncos/Bills top O-lines; Denver/Seattle top pass rush.
- **WR SMASH** (`wr_smash.csv`, 160): receiving skill index (rec-yds/g, target share, aDOT, YAC, brk-tkl, rating-when-targeted, EPA). Nacua/JSN/Pickens top.

### NFL — `fantasyguru/nfl_scheme_defense.py` (nflverse 2025 play-by-play)
- **Coaching/Scheme engine** (`scheme_coaching.csv`, 32) — the **Coaching-Breakdown analog** (which FG hasn't even published for 2026): pace, **PROE** (pass-rate-over-expected), red-zone lean, RB bellcow-vs-committee, WR1 funnel, auto-labeled. KC/ARI/Rams pass-happiest; BAL/NYJ run-heavy bellcow.
- **Team Defense** (`team_defense.csv`, 32) — pass-D + rush-D + coverage + pass-rush indices (completes SMASH matchup pairs). Seattle #1 overall + run-D.
- **Rolling windows** (`rolling_form.csv`, 32) — season vs last-4-weeks recency (BAL PROE −8.2 season → −18.8 L4W). *Bug fixed: regular-season-only so all 32 teams covered.*

### Enhancements
- **Platoon:** wired via MLB Stats API `statSplits` (Savant split param is broken). Multiply Advantage Score by `OPS_vs_hand / OPS_overall`.
- **Park factors:** identified (Savant JSON leaderboard); not yet wired (csv endpoint returns HTML).

---

## 7. Methodology reconstructions (the reverse-engineered "science")
- **FantasyGuru SMASH/BURR/Solds + NFL analogs:** full formulas, inputs, normalization, weighting, GSE glass-box improvements → `fantasyguru/METHODOLOGY-SMASH-BURR-SOLDS.md` (includes NFL QB-types/trench/WR + coaching-scheme/defense/rolling + platoon/park sections).
- **FantasyPros z-score accuracy:** the aggregation pipeline, the four z-score biases, the 2018→2025 evolution diff → `fantasypros/fp-zscore-deepdive.md`. The six loopholes → `fp-accuracy-loopholes.md`. Weighted-gap + Zeile/ATC + ECR-Borda + 3 tracks → `fp-methodology-extras.md`.

## 8. Next builds (prioritized, all legal, all from free data)
1. **GSE Honest Accuracy Leaderboard + accuracy-weighted consensus** (the marquee counter to FantasyPros): proper scoring rule (Brier/log-loss on calibrated projections/win-probs), **absolute + relative** (catches seam 6), **no dropped week**, **coverage-adjusted**; then weight the consensus by calibration-verified accuracy. Extends the 2026-07-07 consensus-accuracy engine (branch `claude/consensus-accuracy-engine`, worktree `Sports-consensus-accuracy-engine`). *Their own data (ATC>Zeile) says this is the right direction.*
2. **MLB rolling-30 SMASH** — date-ranged Savant pulls (same mechanic as the NFL rolling windows).
3. **Park factors wire-in** (Savant JSON) + finalize platoon-adjusted Advantage Score.
4. **NFL coverage-side/rush-D refinements** + weekly windows in-season (2026).
5. **Integrate as founder-gated modules inside GSE** — deploy is Garrett's call (founder-gated per memory). Do NOT flip live switches.

## 9. File manifest
**Root:** `README.md` (this brief).
**`fantasyguru/`** — `FANTASYGURU-DOSSIER.md`, `DEEP-INTEL-ADDENDUM.md` (corporate/scale/authors), `METHODOLOGY-SMASH-BURR-SOLDS.md`, `dossier.html` (artifact), `browser-captures.md`, `content-previews-and-tools.md`, `workflow-digest.md`; engines `gse_engine.py`, `nfl_engine.py`, `nfl_scheme_defense.py` + helpers `parse_sitemaps.py`, `analytics.py`, `digest_workflow.py`; outputs `solds_table.csv`, `burr_table.csv`, `smash_hitters.csv`, `smash_pitchers.csv`, `qb_types.csv`, `trench_smash.csv`, `wr_smash.csv`, `scheme_coaching.csv`, `team_defense.csv`, `rolling_form.csv`; inventories `inventory-master.csv` (46,844), `inventory-nfl.csv` (4,081), `inventory-mlb.csv` (1,128), `inventory-summary.json`.
**`fantasypros/`** — `FANTASYPROS-DOSSIER.md`, `fp-zscore-deepdive.md`, `fp-accuracy-loopholes.md`, `fp-methodology-extras.md`, `fingerprint-and-scale.md`, `dossier.html` (artifact), `workflow-digest.md`, `inventory-navlinks.txt` (487 product URLs), `llms.txt`, `robots.txt`, sitemaps.
*(Re-downloadable raw data — nflverse pbp 98MB, giant HTML dumps — intentionally omitted; re-pull per §3.)*
**Published artifacts (claude.ai, private to Garrett):** FantasyGuru dossier `…/artifact/f64e9776-28b2-4e0a-85a7-916225cb1f8a`; FantasyPros dossier `…/artifact/4918f223-d96f-44d6-8350-ae46835265a9`.

## 10. Related Claude memory (product-side context, persists across sessions)
`project-gse-fantasyguru-teardown`, `project-gse-fantasypros-teardown` (this work); `project-gse-consensus-accuracy-engine` (the 07-07 FantasyPros engine); `feedback-osint-passive-only`, `feedback-no-autonomous-money-or-destruction`, `feedback-founder-autonomy-handoff` (doctrine); `project-gse-intelligence-program`, `project-gse-proprietary-rating-mandate` (product north stars); `infra-windows-node-system-ca` (TLS gotcha).

---
*Compiled from public-surface + passive OSINT only. No paywalled or robots-disallowed content was accessed; no competitor ranking/consensus/projection data was reproduced. All engine inputs are free public data (MLB Stats API, Baseball Savant, nflverse); all engine output is GSE-owned IP.*
