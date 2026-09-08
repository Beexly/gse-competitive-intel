# Dossier — The Open-Source Stack a Serious Builder Would Use

**Slug:** `open-source-stack`
**Captured:** 2026-09-08
**Method:** public GitHub raw files (`raw.githubusercontent.com`), public HTML repo views, public terms-of-use pages, public API responses. No authentication, no paywall crossing, no endpoint scanning. `api.github.com` is blocked in this session (HTTP 403, "GitHub access to this repository is not enabled for this session"), so every license below was read out of the repo's own `LICENSE` / `DESCRIPTION` / `pyproject.toml` / `setup.py` file, not from a GitHub metadata badge.
**Companion read:** `/home/user/Sports/.claude/rules/scraping.md` (the clearance posture this is graded against), `_HANDOFF-to-coding-agent.md` §1 (the anti-fabrication and data-rights guardrails).

---

## 0. The one-paragraph answer

The open-source sports stack is **not a competitor. It is a supply chain, and it is legally bimodal.** The *code* is uniformly permissive and free — MIT everywhere, one GPL-3.0, one unlicensed. The *data those packages reach* splits hard into two piles that look identical from a Jupyter notebook and are opposite in a commercial product: a genuinely-cleared pile (nflverse CC-BY-4.0, Retrosheet, Chadwick ODC-BY-1.0, OpenLigaDB ODbL-1.0) and a **hard-prohibited pile whose terms name exactly what GSE is** (MLB StatsAPI + Baseball Savant: "individual, non-commercial, non-bulk"; NBA.com: no product "that features a database ... of comprehensive, regularly updated statistics"; ESPN/Disney: no robot/spider/script, no commercial use). The most valuable single artifact in the whole stack is a **free, working, correlated Monte-Carlo GPP simulator** (`chanzer0/NFL-DFS-Tools`) that has **no LICENSE file at all** — meaning it is all-rights-reserved and we may read its method but not vendor its code. **The seam is not that we can build a better simulator. It is that we would be the only party in the category that can state, per source, which of those two piles a number came from — and prove it in code.**

---

## 1. HOW IT WORKS, MECHANICALLY — is there a simulation engine?

### 1a. `chanzer0/NFL-DFS-Tools` — yes, a real one, and it is the best documented free simulator found

Source: <https://raw.githubusercontent.com/chanzer0/NFL-DFS-Tools/main/README.md>, read 2026-09-08.

This is the single most methodologically substantive thing in the open stack, and it is worth reading in full. Verbatim from the "Simulation Methodology" section:

> - Players are segmented by projected fantasy points into windows using `distribution_data/fp_distributions_<site>.csv`.
> - For each position/window we use empirically fitted families: gamma, lognormal, Weibull, skew-normal, ex-Gaussian, generalized gamma, shifted gamma.
> - For complex families, we sample from the fitted parameters, then apply an affine transform so samples match each player's projected mean and standard deviation exactly.
> - We impose correlations via a Gaussian copula with Iman–Conover rank reordering to preserve marginals while achieving the target correlation structure.
> - Correlations are read from YAML by position and projection window (`distribution_data/fp_correlations_<site>.yaml`), falling back to `.npz` when necessary.
> - You can override correlations per player/position through `custom_correlations` in `config.json`.
> - Heavy-tail guardrail: if a fitted heavy-tailed family yields extreme tails relative to a player's mean/std, we fall back to a calibrated gamma matching mean and std.

And on the contest field:

> Lineup generation for the simulated field uses projections, ownership, stacking and constraints from `config.json`. We rank lineups for each simulation, allocate prizes from `contest_structure.csv`, and aggregate ROI and rates (Wins, Top1%, etc.).

**What is simulated, precisely — all four layers are present:**

| Layer | How | Evidence |
|---|---|---|
| Player marginal distributions | Seven fitted parametric families, chosen per position × projection window; affine-rescaled so each player's simulated mean/SD match the input projection exactly | README, quoted above |
| Correlations | Gaussian copula + **Iman–Conover** rank reordering (preserves the fitted marginals while hitting a target rank-correlation matrix) | README, quoted above |
| Contest field | Opponent lineups generated from projections + **ownership** + stacking constraints; or supply your own via `tournament_lineups.csv` with the `file` flag | README "Usage" + "Simulation Methodology" |
| Payout / ROI | Prizes allocated from `contest_structure.csv`; ROI, Wins, Top1% aggregated across sims | README "Simulation Methodology" |

**Sim count is user-supplied, not a product limit.** The invocation is literally `uv run src/main.py dk sim <field_size> <num_iterations>`, and every README example uses `10000`:

> `uv run src/main.py dk sim 58823 10000`
> `uv run src/main.py dk sd_sim cid 10000`

`58823` is a field size (a DK contest's entrant count); `10000` is the iteration count. Contest-driven mode (`sim cid 10000`) reads the real payout ladder from `contest_structure.csv` instead of an arbitrary field.

**The required input schema is the interesting part** — it tells you exactly what this engine needs that GSE does not currently produce. Verbatim from the config block:

> `"projection_path": "projections.csv", // required columns: Name, Position, Team, Salary, Fpts, Own%, StdDev; optional: Ceiling, Field Fpts, CptOwn%`

So the simulator **requires** a per-player `StdDev` and an `Own%` (ownership projection) as *inputs*. It does not produce them. Also configurable: `default_qb_var: 0.4`, `default_skillpos_var: 0.5`, `default_def_var: 0.5`, `pct_field_using_stacks: 0.65`, `pct_field_double_stacks: 0.4`, `randomness: 25`, `max_pct_off_optimal: 0.25`, and per-player `custom_correlations` (the sample shows `"Joe Burrow": {"RB": 0.69, "WR": -0.42}`).

**LICENSE: NONE.** Verified two ways — `https://raw.githubusercontent.com/chanzer0/NFL-DFS-Tools/main/LICENSE` returns `404: Not Found`, and the rendered repo page at <https://github.com/chanzer0/NFL-DFS-Tools> shows no license in the About sidebar (49 stars at time of read). The README says *"We believe in open source and collaboration. This simulation toolkit will remain free."* — **that is a sentiment, not a license grant.** Under default copyright, no LICENSE = all rights reserved. **We may read and learn the method (published, public, and the underlying techniques — Iman–Conover 1982, Gaussian copulas — are academic prior art). We must not vendor, fork, or copy the code.** Sibling repos `chanzer0/MLB-DFS-Tools`, `NBA-DFS-Tools`, `PGA-DFS-Tools` exist with the same pattern (surfaced via WebSearch); I did not verify their license files individually — **NOT CONFIRMED** for the siblings.

### 1b. `pydfs-lineup-optimizer` — an optimizer, NOT a simulator

Source: <https://raw.githubusercontent.com/DimaKudosh/pydfs-lineup-optimizer/master/docs/index.rst>, `.../setup.py`, `.../pydfs_lineup_optimizer/solvers/pulp_solver.py`, `.../rules.py`, all read 2026-09-08.

This is a **deterministic MILP solver**, and it is important to be exact about that because the category conflates "optimizer" with "simulator" constantly. It maximizes a linear objective subject to roster constraints. There is no distribution, no correlation, no field, no ROI.

- **Solver:** PuLP → CBC. Verbatim from `solvers/pulp_solver.py`: `from pulp import LpProblem, LpMaximize, LpVariable, lpSum, LpStatusOptimal, LpBinary, LpInteger, PULP_CBC_CMD` and `LP_SOLVER = PULP_CBC_CMD(msg=False)`, `self.prob = LpProblem('pydfs_lineup_optimizer', LpMaximize)`.
- **Dependency pin:** `install_requires=['PuLP==2.4', 'pytz>=2020.5']` (`setup.py`). A hard `==` pin on a 2021-era PuLP. Note for legal review: PuLP itself is MIT but **bundles the CBC solver binary, which is EPL-2.0** — a weak copyleft that matters at distribution, not at server-side use. Server-side-only use (which is what GSE would do) does not trigger EPL distribution obligations. **NOT CONFIRMED by counsel; flagging, not concluding.**
- **License:** `setup.py` says `license='MIT'`, `author='Dima Kudosh'`. **But the `LICENSE` file in the repo reads, verbatim: `The MIT License (MIT)` / `Copyright (c) 2015-2016 Kevin B. Knapp`.** Kevin B. Knapp is the author of the Rust `clap` crate — this is a copy-paste artifact. The grant is unambiguously MIT either way (MIT is MIT regardless of whose name is on it), but the copyright holder line is wrong. Low risk, worth a one-line note in the registry entry so nobody re-discovers it in an audit.
- **Coverage** (verbatim from `docs/index.rst` support matrix): 13 leagues — NFL, NBA, NHL, MLB, WNBA, Golf, Soccer, CFL, CFB, LOL, MMA, NASCAR, Tennis (README also lists CSGO) — across DraftKings, FanDuel, FantasyDraft, Yahoo, FanBall, DraftKings Captain Mode, FanDuel Single Game, DraftKings Tiers. NFL is the only league supported on all eight site modes; CFL/CFB are DraftKings-only; Soccer is DK/Yahoo/DK-Captain only.
- **Constraint vocabulary** (class names from `rules.py`, which is the real feature list): `UniqueLineupRule`, `TotalPlayersRule`, `LineupBudgetRule`, `LockedPlayersRule`, `PositionsRule`, `TeamMatesRule`, `MaxFromOneTeamRule`, `MinSalaryCapRule`, **`ProjectedOwnershipRule`**, `UniquePlayerRule`, `LateSwapRule`, `GenericStacksRule`, **`MinExposureRule`**, `RestrictPositionsForOpposingTeam`, `RestrictPositionsForSameTeamRule`, `ForcePositionsForOpposingTeamRule`, `RosterSpacingRule`, `FanduelBaseballRosterRule`, `TotalTeamsRule`, `FanduelSingleGameMaxQBRule`, `MinStartersRule`, `MinGamesRule`, `DraftKingsBaseballRosterRule`, `DraftKingsTiersRule`, `TeamsExposureRule`.
  - Note `ProjectedOwnershipRule` and `MinExposureRule`/`TeamsExposureRule`: it *consumes* ownership and exposure targets as constraints. It does not *model* the field. That distinction is the whole gap between §1b and §1a.
- **Multi-lineup:** `optimizer.optimize(10)` / `dk opto 1000 3` (1000 lineups, 3 uniques). No documented cap.

### 1c. Ownership projection — the thinnest link in the chain

Two public projects surfaced (WebSearch, 2026-09-08):

- `jmoore87jr/DFS_ownership_projections` — NBA. Method per the search summary: generate optimal lineups from each site's own published projections, compute each player's exposure across those lineups, then weight by the site's popularity. That is a **proxy for ownership, not a model of it** — it assumes the field plays each site's optimizer output in proportion to that site's traffic. **I did not fetch this repo directly; license NOT CONFIRMED.**
- `chanzer0/NFL-DFS-Tools` — takes `Own%` as a required *input column*. It consumes ownership; it does not project it.

**Conclusion for priority 1: there is no credible open-source ownership projection.** The open stack's simulators are correlation-and-payout engines with an ownership-shaped hole in the input schema. Everyone fills that hole by buying it (RotoGrinders/FantasyLabs/etc.) or guessing. This is a real gap, not a research artifact.

### 1d. Aggregation — `ffanalytics`

Source: <https://raw.githubusercontent.com/FantasyFootballAnalytics/ffanalytics/master/DESCRIPTION>, read 2026-09-08. `Package: ffanalytics`, `Version: 3.1.18.0000`, `Description: Scrapes data from multiple public sources of data and compiles into one dataset.`, **`License: GPL`**.

Two problems, and both are disqualifying for our use as written:
1. **`License: GPL`** — unversioned. R's own conventions treat bare `GPL` as GPL-2-or-later, but it is ambiguous, and GPL is copyleft: linking it into a server-side pipeline is arguably fine (no distribution), but there is no reason to accept the ambiguity when the *aggregation method* is trivial to reimplement.
2. It is a **scraper of other people's projection pages**, which means its clearance status is inherited from every site it hits — which is exactly what our registry already refuses for `fantasypros-com` (`permission_required`, see `apps/web/lib/scraping/source-rights-registry.ts:610-625`). Adopting `ffanalytics` would import a dozen unassessed sources in one dependency.

---

## 2. WHAT THEY "SELL" AND THE LIMIT THAT IS THE PRODUCT BOUNDARY

Open source has no price. **The tier table for this target is the license table, and the "limit that is the product boundary" is the data-rights status of what each package reaches.** Every license below was read from the repo's own file on 2026-09-08.

### 2a. Code licenses — verbatim from source

| Package | License file read | Verbatim first line(s) | Verdict |
|---|---|---|---|
| `DimaKudosh/pydfs-lineup-optimizer` | `master/LICENSE` + `setup.py` | `The MIT License (MIT)` / `Copyright (c) 2015-2016 Kevin B. Knapp`; `setup.py` → `license='MIT'`, `author='Dima Kudosh'` | **MIT.** Usable. Copyright line is a paste artifact (see §1b). |
| `nflverse/nfl_data_py` | `main/LICENSE` | `MIT License` / `Copyright (c) 2021-2024 cooperdff` / `Copyright (c) 2024-2025 nflverse authors` | **MIT — but DEPRECATED.** See §2c. |
| `nflverse/nflreadpy` | `main/pyproject.toml` | `license = "MIT"`, `"License :: OSI Approved :: MIT License"` | **MIT.** The live successor. |
| `nflverse/nflreadr` (R) | `main/DESCRIPTION` | `License: MIT + file LICENSE` | **MIT.** |
| `nflverse/nflfastR` (R) | `master/DESCRIPTION` | `License: MIT + file LICENSE` | **MIT.** |
| `swar/nba_api` | `master/LICENSE` | `MIT License` / `Copyright (c) 2018 Swar Patel` | **MIT code, prohibited data.** See §2b. |
| `jldbc/pybaseball` | `master/LICENSE` | `MIT License` / `Copyright (c) 2017 James LeDoux` | **MIT code, prohibited data.** See §2b. |
| `toddrob99/MLB-StatsAPI` | `master/LICENSE` | `GNU GENERAL PUBLIC LICENSE` / `Version 3, 29 June 2007` | **GPL-3.0** — the only copyleft in the set. Plus prohibited data. |
| `chanzer0/NFL-DFS-Tools` | `main/LICENSE` → `404: Not Found` | *(none)* | **NO LICENSE = all rights reserved.** Read the method, do not take the code. |
| `FantasyFootballAnalytics/ffanalytics` | `master/DESCRIPTION` | `License: GPL` | **GPL, unversioned.** Skip. |

### 2b. Data rights — THE ACTUAL BOUNDARY, quoted verbatim

This is the section that matters. A permissive code license on a client says nothing about the rights to the bytes it fetches.

**MLB Stats API + Baseball Savant/Statcast — PROHIBITED for a commercial product.**
The copyright notice is served inside the API response itself. Read live at `https://statsapi.mlb.com/api/v1/teams?sportId=1`, 2026-09-08, verbatim:
> `Copyright 2026 MLB Advanced Media, L.P.  Use of any content on this page acknowledges agreement to the terms posted here http://gdx.mlb.com/components/copyright.txt`

And that linked notice says, verbatim (<http://gdx.mlb.com/components/copyright.txt>):
> "Only individual, non-commercial, non-bulk use of the Materials is permitted"
> "any other use of the Materials is prohibited without prior written authorization from MLBAM"
> "prohibited from using the Materials in any commercial manner other than as expressly authorized by MLBAM"

`toddrob99/MLB-StatsAPI`'s own README acknowledges this, verbatim:
> "This package and its author are not affiliated with MLB or any MLB team. This API wrapper interfaces with MLB's Stats API. Use of MLB data is subject to the notice posted at http://gdx.mlb.com/components/copyright.txt."

Baseball Savant is `baseballsavant.mlb.com` — an MLB Digital Property, governed by <https://www.mlb.com/official-information/terms-of-use>, which reads verbatim:
> "use automated scripts to collect information from or otherwise interact with the MLB Digital Properties" *(listed among prohibited uses)*
> "The Services and all other products offered via the MLB Digital Properties are provided for your private, non-commercial use, and you may not distribute, modify, translate, rebroadcast, transmit, stream, perform or create derivative works of them."

`pybaseball`'s own README, verbatim: *"This package scrapes Baseball Reference, Baseball Savant, and FanGraphs so you don't have to."* — three sources, three separate rights problems, one import statement. **Three words matter in the MLBAM notice: individual, non-commercial, non-bulk. A cron job feeding a paid picks board fails all three.**

**NBA.com / `nba_api` — PROHIBITED, and the clause names our exact product shape.**
`nba_api`'s README, "License & Terms of Use", verbatim:
> "The `nba_api` package is Open Source with an MIT License."
> "NBA.com has a Terms of Use regarding the use of the NBA's digital platforms."

That linked ToU (<https://www.nba.com/termsofuse>) says, verbatim:
> "the NBA Statistics may not be used in connection with any website, product, or service that features a database (in any medium or format) of comprehensive, regularly updated statistics from NBA, WNBA or G-League games"
> "No Basketball Content from the Services may be reproduced, republished, uploaded, posted, modified, reused, transmitted, reproduced, distributed, copied, publicly displayed, linked to, or otherwise used except as provided in these Terms of Use without the written permission of the Operator."

That first clause is not generic boilerplate. It is a targeted prohibition on **exactly** what a sports prediction product is. NBA is the cleanest "do not build this without a license" signal in the entire stack.

**ESPN hidden endpoints — this one is a live contradiction in our own registry, and it needs a founder decision.**
`www.espn.com` links its terms to `https://disneytermsofuse.com/english/` (verified: the only terms href on the ESPN homepage). That document says, verbatim:
> "access, monitor, copy or extract the Disney Products using a robot, spider, script, or other automated means, including, for the avoidance of doubt, for the purposes of creating or developing any AI Tool, data mining or web scraping"
> "use the Disney Products for any commercial or business-related use or build a business utilizing the Disney Products"

Additionally, `https://www.espn.com/robots.txt` (read 2026-09-08) contains an explicit block on our own user-agent family:
```
User-agent: anthropic-ai
Disallow: /
```
alongside `GPTBot`, `Google-Extended`, `CCBot`, `ChatGPT-User`, `Bytespider`, `claritybot`, `FacebookBot`, `Omgilibot`/`Omgili`. The `User-agent: *` block disallows `*/boxscore?`, `*/playbyplay?`, `*/conversation*`, `*/date/`, `*/databaseresults/` among others.

Two honest caveats, because this cuts both ways:
1. **`site.api.espn.com` is a different host and serves no robots.txt** — `https://site.api.espn.com/robots.txt` returns **HTTP 403** (Akamai "Access Denied", reference `#18.8de84217...`). No robots file means no robots directive, neither allow nor deny. The `www.espn.com` robots.txt does not govern a different hostname. So the *robots* argument against the JSON API host is weaker than it looks.
2. The *terms* argument is not weaker. The Disney ToU covers "the Disney Products," and ESPN is one.

**Our registry currently carries `espn-public-api` as `approved_public_logged_off`** (`apps/web/lib/scraping/source-rights-registry.ts:231-246`, attribution "Scores data via ESPN"), and per `AGENTS.md` ESPN is the designated **Book 1** of the two-book board (`galaxy-espn-inline`). **I am not resolving this and no agent should.** What I am doing is recording that the clearance basis for our single most load-bearing data source is a terms document that says "no robot, spider, script" and "no commercial use," and that this is a founder + counsel decision, not an engineering one. Writing it down is the contribution; papering over it would be the failure.

**nflverse — genuinely clean, and it is the model for how this should look.**
- Code: MIT (all four packages, above).
- Data: `nflverse/nflverse-data/master/LICENSE.md` reads, verbatim, `Attribution 4.0 International` (i.e. **CC-BY-4.0**).
- `nflreadpy`'s README states the split precisely, verbatim:
  > "The majority of all nflverse data available (ie all but the FTN data as of July 2025) is broadly licensed as CC-BY 4.0, and the FTN data is CC-BY-SA 4.0 (see nflreadr docs for each main data file)."
- But `nflreadr`'s README adds the caveat that everyone skips, verbatim:
  > "The R code for this package is released as open source under the MIT License. **NFL data accessed by this package belong to their respective owners, and are governed by their terms of use.**"

  That is nflverse telling you, in their own words, that their CC-BY grant covers *their compilation*, not the underlying NFL facts. Our registry already models this correctly — `nflverse` is `approved_open_license` with CC-BY-4.0 attribution AND a separate `pfr-advstats-via-nflverse` entry at `permission_required` (registry lines 150-165), which is exactly the right carve-out. Someone here did this properly already.

**Retrosheet — the best terms in the entire stack.** <https://www.retrosheet.org/notice.txt>, verbatim:
> "Recipients of Retrosheet data are free to make any desired use of the information, including (but not limited to) selling it, giving it away, or producing a commercial product based upon the data."
> "The following statement must appear prominently: The information used here was obtained free of charge from and is copyrighted by Retrosheet. Interested parties may contact Retrosheet at 'www.retrosheet.org'."

Explicit commercial permission, explicit attribution string. This is `approved_open_license` material with a copy-paste attribution line. **It is the only baseball source in this dossier we can use commercially without a license negotiation.**

**Chadwick Bureau Register** — <https://raw.githubusercontent.com/chadwickbureau/register/master/README.md>, verbatim:
> "This dataset is made available under the Open Data Commons Attribution License: http://opendatacommons.org/licenses/by/1.0/"

**ODC-BY-1.0** — attribution, no share-alike, commercial OK. It is an identity/authority file (player IDs, names, DOB, career spans across 16 files `data/people-0.csv`…`people-f.csv`) — the crosswalk that lets Retrosheet IDs join to anything else. Caveat in their own words: *"This public version of the Register is an extract of the full Chadwick register: Revisions and updates are provided at a delay relative to the full version"* and *"updated only periodically"* (roughly weekly). Fine for identity resolution; not a live feed.

**OpenLigaDB** — <https://www.openligadb.de/>, footer, verbatim (German):
> "Die über diese API bereitgestellten Daten stehen unter der Open Database License (ODbL)."
> *("The data provided via this API is under the Open Database License (ODbL).")*

Linked to `https://opendatacommons.org/licenses/odbl/1-0/`. **ODbL-1.0 is share-alike on the database**, which is a materially different obligation from CC-BY: if we build a derived database and publicly distribute it, the derived database must be offered under ODbL. For internal modeling and for publishing *derived signals* (not the database) the analysis is friendlier, but this needs the same legal review our registry already flags for the CC-BY-SA `ffverse-ffopportunity` entry (registry lines 308-331). Also note the data-quality reality, verbatim from their docs (<https://raw.githubusercontent.com/OpenLigaDB/OpenLigaDB-Samples/master/README.md>):
> "Anders ist es bei den Spielergebnissen, diese können von JEDEM angemeldeten User editiert werden."
> *("It is different for match results — these can be edited by ANY logged-in user.")*

**A crowd-editable score source.** Given `docs/ops/SCORE_INTEGRITY_2026-09-08.md` (25 of 169 FINAL rows contradicted by their own upstream feed, MLS worst at 29%), ingesting a wiki-style score feed as a settlement input would be actively harmful. OpenLigaDB is a fixtures/schedule source at best, never a settlement source.

### 2c. The maintenance limit — `nfl_data_py` is dead

<https://github.com/nflverse/nfl_data_py>, read 2026-09-08. Verbatim deprecation banner:
> "nfl_data_py has been deprecated in favour of nflreadpy. All future development will occur in nflreadpy and users are encouraged to switch immediately."

**The repository is archived and read-only as of 2025-09-25.** Anyone specifying `nfl_data_py` in a 2026 build is specifying an archived package. The live target is `nflverse/nflreadpy` (MIT, per its `pyproject.toml`). This matters because the task brief named `nfl_data_py` — the brief is one generation behind, and that is worth saying out loud rather than quietly substituting.

### 2d. Rate limits — the operational boundary

| Source | Documented limit | Evidence |
|---|---|---|
| Baseball Savant | "Baseball savant limits queries to 30000 rows each. For this reason, if your request is for a period of greater than 5 days, it will be broken into two or more smaller requests." | `pybaseball/docs/statcast.md`, verbatim |
| Statcast volume | "Each season has 700,000+ pitches, and is subject to update. You should code accordingly." | pybaseball docs |
| NBA.com via `nba_api` | **No documented rate limit.** README offers "Proxy Support, Custom Headers, and Timeout Settings" and "Static Data Sets — Reduce HTTP requests" | `nba_api` README |
| Baseball Reference / FanGraphs via pybaseball | **NOT CONFIRMED** — no rate-limit statement found in the README I read. A 429-specific search returned no authoritative source. |
| ESPN JSON hosts | **NOT CONFIRMED** — no published limit; robots.txt returns 403 on the API host |

Two notes. First: `nba_api` shipping **proxy support** as a headline feature, against a ToU that forbids scraping, is precisely the shape our own rule calls out — `.claude/rules/scraping.md`, "Do not build evasion": *"No proxy rotation to circumvent IP blocks or access controls."* We can depend on a library that has a proxy parameter; we cannot use that parameter for that purpose, and we should not adopt a library whose primary operational advice is rotation. Second: pybaseball's "automatic chunking" of >5-day Savant queries is *by construction* bulk access, which is the exact word the MLBAM notice prohibits.

---

## 3. WHAT THEY CLAIM ABOUT ACCURACY — and what they prove

**Nothing, and nothing. Uniformly, across every project in this dossier.**

This is not a gotcha; it is a category fact worth stating precisely, because it is the same finding as `_propfinder-teardown-final.md` (PF Rating formula reconstructible, no calibration published) arriving from the opposite direction.

- **`pydfs-lineup-optimizer`**: makes no accuracy claim at all. It is honest by construction — an MILP returns *the* optimum of the objective you hand it. Its accuracy is entirely your projections' accuracy, and it says so by saying nothing. Correct behavior.
- **`chanzer0/NFL-DFS-Tools`**: publishes a genuinely detailed **method** (seven distribution families, Iman–Conover, heavy-tail guardrail) and **zero validation**. No backtest, no realized ROI, no reliability diagram, no statement that the fitted marginals were checked out-of-sample, no coverage denominator. The `distribution_data/fp_distributions_<site>.csv` and `fp_correlations_<site>.yaml` files are shipped as fixed artifacts with no stated fit window, no refit cadence, and no documented refit procedure — so a user in 2026 is sampling from correlations fitted at some unstated past date. That is a silent staleness risk with no surface that would reveal it.
- **nflverse / pybaseball / nba_api / MLB-StatsAPI**: these are transport layers. They correctly claim nothing about prediction because they predict nothing. Worth noting nflverse *does* ship documented automation-status tables (<https://nflreadr.nflverse.com/articles/nflverse_data_schedule.html>) — a freshness surface, not an accuracy surface, but it is more operational honesty than most commercial products manage.
- **`ffanalytics`**: aggregates other people's projections. Whether the *aggregate* beats its inputs is the entire question, and I found no published answer. **NOT CONFIRMED either way.**

**The precise statement:** the open stack claims method and does not claim results. That is more honest than the commercial tier (which claims results and hides method) — but it means **there is no published, independently-recomputable calibration or ROI number anywhere in the open sports stack.** The bar is on the floor. Clearing it is not hard; it is just something nobody has bothered to do.

---

## 4. WHAT A CUSTOMER WOULD SAY IS MISSING OR WRONG

Honest scoping note: I did not find a rich vein of user complaints for these projects — GitHub issue pages were not reachable via the API in this session (403) and I did not scrape issue HTML. What follows is drawn from **artifacts in the repos themselves and from the projects' own documentation**, which is weaker evidence than a user quote and is labeled as such. Where I have no evidence I say so.

1. **"I have to bring my own projections, and that's the whole game."** Structural, evidenced directly: `NFL-DFS-Tools` requires `Fpts`, `StdDev`, and `Own%` as input columns; `pydfs-lineup-optimizer` requires `fppg` per player. **Neither tool produces the number that determines whether it works.** The open stack automates the easy half (combinatorics) and leaves the hard half (forecasting) to the user. That is the single largest gap in the category and it is not a complaint anyone had to file — it is visible in the config schema.
2. **"`StdDev` — where do I get that?"** Same file, same line. The simulator needs a per-player variance and offers only crude fallbacks (`default_qb_var: 0.4`, `default_skillpos_var: 0.5`, `default_def_var: 0.5`). A user without a variance model is effectively running the sim on three global constants, which quietly destroys the tail behavior the seven fitted families were chosen to capture.
3. **"It's archived."** `nfl_data_py`, read-only since 2025-09-25, still the most-cited NFL Python package in every tutorial written before that date. A builder following any 2024–2025 guide installs a dead package. Evidenced by the deprecation banner, quoted in §2c.
4. **"Setup is a Python-and-CSV chore."** `NFL-DFS-Tools`' documented flow: install `uv`, clone, manually export contest data from DK/FD, rename it to `player_ids.csv`, drop it in `dk_data/`, hand-author `config.json` from `sample.config.json`, then remember that `output/` is **overwritten on every run** — verbatim: *"Subsequent runs overwrite previous output files, so rename/move files you want to keep."* No run history, no versioning, no record of what was simulated when. **Nothing in this stack keeps a ledger.**
5. **"Is any of this legal for what I'm doing?"** Not one of these READMEs distinguishes hobby from commercial use except `MLB-StatsAPI` and `nba_api`, both of which do it by linking to a terms page rather than summarizing it. A builder who reads only the MIT badge concludes, wrongly, that they are clear. **NOT CONFIRMED as a voiced user complaint** — this is my read of the documentation, not a quote.
6. **`pydfs` pinned to `PuLP==2.4`.** A hard equality pin on a 2021 dependency will eventually collide with any other package in the same environment that wants a newer PuLP. Evidenced from `setup.py`; I found no issue thread about it.

---

## 5. THE SEAM — what GSE can do that this stack cannot or will not

The open stack is a supply chain with four holes. Each is a seam.

**Seam 1 — Provenance the packages structurally cannot carry.**
`pybaseball` will hand you a Statcast dataframe with no field telling you it came from a source whose own terms say "individual, non-commercial, non-bulk." `nba_api` will hand you a stats payload with no field telling you the NBA ToU specifically prohibits products "featur[ing] a database of comprehensive, regularly updated statistics." **These libraries are rights-blind by design — a dataframe has no column for a license.** GSE already has the structure they lack: `wrapExtractedRecord()` and a point-in-time `RightsSnapshot` on every extracted record (`.claude/rules/scraping.md`). Nobody in the open stack has this and nobody will build it, because a research library has no reason to. We can state, per number on the board, which rights basis it stands on. That is not a feature they lack — it is a feature the shape of their artifact cannot hold.

**Seam 2 — Published calibration, which the whole category leaves empty.**
§3: not one project publishes a reliability diagram, an out-of-sample ROI, a coverage denominator, or any recomputable result. `NFL-DFS-Tools` publishes an elegant method with no validation and ships fixed correlation files with no stated fit window. Per `_HANDOFF-to-coding-agent.md`, the Glass Ledger + open `recompute.ts` is precisely the artifact that would make GSE the only party in this space — open or commercial — whose numbers a stranger can re-derive. **The competitive fact is that the bar is unoccupied, not that it is high.**

**Seam 3 — Ownership and variance, the two inputs everyone requires and nobody supplies.**
Every open simulator takes `Own%` and `StdDev` as *given*. The only public ownership approach found (`jmoore87jr`) proxies ownership by site-weighted optimizer exposure, which is a circular assumption about the field. Nobody projects ownership from first principles in public. Nobody publishes a per-player variance model. **These are the two columns that decide whether a sim is worth running, and they are the two columns the open stack marks "required — user supplies."**

**Seam 4 — A settlement ledger, which no research library has any reason to build.**
`output/` is overwritten every run (§4.4). There is no notion of a pick committed before kickoff, no hash chain, no CLV, no re-settlement path. GSE has a settlement outbox, an RCA-coded void lane, and a "no pick ever sits" policy — and, critically, has just caught its own settled record being wrong (`docs/ops/SCORE_INTEGRITY_2026-09-08.md`) *because* it has a ledger to check against the feed. **The stack has no mechanism by which such an error could ever be discovered.** That is the seam stated most sharply: we can be wrong in public and fix it; they cannot be wrong, because they never wrote anything down.

**The inverse seam — where they beat us, and it is not close.**
`NFL-DFS-Tools` has a correlated Monte-Carlo contest simulator with a copula, seven fitted marginal families, a heavy-tail guardrail, contest-payout-driven ROI, and it is free. GSE has a deterministic factor model with a confidence score. **On DFS contest simulation specifically we have nothing comparable, and a serious builder would use their tool over ours today.** The honest read is that the open stack's *simulation* is ahead of ours and its *epistemics, rights posture, and record-keeping* are absent. Those are complements, not substitutes — which is why the build items below are about acquiring the first without importing the second.

---

## 6. CONCRETE BUILD ITEMS

Ordered by leverage. Every one is a registry or a package entry point; none flips a gate or publishes a claim.

### B-1. Add the missing sources to the rights registry — fail-closed, before any code touches them
**Entry point:** `apps/web/lib/scraping/source-rights-registry.ts` (currently 14 entries; the ones below are all absent).
**Effort:** S (one file, one test).

| Proposed `source_id` | Proposed status | Basis (all quoted in §2b) |
|---|---|---|
| `mlb-statsapi` | `permission_required` | MLBAM notice: "individual, non-commercial, non-bulk" |
| `baseball-savant-statcast` | `permission_required` | MLB ToU: no automated scripts, private non-commercial only |
| `nba-com-stats` | `permission_required` | NBA ToU: no product featuring a comprehensive stats database |
| `retrosheet` | `approved_open_license` | Explicit commercial permission + mandated attribution string |
| `chadwick-register` | `approved_open_license` | ODC-BY-1.0, attribution, no share-alike |
| `openligadb` | `approved_open_license` **with a share-alike carve-out** | ODbL-1.0; mirror the `ffverse-ffopportunity` CC-BY-SA treatment (registry:308-331). **Fixtures only — never a settlement source (crowd-editable results).** |

**Why it matters:** three of these are hard prohibitions that our fail-closed engine currently cannot enforce because it has never heard of them. A future agent reaching for `pybaseball` because "it's MIT" hits nothing. The registry is the only place that stops that, and right now it is silent.

### B-2. Write down the ESPN terms conflict as a founder decision — do not resolve it
**Entry point:** a new `docs/ops/` note + the `notes` field on `espn-public-api` (registry:231-246).
**Effort:** S.
Record verbatim: the Disney ToU "robot, spider, script … data mining or web scraping" and "any commercial or business-related use" clauses; the `User-agent: anthropic-ai / Disallow: /` line in `www.espn.com/robots.txt`; **and** the honest counterweight that `site.api.espn.com` serves no robots.txt (403) so no robots directive governs the JSON host. ESPN is designated Book 1 of the two-book board. **No agent flips this status.** Law 3 and law 4 both point the same way: write down what the terms say, name it a founder + counsel call, change nothing.

### B-3. Migrate any `nfl_data_py` reference to `nflreadpy`
**Entry point:** `packages/data-ingestion/`, `packages/feature-store/`; grep for `nfl_data_py`.
**Effort:** S.
Archived read-only since 2025-09-25 per its own banner. `nflreadpy` is MIT and is where development moved. Carry the CC-BY-4.0 attribution string the registry already holds (`"Data from nflverse (https://github.com/nflverse), CC-BY-4.0"`, registry:126), and preserve the existing `pfr-advstats-via-nflverse` = `permission_required` carve-out — that carve-out is correct and must not be lost in the migration.

### B-4. Build the ownership + variance layer nobody supplies
**Entry point:** `packages/feature-store/` (derived features) → `packages/prediction-engine/`.
**Effort:** L.
Every open simulator declares `Own%` and `StdDev` **required inputs** and supplies neither. Producing them is the actual moat in DFS, and it is a modeling problem we are already shaped for. Sequencing note: this is a *fantasy-side* build and must not touch `MODEL_VERSION` on the betting engine (frozen by `scripts/guardrails/model-freeze.mjs`).

### B-5. If a contest simulator is built, build it from the published method — not the code
**Entry point:** new package, e.g. `packages/contest-sim/`.
**Effort:** L.
`chanzer0/NFL-DFS-Tools` has **no LICENSE file** = all rights reserved. The *techniques* are public prior art (Iman & Conover 1982 rank-reordering; Gaussian copulas; gamma/lognormal/Weibull/skew-normal/ex-Gaussian/generalized-gamma marginals) and the README describing them is published. **Reimplement from the method statement and the academic sources; do not fork, vendor, or copy.** Two things to do better than they do, both cheap: (a) record the fit window and refit cadence for every marginal and correlation artifact, so staleness is visible rather than silent; (b) hold the simulator to the same substantiation bar as the picks board — no ROI or win-rate rendered without coverage denominator and confidence bound.

### B-6. Adopt `pydfs-lineup-optimizer` for the optimizer half — it is genuinely clean
**Entry point:** the fantasy suite behind the `/fantasy` age gate.
**Effort:** M.
MIT, 13 leagues × 8 site modes, a mature constraint vocabulary (26 rule classes incl. `ProjectedOwnershipRule`, `MinExposureRule`, `TeamsExposureRule`, `LateSwapRule`, `RosterSpacingRule`). Two notes for the record: the `LICENSE` file's copyright line is a paste artifact naming Kevin B. Knapp while `setup.py` says Dima Kudosh (grant is MIT regardless); and the `PuLP==2.4` hard pin pulls a bundled CBC binary under EPL-2.0 — **server-side use does not trigger EPL distribution obligations, but that is my read and not counsel's; flag it, do not conclude it.**

### B-7. Ship the recomputable calibration surface — the empty bar
**Entry point:** the Glass Ledger + open `recompute.ts` already specified in `_HANDOFF-to-coding-agent.md` §PHASE 2.
**Effort:** L (already planned; this dossier is supporting evidence, not a new proposal).
§3 establishes it as a category fact: **no project in the open sports stack publishes a recomputable calibration or ROI figure.** Neither, per `_propfinder-teardown-final.md`, does the commercial tier. Standing evidence for why this is the wedge — noting, per `AGENTS.md` 2026-09-08, that the current settled record is itself under investigation and nothing here argues for publishing anything before that is resolved.

---

## 7. WHAT I COULD NOT CONFIRM

- Licenses for `chanzer0/MLB-DFS-Tools`, `NBA-DFS-Tools`, `PGA-DFS-Tools` (surfaced by search; individual LICENSE files not fetched).
- License and method detail for `jmoore87jr/DFS_ownership_projections` (search summary only; repo not fetched).
- Any documented rate limit for Baseball Reference or FanGraphs via `pybaseball`, and any for the ESPN JSON hosts.
- Whether `ffanalytics`' aggregate outperforms its constituent projection sources — no published evaluation found.
- Real user complaint threads: GitHub's API returned 403 for every repo in this session and I did not scrape issue HTML. §4 is drawn from repo artifacts and documentation, not from user quotes, and is labeled accordingly.
- Whether EPL-2.0 obligations from PuLP's bundled CBC binary are truly inert for server-side-only use. My reading says yes; this is not a legal opinion.
- Whether the ODbL share-alike obligation attaches to GSE's *derived signals* as opposed to a redistributed database. Same review our registry already flags open for the CC-BY-SA `ffverse-ffopportunity` entry.

---

## 8. SOURCES

- <https://raw.githubusercontent.com/DimaKudosh/pydfs-lineup-optimizer/master/LICENSE>, `/setup.py`, `/docs/index.rst`, `/pydfs_lineup_optimizer/rules.py`, `/pydfs_lineup_optimizer/solvers/pulp_solver.py`
- <https://raw.githubusercontent.com/chanzer0/NFL-DFS-Tools/main/README.md> · <https://github.com/chanzer0/NFL-DFS-Tools> (49 stars, no license) · `/main/LICENSE` → 404
- <https://github.com/nflverse/nfl_data_py> (deprecation banner; archived 2025-09-25) · <https://raw.githubusercontent.com/nflverse/nfl_data_py/main/LICENSE>
- <https://raw.githubusercontent.com/nflverse/nflreadpy/main/pyproject.toml> · `/main/README.md` (CC-BY-4.0 / FTN CC-BY-SA-4.0 statement)
- <https://raw.githubusercontent.com/nflverse/nflreadr/main/DESCRIPTION> · `/main/README.md` ("Terms of Use" section)
- <https://raw.githubusercontent.com/nflverse/nflfastR/master/DESCRIPTION>
- <https://raw.githubusercontent.com/nflverse/nflverse-data/master/LICENSE.md> (CC-BY-4.0) · `/master/README.md`
- <https://nflreadr.nflverse.com/articles/nflverse_data_schedule.html>
- <https://raw.githubusercontent.com/swar/nba_api/master/LICENSE> · `/master/README.md` · <https://www.nba.com/termsofuse>
- <https://raw.githubusercontent.com/jldbc/pybaseball/master/LICENSE> · `/master/README.md` · `/master/docs/statcast.md` · <https://github.com/jldbc/pybaseball>
- <https://raw.githubusercontent.com/toddrob99/MLB-StatsAPI/master/LICENSE> (GPL-3.0) · `/master/README.md`
- <https://statsapi.mlb.com/api/v1/teams?sportId=1> (embedded copyright field) · <http://gdx.mlb.com/components/copyright.txt> · <https://www.mlb.com/official-information/terms-of-use>
- <https://www.retrosheet.org/notice.txt>
- <https://raw.githubusercontent.com/chadwickbureau/register/master/README.md> (ODC-BY-1.0)
- <https://www.openligadb.de/> (ODbL footer) · <https://raw.githubusercontent.com/OpenLigaDB/OpenLigaDB-Samples/master/README.md> · <https://opendatacommons.org/licenses/odbl/1-0/>
- <https://www.espn.com/robots.txt> · <https://site.api.espn.com/robots.txt> (HTTP 403) · <https://disneytermsofuse.com/english/>
- <https://raw.githubusercontent.com/FantasyFootballAnalytics/ffanalytics/master/DESCRIPTION>
- <https://github.com/jmoore87jr/DFS_ownership_projections> (via search summary only)
- Internal: `/home/user/Sports/.claude/rules/scraping.md` · `/home/user/Sports/apps/web/lib/scraping/source-rights-registry.ts` · `/home/user/Sports/AGENTS.md` · `_HANDOFF-to-coding-agent.md` · `_propfinder-teardown-final.md`
