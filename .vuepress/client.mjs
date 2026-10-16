import { onMounted } from 'vue'
import { defineClientConfig, onContentUpdated, resolvers } from 'vuepress/client'
import Layout from './layouts/Layout.vue'
function labelSearch() {
  document.querySelectorAll('.search-box input[type="search"]').forEach(input => input.setAttribute('aria-label', 'Search documentation'))
}
// Build-time titles avoid a duplicated site suffix; keep SSR and SPA navigation identical.
const defaultHeadTitle = resolvers.resolvePageHeadTitle
resolvers.resolvePageHeadTitle = (page, site) => page.headTitle || defaultHeadTitle(page, site)
export default defineClientConfig({
  layouts: { Layout },
  setup() { onMounted(labelSearch); onContentUpdated(labelSearch) },
})
