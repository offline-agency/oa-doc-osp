<script setup>
import { computed } from 'vue'
import { RouteLink, usePageData, useRoute, useSiteData } from 'vuepress/client'
// Previous/next within the current documentation line, then revision date and edit link.
const page = usePageData()
const route = useRoute()
const items = computed(() => page.value.docNav || [])
const index = computed(() => items.value.findIndex(item => item.link === route.path))
const prev = computed(() => index.value > 0 ? items.value[index.value - 1] : { text: '← All projects', link: '/' })
const next = computed(() => index.value >= 0 && index.value < items.value.length - 1 ? items.value[index.value + 1] : null)
const editUrl = computed(() => page.value.editPath && `https://github.com/offline-agency/oa-doc-osp/edit/master/${page.value.editPath}`)
const revised = computed(() => page.value.revisedOn && new Date(page.value.revisedOn).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }))
</script>
<template>
  <nav class="doc-pager" aria-label="Pages in this documentation">
    <RouteLink class="pager-link" :to="prev.link"><span>Previous</span><strong>{{ prev.link === '/' ? prev.text : '← ' + prev.text }}</strong></RouteLink>
    <RouteLink v-if="next" class="pager-link next" :to="next.link"><span>Next</span><strong>{{ next.text }} →</strong></RouteLink>
  </nav>
  <p v-if="revised || editUrl" class="page-meta">
    <template v-if="revised">Last updated {{ revised }}</template><template v-if="revised && editUrl"> · </template><a v-if="editUrl" :href="editUrl">Edit this page on GitHub</a>
  </p>
</template>
