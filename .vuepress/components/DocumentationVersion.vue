<script setup>
import { computed, ref, onMounted } from 'vue'
import { usePageData, useRoute, useRouter } from 'vuepress/client'
const page = usePageData()
const route = useRoute()
const router = useRouter()
const hydrated = ref(false)
onMounted(() => { hydrated.value = true })
const version = computed(() => page.value.documentationVersion)
const missingTopic = computed(() => hydrated.value ? route.query['missing-topic'] : null)
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
    <p v-if="missingTopic" class="version-notice" role="status">The topic “{{ missingTopic }}” is unavailable in this documentation version. Showing its overview.</p>
    <a v-if="version.snapshot && version.currentRoute && version.currentRoute !== version.selected" :href="version.currentRoute">Current documentation</a>
    <a v-else :href="version.pinnedRoute">Version permalink</a>
    <span v-if="version.snapshot" class="release-note">{{ version.channel === 'next' ? 'Development · ' + version.commit.slice(0, 7) : 'Documented release ' + version.version }}</span>
    <p v-if="version.archive" class="version-notice archive-notice">Archived {{ version.version }} documentation, preserved before release 4.1.0. Statements about open PR #50 reflect that snapshot, not current status.</p>
    <span v-if="version.preOne">Pre-1.0 compatibility line {{ version.key }}.</span>
    <span v-if="version.supportStatus">{{ version.supportStatus }}</span>
    <ul class="version-links" aria-label="Available versions"><li v-for="option in version.options" :key="option.route"><a :href="option.href || option.route">{{ option.label }}</a></li></ul>
  </nav>
</template>
