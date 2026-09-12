# Wave 3b — Prop-firm + editorial dossier (2026-09-12)

Source: `wave3-dfs-optimizer-2026-09-12.json` (same extract as the DFS-optimizer
wave). 72 entities total: 40 `prop_firm_data`, 14 `editorial_metadata`, 18
`dfs_optimizer_data` (covered in the DFS-optimizer README entry). Every claim
below traces to a `value_citation` in the raw file. Vendor claims are
unverified marketing until independently checked.

## 1. Roster (deduped: ~25 unique firms from 40 rows)

Duplicate coverage is itself signal (firms reviewed everywhere): FTMO x5,
FundedNext x4, Tradeify x3, E8 Markets x3, Apex x2, Topstep x2, The5ers x2,
BrightFunded x2, Take Profit Trader x2. Singletons: MyFundedFutures, Lucid,
Bulenox, FunderPro-via-vetted, Sabio, Blue Guardian, Funding Pips, Hola Prime,
Trade The Pool, FXIFY, WSFunded, RebelsFunding, FundedFast.
Full unique list with per-source rows is recoverable from the raw JSON by
`prop_firm_data.identity.name`.

## 2. Trustpilot leaderboard (score x count = weight)

| Firm | Score | Reviews |
|---|---|---|
| MyFundedFutures | 5.0 | 20,122 |
| Blue Guardian | 4.9 | n/a |
| FTMO | 4.8 | 51,785 |
| The5ers | 4.7 | 37,299 |
| FundedNext | 4.5 | 78,639 |
| Funding Pips | 4.5 | 68,142 |
| Tradeify | 4.5 | 3,483 |
| Hola Prime | 4.5 | 3,632 |
| Trade The Pool | 4.5 | 819 |
| Apex | 4.2 | 20,299 |
| Topstep | 3.5 | 14,409 |

Weight read: FundedNext + Funding Pips + FTMO have the deepest review bases
(50k-79k). Topstep's 3.5 on 14k reviews is the notable negative outlier —
PropScorer independently flags "low Trustpilot sentiment, platform complaints
and a payout-transparency warning" on the oldest firm (2012). Only 19/40 rows
carry a score, 14/40 a count: thin, do not rank on this alone.

## 3. Economics (thin: 16/40 rows have NO economics block)

Priced plans observed: MyFundedFutures Flex 25K $39 / 50K $54; Tradeify Select
$55; FundedNext featured challenge ~$31-32. That is the entire fee dataset —
four firms. Payout speeds (days): Tradeify 0, Topstep 5, Apex 8, BrightFunded
30. Only 4/40 rows carry any payout object. Fee and payout comparison at scale
is NOT supported by this extract; it is the #1 re-extraction target.

## 4. Constraints matrix (28/40 rows empty)

Observed: FTMO 5% daily / 10% max, no strict time limit; FundedNext 5%/10%,
no time limit (futures arm 4%/8%); BrightFunded 10% max; Topstep EOD loss,
$2k/4% on 50K, no consistency rule; Tradeify 1-day time limit on one row,
$1k EOD on another. Beginner-relevant flags: "no evaluation time limits" and
"static or balance-based drawdown" (beginner methodology). Trial availability
noted per firm in raw rows.

## 5. Sentiment (21/40 rows empty — the non-empty half is the best content)

PropScorer analyst takes (rulebook-read, payout-feed-verified):
- MyFundedFutures: "strong payout-focused firm" BUT Feb-2026 split change
  created rule turbulence — verify exact plan before buying.
- Apex: "scaling king," strongest fit for disciplined scalers; weak for
  automation traders and payout-cadence maximalists.
- Topstep: "safest classroom for beginners" (longevity + EOD) BUT low
  sentiment + payout-transparency warning.
- Tradeify: "speed-and-simplicity leader" BUT some plans moved 5-day to
  10-day payout cadence; risk rules changed.
Site ratings (second source family): My Funded Futures 4.9 (330 reviews),
Sabio 4.8, Lucid 4.7, E8 4.6-4.7, FundedNext 4.65, Blue Guardian 4.65,
Tradeify 4.6, FTMO 4.4, TPT 4.4, Topstep 4.14. Best-for tags: FTMO "Best
Overall Support & Simplicity"; FundedNext "scalpers," "coupon hunters."

## 6. Platforms (12+ distinct)

MT5 (11 rows), cTrader (10), TradingView (6), Match-Trader (6), NinjaTrader
(5), MT4 (5), Tradovate family (7 incl. Prop variants), DXtrade (4),
Quantower (3), TradeLocker (3), TopstepX (2), Rithmic-backed (1). Futures
firms cluster on Tradovate/NinjaTrader/TopstepX/Rithmic; forex/CFD on
MT4/MT5/cTrader/DXtrade. Platform breadth is a listed differentiator.

## 7. Geography

US: 6 rows (incl. Topstep, Apex cluster). UAE: 6 (FundedNext/Funding Pips
corridor). Plus CZ (FTMO), Israel x2, HK, MY, Malta, Ireland, Slovakia, St.
Lucia x2. US-trader methodology notes CFTC-compliant access and futures
suitability as the binding constraint for Americans — directly relevant to any
US-facing affiliate surface.

## 8. Editorial methodologies compared (13 with summaries)

- propfirm.compare PropScore: algorithmic 0-97; verified reviews dominate,
  payout reliability weighted heaviest; rankings cannot be bought.
- PropScorer PropScore: daily 0-100, seven criteria / 100 points (price,
  profit split, rules...); reviews read rulebooks + verify payout evidence.
- Proptally: 5 factors — rule fairness, payout reliability, cost efficiency,
  trader sentiment, platform quality.
- bestpropfirmguide: ranked by verified Trustpilot; compares funding, profit
  share, platforms.
- propfirmscompared futures: futures-specific execution, exchange-traded
  contracts, drawdown type, platform ecosystem. Beginner variant: static/
  balance drawdown, no time limits, transparent rules, verifiable payouts.
- vettedpropfirms: claims live testing + real reviews.
- proprietaryfirms: challenge rules, fees, profit share/payouts, reputation.
- DailyOverlay (see section 9 — the GSE-relevant one).

## 9. Top-pick consensus (12 lists)

FTMO 6, Tradeify 4, FundedNext 4, Apex 3, MyFundedFutures 3, TPT 2, Lucid 2,
The5ers 2, Bulenox 2, FundedNext Futures 2, DayTraders 2, Blue Guardian 2,
Trade The Pool 2, Topstep 2, NexGen 2. Consensus top tier: FTMO / Tradeify /
FundedNext / Apex / MFFU. No list agrees fully — methodology drives picks
(Trustpilot-ranked lists favor FTMO/FundedNext; futures-specific lists favor
MFFU/Bulenox/NexGen).

## 10. SPOTLIGHT — DailyOverlay NFL DFS expert-rankings history

`dailyoverlay.com/nfl-dfs-expert-rankings-history` grades DFS experts over
time (Top 5 history). Assigned scores in extract: RotoGrinders Core Plays 4.26
(top), Rotowire 4.08, RG Lineup Builder 3.93, RG Core Plays 3.81, Rotowire
Optimizer 3.69/3.54, RG Consensus 3.65. This is the single most GSE-actionable
entity in the file: an independent graded track record of expert optimizers
and consensus products — exactly the external validation surface the
consensus-accuracy-engine work (DEC follow-up queue) and the calibration
pipeline need. Action: fetch the page, confirm scoring scale/sample sizes,
and use it as the benchmark our optimizer beats publicly.

## 11. GSE action reads

1. Affiliate-additive: prop-firm challenges ($31-55 observed, rev-share
   standard in industry) are a high-ticket affiliate vertical — BUT the
   extract contains ZERO affiliate mentions. Do not brief affiliate
   economics from this file; research programs directly.
2. Expert leaderboard as habit surface: DailyOverlay-style graded experts
   (section 10) is a proven engagement mechanic — a GSE "graded experts"
   board fits the subscription-primary model (pay for tools + proof).
3. Payout-reliability weighting (both PropScores weight payouts heaviest) is
   the honesty mechanic to copy: rank everything by verified outcomes, never
   by marketing.
4. Re-extraction targets: pricing for the 12 missing firms, payout objects
   (only 4 have them), constraints/sentiment for the 28/21 empty rows.

## 12. Data-quality caveats

Duplicates across sources (section 1); identity coverage thin (founded 10/40,
TP score 19/40); economics missing 16/40; constraints empty 28/40; sentiment
empty 21/40; one editorial row fully empty; category field (A/B) meaning
unknown. All gaps are extraction gaps, not findings about the firms.
