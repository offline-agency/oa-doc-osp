# PayPal Checkout

## Vault flow vs Checkout flow

| | Vault flow | Checkout flow |
|---|---|---|
| **Purpose** | Save a payment method for future use | One-time payment |
| **User experience** | Authorizes future charges | Pay now |
| **`flow` option** | `'vault'` | `'checkout'` |
| **`amount` required** | No | Yes |
| **`currency` required** | No | Yes |
| **Nonce reusable** | Yes (vaulted) | No (single use) |

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
const nonce = await createPayment({ flow: 'vault' })
// tokenizePayment is called with the PayPal onApprove data
const payload = await tokenizePayment(onApproveData)
// payload.nonce is a vaulted payment method nonce
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
