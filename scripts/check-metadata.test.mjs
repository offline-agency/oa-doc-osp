import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkPage, checkMetadata } from './check-metadata.mjs';
import { headTitle, breadcrumbs, baseTitle, jsonLd } from './site-metadata.mjs';
import { llmsTxt } from './site-publication.mjs';

const origin = 'https://docs.offlineagency.com';
function page({ route = '/guide/', title = 'Guide | OFFLINE Agency', canonical = origin + route, lang = 'en', ogUrl = canonical, h1 = 'Guide', extra = '' } = {}) {
  const graph = { '@context': 'https://schema.org', '@graph': [{ '@type': 'Organization', '@id': `${origin}/#organization` }, { '@type': 'WebPage', url: canonical }] };
  return `<html lang="${lang}"><head><title>${title}</title><meta name="description" content="A guide."><link rel="canonical" href="${canonical}">`
    + `<meta property="og:title" content="t"><meta property="og:description" content="d"><meta property="og:url" content="${ogUrl}"><meta property="og:image" content="${origin}/og.png"><meta property="og:image:alt" content="a"><meta name="twitter:card" content="summary_large_image">`
    + `<script type="application/ld+json">${JSON.stringify(graph)}</script></head><body><h1>${h1}</h1>${extra}</body></html>`;
}
const policy = route => ({ canonical: origin + route, robots: 'index, follow' });

test('accepts a complete page', () => assert.deepEqual(checkPage('/guide/', page(), policy('/guide/')), []));
test('rejects a canonical that points elsewhere', () => {
  assert.ok(checkPage('/guide/', page({ canonical: `${origin}/` }), policy('/guide/')).some(error => error.includes('canonical')));
});
test('rejects the audited lang="English" value', () => {
  assert.ok(checkPage('/guide/', page({ lang: 'English' }), policy('/guide/')).some(error => error.includes('lang')));
});
test('rejects og:url that differs from canonical', () => {
  assert.ok(checkPage('/guide/', page({ ogUrl: `${origin}/other/` }), policy('/guide/')).some(error => error.includes('og:url')));
});
test('rejects empty headings and a second h1', () => {
  const errors = checkPage('/guide/', page({ extra: '<h2></h2><h1>Again</h1>' }), policy('/guide/'));
  assert.ok(errors.some(error => error.includes('empty h2')));
  assert.ok(errors.some(error => error.includes('one h1')));
});
test('rejects rating claims in structured data', () => {
  const html = page().replace('"@type":"WebPage"', '"@type":"WebPage","aggregateRating":{"ratingValue":5}');
  assert.ok(checkPage('/guide/', html, policy('/guide/')).some(error => error.includes('ratings')));
});
test('rejects duplicate titles across indexable pages but ignores noindex pages', async () => {
  const root = await mkdtemp(join(tmpdir(), 'metadata-check-'));
  for (const route of ['a', 'b', 'c']) { await mkdir(join(root, route)); await writeFile(join(root, route, 'index.html'), page({ route: `/${route}/`, title: 'Same | OFFLINE Agency' })); }
  const policies = { '/a/': policy('/a/'), '/b/': policy('/b/'), '/c/': { canonical: `${origin}/c/`, robots: 'noindex, follow' } };
  const errors = await checkMetadata(root, policies);
  assert.equal(errors.filter(error => error.startsWith('Duplicate title')).length, 1);
  assert.ok(!errors.some(error => error.includes('/c/')));
});

const releases = [{ name: 'offline-agency/laravel-cart', version: '4.1.0', route: '/laravel-cart/v4/', pages: [{ route: '/laravel-cart/v4/', title: 'Laravel Cart v4 — v4 · 4.1.0' }, { route: '/laravel-cart/v4/coupons/', title: 'Coupons — v4 · 4.1.0' }] },
  { name: 'offline-agency/laravel-cart', version: '4.0.3', route: '/laravel-cart/4.0.3/', pages: [{ route: '/laravel-cart/4.0.3/', title: 'Laravel Cart — stable 4.0.3' }, { route: '/laravel-cart/4.0.3/upgrading/', title: 'Upgrade guide — 4.0.3' }] }];
const current = { snapshot: true, key: 'v4', archive: false }, archive = { snapshot: true, key: '4.0.3', archive: true };
const sources = [{ name: 'offline-agency/laravel-cart', catalog: { seoTitle: 'Laravel Cart v4: VAT, coupons and persistent carts' } }];
test('titles name the package line and never repeat the site suffix', () => {
  assert.equal(headTitle({ route: '/laravel-cart/v4/', title: 'Laravel Cart v4 — v4 · 4.1.0' }, current, releases, sources), 'Laravel Cart v4: VAT, coupons and persistent carts | OFFLINE Agency');
  assert.equal(headTitle({ route: '/laravel-cart/v4/coupons/', title: 'Coupons — v4 · 4.1.0' }, current, releases, sources), 'Coupons — Laravel Cart v4 | OFFLINE Agency');
  assert.equal(headTitle({ route: '/laravel-cart/4.0.3/', title: 'Archived 4.0.3 — Laravel Cart — stable 4.0.3' }, archive, releases, sources), 'Laravel Cart 4.0.3 archive documentation | OFFLINE Agency');
  assert.equal(headTitle({ route: '/x/', title: 'Page', frontmatter: { seoTitle: 'Custom' } }, null, releases), 'Custom | OFFLINE Agency');
});
test('breadcrumbs follow the package line', () => {
  assert.deepEqual(breadcrumbs({ route: '/laravel-cart/4.0.3/upgrading/', title: 'Upgrade guide — 4.0.3' }, archive, releases).map(item => item.name), ['Docs', 'Laravel Cart 4.0.3 archive', 'Upgrade guide']);
  assert.deepEqual(breadcrumbs({ route: '/' }, null, releases), []);
});
test('version suffixes are stripped from base titles', () => {
  assert.equal(baseTitle('pgr_dmmsy — v0.1 · v0.1.0'), 'pgr_dmmsy');
  assert.equal(baseTitle('Archived 4.0.3 — Upgrade guide — 4.0.3'), 'Upgrade guide');
});
test('JSON-LD serialization cannot close its script element', () => {
  assert.ok(!jsonLd({ name: '</script><script>alert(1)</script>' }).includes('</script>'));
});
test('llms.txt groups pages by package line', () => {
  const text = llmsTxt([{ title: 'Home', url: `${origin}/` }, { title: 'Coupons', url: `${origin}/laravel-cart/v4/coupons/`, package: 'offline-agency/laravel-cart', documentationKey: 'v4', status: 'stable' }]);
  assert.match(text, /^# OFFLINE Agency/);
  assert.match(text, /## offline-agency\/laravel-cart v4\n\n- \[Coupons\]/);
});
