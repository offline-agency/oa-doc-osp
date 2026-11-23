import test from 'node:test';
import assert from 'node:assert/strict';
import {pagePolicy,withSeo,redirectHtml,sitemap} from './site-publication.mjs';
test('real version self-canonicalizes while next is crawlable but noindex and omitted from sitemap',()=>{
 const stable=pagePolicy('/spid/v2/',{snapshot:true,channel:'stable'}), next=pagePolicy('/card/next/',{snapshot:true,channel:'next'});
 assert.equal(stable.canonical,'https://docs.offlineagency.com/spid/v2/');assert.equal(next.robots,'noindex, follow');
 const xml=sitemap({'/spid/v2/':stable,'/card/next/':next});assert.ok(xml.includes(stable.canonical));assert.ok(!xml.includes('/next/'));
});
test('current aliases canonicalize only to their mapped identical version; redirects retain anchor fallbacks',()=>{
 const html=redirectHtml({route:'/spid/v2.3.0/',target:'/spid/v2/',anchors:{configuration:'/spid/v2/#configuration'}});
 assert.ok(html.includes('http-equiv="refresh"'));assert.ok(html.includes('id="configuration"'));assert.ok(html.includes('href="/spid/v2/#configuration"'));assert.ok(html.includes('noindex, follow'));assert.ok(html.includes('data.anchors[key]'));
 const policy=pagePolicy('/spid/',{snapshot:false,pinnedRoute:'/spid/v2/'});assert.equal(policy.canonical,'https://docs.offlineagency.com/spid/v2/');
 assert.equal(pagePolicy('/cart/legacy/',null).canonical,'https://docs.offlineagency.com/cart/legacy/');
});
test('SEO transform writes exactly one canonical and robots tag',()=>{
 const result=withSeo('<html><head><link rel="canonical" href="https://old.invalid"><meta name="robots" content="index"></head></html>',pagePolicy('/pgr/v0.1/',null));
 assert.equal((result.match(/rel="canonical"/g)||[]).length,1);assert.equal((result.match(/name="robots"/g)||[]).length,1);
});

test('sitemap lastmod comes only from recorded content dates, never the build clock',()=>{
 const policy=pagePolicy('/cart/v4/',null);
 const without=sitemap({'/cart/v4/':policy});assert.ok(!without.includes('lastmod'));
 const dated=sitemap({'/cart/v4/':policy},{'/cart/v4/':{changedOn:'2026-10-15'}});
 assert.ok(dated.includes('<lastmod>2026-10-15</lastmod>'));assert.ok(!dated.includes(new Date().toISOString()));
});
