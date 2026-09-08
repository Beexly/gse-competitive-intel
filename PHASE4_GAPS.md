# PHASE 4 — Gap Analysis & GSE Build Priorities
Generated: 2026-09-08 (living doc — updates as wave dossiers land)
Sources: C:\Users\Garrett\.hermes\competitor-intel\dossiers\*.json (24+), raw\ (614+ files)

## 1. Market Structure (from dossiers)

### A. DFS Optimizer / Simulation tier (seeds)
| Product | Model core | Price point | Confirmed evidence |
|---|---|---|---|
| SaberSim | sim-driven optimizer, "upside" framing | $97/$197/$297 per month + $7 trial | pricing page capture |
| Stokastic | contest sims + ownership projections | tiered /mo, Stripe price IDs public | pricing page + API captures |
| FantasyCruncher | MME optimizer, late-swap | tiered (not captured) | product pages |
| RotoGrinders LineupHQ | THE BAT projections + SimLabs | $39.99–$129.99/mo | premium page capture |
| FantasyLabs | customizable Player Models + Trends | subscription (PHP 7.4.9 backend) | headers + /api/v1 hints |
| DraftKings-native tools | DK pricing $20–$80/mo range (public) | product pages |

### B. Prop-research tier
- Outlier ($80–$100/mo class), Props.Cash, PropFinder, PlayerProps.ai (Next.js + app deep links), PropsBot (WordPress), OddsShopper, BettingPros (free, affiliate-driven).

### C. Odds-infrastructure tier (B2B + prosumer)
- OddsJam (own /api/backend/*, Cloudflare-walled, OpenAPI/Swagger exposed), The Odds API (freemium REST, 500/mo free), SportsData.io (enterprise trial tiers), PredictionData, SportsAPI, SportMonks, API-Sports, GoalServe, AllSportsAPI, Football-Data.org, LSports, Sportradar (enterprise), TheSpread API + bakedziti88/sportsbook-api (OSS aggregators).

### D. Bet-tracking / CLV tier
- BetStamp, Pikkit (booksync + CLV pages), JuiceReel, BetQL, BettorEdge — dossiers in flight (wave 4/5).

### E. Open-source algorithm layer (free inputs for GSE)
- draftfast: DK/FD lineup constraint solver (CSV in, MILP-style constraints).
- penaltyblog: scipy linprog arbitrage stake allocation, Kelly (single + simultaneous), Dixon-Coles/Poisson models, FBref/Understat scrapers. MIT.
- WagerBrain: odds conversion/EV/vig math. MIT.
- pretrehr/Sports-betting: sklearn odds-value pipeline. MIT.
- sportsdataverse: FREE enriched NFL JSON (NFL Shield API) + EP/WP/CP model datasets — direct GSE ingestion lead.
- pydfs-lineup-optimizer: the backbone most hobby optimizers build on (documented constraints API).

## 2. Confirmed Engineering Patterns (citations in dossiers)
1. Next.js/Vercel dominates new entrants (Stokastic, PlayerProps.ai, Rithmm-class apps); legacy PHP persists in incumbents (FantasyLabs, FantasyCruncher).
2. Stripe Checkout links leak product architecture (plan_/price_ IDs in Stokastic HTML) — pricing intelligence is scrapable at scale.
3. Churn-prevention SaaS (Churnkey on Props.Cash) = subscription fatigue is real industry-wide.
4. Public unauthenticated APIs exist where product teams ship mobile/web parity: OddsJam sportsbooks catalog, Dimers geolocation, Stokastic articles/banners.
5. AI-agent surfacing is brand-new and nearly empty: only Outlier ships /llms.txt + /agents.json. Nobody else in the set does.
6. Data supply chains converge on: DK/FD contest feeds (DFS), sportsbook odds scraping or B2B feeds (props), NFL Shield/ESPN/MLB public APIs (stats) — the latter are FREE via sportsdataverse.

## 3. Customer Pain (verbatim evidence in dossiers)
- Sim-suite pricing: "full sim suite... I'd never pay that much" (r/BestBall on Stokastic).
- Correlation-tool value decay: "correlation tool was worth [it] but is not worth it anymore. they've tried to add more correlation types to increase the value" (r/dgfantasy).
- Premium-content bundle fatigue across RG/DFS-Army/Stokastic threads.
- Implication: GSE wedge = transparent pricing + genuinely additive correlation modeling + agent-native access.

## 4. GSE Build Priorities (ranked, evidence-backed)
P1. Agent-native surface (MCP + /llms.txt + /agents.json) — category is empty except Outlier's static file; first-mover surface is cheap and durable.
P2. Ingest sportsdataverse/nfl-raw (free enriched NFL JSON) as GSE's NFL backbone before paying for any B2B feed; layer The Odds API free tier (500 req/mo) for odds sanity checks.
P3. Correlation engine done right (position-group + game-stack correlation with published methodology) — direct attack on the documented DGFantasy complaint.
P4. Transparent usage pricing vs $97–$297/mo incumbents; trial-first ($7-class trial proven by SaberSim).
P5. CLV tracking as retention hook (BetStamp/Pikkit pattern) — cheap to build, high stickiness, and GSE already computes CLV in analysis artifacts.
P6. Reuse MIT-licensed algorithm primitives (penaltyblog arbitrage LP + Kelly; draftfast constraint patterns; WagerBrain odds math) instead of reinventing — license-clean (MIT; avoid GPL-3.0: dfs-with-r/coach, optidfs, sportyR).

## 5. Coverage Ledger
- Seeds: 10/10 dossiered (oddsjam, props.cash, outlier, fantasylabs, rotogrinders, stokastic, sabersim, fantasycruncher, propsbot, playerprops).
- 40-target list: 10 seeds + GitHub repos (7 to wave-3 children + 7 self-run + 6 in flight) + API providers (wave-2/3 children) + long-tail (waves 4-5).
- Discovered: 127 queued from search rounds 1-4 + GitHub topics; ~60 assigned across waves 1-5; remainder backfilled as slots free.
- Raw evidence: 614+ files under raw\; browser network captures for props.cash + dimers.
