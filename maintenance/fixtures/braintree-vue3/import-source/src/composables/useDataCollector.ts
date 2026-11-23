import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { dataCollector } from 'braintree-web'
import type { Client, DataCollector } from 'braintree-web'
import type { Ref, ShallowRef } from 'vue'

export interface UseDataCollectorOptions {
  client: ShallowRef<Client | null>
  riskCorrelationId?: string
}

export interface UseDataCollectorReturn {
  instance: ShallowRef<DataCollector | null>
  isReady: Ref<boolean>
  error: Ref<Error | null>
  /** Reactive device fingerprint string — pass this to your server with every transaction. */
  deviceData: Ref<string | null>
  /** Synchronous accessor — returns current deviceData or null. */
  getDeviceData: () => string | null
}

export function useDataCollector(opts: UseDataCollectorOptions): UseDataCollectorReturn {
  const instance = shallowRef<DataCollector | null>(null)
  const isReady = ref(false)
  const error = ref<Error | null>(null)
  const deviceData = ref<string | null>(null)

  onBeforeUnmount(() => {
    if (instance.value) {
      try {
        instance.value.teardown(() => { /* no-op */ })
      } catch { /* swallow */ }
      instance.value = null
      isReady.value = false
      deviceData.value = null
    }
  })

  watch(
    () => opts.client.value,
    async (clientInstance) => {
      if (instance.value) {
        try { instance.value.teardown(() => { /* no-op */ }) } catch { /* ignore */ }
        instance.value = null
        isReady.value = false
        deviceData.value = null
      }

      if (!clientInstance) return

      error.value = null
      try {
        const dc = await dataCollector.create({
          client: clientInstance,
          ...(opts.riskCorrelationId ? { riskCorrelationId: opts.riskCorrelationId } : {}),
        })
        deviceData.value = dc.deviceData ?? null
        instance.value = dc
        isReady.value = true
      } catch (e) {
        error.value = e instanceof Error ? e : new Error(String(e))
        instance.value = null
        isReady.value = false
      }
    },
    { immediate: true },
  )

  function getDeviceData(): string | null {
    return instance.value?.deviceData ?? null
  }

  return { instance, isReady, error, deviceData, getDeviceData }
}
