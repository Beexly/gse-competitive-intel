
import os, re, gzip, ssl, json, urllib.request, time
W = r"C:\Users\Garrett\.hermes\competitor-intel"; RAW=os.path.join(W,"raw")
def rd(n):
    p=os.path.join(RAW,n)
    if not os.path.exists(p): return ""
    b=open(p,"rb").read()
    if b[:2]==b"\x1f\x8b":
        try: b=gzip.decompress(b)
        except Exception: pass
    return b.decode("utf-8","ignore")
UA={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0.0.0 Safari/537.36","Accept-Encoding":"gzip, deflate"}
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

# billybets: is it a demo? look for "demo", "mock", "placeholder", disclaimer; dump visible text snippets
bb=rd("billybets.ai__home.raw")
print("BILLY demo flags:", sorted(set(re.findall(r'(?i)(demo|mock|placeholder|coming soon|waitlist|not financial advice|disclaimer|simulat)', bb))))
print("BILLY h-text:", re.findall(r'>([^<>]{12,80})<', re.sub(r'<script[\s\S]*?</script>','',bb))[:30])
print("BILLY parseESPN ctx:", [re.sub(r'\s+',' ',m)[:260] for m in re.findall(r'function parseESPN[\s\S]{0,420}', bb)][:1])
print("BILLY odds handling:", [re.sub(r'\s+',' ',m)[:200] for m in re.findall(r'(?i).{80}(?:odds|implied|spread|favorite|underdog).{100}', bb)][:6])

# betstack: trpc endpoints & odds from main chunk
bs=rd("betstack.app__chunk-index.raw")
print("\nBETSTACK trpc:", sorted(set(re.findall(r'[a-zA-Z]+\.[a-zA-Z]+\.(?:useQuery|useMutation|useInfiniteQuery)', bs)))[:30])
print("BETSTACK router words:", sorted(set(re.findall(r'(?i)(trpc|superjson|websocket|wss|EventSource)', bs)))[:10])
print("BETSTACK odds ctx:", [re.sub(r'\s+',' ',m)[:200] for m in re.findall(r'(?i).{60}(?:american|decimal odds|moneyline|spread|parlay|lineup).{80}', bs)][:8])

# betmoar: second largest chunk for pricing/fee/edge logic
st,d = get("https://www.betmoar.fun/_next/static/immutable/chunks/2zaudciqaer_x.js")
open(os.path.join(RAW,"betmoar.fun__chunk2.raw"),"wb").write(d); t2=d.decode("utf-8","ignore")
for pat in [r'.{120}user-market.{120}', r'(?i).{100}(?:takerFee|makerFee|fee_bps|discount|rebate).{120}', r'(?i).{100}(?:/api/[a-z\-/]+).{80}', r'(?i).{80}(?:subscription|plan|\$[0-9]+|free).{100}']:
    print("\nBM2", pat[:28], [re.sub(r'\s+',' ',m)[:280] for m in re.findall(pat,t2,re.S)][:4])

# blockworks: pricing page
st,d=get("https://blockworks.com/pricing"); print("\nBW pricing", st)
if st==200:
    open(os.path.join(RAW,"blockworks.com__pricing.raw"),"wb").write(d)
    tx=re.sub(r'<script[\s\S]*?</script>','',d.decode("utf-8","ignore"))
    print("BW price text:", re.findall(r'>([^<>]{6,90})<', tx)[:60])
    tx2=d.decode("utf-8","ignore")
    print("BW $:", sorted(set(re.findall(r'\$[0-9][0-9,]{2,9}(?:/[a-z]+)?', tx2)))[:20])
    print("BW tiers:", sorted(set(re.findall(r'(?i)(enterprise|pro|plus|data api|research|terminal|individuals|teams)', tx2)))[:15])

# berry: probe help center + pricing hint in homepage text
bh=rd("berryinvesting.com__home.raw")
print("\nBERRY fees:", [re.sub(r'\s+',' ',m)[:200] for m in re.findall(r'(?i).{100}(?:no fee|fees|expense|prediction market fee|third-party partner).{120}', re.sub(r'<script[\s\S]*?</script>','',bh))][:6])
