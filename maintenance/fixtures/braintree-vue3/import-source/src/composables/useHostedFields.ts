import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { hostedFields } from 'braintree-web'
import type {
  Client,
  HostedFields,
  HostedFieldFieldOptions,
  HostedFieldsTokenizePayload,
} from 'braintree-web'
import type { Ref, ShallowRef } from 'vue'

export interface UseHostedFieldsOptions {
  client: ShallowRef<Client | null>
  fields: HostedFieldFieldOptions
  styles?: Record<string, unknown>
}

export interface UseHostedFieldsReturn {
  instance: ShallowRef<HostedFields | null>
  isReady: Ref<boolean>
  cardType: Ref<string | null>
  error: Ref<Error | null>
  tokenize: (options?: {
    vault?: boolean
    fieldsToTokenize?: string[]
    cardholderName?: string
    billingAddress?: Record<string, string>
  }) => Promise<HostedFieldsTokenizePayload>
  clear: () => void
}

export function useHostedFields(opts: UseHostedFieldsOptions): UseHostedFieldsReturn {
  const instance = shallowRef<HostedFields | null>(null)
  const isReady = ref(false)
  const cardType = ref<string | null>(null)
  const error = ref<Error | null>(null)

  // Register teardown synchronously before any async work
  onBeforeUnmount(async () => {
    if (instance.value) {
      try {
        await instance.value.teardown()
      } catch {
        // swallow
      } finally {
        instance.value = null
        isReady.value = false
      }
    }
  })

  watch(
    () => opts.client.value,
    async (clientInstance) => {
      // Tear down existing instance before creating a new one
      if (instance.value) {
        try {
          await instance.value.teardown()
        } catch { /* ignore */ }
        instance.value = null
        isReady.value = false
        cardType.value = null
      }

      if (!clientInstance) return

      error.value = null
      try {
        const hf = await hostedFields.create({
          client: clientInstance,
          fields: opts.fields,
          styles: opts.styles as Record<string, Record<string, string>> | undefined,
        })

        hf.on('cardTypeChange', (event) => {
          cardType.value = event.cards.length === 1 ? event.cards[0].type : null
        })

        instance.value = hf
        isReady.value = true
      } catch (e) {
        error.value = e instanceof Error ? e : new Error(String(e))
        instance.value = null
        isReady.value = false
      }
    },
    { immediate: true },
  )

  async function tokenize(options?: {
    vault?: boolean
    fieldsToTokenize?: string[]
    cardholderName?: string
    billingAddress?: Record<string, string>
  }): Promise<HostedFieldsTokenizePayload> {
    if (!instance.value) {
      throw new Error('useHostedFields: instance not ready — call tokenize() only when isReady is true')
    }
    return instance.value.tokenize(
      options as Parameters<HostedFields['tokenize']>[0],
    ) as unknown as Promise<HostedFieldsTokenizePayload>
  }

  function clear(): void {
    if (!instance.value) return
    for (const key of Object.keys(opts.fields)) {
      instance.value.clear(key as Parameters<HostedFields['clear']>[0])
    }
  }

  return { instance, isReady, cardType, error, tokenize, clear }
}
