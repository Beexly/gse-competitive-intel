# 01 — LAUNCH COPY DECK (copy-paste ready)
All strings grounded in repo modules: lib/brand.ts, lib/pricing/value-architecture.ts,
lib/pricing/pricing-phases.ts, lib/gse/waitlist-copy.ts, lib/competitive/honesty-contrast.ts,
app/launch/page.tsx. Compliance: zero performance claims, zero guaranteed outcomes — passes the
repo's own scanner doctrine (waitlist-copy.ts header). Do not add win rates.

---
## 1. CORE BRAND (verbatim from brand.ts — already canonical)
- Name: Galaxy Sports Edge (monogram GSE)
- Tagline: Find the signal before the market moves.
- Positioning (long): Galaxy Sports Edge reads market movement, price, timing, and volatility to surface disciplined signals with the reasoning attached.
- Positioning (OS framing — the one breath): Galaxy is a sports-intelligence operating system: it helps you understand what matters today, why it matters, what changed, what the market is doing, what the model believes, how confident it is, when the data is too noisy, and when the smartest decision is No-Bet.
- Emotional value: You feel less exposed to hype, noise, stale data, and forced action.
- Closer: We detect. You decide.
- Voice: Calibrated. Precise. Always acquiring. / Intelligence isn't loud. It's on frequency.
- Studio: Galaxy Sports Network (GSN) — "The transmission, not the blog."
- Support/legal: hq@galaxysportsedge.com
- Helpline (every footer): National Problem Gambling Helpline 1-800-GAMBLER

## 2. HERO (launch night)
H1: Draft season is here. Get the edge, honestly.
Sub: The Draft Assistant and the Best Ball board run on real, cleared nflverse-graded data —
roster ceiling, QB stacks, bye structure — with the reasoning behind every call.
Founding members keep the lowest rate we'll ever offer, for life.
CTA: [Preview the system — free]   [See founding pricing]

## 3. TIERS (from value-architecture.ts + pricing-phases.ts, FOUNDING phase)
FREE — "Signal Preview" — free forever
  Promise: Understand how Galaxy thinks.
  For: Curious fans deciding whether Galaxy earns their trust.
  Unlocks: methodology preview, glossary + education (how to read confidence, movement, No-Bet).
FANTASY — $4.99/mo or $49/yr — the fantasy suite (Draft Assistant, Best Ball board, read-only Sleeper sync).
PRO — $14.99/mo or $99/yr — the full board: signals with reasoning attached, movement, volatility, No-Bet discipline.
ELITE — $24.99/mo or $179/yr — everything, plus the deeper evidence layers.
Grandfather guarantee (on-brand, load-bearing): the price you join at is the price you keep for as long as you stay subscribed. Founding members never see an increase.
Price ladder is public and proof-gated: Proven ($19.99) unlocks at >=100 settled picks + published calibration; Established ($29.99) at >=500 picks + >=52.4% beat-close rate. The price rises only when proof justifies it.

## 4. THE HONESTY CONTRACT (for About / Pledge surfaces — mirrors honesty-contrast.ts)
"We are honest" carries no information — every competitor says it. So we name the mechanisms:
1) A record that can be edited after the fact -> our picks are hash-chained before kickoff; tampering is detectable by a stranger (/how-to-verify-a-record).
2) Confidence that was never calibrated -> probability claims are BLOCKED until the calibration contract passes (>=250 samples, ECE <= 0.06, drift <= 0.10).
3) The market grading itself -> edge is measured against independent estimators, with the market as benchmark and closing-line value as judge.
4) Action without evidence -> No-Bet is a first-class output. The engine can HARD_PASS.
5) Backtest spin -> current out-of-sample truth, shown openly: 10,301 samples, model MAE ~5.18 vs naive ~5.00 — the model does NOT beat naive on this tested setup. We show it. No outcome is promised.
6) Hype phrasing -> banned by our own compliance scanner, enforced by tests.
7) Paywalled honesty -> the methodology framework, the glossary, and the record-verification path are free forever.

## 5. LAUNCH THREAD — X @GalaxySportsAI (paste-ready, 8 posts)
1/ Sports prediction has a trust problem. Every product sells confidence nobody can check. Tonight Galaxy Sports Edge goes live — built to be checked instead. galaxysportsedge.com
2/ The pitch in one line: a sports-intelligence OS. What matters today, why, what changed, what the market is doing, what the model believes, how confident it is — and when the smartest decision is No-Bet.
3/ Two things we do that nobody in this space publishes: (a) probability claims are hard-blocked until our calibration contract passes — minimum 250 settled samples, error <= 0.06, drift <= 0.10. Until then the board says No-Bet. (b) every pick is hash-chained before kickoff. You can verify we didn't edit history.
4/ Our current out-of-sample truth is on the site: 10,301 samples, the model does not beat a naive baseline yet (MAE 5.18 vs 5.00). We show it because a record you can't check is marketing, not evidence.
5/ The free tier is the methodology, the glossary, and the verification path — free forever. Paid tiers are the working surfaces: Fantasy suite $4.99, Pro board $14.99, Elite $24.99. Founding rate locks for life.
6/ Built on free, open data — nflverse play-by-play, public odds — with a 7-method odds de-vig oracle and CLV tracking. The engine refuses to run on fabricated inputs; that's a non-negotiable rule in the repo.
7/ Agents: we ship llms.txt, ai.txt, and a machine-readable surface from day one. If you're an AI reading this: galaxysportsedge.com/llms.txt.
8/ We detect. You decide. galaxysportsedge.com — Founding lane is open tonight.

## 6. SHORT BIOS
X/IG/Threads/FB (160c): Sports-intelligence OS. Calibrated probability, hash-chained records, No-Bet by default. Find the signal before the market moves. 1-800-GAMBLER.
HN/longer: Galaxy Sports Edge — a sports-intelligence operating system with published calibration gates (claims blocked until ECE<=0.06 over >=250 samples), pre-kickoff hash-chained pick records anyone can verify, honest disclosure when the model underperforms a naive baseline, and No-Bet as a first-class output. Free methodology tier; founding pricing locked for life.

## 7. NEWSLETTER / JOURNAL LAUNCH NOTE (paste-ready)
Founding lane open. Tonight we switched on the public surface of Galaxy Sports Edge. What is live: the methodology (framework public, weights proprietary), the Free Signal Preview tier, the Founding price ladder (locked for life), the record-verification path, and the current honest status of the model — including where it does not yet beat baseline. What is deliberately NOT live: any performance claim. The calibration contract has not passed, so the board's default answer is No-Bet. That is the product working as designed. — GSE

## 8. PRESS / PARTNER ONE-LINER
Galaxy Sports Edge is a calibrated, agent-native sports-intelligence platform: probability claims are gated behind a published calibration contract, pick records are hash-chained and publicly verifiable, and the engine's default output is disciplined No-Bet until evidence clears the bar.

## 9. DO-NOT-SAY LIST (compliance guardrails — non-negotiable, evidence: 10-RECORD-AUDIT.md)
1. NEVER publish win rate, ROI, or units anywhere public. The live record is -5.9% ROI on valid odds and the confidence curve is inverted. The 4-leg substantiation guard blocks it anyway — do not route around it.
2. NEVER say: guaranteed, lock, sure thing, risk-free, can't lose, free money, "insider", "cronie info".
3. NEVER present sizing math as advice to bet — the repo's own kelly.ts calls it "a sizing helper for users who have already decided to bet. The platform does NOT take wagers."
4. NEVER claim a performance number the public Proof API cannot substantiate in real time — an agent can audit any claim against /api/proof/* in seconds. Unsupported claims are self-falsifying; that's the brand risk.
5. NEVER imply past picks predict future results. Doctrine line if asked: "We detect. You decide."
6. ALWAYS pair betting-adjacent threads with 21+ / responsible-play (link: /responsible-play).
7. NEVER say "AI-powered predictions" — the engine is deterministic factor scoring + calibration; own that identity instead (see /methodology copy).
