<script setup lang="ts">
import { useBraintreeClient } from '../composables/useBraintreeClient'

const props = defineProps<{
  authorization: string
}>()

const { client, isReady, isLoading, error, reinitialize } = useBraintreeClient(props.authorization)

defineExpose({ client, isReady, isLoading, error, reinitialize })
</script>

<template>
  <slot />
</template>
