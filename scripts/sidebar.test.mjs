import test from 'node:test';
import assert from 'node:assert/strict';
import { normalize, resolvePage, resolveSidebarItems } from '../.vuepress/theme/util/index.js';
const pages = [{ regularPath: '/laravel-cart.html', path: '/laravel-cart/', title: 'Cart', headers: [] }];
test('clean sidebar links resolve the original source page', () => {
  assert.equal(resolvePage(pages, '/laravel-cart/').title, 'Cart');
});
test('automatic fallback works alongside per-package sidebars', () => {
  const page = {path:'/other/',regularPath:'/other.html',title:'Other',frontmatter:{},headers:[]};
  const result = resolveSidebarItems(page, page.regularPath, {pages,themeConfig:{sidebar:{'/laravel-cart/':['/laravel-cart/'],'/':'auto'}}}, '/');
  assert.equal(result[0].title,'Other');
});
test('package landing uses its clean URL to choose package navigation', () => {
  const page = {...pages[0],frontmatter:{}};
  const result = resolveSidebarItems(page, page.regularPath, {pages,themeConfig:{sidebar:{'/laravel-cart/':['/laravel-cart/'],'/':'auto'}}}, '/');
  assert.equal(result[0].path,'/laravel-cart/');
});
test('version permalinks resolve even when their source directory has a different URL',()=>{
  const snapshot={regularPath:'/versioned/cart/4.0.3/',path:'/cart/4.0.3/',title:'Cart 4.0.3',headers:[]};
  assert.equal(resolvePage([snapshot],'/cart/4.0.3/').path,'/cart/4.0.3/');
});
