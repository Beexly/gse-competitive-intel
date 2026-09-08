# propfinder.app — Deep Teardown

**Captured 2026-09-08 UTC.** Method: their own public surfaces only — `robots.txt`, `sitemap.xml`,
response headers, the JSON-LD graph, the App Store payload, and **the ~2 MB of JavaScript their
site serves to every anonymous visitor**. No authentication was attempted, no paywall was crossed,
no `Disallow`ed path was fetched, and no endpoint was scanned. Everything below is either quoted
from a file they publish or derived from code they ship to the browser.

Two paths named in this document were deliberately **not** touched: the log server on a bare IP
(§SECURITY, finding 1) and every path under their `robots.txt` `Disallow` list. They are reported
because they are disclosed in public source, not because they were accessed.

---

## THE ONE-PARAGRAPH VERSION

PropFinder has **excellent data and a weak scorer**, and that asymmetry is the whole competitive
story. Their stat dictionary runs to **354 defined fields** including coverage-separation buckets and
rushing-scheme splits — genuine charting-tier NFL data we do not currently match — and their MLB
Statcast work is legitimately sharp. But the thing they sell on top of it, **PF Rating**, is not a
model: it is an arithmetic sum of hand-weighted components, **30 of the NFL formula's 100 points are
binary yes/no threshold tests that discard magnitude entirely**, and **the whole formula ships in
their public JavaScript bundle** — I reconstructed it below, and third parties are already farming
their API. They have real machine learning (`/xgboost`) but it is **admin-gated and MLB-only**, so no
customer has ever seen it. They publish **no calibration, no probability, no track record and no
CLV** anywhere, while marketing to "55,000+ **Winning** bettors" and a Discord of "18,000+" that
**Discord's own API puts at 16,735 today**. A confident, uncalibrated score sold on unverifiable
claims is the exact seam our "math you can read" positioning cuts — and a paying customer has already
published the attack for us in a 1-star review. Their real moat is not the math; it is **396K monthly
visits at 78% direct traffic, 77.7K X followers and a daily live show.** That is what we should be
worried about, and it is not what they advertise.

---

## CORPORATE

- **Legal entity: `PropFinder, Inc.`** — the App Store developer name and the copyright line
  (`© 2026 PropFinder, Inc.`). Apple's Information shelf renders the seller as `PropFinder Inc`
  (no comma). Apple `artistId` 6773949833.
- **Support is an email address and a Discord, nothing more:** `support@propfinder.app`, and
  `discord.gg/propfinder`. Their own FAQ (JSON-LD, verbatim): *"You can reach us at
  support@propfinder.app, through our Discord server, or on any of our social media pages."*
- **No physical address is published anywhere** — not on Apple's listing, not in the privacy policy.
- **No App Support URL on the App Store listing at all** — only Developer Website and Privacy
  Policy. A user with a billing problem has no in-listing route to them, which is visibly costing
  them (see MOBILE-APPS).
- Social: `x.com/PropFinderApp` (**77,726 followers**, joined 2024-06-10, verified),
  `instagram.com/propfinderapp`, `youtube.com/@Propfinderapp`, `discord.gg/propfinder`.
- Their own self-description, verbatim from the App Store copy — note the deliberate anti-AI framing,
  which is **the same lane we occupy**:
  > "WHO BUILDS PROPFINDER? Engineers, modelers, and bettors. We got tired of bouncing between tabs
  > and spreadsheets to research a single prop, so we built the app we wished existed."

---

## INFRA

Read entirely off response headers and asset hosts.

| Layer | Observed |
|---|---|
| Web edge | `nginx/1.24.0 (Ubuntu)` — self-managed, not a PaaS |
| App framework | **Next.js App Router**, built with **Turbopack** (`x-powered-by: Next.js`; `vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch`) |
| UI kit | **MUI (Material-UI)** — `MuiCardActions`, `MuiOutlinedInput`, `styled()`, `alpha()` throughout |
| Client data layer | **TanStack React Query** (`onlineManager`; cache keys like `["mlb","weather-games"]`) |
| Client state | **Zustand** (`.getState().user` / `setUser`) |
| HTTP client | **axios** |
| Static/CDN | **DigitalOcean Spaces** (`pf-static.nyc3.cdn.digitaloceanspaces.com`) fronted by **Cloudflare** (`cf-cache-status: HIT`, `cf-ray`, `server: cloudflare`) |
| Compute | **DigitalOcean droplets** — the log server hardcoded in their bundle is `152.42.155.195`, a DO range, consistent with the `nyc3` Spaces region |
| **Backend** | **ASP.NET Core / C#** — see TECH-STACK. This is the highest-confidence non-obvious finding. |
| Blog | `blog.propfinder.app` — **also self-hosted Next.js on the same nginx**, not Ghost/WordPress/Beehiiv |
| Fonts | Outfit (display) + Roboto (body), self-hosted |

### Hosts referenced by their own bundles
`api.propfinder.app` · `hangfire.propfinder.app` · `hangfire-odds.propfinder.app` ·
`blog.propfinder.app` · `us.i.posthog.com` / `us-assets.i.posthog.com` · `sentry.io` ·
`buy.stripe.com` / `billing.stripe.com` · `propfinder.onelink.me` (AppsFlyer) ·
`switchboard.actionnetwork.com` · `flagcdn.com` · `pf-static.nyc3.cdn.digitaloceanspaces.com`

---

## TECH-STACK — the backend, inferred from five independent tells

Their backend is **ASP.NET Core**. Nothing on the marketing site says so; five separate artifacts do:

1. **Two Hangfire dashboards**, hardcoded in the admin menu that ships to every anonymous visitor:
   `https://hangfire.propfinder.app/hangfire` (labelled **"Background Jobs"**) and
   `https://hangfire-odds.propfinder.app/hangfire` (labelled **"Odds Jobs"**).
   Hangfire is a .NET-only background-job scheduler. **They run a dedicated, separately-hosted job
   server just for odds ingestion** — an architectural decision that says odds volume outgrew the
   general worker.
2. **The Microsoft role-claim URI in their JWTs**:
   `http://schemas.microsoft.com/ws/2008/06/identity/claims/role` — emitted by
   `System.IdentityModel` / ASP.NET Core Identity, by nobody else.
3. **`/identity/authenticate`, `/identity/register`, `/identity/refresh`, `/identity/logout`,
   `/identity/user`** — ASP.NET Core Identity controller conventions.
4. **PascalCase route and DTO names** beside camelCase ones: `/HighlightConfigs`,
   `GameOverOdds`, `GameUnderOdds`, `HomeTeamOdds`, `HomeTeamSpreadOdds`, `VisitorTeamOdds`,
   `VisitorTeamSpreadOdds`, `NFLPlayerSplits` — C# property naming leaking through the wire.
5. **Casing inconsistency between controllers** — `/mlb/weather-notes` (lowercase) against
   `/NFL/weather-notes` (uppercase). Two controllers, two conventions, no route normalization.

### Their client resilience layer is genuinely good — do not underestimate them
From `resolveApiBase()` and the axios interceptor module, verbatim behaviour:

- **Circuit breaker**: opens after **5** consecutive transient failures; half-open after **10 s**;
  probes `GET /health/live` to close; recovery backoff `10 s × 2^(n−1)` capped at **30 s** + jitter.
- **Retry**: `RETRY_MAX_ATTEMPTS = 3`, backoff `400 × 2^(n−1)` capped at **8 000 ms**, full jitter;
  additional **150–900 ms** jitter helper.
- **Retryable statuses**: `408, 425, 429, 500, 502, 503, 504`.
- Health state (`healthy` / `degraded`) is pushed into React Query's `onlineManager`, so the whole
  UI degrades coherently.
- Auth endpoints bypass the breaker so a user can always try to log in.

This is a mature engineering team on the plumbing. Their weakness is **not** craft. It is
**epistemics** — see PRODUCT-PREDICTIONS.

---

## AUTH + ENTITLEMENT MODEL

- JWT bearer with refresh: `POST /identity/refresh` with `{expiredAccessToken, refreshToken}`.
- **Subscription state is carried as JWT claims**: `sub_status`, `sub_end`, `sub_plan`, `is_active`,
  plus the role claim. The client reads them directly to decide what to render.
- **Roles observed: `Admin`, `Forecaster`.** (`canManageNotes = role === "Admin" || role === "Forecaster"`.)
- The access token is also written to a **JavaScript-readable cookie**:
  `document.cookie = "accessToken=…; path=/; max-age=604800; SameSite=Lax"` — **7-day lifetime,
  no `HttpOnly`, no `Secure`**.
- Public (unauthenticated) route allowlist, shipped in the bundle: `/reset`, `/pricing`, `/privacy`,
  `/terms`, `/home`, `/tutorials`, `/responsible-gambling`, `/health`, `/h`, `/c`, `/weather`,
  `/nfl/weather`, `/ping`, `/auth`, `/player`, `/shared-bet`.

---

## PRODUCT-PREDICTIONS — the core finding

### "PF Rating" (PFR) is a scorecard, not a model, and they ship the formula

The module exports these, in the clear:

```
CalculateHomeRunGrading · CalculateMLBPFRating · CalculateNBAPFRating
CalculateNFLPFRating   · CalculateNHLPFRating · calculateNBAProbability
```

Each criterion is constructed as
`new PFRatingCriteria(label, displayValue, score, lowThreshold, midThreshold, maxPoints)`, and the
final rating is a plain **unweighted arithmetic sum** of the component scores. Four distinct sum
expressions exist, one per sport, with **9, 6, 4 and 4 terms** respectively:

```
Math.round((S+b+I+C+B+E+M+x+q)*10)/10     // 9 terms  — NFL, sums to 100
Math.round((R+y+b+N+Y+H)*10)/10           // 6 terms
Math.round((f+_+g+p)*10)/10               // 4 terms
Math.round((o+h+O+G)*10)/10               // 4 terms
```

**The complete criterion inventory with its point caps** (full artifact in
`propfinder-raw/pf-rating-criteria.txt`):

| Criterion | low | mid | MAX |
|---|---|---|---|
| Blowout Potential | 3.3 | 6.6 | 10 |
| Expected High/Low Scoring Game | 3.3 | 6.6 | 10 |
| L10 Defensive Matchup | 5 | 10 | 15 |
| Season Hit Rate | 3.3 | 6.6 | 10 |
| Season Average | 3.3 | 6.6 | 10 |
| L5 Average | 5 | 10 | 15 |
| L5 Hit Rate | 3.3 | 6.6 | 10 |
| L10 Average | 3.3 | 6.6 | 10 |
| L10 Hit Rate | 3.3 | 6.6 | 10 |
| L5 / L10 Average Grade *(NBA)* | 10 | 20 | 30 each |
| Expected High Scoring Game | 5 | 10 | 15 |
| Last 15 EV *(MLB, Statcast exit velocity)* | 0 | 10 | 20 |
| Last 15 Barrel % *(MLB, Statcast)* | 0 | 10 | 20 |
| Hitter / Pitcher vs `{pitchCode}` *(MLB pitch-mix)* | — | — | — |
| H2H Hit Rate | 5 | 10 | 15 |
| Last 5 / Last 10 Shot Volume *(NHL)* | 5 | 10 | 15 each |
| **2025** Hit Rate | 5 | 10 | 15 |
| **2025** Average | 3.3 | 6.6 | 10 |

The **NFL** formula is the clean one and it sums to exactly **100**:
`Blowout 10 + Expected 10 + L10 Def Matchup 15 + Season Hit Rate 10 + Season Avg 10 + L5 Avg 15 +
L5 Hit Rate 10 + L10 Avg 10 + L10 Hit Rate 10 = 100`. That matches the `PFR: 90.3` values on their
own App Store screenshots.

### The NFL / CFB formula, decompiled and confirmed (100 points)

**Confirmed as the NFL/CFB function** by the team-count constant inside it:
`this.Matchup=[0, "NBA"==e ? 30 : "CFB"==e ? 265 : 32]` and a runtime CFB fallback to `265`.
Sum expression `Math.round((R+y+b+N+Y+H)*10)/10`.

| # | Criterion | Max | Shape |
|---|---|---|---|
| `y` | Expected High Scoring Game | 15 | linear on game total; inverted for unders |
| `R` | L10 Defensive Matchup | 20 | `20 × (1 − rank/N)`, N = 32 NFL / 265 CFB; inverted for `passingInterceptions` and unders |
| `N` | Last 5 Hit Rate | 20 | `20 × l5Pct/100` — linear |
| `b` | 2025 Hit Rate | 15 | `15 × pct/100` — linear |
| `Y` | Last 5 Average | 20 | **binary — 20 if the average beats the line, else 0** |
| `H` | 2025 Average | 10 | **binary — 10 if the average beats the line, else 0** |
| | **TOTAL** | **100** | |

Matchup label thresholds, also in the clear: rank `<10` → **"Good Matchup"**, `<20` → **"OK Matchup"**,
else **"Bad Matchup"**.

**Three things fall out, and they are the competitive case:**

1. **30 of the 100 NFL points are binary step functions.** `Y` and `H` ask only *"is the player's
   average above the line?"* and award full points or zero. **A player averaging 0.01 over the line
   scores identically to one averaging 10 over.** Magnitude is discarded across nearly a third of the
   score, in the sport they are marketing hardest.
2. **Four of six components restate the same recent-form series** — L5 and season, each as both an
   average and a hit rate. That is one measurement counted four ways, and it is the measurement a
   prop market prices first.
3. **Matchup is ordinal only.** `20 × (1 − rank/N)` uses the opponent's *rank*, never the size of the
   gap, so the 1st and 2nd ranked defenses score nearly identically however far apart they really are.

### A second 100-point formula exists, on a 30-team sport — sport not resolved

`Math.round((S+b+I+C+B+E+M+x+q)*10)/10`, nine terms, also summing to 100:

```js
S = R ? parseFloat(A.toFixed(1)) : 5              // Blowout Potential      10   DEFAULT 5 if no spread
b = 10 * (T ? clamp01((f-y)/(w-y)) : 0.5)         // Expected scoring game  10   DEFAULT 5 if no total
I = 15 * ((over ? D-N.Rank : N.Rank) / D)         // L10 Defensive Matchup  15
C = (seasonPct / 100) * 10                        // Season Hit Rate        10   linear
B = 10 * (l5Pct / 100)                            // L5 Hit Rate            10   linear
E = over ? (Y <= r ? 0 : 15) : 15 * (Y <= r)      // L5 Average             15   BINARY
M = over ? (H <= r ? 0 : 10) : 10 * (H <= r)      // Season Average         10   BINARY
x = over ? (Q <= r ? 0 : 10) : 10 * (Q <= r)      // L10 Average            10   BINARY
q = 10 * (l10Pct / 100)                           // L10 Hit Rate           10   linear
                                                  // ------------------------------
                                                  //                       100
```

**35 of 100 binary here**, and two components **default to half credit when the input is missing**
(no spread → `S = 5`; no total → `b = 5`). An absent input is scored as a mediocre input rather than
withheld.

*(Direct contrast, and it is now a shipped difference rather than a preference: our
`galaxy-index.ts` **omits** a signal it does not have, on the stated ground that a fabricated
midpoint asserts a measurement nobody made.)*

**I could not resolve which sport this is.** Its window references both `MLB` and `NBA` and it uses a
30-team pool — true of both. **Earlier in this analysis I asserted it was the NFL formula. That was
wrong**; the 265/32 tell places NFL/CFB on the 6-term function above. Recorded so the error is not
inherited.

### The other two formulas — the flaw is NOT uniform, and that matters

Being precise, because overstating this would be the same sin we are accusing them of.

**NBA (4 terms, 90 points) — this one is well built.**
```js
f = 15 * (l5Pct  / 100)          // L5 Hit Rate           15  linear
_ = 15 * (l10Pct / 100)          // L10 Hit Rate          15  linear
g = 30 * l(o, d, over)           // L5 Average Grade      30  graded, continuous
p = 30 * l(o, u, over)           // L10 Average Grade     30  graded, continuous
```
**No step functions.** The averages run through a continuous grading function rather than a threshold
test. Their NBA rating is materially better than their NFL one.

**MLB Home Run grading (4 terms) — Statcast-native and legitimately sharp.**
```js
o = i<90 ? 0 : i>100 ? 20 : (i/100)*20     // exit velocity, floor 90 mph, cap 100    20
h = n<7  ? 0 : n>20  ? 20 : (n/20)*20      // barrel %,      floor 7%,     cap 20%    20
O = I.reduce(...)                           // Hitter  vs pitch-type, usage-weighted
G = L.reduce(...)                           // Pitcher vs pitch-type, usage-weighted
```
Pitch-mix terms are weighted by each pitch's usage share (scale 40 when the opposing pitcher is
unknown, else 20). Uses **ISO** for totalBases/doubles/triples/homeRuns and **BA** otherwise; ISO
saturates at .200, BA at .250; falls back to last season when the current one has no rows.
This is the best thing in their product, and it is why MLB HR is the feature their advocates name
(*"Stopped guessing on MLB HR plays"*). **Do not underestimate their baseball work.**

**Net:** the binary-step defect is confirmed in **NFL/CFB (30 pts)** and present in the unresolved
30-team formula (35 pts). **NBA and the MLB HR grade are continuous and well constructed.**

### What this means, stated precisely

- **PFR is deterministic and explainable** — genuinely so; the UI even lets a user click into the
  criteria. Their own X post says *"Currently, PF Rating only factors in these three stats (you can
  check what PF rating takes into account by clicking on it in Research tab…)"* (snippet only; X
  returned HTTP 402 and I could not retrieve the full thread).
- **But it is not a probability, and it is not calibrated.** It is a points total out of ~100. There
  is no `p`, no `q`, no `edge = p − q`, no Brier score, no reliability curve, and no settled-results
  surface anywhere in the product, the screenshots, the listing, the FAQ, or the marketing site.
- **The weights are hand-set round numbers** (3.3 / 6.6 / 10 — literally thirds of 10). Nothing here
  was fitted. There is no evidence any component weight was ever validated against outcomes.
- **Hit rate is counted four times.** Season Hit Rate, L5 Hit Rate, L10 Hit Rate and H2H Hit Rate
  are four of nine NFL components — ~45 of 100 points — and they are heavily collinear with each
  other and with Season/L5/L10 Average. A player on a hot streak scores high on six components that
  are largely the same measurement. **This systematically over-rates recent form**, which is exactly
  the bias a prop market already prices in. That is the single most attackable thing in their engine.

### Their real ML is hidden from customers
`/xgboost` exists, and the nav entry that reaches it is gated `"mlb" === sport && user.isAdmin`.
So: **XGBoost, MLB-only, admin-only.** They have a modeller, and whatever it produces has never been
put in front of a paying user. Two readings, both useful to us: either it isn't good enough to ship,
or they haven't solved how to present a probability honestly. We have solved that second problem.

### The weather product is partly human labour
`canManageNotes = role === "Admin" || role === "Forecaster"`. There is a **`Forecaster` role**, a
rich-text (bold/italic) note editor, and a manually-set traffic-light indicator with two distinct
vocabularies:

- **MLB** — `Green: "Clear"`, `Yellow: "Chance For Delay"`, `Orange: "Delay Likely, Chance For a
  Postponement"`, `Red: "Postponement Likely"`
- **NFL** — `Green: "No impact"`, `Yellow: "Minor impact"`, `Orange: "Significant impact"`,
  `Red: "Severe impact"`

Endpoints: `/mlb/weather-notes`, `/mlb/weather-game`, `/mlb/weather-notes/{id}` and the `/NFL/…`
equivalents (GET/POST/PUT). **Their weather edge is an analyst typing notes.** It does not scale,
it is not reproducible, and it cannot be audited — but it is also warm and specific in a way a
generated string is not. Worth respecting even as we beat it deterministically.

---

## PRODUCT-PACKAGED — the surface, and TWO unlaunched sports

### Shipped, per their own copy
- **Player Dashboard** — trends, matchup analysis, advanced stats, opponent game logs, injuries,
  live odds, custom filtering
- **Cheatsheets** — TD, rushing, redzone, line and coverage matchups; power ratings; weekly usage
- **NFL**: power ratings *with QB adjustments*, QB rankings, win totals, home-field advantage,
  weather, games board with model spreads/totals/projections
- **CFB (FBS)**: power ratings with offense/defense splits, conference filters, games board with
  model spreads, totals and **win probabilities**
- **MLB**: HR Cheatsheet, Statcast exit velocity + barrel %, ballpark + weather, pitcher-vs-lineup
  splits, **NRFI / YRFI**, `/projections/mlb`
- **Saved props** (`/savedprops` with `/me`, `/count/`, `/counts`, `/popular`, `/status`;
  30 s status TTL) and **`/shared-bet`** — social sharing of a slip
- Betslip export to book via deep links

### The roadmap leak: **soccer and NCAAB**
Their league enum, in the bundle, is
`ALL_LEAGUES = ["MLB","NFL","NBA","NHL","WNBA","CFB","NCAAB","SOCCER"]` — **eight leagues, against
the six on every pricing tier and marketing page.** Soccer additionally has real routes built:
`/soccer`, `/soccer/compare`, `/soccer/goalscorers`, `/soccer/matches`, `/soccer/props`,
`/soccer/team/`, `/soccer/trends`, `/odds/soccer`, an `/img/Soccer/teams/` asset path, and a league
selector component with a soccer icon. Their blog also carries empty tag pages for `soccer`, `golf`,
`mma` and `tennis` — aspiration, not shipped.

**Neither NCAAB nor soccer appears on the marketing site, the FAQ, the pricing tiers, or the App
Store description.** Paid-tier copy still reads "all US major leagues (MLB, NBA, NFL, CFB, NHL &
WNBA)". They are building both. Also in the bundle: `ALL_ENVS = ["prod","test","dev"]`.

### Admin surface, shipped to anonymous visitors
The admin menu array is in the public bundle, verbatim:
`{label:"Users",path:"/status"}, {label:"Popups",path:"/popups"}, {label:"Health",path:"/health"},
{label:"Settings",path:"/admin"}, {label:"MLB Pitchers",path:"/admin/mlb-pitchers"},
{label:"Background Jobs",…}, {label:"Odds Jobs",…}, {label:"Logs",path:"http://152.42.155.195:8080/"}`

---

## MONETIZATION

| Channel | Monthly | Yearly |
|---|---|---|
| **Web** (Stripe) | **$14.99** | **$149.99** |
| **iOS** (Apple IAP) | **$19.99** | **$199.99** |

- **iOS is +33.4% on both plans** — the Apple commission passed straight to the user. Their own
  reviewers notice: *"For 20 bucks a month"*, and a 1-star: *"the paywall that starts off at $19.99
  a month."* Any iOS user who visits the website pays $5/mo less.
- The annual discount is weak: $149.99 vs $179.88 = **16.6% off**, for a full year of lock-in.
- **Stripe Payment Links + Billing Portal, not a custom checkout.** All IDs are public in the bundle:
  Monthly `prod_S7KtdrFAmmHTjB` / `price_1RGL0fC4i2Oo8jAIKNIvpCbp`;
  Yearly `prod_SAg8s1ck7yU1Ma` / `price_1RK4ndC4i2Oo8jAIYlJiIKt2`;
  portal `billing.stripe.com/p/login/14kdU63KjeK05RS3cc`.
- **A real defect in their pricing config:** the **Free** tier object carries
  `priceId: "price_1RK4ndC4i2Oo8jAIYlJiIKt2"` — **the same price ID as the Yearly plan.** Free
  should carry none. I did not test whether it is exploitable and make no claim that it is; it is
  reported as a config error visible in their own source.
- **Affiliate revenue on bet placement.** Deep links route through
  `switchboard.actionnetwork.com/v2/passthrough?…&context=propfinder` for Caesars and BetMGM, plus
  AppsFlyer OneLinks for Caesars (`czr.onelink.me/t5iS`) and Hard Rock (`hrbs.onelink.me/vTTH`).
  **This is a monetization path GSE has ruled out** (`no affiliate / no real-money`, per our own
  guardrails) — so it is a revenue line we concede by choice, and a conflict of interest we can
  name. A tool paid by the book when you bet has a reason to want you to bet.
- Free tier: *"Access to 1 game per league"*, *"Access to limited props"*.
- Paid tier bullets (identical monthly and yearly): all US major leagues; **all prop markets
  including alternate markets**; **PF Ratings**; **Cheatsheets**.

### Books integrated
Betslip/deep-link integration observed for **13**: DraftKings, FanDuel, BetMGM, Caesars, Fanatics,
PrizePicks, Underdog, Sleeper, ProphetX, Novig, Hard Rock, bwin, Borgata. Marketing claims
**"18+ Sportsbooks Supported"** for odds display. Note the mix: traditional books **plus DFS
pick'em (PrizePicks/Underdog/Sleeper) plus exchanges (Novig/ProphetX)**. They serve the pick'em
audience deliberately.

---

## SEO-SCALE

- **The public SEO surface is tiny: 7 URLs in `sitemap.xml`** — `/`, `/pricing`, `/tutorials`,
  `/weather`, `/privacy`, `/terms`, `/responsible-gambling`. Everything of value is behind auth and
  therefore un-indexable. They have almost no organic long-tail.
- **`/weather` is their one programmatic-SEO play** and it is well done: the `<title>` renders
  *"MLB Weather Today — September 8, 2026 | Ballpark Weather Conditions | PropFinder"* with the
  live date, `changefreq: daily`, and a description targeting *"Wind speed, temperature,
  precipitation, and how conditions affect hitting stats."* Data model observed: `windSpeed`,
  `windDir`/`windDirection`, `precipProb`, `humidity`, `pressure`, `conditions`, `roofType`, `dome`,
  `ballpark`, `weatherIndicator`.
- **`robots.txt` is an information leak.** It discloses their private route map to anyone who reads
  it: `/status`, `/subscribed`, `/announcements`, `/popups`, `/health`, `/promotions`, `/admin`,
  `/reset`, `/c/`, `/h`, `/auth/`, `/odds/{nba,nhl,mlb,nfl}`, `/nba/projections`, `/projections/`.
  (Honoured — none fetched.)
- Structured data is minimal but correct: `Organization` + `WebSite` + a 6-question `FAQPage`.

---

## GROWTH + ANALYTICS STACK

- **PostHog** product analytics — project key `phc_dc4vNdlAxTBKoLNWanDLdgELGiVDtb02sTJHSfTfvC`,
  host `us.i.posthog.com`, **`autocapture: false`** (deliberate, hand-instrumented),
  `cross_subdomain_cookie: true`, feature flags enabled.
- **Their entire conversion funnel is instrumented in the clear**, event names visible in the bundle:
  `paywall_viewed` · `unlock_banner` · `unlock_button` · `upgrade_clicked` · `checkout_started` ·
  `manage_subscription_clicked` · `stripe_portal` · `login_succeeded` · `past_due` ·
  `user_clicked_skip` · `session_idle_timeout_seconds`.
- **Sentry** error monitoring, wired through PostHog's Sentry integration.
- **AppsFlyer** mobile attribution (`propfinder.onelink.me/Xrhj/rqxlihdh`).
- **Paid acquisition channels, inferred from the UTM/click-ID parameters they parse:**
  `gad_source` (**Google Ads**), `rdt_cid` (**Reddit Ads**), `li_fat_id` (**LinkedIn**),
  `mc_cid` (**Mailchimp** email), plus full `utm_*`.

---

## DATA-PROVENANCE — vendors identified, and zero attribution to customers

### Their actual supply chain

| Layer | Vendor | Evidence |
|---|---|---|
| **Odds** | **OpticOdds** | Exported class `OpticOdds`, method `parseOpticOdds()`; every player object builds `e.odds.map(e => new OpticOdds(e))`. It also normalises book names (`sportsbook.includes("Underdog") ? "Underdog"`). **This is their odds vendor, unambiguously.** |
| **MLB games/venues** | **MLB StatsAPI** | Game `id` is the MLB `gamePk`; ballpark objects carry StatsAPI's `link` convention |
| **MLB batted ball** | **Baseball Savant / Statcast** | exit velocity, barrel %, launch angle, and the 2024+ bat-tracking metrics (Bat Speed, Squared Up %, Blast %) |
| **Weather numbers** | **Visual Crossing** *(strong inference, not confirmed)* | hourly schema `feelsLike, severeRisk, solarEnergy, solarRadiation, dateTimeEpoch, uvIndex` is Visual Crossing's distinctive field set |
| **Weather commentary** | **Kevin Roth**, named meteorologist | MS Meteorology, Mississippi State; `@KevinRothWx` and `mysportsweather.com` both present in the bundle |

**Kevin Roth is the `Forecaster` role.** The role check I found in the bundle
(`canManageNotes = role === "Admin" || role === "Forecaster"`) and the named meteorologist are the
same thing: a credentialed human writing `/mlb/weather-notes` by hand, with a rich-text editor and a
manually-set Green/Yellow/Orange/Red indicator. **Their weather edge is a paid expert, not a model.**
It does not scale and it cannot be audited — but it is warm and specific in a way generated text is
not, and it is a genuine differentiator. Respect it.

### But they attribute none of it to customers

I searched the full ~2 MB bundle and the marketing HTML for every plausible source name — Statcast,
Baseball Savant, FanGraphs, Sportradar, SportsDataIO, RotoWire, nflverse, Stats Perform, Opta,
The Odds API, PFF, MLBAM, Retrosheet. **Zero matches.** (The only "ESPN" hits are the *ESPN Bet
sportsbook logo*.) There is no attribution line, no licensing statement, no source list and no
rights disclosure on the marketing site, the pricing page, the FAQ, or the App Store listing.

**On the "repackaged free data" attack — be fair, because the fair version is more useful.** A 1-star
reviewer wrote that PropFinder *"take[s] publicly available data from FanGraphs and MLB's Baseball
Savant and repackage[s] it into color-coded charts."* For the **MLB** side that is directionally
supported by their own code. For **NFL it is simply wrong**, and we should not repeat it — see
DATA-DEPTH below. Their real exposure is not that the data is free; it is that **they never say where
any of it comes from.**

**Why this matters to us.** Our posture is the exact inverse and it is already built:
`source-rights-registry.ts` with per-source clearance statuses, `checkClearance()` before every
extraction, `wrapExtractedRecord()` enforcing a rights envelope, and attribution that *propagates to
derived outputs*. PropFinder has none of this visible — a legal-risk difference and a trust
difference at once.

---

## DATA-DEPTH — the part of them we should take seriously

**354 distinct stat fields** are defined in their client bundle, each with a field name, a short
display name and a written description. Full inventory saved to
`propfinder-raw/pf-stat-dictionary.txt`. This is **not** repackaged box-score data.

**NFL — charting/tracking tier, not public tier:**
- Coverage separation buckets: `tightCoverageRate` (≤1 yd), `stepCoverageRate` (1–3 yd),
  `openCoverageRate` (3–5 yd), `wideOpenRate` (≥5 yd), `closingCoverageRate`
- Coverage scheme: `zoneCoverageRate`, `cover3Rate`
- Rushing scheme splits with efficiency: `insideZoneAttempts/Rate/YardsPerAttempt`,
  `outsideZone*`, `counterAttempts/Rate/YardsPerAttempt`, `designedAttempts/Rate/YardsPerAttempt`
- Air yards and deep ball: `passingAirYards`, `passing20Attempts/Completions/Yards/Touchdowns`
- Pressure: `passingHurries`, `defenseHurries`, `defenseKnockdowns`, `defenseQbHits`
- Situational: red zone / goal-to-go / 3rd / 4th down attempts, successes and rates;
  `explosivePass` (20+ yd), `explosiveRush` (10+ yd), `defenseThreeAndOutsForced`,
  `defenseMissedTackles`, plus a full special-teams tackle/fumble breakdown

**NHL:** `highDangerGoalsAgainst`, `mediumDangerGoalsAgainst`, `lowDangerGoalsAgainst`, powerplay
TOI/shots/goals, faceoff win %, and per their own tutorials `ICF / IFF / ISCF / IHDCF`
(individual Corsi, Fenwick, scoring chances, high-danger chances for).

**NBA:** `contestedRebounds`, `deferredRebounds`, `averageReboundDistance`, `effectiveFgPct`,
`potentialAssists`, plus **first-half and second-half prop fields** (`firstHalfAssists`,
`H2points`, `H2rebounds`, `H2assists`) and combos (`pointsRebounds`).

**Honest assessment:** route participation, coverage separation and scheme rates are **not** free
public data. Their NFL player page — per their own 35-minute tutorial — has twelve panels including
`Routes Run`, `Coverage`, `Alignments`, `Market Grades` and `Position History vs Defense`. **This is
a real data moat and we do not currently match it.** Their weakness is what they do with it, not
what they have.

---

## THEIR API — one endpoint is open, and third parties are already farming it

Reported because it is public knowledge already sitting in public GitHub repositories, and because it
tells us how their product is assembled. **I did not call any of these endpoints.**

- **`GET https://api.propfinder.app/mlb/weather-games?date=YYYY-MM-DD` requires no authentication.**
  It returns games, lineups, probable pitchers, moneylines, spreads and run lines, full ballpark
  geometry (lat/long, `azimuthAngle`, elevation, turf and roof type, every outfield fence distance and
  height) and hourly weather. With `windDir` in degrees plus `azimuthAngle`, that is everything needed
  to compute wind-relative-to-fence effects — **and it is free to anyone.**
- **Three public repos consume it.** `lightning-dabbler/sportscrape` (Go) lists PropFinder as a
  documented data provider beside baseball-reference and baseball-savant, hardcoding
  `const URL = "https://api.propfinder.app"`. `szerillo/mlb-tracker` archives the weather endpoint on
  a GitHub Actions cron to grade forecast accuracy over time. `jposhie1777/nba-prop-analyzer` runs a
  BigQuery pipeline against it and stores **`PF_EMAIL` / `PF_PASSWORD`** in config — i.e. **someone is
  running a paid subscription as a machine data feed.**
- **`/mlb/props` returns `pfRating` per prop.** So the paid rating is both served by the API to any
  logged-in session *and* independently recomputable from the public bundle. Their headline paid
  feature has effectively no technical protection.
- Third-party-reported MLB endpoint map (not independently exercised): `/mlb/upcoming-games`,
  `/mlb/weather-notes`, `/mlb/teams`, `/mlb/props`, `/mlb/hit-data`, `/mlb/splits`, `/mlb/pitchlog`,
  `/mlb/pitcher-matchup`.
- **`ALL_LEAGUES = ["MLB","NFL","NBA","NHL","WNBA","CFB","NCAAB","SOCCER"]`** and
  **`ALL_ENVS = ["prod","test","dev"]`** are constants in the bundle. **NCAAB and SOCCER are in the
  league enum but on no pricing tier and no marketing page** — two unlaunched sports, not one.

**The lesson for us is defensive, not offensive.** Our own paid surfaces must not be recomputable
from a public bundle, and our gating must stay server-side (CLAUDE.md rule 3). PropFinder is the
worked example of what happens when the scoring runs client-side.

---

## DATA FRESHNESS — what is actually observable, and what is not

Their App Store copy promises *"real-time odds"* and *"we surface the best number the moment it
appears."* I tried to test that against their shipped React Query configuration. **I could not, and
the honest result is a partial answer.**

**Observed, with the query each setting belongs to:**

| Query | `staleTime` | `gcTime` | Notes |
|---|---|---|---|
| `["mlb","weather-games"]` | **10 min** (`6e5`) | — | weather board |
| `["mlb","weather-notes"]` | **10 min** (`6e5`) | — | the Forecaster's notes |
| `["activeLeagues"]` | **5 min** (`3e5`) | — | which leagues are in season |
| `/config/sportsbooks` | **1 hour** (`36e5`) | **24 h** (`864e5`) | book roster, `keepPreviousData` |
| popup / announcements | **Infinity** | Infinity | all refetching disabled, by design |

**What I could NOT determine, and am not going to guess:** the odds and research queries live in
chunks that are lazy-loaded behind authentication. **I never saw them**, so I have no evidence about
how fresh their odds actually are, and this teardown makes no claim either way. An earlier reading of
mine inferred "the odds are not live" from `refetchInterval:!1` and `refetchOnWindowFocus:!1` — that
inference was **wrong**: those settings belong to the *popup/announcement* query, not to odds. It is
recorded here so nobody repeats it.

**What is fair to say:** weather carries a 10-minute stale window, so the weather surface is not
real-time in the strict sense — defensible for weather, but worth knowing if we ever compare
directly. If we want a real answer on odds latency, the honest method is a paid subscription and
side-by-side observation against a book, not inference from a bundle.

---

## TRAFFIC-AUDIENCE — one claim independently checked, and it does not hold

Their marketing states **"18,000+ Community Members"**. That number is checkable, so I checked it
against Discord's own API (`/invites/propfinder?with_counts=true`, 2026-09-08 UTC):

| | Claimed | **Measured** |
|---|---|---|
| Discord members | "18,000+" | **16,735** |
| Online now | — | **854** (5.1% concurrent) |

**They overstate by roughly 7.6%.** In isolation that is a rounding-up sin, not a scandal — but it
is the *only* audience number of theirs that can be independently verified, and it fails. The
"55,000+ Winning bettors" figure sits on the same site with no way to check it at all. When we say a
competitor's numbers are unaudited, this is the concrete instance to cite.

Other measured audience facts:
- **Discord guild created 2024-12-02** (decoded from guild snowflake `1313287785578233888`).
  Server description: *"The most affordable player prop research tool for all major leagues."*
  Features include `AGE_VERIFICATION_LARGE_GUILD` and `MEMBER_VERIFICATION_GATE_ENABLED` — they run
  an age gate, correctly.
- **X account `@PropFinderApp` joined 2024-06-10; 77,726 followers.** So the company is roughly two
  years old, and reviewer testimony matches (*"Been using Propfinder for about a year and a half"*).
- **77,726 X followers against 22 total iOS ratings** — the audience is real and web-native, and
  the app has barely touched it.
- 854 concurrent on a 16.7K server is a genuinely engaged community. **This is their strongest asset
  and the thing we most lack.** Their distribution, not their math, is what makes them a threat.

---

## SECURITY POSTURE (observed only — nothing probed)

Recorded because it bears on how much of their behaviour we should imitate. **None of these were
tested; all are read off headers or their own published code.**

1. **A log server is hardcoded to a bare IP over plain HTTP** in the menu that ships to every
   anonymous visitor: `{label:"Logs", path:"http://152.42.155.195:8080/"}`. **Not accessed.**
   Whatever is behind it, publishing the address unencrypted in client JavaScript is a mistake.
2. **The auth token is stored in a JS-readable cookie** — `accessToken`, 7-day `max-age`, `SameSite=Lax`,
   **no `HttpOnly`, no `Secure`**, set via `document.cookie`. Any XSS lifts a week-long session.
3. **Security headers are close to absent.** `Strict-Transport-Security` is present and good
   (`max-age=63072000; includeSubDomains; preload`). **No `Content-Security-Policy`, no
   `X-Frame-Options`, no `X-Content-Type-Options`, no `Referrer-Policy`, no `Permissions-Policy`.**
   Combined with (2), both clickjacking and XSS token theft are unmitigated.
4. **The admin route map and both Hangfire dashboard URLs are in the public bundle** (§PRODUCT-PACKAGED).
5. **The App Store listing links the privacy policy over plain `http://propfinder.app/privacy`.**

**Contrast with GSE, deliberately:** our `accessToken` never touches `document.cookie`, our API
responses go through `jsonNoStore` (`.claude/rules/nextjs-caching.md` rule 2), and our entitlement
decision is server-side only (CLAUDE.md rule 3). We should keep it that way, and we should not copy
their client-side subscription-claim pattern.

---

## MOBILE-APPS

- **iOS only.** `PropFinder: Prop Research`, App Store ID `6773949831`, bundle `app.propfinder.prod`,
  **75.9 MB**, Sports (+Education), **18+** ("Unrestricted Web Access, Gambling"), iOS 16.4+.
- **There is no Android app.** Their own AppsFlyer OneLink, requested with an Android user-agent,
  301s to the **iOS** App Store, and `propfinder.onelink.me/.well-known/assetlinks.json` returns
  `domain_not_found`. Their FAQ says iOS + responsive web only. Search-engine summaries claiming
  "App Store and Google Play" could not be traced to any primary source.
- **The app is stalled.** Three versions ever — 1.0 (2026-07-06), 1.1 (2026-07-11), 1.2
  (2026-07-16) — with boilerplate notes (`"improvements, and bug fixes"`). **Nothing shipped through
  the store in ~54 days**, straight through the MLB stretch run and into NFL Week 1.
- **Rating 3.0 from 22 ratings, and it is a barbell: 10 × 5★, 1 × 4★, 1 × 3★, 0 × 2★, 10 × 1★.**
- **IA is three tabs**: Research (bar chart), Saved (heart), Profile (person). Top-level nav is
  Research | Cheatsheets. Screenshots show `PFR: 90.3 / 85.8 / 85.2 / 84.7` sorted descending,
  filter chips (Streak, Matchup, 2025, 2026), and stat columns BA vs RHP/LHP, 2025, 2026, H2H, L5,
  Streak, L10.
- **Only 2 iPhone screenshots and no real iPad UI** — the two iPad shots are the iPhone mockups
  reframed. For a dense-table product, that is a conversion own-goal.
- **App Privacy declares only `Email Address` + `Name`**, linked, for App Functionality — no
  tracking section — while their own privacy policy claims Technical, Usage, Financial and
  Transaction data, and they run AppsFlyer in production. That gap is theirs to explain.
- **77,726 X followers against 22 iOS ratings.** The audience is large and web-native; the app has
  barely touched it.

---

## THE CUSTOMER COMPLAINTS THAT MATTER

Verbatim, from Apple's public reviews RSS. These are the product, in their users' words.

**The strategic one** — 1★, *"Save Your Money - Free Data Elsewhere"*, 2026-07-16:
> "once you look under the hood, all this app really does is take publicly available data from
> FanGraphs and MLB's Baseball Savant and repackage it into color-coded charts. That's it. Everything
> in here is already free on those sites, presented by the actual sources so you know the information
> is correct, unlike the info in PropFinder. There's nothing original. No unique analysis or anything.
> It's just a subscription fee slapped on top of free information."

**Reliability** — 1★ *"Always crashing needs work and a little wonky to use. Web browser app is
better still."* · 1★ *"The app stopped working but the online platform works and is fine."* ·
4★ *"Data is pretty accurate, when looked at correctly, only issue is app doesn't connect to servers"*

**Support** — 1★ *"Refund requested"*, 2026-09-01:
> "I requested a refund of my subscription within the 3 day grace person that is allowed and no one
> has gotten back to me yet. I even sent a couple of follow up emails and still no response."

**What advocates actually love** — 5★: *"What used to take me 20 minutes of digging now takes about
two."* · 5★: *"Wild amount of data points + cheatsheets and filters and they update constantly
especially the web version which is where they started."*

**No developer response appears on any review thread.**

---

## LEGAL SURFACE — thinner than ours, and quotable

Terms and Privacy both **effective 2025-04-21**, both naming **"PropFinder, Inc."**

- **Governing law: Delaware.** But **no arbitration clause, no class-action waiver, no venue/forum
  selection, no stated liability cap, no company address, and no DMCA agent.** Delaware law without a
  venue clause is unusual.
- **Refund policy (§4), verbatim:** *"If you cancel within three (3) days of your initial subscription,
  you may request a refund (minus any applicable processing fees). No refunds will be issued after
  this period."* Three days, initial subscription only, fees deducted, and it is a *request* rather
  than a right. **Every direct competitor at $19.99 offers a 7-day free trial instead.** There is a
  public App Store review alleging the 3-day window was not honoured, against their own §5 promise to
  *"respond within 24 hours."*
- **Forced marketing opt-in (§15), verbatim:** *"By using our Services, you agree to receive marketing
  emails from PropFinder."* Hard to reconcile with the GDPR-style rights their Privacy Policy claims.
- **The Privacy Policy names zero processors.** It refers only to *"analytics providers, payment
  processors"* generically while the site demonstrably runs **Stripe, PostHog, AppsFlyer,
  DigitalOcean and OpticOdds**. No cookie banner, no CCPA "Do Not Sell/Share" link, no GDPR
  representative, no DPO contact, no breach-notification commitment.
- **Three inconsistent age gates:** Terms §2 says 18+, Responsible Gambling says 21+ US / 18+ Canada,
  the iTunes API returns `17+` and the App Store page renders `18+`.
- **An earnings testimonial on their commercial homepage**: *"This app was HUGE in turning my 50 bucks
  to $7.5k"* (@gentil) — a results claim sitting beside their own disclaimer that content *"does not
  constitute betting advice."* In gambling-adjacent advertising that is the kind of thing regulators
  read first.

**Corporate facts, measured:** domain `propfinder.app` registered **2024-03-21** via **Namecheap**,
nameservers on **DigitalOcean**, registrant redacted. No About/Team/Careers page exists — those paths
render the login screen. **No funding, Crunchbase, or PitchBook entry for this company was found**
(the Crunchbase/Tracxn "Propfinder" records are an unrelated Indian real-estate brokerage — do not
conflate). No USPTO trademark could be verified either way; every USPTO route was blocked, so **that
is an unchecked gap, not a negative finding.** Evidence points to a **bootstrapped, likely
solo-founder** origin in spring 2024: a Buy Me a Coffee tip jar reading *"**I've** put a lot of time
and effort into developing the app"*, and r/sportsbook self-promo from 2024-04-12 (*"I created a
website to help research NBA props"*). **The founder's real name is not publicly obtainable.** The
only named human is **Jake Casso** (content/livestreams, `@JakePropFinder`) and **Kevin Roth**
(meteorology).

---

## KEYWORDS-CONTENT — a daily live show, and one keyword

**YouTube (`@Propfinderapp`, created 2025-05-14): 6,920 subscribers, 309 videos, 367,654 lifetime
views.** But the split matters:

- **30 tutorials** — best performers are MLB Statcast (13K), NBA research (8.8K), NFL touchdown
  research (7K). **The 2026 cheatsheet series averages ~700 views** — an order of magnitude down on
  2025 even as output rose. Tutorial reach is declining.
- **272 live streams** — this is the real engine. ~139 are a branded daily morning show,
  *"AM Edge <date> | Presented by Prop Finder"*, plus 47 NBA prop research and 57 home-run research
  streams. Near-daily in MLB season, 58 min – 2h53m, and **recent streams (1.4–2.5K) out-draw recent
  tutorials.**
- **Their own `/tutorials` page is broken**: it advertises "20 videos" but contains duplicates and two
  misfiled live streams, so only **15 unique tutorials** are reachable — **half their library is
  unreachable from their own site.**

**Blog (`blog.propfinder.app`, custom Next.js, no RSS feed): 78 posts, and 77 are the same template** —
*"Best MLB Home Run Props Today HR Picks for &lt;Weekday&gt;, &lt;Month&gt; &lt;Day&gt;"*, running daily from
2026-06-04 to 2026-09-07. One keyword, one sport. Tag pages exist for `nba`, `nfl`, `nhl`, `soccer`,
`golf`, `mma`, `tennis`, `strategy`, `odds`, `betting-basics` — **and every one of them is empty.**
All posts bylined **Jake Casso**. Structure is identical daily (3 player picks → an "HR Prop Parlay"),
~400–450 words, mechanically derived slug; most consistent reading is **a generated draft from their
own data, lightly edited**. No AI disclosure. *(Not conclusively determined either way.)*

**The opening this leaves:** their SEO is one keyword deep on one sport, seven sports' worth of tag
pages are empty, and their public sitemap is 7 URLs. **Any competitor covering NFL/NBA/NHL prop
keywords at comparable cadence takes uncontested ground.**

### The Kalshi datapoint — the most actionable item in this teardown
**Every home-run pick on their blog is priced off Kalshi, not a sportsbook**: *"Bryce Harper to hit a
HR — (+507, Kalshi)"*, *"Jackson Chourio — (+471, Kalshi)"*, *"Roman Anthony — (+707, Kalshi)"*.

That bears directly on **WP-27 / ledger C-104**, our Kalshi-via-PredExon second-book plan. A
competitor is already publishing Kalshi-sourced prop prices in public SEO content, which is evidence
the route is **commercially viable**. It is emphatically **not** evidence that it is legally cleared
for us — their legal path is not ours. Route it through `checkClearance()` and the rights registry
like anything else.

---

## MARKET POSITION

| Product | Entry | Annual | Free tier | Trial | iOS rating |
|---|---|---|---|---|---|
| **PropFinder (web)** | **$14.99/mo** | **$149.99/yr** | 1 game/league | **none** | **3.05★ (22)** |
| **PropFinder (iOS)** | **$19.99/mo** | **$199.99/yr** | same | none | same |
| Props.Cash | $19.99/mo | $199.99/yr | no | 7-day free | 4.84★ (7,755) |
| Outlier | $19.99/mo (→$79.99 Pro) | $199.99–$359.99/yr | no | 7-day free | 4.87★ (16,465) |
| **Linemate** | **$9.99–$14.99/mo** | **$59.99–$79.99/yr** | permanent free tier | — | 4.85★ (14,053) |
| Doink Sports | $19.99/mo | ~35% off annual | 1 game/league | — | — |
| PickFinder | $19.99/mo | $149.99/yr | — | — | — |
| Props Optimizer | **free, ad-supported** | $99.99/yr (Pro $9.99/mo) | full core w/ ads | — | — |
| Fantasy Life+ | **$3.33/mo** ($39.99/yr) | as shown | partial | — | — |

*(Rows above are from vendor pages or App Store IAP lists. OddsJam/Unabated/BettingPros/PropsBot were
only obtainable from review sites and are deliberately omitted rather than reported as verified.)*

**Three readings that matter:**
1. **Their "most affordable" claim is true on web and false on iOS.** On the App Store — where new
   users discover them — they sit at exact parity with Props.Cash and Outlier while carrying a
   **3.05★ against their 4.84★ and 4.87★**. A prospect comparing listings sees identical price and a
   1.8-star quality gap.
2. **Linemate, not Props.Cash, is the real threat to their positioning** — $59.99/yr against their
   $149.99/yr, with a permanent free tier and a 4.85★/14K-rating app.
3. **Against GSE:** identical monthly ($14.99), but **our Pro annual is $99 against their $149.99** —
   we undercut by a third. Their free tier gates by *game count*; ours gates by *pick count and
   confidence scores*. Different axis; worth a deliberate decision rather than drift.
4. **Social proof gap is ~3 orders of magnitude**: 22 iOS ratings against Outlier's 16,465 and
   Linemate's 14,053. Neither they nor we can win on that quickly.

---

## WHERE THEY BEAT US TODAY — say it plainly

1. **Data depth.** 354 defined stat fields including coverage-separation buckets, coverage-scheme
   rates, and inside/outside-zone and counter rushing splits with per-scheme efficiency. That is
   charting/tracking-tier NFL data. **We do not match this today.**
2. **MLB is genuinely excellent.** Statcast-native HR grading with real EV and barrel thresholds,
   pitch-mix matchups on both sides, park geometry, and a credentialed meteorologist. Their advocates
   name it specifically.
3. **Breadth.** Six leagues live, eleven named MLB cheatsheets, eight NBA, three NHL, a twelve-panel
   NFL player page, 18+ books of odds, betslip export to 13 books including DFS pick'em and exchanges.
4. **Speed-to-answer.** *"What used to take me 20 minutes of digging now takes about two"* — and their
   users repeat it unprompted. Research ergonomics is a real product and they have shipped it.
5. **Distribution.** 396K monthly visits at **78% direct** (the fingerprint of a logged-in tool, not a
   content site), 77.7K X followers, a **boosted, age-gated 16.7K Discord at 5% concurrency**, a
   near-daily live show. **This is their strongest asset and the thing we most lack.**
6. **Engineering craft on the plumbing** — circuit breaker, jittered retry, coherent degradation.
   Better than most tools in this category. Their weakness is not craft.

## WHERE THEY ARE OPEN — ranked by how well we can hit it

1. **No proof, anywhere.** No calibration curve, no Brier, no reliability plot, no settled record, no
   CLV, no probability — while marketing "**55,000+ Winning bettors**" and ratings ready "**before the
   lines move**". Per an affiliate reviewer they publish projections **without ROI or closing-line
   value**. Our entire product is the opposite trade: a published calibration gate that we are
   currently **failing** (ECE 0.0524 against a 0.05 floor) **and say so.** That contrast is the campaign.
2. **Their headline numbers do not survive a 30-second check.** "18,000+ Community Members" against
   Discord's own API today: **16,735**. For a competitor whose pitch is research rigour, that is the
   sharpest available demonstration — and it is reproducible by anyone in one request.
3. **The rating is a hand-weighted scorecard with binary steps.** 30 of the NFL 100 points are
   yes/no threshold tests that discard magnitude entirely, in the sport they are marketing hardest;
   four of six components restate the same recent-form series. A calibrated `edge = p − q` against a
   de-vigged line is a categorically different object. *(Be fair: their NBA and MLB HR grades are
   continuous and well built.)*
4. **Their paid feature has no technical protection.** PF Rating computes **client-side**, so the
   weights are public, and `/mlb/props` serves `pfRating` to any logged-in session. Third parties are
   already farming their API — including one repo storing a paid account's credentials as a data feed.
5. **"Repackaged free data" is an unanswered attack** published by their own paying customer, and
   they have **zero source attribution anywhere** to answer it with. We answer with a rights registry,
   per-source clearance, and attribution that propagates to derived outputs.
6. **The affiliate conflict.** They take Action Network passthrough revenue when you place the bet.
   We take none, by policy. A trust argument we can make without insulting them.
7. **Mobile is broken and stalled** — 3.05★, 45% one-star, crash reports unpatched ~54 days into NFL
   Week 1, **no Android at all**, no App Support link, a public unanswered refund complaint, and the
   obvious Play listing squatted by an unrelated real-estate app.
8. **A 33% iOS price premium** over their own web checkout, undisclosed on their pricing page — while
   **Linemate undercuts their annual by 60%**.
9. **No free trial**, against 7-day free trials at every $19.99 competitor, replaced by a 3-day
   fee-deducted refund *request* with a public allegation it was not honoured.
10. **SEO is one keyword deep.** 7 URLs in the sitemap, 77 identical MLB HR posts, seven empty sport
    tag pages, no RSS. Uncontested ground on NFL/NBA/NHL prop keywords.
11. **Thin legal surface** — no arbitration, no venue, no liability cap, no address, forced marketing
    opt-in by mere use, three inconsistent age gates, and an earnings testimonial ("$50 to $7.5k") on
    a commercial homepage.
12. **Hardcoded seasons.** Criterion labels literally read `"2025 Hit Rate"` in September 2026, with
    78 bare year literals in the rating module. Ours derives the frame from the calendar
    (`resolveNflWeek`) precisely so it cannot go stale.
13. **Their ML is invisible.** `/xgboost` is admin-only and MLB-only. If they ship it they face the
    honesty problem we have already solved; if they ship it *without* solving it, that is their
    biggest unforced error waiting to happen.

## WHAT WE SHOULD NOT COPY

Client-side scoring · client-side entitlement claims · a JS-readable auth cookie · a `robots.txt`
that publishes the private route map · admin URLs and a bare-IP log server in the public bundle ·
affiliate passthrough · a privacy policy naming zero processors · and above all **a confident score
with no published calibration.** Their PF Rating is the thing we exist not to be.

## WHAT WE SHOULD ACTUALLY DO — five items, in order

1. **Publish the calibration contrast.** We have a measured ECE, a settled sample, a reliability
   curve and a gate we are currently failing. They have a 100-point score and a "Winning bettors"
   claim. Ship the comparison honestly, including our own red status — the honesty *is* the product.
2. **Close the data gap where it is cheap.** Coverage separation and rushing-scheme splits are the
   two things they have that we do not. Decide deliberately whether to source them or to compete on
   calibration alone. Do not pretend the gap is not there.
3. **Take the empty SEO ground.** Seven of their sport tag pages are empty and their sitemap is 7
   URLs. NFL/NBA/NHL prop keywords are uncontested by them.
4. **Treat the Kalshi finding as a market signal for WP-27 / C-104** — viability evidence only,
   routed through `checkClearance()` like any other source.
5. **Harden what they got wrong.** Keep scoring server-side, keep entitlement server-side, keep the
   token out of `document.cookie`, and add the CSP / `X-Frame-Options` / `X-Content-Type-Options`
   headers they lack. Their bundle is a free list of mistakes not to make.

---

## PROVENANCE + LIMITS

**Verified by direct observation:** every response header, `robots.txt`, `sitemap.xml`, the JSON-LD,
all Stripe product/price IDs, the full endpoint and route literal set, the complete PF Rating criteria
and weights, the NFL/CFB 100-point formula and its `CFB?265:32` confirmation, the auth and refresh
flow, the circuit-breaker parameters, the analytics event names, the 354-field stat dictionary, the
`OpticOdds` class, the App Store metadata/versions/ratings/reviews/screenshots, the absence of a
Google Play listing, and the **Discord member count (16,735) measured against their claimed 18,000+**.

**Corrected during this analysis, recorded so the error is not inherited:**
- I first assigned the **9-term** formula to NFL. **Wrong** — the `CFB?265:32` team-count constant
  places NFL/CFB on the **6-term** function. The 9-term belongs to a 30-team sport I could not resolve.
- I first inferred from `refetchInterval:!1` that **their odds are not live**. **Wrong** — those
  settings belong to the popup/announcement query. The odds queries are behind auth and I never saw
  them; this teardown makes **no claim** about their odds latency.

**Explicitly NOT verified, and not to be repeated as fact:**
- **"55,000+ Winning bettors"** — their marketing copy, no methodology, no date, no definition, and no
  independent corroboration exists. Every citation traces back to their own homepage.
- Which sport the 9-term 100-point formula belongs to (MLB or NBA — both are 30-team).
- **Visual Crossing** as the weather vendor — a strong schema inference, not confirmed by them.
- Whether the duplicated Free/Yearly Stripe `priceId` is exploitable — **not tested, and must not be.**
- The eight non-`weather-games` API endpoints — third-party-reported from public repos, **not
  independently exercised.**
- Any USPTO trademark filing — every USPTO route was blocked. **Unchecked, not absent.**
- The founder's real name, headcount, funding, revenue, and app download volume — **no public source
  produced a number, and none is estimated here.**
- Video transcripts (YouTube rate-limited every attempt), full Reddit threads (403/429 on every
  route), X reply sentiment (HTTP 402), Discord chatter (membership-gated), and archive.org history
  (blocked by egress policy). The single most useful follow-up available is **an archive.org check of
  whether "18,000+" and "55,000+" have been sitting unchanged for months**, which would settle whether
  the Discord number is stale or was never true.

**Method note.** No account was created, no paywall crossed, no `Disallow`ed path fetched, and no
endpoint scanned. The bare-IP log server and the admin routes disclosed in their bundle were recorded
and **deliberately not accessed**. Raw artifacts in `propfinder-raw/`.
