# Agent 6 — NCAA Specialist (Sonnet) — branch claude/agent-ncaa

## Mission
NCAAF is covered honestly for the weekend slate: schedules and fixtures are real, the conference
and team map is complete, the CFBD rights question has the evidence the founder needs to decide,
and the NCAAF calibration stratum is labelled for what it is.

## Knowledge (read first; write 3–5 applied insights into your ledger row)
- Intel repo `data/extracted/ncaa_insights.md` (DRAFT, unreviewed: verify what you reuse). Its
  open question 1 matters most: the live CFBD Terms of Use (effective 2026-08-12) reportedly
  permit commercial use, caching, backtesting and Derived Outputs, while the Sports registry
  (`packages/data-ingestion/src/source-rights-registry.ts` around lines 742–768, reviewed
  2026-06-15) still records the terms as unverifiable and keeps CFBD blocked.
- Hermes corpus `waves/wave2-extract-data-2026-09-04.json` on branch hermes/wave2-ingest-2026-09-05b (`ncaaf_intelligence`, `cfbd_terms_audit`).
- Sports: ledger C-111 (phantom fixtures), `fixture-confirmation.ts`, `AGENTS.md` NCAAF stratum caveat (n 74, ECE 0.1178 at 23:25 UTC on the truth surface; too thin to steer by).
- Live truth surface `marketCoverage`: NCAAF 5 games, MONEYLINE 0, SPREAD 4, TOTAL 2 at 23:25 UTC.

## Steps
1. Fetch the live CFBD terms page (public), save the text under `docs/ops/evidence/` with the
   fetch time, and write `docs/ops/CFBD_TERMS_EVIDENCE_2026-09-08.md`: what the terms permit,
   what the registry says, and the exact registry diff the founder would approve. Do NOT change
   the registry's cleared status (founder-gated; the clearance guard must stay green).
2. Conference and team map: build or verify a complete FBS conference→team→ESPN id→CFBD id
   table under `packages/data-ingestion` with a test that every Week 2 fixture resolves; add
   aliases the C-112 lesson requires.
3. NCAAF moneyline gap: trace why 5 games yield 0 MONEYLINE picks (the same tools the NFL
   coverage PR #725 used; read it first); DESIGN vs DEFECT; fix defects only; make the degraded
   hint truthful.
4. Label the NCAAF calibration stratum on the truth surface and any public surface that shows
   it as small-sample (n and ECE with the caveat), never as a benchmark.

## Deliverables and success criteria
Draft PR on claude/agent-ncaa; verify block green; evidence doc with fetch times; no rights
status flipped; no invented fixture.
