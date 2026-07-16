# GSE Competitive/Data Expansion — Next-Tier Targets (2026-07-16)

Passive-public only. Ranked by GSE strategic value. Started from the 5-target program (scores24, FantasyPros, NGS, PFR, FantasyGuru); this file adds the next tier the intel implies GSE must understand.

## Why these targets (derived from GSE's identity)
GSE = trust-first US sports-prediction product; proprietary **calibrated GSE Rating** as THE single number; **proven win-rate (≥70%)** north star; fantasy + DFS + betting-analytics; "Beat the Model" free pick'em; NFL world-model; decision-intelligence OS. That identity defines four competitor/data axes: (A) proprietary-number/grades incumbents, (B) betting-analytics & EV tools, (C) the sharp/CLV benchmark, (D) public model/calibration peers, plus (E) fantasy-tool rivals and (F) legal data sources.

---
## TARGET #1 — Pro Football Focus (pff.com) [proprietary-number incumbent]
**Why it matters most:** PFF is the proof-of-thesis for GSE Rating — a proprietary number that became a 9-figure company whose customers are the NFL teams themselves.
**Ownership/valuation (timely):** Cris Collinsworth bought majority stake **2014**; **Silver Lake invested $50M (2021) at ~$160M valuation** (peak ~$223M); **being SOLD to Teamworks for ~$130–140M as of Feb 2026** (future on NBC unclear).
**Model (3-sided):** (1) **B2B licensing** — works with **ALL 32 NFL teams + 95%+ of Power-Five colleges** (the bulk of revenue; `b2b.pff.com`, `/partners/`, `/api/partners/`); (2) consumer **subscription** (aMember `/amember/`, `/join`, Clerk auth); (3) **fantasy** (`fantasy.pff.com`) + expanding to gamblers.
**Infra/subdomains (CT):** b2b, fantasy, accounts, clerk (auth), join, go (link-tracking), deeplinking (mobile apps), geo, s2s-analytics, shop, newsletters, meet, blog.fc.
**The product:** the **PFF Grade (0–100 per player per play)** — built by manual charting of every play by analysts; a subjective-expert grade, scouting/evaluation-focused.
**GSE contrast/wedge:** PFF grade = charting-based, B2B/scouting, team-adopted, NOT calibrated to bettable outcomes or win-rate-proven. **GSE Rating = calibrated, decision/betting-focused, transparently win-rate-proven.** Different proof standard, different customer. Lesson: a proprietary number earns fortune-level value ONLY once it earns credibility with expert users — GSE's path to that is published calibration + a real track record, not charting headcount GSE can't match.
**Do NOT copy:** manual-charting-headcount moat (uncopyable, capital-heavy); B2B-team-first focus (GSE is consumer-decision-first).

---
## TARGET #2 — The Action Network (actionnetwork.com) [betting-analytics + picks competitor]
**Owner:** **Better Collective** (Danish, Nasdaq Stockholm — global betting-affiliate conglomerate). Acquired **May 2021 for $240M** (16× 2020 rev of $15M; BC's largest-ever deal).
**Scale (2021):** ~**$40M revenue** (+100% YoY), **3.6M monthly users**, not yet profitable at acquisition.
**Revenue model:** **70% sportsbook affiliate fees, 30% subscriptions.** Sub products: **Action PRO** (picks/tools), **Action Labs**, **Fantasy Labs** (DFS tools).
**Model/infra:** content/news-heavy betting media (Google-News sitemap, author pages), embeddable odds widgets (`/*/embed` blocked), odds comparison, bet tracking, public betting %.
**KEY GSE insight:** Action Network is the LEGAL, US-scale version of scores24 — same affiliate-first economics (70% affiliate). The ENTIRE category (scores24 illegal-offshore; Action Network legal-licensed) monetizes picks as **affiliate bait**. → GSE's no-affiliate, proven-win-rate, trust-first stance is a wedge against the whole industry, not one site. GSE cannot out-spend Better Collective on affiliate/SEO; it must win on trust/proof/product.
**Do NOT copy:** affiliate-first monetization; public-betting-% engagement bait; volume-media SEO play.

---
## Remaining target map (ranked; recon staged next, one-by-one)
**C. Sharp/CLV benchmark**
- **Pinnacle (pinnacle.com)** — the sharpest book; low-margin, high-limit; its **closing line = the CLV yardstick** GSE's "proven win-rate/beat-the-close" proof is measured against. (US-geoblocked; study via odds APIs / third-party.) GSE proof credibility literally depends on beating/tracking Pinnacle's close.
- **Circa Sports** — sharp US book; similar benchmark role.

**D. Public model / calibration peers (GSE's honest-proof analogs)**
- **nfelo (nfeloapp.com)** — public NFL Elo/market model; **publishes calibration & vs-market performance** — exactly GSE's transparency posture. Study how they present accuracy honestly.
- **Inpredictable (inpredictable.com)** — win-probability / expected-points public models.
- **FiveThirtyEight legacy** (archived NFL/QB Elo models) — gold standard of published, calibrated sports forecasting; mine the methodology.

**E. Fantasy-tool rivals (beyond FantasyPros/FantasyGuru)**
- **RotoWire (rotowire.com)** — the syndication king (powers ESPN/Yahoo/CBS/Fox/DK player news, 80+ partners); the B2B news-feed incumbent.
- **4for4, Establish The Run, FantasyLife** — premium projections/subscription content.
- **Underdog Fantasy (underdogfantasy.com)** — pick'em / best-ball OPERATOR (real-money) — directly relevant to GSE's "Beat the Model" free-skill pick'em positioning (study product/UX, NOT the real-money mechanics GSE won't build).

**F. Legal data sources (fuel for the proven-accuracy engine)**
- **Baseball Savant / Statcast (baseballsavant.mlb.com)** — free MLB tracking (barrel%, xwOBA, K%) — the MLB analog to NGS; GSE already flagged. Confirm public CSV/API access + terms.
- **nflverse** (spine, CC-BY 4.0 — known/validated).
- **The Odds API** (GSE uses), **Kalshi** (GSE uses, CLV), **Polymarket** (prediction-market comparison), **SportsDataIO / SportRadar / Genius** (paid depth if needed).
- **KeepTradeCut / FantasyCalc / DynastyProcess** — crowdsourced dynasty trade values (free, community data GSE could triangulate).

**G. EV / props / line-shopping tools (GSE edge-detection analogs)**
- **OddsJam, Unabated, Outlier.bet, Props.cash, RotoWire's tools** — positive-EV / arbitrage / props engines. Study how they surface edge + prove it; GSE's edge-engine competes here on calibration + honesty.

---
## TARGET #4 — nfelo (nfeloapp.com) [the PROVE-IT blueprint — most GSE-relevant]
**What it is:** public NFL Elo+EPA+market model (v4.0.0, Next.js). Surface: Power Ratings, EPA Tiers, QB EPA / Era-Adjusted Elo, Win Totals, SoS, Tendencies, **EV Betting Card**, **Confidence Pool**, HFA Tracker, Odds Calculator. Monetizes via Kalshi/sportsbook **affiliate (transparently disclosed)**.
**The gold — public Model Performance page (how to prove a model honestly):**
- **Accuracy 66.61%** (winners predicted, straight-up, since 2009)
- **ATS 56.97%** vs OPENING line · **53.70%** vs CLOSING line
- **CLV +5.61%** average closing-line value/play · Units since 2009 · Expected vs Cumulative Units
- **Full season-by-season table (2009→now):** Model SU%, vs Close, MAE, Open-bet ATS/Units/CLV, Close-bet ATS/Units.
**CRITICAL calibration reality for GSE's ≥70% north star:** a respected public model gets ~**66.6% SU** and ~**54% ATS** with **+5.6% CLV**. **70% ATS is essentially unattainable long-term** (52.4% breakeven; elite 54–56%); ~66–70% is realistic ONLY straight-up/moneyline or on a curated high-confidence subset. → GSE MUST specify which (SU vs ATS vs curated subset), present it season-by-season, and anchor on **CLV** (the un-fakeable proof) — exactly like nfelo. This is the honest inverse of scores24's "100% confidence." nfelo IS the presentation template GSE should match and beat.
**GSE actions:** (1) build a public, season-by-season, CLV-anchored performance page; (2) benchmark GSE Rating vs nfelo's 66.6% SU / +5.6% CLV; (3) define the ≥70% claim precisely to stay honest.

---
## TARGET #5 — Pinnacle (pinnacle.com) [the CLV benchmark GSE's proof is measured against]
**Why it's the sharp reference:** "**winner's welcome**" policy (never bans winning players) → sharp money prices the lines; **2–3% hold on majors** (vs 4–6% US books, 10%+ props elsewhere); **limits $50k+ NFL/NBA, $100k+ soccer**. High volume offsets thin margins. Result: Pinnacle's **closing line is the world's most efficient** — the industry CLV benchmark (pros + services like Pinnacle Odds Dropper reference it).
**THE proof-efficiency insight for GSE:** consistently beating Pinnacle's close reaches **statistical significance in as few as ~50 bets** — vs the hundreds/thousands needed to prove a raw win-rate. This is the mathematical reason GSE's 2026-06-30 CLV/EV pivot is correct: CLV proves real edge fast and can't be faked. (US-geoblocked for wagering; use odds APIs / Pinnacle Odds Dropper for the closing line.)
**GSE actions:** (1) log every GSE Rating pick's price vs Pinnacle's closing price → CLV per play; (2) a public, running **CLV distribution + n≈50 significance** panel is the un-fakeable proof no incumbent publishes; (3) frame the product as "we beat the sharpest line," not "we're 70%."

---
## TARGET #6 — OddsJam (oddsjam.com) [positive-EV / line-shopping leader — the model BettingPros pivoted to]
**Product:** "Bloomberg Terminal of sports betting." Scans ~**300 sportsbooks**, compares each book's price to a **sharp book (Pinnacle) or consensus market average** to surface **+EV bets** (e.g. fair +100 vs a book's +128) + arbitrage + promo/bonus conversion. Processes **>1M odds/second, multiple TB/day**. Also a **Polymarket** integration.
**Business (remarkable):** founders Alexander Monahan (Stanford) + Ankit Goyal (CEO); **bootstrapped/self-funded**; **2024 revenue ~$26M, Adjusted EBITDA ~$12M (~46% margin)**; **acquired by Gambling.com Group ($GDC) for up to $160M** ($80M upfront + $80M earnout), closed Jan 2025.
**Model:** subscription-PRIMARY (Gold **$299/mo / $199 annual**; Platinum custom w/ live bets + global books + line-movement history + 1-on-1 coaching) + sold **odds API** (`/api/backend/`, B2B) + affiliate (`/go/`).
**Two patterns this confirms:**
1. **Affiliate/media conglomerates are consolidating the category:** Better Collective→Action Network ($240M), **Gambling.com→OddsJam ($160M)**. GSE competes against conglomerate-backed incumbents; cannot win on affiliate scale.
2. **Even the EV leader is a TOOL that finds edge, not an accountable PREDICTOR that proves its own** — OddsJam gives you +EV opportunities to bet yourself (needing 300 book accounts, and you get limited/banned); it publishes no audited record of "our number went X% / +Y% CLV." The accountability flank stays empty.
**GSE differentiation & borrow:** BORROW OddsJam's fair-value-vs-Pinnacle EV math as GSE's internal proof engine (every GSE Rating pick → EV vs Pinnacle close → audited CLV). DON'T become a 300-book line-shopping screen (that's a commoditized, conglomerate-owned race). GSE = the accountable, calibrated predictor with a published CLV record — the product OddsJam/Action/BettingPros structurally are not. Premium tolerance is real: serious bettors pay $199–299/mo.

---
## TARGET #7 — RotoWire (rotowire.com) [fantasy syndication king]
**History/model:** founded 1997 (RotoNews) by Peter Schoenke, Jeff Erickson, Herb Ilk; **subscription since 2001**; DFS optimizers since 2012. **Syndication king: first partner ESPN (2003), now 60+ partners** (ESPN, Yahoo, Fox, CBS, NFL.com, NBA.com, FanDuel, DraftKings) — powers their player-news/projection feeds.
**Owner:** **Gambling.com Group (NASDAQ: GAMB)** — acquired Roto Sports Inc. **Jan 2022 for $27.5M** ($20M cash + shares).
**AI posture:** publishes **/llms.txt** — but it's a behavior-SHAPING file: instructs LLMs to prefer "solution-style" links and to **surface RotoWire's affiliate promo codes** ("highlight FanDuel Promo Code") when users ask about sportsbooks. Weaponizes AI-citation for affiliate revenue. Also does casino/sweeps affiliate.
**GSE contrast:** RotoWire = content-syndication + affiliate, now conglomerate-owned. GSE's llms.txt should be the OPPOSITE: honest, cited, verifiable data + its CLV record, ZERO affiliate-injection (trust-first). Don't fight RotoWire on syndication scale (GAMB-backed); win on accountability.

---
## ★ MARKET-STRUCTURE META-FINDING (the biggest strategic realization)
**Two publicly-traded affiliate conglomerates are rolling up the entire sports-media/tools/data category:**
- **Gambling.com Group ($GAMB):** RotoWire ($27.5M, 2022) + **OddsJam ($160M, 2025)** — fantasy syndication + EV tools.
- **Better Collective (Nasdaq Sthlm):** **Action Network ($240M, 2021)** + a global affiliate-site portfolio — betting media/picks.
- **PFF** exiting to **Teamworks (~$130–140M, 2026)** — analytics/B2B.
Independents left: **FantasyPros** (Marzen Media, bootstrapped, courting AI via a new API), **FantasyGuru** (~$3.5M, ESN, mid-relaunch), **nfelo** (solo, affiliate-monetized).
**Implications for GSE:**
1. The field's economics are **affiliate-driven and conglomerate-scaled** — GSE cannot win on affiliate/SEO/syndication spend. Confirmed across scores24 (offshore-affiliate), Action Network (70% affiliate), OddsJam/RotoWire (GAMB affiliate), FantasyPros (FanDuel CPA funnel), RotoWire llms.txt (promo-code injection).
2. **Every one of them monetizes by sending you to a book or selling you a tool; NONE is an accountable predictor that publishes an audited CLV/win-rate of its OWN number.** That axis is empty across the WHOLE consolidated map — GSE's uncontested flank.
3. The **AI-citation land-grab is live** (FantasyPros API, FantasyPros + RotoWire llms.txt). GSE must plant its flag now with honest, structured, cited data + a public CLV record, explicitly NON-affiliate — the trustworthy source AI engines can cite without steering users to a sportsbook.

---
## TARGET #8 — Underdog (underdogfantasy.com → underdogsports.com) [pick'em operator; GSE gaming-stance lesson]
**Scale:** **$1.225B valuation** (Series C, $100M, early 2025, Spark Capital — ~3× the $485M July-2022 mark). Unicorn.
**Products:** Best Ball tournaments, **Pick'em** (predict player stat higher/lower vs a line, parlay legs → all must hit), + a **new sportsbook** (rebranding "fantasy"→"sports"). Revenue = **~10–15% rake** on entry fees.
**REGULATORY LESSON (validates GSE gaming-stance):** paid a **$17.5M settlement to the NY Gaming Commission**, **withdrew pick'em/draft from NY**, and shifted pick'em to a **peer-to-peer model** in NJ/DE (away from player-vs-house, which "more closely resembles traditional sports betting"). **Illegal in 10 states** (CT/DE/HI/ID/IA/LA/MI/MT/NV/WA); best-ball-only in 9 more.
**GSE read:** real-money, player-vs-house prop pick'em = regulated as sports betting; expensive, state-by-state legal war. This is EXACTLY why GSE's "Beat the Model" must be **FREE / skill-only / no real-money** (per gaming-stance doctrine) — Underdog's $17.5M NY saga is the cautionary tale. Borrow the pick'em UX (higher/lower on a GSE-projected line) as a free engagement + model-marketing loop; never the real-money mechanics.

## Remaining expansion targets (lower priority; note for next pass)
- **Inpredictable, Unabated** (win-prob / EV peers), **4for4 / Establish The Run** (premium projections), **Kalshi / Polymarket** (prediction markets — GSE already uses Kalshi CLV; Polymarket = event-market comparison), **KeepTradeCut / FantasyCalc** (crowdsourced dynasty values), **Fantasy Life** (Matthew Berry, VC-funded — the firm FantasyPros sued). Each a one-session pull when capacity returns.

---
## ★★ FRONTIER META-FINDING — the two conglomerates' bets are DIVERGING (from reading both public filings side-by-side; nobody connects these)
**Gambling.com Group ($GAMB) FY2025** (SEC 20-F): revenue **$165.4M (+30%)**, Adj EBITDA **$58.0M**, net loss $32.9M (contingent-consideration fair-value + intangible impairment). The story: **"sports data services" (OddsJam + RotoWire) = 26% of revenue and GROWING +440% QoQ** — explicitly the fastest-growing, highest-margin, recurring-subscription segment. 2026 guide $170–180M. → GAMB's **DATA / SUBSCRIPTION / API** bet is WINNING.
**Better Collective (Nasdaq STO: BETCO) FY2025** (annual report 2026-02-25): revenue **€336.7M (−9.4% YoY)**, earnings €23.6M (−31%), amort/impairment €33.8M; a self-described **"reset year."** **North America (Action Network) is the problem child:** NA revenue **down >$9M**, NA CEO Marc Pedersen stepped down after 6 yrs ("the North American market proved more challenging than we initially expected"), and Action Network's **VP Product & Strategy resigned** (late 2025). → Better Collective's **AFFILIATE-MEDIA / PICKS** bet is STRUGGLING in the US.
**THE INSIGHT (frontier, un-obvious):** the market is voting with real money and real outcomes — **the affiliate-picks-bait model (Action Network; structurally = scores24's model) is topping out/declining in the US, while the data+subscription+API+accountability layer (OddsJam) is exploding (+440% QoQ).** This is the single deepest validation of GSE's thesis:
1. GSE's **subscription-primary / accountable-predictor / data-layer** direction is on the RIGHT side of the industry's structural pivot; the affiliate-picks model GSE competes against is the DECLINING past.
2. It explains the whole session's signals: **BettingPros abandoned proprietary models** (→ market-efficiency), **FantasyPros rushed a public API (Jul 2026)**, RotoWire+FantasyPros weaponize llms.txt — everyone is scrambling to the data/subscription/AI layer because affiliate-picks is topping out.
3. GSE's uncontested wedge = **accountable, CLV-proven, calibrated prediction + honest non-affiliate data layer** — the one seat empty across a category that is simultaneously (a) consolidating under two affiliate conglomerates and (b) watching its affiliate-picks half decline while its data half booms.

## What we're NOT seeing yet (gaps to close next)
1. **Gated product depth** (FantasyPros MVP/HOF tools, PFF grades, Action PRO, FantasyGuru premium) — paywalled; won't breach. Close via reviews/founder-trials/public demos.
2. **Audited win-rate vs CLV across the field** — nobody but honest models (nfelo) publishes it; the market-wide VOID = GSE's opening.
3. **scores24's data provider** (the `parser` service — scrape vs license) — unconfirmed.
4. **FantasyGuru ProjectX** internals (unreleased rebuild) — existence only; won't probe.
5. **AI-citation share** — who LLM answer-engines actually cite for sports predictions (FantasyPros courts OpenAI; PFR bans GPTBot; scores24 allows ChatGPT-User) — measurable by querying engines; a NEW battleground to instrument.
6. **Affiliate economics** (CPA/revshare rates) for scores24/Action Network — opaque.
7. **Review/churn sentiment** (Trustpilot/Reddit/App Store) — not yet mined; reveals real product quality + churn.
8. **Better Collective / LiveOne / Teamworks filings** — public parents; segment-level financials pullable for Action Network, and PFF's Teamworks sale terms.

