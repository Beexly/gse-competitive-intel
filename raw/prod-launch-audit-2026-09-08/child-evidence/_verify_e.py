# Phase E: GitHub search for 2025-2026 engines (not in codes ledger) + license pulls
import subprocess, json, pathlib, time, urllib.parse
OUT = pathlib.Path(r"C:\Users\Garrett\.hermes\competitor-intel\LAUNCH")
corpus = pathlib.Path(r"C:\Users\Garrett\.hermes\competitor-intel")
known = set((corpus/"_dedupe_names.txt").read_text(encoding="utf-8").splitlines())
codes = {f.stem.lower() for f in (corpus/"codes").glob("*.json")}
UA="User-Agent: intel-agent"
def gh(url):
    r=subprocess.run(["curl","-sS","--max-time","20","-H",UA,url],capture_output=True,text=True)
    try: return json.loads(r.stdout)
    except Exception: return {"_err":r.stdout[:200]+r.stderr[:200]}

queries = [
 ("dixon-coles","dixon coles football"),
 ("elo-sports","sports elo ratings"),
 ("mc-sim","monte carlo sports simulation"),
 ("nfl-predict","NFL game prediction machine learning"),
 ("cfb-predict","college football prediction model"),
 ("nba-predict","NBA prediction model simulation"),
 ("mlb-predict","MLB win prediction"),
 ("conformal","conformal prediction"),
 ("calibration","probability calibration classification"),
 ("odds-engine","sports betting odds API client"),
 ("poisson-football","poisson football model"),
 ("kelly","kelly criterion betting"),
]
all_repos = {}
for tag, q in queries:
    eq = urllib.parse.quote(q)
    d = gh(f"https://api.github.com/search/repositories?q={eq}+pushed:>2025-01-01&sort=stars&order=desc&per_page=15")
    items = d.get("items",[])
    print(f"\n=== {tag} ({len(items)}) ===")
    for it in items:
        fn = it["full_name"]; slug = fn.lower().replace("/","_")
        is_known = fn.lower() in known or slug in codes or any(fn.lower() in k for k in codes)
        lic = (it.get("license") or {}).get("spdx_id","-")
        star = it["stargazers_count"]; pushed = it["pushed_at"][:10]
        desc = (it.get("description") or "")[:90]
        flag = "IN-CORPUS" if is_known else "NEW"
        print(f"{flag:10} {fn:48} {star:5}* {lic:12} push:{pushed} | {desc}")
        if not is_known and (star>=20 or "conformal" in tag or "calib" in tag):
            all_repos[fn]={"stars":star,"lic":lic,"pushed":pushed,"desc":it.get("description",""),"url":it["html_url"],"tag":tag}
    time.sleep(2)  # rate limit
(OUT/"_gh_new_candidates.json").write_text(json.dumps(all_repos,indent=1),encoding="utf-8")
print("\nsaved", len(all_repos), "new candidates")
