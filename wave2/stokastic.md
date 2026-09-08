# Stokastic — competitive dossier (SimLabs / Contest Sims, Boom-Bust, +EV Props)

**Slug:** `stokastic` · **Captured:** 2026-09-08 · **Analyst:** GSE competitive-intel wave 2
**Method:** public surfaces only — Stokastic's own `/articles/*` pages (server-rendered, robots-Allowed),
their `robots.txt`, their `sitemap.xml`, their page `<meta name="description">`, plus third-party
review/affiliate pages. **No authentication, no paywall crossing, no endpoint scanning.**

> **Robots note (respected):** `https://www.stokastic.com/robots.txt` returns
> `Disallow: /api/`, `/account/`, `/admin/`, `/_next/`. Stokastic's **`/pricing`, `/props`,
> `/hall-of-fame` pages are client-rendered React whose content lives only under `/_next/`**, which is
> Disallowed. **We therefore did NOT read the pricing page's own numbers.** Every price below comes
> from either Stokastic's own indexable `/articles/` prose or a named third-party page, and is
> labelled accordingly. This is the single biggest honesty caveat in this file.

**Corporate:** Stokastic is the July-2022 rebrand of Awesemo.com, co-founded by Alex "Awesemo" Baker.
**OddsShopper is the same company's betting platform**, not an unrelated third party — the rebrand
release names OddsShopper as a Stokastic platform.
Source: https://www.prnewswire.com/news-releases/awesemocom-rebrands-as-stokastic-to-reflect-growth-and-diversification-301581191.html
(also carried at https://www.streetinsider.com/PRNewswire/Awesemo.com+Rebrands+as+Stokastic+to+Reflect+Growth+and+Diversification/20295828.html)
This matters below: **the "+EV props" math is largely OddsShopper's engine wearing a Stokastic
projection**, and the two are cross-sold.

---

## 1. HOW IT WORKS, MECHANICALLY

### 1.1 There IS a real simulation engine, and it is a *contest* simulator, not a game simulator

This is the single most important mechanical fact and Stokastic states it as their positioning
against SaberSim:

> "simulate the contest, not just the game. The Contest Sims model the tournament you are actually
> entering, field, payout curve and projected ownership included"
> — https://www.stokastic.com/articles/nfl-dfs/stokastic-sims-vs-sabersim-vs-rotogrinders-nfl-2026

Same page, on the competitor, for contrast:

> SaberSim: "play-by-play game simulation: the product is built on the idea that a player's
> projection should come out of thousands of simulated game scripts"
> RotoGrinders: "Expert projections feeding a classic optimizer, plus SimLabs and bundled expert content"
> — same URL

**The full pipeline, in their own words (NFL):**

> "simulate every game play by play with QB-to-pass-catcher correlation baked in, build a huge
> candidate pool, and then run the Contest Sims, which play every lineup in your pool against all
> the others, at your chosen field size and percent-to-first, across tens of thousands of simulated
> contests."
> — https://www.stokastic.com/articles/nfl-dfs/stokastic-vs-fantasylabs-nfl-dfs

> "The output is a simulated ROI for every lineup, plus a leverage number for every player (your
> exposure minus their projected field ownership)."
> — same URL

So it is a **two-stage** engine: (1) a player-outcome / game simulation producing correlated score
distributions, then (2) a **contest-level Monte Carlo** that plays your pool against a *simulated
opposing field* under a real payout curve.

**Restated on their own review page:**

> "simulate the slate tens of thousands of times: every player's outcome varies sim to sim,
> correlations hold (a QB's big game drags his receivers up with him), and projected ownership
> determines how many entrants you are sharing each player with."
> — https://www.stokastic.com/articles/nfl-dfs/stokastic-review

**MLB phrasing of the same loop:**

> "every lineup in your pool is simulated against the rest, thousands of times, inside that exact
> payout structure, then sorted by simulated ROI."
> — https://www.stokastic.com/articles/mlb-dfs/how-to-use-mlb-dfs-sims

### 1.2 What "Sim ROI" folds in — including duplication

> "Sim ROI is the all-encompassing number because it folds in everything at once: how often a lineup
> min-cashes, how often it hits the top 10, how often it wins, and how often it gets **duped**."
> — https://www.stokastic.com/articles/mlb-dfs/how-to-use-mlb-dfs-sims

**Duplication is modelled, not a separate knob.** A settings article confirms dupes are "baked into
the simulated ROI" rather than exposed as an adjustable uniqueness control.
— https://www.stokastic.com/articles/dfs-strategy/stokastic-sims-settings

### 1.3 Ownership is *inside* the field, not a sidebar number

> "Stokastic's Contest Sims fold projected ownership into the simulated field itself, leverage stops
> being a number you eyeball and becomes something the ROI ranking already priced in"
> — https://www.stokastic.com/articles/nfl-dfs/stokastic-sims-vs-sabersim-vs-rotogrinders-nfl-2026

Same page on the rivals: SaberSim — "ownership shapes the pool through the rules and settings you
apply, which works well but puts more of the leverage judgment on you"; RotoGrinders — "ownership is
reference data next to the build, and acting on it is fully manual."

**This is genuinely the strongest part of their engine and the part hardest to copy**: the field is
endogenous. Leverage = your exposure − projected field ownership, and it is priced by the sim rather
than eyeballed.

### 1.4 The simulated field is parameterised by contest *archetype*, not by a real field snapshot

Settings exposed to the user (all quotes from
https://www.stokastic.com/articles/dfs-strategy/stokastic-sims-settings ):

| Setting | What it does (quoted) |
|---|---|
| **Pool Size** | "How big and how soft the contest you grade against is; the Low Stakes to High Stakes slider sets the field's archetype" |
| **Field Ownership / Projection edits** | controls how the simulated field rosters and scores players |
| **Player Exposure Caps** | "A hard ceiling on how often a player lands in YOUR pool" |
| **Stack Exposure** | frequency of team stacks; pre-loaded shapes |
| **ROI / Player Boosts** | "A manual up or down nudge on a player" |

Worked exposure numbers they publish (same URL): a **−10% ROI boost moved one player from 50% → 32%
exposure**; a **35% exposure cap moved 41% → 35%**; a **+10% boost moved 11% → 16.67%**.

**Contest archetypes** are three named buckets — "Low Stakes, High Stakes, Marquee":
> "Archetype is the Sims asking a single question: what kind of contest are you entering?"
> — https://www.stokastic.com/articles/dfs-strategy/stokastic-sims-contest-archetype-percent-to-first

**Percent-to-first** is set by the user from the real contest:
> "take the money going to first and divide it by the total prize pool" — worked example
> "$200,000 to first out of an $800,000 pool, that's 25 percent."
> — same URL

**Stack shapes** are pre-loaded, not learned: "5-3, 5-2-1 on DK; 4-4, 4-3 on FD" (MLB).
— https://www.stokastic.com/articles/mlb-dfs/how-to-use-mlb-dfs-sims
NFL settings article names "5-3 and 5-2 builds."

### 1.5 Boom/Bust is a percentile read on a modelled outcome range

> "pairs each projection with a modeled range of outcomes for that player (standard deviation,
> ceiling, floor, Boom% and Bust%)"
> **Ceiling** = "the 75th-percentile night, a realistic high end hit about one time in four"
> **Floor** = "the 25th-percentile night, a realistic low end you'd expect on a quarter of nights"
> — https://www.stokastic.com/articles/dfs-strategy/dfs-boom-bust-probability

**NOT CONFIRMED:** the distribution family, the numeric threshold that defines Boom% and Bust%
(e.g. whether Boom is a salary multiple such as 5x, or a percentile), and **whether Boom/Bust is
drawn from the same simulation that feeds the Contest Sims or is computed separately.** Their own
article treats boom/bust as an *input to* the Contest Sims without saying they share a model. We
read four of their strategy articles and none disclose it.

### 1.6 The props / +EV side

Stokastic's props product is a **projection-to-market comparison**, and the +EV screen itself is
described in OddsShopper terms (same company).

Projection engine, per their own sister site:
> "runs high-level simulations, many times over, before each contest to settle on the most
> fine-tuned number for a player"
> — https://www.oddsshopper.com/articles/betting-101/stokastic-projection-system

Displayed metrics, defined verbatim on that page:
| Metric | Definition (quoted) |
|---|---|
| **X-Win** | "The expected win percentage of the bet, based on the projection" |
| **X-ROI** | "The expected return on investment" |
| **Hold** | "The book's built-in margin, the vig, on that market" |

The devig + EV math, from Stokastic's own strategy article
( https://www.stokastic.com/articles/dfs-strategy/positive-ev-betting-for-dfs-players ):
> "Expected value per bet = (win probability × profit) − (loss probability × stake)."
> Worked: "A $100 bet at +150 that truly wins 44% of the time returns (0.44 × $150) − (0.56 × $100)
> = $66 − $56 = $10 of EV."
> Implied-probability step: "A moneyline of +150 carries about a 40% implied probability, the
> break-even number baked into the price (100 divided by the sum of 150 and 100)."
> The screen: "OddsShopper's +EV screen strips the vig out of the sharpest markets to build a fair
> price for every bet, then lines that up against what every book is actually offering."
> Outputs: "It shops the number across every major sportsbook in seconds, shows win probability
> (xWin%) and expected return (xROI)."

**Read this carefully — there are TWO different fair prices in the same product family, and Stokastic
does not reconcile them in public:**
1. **Market-derived fair price** — devig the sharpest book, compare to every other book. This is a
   *market-vs-market* +EV screen (classic OddsShopper).
2. **Projection-derived fair price** — the Stokastic simulation's own number for the player, turned
   into X-Win and compared to the book. This is a *model-vs-market* edge.

**NOT CONFIRMED:** which devig method is used (proportional / multiplicative, Shin, power, worst-case),
whether the projection probability is calibrated before being called X-Win, whether the two paths are
blended, and whether correlation between simultaneous prop bets is handled at all. **None of the
pages we read discloses a devig method by name.** For a product whose entire pitch is EV, that is a
large public silence.

### 1.7 How many sims? — the number is never published

Across every page we read the count is a qualifier, never an integer:
"tens of thousands of simulated contests" ( vs-fantasylabs ), "tens of thousands of times"
( stokastic-review, milly-maker ), "thousands of times" ( MLB sims ), "many times over"
( oddsshopper projection-system ). The settings article explicitly does not state a total.
**NOT CONFIRMED: any exact simulation count, for any product, anywhere public.**

The only hard field-size number we found is about the *pool/field* setting, not the sim count:
> "10,000 if you are a Sims Max user and 500 on the base Sims package."
> — https://www.stokastic.com/articles/nfl-dfs/nfl-dfs-milly-maker-sims
That same article grades against a Milly Maker of "somewhere north of 150,000 entries" using a
10,000-lineup simulated field — i.e. **the simulated field is ~6.7% the size of the real one and is
a synthetic archetype, not a reconstruction of the actual entrant pool.**

### 1.8 Ownership projection method — NOT CONFIRMED

We could not read a single Stokastic page that explains how the ownership projection is produced.
The `/articles/` pages treat ownership as an input; the pages that might explain it
(`/nfl/nfl-dfs-contrarian-strategy-...`) render only under `/_next/` and returned title-only.
A web-search summary reported a Tuesday-night release for the NFL Main Slate with continuous updates
for injury news, **but we could not confirm that on a page we actually read, so treat it as
UNCONFIRMED.** No inputs, no weighting, no accuracy measurement is public.

---

## 2. WHAT THEY SELL, AND THE LIMITS THAT ARE THE PRODUCT BOUNDARY

### 2.1 The lineup cap IS the pricing model

This is the cleanest read on their whole business. Confirmed **on Stokastic's own indexable article**:

> **NFL Core** — "projections, ownership, DataHub and Sims access", capacity to
> "build and simulate up to **2,000 lineups** in the Contest Sims."
> **NFL Max** — raises capacity "to **10,000 lineups on classic slates and 50,000 on showdown**",
> for players entering "20-max and 150-max contests every week."
> **NFL MVP** — top tier "for players running the full Thursday-through-Monday weekend on sims."
> — https://www.stokastic.com/articles/nfl-dfs/stokastic-review

Corroborated: Core "up to 2,000 lineups"; MAX "up to 10,000 lineups (50,000 for showdown)"
— https://www.stokastic.com/articles/nfl-dfs/stokastic-vs-fantasylabs-nfl-dfs

Separately, the **simulated-field pool size** is also tier-gated: "10,000 if you are a Sims Max user
and 500 on the base Sims package"
— https://www.stokastic.com/articles/nfl-dfs/nfl-dfs-milly-maker-sims

> **This is the boundary that matters.** A base subscriber grades their lineups against a
> **500-entry** synthetic field. The contest they are actually entering has 150,000+ entries. The
> product's own article says the 10,000-field view is what "surfaces lineups built to win big."
> **Stokastic sells the accuracy of the simulation's field model by the tier.** The cheap tier is not
> a smaller version of the answer; on their own framing it is a *different and worse* answer.

### 2.2 Tier table

**Confirmed on Stokastic's own article** ( https://www.stokastic.com/articles/nfl-dfs/stokastic-review , dated on-page Sept 1 2026):

| NFL tier | Weekly | Monthly | Annual |
|---|---|---|---|
| NFL Core | $44.95 | $149.95 | $549.95 |
| NFL Max | $64.95 | $229.95 | $749.95 |
| NFL MVP | — | $349.95 | $1,299.95 |

**Third-party affiliate page** ( https://splashplaypodcast.com/stokastic-promo-code/ — an affiliate
running promo code SPLASH, **not** Stokastic; treat as indicative). List prices it publishes:

| All Access (monthly) | List |
|---|---|
| CORE | $329.95 |
| MAX | $449.95 |
| MVP (new) | $849.95 |

| Single sport | Weekly CORE / MAX | Monthly CORE / MAX |
|---|---|---|
| NFL ("2026 increase") | $44.95 / $64.95 | $149.95 / $229.95 |
| NBA, MLB | $39.95 / $54.95 | $129.95 / $179.95 |
| NHL, PGA, CFB | $29.95 / $39.95 | — |
| NASCAR, MMA | $19.95 / $29.95 | — |

| Props packages | Weekly |
|---|---|
| Single sport props (NBA / NHL / MLB each) | $39.95 |
| All Sports Props | $79.95 |

Same page: "Annual All Access billing runs roughly 17% below the monthly rate"; the code is
"10% off your FIRST PAYMENT — any Stokastic plan."

**Price discrepancy, flagged rather than resolved:**
https://www.stokastic.com/articles/nfl-dfs/stokastic-vs-fantasylabs-nfl-dfs (August 2026) lists
NFL Core at **$39.95 / $129.95 / $549.95** and MAX at **$54.95 / $179.95 / $749.95** — i.e. the
NBA/MLB price row. The affiliate page labels the NFL row "2026 increase," which is a plausible
reconciliation (a mid-season NFL price rise with a stale competitor-comparison article), **but we did
not confirm it and the pricing page itself is unreadable to us.** Both figures are recorded above.

Third-party price sanity checks: "~$120/mo all-access" — https://www.v12dfs.com/best-dfs-optimizer ;
"Starting at $119.99+ per month" — https://linestar.gitbook.io/competitor-pages/stokastic-vs.-linestar-dfs-review
(a competitor's page). These are materially below the affiliate's All-Access list; **NOT RECONCILED.**

### 2.3 Sports covered

"NFL, NBA, MLB, NHL, PGA, NASCAR, UFC & CFB" — verbatim from the `<meta name="description">` served
to anonymous visitors on stokastic.com (we read the raw HTML head of https://www.stokastic.com/pricing ).
Their sitemap ( https://www.stokastic.com/sitemap.xml ) lists projections+ownership pages for exactly:
cfb, mlb, mma, nascar, nba, nfl, nhl, pga.

**Sites supported:** DraftKings and FanDuel are the named contest sites throughout; one sitemap-adjacent
page covers OwnersBox. **Pick'em (PrizePicks / Underdog) is explicitly OUT of scope** — see 4.1.

### 2.4 Free tier

There is a free Sims surface ( https://www.stokastic.com/dfs-sims-for-free is in the sitemap) and
their review says: "You can try the Sims free: build a pool, run a contest sim, and watch how
simulated ROI reorders lineups." Their own framing of its limit:
> the free tier "shows you the mechanics, not the full-season edge. The edge comes from the Late
> Swap, the custom projections and the week-over-week habit, and those are the paid features."
> — https://www.stokastic.com/articles/nfl-dfs/stokastic-review

### 2.5 Seats / exports — NOT CONFIRMED

No public statement on seat count, concurrent logins, export-per-day caps, or API access. Their
robots.txt Disallows `/api/`, and there is no public API documentation we could find.

---

## 3. ACCURACY: WHAT THEY CLAIM vs WHAT THEY PROVE

### 3.1 The claim

> "**The most accurate DFS projections, ownership data, and simulations** for NFL, NBA, MLB, NHL,
> PGA, NASCAR, UFC & CFB. Win more on DraftKings & FanDuel with tools from **the #1 ranked DFS player**."
> — verbatim `<meta name="description">`, served to anonymous visitors, read from the raw HTML of
> https://www.stokastic.com/pricing (identical site-wide description)

### 3.2 The proof

**There is none published.** Across every page we read, the evidence offered is:

1. **One winner anecdote.** "Steve 'dacoltz' Buzzard … took down a DraftKings NFL Milly Maker on a
   Conference Championship Sunday for the full $1,000,000."
   — https://www.stokastic.com/articles/nfl-dfs/stokastic-review
   A first-person version, "$3 million prize pool, a million to first," is at
   https://www.stokastic.com/articles/nfl-dfs/nfl-dfs-milly-maker-sims
2. **A Hall of Fame page** ( https://www.stokastic.com/hall-of-fame , in their sitemap) which is
   client-rendered under `/_next/` and which **we could not read**. Its existence implies more winner
   anecdotes. **NOT CONFIRMED what it contains.**
3. **No calibration curve. No Brier/log-loss. No hit-rate-vs-projection reliability plot. No
   ownership-projection MAE. No out-of-sample ROI with a denominator. No CLV.** We looked for all of
   these and found none on any public Stokastic surface.

### 3.3 To their credit, the disclaimers are real

> "No tool changes what happens on the field, nobody can promise you a profit, and **most subscribers
> in a given week lose**."
> — https://www.stokastic.com/articles/nfl-dfs/stokastic-review

On the props side, after a "1,000 bets at 5% EV → $5,000" worked example:
> "**This is illustrative, not a promise.**"
> — https://www.stokastic.com/articles/dfs-strategy/positive-ev-betting-for-dfs-players

**That is an unusually honest pair of sentences for this category** — and it is exactly the shape of
the gap. They will tell you the product might lose. They will not tell you, with a number, how often
it has been right. *They disclaim rather than measure.*

### 3.4 The structural reason they can't be checked

A competitor asserts — and we could not find anything contradicting it:
> "Stokastic does not offer access to their previous day's projections" and they
> "show you no data on how they got to those numbers"; backtesting "requir[es] an upgrade to the
> Fantasy Cruncher package."
> — https://linestar.gitbook.io/competitor-pages/stokastic-vs.-linestar-dfs-review
> **(This is a competitor's marketing page. Treated as a lead, not a fact.)**

**But the structural point stands on its own evidence:** projections update continuously and are not
archived publicly, so **no subscriber can reconstruct what the model said before the games** — which
means no subscriber can grade it. The absence of a public archive of pre-lock projections is the
thing that makes "most accurate" unfalsifiable.

---

## 4. WHAT CUSTOMERS SAY IS MISSING OR WRONG

**Sourcing caveat, stated plainly:** Reddit is not fetchable by this agent (the search API refuses
reddit.com). So the complaints below come from (a) **Stokastic's own admissions**, which are the most
credible source available and are unusually candid, and (b) named third-party review pages. We did
**not** obtain a corpus of raw first-person user complaints. Anything we could not source, we omit.

### 4.1 Stokastic's own list of who should not buy (verbatim, from their review page)

> "Cash-game-only players, if the Sims are the reason you're buying."
> "Single-entry Sunday-morning players. If you fire one or two lineups a week, the Sims' biggest
> advantages … barely apply."
> "Players who will never adjust the model … Someone who downloads the default output every week and
> never edits a projection … are using a **$149.95 tool as a $20 projection sheet**."
> "**Pick'em players**" (PrizePicks and similar) — out of scope.
> — https://www.stokastic.com/articles/nfl-dfs/stokastic-review

And the scope limit:
> "The Sims are a contest-and-lineup engine, **not an advanced-stats research tool**. You will not
> find route participation or EPA tables inside the product."
> — same URL

And the effort tax:
> "This is a tournament tool that **pays off in proportion to how much work you put into it**."
> — same URL

**Read as a complaint list, this is devastating and self-inflicted:** by their own account the product
only works for a high-volume, high-effort MME tournament player who edits projections weekly. Everyone
else is paying $150–$450/month for a spreadsheet.

### 4.2 Third-party criticisms

From https://www.v12dfs.com/best-dfs-optimizer (independent comparison page):
> "steep, confusingly tiered pricing that's often buried behind **coupon-gated signup pages**" —
> vendors "gate the real number behind a signup funnel."
Same page's positive: "its projections and ownership forecasts are widely regarded as best-in-class."

From https://linestar.gitbook.io/competitor-pages/stokastic-vs.-linestar-dfs-review (**competitor**):
no access to prior-day projections; "they do not offer much as far as matchup data"; "Stokastic does
*not* offer a native mobile app"; and a conflict-of-interest question about a founder who competes
against his own subscribers.

Aggregate rating, weak source: 4.0/5 from 1,630 users at https://stokastic.tenereteam.com/ — the page
lists three reviewer names/dates (Mar 2023) but **no review text was retrievable**, so we cannot quote
a single actual customer sentence from it. Recorded only for completeness; **do not cite this as evidence.**

### 4.3 On the OddsShopper (+EV) side

From https://oddsplays.com/reviews/oddsshopper/ :
> "There is only 1 subscription with all the tools"
> "bet scanner presents mostly **false arbitrage bets**"
> "Some sportsbooks covered a[re] not regulated in the US"
> "80-85% of bets are player props"
> "Could have more sportsbook coverage"
Pricing on that page: OddsShopper Premium "$29.95/week" or "$99.95/month"; free tier limited to
"arbitrage bets up to 3% ROI, the Live Odds display without Edge/True Odds/Outlier/Hold calculations."

**"Mostly false arbitrage bets" is the most actionable complaint in this file** — it is the classic
symptom of a screen that surfaces stale or unobtainable prices and does not verify that the edge
survived to bet time. It is exactly what a CLV-graded ledger would expose and price out.

### 4.4 The complaint nobody has voiced but the structure guarantees

Not a sourced user quote — an inference we flag as ours, not theirs: **a base-tier subscriber's
simulated field is 500 entries against a real field of 150,000+.** Stokastic's own milly-maker article
says the 10,000-field is what surfaces "lineups built to win big." So the cheapest tier ships an
answer the company's own content says is the wrong answer, and **the user has no way to detect that,
because no accuracy is published at any tier.**

---

## 5. THE SEAM — what GSE can do that Stokastic cannot or will not

Cross-reference: `_HANDOFF-to-coding-agent.md` line 18 (fire on calibrated edge `e = p − q`, never on
confidence), lines 55–60 (Glass Ledger), line 145 (incumbent conflict-of-interest inversion), and
`_propfinder-teardown-final.md` (PropFinder likewise publishes no calibration).

**Stokastic is the strongest engine we have torn down in this program, and it is still wide open on
exactly the axis GSE is built for.**

### 5.1 They cannot publish a track record without cannibalising their own pricing

Their entire ladder is priced on **capacity** (2,000 → 10,000 → 50,000 lineups; 500 → 10,000 field),
not on demonstrated accuracy. Publish a calibration curve and two things break at once: (a) the tier
ladder gets re-anchored to "does the cheap tier actually work," which their own content says it
doesn't, and (b) "most accurate" becomes a checkable claim in a category where every rival would then
be checked too. **Not a capability gap — an incentive lock.** They will not do it.

### 5.2 The projection archive is the wedge

No public archive of pre-lock projections ⇒ nothing is gradeable by anyone, including their own
subscribers. GSE's **publish-before-kickoff, hash-timestamped, independently re-computable record**
(`_HANDOFF` Phase 2) is the precise inverse. This is not a feature we would add to compete with them;
it is a category they have structurally opted out of.

### 5.3 They sell simulation *volume*; GSE sells *selection*

Stokastic's answer to "which bet" is "generate 10,000 candidates and rank by simulated ROI." That is
a **search** answer. GSE's doctrine is a **selection** answer: a conformal lower bound on calibrated
edge, fire only when `LCB(e) > τ_vig`, coverage published alongside. Stokastic has no analogue of a
coverage-vs-edge curve and no gate that says *don't play today*. A product that must justify a
$229.95 monthly seat cannot easily ship "the honest answer is there is nothing here this week."

### 5.4 Their props +EV has an undisclosed devig and no calibration — and that is checkable

They publish X-Win, X-ROI and hold, but **never name a devig method** and never show that X-Win is
calibrated. A model probability displayed as an "expected win percentage" without a reliability
diagram is an unbacked number. GSE's market-anchored p, receipt-carrying, with a published ECE and
per-stratum breakdown, is directly comparable and strictly more honest. **And the "mostly false
arbitrage bets" complaint (4.3) is the field evidence that unverified prices leak.**

### 5.5 CLV is entirely absent from their universe

Not once, on any page we read across Stokastic and OddsShopper, does closing-line value appear as a
graded metric. They measure themselves in contest wins (anecdotes) and in EV-at-bet-time (a model
output, not a realised result). **GSE grading on CLV vs close is a measurement Stokastic does not
even collect** — and per `_HANDOFF` line 68, distilling the devigged close is ~10× more sample-efficient
than grading Bernoulli outcomes, so GSE can prove something in 50 bets that they cannot prove in a season.

### 5.6 The abandoned segments are a real market, not a consolation prize

By their own list (4.1) they refuse: cash-game players, single-entry players, low-effort users, and
**pick'em (PrizePicks/Underdog) players entirely**. That last one is a very large, growing, mostly
unserved population — and it is a *pure probability* problem (is this over/under +EV at these terms),
which is exactly GSE's calibrated-edge engine, with none of the lineup-construction machinery
Stokastic's cost structure is built around.

### 5.7 Where we should NOT try to beat them

Be honest internally: **do not build a contest simulator.** Endogenous-field contest Monte Carlo with
ownership priced into the field is a genuinely good piece of engineering with years of tuning behind
it, and it solves a problem (DFS lineup construction) that is not GSE's problem. The seam is
*verification and selection*, not *search*.

### 5.8 One tactic worth stealing outright

Their **leverage primitive — "your exposure minus their projected field ownership"** — is a clean,
one-number way to express "am I on the popular side." GSE has an analogue it is not using: **our edge
`e = p − q` is the same shape**, model probability minus market-implied probability. Stokastic ships
that as a visible per-player column and it is the most-praised thing in their product. **GSE should
surface `e = p − q` as a first-class, always-visible column on the board**, not as an internal ranking
key. That is a UI lesson, not a modelling one, and it costs us nothing to take.

---

## 6. CONFIRMED / NOT CONFIRMED ledger

**CONFIRMED (URL in body):** two-stage sim (play-by-play → contest Monte Carlo); ownership folded into
the simulated field; leverage = exposure − field ownership; Sim ROI includes duplication; ceiling/floor
= 75th/25th percentile; Boom%/Bust% exist over a "modeled range"; contest archetypes Low/High/Marquee;
percent-to-first is user-set from the real payout; exposure-cap and ROI-boost worked numbers; lineup
caps 2,000 / 10,000 / 50,000-showdown; field pool 500 (base) vs 10,000 (Max); NFL Core/Max/MVP prices
from Stokastic's own article; eight sports; DK/FD; X-Win / X-ROI / hold definitions; the EV formula and
the +150→40% implied-probability step; "most accurate" meta claim; the "most subscribers lose" and
"illustrative, not a promise" disclaimers; Stokastic ≡ Awesemo ≡ parent of OddsShopper.

**NOT CONFIRMED:** exact simulation count (any product); the distribution family behind Boom/Bust; the
Boom%/Bust% thresholds; whether Boom/Bust shares the Contest Sim engine; **the entire ownership-projection
methodology** (inputs, cadence, per-site/per-contest variation, any accuracy measure); the devig method
used for fair odds; whether X-Win is calibrated; correlation handling across simultaneous prop bets;
which sportsbooks the Stokastic props tool covers; seat/export/API limits; the contents of /hall-of-fame;
what MVP adds over Max ("the Early Bird guide has the detail" — we did not read it); All-Access list
prices (affiliate-sourced only, and contradicted by two third-party "~$120/mo" figures); whether the
NFL price rose from $129.95 to $149.95 in 2026.

**DELIBERATELY NOT ATTEMPTED:** anything under `/api/`, `/account/`, `/admin/`, `/_next/` (robots
Disallow); any authenticated or paid surface; any endpoint enumeration. The pricing, props and
hall-of-fame pages are unread for this reason and their numbers here are third-party or from
Stokastic's own prose.
