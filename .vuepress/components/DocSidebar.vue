<script setup>
import { computed, ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { RouteLink, usePageData, useRoute, withBase } from 'vuepress/client'
import DocumentationVersion from './DocumentationVersion.vue'
// Pages of the current documentation line, with the open page's headings and scroll-spy.
const page = usePageData()
const route = useRoute()
const active = ref('')
const pages = computed(() => page.value.docNav || [])
const isCurrent = link => link === route.path
const headings = computed(() => (page.value.headers || []).flatMap(header => [header, ...(header.children || [])]).filter(header => header.level <= 3))
function spy() {
  let id = ''
  for (const header of headings.value) {
    const node = document.getElementById(header.slug)
    if (node && node.getBoundingClientRect().top < 110) id = header.slug
  }
  active.value = id
}
onMounted(() => { window.addEventListener('scroll', spy, { passive: true }); spy() })
onBeforeUnmount(() => window.removeEventListener('scroll', spy))
watch(() => route.path, () => nextTick(spy))
</script>
<template>
  <aside id="doc-sidebar" class="doc-sidebar" aria-label="Documentation">
    <div class="doc-sidebar-head">
      <a class="all-projects" :href="withBase('/')">← All projects</a>
      <DocumentationVersion />
    </div>
    <nav class="doc-nav" aria-label="Pages">
      <template v-if="pages.length">
        <template v-for="item in pages" :key="item.link">
          <RouteLink class="doc-nav-item" :class="{ current: isCurrent(item.link) }" :to="item.link" :aria-current="isCurrent(item.link) ? 'page' : null">{{ item.text }}</RouteLink>
          <template v-if="isCurrent(item.link)">
            <RouteLink v-for="header in headings" :key="header.slug" class="doc-nav-item heading" :class="['level-' + header.level, { active: active === header.slug }]" :to="item.link + '#' + header.slug">{{ header.title }}</RouteLink>
          </template>
        </template>
      </template>
      <template v-else>
        <a v-for="header in headings" :key="header.slug" class="doc-nav-item heading" :class="['level-' + header.level, { active: active === header.slug }]" :href="'#' + header.slug">{{ header.title }}</a>
      </template>
    </nav>
    <nav class="drawer-site-links" aria-label="Site links">
      <a :href="withBase('/#current')">Projects</a>
      <a :href="withBase('/#legacy')">Legacy</a>
      <a :href="withBase('/open-source-philosophy/')">Open source</a>
      <a href="https://github.com/offline-agency">GitHub ↗</a>
      <a href="https://offlineagency.it">offlineagency.it ↗</a>
    </nav>
  </aside>
</template>
