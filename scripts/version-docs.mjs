import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url), matter=require('gray-matter');
const {snapshotMarkdown,validateRelease,validateSnapshots,documentationKey,releaseKey,sourceVersion}=require('./documentation-versions.cjs');
const root=resolve(import.meta.dirname,'..');
const read=file=>readFileSync(resolve(root,file),'utf8');
const sources=JSON.parse(read('maintenance/package-sources.json')).packages;
const manifest='maintenance/documentation-versions.json';
const registry=existsSync(resolve(root,manifest)) ? JSON.parse(read(manifest)) : {schemaVersion:1,releases:[]};
const args=process.argv.slice(2), supported=new Set(['--check','--refresh','--package']);
let filter;
for(let i=0;i<args.length;i++){
 if(!supported.has(args[i])) throw new Error(`Unknown option: ${args[i]}`);
 if(args[i]==='--package'){filter=args[++i];if(!filter || filter.startsWith('--')) throw new Error('--package requires a package name');}
}
function sourceFiles(source){
 const slug=source.name.split('/')[1], files=[source.docsPage];
 if(existsSync(resolve(root,slug)))files.push(...readdirSync(resolve(root,slug),{recursive:true}).filter(file=>file.endsWith('.md')).map(file=>`${slug}/${file}`).sort());
 return files;
}
if(args.includes('--check')){
 const currentPages=Object.fromEntries(sources.filter(source=>(source.selectedTag || source.documentation?.strategy==='development') && source.commit).map(source=>[source.name,sourceFiles(source).filter(file=>file===source.docsPage || matter(read(file)).data.packageVersion || matter(read(file)).data.sourceCommit===source.commit)]));
 const errors=validateSnapshots(registry.releases,sources,read,currentPages);
 if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
 else console.log(`Documentation versions: ${registry.releases.length} releases, ${registry.releases.reduce((sum,item)=>sum+item.pages.length,0)} snapshot pages; provenance and current content match.`);
}else{
 const selected=sources.filter(source=>(source.selectedTag || source.documentation?.strategy==='development') && source.commit && (!filter || source.name===filter || source.name.split('/')[1]===filter));
 if(!selected.length) throw new Error('No verified package matches the requested name');
 for(const source of selected){
  const slug=source.name.split('/')[1], version=sourceVersion(source), strategy=source.documentation?.strategy || 'exact';
  const key=documentationKey(source.selectedTag,strategy);
  const existing=registry.releases.find(release=>release.name===source.name && releaseKey(release)===key);
  const migrations=registry.releases.filter(release=>release.name===source.name && !release.archive && strategy==='compatibility' && !release.documentationKey && documentationKey(release.version,'compatibility')===key);
  const previous=[...(existing?[existing]:[]),...migrations];
  if(existing && !args.includes('--refresh')) throw new Error(`${slug} ${version} already exists; use --refresh for documentation corrections`);
  if(existing && existing.version===version && version!=='next' && existing.commit!==source.commit) throw new Error('A version cannot be reassigned to a different package commit');
  const files=sourceFiles(source);
  const documents=files.map(file=>({file,data:matter(read(file)).data}));
  for(const {file,data} of documents)if(data.packageVersion && (String(data.packageVersion)!==version || data.sourceCommit!==source.commit))throw new Error(`Version provenance mismatch: ${file}`);
  const pages=documents.filter(item=>(version==='next' ? !item.data.packageVersion : String(item.data.packageVersion)===version) && item.data.sourceCommit===source.commit).map(({file,data})=>{
   const currentRoute=file===source.docsPage ? source.route : data.permalink || `/${file.replace(/\.md$/,'')}/`;
   const suffix=currentRoute.slice(source.route.length);
   return {source:file,file:`versioned/${slug}/${key}/${suffix ? suffix.replace(/\/$/,'') : 'index'}.md`,currentRoute,route:`/${slug}/${key}/${suffix}`,title:data.title};
  });
  const release={name:source.name,version,...(strategy!=='exact'?{documentationKey:key,channel:version==='next'?'next':'stable',supportStatus:source.documentation?.supportStatus || 'Support status not documented.'}:{}),commit:source.commit,repository:source.repository,verifiedOn:source.verifiedOn,projectType:source.projectType,composerRequirements:source.composerRequirements,npmRequirements:source.npmRequirements,packageManifest:source.packageManifest,lockfile:source.lockfile,manifestFiles:source.manifestFiles,buildRequirements:source.buildRequirements,releaseAssets:source.releaseAssets,distribution:source.distribution,route:`/${slug}/${key}/`,pages};
  const errors=validateRelease(release);if(errors.length) throw new Error(errors.join('\n'));
  registry.redirects ||= [];
  // A topic may return after having been removed from this compatibility line.
  // Its real snapshot must replace any earlier overview fallback redirect.
  registry.redirects=registry.redirects.filter(item=>!pages.some(page=>page.route===item.route));
  function redirect(route,target) { if(route===target)return; const entry={route,target}; const index=registry.redirects.findIndex(item=>item.route===route);if(index<0)registry.redirects.push(entry);else registry.redirects[index]=entry; }
  if(strategy!=='exact')for(const page of pages)redirect(page.currentRoute,page.route);
  if(strategy!=='exact')for(const older of registry.releases.filter(item=>item.name===source.name))for(const old of older.pages){
    if(!pages.some(page=>page.currentRoute===old.currentRoute))redirect(old.currentRoute,release.route+'?missing-topic='+encodeURIComponent(old.title));
  }
  for(const oldRelease of previous)for(const old of oldRelease.pages){
    const matching=pages.find(page=>page.currentRoute===old.currentRoute);
    if(strategy!=='exact' && !matching)redirect(old.currentRoute,release.route+'?missing-topic='+encodeURIComponent(old.title));
    if(!matching || old.route!==matching.route)redirect(old.route,matching?.route || release.route+'?missing-topic='+encodeURIComponent(old.title));
  }
  for(const [suffix,target] of Object.entries(source.documentation?.topicAliases || {})){
    const page=pages.find(page=>page.currentRoute===source.route+target+'/');
    if(!page)throw new Error('Topic alias target missing: '+target);
    redirect(source.route+suffix+'/',page.route);
  }
  for(const [suffix,anchors] of Object.entries(source.documentation?.anchorTargets || {})){
    const entry=registry.redirects.find(item=>item.route===source.route+(suffix?suffix+'/':''));
    if(!entry)throw new Error('Anchor alias route missing: '+suffix);
    entry.anchors=anchors;
  }
  if(existing && (existing.version!==version || existing.commit!==source.commit))release.pinHistory=[...(existing.pinHistory || []),{version:existing.version,commit:existing.commit,verifiedOn:existing.verifiedOn}];
  else if(existing?.pinHistory)release.pinHistory=existing.pinHistory;
  const snapshots=pages.map(page=>({page,text:snapshotMarkdown(read(page.source),release,page)}));
  for(const {page,text} of snapshots){mkdirSync(dirname(resolve(root,page.file)),{recursive:true});writeFileSync(resolve(root,page.file),text);}
  for(const oldRelease of previous)for(const old of oldRelease.pages)if(!pages.some(page=>page.file===old.file))unlinkSync(resolve(root,old.file));
  registry.releases=registry.releases.filter(item=>!migrations.includes(item));
  if(existing)registry.releases[registry.releases.indexOf(existing)]=release;
  else registry.releases.push(release);
  console.log(`${existing?'Refreshed':'Created'} ${source.name} ${version}: ${pages.length} pages`);
 }
 writeFileSync(resolve(root,manifest),JSON.stringify(registry,null,2)+'\n');
}
