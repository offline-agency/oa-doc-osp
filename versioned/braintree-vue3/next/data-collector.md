---
title: Data Collector — next · ff99c39
description: 'Pinned source-only Braintree Vue 3 documentation: Data Collector.'
sourceCommit: ff99c39e9fd45e6fe43440f8c3b7bcda58e01775
permalink: /braintree-vue3/next/data-collector/
documentationSnapshot: true
documentationKey: next
documentationChannel: next
---

# Data Collector

> **Unreleased source snapshot.** Public npm returned 404 and GitHub had no tags or releases on 16 October 2026. Package-manager commands below describe the intended distribution; use the [pinned source-build instructions](/braintree-vue3/next/integration/) for evaluation. Examples are application snippets, never mounted in this VuePress site. Some omit readiness/error handling, declarations or server functions; `useTemplateRef` examples require Vue 3.5+. See the integration notes for lifecycle, SSR and typing limits.

The Data Collector module collects device fingerprint and fraud signals from the browser and returns a `deviceData` string. The wrapper forwards SDK device data; provider configuration and your server integration determine which fraud tools consume it.

## What `deviceData` is

`deviceData` is a JSON string containing correlation IDs and device signals collected by the Braintree SDK. It looks like:

```json
{"correlation_id":"abc123xyz","device_session_id":"...","fraud_merchant_id":"..."}
```

Treat device data as an opaque provider value and handle it according to your application privacy and retention requirements. The wrapper makes no PII classification.

## Why it matters

Your server can pass deviceData to the configured Braintree fraud tooling. The composable does not enable merchant fraud settings or perform server-side analysis.

The library does not establish which fraud protections apply to a transaction.

## Basic usage

```vue
<script setup lang="ts">
import { useBraintreeClient, useDataCollector } from 'braintree-vue3'

const { client } = useBraintreeClient('sandbox_xxx')
const { deviceData, isReady, error } = useDataCollector({ client })

async function checkout(nonce: string) {
  await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({
      paymentMethodNonce: nonce,
      deviceData: deviceData.value, // include in every transaction
    }),
  })
}
</script>

<template>
  <div>
    <p v-if="!isReady">Initializing fraud protection...</p>
    <p v-if="error">{{ error.message }}</p>
    <slot />
  </div>
</template>
```

## Reactive `deviceData`

`deviceData` is a `Ref<string | null>`. It is `null` until the Data Collector initializes, then contains the device fingerprint string.

```typescript
const { deviceData, isReady } = useDataCollector({ client })
// deviceData.value === null before ready
// deviceData.value === '{"correlation_id":"..."}' once ready
```

## Synchronous accessor: `getDeviceData()`

If you need to read the device data imperatively in an event handler:

```typescript
const { getDeviceData } = useDataCollector({ client })

async function handleSubmit() {
  const data = getDeviceData() // returns string | null
  await sendToServer({ nonce, deviceData: data })
}
```

## Risk correlation ID

Optionally pass a `riskCorrelationId` to link the device data collection to a specific transaction on your server:

```typescript
const { deviceData } = useDataCollector({
  client,
  riskCorrelationId: 'order_123abc',
})
```

## When to send `deviceData`

Use deviceData in server requests where your Braintree integration requires it. Initialize the Data Collector as early as possible (when the page loads) to maximize the signal collection window.

```javascript
// Server-side (Node.js example)
gateway.transaction.sale({
  amount: '10.00',
  paymentMethodNonce: req.body.nonce,
  deviceData: req.body.deviceData, // always include
  options: { submitForSettlement: true },
})
```

---

Adapted from [offline-agency/braintree-vue3, docs/guide/data-collector.md](https://github.com/offline-agency/braintree-vue3/blob/ff99c39e9fd45e6fe43440f8c3b7bcda58e01775/docs/guide/data-collector.md) at `ff99c39e9fd45e6fe43440f8c3b7bcda58e01775`. The manifest declares MIT; this snapshot contains no standalone LICENSE file. Site adaptations are recorded in [integration notes](/braintree-vue3/next/integration/).
