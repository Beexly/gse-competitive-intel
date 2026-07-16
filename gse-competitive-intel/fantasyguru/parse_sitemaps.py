#!/usr/bin/env python3
"""Parse FantasyGuru public sitemaps -> master inventory + sport/franchise classification.
Metadata only (URL, slug, lastmod). No article bodies. Public data."""
import re, os, csv, glob, json
from collections import Counter, defaultdict

DIR = os.path.dirname(os.path.abspath(__file__))
rows = []
loc_re = re.compile(r"<loc>(.*?)</loc>", re.S)
lm_re = re.compile(r"<lastmod>(.*?)</lastmod>", re.S)

for f in sorted(glob.glob(os.path.join(DIR, "sitemap-posts-*.xml"))):
    txt = open(f, encoding="utf-8", errors="replace").read()
    # split into <url>...</url> blocks
    for block in re.findall(r"<url>(.*?)</url>", txt, re.S):
        lm = loc_re.search(block)
        if not lm:
            continue
        url = lm.group(1).strip()
        lastmod = lm_re.search(block)
        lastmod = lastmod.group(1).strip() if lastmod else ""
        slug = url.rstrip("/").split("/")[-1]
        rows.append((url, slug, lastmod, os.path.basename(f)))

print(f"Total article URLs parsed: {len(rows)}")

# ---- Sport classification via slug keywords ----
def classify_sport(slug):
    s = slug.lower()
    # explicit sport tokens
    nfl_kw = ["nfl","-qb-","quarterback","running-back","wide-receiver","tight-end","rookie-expectation",
              "offensive-line","coach-breakdown","coaching","practice-report","training-camp","waiver-wire",
              "dynasty","bestball","best-ball","adp","mock-draft","targets-and-touches","super-bowl","draft-guide-football",
              "cash-game","snap-count","redzone","red-zone","depth-chart","franchise-mode","player-profile"]
    mlb_kw = ["mlb","baseball","pitcher","hitter","umpire","strike-zone","bullpen","rays-plays","rays-ramblings",
              "smash","total-bases","strikeouts","faab","batter","fantasy-baseball","burr-report","closer",
              "starting-pitcher","first-pitch","weather"]
    nba_kw = ["nba","basketball","fenstys","delta-force","march-madness"]
    nhl_kw = ["nhl","hockey"]
    other_kw = {"pga":["pga","golf"],"nascar":["nascar","raceguru","racing"],"mma":["mma","ufc"],
                "soccer":["soccer"],"cfb":["cfb","ncaa","college-football","roster-roulette"],
                "wnba":["wnba"],"cfl":["cfl"],"ufl":["ufl"],"esports":["esports"],"horse":["horse-racing","thoroughbred"]}
    # priority: mlb/nfl explicit first
    if any(k in s for k in ["mlb","baseball","umpire","bullpen","rays-plays","rays-ramblings","pitcher","hitter","faab","total-bases","burr-report"]):
        return "MLB"
    if any(k in s for k in ["nfl","offensive-line","coach-breakdown","coaching-","training-camp","waiver-wire","super-bowl","targets-and-touches","practice-report","bestball","best-ball","mock-draft"]):
        return "NFL"
    for sport,kws in other_kw.items():
        if any(k in s for k in kws):
            return sport.upper()
    if any(k in s for k in nba_kw): return "NBA"
    if any(k in s for k in nhl_kw): return "NHL"
    if any(k in s for k in mlb_kw): return "MLB"
    if any(k in s for k in nfl_kw): return "NFL"
    return "OTHER/UNKNOWN"

# ---- Franchise (content-type) tagging ----
FRANCHISE = [
    ("MLB Umpire Report", ["umpire","strike-zone"]),
    ("MLB DFS Breakdown", ["mlb-dfs-breakdown","mlb-dfs-draftkings","mlb-dfs-fanduel"]),
    ("Ray's Plays", ["rays-plays"]),
    ("Ray's Ramblings", ["rays-ramblings"]),
    ("MLB Cheat Sheet", ["mlb-cheat-sheet"]),
    ("MLB SMASH Report", ["mlb-smash","smash-report-hitters","smash-report-pitchers"]),
    ("MLB Burr Report", ["burr-report"]),
    ("MLB Bullpen", ["bullpen"]),
    ("MLB Weekly Preview", ["mlb-weekly-preview"]),
    ("MLB Player Profile", ["mlb-player-profile","mlb-profile"]),
    ("MLB Rankings/ADP", ["mlb-rankings","mlb-adp"]),
    ("MLB Weather/Totals", ["mlb-weather","total-bases","projected-strikeouts"]),
    ("Offensive Line Breakdown", ["offensive-line"]),
    ("Coach Breakdown", ["coach-breakdown","coaching-system","coaching-breakdown"]),
    ("Practice Report", ["practice-report"]),
    ("Training Camp Report", ["training-camp"]),
    ("Targets & Touches", ["targets-and-touches"]),
    ("Rookie Expectation/Profile", ["rookie-expectation","rookie-profile","rookie-"]),
    ("Player Profile (NFL)", ["player-profile"]),
    ("QB Analysis", ["qb-types","quarterback","-qb-"]),
    ("Dynasty", ["dynasty"]),
    ("Best Ball", ["bestball","best-ball"]),
    ("Mock Draft", ["mock-draft"]),
    ("Waiver Wire", ["waiver-wire"]),
    ("NFL DFS Breakdown", ["nfl-dfs","cash-game","dfs-breakdown"]),
    ("Weekly Preview", ["weekly-preview"]),
    ("Betting/Props", ["betting","props","odds","futures"]),
    ("Podcast/Livestream", ["podcast","episode","livestream","roster-coach","live-"]),
]
def franchise(slug):
    s = slug.lower()
    tags = [name for name,kws in FRANCHISE if any(k in s for k in kws)]
    return tags[0] if tags else ""

# write master + per-sport
sport_counts = Counter()
franchise_counts = Counter()
by_sport = defaultdict(list)
for url, slug, lastmod, src in rows:
    sp = classify_sport(slug)
    fr = franchise(slug)
    sport_counts[sp]+=1
    if fr: franchise_counts[fr]+=1
    by_sport[sp].append((url,slug,lastmod,fr))

with open(os.path.join(DIR,"inventory-master.csv"),"w",newline="",encoding="utf-8") as fh:
    w=csv.writer(fh); w.writerow(["url","slug","lastmod","sport","franchise","sitemap"])
    for url, slug, lastmod, src in rows:
        w.writerow([url,slug,lastmod,classify_sport(slug),franchise(slug),src])

for sp in ["NFL","MLB"]:
    items = sorted(by_sport[sp], key=lambda x:x[2], reverse=True)
    with open(os.path.join(DIR,f"inventory-{sp.lower()}.csv"),"w",newline="",encoding="utf-8") as fh:
        w=csv.writer(fh); w.writerow(["url","slug","lastmod","franchise"])
        for url,slug,lastmod,fr in items: w.writerow([url,slug,lastmod,fr])

print("\n=== SPORT COUNTS ===")
for sp,c in sport_counts.most_common(): print(f"{sp:20s} {c}")
print("\n=== TOP FRANCHISES (content types) ===")
for fr,c in franchise_counts.most_common(40): print(f"{fr:32s} {c}")

# Recent NFL & MLB (last 60 days-ish by lastmod string sort) sample
print("\n=== 25 MOST RECENT NFL ===")
for url,slug,lastmod,fr in sorted(by_sport['NFL'],key=lambda x:x[2],reverse=True)[:25]:
    print(f"{lastmod[:10]}  [{fr or '-'}]  {slug}")
print("\n=== 25 MOST RECENT MLB ===")
for url,slug,lastmod,fr in sorted(by_sport['MLB'],key=lambda x:x[2],reverse=True)[:25]:
    print(f"{lastmod[:10]}  [{fr or '-'}]  {slug}")

json.dump({"total":len(rows),"sport_counts":dict(sport_counts),"franchise_counts":dict(franchise_counts)},
          open(os.path.join(DIR,"inventory-summary.json"),"w"),indent=2)
