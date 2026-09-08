# 12 — NEXT-AGENT HANDOFF (read this FIRST, before any file in LAUNCH/)
Written 2026-09-08 ~23:30 UTC. Everything here was EXECUTED against live systems this session —
exit codes and raw evidence exist for every claim. Do not re-derive; verify only what you're about
to act on. THE USER'S LAW: tool call, not recap. Never report done without fresh exit codes.

## WHAT THIS IS
Galaxy Sports Edge (GSE) launches TONIGHT (2026-09-08). This directory is the complete launch
kit + production audit. The Sports repo (C:\Users\Garrett\.cagent\Sports) is the product;
this is the intel/copy layer. Repo was deliberately NOT modified (user order).

## START HERE, IN ORDER
1. THIS FILE
2. 11-LAUNCH-NIGHT-RUNBOOK.md — tonight, chronological (T-minus -> T+24h)
3. 00-START-HERE.md — manifest + verified prod state + re-verify commands
4. 10-RECORD-AUDIT.md — the production ledger audit (most consequential doc)
5. 07-LAUNCH-CHECKLIST.md — full issue list, P0->P3

## THE 60-SECOND VERSION
- Site LIVE. Proof API LIVE and honest: 1,111 hash-chained receipts; independent sha256 recompute
  MATCHES; tamper tests return {"found":false}; OpenAPI 3.1 + verification-spec live.
- Publication correctly OFF. Three P0 blockers stand: (1) /ai.txt 308 -> localhost:3000 (route
  bug, request.url), (2) entryOdds write-guard missing (199 bad rows already frozen in history),
  (3) confidence inversion (realized WR falls as confidence rises in EVERY sport — fix forward
  as v5.2.8+, publish NO numbers until the 4-leg guard passes honestly).
- Founder decisions pending: age-gate vs crawlers (money pages can't rank), X handle
  @GalaxySportsAI existence, Stripe CTA manual test, OG card visual spot-check.
- Copy is ready and audit-clean (01): hero, 8-post X thread, bios, newsletter note, do-not-say list.
- Math/methodology ready (02/03/04 + ENGINES-...-RESEARCH.md): real constants from the engine,
  calibration/metrics canon with citations, license-safe OSS list (Copulas EXCLUDED — BUSL-1.1).
- Data stack verified keyless tonight (05 + NEW-DATA-SOURCES-2026-09-08.md): ESPN/NHL/MLB APIs 200.

## HARD RULES FOR ANY AGENT TOUCHING THIS
- NEVER push the Sports repo without: git pull --rebase origin hermes/night-shift-1 FIRST
  (origin advanced mid-session to af19890c1; local was ce631214f). Commits that don't reach origin don't exist.
- NEVER edit frozen receipt data, backfill records, or relax the 4-leg substantiation guard.
- NEVER put win rate/ROI/units in public copy (the live record is negative; the guard blocks it; do not route around).
- Delegation lesson (learned twice tonight): research subagents hit iteration caps and DIE BEFORE
  WRITING their deliverable. If you dispatch children: cap their scope, steer "write NOW" before
  their budget ends, and verify the file exists on disk — child completion messages are NOT proof.
  Salvage procedure that worked: transcript at AppData/Local/hermes/cache/delegation/live/<deleg_id>/task-0.log
  + evidence JSONs in raw/prod-launch-audit-2026-09-08/child-evidence/.

## EVIDENCE MAP (raw, preserved)
raw/prod-launch-audit-2026-09-08/:
  receipts_full_1111_fresh.json   full ledger dump (45 pages, cursor-exhausted)
  route_status_138.txt            full sitemap sweep (122x200 / 13x307 age-gate / 3x404)
  proof_openapi.json, proof_verification_spec.json, proof_ledger_self.json, proof_page.html
  calibration_page.html, sitemap.xml, _audit_meta.json
  child-evidence/                 both research children's verification scripts, phase JSONs,
                                  ESPN sample, and full transcripts
LAUNCH/ evidence JSONs referenced by research files: _verify_gh.json (repo checks incl. licenses),
_gh_new_candidates.json (new repo candidates).
C:\Users\Garrett\.hermes\competitor-intel\_launch_inventory.json — per-file engine inventory
(596 files / 114,393 lines / 2,127 exports in prediction-engine).

## IF THE USER SAYS "KEEP GOING"
Highest-value next moves, in order:
1. Fix the 3 P0s in the repo (runbook T-MINUS section has exact files/lines), PR, merge, deploy, re-verify.
2. After deploy: re-run the record audit (10 section 7) and diff against receipts_full_1111_fresh.json.
3. Build the weekly audit cron (job prompt: re-run 10-RECORD-AUDIT.md section 7 reproduction,
   alert if hash mismatch, new invalid-odds rows, or calibration eligibility flip).
4. Draft the rho-matrix (copula) methodology page from ENGINES file Area 4 — the parlay wedge.
5. Agent-directory submissions AFTER /ai.txt fix is live.
