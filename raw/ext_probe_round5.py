import time, urllib.request, urllib.error, ssl, json

RAW = r"C:\Users\Garrett\.hermes\competitor-intel\raw"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
ctx = ssl.create_default_context()

def fetch(url, timeout=30):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
            return {"status": r.status, "headers": dict(r.headers), "body": r.read()}
    except urllib.error.HTTPError as e:
        return {"status": e.code, "headers": dict(e.headers), "body": e.read() if hasattr(e, "read") else b""}
    except Exception as e:
        return {"status": None, "headers": {}, "body": str(e).encode()}

TARGETS = [
    # verify prior oddsjam formula chunk still live
    ("https://oddsjam.com/_next/static/chunks/0s76mfohqjm42.js", "oddsjam_com_ext_verify_0s76mfohqjm42.js"),
    # pricing pages via jina fallback
    ("https://r.jina.ai/https://oddsjam.com/pricing", "oddsjam_com_ext_pricing_jina.txt"),
    ("https://r.jina.ai/https://props.cash/pricing", "props_cash_ext_pricing_jina.txt"),
    ("https://r.jina.ai/https://outlier.bet/pricing", "outlier_bet_ext_pricing_jina.txt"),
    ("https://r.jina.ai/https://outlier.bet/subscribe", "outlier_bet_ext_subscribe_jina.txt"),
    # outlier llms-full for pricing hints
    ("https://outlier.bet/llms-full.txt", "outlier_bet_ext_llms-full.txt"),
]
out = {}
for url, fname in TARGETS:
    r = fetch(url)
    if r["status"] == 200 and r["body"]:
        with open(RAW + "\\" + fname, "wb") as f:
            f.write(r["body"][:6_000_000])
        out[fname] = {"status": 200, "bytes": len(r["body"])}
    else:
        out[fname] = {"status": r["status"], "bytes": len(r["body"])}
    time.sleep(1)
print(json.dumps(out, indent=1))
