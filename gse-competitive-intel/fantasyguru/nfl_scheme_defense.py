#!/usr/bin/env python3
"""
GSE NFL — Coaching/Scheme engine + team Defense (coverage + rush-D + pass-rush)
+ rolling weekly windows. Free nflverse 2025 pbp + advanced stats. The scheme
engine is the clean-room analog of FantasyGuru's Coaching Breakdown (system ->
fantasy production); the defense side completes the SMASH matchup pairs.
Outputs: scheme_coaching.csv, team_defense.csv, rolling_form.csv
"""
import os, pandas as pd, numpy as np
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),"nfl")
OUT=os.path.dirname(os.path.abspath(__file__))
def z(s): s=pd.to_numeric(s,errors="coerce"); return (s-s.mean())/s.std(ddof=0)
def pct(s): return pd.to_numeric(s,errors="coerce").rank(pct=True)
def to100(x): return (50+10*z(x)).round(1)
VALID={"ARI","ATL","BAL","BUF","CAR","CHI","CIN","CLE","DAL","DEN","DET","GB","HOU","IND",
       "JAX","KC","LV","LAC","LA","MIA","MIN","NE","NO","NYG","NYJ","PHI","PIT","SF","SEA","TB","TEN","WAS"}

cols=["game_id","week","posteam","defteam","pass","rush","qb_dropback","pass_oe",
      "shotgun","no_huddle","down","ydstogo","yardline_100","goal_to_go","wp","epa"]
pbp=pd.read_csv(os.path.join(D,"pbp_2025.csv"),usecols=lambda c:c in cols,low_memory=False)
pbp=pbp[pbp["week"]<=18]                                     # regular season only
sc=pbp[((pbp["pass"]==1)|(pbp["rush"]==1))].copy()          # scrimmage plays
sc["success"]=(sc["epa"]>0).astype(float)
reg=pd.read_csv(os.path.join(D,"stats_reg_2025.csv"),low_memory=False)

# ============================================================
# A) COACHING / SCHEME ENGINE (offense) — the Coaching-Breakdown analog
# ============================================================
off=sc[sc["posteam"].isin(VALID)]
rows=[]
for tm,g in off.groupby("posteam"):
    games=g["game_id"].nunique()
    plays=len(g); ppg=plays/games
    proe=pd.to_numeric(g["pass_oe"],errors="coerce").mean()
    pass_rate=g["pass"].mean()
    neutral=g[(g["down"].isin([1,2]))&(g["wp"].between(0.2,0.8))]
    neutral_pass=neutral["pass"].mean()
    shotgun=g["shotgun"].mean(); nohuddle=g["no_huddle"].mean()
    rz=g[g["yardline_100"]<=20]; rz_pass=rz["pass"].mean()
    epa_play=g["epa"].mean()
    rows.append(dict(team=tm,games=games,plays_pg=round(ppg,1),PROE=round(proe,1),
        pass_rate=round(pass_rate,3),neutral_pass=round(neutral_pass,3),
        shotgun=round(shotgun,3),no_huddle=round(nohuddle,3),rz_pass=round(rz_pass,3),
        off_epa_play=round(epa_play,3)))
S=pd.DataFrame(rows).set_index("team")

# player concentration (committee vs bellcow / target funnel) from stats_reg
r=reg[reg["recent_team"].isin(VALID)].copy()
rb=r[r["position"]=="RB"]; wr=r[r["position"].isin(["WR","TE"])]
def top_share(df,team,col):
    g=df[df["recent_team"]==team]
    tot=pd.to_numeric(g[col],errors="coerce").sum()
    return (pd.to_numeric(g[col],errors="coerce").max()/tot) if tot>0 else np.nan
S["rb_bellcow"]=[round(top_share(rb,t,"carries") or 0,3) for t in S.index]      # hi = bellcow, lo = committee
S["wr_funnel"]=[round(top_share(wr,t,"targets") or 0,3) for t in S.index]        # hi = concentrated
# scheme labels
def label(x):
    tags=[]
    tags.append("PASS-heavy" if x.PROE>2 else "RUN-heavy" if x.PROE<-2 else "balanced")
    tags.append("fast" if x.plays_pg>=64 else "slow" if x.plays_pg<=60 else "avg-pace")
    tags.append("bellcow-RB" if x.rb_bellcow>=0.62 else "committee-RB" if x.rb_bellcow<0.5 else "")
    tags.append("WR1-funnel" if x.wr_funnel>=0.26 else "")
    return " · ".join([t for t in tags if t])
S["scheme"]=S.apply(label,axis=1)
S=S.sort_values("PROE",ascending=False)
S.to_csv(os.path.join(OUT,"scheme_coaching.csv"))

# ============================================================
# B) TEAM DEFENSE — pass-D, rush-D (pbp) + coverage (adv_def) + pass-rush
# ============================================================
dfd=sc[sc["defteam"].isin(VALID)]
drows=[]
for tm,g in dfd.groupby("defteam"):
    gp=g["game_id"].nunique()
    p=g[g["pass"]==1]; ru=g[g["rush"]==1]
    drows.append(dict(team=tm,
        pass_epa_allowed=round(p["epa"].mean(),3), rush_epa_allowed=round(ru["epa"].mean(),3),
        pass_sr_allowed=round(p["success"].mean(),3), rush_sr_allowed=round(ru["success"].mean(),3),
        epa_play_allowed=round(g["epa"].mean(),3)))
DEF=pd.DataFrame(drows).set_index("team")
# coverage from adv_def (defenders' completion%/rating allowed), weighted by targets
adf=pd.read_csv(os.path.join(D,"adv_def.csv"),low_memory=False)
adf=adf[(adf.season==2025)&(adf.tm.isin(VALID))].copy()
cov=[]
for tm,g in adf.groupby("tm"):
    w=pd.to_numeric(g["tgt"],errors="coerce").clip(lower=1)
    cov.append(dict(team=tm,
        cov_cmp_pct=round((pd.to_numeric(g["cmp_percent"],errors="coerce")*w).sum()/w.sum(),1),
        cov_rat=round((pd.to_numeric(g["rat"],errors="coerce")*w).sum()/w.sum(),1),
        cov_ydstgt=round((pd.to_numeric(g["yds_tgt"],errors="coerce")*w).sum()/w.sum(),2),
        prss=g["prss"].sum(), sk=g["sk"].sum()))
COV=pd.DataFrame(cov).set_index("team")
DEF=DEF.join(COV)
# indices (higher = better defense): low EPA/SR allowed, low coverage cmp/rat, high pressure
DEF["passD_idx"]=to100(pct(-DEF["pass_epa_allowed"])*1.3 + pct(-DEF["cov_rat"])*1.1 +
                       pct(-DEF["cov_cmp_pct"])*0.8 + pct(DEF["prss"])*0.9)
DEF["rushD_idx"]=to100(pct(-DEF["rush_epa_allowed"])*1.4 + pct(-DEF["rush_sr_allowed"])*1.0)
DEF["DEF_idx"]=to100(pct(-DEF["epa_play_allowed"]))
DEF=DEF.sort_values("DEF_idx",ascending=False)
DEF.to_csv(os.path.join(OUT,"team_defense.csv"))

# ============================================================
# C) ROLLING WEEKLY WINDOWS — season vs last-4-weeks (recent form)
#    Regular-season only (set at load) so every team has the window.
# ============================================================
maxwk=int(off["week"].max()); lo=maxwk-3
recent=off[off["week"]>=lo]
def agg(df):
    out={}
    for tm,g in df.groupby("posteam"):
        gm=g["game_id"].nunique() or 1
        out[tm]=dict(plays_pg=len(g)/gm, PROE=pd.to_numeric(g["pass_oe"],errors="coerce").mean(),
                     off_epa=g["epa"].mean())
    return pd.DataFrame(out).T
seas=agg(off); rec=agg(recent)
roll=seas.join(rec,lsuffix="_season",rsuffix="_L4W")
roll["PROE_delta"]=(roll["PROE_L4W"]-roll["PROE_season"]).round(1)
roll["pace_delta"]=(roll["plays_pg_L4W"]-roll["plays_pg_season"]).round(1)
for c in roll.columns: roll[c]=roll[c].round(2)
roll=roll.sort_values("PROE_delta",ascending=False)
roll.to_csv(os.path.join(OUT,"rolling_form.csv"))

# ================= console proof =================
print("="*74)
print(f"GSE NFL SCHEME + DEFENSE + ROLLING — 2025 ({len(sc)} plays, weeks 1-{maxwk})")
print("="*74)
print("\n### A) COACHING/SCHEME — most pass-happy play-callers (top) ###")
print(S[["plays_pg","PROE","neutral_pass","shotgun","rz_pass","rb_bellcow","scheme"]].head(8).to_string())
print("  ...most run-heavy:")
print(S[["plays_pg","PROE","neutral_pass","rb_bellcow","scheme"]].tail(5).to_string())
print("\n### B) TEAM DEFENSE — best overall (EPA/play allowed) ###")
print(DEF[["pass_epa_allowed","rush_epa_allowed","cov_rat","passD_idx","rushD_idx","DEF_idx"]].head(8).to_string())
print("  ...best RUN defenses:")
print(DEF.sort_values("rushD_idx",ascending=False)[["rush_epa_allowed","rush_sr_allowed","rushD_idx"]].head(5).to_string())
print("\n### C) ROLLING — biggest PROE shifts, last 4 weeks vs season ###")
print(roll[["PROE_season","PROE_L4W","PROE_delta","plays_pg_season","plays_pg_L4W","pace_delta"]].head(6).to_string())
print("  ...biggest drops:")
print(roll[["PROE_season","PROE_L4W","PROE_delta"]].tail(4).to_string())
print("\nWrote: scheme_coaching.csv, team_defense.csv, rolling_form.csv")
