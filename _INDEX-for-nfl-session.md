# Firecrawl scores24 -> NFL session — navigation index

Copied 2026-07-16 from the local "Firecrawl scores24.live" session. This index is a
map for the NFL/coding session. Full byte-level file list: `_MANIFEST.txt`.

Layout: 524 files top-level - 16 in `nfl/` - 4 in `.firecrawl/` (CT-log / RDAP / DNS JSON). 544 total incl. this index + manifest.

--------------------------------------------------------------------------------

## > START HERE
- **`_HANDOFF-to-coding-agent.md`** — the self-contained engineering handoff: build
  spec, phase sequence, math specs, data contracts, acceptance tests, guardrails.
  A fresh coding agent needs ONLY this file to begin. Everything else is depth.

## Core strategy & math (for depth)
- `_MASTER-gse-strategic-dossier.md` — product/strategy master.
- `_gse-edge-lab-final.md` — quant core (calibration, conformal edge-gate, Kelly).
- `_gse-domination-capstone.md` — synthesis / long-range plan.

## Competitor teardowns & playbooks
- scores24: `_scores24-teardown-final.md`, `_scores24-verified-playbook.md`
- FantasyPros: `_fantasypros-teardown-final.md`, `_fantasypros-verified-playbook.md`, `_fantasypros-primary.md`
- cross-cutting: `_competitor-mistakes-lessons.md`, `_expansion-targets.md`, `_ngs-pfr-fantasyguru-reaudit.md`, `_primary-findings.md`
- supporting: the `_verify-*`, `_s24-*`, `_api-*`, `_sw-fp` / `_semrush-fp`, `_rw-about`, `_fp-points-by-rank-curve` files.

## Raw research artifacts (~514 files)
Sitemaps (`_sm_*`, `_est_*`, `_ps_*` .xml), page scrapes (`about.md`, `accumulators.md`,
`actionnetwork-home.md`, ...), live-verification captures, the scraper script
`_s24_pred_scraper.py`, and CT/DNS/RDAP JSON. See `_MANIFEST.txt` for the literal list.

--------------------------------------------------------------------------------

## /!\ CONTAINS PERSONAL DATA — keep local, never publish or commit
These files contain the scores24 owner's national ID number and/or date of birth:
- `ari_kiito.md`
- `kirillov-profile.md`
- `inforeg_person.md`
- (portions are also embedded inside `_scores24-teardown-final.md`)

Keep them on-disk only. Do NOT push this folder to GitHub or any shared/public place,
and strip these before anything leaves your machine. The `.gitignore` in this folder
already blocks the entire directory from being committed to any parent git repo.

**The coding agent does not need any of these profile files to build.** Point it at
`_HANDOFF-to-coding-agent.md` (plus optionally the edge-lab and dossier) and leave the
profiles out of what it reads.
