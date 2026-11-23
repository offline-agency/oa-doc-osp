import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {parseVersion,compareVersions,documentationKey,selectStableLines}=require('./documentation-versions.cjs');
test('SemVer ordering is numeric, optional-v aware and follows prerelease precedence',()=>{
 const input=['v2.9.0','v2.10.0','2.10.0-rc.2','2.10.0-rc.10','1.0.0','1.0.0-beta'];
 assert.deepEqual(input.sort(compareVersions),['1.0.0-beta','1.0.0','v2.9.0','2.10.0-rc.2','2.10.0-rc.10','v2.10.0']);
 assert.equal(parseVersion('v01.0.0'),null);assert.equal(parseVersion('2.0.0-01'),null);assert.equal(compareVersions('v2.0.0','2.0.0+metadata'),0);
});
test('stable lines use major for1+ and minor for0.x without promoting prereleases',()=>{
 assert.equal(documentationKey('v2.3.0','compatibility'),'v2');assert.equal(documentationKey('v0.1.9','compatibility'),'v0.1');
 const records=['v0.1.0','0.1.4','0.2.0','v1.9.0','v1.10.0','2.0.0-rc.1'].map(version=>({version,commit:'a'.repeat(40)}));
 assert.deepEqual(selectStableLines(records).map(item=>[item.key,item.version]),[['v1','v1.10.0'],['v0.2','0.2.0'],['v0.1','0.1.4']]);
 assert.deepEqual(selectStableLines([{version:'1.0.0-beta'},{version:'2.0.0',published:false}]),[]);
});
test('legacy exact-release routing remains available while source-only explicitly uses next',()=>{
 assert.equal(documentationKey('4.0.3'),'4.0.3');assert.equal(documentationKey(undefined,'development'),'next');
 assert.throws(()=>documentationKey('0.1.0','development'),/development/);
 assert.throws(()=>documentationKey('not-a-release','compatibility'),/version/);
});

test('a prerelease cannot be promoted as the stable compatibility default',()=>{
 assert.throws(()=>documentationKey('3.0.0-rc.1','compatibility'),/Prereleases/);
});
