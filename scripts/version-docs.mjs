import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url), matter=require('gray-matter');
const {snapshotMarkdown,validateRelease,validateSnapshots}=require('./documentation-versions.cjs');
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
 const currentPages=Object.fromEntries(sources.filter(source=>source.selectedTag && source.commit).map(source=>[source.name,sourceFiles(source).filter(file=>file===source.docsPage || matter(read(file)).data.packageVersion)]));
 const errors=validateSnapshots(registry.releases,sources,read,currentPages);
 if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
 else console.log(`Documentation versions: ${registry.releases.length} releases, ${registry.releases.reduce((sum,item)=>sum+item.pages.length,0)} snapshot pages; provenance and current content match.`);
}else{
 const selected=sources.filter(source=>source.selectedTag && source.commit && (!filter || source.name===filter || source.name.split('/')[1]===filter));
 if(!selected.length) throw new Error('No verified package matches the requested name');
 for(const source of selected){
  const slug=source.name.split('/')[1], version=source.selectedTag;
  const existing=registry.releases.find(release=>release.name===source.name && release.version===version);
  if(existing && !args.includes('--refresh')) throw new Error(`${slug} ${version} already exists; use --refresh for documentation corrections`);
  if(existing && existing.commit!==source.commit) throw new Error('A version cannot be reassigned to a different package commit');
  const files=sourceFiles(source);
  const documents=files.map(file=>({file,data:matter(read(file)).data}));
  for(const {file,data} of documents)if(data.packageVersion && (String(data.packageVersion)!==version || data.sourceCommit!==source.commit))throw new Error(`Version provenance mismatch: ${file}`);
  const pages=documents.filter(item=>String(item.data.packageVersion)===version && item.data.sourceCommit===source.commit).map(({file,data})=>{
   const currentRoute=file===source.docsPage ? source.route : data.permalink || `/${file.replace(/\.md$/,'')}/`;
   const suffix=currentRoute.slice(source.route.length);
   return {source:file,file:`versioned/${slug}/${version}/${suffix ? suffix.replace(/\/$/,'') : 'index'}.md`,currentRoute,route:`/${slug}/${version}/${suffix}`,title:data.title};
  });
  const release={name:source.name,version,commit:source.commit,repository:source.repository,verifiedOn:source.verifiedOn,composerRequirements:source.composerRequirements,distribution:source.distribution,route:`/${slug}/${version}/`,pages};
  const errors=validateRelease(release);if(errors.length) throw new Error(errors.join('\n'));
  if(existing)for(const old of existing.pages)if(!pages.some(page=>page.file===old.file))throw new Error(`Removed version page needs an explicit route decision: ${old.route}`);
  const snapshots=pages.map(page=>({page,text:snapshotMarkdown(read(page.source),release,page)}));
  for(const {page,text} of snapshots){mkdirSync(dirname(resolve(root,page.file)),{recursive:true});writeFileSync(resolve(root,page.file),text);}
  if(existing)registry.releases[registry.releases.indexOf(existing)]=release;
  else registry.releases.push(release);
  console.log(`${existing?'Refreshed':'Created'} ${source.name} ${version}: ${pages.length} pages`);
 }
 writeFileSync(resolve(root,manifest),JSON.stringify(registry,null,2)+'\n');
}
