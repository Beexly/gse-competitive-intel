#!/usr/bin/env python3
"""Parse the workflow output (or journal) into a compact per-page digest."""
import json, os, re

OUT = r"C:\Users\Garrett\AppData\Local\Temp\claude\C--Users-Garrett--claude-GHuman\4d3fdf20-2021-4a94-a981-0139193c9dcc\tasks\wq6xpy0ld.output"
JOURNAL = r"C:\Users\Garrett\.claude\projects\C--Users-Garrett--claude-GHuman\4d3fdf20-2021-4a94-a981-0139193c9dcc\subagents\workflows\wf_1e8a7204-050\journal.jsonl"
DIGEST = r"C:\Users\Garrett\AppData\Local\Temp\claude\C--Users-Garrett--claude-GHuman\4d3fdf20-2021-4a94-a981-0139193c9dcc\scratchpad\fantasyguru\workflow-digest.md"

pages = []
# Prefer journal (one result per line, robust)
if os.path.exists(JOURNAL):
    for line in open(JOURNAL, encoding="utf-8", errors="replace"):
        line=line.strip()
        if not line: continue
        try: obj=json.loads(line)
        except: continue
        if obj.get("type")=="result" and isinstance(obj.get("result"),dict) and obj["result"].get("url"):
            pages.append(obj["result"])

# de-dup by url keeping richest
byurl={}
for p in pages:
    u=p["url"]
    if u not in byurl or len(json.dumps(p))>len(json.dumps(byurl[u])):
        byurl[u]=p
pages=list(byurl.values())

def clean(s):
    if not s: return ""
    return re.sub(r"&amp;","&",str(s)).strip()

order={"pricing":0,"product":1,"roster":2,"tool":3,"franchise":4,"section":5,"article":6,"free-content":1,"positioning":1}
pages.sort(key=lambda p:(order.get(p.get("kind"),9), p["url"]))

lines=[f"# Workflow harvest digest — {len(pages)} pages\n"]
for p in pages:
    lines.append(f"## {p['url']}")
    lines.append(f"- kind: {p.get('kind','')} | access: {p.get('access','')} | title: {clean(p.get('page_title',''))}")
    if p.get('what_it_is'): lines.append(f"- what: {clean(p['what_it_is'])}")
    if p.get('cadence'): lines.append(f"- cadence: {clean(p['cadence'])}")
    if p.get('authors'): lines.append(f"- authors: {', '.join(clean(a) for a in p['authors'])}")
    if p.get('methodology_public'): lines.append(f"- methodology(public): {clean(p['methodology_public'])}")
    if p.get('data_fields'): lines.append(f"- data_fields: {', '.join(clean(d) for d in p['data_fields'])}")
    if p.get('pricing'):
        for pr in p['pricing']: lines.append(f"  - PRICE: {clean(pr)}")
    if p.get('sample_item_titles'):
        st=[clean(t) for t in p['sample_item_titles']][:12]
        lines.append(f"- sample_titles: {' | '.join(st)}")
    if p.get('public_preview_text'): lines.append(f"- preview: {clean(p['public_preview_text'])[:600]}")
    if p.get('notes'): lines.append(f"- notes: {clean(p['notes'])[:400]}")
    lines.append("")

open(DIGEST,"w",encoding="utf-8").write("\n".join(lines))
print(f"Wrote digest with {len(pages)} pages to workflow-digest.md")
print("Kinds:", {k:sum(1 for p in pages if p.get('kind')==k) for k in set(p.get('kind') for p in pages)})
# list urls captured
print("\nURLs captured:")
for p in pages: print(" ",p['url'].replace('https://www.fantasyguru.com/',''), f"[{p.get('access')}]")
