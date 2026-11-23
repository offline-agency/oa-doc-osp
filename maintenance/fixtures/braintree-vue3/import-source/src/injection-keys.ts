import { inject } from 'vue'
import type { InjectionKey, Ref, ShallowRef } from 'vue'
import type { Client } from 'braintree-web'

/**
 * The shape of the context provided by a component that calls useBraintreeClient().
 * Descendants inject this via inject(BraintreeClientKey).
 */
export interface BraintreeContext {
  /** The braintree-web Client instance once initialized. ShallowRef avoids deep reactivity overhead on SDK objects. */
  client: ShallowRef<Client | null>
  /** True once the client has been successfully created. */
  isReady: Ref<boolean>
  /** Non-null if client creation failed. */
  error: Ref<Error | null>
}

/**
 * Typed injection key for the Braintree client context.
 *
 * Usage (provider): provide(BraintreeClientKey, { client, isReady, error })
 * Usage (consumer): const ctx = inject(BraintreeClientKey)
 */
export const BraintreeClientKey: InjectionKey<BraintreeContext> =
  Symbol('BraintreeClientKey')

/**
 * Inject the Braintree client context provided by a parent useBraintreeClient() call.
 * Throws a descriptive error when called outside a provider component.
 */
export function injectBraintreeClient(): BraintreeContext {
  const ctx = inject(BraintreeClientKey)
  if (!ctx) {
    throw new Error(
      '[braintree-vue3] injectBraintreeClient() was called outside of a component that provides BraintreeClientKey. ' +
      'Make sure to wrap your component tree with BraintreeProvider or call useBraintreeClient() in a parent component.',
    )
  }
  return ctx
}
