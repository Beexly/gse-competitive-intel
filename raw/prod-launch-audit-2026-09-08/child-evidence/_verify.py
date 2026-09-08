# Phase A: keyless GET verification of candidate data sources
import requests, json, pathlib, time

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"}
H = dict(UA); H["Accept"] = "application/json"
P = dict(UA); P["Accept"] = "*/*"

def probe(url, headers=None, name=None, params=None):
    headers = headers or H
    t0 = time.time()
    try:
        r = requests.get(url, headers=headers, timeout=15, params=params, allow_redirects=True)
        body = r.text[:500]
        return {"name": name or url, "url": r.url, "status": r.status_code,
                "ctype": r.headers.get("content-type",""), "bytes": len(r.content),
                "ms": int((time.time()-t0)*1000), "body_head": body, "ok": r.status_code == 200}
    except Exception as e:
        return {"name": name or url, "url": url, "status": "ERR", "error": str(e)[:200], "ok": False}

probes = [
 # Smarkets
 ("smarkets-ws-config", "https://hub.smarkets.com/datafeed/websocket_configuration.json", H, None),
 ("smarkets-root", "https://www.smarkets.com", UA, None),
 # SSB free NFL spreads csv
 ("ssb-nfl-spreads-2026", "https://www.ssbdata.com/csvfiles/nflspreads/nflspreadsgames.csv", UA, None),
 ("ssb-root", "https://www.ssbdata.com/", UA, None),
 # collegefootballdata
 ("cfbd-stats2026", "https://api.collegefootballdata.com/team/stats?year=2026", H, None),
 ("cfbd-conferences", "https://api.collegefootballdata.com/conferences?year=2026", H, None),
 # MLB statsapi
 ("mlb-schedule-today", "https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=09/08/2026&hydrate=team", H, None),
 ("mlb-versions", "https://statsapi.mlb.com/api/versions", H, None),
 # NHL api-web
 ("nhl-score-2026", "https://api-web.nhle.com/v1/score/2026-09-08", H, None),
 ("nhl-club-shell", "https://statsapi.web.nhl.com/api/v1/teams", H, None),
 # ESPN hidden site.web.api
 ("espn-scores-nfl", "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard", H, None),
 ("espn-swift-nfl", "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events?limit=1&lang=en&region=us", H, None),
 # NBA stats
 ("nba-stats-today", "https://stats.nba.com/stats/scoreboardv2?GameDate=09/07/2026&LeagueID=00&DayOffset=0", H, None),
 ("nba-cdn", "https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json", H, None),
 # sportsdataverse free api
 ("sdataverse-manifest", "https://api.sportsdataverse.org/api/v1/manifest/nfl", H, None),
 ("sdataverse-root", "https://sportsdataverse.org/", UA, None),
 # proxy-sports
 ("proxy-nfl-week1", "https://proxy-sports.com/nfl/2026/week/1", H, None),
 ("proxy-root", "https://proxy-sports.com", UA, None),
 # hoopr / nflverse
 ("hoopr-github", "https://hoopr.sportsdataverse.org", UA, None),
 ("nflverse-root", "https://nflverse.com", UA, None),
 # oddspapi
 ("oddspapi-root", "https://data.oddspapi.io", H, None),
 # pipeworx sportsbookapi
 ("pipeworx-books", "https://api.sportsbookapi.net/v1/sportsbooks", H, {"sport": "soccer_epl"}),
 # NHLe
 ("nhle-github", "https://github.com/seanmcarroll/NHLe", UA, None),
 # cbbfastR
 ("cbbfastr-repo", "https://github.com/sportsdataverse/cbbfastR", UA, None),
 # the-odds-api docs pricing
 ("theoddsapi-pricing", "https://the-odds-api.com/liveapi/guides/v4/", UA, None),
]
out = {}
for name, url, headers, params in probes:
    out[name] = probe(url, headers, name, params)
    print(f"{name:22} {out[name]['status']} {out[name].get('bytes','')}B {out[name].get('body_head','')[:110]!r}")

pathlib.Path(r"C:\Users\Garrett\.hermes\competitor-intel\LAUNCH\_verify_phaseA.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
