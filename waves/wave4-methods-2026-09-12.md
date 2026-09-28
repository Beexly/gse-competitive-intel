# Cluster G methods dossier — 08-27 x4 + 08-29 x2

Sources: `extract-data-2026-08-27.json` (Odds API provider/feed), `(1).json` (math core / ingestion / validation / stack), `(2).json` (tracking + commercial + lifecycle + prop modeling + math core), `(3).json` (tracking + commercial + lifecycle + DFS/props + market edge + tech stack string), `extract-data-2026-08-29.json` + `(1).json` (3D-asset workflow pair — off-cluster, see §1).

## 1. 08-29 diff verdict: DELTA, not dupe

- SHA: base `16eabbc28452…` vs (1) `56eca788d5f1…` — different files.
- Counts: base = 15 clones / 10 steals / 8 do-not-copy; (1) = 15 clones / 9 steals / 8 do-not-copy.
- Overlap (exact): clone names 5/15 shared labels, clone URLs 6 shared; **steals 0 exact matches; do-not-copy 0 exact matches; job strings differ.**
- Substance: base = one-photo→3D turntable-ad workflow (price ladder $0.40/$0.25–0.35/$0.02/$0.07, mesh-to-video path, license-threshold warnings). (1) = Autonomous Revenue Engine (asset-as-source-of-truth, confidence/QA rubric, rules-before-CTA, browser-first GLB). Complementary angles on one theme, not re-crawls.
- Disposition: **excluded from this methods dossier** (no math/ingestion content); kept as 3D-workflow pair for whichever cluster owns it. The (1) file's 9 steals carry **zero source URLs** — flag for re-extract with citations.

## 2. Formula registry (10 canonical, 15 verbatim — see `methods-formulas.json`)

| # | Canonical | Verbatim core | Source file | Key citation |
|---|-----------|---------------|-------------|--------------|
| 1 | Implied prob | q=1/O; q=\|A\|/(\|A\|+100) neg, 100/(A+100) pos | 27-(1) | arxiv 2303.06021 |
| 2 | No-vig | p_i=(1/O_i)/Σ(1/O_j) | 27-(1) | Smarkets margins |
| 3 | EV/unit | EV=p(O−1)−(1−p)=pO−1; edge p−p_no_vig | 27-(1),(2),(3) ×3 variants | OddsJam EV |
| 4 | CLV | CLV_pp=p_close,novig−p_bet,novig | 27-(1) | Unabated CLV |
| 5 | Kelly | f*=(bp−q)/b; f=ωf*, 0<ω<1 (0.5 = half); f=0 if edge ≤ 0; cap 0.1 Kelly w/ covariance (3) | 27-(1),(3) ×2 variants | arxiv 2107.08827 |
| 6 | Drawdown | max E[log W] s.t. Pr(min W_t<αW_ref)≤β; var fᵀΣf | 27-(1) | arxiv 2107.08827 |
| 7 | Poisson/DC | log λ_home=α+attack_home−defense_away+venue+covariates; DC low-score correction; NB for overdispersion | 27-(2) | Dixon-Coles 1997 |
| 8 | Monte Carlo | P(A)=M⁻¹ΣI(A_m); joint via I(all legs); MCSE + seeds | 27-(2) | PMC2924739 |
| 9 | Prop tail | P(X>line) = simulated tail sum | 27-(1) NFL | arxiv 2409.04889 |
| 10 | EPA | EPA=EP(S_{t+1})−EP(S_t) | 27-(1) NFL | Goldner STOR538 |
| 11 | DFS MIP | max E[pts]+λ·leverage−risk s.t. cap/roster/stack/CVaR | 27-(3) | Underdog help |
| 12 | Injury Δ | ΔP=P(prop\|injury)−P(prop\|baseline) | 27-(3) | — (no citation) |

Sport models (no closed form, kept as specs): NFL hierarchical-Bayes state-space + multinomial-logit + absorbing Markov + Glicko-2 shrinkage; MLB 24-state base/out Markov + log5/logistic matchup + Statcast; NBA possession multinomial (0/1/2/3+) + pace/lineup sim; NHL Poisson/NB goal-intensity + hazard-rate live sim; Soccer Dixon-Coles bivariate Poisson + xG Bernoulli shot sums.

## 3. Ingestion (consolidated)

- Official-first: Sportradar (league NFL/MLB/NBA/NHL/soccer APIs + push; Statcast package separately permissioned from 2020) and Genius/Second Spectrum (EPL/NBA/MLS tracking only — not NFL/MLB/NHL) adapters; server-side keys, no client calls. Kalshi WS (ticker/orderbook-delta) as market source, key-ID+RSA auth.
- CV fallback (licensed video only): YOLOv8 → ByteTrack (keep low-conf boxes) → footpoint/ball-center homography (OpenCV getPerspectiveTransform) → Kafka → Flink event-time join → 10 Hz canonical table (game_id, entity_id, t_ms, x/y/z, conf, calib_ver, rights_scope). MOTA/IDF1 + reprojection error gates before commercial use.
- Odds ingestion: The Odds API v4 (8 endpoints: sports, odds, scores, events, event odds/markets, participants, historical) + licensed prematch (5-min change log) + one-adapter-per-book live quotes; never scrape DraftKings/Action/BettingPros (terms forbid bots/retransmission).
- Storage: Bronze immutable raw (checksum, provider, rights/schema ver) → Silver canonical event_id/game_id + bitemporal corrections → Gold features/labels; Delta for transactional PBP, Iceberg for high-res tracking; Kafka partitioned by game_id, dedup on provider_event_id+revision.
- Odds API quotas: Free 500/mo → 20K/100K/5M/15M tiers; 30 rps; apiKey query param.

## 4. Validation & risk (consolidated)

- Walk-forward only (shuffled CV leaks): train/update strictly on records with event+market timestamps < decision time; freeze features/lines/injury/execution; roll windows across seasons; purged gaps; immutable as-of snapshots (Delta time travel / Iceberg snapshots); seeds + MCSE + convergence diagnostics as release gates.
- Metrics: log loss/Brier, calibration/reliability curves, CRPS/quantile + interval coverage for distributions, residuals by venue/lineup/source; economics net of vig/pushes/limits/slippage/fees: ROI, CLV, drawdown, turnover.
- Sizing: posterior (or lower credible bound) p → fractional Kelly, joint optimization for correlated legs, single-market/sport caps; drawdown-constrained log-wealth max (§2 #6); halt on precommitted breach.
- Live discipline: suspend quote between events / on unresolved event; reject stale/suspended quotes via multi-book no-vig consensus + dispersion; CLV tracked per sport/market but not proof in illiquid markets; steam = confirmation feature, not trigger.

## 5. Market edge (consolidated)

- Pipeline per quote: American/decimal → implied → de-vig (proportional or Shin) → p_hat from calibrated ensemble (sport sim + Bayes state-space + Glicko-2/Elo prior + venue/rest/lineup/weather) → 50k–500k common-random-number MC paths → EV/edge/CLV → bet only if lower-CB EV > threshold after error/limits/slippage/tax/fees → rank by fractional Kelly.
- Joint pricing rule (props/SGP): P(all legs) from shared draws, never product of marginals; latent z=(pace, drives, pass rate, weather, score diff, pressure, team total); per-sport coupling (NFL drives/script; NBA minutes/usage; MLB PA order/bullpen; NHL manpower/goalie; soccer possession/game-state); binary Pearson ρ + covariance exposed; pushes/voids + book settlement preserved.
- DFS: MIP lineup gen (§2 #11) + ownership fade/stacks + late-swap re-opt; Pick'em legs priced from joint sim vs payout table; never automate wagering.

## 6. Tech stack (consolidated)

Kafka (durable log) → Flink (keyed state, watermarks, exactly-once) → Spark SQL/Structured Streaming (ETL, backfill) → Delta (PBP) / Iceberg (tracking) → PyMC/Stan async posteriors → compiled vectorized sim service → gateway (OAuth2/OIDC, tenant JWT, per-tenant buckets, field-level auth, kill switch). Serving: K8s (+GPU for CV), Redis hot cache, Postgres rights/billing, ClickHouse/Trino analytics; MLflow, Great Expectations/Deequ, OTel/Prometheus/Grafana, Vault/KMS, Terraform, GHA. Latency budget split per stage (event-time vs receipt-time stamps; Spark micro-batch ~100 ms exactly-once / continuous ~1 ms at-least-once as capabilities, not feed SLA). Rights-policy enforcement point before every read/response; raw zone restricted, IDs tokenized, rights_scope+expires_at on every feature.

## (a) Caveat fractions (python3 Counter over long strings per file)

- 27-base (Odds API, 127 strings): no hedges — flat factual extraction.
- 27-(1) (99): suspend 0.04, explicit 0.03, stale 0.03, "do not" 0.02, "rather than assume" 0.01, "not a guarantee" 0.01, reproducible 0.01.
- 27-(2) (58, most hedged): "do not" 0.07, reproducible 0.07, explicit 0.05, plus "design, not a claim" / "no safe %" / fact-specific fair use / "not legal advice" each 0.02.
- 27-(3) (17): explicit 0.18, reproducible 0.18, "do not" 0.12, stale 0.12, "not legal advice" 0.06, written-approval 0.06.
- Pattern: hedging concentrates in commercial/legal + CV-guarantee disclaimers (27-2/27-3); math core is stated flat. Trust formulas + pipeline mechanics most; treat coverage claims ("2018+ uniform") as explicitly disclaimed — availability is product-specific per file.

## (b) GSE reads

1. Rights-first is the moat constraint: raw payloads/PBP/coordinates never reach customers without entitlement; sell transformed posteriors/aggregates with lineage — contracts (Sportradar addendum bars betting/derivative use without written approval) bind harder than copyright theory.
2. Joint-simulation pricing is the technical edge over marginal-prop shops: SGP/parlay value lives in shared-latent draws; anyone multiplying marginals misprices correlation both ways.
3. Walk-forward + CLV + fractional-Kelly-with-drawdown-cap is a complete publish gate — adopt as-is for any GSE signal product.
4. Replayable lakehouse (Bronze→Silver→Gold, bitemporal corrections, as-of snapshots) is what makes backtests defensible; without it every Sharpe/CLV claim is suspect.
5. Odds API tier ladder (500 free → 15M) sets the cheap bootstrap for odds ingestion before enterprise Sportradar/Genius deals.

## (c) Re-extract targets

1. 08-29 (1): 9 steals + 8 dnc with zero citations — re-extract with source URLs.
2. Dixon-Coles rho + time-decay ξ values actually used (cited but unparameterized).
3. Glicko-2 period length / τ / default RD per sport (referenced, never set).
4. Sportradar vs Genius per-league field/latency/retention matrix values (asserted as "verify in order form" — pull real order-form fields).
5. The Odds API: which quota tier maps to live vs historical endpoints; overage pricing.
6. Kalshi fee schedule confirmation + market-maker ($0.02–0.44/100) vs taker ($0.07–1.75/100) numbers are from one fetched page — re-verify.
7. DFS payout tables (Underdog Pick'em) and settlement/push rules per book for SGP math.
8. ByteTrack 30-FPS/V100 + Spark 100 ms/1 ms figures are reference-implementation capabilities, not measured platform numbers — need our own benchmark or label as such.
