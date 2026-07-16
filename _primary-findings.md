# Scores24 — Lead Analyst Primary Findings (directly verified, 2026-07-15)

These are facts I verified myself via passive-public sources (CT logs, RDAP, DNS-over-HTTPS, robots.txt, sitemaps, live Firecrawl scrapes of public pages). Ground-truth for the final report; cross-check against workflow agent output.

## Infrastructure (third-party sources only)
- **crt.sh CT-log subdomains:** api, api.dev, wss, **parser**, stage, **stage-k8s**, test, dev, old, ads, l, links.email, mail, owa, autodiscover, cdn, cdn.scores24.ru, www. (parser = data ingestion; stage-k8s = Kubernetes; owa/autodiscover = legacy Exchange.)
- **DNS:** A = 104.20.31.45 / 172.66.160.170 (Cloudflare); AAAA = 2606:4700:10:: (Cloudflare); NS = ClouDNS (gns21-24.cloudns.net); MX = mx.yandex.net (Yandex 360); SPF = redirect _spf.yandex.net; CAA = globalsign.com; TXT = GlobalSign + yandex-verification:40bb3fb01fc9a421 + 2× google-site-verification.
- **scores24.ru** sister domain: A = 23.111.102.10 (NOT Cloudflare), NS/MX = Yandex.
- **RDAP (.live):** registered 2016-12-09, **transferred 2022-04-19**, expires 2027-12-09, registrar IANA id 303, status clientTransferProhibited, DNSSEC unsigned.
- Additional asset hosts seen in page HTML: **static.scores24.live** (static assets), **s15742.cdn.ngenix.net** (NGENIX Russian CDN, OG images), **ads.adfox.ru** (Yandex AdFox ad network — display ads).

## robots.txt (public)
- **Russian-language comments** (operators confirmed Russian).
- Named affiliate promo path: **/promo-parimatch*** and /promo/*.
- **Hidden internal data endpoints (Disallowed — NEVER fetched):** /api/v2/odds/live, /feeds/prematch-odds.json, /export/events.csv, /data/match-statistics, /api/v3/markets/all, /sportsdata/v1/fixtures.
- **AI-crawler policy:** ALLOWS `ChatGPT-User`; BLOCKS `anthropic-ai`, `CCBot`, `Google-Extended`, `cohere-ai`, `FacebookBot`, `Omgili/Omgilibot`.
- Blocks utm_/yclid/gclid/_openstat params from indexing.

## SEO scale (sitemap index)
- **515 child sitemaps**; templates × ~13-15 languages: main, teams, **players**, **referee**, **tools**, trends, leagues, leagues-standings, accumulators, sport-predictions, leagues-predictions, sportbooks, betting-offers, articles, {sport}-upcoming-matches, {sport}-predictions, soccer-upcoming-matches-h2h.
- Languages: en, ru, es, it, pt, fr, de, pl, hu, ja, id, gr(el), cn(zh) + geo mains mx, pe.
- **Google News sitemap** present (sitemaps-news/sitemap-news-index.xml).
- **Geo-cloaked offer pages:** sportbooks-np (Nepal), -xk (Kosovo), -hn (Honduras); betting-offers-ph (Philippines), -ar (Argentina).
- Map sample: 5,180 URLs; English dominates (~3,952 of sample). Tennis (1,498) + soccer (1,282) + table-tennis (591) lead volume.

## Product — real match page anatomy (Bregenz vs Austria Lustenau, 15 Jul 2026)
- **"Editorial Prediction"** = named human/editorial tip: *"Schwarz Weiss Bregenz Handicap (+1.5) at odds of -152*"* with *"*The odds are relevant for the time of publication (14 July 2026, 13:20)."*
- **Probability bars** on the detail page: 0% / 20% / 80% (1X2), "Both teams scored 60%" — these look modeled/calibrated, and are DIFFERENT from the 90-100% numbers on the predictions LIST page. Nuance: the headline list % is likely a "confidence in our tip" marketing figure, not a modeled outcome probability.
- Model outputs shown: projected ball possession (51% vs 49%).
- Sections: Match Result / Double Chance / Over-Under / Both-teams-scored / 1st-half predictions; **"Will this prediction come true?"** user-vote widget.

## Monetization — affiliate roster (US-geolocated scrape)
- Tracker: **Keitaro** (/tvsv/offers, /tvsv/click; keitaroBannerData in app-state). Partner assets under **static.scores24.live/upload/partners-s24/**.
- **US-facing OFFSHORE/crypto sportsbook roster:** **Bovada, BetUS, BetOnline, Betwhale, MyBookie, Betnow, RainBet, LuckyRebel** (+ Leon, 888 seen). These are the classic *unlicensed offshore* books that target US bettors + crypto casinos.
- **Geo-cloaking confirmed:** Honduras variant surfaces **1xbet, 1win, 22Bet** alongside the offshore set → partner roster rotates by market (US offshore vs CIS grey-market crypto books). Parimatch named in robots for CIS/emerging.
- Display ads via **Yandex AdFox** (ads.adfox.ru) layered on top of affiliate.

## Hosting geography (hard confirm)
- **scores24.ru → 23.111.102.10 = AS39134 EDINAYA SET LLC, Moscow, RU** (Russian hosting; operational base behind the Estonian shell).
- scores24.live main → AS13335 Cloudflare (US edge) — front only.
- Real sitemap URL counts: en-main = 116, **en-teams = 3,391**, en-soccer-predictions = 136 (predictions rotate with the live slate). Estimate: team pages ≈ 3.4k × ~13 langs ≈ ~44k; total indexable likely low-hundreds-of-thousands across all templates/langs (not millions) — the scale is breadth × languages, not depth per template.

## Compliance flag for GSE
scores24 monetizes **US** traffic by funneling to **unlicensed offshore sportsbooks** (Bovada/BetOnline/MyBookie/BetUS) and grey-market operators (1xbet) — legally fraught in the US and the sharpest possible trust contrast for a trust-first US product. GSE must NOT replicate any of this (no affiliate cloaking, no offshore/real-money funnels) per gaming-stance doctrine.
