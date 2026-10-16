<script setup>
import { computed, ref } from 'vue'
import { Content, usePageFrontmatter, useSiteData, withBase } from 'vuepress/client'

const data = usePageFrontmatter()
const site = useSiteData()
const selectedStatus = ref('all')
const selectedEcosystem = ref('all')
const ecosystemLabels = { php: 'PHP', javascript: 'JavaScript', postgresql: 'PostgreSQL' }
const statusLabels = { maintained: 'Maintained', legacy: 'Legacy', next: 'Next / unreleased' }
const projects = computed(() => data.value.projects || [])
const filteredProjects = computed(() => projects.value.filter(project =>
  (selectedStatus.value === 'all' || project.maintenanceStatus === selectedStatus.value) &&
  (selectedEcosystem.value === 'all' || project.ecosystem === selectedEcosystem.value)))
const projectGroups = computed(() => (data.value.projectTypes || []).map(type => ({
  ...type, projects: filteredProjects.value.filter(project => project.type === type.title && project.title && project.link),
})).filter(group => group.projects.length))
function resetFilters() { selectedStatus.value = 'all'; selectedEcosystem.value = 'all' }
const projectLink = link => link.startsWith('/') ? `${link.replace(/\/$/, '')}/` : link
const year = new Date().getFullYear()
</script>

<template>
  <main class="brand-home" aria-labelledby="main-title">
    <header class="brand-hero">
      <img v-if="data.heroImage" :src="withBase(data.heroImage)" :alt="data.heroAlt || 'OFFLINE Agency'">
      <h1 v-if="data.heroText !== null" id="main-title">{{ data.heroText || site.title }}</h1>
      <p class="description">{{ data.tagline || site.description }}</p>
      <a v-if="data.actionText && data.actionLink" class="brand-action" :href="data.actionLink">{{ data.actionText }}</a>
    </header>
    <section class="project-category" :aria-label="data.cat1Title">
      <h2>{{ data.cat1Title }}</h2>
      <p>{{ data.cat1DescriptionL1 }}</p>
      <p>{{ data.cat1DescriptionL2 }}</p>
    </section>
    <form class="project-filters" aria-label="Filter projects" @submit.prevent>
      <label for="project-status">Status
        <select id="project-status" v-model="selectedStatus">
          <option value="all">All statuses</option><option value="maintained">Maintained</option>
          <option value="legacy">Legacy</option><option value="next">Next / unreleased</option>
        </select>
      </label>
      <label for="project-ecosystem">Technology
        <select id="project-ecosystem" v-model="selectedEcosystem">
          <option value="all">All technologies</option><option value="php">PHP</option>
          <option value="javascript">JavaScript</option><option value="postgresql">PostgreSQL</option>
        </select>
      </label>
      <button type="button" @click="resetFilters" :disabled="selectedStatus === 'all' && selectedEcosystem === 'all'">Reset filters</button>
      <p class="filter-count" role="status" aria-live="polite">{{ filteredProjects.length }} of {{ projects.length }} projects</p>
    </form>
    <noscript>All projects are listed below. Enable JavaScript to use the filters.</noscript>
    <p v-if="!filteredProjects.length" class="empty-projects">No projects match these filters. Try another combination or reset the filters.</p>
    <section v-for="group in projectGroups" :key="group.title" class="project-type">
      <h2>{{ group.title }}</h2>
      <div class="projects">
        <article v-for="project in group.projects" :key="project.title" class="project">
          <h3><a :href="projectLink(project.link)">{{ project.title }}</a></h3>
          <p class="project-labels"><span>{{ ecosystemLabels[project.ecosystem] }}</span><span>{{ statusLabels[project.maintenanceStatus] }}</span></p>
          <p>{{ project.details }}</p>
        </article>
      </div>
    </section>
    <Content />
    <footer class="brand-footer">
      © 2019 – {{ year }} <a href="https://offlineagency.it/">OFFLINE Agency</a> |
      <a href="/">Documentation</a> | <a href="https://github.com/offline-agency/">GitHub</a>
    </footer>
  </main>
</template>
