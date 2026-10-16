import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, relative, join, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
const origin = 'https://docs.offlineagency.com';
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
async function walk(root) {
  const entries = await readdir(root, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(join(root, entry.name)) : [join(root, entry.name)]))).flat();
}
export async function checkSite(root) {
  root = resolve(root);
  const files = await walk(root), html = new Map();
  const errors = [];
  for (const file of files.filter(file => file.endsWith('.html'))) html.set(file, await readFile(file, 'utf8'));
  const ids = new Map([...html].map(([file, body]) => [file, new Set([...body.matchAll(/\bid=["']([^"']+)["']/g)].map(match => decode(match[1])))]));
  for (const [file, body] of html) {
    const name = relative(root, file).split(sep).join('/');
    const pagePath = '/' + name.replace(/index\.html$/, '');
    const base = new URL(pagePath, origin);
    const canonical = [...body.matchAll(/<link\b[^>]*>/g)].filter(match => /\brel=["']canonical["']/.test(match[0]));
    if (canonical.length > 1) errors.push(`${name}: duplicate canonical`);
    if (canonical.length && name !== '404.html') {
      const href = canonical[0][0].match(/\bhref=["']([^"']+)["']/)?.[1];
      if (href !== base.href) errors.push(`${name}: canonical ${href} must be ${base.href}`);
    }
    for (const tag of body.matchAll(/<(?:a|img|script|link|source)\b[^>]*>/g)) {
      const attribute = tag[0].match(/\b(?:href|src)=["']([^"']+)["']/);
      if (!attribute) continue;
      const target = decode(attribute[1]);
      if (/^(?:mailto:|tel:|data:|javascript:)/i.test(target)) continue;
      let url;
      try { url = new URL(target, base); } catch { errors.push(`${name}: invalid URL ${target}`); continue; }
      if (url.origin !== origin) continue;
      let local = resolve(root, '.' + decodeURIComponent(url.pathname));
      if (local !== root && !local.startsWith(root + sep)) { errors.push(`${name}: outside site ${target}`); continue; }
      try {
        if ((await stat(local)).isDirectory()) local = join(local, 'index.html');
        await stat(local);
      } catch { errors.push(`${name}: missing ${target}`); continue; }
      if (url.hash && ids.has(local) && !ids.get(local).has(decodeURIComponent(url.hash.slice(1)))) errors.push(`${name}: missing anchor ${target}`);
    }
  }
  return [...new Set(errors)];
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const errors = await checkSite(process.argv[2] || '.vuepress/dist');
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log('Static site: internal links, fragments, assets and any declared canonical targets resolve.');
}
