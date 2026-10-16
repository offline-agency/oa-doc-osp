const matter = require('gray-matter');
function parseVersion(value) {
  const match = /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z.-]+))?(?:\+([0-9A-Za-z.-]+))?$/.exec(value || '');
  if (!match) return null;
  const numbers = match.slice(1,4).map(Number), prerelease = match[4]?.split('.') || [];
  if (numbers.some(number => !Number.isSafeInteger(number)) || prerelease.some(part => !part || (/^\d+$/.test(part) && part.length > 1 && part.startsWith('0'))) || match[5]?.split('.').some(part=>!part)) return null;
  return {major:numbers[0],minor:numbers[1],patch:numbers[2],prerelease};
}
function compareVersions(left,right) {
  const a = parseVersion(left), b = parseVersion(right);
  if (!a || !b) throw new Error('Invalid version comparison');
  for (const key of ['major','minor','patch']) if (a[key] !== b[key]) return a[key] - b[key];
  if (!a.prerelease.length || !b.prerelease.length) return !a.prerelease.length && !b.prerelease.length ? 0 : a.prerelease.length ? -1 : 1;
  for (let index=0;index<Math.max(a.prerelease.length,b.prerelease.length);index++) {
    const x=a.prerelease[index], y=b.prerelease[index];
    if (x===y) continue;
    if (x===undefined || y===undefined) return x===undefined ? -1 : 1;
    const nx=/^\d+$/.test(x), ny=/^\d+$/.test(y);
    if (nx && ny) return BigInt(x)<BigInt(y) ? -1 : 1;
    if (nx !== ny) return nx ? -1 : 1;
    return x<y ? -1 : 1;
  }
  return 0;
}
function documentationKey(version,strategy='exact') {
  if (strategy==='development') { if (version) throw new Error('A development reference cannot claim a stable version'); return 'next'; }
  const parsed=parseVersion(version);
  if (!parsed) throw new Error('Invalid source version');
  if (strategy==='compatibility' && parsed.prerelease.length) throw new Error('Prereleases cannot replace a stable compatibility line; use a separate preview');
  return strategy==='compatibility' ? parsed.major===0 ? `v0.${parsed.minor}` : `v${parsed.major}` : version;
}
function selectStableLines(records) {
  const lines=new Map();
  for (const record of records) {
    const parsed=parseVersion(record.version);
    if (!parsed || parsed.prerelease.length || record.prerelease || record.published===false) continue;
    const key=documentationKey(record.version,'compatibility');
    if (!lines.has(key) || compareVersions(record.version,lines.get(key).version)>0) lines.set(key,{...record,key});
  }
  return [...lines.values()].sort((a,b)=>compareVersions(b.version,a.version));
}
const releaseKey = release => release.documentationKey || release.version;
const development = release => release.version==='next';
const sourceVersion = source => source.documentation?.strategy==='development' ? 'next' : source.selectedTag;

function validateRelease(release) {
  const errors = [];
  const slug = release.name?.split('/')[1];
  if (!/^offline-agency\/[a-z0-9_-]+$/.test(release.name || '') || (!parseVersion(release.version) && !development(release)) || !/^[a-f0-9]{40}$/.test(release.commit || '')) errors.push('Invalid version provenance');
  const key=releaseKey(release);
  if (release.documentationKey && key !== (development(release) ? 'next' : documentationKey(release.version,'compatibility'))) errors.push('Incorrect compatibility key');
  const root = `/${slug}/${key}/`;
  if (release.route !== root) errors.push('Incorrect version root');
  const routes = new Set(), files = new Set(), current = new Set();
  for (const page of release.pages || []) {
    if (routes.has(page.route) || files.has(page.file) || current.has(page.currentRoute)) errors.push('Duplicate version page');
    routes.add(page.route); files.add(page.file); current.add(page.currentRoute);
    if (!page.route?.startsWith(root) || !page.currentRoute?.startsWith(`/${slug}/`) || !page.file?.startsWith(`versioned/${slug}/${key}/`) || [page.file,page.source,page.route,page.currentRoute].some(value => !value || value.includes('..') || value.includes('\\') || value.includes('//'))) errors.push('Invalid version page path');
  }
  if (!routes.has(root)) errors.push('Missing version landing page');
  return errors;
}
function snapshotMarkdown(text, release, page) {
  const document = matter(text);
  if ((development(release) ? !!document.data.packageVersion : String(document.data.packageVersion) !== release.version) || document.data.sourceCommit !== release.commit) throw new Error(`Version provenance mismatch: ${page.source}`);
  const routes = new Map(release.pages.map(item => [item.currentRoute,item.route]));
  const content = document.content.replace(/(\]\(|href=["'])(\/[^\s)"']+)(?=[)"'])/g, (match, before, target) => {
    const url = new URL(target, 'https://docs.offlineagency.com');
    return routes.has(url.pathname) ? before + routes.get(url.pathname) + url.search + url.hash : match;
  });
  const label=release.documentationKey ? `${releaseKey(release)} · ${development(release) ? release.commit.slice(0,7) : release.version}` : release.version;
  const title = document.data.title.includes(label) ? document.data.title : `${document.data.title} — ${label}`;
  return matter.stringify(content, {...document.data,title,permalink:page.route,documentationSnapshot:true,...(release.documentationKey ? {documentationKey:releaseKey(release),documentationChannel:development(release)?'next':'stable'} : {})});
}
function versionContext(path, releases, sources) {
  const selectedRelease = releases.find(release => release.pages.some(page => page.route === path));
  const currentRelease = selectedRelease || releases.find(release => sources.some(source => source.name === release.name && sourceVersion(source) === release.version) && release.pages.some(page => page.currentRoute === path));
  if (!currentRelease) return null;
  const source=sources.find(source=>source.name===currentRelease.name);
  const page=currentRelease.pages.find(item=>item.route===path || item.currentRoute===path);
  const equivalentPage = release => {
    const direct=release.pages.find(item=>item.currentRoute===page.currentRoute);
    if(direct)return direct;
    const root=source?.route || `/${currentRelease.name.split('/')[1]}/`;
    const suffix=page.currentRoute.slice(root.length).replace(/\/$/,'');
    const alias=source?.documentation?.topicAliases?.[suffix];
    return alias ? release.pages.find(item=>item.currentRoute===root+alias+'/') : undefined;
  };
  const candidates=releases.filter(release=>release.name===currentRelease.name && (!release.archive || release===selectedRelease)).sort((a,b)=>development(a)!==development(b)?development(a)?1:-1:development(a)?0:compareVersions(b.version,a.version));
  const latest=candidates.find(release=>sourceVersion(source || {})===release.version);
  const currentPage=latest && equivalentPage(latest);
  const scoped=!!currentRelease.documentationKey;
  const latestScoped=!!latest?.documentationKey;
  const currentRoute=latest ? latestScoped ? currentPage?.route || latest.route : currentPage?.currentRoute || latest.pages[0].currentRoute : undefined;
  const options=currentRoute && !scoped && !latestScoped ? [{label:`Current (${latest.version})`,route:currentRoute}] : [];
  for (const release of candidates) {
    const matching=equivalentPage(release), route=matching?.route || release.route;
    const missingTopic=!matching;
    const label=release.archive ? `Archived ${release.version}` : release.documentationKey ? development(release)?'next — development':`${releaseKey(release)} — ${release.version}` : release.version;
    options.push({label:label+(missingTopic?' — overview (topic unavailable)':''),route,missingTopic,href:missingTopic?`${route}?missing-topic=${encodeURIComponent(page.title)}`:route});
  }
  return {package:currentRelease.name.replace('offline-agency/',''),commit:currentRelease.commit,version:currentRelease.version,key:releaseKey(currentRelease),selected:path,options,currentRoute,pinnedRoute:page.route,snapshot:!!selectedRelease,archive:!!currentRelease.archive,channel:development(currentRelease)?'next':'stable',supportStatus:currentRelease.archive ? currentRelease.supportStatus : scoped?currentRelease.supportStatus || source?.documentation?.supportStatus || 'Support status not documented.':undefined,preOne:parseVersion(currentRelease.version)?.major===0,topic:page.title};
}
function validateSnapshots(releases, sources, read, currentPages = {}) {
  const errors = [], seen = new Set();
  for (const release of releases) {
    errors.push(...validateRelease(release).map(error => `${release.name}: ${error}`));
    if (seen.has(release.route)) errors.push(`Duplicate version root: ${release.route}`);
    seen.add(release.route);
    const current = sources.find(source => source.name === release.name && sourceVersion(source) === release.version);
    if (current && current.commit !== release.commit) errors.push(`Version source SHA changed: ${release.name}`);
    if (current) for (const file of currentPages[release.name] || []) if (!release.pages.some(page => page.source === file)) errors.push(`Missing current snapshot page: ${file}`);
    for (const page of release.pages || []) {
      try {
        const text = read(page.file), data = matter(text).data;
        if ((development(release) ? !!data.packageVersion : String(data.packageVersion) !== release.version) || data.sourceCommit !== release.commit || data.permalink !== page.route || data.documentationSnapshot !== true) errors.push(`Snapshot provenance mismatch: ${page.file}`);
        if (current && snapshotMarkdown(read(page.source),release,page) !== text) errors.push(`Stale snapshot: ${page.file}; run npm run docs:version -- --refresh`);
      } catch(error) { errors.push(`${page.file}: ${error.message}`); }
    }
  }
  for (const source of sources.filter(item => (item.selectedTag || item.documentation?.strategy==='development') && item.commit)) if (!releases.some(release => release.name === source.name && release.version === sourceVersion(source))) errors.push(`Missing current documentation version: ${source.name}`);
  return errors;
}
module.exports = {snapshotMarkdown,versionContext,validateRelease,validateSnapshots,parseVersion,compareVersions,documentationKey,selectStableLines,releaseKey,sourceVersion};
