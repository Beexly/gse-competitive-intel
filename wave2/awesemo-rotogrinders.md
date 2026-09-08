# Awesemo / Stokastic + RotoGrinders — teardown

**Captured:** 2026-09-08 (all URLs fetched that day unless noted)
**Analyst method:** public surfaces only — marketing pages, sitemaps, article bodies served to anonymous
visitors, `robots.txt`-permitted paths, Google Play public review data, press releases, trade press.
No authentication, no paywall crossing, no disallowed paths, no endpoint scanning.
`www.stokastic.com/robots.txt` disallows `/api/`, `/account/`, `/admin/`, `/_next/` — **not fetched**.
`rotogrinders.com/robots.txt` disallows `/app`, `/grind-downs/`, `/api/`, `.csv` — **not fetched**.
**Companion files:** `_propfinder-teardown-final.md` (same method, prop-model target),
`_competitor-mistakes-lessons.md` (§1 Better Collective activist-short thesis — this dossier is the
product-level proof of that thesis), `_HANDOFF-to-coding-agent.md` (edge `e = p − q` doctrine).

---

## 0. TL;DR — the four findings that matter

1. **Both brands sell a simulation engine and neither publishes a single number about whether it is
   right.** Stokastic's 757-URL public article sitemap contains **zero** slugs matching
   `accura|calibrat|backtest|methodolog|track-record|hit-rate`. Their evidence artifact is a page of
   member screenshots that opens with the sentence *"These aren't our results — they're wins our
   members posted themselves."*
2. **The product boundary is a lineup count, and their own pages disagree on what it is.** Three
   Stokastic articles, live the same week, give the base tier's ceiling as **2,000 lineups**,
   **500 lineups**, and **20 lineups exported at a time**. The top tier's ceiling is not a number at
   all: *"The most simulation horsepower we offer."*
3. **Awesemo is a dead brand — `awesemo.com` returns `HTTP 301 → https://www.stokastic.com/`
   (verified by header, 2026-09-08).** RotoGrinders is a *hollowed* brand: Better Collective paid
   **€51m total** for it (60% in 2019 for $21m, remaining 40% Nov 2021 for €33m, 7.5x 2021 EBITDA),
   then cut 100+ jobs across the group in Oct/Nov 2024. Today rotogrinders.com's premium page still
   leads with a **2022 industry award badge**, its annual "RG MVP" tier reads *"Check back next
   season!"*, and its navigation carries ~23 social-casino affiliate pages.
4. **Stokastic has quietly pivoted to prediction markets.** In its article sitemap,
   `prediction-markets` is the **third-largest category at 124 articles — three times its NFL DFS
   count (41)**; 125 slugs match `kalshi|polymarket|prediction-market`. The DFS-tools business is
   being used to fund an option on the venue that is killing the affiliate model.

---

## 1. What happened to the brands (a dead brand is a lesson)

### 1a. Awesemo → Stokastic (rebrand, 2022) — the brand is retired, the company is not

| Fact | Evidence |
|---|---|
| Rebrand announced **July 6, 2022** | https://www.prnewswire.com/news-releases/awesemocom-rebrands-as-stokastic-to-reflect-growth-and-diversification-301581191.html |
| Stated reason: evolution into a "multi-platform sports media and analytics enterprise"; the name references **stochastic processes** — "statistical modeling of patterns that resist precise measurement" | same release |
| Cofounders named: **Tom Kennedy (CEO)**, **Alex Baker** (the original "Awesemo"), **Eddie Lai** | same release |
| Baker, verbatim: *"Changing the brand from Awesemo to Stokastic is both a nod to our team's statistical savviness and to all of the individuals that have made this company a huge success."* | same release |
| Claimed 12-month metrics at rebrand: **45 million page views**, **20 million views/listens** across YouTube+podcast, **100+ contributors** | same release |
| `https://www.awesemo.com/` → **HTTP/2 301, `location: https://www.stokastic.com/`** (headers captured 2026-09-08, served via Vercel/Cloudflare) | direct `curl -I`, 2026-09-08 |
| Sister property **OddsShopper** is Stokastic's own platform (named in the rebrand release; Stokastic article images are served from `oddsshopperassets.blob.core.windows.net`) | rebrand release + image URLs in Stokastic article payloads |

**NOT CONFIRMED and actively contradicted:** a search-engine synthesis suggested Better Collective owns
Stokastic. I found **no** primary source for that, and OddsShopper is documented as Stokastic's own
platform in Stokastic's own press release. **Treat Stokastic as independent of Better Collective.**

**Lesson for GSE:** the rebrand traded a *person* ("Awesemo," a named human with a verifiable
RotoGrinders #1 ranking) for an *abstraction* ("Stokastic," a Greek-root word for randomness). They
gave up the one asset in this category that is externally verifiable — a named operator with a public
scoreboard — in exchange for a name that sounds like math. GSE's founder-voice positioning is the
inverse trade and the right one (`_competitor-mistakes-lessons.md` §1, headwind 2: disintermediation
to individual voices).

### 1b. RotoGrinders → Better Collective — €51m in, stripped for parts

| Fact | Evidence |
|---|---|
| Better Collective acquired **60% of RotoGrinders Network for $21m (£16.6m)**, news public **May 28, 2019**; remaining 40% structured as an earn-out over 2022–2024 at 5x–10x EBITDA | https://www.affiversemedia.com/better-collective-secures-rotogrinders-takeover/ |
| Network brands acquired: **rotogrinders.com, pocketfives.com, sportshandle.com, usbets.com, pennbets.com** (a later account adds SharpSide) | affiversemedia.com (above); https://sportshandle.com/rotogrinders-network-better-collective/ |
| Cofounder **Cal Spears**, verbatim: *"Our combined goal is to be the largest US sports betting affiliate and we're in a great position to make it happen."* | https://sportshandle.com/rotogrinders-network-better-collective/ |
| **Nov 4, 2021**: Better Collective completed the remaining **40% for €33m** (€22m cash + balance in shares/cash), taking **100% to a total ~€51m ≈ 7.5x expected 2021 EBITDA** | https://www.globenewswire.com/news-release/2021/11/04/2327912/0/en/Better-Collective-completes-acquisition-of-remaining-shareholding-in-RotoGrinders-Network.html ; https://sbcamericas.com/2021/11/08/better-collective-completes-acquisition-of-remaining-40-stake-of-rotogrinders-network/ |
| **Oct/Nov 2024**: Better Collective cut **100+ jobs**; RotoGrinders casualties included **David Kitchen** and **Squirrel Patrol**; the four-year-running **Swolecast was killed**. Verbatim: *"one of the longest-running institutions in the DFS space is getting stripped down to its bare bones."* Stated cause: the parent *"made a really bad bet, forecasted a huge downturn in 2025 revenue, and then watched their stock tank."* | https://po-box.beehiiv.com/p/a-big-hit-to-the-dfs-space (published Nov 2, 2024) ; corroborated https://frontofficesports.com/action-network-playmaker-hq-layoffs-better-collective/ |
| **May 2025**: Better Collective appointed a co-CEO amid restructuring | https://sbcamericas.com/2025/05/02/better-collective-co-ceo-restructure/ |
| **NOT CONFIRMED:** reports that SVP **Dan Back** left in Feb 2026 after 15 years. Only surfaced via a LinkedIn profile in search results; I did not verify it on a public, citable page. | — |

**The visible decay, measured on the live site 2026-09-08:**
- `rotogrinders.com/premium` still leads with **"The 2022 Industry Award Winner / 2022 Best Written
  Content / 2022 Best Product Experience."** Four-year-old laurels are the header of the paid page.
- On the 6-or-12-month billing toggle, the flagship **RG MVP tier displays "Check back next season!"**
  instead of a price — a top tier you cannot buy annually.
- The SimLabs marketing screenshot uses **J. Fields / J. Love / A. Jones** as sample players — a frozen
  asset from roughly the 2021–2023 NFL era.
- The nav now carries **~23 social-casino affiliate pages** (Stake.us, Pulsz, McLuck, Wow Vegas…),
  **9 prediction-market referral pages** (Polymarket, Kalshi, Novig, ProphetX, Robinhood, Coinbase…),
  **10 sportsbook bonus-code pages**, and **9 DFS-app promo pages** (PrizePicks code `GRINDERS`,
  Underdog `$50 in Bonus Entries`, DK Pick6, Betr, Boom, Dabble, Sleeper, Chalkboard).
  Source: `https://rotogrinders.com/` and `https://rotogrinders.com/picklabs` nav, 2026-09-08.

**Lesson:** €51m bought a *content-plus-tools* business and turned it into an affiliate funnel with a
tools skin. This is `_competitor-mistakes-lessons.md` §1 rendered at the product level: when the
affiliate CPA erodes, the *tools* do not get funded — they get frozen — because the tools were never
the revenue, they were the SEO and the retention hook for the funnel.

---

## 2. HOW THE PRODUCT WORKS, MECHANICALLY

### 2a. Stokastic Sims — a *contest* simulator, not a game simulator

This is the sharpest technical distinction in the category, and Stokastic states it plainly:

> *"The **Stokastic Sims** (the Contest Sims) build a large pool of lineups shaped like the contest you
> are entering, using projected ownership, so that pool doubles as the modeled tournament field, and
> then play the slate out tens of thousands of times."*
> — https://www.stokastic.com/articles/dfs-strategy/stokastic-sims-settings (published 2026-09-04)

**What is simulated, per their own pages:**

| Layer | What they say | Source |
|---|---|---|
| **The field** | Pool size **is** the simulated field: *"A 2,000 pool is a 2,000-entry room for your lineups to compete against; a 10,000 pool models a large-field tournament."* Built from **projected ownership**. Changing pool size or the ownership/projection inputs **forces a re-run**; exposure caps, stack exposure and ROI boosts do not. | sims-settings |
| **The payout curve** | The pool is played *"inside the GPP payout structure we had selected, 25% to first."* A **percent-to-first** setting must be matched to the real contest before the sort means anything. | sims-settings; https://www.stokastic.com/articles/nfl-dfs/nfl-dfs-contest-simulator |
| **Duplication** | A **dupes column**, and *"dupes are baked into the simulated ROI, because a lineup that wins first place while duplicated by other entries is less profitable than a unique one."* Matters in showdown, not on a big main slate. | sims-settings; contest-simulator |
| **Correlation** | Not a rule but an emergent property: *"Builds QB plus pass-catcher stacks and bring-backs naturally, because the sims reward correlation instead of needing a rule for it."* | https://www.stokastic.com/articles/nfl-dfs/stokastic-review |
| **Player outcome distributions** | **NOT PUBLISHED.** No page I read states the distributional family, the variance model, how a median projection becomes a distribution, or the correlation structure between players. They contrast themselves with SaberSim, whose method they describe as *"play-by-play game simulation"* — implying Stokastic's own player-level draw is something else, but they never say what. | negative finding across all fetched articles |
| **Number of simulations** | Two different figures. The **contest** layer: *"tens of thousands"* of contest iterations (stated repeatedly and consistently). The **projection** layer, on the props side: *"runs high-level simulations, many times over, before each contest"* — no number. A search-engine summary of an older `-ac11/` URL claims "millions of simulations of each slate"; **I could not verify that on a live page** (those legacy URLs now serve the SPA shell with no article body). **Treat "millions" as NOT CONFIRMED.** | contest-simulator; https://www.oddsshopper.com/articles/betting-101/stokastic-projection-system |

**Outputs the tool surfaces per lineup:** simulated ROI, win rate, cash rate, projected points, total
ownership, stack shape/teams, dupes, "how often it won the contest, finished top 10, and at least
min-cashed." Plus three diagnostic tabs — **Player ROI**, **Stack ROI**, and **Exposures with
leverage** (defined as *"the gap between the field's projected ownership and your own"*).
(contest-simulator, sims-settings)

**User-facing controls:** pool size, field-ownership edits, custom projections via CSV upload
(*"upload a CSV with player name, projection and ownership"*), player exposure caps, stack exposure,
per-player/per-stack **ROI boosts**, percent-to-first, site (DK/FD), and **Late Swap** re-ranking after
early games lock.

**Their own governing rule, verbatim** — and it is a good one, worth stealing the spirit of:
> *"a change to a Sims setting is you telling the model something it does not already know. If you
> cannot say out loud what information your adjustment adds, do not make it. Adjust on information,
> never on instinct."* (sims-settings)

**The gap in the mechanism.** Every claim above is about *construction* — which of your lineups wins
a modeled field. Stokastic says so explicitly:
> *"The edge is not in the projections, it is in construction."* (contest-simulator)
That is an honest and defensible position, and it is also an admission: **the input probabilities are
never defended.** The entire tower — simulated ROI, leverage, dupes, win rate — is built on a median
projection and an ownership projection whose accuracy is nowhere measured on any public page.

### 2b. Stokastic props / OddsShopper — model EV with no settled record

The props side outputs three numbers per prop:
- **X-Win** — *"The expected win percentage of the bet, based on the projection"*
- **X-ROI** — *"The expected return on investment"*
- **Hold** — *"The book's built-in margin, the vig, on that market"*
— https://www.oddsshopper.com/articles/betting-101/stokastic-projection-system

Note what these are: **model-implied forward EV**, computed from their own projection, displayed as if
it were a result. There is no realized column. The sister subscription is **PortfolioEV**, marketed as
*"proven +EV strategies"* with a 7-day free trial (https://www.oddsshopper.com/subscribe) — "proven" as
adjective, with no linked substantiation on the subscribe page.

### 2c. RotoGrinders SimLabs + LineupHQ — the same idea, less of it

From `https://rotogrinders.com/simlabs` (2026-09-08), verbatim:
- Headline claim: *"Simulate every aspect of a DFS slate"* — three labeled layers: **Contest / Game / Field**.
- Outputs: *"Simulation Results / Projection & Ownership % / Lineup Correlation"* and a proprietary
  **"SimLabs Rating."**
- Workflow: pick a lineup count preset (**3-Max, 5-Max, 20-Max, MME, Custom**), pick a contest type
  (**Large / Small / Single / Cash**), include/exclude players.
- **Advanced Settings expose a blend slider**: *"Simulation Weight Medium · 66 (51.2%)"* and
  *"Projection Weight Low · 33 (25.6%)"*. A user-tunable mixing weight between the simulation and the
  raw projection, **with no stated basis for any setting** and no published effect on outcomes.
- Free entry: *"You can test the tool with one lineup, no credit card required."*
- **No simulation count is published anywhere on the page.**
- Social proof is **two tweets**, one of which is *"This seems so easy to use that I feel like I'm
  doing something wrong."*

**LineupHQ** (their classic optimizer) builds **up to 150 NFL lineups** from expert projections with
ownership percentages — per a competitor's FAQ, so treat as a competitor claim, though it is consistent
with the RG UI's "MME" framing:
https://www.stokastic.com/articles/nfl-dfs/stokastic-sims-vs-sabersim-vs-rotogrinders-nfl-2026

**`ResultsDB`** (RG's historical DFS contest-results database) **redirects to the premium paywall**
(`/resultsdb/nfl` → `302/… → /premium/nfl`, verified 2026-09-08). The one dataset that could ground a
claim is behind the sale.

**`rotogrinders.com/rankings` is public, live, and genuinely verifiable** — the RG Overall Rankings
leaderboard, *"updated weekly on Thursdays,"* with point totals per user (top: `youdacao` 130,773;
`ShaidyAdvice` 95,711; `iggydash` 89,494). **This is the single most honest artifact in either
company.** But note what it measures: *the users'* contest results, not RotoGrinders' own projections.
The company scores its customers and never scores itself.

---

## 3. WHAT THEY SELL AND AT WHAT PRICE — verbatim tier tables

### 3a. Stokastic NFL, quoted verbatim from their own page

> | Tier | Weekly | Monthly | Annual (still at the Early Bird rate) |
> |---|---|---|---|
> | NFL Core | $44.95 | $149.95 | $549.95 |
> | NFL Max | $64.95 | $229.95 | $749.95 |
> | NFL MVP | see pricing page | $349.95 | $1,299.95 |
>
> *"Prices below are checked against the live billing system as of September 1, 2026."*
> — https://www.stokastic.com/articles/nfl-dfs/stokastic-review

**Announced further increases** (same page): Core annual → **$649.95**, Max annual → **$899.95**,
MVP annual → **$1,499.95**. Monthly already stepped up Core $129.95 → $149.95 and Max $179.95 → $229.95
on Sept 1, 2026. Pre-Sept-1 "Early Bird" table (same numbers before the step-up) is at
https://www.stokastic.com/articles/nfl-dfs/stokastic-nfl-core-vs-max-vs-mvp.

**Naming drift worth noting:** the pricing page uses **Core / Max / MVP**, while the underlying packages
are still called **"NFL Data + Sims"** and **"NFL Sims MAX"** — both names appear on their own pages the
same week. Older articles use only the Data+Sims / Sims MAX names.

### 3b. THE PRODUCT BOUNDARY — and their three contradictory versions of it

**What is gated is lineup capacity, nothing else.** Verbatim:
> *"Core and Max include the same data… The separation is capacity: how many lineups the Contest Sims
> will build and simulate for you on a Sunday."*
> — https://www.stokastic.com/articles/nfl-dfs/stokastic-nfl-core-vs-max-vs-mvp

> | Tier | Package | Contest Sims Ceiling | Built For |
> |---|---|---|---|
> | NFL Core | NFL Data + Sims | Up to 2,000 lineups | Cash games, single-entry, small GPP portfolios |
> | NFL Max | NFL Sims MAX | Up to 10,000 (classic), up to 50,000 (showdown) | 20-max and mass-entry players |
> | NFL MVP | The top tier | **The most simulation horsepower we offer** | Professional volume |
> — same URL

**The contradiction.** Three live Stokastic pages, all fetched 2026-09-08, state the base tier's
ceiling three different ways:

| Page | Base-tier limit stated |
|---|---|
| `/articles/nfl-dfs/stokastic-nfl-core-vs-max-vs-mvp` | *"Up to 2,000 lineups"* |
| `/articles/nfl-dfs/nfl-dfs-contest-simulator` | *"up to 500 on the base package or up to 10,000 on the top package"* and *"You can build up to 500 lineups in the generator on the base package"* |
| `/articles/nfl-dfs/nfl-dfs-contest-simulator` (closing CTA) | *"the base **Data + Sims** tier lets you **export up to 20 lineups at a time**, and **Sims MAX** unlocks the full 10,000-lineup simulations with **unlimited exports**"* |
| `/articles/dfs-strategy/stokastic-sims-settings` | describes *"a Contest Generator pool of 5,000 lineups"* as the worked example, and separately says the basic MLB Contest Generator builds up to 500 while *"the full package gives you the option of up to 5,000"* |

So the real boundary is likely **two** limits — a *build/simulate* ceiling and a separate *export*
ceiling — and the export ceiling (**20 at a time** on the base tier) is the one that actually bites a
150-max player. Neither the pricing page nor any single article states both cleanly.
**The top tier's limit is not a number.** A customer paying **$1,299.95/yr** is buying
*"the most simulation horsepower we offer."*

**Sports included:** NFL, NBA, MLB, NHL, PGA, NASCAR, UFC/MMA, CFB (site meta description).
**Pricing is per-sport**, not a bundle: *"Stokastic's per-sport tiers change with the season."*
Contest Sims are on **Data + Sims and Sims MAX tiers** only. Separate **Stokastic Props** packages
exist for pick'em (PrizePicks/Underdog/Sleeper/Kalshi/Polymarket) with their own tab on the pricing
page; **their price is NOT CONFIRMED** — the pricing page is client-rendered and I did not authenticate.

**Free tier:** a real free Sims entry point exists at `tools.stokastic.com/dfs-sims-for-free` (linked
from many articles). **Its exact limit is NOT CONFIRMED** — the tools app is a client-rendered SPA and
I did not sign in.

**Discount-code density is itself a finding.** Across the pages I read I collected live codes
`SIMTUNE10`, `DFSTOOLS`, `SIMSDUEL10`, `NFLCONTEST10`, `HOF10`, `PROPS10`, `NFLKICKOFF10`,
`rgmvpbanner`, `rgpro` — a different coupon per article, each deep-linking to
`/pricing?sport=…&coupon=…&interval=…`. Competitor V12 calls this out: Stokastic's real pricing is
*"often gated behind coupon signup pages"* (https://www.v12dfs.com/stokastic-alternative).

### 3c. RotoGrinders Premium, quoted verbatim from `rotogrinders.com/premium` (2026-09-08)

Header, verbatim: *"Supercharge your DFS strategy with **the #1 Optimizer and Simulation Platform**"*
and *"at a cost that won't drain your bankroll!"*

| Tier | 3-day trial | Monthly | 6-or-12-month | What's in it (verbatim bullets) |
|---|---|---|---|---|
| **RG DFS** | **$19.99 for 3 days**, then $99.99/mo | **$99.99** | **$66.66/month — $799.99 billed annually** | Full LineupHQ access with player projections and ownership percentages for **10+ sports**; Full SimLabs access (NFL, NBA, MLB, PGA, and more); Advanced tools and data incl. PlateIQ, CourtIQ; Premium articles and strategy |
| **RG MVP** ("Best Offer") | **$29.99 for 3 days**, then $129.99/mo | **$129.99** | **"Check back next season!"** | Everything in RG DFS + RG Props; LineupHQ, SimLabs; PickLabs with EV, Hit Rate, and Analysis; Fantasy Pick'em tools and Prop Model Top 20 Bets |
| **RG Props** | **$14.99 for 3 days**, then $39.99/mo | **$39.99** | **$33.33/month — $399.98 billed annually** | PickLabs for betting and DFS pick'em; EV, Hit Rate, Analysis on the Pick Board; Pick'em tools for PrizePicks, Underdog, DK Pick 6, Sleeper, Splash; Prop Model Top 20 Bets |
| **Single Sport** (NFL, MLB, NBA, NHL, NAS, PGA, CFB, CBB, SOC, MMA, F1, UFL, WNBA) | **$9.99 for 3 days**, then $74.99/mo | **$74.99** | **$35.41/month — $425 billed annually** | LineupHQ Optimizer for that sport; SimLabs access; Premium articles |

**Boundary observations:**
- The 3-day trials are **paid** trials that roll into full price — $19.99 to $29.99 for three days.
  A user who forgets is at $99.99–$129.99/mo. (Compare `_competitor-mistakes-lessons.md` §2 on ROSCA /
  negative-option exposure.)
- **RG MVP has no annual price** — "Check back next season!" on the flagship.
- **RG's headline claim "#1 Optimizer and Simulation Platform"** is unsubstantiated on the page; the
  only supporting artifacts are the 2022 award badges.
- **"PickLabs with EV, Hit Rate, and Analysis"** — "Hit Rate" is sold as a feature. Whether that hit
  rate is a *realized settled* rate or a *model-implied* one is **NOT CONFIRMED**; the PickLabs board
  is client-rendered behind the paywall and I did not authenticate. The parallel Stokastic product
  (X-Win/X-ROI) is explicitly model-implied, which is the way to bet.

### 3d. The rest of the field (for price context, all from Stokastic's own comparison page, 2026-08-18)

| Tool | Price | Lineup limit |
|---|---|---|
| SaberSim | **$97 / $197 / $297 per month**, 7-day trial for $7 | Starter caps **500** lineups; Pro and Ultimate **5,000**. Contest simulations + full ROI suite only on the **$297 Ultimate** tier |
| RotoGrinders LineupHQ | $74.99/mo, $425/yr | up to **150** NFL lineups |
| V12 DFS (challenger) | **$99/mo flat**, 7-day trial | MLB + NBA only |

Sources: https://www.stokastic.com/articles/nfl-dfs/stokastic-sims-vs-sabersim-vs-rotogrinders-nfl-2026
(SaberSim/RG figures are Stokastic's characterization of competitors — treat accordingly);
https://www.v12dfs.com/stokastic-alternative (V12's own price, and its criticism of Stokastic:
*"~$120/mo all-access, spread across a confusing maze of tiers (Platinum / Premium / Core / Sims)"*,
*"A real learning curve and a dense, click-everything web UI"*, *"No way to drive it from an AI agent —
you operate every tool by hand"*).

---

## 4. ACCURACY: WHAT THEY CLAIM vs WHAT THEY PROVE

### 4a. The claims

| Claim, verbatim | Where |
|---|---|
| *"The most accurate DFS projections, ownership data, and simulations for NFL, NBA, MLB, NHL, PGA, NASCAR, UFC & CFB."* | Stokastic site-wide `<meta name="description">` and `og:description`, captured from the page payload 2026-09-08 |
| *"Win more on DraftKings & FanDuel with tools from the #1 ranked DFS player."* | same meta description |
| *"the #1 Optimizer and Simulation Platform"* | rotogrinders.com/premium |
| *"reliable projections"* | rotogrinders.com/premium |
| *"proven +EV strategies"* | oddsshopper.com/subscribe |
| *"Alex 'Awesemo' … is a Milly Maker winner himself and spent years ranked as the No. 1 DFS player in the world."* | stokastic.com/articles/nfl-dfs/stokastic-review |

### 4b. The proof — and there is none

**Negative finding, measured:** I pulled Stokastic's full public article sitemap
(`https://www.stokastic.com/sitemaps/articles.xml`, **757 URLs**, 2026-09-08) and grepped the slugs for
`accura|calibrat|backtest|methodolog|track-record|our-results|hit-rate`. **Result: 0 matches.**
The main sitemap (`/sitemap.xml`, 32 URLs) has no accuracy, results, or methodology page either.
There is no `/results`, no `/calibration`, no `/accuracy`, no reliability diagram, no Brier score, no
MAE on projections, no ownership-projection error, no ROI ledger, no CLV.

**What stands in for proof is a testimonial page, and they say so.** From
https://www.stokastic.com/articles/dfs-strategy/stokastic-hall-of-fame-winners (published 2026-09-05):

> *"The Stokastic Hall of Fame is where we celebrate the real DFS players cashing big with the Stokastic
> Sims. **These aren't our results — they're wins our members posted themselves.**"*

The page's content is six X/Twitter posts from members, dated Aug 25–29 2026, including one that reads
in its entirety *"jfrank017 If you are interested"* — a post with no result in it at all, presented as a
winner. The page closes with an FTC-shaped disclaimer:
> *"Hall of Fame posts are shared by real Stokastic members. Individual results vary — DFS involves
> risk, only play with money you can afford to lose, and if it stops being fun, step away."*

**Their second proof surface is case studies of outliers**, with a caveat they deserve credit for:
> *"The caveat I'm obligated to give and would give anyway: these are the top of a very wide
> distribution. No tool changes what happens on the field, nobody can promise you a profit, and
> **most subscribers in a given week lose**, because most entrants in a given Milly Maker lose."*
> — https://www.stokastic.com/articles/nfl-dfs/stokastic-review

That sentence is the most honest thing either company publishes, and it is buried in a review the
author opens by admitting: *"I work at Stokastic. I am not going to pretend this is a neutral thing."*
The review's canonical slug is `stokastic-review` — i.e. **the company owns the SERP for its own
review query.** (RotoGrinders does the same thing structurally: it owns `rotogrinders.com/rankings`,
the leaderboard that decides who counts as a "top-ranked DFS expert," and then sells subscriptions
based on access to *"top-ranked DFS experts."*)

**RotoGrinders proof:** the 2022 award badges, and the public Rankings leaderboard (which measures
users, not the product). No projection-accuracy page, no settled record for PickLabs or the Prop Model.
`ResultsDB` — the historical contest data that could ground an argument — is behind the paywall.

**Net:** two of the largest tools businesses in DFS, at $99.99–$1,499.95 a year, publish **zero**
out-of-sample evidence that their numbers are right. This matches the `_propfinder-teardown-final.md`
finding (PF Rating formula reconstructable, no calibration published) and is now a confirmed
category-wide pattern across four teardowns.

---

## 5. WHAT CUSTOMERS SAY IS MISSING OR WRONG

Reddit is not fetchable by this agent and Trustpilot returned a WAF challenge (403) to both fetch
paths. The best available public complaint corpus is the **Google Play listing for
`com.rotogrinders.rg_lineups`** ("RotoGrinders Daily Fantasy," **4.7 stars, 3.36K reviews, 50K+
downloads, Contains ads, In-app purchases**, page fetched 2026-09-08). Verbatim, with the star rating
and date the store returns:

> **[1★ 2024-08-26]** *"**$99 a month for info you can get for free elsewhere.** Lineup feature was
> clunky and glitches constantly. Maybe some updates will help it, if so I'd update my rating but until
> then this just is not worth the cost."*

> **[1★ 2023-09-30]** *"Its just a waste of money… **What they say you will get from the subscription
> and the actual thing you get is different.** I have subscribe the PROPS AND PICK'EM because in a
> simple English, one benefit you get is Expert analysis for Player Prop Bets across all sports. But
> what you actually get is 2 players and you need Premium…"*

> **[1★ 2021-01-12]** *"after playing for years, I don't think I've ever won a contest. I suggest going
> elsewhere. I've literally won more money blindly picking random players… **Their 'algorithm' is
> disgustingly bad.**"*

> **[1★ 2021-11-03]** *"Not as flexible as the site… **it doesn't let you export only the line ups you
> like. It only give you the option the export all the line ups built.**"*

> **[1★ 2020-08-22]** *"Crashes way too often. Most important feature, **LHQ, doesn't even work half
> the time**. Desktop version is solid, but the app is beyond underwhelming."*

> **[3★ 2020-08-14]** *"When you make a lineup and switch off of the app to enter it on DraftKings
> **the lineup disappears and you have to do it over.**"*

> **[1★ 2018-12-15]** *"I really want to pay for a subscription because I like the information they
> provide but I'm not paying 30$ a month for an app that's garbage."*

**Themes, ranked:**
1. **Feature-vs-billing gap** — "what they say you will get… and the actual thing you get is
   different," and the upsell-inside-the-tier pattern (subscribed to Props, still told to buy Premium).
2. **Price-to-substance** — "$99 a month for info you can get for free elsewhere." Note that RG's
   monthly price has not moved since (still $99.99 in 2026).
3. **The model is never accountable to the user.** "I don't think I've ever won a contest… their
   algorithm is disgustingly bad." The customer has no way to check this and neither does the company —
   because nobody publishes a record. That grievance is *unfalsifiable in both directions*, which is
   exactly the failure mode a published ledger fixes.
4. **Export friction** — all-or-nothing export; no partial export of favorited lineups on the app.
5. **Chronic reliability** — crashes, login failures, stale/late data.

**The vendors' own admissions of the same weaknesses** (useful, because they are unarguable):
- Stokastic names four groups who should **not** subscribe: cash-only players, single-entry
  Sunday-morning players, **"players who will never adjust the model"** (*"using a $149.95 tool as a $20
  projection sheet. They cancel by October and they are right to"*), and pick'em players.
  (stokastic-review) — i.e. **their own churn diagnosis is that the product only works for the small
  minority who hand-tune it every week.**
- Support-channel questions they publish: how far to move exposures, whether tweaks survive a
  projection update, and *"the boost arrow most people click in the wrong place"* — users are pressing
  the **field-ownership** arrows when they mean to change **their own exposure**. That is a
  conceptual-model failure in the UI on the single most important distinction in the product.
  (sims-settings)
- V12: *"A real learning curve and a dense, click-everything web UI"* and *"No way to drive it from an
  AI agent — you operate every tool by hand."* (v12dfs.com/stokastic-alternative)

---

## 6. THE SEAM — what GSE can do that they cannot or will not

### Seam 1 — Publish the record. They structurally cannot.
Stokastic's business is **construction advice under a $150–$350/mo subscription** whose value story is
"the field is beatable and we shape your lineups." A published, out-of-sample calibration curve on the
underlying projections and ownership would put a number on the input layer that the whole tower rests
on — and their own review already concedes *"most subscribers in a given week lose."* RotoGrinders is
worse positioned: it is an affiliate funnel owned by a listed company under revenue pressure; an honest
accuracy page reduces click-through to PrizePicks/DraftKings, which is where the money actually is.
**Neither will ever publish a reliability diagram.** GSE's Glass Ledger (`_HANDOFF-to-coding-agent.md`
Phase 2) is the exact artifact the category has structurally excluded. Do not describe it as "better
analytics." Describe it as *the thing none of them will show you.*

### Seam 2 — They sell EV without a settled column. GSE settles.
`X-Win`, `X-ROI`, `Hold` (Stokastic/OddsShopper) and `EV, Hit Rate, Analysis` (RG PickLabs) are all
**forward, model-implied** numbers displayed in the position where a result belongs. GSE already
refuses to render any metric lacking coverage denominator + Wilson LCB + CLV + walk-forward provenance
(the display-only-substantiated-results guard). **Ship the "measured vs modeled" split as a visible UI
convention** — every number labeled either `modeled` or `settled (n=…)`. That one label is a
differentiator no incumbent can copy without publishing a record they do not have.

### Seam 3 — Their product boundary is a lineup counter. GSE's is an honesty boundary.
Stokastic gates **capacity** (2,000 / 10,000 / 50,000 / "the most horsepower we offer"). SaberSim gates
capacity (500 / 5,000) and puts contest sims themselves behind the $297 tier. RotoGrinders gates
sports (Single Sport $74.99 vs RG DFS $99.99). **Every paywall in this category is an artificial
resource limit** — the marginal cost of 2,000 vs 10,000 simulated lineups is a rounding error, and the
customer knows it. GSE's ladder (`pricing/pricing-phases.ts`) gates on *proof earned*, not on compute
rationed, and every step-up is triggered by a verified milestone. Say that out loud in the pricing
copy: **"We don't charge you more to run the same math more times."**

### Seam 4 — Field/ownership modeling is a real capability GSE does not have, and mostly does not need.
Be honest internally: the Contest Sims' modeling of the *opposing field* via projected ownership,
including dupes inside simulated ROI, is genuine and non-trivial engineering. GSE should **not** try to
out-build it for DFS. But the transferable idea is exact and cheap: **ownership is a crowd-consensus
prior, and leverage is the gap between the crowd's number and yours.** That is structurally identical
to GSE's `e = p − q` where `q` is the no-vig market implied probability. **The market line is GSE's
ownership projection, and it is a better one** — it is priced by money rather than estimated, it is
timestamped, it is externally auditable, and it settles. Frame GSE's edge engine to the DFS-literate
audience as *"leverage, but against the closing line instead of against a guess at the field."*

### Seam 5 — Both are frozen. Ship visible recency.
RG's paid page leads with 2022 awards, shows Jordan Love/David Montgomery-era screenshots, and cannot
price its own flagship annual tier. Stokastic's own tier pages contradict each other on the base
limit (2,000 vs 500 vs export-20) and its top tier has no stated limit. **A live "as of" timestamp on
every GSE surface, plus limits stated as one number in one place, is a two-day build and a permanent
contrast.** (GSE already has `/api/ops/public-surface-truth` with a self-reported `generatedAt` — put
that on the marketing pages, not just the ops surface.)

### Seam 6 — The affiliate conflict is now visible on the competitor's own nav. Attack it by name.
`rotogrinders.com` carries ~23 social-casino pages, 10 sportsbook bonus codes, 9 DFS-app promos and 9
prediction-market referral codes **in the same navigation as the "expert picks."** GSE takes no
affiliate revenue (`_HANDOFF-to-coding-agent.md` §1). The line writes itself and is factually
defensible with a screenshot: **"Their picks page and their casino signup page are the same page."**
Keep it to verifiable structure — nav contents, not motive.

### Seam 7 — Prediction markets: they are already moving. Move faster, and move differently.
Stokastic's `prediction-markets` category is **124 articles — 3x its NFL DFS output** — with 125 slugs
touching Kalshi/Polymarket, including `kalshi-fees-vs-dfs-rake` and `kalshi-vs-prizepicks`.
RotoGrinders sells 9 prediction-market **referral codes**. Both are treating Kalshi as *content and
affiliate inventory*. GSE's plan (`_competitor-mistakes-lessons.md` §4) treats Kalshi as a **read-only
CLV price source with Pinnacle primary** — a measurement instrument, not a funnel. That is the
defensible use and it is the one nobody else is making. **The window is now, and Stokastic's article
volume says they see the same thing.**

### Seam 8 — Agent-readability is an unclaimed lane.
V12's public criticism of Stokastic — *"No way to drive it from an AI agent — you operate every tool by
hand"* — is true of RotoGrinders too. Both are click-heavy SPAs; both `Disallow: /api/`. GSE's
AI-citation strategy (llms.txt, structured data, the open `recompute.ts` verifier) means an agent can
*check* GSE's claims, not just read them. **"An AI can verify our record without asking us"** is a
position that requires publishing a record — which loops back to Seam 1 and is why it is defensible.

---

## 7. WHAT I COULD NOT CONFIRM

- **Stokastic's exact simulation counts at the player/projection layer.** They publish "tens of
  thousands" for the *contest* layer only. The widely-repeated "millions of simulations of each slate"
  figure traces to search-engine summaries of legacy `-ac11/` URLs which now serve an empty SPA shell.
  **NOT CONFIRMED.**
- **Any player-outcome distribution, variance model, or correlation structure.** Never published.
- **Stokastic Props package pricing**, and **non-NFL sport pricing.** The `/pricing` page is
  client-rendered (empty RSC payload) and I did not authenticate.
- **The exact limit of the free Sims tier** at `tools.stokastic.com/dfs-sims-for-free` (SPA, not
  signed in).
- **Whether RG PickLabs' "Hit Rate" is realized or model-implied.** Board is behind the paywall.
- **Dan Back's Feb 2026 departure from RotoGrinders** — surfaced only via a LinkedIn result, no citable
  public page found.
- **A RotoGrinders-specific impairment line** in Better Collective's FY2024/FY2025 reports. The
  group-level €33.8M Action Network impairment is already recorded in
  `_competitor-mistakes-lessons.md` §1; I did not open the annual-report PDFs to look for an RG-specific
  figure.
- **Whether Stokastic is profitable, its subscriber count, or its current ownership beyond the 2022
  founder set.** No public filings.
- **Trustpilot / Reddit sentiment.** Trustpilot returned an AWS WAF 403 to both attempted paths;
  reddit.com is not accessible to this agent. The complaint corpus in §5 is Google Play only and skews
  toward mobile-app defects; treat it as directionally real but not a full sentiment picture.

---

## 8. SOURCE LIST (every URL read for this dossier, 2026-09-08)

**Stokastic**
- https://www.stokastic.com/robots.txt · /sitemap.xml · /sitemaps/articles.xml (757 URLs)
- https://www.stokastic.com/articles/nfl-dfs/stokastic-review
- https://www.stokastic.com/articles/nfl-dfs/stokastic-nfl-core-vs-max-vs-mvp
- https://www.stokastic.com/articles/nfl-dfs/nfl-dfs-contest-simulator
- https://www.stokastic.com/articles/nfl-dfs/stokastic-sims-vs-sabersim-vs-rotogrinders-nfl-2026
- https://www.stokastic.com/articles/dfs-strategy/stokastic-sims-settings
- https://www.stokastic.com/articles/dfs-strategy/best-dfs-tools
- https://www.stokastic.com/articles/dfs-strategy/stokastic-hall-of-fame-winners
- https://www.awesemo.com/ (301 header check)
- https://tools.stokastic.com/robots.txt (returns the SPA shell, not a robots file) · /dfs-sims-for-free

**OddsShopper (Stokastic sister brand)**
- https://www.oddsshopper.com/robots.txt · /subscribe
- https://www.oddsshopper.com/articles/betting-101/stokastic-projection-system

**RotoGrinders**
- https://rotogrinders.com/robots.txt · / · /premium · /premium/nfl · /simlabs · /simlabs/nfl
- https://rotogrinders.com/picklabs · /rankings · /lineuphq/nfl · /resultsdb/nfl (redirects to paywall)
- https://play.google.com/store/apps/details?id=com.rotogrinders.rg_lineups

**Corporate / trade press**
- https://www.prnewswire.com/news-releases/awesemocom-rebrands-as-stokastic-to-reflect-growth-and-diversification-301581191.html
- https://www.affiversemedia.com/better-collective-secures-rotogrinders-takeover/
- https://sportshandle.com/rotogrinders-network-better-collective/
- https://www.globenewswire.com/news-release/2021/11/04/2327912/0/en/Better-Collective-completes-acquisition-of-remaining-shareholding-in-RotoGrinders-Network.html
- https://sbcamericas.com/2021/11/08/better-collective-completes-acquisition-of-remaining-40-stake-of-rotogrinders-network/
- https://sbcamericas.com/2025/05/02/better-collective-co-ceo-restructure/
- https://po-box.beehiiv.com/p/a-big-hit-to-the-dfs-space
- https://frontofficesports.com/action-network-playmaker-hq-layoffs-better-collective/

**Competitor commentary**
- https://www.v12dfs.com/stokastic-alternative
