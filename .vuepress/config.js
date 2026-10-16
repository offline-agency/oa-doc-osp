const fs = require('fs')
const path = require('path')
const sources = require('../maintenance/package-sources.json')
const current = sources.packages.filter(item => item.status === 'current-release').map(item => ({ text: item.name.replace('offline-agency/', ''), link: item.route }))
const historical = sources.packages.filter(item => item.status === 'historical-integration').map(item => ({ text: item.name.replace('offline-agency/', '') + ' (retired API)', link: item.route }))
const cartOrder = ['installation', 'quick-start', 'variants-and-wishlist', 'money-and-tax', 'storage', 'authentication', 'integrations', 'upgrading', 'reference', 'support', 'url-migration']
const cartPages = () => fs.readdirSync(path.resolve(__dirname, '../laravel-cart')).filter(file => file.endsWith('.md') && file !== 'legacy.md').sort((a,b) => {
  const rank = file => { const index = cartOrder.indexOf(file.replace(/\.md$/, '')); return index < 0 ? cartOrder.length : index }
  return rank(a) - rank(b)
}).map(file => ['/laravel-cart/' + file.replace(/\.md$/, '') + '/', file.replace(/\.md$/, '').replace(/-/g, ' ')])

module.exports = {
  title: 'Documentation | OFFLINE Agency',
  description: 'Release-pinned guides to Offline Agency Laravel packages, with explicit historical and unavailable references.',
  base: '/',
  patterns: ['**/*.md', '!node_modules/**', '!maintenance/**', '!scripts/**', '!**/AGENTS.md'],
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  themeConfig: {
    logo: '/oa-eb.png',
    nav: [
      { text: 'Packages', items: current },
      { text: 'Historical', items: historical },
      { text: 'OA', link: 'https://offlineagency.it' },
      { text: 'GitHub', link: 'https://github.com/offline-agency' },
    ],
    sidebar: {
      '/laravel-cart/': [['/laravel-cart/', 'Overview — 4.0.3'], ...cartPages(), ['/laravel-cart/legacy/', 'Historical site archive']],
      '/laravel-webex/': [['/laravel-webex/', 'Guide — 2.0.0'], ['/laravel-webex/coverage/', 'Implemented API coverage']],
      '/': 'auto',
    },
    sidebarDepth: 2,
    footer: 'auto',
    searchMaxSuggestions: 10,
  },
  locales: { '/': { lang: 'en-US', title: 'Documentation | OFFLINE Agency', description: 'Verified released APIs and clearly labeled historical package documentation.' } },
  plugins: [
    ['vuepress-plugin-clean-urls', { normalSuffix: '/', indexSuffix: '/', notFoundPath: '/404.html' }],
    ['vuepress-plugin-container', { type: 'right', defaultTitle: '' }],
    ['vuepress-plugin-container', { type: 'theorem', before: info => `<div class="theorem"><p class="title">${info}</p>`, after: '</div>' }],
    ['vuepress-plugin-container', { type: 'tip', defaultTitle: { '/': 'TIP' } }],
    ['@vuepress/last-updated'],
    { name: 'page-descriptions', extendPageData(page) {
      const data = page.frontmatter
      if (data.description && !(data.meta || []).some(meta => meta.name === 'description')) data.meta = [...(data.meta || []), { name: 'description', content: data.description }]
    } },
  ],
  extendMarkdown: md => md.use(require('markdown-it-footnote')),
}
