import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const { snapshotMarkdown, versionContext, validateRelease }=require('./documentation-versions.cjs');
const release={name:'offline-agency/cart',version:'4.0.3',commit:'a'.repeat(40),route:'/cart/4.0.3/',pages:[{source:'cart.md',file:'versioned/cart/4.0.3/index.md',currentRoute:'/cart/',route:'/cart/4.0.3/',title:'Cart'},{source:'cart/storage.md',file:'versioned/cart/4.0.3/storage.md',currentRoute:'/cart/storage/',route:'/cart/4.0.3/storage/',title:'Storage'}]};
const source='---\ntitle: Cart\npackageVersion: "4.0.3"\nsourceCommit: '+release.commit+'\n---\n\n[Storage](/cart/storage/#ttl) [Other](/webex/) [Archive](/cart/legacy/)\n';
test('snapshot rewrites known package routes and preserves fragments and other guides',()=>{const output=snapshotMarkdown(source,release,release.pages[0]);assert.match(output,/permalink: \/cart\/4.0.3\//);assert.ok(output.includes('](/cart/4.0.3/storage/#ttl)'));assert.ok(output.includes('](/webex/)'));assert.ok(output.includes('](/cart/legacy/)'));assert.equal(output,snapshotMarkdown(source,release,release.pages[0]));});
test('snapshot refuses mismatched released source metadata',()=>assert.throws(()=>snapshotMarkdown(source.replace('"4.0.3"','"5.0.0"'),release,release.pages[0]),/provenance/));
test('selector keeps the matching page and falls back when an older version lacks it',()=>{const older={...release,version:'3.0.0',route:'/cart/3.0.0/',pages:[{...release.pages[0],route:'/cart/3.0.0/'}]};const sources=[{name:release.name,selectedTag:'4.0.3'}];const context=versionContext('/cart/4.0.3/storage/',[release,older],sources);assert.equal(context.selected,'/cart/4.0.3/storage/');assert.equal(context.options[0].route,'/cart/storage/');assert.equal(context.options[1].route,'/cart/4.0.3/storage/');assert.equal(context.options[2].route,'/cart/3.0.0/');});
test('unversioned and unrelated pages receive the right context',()=>{assert.equal(versionContext('/cart/',[release],[{name:release.name,selectedTag:'4.0.3'}]).selected,'/cart/');assert.equal(versionContext('/moneta/',[release],[]),null);});
test('release inventory rejects duplicate routes and incorrect package version roots',()=>{assert.deepEqual(validateRelease(release),[]);assert.ok(validateRelease({...release,pages:[...release.pages,release.pages[0]]}).length);assert.ok(validateRelease({...release,route:'/cart/5.0.0/'}).length);});
test('drift check rejects stale current snapshots but preserves an older release after promotion',()=>{const {validateSnapshots}=require('./documentation-versions.cjs');const one={...release,pages:[release.pages[0]]};const files={'cart.md':source,[one.pages[0].file]:snapshotMarkdown(source,one,one.pages[0])};const read=file=>{if(!(file in files))throw new Error('missing');return files[file];};const sources=[{name:one.name,selectedTag:one.version,commit:one.commit}];assert.deepEqual(validateSnapshots([one],sources,read),[]);files['cart.md']+='Changed current documentation.\n';assert.ok(validateSnapshots([one],sources,read).some(error=>error.includes('Stale snapshot')));assert.deepEqual(validateSnapshots([one],[],read),[]);});
test('drift check detects a newly authored guide missing from the current version inventory',()=>{const {validateSnapshots}=require('./documentation-versions.cjs');const one={...release,pages:[release.pages[0]]};const read=file=>file==='cart.md'?source:snapshotMarkdown(source,one,one.pages[0]);const errors=validateSnapshots([one],[{name:one.name,selectedTag:one.version,commit:one.commit}],read,{[one.name]:['cart.md','cart/new-guide.md']});assert.ok(errors.some(error=>error.includes('Missing current snapshot page: cart/new-guide.md')));});
test('historical pages removed from current docs link back to the current landing page',()=>{const newer={...release,version:'5.0.0',route:'/cart/5.0.0/',pages:[{...release.pages[0],route:'/cart/5.0.0/'}]};const context=versionContext('/cart/4.0.3/storage/',[release,newer],[{name:release.name,selectedTag:'5.0.0'}]);assert.equal(context.currentRoute,'/cart/');assert.equal(context.options[0].route,'/cart/');});
test('release routes support an underscore repository name and a real v-prefixed tag',()=>{
 const root='/pgr_dmmsy/v0.1.0/';
 const sql={...release,name:'offline-agency/pgr_dmmsy',version:'v0.1.0',route:root,pages:[{source:'pgr_dmmsy.md',file:'versioned/pgr_dmmsy/v0.1.0/index.md',currentRoute:'/pgr_dmmsy/',route:root,title:'pgr_dmmsy'}]};
 assert.deepEqual(validateRelease(sql),[]);
 assert.ok(validateRelease({...sql,name:'offline-agency/../pgr_dmmsy'}).length);
});

test('frozen patch archives are not duplicate major choices on current pages',()=>{
 const current={name:'offline-agency/cart',version:'4.1.0',documentationKey:'v4',commit:'b'.repeat(40),route:'/cart/v4/',pages:[{currentRoute:'/cart/',route:'/cart/v4/',title:'Overview'}]};
 const archive={...current,version:'4.0.3',documentationKey:undefined,commit:'a'.repeat(40),route:'/cart/4.0.3/',archive:true,pages:[{currentRoute:'/cart/',route:'/cart/4.0.3/',title:'Overview'}]};
 const sources=[{name:current.name,selectedTag:'4.1.0',documentation:{strategy:'compatibility'}}];
 const active=versionContext('/cart/v4/',[archive,current],sources);assert.deepEqual(active.options.map(option=>option.route),['/cart/v4/']);
 const historical=versionContext('/cart/4.0.3/',[archive,current],sources);assert.equal(historical.archive,true);assert.ok(historical.options.some(option=>option.label==='Archived 4.0.3'));assert.ok(historical.options.some(option=>option.route==='/cart/v4/'));
});

test('version switching follows a deliberately renamed equivalent topic',()=>{
 const old={...release,archive:true,pages:[...release.pages,{source:'cart/quick-start.md',file:'versioned/cart/4.0.3/quick-start.md',currentRoute:'/cart/quick-start/',route:'/cart/4.0.3/quick-start/',title:'Quick start'}]};
 const current={...release,documentationKey:'v4',version:'4.1.0',route:'/cart/v4/',pages:[{currentRoute:'/cart/',route:'/cart/v4/',title:'Overview'},{currentRoute:'/cart/usage/',route:'/cart/v4/usage/',title:'Usage'}]};
 const context=versionContext('/cart/4.0.3/quick-start/',[old,current],[{name:release.name,route:'/cart/',selectedTag:'4.1.0',documentation:{strategy:'compatibility',topicAliases:{'quick-start':'usage'}}}]);
 assert.ok(context.options.some(option=>option.route==='/cart/v4/usage/' && !option.missingTopic));
});
