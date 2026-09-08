# GSE LAUNCH KIT — START HERE (final state 2026-09-08 ~22:40 UTC)
Everything below was EXECUTED tonight against live systems, not assumed. Re-verify with the commands at the bottom.

## WHERE THINGS LIVE
- This kit: C:\Users\Garrett\.hermes\competitor-intel\LAUNCH\
- Raw evidence: C:\Users\Garrett\.hermes\competitor-intel\raw\prod-launch-audit-2026-09-08\
- Repo (DO NOT PUSH BLIND): C:\Users\Garrett\.cagent\Sports\ (branch hermes/night-shift-1)
- Live site: https://www.galaxysportsedge.com (HTTP 200)

## FILE MANIFEST
- 00-START-HERE.md          <- you are here. Manifest + action order.
- 01-LAUNCH-COPY-DECK.md    Copy-paste strings: hero, product one-liners, launch-post frameworks, DO-NOT-SAY list.
- 02-METHODOLOGY-COPY.md    Paste-ready /methodology prose + FAQ, built from the real engine (gse-action-score formula).
- 03-ENGINE-CONSTANTS-REFERENCE.md  Every threshold extracted from prediction-engine (SPEAK_EDGE=0.025, PLAY>=72, LEAN>=55, KELLY_FRACTION=0.25, GREEN_P_MIN=0.70, parliament weights...). Internal reference; weights stay proprietary per methodology page doctrine.
- 04-METRICS-CANON.md       Brier+Murphy, log loss, e-values, Venn-Abers/CVAP, conformal, Kelly math, CLV definitions — each mapped to its repo module.
- 05-DATA-SOURCES-STACK.md  Verified keyless backbones (ESPN 200, MLB statsapi 200, NHL 200) + The Odds API terms + supply-chain map. NEW-SOURCES file (below) adds tonight's finds.
- 06-LLMS-AGENT-SURFACE.md  Prod-status banner + agent-surface context. NOTE: prod llms.txt is LIVE and BETTER than any static draft — do not overwrite.
- 07-LAUNCH-CHECKLIST.md    The action list. Includes route sweep (138 URLs), age-gate finding, Proof API end-to-end tests.
- 08-SEO-LAUNCH.md          JSON-LD, submission URLs, robots validation, sitemap states.
- 09-AI-ROUTING-NOTES.md    Zero-cost model routing notes (beexly/OpenRouter lanes).
- 10-RECORD-AUDIT.md        THE LEDGER AUDIT: 1,111 receipts, hash verification PASS, odds bug, calibration inversion, publish guidance.
- NEW-DATA-SOURCES-2026-09-08.md    Newly found free data sources (subagent-verified, salvaged to disk after budget death — provenance tagged inside).
- ENGINES-MATH-CALIBRATIONS-RESEARCH.md  Engines/methods canon with citations (subagent-verified, rebuilt by parent after budget death — provenance inside).
- 11-LAUNCH-NIGHT-RUNBOOK.md  TONIGHT, in order: ship blockers -> founder decisions -> post -> agent ping -> monitoring + abort conditions.
- 12-NEXT-AGENT-HANDOFF.md    NEXT AGENT: READ THIS FIRST. Context, hard rules, evidence map, 'keep going' queue.

## TONIGHT'S VERIFIED PRODUCTION STATE
- Site LIVE. Proof API LIVE: 1,111 receipts (45 pages), model v5.2.7, MLB/NCAAF/MLS/NFL, 29 days.
- sha256 recompute (independent, spec GSE-PickCommit-v1): MATCH. /api/verify: works. Tamper tests: correct.
- OpenAPI 3.1 + verification-spec + receipts enumeration: all live. llms.txt + humans.txt: live.
- Calibration page properly dark (0/30 canonical settled; metrics withheld until eligible). Publication OFF = CORRECT.

## DO NOT SHIP / FIX BEFORE ANNOUNCING (ordered)
P0-1. /ai.txt 308 -> http://localhost:3000/llms.txt  (app/ai.txt/route.ts uses request.url; breaks agents)
P0-2. entryOdds write-guard: reject |odds| < 100 && > -100 at write time (199/1,111 rows poisoned, 17.9%)
P0-3. Confidence inversion: fix forward as v5.2.8+; ablate marketFairProb leak / favorite-longshot / steam-chase. PUBLISH NO NUMBERS until post-fix sample accumulates.
P1-4. Age-gate vs crawlers: /picks /pricing /today /performance /board /fantasy /intelligence/* /glass-ledger /kill-ledger /vault 307 EVERYONE incl. Googlebot (tested). Money pages can't rank. Decide: crawler exemption (reverse-DNS verified) or client-side modal gate. FOUNDER CALL.
P2-5. Sitemap hygiene: 3 dead /preview/ncaaf/* URLs (404) — regenerate or 301. news-sitemap.xml EMPTY but declared in robots.txt — populate or drop.
P2-6. /academy contains literal "placeholder" text — sweep copy.
P3-7. Receipt rows omit pickType (present only in /api/verify payload) — API consistency nit.

## LAUNCH ACTION ORDER
1. Fix P0-1..3 in repo, PR, merge, deploy (AI lane rules: push branch, PR, merge).
2. Founder decision on age-gate (P1-4). Then regenerate sitemap.
3. Run POST-LAUNCH verify block (bottom of this file).
4. Announce using 01 copy deck + 06 agent surface; X/Discord/Reddit threads include the receipt-verification demo (07 bottom) — it is the differentiator: "don't trust us, recompute our hashes."
5. Monitor: /api/proof/receipts growth, /api/verify latency, calibration page for eligibility flip.

- _launch_inventory.json (comp-intel root): per-file inventory of prediction-engine (596 files / 114,393 lines / 2,127 exports).

## RE-VERIFY EVERYTHING (commands)
curl -s https://www.galaxysportsedge.com/llms.txt | head -5
curl -s "https://www.galaxysportsedge.com/api/proof/receipts" | head -c 400
curl -s -I https://www.galaxysportsedge.com/ai.txt            # P0-1 fixed when Location is https
python: recompute sha256 per 10-RECORD-AUDIT.md section 7 (raw receipts archived).
