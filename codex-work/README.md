# Codex Work — Map & Briefing for the NFL EV Coding Agent

**Read this after `_HANDOFF-to-coding-agent.md`.** It tells you what the **Codex** agent already
built for the sports/EV product so you **extend it, not rebuild it**. Everything here is
curated, secret-free, and copied out of the local Codex work-trees. The raw repos, deploy
runbooks, credentials, and personal data were deliberately left out (see "What was excluded").

---

## TL;DR — Codex already built the market/EV skeleton you need

The real code lives in the **Sports monorepo** (`C:\Users\Garrett\Sports`, branch
`sports-intelligence-os-phase-9-ci`) under `packages/prediction-engine/`. Reference copies of the
load-bearing files are in **`prediction-engine-reference/`** here so you can read them even if you
don't have that branch checked out. **Do not reimplement these — diff your Glass Ledger build
against them and reconcile.**

| File | What it already does |
|---|---|
| `scoring.ts` | `americanToImpliedProbability`, `removeVig` (de-vig → fair value), `edge = model fair prob − offered price`, edgeScore 0–100, consensus/depth/volatility components, grades, risk levels. **The market side of your EV metric is here.** |
| `kelly.ts` | Quarter-Kelly staking: `f* = (b·p − q)/b`, fractional-Kelly variance control, confidence≥65 & edge≥50 gates, hard 3-unit cap. |
| `poisson.ts` | Maher-1982 / Dixon-Coles goal-distribution model (joint score matrix, ML + over/under). Soccer-oriented but the method transfers to a distributional independent-probability route. |
| `evidence-readiness-matrix.ts` | **The crown jewel.** A per-factor gating matrix (market odds, line movement, rest/pace, availability, officials, venue/weather, and `model.independentFairProbability` + `model.trueEv`) with per-factor `minTrust`/`minSampleSize`/`maxAge`, activation status, integrity score — and the hard rule that **`trueEv` stays BLOCKED until an independent (non-market) fair-probability model is calibrated on ≥100 settled outcomes.** |

### Why `evidence-readiness-matrix.ts` matters most
It is Codex's implementation of the exact discipline your handoff mandates:
> *"market-derived probability must not masquerade as independent EV; EV math is false precision
> without an independent probability source."*

This is the code-level twin of the handoff's **fire-on-edge-not-confidence** rule and the
**anti-fabrication display guard**. Treat it as the reference implementation of your True-EV gate.

---

## What else Codex shipped (in the Sports repo — you likely already have it)

- **Agent OS runtime** (`handoff/codex/agent-os-runtime/`, `agent-os-max-v3/`) — real, tested code:
  a market/CLV layer (implied + no-vig probability, opening/closing separation, **CLV blocked until
  closing line + result exist**), a **calibration runtime** (Brier / ECE / MCE, confidence buckets,
  model-version grouping, unsettled-season exclusion), a **projection feature registry** (volume
  recency, snap-share stability, injury availability, market closing baseline — all owner-gated),
  an **NFL stat-coverage auditor** (required-vs-implemented gap detection, no scraping), and a
  **GSIS-based historical identity/season-hygiene spine** (GSIS id preferred, name-only blocked,
  team-alias normalization, current season excluded from settled calibration). Design docs for
  each are in **`handoff-docs/`**.
- **FABLE evidence track** (`docs/fable/`) — uncertainty ranking (least-confidence/margin/entropy),
  PSI/KL/chi-square drift checks with football-segment parity, evidence-to-claim ledger, default-deny
  governance. Summary in `handoff-docs/fable-CODEX_FINAL_REPORT.md`.
- **PHASE 9 hardening** — internal-only calibration cockpit (`/cockpit/calibration`), MODEL_VERSION
  freeze (v5.0.0), draft-only / no-auto-publish / no-send guardrail scripts wired into CI. See
  `handoff-docs/PHASE_9_REPORT.md` and `V6_HANDOFF.md`.

**Deploy state (as Codex left it):** `galaxysportsedge.com` is a **silent launch** — every trust gate
OFF (`PUBLIC_PICKS_ENABLED`, `PERFORMANCE_STATS_ENABLED`, `OUTCOME_LEARNING_ENABLED`, …), paywall off,
Stripe test mode, public EV/Kelly/win-rate intentionally **not surfaced**. Left green locally
(typecheck + build + brand-safety + full web suite). One known blocker: `ANTHROPIC_API_KEY` returned
401 and needs owner rotation (made non-blocking while content is dark).

---

## Folder contents

- **`prediction-engine-reference/`** — the 4 load-bearing EV/staking/gating source files above.
- **`handoff-docs/`** — clean design/methodology docs: market+CLV foundation, calibration runtime,
  projection feature registry, NFL stat-coverage auditor, historical NFL execution hygiene, the
  agent-os and FABLE final reports, PHASE_9 and V6 handoffs.
- **`sports-os-doctrine/`** — the "Sports OS brain" doctrine (not in any repo you have): **Market
  Gravity** (line-movement / model-vs-market disagreement → WATCH/LEAN/PICK/AVOID with forbidden
  sharp-money language), **Source Hierarchy** (6-tier source taxonomy with TTLs; The Odds API = Tier-2,
  no raw-odds redistribution), **Signal Ledger** (pick-lifecycle audit event model), the Intelligence
  Network master plan, and the two-agent operating protocol.

---

## What was deliberately excluded (and where it is)
Kept **local, never published** — do not go looking for these in this repo:
- **Live secrets:** `.codex/.credentials.json`, `.codex/config.toml`, `Sports/.env*`,
  `Documents/Codex/lumera-cloud-secrets/`, `.sandbox-secrets/`.
- **Deploy runbooks** with owner email + Cloudflare/Vercel infra IDs (`CODEX_FINAL.md`,
  `CODEX_*_INFRA_HANDOFF.md`, `LAUNCH_TONIGHT.md`, the `CODEX_HANDOFF*/PICKUP*` set).
- **Personal data** unrelated to the build (a personal legal/HR matter and ID photos inside the
  670MB `codex.claude22.zip`), and the Alter XIV / Lumera repo (`Clouds-bruh/` — not sports).

Provenance: reviewed by a 6-agent read-only audit of every Codex artifact on the machine; only
secret-free, NFL-EV-relevant knowledge was brought across.
