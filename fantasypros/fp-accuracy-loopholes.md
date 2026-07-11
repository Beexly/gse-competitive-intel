# FantasyPros Accuracy Engine — how it works, and where it's gameable

Their public "Expert Accuracy" leaderboard is a core credibility asset — it's how they justify the ECR consensus and rank 100+ experts. Here's the method (from their public methodology page, described in my own words) and the exploitable seams. Methods/formulas aren't copyrightable; this is analysis, not reproduction.

## The method (in-season, NFL)
1. **Error metric = "Accuracy Gap."** For each ranked player: map the expert's *rank slot* → an expected fantasy-point value drawn from the historical average production at that slot, then take the absolute difference vs the player's actual points. Closer to zero = better.
2. **Aggregate within position** (sum of gaps per position, per week).
3. **Overall = QB/RB/WR/TE only.** K and DST are scored separately and excluded from Overall; IDP not in Overall.
4. **Two snapshots per week:** Thursday-night kickoff and Sunday 1 p.m. ET (Thursday players locked at kickoff). Half-PPR scoring basis.
5. **Missing-player rule (verified, Step 3 — and it's a two-way defense):** a pool player the expert didn't rank is slotted by *how* they entered the pool. If via the ECR cutoff → the expert's last-ranked player +1. If via the *actual-points* cutoff (a surprise overperformer) → the **worse of** (player's ECR +1) or (expert's last +1) — explicitly so deep rankers aren't unfairly punished. They also call out failing to bench an injured player as something that *should* hurt.
6. **Step 4 — z-scores + drop-worst-week (verified):** sum Weeks 1–17 per position (Week 18 excluded); to compare hard vs easy weeks fairly, convert each week's Accuracy Gaps to **z-scores** (SDs above/below the field that week), then **drop each expert's single worst-z-score week** (after Week 8; the dropped week can differ per position).
7. **No hard minimum-coverage rule**; pools now run QB Top-20, RB Top-40, WR Top-50, TE/K/DST Top-15 (IDP scored in a separate competition).

## The loopholes (the part they don't advertise)

1. **Rank→generic-curve baseline destroys conviction.** An expert isn't scored against *their own* point projection — they're scored against a league-wide average curve for that rank slot. Two experts who both rank a player RB5 score identically, even if one screamed "league-winner" and the other had him barely ahead of RB6. **Tiering and gaps — the actual expert signal — are invisible to the score.** It rewards ordinal guessing, not calibrated magnitude.
2. **"Drop your worst week" rewards floor, not ceiling.** Discarding each expert's worst week (post-Wk 8) launders variance. A bold analyst who nails three boom calls but eats one disaster gets the disaster erased; the z-score cap already limits how much the booms help. Net effect: **the leaderboard selects for consistent blandness over high-conviction accuracy** — which quietly biases the whole ECR toward chalk.
3. **The short-list omission dodge — REAL BUT PARTIALLY DEFENDED (corrected after verifying Step 3).** They *do* penalize omissions, two ways: an unranked ECR-pool player → your-last-rank+1; an unranked *surprise overperformer* → the **worse of** (player ECR+1, your-last+1). That blunts the crude version of the dodge. **The residual loophole that survives:** when a low-ECR player booms, the omitting expert is only slotted to ~**ECR+1**, *not* to the player's actual (much better) finish — so you're penalized as if that sleeper finished near his consensus, never as the league-winner he actually was. Net: **omitting deep sleepers still costs far less than the miss is worth**, so caution/short lists remain quietly advantaged. (This corrects/sharpens the 2026-07-07 teardown's omission claim — the dodge is narrower than first stated, but the ECR-capped penalty is the true seam.)
4. **Snapshot timing = free accuracy.** Two fixed snapshots (Thu kickoff, Sun 1pm) mean an expert who simply **updates latest, closest to lock** — folding in inactives/weather — looks "more accurate" from information timing, not skill. Rewards refresh cadence, not foresight.
5. **Field-relative z-scores make chalk weeks noise.** In a week where everyone ranks similarly, minuscule gap differences get stretched into big z-score swings — leaderboard movement that is statistical noise, presented as skill.
6. **Overall excludes K/DST/IDP** — a "most accurate expert overall" title is really "accurate at QB/RB/WR/TE," narrower than it sounds.

## Why this is a GSE wedge
- FantasyPros' authority rests on **averaging other people and grading them with a method that rewards ordinal caution**. It has **no first-party predictive signal** — ECR is a mean of experts, and the accuracy engine that legitimizes it is gameable in the six ways above.
- GSE's counter is precisely what their method can't measure: **calibrated, magnitude-aware predictions with a public, honest back-test** (Brier/log-loss, not "drop your worst week"; conviction and tiers scored, not just order; full coverage, no omission dodge; single locked prediction, not late-snapshot laundering).
- Concrete build (extends the 2026-07-07 consensus-accuracy engine): score rankings with a **proper scoring rule** (calibration + magnitude), **penalize omission** (coverage-adjusted), and **weight consensus by verified calibrated accuracy** rather than FantasyPros' self-graded, floor-rewarding score. That is a demonstrably fairer accuracy leaderboard — a public one would directly undercut theirs.

## Evolution note
Their methodology page is archived on the Wayback Machine back to **Jan 2018** (revised Mar 2018 → current Dec 2025) — a diff of those snapshots shows whether the "drop-worst-week" and z-score rules were added over time (recommended follow-up; web.archive blocked one fetch path, retrievable via CDX raw HTML).
