<script setup>
import { computed, ref } from 'vue'
import { Content, usePageFrontmatter, useSiteData, withBase } from 'vuepress/client'
import ProjectIcon from './ProjectIcon.vue'

const data = usePageFrontmatter()
const site = useSiteData()
const query = ref('')
const selectedStatus = ref('all')
const selectedEcosystem = ref('all')
const ecosystemLabels = { php: 'PHP', javascript: 'JavaScript', postgresql: 'PostgreSQL' }
const statusLabels = { maintained: 'Maintained', next: 'Unreleased', legacy: 'Legacy' }
const statusOptions = [['all', 'All'], ...Object.entries(statusLabels)]
const ecosystemOptions = [['all', 'All'], ...Object.entries(ecosystemLabels)]
const projects = computed(() => data.value.projects || [])
const searchText = project => [project.title, project.details, ecosystemLabels[project.ecosystem], project.requirements].join(' ').toLowerCase()
const filteredProjects = computed(() => {
  const q = query.value.trim().toLowerCase()
  return projects.value.filter(project =>
    (selectedStatus.value === 'all' || project.maintenanceStatus === selectedStatus.value) &&
    (selectedEcosystem.value === 'all' || project.ecosystem === selectedEcosystem.value) &&
    (!q || searchText(project).includes(q)))
})
const isFiltered = computed(() => !!query.value.trim() || selectedStatus.value !== 'all' || selectedEcosystem.value !== 'all')
const projectGroups = computed(() => (data.value.projectTypes || []).map(type => ({
  ...type, legacy: type.title === 'Legacy', projects: filteredProjects.value.filter(project => project.type === type.title && project.title && project.link),
})).filter(group => group.projects.length))
const groupId = group => group.legacy ? 'legacy' : 'current'
function resetFilters() { query.value = ''; selectedStatus.value = 'all'; selectedEcosystem.value = 'all' }
const projectLink = link => link.startsWith('/') ? withBase(`${link.replace(/\/$/, '')}/`) : link
const projectSlug = link => link.replace(/^\/|\/$/g, '')
const year = new Date().getFullYear()
</script>

<template>
  <main class="brand-home" aria-labelledby="main-title">
    <header class="brand-hero">
      <img v-if="data.heroImage" :src="withBase(data.heroImage)" :alt="data.heroAlt || 'OFFLINE Agency'">
      <h1 v-if="data.heroText !== null" id="main-title">{{ data.heroText || site.title }}</h1>
      <p class="description">{{ data.tagline || site.description }}</p>
      <p v-if="data.intro" class="intro">{{ data.intro }} <a :href="withBase('/open-source-philosophy/')">Why we share our work</a>.</p>
      <a v-if="data.actionText && data.actionLink" class="brand-action" :href="data.actionLink">{{ data.actionText }}</a>
    </header>

    <div class="brand-body">
      <form class="project-filters" aria-label="Filter projects" role="search" @submit.prevent>
        <label class="project-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <span class="visually-hidden">Search projects</span>
          <input v-model="query" type="search" placeholder="Search by name or feature, e.g. invoice, sms, vue">
        </label>
        <div class="filter-row">
          <div class="filter-group" role="group" aria-labelledby="filter-status">
            <span id="filter-status" class="filter-label">Status</span>
            <button v-for="[value, label] in statusOptions" :key="value" type="button" class="chip"
                    :aria-pressed="selectedStatus === value" @click="selectedStatus = value">{{ label }}</button>
          </div>
          <div class="filter-group" role="group" aria-labelledby="filter-technology">
            <span id="filter-technology" class="filter-label">Technology</span>
            <button v-for="[value, label] in ecosystemOptions" :key="value" type="button" class="chip"
                    :aria-pressed="selectedEcosystem === value" @click="selectedEcosystem = value">{{ label }}</button>
          </div>
          <span class="filter-summary">
            <span class="filter-count" role="status" aria-live="polite">{{ filteredProjects.length }} of {{ projects.length }} projects</span>
            <button v-if="isFiltered" type="button" class="link-button" @click="resetFilters">Reset filters</button>
          </span>
        </div>
      </form>
      <noscript><p class="noscript-note">All projects are listed below. Enable JavaScript to use the filters.</p></noscript>

      <section v-for="group in projectGroups" :id="groupId(group)" :key="group.title" class="project-type" :class="{ legacy: group.legacy }">
        <h2>{{ group.title }} <span v-if="!group.legacy" class="group-count">{{ group.projects.length }}</span></h2>
        <div :class="group.legacy ? 'legacy-projects' : 'projects'">
          <a v-for="(project, index) in group.projects" :key="project.link" class="project" :href="projectLink(project.link)">
            <template v-if="!group.legacy">
              <span class="project-head">
                <span class="project-icon-tile"><ProjectIcon :slug="projectSlug(project.link)" :index="index" /></span>
                <span class="project-tech">{{ ecosystemLabels[project.ecosystem] }}</span>
              </span>
              <span class="project-title">{{ project.title }}</span>
              <span class="project-labels"><span class="status-tag" :class="project.maintenanceStatus">{{ statusLabels[project.maintenanceStatus] }}</span></span>
              <span class="project-details">{{ project.details }}</span>
              <span class="project-meta">
                <span class="project-release">{{ project.release }}</span>
                <span class="project-requirements">{{ project.requirements }}</span>
              </span>
            </template>
            <template v-else>
              <span class="legacy-main">
                <span class="project-title">{{ project.title }}</span>
                <span class="project-details">{{ project.details }}</span>
              </span>
              <span class="legacy-side">
                <span class="status-tag" :class="project.maintenanceStatus">{{ statusLabels[project.maintenanceStatus] }}</span>
                <span class="project-release">{{ project.release }}</span>
              </span>
            </template>
          </a>
        </div>
      </section>

      <p v-if="!filteredProjects.length" class="empty-projects">
        No projects match these filters. <button type="button" class="link-button" @click="resetFilters">Reset filters</button>
      </p>

      <section v-if="data.openSource" class="open-source" aria-labelledby="why-open-source">
        <div class="open-source-intro">
          <h2 id="why-open-source">{{ data.openSource.title }}</h2>
          <p>{{ data.openSource.intro }}</p>
          <p><a :href="withBase('/open-source-philosophy/')">Read our open-source philosophy</a></p>
        </div>
        <div class="open-source-reasons">
          <div v-for="reason in data.openSource.reasons" :key="reason.title">
            <h3>{{ reason.title }}</h3>
            <p>{{ reason.text }}</p>
          </div>
        </div>
      </section>

      <Content class="home-notes" />

      <footer class="brand-footer">
        © 2019 – {{ year }} <a href="https://offlineagency.it/">OFFLINE Agency</a> |
        <a :href="withBase('/')">Documentation</a> | <a :href="withBase('/open-source-philosophy/')">Open-source philosophy</a> | <a href="https://github.com/offline-agency/">GitHub</a>
      </footer>
    </div>
  </main>
</template>
