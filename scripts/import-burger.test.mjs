import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,cpSync,symlinkSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
test('frozen Burger import detects a modified raw input or generated declaration',()=>{
 const directory=mkdtempSync(join(tmpdir(),'oa-burger-import-'));
 try{
  for(const path of ['scripts/import-burger.mjs','scripts/documentation-versions.cjs','maintenance/package-sources.json','maintenance/evidence/burger-import.json','maintenance/fixtures/vue3-burger-menu/import-source','vue3-burger-menu/reference.md','.vuepress/public/assets/vue3-burger-menu']){const destination=join(directory,path);mkdirSync(resolve(destination,'..'),{recursive:true});cpSync(resolve(path),destination,{recursive:true});}
  symlinkSync(resolve('node_modules'),join(directory,'node_modules'),'dir');
  const run=()=>spawnSync(process.execPath,[join(directory,'scripts/import-burger.mjs'),'--check'],{encoding:'utf8'});
  assert.equal(run().status,0);
  const page=join(directory,'vue3-burger-menu/reference.md'),original=readFileSync(page,'utf8');writeFileSync(page,original+'\nInvented event\n');
  assert.match(run().stderr,/Burger import drift/);writeFileSync(page,original);
  writeFileSync(join(directory,'maintenance/fixtures/vue3-burger-menu/import-source/src/components/Menu.vue'),'Changed upstream input');
  assert.match(run().stderr,/pinned input drift/);
 }finally{rmSync(directory,{recursive:true,force:true});}
});
