# The Science: SMASH · BURR · Solds — reconstructed and rebuilt for GSE

**What this is.** A clean-room reconstruction of the *methods* behind FantasyGuru's three signature MLB metrics, plus a working GSE engine that computes an equivalent-or-better version of each from free public data. The engine (`gse_engine.py`) runs on live 2026 MLB data and produced the tables in `solds_table.csv`, `burr_table.csv`, `smash_hitters.csv`, `smash_pitchers.csv`.

**Why this is legal and clean.** Methods, systems, and mathematical formulas are not protected by copyright (17 U.S.C. §102(b)); individual baseball statistics are uncopyrightable facts. None of FantasyGuru's paywalled data was accessed or used. Every input here comes from the **MLB Stats API** (official, free, no-auth) and **Baseball Savant** (public Statcast). The output is original GSE IP. We reconstructed from (a) FG's *public* explainer descriptions and (b) established, published sabermetrics — then improved on both.

Data pulled: 2026 season, mid-July. 742 pitchers (311 qualified relievers), 463 hitters + 337 pitchers with Statcast expected stats. League reliever ERA 4.27, cFIP 3.08, league hitter xwOBA .309.

---

## 1. Solds → GSE Reliever Value Score (RVS)

### What theirs is
"Solds" is simply **Saves + Holds** — Ray Flowers' public pitch is that it's a better reliever-value stat than saves alone because it counts the setup men who never get the save but do the high-leverage work. That's the whole idea. It's a definition, not a model, and nobody owns "Saves + Holds."

### Why raw Solds is weak (and where GSE wins)
1. **It's backward-looking volume.** Fantasy value is about *future* Solds, which is driven by **role** (is he the 9th-inning guy or a low-leverage mop-up arm?) and **skill** (will he keep the job?).
2. **It ignores reliability.** A closer converting 95% of chances ≠ one blowing 25%.
3. **It treats a save and a hold as equal**, when their scoring and leverage differ.

### GSE construction (implemented)
For every reliever with ≥5 IP:

```
Solds     = SV + HLD                         # their metric, kept for reference
Solds%    = (SV + HLD) / (SV + HLD + BS)      # conversion reliability
K-BB%     = K/BF − BB/BF                       # skill (best single reliever-skill stat)
FIP       = (13·HR + 3·(BB+HBP) − 2·K)/IP + cFIP   # skill, ERA-independent
role      = {Closer, Committee/9th, Setup(high-lev), Middle/Hold, Low-leverage}  # from SV/SVO/HLD usage
```

**Reliever Value Score (RVS, 0–100)** — a forward-looking blend:
```
vol      = SV·1.0 + HLD·0.7                    # leverage weighting: a save > a hold for fantasy
RVS = 100 · ( 0.55·pct(vol) + 0.25·skill + 0.20·Solds% )
        where skill = 0.60·pct(K-BB%) + 0.40·pct(−FIP),  pct = percentile rank
```

### Face-validity (live 2026 output — top of `solds_table.csv`)
Mason Miller, Louis Varland, Jhoan Duran, Cade Smith, Trevor Megill, Raisel Iglesias, Tanner Scott, Bryan Baker, then setup men like Dylan Lee (19 holds) and Erik Sabrowski surfacing correctly below the closers. That is exactly the ordering a good reliever-value stat should produce — and unlike raw Solds, it separates a skilled, secure closer from a volume-only one, and it flags high-leverage setup arms as the next-save-in-waiting.

### GSE improvements over FG
- **Role tags + a forward-looking score**, not just a season-to-date count.
- **Reliability (Solds%) and skill (K-BB%, FIP) baked in** → predicts who *keeps* the role.
- **Leverage-weighted** save vs hold.
- **Glass-box:** every input column is shown; nothing hidden.

---

## 2. BURR → GSE Bullpen Rating (14-category league-normalized index)

### What theirs is
BURR = "Bullpen Usage & Reliever Ratings," publicly described as rolling **14 bullpen categories into one number vs league average**, where **under 1.00 (green) = a weak pen good for opposing hitters** and **over 1.00 (red) = a tough pen**. It's a matchup tool: how good/bad is the bullpen the hitters will face. The *method* — normalize N stats to league average and average them — is standard index construction and not ownable.

### GSE construction (implemented)
Aggregate every pure reliever (GS=0) to the team level, compute 14 categories, normalize each to the league mean so **1.00 = league average**, sign-align so **higher = stronger pen**, weight, and average.

The 14 categories (weight): **FIP (1.4), xwOBA-allowed (1.4)**, ERA (1.3), K-BB% (1.3), K% (1.2), WHIP (1.1), barrel%-allowed (1.1), BB% (1.0), HR/9 (1.0), hard-hit%-allowed (0.9), inherited-runner strand% (0.9), LOB% (0.8), save-conversion% (0.7), GO/AO (0.4).

```
FIP        = (13·HR + 3·(BB+HBP) − 2·K)/IP + cFIP     # cFIP solved so league FIP = league ERA
LOB%       = (H+BB+HBP − R) / (H+BB+HBP − 1.4·HR)
IR-strand% = 1 − IRS/IR                                # ability to strand inherited runners
index_i    = value/league   (if higher=better)  OR  league/value  (if lower=better)
BURR       = Σ(weight_i · index_i) / Σ(weight_i)
```
Statcast categories (xwOBA/barrel/hard-hit allowed) are joined from Baseball Savant by mapping each reliever's `player_id` → team.

### Face-validity (live 2026 output — `burr_table.csv`)
| Rank | Team | ERA | FIP | K-BB% | xwOBA-a | BURR |
|---|---|---|---|---|---|---|
| 1 | ATL | 3.24 | 3.68 | .161 | .253 | **1.205** |
| 2 | NYY | 3.15 | 3.56 | .146 | .277 | 1.180 |
| 3 | NYM | 3.15 | 3.47 | .165 | .279 | 1.167 |
| 4 | SD | 3.48 | 3.72 | .173 | .276 | 1.159 |
| … | … | | | | | |
| 28 | CIN | 4.66 | 5.07 | .075 | .330 | 0.879 |
| 30 | WSH | 6.60 | 5.60 | .080 | .368 | **0.763** |

Elite pens (ATL, NYY, NYM, SD, TOR, PHI, LAD) at the top; gutted pens (WSH, CWS, CIN, KC) at the bottom. A hitter facing WSH's pen (0.76) has a large late-inning edge; facing ATL's (1.21) does not — which is exactly what a matchup index is for.

### GSE improvements over FG
- **Fully transparent:** all 14 component indices are output, not just the black-box number — a bettor sees *why* a pen rates where it does.
- **Statcast-grounded:** xwOBA/barrel/hard-hit allowed (skills, not results) carry the highest weight, resisting small-sample luck.
- **Direct hitter-matchup use:** combine a team's BURR with the day's projected available relievers (workload-adjusted) for a same-day "who's gassed" read — the natural next iteration.

---

## 3. SMASH → GSE Skill-Matchup Index + Advantage Score

### What theirs is
SMASH is publicly described as a proprietary blend of **batted-ball data, pitch mix, and zone data measured against league average**, with the stated philosophy that it grades **the skills of the player, not the results** — color-coded green (target) / white / red (avoid), with a season and a last-30-day window, and an "Advantage Score" that pits a hitter against the whole opposing staff. The *philosophy* (expected stats over outcomes) and the *method* (z-score vs league, combine, color by tier) are standard analytics, not ownable expression.

### GSE construction (implemented)
"Skills over results" means **expected stats**: use xwOBA (the single best skill-descriptive hitting metric) plus the batted-ball and plate-discipline inputs, z-scored against the league and scaled to a readable 50±10 "OVR."

**Hitter SMASH** (components, direction, weight): xwOBA(+,1.6), barrel%(+,1.1), hard-hit%(+,0.9), K%(−,1.0), BB%(+,0.8), whiff%(−,0.8).
**Pitcher SMASH** (suppression): xwOBA-allowed(−,1.6), barrel%-allowed(−,1.1), hard-hit%-allowed(−,0.9), K%(+,1.2), BB%(−,1.0), whiff%(+,0.9).
```
z_c    = (x_c − league_mean_c) / league_sd_c,  sign-adjusted per direction
SMASH  = 50 + 10 · Σ(w_c·z_c)/Σ(w_c)
tiers  = ELITE ≥63 · GREEN ≥56 · WHITE 44–56 · RED 37–44 · AVOID <37
```

**Advantage Score = a principled matchup, not a vibe.** Combine hitter and pitcher on the same scale (xwOBA) with the **Log5 / odds-ratio** method used throughout sabermetrics:
```
expected_matchup_xwOBA = (hitter_xwOBA · pitcher_xwOBA_allowed) / league_xwOBA
```
"vs the whole staff" = weight this across the opposing SP + the relievers likely to appear (batters-faced-weighted team xwOBA-allowed, which the engine also computes).

### Face-validity (live 2026 output)
- **Hitters (top):** Yordan Alvarez (71.2, ELITE), Juan Soto, James Wood, Mike Trout, Aaron Judge, Shohei Ohtani — the actual expected-stat leaders.
- **Pitchers (top):** Mason Miller (81.3), Dylan Lee, Jacob Misiorowski, Jhoan Duran, Louis Varland, Dylan Cease.
- **Advantage Score sample:** Juan Soto vs Mason Miller → expected .248 xwOBA (**strong pitcher edge**, well below the .309 league line); Alvarez vs a mid-tier lefty → expected .324 (**hitter edge**). The matchup math correctly says even elite bats are underdogs against elite arms, and quantifies by how much.

### GSE improvements over FG
- **Open inputs and open math** — the anti-black-box. Every component and its weight is visible; the Advantage Score is a published formula, not a mystery number. This *is* GSE's glass-box thesis applied to their flagship tool.
- **Calibratable:** because it outputs expected xwOBA, it can be **back-tested against actual outcomes** and recalibrated — letting GSE *prove* accuracy (the ≥70% north star) where FG only asserts it.
- **Extensible:** platoon splits (vs LHP/RHP), park factors, and the rolling-30 window are one-parameter additions to the same pulls.

---

## 3b. The NFL side — QB-Types, Trench SMASH, WR SMASH (nflverse)

Built in `nfl_engine.py` from free **nflverse** 2025-season data (player stats, PFR advanced passing/rushing/receiving/defense). Their NFL flagship is where the money is; these are the clean-room rebuilds.

### QB-Types (Mike Horn's mobility model) — reconstructed and *confirmed*
Their public thesis: mobile QBs score more, a stated **+2–4 fantasy points/game** edge. We classify every QB (≥100 att) by rush rate (`rush_att/g`, `rush_yds/g`) into Very Mobile/Running · Mobile · Pocket, then compare fantasy FP/G. **Live 2025 result:**

| Type | n | FP/G |
|---|---|---|
| Very Mobile/Running | 7 | **18.2** |
| Mobile | 14 | 15.6 |
| Pocket | 24 | 13.2 |

**Mobility premium = +5.0 FP/G** — the thesis is real and, this season, *larger* than they claim. Josh Allen, Jalen Hurts, Drake Maye lead the mobile tier; Stafford/Goff are the elite-pocket exceptions (proof the rule isn't absolute — a usable nuance). This is a metric GSE can publish *with* the receipts, where FG just asserts it.

### Trench SMASH (their NFL SMASH O-line/D-line "Matchups")
Team **O-line index** from pass-protection (pressure% and sack rate allowed — lower better; pocket time — higher better) + run-blocking (yards-before-contact/att). Team **D-line pass-rush index** from pressures/sacks/QB-knockdowns/hurries generated. Both z-scored to a 50±10 scale; a matchup = offense O-line vs opponent D-line. Live 2025: Rams, Broncos, Bills top O-lines; Browns/Vikings/Titans worst; Denver, Seattle, Rams top pass-rush units. (Direct feed for their O-line Breakdown franchise.)

### WR SMASH (their WR-Coverage tool)
Receiver skill index from rec-yds/g, target share, aDOT, YAC/rec, broken tackles, passer-rating-when-targeted (+), drop% (−), receiving EPA — z-scored, tiered green/red. Live 2025 top: Puka Nacua (74.5), JSN, George Pickens, Trey McBride, Zay Flowers. The coverage side (opposing CB/scheme allowed, from PFR defensive coverage stats) is the matchup pair and a one-file extension.

## 3d. Coaching/Scheme engine + Defense + Rolling windows (`nfl_scheme_defense.py`)

Built from nflverse **play-by-play** (2025 regular season, 34,429 scrimmage plays).

**Coaching/Scheme engine — the clean-room analog of their Coaching Breakdown.** Their franchise translates "coaching system → player production." We compute that per team directly: **pace** (plays/game), **PROE** (pass-rate-over-expected, the truest play-caller-tendency stat), neutral-situation pass rate, shotgun%, no-huddle%, red-zone pass rate, **RB bellcow-vs-committee** (lead back's carry share), and **WR1 target funnel** (top receiver's target share) — then auto-label each scheme. Live 2025: KC (+4.6 PROE, pass-heavy/fast/committee), Arizona, Rams the most pass-happy; **Baltimore (−8.2 PROE, run-heavy/slow/bellcow — Henry) and the Jets** the most run-heavy. This is the "does this coach's system help my RB or my WR?" read their breakdown sells — as numbers, per team, updatable weekly. *(Note: the 2026 coaching breakdowns are not published yet — their 2025 set posted July 11, 2025; this engine gives GSE the same read now, from the season that just ended, with no paywall.)*

**Team Defense — completes the SMASH matchup pairs.** Pass-defense index (EPA/dropback allowed + coverage passer-rating/completion% allowed from PFR + pressure generated) and rush-defense index (EPA/rush + success-rate allowed). Live 2025: **Seattle #1 overall and #1 run-D (−0.207 EPA/rush)**, Houston #2. A WR now matches against the opposing pass-D index; an RB against the rush-D index; the offense O-line against the D-line — every SMASH has its defensive counterpart.

**Rolling weekly windows.** Every metric recomputes over a trailing window (last-4-weeks vs season) to surface recent form — e.g., Baltimore's PROE cratered from −8.2 (season) to −18.8 (last 4), a hard late-season run-lean the season number hides. The same `week` filter drives any window (L2W/L4W/since-a-coaching-change), and the identical mechanic ports to the MLB engine via date-ranged Savant pulls (the rolling-30 SMASH).

## 3c. Enhancements — platoon (wired) & park factors (identified)

- **Platoon splits — working, real source.** The Savant `split=vl/vr` param silently returns identical data (verified: correlation 1.0), so it is **not** usable. The correct source is the **MLB Stats API** `statSplits` endpoint with `sitCodes=vl,vr`. Proven live: Juan Soto 2026 posts **.855 OPS vs LHP → 1.069 vs RHP**. The platoon-adjusted Advantage Score multiplies the base Log5 xwOBA by `hitter_OPS_vs_hand / hitter_OPS_overall`, using the starting pitcher's throwing hand. This is the single biggest same-day SMASH sharpener and it's a per-player on-demand call.
- **Park factors — identified, not yet wired.** Savant's park-factor `csv=true` endpoint returns HTML, not CSV; the clean source is Savant's park-factor JSON leaderboard (`index_wOBA` by venue). Fold as a final multiplier on matchup xwOBA. Flagged honestly as the one remaining data wire-in rather than faked.

## 4. How to operationalize (GSE build notes)
- **Data spine:** MLB Stats API (`statsapi.mlb.com`, free, no key) for traditional + reliever detail; Baseball Savant CSV exports for Statcast expected stats. Both pull cleanly via `curl --ssl-no-revoke` on this network; `pybaseball` wraps both if you prefer Python-native (not currently installed).
- **Refresh:** re-run `gse_engine.py` daily; add a `&date` range to the Savant pulls for the rolling-30 window and to build the daily "available bullpen" BURR.
- **NFL analogs:** the same clean-room method rebuilds their NFL SMASH (O-line/D-line and WR-coverage) from nflverse (participation, pressure, route/coverage data) and the QB-types model from rushing-rate splits — all data GSE already uses.
- **The moat:** FG sells these as sealed numbers. GSE can ship the *same class of metric* with the reasoning, the inputs, and a public accuracy back-test attached. That is a category-different product, and it is entirely yours.

*Built from free public data (MLB Stats API + Baseball Savant). No FantasyGuru data accessed or reproduced. Methods per 17 U.S.C. §102(b) are uncopyrightable; outputs are GSE IP.*
