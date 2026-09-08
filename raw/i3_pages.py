"""Phase 3: fetch key subpages per target (pricing, features, api docs) + JS chunk scans for remaining targets."""
import json, os, sys, time, re
sys.path.insert(0, r"C:\Users\Garrett\.hermes\competitor-intel")
from fetcher import fetch, log

RAW = r"C:\Users\Garrett\.hermes\competitor-intel\raw"
SP = os.path.join(RAW, "i3_pages_state.json")
STATE = json.load(open(SP, encoding="utf-8")) if os.path.exists(SP) else {}

def save(d, name):
    with open(os.path.join(RAW, name), "w", encoding="utf-8") as f:
        f.write(d["body"][:1_200_000])

def textify(html):
    t = re.sub(r"<script.*?</script>", " ", html, flags=re.S)
    t = re.sub(r"<style.*?</style>", " ", t, flags=re.S)
    t = re.sub(r"<[^>]+>", " ", t)
    return re.sub(r"\s+", " ", t)

PAGES = {
    "propfinder.app": ["/pricing", "/tutorials", "/weather"],
    "oddsshopper.com": ["/pricing", "/plans", "/about"],
    "crazyninjaodds.com": ["/pricing", "/Subscribe.aspx", "/plans", "/api"],
    "pro.oddsassist.com": ["/pricing", "/plans", "/about"],
    "therundown.io": ["/pricing", "/pricing/api", "/docs/quickstart", "/compare/the-odds-api", "/build-with-ai"],
    "picktheodds.app": ["/pricing", "/about", "/blog"],
    "oddspedia.com": ["/api", "/odds-api"],
    "unabated.com": ["/pricing", "/membership", "/about", "/products"],
}
targets = sys.argv[1:] if len(sys.argv) > 1 else []
for dom in targets:
    if dom not in STATE:
        STATE[dom] = {}
    for p in PAGES.get(dom, []):
        key = p
        if key in STATE[dom]:
            continue
        r = fetch(f"https://{dom}{p}")
        ent = {"status": r["status"], "len": len(r["body"]), "err": r["error"]}
        if r["status"] == 200 and len(r["body"]) > 500:
            fn = f"i_{dom.replace('.', '_')}_page{p.replace('/', '_')}.html"
            save(r, fn)
            ent["file"] = fn
            ent["text_head"] = textify(r["body"])[:2500]
        STATE[dom][key] = ent
        log(r)
        time.sleep(0.9)
    json.dump(STATE, open(SP, "w", encoding="utf-8"), indent=1)
print("DONE")
