#!/usr/bin/env python3
"""
GSE Reliever/Matchup Engine  —  clean-room reconstructions of the *methods* behind
FantasyGuru's SMASH / BURR / Solds, built from FREE public data (MLB Stats API +
Baseball Savant). No FG data is used. Metrics/methods are not copyrightable; this is
GSE-owned IP, glass-box and calibrated.

Outputs: solds_table.csv, burr_table.csv, smash_hitters.csv, smash_pitchers.csv
"""
import json, os, csv, math
import pandas as pd, numpy as np

D = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
OUT = os.path.dirname(os.path.abspath(__file__))

# ---------- helpers ----------
def ip_to_float(s):
    """MLB 'inningsPitched' like '40.2' == 40 + 2/3."""
    try:
        s=str(s)
        if "." in s:
            w,f=s.split("."); return int(w)+int(f)/3.0
        return float(s)
    except: return 0.0

def num(x,default=0.0):
    try:
        if x in (None,"","-",".---"): return default
        return float(x)
    except: return default

# ---------- load MLB Stats API pitching ----------
raw=json.load(open(os.path.join(D,"pitching_all.json")))
splits=raw["stats"][0]["splits"]
P=[]
for sp in splits:
    st=sp["stat"]; pl=sp["player"]; tm=sp.get("team",{})
    P.append(dict(
        pid=pl["id"], name=pl["fullName"], team=tm.get("abbreviation") or tm.get("name","?"),
        teamName=tm.get("name","?"),
        GP=int(st.get("gamesPitched",0) or 0), GS=int(st.get("gamesStarted",0) or 0),
        IP=ip_to_float(st.get("inningsPitched","0.0")),
        SV=int(st.get("saves",0) or 0), HLD=int(st.get("holds",0) or 0),
        BS=int(st.get("blownSaves",0) or 0), SVO=int(st.get("saveOpportunities",0) or 0),
        ER=int(st.get("earnedRuns",0) or 0), R=int(st.get("runs",0) or 0),
        H=int(st.get("hits",0) or 0), BB=int(st.get("baseOnBalls",0) or 0),
        HBP=int(st.get("hitByPitch",0) or 0), K=int(st.get("strikeOuts",0) or 0),
        HR=int(st.get("homeRuns",0) or 0), BF=int(st.get("battersFaced",0) or 0),
        IR=int(st.get("inheritedRunners",0) or 0), IRS=int(st.get("inheritedRunnersScored",0) or 0),
        GOAO=num(st.get("groundOutsToAirouts"),1.0),
        ERA=num(st.get("era"),0.0), WHIP=num(st.get("whip"),0.0),
    ))
P=pd.DataFrame(P)
# reliever = pure relief appearances (bullpen). Standard for a bullpen rating.
P["isRP"]=(P["GS"]==0)&(P["GP"]>=1)
RP=P[P["isRP"]].copy()

# ==========================================================================
# 1) GSE-SOLDS  — reliever value (their metric = Saves+Holds; we add quality+role)
# ==========================================================================
rel=RP[RP["IP"]>=5].copy()
rel["Solds"]=rel["SV"]+rel["HLD"]
rel["chances"]=rel["SV"]+rel["HLD"]+rel["BS"]
rel["Solds_pct"]=np.where(rel["chances"]>0, (rel["SV"]+rel["HLD"])/rel["chances"], np.nan)
# skill: K-BB% and FIP-proxy
rel["Kpct"]=rel["K"]/rel["BF"].clip(lower=1)
rel["BBpct"]=rel["BB"]/rel["BF"].clip(lower=1)
rel["KmBB"]=rel["Kpct"]-rel["BBpct"]
# league reliever FIP constant
lgHR,lgBB,lgHBP,lgK,lgIP,lgER=[RP[c].sum() for c in ["HR","BB","HBP","K","IP","ER"]]
lgERA=9*lgER/lgIP
cFIP=lgERA-((13*lgHR+3*(lgBB+lgHBP)-2*lgK)/lgIP)
rel["FIP"]=((13*rel["HR"]+3*(rel["BB"]+rel["HBP"])-2*rel["K"])/rel["IP"].clip(lower=1))+cFIP
# role tag from usage
def role(r):
    if r.SV>=3 or (r.SVO>=5 and r.SV>=r.HLD): return "Closer"
    if r.SV>=1 and r.SVO>=2: return "Committee/9th"
    if r.HLD>=5: return "Setup (high-lev)"
    if r.HLD>=1: return "Middle/Hold"
    return "Low-leverage"
rel["role"]=rel.apply(role,axis=1)
# Reliever Value Score (RVS): volume(role-weighted Solds pace) x reliability x skill.
# leverage proxy: Saves worth more fantasy points than Holds; weight SV*1.0 + HLD*0.7
rel["vol"]=rel["SV"]*1.0+rel["HLD"]*0.7
# per-appearance opportunity rate (forward-looking): vol per game
rel["vol_pace"]=rel["vol"]/rel["GP"].clip(lower=1)
# skill index 0..1 via percentile of KmBB and inverse FIP
def pct_rank(s): return s.rank(pct=True)
skill=(pct_rank(rel["KmBB"])*0.6 + pct_rank(-rel["FIP"])*0.4)
reliab=rel["Solds_pct"].fillna(rel["Solds_pct"].median())
vol_n=pct_rank(rel["vol"])
# RVS on 0-100: 55% volume(role), 25% skill, 20% reliability
rel["RVS"]=(0.55*vol_n + 0.25*skill + 0.20*(reliab)).clip(0,1)*100
rel=rel.sort_values("RVS",ascending=False)
solds_cols=["name","team","role","GP","IP","SV","HLD","BS","Solds","Solds_pct","KmBB","FIP","RVS"]
rel_out=rel[solds_cols].copy()
for c in ["IP","FIP"]: rel_out[c]=rel_out[c].round(2)
rel_out["Solds_pct"]=(rel_out["Solds_pct"]*100).round(0)
rel_out["KmBB"]=(rel_out["KmBB"]*100).round(1)
rel_out["RVS"]=rel_out["RVS"].round(1)
rel_out.to_csv(os.path.join(OUT,"solds_table.csv"),index=False)

# ==========================================================================
# 2) GSE-BURR  — bullpen matchup index (their: 14 cats -> one number vs lg avg)
#    Convention (matches FG): >1.00 = STRONG pen (bad for hitters), <1.00 = weak
# ==========================================================================
# Statcast reliever quality joined by team (xwOBA/ barrel / hardhit allowed)
def load_savant(fn):
    df=pd.read_csv(os.path.join(D,fn),encoding="utf-8-sig")
    df.columns=[c.strip().strip('"') for c in df.columns]
    return df
pc=load_savant("savant_pit_custom.csv")   # player_id, pa, xwoba, barrel_batted_rate, hard_hit_percent, k/bb/whiff
pc=pc.rename(columns={"player_id":"pid"})
rp_ids=set(RP["pid"])
pc_rp=pc[pc["pid"].isin(rp_ids)].merge(P[["pid","team"]],on="pid",how="left")
def wavg(g,val,w="pa"):
    ww=g[w].clip(lower=1); return (g[val]*ww).sum()/ww.sum()
teamStat={}
for tm,g in pc_rp.groupby("team"):
    teamStat[tm]=dict(
        xwoba_a=wavg(g,"xwoba"), barrel_a=wavg(g,"barrel_batted_rate"), hard_a=wavg(g,"hard_hit_percent"))

# team bullpen aggregates from MLB API
rows=[]
for tm,g in RP.groupby("team"):
    IP=g["IP"].sum(); BF=g["BF"].sum()
    H,BB,HBP,K,HR,R,ER=[g[c].sum() for c in ["H","BB","HBP","K","HR","R","ER"]]
    IR,IRS=g["IR"].sum(),g["IRS"].sum()
    SV,BS=g["SV"].sum(),g["BS"].sum()
    ERA=9*ER/IP; FIP=((13*HR+3*(BB+HBP)-2*K)/IP)+cFIP
    Kp=K/BF; BBp=BB/BF; KmBB=Kp-BBp; HR9=9*HR/IP; WHIP=(H+BB)/IP
    LOB=(H+BB+HBP-R)/max(H+BB+HBP-1.4*HR,1e-9)
    IRstr=1-(IRS/IR) if IR>0 else np.nan
    svconv=SV/(SV+BS) if (SV+BS)>0 else np.nan
    goao=(g["GOAO"]*g["IP"]).sum()/IP
    st=teamStat.get(tm,{})
    rows.append(dict(team=tm,IP=IP,ERA=ERA,FIP=FIP,Kpct=Kp,BBpct=BBp,KmBB=KmBB,HR9=HR9,WHIP=WHIP,
        LOB=LOB,IRstr=IRstr,svconv=svconv,GOAO=goao,
        xwoba_a=st.get("xwoba_a"),barrel_a=st.get("barrel_a"),hard_a=st.get("hard_a")))
B=pd.DataFrame(rows).set_index("team")

# 14 categories with direction (+1 higher=stronger pen, -1 lower=stronger pen) and weight
CATS=[("ERA",-1,1.3),("FIP",-1,1.4),("Kpct",+1,1.2),("BBpct",-1,1.0),("KmBB",+1,1.3),
      ("HR9",-1,1.0),("WHIP",-1,1.1),("LOB",+1,0.8),("IRstr",+1,0.9),("svconv",+1,0.7),
      ("GOAO",+1,0.4),("xwoba_a",-1,1.4),("barrel_a",-1,1.1),("hard_a",-1,0.9)]
# index vs league mean; ratio method sign-aligned so >1 = stronger pen
idx=pd.DataFrame(index=B.index)
for c,dirn,w in CATS:
    col=B[c].astype(float); lg=col.mean(skipna=True)
    if dirn>0: r=col/lg
    else:      r=lg/col
    idx[c]=r.fillna(1.0)
wsum=sum(w for _,_,w in CATS)
B["BURR"]=sum(idx[c]*w for c,_,w in CATS)/wsum
B["rank"]=B["BURR"].rank(ascending=False).astype(int)
burr_out=B.sort_values("BURR",ascending=False).copy()
for c in ["ERA","FIP","HR9","WHIP","BURR"]: burr_out[c]=burr_out[c].round(3)
for c in ["Kpct","BBpct","KmBB","LOB","IRstr","svconv","xwoba_a","barrel_a","hard_a"]:
    burr_out[c]=burr_out[c].round(3)
burr_out["IP"]=burr_out["IP"].round(1)
burr_out.to_csv(os.path.join(OUT,"burr_table.csv"))

# ==========================================================================
# 3) GSE-SMASH  — hitter & pitcher skill index (skills-over-results, vs league)
# ==========================================================================
def zscore(s):
    s=pd.to_numeric(s,errors="coerce"); return (s-s.mean())/s.std(ddof=0)
def to100(z): return (50+10*z)  # mean 50, sd 10 -> readable "OVR"-style

# hitters
bh=load_savant("savant_bat_custom.csv").rename(columns={"player_id":"pid","last_name, first_name":"name"})
# components: xwoba(+), barrel(+), hardhit(+), K%(-), BB%(+), whiff(-)
compsH=[("xwoba",+1,1.6),("barrel_batted_rate",+1,1.1),("hard_hit_percent",+1,0.9),
        ("k_percent",-1,1.0),("bb_percent",+1,0.8),("whiff_percent",-1,0.8)]
zH=pd.DataFrame(index=bh.index)
for c,dirn,w in compsH: zH[c]=zscore(bh[c])*dirn
wH=sum(w for *_,w in compsH)
bh["SMASH"]=to100(sum(zH[c]*w for c,_,w in compsH)/wH)
def tier(v):
    if v>=63: return "ELITE"
    if v>=56: return "GREEN"
    if v>=44: return "WHITE"
    if v>=37: return "RED"
    return "AVOID"
bh["tier"]=bh["SMASH"].apply(tier)
bh=bh.sort_values("SMASH",ascending=False)
bh_out=bh[["name","pa","xwoba","barrel_batted_rate","hard_hit_percent","k_percent","bb_percent","whiff_percent","SMASH","tier"]].copy()
bh_out["SMASH"]=bh_out["SMASH"].round(1)
bh_out.to_csv(os.path.join(OUT,"smash_hitters.csv"),index=False)

# pitchers (suppression): xwoba(-), barrel(-), hardhit(-), K%(+), BB%(-), whiff(+)
pp=load_savant("savant_pit_custom.csv").rename(columns={"player_id":"pid","last_name, first_name":"name"})
compsP=[("xwoba",-1,1.6),("barrel_batted_rate",-1,1.1),("hard_hit_percent",-1,0.9),
        ("k_percent",+1,1.2),("bb_percent",-1,1.0),("whiff_percent",+1,0.9)]
zP=pd.DataFrame(index=pp.index)
for c,dirn,w in compsP: zP[c]=zscore(pp[c])*dirn
wP=sum(w for *_,w in compsP)
pp["SMASH"]=to100(sum(zP[c]*w for c,_,w in compsP)/wP)
pp["tier"]=pp["SMASH"].apply(lambda v:"ELITE" if v>=63 else "GREEN" if v>=56 else "WHITE" if v>=44 else "RED" if v>=37 else "AVOID")
pp=pp.merge(P[["pid","team","GS","GP"]],on="pid",how="left")
pp=pp.sort_values("SMASH",ascending=False)
pp_out=pp[["name","team","pa","xwoba","barrel_batted_rate","hard_hit_percent","k_percent","bb_percent","whiff_percent","SMASH","tier"]].copy()
pp_out["SMASH"]=pp_out["SMASH"].round(1)
pp_out.to_csv(os.path.join(OUT,"smash_pitchers.csv"),index=False)

# ---- Advantage Score (Log5 matchup on xwOBA) ----
lg_xwoba=pd.to_numeric(bh["xwoba"],errors="coerce").mean()
def matchup_xwoba(h_xwoba,p_xwoba_allowed):
    return (h_xwoba*p_xwoba_allowed)/lg_xwoba
# team pitcher xwOBA-allowed (whole staff) for "vs staff"
allp=pc.merge(P[["pid","team"]],on="pid",how="left")
staff={tm:wavg(g,"xwoba") for tm,g in allp.groupby("team")}

# ---------- console proof ----------
print("="*70)
print(f"DATA: 2026 MLB season (through pull date). Relievers analyzed: {len(rel)} | Teams: {len(B)}")
print(f"League reliever ERA={lgERA:.2f}  cFIP={cFIP:.2f}  lg hitter xwOBA={lg_xwoba:.3f}")
print("="*70)
print("\n### GSE-SOLDS — Top 15 reliever value (RVS) ###")
print(rel_out.head(15).to_string(index=False))
print("\n### GSE-BURR — Bullpen index (top 8 strongest / bottom 5 weakest) ###")
show=["IP","ERA","FIP","KmBB","xwoba_a","barrel_a","BURR","rank"]
print(burr_out[show].head(8).to_string())
print("  ...")
print(burr_out[show].tail(5).to_string())
print("\n### GSE-SMASH hitters — top 12 ###")
print(bh_out.head(12).to_string(index=False))
print("\n### GSE-SMASH pitchers — top 12 (suppression) ###")
print(pp_out.head(12).to_string(index=False))
print("\n### Advantage Score demo (Log5 xwOBA matchup) ###")
topH=bh.head(3); topP=pp.head(3)
for _,h in topH.iterrows():
    for _,p in topP.iterrows():
        m=matchup_xwoba(pd.to_numeric(h["xwoba"]),pd.to_numeric(p["xwoba"]))
        edge="HITTER" if m>lg_xwoba else "PITCHER"
        print(f"  {h['name'][:22]:22s} vs {p['name'][:22]:22s} -> exp xwOBA {m:.3f}  ({edge} edge)")
print(f"\nWrote: solds_table.csv, burr_table.csv, smash_hitters.csv, smash_pitchers.csv")
