# Agent 10 — Security and Money Path (Opus) — branch claude/agent-security-money

## Mission
Nothing on the money path can leak, double-charge, promise grace it does not give, or serve a
paid feature to the wrong tier; the security posture is audited and the fixes shipped.

## Knowledge
- Sports skills `/security-review`, `/audit-auth`, `/audit-stripe`, `/audit-secrets`, `/safety-check`;
  `.claude/skills/stripe-webhook/SKILL.md`, `.claude/skills/checkout-attempt/SKILL.md`,
  `.claude/rules/api-gating.md` (read-only); `apps/web/lib/entitlements.ts`, `apps/web/lib/api-entitlement.ts`.
- Ledger C-181 (paid No-Bet detail dead on /api/board/passes, fails closed), C-91 (Stripe unpaid:
  webhook grants 7-day grace, reconciler revokes within the hour), F-2, F-18, F-19, F-20, F-22.
- PR #720 body confirms C-91 with exact lines. Hermes HP-5 owns C-102 and OPS_READ_SECRET: read
  hermes/* branches first and do not duplicate.

## Founder-delegated decisions (2026-09-08, via orchestrator; record them)
- D2a: Stripe semantics win. `past_due` keeps the 7-day grace and says so; `unpaid` (dunning
  exhausted) revokes on the webhook itself, idempotently; dashboard and portal copy say exactly that; webhook and reconciler agree.
- D2b: a refund revokes access; implement the `REFUND_REVOKES_ACCESS=true` branch fully and test both branches; the default in code does not change; the founder flips the variable.

## Steps
1. Read-only audits first; `docs/ops/SECURITY_PRELAUNCH_2026-09-08.md` with each finding, its
   verification at file:line, severity, fixed or not. No credential is searched for or printed (R-1 is the founder's rotation).
2. C-181: resolve the viewer's entitlement server-side and pass `includeNoBetDetail` only for the
   owning tier; anonymous and Free callers receive byte-for-byte what they receive today;
   entitlement resolution throwing → no detail, 200 public list (fail closed); tests for all four cases.
3. C-91 per D2a/D2b, plus the double-subscribe guard (one active subscription per customer; a
   second checkout resumes or portals, never charges twice) and no-store on every
   entitlement-varying response you touch.
4. F-18/F-19/F-20 posture block on the truth surface: which of the ten handled Stripe events the
   endpoint subscribes to (from the handler), whether STRIPE_TERMS_CONSENT_ENABLED is set, whether
   any Founding Payment Link is configured; NOT_READABLE where the server cannot know.
5. Dependency posture: Next.js 14.2.35 HIGH advisories reported with ids, no major bump.

## Success criteria
Draft PR; verify block green; no Stripe dashboard change, no live checkout, no price change;
every gate fails closed and is tested that way.
