import time, urllib.request, urllib.error, ssl, json

RAW = r"C:\Users\Garrett\.hermes\competitor-intel\raw"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
ctx = ssl.create_default_context()

def fetch(url, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*", "Referer": "https://app.outlier.bet/"})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
            return {"status": r.status, "headers": dict(r.headers), "body": r.read()}
    except urllib.error.HTTPError as e:
        return {"status": e.code, "headers": dict(e.headers), "body": e.read() if hasattr(e, "read") else b""}
    except Exception as e:
        return {"status": None, "headers": {}, "body": str(e).encode()}

TARGETS = [
    ("https://app.outlier.bet/assets/main-e84309a4.js", "outlier_bet_ext_app_main.js"),
    ("https://app.outlier.bet/assets/index-5e85de75.js", "outlier_bet_ext_app_index.js"),
    ("https://app.outlier.bet/assets/feature-flags-provider-factory-94a02e35.js", "outlier_bet_ext_app_flags.js"),
    # outlier marketing site pricing + web app page
    ("https://outlier.bet/pricing/", "outlier_bet_ext_pricing.html"),
    ("https://outlier.bet/pricing", "outlier_bet_ext_pricing_noslash.html"),
]
out = {}
for url, fname in TARGETS:
    r = fetch(url)
    if r["status"] == 200 and r["body"]:
        with open(RAW + "\\" + fname, "wb") as f:
            f.write(r["body"][:8_000_000])
        out[url] = {"status": 200, "bytes": len(r["body"]), "file": fname,
                    "server": r["headers"].get("Server") or r["headers"].get("server"),
                    "ct": r["headers"].get("Content-Type") or r["headers"].get("content-type")}
    else:
        out[url] = {"status": r["status"], "bytes": len(r["body"])}
    time.sleep(1)

print(json.dumps(out, indent=1))
