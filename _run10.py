# GSE competitor-intel processor for 10 assigned domains.
# Usage: python _run10.py domain1 [domain2 ...]
import json, os, re, sys, time, socket
from datetime import datetime, timezone

BASE = r'C:\Users\Garrett\.hermes\competitor-intel'
RAW = os.path.join(BASE, 'raw')
DOSS = os.path.join(BASE, 'dossiers')
os.makedirs(DOSS, exist_ok=True)
sys.path.insert(0, BASE)
import fetcher

BUDGET = 8
MARKERS = ['baseURL', 'apiRoot', 'axios', 'fetch(', 'isPremium', 'hasAccess',
           'subscription', 'numSims', 'monteCarlo', 'correlation', 'sportradar',
           'statsperform', 'opta', 'genius', 'the-odds-api', 'sportsdata.io',
           'nflverse', 'fantasydata', 'x-api-key', 'localStorage']
VENDORS = ['sportradar', 'statsperform', 'opta', 'genius', 'the-odds-api',
           'sportsdata.io', 'nflverse', 'fantasydata']
NC = 'NOT CONFIRMED'

def now():
    return datetime.now(timezone.utc).isoformat()

def prefix_for(domain):
    return domain.replace('/', '_')

def dns_ok(host):
    try:
        socket.getaddrinfo(host, 443)
        return True, None
    except Exception as e:
        return False, f'{type(e).__name__}: {e}'

def save_raw(name, url, status, body):
    p = os.path.join(RAW, name)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(f'URL: {url}\nSTATUS: {status}\n\n{body[:1_500_000]}')
    return p

class Runner:
    def __init__(self, domain):
        self.domain = domain
        self.pfx = prefix_for(domain)
        self.used = 0
        self.requests = []
        self.raw_files = []
        self.notes = []
        self.hdrs = {}

    def get(self, url, save_name=None, max_bytes=3_000_000, count=True):
        if count and self.used >= BUDGET:
            self.requests.append({'url': url, 'status': 'SKIPPED_BUDGET'})
            return {'status': 'SKIPPED', 'error': 'budget exhausted', 'body': '', 'headers': {}}
        if count:
            self.used += 1
        r = fetcher.fetch(url, save_name=save_name, max_bytes=max_bytes)
        if r.get('status') == 200 and save_name:
            self.raw_files.append(save_name)
        self.requests.append({'url': url, 'status': r.get('status'), 'error': r.get('error'), 'ms': r.get('ms')})
        for k in ('server', 'x-powered-by', 'cf-ray', 'x-vercel-id', 'via'):
            if r.get('headers', {}).get(k):
                self.hdrs[k] = r['headers'][k]
        time.sleep(1)
        return r

    def note(self, msg):
        self.notes.append(msg)
        print('  [note]', str(msg)[:180])

    # ---------- phase 1 ----------
    def phase1(self):
        url = f'https://{self.domain}/'
        h = self.get(url, save_name=f'{self.pfx}_home.html')
        if h.get('status') != 200:
            self.note(f'GET https://{self.domain}/ failed status={h.get("status")} err={h.get("error")}')
            # DNS diagnosis (no HTTP cost)
            host = self.domain.split('/')[0]
            ok, err = dns_ok(host)
            self.dns = {'host': host, 'resolves': ok, 'error': err}
            if not ok:
                errtext = f'DNS failure for {host}: {err}'
                p = save_raw(f'{self.pfx}_DNS_FAILURE.txt', f'https://{host}/', 'DNS_FAIL', errtext)
                self.raw_files.append(os.path.basename(p))
                self.note('domain does not resolve -> dead')
                return False
        else:
            self.dns = {'host': self.domain, 'resolves': True, 'error': None}
        self.home = h
        return h.get('status') == 200

    # ---------- phase 2: robots + sitemap ----------
    def phase2(self):
        self.robots = self.get(f'https://{self.domain}/robots.txt', save_name=f'{self.pfx}_robots.txt')
        sm = self.get(f'https://{self.domain}/sitemap.xml', save_name=f'{self.pfx}_sitemap.xml')
        if sm.get('status') != 200:
            sm = self.get(f'https://{self.domain}/sitemaps.xml', save_name=f'{self.pfx}_sitemaps.xml')
        self.sitemap = sm
        return sm.get('status') == 200

    # ---------- phase 3: JS bundles ----------
    def collect_js_urls(self):
        body = self.home.get('body', '') if self.home else ''
        urls = re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', body, re.I)
        out = []
        for u in urls:
            if u.startswith('//'):
                u = 'https:' + u
            elif u.startswith('/'):
                u = f'https://{self.domain}{u}'
            elif not u.startswith('http'):
                u = f'https://{self.domain}/{u}'
            skip = ('googletag', 'gtag', 'analytics', 'hotjar', 'clarity', 'facebook',
                    'googlesyndication', 'doubleclick', 'adsbygoogle', 'adservice')
            if not any(x in u for x in skip):
                out.append(u)
        seen, uniq = set(), []
        for u in out:
            if u not in seen:
                seen.add(u)
                uniq.append(u)
        return uniq

    def phase3(self):
        self.js_urls = self.collect_js_urls()
        self.js_results = []
        for u in self.js_urls[:3]:
            fname = re.sub(r'[^A-Za-z0-9._-]', '_', u.split('/')[-1].split('?')[0])[:60] or 'bundle'
            r = self.get(u, save_name=f'{self.pfx}_js_{fname}.js')
            if r.get('status') == 200:
                low = r['body'].lower()
                markers = {m: low.count(m.lower()) for m in MARKERS if m.lower() in low}
                api_eps = sorted(set(re.findall(r'["\'](/api/[A-Za-z0-9._/\-{}$]+)["\']', r['body'])))[:25]
                vend = sorted(set(v for v in VENDORS if v in low))
                self.js_results.append({'url': u, 'bytes': len(r['body']), 'markers': markers,
                                        'api_endpoints': api_eps, 'vendors': vend,
                                        'file': f'{self.pfx}_js_{fname}.js'})
            else:
                self.js_results.append({'url': u, 'status': r.get('status'), 'error': r.get('error')})
        return self.js_results

    # ---------- phase 4: api/docs probes (keeps 1 req spare for pricing) ----------
    def phase4(self):
        self.api_probes = []
        for p in ('/openapi.json', '/swagger.json', '/api', '/api/v1', '/docs', '/pricing'):
            if self.used >= BUDGET:
                self.note('budget exhausted; stopping probes')
                break
            r = self.get(f'https://{self.domain}{p}')
            self.api_probes.append({'path': p, 'status': r.get('status'), 'err': r.get('error'),
                                    'ct': r.get('headers', {}).get('content-type')})
            if p == '/pricing' and r.get('status') == 200:
                self.pricing_html = r['body']
        return self.api_probes

    # ---------- dossier ----------
    def write(self, disposition, status, key_findings, extra=None):
        d = {
            'domain': self.domain,
            'tech_stack': {'frontend': NC, 'backend': NC, 'database': NC, 'cloud': NC, 'cdn': NC, 'citations': []},
            'api_architecture': {'rest_endpoints': [], 'graphql_schema': NC, 'websocket_endpoints': NC,
                                 'rate_limits': NC, 'citations': []},
            'extracted_formulas': [],
            'ml_model_infrastructure': {'model_types': NC, 'training_data': NC, 'update_frequency': NC, 'citation': NC},
            'simulation_engine': {'num_simulations': NC, 'correlation_method': NC, 'citation': NC},
            'data_supply_chain': {'vendors': [], 'citations': []},
            'product_limits': {'limits': NC, 'upgrade_triggers': NC, 'citation': NC},
            'pricing': {'web': NC, 'ios': NC, 'android': NC, 'citations': []},
            'customer_pain': [],
            'discovered_paths': [],
            'discovered_targets': [],
            'discovery_metadata': {'method': 'urllib GET via fetcher.py pattern; 8-HTTP-req budget',
                                   'timestamp': now()},
            'disposition': disposition,
            'status': status,
            'key_findings': key_findings,
            'requests_log': self.requests,
            'raw_files': self.raw_files,
            'notes': self.notes,
            'infra_headers': self.hdrs,
        }
        if extra:
            for k, v in extra.items():
                d[k] = v
        p = os.path.join(DOSS, f'{self.pfx}.json')
        with open(p, 'w', encoding='utf-8') as f:
            json.dump(d, f, indent=2)
        print(f'  [dossier] {p} disposition={disposition}')
        return p
