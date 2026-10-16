import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkSite } from './check-site.mjs';

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'cart-site-check-'));
  await mkdir(join(root, 'laravel-cart'), { recursive: true });
  await writeFile(join(root, 'index.html'), '<html><head><link rel="canonical" href="https://docs.offlineagency.com/"></head><body><a href="/laravel-cart/#vat">Cart</a><img src="/logo.svg"></body></html>');
  await writeFile(join(root, 'logo.svg'), '<svg/>');
  await writeFile(join(root, 'laravel-cart/index.html'), '<html><head><link rel="canonical" href="https://docs.offlineagency.com/laravel-cart/"></head><body><h1>Cart</h1><h2 id="vat">VAT</h2><a href="../">Home</a></body></html>');
  return root;
}
test('checks real static routes, assets and fragments', async () => {
  assert.deepEqual(await checkSite(await fixture()), []);
});
test('rejects a broken fragment rather than accepting a valid page alone', async () => {
  const root = await fixture();
  await writeFile(join(root, 'index.html'), '<a href="/laravel-cart/#missing">Broken</a>');
  assert.ok((await checkSite(root)).some(error => error.includes('#missing')));
});
test('rejects a missing static asset', async () => {
  const root = await fixture();
  await writeFile(join(root, 'index.html'), '<img src="/missing.png">');
  assert.ok((await checkSite(root)).some(error => error.includes('missing.png')));
});
test('rejects canonical URLs that collapse a historical page into current docs', async () => {
  const root = await fixture();
  await writeFile(join(root, 'laravel-cart/index.html'), '<h1 id="vat">Cart</h1><link rel="canonical" href="https://docs.offlineagency.com/">');
  assert.ok((await checkSite(root)).some(error => error.includes('canonical')));
});
test('decodes escaped attributes and percent-encoded fragments', async () => {
  const root = await fixture();
  await writeFile(join(root, 'index.html'), '<link rel="canonical" href="https://docs.offlineagency.com/"><a href="/laravel-cart/?a=1&amp;b=2#%76at">Cart</a>');
  assert.deepEqual(await checkSite(root), []);
});
