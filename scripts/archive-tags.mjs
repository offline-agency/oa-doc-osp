// Generates one archived page per release tag that has no reviewed guide.
// Every fact comes from the tagged source in a local clone (manifest, history, README)
// and, for Composer packages, from saved Packagist p2 metadata; links are kept only
// when their target exists at that tag. Usage:
//   node scripts/archive-tags.mjs --references DIR [--packagist DIR] [--check]
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, readdirSync } from 'node:fs';
import { resolve, dirname, posix } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { compareVersions, parseVersion } = require('./documentation-versions.cjs');
const root = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const option = name => { const index = args.indexOf(name); return index >= 0 ? args[index + 1] : null; };
const references = option('--references');
const packagistDir = option('--packagist');
if (!references) throw new Error('--references DIR is required');
const sourcesPath = resolve(root, 'maintenance/package-sources.json');
const versionsPath = resolve(root, 'maintenance/documentation-versions.json');
const sourcesFile = JSON.parse(readFileSync(sourcesPath, 'utf8'));
const registry = JSON.parse(readFileSync(versionsPath, 'utf8'));
const today = new Date().toISOString().slice(0, 10);
const KIND = 'generated-tag';
// External README links verified as unreachable (see the evidence file); shown as plain text.
const deadPath = resolve(root, 'maintenance/evidence/archive-dead-links.json');
const normalizeUrl = url => { try { return encodeURI(decodeURI(url)); } catch { return url; } };
const dead = new Set(existsSync(deadPath) ? JSON.parse(readFileSync(deadPath, 'utf8')).urls.map(item => normalizeUrl(item.url)) : []);
const isDead = url => dead.has(normalizeUrl(url)) || /^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/i.test(url);

const git = (repo, ...rest) => execFileSync('git', ['-C', repo, ...rest], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const tryGit = (repo, ...rest) => { try { return git(repo, ...rest); } catch { return null; } };
const sortTags = tags => [...tags].sort((a, b) => compareVersions(a, b));

// Packagist p2 files are minified: each version repeats only changed keys.
function packagistVersions(slug) {
  if (!packagistDir) return null;
  const file = resolve(packagistDir, `${slug}.json`);
  if (!existsSync(file)) return null;
  const data = JSON.parse(readFileSync(file, 'utf8'));
  const list = Object.values(data.packages || {})[0] || [];
  const expanded = [];
  let previous = {};
  for (const entry of list) {
    const current = { ...previous };
    for (const [key, value] of Object.entries(entry)) { if (value === '__unset') delete current[key]; else current[key] = value; }
    expanded.push(current);
    previous = current;
  }
  return expanded;
}

const escapeText = text => String(text).replace(/[<>&|*_`[\]\\]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] || '\\' + c));
const code = text => '`' + String(text).replaceAll('`', "'") + '`';

function readmeMarkdown(repo, commit, files, repository, path) {
  const text = git(repo, 'show', `${commit}:${path}`);
  const base = posix.dirname(path) === '.' ? '' : posix.dirname(path);
  const slugRepo = repository.replace('https://github.com/', '');
  const resolveTarget = (target, image) => {
    const trimmed = target.trim().replace(/^<|>$/g, '');
    if (/^(https?:|mailto:)/i.test(trimmed)) return isDead(trimmed) ? null : trimmed;
    if (trimmed.startsWith('#') || !trimmed) return null;
    const [rawPath] = trimmed.split(/[?#]/);
    const relative = posix.normalize(rawPath.startsWith('/') ? rawPath.slice(1) : posix.join(base, rawPath)).replace(/\/$/, '');
    if (relative.startsWith('..')) return null;
    if (files.has(relative)) return image ? `https://raw.githubusercontent.com/${slugRepo}/${commit}/${relative}` : `${repository}/blob/${commit}/${relative}`;
    if ([...files].some(file => file.startsWith(relative + '/'))) return image ? null : `${repository}/tree/${commit}/${relative}`;
    return null;
  };
  const inline = segment => segment
    // HTML images become Markdown images; other HTML tags are dropped (their text stays).
    .replace(/<img\b[^>]*>/gi, tag => { const src = /\bsrc=["']([^"']+)["']/i.exec(tag)?.[1]; const alt = /\balt=["']([^"']*)["']/i.exec(tag)?.[1] || ''; return src ? `![${alt}](${src})` : ''; })
    .replace(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => `[${label}](${href})`)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\/?(?:p|div|a|h[1-6]|br|span|b|strong|em|i|u|center|details|summary|table|thead|tbody|tr|td|th|sub|sup|picture|source|kbd|small|code|pre|hr|ul|ol|li|font|section|article|blockquote|dl|dt|dd)\b[^>]*\/?>/gi, '')
    .replace(/<(?!https?:\/\/)/g, '&lt;');
  const links = segment => segment
    // Images first, so badge images nested inside a link are resolved too.
    .replace(/!\[([^\[\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (match, label, target) => { const url = resolveTarget(target, true); return url ? `![${label}](${url})` : ''; })
    .replace(/(!?)\[((?:[^\[\]]|\[[^\]]*\])*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (match, bang, label, target) => {
      const url = resolveTarget(target, !!bang);
      if (url) return `${bang}[${label}](${url})`;
      return bang ? '' : label;
    })
    .replace(/^(\s*\[[^\]]+\]:\s*)(\S+)(.*)$/gm, (match, head, target, tail) => { const url = resolveTarget(target, false); return url ? head + url + tail : ''; })
    .replace(/\[\s*\]\([^)\s]*\)/g, '');
  // HTML is converted outside code spans first; links are then resolved across the whole
  // text so labels written as code (`[`Name`](path)`) are rewritten too.
  const outside = segment => links(segment.split(/(`+[^`\n]*?`+)/).map((part, index) => index % 2 ? part : inline(part)).join(''));
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  const output = [];
  let fence = null, buffer = [];
  const flush = () => { if (!buffer.length) return; output.push(...outside(buffer.join('\n')).split('\n')); buffer = []; };
  for (const line of lines) {
    const marker = /^\s*(`{3,}|~{3,})/.exec(line)?.[1];
    if (fence) { output.push(line); if (marker && marker[0] === fence[0] && marker.length >= fence.length && /^\s*[`~]+\s*$/.test(line)) fence = null; continue; }
    if (marker) { flush(); fence = marker; output.push(line); continue; }
    buffer.push(line);
  }
  flush();
  if (fence) output.push(fence);
  // Setext headings become ATX so levels can be shifted.
  const result = [];
  for (let i = 0; i < output.length; i++) {
    const next = output[i + 1];
    if (next !== undefined && output[i].trim() && /^(=+|-+)\s*$/.test(next) && !/^\s*([-*+]|\d+\.)\s/.test(output[i]) && !/^\s*(`{3,}|~{3,})/.test(output[i])) { result.push(`${next.trim()[0] === '=' ? '#' : '##'} ${output[i].trim()}`); i++; continue; }
    result.push(output[i]);
  }
  let inFence = null;
  return result.map(line => {
    const marker = /^\s*(`{3,}|~{3,})/.exec(line)?.[1];
    if (inFence) { if (marker && marker[0] === inFence[0] && /^\s*[`~]+\s*$/.test(line)) inFence = null; return line; }
    if (marker) { inFence = marker; return line; }
    const heading = /^(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line);
    if (!heading) return line;
    const plain = heading[2].replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[`*_~]/g, '').trim();
    if (!plain) return heading[2];
    return `${'#'.repeat(Math.min(6, heading[1].length + 2))} ${heading[2]}`;
  }).join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function trustFor(files, declared) {
  const first = (...paths) => paths.find(path => files.has(path)) || null;
  const license = first('LICENSE', 'LICENSE.md', 'LICENSE.txt', 'license.md');
  return {
    license: license ? { spdx: declared || 'License file', path: license } : null,
    changelog: first('CHANGELOG.md', 'changelog.md'),
    contributing: first('CONTRIBUTING.md', '.github/CONTRIBUTING.md'),
    security: first('SECURITY.md', '.github/SECURITY.md'),
    workflows: [...files].some(file => file.startsWith('.github/workflows/')) ? '.github/workflows' : null,
  };
}

const generated = [];
const keep = registry.releases.filter(release => release.archiveKind !== KIND);
for (const source of sourcesFile.packages) {
  if (!source.repository || !source.name.startsWith('offline-agency/')) continue;
  const repoName = source.repository.split('/').pop();
  const repo = resolve(references, repoName);
  if (!existsSync(repo)) { console.warn(`No clone for ${source.name}; skipped`); continue; }
  const slug = source.name.split('/')[1];
  const tags = sortTags(git(repo, 'tag').split('\n').filter(Boolean).filter(tag => parseVersion(tag)));
  const reviewed = keep.filter(release => release.name === source.name);
  const current = reviewed.find(release => release.commit === source.commit) || reviewed[0];
  const displayName = (current?.pages[0].title || slug).replace(/^Archived [^ ]+ — /, '').replace(/ — .*$/, '').trim();
  const packagist = packagistVersions(slug);
  for (const [index, tag] of tags.entries()) {
    if (reviewed.some(release => release.version === tag)) continue;
    const commit = git(repo, 'rev-parse', `${tag}^{commit}`).trim();
    const date = git(repo, 'log', '-1', '--format=%cs', commit).trim();
    const previous = index ? tags[index - 1] : null;
    const files = new Set(git(repo, 'ls-tree', '-r', '--name-only', commit).split('\n').filter(Boolean));
    const composer = files.has('composer.json') ? JSON.parse(git(repo, 'show', `${commit}:composer.json`)) : null;
    const npm = files.has('package.json') ? JSON.parse(git(repo, 'show', `${commit}:package.json`)) : null;
    const control = [...files].find(file => /^[^/]+\.control$/.test(file));
    const readme = [...files].find(file => /^readme\.md$/i.test(file));
    const route = `/${slug}/${tag}/`;
    const file = `versioned/${slug}/${tag}/index.md`;
    const shortCommit = commit.slice(0, 7);
    const normalized = tag.replace(/^v/, '');
    const four = value => { const [numbers, pre] = value.replace(/^v/, '').split('-'); const parts = numbers.split('.'); while (parts.length < 4) parts.push('0'); return parts.join('.') + (pre ? '-' + pre : ''); };
    const listed = packagist?.find(entry => entry.version.replace(/^v/, '') === normalized) || packagist?.find(entry => four(entry.version_normalized || entry.version) === four(normalized));
    const later = tags.slice(index + 1).filter(item => !parseVersion(item).prerelease.length).at(-1) || tags.at(-1);
    const supersededBy = source.selectedTag || later;

    const lines = [];
    lines.push(`# ${displayName} ${tag}`, '');
    lines.push(`This archived page describes tag ${code(tag)} of [${source.repository.replace('https://github.com/', '')}](${source.repository}). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](${source.route}) for the maintained release (${supersededBy}).`, '');
    lines.push('## Release', '');
    lines.push('| Fact | Value |', '| --- | --- |');
    lines.push(`| Tag | [${tag}](${source.repository}/releases/tag/${encodeURIComponent(tag)}) |`);
    lines.push(`| Commit | [${code(commit)}](${source.repository}/tree/${commit}) |`);
    lines.push(`| Commit date | ${date} |`);
    if (composer?.name) lines.push(`| Composer package | ${code(composer.name)} |`);
    if (npm?.name) lines.push(`| npm package name | ${code(npm.name)}${npm.version ? ` (manifest version ${code(npm.version)})` : ''} |`);
    if (control) lines.push(`| PostgreSQL extension control file | [${code(control)}](${source.repository}/blob/${commit}/${control}) |`);
    if (packagist) {
      const reference = listed?.source?.reference;
      lines.push(`| Packagist | ${!listed ? 'Not listed on Packagist' : reference === commit ? `Version ${code(listed.version)}, source reference matches this commit` : `Version ${code(listed.version)} points to ${code(reference || 'no source reference')}, not this commit`} (checked ${today}) |`);
    }
    if (composer?.license || npm?.license) lines.push(`| Declared license | ${escapeText([].concat(composer?.license || npm?.license).join(', ')).replaceAll('\\|', '/')} |`);
    lines.push('');
    lines.push('## Requirements', '');
    const table = (title, entries) => { if (!entries || !Object.keys(entries).length) return; lines.push(`${title}:`, '', ...Object.entries(entries).map(([name, constraint]) => `- ${code(name)}: ${code(constraint)}`), ''); };
    if (composer) { table('Declared in `composer.json` `require`', composer.require); if (!composer.require || !Object.keys(composer.require).length) lines.push('`composer.json` declares no runtime requirements.', ''); }
    if (npm) { table('`package.json` `peerDependencies`', npm.peerDependencies); table('`package.json` `dependencies`', npm.dependencies); table('`package.json` `engines`', npm.engines); if (![npm.peerDependencies, npm.dependencies, npm.engines].some(item => item && Object.keys(item).length)) lines.push('`package.json` declares no runtime dependencies or engines.', ''); }
    if (control) { const text = git(repo, 'show', `${commit}:${control}`); lines.push(`Contents of ${code(control)}:`, '', '```ini', text.trim(), '```', ''); }
    if (!composer && !npm && !control) lines.push('No package manifest exists at this tag.', '');
    lines.push(previous ? `## Changes since ${previous}` : '## Changes', '');
    const range = previous ? `${previous}..${tag}` : commit;
    const log = git(repo, 'log', '--no-merges', '--format=%h%x09%s', range).split('\n').filter(Boolean);
    if (previous) lines.push(`[Compare ${previous}...${tag} on GitHub](${source.repository}/compare/${encodeURIComponent(previous)}...${encodeURIComponent(tag)}).`, '');
    if (previous) {
      const changed = git(repo, 'diff', '--name-status', previous, tag).split('\n').filter(Boolean);
      lines.push(`${log.length} non-merge commit${log.length === 1 ? '' : 's'} and ${changed.length} changed file${changed.length === 1 ? '' : 's'}.`, '');
      if (log.length) { lines.push('Commits:', ''); for (const entry of log.slice(0, 40)) { const [hash, ...subject] = entry.split('\t'); lines.push(`- ${code(hash)} ${escapeText(subject.join(' ') || '(no message)')}`); } if (log.length > 40) lines.push(`- …and ${log.length - 40} more (see the comparison)`); lines.push(''); }
      if (changed.length) { lines.push('Changed files:', ''); const names = { A: 'added', M: 'modified', D: 'deleted', R: 'renamed', C: 'copied', T: 'type changed' }; for (const entry of changed.slice(0, 60)) { const [status, ...paths] = entry.split('\t'); lines.push(`- ${names[status[0]] || status} ${paths.map(code).join(' → ')}`); } if (changed.length > 60) lines.push(`- …and ${changed.length - 60} more (see the comparison)`); lines.push(''); }
    } else lines.push(`First tag of the repository: ${log.length} non-merge commit${log.length === 1 ? '' : 's'} up to this tag.`, '');
    lines.push(`## README at ${tag}`, '');
    if (readme) lines.push(`Shipped as [${code(readme)}](${source.repository}/blob/${commit}/${readme}). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.`, '', '::: v-pre', readmeMarkdown(repo, commit, files, source.repository, readme), ':::', '');
    else lines.push('No README exists at this tag.', '');

    const title = `${displayName} — ${tag}`;
    const description = `Archived ${displayName} ${tag} (commit ${shortCommit}, ${date}): requirements, changes${previous ? ` since ${previous}` : ''} and the README shipped with the tag.`;
    const front = ['---', `title: ${JSON.stringify(title)}`, `description: ${JSON.stringify(description)}`, `permalink: ${route}`, `packageVersion: ${JSON.stringify(tag)}`, `sourceCommit: ${commit}`, 'documentationSnapshot: true', `documentationArchive: ${KIND}`, '---', ''];
    const release = {
      name: source.name, version: tag, commit, repository: source.repository, verifiedOn: today, archive: true, archiveKind: KIND,
      supportStatus: `Archived tag ${tag}, generated from the repository; superseded by ${supersededBy}.`,
      archiveNote: `Archived ${tag}: generated from the repository at this tag (manifest, history and README), not a reviewed guide.`,
      ...(composer?.require ? { composerRequirements: composer.require } : {}),
      ...(listed?.source?.reference === commit ? { distribution: { registry: 'Packagist', version: listed.version, sourceReference: listed.source.reference, distReference: listed.dist?.reference || null, url: `https://repo.packagist.org/p2/${source.name}.json`, verifiedOn: today } } : {}),
      route, pages: [{ source: file, file, currentRoute: source.route, route, title }],
    };
    const declared = [].concat(composer?.license || npm?.license || []).join(' OR ');
    generated.push({ release, text: front.join('\n') + lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n', trust: trustFor(files, declared), source });
  }
}

const check = args.includes('--check');
let drift = 0;
for (const item of generated) {
  const path = resolve(root, item.release.pages[0].file);
  if (check) { if (!existsSync(path) || readFileSync(path, 'utf8') !== item.text) { drift++; console.error(`Outdated archive page: ${item.release.pages[0].file}`); } continue; }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, item.text);
}
if (check) { if (drift) process.exitCode = 1; else console.log(`Archive pages: ${generated.length} tag pages match their tagged sources.`); process.exit(); }
// Remove archive pages that no longer correspond to an undocumented tag.
for (const release of registry.releases.filter(release => release.archiveKind === KIND)) {
  if (!generated.some(item => item.release.route === release.route)) rmSync(resolve(root, dirname(release.pages[0].file)), { recursive: true, force: true });
}
registry.releases = [...keep, ...generated.map(item => item.release)];
writeFileSync(versionsPath, JSON.stringify(registry, null, 2) + '\n');
for (const item of generated) {
  const trust = item.source.trust;
  if (!trust) continue;
  trust.releases ||= {};
  trust.releases[item.release.version] = { ...(trust.releases[item.release.version] || {}), ...item.trust };
}
writeFileSync(sourcesPath, JSON.stringify(sourcesFile, null, 2) + '\n');
console.log(`Generated ${generated.length} archived tag pages.`);
