# HP-15 — External repo leverage triage, batch 2 (28 repos from the founder, 2026-09-09 01:50 UTC)

Priority AFTER HP-14. Same laws as HP-1..HP-9. Branch `hermes/repo-triage-2` off `origin/main` of
this repo. Output: one dossier per repo under `data/extracted/repos/<owner>__<repo>.md` plus a summary
table in `data/extracted/repo-triage-2026-09-09.md`. Docs only; nothing touches the Sports repo.

## Rubric (every dossier answers all six, "NOT CHECKED" is a valid answer, an invented answer is not)
1. License (SPDX id from the LICENSE file, or NONE). No license = read-only reference, never copied.
2. What it actually does (from README and the top-level code, not the description line).
3. Data sources it uses and their rights posture vs our registry
   (`packages/data-ingestion/src/source-registry.ts` in Sports): cleared / commercial-use / scrape.
4. The ONE thing GSE could lift (a formula, a source, an endpoint spec, a test fixture), or NONE.
5. Risk: does using it require a key we do not hold, a paid plan, or a scrape? (Rule 1, clearance.)
6. Verdict: ADOPT-CANDIDATE / REFERENCE-ONLY / IGNORE, one line of reason.

## The 28, pre-grouped by name only (Hermes verifies the grouping)

### A. Odds and book API specs (api-evangelist OpenAPI catalogs) — second-book and sharp-line candidates
- https://github.com/api-evangelist/therundown — already our registered fallback (429s daily); spec only.
- https://github.com/api-evangelist/pinnacle — sharp closing lines; check the terms, Pinnacle API is partner-gated.
- https://github.com/api-evangelist/novig — peer-to-peer exchange; possible second book if a public quote endpoint exists.
- https://github.com/api-evangelist/swish-analytics — props/projections vendor; likely paid.
- https://github.com/api-evangelist/gammastack — B2B platform; likely IGNORE.

### B. NFL edge / value-board models — compare formulas against ours, never copy a number
- https://github.com/bxntt/barnbetsinc
- https://github.com/daypatell/nfl-value-board
- https://github.com/jdev-02/gooseline-model-hq
- https://github.com/taihao40297-droid/edge-record
- https://github.com/chmoses98/nfl-edge-finder
- https://github.com/skrt0215/gridiron-prophet
- https://github.com/shawn14/nfl-betting-system
- https://github.com/LeSingh1/edge-nfl
- https://github.com/andrewnexys/edgefinder-cli
- https://github.com/ianalloway/sports-betting-ml
- https://github.com/elevation-edge-sports-data/multisport-elo-lab
- https://github.com/mhaythornthwaite/Football_Prediction_Project (soccer)
For each: how they define edge (e = p − q on de-vigged q is our doctrine, C-197/C-255), how they de-vig,
and whether their "record" is receipted. Anything that publishes an unreceipted win rate is a
positioning counter-example for `docs/marketing/`, not a model to borrow.

### C. Prediction-market tooling — Kalshi second-book route and Polymarket hold
- https://github.com/pmxt-dev/pmxt — unified prediction-market exchange toolkit; if it wraps Kalshi
  directly, note that the legal route on main is PredExon (Kalshi Dev Agreement §3), so ADOPT only as a
  reference for the quote shape, not as a direct feed.
- https://github.com/jangles-byte/Pythia
- https://github.com/elsantos305/predmarket
- https://github.com/sarviinageelen/polymarket-sports-analysis — Polymarket is a COMPLIANCE HOLD
  (`.claude/skills/polymarket-hold`); analysis reference only.
- https://github.com/aarora4/Awesome-Prediction-Market-Tools, https://github.com/aland4747/awesome-prediction-markets — lists; harvest sources into the registry candidates table, cite each.
- https://github.com/ccxt/ccxt — crypto exchange abstraction; relevant only as the adapter pattern
  (one interface, N venues) for a future `GalaxySportsApi` book adapter. REFERENCE-ONLY.

### D. Unclear — one-paragraph dossier each, then verdict
- https://github.com/machina-sports/sports-skills (agent skills for sports; compare with `.claude/skills/`)
- https://github.com/Nicolas-Pedernera/predictions-graphql-api
- https://github.com/rzhang539/PokiAPI-ML-predictions
- https://github.com/3bsalam-1/Car-Info (probably a paste error; confirm and IGNORE)

## Hard rules
- Read-only. No cloning into the Sports repo, no dependency added, no key pasted anywhere.
- Every claim in a dossier cites the file path in the source repo it came from.
- One commit per group (A, B, C, D), ledger row C-277 in Sports is NOT opened by Hermes; this is
  intel-repo work and is tracked here only.
