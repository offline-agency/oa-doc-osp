import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, copyFileSync, symlinkSync, writeFileSync, readFileSync, unlinkSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync, spawnSync } from 'node:child_process';

test('CLI promotion preserves older pages after their current counterpart is removed',()=>{
  const directory=mkdtempSync(join(tmpdir(),'oa-doc-versions-'));
  try {
    mkdirSync(join(directory,'scripts'));mkdirSync(join(directory,'maintenance'));mkdirSync(join(directory,'cart'));
    for(const file of ['version-docs.mjs','documentation-versions.cjs'])copyFileSync(new URL(file,import.meta.url),join(directory,'scripts',file));
    symlinkSync(resolve('node_modules'),join(directory,'node_modules'),'dir');
    const manifest=join(directory,'maintenance/package-sources.json');
    const author=(version,commit)=>`---\ntitle: Example\npackageVersion: "${version}"\nsourceCommit: ${commit}\n---\n\n# Example ${version}\n`;
    const setRelease=(version,commit)=>writeFileSync(manifest,JSON.stringify({packages:[{name:'offline-agency/cart',docsPage:'cart.md',route:'/cart/',selectedTag:version,commit,repository:'https://github.com/offline-agency/cart',verifiedOn:'2026-10-16',composerRequirements:{php:'^8.4'},distribution:{version,sourceReference:commit,distReference:commit}}]}));
    const run=(...args)=>execFileSync(process.execPath,[join(directory,'scripts/version-docs.mjs'),...args],{cwd:directory,encoding:'utf8'});
    setRelease('1.0.0','a'.repeat(40));
    writeFileSync(join(directory,'cart.md'),author('1.0.0','a'.repeat(40)));
    writeFileSync(join(directory,'cart/removed.md'),author('1.0.0','a'.repeat(40)));
    run('--package','cart');
    const oldFile=join(directory,'versioned/cart/1.0.0/removed.md');
    const oldContent=readFileSync(oldFile,'utf8');
    const refused=spawnSync(process.execPath,[join(directory,'scripts/version-docs.mjs'),'--package','cart'],{cwd:directory,encoding:'utf8'});
    assert.equal(refused.status,1);assert.match(refused.stderr,/already exists/);
    setRelease('2.0.0','b'.repeat(40));
    writeFileSync(join(directory,'cart.md'),author('2.0.0','b'.repeat(40)));
    unlinkSync(join(directory,'cart/removed.md'));
    run('--package','cart');
    run('--check');
    assert.equal(readFileSync(oldFile,'utf8'),oldContent);
    const versions=JSON.parse(readFileSync(join(directory,'maintenance/documentation-versions.json'),'utf8'));
    assert.deepEqual(versions.releases.map(release=>release.version),['1.0.0','2.0.0']);
    assert.match(readFileSync(join(directory,'versioned/cart/2.0.0/index.md'),'utf8'),/# Example 2.0.0/);
  } finally {rmSync(directory,{recursive:true,force:true});}
});

test('compatibility refresh keeps one minor/patch tree and freezes previous majors',()=>{
 const directory=mkdtempSync(join(tmpdir(),'oa-doc-lines-'));
 try{
  mkdirSync(join(directory,'scripts'));mkdirSync(join(directory,'maintenance'));
  for(const file of ['version-docs.mjs','documentation-versions.cjs'])copyFileSync(new URL(file,import.meta.url),join(directory,'scripts',file));
  symlinkSync(resolve('node_modules'),join(directory,'node_modules'),'dir');
  const set=(version,character)=>{
   const commit=character.repeat(40);
   writeFileSync(join(directory,'maintenance/package-sources.json'),JSON.stringify({packages:[{name:'offline-agency/example',docsPage:'example.md',route:'/example/',selectedTag:version,commit,repository:'https://github.com/offline-agency/example',verifiedOn:'2026-10-16',documentation:{strategy:'compatibility',supportStatus:'Support status not documented.'},distribution:{version,sourceReference:commit,distReference:commit}}]}));
   writeFileSync(join(directory,'example.md'),`---\ntitle: Example\npackageVersion: ${version}\nsourceCommit: ${commit}\n---\n# Release ${version}\n`);
  };
  const run=(...args)=>execFileSync(process.execPath,[join(directory,'scripts/version-docs.mjs'),'--package','example',...args],{cwd:directory,encoding:'utf8'});
  set('1.0.0','a');run();const frozen=readFileSync(join(directory,'versioned/example/v1/index.md'),'utf8');
  set('2.0.0','b');
  mkdirSync(join(directory,'example'));writeFileSync(join(directory,'example/removed.md'),readFileSync(join(directory,'example.md')));run();
  unlinkSync(join(directory,'example/removed.md'));set('2.3.1','c');run('--refresh');run('--check');
  const registry=JSON.parse(readFileSync(join(directory,'maintenance/documentation-versions.json')));
  assert.deepEqual(registry.releases.map(item=>[item.documentationKey,item.version]),[['v1','1.0.0'],['v2','2.3.1']]);
  assert.equal(readFileSync(join(directory,'versioned/example/v1/index.md'),'utf8'),frozen);
  for(const route of ['/example/removed/','/example/v2/removed/'])assert.match(registry.redirects.find(item=>item.route===route).target,/^\/example\/v2\/\?missing-topic=/);
  assert.match(readFileSync(join(directory,'versioned/example/v2/index.md'),'utf8'),/# Release 2.3.1/);
  writeFileSync(join(directory,'example/removed.md'),readFileSync(join(directory,'example.md')));run('--refresh');run('--check');
  const restored=JSON.parse(readFileSync(join(directory,'maintenance/documentation-versions.json')));
  assert.ok(!restored.redirects.some(item=>item.route==='/example/v2/removed/'));
  assert.equal(restored.redirects.find(item=>item.route==='/example/removed/').target,'/example/v2/removed/');
  const oldTopic=readFileSync(join(directory,'versioned/example/v2/removed.md'),'utf8');
  unlinkSync(join(directory,'example/removed.md'));set('3.0.0','d');run();run('--check');
  const nextMajor=JSON.parse(readFileSync(join(directory,'maintenance/documentation-versions.json')));
  assert.match(nextMajor.redirects.find(item=>item.route==='/example/removed/').target,/^\/example\/v3\/\?missing-topic=/);
  assert.equal(readFileSync(join(directory,'versioned/example/v2/removed.md'),'utf8'),oldTopic);
 }finally{rmSync(directory,{recursive:true,force:true});}
});
