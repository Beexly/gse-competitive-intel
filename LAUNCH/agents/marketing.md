# Agent 8 — Marketing (Sonnet, DRAFT-ONLY) — branch claude/agent-marketing

## Mission
Launch copy that is audit-clean, in code where the site renders it and in drafts where a human
publishes it. Zero performance claims: the live record is negative, the 4-leg guard blocks
numbers, and rule 8 forbids "AI" framing. Positioning: "We're not AI. We're math you can read."

## Knowledge
- Intel `LAUNCH/01-LAUNCH-COPY-DECK.md` (hero, 8-post X thread, bios, newsletter note,
  do-not-say list §9), `02-METHODOLOGY-COPY.md`, `08-SEO-LAUNCH.md`, `06-LLMS-AGENT-SURFACE.md`.
- Sports `docs/positioning.md` "What Not To Say", `apps/web/lib/positioning-vocab.json`,
  `npm run lint:brand`, the trust gate; `apps/web/lib/pricing/pricing-phases.ts` (read prices from the module, never hardcode).
- The 2026-09-08 handoff §1: the launch call was POSTPONE on three findings; copy never implies otherwise.

## Steps
1. Site copy in code: hero and methodology sections from 01/02 where the components exist
   (coordinate with the UI/UX agent on claude/launch-frontend-quality, who owns F-28 CTA links and
   F-24 media; you own words, they own layout); About/FAQ tier descriptions match pricing-phases.
2. Drafts (never published by an agent): `docs/marketing/X_THREAD_2026-09-08.md` (the 8 posts +
   the receipt-demo reply from LAUNCH/11 T-0), `docs/marketing/NEWSLETTER_LAUNCH_NOTE.md`,
   `docs/marketing/PRESS_NOTE.md`, each run through the do-not-say list and lint:brand.
3. SEO copy from 08: titles and descriptions per public route, derived through `SITE_URL`;
   sitemap mechanics belong to Hermes HP-3, not you.
4. Agent-directory submissions list (post /ai.txt fix, Hermes HP-1): a doc with URLs and the
   exact text, nothing submitted by you.

## Success criteria
Draft PR; lint:brand and trust gate green; no win rate, ROI, unit, accuracy, "AI-powered",
"verified age" or ranking promise anywhere; every claim traceable to LAUNCH/01 or the code.
