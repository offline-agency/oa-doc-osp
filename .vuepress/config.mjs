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
// Full-page loader for the first load only (route changes use the theme's progress bar).
// The class is set by script, so pages without JavaScript never show it; a timeout guarantees it clears.
const pageLoader = [
  ['style', {}, 'html.oa-loading body::before{content:"";position:fixed;inset:0;z-index:9999;background:#fff;transition:opacity .3s}'
    + '@media (prefers-color-scheme:dark){html.oa-loading:not(.light) body::before{background:#1b1b1f}}html.dark.oa-loading body::before{background:#1b1b1f}'
    + 'html.oa-loading body::after{content:"";position:fixed;top:50%;left:50%;z-index:10000;width:40px;height:40px;margin:-20px 0 0 -20px;box-sizing:border-box;border:3px solid rgba(53,112,112,.25);border-top-color:#357070;border-radius:50%;animation:oa-spin .8s linear infinite;transition:opacity .3s}'
    + 'html.oa-loaded body::before,html.oa-loaded body::after{opacity:0;pointer-events:none}'
    + '@keyframes oa-spin{to{transform:rotate(360deg)}}@media (prefers-reduced-motion:reduce){html.oa-loading body::after{animation:none}}'],
  ['script', {}, '(function(){var h=document.documentElement;h.classList.add("oa-js","oa-loading");var done=function(){if(!h.classList.contains("oa-loading")||h.classList.contains("oa-loaded"))return;h.classList.add("oa-loaded");setTimeout(function(){h.classList.remove("oa-loading","oa-loaded")},300)};window.addEventListener("load",done,{once:true});setTimeout(done,10000)})()'],
]
const versionSidebars = Object.fromEntries(versions.releases.map(release => [release.route, release.pages.map(page => ({ text: page.title, link: page.route }))]))
// Sidebar pages for the documentation layout; the longest matching prefix wins.
const sidebars = {
  ...versionSidebars,
  '/laravel-cart/': [{ text: 'Historical site archive', link: '/laravel-cart/legacy/' }, { text: 'Site URL migration', link: '/laravel-cart/url-migration/' }],
  '/laravel-webex/': [{ text: 'Guide — 2.0.0', link: '/laravel-webex/' }, { text: 'Implemented API coverage', link: '/laravel-webex/coverage/' }],
}
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
    // Sidebar pages, edit target and revision date for the documentation layout.
    const key = Object.keys(sidebars).filter(prefix => route.startsWith(prefix)).sort((a, b) => b.length - a.length)[0]
    page.data.docNav = key ? sidebars[key] : null
    const releasePage = release?.pages.find(item => item.route === route)
    page.data.editPath = releasePage ? (release.commit === source?.commit ? releasePage.source : releasePage.file) : page.filePathRelative
    page.data.revisedOn = history[route]?.changedOn || null
    page.data.headers = page.headers
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
  head: [['link', { rel: 'icon', href: '/favicon.png' }], ...pageLoader],
  pagePatterns: ['**/*.md', '!node_modules/**', '!maintenance/**', '!scripts/**', '!**/AGENTS.md'],
  bundler: viteBundler(),
  theme: defaultTheme({
    logo: '/oa-eb.png', colorMode: 'light', colorModeSwitch: false,
    repo: 'offline-agency/oa-doc-osp', editLink: false, contributors: false, lastUpdated: true,
    // Header, sidebar and home come from .vuepress/layouts/Layout.vue; the theme still renders the 404 page.
    navbar: false, sidebar: false,
    // Publication metadata is provided by the shared registry/postbuild contract.
    // copyCode stays registered (disabling it breaks the theme's Sass imports) but matches no block:
    // client.mjs adds the template's labelled Copy button instead.
    themePlugins: { linksCheck: false, seo: false, sitemap: false, copyCode: { selector: '[data-oa-copy-code-plugin]' }, prismjs: { theme: 'one-dark', lineNumbers: false } },
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
  extendsMarkdown: md => {
    md.use(footnote)
    // Render the code-block Copy button at build time so hydration matches; client.mjs handles the click.
    const fence = md.renderer.rules.fence
    md.renderer.rules.fence = (...args) => fence(...args).replace(/^(<div class="language-[^>]*>)/, '$1<button type="button" class="copy-code" aria-label="Copy code">Copy</button>')
    // Package overviews render their H1 in the page hero; drop the Markdown one so each page keeps exactly one H1.
    md.core.ruler.push('overview-heading', state => {
      const frontmatter = state.env.frontmatter || {}
      if (!frontmatter.documentationSnapshot || !/^\/[^/]+\/[^/]+\/$/.test(frontmatter.permalink || '')) return
      const index = state.tokens.findIndex(token => token.type === 'heading_open' && token.tag === 'h1')
      if (index >= 0) state.tokens.splice(index, 3)
    })
  },
})
