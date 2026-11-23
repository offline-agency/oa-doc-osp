<script setup lang="ts">
import type { HostedFieldFieldOptions } from 'braintree-web'
import { injectBraintreeClient } from '../injection-keys'
import { useHostedFields } from '../composables/useHostedFields'

const props = defineProps<{
  fields: HostedFieldFieldOptions
  styles?: Record<string, unknown>
}>()

const { client } = injectBraintreeClient()

const { instance, isReady, cardType, error, tokenize, clear } = useHostedFields({
  client,
  fields: props.fields,
  styles: props.styles,
})

defineExpose({ instance, isReady, cardType, error, tokenize, clear })
</script>

<template>
  <slot />
</template>
