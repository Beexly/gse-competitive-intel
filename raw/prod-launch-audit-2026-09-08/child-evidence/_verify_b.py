# Phase B: curl-based retries + corrected endpoints + github/pypi verification
import subprocess, json, pathlib, hashlib, time

def curl(url, headers=None, max_t=15):
    cmd = ["curl","-sS","-L","--max-time",str(max_t),"-o",str(OUT/"_body.bin"),"-w","%{http_code}|%{size_download}|%{content_type}|%{url_effective}"]
    if headers:
        for h in headers: cmd += ["-H", h]
    cmd.append(url)
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=max_t+5)
        meta = r.stdout.strip().split("|",3)
        body = (OUT/"_body.bin").read_text(encoding="utf-8", errors="replace")[:400] if (OUT/"_body.bin").exists() else ""
        return {"status": meta[0] if meta else "ERR", "bytes": meta[1] if len(meta)>1 else "", "ctype": meta[2] if len(meta)>2 else "", "final": meta[3] if len(meta)>3 else url, "head": body, "err": r.stderr[:150]}
    except Exception as e:
        return {"status":"EXC","error":str(e)[:150]}

OUT = pathlib.Path(r"C:\Users\Garrett\.hermes\competitor-intel\LAUNCH")
UA = "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
ACC = "Accept: application/json"
res = {}
tests = [
 # retries with curl
 ("ssb-csv", "https://www.ssbdata.com/csvfiles/nflspreads/nflspreadsgames.csv", [UA]),
 ("ssb-root", "https://www.ssbdata.com/", [UA]),
 ("proxy-sports-root", "https://proxy.sportsdataverse.org/", [UA, ACC]),
 ("proxy-sports-cbb", "https://proxy.sportsdataverse.org/cbb/scoreboard?season=2025", [UA, ACC]),
 ("smarkets-hub", "https://hub.smarkets.com/datafeed/websocket_configuration.json", [UA]),
 ("smarkets-tradingapi", "https://trading-api.readme.io/reference/getting-started", [UA]),
 ("nhl-club-shell", "https://statsapi.web.nhl.com/api/v1/teams", [UA]),
 ("nba-stats-retry", "https://stats.nba.com/stats/scoreboardv2?GameDate=09/07/2026&LeagueID=00&DayOffset=0", [UA, ACC, "Referer: https://www.nba.com/", "Origin: https://www.nba.com"]),
 ("espn-scoreboard-retry", "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard", [UA]),
 ("oddspapi", "https://oddspapi.io", [UA]),
 ("pipeworx", "https://pipeworx.io", [UA]),
 ("pipeworx-github", "https://api.github.com/repos/pipeworx-io/mcp-odds-api", [UA]),
 # github repos (correct case) via api
 ("gh_nba_api", "https://api.github.com/repos/swar/nba_api", [UA]),
 ("gh_nhldata", "https://api.github.com/repos/colehaigler/nhldata", [UA]),
 ("gh_nhlescraper", "https://api.github.com/repos/sinhrks/nhlscraper", [UA]),
 ("gh_kyleskom_nfl", "https://api.github.com/repos/kyleskom/NFL-Medical", [UA]),
 ("gh_espn_infrastructure", "https://api.github.com/repos/nntrn/espn-wiki", [UA]),
 ("gh_espn_api_py", "https://api.github.com/repos/warreneasterday/espn-api", [UA]),
 ("gh_mlb_statsapi_py", "https://api.github.com/repos/buanpham/mlb-statsapi", [UA]),
 ("gh_cfbpy", "https://api.github.com/repos/CFBD/cfbd-python", [UA]),
 ("gh_openligadb", "https://api.github.com/repos/openligadb/openligadb-python", [UA]),
 ("gh_kloppy", "https://api.github.com/repos/klue0/kloppy", [UA]),
 ("gh_kloppy2", "https://api.github.com/repos/PROBAI-Lab/Kloppy", [UA]),
 ("gh_socceraction", "https://api.github.com/repos/kreavi-lab/socceraction", [UA]),
 ("gh_statsbombpy", "https://api.github.com/repos/statsbomb/statsbombpy", [UA]),
 ("gh_ffsimulator", "https://api.github.com/repos/ffverse/ffsimulator", [UA]),
 ("gh_tenatatp", "https://api.github.com/repos/JeffSackmann/tennis_atp", [UA]),
 ("gh_footballdatacouk", "https://github.com/football-data/website", [UA]),
 # pypi libs
 ("pypi_mapie", "https://pypi.org/pypi/MAPIE/json", [UA]),
 ("pypi_crepes", "https://pypi.org/pypi/crepes/json", [UA]),
 ("pypi_netcal", "https://pypi.org/pypi/netcal/json", [UA]),
 ("pypi_properscoring", "https://pypi.org/pypi/properscoring/json", [UA]),
 ("pypi_scoringrules", "https://pypi.org/pypi/scoringrules/json", [UA]),
 ("pypi_jaxpinball", "https://pypi.org/pypi/nba_api/json", [UA]),
 ("pypi_megapred", "https://pypi.org/pypi/megapred/json", [UA]),
 ("pypi_uncertainty", "https://pypi.org/pypi/reliability/json", [UA]),
 ("pypi_conformalpred", "https://pypi.org/pypi/conformal-prediction/json", [UA]),
]
for name,url,hdr in tests:
    res[name] = curl(url, hdr)
    print(f"{name:22} {res[name]['status']} {res[name].get('bytes','')}B {res[name].get('head','')[:90]!r}")
    time.sleep(0.4)
(OUT/"_verify_phaseB.json").write_text(json.dumps(res, indent=1), encoding="utf-8")
