import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { threeDSecure } from 'braintree-web'
import type { Client, ThreeDSecure, ThreeDSecureVerifyPayload } from 'braintree-web'
import type { ThreeDSecureVerifyOptions } from 'braintree-web/three-d-secure'
import type { Ref, ShallowRef } from 'vue'

export type ThreeDSecureVersion = 1 | '1' | 2 | '2' | '2-bootstrap3-modal' | '2-inline-iframe'

export interface UseThreeDSecureOptions {
  client: ShallowRef<Client | null>
  /** Defaults to 2. */
  version?: ThreeDSecureVersion
}

export interface UseThreeDSecureReturn {
  instance: ShallowRef<ThreeDSecure | null>
  isReady: Ref<boolean>
  error: Ref<Error | null>
  verifyCard: (options: ThreeDSecureVerifyOptions) => Promise<ThreeDSecureVerifyPayload>
  cancelVerifyCard: () => null
}

export function useThreeDSecure(opts: UseThreeDSecureOptions): UseThreeDSecureReturn {
  const instance = shallowRef<ThreeDSecure | null>(null)
  const isReady = ref(false)
  const error = ref<Error | null>(null)

  onBeforeUnmount(async () => {
    if (instance.value) {
      try { await instance.value.teardown() } catch { /* swallow */ }
      finally {
        instance.value = null
        isReady.value = false
      }
    }
  })

  watch(
    () => opts.client.value,
    async (clientInstance) => {
      if (instance.value) {
        try { await instance.value.teardown() } catch { /* ignore */ }
        instance.value = null
        isReady.value = false
      }

      if (!clientInstance) return

      error.value = null
      try {
        instance.value = await threeDSecure.create({
          client: clientInstance,
          version: opts.version ?? 2,
        })
        isReady.value = true
      } catch (e) {
        error.value = e instanceof Error ? e : new Error(String(e))
        instance.value = null
        isReady.value = false
      }
    },
    { immediate: true },
  )

  async function verifyCard(options: ThreeDSecureVerifyOptions): Promise<ThreeDSecureVerifyPayload> {
    if (!instance.value) throw new Error('useThreeDSecure: not ready')
    return instance.value.verifyCard(options)
  }

  function cancelVerifyCard(): null {
    if (!instance.value) return null
    // @types/braintree-web requires a callback; pass a no-op to satisfy the type.
    instance.value.cancelVerifyCard(() => { /* no-op */ })
    return null
  }

  return { instance, isReady, error, verifyCard, cancelVerifyCard }
}
