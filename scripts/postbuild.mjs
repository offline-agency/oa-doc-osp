import { readFile } from 'node:fs/promises';
const inventory = JSON.parse(await readFile('maintenance/legacy-anchors.json', 'utf8'));

const versions = JSON.parse(await readFile('maintenance/documentation-versions.json','utf8'));
const sources = JSON.parse(await readFile('maintenance/package-sources.json','utf8'));
const { versionContext } = await import('./documentation-versions.cjs');
let snapshots = 0;
for (const release of versions.releases) for (const page of release.pages) {
  const html = await readFile(`.vuepress/dist${page.route}index.html`,'utf8');
  const currentRoute = versionContext(page.route,versions.releases,sources.packages).currentRoute;
  if (!html.includes('aria-label="Documentation versions"') || (currentRoute && !html.includes(`href="${currentRoute}"`))) throw new Error(`Missing version navigation: ${page.route}`);
  snapshots++;
}
console.log(`Versioned HTML: ${versions.releases.length} releases and ${snapshots} pages contain static version navigation.`);

// Static publication metadata and redirects are generated without host rewrite rules.
const {readdir,writeFile,mkdir}=await import('node:fs/promises');
const {dirname}=await import('node:path');
const {pagePolicy,withSeo,redirectHtml,sitemap,llmsTxt}=await import('./site-publication.mjs');
const root='.vuepress/dist';
const files=(await readdir(root,{recursive:true})).filter(file=>file.endsWith('.html'));
const bodies=new Map();
for(const file of files)bodies.set('/'+file.replace(/index\.html$/,''),await readFile(root+'/'+file,'utf8'));
const policies={};
for(const [route,html] of bodies){
 const policy=pagePolicy(route,versionContext(route,versions.releases,sources.packages),versions.redirects || []);
 policies[route]=policy;
 const file=root+route+(route.endsWith('/')?'index.html':'');
 await writeFile(file,withSeo(html,policy));
}
const oldAnchors=JSON.parse(await readFile('maintenance/compatibility-route-anchors.json','utf8')).routes;
const ids=html=>new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]));
const mappings=[];
for(const redirect of versions.redirects || []){
 const destination=new URL(redirect.target,'https://docs.offlineagency.com');
 if(!bodies.has(destination.pathname))throw new Error(`Redirect target missing: ${redirect.target}`);
 const release=versions.releases.find(release=>release.pages.some(page=>page.route===destination.pathname));
 const anchors=Object.assign(Object.create(null),redirect.anchors || {});
 for(const id of new Set([...(oldAnchors[redirect.route] || []),...ids(bodies.get(redirect.route) || '')])){
  if(Object.prototype.hasOwnProperty.call(anchors,id))continue;
  if(ids(bodies.get(destination.pathname)).has(id))anchors[id]=destination.pathname+destination.search+'#'+id;
  else{
   const matching=release?.pages.find(page=>ids(bodies.get(page.route) || '').has(id));
   anchors[id]=matching?matching.route+'#'+id:destination.pathname+'?missing-topic='+encodeURIComponent(id);
  }
 }
 const file=root+redirect.route+(redirect.route.endsWith('/')?'index.html':'');await mkdir(dirname(file),{recursive:true});
 await writeFile(file,redirectHtml({...redirect,anchors}));
 policies[redirect.route]=pagePolicy(redirect.route,null,[redirect]);
 mappings.push({...redirect,anchors});
}
await writeFile(root+'/seo.json',JSON.stringify(policies,null,2)+'\n');
await writeFile(root+'/redirects.json',JSON.stringify(mappings,null,2)+'\n');
const {checkHistory,pageSources}=await import('./content-history.mjs');
const history=checkHistory(process.cwd());
await writeFile(root+'/sitemap.xml',sitemap(policies,history));
const index=pageSources(process.cwd()).filter(page=>policies[page.route]?.robots.startsWith('index,') && policies[page.route].canonical==='https://docs.offlineagency.com'+page.route).map(page=>{
 const version=versions.releases.find(release=>release.pages.some(item=>item.route===page.route));
 return {url:policies[page.route].canonical,title:version?.archive?'Archived '+version.version+' — '+page.title:page.title,description:page.description,changedOn:history[page.route].changedOn,...(version?{package:version.name,documentationKey:version.documentationKey || version.version,packageVersion:version.version,status:version.archive?'archived':'stable',sourceCommit:version.commit}:{})};
});
await writeFile(root+'/documentation-index.json',JSON.stringify({schemaVersion:1,pages:index},null,2)+'\n');
// llms.txt reuses each page's generated <title>, without the brand suffix.
const headTitle=route=>(bodies.get(route)||'').match(/<title>([^<]*)<\/title>/)?.[1]?.replace(/ \| OFFLINE Agency$/,'').replaceAll('&amp;','&');
await writeFile(root+'/llms.txt',llmsTxt(index.map(page=>({...page,title:headTitle(new URL(page.url).pathname)||page.title}))));
await writeFile(root+'/robots.txt','User-agent: *\nAllow: /\nSitemap: https://docs.offlineagency.com/sitemap.xml\n');
console.log(`Publication: ${mappings.length} static redirects, self/alias canonical policy, next noindex, sitemap, robots and llms.txt generated.`);

let anchors = 0;
for (const [route, ids] of Object.entries(inventory.routes)) {
  const html = await readFile(`.vuepress/dist${route}index.html`, 'utf8');
  for (const id of ids) {
    if (!html.includes(`id="${id}"`)) throw new Error(`Legacy anchor missing: ${route}#${id}`);
    anchors++;
  }
}
console.log(`Legacy routes: ${Object.keys(inventory.routes).length} landing pages and ${anchors} original anchors retained.`);
