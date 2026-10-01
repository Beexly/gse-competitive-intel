# Props & Research Tools — The Rest of the Field

**Slug:** `props-tools-rest`
**Captured:** 2026-09-08
**Method:** WebSearch + WebFetch on public marketing pages, public help centers, App Store
listings and third-party reviews. No authentication, no paywall crossing, no endpoint scanning,
no robots-Disallowed paths. Firecrawl MCP was disconnected for this session.
**Honesty rule applied:** every claim below carries the URL it was read on. Anything I could not
read on a primary surface is marked **NOT CONFIRMED**. Where a primary page was a JS shell that
returned no text to WebFetch, that is stated and the secondary source is labelled as secondary.

**Cross-references into the existing repo (read for method, not re-done here):**
`_propfinder-teardown-final.md` (PF Rating reconstructed from public JS; 354-field stat
dictionary; no calibration published), `_competitor-mistakes-lessons.md`,
`_HANDOFF-to-coding-agent.md` (doctrine: fire on edge `e = p − q`, never on confidence),
`_gse-edge-lab-final.md`, `wave2/oddsjam-unabated.md`, `wave2/prizepicks-underdog.md`,
`wave2/sabersim.md`, `wave2/stokastic.md`.

**Already covered elsewhere in this repo — deliberately NOT re-done here:** BettingPros
(`bp-premium.md`, `bp-market-ev.md`, `bp-prop-record.md`, `bp-nfl-record.md`, `bp-nba-record.md`,
`bp-star-ratings.md`, `bp-cover-vs-ev.md`, `bp-chrome-ext.md`) and Action Network's site surface
(`actionnetwork-home.md`, `actionnetwork-sharp-report.md`, `an-test.md`, `an-robots.txt`). Both
get short profiles below with only the *new* facts plus the gaps the existing files leave open.

---

## 0. The survey, and why I went deep where I did

Seven targets were named. Ranked by how directly each one attacks GSE's actual positioning —
*"We're not AI. We're math you can read,"* backed by a published calibration record:

| Target | Category | Has a model? | Publishes evidence? | Threat to GSE positioning |
|---|---|---|---|---|
| **Dimers** | Model + free predictions + Pro sub | Yes — sims | **Yes, loudly** | **HIGHEST — deep dive §1** |
| **Outlier.bet** | Market scanner + prop research | **No** | No | **HIGH — deep dive §2** |
| Props.Cash | Prop research (historical splits) | No | No | Medium (§3) |
| Rithmm | User-built no-code models | User-built | No public ledger | Medium (§4) |
| BettingPros | Picks + EV tools + records | Yes | Partial (records) | Medium (§5, already covered) |
| Action Network PRO | Data + sharp signals + systems | Projections | No | Low-medium (§6) |
| Sleeper Picks | DFS pick'em **operator** | Sets the lines | N/A | Different category (§7) |

**Dimers is the deep dive because it is the only competitor found in this wave that publishes
falsifiable-looking numbers, cites a third-party tracker, and runs a simulation engine.** That is
the closest anyone in this field comes to GSE's intended claim, and the gap between what Dimers
*claims* and what Dimers *proves* is exactly where GSE's product lives.

**Outlier is the second deep dive because it is the fastest-growing prop tool in the field
(16,000 App Store ratings at 4.9) and it has no model at all.** Understanding that its "true
probability" is a de-vigged sharp book, not a forecast, tells GSE precisely which half of the
market is unserved.

---

# 1. DIMERS — deep dive

`https://www.dimers.com/` · a Cipher Sports Technology Group brand
(source: https://www.dimers.com/our-data)

## 1.1 How it works, mechanically

**Simulation count, verbatim:**

> "perform over 10,000 event simulations to predict the most likely outcomes, analyzing each
> matchup based on rosters, form, previous matchups, and even weather to offer you an unrivaled
> advantage."
> — https://www.dimers.com/sports-betting-101/how-to-use-dimers/welcome-to-dimers

**A second, more specific statement of the same engine:**

> "Over 10,000 simulations using real-time player projections, weather inputs, matchup metrics,
> and live odds data"
> — https://www.dimers.com/news/why-dimers-proven-ai-sports-predictions-engine-is-primed-to-dominate-nfl-and-college-football-betting-in-2026

**Soccer/World Cup variant, verbatim:**

> the model "simulates every single match using team performance data, expected goals, opponent
> strength, projected lineups"
> — https://www.dimers.com/world-cup/news/world-cup-betting-dimers-predictions-return-positive-roi

**Their own methodology page** (https://www.dimers.com/our-data):

- Data: "a wide range of sources, including historical, pregame, and in-play team and player-level
  statistics"; some collected internally; footer attribution "some data provided by" **SportRadar**.
- Method: "statistical analytical techniques" then "advanced **artificial intelligence, machine
  learning and simulation modeling** approaches."
- Inputs: "thousands of data points" including "player and team performance, weather conditions,
  starting lineups, home vs. away performance, projected minutes, and more."
- Betting application: they "compare the probabilities associated with our predictions to the odds
  listed by various bookmakers" — **i.e. the same edge rule as GSE's doctrine, `e = p − q`.**
- "our data is proprietary."

**What they do NOT publish about the sim — every one of these is NOT CONFIRMED:**

- Whether the simulation is player-level (drawing from per-player stat distributions) or
  team-level (drawing a scoreline). The NFL/CFB language says "real-time player projections" go
  *in*; it does not say players are simulated.
- **Correlation structure.** Nothing found on whether QB passing yards and WR receiving yards are
  jointly simulated. This is the single most important unpublished fact for anyone selling props
  or parlays, and they sell a "Parlay Picker"
  (https://www.dimers.com/subscription/how-to-use-dimers-pro).
- **Monte Carlo standard error.** 10,000 draws gives roughly ±0.5pp standard error on a 50%
  moneyline, but ±0.2pp on a 1% tail — and they publish win probabilities to one decimal place
  (e.g. "Jaguars 77.7%" on https://www.dimers.com/nfl/predictions) without any interval. A
  one-decimal probability from 10k sims is quoting more precision than the method carries.
- Whether the same engine runs all 16+ sports or whether it is a family of per-sport models.
- Any versioning of the model. No equivalent of `MODEL_VERSION`. Claims are pooled across
  seasons with no statement that the engine was constant across them.

**Free public surface** (https://www.dimers.com/nfl/predictions, read anonymously): every Week 1
matchup with team logos, a moneyline **win probability percentage**, current DraftKings spread,
and kickoff time, plus a link to "See Game Predictions" for the full breakdown. Upsell banner:
"Get 6 months of Dimers Pro for just $99.99." Their model page also says predictions use "more
than 100 data points" — note this conflicts in magnitude with "thousands of data points" on
`/our-data`; I read both, I cannot reconcile them, both are quoted here as read.

## 1.2 What they sell, and the tier table

**Primary source — https://www.dimers.com/subscription (read 2026-09-08):**

| Plan | Price | Effective | Note |
|---|---|---|---|
| Monthly | "$29.99 billed monthly" | $29.99/mo | renews monthly |
| **6 Months** (Recommended) | "$99.99" early bird, regular "$149.99" | "$16.67 per month" | "Save $79.95 · 44%" |
| **Annual** (Best Value) | "$149.99" first year, regular "$199.99" | "$12.50 per month" | "Save $209.89 · 58%" |

Feature list is **identical across all three tiers** — verbatim: "Full site access," "iOS &
Android app," "AI bet assistant," "Unlimited picks & predictions," "Unlimited best bets & props,"
"Unlimited player projections," "Private Discord community," "Cancel or pause anytime."
Coverage: "16+ sports" including NFL, NBA, MLB, NHL, college football/basketball, soccer leagues,
tennis, golf.

**A second primary source gives a different ladder** —
https://www.dimers.com/subscription/how-to-use-dimers-pro lists "$14.99/week, $29.99/month, or
$199.99/year". And the **Apple App Store listing** (https://apps.apple.com/app/id6754231679) lists
in-app purchases at: Dimers Pro Weekly **$9.99 and $14.99**; Monthly **$24.99 and $29.99**;
6 Months **$149.99**; Annual **$199.99**. Rating 4.5 from 151 ratings.

**Read that carefully: the web page sells the annual at $149.99 and the iOS IAP sells it at
$199.99. Dimers runs at least four simultaneous price points per period.** The "regular" prices on
the subscription page are the App Store prices; the web prices are permanently discounted "early
bird." That is a promotional-anchor pricing model, not a ladder.

**They also run a near-permanent promo mill** — separate landing pages found for
`/subscription/promotion/pick6` ("12 Months for the Price of 6"), `/subscription/promo-code`,
Black Friday, Cyber Monday ("3 Months for the Price of 1") and a March promo ("1 Month for the
Price of 1 Week"). See https://www.dimers.com/subscription/promo-code.

### THE PRODUCT LIMIT — the thing the whole business rests on

**The free tier limits how many Best Bets you can see per day; Pro removes the cap.** Secondary
source, stated plainly: https://picksandparlays.net/reviews/ai-picks/dimers — free tier is "Basic
predictions + limited tools + limited Best Bets." **The exact number of free Best Bets per day is
NOT CONFIRMED** — I could not find it stated on any Dimers-owned page I read, and I did not
authenticate to count it.

Secondary source also names a **"Platinum" tier at $349/yr — "CFB first quarter spreads only
(separate product)"** (same picksandparlays URL). **NOT CONFIRMED on a Dimers-owned page.** I did
not find Platinum on `/subscription`.

The other hard boundary: **the mobile app is Pro-only.** Free users get the mobile website only
(secondary: same review; consistent with `/subscription` listing "iOS & Android app" as a paid
feature). Trial: "3-day free trial" on app download (secondary), "$0 for 3 days" (secondary).

## 1.3 Accuracy: what they CLAIM vs what they PROVE

This is the important section. Dimers claims more, in public, with more numbers, than anyone else
in this wave. **Every number below is a strike rate, a rank, or a units figure. Not one is a
calibration metric.**

**Claimed, verbatim from
https://www.dimers.com/news/why-dimers-proven-ai-sports-predictions-engine-is-primed-to-dominate-nfl-and-college-football-betting-in-2026:**

- **CFB:** "74.9% strike rate" on moneylines over four seasons, "average rank of 5th overall";
  spreads Top 5 three consecutive seasons, 2nd in 2023 & 2024, 4th in 2025; totals #1 in 2024.
- **NFL:** "71.6% strike rate" on moneylines in 2024, "+47 units of profit"; "66.5% average
  moneyline strike rate" over four seasons; "52.7% strike rate" on spreads in 2025 against
  closing lines; average 9th on totals over three seasons.
- **MLB:** #1 totals (2026); Top 10 five consecutive seasons; #2 run lines "58.3% strike rate";
  Top 5 moneylines "57.1% strike rate".
- **NBA:** #1 totals 2025-26 with "+23.32 units"; moneyline "67.4% strike rate".
- **NHL:** #1 puck lines three consecutive seasons; 2025-26 "+89.1 units" with "62.6% strike
  rate"; moneyline "59.3% strike rate".
- **CBB:** "70.4% strike rate" moneylines, Top 10 each of five seasons; Top 3 totals four seasons.

**Third-party citation:** they claim they are "certified at the top of Pickwatch's leaderboards,
providing independent proof." Pickwatch is real and independent — https://nflpickwatch.com/home —
and it does track "the most accurate Money Line, ATS, Total, Underdog & Prop picks" across
experts. A Dimers profile page exists at https://nflpickwatch.com/profile/nfl/dimers; when I
fetched it the scaffolding rendered (Record / Ranking / Profit, 5/10/15-week, season, lifetime
views) but **no numeric values were in the returned content**, so I cannot corroborate the ranks
from the tracker itself. **The Pickwatch ranks are NOT CONFIRMED by me** — only that the tracker
and the profile exist.

**The one ROI claim with a stated method** —
https://www.dimers.com/world-cup/news/world-cup-betting-dimers-predictions-return-positive-roi:

> "a flat stake of $100 on every single pre-match bet with at least a 2.5% edge would have
> returned $1,748 for a total ROI of 14.2%."

- Sample: **114 bets** across three markets — moneyline 35, Total Goals O/U 48, Both Teams to
  Score 31. Edge threshold **2.5%**. Flat $100 stakes.
- Explicitly excluded because they lost: "Win to Nil" and "Double Chance" "returned negative
  results."
- Futures: 38 pre-tournament bets, **18 wins / 20 losses**, $3,800 staked, +$777.10, "20.5% ROI."

### What is actually proven — the honest read

**Nothing in that list is evidence that their probabilities are correct.**

1. **A strike rate is not calibration.** "74.9% moneyline strike rate" over four CFB seasons is
   what you get by picking favorites. CFB has enormous favorites; a model that always takes the
   chalk clears 74% and loses money. The number cannot be interpreted without the average price,
   and the average price is never given. The one place they *do* give a price-adjusted figure —
   NFL spreads 2025 — it reads **"52.7% ... against closing lines,"** which at −110 is roughly
   break-even. **The most honest number in the whole post is the least flattering one.**
2. **"Units of profit" with no stake definition.** "+47 units," "+89.1 units," "+23.32 units" —
   no unit size, no bankroll, no bet count, no drawdown, no variance. A units total without a
   denominator cannot be turned into ROI and cannot be checked.
3. **No sample sizes on any strike rate.** Not one of the percentages above carries an `n`. A
   67.4% NBA moneyline strike rate could be 1,200 picks or 60.
4. **No confidence intervals anywhere.** On any claim.
5. **No calibration metric of any kind.** No ECE, no Brier score, no reliability curve, no
   log-loss, no bin table. They publish probabilities to one decimal place and never once show
   whether events at 77.7% happen 77.7% of the time.
6. **No CLV.** They compare their p to book odds to *generate* the bet, and then never report
   whether the bet beat the closing line. This is the metric their own method most obviously
   implies and they do not publish it.
7. **The ROI claim is a retrospective single-tournament window,** self-computed, self-reported,
   after two of five markets were dropped for losing. That is post-hoc market selection. It may
   well be honest — but nothing about it is pre-registered, and nobody outside can recompute it.
8. **No per-model-version breakdown.** Four seasons of claims with no statement that the engine
   was unchanged.
9. **No public per-pick ledger a non-subscriber can filter.** The evidence is marketing posts.

**And the framing is explicitly AI:** "advanced artificial intelligence, machine learning"
(`/our-data`), "AI bet assistant" (`/subscription`), "AI-powered picks" and an assistant called
"Dimebot" (App Store listing), and the headline "proven **AI** sports predictions engine."

## 1.4 What customers say

Thin, and I will not overstate it. **Trustpilot has zero reviews for dimers.com**
(https://www.trustpilot.com/review/dimers.com — "This company hasn't received any reviews yet").
Reddit is not fetchable from this session (`Claude Code is unable to fetch from www.reddit.com`)
and search returned no r/sportsbook threads, so **Reddit sentiment is NOT CONFIRMED.**

From the App Store listing (https://apps.apple.com/app/id6754231679, 4.5 / 151 ratings), the one
substantive complaint: a user wanted "a way to get to the individual game predictions like the
website" and reported "constant toggling between app and website." Corroborated by
https://picksandparlays.net/reviews/ai-picks/dimers, which names the app↔website toggle as the
main criticism and notes the developer says fixes are in development.

**The structural complaint nobody has voiced yet, but which is latent:** free users get a win
probability on every game and a hard daily cap on Best Bets, so the free tier teaches you the
model exists but never lets you check it. There is no page on the site where a free user can see
how yesterday's picks settled.

## 1.5 THE SEAM against Dimers

Dimers has already validated GSE's core doctrine — they fire on `e = p − q` with a published 2.5%
threshold. GSE does not need to argue about the method. **GSE's entire opening is that Dimers
cannot show its probabilities are calibrated, and structurally will not, because doing so would
retire the 74.9% headline.**

Six things GSE can do that Dimers cannot or will not:

1. **Publish ECE / Brier / reliability by bin, with `n`, per model version.** Dimers publishes
   strike rate. GSE already computes ECE, Brier and Murphy reliability with sample counts and a
   pre-registered floor. Nobody in this wave publishes a single calibration number.
2. **Publish CLV per pick.** Dimers' method is market-anchored by construction and they never
   report whether their flagged edges beat the close. GSE has `clv.ts`, `clv-capture.ts`,
   `clv-decomposition.ts` already.
3. **Kill the strike-rate number in public, with arithmetic.** A one-page explainer — "why a 74.9%
   win rate is not evidence" — showing that a favorites-only baseline clears it. GSE can name the
   competitor's own most honest number (52.7% ATS vs closing) as the tell.
4. **Closed-form beats 10,000 sims, and GSE can say so truthfully.** GSE's engine computes
   distributions analytically (`poisson.ts`, `skellam.ts`, `dixon-coles.ts`,
   `player-rate-posteriors.ts`, `tweedie-baseline.ts`) rather than sampling them. A 10,000-draw
   Monte Carlo carries sampling error that a Skellam evaluation does not. **This is the single
   best "math you can read" talking point available and it is factually defensible:** "they
   estimate the distribution 10,000 times; we compute it once, exactly." It also converts GSE's
   *lack* of a simulation engine from a gap into a position.
5. **Pre-register the edge threshold and publish results at every threshold.** Dimers picked 2.5%
   and reported one window. GSE can publish the whole threshold curve, including the thresholds
   where it loses.
6. **One price, no promo mill.** Dimers runs four simultaneous price points and a rotating
   discount calendar. GSE's named, proof-gated ladder with lifetime grandfathering is the
   opposite trust signal, and it can be stated as such.

**One honest caution for internal use:** GSE cannot currently publish a calibration claim either.
Per `AGENTS.md` (2026-09-08), 25 of 169 FINAL `games` rows hold scores ESPN contradicts and 54
settled published picks sit on them; eligibility is RED. **The seam above is real but it is not
yet shippable copy.** Fix the settled record first, then this section becomes marketing.

---

# 2. OUTLIER.BET — deep dive

`https://outlier.bet/` · iOS app `id6443885102` · corporate entity appears as "Colorcast"
(https://www.cbinsights.com/company/colorcast — secondary)

## 2.1 How it works, mechanically — the headline finding

**Outlier has no predictive model and no simulation engine. None. Their "true probability" is a
de-vigged sharp sportsbook price.**

Verbatim from their own glossary
(https://help.outlier.bet/en/articles/8454320-outlier-pro-glossary-of-terms):

> **Devig Odds:** "The odds the bettor decides to use as the to determine the fair value of a
> betting opportunity. They are usually sourced from a 'sharp' book like Pinnacle, BetOnline,
> Circa, etc."

> **Fair Value Odds:** "The bettor's chances of winning if the sportsbook didn't add vig."

> "To calculate the expected value of a bookmaker's price for a specific outcome, bettors must
> first determine the probability of that outcome occurring. In order to reach an accurate set of
> probabilities, sportsbooks' vig must be removed."

The glossary states there are "four popular methods for devigging" — **and does not say which one
Outlier uses.** That is an unpublished, load-bearing modelling choice (multiplicative vs additive
vs power vs Shin give materially different tail probabilities), and it is the single largest
methodological hole in the product.

**Books available as the de-vig baseline**
(https://help.outlier.bet/en/articles/10223052-how-to-use-outlier-pro): "Pinnacle, BetUS,
BetOnline, SuperBook, MyBookie, Caesars, DraftKings, BetMGM, and FanDuel."

**Pro's four tools, verbatim from the same page:** "Positive EV Betting" ("statistical edge over
the sportsbooks"), "Arbitrage Betting" ("Guaranteed Profits"), "Middle Betting", and "Boosts"
("help article coming soon").

**Corroborating the absence of a model:** their help centre has six collections — "Getting Started
with Outlier" (17 articles), "Betting with Outlier" (33), "New Feature Releases" (10), "Managing
Your Outlier Subscription" (2), "Outlier Pro" (20) — and **not one is about projections,
simulations, or a model** (https://help.outlier.bet/en/). A third-party review states it flatly:
"Outlier is a research and analytics platform — it does not generate AI picks"
(https://picksandparlays.net/reviews/ai-picks/outlier-bet — secondary).

**So what IS the product?** Two halves:
- **Research half (Premium):** player and team historical splits, hit rates, streaks vs season
  averages, injury reports and matchup data, "Trending Insights," "Deep contextual data tied to
  player and team performance," "Easy to understand visualizations," "Custom Filters and Real-Time
  Notifications," and "Easy, two-click bet placing on your favorite sportsbooks"
  (https://help.outlier.bet/en/articles/12159312-premium-launch-announcement).
- **Market half (Pro):** scan every book against the de-vigged sharp line, surface +EV, arbs,
  middles and boosts.

**This is a line-shopping and price-discrepancy business wearing a props-research coat.** It
cannot, by construction, beat the market — it can only find the books that lag Pinnacle.

## 2.2 Tier table — verbatim, and the boundary

**Primary source, Apple App Store in-app purchases**
(https://apps.apple.com/us/app/outlier-betting-data-tools/id6443885102), rating **4.9 from 16,000
ratings**:

| Tier | Monthly | Yearly |
|---|---|---|
| Premium | **$19.99** | **$199.99** |
| Premium+ | **$29.99** | **$299.99** |
| Pro | **$79.99** | **$359.99** |

Note the annual Pro at $359.99 against a monthly Pro at $79.99 — a 62% annual discount, by far the
steepest in the field. `outlier.bet/pricing` returns **HTTP 404**; there is no public web pricing
page I could reach.

**What is gated where — verbatim from
https://help.outlier.bet/en/articles/12159312-premium-launch-announcement:**

- **Premium** — "Trending Insights"; "Deep contextual data tied to player and team performance";
  "Easy to understand visualizations"; "Injury reports and matchup data"; "Easy, two-click bet
  placing on your favorite sportsbooks"; "Custom Filters and Real-Time Notifications."
- **Premium+** — everything in Premium, plus "Real-Time Odds Movement Charts" and "EV+ Bet
  Indicators." (Page notes "*Early Bird Rates".)
- **Pro** — "Users on the Pro plan have access to all of these features. They will see Odds
  Movement charts on *every* market, not just EV+ ones," plus the "full, customizable **EV Power
  Feed** that the Pro plan is built around."

### THE PRODUCT LIMIT

**The boundary is not a count — it is a capability wall, and it is placed exactly where the money
is.** +EV is not in Premium at all. It appears as an *indicator* in Premium+ at $29.99. The
*feed* — the thing a serious bettor actually works from, sortable and filterable — is Pro only, at
$79.99/mo, a **4× step from the entry tier**. Arbitrage, middles and custom devig are also Pro
only.

**No numeric limits were found anywhere.** No alert cap, no seat count, no export limit, no
refresh-rate figure, no book count cap. I checked the Pro help article specifically and it states
none. **Numeric limits: NOT CONFIRMED — most likely because there are none.**

Trial: **7 days**, full access (https://help.outlier.bet/en/articles/10223052-how-to-use-outlier-pro).
No permanently free plan.

## 2.3 Accuracy: claimed vs proven

**Outlier publishes no accuracy claim, no track record, no ROI, no CLV, no calibration —
and, to be fair to them, they do not claim to.** Confirmed by absence across `help.outlier.bet`,
the App Store listing, and stated explicitly in
https://www.bettingnews.com/tools/outlier-bet-review/ ("does not reference accuracy metrics, win
rates, track record, or any published performance statistics") and
https://picksandparlays.net/reviews/ai-picks/outlier-bet ("does not place bets on your behalf and
does not guarantee winning picks").

**This is intellectually cleaner than Dimers.** They sell a data tool and let you do the
inference. But it leaves a very specific hole: **an EV tool that never reports whether its flagged
EV bets beat the closing line is unfalsifiable.** Every EV+ signal Outlier fires is a testable
prediction about the closing line, and Outlier settles none of them.

## 2.4 What customers say

**The dominant complaint is the tier structure, and it is a pricing-integrity complaint.**
Verbatim, https://picksandparlays.net/reviews/ai-picks/outlier-bet:

> "The features that genuinely differentiate Outlier from cheaper tools are locked behind Pro at
> $79.99–$129.99/mo. Users who sign up for Premium at $19.99 expecting a full-featured experience
> and discover that the headline tools require a 4–6x price increase feel misled."

(Note that review quotes Pro at "$79.99–$129.99/mo" against the App Store's $79.99. The higher
figure is **NOT CONFIRMED**; possibly regional or a lapsed price. Outlier's own materials say
"prices vary by region.")

Other complaints found:
- **No native Android app.** "An app for Android devices **is not** available yet"
  (https://www.bettingnews.com/tools/outlier-bet-review/). Repeated as a con in the picksandparlays
  review.
- **Sign-in failures.** Users "cannot sign into an account no matter what they try," redirected
  back to the home page with no error message (secondary: https://justuseapp.com/en/app/6443885102/outlier-smart-sports-betting/reviews).
- App crashes and problems syncing/transferring picks to sportsbooks (secondary, same source).
- Arbitrage margins are thin and close fast — "1–3% profit margin and close fast"
  (picksandparlays) — i.e. the Pro tier's flagship value decays under real book limits.

**The praise is worth reading too, because it names the job-to-be-done:** "saves me a ton of time.
All of the stats I used to have to dig up on my own are right here" (App Store review);
"saves me 30-40 mins per bet"; "The interface is way more intuitive than OddsJam or Props.cash"
(quoted in https://xclsvmedia.com/is-outlier-bet-worth-it-a-real-review-of-the-sports-betting-research-tool/ — secondary).
**Outlier wins on time-saving and UI, not on inference.**

## 2.5 THE SEAM against Outlier

1. **Outlier has no `p`. GSE does.** Outlier's fair value *is* the market. It can find a stale
   book; it can never tell you the market is wrong. GSE's factor model produces an independent
   probability, so GSE can price a market Outlier cannot evaluate at all.
2. **GSE can publish CLV; Outlier structurally should but doesn't.** Every EV+ signal is a
   closing-line prediction. Settling them publicly is a two-week build for GSE
   (`clv-capture.ts` exists) and would be a direct, unanswerable comparison.
3. **GSE can name its de-vig method; Outlier won't.** Their glossary says "four popular methods"
   and stops. GSE's receipts already carry a stated method (mean-implied proportional de-vig, per
   `AGENTS.md`), and `shin-devig.ts` and `devig/oracle.ts` exist. **Publishing the de-vig method
   by name, on the pick, is free differentiation and costs nothing.**
4. **The "why" is missing.** Outlier shows hit rates and splits; it never says which factors drove
   a number, because it has no factors. GSE's factor trail is the thing 16,000 satisfied Outlier
   users have never been offered.
5. **Price umbrella.** GSE Elite at $24.99/mo includes a CLV ledger. Outlier's EV feed is $79.99.
   **GSE undercuts the +EV tier by 3.2× while offering the one thing that would validate it.**
6. **Android.** Outlier has no native Android app. GSE is a web app — universal by default.

---

# 3. PROPS.CASH — short profile

`https://props.cash/` (homepage is a JS shell; WebFetch returned title only, so all facts below
are from the App Store listing and labelled secondary reviews)

- **Mechanic:** historical prop splits and streaks. Player performance over time, vs specific
  teams, current streak vs season average, injury intel including "how a player's performance
  changes without specific teammates," odds comparison across sportsbooks **and DFS Pick'em
  sites**, interactive charts. **No model, no projections, no simulations found.** Same category
  as PropFinder (see `_propfinder-teardown-final.md`) — a stat-splits browser.
- **Pricing — primary, App Store in-app purchases**
  (https://apps.apple.com/US/app/id1606752641): All Sports Monthly **$19.99**; All Sports Annual
  **$199.99**; NFL Season Pass **$99.99**; NBA Season Pass **$99.99**. Rating **4.8 from 7.8K
  ratings**. Trial: 7 days (secondary).
- **THE LIMIT:** the season pass is the interesting boundary — a **single-sport** pass at half the
  annual price. Sport coverage is the gate, not volume. Early users complained they "could only
  look at NBA player props" and could not switch sports (App Store review).
- **Accuracy:** none published. No track record, no ROI, no calibration.
- **Seam:** identical to PropFinder — they show you that a player went over in 7 of 10, and never
  tell you what the fair price is. GSE's `p` vs `q` on the same screen is the entire gap.

---

# 4. RITHMM — short profile

`https://www.rithmm.com/`

- **Mechanic — and it is a genuinely different one: the user builds the model.** No-code factor
  selection with adjustable sliders or raw statistical inputs; you can also "copy a model from a
  performance leaderboard," or click "Add a Model" → "Have AI Build One for You," which takes
  "about 10 seconds" (secondary: https://www.rithmm.com/post/how-to-build-an-ai-sports-betting-model-with-rithmm
  as summarised in search; https://propsbot.ai/rithmm-review/). Premium adds "custom factor
  creation," "hundreds of advanced statistics," and player-impact controls for NBA/NFL.
  **No simulation engine disclosed.** NOT CONFIRMED whether any sims run at all.
- **Pricing — primary, https://www.rithmm.com/pricing (read 2026-09-08):**

  | Tier | Price | Adds |
  |---|---|---|
  | **Core** | **$29.99/mo** | "Predictions across props and game markets"; "Recommended bets with an edge"; "Research every matchup"; "Compare prices across sportsbooks"; "Build and send your bets faster". Scout AI: **not included** |
  | **Pro** ("Best value") | **$49.99/mo** | Core + "Ask Scout what's good tonight"; "Ask Scout to check your bets"; "Ask Scout why". Standard monthly Scout usage |
  | **Premium** | **$99.99/mo** | Pro + "Copy top Premium models in one tap"; "Build with hundreds of advanced statistics"; "Account for key player impacts"; "Export every tracked bet"; **"4× the monthly Scout usage of Pro"** |

  All tiers: 7-day free trial. Annual option "available with savings" — **annual prices NOT
  CONFIRMED on the pricing page.** A secondary review (https://propsbot.ai/rithmm-review/) quotes
  an older two-tier ladder — Core "$239.99 per year, displayed as $19.99 per month," Premium
  "$999.99 per year" — **which no longer matches their own page. Treat the secondary numbers as
  stale.**

- **THE LIMIT: Scout AI usage quota.** "4× the monthly Scout usage of Pro" is the only explicit
  numeric-shaped boundary in the field, and the base quantity is never stated. **The actual Scout
  usage allowance at any tier is NOT CONFIRMED.** An unstated denominator on a metered feature is
  a live customer-trust liability for them.
- **Accuracy:** **no public ledger.** Verbatim from https://propsbot.ai/rithmm-review/: "We did
  not find a public, line-by-line prediction ledger on the open web that a non-subscriber could
  independently filter." Evidence lives inside the product as leaderboards and backtests.
- **The structural flaw, and it is severe.** The same review names it: "More controls create more
  ways to fit noise. A backtest can look excellent because the user repeatedly adjusted factors
  until they matched old results." **Rithmm's core feature is an overfitting machine, and its
  "model leaderboard" ranks the winners of a survivorship tournament.** A user-built model has no
  hold-out, no pre-registration, and no independent validation, so the leaderboard's top models
  are selected on in-sample fit.
- **Seam:** Rithmm sells *agency* — "your model, your factors." GSE sells the opposite and should
  say so directly: **a frozen `MODEL_VERSION`, a pre-registered scoring rule, and a time-hold-out
  calibration pass.** GSE's `model-freeze.mjs` guardrail is the marketable inverse of Rithmm's
  slider. "You cannot tune your way to a track record" is the line.

---

# 5. BETTINGPROS — short profile (already covered; new facts only)

Already deep in this repo: `bp-premium.md`, `bp-market-ev.md`, `bp-prop-record.md`,
`bp-nfl-record.md`, `bp-nba-record.md`, `bp-star-ratings.md`, `bp-cover-vs-ev.md`,
`bp-chrome-ext.md`. Not re-fetched.

- **Pricing, from the captured page** (`bp-premium.md`, https://www.bettingpros.com/premium/):
  **"$9.99/mo"** annual (**"$119.99 billed yearly"**) or **"$29.99/mo"** monthly, marked "67% Off".
  Free trial offered.
- **Premium features, verbatim from that capture:** "Prop Bet Cheat Sheet" ("Locate each day's
  best props based on EV, Cover Probability and historical trends"), **"Sharp AI"** ("NEW! Your
  personalized AI betting assistant crafted by industry experts"), "Prop Bet Analyzer", "Expert
  Game Picks" ("Advanced models generate game picks from our BettingPros experts"), "Bet
  Dashboard", "Parlay Wizard", **"Betting Systems"** ("Access 20,000+ betting systems, each
  back-tested for ROI and create custom systems"), "Custom Line Alerts".
- **They are the closest thing in this field to a public record:** they publish per-sport,
  per-season prop and game records at `/mlb/prop-record/`, `/nfl/...`, `/nba/...` (captured).
  **That is a win/loss record — still not calibration.** And "20,000+ back-tested betting systems"
  is the same overfitting problem as Rithmm at industrial scale: with 20,000 systems, thousands
  will show a great backtest by chance alone.
- **They are the cheapest credible competitor at $119.99/yr** — that price anchors the market
  below GSE Pro ($99/yr founding) only on the monthly line; GSE's annual is actually cheaper.
- **Seam:** attack "20,000+ back-tested systems" the same way as the strike rate — a multiple-
  comparisons argument. GSE publishes one frozen model and its errors.

---

# 6. ACTION NETWORK PRO — short profile

Site surface already captured in `actionnetwork-home.md`, `actionnetwork-sharp-report.md`,
`an-test.md`. New work here was pricing, and **pricing is where I have to report a failure.**

- **PRICING: NOT CONFIRMED.** `https://www.actionnetwork.com/pricing` and
  `https://www.actionnetwork.com/upgrade` are JS shells and returned **no text content** to
  WebFetch. `https://actionnetworkhq.zendesk.com/hc/en-us/articles/14456167617805-Subscription-options`
  returned **HTTP 403**. Two secondary sources disagree:
  - https://oddsplays.com/reviews/action-pro/ : "Monthly: $19.99", "Annual: $99.99 (66% savings)",
    "Weekly: Not offered".
  - Search-surfaced secondary summary: "$29.99/month or $59.88/year ($4.99/month billed
    annually)", plus "$19.99/week", plus an **"Action LABS" tier at $249/month or
    $1,499.88/year**. The Action LABS tier is **NOT CONFIRMED** but is worth a follow-up: if real,
    it is the highest-priced product in this entire competitive set and implies a pro/syndicate
    segment nobody else is serving.

  **Do not use any Action Network price in GSE copy until it is read off their own page.**
- **Mechanic, from the captured nav** (`actionnetwork-home.md`): PRO gates **PRO Report** (sharp
  money / betting-vs-money percentages), **PRO Projections** (game), **Prop Projections**, **PRO
  Systems** (filterable historical systems at `/pro-systems/discover`), **Signals**, **Public
  Betting**, bet tracking with sportsbook sync, plus ATS standings, weather, injuries and
  referee assignments free. Their real moat is **bet-percentage vs money-percentage data**, which
  requires sportsbook data partnerships GSE does not have and should not pretend to.
- **Accuracy:** no calibration published. Criticisms from https://oddsplays.com/reviews/action-pro/
  (secondary): "Odds are not given in real-time"; lacks advanced analytics for experienced
  bettors; "Poor customer service"; "Limited sportsbook options"; much of the data is "irrelevant
  for experienced or pro bettors."
- **Seam:** Action Network is a media company with a data product; the affiliate/promo-code
  business dominates the homepage (the captured file is thick with bonus-code posts). **GSE has no
  sportsbook affiliate revenue and therefore no incentive to publish a losing pick as a promo
  hook.** That is a stateable trust difference. GSE cannot compete on public-betting percentages
  and should not try.

---

# 7. SLEEPER PICKS — short profile (different category, and that matters)

`https://sleeper.com/picks`

**Sleeper Picks is not a research tool. It is a DFS pick'em operator — it sets the lines you bet
against.** It belongs in the same bucket as PrizePicks and Underdog (`wave2/prizepicks-underdog.md`),
not with Outlier or Dimers.

- **Mechanic, verbatim from https://support.sleeper.com/en/articles/9047931-sleeper-player-picks-rules:**
  "Create a contest entry with 2–8 players and predict whether each player will go higher or lower
  than their listed statistical projection."
- **Payouts / limits, from that same rules page:**

  | Pool type | Pool size | 1st place | Max entry fee |
  |---|---|---|---|
  | Regular | up to 5,000 | **100x** | **$500** |
  | Intermediate | 20 | 3x | $1 |
  | Beginner | 20 | 3x | $1 |

  Plus guaranteed payouts of "Entry fee multiplied by your VS Score."
- **THE LIMIT — and it is a real structural one:** "A single user may not account for more than
  **5%** of any individual pool's total entries." This is a hard cap on how much sharp money can
  enter one pool, and it is why bankroll scaling on Sleeper is capped in a way sportsbooks are not.
- **Injury/DNP:** "Affected picks are voided and graded as follows: Contests with 3+ picks are
  graded with adjusted payouts; Contests with 2 picks are canceled and refunded."
- **How the projection lines are set: NOT STATED on the rules page. NOT CONFIRMED.** This is the
  single most important undisclosed fact about the product — the house sets the number and does
  not say how.
- **Legality:** paid contests live in "30 U.S. states and Washington D.C.", unavailable in AZ, CO,
  CT, DE, HI, ID, IA, KY, LA, ME, MD, MI, MS, MT, NV, NJ, NY, OH, PA, WA (secondary:
  https://rotogrinders.com/fantasy/sleeper-promo-code/legal-states). That list is volatile — verify
  before use.
- **Seam:** Sleeper is a *market*, not a competitor for GSE's subscription. **It is a pricing
  surface GSE could evaluate.** A pick'em line is a fixed number with a known payout multiplier,
  so `p` from GSE's model converts directly into an EV on a 2–8 leg card — including the
  correlation that pick'em products are notoriously bad at pricing. But note the compliance
  posture: this is DFS-adjacent, the age gate on `/fantasy` stays, and the 5% pool cap plus the
  state list are real constraints. **Treat as a research target, not a shipping plan.**

---

# 8. THE SEAM — consolidated

**The one-sentence finding of this wave:** *seven products, one of which publishes numbers, and
not a single calibration metric anywhere in the field.*

| | Model | Sims | Publishes strike rate | Publishes ROI | Publishes calibration | Publishes CLV | Public per-pick ledger |
|---|---|---|---|---|---|---|---|
| Dimers | Yes | 10,000/game | **Yes, extensively** | Yes (1 window) | **No** | **No** | **No** |
| Outlier | **No** | No | No | No | No | No | No |
| Props.Cash | No | No | No | No | No | No | No |
| Rithmm | User-built | Not disclosed | No | No | No | No | **No** |
| BettingPros | Yes | Not disclosed | **Yes (records pages)** | Backtested systems | **No** | No | Partial (records) |
| Action Network | Projections | Not disclosed | No | No | No | No | No |
| Sleeper Picks | Sets lines | N/A | N/A | N/A | N/A | N/A | N/A |
| **GSE** | **Yes, frozen** | Closed-form | — | — | **ECE/Brier/Murphy + n** | **clv.ts exists** | **buildable** |

**Five things GSE can do that none of them can or will:**

1. **Publish a reliability curve.** Not one competitor publishes a single calibration number.
   Dimers publishes win probabilities to one decimal and never checks them. This is an entirely
   empty position in the market.
2. **Publish CLV per settled pick.** Dimers and Outlier both derive edges from market prices and
   neither reports whether the pick beat the close. It is the metric their own methods imply.
3. **Say "not AI" and mean it.** Dimers: "advanced artificial intelligence"; BettingPros: "Sharp
   AI"; Rithmm: "Have AI Build One for You"; the whole category is racing the other way. GSE's
   positioning is differentiated *because* it is unfashionable.
4. **Attack the strike rate and the backtest with arithmetic.** "74.9% moneyline" (Dimers) and
   "20,000+ back-tested systems" (BettingPros) are both defeated by one line of reasoning each —
   favorites, and multiple comparisons. GSE can publish both explainers and be right.
5. **Compute the distribution instead of sampling it.** Dimers sells "10,000 simulations." GSE
   evaluates Poisson/Skellam/Dixon-Coles closed-form. GSE's *absence* of a Monte Carlo engine is
   the stronger technical position, and stating it converts a perceived gap into the brand.

**And one thing GSE cannot do yet, recorded honestly:** none of the above is publishable copy
until the settled record is repaired. Per `AGENTS.md` (2026-09-08 14:45 UTC), 25 of 169 FINAL
`games` rows hold scores ESPN's own API contradicts, 54 settled published picks sit on them, and
calibration eligibility reads RED. **A dossier that says "we publish calibration and they don't"
is only true after those picks are re-settled.** Everything in §8 is a build target, not a claim.

---

## Appendix — confidence log

**Read on a primary (target-owned) surface:** Dimers simulation count, `/our-data` methodology,
`/subscription` tier table, App Store IAP prices, `/nfl/predictions` free surface, the CFB/NFL/
MLB/NBA/NHL/CBB strike-rate post, the World Cup ROI post; Outlier's App Store IAP prices,
Premium+ launch announcement, Pro glossary, "How to Use Outlier Pro" and help-centre collection
list; Rithmm `/pricing`; Props.Cash App Store IAP prices; Sleeper Picks rules page; BettingPros
`/premium/` (from the existing repo capture).

**Secondary only, labelled as such in text:** Outlier's "$79.99–$129.99" Pro range, Outlier
sign-in/crash complaints, Dimers free-tier Best-Bets cap and "Platinum" tier, Dimers 3-day trial,
Rithmm's older annual prices, Action Network prices and criticisms, Sleeper state list.

**NOT CONFIRMED, explicitly:** Dimers' exact free Best-Bets/day number; whether Dimers simulates
players or teams; Dimers' correlation handling; Dimers' Monte Carlo standard error; Dimers'
Pickwatch ranks (tracker and profile exist, values did not render); Dimers "Platinum"; Outlier's
choice among the "four popular" de-vig methods; Outlier numeric usage limits (likely none);
Rithmm's Scout usage quota and annual prices; Rithmm simulation use; Action Network PRO pricing
(three conflicting figures) and the "Action LABS" $249/mo tier; how Sleeper sets its projection
lines; Reddit sentiment on any target (reddit.com not fetchable from this session).
