# 04 — METRICS CANON (formulas + citations, mapped to repo modules)
Every formula usable on methodology/glossary pages. Mappings point at packages/prediction-engine/src.

## 1. BRIER SCORE + MURPHY DECOMPOSITION (metrics/core, brier-ogd-ensemble.ts)
BS = (1/N) * sum_i (p_i - y_i)^2  — 0 perfect, 0.25 = coin flip at p=0.5, 1 worst.
Murphy (1973): BS = REL - RES + UNC
  REL (reliability) = (1/N) sum_k n_k (p_k - o_k)^2   (bin mean forecast p_k vs observed frequency o_k)
  RES (resolution)  = (1/N) sum_k n_k (o_k - o_bar)^2
  UNC (uncertainty) = o_bar (1 - o_bar)
Use: REL is what the calibration contract polices; RES is what skill adds. Report decomposition, not just BS.

## 2. ECE (calibration-contract.ts polices this)
ECE = sum_k (n_k/N) |acc(k) - conf(k)| — equal-width bins. Contract: ECE <= 0.06 over >= 250 settled samples, drift <= 0.10, else probability claims are BLOCKED by code. This is the published gate.

## 3. LOG LOSS / CROSS-ENTROPY (information-edge-bits.ts)
CE(p, y) = -(y ln p + (1-y) ln(1-p)). Base-2 variant in bits. Strictly proper.
Information edge (realised, honest): I = H(baseRate) - mean_i CE(p_i, y_i)  [publication gate]
Information edge (prior, GAMEABLE): H(baseRate) - mean_i H(p_i) — banned as gate (a coin-flip model that emits p in {0,1} scores a perfect bit with zero skill).
DETECTABILITY_TOTAL_BITS = 3.84 (= chi2(1) at p=0.05, in bits).

## 4. CONFORMAL PREDICTION (conformal-intervals.ts)
Split conformal: q = ceil((n+1)(1-alpha))/n quantile of calibration residuals |y - yhat|; interval = yhat +/- q.
Coverage: P(y in interval) >= 1-alpha under exchangeability. Mondrian variant: per-group calibration (position/week). Rolling window variant for regime shift.

## 5. MULTICALIBRATION (multicalib-audit-patch.ts)
Audit cells (group x score-bin): flag |observed - mean p| > eps with n >= 20; patch with local isotonic (PAV) blended at lambda (default 0.5); re-audit until clean or budget spent. Why it matters (page-ready line): aggregate calibration can look perfect while subgroup cells cancel out — we audit the cells, not just the curve.

## 6. VENN-ABERS (calibration/ivap.ts, cvap.ts)
IVAP: PAV on calibration set gives p0(score), p1(score) bracketing the point probability — finite-sample valid under exchangeability, no tuning. CVAP: K-fold IVAP aggregated by log-space geometric mean (minimax). Page-ready line: instead of one recalibrated number, a valid interval around it — honest uncertainty from day one.

## 7. CLV (clv.ts, clv-capture.ts, clv-decomposition.ts)
p_close = de-vigged closing fair probability.
Decimal-lock CLV: (p_close * P_lock) - 1; American lock P_lock = 1 + odds/100 if odds>0 else 1 + 100/|odds|.
Probability-space: CLV = p_close - impliedProb(lock). Beat-close rate = share(CLV > 0).
Gates: conviction tier needs beat-close >= 50% over >= 20 picks; pricing phase ESTABLISHED needs >= 52.4% (vig break-even) over a meaningful sample. Doctrine: beating the close is the strongest LEADING indicator of edge — it predicts profitability before settlement.

## 8. KELLY (kelly.ts)
f* = (bp - q)/b. Quarter-Kelly default, cap 3 units/pick, floors: confidence >= 65, edge >= 50. Example: p=0.55 at -110 (b=0.909): full Kelly 4.55% -> quarter-Kelly ~1.14% of bankroll.

## 9. E-PROCESSES / ANYTIME-VALID (bernoulli-eprocess.ts, promotion/empirical-bernstein.ts)
LR step: s_t = (p_hat/p0)^y * ((1-p_hat)/(1-p0))^(1-y); product M_t is a nonneg martingale; Ville: P(sup M_t >= 1/alpha) <= alpha. Reject when E >= 1/alpha — at ANY stopping time, no penalty. Betting form: M <- M(1 + lambda(y - p0)), lambda < 1/p0. Empirical-Bernstein bounds in promotion/ for lane promotion.
Page-ready line: our record can be audited sequentially by any outsider at any time — no optional-stopping sins.

## 10. BRIER-OGD ENSEMBLE (brier-ogd-ensemble.ts) + BAEE (ensemble/baee-ensemble.ts)
OGD: p_ens = w.p_vec, grad 2(p-y)p_vec, w <- proj(w - eta*grad). BAEE: exact Bayesian weight update w_k <- w_k * p_k(y)/p(y) (corrected draft — the exp(eta*grad) version did NOT equal Bayes at eta=1). Shadow mode only today.

## 11. HAWKES STEAM (hawkes-steam.ts)
lambda(t) = mu + alpha * sum exp(-beta (t - t_i)) per side. Steam = statistically excessive clustering of same-side moves. Threshold: 3x background. Max probability nudge 0.05. Page-ready line: we model WHEN moves arrive, not just their size — a cluster is not three coincidences.

## 12. SUCCESS RATE / EPA / WPA / CPOE / RYOE / xYAC (expected-metrics/)
Success: 1st down gain >= 40% of yards-to-go; 2nd >= 60%; 3rd/4th 100%. TD forces success; offensive turnover forces failure and dominates the TD flag; unratable plays drop (never silently failure).
EP/EPA: EP(state) = sum_k P(next-score = k) * value(k); EPA = EP(after) - EP(before) (possession-frame corrected). WP/WPA: logistic on margin/time/field/down-distance/timeouts/market spread.
CPOE = 100 * mean(complete - P(complete)); RYOE = mean(yards - yhat); xYAC same pattern.
Integrity line: nflverse publishes ITS model columns; we fit OUR OWN on public data and use theirs only as a referee. Never re-serve another model's number as our own.

## 13. ELO (elo-estimator.ts)
P(home) = 1/(1 + 10^(-(R_h - R_a + HFA)/scale)); HFA 65, scale 400.
