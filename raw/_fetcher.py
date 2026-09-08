#!/usr/bin/env python
"""Read-only GET fetcher for competitor-intel extraction. Saves raw evidence per URL."""
import sys, os, json, ssl, time, urllib.request, urllib.error, gzip, io

OUT = r"C:\Users\Garrett\.hermes\competitor-intel\raw"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
CTX = ssl.create_default_context()
ctx_nover = ssl.create_default_context()
ctx_nover.check_hostname = False
ctx_nover.verify_mode = ssl.CERT_NONE

def slug(url):
    u = url.replace("https://", "").replace("http://", "")
    bad = '<>:"|?*\x00'
    for c in bad: u = u.replace(c, "_")
    u = u.replace("/", "_")
    return u[:120]

def fetch(url, max_body=400_000, timeout=20):
    rec = {"url": url, "status": None, "final_url": None, "headers": {}, "error": None, "file": None, "bytes": 0}
    last = None
    for attempt, ctx in ((0, CTX), (1, ctx_nover)):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*", "Accept-Encoding": "gzip"})
            t0 = time.time()
            with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
                raw = r.read(max_body)
                if r.headers.get("Content-Encoding") == "gzip":
                    try: raw = gzip.decompress(raw)
                    except Exception: pass
                rec["status"] = r.status
                rec["final_url"] = r.geturl()
                keep = ["server", "x-powered-by", "cf-ray", "x-vercel-id", "via", "content-type", "cache-control", "x-cache", "strict-transport-security", "x-amz-cf-id", "x-github-request-id", "ratelimit-limit", "x-ratelimit-limit", "x-ratelimit-remaining", "ratelimit-remaining"]
                rec["headers"] = {k.lower(): v for k, v in r.headers.items() if k.lower() in keep or k.lower().startswith("x-")}
                rec["ms"] = int((time.time() - t0) * 1000)
                break
        except urllib.error.HTTPError as e:
            rec["status"] = e.code
            rec["headers"] = {k.lower(): v for k, v in e.headers.items() if k.lower() in ("server", "cf-ray", "content-type", "x-powered-by", "via")}
            try: raw = e.read(max_body)
            except Exception: raw = b""
            last = f"HTTP {e.code}"
            break
        except Exception as e:
            last = f"{type(e).__name__}: {e}"
            continue
    else:
        rec["error"] = last
    if rec["status"] and isinstance(raw, bytes):
        rec["bytes"] = len(raw)
        if rec["bytes"] > 0:
            fn = os.path.join(OUT, slug(url) + ".txt")
            with open(fn, "wb") as f: f.write(raw)
            rec["file"] = os.path.basename(fn)
    return rec

if __name__ == "__main__":
    prefix = sys.argv[1]
    urls = sys.argv[2:]
    results = []
    seen_host = {}
    for u in urls:
        host = u.split("/")[2] if "://" in u else u
        if seen_host.get(host): time.sleep(1.0)
        seen_host[host] = True
        r = fetch(u)
        print(f"[{r['status'] or 'ERR'}] {r['bytes']:>7}B {u}" + (f" -> {r['error']}" if r["error"] else ""))
        results.append(r)
    with open(os.path.join(OUT, f"fetchlog-{prefix}.json"), "a", encoding="utf-8") as f:
        for r in results: f.write(json.dumps(r) + "\n")
