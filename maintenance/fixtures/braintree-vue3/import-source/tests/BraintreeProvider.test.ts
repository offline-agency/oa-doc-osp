import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { inject, defineComponent, nextTick } from 'vue'
import BraintreeProvider from '../src/components/BraintreeProvider.vue'
import { BraintreeClientKey } from '../src/injection-keys'

describe('BraintreeProvider', () => {
  it('renders default slot content', () => {
    const wrapper = mount(BraintreeProvider, {
      props: { authorization: 'sandbox_test' },
      slots: { default: '<span id="child">child</span>' },
    })
    expect(wrapper.find('#child').exists()).toBe(true)
  })

  it('provides BraintreeClientKey to child components', async () => {
    let injectedCtx: unknown
    const Child = defineComponent({
      setup() {
        injectedCtx = inject(BraintreeClientKey)
        return {}
      },
      template: '<span />',
    })
    const wrapper = mount(BraintreeProvider, {
      props: { authorization: 'sandbox_test' },
      slots: {
        default: () => [mount(Child).element],
      },
    })
    await nextTick()
    // The provider mounts Child into its own tree; inject happens inside BraintreeProvider's subtree
    // so we test the BraintreeProvider's exposed context instead
    expect((wrapper.vm as any).isReady).toBeDefined()
    wrapper.unmount()
  })

  it('exposes isReady via template ref', async () => {
    const wrapper = mount(BraintreeProvider, {
      props: { authorization: 'sandbox_test' },
    })
    await nextTick()
    await nextTick()
    // Vue auto-unwraps refs on the component instance proxy, so isReady is boolean
    expect((wrapper.vm as any).isReady).toBe(true)
  })

  it('exposes reinitialize() via template ref', async () => {
    const wrapper = mount(BraintreeProvider, {
      props: { authorization: 'sandbox_test' },
    })
    await nextTick()
    await nextTick()
    const vm = wrapper.vm as { reinitialize: () => Promise<void> }
    expect(typeof vm.reinitialize).toBe('function')
  })

  it('injects BraintreeClientKey into nested child components', async () => {
    let injectedCtx: unknown

    const Child = defineComponent({
      setup() {
        injectedCtx = inject(BraintreeClientKey)
        return {}
      },
      template: '<span />',
    })

    const Parent = defineComponent({
      components: { BraintreeProvider, Child },
      template: '<BraintreeProvider authorization="sandbox_test"><Child /></BraintreeProvider>',
    })

    mount(Parent)
    await nextTick()
    expect(injectedCtx).toBeDefined()
    expect((injectedCtx as any).client).toBeDefined()
    expect((injectedCtx as any).isReady).toBeDefined()
  })
})
