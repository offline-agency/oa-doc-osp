<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Content, usePageData, usePageFrontmatter, useRoute } from 'vuepress/client'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import BrandHome from '../components/BrandHome.vue'
import DocSidebar from '../components/DocSidebar.vue'
import PageBreadcrumbs from '../components/PageBreadcrumbs.vue'
import VersionNotices from '../components/VersionNotices.vue'
import PackageHero from '../components/PackageHero.vue'
import ProjectFacts from '../components/ProjectFacts.vue'
import DocPager from '../components/DocPager.vue'
const page = usePageData()
const frontmatter = usePageFrontmatter()
const route = useRoute()
const home = computed(() => !!frontmatter.value.home)
const open = ref(false)
function followAlias() {
  // Load the generated redirect document so historic anchors use the same map
  // for a direct request and SPA navigation.
  if (page.value.documentationSeo?.redirect) window.location.replace(route.fullPath)
}
const closeOnEscape = event => { if (event.key === 'Escape' && open.value) open.value = false }
onMounted(() => { followAlias(); document.addEventListener('keydown', closeOnEscape) })
onBeforeUnmount(() => document.removeEventListener('keydown', closeOnEscape))
watch(() => route.fullPath, () => { open.value = false; followAlias() }, { flush: 'post' })
</script>
<template>
  <div class="oa-site" :class="[frontmatter.pageClass, { 'menu-open': open, 'is-home': home }]">
    <SiteHeader :open="open" :controls="home ? 'site-navigation' : 'doc-sidebar'" @toggle="open = !open" />
    <BrandHome v-if="home" />
    <div v-else class="doc-layout">
      <DocSidebar :class="{ open }" />
      <div class="doc-backdrop" aria-hidden="true" @click="open = false" />
      <main class="doc-main">
        <PageBreadcrumbs />
        <VersionNotices />
        <PackageHero />
        <div vp-content><Content /></div>
        <ProjectFacts />
        <DocPager />
      </main>
    </div>
    <SiteFooter />
  </div>
</template>
