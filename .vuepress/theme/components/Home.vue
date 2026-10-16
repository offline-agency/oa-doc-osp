<template class="bg">
  <main class="home" aria-labelledby="main-title">
    <header class="hero">
      <img v-if="data.heroImage"
           :src="$withBase(data.heroImage)"
           :alt="data.heroAlt || 'hero'">

      <h1 v-if="data.heroText !== null" id="main-title">{{ data.heroText || $title }} </h1>

      <p class="description" style="text-align: left;margin: 0 0 3rem;">
        {{ data.tagline || $description }}
      </p>

      <p class="action"
         v-if="data.actionText && data.actionLink">
        <NavLink class="action-button"
                 :item="actionLink"/>
      </p>
    </header>

    <div class="projectCat">
      <h2 style="margin: 0 0 2rem">{{ data.cat1Title }}</h2>

      <p>
        {{ data.cat1DescriptionL1 }}<br><br>
        {{ data.cat1DescriptionL2 }}
      </p>
    </div>

    <form class="project-filters" aria-label="Filter projects" @submit.prevent>
      <label for="project-status">Status
        <select id="project-status" v-model="selectedStatus">
          <option value="all">All statuses</option>
          <option value="maintained">Maintained</option>
          <option value="legacy">Legacy</option>
          <option value="next">Next / unreleased</option>
        </select>
      </label>
      <label for="project-ecosystem">Technology
        <select id="project-ecosystem" v-model="selectedEcosystem">
          <option value="all">All technologies</option>
          <option value="php">PHP</option>
          <option value="javascript">JavaScript</option>
          <option value="postgresql">PostgreSQL</option>
        </select>
      </label>
      <button type="button" @click="resetFilters" :disabled="selectedStatus === 'all' && selectedEcosystem === 'all'">Reset filters</button>
      <p class="filter-count" role="status" aria-live="polite">{{ filteredProjects.length }} of {{ projects.length }} projects</p>
    </form>
    <noscript>All projects are listed below. Enable JavaScript to use the filters.</noscript>
    <p v-if="!filteredProjects.length" class="empty-projects">No projects match these filters. Try another combination or reset the filters.</p>

    <div v-if="visibleGroups.length">
      <div class="projectsType"
           v-for="projectType in visibleGroups"
           :key="projectType.title">
        <h2>{{ projectType.title }}</h2>
        <div class="projects"
             v-if="projectType.projects.length">
          <div class="project"
               v-for="project in projectType.projects"
               :key="project.link">
            <h2><a :href="project.link">{{ project.title }}</a></h2>
            <p class="project-labels"><span>{{ ecosystemLabels[project.ecosystem] }}</span><span>{{ statusLabels[project.maintenanceStatus] }}</span></p>
            <p>{{ project.details }}</p>
          </div>
        </div>
      </div>
    </div>

    <Content class="theme-default-content custom"/>

  </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
  components: {NavLink},
  data () {
    return {
      selectedStatus: 'all', selectedEcosystem: 'all',
      ecosystemLabels: {php: 'PHP', javascript: 'JavaScript', postgresql: 'PostgreSQL'},
      statusLabels: {maintained: 'Maintained', legacy: 'Legacy', next: 'Next / unreleased'}
    }
  },
  methods: { resetFilters () { this.selectedStatus = 'all'; this.selectedEcosystem = 'all' } },

  computed: {
    data() {
      return this.$page.frontmatter
    },
    projects () { return this.data.projects || [] },
    filteredProjects () {
      return this.projects.filter(project => (this.selectedStatus === 'all' || project.maintenanceStatus === this.selectedStatus) && (this.selectedEcosystem === 'all' || project.ecosystem === this.selectedEcosystem))
    },
    visibleGroups () {
      return (this.data.projectTypes || []).map(group => ({...group, projects: this.filteredProjects.filter(project => project.type === group.title)})).filter(group => group.projects.length)
    },

    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}

</script>

<style lang="stylus">

.home
  padding $navbarHeight 2rem 0
  max-width 960px
  margin 0 auto
  display block

  .hero
    text-align center
    margin: 8rem 0 6.5rem

    img
      max-width 100%
      max-height 35px
      display block
      margin 3rem auto 1.5rem

    h1
      font-size 5rem
      text-align: left
      margin-bottom: .5rem

    h1, .description, .action
      margin 1.8rem auto 1rem

    .description
      max-width 35rem
      font-size 1.6rem
      line-height 1.3
      color $textColor

    .action-button
      display inline-block
      font-size 1.2rem
      color #fff
      background-color $accentColor
      padding 0.8rem 1.6rem
      border-radius 4px
      transition background-color .1s ease
      box-sizing border-box
      border-bottom 1px solid darken($accentColor, 10%)

      &:hover
        background-color lighten($accentColor, 10%)

  .hero-title
    color $accentColor

  .projectCat
    margin-bottom 2rem

    h2
      border-bottom none
    p
      text-align: left
      margin: 0 0 3rem
      font-size 1.1rem

  .project-filters
    display flex
    flex-wrap wrap
    align-items flex-end
    gap 1rem
    margin 0 0 2rem
    padding 1.25rem
    border 1px solid $borderColor
    border-radius 6px
    label
      display flex
      flex-direction column
      gap .4rem
      font-weight 600
      flex 1 1 12rem
    select, button
      font inherit
      color $textColor
      background white
      border 1px solid #767676
      border-radius 4px
      padding .6rem .75rem
      min-height 44px
    button
      cursor pointer
      &:disabled
        opacity .55
        cursor default
    select:focus-visible, button:focus-visible
      outline 3px solid $accentColor
      outline-offset 3px
    .filter-count
      width 100%
      margin .25rem 0 0
  .project-labels
    display flex
    flex-wrap wrap
    gap .4rem
    span
      padding .2rem .5rem
      border 1px solid $borderColor
      border-radius 4px
      font-size .8rem
      color $textColor

  .projectsType
    margin-bottom 5vh

    > h2
      margin 2.5rem auto 0;
      border: 0

    .projects
      margin-top 0

    .project
      > h2
        text-decoration underline

  .features, .projects
    border-top 1px solid $borderColor
    padding 1.2rem 0
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between

  .feature, .project
    flex-grow 1
    flex-basis 30%
    max-width 30%

    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)

    p
      color lighten($textColor, 25%)

  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)

@media (max-width: $MQMobile)
  .home
    .features, .projects
      flex-direction column

    .feature, .project
      max-width 100%
      padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem

    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem

      h1
        font-size 2rem

      h1, .description, .action
        margin 1.2rem auto

      .description
        font-size 1.2rem

      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem

    .feature, .project
      h2
        font-size 1.25rem
</style>
