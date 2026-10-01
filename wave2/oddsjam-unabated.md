# OddsJam & Unabated — the market-side teardown

**Slug:** `oddsjam-unabated` · **Captured:** 2026-09-08 · **Method:** public surfaces only
(marketing pages, public developer docs, Apple App Store listing, Wayback captures of
first-party pages, Trustpilot). No authentication, no paywall crossing, no endpoint
scanning. `oddsjam.com/robots.txt` disallows `/_next/static` — **their JS bundles were
not fetched**, unlike the PropFinder teardown. `unabated.com/robots.txt` has no
Disallow rules.

**Why these two:** they are the closest external analogue to GSE's `marketFairProb`
path. Both sell a no-vig fair price as the product. Establishing exactly how each
computes it — and what they refuse to publish — is the point.

---

## 0. The one-paragraph answer

**OddsJam is a proportional-devig shop with a method menu; Unabated is a proprietary
weighted-blend shop with no method disclosure at all.** OddsJam publishes, on its own
education page, the four devig methods it offers (multiplicative, additive, Shin,
power) and openly states Shin collapses to additive on two-way markets — which I
verified numerically and it is true. Its B2B arm, OpticOdds, documents that its
production devig is **multiplicative only**. Unabated's "Unabated Line" is a vig-free
consensus whose book weights are, in their own words, "our own Coca-Cola recipe:
it's proprietary." **Neither company publishes a calibration curve, a Brier score,
an ECE, or a settled track record of its own fair price.** Both sell CLV as the
metric you should judge yourself by; neither publishes its own. That gap is the seam.

---

## 1. How the product works, mechanically

### 1a. OddsJam — no-vig fair value

**This is first-party and verbatim.** From OddsJam's own education page, *Uncovering
True Outcome Probabilities* by Jeremy Letran
(read at Wayback capture `20260412192710` of
`https://oddsjam.com/betting-education/uncovering-true-outcome-probabilities`; the live
URL returns Cloudflare 403 to non-browser clients):

> "Let's explore four popular devigging methods:
>
> **1. Multiplicative Method** — This is the most widely used technique due to its
> simplicity. The vig is spread proportionally among outcomes, with higher implied
> probabilities (lower odds) receiving a larger share. However, this method fails to
> account for the well-documented tendency of bettors, even skilled ones, to overbet
> on long-shot outcomes and underbet on favorites.
>
> **2. Additive Method** — With this approach, the vig is divided equally among all
> outcomes. While it considers the long-shot bias, it can sometimes overcompensate,
> resulting in negative probabilities for underdogs.
>
> **3. Shin Method** — Utilizing an iterative algorithm, the Shin method aims to
> correct the favorite-longshot bias more effectively. It generally offers improved
> predictive accuracy, especially compared to the multiplicative method. **For markets
> with only two outcomes (all OddsJam bets are two outcomes), it is equivalent to the
> additive method.**
>
> **4. Power Method** — This technique extends the additive and multiplicative methods
> by raising the probabilities to a constant power. Its advantage is that it always
> maintains probabilities within the valid range of 0 to 1... However, it can
> overcompensate for betting biases, adjusting long-shot probabilities more than the
> Additive method while adjusting middle-range outcomes less.
>
> The optimal devigging method depends on the specific market circumstances and your
> historical success rates. It should align with your evolving expected value (EV)
> betting strategy."

**I verified their Shin claim rather than trusting it.** Implementing Shin (1993),
`p_i = [√(z² + 4(1−z)·π_i²/Π) − z] / (2(1−z))` with `z` solved so `Σp_i = 1`, and
comparing against additive (`π_i − (Π−1)/n`) across seven two-way American-odds pairs:

| US odds | multiplicative (fav) | additive (fav) | Shin (fav) | Shin − additive | fitted z |
|---|---|---|---|---|---|
| −110 / −110 | 0.500000 | 0.500000 | 0.500000 | +1.1e−16 | 0.0476 |
| −200 / +170 | 0.642857 | 0.648148 | 0.648148 | +1.1e−16 | 0.0372 |
| −500 / +380 | 0.800000 | 0.812500 | 0.812500 | +1.1e−16 | 0.0427 |
| −1200 / +800 | 0.892562 | 0.905983 | 0.905983 | −1.1e−16 | 0.0364 |
| −2000 / +1200 | 0.925267 | 0.937729 | 0.937729 | 0.0 | 0.0320 |
| +150 / −180 | 0.383562 | 0.378571 | 0.378571 | +5.6e−17 | 0.0430 |
| −105 / −115 | 0.489166 | 0.488656 | 0.488656 | 0.0 | 0.0471 |

**OddsJam's claim is correct** — agreement to float machine precision (~1e−16) across
the whole range including extreme longshots. I did not derive the algebraic identity;
this is an empirical check over seven cases, but the residual is exactly float noise,
not approximation error.

**The consequence they do not state:** their four-method menu is **three distinct
methods** on every market they price. If "all OddsJam bets are two outcomes" (their
words), then choosing "Shin" and choosing "Additive" produce identical fair
probabilities, always. A user paying $499/month who believes they are stress-testing
across four independent devig models is testing across three.

Also worth noting from the same table: the multiplicative/additive spread is **not
small where it matters.** At −1200/+800 the two methods differ by 1.34 percentage
points of win probability on the favorite. At −110/−110 they are identical. So the
method choice is a nothing-burger on balanced markets and a material choice on
lopsided ones — which is exactly where props and longshots live.

**NOT CONFIRMED on a first-party OddsJam surface:** the "Worst Case" method (take the
minimum implied probability across multiplicative/additive/power/Shin) and the
user-selectable "devig book / source of truth" setting (e.g. pin to Pinnacle). Both
are widely described by third parties (8rain Station's blog, a Oct-2024 post by
@TheArbFather on X showing "Devig Book = Pinnacle, Devig Method = Worst Case, 3%
Minimum EV") and are almost certainly real in-product, but I could not reach an
OddsJam-owned page stating them, because the help center
(`help.oddsjam.com`) returns 403 to non-browser clients. Treat as strongly indicated,
not established.

### 1b. OpticOdds — the same company's B2B disclosure, which is stricter

`developer.oddsjam.com` **301-redirects to `developer.opticodds.com`**. OpticOdds is
OddsJam's enterprise/data arm and its docs are fully public. From
`https://developer.opticodds.com/docs/configurations.md` (page `updatedAt`
2025-02-25), describing the Copilot pricing configuration:

> **Consensus Split** — "This section allows you to define the sportsbook weighting you
> want to include for the selected sport/leagues/markets. The weights need to add up to
> 100%... The `Minimum Providers` setting allows you to configure how many sportsbooks
> from your list need to be present for us to generate odds. **We recommend setting
> this to at least 2** to help prevent issues with stale lines or one sportsbook having
> incorrect data."
>
> **Add Vig** — "**Devig Odds** — This option devigs the underlying prices, averages the
> prices, and then adds the additional vig on top. **We are currently using the
> `multiplicative` method to devig the odds.** With the Multiplicative method, the
> vigorish is spread proportionally based on each outcome's implied probability from
> the initial odds. Higher probability outcomes (favorites) receive a larger allocation
> of the vig."

**Read that carefully.** The consumer product sells a menu of four methods as a feature.
The same company's production pricing engine, sold to sportsbook operators, uses
**multiplicative only** — the method their own consumer education page says "fails to
account for the well-documented tendency of bettors... to overbet on long-shot
outcomes." They ship to operators the method they publicly describe as the weakest.
That is not dishonest, but it is a tell about how much the method choice actually
buys, and it is quotable.

The devig **order of operations** is also explicit and matters: *devig each book →
average the devigged prices → re-add vig.* Devig-then-average, not average-then-devig.
This is the correct order and it is the one GSE should be able to state about itself.

Other OpticOdds specifics, first-party, from
`https://developer.opticodds.com/docs/trading-screen-faq.md` (`updatedAt` 2025-04-07):
> "The Odds Screen processes over 1 million odds per second" · "aggregates odds from
> over 100 global sportsbooks" · "custom weighted consensus lines" · Slack integration
> for trading alerts · historical odds available.

Documented endpoint families (from `developer.opticodds.com/llms.txt`, fetched
2026-09-08): Sports, Leagues, Sportsbooks, Markets, Squads, Fixtures, Odds, Results,
Futures, **Grader**, Injuries, Parlay, Stream, Copilot. There is a documented
**Settlement Rules** page and per-sport grading pages (baseball, football, hockey,
soccer, tennis, golf, motorsports, badminton, Aussie rules) — i.e. they treat grading
as a documented, published contract. GSE does not have a public equivalent.

### 1c. Is there a simulation engine at OddsJam? — **No, not one they disclose.**

I found **no first-party OddsJam or OpticOdds statement that a simulation engine runs
in production.** The closest artifact is an OpticOdds blog post, *Probability Paths:
Monte Carlo vs. Parametric Distributions in Player Prop Modeling*
(`https://opticodds.com/blog/probability-paths-in-player-prop-modeling`). It discusses
both approaches conceptually, recommends a "hybrid approach," and states **no sim
count, no correlation modeling, no distribution family, and no claim that OpticOdds
itself runs one.** Zero mentions of calibration, backtesting, or validation. It reads
as SEO/thought-leadership, not a technical disclosure.

**Mechanically, OddsJam is a market-relative machine, not a model.** Its fair
probability comes from other books' prices, devigged. Its edge `e = p_book_soft −
q_sharp_devigged` is a price-discrepancy detector. There is no independent estimate of
who wins. That is a coherent product — and it is a *completely different product from
GSE's factor model.* Anyone comparing them head-to-head is comparing a line-shopper to
a forecaster.

### 1d. Unabated — the Unabated Line

First-party, from *What Is The Unabated Line?* (`https://unabated.com/post/what-is-the-unabated-line`,
dated Jul 19th 2026):

> "The Unabated Line is a blend of market-making books, curated on a sport-by-sport
> basis. If one book is great at college football it might make up a large percentage
> of the CFB Unabated Line. If that same book is fair-to-middling at baseball, it
> carries less weight in the MLB Unabated Line.
>
> **The weights for each sport are our own Coca-Cola recipe: it's proprietary, known
> only to a few, and kept under lock and key in Atlanta.** (OK, maybe not that last
> part.)
>
> But broadly, our data science team examines **which books reach the closing line the
> fastest** in the respective sports. Those that quickly and accurately get to the
> closing number are given more consideration.
>
> The Unabated Line is also presented vig-free. By comparing a bet you see on the
> screen to the Unabated Line, you don't have to do any additional work. If your bet is
> a better number than the Unabated Line, you can be reasonably sure you have a plus-EV
> bet at this point in time."

And from the product page `https://unabated.com/tools/core/unabated-line`:

> "Our data science team calibrates the blend for each specific sport based on how
> quickly and accurately each source reaches the closing line."

**The devig method for the Unabated Line is never named.** Not on the product page, not
in the explainer article, not in the feature matrix. The word "calibrates" is used, but
in the sense of *tuning book weights*, not in the statistical sense of reliability. No
calibration curve exists on any public Unabated surface.

Their *public* No-Vig Fair Odds Calculator (`https://unabated.com/tools/calculators/no-vig-odds`)
describes only the elementary route, and hedges it as "one basic method":

> "Convert odds to decimal format... Find the implied probability for each side: 1 /
> Decimal Odds. Add the implied probabilities of all outcomes. Subtract 1 from that
> total to get the market overround. Calculate the vig percentage: (Overround / Sum of
> probabilities) * 100."

That is proportional normalization. Shin, power, and worst-case are **not mentioned
anywhere on Unabated's public surfaces.** So: OddsJam publishes a method menu and hides
the book weights; Unabated publishes neither. GSE, which names its method in a code
comment shipped to the UI, is already ahead of both on disclosure.

### 1e. Unabated — the simulation engine (this one is real and specified)

Unlike OddsJam, **Unabated genuinely ships simulators and publishes the trial count.**

**Props Simulator** (`https://unabated.com/tools/core/props-simulator`, and the
feature-matrix description on the pricing page):
> "The Unabated Standalone Props Simulator runs **10,000 Monte Carlo simulations**
> based on player performance projections and historical data. Our data science team
> models player outcomes across thousands of past games to create fair, accurate
> distributions of expected results. See where each projection lands on the curve, along
> with the fair price on main lines and alternate lines."
>
> "Switch to Summary mode to find fair-market prices for milestone props — like
> 100-yard rushing games, 300-yard passing games, or triple-doubles. Our simulator
> shows exactly how often those benchmarks occur across 10,000 trials."
>
> Feature-matrix wording: "**Enter your own player prop projections** and simulate that
> projected performance 10,000 times."

Sports supported: NFL, NBA, CFB, WNBA.

**Critical mechanical detail: the user supplies the projection.** The simulator turns
*your* mean into a distribution. Unabated is not claiming to forecast the player; it is
claiming to price the distribution around whatever mean you hand it. Correlation across
players/legs is **NOT CONFIRMED** — nothing public describes a correlated multi-leg
sim, joint distributions, or a contest-field/ownership simulation. There is a "DFS
Pick 'Em Entry Builder" but no published statement that entries are simulated jointly.

**Futures Simulators** (`https://unabated.com/tools/core/futures-simulator`), NFL and CFB:
> "Designed by pro bettor Rufus Peabody, the NFL Futures Simulator transforms your team
> power ratings — or preloaded Massey-Peabody ratings — into projected outcomes over
> **10,000 season simulations.**"
>
> "Choose from Basic, Advanced, or Unabated modes to model entire teams or adjust for
> offense, defense, and quarterback depth. Dial in home-field advantage and **simulate QB
> injury likelihood** to see how volatility changes your edge."
>
> "**The Only Simulator that Models Uncertainty** — Unlike any other football futures
> tool, the Unabated Simulator includes a **Ratings Update Function**... As each season
> progresses, **Risk, Uncertainty and Forecasting (RUF)** adjusts team variance and
> widens or tightens outcome distributions."
>
> CFB: "Our model **simulates the Selection Committee's decision process**, projecting
> which teams are most likely to make the College Football Playoff."

So the honest summary of Unabated's sim stack: **10,000 trials, per-team variance that
is user-tunable and season-adaptive, QB-injury as an explicit stochastic input, and a
committee-behavior model for CFP.** Distributions are over team/player outcomes. There
is **no contest-field simulation and no ownership simulation** disclosed — that is
PropFinder/DFS-optimizer territory, not Unabated's.

**Market-Based Player Projections** (feature-matrix, verbatim) is the other half and is
methodologically interesting:
> "We blend the median prop lines at various sportsbooks and then **reverse-engineer
> these numbers to the mean projection implied by the lines.** Blend these projections
> into your own numbers to regress your lines to the market, or use them to spot
> slow-moving books with off-market lines."

That is line → implied mean inversion. It is the same conceptual move as GSE's
`marketFairProb`, applied to props instead of moneylines.

---

## 2. What they sell, and exactly what is gated

### 2a. Unabated — the live tier table, verbatim

**Source of truth:** `https://tools.unabated.com/pricing` (301 from `unabated.com/pricing`)
serves its entire pricing configuration as inline JSON. Parsed 2026-09-08. Prices are
the dollar figures in their own `price` fields; annual prices are quoted by them as
per-month equivalents.

| | **Props+** | **Premium** | **Concierge** |
|---|---|---|---|
| Monthly | **$99** | **$199** | **$799** |
| Annual (per mo.) | **$83** | **$167** | **$667** |
| Positioning | "Get started with these tools" | "All Props+ features, plus:" | "All Premium features, plus:" |
| Guarantee | 14-day money-back (monthly) | 14-day money-back (monthly) | none listed |

Headline features as listed on each card, verbatim:

- **Props+** — Prop Odds Screen · Game Odds Screen with One Market Maker · Props
  Simulator · DFS Pick 'Em Entry Builder · Market-Based Player Projections
- **Premium** — **The Unabated Line** · Odds Screens w/ All Market Makers · Alternate
  Lines Calculator · NFL Futures Simulator · Livestreams with Captain Jack
- **Concierge** — Edge Rusher · Prop Rusher · All Add-Ons with Early Access · Alts on
  the Odds Screen · Private Concierge Discord Channels

**The full 25-row "Compare All Features" matrix**, verbatim from the same JSON
(`column-one` = Props+, `column-two` = Premium, `column-three` = Concierge):

| Feature | Props+ | Premium | Concierge |
|---|:--:|:--:|:--:|
| Prop Odds Screen | ✅ | ✅ | ✅ |
| Props Simulator | ✅ | ✅ | ✅ |
| Market-Based Player Projections | ✅ | ✅ | ✅ |
| DFS Pick 'Em Entry Builder | ✅ | ✅ | ✅ |
| Game Odds Screen (One Market Maker) | ✅ | ✅ | ✅ |
| Bet Builder | ✅ | ✅ | ✅ |
| Synthetic Hold Tool | ✅ | ✅ | ✅ |
| Basic Betting Calculators | ✅ | ✅ | ✅ |
| Massey-Peabody Ratings | ✅ | ✅ | ✅ |
| NFL Pick 'Em Pools Tool | ✅ | ✅ | ✅ |
| **The Unabated Line** | ❌ | ✅ | ✅ |
| **Game Odds Screen (All Market Makers)** | ❌ | ✅ | ✅ |
| Betting Edge Tool | ❌ | ✅ | ✅ |
| Alternate Line Calculator | ❌ | ✅ | ✅ |
| Partial Game Derivatives Calculator | ❌ | ✅ | ✅ |
| Teaser Calculator | ❌ | ✅ | ✅ |
| In-Game Betting Tools | ❌ | ✅ | ✅ |
| NFL Futures Simulator | ❌ | ✅ | ✅ |
| CFB Futures Simulator | ❌ | ✅ | ✅ |
| Unabated Tennis (+ Tennisform) | ❌ | ✅ | ✅ |
| Private Discord channels | ❌ | ✅ | ✅ |
| Premium Livestreams with Captain Jack | ❌ | ✅ | ✅ |
| Edge Rusher | ❌ | ❌ | ✅ |
| Prop Rusher | ❌ | ❌ | ✅ |
| Initial Projection Release | ❌ | ❌ | ✅ |

**THE PRODUCT BOUNDARY, stated plainly:** the fair price *is* the paywall. The Unabated
Line sits at Premium ($199/mo) and above. Props+ at $99 gets the odds screen with
**exactly one market maker** — their own description: "Access more than two dozen
sportsbooks, prediction markets, exchanges and DFS pick'em sites in real time,
including sharp signal from **Bookmaker**." Premium's row reads "Access all 30-plus...
including sharp market-making books like **Circa, Bookmaker and more**." So the $100/mo
step from Props+ to Premium buys (a) more market makers and (b) the blended vig-free
line built from them. **The limit that defines the product is number of market-making
books, not sims or exports or seats.** No lineup caps, no sim caps, no export caps, no
seat counts appear anywhere on the pricing surface.

**Concierge's real boundary is time, not features:** "Initial Projection Release —
Concierge members get a first look at all player prop projections we release. **Be the
first to market with the sharpest number available.**" $600/mo over Premium buys
latency priority on the same numbers. That is a candid statement that their edge decays
fast.

**Add-on packages** (same JSON, sold separately on top of a tier):

| Add-on | Price |
|---|---|
| WNBA Projections — monthly | $129 |
| WNBA Projections — seasonal (2026 incl. playoffs) | $499 |
| NBA Projections — monthly (incl. news + Discord) | $249 |
| NBA Projections — seasonal (2025-26 incl. playoffs) | $699 |
| NBA DFS (downloadable projections) — monthly | $69 |
| Tennisform — monthly | $55 |
| Tennisform — annual | $550 |
| NBA End-of-Season Special | $99 |

Note Tennisform is "included for Premium members, but available as a standalone
purchase for all other members" — so the sticker for a Props+ user who wants tennis is
$99 + $55 = $154/mo, i.e. the add-on ladder pushes you toward Premium.

A live promotional banner in the same payload: **"Football Early Bird Special — Get
Unabated Premium through the Super Bowl for just $799!"**

**Discrepancy, flagged honestly:** the pricing JSON records `trial-days: null` on every
plan and offers a 14-day *money-back guarantee* instead, but their CLV calculator page
carries a button reading "**Try Premium Free for 14 Days**." I could not reconcile these
from public surfaces. **NOT CONFIRMED** which is operative at checkout.

**Also NOT CONFIRMED / likely stale:** "Unabated Essentials at $67/mo month-to-month or
$49/mo annual" is described in an Unabated article (`unabated.com/articles/introducing-unabated-essentials`,
which now 404s) and repeated by review sites. **No Essentials tier exists on the live
pricing page.** Treat $67/$49 as a retired tier; the live floor is Props+ at $99.

**Enterprise:** `https://unabated.com/odds-api/enterprise` sells a REST + SSE feed and
states "Enterprise feeds also include the Unabated Line, a vig-free consensus line built
from a sport-specific blend of sharp market-making books," with "No artificial API call
limits." Price is quote-only ("Request Enterprise Access"). A third-party comparison
page claims Unabated enterprise starts "at a reported $3,000/mo" — **NOT CONFIRMED**,
no first-party price exists.

### 2b. OddsJam — the tier table

OddsJam's `/pricing` page is client-rendered and Cloudflare-gated, so the cleanest
verbatim price list is **Apple's App Store listing**, which publishers cannot fudge.
From `https://apps.apple.com/us/app/oddsjam-sharp-sports-betting/id6448072108`
(developer "OddsJam, Inc.", version 27.0.24, updated ~2026-09-05), In-App Purchases,
verbatim as Apple renders them:

| In-App Purchase | Price |
|---|---|
| Trends | **$19.99** |
| Fantasy Optimizer | **$59.99** |
| Fantasy Picks | **$79.00** |
| Gold | **$199.99** |
| Sharp Money | **$199.99** |
| Positive EV Global Monthly | **$399.99** |
| Positive EV Monthly | **$499.99** |
| Platinum Monthly | **$499.99** |

Cross-checked against a first-party subscribe page. From
`https://oddsjam.com/subscribe/positive-ev-global` (Wayback capture `20260612140521`):

> "Get the **Global Plan** now — **$499/month** [Monthly] · **$399.99/month** [Yearly]
> · Save 15%" · "Try 7 days free"
>
> "The POWERFUL tools included in this plan: **Positive EV · Arbitrage · Promo Optimizer
> Tools · Parlay Builder**"
>
> "Designed to profit in betting-restricted states like CA and TX." · "Bet on sports
> from around the globe with our comprehensive sportsbook coverage. With **hundreds of
> sportsbooks** analyzed for Positive EV bets, you'll be able to bet more and win more,
> even in a restricted area like CA."
>
> "**FREE 1-1 Coaching Sessions** — We want to ensure you make the most profits
> possible with our product, so we offer free 1-1 tutorials with our customer success
> team."

And from `https://oddsjam.com/betting-tools/positive-ev` (Wayback `20260809134625`):
> "OUR MOST POPULAR PRODUCT — POSITIVE EV. We give real-time recs, you make bets. It's
> that simple. **We scan millions of odds every second** to find the rare bets that
> actually have an edge." · "INCLUDED IN ALL PLANS: Positive EV · Arbitrage · Parlay
> Builder · Promo Converter" · "**Used by over 100,000 sports bettors**" · "Start your
> **7 day FREE trial**"

**THE PRODUCT BOUNDARY at OddsJam is which universe of sportsbooks you may see.** Not
sims, not exports, not lineups — **book coverage and geography.** Gold/Platinum are
domestic-book plans; "Positive EV Global" is the offshore/social/crypto-book plan
explicitly marketed at users in states where domestic books are unavailable or where
they've been limited. That is the same axis as Unabated's market-maker gate, arrived at
from the opposite end: Unabated gates *sharp* books, OddsJam gates *soft* books, because
Unabated sells you the fair price and OddsJam sells you the mispricing.

**NOT CONFIRMED (third-party only):** that Gold at $199.99 covers "+EV, Arbitrage,
Middles, Low Holds, and Promo Converter bets for 40+ Domestic Books" while Global at
$399.99 covers "all Social and Crypto Books around the world," and that Sharp Money is
a rename of a former Gold plan. These come from review sites (getarbitragebets.com,
xclsvmedia.com, oddsplays.com), not from an OddsJam page I could read. The prices are
confirmed; the per-tier feature splits are not.

**The full-stack cost is worse than the sticker.** A Trustpilot reviewer (Michael, May
5 2026, 1★) states: "the price point for the platinum subscription is outrageous. It is
$500 a month" and "everything else... DOES NOT come with the platinum subscription. So
you end up paying hundreds more." Given the eight separate IAP SKUs above, that is
consistent with the listing.

### 2c. Price comparison to GSE, stated fairly

| | Entry | Mid | Top |
|---|---|---|---|
| **GSE** | Free | Pro $14.99/mo · $99/yr | Elite $24.99/mo · $179/yr |
| **Unabated** | Props+ $99/mo | Premium $199/mo | Concierge $799/mo |
| **OddsJam** | Trends $19.99/mo | Gold / Sharp Money $199.99/mo | Platinum / Positive EV $499.99/mo |

GSE Pro is **13x cheaper than Unabated Premium** and **13x cheaper than OddsJam Gold**.
That is not a like-for-like win and should never be marketed as one: these are
professional bet-execution tools for people placing hundreds of wagers a week across
many books, and GSE is a forecasting and honesty product. The relevant read is
**GSE has enormous headroom on the market-side feature set before price becomes an
objection**, and the free-tier no-vig calculator is a top-of-funnel weapon against
products whose entry price for a fair line is $99–$199/mo.

---

## 3. Accuracy: what they claim vs. what they prove

**This is the finding that matters most for GSE, and it is unambiguous.**

### Unabated

**Claims** (all first-party, quoted above): "The sharpest vig-free consensus line
available anywhere." · "the ultimate source of truth." · "you can be reasonably sure
you have a plus-EV bet at this point in time." · "the sharpest college football model
in the game." · "the sharpest publicly available NFL power ratings."

**Proves:** nothing, publicly. There is **no calibration curve, no reliability diagram,
no Brier score, no ECE, no settled record, no ROI, no CLV ledger of the Unabated Line's
own performance** on any public Unabated page. The word "calibrates" appears once and
refers to tuning book weights, not to statistical calibration.

The irony is sharp and quotable. Unabated ships a **Closing Line Value Calculator** and
tells users (`https://unabated.com/tools/calculators/closing-line-value`):

> "Closing line value is one of the strongest predictors of long-term profitability."
> · "Consistently positive CLV is one of the strongest indicators of long-term betting
> success." · "**Should I use a vig-free closing line, or the sportsbook's closing
> line?** Using a vig-free closing line gives you a more accurate measure of your true
> edge."

**They tell you CLV against a vig-free close is the correct scoreboard, sell you the
vig-free close, and never publish their own score on it.** Their book-weight
methodology is explicitly "which books reach the closing line the fastest" — meaning
they already run, internally, exactly the measurement that would substantiate the
claim. They just don't show it.

The nearest thing to evidence is a *named-person* proxy: the models are attributed to
Rufus Peabody and Cade Massey, whose Massey-Peabody ratings have a public reputation.
That is credentialism, not a track record.

They also do the honest thing in at least one place worth crediting — the site footer
carries: "This site is strictly for educational and informational purposes only and
does not involve any real-money betting."

### OddsJam

**Claims:** "OddsJam finds mistakes in betting markets and shows you in real-time.
Basically, these are bets where the chances of winning are higher than they should be."
· "Real Results" (as a section heading) · "Used by over 100,000 sports bettors" ·
"Everything you need to get an unfair advantage."

**Proves:** the section literally headed **"Real Results"** on the Positive EV Global
subscribe page contains **no results**. Its full body text is:

> "By estimating a bet's probability to win and its payout, our algorithm can determine
> the 'expected value' or 'EV' of a bet. While you may not win every time, consistently
> placing +EV bets will lead to long-term profitability."

That is a definition of EV under a heading promising evidence. There is no n, no
denominator, no realized return, no interval. Under GSE's own display-only-substantiated-results
rule that block would not render.

The evidence they *do* point at is third-party bet-tracking via **Pikkit** (e.g.
`pikkit.com/blog/oddsjamalex`, showing OddsJam's Alex Monahan at a ~$205,000 profit
figure). This has a **structural verification hole** that critics have named precisely:
Pikkit does not sync every sportsbook, so on an arbitrage or +EV pair it is possible to
have the winning leg auto-synced and the losing leg absent, converting a thin two-sided
margin into a large one-sided "verified" profit. I did not verify that any specific
record was inflated this way — **NOT CONFIRMED as to any individual** — but the
mechanism is real and it means "verified on Pikkit" is not equivalent to an audited
record.

**And there is a disclosed conflict on every page.** OddsJam's own footer, on every
page I read: "**Affiliate Disclosure: OddsJam may receive advertising commissions for
visits or account creation to a sportsbook website.**" They also publish "Affiliates
T&C" and "Promotion T&C" links, and a "Promo Optimizer Suite" whose function is to
route users into sportsbook signup bonuses. So the entity recommending which book you
should bet at is compensated when you open an account at a book. That is legal and
disclosed. It is also **precisely the conflict GSE's no-affiliate rule exists to
eliminate**, and it is now documented with a URL.

### Scoreboard

| | Publishes a calibration curve | Publishes settled n | Publishes ROI/CLV of its own product | Independently recomputable | Affiliate conflict |
|---|:--:|:--:|:--:|:--:|:--:|
| OddsJam | ❌ | ❌ | ❌ (third-party Pikkit only) | ❌ | **Yes, disclosed** |
| Unabated | ❌ | ❌ | ❌ | ❌ (weights proprietary) | Not observed |
| **GSE** | ✅ (public `/calibration`) | ✅ | in progress | ✅ (proof receipts) | ❌ by policy |

---

## 4. What customers actually complain about

**OddsJam — Trustpilot `https://www.trustpilot.com/review/oddsjam.com`, TrustScore
2.7/5 across 94 reviews (read 2026-09-08).** Verbatim:

1. **Billed after cancelling** — Nick Anderson, 2026-08-25, 1★: "I cancelled my
   subscription... and was STILL billed for the month."
2. **Charged without subscribing** — Lush, 2026-06-02, 1★: "Never took their
   subscription. Woke up with a $354 charge on my account."
3. **Price / hidden ladder** — Michael, 2026-05-05, 1★: "embarrassingly overpriced...
   the price point for the platinum subscription is outrageous. It is $500 a month" and
   "everything else... DOES NOT come with the platinum subscription. So you end up
   paying hundreds more."
4. **Wrong lines, persisting for weeks** — Johnny Love, 2026-05-20, 2★: "OddsJam
   consistently displays inaccurate lines... **Misdisplays can endure for weeks.**"
5. **The strategy destroys the account** — Lucas Coutts, 2026-04-01, 1★: "you get
   limited almost instantly when betting real money... banned on every sports book."
6. **No real support** — Kelli Kelly, 2026-06-06, 1★: "got a one-line response in the
   chat and no help. There is no phone support."

**(4) is the one to internalise.** A market-data product whose entire value is price
accuracy, shipping visibly wrong lines that persist for weeks, is a data-integrity
failure of exactly the class GSE is currently living through with
`docs/ops/SCORE_INTEGRITY_2026-09-08.md`. The difference is not that GSE is immune —
it demonstrably is not — it is that GSE has a committed read-only verifier
(`npm run ops:verify-scores`) that reports an UNCOMPARABLE count beside its mismatches.
Neither competitor publishes any data-integrity measurement at all. **Shipping the
verifier's output publicly is a differentiator nobody in this category can match
without admitting they've never measured it.**

**(1), (2) and (6) are billing/ops complaints, and they are cheap to beat.** GSE already
runs one-click cancel (FTC ROSCA compliance) and durable `CheckoutAttempt` with Stripe
idempotency keys. That is a live, provable advantage over the category leader's 2.7-star
billing reputation.

**Unabated:** I could **not** find a substantial body of user complaints. No Trustpilot
page for unabated.com surfaced. The only recurring criticism in review coverage is
**price** — "$199/month is a real number, even for serious bettors" — alongside broadly
positive sharp-community sentiment. This asymmetry is itself informative: Unabated sells
to a smaller, more expert audience and appears to keep them happy; OddsJam sells volume
to a mass audience with a 7-day trial and a coaching upsell, and eats the churn. **NOT
CONFIRMED:** Unabated's churn, refund rate, or subscriber count.

---

## 5. THE SEAM — what GSE can do that they cannot or will not

Five of these are things they *will not* do (business-model conflicts), which is far
more durable than things they *cannot* do.

**S1 — Publish the devig method AND its sensitivity band. They will not.**
Unabated cannot name its method without exposing that the "Coca-Cola recipe" is a
weighted average plus a normalization. OddsJam offers four methods but never tells you
which one was used to generate the +EV number it recommended, nor how much the answer
moves across methods. GSE can ship, next to every fair price, a one-line method
statement (`proportional de-vig, mean-implied across N books`) **plus the delta to Shin
and to power** — the honest statement that at −110/−110 the methods agree exactly and at
−1200/+800 they disagree by 1.3 points. Nobody in this category shows a user how much
their own number depends on an arbitrary modeling choice. It costs us almost nothing:
`shinDevig` already exists in `packages/prediction-engine/src/edge-lab/devig.ts`.

**S2 — Calibrate the market fair price itself. Nobody does this, anywhere.**
Every product here treats the devigged sharp price as *ground truth* — an unquestioned
`q`. Nobody publishes a reliability curve of "when the no-vig market said 62%, how often
did it happen?" GSE already computes exactly this (`marketFairProb` is committed into an
immutable proof receipt at publish time and scored in
`apps/web/lib/ops/compute-live-calibration-metrics.ts`; production reads at 2026-09-08
11:38 UTC were n 475, ECE 0.0466, Brier 0.1898). **Publishing the calibration of the
market's own price is a genuinely novel public artifact**, it is defensible even while
GSE's own model calibration is contested, and it makes Unabated's "ultimate source of
truth" claim testable by a third party for the first time.

**S3 — Publish the book-weight recipe. Unabated has explicitly refused, in writing.**
"Our own Coca-Cola recipe: it's proprietary" is a quotable commitment they cannot walk
back. The anti-position — publish which books are in the consensus, at what weight, and
the closing-line-speed evidence that justifies each weight — is available to GSE
essentially for free, since our free-first spine has few enough sources to enumerate.
Note the constraint honestly: as of 2026-09-08 the two-book requirement is not reliably
met (`MIN_BOOKMAKERS = 2`, TheRundown 429-limited, WP-27 pending), so this ships as
*"here is the recipe, and here is when we had only one book and therefore published no
market probability"* — which is a stronger artifact than a fuller board with a hidden
recipe.

**S4 — No affiliate. Structurally unavailable to OddsJam.**
OddsJam carries an affiliate disclosure and a Promo Optimizer product on every page.
Their revenue is partly a function of users opening sportsbook accounts, and they
recommend which sportsbook to bet at. That conflict is disclosed and legal, and it is
also unfixable without dismantling a revenue line. GSE's no-affiliate rule is a
permanent, verifiable differentiator against the category's largest player. **It should
be stated as a policy on a public page with the comparison made explicit but neutral**
(cite their disclosure; do not characterise their intent).

**S5 — A published grading contract, and a published data-integrity measurement.**
OpticOdds publishes `Settlement Rules` with per-sport grading pages — that is the one
place they are *ahead* of GSE, and it is worth copying. Neither publishes a
data-integrity audit. GSE already has `ops:verify-scores` reporting mismatches
*and* an UNCOMPARABLE count. Shipping both — "here is how we grade" and "here is how
often we found our own stored finals wrong, including the rows we couldn't check" — is
a combination no competitor offers and none would volunteer.

**S6 — Free no-vig fair-odds calculator with the method shown.**
Unabated gates its fair line at $199/mo and its free calculator explains only the
elementary method. OddsJam's calculator is free but its education page is the only place
the method menu is described. GSE's `apps/web/lib/tools/betting-math.ts` already ships
`noVigFairProbabilities` with an explicit user-facing disclosure string. Making it a
public, indexable tool that shows proportional **and** Shin **and** the delta, with the
"Shin ≡ additive on two-way markets" fact stated and demonstrated, is high-value SEO
against two of the highest-intent keyword sets in the category.

**Where GSE is genuinely behind, stated plainly:** book coverage (they read 100–150+
books; we have ESPN inline plus a rate-limited fallback), latency (OpticOdds "1 million
odds per second"; we run 15-minute cron cycles), and simulation (Unabated ships a
disclosed 10,000-trial Monte Carlo for props and futures; GSE has no comparable
user-facing simulator). **Do not compete on any of those three.** Compete on the three
things all this money has bought them and none of it has produced: a published method,
a published calibration, and a published record.

---

## 6. Cross-references

- `_HANDOFF-to-coding-agent.md` §1 — "fire on edge `e = p − q`, never on confidence."
  Both targets are pure `q`-machines: they compute the market's `q` extremely well and
  have no `p` at all. **GSE's `p` is the asset; their `q` is the commodity.** The trap
  the handoff warns about (scores24 firing on confidence) has an inverse trap here:
  firing purely on `q`-discrepancy, which is what gets accounts limited — see Trustpilot
  complaint (5), where the user's stated outcome of following OddsJam's +EV recs was
  being "banned on every sports book" within days.
- `_propfinder-teardown-final.md` — PropFinder likewise publishes no calibration. Three
  independent teardowns, three products selling probability, zero published calibration
  curves. **This is now a documented category-wide vacancy, not a hunch.**
- `_competitor-mistakes-lessons.md` — add OddsJam's "Real Results" heading over a block
  containing no results as a canonical example of substantiation-by-omission.

## 7. Explicit NOT CONFIRMED list

- OddsJam's "Worst Case" devig method and selectable devig book, on a first-party page.
- OddsJam's per-tier feature splits (Gold vs Platinum vs Sharp Money vs Global).
- Whether OddsJam runs any simulation engine in production.
- Unabated's devig method for the Unabated Line (never published).
- Whether Unabated's props simulator models cross-player correlation or contest field.
- Unabated free-trial vs money-back-guarantee at checkout (surfaces conflict).
- Unabated "Essentials" $67/$49 — announced, absent from the live pricing page.
- Unabated enterprise API pricing (quote-only; "$3,000/mo" is third-party).
- Whether any specific Pikkit-verified OddsJam profit figure is inflated by one-sided
  arb reporting. The mechanism is real; no individual case was verified.
- OddsJam's `/_next/static` bundles were NOT read (robots.txt Disallow), so no
  client-side formula reconstruction was attempted, unlike the PropFinder teardown.
