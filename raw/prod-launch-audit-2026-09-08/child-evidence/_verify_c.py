# Phase C: corrected probes — ESPN web api, sportsgeek, ssb csv, api search, llms.txt
import subprocess, json, pathlib, time

OUT = pathlib.Path(r"C:\Users\Garrett\.hermes\competitor-intel\LAUNCH")
UA = "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
ACC = "Accept: application/json"

n = [0]
def curl(url, extra_hdrs=(), max_t=15):
    n[0]+=1
    body = OUT/f"_body_{n[0]}.bin"
    cmd = ["curl","-sS","-L","--max-time",str(max_t),"-o",str(body),"-w","%{http_code}|%{size_download}|%{content_type}"]
    cmd += ["-H",UA,"-H",ACC]
    for h in extra_hdrs: cmd += ["-H",h]
    cmd.append(url)
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=max_t+8)
        parts = r.stdout.strip().split("|",2)
        status = parts[0] if parts else "ERR"
        head = ""
        if body.exists():
            try: head = body.read_text(encoding="utf-8", errors="replace")[:450]
            except Exception: head = "<binary>"
            body.unlink(missing_ok=True)
        return {"status": status, "bytes": parts[1] if len(parts)>1 else "", "ctype": parts[2] if len(parts)>2 else "", "head": head, "err": r.stderr[:120]}
    except Exception as e:
        return {"status":"EXC","error":str(e)[:120]}

tests = [
 # ESPN web api (the workaround host)
 ("espn-web-scoreboard", "https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard", []),
 ("espn-web-odds-nfl", "https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=2026&seasontype=2&week=1", []),
 ("espn-core-odds", "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events?limit=1", []),
 ("espn-web-mlb", "https://site.web.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard", []),
 ("espn-web-nba", "https://site.web.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard", []),
 ("espn-web-nhl", "https://site.web.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard", []),
 ("espn-web-cfb", "https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard", []),
 # NFL shield public
 ("nfl-shield-games", "https://api.nfl.com/football/v1/games/season2026week1?fields=games(matchupId,gameId)", []),
 ("nfl-digital", "https://api.nfl.com/content/v1/games/2026/2026091001/box-score", []),
 # football-data.co.uk
 ("fdcouk-nfl-2526", "https://www.football-data.co.uk/nflspreads.php", []),
 ("fdcouk-csv", "https://www.football-data.co.uk/new/ENG.csv", []),
 ("ssb-csv", "https://www.ssbdata.com/csvfiles/nflspreads/nflspreadsgames.csv", []),
 ("ssb-web", "https://www.ssbdata.com/webpages/nflspreadsgames.php", []),
 # sportsgeek
 ("sportsgeek-root", "https://sportsgeek.dev", []),
 ("sportsgeek-docs", "https://sportsgeek.dev/api/v1/docs", []),
 ("sportsgeek-nfl-odds", "https://sportsgeek.dev/api/v1/nfl/odds", []),
 ("sportsgeek-llms", "https://sportsgeek.dev/llms.txt", []),
 ("sportsgeek-robots", "https://sportsgeek.dev/robots.txt", []),
 # sportsdataverse api discovery
 ("sdataverse-docs", "https://api.sportsdataverse.org/docs", []),
 ("sdataverse-openapi", "https://api.sportsdataverse.org/openapi.json", []),
 ("sdataverse-root", "https://api.sportsdataverse.org/", []),
 ("sdataverse-llms", "https://api.sportsdataverse.org/llms.txt", []),
 # scoremeridian / thestatsapi / hooppals
 ("scoremeridian", "https://www.scoremeridian.com", []),
 ("scoremeridian-llms", "https://www.scoremeridian.com/llms.txt", []),
 ("thestatsapi", "https://thestatsapi.com", []),
 ("openligadb-bl1", "https://api.openligadb.de/getmatchdata/bl1/2025", []),
 ("openligadb-root", "https://api.openligadb.de", []),
 ("hoops-hcjones", "https://hoops.hcjones.io/api/nba/teams", []),
 ("hoops-llms", "https://hoops.hcjones.io/llms.txt", []),
 # ncaa
 ("ncaa-data", "https://data.ncaa.io/api/v1", []),
 # oddspapi llms + pricing
 ("oddspapi-llms", "https://oddspapi.io/llms.txt", []),
 ("the-odds-api-llms", "https://the-odds-api.com/llms.txt", []),
 # betfair docs public
 ("betfair-api", "https://developer.betfair.com/exchange-api/", []),
]
res={}
for name,url,hdr in tests:
    res[name]=curl(url,hdr)
    print(f"{name:22} {res[name]['status']} {res[name].get('bytes','')}B {res[name].get('head','')[:100]!r}")
    time.sleep(0.5)
(OUT/"_verify_phaseC.json").write_text(json.dumps(res,indent=1),encoding="utf-8")
