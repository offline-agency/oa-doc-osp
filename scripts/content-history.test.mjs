import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {updateHistory,checkHistory} from './content-history.mjs';
test('reviewed content dates persist across builds and advance only after real source changes',()=>{
 const root=mkdtempSync(join(tmpdir(),'cart-content-history-'));
 try{
  mkdirSync(join(root,'maintenance'));
  writeFileSync(join(root,'maintenance/package-sources.json'),JSON.stringify({packages:[]}));
  writeFileSync(join(root,'maintenance/documentation-versions.json'),JSON.stringify({releases:[]}));
  writeFileSync(join(root,'README.md'),'---\ntitle: Home\n---\nOriginal content\n');
  assert.equal(updateHistory(root,'2026-10-14')['/'].changedOn,'2026-10-14');
  assert.equal(updateHistory(root,'2026-10-16')['/'].changedOn,'2026-10-14');
  writeFileSync(join(root,'README.md'),'---\ntitle: Home\n---\nReviewed change\n');
  assert.throws(()=>checkHistory(root),/Content history drift/);
  assert.equal(updateHistory(root,'2026-10-16')['/'].changedOn,'2026-10-16');
  assert.equal(checkHistory(root)['/'].changedOn,'2026-10-16');
 }finally{rmSync(root,{recursive:true,force:true});}
});
