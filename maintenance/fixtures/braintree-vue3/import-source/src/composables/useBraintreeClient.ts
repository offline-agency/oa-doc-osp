import { onBeforeUnmount, onMounted, provide, ref, shallowRef } from 'vue'
import { client as braintreeClient } from 'braintree-web'
import { BraintreeClientKey } from '../injection-keys'
import type { BraintreeContext } from '../injection-keys'
import type { Client } from 'braintree-web'
import type { Ref, ShallowRef } from 'vue'

export interface UseBraintreeClientReturn {
  client: ShallowRef<Client | null>
  isReady: Ref<boolean>
  isLoading: Ref<boolean>
  error: Ref<Error | null>
  initialize: () => Promise<void>
  reinitialize: () => Promise<void>
}

export function useBraintreeClient(authorization: string): UseBraintreeClientReturn {
  const client = shallowRef<Client | null>(null)
  const isReady = ref(false)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  // Provide context to descendants synchronously — refs are reactive so
  // descendants that inject will see updates when client / isReady / error change.
  const context: BraintreeContext = { client, isReady, error }
  provide(BraintreeClientKey, context)

  // Register lifecycle hooks synchronously (before any await)
  onMounted(async () => {
    await initialize()
  })

  onBeforeUnmount(() => {
    if (client.value) {
      // @types/braintree-web requires a callback but the SDK also returns a Promise —
      // the types are inaccurate; we use a no-op callback to satisfy them.
      try {
        client.value.teardown(() => { /* no-op */ })
      } catch { /* swallow */ }
      client.value = null
      isReady.value = false
    }
  })

  async function initialize(): Promise<void> {
    if (isLoading.value || isReady.value) return

    isLoading.value = true
    error.value = null

    try {
      client.value = await braintreeClient.create({ authorization })
      isReady.value = true
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
      client.value = null
      isReady.value = false
    } finally {
      isLoading.value = false
    }
  }

  async function reinitialize(): Promise<void> {
    if (client.value) {
      try {
        client.value.teardown(() => { /* no-op */ })
      } catch { /* swallow */ }
      client.value = null
      isReady.value = false
      error.value = null
    }
    await initialize()
  }

  return { client, isReady, isLoading, error, initialize, reinitialize }
}
