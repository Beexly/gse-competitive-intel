# Phase G: remaining keyless endpoints + llms.txt sweep + raw-file license checks
import subprocess, json, pathlib, time
OUT = pathlib.Path(r"C:\Users\Garrett\.hermes\competitor-intel\LAUNCH")
n=[0]
def curl(url,hdrs=(),mt=16):
    n[0]+=1; b=OUT/f"_g_{n[0]}.bin"
    cmd=["curl","-sS","-L","--max-time",str(mt),"-o",str(b),"-w","%{http_code}|%{size_download}|%{content_type}","-H","User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"]
    for h in hdrs: cmd+=["-H",h]
    cmd.append(url)
    try:
        r=subprocess.run(cmd,capture_output=True,text=True,timeout=mt+6); p=r.stdout.strip().split("|",2)
        head=b.read_text(encoding="utf-8",errors="replace")[:400] if b.exists() else ""
        if b.exists(): b.unlink()
        return {"status":p[0] if p else "ERR","bytes":p[1] if len(p)>1 else "","head":head,"err":(r.stderr or "")[:100]}
    except Exception as e: return {"status":"EXC","error":str(e)[:100]}

NBAREF=["Referer: https://www.nba.com/stats/","Origin: https://www.nba.com"]
tests=[
 # clubelo — free keyless Elo for ~150 soccer clubs
 ("clubelo-txt","https://api.clubelo.com",[]),
 ("clubelo-team","https://api.clubelo.com/Real-Madrid",[]),
 # eloratings.net — national teams
 ("eloratings","http://eloratings.net/AFC",[]),
 # football-data.co.uk retry (historical odds CSVs, keyless)
 ("fdcouk-2025","https://www.football-data.co.uk/new/English.pdf",[]),
 ("fdcouk-main","https://www.football-data.co.uk/englandchm.php",[]),
 ("ssb-www","https://ssbdata.com/csvfiles/nflspreads/nflspreadsgame.csv",[]),
 # stats.nba.com with referer
 ("nba-ledger","https://stats.nba.com/stats/leaguestandingsv3?LeagueID=00&Season=2025-26&SeasonType=Regular+Season",NBAREF),
 # NCAA
 ("ncaa-slashroot","https://data.ncaa.org/cume/stats",[]),
 ("ncaa-root","https://www.ncaa.org/",[]),
 # tennis_atp raw csv (keyless data dumps)
 ("atp-rank","https://raw.githubusercontent.com/JeffSackmann/tennis_atp/master/atp_rankings_current.csv",[]),
 # wta
 ("wta-rank","https://raw.githubusercontent.com/JeffSackmann/tennis_wta/master/wta_rankings_current.csv",[]),
 # ESPN hidden core API single game odds items
 ("espn-core-events","https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events?limit=2",[]),
 # sportsdataverse hosted cfbfastr api
 ("sda-cfbfastr","https://api.sportsdataverse.org/cfbfastr-py/api/v1/teams",[]),
 ("sda-nflfastpy","https://api.sportsdataverse.org/nflfastpy-py/api",[]),
 # fotmob (known? not in corpus) keyless-ish API
 ("fotmob-matches","https://www.fotmob.com/matches.json",[]),
 # sofascore
 ("sofascore-root","https://www.sofascore.com/",[]),
 # llms.txt sweep (agent surfaces in sports tech)
 ("statmuse-llms","https://www.statmuse.com/llms.txt",[]),
 ("fotmob-llms","https://www.fotmob.com/llms.txt",[]),
 ("sofascore-llms","https://www.sofascore.com/llms.txt",[]),
 ("api-sports-llms","https://api-sports.io/llms.txt",[]),
 ("sportsdataio-llms","https://sportsdata.io/llms.txt",[]),
 ("vegas-llms","https://www.vegasinsider.com/llms.txt",[]),
 ("pipeworx-tools","https://pipeworx.io/tools/sports",[]),
 ("scoremeridian-com","https://scoremeridian.com",[]),
 ("sportsgeek-io","https://sportsgeek.io",[]),
 ("sportsgeek-app","https://sportsgeek.app",[]),
 ("thestatsapi-docs","https://thestatsapi.com/pricing",[]),
]
res={}
for name,url,h in tests:
    d=curl(url,h); res[name]=d
    print(f"{name:20} {d['status']:>4} {str(d.get('bytes','')):>9}B {d['head'][:90]!r}")
    time.sleep(0.6)
(OUT/"_verify_phaseG.json").write_text(json.dumps(res,indent=1),encoding="utf-8")
