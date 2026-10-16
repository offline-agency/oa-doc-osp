import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCatalog, validateDocument } from './content-rules.mjs';
const current={name:'offline-agency/example',route:'/example/',status:'current-release',selectedTag:'2.0.0',commit:'a'.repeat(40),distribution:{version:'2.0.0',sourceReference:'a'.repeat(40),distReference:'a'.repeat(40)}};
const home={projectTypes:[{title:'Current projects'}],projects:[{title:'example',link:'/example/',details:'A released integration.',type:'Current projects'}]};
test('accepts an evidenced release in the current catalog',()=>assert.deepEqual(validateCatalog(home,[current]),[]));
test('rejects the old empty card even alongside valid entries',()=>assert.ok(validateCatalog({...home,projects:[...home.projects,{title:'',link:'',details:'',type:'Current projects'}]},[current]).length));
test('does not promote retired APIs as current recommendations',()=>assert.ok(validateCatalog(home,[{...current,status:'historical-integration'}]).some(error=>error.includes('historical'))));
test('does not promote an unverified package identity',()=>assert.ok(validateCatalog(home,[{...current,status:'unverified-placeholder'}]).length));
test('requires document provenance to match the release distribution',()=>{
 const page={title:'Example',description:'Release guide',packageVersion:'2.0.0',sourceCommit:'a'.repeat(40)};
 assert.deepEqual(validateDocument(page,current),[]);
 assert.ok(validateDocument({...page,sourceCommit:'b'.repeat(40)},current).length);
 assert.ok(validateDocument(page,{...current,distribution:{...current.distribution,sourceReference:'b'.repeat(40)}}).length);
});

test('source-only documentation requires its pinned commit and cannot claim a release',()=>{
 const reference={name:'offline-agency/source-project',status:'source-reference',commit:'b'.repeat(40)};
 const page={title:'Source reference',description:'Unreleased source guide',sourceCommit:reference.commit};
 assert.deepEqual(validateDocument(page,reference),[]);
 assert.ok(validateDocument({...page,packageVersion:'0.1.0'},reference).length);
 assert.ok(validateDocument({...page,sourceCommit:'c'.repeat(40)},reference).length);
});
test('verified source projects have a catalog group separate from published releases',()=>{
 const reference={...current,status:'source-reference',selectedTag:undefined};
 const sourceHome={projectTypes:[{title:'Source references'}],projects:[{...home.projects[0],type:'Source references'}]};
 assert.deepEqual(validateCatalog(sourceHome,[reference]),[]);
 assert.ok(validateCatalog(home,[reference]).length);
});
