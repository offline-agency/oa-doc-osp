<script setup>
import { computed } from 'vue'
import { usePageData, useRoute, useRouter } from 'vuepress/client'
// Package name and version selector for the documentation sidebar; links remain available without JavaScript.
const page = usePageData()
const route = useRoute()
const router = useRouter()
const version = computed(() => page.value.documentationVersion)
// The no-JavaScript fallback is markup inside <noscript>, which browsers with JavaScript parse as text, so it is set as HTML.
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const fallback = computed(() => `<ul class="version-links" aria-label="Available versions">${version.value.options.map(option => `<li><a href="${escape(option.href || option.route)}">${escape(option.label)}</a></li>`).join('')}</ul>`)
function navigate(value) {
  const option = version.value.options.find(item => item.route === value)
  const target = option?.href || value
  if (target !== route.fullPath) router.push(target)
}
</script>
<template>
  <nav v-if="version" class="documentation-version" aria-label="Documentation versions">
    <span class="package-name">{{ version.package }}</span>
    <label><span>Version</span>
      <select :value="version.selected" aria-label="Documentation version" @change="navigate($event.target.value)">
        <option v-for="option in version.options" :key="option.route" :value="option.route" :selected="option.route === version.selected">{{ option.label }}</option>
      </select>
    </label>
    <span v-if="version.snapshot" class="release-note">{{ version.channel === 'next' ? 'Development · ' + version.commit.slice(0, 7) : 'Documented release ' + version.version }}</span>
    <span v-if="version.preOne || version.supportStatus" class="release-note"><template v-if="version.preOne">Pre-1.0 compatibility line {{ version.key }}. </template>{{ version.supportStatus }}</span>
    <noscript v-html="fallback" />
  </nav>
</template>
