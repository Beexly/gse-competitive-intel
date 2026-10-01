# 20,000-foot assessment — are we moving toward a world-class finish line? (2026-09-09 03:00 UTC)

Measured against: GSE_BLUEPRINT v3 §11 build order (the plan the 309-dossier corpus produced), LAUNCH/00
"do not ship" list, the three extract files the founder uploaded, the truth surface at 02:08 UTC, and the
28-repo leverage read (`data/extracted/repo-leverage-2026-09-09.md`). Every line traces to a command or file.

## 1. Verdict

**Trust layer: world class, and it just proved it.** Receipts, hash recompute, proof API, llms.txt,
auto-published grades and misses, and tonight an automatic un-publish when ECE crossed the floor. No
competitor in the corpus does this (blueprint §6c/e: 0 of 309 publish their own edges; 2 of 309 ship
llms.txt). The 02:08 UTC RED was the product keeping its own promise.

**Product wedge: not built.** Blueprint §11 item 1, the thing the whole corpus says wins, is
"correlation-adjusted edge engine, visible math, BOTH rails (sportsbook + prediction market)". On main
tonight: correlation exists only as a teaching ticket in Parlay MRI (`apps/web/lib/parlay/parlay.ts:47`,
"a 5-leg illustrative ticket"), not as correlation-adjusted edges on real picks; the second rail (Kalshi)
is coded but unreachable (HP-16); and the NFL board has 0 moneylines and 0 totals on 2 fixtures.
We are shipping an honest scoreboard for a game we are not yet fully playing.

**Trajectory:** correct direction, wrong load balance. The last four hours put an Opus session on
line-integrity remediation (PR #733, four Devin rounds, $45) and three agents on docs and audits, while
the two items that change what a user sees before kickoff (HP-14 v5.2.8 moneylines/totals, HP-16 second
book) sit with Hermes, unstarted. World class is a product property, not a ledger property.

## 2. Timeline correction

NFL Week 1 opener is Thursday 2026-09-10 evening US (Agent 5's data doc: SF@LAR 2026-09-11T00:35Z; the
board's 72h window holds 2 NFL fixtures). From 03:00 UTC 2026-09-09 that is about 45 hours, not "less
than 24". It changes nothing about urgency and one thing about physics: the calibration streak needs
three consecutive GREEN six-hourly runs (18 hours minimum after ECE clears), so PROVEN before kickoff is
possible only if ECE clears by ~06:00 UTC 2026-09-10, and nothing tonight moves ECE.

## 3. What the three extract files are worth (read, not assumed)

| file | dossiers | real formula snippets | pricing rows | build items |
|---|---|---|---|---|
| extractdata20260908.json | 50 | 0 (every `extracted_formulas` is the string "NOT CONFIRMED") | 0 | 51 paths like `/gse/providers/sabersim.py`, none exist in Sports |
| extractdata20260908_1.json | 21 | 0 | 0 | 21 paths, several to files that do not exist (`packages/simulation/src/football-sim.ts`) |
| extractdata20260908_2.json | 30 | 12 (rotogrinders, stokastic, sabersim, props.cash, oddsjam, rithmm, unabated) | 6 | 10 distinct, 22 of 33 are the same filler line (`app/api/picks/route.ts`) |

Two of the five uploads are byte-duplicates. Net new intelligence in the extracts: six competitor
price ladders (OddsJam $79.99–$499.99/mo, SaberSim $97–$297/mo, Rithmm $29.99–$99.99/mo, props.cash
$19.99/mo, Unabated $99–$199/mo) confirming our $14.99/$24.99 founding rate sits at the bottom of the
market on purpose (pain item 1 of 147 is pricing resentment), plus three mechanism hints (Stokastic
"leverage" = sim exposure minus field ownership; SaberSim correlation slider; props.cash correlated
props). Do not build from these files; the repo's `dossiers/`, MASTER_MATRIX and GSE_BLUEPRINT are the
sources, and they are far richer.

## 4. Missing, under-leveraged, forgotten (ranked by what changes for a user)

1. **The wedge has no owner.** Correlation-adjusted, dual-rail edges with visible math. Nearest assets on
   main: `lib/projections/correlation` (used by Parlay MRI), the market-anchored p, the Kalshi book.
   Open a work package: "same-game correlation shown on every multi-leg suggestion, and every NFL edge
   shown next to the Kalshi contract price." Hermes after HP-16. This is the headline for the launch
   announcement and it is the one thing the corpus says nobody else has.
2. **Age gate still blocks Googlebot on money pages** (`/picks`, `/pricing`, `/performance` → 307 to
   `/age-verify` for a Googlebot UA, measured 02:58 UTC). LAUNCH/00 P1-4 has been a founder call since
   22:20 UTC yesterday. Blueprint §11 item 3 (programmatic SEO) cannot start until this is decided.
   Recommendation: verified-crawler exemption by reverse DNS, plus the facts-only stats routes already
   decided for Agent 3. `/parlay-mri` returns 200, so the exemption pattern already exists.
3. **NFL moneylines and totals** (HP-14). Not started. Without it the Week 1 board is spreads only.
4. **Second book** (HP-16 step 0 is a cadence fix on a path already coded and licensed).
5. **Free realtime feed** (blueprint §11 item 4: odds + injuries + PM prices over SSE). Nobody owns it;
   the inputs are verified free (Sleeper, NWS, ESPN injuries, nflverse, Rundown-Kalshi).
6. **Distribution to agents**: llms.txt is live, but GSE is not in `machina-sports/sports-skills`
   (MIT, lists Hermes Agent and Claude Code as hosts). A read-only `gse` skill over the public proof and
   truth APIs is a one-file PR and puts the receipts in every agent's toolbox. Same for an MCP server
   (edgefinder-cli sells one at $20–150/mo).
7. **P2 hygiene still open**: `news-sitemap.xml` is 170 bytes and declared in robots.txt; `/academy`
   placeholder text (LAUNCH/00 P2-5, P2-6). P0-1 (ai.txt) and P0-2 (entryOdds write guard,
   `process-sport.ts:1293`) are fixed on main.
8. **Founder-only items still open**: rotate the exposed Hermes credentials (R-1); the age-gate
   decision above; the two public flips (blocked by data now).
9. **Capacity**: the weekly usage limit resets 2026-09-15. Hermes is free and unstarted. Cloud
   sessions should merge, verify and review; Hermes should write the code. Tonight it was the reverse.

## 5. What is genuinely world class already (keep, do not touch)
- Commitments not timestamps (competitors edge-record and gridiron-prophet sell timestamps).
- Auto-unpublish on floor breach, exercised for real at 02:08 UTC.
- The measured doctrine: market-anchored p, edge only on positive market-relative e, and now outside
  evidence (nfl-edge-finder, n 3,151: blend weight on a rating model 0.0) that the doctrine is right.
- Rights-gated ingestion with a registry and clearance checks; free spine with a paid supplement.

## 6. Order for the next 45 hours (one list, no compression)
1. Hermes HP-14 (moneylines/totals on edge) → HP-16 step 0 (Rundown-Kalshi cadence) → HP-16 A–D.
2. Founder: age-gate decision (item 2). Then Agent 3's facts-only exemption ships.
3. Merge train continues one PR per cycle with deploy checks (#733 when its last red clears, #734,
   #736, #737, then the drafts).
4. Wedge work package written and handed to Hermes as HP-17 (correlation + dual rail, visible math).
5. Announcement copy (HP-12) leads with receipts and the un-publish story, never a number.
