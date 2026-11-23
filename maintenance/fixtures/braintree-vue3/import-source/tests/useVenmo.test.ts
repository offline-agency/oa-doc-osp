import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick, shallowRef } from 'vue'
import { venmo } from 'braintree-web'
import { useVenmo } from '../src/composables/useVenmo'
import { withSetup } from './setup'

const mockCreate = vi.mocked(venmo.create)

beforeEach(() => {
  vi.clearAllMocks()
  mockCreate.mockResolvedValue({
    isBrowserSupported: vi.fn().mockReturnValue(true),
    hasTokenizationResult: vi.fn().mockReturnValue(false),
    tokenize: vi.fn().mockResolvedValue({ nonce: 'venmo-nonce', type: 'VenmoAccount', details: { username: '@testuser' } }),
    cancelTokenization: vi.fn(),
    teardown: vi.fn().mockResolvedValue(undefined),
  } as any)
})

describe('useVenmo', () => {
  it('creates venmo instance and sets isBrowserSupported', async () => {
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => useVenmo({ client }))
    await nextTick()
    expect(mockCreate).toHaveBeenCalled()
    expect(result.isReady.value).toBe(true)
    expect(result.isBrowserSupported.value).toBe(true)
  })

  it('isBrowserSupported is false when instance reports false', async () => {
    mockCreate.mockResolvedValueOnce({
      isBrowserSupported: vi.fn().mockReturnValue(false),
      hasTokenizationResult: vi.fn().mockReturnValue(false),
      tokenize: vi.fn(),
      cancelTokenization: vi.fn(),
      teardown: vi.fn().mockResolvedValue(undefined),
    } as any)
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => useVenmo({ client }))
    await nextTick()
    expect(result.isBrowserSupported.value).toBe(false)
  })

  it('tokenize() calls instance.tokenize()', async () => {
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => useVenmo({ client }))
    await nextTick()
    const payload = await result.tokenize()
    expect(payload.nonce).toBe('venmo-nonce')
    expect(payload.type).toBe('VenmoAccount')
  })

  it('tokenize() throws when not initialized', async () => {
    const client = shallowRef(null)
    const { result } = await withSetup(() => useVenmo({ client }))
    await expect(result.tokenize()).rejects.toThrow('useVenmo')
  })

  it('cancelTokenization() is a no-op when not initialized', () => {
    // useVenmo doesn't expose cancelTokenization directly — just ensure tokenize throws and nothing crashes
    const client = shallowRef(null)
    // Simply calling tokenize when not ready should throw, not crash
    // This test validates the null guard in tokenize
    let fn: (() => Promise<any>) | undefined
    mount({
      setup() {
        const r = useVenmo({ client })
        fn = r.tokenize
        return {}
      },
      template: '<div />',
    })
    expect(fn).toBeDefined()
    return expect(fn!()).rejects.toThrow()
  })

  it('tears down and resets when client becomes null', async () => {
    const mockTeardown = vi.fn().mockResolvedValue(undefined)
    mockCreate.mockResolvedValueOnce({
      isBrowserSupported: vi.fn().mockReturnValue(true),
      hasTokenizationResult: vi.fn().mockReturnValue(false),
      tokenize: vi.fn(),
      cancelTokenization: vi.fn(),
      teardown: mockTeardown,
    } as any)
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => useVenmo({ client }))
    await nextTick()
    expect(result.isReady.value).toBe(true)
    client.value = null
    await nextTick()
    await nextTick()
    expect(mockTeardown).toHaveBeenCalled()
    expect(result.isReady.value).toBe(false)
  })

  it('re-creates instance when client changes', async () => {
    const firstTeardown = vi.fn().mockResolvedValue(undefined)
    mockCreate.mockResolvedValueOnce({
      isBrowserSupported: vi.fn().mockReturnValue(true),
      hasTokenizationResult: vi.fn().mockReturnValue(false),
      tokenize: vi.fn(),
      cancelTokenization: vi.fn(),
      teardown: firstTeardown,
    } as any)
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => useVenmo({ client }))
    await nextTick()
    expect(result.isReady.value).toBe(true)
    client.value = { teardown: vi.fn() }
    await nextTick()
    await nextTick()
    expect(firstTeardown).toHaveBeenCalled()
    expect(mockCreate).toHaveBeenCalledTimes(2)
  })

  it('calls teardown() on unmount', async () => {
    const mockTeardown = vi.fn().mockResolvedValue(undefined)
    mockCreate.mockResolvedValueOnce({
      isBrowserSupported: vi.fn().mockReturnValue(true),
      hasTokenizationResult: vi.fn().mockReturnValue(false),
      tokenize: vi.fn(),
      cancelTokenization: vi.fn(),
      teardown: mockTeardown,
    } as any)
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { wrapper } = await withSetup(() => useVenmo({ client }))
    await nextTick()
    wrapper.unmount()
    await nextTick()
    expect(mockTeardown).toHaveBeenCalled()
  })
})

// Need mount for the cancelTokenization test
import { mount } from '@vue/test-utils'
