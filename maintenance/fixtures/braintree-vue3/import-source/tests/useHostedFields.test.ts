import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick, shallowRef } from 'vue'
import { hostedFields } from 'braintree-web'
import { useHostedFields } from '../src/composables/useHostedFields'
import { withSetup } from './setup'

const mockCreate = vi.mocked(hostedFields.create)

const testFields = {
  number: { container: '#bt-number' },
  cvv: { container: '#bt-cvv' },
  expirationDate: { container: '#bt-expiry' },
}

beforeEach(() => {
  vi.clearAllMocks()
  mockCreate.mockResolvedValue({
    on: vi.fn(),
    tokenize: vi.fn().mockResolvedValue({ nonce: 'test-nonce', type: 'CreditCard', details: {} }),
    clear: vi.fn(),
    teardown: vi.fn().mockResolvedValue(undefined),
  } as any)
})

describe('useHostedFields', () => {
  it('stays idle when client is null', async () => {
    const client = shallowRef(null)
    const { result } = await withSetup(() => useHostedFields({ client, fields: testFields }))
    expect(result.isReady.value).toBe(false)
    expect(mockCreate).not.toHaveBeenCalled()
  })

  it('creates hostedFields instance when client becomes available', async () => {
    const client = shallowRef<any>(null)
    const { result } = await withSetup(() => useHostedFields({ client, fields: testFields }))
    client.value = { teardown: vi.fn() }
    await nextTick()
    await nextTick()
    expect(mockCreate).toHaveBeenCalled()
    expect(result.isReady.value).toBe(true)
  })

  it('transitions to error when hostedFields.create() rejects', async () => {
    mockCreate.mockRejectedValueOnce(new Error('init failed'))
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => useHostedFields({ client, fields: testFields }))
    await nextTick()
    expect(result.error.value?.message).toBe('init failed')
    expect(result.isReady.value).toBe(false)
  })

  it('calls teardown() on unmount', async () => {
    const mockTeardown = vi.fn().mockResolvedValue(undefined)
    mockCreate.mockResolvedValueOnce({
      on: vi.fn(),
      tokenize: vi.fn(),
      clear: vi.fn(),
      teardown: mockTeardown,
    } as any)
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { wrapper } = await withSetup(() => useHostedFields({ client, fields: testFields }))
    await nextTick()
    wrapper.unmount()
    await nextTick()
    expect(mockTeardown).toHaveBeenCalled()
  })

  it('tokenize() throws when not initialized', async () => {
    const client = shallowRef(null)
    const { result } = await withSetup(() => useHostedFields({ client, fields: testFields }))
    await expect(result.tokenize()).rejects.toThrow('useHostedFields')
  })

  it('tokenize() returns payload from braintree-web', async () => {
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => useHostedFields({ client, fields: testFields }))
    await nextTick()
    const payload = await result.tokenize()
    expect(payload.nonce).toBe('test-nonce')
    expect(payload.type).toBe('CreditCard')
  })

  it('clear() calls instance.clear() for each configured field', async () => {
    const mockClear = vi.fn()
    mockCreate.mockResolvedValueOnce({
      on: vi.fn(),
      tokenize: vi.fn(),
      clear: mockClear,
      teardown: vi.fn().mockResolvedValue(undefined),
    } as any)
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => useHostedFields({ client, fields: testFields }))
    await nextTick()
    result.clear()
    expect(mockClear).toHaveBeenCalledTimes(Object.keys(testFields).length)
    expect(mockClear).toHaveBeenCalledWith('number')
    expect(mockClear).toHaveBeenCalledWith('cvv')
    expect(mockClear).toHaveBeenCalledWith('expirationDate')
  })

  it('cardType updates on cardTypeChange event', async () => {
    let cardTypeChangeHandler: ((e: any) => void) | undefined
    const mockOn = vi.fn().mockImplementation((event: string, handler: (e: any) => void) => {
      if (event === 'cardTypeChange') cardTypeChangeHandler = handler
    })
    mockCreate.mockResolvedValueOnce({
      on: mockOn,
      tokenize: vi.fn(),
      clear: vi.fn(),
      teardown: vi.fn().mockResolvedValue(undefined),
    } as any)
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => useHostedFields({ client, fields: testFields }))
    await nextTick()
    cardTypeChangeHandler!({ cards: [{ type: 'visa' }] })
    expect(result.cardType.value).toBe('visa')
    cardTypeChangeHandler!({ cards: [] })
    expect(result.cardType.value).toBeNull()
  })

  it('validity: cardType is null when multiple card types match', async () => {
    let cardTypeChangeHandler: ((e: any) => void) | undefined
    const mockOn = vi.fn().mockImplementation((event: string, handler: (e: any) => void) => {
      if (event === 'cardTypeChange') cardTypeChangeHandler = handler
    })
    mockCreate.mockResolvedValueOnce({
      on: mockOn,
      tokenize: vi.fn(),
      clear: vi.fn(),
      teardown: vi.fn().mockResolvedValue(undefined),
    } as any)
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => useHostedFields({ client, fields: testFields }))
    await nextTick()
    cardTypeChangeHandler!({ cards: [{ type: 'visa' }, { type: 'mastercard' }] })
    expect(result.cardType.value).toBeNull()
  })
})
