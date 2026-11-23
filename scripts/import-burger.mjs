import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),matter=require('gray-matter');
const root=resolve(import.meta.dirname,'..');
const source=JSON.parse(readFileSync(resolve(root,'maintenance/package-sources.json'))).packages.find(item=>item.name==='offline-agency/vue3-burger-menu');
const fixture='maintenance/fixtures/vue3-burger-menu/import-source',evidence='maintenance/evidence/burger-import.json';
const args=process.argv.slice(2),check=args.includes('--check'),index=args.indexOf('--reference'),reference=index<0?null:args[index+1];
if(args.some((arg,i)=>arg!=='--check' && arg!=='--reference' && i!==index+1) || index>=0&&!reference)throw new Error('Usage: node scripts/import-burger.mjs [--reference CLONE] [--check]');
const hash=value=>createHash('sha256').update(value).digest('hex');
const previous=existsSync(resolve(root,evidence))?JSON.parse(readFileSync(resolve(root,evidence))):null;
const paths=['src/components/Menu.vue','src/components/index.js','LICENSE'];
function output(file,text){const path=resolve(root,file);if(check){if(!existsSync(path)||readFileSync(path,'utf8')!==text)throw new Error('Burger import drift: '+file);}else{mkdirSync(dirname(path),{recursive:true});writeFileSync(path,text);}}
const inputs=paths.map(path=>{
 const body=reference?execFileSync('git',['-C',reference,'show',source.commit+':'+path],{encoding:'utf8'}):readFileSync(resolve(root,fixture,path),'utf8');
 const digest=hash(body);
 if(!reference && (!previous || previous.commit!==source.commit || previous.inputs.find(input=>input.path===path)?.sha256!==digest))throw new Error('Burger pinned input drift: '+path);
 output(fixture+'/'+path,body);return {path,body,sha256:digest};
});
const menu=inputs[0].body,script=menu.match(/<script>([\s\S]*?)<\/script>/)[1];
const start=script.indexOf('props: {'),end=script.indexOf('\n      setup(',start);
if(start<0 || end<0)throw new Error('Review changed component options before importing');
const props=script.slice(start,end).trim().replace(/,$/,'');
const {documentationKey}=require('./documentation-versions.cjs');const key=documentationKey(source.selectedTag,'compatibility');
const events=[...new Set([...script.matchAll(/emit\('([^']+)'/g)].map(match=>match[1]))];
const body=`# Component source reference\n\nGenerated from the exact tagged source. The overview explains behavior and limitations; this reference retains the actual declarations instead of maintaining another API table.\n\n## Default export\n\n\`\`\`js\n${inputs[1].body.trim()}\n\`\`\`\n\n## Shared props\n\n\`\`\`js\n${props}\n\`\`\`\n\n## Emitted events and slot\n\n${events.map(event=>' - `'+event+'` (no payload argument)').join('\n')}\n\nThe shared template contains one default slot. There is no \`update:isOpen\` event. \`onStateChange\` is a declared prop but the shared implementation does not call it.\n\n## Source and attribution\n\n${inputs.map(input=>'- ['+input.path+']('+source.repository+'/blob/'+source.commit+'/'+input.path+')').join('\n')}\n\nThe copied declarations retain their upstream ownership. [MIT license notice](/assets/vue3-burger-menu/${key}/LICENSE.txt).\n`;
const page=matter.stringify(body,{title:'Burger Menu component source reference',description:'Exact component exports, shared props and emitted events extracted from the pinned source.',packageVersion:source.selectedTag,sourceCommit:source.commit});
output('vue3-burger-menu/reference.md',page);
// License is namespaced by documentation line; no runtime Vue 3 code is mounted.
output('.vuepress/public/assets/vue3-burger-menu/'+key+'/LICENSE.txt',inputs[2].body);
output(evidence,JSON.stringify({verifiedOn:source.verifiedOn,repository:source.repository,tag:source.selectedTag,commit:source.commit,inputs:inputs.map(({body,...input})=>input),outputs:[{path:'vue3-burger-menu/reference.md',sha256:hash(page)}]},null,2)+'\n');
console.log((check?'Verified':'Imported')+' Burger source reference and namespaced license.');
