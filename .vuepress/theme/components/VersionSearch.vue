<script>
import SearchBox from '@vuepress/plugin-search/SearchBox.vue'
import { rankSearchPages } from '../util/search-rank'
export default {
  extends: SearchBox,
  computed: {
    suggestions () {
      const context = Object.create(this)
      Object.defineProperty(context, '$site', { value: { ...this.$site, pages: rankSearchPages(this.$site.pages) } })
      return SearchBox.computed.suggestions.call(context)
    }
  }
}
</script>
