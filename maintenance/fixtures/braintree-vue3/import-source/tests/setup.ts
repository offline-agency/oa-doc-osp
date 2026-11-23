import { config } from '@vue/test-utils'
import { vi } from 'vitest'
import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'

// Suppress Vue warnings about missing provide/inject in isolated tests
config.global.config.warnHandler = (msg: string) => {
  if (msg.includes('inject') || msg.includes('provide')) return
  console.warn(msg)
}

// Default braintree-web mock — can be overridden per-test with vi.mocked()
vi.mock('braintree-web', () => ({
  client: {
    create: vi.fn().mockResolvedValue({
      teardown: vi.fn().mockResolvedValue(undefined),
      getConfiguration: vi.fn().mockReturnValue({}),
    }),
  },
  hostedFields: {
    create: vi.fn().mockResolvedValue({
      on: vi.fn(),
      tokenize: vi.fn().mockResolvedValue({ nonce: 'test-nonce', type: 'CreditCard', details: {} }),
      clear: vi.fn(),
      teardown: vi.fn().mockResolvedValue(undefined),
    }),
  },
  paypalCheckout: {
    create: vi.fn().mockResolvedValue({
      loadPayPalSDK: vi.fn().mockResolvedValue(undefined),
      createPayment: vi.fn().mockResolvedValue('PAYID-TEST'),
      tokenizePayment: vi.fn().mockResolvedValue({ nonce: 'paypal-nonce', type: 'PayPalAccount', details: {} }),
      teardown: vi.fn().mockResolvedValue(undefined),
    }),
  },
  venmo: {
    create: vi.fn().mockResolvedValue({
      isBrowserSupported: vi.fn().mockReturnValue(true),
      hasTokenizationResult: vi.fn().mockReturnValue(false),
      tokenize: vi.fn().mockResolvedValue({ nonce: 'venmo-nonce', type: 'VenmoAccount', details: { username: '@testuser' } }),
      cancelTokenization: vi.fn(),
      teardown: vi.fn().mockResolvedValue(undefined),
    }),
  },
  threeDSecure: {
    create: vi.fn().mockResolvedValue({
      on: vi.fn(),
      verifyCard: vi.fn().mockResolvedValue({
        nonce: '3ds-nonce',
        type: 'CreditCard',
        details: {},
        threeDSecureInfo: { liabilityShifted: true, liabilityShiftPossible: true },
      }),
      cancelVerifyCard: vi.fn(),
      teardown: vi.fn().mockResolvedValue(undefined),
    }),
  },
  dataCollector: {
    create: vi.fn().mockResolvedValue({
      deviceData: '{"correlation_id":"test-device-id"}',
      teardown: vi.fn().mockResolvedValue(undefined),
    }),
  },
}))

/**
 * Mount a composable in an isolated Vue component context.
 * Automatically awaits two nextTick cycles to flush async onMounted calls.
 */
export async function withSetup<T>(
  composable: () => T,
): Promise<{ result: T; wrapper: ReturnType<typeof mount> }> {
  let result!: T
  const App = defineComponent({
    setup() {
      result = composable()
      return {}
    },
    template: '<div />',
  })
  const wrapper = mount(App)
  await nextTick()
  await nextTick()
  return { result, wrapper }
}
