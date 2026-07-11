# FantasyPros Accuracy — the z-score aggregation, in depth (VERIFIED)

Flagged as important (cross-session interest in z-score). Everything here is verified against the live + archived methodology page and described in my own words; it is factual method, not reproduced text.

## Where the z-score sits in their pipeline
1. **Per player:** rank slot → expected points (historical avg production for that slot, bye-week adjusted). |expected − actual| = **Accuracy Gap** (the expert's *error* on that player; 0 = perfect).
2. **Per position, per week:** sum every player's Accuracy Gap → a raw weekly positional gap (lower = better).
3. **The problem they're solving:** some weeks are simply harder to predict than others (chaos weeks). If they summed raw gaps across weeks, hard weeks would dominate the season total and unfairly punish an expert who was actually *best relative to the field* in that hard week. Dropping the same calendar week for everyone wouldn't fix it either.
4. **The z-score step (the key move):** within each week+position, convert every expert's raw Accuracy Gap into a **z-score** = how many standard deviations that expert's gap is above/below the **average gap across all experts that week**. This re-bases every week onto the same scale (mean 0, SD 1), so weeks can be **aggregated with equal weight** regardless of how hard/easy they were.
5. **Drop-worst-week:** once the season reaches Week 8, they **drop each expert's single worst-z-score week** ("grace" for a missed update/injury). Because it's the worst *z-score* (not raw gap), it's guaranteed to be the week that hurt them most relative to the field. **The dropped week can differ by position.**
6. **Season total:** sum the surviving weekly z-scores (Weeks 1–17, Week 18 excluded) per position → the leaderboard.

## Why the z-score design is clever — and where it quietly biases
**Genuinely smart:** field-relative z-scoring is a defensible way to compare an expert across uneven weeks — it measures *separation from the pack*, not raw error, so a good call in a bloodbath week counts as much as a good call in a chalk week. Credit where due; it's more principled than raw-gap summing.

**But the biases that follow (the corners):**
- **A. Chalk-week noise amplification.** In a week where every expert ranks nearly identically, the *spread* of raw gaps is tiny — so dividing by a tiny standard deviation **magnifies microscopic differences into large z-swings**. Leaderboard movement in low-variance weeks is largely statistical noise dressed up as skill. The system is loudest exactly when there's least real signal.
- **B. Drop-worst-z launders the biggest miss.** Removing each expert's worst *relative* week systematically deletes their single largest blowup. A **high-conviction, boom-bust analyst** (the kind who actually beats consensus) gets their one disaster erased — but z-scoring also **caps how much their booms help** (you can only be so many SDs *above* a tight field). Asymmetric: ceiling capped, floor forgiven → the metric **structurally favors low-variance, chalk-hugging experts**. That bias then feeds back into the ECR consensus those experts define.
- **C. "Separation is impossible in easy weeks" → the season is decided by chaos weeks + who dodged disaster.** Because easy weeks compress everyone toward z≈0, the standings are effectively determined by (i) the few high-variance weeks and (ii) not having a catastrophic week (which gets dropped anyway). Skill in normal weeks barely moves the needle.
- **D. Relative, not absolute, accuracy.** A z-score says "better than the field," not "actually right." If the whole expert field is systematically wrong on a player (shared blind spot), **no one is penalized** — being wrong *with everyone* is free. This is the deepest one: the metric cannot detect consensus-wide error, which is precisely the error a differentiated model exists to catch.

## The GSE counter (why this is a wedge, concretely)
- Score predictions with a **proper scoring rule** (Brier / log-loss on win-probabilities or calibrated point projections) — rewards *calibrated magnitude and conviction*, not ordinal separation from a herd.
- **Absolute, not just field-relative** — so consensus-wide blind spots (bias D) are catchable and creditable; beating the field AND beating reality both score.
- **No worst-week drop** — report full-season calibration honestly; use reliability diagrams, not variance laundering.
- **Coverage-adjusted** — close bias in the omission seam (ECR-capped penalty) by scoring against actual finish.
- Then **weight the consensus by this fairer, calibration-verified accuracy** → a consensus that isn't dragged toward chalk. This is the extension of the 2026-07-07 accuracy-weighted consensus engine.

## 2018 → 2025 evolution (what they changed; core method unchanged)
| Element | 2018 | 2025 |
|---|---|---|
| Scoring basis | **Standard** scoring | **Half-PPR** |
| Season length | 16 weeks | **17** weeks (Wk 18 excluded) |
| Experts | ~130 (2017) | **150+** (2024) |
| RB pool | Top 35 ECR / Top 35 actual | **Top 40 / Top 40** |
| WR pool | Top 35 / Top 35 | **Top 50 / Top 50** |
| IDP (LB/DB/DL) | graded Top 30, in-line | **Top 40, split into a separate IDP competition** |
| Core "Accuracy Gap" (rank-slot→expected pts→|error|) | present | **unchanged** |
| z-score + drop-worst-week | present (z-score/drop language in 2018 page too) | unchanged |

Takeaway: the **skeleton (Accuracy Gap + z-score + drop-worst-week) has been stable since ≥2018**; they only widened pools, switched to Half-PPR, and hived off IDP. So the biases above are long-standing and load-bearing, not a recent tweak — the whole "most accurate experts" brand has rested on this the entire time.
