import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick, shallowRef } from 'vue'
import { paypalCheckout } from 'braintree-web'
import { usePayPalCheckout } from '../src/composables/usePayPalCheckout'
import { withSetup } from './setup'

const mockCreate = vi.mocked(paypalCheckout.create)

const mockInstance = {
  loadPayPalSDK: vi.fn().mockResolvedValue(undefined),
  createPayment: vi.fn().mockResolvedValue('PAYID-TEST'),
  tokenizePayment: vi.fn().mockResolvedValue({ nonce: 'paypal-nonce', type: 'PayPalAccount', details: {} }),
  teardown: vi.fn().mockResolvedValue(undefined),
}

beforeEach(() => {
  vi.clearAllMocks()
  mockCreate.mockResolvedValue({ ...mockInstance } as any)
})

describe('usePayPalCheckout', () => {
  it('creates paypalCheckout instance and loads PayPal SDK', async () => {
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => usePayPalCheckout({ client }))
    await nextTick()
    expect(mockCreate).toHaveBeenCalled()
    expect(result.isReady.value).toBe(true)
  })

  it('transitions to error when paypalCheckout.create() rejects', async () => {
    mockCreate.mockRejectedValueOnce(new Error('create failed'))
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => usePayPalCheckout({ client }))
    await nextTick()
    expect(result.error.value?.message).toBe('create failed')
    expect(result.isReady.value).toBe(false)
  })

  it('transitions to error when loadPayPalSDK() rejects', async () => {
    const failLoad = vi.fn().mockRejectedValueOnce(new Error('sdk load failed'))
    mockCreate.mockResolvedValueOnce({
      loadPayPalSDK: failLoad,
      createPayment: vi.fn(),
      tokenizePayment: vi.fn(),
      teardown: vi.fn().mockResolvedValue(undefined),
    } as any)
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => usePayPalCheckout({ client }))
    await nextTick()
    await expect(result.loadPayPalSDK()).rejects.toThrow('sdk load failed')
  })

  it('createPayment() proxies to instance.createPayment()', async () => {
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => usePayPalCheckout({ client }))
    await nextTick()
    const id = await result.createPayment({ flow: 'checkout', amount: '10.00', currency: 'USD' } as any)
    expect(id).toBe('PAYID-TEST')
  })

  it('tokenizePayment() returns the nonce payload', async () => {
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => usePayPalCheckout({ client }))
    await nextTick()
    const payload = await result.tokenizePayment({ payerID: 'PAYER', paymentID: 'PAY', billingToken: null, facilitatorAccessToken: null, orderID: null, paymentToken: null, subscriptionID: null, authCode: null } as any)
    expect((payload as any).nonce).toBe('paypal-nonce')
  })

  it('tears down and resets when client becomes null', async () => {
    const mockTeardown = vi.fn().mockResolvedValue(undefined)
    mockCreate.mockResolvedValueOnce({
      loadPayPalSDK: vi.fn(),
      createPayment: vi.fn(),
      tokenizePayment: vi.fn(),
      teardown: mockTeardown,
    } as any)
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => usePayPalCheckout({ client }))
    await nextTick()
    expect(result.isReady.value).toBe(true)
    client.value = null
    await nextTick()
    await nextTick()
    expect(mockTeardown).toHaveBeenCalled()
    expect(result.isReady.value).toBe(false)
    expect(result.instance.value).toBeNull()
  })

  it('re-creates instance when client changes', async () => {
    const firstTeardown = vi.fn().mockResolvedValue(undefined)
    mockCreate.mockResolvedValueOnce({
      loadPayPalSDK: vi.fn(),
      createPayment: vi.fn(),
      tokenizePayment: vi.fn(),
      teardown: firstTeardown,
    } as any)
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => usePayPalCheckout({ client }))
    await nextTick()
    expect(result.isReady.value).toBe(true)
    // Change the client ref — triggers teardown of old + create new
    client.value = { teardown: vi.fn() }
    await nextTick()
    await nextTick()
    expect(firstTeardown).toHaveBeenCalled()
    expect(mockCreate).toHaveBeenCalledTimes(2)
  })

  it('calls teardown() on unmount', async () => {
    const mockTeardown = vi.fn().mockResolvedValue(undefined)
    mockCreate.mockResolvedValueOnce({
      loadPayPalSDK: vi.fn(),
      createPayment: vi.fn(),
      tokenizePayment: vi.fn(),
      teardown: mockTeardown,
    } as any)
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { wrapper } = await withSetup(() => usePayPalCheckout({ client }))
    await nextTick()
    wrapper.unmount()
    await nextTick()
    expect(mockTeardown).toHaveBeenCalled()
  })
})
