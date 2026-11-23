import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
const require=createRequire(import.meta.url);
const {documentationKey,selectStableLines}=require('./documentation-versions.cjs');
export function verifyPinnedReference(source,git) {
 const reference=source.releaseRef || source.selectedTag || source.commit;
 if(source.releaseRef && source.releaseRef!==source.selectedTag && source.releaseRef!==source.commit)throw new Error('Only an exact tag or immutable commit is accepted');
 if(source.selectedTag && source.releaseRef===source.commit && source.distribution?.sourceReference!==source.commit)throw new Error('Registry-only provenance is missing or mismatched');
 let commit;
 try{commit=git(['rev-parse',reference+'^{commit}']).trim()}catch{throw new Error(`Pinned reference unavailable: ${reference}; fetch that exact tag/commit, never substitute HEAD`)}
 if(commit!==source.commit)throw new Error(`Pinned tag/SHA mismatch: ${reference}`);
 return {reference,commit};
}
if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const root=resolve(import.meta.dirname,'..'), args=process.argv.slice(2);
 for(let index=0;index<args.length;index++){
  const option=args[index];
  if(['--package','--reference'].includes(option)){if(!args[++index] || args[index].startsWith('--'))throw new Error(`${option} requires a value`);}
  else if(!['--check','--plan','--apply'].includes(option))throw new Error(`Unknown option: ${option}`);
 }
 if(args.includes('--check') && args.length!==1 || args.includes('--plan') && args.includes('--apply'))throw new Error('Use either --check, --plan or --apply');
 const read=file=>readFileSync(resolve(root,file),'utf8');
 const sources=JSON.parse(read('maintenance/package-sources.json')).packages;
 function argument(flag){const index=args.indexOf(flag);return index<0?undefined:args[index+1]}
 if(args.includes('--check')){
  execFileSync(process.execPath,[resolve(root,'scripts/content-history.mjs')],{cwd:root,stdio:'inherit'});
  execFileSync(process.execPath,[resolve(root,'scripts/catalog.mjs'),'--check'],{cwd:root,stdio:'inherit'});
  for(const source of sources.filter(item=>item.documentation?.importer))execFileSync(process.execPath,[resolve(root,source.documentation.importer),'--check'],{cwd:root,stdio:'inherit'});
  console.log('Pinned imports: committed generated content checked without network or reference clones.');
 }else{
  const name=argument('--package'),reference=argument('--reference');
  const source=sources.find(item=>item.name===name || item.name.split('/')[1]===name);
  if(!source || !reference)throw new Error('Use --package NAME --reference /read-only/source-clone [--plan | --apply]');
  const git=parameters=>execFileSync('git',['-C',resolve(reference),...parameters],{encoding:'utf8'});
  const verified=verifyPinnedReference(source,git);
  const tags=git(['tag','--list']).trim().split('\n').filter(Boolean);
  const key=documentationKey(source.selectedTag,source.documentation?.strategy || 'exact');
  const report={name:source.name,repository:source.repository,...verified,version:source.selectedTag || null,documentationKey:key,verifiedOn:source.verifiedOn,sourceFiles:source.sourcePaths.map(file=>({path:file,sha256:createHash('sha256').update(execFileSync('git',['-C',resolve(reference),'show',source.commit+':'+file])).digest('hex')}))};
  if(!args.includes('--apply')){
   console.log(JSON.stringify({...report,candidateLines:selectStableLines(tags.map(version=>({version}))),note:'Review only. Local tags are candidates, not proof of registry publication or support. No pin or content was changed.'},null,2));
  }else{
   if(source.documentation?.importer)execFileSync(process.execPath,[resolve(root,source.documentation.importer),'--reference',resolve(reference)],{cwd:root,stdio:'inherit'});
   execFileSync(process.execPath,[resolve(root,'scripts/version-docs.mjs'),'--package',source.name,'--refresh'],{cwd:root,stdio:'inherit'});
   execFileSync(process.execPath,[resolve(root,'scripts/catalog.mjs')],{cwd:root,stdio:'inherit'});
   execFileSync(process.execPath,[resolve(root,'scripts/content-history.mjs'),'--update'],{cwd:root,stdio:'inherit'});
   const registry=JSON.parse(read('maintenance/documentation-versions.json'));
   const entry=registry.releases.find(item=>item.name===source.name && (item.documentationKey || item.version)===key);
   report.generatedPages=entry.pages.map(page=>({path:page.file,route:page.route,sha256:createHash('sha256').update(read(page.file)).digest('hex')}));
   const file=resolve(root,'maintenance/update-provenance',source.name.split('/')[1],key,(source.selectedTag || source.commit)+'.json');
   mkdirSync(dirname(file),{recursive:true});writeFileSync(file,JSON.stringify(report,null,2)+'\n');
   console.log(`Updated ${source.name} ${key} from verified pin ${source.commit}. Review git diff before publication.`);
  }
 }
}
