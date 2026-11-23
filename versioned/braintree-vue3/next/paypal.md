---
title: PayPal Checkout — next · ff99c39
description: 'Pinned source-only Braintree Vue 3 documentation: PayPal Checkout.'
sourceCommit: ff99c39e9fd45e6fe43440f8c3b7bcda58e01775
permalink: /braintree-vue3/next/paypal/
documentationSnapshot: true
documentationKey: next
documentationChannel: next
---

# PayPal Checkout

> **Unreleased source snapshot.** Public npm returned 404 and GitHub had no tags or releases on 16 October 2026. Package-manager commands below describe the intended distribution; use the [pinned source-build instructions](/braintree-vue3/next/integration/) for evaluation. Examples are application snippets, never mounted in this VuePress site. Some omit readiness/error handling, declarations or server functions; `useTemplateRef` examples require Vue 3.5+. See the integration notes for lifecycle, SSR and typing limits.

## Vault flow vs Checkout flow

| | Vault flow | Checkout flow |
|---|---|---|
| **Purpose** | Save a payment method for future use | One-time payment |
| **User experience** | Authorizes future charges | Pay now |
| **`flow` option** | `'vault'` | `'checkout'` |
| **`amount` required** | No | Yes |
| **`currency` required** | No | Yes |
| **Returned nonce** | Send to your server for vaulting | Send to your server for checkout |

> The example defines `renderButton` but does not invoke it. Your application must wait for `isReady`, call it once, provide PayPal window types and handle operation failures.

## Basic usage with `usePayPalCheckout`

```vue
<script setup lang="ts">
import { shallowRef, onMounted } from 'vue'
import { useBraintreeClient, usePayPalCheckout } from 'braintree-vue3'

const { client } = useBraintreeClient('sandbox_xxx')
const { instance, isReady, loadPayPalSDK, createPayment, tokenizePayment } = usePayPalCheckout({ client })

onMounted(async () => {
  // Wait for braintree instance, then load the PayPal JS SDK
  // isReady becomes true when the paypalCheckout instance is ready
})

async function renderButton() {
  await loadPayPalSDK({ currency: 'USD', intent: 'capture' })

  // Use window.paypal after loadPayPalSDK resolves
  window.paypal.Buttons({
    createOrder: () => createPayment({
      flow: 'checkout',
      amount: '10.00',
      currency: 'USD',
      intent: 'capture',
    }),
    onApprove: async (data: any) => {
      const payload = await tokenizePayment(data)
      console.log((payload as any).nonce) // send to server
    },
  }).render('#paypal-button')
}
</script>

<template>
  <div>
    <div id="paypal-button" />
  </div>
</template>
```

## SDK options (`loadPayPalSDK`)

```typescript
await loadPayPalSDK({
  currency: 'USD',
  intent: 'capture',       // 'capture' | 'authorize' | 'tokenize' | 'order'
  components: 'buttons',
  'disable-funding': 'card,credit',
})
```

All keys are passed directly to the PayPal JS SDK loader. Refer to the [PayPal JS SDK reference](https://developer.paypal.com/sdk/js/reference/) for the full list.

## Vault flow example

```typescript
const paymentId = await createPayment({ flow: 'vault' })
// tokenizePayment is called with the PayPal onApprove data
const payload = await tokenizePayment(onApproveData)
// Send payload.nonce to your server; createPayment does not return a nonce.
```

## Merchant account ID

To use a non-default merchant account:

```typescript
const { instance } = usePayPalCheckout({
  client,
  merchantAccountId: 'my-secondary-account',
})
```

## Error handling

```vue
<script setup lang="ts">
import { useBraintreeClient, usePayPalCheckout } from 'braintree-vue3'

const { client } = useBraintreeClient('sandbox_xxx')
const { isReady, error } = usePayPalCheckout({ client })
</script>

<template>
  <div v-if="error" class="error">PayPal initialization failed: {{ error.message }}</div>
  <div v-else-if="!isReady">Loading PayPal...</div>
  <div v-else id="paypal-button" />
</template>
```

---

Adapted from [offline-agency/braintree-vue3, docs/guide/paypal.md](https://github.com/offline-agency/braintree-vue3/blob/ff99c39e9fd45e6fe43440f8c3b7bcda58e01775/docs/guide/paypal.md) at `ff99c39e9fd45e6fe43440f8c3b7bcda58e01775`. The manifest declares MIT; this snapshot contains no standalone LICENSE file. Site adaptations are recorded in [integration notes](/braintree-vue3/next/integration/).
