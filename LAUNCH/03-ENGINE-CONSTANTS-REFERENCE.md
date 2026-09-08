# 03 — ENGINE CONSTANTS REFERENCE (extracted from packages/prediction-engine/src, read-only)
Purpose: internal truth sheet. Every number below was read directly from source on 2026-09-08.
If a methodology claim needs a number, it comes from here. NOT for public dump — methodology page
publishes gates, not the full constant table.

## GSE ACTION SCORE (gse-score/gse-action-score.ts) — the assembly
rawScore = 18
         + clamp01(max(0, probabilityEdge)/0.08) * 40      // positiveEdgeScore
         + parliament.confidenceScore * 0.22                // confidenceContribution
         + featureContract.featureHealth * 0.18             // featureContribution
         + calibration.scoreModifier                        // calibrationContribution (can be negative)
         - noBet.score * 0.72                               // noBetPenalty
score = clamp01_100(rawScore), capped by calibrationActionCap(calibration.status)
forcedHardPass = noBet HARD_PASS | featureContract BLOCK | parliament BLOCK | calibration hard
forcedHardPass -> score = min(24, cappedScore)
decide(): HARD_PASS if forced; PASS if noBet SOFT_PASS or score<35; edge<=0 -> WATCH (honesty gate);
score>=72 -> PLAY; score>=55 -> LEAN; else WATCH.
probabilityEdge = modeledProbability - marketProbability.

## MODEL PARLIAMENT (gse-score/model-parliament.ts)
Votes: {modelId, probability in [0,1], confidence>0, evidenceWeight?, stale?}
Invalid/empty votes -> status BLOCK. Disagreement risk trigger: > 0.08 (severity scaled /0.16).

## CALIBRATION CONTRACT (gse-score/calibration-contract.ts)
Defaults: minSampleCount=250, maxECE=0.06, maxDriftScore=0.10.
Statuses: VALIDATED | WATCH | INSUFFICIENT_SAMPLE (-18) | DRIFTING (blocked) | BLOCKED (-25).
INSUFFICIENT_SAMPLE and BLOCKED -> probabilityClaimsAllowed=false.
(See also calibration-action-policy.ts for per-status caps; calibration-kelly-bridge.ts links calibration to sizing.)

## NO-BET STRENGTH (gse-score/no-bet-strength.ts)
Risk impacts: MISSING_REQUIRED_DATA 45, SOURCE_RIGHTS_BLOCKED 70, STALE_DATA 24,
MODEL_DISAGREEMENT 22, CALIBRATION_NOT_VALIDATED 16, LOW_EVIDENCE 18, MARKET_VOLATILITY 12,
RESPONSIBLE_GAMING 100 (hard). evidencePenalty = (100-evidenceHealth)*0.35.
Decisions: CLEAR | WATCH | SOFT_PASS | HARD_PASS.

## EDGE ENGINE (edge-engine.ts)
SPEAK_EDGE = 0.025 (2.5pt independent-vs-market gap to SPEAK), LEAN_EDGE = 0.012,
DIRECTION_EPSILON = 0.005. Doctrine: independent estimators, market as benchmark, CLV as judge.
Source estimators wired: Elo, Kalshi exchange. Poisson deliberately NOT wired (no team-rate ingest; wiring = fabricated stats, repo rule 1).

## CONVICTION TIER (conviction-tier.ts)
BREAK_EVEN_PROBABILITY = 0.524 (-110 vig line), CONVICTION_MIN_PROBABILITY = 0.65 (calibrated, not raw),
CONVICTION_MIN_CLV_BEAT_RATE = 0.5, CONVICTION_MIN_CLV_SAMPLE = 20.
A -200 favorite must clear 66.7%, not the -110 default. Tier requires independent SPEAK (edge engine).

## GREEN BOARD (green-board.ts)
GREEN_P_MIN = 0.70, PRIME_P_MIN = 0.80, INDEPENDENT_DISSENT_BAND = 0.06.

## KELLY (kelly.ts)
f* = (b·p - q)/b, p = fair prob from de-vigged market, b = decimalOdds-1.
KELLY_FRACTION = 0.25 (quarter-Kelly), MAX_UNITS_PER_PICK = 3, MIN_CONFIDENCE_FOR_STAKE = 65,
MIN_EDGE_FOR_STAKE = 50. Explicit doc: sizing helper for users who already decided; platform takes no wagers.

## DE-VIG ORACLE (devig/oracle.ts) — 7 methods
multiplicative | additive | power | shin | differential_margin_weighting | odds_ratio | logarithmic.
Returns {probabilities, method, margin, methodParams}. Shin z = insider share in [0,1), bisection
root tol 1e-12 (bisectRoot). Ported from penaltyblog (MIT) implied.py, verified vs 1.12.0 commit 5ebd602.
shin-devig.ts: p_i(z) = (sqrt(z^2 + 4(1-z) p_i_raw^2/booksum) - z) / (2(1-z)).
honesty/devig-method-compare.ts: multiplicative vs Shin vs goto shown side-by-side (Hegarty & Whelan 2025:
multiplicative manufactures longshot "value") — surface shows the disagreement, does not hide it.

## POISSON / DIXON-COLES (poisson.ts, dixon-coles.ts)
P(X=x,Y=y) = e^-λh λh^x/x! · e^-λa λa^y/y! (Maher 1982 attack/defense rates).
DC: multiply joint by tau(rho) on {0-0,0-1,1-0,1-1}, renormalize; soccer-only; rho = literature default,
frozen + documented until form-fit. STATUS: not wired live (see edge engine note).

## ELO (elo-estimator.ts)
P(home) = 1/(1 + 10^(-(homeRating - awayRating + HFA)/400)); HFA default 65pt, scale 400. Market-independent referee.

## INFORMATION-EDGE GATE (information-edge-bits.ts), bits, base-2
Honest (realised) basis: bits = H(baseRate) - mean_i CE(p_i, y_i)  <- the only publication gate.
Gameable (prior) basis: bits = H(baseRate) - mean_i H(p_i) — measures confidence not accuracy, banned as gate.
DETECTABILITY_TOTAL_BITS = 3.841458820694124, DEFAULT_INFORMATION_EDGE_THRESHOLD_BITS = 0.02,
DEFAULT_BASE_RATE = 0.5, NULL_BAND_TIE_EPSILON_BITS = 1. Closed-form counterpart of a VIB gate (no NN needed).

## HAWKES STEAM (hawkes-steam.ts)
lambda_side(t) = mu + alpha * sum_{t_i<t} exp(-beta(t-t_i)) — per-side independent processes, mark-free.
Defaults: mu=0.02, beta=0.1 (grid 24x20 + refine), steam threshold = 3x background, max prob nudge 0.05 (scale 0.01/unit).

## BERNoulli E-PROCESS (bernoulli-eprocess.ts) — R&D, unwired, anytime-valid
LR factor: y=1 -> pHat/pMkt, y=0 -> (1-pHat)/(1-pMkt); running product M_t is a nonneg martingale;
Ville: P(sup M_t >= 1/alpha) <= alpha. Betting step: M <- M(1 + lambda(y - y0)), lambda < 1/y0.
mixtureEProcess averages K exponentiated wealth paths.

## BRIER-OGD ENSEMBLE (brier-ogd-ensemble.ts) — offline
p_ens = w·p_vec; grad = 2(p-y)p_vec; w <- proj(w - eta*grad) (Murphy + OCO, Cesa-Bianchi & Lugosi).

## ENSEMBLES
BAEE (ensemble/baee-ensemble.ts): online Bayesian model averaging; update w_k <- w_k * p_k(y)/p(y)
(corrected from an earlier exp(eta*grad) draft that did NOT equal Bayes at eta=1) — shadow mode only, not wired.
earned-weight-ensemble.ts: MAE-hedge fantasy ensemble.

## CALIBRATION SUITE (calibration/)
PAV (linear-time isotonic, optional weights), IVAP (Venn-Abers multiprobability),
CVAP (K-fold IVAP, log-space geometric mean = minimax rule, Neumaier summation),
local-isotonic-patch (group x bin patch, min 20 samples, blend lambda default 0.5),
multicalib-audit-patch (432L: audit group x bin cells -> patch -> re-audit loop; binary case).
conformal-intervals.ts: rolling + Mondrian conformal for fantasy projections (fitWeeks/calibrationWeeks/targetCoverage).

## EXPECTED METRICS (expected-metrics/) — fit-on-load, never re-served from nflverse
EP: EP(state) = sum_k P(next-score=k)*value(k); EPA = EP(after)-EP(before) (possession-frame corrected).
WP: sigma(beta*features) on {margin,time,FP,down/dist,timeouts,spread}; WPA likewise.
CPOE = 100*mean(complete - P(complete)); RYOE = mean(yards - yhat); xYAC same pattern.
Success rate: 40%/60%/100% down-conditioned rule; turnover dominates TD flag; unratable -> null (never silently failure).
Honesty referees: own WP correlated vs nflverse wp as REFEREE only (validation.ts).

## EXPECTED-METRICS LINEAR/LOGISTIC (linear.ts, logistic.ts)
fitLogistic / fitRidge used across modules; rollupByPlayer aggregation; validation split fixtures in metrics/core.

## PROMOTION (promotion/)
CLV non-inferiority, empirical-Bernstein bounds, normal-quantile, window-hash — the gate suite for promoting a model lane.

## HONESTY (honesty/)
glass-receipts.ts (FNV-1a demo chain; prod anchors hash + OpenTimestamps), no-bet-gate.ts
(fire on calibrated edge e = pLo - q, never confidence), placebo-leak.ts, commit-reveal.ts, devig-method-compare.ts.
