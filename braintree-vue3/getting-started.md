---
title: "Getting Started"
description: "Pinned source-only Braintree Vue 3 documentation: Getting Started."
sourceCommit: ff99c39e9fd45e6fe43440f8c3b7bcda58e01775
permalink: /braintree-vue3/getting-started/
---

# Getting Started

> **Unreleased source snapshot.** Public npm returned 404 and GitHub had no tags or releases on 16 October 2026. Package-manager commands below describe the intended distribution; use the [pinned source-build instructions](/braintree-vue3/next/integration/) for evaluation. Examples are application snippets, never mounted in this VuePress site. Some omit readiness/error handling, declarations or server functions; `useTemplateRef` examples require Vue 3.5+. See the integration notes for lifecycle, SSR and typing limits.

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

- [Hosted Fields guide](/braintree-vue3/next/hosted-fields/) — styling, card type detection, billing address tokenization
- [PayPal Checkout guide](/braintree-vue3/next/paypal/) — vault vs checkout flow
- [3D Secure guide](/braintree-vue3/next/three-d-secure/) — chaining 3DS after Hosted Fields

---

Adapted from [offline-agency/braintree-vue3, docs/guide/getting-started.md](https://github.com/offline-agency/braintree-vue3/blob/ff99c39e9fd45e6fe43440f8c3b7bcda58e01775/docs/guide/getting-started.md) at `ff99c39e9fd45e6fe43440f8c3b7bcda58e01775`. The manifest declares MIT; this snapshot contains no standalone LICENSE file. Site adaptations are recorded in [integration notes](/braintree-vue3/next/integration/).
