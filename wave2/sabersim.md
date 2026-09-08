# SaberSim (sabersim.com) — Deep Teardown

**Captured 2026-09-08 UTC.** Method: public surfaces only — `robots.txt`, `sitemap.xml`, the
marketing site HTML, the Intercom-hosted help center (`support.sabersim.com`, crawl-allowed), the
public Webflow CMS JSON that their own Winner's Circle page fetches to render itself, and the
**published transcripts of their own CEO's marketing videos on their own domain**. No
authentication was attempted, no paywall crossed, no `Disallow`ed path fetched, no endpoint
scanned. `support.sabersim.com/robots.txt` disallows exactly three paths (`/not-authorized`,
`/not-found`, `/[helpCenterIdentifier]/`); none was touched. `www.sabersim.com/robots.txt` contains
a sitemap line and nothing else.

Companion docs: `_HANDOFF-to-coding-agent.md` (the edge doctrine: fire on `e = p − q`, never on
confidence), `_propfinder-teardown-final.md` (the "excellent data, weak scorer" pattern),
`_competitor-mistakes-lessons.md` (the FTC substantiation graveyard), `dfs-optimizer-priorart.json`.

---

## THE ONE-PARAGRAPH VERSION

SaberSim is the real thing on the modeling axis and the empty flank on the honesty axis, and those
are the same finding twice. Their engine genuinely is what they say — a play-by-play game simulator
run **100,000 times per game** whose per-player joint outcomes feed the optimizer directly, so
correlation is a property of the sample rather than a rule bolted on afterwards — and their CEO
describes the optimizer's actual mechanism on their own website in one sentence that is the single
most useful thing in this dossier: *"for every lineup we build you, we randomly choose a bucket of
sims and optimize based on the average score for each player in that bucket."* **That means their
optimizer is a deterministic point-projection solve, exactly like ours — it is just run many times,
each time against a different projection vector drawn from the simulation sample.** The gap between
`apps/web/lib/fantasy/dfs-optimizer.ts` and SaberSim is not an algorithm we lack; it is an input we
do not have (a sims × players score matrix) and two layers we have not built (a contest simulator
and a portfolio selector). On evidence they are the mirror image of their math: for a product whose
entire pitch is "we compute your ROI 100,000 times," they publish **zero** projection accuracy,
**zero** calibration, **zero** aggregate user ROI and **zero** track record. What they publish
instead is a wall of 2,084 individual winner screenshots totalling $38.56M — which is
survivorship, not evidence, is concentrated (746 unique screen names, one player holding 31 cards),
and carries **no "results not typical" disclaimer anywhere in the HTML of the home, pricing or
Winner's Circle pages**. Their $297/month top tier is the one that computes ROI at all. That is the
seam, and it is wide: they will sell you a simulated ROI number they have never once shown was
calibrated against what actually happened.

---

## CORPORATE

- **Legal entity: `Saber Simulations LLC`** — named nine times in the Terms
  (`https://www.sabersim.com/legal/terms-and-conditions`). The site footer reads
  `© 2026 Saber Simulations. All rights reserved.` (`https://www.sabersim.com/`).
- **CEO: Andy Baldacci** — self-identified in the transcript published at
  `https://www.sabersim.com/video/dfs-lineup-optimizers-are-obsolete-you-need-a-simulator`:
  *"My name is Andy Baldacci. I'm the CEO of Saversim"* (transcript's own typo). Also credited on
  `https://www.sabersim.com/school` as introducing "The Saber System."
- **Lead Instructor: Jordan Chand** — bylined on every help-center article read for this dossier
  and credited on `https://www.sabersim.com/school`.
- **No native mobile app.** The iTunes Search API returns no SaberSim app for the term
  (`https://itunes.apple.com/search?term=sabersim&entity=software`, queried 2026-09-08). They have
  a help article for *mobile web push notifications*
  (`support.sabersim.com/en/articles/12324757-how-to-set-up-mobile-notifications-on-sabersim`) and
  one for uploading lineups to DraftKings "using mobile," but the product is a web app. **This
  matters: it means no App Store review corpus exists, which is why negative user sentiment on
  SaberSim is much harder to source than it was for PropFinder.**
- Community/support surface: private Discord, daily YouTube "office hours" Monday–Saturday, 1:1
  coach access — all listed on the pricing page as *plan features*, not as support channels.
  Trustpilot returns 403 to a plain request; no rating was obtained. **NOT CONFIRMED: any
  third-party review-platform rating.**

---

## 1. HOW THE PRODUCT ACTUALLY WORKS

This is the priority section and it is unusually well-documented, because SaberSim's marketing
strategy *is* mechanism disclosure. They explain the machine in detail because they believe nobody
else can build it. Everything below is quoted from a page they publish.

### 1a. Layer one — the play-by-play game simulator

> "Point projections in SaberSim don't come from averages—they come from thousands of play-by-play
> simulations of every game. Instead of relying on static spreadsheets or past box scores, SaberSim
> uses a one-of-a-kind play-by-play simulator to build every game from scratch, one play at a time,
> thousands of times."
> — `support.sabersim.com/en/articles/12078831-how-projections-work`

**The count.** The help center says only "thousands." The CEO gives the number on their own video
page, for NBA:

> "**We simulate each game on the slate play by play a hundred thousand times** accounting for all
> the important factors that matter in the NBA."
> — `https://www.sabersim.com/video/dfs-lineup-optimizers-are-obsolete-you-need-a-simulator`

So: **~100,000 game simulations per game, per slate** (stated for NBA; NOT CONFIRMED that the count
is identical across sports — the help center's "thousands" is the only cross-sport number).

**What is inside a sim.** Stated inputs, verbatim across pages: *"score, the clock, and dozens of
other factors that influence play calling and performance"*; *"strategy, play-calling, coaching
decisions, and game flow"*; *"match-ups, weather, play-calling, referees, rotations"*
(`https://www.sabersim.com/how-it-works`); *"coaching tendencies, weather, injuries, and in-game
strategy"*. It produces **per-player joint outcomes**, not marginals — this is the whole point:

> "Because SaberSim's projections come from game sims, correlations are already baked in. If a QB
> goes off, his WRs go with him. If a pitcher dominates, the bats against him fail in the same
> stories."

**What the user sees is a collapse of that distribution.** Their own words: *"When you see a
player's point projection on your screen, you are looking at the average of their outcomes across
all of those simulated trials."* Percentiles are surfaced (10th–25th = floor, 50th = median,
85th–95th = ceiling) plus "Detailed Stat Projections" (yards, attempts, strikeouts) "directly from
those play-by-play simulations." Detailed stat projections are **gated** — see §2.

**Refresh cadence.** Sims re-run automatically on news: *"our sims re-run whenever news breaks—
injuries, role changes, rotations."* During the slate: *"As a slate plays out, we pull in actual
ownerships and points and continuously run new sims."* For in-progress NBA games the CEO states a
literal cadence:

> "**Every five minutes that passes in the NBA game, we run new live simulations from that point in
> the game on** and use those new live simulations in your contest sims."

### 1b. Layer two — the optimizer. **THIS IS THE CRITICAL FINDING.**

The marketing claim is that they do not optimize a point projection. The mechanism, described by
their own CEO on their own site, is that **they do — repeatedly, against different draws**:

> "And the last one is sim variance, which is how we're able to build lineups using a range of
> possible outcomes using a player's variance. The way it works is that **for every lineup we build
> you, we randomly choose a bucket of sims and optimize based on the average score for each player
> in that bucket. Then we randomly choose another bucket for the next lineup and so on. What the
> slider does is it controls how large that bucket is.** So if you were to turn this all the way
> off, what that would mean is that we're going to just have one bucket for all the sims, and we
> will use the average across that, which basically [is] just saying we're going to use the average
> projection, and this works like a traditional [optimizer]. If you put sim variance all the way up
> to 10, we'll go the other way. So what we'll do is each lineup, we'll have one simulation for it,
> and we will just use the score from that one simulation."
> — CEO Andy Baldacci, `https://www.sabersim.com/video/dfs-lineup-optimizers-are-obsolete-you-need-a-simulator`

Unpacked, the Sim Optimizer is:

```
for k in 1..N:
    B_k   = random bucket of B simulations       # B = f(sim-diversity slider)
    v_k[p]= mean over B_k of player p's simulated fantasy points
    L_k   = argmax over legal lineups of sum(v_k[p])   # ordinary salary-cap knapsack
```

with `B = ALL sims` degenerating exactly to a conventional point-projection optimizer (their words:
"this works like a traditional optimizer") and `B = 1` optimizing a single game script. The
"Correlation" slider is a **second, separate** knob that reweights positively-correlated players on
top of that. The help center confirms the sampling framing: *"When you hit Build Lineups, SaberSim
samples from these simulations to construct your lineups. Each lineup is a single bet on how a slate
could realistically play out"* and *"each lineup in your pool is built to be the absolute best
lineup for a specific, simulated game script."*

Two consequences worth stating plainly:

1. **The solver is not exotic.** It is the same knapsack we already have. What is exotic is the
   *input* — a sims × players matrix instead of one column — and the *loop* around it.
2. **Their marketing's central contrast is with random-noise diversification, which is a weaker
   target than they imply.** The CEO: *"Traditional optimizers usually have a randomness setting,
   and that gives your lineups diversity, but it comes at a significant cost because you're
   literally just randomly adjusting projections... that's all they can do because they don't have
   a player's variance."* GSE's diversification is exposure decay, not noise — a different and
   better-behaved thing than what he attacks — but it is still diversity **imposed on one
   projection** rather than diversity **inherited from scenarios**, which is his real point and it
   lands.

There is also an explicit escape hatch: **"Optimizer Mode: A traditional optimizer mode that uses
static projections only (no game sims). Useful for cash games or testing tweaks"**
(`support.sabersim.com/en/articles/12079141-building-lineups`). Their own recommendation is Sim
Mode for GPPs, Optimizer Mode for flat-payout cash games — i.e. **they concede a point projection is
adequate where the payout curve is flat.**

### 1c. Layer three — the contest simulator (the actual product)

This is what they sell and it is a second, independent Monte Carlo on top of the first. Verbatim
process from `support.sabersim.com/en/articles/12079199-how-contest-sims-work`:

> 1. "Build a simulated version of your contest using its actual entry structure and payouts."
> 2. "Fill it with a realistic opponent field based on contest type and slate dynamics."
> 3. "Simulate a full slate of games using one of SaberSim's thousands of play-by-play scripts."
> 4. "Score every lineup—yours and the field's—and determine final standings."
> 5. "Award prizes based on those standings."
>
> "Then repeat. **Tens of thousands of times.**"

The pricing page gives the hard number: **"Sim each lineup in your pool against a representative
contest 100k times in 30 seconds or less"** (`https://www.sabersim.com/pricing`). The CEO
independently: *"we'll pit those lineups against these fields and **simulate out your DFS contests a
hundred thousand times**."*

**The opponent field is modelled, not assumed.** This is the piece almost nobody else builds:

> "SaberSim builds multiple sets of opponent lineups using industry-aggregated projections that
> reflect actual construction and ownership trends."
> "Ownership is a descriptive statistic of our field lineups, which are large sets of simulated
> lineups that represent how the field is expected to build for each contest type."
> "**Note: It's the field lineups themselves, not the ownership percentages, that power SaberSim's
> Contest Sims.**"

That note is important and is the inverse of how every cheaper competitor works: most tools treat
projected ownership % as the primitive and sample lineups from it. SaberSim treats *simulated
opponent lineups* as the primitive and derives ownership % as a summary statistic of them. That
preserves the field's **joint** construction (stacks, correlations, roster-rule artifacts) instead
of an independent-players approximation.

**13 field archetypes**, enumerated verbatim on the pricing page:
`Flagship MME, Flagship 20-max, Flagship SE, High Stakes MME, High Stakes 20-Max, High Stakes SE,
Low Stakes MME, Low Stakes 20-Max, Low Stakes SE, Medium Stakes MME, Medium Stakes 20-max,
Medium Stakes SE, Winner-Take-All`. Stakes buckets are defined numerically:
`Low Stakes: $4 and under · Flagship: $4.01 to $30 · Med Stakes: $30.01 to $99.99 ·
High Stakes: $100 or more`. During late swap, **"Use Live Field"** substitutes *actual* opponent
lineups — DraftKings only.

**Output metrics** (all defined verbatim in that article): `ROI`, `Median ROI`, `Max ROI`,
`Min ROI`, `Win Rate` ("percentage of simulations where the lineup finished in first place"),
`Cash Rate`, `ROI StDev`, and `Dupes` ("the number of times a lineup is expected to be duplicated
by other players").

### 1d. "Sim Score" — it is called **SaberScore**, and it is a cheap contest sim

The brief asked about a "Sim Score"; the product name is **Saber Score / SaberScore**, and its
definition (`support.sabersim.com/en/articles/12558411-how-saberscore-works`) is unambiguous:

> "Saber Score is calculated as the return on investment (ROI) from a simple, generalized contest
> simulation... We take your lineup and place it in a simulated version of a contest with a GPP
> payout structure and lineups we expect your opponents to play. Using our game simulations, we
> simulate the slate one time, assigning fantasy point totals to all players in that simulation. We
> then distribute payouts to each lineup based on the contest payout structure. **This process is
> repeated 100,000 times to calculate an average ROI for each lineup.** The resulting ROI becomes
> your lineup's Saber Score."

So SaberScore = **a generic 100k-iteration contest sim**; contest-specific ROI = a **per-contest**
100k-iteration sim, and that second one is the paywall (§2).

They also document the **previous** version and why they killed it, which is the most self-aware
paragraph on their entire site and is worth reading as a warning about our own factor model:

> "The original Saber Score was calculated using a formula that incorporated three factors:
> projected score of the lineup, the lineup's 95th percentile outcome, [and] ownership levels. We
> backtested the optimal weighting of these three factors... The original Saber Score was a
> heuristic—a well-backtested rule of thumb, but one that lacked precision. It used projected
> points, ownership, and lineup percentile as **proxies** for what actually matters in DFS: how
> much money the lineup is projected to make. The new Saber Score directly solves for projected
> profitability rather than approximating it through proxy metrics."

**Read that as written about PropFinder's PF Rating, about LineStar, and about any hand-weighted
composite score — including ours if we ever ship one.** They moved from a weighted-sum heuristic to
a simulated objective and said out loud that the heuristic was a proxy. Residual evidence of the
migration is still in their docs: the projections article refers to *"OLD SaberScore"* in a
present-tense sentence about Adjusted Ownership.

### 1e. Layer four — the Portfolio Diversifier (portfolio built from sims, not top-N)

This is the layer the brief specifically asked about and it is real.
`support.sabersim.com/en/articles/12079514-using-the-portfolio-diversifier`:

> "Instead of sequentially picking lineups one at a time (which often leaves later contests with
> scraps), the Diversifier **solves for the entire portfolio at once**. It optimizes across all
> entries simultaneously. It reduces fragility by avoiding over-concentration on one path. It
> balances ROI upside with volatility, maximizing your chance of hitting big scores while reducing
> the risk of ruin."

> "Older methods like Min Uniques forced lineups to be different for the sake of variety, but
> didn't account for how lineups actually win... Min Uniques only enforced numerical
> differentiation—lineups looked different, but they often depended on the same game scripts."

It is **contest- and stake-aware**: *"A $100 single-entry lineup carries more impact than a $1
minimax entry"*; groups are solved *"in order of dollar per entry (highest first)"* by default and
that order is user-draggable. Two tiers of the same idea:

> "On the Ultimate plan, this is powered by Contest Sims, which recreate real contests with
> play-by-play game scripts and realistic opponent lineups. On the Starter plan, a faster
> simulation is used, but the philosophy is the same."
> "**Portfolio Plus**, available on the Ultimate plan, goes even further by running full Contest
> Sims for each contest."

And a striking admission that portfolio-level optimality is not lineup-level optimality:

> "You should be cautious of lineups with negative Saber Score values... **However, if you're using
> Portfolio as your diversification method, playing lineups with negative Saber Score values can
> sometimes be the best way to strengthen the overall portfolio.**"

That is a genuinely correct statement about covariance and it is the kind of thing a top-N ranker
structurally cannot say. **It is also the sentence that proves a per-lineup score — any per-lineup
score, ours included — is the wrong final object.**

Customisability is explicitly bounded: *"You can't rewrite its underlying calculation—it's built
from years of backtesting across sports and contest types."* The user controls filters, min/max
exposures, group order and an auto-rerun toggle.

### 1f. Layer five — Contest Flashback (post-hoc re-simulation)

`support.sabersim.com/en/articles/12079605-using-contest-flashback` — the closest thing they have to
a track record, and it is worth understanding precisely because it is a *simulated* record:

> "Available for DraftKings slates, Flashback lets you review past contests by **re-simulating them
> 100,000 times**... After a DraftKings contest completes, SaberSim takes all of the real lineups
> that were actually played in that contest. These real lineups are run through 100,000 slate
> simulations using SaberSim's play-by-play game engine... Metrics like Sim ROI, Median Profit, and
> 99th Percentile Profit reveal the true range of results those lineups would generate over time."

Stated purposes: *"Evaluating your own play"* and *"Studying the sharks."* Note what this is: it
scores **real historical lineups** against **their own simulator's** distribution. It answers "was
my lineup good according to our model" — it does **not** answer "is our model right." The
distinction is the entire GSE thesis and they do not draw it anywhere.

### 1g. Late swap

- *"When you go to late swap on SaberSim, we swap each lineup that you're already entered **a few
  dozen times**"* (CEO transcript) — i.e. a swap *pool* per entry, not one swap.
- Swap Pools UI shipped 2025-10-23; each candidate shows *"the delta from your original lineup
  based on your scoring method (ROI or SaberScore)."*
- *"Use Live Sim: Enables real-time sim data for games already in progress, allowing SaberSim to
  factor in updated outcomes during late swap."*
- Manual override re-triggers the Diversifier: *"lock it in, and the Portfolio Diversifier will
  recalculate your entire entry."*

### 1h. Coverage

- **Sites (4):** DraftKings, FanDuel, Yahoo! Sports, OwnersBox (`https://www.sabersim.com/` and
  sitemap `/dfs/*`).
- **Optimizer sports (pricing page, verbatim, 17 listed):** "NFL, NBA, MLB, NHL, Golf, MMA, NASCAR,
  F1, Tennis, WNBA, CFB, CBB, USFL, Soccer, LOL, CSGO, & COD".
- **Projections sports (pricing page, verbatim, headline "11+ sports", 14 listed):** "NFL, NBA, MLB,
  NHL, Golf, MMA, NASCAR, F1, Tennis, CFB, WNBA, UFL, LOL, & CSGO".
  **The two lists disagree** (optimizer says USFL, projections say UFL; optimizer adds CBB, Soccer,
  COD). The homepage sport strip carries asterisks on `CBB*`, `COD*`, `CFL*` with no footnote
  rendered in the HTML. **NOT CONFIRMED what the asterisk means.**
- **Contest Sims are described as "for all sports" on the pricing card**, but the help center warns
  *"Contest Sims require ownership and sim support to run. If errors occur, confirm the slate has
  site ownership projections available and is a sport currently supported by SaberSim's
  simulations"* — i.e. coverage is narrower than the pricing card implies.

---

## 2. WHAT THEY SELL, AND THE TIER TABLE

Source: `https://www.sabersim.com/pricing`, fetched 2026-09-08. All prices "billed monthly"; the
Terms mention *"monthly or annual"* billing cycles but **no annual price is published on the pricing
page** (a scan of the page found only `$7`, `$97`, `$197`, `$297` and the two testimonial figures).

Trial: **"Try 7 days for $7"**, marketed as "Everything included · Cancel any time"
(`https://www.sabersim.com/`).

| | **Starter** | **Pro** | **Ultimate** |
|---|---|---|---|
| **Price (verbatim)** | `$97 billed monthly` | `$197 billed monthly` | `$297 billed monthly` |
| **Positioning (verbatim)** | "Best for players chasing their first $1k win" | "Best for 150-max" | "Best for experienced players" |
| **Inherits** | — | "Includes: **Everything in Standard**" | "All Starter features" |
| **Lineups per build** | **`500 lineups at a time`** | `5,000 lineups at a time` | `5,000 lineups at a time` |
| Optimizer, all sports | ✅ | ✅ | ✅ |
| Projections, "11+ sports" | ✅ | ✅ | ✅ |
| Live-updating Flagship ownership | ✅ ("the actual ownership in the flagship contests in real time") | ✅ | ✅ |
| Correlation + range-of-outcomes projections | ✅ | ✅ | ✅ |
| Lightning-fast late swap | ✅ | ✅ | ✅ |
| Private Discord + live office hours | ✅ | ✅ | ✅ |
| Contest Flashback | ✅ | ✅ | ✅ (implied by "All Starter features") |
| Detailed stat projections | — | ✅ | ✅ |
| Download projection CSV | — | ✅ | ✅ |
| Aggregate multiple projection sources | — | ✅ | ✅ |
| Upload custom data | — | ✅ | ✅ |
| Custom lineup ranking metrics | — | ✅ | ✅ |
| **Auto-updating ownership for 13 contest archetypes** | — | — | ✅ |
| **Contest Sims (100k/lineup, "for all sports")** | — | — | ✅ |
| **Full ROI metric suite** (ROI, Cash Rate, Win Rate, ROI StDev) | — | — | ✅ |
| **Live projections and simulations** | — | — | ✅ |
| **Portfolio Plus** (per-contest sims in the Diversifier) | — | — | ✅ (per help center) |

### THE PRODUCT BOUNDARY, stated plainly

**The thing the entire product is philosophically about — contest-specific ROI — is behind the
$297/month tier, and they say so in their own help center:**

> "Saber Score uses a generalized and simplified contest simulation. It is not contest-specific—
> **you'll need Ultimate to access detailed, contest-specific simulations.** For example, Saber
> Score won't tell you how a lineup might perform differently in a single-entry contest versus the
> Milly Maker."
> — `support.sabersim.com/en/articles/12558411-how-saberscore-works`

A $97 Starter customer gets: sim-derived projections, a sim-built lineup pool capped at **500
lineups per build**, one generic GPP ROI number per lineup, and a "faster simulation" Diversifier.
They do **not** get the contest sim, the 13 modelled fields, win/cash rate, ROI volatility, or dupe
projections. The $197 Pro tier buys **data-plumbing** (CSV out, custom data in, aggregation,
detailed stats, 10× the pool) and **still not the contest sim.** The ladder is therefore:
`$97 = sims for building` → `$197 = sims plus your own data` → `$297 = sims for deciding`.

### Other hard limits worth naming

- **500 vs 5,000 lineups per build** is the sharpest boundary, and it interacts with their own
  advice: *"build the largest lineup pool your plan allows"* and *"Your highest ROI lineups aren't
  built in order... your 'best' lineup might be the 200th one built"*
  (`support.sabersim.com/en/articles/12079141-building-lineups`). A 500-cap on a tool whose stated
  best practice is "build as many as you can" is a designed squeeze.
- **Live field data (real opponent lineups during late swap) is DraftKings-only.**
- **Contest Flashback is DraftKings-only.**
- **Seats: NOT CONFIRMED.** No seat count, team plan or multi-user language appears on the pricing
  page.
- **Exports:** "Download projection CSV" (Pro+) has no stated per-day cap. **NOT CONFIRMED** that
  any export rate limit exists.
- **API: NOT CONFIRMED.** No public API documentation, no `/api` or developer page in the sitemap.

### Two quality defects on the pricing page itself (captured 2026-09-08)

1. **The entire Pro column's feature tooltips are unreplaced Lorem ipsum.** Every Pro bullet —
   detailed stat projections, projection CSV, aggregate sources, upload custom data, 5,000 lineups,
   custom ranking metrics, Contest Flashback — carries the body text
   `Lorem ipsum dolor sit amet, consectetur adipiscing elit.` The identical features in the Ultimate
   column have real copy. The middle tier of a $197/month product ships with placeholder text.
2. **Pro says "Includes: Everything in Standard."** There is no tier called Standard on the page.
   Three testimonial cards on both the pricing page and `/how-it-works` are also Lorem ipsum
   attributed to a real named customer (`Spencer @elusivesmoke`).

### Cancellation and refunds (Terms, verbatim)

> "At the end of each Billing Cycle, your Subscription will automatically renew under the exact same
> conditions unless you cancel it... You may cancel your Subscription renewal either through your
> online account management page or by contacting Saber Simulations LLC customer support team."

> "**REFUNDS** Certain refund requests for Subscriptions may be considered by Saber Simulations LLC
> on a case-by-case basis and granted in sole discretion of Saber Simulations LLC."

Self-serve cancel exists (good, and ROSCA-relevant). Refunds are entirely discretionary. The
help-center article "How to Upgrade, Downgrade, or Cancel" (id `10388709`) renders with **no body
content at all** — the page has a title, an author byline and nothing else.

---

## 3. ACCURACY: WHAT THEY CLAIM vs WHAT THEY PROVE

### What they claim

- Domain-level: **"We Help You Win"** is the site's `<title>` and the footer wordmark.
- *"SaberSim is the only optimizer designed to beat tournaments."* (pricing FAQ)
- *"We have the **only** complete game simulator"* / *"no one else does this"* / *"the only
  optimizer that can use that data"* / *"the only support team staffed exclusively by winning
  players."* (CEO transcript)
- *"Contest Sims are **the only way** to judge your lineups in the full context of the contests
  you've entered. Anything else is just guessing."*
- *"the 3-stage framework that has helped players win millions"* (`/school`)
- **"8+ ROLEXES GIVEN AWAY and thousands of $1,000+ winners"** (homepage hero)
- *"The Diversifier **has been backtested** against ROI-only builds, ROI with Min Uniques, and
  global exposure caps, and it **consistently produced stronger profitability with less downside
  risk**."*
- *"[the Diversifier is] built from **years of backtesting** across sports and contest types."*

### What they prove

**Nothing, in the sense this repo means the word.** Specifically, searched for and not found
anywhere on the public site or help center:

| Evidence type | Published? |
|---|---|
| Projection accuracy (MAE/RMSE/correlation vs actuals) | **No** |
| Calibration of the simulated distribution vs realized outcomes (do 90th-percentile outcomes occur 10% of the time?) | **No** |
| Realized ROI of the Contest Sim's ROI estimate (predicted vs actual) | **No** |
| Aggregate subscriber ROI, or any denominator (users, entries, contests) | **No** |
| The backtest that "consistently produced stronger profitability" — numbers, sample, method | **No** |
| Any Brier score, log loss, reliability diagram or coverage curve | **No** |
| CLV or any market-anchored benchmark | **No** (not applicable to DFS, but nothing analogous either) |
| Head-to-head projection accuracy vs a named competitor | **No** |

**The single most important asymmetry in this dossier:** a product that computes a distribution
100,000 times and reports its mean as ROI has, by construction, everything it needs to publish a
reliability diagram — predicted ROI decile vs realized ROI — and they have never published one.
Contest Flashback even does the historical re-simulation that such a check would build on. They use
it to grade *users*, never to grade *themselves*.

### What they publish instead: the Winner's Circle

`https://www.sabersim.com/winners-circle` renders from four public JSON payloads its own page
fetches. Counted directly from those payloads on 2026-09-08:

| Tier | Cards |
|---|---|
| $1M+ | **18** |
| $100K+ | **64** |
| $10K+ | **393** |
| $1K+ | **1,609** |
| **Total** | **2,084** |

- **Sum of `winAmount` across all 2,084 cards: $38,557,703.**
- **746 unique `screenName` values** — so the mean winner appears 2.8 times, and the distribution is
  heavily concentrated: `craftylefty` 31 cards, `bionicknee` 22, `safetydance` 22, `mrrutexas` 20,
  `elusivesmoke` 19, `doctor_toy` 17.
- Season labels span `'20-'21` through `2026` (12 distinct labels), so this is a ~6-season
  cumulative wall, not a period result.
- Sports: NFL 611, NBA 543, MLB 429, PGA 124, NHL 112, NASCAR 65, UFC 38, MMA 35, CFB 34,
  Tennis 29, CSGO 14, LOL 13, Soccer 8, F1 7, CS 6.
- Sites: DraftKings 1,608, FanDuel 432, Yahoo 32, OwnersBox 11, Draftstars 1.

It is also explicitly a **loyalty program**, which converts the evidence into an incentive:
*"A one-of-a-kind loyalty program giving away everything from SaberSim credit to a Rolex."*
$1M winners receive *"Free SaberSim ULTIMATE for life"* + a Rolex + swag; $100K, $10K and $1K
winners each receive *"1 month free SaberSim"* + swag. **Winners are paid, in product, to submit
their screenshots.** That is a textbook selection mechanism: the numerator is subsidised and the
denominator is never collected.

### The compliance read (cross-ref `_competitor-mistakes-lessons.md` §2)

**No "results not typical", "results may vary", "individual results", or any earnings disclaimer
appears in the HTML of the homepage, the pricing page or the Winner's Circle page.** (Grepped for
all of those strings plus "no guarantee", "disclaimer", "18+", "21+" and "responsible gam" — zero
hits across all three files.) What the site does carry is a **wall of dollar figures next to named
customers, above a purchase button**, under a domain title that says "We Help You Win."

The countervailing language is buried in the Terms, not on the marketing surface:

> "Saber Simulations, LLC is not an online gambling operator, and simply provides predictions about
> sporting events **for entertainment purposes**... While we are confident in the predictions
> provided and make every effort to ensure the accuracy of information, we are unable to guarantee
> or warranty the information."

That is the RagingBull shape from our own lessons file: testimonial earnings figures used as the
primary conversion asset, with substantiation of typicality nowhere on the page and the hedge in a
legal document nobody reads. DFS tools are not securities and the FTC posture is different, but the
**structure** of the exposure is the one that cost RagingBull $2.425M, and it is a structure GSE has
already decided never to build. **This is not a reason to feel safe. It is the reason our published
calibration surface is worth more than it costs.**

---

## 4. WHAT A CUSTOMER WOULD SAY IS MISSING OR WRONG

**Honesty note on this section.** Real first-party negative sentiment on SaberSim is genuinely hard
to source and I did not find much. There is no App Store review corpus (no native app). Reddit is
not fetchable by this agent's user-agent. Trustpilot returns 403. Web search over forums surfaced
review-site summaries rather than user posts. **So most of what follows is either (a) SaberSim's own
documentation of friction, which is unimpeachable but self-selected, or (b) third-party review-site
characterisation, which is weaker evidence. I have labelled which is which. I did NOT find and am
NOT reporting any verbatim angry customer.**

### (a) Friction SaberSim documents about itself — strongest evidence, from their own pages

1. **Builds fail on tight constraints.** *"What if my build fails? Build failures usually mean your
   constraints are too tight. Common causes: narrow min/max exposure ranges (e.g. Min 30% and Max
   35%), too many restrictive group rules, Global Max Exposure set too low on small slates."*
2. **A DraftKings integration quirk they have to teach around.** *"How do I unlock stuck lineups on
   DraftKings? DraftKings requires users to adjust at least two players' projections, ownership, or
   exposures before generating lineups. Change any two values slightly and the Build Lineups button
   will unlock."*
3. **Non-reproducible builds.** *"Why do my lineups look different every time I build, even without
   changes? Each build samples a new set of simulations."* Defensible statistically; it is also a
   support ticket generator and it means **a user cannot reproduce their own portfolio.**
4. **Late-swap upload failures shipped to production.** Release notes 2025-10-23: *"we've also fixed
   several bugs that could occasionally cause late swap to generate entries files with **upload
   errors on DraftKings, FanDuel, and other sites**."* A broken entries file during late swap is the
   single most expensive failure mode this product has.
5. **A setting removed because it did not work.** Beta release notes 2025-12-11: *"**Group
   Duplicates** — This setting **didn't work reliably** with lineup groups and created edge cases
   that caused issues."* And: *"**Run Late Swap Automatically** — This setting created confusion by
   starting builds immediately without user confirmation."*
6. **Contradictory gating in their own docs.** The projections article body says custom projections
   are available *"On the **Starter** Plan and above"*; the FAQ on the **same page** says
   *"Yes—on the **Ultimate** plan and above."* The pricing page puts "Upload custom data" at Pro.
   Three different answers to "which tier can upload projections."
7. **Uploaded contests can never be removed.** *"Note: Uploaded contests cannot be removed from
   entries. To temporarily exclude a contest from sims, disable it via the Enabled column."*
8. **Micromanagement is discouraged, which is a real UX tension for a $297 tool.** *"Micromanaging
   the builder: Treating SaberSim like a traditional optimizer prevents it from doing its job...
   Over-controlling exposures or rules takes away the natural edge of simulation-based builds."*
   The Diversifier's calculation is explicitly not editable. A power user paying $297 is told to
   trust a black box.

### (b) Third-party characterisation — weaker evidence, cited to source

- **Price is the universal complaint.** `onlydfs.com/blog/best-mlb-dfs-optimizer-tools-2026.html`:
  *"SaberSim's full-featured plans have historically been among the most expensive in the market,
  running into the hundreds per month... For small-stakes players grinding $1–$5 contests, the
  monthly fee can eat into the bankroll faster than the tool can grow it."* Note the arithmetic:
  Ultimate at $297/month is **~$1,485 across a 5-month NFL season**
  (`stokastic.com/articles/nfl-dfs/stokastic-sims-vs-sabersim-vs-rotogrinders-nfl-2026`), and their
  own Saber School teaches beginners to *"pick beatable contests **under $3**"* (`/school`). A user
  following their own curriculum needs ~500 winning $3 entries a season just to cover the tool.
- **Learning curve.** Cited by `onlydfs.com` ("the interface is powerful but complex"),
  `sportbotai.com/blog/tools/sabersim-review` (*"beginners may initially find the platform's
  advanced features... overwhelming"*), and `v12dfs.com/best-dfs-optimizer` (*"cost ($97 floor,
  $197–$297 for the real tiers) and a learning curve"*).
- **Trial too short.** `sportbotai.com`: *"The trial period may not be long enough for users to
  fully explore all of SaberSim's capabilities."* Note the trial is 7 days at $7 — and the
  Ultimate-only features are the ones that need a full slate cycle to evaluate.
- **Leverage judgment is pushed onto the user.** A competitor's comparison
  (`stokastic.com`, adversarial source, treat accordingly) says SaberSim places *"more of the
  leverage judgment on you."*
- **No published accuracy is noticed by reviewers.** `sportbotai.com` under track record:
  *"Users have reported significant increases in their DFS winnings"* — with no cited evidence,
  which is itself the finding.

### (c) The complaint a sophisticated customer *should* make and apparently does not

Nobody in the public record asks SaberSim the obvious question: **is the ROI number calibrated?**
The product's output is a probability-weighted expectation. It is checkable. They have the
historical data (Flashback) to check it. No reviewer asks; no page answers.

---

## 5. THE SEAM — what GSE can do that SaberSim cannot or will not

Five items, ordered by how hard they would be for SaberSim to neutralise.

### SEAM 1 — Publish the calibration of the simulated ROI. **They will not, and it is the whole game.**

SaberSim sells a number ("your ROI is +38%") produced by 100,000 draws from a model they have never
shown is right. GSE's entire published doctrine — reliability diagrams, coverage denominators,
Wilson bounds, out-of-sample only — maps onto DFS with almost no translation:

- **Sim calibration:** across all settled slates, did players' realized fantasy points land inside
  their simulated percentile bands at the stated rate? A PIT histogram / reliability diagram over
  percentile bins is the exact analogue of `apps/web/lib/calibration/compute.ts`.
- **ROI calibration:** bucket lineups by predicted ROI decile at lock; plot realized ROI per decile
  with a confidence bound. Predicted-vs-realized. One chart.
- **Field-model calibration:** predicted ownership vs actual ownership (DraftKings publishes actual
  ownership post-contest, and SaberSim already ingests it live), and predicted dupes vs actual
  dupes. Dupes is the sharpest single test because it is an integer count with a hard truth.

**Why they will not do it:** the numbers would be worse than the marketing. Contest ROI estimates
are extremely sensitive to field-model error, and any honest reliability diagram on a top-heavy GPP
would show systematic overconfidence in the tail (that is where all the ROI lives and where the
field model is least constrained). Publishing it converts a $297 certainty into a $297 estimate with
error bars. **Institutionally they cannot afford to be first — which is exactly the asymmetry that
made our Glass Ledger a moat in the picks business.** A latecomer cannot manufacture an earlier
honest start date here either.

### SEAM 2 — The free/cheap tier they have priced themselves out of

Contest ROI is Ultimate-only at $297/month, and Starter is capped at 500 lineups. GSE's fantasy tier
is $4.99/mo. **The entire $0–$50/month band has no contest simulator in it.** A simulator that
answers "which of my 20 lineups is actually +EV in *this* $5 contest" is, computationally, small:
20 lineups × a 50k-lineup field × 20k iterations is trivially cloud-cheap. SaberSim's own pricing
card advertises 100k sims in "30 seconds or less" — that is not an expensive computation, it is a
*positioned* one. They will not attack their own $297 tier from below.

### SEAM 3 — Reproducibility. They explicitly cannot offer it; we already require it.

*"Why do my lineups look different every time I build, even without changes? Each build samples a
new set of simulations."* SaberSim's product **cannot reproduce its own output.** GSE's optimizer is
already built the opposite way — `apps/web/lib/fantasy/dfs-optimizer.ts` documents its solver as
*"No randomness, no local search, no restarts... the provably optimal lineup for the given objective
and constraints — not an approximation of one."* Adding simulation must not throw that away: **seed
the sim draw, store the seed, and publish it with the lineup.** Then a GSE lineup is
re-derivable by the customer, by a third party, and by us at settlement — which is the same
hash-chained, independently-recomputable posture as the Glass Ledger, applied to DFS. Nobody in this
category ships a re-runnable build.

### SEAM 4 — Show the field model instead of asserting it

SaberSim's most defensible technical choice is that ownership is *derived from* simulated opponent
lineups rather than the other way round. They then show the user only the **derived scalar**
(ownership %, adjusted ownership) and a black-boxed "13 contest buckets." The joint structure — what
the field's stacks actually look like, where the field's construction is fragile — never surfaces.
GSE's positioning ("math you can read") says show the field: which archetypes, at what weight, what
the modal opponent stack is, how the archetype mix was estimated and against what actual observed
contest data. **They have the harder half built and hide it; we can build the easier half and show
it.**

### SEAM 5 — Refuse the survivorship wall

They cannot un-publish 2,084 winner screenshots and a Rolex giveaway; that is their conversion
engine and their loyalty program at once. GSE's rule 8 / FTC posture forbids that asset outright,
which looks like a handicap and is not: it forces the only other credible proof, which is an audited
distribution. **The attack line writes itself and it is true:** *"They show you 2,084 winners. They
have never shown you how many players used the tool, or what the median one made. We publish the
distribution — including the losing half — because we compute it anyway."*

### What this means for `apps/web/lib/fantasy/dfs-optimizer.ts` — the build, concretely

Our current state, read from the file: `objVal(p, mode)` returns **one scalar per player** derived
from `p.proj` (cash), `p.ceiling` (gpp), or `leverage(p)*6 + p.ceiling*0.45` (leverage), each scaled
by `galaxyFactor(p)`; `solveExact` is an exact multi-dimensional 0/1 knapsack over slot-fill state ×
salary; `generateLineups` produces N lineups by re-solving with `EXPOSURE_DECAY = 0.97` compounding
on already-used players. **This is precisely the architecture SaberSim's CEO describes as the
degenerate case of his own** — his "sim variance slider all the way off" *is* our optimizer.

The distance is therefore **not a rewrite of the solver**. It is four additive layers, in dependency
order:

1. **A player-outcome sample matrix.** `S × P` simulated fantasy-point scores. This is the only hard
   part and it is a data/modeling problem, not an optimizer problem. Correlation must live in the
   draw (same-game joint sampling), not in a post-hoc stacking rule — that is the one thing that
   cannot be retrofitted later.
2. **Bucket sampling around the existing solver.** Draw a bucket of size `B`, average it into a
   per-player value vector, call `solveExact` unchanged, repeat. `B = S` reproduces today's
   behaviour exactly, so this ships behind a slider with a no-op default and zero regression risk.
   **This is a small change to `generateLineups` and no change at all to `solveExact`.**
3. **A contest simulator.** Field lineups (sampled from an archetype model) + a real payout curve +
   the same `S` game scripts → per-lineup ROI, win rate, cash rate, dupes. Needs contest payout
   structures and observed ownership, both of which DraftKings publishes post-contest.
4. **A portfolio selector.** Replace top-N-by-score with a covariance-aware selection over the pool,
   weighted by entry fee and payout shape. This is the layer that makes "a negative-score lineup can
   improve the portfolio" expressible — and it is the layer that makes the whole stack worth more
   than the sum of its parts.

Layers 1 and 2 are the minimum viable answer to SaberSim's core claim. Layer 3 is what they charge
$297 for. Layer 4 is where the real edge is and where a small, honest, published-calibration product
can beat a large unaudited one.

---

## APPENDIX — sources read

Marketing (`www.sabersim.com`): `/robots.txt`, `/sitemap.xml`, `/`, `/pricing`, `/how-it-works`,
`/winners-circle`, `/school`, `/school/sabersystem`, `/nfl/optimizer`, `/mlb/optimizer`,
`/nba/optimizer`, `/legal/terms-and-conditions`,
`/video/dfs-lineup-optimizers-are-obsolete-you-need-a-simulator`,
`/video/master-dfs-simulations-the-proven-path-to-victory`,
`/video/nba-dfs-projections-are-broken-we-fixed-it`.
Winner's Circle payloads: `cdn.prod.website-files.com/.../wc-{1mil,100k,10k,1k}-mocuquh2.json`
(fetched by their own page at render time).

Help center (`support.sabersim.com`): `/robots.txt`, `/sitemap.xml` (42 URLs), and articles
`12078831-how-projections-work`, `12079141-building-lineups`, `12079199-how-contest-sims-work`,
`12079514-using-the-portfolio-diversifier`, `12079605-using-contest-flashback`,
`12558411-how-saberscore-works`, `12558465-how-lineup-groups-templates-work`,
`12164160-how-to-use-sabersim`, `12634781-release-notes-swap-pools-october-23st-2025`,
`13134454-beta-release-notes-late-swap-updates`, `12511016-improved-lineup-groups-release-notes`,
`10388709-how-to-upgrade-downgrade-or-cancel` (empty body).

Third-party: `stokastic.com/articles/nfl-dfs/stokastic-sims-vs-sabersim-vs-rotogrinders-nfl-2026`
(adversarial — a direct competitor), `onlydfs.com/blog/best-mlb-dfs-optimizer-tools-2026.html`,
`sportbotai.com/blog/tools/sabersim-review`, `v12dfs.com/best-dfs-optimizer` (adversarial — a direct
competitor), `itunes.apple.com/search?term=sabersim`.

GSE repo, for the seam analysis: `/home/user/Sports/apps/web/lib/fantasy/dfs-optimizer.ts`
(603 lines; `objVal`, `solveExact`, `generateLineups`, `EXPOSURE_DECAY`).

**NOT CONFIRMED anywhere:** annual pricing, seat/team plans, any public API, export rate limits,
game-sim counts for sports other than NBA, the meaning of the homepage `CBB*`/`COD*`/`CFL*`
asterisks, any third-party review-platform rating, and any first-party verbatim user complaint.
