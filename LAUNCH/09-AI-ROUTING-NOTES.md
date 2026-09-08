# 09 — AI LAYER ROUTING (zero-cost doctrine)
Repo rule: AI is content/support only — never the source of truth for numbers (CLAUDE.md: "Claude API — content generation only").
Launch-night routing guidance (user doctrine: zero-cost first):
- Draft copy, glossary blurbs, social variants: Beexly flash lane (bai/glm-5.3-flash) or free OpenRouter lane — already configured in this workspace.
- NEVER route: pick probabilities, calibration numbers, odds math, record hashes. Those are engine-only by design; the methodology copy (02 §5) says so publicly.
- If AI-generated text touches any stat, it must quote the engine artifact (glass receipt / metric evidence card) — the repo already builds metric-evidence-cards.ts for exactly this.
- Compliance: run anything customer-facing past the repo compliance scanner rules (lib/compliance-scanner/rules) — the no-claims doctrine is enforced by tests (gse-waitlist.test.ts).
