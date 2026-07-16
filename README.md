# GSE Competitive Intel + NFL EV Build Knowledge

Private research + build package for the **Galaxy Sports Edge** NFL/MLB expected-value ("Glass
Ledger + Edge Engine") work. Everything here is **PII-scrubbed** — a competitor's owner's national
ID / DOB were stripped before anything left the source machine; do not reintroduce personal data.

## Read order (for the coding agent)

1. **`_HANDOFF-to-coding-agent.md`** — the self-contained build spec. Mission, non-negotiable
   guardrails, the strict Phase 0→4 sequence, math specs, data contracts, acceptance tests. Start here.
   *(It's multi-sport: NFL + MLB from day one, sport-agnostic engine — §6.)*
2. **`codex-work/README.md`** — **what Codex already built.** Read this before writing engine code so
   you extend the existing `prediction-engine` (de-vig/edge, quarter-Kelly, Poisson, and the
   `evidence-readiness-matrix` True-EV gate) instead of rebuilding it.
3. **Depth, on demand:**
   - `_gse-edge-lab-final.md` — the quant core (calibration, conformal edge-gate, fractional-Kelly,
     walk-forward, placebo leak test).
   - `_MASTER-gse-strategic-dossier.md` / `_gse-domination-capstone.md` — strategy / positioning.
   - `_scores24-teardown-final.md`, `_fantasypros-teardown-final.md` + the `*-verified-playbook.md`
     files — competitor teardowns and the exploits to design around.
   - `gse-competitive-intel/` — runnable FantasyGuru/FantasyPros engines (`nfl_engine.py`,
     `nfl_scheme_defense.py`, `gse_engine.py`), precomputed NFL feature CSVs, and exact
     SMASH/BURR/Solds methodology.
   - `codex-work/` — curated, secret-free Codex EV code + design docs + Sports-OS doctrine.

## First move
Per the handoff, Phase 0 is the **leak-free data foundation**, and **nothing gets a public number
until the shuffled-time placebo test drives CLV to ~0.** Explore the existing substrate (the Codex
`prediction-engine`, the calibration runtime, the NFL world-model) and report before building.

## Guardrails (from the handoff — do not violate)
Fire/rank on calibrated **edge `e = p − q`**, never confidence · no fabricated performance numbers
(realized, out-of-sample, Wilson-bounded + CLV only) · no leakage of closing-line/post-decision data
into features · no affiliate / no real-money / free-skill only · licensed/free-legal data only · ship
inert/founder-gated (don't flip live switches or bump MODEL_VERSION).

## Provenance & PII
`_INDEX-for-nfl-session.md` and `_MANIFEST.txt` are source-only navigation aids (not in this export).
Personal data on a competitor's owner was excluded/redacted throughout; the only person-name that
appears is a company owner's public business-registry name, in the teardown analysis.
