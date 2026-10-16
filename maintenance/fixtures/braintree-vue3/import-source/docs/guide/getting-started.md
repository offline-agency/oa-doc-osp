# Getting Started

## Prerequisites

- Vue 3.3+
- A [Braintree sandbox account](https://sandbox.braintreegateway.com/)
- A tokenization key or server-generated client token

## Installation

```bash
npm install braintree-vue3 braintree-web
npm install --save-dev @types/braintree-web
```

## Minimal example — Hosted Fields

```vue
<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { BraintreeProvider, BraintreeHostedFields } from 'braintree-vue3'

const authorization = 'sandbox_YOUR_TOKENIZATION_KEY'
const cardForm = useTemplateRef('cardForm')
const nonce = ref<string | null>(null)

const fields = {
  number: { container: '#bt-number', placeholder: '4111 1111 1111 1111' },
  cvv: { container: '#bt-cvv', placeholder: '123' },
  expirationDate: { container: '#bt-expiry', placeholder: 'MM/YY' },
}

async function handlePay() {
  const payload = await cardForm.value!.tokenize()
  nonce.value = payload.nonce
  // POST nonce to your server for gateway.transaction.sale()
}
</script>

<template>
  <BraintreeProvider :authorization="authorization">
    <BraintreeHostedFields ref="cardForm" :fields="fields">
      <div id="bt-number" class="field" />
      <div id="bt-cvv" class="field" />
      <div id="bt-expiry" class="field" />
    </BraintreeHostedFields>
    <button @click="handlePay">Pay</button>
  </BraintreeProvider>
</template>
```

> **Server step:** Always finalize the transaction server-side. Never trust a nonce from the browser alone.

## Next steps

- [Hosted Fields guide](./hosted-fields) — styling, card type detection, billing address tokenization
- [PayPal Checkout guide](./paypal) — vault vs checkout flow
- [3D Secure guide](./three-d-secure) — chaining 3DS after Hosted Fields
