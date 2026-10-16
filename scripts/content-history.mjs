import {readFileSync,writeFileSync,existsSync,readdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import matter from 'gray-matter';
export function pageSources(root){
 const sources=JSON.parse(readFileSync(resolve(root,'maintenance/package-sources.json'))).packages;
 const versions=JSON.parse(readFileSync(resolve(root,'maintenance/documentation-versions.json'))).releases;
 const files=new Set(['README.md',...sources.map(source=>source.docsPage),...versions.flatMap(version=>version.pages.map(page=>page.file))]);
 for(const source of sources){const slug=source.name.split('/').at(-1),directory=resolve(root,slug);if(existsSync(directory))for(const file of readdirSync(directory,{recursive:true}).filter(file=>file.endsWith('.md')))files.add(slug+'/'+file);}
 return [...files].filter(file=>existsSync(resolve(root,file))).map(file=>{
  const text=readFileSync(resolve(root,file),'utf8'),{data}=matter(text);
  return {file,route:data.permalink || (file==='README.md'?'/':'/'+file.replace(/\.md$/,'')+'/'),title:data.title || '',description:data.description || '',sha256:createHash('sha256').update(text).digest('hex')};
 });
}
export function updateHistory(root,date=new Date().toISOString().slice(0,10)){
 const path=resolve(root,'maintenance/content-history.json'),old=existsSync(path)?JSON.parse(readFileSync(path)).pages:{};
 const pages={};
 for(const page of pageSources(root)){
  let changedOn=old[page.route]?.sha256===page.sha256 ? old[page.route].changedOn : date;
  if(!old[page.route])try{
   const committed=execFileSync('git',['show','HEAD:'+page.file],{cwd:root,stdio:['ignore','pipe','ignore']});
   if(createHash('sha256').update(committed).digest('hex')===page.sha256)changedOn=execFileSync('git',['log','-1','--format=%cs','--',page.file],{cwd:root,encoding:'utf8'}).trim() || date;
  }catch{}
  pages[page.route]={file:page.file,sha256:page.sha256,changedOn};
 }
 writeFileSync(path,JSON.stringify({schemaVersion:1,note:'Dates record reviewed source changes, never build times.',pages},null,2)+'\n');
 return pages;
}
export function checkHistory(root){
 const history=JSON.parse(readFileSync(resolve(root,'maintenance/content-history.json'))).pages;
 for(const page of pageSources(root))if(history[page.route]?.sha256!==page.sha256 || !/^\d{4}-\d{2}-\d{2}$/.test(history[page.route]?.changedOn || ''))throw new Error('Content history drift: '+page.file+'; run docs:update --apply or node scripts/content-history.mjs --update after reviewing edits');
 return history;
}
if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href){const root=resolve(import.meta.dirname,'..');if(process.argv.includes('--update'))updateHistory(root);else checkHistory(root);console.log('Content dates verified against Markdown hashes; no build-time lastmod updates.');}
