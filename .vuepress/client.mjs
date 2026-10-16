import { onMounted } from 'vue'
import { defineClientConfig, onContentUpdated } from 'vuepress/client'
import Layout from './layouts/Layout.vue'
function labelSearch() {
  document.querySelectorAll('.search-box input[type="search"]').forEach(input => input.setAttribute('aria-label', 'Search documentation'))
}
export default defineClientConfig({
  layouts: { Layout },
  setup() { onMounted(labelSearch); onContentUpdated(labelSearch) },
})
