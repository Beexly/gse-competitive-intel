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
    ("https://itunes.apple.com/lookup?id=6448072108&country=us", "oddsjam_com_ext_itunes_lookup.json"),
    ("https://itunes.apple.com/lookup?id=1606752641&country=us", "props_cash_ext_itunes_lookup.json"),
    ("https://itunes.apple.com/lookup?id=6443885102&country=us", "outlier_bet_ext_itunes_lookup.json"),
    ("https://apps.apple.com/us/app/props-cash-player-props-data/id1606752641", "props_cash_ext_appstore_page.html"),
    ("https://play.google.com/store/apps/details?id=cash.props.app&hl=en_US&gl=US", "props_cash_ext_play_page.html"),
    ("https://apps.apple.com/us/app/outlier-smarter-sports-bets/id6443885102", "outlier_bet_ext_appstore_page.html"),
    ("https://play.google.com/store/apps/details?id=st.colorca.outlier&hl=en_US&gl=US", "outlier_bet_ext_play_page.html"),
]
out = {}
for url, fname in TARGETS:
    r = fetch(url)
    ok = r["status"] == 200 and r["body"]
    if ok:
        with open(RAW + "\\" + fname, "wb") as f:
            f.write(r["body"][:6_000_000])
    out[fname] = {"status": r["status"], "bytes": len(r["body"])}
    time.sleep(1)

# summarize itunes lookups inline
for lk in ["oddsjam_com_ext_itunes_lookup.json", "props_cash_ext_itunes_lookup.json", "outlier_bet_ext_itunes_lookup.json"]:
    try:
        j = json.loads(open(RAW + "\\" + lk, encoding="utf-8").read())
        res = j.get("results", [])
        if res:
            a = res[0]
            out[lk] = {
                "trackName": a.get("trackName"),
                "price": a.get("price"),
                "formattedPrice": a.get("formattedPrice"),
                "rating": a.get("averageUserRating"),
                "ratings": a.get("userRatingCount"),
                "currentVersion": a.get("version"),
                "genres": a.get("genres"),
                "iaps_present": bool(a.get("fileSizeBytes")),
            }
    except Exception as e:
        out[lk] = {"error": str(e)}
print(json.dumps(out, indent=1))
