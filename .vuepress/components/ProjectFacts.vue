<script setup>
import { computed } from 'vue'
import { usePageData } from 'vuepress/client'
// Verified repository facts for a package overview; unavailable items stay explicit.
const page = usePageData()
const facts = computed(() => page.value.projectFacts)
</script>
<template>
  <section v-if="facts" class="project-facts" aria-labelledby="project-facts-title">
    <h2 id="project-facts-title" class="visually-hidden">Project facts</h2>
    <dl>
      <div>
        <dt>Published by</dt>
        <dd><a :href="facts.publisher.url">{{ facts.publisher.name }}</a> · <a href="/open-source-philosophy/">Our open-source philosophy</a></dd>
      </div>
      <div>
        <dt>Source</dt>
        <dd><a :href="facts.repository">Repository</a> · <a :href="facts.sourceTree">documented commit {{ facts.commit.slice(0, 7) }}</a></dd>
      </div>
      <div>
        <dt>Release</dt>
        <dd>
          <template v-if="facts.release"><a :href="facts.releaseUrl">{{ facts.release }}</a></template>
          <template v-else>No published release; documented at a pinned commit</template>
          <template v-if="facts.changelog"> · <a :href="facts.changelog">Changelog</a></template>
        </dd>
      </div>
      <div>
        <dt>License</dt>
        <dd>
          <a v-if="facts.license" :href="facts.license.url">{{ facts.license.spdx }}</a>
          <template v-else>No license file in the documented source</template>
        </dd>
      </div>
      <div>
        <dt>Contributing</dt>
        <dd>
          <a v-if="facts.contributing" :href="facts.contributing">Contribution guide</a>
          <template v-else>No contribution guide in the documented source</template>
          · <a :href="facts.issues">Issue tracker</a>
        </dd>
      </div>
      <div>
        <dt>Security reports</dt>
        <dd>
          <a v-if="facts.security" :href="facts.security">Security policy</a>
          <template v-else-if="facts.privateVulnerabilityReporting">GitHub private vulnerability reporting</template>
          <template v-else>No security policy in the documented source</template>
        </dd>
      </div>
      <div>
        <dt>Automated checks</dt>
        <dd>
          <template v-if="facts.ciResult"><a :href="facts.ciResult.url">{{ facts.ciResult.summary }}</a> (checked {{ facts.ciResult.checkedOn }})</template>
          <template v-else-if="facts.workflows"><a :href="facts.workflows">Workflow definitions</a>; results not checked for this documentation</template>
          <template v-else>No workflow definitions in the documented source</template>
        </dd>
      </div>
      <div>
        <dt>Support</dt>
        <dd>No support agreement is published.<template v-if="facts.security"> Any supported-version or response commitments are in the security policy.</template></dd>
      </div>
      <div>
        <dt>This page</dt>
        <dd>
          <template v-if="facts.revisedOn">Content revised {{ facts.revisedOn }} · </template>facts verified {{ facts.verifiedOn }} ·
          <a href="https://github.com/offline-agency/oa-doc-osp/issues">Report a documentation issue</a>
        </dd>
      </div>
    </dl>
  </section>
</template>
