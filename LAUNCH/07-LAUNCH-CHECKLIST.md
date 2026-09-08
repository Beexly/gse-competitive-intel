> PRODUCTION STATUS VERIFIED 2026-09-08 ~22:00 UTC (see 10-RECORD-AUDIT.md + raw/prod-launch-audit-2026-09-08/):
> www.galaxysportsedge.com is LIVE (200). llms.txt LIVE (Proof API manifest, dynamic). humans.txt LIVE.
> /api/proof/* LIVE (OpenAPI 3.1, verification spec, 1,111 receipts, /api/verify works). Calibration page properly dark.
> Publication OFF (PUBLISH_LEDGER unset) — CORRECT per audit finding 5. Sitemap live (35KB, 100+ routes).
> GAPS NOW: (1) /ai.txt 308 -> http://localhost:3000/llms.txt — FIX BEFORE ANNOUNCING TO AGENTS.
> (2) entryOdds write-guard missing (199 bad rows). (3) confidence inversion — fix forward v5.2.8+.

# LAUNCH CHECKLIST — verified against the repo + memory, 2026-09-08
Legend: [DONE = verified evidence] [GAP = must fix] [VERIFY = run the check, 2 min]

## A. PRODUCT SURFACE (repo: apps/web/app — 85 routes)
[DONE] Methodology page exists (deterministic scoring, open framework, proprietary weights).
[DONE] Pricing page with phased ladder + grandfather guarantee (FOUNDING: fantasy 4.99 / pro 14.99 / elite 24.99 mo).
[DONE] Honesty contrast module (7 structural failure modes, zero named competitors, verifyHrefs).
[DONE] Backtest truth disclosure shipped in copy (10,301 samples, MAE 5.18 vs naive 5.00 — "does not beat naive", shown openly). KEEP VISIBLE. This is the trust wedge.
[DONE] Responsible-play surface (1-800-GAMBLER helpline in footer config).
[DONE] /launch route: Founding launch, Draft Assistant + Best Ball on nflverse-graded data.
[DONE] robots.ts + sitemap.ts + news-sitemap.xml routes exist.
[GAP] llms.txt = 0 bytes. ai.txt = 0 bytes. humans.txt = 0 bytes.  <-- paste from 06-LLMS-AGENT-SURFACE.md tonight (10 min, zero risk, blueprint P1 wedge; only Outlier in the 310-dossier set ships anything like this).
[VERIFY] /api routes that must stay private behind auth (cockpit, admin) — confirm 401/403 when logged out.

## B. ENGINE TRUTH (what you can publicly claim — all verified in code)
[DONE] GSE action-score: PLAY/LEAN/WATCH/PASS/HARD_PASS with hard honesty gates (edge<=0 can never PLAY; forced HARD_PASS on calibration/feature/parliament blocks). Formula in 03.
[DONE] Calibration contract: min 250 samples, ECE<=0.06, drift<=0.10 — else probability claims are BLOCKED. Say this on the methodology page. Nobody else publishes this bar.
[DONE] 7-method devig oracle incl. Shin (ported from penaltyblog MIT, pinned commit 5ebd602).
[DONE] Immutable pick records: hash-chained glass ledger + public verify page (/how-to-verify-a-record).
[DONE] CLV engine + conviction tier (needs >=52.4% beat-close over >=20 picks to stand behind a tier).
[DO NOT CLAIM] Poisson/Dixon-Coles are NOT wired live (no team-rate ingestion yet — repo says wiring without data would fabricate stats). Methodology copy in 02 already words this correctly ("independent estimators: Elo + exchange; Poisson lands when team rates are ingested").
[DO NOT CLAIM] Any win rate / ROI / "beats the market". The repo's own compliance scanner bans it; backtest truth says model does not beat naive on the tested setup. The honesty contrast module explicitly contains NO performance figures. Tonight's copy follows that doctrine.

## C. DATA + KEYS
[DONE] The Odds API adapter (packages/data-ingestion) — repo data spine.
[VERIFY] THE_ODDS_API key present + free tier budget (500 req/mo) — do not burn the whole budget on launch night; the board refresh cadence should be tuned DOWN for launch day.
[VERIFY] nflverse ingest current week (docs/fable evidence layer).
[VERIFY] Stripe: founding prices live in Stripe match pricing-phases.ts (4.99/14.99/24.99, annual 49/99/179) + webhook secret set in env.

## D. GITHUB (baxley-garrett/sports-intelligence-os)
[VERIFY] CI badge green on default branch (actions/workflows/ci.yml).
[VERIFY] README "internal calibration only" banner still accurate — if tonight is a public launch, decide: public repo stays internal-mode (fine — the SITE is the product surface, the repo is the proof-of-engineering).
[VERIFY] No secrets in repo (rule 4): grep CI logs + config for keys before making repo public if it is currently private.

## E. DISTRIBUTION (launch night, from memory handoff)
- X @GalaxySportsAI (cold account = bottleneck — SO-001 lesson: distribution is the constraint, not product). Announce thread draft in 01-LAUNCH-COPY-DECK.md §7.
- IG/Threads/FB @galaxysportsedge. GSN studio: "The transmission, not the blog."
- SO-001 Signal Origin ($19, Stripe link live) — cross-sell in newsletter + link from GSE footer? DECISION NEEDED: keep brands separate (recommended) or cross-link.
- Email: hq@galaxysportsedge.com (support+legal both).

## F. TONIGHT SEQUENCE (recommended order)
1. Paste llms.txt / ai.txt / humans.txt (06). Commit + push. (10 min)
2. Run C-section verifies (keys, Stripe, CI). (15 min)
3. Announce thread on X from draft (01 §7) + pin. (5 min)
4. Submit domain to Bing/IndexNow + Google Search Console if not done (sitemap ping).
5. Post launch note to /journal or /changelog route (repo has both) — timestamped, no claims.
6. Log the launch pick policy: board stays No-Bet-default until calibration contract passes. That IS the brand.


## FULL ROUTE SWEEP (verified 2026-09-08 ~22:20 UTC, raw: raw/prod-launch-audit-2026-09-08/route_status_138.txt)
- 138 sitemap URLs: 122 x HTTP 200 | 13 x 307 (age-gate) | 3 x 404 (dead preview URLs).
- P1 SEO DECISION — AGE-GATE vs CRAWLERS: /picks, /pricing, /today, /performance, /board, /fantasy,
  /intelligence/*, /glass-ledger, /kill-ledger, /vault 307-redirect EVERYONE to /age-verify —
  including verified Googlebot (tested with Googlebot UA). Consequence: the money pages cannot
  rank while the sitemap declares them. Compliant middle path used by betting-affiliate sites:
  keep the legal gate for HUMANS as a client-side modal (content in HTML), and/or exempt
  reverse-DNS-verified crawlers from the server-side 307. This is a founder decision (legal
  posture), but it gates ALL organic acquisition — decide before announcing.
- P2 CLEANUP: 3 dead /preview/ncaaf/* URLs (bryant-vs-army, new-hampshire-vs-syracuse,
  stonehill-vs-new-haven) return 404 but remain in sitemap.xml — regenerate sitemap or 301 them.
- P2 SITEMAP DUPES: sitemap.xml has 190 <loc> entries but only 138 unique URLs — 52 duplicate entries, preview pages listed up to 3x — dedupe in sitemap.ts generation.
- P2: /academy contains the word "placeholder" somewhere in copy — sweep before announcing.
- robots.txt correctly disallows /admin /cockpit /api /dashboard /brief /go /stats; sitemap declared. GOOD.
- Confirmed live & clean: /engine (Sealed Engine), /tools + 6 calculators, /pledge, /how-we-make-money,
  /vs/tout-services, /faq, /academy, /proof (303KB), /calibration (properly dark), /methodology, /house.

## PROOF API END-TO-END (verified 2026-09-08 ~22:30 UTC)
- /api/verify tamper tests PASS: mutated hash -> {"found":false}; garbage -> 64-hex format error. Adversarial input handled correctly.
- All 4 OpenAPI endpoints live-tested: /api/proof/ledger, /api/proof/receipts (cursor pagination), /api/proof/verification-spec.json, /api/verify. ALL WORK.
- P3: news-sitemap.xml is EMPTY (170B, 0 <url> entries) but declared in robots.txt — either populate with journal/newsletter/podcast items or drop the declaration.
- Copy-deck trust demo (use in threads/launch posts): recompute sha256("leaf:"+pickId+":"+payload) with hashlib, compare to contentHash — MATCHES; then show tamper test output. Zero-trust verification, reproducible by anyone.

## SOCIAL SHARE READINESS (verified 2026-09-08 ~22:55 UTC)
- Homepage OG/Twitter meta COMPLETE: og:title "Galaxy Sports Edge | Find the signal before the market moves.", dynamic og:image (1200x630 PNG, HTTP 200, 217KB), twitter:card summary_large_image, twitter:site @GalaxySportsAI.
- Homepage JSON-LD: Organization + WebSite + ContactPoint present.
- UNVERIFIED VISUALLY: og.png content not human/AI-reviewed tonight (vision backend 403). Spot-check the card in X/Discord/Slack draft composers before posting links.

## GITHUB LANE STATE (verified 2026-09-08 ~23:00 UTC)
- github.com/BeeXly/Sports is PUBLIC (0 stars; pushed 2026-09-08T19:45Z). README badge/CI visible. Repo README honestly states "internal calibration only" mode — consistent with publish-OFF posture. GOOD.
- LOCAL REPO WARNING: local branch hermes/night-shift-1 (HEAD ce631214f) is BEHIND origin (af19890c1 pushed mid-session from another lane). PULL/REBASE BEFORE ANY PUSH or the AI lane will diverge. Untracked junk present: .hermes-tmp.ArD4rA, .hermes-tmp.LBP48F, MEMORY.md — do not commit these.
- P2: before announcement traffic, run a secret scan over recent history (gitleaks or trufflehog) — public repo + launch attention = more eyeballs. CI already enforces no-secrets policy going forward per CLAUDE.md rule 4.

## PRICING FUNNEL (verified 2026-09-08 ~23:10 UTC, age-cookie session)
- /pricing renders behind age-gate: title "Founding-Member Rates, Locked For Life", Founding prices $4.99/$14.99/$24.99 EXACTLY match engine pricing-phases (FOUNDING tier). Consistent.
- 0 client-side Stripe links = server-side Checkout pattern (correct; prices/plan IDs not client-exposed). MANUAL PRE-LAUNCH TEST: click each tier CTA once and confirm a live Stripe Checkout session opens with the right price + success/cancel URLs back to the site. (Not auto-tested — creating sessions hits Stripe.)
