# Cluster D — 09-08 ingestion dossier

## 1. Per-file counts
| file | bytes | sha256 | domains | repos | targets | notes |
|---|---|---|---|---|---|---|
| extract-data-2026-09-08.json | 193554 | cd20050d…3dd1eb | 50 (49 unique; sleeper.com ×2) | 1 (Beexly/Sports) | 50 | full citations variant; NO api_intelligence field |
| extract-data-2026-09-08 (1).json | 87972 | 9f4918d0…7507fe7 | 21 | 25 | 9 | full citations variant; NO api_intelligence field |
| extract-data-2026-09-08 (2).json | 36857 | 3b895385…27683742 | 30 | 8 | 0 (no discovered_targets key) | no-citations variant; api_intelligence present but all empty |
| extract-data-2026-09-08 (3).json | 7998 | c16ea302…9f21d5a7 | 1 (oddsjam.com) | 0 | 0 | single-domain deep dive |
| extract-data-2026-09-08 (4).json | 7998 | c16ea302…9f21d5a7 | 1 (oddsjam.com) | 0 | 0 | single-domain deep dive |

## 2. Dupe verification (3)==(4)
- byte counts: 7998 == 7998; byte-identical: True (Python bytes equality).
- sha256(3) = c16ea3024e8bd7fa5cf14967dfbeb795a82847c68c6f4d01d1f8120d9f21d5a7
- sha256(4) = c16ea3024e8bd7fa5cf14967dfbeb795a82847c68c6f4d01d1f8120d9f21d5a7 — match.
- Parsed JSON key sets identical: domain, domain_citation, extracted_formulas, api_intelligence, pricing_ios(_citation), pricing_android(_citation), product_limit(_citation), customer_pain, data_supply_chain, discovery_metadata. Spot-checked formula + endpoint values equal.
- Disposition: ingest (3) once; drop (4) as exact dupe. Counted as f3(+f4 dupe) in sources.

## 3. Dedup / overlap (what is NEW vs overlapping)
- Unique domains across 5 files: 66 (f0 49 unique + f1 21 + f2 30 + f3 oddsjam; overlaps absorb the rest).
- f0∩f2 = 27 domains (core DFS/betting set re-extracted in no-citations variant: sabersim, stokastic, fantasylabs, rotogrinders, oddsjam, unabated, props.cash, rithmm, …). f0∩f1 = 4 (rotowire, teamrankings, numberfire, actionnetwork). f1∩f2 = 7 (rotowire, teamrankings, numberfire, actionnetwork, covers, wagertalk, betql).
- NEW in f1 vs f0/f2: ~14 (fantasyfootballers.org, thescore, sportsnet, cbssports/fantasy, fbsim, openfootball.github.io, floodlight.ai, sportsdata-mcp, espn-odds-scraper, sportsvault, fanlabs, draft.com, pinnacle, sportradar).
- NEW in f2 vs f0: ~3 net (covers, wagertalk, betql overlap f1; otherwise f2 ⊂ f0∪f1 except normalization).
- Unique repos: 26 (raw 1+25+8=34; −6 f1∩f2 incl. case-merged QuantLib/Quantlib, −1 f0∩f1 Beexly, −1 f0∩f2 Beexly). Beexly/Sports is the only repo in all three.
- Discovered targets: 59 raw → 58 unique (single overlap: rotowire subscribe URL in f0+f1). f2/f3/f4 carry no discovered_targets.
- Deduped target rows (targets.json): 105 = 66 domains + 26 repos + 13 uncovered discovered-URLs.

## 4. Consolidated API intel (api-intel.json, 14 rows; 8 confirmed endpoints, all OddsJam)
| domain | endpoint | status |
|---|---|---|
| oddsjam.com | https://oddsjam.com/api/build-time | CONFIRMED public JSON route |
| oddsjam.com | https://oddsjam.com/api/backend/sportsbooks?state=NJ | CONFIRMED public JSON route |
| oddsjam.com | https://oddsjam.com/api/backend/detect_state | CONFIRMED public JSON route |
| oddsjam.com | https://oddsjam.com/api/backend/auth/user | CONFIRMED public JSON route |
| oddsjam.com | https://oddsjam.com/api/backend/learncenter?categoryName=Updates&first=1 | CONFIRMED public JSON route |
| oddsjam.com | https://oddsjam.com/api/backend/promotions?state=NJ | CONFIRMED public JSON route |
| oddsjam.com | POST https://oddsjam.com/api/backend/e | CONFIRMED public JSON route |
| oddsjam.com | POST https://oddsjam.com/api/backend/user/increment-one-click-bet-count | CONFIRMED public JSON route |
| oddsjam.com | GET /api/build-time -> {buildTime} | CONFIRMED sample response |
| oddsjam.com | /openapi.json, /swagger.json | NOT CONFIRMED (returns HTML shell) |
| oddsjam.com | /graphql + api-dev GraphQL URI in bundle | NOT CONFIRMED (403, no introspection) |
| oddsjam.com | SharpSports https://api.sharpsports.io/v1/context (in homepage JS config) | UNLABELED supplier; VERIFY |
| 30x f2 domains (fantasylabs..betql) | (none exposed) | NOT CONFIRMED endpoints=[] schema=NOT CONFIRMED (30/30) |
| 50x f0 + 21x f1 domains | (field absent) | NOT COLLECTED; re-extract |

Top API intel rows: (1) GET /api/backend/sportsbooks?state=NJ — book list; (2) GET /api/backend/detect_state — geo gating; (3) GET /api/backend/auth/user — auth/session; (4) GET /api/backend/learncenter + /promotions?state=NJ — content/promo feeds; (5) POST /api/backend/e + POST …/increment-one-click-bet-count — event/bet-count telemetry; (6) GET /api/build-time → {"buildTime":"2026-09-04T17:17:47.985Z"} — only confirmed sample response. OpenAPI/GraphQL NOT CONFIRMED (HTML shell / 403). SharpSports api.sharpsports.io/v1/context appears in homepage JS config, unlabeled as supplier — VERIFY, do not assert partnership. All 30 f2 domains: endpoints=[] / schema NOT CONFIRMED. f0/f1: no api_intelligence field at all — re-extract.

## 5. Target table with disposition (105 rows; BUILD 18 / VERIFY 56 / WONT-DO 31)
| target | kind | sources | disp | why |
|---|---|---|---|---|
| 4for4.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| actionnetwork.com | domain | f0,f1,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| awesemo.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| betalgo.com | domain | f0 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| betql.com | domain | f1,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| betr.com | domain | f0 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| betstamp.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| bettingpros.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| cbssports.com/fantasy | domain | f1 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| covers.com | domain | f1,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| crazyninjaodds.com | domain | f0 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| dailyroto.com | domain | f0 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| dfsarmy.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| dimers.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| draft.com | domain | f1 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| drafters.com | domain | f0 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| draftkings.com | domain | f0 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| espn-odds-scraper.com | domain | f1 | VERIFY | default: needs re-extract to confirm formula/API/pricing |
| espn.com | domain | f0 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| espn.com/fantasy | domain | f0 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| establishtherun.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| fanduel.com | domain | f0 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| fanlabs.com | domain | f1 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| fantasy.nfl.com | domain | f0 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| fantasycruncher.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| fantasyfootballers.org | domain | f1 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| fantasyguru.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| fantasylabs.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| fantasylife.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| fantasypros.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| fbsim.com | domain | f1 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| floodlight.ai | domain | f1 | BUILD | open data/MCP/schedule adapter with attribution; low-cost coverage |
| football.fantasysports.yahoo.com | domain | f0 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| juicereel.com | domain | f0 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| linestar.com | domain | f0 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| lineuplab.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| nfl.com | domain | f0 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| numberfire.com | domain | f0,f1,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| oddsjam.com | domain | f0,f2,f3(+f4 dupe) | BUILD | arb/EV math is standard textbook + 8 verified public endpoints; re-implement, don't copy bundle |
| openfootball.github.io | domain | f1 | BUILD | open data/MCP/schedule adapter with attribution; low-cost coverage |
| outlier.bet | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| ownit.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| parlayplay.com | domain | f0 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| pikkit.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| pinnacle.com | domain | f1 | VERIFY | default: needs re-extract to confirm formula/API/pricing |
| prizepicks.com | domain | f0 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| propfinder.app | domain | f0 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| props.cash | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| propsai.com | domain | f0 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| rithmm.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| rotogrinders.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| rotowire.com | domain | f0,f1,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| sabersim.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| sharpsports.com | domain | f0 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| sleeper.com | domain | f0 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| sportradar.com | domain | f1 | VERIFY | default: needs re-extract to confirm formula/API/pricing |
| sportsdata-mcp.com | domain | f1 | BUILD | open data/MCP/schedule adapter with attribution; low-cost coverage |
| sportsnet.com | domain | f1 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| sportsvault.com | domain | f1 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| stokastic.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| teamrankings.com | domain | f0,f1,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| thescore.com | domain | f1 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| unabated.com | domain | f0,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| underdogfantasy.com | domain | f0 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| wagertalk.com | domain | f1,f2 | VERIFY | mechanism known, formulas/pricing NOT CONFIRMED; re-extract before building |
| yahoo.com | domain | f0 | WONT-DO | league platform or media surface; no reusable GSE primitive |
| https://github.com/augur/augur | repo | f1 | WONT-DO | out of scope: prediction-market infra / finance lib |
| https://github.com/balldontlie/nba-api | repo | f2 | BUILD | open-source ingestion adapter with license/attribution guard |
| https://github.com/Beexly/Sports | repo | f0,f1,f2 | BUILD | GSE self-reference; internal calibration/supply-chain/CLV work |
| https://github.com/cfb-data/collegefootballdata | repo | f1,f2 | BUILD | open-source ingestion adapter with license/attribution guard |
| https://github.com/edge-scanner/edge-scanner | repo | f1 | WONT-DO | rate-limited or unknown surface; no confirmed algorithm; re-extract first if revisited |
| https://github.com/espn-odds-scraper/scraper | repo | f1 | VERIFY | needs README/license confirmation |
| https://github.com/fbsim/core | repo | f1 | WONT-DO | rate-limited or unknown surface; no confirmed algorithm; re-extract first if revisited |
| https://github.com/ffanalytics/ffanalytics | repo | f1 | BUILD | open-source ingestion adapter with license/attribution guard |
| https://github.com/floodlight/framework | repo | f1 | VERIFY | needs README/license confirmation |
| https://github.com/gnosis/gp-v2 | repo | f1 | WONT-DO | out of scope: prediction-market infra / finance lib |
| https://github.com/lean/lean | repo | f1 | WONT-DO | out of scope: prediction-market infra / finance lib |
| https://github.com/mlb-stats-api/mlb-statsapi | repo | f1 | BUILD | open-source ingestion adapter with license/attribution guard |
| https://github.com/nba-api/nba_api | repo | f1 | BUILD | open-source ingestion adapter with license/attribution guard |
| https://github.com/nflverse/nfl_data_py | repo | f1,f2 | BUILD | open-source ingestion adapter with license/attribution guard |
| https://github.com/openfootball/football | repo | f1,f2 | BUILD | open-source ingestion adapter with license/attribution guard |
| https://github.com/PostPick/PostPick | repo | f1 | WONT-DO | rate-limited or unknown surface; no confirmed algorithm; re-extract first if revisited |
| https://github.com/pybaseball/pybaseball | repo | f1,f2 | BUILD | open-source ingestion adapter with license/attribution guard |
| https://github.com/Quantlib/Quantlib | repo | f1,f2 | WONT-DO | out of scope: prediction-market infra / finance lib |
| https://github.com/sleeper/analytics-suite | repo | f1 | WONT-DO | rate-limited or unknown surface; no confirmed algorithm; re-extract first if revisited |
| https://github.com/socialpredict/socialpredict | repo | f1 | WONT-DO | rate-limited or unknown surface; no confirmed algorithm; re-extract first if revisited |
| https://github.com/sports-odds-monitor/odds-monitor | repo | f1 | WONT-DO | rate-limited or unknown surface; no confirmed algorithm; re-extract first if revisited |
| https://github.com/sportsdata-mcp/sportsdata | repo | f1 | BUILD | open-source ingestion adapter with license/attribution guard |
| https://github.com/sportsreference/sportsreference | repo | f1 | BUILD | open-source ingestion adapter with license/attribution guard |
| https://github.com/sportypy/sportypy | repo | f1 | BUILD | open-source ingestion adapter with license/attribution guard |
| https://github.com/statcast/statcast | repo | f1 | BUILD | open-source ingestion adapter with license/attribution guard |
| https://github.com/the-odds-api/client | repo | f1,f2 | BUILD | open-source ingestion adapter with license/attribution guard |
| https://betiq.teamrankings.com/ | discovered-url | f1 | VERIFY | pricing/research subpath; confirm before build |
| https://betiq.teamrankings.com/articles/nfl-preseason-rankings-methodology/ | discovered-url | f0 | VERIFY | pricing/research subpath; confirm before build |
| https://betql.co/pricing/annual | discovered-url | f1 | VERIFY | pricing/research subpath; confirm before build |
| https://draftwizard.fantasypros.com/football/draft-assistant/ | discovered-url | f0 | VERIFY | tool/calculator subpath; confirm formula + citation |
| https://footballcsv.github.io/ | discovered-url | f1 | VERIFY | pricing/research subpath; confirm before build |
| https://github.com/topics/pydfs-lineup-optimizer | discovered-topic | f1 | VERIFY | topic page; enumerate concrete repos before build |
| https://github.com/topics/sportsdataverse | discovered-topic | f1 | VERIFY | topic page; enumerate concrete repos before build |
| https://help.yahoo.com/kb/fantasy-death-leagues-overview-sln37116.html | discovered-url | f0 | VERIFY | tool/calculator subpath; confirm formula + citation |
| https://openmundi.github.io/ | discovered-url | f1 | VERIFY | pricing/research subpath; confirm before build |
| https://pick6.draftkings.com/ | discovered-url | f0 | VERIFY | tool/calculator subpath; confirm formula + citation |
| https://poolgenius.teamrankings.com/ | discovered-url | f1 | VERIFY | pricing/research subpath; confirm before build |
| https://support.espn.com/hc/en-us/articles/115003847231 | discovered-url | f0 | VERIFY | tool/calculator subpath; confirm formula + citation |
| https://support.nfl.com/hc/en-us/articles/35869720023060-League-Settings | discovered-url | f0 | VERIFY | tool/calculator subpath; confirm formula + citation |

## 6a. Caveats (fractions)
- Formulas NOT CONFIRMED: f0 42/50 domains; f1 21/21; f2 23/30. Only 8/50 f0 + 7/30 f2 carry any formula-like signal, and all except OddsJam-calculateArbitrage are prose reconstructions (leverage, EV ranking, correlation slider) without weights.
- Pricing NOT CONFIRMED: f2 29/30 (only unabated $99/mo / $799 seasonal price strings). iOS/Android IAP tiers NOT CONFIRMED everywhere incl. OddsJam (only Apple app-id 6448072108 seen).
- Customer pain NOT CONFIRMED: f2 30/30 (no forum/social complaints captured).
- Repo algorithms NOT CONFIRMED: f1 22/25 (rate-limited GitHub surfaces); f0 0/1 and f2 0/8 carry labels but f2's are one-line role tags ('NBA data API'), not algorithms.
- f0 synthesis top_50_build_priority: 50 rows, ALL feature=NOT CONFIRMED (template filler; effort 1–4d estimates only). Do not quote as findings.
- f0/f1 gse_build_items: provider-stub paths (/gse/providers/<name>.py) with engineer_days ESTIMATE + unlocks NOT CONFIRMED — scaffolding, not evidence.
- oddsjam $1.3B-wagered and 100+-sportsbook claims are vendor self-claims from allowed pages; treat as claims, not verified facts.

## 6b. GSE reads
1. Only re-implementable algorithm in the cluster is OddsJam calculateArbitrage (American→decimal→implied-p→arb test→proportional $1000 stake split). It is textbook math; rebuild from spec, never copy the bundle snippet.
2. Strongest GSE gap per f1 synthesis (credible): calibration/probability semantics (Edge Index 0–100 ≠ win prob, ECE gate), source registry + freshness/failover, raw-odds snapshots + no-vig + line-specific CLV, injury-latency tracking. Build these before new providers.
3. Cheapest coverage: open adapters with attribution — nflverse (MIT code, CC-BY-SA data via FTN), openfootball (public-domain schedules), the-odds-api client, balldontlie/pybaseball/cfb-data, sportsdata-mcp. Medium effort each; supply-chain resilience first.
4. DFS optimizer/sim lane (sabersim/stokastic/fantasycruncher/lineuplab) is the highest-effort build (5–8d per f2 estimates: simulations/correlation/exposure) with zero confirmed weights — keep as VERIFY, do not commit until re-extract yields real constraints.
5. Paid-picks marketplaces (wagertalk/covers/betql) publish records/streaks without calibration controls — cite as claim-governance risk, not inputs.

## 6c. Re-extract targets (priority order)
1. oddsjam.com: confirm /api/backend/* auth requirements + rate limits; verify SharpSports relationship; capture real sportsbooks/promotions payloads.
2. the-odds-api/client + sportsdata-mcp + espn-odds-scraper: confirm live endpoints, schemas, license, freshness/latency.
3. sabersim / stokastic / fantasycruncher / rotogrinders / fantasylabs: contest rules, salary/roster/entry fields, sim counts, correlation mapping — currently prose-only.
4. unabated / outlier.bet / props.cash / rithmm / pikkit / betstamp: EV/fair-prob method, no-vig handling, CLV display — all NOT CONFIRMED.
5. fbsim / floodlight / pinnacle / sportradar / rotowire draft-assistant / fanduel research: mechanism pages fetched but formulas absent; targeted re-extract.
6. Rate-limited f1 repos (sleeper/analytics-suite, fbsim/core, PostPick, edge-scanner, socialpredict, augur/gnosis): README+license only; skip augur/gnosis/QuantLib/Lean (WONT-DO scope).
7. Backfill api_intelligence for all f0/f1 domains (field was never collected) and pricing/pain evidence for f2 (29–30/30 NC).
