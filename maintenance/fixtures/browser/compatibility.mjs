import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base=process.env.PREVIEW_URL || 'http://127.0.0.1:4175';
const registry=JSON.parse(await readFile(new URL('../../documentation-versions.json',import.meta.url)));
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
await page.context().route('**/*',route=>new URL(route.request().url()).origin===base?route.continue():route.abort());
const errors=[];page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.type()==='error' && !message.text().includes('Failed to load resource'))errors.push(message.text())});
const releases=registry.releases.filter(item=>item.documentationKey);
const results={verifiedOn:'2026-10-16',packages:[],screenshotsSaved:false};
for(const release of releases){
 await page.goto(base+release.route,{waitUntil:'networkidle'});await page.reload({waitUntil:'networkidle'});
 assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://docs.offlineagency.com'+release.route);
 assert.equal(await page.getByRole('combobox',{name:'Documentation version'}).inputValue(),release.route);
 assert.ok((await page.locator('.documentation-version').innerText()).includes(release.version==='next'?'Development':release.version));
 const options=await page.locator('.documentation-version option').evaluateAll(nodes=>nodes.map(node=>node.value));
 assert.ok(options.every(route=>route.startsWith('/'+release.name.split('/')[1]+'/')));
 assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),release.version==='next'?'noindex, follow':'index, follow');
 assert.ok(await page.locator('.vp-sidebar a.vp-sidebar-item').count()>0);
 const sidebarLinks=await page.locator('.vp-sidebar a.vp-sidebar-item').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href')));
 assert.ok(sidebarLinks.every(route=>new URL(route,page.url()).pathname.startsWith(release.route)),JSON.stringify({release:release.route,sidebarLinks}));
 for(const href of sidebarLinks){const target=new URL(href,page.url());if(target.pathname===release.route && target.hash)assert.ok(await page.evaluate(id=>!!document.getElementById(id),decodeURIComponent(target.hash.slice(1))));}
 results.packages.push({route:release.route,version:release.version,options});
}
const redirects=await (await fetch(base+'/redirects.json')).json();
for(const redirect of redirects){
 await page.goto(base+redirect.route,{waitUntil:'networkidle'});
 const expected=new URL(redirect.target,base);assert.equal(new URL(page.url()).pathname,expected.pathname);
 const first=Object.entries(redirect.anchors)[0];
 if(first){await page.goto(base+redirect.route+'#'+encodeURIComponent(first[0]),{waitUntil:'networkidle'});const expectedAnchor=new URL(first[1],base);assert.equal(new URL(page.url()).pathname,expectedAnchor.pathname);assert.equal(new URL(page.url()).hash,expectedAnchor.hash);}
}
await page.goto(base+'/spid-laravel-trentino/v2/?missing-topic=Old%20topic',{waitUntil:'networkidle'});
assert.match(await page.getByRole('status').innerText(),/Old topic.*unavailable/);
const link=page.locator('[vp-content] a[href^="/spid-laravel-trentino/v2/"]').first();
if(await link.count()){await link.click();await page.waitForLoadState('networkidle');assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://docs.offlineagency.com'+new URL(page.url()).pathname);}
await page.goto(base+'/braintree-vue3/next/',{waitUntil:'networkidle'});
await page.locator('[vp-content] a[href="/braintree-vue3/next/installation/"]').first().click();await page.waitForURL('**/braintree-vue3/next/installation/');
assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://docs.offlineagency.com/braintree-vue3/next/installation/');assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'noindex, follow');
await page.goto(base+'/');
const search=page.locator('.search-box input');await search.fill('Braintree');await page.locator('.suggestion').first().waitFor();assert.ok((await page.locator('.suggestion a').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href')))).every(route=>route.startsWith('/braintree-vue3/next/')));
await search.fill('SPID');await page.locator('.suggestion').first().waitFor();assert.match(await page.locator('.suggestion a').first().innerText(),/v2/);
const selected=await page.locator('.suggestion a').first().getAttribute('href');await page.locator('.suggestion').first().dispatchEvent('mousedown');await page.waitForURL(url=>url.pathname+url.hash===selected);
assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://docs.offlineagency.com'+new URL(page.url()).pathname);assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'index, follow');results.spaSeo=true;
const sitemap=await (await fetch(base+'/sitemap.xml')).text();assert.ok(!sitemap.includes('/braintree-vue3/'));for(const release of releases.filter(item=>item.version!=='next'))assert.ok(sitemap.includes('https://docs.offlineagency.com'+release.route));
const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});await mobile.context().route('**/*',route=>new URL(route.request().url()).origin===base?route.continue():route.abort());
for(const release of releases){await mobile.goto(base+release.route,{waitUntil:'networkidle'});assert.ok(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));const toggle=mobile.getByRole('button',{name:'Toggle navigation'});await toggle.focus();await toggle.press('Enter');assert.equal(await toggle.getAttribute('aria-expanded'),'true');await toggle.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');}
for(const route of ['/braintree-vue3/next/hosted-fields/','/vue3-burger-menu/v1/reference/']){await mobile.goto(base+route,{waitUntil:'networkidle'});assert.ok(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));for(const block of await mobile.locator('pre, table').evaluateAll(nodes=>nodes.map(node=>({width:node.clientWidth,scrollWidth:node.scrollWidth,overflow:getComputedStyle(node).overflowX}))))if(block.scrollWidth>block.width+1)assert.match(block.overflow,/auto|scroll/);}
assert.deepEqual(errors,[]);results.redirects=redirects.length;results.runtimeErrors=errors;results.mobileKeyboard=true;results.search=true;results.canonicalSitemap=true;
await writeFile(new URL('../../evidence/compatibility-browser.json',import.meta.url),JSON.stringify(results,null,2)+'\n');console.log(JSON.stringify({result:'PASS',packages:results.packages.length,redirects:results.redirects,mobile:true,errors}));await browser.close();
