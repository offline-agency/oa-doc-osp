# Hosted Fields

Hosted Fields embed PCI-scoped iframes into your page for card number, CVV, and expiration date. No raw card data ever touches your JavaScript — the Braintree SDK tokenizes it server-side and returns a payment method nonce.

## Basic setup

```vue
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { BraintreeProvider, BraintreeHostedFields } from 'braintree-vue3'

const cardForm = useTemplateRef('cardForm')

const fields = {
  number: { container: '#bt-number', placeholder: '4111 1111 1111 1111' },
  cvv: { container: '#bt-cvv', placeholder: '123' },
  expirationDate: { container: '#bt-expiry', placeholder: 'MM/YY' },
}

async function submit() {
  const payload = await cardForm.value!.tokenize()
  console.log(payload.nonce) // send to server
}
</script>

<template>
  <BraintreeProvider authorization="sandbox_xxx">
    <BraintreeHostedFields ref="cardForm" :fields="fields">
      <label>Card number <div id="bt-number" class="hosted-field" /></label>
      <label>CVV <div id="bt-cvv" class="hosted-field" /></label>
      <label>Expiry <div id="bt-expiry" class="hosted-field" /></label>
    </BraintreeHostedFields>
    <button @click="submit">Pay</button>
  </BraintreeProvider>
</template>
```

## Field configuration options

Each field key maps to a `HostedFieldsField` object:

| Option | Type | Description |
|---|---|---|
| `container` | `string \| HTMLElement` | CSS selector or DOM element for the iframe |
| `placeholder` | `string` | Placeholder text shown in the iframe |
| `type` | `string` | Input type hint (e.g. `"tel"` for number pads on mobile) |
| `formatInput` | `boolean` | Auto-format card number with spaces (default `true`) |
| `maskInput` | `boolean \| { character, showLastFour }` | Mask entered digits |
| `supportedCardBrands` | `Record<string, boolean>` | Restrict accepted card brands |
| `prefill` | `string` | Pre-fill the field value (testing only) |
| `minlength` / `maxlength` | `number` | HTML attribute hints |

```typescript
const fields = {
  number: {
    container: '#bt-number',
    placeholder: '4111 1111 1111 1111',
    supportedCardBrands: { visa: true, mastercard: true, 'american-express': false },
  },
  cvv: { container: '#bt-cvv', placeholder: '123' },
  expirationDate: { container: '#bt-expiry', placeholder: 'MM/YY' },
  postalCode: { container: '#bt-postal', placeholder: '12345' },
}
```

## Styling iframes

Pass a `styles` prop (or `styles` option to `useHostedFields`) to style the content inside the Braintree iframes:

```typescript
const styles = {
  'input': {
    'font-size': '16px',
    'font-family': 'sans-serif',
    'color': '#1a1a1a',
  },
  ':focus': { 'color': '#0070f3' },
  '.invalid': { 'color': '#e53e3e' },
  '.valid': { 'color': '#38a169' },
  '@media screen and (max-width: 700px)': {
    'input': { 'font-size': '14px' },
  },
}
```

```html
<BraintreeHostedFields :fields="fields" :styles="styles">
  ...
</BraintreeHostedFields>
```

## Real-time card type and validity feedback

The `BraintreeHostedFields` component exposes `cardType` and `isReady` via `defineExpose`. Access them through the template ref:

```vue
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { BraintreeProvider, BraintreeHostedFields } from 'braintree-vue3'

const cardForm = useTemplateRef<InstanceType<typeof BraintreeHostedFields>>('cardForm')
</script>

<template>
  <BraintreeProvider authorization="sandbox_xxx">
    <BraintreeHostedFields ref="cardForm" :fields="fields">
      ...
    </BraintreeHostedFields>
    <p v-if="cardForm?.cardType">Card type: {{ cardForm.cardType }}</p>
  </BraintreeProvider>
</template>
```

Or use `useHostedFields` directly for reactive access:

```vue
<script setup lang="ts">
import { shallowRef } from 'vue'
import { useBraintreeClient, useHostedFields } from 'braintree-vue3'

const { client } = useBraintreeClient('sandbox_xxx')
const { cardType, isReady, tokenize, clear } = useHostedFields({ client, fields })
</script>
```

## Tokenizing with billing address

```typescript
const payload = await cardForm.value!.tokenize({
  cardholderName: 'John Doe',
  billingAddress: {
    streetAddress: '123 Main St',
    locality: 'Chicago',
    region: 'IL',
    postalCode: '60601',
    countryCodeAlpha2: 'US',
  },
})
```

## Clearing fields after a successful transaction

Call `clear()` to reset all configured hosted fields (e.g. after a successful payment):

```typescript
async function handleSubmit() {
  const payload = await cardForm.value!.tokenize()
  await sendToServer(payload.nonce)
  cardForm.value!.clear() // resets all fields
}
```

## Using `useHostedFields` directly (without BraintreeProvider)

```vue
<script setup lang="ts">
import { useBraintreeClient, useHostedFields } from 'braintree-vue3'

const { client, isReady: clientReady } = useBraintreeClient('sandbox_xxx')

const fields = {
  number: { container: '#bt-number' },
  cvv: { container: '#bt-cvv' },
  expirationDate: { container: '#bt-expiry' },
}

const { isReady, cardType, error, tokenize, clear } = useHostedFields({ client, fields })
</script>

<template>
  <div>
    <div id="bt-number" />
    <div id="bt-cvv" />
    <div id="bt-expiry" />
    <button :disabled="!isReady" @click="tokenize()">Pay</button>
    <p v-if="error">{{ error.message }}</p>
  </div>
</template>
```
