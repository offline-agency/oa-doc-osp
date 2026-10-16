const matter = require('gray-matter');
function validateRelease(release) {
  const errors = [];
  const slug = release.name?.split('/')[1];
  if (!/^offline-agency\/[a-z0-9-]+$/.test(release.name || '') || !/^v?\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(release.version || '') || !/^[a-f0-9]{40}$/.test(release.commit || '')) errors.push('Invalid version provenance');
  const root = `/${slug}/${release.version}/`;
  if (release.route !== root) errors.push('Incorrect version root');
  const routes = new Set(), files = new Set(), current = new Set();
  for (const page of release.pages || []) {
    if (routes.has(page.route) || files.has(page.file) || current.has(page.currentRoute)) errors.push('Duplicate version page');
    routes.add(page.route); files.add(page.file); current.add(page.currentRoute);
    if (!page.route?.startsWith(root) || !page.currentRoute?.startsWith(`/${slug}/`) || !page.file?.startsWith(`versioned/${slug}/${release.version}/`) || [page.file,page.source,page.route,page.currentRoute].some(value => !value || value.includes('..') || value.includes('\\') || value.includes('//'))) errors.push('Invalid version page path');
  }
  if (!routes.has(root)) errors.push('Missing version landing page');
  return errors;
}
function snapshotMarkdown(text, release, page) {
  const document = matter(text);
  if (String(document.data.packageVersion) !== release.version || document.data.sourceCommit !== release.commit) throw new Error(`Version provenance mismatch: ${page.source}`);
  const routes = new Map(release.pages.map(item => [item.currentRoute,item.route]));
  const content = document.content.replace(/(\]\(|href=["'])(\/[^\s)"']+)(?=[)"'])/g, (match, before, target) => {
    const url = new URL(target, 'https://docs.offlineagency.com');
    return routes.has(url.pathname) ? before + routes.get(url.pathname) + url.search + url.hash : match;
  });
  const title = document.data.title.includes(release.version) ? document.data.title : `${document.data.title} — ${release.version}`;
  return matter.stringify(content, {...document.data,title,permalink:page.route,documentationSnapshot:true});
}
function versionContext(path, releases, sources) {
  const selectedRelease = releases.find(release => release.pages.some(page => page.route === path));
  const currentRelease = selectedRelease || releases.find(release => sources.some(source => source.name === release.name && source.selectedTag === release.version) && release.pages.some(page => page.currentRoute === path));
  if (!currentRelease) return null;
  const page = currentRelease.pages.find(item => item.route === path || item.currentRoute === path);
  const candidates = releases.filter(release => release.name === currentRelease.name);
  const latest = candidates.find(release => sources.some(source => source.name === release.name && source.selectedTag === release.version));
  const currentRoute = latest?.pages.find(item => item.currentRoute === page.currentRoute)?.currentRoute || latest?.pages[0].currentRoute;
  const options = currentRoute ? [{label:`Current (${latest.version})`,route:currentRoute}] : [];
  for (const release of candidates) options.push({label:release.version,route:release.pages.find(item => item.currentRoute === page.currentRoute)?.route || release.route});
  return {package:currentRelease.name.replace('offline-agency/',''),version:currentRelease.version,selected:path,options,currentRoute,pinnedRoute:currentRelease.pages.find(item => item.currentRoute === page.currentRoute)?.route,snapshot:!!selectedRelease};
}
function validateSnapshots(releases, sources, read, currentPages = {}) {
  const errors = [], seen = new Set();
  for (const release of releases) {
    errors.push(...validateRelease(release).map(error => `${release.name}: ${error}`));
    if (seen.has(release.route)) errors.push(`Duplicate version root: ${release.route}`);
    seen.add(release.route);
    const current = sources.find(source => source.name === release.name && source.selectedTag === release.version);
    if (current && current.commit !== release.commit) errors.push(`Version source SHA changed: ${release.name}`);
    if (current) for (const file of currentPages[release.name] || []) if (!release.pages.some(page => page.source === file)) errors.push(`Missing current snapshot page: ${file}`);
    for (const page of release.pages || []) {
      try {
        const text = read(page.file), data = matter(text).data;
        if (String(data.packageVersion) !== release.version || data.sourceCommit !== release.commit || data.permalink !== page.route || data.documentationSnapshot !== true) errors.push(`Snapshot provenance mismatch: ${page.file}`);
        if (current && snapshotMarkdown(read(page.source),release,page) !== text) errors.push(`Stale snapshot: ${page.file}; run npm run docs:version -- --refresh`);
      } catch(error) { errors.push(`${page.file}: ${error.message}`); }
    }
  }
  for (const source of sources.filter(item => item.selectedTag && item.commit)) if (!releases.some(release => release.name === source.name && release.version === source.selectedTag)) errors.push(`Missing current documentation version: ${source.name}`);
  return errors;
}
module.exports = {snapshotMarkdown,versionContext,validateRelease,validateSnapshots};
