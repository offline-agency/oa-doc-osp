const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const origin=process.env.ODPS_PREVIEW_URL || 'http://127.0.0.1:4177';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE});
try {
 const page=await browser.newPage({viewport:{width:1280,height:900}}), errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());
 await page.goto(origin,{waitUntil:'networkidle'});
 const version=page.getByLabel('ODPS version'), content=page.getByLabel('Content to be validated'), validate=page.getByRole('button',{name:'Validate',exact:true});
 assert.deepEqual(await version.locator('option').allTextContents(),['v3.0','v3.1']);
 await version.selectOption('v3.1');
 const yaml='schema: https://example.invalid/odps.yaml\nversion: "3.1"\nproduct:\n  en:\n    name: Synthetic example\n';
 await content.fill(yaml);await validate.click();await page.locator('.alert-success').waitFor();
 await content.fill(yaml.replace('"3.1"','3.1'));await validate.click();await page.locator('.alert-danger').waitFor();assert.match(await page.locator('.alert-danger').innerText(),/\/version.*string/s);
 await content.fill('42');await validate.click();await page.locator('.alert-success').waitFor();
 await content.fill('product: [unterminated');await validate.click();await page.locator('.alert-danger').waitFor();assert.match(await page.locator('.alert-danger').innerText(),/Error:/);
 await page.route('**/schemas/v3.1/odps.yaml',route=>route.fulfill({status:404,body:'Not found'}));
 await content.fill(yaml);await validate.click();await page.getByText(/Failed to load local schema/).waitFor();
 assert.deepEqual(errors,[]);
 const result={verifiedOn:'2026-10-16',release:'1.0.1',commit:'bed32b74b2cf353bfebb134aab9dfb41ac033d81',cases:['actual schema selector v3.0/v3.1','YAML success','numeric version rejected','primitive42 permissiveness confirmed','YAML parse error','schema404 surfaced'],pageErrors:errors,externalNetworkBlocked:true,screenshotsSaved:false};
 await writeFile(new URL('browser-results.json',import.meta.url),JSON.stringify(result,null,2)+'\n');
 console.log('PASS: released ODPS UI success/error/schema404 and documented permissiveness; local static export only.');
} finally {await browser.close();}
