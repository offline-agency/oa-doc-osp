import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import matter from 'gray-matter';
export function catalog(packages){
 const projects=packages.filter(source=>source.catalog).map(source=>({title:source.catalog.title,link:source.route,details:source.catalog.details,type:source.catalog.category}));
 return {projects,projectTypes:[...new Set(projects.map(card=>card.type))].map(title=>({title}))};
}
if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const root=resolve(import.meta.dirname,'..'),file=resolve(root,'README.md');
 const homepage=matter(readFileSync(file,'utf8'));
 const expected=catalog(JSON.parse(readFileSync(resolve(root,'maintenance/package-sources.json'))).packages);
 if(process.argv.includes('--check')){
  if(JSON.stringify(homepage.data.projects)!==JSON.stringify(expected.projects) || JSON.stringify(homepage.data.projectTypes)!==JSON.stringify(expected.projectTypes))throw new Error('Homepage catalog drift: run node scripts/catalog.mjs after reviewing package-sources.json');
  console.log('Homepage cards and categories match the pinned package registry.');
 }else{Object.assign(homepage.data,expected);writeFileSync(file,matter.stringify(homepage.content,homepage.data));}
}
