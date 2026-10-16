import { readFile } from 'node:fs/promises';
const inventory = JSON.parse(await readFile('maintenance/legacy-anchors.json', 'utf8'));
let anchors = 0;
for (const [route, ids] of Object.entries(inventory.routes)) {
  const html = await readFile(`.vuepress/dist${route}index.html`, 'utf8');
  for (const id of ids) {
    if (!html.includes(`id="${id}"`)) throw new Error(`Legacy anchor missing: ${route}#${id}`);
    anchors++;
  }
}
console.log(`Legacy routes: ${Object.keys(inventory.routes).length} landing pages and ${anchors} original anchors retained.`);

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
