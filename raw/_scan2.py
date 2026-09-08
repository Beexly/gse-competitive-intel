
import os, re, json, gzip, time, ssl, urllib.request, urllib.error, socket
W = r"C:\Users\Garrett\.hermes\competitor-intel"
UA = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36","Accept":"*/*","Accept-Encoding":"gzip, deflate"}
ctx = ssl.create_default_context(); ctx.check_hostname=False; ctx.verify_mode=ssl.CERT_NONE
def get(url, t=25):
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=t, context=ctx) as r:
            d=r.read()
            if r.headers.get("Content-Encoding")=="gzip":
                try: d=gzip.decompress(d)
                except Exception: pass
            return r.status, r.geturl(), d
    except urllib.error.HTTPError as e:
        return e.code, url, b""
    except Exception as e:
        return None, url, str(e).encode()

# 0) full scan1 for blockworks + brosonpm
s1 = json.load(open(os.path.join(W,"raw","batch3-scan1.json")))
print("== BLOCKWORKS ==")
bw=s1["blockworks.com"]["pages"]["home"]
print(json.dumps({k:bw[k] for k in ("status","final_url","headers","title","meta_desc")}, indent=1)[:1200])
print("EXT:", bw.get("ext_hosts"))
print("GREP:", json.dumps(bw.get("grep"))[:1500])
print("BW ROBOTS:", s1["blockworks.com"]["pages"]["robots"].get("robots_text","")[:600])
print("== BROSONPM ==")
print(json.dumps(s1["brosonpm.trade"]["pages"], indent=1)[:900])
try: print("DNS brosonpm.trade:", socket.gethostbyname("brosonpm.trade"))
except Exception as e: print("DNS brosonpm.trade FAIL:", e)
try: print("DNS www.brosonpm.trade:", socket.gethostbyname("www.brosonpm.trade"))
except Exception as e: print("DNS www FAIL:", e)
for d in ["berryinvesting.com","betmoar.fun","betstack.app","billybets.ai","blockworks.com"]:
    try: print("DNS api."+d+":", socket.gethostbyname("api."+d))
    except Exception as e: print("DNS api."+d+" FAIL:", type(e).__name__)

# 1) billybets pricing: search html
bb = open(os.path.join(W,"raw","billybets.ai__home.raw"), encoding="utf-8", errors="ignore").read()
for m in re.finditer(r'.{160}\$47.{260}', bb, re.S):
    print("BB47:", re.sub(r'\s+',' ',m.group(0))[:420])
for m in re.finditer(r'(?i).{120}(premium|subscription|checkout|stripe|paddle|lemonsqueezy|tier|upgrade).{160}', bb, re.S):
    print("BBP:", re.sub(r'\s+',' ',m.group(0))[:300])
# espn usage context
for m in list(re.finditer(r'.{80}site\.api\.espn\.com.{160}', bb, re.S))[:4]:
    print("BBESPN:", re.sub(r'\s+',' ',m.group(0))[:260])

# 2) betstack JS chunk
st,fin,body = get("https://betstack.app/assets/index-DL-1Gvfj.js"); print("BETSTACK JS", st, len(body))
open(os.path.join(W,"raw","betstack.app__chunk-index.raw"),"wb").write(body)
tx = body.decode("utf-8","ignore")
for pat,lbl in [(r'["\']https?://[^"\']{4,90}["\']',"URLS"),(r'["\'](/api/[^"\']{2,80})["\']',"APIPATHS"),
                (r'(?i)(sportradar|opta|the-odds-api|the-odds|oddsapi|sportsdata|fantasydata|nflverse|clearscore|the odds api)',"VENDORS"),
                (r'(?i)(monte ?carlo|simulat|correlation|numSims)',"ALGO"),(r'(?i)(\$[0-9]+(?:\.[0-9]{2})?/?(?:mo|month|yr|year)?|premium|subscription|upgrade|free plan)',"PRICE"),
                (r'(?i)(limit|max [a-z]+|unlimited|[0-9]+ (lineups|picks|bets|parlays))',"LIMITS")]:
    hits = sorted(set(re.findall(pat, tx))) if lbl!="URLS" else sorted(set(re.findall(pat, tx)))
    print(lbl, hits[:30])
print("SUPABASE/FIREBASE:", sorted(set(re.findall(r'(?i)(supabase|firebase|amplify|clerk|auth0|nextauth)', tx)))[:10])

# 3) betmoar: fetch robots uncompressed, find candidate chunk urls + probe likely api hosts
rb,_,body = get("https://www.betmoar.fun/robots.txt")
open(os.path.join(W,"raw","betmoar.fun__robots-plain.raw"),"wb").write(body)
print("BETMOAR ROBOTS", rb, body.decode("utf-8","ignore")[:500])
bh = open(os.path.join(W,"raw","betmoar.fun__home.raw"), encoding="utf-8", errors="ignore").read()
chunks = re.findall(r'src="/(_next/static/immutable/chunks/[^"]+\.js)"', bh)
sizes=[]
for c in chunks[:60]:
    st,fin,body = get("https://www.betmoar.fun/"+c)
    sizes.append((len(body), c, st))
sizes.sort(reverse=True)
print("BETMOAR top chunks:", sizes[:6])
big = sizes[0][1]
st,fin,body = get("https://www.betmoar.fun/"+big)
open(os.path.join(W,"raw","betmoar.fun__chunk-big.raw"),"wb").write(body)
tx = body.decode("utf-8","ignore")
for pat,lbl in [(r'["\']https://[a-z0-9.\-]+(?:\.betmoar\.fun|\.polymarket\.com|\.kalshi\.com)[^"\']*["\']',"APIS"),
                (r'["\'](/api/[a-zA-Z0-9_\-/\.]{2,60})["\']',"APIPATHS"),
                (r'(?i)(polymarket|kalshi|robinhood|crypto\.com|gem|limitless|manifold)',"PM_HOSTS"),
                (r'(?i)(fee|edge|vig|take|commission|rake|[0-9.]+%)',"FEES")]:
    print(lbl, sorted(set(re.findall(pat, tx)))[:25])
