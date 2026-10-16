import test from 'node:test';
import assert from 'node:assert/strict';
import {verifyPinnedReference} from './update-docs.mjs';
const sha='a'.repeat(40);
test('updates reject a moved or missing tag instead of using a moving branch',()=>{
 assert.throws(()=>verifyPinnedReference({selectedTag:'v2.0.0',commit:sha},()=> 'b'.repeat(40)),/mismatch/);
 assert.throws(()=>verifyPinnedReference({selectedTag:'v2.0.0',commit:sha},()=>{throw new Error('missing')}),/never substitute HEAD/);
});
test('registry-only releases require an explicit immutable source mapping; development pins no fake tag',()=>{
 const record={selectedTag:'1.0.0',commit:sha,releaseRef:sha,distribution:{registry:'npm',sourceReference:sha}};
 assert.deepEqual(verifyPinnedReference(record,([,ref])=>{assert.equal(ref,sha+'^{commit}');return sha}),{reference:sha,commit:sha});
 assert.equal(verifyPinnedReference({commit:sha},()=>sha).reference,sha);
 assert.throws(()=>verifyPinnedReference({...record,distribution:undefined},()=>sha),/provenance/);
});
