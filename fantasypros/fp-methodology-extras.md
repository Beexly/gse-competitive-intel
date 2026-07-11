# FantasyPros — methodology extras (deep corners, verified)

Companion to `fp-zscore-deepdive.md` and `fp-accuracy-loopholes.md`. All method described in my own words from public FAQ/support pages; no copyrighted text reproduced. "Don't miss anything" pass.

## 1. THE HEADLINE: their "own" projections are just averages of others' projections
FantasyPros markets first-party projection products, but by their own public description they are **aggregations, not models**:
- **Zeile (their consensus projection)** — a **straight-up average of most of the other projection systems** on the site. Pure wisdom-of-crowd, implemented as plainly as possible. This is the system that *won* their own 2025 baseball projection-accuracy study — i.e., **the crowd average beat the individual modelers.**
- **ATC (Ariel Cohen's)** — also a consensus of other systems, but **weighted by each source's historical accuracy per category** (an accuracy-weighted average). Still an aggregate of others.
- The genuinely-original predictive engines they blend (e.g., **Derek Carty's THE BAT**) are **third-party systems**, not FantasyPros'.
- **=> FantasyPros produces no first-party prediction. ECR averages rankings; Zeile averages projections. Aggregation all the way down.** This is the strongest single confirmation of the core thesis: their entire value is packaging + distributing other people's signal.
- **GSE wedge sharpened:** the fact that a *plain average* (Zeile) wins their own accuracy study is the whole industry admitting no individual expert reliably beats the crowd — which is exactly the vacuum a genuinely differentiated, calibrated model fills. And note the ATC insight — *accuracy-weighting the sources beats a plain average* — is precisely GSE's accuracy-weighted-consensus thesis (07-07 engine), validated by their own data.

## 2. Preseason/DRAFT accuracy — the WEIGHTED Accuracy Gap (differs from in-season)
The draft/preseason track adds a **weighting the in-season track does not have**:
- Each player's Accuracy Gap is multiplied by a factor based on the player's **preseason ECR**.
- Multiplier ranges **1.0 (max) → 0.5 (min, never 0)**.
- Players inside a position's "premium draft range" → **1.0** (e.g., ~top 18 QB, top 72 RB, top 84 WR).
- Players below a secondary threshold → **0.5** (e.g., WR ECR ≥ ~112).
- Between the two cutoffs → **linear scaling**. Each position has its own thresholds.
- Purpose: shrink the influence of deep, draft-irrelevant players so misses on drafted players matter more.
- Weighted gap = gap × multiplier; summed across players.

**Loophole read:** the weighting *fixes the deep-player-noise complaint* — good. But: (a) the floor is 0.5, not 0, so undrafted noise never fully leaves; (b) thresholds are fixed/generic (a value curve, not the expert's conviction — seam 1 survives); (c) the weight is keyed to **ECR**, so if consensus mis-values a player, the accuracy weighting **inherits the consensus bias** (circular — they grade experts using the experts' own consensus as the yardstick); (d) still built on rank-slot→expected-points, and still relative (seam 6 survives).

## 3. ECR is a Borda-count (Rank Points), not an average
- ECR is computed by **Rank Points**: each rank position is worth points (better rank = more points); points are summed per player across all experts → consensus order.
- They explicitly reject "average rank" because unranked players would need arbitrary ranks that skew a mean.
- **This is a positional-voting / Borda-count method.** Properties worth knowing: Borda counts are (a) susceptible to *strategic ranking* (an expert can move consensus by ranking a player extreme), (b) still fundamentally an averaging of ordinal opinion — no magnitude/conviction, no calibration, and (c) inherit every shared blind spot of the expert pool. It's a *fairer* aggregation than a naive mean, but it's still an aggregation of opinions, not a prediction.

## 4. There are THREE separate accuracy tracks (not two)
Previously captured Draft + In-Season; there is also a **Rest-of-Season (ROS) Accuracy Methodology** (`/about/faq/football-rest-of-season-accuracy-methodology/`). So FantasyPros grades experts on:
1. **Draft/Preseason** — weighted Accuracy Gap, snapshot before Week 1, 190–225+ experts.
2. **In-Season (weekly)** — Accuracy Gap → z-score → drop-worst-week, Weeks 1–17, 150+ experts.
3. **Rest-of-Season** — separate track for mid-season ROS rankings.
Plus a distinct **Projection Accuracy** study (grades projection *systems*, not just rankers — where Zeile/ATC win).

## 5. Net synthesis for GSE
- Every FantasyPros "signal" is an aggregation: ECR (Borda of rankings), Zeile (mean of projections), ATC (accuracy-weighted mean of projections), accuracy leaderboards (relative z-scores). **Nowhere is there a first-party model.**
- Their *own data* proves two GSE theses: (1) plain-average crowd (Zeile) beats individual experts → the vacuum a real model fills; (2) accuracy-weighting sources (ATC) beats plain averaging → GSE's accuracy-weighted-consensus engine is the right direction, confirmed by the incumbent's numbers.
- The build: GSE's calibrated first-party model + an **accuracy-weighted, absolutely-scored** consensus + an honest leaderboard = attacks all four aggregation layers at once, with receipts they structurally can't produce.
