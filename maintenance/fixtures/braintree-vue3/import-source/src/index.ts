// IMPORTANT: import types.ts first — applies module augmentations to
// braintree-web's declarations before any composable types are resolved.
import './types'

// Injection key + context interface + guard
export { BraintreeClientKey, injectBraintreeClient } from './injection-keys'
export type { BraintreeContext } from './injection-keys'

// Components
export { default as BraintreeProvider } from './components/BraintreeProvider.vue'
export { default as BraintreeHostedFields } from './components/BraintreeHostedFields.vue'

// Composables
export { useBraintreeClient } from './composables/useBraintreeClient'
export { useHostedFields } from './composables/useHostedFields'
export { usePayPalCheckout } from './composables/usePayPalCheckout'
export { useVenmo } from './composables/useVenmo'
export { useThreeDSecure } from './composables/useThreeDSecure'
export { useDataCollector } from './composables/useDataCollector'

// Options + return type interfaces for consumer typing
export type { UseBraintreeClientReturn } from './composables/useBraintreeClient'
export type { UseHostedFieldsOptions, UseHostedFieldsReturn } from './composables/useHostedFields'
export type { UsePayPalCheckoutOptions, UsePayPalCheckoutReturn } from './composables/usePayPalCheckout'
export type { UseVenmoOptions, UseVenmoReturn } from './composables/useVenmo'
export type {
  UseThreeDSecureOptions,
  UseThreeDSecureReturn,
  ThreeDSecureVersion,
} from './composables/useThreeDSecure'
export type { UseDataCollectorOptions, UseDataCollectorReturn } from './composables/useDataCollector'
