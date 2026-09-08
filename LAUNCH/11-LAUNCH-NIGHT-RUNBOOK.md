# 11 — LAUNCH NIGHT RUNBOOK (tonight, chronological)
Sources: 00/01/07/10. Every claim verified tonight 2026-09-08. Print or keep open.

## T-MINUS: SHIP BLOCKERS (before ANY announcement)
1. PULL FIRST: cd C:\Users\Garrett\.cagent\Sports && git pull --rebase origin hermes/night-shift-1
   (origin advanced to af19890c1 mid-session — do not push blind.)
2. Fix /ai.txt redirect: app/ai.txt/route.ts — new URL("/llms.txt", request.url) becomes
   new URL("/llms.txt", "https://www.galaxysportsedge.com") or middleware-relative redirect.
   Test after deploy: curl -sI https://www.galaxysportsedge.com/ai.txt -> Location must be https.
3. entryOdds write-guard: reject |odds| < 100 && > -100 at pick-commit time (199 bad rows exist;
   they can never be edited — receipts are frozen by design. Guard prevents new ones.)
4. Commit confidence fix as v5.2.8+ (ablate marketFairProb leak in confidence path). Do NOT
   publish any numbers — calibration page stays dark until the contract passes honestly.
5. PR -> merge -> deploy -> run RE-VERIFY block (00-START-HERE bottom).

## T-60: FOUNDER DECISIONS + ASSETS
- DECIDE: age-gate vs crawlers (P1). Options in 07. Money pages (/picks /pricing /today) cannot
  rank until resolved. If deferring: announcement copy should not promise "Google us".
- SITEMAP: regenerate (dedupe 190->138, drop 3 dead previews). Populate or un-declare news-sitemap.
- SPOT-CHECK the OG card visually in X/Discord draft composers (og.png verified 1200x630 PNG 200 OK;
  visual content unreviewed — vision tool was down).
- Copy assets: 01 sections 2,5,6,7 (hero, 8-post thread, bios, newsletter note). Run the do-not-say
  list (01 section 9) over anything you write yourself.

## T-0: POST
- Thread from 01 section 5 (verified clean against audit). Anchor: honesty + verification, zero
  performance claims. Include: llms.txt link for agents, /verify for humans, receipt demo below.
- THE RECEIPT DEMO (the differentiator — include as reply #1):
  "Pick any hash from galaxysportsedge.com/api/proof/receipts. Run:
   sha256('leaf:' + pickId + ':' + payload) in any language. It matches the published hash.
   Tamper with one character -> {"found":false}. Don't trust us. Recompute."
- Cross-post: r/algobetting-style subreddits only AFTER age-gate decision; lead with methodology, not picks.

## T+1H: AGENT SURFACE PING
- llms.txt is live (Proof API manifest). Ping agent ecosystem surfaces (llmstxt registry, agent
  directories) ONLY after /ai.txt fix is deployed (P0-1) — a localhost redirect in the wild
  is worse than no listing.

## T+24H AND BEYOND
- Watch /api/proof/receipts growth (1,111 at audit) + /api/verify latency.
- Calibration page flips when 250 canonical settled samples accumulate — the gates decide, not vibes.
- NCAAF lane (59.6% WR, +2.1% ROI, n=183 valid-odds) is the only green lane — methodology note
  material, not a victory lap. Recheck weekly in the audit script (10 section 7).
- Weekly: re-run record audit (10-RECORD-AUDIT.md reproduction steps) to catch new data-integrity drift.

## ABORT/PAUSE CONDITIONS
- Receipt chain mismatch on recompute -> halt announcements, investigate immediately.
- /api/verify down or >2s -> site credibility surface is down; pin launch thread until restored.
- Any competitor publishes a verifiable-record claim -> re-run corpus delta check (queue.json) before responding.

## SOCIAL HANDLE CHECK (added 2026-09-08 23:15 UTC)
- Site twitter:site/creator meta = @GalaxySportsAI; copy-deck thread (01 s5) is written for it.
- UNCONFIRMED: no search footprint found for @GalaxySportsAI tonight (X blocks anonymous checks).
  MANUAL, before posting: log into X and confirm the handle exists + bio/link point to
  galaxysportsedge.com. If it doesn't exist, create it FIRST (threads reference it), or swap
  every meta/copy reference to the real handle in one pass (grep apps/web for GalaxySportsAI).
