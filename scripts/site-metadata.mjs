// Shared page metadata: titles, breadcrumbs, social tags, JSON-LD and project facts.
// Every value is derived from page frontmatter or the pinned registries; nothing is fetched.
export const origin = 'https://docs.offlineagency.com';
export const brand = 'OFFLINE Agency';
export const organization = {
  '@type': 'Organization', '@id': `${origin}/#organization`, name: brand, url: 'https://offlineagency.it/',
  logo: `${origin}/oa-eb.png`, sameAs: ['https://github.com/offline-agency'],
};
export const website = {
  '@type': 'WebSite', '@id': `${origin}/#website`, name: `${brand} open-source documentation`, url: `${origin}/`,
  inLanguage: 'en', publisher: { '@id': organization['@id'] },
};
export const socialImage = { url: `${origin}/og-default.png`, width: 1200, height: 630, alt: 'OFFLINE Agency open-source documentation' };

const versionSuffix = / — (?:stable )?(?:v[\d.]+ · )?v?\d[\w.-]*$/;
export const baseTitle = title => String(title || '').replace(/^Archived [^ ]+ — /, '').replace(versionSuffix, '').trim();
export const releaseFor = (route, releases) => releases.find(release => release.pages.some(page => page.route === route));
const lineLabel = (release, context) => context?.archive ? `${release.version} archive` : context?.key && context.key !== release.version ? context.key : release.version;
function packageName(release, context) {
  const name = baseTitle(release.pages[0].title), line = lineLabel(release, context);
  return name.endsWith(` ${line}`) ? name : `${name} ${line}`;
}

export function headTitle({ route, title, frontmatter = {} }, context, releases, sources = []) {
  if (frontmatter.seoTitle) return `${frontmatter.seoTitle} | ${brand}`;
  const release = context?.snapshot && releaseFor(route, releases);
  if (!release) return `${baseTitle(title) || (route === '/404.html' ? 'Page not found' : 'Documentation')} | ${brand}`;
  const overview = release.route === route;
  const seoTitle = !context.archive && sources.find(source => source.name === release.name)?.catalog?.seoTitle;
  if (overview) return `${seoTitle || `${packageName(release, context)} documentation`} | ${brand}`;
  return `${baseTitle(title)} — ${packageName(release, context)} | ${brand}`;
}

export function breadcrumbs({ route, title }, context, releases) {
  if (route === '/' || route === '/404.html') return [];
  const items = [{ name: 'Docs', url: `${origin}/` }];
  const release = context?.snapshot && releaseFor(route, releases);
  if (release) {
    items.push({ name: packageName(release, context), url: origin + release.route });
    if (release.route !== route) items.push({ name: baseTitle(title), url: origin + route });
  } else items.push({ name: baseTitle(title), url: origin + route });
  return items;
}

export function projectFacts(route, context, releases, sources, history = {}) {
  const release = context?.snapshot && releaseFor(route, releases);
  if (!release || release.route !== route) return null;
  const source = sources.find(item => item.name === release.name);
  if (!source?.trust) return null;
  // Older lines can lack files the current release has; per-version overrides keep links truthful.
  const trust = { ...source.trust, ...source.trust.releases?.[release.version] };
  const pinned = release.commit;
  const file = path => path ? `${source.repository}/blob/${pinned}/${path}` : null;
  return {
    purpose: trust.purpose || source.catalog?.details || null,
    publisher: { name: trust.publisher, url: 'https://github.com/offline-agency' },
    repository: source.repository,
    sourceTree: `${source.repository}/tree/${pinned}`,
    commit: pinned,
    release: context.channel === 'next' ? null : release.version,
    releaseUrl: context.channel === 'next' ? null : `${source.repository}/releases/tag/${release.version}`,
    license: trust.license ? { spdx: trust.license.spdx, url: file(trust.license.path) } : null,
    changelog: file(trust.changelog),
    contributing: file(trust.contributing),
    security: file(trust.security),
    privateVulnerabilityReporting: trust.privateVulnerabilityReporting,
    issues: trust.issues,
    workflows: trust.workflows ? `${source.repository}/tree/${pinned}/${trust.workflows}` : null,
    ciResult: trust.ciResult && pinned === source.commit ? trust.ciResult : null,
    verifiedOn: trust.verifiedOn,
    revisedOn: history[route]?.changedOn || null,
  };
}

const programmingLanguage = { php: 'PHP', javascript: 'JavaScript' };
export function structuredData(page, { canonical, title, description, crumbs, facts, context, release, source, revisedOn }) {
  const graph = [organization, website];
  const pageId = `${canonical}#webpage`;
  const webPage = {
    '@type': page.frontmatter?.pageType === 'AboutPage' ? 'AboutPage' : page.route === '/' ? 'CollectionPage' : 'WebPage',
    '@id': pageId, url: canonical, name: title, description, inLanguage: 'en',
    isPartOf: { '@id': website['@id'] }, publisher: { '@id': organization['@id'] },
    ...(revisedOn ? { dateModified: revisedOn } : {}),
  };
  if (crumbs.length) {
    webPage.breadcrumb = { '@id': `${canonical}#breadcrumb` };
    graph.push({ '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumb`, itemListElement: crumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.url })) });
  }
  if (facts && source) {
    const id = `${origin}${release.route}#software`;
    webPage.about = { '@id': id };
    graph.push({
      '@type': 'SoftwareSourceCode', '@id': id, name: source.catalog?.title || baseTitle(release.pages[0].title),
      codeRepository: source.repository, ...(facts.release ? { version: facts.release } : {}),
      ...(facts.license ? { license: facts.license.url } : {}),
      ...(programmingLanguage[source.catalog?.ecosystem] ? { programmingLanguage: programmingLanguage[source.catalog.ecosystem] } : {}),
      maintainer: { '@id': organization['@id'] },
    });
  }
  graph.push(webPage);
  return { '@context': 'https://schema.org', '@graph': graph };
}

// JSON-LD is serialized into a <script>; escape characters that could close it.
export const jsonLd = value => JSON.stringify(value).replaceAll('<', '\\u003c').replaceAll('>', '\\u003e').replaceAll('&', '\\u0026');

export function socialHead({ canonical, title, description, home }) {
  return [
    ['meta', { property: 'og:type', content: home ? 'website' : 'article' }],
    ['meta', { property: 'og:site_name', content: `${brand} Docs` }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: canonical }],
    ['meta', { property: 'og:image', content: socialImage.url }],
    ['meta', { property: 'og:image:width', content: String(socialImage.width) }],
    ['meta', { property: 'og:image:height', content: String(socialImage.height) }],
    ['meta', { property: 'og:image:alt', content: socialImage.alt }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: socialImage.url }],
    ['meta', { name: 'twitter:image:alt', content: socialImage.alt }],
  ];
}
