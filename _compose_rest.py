# -*- coding: utf-8 -*-
"""Compose PM-wave1 dossiers from raw evidence. Deterministic, citation-backed."""
import json, os, re, glob, datetime

CI = r"C:\Users\Garrett\.hermes\competitor-intel"
RAW = os.path.join(CI, "raw")
DC = os.path.join(CI, "dossiers")
NC = "NOT CONFIRMED"

TARGETS = ["oddpool.com", "octagonai.co", "polyfactual.com", "polytrader.ai", "sportstensor.com", "fractionai.xyz", "pigeon.trade", "elastics.ai", "forcazt.xyz", "polyprophet.com", "polybro.app", "polymarket.tips", "inside.fyi", "polymaster.io", "polytale.live", "polypulse.tech", "semanticlayer.io", "fereai.xyz", "polyradar.io", "polyseer.xyz", "unifai.network", "quickintel.io", "polyoracle.com", "predly.ai", "simmer.markets", "turbinefi.com", "marketlens.trade", "polyrouter.io", "verso.trading", "matchr.xyz", "firefly.social", "trade.fun", "okaybet.app", "kairos.trade", "nevua.markets", "polyalerthub.com", "stand.trade", "elontweets.live", "polycopy.app", "polymarketanalytics.com", "polysights.xyz", "hashdive.com", "parsec.fi", "mobyscreener.com", "synthesis.trade", "predictfolio.com", "polymarketdash.com", "vercel.app", "polysimplr.com", "prediedge.com", "wethr.net", "polytrend.xyz", "predicting.top", "eventwaves.io", "mentionmarkets.com", "predicts.guru", "predscan.io", "polywallet.info", "firepolymarket.com", "polytrack.cash", "polyinsider.io", "future.fun", "markiumpro.com", "pm.wiki", "polyguana.com", "getarbitragebets.com", "eventarb.com", "polyscalping.org", "predictionhunt.com", "tokenterminal.com", "pizzint.watch", "metaforecast.org", "zapper.xyz", "layerhub.xyz", "goldsky.com", "probalytics.io", "ostium.com", "suibets.com", "gondor.fi", "hyperodd.com", "robin.markets", "polynoob.com", "polymarket.com", "polyfund.so", "kuest.com", "seda.xyz", "orderbook.trade", "prophetnotes.com", "predictionnews.com", "stocktwits.com", "notboring.co", "kaito.ai", "predictionindex.xyz", "frontseat.co", "polyteller.com", "uma.rocks", "netlify.app", "polyfakeit.com", "fake-a-polymarket.com", "useliquid.xyz", "polyhedg.com", "predictshark.io", "polycool.live", "polycule.trade", "polym.trade", "tryokbet.com", "fireplace.gg", "rainmaker.fun", "polybot.trading", "polyburg.com", "userocket.app", "polyxbot.org", "sharpeterminal.com", "polylayer.xyz", "fantasycalc.com", "tradingtechnologies.com", "ninjatrader.com", "opticodds.com", "metabet.ai", "donbest.com", "txodds.com", "kalshi.com", "prophetx.co", "statpal.io", "jsonodds.com", "brokersports.com", "betradar.com", "bettingdata.com", "balldontlie.io", "apisoccer.com", "apifootball.com", "fantasynerds.com", "monitoredtips.com", "soccertipsters.com", "feedinco.com", "moonshotsmlb.com", "ballparkpal.com", "underdogsports.com", "fantasyfootballcalculator.com", "rotowire.com", "thefantasyfootballers.com", "cheatsheetwarroom.com", "dfshero.com", "apps.apple.com", "play.google.com", "cbssports.com", "sportshandle.com", "datarade.ai", "sportsgameodds.com", "isportsapi.com"]

def prefix_matches(dom, fname):
    base = dom.split(".")[0].replace("-", "").lower()
    f = fname.lower().replace("_", "").replace("-", "").replace(".", "")
    return base in f

def evidence_files(dom):
    seen, out = set(), []
    for f in sorted(os.listdir(RAW)):
        if prefix_matches(dom, f):
            p = os.path.join(RAW, f)
            if p not in seen:
                seen.add(p); out.append(p)
    return out

def read(p, cap=400_000):
    try:
        return open(p, encoding="utf-8", errors="replace").read(cap)
    except Exception:
        return ""

def grep(pattern, texts, limit=8):
    hits = []
    for txt, src in texts:
        for m in re.finditer(pattern, txt, re.I):
            s = m.group(0)[:120].strip()
            if s not in [h[0] for h in hits]:
                hits.append((s, src))
            if len(hits) >= limit:
                return hits
    return hits

def disposition(texts):
    joined = " ".join(t[:2000] for t, _ in texts).lower()
    if any(x in joined for x in ["fetch_error", "error 403", "forbidden", "timed out", "timeout"]) and len(joined) < 3000:
        return "walled"
    if len(joined) < 500:
        return "dead"
    return "live"

def title_of(txt):
    m = re.search(r"<title[^>]*>([^<]{3,120})</title>", txt, re.I)
    return m.group(1).strip() if m else ""

for dom in TARGETS:
    ev = evidence_files(dom)
    texts = [(read(p), os.path.basename(p)) for p in ev]
    texts = [(t, s) for t, s in texts if t]
    disp = disposition(texts)
    cites = [os.path.join("raw", s) for _, s in texts[:6]]

    # ---- extraction
    home_txt = next((t for t, s in texts if "home" in s or s.endswith(dom.replace(".", "_") + "_home_raw") or "px_" in s), texts[0][0] if texts else "")
    title = title_of(home_txt)
    desc = ""
    m = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']{20,300})', home_txt, re.I)
    if m: desc = m.group(1)

    endpoints = grep(r"(?:https?://)?(?:api|rest|graphql|ws|wss)[a-z0-9.-]*\.[a-z]{2,}(?:/[a-z0-9/._-]*)?", texts)
    internal_api = grep(r"[\"'`]/api/[a-z0-9/._-]+", texts, limit=6)
    vendors = grep(r"(sportradar|statsperform|opta|genius ?sports|the-?odds-?api|sportsdata\.io|nflverse|balldontlie|rapidapi|kalshi|polymarket|manifold)", texts, limit=6)
    frameworks = grep(r"(next\.js|nuxt|svelte|vue\.js|react|angular|tailwind|_next/static|nuxt/|vite)", texts, limit=4)
    prices = grep(r"(\$[0-9]+(?:\.[0-9]{2})?(?:\s*/\s*(?:mo|month|user))?(?:(?:\s|\u00a0)*(?:pro|plus|free|starter|team|enterprise|beta))|free(?:\s+tier| plan)?|\bpro plan\b|\benterprise\b)", texts, limit=6)
    limits = grep(r"(rate limit|requests per|calls per|\bper minute\b|\bper day\b|credit)", texts, limit=5)
    wsbet = grep(r"(websocket|socket\.io|wss://|server-sent|eventsource)", texts, limit=4)
    robots_paths = []
    rp = next((t for t, s in texts if "robots" in s), "")
    for line in rp.splitlines():
        line = line.strip()
        if line.lower().startswith(("disallow:", "allow:", "sitemap:")):
            robots_paths.append(line[:100])
    api_hosts = sorted({h[0] for h in endpoints if "." in h[0]})[:10]

    def sec(v, c):
        return {"value": v if v else NC, "citation": c if v else (cites[0] if cites else "no-evidence")}

    dossier = {
        "domain": dom,
        "tech_stack": {
            "frontend": sec((frameworks[0][0] if frameworks else (title and "live site, framework unclear") or NC), f"raw/{os.path.basename(ev[0])}" if ev else "no-evidence"),
            "backend": NC, "database": NC, "cloud": NC, "cdn": NC,
            "citations": cites},
        "api_architecture": {
            "rest_endpoints": sec([h[0] for h in endpoints[:6]] or [h[0] for h in internal_api[:6]], f"raw/{os.path.basename(ev[0])}" if ev else "no-evidence"),
            "graphql_schema": NC,
            "websocket_endpoints": sec([h[0] for h in wsbet[:3]], f"raw/{os.path.basename(ev[0])}" if ev else "no-evidence"),
            "rate_limits": sec(limits[0][0] if limits else "", f"raw/{os.path.basename(ev[0])}" if ev else "no-evidence"),
            "citations": cites},
        "extracted_formulas": [],
        "ml_model_infrastructure": {"model_types": NC, "training_data": NC, "update_frequency": NC,
            "citation": (desc and f"site description only: '{desc[:80]}' — no model evidence") or "no-evidence"},
        "simulation_engine": {"num_simulations": NC, "correlation_method": NC, "citation": "no-evidence"},
        "data_supply_chain": {"vendors": sec([h[0] for h in vendors], f"raw/{os.path.basename(ev[0])}" if ev else "no-evidence"), "citations": cites},
        "product_limits": {"limits": sec([h[0] for h in limits[:3]], f"raw/{os.path.basename(ev[0])}" if ev else "no-evidence"), "upgrade_triggers": NC, "citation": cites[0] if cites else "no-evidence"},
        "pricing": {"web": sec([h[0] for h in prices[:4]], f"raw/{os.path.basename(ev[0])}" if ev else "no-evidence"), "ios": NC, "android": NC, "citations": cites},
        "customer_pain": [],
        "discovered_paths": robots_paths[:12] or [NC],
        "discovered_targets": api_hosts or [NC],
        "discovery_metadata": {"method": "scripted http fetch, composed from raw evidence",
                               "timestamp": datetime.datetime.now().isoformat()},
        "disposition": disp,
    }
    dossier["_site_identity"] = {"title": title or NC, "description": desc or NC}
    out = os.path.join(DC, dom + ".json")
    json.dump(dossier, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"WRITTEN: {dom} ({disp}, endpoints={len(endpoints)}, prices={len(prices)}, vendors={len(vendors)}, evidence_files={len(ev)})")
print("DONE")
