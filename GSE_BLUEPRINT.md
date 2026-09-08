# GSE FRONTIER BLUEPRINT v3 — synthesized from 309 competitor/vendor dossiers + 551-code rebuild ledger
Corpus: dossiers/*.json (309), codes/*.json (551 OSS implementations), MASTER_MATRIX.md, 4,000+ raw evidence files.
Every claim traceable to dossier citations. v3 upgrades v2 with: 3x-validated white space, the OSS rebuild kit,
the prediction-market data corridor, bimodal pricing evidence, and the closest-analog watchlist.

════════════════════════════════════════════════════
PART I — THE STRATEGIC PICTURE
════════════════════════════════════════════════════

## 1. THE INDUSTRY IS CONSOLIDATING — INDIE WHITESPACE IS THE OPPORTUNITY (unchanged, still decisive)
Roll-up evidence: FantasyPros owns BettingPros + licenses accuracy brand into dataforceff/fantasycruncher;
RotoWire owned by Gambling.com Group; FanDuel runs free /predicts to own search intent; PFF = "Acquisition LLC".
Pain data: 19 UX complaints, 27 pricing complaints, 11 gating betrayals. Indie that ships fast, prices fair,
doesn't gate mid-season = structurally differentiated. Build-to-flip is a legitimate exit.

## 2. THE ZERO-COST DATA STACK IS REAL — VALIDATED SUPPLIER CATALOG
| Supplier | Free tier | Paid scale | Citation |
|---|---|---|---|
| the-odds-api.com | 500 credits/mo FREE | $30 (20K) → $249/mo (15M) | dossier pricing |
| football-data.org | FREE 10 calls/min (major comps) | €49 → €99/mo | dossier pricing |
| sportsdataverse/nflverse | FREE (NFL PBP + EP/WP/CP) | free forever | dossier |
| thesportsdb.com | FREE tier live | premium uncaptured | dossier |
| balldontlie.io | free NBA/MLB/NFL tier | $9-49/mo tiers | dossier (16 evidence files) |
| apifootball.com | trial | 6 price points captured | dossier |
| sportsdata.io | trial tier | sales-contact | dossier + r/sportsdataio |
NEW v3: Polymarket + Kalshi CLOB/gamma APIs are FREE and PUBLIC (kalshi dossier: 8 endpoints documented;
polymarket referenced in 96/309 dossiers as data source). Realtime prediction-market prices = $0/mo.

## 3. THE MONETIZATION STACK (66 subs / 12 ads / 10 affiliate — STACK THEM)
1. Subscriptions (66 domains) — core engine; see §7.
2. Ad networks (12, mediavine-class) — monetizes free traffic.
3. Sportsbook affiliate/CPA (10) — NEVER on pick pages; odds/market pages only, disclosed.
4. Crypto rails (3) — niche, watch.
GSE stack: Free (ads-light + affiliate on odds pages) → Pro $19-24 → API $49+.

## 4. THE PREDICTION-MARKET CORRIDOR (NEW v3 — the biggest structural shift since v2)
The corpus now contains 96 domains referencing Polymarket and 41 referencing Kalshi. The bettor's world
is converging: sportsbook odds + prediction-market contracts on the same event. Kalshi is federally
regulated (CFTC), Polymarket is crypto-global. Incumbent pick sites serve sportsbook odds ONLY.
GSE differentiator: publish edges natively on BOTH rails — "this prop is +EV at DraftKings AND the
equivalent Polymarket contract is mispriced 4%." No corpus domain does this. Regulators excluded
Novig from NY (geo-fragility) — GSE feeds that attention without being an exchange.

## 5. WHAT USERS HATE (147 pain items) — THE AVOID-LIST
1. Pricing resentment (27) 2. UI/UX without context (19) 3. Mid-season gating (11) 4. Trust collapse
(opposing bets; cancel doesn't work; "wrong most of the time") → PUBLISH GRADES AND MISSES.

════════════════════════════════════════════════════
PART II — THE PRODUCT SPEC
════════════════════════════════════════════════════

## 6. WHITE SPACE — REVALIDATED AT 3x SCALE (309 domains, value-level scan)
a) CORRELATION TRANSPARENCY: 6/309 (1.9%) even mention correlation — bankrollszn, dgfantasy,
   fantasyteamadvice, propfinder.app, pydfs-docs, thesolver. All indie/small; NO major incumbent.
   Nobody SHOWS correlation-adjusted edges with visible math. THE wedge, now triple-validated.
b) REALTIME FOR NON-WHALES: 10/309 (3.2%) document realtime (bettingpros, kairos.trade, lsports,
   novig, oddpool, oddspapi, oddstrader, og.com, polymarket, propfinder). Budget pattern proven:
   STOMP-over-WS + SSE (football-data, predictiondata). Free realtime odds+injuries+PM prices = open.
c) METHOD TRANSPARENCY: only 2/309 publish sim counts (betbetter 20K, betql 10K); formulas are secrets.
   Publishing formulas + auto-graded misses remains the cheapest trust compounder.
d) AI-DISTRIBUTION: 2/309 ship llms.txt. Agent-readable API + llms.txt = an afternoon's work.
e) THE SITE IS THE API: still zero consumer sites publish their own edges publicly. Unclaimed.

## 6.5 CLOSEST ANALOG WATCHLIST (NEW v3)
- propfinder.app — the only domain on BOTH the correlation and realtime lists. Study, don't copy;
  it validates demand for exactly GSE's positioning.
- thesolver.com — in-sim correlation, established DFS brand. The incumbent to leapfrog.

## 7. PRICING SPEC — NOW BIMODAL-VALIDATED
309-dossier price-point histogram: $59×4, $49×4, $39×3, $30×3 | $17-29 cluster (incl. $29×2, $24×2)
| $8-9×4. Two bands: consumer $17-29, professional $39-59. GSE:
- Free: full edge display, 1 sport, daily refresh, published formulas, graded history.
- Pro $19-24/mo: multi-sport, realtime, correlation explorer, bet tracking.
- Pro+ $49/mo: API access + exchange-corridor edges (undercuts oddspedia $100-300, betql $350).
- HARD RULES: no mid-season gating; self-serve cancel; no per-widget upsells.

## 8. SITE ARCHITECTURE — THE URL TAXONOMY THE INDUSTRY VOTED FOR (109 sitemaps)
/news 6,484 · /sports-betting-picks 3,372 · /players 3,227 · /player-props-picks 1,026 · /markets 933
· /mlb 805 · /prediction-markets 722 · /blog 1,213 · /learn 288 · /soccer-tipster 189
Templates: /edges/[sport]/[matchup] (money page: live edge + visible math + grades) · /players/[player]
· /markets/[market] (affiliate slot) · /learn/[concept] · /llms.txt + /api docs. Realtime: SSE first.

## 9. THE REBUILD KIT (NEW v3 — "codes, platforms, everything on earth" = 551 cataloged OSS implementations)
Categorized from README/desc analysis — GSE assembles from these, doesn't reinvent:
  model/prediction (187) · odds-data clients (131) · dashboards (79) · scrapers (67) ·
  arb/hedging/kelly middleware (52) · lineup optimizers (33) · backtesters (26) · simulators (25)
Named exemplars: draftfast 298* (optimizer), sports-betting-toolbox 135* (models), WorldCupROI 354*
(sim+ROI), Awesome-Prediction-Market-Tools 729* (the PM tool index), sportscore-mcp (MCP agent access).
License note: verify per-repo before shipping (MIT/Apache OK; GPL isolation needed).

## 10. STACK RECOMMENDATION
Cloudflare free tier (36-domain precedent) · composed free data tiers (§2) · SSE + Supabase Realtime ·
Stripe · API-first from birth, versioned + documented + llms.txt.

## 11. BUILD ORDER (leverage-ranked)
1. Correlation-adjusted edge engine, visible math, BOTH rails (sportsbook + PM corridor §4)
2. Auto-published grades/misses
3. Programmatic SEO skeleton (§8) fed by free tiers (§2)
4. Free realtime feed (odds + injuries + PM prices, SSE)
5. Pro $19-24 once grades prove out; API $49 after
6. llms.txt + public API (agent channel)
7. Mobile IAP (Phase 2)

════════════════════════════════════════════════════
PART III — COVERAGE STATEMENT & REMAINING GAPS (honest)
════════════════════════════════════════════════════
COVERAGE: 309 product/vendor dossiers (247 live / 7 dead / 52 walled / 4 unset) across 765-target queue
+ 122 original + 551 OSS implementations. Walled = fetched-and-blocked with evidence, not skipped.
GAPS (each upgradeable, none blocking the build):
- Mobile IAP tiers corpus-wide partially filled via apps.apple.com + play.google.com dossiers.
- 6 browser-session-walled premium pages (api-sports.io, oddschecker, oddsjam, fantasylabs,
  pandascore, propsmadness) — need logged-in capture.
- Formula grep pass 2 on bundle-fetched domains (pass 1: 35 entries from ~30%).
- Traffic/SEO authority ranking for the SEO skeleton (no SimilarWeb-class source).
- 19 hard-fetch-fail domains (mostly DNS-dead) logged in _fetchall.log — dead, correctly dispositioned.
