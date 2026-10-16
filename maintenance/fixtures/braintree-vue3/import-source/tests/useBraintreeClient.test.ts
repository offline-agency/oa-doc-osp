import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick, inject } from 'vue'
import { mount } from '@vue/test-utils'
import { client as braintreeClient } from 'braintree-web'
import { useBraintreeClient } from '../src/composables/useBraintreeClient'
import { BraintreeClientKey } from '../src/injection-keys'
import { withSetup } from './setup'

const mockCreate = vi.mocked(braintreeClient.create)

beforeEach(() => {
  vi.clearAllMocks()
  mockCreate.mockResolvedValue({
    teardown: vi.fn().mockResolvedValue(undefined),
    getConfiguration: vi.fn().mockReturnValue({}),
  } as any)
})

describe('useBraintreeClient', () => {
  it('initializes with idle status', () => {
    // setup() returns refs in their initial state before any async work settles
    let captured: ReturnType<typeof useBraintreeClient> | undefined
    const wrapper = mount({
      setup() {
        captured = useBraintreeClient('sandbox_test')
        return {}
      },
      template: '<div />',
    })
    // isReady starts as false; error starts as null
    // (isLoading may already be true since onMounted fires synchronously)
    expect(captured!.isReady.value).toBe(false)
    expect(captured!.error.value).toBeNull()
    expect(captured!.client.value).toBeNull()
    wrapper.unmount()
  })

  it('transitions to loading then ready on mount', async () => {
    const { result } = await withSetup(() => useBraintreeClient('sandbox_test'))
    expect(result.isReady.value).toBe(true)
    expect(result.isLoading.value).toBe(false)
    expect(result.error.value).toBeNull()
    expect(mockCreate).toHaveBeenCalledWith({ authorization: 'sandbox_test' })
  })

  it('transitions to error when create() rejects', async () => {
    mockCreate.mockRejectedValueOnce(new Error('Network error'))
    const { result } = await withSetup(() => useBraintreeClient('bad_token'))
    expect(result.isReady.value).toBe(false)
    expect(result.error.value).toBeInstanceOf(Error)
    expect(result.error.value!.message).toBe('Network error')
  })

  it('calls teardown() on unmount', async () => {
    const mockTeardown = vi.fn().mockResolvedValue(undefined)
    mockCreate.mockResolvedValueOnce({
      teardown: mockTeardown,
      getConfiguration: vi.fn().mockReturnValue({}),
    } as any)
    const { wrapper } = await withSetup(() => useBraintreeClient('sandbox_test'))
    wrapper.unmount()
    expect(mockTeardown).toHaveBeenCalled()
  })

  it('exposes isReady as true when ready', async () => {
    const { result } = await withSetup(() => useBraintreeClient('sandbox_test'))
    expect(result.isReady.value).toBe(true)
  })

  it('exposes isLoading as true during initialization', async () => {
    let loadingDuringInit = false
    let captured: ReturnType<typeof useBraintreeClient> | undefined

    // Delay create() to observe isLoading mid-flight
    let resolveCreate!: (v: any) => void
    mockCreate.mockImplementationOnce(() => new Promise((res) => { resolveCreate = res }))

    const wrapper = mount({
      setup() {
        captured = useBraintreeClient('sandbox_test')
        return {}
      },
      template: '<div />',
    })
    await nextTick() // triggers onMounted -> initialize()
    loadingDuringInit = captured!.isLoading.value
    resolveCreate({
      teardown: vi.fn().mockResolvedValue(undefined),
      getConfiguration: vi.fn().mockReturnValue({}),
    })
    await nextTick()
    await nextTick()
    expect(loadingDuringInit).toBe(true)
    expect(captured!.isLoading.value).toBe(false)
    wrapper.unmount()
  })

  it('reinitialize() tears down existing client and creates a new one', async () => {
    const firstTeardown = vi.fn().mockResolvedValue(undefined)
    mockCreate.mockResolvedValueOnce({
      teardown: firstTeardown,
      getConfiguration: vi.fn().mockReturnValue({}),
    } as any)
    const { result } = await withSetup(() => useBraintreeClient('sandbox_test'))
    expect(result.isReady.value).toBe(true)
    await result.reinitialize()
    await nextTick()
    await nextTick()
    expect(firstTeardown).toHaveBeenCalled()
    expect(mockCreate).toHaveBeenCalledTimes(2)
    expect(result.isReady.value).toBe(true)
  })

  it('reinitialize() with no existing client skips teardown and initializes fresh', async () => {
    const { result } = await withSetup(() => useBraintreeClient('sandbox_test'))
    // Reset to simulate a state where client was already torn down
    result.client.value = null
    result.isReady.value = false
    await result.reinitialize()
    await nextTick()
    await nextTick()
    expect(result.isReady.value).toBe(true)
  })

  it('initialize() is a no-op when already loading', async () => {
    let capturedResult: ReturnType<typeof useBraintreeClient> | undefined
    let resolveCreate!: (v: any) => void
    mockCreate.mockImplementationOnce(() => new Promise((res) => { resolveCreate = res }))

    const wrapper = mount({
      setup() {
        capturedResult = useBraintreeClient('sandbox_test')
        return {}
      },
      template: '<div />',
    })
    await nextTick() // triggers initialize(), sets isLoading = true
    // call initialize() again while isLoading is true — should be a no-op
    const secondCall = capturedResult!.initialize()
    resolveCreate({ teardown: vi.fn(), getConfiguration: vi.fn().mockReturnValue({}) })
    await secondCall
    await nextTick()
    // create() should only have been called once
    expect(mockCreate).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('unmount before client is ready does nothing', () => {
    let resolveCreate!: (v: any) => void
    mockCreate.mockImplementationOnce(() => new Promise((res) => { resolveCreate = res }))
    const wrapper = mount({
      setup() { useBraintreeClient('sandbox_test'); return {} },
      template: '<div />',
    })
    // Unmount while still loading (client.value is null)
    expect(() => wrapper.unmount()).not.toThrow()
    // Resolve the dangling promise to avoid unhandled rejection
    resolveCreate({ teardown: vi.fn(), getConfiguration: vi.fn().mockReturnValue({}) })
  })

  it('provides BraintreeClientKey when called inside a component', async () => {
    let injected: unknown
    const Child = {
      setup() {
        injected = inject(BraintreeClientKey)
        return {}
      },
      template: '<span />',
    }
    const wrapper = mount({
      setup() {
        useBraintreeClient('sandbox_test')
        return {}
      },
      components: { Child },
      template: '<div><Child /></div>',
    })
    await nextTick()
    await nextTick()
    expect(injected).toBeDefined()
    wrapper.unmount()
  })
})
