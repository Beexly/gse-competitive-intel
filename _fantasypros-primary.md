# FantasyPros — Deep Primary Findings (Firecrawl-enabled, 2026-07-15)

Passive-public only. No paywalled/subscriber-gated data scraped; no probing of robots-Disallowed /api,/json,/xml,/ajax,/ranker endpoints. Analysis of their system, not exfiltration of their proprietary rankings dataset.

## Corporate / ownership (NEW depth)
- Operating entity: **Marzen Media LLC** (FantasyPros® is its registered trademark; email domain marzenmedia.com).
- **Founded 2010** by **David Kim** and **Tom Nguyen** (David Kim = Partner, Marzen Media).
- **~121 employees**; **bootstrapped — no VC funding raised** (per Owler/Crunchbase/Tracxn). A profitable independent, not a shell.
- Acquisitions: **Pickemfirst LLC (2013)**, **Sports Injury Alert (2015)**.
- Contrast vs scores24: real US company, real team, real product — competes on quality, not SEO-arbitrage volume.

## Infrastructure / stack (passive)
- **AWS** hosted: A = 3.229.221.8 / 54.237.72.210 (AS14618 Amazon, Ashburn VA); NS = AWS Route 53 (awsdns).
- Email/SaaS stack: **Zoho** (corporate mail), SPF includes **Mailchimp/Mandrill** (mcsv/mandrillapp), **Zendesk** (support), **Amazon SES**. Support subdomain = Zendesk.
- Domain registered **2003-01-26** (23 yrs), expires 2027.
- **AI-forward signals:** publishes **/llms.txt** (guides LLM consumption) AND carries an **openai-domain-verification** TXT record → deliberately courting AI answer-engines to cite FantasyPros as the fantasy data source.
- CT-log subdomains (only 9, clean): blog, **clicks** (affiliate link tracking), dev, expenses, **partnershq** (B2B/data-syndication partner portal), **shop** (merch), sli, support. Plus **ep.fantasypros.com** (Expert Platform) and **draftwizard.fantasypros.com** referenced on-site.
- robots.txt: Disallows /ajax/,/api/,/json/,/xml/, and /{nfl,mlb,nba}/ranker/ (their ranker tool + data endpoints hidden); Crawl-delay 5; declares `LLMS: /llms.txt`.

## Product surface (from llms.txt — their own AI-facing map)
- Sports: NFL, MLB, NBA, NHL + DFS.
- Core: **Expert Consensus Rankings (ECR)** from **150+ experts** (100+ in llms.txt, 150+ on About/accuracy).
- **League-sync MOAT:** ESPN, Yahoo, Sleeper, NFL.com, CBS → personalized advice.
- **My Playbook** ecosystem: Start/Sit Assistant, Who Should I Start, Trade Analyzer, Waiver Wire Assistant, team dashboards, multi-league.
- **Draft Wizard** (draftwizard.fantasypros.com): mock draft simulator, cheat sheets, live Draft Assistant.
- Projections, Stats, Strength-of-Schedule, Depth Charts, Player News, **Gameday Live** (live scoring + **win probability** + lineup tracker).
- **DFS Lineup Optimizer** (DraftKings/FanDuel) for MLB/NBA.
- **BettingPros** = separate sister brand (bettingpros.com) for betting picks/odds/props — clean compliance separation of the betting arm (vs scores24 mixing tips+affiliate).
- **Expert Platform** (ep.fantasypros.com/contribute-advice) — experts contribute rankings/advice.

## Monetization (5 legs)
1. **Subscriptions** — 3 tiers (annual / semi / monthly):
   - **PRO:** $3.99 / $5.99 / $11.99 per mo — up to 2 leagues/sport; 3-day free trial.
   - **MVP:** $5.99 / $8.99 / $16.99 — Keeper & Dynasty, up to 10 leagues/sport, + PRO features.
   - **HOF:** $8.99 / $11.99 / $22.99 — up to 50 leagues/sport.
   - Annual billing saves ~60% vs monthly; free 3-day trials per tier.
2. **Display advertising** — "137 million visits/year", "2.22B ad impressions/yr", 38MM annual visitors, avg 5m 8s on site; core US 25-44 (self-reported on /advertise/).
3. **Affiliate** — own affiliate program (/affiliate/) + clicks.fantasypros.com tracking; sportsbook via BettingPros.
4. **B2B data syndication** — partnershq.fantasypros.com (licenses ECR/projections/tools to partners).
5. **Merch** — shop.fantasypros.com.

## Accuracy system — FULL CURRENT METHODOLOGY (In-Season, the crown jewel)
Source: /about/faq/football-inseason-accuracy-methodology/ (public).
- Scored on **Half-PPR**. Snapshot of every expert's rankings at **Thursday-night kickoff** and again at **Sunday 1pm ET**; TNF players locked. Scored after Monday night; rolled into a **Year-to-Date leaderboard over 17 weeks** (excl. Week 18). 150+ experts (2024).
- **Player pool per position = UNION of Top-N ECR ∪ Top-N Actual points** (so surprise studs AND busts are graded). Buckets e.g. RB Top 40, WR Top 50, TE/K/DST Top 15, etc. → each expert graded on MORE than N players.
- **"Accuracy Gap" (= Error):** each expert's rank slot for a player is converted to a **projected point value = historical average production for that rank slot** (e.g. WR#28 → 8.1 pts). Compare |projected − actual|; sum across the position's pool. Lower = better. (KEY: they score the RANK, not the expert's own projection, via rank-slot historical averages.)
- **Missing-player rules:** (a) player in pool via ECR cutoff but unranked by expert → assign expert's (last-ranked +1); (b) player in pool via actual-cutoff surprise → assign the WORSE of (ECR+1) or (last-ranked+1) — "don't unfairly punish deep rankers."
- **Penalty rule:** if an expert ranked a player in-range who ends up NOT in the pool (not top-N consensus AND not top-N actual) → penalty = |expert gap − average expert gap|, applied ONLY if worse than average. Targets failing to remove injured players.
- **Aggregation:** sum Weeks 1-17; after Week 8, **drop each expert's worst week** (mulligan). Normalize weeks via **z-scores** (std devs vs field), drop the worst z-score week (can differ per position).
- Separate **Draft (preseason) accuracy** methodology and **Mock Draft accuracy** exist.

### Re-audit hooks vs our prior teardown (project-gse-consensus-accuracy-engine)
- Prior finding: "Accuracy Challenge doesn't weight their default ECR + short-list omission loophole." The CURRENT spec has explicit missing-player + penalty rules that try to close omission gaming — VERIFY whether a gameable edge remains: the "last-ranked +1" assignment gives short-list rankers a fixed, often-mild penalty for omitted pool players, which can beat ranking many players and missing badly. Also the rank-slot-historical-average projection means an expert is graded on rank ordering vs a smoothed curve, not on their own point projection — exploitable by ranking toward the curve's low-variance slots.
- These are the exact seams GSE's accuracy-weighted consensus engine should target/prove against. Re-verify against the live 2025 leaderboard structure.

## BettingPros (sister betting brand — the real GSE analog)
- bettingpros.com: Picks + Odds + Props; consensus-of-experts applied to BETS (like ECR for bets), premium-gated picks.
- **Accountability features (contrast scores24):** publishes a **unit-based pick record** ("5-star MLB prop bets +9 units this week"; /mlb/prop-record/), shows an **EV "Rating"** per pick, and grades pick tiers (5-star).
- **Kalshi integration** — surfaces Kalshi prediction-market prices alongside sportsbook odds (GSE also uses Kalshi CLV). 
- **BettingPros Chrome Extension** (BP Account Sync Utility) syncs users' sportsbooks.
- Covers MLB, WNBA, NFL, soccer/World Cup, etc. Clean brand separation keeps FantasyPros itself non-gambling.

## Traffic / market position (third-party)
- Similarweb (May 2026): ~**3.56M visits/mo**, avg session **~10 min**; traffic mix **57.6% direct / 23.9% google.com** → loyal branded audience, NOT SEO-arbitrage (opposite of scores24). Off-season month; fantasy traffic spikes Aug–Jan, so annualized-from-May understates.
- Self-reported (advertise page): 38MM visitors + **137M visits/yr**, 2.22B impressions — reconcile via NFL seasonality; treat self-report as peak-inclusive.
- Category: Fantasy Sports; peers RotoWire (#3), RotoGrinders, Sleeper (app-first), 4for4, FantasySP; platform hosts ESPN/Yahoo dominate raw traffic.
- **Syndication war:** RotoWire powers ESPN/Yahoo/CBS/Fox/DraftKings player-news feeds (80+ partners, 15 teams). FantasyPros competes via its own API/partnershq licensing ECR/projections.

## AI / API strategy (the modern land-grab)
- **Public API** (/api-data/): ECR, projections, player news, injury data (NFL/MLB/NBA/NHL); bespoke B2B agreements via partnershq; partners@fantasypros.com.
- **AI-native positioning:** /llms.txt + openai-domain-verification TXT + a community **FantasyPros MCP server** (GitHub DynamicEndpoints/fantasy-pros-mcp) + R pkg `ffpros`. They are courting LLM/agent citation to be THE structured fantasy data layer for AI answer-engines.
- Strategic implication for GSE: the "be the source AI cites" race is live in fantasy/sports. GSE should publish its own llms.txt + structured, cited, verifiable data (and its proven win-rate) so AI answer-engines cite GSE's accountable numbers over FantasyPros' consensus averages.

## GSE strategic seams (net-new)
1. FantasyPros proves EXPERTS' accuracy, not the accuracy of ITS OWN consensus as an actionable pick — GSE proves its own model's win rate directly (more accountable at the decision level).
2. Consensus averaging regresses to mainstream/safe; a proprietary calibrated single number (GSE Rating) with conviction + a published track record differentiates on the axis FantasyPros structurally can't (it's an aggregator, not a predictor).
3. Half-PPR-only, rank-slot-historical-average grading has exploitable seams (rank-toward-the-curve, short-list omission mildness) — GSE's engine can out-design and PROVE it.
4. NFL-seasonal, off-season traffic craters — a multi-sport, year-round accountable engine has an opening.
5. Do NOT copy: the gated-picks paywall friction, consensus-as-product (undifferentiated), or the sportsbook-affiliate lean on BettingPros. GSE's edge is trust + proof, not aggregation + gating.
