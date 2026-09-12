# Wave 4 09-11 Prediction-Markets Cluster — Dossier

9 files ingested with python3 + Counter aggregation only. Giants (2) and (5) streamed via ijson; never read raw. Cross-referenced below. Companion machine tables: `tables.json`.

## 1. Per-file inventory (entity counts)

| File | Size | What it is | Entity counts |
|---|---|---|---|
| `extract-data-2026-09-11.json` (base) | 20 KB | Olympus methodology doc, http 200 | 14 top keys, 27 citations |
| `(1).json` | 60 KB | Olympus track record + market/API survey | 13 top keys; 46 crawler logs; 2 depth charts; 1 Kalshi market; 5 pred-market coverage; 3 closing-line scrapers; 4 sportsbook schemas; 1 nflverse catalog; 5 competitor methodologies; 5 academic inversions |
| `(2).json` GIANT | 22 MB | Raw-response archive + Olympus/nflverse/depth/research bulk | 38 raw_responses; 5 crawl logs; 542 Olympus performance rows; 4 LLM streams; 100 history picks; 50 track-record rows; 136 nflverse assets (7 release tags); 3 football-data rows; 5 depth charts (423 players); 5 competitor docs; 2 research papers |
| `(3).json` | 483 KB | SportsDataIO NFL API docs, auth-walled | 13 endpoints; 10 field names; 2 book params; 6 market keys; 0 confirmed 404s; 4 raw quotes |
| `(4).json` | 263 KB | 46-source odds/market API guide registry, all http 200 | 46 sources |
| `(5).json` GIANT | 17 MB | nflverse/PFR/odds normalization run | 19 raw ingestions; 19 manifest rows; 3 coverage tables; 4 failures; 5 normalized rows total (4 player_game_stats + 1 closing_line + 0 reference) |
| `(6).json` | 46 KB | Polymarket 49ers/Rams event dossier | manifest 18; identity_join 0 (null); availability 1; independent markets 9; tracking 2; coverage 4; failures 7 |
| `(7).json` | 72 KB | Cross-sport market/metrics survey | manifest 53; pbp 12; metrics 16; identity 8; availability 5; independent 7 |
| `(8).json` | 42 KB | Action Network/Smarkets quotes + NFL identity joins | manifest 12; identity 40; independent 9; pbp 25; metrics 5 |

## 2. Market-data source verdict table (usable for GSE calibration vs dead/auth-walled)

| Source | Verdict | Evidence |
|---|---|---|
| Olympus webmcp API (performance/history/track-record/openapi) | **Usable** | 542 perf rows across 18 leagues × 5 tiers × 11 confidence buckets; 100 history picks with 10-field schema; 50-row track CSV (17 headers); OpenAPI 17 methods. Own track record is the calibration baseline |
| Kalshi main trade-api (events/markets/candlesticks) | **Usable** | ENDSTREAK candlesticks 200, 81 daily samples with OHLC bid/ask; open-events/markets raw captures in (2) |
| Kalshi `api.elections.kalshi.com` series endpoints | **Dead (404)** | KXNFL/KXNBA/KXMLB `/markets` all 404 "page not found"; see §5 |
| Polymarket event pages (game contracts) | **Partially usable** | (6): 9 live contracts (SF/LAR moneyline + spreads with current prices) but `price_historical: []` — snapshot only, no history |
| Polymarket Gamma API (`/markets`, `/sports`) | **Dead in this crawl** | `sports_market_token: NOT CONFIRMED`; `price_history: {}`; raw captures exist but no normalized rows |
| Smarkets `api.smarkets.com/v3/events` | **Usable** | Unauthenticated JSON + pagination; 1,200 req/60s; event-scoped markets |
| PredictIt `/api/marketdata/all` | **Usable docs, no sports** | Public XML feed; sample had political markets only |
| Manifold `/v0/markets` | **Usable docs, sports unconfirmed** | Public JSON; sample generic multiple-choice |
| Metaculus `/api2/questions` | **Auth-walled** | Unauthenticated → 401; token required |
| Novig `/api/markets` + homepage | **Partially usable** | NFL visible in page sample; no machine-readable schema yielded; homepage showed view-only/trading-blocked notice |
| ProphetX (Jets/Titans, 119 markets) | **Usable listing** | Exchange listing observed via (7) |
| SportsDataIO NFL (`api.sportsdata.io/v3/nfl/`, `Ocp-Apim-Subscription-Key`) | **Auth-walled** | 13 endpoints, 6 market keys documented; no key in crawl; `BettingMarket` = full line movement (history-suitable, not live); closing-price field not confirmed |
| The Odds API family (21 of 46 in (4) auth-required: The Odds API, Odds-API.io, Rundown, SportsAPI Pro, OpticOdds, Sportradar, Sportmonks, Goalserve, API-Sports, Stats Perform, Smarkets, Matchbook, Manifold, SX Bet, 0xArchive, Apify, oddsapiR, CFBData, etc.) | **Auth-walled (21/46)** | Guide pages 200 but live quotes need keys |
| No-key exchanges/guides (Kalshi, Polymarket, PredictIt, ProphetX, Novig, Limitless, Betfair dev/historical, BETDAQ, CRAN/R tools, nfl_data_py, hoopR) | **Usable as docs/entry points (25/46)** | No auth flag on guide fetch |
| Pinnacle via Apify scraper | **Usable at a price** | 19-field board schema + sample margins (~3.8–5.4%); no native closing-line field (use last-board-before-kickoff); ~$6.23/1k matches |
| DraftKings/FanDuel/BetMGM/Caesars sportsbook APIs | **Dead in this crawl** | DK 403; others NOT CONFIRMED — no schemas captured |
| OddsPortal NFL results | **Dead (empty render)** | No quote rows in fetched content |
| SportsOddsHistory | **Usable statement only** | "Odds are closing odds" confirmed; no per-game quote table rendered |
| Pinnacle matchups page / Betfair historicdata | **Dead/auth-walled** | Pinnacle fetch no content; Betfair returned Restricted page → 0 reference-price rows |
| football-data.co.uk CSVs (E0/E1/SP1 2425) | **Blocked (3/3)** | Interstitial HTML on all three; redirect chain captured, no CSV bytes |
| PFR boxscore (202509040phi) + season pages | **Usable single-game** | 4 player rows + 1 Vegas-line cross-ref; season pages fetched, not normalized |
| ESPN scoreboard / MLB statsapi / weather.gov / open-meteo / Sleeper / retrosheet | **Usable (fetched 200, unnormalized)** | In (5) manifest as success with 0 rows written |
| nflverse release metadata | **Usable as catalog, not as data** | 7 tags, 136 assets listed; zero data bytes normalized; see §6 |
| OurLads depth charts (KC/PHI/SF/DAL/BAL) | **Usable** | 423 players across 5 teams |
| Action Network game pages | **Usable quotes** | (8): 6 NFL spread quotes (Patriots/Seahawks, 49ers/Rams, Jets/Titans) + Smarkets win-prob rows, timestamped 2026-09-11 |
| PFR team injury pages (`/teams/{kc,sf}/2024_injuries.htm`) | **Dead (404)** | PFR-side missing pages |
| Action Network FAQ raw | **Dead (404 body)** | "SORRY, PAGE NOT FOUND" shell captured |
| NHL Web API gamecenter / PBP Stats / Kaggle Big Data Bowl / balldontlie / FBref | **Usable (identity + pbp)** | Feeds (7)/(8) pbp + join keys |

**Source verdict counts (source-level rows aggregated across all 9 files): usable 151 / dead 25 / auth-walled 25.**

## 3. Failures taxonomy with counts

| Class | Count | Where |
|---|---|---|
| dead:404 in crawl logs | 10 | (1) 5 + (2) 5 (3 Kalshi-election + 2 PFR injuries) |
| dead:status-0 / fetch failed | 3 | (1) crawler logs |
| dead:404 in manifest fetches | 3 | (6) 2 + (7) 1 |
| dead:502 upstream | 1 | (6) Wikidata SPARQL → killed identity join |
| dead:404 body inside 200 raw capture | 1 | (2) Action Network FAQ shell |
| dead:200 shell, zero records extracted | 7+ | (6) ~5 incl. NFL.com transactions; (7) 1; (5) Pinnacle no-content + OddsPortal empty |
| blocked:interstitial/restricted/login-chrome | 5+ | football-data 3 + Betfair Restricted 1 + (5) OddsPortal blocked 1; nflverse GitHub pages returned signed-in/out chrome (200, 0 rows) |
| auth-walled:401/403 or key-required | 25 source rows | (1) 401×2 + 403×1 (incl. DraftKings); Metaculus 401; 21 key-gated APIs in (4); SportsDataIO key |
| unconfirmed-source-url | 24 | (2) raw_responses with "NOT CONFIRMED source URL" |
| empty-render:no-rows (recorded failures) | 4 | (5) backfill / closing-line / reference-prices / parser-audit impact ranks 1–4 |
| truncated/capped | several | (8) NHL gamecenter truncated (25 rows written, cap applied); (6) truncation metadata on Novig 27k chars |

## 4. Identity-join assessment

- (6): **null — 0 rows.** Wikidata SPARQL 502 meant no GSIS/PFR/ESPN/Sleeper external-ID proof.
- (7): **8 rows, sparse cross-sport.** 2 NHL (`nhl_player_id`), 2 Kaggle tracking keys, 2 NBA (game + player), 1 MLB game, 1 FBref match — key names only, no unified NFL mapping.
- (8): **40 rows, the only real NFL join.** GSIS + PFR + Sleeper + ESPN IDs per player (e.g. Rodgers `00-0023459 / RodgAa00 / 96 / 8439`) sourced from nflverse `roster_2024.csv`. Directly reusable for GSE NFL entity resolution.
- **Coverage fraction: 48 join rows / 83 manifest URLs (f6+f7+f8) = 0.5783.** Per-file: 0/18, 8/53, 40/12 (f8 joins exceed its manifest because they ride one roster CSV).

## 5. Kalshi 404 finding

`https://api.elections.kalshi.com/trade-api/v2/series/{KXNFL,KXNBA,KXMLB}/markets` all return 404 with exact body `404 page not found` (logged 2026-09-11T02:55:25Z). A 4th Kalshi docs URL (`docs.kalshi.com/api-reference/market/get-candlesticks`) also 404'd in (1) logs. **The elections subdomain series path is dead — do not build on it.** Working alternative confirmed in the same cluster: main `api.elections.kalshi.com`... no — main `trade-api/v2` market path (`KXNFLENDSTREAK-40NYJ-2627/candlesticks`, 81 daily samples, OHLC yes_bid/yes_ask + volume + open interest) plus `kalshi-open-events/markets` raw captures. Rule: use trade-api event/market endpoints, never the `/series/{TICKER}/markets` elections-subdomain form.

## 6. nflverse usability

Catalog-rich, data-poor. (1) catalogs datasets (trades/teams/schedules/stats_team, CC-BY-4.0) with release URLs; (2) enumerates 7 release tags (injuries, depth_charts, snap_counts, nextgen_stats, players, rosters, pbp) and 136 assets — **metadata only, no data bytes**. (5) fetched `github.com/nflverse` + releases pages but got login-chrome HTML (200, 0 normalized rows); only 4 hand-normalized player rows from a single PFR boxscore exist. **Verdict: usable iff re-extracted via direct release-asset download (e.g. `roster_2024.csv`, pbp/injury parquet) — (8) proves this path works (40 joins from one roster CSV). Current normalized yield (4 rows, 1 game, 2025-09-04 only) is not calibratable.**

## 7. Cross-file synthesis

Only three sources corroborate across files: nflverse releases ((1) catalog, (2) 136 assets, (5) fetch attempt, (8) roster CSV joins), Kalshi (working candlesticks in (1) vs dead series endpoints in (2)), and Polymarket (live snapshot prices in (6) vs unconfirmed Gamma API in (2)). Everything else is single-file. The cluster's calibration-ready core is: Olympus own track record (542 rows) + Kalshi candlesticks + Smarkets events + OurLads depth (423 players) + Action Network spreads + nflverse roster joins. The closing-line archive is the thinnest leg: 1 cross-referenced line, no backfill.

---

### (a) Caveats (as fractions)

- Normalized yield vs fetched surface: **5 rows written / 19 manifest URLs in (5) = 0.263 per-URL; 5 rows / 38 raw_responses in (2)-scope ≈ 0.13** — most bytes never became tables.
- Unconfirmed provenance: **24/38 raw_responses in (2) = 0.632** carry "NOT CONFIRMED source URL".
- Identity coverage: **48/83 = 0.5783** overall, but NFL-grade joins only in (8): **40/48 = 0.8333** of join rows; (6) contributes **0/18 = 0**.
- Closing-line depth: **1 game / full-season need ≈ 0** for practical purposes; reference prices **0/2 targets = 0**.
- Football-data.co.uk: **3/3 blocked = 1.0** — zero CSV bytes.
- Sportsbook schemas: **0/4 confirmed = 0** (DK 403, rest unconfirmed).
- Prediction-market history: Polymarket **0/9 contracts with history = 0**; Kalshi history usable on **1/1 sampled market = 1.0** but only one market sampled.
- Auth-gated registry: **21/46 = 0.4565** of (4) sources need keys; guide-only, no live quotes captured anywhere in-cluster.

### (b) GSE action reads

1. **Calibrate against Olympus own 542-row history + Kalshi candlestick shape now** — only two history-grade assets in-cluster; don't wait for the backfill.
2. **Join everything NFL through the (8) 40-row GSIS/PFR/Sleeper/ESPN map** and extend it via the proven roster-CSV path before any other identity work.
3. **Treat exchange snapshots (Polymarket 9, Action Network 6) as features, not labels** — no history attached; pair with Smarkets event feed for continuity.
4. **Price the Pinnacle-Apify route ($6.23/1k matches) as the closing-line backfill** — free sources (OddsPortal, SportsOddsHistory renders, Betfair) all failed in this crawl.
5. **Never build on elections-subdomain series URLs or football-data.co.uk CSV links** — both deterministically dead/blocked here; use trade-api events and alternate soccer closings.
6. **Gate any nflverse claim on direct asset download** — release-page HTML yields zero rows; roster CSV already proven.

### (c) Re-extraction targets (priority order)

1. nflverse release assets direct (pbp 2024–25, injuries, rosters, nextgen) — unlocks backfill + joins; impact 1.
2. Kalshi trade-api events/markets pagination + multi-market candlesticks (not series path) — history labels; impact 1.
3. Polymarket Gamma API with correct params + recipient token flow — history + token IDs; impact 2.
4. Pinnacle-Apify boards pre-kickoff + SportsOddsHistory alternate render — closing archive beyond 1 game; impact 2.
5. SportsDataIO with key (BettingMarket history) + one Odds-API-family key — live + historical lines; impact 2.
6. football-data.co.uk with session/cookies or mirror — soccer closings; impact 3.
7. Wikidata SPARQL retry (identity IDs) + NFL.com transactions alternate — joins + availability; impact 3.
8. DraftKings/FanDuel/BetMGM/Caesars schema endpoints with headers/session — sportsbook props; impact 4.
9. PFR season tables (2025 passing/games) normalization — extends 4-row sample; impact 2.
10. Betfair historical + Pinnacle matchup page with auth/session — reference prices from 0; impact 3.
