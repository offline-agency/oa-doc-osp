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
