# Cluster F Dossier — 08-28 Deep Crawl (ariacodez) + CSV Join + CapCut-Clones Dossier

Sources (staging only, no git in intel repo):
- `extract-data-2026-08-28.json` (1,362,170 B): 105 deep-crawl rows + 7 platform analyses + supporting intel
- `extract-data-2026-08-28.csv` (1,281,719 B): 1-row denormalized export, 9 columns of JSON blobs
- `extract-data-2026-08-28 (1).json` (91,160 B): job + 29 clones + 10 steals + 9 do_not_copy + clone_recipe

## 1. Crawl row counts

- Deep crawl (`ariacodez_deep_crawl`): **105 rows**, all `access_status` = "Public page fetched successfully…" (105/105).
- Platform analysis (`platform_competitive_analysis`): **7 platforms** — Blink, Replit, Emergent, Lovable, Readdy, Vercel, Netlify.
- Supporting intel: Aragon benchmark (4 flow steps + feature set + pricing note), IdeaWave revenue signals (8 top ideas + 4 workflow values), Skool community (1 post: AI Automation Builders, 11 members, $89/mo).
- Clones file: **29 clones, 10 steals, 9 do_not_copy**, 1 job + 1 clone_recipe (5 steps).
- Nav-path split (105): Resources > Guide 44, Money 31, Prompt 16, Security 10, System 4.
- Content completeness: walkthrough_raw 105/105, business_logic 105/105, copy_paste_prompts 102/105, build_cost 59/105, price_to_client 76/105, hosting_run_cost 11/105, free_tier 105/105 (all True), hosted_asset True 23 / False 82.
- Tool stack top: Make 87, Claude 73, ChatGPT 70, Perplexity 32, Gemini 29, Higgsfield 23, Multi-Tool 18, Replit 17, Claude Code 13, Grok 12, ElevenLabs 12, Blink 11, Emergent 10, Stripe 8, Lovable 8. Connectors mirror this (Make 87, ElevenLabs 12, Stripe 8, TrustMRR 7). `skills_required` is empty across all 105 rows.

## 2. CSV headers + row count + join

Headers (9 cols):
1. `ariacodez_deep_crawl`
2. `platform_competitive_analysis`
3. `supporting_intelligence.product_benchmarking_aragon.user_flow_steps`
4. `supporting_intelligence.product_benchmarking_aragon.feature_set`
5. `supporting_intelligence.product_benchmarking_aragon.pricing_model`
6. `supporting_intelligence.product_benchmarking_aragon.pricing_model_citation`
7. `supporting_intelligence.revenue_signals_ideawave.top_performing_ideas`
8. `supporting_intelligence.revenue_signals_ideawave.revenue_generation_workflows`
9. `supporting_intelligence.community_insights_skool`

Row count: **1 data row** (headers + 1). Col 0 blob = 1,242,111 chars / 105 records; col 1 blob = 8,373 chars / 7 records.
Join to JSON on `source_metadata.url` (deep crawl) and `platform_name` (platforms): **105/105 URL match = 100% hit rate**, 0 CSV-only, 0 JSON-only. CSV is a faithful denormalized copy of the JSON, not an independent sample.

## 3. do_not_copy boundary — VERBATIM (9 items, described not bypassed)

1. "Do not make the free tier a watermark trap or silently cap it at low resolution: VEED explicitly describes free exports as watermarked and 720p." — cite: https://www.veed.io
2. "Do not hide the core short-video workflow behind opaque credits, add-ons or tier-specific quality; make the exact output contract and remaining credits visible before generation." — cite: https://www.submagic.co; https://captions.ai; https://www.ngram.com
3. "Do not ship MP4-only when the user needs to continue editing: preserve SRT and an editable project/draft interchange path." — cite: https://github.com/Augani/openreel-video; https://github.com/GuanYixuan/pyJianYingDraft
4. "Do not force a local shop into a desktop-only, pro-post workflow for a simple Reel; Premiere and Resolve expose powerful professional stacks, but their pages foreground subscription/Studio tiers and multi-page finishing complexity." — cite: https://www.adobe.com/products/premiere.html; https://www.blackmagicdesign.com/products/davinciresolve
5. "Do not turn the first screen into asset sludge: KineMaster advertises 75,000+ assets across 10,000+ packs, a choice load that should be replaced by a few outcome-led presets." — cite: https://www.kinemaster.com
6. "Do not use creator counts, ratings or 'viral' language as a substitute for a measurable input→edit→output workflow; require a file contract and QA evidence." — cite: https://www.opus.pro; https://www.submagic.co; https://www.veed.io
7. "Do not present an unfinished editor rewrite as production-ready: OpenCut's README says the rewrite is not ready and directs users to the classic version." — cite: https://github.com/OpenCut-app/OpenCut
8. "Do not label a search/RAG utility as an editor: QMedia lists short-video editing as a future plan, so it is an intelligence layer rather than a shipped timeline/export product." — cite: https://github.com/QmiAI/Qmedia
9. "Do not clone competitor branding or build a generic clone-brand; copy the observable mechanics (9:16, captions, handoff and QA) and differentiate on deterministic local-shop delivery." — cite: https://github.com/IgorShadurin/app.yumcut.com; https://github.com/OpenCut-app/OpenCut

Dossier respects the boundary: it names the 9 prohibitions above and does not reproduce any bypass instructions. `clone_recipe` summarized at high level only: (1) single first-run form → 9:16 project, (2) automatic first pass + human checkpoint, (3) canvas-over-timeline editor with transcript view, (4) deterministic outputs (MP4+SRT+editable draft), (5) fail-closed QA delivery loop. No step-level build instructions reproduced.

## 4. Clones + steals index (high level)

29 clones: CapCut, InShot, KineMaster, VEED, Clipchamp, Descript, Kapwing, Canva Video Editor, Filmora 15, DaVinci Resolve, Adobe Premiere, iMovie, OpenShot, Shotcut, PowerDirector 365, Alight Motion, Submagic, Captions, OpusClip, ngram, OpenCut, YumCut, OpenReel Video, ArcReel, QMedia, pyJianYingDraft, video-autopilot-kit, VN (VlogNow), LumaFusion.
10 steals (mechanics to adopt, one line each): 9:16-default canvas; one-form ingest (local + URL); auto first pass + review checkpoint; hybrid transcript+timeline editor; editor-neutral handoff (MP4+SRT+draft); no-watermark 1080p baseline; local-first/browser processing; evidence-first QA; persistent BrandKit; API/webhook path.

## 5. Top platform findings

1. **Blink (entry-barrier rank 1):** only builder here with cited native iOS/TestFlight path + backend/DB/payments; free-to-start + $10-credit affiliate claims; monetization mocked in the Sensor Tower play — verify live plan limits before launch.
2. **Replit (rank 2):** full-stack web agent (frontend/backend/DB/auth/deploy + SEO pages); $10-credit "build whole thing free" claims; no App Store path in these citations — web-first.
3. **Emergent (rank 3):** prompt-to-full-stack with auth/billing/SEO; genuine free tier + paid upgrade flow stated but no prices/quotas disclosed; $9.99 in text is a prompt example, not Emergent pricing.
4. **Lovable (rank 4):** fastest marketing-site/MVP play ("20 minutes in Lovable"); no plan/hosting/API terms in fetched pages — preview-grade, not app-grade evidence.
5. **Readdy (rank 5):** URL/screenshot-to-app + white-label on Agency plan; 20%-off codes (ARIA8/Aria06); project page is a sign-in wall — base prices and caps unverified.
6. **Vercel / Netlify (ranks 6–7):** static-file hosting options only in this corpus, not prompt builders; no pricing/limits stated; right target for marketing sites, wrong tool for API-backed apps.
7. **Revenue anchor (IdeaWave):** Glean $16.7M/mo, Instasize $12.5M/mo, Sentry $10M/mo, Clay/Recharge $8.3M/mo, Gamma $4.2M/mo, Stan $3.6M/mo, Aragon AI $833.3K/mo. Aragon benchmark: ~10 self-photos + Higgsfield character lock + Pinterest look board; no customer-facing price visible.

## 6. Caveats (fractions)

- Single-source crawl: 105/105 rows from ariacodez.ai Resources; access 105/105 public-fetch — no independent multi-site verification.
- Price evidence thin: build_cost 59/105 (0.56), price_to_client 76/105 (0.72), hosting_run_cost 11/105 (0.10); platform plan prices/quotas absent — most pricing is affiliate-credit or time-to-build claims.
- Connector skew: Make appears in 87/105 rows — reflects Aria's stack, not market share; skills_required 0/105 (schema gap).
- CSV adds no rows: 1-row export, 100% join — treat as format check, not corroboration.
- IdeaWave MRR is payment-verified + self-reported mix per its own copy; treat leaderboard figures as directional.

## 7. GSE reads

- Ship the deterministic handoff (MP4+SRT+editable draft + QA receipt) as the wedge — it is the one mechanic none of the 29 clones all deliver together, and it maps directly onto steals 5/8 without crossing any do_not_copy item.
- Rank builder choice by evidence: Blink for mobile deliverable, Replit/Emergent for web app, Lovable/Readdy for preview/marketing — don't sell previews as apps.
- Copy mechanics (9:16 default, one-form ingest, BrandKit), never branding; keep the no-watermark-1080p baseline to stay clear of prohibition 1.

## 8. Re-extract targets

1. Readdy project page behind sign-in wall + Agency-plan price/quotas; current ARIA8/Aria06 code validity.
2. Blink/Replit/Emergent current plan prices, credit burn per build, hosting/usage caps, and live TestFlight/deploy path.
3. VEED free-tier watermark/720p terms + Submagic/Captions/ngram credit and quality-tier contracts (to pin prohibitions 1–2 to current terms).
4. OpenCut rewrite status (is classic still the directed target?) and QMedia editing-shipped check (has "future plan" shipped?).
5. IdeaWave leaderboard refresh for Aragon + top-8 MRR figures; Aragon customer-facing price if now visible.
