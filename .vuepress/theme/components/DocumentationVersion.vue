<template>
  <nav v-if="version" class="documentation-version" aria-label="Documentation versions">
    <span class="package-name">{{ version.package }}</span>
    <label>
      <span>Version</span>
      <select :value="version.selected" aria-label="Documentation version" @change="navigate($event.target.value)">
        <option v-for="option in version.options" :key="option.route" :value="option.route" :selected="option.route === version.selected">{{ option.label }}</option>
      </select>
    </label>
    <a v-if="version.snapshot && version.currentRoute" :href="version.currentRoute">Current documentation</a>
    <a v-else :href="version.pinnedRoute">Version permalink</a>
    <span v-if="version.snapshot" class="release-note">Release {{ version.version }}</span>
  </nav>
</template>

<script>
export default {
  computed: { version () { return this.$page.documentationVersion } },
  methods: { navigate (route) { if (route !== this.$route.path) this.$router.push(route) } }
}
</script>

<style lang="stylus">
.documentation-version
  max-width $contentWidth
  margin 0 auto
  padding ($navbarHeight + 1.5rem) 2.5rem 0
  display flex
  flex-wrap wrap
  align-items center
  gap .75rem
  font-size .9rem
  .package-name
    font-weight 600
  label
    display inline-flex
    align-items center
    gap .5rem
  select
    color $textColor
    background white
    border 1px solid #767676
    border-radius 3px
    padding .35rem .5rem
    font inherit
    max-width 100%
  .release-note
    color $textColor
.page .documentation-version + .theme-default-content > :first-child
  margin-top 0
@media (max-width: $MQMobile)
  .documentation-version
    padding ($navbarHeight + 1rem) 2rem 0
@media (max-width: $MQMobileNarrow)
  .documentation-version
    padding ($navbarHeight + 1rem) 1.5rem 0
</style>
