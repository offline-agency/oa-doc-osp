import test from 'node:test';
import assert from 'node:assert/strict';
import {rankSearchPages} from '../.vuepress/theme/util/search-rank.js';
test('search prioritizes current stable, retains historical/next and excludes canonical aliases',()=>{
 const pages=[{path:'/next/',documentationSearchRank:3},{path:'/old/',documentationSearchRank:1},{path:'/current/',documentationSearchRank:0},{path:'/alias/',documentationVersion:{snapshot:false},documentationSearchRank:0},{path:'/hidden/',frontmatter:{search:false},documentationSearchRank:0}];
 assert.deepEqual(rankSearchPages(pages).map(page=>page.path),['/current/','/old/','/next/']);assert.equal(pages[0].path,'/next/');
});
