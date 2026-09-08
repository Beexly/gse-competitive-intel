import json, time, urllib.request, urllib.error, ssl

RAW = r"C:\Users\Garrett\.hermes\competitor-intel\raw"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
ctx = ssl.create_default_context()

def fetch(url, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*", "Accept-Language": "en-US,en;q=0.9"})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
            return {"status": r.status, "headers": dict(r.headers), "body": r.read()}
    except urllib.error.HTTPError as e:
        return {"status": e.code, "headers": dict(e.headers), "body": e.read() if hasattr(e, "read") else b""}
    except Exception as e:
        return {"status": None, "headers": {}, "body": str(e).encode()}

def save(name, res, cap=3_000_000):
    with open(RAW + "\\" + name, "wb") as f:
        f.write(res["body"][:cap])
    return {"status": res["status"], "bytes": len(res["body"]), "file": name,
            "server": res["headers"].get("Server") or res["headers"].get("server"),
            "powered": res["headers"].get("X-Powered-By") or res["headers"].get("x-powered-by"),
            "via": res["headers"].get("Via") or res["headers"].get("via"),
            "vercel_id": res["headers"].get("x-vercel-id") or res["headers"].get("X-Vercel-Id"),
            "ct": res["headers"].get("Content-Type") or res["headers"].get("content-type")}

out = {}

# props.cash main bundle
r = fetch("https://props.cash/static/js/main.8fb9c538.js")
out["props_main_bundle"] = save("props_cash_ext_main.8fb9c538.js", r) if r["status"] == 200 else {"status": r["status"]}
time.sleep(1)

# outlier app root
r = fetch("https://app.outlier.bet/")
out["outlier_app_root"] = save("outlier_bet_ext_app_root.html", r) if r["status"] == 200 else {"status": r["status"]}
time.sleep(1)

# outlier llms-full.txt
r = fetch("https://outlier.bet/llms-full.txt")
out["outlier_llms_full"] = save("outlier_bet_ext_llms-full.txt", r, cap=2_000_000) if r["status"] == 200 else {"status": r["status"]}
time.sleep(1)

# subdomain probes (one GET each)
subs = ["https://api.oddsjam.com/", "https://app.oddsjam.com/", "https://staging.oddsjam.com/",
        "https://api.props.cash/", "https://app.props.cash/", "https://staging.props.cash/",
        "https://api.outlier.bet/", "https://staging.outlier.bet/"]
out["subdomains"] = {}
for u in subs:
    r = fetch(u, timeout=12)
    host = u.split("//")[1].split("/")[0]
    out["subdomains"][host] = {"status": r["status"], "server": r["headers"].get("Server") or r["headers"].get("server"),
                               "powered": r["headers"].get("X-Powered-By") or r["headers"].get("x-powered-by"),
                               "via": r["headers"].get("Via") or r["headers"].get("via"),
                               "head": (r["body"][:120].decode("utf-8", "replace").replace("\n", " ") if isinstance(r["body"], bytes) else str(r["body"])[:120])}
    time.sleep(1)

with open(RAW + "\\ext-probe-round3.json", "w", encoding="utf-8") as f:
    json.dump(out, f, indent=1)
print(json.dumps(out, indent=1)[:4000])
