# -*- coding: utf-8 -*-
"""Aggregate all dossiers/*.json into MASTER_MATRIX.md. Idempotent; re-run anytime."""
import json, os, glob, time, re

CI   = os.path.dirname(os.path.abspath(__file__))
DOSS = os.path.join(CI, "dossiers")
OUT  = os.path.join(CI, "MASTER_MATRIX.md")

def cell(v):
    v = (v or "").strip()
    return v if v else "-"

def as_list(v):
    if v is None: return []
    if isinstance(v, str): return [v] if v.strip() else []
    if isinstance(v, (list, tuple)): return [str(x) for x in v]
    return [str(v)]

def short(lst, n=3, cap=70):
    lst = [x.strip() for x in as_list(lst) if str(x).strip()]
    lst = [x if len(x) <= cap else x[:cap-3] + "..." for x in lst]
    if not lst:
        return "-"
    shown = ", ".join(lst[:n])
    return shown + (f" (+{len(lst)-n})" if len(lst) > n else "")

dossiers = []
for f in sorted(glob.glob(os.path.join(DOSS, "*.json"))):
    try:
        with open(f, encoding="utf-8") as fh:
            d = json.load(fh)
        d["_file"] = os.path.basename(f)
        dossiers.append(d)
    except Exception as e:
        print(f"SKIP unparseable {f}: {e}")

dossiers.sort(key=lambda d: (d.get("domain") or d["_file"]).lower())

def is_nc(v):
    return isinstance(v, str) and v.strip().lower().startswith("not confirmed")

def disposition(d):
    raw = str(d.get("disposition", "")).strip().lower()
    if not raw:
        return "unset"
    if raw.startswith("live"):
        return "live"
    return raw.split()[0]

def section_gap(d, *keys):
    """True if every named leaf is missing or NOT CONFIRMED."""
    for k in keys:
        v = d.get(k)
        if isinstance(v, dict):
            vals = [x for x in v.values() if not (isinstance(x, str) and is_nc(x)) and x not in ([], None, "")]
            if vals:
                return False
        elif isinstance(v, list):
            if v:
                return False
        elif v and not is_nc(str(v)):
            return False
    return True

rows, algo_evidence, vendor_rollup, gaps = [], [], {}, []
for d in dossiers:
    dom = d.get("domain") or d["_file"].replace(".json", "")
    ts  = d.get("tech_stack", {}) or {}
    api = d.get("api_architecture", {}) or {}
    se  = d.get("simulation_engine", {}) or {}
    ds  = d.get("data_supply_chain", {}) or {}
    pl  = d.get("product_limits", {}) or {}
    pr  = d.get("pricing", {}) or {}
    fx  = [e for e in (d.get("extracted_formulas", []) or [])
           if "not confirmed" not in json.dumps(e, ensure_ascii=False).lower()]
    pain = d.get("customer_pain", []) or []
    disp = disposition(d)

    front = short(ts.get("frontend", []), 2)
    back  = short(ts.get("backend", []), 2)
    cloud = short(ts.get("cloud", []) + ts.get("cdn", []), 2)
    n_endpoints = len(api.get("rest_endpoints", []) or [])
    api_ev = str(n_endpoints) if n_endpoints else ("graphql" if not is_nc(api.get("graphql_schema","")) and api.get("graphql_schema") else "-")
    nims_raw = se.get("num_simulations")
    nims = None
    if nims_raw is not None:
        s = str(nims_raw).strip()
        if s and not is_nc(s):
            nims = s
    sims = short([nims], n=1, cap=80) if nims else "-"
    vendors = short(ds.get("vendors", []), 3)
    price = next((str(pr[k]) for k in ("web","ios","android") if pr.get(k) and not is_nc(str(pr[k]))), "-")
    price = (price[:60] + "...") if len(price) > 60 else price

    rows.append((dom, disp, front, back, cloud, api_ev, sims, len(fx), vendors, price, len(pain)))

    if fx or nims or (se.get("correlation_method") and not is_nc(str(se.get("correlation_method")))):
        algo_evidence.append((dom, len(fx), nims or "-", cell(str(se.get("correlation_method","")))[:50]))

    for v in as_list(ds.get("vendors", [])):
        v = str(v).strip()
        if not v or is_nc(v):
            continue
        vendor_rollup.setdefault(v.lower(), []).append(dom)

    gap_flags = []
    if section_gap(d, "api_architecture"): gap_flags.append("api")
    if not fx and not nims: gap_flags.append("no-algo-evidence")
    if is_nc(str(pr.get("web",""))) and is_nc(str(pr.get("ios",""))) and is_nc(str(pr.get("android",""))): gap_flags.append("pricing")
    if not pain: gap_flags.append("no-pain-data")
    if gap_flags:
        gaps.append((dom, disp, ",".join(gap_flags)))

L = []
L.append("# GSE Competitor Master Matrix")
L.append(f"\n_Generated {time.strftime('%Y-%m-%d %H:%M')} from {len(dossiers)} dossiers in dossiers/._ Re-run `_build_master_matrix.py` after new dossiers land._\n")

disp_counts = {}
for r in rows:
    disp_counts[r[1]] = disp_counts.get(r[1], 0) + 1
L.append("## Dispositions")
L.append(", ".join(f"{k}: {v}" for k, v in sorted(disp_counts.items())) + "\n")

L.append("## Tech stack x domain")
L.append("| domain | disp | frontend | backend | cloud/cdn | api | sims | formulas | vendors | pricing (first found) | pain |")
L.append("|---|---|---|---|---|---|---|---|---|---|---|")
for r in rows:
    L.append("| " + " | ".join(str(x) for x in r) + " |")
L.append("")

L.append(f"## Extracted algorithm evidence ({len(algo_evidence)} domains)")
L.append("| domain | formulas | num_sims | correlation |")
L.append("|---|---|---|---|")
for dom, nf, ns, corr in sorted(algo_evidence):
    L.append(f"| {dom} | {nf} | {ns} | {cell(corr)} |")
L.append("")

L.append(f"## Data supply chain rollup ({len(vendor_rollup)} vendors)")
for v, doms in sorted(vendor_rollup.items(), key=lambda kv: -len(kv[1])):
    L.append(f"- {v} — {len(doms)} domains: {short(doms, 6)}")
L.append("")

L.append(f"## Build-priority gaps ({len(gaps)} domains with flags)")
L.append("Flags: api=no API architecture confirmed, no-algo-evidence=no formulas/sims found, pricing=all tiers NOT CONFIRMED, no-pain-data=empty community pain.")
L.append("| domain | disp | flags |")
L.append("|---|---|---|")
for dom, disp, flags in gaps:
    L.append(f"| {dom} | {disp} | {flags} |")
L.append("")

with open(OUT, "w", encoding="utf-8") as fh:
    fh.write("\n".join(L))

print(f"wrote {OUT}")
print(f"dossiers: {len(dossiers)} | dispositions: {disp_counts}")
print(f"algo-evidence domains: {len(algo_evidence)} | vendors: {len(vendor_rollup)} | gap-flagged: {len(gaps)}")
