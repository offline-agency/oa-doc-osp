import matter from 'gray-matter';
import { readFile } from 'node:fs/promises';
import { validateCatalog, validateDocument } from './content-rules.mjs';
const manifest = JSON.parse(await readFile('maintenance/package-sources.json','utf8'));
const homepage = matter(await readFile('README.md','utf8')).data;
const errors = validateCatalog(homepage, manifest.packages);
for (const source of manifest.packages) {
  const document = matter(await readFile(source.docsPage,'utf8'));
  errors.push(...validateDocument(document.data,source));
}
for (const source of manifest.packages.filter(entry => entry.commit)) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(source.verifiedOn) || !/^[a-f0-9]{40}$/.test(source.commit)) errors.push(`${source.name}: invalid evidence metadata`);
}
// Maintainer prose and isolated PHP fixtures must never enter the public page catalog.
const publicFiles = ['README.md',...manifest.packages.map(entry=>entry.docsPage)];
for (const file of publicFiles) {
  const text = await readFile(file,'utf8');
  if (/styleci\.io|aruba-smsc|config\('aruba\./i.test(text)) errors.push(`${file}: obsolete badge or config namespace`);
}
if (errors.length) {console.error(errors.join('\n'));process.exitCode=1;}
else console.log(`Content: ${manifest.packages.length} source/status pages and ${homepage.projects.length} valid catalog cards verified.`);
