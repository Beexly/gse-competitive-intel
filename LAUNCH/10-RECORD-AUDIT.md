# 10 — LIVE RECORD AUDIT (production receipts, 2026-09-08)
Scope: https://www.galaxysportsedge.com/api/proof/* — fetched LIVE tonight, no repo assumptions.
Verdict up front: THE VERIFICATION MACHINERY IS REAL AND WORKS. The committed record has one
data-integrity bug and one calibration inversion the gates correctly caught. Publish nothing
numerical until both are fixed — and that restraint IS the launch story.

## 1. INDEPENDENT VERIFICATION: PASS
- Spec: GSE-PickCommit-v1 (verification-spec.json): sha256 over "leaf:" + pickId + ":" + payload,
  payload = sorted-key `key=value` pairs joined by "|".
- Recomputed locally (python hashlib, no GSE code): MATCH on sampled receipts (exact hex equal).
- /api/verify?hash=<hash> -> {found:true, verified:true, ...} with full committed payload.
- llms.txt is LIVE as a full Proof API manifest (OpenAPI 3.1 at /api/proof/openapi.json,
  conformance vectors at /api/proof/verification-spec.json). This is the category-leading surface
  — in the 310-dossier corpus, NO competitor ships anything like it.

## 2. LEDGER SHAPE (full pull: 1,111 receipts, 45 pages, exhausted cursor)
- modelVersion: v5.2.7 (100% — single model generation)
- results: WIN 555 | LOSS 532 | VOID 19 | PUSH 5
- sports: MLB 728 | NCAAF 200 | MLS 153 | NFL 30
- velocity: 29 active days, avg 38/day, peak 161; frozen span 2026-08-23 -> 2026-09-07
- pickType: absent from receipts rows (present inside verify payloads, e.g. "pickType=TOTAL") — minor API consistency nit.

## 3. DATA-INTEGRITY BUG: entryOdds
- 199/1,111 (17.9%) of receipts carry entryOdds values that are NOT valid American odds
  (between -100 and +100 exclusive: e.g. -33, -43, -86; extremes elsewhere reach -10,533).
- 0/199 invalid values equal their line value — not a line/odds swap; a field-population bug.
- Consequence: any naive "units" math over the full ledger is garbage (first pass produced a
  nonsensical +139.85u). ALL economics below use valid American odds rows ONLY (912 rows).

## 4. HONEST ECONOMICS (valid American odds only; flat 1u; WIN pays payout(|odds|), VOID/PUSH excluded)
- decided 890 | W 460 / L 430 | win rate 51.7% | NET -52.47u | ROI -5.9%
- MLB: 590 decided, WR 49.5%, -43.53u, ROI -7.4%
- MLS: 95 decided, WR 54.7%, -0.57u, ROI -0.6%
- NCAAF: 183 decided, WR 59.6% (avg entry -605, heavy juice), +3.84u, ROI +2.1%  <- the one green lane
- NFL: 22 decided, WR 31.8%, -12.21u (all frozen 08-22/08-23 = preseason-dated; tiny sample, do not over-read)

## 5. CALIBRATION INVERSION (the headline finding)
Realized win rate FALLS as committed confidence RISES (valid-odds decided subset):
  conf 50-54: n=457, realized 57.1%
  conf 55-59: n=220, realized 51.8%
  conf 60-64: n=84,  realized 44.0%
  conf 65-69: n=67,  realized 37.3%
  conf 70-74: n=37,  realized 40.5%
  conf 75-79: n=9,   realized 22.2%
  conf 80+:   n=16,  realized 37.5%
Holds WITHIN every sport (MLB 38.2% vs 52.5%, MLS 44.4% vs 55.8%, NCAAF 46.5% vs 67.9%, NFL 10% vs 50% at conf>=60 vs <60).
=> The confidence feature is currently ANTI-PREDICTIVE at the top end. Suspects to ablate (engine side):
   marketFairProb leaking into confidence, favorite-longshot structure, steam/movement chasing.
This is EXACTLY what the calibration contract (ECE <= 0.06 over >= 250 settled) exists to catch —
and it is why PUBLISH_LEDGER defaults OFF. The gate did its job. Say that publicly; fix the model privately.

## 6. LAUNCH GUIDANCE (from this audit)
1. KEEP PUBLICATION OFF. The four-leg substantiation guard would (correctly) refuse; flipping it on now would torch the brand's only durable asset — verifiable honesty.
2. Fix forward, never rewrite: receipts are frozen by design. Bump model version (v5.2.8+), fix the odds population guard (reject |odds| < 100 && > -100 at write time), root-cause the confidence inversion, then let the LEDGER SHOW THE FIX. That arc — "we found it, we published the fix, verify it yourself" — is the strongest possible content.
3. The NCAAF lane (59.6% WR, +2.1% ROI over 183) is the only lane with any green — worth a methodology note, not a victory lap.
4. Launch copy stands as written in 01/02: no win rates, no ROI, no claims. The record audit stays internal until the inversion is fixed.
5. /proof page already states: everything sealed before kickoff, free shows two picks/day, bootstrap-era picks excluded by design — consistent with what we measured.

## 7. REPRODUCE THIS AUDIT
python: paginate /api/proof/receipts (cursor param), recompute sha256 per verification-spec.json,
filter valid American odds (o >= 100 or o <= -100), compute flat-1u units + WR bins by committed confidence.
Raw receipt dump (archived): C:\Users\Garrett\.hermes\competitor-intel\raw\prod-launch-audit-2026-09-08\receipts_full_1111_fresh.json (1,111 rows).

## 8. PATH TO PUBLICATION (computed 2026-09-08)
The 4-leg guard's own math applied to tonight's ledger:
- NCAAF lane: 109/183 = 59.6%, Wilson 95% LOWER BOUND = 52.3% — just under the 52.4% market
  break-even line; denominator 183 < 250 required. FAILS the guard today (correctly).
- MLB lane: 292/590 = 49.5%, Wilson lower = 45.5%. FAILS.
- Unlock conditions: (a) fix confidence inversion + odds guard as v5.2.8+, (b) accumulate ~70+
  additional settled valid-odds NCAAF picks (and every new pick must hold >= ~60% WR to pull the
  lower bound above break-even), (c) CLV backing + walk-forward provenance legs.
- Do NOT massage thresholds to make lanes pass. The guard's strictness is the product.
