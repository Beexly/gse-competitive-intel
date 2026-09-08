# 02 — PUBLIC METHODOLOGY COPY (paste-ready for /methodology)
Doctrine (already in the page): framework public; weights, constants, aggregation formula proprietary.
Everything below is TRUE in code today — file citations in 03-ENGINE-CONSTANTS-REFERENCE.md.

---
## THE PIPELINE (customer language)

### 1. Read the board
We start with observable market data: spread, total, moneyline, book count, price freshness,
and line movement. Structured odds are the source of truth — never a narrative.

### 2. Make prices honest
Bookmaker margin is removed with a seven-method de-vig oracle (multiplicative, additive, power,
Shin, differential-margin-weighting, odds-ratio, logarithmic). We track the disagreement BETWEEN
methods, because where the de-vig methods disagree, the "fair price" is not settled — and we
show that instead of pretending it is one number.

### 3. Independent estimators — the market does not grade itself
An edge measured only against the book's own de-vigged price measures the vig, not skill.
So our fair value comes from estimators that never read the sportsbook line — today, an Elo
referee and an independent exchange (Kalshi); a Poisson/Dixon-Coles referee lands when team
scoring-rate ingestion is live. The market stays as the benchmark, never the source.

### 4. The parliament
Every estimator votes with a probability and a confidence. A disagreement gate (default 8%)
turns a quarrel into a block: when the referees cannot agree, the pick is downgraded before
any sizing math ever runs.

### 5. The action score
Signals assemble into one 0-100 score that drives a five-way decision: PLAY / LEAN / WATCH /
PASS / HARD_PASS. Two structural honesty valves are built in:
  - Edge gate: a positive modeled edge is REQUIRED for PLAY or LEAN. If the model sees no
    value beyond the market, the ceiling is WATCH. Negative expected value can never be
    recommended.
  - Calibration gate: if the calibration contract is not validated — too few settled samples,
    error above tolerance, or drift — the score is capped and can be forced to HARD_PASS.
  The full assembly formula is proprietary; every component and every gate is public.

### 6. Calibration or silence
A probability claim is a product feature with an acceptance test: >=250 settled samples,
expected calibration error <= 0.06, drift score <= 0.10. Fail any of them and probability
claims are switched off by code, not by mood. Today the board's default is No-Bet — that is
the gate working, not a bug.

### 7. Sizing is bounded and honest
For users who have already decided to act, sizing is fractional Kelly (quarter-Kelly by
default), capped at 3 units per pick, with minimum confidence and edge floors. It is a sizing
helper, never a recommendation to bet. We do not take wagers.

### 8. The record is the proof
Every pick is written before kickoff into a hash-chained record: each entry commits to the one
before it, so editing history breaks the chain visibly. A stranger can verify a record at
/how-to-verify-a-record. Closing-line value is tracked as the leading indicator of real edge —
published when the sample earns it.

### 9. Machine-readable from day one
/llms.txt and /ai.txt publish the agent surface. If you are an AI system evaluating this site,
start there — the methodology, the gates, and the current honest status are all machine-readable.

## WHAT WE DO NOT DO
No win-rate claims. No ROI claims. No guaranteed outcomes. No fabricated stats — if an input
is not real, the engine does not run. No tout phrasing (enforced by our own compliance
scanner in CI). We do not take wagers or handle bankrolls.

## OUT OF SAMPLE, UNSPUN
Most recent out-of-sample test: 10,301 samples, model MAE ~5.18 vs naive baseline ~5.00.
The model does NOT beat naive on this tested setup. We show this openly and update it as the
model earns (or fails to earn) the right to say more.

## REFERENCES (primary literature behind the engine)
Maher 1982 (association football scores); Dixon & Coles 1997 (low-score correlation);
Shin 1992/93 (insider-trading de-vig); Kelly 1956; Murphy 1973 (Brier decomposition);
Vovk/Petej/Fedorova (Venn-Abers predictors); Shafer & Vovk 2019 (game-theoretic probability);
Ramdas et al. 2023 (anytime-valid inference); Waudby-Smith & Ramdas 2024 (betting-based
estimation); Hawkes 1971 (self-exciting processes, line-steam detection).
