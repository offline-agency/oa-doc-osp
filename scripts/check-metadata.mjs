import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const origin = 'https://docs.offlineagency.com';
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`))?.[1];
function meta(html, key, value) {
  return [...html.matchAll(/<meta\b[^>]*>/g)].map(match => match[0]).filter(tag => attr(tag, key) === value).map(tag => decode(attr(tag, 'content') ?? ''));
}
const text = html => decode(html.replace(/<[^>]+>/g, '')).trim();

// Checks every indexable page's head and headings; returns human-readable errors.
export function checkPage(route, html, policy) {
  const errors = [], name = route;
  const titles = [...html.matchAll(/<title>([^<]*)<\/title>/g)].map(match => decode(match[1]).trim());
  if (titles.length !== 1 || !titles[0]) errors.push(`${name}: expected exactly one nonempty title`);
  const descriptions = meta(html, 'name', 'description');
  if (descriptions.length !== 1 || !descriptions[0]) errors.push(`${name}: expected exactly one nonempty description`);
  if (attr(html.match(/<html\b[^>]*>/)?.[0] || '', 'lang') !== 'en') errors.push(`${name}: html lang must be "en"`);
  const canonicals = [...html.matchAll(/<link\b[^>]*>/g)].map(match => match[0]).filter(tag => attr(tag, 'rel') === 'canonical').map(tag => attr(tag, 'href'));
  if (canonicals.length !== 1 || !canonicals[0]?.startsWith(origin + '/')) errors.push(`${name}: expected exactly one absolute HTTPS canonical`);
  if (policy && canonicals[0] !== policy.canonical) errors.push(`${name}: canonical ${canonicals[0]} differs from policy ${policy.canonical}`);
  for (const [key, value] of [['property', 'og:title'], ['property', 'og:description'], ['property', 'og:url'], ['property', 'og:image'], ['property', 'og:image:alt'], ['name', 'twitter:card']]) {
    const found = meta(html, key, value);
    if (found.length !== 1 || !found[0]) errors.push(`${name}: expected exactly one ${value}`);
  }
  if (meta(html, 'property', 'og:url')[0] && meta(html, 'property', 'og:url')[0] !== canonicals[0]) errors.push(`${name}: og:url must equal canonical`);
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (scripts.length !== 1) errors.push(`${name}: expected exactly one JSON-LD block`);
  else {
    try {
      const graph = JSON.parse(scripts[0][1])['@graph'] || [];
      const page = graph.find(node => ['WebPage', 'AboutPage', 'CollectionPage'].includes(node['@type']));
      if (!page || page.url !== canonicals[0]) errors.push(`${name}: JSON-LD page must match canonical`);
      if (!graph.some(node => node['@id'] === `${origin}/#organization`)) errors.push(`${name}: JSON-LD missing organization`);
      for (const node of graph) if (/aggregateRating|review/i.test(JSON.stringify(node))) errors.push(`${name}: JSON-LD must not claim ratings or reviews`);
    } catch { errors.push(`${name}: invalid JSON-LD`); }
  }
  if ([...html.matchAll(/<h1\b/g)].length !== 1) errors.push(`${name}: expected exactly one h1`);
  for (const match of html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g)) if (!text(match[2])) errors.push(`${name}: empty h${match[1]} heading`);
  return errors;
}

export async function checkMetadata(root, policies) {
  root = resolve(root);
  const errors = [], titles = new Map();
  const files = (await readdir(root, { recursive: true })).filter(file => file.endsWith('.html'));
  for (const file of files) {
    const route = '/' + file.split(sep).join('/').replace(/index\.html$/, '');
    const policy = policies[route];
    if (!policy?.robots?.startsWith('index,')) continue;
    const html = await readFile(join(root, file), 'utf8');
    errors.push(...checkPage(route, html, policy));
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
    if (title) titles.set(title, [...(titles.get(title) || []), route]);
  }
  for (const [title, routes] of titles) if (routes.length > 1) errors.push(`Duplicate title "${title}": ${routes.join(', ')}`);
  return errors;
}

// Acceptance checks for the open-source philosophy page and package trust facts.
export async function checkAuthority(root, policies, sitemap) {
  const errors = [];
  const read = route => readFile(join(root, route, 'index.html'), 'utf8').catch(() => null);
  const philosophy = await read('/open-source-philosophy/');
  if (!philosophy) return ['/open-source-philosophy/ is not built'];
  if (!policies['/open-source-philosophy/']?.robots.startsWith('index,')) errors.push('Philosophy page must be indexable');
  if (!sitemap.includes(`<loc>${origin}/open-source-philosophy/</loc>`)) errors.push('Philosophy page missing from sitemap');
  if (!/"@type":"AboutPage"/.test(philosophy)) errors.push('Philosophy page must use AboutPage');
  if (!/<h1[^>]*>[\s\S]*?Why we build and share open-source software/.test(philosophy)) errors.push('Philosophy page H1 changed');
  const home = await read('/');
  if (!home || (home.match(/href="\/open-source-philosophy\/"/g) || []).length < 3) errors.push('Home must link the philosophy page from navigation, introduction and footer');
  for (const route of Object.keys(policies).filter(route => policies[route].robots.startsWith('index,'))) {
    const html = await read(route);
    if (html?.includes('class="project-facts"') && !/Published by[\s\S]*Source[\s\S]*License[\s\S]*Contributing[\s\S]*Security reports/.test(html)) errors.push(`${route}: incomplete project facts`);
  }
  const forbidden = /\b(trusted by|used by \d|testimonial|award[- ]winning|guaranteed (?:support|response)|24\/7|SLA guarantee|industry[- ]leading|best[- ]in[- ]class)\b/i;
  for (const route of ['/', '/open-source-philosophy/']) if (forbidden.test(text((await read(route)) || ''))) errors.push(`${route}: unsupported social proof or guarantee wording`);
  return errors;
}

export async function packageOverviews(root, releases) {
  const missing = [];
  for (const release of releases) {
    const html = await readFile(join(root, release.route, 'index.html'), 'utf8');
    if (!html.includes('class="project-facts"')) missing.push(release.route);
  }
  return missing;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const root = resolve(process.argv[2] || '.vuepress/dist');
  const policies = JSON.parse(await readFile(join(root, 'seo.json'), 'utf8'));
  const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
  const releases = JSON.parse(await readFile('maintenance/documentation-versions.json', 'utf8')).releases;
  const errors = [...await checkMetadata(root, policies), ...await checkAuthority(root, policies, sitemap), ...(await packageOverviews(root, releases)).map(route => `${route}: missing project facts`)];
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log(`Metadata: ${Object.values(policies).filter(policy => policy.robots.startsWith('index,')).length} indexable pages have unique titles, descriptions, lang, canonical, social tags and JSON-LD; philosophy page and project facts verified.`);
}
