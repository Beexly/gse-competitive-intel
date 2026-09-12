# waves/ — staged competitive-intel wave outputs

## wave2-extract-data-2026-09-04.json
Owner-supplied context (2026-09-04): Wave 2 delta report + NCAAF intelligence,
competitor teardowns (19), prediction-market analysis, accuracy-distribution /
70%-problem analysis, methodology + calibration notes, market-gaps ranking.
Every claim carries a `value_citation`. Per the report itself, the Wave 1
inventory (604 files) is owner-briefed, not independently re-audited, and the
nfelo benchmark discrepancy (brief: 66.61% SU / 53.70% ATS vs close / +5.61%
CLV vs fetched page: 66...[truncated]
## wave3-dfs-optimizer-2026-09-12.json
Owner-supplied extract (2026-09-12, 72 entities): 18 DFS optimizer competitor
profiles (SaberSim, RotoQL, THE SOLVER, Fantasy Cruncher, Stokastic, Daily
Fantasy Fuel, FantasyLabs, FTN x2, LineupHQ, DFS Hero, LineStar, FantasyPros,
RotoWire, 4for4, BTA Fantasy IQ, WalterPicks) with pricing tiers, optimizer
types, data sources, algo-model prose, and lineup-generation / correlation
booleans. Plus 40 prop-firm profiles and 14 editorial-methodology notes
(out of scope for GSE; kept raw, not briefed).
Audit (2026-09-12, mechanical): 12/18 DFS profiles carry NO pricing tiers;
10/18 lack algo_model prose; every claim carries a `value_citation` / source
URL. Treat missing fields as extraction gaps, not as competitor negatives.
Cross-product: 18/18 claim lineup generation; 14/18 claim correlation
tracking; sim scale claims run 10k (RotoQL, DFS Hero) to 100k/30s (SaberSim).
Gap read vs GSE engine (2026-09-12: exact DP + k-best/diverse-pool/late-swap/
minStack + correlation sim + exposure control, NFL DK-Classic only):
contest-vs-field payout simulation, multi-sport slates, bankroll tracking,
best-ball explorer, post-lock sim dashboard, live ownership, pick'em
(PrizePicks/Underdog) optimizers — none of which GSE ships. Vendor claims are
unverified marketing; verify before building against them.
