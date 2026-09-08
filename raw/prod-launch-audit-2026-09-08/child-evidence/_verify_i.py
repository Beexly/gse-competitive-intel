# Phase I: last mile — pypi licenses, clubelo http, betfair docs, betexplorer/covers/oddalert, espn-wiki README, statsbombpy LICENSE
import subprocess, json, pathlib, time
OUT = pathlib.Path(r"C:\Users\Garrett\.hermes\competitor-intel\LAUNCH")
n=[0]
def curl(url,hdrs=(),mt=16):
    n[0]+=1; b=OUT/f"_i_{n[0]}.bin"
    cmd=["curl","-sS","-L","--max-time",str(mt),"-o",str(b),"-w","%{http_code}|%{size_download}|%{content_type}","-H","User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"]
    for h in hdrs: cmd+=["-H",h]
    cmd.append(url)
    try:
        r=subprocess.run(cmd,capture_output=True,text=True,timeout=mt+6); p=r.stdout.strip().split("|",2)
        head=b.read_text(encoding="utf-8",errors="replace")[:500] if b.exists() else ""
        full=b.read_text(encoding="utf-8",errors="replace") if b.exists() else ""
        if b.exists(): b.unlink()
        return {"status":p[0] if p else "ERR","bytes":p[1] if len(p)>1 else "","head":head,"full":full}
    except Exception as e: return {"status":"EXC","error":str(e)[:100]}

# PyPI license classifiers
for pkg in ["puncc","netcal","properscoring","scoringrules","jaxpinball","mapie","crepes","conformal-prediction-toolbox"]:
    d=curl(f"https://pypi.org/pypi/{pkg}/json")
    try:
        j=json.loads(d["full"]); lic=j["info"].get("license") or [c for c in j["info"]["classifiers"] if "License" in c]
        ver=j["info"]["version"]
        print(f"pypi {pkg:22} {d['status']} v{ver} lic={lic}")
    except Exception:
        print(f"pypi {pkg:22} {d['status']} parse-fail {d['head'][:60]!r}")
    time.sleep(0.5)

tests=[
 ("clubelo-http","http://api.clubelo.com/Juventus",[]),
 ("clubelo-root","http://www.clubelo.com/",[]),
 ("betfair-dev","https://developer.betfair.com/",[]),
 ("betexplorer","https://www.betexplorer.com/football/",[]),
 ("covers-odds","https://www.covers.com/sportsbook/odds",[]),
 ("oddalert","https://www.oddalert.com/",[]),
 ("espn-wiki-raw","https://raw.githubusercontent.com/nntrn/espn-wiki/main/README.md",[]),
 ("statsbombpy-lic","https://raw.githubusercontent.com/statsbomb/statsbombpy/master/LICENSE",[]),
 ("nba-api-lic","https://raw.githubusercontent.com/swar/nba_api/master/LICENSE",[]),
 ("mlb-statsapi-lic","https://raw.githubusercontent.com/zero-sum-seattle/python-mlb-statsapi/main/LICENSE.md",[]),
 ("kloppy-lic","https://raw.githubusercontent.com/PySport/kloppy/master/LICENSE",[]),
 ("tennis-atp-page","https://github.com/JeffSackmann/tennis_atp",[]),
 ("thestatsapi-home","https://thestatsapi.com/",[]),
 ("cfbd-home","https://collegefootballdata.com/",[]),
 ("pipeworx-sports-pack","https://pipeworx.io/packs",[]),
]
res={}
for name,url,h in tests:
    d=curl(url,h); res[name]={k:v for k,v in d.items() if k!="full"}
    extra=""
    if name=="thestatsapi-home":
        import re
        m=re.findall(r"[^.]*(?:free|Free)[^.]*requests[^.]*\.", d["full"] or "")
        extra=" | pricing-snips: "+ " ;; ".join(m[:3])
    print(f"{name:20} {d['status']:>4} {str(d.get('bytes','')):>8}B {d['head'][:90]!r}{extra}")
    time.sleep(0.6)
(OUT/"_verify_phaseI.json").write_text(json.dumps(res,indent=1),encoding="utf-8")
