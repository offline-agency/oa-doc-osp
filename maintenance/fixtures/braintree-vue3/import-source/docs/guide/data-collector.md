# Data Collector

The Data Collector module collects device fingerprint and fraud signals from the browser and returns a `deviceData` string. Passing `deviceData` to your server-side transaction call enables Braintree's fraud detection tools (Kount).

## What `deviceData` is

`deviceData` is a JSON string containing correlation IDs and device signals collected by the Braintree SDK. It looks like:

```json
{"correlation_id":"abc123xyz","device_session_id":"...","fraud_merchant_id":"..."}
```

It is **not** sensitive PII — it is opaque to the frontend. You pass it verbatim to your server.

## Why it matters

When you include `deviceData` in a server-side `transaction.sale()` call, Braintree's Advanced Fraud Tools (Kount) can analyze the device fingerprint alongside the payment data to detect high-risk transactions before they're submitted to the card network.

Without `deviceData`, Braintree fraud protection still applies, but device-level signals are not included.

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

Always include `deviceData` in every server-side `transaction.sale()` or `paymentMethod.create()` call. Initialize the Data Collector as early as possible (when the page loads) to maximize the signal collection window.

```javascript
// Server-side (Node.js example)
gateway.transaction.sale({
  amount: '10.00',
  paymentMethodNonce: req.body.nonce,
  deviceData: req.body.deviceData, // always include
  options: { submitForSettlement: true },
})
```
