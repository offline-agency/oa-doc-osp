<script setup>
import { computed, ref, onMounted } from 'vue'
import { usePageData, useRoute } from 'vuepress/client'
// Version-specific notices shown above the page content.
const page = usePageData()
const route = useRoute()
const hydrated = ref(false)
onMounted(() => { hydrated.value = true })
const version = computed(() => page.value.documentationVersion)
const missingTopic = computed(() => hydrated.value ? route.query['missing-topic'] : null)
const showCurrent = computed(() => version.value?.snapshot && version.value.currentRoute && version.value.currentRoute !== version.value.selected)
</script>
<template>
  <div v-if="version && (missingTopic || version.archive || showCurrent)" class="version-notices">
    <p v-if="missingTopic" class="version-notice" role="status">The topic “{{ missingTopic }}” is unavailable in this documentation version. Showing its overview.</p>
    <p v-if="version.archive" class="version-notice archive-notice">Archived {{ version.version }} documentation, preserved before release 4.1.0. Statements about open PR #50 reflect that snapshot, not current status.</p>
    <p v-if="showCurrent" class="version-notice">{{ version.supportStatus || 'You are reading an older documentation line.' }} <a :href="version.currentRoute">Read the current documentation</a></p>
  </div>
</template>
