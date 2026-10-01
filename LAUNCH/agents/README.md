# LAUNCH/agents — the launch organization (2026-09-08, 23:55 UTC)

The founder's structure: one Chief Architect (the orchestrating Claude session,
session_017Nr5C9i9j9ucNP9s4KZCrJ) who reasons, delegates, monitors and verifies; ten agents
running in parallel, each with a handoff README here; Hermes on the founder's machine executing
`LAUNCH/13-HERMES-DISPATCH-2026-09-08.md`. Every agent runs on Opus or Sonnet, never on the
architect's model. The dashboard (a static HTML page the architect republishes at every check-in)
is the single place to read progress, blockers and the gate checklist.

| # | Agent | Model | Branch | Handoff | Owns |
|---|---|---|---|---|---|
| 1 | Prediction Engine | Opus | claude/launch-line-integrity | running (A1) | C-197 line integrity, void lane, re-grade tool; bake-off PR #722 via Deployment |
| 2 | Deployment | Opus | claude/launch-pr-steward | running (A2) | PRs #722 #723 #724 #725 to green; merge readiness table |
| 3 | Gates and Security posture | Sonnet | claude/launch-gate-matrix | running (A3) | gate matrix, StatKing rights gating, LIVE_BOARD, browser-agent script F |
| 4 | UI/UX | Sonnet | claude/launch-frontend-quality | running (A4) | C-93, C-224, F-24/F-28 copy |
| 5 | NFL Specialist | Sonnet | claude/agent-nfl | `nfl-specialist.md` | NFL data completeness for Week 1 |
| 6 | NCAA Specialist | Sonnet | claude/agent-ncaa | `ncaa-specialist.md` | NCAAF coverage, CFBD terms evidence, conference map |
| 7 | Testing / QA | Sonnet | claude/agent-testing | `testing-qa.md` | test gaps, no-store ratchet, tests that cannot fail |
| 8 | Marketing (draft-only) | Sonnet | claude/agent-marketing | `marketing.md` | LAUNCH/01/02/08 copy into code and drafts, zero claims |
| 9 | Fantasy Engine | Sonnet | claude/agent-fantasy | `fantasy-engine.md` | C-94, C-205, C-211, C-212, reproducible lineups |
| 10 | Security and Money Path | Opus | claude/agent-security-money | `security-money.md` | audits, C-181, C-91 decisions, Stripe posture block |
| H | Hermes (local) | founder's runner | hermes/p0-launch-fixes + hermes/<slug> | `../13-HERMES-DISPATCH-2026-09-08.md` | HP-1..HP-9 (P0s first; PR #726 open) |

Common law for every agent: Sports `CLAUDE.md` + `AGENTS.md` in full (never modify schema,
migrations, .github, scripts/guardrails, .claude, .env*, package-lock; never flip a gate; never
fabricate; never weaken a guard; no `any`; MODEL_VERSION frozen; one task one commit; claim a
ledger row; verify block typecheck/lint/vitest, guardrails + build before the PR; red-check every
test). Base `origin/main`; push only to the agent's branch; one draft PR; never merge. Usage is
limited: no parallel subagent fleets, two attempts then BLOCKED, commit early and often.
Mandatory pre-execution step (founder's rule): read the knowledge sources named in your handoff,
write 3–5 insights you will apply into your ledger row, cite the data point for each.
