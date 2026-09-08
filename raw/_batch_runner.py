# Batch fetcher runner: <=8 HTTP GETs per target, 1s sleep same-host, saves raw/ + scan JSON
import sys, os, json, time, re
from urllib.parse import urljoin
BASE = r"C:\Users\Garrett\.hermes\competitor-intel"
RAW = os.path.join(BASE, "raw")
sys.path.insert(0, BASE)
from fetcher import fetch, RAW as _R  # noqa

VENDORS = ["sportradar", "statsperform", "opta", "genius", "the-odds-api", "sportsdata", "nflverse", "fantasydata", "apidata", "rapidapi"]
JS_GREP = [r"baseURL", r"axios", r"fetch\(", r"endpoint", r"isPremium", r"hasAccess", r"user\.tier", r"subscription", r"subscri", r"monteCarlo", r"numSims", r"simulation", r"correlation", r"localStorage", r"premium"]

def run_target(domain, url_home, prefix, js_max=3):
    recs, store = [], {}
    def get(url, save=None):
        r = fetch(url, save_name=save)
        recs.append({"url": url, "status": r["status"], "error": r["error"], "ms": r["ms"],
                     "bytes": len(r.get("body") or ""),
                     "hdrs": {k: r["headers"].get(k) for k in ("server", "x-powered-by", "cf-ray", "x-vercel-id", "via", "content-type") if r["headers"].get(k)},
                     "saved": r.get("saved")})
        time.sleep(1.0)
        return r
    # 1 homepage
    r = get(url_home, f"{prefix}_home.html")
    html = r.get("body") or ""
    store["home_status"] = r["status"]
    store["home_url"] = url_home
    # robots
    rr = get(urljoin(url_home, "/robots.txt"), f"{prefix}_robots.txt")
    store["robots_status"] = rr["status"]
    store["robots_body"] = (rr.get("body") or "")[:3000]
    sm = re.findall(r"Sitemap:\s*(\S+)", store["robots_body"], re.I)
    store["robots_sitemaps"] = sm
    # sitemap (robots-declared first, else /sitemap.xml)
    smurl = sm[0] if sm else urljoin(url_home, "/sitemap.xml")
    sr = get(smurl, f"{prefix}_sitemap.xml")
    store["sitemap_status"] = sr["status"]
    store["sitemap_url"] = smurl
    sbody = sr.get("body") or ""
    locs = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", sbody)
    store["sitemap_loc_count"] = len(locs)
    store["sitemap_sample"] = locs[:12]
    # 2 JS bundles from homepage
    srcs = re.findall(r"<script[^>]+src=[\"']([^\"']+)[\"']", html, re.I)
    jurls, seen = [], set()
    for s in srcs:
        u = urljoin(url_home, s)
        if u.endswith((".js", ".mjs")) and u not in seen:
            seen.add(u); jurls.append(u)
    # heuristic: prefer main-ish bundles
    prio = [u for u in jurls if re.search(r"(main|app|index|bundle|chunk|vendor|runtime)", u, re.I)]
    order = (prio + [u for u in jurls if u not in prio])[:js_max]
    store["js_candidates_total"] = len(jurls)
    store["js_fetched"] = []
    greps = {}
    for i, u in enumerate(order):
        rj = get(u, f"{prefix}_js{i}.js")
        store["js_fetched"].append({"url": u, "status": rj["status"], "bytes": len(rj.get("body") or "")})
        body = rj.get("body") or ""
        for pat in JS_GREP + [v for v in VENDORS]:
            for m in re.finditer(pat, body, re.I):
                greps.setdefault(pat, []).append({"file": f"{prefix}_js{i}.js", "ctx": body[max(0, m.start()-70):m.end()+90].replace("\n", " ")[:170]})
                if len(greps[pat]) >= 4: break
    # homepage html greps (vendors, api paths, pricing links)
    for pat in JS_GREP + [v for v in VENDORS]:
        for m in re.finditer(pat, html, re.I):
            greps.setdefault(pat + "_home", []).append({"file": "home.html", "ctx": html[max(0, m.start()-60):m.end()+80].replace("\n", " ")[:150]})
            if len(greps[pat + "_home"]) >= 3: break
    store["greps"] = greps
    plinks = list(dict.fromkeys(urljoin(url_home, h) for h in re.findall(r'href=[\"\']([^\"\']*(?:pricing|subscribe|plans|membership|signup|register)[^\"\']*)[\"\"]?', html, re.I) if "javascript" not in h))[:3]
    store["pricing_links"] = plinks
    if plinks:
        rp = get(plinks[0], f"{prefix}_pricing.html")
        store["pricing_status"] = rp["status"]
        store["pricing_body"] = (rp.get("body") or "")[:60000]
    # 3 api-ish probes (budget: up to 8 total)
    used = len(recs)
    for path in ["/openapi.json", "/swagger.json"]:
        if used >= 8: break
        ra = get(urljoin(url_home, path), None)
        if ra["status"] == 200:
            store.setdefault("api_probe_hits", []).append({"path": path, "status": 200, "bytes": len(ra.get("body") or "")})
        used = len(recs)
    store["request_log"] = recs
    out = os.path.join(RAW, f"scan-{prefix}.json")
    json.dump(store, open(out, "w", encoding="utf-8"), indent=1)
    print(f"== {domain}: home={store['home_status']} robots={store['robots_status']} sitemap={store['sitemap_status']}({store['sitemap_loc_count']}) js={[(j['status'], j['bytes']) for j in store['js_fetched']]} pricing={store.get('pricing_status')} reqs={len(recs)}")
    return store

TARGETS = json.load(open(os.path.join(RAW, "_targets_batch.json")))
for t in TARGETS:
    try:
        run_target(t["domain"], t["url"], t["prefix"], t.get("js_max", 3))
    except Exception as e:
        print(f"== {t['domain']}: EXCEPTION {type(e).__name__}: {e}")
print("BATCH DONE")
