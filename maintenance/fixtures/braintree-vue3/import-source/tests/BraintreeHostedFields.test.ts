import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick, ref, shallowRef, provide } from 'vue'
import BraintreeHostedFields from '../src/components/BraintreeHostedFields.vue'
import { BraintreeClientKey } from '../src/injection-keys'

const testFields = {
  number: { container: '#bt-number' },
  cvv: { container: '#bt-cvv' },
  expirationDate: { container: '#bt-expiry' },
}

function mountWithProvider(props: Record<string, unknown> = {}) {
  const mockClient = shallowRef({ teardown: vi.fn() } as any)
  const mockIsReady = ref(true)
  const mockError = ref<Error | null>(null)

  const Provider = defineComponent({
    setup() {
      provide(BraintreeClientKey, {
        client: mockClient,
        isReady: mockIsReady,
        error: mockError,
      })
      return {}
    },
    components: { BraintreeHostedFields },
    template: `<BraintreeHostedFields v-bind="$attrs" />`,
    inheritAttrs: false,
  })

  return mount(Provider, { props })
}

describe('BraintreeHostedFields', () => {
  it('renders slot content', () => {
    const wrapper = mountWithProvider({ fields: testFields })
    expect(wrapper.exists()).toBe(true)
  })

  it('exposes tokenize() via defineExpose', async () => {
    const wrapper = mountWithProvider({ fields: testFields })
    await nextTick()
    await nextTick()
    const comp = wrapper.findComponent(BraintreeHostedFields)
    const vm = comp.vm as { tokenize: () => Promise<unknown> }
    expect(typeof vm.tokenize).toBe('function')
  })

  it('exposes clear() via defineExpose', async () => {
    const wrapper = mountWithProvider({ fields: testFields })
    await nextTick()
    await nextTick()
    const comp = wrapper.findComponent(BraintreeHostedFields)
    const vm = comp.vm as { clear: () => void }
    expect(typeof vm.clear).toBe('function')
  })

  it('throws BraintreeClientKey injection error when used outside provider', () => {
    expect(() =>
      mount(BraintreeHostedFields, { props: { fields: testFields } }),
    ).toThrow('[braintree-vue3]')
  })
})
