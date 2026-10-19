import { onMounted } from 'vue'
import { defineClientConfig, onContentUpdated, resolvers } from 'vuepress/client'
import Layout from './layouts/Layout.vue'
function labelSearch() {
  document.querySelectorAll('.search-box input[type="search"]').forEach(input => input.setAttribute('aria-label', 'Search documentation'))
}
// Copy buttons are rendered with each code block; one delegated listener copies the block's code.
function copyCode(event) {
  const button = event.target.closest?.('.copy-code')
  if (!button) return
  const code = button.parentElement.querySelector('pre')?.innerText || ''
  navigator.clipboard.writeText(code).then(() => { button.textContent = 'Copied' }, () => { button.textContent = 'Copy failed' })
  setTimeout(() => { button.textContent = 'Copy' }, 1600)
}
// Build-time titles avoid a duplicated site suffix; keep SSR and SPA navigation identical.
const defaultHeadTitle = resolvers.resolvePageHeadTitle
resolvers.resolvePageHeadTitle = (page, site) => page.headTitle || defaultHeadTitle(page, site)
export default defineClientConfig({
  layouts: { Layout },
  setup() {
    onMounted(() => { labelSearch(); document.addEventListener('click', copyCode) })
    onContentUpdated(labelSearch)
  },
})
