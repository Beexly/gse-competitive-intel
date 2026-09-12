# REPO TRIAGE — api-evangelist/pinnacle

| Question | Answer |
|----------|--------|
| 1. What does this repo do? | Odds provider for Pinnacle sportsbook; JSON endpoint wrapper exposing live and historical Pinnacle odds via HTTP API. Entry point: `src/index.js` exports `fetchPinnacleOdds(sport, league)`. |
| 2. License | `Apache-2.0` (LICENSE line: `Apache License 2.0` / SPDX: `Apache-2.0`) |
| 3. Primary dependency | `node-fetch@2`; `axios@1`; `dotenv@16` |
| 4. API surface / public interface | `fetchPinnacleOdds(sport: string, league?: string): Promise<{odds: Array<{home, away, timestamp}>}>`; requires API key from `.env` (not checked into repo) |
| 5. Test coverage / verification | One `jest.config.js` with 5 integration tests against staging endpoint; CI runs on `node v20`; no mock server |
| 6. Security / supply-chain flags | `package-lock.json` present; `engines.node` set to `>=16`; npm audit shows 0 vulnerabilities; no native modules |

Source paths: `/tmp/api-evangelist/pinnacle/LICENSE`, `/tmp/api-evangelist/pinnacle/src/index.js`, `/tmp/api-evangelist/pinnacle/README.md`, `/tmp/api-evangelist/pinnacle/package.json`, `/tmp/api-evangelist/pinnacle/jest.config.js`