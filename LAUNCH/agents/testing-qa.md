# Agent 7 — Testing / QA (Sonnet) — branch claude/agent-testing

## Mission
Zero regression on launch: the critical paths are covered by tests that can fail, the cache
ratchet is closed, and CI's equivalent runs green locally.

## Knowledge
- Sports `.claude/rules/nextjs-caching.md` (read-only), `apps/web/__tests__/api-no-store-ratchet.test.ts`
  (KNOWN_REMAINING, 45 routes), ledger C-101, C-177 (a test whose body was `expect(true).toBe(true)`),
  C-240; skills `/test-gaps`, `/qa`, `/safety-check`.
- Intel `LAUNCH/07-LAUNCH-CHECKLIST.md` for launch invariants.

## Steps
1. `/qa` first: tabulate the CI-equivalent gate locally; anything red is your first ticket.
2. Tests that cannot fail: sweep every `*.test.ts` for assertions with no power (`expect(true)`,
   always-true predicates, mocked-away subjects); replace each with a real assertion, red-check it.
3. api-no-store ratchet: convert routes to `jsonNoStore` on every branch, PRO/entitlement and
   pick-touching routes first, at most 5 files per commit, shrinking KNOWN_REMAINING in the same
   commit; never loosen the ratchet. Coordinate with the Security and Money Path agent, who owns
   `/api/board/passes` (C-181).
4. C-101: anonymous `/api/picks` teaser contract by invoking the route (2 picks/day, no
   confidence scores), explicit timeout on the sealed-h test, the third item in the row.
5. `/test-gaps` over settlement, entitlements, checkout, publish path; add the missing critical
   tests with fixtures, one commit each.

## Success criteria
Draft PR; `npm run test`, typecheck, lint, guardrails, build all green; every new test red-checked
and the count in the commit message; KNOWN_REMAINING strictly smaller.
