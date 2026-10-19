<script setup>
import { computed, reactive, onMounted, watch } from 'vue'
import { usePageData, usePageFrontmatter } from 'vuepress/client'
import { downloads, repository, openPulls, latestRelease, formatCount, formatDate } from '../stats.mjs'
// Overview header: release-pinned facts at build time, repository figures fetched live.
const page = usePageData()
const frontmatter = usePageFrontmatter()
const facts = computed(() => page.value.projectFacts)
const lead = computed(() => facts.value?.purpose || frontmatter.value.description)
const live = reactive({ downloads: null, stars: null, issues: null, prs: null, released: null })
const packagistUrl = computed(() => facts.value?.packagist && `https://packagist.org/packages/${facts.value.packagist}`)
const github = computed(() => `https://github.com/${facts.value.github}`)
const badges = computed(() => {
  const f = facts.value
  return [
    f.packagist && f.release && { label: 'packagist', value: f.release.startsWith('v') ? f.release : `v${f.release}`, href: packagistUrl.value, brand: true },
    f.ciResult && { label: 'tests', value: 'passing', href: f.ciResult.url, brand: true, title: f.ciResult.summary },
    f.php && { label: 'php', value: f.php },
    f.laravel && { label: 'laravel', value: f.laravel.join(' · ') },
    f.license && { label: 'license', value: f.license.spdx, href: f.license.url },
    f.packagist && { label: 'downloads', value: formatCount(live.downloads), href: packagistUrl.value, live: true },
    { label: 'stars', value: formatCount(live.stars), href: `${github.value}/stargazers`, live: true },
    { label: 'open issues', value: formatCount(live.issues), href: `${github.value}/issues`, live: true },
    { label: 'open PRs', value: formatCount(live.prs), href: `${github.value}/pulls`, live: true },
    { label: 'last release', value: formatDate(live.released), href: `${github.value}/releases`, live: true },
  ].filter(Boolean)
})
async function load() {
  const f = facts.value
  if (!f) return
  Object.assign(live, { downloads: null, stars: null, issues: null, prs: null, released: null })
  const [total, repo, prs, released] = await Promise.all([f.packagist ? downloads(f.packagist) : null, repository(f.github), openPulls(f.github), latestRelease(f.github)])
  live.downloads = total
  live.stars = repo?.stars ?? null
  live.prs = prs
  // GitHub counts open pull requests as issues.
  live.issues = typeof repo?.openIssues === 'number' && typeof prs === 'number' ? Math.max(0, repo.openIssues - prs) : null
  live.released = released
}
onMounted(load)
watch(() => page.value.path, load)
</script>
<template>
  <section v-if="facts" class="package-hero">
    <div class="package-tags">
      <span v-if="facts.status" class="status-tag" :class="facts.status.toLowerCase().replace(/\s+/g, '-')">{{ facts.status }}</span>
      <span v-if="facts.technology" class="tech-tag">{{ facts.technology }}</span>
    </div>
    <h1>{{ facts.heading }}</h1>
    <p v-if="lead" class="package-lead">{{ lead }}</p>
    <div class="package-badges">
      <a v-for="badge in badges" :key="badge.label" class="badge" :class="{ brand: badge.brand, live: badge.live }" :href="badge.href" :title="badge.title">
        <span class="badge-label">{{ badge.label }}</span><span class="badge-value">{{ badge.value }}</span>
      </a>
    </div>
    <dl class="package-strip">
      <div><dt>Release</dt><dd>
        <a v-if="facts.release" :href="facts.releaseUrl">{{ facts.release }}</a>
        <template v-else>Pinned commit {{ facts.commit.slice(0, 7) }}</template>
      </dd></div>
      <div v-if="facts.php"><dt>PHP</dt><dd>{{ facts.php }}</dd></div>
      <div v-if="facts.laravel"><dt>Laravel</dt><dd>{{ facts.laravel.join(' / ') }}</dd></div>
      <div><dt>Source</dt><dd class="source-links"><a :href="facts.repository">GitHub ↗</a><a v-if="packagistUrl" :href="packagistUrl">Packagist ↗</a></dd></div>
    </dl>
  </section>
</template>
