import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'braintree-vue3',
  description: 'Vue 3 composable-first wrapper for the Braintree Web SDK',
  base: '/braintree-vue3/',

  head: [
    ['link', { rel: 'icon', href: '/braintree-vue3/favicon.ico' }],
  ],

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API Reference', link: '/api/' },
      {
        text: 'Changelog',
        link: 'https://github.com/offline-agency/braintree-vue3/blob/main/CHANGELOG.md',
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
          ],
        },
        {
          text: 'Payment Methods',
          items: [
            { text: 'Hosted Fields', link: '/guide/hosted-fields' },
            { text: 'PayPal Checkout', link: '/guide/paypal' },
            { text: 'Venmo', link: '/guide/venmo' },
            { text: '3D Secure', link: '/guide/three-d-secure' },
            { text: 'Data Collector', link: '/guide/data-collector' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/offline-agency/braintree-vue3' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Not affiliated with Braintree or PayPal.',
    },

    search: {
      provider: 'local',
    },
  },
})
