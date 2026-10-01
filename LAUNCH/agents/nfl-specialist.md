# Agent 5 — NFL Specialist (Sonnet) — branch claude/agent-nfl

## Mission
NFL Week 1 is complete and honest on every surface before kickoff: rosters, depth charts,
injuries, schedule, and the odds coverage the board depends on, with every gap either fixed or
labelled truthfully.

## Knowledge (read first; write 3–5 applied insights into your ledger row)
- Intel repo `data/extracted/nfl_insights.md` (DRAFT, unreviewed: verify any number you reuse at its citation; fix a wrong citation in place and say so in your PR).
- `LAUNCH/05-DATA-SOURCES-STACK.md`, `LAUNCH/NEW-DATA-SOURCES-2026-09-08.md` (keyless sources verified 200 tonight), `LAUNCH/03-ENGINE-CONSTANTS-REFERENCE.md`.
- Sports: `AGENTS.md` notes of 2026-09-05/06 (Week 1 board decisions, C-104, C-107 after 2026-09-13), ledger rows C-95, C-96, C-244 (satellite ingests ran never), C-213 (basis gate), C-111 (phantom fixtures), C-135 (one-book-set).
- Live: `curl -s https://www.galaxysportsedge.com/api/ops/public-surface-truth` → `marketCoverage` (23:25 UTC: NFL 6 games, MONEYLINE 0, SPREAD 2, TOTAL 0) and `freeSpine`.

## Coordinate, never duplicate
PR #725 (claude/launch-nfl-week1-coverage) holds the coverage root cause, C-95 and the C-118
verification and is being completed by the Deployment agent; PR #724 holds the keyless
Galaxy/ESPN + Kalshi second book (KXNFLSPREAD/KXNFLTOTAL). Read both branches before touching
the slate or odds path. Your lane is NFL DATA completeness, not the slate gates.

## Steps
1. Measure: for every NFL game in the next 7 days, which data the pipeline holds (schedule row,
   both rosters, depth chart, injury report, NGS, nflverse REG rows for 2026, odds rows per book)
   and which it lacks; write the table to `docs/ops/NFL_WEEK1_DATA_2026-09-08.md` with the
   command or fixture that produced each cell (NOT RUN where you could not).
2. Satellite ingests (C-244): confirm the #720 fix reaches main or port the minimal part; make
   the refresh-player-stats window and the `?mode=full` gating produce rosters, injuries, depth
   charts and NGS for Week 1 on the free path; tests.
3. nflverse: the display season advances to 2026 when REG rows land (`packages/data-ingestion/src/nflverse-season.ts`);
   attribution guard for the CC-BY-SA data; tests.
4. ESPN schedule seed covers every Eastern day in the horizon; the fixture guard never publishes
   on a game ESPN does not list; tests.
5. Kalshi series map: verify `kalshi-series.ts` maps every Week 1 game for KXNFLSPREAD and
   KXNFLTOTAL; add missing team-code aliases with tests (C-112 alias lesson).

## Deliverables and success criteria
- Draft PR on claude/agent-nfl, green verify block, ledger rows claimed and DONE with SHAs.
- The data table shows no NOT RUN cell you could have run, and every gap has an owner.
- No gate, threshold, delta or MODEL_VERSION touched; no invented player, injury or line.
