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
