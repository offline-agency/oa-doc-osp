<script setup>
import { computed } from 'vue'
import { usePageData } from 'vuepress/client'
// Mirrors the BreadcrumbList JSON-LD generated at build time from the same data.
const page = usePageData()
const crumbs = computed(() => (page.value.breadcrumbs || []).map(item => ({ ...item, path: new URL(item.url).pathname })))
</script>
<template>
  <nav v-if="crumbs.length" class="page-breadcrumbs" aria-label="Breadcrumb">
    <ol>
      <li v-for="(item, index) in crumbs" :key="item.url">
        <span v-if="index === crumbs.length - 1" aria-current="page">{{ item.name }}</span>
        <a v-else :href="item.path">{{ item.name }}</a>
      </li>
    </ol>
  </nav>
</template>
