# FantasyGuru Deep-Read — GSE Competitive Intel

## Engines (FULL READ — no stubs)

### `gse_engine.py` (MLB / 237 lines)
- **Runs?** No `if __name__` / CLI; import-and-run (prints proof). **Not a standalone CLI.**
- **Outputs:** `solds_table.csv`, `burr_table.csv`, `smash_hitters.csv`, `smash_pitchers.csv`.
- **Data source:** MLB Stats API (`pitching_all.json`) + Baseball Savant (`savant_pit_custom.csv`, `savant_bat_custom.csv`) — real Statcast. Claims "2026 MLB season".
- **No nflverse / no Statcast NFL data.**

### `nfl_engine.py` (NFL / 137 lines)
- **Runs?** No `main()`; import-and-run print block (proof output).
- **Outputs:** `qb_types.csv`, `trench_smash.csv`, `wr_smash.csv`.
- **Data source:** `nfl/` subdir CSVs (`stats_reg_2025.csv`, `adv_pass.csv`, `adv_rush.csv`, `adv_rec.csv`, `adv_def.csv`) — **verified: `season==2025` on all pulls**. Uses nflverse naming but file-level; no `nflverse` Python package import.
- **What '2025' it pulls:** 2025 nflverse-style season files (local CSVs), not a live API year parameter.

### `nfl_scheme_defense.py` (NFL / 139 lines)
- **Runs?** No CLI; import-and-run.
- **Outputs:** `scheme_coaching.csv`, `team_defense.csv`, `rolling_form.csv`.
- **Data:** `pbp_2025.csv` (play-by-play, regular season, `week<=18`), `stats_reg_2025.csv`, `adv_def.csv` (season==2025). Same local nflverse-style files.

## Docs (1-2 line substance)
- **METHODOLOGY-SMASH-BURR-SOLDS.md:** Clean-room rebuild of FG's SMASH/BURR/Solds from MLB Stats API + Savant; 2026 season; glass-box formulas; confirms mobility premium (+5.0 FP/G).
- **FANTASYGURU-DOSSIER.md:** 46,844 public URLs; FG is PE-owned (~$2.5M rev, ~24k subs); NFL 10-15× MLB volume; Swish Analytics vendor dropped 2026.
- **DEEP-INTEL-ADDENDUM.md:** Passive OSINT (Cloudflare/Next.js/DigitalOcean); MLB depends heavily on Ray Flowers (key-person); Android app pulled Apr 2025.

## Overlap with sports-intel prop models (props-hb-*.ts / Shin / fire gate)?
- **No direct duplication.** FantasyGuru engines are MLB (Statcast) + NFL (nflverse) fantasy-ranking / matchup tools (SMASH/BURR/Solds/QB-types/Trench). The `props-hb-*.ts` / Shin machinery (per workspace refs) targets calibrated NFL prop probabilities (rush yards, etc.) via nflverse + betting-market calibration.
- **Conceptual overlap only:** `nfl_engine.py`'s QB-types mobility thesis aligns with the QB mobility angle in prop models; `nfl_scheme_defense.py` defense/rolling windows could feed prop context — but neither produces betting probabilities, odds, or calibration outputs. They are fantasy-value metrics, not prop-machinery.

## HONEST gaps
- **CSV contents UNREAD** — only filenames and `to_csv` lines verified. Rows/values not inspected.
- **No live execution performed** — engines were not executed end-to-end (would require local `nfl/` CSV files present; `gse_engine.py` requires `data/` subdir with JSON/CSV inputs).
- `nfl_engine.py` pulls from **local** `nfl/*.csv` files tagged `season==2025`, not a live nflverse R package call — year is hardcoded in file content, not a parameter.
