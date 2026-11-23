import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick, shallowRef } from 'vue'
import { dataCollector } from 'braintree-web'
import { useDataCollector } from '../src/composables/useDataCollector'
import { withSetup } from './setup'

const mockCreate = vi.mocked(dataCollector.create)

beforeEach(() => {
  vi.clearAllMocks()
  mockCreate.mockResolvedValue({
    deviceData: '{"correlation_id":"test-device-id"}',
    teardown: vi.fn().mockResolvedValue(undefined),
  } as any)
})

describe('useDataCollector', () => {
  it('creates dataCollector instance and exposes deviceData string', async () => {
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => useDataCollector({ client }))
    await nextTick()
    expect(mockCreate).toHaveBeenCalled()
    expect(result.isReady.value).toBe(true)
    expect(result.deviceData.value).toBe('{"correlation_id":"test-device-id"}')
  })

  it('deviceData is null before initialization', async () => {
    const client = shallowRef(null)
    const { result } = await withSetup(() => useDataCollector({ client }))
    expect(result.deviceData.value).toBeNull()
    expect(result.isReady.value).toBe(false)
  })

  it('transitions to error when dataCollector.create() rejects', async () => {
    mockCreate.mockRejectedValueOnce(new Error('collector failed'))
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => useDataCollector({ client }))
    await nextTick()
    expect(result.error.value?.message).toBe('collector failed')
    expect(result.isReady.value).toBe(false)
    expect(result.deviceData.value).toBeNull()
  })

  it('getDeviceData() returns current deviceData string', async () => {
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => useDataCollector({ client }))
    await nextTick()
    expect(result.getDeviceData()).toBe('{"correlation_id":"test-device-id"}')
  })

  it('getDeviceData() returns null when instance is not ready', async () => {
    const client = shallowRef(null)
    const { result } = await withSetup(() => useDataCollector({ client }))
    expect(result.getDeviceData()).toBeNull()
  })

  it('tears down and resets when client becomes null', async () => {
    const mockTeardown = vi.fn().mockResolvedValue(undefined)
    mockCreate.mockResolvedValueOnce({
      deviceData: '{}',
      teardown: mockTeardown,
    } as any)
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { result } = await withSetup(() => useDataCollector({ client }))
    await nextTick()
    expect(result.isReady.value).toBe(true)
    client.value = null
    await nextTick()
    await nextTick()
    expect(result.isReady.value).toBe(false)
    expect(result.deviceData.value).toBeNull()
  })

  it('re-creates instance when client ref changes', async () => {
    const client = shallowRef<any>(null)
    const { result } = await withSetup(() => useDataCollector({ client }))
    expect(result.isReady.value).toBe(false)
    client.value = { teardown: vi.fn() }
    await nextTick()
    await nextTick()
    expect(result.isReady.value).toBe(true)
  })

  it('calls teardown() on unmount', async () => {
    const mockTeardown = vi.fn().mockResolvedValue(undefined)
    mockCreate.mockResolvedValueOnce({
      deviceData: '{}',
      teardown: mockTeardown,
    } as any)
    const client = shallowRef<any>({ teardown: vi.fn() })
    const { wrapper } = await withSetup(() => useDataCollector({ client }))
    await nextTick()
    wrapper.unmount()
    await nextTick()
    expect(mockTeardown).toHaveBeenCalled()
  })
})
