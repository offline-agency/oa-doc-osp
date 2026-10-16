# Venmo

Venmo lets users pay with their Venmo balance from a mobile browser or desktop web login.

## Basic usage

```vue
<script setup lang="ts">
import { useBraintreeClient, useVenmo } from 'braintree-vue3'

const { client } = useBraintreeClient('sandbox_xxx')
const { isReady, isBrowserSupported, error, tokenize } = useVenmo({ client })

async function handleVenmo() {
  if (!isBrowserSupported.value) {
    alert('Venmo is not supported in this browser.')
    return
  }
  const payload = await tokenize()
  console.log(payload.nonce) // send to server
}
</script>

<template>
  <button :disabled="!isReady || !isBrowserSupported" @click="handleVenmo">
    Pay with Venmo
  </button>
  <p v-if="error">{{ error.message }}</p>
</template>
```

## Browser support detection

`isBrowserSupported` is a reactive `Ref<boolean>` set when the Venmo SDK initializes. Venmo requires the Venmo mobile app and specific browser environments.

```typescript
const { isBrowserSupported } = useVenmo({ client })

// In template:
// v-if="isBrowserSupported" — show Venmo button only when supported
```

## Desktop web login

Enable the desktop PayPal login flow for users without the Venmo app:

```typescript
const { tokenize } = useVenmo({
  client,
  allowDesktopWebLogin: true,
  allowDesktop: true,
})
```

| Option | Default | Description |
|---|---|---|
| `allowDesktop` | `false` | Enable Venmo on desktop browsers |
| `allowDesktopWebLogin` | `false` | Use PayPal web login on desktop |
| `allowNewBrowserTab` | `true` | Open auth in new tab (set `false` for popup) |
| `profileId` | — | Venmo profile ID (for multiple Venmo configs) |
| `paymentMethodUsage` | `'single_use'` | `'single_use'` or `'multi_use'` |

## Returning-user flow (`hasTokenizationResult`)

If the user returns from the Venmo app and the URL contains a tokenization result, you can complete the flow without showing the button again:

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { useBraintreeClient, useVenmo } from 'braintree-vue3'

const { client } = useBraintreeClient('sandbox_xxx')
const { instance, isReady, tokenize } = useVenmo({ client })

onMounted(async () => {
  // Wait for Venmo to initialize
  if (instance.value?.hasTokenizationResult()) {
    const payload = await tokenize()
    // Complete the payment immediately
  }
})
</script>
```

## Payment method usage

```typescript
// For saved/vaulted payments:
const { tokenize } = useVenmo({
  client,
  paymentMethodUsage: 'multi_use',
})
```

## Error handling

```vue
<template>
  <div v-if="!isBrowserSupported" class="unsupported">
    Venmo is not available in your browser.
  </div>
  <button v-else :disabled="!isReady" @click="tokenize()">
    Pay with Venmo
  </button>
  <p v-if="error" class="error">{{ error.message }}</p>
</template>
```
