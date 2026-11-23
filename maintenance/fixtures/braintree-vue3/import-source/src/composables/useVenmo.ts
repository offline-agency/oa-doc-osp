import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { venmo } from 'braintree-web'
import type { Client, Venmo, VenmoTokenizePayload } from 'braintree-web'
import type { Ref, ShallowRef } from 'vue'

export interface UseVenmoOptions {
  client: ShallowRef<Client | null>
  allowDesktop?: boolean
  allowDesktopWebLogin?: boolean
  allowNewBrowserTab?: boolean
  profileId?: string
  paymentMethodUsage?: 'multi_use' | 'single_use'
  /** Additional options passed directly to venmo.create() for properties not yet in @types/braintree-web. */
  extraOptions?: Record<string, unknown>
}

export interface UseVenmoReturn {
  instance: ShallowRef<Venmo | null>
  isReady: Ref<boolean>
  error: Ref<Error | null>
  isBrowserSupported: Ref<boolean>
  tokenize: () => Promise<VenmoTokenizePayload>
}

export function useVenmo(opts: UseVenmoOptions): UseVenmoReturn {
  const instance = shallowRef<Venmo | null>(null)
  const isReady = ref(false)
  const error = ref<Error | null>(null)
  const isBrowserSupported = ref(false)

  onBeforeUnmount(async () => {
    if (instance.value) {
      try { await instance.value.teardown() } catch { /* swallow */ }
      finally {
        instance.value = null
        isReady.value = false
        isBrowserSupported.value = false
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
        isBrowserSupported.value = false
      }

      if (!clientInstance) return

      error.value = null
      try {
        const v = await venmo.create({
          client: clientInstance,
          ...(opts.allowDesktop !== undefined ? { allowDesktop: opts.allowDesktop } : {}),
          ...(opts.allowDesktopWebLogin !== undefined ? { allowDesktopWebLogin: opts.allowDesktopWebLogin } : {}),
          ...(opts.allowNewBrowserTab !== undefined ? { allowNewBrowserTab: opts.allowNewBrowserTab } : {}),
          ...(opts.profileId !== undefined ? { profileId: opts.profileId } : {}),
          ...(opts.paymentMethodUsage !== undefined ? { paymentMethodUsage: opts.paymentMethodUsage } : {}),
          ...opts.extraOptions,
        })

        isBrowserSupported.value = v.isBrowserSupported()
        instance.value = v
        isReady.value = true
      } catch (e) {
        error.value = e instanceof Error ? e : new Error(String(e))
        instance.value = null
        isReady.value = false
      }
    },
    { immediate: true },
  )

  async function tokenize(): Promise<VenmoTokenizePayload> {
    if (!instance.value) throw new Error('useVenmo: not ready')
    return instance.value.tokenize()
  }

  return { instance, isReady, error, isBrowserSupported, tokenize }
}
