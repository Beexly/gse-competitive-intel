# Scores24.live — Competitive Teardown

*Passive, public-only recon. Sources: live site config (delivered HTML/app-state), Wayback captures (Feb 2026), Estonian business registry, Similarweb/Semrush public summaries. No active probing of non-public infra.*
*Compiled 2026-07-15.*

---

## TL;DR (for GSE)

Scores24 is a **high-volume, multi-sport "livescore + free predictions" content site whose real business is betting-affiliate arbitrage** — not a prediction engine and not a data vendor. It's a traffic machine that wraps automated tips around bookmaker referral links. Its structural weakness is exactly GSE's thesis: **it publishes confidence numbers with zero accountability** — no track record, no calibration, no backtest, no "we were wrong" ledger. It is a scale/SEO competitor to fear on breadth and a trust competitor to beat on proof.

- **Not a data source for GSE.** No public API; Terms forbid automated access; it's a downstream aggregator itself, not an origin feed. Don't build on it.
- **It is a category competitor** to the GSE prediction/picks surface — but a *shallow, un-calibrated* one. Its "90%–100% on nearly every match" confidence display is a credibility gift to a trust-first product.
- **Copy the breadth, invert the trust model.** Their coverage matrix (22 sports incl. esports, correct-score, corners, cards, live in-play, accumulators, Bet Builder) is a useful feature checklist. Their lack of a proven win rate is the wedge.

---

## 1. Who runs it

| Field | Value |
|---|---|
| Legal entity | **Kiito OÜ** (Estonia) |
| Registry code | 14346593 |
| Form | Private limited company (osaühing) |
| Scale signal | 2022 filing showed **~1 employee**, ~€261k forecast turnover, ~€428k balance sheet |
| Public framing | "mass medium (online medium) Scores 24" — registered as **media**, not a betting operator |
| Disclaimer | *"The Site is not a betting shop or gambling website … does not control Users' money and is not involved in money transactions."* |

**Read:** a lean Estonian micro-entity operating a large content property. One-employee registry footprint + 12,000+ football games/month coverage = **heavily automated, thin human team, affiliate-monetized**. This is an SEO/affiliate operation with a media wrapper, not a research shop.

## 2. Business model — the affiliate machine

The delivered page config exposes the monetization plumbing directly:

- `KEITARO_PROXY_OFFERS: "/tvsv/offers"`, `KEITARO_PROXY_CLICK: "/tvsv/click"`, plus `keitaroBannerData` / `keitaroHeaderData` in app-state.
- **Keitaro is a well-known affiliate traffic-tracker / cloaking / traffic-distribution platform** used pervasively in iGaming affiliate arbitrage. Its presence is the tell: every "prediction" page is a funnel that routes clicks to bookmaker offers through a tracker.
- On-site surfaces reinforce it: **Sportsbooks rankings**, **Bonuses/betting-offers** pages, per-match "best odds" comparison tables, and one-click "go to bookmaker" links.
- Geo-cloaked offer routing: predictions pages served region-specific sportsbook lists (e.g. `/sportbooks-ca`, `/betting-offers-ca` in a CA capture).

**Revenue = affiliate CPA/revshare from bookmakers, driven by SEO-captured "[team] vs [team] prediction" long-tail traffic.** The predictions are the bait; the odds comparison + bookmaker links are the hook.

## 3. Tech fingerprint (passive)

- **SPA** with server-injected `window.__APP__STATE__`; live data over **WebSocket** (`wss://wss.scores24.live`, `WS_API_PATH: ws`).
- **CDN: NGENIX** (`s15742.cdn.ngenix.net`) — a **Russian** CDN. Consistent with Similarweb's "Russia = top desktop traffic source."
- **Bot defenses:** Cloudflare "Just a moment…" interstitial (blocked a direct headless scrape during this recon) + **reCAPTCHA v2 and v3** site keys present.
- Heavy i18n: 13+ languages (EN/ES/RU/IT/FR/PT/DE/PL/HU/JA/ID/GR/CN) — classic affiliate-SEO multi-geo footprint.

## 4. Product surface (feature checklist)

**Sports covered (~22):** Football, Basketball, Tennis, Ice Hockey, Table Tennis, Volleyball, Handball, Baseball, American Football, Rugby, Cricket, MMA, Boxing, Snooker, Futsal, Water Polo, Badminton, Darts, **CS:GO, Dota 2, LoL**, Horse Racing.

**Predictions exist for 14+ of them.** Football depth on a single day's capture: **584 predictions**, segmented by market.

**Prediction markets offered (football):**
1X2 · Over/Under (1.5/2.5/3.5) · Asian Handicap · Double Chance · Both Teams to Score · **Corners** · **Yellow Cards** · **Live/in-play** · **Correct Score**.

**Packaged-bet products:**
- **Bet Builder** (`/accumulators/builder`) — construct multi-leg bets.
- **Bet of the Day** · **Accumulators** graded by risk: `safe` / `risky` / `mega`, and by structure: double / treble / 1X2 / total / handicap / BTTS.
- **Trends** — per-sport streak/pattern surface (e.g. "team X over 2.5 in last N").
- **Sportsbooks** rankings + **Bonuses**.
- Distribution: Telegram channel push ("top predictions, trends, bets of the day"), Instagram, X, Facebook.

**Prediction display anatomy (per match):** a tip + a **confidence %** *or* an American moneyline number, alongside a **multi-bookmaker odds comparison table** and a one-click link out. Stated methodology inputs: team strength, H2H history, motivation/classification, "state of things within the clubs," recent form & physical fitness, and (in newer copy) **xG, possession, shot accuracy** recalculated live.

## 5. The credibility gap (GSE's opening)

This is the whole point for us:

1. **Inflated, uncalibrated confidence.** A single Feb-2026 capture shows predictions at **90%, 92%, 93%, 96%, 100%, 100%** across a normal La Liga/Serie A/Bundesliga slate — including "100%" on competitive top-flight fixtures. No honest probability model outputs 90–100% on the majority of pro matches. These read as **marketing numbers**, not calibrated probabilities.
2. **No track record.** No published win rate, no ROI/CLV, no backtest, no per-tip settled history, no calibration curve. "Expert authors + modern computing technology" is asserted, never evidenced.
3. **No accountability loop.** Nothing shows *how often the model was wrong*, no honesty about variance beyond a generic "correct score is high-variance" line.
4. **Incentive conflict, undisclosed in the pick.** The site profits when you click through and bet, regardless of whether the tip wins. The "prediction" and the "affiliate offer" are the same object.

**GSE contrast to press:** proprietary GSE Rating as one reasoned number, a **proven** win-rate north star, calibrated tiers, a public "we were wrong" / decision-autopsy posture, and AI-as-tool honesty. Everything Scores24 leaves as an unbacked claim, GSE can put a receipt on.

## 6. Market position (public analytics summaries)

- **Top competitors** (Similarweb, May 2026): **Sofascore #1, 365scores #2, Forebet #3** — i.e. it sits between the livescore giants (Sofascore/365scores) and the tips/model sites (Forebet). It is a **hybrid livescore+tips** play, mid-pack, not a category leader.
- **Traffic trend:** down ~**9.5% MoM** on the last public snapshot.
- **Audience:** Russia = top desktop geo (Similarweb); Semrush cites Mexico → Dominican Republic → Nigeria as core. **Emerging-market, mobile-heavy, betting-intent audience** — not a US/EU premium base.

## 7. Should GSE use it as a data source? No.

- **Legally gated:** Terms of Use (Kiito OÜ) prohibit using automated programs to interact with the site; content is claimed as Company IP. Scraping it is both blocked (Cloudflare + reCAPTCHA) and disallowed.
- **Architecturally wrong:** it's an *aggregator/affiliate front*, not an origin data provider. GSE's own stack (Kalshi CLV, odds-api.io, API-Sports, nflverse/Statcast) sits upstream of what Scores24 resells. Nothing here is a feed GSE lacks.
- **Reputationally wrong:** a Russian-CDN, Keitaro-cloaked, emerging-market betting-affiliate site is not a source a trust-first US product should ingest or cite.

## 8. Recommended actions

1. **Feature-parity checklist, not a build order.** Mine their market breadth (corners, cards, correct-score, live in-play, Bet Builder, risk-graded accumulators, Trends) as a coverage gap list for GSE's roadmap — build only the compliant, non-real-money slices already in GSE doctrine (skill "Beat the Model," graded pools founder-gated).
2. **Weaponize the trust delta in copy/positioning.** Side-by-side: "Them: 100% confidence, no track record, paid to send you to a sportsbook. Us: one proven Rating, published win rate, we show our misses." This is the founder-voice wedge.
3. **Watch it, don't touch it.** If ongoing monitoring is wanted, set a Firecrawl monitor on their predictions/trends pages to track how their confidence display and bookmaker-offer routing evolve (change-detection only, still passive-public). Not set up here — flag for approval.
4. **Do not scrape or integrate.** Passive-public reads only, per OSINT rule.

---

### Evidence appendix (key raw signals)
- Entity clause (Terms): *"the legal entity which is the founder of the mass medium and the right holder of the Site: Name - Kiito OÜ, Legal form - Private limited company, Registry code - 14346593."*
- Betting disclaimer (Terms): *"The Site is not a betting shop or gambling website. The Site does not provide betting and other gambling services…"*
- Affiliate plumbing (app-state config): `KEITARO_PROXY_OFFERS: "/tvsv/offers"`, `KEITARO_PROXY_CLICK: "/tvsv/click"`, `keitaroBannerData`, `keitaroHeaderData`.
- Infra (app-state config): `WS_SUBSCRIBE_HOST: "wss://wss.scores24.live"`, `OG_IMAGE_CDN: "https://s15742.cdn.ngenix.net"`, reCAPTCHA v2+v3 keys present.
- Prediction confidence sample (Wayback, 20 Feb 2026 football capture): Athletic Bilbao–Elche 90%, Real Sociedad–Real Oviedo 100%, Real Betis–Rayo 100%, Osasuna–Real Madrid 96%, Atlético–Espanyol 93%.
