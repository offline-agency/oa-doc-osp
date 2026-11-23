<script setup lang="ts">
import { ref } from 'vue'
import { useBraintreeClient, useHostedFields } from 'braintree-vue3'

const props = defineProps<{ clientToken: string }>()
const emit = defineEmits<{ nonce: [value: string] }>()
const { client, error: clientError } = useBraintreeClient(props.clientToken)
const { isReady, error: fieldsError, tokenize, clear } = useHostedFields({
  client,
  fields: {
    number: { container: '#checkout-number' },
    cvv: { container: '#checkout-cvv' },
    expirationDate: { container: '#checkout-expiry' },
  },
  styles: { input: { 'font-size': '16px' } },
})
const busy = ref(false)
const message = ref('')

async function submit() {
  if (!isReady.value || busy.value) return
  busy.value = true
  message.value = ''
  try {
    const payload = await tokenize()
    emit('nonce', payload.nonce)
    // The parent passes this nonce to its own authenticated backend flow.
  } catch {
    message.value = 'Payment details could not be tokenized. Please check them.'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <label for="checkout-number">Card number</label>
    <div id="checkout-number" class="hosted-field" />
    <label for="checkout-cvv">Security code</label>
    <div id="checkout-cvv" class="hosted-field" />
    <label for="checkout-expiry">Expiry date</label>
    <div id="checkout-expiry" class="hosted-field" />
    <p v-if="clientError || fieldsError" role="alert">Checkout could not initialize.</p>
    <p v-if="message" role="alert">{{ message }}</p>
    <button :disabled="!isReady || busy">Continue</button>
    <button type="button" :disabled="!isReady || busy" @click="clear">Clear</button>
  </form>
</template>

<style scoped>
.hosted-field { height: 2.5rem; border: 1px solid #777; margin-bottom: 1rem; }
</style>
