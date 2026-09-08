# -*- coding: utf-8 -*-
"""Harvest all repo READMEs into codes/*.json. Resumable: skips existing files."""
import json, os, urllib.request, time, re
CI = r"C:\Users\Garrett\.hermes\competitor-intel"
CODES = os.path.join(CI, "codes")
os.makedirs(CODES, exist_ok=True)
repos = json.load(open(os.path.join(CI, "_repos_raw.json")))

def fetch(url, timeout=20):
    req = urllib.request.Request(url, headers={"User-Agent": "gse-intel"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", errors="replace")

written, failed = 0, []
items = sorted(repos.items(), key=lambda kv: -kv[1]["stars"])
for fn, meta in items:
    slug = fn.replace("github.com/", "").replace("/", "_")
    outp = os.path.join(CODES, slug + ".json")
    if os.path.exists(outp):
        continue
    try:
        time.sleep(0.4)
        readme = fetch(f"https://raw.githubusercontent.com/{fn.replace('github.com/', '')}/HEAD/README.md")
        try:
            lic = fetch(f"https://raw.githubusercontent.com/{fn.replace('github.com/', '')}/HEAD/LICENSE").split("\n")[0][:60]
        except Exception:
            lic = "none-found"
        rec = {"repo": fn, "stars": meta["stars"], "topic": meta["topic"],
               "desc": meta["desc"], "updated": meta["updated"],
               "license_first_line": lic, "readme_chars": len(readme),
               "readme_head": readme[:3500],
               "apis_detected": sorted(set(re.findall(r"(api\.[a-z0-9.-]+\.[a-z]{2,})", readme.lower())))[:12]}
        json.dump(rec, open(outp, "w", encoding="utf-8"), ensure_ascii=False)
        written += 1
    except Exception as e:
        failed.append((fn, str(e)[:60]))
    if written and written % 100 == 0:
        print(f"progress: {written} written, {len(failed)} failed", flush=True)

print(f"REPO HARVEST COMPLETE: wrote {written}, failed {len(failed)}", flush=True)
json.dump(failed, open(os.path.join(CI, "_harvest_failed.json"), "w"))
