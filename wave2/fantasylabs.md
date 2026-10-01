# FantasyLabs — Deep Teardown

**Target:** fantasylabs.com
**Captured:** 2026-09-08 (all fetches this date unless a source is itself dated)
**Method:** public surfaces only — marketing pages, partner pricing landing pages, the public Zendesk help-center content API, public JS/HTML served to anonymous visitors, App Store / Google Play listings, published articles. No authentication, no paywall crossed, no endpoint scanning.
**robots.txt:** `https://www.fantasylabs.com/robots.txt` is 14 bytes and reads exactly `User-agent: *` with **no `Disallow` lines**. Nothing on the host is robots-excluded. (Verified by direct fetch, 200, byte count 14.)
**Companion files:** `_propfinder-teardown-final.md` (same "the rating is a scorecard, not a model" pattern), `_competitor-mistakes-lessons.md` (§1 Better Collective activist short thesis — FantasyLabs is *inside* that entity; §2 FTC earnings-claim graveyard), `_HANDOFF-to-coding-agent.md` (§5 overfitting guards — this dossier is the field example of what happens without them).

---

## THE ONE-PARAGRAPH VERSION

FantasyLabs is a **DFS research platform whose core product is a user-built linear scorecard** ("Player Models": 100 slider points to spend across factors) evaluated against a **salary-relative yardstick they invented called Plus/Minus** — actual fantasy points minus the points a player of that salary historically scores. Bolted on top is **SimLabs**, a genuine contest simulator that simulates a slate "thousands of times", builds a lineup pool, **shapes that pool to resemble a projected contest field across four field types**, then simulates the contest itself thousands of times and rates each lineup 0–99 on five axes (Projection, pOWN, Top 100, ITM, SimWgt). All of that is **precomputed server-side before the user opens the tool** — "all of the above happens long before you ever even open the tool!" — which is why the user-facing controls are five weight sliders and a "Results Range" diversity dial rather than a sim count. **The published simulation count is, everywhere, the word "thousands." There is no number.** Their killer research feature, the **Trends tool, is a backtester with no statistical control whatsoever**: their own official tutorial walks a user from n≈65,000 down to n=336 while Plus/Minus climbs from −0.87 to 4.58, names the danger in a sentence ("Trends with tiny sample sizes are also more prone to variance"), and ships **no holdout, no purging, no embargo, no multiple-testing correction, no confidence interval, and no out-of-sample fold**. The Models tool does the same thing with a one-click verdict — *"Basically, we tell you in an instant if your model would have won in the past."* **Their entire published performance record for 2025 is a single JPEG of a cumulative-profit curve with no n, no ROI, no win rate, no confidence bound and no methodology.** They sell All Access at **$69.95/mo** with the product boundary being **"Optimize up to 300 lineups in each sport"**, and they monetize the same audience a second time through **sportsbook and prediction-market affiliate promo codes** (Kalshi code `LABS`, Novig code `BCLABS`) — because they are a Better Collective asset.

---

## CORPORATE — they are inside the activist-short thesis we already documented

| Fact | Source |
|---|---|
| FantasyLabs was one of three companies The Chernin Group combined to form **The Action Network in 2017** | https://www.fantasylabs.com/articles/fantasylabs-acquired-chernin-group/ ; corroborated by search summary of https://www.actionnetwork.com/press/the-action-network-acquired-by-better-collective-for-240m |
| **Better Collective acquired The Action Network for $240M** (announced May 3, 2021) — FantasyLabs travels with it | https://www.actionnetwork.com/press/the-action-network-acquired-by-better-collective-for-240m ; https://awfulannouncing.com/online-outlets/better-collective-buys-action-network-for-240-million.html |
| Better Collective also owns **RotoGrinders Network** (60% in 2019, remaining 40% for $38M in 2021) | https://www.globenewswire.com/news-release/2021/11/04/2327912/0/en/Better-Collective-completes-acquisition-of-remaining-shareholding-in-RotoGrinders-Network.html |
| **Live technical integration confirmed, not just corporate:** the anonymous-visitor HTML of `fantasylabs.com/subscribe` loads `https://bam-static.actionnetwork.com/0.0.2/bam-scripts/bam-scripts.esm.js` and `bam-scripts.css`, and article pages load `https://assets.actionnetwork.com/889554_checkmark.png` | direct fetch of https://www.fantasylabs.com/subscribe and .../articles/picklabs-fantasylabs-new-tool-for-player-props-and-dfs-pickem-edges/ |
| **The mobile apps ship under RotoGrinders, not FantasyLabs.** Seller on all three iOS listings is **"Rical LLC"**, developer "RotoGrinders" | https://apps.apple.com/us/app/fantasylabs-fantasy-football/id6744127907 ; https://apps.apple.com/us/app/dfs-lineup-optimizer-simlabs/id6504044457 ; https://apps.apple.com/us/app/picklabs-player-prop-picks/id6756588908 |
| The PickLabs prop model **originated on ScoresAndOdds**, a sister property: "Launched in early 2022 as a capper on our sister site, ScoresAndOdds" | https://www.fantasylabs.com/articles/picklabs-fantasylabs-new-tool-for-player-props-and-dfs-pickem-edges/ |

**Why this matters for GSE.** `_competitor-mistakes-lessons.md` §1 documents The Bear Cave's activist short thesis on Better Collective (BETCO) — four structural headwinds against affiliate media, plus an FY2025 filing showing Action Network / NA revenue down >$9M and a €33.8M impairment. **FantasyLabs is not an adjacent competitor to that thesis. It is an asset inside it.** Every strategic constraint we identified on the parent — affiliate-CPA dependence, traffic dependence, prediction markets that pay no affiliate — is a constraint on FantasyLabs' roadmap.

---

## INFRA — the stack is a decade old and it constrains them

Observed in the anonymous-visitor HTML of `/subscribe`:

- **AngularJS 1.3.8 and 1.2.26**, loaded from `ajax.googleapis.com`. AngularJS reached end-of-life in Dec 2021. Two different major-minor versions load on the same page.
- **jQuery 1.11.1** (2014) alongside it.
- `ui-bootstrap-tpls-0.12.0.min.js`, `bootstrap-toastr`.
- App-specific bundles: `/PlayerModel/css/player-model.css`, `/app/common/js/angular-core.js?version=0.7.0145`, `/account/js/membership.js`, `/Stripe/js/stripe-subscribe.js`, `/bundles/core/js?v=...` (ASP.NET-style bundle hashes → **.NET backend**).
- Article/marketing pages are a **separate WordPress install** on S3 (`si-fl-wp.s3.amazonaws.com/wp-content/uploads/...`), with YARPP related-posts. So the marketing site and the app are two different systems.
- Pricing is **client-rendered**: `/pricing/`, `/pricing/main` and `/pricing/reactivation/` all 302 to `/subscribe` (Cloudflare), and `/subscribe` returns navigation chrome with no price strings in the HTML. Partner landing pages (`/pricing-al/`, `/pricing-ows/`, `/pricing-etr/`, `/pricing-bain/`, `smizzle.fantasylabs.com/pricing/`) are server-rendered and **are** where the real tier tables live.

**Read:** a 2015-era AngularJS + .NET monolith carrying a 2023-era simulation product. That is why SimLabs is precomputed batch-and-serve rather than interactive — and it is why their "sims" number is a marketing adjective rather than a user-facing parameter. It also means a client-side per-user simulation loop, which is what a modern competitor does, is a rewrite for them, not a feature.

---

## PRODUCT MECHANICS — priority 1, answered

### 1. Player Models: a 100-point user-weighted scorecard, not a model

From the official MLB Models overview (https://support.fantasylabs.com/hc/en-us/articles/219617488-MLB-Models-Overview), verbatim:

> "Our innovative Player Models tool is completely customizable, allowing you to weigh a variety of stats as you see fit, backtest how well the combination has worked in the past, and ultimately create extremely accurate, powerful player ratings that update in real-time."

> "Player ratings are generated by your personal weighting of a variety of factors, as shown on the right – (Vegas Score, Lineup Order Percentile, Park Factor, and much more)."

> "adjust the sliders on the right to where you want them (**you have 100 points to "spend"**), then click 'Update.'"

> "You will need to repeat this process for each position, depending on the sport (batters, pitchers, QBs, RBs, etc.) and each site (DraftKings, FanDuel, or Yahoo)."

**This is structurally the same finding as the PropFinder teardown's "PF Rating is a scorecard, not a model."** A user allocates 100 points across factors; the product multiplies and sums. There is no fitting, no regularization, no cross-validation. The *user* is the optimizer, and the user is optimizing by eye against a displayed historical score.

They also ship **"Pro Models"** built by in-house experts that a user copies and then edits (same article, §2).

### 2. Plus/Minus — the yardstick, and why it is not a market yardstick

> "Plus/Minus is a unique FantasyLabs metric that is at the core of all of our tools. It is defined as **actual fantasy points minus expected fantasy points based on salary**."
> "As an example, a $5,000 batter on DraftKings might be expected to score 8.0 points. If he scores 10.0 points in a game, he's turned in a Plus/Minus of +2.0."
> — https://support.fantasylabs.com/hc/en-us/articles/219617488-MLB-Models-Overview

Also defined in the same article: **Consistency** (% of games matching/exceeding expected points), **Upside** (% of games ≥ ½ SD above expected), **Dud** (% of games ≥ ½ SD below expected).

**The critical property:** Plus/Minus is measured against a **salary curve set by DraftKings/FanDuel**, not against a **price set by a betting market**. That is a real and defensible benchmark *for DFS value*, and it is genuinely more honest than a raw points projection. But it is **not** a market-efficiency benchmark. Beating a DFS salary curve says nothing about whether you beat a closing line. There is **no CLV anywhere in this product.**

### 3. The historical grade they show you — and its exact statistical status

> "The overall historical Plus/Minus rating of the model will show up on the right above the weights as a way to immediately grade the effectiveness of your model. **Basically, we tell you in an instant if your model would have won in the past.**"

> "To view the historical performance of your model, click on the Plus/Minus on the right-hand side of the model page... This will show you the historical Plus/Minus percentiles for your model. The **"R2" number** at the top right measures the correlation between the model's player ratings and historical Plus/Minus. For reference, 0 means no correlation, while 1 means perfect correlation. The higher the correlation, the surer you can be that the players rated highly in your models will generate value."
> — https://support.fantasylabs.com/hc/en-us/articles/219617488-MLB-Models-Overview

**This is the whole ballgame.** The user adjusts sliders → the product instantly re-scores against the *same* historical sample → the user adjusts again toward a higher number. That loop is **in-sample optimization with an unbounded number of implicit hypothesis tests and zero correction**. The R² shown is an in-sample R². The sentence "the surer you can be that the players rated highly in your models will generate value" is an explicit invitation to read in-sample fit as out-of-sample confidence.

Against `_HANDOFF-to-coding-agent.md` §5, they are missing **every single guard**: no purged/embargoed walk-forward, no untouched holdout, no shuffled-time placebo, no Deflated Sharpe / White Reality Check / Hansen SPA, no Benjamini-Hochberg on the feature search, no registry of thresholds tried, no confidence interval on the displayed number.

### 4. Trends — the same problem, with the official tutorial demonstrating it

The NBA Trends written tutorial (https://support.fantasylabs.com/hc/en-us/articles/360036149612-NBA-Trends-Tool-Written-Tutorial) is, read literally, a **guided p-hacking walkthrough**. Verbatim, in order:

> "Users can create and follow trends by filtering through thousands of data points over the past several years worth of games."
> "The general goal when creating trends is to **improve the 'Points +/-' number**"
> "If you make the upper salary range $4,000 on DraftKings, you'll notice that the Plus/Minus falls to **−0.87**."
> "If we bump the lower limit to 30 minutes... Our Plus/Minus has risen to **4.58**... while the sample size has decreased from nearly **65,000** to just over **2,000**."
> "Players priced at $4,000 or lower with a minutes projection of 30+ have performed even better in games with totals of 220 or higher. You'll see that the sample size is a tiny fraction of where we began, though, now down to just **336** total past matches."
> "If you add too many filters to your trend, the sample size can get **too low** to the point where only a handful of players will match the trend each year. **Trends with tiny sample sizes are also more prone to variance**, as the stats may be skewed because of just a few games."

So: they **name the failure mode in the tutorial that teaches the failure mode**, and then ship no mechanism against it. No CI on the displayed Plus/Minus. No out-of-sample split. No penalty for the number of filters applied. No count of how many trend configurations the user has already tried.

And the discovered trend feeds straight back into the model: *"Trends can also be utilized within Models, where you can see how many trends each player fits on a given night... You can also adjust the 'Pro Trends Rating' slider."* The overfit artifact becomes a weighted input.

**Worth noting for fairness and for quotability:** FantasyLabs' own editorial has understood this since 2016. Matthew Freedman, "The Academic Definition of DFS Bullshit," Mar 2, 2016 (https://www.fantasylabs.com/articles/the-academic-definition-of-dfs-bullshit/) describes exactly the mistake: *"someone has an obdurate idea of what is true and then chips away at the data to make the (unrepresentative) result of the research align with the original hypothesis"*, and warns the sample *"is likely to be small and possibly unrepresentative."* **The editorial voice knows. The product does not implement it.** That gap is ten years old and is the single most quotable thing in this dossier.

### 5. SimLabs — there IS a real simulation engine. Here is exactly what it does.

The full mechanic, verbatim from https://support.fantasylabs.com/hc/en-us/articles/20710246632077-How-Does-SimLabs-Work :

> - "We simulate a slate's games **thousands of times**."
> - "We follow a process to generate a **massive pool of lineups** from those simulations."
> - "The generated lineups are **shaped and filtered to look like a real-life DFS contest field of lineups**, as we project it to look across **four common contest types**."
> - "We **simulate the results of a DFS contest thousands of times** using the lineups available to each contest and then tabulate the results."
> - "Each lineup is **rated relative to other lineups in the 'universe'**"
> - "(And **all of the above happens long before you ever even open the tool!**)"
> - "We allow you to combine the results of the simulation with other factors, such as their projections, correlation elements, upside, and ownership."

And what is simulated at the game level (https://support.fantasylabs.com/hc/en-us/articles/20710219531021-What-is-SimLabs):
> "We replicate every element of a DFS slate, **from the plays in every game** to the outcomes of a DFS contest."

**So: it is a two-stage Monte Carlo** — (1) game/play simulation producing player outcome distributions, (2) contest simulation over a synthesized opposing field. That is architecturally the right design and it is genuinely more than most of the category ships.

**What they publish about it — the honest inventory:**

| Question | What they publish |
|---|---|
| How many game sims? | **"thousands"** — the literal word, in four separate help articles. **No number, anywhere.** |
| How many contest sims? | **"thousands"** — same. No number. |
| Field size modeled? | Only two numbers exist publicly: **Small Field "assesses 5,000 of the top lineups"**, **Single Entry "investigates 2,000 of the top lineups"**. Large Field: *"the field size may differ"* — no number. (https://support.fantasylabs.com/hc/en-us/articles/20710384669197-What-Is-Contest-Field-and-Why-Does-It-Matter) |
| Player distributions? | Implied ("plays in every game", "deviation level"), **never specified** — no distributional family, no variance source, no parameterization published. |
| Correlation model? | Exists as a **user weight slider only**: *"Correlation Weight: ... A higher percentage supports stacking and the creation of correlated lineups."* **No correlation structure, matrix, or estimation method is published.** They ship a separate "Correlations" page per sport but its only help article is a video with a one-line description. |
| Ownership in the sim? | Yes, two ways: as **"Simulation ownership"** inside the rating, and as a **projected-field input** shaping the synthetic contest field. |
| Contest field composition? | Yes — the distinctive feature. Four field archetypes, lineups "shaped and filtered to look like a real-life DFS contest field." **The shaping method is not published.** |
| Payout curve / prize structure? | Outputs imply it ("cash line", "winning score", "ITM") but **no payout modeling is described**. |
| Seed / reproducibility? | **Explicitly non-reproducible by design:** *"The results range has been designed to ensure a diverse set of results, even when two users input identical model settings."* (https://support.fantasylabs.com/hc/en-us/articles/20710634296845-Will-My-Results-Look-the-Same-as-Others) |

**The five SimLabs rating axes**, all scored 0–99, verbatim from https://support.fantasylabs.com/hc/en-us/articles/20710507392909-What-Is-the-Bar-Chart-at-the-Bottom-of-Each-Lineup-Card :
- **Projection** — "compares the projection of this lineup against others in the field"
- **pOWN** — "evaluates the ownership rating of this lineup in comparison to other lineups in the field"
- **Top 100** — "measures how frequently this lineup appears in the top 100"
- **ITM** — "'in the money'... gauges how often this lineup hits the cash line"
- **SimWgt** — "gauges the performance of a lineup in a competitive simulation in relation to your field type"

**The five user weight sliders** (https://support.fantasylabs.com/hc/en-us/articles/20710463895437-How-Does-the-Advanced-Settings-Tab-Work): Simulation Weight, Projection Weight, Ownership Weight, Upside Weight, Correlation Weight. *"Every slider you see corresponds to a specific weighting percentage in the SimLabs Rating."* — **so SimLabs' final rating is, once again, a user-weighted linear blend.** The simulation feeds one of five terms in a scorecard the user tunes by feel.

**Dashboard outputs** (https://support.fantasylabs.com/hc/en-us/articles/20710603659021-What-Do-the-Charts-Mean-on-the-SimLabs-Dashboard): distribution of projected cash thresholds across runs, distribution of winning scores across runs, Optimal-vs-Projected ownership divergence, and stack optimal-rate vs projected ownership. **These are the most genuinely valuable outputs in the product** and they are the closest thing in the category to publishing a predictive distribution rather than a point estimate.

### 6. Ownership projections — human-authored, not modeled

> "These numbers are available for the main slates each day/week and are **generated by Justin Phan and Sean Koerner**."
> — https://support.fantasylabs.com/hc/en-us/articles/360037582352-Ownership-Projections

Named humans, per slate. Corroborated on the article side: *"Adam Levitan projects ownership for every NFL DFS player each week in the FantasyLabs Player Models"* (https://www.fantasylabs.com/articles/nfl-week-14-dfs-tips-picks-fanduel-draftkings-ownership/). **This is a labour-cost moat with a headcount ceiling, and it does not scale to a new sport without hiring.** (Same structural finding as the PropFinder weather product being partly human labour.)

They do let you check them: *"You can also use ownership projections within the Trends Tool... You can also see the actual ownership data to see how well the projections line up."* That is a real, if unpackaged, calibration surface — see §Accuracy.

### 7. Projections are mutable, and they admit the replay is contaminated

This is the single most damaging sentence they publish, and it is buried in an NBA FAQ:

> "Initial projections are set the evening before the game and the projections are updated through tipoff of the evening's latest game. **One consequence of this is that if you optimize a lineup historically, it may not be the same optimized lineup you were suggested at the time of lineup lock that night.**"
> — https://support.fantasylabs.com/hc/en-us/articles/216073818-Why-Do-Players-Projections-Change (updated 2026-08-12)

**They are telling you that their historical replay does not reproduce the as-of decision state.** Whether the stored historical projection is the pre-lock value or the last-updated value is **NOT CONFIRMED** from public sources — but if any backtest or historical win-rate surface in this product replays against post-lock projections, that surface has look-ahead leakage. This is precisely the Phase-0 failure mode the GSE handoff calls "the most likely silent fatal bug in the whole program."

### 8. PickLabs / Player Props — their betting surface

> "Our Player Props Tool spots opportunities to beat the sportsbooks on player prop inefficiencies. It is currently available for NFL, NBA, MLB and NHL."
> "We pull prop odds from numerous books around the market and **calculate the implied total based on the over/under and juice being offered**. We compare those implied odds to our projections and calculate the difference to find the largest edges available."
> "The 'Bet Quality' number highlighted in green is **based off of the percentage difference**."
> — https://support.fantasylabs.com/hc/en-us/articles/360035579712-How-to-use-the-Player-Props-Tool

Note what "Bet Quality" is: **the percentage gap between their projection and the line, on the stat's own scale** (their worked example: projection 18 yds vs implied 23.4 yds → 5.4/22.5 = 24%). It is **not** a probability edge, it is **not** de-vigged, and a 24% gap on a 22.5-yard receiving prop is not comparable to a 24% gap on a 250-yard passing prop. PickLabs is described as more evolved — *"calculating a win probability and a graded 'edge' for each option"* (https://www.fantasylabs.com/articles/picklabs-fantasylabs-new-tool-for-player-props-and-dfs-pickem-edges/) — but **whether that win probability is compared against a de-vigged market price is NOT CONFIRMED.**

The App Store description for PickLabs says: *"Get expert picks, **AI-powered prop models**, and detailed breakdowns"* (https://apps.apple.com/us/app/picklabs-player-prop-picks/id6756588908). **They self-describe as AI.** GSE's positioning is the exact inverse.

---

## MONETIZATION — the tier table, verbatim, and the boundary

**The canonical current offer** (server-rendered partner page, lists SimLabs + PlateIQ + Soccer + CFB, so it is the newest surface found — https://smizzle.fantasylabs.com/pricing/):

| Plan | Price | Period | Features (verbatim) |
|---|---|---|---|
| **DFS Trial Offer** | **$9.95** | 3 days | "Access for every sport (NFL, NBA, MLB, NASCAR, Golf, CFB, NHL, Soccer + More)" · "Access to SimLabs lineup building tool" · "FantasyLabs player projections" · "Ownership projections" · **"Optimize 300 lineups at once"** · "Use groups and rules to maximize correlation" · "Control targeted player exposures and control total projected ownership in lineups" · "Access to MLB PlateIQ data tool" |
| **All Access Monthly** | **$69.95** | month | all of the above, plus "Access to NFL Season Long content" · **"Optimize up to 300 lineups in each sport"** · "Custom stacking and correlation rules" · "Create and explore data trends" · "Recommended player props" |
| **6 Month All Access** | **$299.95** | 6 months | same as All Access Monthly (≈ $49.99/mo effective) |

**Cross-checked against three other server-rendered partner pages** (prices and limits differ by partner and by vintage — record them all rather than pick one):

| Page | Plans, verbatim |
|---|---|
| https://www.fantasylabs.com/pricing-etr/ (Establish The Run; lists UFL/CBB → recent) | **6 MONTH ALL ACCESS $49.99/month** billed 6-monthly, "Optimizer Access for every sport (NFL, NBA, MLB, Golf, UFL, MMA, NASCAR, NHL, CBB, & CFB)", **"Optimize up to 300 lineups in each sport"** · **NFL OPTIMIZERS ONLY $49.95/month**, "Optimize 300 lineups at once" · **CBB OPTIMIZER ONLY $49.95/month** · **NBA OPTIMIZER ONLY $39.95/month** |
| https://www.fantasylabs.com/pricing-ows/ (One Week Season) | **NFL OPTIMIZER ONLY $39.95/month**, "Optimize up to 150 lineups at once" · **6 MONTH ALL-ACCESS $249.95/6 months** ("BEST VALUE"), **"Optimize up to 150 lineups in each sport"** · **MONTHLY ALL-ACCESS $69.95/month** |
| https://www.fantasylabs.com/pricing-al/ (says "College football (New for 2022!)" → stale) | **ALL SPORTS PLAN $69.95/month**, "NFL, NBA, MLB, Golf, NHL, MMA, NASCAR, USFL, Esports", **"The ability to optimize up to 150 lineups in each sport"** · **6 MONTH ALL ACCESS $299.95/6 months** ("BEST VALUE") · **NFL ONLY MONTHLY $39.95/month** |
| https://www.fantasylabs.com/pricing-bain/ | **ALL ACCESS TRIAL $4.95/5 days** · **ALL ACCESS ANNUAL $24.95/month billed annually** (reg. $34.95), "Over $350 in annual savings" · **NBA ONLY $30.00/month**; all "optimize up to 150 lineups" |

> **THE PRODUCT BOUNDARY IS THE LINEUP CAP.** It is the only hard numeric limit stated anywhere in their marketing, it is stated on *every* plan on *every* page, and it moved from **150 → 300** between the older and newer partner pages. It is per-sport and per-run ("in each sport", "at once"). There is **no published cap on sims, exports, or seats.**

**Separate mobile subscriptions stack on top** (App Store IAP, public):

| App | In-App Purchase prices |
|---|---|
| DFS Lineup Optimizer — SimLabs (id6504044457) | **SimLabs Premium $19.99/week · $39.99/month · $119.99/6 months** |
| PickLabs: Player Prop Picks (id6756588908) | **PickLabs Premium (all sites) $14.99/week · $39.99/month · $279.99/year** |
| FantasyLabs: Fantasy Football (id6744127907) | **NFL Season Long Yearly $49.99** |

**So a user who wants DFS + sims on mobile + props is looking at $69.95 + $39.99 + $39.99 ≈ $150/month.** Whether the web All Access entitles the mobile IAP tiers is **NOT CONFIRMED** — the season-long app says *"Subscribers get access on both the app and website"*, but the SimLabs and PickLabs listings sell standalone Premium tiers, and one App Store reviewer complains the app *"doesn't recognize me as a paying customer."*

**No free tier.** The `/tools/` page describes no free tool and offers only "TRY NOW"; the propsbot review states *"there's no permanent free tier"* (https://propsbot.ai/fantasylabs-review/). One exception in their own older copy: Bales, 2016, refers to *"our free Trends tool"* (https://www.fantasylabs.com/articles/bales-look-fantasylabs-nfl-ownership-projection-accuracy/) — that free access no longer appears in any current tier list.

**Refunds are hard-lined:**
> "You may cancel your FantasyLabs subscription at any time – however, **there are no refunds for cancellation. Payments are nonrefundable and there are no refunds or credits for partially used billing periods.**"
> — https://support.fantasylabs.com/hc/en-us/articles/360034034972-Subscription-Policies (updated 2026-08-31)

Cancellation itself is self-serve in-account (Subscriptions page, disables auto-renew) — https://support.fantasylabs.com/hc/en-us/articles/215641617-How-do-I-cancel-my-membership (updated 2026-09-05). **That is ROSCA-compliant enough; the refund policy is the aggressive part, not the cancel flow.**

### The second revenue stream: affiliate promo codes, including prediction markets

The anonymous-visitor navigation on `fantasylabs.com/subscribe` includes an **"Offers"** menu listing promo-code pages for: **Polymarket, Kalshi, Underdog, Dabble, Sleeper, DraftKings Pick6, Fliff, Novig, ProphetX, Betr, Boom Fantasy, Rebet, Chalkboard, PlayBracco, Bleacher Nation Fantasy, Thrillzz, OwnersBox, PrizePicks**, plus "Top DFS Sites". Live examples pulled from their own article page: *"Kalshi College Football Promo Code **LABS**: Trade $25, Get $25 Bonus"*, *"Novig Promo Code **BCLABS**: $25 Bonus"* (`BC` = Better Collective).

**This is the structural conflict in one screenshot.** They sell you a $69.95/mo tool to beat the books, and they are paid by the books — and by the prediction markets — for sending you there. `_competitor-mistakes-lessons.md` §5 is the argument; this is the exhibit.

---

## ACCURACY — what they CLAIM vs what they PROVE

### The claims

| Claim, verbatim | Where |
|---|---|
| "the **most accurate projections in the industry** — trusted by top players on Underdog and DraftKings" | App Store description, https://apps.apple.com/us/app/fantasylabs-fantasy-football/id6744127907 |
| "Sean Koerner (**FantasyPros Accuracy Champion**)" | same listing |
| the Prop Model "**has returned significant profits each year**" | https://www.fantasylabs.com/articles/picklabs-fantasylabs-new-tool-for-player-props-and-dfs-pickem-edges/ |
| "create **extremely accurate, powerful player ratings**" | https://support.fantasylabs.com/hc/en-us/articles/219617488-MLB-Models-Overview |
| "**we tell you in an instant if your model would have won in the past**" | same |
| "We are dedicated to creating game simulations that are **true to life**." | https://support.fantasylabs.com/hc/en-us/articles/20710743492237-Why-Should-I-Trust-SimLabs |

### The evidence — all of it

**1. The 2025 Prop Model record is a JPEG.** The PickLabs article's only performance content is: *"Here are the 2025 results as of late December:"* followed by an image. I downloaded and read it (`https://si-fl-wp.s3.amazonaws.com/wp-content/uploads/20251223095339/PropModelByTheNumbers.jpg`, 1080×1080). It is a **marketing graphic of a single cumulative-profit equity curve**, Jan→Dec, y-axis labeled "Profit" with gridlines at 0/2000/4000/6000/8000, the curve ending around **~6,900–7,000**, footnoted **"Based on $100 unit bets."** So: roughly **+70 units for calendar 2025**.

What the image does **not** contain — and what appears **nowhere in the article text**:

- **n.** No bet count. None.
- **ROI / turnover.** No amount staked, so no denominator.
- **Win rate.** None.
- **Any confidence bound.** None.
- **CLV.** None — not mentioned anywhere in the product.
- **Breakdown** by sport, market, book, or Bet Quality tier. None.
- **Methodology.** Which book's price? Best line or a specific book? Priced at post time or at close? Were the odds obtainable at stake? Unstated.
- **A downloadable or inspectable pick log.** None. It is a rendered picture.

**Why the missing n is fatal, not pedantic.** At $100 units, +$7,000 is +70 units. Illustratively — *these volumes are my arithmetic, not their disclosure, and their true n is **NOT CONFIRMED*** — 700 graded props would make that ~10% ROI (extraordinary); 7,000 would make it ~1% (indistinguishable from noise and below prop vig for most books). **The chart is drawn so that those two worlds look identical.** A cumulative-profit curve with no denominator is the single most common way a betting record is presented as evidence while containing none. Under `_HANDOFF-to-coding-agent.md` §1's four-field rule (coverage denominator, Wilson/Clopper-Pearson bound, CLV backing, walk-forward provenance), this image scores **0 of 4** and GSE's render-layer guard would refuse to display it.

**2. The Bet Quality win-rate surface — real, but in-tool and unpackaged.** *"You can also look at the tool's historical picks by changing the start and end dates. You'll be able to see the **win rate for each Bet Quality number**, as well as each individual wager."* (props help article). This is genuinely the closest thing in the DFS category to a reliability diagram: hit rate stratified by predicted edge bucket. **But** it is behind the paywall, it is user-queried over an arbitrary date range (so anyone can find a flattering window), there is no fixed pre-registered sample, no CI, no vig-adjusted breakeven line drawn, and — per §7 above — **its replay may run against post-lock projections.**

The only Bet Quality figure ever published in the open is eight years old: *"As of writing (Tuesday, Sep. 18), the 2018 NFL player props with a bet quality of 10 are **40-23 (63% win rate)**"* — Matthew Freedman, Sep 18 2018, https://www.fantasylabs.com/articles/how-to-bet-nfl-player-props-betting-dfs/. **n=63.** A 63% rate on n=63 has a Wilson 95% interval of roughly 51–74% — it barely clears the ~52.4% breakeven at the lower bound, and they publish neither the interval nor the breakeven.

**3. The ownership-accuracy check is a one-off from 2016, and the numbers are in a tweet.** Jonathan Bales, Oct 4 2016, https://www.fantasylabs.com/articles/bales-look-fantasylabs-nfl-ownership-projection-accuracy/ — *"I used our free Trends tool to analyze how our projected ownership has matched up with actual ownership for all positions on both DraftKings and FanDuel this season."* The actual figures are in an embedded Twitter image; **no correlation, R², MAE or sample size appears in the article text.** No evidence of an ongoing updated record.

**4. The "accuracy" badge is borrowed, not self-published.** Sean Koerner is a genuine, externally-verified accuracy winner — FantasyPros accuracy contest, and FSTA most-accurate NFL player projections — and he is Director of Predictive Analytics at Action Network (https://www.fantasypros.com/experts/sean-koerner.php). **That is a real third-party credential and we should say so plainly.** But it is a *seasonal-projection ranking contest* credential being used to market a *DFS/props* product, and it substitutes an award for a record. It is a person's badge, not the model's calibration.

**5. "Why Should I Trust SimLabs?" is a pure trust-me page.** The entire article (https://support.fantasylabs.com/hc/en-us/articles/20710743492237-Why-Should-I-Trust-SimLabs) contains **no number, no backtest, no validation, no comparison of simulated vs realized cash lines** — only *"We are dedicated..."*, *"We have dedicated engineering resources..."*, and *"It's always wise to critically analyze advice from external sources and understand that every model operates on its own set of assumptions."* **They have a simulator that emits a full distribution of cash lines and winning scores every single slate, and they have never once published simulated-vs-actual.** That is a calibration study sitting in their own database that they have declined to run. It is the most conspicuous omission in the entire teardown.

**6. Third-party confirmation of the gap.** *"Does FantasyLabs publish an audited ROI? **Not in the standardized, graded-pick-log format**"* — https://propsbot.ai/fantasylabs-review/ (a competitor, so weight accordingly, but it matches everything above).

**Net:** they claim accuracy, industry-leading projections, and annual profit. They prove **one undated-axis equity-curve JPEG, one n=63 line from 2018, and one 2016 blog post whose numbers are in a screenshot.** Nothing they publish carries a sample size, a confidence interval, a market benchmark, or a re-computable log.

---

## WHAT CUSTOMERS SAY IS MISSING OR WRONG

**Honest limitation up front:** Reddit — where the real DFS complaint volume lives — is **blocked to my user agent** (both `reddit.com/search.json` via curl → HTTP 403, and WebSearch rejects `reddit.com` as a domain). Firecrawl was unavailable this session. **The complaint sample below is therefore thin and skews positive**, because App Store reviews skew positive and competitor reviews skew hostile. Treat this section as under-researched and worth a second pass from a surface that can read forums.

**Verbatim, from a real paying customer** (FantasyLabs: Fantasy Football, App Store):
> "I signed up for use with season long FF. Sean and Chris are easily among the best for rankings, but **this app is brutal. Every other time I open it, it doesn't recognize me as a paying customer.** And there are 2 articles that come out weekly (waivers and ranks), but **it regularly take 4+ hours from the time they are published online to actually hit the app. Will not be renewing for this reason.**"
> — https://apps.apple.com/us/app/fantasylabs-fantasy-football/id6744127907 (app rated **4.4, 67 ratings**)

Ratings, for what they are worth: SimLabs app **4.7 (113 ratings)**, PickLabs app **4.3 (11 ratings)**, Fantasy Football app **4.4 (67 ratings)**. **These are tiny rating counts for a decade-old brand** — the PickLabs app in particular has 11 ratings. (A search result claimed FantasyLabs holds "4.9/5 on iOS... nearly 2 million reviews"; that text describes an operator with a *sportsbook* platform and is plainly a conflation with another brand. **Discarded as unreliable — do not use.**)

**Structural complaints, from a competitor's comparison** (https://www.stokastic.com/articles/nfl-dfs/stokastic-vs-fantasylabs-nfl-dfs — Stokastic is a direct rival, discount accordingly, but these are checkable UX facts):
- *"SimLabs does not currently support asking for a specific quantity of a player"* — exposure is plus/minus buttons, not a target count.
- *"lineup editing, tagging, and entry management happening after you sync the lineups over to Player Models"* — and *"at 150 lineups with a late-swap window closing, that round trip can become a bottleneck that decides your Sunday."*
- Stokastic counters with published sim caps FantasyLabs does not offer: Core *"up to 2,000 lineups"*, MAX *"up to 10,000 lineups (50,000 for showdown)"*. **A rival is competing on a number FantasyLabs refuses to publish.**

**Complaints implied by their own help center** (these documents exist because users hit these problems):
- "Multi-Lineup Builder: Common Issues" (updated **2026-08-28**) — the optimizer silently fails to return lineups when settings are over-constrained; the fix is trial-and-error: *"try removing all filters and rerunning the tool. If the Lineup Builder is successful with no filters applied, try re-applying them one by one."*
- "Models Missing from iPhone or Android App"
- "I updated my payment information, but my account did not reactivate" (updated **2026-08-29**)
- The custom-projection uploader requires manual name-matching reconciliation, and **"The custom projection upload will only affect the 'Proj' field at this time. Ceiling and Floor will not be adjusted."** — meaning if you bring your own projections, the sim's variance assumptions still come from FantasyLabs.

**The deepest customer-facing problem is one nobody phrases as a complaint:** a user who spends hours tuning sliders and trends to a beautiful historical Plus/Minus has no way to learn whether it held up. The product never tells them. There is no "your model, out of sample, since you built it" surface anywhere.

---

## THE SEAM — what GSE can do that FantasyLabs cannot or will not

Ranked by how cleanly we can hit it.

**1. Publish the calibration they already have and won't run.** SimLabs emits a *distribution* of projected cash lines and winning scores for every slate, and both are settled facts hours later. The simulated-vs-actual comparison is one query in their own warehouse. **They have never published it, and "Why Should I Trust SimLabs?" is a page of adjectives where that chart should be.** GSE's Glass Ledger *is* that chart, for our domain, published before the fact. This is not a feature gap; it is a values gap, and values gaps do not close with engineering budget.

**2. An out-of-sample-by-construction model builder.** Their Models + Trends loop is in-sample optimization with a live scoreboard and no correction. GSE can ship the same delightful slider UX with the honest machinery underneath: **fit on a training fold, grade on an untouched forward holdout, display a Wilson bound not a point estimate, count the configurations the user has tried and apply a Benjamini-Hochberg or Bonferroni haircut to the displayed significance, and run a shuffled-time placebo per saved model.** Then show both numbers side by side: *"in-sample +4.58 / out-of-sample +0.31, 43 configurations tried, corrected p = 0.71."* **This is the single highest-leverage build in this dossier.** FantasyLabs cannot ship it — their own tutorial's headline example collapses under it, and the tool's entire dopamine loop is the number going up.

**3. Own CLV; they have no market benchmark at all.** Plus/Minus is measured against a DFS *salary* curve. Their Bet Quality is a raw percentage gap on the stat's own scale, **not de-vigged, not a probability, not comparable across markets**. The words "closing line value" and "CLV" do not appear anywhere in their public surface. GSE's entire proof engine — de-vigged edge `e = p − q`, CLV vs Pinnacle close, `recompute.ts` — is in a dimension they do not measure.

**4. Publish the sim count and let the user set it.** "Thousands," four times, in four articles, for three years. Stokastic already competes on published caps (2,000 / 10,000 / 50,000). Their precompute-then-serve architecture on an AngularJS/.NET monolith is *why* they can't expose it per-user. **State our number, expose it as a control, publish the convergence curve.** Cheap for us, architecturally expensive for them.

**5. The incentive inversion, stated out loud.** They run affiliate promo pages for **Kalshi, Polymarket, PrizePicks, Underdog, DraftKings Pick6, Novig, Fliff** and a dozen more, with Better Collective codes (`LABS`, `BCLABS`), while charging $69.95/mo for tools to beat those same operators. GSE takes **no affiliate** (handoff §1, hard line). *"They're paid by the books they're selling you an edge against. We aren't — here's the record."* That line is true, checkable, and **structurally uncopyable by a Better Collective asset**: affiliate revenue is the parent's business model.

**6. Reproducibility as a feature, against their explicit non-reproducibility.** *"The results range has been designed to ensure a diverse set of results, even when two users input identical model settings."* Sensible for lineup uniqueness — **fatal for auditability.** No user, and no regulator, can reproduce a FantasyLabs output. GSE's hash-chained, pre-kickoff-committed, `recompute.ts`-verifiable ledger is the exact inverse and is the one asset a funded latecomer cannot fake.

**7. Kill the as-of leak they publicly admit.** *"if you optimize a lineup historically, it may not be the same optimized lineup you were suggested at the time of lineup lock."* GSE's as-of feature store with a hard cutoff at decision timestamp `t` makes "what did you actually say, before the game" a first-class, queryable object. **Say the sentence in marketing:** "Our history is what we said before kickoff. Ask your other tool whether theirs is."

**8. Automate the human ownership desk — but only after proving it.** Named humans (Phan, Koerner, Levitan) hand-project ownership per slate. That is a headcount ceiling and a per-sport hiring cost. It is also, right now, **probably better than a naive model** — do not underestimate it. The attack is not "we automate it," it is **"we publish our ownership MAE against actual, every slate, and they published theirs once, in 2016, in a tweet."**

**9. A free tier that is a *proof* surface, not a teaser.** They have no free tier; the paywall starts at a $9.95 3-day trial. GSE's free calibration/track-record surface costs us nothing to give away and is the thing they structurally will not match. Their whole funnel depends on the value being invisible until you pay.

**10. Price flank, secondary.** $69.95/mo web + $39.99/mo SimLabs mobile + $39.99/mo PickLabs ≈ $150/mo, no refunds, no free tier. GSE Pro at $14.99/mo is a different category of purchase. **But do not lead with price** — leading on price invites a comparison on tool depth, which we lose today. Lead on proof; let price be the closer.

---

## WHERE THEY BEAT US TODAY — say it plainly

- **They have a real two-stage contest simulator in production**, modeling a synthetic opposing field across four archetypes. We do not have this.
- **Ten years of labelled DFS history** (their own tutorial casually filters an n≈65,000 NBA sample) with per-slate salaries, actual ownership, and outcomes. That corpus is a genuine moat and we cannot conjure it.
- **Named, externally-credentialed humans** — Koerner's FantasyPros/FSTA accuracy wins are real, third-party, and repeated.
- **Breadth**: NFL, NBA, MLB, NHL, Golf, MMA, NASCAR, CFB, CBB, Soccer, Esports, plus best-ball/season-long, in one subscription.
- **Distribution**: Better Collective's owned-and-operated network (Action Network, RotoGrinders, ScoresAndOdds, VegasInsider) plus three iOS apps.
- **Plus/Minus is a genuinely good idea.** Grading a player against a *price* rather than raw points is the right instinct — it is the same instinct as CLV, applied to the salary market instead of the betting market. Respect it, then point out they never took the second step.
- **Their editorial voice has been intellectually honest about overfitting since 2016.** They are not a tout shop. The failure is that the product never implemented what the writers understood.

## WHAT WE SHOULD NOT COPY

- **Do not build a slider-scorecard with a live in-sample scoreboard.** It is the most engaging thing in their product and the most dishonest.
- **Do not ship a cumulative-profit equity curve.** Not with an n, not without one. It is the shape of the claim we exist to refute. Ship coverage-stamped, CI-bounded, CLV-backed rates or ship nothing (handoff §1).
- **Do not adopt "AI-powered"** (PickLabs' own App Store wording). Repo rule 8.
- **Do not take affiliate money.** Ever. It is the moat.
- **Do not let historical projections be mutable in place.** Append-only, as-of, hash-stamped.

---

## PROVENANCE + LIMITS

**Confirmed by direct fetch this session:** robots.txt content and byte count; `/pricing*` 302 chain to `/subscribe`; the AngularJS/jQuery/.NET/Action-Network asset list in `/subscribe` HTML; four partner pricing tables plus the `smizzle` subdomain table; the full text of 25+ Zendesk help articles via the **public help-center content API** (`support.fantasylabs.com/api/v2/help_center/en-us/articles.json`, 102 public articles across 2 pages) — this is the documented public content API for a public help center, reached because the HTML pages 403 non-browser agents; the PickLabs article HTML including its complete image manifest; and the `PropModelByTheNumbers.jpg` equity-curve image, downloaded (627,777 bytes, 1080×1080) and read directly.

**NOT CONFIRMED — do not repeat as fact:**
- The actual number of game or contest simulations SimLabs runs. Only "thousands" is published.
- Large Field size. Only Small (5,000) and Single Entry (2,000) are numbered.
- Any correlation structure, estimation method, or player outcome distribution family.
- Payout-curve modeling inside the contest sim.
- **n, ROI, win rate, market benchmark, or book for the 2025 Prop Model curve.** The image contains none of them.
- Whether the props/Trends historical replay uses pre-lock or post-update projections — i.e. whether it has look-ahead leakage. Their own FAQ makes this a live question; the answer is not public.
- Whether PickLabs' "win probability" is compared against a de-vigged market price.
- Whether the web All Access entitlement covers the SimLabs / PickLabs mobile Premium IAP tiers.
- The current canonical *self-serve* price. `/subscribe` is client-rendered and I did not authenticate. The $69.95 / $299.95 / $9.95-trial figures come from server-rendered partner pages that agree with each other; treat them as the offer, not as a guaranteed logged-in quote. The propsbot review's mention of "Pro and Diamond tiers" appeared on **no FantasyLabs page I read** — unverified, do not cite.

**Under-researched, flag for a second pass:** real user complaints. Reddit is blocked to this user agent (403 on the public search JSON; the search tool refuses the domain) and Firecrawl was disconnected. The complaint evidence here is one App Store review, three low-count app ratings, a competitor's comparison page, and the inferential evidence of their own troubleshooting docs. **A pass from a surface that can read r/dfsports and the RotoGrinders forums would materially improve this section, and could easily overturn the mildly positive tone of it.**
