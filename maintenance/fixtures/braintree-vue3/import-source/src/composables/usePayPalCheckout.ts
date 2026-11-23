import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { paypalCheckout } from 'braintree-web'
import type { Client, PayPalCheckout, PayPalCheckoutCreatePaymentOptions } from 'braintree-web'
import type { PayPalCheckoutTokenizationOptions } from 'braintree-web/paypal-checkout'
import type { Ref, ShallowRef } from 'vue'

export interface UsePayPalCheckoutOptions {
  client: ShallowRef<Client | null>
  merchantAccountId?: string
}

export interface UsePayPalCheckoutReturn {
  instance: ShallowRef<PayPalCheckout | null>
  isReady: Ref<boolean>
  error: Ref<Error | null>
  loadPayPalSDK: (options?: Record<string, unknown>) => Promise<void>
  createPayment: (options: PayPalCheckoutCreatePaymentOptions) => Promise<string>
  tokenizePayment: (tokenizeData: PayPalCheckoutTokenizationOptions) => Promise<unknown>
}

export function usePayPalCheckout(opts: UsePayPalCheckoutOptions): UsePayPalCheckoutReturn {
  const instance = shallowRef<PayPalCheckout | null>(null)
  const isReady = ref(false)
  const error = ref<Error | null>(null)

  onBeforeUnmount(async () => {
    if (instance.value) {
      try {
        await instance.value.teardown()
      } catch { /* swallow */ }
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
        instance.value = await paypalCheckout.create({
          client: clientInstance,
          ...(opts.merchantAccountId ? { merchantAccountId: opts.merchantAccountId } : {}),
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

  async function loadPayPalSDK(options: Record<string, unknown> = {}): Promise<void> {
    if (!instance.value) throw new Error('usePayPalCheckout: not ready')
    // Returns window.paypal — callers use window.paypal directly after this resolves
    await instance.value.loadPayPalSDK(
      options as Parameters<PayPalCheckout['loadPayPalSDK']>[0],
    )
  }

  async function createPayment(options: PayPalCheckoutCreatePaymentOptions): Promise<string> {
    if (!instance.value) throw new Error('usePayPalCheckout: not ready')
    return instance.value.createPayment(options) as Promise<string>
  }

  function tokenizePayment(tokenizeData: PayPalCheckoutTokenizationOptions): Promise<unknown> {
    if (!instance.value) throw new Error('usePayPalCheckout: not ready')
    return instance.value.tokenizePayment(tokenizeData) as Promise<unknown>
  }

  return { instance, isReady, error, loadPayPalSDK, createPayment, tokenizePayment }
}
