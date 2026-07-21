# GSE/GSN + Claude Code: 33-Repo Integration Plan

> Completed: 2026-07-21
> Branch: claude/ecc-gse-gsn-commands-weaxnk
> All remote-executable integrations shipped to beexly/Sports on same branch

---

## What Was Done (This Session)

### 1. New slash commands added to `/workspace/sports/.claude/commands/`

Adapted from ECC, Superpowers, Hallmark, Strix, and no-mistakes:

| Command | Source | Purpose |
|---|---|---|
| `/plan` | affaan-m/ECC | Implementation planning with pattern grounding — no code until approved |
| `/code-review` | affaan-m/ECC | Local diff + PR review, 7-category checklist, GSN-specific rules |
| `/build-fix` | affaan-m/ECC | One-error-at-a-time incremental error resolution |
| `/refactor-clean` | affaan-m/ECC | Dead code removal with SAFE/CAUTION/DANGER risk levels |
| `/quality-gate` | affaan-m/ECC | Full suite: typecheck + lint + guardrails + 10,281 tests |
| `/test-coverage` | affaan-m/ECC | Coverage gap analysis toward 80%+ with GSN critical gaps list |
| `/checkpoint` | affaan-m/ECC | Workflow state management — create/verify/list checkpoints |
| `/multi-plan` | affaan-m/ECC | Multi-model parallel feature planning |
| `/tdd` | obra/superpowers | Red-Green-Refactor TDD cycle with GSN vitest patterns |
| `/learn` | affaan-m/ECC | Extract session patterns to reusable skill files |
| `/security-pentest` | usestrix/strix | OWASP static analysis + Strix dynamic testing integration |
| `/push-safe` | kunchenguid/no-mistakes | Pre-push gate: secrets scan + quality gate + target check |
| `/hallmark` | Nutlope/hallmark | 58-gate anti-slop UI audit + design token enforcement |
| `/market-research` | Panniantong/Agent-Reach | Multi-platform sports market intelligence |
| `/multi-plan` | affaan-m/ECC | Multi-model collaborative feature planning |

### 2. CLAUDE.md updated

Added to `/workspace/sports/CLAUDE.md`:
- Karpathy's 4 coding principles (from multica-ai/andrej-karpathy-skills)
- Full slash command reference table
- Hallmark design rules (anti-slop UI gates)

### 3. Integration guides created

In `/workspace/sports/docs/ai/integrations/`:
- `ECC-FRAMEWORK.md` — ECC plugin install, top skills, hook architecture
- `OMNI-ROUTE-GATEWAY.md` — OmniRoute multi-provider AI gateway
- `CODEBASE-MEMORY-MCP.md` — codebase-memory-mcp install and query guide
- `STRIX-SECURITY.md` — Strix dynamic pentesting for GSN
- `AGENT-REACH-RESEARCH.md` — Agent-Reach market research setup

---

## Local Machine Setup (Do This Next)

These require your local machine — cannot be done in this remote session.

### Priority 1: Claude Code Plugins (install via marketplace)

```bash
# In Claude Code CLI or settings:

# ECC — 278 skills, 67 agents, learning system
/plugin marketplace add https://github.com/affaan-m/ECC
/plugin install ecc@ecc

# PM skills — /ship-check /document-app /derive-tests /security-audit-static
/plugin marketplace add phuryn/pm-skills
/plugin install pm-skills@pm-skills

# Hallmark — 58-gate anti-slop design skill
npx skills add nutlope/hallmark
# or: /plugin marketplace add nutlope/hallmark

# Superpowers — TDD, systematic debugging, code review, git worktrees
/plugin marketplace add obra/superpowers
/plugin install superpowers@superpowers

# Karpathy skills — 4-principle minimal coding guidelines
/plugin marketplace add multica-ai/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills

# Last30days — Polymarket + Reddit + Twitter + HN research
/plugin marketplace add mvanhorn/last30days-skill
/plugin install last30days-skill@last30days
```

### Priority 2: MCP Servers (add to `~/.claude/config.json`)

```json
{
  "mcpServers": {
    "codebase-memory": {
      "command": "codebase-memory-mcp",
      "args": ["serve"]
    },
    "desktop-commander": {
      "command": "npx",
      "args": ["-y", "@wonderwhy-er/desktop-commander"]
    },
    "agent-reach": {
      "command": "agent-reach",
      "args": ["mcp", "serve"]
    }
  }
}
```

**Install commands:**
```bash
# codebase-memory-mcp (code intelligence knowledge graph)
curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash
codebase-memory-mcp index /path/to/sports --project gsn

# DesktopCommanderMCP (terminal control in Claude Code)
npx -y @wonderwhy-er/desktop-commander

# Agent-Reach (Twitter/Reddit/YouTube/GitHub research)
pip install agent-reach && agent-reach install && agent-reach doctor
```

### Priority 3: Tools to Try

```bash
# no-mistakes — AI git push gate (intercepts push, runs review + tests)
curl -fsSL https://raw.githubusercontent.com/kunchenguid/no-mistakes/main/docs/install.sh | sh
# Then push via: git push no-mistakes

# OmniRoute — AI gateway with 268+ providers + token compression
# Clone and run: npx omni-route install
# Or Docker: docker run -p 20128:20128 diegosouzapw/omni-route:latest
# Then in .env.local: OMNI_ROUTE_URL=http://localhost:20128/v1

# Strix — AI pentesting (requires Docker)
docker pull usestrix/strix:latest
# Run against local GSN: strix --target http://localhost:3000 --instruction "Full auth audit"

# herdr — agent multiplexer terminal
# From ogulcancelik/herdr — runs multiple Claude Code instances concurrently
# Install: cargo install herdr (Rust-based)

# Agent-Reach already covered above
```

---

## Per-Repo Disposition (All 33 Repos)

### INTEGRATED INTO GSN (this session)

| Repo | What was added |
|---|---|
| `affaan-m/ECC` | 9 new slash commands, ECC-FRAMEWORK.md, CLAUDE.md update |
| `obra/superpowers` | `/tdd` command (TDD cycle), debugging patterns |
| `Nutlope/hallmark` | `/hallmark` command (58-gate audit), design rules in CLAUDE.md |
| `multica-ai/andrej-karpathy-skills` | 4 Karpathy principles in CLAUDE.md |
| `usestrix/strix` | `/security-pentest` command, STRIX-SECURITY.md |
| `kunchenguid/no-mistakes` | `/push-safe` command, no-mistakes local install guide |
| `Panniantong/Agent-Reach` | `/market-research` command, AGENT-REACH-RESEARCH.md |
| `diegosouzapw/OmniRoute` | OMNI-ROUTE-GATEWAY.md, Claude client integration guide |
| `DeusData/codebase-memory-mcp` | CODEBASE-MEMORY-MCP.md, MCP config guide |
| `MadsLorentzen/ai-job-search` | Agent framework patterns (referenced in multi-plan design) |

### INSTALL LOCALLY — CLAUDE CODE PLUGINS

| Repo | Action |
|---|---|
| `affaan-m/ECC` | `/plugin install ecc@ecc` |
| `phuryn/pm-skills` | `/plugin install pm-skills@pm-skills` |
| `mvanhorn/last30days-skill` | `/plugin install last30days-skill@last30days` |
| `obra/superpowers` | `/plugin install superpowers@superpowers` |
| `Nutlope/hallmark` | `npx skills add nutlope/hallmark` |
| `multica-ai/andrej-karpathy-skills` | `/plugin install andrej-karpathy-skills@karpathy-skills` |

### REFERENCE / STUDY ONLY (no code reuse needed)

| Repo | Reason |
|---|---|
| `NousResearch/hermes-agent` | Agent framework patterns — study architecture; Llama-based, not TypeScript-native |
| `Significant-Gravitas/AutoGPT` | Agent loop patterns — reference; too heavy for GSN's use case |
| `x1xhlol/system-prompts-and-models-of-ai-tools` | System prompt patterns — study for prompt engineering |
| `asgeirtj/system_prompts_leaks` | Extracted prompts — study Claude Code/Opus prompt structures |
| `Shubhamsaboo/awesome-llm-apps` | LLM app reference catalog — browse for pattern inspiration |
| `alibaba/page-agent` | Web GUI agent — reference JS-in-page patterns |
| `interviewstreet/hiring-agent` | Resume scoring agent — reference for scoring pipeline patterns |
| `calesthio/OpenMontage` | Video production pipelines — reference for content generation ideas |
| `stablyai/orca` | Parallel agent IDE — evaluate as alternative to Claude Code for fleet ops |
| `ogulcancelik/herdr` | Agent multiplexer — install locally (cargo install herdr) for multi-agent terminal |

### NOT APPLICABLE TO GSN

| Repo | Reason |
|---|---|
| `Raphire/Win11Debloat` | Windows system tool — no relevance to GSN TypeScript stack |
| `x64dbg/x64dbg` | C++ debugger — no relevance |
| `catchorg/Catch2` | C++ testing — GSN uses Vitest |
| `Zackriya-Solutions/meetily` | Local meeting transcription — no GSN relevance |
| `simplex-chat/simplex-chat` | Private messaging app — no GSN relevance |
| `ocornut/imgui` | C++ UI library — no GSN relevance |
| `iOfficeAI/OfficeCLI` | Office file automation — no GSN relevance |
| `gabime/spdlog` | C++ logging — no GSN relevance |
| `JCodesMore/ai-website-cloner-template` | Website cloner — no GSN relevance |
| `Robbyant/lingbot-map` | 3D scene reconstruction — no GSN relevance |
| `OpenCut-app/OpenCut` | Video editor — no GSN relevance |
| `wonderwhy-er/DesktopCommanderMCP` | Install locally as MCP server (documented above) |

---

## GSE Competitor Intel Repo (this repo)

Also see `docs/ai/airwave/GSE_GSN_REPO_INTEGRATION_PLAN.md` for the earlier nflverse/categraf/ESPN API integration plan.

The present document supersedes and extends it for the AI tool/agent layer.

---

## Wave 2: Next 5 Highest-Leverage Repos

> Added: 2026-07-21
> Branch: claude/ecc-gse-gsn-commands-weaxnk
> Integration guides: `/workspace/sports/docs/ai/integrations/`

### Why These 5 (300iq Reasoning)

Wave 1 added skills and audit tools — things that make Claude Code sessions smarter.
Wave 2 fills three gaps Wave 1 left open:

1. **Memory gap** — every Claude Code session starts cold; every GSN user gets generic picks
2. **Cost visibility gap** — AI calls are a black box; no per-user, per-model spend tracking
3. **Async automation gap** — all AI work is synchronous; nothing runs while you sleep

| Repo | Stars | Priority | Gap Filled |
|---|---|---|---|
| `modelcontextprotocol/servers` | 88k | CRITICAL | Native Claude Code tool protocol |
| `mem0ai/mem0` | 61k | HIGH | Cross-session memory (dev + user) |
| `BerriAI/litellm` | 54k | HIGH | AI gateway, cost tracking, multi-model |
| `All-Hands-AI/OpenHands` | ~50k | MEDIUM | Async dev automation, nightly agents |
| `simonw/llm` | 12k | MEDIUM | Shell-native AI, audit log, CI gates |

### INTEGRATED INTO GSN (this session, Wave 2)

| Repo | What Was Added |
|---|---|
| `modelcontextprotocol/servers` | `MCP-SERVERS.md` — filesystem/memory/git/fetch config + GSN query patterns |
| `mem0ai/mem0` | `MEM0-MEMORY.md` — per-user betting preference memory + dev session persistence; `/memory` slash command |
| `BerriAI/litellm` | `LITELLM-GATEWAY.md` — Docker proxy config, virtual keys per tier, pick A/B testing, MCP gateway |
| `All-Hands-AI/OpenHands` | `OPENHANDS-AGENT.md` — nightly health agent, schema migration automation, parallel fleet |
| `simonw/llm` | `LLM-CLI.md` — pipe patterns, audit log, CI model comparison; `/llm-query` slash command |

### LOCAL MACHINE SETUP (Wave 2)

```bash
# 1. MCP Servers — add to ~/.claude/claude_desktop_config.json
# (zero install — npx/uvx on demand)
# Config: see MCP-SERVERS.md

# 2. Mem0 — developer session memory CLI
npm install -g @mem0/cli
mem0 login  # authenticate with app.mem0.ai (free: 1,000 ops/month)
# Then run /memory seed from Claude Code to store GSN baseline

# 3. LiteLLM — AI gateway Docker container
pip install 'litellm[proxy]'  # for local dev
# OR
docker pull ghcr.io/berriai/litellm:main-latest
docker run -p 4000:4000 -e ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY ghcr.io/berriai/litellm:main-latest

# 4. LLM CLI — shell-native AI
pip install llm && llm install llm-anthropic
llm keys set anthropic
llm models default claude-haiku-4-5-20251001

# 5. OpenHands Agent Canvas
npm install -g @openhands/agent-canvas
# OR Docker: docker run -p 8000:8000 ghcr.io/openhands/agent-canvas:1
```

### Wave 2 — MCP Config Block

Complete config to add to `~/.claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem",
               "/workspace/sports", "/home/user/gse-competitive-intel"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "git": {
      "command": "uvx",
      "args": ["mcp-server-git", "--repository", "/workspace/sports"]
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    },
    "mem0": {
      "command": "mem0",
      "args": ["mcp", "serve"],
      "env": { "MEM0_API_KEY": "${MEM0_API_KEY}" }
    },
    "litellm": {
      "url": "http://localhost:4000/mcp/",
      "headers": { "x-litellm-api-key": "Bearer ${LITELLM_MASTER_KEY}" }
    }
  }
}
```

---

---

## Wave 3: Next 5 Highest-Leverage Repos

> Added: 2026-07-21
> Branch: claude/ecc-gse-gsn-commands-weaxnk
> Integration guides: `/workspace/sports/docs/ai/integrations/`

### Why These 5 (300iq Reasoning)

Wave 1 added skills/audit tools. Wave 2 filled memory, cost, and async gaps.
Wave 3 fills four remaining gaps:

1. **App-layer AI gap** — GSN calls `anthropic.messages.create()` directly. No streaming, no abort, no tool use in RSC. Users stare at loading spinners.
2. **Editor-level AI gap** — Claude Code is CLI-only. There's no AI inside the editor itself for quick, cursor-aware queries without context-switching.
3. **Secret history gap** — `/push-safe` scans staged files only. Secrets committed 6 months ago and later deleted still live in git history.
4. **Pick quality gap** — LiteLLM tracks cost. Nothing tracks whether the picks are actually good. Model upgrades could silently degrade pick accuracy.
5. **Observability gap** — No distributed tracing. When pick generation takes 4s, which step caused it? Which user costs $2/session?

| Repo | Stars | Priority | Gap Filled |
|---|---|---|---|
| `vercel/ai` | 14k | CRITICAL | App-layer AI gap — streaming, hooks, RSC tool use |
| `continuedev/continue` | 22k | HIGH | Editor-level AI gap — Claude inside VS Code |
| `trufflesecurity/trufflehog` | 18k | HIGH | Secret history gap — git history scan, CI integration |
| `microsoft/promptflow` | 10k | MEDIUM | Pick quality gap — prompt A/B testing, accuracy tracking |
| `agentops-ai/agentops` | 4k | MEDIUM | Observability gap — session tracing, per-user cost attribution |

### INTEGRATED INTO GSN (this session, Wave 3)

| Repo | What Was Added |
|---|---|
| `vercel/ai` | `VERCEL-AI-SDK.md` — streamText/streamObject/useChat patterns, LiteLLM routing, migration path |
| `continuedev/continue` | `CONTINUE-DEV.md` — VS Code config, repo-level GSN system message, custom slash commands |
| `trufflesecurity/trufflehog` | `TRUFFLEHOG-SECRETS.md` — full history scan, CI GitHub Actions step, pre-push hook; `/scan-secrets` slash command |
| `microsoft/promptflow` | `PROMPTFLOW-EVAL.md` — pick evaluation flow, ground truth dataset export, CI quality gate; `/eval-picks` slash command |
| `agentops-ai/agentops` | `AGENTOPS-OBSERVABILITY.md` — TypeScript SDK integration, BullMQ tracing, per-user cost attribution, alert config |

### LOCAL MACHINE SETUP (Wave 3)

```bash
# 1. Vercel AI SDK — add to Sports repo
cd /workspace/sports && npm install ai @ai-sdk/anthropic zod

# 2. Continue.dev — VS Code extension
code --install-extension Continue.continue
# Then configure ~/.continue/config.json with Claude Sonnet + Haiku (see CONTINUE-DEV.md)

# 3. TruffleHog — Docker (zero install)
docker pull trufflesecurity/trufflehog:latest
# Run immediate full scan:
docker run --rm -v "$PWD:/pwd" trufflesecurity/trufflehog:latest git file:///pwd --only-verified

# 4. PromptFlow — Python
pip install promptflow promptflow-tools promptflow-evals
# Set up evaluation flow: see PROMPTFLOW-EVAL.md

# 5. AgentOps — TypeScript
cd /workspace/sports && npm install agentops
# Get API key at app.agentops.ai (free: 10k sessions/month)
# Add AGENTOPS_API_KEY to .env.local and Vercel
```

### Wave 3 — Continue.dev Config Block

Complete `~/.continue/config.json` for GSN development:

```json
{
  "models": [
    {
      "title": "Claude Sonnet (fast)",
      "provider": "anthropic",
      "model": "claude-sonnet-4-20250514",
      "apiKey": "$ANTHROPIC_API_KEY"
    },
    {
      "title": "Claude Haiku (cheap)",
      "provider": "anthropic",
      "model": "claude-haiku-4-5-20251001",
      "apiKey": "$ANTHROPIC_API_KEY"
    }
  ],
  "tabAutocompleteModel": {
    "provider": "anthropic",
    "model": "claude-haiku-4-5-20251001",
    "apiKey": "$ANTHROPIC_API_KEY"
  },
  "contextProviders": [
    { "name": "diff" }, { "name": "repo-map" }, { "name": "file" },
    { "name": "terminal" }, { "name": "problems" }, { "name": "open" }
  ]
}
```

Plus `.continue/config.json` committed to the Sports repo root with the GSN system message (see CONTINUE-DEV.md).

---

## Next Steps (Priority Order — Updated)

**This week (Wave 1 + Wave 2 local setup):**
1. Install Claude Code plugins locally (ECC, pm-skills, hallmark, superpowers, karpathy-skills, last30days)
2. Install `codebase-memory-mcp` and index the Sports repo
3. Add MCP servers (filesystem, memory, git, fetch) to `~/.claude/claude_desktop_config.json`
4. `npm install -g @mem0/cli && mem0 login` → run `/memory seed` in Claude Code
5. Run `/security-pentest` against local GSN instance

**This week (Wave 3 additions):**
6. **NEW** `code --install-extension Continue.continue` → configure with Claude (see CONTINUE-DEV.md)
7. **NEW** `docker pull trufflesecurity/trufflehog:latest` → run `/scan-secrets` on full Sports repo history
8. **NEW** `npm install ai @ai-sdk/anthropic` → create streaming picks endpoint (see VERCEL-AI-SDK.md)

**Next week:**
9. Install Strix (Docker) and run dynamic auth bypass scan
10. Deploy LiteLLM Docker container → update `ANTHROPIC_API_KEY` usage to `LITELLM_URL`
11. `pip install llm && llm install llm-anthropic` → start using `/llm-query` for pre-screening
12. Run `/refactor-clean` on `packages/data-ingestion/src/`
13. **NEW** `npm install agentops` → instrument pick generation with session tracing

**Month 2:**
14. Set up OpenHands nightly health agent (runs tests, opens fix PRs autonomously)
15. Add Mem0 SDK to `apps/web` for per-user betting preference memory
16. Set up Agent-Reach for weekly sports market research workflow
17. **NEW** `pip install promptflow` → export historical game data → run `/eval-picks` baseline
18. Evaluate nflverse (`nfl_data_py`) as canonical NFL stats layer
19. Add ESPN public API fallback (sprig-dashboard pattern)
