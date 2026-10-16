<template>
  <nav v-if="version" class="documentation-version" aria-label="Documentation versions">
    <span class="package-name">{{ version.package }}</span>
    <label>
      <span>Version</span>
      <select :value="version.selected" aria-label="Documentation version" @change="navigate($event.target.value)">
        <option v-for="option in version.options" :key="option.route" :value="option.route" :selected="option.route === version.selected">{{ option.label }}</option>
      </select>
    </label>
    <p v-if="missingTopic" class="version-notice" role="status">The topic “{{ missingTopic }}” is unavailable in this documentation version. Showing its overview.</p>
    <a v-if="version.snapshot && version.currentRoute && version.currentRoute !== version.selected" :href="version.currentRoute">Current documentation</a>
    <a v-else :href="version.pinnedRoute">Version permalink</a>
    <span v-if="version.snapshot" class="release-note">{{ version.channel === 'next' ? 'Development · ' + version.commit.slice(0, 7) : 'Documented release ' + version.version }}</span>
    <span v-if="version.preOne">Pre-1.0 compatibility line {{ version.key }}.</span>
    <span v-if="version.supportStatus">{{ version.supportStatus }}</span>
    <ul class="version-links" aria-label="Available versions"><li v-for="option in version.options" :key="option.route"><a :href="option.href || option.route">{{ option.label }}</a></li></ul>
  </nav>
</template>

<script>
export default {
  data () { return { hydrated: false } },
  mounted () { this.hydrated = true },
  computed: { version () { return this.$page.documentationVersion }, missingTopic () { return this.hydrated ? this.$route.query['missing-topic'] : null } },
  methods: { navigate (route) { const option=this.version.options.find(item=>item.route===route); const target=option?.href || route; if (target !== this.$route.fullPath) this.$router.push(target) } }
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
  .version-links
    width 100%
    display flex
    gap 1rem
    flex-wrap wrap
    padding 0
    margin 0
    list-style none
  .version-notice
    width 100%
.page .documentation-version + .theme-default-content > :first-child
  margin-top 0
@media (max-width: $MQMobile)
  .documentation-version
    padding ($navbarHeight + 1rem) 2rem 0
@media (max-width: $MQMobileNarrow)
  .documentation-version
    padding ($navbarHeight + 1rem) 1.5rem 0
</style>
