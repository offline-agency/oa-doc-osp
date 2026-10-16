const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import assert from 'node:assert/strict';
import { writeFile, readdir } from 'node:fs/promises';
const root=process.env.PREVIEW_URL || 'http://127.0.0.1:4175';
const localOnly=route => new URL(route.request().url()).origin === root ? route.continue() : route.abort();
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
await page.context().route('**/*', localOnly);
page.setDefaultTimeout(15000);page.setDefaultNavigationTimeout(15000);

const errors=[];page.on('pageerror',e=>errors.push(e.message));
const results={verifiedOn:'2026-10-16',desktop:{},mobile:{},screenshotsSaved:false};
await page.goto(root,{waitUntil:'networkidle'});
assert.equal(await page.locator('.project').count(),6);
results.desktop.homeCards=6;
const menu=page.getByRole('button',{name:'Packages',exact:true});
await menu.focus();await menu.press('Enter');assert.equal(await menu.getAttribute('aria-expanded'),'true');
await menu.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');
results.desktop.keyboardDropdown='Enter/Escape passed';
const routes=['/laravel-cart/','/laravel-cart/money-and-tax/','/laravel-cart/legacy/','/laravel-webex/','/laravel-webex/coverage/','/laravel-fatture-in-cloud-v2/','/laravel-aruba-sms/','/laravel-mongo-auto-sync/','/laravel-fatture-in-cloud/','/laravel-moneta-online/'];
for(const route of routes){const response=await page.goto(root+route,{waitUntil:'networkidle'});assert.equal(response.status(),200);await page.reload({waitUntil:'networkidle'});assert.ok((await page.locator('h1').first().innerText()).length); results.desktop[route]={title:await page.title(),h1:await page.locator('h1').first().innerText()};}
await page.goto(root+'/laravel-cart/',{waitUntil:'networkidle'});
const search=page.locator('.search-box input');results.desktop.search={};
for(const topic of ['VAT','wishlist','Webex','Aruba','pagination']){await search.fill(topic);await page.locator('.suggestion').first().waitFor({state:'visible'});results.desktop.search[topic]=await page.locator('.suggestion a').evaluateAll(ns=>ns.map(n=>n.getAttribute('href')));assert.ok(results.desktop.search[topic].length);}
await search.fill('VAT');await page.locator('.suggestion').first().waitFor();await search.press('ArrowDown');const searchTarget=await page.locator('.suggestion.focused a').getAttribute('href');await search.press('Enter');await page.waitForURL(u=>u.pathname+u.hash===searchTarget);results.desktop.keyboardSearch=page.url().replace(root,'');
await page.goto(root+'/laravel-cart/storage/',{waitUntil:'networkidle'});
const selector=page.getByRole('combobox',{name:'Documentation version'});
assert.equal(await selector.inputValue(),'/laravel-cart/storage/');
await selector.selectOption('/laravel-cart/4.0.3/storage/');await page.waitForURL('**/laravel-cart/4.0.3/storage/');
assert.equal(await selector.inputValue(),'/laravel-cart/4.0.3/storage/');
assert.ok((await page.locator('.sidebar a.sidebar-link').evaluateAll(ns=>ns.map(n=>n.getAttribute('href')))).every(href=>href.startsWith('/laravel-cart/4.0.3/')));
await page.reload({waitUntil:'networkidle'});assert.equal(await selector.inputValue(),'/laravel-cart/4.0.3/storage/');
await page.getByRole('link',{name:'Current documentation',exact:true}).click();await page.waitForURL('**/laravel-cart/storage/');
results.desktop.versionSelector='Current and pinned release, matching page, sidebar, direct refresh';
const notFound=await page.goto(root+'/missing-documentation-route/',{waitUntil:'networkidle'});assert.equal(notFound.status(),404);assert.ok(await page.getByRole('link',{name:/home/i}).count());results.desktop.notFound=404;
const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});await mobile.context().route('**/*', localOnly);mobile.on('pageerror',e=>errors.push(e.message));
await mobile.goto(root+'/laravel-cart/money-and-tax/',{waitUntil:'networkidle'});
const toggle=mobile.getByRole('button',{name:'Toggle navigation'});await toggle.focus();await toggle.press('Enter');await mobile.waitForFunction(()=>Math.abs(document.querySelector('.sidebar').getBoundingClientRect().left)<1);assert.equal(await toggle.getAttribute('aria-expanded'),'true');
await toggle.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');await toggle.press('Space');await mobile.waitForFunction(()=>Math.abs(document.querySelector('.sidebar').getBoundingClientRect().left)<1);
await mobile.locator('.sidebar a[href="/laravel-cart/storage/"]').click();await mobile.waitForURL('**/laravel-cart/storage/');assert.equal(await toggle.getAttribute('aria-expanded'),'false');results.mobile.keyboardMenu='Enter, Escape, Space, route closes menu';
for(const route of ['/', '/laravel-webex/coverage/', '/laravel-fatture-in-cloud-v2/','/laravel-cart/money-and-tax/']){
 await mobile.goto(root+route,{waitUntil:'networkidle'});
 const dimensions=await mobile.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));assert.ok(dimensions.document<=dimensions.viewport+1,route+' horizontal page overflow');
 results.mobile[route]={dimensions,codeBlocks:await mobile.locator('pre').evaluateAll(ns=>ns.map(n=>({width:n.clientWidth,scrollWidth:n.scrollWidth,overflow:getComputedStyle(n).overflowX}))),tables:await mobile.locator('table').evaluateAll(ns=>ns.map(n=>({width:n.clientWidth,scrollWidth:n.scrollWidth,overflow:getComputedStyle(n).overflowX})))};
}
await mobile.goto(root+'/laravel-mongo-auto-sync/',{waitUntil:'networkidle'});
const mobileVersion=mobile.getByRole('combobox',{name:'Documentation version'});await mobileVersion.focus();await mobileVersion.press('ArrowDown');await mobileVersion.press('Enter');
await mobile.waitForURL('**/laravel-mongo-auto-sync/3.1.1/');
assert.ok(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));results.mobile.versionSelector='Native keyboard selection to Mongo 3.1.1, no horizontal page overflow';
const nojs=await browser.newContext({javaScriptEnabled:false});await nojs.route('**/*',localOnly);const staticPage=await nojs.newPage();await staticPage.goto(root+'/laravel-aruba-sms/');assert.match(await staticPage.locator('body').innerText(),/aruba-sms-config/);results.serverRenderedContentWithoutJS=true;
const generated=new URL('../../../.vuepress/dist/',import.meta.url);
const html=(await readdir(generated,{recursive:true})).filter(file=>file.endsWith('.html') && file!=='404.html');
results.generatedHttpPages=0;
for(const file of html){const route='/'+file.replace(/index\.html$/, '');const response=await staticPage.goto(root+route);assert.equal(response.status(),200,route);assert.ok((await staticPage.locator('body').innerText()).length>20,route);if(file.includes('/4.0.3/') || file.includes('/2.0.0/') || file.includes('/3.0.1/') || file.includes('/1.1.0/') || file.includes('/3.1.1/') || file.includes('/2.2.8/')){assert.equal(await staticPage.getByRole('link',{name:'Current documentation',exact:true}).count(),1,route+' no-JS current version link');assert.equal(await staticPage.getByRole('combobox',{name:'Documentation version'}).inputValue(),route,route+' no-JS selected version');}results.generatedHttpPages++;}
for(const entry of Object.values(results.mobile)){if(typeof entry!=='object') continue;for(const block of [...(entry.codeBlocks||[]),...(entry.tables||[])]){if(block.scrollWidth>block.width+1)assert.match(block.overflow,/auto|scroll/);}}
assert.deepEqual(errors,[]);results.runtimeErrors=errors;
await writeFile(new URL('../../evidence/browser-checks.json',import.meta.url),JSON.stringify(results,null,2)+'\n');console.log(JSON.stringify({result:'PASS',routes:routes.length,searchTopics:5,mobile:true,noJavaScript:true,errors}));await browser.close();
