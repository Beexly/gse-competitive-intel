# FantasyPros.com — Competitive-Intelligence Dossier

**Compiled:** 2026-07-10 · **For:** Galaxy Sports Edge (Garrett) · **Scope:** public surface + passive OSINT only

> **Boundary held throughout.** Public pages, the site's own `llms.txt` and sitemaps, public headers/HTML, public search, and the Wayback Machine only. Nothing behind login/paywall; nothing under the robots-disallowed `/api/`, `/json/`, `/ajax/`, `/ranker/` paths; no reproduction of their ECR/consensus data tables (their proprietary compilation). Methods and statistics aren't copyrightable — so this documents *how their systems work* and builds our own, without taking their output.

---

## 1. What FantasyPros is — an aggregator and SEO machine, not a modeler

FantasyPros' entire product is **other people's opinions, averaged, and distributed at enormous scale.** Its signature is **ECR (Expert Consensus Rankings)** — a blend of ~90–100+ experts across 100+ outlets (Yahoo, CBS, FanGraphs, Fox, 4for4, NBC, USA Today, etc.). It has **no first-party predictive signal**: ECR is a mean of the field, and the "Expert Accuracy" leaderboard that legitimizes it is a grading layer on top. Everything else — projections, Draft Wizard, My Playbook, DFS optimizer — is tooling wrapped around the consensus and league-sync integrations.

**Aggregation all the way down (the smoking gun):** even their *own* projection products are averages of other people's work. **Zeile** — their consensus projection — is by their own description a **straight-up average of the other projection systems**, and it *won their own 2025 baseball projection-accuracy study* (the crowd mean beat every individual modeler). **ATC** is an accuracy-*weighted* average of others. The genuinely-original engines they blend (Derek Carty's THE BAT, etc.) are **third parties'**. ECR averages rankings (via a Borda-count "Rank Points" scheme); Zeile averages projections. **FantasyPros manufactures zero first-party prediction.**

**This is the strategic crux for GSE:** you can't out-aggregate them (they already have the field) and you can't out-SEO them cheaply (see §3). You beat them on the one thing consensus structurally cannot produce — **a differentiated, calibrated, provable prediction.** FantasyPros literally cannot detect when the whole expert field is wrong (see §7 seam 6); a real model can. Bonus: their own data proves the direction — Zeile (plain average) beating experts shows the vacuum a real model fills, and ATC (accuracy-weighted average) beating Zeile validates GSE's accuracy-weighted-consensus engine.

---

## 2. Corporate reality

- **Founded 2010 by David Kim (CEO) and Tom Nguyen** — both came from **Hotwire** (Kim: VP Online Marketing; Nguyen: Marketing Analytics Manager). Founder DNA is **performance marketing + analytics, not sports science** — which explains the programmatic-SEO engine.
- **Legal entity: Marzen Media LLC**, Las Vegas, Nevada. Also owns **BettingPros.com** (sister betting site).
- **Bootstrapped — no venture/PE funding on record.** Grown organically + tuck-in acquisitions: **Pickemfirst LLC (2013**, majority stake, fantasy apps) and **Sports Injury Alert (2015**, injury content).
- **Scale (third-party estimates, low-confidence):** ~**$5–10M revenue**, **10–19 employees**. Their own About page claims **38 million annual visitors**.
- **The leverage story:** a ~4-million-page, 38M-visit business run by **fewer than 20 people with zero outside capital.** That's only possible because the content is templated (§3) and the intelligence is borrowed (§1). It's an efficient machine — but a thin one.

---

## 3. The programmatic-SEO engine (the thing that explains 38M visits)

Their traffic is **manufactured at template scale**, not earned per insight:
- The sitemap index lists **231 child sitemaps: 120 MLB + 87 NFL** (+ NBA/NHL/articles/news/nav).
- **One** child sitemap (NFL QB "start" pages) = **21,063 URLs.** Draft and trade variants are the same size; deep positions (MLB OF) are paginated into 10 parts (~206k for one position/type).
- **Estimated ~3–4 MILLION auto-generated doorway pages** — "Should I start [player] Week N," draft/trade/start per player per format — versus **~42 hand-written editorial articles.**
- The ratio *is* the company: a long-tail SEO surface that captures every "should I start X" search, funneling to the consensus + a subscription upsell.

**GSE read:** their moat is distribution (SEO breadth + ESPN/Yahoo/Sleeper/CBS league-sync lock-in), not data science. Don't try to out-page them; route around it with proprietary signal + a native, trustworthy product.

---

## 4. Tech stack (100% passive fingerprint)

| Layer | Finding |
|---|---|
| Origin | **Apache/2.4.52 (Ubuntu)** — classic **PHP monolith** |
| CDN/edge | **AWS CloudFront** (not Cloudflare) |
| Product analytics | **Mixpanel** + **Google Analytics** + **Google Tag Manager** (gtag 24×) — they instrument and experiment |
| Consent/privacy | **OneTrust** (enterprise consent mgmt) |
| Integrations | **Sleeper** (16× — deep league sync), Shopify (merch), Vue/Next widget fragments |

Contrast with FantasyGuru (WordPress/editorial): FantasyPros is a **more mature, instrumented, experiment-driven web operation** — but still conventional web engineering, not a modeling/data-science stack. Their edge is product + distribution, not first-party analytics.

---

## 5. Pricing — PRO / MVP / HOF (all sports bundled)

| Tier | Annual | Monthly | Unlocks (cumulative) |
|---|---|---|---|
| **PRO** | $3.99/mo | $11.99/mo | Premium Draft Kit, custom mock drafts & cheat sheets, waiver/trade analysis, Start/Sit Assistant, up to 2 leagues/sport |
| **MVP** (most popular) | $5.99/mo | $16.99/mo | + Draft Assistant w/ Live Sync (10 syncs), waiver/trade suggestions, keeper & dynasty support, salary-cap draft tools, auto-lineups, up to 10 leagues/sport |
| **HOF** | $8.99/mo | $22.99/mo | + up to 50 leagues/sport, **Coach AI**, Waiver Planner, **DFS Lineup Optimizer + DFS Projections + DFS ROI Analyzer** |

All tiers cover NFL/MLB/NBA + iOS/Android apps. **Much cheaper than FantasyGuru** ($3.99–22.99/mo vs FG's $59–499/yr sport tracks) — a volume/freemium model: hook millions of free SEO visitors, convert a slice cheaply. The consensus rankings and accuracy leaderboards are **free**; personalization, live draft sync, and DFS are the paywall.

---

## 6. The two signature systems

### ECR — Expert Consensus Rankings
- Aggregates ~90 NFL experts (100+ outlets) into one consensus order. **Not a simple average** — uses a **"Rank Points"** system per player based on ranked position on each expert's sheet, to avoid skew from unranked players.
- Exposes **Best / Worst / AVG / STD DEV** (expert dispersion) + **ADP** and **vs. ADP** (consensus vs draft market).
- A **"Pick Experts"** control lets users recompute consensus from a chosen subset.
- Ranking types: Draft, Weekly, Rest-of-Season, Dynasty, Rookies, Waiver, Sleepers, Devy. Formats: Standard / Half-PPR / PPR / Superflex / 2-QB / Best Ball.
- Public disclaimer: they don't control how often experts refresh ("Latest Update" = last time they *checked*).

### Expert Accuracy — the credibility engine (fully reverse-engineered; see `fp-accuracy-loopholes.md` + `fp-zscore-deepdive.md`)
The public "most accurate experts" leaderboard is what justifies ECR. Verified method (live + Wayback-2018):
1. Rank slot → expected points (historical avg for that slot, bye-adjusted); |expected − actual| = **Accuracy Gap** (error).
2. Player pool per position = **union** of top-N by ECR and top-N by actual points (so surprise studs/busts are graded).
3. Sum gaps per position/week; **convert weekly gaps to z-scores** vs the field; **drop each expert's worst-z-score week** (after Wk 8); sum Weeks 1–17. Half-PPR. 150+ experts (in-season), 190–225+ (preseason/draft). MLB uses 5×5 roto (C/1B/2B/3B/SS/OF/SP/RP; ECR, VBR, VORP inputs).

---

## 7. The accuracy loopholes (the corner worth prying open)

Their credibility rests on a method with **six exploitable seams** (full detail in the companion notes):
1. **Rank→generic-curve baseline ignores conviction** — tiering/gaps (the real expert signal) are invisible; only ordinal order scores.
2. **Drop-worst-z-week launders each expert's biggest blowup** while z-scoring caps upside → **structurally rewards low-variance chalk-huggers**, biasing the whole ECR toward chalk.
3. **Omission seam (verified, narrower than first thought):** they defend it (unranked overperformers slotted to worse of ECR+1 / last+1), but the penalty is **capped at ~ECR+1, not the player's actual finish** — so omitting a deep sleeper who booms still costs far less than the miss is worth.
4. **Snapshot timing = free accuracy** — two fixed snapshots reward whoever updates latest (info timing), not foresight.
5. **Chalk-week z-noise** — tiny raw-gap spreads get magnified into big z-swings; leaderboard motion is often noise dressed as skill.
6. **Relative, not absolute (deepest):** a z-score says "better than the field," never "actually right." **Consensus-wide error is undetectable and unpenalized** — being wrong with everyone is free. This is precisely the error a differentiated model exists to catch.

**Evolution:** the Accuracy-Gap + z-score + drop-worst-week skeleton has been **stable since ≥2018**; they only widened pools (RB 35→40, WR 35→50), switched Standard→Half-PPR, and split out IDP. The whole "most accurate" brand has rested on this the entire time.

---

## 8. Tools catalog

- **Draft Wizard** (flagship, premium/freemium): Mock Draft Simulator, Mock Draft Lobby (live vs real opponents), Draft Assistant (real-time), Draft Analyzer (post-draft grade), Draft Intel, Cheat Sheet Creator, Salary-Cap (auction) simulator + calculator.
- **My Playbook** (per sport): Start/Sit Assistant, Who Should I Start, Trade Analyzer, Trade Finder, Waiver (Wire) Assistant, League Analyzer, Research Assistant, Multi-League dashboard.
- **Data/pages:** Projections (draft/weekly/ROS), Stats, Strength of Schedule, Depth Charts, **MLB Closer Depth Chart**, Bye Weeks, Player News, Props, Gameday Live (live scoring/win-prob/lineup tracker).
- **DFS** (HOF tier): NFL/MLB/NBA Lineup Optimizer, DFS projections, ownership, ROI Analyzer, value plays, salary changes.
- **HOF AI:** "Coach AI" + Waiver Planner (their AI-assistant play).
- **BettingPros** (sister): picks, odds comparison, props research.

---

## 9. Strategic read for Galaxy Sports Edge

**Respect:** massive SEO distribution, league-sync lock-in (ESPN/Yahoo/Sleeper/CBS), a huge free funnel, and a mature freemium product — all run absurdly lean.

**Attack (GSE wedges):**
1. **Beat consensus where it's blind.** ECR is a mean of experts and its accuracy engine *cannot see consensus-wide error* (bias 6). A calibrated, magnitude-aware, absolutely-scored model catches exactly that — and it's provable.
2. **Publish an honest accuracy leaderboard.** Their z-score/drop-worst-week method rewards chalk-hugging and launders blowups. A proper scoring rule (Brier/log-loss, calibration, no worst-week drop, coverage-adjusted) is a demonstrably fairer scoreboard — and a public one directly undercuts their core credibility asset. (Extends the 2026-07-07 accuracy-weighted consensus engine.)
3. **Own the number.** They sell *the field's* opinion; GSE sells *its own* rating with receipts. "We don't average pundits — we out-predict them, and here's the back-test" is a positioning consensus can't answer.
4. **They're bootstrapped and thin (<20 people).** They won't out-engineer a focused, well-funded modeling effort; their advantage is inertia + SEO, not R&D velocity.
5. **Formats worth emulating (as templates, not copies):** ECR-style dispersion display (Best/Worst/StdDev), "vs. market" divergence (ADP/line), Strength-of-Schedule grades (GSE already has the scheme/defense engine), Closer Depth Chart (GSE has Solds/BURR), Draft Wizard-style simulation, an accuracy leaderboard done honestly.

---

## 10. Package files
- `FANTASYPROS-DOSSIER.md` — this report
- `fp-accuracy-loopholes.md` — the accuracy method + 6 seams (verified)
- `fp-zscore-deepdive.md` — the z-score aggregation in depth + 2018→2025 diff
- `fingerprint-and-scale.md` — tech stack + programmatic-SEO scale exposé
- `workflow-digest.md` — structured captures (ECR/accuracy/experts/rankings pages)
- `inventory-navlinks.txt` — 487 real product URLs (their navigation map)
- `llms.txt`, `robots.txt`, sitemap files — source data

*No FantasyPros paywalled or robots-disallowed content was accessed. Methodology described in original words; no ranking/consensus data reproduced.*
