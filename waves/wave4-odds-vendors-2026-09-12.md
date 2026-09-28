# Wave 4 Cluster-A: Odds-Vendor Dossier
Source: `extract-data-2026-09-12 (4).json` (50 entities) | Product context: `Sports-live/handoff/ODDS_API_TIER_DECISION.md`
Method: python3 census with collections.Counter first; `*_citation` keys stripped for analysis, retained in source for traceability. Every factual claim below traces to a source URL / citation in the extract. Vendor marketing claims are UNVERIFIED.

## 1. Census (programmatic, not eyeballed)
- Total entities: 50. Confidence: HIGH 40/50, MEDIUM 5/50, LOW 5/50.
- `core_data` present on 34/50; missing/empty on 16/50. `pricing[]` non-empty on 14/50. `notes` present on 50/50.
- Identity name empty on 5/50 (all LOW, idx 0/18/25/35/38).
- Thematic split: odds/data vendors ~9, DFS optimizer/content sites ~20, prop-firm/fintech ~15, misc (domain-parking kjpi.com, MCP marketplace) ~6.

## 2. Vendor comparison table (the 9 required vendors)
All prices/quota/coverage below are extractor-observed values only — unverified marketing, do not budget off them without re-verification.

| Vendor | Conf | Source URL | Observed pricing (USD/mo unless noted) | Observed coverage / quota signals | Gaps |
|---|---|---|---|---|---|
| The Odds API | HIGH | https://the-odds-api.com | Starter $0; START 20K $30; START 100K $59; START 5M $119; START 15M $249 | core: only "odds from bookmakers around the world" — NO bookmaker count, sport count, quota, or region observed | CONFLICT: tier names/prices do NOT match ODDS_API_TIER_DECISION.md §2 (Free/Professional $29/Business $99 from theoddsapi.com/pricing). Different domain + different tier schema — treat as unverified; re-extract canonical pricing page |
| Odds-API.io | HIGH | https://odds-api.io | Free $0; Solo $65; Starter $129; Growth $239; Pro $299 (/mo labels observed) | bookmakers_observed "265+" | Currency unlabeled in extract (decision doc §8 correction: live page prices in GBP £49/£99/£179/£229). No quota, sport, or market fields observed |
| SportsGameOdds | HIGH | https://sportsgameodds.com | Amateur $0; Rookie $99; Pro $299. All-Star plan "Let's talk" omitted (no numeric) | amateur 2500 objects/mo, 10 req/min | No bookmaker/sport/market counts; paid-tier quotas unobserved |
| Sportradar | HIGH | https://sportradar.com | none observed | headline only ("The Sports Technology Company") | No pricing, coverage, or product fields — enterprise sales wall, expected |
| SportsDataIO | HIGH | https://sportsdata.io | none observed | headline "Real-Time Sports Data", audience "For Gaming, Media & Beyond"; free-trial link noted | No pricing/coverage numbers |
| Stats Perform | HIGH | https://www.statsperform.com | none observed | core_data {} (empty) | Thinnest HIGH record of the nine — full re-extract needed |
| Parse.bot | MEDIUM | https://www.parse.bot | none observed | headline "The API for the entire internet"; live_apis_observed 3606 | MEDIUM confidence; not an odds vendor (generic scraping API) — relevance marginal; no odds coverage fields |
| MCPize | HIGH | https://mcpize.com | Free tier $0 | MCP marketplace: 950+ servers, 80% publisher revenue share, 25,000 free req/mo, no credit card | Not an odds vendor — infra/marketplace context only |
| FXPropTech | MEDIUM | https://fxproptech.com | none (page "flexible SaaS pricing", no numerics) | white-label prop-firm SaaS: 20+ firms, 7+ yrs, 120K+ traders (all vendor-claimed) | MEDIUM confidence; prop-firm vertical, not odds data |

Coverage as fractions: bookmaker counts 1/9 vendors (Odds-API.io 265+); quota/rate signals 2/9 (MCPize, SportsGameOdds-amateur); sport/market lists 0/9; numeric pricing 4/9 (The Odds API, Odds-API.io, SportsGameOdds, MCPize-free).

## 3. Non-vendor entities of note (brief)
- DFS optimizers with-tree pricing observed: THE SOLVER ($37.99/$25.99/$34.99), Daily Fantasy Fuel ($29.99/$134.99), SaberSim ($7 trial), DFS Hero ($1), Daily Overlay ($19.99). Competitor context only.
- OddsJam, BTA Sports, 4for4, RotoGrinders/Labs/Wire, FantasyPros, Stokastic: trials noted (3-day/7-day free, 100k+ users claimed) but NO numeric prices observed — paywall/JS-gated, re-extract candidates.
- Prop-firm cluster (Prop Firm Match/Compare/Switch, Vetted, BestPropFirmGuide, Track360, FundedScore, CrossTrade, HFT Arbitrage $465/$2605): adjacent vertical, not odds supply.

## 4. Not-found entity (explicit flag)
- **idx 0, LOW, `https://apify.com/prop-firm-rules-monitor`**: assigned URL returned a not-found page; identity `{}` (no name/pricing), no core_data key at all. This is the single explicit not-found record. NOT an odds vendor — no action for tier decision.
- Do not confuse with the other four LOWs, which are extraction failures, not 404s: idx 18 fantasycruncher.com (navigation blocked/aborted), idx 25 dfsace.com (no usable content), idx 35 elitepicksdfs.com + idx 38 dfsoptimizer.com (no usable content). All four have empty identity and empty core_data.

## 5. Tier recommendation (feeds ODDS_API_TIER_DECISION.md)
No change to the decision doc's standing call. This extract contains NO credit-cost, quota-allowance, region, or market-count fields for The Odds API, so it cannot resize the burn model (§4: 1,200 credits/day current, 2,064/day true peak; Professional exhausts ~day 16/9.7, Business holds ~69% headroom at peak).
- If `THE_ODDS_API_KEY` remains deactivated (decision doc §8 open question): spend $0, buy nothing. Confirm live Vercel env first.
- If/when the paid key goes live at current 15-min + hourly-settle architecture: **Business tier** remains the cheapest tier that sustains a full month. Professional still fails (~19→16 days).
- New signal from this extract, low weight: SportsGameOdds Rookie $99/mo and Odds-API.io Solo $65/mo are the only observed sub-$100 paid odds-API alternatives — but BOTH lack observed quota/sport/market fields, and odds-api.io failover remains unwired per decision doc §6. Do not substitute without a wired adapter + quota verification. Re-extract both vendors' quota pages before any failover sizing.
- Pricing-schema conflict warning: extract's The-Odds-API tiers ($30/$59/$119/$249, START-* names) contradict the decision doc's canonical tiers ($29 Professional / $99 Business). Do NOT carry extract prices into budgeting; re-extract https://theoddsapi.com/pricing.

## 6a. Data-quality caveats (as fractions)
- Confidence: HIGH 40/50, MEDIUM 5/50, LOW 5/50.
- Empty identity (no name): 5/50 — all LOW.
- Empty/missing core_data: 16/50 (1 missing key entirely + 15 empty `{}`).
- Pricing observed: 14/50; pricing absent: 36/50 (of which 3/9 required vendors have zero pricing: Sportradar, SportsDataIO, Stats Perform).
- Coverage fields (bookmakers/sports/markets): 1/50 has bookmaker count; 0/50 has sport or market lists.
- Currency labeling: 0/14 priced entities carry an explicit currency field — all USD assumptions are extractor inference except decision-doc correction (odds-api.io = GBP).
- MEDIUM-confidence records (5/50: FXPropTech, Parse.bot, Optimal Bet, FantasyLabs, FTN Fantasy) need corroboration before citation.
- Single-source per entity (1 URL each, 50/50) — no cross-vendor corroboration inside this extract.

## 6b. GSE action reads
1. Keep primary on The Odds API; keep Business as the buy-if-live tier. Nothing here beats its verified 200k-credit sizing.
2. Next cheapest verified hedge is wiring the odds-api.io failover adapter (separate hourly quota), not buying a second paid tier blind.
3. SportsGameOdds Rookie is the only credible paid-tier-B candidate to evaluate AFTER quota verification — park until re-extract lands.
4. Deprioritize Parse.bot/MCPize/FXPropTech for odds supply (wrong category); keep MCPize note (25k free req/mo) for infra awareness only.

## 6c. Re-extraction targets (priority order)
1. https://theoddsapi.com/pricing (canonical, resolve $30/$59/$119/$249 vs $29/$99 conflict; capture allowances/sports/markets).
2. https://www.statsperform.com (empty core_data), https://sportradar.com + https://sportsdata.io (headline-only; find developer/quota pages).
3. https://odds-api.io + https://sportsgameodds.com (capture quotas, rate limits, sport/market lists, currency).
4. Blocked/empty LOWs: https://fantasycruncher.com (blocked nav), https://www.dfsace.com, https://www.elitepicksdfs.com, https://www.dfsoptimizer.com.
5. Paywalled DFS prices: OddsJam, RotoGrinders, FantasyLabs, RotoWire, 4for4 (numeric plans unobserved).
6. Confirm: is `THE_ODDS_API_KEY` live in Vercel today (decision doc §8)? Gates all spend timing.
