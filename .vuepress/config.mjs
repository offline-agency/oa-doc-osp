import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'
import { markdownContainerPlugin } from '@vuepress/plugin-markdown-container'
import footnote from 'markdown-it-footnote'
import { pagePolicy } from '../scripts/site-publication.mjs'
import { headTitle, breadcrumbs, projectFacts, structuredData, jsonLd, socialHead, releaseFor } from '../scripts/site-metadata.mjs'

const require = createRequire(import.meta.url)
const { versionContext } = require('../scripts/documentation-versions.cjs')
const directory = fileURLToPath(new URL('.', import.meta.url))
const root = resolve(directory, '..')
const sources = JSON.parse(readFileSync(resolve(root, 'maintenance/package-sources.json'), 'utf8'))
const versions = JSON.parse(readFileSync(resolve(root, 'maintenance/documentation-versions.json'), 'utf8'))
const history = JSON.parse(readFileSync(resolve(root, 'maintenance/content-history.json'), 'utf8')).pages
const label = source => source.catalog?.title || source.name.replace('offline-agency/', '')
const project = source => ({ text: label(source), link: source.route })
const current = sources.packages.filter(source => ['current-release', 'source-reference'].includes(source.status)).map(source => ({...project(source),text:label(source)+(source.status==='source-reference'?' (next)':'')}))
const historical = sources.packages.filter(source => source.status === 'historical-integration').map(source => ({ text: `${label(source)} (retired API)`, link: source.route }))
const versionSidebars = Object.fromEntries(versions.releases.map(release => [release.route, release.pages.map(page => ({ text: page.title, link: page.route }))]))
const siteDescription = 'Release-pinned guides to OFFLINE Agency open-source packages, with explicit historical and unavailable references.'
const escape = info => info.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const publication = {
  name: 'documentation-publication',
  extendsPageOptions(options) {
    if (!options.filePath || options.frontmatter?.permalink) return
    const relative = options.filePath.replaceAll('\\', '/').slice(root.length + 1)
    if (relative === 'README.md' || relative === 'index.md') return
    options.frontmatter = { ...options.frontmatter, permalink: `/${relative.replace(/(?:README|index)\.md$/, '').replace(/\.md$/, '').replace(/\/$/, '')}/` }
  },
  extendsPage(page) {
    const route = page.frontmatter.permalink || page.path
    const context = versionContext(route, versions.releases, sources.packages)
    const policy = pagePolicy(route, context, versions.redirects || [])
    if (context?.archive) page.title = `Archived ${context.version} — ${page.title}`
    page.data.documentationVersion = context
    page.data.documentationSeo = policy
    const active = context && sources.packages.find(source => source.name === `offline-agency/${context.package}`)
    page.data.documentationSearchRank = context?.channel === 'next' ? 3 : context?.snapshot ? active?.selectedTag === context.version && active?.commit === context.commit ? 0 : 1 : 2
    const managed = ([tag, attrs]) => (tag === 'link' && attrs?.rel === 'canonical') || (tag === 'meta' && (attrs?.name === 'robots' || /^(og|twitter):/.test(attrs?.property || attrs?.name || ''))) || (tag === 'script' && attrs?.type === 'application/ld+json')
    page.frontmatter.head = (page.frontmatter.head || []).filter(entry => !managed(entry))
    page.frontmatter.head.push(['link', { rel: 'canonical', href: policy.canonical }], ['meta', { name: 'robots', content: policy.robots }])
    // One title/description/social/JSON-LD set per page, derived from the registries.
    const meta = { route, title: page.title, frontmatter: page.frontmatter }
    const title = headTitle(meta, context, versions.releases, sources.packages)
    const description = page.frontmatter.description || siteDescription
    const crumbs = breadcrumbs(meta, context, versions.releases)
    const facts = projectFacts(route, context, versions.releases, sources.packages, history)
    const release = context?.snapshot ? releaseFor(route, versions.releases) : null
    const source = release && sources.packages.find(item => item.name === release.name)
    page.data.headTitle = title
    page.data.breadcrumbs = crumbs
    page.data.projectFacts = facts
    if (!policy.redirect && route !== '/404.html') {
      page.frontmatter.head.push(...socialHead({ canonical: policy.canonical, title, description, home: route === '/' }))
      page.frontmatter.head.push(['script', { type: 'application/ld+json' }, jsonLd(structuredData(page, { canonical: policy.canonical, title, description, crumbs, facts, context, release, source, revisedOn: history[route]?.changedOn }))])
    }
  },
  onPrepared(app) {
    // The official search plugin preserves app.pages order in its generated index.
    // Rank before that plugin's onPrepared hook; retain stable archives and next.
    app.pages.sort((left, right) => (left.data.documentationSearchRank ?? 1) - (right.data.documentationSearchRank ?? 1))
  },
}
export default defineUserConfig({
  lang: 'en', title: 'Documentation | OFFLINE Agency',
  description: siteDescription,
  base: '/',
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  pagePatterns: ['**/*.md', '!node_modules/**', '!maintenance/**', '!scripts/**', '!**/AGENTS.md'],
  bundler: viteBundler(),
  alias: {
    '@theme/VPHome.vue': resolve(directory, 'components/BrandHome.vue'),
    '@theme/VPToggleSidebarButton.vue': resolve(directory, 'components/SidebarToggle.vue'),
    '@theme/VPNavbarDropdown.vue': resolve(directory, 'components/NavbarDropdown.vue'),
  },
  theme: defaultTheme({
    logo: '/oa-eb.png', colorMode: 'light', colorModeSwitch: false,
    repo: 'offline-agency/oa-doc-osp', editLink: false, contributors: false, lastUpdated: true,
    navbar: [
      { text: 'Current project', children: current },
      { text: 'Legacy', children: historical },
      { text: 'Open source philosophy', link: '/open-source-philosophy/' },
      { text: 'OA', link: 'https://offlineagency.it' },
      { text: 'GitHub', link: 'https://github.com/offline-agency' },
    ],
    sidebar: {
      ...versionSidebars,
      '/laravel-cart/': [{ text: 'Historical site archive', link: '/laravel-cart/legacy/' }, { text: 'Site URL migration', link: '/laravel-cart/url-migration/' }],
      '/laravel-webex/': [{ text: 'Guide — 2.0.0', link: '/laravel-webex/' }, { text: 'Implemented API coverage', link: '/laravel-webex/coverage/' }],
      '/': 'heading',
    },
    // Publication metadata is provided by the shared registry/postbuild contract.
    themePlugins: { linksCheck: false, seo: false, sitemap: false },
  }),
  plugins: [
    publication,
    searchPlugin({
      maxSuggestions: 10,
      isSearchable: page => page.frontmatter.search !== false && !(page.data.documentationVersion && !page.data.documentationVersion.snapshot) && !versions.redirects?.some(item => item.route === page.path),
      getExtraFields: page => [page.path.replaceAll('/', ' ').replaceAll('-', ' '), page.data.documentationVersion?.package || '', page.frontmatter.description || '', page.data.documentationVersion?.version || '', page.data.documentationVersion?.key || ''],
    }),
    markdownContainerPlugin({ type: 'right', before: () => '<div class="custom-block right">', after: () => '</div>' }),
    markdownContainerPlugin({ type: 'theorem', before: info => `<div class="custom-block theorem"><p class="custom-block-title">${escape(info)}</p>`, after: () => '</div>' }),
  ],
  extendsMarkdown: md => md.use(footnote),
})
