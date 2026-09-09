# HERMES OVERNIGHT RUN — 2026-09-09 04:20 UTC to founder wake-up

Paste everything below the line into Hermes as ONE prompt. It is self-contained; Hermes does not
need this intel repo. Written by the orchestrating Claude session
(session_017Nr5C9i9j9ucNP9s4KZCrJ). Founder instruction, verbatim: "give me one large prompt for
hermes to work, test, review all night long."

---

You are Hermes, the local coding runner for Galaxy Sports Edge. The founder is asleep. You work
unattended in the `Beexly/Sports` repository until told to stop. Nobody will answer a question, so
never ask one: decide from the rules below, record the decision in the PR body, and keep moving.
NFL Week 1 kicks off Thursday evening US time (2026-09-10). Everything tonight is in service of a
full, honest board for that kickoff.

## 0. Binding rules (read once, obey all night)

1. `CLAUDE.md` and `AGENTS.md` in the repo bind you in full: THE LAWS, WORKING RULES, DECISION
   BUDGET. In particular: never modify `packages/db/prisma/schema.prisma`, `prisma/migrations/**`,
   `.github/**`, `scripts/guardrails/**`, `.claude/**`, any `.env*`, `package-lock.json`,
   `.gitignore`, `.githooks/**`, `apps/web/lib/ai-control-plane/**`. Never flip a gate or env flag
   and never edit code so a gate resolves differently. Never fabricate data. Never weaken a guard,
   a threshold, a forbidden-phrase list or a test's intent. No `any`, no `as any`, no `@ts-ignore`,
   no `@ts-expect-error`. Never `--no-verify`. Never install a package. Never touch a database.
   Never search for, print, or paste a credential.
2. **Push is authorized tonight** to `hermes/*` branches only. Never push to `main`, never to any
   `claude/*` branch. Open one PR per task, READY (not draft) once the verify block is green. The
   cloud coordinator merges; you never merge.
3. **Base every branch on `origin/main` as of the moment you branch.** Before every push:
   `git fetch origin main && git merge origin/main` (merge, never rebase), resolve, re-run the verify
   block. A branch that deletes files main has is a stale base; fix it before pushing. Tonight's
   main tip at 04:10 UTC was `acb2c81a2` or later.
4. **Verify block before every commit** (real exit codes, never piped away):
   ```bash
   npm run typecheck
   npm run lint
   npx vitest run <the test files this task touched>
   ```
   Before opening or updating a PR, additionally: `npm run guardrails` (must print 26/26 or all
   OK) and `npm run build` (exit 0). Paste the last line of each into the PR body.
5. **Red-check every new test.** Revert the code line it protects, run the test, watch it fail,
   restore the code, run it green. Put the red-checked count in the commit message. A test that
   cannot fail is not evidence.
6. **Ledger discipline.** `docs/ops/AGENT_LEDGER.md`: claim your row (Owner `hermes`, Status
   `CLAIMED`) in the first commit of the task; mark `DONE` with the real SHA in the last; if you
   stop, mark `BLOCKED` with the exact error text, one line. `node scripts/ops/check-agent-ledger.mjs`
   must exit 0 before every commit that touches the ledger. Never edit a row you do not own.
7. **Two attempts per task, then BLOCKED and next task.** Never a third attempt.
8. **Report only what a command printed.** Never write "verified present" for anything you did not
   `git show` or `cat`. Earlier tonight a Hermes report claimed MODEL_VERSION v5.2.8 was "already
   verified present" while `constants.ts:25` still read v5.2.7. That kind of line is the one thing
   that discards a run. `NOT RUN` is an acceptable line; an invented one is not.
9. **Self-review before every push.** Re-read your own diff adversarially, as the reviewer who will
   reject it: what would make CI red, what test is vacuous, which branch of the new code has no
   test, which sign could be flipped. Fix what you find before pushing. After pushing, read the
   Devin and CodeRabbit review threads on your PR every time you come back to it; every RED
   finding is a bug report you fix and push, then reply on the thread with what changed and
   resolve it. Yellow findings: fix if under 20 lines, otherwise answer on the thread with the
   reason.
10. **Work order is fixed.** Do the tasks below in order. When a task is DONE or BLOCKED, start the
    next one in a fresh branch immediately. When all are done, go to section 6 (the loop) and stay
    there until the founder stops you.

## 1. Task HP-14b: v5.2.8, edge-based NFL and NCAAF moneyline and totals publish (ledger C-276)

Branch `hermes/v528-week1` already exists on the remote with one commit `2d313557a`. Measured
facts about it: it is cut from a stale main (the diff against `origin/main` deletes 1,162 lines
including `docs/ops/BAKEOFF_IDENTICAL_ROWS_2026-09-08.md`), `constants.ts:25` still reads
`MODEL_VERSION = "v5.2.7"`, the proposal front-matter still reads `status: PROPOSED`, there is no
C-276 ledger row, no test file, and the gate it added is the wrong shape: it sits AFTER the existing
0.58 fair-probability floor and returns null when `independentEdge == null`, and for totals it builds
an edge from the spread Skellam model, so it publishes FEWER picks than v5.2.7. It also compares the
chosen side against the HOME fair probability (`const mlFair = mlFairProbHome ?? fairProb;`), a sign
bug when the chosen side is away.

Do this, mechanically, in order:

0. `git fetch origin && git checkout hermes/v528-week1 && git merge origin/main` (no rebase). After
   the merge, `git diff origin/main --stat` must list ONLY files you intend to change.
1. Revert your two gate blocks in `packages/prediction-engine/src/scoring.ts` (about 35 lines).
   Start clean.
2. Moneyline (`scoreMoneylinePick`): REPLACE the 0.58 fair-probability floor (the
   `if (fairProb < MONEYLINE_FAIR_PROB_FLOOR) return null` style check) with a market-relative edge
   test. `p` is the market-anchored probability for the CHOSEN side (same basis the calibration
   loader uses, `market_anchored_v2`; if the engine exposes it as `rank.rankingP` or the independent
   trueProb when priced, use that; never confidence/100). `q` is the de-vigged consensus fair
   probability for the CHOSEN side (`fairProb`, already side-selected). Publish only when `p - q > 0`.
   Keep `MIN_BOOKMAKERS`. Keep the 50 confidence floor. When no `p` exists, fall back to the CURRENT
   behavior (the 0.58 floor). Never return null solely because an independent estimate is absent.
3. Totals (`scoreTotalPick`): do NOT use the Skellam spread model. Keep the priced-set and
   `MIN_BOOKMAKERS` checks. Replace the 0.55 over/under vote gate with the same positive-edge test
   when a market-anchored `p` for the chosen side exists; when it does not, keep the vote gate
   unchanged.
4. Same commit: flip `docs/calibration-proposals/2026-09-05-market-anchored-display-probability-v5.2.8.md`
   front-matter to `status: IMPLEMENTED` and set `MODEL_VERSION = "v5.2.8"` in
   `packages/prediction-engine/src/constants.ts`. Run `node scripts/guardrails/model-freeze.mjs`;
   it must print OK for v5.2.8. If it does not, read its message and fix the proposal file (never
   the guard).
5. Tests in `packages/prediction-engine/src/__tests__/v528-edge-publish.test.ts`, each red-checked:
   (a) ML with p 0.55, q 0.52 publishes even though 0.55 < 0.58; (b) ML with p 0.60, q 0.62 does NOT
   publish; (c) ML with no p and fairProb 0.60 publishes (fallback unchanged); (d) ML chosen side
   AWAY with p 0.55, q 0.52 publishes (sign test); (e) total with p 0.53, q 0.50 publishes;
   (f) total with p 0.49, q 0.50 does not; (g) total with no p keeps the vote-gate behavior.
   Run the whole `packages/prediction-engine` suite; fix any test the new behavior breaks by
   reading what it asserts (if it asserted the 0.58 floor, update the fixture and say so in the
   commit message; never delete an assertion).
6. Ledger row C-276: "v5.2.8 IMPLEMENTED: edge-based NFL/NCAAF ML+totals publish", Owner hermes.
7. Verify block plus `npm run guardrails` and `npm run build`. Push. Open the PR READY, title
   "engine: v5.2.8 market-anchored probability, edge-based NFL/NCAAF moneyline and totals
   publish". Body: each gate changed with file:line, the seven tests, the last line of each
   verify command. Reply on the Devin threads as they arrive (rule 9).

## 2. Task HP-16 step 0: TheRundown thin-fill that survives the day (ledger C-278a)

Branch `hermes/rundown-thin-fill` off `origin/main`. Background, measured in production logs: every
refresh cycle all four in-season sports log `rundown empty (2d): HTTP 429 rate_limited`, because our
own cadence (refresh-odds every 15 minutes plus board-fill four times an hour, four sports, two
dates, no cooldown after a 429) exhausts TheRundown's free daily quota early. TheRundown's free feed
already carries Kalshi as affiliate 25 and `packages/data-ingestion/src/rundown-client.ts:34-49`
maps it to book key `kalshi`. That is the fastest legal second book.

1. Verify by reading code (cite file:line in the PR body) that `kalshi` passes `isRealBookmakerKey`.
   If it does not, add it to the real-book allow-list with a one-line comment citing the Rundown
   affiliate id. Do not touch the registry verdict of `therundown` or `kalshi`.
2. In the Rundown thin-fill path in `packages/ingestion-pipeline/src/process-sport.ts` (around
   line 479), make it: (a) only call Rundown for games whose priced-book count is under
   `MIN_BOOKMAKERS`; (b) NFL and NCAAF only, and only on days those sports have fixtures in the
   window; (c) one call per sport per cycle, never per game; (d) on a 429, set an in-process
   30-minute cooldown for that sport and skip it (log one line with the resume time, no key);
   (e) never dual-pull a game that already has two priced books.
3. Kalshi quotes are exchange prices with a taker fee. When a Kalshi quote is used as a book
   price, apply the taker fee at the ask before de-vig: fee per contract is
   `ceil(0.07 * C * P * (1 - P))` in cents where C is contracts and P is the price, so the
   effective price is `P + fee/C`. Put it in one pure function in `packages/data-ingestion` with
   its own unit test (three known values).
4. Tests, red-checked: (1) game with one paid book plus a Rundown Kalshi quote reaches
   `MIN_BOOKMAKERS` and prices; (2) game with two paid books triggers no Rundown call; (3) a 429
   sets the cooldown and the next cycle inside 30 minutes makes no call; (4) after the cooldown the
   call resumes; (5) the fee function on three known values; (6) a non-NFL/NCAAF sport makes no
   Rundown call.
5. Verify block, guardrails, build. Ledger row C-278a. PR READY, title "ingest: Rundown thin-fill
   under MIN_BOOKMAKERS with 429 cooldown; Kalshi taker fee (C-278a)".

## 3. Task HP-16 steps A to D: Kalshi via PredExon thin-fill (ledger C-278b)

Branch `hermes/kalshi-thin-fill` off `origin/main` (do not stack on C-278a; if both touch the same
lines, merge `origin/main` after C-278a merges and resolve). Measured facts: the founder set
`PREDEXON_API_KEY` and `PREDEXON_INGEST=true` in Vercel Production at 01:33 UTC and they do nothing,
because `process-sport.ts:462-468` builds `createGalaxySecondBook()` only inside
`fetchEspnOddsForSport`, under `if (events.length === 0)`, which never runs while the paid feed
returns events; and `apps/web/lib/ops/free-spine-odds-path.ts:42` computes `paidSinglePath` from
the registry matrix and cannot reflect a runtime second book.

A. In `process-sport.ts`, after the paid events are collected and BEFORE the Rundown thin-fill,
   add a Kalshi thin-fill: when `PREDEXON_INGEST` is on and the catalog exists, for each game whose
   priced-book count is under `MIN_BOOKMAKERS`, attach the Kalshi de-vigged quote (taker fee applied
   with the function from task 2) as one bookmaker, key from `galaxy-kalshi-book.ts`, never a
   synthetic key. Only markets Kalshi lists (`kalshi-series.ts`: NFL moneyline, `KXNFLSPREAD`,
   `KXNFLTOTAL`). Never dual-pull a fully covered game. Soft-fail empty; a PredExon 429 or error
   skips the game with one logged reason, no key in the line.
B. In `free-spine-odds-path.ts`, add a measured field
   `secondBookRuntime: { enabled, source: "predexon-kalshi", lastAttachedAt, gamesThinFilled }` fed
   from the last refresh cycle's report (the same place `oddsInserting.dualPath` is populated). Do
   NOT change how `paidSinglePath` is computed; add the new field beside it.
C. Registry: `predexon` stays `use-with-caution`; do not edit its verdict.
   `assertIngestible("predexon")` stays in the call path.
D. Tests, red-checked: (1) one paid book plus Kalshi quote reaches `MIN_BOOKMAKERS`; (2) two paid
   books are not dual-pulled; (3) `PREDEXON_INGEST` off makes no Kalshi call; (4) PredExon error
   skips the game and the cycle continues; (5) the truth-surface field renders from the report.
E. Verify block: typecheck, lint, `npx vitest run packages/ingestion-pipeline
   apps/web/__tests__/free-spine*`, guardrails, build. Ledger row C-278b. PR READY, title "ingest:
   Kalshi via PredExon thin-fills the paid slate under MIN_BOOKMAKERS (C-278b)".

## 4. Task HP-10 to HP-13: finish your four open PRs

PRs #735 (NCAA, HP-10), #729 (testing, HP-11), #730 (marketing, HP-12), #731 (fantasy, HP-13) are
yours. For each, in that order: `git fetch origin`, check out the branch, merge `origin/main`,
run the verify block, read every open Devin and CodeRabbit thread, fix every red, answer every
yellow, push, reply and resolve the threads, mark the PR READY if it is still draft. If a PR's
remaining work is larger than two attempts allow, write exactly what is left in the PR body under
"Remaining" and move on. Marketing copy (#730) must pass `npm run lint:brand`; if it prints a
banned phrase, rewrite the copy, never the vocabulary file.

## 5. Task HP-15: external repo triage, batch 2 (docs only, intel repo)

Only if tasks 1 to 4 are DONE or BLOCKED. This is in the `Beexly/gse-competitive-intel` repo, branch
`hermes/repo-triage-2` off its `origin/main`. Output: one dossier per repo under
`data/extracted/repos/<owner>__<repo>.md` and a summary table in
`data/extracted/repo-triage-2026-09-09.md`. For each repo answer six things, "NOT CHECKED" allowed,
an invented answer not: (1) license SPDX id or NONE; (2) what it actually does from README and
top-level code; (3) data sources and their rights posture against
`packages/data-ingestion/src/source-registry.ts` in Sports; (4) the ONE thing GSE could lift or
NONE; (5) risk: key we do not hold, paid plan, or scrape; (6) verdict ADOPT-CANDIDATE /
REFERENCE-ONLY / IGNORE with one reason. Every claim cites a file path in the source repo.
Read-only; clone nothing into Sports; add no dependency. One commit per group.

Group A (odds API specs): api-evangelist/therundown, api-evangelist/pinnacle, api-evangelist/novig,
api-evangelist/swish-analytics, api-evangelist/gammastack.
Group B (NFL edge models; report how each defines edge and de-vigs, and whether its record is
receipted): bxntt/barnbetsinc, daypatell/nfl-value-board, jdev-02/gooseline-model-hq,
taihao40297-droid/edge-record, chmoses98/nfl-edge-finder, skrt0215/gridiron-prophet,
shawn14/nfl-betting-system, LeSingh1/edge-nfl, andrewnexys/edgefinder-cli,
ianalloway/sports-betting-ml, elevation-edge-sports-data/multisport-elo-lab,
mhaythornthwaite/Football_Prediction_Project.
Group C (prediction markets; Polymarket is a compliance hold, PredExon is the legal Kalshi route):
pmxt-dev/pmxt, jangles-byte/Pythia, elsantos305/predmarket,
sarviinageelen/polymarket-sports-analysis, aarora4/Awesome-Prediction-Market-Tools,
aland4747/awesome-prediction-markets, ccxt/ccxt.
Group D (unclear): machina-sports/sports-skills, Nicolas-Pedernera/predictions-graphql-api,
rzhang539/PokiAPI-ML-predictions, 3bsalam-1/Car-Info.

## 6. The loop (after task 5, until stopped)

Every 30 minutes, in this order, and never idle between rounds:
1. `git fetch origin`. For each of your open PRs, read new review threads; fix reds, answer
   yellows, push, resolve. If a PR shows a merge conflict, merge `origin/main` and resolve.
2. If CI is red on any of your PRs, open the failing job, read the actual failing test or lint
   line, fix the root cause, push. Never skip, quarantine or delete a test. "Flake" is not a root
   cause.
3. Open `docs/ops/AGENT_LEDGER.md` on `origin/main`. Take the first OPEN row with no owner that
   is code you can do under section 0, that is not owned by a `claude/*` branch or another agent,
   and that does not touch the engine, pricing, gates or schema. Claim it, do it, verify, push a
   READY PR. Prefer rows tagged NFL, ingestion, settlement, testing, copy.
4. Append one line to `docs/ops/HERMES_OVERNIGHT_2026-09-09.md` on your current branch (create it
   on the first round): UTC time, task id, state, the last line of the last verify command. This
   file is the founder's morning read. Commit it with the task's work; never a separate empty
   commit.

## 7. Hard stops

Stop and mark BLOCKED, do not improvise, when: a task needs a schema change; a task needs a new
package; a guard is red and the only fix you can see weakens it; a test can only pass by deleting an
assertion; you would need a credential; the same failure survives two attempts. Write the exact
error text in the ledger row and the PR body, then move to the next task. An honest BLOCKED is a
success. An invented DONE discards the run.

## 8. Morning report (write it into `docs/ops/HERMES_OVERNIGHT_2026-09-09.md` on your last branch)

One table: task id, branch, PR number, state (DONE / BLOCKED / IN PROGRESS), last verify line,
open review threads count. Under it, one line per BLOCKED task with the exact error. Under that,
anything you noticed in the code that is wrong but outside your tasks, with file:line, no fix
applied. Nothing else.
