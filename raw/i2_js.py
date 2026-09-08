"""Phase 2: fetch main JS chunks per target, grep for API/entitlement/formula patterns. State -> i2_js_state.json"""
import json, os, sys, time, re
sys.path.insert(0, r"C:\Users\Garrett\.hermes\competitor-intel")
from fetcher import fetch, log

RAW = r"C:\Users\Garrett\.hermes\competitor-intel\raw"
STATE_PATH = os.path.join(RAW, "i2_js_state.json")
STATE = json.load(open(STATE_PATH, encoding="utf-8")) if os.path.exists(STATE_PATH) else {}

PATTERNS = [
    "baseURL", "apiRoot", "axios.create", "NEXT_PUBLIC", "endpoint", "isPremium", "hasAccess",
    "user.tier", "subscription", "numSims", "monteCarlo", "MonteCarlo", "correlation",
    "localStorage", "sportradar", "statsperform", "opta", "the-odds-api", "odds-api",
    "sportsdata.io", "nflverse", "fantasydata", "genius", "api.???", "wss://", "ws://",
    "supabase", "firebase", "amplitude", "segment.io", "stripe",
]

def grep_body(body, dom, src_url):
    hits = {}
    for pat in ["baseURL", "apiRoot", "axios.create", "NEXT_PUBLIC_", "isPremium", "hasAccess",
                "subscription", "numSims", "monteCarlo", "correlation", "wss://", "wss%3A",
                "sportradar", "statsperform", "the-odds-api", "sportsdata.io", "fantasydata",
                "supabase", "firebase", "stripe", "api-", "apiKeys", "EV formula", "expectedValue",
                "expected_value", "edge%", "deVig", "devig", "no-vig", "fairOdds"]:
        for m in re.finditer(re.escape(pat), body):
            s = max(0, m.start() - 120)
            ctx = body[s:m.end() + 220].replace("\n", " ")
            key = pat
            if key not in hits:
                hits[key] = []
            if len(hits[key]) < 3:
                hits[key].append({"ctx": ctx[:340], "src": src_url})
    # absolute API hosts
    hosts = set(re.findall(r'https?://([a-z0-9.-]+\.(?:com|app|io|co|net|dev|ai|org))/[a-z]', body))
    api_hosts = [h for h in hosts if any(k in h for k in ("api", "app", "staging", "dev", "cdn", "supabase", "firebaseio"))]
    return hits, sorted(api_hosts)[:12]

targets = sys.argv[1:] if len(sys.argv) > 1 else []
PS = json.load(open(os.path.join(RAW, "i1_probe_state.json"), encoding="utf-8"))

for dom in targets:
    if dom not in STATE:
        STATE[dom] = {"chunks": {}}
    st = STATE[dom]
    scripts = PS[dom]["home"]["scripts"]
    # pick up to 6 largest plausible main chunks (heuristic: names without 'polyfill'/'webpack')
    picks = [s for s in scripts if not any(x in s for x in ("polyfill", "webpack", "turbopack", "gtag", "webfont", "jquery", "rocket-loader", "analytics"))][:6]
    for s in picks:
        if s in st["chunks"]:
            continue
        url = s if s.startswith("http") else f"https://{dom}{s}"
        r = fetch(url)
        entry = {"status": r["status"], "len": len(r["body"]), "err": r["error"]}
        if r["status"] == 200 and len(r["body"]) > 500:
            fn = f"i_{dom.replace('.', '_')}_js_{re.sub(r'[^A-Za-z0-9]', '_', s)[-60:]}.js.txt"
            with open(os.path.join(RAW, fn), "w", encoding="utf-8") as f:
                f.write(f"URL: {url}\n\n{r['body'][:1_500_000]}")
            entry["file"] = fn
            hits, api_hosts = grep_body(r["body"], dom, url)
            entry["hits"] = {k: v for k, v in hits.items()}
            entry["api_hosts"] = api_hosts
        st["chunks"][s] = entry
        log(r)
        time.sleep(0.8)
    STATE[dom] = st
    json.dump(STATE, open(STATE_PATH, "w", encoding="utf-8"), indent=1)
print("DONE")
