import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCatalog, validateDocument } from './content-rules.mjs';
const current={name:'offline-agency/example',route:'/example/',status:'current-release',selectedTag:'2.0.0',commit:'a'.repeat(40),distribution:{version:'2.0.0',sourceReference:'a'.repeat(40),distReference:'a'.repeat(40)}};
const home={projectTypes:[{title:'Current integrations'}],projects:[{title:'example',link:'/example/',details:'A released integration.',type:'Current integrations'}]};
test('accepts an evidenced release in the current catalog',()=>assert.deepEqual(validateCatalog(home,[current]),[]));
test('rejects the old empty card even alongside valid entries',()=>assert.ok(validateCatalog({...home,projects:[...home.projects,{title:'',link:'',details:'',type:'Current integrations'}]},[current]).length));
test('does not promote retired APIs as current recommendations',()=>assert.ok(validateCatalog(home,[{...current,status:'historical-integration'}]).some(error=>error.includes('historical'))));
test('does not promote an unverified package identity',()=>assert.ok(validateCatalog(home,[{...current,status:'unverified-placeholder'}]).length));
test('requires document provenance to match the release distribution',()=>{
 const page={title:'Example',description:'Release guide',packageVersion:'2.0.0',sourceCommit:'a'.repeat(40)};
 assert.deepEqual(validateDocument(page,current),[]);
 assert.ok(validateDocument({...page,sourceCommit:'b'.repeat(40)},current).length);
 assert.ok(validateDocument(page,{...current,distribution:{...current.distribution,sourceReference:'b'.repeat(40)}}).length);
});
