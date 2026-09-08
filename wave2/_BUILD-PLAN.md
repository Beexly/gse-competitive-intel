# GSE BUILD PLAN — derived from the wave-2 dossiers
**Written:** 2026-09-08 · **Inputs:** the 9 wave-2 competitor dossiers, `_HANDOFF-to-coding-agent.md`, and a read of the live repo at `/home/user/Sports`.
**Costing:** rough single-engineer days, inclusive of tests, `npm run typecheck`, `npm run lint`, and `npm run guardrails`. Not calendar days.
**Every item names the file where the work starts.** Paths are repo-relative to `/home/user/Sports` unless marked otherwise.

---

## 0. THE THREE FACTS THAT SET THE ORDER

Everything below is ordered by these, not by competitive appeal. Each is measured in the repo or in `AGENTS.md`, not inferred.

**FACT 1 — The settled record is under an integrity hold, so no performance number is publishable at any price.**
`AGENTS.md` (2026-09-08, 14:45 UTC): 25 of 169 `games` rows marked FINAL hold a score the ESPN feed we ingested from contradicts; 54 settled published picks sit on those rows; 16 are MONEYLINE — the market the entire calibration sample is built from — and 8 are recorded as the opposite of what happened. MLS is worse than MLB (14 of 48 comparable, 29%) and breaks the series-propagation explanation, so more than one mechanism is at work. Evidence: `docs/ops/SCORE_INTEGRITY_2026-09-08.md`, tool `npm run ops:verify-scores`.
**Consequence:** ECE 0.0466, Brier 0.1898, the PROVEN ladder step, and every calibration chart are measurements over inputs known to be partly wrong. Nothing in section B or C that publishes a number may ship before A1 closes. This is not a reason to hide the problem — it is the reason A1 is item one.

**FACT 2 — The public board gates on confidence, which the handoff calls the single most important modeling rule not to break.**
`apps/web/lib/calibration/selective-publish-runtime.ts:57-77` builds thresholds as `{ delta, edge: plan?.selectiveRecommended?.edge ?? null, minGroupRes: null }`. The tuned edge is null, so in `apps/web/lib/calibration/selective-publish.ts:65-81` the only operative test is `Math.abs(row.p - 0.5) < t.delta`. That is κ = max(p, 1−p) under another name. `_HANDOFF-to-coding-agent.md` §1 line 18: *"Fire/rank on calibrated EDGE e = p − q … NEVER on confidence κ … Confidence-gating = betting chalk at −EV = scores24's fatal error. This is the single most important modeling rule."*
It gates on confidence because it cannot gate on edge: measured on production 2026-09-08 and recorded verbatim in `apps/web/lib/picks/independent-edge-badge.ts:12-16`, **428 of 435 published MONEYLINE picks carry an `independentEdge` object and only 41 of those carry a `marketFairProb`** — 90.6% of the moneyline board has no market probability at all. `packages/ingestion-pipeline/src/signal-market-anchor.ts` (C-253) already establishes that this was never a data problem: 232 of the 387 unanchored picks had a real bookmaker quoting both sides in our own `odds` table at or before the pick's `generatedAt`, and 103 had two or more. The price was in the database and the slate did not look.

**FACT 3 — Every DFS surface we ship publicly is a head-to-head we lose, and it runs on fiction.**
`apps/web/lib/fantasy/dfs-optimizer.ts` is a genuinely excellent exact salary-cap DP — deterministic, optimal, no local search — over **one scalar projection per player** (`objVal`, line 88: `p.proj * g` / `p.ceiling * g`). Its input is `apps/web/lib/integrations/dfs.ts:activeDfsSlate()`, which returns `DFS_SLATE`, a 40-odd row hand-written fixture in `apps/web/lib/fantasy/dfs-slate.ts`, unless a founder registers a licensed provider that does not exist. Against SaberSim (two stacked Monte Carlo layers, joint per-player outcomes, contest-specific ROI) and Stokastic (endogenous field, dupes priced into simulated ROI), a one-projection optimizer on a fictional slate is not a weaker product in the same category — it is a different, smaller object. The page is honestly labelled ("Illustrative classic-format sample pool", `apps/web/app/fantasy/dfs/page.tsx:36`), so it breaks no rule. It should still not be in the sitemap at launch.

---

## A. WHAT MUST BE TRUE BEFORE LAUNCH
**Total: ~41 engineer-days.** Nothing in B or C starts before A1–A6 are green. A7 (the cull) can run in parallel with everything.

### A1 — Root-cause and re-settle the corrupted score rows · 6 d eng + FOUNDER
**Start:** `apps/web/lib/data-sources/free-score-persist.ts` (the `MAX_KICKOFF_DRIFT_MS` guard whose own comment says it exists to prevent exactly this), then `apps/web/lib/data-sources/settle-backfill.ts` and `apps/web/lib/data-sources/multi-source-scores.ts`. Read `docs/ops/SCORE_INTEGRITY_2026-09-08.md` first; reproduce with `npm run ops:verify-scores`.
**Do:** identify the writer(s) — plural, per the MLS evidence — and land the fix. Then quantify: how many settled picks change grade, and what ECE/Brier read on the corrected sample.
**Do not:** write to the database from an agent session. Law 7. The repair itself is a founder action; the agent produces the root cause, the fix, and the exact list of affected pick ids.
**Blocking for:** every number GSE publishes. There is no way around this one.
**Note honestly:** 146 NCAAF rows and 63 MLS rows carry no ESPN event id and cannot be compared at all. Report the UNCOMPARABLE count beside the mismatch count in any summary, exactly as `ops:verify-scores` already does — "0 mismatches" over rows the check could not see is the failure mode this whole item exists to prevent.

### A2 — Raise market-anchor coverage on published picks to the point where an edge gate is possible · 5 d
**Start:** `packages/ingestion-pipeline/src/signal-market-anchor.ts` (already built, C-253) and its caller `packages/ingestion-pipeline/src/generate-signal-slate.ts`.
**Do:** make the signal slate resolve a market anchor from the existing `odds` table for every pick where one exists at or before `generatedAt`. The mechanism is written; this is coverage. Target and *publish as a metric on the ops truth surface* the anchored fraction — not a claim, an operational number: `anchoredPicks / publishedPicks`, alongside the reason each unanchored row is unanchored.
**Acceptance:** the anchored fraction on new published MONEYLINE picks, measured over one full slate cycle, replaces the 41/435 figure. If the honest ceiling is 60% rather than 95%, that is the answer and A3 is designed around it.
**Do not:** invent an anchor. `SIGNAL_EDGE_SHRINK` and the `anchored: false` tagging in that file are correct and stay. A coin flip standing in for a market is not a market, and the file already says so.

### A3 — Add the anchored edge as a REQUIRED term in the public selective gate · 3 d
**Start:** `apps/web/lib/calibration/selective-publish-runtime.ts:57-77` (`loadSelectiveRuntimeConfig`, the `edge: … ?? null` line) and `apps/web/lib/calibration/selective-publish.ts:65-81` (`passesSelectiveThresholds`, the "no market line: allow in signal mode" branch).
**Do:** two changes, both strictly narrowing. (1) The edge term stops being optional: a pick with no anchor no longer passes the edge filter by default — it is routed to a labelled *unpriced* lane rather than onto the priced board. (2) The gate's primary test becomes `|p − q| ≥ e` with the `|p − 0.5| ≥ δ` term retained as a secondary floor, not replaced by it.
**This is a tightening, not a gate flip.** It removes rows from the public board; it adds none. It changes no environment flag, no threshold value downward, and no publish gate. Law 3 and law 9 are satisfied because the set of published picks after the change is a strict subset of the set before it.
**Acceptance:** a test asserting the post-change published set ⊆ the pre-change published set, on the same fixture rows.

### A4 — Fix the three defects in the public /calibration chart · 4 d
**Start:** `apps/web/lib/calibration/compute.ts` — `BUCKETS` at line 211, `resultToOutcome` at line 256, `clopperPearsonInterval(wins, decided)` at line 303 against `observed` over all rows at line 305.
**Do:**
1. **Equal-mass bins beside the current equal-width confidence buckets.** `quantileBucketsFromSettled` (line 333, `QUANTILE_BIN_COUNT = 5`) already exists — surface it. Report the delta between the two binnings. If the two disagree by more than the 0.0034 the PROVEN gate is currently being decided on, the gate is measuring the binning scheme, and that fact belongs in public.
2. **PUSH stops scoring as y = 0.5.** `resultToOutcome` maps PUSH to 0.5, which mechanically lowers Brier (a push contributes at most 0.25 where a decided outcome can contribute 1.0), breaks the Murphy decomposition's binary-y assumption, and directly contradicts `CALIBRATION_DISCLAIMER` two screens below it, which says pushes count in the population and not the rate. Exclude PUSH from the rate; keep it in the denominator, as the disclaimer already promises.
3. **Make the band's population match the plotted point.** The 95% Clopper-Pearson band is computed over `(wins, decided)`; the plotted `observedWinRate` averages outcomes over all rows including pushes at 0.5. With any pushes present the band can fail to contain the point it is drawn around.
**Note:** this also closes the open founder acceptance recorded in `AGENTS.md` 2026-09-06 about the chart bucketing by confidence.
**If A4 does not land, `/calibration` comes out of the sitemap** (see the cull). Shipping the honesty page with three arithmetic defects is worse than not shipping it.

### A5 — Print the ECE estimator's noise floor beside every published ECE · 2 d
**Start:** `apps/web/lib/ops/compute-live-calibration-metrics.ts:195` (the `expectedCalibrationError` call) and `apps/web/lib/ops/calibration-eligibility.ts` (report fields, beside the existing `ece`/`brier`/`mce`).
**Do:** compute and display `E[ECE_plugin] ≈ 0.399·sqrt(K_eff/n)` under the perfectly-calibrated null, with `K_eff` measured from the live sample's actual per-bin occupancy rather than assumed.
**Why this is a launch blocker and not a nicety:** at n = 475 the floor is 0.037 (K_eff = 4) to 0.058 (K_eff = 10), and the measured 0.0466 sits inside that band. The sentence "our measured ECE is 0.0466 and the estimator's noise floor at this n is 0.041, so we cannot yet distinguish ourselves from perfectly calibrated" is a *stronger* trust claim than "0.0466" and it is the only version of the sentence that is true. It also retires two open puzzles in `AGENTS.md` without new work: the figure moved 0.0524 → 0.0466 with no code change because plug-in bias falls as 1/√n, and the pooled ECE sits below every stratum it is built from because smaller strata carry larger positive bias — no signed-error cancellation needed to explain either.
**Do not** touch the 0.05 floor in `calibration-eligibility.ts:71-73`. Reporting the noise floor next to the number is disclosure; moving the floor is law 9.

### A6 — Label-permutation placebo on the eligibility gate itself · 2 d
**Start:** new test/cron beside `apps/web/lib/ops/calibration-eligibility-durable.ts`; copy the seeded shuffle pattern from `packages/prediction-engine/src/honesty/placebo-leak.ts` (`shuffleInPlace`).
**Do:** re-run the full eligibility computation on outcome-permuted labels and assert it reads RED. GSE has placebo machinery for the feature path and none for the evaluation path. A gate that passes on shuffled outcomes is not a gate.
**Why now:** after A1's finding this is not hypothetical. At ~1.7% of settled rows carrying flipped labels, each bin's observed rate shifts by roughly 0.005 — about 10% of the entire ECE floor budget — from labels we already know are wrong. Because the reversals cluster in a consecutive-day pattern rather than being random, that figure is neither an upper nor a lower bound, which is exactly why a standing permutation control is the right instrument rather than an arithmetic correction.

### A7 — Give `selectivePublishSweep` a time hold-out · 3 d
**Start:** `apps/web/lib/calibration/selective-publish.ts:162` (`selectivePublishSweep`; defaults `deltas` 6 × `edges` 3 × `minGroupResList` = at least 18 grid cells at lines 178-180).
**Do:** choose (δ, edge, minGroupRes) on rows before a cutoff T; report the winner's Brier/ECE/RES **only on rows after T**. The `.claude/skills/calibration-pipeline` skill already prescribes a time hold-out; the function does not take one.
**Why this is section A and not section B:** the sweep's `recommended` output flows into `plan.selectiveRecommended` and from there into `loadSelectiveRuntimeConfig` — the threshold the **live public board** filters on is the argmax of ≥18 correlated candidates evaluated on the same rows it then reports metrics for. That is `_HANDOFF` §5's "tuning the risk-coverage curve on the eval set = guaranteed optimism = the #1 self-deception risk", running in production today.
**If a disjoint fold is genuinely unavailable at current n, say so in the artifact's `note` and report the in-sample winner as in-sample.** An honest "we cannot yet tune this without optimism" is a shippable state; a silently optimistic threshold is not.

### A8 — Promote the display guard from a ledger utility to a repo-wide render convention · 5 d
**Start:** `apps/web/lib/ledger/display-guard.ts` (`renderableMetricOrNull`, already correct and already enforcing the four substantiation legs). Second file: `apps/web/lib/intelligence/hit-rate-display.ts`, which has its own separate minimum-sample rule.
**Do:** (1) move the guard out of `lib/ledger/` to a neutral module and route every performance/probability/rate render site through it; (2) add the **modeled vs settled badge** — every probability, ROI or rate on any surface renders either `modeled` (forward, model-implied) or `settled (n = …, LCB …)`, and the guard fails the render when the badge is absent, not only when the four provenance fields are.
**Why:** this is the single cheapest permanently-uncopyable UI convention in the whole dossier set. Stokastic displays X-Win / X-ROI / hold, FantasyLabs displays "Bet Quality", RotoGrinders displays "EV, Hit Rate" — all forward model outputs, all rendered in the visual position a realised result occupies. None of them can add a settled column without publishing a record they do not have.
**Do not:** ship the badge as a style rule in `docs/`. It has to be code that refuses to render, or it decays within two sprints.

### A9 — The surface cull · 4 d
See the next section. Runs in parallel; blocks launch.

### A10 — Pricing copy must stop selling surfaces that do not exist in the form advertised · 2 d
**Start:** `apps/web/lib/pricing/pricing-phases.ts` (the ladder's single source of truth), checked against `apps/web/lib/parlay/parlay.ts` and `apps/web/lib/fantasy/dfs-optimizer.ts`.
**Do:** the Pro tier advertises "Trend Lab + Parlay MRI". `apps/web/lib/parlay/parlay.ts:9-14` states its own doctrine verbatim: *"illustrative legs only — no real teams/odds/results … a teaching calculator, not a live recommendation."* Selling a teaching calculator as a paid feature is not a rule-8 violation of the copy, but it is the shape that generates chargebacks and complaints. Either wire Parlay MRI to real legs before launch, or move it out of the paid feature list and keep it as a free public teaching tool — which is what it is, and it is good at it.
**Same test applied to every bullet in the tier table.** A tier bullet is a promise; run each one against the module that implements it.

---

## THE CULL — WHAT COMES OUT OF THE SITEMAP AT LAUNCH

`apps/web/app` currently holds **~200 `page.tsx` files**; `apps/web/app/sitemap.ts` publishes **90 paths**. That is not a product, it is a site. Every additional public page is another surface a customer, a journalist or an FTC reader can find a weak number on, and the dossiers are unanimous that our one asset is that our numbers survive inspection.

**The rule (put it in `apps/web/app/sitemap.ts` as a comment and enforce it in review):** a page is in the sitemap only if (a) it renders rights-cleared real data or renders no data at all, (b) every number on it passes `renderableMetricOrNull`, and (c) a first-time visitor can say in five seconds what it is for.

### HIDE — remove from `apps/web/app/sitemap.ts`, remove from nav, keep the code, add `noindex` via the layout pattern already used at `apps/web/app/admin/layout.tsx`

| Surface | Why it must not ship at launch |
|---|---|
| `/fantasy/dfs`, `/optimizer`, `/players/dfs` | The optimizer runs on `DFS_SLATE`, a hand-written fixture (`apps/web/lib/fantasy/dfs-slate.ts`), because `activeDfsSlate()` has no live provider. It is honestly labelled and it is still the single worst head-to-head we can invite: one scalar projection per player against SaberSim's joint sim and Stokastic's contest sim. Hide it, keep every line of the DP — it is the substrate for C4 and it is genuinely better engineering than anything the competitors document. |
| `/parlay-mri` | Illustrative by its own module doctrine, and currently sold as a Pro feature. See A10. |
| `/contests`, `/fantasy/contests` | Anything contest-shaped sits next to `_HANDOFF` §1's hard line (no entry fee, no prize pool — PrizePicks paid $15M, Underdog $17.5M). Do not ship a contest surface at launch without a written confirmation it has neither. |
| The `/stats/*` tree (~23 pages) | Keep at most `/stats` itself. The rest is a thin-content SEO liability and each page is numbers whose substantiation is not routed through the display guard. |
| The `/intelligence/*` tree (~15 pages) | Same. Keep `/intelligence` if it earns its keep; hide the 14 sub-pages. |
| `/cipher`, `/fable`, `/gsn`, `/vault`, `/observatory`, `/airwave`, `/content-lab`, `/kill-ledger`, `/bookgrade`, `/the-beat`, `/house`, `/deck`, `/human`, `/sealed`, `/launch`, `/media-kit` | Narrative and internal-mythology surfaces. None of them lies. All of them dilute a launch whose entire proposition is "we publish fewer numbers than anyone and every one survives checking." |
| `/calibration` — **conditionally** | Ships only if A4 lands. The three defects are in the honesty page. Publishing the honesty page with arithmetic defects is the most expensive possible mistake for this brand. |
| `/performance` | Already gated off by `PERFORMANCE_STATS_ENABLED`. **Leave it off.** Do not flip it, do not build a path that resolves it differently, and do not treat A1's completion as authorization — that is a founder decision under law 3. |

### KEEP — the launch site, ~25 pages
`/` · `/picks` · `/pricing` · `/methodology` · `/how-we-make-money` · `/pledge` · `/how-to-verify-a-record` · `/verify` · `/ledger` · `/calibration` (post-A4) · `/edge-index` · `/responsible-play` · `/terms` · `/privacy` · `/faq` · `/about` · `/contact` · `/changelog` · `/blog` · `/journal` · **all six `/tools/*` calculators**.

The calculators earn their place and should be defended: honest math, no claims, no substantiation burden, real search demand, and they are the shape of the brand. `/how-we-make-money` is a competitive weapon on its own — FantasyLabs runs affiliate promo pages for Kalshi, Polymarket, PrizePicks, Underdog, DraftKings Pick6, Novig and Fliff with live Better Collective codes while charging $69.95/mo for tools to beat those same operators, and as a Better Collective asset it structurally cannot stop. That page is the rare differentiator that is both true and uncopyable.

---

## B. WHAT MAKES US COMPETITIVE WITHIN 30 DAYS
**Total: ~44 engineer-days.** Starts only after A1–A6. Ordered by value per day.

### B1 — Promote edge `e = p − q` to a first-class visible column on the board and every pick card · 3 d
**Start:** `apps/web/lib/picks/public-edge-score.ts` and `apps/web/lib/picks/market-implied-display.ts`; render through the factor-trail component on `/picks`; validate the label against `apps/web/lib/positioning-vocab.json` and `apps/web/lib/compliance-scanner/rules.ts` before writing copy.
**Why first:** Stokastic's single most-praised feature is "leverage" = your exposure minus projected field ownership, shipped as an always-visible per-player column. It is structurally the same object as `e = p − q`, with a strictly better crowd estimate — ours is priced by money, timestamped, auditable, and it settles. We already compute the harder half and hide it behind a ranking key. Highest value per hour in this entire file.
**Label it as model probability minus no-vig market-implied probability.** Never as a confidence score, and never on an unanchored pick.

### B2 — Devig-method disclosure and sensitivity band on every priced edge · 4 d
**Start:** `packages/prediction-engine/src/honesty/devig-method-compare.ts` — built, and its own header says it is not wired into pick minting. Second file: `packages/prediction-engine/src/shin-devig.ts`. Consumer: `apps/web/lib/ops/compute-live-calibration-metrics.ts:230`, which states the receipt uses a mean-implied proportional de-vig.
**Do:** name the method in public, show p / q / e under proportional, Shin and worst-case, and **refuse to display an edge that does not survive the most conservative method.**
**Why:** Stokastic and OddsShopper publish X-Win, X-ROI and hold and never name a devig method on any public page — the largest credibility hole in the strongest competitor torn down in this program. And it is not cosmetic for us: on a two-way book at 4-5% hold, proportional-vs-Shin disagreement on the longshot side is comfortably 0.005-0.015, **larger than the 0.0034 margin the PROVEN gate is currently being decided on**. If three reasonable methods disagree by more than the floor margin, we do not yet know our own ECE to the precision the gate demands, and saying that out loud is the most on-brand thing on this list.

### B3 — Cluster the metric bootstrap by game and slate · 4 d
**Start:** `apps/web/lib/calibration/bootstrap-metric-ci.ts` (`DEFAULT_METRIC_CI_RESAMPLES = 200`, iid percentile bootstrap), reusing `apps/web/lib/calibration/stationary-bootstrap.ts`, which exists and is wired only to calibration-map bands.
**Why:** two picks on one game share the outcome completely; picks on one slate share weather, referees and a news cycle. The published intervals are therefore narrower than the truth. Being the only product in the category whose error bars account for clustering is small, real and permanent — and it costs four days because the machinery is already in the repo.

### B4 — Replace the absolute Brier floor with a Brier Skill Score against a named reference · 2 d
**Start:** `apps/web/lib/ops/calibration-eligibility.ts:71` (`brier: 0.22`).
**Do:** BSS against the market-implied p (preferred) or base-rate climatology (weaker fallback).
**Why this is a tightening:** with UNC = 0.2139, a floor of BS ≤ 0.22 is BSS ≥ −0.0285 — it literally permits a forecaster 2.85% *worse* than a constant base-rate forecast with no skill at all. Our measured BS 0.1898 is BSS +0.113, real publishable skill the current floor does not measure. This makes the guard **stricter** and makes the number mean something. Law 9 is satisfied by construction; land it with a test proving the new floor rejects a strict superset of what the old one rejected.

### B5 — Publish the coverage-vs-edge curve as a public panel · 6 d
**Start:** `packages/prediction-engine/src/edge-lab/` for the selection side, `apps/web/lib/calibration/conformal-calibration.ts` and `holdout-significance.ts` for the LCB and fold discipline.
**Do:** for each threshold τ, show how many picks fire and the realised hit rate / CLV on that slice with a Wilson lower bound — **including the honest tail where the answer is "fire nothing today."**
**Why:** Stokastic's product must always return 10,000 ranked lineups because the subscription is priced on capacity; it has no mechanism to say "there is nothing here this week", and a product justifying a $229.95 monthly seat cannot ship one. A selection product that can decline is a category the incumbents cannot enter without breaking their own revenue model. It is also the legitimate engine behind any future "higher accuracy on a subset" claim (`_HANDOFF` §3) and the correct answer to the open C-107 display problem.
**Depends on A7.** τ tuned on the eval set is the thing this panel exists to not do.

### B6 — Put the truth surface on the marketing pages · 2 d
**Start:** `apps/web/app/api/ops/public-surface-truth/route.ts` already emits `generatedAt`; consume it on `/pricing`, `/calibration` and the public Edge Index with `model_version` beside it.
**Why:** RotoGrinders' paid page leads with 2022 award badges and prices its flagship annual tier "Check back next season!"; Stokastic's marketing screenshots are Jordan-Love-era and its three live pages state three contradictory base-tier lineup caps in the same week. A live "as of <UTC>" stamp is two days of plumbing and a permanent contrast against two visibly frozen incumbents.

### B7 — Publish a plain-language "how the engine works and how you can check it" page · 4 d
**Start:** `docs/positioning.md` for the copy, a new public route beside `/calibration`, and `scripts/glass-ledger/recompute.ts` (which exists) as the thing it links to. Register it in `llms.txt` and structured data.
**Why:** across 757 Stokastic article URLs there is zero methodology content — no player-outcome distribution, no variance model, no correlation structure, no simulation count at the projection layer. FantasyLabs says "thousands" of sims in four help articles across three years and never a number. A page that is machine-readable *and* independently recomputable claims the agent-citation lane both incumbents structurally cannot serve, and we already have the recompute script.

### B8 — Pick'em payout table, subset-exact evaluator, and structural break-even surface · 8 d
**Start:** new `apps/web/lib/dfs/pickem/` beside the existing `apps/web/lib/dfs/salaries.ts`; break-even lands in `packages/prediction-engine/` beside the devig module.
**Do:** (1) encode PrizePicks' and Underdog's published payout tables as data with a source URL and captured-at date per row; (2) a subset-exact evaluator — given n, entry type, per-leg multipliers and *which* legs won, return the real payout, not the "up to" headline; (3) `breakEven(operator, entryType, n)` reproducing the 53.45%–61.80% structural range.
**Why:** this is the highest-leverage *unclaimed* surface in the dossier set. Stokastic names "Pick'em players" on its own public list of who should not buy. Every public calculator models only the base multiplier, which is why a 2-of-3 Flex displaying ~$65.53 and paying $2.65 generated real BBB complaints. Our correctness is provable from the operator's own help text, so it is a claim we can make safely today with no earnings language anywhere near it. It also supplies the `q` that the `e = p − q` doctrine needs on props, which otherwise silently defaults to a flat vig.
**Hard constraint:** model their **published rules only**. No scraping of either operator outside `apps/web/lib/scraping/clearance-engine.ts` — PrizePicks' ToS explicitly forbids robots and spiders and `.claude/rules/scraping.md` governs. Frame the public explainer strictly as structural cost, never as an earnings claim, and run it through `apps/web/lib/compliance-scanner` and `npm run lint:brand`.

### B9 — Weekly pre-waiver-deadline email: one message, three decisions, a number on each · 5 d
**Start:** `apps/web/lib/fantasy/waivers.ts` and `apps/web/app/fantasy/waivers/page.tsx` for content; the existing Elite-tier alert delivery path for delivery.
**Why:** Sleeper states plainly that it offers no way to receive league alerts by email, while its own Aug/Sept 2026 reviews complain about push volume on the channel it does have ("WAY too many notifications. way too many."). This is a channel a 13-million-user market leader has explicitly declined to build, delivered at the cadence its users are asking for, and our Elite tier already promises email. Highest ratio of differentiation to build cost in the fantasy half of the program.
**Gated on B10.**

### B10 — Resolve the Sleeper API licence question · 1 d to check, unbounded to resolve — FOUNDER
**Start:** `apps/web/app/fantasy/connect/page.tsx`, `apps/web/lib/fantasy/sleeper-season.ts`, and the source-rights registry under `apps/web/lib/scraping/`.
**The question:** `docs.sleeper.com` grants the free, keyless, read-only tier **for non-commercial purposes only** and directs commercial applications to licensing. GSE's Fantasy tier is $4.99/mo. On the plain text of their docs, a paid subscription reading that tier is a commercial use of a non-commercial licence. This is the same class of rights question `checkClearance()` exists for.
**Agent scope:** check whether a `sleeper` entry exists in `apps/web/lib/scraping/source-rights-registry.ts`, record what the terms say verbatim, and stop. Do not build further paid surface on Sleeper reads until this is answered. It gates B9 and C7.

### B11 — Add the six missing sources to the rights registry, fail-closed · 3 d
**Start:** `apps/web/lib/scraping/source-rights-registry.ts` (14 entries today; all six proposed ids are absent).
**Do:** `mlb-statsapi` → permission_required · `baseball-savant-statcast` → permission_required · `nba-com-stats` → permission_required · `retrosheet` → approved_open_license with the mandated attribution string · `chadwick-register` → approved_open_license (ODC-BY-1.0) · `openligadb` → approved_open_license with an ODbL share-alike carve-out mirroring the existing ffverse/ffopportunity CC-BY-SA treatment, marked FIXTURES ONLY and never a settlement source.
**Why:** three of these carry terms that name a commercial prediction product as the prohibited use, and the fail-closed engine cannot enforce a source it has never heard of. A future agent reaching for `pybaseball` because "it's MIT" hits nothing at all — the MIT licence covers the client library, not the data behind it.
**Also, and change nothing:** record the ESPN terms conflict as a founder + counsel item in a new `docs/ops/` note and in the `notes` field of the `espn-public-api` entry (currently `approved_public_logged_off`, at `source-rights-registry.ts:231-246`). Record all three facts verbatim — the Disney ToU's "robot, spider, script … data mining or web scraping" and "any commercial or business-related use" clauses; the literal `User-agent: anthropic-ai / Disallow: /` line in `www.espn.com/robots.txt`; **and** the honest counterweight that `site.api.espn.com` serves no robots.txt at all (HTTP 403), so no robots directive governs the JSON host. ESPN is our designated Book 1. Papering over this would be the failure; recording it is the contribution. Flip nothing.

### B12 — Migrate `nfl_data_py` references to `nflreadpy` · 2 d
**Start:** grep `packages/data-ingestion/` and `packages/feature-store/` for `nfl_data_py`; registry attribution string at `source-rights-registry.ts:126`, PFR carve-out at `:150-165`.
**Why:** `nfl_data_py` has been archived read-only since 2025-09-25 by its own deprecation banner and all development moved to `nflreadpy` (MIT). Carry the CC-BY-4.0 attribution forward and preserve the `pfr-advstats-via-nflverse = permission_required` carve-out through the migration — that carve-out is exactly the nuance a mechanical dependency swap loses.

---

## C. WHAT MAKES US CATEGORY-LEADING
**Total: ~120 engineer-days.** None of it before A and B. Ordered by defensibility per day, not by size.

### C1 — The Triptych: CORP reliability + ROC/AUC + a Murphy diagram against the de-vigged market · 18 d
**Start:** CORP decomposition over `packages/prediction-engine/src/calibration/pav.ts` and `apps/web/lib/calibration/isotonic-pava.ts`; ROC replaces the 5-bucket monotonicity check at `apps/web/lib/calibration/compute.ts:430` (`computeDiscrimination`); the Murphy diagram consumes the model-p and market-anchored-p pairs already assembled at `apps/web/lib/ops/compute-live-calibration-metrics.ts`.
**Why this is the single strongest available claim:** Ehm, Gneiting, Jordan & Krueger (JRSS-B 2016) prove that if one forecast's Murphy curve lies below another's at every threshold, it is preferable under **every** consistent scoring function — a dominance claim, not a single-number claim. The elementary-score threshold θ is exactly the cost-loss ratio, which for a bet offered at de-vigged fair probability q **is q itself** — so the Murphy diagram is the literal graphical statement of this repo's own `e = p − q` doctrine. The area under the curve is the mean Brier score, so it strictly generalises the number we already report. *No competitor in either wave has ever published one.* "Better than the book at every price we act on" is a sentence none of them can write.
**Bonus:** CORP's MCB term can then replace the binned Murphy reliability floor at `calibration-eligibility.ts:73` — a floor that can never bind, since by Cauchy-Schwarz ECE ≤ √REL, so REL ≤ 0.05 permits ECE 0.2236, and under the perfectly-calibrated null E[REL_plugin] ≈ 0.0026 at n = 475 against a measured 0.005, i.e. roughly half pure noise. **Replace it. Do not delete it** — replacing a non-binding floor with a binding one is a tightening; removing it is law 9.

### C2 — Replace the 3-consecutive-GREEN streak with the existing forecast-skill e-process · 8 d
**Start:** `packages/prediction-engine/src/forecast-skill-eprocess.ts` — already built, with the derivation and the running-maximum subtlety documented correctly in its own header — wired into `apps/web/lib/ops/calibration-eligibility.ts` (`streakRequired` / `consecutiveGreenPrior`).
**Why:** at roughly 5.7 new settled picks per six-hour run against n = 475, consecutive runs share about 98.7% of the same sample. The streak is one sample looked at three times, which *inflates* type-I error rather than controlling it. Ville's inequality gives validity at every stopping time under any stopping rule — including an adversary who recomputes after every settled pick and stops at the most flattering moment, which is precisely the "you looked at it until it went green" attack a trust brand must be immune to. It also dissolves the documented pathology in `AGENTS.md` where one ungradeable pick forces eligibility RED for up to 18 continuous hours by resetting a streak that was never evidence.
**Read this constraint carefully.** `AGENTS.md` states that no agent may resolve the settlement/streak conflict by touching the 6-hour grace, the `overduePending === 0` threshold, the 24-hour zero-sit delay, or any floor — every one of those turns the light green without making anything more true. **This item touches none of them.** It replaces the *evidence rule* with a strictly valid one and is a founder decision to adopt. Build it, wire it behind the existing gating, and present the comparison. Do not switch the live gate.

### C3 — Publish a pre-lock projection archive as a first-class public surface · 14 d
**Start:** `packages/crypto/src/pedersen-ledger.ts` and `packages/prediction-engine/src/edge-lab/ledger-anchor.ts` for the commitments; `apps/web/lib/clv/` for grading; `scripts/glass-ledger/recompute.ts` as the verifier; the public route beside `/ledger`.
**Do:** every published p, its q at publish time, the model version and a hash — retained and downloadable forever, defaulting to **all picks and all tiers**. The confidence filter is a transparency tool, never a cherry-pick (`_HANDOFF` §2 Phase 2).
**Why:** this is the exact structural gap that makes Stokastic's "most accurate DFS projections" unfalsifiable — they do not archive prior-day projections, so no subscriber can grade them. It is also the one thing they cannot copy without breaking a ladder priced entirely on capacity (2,000 → 10,000 → 50,000 lineups) rather than on demonstrated accuracy. FantasyLabs is worse: it publicly admits in a buried FAQ that *"if you optimize a lineup historically, it may not be the same optimized lineup you were suggested at the time of lineup lock that night"* — its own historical replay is not as-of.
**The route ships behind the existing founder-gated PUBLISH flag. Build the surface; do not flip the gate.** A latecomer cannot manufacture an earlier honest start date, which is why the clock matters more than the launch.

### C4 — DFS: the player-outcome sample matrix, bucket sampling, and seeded reproducibility · 30 d
Three items that must ship together or not at all.

**C4a — Joint sample matrix (S sims × P players), correlated within a game · 18 d.**
**Start:** a new module feeding `apps/web/lib/fantasy/dfs-slate.ts` (`DfsPlayer`); the generative model in `packages/prediction-engine/`; inputs from `packages/feature-store/`.
This is the only genuinely hard layer and the only one that cannot be retrofitted. `DfsPlayer` today carries collapsed scalars (`proj`, `floor`, `ceiling`, `own`) — the distribution is thrown away before the optimizer ever sees it. Start with NFL and a correlated-draw model (nearest-neighbour σ and ρ on projection, K = 50, eigen-clipped to PSD), **not** a play-by-play engine: joint sampling matters far more than play-level fidelity for lineup construction. Sanity-gate it — if our QB-WR estimate reads +0.6 rather than about +0.31, our matcher is broken, not the literature.

**C4b — Bucket sampling around the existing exact solver · 3 d.**
**Start:** `apps/web/lib/fantasy/dfs-optimizer.ts:478` (`generateLineups`; the `EXPOSURE_DECAY = 0.97` re-solve loop at line 554). `solveExact` is untouched.
Draw a bucket of size B from the sim matrix, average into a per-player value vector, call the existing solver, repeat N times. This is SaberSim's actual optimizer, described verbatim by their CEO, and B = S reproduces today's behaviour exactly — so it ships behind a slider with a no-op default and zero regression risk. `objVal` (line 88) becomes a per-bucket vector lookup instead of a scalar.

**C4c — Seed every draw, persist the seed, publish it with the lineup · 3 d.**
**Start:** `apps/web/lib/fantasy/dfs-optimizer.ts` `GenResult` (line 426), plus wherever builds are persisted. Mirror the receipt pattern in `packages/crypto/`.
SaberSim explicitly cannot do this and its own FAQ has to defend it: *"Why do my lineups look different every time I build, even without changes? Each build samples a new set of simulations."* FantasyLabs is worse — non-reproducibility is a designed feature: *"The results range has been designed to ensure a diverse set of results, even when two users input identical model settings."* Our solver's header already documents "No randomness, no local search, no restarts … the provably optimal lineup". A seeded, re-runnable build is the Glass Ledger applied to DFS and nobody in the category ships one. **Do C4c in the same change as C4b or the nondeterminism gets baked in.**

**C4d — `recompute-sim.ts` · 3 d.** Mirror `scripts/glass-ledger/recompute.ts`. Given the seed, published μ, Σ and payout curve, a third party reproduces bit-identical lineups.

**C4e — Do NOT ship a hand-weighted composite lineup score · 0 d, a decision.**
`objVal`'s `Mode = "cash" | "gpp" | "leverage"` with `GALAXY_OBJECTIVE_WEIGHT = 0.6` is exactly the shape SaberSim built, shipped and publicly retired: the old SaberScore was a backtested weighted sum of projected points + 95th percentile + ownership, killed because *"it used projected points, ownership, and lineup percentile as proxies for what actually matters in DFS: how much money the lineup is projected to make."* PropFinder's PF Rating is the same error still shipping. This is a free lesson from a competitor's own documentation. Replace the hand-tuned weights with a derived objective (see C5), do not tune them.

### C5 — Proposition-4.1 variance-sign selector · 8 d
**Start:** `apps/web/lib/fantasy/dfs-optimizer.ts` mode selection, replacing the hand-tuned cash/gpp/leverage weights.
Hunter/Vielma/Zaman give an if-and-only-if, not a heuristic: if μ_w < 0 for all w you maximise μ_w + λσ²_w (buy variance); if μ_w ≥ 0 for some w you maximise μ_w − λσ²_w restricted to μ_w ≥ 0 (sell variance). This turns "cash mode vs GPP mode" from two hand-tuned constants into **a sign derived from a measurement**, and it is the exact DFS analogue of `e = p − q`: the projection is μ, the field is the benchmark, and the risk posture reverses around it. Depends on C4a.

### C6 — DFS calibration surface: predicted-ROI decile vs realised, PIT histogram, predicted-vs-actual dupes · 12 d
**Start:** `apps/web/lib/calibration/compute.ts` and the `/calibration` surface — the same reliability-diagram pattern already used for picks.
**Why this is THE seam:** SaberSim has every input needed, runs the historical re-simulation already (Contest Flashback re-simulates completed DraftKings contests 100,000 times using the real lineups entered) and has never published a single reliability number. FantasyLabs' SimLabs emits a distribution of projected cash lines and winning scores every slate, both of which settle hours later, and its "Why Should I Trust SimLabs?" page is a page of adjectives where that chart belongs. Not one paper in the academic literature reports calibration *of the simulator* either — they all report P&L or contest rank. **Dupes is the sharpest single test** because it is an integer count with a hard post-contest truth.
**Blocked on having settled DFS slates to measure, so start collecting immediately** — before the optimizer work lands. A latecomer cannot manufacture an earlier start date here either.

### C7 — Playoff odds / season simulation for a synced league, with a coverage denominator and an interval · 12 d
**Start:** `apps/web/lib/fantasy/league-twin.ts` and `apps/web/app/fantasy/league-twin/page.tsx` (the league-model surface exists); per-game distributions from `packages/prediction-engine/`.
**Why:** it is the most-requested unshipped feature on the best league product in the market — six distinct public user requests on Sleeper's own message surface, none served — and DraftKings and FanDuel structurally cannot build it (Best Ball's selling point is literally "No adds, drops, trades, or waiver claims"; FanDuel's Friends Mode re-drafts weekly, so there is no roster continuity at all). It is a season Monte Carlo, i.e. exactly the output shape our engine already produces.
**Ship it with n and a bound.** A bare "you're 63% to make the playoffs" is precisely the unsubstantiated number A8's guard exists to refuse. **Gated on B10.**

### C8 — Ownership and per-player variance projections · 20 d
**Start:** `packages/feature-store/` (derived features) feeding `packages/prediction-engine/`.
Every open-source simulator declares `Own%` and `StdDev` **required** inputs and supplies neither; the only public ownership approach found proxies ownership by site-weighted optimizer exposure, which is circular. These are the two columns that decide whether a simulation is worth running, and the entire open stack marks both "user supplies". This is the actual moat in DFS.
**Sequencing constraint:** fantasy-side only. It must not touch `MODEL_VERSION` on the betting engine, which is frozen by `scripts/guardrails/model-freeze.mjs`.
**Start the realised-ownership collection cron on day one** (`apps/web/app/api/cron/*`) — collection is not publication, so it is safe to start now without touching any gate, and every day not collecting is a day of moat not accruing. Note that a new table is a `packages/db/prisma/schema.prisma` change and therefore founder-gated under law 2.

### C9 — Purge and embargo at game and slate granularity on the calibration-fitting path · 10 d
**Start:** the pattern at `packages/prediction-engine/src/replay-harness.ts:72` (`buildPurgedEmbargoedSplits`), applied to `apps/web/lib/calibration/calibration-map-bakeoff.ts` (`selectCalibrator`) and `pava-map-fit.ts`.
`buildPurgedEmbargoedSplits` is real and correct but operates on NFL weeks, which does not address the dominant leakage unit in sports: two picks on the same game share the outcome completely, and a CV fold boundary drawn between rows can put them on opposite sides of it. Additional rule the literature implies and we do not yet enforce: **a map refitted at time t must be fitted only on picks SETTLED before t, not merely placed before t.**

### C10 — Surface IVAP multiprobability width as the public per-pick confidence display · 8 d
**Start:** `packages/prediction-engine/src/calibration/ivap.ts` — implemented, default off; inventoried at `apps/web/lib/calibration/conformal-calibration.ts` (`CONFORMAL_METHODS`).
Venn-Abers is guaranteed calibrated under exchangeability alone (Vovk & Petej) — a finite-sample, distribution-free guarantee. At n = 475 against a hard 0.05 threshold, a point estimate is the wrong object to publish; an interval width is an honest statement of what we do not know about one pick, and it needs no threshold at all.
**The repo's doctrine that conformal methods never unlock PROVEN is correct and stays.** This is a product-display change, not a gate change, and it must be built and reviewed as one.

---

## D. EXPLICITLY NOT BUILDING — record these so no future session re-opens them

| Decision | Reason |
|---|---|
| **No DFS contest simulator with an endogenous field.** | Field/ownership modelling with dupes priced into simulated ROI is genuine, non-trivial engineering that SaberSim and Stokastic have refined for years, and it monetises a mass-entry GPP audience GSE does not serve. The transferable insight — leverage against a crowd prior — is captured by B1 at a fraction of the cost. The simulator itself would consume the roadmap and still lose the head-to-head. **Record as a CANCELLED/decided row in `docs/ops/AGENT_LEDGER.md`.** (C4 builds a *player-outcome* sim for our own lineups; that is a different object and is not this.) |
| **No draft room, no waiver engine, no commissioner suite, no in-league chat, no native mobile app.** | Each is a direct loss against a free, ad-free, 13-million-user incumbent: 127 fantasy-football help articles, four per-day waiver modes, Rolling/Reverse/FAAB with value-ranked blind bidding, soft draft timer, indefinite commissioner pause, mid-draft timer changes, Big Screen Mode, unlimited undo, fully editable draftboard. Losing a user's draft is unrecoverable. The winnable version is a **read-only draft assistant** on the synced board (`apps/web/lib/fantasy/draft.ts`, `adp-source.ts`) surfacing value-vs-ADP with an interval — never a draft room. |
| **Nothing touching money movement, entry fees, or prize pools.** | `_HANDOFF` §1 hard line; PrizePicks paid $15M, Underdog $17.5M. "Beat the Model" stays free and skill-only. |
| **No affiliate revenue, ever.** | The moat. A Better Collective asset cannot match it — affiliate is the parent's business model, and that parent is already the subject of a documented activist short thesis. Make it visible on `/how-we-make-money` rather than merely observed. |
| **No cumulative-profit equity curve as a display primitive, anywhere.** | FantasyLabs' entire published 2025 prop-model track record is one 1080×1080 JPEG of a cumulative-profit curve footnoted "Based on $100 unit bets" — no n, no ROI, no win rate, no CI, no methodology. That single image is the clearest artifact of what GSE exists to refute. A8's guard should reject the component class, not just the missing fields. |
| **Do not copy competitor page templates or expression.** | `_HANDOFF` §8. FantasyPros litigates "features". Our moat is the record, not the layout. |
| **No forking or vendoring `chanzer0/NFL-DFS-Tools`.** | It has **no LICENSE file** — under default copyright that is all rights reserved, regardless of the README's "will remain free" sentiment. The *techniques* (Iman-Conover rank reordering, Gaussian copulas, gamma/lognormal/Weibull/skew-normal/ex-Gaussian marginals) are published prior art and are ours to learn from. The code is not ours to take. This is the one place in the dossier set where copying would be both the fastest path and a clear violation. |
| **Never frame any of the above as AI.** | Rule 8. It lands hardest against FantasyLabs, which markets "AI-powered prop models" for a product whose model is a five-slider user-weighted linear blend. A seeded Monte Carlo over a published covariance matrix ranked by a published payout curve **is** deterministic statistical modelling — here the honest description is also the stronger sales position. |

---

## E. FOUNDER-ONLY AND COUNSEL-ONLY — no agent may do these

1. **The score-repair database writes** (A1). Root cause and fix are agent work; the writes are not. Law 7.
2. **Any public gate flip** — `PERFORMANCE_STATS_ENABLED`, `PRICING_PHASE=PROVEN`, `calibrationPublished`, `SELECTIVE_PUBLISH_ENABLED`. Law 3. Nothing in this plan asks for one, and nothing in this plan should be read as making one safe.
3. **`MODEL_VERSION` bumps** (frozen by `scripts/guardrails/model-freeze.mjs`), including the v5.2.8 flip sequenced after the first clean NFL Sunday.
4. **Adopting the e-process as the eligibility rule** (C2). Build it, present the comparison, do not switch the gate.
5. **The Sleeper commercial-licence question** (B10) and the **ESPN terms conflict** (B11). Both are counsel calls. Record verbatim; change nothing.
6. **New guardrail scripts, Prisma schema changes, and any `.env*` edit.** Law 2 freezes `scripts/guardrails/**`, `packages/db/prisma/**`, `.github/workflows/**`, `.claude/**` and every `.env*`. Several items above (the limits-consistency guard, the equity-curve component ban, C8's ownership table) need founder authorization before a line is written.
7. **Freedom-to-operate on contest-simulation patents** before any such feature ships. Six patents surfaced in the research (US10478721B2, US11660533B2, US9744450B2, US9751010B2, US10610790, US11305198); **claims were not read**. Blocking for launch of that feature, not for R&D. A counsel task.
8. **The public calibration claim wording** currently reading "The calibration we measure ourselves on is …" — the open founder acceptance from 2026-09-06. A4 resolves the underlying chart defect; accepting or re-scoping the claim is not an agent decision.

---

## ROLL-UP

| Section | Days | Gates |
|---|---|---|
| **A — before launch** | ~41 | A1 blocks every published number. A2 blocks A3. A7 blocks B5. |
| **B — competitive in 30 days** | ~44 | Starts after A1–A6. B10 gates B9 and C7. |
| **C — category-leading** | ~120 | Starts after A and B. C4a gates C4b/C5. C8's collection cron starts on day one regardless. |

**One sentence for the founder:** the competitive analysis says our differentiator is that our numbers survive inspection, and the repo says three of the surfaces that publish numbers — the settled record, the public selective gate, and the calibration chart — do not currently survive inspection; section A fixes exactly those three and hides everything that would invite a comparison we lose, and nothing in B or C is worth a day until it is done.
