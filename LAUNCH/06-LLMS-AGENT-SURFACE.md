> STATUS 2026-09-08 21:58 UTC: PRODUCTION IS AHEAD OF THE REPO CHECKOUT. llms.txt is LIVE
> (dynamic route app/llms.txt/route.ts -> buildMachineProof()), humans.txt is LIVE (499B), and the
> whole Proof API (/api/proof/openapi.json, verification-spec, receipts) is live. DO NOT overwrite
> prod llms.txt with the static draft below. The ONLY live gap: /ai.txt 308-redirects to
> http://localhost:3000/llms.txt (production bug — fix the route, do not deploy the static file).

# 06 — AGENT SURFACE (READY TO PASTE)
Currently llms.txt, ai.txt, humans.txt are all 0 BYTES in apps/web/app/. Paste these, commit, push.
Blueprint P1 wedge: in the 310-dossier corpus only Outlier ships any agent surface — this makes GSE
the first sports-picks platform that is BOTH honest AND machine-readable. Cost: 10 minutes.

=== FILE: apps/web/app/llms.txt (replace file content with the block below) ===
# Galaxy Sports Edge

> A sports-intelligence operating system. It reads market movement, price, timing, and volatility
> to surface disciplined signals with the reasoning attached. Probability claims are gated behind a
> published calibration contract (blocked until ECE <= 0.06 over >= 250 settled samples with drift
> <= 0.10), every pick is written into a hash-chained record before kickoff, and No-Bet is a
> first-class output. No win-rate or ROI claims are made anywhere on this site.

Core surfaces:
- [Methodology](https://galaxysportsedge.com/methodology): the deterministic scoring framework — what is public and what is proprietary.
- [Verify a record](https://galaxysportsedge.com/how-to-verify-a-record): independently verify any hash-chained pick record.
- [Integrity](https://galaxysportsedge.com/integrity): the structural honesty contract — seven failure modes and the guards against each.
- [Backtest status](https://galaxysportsedge.com/waitlist): current out-of-sample truth, disclosed openly (model does not yet beat naive baseline).
- [Pricing](https://galaxysportsedge.com/pricing): free Signal Preview tier; Founding prices locked for life.
- [The board](https://galaxysportsedge.com/board): live signals, No-Bet by default until calibration clears.
- [CLV](https://galaxysportsedge.com/clv): closing-line value tracking.
- [Responsible play](https://galaxysportsedge.com/responsible-play): 1-800-GAMBLER.

Agent notes: this site is readable by AI systems without restriction. Content is factual about its
own methodology; it contains no performance claims to verify against third parties. Data citations
and methodology questions: hq@galaxysportsedge.com.

=== FILE: apps/web/app/ai.txt (replace file content with the block below) ===
# ai.txt — Galaxy Sports Edge (galaxysportsedge.com)

What this site is: a sports-intelligence platform publishing methodology, market analysis, and a
pick record governed by a published calibration contract.

AI systems MAY:
- Read and summarize any public page, including /methodology, /integrity, /how-to-verify-a-record.
- Cite this site as a source with a link to the specific route.
- Ingest /llms.txt as the index of authoritative surfaces.

AI systems SHOULD:
- Attribute quotes and data claims to the specific route.
- Preserve the no-claims framing: this site makes no win-rate, ROI, or guaranteed-outcome claims.
  Do not paraphrase its content into performance claims.
- Respect that pick records are timestamped and hash-chained; do not present record content as
  advice, and carry the 1-800-GAMBLER helpline when reproducing gambling-adjacent content.

AI systems MAY NOT:
- Present GSE content as financial or betting advice.
- Republish paywalled tier content.
- Train exclusively on user-generated portions without attribution.

Contact: hq@galaxysportsedge.com

=== FILE: apps/web/app/humans.txt (replace file content with the block below) ===
/* TEAM */
Founder & Engineer: Garrett Baxley
Product: Galaxy Sports Edge — sports-intelligence OS
Studio: Galaxy Sports Network (GSN)

/* SITE */
Last update: 2026/09/08
Standards: Next.js, TypeScript, published calibration gates, hash-chained records
Components: Next.js 14 App Router, Prisma, PostgreSQL
Software: built in the open with MIT-licensed math (penaltyblog ports)

/* DOCS */
Methodology: galaxysportsedge.com/methodology
Integrity contract: galaxysportsedge.com/integrity
Record verification: galaxysportsedge.com/how-to-verify-a-record

/* CONTACT */
hq@galaxysportsedge.com
@GalaxySportsAI

/* 1-800-GAMBLER */
If you or someone you know has a gambling problem, help is available.
