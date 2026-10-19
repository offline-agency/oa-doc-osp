<script setup>
import { withBase } from 'vuepress/client'
const year = new Date().getFullYear()
</script>
<template>
  <footer class="site-footer">
    © 2019 – {{ year }} <a href="https://offlineagency.it/">OFFLINE Agency</a> |
    <a :href="withBase('/')">Documentation</a> | <a :href="withBase('/open-source-philosophy/')">Open-source philosophy</a> | <a href="https://github.com/offline-agency/">GitHub</a>
  </footer>
</template>
