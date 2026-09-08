
import os, re, json, gzip, time, ssl, urllib.request, urllib.error
W = r"C:\Users\Garrett\.hermes\competitor-intel"; RAW=os.path.join(W,"raw")
def rd(n):
    b=open(os.path.join(RAW,n),"rb").read()
    if b[:2]==b"\x1f\x8b":
        try: b=gzip.decompress(b)
        except Exception: pass
    return b.decode("utf-8","ignore")
UA={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36","Accept":"*/*","Accept-Encoding":"gzip, deflate"}
ctx=ssl.create_default_context(); ctx.check_hostname=False; ctx.verify_mode=ssl.CERT_NONE
def get(url,t=20):
    try:
        with urllib.request.urlopen(urllib.request.Request(url,headers=UA),timeout=t,context=ctx) as r:
            d=r.read()
            if r.headers.get("Content-Encoding")=="gzip":
                try: d=gzip.decompress(d)
                except Exception: pass
            return r.status,d
    except Exception as e:
        return getattr(e,"code",None),str(e).encode()

# 1) brosonpm raw body (was 404, gzip)
b=rd("brosonpm.trade__home.raw") if os.path.exists(os.path.join(RAW,"brosonpm.trade__home.raw")) else ""
print("BROSONPM body:", re.sub(r"\s+"," ",b)[:500])
for p in ("/health","/api","/home","/app"):
    st,d=get("https://brosonpm.trade"+p); print("probe",p,st,str(d)[:120].replace("\n"," ")); time.sleep(0.6)

# 2) betstack chunk: backend API / wss / odds vendors
tx=rd("betstack.app__chunk-index.raw")
print("\nBETSTACK hosts:", sorted(set(re.findall(r'https?://[a-z0-9.\-]*(?:betstack|odds|sport|api)[a-z0-9.\-]*\.[a-z]{2,}[^"\' ]{0,30}', tx)))[:20])
print("BETSTACK wss:", sorted(set(re.findall(r'wss?://[^"\']+', tx)))[:10])
print("BETSTACK VITE/env:", sorted(set(re.findall(r'VITE_[A-Z_]+', tx)))[:20])
print("BETSTACK supabase:", sorted(set(re.findall(r'(?i)supabase[^"\']{0,60}', tx)))[:8])
print("BETSTACK api-ish:", sorted(set(re.findall(r'["\'](/[a-z0-9\-/]*(?:v1|proxy|backend|server|fetch|odds|games|events|markets|portfolio)[a-z0-9\-/_]*)["\']', tx)))[:30])
print("BETSTACK fetch base:", [re.sub(r'\s+','',m)[:180] for m in re.findall(r'.{60}(?:baseURL|baseUrl|API_URL|apiUrl)[^,;]{0,80}', tx)][:12])
print("BETSTACK monet:", sorted(set(re.findall(r'(?i)(monobank|privat|wayforpay|payment|purchase|price|coins|balance)', tx)))[:12])

# 3) berry homepage text: pricing, app store ids, prediction-market mentions
bh=rd("berryinvesting.com__home.raw")
for pat,lbl in [(r'.{90}(?:\$[0-9][0-9,.]*|zero commission|bonus|fee).{110}',"PRICE"),
                (r'apps\.apple\.com[^"\']*',"IOS"),(r'play\.google\.com[^"\']*',"ANDROID"),
                (r'.{80}prediction market.{120}',"PM"),(r'(?i)(polymarket|kalshi|coinbase|alpaca|drive\.we|plaid|mercury|drive)',"VENDOR")]:
    hits=[re.sub(r'\s+',' ',x) if isinstance(x,str) else x for x in re.findall(pat,bh,re.S)]
    print("\nBERRY",lbl, hits[:6])

# 4) betmoar: fee/edge formula context in big chunk + robots.txt plain
t2=rd("betmoar.fun__chunk-big.raw")
for m in list(re.finditer(r'(?i).{140}(?:taker_fee|maker_fee|feeRate|computeFee|edge\b|ev\b|expected value).{180}', t2, re.S))[:6]:
    print("\nBETMOAR FEE:", re.sub(r'\s+',' ',m.group(0))[:320])
print("BETMOAR api paths:", sorted(set(re.findall(r'["\'](/api/[a-zA-Z0-9_\-/\.]{2,60})["\']', t2)))[:40])
rb,dd=get("https://www.betmoar.fun/robots.txt"); dd2=gzip.decompress(dd) if dd[:2]==b"\x1f\x8b" else dd
open(os.path.join(RAW,"betmoar.fun__robots-plain.raw"),"wb").write(dd2)
print("BETMOAR robots:", dd2.decode('utf-8','ignore')[:400])

# 5) billybets: inline JS analysis
bb=rd("billybets.ai__home.raw")
print("\nBILLY sections:", re.findall(r'(?i)<h[123][^>]*>(.*?)</h[123]>', bb)[:25])
print("BILLY buttons:", re.findall(r'(?i)<button[^>]*>(.*?)</button>', re.sub(r'<[^>]+>',' ',bb))[:15])
for m in list(re.finditer(r'(?i)(const|function)\s+(R|odds|prob|implied|edge|ev|kelly|model)\b[^;]{0,160}', bb))[:12]:
    print("BILLY fn:", re.sub(r'\s+',' ',m.group(0))[:200])
print("BILLY ESPN_URLS ctx:", [re.sub(r'\s+',' ',m)[:240] for m in re.findall(r'ESPN_URLS[\s\S]{0,300}', bb)][:1])
print("BILLY ai/llm:", sorted(set(re.findall(r'(?i)(openai|gpt|claude|anthropic|llm|gemini)', bb)))[:10])
print("BILLY links:", sorted(set(re.findall(r'href="(/[a-z\-]{2,20})"', bb)))[:20])
