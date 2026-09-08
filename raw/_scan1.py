
import os, re, json, gzip, io, time, urllib.request, urllib.error, ssl
W = r"C:\Users\Garrett\.hermes\competitor-intel"
os.makedirs(os.path.join(W,"raw"), exist_ok=True)
os.makedirs(os.path.join(W,"dossiers"), exist_ok=True)
UA = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Encoding":"gzip, deflate", "Accept-Language":"en-US,en;q=0.9"}
ctx = ssl.create_default_context(); ctx.check_hostname=False; ctx.verify_mode=ssl.CERT_NONE
def get(url, t=25):
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=t, context=ctx) as r:
            data = r.read()
            if r.headers.get("Content-Encoding")=="gzip":
                try: data = gzip.decompress(data)
                except Exception: pass
            return r.status, dict(r.headers), r.geturl(), data
    except urllib.error.HTTPError as e:
        try: b=e.read()
        except Exception: b=b""
        return e.code, dict(e.headers), url, b
    except Exception as e:
        return None, {"error":str(e)}, url, b""
DOMS = ["berryinvesting.com","betmoar.fun","betstack.app","billybets.ai","blockworks.com","brosonpm.trade"]
PATS = {
 "api_paths": r'["\'/][a-zA-Z0-9_\-./]*api[a-zA-Z0-9_\-./]*["\']',
 "js_src": r'<script[^>]+src=["\']([^"\']+)["\']',
 "vendor": r'(?i)(sportradar|statsperform|opta|genius ?sports|the-odds-api|sportsdata\.io|nflverse|fantasydata|oddsapi|the odds api)',
 "algo": r'(?i)(monte[ -]?carlo|numSims|num_sims|simulations?|correlation|ev\b|expected value|arbitrage|clip|parlay)',
 "pricing": r'(?i)(\$[0-9]+(?:\.[0-9]{2})?|per month|/month|premium|subscription|tier|free plan|pro plan|trial)',
 "limits": r'(?i)(limit[s]?\b|cap\b|max\b|unlimited|lineups?|plays? per|daily)',
 "infra_meta": r'(?i)(next/static|__NEXT_DATA__|nuxt|gatsby|sveltekit|remix|astro|cloudflare|vercel|netlify|supabase|firebase|amplify|shopify|webflow|framer|gatsby)',
 "ext_hosts": r'https?://([a-zA-Z0-9.\-]+\.[a-z]{2,})',
}
report={}
for d in DOMS:
    info={"pages":{}}
    for name,path in [("home","/"),("robots","/robots.txt")]:
        st,hd,final,body = get("https://"+d+path)
        rec={"status":st,"final_url":final,"bytes":len(body)}
        hdr={k:v for k,v in hd.items() if k.lower() in ("server","x-powered-by","cf-ray","x-vercel-id","via","content-type","location","x-amz-cf-id","x-nf-build-id")}
        rec["headers"]=hdr
        fn=os.path.join(W,"raw",f"{d}__{name}.raw")
        try:
            open(fn,"wb").write(body)
        except Exception as e:
            rec["write_error"]=str(e)
        text=body.decode("utf-8","ignore") if body else ""
        rec["title"]= (re.search(r'<title[^>]*>(.*?)</title>', text, re.S) or [None,""])[1].strip()[:160]
        rec["meta_desc"]= ((re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']{0,300})', text) or re.search(r'<meta[^>]+content=["\']([^"\']{0,300})["\'][^>]+name=["\']description', text) or [None,""])[1])[:300]
        if name=="home":
            rec["js_srcs"]=sorted(set(re.findall(PATS["js_src"], text)))[:25]
            rec["ext_hosts"]=sorted(set(h for h in re.findall(PATS["ext_hosts"], text) if d not in h))[:40]
            g={}
            for k in ("api_paths","vendor","algo","pricing","limits","infra_meta"):
                m=re.findall(PATS[k], text)
                g[k]=sorted(set(x if isinstance(x,str) else x[0] for x in m))[:25]
            rec["grep"]=g
            info["html_len"]=len(text)
        else:
            rec["robots_text"]=text[:900]
        info["pages"][name]=rec
        time.sleep(1)
    report[d]=info
print(json.dumps(report, indent=1)[:14000])
open(os.path.join(W,"raw","batch3-scan1.json"),"w").write(json.dumps(report,indent=1))
