# waves/ — staged competitive-intel wave outputs

## wave2-extract-data-2026-09-04.json
Owner-supplied context (2026-09-04): Wave 2 delta report + NCAAF intelligence,
competitor teardowns (19), prediction-market analysis, accuracy-distribution /
70%-problem analysis, methodology + calibration notes, market-gaps ranking.
Every claim carries a `value_citation`. Per the report itself, the Wave 1
inventory (604 files) is owner-briefed, not independently re-audited, and the
nfelo benchmark discrepancy (brief: 66.61% SU / 53.70% ATS vs close / +5.61%
CLV vs fetched page: 66...[truncated]
## wave3-dfs-optimizer-2026-09-12.json
Owner-supplied extract (2026-09-12, 72 entities): 18 DFS optimizer competitor
profiles (SaberSim, RotoQL, THE SOLVER, Fantasy Cruncher, Stokastic, Daily
Fantasy Fuel, FantasyLabs, FTN x2, LineupHQ, DFS Hero, LineStar, FantasyPros,
RotoWire, 4for4, BTA Fantasy IQ, WalterPicks) with pricing tiers, optimizer
types, data sources, algo-model prose, and lineup-generation / correlation
booleans. Plus 40 prop-firm profiles and 14 editorial-methodology notes
(out of scope for GSE; kept raw, not briefed).
Audit (2026-09-12, mechanical): 12/18 DFS profiles carry NO pricing tiers;
10/18 lack algo_model prose; every claim carries a `value_citation` / source
URL. Treat missing fields as extraction gaps, not as competitor negatives.
Cross-product: 18/18 claim lineup generation; 14/18 claim correlation
tracking; sim scale claims run 10k (RotoQL, DFS Hero) to 100k/30s (SaberSim).
Gap read vs GSE engine (2026-09-12: exact DP + k-best/diverse-pool/late-swap/
minStack + correlation sim + exposure control, NFL DK-Classic only):
contest-vs-field payout simulation, multi-sport slates, bankroll tracking,
best-ball explorer, post-lock sim dashboard, live ownership, pick'em
(PrizePicks/Underdog) optimizers — none of which GSE ships. Vendor claims are
unverified marketing; verify before building against them.

## wave3-prop-firms-editorial-2026-09-12.md
Deep brief of the remaining 54 entities in wave3-dfs-optimizer-2026-09-12.json:
40 prop-firm rows deduped to ~25 unique firms (FTMO x5, FundedNext x4,
Tradeify x3...), Trustpilot leaderboard, thin economics (only 4 firms priced;
payout speeds for 4), constraints matrix, PropScorer analyst takes, platform
aggregate (MT5/cTrader lead), HQ geography, 8 methodology comparison, top-pick
consensus (FTMO 6, Tradeify/FundedNext 4), and a DailyOverlay graded-experts
spotlight — the most GSE-actionable entity (external benchmark + leaderboard
mechanic). Zero affiliate mentions in source: do not brief affiliate economics
from this file. Re-extraction targets listed in section 11/12.

# WAVE 4 (2026-09-12) — 35-file sweep: 33 raws verbatim in waves/ as wave4-src-*, 2 giants sha-logged below, 7 dossiers
## Per-file audit log (bytes | sha-head | disposition)
- extract-data-2026-08-27.json (17603) | 26f1cd9fbc61 | wave4-src copy; briefed in wave4-methods-2026-09-12.md (provider/api_key/feed)
- extract-data-2026-08-27 (1).json (27144) | 4cdb2142368c | wave4-src copy; briefed in wave4-methods (math_core/ingestion/validation/stack)
- extract-data-2026-08-27 (2).json (27764) | 213dc0b01520 | wave4-src copy; briefed in wave4-methods (prop modeling 5 rows)
- extract-data-2026-08-27 (3).json (17969) | da04d76a10ae | wave4-src copy; briefed in wave4-methods (dfs+prop/market-edge)
- extract-data-2026-08-28.json (1362170) | 2028b7acbcd2 | wave4-src copy; briefed in wave4-deepcrawl (105 rows + 7 platforms)
- extract-data-2026-08-28.csv (1281719) | csv, 9 headers x 1 data row | wave4-src copy; join 100% format-copy, not corroboration
- extract-data-2026-08-28 (1).json (91160) | c683f66a3e57 | wave4-src copy; briefed in wave4-deepcrawl (29 clones/10 steals/9 do_not_copy)
- extract-data-2026-08-29.json (28572) | 16eabbc28452 | wave4-src copy; briefed in wave4-methods; DELTA vs (1) (0 steals/0 dnc overlap)
- extract-data-2026-08-29 (1).json (28397) | 56eca788d5f1 | wave4-src copy; briefed in wave4-methods; 9 steals zero-citation, re-extract
- extract-data-2026-08-30.json (77637) | f3ff0837c446 | wave4-src copy; briefed in wave4-blueprints (75 github_repositories)
- extract-data-2026-08-30 (1).json (61761) | b66d40237cce | wave4-src copy; local-business leads x76, OUT OF SCOPE (no repo/benchmark signal)
- extract-data-2026-08-30 (2).json (66083) | e824a81f43a2 | wave4-src copy; briefed in wave4-blueprints (18 analyses + benchmarks)
- extract-data-2026-08-30 (3).json (101856) | ee221172ab57 | wave4-src copy; briefed in wave4-blueprints (48 competitors + GSN plan)
- extract-data-2026-08-31.json (102083) | bae2cddc9bfe | wave4-src copy; briefed in wave4-blueprints (CollX + 100 lib + master plan)
- extract-data-2026-09-04.json + (1).json | 74114ed1f3bf / 36aaa8b033bc | ALREADY INGESTED wave2, dedup-verified by sha, not re-briefed
- extract-data-2026-09-08.json (193554) | cd20050dbffb | wave4-src copy; briefed in wave4-targets-api (50 domains + 50 targets)
- extract-data-2026-09-08 (1).json (87972) | 9f4918d0371d | wave4-src copy; briefed in wave4-targets-api (21+25+9)
- extract-data-2026-09-08 (2).json (36857) | 3b895385ec9d | wave4-src copy; briefed in wave4-targets-api (30+8, endpoints=[] throughout)
- extract-data-2026-09-08 (3).json (7998) + (4).json (7998) | c16ea302 + c16ea302 IDENTICAL | dupes verified by sha256+diff; ingested once
- extract-data-2026-09-11.json (20531) | 094972d3e653 | wave4-src copy; briefed in wave4-prediction-markets (14 keys/27 cites)
- extract-data-2026-09-11 (1).json (60234) | 7a31f4bb2965 | wave4-src copy; briefed in wave4-prediction-markets (46 logs, Kalshi 404s)
- extract-data-2026-09-11 (2).json (22252405) | sha256 95f524c0e468d5e32b7b14a1a3a8bef57e54e77e79f6e5a5635343c7a6c0873b | GIANT: NOT copied (39MB pair); streamed to wave4-prediction-markets-tables; raw stays at C:/Users/Garrett/Downloads/
- extract-data-2026-09-11 (3).json (482997) | 92e0ea55c2dc | wave4-src copy; briefed in wave4-prediction-markets (13 endpoints/48 sources)
- extract-data-2026-09-11 (4).json (263408) | 30fafcdbb2bc | wave4-src copy; briefed in wave4-prediction-markets (46 sources)
- extract-data-2026-09-11 (5).json (17339400) | sha256 8013ecee5f1013514fddc659f1bdc56ec70e55a7aad50a573c1f63274911b167 | GIANT: NOT copied; streamed to tables; raw stays in Downloads/
- extract-data-2026-09-11 (6).json (46486) | fd84272288b1 | wave4-src copy; briefed (manifest 18, failures 7)
- extract-data-2026-09-11 (7).json (72024) | 9bb5d4a38058 | wave4-src copy; briefed (manifest 53, joins 8)
- extract-data-2026-09-11 (8).json (42204) | 77f9fc0581ea | wave4-src copy; briefed (joins 40, PBP 25)
- extract-data-2026-09-12.json (179909) | 854fddca73d7 | wave4-src copy; briefed in wave4-features-formulas (201 feats thin, 62 formulas)
- extract-data-2026-09-12 (1).json (279553) | 111a7707b39e | wave4-src copy; briefed in wave4-features-formulas (71/567/34)
- extract-data-2026-09-12 (2).json (126557) | b4eb53bbf04d | wave4-src copy; briefed in wave4-features-formulas (53/93/15/21 pricing)
- extract-data-2026-09-12 (3).json (151649) | 2bf9265f0dcb | ALREADY INGESTED wave3 (72 entities), dedup-verified, not re-briefed
- extract-data-2026-09-12 (4).json (41241) | f17f7f70f0ed | verbatim as waves/wave4-odds-vendors-2026-09-12.json; briefed in wave4-odds-vendors-2026-09-12.md
## wave4-odds-vendors-2026-09-12.md
50 odds/data entities (40 HIGH/5 MED/5 LOW): The Odds API, Odds-API.io, SportsGameOdds, Sportradar, SportsDataIO, Stats Perform + Parse.bot/MCPize/FXPropTech. Verdict: Business stays buy-if-live, $0 while key down; extract tier names conflict with ODDS_API_TIER_DECISION.md canonical — re-extract pricing page before budgeting. 1 entity = explicit 404 (apify prop-firm-rules-monitor).
## wave4-prediction-markets-2026-09-12.md
9-file 09-11 cluster: verdicts usable 151 / dead 25 / auth-walled 25. Kalshi elections-subdomain series endpoints all 404 — use trade-api event/candlestick path (81 daily OHLC confirmed). nflverse catalog-only (136 assets, 0 bytes normalized) — roster-CSV direct download is the proven path. Closing-line archive thinnest leg (1 line). Identity-join coverage 48/83 = 0.5783.
## wave4-features-formulas-2026-09-12.md
325 features / 854 columns / 111 formulas / 106 pricing rows across 3 files. No universal composite disclosed anywhere — per-table sorts only. GSE-actionable: LineStar Value=Proj/Salary + edge%; xBA/xSLG/xwOBA + qualifiers as calibration anchor; EV+ rank-by-edge + ZiPS/Steamer ensemble template. Band $14.99-19.99/mo, $99-199/yr, $295/6mo ceiling.
## wave4-targets-api-2026-09-12.md
66 unique domains, 26 repos, 58 URLs, 105 rows (BUILD 18 / VERIFY 56 / WONT-DO 31). Only real endpoints = OddsJam (sportsbooks?state, detect_state, auth/user, build-time). OpenAPI/GraphQL NOT CONFIRMED. f0 top-50 synthesis all NOT CONFIRMED filler.
## wave4-blueprints-gsn-2026-09-12.md
172 unique repos, 20 benchmark rows (11 genAI + 9 enterprise), 25 GSN build items (functional paraphrases only, 0 copied-creative). 100/100 lib rows carry boilerplate stubs — pointers not findings. 76-row leads file out of scope.
## wave4-deepcrawl-2026-09-12.md
105 deep-crawl rows + 7 platform analyses (Blink 1, Replit 2, Emergent 3, Lovable 4, Readdy 5, Vercel/Netlify 6-7). CSV = 100% format-copy join. do_not_copy x9 listed verbatim in dossier, boundary respected.
## wave4-methods-2026-09-12.md
08-27 x4 + 08-29 x2 consolidated: 08-29 pair is DELTA (0 steals/0 dnc overlap, jobs differ). 15 verbatim formulas / 10 canonical (implied-prob, no-vig, EV, CLV, Kelly, Dixon-Coles, MC, EPA, DFS MIP). Pipeline: official-first ingestion + YOLOv8/ByteTrack fallback, walk-forward + fractional-Kelly gates, joint-sim edge (never product of marginals).
