#!/usr/bin/env python3
"""Deep metadata analytics on the full 46,844-URL public inventory.
Reclassify the unknown bucket, compute publishing velocity + news-wire footprint."""
import csv, os, re
from collections import Counter, defaultdict

DIR = os.path.dirname(os.path.abspath(__file__))
rows = list(csv.DictReader(open(os.path.join(DIR,"inventory-master.csv"),encoding="utf-8")))

NFL_TEAMS = ["cardinals","falcons","ravens","bills","panthers","bears","bengals","browns","cowboys","broncos",
 "lions","packers","texans","colts","jaguars","chiefs","raiders","chargers","rams","dolphins","vikings",
 "patriots","saints","giants","jets","eagles","steelers","49ers","niners","seahawks","buccaneers","bucs",
 "titans","commanders"]
MLB_TEAMS = ["diamondbacks","dbacks","braves","orioles","red-sox","redsox","cubs","white-sox","whitesox","reds",
 "guardians","indians","rockies","tigers","astros","royals","angels","dodgers","marlins","brewers","twins",
 "mets","yankees","athletics","phillies","pirates","padres","giants-sf","mariners","cardinals-stl","rays",
 "rangers","bluejays","blue-jays","nationals"]
# ambiguous "giants"/"cardinals" -> decide by news-verb context later; default heuristic below

NEWS_VERBS = ["-signs","-ruled-out","-activated","-limited","-fully-practices","-placed-on","-returns","-inks",
 "-visits","-misses","-questionable","-doubtful","-out-","-injured","-to-ir","-off-ir","-designated","-recalled",
 "-optioned","-dfa","-traded","-released","-waived","-suspended","-expected-to","-set-to","-could","-will-play",
 "-wont-play","-not-","-day-to-day","-scratched","-benched","-promoted","-called-up","-lands-on","-diagnosed",
 "-undergoes","-surgery","-cleared","-practices","-workout","-throws","-hits","-homers","-strikes-out"]

def is_newswire(slug):
    s=slug.lower()
    return any(v in s for v in NEWS_VERBS)

def reclass(slug, cur):
    s=slug.lower()
    if cur in ("NFL","MLB"): return cur
    if any(t in s for t in MLB_TEAMS if t not in ("giants-sf","cardinals-stl")):
        # MLB-specific verbs
        if any(v in s for v in ["-homers","-strikes-out","-optioned","-recalled","-dfa","-called-up","-designated","-to-ir","-off-ir","-lands-on"]):
            return "MLB(news)"
    if any(t in s for t in NFL_TEAMS):
        if any(v in s for v in NEWS_VERBS): return "NFL(news)"
        return "NFL(news)"
    if any(t in s for t in MLB_TEAMS):
        if any(v in s for v in NEWS_VERBS): return "MLB(news)"
        return "MLB(news)"
    return cur

# reclassify
counts=Counter(); news=Counter(); byyear=Counter(); bymonth=Counter()
nfl_month=Counter(); mlb_month=Counter()
newswire_total=0
for r in rows:
    slug=r["slug"]; sp=r["sport"]; lm=r["lastmod"][:7]; yr=r["lastmod"][:4]
    sp2=reclass(slug,sp)
    counts[sp2]+=1
    if is_newswire(slug): newswire_total+=1
    if yr and yr[0]=="2": byyear[yr]+=1
    if lm: bymonth[lm]+=1
    base=sp2.replace("(news)","")
    if base=="NFL" and lm: nfl_month[lm]+=1
    if base=="MLB" and lm: mlb_month[lm]+=1

print("=== RECLASSIFIED SPORT TOTALS (incl. news wire) ===")
for k,v in counts.most_common(): print(f"{k:18s} {v}")
tot_nfl=sum(v for k,v in counts.items() if k.startswith("NFL"))
tot_mlb=sum(v for k,v in counts.items() if k.startswith("MLB"))
print(f"\nTRUE NFL footprint (articles+news): {tot_nfl}")
print(f"TRUE MLB footprint (articles+news): {tot_mlb}")
print(f"News-wire posts (status/verb pattern): {newswire_total}  ({100*newswire_total/len(rows):.1f}% of all URLs)")

print("\n=== PUBLISHING VOLUME BY YEAR ===")
for y in sorted(byyear):
    bar="#"*(byyear[y]//120)
    print(f"{y}: {byyear[y]:6d} {bar}")

print("\n=== LAST 18 MONTHS (total / NFL / MLB) ===")
months=sorted([m for m in bymonth if m>="2025-01"])
for m in months[-18:]:
    print(f"{m}: total {bymonth[m]:4d} | NFL {nfl_month.get(m,0):4d} | MLB {mlb_month.get(m,0):4d}")

# peak day-rate approximation (busiest months)
print("\n=== 10 BUSIEST MONTHS EVER ===")
for m,c in bymonth.most_common(10): print(f"{m}: {c}  (~{c/30:.1f}/day)")
