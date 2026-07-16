#!/usr/bin/env python3
"""
GSE NFL Engine — clean-room rebuilds of FantasyGuru's NFL signatures from FREE
nflverse data (2025 season): QB-Types (mobility), O-line/D-line trench SMASH,
and WR receiving SMASH. Methods are uncopyrightable; data is public factual.
Outputs: qb_types.csv, trench_smash.csv, wr_smash.csv
"""
import os, pandas as pd, numpy as np
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),"nfl")
OUT=os.path.dirname(os.path.abspath(__file__))
def L(f,**k): return pd.read_csv(os.path.join(D,f),low_memory=False,**k)
def z(s): s=pd.to_numeric(s,errors="coerce"); return (s-s.mean())/s.std(ddof=0)
def pct(s): return pd.to_numeric(s,errors="coerce").rank(pct=True)

VALID={"ARI","ATL","BAL","BUF","CAR","CHI","CIN","CLE","DAL","DEN","DET","GB","HOU","IND",
       "JAX","KC","LV","LAC","LA","LAR","MIA","MIN","NE","NO","NYG","NYJ","PHI","PIT","SF","SEA","TB","TEN","WAS"}
reg=L("stats_reg_2025.csv")
ap=L("adv_pass.csv"); ap=ap[(ap.season==2025)&(ap.team.isin(VALID))].copy()
ar=L("adv_rush.csv"); ar=ar[(ar.season==2025)&(ar.tm.isin(VALID))].copy()
arc=L("adv_rec.csv"); arc=arc[(arc.season==2025)&(arc.tm.isin(VALID))].copy()
adf=L("adv_def.csv"); adf=adf[(adf.season==2025)&(adf.tm.isin(VALID))].copy()

fpcol="fantasy_points" if "fantasy_points" in reg.columns else "fantasy_points_ppr"

# ============================================================
# A) GSE QB-TYPES — reconstruct the mobility thesis & test +2-4 FP/G
# ============================================================
qb=reg[(reg.position=="QB")&(reg.attempts>=100)].copy()
qb["gp"]=qb["games"].clip(lower=1)
qb["rush_att_pg"]=qb["carries"]/qb["gp"]
qb["rush_ypg"]=qb["rushing_yards"]/qb["gp"]
qb["fp_pg"]=qb[fpcol]/qb["gp"]
# fantasy points from rushing (standard: 0.1/yd + 6/TD)
qb["rush_fp"]=qb["rushing_yards"]*0.1 + qb["rushing_tds"]*6
qb["rush_fp_share"]=qb["rush_fp"]/(qb[fpcol].clip(lower=1))
def qb_type(r):
    if r.rush_att_pg>=6 or r.rush_ypg>=32: return "Very Mobile/Running"
    if r.rush_att_pg>=3.5 or r.rush_ypg>=18: return "Mobile"
    return "Pocket"
qb["qb_type"]=qb.apply(qb_type,axis=1)
qb=qb.sort_values("fp_pg",ascending=False)
qb_out=qb[["player_display_name","recent_team","games","attempts","rush_att_pg","rush_ypg","rush_fp_share","fp_pg","qb_type"]].copy()
for c in ["rush_att_pg","rush_ypg","fp_pg"]: qb_out[c]=qb_out[c].round(1)
qb_out["rush_fp_share"]=(qb_out["rush_fp_share"]*100).round(0)
qb_out.rename(columns={"player_display_name":"QB","recent_team":"Tm","rush_fp_share":"rush_fp_pct"},inplace=True)
qb_out.to_csv(os.path.join(OUT,"qb_types.csv"),index=False)
tier_fp=qb.groupby("qb_type")["fp_pg"].agg(["mean","count"]).reindex(["Very Mobile/Running","Mobile","Pocket"])

# ============================================================
# B) GSE TRENCH SMASH — O-line (pass-pro + run-block) vs D-line (pass rush)
# ============================================================
# O-line pass protection from adv_pass, weighted by pass_attempts per team
ap["w"]=ap["pass_attempts"].clip(lower=1)
def wavg(g,col): w=g["w"]; return (pd.to_numeric(g[col],errors="coerce")*w).sum()/w.sum()
ol=[]
for tm,g in ap.groupby("team"):
    ol.append(dict(team=tm, pressure_pct=wavg(g,"pressure_pct"), pocket_time=wavg(g,"pocket_time"),
                   times_sacked=g["times_hit"].sum()))
OL=pd.DataFrame(ol).set_index("team")
# sacks allowed rate from reg (team QBs)
qteam=reg[reg.position=="QB"].groupby("recent_team").agg(sacks=("sacks_suffered","sum"),att=("attempts","sum"))
qteam["sack_rate"]=qteam["sacks"]/(qteam["att"]+qteam["sacks"])
OL=OL.join(qteam["sack_rate"])
# run block: yards before contact per attempt (team RBs), from adv_rush
ar["w"]=ar["att"].clip(lower=1)
rb=[]
for tm,g in ar.groupby("tm"):
    rb.append(dict(team=tm, ybc_att=(pd.to_numeric(g["ybc_att"],errors="coerce")*g["w"]).sum()/g["w"].sum()))
OL=OL.join(pd.DataFrame(rb).set_index("team"))
# O-line index: low pressure%, low sack rate, high pocket time, high ybc/att = better
OL["OL_idx"]=(pct(-OL["pressure_pct"])*1.3 + pct(-OL["sack_rate"])*1.2 +
              pct(OL["pocket_time"])*0.8 + pct(OL["ybc_att"])*0.9)/4.2
OL["OL_idx"]=(50+10*z(OL["OL_idx"])).round(1)

# D-line pass rush from adv_def aggregated by team
dl=[]
for tm,g in adf.groupby("tm"):
    dl.append(dict(team=tm, prss=g["prss"].sum(), sk=g["sk"].sum(), qbkd=g["qbkd"].sum(), hrry=g["hrry"].sum()))
DL=pd.DataFrame(dl).set_index("team")
DL["DL_idx"]=(pct(DL["prss"])*1.2 + pct(DL["sk"])*1.3 + pct(DL["qbkd"])*0.8 + pct(DL["hrry"])*0.9)/4.2
DL["DL_idx"]=(50+10*z(DL["DL_idx"])).round(1)

trench=OL.join(DL[["DL_idx","prss","sk"]])
trench=trench.sort_values("OL_idx",ascending=False)
for c in ["pressure_pct","pocket_time","sack_rate","ybc_att"]:
    trench[c]=pd.to_numeric(trench[c],errors="coerce").round(3)
trench.to_csv(os.path.join(OUT,"trench_smash.csv"))

def tier(v): return "ELITE" if v>=63 else "GREEN" if v>=56 else "WHITE" if v>=44 else "RED" if v>=37 else "AVOID"

# ============================================================
# C) GSE WR SMASH — receiving skill (skills over results)
# ============================================================
rec=reg[reg.position.isin(["WR","TE"])].copy()
# merge PFR advanced receiving by name+team (best-effort)
arc2=arc.rename(columns={"player":"player_display_name","tm":"recent_team"})
m=rec.merge(arc2[["player_display_name","recent_team","adot","yac_r","ybc_r","brk_tkl","drop_percent","rat","tgt"]],
            on=["player_display_name","recent_team"],how="left")
m=m[(pd.to_numeric(m["targets"],errors="coerce")>=30)].copy()
m["gp"]=m["games"].clip(lower=1)
m["rec_ypg"]=m["receiving_yards"]/m["gp"]
tshare = m["target_share"] if "target_share" in m.columns else (m["targets"]/m["gp"]/35)
epa = m["receiving_epa"] if "receiving_epa" in m.columns else pd.Series(0,index=m.index)
# skill components (dir,weight): rec_ypg+, target_share+, adot+, yac_r+, brk_tkl+, rat(when tgt)+, drop%-, epa+
comp=[(m["rec_ypg"],1.4),(tshare,1.1),(pd.to_numeric(m["adot"],errors="coerce"),0.6),
      (pd.to_numeric(m["yac_r"],errors="coerce"),0.8),(pd.to_numeric(m["brk_tkl"],errors="coerce"),0.6),
      (pd.to_numeric(m["rat"],errors="coerce"),0.9),(-pd.to_numeric(m["drop_percent"],errors="coerce"),0.4),
      (epa,1.0)]
wsum=sum(w for _,w in comp)
m["SMASH"]=50+10*sum(z(s)*w for s,w in comp)/wsum
m["tier"]=m["SMASH"].apply(tier)
m=m.sort_values("SMASH",ascending=False)
wr_out=m[["player_display_name","recent_team","position","games","targets","receiving_yards","rec_ypg","adot","yac_r","drop_percent","SMASH","tier"]].copy()
wr_out["rec_ypg"]=wr_out["rec_ypg"].round(1); wr_out["SMASH"]=wr_out["SMASH"].round(1)
wr_out.rename(columns={"player_display_name":"Player","recent_team":"Tm","position":"Pos"},inplace=True)
wr_out.to_csv(os.path.join(OUT,"wr_smash.csv"),index=False)

# ================= console proof =================
print("="*72)
print("GSE NFL ENGINE — 2025 season (nflverse). QBs:",len(qb),"Teams:",len(trench),"Pass-catchers:",len(m))
print("="*72)
print("\n### A) QB-TYPES — does mobility pay? (avg fantasy FP/G by type) ###")
for t,row in tier_fp.iterrows():
    print(f"  {t:22s} n={int(row['count']):2d}   {row['mean']:.1f} FP/G")
gap=tier_fp.loc['Very Mobile/Running','mean']-tier_fp.loc['Pocket','mean']
print(f"  >>> Mobility premium: Very Mobile/Running minus Pocket = +{gap:.1f} FP/G  (FG public claim: +2-4)")
print("\n  Top 12 QBs by FP/G:")
print(qb_out.head(12).to_string(index=False))
print("\n### B) TRENCH SMASH — O-line (top 8) & D-line pass rush ###")
print(trench[["pressure_pct","sack_rate","pocket_time","ybc_att","OL_idx","DL_idx"]].head(8).to_string())
print("  ...worst O-lines:")
print(trench[["pressure_pct","sack_rate","OL_idx"]].tail(4).to_string())
print("\n  Top 6 D-line pass rush:")
print(trench.sort_values("DL_idx",ascending=False)[["prss","sk","DL_idx"]].head(6).to_string())
print("\n### C) WR/TE SMASH — top 12 receiving skill ###")
print(wr_out.head(12).to_string(index=False))
print("\nWrote: qb_types.csv, trench_smash.csv, wr_smash.csv")
