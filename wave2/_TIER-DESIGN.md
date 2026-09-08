# Tier design: should DFS lineups be capped?

**Status:** PROPOSAL. Founder decision required.
**Date:** 2026-09-08
**Scope:** answers one question — cap DFS lineups per tier, yes or no — then designs the gate.
**Constraint honored:** no dollar amount in this document differs from
`apps/web/lib/pricing/pricing-phases.ts`. No autonomous edit to that file is proposed.
Every price below is the FOUNDING row already in the repo.

---

## 1. The answer

**No. Do not cap lineup count as a paywall. Cap it only as a disclosed browser-performance
ceiling, set the same for every paid tier, and then advertise the absence of the cap.**

The gate goes somewhere else: **on the data the optimizer eats, and on the server-side
artifacts built from it** — real projections, ownership, variance, contest-field grading,
saved portfolios, export. Those cost GSE money to produce. Lineup count does not.

Three findings drive this, in order of force.

### 1.1 GSE's lineup count has no cost basis. Every competitor's does.

The category caps lineups because lineups cost the vendor server compute. That is visible
in the dossiers: Stokastic's real boundary is not the lineups you build but the **size of
the simulated opposing field** you are graded against — "10,000 if you are a Sims Max user
and 500 on the base Sims package." That is a simulation bill. FantasyLabs publishes a
300-lineup cap and **no** cap on sims, exports, or seats, because (per that dossier) "the
sim count is precomputed server-side and never exposed to the user at all." SaberSim gates
contest-specific simulation at $297. In all three the meter sits on the vendor's own CPU.

GSE's optimizer does not run on GSE's CPU. Verified in code:

- `apps/web/components/fantasy/dfs-optimizer.tsx:1` — `"use client"`.
- `:14` — `import { generateLineups } from "@/lib/fantasy/dfs-optimizer"`.
- `:38` — `generateLineups(...)` is called directly in the browser, synchronously.
- `apps/web/app/api/dfs/` contains exactly one route: `salaries/route.ts`. **There is no
  optimizer API route.** No solve request ever reaches a server.

So the marginal cost to GSE of a user's 500th lineup is **zero**. It is spent on the user's
own battery. Charging for it is metering a resource GSE does not own and does not pay for.

### 1.2 A cap makes GSE look worse on the exact axis the category shops on, for no revenue.

Lineup count is the category's headline number, and it is the one place GSE's architecture
is structurally superior. Put the published caps against the published prices:

| Product | Lineup cap | Price |
|---|---|---|
| FantasyLabs All Access | 300 per sport, per run | $69.95/mo |
| SaberSim Starter | 500 at a time | $97/mo |
| Stokastic NFL Core | 2,000 | $149.95/mo |
| Stokastic NFL Max | 10,000 classic / 50,000 showdown | $229.95/mo |
| **GSE Pro (today)** | **20 — a client slider** | **$14.99/mo** |

Capping at 20 offers 1/25th of SaberSim Starter's capacity at 1/6th its price, and invites
the only comparison GSE loses. Removing the cap wins a comparison GSE cannot lose, because
the competitors' caps are load-bearing on their unit economics and GSE's is not. **This is a
free wedge. Spending it on a paywall trades a durable marketing asset for revenue that a
capped tier would not actually capture.**

### 1.3 A lineup cap is off-brand in the specific way this product is built to avoid.

Rule 8 is "We're not AI. We're math you can read." A lineup cap is a meter on arithmetic
the user's own machine performed. Worse, the category's cap has a documented failure mode
that is precisely GSE's differentiator: on Stokastic's base tier a subscriber's lineups are
graded against a synthetic **500-entry** field while the contest they are actually entering
is far larger. That cap does not make the output *smaller*. It makes the output *wrong*,
silently. GSE's entire premise is not doing that.

**Counter-argument, stated fairly:** the category prices this way, so buyers are trained to
read a lineup number as the product ladder, and an uncapped tier may read as "no premium
tier exists." That is a real risk and it is why §3 puts a *named, visible* boundary in its
place. The answer to "what does Pro get?" must not be "nothing you can point at" — it must
be "contest-specific grading," which is the same boundary SaberSim charges $297 for.

---

## 2. Where the cap is enforced today: nowhere

Today's entire cap is one attribute:

```
apps/web/components/fantasy/dfs-optimizer.tsx:26   const [count, setCount] = useState(3);
apps/web/components/fantasy/dfs-optimizer.tsx:95   <input type="range" min={1} max={20} value={count} ... />
```

This is not a weak paywall. It is **not a paywall at all**, and it is important to be precise
about why: since `generateLineups` runs in the browser, a user does not need to defeat the
slider. They can call the imported function directly from the devtools console with any
count they like. There is no server in the path to enforce against.

**CLAUDE.md rule 3 — "No frontend-only paywalls — enforcement is server-side only" —
therefore forbids attaching any tier claim to this control as it stands.** If the founder
wanted lineup caps to be the gate anyway, the honest prerequisite is moving the solver
server-side: a new `POST /api/dfs/solve`, with GSE then paying the compute bill it currently
does not pay, in order to manufacture a scarcity that does not currently exist. **That is
paying real money to create an artificial limit.** It is the strongest practical argument
against choosing lineups as the gate.

The good news is that the gate does not require moving the solver at all — see §4.

---

## 3. Proposed tier table

Every dollar figure is the existing FOUNDING row, unchanged. The **Status** column is
load-bearing: it separates what ships today from what must be built before it can be sold.
Nothing in the "MUST BUILD" rows may appear in pricing copy until it exists (law 8, rule 2).

### 3.1 DFS-specific limits

| Limit | Free $0 | Fantasy $4.99 | Pro $14.99 | Elite $24.99 | Status |
|---|---|---|---|---|---|
| **Lineups per solve** | **50** | **250** | **250** | **250** | ships today (slider value change) |
| Nature of that number | disclosed browser ceiling, not a plan limit — identical for every paying customer | | | | |
| Slate: illustrative/fictional | ✅ | ✅ | ✅ | ✅ | ships today |
| Slate: your own DK CSV import | ✅ | ✅ | ✅ | ✅ | ships today — never gate a user's own file |
| **GSE projections on the live slate** | ❌ | ✅ | ✅ | ✅ | **MUST BUILD** |
| **Ownership projection (`Own%`)** | ❌ | ✅ | ✅ | ✅ | **MUST BUILD** |
| **Per-player variance (`StdDev`)** | ❌ | ✅ | ✅ | ✅ | **MUST BUILD** |
| Objectives: Cash / GPP / Leverage | ✅ | ✅ | ✅ | ✅ | ships today |
| Stacking, locks, excludes | ✅ | ✅ | ✅ | ✅ | ships today |
| Exposure report across portfolio | ✅ | ✅ | ✅ | ✅ | ships today |
| Saved portfolios | 0 | 10 | unlimited | unlimited | MUST BUILD (server) |
| CSV export to DK/FD | ❌ | ✅ | ✅ | ✅ | MUST BUILD (server) |
| **Contest-specific field grading** | ❌ | ❌ | ✅ | ✅ | **MUST BUILD — this is the Pro boundary** |
| Simulated field size | — | generic field | true contest size | true contest size | MUST BUILD |
| Late swap | ❌ | ❌ | ❌ | ✅ | MUST BUILD |
| Slate sports covered | 1 | all in-season | all in-season | all in-season | MUST BUILD |

**The named boundary at each step, in one line each:**

- **Free → Fantasy ($4.99):** you stop optimizing fictional players. Real projections,
  ownership and variance. *This is a data gate, server-enforceable today.*
- **Fantasy → Pro ($14.99):** your lineups stop being graded against a generic field and
  start being graded against the contest you are actually entering. *This is the boundary
  SaberSim sells at $297 and Stokastic degrades silently at its base tier.*
- **Pro → Elite ($24.99):** late swap, and the CLV/line-value ledger already in the ladder.

**Why 50 / 250 / 250 / 250 and not 0 / 20 / 300 / 500:**
Free gets 50 because the slate is fictional — a demo should demonstrate. Paid tiers get an
identical number because a differing number would re-import the meter this document argues
against. 250 is chosen to sit at the top of the published category band (FantasyLabs 300,
SaberSim 500) while remaining a browser-safe figure.

> **NOT MEASURED — must be benchmarked before shipping.** 250 is a proposal, not a result.
> `generateLineups` is synchronous on the main thread and solves an exact DP per lineup
> (`apps/web/lib/fantasy/dfs-optimizer.ts:478`; complexity noted at `:37` as
> `O(teamRuns × players × countStates × stackDim × salaryStates)`), plus dedup retries
> (`MAX_DEDUP_RETRIES`, `:465`) and possible full rebuilds against a decreasing `target`.
> At 250 that is ≥250 DP solves blocking the tab. **Set the shipped ceiling from a measured
> p95 on a mid-range phone, and if the honest number is 80, ship 80 and say so.** Publishing
> 250 because it beats FantasyLabs, when the tab freezes at 120, would be exactly the kind
> of unbacked number this repo forbids. If the measured ceiling is embarrassingly low, the
> fix is to move the solve to a Web Worker — still the user's CPU, still $0 to GSE.

### 3.2 The betting-picks tiers are unchanged

Nothing in this proposal alters the picks ladder in CLAUDE.md: Free 2 picks/day teaser,
Pro full board + confidence + factor trail, Elite + alerts + CLV ledger. Fantasy continues
to see the free picks teaser, not the full board.

---

## 4. Where enforcement must live

**The elegant result: the solver does not need to move server-side. Gate what it eats.**

The repo has already solved this exact problem once, and the doctrine is written down in
`apps/web/lib/fantasy/free-trial.ts:1-15`:

> "A client-side `.slice()` does not enforce anything because the full pool would still be
> serialized into the FREE client's payload and readable from the network response. So the
> trim must happen on the SERVER, before the data crosses to the client."

Apply that verbatim to DFS. A client-side optimizer running 10,000 lineups on **fictional
players** is worth nothing. The value is real projections, `Own%` and `StdDev` — and those
arrive over the wire from a server route, which is enforceable.

### Layer 1 — the paid inputs (the real gate)

`GET /api/dfs/salaries/route.ts` already exists and is already a server route. Extend it to
carry the live slate, and gate the **fields**, not the rows:

- FREE / anonymous: salary + name + position only. The `projection`, `floor`, `ceiling` and
  `ownership` fields are **never serialized into the response**.
- FANTASY / PRO / ELITE: full payload.
- Use the existing helper — `requireFantasyApiRateLimited("dfs/slate")`
  (`apps/web/lib/api-entitlement.ts:211`), which applies the FANTASY|PRO|ELITE floor and
  then a per-user limiter, gate strictly before limiter so the paywall is never masked
  by a 429. Precedent in production use: `apps/web/app/api/tools/lineup/route.ts:13`.
- Follow `poolForViewer` (`free-trial.ts:47`) for the shape: one server function returns
  the viewer-appropriate payload; the client renders whatever it was given.

### Layer 2 — the server artifacts

Each needs a route, each uses the same helper, each is genuinely server-side work:

| Artifact | Route | Guard | Floor |
|---|---|---|---|
| Saved portfolios | `/api/dfs/portfolios` | `requireFantasyApiRateLimited("dfs/portfolios")` | FANTASY |
| CSV export | `/api/dfs/export` | `requireFantasyApiRateLimited("dfs/export")` | FANTASY |
| Contest-field grading | `/api/dfs/contest-sim` | `requirePremiumApiRateLimited("dfs/contest-sim")` | PRO |
| Late swap | `/api/dfs/late-swap` | `gateApi(e => e.tier === "ELITE", ...)` | ELITE |

`requirePremiumApiRateLimited` (`api-entitlement.ts:154`) is the PRO/ELITE floor and is the
correct guard for contest-specific grading — the one boundary that genuinely costs GSE
compute, and therefore the one that legitimately deserves a meter.

### Layer 3 — the lineup ceiling (NOT a paywall, and must never be described as one)

Keep it client-side. Change `max={20}` to the measured ceiling and label it honestly.
Because no tier claim attaches to it, rule 3 is not engaged. **The moment any copy implies
a paid tier gets more lineups, this becomes a frontend-only paywall and violates rule 3.**
Recommend a guardrail test asserting the ceiling constant is tier-independent, so a future
change cannot quietly turn it into a gate.

---

## 5. Upgrade prompt copy

Rule 8 applies to all of it: deterministic factor model, never "AI." No win rate, no ROI,
no accuracy claim — none is currently publishable (eligibility is RED; the settled record
is under investigation per `docs/ops/SCORE_INTEGRITY_2026-09-08.md`).

### 5.1 On the sample slate (Free) — the primary conversion moment

Replaces/extends the existing sample-slate banner at `dfs-optimizer.tsx:63-73`.

> **SAMPLE SLATE**
> These are fictional players with illustrative numbers — the optimizer is real, the
> players aren't. Two ways to run a real one:
> **Import your DraftKings CSV** — free, always, it's your file. You bring the projections.
> **Unlock the live slate** — GSE projections, field ownership and per-player variance,
> computed from the same factor model as the board. $4.99/mo.
> *[Import CSV] [See what's in the live slate]*

### 5.2 On a locked column (ownership / variance)

> **Ownership and variance are part of the live slate.**
> Leverage is ceiling against ownership — without the field's exposure, GPP mode is
> guessing at the contrarian half. Fantasy ($4.99/mo) turns both columns on.
> *[Unlock] [How ownership is computed]*

### 5.3 On contest-specific grading (the Pro boundary)

> **This portfolio is graded against a generic field.**
> Your lineups are ranked against a representative field, not the contest you're entering
> — and a single-entry contest and a 150-max are not the same problem. Pro grades against
> the real contest size and structure.
> **We'll say the part competitors don't:** until you upgrade, this ranking is directional,
> not contest-accurate. It doesn't know which contest you're in.
> *[Upgrade to Pro — $14.99/mo] [What changes exactly]*

The second paragraph is the whole positioning in one sentence. Stokastic's base tier grades
against a 500-entry synthetic field and does not tell the user. Saying it out loud converts
better than hiding it *and* it is the brand.

### 5.4 On hitting the lineup ceiling — explicitly NOT an upsell

> **250 lineups is this browser's ceiling — not your plan's.**
> Every GSE plan builds the same number of lineups. We don't meter arithmetic that runs on
> your own machine. Need a bigger portfolio? Export this set and run another.

**No upgrade button on this one.** A CTA here would convert the ceiling into an implied
paywall and re-engage rule 3.

### 5.5 Public pricing-page line

> **Unmetered lineups on every plan.** Competitors sell you 300 lineups for $69.95 and
> 500 for $97. Our optimizer runs in your browser, so lineup count costs us nothing — and
> we don't charge for it. You pay for the projections, the ownership, the variance, and
> grading against the contest you actually entered.

Every number in that paragraph is sourced from the vendors' own published pages
(FantasyLabs $69.95 / 300 lineups; SaberSim $97 / 500 lineups). Re-verify before publishing:
Stokastic raised monthly prices on 2026-09-01, so this band moves.

---

## 6. Migration: founding members

### 6.1 The problem the grandfather guarantee does not currently cover

`pricing-phases.ts:15-21` locks **price**, and states enforcement "lives at the Stripe
subscription (its price persists)." `GRANDFATHER_GUARANTEE` (`:174`) reads: *"Your price is
locked for the life of your subscription."*

**Stripe holds the price. Stripe does not hold feature limits.** Limits resolve from code
keyed off tier. So if a lineup cap or a data gate is added, a founding member's price stays
$14.99 while the product behind it silently shrinks. Their bill did not go up; **their
dollar bought less.** That is a price increase measured in value per dollar, and the current
guarantee's wording does not prohibit it.

Founding members bought a DFS optimizer that runs up to 20 lineups with no data gate. Anyone
who upgraded to reach the fantasy suite bought it on those terms.

### 6.2 The repo has already decided this

`free-trial.ts:12-13` records the governing precedent, verbatim:

> "The trial is a real, useful preview (**not a hard lock — the tools were free, so a
> takeaway is off the table per ENTITLEMENT_REMAP_SPEC**)"

GSE has already ruled that removing access someone already had is not done here. **Applying
a new gate below a founding member's current access would contradict a decision already
recorded in the codebase.** This is not a new principle to adopt; it is one to keep.

### 6.3 Proposed migration rule

1. **No founding member loses anything.** Every gate in §3 applies to **new subscriptions
   created after the policy version ships**. Existing subscribers keep current behavior.
2. **Founding members are additive-only.** When ownership/variance/contest grading ship,
   founding members at the tier that includes them get them. Their price does not move.
3. **The lineup ceiling rises for everyone**, founding included (20 → measured ceiling).
   It is a performance ceiling, not an entitlement, and raising it takes nothing away.
4. **Free users keep the sample-slate optimizer and their own CSV import, permanently.**
   Both ship today and both are free today; §6.2 forbids the takeaway.

### 6.4 The mechanism this requires

Price grandfathering works today because Stripe persists it. Limit grandfathering has no
such carrier and **must be built**:

- Stamp an **entitlement-policy version** on the subscription record at creation
  (e.g. `entitlementPolicyVersion`, an integer, set once, never mutated).
- Resolve every DFS limit through a pure function `limitsFor(tier, policyVersion)`.
- **Default to the most generous policy when the field is absent or unrecognized.** This
  mirrors the existing fail-safe direction in `pricing-phases.ts:149-152` (unknown
  `PRICING_PHASE` falls back to FOUNDING rather than "guessing up") — an unknown value must
  never silently take something away from a real subscriber.
- Unit-test the founding case explicitly: a v0 subscription must resolve to uncapped-slate
  behavior even after v1 gates ship.

Without this, "grandfathered for life" becomes true of the price and false of the product,
which on a product whose entire premise is not lying about itself is a bad trade at any
conversion rate.

### 6.5 Extend the guarantee wording

Recommend the founder extend `GRANDFATHER_GUARANTEE` from price to access. Proposed text —
**not applied; `pricing-phases.ts` is a founder decision:**

> "Your price is locked for the life of your subscription, and so is your access. When
> prices rise for new members, yours never does — and when limits are introduced, they
> apply to new members, never to you."

---

## 7. What must be true before any of this is sold

Preconditions, because §3 sells things that do not exist yet:

1. **The live slate must be real.** `dfs-slate.ts:1-7` is explicit: *"Fictional players,
   real team codes, illustrative numbers."* Today the DFS product is a demo plus the user's
   own CSV. **A tier cannot be sold on projections, ownership or variance until GSE actually
   produces them from real data** (rules 1 and 2, law 8).
2. **`Own%` and `StdDev` are the hard part, and the category confirms it.** The open-source
   dossier's finding is that the binding limit across the entire free stack is exactly these
   two columns: "TWO REQUIRED INPUT COLUMNS THAT NOTHING IN THE STACK PRODUCES." That is
   simultaneously the reason this gate is defensible and the reason it is real work.
3. **Contest-field grading is a genuine build**, not a flag. It is the one item here that
   will cost GSE server compute — which is precisely why it is the correct paid boundary.
4. **Benchmark the ceiling** (§3.1) before publishing a number.
5. **None of this is blocked by the calibration/settlement situation**, and none of it may
   be used to route around it. DFS tier copy makes no accuracy claim, so it does not touch
   the PROVEN gate. The picks-side ladder stays where it is.

---

## 8. One-paragraph answer for the founder

Don't cap lineups. Every competitor caps them because every competitor pays for them —
their sims run server-side. Ours runs in the user's browser, so lineup 500 costs us nothing,
and the current "cap" is a slider at `dfs-optimizer.tsx:95` with no server behind it, which
means it enforces nothing and can't be sold against under rule 3 anyway. Turning it into a
real gate would mean building a server optimizer so we can start paying for compute purely
to manufacture scarcity. Instead: raise the ceiling to a measured number, make it identical
on every plan, and say out loud that we don't meter arithmetic — that's a comparison we win
against $97 and $149.95 products. Put the money gate where the cost actually is: real
projections, ownership and variance at $4.99 (enforced by not serializing those fields to
free clients, exactly like `free-trial.ts` already does for the fantasy board), and
contest-specific grading at $14.99 — the same boundary SaberSim charges $297 for and the
one Stokastic degrades silently without telling anyone. Founding members lose nothing: new
gates bind new subscriptions only, which needs a policy version stamped on the subscription
because Stripe carries our price guarantee but not our limits.
