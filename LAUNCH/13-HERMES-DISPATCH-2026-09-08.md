# 13 — HERMES DISPATCH (2026-09-08, 23:40 UTC) — code tasks for the local Hermes runner

Written by the orchestrating Claude session (session_017Nr5C9i9j9ucNP9s4KZCrJ) on the founder's
instruction: "give Hermes prompts to code hard while you organize." Each task below is a standalone
prompt. Copy one task at a time into Hermes. Every task is code in the **Sports** repo
(`Beexly/Sports`), not this intel repo.

## READ FIRST (binds every task)

- `CLAUDE.md` and `AGENTS.md` in the Sports repo bind you in full: THE LAWS, WORKING RULES,
  DECISION BUDGET. Never modify `packages/db/prisma/schema.prisma`, `prisma/migrations/**`,
  `.github/**`, `scripts/guardrails/**`, `.claude/**`, any `.env*`, `package-lock.json`,
  `.gitignore`, `.githooks/**`, `apps/web/lib/ai-control-plane/**`. Never flip a gate or env flag,
  never edit code so a gate resolves differently. Never fabricate data. Never weaken a guard or
  loosen a test. No `any`. MODEL_VERSION is frozen (`scripts/guardrails/model-freeze.mjs`).
- **Base every branch on `origin/main` (8cc0695 at 23:25 UTC), NOT on `hermes/night-shift-1`.**
  The runbook line "git pull --rebase origin hermes/night-shift-1" is stale: that branch is dated
  2026-08-29 and is 275+ commits behind main. `git fetch origin main && git checkout -b
  hermes/<task-slug> origin/main`.
- **Push is authorized tonight** to `hermes/<task-slug>` branches only; open ONE draft PR per
  task; never push to `main`, never to any `claude/launch-*` branch.
- One task = one commit, staged by name, message tagged `[hermes-<ledger-id>]`. Claim your row
  in `docs/ops/AGENT_LEDGER.md` (Owner=hermes, Status=CLAIMED) in the first commit; DONE with
  the real SHA at the end; `node scripts/ops/check-agent-ledger.mjs` must exit 0.
- Verify block before every commit: `npm run typecheck` (exit 0), `npm run lint` (exit 0),
  `npx vitest run <your test files>` green. Before the PR: `npm run guardrails` green (26/26)
  and `npm run build` exit 0. Red-check every new test (mutate the fix, watch it fail, restore)
  and put the count in the commit message.
- Two attempts per task, then mark BLOCKED with the exact error and move to the next task.
- **Write your deliverable early.** Twice on 2026-09-08 research children died at iteration caps
  before writing anything. Commit after every green sub-step; a commit that reached origin exists,
  everything else does not.
- Coordinate, never duplicate: cloud sessions own `claude/launch-line-integrity` (C-197 publish
  guard + void lane), `claude/launch-pr-steward` (PRs #722 #723 #724 #725), `claude/launch-gate-matrix`,
  `claude/launch-frontend-quality`. `git fetch origin` and read those branches before touching the
  same files; if a task below overlaps, take the part they have not done and say so in the PR body.
- Publication stays dark. No win rate, ROI, units or accuracy number in any public copy; the 4-leg
  substantiation guard is not to be routed around (LAUNCH/10 §6).

Report format at the end of every task: files changed; exact behavior changed; validation run;
validation result; remaining risk; next safest step; ledger rows touched; PR URL.

---

## HP-1 (P0, 20 minutes) — `/ai.txt` redirect bug + the three empty agent files

Ledger: open a new row, title "P0 /ai.txt redirect targets localhost; llms.txt, ai.txt, humans.txt are 0 bytes".

1. `apps/web/app/ai.txt/route.ts` builds `new URL("/llms.txt", request.url)`; on Vercel
   `request.url` can resolve to `localhost:3000`, so production returns `308 -> http://localhost:3000/llms.txt`
   (LAUNCH/11 T-MINUS item 2; LAUNCH/07 line 19). Fix: derive the absolute target from
   `apps/web/lib/seo/site-url.ts` (`SITE_URL`, the www host) — never hardcode the host string —
   or return the file body directly instead of redirecting. Test: a unit test that invokes the
   route handler with a request whose URL is `http://localhost:3000/ai.txt` and asserts the
   `Location` header (or body) is on `https://www.galaxysportsedge.com`.
2. `llms.txt`, `ai.txt`, `humans.txt` serve 0 bytes (LAUNCH/07 line 19). Populate them from
   `LAUNCH/06-LLMS-AGENT-SURFACE.md` in the intel repo, verbatim where it gives text; every
   URL derives from `SITE_URL`; run `npm run lint:brand` and the trust gate — no performance
   claim, no "AI-powered" phrasing (rule 8; `apps/web/lib/positioning-vocab.json`).
3. Acceptance after deploy (founder or browser agent runs): `curl -sI https://www.galaxysportsedge.com/ai.txt`
   shows a 200, or a `Location:` on https://www.galaxysportsedge.com; `curl -s .../llms.txt | wc -c` > 0.

## HP-2 (P0, 2 hours) — `entryOdds` write guard at pick-commit time

Ledger: open a new row, title "P0 entryOdds write guard: reject invalid American odds at commit".

Evidence: LAUNCH/10 §3 — 199 of 1,111 receipts carry `entryOdds` that are not valid American odds
(`|odds| < 100`), a field-population bug, not a line/odds swap; receipts are frozen by design and
must never be edited (LAUNCH/12 hard rules). Task: at the single pick-commit write site (find it:
grep for where `entryOdds` is set on a published pick / receipt payload), reject any value with
`-100 < odds < 100` (and non-finite values) fail-closed: the pick is published WITHOUT `entryOdds`
and flagged `NO_BOOK_PRICE` per the C-252 semantics, or not published at all if the path requires a
price — never with an invalid number. Root-cause the population bug (which provider or mapper
writes decimal or probability values into an American-odds field) and fix it at the source with a
unit test that reproduces the bad value. Expose on `/api/ops/public-surface-truth` (through
`jsonNoStore`) a count of published picks committed since deploy with invalid `entryOdds`,
labelled exactly for what it counts (this repo's recurring defect class is a mislabelled count:
C-241/C-246/C-250). Coordinate: `claude/launch-line-integrity` (C-197) guards the `line` field;
you guard `entryOdds`. Read that branch first; do not edit the same functions without saying so.

## HP-3 (P1, 1 hour) — sitemap regeneration and the age-gate/crawler decision, implemented honestly

Ledger: open a new row, title "Sitemap: dedupe 190→138, drop dead previews, news-sitemap honesty, gated routes noindex".

Founder-delegated decision (2026-09-08, via orchestrator): F-25 — the /fantasy 21+ gate STAYS on
every `/fantasy/*` route; gated routes become `noindex` and are removed from the sitemap; the
announcement copy must not promise search ranking for gated money pages. Task, per LAUNCH/11 T-60:
`apps/web/app/sitemap.ts` (or wherever the sitemap is generated) lists only public, indexable,
200-status routes (LAUNCH raw evidence: `raw/prod-launch-audit-2026-09-08/route_status_138.txt`
shows 122×200 / 13×307 age-gate / 3×404); deduplicate; drop the 3 dead previews; the news sitemap
is either populated from real published posts or un-declared in `robots.txt`; canonical tags and
`metadataBase` use `SITE_URL`. Tests that fail if a 307/404 route re-enters the sitemap.
Do NOT touch the age gate itself.

## HP-4 (P1, 3 hours) — operations hardening, ledger rows C-96, C-97, C-98, C-99

Read each row's full text first; they carry file:line pointers. Order: C-98 (alerting posture
booleans on the truth surface and cockpit — the founder skipped Slack/Sentry, so the booleans must
read false honestly), C-96 (Odds API remaining-request header on the truth surface and health
alert, agreeing with the existing `oddsInserting.dualPath.credits` block; skip the paid getScores
supplement for out-of-season sports), C-97 (durable rate limit on public-surface-truth and health
that never locks out the cron-secret path and returns its 429 through `jsonNoStore`; autonomy
observation from real loaders; `withErrorCapture` around checkout webhook and picks; executor
timeout budget; delete or test-fence the unreachable cron auth dual mode), C-99 (durable lease on
settle-picks, JarvisMemoryEvent pattern from `traffic-heartbeat.ts`, failing OPEN if the lease
store is unreachable; recency guard in `lib/autonomy/operating-kernel.ts`; `vercel.json` and its
root mirror stay identical, no schedule added or removed — the scheduler decision F-30 is the
founder's: Vercel cron is primary).

## HP-5 (P1, 2 hours) — security follow-ups C-102 and the OPS_READ_SECRET code half (F-32)

Read C-102's full row. Implement each SEC item's code half with tests. `lib/ops/ops-auth.ts`
accepts `OPS_READ_SECRET` for the read-only operator surfaces (settlement-rca and the others the
row names) so a leaked read credential cannot fire a cron; `CRON_SECRET` keeps working unchanged;
fail closed when neither matches; tests for all four combinations. Check first which of the
hermes/finish-line-2026-09-05 SEC commits (fe42773bd, 96ab46d27, dbb49850b, 7bc9508d5, 8014c67c8,
3efb1634d, 30b238e12, e60f887a9) already reached main (`git merge-base --is-ancestor`); port only
what did not, never merge that branch. Never search for or print credentials; R-1 (rotation) is the
founder's. No major-version dependency bumps (Next.js 14.2.35 HIGH advisories: report the ids).

## HP-6 (P1, 3 hours) — pick payload and B2B honesty: C-92, C-87, C-88 / C-157, C-112

Read each row. PR #720 (branch `claude/sports-launch-round2-fixes-hk7kv9`) already shipped C-253
(market anchor into the signal slate), C-255, C-257 (B2B `/api/v1/probabilities` returns the
de-vigged market anchor) and C-259 (two paid v1 surfaces 404 instead of invented numbers): verify
what it closed, close those with SHAs, and do only the remainder. Confidence is an Edge Index, not
a probability; a field named `pModel` carries a probability or is absent. Every API route you touch
returns through `jsonNoStore` on every branch.

## HP-7 (P2, 2 hours) — contests readiness and the F-27 migration proposal

`apps/web/lib/contests/store.ts` creates its two Postgres tables with runtime DDL outside Prisma
migrations; the ledger says a migration must land (owner-only) before `CONTESTS_PUBLIC` ever opens.
You may not touch `packages/db/prisma`. Write `docs/ops/CONTEST_BAY_MIGRATION_PROPOSAL_2026-09-08.md`
with the exact Prisma model additions and idempotent migration SQL that reproduces the runtime DDL,
plus the one command sequence the founder runs (`.claude/rules/prisma.md`, read-only), and add a
test that fails if the runtime DDL drifts from the documented SQL. Drive `/api/contests/*` and the
settlement lane end to end with fixtures (enter, duplicate entry, closed contest, settle,
leaderboard), fail-closed on every gate, rate-limited, no-store. No real-money mechanics; no
prediction market with in-platform currency (Polymarket is a compliance hold). Do not flip
`CONTESTS_PUBLIC`.

## HP-8 (P2, 1 hour) — weekly record-audit cron (LAUNCH/12 "keep going" item 3)

Add `apps/web/app/api/cron/record-audit/route.ts` reproducing LAUNCH/10 §7 (pull the receipts
ledger through the existing proof API with cursor exhaustion, recompute sha256 per receipt, count
invalid American odds, read `calibrationEligibility.status`), alerting through the existing
health-alert path on: any hash mismatch, any NEW invalid-odds row since the last run, or an
eligibility flip. Cron-secret authorized, `jsonNoStore`, durable last-run record. Add the weekly
schedule to `apps/web/vercel.json` AND the root mirror identically (a test already asserts they
match; keep it green). Read-only against the database. No number from this route is ever public.

## HP-9 (P2, docs only) — rho-matrix (copula) methodology page draft

From `LAUNCH/ENGINES-MATH-CALIBRATIONS-RESEARCH.md` Area 4 in the intel repo: draft
`apps/web/app/methodology/parlay-correlation/page.tsx` copy as a Markdown draft in
`docs/methodology/PARLAY_CORRELATION_DRAFT_2026-09-08.md` (not a live page): what a correlation
matrix is, why same-game legs are not independent, how GSE's Parlay MRI reports it, with citations
to the license-safe sources only (Copulas is EXCLUDED — BUSL-1.1). No performance claim, no
"AI" framing, brand lint clean. content-publishing-agent posture: draft only, never published by
an agent.

---

## NOT for Hermes tonight (already owned or founder-only)

- C-197 line integrity, the void lane and the re-grade tool: `claude/launch-line-integrity` (A1).
- PRs #722–#725 completion: `claude/launch-pr-steward` (A2).
- Gate matrix, StatKing rights gating, LIVE_BOARD, browser-agent script F: `claude/launch-gate-matrix` (A3).
- Frontend C-93, C-224, F-24/F-28 copy decisions: `claude/launch-frontend-quality` (A4).
- The confidence-inversion fix as v5.2.8 (LAUNCH/10 §5, §8): MODEL_VERSION is frozen for agents;
  the prior decision stands — the IMPLEMENTED flip and v5.2.8 after the first clean NFL Sunday
  (2026-09-13). Publication stays dark until then; the write guards (HP-2, C-197) ship now.
- R-1 credential rotation, every Vercel flip, the Stripe CTA test, the OG card spot-check: founder
  and browser agent, from the command sheet (`docs/ops/LAUNCH_COMMAND_SHEET_2026-09-08.md`,
  Sports PR #721) and script F when A3 lands it.
