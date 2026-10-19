const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import assert from 'node:assert/strict';
import { writeFile, readdir, readFile } from 'node:fs/promises';
const sources=JSON.parse(await readFile(new URL('../../package-sources.json',import.meta.url),'utf8'));
const versions=JSON.parse(await readFile(new URL('../../documentation-versions.json',import.meta.url),'utf8'));
const snapshotRoutes=new Set(versions.releases.flatMap(release=>release.pages.map(page=>page.route)));
const root=process.env.PREVIEW_URL || 'http://127.0.0.1:4175';
const localOnly=route => new URL(route.request().url()).origin === root ? route.continue() : route.abort();
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
await page.context().route('**/*', localOnly);
page.setDefaultTimeout(15000);page.setDefaultNavigationTimeout(15000);

const errors=[];page.on('pageerror',e=>errors.push(e.message));
const results={verifiedOn:'2026-10-20',desktop:{},mobile:{},screenshotsSaved:false};
await page.goto(root,{waitUntil:'networkidle'});
const catalogCount=sources.packages.filter(source=>['current-release','historical-integration','source-reference'].includes(source.status)).length;
assert.equal(await page.locator('.project').count(),catalogCount);
results.desktop.homeCards=catalogCount;
const nav=page.getByRole('navigation',{name:'Site'});
assert.deepEqual(await nav.getByRole('link').allInnerTexts(),['Projects','Legacy','Open source','GitHub ↗','offlineagency.it ↗']);
assert.equal(await page.getByRole('button',{name:'Toggle navigation'}).isVisible(),false);
results.desktop.headerNavigation='Site links visible; menu toggle hidden on desktop';
const routes=[...new Set(['/laravel-cart/','/laravel-cart/money-and-tax/','/laravel-cart/legacy/','/laravel-webex/','/laravel-webex/coverage/','/laravel-fatture-in-cloud-v2/','/laravel-aruba-sms/','/laravel-mongo-auto-sync/','/laravel-fatture-in-cloud/','/laravel-moneta-online/',...sources.packages.filter(source=>source.commit).map(source=>source.route)])];
for(const route of routes){const response=await page.goto(root+route,{waitUntil:'networkidle'});assert.equal(response.status(),200);await page.reload({waitUntil:'networkidle'});assert.ok((await page.locator('h1').first().innerText()).length); results.desktop[route]={title:await page.title(),h1:await page.locator('h1').first().innerText()};}
await page.goto(root+'/laravel-cart/',{waitUntil:'networkidle'});
const search=page.locator('.search-box input');results.desktop.search={};
for(const topic of ['VAT','wishlist','Webex','Aruba','pagination']){await search.fill(topic);await page.locator('.suggestion').first().waitFor({state:'visible'});results.desktop.search[topic]=await page.locator('.suggestion a').evaluateAll(ns=>ns.map(n=>n.getAttribute('href')));assert.ok(results.desktop.search[topic].length);}
await search.fill('VAT');await page.locator('.suggestion').first().waitFor();await search.press('ArrowDown');const searchTarget=await page.locator('.suggestion.focus a').getAttribute('href');await search.press('Enter');await page.waitForURL(u=>u.pathname+u.hash===searchTarget);results.desktop.keyboardSearch=page.url().replace(root,'');
await page.goto(root+'/laravel-cart/4.0.3/storage/',{waitUntil:'networkidle'});
const selector=page.getByRole('combobox',{name:'Documentation version'});
assert.equal(await selector.inputValue(),'/laravel-cart/4.0.3/storage/');
assert.match(await page.locator('.archive-notice').innerText(),/Archived 4.0.3/);
await selector.selectOption('/laravel-cart/v4/storage/');await page.waitForURL('**/laravel-cart/v4/storage/');
assert.equal(await selector.inputValue(),'/laravel-cart/v4/storage/');
assert.ok(await page.locator('.doc-sidebar a.doc-nav-item').count()>0);
assert.ok((await page.locator('.doc-sidebar a.doc-nav-item').evaluateAll(ns=>ns.map(n=>n.getAttribute('href')))).every(href=>href.startsWith('/laravel-cart/v4/')));
await page.reload({waitUntil:'networkidle'});assert.equal(await selector.inputValue(),'/laravel-cart/v4/storage/');
assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://docs.offlineagency.com/laravel-cart/v4/storage/');
results.desktop.versionSelector='Archived 4.0.3 to current v4, matching topic, sidebar, direct refresh and canonical';
const notFound=await page.goto(root+'/missing-documentation-route/',{waitUntil:'networkidle'});assert.equal(notFound.status(),404);assert.ok(await page.getByRole('link',{name:/home/i}).count());results.desktop.notFound=404;
const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});await mobile.context().route('**/*', localOnly);mobile.on('pageerror',e=>errors.push(e.message));
await mobile.goto(root+'/laravel-cart/money-and-tax/',{waitUntil:'networkidle'});
const toggle=mobile.getByRole('button',{name:'Toggle navigation'});await toggle.focus();await toggle.press('Enter');await mobile.waitForFunction(()=>Math.abs(document.querySelector('.doc-sidebar').getBoundingClientRect().left)<1);assert.equal(await toggle.getAttribute('aria-expanded'),'true');
await toggle.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');await toggle.press('Space');await mobile.waitForFunction(()=>Math.abs(document.querySelector('.doc-sidebar').getBoundingClientRect().left)<1);
await mobile.locator('.doc-sidebar a.doc-nav-item[href="/laravel-cart/v4/storage/"]').first().click();await mobile.waitForURL('**/laravel-cart/v4/storage/');assert.equal(await toggle.getAttribute('aria-expanded'),'false');results.mobile.keyboardMenu='Enter, Escape, Space, route closes menu';
for(const route of ['/', '/laravel-webex/coverage/', '/laravel-fatture-in-cloud-v2/','/laravel-cart/money-and-tax/']){
 await mobile.goto(root+route,{waitUntil:'networkidle'});
 const dimensions=await mobile.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));assert.ok(dimensions.document<=dimensions.viewport+1,route+' horizontal page overflow');
 results.mobile[route]={dimensions,codeBlocks:await mobile.locator('pre').evaluateAll(ns=>ns.map(n=>({width:n.clientWidth,scrollWidth:n.scrollWidth,overflow:getComputedStyle(n).overflowX}))),tables:await mobile.locator('table').evaluateAll(ns=>ns.map(n=>({width:n.clientWidth,scrollWidth:n.scrollWidth,overflow:getComputedStyle(n).overflowX})))};
}
await mobile.goto(root+'/laravel-mongo-auto-sync/',{waitUntil:'networkidle'});
await mobile.getByRole('button',{name:'Toggle navigation'}).click();await mobile.waitForFunction(()=>Math.abs(document.querySelector('.doc-sidebar').getBoundingClientRect().left)<1);
const mobileVersion=mobile.getByRole('combobox',{name:'Documentation version'});await mobileVersion.focus();await mobileVersion.press('ArrowDown');await mobileVersion.press('Enter');
await mobile.waitForURL('**/laravel-mongo-auto-sync/3.1.1/');
assert.ok(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));results.mobile.versionSelector='Native keyboard selection to Mongo 3.1.1, no horizontal page overflow';
const nojs=await browser.newContext({javaScriptEnabled:false});await nojs.route('**/*',localOnly);const staticPage=await nojs.newPage();await staticPage.goto(root+'/laravel-aruba-sms/');assert.match(await staticPage.locator('body').innerText(),/aruba-sms-config/);results.serverRenderedContentWithoutJS=true;
const generated=new URL('../../../.vuepress/dist/',import.meta.url);
const html=(await readdir(generated,{recursive:true})).filter(file=>file.endsWith('.html') && file!=='404.html');
results.generatedHttpPages=0;
for(const file of html){const route='/'+file.replace(/index\.html$/, '');const response=await staticPage.goto(root+route);assert.equal(response.status(),200,route);assert.ok((await staticPage.locator('body').innerText()).length>20,route);if(snapshotRoutes.has(route)){assert.equal(await staticPage.locator('.documentation-version a').count()>0,true,route+' no-JS version links');assert.equal(await staticPage.getByRole('combobox',{name:'Documentation version'}).inputValue(),route,route+' no-JS selected version');}results.generatedHttpPages++;}
for(const entry of Object.values(results.mobile)){if(typeof entry!=='object') continue;for(const block of [...(entry.codeBlocks||[]),...(entry.tables||[])]){if(block.scrollWidth>block.width+1)assert.match(block.overflow,/auto|scroll/);}}
assert.deepEqual(errors,[]);results.runtimeErrors=errors;
await writeFile(new URL('../../evidence/browser-checks.json',import.meta.url),JSON.stringify(results,null,2)+'\n');console.log(JSON.stringify({result:'PASS',routes:routes.length,searchTopics:5,mobile:true,noJavaScript:true,errors}));await browser.close();
