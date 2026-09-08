# Sleeper, DraftKings & FanDuel as PRODUCT SURFACES — the 2026 fantasy UX bar

**Slug:** `sleeper-dk-fd-product` · **Captured:** 2026-09-08 · **Method:** public surfaces only
(marketing pages, first-party help centers, first-party `llms.txt` knowledge mirrors, public API
docs, Google Play / App Store listings and their public review text, third-party reviews).
No authentication, no paywall crossing, no endpoint scanning, no disallowed paths.

**robots.txt checked before every fetch:**
- `https://sleeper.com/robots.txt` → `User-Agent: * / Allow: /` — nothing disallowed.
- `https://www.draftkings.com/robots.txt` → disallows `/video/`, `/_assets/`, `/_landing/`,
  `/_raptor/`, `/lobby-classic/`, `/account/`, `/mycontests/`, `/contests/gamecenter/`,
  `/lineup/`, `/missions/`, `/contest/`, `/draft/`. **None of those were fetched.** The pages
  read here (`/fantasy-football`, `/best-ball`, `/leagues`, `/average-results`) are all allowed.
- `https://www.fanduel.com/robots.txt` → disallows `/api`, `/research/api`, `/about/api`,
  `/weather/`, `/p/Interstitial`, `/games/`, `/e`, `/lineups/`, `/*?invitedby`, `/users/`,
  `/theduel/users`, `/users/*`, `/posts/`; **explicitly Allows `/knowledge/` and `/llms.txt`**.
  **None of the disallowed paths were fetched.** `/trust`, `/friends`, `/llms.txt` and
  `/knowledge/**` were, and are allowed.

> **Honesty rule for this file.** Every factual claim carries the URL it was read on.
> Anything I could not read on a first-party page is labelled **NOT CONFIRMED**.
> Anything that is my arithmetic or my inference on their published material is labelled
> **DERIVED** or **INFERENCE**, with the method shown, so it can be re-run and falsified.

**Cross-references in this repo:** `_competitor-mistakes-lessons.md` §5 (addictive-design
litigation) is directly load-bearing on §5 below. `wave2/prizepicks-underdog.md` covers the
pick'em/prediction-market side of the same three companies' adjacent products; this file
deliberately does *not* re-cover that ground and treats DK/FD/Sleeper only as **fantasy product
surfaces**. `_HANDOFF-to-coding-agent.md` §1 (fire on edge, never on confidence; no unsubstantiated
numbers) is the doctrine every build item in §7 is written to satisfy.

---

## 0. The one-paragraph version

**Only one of these three companies is actually in the fantasy-league-software business, and it
is not a book.** Sleeper ships a genuinely deep, genuinely free, genuinely commissioner-grade
league product — 127 help articles for fantasy football alone, four-layer notification
architecture, a soft draft timer, indefinite draft pause, mid-draft timer changes, four per-day
waiver modes — and monetises it by funnelling the same users into real-money Player Picks and a
CFTC-regulated Team Picks exchange
([support.sleeper.com](https://support.sleeper.com/en/),
[play.google.com/…com.sleeperbot](https://play.google.com/store/apps/details?id=com.sleeperbot&hl=en_US)).
DraftKings' entire "season-long" product is **Best Ball**, whose stated selling point is that it
has *no* league management: "No adds, drops, trades, or waiver claims"
([draftkings.com/best-ball](https://www.draftkings.com/best-ball)). FanDuel's answer to the
season-long league, "Friends Mode", is a **weekly re-draft** wrapped in a leaderboard — every
manager re-picks a squad each week, so there is no roster continuity to manage at all
([rotogrinders.com](https://rotogrinders.com/articles/fanduel-launches-friends-mode-1406203)).
So the UX bar splits cleanly in two: **Sleeper sets the bar for league mechanics and a small team
cannot beat it**, while **DK and FD set the bar for money-in/money-out polish and a small team
must not try to match it at all**. The seam is that all three have deliberately vacated the
one thing GSE's engine is built for — a published, checkable *number* about a lineup decision —
and Sleeper's own users are publicly begging for the simplest version of it (playoff odds) on
Sleeper's own community surface, unshipped.

---

## 1. How the product works, mechanically

### 1.1 Is there a simulation engine? Short answer: no, and one of them is being asked for it.

| Question | Sleeper | DraftKings | FanDuel |
|---|---|---|---|
| Simulation engine described publicly | **NOT CONFIRMED** — nothing found on first-party surfaces | **NOT CONFIRMED** | **NOT CONFIRMED** |
| Number of sims per slate | **NOT CONFIRMED** | **NOT CONFIRMED** | **NOT CONFIRMED** |
| Player outcome distributions published | No | No | No |
| Correlation model published | No | No | No |
| Contest-field / ownership model published | No | No | No |
| Projection methodology post | **NOT CONFIRMED** | **NOT CONFIRMED** | **NOT CONFIRMED** |
| Playoff odds / win probability in the league product | **No — and it is a standing public feature request** (see 1.2) | N/A — no leagues | N/A — no leagues |

**What they publish instead is *scoring and settlement*, never *pricing or projection*.**
Sleeper's most technical public document about its numbers is
[Sleeper Player Picks Stats Explained](https://support.sleeper.com/en/articles/6262990-sleeper-player-picks-stats-explained),
which is a *stat-definition* document: it defines Solo Tackles, Assisted Tackles, Anytime TD,
Pass+Rush Yards, Kicking Points, and publishes the full NFL fantasy point table (Passing Yards
0.04/yd, Passing TD 4, INT −1, Rush/Rec Yards 0.10/yd, Rush/Rec TD 6, Reception 1, Fumble Lost
−2) and the NBA table (Points 1, Rebounds 1.2, Assists 1.5, Blocks 3, Steals 3, Turnovers −1).
It tells you exactly how a *result* is graded. It says **nothing** about how the projection that
result is graded against was produced. That is the same split found in
`wave2/prizepicks-underdog.md` §1.1 — settlement is disclosed, pricing is not — and it holds
across all three companies here.

**INFERENCE (not established):** every one of these operators must run some projection process
to set a Picks line or a DFS salary. None of them expose it. I found no first-party page,
methodology post, or engineering blog on any of the three describing a Monte Carlo engine, a sim
count, a distributional model, or a correlation matrix. Absence of a published engine is not
absence of an engine; it *is* absence of anything a customer can check.

### 1.2 The single most useful mechanical finding: Sleeper has no playoff odds, and its users know

Sleeper's community surface is public and search-indexed. A search restricted to `sleeper.com`
returns a dense cluster of *user feature requests* for exactly one thing — a probability:

- "@Dillard409: Add something that estimates the playoff picture and chances teams will make it."
  ([sleeper.com/message/…903446644979523584](https://sleeper.com/message/170000000000000000/903444015566147584/903446644979523584))
- "@swaggyc4: playoff chance eliminations shown along with odds to make playoffs"
  ([sleeper.com/message/…903444448162316288](https://sleeper.com/message/170000000000000000/903444015566147584/903444448162316288))
- "@Flamed88LX: Show each teams % chance to make playoffs, I think ESPN showed that when our
  league was on there"
  ([sleeper.com/message/…903483866080407552](https://sleeper.com/message/170000000000000000/903444015566147584/903483866080407552))
- "@thebergstheword: Playoff % chance, weekly power rankings, team eliminated from contention"
  ([sleeper.com/message/…903450007628369920](https://sleeper.com/message/170000000000000000/903444015566147584/903450007628369920))
- "@KennedyMcNamara: Playoff Percentages and Season Projections"
  ([sleeper.com/message/…903792726401884160](https://sleeper.com/message/170000000000000000/903444015566147584/903792726401884160))
- "@brwaldsmith: Playoff percentage and projections"
  ([sleeper.com/message/…903444825939206144](https://sleeper.com/message/170000000000000000/903444015566147584/903444825939206144))

Playoff odds are a **season-simulation product**: you need remaining-schedule modelling, weekly
score distributions, and a Monte Carlo over the rest of the season. It is the most-requested
missing feature on the best league product in the market, and it is precisely the shape of thing
GSE's prediction engine already exists to produce. See §5 and §7.

### 1.3 What Sleeper's league engine actually does — this is the depth bar

Every item below is from Sleeper's own help centre. This is what "good" means in 2026.

**League formats** ([League Types & Formats](https://support.sleeper.com/en/articles/3537396-league-types-formats)):
Redraft, Keeper, Dynasty, plus Auction and Best Ball as *formats*; the same page lists the
customisation axes as "Draft Types (Snake/Linear/3RR/Auction) · Lineup Types (Classic/Best Ball)
· Waiver Types (Rolling/Reverse/FAAB) · Roster Positions (+ IDP) · Scoring Configurations ·
Extra Game Each Week Against League Median". Dynasty explicitly includes "Rookie drafts" and
"Taxi squads". The marketing page adds a fourth league type, **Chopped** — elimination-style,
lowest weekly scorer is cut ([sleeper.com/fantasy-football](https://sleeper.com/fantasy-football)).

**Waivers** — four *daily modes*, not one weekly setting
([Waivers for the Offseason](https://support.sleeper.com/en/articles/3978678-waivers-for-the-offseason)),
verbatim:
- "**FA** - All players will be available on a first-come, first-serve basis for the entirety of the day."
- "**Waivers** - This will put all players on waivers for the day. They will then process at your selected time."
- "**Locked** - This will prevent players from being added via free agency or waivers for the entire day."
- "**Waivers -> FA** - This will have all players on waivers clear at the selected processing time. After that, all players will be free agents for at least the remainder of that day."

Plus year-round movement for keeper/dynasty ("Sleeper allows year-round player movement"), an
"Allow Moves Pre-Draft" toggle, and a "time players are on waivers after drop" setting. Waiver
*priority* systems are Rolling, Reverse-standings, and FAAB
([What types of waivers do you support?](https://support.sleeper.com/en/articles/1876041-what-types-of-waivers-do-you-support)),
with FAAB blind bidding executed in value-ranked order, highest bid auctioned first
([How does FAAB bidding work?](https://support.sleeper.com/en/articles/1876040-how-does-faab-bidding-work)).
One notable **gap in their own docs**: adjusting a team's FAAB budget or waiver priority "is only
possible on the mobile app right now"
([How can I adjust FAAB or waiver priority?](https://support.sleeper.com/en/articles/3978092-how-can-i-adjust-faab-or-waiver-priority)) —
i.e. even Sleeper has web/mobile feature parity holes.

**Draft room** — the deepest surface, and the reason people migrate leagues
([How does the draft timer work?](https://support.sleeper.com/en/articles/4029085-how-does-the-draft-timer-work),
[Why you should use Sleeper for any draft](https://support.sleeper.com/en/articles/1876028-why-you-should-use-sleeper-for-any-draft)),
verbatim:
- Draft does not start on a clock: "your league's draft won't begin until the commissioner selects
  'Begin Draft' unless 'Autostart Draft' is toggled on". Reason given: "too many times we've had
  to wait for a few stragglers to log on or wait for someone to arrive with the pizza."
- **Soft draft timer**: "If the commissioner has auto picked turned off, and a team runs out of
  time to make their pick, you'll find that nothing will happen… Just turn auto pick off and teams
  will be able to make picks throughout the night, but won't be penalized if they run out of time."
- **Indefinite pause**: "The commissioner can pause the draft at any time for however long they'd
  like, for whatever reason… Commissioners can have the draft take place over multiple days."
- **Slow Draft Auto-Pause**: scheduled windows where "the timer will not go down" but picks still
  land.
- **Mid-draft timer change**: "commissioners alter the pick timer right in the middle of the
  draft" — the article names the concrete use case, 2-minute timer for the first 4 rounds then
  1-minute after, and explicitly says this "was not possible" on Yahoo! and ESPN.
- **Forced CPU auto-pick** drafts from that team's queue and "will also take into consideration
  what positions the team needs".
- **Big Screen Mode** (cast the board to a TV on one tab while drafting on another), a
  **draftboard grid instead of a list view**, light/dark mode, **unlimited undo**, and a
  "fully editable by the commissioner" board — the escape hatch for any non-standard draft rule
  ([What draft types are supported?](https://support.sleeper.com/en/articles/9701062-what-draft-types-are-supported)).
- Supplemental drafts for dynasty: "There is no limit to how many you can have, but each one has
  a 10-round maximum" (ibid.) — **the one hard numeric limit I found anywhere in Sleeper's league
  product.**

**Notifications** — a four-level architecture, verbatim
([How do notifications work on Sleeper?](https://support.sleeper.com/en/articles/1876026-how-do-notifications-work-on-sleeper)):
"Sleeper notifications can be controlled at the App Level, Channel Level, Topic Level, and
Individual User Level." Sub-controls: per-channel bell with granular toggles, topic-reply mute
(default "we alert you of the next 5 replies after your comment"), reaction mute, @mention mute
per channel, per-conversation mute, user blocking. **And a stated hard gap:** "We do not offer a
way to receive league alerts through email."

**League import** ([How to Import Your League History to Sleeper](https://support.sleeper.com/en/articles/16203584-how-to-import-your-league-history-to-sleeper),
[sleeper.com/import](https://sleeper.com/import)) — verbatim requirements: "Desktop **Google
Chrome** (import isn't supported on mobile)", "A **Sleeper account** + your login for the other
platform", your phone for the final step. What comes over: "Teams, managers, standings,
champions, draft picks, and final matchup scores for every season your old platform still
exposes — often ten or more years." Time: "usually 30–60 seconds." Limits: the new league "starts
with just you" — leaguemates are invited manually; the source league is untouched. Source
platforms are **NOT CONFIRMED on Sleeper's own pages** — neither the help article nor the landing
page names ESPN, Yahoo, NFL.com, CBS or MFL. (A third-party listing says ESPN including
NFL.com-migrated leagues: [Chrome Web Store — Sleeper League Importer](https://chromewebstore.google.com/detail/sleeper-league-importer/kpcokdpkaepgcefmhmkdinoolobjllcc).)

**Scale of the surface (a measurable depth proxy).** Article counts on
[support.sleeper.com](https://support.sleeper.com/en/), verbatim from the collection index:

| Collection | Articles |
|---|---|
| Fantasy Football | **127** (6 authors) |
| DFS: Sleeper Picks | 61 |
| Fantasy Basketball | 22 |
| Fantasy FC (soccer) | 16 |
| Legal | 10 |
| Account & Notification Settings | 9 |
| Sleeper Team Picks | 8 |
| Sleeper Mini Games | 3 |
| Pick'em & Survivor | 2 |
| Bracket Mania / Sleeper Safe / Responsible Risk Management | 1 each |

**DERIVED:** 127 articles for one sport's league product against 2 for Pick'em & Survivor is a
~63× documentation-surface ratio. That is the configuration depth a commissioner-grade league
product accretes, and it is the single most useful number in this file for scoping: **a small
team is not going to write 127 articles' worth of league configuration.**

### 1.4 What DraftKings' fantasy product actually is

DK's own fantasy football page is entirely DFS-framed, verbatim
([draftkings.com/fantasy-football](https://www.draftkings.com/fantasy-football)):
"Draft a lineup of NFL players while staying within the salary cap… **There's no season-long
commitment so you can draft a new team every week** and not worry about draft day busts or
injuries ruining your season." The feature bullets are "Win big cash prizes in public
tournaments · Don't need to finish first to win · **Play daily, season-long, and in-game
contests** · Play against people of your skill level · Play private contests against your
friends."

The "season-long" in that bullet resolves to **Best Ball**, and Best Ball's marketing headline is
that it is the *opposite* of league management, verbatim
([draftkings.com/best-ball](https://www.draftkings.com/best-ball)):

> "**No roster management** — The draft is your only time commitment. **No adds, drops, trades, or
> waiver claims.** Your top-scoring players each week automatically slide into your starting
> lineup."

and

> "Be on the lookout for larger tournaments, private contests, **a web version**, and more as we
> innovate… Best Ball is available for NFL, NBA, and MLB."

**"A web version" is still listed as forthcoming.** DK's flagship season-long product is
mobile-only on its own marketing page. `https://www.draftkings.com/leagues` renders as a
navigation shell with no product copy at all (fetched 2026-09-08; the page is allowed by robots).

The store listing confirms the same shape ([Google Play — DraftKings Fantasy Sports](https://play.google.com/store/apps/details?id=com.draftkings.dknativermgGP&hl=en_US)):
"NFL Fantasy Football season long contests · Compete in fantasy leagues with friends · Live
scoring & leaderboards in every contest · Exclusive Best Ball tournaments · Track player stats,
contests & winnings". No waivers, no trades, no commissioner tooling anywhere in the copy.

### 1.5 What FanDuel's fantasy product actually is

Two things, and neither is a league in the commissioner sense.

**(a) DFS.** The Google Play listing is explicit
([Google Play — FanDuel Fantasy](https://play.google.com/store/apps/details?id=com.fanduel.android.self&hl=en_US)):
"**You don't have to commit to season-long play** – Make last-minute changes and draft the
perfect team. Our Late Swap contests let you adjust the players on your roster right until their
individual games start" and "Live draft - every game day - with **Daily Snake Drafts**! …Draft the
best players available with no salary caps. Available now for the NFL, NBA, MLB, NHL, and PGA."

**(b) Friends Mode**, described in the same listing as "a new take on the 'traditional' fantasy
league that lets you play FanDuel with your friends all season long. Create your league, draft
teams, track live scoring, and keep track of rankings among your friends." The mechanic underneath
is a weekly re-draft, per the launch coverage
([rotogrinders.com](https://rotogrinders.com/articles/fanduel-launches-friends-mode-1406203)):
"since you pick a new team every week there's no coordinating a draft time, no season-killing
injuries, and no draft busts"; "every week, every player in the league re-drafts their squad";
leagues can run "from only two weeks to an entire season"; "League dues are customizable";
"League commissioners can choose to allocate a prize for the weekly winner, which would get
subtracted from the grand prize at the end of the season."

**NOT CONFIRMED first-party:** `https://www.fanduel.com/friends` returns "JavaScript is Disabled!"
to a non-JS client and I did not execute their JS, so the Friends Mode mechanics above rest on a
third-party source, not FanDuel's own page. FanDuel's *own* canonical AI-facing description of the
whole fantasy product, in full, is four lines
([fanduel.com/knowledge/product/fantasy-overview.md](https://www.fanduel.com/knowledge/product/fantasy-overview.md),
reachable from their explicitly-allowed [llms.txt](https://www.fanduel.com/llms.txt)):

> "## Scope — Daily fantasy sports (DFS) contests offered on FanDuel's fantasy site/app, separate
> from sportsbook/casino accounts in terms/policies. ## Notes — Contest formats and availability
> vary by state. DFS promotions and rewards are governed by FanDuel's Terms and promotional rules.
> Responsible Play tools are available across products." (last_updated 2025-12-09)

FanDuel's own machine-readable summary of its fantasy product **does not mention leagues, drafts,
waivers, or Friends Mode at all.** It says "DFS contests". That is FanDuel telling an AI what its
fantasy product is.

---

## 2. What they sell, at what price, and exactly what is gated

### 2.1 Sleeper — the league product is free; the money is one tab away

Verbatim from [sleeper.com/fantasy-football](https://sleeper.com/fantasy-football):

> "Run Your League Free Forever" · "100% Ad Free" · "**No paywalls, no subscriptions, no ads
> interrupting your gameday**" · "Sleeper is free, forever" · "Trusted by 13+ million players"

**There is no tier table for Sleeper's league product. That is the finding.** The gating is not
by tier, it is by *product line* and by *state*:

| Product | Price / gate | What it is |
|---|---|---|
| Fantasy leagues (NFL, NBA, EPL, LaLiga, Ligue 1) | **Free, no tiers, no ads** | Redraft / Keeper / Dynasty / Chopped, full commissioner tooling |
| Pick'em & Survivor pools | Free | "Pick weekly game winners and compete for bragging rights" |
| Mock drafts, Bracket Mania, Mini Games | Free | — |
| **SleeperSafe** (league dues wallet) | Real money, 18+ | "Collect dues and pay out prizes all in the Sleeper app" |
| **Player Picks** | Real money, 18+ (19 AL/NE, 21 MA/VA) | "Make more/less picks on players and **win up to 1000x real cash**" |
| **Team Picks** — "offered by Sleeper Markets LLC" | Real money | "**Regulated by the CFTC & NFA**" — spreads, totals, game winners |

Sources: [Google Play — Sleeper - Fantasy Sports](https://play.google.com/store/apps/details?id=com.sleeperbot&hl=en_US)
(all quotes above), [sleeper.com/download](https://sleeper.com/download).

**The product boundary is geography, not features.** Google Play: Player Picks "Available in
**31 states**, including CA, TX, and GA". A third-party review breaks the same product into three
differently-scoped state lists — Daily Draft, Sleeper Picks, and Sleeper PicksVS each available
in a *different* set of states, with PicksVS confined to AL, FL, KS, MA, WV, WY
([bettingusa.com/fantasy/reviews/sleeper](https://www.bettingusa.com/fantasy/reviews/sleeper/)).
That review also reports the payout cap as "up to 100x" where Sleeper's own store listing says
"up to 1000x" — **the two figures conflict and I could not resolve them on a first-party page.
Treat both as unverified.**

**The acquisition offer is a deposit match, and it is on the download page for the free league
product.** [sleeper.com/download](https://sleeper.com/download) carries "New Users Get $100" with
code "MATCH"; the store listing says "New users get a $20 free Players entry & up to $100 deposit
match for Players Picks"; the third-party review gives the terms as "100% first deposit bonus
worth up to $100 with a **1x play-through** requirement", clearable within a year, funds arriving
"up to 30 days" later, and notes "Sleeper DFS asks new users for their promo code **after**
registering, logging in, and visiting the Picks or PicksVS lobby for the first time"
([bettingusa.com](https://www.bettingusa.com/fantasy/reviews/sleeper/)).

**INFERENCE (clearly labelled):** the free league product is the top of a funnel into real-money
Picks. The download page for a "no paywalls, no subscriptions" product leads with a $100 deposit
match. I did not read an internal document saying this; it is what the two first-party surfaces,
read together, describe. Sleeper's reported ARR is "north of $85M by early 2026" with "paid-entry
formats like Sleeper Picks and Daily Draft" as "core revenue engines" — but that figure comes
from a business-model blog, **not a first-party source, and should be treated as NOT CONFIRMED**
([businessmodelcanvastemplate.com](https://businessmodelcanvastemplate.com/blogs/how-it-works/sleeper-how-it-works)).

### 2.2 DraftKings — priced per entry, and the entry ladder is the product

No subscription anywhere. The gate is entry fee and state.

| Item | Value | Source |
|---|---|---|
| Best Ball entry range | "$1 and as high as $5,000+" | [establishtherun.com](https://establishtherun.com/a-guide-to-draftkings-best-ball-contest-selection/) — third party |
| Flagship contest | "$25 for their $20M Headliner Contest" | ibid — third party |
| Largest field | "940,900+ lineups" | ibid — third party |
| Smallest example cited | "The Pocket Passer… only 864 total participants" | ibid — third party |
| Best Ball sports | "NFL, NBA, and MLB" | [draftkings.com/best-ball](https://www.draftkings.com/best-ball) — **first party** |
| Best Ball web version | listed as forthcoming ("Be on the lookout for… a web version") | ibid — **first party** |
| Paid contests unavailable in | "HI, ID, LA (select parishes) MT, NV, OR, WA, ONT and AB" | [draftkings.com/fantasy-football](https://www.draftkings.com/fantasy-football) — **first party** |
| App | 4.7★, 181K reviews, 5M+ downloads, "Rated for 18+ · Real Gambling/Paid Contests", updated 2026-09-04 | [Google Play](https://play.google.com/store/apps/details?id=com.draftkings.dknativermgGP&hl=en_US) |
| App (iOS) | 4.9★, 551K ratings, v5.76.0 (September 1) | [App Store](https://apps.apple.com/us/app/draftkings-fantasy-sports/id710535379) |

The entry-fee figures above are **third-party and NOT CONFIRMED first-party** — DK's contest
lobby lives under `/contest/` and `/lobby-classic/`, both robots-disallowed, and I did not fetch
them.

### 2.3 FanDuel — same shape, plus one clause worth flagging

| Item | Value | Source |
|---|---|---|
| Product | DFS contests, "separate from sportsbook/casino accounts in terms/policies" | [fantasy-overview.md](https://www.fanduel.com/knowledge/product/fantasy-overview.md) — **first party** |
| Friends Mode dues | "League dues are customizable"; leagues "from only two weeks to an entire season" | [rotogrinders.com](https://rotogrinders.com/articles/fanduel-launches-friends-mode-1406203) — third party |
| Age gate | "18 or older (19 or older in AL, 21 or older in AZ, IA, LA, MA, VA)" | [Google Play](https://play.google.com/store/apps/details?id=com.fanduel.android.self&hl=en_US) — first-party listing |
| Paid contests unavailable | "DE, ID, HI, MT, NV, and WA"; plus "FanDuel makes no representation that participation in paid entry fantasy sports contests is lawful under Texas state law" | ibid |
| **Inactive account fee** | "a monthly fee may apply to inactive accounts until reactivated" | [terms-highlights.md](https://www.fanduel.com/knowledge/policies/terms-highlights.md) — **first party** |
| App | 4.7★, 97.4K reviews, 1M+ downloads, **"Contains ads"**, updated 2026-08-28 | [Google Play](https://play.google.com/store/apps/details?id=com.fanduel.android.self&hl=en_US) |

Two things to note against GSE. First, **FanDuel's fantasy app carries ads; Sleeper's does not**
("100% Ad Free", [sleeper.com/fantasy-football](https://sleeper.com/fantasy-football)) — the free
league product out-polishes the billion-dollar operator on the most basic respect-for-user axis.
Second, an **inactive-account fee** is exactly the kind of negative-option friction
`_competitor-mistakes-lessons.md` §2 flags as FTC/ROSCA-adjacent. GSE's frictionless-cancel
posture is a live contrast, not a theoretical one.

### 2.4 The one real product limit anyone publishes

Across all three, in every surface I read, I found **exactly one hard numeric feature cap** in a
league product: Sleeper's supplemental drafts, "There is no limit to how many you can have, but
each one has a **10-round maximum**", dynasty-only
([What draft types are supported?](https://support.sleeper.com/en/articles/9701062-what-draft-types-are-supported)).

Everything else that functions as a limit is **regulatory** (state availability), **financial**
(entry fee), or **platform** (desktop-Chrome-only import; mobile-only FAAB adjustment;
Best Ball's missing web version). **There are no seat caps, no lineups-per-run caps, no
exports-per-day caps, no sims-per-slate caps — because none of these three sells a tool.** That
is a genuinely important negative result for GSE's positioning: the tool-shaped competitors with
those caps are in `wave2/sabersim.md`, `wave2/fantasylabs.md`, `wave2/stokastic.md`. DK, FD and
Sleeper are not competing on tool limits at all.

---

## 3. Accuracy claims vs. published evidence

**None of the three publishes anything about the accuracy of its own projections.** No
calibration curve, no Brier score, no hit rate against a projection, no track record, no ROI, no
CLV. Searched first-party marketing, help centres, `llms.txt` knowledge mirrors, and store
listings. **NOT CONFIRMED for all three.**

But two of them publish something GSE should study closely, because it is the *format* GSE is
trying to occupy — a mandated, first-party, quantitative disclosure of **outcomes**.

### 3.1 DraftKings' Average Results page — published, first-party, brutal

[draftkings.com/average-results](https://www.draftkings.com/average-results), read 2026-09-08.
Verbatim framing: "The tables below describe the rates of success of all DraftKings players,
which are aggregated across all players competing in all contests, sports, and game types."

**Distribution of entry fees and winnings:**

| % of all DK users | 1 Mo Fees | 1 Mo Winnings | 3 Mo Fees | 3 Mo Winnings | 6 Mo Fees | 6 Mo Winnings |
|---|---|---|---|---|---|---|
| Top 1% | 26% | **45%** | 26% | 41% | 25% | 37% |
| Top 5% | 29% | 51% | 28% | 44% | 27% | 39% |
| Top 10% | 30% | 51% | 28% | 44% | 27% | 40% |
| Top 25% | 30% | 52% | 29% | 45% | 27% | 40% |
| Top 50% | 31% | 52% | 29% | 45% | 27% | 40% |

**Player statistics:**

| | Last 7 Days | Last 30 Days |
|---|---|---|
| Net Winners | 14% | 13% |
| Break Even | 4% | 5% |
| Net Losers | (not rendered in the 7-day column on the page as served) | **82%** |

**DERIVED** (my arithmetic on their table, method shown): top 1% of users put in 26% of entry
fees and take 45% of winnings over one month → a ratio of 1.73 winnings-share per fee-share.
Rows below the top 1% are nearly flat (top 50% = 31%/52% = 1.68), so **essentially all of the
concentration is inside the top 1%**; the next 49% of users collectively add almost nothing.

### 3.2 FanDuel's Trust & Safety page — same genre, more damning

[fanduel.com/trust](https://www.fanduel.com/trust) §7 "Average Results", read 2026-09-08.

**Distribution of winnings:**

| Measurement Period | Top 1% share | Top 5% share | Top 10% share |
|---|---|---|---|
| Last Month* | **54.14%** | 58.90% | 60.54% |
| Last Three Months** | 45.09% | 49.97% | 51.77% |
| Last Six Months*** | 43.89% | 48.36% | 49.92% |

Their disclaimer, verbatim: "* One Month period is December 2025 ** Three Month period from
October - December 2026 *** Six Month period from July - December 2026". **That is internally
inconsistent** — a "one month period" of December 2025 sitting beside three- and six-month
periods ending December 2026. Read it as a stale footnote, and note it: even the mandated
disclosures are not carefully maintained.

**Winner statistics (weekly ranges, July–December 2026):** All Users net winner **14%–23%**, net
loser **69%–82%**, neutral 3%–10%. Monthly: net winner 17%–22%, net loser 74%–78%.

**Winnings by experience level** (July–December 2025):

| Experience Level | Total Cash Winnings | % of Total |
|---|---|---|
| Non Experienced | $10,879,548 | 2.83% |
| Experienced | $16,995,481 | 4.42% |
| **Highly Experienced** | **$356,638,445** | **92.72%** |

**Average user winnings, L12 months (Jan–Dec 2026):** Average **$530.74** · **Median $2.60**.

**DERIVED:** the mean/median ratio is 530.74 / 2.60 ≈ **204×**. A distribution whose mean is two
hundred times its median is not a distribution anyone should describe with an average, and
FanDuel publishes both side by side. This is the single most quotable number in this file.

### 3.3 What this means for GSE

These are **outcome** disclosures compelled by DFS regulation — they say what happened to users'
money. They are *not* accuracy disclosures: neither company publishes whether its projections
were any good. So the honest reading is:

- **Claim vs proof on model accuracy: zero claims, zero proof, all three.** There is nothing to
  out-claim. There is only something to *out-publish*.
- **The regulatory precedent for publishing a hard number about your own product exists and is
  already normal in this category.** DK and FD both do it. GSE publishing a calibration curve is
  not an exotic act in this market; it is the same genre applied to the thing that actually
  matters.
- **The comparison writes itself and is FTC-safe** (see `_competitor-mistakes-lessons.md` §2,
  because it is a factual comparison of published records, not an earnings claim): *"DraftKings
  publishes that 82% of its players lose money. FanDuel publishes that its median user won
  $2.60. Neither publishes whether their projections were right. We publish whether ours were."*
  Every clause there is a quote from their own page. **Only ship this line once GSE's own
  calibration receipt is live** — per AGENTS.md and the 2026-09-08 score-integrity note, the GSE
  half of that sentence is not currently publishable.

---

## 4. What customers say is missing or wrong

All quotes below are public, dated, first-party store reviews, transcribed verbatim from
[Google Play — Sleeper](https://play.google.com/store/apps/details?id=com.sleeperbot&hl=en_US),
[Google Play — DraftKings](https://play.google.com/store/apps/details?id=com.draftkings.dknativermgGP&hl=en_US),
and [Google Play — FanDuel Fantasy](https://play.google.com/store/apps/details?id=com.fanduel.android.self&hl=en_US),
read 2026-09-08.

**Sleeper — the draft room breaks under load, and it breaks in the worst possible week.**

- Iron Will Coffee, **September 6, 2026**: "Used the app for 2 diffrent drafts. It would shut
  down... alerts would pop up and kick me out of the draft room. **I ended up getting put on
  autodraft due to the app locking up in one league. In the other it drafted an incorrect player
  for me.** I kow this sounds like user error,...but had same issues last year. Im done."
- Chauncey Depew, **August 25, 2026**: "Normally a fantastic app but holy cow, recently **it
  crashes nearly every time I try to open it**. and now that I'm here, **WAY too many
  notifications. way too many.** In general, it's the best fantasy sports app out there but it's
  become so unbelievably frustrating to use."
- Kerry Zee, **September 5, 2026**: "your guys **invitation set up is horrible**. I get sent a
  link to a league that has open spots. but I can't join because it's full. when clearly it's not.
  also the in app invite doesn't work either. nor can I find the leagues name specifically to
  join."
- iOS, quoted in the App Store listing: "I hate how they have changed the app and taken away all
  of the fun things that made me want to bring my main league here" — with specific complaints
  about missing player outlooks and difficulty finding waiver-wire order
  ([App Store — Sleeper](https://apps.apple.com/us/app/sleeper-sports/id987367543); 4.7★, 274K
  ratings, v151.1, August 30, 163.1 MB, 18+).
- Third-party synthesis, **NOT a first-party quote**: users report Sleeper "seems more focused on
  making it a sports betting app, with the regular fantasy section being largely forgotten", plus
  geolocation issues, generic support, and removal of mascots; the same source notes Sleeper "has
  since added an option in the account settings menu to disable all Picks and Daily Draft notices"
  ([bettingusa.com](https://www.bettingusa.com/fantasy/reviews/sleeper/), whose own Cons list is
  "Complicated App · Frequent Bugs for Some Users · Lacks Live Phone Support").

**DraftKings — network fragility during drafts, and the prize-concentration complaint.**

- Richard Pellecchia II, **July 8, 2026**: "won't work on most Wi-Fi networks, it won't work if
  you are on LTE network… It's constantly crashing or buffering… **It really impacts your ability
  to do best ball as you will miss drafts or autodrafts garbage.**"
- Levius Akuma, **August 27, 2026**: "the app won't even load… the app just stops working every
  single time."
- iOS review quoted on the App Store listing: won a "$100k side prize" that resolved to "a
  whopping $4.52" once split among thousands of winners
  ([App Store — DraftKings](https://apps.apple.com/us/app/draftkings-fantasy-sports/id710535379)).
  That is §3.1's concentration table experienced as a user.

**FanDuel — trust, not features.**

- Joseph, **April 25, 2026**: "I believe I caught FANDUEL filling the (G)uarenteed contests, thus
  giving customers a major disadvantage… entries were added well after the deadline start time…
  they have ignored my grievance #41849441."

**The pattern across all three, stated carefully.** These are self-selected store reviews, not a
sample — do not read a rate off them. What they *do* establish is the shape of the failure that
costs these products users: **it is never the feature list, it is the draft room falling over on
draft night, and notification volume.** Sleeper's own most-cited strength (draft room) and its own
documented architecture (four-level notifications) are exactly where its September 2026 reviews
land. A competitor cannot beat Sleeper on draft-room features; it can beat Sleeper by not
crashing and not spamming — but that is a reliability-engineering race against a 13M-user
incumbent, and it is not a race GSE should enter (§6).

---

## 5. THE SEAM — what GSE can do that they cannot or will not

**Seam 1 — Nobody publishes a number about a lineup decision, and one of them is publicly being
asked to.** Sleeper users are, on Sleeper's own message surface, repeatedly asking for playoff
odds and win probabilities (§1.2, six distinct requests cited). Sleeper has not shipped it.
DK and FD cannot ship it — they have no league to compute it over. A season-simulation playoff-odds
surface, published with a coverage denominator and a calibration record, is a product **only GSE
is structurally positioned to build** among these four, and it is the exact output shape of the
existing prediction engine.

**Seam 2 — They will not attach a confidence interval to a start/sit call, because it creates
liability they have no reason to accept.** DK and FD are DFS operators whose regulated
disclosures already publish that 82% / 69–82% of users lose money (§3). Adding "our projection
was right 61% of the time on this slice, n=340" to that page is pure downside for them. Sleeper
monetises Picks, where publishing your own projection accuracy tells your customers exactly which
lines to attack. **All three have a positive commercial reason NOT to do the one thing GSE's
entire premise requires.** This is the same structural asymmetry `_competitor-mistakes-lessons.md`
§5 identifies on the incentive axis, applied to the fantasy surface.

**Seam 3 — Sleeper's API is open, read-only, and keyless.** [docs.sleeper.com](https://docs.sleeper.com/)
verbatim: "a read-only HTTP API that is **free to use for non-commercial purposes**"; "No API
Token is necessary, as you **cannot modify** contents via this API"; "stay under **1000 API calls
per minute**, otherwise, you risk being IP-blocked"; endpoints cover users, avatars, leagues,
rosters, league users, matchups, playoff brackets, transactions, traded picks, NFL state, drafts,
draft picks, and players including trending. **GSE can read a user's real Sleeper league without
a partnership, without OAuth, and without the user surrendering a password** — which is exactly
what `apps/web/app/fantasy/connect/page.tsx` already does. DK and FD expose nothing comparable
(FanDuel's robots.txt disallows `/api` outright).

> **⚠ HARD FLAG, must go to the founder before any paid surface leans on this.** That licence is
> **"free to use for non-commercial purposes"**, and "For commercial applications, you must reach
> out to us directly to discuss licensing." GSE's Fantasy tier is $4.99/mo · $49/yr (CLAUDE.md).
> A paid subscription reading Sleeper's free tier is, on the plain text of their own docs, a
> **commercial use of a non-commercial licence.** This is the same class of rights question the
> clearance engine exists for (`.claude/rules/scraping.md`, `checkClearance()`); I did not check
> whether `sleeper` carries a registry entry, and doing so is not this task. **Do not build more
> paid surface on Sleeper reads until either (a) a licensing conversation happens, or (b) the
> Sleeper-backed features are confirmed free-tier only.** This is a founder decision, not an
> agent one.

**Seam 4 — Email.** Sleeper states plainly: "**We do not offer a way to receive league alerts
through email**" ([support](https://support.sleeper.com/en/articles/1876026-how-do-notifications-work-on-sleeper)),
and its September 2026 reviews complain about push volume. GSE's Elite tier already sells
"real-time email & push alerts" (CLAUDE.md). A **weekly email** — one message, before the waiver
deadline, with the three decisions that actually matter and the number behind each — is a channel
the market leader has explicitly declined to build, delivered at a cadence its users are
explicitly asking for less of on the channel it does have.

**Seam 5 — The comparison itself is free ammunition, and it is entirely quotes.** §3's numbers
are on DK's and FD's own pages, published under their own names, because regulators require it.
GSE can cite them verbatim forever without an FTC substantiation problem, because quoting a
competitor's own compelled disclosure is not an earnings claim about GSE.

**And the anti-seam, stated as plainly:** GSE will not out-build Sleeper's league software. 127
help articles, four waiver modes per day, soft timers, indefinite pause, big-screen mode,
unlimited undo, a fully editable draftboard, 13M+ players, and it is free with no ads. **Any
roadmap item that reads "build a better draft room" or "build a better commissioner tool" is a
loss.** The seam is not the league. The seam is the *number attached to a decision inside someone
else's league.*

---

## 6. The 2026 UX bar, and what a small team can and cannot match

Judged against Sleeper (the actual bar for league mechanics) and DK/FD (the bar for money
polish). "Match" means a small team can plausibly reach parity; "Cannot" means do not try.

| Surface | The 2026 bar | Small team? |
|---|---|---|
| **Onboarding** | Sleeper: install → account → league in one app; import runs in "30–60 seconds" | **Match.** GSE's advantage is it needs no account migration at all — read-only sync, `/fantasy/connect` |
| **League sync / import** | Sleeper: desktop-Chrome extension, source platforms unnamed, "starts with just you" | **Beat.** Their own import is desktop-only, extension-gated, requires the other platform's login, and does not bring leaguemates. A keyless read-only API sync is a *better* onboarding than the market leader's |
| **Draft room** | Soft timer, indefinite pause, mid-draft timer change, forced CPU pick from queue, big-screen mode, board view, unlimited undo, fully editable board, 90s standard / 1h–24h slow | **Cannot.** Do not build a draft room. Build a *draft assistant* that reads the board |
| **Waivers** | Four per-day modes (FA/Waivers/Locked/Waivers→FA), Rolling/Reverse/FAAB priority, blind bidding in value-ranked order, year-round movement, pre-draft moves | **Cannot** build the engine. **Can** build the *recommendation over* it — GSE already has `apps/web/app/fantasy/waivers` |
| **Notifications** | Four control levels (app/channel/topic/user), per-channel granular toggles, mute/block; **no email at all** | **Match, and beat on email.** Volume discipline is a design decision, not an engineering budget |
| **Mobile** | Native iOS + Android, 163MB, weekly-to-fortnightly releases (Sleeper v151.1 Aug 30; DK v5.76.0 Sep 1; FD updated Aug 28) | **Cannot ship native.** A fast, installable, mobile-first web surface is the realistic bar. Note DK's own Best Ball still lists "a web version" as *forthcoming* — web is a seam, not a handicap |
| **Reliability under peak load** | The incumbents visibly fail here (§4) — but they fail at 13M and 5M+ users | **Do not race.** Losing a user's draft is unrecoverable; the correct move is to not own the draft |
| **Money in / money out** | SleeperSafe, Apple Pay/Venmo/PayPal/bank/cards, state-by-state licensing across 31+ states, CFTC/NFA registration | **Cannot and must not.** Also forbidden by GSE doctrine (`_HANDOFF` §1: no real-money, no prize pools) |
| **Chat / social** | In-league threads, live game chat, GIFs, reactions, player/team channels | **Cannot** at that depth, and it is not GSE's fight |
| **Published number about a decision** | **Nobody ships one.** Sleeper users ask for it publicly and are unserved | **The whole opportunity.** See §7 |

---

## 7. Concrete build items for GSE /fantasy

Ordered by leverage. Every item names a real entry point in the repo. **None of these flips a
gate, publishes a number, or touches a threshold** — the publish decisions are founder-gated per
AGENTS.md law 3, and per the 2026-09-08 score-integrity note the settled record is not currently
a defensible base for any published performance figure.

1. **Playoff odds / season simulation for a synced Sleeper league.** The most-requested unshipped
   feature on the best league product in the market (§1.2, six cited public requests). Entry
   point: `apps/web/lib/fantasy/league-twin.ts` + `apps/web/app/fantasy/league-twin/page.tsx`
   already exist as a league-model surface; `packages/prediction-engine` supplies the per-game
   distribution. Ship it **with a coverage denominator and an interval**, per `_HANDOFF` §1 —
   a bare "you're 63% to make the playoffs" is exactly the unsubstantiated number the doctrine
   forbids. **Effort: medium.** This is the single highest-leverage item in this file.

2. **A weekly pre-waiver email — one message, three decisions, a number on each.** Sleeper
   states it has no league email at all, and its users are complaining about push volume in the
   same week (§4, §5 seam 4). Entry points: `apps/web/app/fantasy/waivers/page.tsx` and
   `apps/web/lib/fantasy/waivers.ts` for the content; Elite-tier email already exists as a
   product promise. **Effort: small-to-medium.** Highest ratio of differentiation to build cost.

3. **Resolve the Sleeper API licence question before shipping anything else paid on it.**
   `docs.sleeper.com` says free tier is non-commercial; GSE's Fantasy tier is $4.99/mo. Entry
   points: `apps/web/app/fantasy/connect/page.tsx`, `apps/web/lib/fantasy/sleeper-season.ts`,
   and the rights registry under `apps/web/lib/scraping/`. **Founder decision, not an agent
   one. Effort: small to check, unbounded to resolve.** Blocking risk on items 1, 4 and 5.

4. **A start/sit and waiver call that carries its own receipt.** The differentiator is not the
   recommendation — it is that the recommendation is logged before kickoff and graded after, per
   the Glass Ledger pattern in `_HANDOFF` §2 Phase 2, scoped to fantasy. Entry points:
   `apps/web/lib/fantasy/lineup.ts`, `apps/web/lib/fantasy/gm-ledger.ts` (a ledger surface already
   exists at `apps/web/app/fantasy/gm-ledger`). **Effort: medium.** This is the only thing in the
   category that none of the three will ever do (§5 seam 2).

5. **Draft *assistant*, never a draft *room*.** Sleeper's room cannot be beaten (§6) and losing a
   user's draft is unrecoverable. A read-only companion that watches the synced board and surfaces
   value-vs-ADP with an interval is the winnable version. Entry points:
   `apps/web/lib/fantasy/draft.ts`, `apps/web/lib/fantasy/adp-source.ts`,
   `apps/web/app/fantasy/draft/page.tsx`. **Effort: medium.**

6. **Notification volume as an explicit, marketed design constraint.** "WAY too many
   notifications. way too many." (Sleeper, Aug 25 2026) is a competitor's most-upvoted complaint
   in draft season. A published cap — *n* alerts per week, each one tied to a decision with a
   deadline — is a positioning asset that costs almost nothing to honour. Entry point: whatever
   drives Elite alerts today. **Effort: small.**

7. **A public comparison page built only from their own compelled disclosures.** DK: "82%" net
   losers. FD: median winnings "$2.60" against a $530.74 mean (204×, DERIVED §3.3). Neither
   publishes projection accuracy. Quote, link, date, done — no GSE number required, so it is
   FTC-safe today (`_competitor-mistakes-lessons.md` §2). **Effort: small.** But per `check-claims`
   doctrine, **the GSE half of the sentence stays out until a calibration receipt is live.**

8. **Do not build:** a draft room, a waiver engine, a commissioner suite, chat, native apps, or
   anything touching money movement. Each is a direct loss against a free, ad-free, 13M-user
   incumbent or a licensed operator — and the last is forbidden outright by GSE doctrine.

---

## 8. Open questions / what I could not confirm

- **Sleeper's import source platforms.** Neither [sleeper.com/import](https://sleeper.com/import)
  nor the [help article](https://support.sleeper.com/en/articles/16203584-how-to-import-your-league-history-to-sleeper)
  names ESPN, Yahoo, CBS, MFL or NFL.com. Only a third-party Chrome Web Store listing does.
- **Sleeper Picks max multiplier.** Store listing says "up to 1000x"; a third-party review says
  "up to 100x". Unresolved on any first-party page. **Both unverified.**
- **FanDuel Friends Mode mechanics.** `fanduel.com/friends` is JS-gated and I did not execute
  their JS. The weekly-redraft mechanic rests on RotoGrinders, not FanDuel.
- **DraftKings entry fees, contest sizes and Pick6 payout ladders.** All third-party. DK's lobby
  paths (`/contest/`, `/lobby-classic/`) are robots-disallowed and were not fetched.
- **Sleeper's ARR (~$85M) and any user/revenue figure beyond "13M+ Active Players"**
  ([sleeper.com/download](https://sleeper.com/download)) — third-party only, NOT CONFIRMED.
- **Whether any of the three runs a simulation engine internally.** No public evidence either
  way. Absence of publication is the finding; absence of an engine is not established.
- **Whether Sleeper carries a source-rights registry entry in this repo.** Not checked — outside
  this task's scope, and named here so it is not forgotten.

---
*Captured 2026-09-08 by the wave-2 competitive research pass. Public surfaces only. No
authentication, no paywall crossing, no robots-disallowed path, no endpoint scanning.*
