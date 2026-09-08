# Phase F: final targeted verification — odds free tiers + engine repo licenses + llms agent surfaces
import subprocess, json, pathlib, time
OUT = pathlib.Path(r"C:\Users\Garrett\.hermes\competitor-intel\LAUNCH")
UA="User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36"
n=[0]
def curl(url,hdrs=(),mt=18):
    n[0]+=1; b=OUT/f"_fb_{n[0]}.bin"
    cmd=["curl","-sS","-L","--max-time",str(mt),"-o",str(b),"-w","%{http_code}|%{size_download}|%{content_type}","-H",UA]
    for h in hdrs: cmd+=["-H",h]
    cmd.append(url)
    try:
        r=subprocess.run(cmd,capture_output=True,text=True,timeout=mt+6); p=r.stdout.strip().split("|",2)
        head=b.read_text(encoding="utf-8",errors="replace")[:350] if b.exists() else ""; 
        if b.exists(): b.unlink()
        return {"status":p[0] if p else "ERR","bytes":p[1] if len(p)>1 else "","head":head,"err":r.stderr[:100]}
    except Exception as e: return {"status":"EXC","error":str(e)[:100]}

def ghfull(fn):
    d=curl(f"https://api.github.com/repos/{fn}",["Accept: application/vnd.github+json"])
    try:
        j=json.loads(d["head"]) if d["head"].strip().startswith("{") else {}
    except: j={}
    return d

# GitHub repo metadata (proper search fallback by name)
repos = ["PySport/kloppy","swar/nba_api","colehaigler/nhl_data","probberechts/soccerdata",
         "scikit-learn-contrib/MAPIE","henrikbostrom/crepes","deel-ai/puncc","FabianKueppers/netcal",
         "climate/properscoring","ffverse/ffsimulator","JeffSackmann/tennis_atp","openligadb/OpenLigaDB-Samples",
         "nntrn/espn-wiki","pseudo-r/Public-ESPN-API","CFBD/cfbd-python","pipeworx-io/mcp-odds-api",
         "odds-api-io/odds-api-mcp-server","scikit-learn-contrib/MAPIE"]
res={}
print("=== GitHub repo metadata ===")
for fn in repos:
    d=curl(f"https://api.github.com/repos/{fn}",["Accept: application/vnd.github+json"])
    try: j=json.loads(d["head"]) if d["head"].lstrip().startswith("{") else {}
    except: j={}
    if not j.get("full_name"):
        # try search
        s=curl(f"https://api.github.com/search/repositories?q={fn.split('/')[-1]}&per_page=1")
        try: jj=json.loads(s["head"]); items=jj.get("items",[]); j=items[0] if items else {}
        except: j={}
    lic=(j.get("license") or {}).get("spdx_id","?")
    print(f"{fn:42} {d['status']} stars:{j.get('stargazers_count','?')} lic:{lic} push:{str(j.get('pushed_at',''))[:10]} desc:{str(j.get('description',''))[:70]}")
    time.sleep(1.2)

print("\n=== Odds free-tier endpoints ===")
odds=[("betfair-prices","https://www.betfair.com/exchange/plus/",[]),
 ("smarkets-api","https://api.smarkets.com/",[]),
 ("smarkets-docs","https://docs.smarkets.com/",[]),
 ("smarkets-tradingapi-ref","https://trading-api.readme.io/reference/getting-started",[]),
 ("football-data-org-docs","https://www.football-data.org/docs/v1/index.html",[]),
 ("api-football-root","https://api-football.com",[]),
 ("betradar","https://www.betradar.com/en-gb/products/unified-odds-feed/",[]),
 ("oddspedia-api","https://oddspedia.com",[]),
 ("scoremeridian-site","https://scoremeridian.io",[]),
 ("sportsgeek-site","https://sportsgeek.dev",[]),
 ("sportsgeek-alt","https://api.sportsgeek.dev",[]),
 ("sportsgameodds-api","https://api.sportsgameodds.com",[]),
 ("betexplorer","https://www.betexplorer.com",[]),
 ("vegasinsider","https://www.vegasinsider.com",[]),
]
for name,url,h in odds:
    d=curl(url,h); res[name]=d
    print(f"{name:22} {d['status']} {d.get('bytes','')}B {d['head'][:80]!r}")
    time.sleep(0.5)
(OUT/"_verify_phaseF.json").write_text(json.dumps(res,indent=1),encoding="utf-8")
