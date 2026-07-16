# ENGINEERING HANDOFF — GSE "Glass Ledger + Edge Engine"
**For:** the GSE Claude coding agent (fresh context — this doc is self-contained)
**From:** the research/strategy pass (2026-07-16), 5 verified workstreams, 156 agents, passive-public + legal only
**Read-first companions (same folder):** `_MASTER-gse-strategic-dossier.md` (strategy), `_gse-edge-lab-final.md` (the quant math + roadmap), `_gse-domination-capstone.md` (why this wins), `_scores24-verified-playbook.md` + `_fantasypros-verified-playbook.md` (competitor exploits), `_competitor-mistakes-lessons.md` (legal/compliance lessons), `_expansion-targets.md` (market map).

---
## 0. WHAT YOU ARE BUILDING (one paragraph)
GSE is a trust-first US sports-prediction product. Its ONE differentiator — the thing no competitor in the category has or can copy — is **the Glass Ledger: a publish-before-kickoff, cryptographically timestamped, independently re-computable public record of the GSE Rating's picks, scored on Closing Line Value (CLV) vs Pinnacle's close.** You are building (in this order) the leak-free data foundation, the calibration+selection "honesty engine," the Glass Ledger + open verifier, and two real edge models (props + game-line residual). Everything is proven on **CLV**, never on a raw win-rate, and **no number is ever displayed unless it is a substantiated, out-of-sample, realized result with a coverage denominator and a confidence bound.**

---
## 1. NON-NEGOTIABLE GUARDRAILS (treat as compile-time constraints)
These are hard lines. If a task appears to require crossing one, STOP and flag the founder.

**Honesty / anti-fabrication (the brand IS this):**
- NEVER display or commit a win-rate, ROI, accuracy, or "confidence %" that is not a **realized, settled, out-of-sample** result. No in-sample, no backtest-as-if-live, no projected.
- EVERY published performance number MUST carry: (a) coverage denominator (n fired / n eligible), (b) a Wilson or Clopper-Pearson lower bound, (c) CLV backing, (d) walk-forward provenance. A number without all four is "fabrication by omission" — do not render it.
- Build a **display-only-substantiated-results guard** as actual code: a render-layer assertion that refuses to output any metric lacking the four fields above.
- Fire/rank on **calibrated EDGE `e = p − q`** (model prob minus no-vig market implied prob), **NEVER on confidence `κ = max(p,1−p)`**. A 90%-confident favorite has ~0 edge because the line already prices it. Confidence-gating = betting chalk at −EV = scores24's fatal error. This is the single most important modeling rule.

**Compliance / legal (FTC + gambling law — one slip is catastrophic for a trust brand):**
- **No affiliate.** No sportsbook CPA funnels, no "deposit + first bet → free subscription," no cloaked redirect links, no gambling-credit rewards. Ever. (This is the moat — a competitor funded by affiliate CANNOT copy it.)
- **No real-money / no chance games.** "Beat the Model" pick'em must be FREE — no entry fee, no prize pool (a prize pool = a lottery/wager; illegal player-vs-house in 10+ states; PrizePicks paid $15M, Underdog $17.5M). If any prize element is ever added it must be P2P/skill and founder-gated with a per-state legal opinion.
- **FTC substantiation:** any earnings/win language must be provably TYPICAL for users (RagingBull precedent = $2.4M). Gate ALL "edge"/"proven" language behind: CLV cleared 52.4% breakeven AND n ≥ (see §5). Until then the copy is "honest scoreboard, in progress," not "proven winner."
- **Frictionless cancel** (FTC click-to-cancel / ROSCA): subscription cancel must be one-click, no dark patterns.
- **Data:** licensed odds (The Odds API) + free-legal only (nflverse CC-BY 4.0, Baseball Savant/Statcast, MLB Stats API). **Do NOT scrape proprietary/paywalled feeds** (no PFR scraping — it bans this and it legally taints the product; nflverse gives the same facts cleanly). Kalshi = **read-only price ingestion** for CLV corroboration, never operate a wagering product.

**Process:**
- Live switches (publishing any public number, flipping SHADOW→live, `MODEL_VERSION` bumps) are **founder-gated**. Build everything inert/gated-off by default; the founder flips it.
- An **independent model/calibration reviewer** must sign off before ANY performance number goes public. Make honesty machine-checkable (the open recompute script, §4) so "audited" is literally true, not self-attested.

---
## 2. BUILD SEQUENCE (STRICT ORDER — each gates the next)
Do not start N+1 until N passes its acceptance test. The order is the whole point: without the leak-free foundation, every downstream number is self-deception.

### PHASE 0 — Leak-free data foundation (weeks 0–6) — THE GATE
**Build:**
- **As-of feature store:** every feature frozen at the decision timestamp `t`. No post-`t` injury/lineup/weather/line resolution may ever enter `x_t`. Hard cutoff enforced in code, not convention.
- **Line archive:** timestamped OPENING odds + Pinnacle/consensus CLOSING odds (The Odds API snapshots on a cron + Kalshi read-only), with a documented **devig routine** (implement both proportional and Shin; unit-test on known books).
- **Purged + embargoed walk-forward harness** (López de Prado): purge overlapping game windows, embargo across time; player/game autocorrelation must not leak across folds. One most-recent season held as an untouched forward holdout until founder sign-off.
- **Snapshot provenance:** every historical sub-model output must be reconstructable as-of prediction time (store input hashes + `MODEL_VERSION`).

**ACCEPTANCE TEST (mandatory, blocking):** a **shuffled-time placebo** — randomize the time index and confirm measured CLV collapses to ~0. If the placebo shows edge, you have leakage; fix before proceeding. Also run a market-conditional mutual-information probe `I(features; Y | Q_close)` — if ~0, there is no beatable orthogonal information and the founder must know that truth before more modeling.
**PROVES:** the pipeline is leak-free; any downstream CLV is real. **The most likely silent fatal bug in the whole program is a closing-line-derived or post-decision feature entering `x_t`** — hunt it here.

### PHASE 1 — The honesty engine (weeks 4–12)
**Build:**
- **Calibration:** beta/temperature tail calibration fit on **out-of-fold** predictions, blended with the existing PAVA/isotonic in the dense middle (isotonic overfits the sparse high-confidence tail — that's where the money is). Select the map by **Brier reliability-resolution decomposition**, NOT fixed-bin ECE (ECE is optimistically biased). Monotone map ⇒ ranking unchanged; it only relocates `p` across the betting threshold `1/d`.
- **Selective gate:** Mondrian/Venn-Abers conformal for distribution-free coverage; **fire only when a conformal lower bound `LCB(e) > τ_vig`**, τ tuned on a DISJOINT walk-forward fold. Emit a published **coverage-vs-edge curve** and a Wilson LCB on realized rate. (Selective accuracy rises monotonically as τ rises / coverage falls — that risk-coverage curve IS the legitimate "~60% on a subset" engine, bounded above by real line softness, not statistics.)
- **Market-blend truth test:** optimal logit-pool `Y ~ logit(q_mkt) + β·logit(p_model)`; estimate β and its CI. **If the CI includes 0, the model adds nothing beyond the market — fire nothing, sell nothing.** This is the falsifiable "do we actually have edge" test.
- **Portfolio Kelly layer:** fractional Kelly `f* = (p·d − 1)/(d − 1)` at λ≈0.25–0.35, Ledoit-Wolf covariance shrinkage + James-Stein edge haircut, with a **CLV deflator** `μ_used = ρ_CLV·μ_JS` so stakes self-disarm toward 0 until ρ_CLV is established (~50–100 settled bets). Report sizing in Sharpe/drawdown, never as CLV.

**ACCEPTANCE TEST:** on the holdout, the gate produces a coverage-stamped selective rate with a valid Wilson LCB, OR honestly reports 0 coverage. Conformal marginal coverage holds within tolerance per Mondrian stratum.
**PROVES:** GSE can state "~X% on Y% coverage" honestly — or report nothing — and size for survival.

### PHASE 2 — The Glass Ledger + open verifier (weeks 8–16) — THE PRODUCT WEDGE
**Build:**
- **Append-only, hash-chained pick store.** Each GSE Rating pick recorded with: selection, price + book at decision time, `t` pre-kickoff, `MODEL_VERSION`, feature-snapshot hash. Commit the pick's hash publicly **before kickoff** (OpenTimestamps anchor and/or a public gist/commit) so it cannot be backfilled or edited.
- **Settlement:** ingest Pinnacle closing price via The Odds API, compute per-play CLV; settle outcome; append to the immutable record.
- **`recompute.ts` (open-source):** a checked-in script anyone (or any AI agent) can run to reproduce EVERY CLV figure from public closing odds. This is what makes "audited" literally true rather than self-attested.
- **Public `/ledger` surface:** season-by-season table on the **nfelo template** (SU%, ATS-vs-close, CLV, MAE) + a **reliability/Brier calibration diagram** + an n-toward-significance panel. **Default the view to ALL picks / ALL tiers** — the confidence filter is a transparency tool, never a cherry-pick. **Lead with calibration, not win-rate** (calibration makes an honest 50.9% credible now and is FTC-safe; win-rate invites variance-death and earnings-claim exposure). Render behind a `PUBLISH`/`MODEL_VERSION` flag (founder-gated), launch labeled "in progress at ~50.9%."

**ACCEPTANCE TEST:** an independent party runs `recompute.ts` against public odds and reproduces the posted CLV within rounding. Pre-kickoff timestamps verifiably precede kickoff for every pick.
**PROVES:** the one asset a funded latecomer cannot fake (they can't manufacture an earlier honest start date). **Start this clock as early as possible** — a longer, earlier-started, pre-registered record is the only non-copyable moat.

### PHASE 3 — Real edge sources (weeks 12–24), both trained + accepted on CLV
**Build (highest realized-edge-per-hour first):**
- **Hierarchical-Bayes props specialist** — NegBinomial multilevel / partial-pooling (James-Stein shrinkage) on player props where per-player n is 5–30 games; posterior-predictive `P(over)`. Props are the softest market and the **volume engine** for the selective subset (+100–250 CLV bps on ~25–40% of prop lines). This is where a real ~57–60% subset gets enough volume to matter.
- **CLV-native "closing-line distillation"** — train as-of open-time features to predict the **devigged Pinnacle CLOSE** (not the box score); select on predicted-favorable move. Distilling a Var≈0.04 target instead of a Var≈0.25 Bernoulli is ~10× more sample-efficient and t-detectable in ~50 bets. All edge is the pre-close residual (+50–150 CLV bps on soft/early lines; ~0 vs a liquid primetime close by construction).
- **Market-residual GBM (game lines)** — quantile/pinball loss, monotone constraints, **line as a fixed-coefficient offset** (this structurally prevents the "my model rediscovered the line and looks 65% in-sample" illusion). Accept on CLV, not ROI. Honest ATS-vs-close ceiling ≈ the ~53–54% nfelo band — do NOT expect to beat nfelo's +561 bps.
- Feed **EB-shrunk tracking metrics** (CPOE, separation, xYAC, barrel%, xwOBA — variance-decomposed to true talent) + physics/context transfer functions (air density/carry, wind, umpire/ref EB rates) as features into the above.

**ACCEPTANCE TEST:** positive CLV vs obtainable price on a stated subset, walk-forward, attributed to independent sources (not double-counted across models).
**PROVES:** there is real, fireable edge, and where it lives.

### PHASE 4 — Frontier fusion (research bet, months 5–12+, INERT until it clears CLV)
- Sequential intra-week Bayesian **Signal-Mesh** fusion (SiriusXM/Airwave pundit accountability + beat-writers + Reddit/web) where **each channel's weight = its empirically proven precision** ("accountability-as-Bayesian-precision" — genuinely unprecedented; no public competitor ships it). Live capture is founder/legal-gated; keep illustrative/inert.
- Cox-hazard news-latency detection on a clean timestamped mesh→line-move corpus (leakage/survivorship-prone; unproven vs modern book latency — do not weight until validated).
- Market-conditional MI as a standing feature-admission stop-rule; Adaptive Conformal Inference for non-stationarity; Learn-then-Test FWER-bounded threshold selection.
- **No live weight and no public claim until 200+ fired bets clear breakeven+vig out-of-sample.**

---
## 3. THE HONEST CEILING (set expectations in code + copy)
- Blind, all-games rate is capped **~52–56%** and will NOT beat an efficient close. Anyone claiming full-slate 60% is lying; do not build UI that implies it.
- **~57–60% is real ONLY as a SELECTIVE, props-heavy number on ~8–15% coverage**, claimable only after multi-season walk-forward shows +CLV over **200+ fired bets** (~50 detects CLV; far too few for a hit-rate claim).
- **Headline metric = CLV vs OBTAINABLE price (DK/FD): target +100–300 bps** on the fired subset. **Pinnacle-close CLV ≈ breakeven** and is the INTERNAL proof bar, not a marketing number.
- Game-line edge alone is too thin to prove in one season (~20–40 fired plays); **props supply the volume.**

---
## 4. DATA CONTRACTS (sources + terms)
| Source | Use | Terms / note |
|---|---|---|
| **nflverse** (GitHub releases: `stats_player_reg_YYYY`, `pfr_advstats/advstats_season_*`, NGS-derived) | NFL features spine | CC-BY 4.0 — free, licensed. **Tag names matter.** Replaces any PFR scraping. |
| **Baseball Savant / Statcast** | MLB tracking (barrel%, xwOBA, K%) | Fully open (`Disallow:` empty). Use `pybaseball`. CSV endpoint sometimes returns HTML — use JSON. |
| **MLB Stats API** (`statsapi.mlb.com`) | MLB stats + splits | Free/no-auth. Platoon splits via `statSplits sitCodes=vl,vr` (Savant split param silently fails — verified). |
| **The Odds API** | Opening + closing odds snapshots | Licensed. Cron snapshots for the line archive. |
| **Kalshi** | CLV corroboration (secondary) | **Read-only price ingestion.** Never operate wagering. State-contested; Pinnacle is primary CLV anchor. |
| **Pinnacle close** | PRIMARY CLV benchmark | World's most efficient line (winner's-welcome, 2–3% hold). Obtain via odds API / third-party; US-geoblocked for wagering (irrelevant — we only need the price). |
| Signal Mesh (Airwave/SiriusXM Ch87, beat, Reddit) | Phase-4 gated feature | Internal, founder-gated, illustrative until legal sign-off. |

Windows note: TLS-intercepted network — Node needs `--use-system-ca` / `NODE_OPTIONS` persistently set; curl needs `--ssl-no-revoke`. (Existing repo infra memory covers this.)

---
## 5. OVERFITTING / INTEGRITY GUARDS (engineering requirements, not optional)
- Purged + embargoed walk-forward on EVERY model; one untouched forward-holdout season.
- Shuffled-time placebo must drive CLV→0 (Phase 0 gate).
- Multiple-testing control: Deflated Sharpe / White Reality Check / Hansen SPA on base-model admission; Benjamini-Hochberg FDR on feature search; **maintain an honest registry of EVERY threshold/feature tried** — an incomplete registry voids the guarantee.
- Thresholds/operating points tuned ONLY on inner/disjoint folds, confirmed on the untouched holdout. Tuning the risk-coverage curve on the eval set = guaranteed optimism = the #1 self-deception risk.
- Beta/temperature parametric tail instead of pure isotonic in the sparse tail; Brier decomposition not fixed-bin ECE.
- Fractional Kelly + covariance shrinkage + edge haircut so `Σ⁻¹μ` estimation error can't produce insane leverage; CLV deflator ties stakes to realized ρ_CLV.
- Prove with CLV (converges ~50–200 bets), NEVER short-run settled hit-rate (~1000+ bets to separate from breakeven).
- Non-stationarity: Adaptive Conformal Inference + covariate-shift monitor; embargo across rule regimes (MLB shift ban, NFL coverage rules); retire any signal whose realized IC/lead-time collapses — do not rationalize it.

---
## 6. SCOPE DISCIPLINE (focus PRODUCT SURFACES + RIGOR — NOT sport count)
**Multi-sport is a GO. Do NOT narrow to one sport.** Build the engine **sport-agnostic** (the calibration → conformal edge-gate → CLV pipeline is identical across sports; only the feature loaders differ) and light up **NFL + MLB together from day one** — both have free, licensed data (nflverse CC-BY for NFL; Baseball Savant/Statcast + MLB Stats API for MLB), MLB is the competitors' **soft flank** (per the FantasyGuru teardown), and the **props volume engine that makes the selective ~57–60% subset viable spans BOTH sports** (thousands of weekly prop lines across NFL + MLB is exactly the volume a single sport can't supply). Architect for easy addition of NBA/NHL/etc. behind the same interfaces; add them as their data loaders + walk-forward validation are ready, not by rebuilding the engine.

The discipline that IS real: focus the **product surfaces and the proof bar**, not the sport list.
- **Sharpen (public, now):** the Glass Ledger + the calibrated GSE Rating + CLV proof — across whatever sports have passed Phase-0/1 validation.
- **Freeze to founder-gated/inert (keep the code as options, kill the *public* surface until each has earned its own validated CLV):** the DFS optimizer, the accuracy-weighted consensus engine, the Airwave/Signal-Mesh live feed, the decision-intelligence OS, and the fantasy product. These are separate product surfaces, not sports — gating them is about not shipping ten half-proven products, not about dropping sports.
- Existing assets (`edge-engine.ts` with SHADOW default-off, the PAVA/isotonic engine, calibrated tiers, the NFL world-model, the MLB engines from the FantasyGuru clean-room build) are the substrate — extend them, don't rebuild. Each sport goes public on the Ledger only after it independently passes the Phase-0 leak gate and Phase-1 honesty gate.

---
## 7. DEFINITION OF DONE (per artifact)
- **Data foundation:** shuffled-time placebo CLV ≈ 0; MI probe reported; holdout sealed.
- **Honesty engine:** coverage-stamped selective rate with valid Wilson LCB on holdout; conformal coverage holds per stratum; logit-pool β CI reported (fire nothing if it includes 0).
- **Glass Ledger:** independent party reproduces posted CLV via `recompute.ts`; all pick hashes verifiably pre-kickoff; `/ledger` defaults to all-picks, leads with calibration, gated behind `PUBLISH`.
- **Edge models:** +CLV vs obtainable price on a stated subset, walk-forward, source-attributed, no double-count.
- **Every public number:** carries coverage + LCB + CLV + provenance, or it does not render.

---
## 8. HARD "DO NOT" LIST
- Do NOT display any unsubstantiated/in-sample number (the display guard must block it).
- Do NOT gate/rank on confidence κ — only on calibrated edge `e = p − q`.
- Do NOT let the closing line (or any post-decision data) enter features.
- Do NOT scrape PFR or any proprietary/paywalled feed; use nflverse/Statcast.
- Do NOT add affiliate links, sportsbook CPA funnels, or gambling-credit rewards.
- Do NOT add entry fees or prize pools to "Beat the Model" (free/skill only).
- Do NOT flip SHADOW→live, publish a number, or bump `MODEL_VERSION` without founder sign-off + independent review.
- Do NOT tune thresholds on the eval/holdout set.
- Do NOT claim/expect a full-slate 60% or to beat nfelo's +561 CLV bps.
- Do NOT copy competitor page templates/expression (FantasyPros litigates "features"; our moat is the record, not copied UI).

---
## 9. THE WHY (so tradeoffs are made correctly)
Every incumbent monetizes by sending the user to a book or selling a tool; NONE publishes an audited CLV of its own number, because an honest number would expose that they profit when the user loses (a design now in FTC/city/Senate crosshairs). GSE's entire defensibility is the inversion: **it profits only when its number is right, and it proves that in public on rails anyone can recompute.** The Glass Ledger is the product; the edge engine earns a number worth showing; the honesty guards keep it legal and credible. When a design decision is ambiguous, choose the option that makes the record more honest, more reproducible, and more clearly non-conflicted — that is always the right call for this company.
