# Phase D: sportsdataverse api surface, ESPN odds field, llms.txt sweep, github search
import subprocess, json, pathlib, time
OUT = pathlib.Path(r"C:\Users\Garrett\.hermes\competitor-intel\LAUNCH")
UA = "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
n=[0]
def curl(url, hdrs=(), max_t=20):
    n[0]+=1; body = OUT/f"_db_{n[0]}.bin"
    cmd=["curl","-sS","-L","--max-time",str(max_t),"-o",str(body),"-w","%{http_code}|%{size_download}|%{content_type}","-H",UA]
    for h in hdrs: cmd+=["-H",h]
    cmd.append(url)
    try:
        r=subprocess.run(cmd,capture_output=True,text=True,timeout=max_t+8)
        p=r.stdout.strip().split("|",2)
        head=""
        if body.exists():
            head=body.read_text(encoding="utf-8",errors="replace")[:600]; body.unlink(missing_ok=True)
        return {"status":p[0] if p else "ERR","bytes":p[1] if len(p)>1 else "","head":head,"err":r.stderr[:120]}
    except Exception as e:
        return {"status":"EXC","error":str(e)[:120]}

tests=[
 # sportsdataverse hosted api (py docs path)
 ("sda-py-docs","https://api.sportsdataverse.org/py/api",[]),
 ("sda-nfl-datasets","https://api.sportsdataverse.org/datasets",[]),
 ("sda-v1-nfl","https://api.sportsdataverse.org/api/v1/datasets/nfl",[]),
 ("sda-openapi-py","https://api.sportsdataverse.org/py/openapi.json",[]),
 ("sda-root-json","https://api.sportsdataverse.org/",[]),
 # ESPN scoreboard ODDS field (hydrate)
 ("espn-odds-hydrate","https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?content=1&dates=20260903-20260910",[]),
 # llms.txt sweep — agent surfaces in sports tech
 ("pipeworx-llms","https://pipeworx.io/llms.txt",[]),
 ("sdataverse-org-llms","https://sportsdataverse.org/llms.txt",[]),
 ("thestatsapi-llms","https://thestatsapi.com/llms.txt",[]),
 ("collegefootballdata-llms","https://collegefootballdata.com/llms.txt",[]),
 ("oddspapi-docs","https://docs.oddspapi.io",[]),
 ("nflverse-llms","https://nflverse.com/llms.txt",[]),
 ("fbref-llms","https://fbref.com/llms.txt",[]),
 ("understat-llms","https://understat.com/llms.txt",[]),
 ("betfair-llms","https://www.betfair.com/llms.txt",[]),
 ("polymarket-llms","https://polymarket.com/llms.txt",[]),
 # sportsgameodds free api
 ("sgo-root","https://www.sportsgameodds.com",[]),
 ("sgo-api","https://api.sportsgameodds.com/api/v1/odds/free?sport=nfl",[]),
 ("myoddsai","https://www.myodds.ai",[]),
 ("betspherik","https://www.betspherik.com",[]),
 # cfbd correct public endpoints (no-key tier?)
 ("cfbd-seasons","https://api.collegefootballdata.com/seasons/years",[]),
 ("cfbd-coaches","https://api.collegefootballdata.com/coaches?year=2025",[]),
]
res={}
for name,url,h in tests:
    res[name]=curl(url,h)
    print(f"{name:22} {res[name]['status']} {res[name].get('bytes','')}B {res[name]['head'][:110]!r}")
    time.sleep(0.4)
(OUT/"_verify_phaseD.json").write_text(json.dumps(res,indent=1),encoding="utf-8")
