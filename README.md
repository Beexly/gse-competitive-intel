# GSE Competitive Intel — Corpus + Launch Kit

One-stop intel repo for Galaxy Sports Edge (GSE): 310 competitor dossiers, raw evidence for
every claim, 550+ OSS code catalogs, and the complete 2026-09-08 launch kit incl. a
production audit of https://www.galaxysportsedge.com.

**START HERE → [`LAUNCH/12-NEXT-AGENT-HANDOFF.md`](LAUNCH/12-NEXT-AGENT-HANDOFF.md)**

> **PII compliance (inherited, 2026-08):** everything here is PII-scrubbed — a competitor owner's
> national ID / DOB were stripped before anything left the source machine. Do not reintroduce
> personal data into this repo.

## Entry points by intent

| You want to... | Read |
|---|---|
| Continue the launch (tonight's blockers, runbook) | `LAUNCH/12-NEXT-AGENT-HANDOFF.md` → `LAUNCH/11-LAUNCH-NIGHT-RUNBOOK.md` |
| Understand what's true about production right now | `LAUNCH/10-RECORD-AUDIT.md` |
| Copy-paste marketing/methodology/SEO strings | `LAUNCH/01` (copy deck), `LAUNCH/02` (methodology), `LAUNCH/08` (SEO) |
| Know the engine's real thresholds & math | `LAUNCH/03` (constants), `LAUNCH/04` (metrics canon), `ENGINES-MATH-CALIBRATIONS-RESEARCH.md` |
| Find a data source (keyless / free tier) | `LAUNCH/05-DATA-SOURCES-STACK.md`, `LAUNCH/NEW-DATA-SOURCES-2026-09-08.md` |
| Research a competitor | `dossiers/<domain>.json` (310), index in `MASTER_MATRIX.md` / `queue.json` |
| Reuse OSS code patterns (license-checked) | `codes/` (550+ catalogs), license noted per catalog |
| Audit any claim to primary evidence | `raw/` (1,600+ files; launch audit under `raw/prod-launch-audit-2026-09-08/`) |

## Layout

- `LAUNCH/` — 15 launch-kit docs (00–12) + research files + evidence JSONs. Self-contained; has its own read-order.
- `dossiers/` — one JSON per competitor domain, protocol-defined schema, `NOT CONFIRMED` where evidence lacking.
- `raw/` — immutable primary evidence: HTTP captures, sitemaps, JS bundles, API samples, audit dumps, child-agent transcripts.
- `codex-work/` — curated, secret-free Codex EV code + design docs + Sports-OS doctrine (extend, don't rebuild: devig/edge, quarter-Kelly, Poisson, `evidence-readiness-matrix` True-EV gate).
- `gse-competitive-intel/` — runnable FantasyGuru/FantasyPros engines (`nfl_engine.py`, `nfl_scheme_defense.py`, `gse_engine.py`), precomputed NFL feature CSVs, SMASH/BURR/Solds methodology.
- `.firecrawl/` — crawler config for August-era sitemap captures.
- Root `_*.md` files — earlier (August) wave intel: `_HANDOFF-to-coding-agent.md` is the original NFL/MLB EV build spec (Phase 0→4; nothing gets a public number until the shuffled-time placebo test drives CLV to ~0); `_gse-edge-lab-final.md` is the quant core; `_MASTER-gse-strategic-dossier.md` / `_gse-domination-capstone.md` strategy; `*-teardown-final.md` + `*-verified-playbook.md` competitor exploits.
- `codes/` — harvested OSS repo catalogs (algorithm, license, reusable logic, file citations).
- `MASTER_MATRIX.md` (+ `.json`) — cross-competitor aggregate. `GSE_BLUEPRINT.md` — strategy v3. `PHASE4_GAPS.md` — gap analysis. `queue.json` — 765-target ledger, fully accounted.

## Rules (non-negotiable, inherited from the protocol)

1. **Never fabricate.** Every claim cites a file in `raw/` or a URL; missing evidence = `NOT CONFIRMED`.
2. **`raw/` is append-only.** Audit artifacts and transcripts are frozen evidence; correct forward, never rewrite.
3. **Child-agent outputs are claims, not facts.** Verify against `raw/` citations before relying on them (twice in 2026-09, research subagents died at iteration caps before writing deliverables; salvage procedure is documented in `LAUNCH/12`).
4. Product repo is `Beexly/Sports` — this repo is intel only; never wire to production code.

## State

- Corpus: 310/310 dossiers (247 live / 8 dead / 55 walled), queue 765 fully accounted, 0 unset.
- Launch audit (2026-09-08): Proof API verified (1,111 receipts, sha256 recompute MATCH), 3 P0 blockers on record, publication correctly OFF. Details + reproduce-steps in `LAUNCH/10`.
