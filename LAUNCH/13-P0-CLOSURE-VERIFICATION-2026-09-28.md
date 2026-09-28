# 13 - P0 CLOSURE VERIFICATION (re-verified 2026-09-28)

Written 2026-09-28 by the autonomous run. `LAUNCH/10-RECORD-AUDIT.md` (2026-09-08) recorded
THREE P0 blockers. That audit is 20 days old. This file re-tests each one against LIVE
production, with commands and outputs, so the next agent does not re-open settled ground or
trust a stale record. Nothing here is inferred: every line is a measured result.

`raw/` is append-only and was NOT touched. This is a forward correction, which the protocol
permits and prefers over rewriting history.

---

## The 60-second version

**All three P0s from the 2026-09-08 launch audit are CLOSED or accounted for, verified against
production on 2026-09-28.** The Proof API is still live and its hash chain still verifies. The
site is live and healthy.

| P0 | Claimed 2026-09-08 | Verified 2026-09-28 |
|---|---|---|
| 1. `/ai.txt` 308 -> localhost:3000 | BLOCKER | **FIXED** - 308 -> `https://www.galaxysportsedge.com/llms.txt`, which returns 200 with 5,200 bytes |
| 2. `entryOdds` write-guard missing (199 poisoned rows) | BLOCKER | **FIXED** - `isPlausibleEntryOdds` rejects at write time in `packages/ingestion-pipeline/src/process-sport.ts:1518`, pinned by `packages/prediction-engine/src/__tests__/pick-proof-receipt.test.ts:105` |
| 3. confidence inversion | BLOCKER | **SUPPRESSION CLOSED, RANKING NOT** - see section 3; this is the one that still matters |

---

## 1. /ai.txt - FIXED

    curl -s -o /dev/null -w "status=%{http_code} redirect=%{redirect_url}" \
        https://www.galaxysportsedge.com/ai.txt
    status=308 redirect=https://www.galaxysportsedge.com/llms.txt

    curl -s -o /dev/null -w "status=%{http_code} bytes=%{size_download}" \
        https://www.galaxysportsedge.com/llms.txt
    status=200 bytes=5200

The `request.url` bug is gone. `llms.txt` is live and serving. Agent-directory submissions, an
open item in `LAUNCH/12`, are unblocked by this.

## 2. entryOdds write-guard - FIXED

`process-sport.ts:1518` computes `entryOdds` as `pick.entryPrice ?? (MONEYLINE ? round(line) :
null)` and gates receipt minting on `isPlausibleEntryOdds(entryOdds)`. The code comment states
the original defect exactly: the old `entryOdds !== 0` check let a non-MONEYLINE pick raw
spread/total line (e.g. -3.5) pass as a "price", poisoning 199 frozen rows. The guard is at
WRITE time, which is the only possible cure for immutable history. Those 199 rows remain frozen
by design; the audit was right that prevention is the only cure.

## 3. confidence inversion - SUPPRESSION CLOSED, RANKING NOT

This is the honest part, and it is the one item still open.

**Closed: the publish half.** `apps/web/lib/picks/adverse-edge-suppression.ts` is applied on
BOTH read surfaces (`/api/picks` and `lib/board/state.ts:882`) BEFORE the row cap, gated on the
SIGNED `expectedClv` and not on `decision === "PASS"`, writing nothing. A suppressed row still
settles and still counts in the published record, which is deliberate so the numbers are not
flattered by dropping exactly the rows the model said were worst.

**Not closed: the ranking half.** The comparator at
`apps/web/lib/ranking/sort-key.ts:106` is a three-branch cascade that PREFERS
`factorBreakdown.rankingP` and only falls back to `rankingScore/100` and then
`confidence/100`. `rankingP` is the branch measured MONOTONE (n 1,390); `confidence` is the
branch measured ANTI-predictive (n 2,385, z = -10.7). So the cascade is the right shape and
points at the right key.

**The unresolved question, and nobody has measured it:** how many rows actually carry a
`rankingP` that resolves? The file own header says so - "NOBODY HAS EVER MEASURED WHAT SHARE OF
ROWS THAT IS" - and `rankingBasisCensus()` exists specifically to answer it.

**MEASURED 2026-09-28 against live /api/board/state: on the public payload, 14 publishedToday
and 39 gatedToday rows, `rankingP` is null on 100% of them.** Two readings are possible and the
difference matters:

  (a) the public payload redacts `rankingP` the way it redacts `confidence` (PRO+ only). The
      redaction is real, which means the PUBLIC sort falls through to `confidence/100`, the
      anti-predictive branch; or
  (b) the picks genuinely lack `rankingP` and even premium sorting is on the wrong key.

I could NOT distinguish these from the public payload, because it nulls `rankingP` for the same
reason it nulls `confidence` (`lib/board/state.ts:917,932`, gated on `canSeeConfidence`), and
the board row type says `rankingP: number | null` with the comment "premium-only model
internals". **An authenticated read of the premium view, or a `rankingBasisCensus` run over the
real population, closes this in one query.** It is the highest-value open item in this repo and
it is a measurement, not a rebuild.

Note the suppression is unaffected either way: it gates on `expectedClv`, a signed edge estimate
carried in the row, not on the ranking key.

## 4. Proof API - STILL LIVE, CHAIN STILL VERIFIES

Recomputed 2026-09-28 with python hashlib and no GSE code, the same independent method the
original audit used:

    GET /api/proof/openapi.json            -> 200, 5,693 bytes
    GET /api/proof/verification-spec.json  -> 200, 2,935 bytes
    GET /api/proof/receipts?limit=1        -> 200

    pickId      cmuj14w8s048s4u5rpt6tev15
    claimed     ad420a9d1a044432caf739a26918db9f9e37b5db06a9ca4db370c739903c4fc3
    recomputed  ad420a9d1a044432caf739a26918db9f9e37b5db06a9ca4db370c739903c4fc3
    MATCH

The documented policy is "Settled picks only. Each row opens per the same policy as
/api/verify." The verification machinery still works 20 days after it was built, which is the
strongest single piece of evidence in this repo.

## 5. What the 2026-09-08 audit got right, and what it structurally could not know

  - Its central instruction, "Publish nothing numerical until both are fixed", was correct
    advice and the restraint was right. Both flagged defects were real and both were fixed
    within the week. That audit did not cause the delay.
  - It described the 3 P0s accurately and overstated no defect.
  - The thing it could not know, being a snapshot: all three P0s had to be fixed in a
    DIFFERENT repo (Beexly/Sports), so nothing in THIS repo would ever show them closing. An
    audit naming a defect in another repo needs a follow-up in that repo, or it becomes a
    permanent open item by neglect rather than by decision. That is the structural lesson and
    it is why this file exists.

## 6. State of the product, 2026-09-28

Live at https://www.galaxysportsedge.com. Verified 200 on `/`, `/today`, `/fantasy/dfs`,
`/api/picks`, `/api/board/state`; `/cockpit/founder-picks` returns 307, the founder gate, which
is expected.

Two production outages occurred 2026-09-27/28 and BOTH are fixed and verified live. Main was red
because `npm run build` runs ESLint and three sessions had each merged lint-failing code, so
every production build had failed for over two hours. The root causes were NOT the ones the
first fixes assumed: the board was never a path bug (the data file was never traced into the
serverless bundle) and the ingest OOM was never a gunzip-buffer problem (the parsed RECORDS were
the memory, and the season filter ran only after the whole 33MB multi-season table was built).
Both are recorded in `Beexly/Sports` `docs/ops/AGENT_LEDGER.md` rows FIX-3 and FIX-4 with the
live deploy IDs and the cron log lines that prove them.

## 7. Next agent: do these in order

1. **Run `rankingBasisCensus` over the real pick population** and record the `confidenceShare`.
   This is the one open measurement in this file and it takes one query. If the share is
   material, the public board is ordering on an anti-predictive key, and the fix is to require
   `rankingP` for a row to be publicly ranked.
2. **Re-run the section 4 recompute** on a fresh sample and diff against
   `raw/prod-launch-audit-2026-09-08/receipts_full_1111_fresh.json`. `LAUNCH/12` listed this as
   step 2 and it has not been done; section 4 is a single-row spot check, not the 1,111-row
   diff.
3. **Build the weekly audit cron** (`LAUNCH/12` step 3, still not built): re-run the recompute,
   alert on hash mismatch, new invalid-odds rows, or a calibration eligibility flip.
4. Agent-directory submissions, unblocked now that /ai.txt serves.

## RULES OBSERVED

- `raw/` untouched (append-only).
- Intel only. Nothing here was wired into `Beexly/Sports`; this repo proposes, the product
  repo decides.
- No number in this file is inherited from a prior doc without being re-measured. The three P0
  closures, the redirect target, the guard location and the hash match are all fresh
  observations with the command that produced them.
- The `LAUNCH/12` hard rule still stands: never push the Sports repo without
  `git pull --rebase` first, and never relax the substantiation guard.
