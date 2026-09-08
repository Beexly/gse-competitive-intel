# SCORE ALIGNMENT — is the GSE score what the research says a good score is?

**Date:** 2026-09-08 · **Scope:** read-only audit of the shipping scorer against (a) the forecast-evaluation
literature, (b) `_HANDOFF-to-coding-agent.md`, (c) the wave-1/wave-2 competitor dossiers.
**Files read (all claims below trace to these):**
`packages/prediction-engine/src/scoring.ts`, `constants.ts`, `edge-engine.ts`, `ranking-prob.ts`,
`game-context.ts`, `gse-score/*`, `honesty/no-bet-gate.ts`;
`apps/web/lib/ranking/sort-key.ts`, `apps/web/lib/calibration/selective-publish.ts`,
`apps/web/lib/calibration/compute.ts`, `apps/web/lib/calibration/live-calibration-p.ts`;
`packages/db/prisma/schema.prisma` (CLV columns only).
**Not verified here:** production data, any live number, whether any of this is currently rendered.
No code was changed. No gate was touched.

---

## 0. THE BOTTOM LINE, IN FOUR SENTENCES

1. **`confidence` — the number the product is built around — is structurally the same object as
   PropFinder's PF Rating**: an unweighted arithmetic sum of hand-set round-number components,
   clamped to 0–100, with step functions inside it and one input counted three times.
2. **It is worse than PF Rating in one specific respect.** PropFinder never claims PFR is a
   probability. GSE divides `confidence` by 100 and uses it as `rankingP` — a probability — which
   then flows into `brierDecomposition`, `expectedCalibrationError` and the public reliability chart.
   We commit a category error PropFinder does not.
3. **The calibration number that gates PROVEN does not measure the GSE score at all.** The
   eligibility floors run on `MARKET_ANCHORED_P_BASIS`, whose entire resolution order is the
   de-vigged sportsbook price (`live-calibration-p.ts:202-217`), and whose docstring states outright
   that "confidence/100 is never a fallback for the floors" (line 199). **ECE 0.0466 is a reliability
   diagram of the sportsbook, on a favorites-only subset we selected.** It is a real, honest number
   about a real, honest thing — but the thing is not us.
4. **The doctrine-correct scorer already exists in the repo and is not wired to the board:**
   `gse-score/gse-action-score.ts` + `no-bet-strength.ts` + `honesty/no-bet-gate.ts`, whose header
   reads *"Fire on calibrated edge e = pLo − q, never confidence."* The gap is not capability. It is
   that two engines exist and the wrong one is on the public path.

---

## 1. ANATOMY — WHAT THE SCORE ACTUALLY IS

### 1.1 The formula (`scoring.ts:527`, `:803`, `:1024`)

```
confidence = clamp( round(
      consensusScore        //  0 … 30   ← the book's own price / book agreement
    + marketDepthScore      //  0 … 20   ← how many books WE ingested
    + edgeComponentScore    //  0 … 25   ← the vig (see 1.3)
    + volatilityPenalty     // -15 …  0   ← step function on book count
    + lineMovementScore     // -15 … 15
    + restAdvantageScore    //   bounded
    + historicalFormScore   // -10 … 10   ← STEP FUNCTION
    + dataQualityPenalty    // -15 …  0   ← STEP FUNCTION, book count again
    + headToHeadScore       //  -5 …  5   ← STEP FUNCTION
    + venueFormScore        //  -5 …  5   ← STEP FUNCTION
    + uncertaintyPenalty    //  -8 …  0   ← STEP FUNCTION on conflict COUNT
    + crossMarketScore      //  -3 …  4   ← STEP FUNCTION
    + scheduleStressScore   //  -5 …  5   ← hinge at |diff| < 2, then linear
    + 10                    //  a bare constant, no stated derivation
), 0, 100)
```

Every cap is a hand-set round number in `constants.ts:46-91`. Nothing in that block carries a fit,
a holdout, a CI, or a provenance note. `constants.ts:23` states the position explicitly: *"Heuristic
confidence / composite weights UNCHANGED."* The composite has not been fitted in any version listed.

### 1.2 It saturates, and its support is truncated at both ends

The positive caps alone sum to **≥129** (30+20+25+15+10+5+5+4+5+10, before rest advantage) into a
clamp at 100. So the top of the scale is **many-to-one**: distinct evidence states map to the same
`confidence`, precisely where a betting product needs resolution.

At the bottom, `MIN_PUBLISH_CONFIDENCE = 50` (`constants.ts`) refuses any pick below 50. Because
`rankingP = confidence/100` (`ranking-prob.ts:58`), that display floor is simultaneously **a floor on
the asserted probability**: every published pick asserts `p ≥ 0.50` by construction. The engine has
no way to say "we think this is a 46% shot at a 40% price," which is the single most valuable thing a
+EV product can say. The two meanings — *how sure are we* and *how likely is it* — were never
separated, and one constant now governs both.

### 1.3 The "Pricing Edge" component measures the vig, and the repo already knows it

`computeEdgeScore` (`scoring.ts:~270`) computes `rawEdge = fairProb − offeredProb`. On an internally
consistent two-way market, `fairProb = q_offered / Σ` where `Σ > 1` is the overround. Therefore:

```
rawEdge  =  q_offered/Σ − q_offered  =  −q_offered · (Σ − 1)/Σ
```

**That is the hold, times the price, negated.** It is always ≤ 0, and it contains *zero* information
that is not already in the two posted prices. Normalised as `(rawEdge + 0.05)/0.10`, a market with a
mathematically impossible zero edge scores **half of 25 points**; a vanilla −110/−110 scores ~6.5/25
→ public **Edge Index 26** (the value the `toEdgeIndex` docstring itself cites).

**Consequence, stated exactly:** the public Edge Index is a monotone *decreasing* function of the vig
the book charges on the chosen side, at fixed fair probability. A lower-hold book raises our Edge
Index with no change to the game. We ship a rescaled measure of bookmaker hold under the word "Edge."

`edge-engine.ts` opens by diagnosing this in its own words — *"that measures the vig and cross-book
scatter, not an opinion — the market grading itself. You cannot beat the close by re-pricing the
close."* It then builds the correct replacement. **The replacement did not displace the defect: the
defect is still 25 of the 100 confidence points and 100% of the public Edge Index.**

**Sub-finding (units, spread + total only).** `scoring.ts:52-64` documents that averaging American
prices arithmetically "produces invalid prices that map to absurd implied probabilities and poison
CLV," and ships `averageAmericanPrices` to fix it. The **moneyline** scorer uses it (`:975`). The
**spread** (`:456`) and **total** scorers do not — they take a plain arithmetic mean of American
prices for `avgPrice` while computing `fairProb` from a mean of *implied probabilities*. The residual
that drives 25 confidence points on those two markets is therefore contaminated by a Jensen gap
across the ±100 discontinuity the repo has already identified and fixed once. This is the only route
by which `rawEdge` can go positive on a vigged market and print *"Model estimates +X% edge."*

### 1.4 One input is counted three times

Bookmaker count enters `confidence` through **three separate additive terms**:

| Path | Range | File |
|---|---|---|
| `computeMarketDepthScore` = `20 × min(books/10, 1)` | 0 … +20 | `scoring.ts:~245` |
| `computeVolatilityPenalty` (`<3` → −10; `<5` → −5) | −15 … 0 | `scoring.ts:349-361` |
| `computeDataQuality` coverage → penalty bands | −15 … 0 | `game-context.ts:286,303` |

Up to **35 points of a 100-point scale — 0.35 of an asserted probability — move with how many books
our ingestion happened to return.** That is a fact about our scraper, not about the game. It is
monotone increasing, so *adding a book raises the published win probability of a game already
played out in the same distribution*. This is the exact collinearity defect the PropFinder teardown
names as "the single most attackable thing in their engine" (hit rate counted four ways), reproduced
here on availability instead of recent form.

### 1.5 Step functions: PropFinder's defect, in ternary form

PropFinder's headline sin is 30 of 100 NFL points being binary yes/no threshold tests that "discard
magnitude entirely." GSE's are graded rather than binary, which is milder — but they are the same
shape:

| Component | Rule | Cliff |
|---|---|---|
| `historicalFormScore` | `≥0.65 → 10`; `≥0.58 → 5`; `≤0.42 → −5`; `≤0.35 → −10` | 0.649 → 5, 0.650 → **10** |
| `headToHeadScore` | `≥0.70 → 5`; `≥0.60 → 3`; `≤0.40 → −3`; `≤0.30 → −5` | 0.699 → 3, 0.700 → **5** |
| `venueFormScore` | `≥0.65 → 5`; `≥0.58 → 3`; `≤0.42 → −3`; `≤0.35 → −5` | same shape |
| `volatilityPenalty` | 2 books → −10; 3 books → −5 | one book = **10 points** |
| `dataQualityPenalty` | `<30 → −15`; `<50 → −8` | qualityScore 49 → −8, 50 → **0** |
| `crossMarketScore` | agree → +4; disagree → −3 | binary |
| `uncertaintyPenalty` | on an integer **count** of named conflicts | binary per conflict |

**~44 points of the ±range are step functions**, and every one is on a hand-set threshold with no
recorded validation. A 5-point step is 0.05 of probability — **the entire ECE floor budget**, awarded
by a single unfitted `if`.

The `agreementFactor` in `edge-engine.ts` is a fourth step: `{CONFIRMS 1.0, SOLO 0.6, SPLIT 0.5,
CONTRADICTS 0}` keyed on an *integer count of estimators*. Going from one estimator to two, both
agreeing, multiplies the edge by 1.67 with no change to either estimate.

### 1.6 What is NOT in the score

**Zero of the 100 points come from an independent estimate of who wins.** The independent path
(Poisson, Skellam, Elo, FPI, Kalshi, Dixon–Coles) enters only via `deriveRankingProbability`, which
produces `rankingP` — a *separate* number used for sort order (`sort-key.ts`) and the selective
sample. `confidence` remains, in the repo's own phrase, "market-echo for UX." So the product ships
two scores: a market echo the customer sees, and a model probability the sort uses. Neither is
presented as what it is.

And even `rankingP` is not clean: `independentWeight ?? 0.7` (`ranking-prob.ts:85`) means the
"priced" path is **0.3 × (scorecard-sum ÷ 100) + 0.7 × trueProb**. Thirty per cent of our best
probability is the arithmetic scorecard, re-entering as a probability. On TOTALS it is 100% of it
(`scoring.ts:844-845`: `rankingP = confidence/100`, `rankingSource: "confidence"`).

---

## 2. THE FOUR CATEGORY ERRORS

**(A) A confidence score is being used as a probability.**
`rankingP = confidence/100` is the load-bearing line. But `confidence` mixes *aleatoric* terms (how
likely is this outcome — consensus, line movement, form) with *epistemic* terms (how much do we know
— depth, freshness, market coverage, volatility, uncertainty) **additively, on one axis**. Those are
different quantities. A probability answers "how often does this happen." An epistemic term answers
"how sure are we of that answer." Summing them makes a number that is neither, and then scoring it
with a proper scoring rule asks a question it cannot answer. `compute.ts:74-82` **already documents
this in the repo** — it states plainly that Brier and per-bucket deltas "assume `confidence/100` is a
win probability… that assumption holds for moneyline picks but NOT for spread/total picks." The
assumption was flagged and then not removed.

**(B) The published calibration measures the market, not us.**
`resolveMarketAnchoredCalibrationP` (`live-calibration-p.ts:202`) resolves, in order: receipt
`marketFairProb` → factor-breakdown `marketFairProb` → odds-table recompute at `generatedAt`. **All
three are the de-vigged book price.** Combined with `MIN_PUBLISH_CONFIDENCE` and the moneyline gate
`fairProb < 0.58 → return null` (`scoring.ts:965`), the eligibility sample is:

> settled two-way moneyline **favourites**, scored on **the sportsbook's own probability**.

A sportsbook is well calibrated on favourites. The AGENTS.md MLB reading (n 373, meanP 0.648, hit
0.649) is that fact, restated.

**INFERENCE, flagged as inference, not measurement:** our only contribution to that number is *which
games we selected*. If our selection found soft books, market-anchored ECE on our subset would be
**high**, because the book's price would be systematically wrong on exactly the games we picked. A
market-anchored ECE that passes a 0.05 floor is therefore, read strictly, evidence that **the book
was right on the games we chose** — i.e. evidence consistent with no selection edge. I have not run
the decomposition that would settle this, and it should not be asserted publicly until someone does.
But it means **passing this floor is not the good news the eligibility surface renders it as**, and
"the calibration we measure ourselves on" is not a description of it. That phrasing is the open
founder acceptance in AGENTS.md; this audit's answer is that it is the wrong claim to accept, because
the sample is not our forecast.

**(C) We publish the estimate and hide the estimator.**
Wave-2 seam: *"'Our measured ECE is 0.047 and the noise floor at n=475 is 0.041' is a STRONGER trust
claim than '0.047'."* Kumar et al. (arXiv:1909.10155) and Roelofs et al. (PMLR v151) establish that
fixed-bin ECE is **optimistically biased** and its bias grows as bins get sparse. `selective-publish.ts`
calls `expectedCalibrationError(samples)` and compares the raw scalar to a literal `0.05`. **No
debiasing, no noise floor, no bin-count sensitivity is published beside it.** The handoff (§ PHASE 1)
already instructs the opposite: *"Select the map by Brier reliability-resolution decomposition, NOT
fixed-bin ECE (ECE is optimistically biased)."* We compute `brierDecomposition` in the same function
and still gate on the ECE scalar.

**(D) CLV exists as data and is not the headline.**
`schema.prisma:557-565` carries `clvLockPrice`, `clvClosePrice`, `clvValue`, `clvVerdict`,
`clvGradedAt`; `settle-picks/route.ts:52` drains pending CLV grades in production. So **realised CLV
is being captured**. The handoff §3 is unambiguous: *"Headline metric = CLV vs OBTAINABLE price:
target +100–300 bps."* Instead, PROVEN is gated on a market-anchored ECE and the public chart buckets
by `confidence`. We are proving on the slow, noisy metric (Bernoulli hit rate / calibration of a
market price) while the fast one — ~10× more sample-efficient, detectable in ~50 bets — sits graded
in a column nobody reads.

---

## 3. THE COMPETITOR WEAKNESS WE ARE REPRODUCING

### 3.1 PF Rating isomorphism

| PropFinder defect (teardown, lines 199-290) | GSE status |
|---|---|
| Unweighted arithmetic sum of components | **REPRODUCED** — `scoring.ts:527` |
| Hand-set round-number weights (3.3/6.6/10), nothing fitted | **REPRODUCED** — `constants.ts:46-91` (30/20/25/15/10/5/5/4) |
| Step functions discard magnitude (30 of 100) | **REPRODUCED, milder** — ~44 pts of ±range as steps (§1.5) |
| One measurement counted four ways (hit rate) | **REPRODUCED on a different variable** — book count 3× (§1.4) |
| Ordinal-only matchup (`20×(1−rank/N)`) | Not reproduced |
| Missing input scored as mediocre input (`S = 5`) | **CORRECTLY AVOIDED** — `galaxy-index.ts` omits; scorers `return null` |
| Not a probability, no `p`, no `q`, no `e = p − q`, no calibration | **PARTIALLY EXPLOITED** — we have all four in `edge-engine.ts` / `gse-score/`, and **none of them is what `confidence` is** |
| Rating never claimed to be a probability | **WE ARE WORSE** — we divide ours by 100 and Brier-score it |

The teardown's closing line reads: *"Their PF Rating is the thing we exist not to be."* On the
evidence above, `confidence` is the thing we exist not to be, wearing better documentation. The
documentation is genuinely better — every defect in §1 is described somewhere in our own comments,
which is more than PropFinder does — but a diagnosed defect that still ships is still shipping.

### 3.2 The seams we are currently forfeiting

| Wave-2 seam | Why we forfeit it today |
|---|---|
| **SaberSim / Stokastic / FantasyLabs: "publish the calibration of the number you sell"** | We publish a calibration **of the market's number**, bucketed by a scorecard. The thing we sell — `confidence` — has no published reliability diagram of its own. |
| **FantasyLabs: "no market benchmark exists in their product"** | We *have* `e = p − q` in `edge-engine.ts` and `pLo − q` in `no-bet-gate.ts`. Neither reaches the board. The board sorts on `rankingP`, 30–100% of which is the scorecard. |
| **Stokastic: "CLV absent from their entire universe"** | Ours is present in the database and absent from every public surface and from the PROVEN gate. |
| **"They sell forward EV with no settled column"** | `edgeScore` → Edge Index is a forward, model-implied number rendered where a result belongs, and it is a hold measurement. Same shape as X-Win. |
| **"Show the estimator, not just the number"** | Raw fixed-bin ECE vs a literal 0.05, no noise floor. |
| **"Publish the de-vig disagreement"** | `shinFairForSide` is computed and persisted as `marketFairShinProb` **on every pick already** — and `marketFairMethod` is hard-coded `"proportional"` and nothing renders the disagreement. This one is nearly free. |
| **Venn-Abers interval as the honest per-pick display** | `calibration/ivap.ts` exists, default-off. We display a saturating scorecard sum instead of a distribution-free interval. |
| **Cluster the bootstrap by game** | `stationary-bootstrap.ts` exists; `bootstrap-metric-ci.ts` resamples two picks on one game as independent. |

### 3.3 Seams we ARE correctly exploiting — do not break these

- **Refusal is implemented, not decorative.** Three-way moneyline suppressed; baseball off-ladder run
  lines suppressed; pick'em boards suppressed; `noEdgeAssessment` as the honest default; forced PASS
  on `CONTRADICTS`. Every competitor in the dossier ships a number for every slot. This is the real
  differentiator and it is genuinely live.
- **Missing input is omitted, never scored as mediocre.** The exact inverse of PropFinder's `S = 5`.
- **Determinism.** `scoreGame` is byte-identical given identical input — the reproducibility seam
  SaberSim's own FAQ concedes it cannot offer. Ship the seed/version alongside and this becomes a
  claim nobody in the category can answer.
- **The engine is frozen and no agent may tune it.** The reason the incumbents' numbers are
  worthless is that nobody can tell when their weights moved. Freezing is a feature. Everything in §4
  respects it.

---

## 4. THE ORDERED CHANGES

Ordered by (truth gained) ÷ (risk incurred). Each is labelled:
**[NO-BUMP]** = adds measurement or display without changing any published pick.
**[BUMP]** = changes what the engine publishes ⇒ **MODEL_VERSION bump + founder sign-off + independent
review** (`_HANDOFF` §1 process; AGENTS.md law 9). No agent may do a **[BUMP]** item.

### 1 — [NO-BUMP] Stop calling the market-anchored ECE our calibration
Highest truth-per-line-of-code in this document. `MARKET_ANCHORED_P_BASIS` measures the sportsbook.
Label it that way on the artifact, the eligibility surface and any public copy: *"Reliability of the
publish-time market price on our selected slate (n=…)."* That is a **defensible and interesting**
number — it is the honest version of the FantasyLabs seam — but it is not our forecast, and the
current phrasing is the one claim in this product that would not survive an outside reader opening
`live-calibration-p.ts`. **This is a copy and labelling change; the number itself stays.**
*Blocks:* nothing. *Founder gate:* only for the public wording (AGENTS.md flags this as the open
acceptance already).

### 2 — [NO-BUMP] Measure `confidence` as a forecast, in shadow, and publish the diagram beside it
Run the same reliability/ECE/Brier machinery on `rankingP` **as its own basis tag**
(`scorecard_v5.2.7`) alongside `market_anchored_v2`. Two diagrams, same slate, same n. This costs one
resolver and one artifact field and it answers the only question that matters: *does our number carry
information the price does not?* It is also the exact Murphy-diagram-vs-market artefact the wave-2
literature dossier names as the strongest honest claim available. **It must not gate PROVEN** until
the founder decides it should — it is a measurement, not a gate.
*Depends on:* nothing. *Risk:* it may read badly. That is the point.

### 3 — [NO-BUMP] Publish the estimator with the estimate
Beside every ECE: bin count, the debiased estimate, and the **noise floor at the current n** (a
parametric bootstrap of ECE under a perfectly-calibrated null). `bootstrap-metric-ci.ts` and
`stationary-bootstrap.ts` are already in the tree. Cluster the bootstrap **by game** — two picks on
one game share the outcome completely and are currently resampled as independent, which narrows every
published interval. Being the only product whose intervals account for clustering is small, real and
permanent.

### 4 — [NO-BUMP] Surface CLV as the headline, since it is already graded
`clvValue` / `clvVerdict` are populated in production. Build the settled CLV distribution (n, median
bps, share BEAT_CLOSE, clustered Wilson bound) and put it where the win rate would go. Per the
handoff this is ~10× more sample-efficient than grading Bernoulli outcomes; per the Stokastic and
FantasyLabs dossiers it is a dimension **no competitor measures at all**. It is also the one honest
number available while the settled record is under the 2026-09-08 score-integrity hold, **because CLV
is graded against the closing price, not against the disputed final score.** That last point matters
operationally: it is a proof surface that the score-integrity incident does not invalidate.
*Constraint:* the CLV column is only as good as the closing capture; verify coverage (`clvCapturedAt`
non-null share) before publishing any denominator.

### 5 — [NO-BUMP] Publish the de-vig disagreement
`marketFairShinProb` is already persisted on every pick next to `marketFairProb`, and
`devig-method-compare.ts` already computes proportional vs Shin vs power with a longshot-inflation
diagnostic. Render `|Shin − proportional|` per pick and in aggregate. Strumbelj (IJF 2014) found Shin
better than basic normalisation for every book/sport pair tested; showing that reasonable methods
disagree, and by how much, is a moat made of candour and it costs one component. **Do not change
which one mints picks** — that is item 10.

### 6 — [NO-BUMP] Run the label-permutation placebo on the evaluation gate
`honesty/placebo-leak.ts` placebos the *feature* path; nothing placebos the *gate*. Shuffle outcomes,
re-run the eligibility floors, confirm they fail. A gate that passes on shuffled labels is broken.
After the 2026-09-08 finding (25/169 FINAL rows contradicted by ESPN; 8 moneylines outright reversed),
this is not hypothetical: at ~1.7% random label flips each bin's observed rate shifts by ≈0.005 —
**about 10% of the entire ECE floor budget, from labels we already know are wrong.**

### 7 — [NO-BUMP] Separate the two meanings in the display layer
Ship `rankingP` (a probability) and `confidence` (an evidence/uncertainty score) as **two labelled
fields**, never one. Today `sort-key.ts` silently falls back `rankingP → rankingScore → confidence/100`,
so the board's sort key changes *meaning* row to row with no indication. Label each row's
`rankingSource`. Then surface `e = p − q` as a **first-class board column** — the Stokastic
"leverage" lesson, which is the same shape as our edge and is the single most-praised primitive in
their product. Free UI, zero modelling.

### 8 — [BUMP] Fix the American-price averaging in the spread and total scorers
`averageAmericanPrices` exists and the moneyline scorer uses it; spread (`scoring.ts:456`) and total
do not. This changes `entryPrice`, `rawEdge`, `edgeScore` and therefore `confidence` on every spread
and total pick. It is a **defect repair, not a tune** — the repo already ruled the arithmetic mean
invalid in its own docstring — but it changes published numbers, so it is a bump.
**Founder sign-off required. No agent may land this.**

### 9 — [BUMP] Remove availability from the probability
Take `marketDepthScore` (+20), the book-count arm of `volatilityPenalty` (−15) and the coverage arm of
`dataQualityPenalty` (−15) **out of the additive confidence sum** and re-express them as a single
*evidence* dimension that gates publication and widens the interval — never as a term that moves `p`.
This is the largest single correction available and it is what makes `confidence` stop being a
scorecard. It changes every pick. **Founder sign-off + independent review.**

### 10 — [BUMP] Retire `computeEdgeScore` from `confidence` and from the public Edge Index
It is `−q·(Σ−1)/Σ` — the hold. Replace the Edge Index with `e = p − q` from the independent path,
and render "Edge pending" (not a number) when there is no independent estimate. Note the honest
consequence: **the Edge Index will disappear from most of the board**, because most picks have no
independent estimator. That is the correct outcome and it is the product's whole premise. **Founder
sign-off + independent review.**

### 11 — [BUMP] Replace the step functions with continuous transfer functions
`historicalForm`, `headToHead`, `venueForm`, `dataQuality` bands, `volatility` bands, `crossMarket`.
Each becomes a bounded continuous map — and each should be **shrunk toward zero by its own sample
size** (empirical-Bayes), since an ATS rate over 5 games and one over 40 currently earn identical
points. This is the direct repair of the defect we attack PropFinder for. **Bump; sign-off.**

### 12 — [BUMP, LAST] Promote `gse-action-score` / `no-bet-gate` to the publish path
The doctrine-correct engine exists: `gse-score/gse-action-score.ts` with a calibration contract, a
feature contract, a model parliament and a no-bet gate that fires on `pLo − q > τ`. Wiring it is the
end state the handoff describes and it should be the **last** step, after 1–11 have established
whether `p` is worth acting on. **Founder decision, not an engineering one.**

**Do items 1–7 now. They are all [NO-BUMP], they are all measurement or labelling, and together they
convert the honesty gap into a published artifact. Items 8–12 are the founder's.**

---

## 5. WHAT MUST NOT CHANGE

- **No floor, threshold or health constant may be touched to move a light.** AGENTS.md law 9. The
  ECE floor, the 6h settlement grace, the 24h zero-sit delay, `streakRequired`, `MIN_PUBLISH_CONFIDENCE`,
  the 0.58 moneyline gate — every one of these would turn something green without making anything
  more true. Item 9 changes what a *component measures*; it does not lower a bar.
- **Do not build a contest simulator** (wave-2 anti-seam). Endogenous-field DFS Monte Carlo is years
  of tuning solving a problem that is not ours. Our seam is verification and selection.
- **Do not out-build Sleeper's league software.** Same reasoning.
- **Do not weaken the refusal paths.** The three-way suppression, the run-line guard, the pick'em
  guard and the forced PASS on CONTRADICTS are the most valuable code in the engine. Every fix above
  should make the board *smaller*, not larger.
- **Do not publish any calibration, win rate or PROVEN claim** while the settled record is under the
  2026-09-08 score-integrity hold. Item 4 (CLV) is the exception **only** because CLV grades against
  the closing price rather than the disputed final score — and that exception needs the founder to
  agree before anything renders.

---

## 6. HONEST GAPS IN THIS AUDIT

- **NOT RUN:** no test, typecheck, build, guardrail or query. This is a read of source.
- **NOT MEASURED:** the share of live picks whose `rankingSource` is `confidence` vs
  `independent_trueProb`. §1.6's claim that the scorecard dominates is *structural* (from the code
  paths and from `rankingP = confidence/100` on all TOTALS) — the **live proportion is unknown** and
  is the single most useful next measurement. It decides whether item 2 reads well or badly.
- **NOT ESTABLISHED:** the §2(B) inference that a passing market-anchored ECE is evidence *against*
  selection edge. It follows from the sample definition, but it is an inference and needs the
  per-bin decomposition nobody has run. Do not put it in copy.
- **NOT READ:** `game-context.ts` rest-advantage clamp constant; `composite-score.ts`;
  `probability-calibration.ts`; whether any calibration map is active in production (`constants.ts`
  says "Maps still OFF" as of v5.2.7, which I did not verify against the deploy).
- **NOT CHECKED:** `clvCapturedAt` coverage — item 4 is unsafe to publish without it.
