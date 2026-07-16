# FantasyGuru Intelligence + GSE Engine — package index

Everything produced in this project, and how to use it. Two things live here: (1) a competitive-intelligence dossier on FantasyGuru.com, and (2) working GSE engines that rebuild FantasyGuru's signature metrics from free public data.

**Boundary held throughout:** only FantasyGuru's *public* surface was read (robots.txt allows it); no paywalled article or data-grid content was accessed or reproduced. The engines use only free public data (MLB Stats API, Baseball Savant, nflverse). Methods and statistics are not copyrightable (17 U.S.C. §102(b)); the engine output is GSE-owned IP.

---

## Start here
- **`dossier.html`** — the v3 visual dossier (also published as an artifact). Sections 01–08 competitive intel, 09 corporate reality + business scale, 10 MLB engine, 11 NFL engine.
- **`METHODOLOGY-SMASH-BURR-SOLDS.md`** — the science: exact reconstructed formulas for every metric + the legal basis + GSE improvements.

## The engines (run these to refresh)
| File | Builds | Data source |
|---|---|---|
| `gse_engine.py` | MLB: Solds/RVS, BURR, SMASH (hitters+pitchers), Log5 Advantage Score | MLB Stats API + Baseball Savant |
| `nfl_engine.py` | NFL: QB-Types, Trench SMASH (O-line/D-line), WR SMASH | nflverse 2025 (stats + PFR advanced) |
| `nfl_scheme_defense.py` | NFL: Coaching/Scheme engine (coaching-breakdown analog), team Defense (coverage + rush-D + pass-rush), rolling weekly windows | nflverse 2025 play-by-play |

Run: `python gse_engine.py` and `python nfl_engine.py` (needs pandas + numpy; data pulled via `curl --ssl-no-revoke` on this TLS-intercepted network). Re-run daily for fresh tables.

### Output tables (live)
- `solds_table.csv` — 311 relievers, Reliever Value Score + role
- `burr_table.csv` — 30 bullpens, 14-category index vs league
- `smash_hitters.csv` / `smash_pitchers.csv` — 463 hitters / 337 pitchers, skill index + tier
- `qb_types.csv` — 45 QBs classified by mobility (proves +5.0 FP/G premium)
- `trench_smash.csv` — 32 teams, O-line + D-line indices
- `wr_smash.csv` — 160 pass-catchers, receiving skill index
- `scheme_coaching.csv` — 32 teams, coaching/scheme profile (pace, PROE, RB committee, WR funnel) — the Coaching Breakdown analog
- `team_defense.csv` — 32 teams, pass-D + rush-D + coverage + pass-rush indices (the SMASH matchup pairs)
- `rolling_form.csv` — 32 teams, season vs last-4-weeks (recency)

## Competitive intelligence
- `FANTASYGURU-DOSSIER.md` — full written dossier (positioning, pricing, tools, NFL+MLB franchises, roster, strategy)
- `DEEP-INTEL-ADDENDUM.md` — corporate lineage (founded 1995 by John Hansen; PE-owned via Orange Capital since 2017), business scale (~24k subs / ~$2.5M rev / ~$600K EBITDA, 2023 disclosure), publishing velocity, infrastructure, author/key-person analysis
- `workflow-digest.md` — structured harvest of 81 public pages
- `browser-captures.md`, `content-previews-and-tools.md` — high-fidelity roster/pricing + tool-menu/methodology captures
- `inventory-master.csv` (46,844 URLs) + `inventory-nfl.csv` / `inventory-mlb.csv` — the full public catalog with slug/date/franchise
- helper scripts: `parse_sitemaps.py`, `analytics.py`, `digest_workflow.py`

## Headline findings
- **FantasyGuru is a ~$2.5M-revenue, ~24k-subscriber, PE-owned media business** — beatable size; personality/radio (Jeff Mans, Ray Flowers on SiriusXM) + Discord is the moat, not data.
- **MLB is the soft flank** — NFL out-publishes it ~10–15×, and MLB is concentrated in one analyst (Ray Flowers), on the vertical where they just lost a data vendor (Swish Analytics).
- **Their metrics are reproducible and improvable.** GSE now has glass-box, back-testable rebuilds of SMASH, BURR, Solds (MLB) and QB-Types, Trench, WR (NFL). FG sells sealed numbers; GSE can ship the same class of metric with the reasoning and a public accuracy back-test attached.
- **The QB-mobility thesis is real** — verified +5.0 FP/G premium (they claim +2–4).

## Known next wire-ins (honest gaps)
- **Platoon splits:** working source is the MLB Stats API `statSplits` endpoint (Savant's `split` param silently fails — verified). Multiply Advantage Score by `OPS_vs_hand / OPS_overall`.
- **Park factors:** Savant park-factor CSV endpoint returns HTML; use its JSON leaderboard. Fold as a final matchup multiplier.
- **NFL extensions:** coverage-side (CB/scheme allowed), team rush-defense, and weekly windows are one-file additions.

*No FantasyGuru data was used in any engine. All engine inputs are free public data.*
