---
title: "Venmo"
description: "Pinned source-only Braintree Vue 3 documentation: Venmo."
sourceCommit: ff99c39e9fd45e6fe43440f8c3b7bcda58e01775
permalink: /braintree-vue3/venmo/
---

# Venmo

> **Unreleased source snapshot.** Public npm returned 404 and GitHub had no tags or releases on 16 October 2026. Package-manager commands below describe the intended distribution; use the [pinned source-build instructions](/braintree-vue3/next/integration/) for evaluation. Examples are application snippets, never mounted in this VuePress site. Some omit readiness/error handling, declarations or server functions; `useTemplateRef` examples require Vue 3.5+. See the integration notes for lifecycle, SSR and typing limits.

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

Pass desktop Venmo login options through to the SDK:

```typescript
const { tokenize } = useVenmo({
  client,
  allowDesktopWebLogin: true,
  allowDesktop: true,
})
```

| Option | SDK default (wrapper does not set it) | Description |
|---|---|---|
| `allowDesktop` | `false` | Enable Venmo on desktop browsers |
| `allowDesktopWebLogin` | `false` | Request Venmo web login on desktop |
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
    // Send the nonce to your own authenticated server flow
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


The returning-user example checks once on mount and can run before SDK readiness. Wait for `isReady` in the application before checking `hasTokenizationResult`. The wrapper only passes explicitly supplied options and `extraOptions`; table defaults are not wrapper guarantees.

---

Adapted from [offline-agency/braintree-vue3, docs/guide/venmo.md](https://github.com/offline-agency/braintree-vue3/blob/ff99c39e9fd45e6fe43440f8c3b7bcda58e01775/docs/guide/venmo.md) at `ff99c39e9fd45e6fe43440f8c3b7bcda58e01775`. The manifest declares MIT; this snapshot contains no standalone LICENSE file. Site adaptations are recorded in [integration notes](/braintree-vue3/next/integration/).
