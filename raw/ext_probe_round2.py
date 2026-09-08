import json, time, urllib.request, urllib.error, ssl, sys

RAW = r"C:\Users\Garrett\.hermes\competitor-intel\raw"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
ctx = ssl.create_default_context()

def fetch(url, timeout=20):
    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Accept": "text/html,application/json;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    })
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
            body = r.read()
            return {"status": r.status, "headers": dict(r.headers), "body": body}
    except urllib.error.HTTPError as e:
        return {"status": e.code, "headers": dict(e.headers), "body": e.read() if hasattr(e, "read") else b""}
    except Exception as e:
        return {"status": None, "headers": {}, "body": str(e).encode()}

PROBES = {
    "oddsjam.com": ["https://oddsjam.com/", "https://oddsjam.com/robots.txt", "https://oddsjam.com/sitemap.xml",
                     "https://oddsjam.com/openapi.json", "https://oddsjam.com/swagger.json", "https://oddsjam.com/api",
                     "https://oddsjam.com/api/v1", "https://oddsjam.com/docs", "https://oddsjam.com/.well-known/security.txt",
                     "https://oddsjam.com/api/build-time", "https://oddsjam.com/api/backend/sportsbooks?state=NJ"],
    "props.cash": ["https://props.cash/", "https://props.cash/robots.txt", "https://props.cash/sitemap.xml",
                    "https://props.cash/openapi.json", "https://props.cash/swagger.json", "https://props.cash/api",
                    "https://props.cash/api/v1", "https://props.cash/docs", "https://props.cash/.well-known/security.txt"],
    "outlier.bet": ["https://outlier.bet/", "https://outlier.bet/robots.txt", "https://outlier.bet/sitemap.xml",
                     "https://outlier.bet/llms.txt", "https://outlier.bet/agents.json", "https://outlier.bet/agents.txt",
                     "https://outlier.bet/openapi.json", "https://outlier.bet/swagger.json", "https://outlier.bet/api",
                     "https://outlier.bet/api/v1", "https://outlier.bet/docs", "https://outlier.bet/.well-known/security.txt"],
}

def prefix_for(domain):
    return domain.replace(".", "_") + "_ext_"

results = {}
for domain, urls in PROBES.items():
    results[domain] = {}
    for u in urls:
        res = fetch(u)
        path_key = u.replace("https://" + domain, "") or "/"
        entry = {
            "url": u, "status": res["status"],
            "headers": {k: v for k, v in res["headers"].items() if k.lower() in
                        ("server","x-powered-by","cf-ray","x-vercel-id","via","content-type","set-cookie","location","cache-control","x-runtime","strict-transport-security","content-encoding")},
            "bytes": len(res["body"]),
        }
        body = res["body"]
        # save interesting bodies to raw
        if res["status"] == 200 and body:
            ct = (res["headers"].get("Content-Type") or res["headers"].get("content-type") or "")
            if any(s in path_key for s in ("robots.txt","sitemap","llms.txt","agents.json","agents.txt","security.txt","build-time","sportsbooks","openapi","swagger")):
                fname = prefix_for(domain) + path_key.strip("/").replace("/", "_").replace("?", "_").replace("=", "-") + ".body.txt"
                if not fname:
                    fname = prefix_for(domain) + "root.body.txt"
                with open(RAW + "\\" + fname, "wb") as f:
                    f.write(body[:2_000_000])
                entry["raw_file"] = fname
            if "home" not in entry and path_key == "/":
                with open(RAW + "\\" + prefix_for(domain) + "root.html", "wb") as f:
                    f.write(body[:4_000_000])
                entry["raw_file_root"] = prefix_for(domain) + "root.html"
            head = body[:400].decode("utf-8", "replace").replace("\n", " ")[:380]
            entry["head"] = head
        elif res["status"]:
            head = (res["body"][:200] if isinstance(res["body"], bytes) else str(res["body"])[:200])
            entry["head"] = head.decode("utf-8", "replace").replace("\n", " ")[:190] if isinstance(head, bytes) else head[:190]
        results[domain][path_key] = entry
        time.sleep(1)

with open(RAW + "\\ext-probe-round2.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=1)
for d, paths in results.items():
    print("==", d)
    for p, e in paths.items():
        print(" ", e["status"], p, e.get("bytes"), "|", e["headers"].get("Server") or e["headers"].get("server"), "|", e["headers"].get("Via") or e["headers"].get("via"), "|", e["headers"].get("X-Powered-By") or e["headers"].get("x-powered-by"), "|", e.get("raw_file") or e.get("raw_file_root") or "")
