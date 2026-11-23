# 3D Secure

3D Secure (3DS) is a protocol for additional cardholder authentication during online transactions. It shifts fraud liability to the card issuer when `liabilityShifted` is `true`.

## Important: The original nonce is consumed

When you call `verifyCard()`, the original payment method nonce from Hosted Fields tokenization is **consumed and invalidated**. You must always use the nonce returned by `verifyCard()` for the server-side transaction — even if 3DS authentication was not completed or was bypassed.

```typescript
// WRONG — using the original nonce after verifyCard()
const { nonce: originalNonce } = await cardForm.value!.tokenize()
await verifyCard({ nonce: originalNonce, amount: '10.00', bin: '411111' })
await chargeServer(originalNonce) // ❌ originalNonce is now invalid

// CORRECT — use the returned nonce
const { nonce: originalNonce, details } = await cardForm.value!.tokenize()
const result = await verifyCard({ nonce: originalNonce, amount: '10.00', bin: details.bin! })
await chargeServer(result.nonce) // ✅ use result.nonce
```

## Basic usage: chaining 3DS after Hosted Fields

```vue
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useBraintreeClient, useHostedFields, useThreeDSecure } from 'braintree-vue3'

const { client } = useBraintreeClient('sandbox_xxx')
const cardForm = useTemplateRef('cardForm')

const fields = {
  number: { container: '#bt-number' },
  cvv: { container: '#bt-cvv' },
  expirationDate: { container: '#bt-expiry' },
}

const { tokenize } = useHostedFields({ client, fields })
const { verifyCard, isReady: threeDsReady } = useThreeDSecure({ client })

async function handlePay() {
  // Step 1: Tokenize the card
  const { nonce, details } = await tokenize()

  // Step 2: Verify with 3DS — this may show a modal to the user
  const verified = await verifyCard({
    amount: '49.99',
    nonce,
    bin: details.bin!,
    onLookupComplete: (_data, next) => {
      // Called when the 3DS lookup completes but before the challenge UI shows.
      // Validate the lookup result here if needed, then call next().
      next()
    },
  })

  // Step 3: Use the new nonce from verifyCard — not the original one
  await sendToServer({ nonce: verified.nonce, liabilityShifted: verified.threeDSecureInfo?.liabilityShifted })
}
</script>

<template>
  <div>
    <div id="bt-number" />
    <div id="bt-cvv" />
    <div id="bt-expiry" />
    <button :disabled="!threeDsReady" @click="handlePay">Pay $49.99</button>
  </div>
</template>
```

## `onLookupComplete` callback

`onLookupComplete` fires after the 3DS lookup request but before any challenge UI appears. Use it to inspect the lookup data and decide whether to proceed:

```typescript
const verified = await verifyCard({
  amount: '10.00',
  nonce: originalNonce,
  bin: '411111',
  onLookupComplete: (data, next) => {
    // data contains the lookup response from Braintree
    // You MUST call next() to continue — or the verification will hang
    if (data.threeDSecureInfo?.liabilityShiftPossible) {
      next()
    } else {
      // Optionally abort — but you still need to handle the consumed nonce
      next()
    }
  },
})
```

> **Always call `next()`** — if you never call it, `verifyCard()` will never resolve.

## `liabilityShifted` — what it means for you

| Value | Meaning |
|---|---|
| `true` | The issuer authenticated the cardholder. Fraud liability shifts to the issuer. |
| `false` | Authentication was attempted but not completed (e.g. card not enrolled). Liability stays with the merchant. |

```typescript
const result = await verifyCard({ amount: '10.00', nonce, bin })
if (!result.threeDSecureInfo?.liabilityShifted) {
  // Decide: accept the risk, or reject the transaction
  console.warn('Liability did not shift — proceeding at merchant risk')
}
await chargeServer(result.nonce) // always use result.nonce regardless
```

## `cancelVerifyCard()`

Call `cancelVerifyCard()` to programmatically dismiss the 3DS challenge modal (e.g. if the user clicks a "Cancel" button in your UI):

```typescript
const { verifyCard, cancelVerifyCard } = useThreeDSecure({ client })

async function handlePay() {
  verifyCard({ amount: '10.00', nonce, bin }) // don't await yet
}

function handleCancel() {
  cancelVerifyCard() // dismisses the modal; verifyCard() resolves with partial data
}
```

## Version selection

The composable defaults to 3DS version 2. To use a specific flow:

```typescript
useThreeDSecure({ client, version: '2-inline-iframe' })
// or: '1' | 2 | '2' | '2-bootstrap3-modal' | '2-inline-iframe'
```
