# 05 — DATA SOURCES STACK (launch-ready)
Confirmed spine (already in repo/blueprint) + new finds land in NEW-DATA-SOURCES-2026-09-08.md (research lane, appended below when it returns).

## CONFIRMED SPINE (from GSE_BLUEPRINT.md Part II + repo packages/data-ingestion)
| Source | Role | Cost | Notes |
|---|---|---|---|
| nflverse (nfl-raw / sportsdataverse) | NFL play-by-play, EP/WP reference columns | FREE | repo graded-data backbone; enrichment layer in repo |
| The Odds API | odds/movement | free 500 req/mo | already an adapter in repo; TUNE REFRESH CADENCE for launch night |
| Kalshi public market | independent exchange referee | FREE (public data) | wired as independent fair-value source in edge engine |
| Sleeper (read-only) | league sync for Draft Assistant | FREE | read-only, no writes (launch page says so) |
| penaltyblog (MIT) | devig/DC/arbitrage math reference | FREE | ported into devig oracle, commit-pinned |

## RULES (from repo CLAUDE.md non-negotiables)
1. No fake data — picks sourced from real API data only.
2. No fabricated stats — an unwired model stays unwired (see Poisson note in 03).
3. No stale data — timestamps validated everywhere.
4. Layering doctrine: free public stats first (nflverse/ESPN/NBA/MLB/NHL endpoints), free-tier odds second (The Odds API), B2B feeds only when revenue justifies (PHASE4_GAPS P2).

## SPEND CEILING
$0 at launch. The Odds API 500/mo budget is the only metered resource — set board refresh to conserve (e.g. refresh 4x/day until revenue exists; monitor via cockpit api-costs tiles which already exist in the app).
