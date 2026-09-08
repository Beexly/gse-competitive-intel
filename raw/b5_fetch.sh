set -u
BASE="C:/Users/Garrett/.hermes/competitor-intel"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
mkdir -p "$BASE/raw" "$BASE/dossiers"
for d in deepnewz.com defillama.com dexu.ai dimes.fi domeapi.io dune.com; do
  h=$(curl.exe -sL -m 25 -A "$UA" -o "$BASE/raw/$d.html" -w "%{http_code} %{url_effective}" "https://$d/")
  echo "HOME $d :: $h :: bytes=$(wc -c < "$BASE/raw/$d.html")"
  r=$(curl.exe -s -m 15 -A "$UA" -o "$BASE/raw/$d.robots.txt" -w "%{http_code}" "https://$d/robots.txt")
  echo "ROBOTS $d :: $r"
done
for d in deepnewz.com defillama.com dexu.ai dimes.fi domeapi.io dune.com; do
  f="$BASE/raw/$d.html"
  echo "##### $d"
  echo "--TITLE--"; grep -oiE '<title[^>]*>[^<]{0,160}' "$f" | head -2
  echo "--APIURLS--"; grep -oE 'https?://[^"'"'"' <>\\]*api[^"'"'"' <>\\]*' "$f" | sort -u | head -25
  echo "--PATHS--"; grep -oE '"/(api|v[0-9])[a-zA-Z0-9._/-]{2,60}' "$f" | sort -u | head -25
  echo "--FRAMEWORK--"; grep -oE '_next/|__NEXT_DATA__|__NUXT__|nuxt|gatsby|svelte|angular|webpack|cdn-cgi|vercel|netlify|cloudflare|shopify|wordpres' "$f" | sort | uniq -c | sort -rn | head -12
  echo "--VENDOR--"; grep -oiE 'posthog|amplitude|segment\.io|mixpanel|datadog|sentry\.io|hotjar|clarity\.ms|googletagmanager|google-analytics|plausible|stripe|hubspot|intercom|crisp\.chat|matomo' "$f" | sort | uniq -ic | sort -rn | head -12
  echo "--PRICING--"; grep -ioE '.{0,45}(pricing|per month|/month|\$[0-9][0-9,]{1,9}).{0,45}' "$f" | tr -d '\r' | sed 's/  */ /g' | sort -u | head -15
done
echo "=====ROBOTSCONTENT====="
for d in deepnewz.com defillama.com dexu.ai dimes.fi domeapi.io dune.com; do
  echo "---robots $d---"; head -c 700 "$BASE/raw/$d.robots.txt" 2>/dev/null; echo
done
