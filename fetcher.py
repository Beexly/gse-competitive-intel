
import json, os, time, urllib.request, urllib.error, ssl, gzip, io

BASE = r"C:\\Users\\Garrett\\.hermes\\competitor-intel"
RAW = os.path.join(BASE, "raw")
DOSS = os.path.join(BASE, "dossiers")
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

def fetch(url, timeout=25, save_name=None, max_bytes=3_000_000):
    """GET a URL. Returns dict(status, headers, body_text, error, saved_path)."""
    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Accept": "*/*",
        "Accept-Encoding": "gzip",
        "Accept-Language": "en-US,en;q=0.9",
    })
    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as r:
            raw = r.read(max_bytes)
            hdrs = {k.lower(): v for k, v in r.headers.items()}
            if hdrs.get("content-encoding") == "gzip":
                try:
                    raw = gzip.decompress(raw)
                except Exception:
                    pass
            body = raw.decode("utf-8", errors="replace")
            st = r.status
    except urllib.error.HTTPError as e:
        st = e.code
        hdrs = {k.lower(): v for k, v in e.headers.items()} if e.headers else {}
        try:
            body = e.read(200_000).decode("utf-8", errors="replace")
        except Exception:
            body = ""
    except Exception as e:
        return {"url": url, "status": None, "headers": {}, "body": "", "error": f"{type(e).__name__}: {e}", "ms": int((time.time()-t0)*1000), "saved": None}
    saved = None
    if save_name:
        sp = os.path.join(RAW, save_name)
        with open(sp, "w", encoding="utf-8") as f:
            f.write(f"URL: {url}\\nSTATUS: {st}\\n\\n{body[:1_500_000]}")
        saved = sp
    return {"url": url, "status": st, "headers": hdrs, "body": body, "error": None,
            "ms": int((time.time()-t0)*1000), "saved": saved}

def log(r):
    h = {k: r["headers"].get(k) for k in ("server","x-powered-by","cf-ray","x-vercel-id","via","content-type","x-amz-cf-id","x-github-request-id") if r["headers"].get(k)}
    print(r["status"], r["url"][:90], h, "err:", r["error"], f"{r['ms']}ms")
