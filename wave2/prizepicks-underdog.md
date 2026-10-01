# PrizePicks & Underdog — the pick'em payout machine

**Slug:** `prizepicks-underdog` · **Captured:** 2026-09-08 · **Method:** public surfaces only
(marketing pages, own help centers, press releases, one Wayback snapshot of a help article,
BBB public complaint records, third-party analysis). No authentication, no paywall crossing,
no endpoint scanning. `robots.txt` checked and clean on both roots:
`https://www.prizepicks.com/robots.txt` is `User-Agent: * / Disallow:` (nothing disallowed);
`https://www.underdogsports.com/robots.txt` contains only a `Sitemap:` line.

> **Honesty rule for this file.** Every factual claim carries the URL it was read on.
> Anything I could not read on a first-party page is labelled **NOT CONFIRMED**.
> Every number in the "derived" sections is *my arithmetic on their published tables* and is
> labelled DERIVED with the method shown, so it can be re-run and falsified.

---

## 0. The one-paragraph version

Neither company is, in 2026, the thing the market still calls it. PrizePicks stopped offering
against-the-house pick'em in the US on **2025-08-22** and now runs **peer-to-peer only (Arena)**
([sbcamericas.com](https://sbcamericas.com/2025/08/26/prizepicks-p2p-arena-only-us/)), while its
Team Picks and Culture Picks are **CFTC event contracts** issued by a registered FCM
([bettingusa.com](https://www.bettingusa.com/prediction-markets/reviews/prizepicks-prediction-markets/)).
Underdog went further: on **2026-07-18** it launched **its own CFTC-licensed prediction market
exchange**, holding FCM + DCM + DCO — "the first sports company with the complete prediction
market license stack" — and abandoned its traditional sportsbook
([underdogsports.com news](https://www.underdogsports.com/news/underdog-launches-prediction-markets-on-its-own-exchange),
[sportshandle.com](https://sportshandle.com/underdog-abandons-traditional-sportsbook-for-prediction-markets/)).
The published payout table is therefore **no longer the whole price**: on PrizePicks it is a
"Minimum Guarantee" floor sitting inside a leaderboard contest, and on Underdog it is a *base*
that is multiplied leg-by-leg by per-selection difficulty multipliers and shifted by an
undisclosed correlation adjustment. **Both operators price correlation. Neither publishes the
function.** That undisclosed function is the entire seam.

---

## 1. How the product works, mechanically

### 1.1 Is there a simulation engine?

**No public evidence that either operator publishes, or claims, a simulation engine.**
Searched their help centers, marketing pages, press pages and news posts. What exists:

| Question | PrizePicks | Underdog |
|---|---|---|
| Sim engine described publicly | **NOT CONFIRMED** — nothing found | **NOT CONFIRMED** — nothing found |
| Number of sims per slate | **NOT CONFIRMED** | **NOT CONFIRMED** |
| Player distributions published | No | No |
| Correlation model published | No — but correlation is *priced* (see 1.3) | No — but correlation is *priced* (see 1.3) |
| Ownership / contest-field model | Not published; contest field exists structurally (Arena groups) | Not published; Champions pools exist |
| Projection methodology post | None found | None found |

They publish **settlement** sources, not **pricing** sources. PrizePicks names its official
scoring providers as **"SportRadar, Genius, Stats Perform, and Grid"**, and states "All PrizePicks
results will be based on these official rulings and statistics, as posted at the conclusion of the
sporting or cultural event"
([prizepicks.com/help-center/official-scoring-providers](https://www.prizepicks.com/help-center/official-scoring-providers)).
That is a *grading* disclosure. There is no equivalent disclosure of how a line is set.

A third-party review makes the structural point that Underdog deliberately withholds the pricing
view: it "provides basic research information, recent game logs, injury designations, and matchup
context, but this is intentionally limited — Underdog will not build a tool that tells you which of
their own lines are mispriced"
([turtleevlabs.com](https://turtleevlabs.com/blog/underdog-fantasy-prop-tools)). Treat that as a
third-party characterisation, not an operator statement — but it matches what their own product
surfaces do and do not show.

### 1.2 What each product actually is, in 2026

**PrizePicks.** Player Picks: "Pick 2-6 projections", "You must have picks from AT LEAST 2
different teams in order for it to be a valid lineup", and Colorado residents require "a minimum of
3 projections" ([help-center/player-picks](https://www.prizepicks.com/help-center/player-picks)).
Since 2025-08-22 every US contest runs in the peer-to-peer **Arena** format
([sbcamericas.com](https://sbcamericas.com/2025/08/26/prizepicks-p2p-arena-only-us/);
launch release: "an exciting new peer-to-peer fantasy sports game", users "placed into groups
matching their number of lineups, selected entry fee and experience level",
[prizepicks.com press](https://www.prizepicks.com/press-news/prizepicks-launches-prizepicks-arena)).

The Arena mechanics are the mechanically important part, and PrizePicks documents them:

- **Two payout paths.** "Leaderboard Win: The highest score in your group will win a payout
  associated with your lineup type and number of picks selected" and "Minimum Guarantee: … All
  winning lineups will earn a Minimum Guarantee payout." And critically:
  **"If your lineup qualifies for both the High Score and Minimum Guarantee payouts described
  above, you will receive whichever amount is higher between the two. Payouts do not stack."**
  ([help-center/potential-outcomes](https://www.prizepicks.com/help-center/potential-outcomes))
- **Scoring is not binary.** "Demon Projection Win → 1.05 points", "Standard Projection Win →
  1 point", with other winning outcomes at 0.95 points (same page). So the leaderboard ranks on a
  *weighted* count, not a raw hit count.
- **Same-player stacks are penalised in scoring:** "All winning projections that are part of a same
  player stack will be scored at 0.95 points, even if they would normally earn a higher point total
  as a standalone pick" (same page).
- **Group sizes are published:** 2-3 picks → 315 competitors; 4 picks → 625; 5 picks → 750;
  6 picks → 940. Grouping is by "same number of projections", "close to you in experience level",
  and "games in their lineups that start at similar times"
  ([help-center/experience-levels-matchmaking](https://www.prizepicks.com/help-center/experience-levels-matchmaking)).
- **Experience tiers:** Rookie ≤50 competitions (1 star); All-Star 50-500 (2 star); Superstar via
  ">500 contests" *or* "Winning 5+ prizes totaling $2,500+ from a single operator" *or* "3+
  individual prizes of $1,000+ each from one operator" (3 star). "Rookies will ALWAYS play
  together, but there may be occasions when All-Stars and Superstars are placed in the same group."
  "PrizePicks does not use bots to fill out groups." (same page)

  → **This is a skill-segregation ladder with a published trigger.** A winning GSE user *will* be
  promoted into the Superstar pool by dollar thresholds, and their leaderboard EV changes when they
  get there. That is a modelable state transition, and nobody models it.

**Underdog.** Classic Pick'em (against the house, where permitted), **Champions** (peer-to-peer:
"Champions Points are calculated by taking the number of selections in your entries, the difficulty
of those selections, and how big of an entry fee you select"; "up to 500x your money" on standard
entries; "Choose up to eight players' stats — just make sure there's at least two different teams
in your entry"; "The minimum entry fee on Underdog is $1"
([underdogsports.com/games/pickem-champions](https://www.underdogsports.com/games/pickem-champions))),
plus Best Ball, plus the new **Underdog Predict** exchange.

### 1.3 The mechanism that matters: per-leg multipliers and correlation shifting

This is the single most important mechanical fact in this dossier, and Underdog states it
plainly in its own help centre:

> "It is important to note that the base multiplier assumes a standard 1.0x multiplier for every
> selection. Your potential payout adjusts based on the difficulty of your picks. If you choose a
> pick with a 0.7x multiplier, your total payout decreases to reflect that lower difficulty. On the
> flip side, if you choose a pick with a 1.5x multiplier, your total payout increases to reflect the
> higher level of difficulty. **Correlated projections can also modify your projected payout in your
> entry.** This increase or decrease in your payout multiplier will be displayed when building your
> entry."
> — *Pick'em Standard & Flex Entry Payouts*, help.underdogsports.com, read via Wayback snapshot
> `20260703201301` of
> `https://help.underdogsports.com/en/articles/13780101-pick-em-standard-flex-entry-payouts`
> (the live host returns HTTP 403 to non-browser clients; the snapshot is the citable copy).

Underdog's separate *Shifted Payouts* article names the mechanism — "In order to bring you the
widest variety of projections, certain picks and pick combinations will impact your payout amount.
This payout impact is known as shifted payouts" — and specifies that the shift **survives voids**:
"if a pick 5 has a modifier that reduces that entry payout by 20% and any selection voids, then the
resulting pick 4 will have a 20% reducing modifier to the payout"
([help.underdogsports.com/en/articles/8974208-shifted-payouts](https://help.underdogsports.com/en/articles/8974208-shifted-payouts),
read via search-result extraction; live fetch 403).

PrizePicks does the same thing with less disclosure:

> "Lineups with multiple athletes playing in the same game may have reduced payout rates" and
> "Lineups including Demon or Goblin projections or other discounted projections carry altered
> standard payout rates."
> — [prizepicks.com/help-center/payouts](https://www.prizepicks.com/help-center/payouts)

**Neither publishes the size of the correlation adjustment, the correlation estimates behind it, or
the rule that selects which combinations get shifted.** It is shown to you as a changed number in
the entry builder at build time, and that is all.

---

## 2. The payout tables (verbatim) and the limits that are the product boundary

### 2.1 PrizePicks — quoted from `prizepicks.com/help-center/payouts`

**Power Play (all must hit):**
> "6-Pick Win = 37.5x the entry fee; 5-Pick Win = 20x the entry fee; 4-Pick Win = 10x the entry fee;
> 3-Pick Win = 6x the entry fee; 2-Pick Win = 3x the entry fee"

**Flex Play:**
> "6 of 6 correct = 25x; 5 of 6 correct = 2X; 4 of 6 correct = 0.4X; 5 of 5 correct = 10x;
> 4 of 5 correct = 2x; 3 of 5 correct = 0.4x; 4 of 4 correct = 6x; 3 of 4 correct = 1.5x;
> 3 of 3 correct = 3x; 2 of 3 correct = 1x; 2 of 2 correct = 2x; 1 of 2 correct = 0.5x"

| Picks | Power | Flex all | Flex −1 | Flex −2 |
|---|---|---|---|---|
| 2 | 3.0x | 2.0x | 0.5x | — |
| 3 | 6.0x | 3.0x | 1.0x | — |
| 4 | 10.0x | 6.0x | 1.5x | — |
| 5 | 20.0x | 10.0x | 2.0x | 0.4x |
| 6 | 37.5x | 25.0x | 2.0x | 0.4x |

Headline ceiling: **"Win up to 2000x your cash"**, and "Demons are the only way to reach the max
2000x payout"; "Demon projections vary in how much of a payout boost they provide. The higher the
projection, the higher the payout"
([prizepicks.com/demons-and-goblins](https://www.prizepicks.com/demons-and-goblins)).
The page carries **no multiplier table and no formula** for Demons/Goblins — verified by reading it.

### 2.2 Underdog — quoted verbatim (Wayback snapshot cited in §1.3)

> "Payouts include the entry fee being paid back, and the base payouts for standard and flex
> entries are:
> **Standard Entries** — 2-pick 3.5x · 3-pick 6.5x · 4-pick 10x · 5-pick 20x · 6-pick 35x ·
> 7-pick 65x · 8-pick 120x.
> **Flex Entries with 0 losses** — 3-pick 3.25x · 4-pick 6x · 5-pick 10x · 6-pick 25x ·
> 7-pick 40x · 8-pick 80x.
> **Flex Entries with 1 loss** — 8-pick 3x · 7-pick 2.75x · 6-pick 2.6x · 5-pick 2.5x ·
> 4-pick 1.5x · 3-pick 1.09x.
> **Flex Entries with 2 losses** — 8-pick 1x · 7-pick 0.5x · 6-pick 0.25x.
> Flex entries support a minimum of 3 picks and a maximum of 8 picks. If your entry has more than
> 8 picks, it is likely a Combo entry, which cannot be submitted as a flex entry."

| Picks | Standard | Flex 0L | Flex 1L | Flex 2L |
|---|---|---|---|---|
| 2 | 3.5x | — | — | — |
| 3 | 6.5x | 3.25x | 1.09x | — |
| 4 | 10x | 6x | 1.5x | — |
| 5 | 20x | 10x | 2.5x | — |
| 6 | 35x | 25x | 2.6x | 0.25x |
| 7 | 65x | 40x | 2.75x | 0.5x |
| 8 | 120x | 80x | 3x | 1x |

**Void / flex-down rule.** A voided or tied pick collapses the entry to the next-lower pick count's
payout — "a 5-pick Flex Entry with 2 Ties/Voids will revert down to a 3-pick Flex Entry" — and
"Entries that are reverted down to include only players on one team or just a single player will be
void and refunded" (extracted from *Pick'em Flex — Flexed Payouts*,
`help.underdogsports.com/en/articles/13161362-pick-em-flex-flexed-payouts`; live fetch 403 and no
Wayback snapshot available, so this one is **quoted from search-engine extraction, not read
first-hand** — treat the wording as approximate, the mechanic as confirmed by the shifted-payouts
article's void clause).

**Scorchers** (payout boosters) break the flex-down symmetry: the Scorcher leg "must be correct,
even in a Flex entry", and "If a Scorcher is voided or tied, it counts as a loss and you do not get
the boosted payout — unlike a standard voided pick, it does not simply recalculate the entry at a
lower pick count." Same sourcing caveat (search extraction of the Underdog help article, live 403).

### 2.3 The limits that ARE the product boundary

| Boundary | PrizePicks | Underdog |
|---|---|---|
| Picks per entry | **2-6** (3 minimum in Colorado) — [player-picks](https://www.prizepicks.com/help-center/player-picks) | **2-8**; Flex requires **3-8**; >8 is a Combo and "cannot be submitted as a flex entry" (Wayback, §2.2) |
| Entries per contest | **"Each User may enter only one (1) lineup per Contest."** — [ToS](https://www.prizepicks.com/help-center/terms-of-service) | **NOT CONFIRMED** (a Champions entry-limits article exists but was not readable) |
| Team diversity | "at least 2 different teams" | "at least two different teams" |
| Same player twice | Forbidden "unless Stacks are available for that player" | **NOT CONFIRMED** |
| Team Picks in a lineup | "one (1) Team Pick selection … as long as it does not push your total number of picks over six (6)"; cannot mix in Culture Picks, Free Picks, or multiple Team Picks | n/a (separate exchange product) |
| Max multiplier | "up to 2000x" (Demons only) | **"up to 5,000x for both standard and flex entries"** — *Maximum Payout Multiplier*, help.underdogsports.com/en/articles/10847198 (search extraction; live 403) |
| Max stake | ToS: "minimum and maximum entry fee amounts and/or a prescribed list of available entry fees applied to some Contests" — **no number published**. Also: "The maximum entry fee, often referred to as a limit, varies depending on the Member, sport, or stat-type. Limits can change at any time at the sole discretion of PrizePicks." | "there is a limit to the dollar amount that a customer can play on a single player's projections, and … on a single entry", "variable depending on the sport and subject to change" (same article; search extraction) |
| Account limiting | **"PrizePicks may place limits on your account for legal, regulatory, responsible gaming, or other relevant purposes … Limits will be set in PrizePicks' sole discretion and are subject to change."** ([ToS](https://www.prizepicks.com/help-center/terms-of-service)) | **NOT CONFIRMED** in a first-party quote |
| Automated tools | ToS forbids "any robot, spider, or other automatic device, process, or means to access the Site or App for any purpose, including monitoring or copying any of the material" | **NOT CONFIRMED** |
| Sports / states | Player Picks 36 states + DC; Team Picks 35 + DC; Culture Picks 47 + DC; "Only F2P Available in NV" ([where-can-i-play](https://www.prizepicks.com/help-center/where-can-i-play)) | Classic Pick'em ~15 states, Champions ~21, Best Ball 41 + DC, Predict 38 states (third-party trackers — see §7) |

> **Conflict flagged, not resolved.** The PrizePicks *where-can-i-play* page lists New York among
> the states where Player Picks are unavailable, but PrizePicks publicly relaunched a P2P fantasy
> product in New York in February 2026
> ([sbcamericas](https://sbcamericas.com/2026/02/05/prizepicks-reenters-new-york-market/)).
> Either the help page is stale or NY is Arena-with-restrictions. **NOT RESOLVED.**

---

## 3. DERIVED: the effective hold, and why the 6-pick is the trap

Method: EV as a multiple of stake = Σ_k (multiplier_k · C(n,k) · p^k · (1−p)^(n−k)), using the
published tables above and the fact that **both operators' multipliers are total return including
stake** (Underdog states it: "Payouts include the entry fee being paid back"; PrizePicks' "3x the
entry fee" on a 2-pick reads the same way). Hold = 1 − EV. Break-even p solved by bisection.
Independence assumed. Script: `hold2.py` (reproduced in §8).

### 3.1 Hold at a coin-flip leg (p = 0.50) and the break-even leg win rate

| Structure | n | EV @ p=.50 | **Hold @ p=.50** | **Break-even p** |
|---|---|---|---|---|
| PP Power | 2 | 0.7500 | 25.00% | 57.74% |
| PP Power | 3 | 0.7500 | 25.00% | 55.03% |
| PP Power | 4 | 0.6250 | 37.50% | 56.23% |
| PP Power | 5 | 0.6250 | 37.50% | 54.93% |
| PP Power | 6 | 0.5859 | **41.41%** | 54.66% |
| PP Flex | 2 | 0.7500 | 25.00% | 61.80% |
| PP Flex | 3 | 0.7500 | 25.00% | 57.74% |
| PP Flex | 4 | 0.7500 | 25.00% | 55.03% |
| PP Flex | 5 | 0.7500 | 25.00% | 54.25% |
| PP Flex | 6 | 0.6719 | **32.81%** | 54.21% |
| UD Standard | 2 | 0.8750 | **12.50%** | 53.45% |
| UD Standard | 3 | 0.8125 | 18.75% | 53.58% |
| UD Standard | 4 | 0.6250 | 37.50% | 56.23% |
| UD Standard | 5 | 0.6250 | 37.50% | 54.93% |
| UD Standard | 6 | 0.5469 | 45.31% | 55.29% |
| UD Standard | 7 | 0.5078 | 49.22% | 55.08% |
| UD Standard | 8 | 0.4688 | **53.13%** | 54.97% |
| UD Flex | 3 | 0.8150 | 18.50% | 55.39% |
| UD Flex | 4 | 0.7500 | 25.00% | 55.03% |
| UD Flex | 5 | 0.7031 | 29.69% | 54.75% |
| UD Flex | 6 | 0.6930 | 30.70% | **53.82%** |
| UD Flex | 7 | 0.5449 | 45.51% | 55.42% |
| UD Flex | 8 | 0.5156 | 48.44% | 55.07% |

Three findings that are not in any competitor's tooling as far as I can see:

1. **PrizePicks Flex 2 through 5 all hold exactly 25.00%.** That is not a coincidence, it is a
   designed invariant: they tuned the consolation rungs so every flex size below 6 has the same
   coin-flip hold. The 6-pick Flex breaks the invariant *upward* to 32.81%, and the 6-pick Power to
   41.41% — the two entries the app pushes hardest are the two most expensive.
2. **Hold and break-even move in opposite directions.** The UD 8-pick standard has the worst
   coin-flip hold on the board (53.13%) but one of the *lowest* break-even rates (54.97%), because
   it is a convexity bet: it is terrible with no edge and levered with one. Any "which entry is
   cheapest" answer that quotes only one of these two numbers is wrong, and most public
   calculators quote only one.
3. **UD 2-pick standard is the cheapest single product on either platform** (12.50% hold,
   53.45% break-even) — and it is the one the interface buries.

### 3.2 Third-party claims vs my arithmetic — a real discrepancy

[upside.tools](https://upside.tools/research/prizepicks-vs-underdog-pricing) (measured 2026-08-18)
claims "PrizePicks prices every leg at -119, which demands 54.34 percent to break even" and that
"Underdog's four man flex pays 7.2x, and folded down to a per leg price … comes out to about -107,
which demands 51.69 percent", a "2.65 point gap on every single leg".

**Two problems, both checkable.** (a) A single flat per-leg price cannot reproduce the published
table: PP's break-even runs 61.80% (2-Flex) down to 54.21% (6-Flex) — a 7.6-point spread, not a
constant. −119 is at best an average over the structures they happened to fold. (b) Underdog's
own help centre says the 4-pick flex base is **6x**, not 7.2x; 7.2x is a 1.2x boosted variant.
Fold the *published* 4-flex and you get break-even 55.03%, i.e. **worse** than PrizePicks' 4-Flex
(55.03%, identical) and worse than upside's 51.69% by 3.3 points. Their headline gap is an artifact
of comparing a boosted Underdog entry against an unboosted PrizePicks one.
**This is the exact error a competitor makes that GSE should not.**

### 3.3 The published, real-world hold: Underdog's own results disclosure

Underdog publishes an *Average Results* page. It is the only genuine outcome evidence either
company puts on the open web ([underdogsports.com/average-results](https://www.underdogsports.com/average-results)):

- **"16%"** of players are net winners (same figure over the last 7 days and last 30 days).
- **"Average net winnings: −$19 (7 days) / −$40 (30 days)"**; median **−$10 / −$15**.
- Beginners (<50 contests): **"79%"** net losers over 7 days, **"80%"** over 30 days.
- Concentration: Top 1% = 16% of entry fees but **29% of winnings**; Top 5% = 28% / 47%;
  Top 10% = 32% / **53%**. "Highly Experienced Players" (1,000+ contests or 4+ wins of $1,000+)
  captured **"39%" of all winnings**.
- Methodology note: "Best ball contests with multiple rounds are only counted once and are
  determined based on the contests settlement date. Data is updated daily."

**Read that carefully.** It confirms the theoretical hold empirically *and* confirms that skill
transfers: 10% of players take 53% of the winnings. A tool that moves a user from the bottom 84%
into the top 10% has a measurable, operator-published target.

**PrizePicks publishes no equivalent.** Searched; nothing found. **NOT CONFIRMED that one exists.**

---

## 4. DERIVED: correlation is worth more than skill, which is why they shift it

Equicorrelated Gaussian copula, 300,000 Monte Carlo trials per cell, per-leg win probability `p`,
pairwise correlation `ρ`, **assuming the operator applies no payout shift**. Script `corr.py`, §8.
Sanity: every ρ=0 column reproduces the closed-form EV in §3.1 to ~1%.

**At p = 0.50 (zero leg-level skill):**

| Structure | ρ=0.0 | ρ=0.1 | ρ=0.2 | ρ=0.3 | ρ=0.5 |
|---|---|---|---|---|---|
| PP 6-Flex (25/2/0.4) | 0.676 | 1.152 | 1.738 | 2.403 | 3.925 |
| PP 6-Power (37.5) | 0.590 | 1.218 | 2.070 | 3.030 | 5.389 |
| PP 5-Flex (10/2/0.4) | 0.748 | 0.984 | 1.236 | 1.496 | 2.065 |
| UD 6-Flex (25/2.6/0.25) | 0.700 | 1.187 | 1.753 | 2.442 | 3.993 |
| UD 8-Standard (120) | 0.460 | **1.684** | 3.639 | 6.231 | 13.279 |
| UD 8-Flex (80/3/1) | 0.511 | 1.425 | 2.770 | 4.599 | 9.352 |

**At p = 0.5434 (the "−119 fair" leg the market talks about):**

| Structure | ρ=0.0 | ρ=0.1 | ρ=0.2 | ρ=0.3 |
|---|---|---|---|---|
| PP 6-Flex | 1.017 | 1.624 | 2.304 | 3.058 |
| PP 6-Power | 0.948 | 1.839 | 2.821 | 3.932 |
| UD 8-Standard | 0.925 | 2.703 | 5.386 | 8.459 |

**The finding:** on an unshifted 8-pick Underdog standard, moving from ρ=0 to **ρ=0.10 with no
leg-level edge at all** takes EV from 0.46 to 1.68 — a bigger swing than going from p=0.50 to
p=0.56 at ρ=0 (0.46 → 1.12). *Correlation dominates leg accuracy in these structures, by a lot.*
Which is exactly why both operators shift payouts on correlated legs, cap same-player stacks
(PrizePicks scores stacked legs at 0.95 rather than 1.00), and require two teams.

The unanswered question — **is the shift they apply large enough?** — is empirically testable from
the entry builder's own displayed multiplier, because Underdog says the change "will be displayed
when building your entry" and PrizePicks says the rate is "reduced". Nobody has published that test.

---

## 5. Correlation restrictions: exactly what they refuse to combine

**PrizePicks** ([help-center/player-picks](https://www.prizepicks.com/help-center/player-picks),
verbatim):
- "You must have picks from AT LEAST 2 different teams in order for it to be a valid lineup"
- "You can not have the same player in your lineup more than once, unless Stacks are available for
  that player"
- **"You can not have a pitcher and an opposing batter in the same lineup"** — the only *hard,
  named* correlation ban I found on either platform. Additional sport-specific rules "are available
  in the scoring chart" (per-sport charts not enumerated here — **NOT CONFIRMED** beyond MLB).
- "Currently you can add one (1) Team Pick selection to your lineup, as long as it does not push
  your total number of picks over six (6)"; Culture Picks, Free Picks and multiple Team Picks
  cannot be mixed in.
- Demons and Goblins "cannot be used with Taco Tuesday discounts, Guarantee Picks, or some types of
  Bonus Lineups".
- **Asymmetric team-pick risk:** "Your Team Pick must be correct for your lineup to qualify for a
  payout; if your Team Pick is incorrect, you will not be able to earn a Leaderboard Win or Minimum
  Guarantee", and lineups containing both Player and Team Picks are ineligible for early exits
  ([potential-outcomes](https://www.prizepicks.com/help-center/potential-outcomes)). A "Flex" entry
  containing a Team Pick is **not** a flex entry with respect to that leg. That is a payout-table
  discontinuity most tools will get wrong.
- Combined lineups are Power-Play-only for a named sport list — "Add 2-5 Player Picks to one Team
  Pick … Min. 2 picks from different teams", available for NFL, CFB, WNBA, MLB, NBA, Tennis, UFC
  ([ways-to-pick](https://www.prizepicks.com/ways-to-pick)).

**Underdog:** the only hard constraint found first-hand is the two-team minimum
([pickem-champions](https://www.underdogsports.com/games/pickem-champions)). Underdog's approach is
**price, not prohibit**: correlated projections "modify your projected payout"
(Wayback, §1.3) rather than being blocked. **No named forbidden pair was confirmed on any
first-party Underdog page.** NOT CONFIRMED.

> **Strategic read.** PrizePicks bans a small number of pairs and hides the rest inside "may have
> reduced payout rates". Underdog bans almost nothing and prices everything. Underdog's design is
> more exploitable *if* you can measure the shift; PrizePicks' is more exploitable *if* you can
> find correlated pairs that fall outside their named bans and outside whatever their same-game
> detector catches.

---

## 6. What they claim about accuracy, and what they prove

| Claim type | PrizePicks | Underdog |
|---|---|---|
| Claims its lines/projections are accurate | No such public claim found | No such public claim found |
| Publishes calibration | **No** | **No** |
| Publishes ROI / CLV / track record of its own lines | **No** | **No** |
| Publishes player outcome distribution | **No — none found** | **Yes**, `underdogsports.com/average-results` (see §3.3) |
| Publishes grading sources | **Yes** — SportRadar, Genius, Stats Perform, Grid | **NOT CONFIRMED** |
| Publishes settlement finality policy | **Yes** — "Any changes to the original scoring decision will NOT be reflected in the result of a pick after it has been settled", with a carve-out for "clear and obvious scoring errors … at our sole discretion" | **NOT CONFIRMED** |

**The precise gap.** These are operators, not forecasters, so the honest framing is not "they claim
accuracy and can't prove it" — it is **they never make an accuracy claim at all, and they never
publish the one number that would let a customer price them: the closing hit rate of their own
lines against the market.** The customer is asked to accept a 25-53% structural hold on lines whose
quality is entirely unmeasured in public. Underdog's *Average Results* page is genuinely more
honest than anything PrizePicks publishes and than almost anything in this competitive set — and
even it reports *player* outcomes, never *line* quality.

Note also the settlement asymmetry PrizePicks writes down: stat corrections do not reopen a settled
pick unless PrizePicks itself uploaded the wrong score. That is a one-way ratchet in the house's
favour on every disputed grade, disclosed but not quantified.

---

## 7. What customers actually complain about

**Underdog — BBB public complaint file** (Brooklyn NY profile, not BBB accredited,
**566 complaints in 3 years, 162 closed in the last 12 months**;
[bbb.org](https://www.bbb.org/us/ny/brooklyn/profile/online-gaming/underdog-fantasy-0121-87153118/complaints)):

1. **The "up to" multiplier — the single sharpest complaint.** 2026-07-11: a customer expected a
   2-of-3 Flex to pay the displayed multiplier (~$65.53) and received **$2.65**. Underdog's answer
   was that displayed payouts are "up to" amounts requiring *specific* selections to be correct.
   A parallel report describes support explaining the payout was recalculated with an internal
   **"modified multiplier"** because the *losing* legs carried the higher individual multipliers,
   and that this was not clearly disclosed pre-entry.
   → **Mechanically this is correct behaviour and terrible disclosure.** Because per-leg multipliers
   differ (0.7x…1.5x), a Flex consolation payout depends on *which* legs won, not just how many.
   The published table is a base, not a payout.
2. **Entries taken but never placed.** 2026-08-11, a $363.95 six-leg entry "never populated on my
   Track page" though funds were deducted; all legs won; refunded entry fee plus courtesy credit,
   not winnings. 2026-07-21, a $100 entry stuck pending, refunded rather than paid the $205.
3. **Account closure with balance retained.** 2026-07-25, deactivation for alleged Terms violation
   with "zero withdrawable funds remaining"; 2026-07-23, ~$47.76 withheld pending verification,
   later refunded.

**PrizePicks.** I could not find a first-party or reputable aggregated complaint corpus in the time
available; targeted Reddit searches returned commentary sites rather than threads.
**NOT CONFIRMED** — do not assert a PrizePicks complaint pattern from this dossier.

**The structural complaint that is not a complaint.** Underdog's own disclosure — 84% of players
net-losing, 80% of beginners net-losing — is the loudest customer-experience fact on the page, and
they publish it themselves.

---

## 8. THE SEAM — what GSE can do that they cannot or will not

They **cannot** tell you which of their lines are mispriced; the entire business is the spread
between their line and the truth. They **will not** publish the correlation adjustment, because
disclosing it would let customers arbitrage the shift. They **will not** publish calibration on
their own projections. And they **cannot** show you a cross-book price, because they are one book.

That leaves five things GSE can do, in descending order of defensibility:

1. **Model the payout table as a function, not a constant.** This is the headline. Underdog's
   payout is `base(n, losses) × Π(per-leg multipliers) × shift(correlation)`, and the BBB complaint
   in §7.1 is direct evidence that customers — and by extension every public calculator — are
   modelling only `base()`. A calculator that reports *the actual payout for each specific
   surviving subset*, rather than the headline "up to" number, is correct where every rival is
   wrong, and its correctness is demonstrable from the operator's own help text.
2. **Fire on edge `e = p − q`, where `q` is derived from the entry-specific multiplier, not from a
   flat −119.** The `_HANDOFF-to-coding-agent.md` doctrine already says fire on edge, never on
   confidence. This target supplies the missing `q`: for these products `q` is *structural* — it
   depends on n, entry type, per-leg multipliers, and the correlation shift, and my §3.1 table shows
   it ranges from 53.45% to 61.80% across published structures. Publishing that break-even table
   with the derivation is a "math you can read" artifact that neither operator will ever match.
3. **Measure their correlation shift, from the numbers they show you.** Both operators *display*
   the adjusted multiplier at build time. The shift is therefore observable without touching
   anything private. Building the empirical shift curve — how much does adding a same-game teammate
   cost, by sport and by pair type — answers the only question that matters (§4: correlation
   dominates leg accuracy) and answers it in a way that is falsifiable. Neither operator will ever
   publish it because publishing it is publishing their edge.
4. **Model the contest, not just the ticket.** PrizePicks is P2P-only. Its payout is
   `max(leaderboard, minimum guarantee)`, in a group of a *published* size (315/625/750/940) with
   *published* weighted scoring (1.05 / 1.00 / 0.95) and a *published* experience ladder whose
   promotion triggers are dollar thresholds. Every input to a field model is on their help pages,
   and I have found nobody who models it. This is the highest-leverage untouched surface in the
   category.
5. **Publish calibration on the props, because they never will.** The whole GSE premise. Against a
   category where the operator publishes nothing about line quality and the tooling layer publishes
   ROI screenshots, a settled-picks ECE/Brier record on prop lines is the differentiator — and GSE
   already has the calibration pipeline. *Note the live constraint: per AGENTS.md the settled record
   is under a score-integrity hold as of 2026-09-08, so this seam is real but not yet publishable.*

**What GSE must NOT do here.** Do not build a "beat PrizePicks" ROI claim; that is the FTC
earnings-claim graveyard documented in `_competitor-mistakes-lessons.md` §2. Do not scrape either
operator outside the clearance engine — PrizePicks' ToS explicitly forbids robots and spiders, and
`.claude/rules/scraping.md` governs. The seam is *modelling their published rules*, which is
lawful, cheap and unclaimed.

---

## 9. Concrete build items

| # | Item | Why it matters | GSE entry point | Effort |
|---|---|---|---|---|
| 1 | `pickem-payout-table.ts` — encode both operators' tables exactly as §2, as data with a source URL and captured-at date per row | Everything else depends on it; today GSE has `lib/parlay/parlay.ts` (book parlays) and no pick'em table at all | new `apps/web/lib/dfs/pickem/` beside `lib/dfs/salaries.ts` | S |
| 2 | Subset-exact payout evaluator: given n, entry type, per-leg multipliers and which legs won, return the payout — not the "up to" headline | Directly fixes the §7.1 defect that generated real BBB complaints; correctness is provable from the operator's own text | same module; unit tests mirroring the §2 tables | S |
| 3 | Structural break-even surface: reproduce §3.1 as a tested function `breakEven(operator, entryType, n)` | Supplies `q` for the `e = p − q` doctrine on props; today `q` would silently default to a flat vig | `packages/prediction-engine/devig` + `edge-engine.ts` | M |
| 4 | Correlation-aware EV using the copula GSE already has | `apps/web/lib/projections/correlation.ts` already implements a Gaussian copula with `qb-catcher`/`game-stack`/`same-team` link kinds — but it is `status: "shadow"`, `priced: false`. §4 shows correlation swamps leg edge; wiring it to a pick'em payout table is the highest-value reuse in the repo | `lib/projections/correlation.ts` → new pick'em EV surface; keep `priced:false` until calibrated | M |
| 5 | Observed-shift recorder: log the operator's displayed multiplier for a candidate entry vs the base table, and store the delta | Turns their undisclosed correlation function into GSE's measured dataset; nothing else in the market has it | `apps/web/lib/correlation/evaluate.ts` + a rights-gated capture path through `lib/scraping/clearance-engine.ts` — **must** pass `checkClearance()` first | M |
| 6 | PrizePicks Arena field model: group sizes 315/625/750/940, weighted scoring 1.05/1.00/0.95, `max(leaderboard, min-guarantee)`, experience-tier promotion at the published dollar thresholds | The only public P2P prop contest with fully published field parameters, and nobody models it | new module; reuse `lib/contests/` and `lib/sim/score-distribution.ts` | L |
| 7 | Hard-constraint validator (2-team minimum; no pitcher vs opposing batter; one Team Pick max and it must hit; same-player only via Stacks; UD flex 3-8, >8 = Combo) | Prevents GSE from ever surfacing an unplaceable or mis-priced ticket | same module as #1 | S |
| 8 | Public "what it actually costs" explainer publishing §3.1 with the derivation and the script | On-brand — "we're not AI, we're math you can read" — and it corrects a live, citable competitor error (§3.2). Must pass `lint:brand` and the compliance scanner; frame as structural cost, never as an earnings claim | `apps/web/lib/explainers/` + `lib/compliance-scanner` | S |

---

## 10. NOT CONFIRMED — do not assert these

- Any simulation engine, sim count, or player-distribution model at either operator.
- Any published formula or magnitude for PrizePicks' same-game "reduced payout rates".
- Any published Demon/Goblin multiplier table. (A search snippet attributed "a 6-pick all-demon
  entry pays 1.5x what a standard 6-pick pays; a 6-pick all-goblin entry pays only 0.6x" to
  Stokastic; **that sentence did not appear when I read the page**, so it is unverified.)
- Underdog's per-entry and per-player dollar caps (existence confirmed by search extraction of
  their help article; **no figures published**).
- Underdog's entry-limit-per-contest, same-player rule, grading-source list, and settlement
  finality policy.
- Any named forbidden correlated pair on Underdog.
- PrizePicks maximum entry fee (a number), and any PrizePicks player-outcome disclosure.
- Whether PrizePicks Player Picks are live in New York (help page and press release conflict, §2.3).
- Exact current state counts for Underdog Pick'em / Champions / Predict — the figures in §2.3 come
  from third-party trackers ([saturdaydownsouth](https://www.saturdaydownsouth.com/dfs/underdog-fantasy/legal-states/),
  [gamingamerica](https://gamingamerica.com/news/1089354/underdog-launches-own-prediction-market-avoiding-some-states)),
  not from Underdog, and state availability changes weekly.
- Three Underdog help articles (*Flexed Payouts*, *Shifted Payouts*, *Maximum Payout Multiplier*)
  were quoted from search-engine extraction because `help.underdogsports.com` returns HTTP 403 to
  non-browser clients and only one article had a Wayback snapshot (and archive.org went offline
  mid-session). Wording is approximate; re-read them from a browser before shipping copy that
  quotes them.

---

## 11. Reproduction scripts

`hold2.py` (closed-form hold and break-even, §3.1):

```python
from math import comb
def ev(n, table, p):  # table: {hits: total_return_multiple}
    return sum(m*comb(n,k)*p**k*(1-p)**(n-k) for k, m in table.items())
def breakeven(n, table):
    lo, hi = 0.0, 1.0
    for _ in range(200):
        mid = (lo+hi)/2
        lo, hi = (mid, hi) if ev(n, table, mid) < 1 else (lo, mid)
    return (lo+hi)/2

PP_POWER = {2:{2:3.0},3:{3:6.0},4:{4:10.0},5:{5:20.0},6:{6:37.5}}
PP_FLEX  = {2:{2:2.0,1:0.5},3:{3:3.0,2:1.0},4:{4:6.0,3:1.5},
            5:{5:10.0,4:2.0,3:0.4},6:{6:25.0,5:2.0,4:0.4}}
UD_STD   = {2:{2:3.5},3:{3:6.5},4:{4:10.0},5:{5:20.0},6:{6:35.0},7:{7:65.0},8:{8:120.0}}
UD_FLEX  = {3:{3:3.25,2:1.09},4:{4:6.0,3:1.5},5:{5:10.0,4:2.5},
            6:{6:25.0,5:2.6,4:0.25},7:{7:40.0,6:2.75,5:0.5},8:{8:80.0,7:3.0,6:1.0}}
```

`corr.py` (§4) draws an equicorrelated Gaussian copula — `Z_i = sqrt(rho)*F + sqrt(1-rho)*E_i`,
leg wins when `Z_i < Phi^-1(p)` — 300k trials per cell, Acklam inverse-normal, seed 7.
Both live in the session scratchpad; port them into the repo as Vitest fixtures for build item #3.

---

## 12. Source index

**First-party, read directly**
`prizepicks.com/ways-to-pick` · `/help-center/payouts` · `/help-center/player-picks` ·
`/help-center/potential-outcomes` · `/help-center/experience-levels-matchmaking` ·
`/help-center/official-scoring-providers` · `/help-center/terms-of-service` ·
`/help-center/where-can-i-play` · `/help-center` · `/demons-and-goblins` ·
`/press-news/prizepicks-launches-prizepicks-arena` · `prizepicks.com/robots.txt` ·
`underdogsports.com/average-results` · `/games/pickem-champions` ·
`/news/underdog-launches-prediction-markets-on-its-own-exchange` · `underdogsports.com/robots.txt`

**First-party via Wayback snapshot `20260703201301`**
`help.underdogsports.com/en/articles/13780101-pick-em-standard-flex-entry-payouts`

**First-party, 403 to non-browser clients — quoted from search extraction, flagged in text**
`help.underdogsports.com/en/articles/13161362-...` · `/8974208-shifted-payouts` ·
`/10847198-maximum-payout-multiplier` · `/11010091-correlated-projections`

**Third-party**
[bbb.org Underdog complaints](https://www.bbb.org/us/ny/brooklyn/profile/online-gaming/underdog-fantasy-0121-87153118/complaints) ·
[sbcamericas P2P-only](https://sbcamericas.com/2025/08/26/prizepicks-p2p-arena-only-us/) ·
[sbcamericas NY re-entry](https://sbcamericas.com/2026/02/05/prizepicks-reenters-new-york-market/) ·
[closingline CA switch](https://closingline.substack.com/p/news-prizepicks-switches-california) ·
[bettingusa PrizePicks Predict](https://www.bettingusa.com/prediction-markets/reviews/prizepicks-prediction-markets/) ·
[sportshandle Underdog exits sportsbook](https://sportshandle.com/underdog-abandons-traditional-sportsbook-for-prediction-markets/) ·
[gamingamerica Predict states](https://gamingamerica.com/news/1089354/underdog-launches-own-prediction-market-avoiding-some-states) ·
[gamedaymath PrizePicks math](https://www.gamedaymath.com/blog/prizepicks-math) ·
[upside.tools pricing](https://upside.tools/research/prizepicks-vs-underdog-pricing) ·
[stokastic demons/goblins](https://www.stokastic.com/articles/dfs-strategy/what-are-demons-and-goblins-at-prizepicks) ·
[unabated breakeven](https://unabated.com/articles/art-and-science-of-dfs-pickem-strategy) ·
[saturdaydownsouth Underdog states](https://www.saturdaydownsouth.com/dfs/underdog-fantasy/legal-states/) ·
[turtleevlabs](https://turtleevlabs.com/blog/underdog-fantasy-prop-tools)

**Cross-references in this repo**
`_HANDOFF-to-coding-agent.md` (fire on edge `e = p − q`, never on confidence — §8.2 supplies `q`) ·
`_competitor-mistakes-lessons.md` §2 (FTC earnings-claim graveyard — §8 closing constraint) ·
`_propfinder-teardown-final.md` (PF Rating reconstructed, no calibration published — same pattern:
the tooling layer publishes a rating, the operator layer publishes nothing) ·
`_gse-edge-lab-final.md`
