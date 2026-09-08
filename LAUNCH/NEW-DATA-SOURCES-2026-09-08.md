# NEW DATA SOURCES — 2026-09-08 (SALVAGED)
PROVENANCE: the research subagent verified everything below via live fetches tonight but hit its
iteration budget before writing its deliverable. Parent rebuilt this file from the child's full
transcript (deleg_4dff7f75) + the parent's own verifications. Items are tagged [CHILD] (verified
by subagent, evidence = transcript) or [PARENT] (verified directly in this session). Negative
results are kept — dead endpoints are launch intel too.

## A. KEYLESS STATS/ODDS ENDPOINTS — ANSWERING 200 TONIGHT
| source | URL | what it gives | verified |
|---|---|---|---|
| ESPN site.web.api NFL scoreboard | https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard | 200356B JSON: 16 events, 16/16 with odds, provider=DraftKings (spread/total incl. over/under close lines+odds) | [PARENT 200] + [CHILD 200, provider breakdown] |
| ESPN same shape, other sports | .../basketball/nba/scoreboard, .../hockey/nhl/scoreboard, .../baseball/mlb/scoreboard, .../football/college-football/scoreboard | all 200 (events=0 for MLB/CFB at check time = off-season/off-day, endpoint healthy) | [CHILD 200 x4] |
| NHL api-web standings | https://api-web.nhle.com/v1/standings/now (also /v1/standings/<date>) | 200, full standings JSON (59,861B) | [PARENT 200] |
| NHL api-web club schedule | https://api-web.nhle.com/v1/club-schedule/NYR/week/now | 200, per-club weekly schedule JSON | [CHILD 200] |
| MLB statsapi schedule | https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=2026-09-07 | 200, official MLBAM JSON w/ copyright+terms link | [PARENT 200] |
| ESPN parameterized scoreboard | site.web.api...scoreboard?week=2&dates=20260903 | 404 — date/week params need different format; use plain endpoint + filter | [CHILD 404] |
| ESPN core API (deeper stats) | sports.core.api.espn.com/v2/... | 404 on tested paths — requires different route structure | [CHILD 404] |
| NBA CDN live data | cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json | 403 — bot-walled from this network | [CHILD 403] |
| NCAA casablanca JSON | data.ncaa.com/casablanca/scoreboard/... | 404 on all tested paths — scheme changed; do not rely | [CHILD 404 x6] |
| OpenF1 (motorsport) | api.openf1.org/v1/... | 404 "No results found" on tested paths — exists but query scheme unconfirmed | [CHILD 404] — see NOT-VERIFIED |
| ClubElo | clubelo.com API paths | timeouts/502 from this network tonight; root 200 | [CHILD] — see NOT-VERIFIED |

## B. FREE-TIER ODDS APIS (terms verified from vendor pages; NOT key-tested — sign-up required)
| vendor | free tier | evidence |
|---|---|---|
| odds-api.io | 100 requests/hour, 500/day cap | vendor's own pricing JSON-LD captured by child [CHILD] |
| oddspapi.io | free tier, no credit card; HISTORICAL odds on free tier (competitors charge for this) | vendor docs captured [CHILD] |
| The Odds API | 500 requests/month free (corpus-known; re-confirmed on site) | corpus + vendor page |
| TheStatsAPI | free trial endpoints, interactive testing on all plans | vendor snippets [CHILD] |

## C. CALIBRATION/SCORING LIBRARIES (PyPI metadata verified [CHILD])
| package | version | license | use for GSE |
|---|---|---|---|
| puncc | 0.9.3 | MIT | conformal prediction (split/normalized) — pairs with repo's conformal-intervals.ts |
| netcal | 1.4.0 | Apache-2.0 | confidence calibration metrics + recalibration methods |
| properscoring | 0.1 | Apache | proper scoring rules (CRPS etc.) beyond Brier |
| scoringrules | 0.11.0 | Apache-2.0 | probabilistic forecast scoring (Brier/CRPS/logscore variants) |
All Python-side; the repo's TS equivalents (metrics/core, calibration/) remain source of truth — these are for offline research notebooks.

## D. GITHUB REPOS (verified via api.github.com [CHILD] / gh [PARENT])
| repo | stars | license | pushed | notes |
|---|---|---|---|---|
| georgedouzas/sports-betting | 783 | MIT | 2026-07-28 | ML betting pipeline: calibration + value selection. Best OSS reference for GSE's lane. |
| PySport/kloppy | 550 | BSD-3-Clause | 2026-09-01 | soccer event/tracking data standardization — ingestion-layer pattern |
| JetQiao/football-prediction-skill | 20 | MIT | 2026-07-27 | Dixon-Coles + odds-value (CN docs) |
| wc2026 (Cup26 AI) | ? | MIT | 2026 | World Cup 2026 predictor, license verified at file level [CHILD transcript] |
| kochlisGit/ProphitBet | — | — | — | 404 at check time [CHILD] |
| opisthokonta/Odds-calculation | — | — | — | 404 at check time [CHILD] |

## E. AGENT-SURFACE (llms.txt) RECON — THE WEDGE IS STILL EMPTY [CHILD]
404 at: docs.manifold.markets/llms.txt, the-odds-api.com/llms.txt, theopenmodel.com/llms.txt,
www.sportsdataverse.org/llms-full.txt. Nobody in this slice ships an agent manifest.
GSE's live Proof-API llms.txt (OpenAPI 3.1 + verification spec) is first-mover territory. CONFIRMED.

## NOT-VERIFIED / DO NOT CITE YET
- OpenF1 correct endpoint scheme (404s may be wrong paths, not a dead API).
- ClubElo API reachability (network-side timeouts tonight, root OK earlier).
- NBA CDN access (403 may be UA/IP-walled only).
- TheStatsAPI actual data coverage breadth (only free-trial marketing captured).
- Full agent-surface sweep breadth (transcript truncated mid-section).
