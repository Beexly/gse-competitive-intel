"""GSE competitor-intel pipeline for 8 fantasy targets. Budget: max 7 HTTP req/domain, 1s sleep same-host."""
import json, os, re, sys, time, socket, urllib.parse
sys.path.insert(0, r"C:\Users\Garrett\.hermes\competitor-intel")
import fetcher  # fetcher.fetch(url, save_name=...), fetcher.log(r)

BASE = r"C:\Users\Garrett\.hermes\competitor-intel"
RAW = os.path.join(BASE, "raw")
DOSS = os.path.join(BASE, "dossiers")
QUEUE = os.path.join(BASE, "queue.json")

BUDGET = 7

class Domain:
    def __init__(self, domain):
        self.domain = domain
        self.prefix = domain.split(".")[0]
        self.count = 0
        self.log = []
        self.sleep_host = domain

    def fetch(self, url, save_name=None, **kw):
        if self.count >= BUDGET:
            self.log.append(f"BUDGET-EXCEEDED skip {url}")
            return {"url": url, "status": None, "headers": {}, "body": "", "error": "budget exceeded", "saved": None}
        host = urllib.parse.urlparse(url).netloc
        if host == self.sleep_host and self.count > 0:
            time.sleep(1.0)
        self.count += 1
        r = fetcher.fetch(url, save_name=save_name, **kw)
        fetcher.log(r)
        self.log.append({"url": url, "status": r["status"], "saved": r["saved"], "err": r["error"]})
        return r

KEYWORDS = ["baseURL","apiRoot","axios","fetch(","isPremium","hasAccess","user.tier","subscription",
            "numSims","monteCarlo","correlation","localStorage","endpoint","sportradar","statsperform",
            "opta","sportsdata.io","nflverse","fantasydata","genius","the-odds-api"]

def grep_body(text):
    hits = {}
    low = text.lower()
    for kw in KEYWORDS:
        idx = 0
        found = []
        while len(found) < 3:
            i = low.find(kw.lower(), idx)
            if i < 0: break
            s = max(0, i-90); e = min(len(text), i+len(kw)+130)
            snip = re.sub(r"\s+", " ", text[s:e]).strip()
            found.append(snip)
            idx = i + len(kw)
        if found:
            hits[kw] = found
    return hits

def abs_url(u, base):
    return urllib.parse.urljoin(base, u)

def script_urls(html, base):
    urls = re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', html, re.I)
    out, seen = [], set()
    base_host = urllib.parse.urlparse(base).netloc.replace("www.", "")
    for u in urls:
        a = abs_url(u, base)
        if a in seen: continue
        seen.add(a)
        host = urllib.parse.urlparse(a).netloc.replace("www.", "")
        # first-party only: the target's own bundles
        if host != base_host and not host.endswith("." + base_host):
            continue
        if not (a.endswith(".js") or ".js?" in a or "/js/" in a):
            continue
        out.append(a)
    return out

def pick_js(urls, n=3):
    def score(u):
        s = 0
        low = u.lower()
        for t in ("chunk","main","app","bundle","index","runtime","static/js","_next","assets/index"):
            if t in low: s += 2
        if "jquery" in low or "wp-" in low: s -= 2
        if low.endswith(".js") or ".js?" in low: s += 1
        return -s
    return sorted(urls, key=score)[:n]

def dns_probe(subs):
    res = {}
    for s in subs:
        try:
            res[s] = socket.gethostbyname(s)
        except Exception as e:
            res[s] = f"NXDOMAIN ({type(e).__name__})"
    return res

VENDOR_PAT = re.compile(r"(sportradar|statsperform|opta|sportsdata\.io|nflverse|fantasydata|geniussports|the-odds-api|odds-api)", re.I)
PRICE_PAT = re.compile(r"\$\s?\d+(?:\.\d{2})?|\b(?:free|freemium|per (?:month|season|week|year)|/mo|/yr|/season)\b", re.I)

def find_pricing_link(html, base):
    base_host = urllib.parse.urlparse(base).netloc.replace("www.", "")
    links = re.findall(r'href=["\']([^"\']+)["\']', html, re.I)
    best = None; best_score = 0
    for u in links:
        low = u.lower()
        if any(low.endswith(ext) for ext in (".css",".js",".png",".jpg",".jpeg",".svg",".gif",".ico",".woff",".woff2",".ttf",".webp",".xml",".txt",".json")):
            continue
        if any(k in low for k in ("/wp-content","/wp-admin","/wp-includes","/wp-json","/feed","/comments","#","mailto:","javascript:")):
            continue
        a = abs_url(u, base)
        host = urllib.parse.urlparse(a).netloc.replace("www.", "")
        if host != base_host and not host.endswith("." + base_host):
            continue
        score = sum(2 for k in ("pricing","plans","subscribe","membership","premium","signup","join","pro-","upgrade") if k in low)
        if score > best_score:
            best_score = score; best = a
    return best

def save_evidence(prefix, ev):
    p = os.path.join(RAW, f"{prefix}-_evidence.json")
    with open(p, "w", encoding="utf-8") as f:
        json.dump(ev, f, indent=1, default=str)
    return p

def append_queue(new_targets):
    try:
        with open(QUEUE, encoding="utf-8") as f:
            q = json.load(f)
    except Exception:
        q = {"discovered": []}
    disc = q.get("discovered", [])
    seen = set(disc)
    added = []
    for t in new_targets:
        if t not in seen:
            disc.append(t); seen.add(t); added.append(t)
    q["discovered"] = disc
    with open(QUEUE, "w", encoding="utf-8") as f:
        json.dump(q, f, indent=2)
    return added


NC = "NOT CONFIRMED"

def _cite(url):
    return url

def process_domain(domain, do_search=True):
    """Full per-domain extraction within budget. Returns dossier dict (also written to dossiers/)."""
    from hermes_tools import web_search as hs
    d = Domain(domain)
    pre = d.prefix
    base = f"https://{domain}"
    ev = {"domain": domain, "requests": d.log}
    sch = "https://"

    # 1. homepage
    home = d.fetch(base, save_name=f"{pre}-home.html")
    hp_status = home["status"]
    hp_body = home["body"] or ""
    ev["homepage_status"] = hp_status
    ev["homepage_headers"] = {k: home["headers"].get(k) for k in ("server","x-powered-by","cf-ray","x-vercel-id","via","content-type") if home["headers"].get(k)}
    if hp_status != 200:
        # fallback: r.jina.ai
        jina = d.fetch(f"https://r.jina.ai/{base}", save_name=f"{pre}-home-jina.txt")
        if jina["status"] == 200 and len(jina["body"]) > 500:
            hp_body = jina["body"]
            ev["homepage_via_jina"] = True
        else:
            ev["homepage_blocked"] = f"status={hp_status}, jina={jina['status']}, err={home['error']}"

    # 2. robots.txt
    robots = d.fetch(f"{sch}{domain}/robots.txt", save_name=f"{pre}-robots.txt")
    robots_status = robots["status"]
    robots_txt = robots["body"][:3000] if robots_status == 200 else ""
    ev["robots_status"] = robots_status
    sitemap_urls_in_robots = re.findall(r"Sitemap:\s*(\S+)", robots_txt, re.I)

    # 3. sitemap
    sm = d.fetch(f"{sch}{domain}/sitemap.xml", save_name=f"{pre}-sitemap.xml")
    sm_status = sm["status"]
    sm_url = f"{sch}{domain}/sitemap.xml"
    if sm_status != 200 and sitemap_urls_in_robots:
        alt = sitemap_urls_in_robots[0]
        sm = d.fetch(alt, save_name=f"{pre}-sitemap2.xml")
        sm_status = sm["status"]; sm_url = alt
    if sm_status != 200:
        sm = d.fetch(f"{sch}{domain}/sitemaps.xml", save_name=f"{pre}-sitemaps.xml")
        sm_status = sm["status"]; sm_url = f"{sch}{domain}/sitemaps.xml"
    sm_body = sm["body"] if sm_status == 200 else ""
    ev["sitemap_status"] = sm_status; ev["sitemap_url"] = sm_url
    sm_locs = re.findall(r"<loc>([^<]+)</loc>", sm_body)[:40]
    ev["sitemap_locs_sample"] = sm_locs
    ev["sitemap_loc_count_seen"] = len(re.findall(r"<loc>", sm_body))

    # 4. JS bundles (2-3 largest/main)
    js_urls = script_urls(hp_body, base)
    js_picks = pick_js(js_urls, 3)
    ev["js_candidates"] = js_urls[:15]
    ev["js_fetched"] = []
    grep_all = {}
    for i, ju in enumerate(js_picks):
        if d.count >= BUDGET - 1:  # keep 1 slot for pricing page
            ev["js_fetched"].append({"url": ju, "skipped": "budget"})
            continue
        r = d.fetch(ju, save_name=f"{pre}-js{i}.js")
        size = len(r["body"]) if r["status"] == 200 else 0
        ev["js_fetched"].append({"url": ju, "status": r["status"], "bytes": size})
        if r["status"] == 200:
            g = grep_body(r["body"])
            if g: grep_all[ju] = g

    # 5. pricing page (last slot)
    pricing_url = find_pricing_link(hp_body, base)
    pricing_body = ""
    pricing_status = None
    if pricing_url and d.count < BUDGET:
        pr = d.fetch(pricing_url, save_name=f"{pre}-pricing.html")
        pricing_status = pr["status"]
        if pr["status"] == 200:
            pricing_body = pr["body"]
    ev["pricing_url"] = pricing_url; ev["pricing_status"] = pricing_status

    # vendor strings across all fetched text
    blob = hp_body + robots_txt + sm_body + pricing_body + json.dumps(grep_all)
    vendors = sorted(set(m.group(0).lower() for m in VENDOR_PAT.finditer(blob)))
    ev["vendors_found"] = vendors

    # pricing extraction
    prices = sorted(set(PRICE_PAT.findall(pricing_body or hp_body)))[:40]
    ev["price_tokens"] = prices

    # DNS probes (not HTTP)
    ev["dns"] = dns_probe([f"api.{domain}", f"app.{domain}", f"staging.{domain}"])

    # 6. ONE web_search for community pain
    pain = []
    if do_search:
        try:
            res = hs(f"site:reddit.com {domain} complaint OR review", limit=8)
            items = (res.get("data") or {}).get("web") or []
            for it in items[:8]:
                pain.append({"quote": (it.get("description") or "")[:300], "source": it.get("url"), "title": it.get("title")})
            ev["search_used"] = "site:reddit.com <domain> complaint OR review"
        except Exception as e:
            ev["search_error"] = f"{type(e).__name__}: {e}"

    infra = ev["homepage_headers"]
    stack_guess = []
    if "cloudflare" in json.dumps(infra).lower(): stack_guess.append("Cloudflare CDN")
    if "vercel" in json.dumps(infra).lower(): stack_guess.append("Vercel")
    if "wp-content" in hp_body or "wordpress" in hp_body.lower(): stack_guess.append("WordPress")
    if "_next" in hp_body or "next/dist" in blob.lower(): stack_guess.append("Next.js")
    if "wix" in blob.lower(): stack_guess.append("Wix")
    if "squarespace" in blob.lower(): stack_guess.append("Squarespace")

    dossier = {
        "domain": domain,
        "tech_stack": {
            "frontend": ", ".join(stack_guess) if stack_guess else NC + " (no distinguishing markers)",
            "backend": NC + " (no exposure)",
            "database": NC + " (no exposure)",
            "cloud": ev["homepage_headers"].get("server") or NC,
            "cdn": ("Cloudflare" if "cf-ray" in ev["homepage_headers"] else (ev["homepage_headers"].get("via","") or NC)),
            "citations": [base, f"{sch}{domain}/robots.txt"],
        },
        "api_architecture": {
            "rest_endpoints": [],
            "graphql_schema": NC + " (not probed - no JS evidence)",
            "websocket_endpoints": NC,
            "rate_limits": NC + " (no public rate-limit doc)",
            "citations": [u for u in grep_all.keys()],
        },
        "extracted_formulas": [],
        "ml_model_infrastructure": {"model_types": NC, "training_data": NC, "update_frequency": NC, "citation": None},
        "simulation_engine": {"num_simulations": NC, "correlation_method": NC, "citation": None},
        "data_supply_chain": {"vendors": vendors or [NC + " (none found in fetched JS/HTML)"], "citations": [base]},
        "product_limits": {"limits": NC, "upgrade_triggers": NC, "citation": pricing_url or base},
        "pricing": {"web": ({"url": pricing_url, "status": pricing_status, "tokens": prices} if (pricing_url or prices) else NC), "ios": NC + " (not checked - no app link found)" if "itunes.apple.com" not in hp_body and "apps.apple.com" not in hp_body else "app link in homepage", "android": NC, "citations": [pricing_url] if pricing_url else [base]},
        "customer_pain": pain,
        "discovered_paths": ([sm_url] if sm_status == 200 else []) + [u for u in grep_all.keys()],
        "discovered_targets": [],
        "discovery_metadata": {
            "method": "urllib GET (fetcher.py pattern), UA-spoof Chrome/126, gzip, 1s same-host sleep",
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
            "http_requests_used": d.count,
            "request_log": d.log,
        },
    }
    # extra evidence into dossier keys where we have real content
    if grep_all:
        for u, g in grep_all.items():
            for kw, snips in g.items():
                if kw in ("numSims","monteCarlo","correlation") and dossier["simulation_engine"]["citation"] is None:
                    dossier["simulation_engine"] = {"num_simulations": NC + f" (kw '{kw}' present in JS, no value extracted)", "correlation_method": NC, "citation": u}
                if kw in ("baseURL","apiRoot","axios","endpoint","fetch("):
                    dossier["api_architecture"]["rest_endpoints"].append({"method": "GET", "path": NC + f" (kw '{kw}' found in bundle)", "auth_required": NC, "tier": NC, "sample_response": snips[0][:200], "citation": u})
    if robots_txt:
        dossier["discovered_paths"].append({"robots_txt_excerpt": robots_txt[:800], "citation": f"{sch}{domain}/robots.txt"})
    ev["grep_summary"] = {u: {k: v[:1] for k, v in g.items()} for u, g in grep_all.items()}
    save_evidence(pre, ev)

    out = os.path.join(DOSS, f"{domain}.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(dossier, f, indent=1, default=str)
    print(f"\n=== {domain} DONE: reqs={d.count}, home={hp_status}, robots={robots_status}, sitemap={sm_status}, js={[ (j.get('status'), j.get('bytes')) for j in ev['js_fetched']]}, pricing={pricing_status}, pain_quotes={len(pain)}, vendors={vendors}")
    return dossier
