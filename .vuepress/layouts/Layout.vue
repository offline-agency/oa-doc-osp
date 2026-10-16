<script setup>
import { watch, onMounted } from 'vue'
import { usePageData, useRoute } from 'vuepress/client'
import DefaultLayout from '@vuepress/theme-default/layouts/Layout.vue'
import DocumentationVersion from '../components/DocumentationVersion.vue'
const page = usePageData()
const route = useRoute()
function followAlias() {
  // Load the generated redirect document so historic anchors use the same map
  // for a direct request and SPA navigation.
  if (page.value.documentationSeo?.redirect) window.location.replace(route.fullPath)
}
onMounted(followAlias)
watch(() => route.fullPath, followAlias, { flush: 'post' })
</script>
<template>
  <DefaultLayout><template #page-top><DocumentationVersion /></template></DefaultLayout>
</template>
