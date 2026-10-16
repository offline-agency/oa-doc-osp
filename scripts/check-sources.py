#!/usr/bin/env python3
"""Verify pinned GitHub file links offline; optional read-only HTTP link audit."""
import argparse, concurrent.futures, datetime, json, pathlib, re, subprocess, urllib.request, urllib.error, urllib.parse
p=argparse.ArgumentParser()
p.add_argument('--references', type=pathlib.Path, required=True)
p.add_argument('--cart-reference', type=pathlib.Path, required=True)
p.add_argument('--http', action='store_true')
p.add_argument('--output', type=pathlib.Path)
a=p.parse_args(); root=pathlib.Path(__file__).resolve().parents[1]
m=json.loads((root/'maintenance/package-sources.json').read_text())
packages={x['repository'].removeprefix('https://github.com/'):x for x in m['packages'] if x.get('commit')}
drift=[]
for package in packages.values():
 repo=a.cart_reference if package['name'].endswith('/laravel-cart') else a.references/package['name'].split('/')[1]
 resolved=subprocess.check_output(['git','-C',str(repo),'rev-parse',package['selectedTag']+'^{commit}'],text=True).strip()
 composer=json.loads(subprocess.check_output(['git','-C',str(repo),'show',package['commit']+':composer.json'],text=True))
 assert resolved==package['commit'], package['name']+' tag moved'
 assert composer['require']==package['composerRequirements'], package['name']+' Composer manifest drift'
 drift.append({'package':package['name'],'status':'ok'})
urls=set()
for f in list(root.glob('*.md'))+list((root/'laravel-cart').glob('*.md'))+list((root/'laravel-webex').glob('*.md')):
 urls.update(re.findall(r'\]\((https://[^\s)]+)\)',f.read_text()))
source=[]; remaining=[]
for url in sorted(urls):
 match=re.match(r'https://github.com/([^/]+/[^/]+)/(blob|tree)/([^/]+)/(.*?)(?:#.*)?$',url)
 if not match or match[1] not in packages:
  remaining.append(url); continue
 package=packages[match[1]]; ref=match[3]; path=urllib.parse.unquote(match[4])
 repo=a.cart_reference if match[1].endswith('/laravel-cart') else a.references/match[1].split('/')[1]
 if ref not in (package['commit'],package['selectedTag']):
  source.append({'url':url,'status':'moving-or-other-reference'}); continue
 result=subprocess.run(['git','-C',str(repo),'cat-file','-e',ref+':'+path],capture_output=True)
 source.append({'url':url,'status':'ok' if result.returncode==0 else 'missing-source'})
def request(url):
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'oa-doc-osp-link-check/1.0'},method='HEAD')
  with urllib.request.urlopen(req,timeout=20) as response: status=response.status
 except urllib.error.HTTPError as error: status=error.code
 except Exception as error: return {'url':url,'status':'unavailable','reason':str(error)}
 return {'url':url,'httpStatus':status,'status':'ok' if 200<=status<400 else 'missing' if status==404 else 'unavailable'}
http=list(concurrent.futures.ThreadPoolExecutor(max_workers=6).map(request,remaining)) if a.http else []
report={'verifiedOn':datetime.datetime.now(datetime.timezone.utc).date().isoformat(),'releaseManifestChecks':drift,'pinnedSourceLinks':source,'externalLinks':http,'httpRequested':a.http}
if a.output: a.output.write_text(json.dumps(report,indent=2)+'\n')
from collections import Counter
print(json.dumps({'sources':dict(Counter(x['status'] for x in source)),'http':dict(Counter(x['status'] for x in http))},indent=2))
for item in source+http:
 if item['status']!='ok': print(json.dumps(item))
raise SystemExit(any(x['status'] in ('missing-source','missing') for x in source+http))
