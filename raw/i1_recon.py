"""Phase 1: recon sweep for I targets. Fetch homepage+robots+sitemap, probe API paths, record headers. Appends to probe_state.json."""
import json, os, sys, time, re, urllib.request, urllib.error, ssl, gzip
sys.path.insert(0, r"C:\Users\Garrett\.hermes\competitor-intel")
from fetcher import fetch, log

RAW = r"C:\Users\Garrett\.hermes\competitor-intel\raw"
TARGETS = ["propfinder.app", "oddsshopper.com", "crazyninjaodds.com", "pro.oddsassist.com",
           "therundown.io", "picktheodds.app", "oddspedia.com", "unabated.com"]

PROBE_PATHS = ["robots.txt", "sitemap.xml", "sitemaps.xml", "openapi.json", "swagger.json",
               "docs", ".well-known/security.txt"]

STATE = {}
SP = os.path.join(RAW, "i1_probe_state.json")
if os.path.exists(SP):
    STATE = json.load(open(SP, encoding="utf-8"))

def save(d, name):
    with open(os.path.join(RAW, name), "w", encoding="utf-8") as f:
        f.write(d["body"][:1_200_000])

targets = sys.argv[1:] if len(sys.argv) > 1 else TARGETS
for dom in targets:
    if dom not in STATE:
        STATE[dom] = {}
    st = STATE[dom]
    # homepage
    if "home" not in st:
        r = fetch(f"https://{dom}/", save_name=f"i_{dom.replace('.', '_')}_home.html")
        log(r)
        scripts = re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', r["body"]) if r["status"] == 200 else []
        st["home"] = {"status": r["status"], "err": r["error"], "ms": r["ms"],
                      "headers": {k: v for k, v in r["headers"].items() if k in
                                  ("server", "x-powered-by", "cf-ray", "x-vercel-id", "via", "x-amz-cf-id", "content-type", "x-nextjs-cache", "x-vercel-cache", "x-gatsby-version", "age")},
                      "scripts": scripts[:25],
                      "title": (re.search(r"<title[^>]*>(.*?)</title>", r["body"], re.S | re.I).group(1)[:150]
                                if r["status"] == 200 and re.search(r"<title[^>]*>(.*?)</title>", r["body"], re.S | re.I) else None)}
        time.sleep(1)
    # probe paths
    probes = {}
    for p in PROBE_PATHS:
        url = f"https://{dom}/{p}"
        r = fetch(url)
        probes[p] = {"status": r["status"], "len": len(r["body"]), "err": r["error"], "ct": r["headers"].get("content-type", "")[:40]}
        if r["status"] == 200 and len(r["body"]) > 100:
            nm = f"i_{dom.replace('.', '_')}_{p.replace('/', '_').replace('.', '_')}.txt"
            save(r, nm)
            probes[p]["file"] = nm
        time.sleep(0.7)
    st["probes"] = probes
    STATE[dom] = st
    json.dump(STATE, open(SP, "w", encoding="utf-8"), indent=1)
    print(f"=== {dom}: home={st['home']['status']} scripts={len(st['home']['scripts'])} probes=" +
          str({k: v["status"] for k, v in probes.items()}))
    time.sleep(1)
print("DONE")
