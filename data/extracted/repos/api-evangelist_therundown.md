# REPO TRIAGE — api-evangelist/therundown

| Question | Answer |
|----------|--------|
| 1. What does this repo do? | Sports betting odds aggregator with API wrapper for US sports (NFL, NBA, MLB). Entry point: `index.js` exports `getOdds(ticker)`. |
| 2. License | `MIT` (LICENSE line: `MIT License` / SPDX: `MIT`) |
| 3. Primary dependency | `node-fetch@2` (HTTP client); no native deps |
| 4. API surface / public interface | `getOdds(ticker: string): Promise<object>`; returns `{homeOdds, awayOdds, timestamp}` |
| 5. Test coverage / verification | No `__tests__/` dir; one `index.test.js` with 3 snapshot tests, all pass on `node v18` |
| 6. Security / supply-chain flags | No `.npmrc` or lockfile; `package-lock.json` present; no `engines` field; no binary deps; NPM audit clean |

Source paths: `/tmp/api-evangelist/therundown/LICENSE`, `/tmp/api-evangelist/therundown/index.js`, `/tmp/api-evangelist/therundown/README.md`, `/tmp/api-evangelist/therundown/package.json`, `/tmp/api-evangelist/therundown/index.test.js`