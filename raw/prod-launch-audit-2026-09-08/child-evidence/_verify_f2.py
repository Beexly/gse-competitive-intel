# Phase F2: GitHub repo metadata via requests (full JSON), and search-based owner lookup
import requests, json, pathlib, time
OUT = pathlib.Path(r"C:\Users\Garrett\.hermes\competitor-intel\LAUNCH")
S = requests.Session(); S.headers.update({"User-Agent":"intel-lookup","Accept":"application/vnd.github+json"})

def meta(fn):
    try:
        r = S.get(f"https://api.github.com/repos/{fn}", timeout=20)
        if r.status_code == 200:
            j = r.json()
            return {"found":True,"full":j["full_name"],"stars":j["stargazers_count"],
                    "lic":(j.get("license") or {}).get("spdx_id"),
                    "pushed":j["pushed_at"][:10],"desc":(j.get("description") or "")[:160],
                    "url":j["html_url"],"lang":j.get("language"),"archived":j.get("archived")}
        return {"found":False,"status":r.status_code}
    except Exception as e:
        return {"found":False,"err":str(e)[:80]}

def search(q):
    try:
        r = S.get("https://api.github.com/search/repositories", params={"q":q,"per_page":5}, timeout=25)
        out=[]
        for it in r.json().get("items",[]):
            out.append({"full":it["full_name"],"stars":it["stargazers_count"],
                        "lic":(it.get("license") or {}).get("spdx_id"),
                        "pushed":it["pushed_at"][:10],"desc":(it.get("description") or "")[:160],
                        "url":it["html_url"]})
        return out
    except Exception as e:
        return [{"err":str(e)[:80]}]

targets = ["PySport/kloppy","swar/nba_api","probberechts/soccerdata","scikit-learn-contrib/MAPIE",
 "henrikbostrom/crepes","deel-ai/puncc","ffverse/ffsimulator","JeffSackmann/tennis_atp",
 "nntrn/espn-wiki","pseudo-r/Public-ESPN-API","CFBD/cfbd-python","pipeworx-io/mcp-odds-api",
 "odds-api-io/odds-api-mcp-server","coreyjs/nhl-api-py","statsbomb/statsbombpy","martineastwood/penaltyblog",
 "LeSingh1/nba-api","OpenLigaDB/OpenLigaDB-Samples","valeman/awesome-conformal-prediction",
 "aangelopoulos/conformal-prediction","ml-stat-Sustech/TorchCP","superlinear-ai/conformal-tights",
 "salesforce/online_conformal","climate/properscoring","FabianKueppers/netcal","ddella/libcalibration",
 "JeffSackmann/tennis_wta","sportradar","fastf1","TheLionNet/nhlscraper","sinhrks/nhlscraper",
 " Colehaigler/nhl_data".strip(),"Hicruben/world-cup-2026-prediction-model","Mstolte02/cfb-model-v3",
 "xandao-dev/monte-carlo-betting-simulations","kyleskom/NFL-Medical","roclark/sportsipy",
 "tsysms/statsmodels","nicoderv/football-data-co-uk","pysgambler/football-data-co-uk"]
res={}
print("=== direct repo metadata ===")
for t in targets:
    m=meta(t); res[t]=m
    if m.get("found"):
        print(f"{m['full']:50} {m['stars']:5}* lic:{str(m['lic']):12} push:{m['pushed']} | {m['desc'][:80]}")
    else:
        print(f"{t:50} -> {m}")
    time.sleep(0.8)

print("\n=== searches (owner discovery) ===")
searches = {
 "nhl_data":"nhl data python scraper nhl",
 "netcal":"netcal neural network calibration",
 "openligadb":"openligadb",
 "scoremeridian":"scoremeridian",
 "sportsgeek":"sportsgeek api",
 "elo-sports-burke":"elo ratings sports python",
 "dixon-coles-ai":"dixon coles model python",
 "mlb-statsapi":"mlb statsapi python",
 "espn-web-api":"espn hidden api scoreboard python",
 "ncaa-data-api":"ncaa data api python",
 "kloppy":"kloppy",
 "tennis-atp":"tennis atp rankings data",
 "world-cup-2026":"world cup 2026 prediction dixon coles",
 "cfb-model-2026":"college football prediction model 2026",
 "nfl-elo":"nfl elo ratings python",
 "conformal-sports":"conformal prediction sports betting",
}
sres={}
for tag,q in searches.items():
    out=search(q); sres[tag]=out
    print(f"\n[{tag}]")
    for o in out[:4]:
        if "err" in o: print("  ERR",o["err"]); continue
        print(f"  {o['full']:46} {o['stars']:5}* lic:{str(o['lic']):12} push:{o['pushed']} | {o['desc'][:80]}")
    time.sleep(2.5)
(OUT/"_verify_gh.json").write_text(json.dumps({"repos":res,"search":sres},indent=1),encoding="utf-8")
