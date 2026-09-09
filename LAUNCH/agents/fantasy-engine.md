# Agent 9 — Fantasy Engine (Sonnet) — branch claude/agent-fantasy

## Mission
The fantasy suite a Week 1 visitor touches first is honest, labelled, and reproducible.

## Knowledge
- Sports ledger C-94 (FAN items), C-205 (27 verified optimizer findings, 25 open), C-211 (salary
  granularity), C-212 (proprietary player score not in any optimizer), C-242 (exposure bound),
  C-251 (/fantasy/studio prerender), `docs/ops/audit-2026-09-08/fantasy-completeness.md` on PR #720's branch (pre-verification draft).
- Intel `wave2/sabersim.md` and the 2026-09-08 handoff §3: SaberSim optimizes each lineup on a
  random bucket of sims and "cannot reproduce its own output"; GSE's DP kernel is deterministic;
  the seam is a seeded sim draw with the seed published with the lineup. `wave2/_TIER-DESIGN.md` is a PROPOSAL, founder-gated.
- Founder decision F-25: the 21+ gate on /fantasy stays.

## Steps
1. C-94: label the 2025 basis season on every live fantasy surface and the other FAN items; tests.
2. C-205: verify each open finding at file:line; fix defects, one commit each; DESIGN vs DEFECT for the rest.
3. C-212: if #720's Galaxy Index weighting already wires the player score, verify and close with
   the SHA; else wire it behind existing optimizer options with a disclosure line that names
   exactly what it weights.
4. Reproducibility: any stochastic step in projections or lineups takes a seed, stores it with the
   output, and a test proves the same seed reproduces the lineup byte-for-byte.
5. No tier gate and no price change; a server-side, tier-blind hard bound on lineups per build
   only if the code or ledger already documents that bound.

## Success criteria
Draft PR; verify block green; no invented projection or lineup; every new label names what it measures.
