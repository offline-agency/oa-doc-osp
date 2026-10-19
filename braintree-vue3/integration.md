---
title: Braintree Vue 3 integration notes
description: Source-based guide to the unreleased Vue 3 Braintree composables, hosted fields and lifecycle limits.
sourceCommit: ff99c39e9fd45e6fe43440f8c3b7bcda58e01775
permalink: /braintree-vue3/integration/
---

# Braintree Vue 3 integration notes

Vue 3 composables and two renderless components around the Braintree Web SDK. This is a **source-only, unreleased guide**, pinned to `ff99c39e9fd45e6fe43440f8c3b7bcda58e01775` on `master`. On 16 October 2026 GitHub had no releases or tags and the public npm registry returned 404 for `braintree-vue3`. The manifest's `0.1.0` is not a verified published version.

[Pinned source](https://github.com/offline-agency/braintree-vue3/tree/ff99c39e9fd45e6fe43440f8c3b7bcda58e01775) · [Manifest](https://github.com/offline-agency/braintree-vue3/blob/ff99c39e9fd45e6fe43440f8c3b7bcda58e01775/package.json) · [Exports](https://github.com/offline-agency/braintree-vue3/blob/ff99c39e9fd45e6fe43440f8c3b7bcda58e01775/src/index.ts)

## Requirements and obtaining the source

| Requirement | Declared constraint |
| --- | --- |
| Vue peer dependency | `^3.3.0` |
| Braintree Web peer dependency | `^3.x` |
| Development SDK | `^3.138.0` |
| Development TypeScript declarations | `@types/braintree-web ^3.96.17` |

The repository declares no Node engine and contains no dependency lockfile. Its Vite 6 / TypeScript build has separate development requirements; the peer ranges alone do not establish a tested compatibility matrix. `src/types.ts` augments SDK declarations for BIN data and supported card brands.

The README's normal `npm install braintree-vue3` command cannot currently obtain this package. For evaluation, obtain the pinned source in a separate directory:

```bash
git clone https://github.com/offline-agency/braintree-vue3.git
cd braintree-vue3
git checkout --detach ff99c39e9fd45e6fe43440f8c3b7bcda58e01775
# Resolve and review the development dependencies in this isolated checkout.
npm install
npm run build
```

Then install that built local directory into a separate Vue application, together with compatible `vue` and `braintree-web` dependencies. This upstream source-build recipe has not been run as written; resolving unlocked dependencies can change its result. See the toolchain findings below for the separate isolated verification attempt. Installing the Git URL alone does not build the missing `dist` files: the manifest has `prepublishOnly`, not `prepare`. The intended build emits ESM, CommonJS and TypeScript declaration files under `dist`; there is no Vue plugin to register and no bundled checkout UI or stylesheet.

## Hosted fields example

The following application component assumes the package has been built locally. Its parent obtains a **client token from its own backend before mounting this component** and passes it as `clientToken`. A client token is browser authorization; merchant private keys and server SDK credentials must stay on the server. The wrapper does not generate tokens, submit transactions or implement your server endpoint.

```vue
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
```

Use unique field containers for each mounted checkout. The SDK renders its fields into those containers; the wrapper does not render inputs. Customize the SDK's field styles through `styles`, and container layout through application CSS. The nonce is a tokenization result, not confirmation that a payment succeeded. Neither this example nor the documentation fixture makes a payment.

## Public API

Call composables synchronously in a Vue component's `setup`. The client initializes on mount. Other composables watch the supplied `ShallowRef<Client | null>` immediately, create an SDK instance when a client appears, and attempt teardown when it changes or the component unmounts.

| Export | Input and returned operations |
| --- | --- |
| `useBraintreeClient(authorization: string)` | Returns `client`, `isReady`, `isLoading`, `error`, `initialize()`, `reinitialize()`; provides context to descendants. |
| `useHostedFields({ client, fields, styles? })` | Returns `instance`, `isReady`, `cardType`, `error`, `tokenize(options?)`, `clear()`. Tokenization options: `vault`, `fieldsToTokenize`, `cardholderName`, `billingAddress`. |
| `usePayPalCheckout({ client, merchantAccountId? })` | Returns common instance/status/error refs plus `loadPayPalSDK(options?)`, `createPayment(options)`, `tokenizePayment(tokenizeData)`. Arguments follow SDK `PayPalCheckoutCreatePaymentOptions` / `PayPalCheckoutTokenizationOptions`. No PayPal button is rendered. |
| `useVenmo({ client, ...options })` | Options: `allowDesktop`, `allowDesktopWebLogin`, `allowNewBrowserTab`, `profileId`, `paymentMethodUsage` (`single_use` or `multi_use`), `extraOptions`. Returns common refs plus `isBrowserSupported` and `tokenize()`. `extraOptions` is spread last and can override other SDK options. |
| `useThreeDSecure({ client, version? })` | Version defaults to `2`; accepts `1`, `'1'`, `2`, `'2'`, `'2-bootstrap3-modal'`, `'2-inline-iframe'`. Returns common refs plus `verifyCard(options)` using SDK `ThreeDSecureVerifyOptions`, and `cancelVerifyCard()` which always returns `null`. |
| `useDataCollector({ client, riskCorrelationId? })` | Returns common refs plus reactive `deviceData` and `getDeviceData()`, each nullable before creation. |

`BraintreeClientKey`, `injectBraintreeClient()` and the `BraintreeContext` type are exported. The injection helper throws outside a provider. The exported options/return interfaces are listed in the [pinned entry point](https://github.com/offline-agency/braintree-vue3/blob/ff99c39e9fd45e6fe43440f8c3b7bcda58e01775/src/index.ts).

### Renderless components

`BraintreeProvider` requires `authorization: string`, renders its default slot without slot props, and exposes `client`, `isReady`, `isLoading`, `error`, `reinitialize` through a template ref. It provides the context to descendants.

`BraintreeHostedFields` must be a descendant of a provider. It requires `fields`, accepts optional `styles`, renders a default slot without slot props, and exposes `instance`, `isReady`, `cardType`, `error`, `tokenize`, `clear`. Neither component declares emitted events; observe refs or call exposed methods instead. Keep the actual container elements in the slot or another mounted part of your application.

## Errors and operational limits

Creation failures populate the composable's `error` ref and leave `isReady` false; they are caught internally. Operation failures such as `tokenize()` and `verifyCard()` propagate to the caller and need `try/catch`; they do not automatically populate that ref. Calling an operation before its SDK instance exists throws a not-ready error. `clear()` is a no-op before readiness; it clears each configured field without awaiting individual clear calls.

Authorization is captured as a plain string. Changing a provider prop does not change it, and `reinitialize()` uses the same captured authorization. Remount with a fresh token when authorization changes. Options such as fields/styles are not watched independently. The source has no cancellation/generation guard for asynchronous initialization: do not assume a pending SDK creation is cancelled by unmounting or by replacing the client. Teardown errors are generally swallowed. Avoid overlapping initialization and token rotation flows.

Run browser integrations on the client after mount, with application-specific loading/error handling and the relevant Braintree merchant features enabled. SSR, actual provider availability, PayPal/Venmo browser flows, 3D Secure challenges, device collection and server transaction handling were not verified here. No accessibility, compliance or payment-acceptance guarantee follows from using this wrapper.

## Verification and license

The pinned repository has Vitest/jsdom tests with mocked SDK boundaries, plus typecheck/build/publint/attw scripts and CI workflow definitions. Their presence is not evidence of a passing remote run. This guide's local Node 24 fixture executed the actual client/hosted-fields source with synthetic Vue lifecycle and SDK boundaries: initialization, duplicate-call guard, reinitialization, initialization failure, not-ready failure and mock tokenization passed. It made no network request and exercised no payment provider. The full upstream suite and package build were not run. The separate TypeDoc/typecheck attempt is recorded in the import findings.

The manifest declares MIT; this source snapshot contains no standalone `LICENSE` file. Check licensing material before redistribution.
