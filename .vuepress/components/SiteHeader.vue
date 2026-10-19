<script setup>
import { withBase } from 'vuepress/client'
// Shared site header; below 900px the links collapse behind the navigation toggle.
defineProps({ open: Boolean, controls: { type: String, default: 'site-navigation' } })
defineEmits(['toggle'])
</script>
<template>
  <header class="site-header">
    <a class="site-brand" :href="withBase('/')">
      <img :src="withBase('/oa-eb.png')" alt="OFFLINE Agency" width="32" height="32">
      <span>Documentation</span>
    </a>
    <div class="site-search"><SearchBox /></div>
    <button type="button" class="site-toggle" aria-label="Toggle navigation" :aria-controls="controls" :aria-expanded="open ? 'true' : 'false'" @click="$emit('toggle')">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path v-if="open" d="M6 6l12 12M18 6 6 18" /><path v-else d="M4 7h16M4 12h16M4 17h16" /></svg>
    </button>
    <nav id="site-navigation" class="site-nav" :class="{ open }" aria-label="Site">
      <a :href="withBase('/#current')">Projects</a>
      <a :href="withBase('/#legacy')">Legacy</a>
      <a :href="withBase('/open-source-philosophy/')">Open source</a>
      <a href="https://github.com/offline-agency">GitHub ↗</a>
      <a href="https://offlineagency.it">offlineagency.it ↗</a>
    </nav>
  </header>
</template>
