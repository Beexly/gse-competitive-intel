# Phase H: free-tier pricing evidence + retry DNS-flaky hosts with name resolution + file names
import subprocess, json, pathlib, time, socket
OUT = pathlib.Path(r"C:\Users\Garrett\.hermes\competitor-intel\LAUNCH")
def dns(h):
    try: return socket.gethostbyname(h)
    except Exception as e: return f"NODNS:{e}"
for h in ["api.clubelo.com","www.clubelo.com","ssbdata.com","www.ssbdata.com","data.ncaa.org",
          "stats.nba.com","cdn.nba.com","proxy-sports.com","data.oddspapi.io","api.oddspapi.io",
          "scoremeridian.io","sportsgeek.dev","thestatsapi.com","pipeworx.io","site.web.api.espn.com"]:
    print(f"{h:26} {dns(h)}")

n=[0]
def curl(url,hdrs=(),mt=16):
    n[0]+=1; b=OUT/f"_h_{n[0]}.bin"
    cmd=["curl","-sS","-L","--max-time",str(mt),"-o",str(b),"-w","%{http_code}|%{size_download}|%{content_type}","-H","User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"]
    for h in hdrs: cmd+=["-H",h]
    cmd.append(url)
    try:
        r=subprocess.run(cmd,capture_output=True,text=True,timeout=mt+6); p=r.stdout.strip().split("|",2)
        head=b.read_text(encoding="utf-8",errors="replace")[:600] if b.exists() else ""
        if b.exists(): b.unlink()
        return {"status":p[0] if p else "ERR","bytes":p[1] if len(p)>1 else "","head":head,"err":(r.stderr or "")[:100]}
    except Exception as e: return {"status":"EXC","error":str(e)[:100]}

tests=[
 ("clubelo-ssl","https://api.clubelo.com/Juventus",[]),
 ("oddspapi-pricing","https://oddspapi.io/pricing",[]),
 ("thestatsapi-pricing-alt","https://thestatsapi.com/#pricing",[]),
 ("pipeworx-pricing","https://pipeworx.io/pricing",[]),
 ("sportsgeek-docs","https://sportsgeek.dev/docs",[]),
 ("atp-list","https://api.github.com/repos/JeffSackmann/tennis_atp/contents/",[]),
 ("tennis_raw1","https://raw.githubusercontent.com/JeffSackmann/tennis_atp/refs/heads/master/atp_rankings_current.csv",[]),
 ("nhl-data-list","https://api.github.com/search/repositories?q=nhl+metrics+python&sort=stars&per_page=3",[]),
 ("cfbd-swagger","https://api.collegefootballdata.com/swagger.json",[]),
 ("espn-core-swift-list","https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/401872656/competitions",[]),
 ("ncaa-sports-api","https://data.ncaa.org/cume/season",[]),
 ("fotmob-llms-full","https://www.fotmob.com/llms.txt",[]),
 ("openligadb-swagger","https://api.openligadb.de/index.html",[]),
]
res={}
for name,url,h in tests:
    d=curl(url,h); res[name]=d
    print(f"\n--- {name} {d['status']} {d.get('bytes','')}B ---\n{d['head'][:200]!r}")
    time.sleep(0.8)
(OUT/"_verify_phaseH.json").write_text(json.dumps(res,indent=1),encoding="utf-8")
