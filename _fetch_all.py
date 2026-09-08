# -*- coding: utf-8 -*-
"""Fetch home+robots for all remaining queue targets (scripted, resumable)."""
import json, os, urllib.request, ssl, time

CI = r"C:\Users\Garrett\.hermes\competitor-intel"
RAW = os.path.join(CI, "raw")
ctx = ssl.create_default_context(); ctx.check_hostname = False; ctx.verify_mode = ssl.CERT_NONE
q = json.load(open(os.path.join(CI, "queue.json")))["targets"]
done = {f.replace(".json", "").lower() for f in os.listdir(os.path.join(CI, "dossiers")) if f.endswith(".json")}

todo = [d for d, v in q.items()
        if v["category"] in ("prediction-market-tool", "vendor-or-lead", "roundup-lead") and d not in done]
print(f"targets to fetch: {len(todo)}", flush=True)

ok = err = 0
for i, dom in enumerate(todo):
    slug = dom.replace(".", "_")
    home_p = os.path.join(RAW, f"px_{slug}_home.raw")
    rob_p = os.path.join(RAW, f"px_{slug}_robots.raw")
    if os.path.exists(home_p):
        continue
    try:
        req = urllib.request.Request(f"https://{dom}/", headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) gse-intel"})
        with urllib.request.urlopen(req, timeout=15, context=ctx) as r:
            body = r.read(300_000).decode("utf-8", errors="replace")
            open(home_p, "w", encoding="utf-8").write(body)
        ok += 1
    except Exception as e:
        open(home_p, "w", encoding="utf-8").write(f"FETCH_ERROR: {str(e)[:150]}")
        err += 1
    if not os.path.exists(rob_p):
        try:
            req = urllib.request.Request(f"https://{dom}/robots.txt", headers={"User-Agent": "Mozilla/5.0 gse-intel"})
            with urllib.request.urlopen(req, timeout=12, context=ctx) as r:
                body = r.read(50_000).decode("utf-8", errors="replace")
                open(rob_p, "w", encoding="utf-8").write(body)
        except Exception as e:
            open(rob_p, "w", encoding="utf-8").write(f"FETCH_ERROR: {str(e)[:150]}")
    time.sleep(0.3)
    if (i + 1) % 20 == 0:
        print(f"  {i+1}/{len(todo)} (ok={ok} err={err})", flush=True)

print(f"FETCH-ALL COMPLETE: {len(todo)} targets, {ok} ok, {err} hard errors", flush=True)
